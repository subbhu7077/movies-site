/**
 * ZORVIXHUB ENTERPRISE CLIENT ENGINE
 * Multi-Region Cinema • TV Season View • Watch Providers • Fuzzy Search
 */

// Global Cinema Industries & Regions
const GLOBAL_REGIONS = [
    { id: "all", label: "🔥 All Trending" },
    { id: "bollywood", label: "🇮🇳 Bollywood (Hindi)" },
    { id: "tollywood", label: "⚡ Tollywood (Telugu)" },
    { id: "kollywood", label: "🏹 Kollywood (Tamil)" },
    { id: "mollywood", label: "🌴 Mollywood (Malayalam)" },
    { id: "sandalwood", label: "👑 Sandalwood (Kannada)" },
    { id: "hollywood", label: "🎬 Hollywood (English 4K)" },
    { id: "kdrama", label: "🇰🇷 K-Drama (Korean)" },
    { id: "anime", label: "⛩️ Anime Universe" },
    { id: "series", label: "📺 Web Series & OTT" }
];

let catalogHeroTimer = null;
let currentHeroIndex = 0;

// 1. Hero Banner Slider Component
function mountHeroSlider() {
    const container = document.getElementById("heroSlider");
    if (!container || !window.movies || window.movies.length === 0) return;

    const featured = window.movies.slice(0, 6);
    container.innerHTML = `
        <div class="hero-slider-track">
            ${featured.map((m, idx) => `
                <div class="hero-slide ${idx === 0 ? 'active' : ''}" style="background-image: linear-gradient(180deg, rgba(7,11,20,0.2) 0\%, rgba(7,11,20,0.95) 100\%), url('${m.backdrop || m.poster}')">
                    <div class="hero-slide-inner">
                        <span class="hero-tag">⭐ ${m.rating} • ${m.year} •${m.category.toUpperCase()}</span>
                        <h2 class="hero-heading">${m.title}</h2>
                        <p class="hero-desc">${m.story ? m.story.substring(0, 160) + '...' : ''}</p>
                        <div class="hero-btn-group">
                            <button class="hero-primary-btn" onclick="openMovie(${m.id})">▶ EXPLORE TITLE</button>
                            <button class="hero-secondary-btn" onclick="openPlayer('${m.title.replace(/'/g, "\\'")} (Trailer)', '${m.trailer}')">🎬 WATCH TRAILER</button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="hero-indicators">
            ${featured.map((_, i) => `<span class="indicator-dot ${i === 0 ? 'active' : ''}" onclick="switchHeroSlide(${i})"></span>`).join('')}
        </div>
    `;

    clearInterval(catalogHeroTimer);
    catalogHeroTimer = setInterval(() => {
        currentHeroIndex = (currentHeroIndex + 1) % featured.length;
        switchHeroSlide(currentHeroIndex);
    }, 6000);
}

function switchHeroSlide(index) {
    currentHeroIndex = index;
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".indicator-dot");
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

// 2. Season & Episode Modal Viewer
function mountSeasonEpisodeViewer(movie) {
    const box = document.getElementById("seasonEpisodeSection");
    if (!box) return;

    if (!movie.seasons || movie.seasons.length === 0) {
        box.style.display = "none";
        return;
    }

    box.style.display = "block";
    box.innerHTML = `
        <div class="season-nav-bar">
            <h4>📺 SELECT SEASON & EPISODE</h4>
            <select id="seasonSelector" onchange="switchSeasonEpisodes(${movie.id}, this.value)">
                ${movie.seasons.map(s => `<option value="${s.season_number}">${s.name} (${s.episode_count} Episodes)</option>`).join('')}
            </select>
        </div>
        <div id="episodeCardsList" class="episode-cards-list"></div>
    `;

    switchSeasonEpisodes(movie.id, movie.seasons[0].season_number);
}

function switchSeasonEpisodes(movieId, seasonNum) {
    const movie = window.movies.find(m => m.id === movieId);
    if (!movie || !movie.seasons) return;
    const season = movie.seasons.find(s => s.season_number == seasonNum) || movie.seasons[0];
    const grid = document.getElementById("episodeCardsList");
    if (!grid) return;

    grid.innerHTML = season.episodes.map(ep => `
        <div class="episode-card" onclick="streamEpisode(${movie.id}, ${season.season_number}, ${ep.episode_number}, '${ep.name.replace(/'/g, "\\"')}')">
            <div class="ep-thumb-wrap">
                <img src="${ep.still_url || movie.poster}" alt="${ep.name}" loading="lazy">
                <span class="ep-num-pill">EP ${ep.episode_number}</span>
            </div>
            <div class="ep-details">
                <h6>${ep.name}</h6>
                <p>${ep.overview ? ep.overview.substring(0, 80) + '...' : ''}</p>
            </div>
        </div>
    `).join('');
}

function streamEpisode(movieId, sNum, epNum, epTitle) {
    const movie = window.movies.find(m => m.id === movieId);
    const streamUrl = `https://vidsrc.me/embed/tv?imdb=${movie.imdbId}&season=${sNum}&episode=${epNum}`;
    if (typeof openPlayer === 'function') {
        openPlayer(`${movie.title} - S${sNum}E${epNum}: ${epTitle}`, streamUrl);
    }
}

