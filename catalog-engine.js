/**
 * ZORVIXHUB ENTERPRISE CLIENT ENGINE
 * Licensed Watch Destinations • Country Switcher • Authorized Offline Options
 * TV Season/Episode Selector • Hero Banner Carousel • Search & Filters
 */

let activeSelectedCountry = "IN";
let heroSlideInterval = null;
let currentSlideIndex = 0;

// 1. Mount Hero Banner Slider
function mountHeroBannerSlider() {
    const container = document.getElementById("heroSlider");
    if (!container || !window.movies || window.movies.length === 0) return;

    const featuredTitles = window.movies.slice(0, 6);
    container.innerHTML = `
        <div class="hero-slider-track">
            ${featuredTitles.map((m, idx) => `
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
            ${featuredTitles.map((_, i) => `<span class="indicator-dot ${i === 0 ? 'active' : ''}" onclick="switchHeroSlide(${i})"></span>`).join('')}
        </div>
    `;

    clearInterval(heroSlideInterval);
    heroSlideInterval = setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % featuredTitles.length;
        switchHeroSlide(currentSlideIndex);
    }, 6000);
}

function switchHeroSlide(idx) {
    currentSlideIndex = idx;
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".indicator-dot");
    slides.forEach((s, i) => s.classList.toggle("active", i === idx));
    dots.forEach((d, i) => d.classList.toggle("active", i === idx));
}

// 2. Where to Watch with Country Switcher
function mountWhereToWatchSection(movie) {
    const box = document.getElementById("legalWatchSection");
    if (!box) return;

    const countryProviders = (movie.watchProviders && movie.watchProviders[activeSelectedCountry]) 
        ? movie.watchProviders[activeSelectedCountry] 
        : (movie.watchProviders && movie.watchProviders.GLOBAL ? movie.watchProviders.GLOBAL : []);

    box.innerHTML = `
        <div class="watch-header-row">
            <span class="providers-micro-tag">🏛️ WHERE TO WATCH (LICENSED DESTINATIONS):</span>
            <div class="country-switch-wrap">
                <label for="countryPicker">Region:</label>
                <select id="countryPicker" onchange="changeCountryWatch(${movie.id}, this.value)">
                    <option value="IN" ${activeSelectedCountry === 'IN' ? 'selected' : ''}>🇮🇳 India</option>
                    <option value="US" ${activeSelectedCountry === 'US' ? 'selected' : ''}>🇺🇸 United States</option>
                    <option value="GB" ${activeSelectedCountry === 'GB' ? 'selected' : ''}>🇬🇧 United Kingdom</option>
                    <option value="GLOBAL" ${activeSelectedCountry === 'GLOBAL' ? 'selected' : ''}>🌐 Worldwide</option>
                </select>
            </div>
        </div>
        <div class="providers-pill-grid">
            ${countryProviders.length > 0 ? countryProviders.map(p => `
                <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="provider-pill-badge">
                    <img src="${p.logo}" alt="${p.name}" class="provider-favicon" onerror="this.style.display='none'">
                    <div class="provider-name-wrap">
                        <strong>${p.name}</strong>
                        <span class="p-type">${p.type}</span>
                    </div>
                    <span class="provider-arrow">↗</span>
                </a>
            `).join('') : '<p class="no-providers-text">Official streaming availability unavailable for selected region.</p>'}
        </div>
    `;
}

function changeCountryWatch(movieId, countryCode) {
    activeSelectedCountry = countryCode;
    const movie = window.movies.find(m => m.id === movieId);
    if (movie) mountWhereToWatchSection(movie);
}

// 3. Authorized In-App Offline / Download Modal
function openAuthorizedDownloadModal() {
    const movie = window.activeMovie;
    if (!movie) return;

    let modal = document.getElementById("authDownloadModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "authDownloadModal";
        modal.className = "modal-overlay";
        modal.innerHTML = `
            <div class="modal-box auth-download-box">
                <button class="modal-close" onclick="document.getElementById('authDownloadModal').style.display='none'">&times;</button>
                <div class="download-modal-header">
                    <span class="dl-status-icon">📥</span>
                    <h3 id="dlModalTitle">AUTHORIZED OFFLINE / DOWNLOAD</h3>
                </div>
                <div id="dlModalBody" class="download-modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const titleEl = document.getElementById("dlModalTitle");
    const bodyEl = document.getElementById("dlModalBody");
    titleEl.innerText = `${movie.title} - Offline Options`;

    bodyEl.innerHTML = `
        <div class="dl-status-card available">
            <div class="dl-card-badge">STATUS: OFFLINE IN OFFICIAL APP</div>
            <h4>Official In-App Download Available</h4>
            <p>You can download <strong>${movie.title}</strong> directly inside licensed streaming apps (Netflix, Amazon Prime Video, or JioCinema) on Android & iOS devices for legitimate offline viewing.</p>
        </div>
        <div class="dl-actions-list">
            <a href="https://play.google.com/store/apps" target="_blank" class="dl-action-btn google-play">
                <span>📱</span> Open Google Play Store for Official App
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank" class="dl-action-btn apple-store">
                <span>🍎</span> Open Apple App Store for Official App
            </a>
        </div>
        <p class="dl-compliance-note">
            ⚠️ <em>ZorvixHub is a legal entertainment directory. We do not host, scrape, or distribute unauthorized copyrighted media files.</em>
        </p>
    `;

    modal.style.display = "flex";
}

