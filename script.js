// =========================================================================
// 💰 MASTER MONETIZATION CONFIGURATION (Paste your Adsterra / Monetag Links)
// =========================================================================
const ADS_CONFIG = {
    // 1. Direct Link for Download Servers & Stream (High Converting)
    DOWNLOAD_DIRECT_LINK: "https://your-adsterra-direct-link-here.com",

    // 2. Popunder Direct Link on Card Click (Opens ad on movie click)
    POPUNDER_DIRECT_LINK: "https://your-adsterra-direct-link-here.com",

    // 3. Banner & Social Bar Click Link
    PROMO_DIRECT_LINK: "https://your-adsterra-direct-link-here.com"
};

// Analytics Tracker
function trackEvent(type, id = null) {
    let stats = JSON.parse(localStorage.getItem('cinehub_analytics')) || {
        pageViews: 0,
        downloadClicks: 0,
        movieClicks: {},
        movieViews: {}
    };

    if (type === 'view') {
        stats.pageViews += 1;
    } else if (type === 'modal' && id) {
        stats.movieViews[id] = (stats.movieViews[id] || 0) + 1;
    } else if (type === 'download' && id) {
        stats.downloadClicks += 1;
        if (id) stats.movieClicks[id] = (stats.movieClicks[id] || 0) + 1;
    }

    localStorage.setItem('cinehub_analytics', JSON.stringify(stats));
}
trackEvent('view');

// Smart Popunder on Card Click (Triggers ad, then opens modal)
function handleCardClick(movieId) {
    // Trigger Popunder Ad in new tab
    window.open(ADS_CONFIG.POPUNDER_DIRECT_LINK, '_blank');
    trackEvent('download', movieId);

    // Open Movie Modal on current screen
    openModal(movieId);
}

// Banner / Promo Ad Trigger
function triggerAd(adType) {
    window.open(ADS_CONFIG.PROMO_DIRECT_LINK, '_blank');
    trackEvent('download');
    showToast("Opening sponsored download channel... 🚀");
}

function closeStickyAd(e) {
    e.stopPropagation();
    document.getElementById('stickyAd').style.display = 'none';
}

// PIN Modal Functions
function showPinModal() {
    const modal = document.getElementById('pinModal');
    const input = document.getElementById('modalPinInput');
    const err = document.getElementById('modalPinError');
    if (modal) {
        err.style.display = 'none';
        input.value = '';
        modal.style.display = 'flex';
        input.focus();
    }
}

function closePinModal() {
    const modal = document.getElementById('pinModal');
    if (modal) modal.style.display = 'none';
}

function closePinModalOnBackdrop(e) {
    if (e.target.id === 'pinModal') closePinModal();
}

function verifyAdminPin() {
    const input = document.getElementById('modalPinInput').value.trim();
    const err = document.getElementById('modalPinError');
    if (input === "7077") {
        sessionStorage.setItem('cinehub_admin_auth', 'true');
        window.location.href = "admin.html";
    } else {
        err.style.display = 'block';
    }
}