// 3. Legal "Where to Watch" Providers
function mountWatchProviders(movie) {
    const section = document.getElementById("legalWatchSection");
    if (!section) return;

    const providers = movie.watchProviders || [
        { provider_name: "Official Platform", provider_type: "Licensed", provider_url: `https://www.google.com/search?q=${encodeURIComponent(movie.title + " watch online official")}` }
    ];

    section.innerHTML = `
        <p class="providers-title">🏛️ LEGAL & LICENSED WATCH PROVIDERS:</p>
        <div class="providers-flex">
            ${providers.map(p => `
                <a href="${p.provider_url}" target="_blank" rel="noopener noreferrer" class="provider-badge">
                    <span class="provider-dot"></span>
                    <strong>${p.provider_name}</strong>
                    <span class="provider-type">(${p.provider_type})</span>
                </a>
            `).join('')}
        </div>
    `;
}

// 4. Client Admin Import Modal & GUI Controller
function openAdminImportGUI() {
    let modal = document.getElementById("adminImportModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "adminImportModal";
        modal.className = "modal-overlay";
        modal.innerHTML = `
            <div class="modal-box admin-import-box">
                <button class="modal-close" onclick="document.getElementById('adminImportModal').style.display='none'">&times;</button>
                <h3 style="color:#00e5ff; margin-bottom:12px;">⚡ CATALOG INGESTION & SYNC DASHBOARD</h3>
                <p style="color:#8892b0; font-size:0.85rem; margin-bottom:16px;">
                    Enter IMDb/TMDB ID to import instant global metadata, episodes, and trailers into ZorvixHub:
                </p>
                <div style="display:flex; gap:10px; margin-bottom:14px;">
                    <input type="text" id="importIdInput" placeholder="e.g. tt11663228" style="flex:1; padding:10px; background:#070b14; border:1px solid #00e5ff; color:#fff; border-radius:6px;">
                    <select id="importRegionInput" style="padding:10px; background:#070b14; border:1px solid #00e5ff; color:#fff; border-radius:6px;">
                        <option value="tollywood">Tollywood</option>
                        <option value="kollywood">Kollywood</option>
                        <option value="mollywood">Mollywood</option>
                        <option value="sandalwood">Sandalwood</option>
                        <option value="bollywood">Bollywood</option>
                        <option value="hollywood">Hollywood</option>
                        <option value="kdrama">K-Drama</option>
                        <option value="anime">Anime</option>
                    </select>
                    <select id="importTypeInput" style="padding:10px; background:#070b14; border:1px solid #00e5ff; color:#fff; border-radius:6px;">
                        <option value="movie">Movie</option>
                        <option value="series">Series</option>
                    </select>
                </div>
                <button class="hero-primary-btn" style="width:100%; margin-bottom:16px;" onclick="triggerClientSideImport()">START INGESTION</button>
                <div id="importConsole" style="background:#000; border:1px solid rgba(255,255,255,0.1); border-radius:6px; padding:12px; font-family:monospace; font-size:0.75rem; color:#00f59b; max-height:160px; overflow-y:auto;">
                    [Console Ready] Waiting for import trigger...
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.style.display = "flex";
}

function triggerClientSideImport() {
    const id = document.getElementById("importIdInput").value.trim();
    const region = document.getElementById("importRegionInput").value;
    const type = document.getElementById("importTypeInput").value;
    const con = document.getElementById("importConsole");

    if (!id) {
        con.innerHTML += "<br><span style='color:#ff0055;'>❌ Error: Please enter a valid IMDb ID (tt1234567).</span>";
        return;
    }

    con.innerHTML += `<br>⏳ Fetching metadata for ${id} (${region} - ${type})...`;
    fetch(`https://v3-cinemeta.strem.io/meta/${type}/${id}.json`)
        .then(r => r.json())
        .then(data => {
            if (data && data.meta) {
                const m = data.meta;
                con.innerHTML += `<br><span style='color:#00e5ff;'>✅ Successfully fetched: ${m.name} (${m.year || 2024})</span>`;
                con.innerHTML += `<br>💾 To persist permanently across Git, run in Termux:<br><code style='color:#ffb703;'>node importer.js ${id} ${region} ${type}</code>`;
                
                // Live preview push into current DOM
                window.movies.unshift({
                    id: Date.now(),
                    imdbId: id,
                    title: m.name,
                    category: region,
                    genre: (m.genres && m.genres[0] ? m.genres[0] : "action").toLowerCase(),
                    quality: "4K UHD",
                    size: type === "series" ? "Seasons Ready" : "3.0 GB",
                    rating: m.imdbRating || "8.0",
                    year: (m.year || "2024").toString(),
                    audio: m.language || "Multi-Audio",
                    trending: true,
                    poster: m.poster,
                    story: m.description || "",
                    trailer: `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(m.name + ' trailer')}`,
                    servers: [{ name: "⚡ Cloud Server 1", url: "https://drive.google.com" }]
                });
                if (typeof applyAllFilters === 'function') applyAllFilters();
            } else {
                con.innerHTML += "<br><span style='color:#ff0055;'>❌ Metadata not found on public index.</span>";
            }
        })
        .catch(err => {
            con.innerHTML += `<br><span style='color:#ff0055;'>❌ Fetch error: ${err.message}</span>`;
        });
}

// Hook into existing openMovie safely
const baseOpenMovie = window.openMovie;
window.openMovie = function(id) {
    if (typeof baseOpenMovie === 'function') {
        baseOpenMovie(id);
    }
    const movie = (window.movies || []).find(m => m.id === id);
    if (movie) {
        mountSeasonEpisodeViewer(movie);
        mountWatchProviders(movie);
    }
};

// Safe DOM initialization
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(mountHeroSlider, 250);
});