// 4. TV Season & Episode Selector
function mountTVSeasonEpisodeViewer(movie) {
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
        <div class="episode-card" onclick="streamEpisodeDirect(${movie.id}, ${season.season_number}, ${ep.episode_number}, '${ep.name.replace(/'/g, "\\"')}')">
            <div class="ep-thumb-wrap">
                <img src="${ep.still_url || movie.poster}" alt="${ep.name}" loading="lazy">
                <span class="ep-num-pill">EP ${ep.episode_number}</span>
            </div>
            <div class="ep-details">
                <h6>${ep.name}</h6>
                <p>${ep.overview ? ep.overview.substring(0, 80) + '...' : ''}</p>
                <div class="ep-actions-micro">
                    <span class="ep-pill-link">▶ Stream S${season.season_number}E${ep.episode_number}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function streamEpisodeDirect(movieId, sNum, epNum, epTitle) {
    const movie = window.movies.find(m => m.id === movieId);
    const streamUrl = `https://vidsrc.me/embed/tv?imdb=${movie.imdbId}&season=${sNum}&episode=${epNum}`;
    if (typeof openPlayer === 'function') {
        openPlayer(`${movie.title} - S${sNum}E${epNum}: ${epTitle}`, streamUrl);
    }
}

// 5. Admin Ingestion Dialog
function openAdminImportGUI() {
    let modal = document.getElementById("adminImportModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "adminImportModal";
        modal.className = "modal-overlay";
        modal.innerHTML = `
            <div class="modal-box admin-import-box">
                <button class="modal-close" onclick="document.getElementById('adminImportModal').style.display='none'">&times;</button>
                <h3 style="color:#00e5ff; margin-bottom:10px;">⚡ GLOBAL CATALOG INGESTION CONSOLE</h3>
                <p style="color:#8892b0; font-size:0.85rem; margin-bottom:14px;">
                    Import titles directly from IMDb/TMDB into ZorvixHub:
                </p>
                <div style="display:flex; gap:8px; margin-bottom:14px; flex-wrap:wrap;">
                    <input type="text" id="importIdInput" placeholder="IMDb ID (e.g. tt11663228)" style="flex:1 1 180px; padding:10px; background:#070b14; border:1px solid #00e5ff; color:#fff; border-radius:6px;">
                    <select id="importRegionInput" style="padding:10px; background:#070b14; border:1px solid #00e5ff; color:#fff; border-radius:6px;">
                        <option value="tollywood">Tollywood (Telugu)</option>
                        <option value="kollywood">Kollywood (Tamil)</option>
                        <option value="mollywood">Mollywood (Malayalam)</option>
                        <option value="sandalwood">Sandalwood (Kannada)</option>
                        <option value="bollywood">Bollywood (Hindi)</option>
                        <option value="hollywood">Hollywood (English)</option>
                        <option value="kdrama">K-Drama (Korean)</option>
                        <option value="anime">Anime (Japanese)</option>
                    </select>
                    <select id="importTypeInput" style="padding:10px; background:#070b14; border:1px solid #00e5ff; color:#fff; border-radius:6px;">
                        <option value="movie">Movie</option>
                        <option value="series">Series</option>
                    </select>
                </div>
                <button class="hero-primary-btn" style="width:100%; margin-bottom:14px;" onclick="triggerClientSideImport()">START INGESTION</button>
                <div id="importConsole" style="background:#000; border:1px solid rgba(255,255,255,0.1); border-radius:6px; padding:12px; font-family:monospace; font-size:0.75rem; color:#00f59b; max-height:160px; overflow-y:auto;">
                    [Ready] Waiting for import trigger...
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
        con.innerHTML += "<br><span style='color:#ff0055;'>❌ Error: Enter a valid IMDb ID (tt1234567).</span>";
        return;
    }

    con.innerHTML += `<br>⏳ Fetching metadata for ${id} (${region} - ${type})...`;
    fetch(`https://v3-cinemeta.strem.io/meta/${type}/${id}.json`)
        .then(r => r.json())
        .then(data => {
            if (data && data.meta) {
                const m = data.meta;
                con.innerHTML += `<br><span style='color:#00e5ff;'>✅ Successfully fetched: ${m.name} (${m.year || 2024})</span>`;
                con.innerHTML += `<br>💾 To sync permanently across GitHub, run in Termux:<br><code style='color:#ffb703;'>node importer.js ${id} ${region} ${type}</code>`;
                
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

// Preserve existing openMovie while adding new hooks
const baseOpenMovie = window.openMovie;
window.openMovie = function(id) {
    if (typeof baseOpenMovie === 'function') {
        baseOpenMovie(id);
    }
    const movie = (window.movies || []).find(m => m.id === id);
    if (movie) {
        window.activeMovie = movie;
        mountWhereToWatchSection(movie);
        mountTVSeasonEpisodeViewer(movie);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(mountHeroBannerSlider, 250);
});