// Movies Database
const movies = [
    {
        id: 100,
        name: "Special Upload (Filemoon)",
        category: "action",
        quality: "1080p",
        rating: "9.2",
        size: "1.6 GB",
        year: "2025",
        audio: "Hindi Dubbed",
        story: "High speed direct stream and cloud download hosted via Filemoon cloud storage servers.",
        poster: "https://picsum.photos/300/400?random=25",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://filemoon.org/e/l76mZJaomanY",
        subtitleUrl: "https://subscene.best/sub.srt",
        servers: [
            { name: "⚡ Filemoon Cloud Direct Server", tag: "Ultra Speed", url: "https://filemoon.org/en/l76mZJaomanY/file" },
            { name: "🚀 High Speed Mirror Link", tag: "Instant", url: "https://filemoon.org/en/l76mZJaomanY/file" }
        ]
    },
    {
        id: 1,
        name: "Cyberpunk 2099",
        category: "action",
        quality: "4K",
        rating: "8.8",
        size: "2.4 GB",
        year: "2025",
        audio: "Dual [Hin+Eng]",
        story: "In a neon-drenched dystopian megacity, a rogue mercenary hacks into a corporate neural net.",
        poster: "https://picsum.photos/300/400?random=1",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        subtitleUrl: "https://subscene.best/cyberpunk.srt",
        servers: [
            { name: "⚡ Google Drive (High Speed)", tag: "Instant", url: "https://drive.google.com/cyberpunk" },
            { name: "🚀 Mega NZ Direct Cloud", tag: "Ultra 4K", url: "https://mega.nz/cyberpunk" }
        ]
    },
    {
        id: 2,
        name: "Ishq Sufiyana",
        category: "bollywood",
        quality: "1080p",
        rating: "8.2",
        size: "1.2 GB",
        year: "2024",
        audio: "Hindi (Original)",
        story: "A soulful musical romance set across historic towns amidst family rivalries.",
        poster: "https://picsum.photos/300/400?random=2",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        subtitleUrl: "https://subscene.best/ishq.srt",
        servers: [
            { name: "⚡ Google Drive Direct", tag: "Instant", url: "https://drive.google.com/ishq" }
        ]
    },
    {
        id: 3,
        name: "Crash Landing Love",
        category: "kdrama",
        quality: "720p",
        rating: "9.0",
        size: "850 MB",
        year: "2023",
        audio: "Korean [Hin Sub]",
        story: "A paragliding mishap lands an heiress in unfamiliar borders with a secret romance.",
        poster: "https://picsum.photos/300/400?random=3",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        subtitleUrl: "https://subscene.best/kdrama.srt",
        servers: [
            { name: "⚡ Cloud Direct Link", tag: "Direct", url: "https://mega.nz/kdrama" }
        ]
    },
    {
        id: 4,
        name: "KGF: Chapter 3",
        category: "south",
        quality: "4K",
        rating: "9.3",
        size: "3.2 GB",
        year: "2025",
        audio: "Dual [Hin+Kan]",
        story: "Rocky Bhai's legacy echoes across international waters.",
        poster: "https://picsum.photos/300/400?random=6",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        subtitleUrl: "https://subscene.best/kgf.srt",
        servers: [
            { name: "⚡ Google Drive 4K HDR", tag: "Ultra Speed", url: "https://drive.google.com/kgf3" }
        ]
    }
];

let currentCategory = 'all';
let currentQuality = 'all';
let currentModalMovieId = null;
let showOnlyFavorites = false;

function getFavorites() {
    return JSON.parse(localStorage.getItem('cinehub_favs')) || [];
}

function saveFavorites(favs) {
    localStorage.setItem('cinehub_favs', JSON.stringify(favs));
    updateFavCount();
}

function updateFavCount() {
    const favs = getFavorites();
    const countEl = document.getElementById('favCount');
    if (countEl) countEl.innerText = favs.length;
}

function toggleFavorite(e, movieId) {
    e.stopPropagation();
    let favs = getFavorites();
    if (favs.includes(movieId)) {
        favs = favs.filter(id => id !== movieId);
        showToast("Removed from Watchlist! 💔");
    } else {
        favs.push(movieId);
        showToast("Added to Watchlist! ❤️");
    }
    saveFavorites(favs);
    applyAllFilters();
    updateModalHeart(movieId);
}

function updateModalHeart(movieId) {
    const heartBtn = document.getElementById('modalFavBtn');
    if (!heartBtn) return;
    const favs = getFavorites();
    heartBtn.innerHTML = favs.includes(movieId) ? '❤️' : '🤍';
}

function toggleFavoritesView() {
    showOnlyFavorites = !showOnlyFavorites;
    const btn = document.querySelector('.fav-tool-btn');
    if (btn) btn.classList.toggle('active', showOnlyFavorites);
    applyAllFilters();
}

