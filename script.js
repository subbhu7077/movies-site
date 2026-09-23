const ADSTERRA_DIRECT_LINK = "https://your-adsterra-direct-link-here.com";

// --- CLIENT-SIDE ANALYTICS ENGINE ---
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
        stats.movieClicks[id] = (stats.movieClicks[id] || 0) + 1;
    }

    localStorage.setItem('cinehub_analytics', JSON.stringify(stats));
}

// Log initial visit
trackEvent('view');

// Movies Catalog
const movies = [
    {
        id: 1,
        name: "Cyberpunk 2099",
        category: "action",
        quality: "4K",
        rating: "8.8",
        size: "2.4 GB",
        year: "2025",
        audio: "Dual [Hin+Eng]",
        story: "In a neon-drenched dystopian megacity, a rogue mercenary hacks into a corporate neural net, uncovering a conspiracy that could bring down the digital empire.",
        poster: "https://picsum.photos/300/400?random=1",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        subtitleUrl: "https://subscene.best/cyberpunk.srt",
        servers: [
            { name: "⚡ Google Drive (High Speed)", tag: "Instant", url: "https://drive.google.com/cyberpunk" },
            { name: "🚀 Mega NZ Direct Cloud", tag: "Ultra 4K", url: "https://mega.nz/cyberpunk" },
            { name: "💾 Fast Server Mirror 2", tag: "Resume OK", url: "https://fastserver.com/cyberpunk" },
            { name: "📥 Torrent Magnet / Zip", tag: "P2P Fast", url: "https://torrent.com/cyberpunk" }
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
        story: "A soulful musical romance set across historic towns, testing timeless poetry and forbidden connections against family rivalries.",
        poster: "https://picsum.photos/300/400?random=2",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        subtitleUrl: "https://subscene.best/ishq.srt",
        servers: [
            { name: "⚡ Google Drive Direct", tag: "Instant", url: "https://drive.google.com/ishq" },
            { name: "🚀 Fast Cloud Mirror", tag: "Backup", url: "https://mega.nz/ishq" },
            { name: "💾 1080p WebRip Server", tag: "Fast", url: "https://webrip.com/ishq" }
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
        story: "A paragliding mishap lands an heiress in unfamiliar borders, sparking an unforgettable secret romance with an honorable officer.",
        poster: "https://picsum.photos/300/400?random=3",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        subtitleUrl: "https://subscene.best/kdrama.srt",
        servers: [
            { name: "⚡ Cloud Direct Stream Link", tag: "Direct", url: "https://mega.nz/kdrama" },
            { name: "🚀 Multi-Episode Fast Pack", tag: "Zip 720p", url: "https://mega.nz/kdrama-zip" }
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
        story: "Rocky Bhai's legacy echoes across international waters as global syndicates unite to challenge his absolute golden empire.",
        poster: "https://picsum.photos/300/400?random=6",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        subtitleUrl: "https://subscene.best/kgf.srt",
        servers: [
            { name: "⚡ Google Drive 4K HDR", tag: "Ultra Speed", url: "https://drive.google.com/kgf3" },
            { name: "🚀 Mega 60FPS Server", tag: "Instant", url: "https://mega.nz/kgf3" }
        ]
    },
    {
        id: 5,
        name: "Avengers: Secret Wars",
        category: "hollywood",
        quality: "4K",
        rating: "9.5",
        size: "3.9 GB",
        year: "2026",
        audio: "Dual [Hin+Eng]",
        story: "Multiverses collide in a cosmic battlefield where heroes and variants from every dimension wage the ultimate war for existence.",
        poster: "https://picsum.photos/300/400?random=7",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        subtitleUrl: "https://subscene.best/avengers.srt",
        servers: [
            { name: "⚡ IMAX Enhanced 4K", tag: "4K UHD", url: "https://drive.google.com/avengers" },
            { name: "🚀 Direct High Speed Cloud", tag: "Instant", url: "https://mega.nz/avengers" }
        ]
    },
    {
        id: 6,
        name: "Solo Leveling: Season 2",
        category: "anime",
        quality: "1080p",
        rating: "9.1",
        size: "1.4 GB",
        year: "2025",
        audio: "Dual [Hin+Jap]",
        story: "Sung Jinwoo unlocks the true power of the Shadow Monarch, raising immortal shadow armies to conquer deepest dungeon cataclysms.",
        poster: "https://picsum.photos/300/400?random=8",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        subtitleUrl: "https://subscene.best/solo.srt",
        servers: [
            { name: "⚡ Mega Anime Server", tag: "1080p 10bit", url: "https://mega.nz/sololeveling" },
            { name: "🚀 Google Drive All Episodes", tag: "Batch Pack", url: "https://drive.google.com/solo" }
        ]
    },
    {
        id: 7,
        name: "Mirzapur: The Final War",
        category: "series",
        quality: "1080p",
        rating: "8.9",
        size: "2.1 GB",
        year: "2025",
        audio: "Hindi [5.1 Audio]",
        story: "The throne of Purvanchal witnesses bloodiest clashes as old scores, broken alliances, and fierce rivalries ignite the final battle.",
        poster: "https://picsum.photos/300/400?random=9",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        subtitleUrl: "https://subscene.best/mirzapur.srt",
        servers: [
            { name: "⚡ Google Drive Complete Pack", tag: "All Episodes", url: "https://drive.google.com/mirzapur" },
            { name: "🚀 High Speed Zip Server", tag: "Resume OK", url: "https://mega.nz/mirzapur" }
        ]
    },
    {
        id: 8,
        name: "Retro City Turbo",
        category: "action",
        quality: "480p",
        rating: "7.8",
        size: "420 MB",
        year: "2023",
        audio: "Hindi Dubbed",
        story: "High-octane neon drag racing syndicate battles take over the streets in this adrenaline pumping retro speed thriller.",
        poster: "https://picsum.photos/300/400?random=4",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        subtitleUrl: "https://subscene.best/retro.srt",
        servers: [
            { name: "⚡ Fast Mobile Direct Link", tag: "Compressed", url: "https://mega.nz/retro" }
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

function renderMovies(list) {
    const container = document.getElementById('movieList');
    const counter = document.getElementById('movieCounter');
    const favs = getFavorites();

    if (counter) counter.innerText = list.length;

    if (list.length === 0) {
        container.innerHTML = `<div class="no-results">No movies found matching your selected filters! 🎬</div>`;
        return;
    }

    container.innerHTML = list.map(item => {
        const badgeClass = `badge-${item.quality.toLowerCase()}`;
        const isFav = favs.includes(item.id);

        return `
            <div class="card" onclick="openModal(${item.id})">
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
    }).join('');
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
    trackEvent('modal', movieId); // Analytics Track

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
    document.getElementById('videoPlayerFrame').src = url + "?autoplay=1";
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
    }
});

function startDownloadWithAd(button, targetAction, waitingText = "CONNECTING", movieId = null) {
    window.open(ADSTERRA_DIRECT_LINK, '_blank');
    if (movieId) trackEvent('download', movieId); // Analytics Track

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
        showToast("Deep Link copied to clipboard! 🔗");
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerText = '🔗 COPY';
        }, 2000);
    });
}

function shareOnWhatsApp() {
    const info = getShareInfo();
    if (!info) return;
    const msg = `🍿 *Watch/Download: ${info.movie.name}* (${info.movie.quality})\n⭐ IMDb: ${info.movie.rating} | 🔊 Audio: ${info.movie.audio}\n💾 Size: ${info.movie.size}\n\n⚡ Stream & Download Here:\n${info.shareUrl}`;
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
