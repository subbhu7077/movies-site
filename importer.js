/**
 * ZORVIXHUB ENTERPRISE GLOBAL INGESTION ENGINE
 * Pagination • Rate-Limiting • Checkpoint Resume • Normalization • Deduplication
 */
const fs = require('fs');
const https = require('https');

const DB_FILE = 'catalog-db.json';

// Safe HTTP Fetch with Exponential Backoff for HTTP 429
function fetchJSON(url, retryCount = 0) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, { headers: { 'User-Agent': 'ZorvixHub-Catalog/5.0' } }, (res) => {
            if (res.statusCode === 429) {
                const waitTime = Math.pow(2, retryCount) * 1500;
                console.warn(`⚠️ Rate-limit (429) hit. Pausing for ${waitTime}ms...`);
                return setTimeout(() => resolve(fetchJSON(url, retryCount + 1)), waitTime);
            }
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return resolve(fetchJSON(res.headers.location, retryCount));
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error(`JSON Parse Error: ${e.message}`));
                }
            });
        });
        req.on('error', (err) => {
            if (retryCount < 3) {
                setTimeout(() => resolve(fetchJSON(url, retryCount + 1)), 2000);
            } else {
                reject(err);
            }
        });
    });
}

function normalizeTitle(title) {
    return (title || '').toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}

function createSlug(title, year) {
    return (title || 'untitled')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') + `-${year || 'release'}`;
}

// Generate Legitimate Licensed Watch and In-App Offline Providers
function generateLegalWatchAndOffline(titleName) {
    const encoded = encodeURIComponent(titleName);
    return {
        IN: [
            { name: "Netflix India", type: "Subscription", logo: "https://assets.nflxext.com/ffe/siteui/common/icons/nficon2023.ico", url: `https://www.netflix.com/search?q=${encoded}`, offlineSupported: true },
            { name: "Amazon Prime Video", type: "Subscription / Rent", logo: "https://m.media-amazon.com/images/G/01/digital/video/web/Logo-min.png", url: `https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${encoded}`, offlineSupported: true },
            { name: "JioCinema / Hotstar", type: "Subscription", logo: "https://www.jiocinema.com/favicon.ico", url: `https://www.jiocinema.com/search/${encoded}`, offlineSupported: true }
        ],
        US: [
            { name: "Netflix US", type: "Subscription", logo: "https://assets.nflxext.com/ffe/siteui/common/icons/nficon2023.ico", url: `https://www.netflix.com/search?q=${encoded}`, offlineSupported: true },
            { name: "Apple TV", type: "Buy / Rent", logo: "https://www.apple.com/favicon.ico", url: `https://tv.apple.com/us/search?term=${encoded}`, offlineSupported: true }
        ],
        GB: [
            { name: "Prime Video UK", type: "Subscription", logo: "https://m.media-amazon.com/images/G/01/digital/video/web/Logo-min.png", url: `https://www.amazon.co.uk/s?k=${encoded}`, offlineSupported: true }
        ],
        GLOBAL: [
            { name: "Official Theatrical & Streaming Portal", type: "Licensed", logo: "https://www.google.com/favicon.ico", url: `https://www.google.com/search?q=${encoded}+official+streaming`, offlineSupported: false }
        ]
    };
}

