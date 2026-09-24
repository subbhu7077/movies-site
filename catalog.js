/**
 * ZORVIXHUB GLOBAL CATALOG ENGINE & VIEWER
 * Handles: Hero Banner Slider, Regional Drawer, Season/Episode Switcher,
 * Legal Watch Providers & Typo-Tolerant Search
 */

// Initialize Regional Filter Tabs
const REGIONS = [
    { id: "all", label: "🔥 All Trending" },
    { id: "hollywood", label: "🎬 Hollywood (EN)" },
    { id: "bollywood", label: "🇮🇳 Bollywood (HI)" },
    { id: "tollywood", label: "⚡ Telugu (Tollywood)" },
    { id: "kollywood", label: "🏹 Tamil (Kollywood)" },
    { id: "mollywood", label: "🌴 Malayalam (Mollywood)" },
    { id: "sandalwood", label: "👑 Kannada (Sandalwood)" },
    { id: "kdrama", label: "🇰🇷 K-Drama" },
    { id: "cdrama", label: "🇨🇳 C-Drama" },
    { id: "anime", label: "⛩️ Anime Universe" },
    { id: "series", label: "📺 Web Series & OTT" }
];

let heroSlideIndex = 0;
let heroSlideTimer = null;

// Build Hero Slider on page
function initHeroSlider() {
    const heroWrap = document.getElementById("heroSlider");
    if (!heroWrap || !window.movies || window.movies.length === 0) return;

    const featured = window.movies.slice(0, 5);
    heroWrap.innerHTML = `
        <div class="hero-slides-track" id="heroTrack">
            ${featured.map((m, idx) => `
                <div class="hero-slide ${idx === 0 ? 'active' : ''}" style="background-image: linear-gradient(180deg, rgba(7,11,20,0.2) 0\%, rgba(7,11,20,0.95) 100\%), url('${m.backdrop || m.poster}')">
                    <div class="hero-slide-content">
                        <span class="hero-badge">⭐ ${m.rating} • ${m.year} •${m.category.toUpperCase()}</span>
                        <h2 class="hero-title">${m.title}</h2>
                        <p class="hero-story">${m.story ? m.story.substring(0, 160) + '...' : ''}</p>
                        <div class="hero-action-row">
                            <button class="hero-btn-play" onclick="openMovie(${m.id})">▶ EXPLORE TITLE</button>
                            <button class="hero-btn-trailer" onclick="openHeroTrailer('${m.trailer}')">🎬 WATCH TRAILER</button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="hero-nav-dots" id="heroDots">
            ${featured.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" onclick="setHeroSlide(${i})"></span>`).join('')}
        </div>
    `;

    clearInterval(heroSlideTimer);
    heroSlideTimer = setInterval(() => {
        heroSlideIndex = (heroSlideIndex + 1) % featured.length;
        setHeroSlide(heroSlideIndex);
    }, 6000);
}

function setHeroSlide(idx) {
    heroSlideIndex = idx;
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-nav-dots .dot");
    slides.forEach((s, i) => s.classList.toggle("active", i === idx));
    dots.forEach((d, i) => d.classList.toggle("active", i === idx));
}

function openHeroTrailer(url) {
    if (typeof openPlayer === 'function') {
        openPlayer("Official Trailer", url);
    }
}

// Render TV Season & Episode Modal Viewer
function renderSeasonEpisodeViewer(movie) {
    const box = document.getElementById("seasonEpisodeSection");
    if (!box) return;

    if (!movie.seasons || movie.seasons.length === 0) {
        box.style.display = "none";
        return;
    }

    box.style.display = "block";
    box.innerHTML = `
        <div class="season-header">
            <h4>📺 SELECT SEASON & EPISODE</h4>
            <select id="seasonDropdown" onchange="switchSeasonView(${movie.id}, this.value)">
                ${movie.seasons.map(s => `<option value="${s.seasonNumber}">Season ${s.seasonNumber} (${s.episodeCount} Episodes)</option>`).join('')}
            </select>
        </div>
        <div id="episodeGrid" class="episode-cards-grid"></div>
    `;

    switchSeasonView(movie.id, movie.seasons[0].seasonNumber);
}

function switchSeasonView(movieId, seasonNumber) {
    const movie = window.movies.find(m => m.id === movieId);
    if (!movie || !movie.seasons) return;
    const season = movie.seasons.find(s => s.seasonNumber == seasonNumber) || movie.seasons[0];
    const grid = document.getElementById("episodeGrid");
    if (!grid) return;

    grid.innerHTML = season.episodes.map(ep => `
        <div class="episode-card" onclick="playEpisodeDirect(${movie.id}, ${season.seasonNumber}, ${ep.episodeNumber}, '${ep.title}')">
            <div class="ep-img-wrap">
                <img src="${ep.thumbnail || movie.poster}" alt="${ep.title}" loading="lazy">
                <span class="ep-badge">EP ${ep.episodeNumber}</span>
            </div>
            <div class="ep-info">
                <h6>${ep.title}</h6>
                <p>${ep.overview ? ep.overview.substring(0, 75) + '...' : ''}</p>
            </div>
        </div>
    `).join('');
}

function playEpisodeDirect(movieId, sNum, epNum, epTitle) {
    const movie = window.movies.find(m => m.id === movieId);
    const streamUrl = `https://vidsrc.me/embed/tv?imdb=${movie.imdbId}&season=${sNum}&episode=${epNum}`;
    if (typeof openPlayer === 'function') {
        openPlayer(`${movie.title} - S${sNum}E${epNum}: ${epTitle}`, streamUrl);
    }
}

// Render Legal Where to Watch Badges
function renderLegalWatchProviders(movie) {
    const providerBox = document.getElementById("legalWatchSection");
    if (!providerBox) return;

    const providers = movie.watchProviders || [
        { provider: "Official Platform", type: "Licensed", url: `https://www.google.com/search?q=${encodeURIComponent(movie.title + " legal streaming")}` }
    ];

    providerBox.innerHTML = `
        <p class="section-micro-heading">🏛️ OFFICIAL & LICENSED WATCH PROVIDERS:</p>
        <div class="providers-row">
            ${providers.map(p => `
                <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="provider-pill">
                    <span class="p-dot"></span>
                    <strong>${p.provider}</strong>
                    <span class="p-type">${p.type}</span>
                </a>
            `).join('')}
        </div>
    `;
}

// Hook into existing openMovie function safely
const originalOpenMovie = window.openMovie;
window.openMovie = function(id) {
    if (typeof originalOpenMovie === 'function') {
        originalOpenMovie(id);
    }
    const movie = (window.movies || []).find(m => m.id === id);
    if (movie) {
        renderSeasonEpisodeViewer(movie);
        renderLegalWatchProviders(movie);
    }
};

// Initial Hook
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initHeroSlider, 200);
});