// Render Movies + Insert Native Ads into Grid
function renderMovies(list) {
    const container = document.getElementById('movieList');
    const counter = document.getElementById('movieCounter');
    const favs = getFavorites();

    if (counter) counter.innerText = list.length;

    if (list.length === 0) {
        container.innerHTML = `<div class="no-results">No movies found! 🎬</div>`;
        return;
    }

    let html = '';
    list.forEach((item, index) => {
        const badgeClass = `badge-${item.quality.toLowerCase()}`;
        const isFav = favs.includes(item.id);

        html += `
            <div class="card" onclick="handleCardClick(${item.id})">
                <span class="rating-badge">⭐ ${item.rating}</span>
                <span class="quality-badge ${badgeClass}">${item.quality}</span>
                <img src="${item.poster}" alt="${item.name}" loading="lazy">
                <div class="card-body">
                    <div class="card-title-row">
                        <h3>${item.name}</h3>
                        <button class="card-heart-btn" onclick="toggleFavorite(event, ${item.id})">
                            ${isFav ? '❤️' : '🤍'}
                        </button>
                    </div>
                    <div class="card-footer-meta">
                        <span>📅 ${item.year}</span>
                        <span>💾 ${item.size}</span>
                    </div>
                    <button class="neon-download-btn" style="pointer-events: none;">
                        VIEW DETAILS
                    </button>
                </div>
            </div>
        `;

        // 💰 Native Sponsored Ad Card inserted after Card #2
        if (index === 1) {
            html += `
                <div class="card native-ad-card" onclick="triggerAd('native_grid')">
                    <span class="ad-badge-top">SPONSORED</span>
                    <img src="https://picsum.photos/300/400?random=88" alt="Ad">
                    <div class="card-body">
                        <div class="card-title-row">
                            <h3 style="color:#ff0055;">🔥 VIP Movie Pass (Ad)</h3>
                        </div>
                        <p style="font-size:0.75rem; color:#8892b0; margin-bottom:10px;">Unlock Direct Mega & Google Drive Unlimited Speeds.</p>
                        <button class="neon-download-btn" style="border-color:#ff0055; color:#ff0055;">
                            DOWNLOAD NOW
                        </button>
                    </div>
                </div>
            `;
        }
    });

    container.innerHTML = html;
}

function applyAllFilters() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const clearBtn = document.getElementById('clearSearchBtn');
    const sortVal = document.getElementById('sortSelect').value;
    const favs = getFavorites();

    if (clearBtn) clearBtn.style.display = query.length > 0 ? 'block' : 'none';

    let filtered = movies.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(query) || m.audio.toLowerCase().includes(query);
        const matchesCategory = (currentCategory === 'all') || (m.category === currentCategory);
        const matchesQuality = (currentQuality === 'all') || (m.quality.toUpperCase() === currentQuality.toUpperCase());
        const matchesFav = !showOnlyFavorites || favs.includes(m.id);

        return matchesSearch && matchesCategory && matchesQuality && matchesFav;
    });

    if (sortVal === 'rating') {
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    } else if (sortVal === 'latest') {
        filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    } else if (sortVal === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderMovies(filtered);
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    applyAllFilters();
}

function filterCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.category-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    applyAllFilters();
}

function filterQuality(quality) {
    currentQuality = quality;
    document.querySelectorAll('.quality-tabs .quality-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    applyAllFilters();
}

function openModal(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;

    currentModalMovieId = movieId;
    trackEvent('modal', movieId);

    const shareBtn = document.getElementById('modalShareBtn');
    if (shareBtn) {
        shareBtn.classList.remove('copied');
        shareBtn.innerText = '🔗 COPY';
    }

    document.getElementById('modalPoster').src = movie.poster;
    document.getElementById('modalTitle').innerText = movie.name;
    document.getElementById('modalRating').innerText = `⭐ ${movie.rating}`;
    document.getElementById('modalCategory').innerText = movie.category;
    document.getElementById('modalSize').innerText = `💾 ${movie.size}`;
    document.getElementById('modalYear').innerText = `📅 ${movie.year}`;
    document.getElementById('modalAudio').innerText = `🔊 ${movie.audio}`;
    document.getElementById('modalStory').innerText = movie.story;

    const qualityBadge = document.getElementById('modalQuality');
    qualityBadge.innerText = movie.quality;
    qualityBadge.className = `quality-badge badge-${movie.quality.toLowerCase()}`;

    updateModalHeart(movieId);
    document.getElementById('modalFavBtn').onclick = (e) => toggleFavorite(e, movieId);

    // Watch Online Stream Button
    const streamBtn = document.getElementById('modalStreamBtn');
    streamBtn.className = 'stream-btn';
    streamBtn.innerText = '▶ WATCH ONLINE (STREAM)';
    streamBtn.onclick = function() {
        startDownloadWithAd(this, () => openPlayer(movie.name, movie.streamUrl), "INITIALIZING STREAM", movieId);
    };

    const trailerBtn = document.getElementById('modalTrailerBtn');
    trailerBtn.onclick = function() {
        openPlayer(`${movie.name} - Official Trailer`, movie.trailerUrl);
    };

    const subBtn = document.getElementById('modalSubtitlesBtn');
    subBtn.onclick = function() {
        window.open(movie.subtitleUrl, '_blank');
    };

    // Download Servers with 5s Timer + Direct Link Earning
    const serverList = document.getElementById('modalServerList');
    serverList.innerHTML = movie.servers.map(srv => `
        <button class="server-btn" onclick="startDownloadWithAd(this, '${srv.url}', 'CONNECTING SERVER', ${movie.id})">
            <span>⚡ ${srv.name}</span>
            <span class="server-speed">${srv.tag}</span>
        </button>
    `).join('');

    document.getElementById('movieModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('movieModal').style.display = 'none';
    window.history.replaceState({}, document.title, window.location.pathname);
}

function handleBackdropClick(e) {
    if (e.target.id === 'movieModal') closeModal();
}

function openPlayer(title, url) {
    document.getElementById('playerTitle').innerText = title;
    document.getElementById('videoPlayerFrame').src = url;
    document.getElementById('playerModal').style.display = 'flex';
}

function closePlayer() {
    document.getElementById('videoPlayerFrame').src = "";
    document.getElementById('playerModal').style.display = 'none';
}

function closePlayerOnBackdrop(e) {
    if (e.target.id === 'playerModal') closePlayer();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closePlayer();
        closePinModal();
    }
});

