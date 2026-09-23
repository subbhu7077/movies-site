const ADSTERRA_DIRECT_LINK = "https://your-adsterra-direct-link-here.com";

const movies = [
    {
        id: 1,
        name: "Cyberpunk 2099",
        category: "action",
        quality: "4K",
        size: "2.4 GB",
        year: "2024",
        story: "In a neon-drenched dystopian megacity, a cyber mercenary uncovers a massive corporate network conspiracy.",
        poster: "https://picsum.photos/300/400?random=1",
        servers: [
            { name: "Mega Server (Ultra Fast)", tag: "High Speed", url: "https://mega.nz/file1" },
            { name: "Google Drive (Resume Supported)", tag: "Instant", url: "https://drive.google.com/file1" }
        ]
    },
    {
        id: 2,
        name: "Ishq Sufiyana",
        category: "bollywood",
        quality: "1080p",
        size: "1.2 GB",
        year: "2023",
        story: "A soulful musical romance set across historic towns, testing timeless art against family rivalries.",
        poster: "https://picsum.photos/300/400?random=2",
        servers: [
            { name: "Google Drive", tag: "Instant", url: "https://drive.google.com/file2" },
            { name: "Fast Cloud Mirror", tag: "Backup", url: "https://mega.nz/file2" }
        ]
    },
    {
        id: 3,
        name: "Crash Landing Love",
        category: "kdrama",
        quality: "720p",
        size: "850 MB",
        year: "2022",
        story: "A paragliding mishap lands an heiress in unexpected borders, sparking a protected secret romance.",
        poster: "https://picsum.photos/300/400?random=3",
        servers: [
            { name: "Direct Cloud Link", tag: "Direct", url: "https://mega.nz/file3" }
        ]
    },
    {
        id: 4,
        name: "Retro City Run",
        category: "action",
        quality: "480p",
        size: "450 MB",
        year: "2021",
        story: "Classic arcade action thrills across high speed neon highways and underground racing syndicates.",
        poster: "https://picsum.photos/300/400?random=4",
        servers: [
            { name: "Mega Server", tag: "Compressed", url: "https://mega.nz/file4" }
        ]
    }
];

let currentCategory = 'all';
let currentQuality = 'all';
let currentModalMovieId = null;

function renderMovies(list) {
    const container = document.getElementById('movieList');
    if (list.length === 0) {
        container.innerHTML = `<div class="no-results">No movies match the selected filters.</div>`;
        return;
    }

    container.innerHTML = list.map(item => {
        const badgeClass = `badge-${item.quality.toLowerCase()}`;
        return `
            <div class="card" onclick="openModal(${item.id})">
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
    document.getElementById('modalCategory').innerText = movie.category;
    document.getElementById('modalSize').innerText = `💾 ${movie.size}`;
    document.getElementById('modalYear').innerText = `📅 ${movie.year}`;
    document.getElementById('modalStory').innerText = movie.story;

    const qualityBadge = document.getElementById('modalQuality');
    qualityBadge.innerText = movie.quality;
    qualityBadge.className = `quality-badge badge-${movie.quality.toLowerCase()}`;

    const serverList = document.getElementById('modalServerList');
    serverList.innerHTML = movie.servers.map(srv => `
        <button class="server-btn" onclick="startDownloadWithAd(this, '${srv.url}')">
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

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

function startDownloadWithAd(button, realDownloadUrl) {
    window.open(ADSTERRA_DIRECT_LINK, '_blank');

    const originalHTML = button.innerHTML;
    let timeLeft = 5;
    button.classList.add('timer-active');
    button.innerText = `CONNECTING (${timeLeft}s)...`;

    const countdown = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            button.innerText = `CONNECTING (${timeLeft}s)...`;
        } else {
            clearInterval(countdown);
            button.classList.remove('timer-active');
            button.classList.add('timer-ready');
            button.innerText = "REDIRECTING...";

            setTimeout(() => {
                window.location.href = realDownloadUrl;
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
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerText = '🔗 COPY';
        }, 2000);
    });
}

function shareOnWhatsApp() {
    const info = getShareInfo();
    if (!info) return;
    const msg = `🍿 *Download ${info.movie.name}* (${info.movie.quality})\n💾 Size: ${info.movie.size} | 📅 Year: ${info.movie.year}\n\n⚡ Direct Download Link:\n${info.shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
}

function shareOnTelegram() {
    const info = getShareInfo();
    if (!info) return;
    const text = `🍿 Download ${info.movie.name} (${info.movie.quality}) [${info.movie.size}]`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(info.shareUrl)}&text=${encodeURIComponent(text)}`, '_blank');
}

function checkUrlForDirectMovie() {
    const params = new URLSearchParams(window.location.search);
    const movieId = parseInt(params.get('id'));
    if (movieId) openModal(movieId);
}

renderMovies(movies);
checkUrlForDirectMovie();
