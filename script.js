const ADSTERRA_DIRECT_LINK = "https://your-adsterra-direct-link-here.com";

// Full Comprehensive Movie Database
const movies = [
    {
        id: 1,
        name: "Cyberpunk 2099",
        category: "action",
        quality: "4K",
        rating: "8.6",
        size: "2.4 GB",
        year: "2024",
        audio: "Dual [Hin+Eng]",
        story: "In a neon-drenched dystopian megacity, a rogue mercenary hacks into a corporate neural network to expose a global mind-control project.",
        poster: "https://picsum.photos/300/400?random=1",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://mega.nz/stream-link-1",
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
        rating: "8.1",
        size: "1.2 GB",
        year: "2023",
        audio: "Hindi (Original)",
        story: "A soulful musical romance set across historic towns, where two passionate artists cross paths amidst family rivalries and timeless poetry.",
        poster: "https://picsum.photos/300/400?random=2",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://drive.google.com/stream-link-2",
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
        rating: "8.9",
        size: "850 MB",
        year: "2022",
        audio: "Korean [Hin Sub]",
        story: "A paragliding mishap lands a South Korean heiress across the border, where an army officer decides to protect and hide her from authorities.",
        poster: "https://picsum.photos/300/400?random=3",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://mega.nz/stream-kdrama",
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
        rating: "9.2",
        size: "3.1 GB",
        year: "2025",
        audio: "Dual [Hin+Kan]",
        story: "Rocky Bhai's legacy continues across international waters as underworld syndicates unite to challenge his absolute gold empire.",
        poster: "https://picsum.photos/300/400?random=6",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://drive.google.com/stream-kgf",
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
        rating: "9.4",
        size: "3.8 GB",
        year: "2026",
        audio: "Dual [Hin+Eng]",
        story: "Multiverses collide as heroes and villains from every dimension converge in a desperate battle for reality's survival.",
        poster: "https://picsum.photos/300/400?random=7",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://drive.google.com/stream-avengers",
        subtitleUrl: "https://subscene.best/avengers.srt",
        servers: [
            { name: "⚡ IMAX Enhanced Server", tag: "4K UHD", url: "https://drive.google.com/avengers" },
            { name: "🚀 Direct High Speed Cloud", tag: "Instant", url: "https://mega.nz/avengers" }
        ]
    },
    {
        id: 6,
        name: "Solo Leveling: Season 2",
        category: "anime",
        quality: "1080p",
        rating: "9.0",
        size: "1.4 GB",
        year: "2025",
        audio: "Dual [Hin+Jap]",
        story: "Sung Jinwoo awakens his true Monarch powers, conquering deepest shadow gates and commanding armies of the dead.",
        poster: "https://picsum.photos/300/400?random=8",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamUrl: "https://mega.nz/solo-stream",
        subtitleUrl: "https://subscene.best/solo.srt",
        servers: [
            { name: "⚡ Mega Anime Server", tag: "1080p 10bit", url: "https://mega.nz/sololeveling" },
            { name: "🚀 Google Drive All Episodes", tag: "Batch Pack", url: "https://drive.google.com/solo" }
        ]
    }
];

let currentCategory = 'all';
let currentQuality = 'all';
let currentModalMovieId = null;

function renderMovies(list) {
    const container = document.getElementById('movieList');
    if (list.length === 0) {
        container.innerHTML = `<div class="no-results">No movies or series match your search.</div>`;
        return;
    }

    container.innerHTML = list.map(item => {
        const badgeClass = `badge-${item.quality.toLowerCase()}`;
        return `
            <div class="card" onclick="openModal(${item.id})">
                <span class="rating-badge">⭐ ${item.rating}</span>
                <span class="quality-badge ${badgeClass}">${item.quality}</span>
                <img src="${item.poster}" alt="${item.name}">
                <div class="card-body">
                    <h3>${item.name}</h3>
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
    const filtered = movies.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(query);
        const matchesCategory = (currentCategory === 'all') || (m.category === currentCategory);
        const matchesQuality = (currentQuality === 'all') || (m.quality.toUpperCase() === currentQuality.toUpperCase());
        return matchesSearch && matchesCategory && matchesQuality;
    });
    renderMovies(filtered);
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

    // Stream Online Button Click
    const streamBtn = document.getElementById('modalStreamBtn');
    streamBtn.className = 'stream-btn';
    streamBtn.innerText = '▶ WATCH ONLINE (STREAM)';
    streamBtn.onclick = function() {
        startDownloadWithAd(this, movie.streamUrl, "BUFFERING PLAYER");
    };

    // Watch Trailer Button Click
    const trailerBtn = document.getElementById('modalTrailerBtn');
    trailerBtn.onclick = function() {
        openTrailer(movie.trailerUrl);
    };

    // Subtitles Button
    const subBtn = document.getElementById('modalSubtitlesBtn');
    subBtn.onclick = function() {
        window.open(movie.subtitleUrl, '_blank');
    };

    // Dynamic Download Servers List
    const serverList = document.getElementById('modalServerList');
    serverList.innerHTML = movie.servers.map(srv => `
        <button class="server-btn" onclick="startDownloadWithAd(this, '${srv.url}', 'CONNECTING SERVER')">
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

// Trailer Video Modal Controls
function openTrailer(url) {
    document.getElementById('trailerFrame').src = url + "?autoplay=1";
    document.getElementById('trailerModal').style.display = 'flex';
}

function closeTrailer() {
    document.getElementById('trailerFrame').src = "";
    document.getElementById('trailerModal').style.display = 'none';
}

function closeTrailerOnBackdrop(e) {
    if (e.target.id === 'trailerModal') closeTrailer();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeTrailer();
    }
});

// Ad Trigger + 5s Glowing Countdown
function startDownloadWithAd(button, realUrl, waitingText = "CONNECTING") {
    window.open(ADSTERRA_DIRECT_LINK, '_blank');

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
            button.innerText = "STARTING...";

            setTimeout(() => {
                window.location.href = realUrl;
                button.classList.remove('timer-ready');
                button.innerHTML = originalHTML;
            }, 1000);
        }
    }, 1000);
}

// Share Functions
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
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerText = '🔗 COPY';
        }, 2000);
    });
}

function shareOnWhatsApp() {
    const info = getShareInfo();
    if (!info) return;
    const msg = `🍿 *Watch/Download: ${info.movie.name}* (${info.movie.quality})\n⭐ IMDb: ${info.movie.rating} | 🔊 Audio: ${info.movie.audio}\n💾 Size: ${info.movie.size}\n\n⚡ Direct Link:\n${info.shareUrl}`;
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

function checkUrlForDirectMovie() {
    const params = new URLSearchParams(window.location.search);
    const movieId = parseInt(params.get('id'));
    if (movieId) openModal(movieId);
}

// Initial Run
renderMovies(movies);
checkUrlForDirectMovie();