// Earning Action Trigger with 5-Second Timer
function startDownloadWithAd(button, targetAction, waitingText = "CONNECTING", movieId = null) {
    // 1. Open Monetization Direct Link in new tab
    window.open(ADS_CONFIG.DOWNLOAD_DIRECT_LINK, '_blank');
    if (movieId) trackEvent('download', movieId);

    const originalHTML = button.innerHTML;
    let timeLeft = 5;
    button.classList.add('timer-active');
    button.innerText = `${waitingText} (${timeLeft}s)...`;

    const countdown = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            button.innerText = `${waitingText} (${timeLeft}s)...`;
        } else {
            clearInterval(countdown);
            button.classList.remove('timer-active');
            button.classList.add('timer-ready');
            button.innerText = "READY! OPENING...";

            setTimeout(() => {
                if (typeof targetAction === 'function') {
                    targetAction();
                } else {
                    window.location.href = targetAction;
                }
                button.classList.remove('timer-ready');
                button.innerHTML = originalHTML;
            }, 1000);
        }
    }, 1000);
}

function getShareInfo() {
    if (!currentModalMovieId) return null;
    const movie = movies.find(m => m.id === currentModalMovieId);
    if (!movie) return null;
    const shareUrl = `${window.location.origin}${window.location.pathname}?id=${currentModalMovieId}`;
    return { movie, shareUrl };
}

function copyShareLink() {
    const info = getShareInfo();
    if (!info) return;

    navigator.clipboard.writeText(info.shareUrl).then(() => {
        const btn = document.getElementById('modalShareBtn');
        btn.classList.add('copied');
        btn.innerText = '✔ COPIED!';
        showToast("Link copied! 🔗");
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerText = '🔗 COPY';
        }, 2000);
    });
}

function shareOnWhatsApp() {
    const info = getShareInfo();
    if (!info) return;
    const msg = `🍿 *Watch/Download: ${info.movie.name}* (${info.movie.quality})\n⭐ IMDb: ${info.movie.rating} | 🔊 Audio: ${info.movie.audio}\n\n⚡ Stream & Download Here:\n${info.shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
}

function shareOnTelegram() {
    const info = getShareInfo();
    if (!info) return;
    const text = `🍿 Watch/Download: ${info.movie.name} (${info.movie.quality}) [IMDb: ${info.movie.rating}]`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(info.shareUrl)}&text=${encodeURIComponent(text)}`, '_blank');
}

function reportBrokenLink() {
    const info = getShareInfo();
    const movieName = info ? info.movie.name : "Unknown Movie";
    window.open(`https://t.me/your_telegram_channel?text=Report%20Broken%20Link:%20${encodeURIComponent(movieName)}`, '_blank');
}

function showToast(msg) {
    const toast = document.getElementById('neonToast');
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

function checkUrlForDirectMovie() {
    const params = new URLSearchParams(window.location.search);
    const movieId = parseInt(params.get('id'));
    if (movieId) openModal(movieId);
}

updateFavCount();
renderMovies(movies);
checkUrlForDirectMovie();