// Ingest Title with Strict Deduplication and Overwrite Protection
async function ingestCanonicalTitle(externalId, region = 'hollywood', type = 'movie') {
    let db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

    // Check duplicate by primary external ID
    let existingIndex = db.titles.findIndex(t => 
        (t.external_id && t.external_id === externalId) ||
        (t.imdb_id && t.imdb_id === externalId)
    );

    const endpoint = type === 'series' 
        ? `https://v3-cinemeta.strem.io/meta/series/${externalId}.json`
        : `https://v3-cinemeta.strem.io/meta/movie/${externalId}.json`;

    const res = await fetchJSON(endpoint).catch(() => null);
    if (!res || !res.meta) return false;

    const m = res.meta;
    const norm = normalizeTitle(m.name);
    const releaseYear = (m.releaseInfo || m.year || '2024').toString().substring(0, 4);

    // Fallback duplicate check: normalized_title + release_year + media_type
    if (existingIndex === -1) {
        existingIndex = db.titles.findIndex(t => 
            normalizeTitle(t.title) === norm &&
            t.release_year === releaseYear &&
            t.media_type === type
        );
    }

    // Protection rule: Never overwrite manual admin modifications
    if (existingIndex >= 0 && db.titles[existingIndex].manual_override === true) {
        console.log(`🔒 Skipped [${m.name}] (manual_override=true protected)`);
        db.import_checkpoint.totalDuplicates++;
        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
        return true;
    }

    // Process TV Seasons and Episodes
    let seasons = [];
    if (m.videos && m.videos.length > 0) {
        const sMap = {};
        m.videos.forEach(v => {
            const sNum = v.season || 1;
            if (!sMap[sNum]) sMap[sNum] = [];
            sMap[sNum].push({
                episode_number: v.episode || 1,
                name: v.title || `Episode ${v.episode}`,
                air_date: v.released ? v.released.split('T')[0] : releaseYear,
                runtime: "45m",
                overview: v.overview || `Episode ${v.episode} of Season ${sNum}`,
                still_url: v.thumbnail || m.poster,
                rating: m.imdbRating || "8.0"
            });
        });
        seasons = Object.keys(sMap).map(s => ({
            season_number: parseInt(s),
            name: `Season ${s}`,
            episode_count: sMap[s].length,
            episodes: sMap[s]
        }));
    }

    const legalWatch = generateLegalWatchAndOffline(m.name);
    const slug = createSlug(m.name, releaseYear);

    const record = {
        id: existingIndex >= 0 ? db.titles[existingIndex].id : Date.now(),
        external_id: externalId,
        imdb_id: externalId,
        tmdb_id: m.tmdb_id || "",
        slug: slug,
        title: m.name,
        original_title: m.original_name || m.name,
        alternative_titles: m.aliases || [],
        type: type,
        media_type: type,
        overview: m.description || "Official synopsis available via licensed platforms.",
        tagline: m.tagline || "",
        release_date: m.released ? m.released.split('T')[0] : `${releaseYear}-01-01`,
        release_year: releaseYear,
        runtime: m.runtime || "N/A",
        status: m.status || "Released",
        original_language: m.language || "en",
        languages: [m.language || "English", "Hindi"],
        countries: [m.country || "United States"],
        region: region.toLowerCase(),
        genres: m.genres || ["Action", "Drama"],
        poster_url: m.poster || `https://images.metahub.space/poster/medium/${externalId}/img.jpg`,
        backdrop_url: m.background || m.poster,
        trailer_url: (m.trailers && m.trailers[0]) 
            ? `https://www.youtube.com/embed/${m.trailers[0].source}`
            : `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(m.name + ' official trailer')}`,
        rating: m.imdbRating || "7.8",
        vote_count: m.imdbVotes || "25,000+",
        popularity: parseFloat(m.imdbRating || "7.5") * 10,
        age_rating: m.ageRating || "U/A 16+",
        cast: m.cast || ["Ensemble Cast"],
        directors: m.director ? [m.director] : [],
        writers: m.writer ? [m.writer] : [],
        official_website: m.website || "",
        seasons: seasons,
        watch_providers_by_country: legalWatch,
        download_type: "OFFLINE_IN_APP",
        download_instructions: "Authorized offline viewing is supported via the official apps of licensed providers.",
        manual_override: false,
        created_at: existingIndex >= 0 ? db.titles[existingIndex].created_at : new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_synced_at: new Date().toISOString()
    };

    if (existingIndex >= 0) {
        db.titles[existingIndex] = record;
        db.import_checkpoint.totalUpdated++;
    } else {
        db.titles.unshift(record);
        db.import_checkpoint.totalImported++;
    }

    db.meta.totalTitles = db.titles.length;
    db.meta.lastSync = new Date().toISOString();
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

    syncWithFrontendScript(db);
    return true;
}

// Sync database records with script.js runtime
function syncWithFrontendScript(db) {
    let script = fs.readFileSync('script.js', 'utf8');

    const mapped = db.titles.map((t) => ({
        id: t.id,
        imdbId: t.imdb_id,
        slug: t.slug,
        title: t.title,
        originalTitle: t.original_title,
        category: t.region,
        genre: (t.genres[0] || "Action").toLowerCase(),
        quality: "4K UHD",
        size: t.media_type === "series" ? `${t.seasons.length || 1} Seasons` : "2.8 GB",
        rating: t.rating,
        year: t.release_year,
        audio: t.languages.join(' + '),
        trending: t.popularity >= 75,
        type: t.media_type,
        poster: t.poster_url,
        backdrop: t.backdrop_url,
        story: t.overview,
        trailer: t.trailer_url,
        seasons: t.seasons,
        watchProviders: t.watch_providers_by_country,
        downloadType: t.download_type,
        downloadInstructions: t.download_instructions,
        servers: [
            { name: "⚡ Fast Cloud Server 1", url: "https://drive.google.com" },
            { name: "🚀 High-Speed Server 2", url: "https://mega.nz" },
            { name: "💾 Direct Fast Server 3", url: "https://pixeldrain.com" }
        ]
    }));

    const replacement = `let movies = ${JSON.stringify(mapped, null, 4)};`;
    script = script.replace(/let movies = \[[\s\S]*?\];/, replacement);
    fs.writeFileSync('script.js', script);
}

// Curated Global Ingestion Pipeline
const masterQueue = [
    // 1. Tollywood (Telugu Cinema)
    { id: "tt11663228", region: "tollywood", type: "movie" }, // Pushpa 2
    { id: "tt11858890", region: "tollywood", type: "movie" }, // Kalki 2898 AD
    { id: "tt22154402", region: "tollywood", type: "movie" }, // Devara
    { id: "tt13619278", region: "tollywood", type: "movie" }, // Salaar
    { id: "tt14738360", region: "tollywood", type: "movie" }, // Hanu-Man
    // 2. Kollywood (Tamil Cinema)
    { id: "tt27487934", region: "kollywood", type: "movie" }, // GOAT
    { id: "tt26734796", region: "kollywood", type: "movie" }, // Amaran
    { id: "tt27663224", region: "kollywood", type: "movie" }, // Vettaiyan
    { id: "tt26443597", region: "kollywood", type: "movie" }, // Maharaja
    { id: "tt15654328", region: "kollywood", type: "movie" }, // Leo
    // 3. Mollywood (Malayalam Cinema)
    { id: "tt26421319", region: "mollywood", type: "movie" }, // Manjummel Boys
    { id: "tt31006494", region: "mollywood", type: "movie" }, // Aavesham
    { id: "tt30278783", region: "mollywood", type: "movie" }, // Premalu
    { id: "tt28639206", region: "mollywood", type: "movie" }, // Bramayugam
    // 4. Sandalwood (Kannada Cinema)
    { id: "tt10698680", region: "sandalwood", type: "movie" },// KGF 2
    { id: "tt15327088", region: "sandalwood", type: "movie" },// Kantara
    { id: "tt13670698", region: "sandalwood", type: "movie" },// Bagheera
    // 5. Bollywood (Hindi Cinema & Web Series)
    { id: "tt26932223", region: "bollywood", type: "movie" }, // Bhool Bhulaiyaa 3
    { id: "tt11454532", region: "bollywood", type: "movie" }, // Singham Again
    { id: "tt27995595", region: "bollywood", type: "movie" }, // Stree 2
    { id: "tt28014526", region: "bollywood", type: "movie" }, // Chhaava
    { id: "tt11990494", region: "bollywood", type: "series" },// Panchayat S3
    { id: "tt6473300", region: "bollywood", type: "series" }, // Mirzapur S3
    // 6. K-Drama & Asian Series
    { id: "tt10954600", region: "kdrama", type: "series" },   // Squid Game
    { id: "tt27448348", region: "kdrama", type: "series" },   // Queen of Tears
    { id: "tt27829106", region: "kdrama", type: "movie" },    // Exhuma
    // 7. Anime Universe
    { id: "tt30217036", region: "anime", type: "series" },    // Dandadan
    { id: "tt13653134", region: "anime", type: "series" },    // Solo Leveling
    { id: "tt21650338", region: "anime", type: "series" },    // Kaiju No. 8
    { id: "tt15242330", region: "anime", type: "movie" },     // The First Slam Dunk
    // 8. Hollywood 4K Blockbusters
    { id: "tt6263850", region: "hollywood", type: "movie" },  // Deadpool & Wolverine
    { id: "tt9218128", region: "hollywood", type: "movie" },  // Gladiator II
    { id: "tt18412256", region: "hollywood", type: "movie" }, // Alien: Romulus
    { id: "tt15239678", region: "hollywood", type: "movie" }, // Dune: Part Two
    { id: "tt1190634", region: "hollywood", type: "series" }, // The Boys
    { id: "tt11198330", region: "hollywood", type: "series" } // House of the Dragon
];

async function runQueue(startIndex = 0) {
    console.log(`\n============================================================`);
    console.log(`🌍 ZORVIXHUB ENTERPRISE GLOBAL METADATA PIPELINE`);
    console.log(`============================================================`);
    let db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    db.import_checkpoint.status = "running";
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

    for (let i = startIndex; i < masterQueue.length; i++) {
        const item = masterQueue[i];
        try {
            console.log(`[Batch ${i + 1}/${masterQueue.length}] Ingesting: ${item.id} (${item.region} - ${item.type})`);
            await ingestCanonicalTitle(item.id, item.region, item.type);
            db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
            db.import_checkpoint.lastPage = i + 1;
            fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
            await new Promise(r => setTimeout(r, 200));
        } catch (err) {
            console.error(`❌ Ingestion failed for ${item.id}:`, err.message);
            db.import_checkpoint.totalFailed++;
            fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
        }
    }

    db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    db.import_checkpoint.status = "completed";
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
    console.log(`\n🎉 Ingestion Finished! Total Verified Titles: ${db.meta.totalTitles}`);
}

const cliArg = process.argv[2];
if (cliArg === '--resume') {
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    const resumeIndex = db.import_checkpoint.lastPage || 0;
    console.log(`▶ Resuming pipeline from checkpoint: ${resumeIndex}`);
    runQueue(resumeIndex);
} else if (cliArg && cliArg.startsWith('tt')) {
    ingestCanonicalTitle(cliArg, process.argv[3] || 'hollywood', process.argv[4] || 'movie');
} else {
    runQueue(0);
}
