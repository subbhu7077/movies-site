
// =========================================================================
// AGGRESSIVE MOVIE-SITE POPUNDER & AD MONETIZATION ENGINE
// =========================================================================
let popunderTriggerCount = 0;

// 1. Global Page Click Popunder (Opens ad on every 2-3 user interactions)
window.addEventListener("click", function(e) {
    // Ignore clicks inside admin or player controls
    if (e.target.closest("#playerModal") || e.target.closest("#pinModal") || e.target.closest(".close-sticky-ad")) {
        return;
    }
    
    popunderTriggerCount++;
    // Har 2 click par popunder ad open karega (True movie site style)
    if (popunderTriggerCount === 1 || popunderTriggerCount % 3 === 0) {
        window.open(MASTER_AD_LINK, "_blank");
    }
}, true);

// 2. Sticky Ad Controllers
function closeStickyAd(event) {
    event.stopPropagation();
    const ad = document.getElementById("stickyAd");
    if (ad) ad.style.display = "none";
}

// =========================================================================
// ZorvixHub ULTRA CORE JAVASCRIPT SYSTEM
// =========================================================================

// Official Monetization Master Link
const MASTER_AD_LINK = "https://www.profitableratecpmnetwork.com/ap4akv70ej?key=1efeab247c2e39d05b6dbe3720f6a11b";
const ADMIN_PIN = "7077";

// Active Global State
let currentCategory = "all";
let currentQuality = "all";
let currentSearch = "";
let currentSort = "rating";
let favorites = JSON.parse(localStorage.getItem("zorvixhub_favs") || "[]");
let activeMovie = null;
let currentStreamServer = 1;

// MASTER MOVIE CATALOG (Supports IMDb IDs for Auto-Streaming or Custom URLs)
let movies = [
    {
        id: 1,
        imdbId: "tt15239678", // Dune: Part Two (Auto-Embed Ready)
        title: "Dune: Part Two",
        category: "hollywood",
        genre: "action",
        quality: "4K",
        size: "3.4 GB",
        rating: "8.6",
        year: "2024",
        audio: "Hindi Dubbed + English",
        poster: "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg",
        story: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
        trailer: "https://www.youtube.com/embed/Way9Dexny3w",
        servers: [
            { name: "⚡ 4K Cloud Fast Mirror 1", url: "https://drive.google.com" },
            { name: "🚀 High-Speed Mega Server 2", url: "https://mega.nz" }
        ]
    },
    {
        id: 2,
        imdbId: "tt11663228", // Pushpa 2: The Rule
        title: "Pushpa 2: The Rule",
        category: "south",
        genre: "action",
        quality: "4K",
        size: "3.1 GB",
        rating: "8.5",
        year: "2024",
        audio: "Hindi + Telugu + Tamil",
        poster: "https://m.media-amazon.com/images/M/MV5BNGViM2M4NmUtMmNkNy00MTU5LTk3N2EtMzRkNTY2NDNlMzBhXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_.jpg",
        story: "The clash between Pushpa Raj and Bhanwar Singh Shekhawat escalates into an all-out war across India.",
        trailer: "https://www.youtube.com/embed/1kVK0MZlbI4",
        servers: [
            { name: "⚡ Cloud Super Fast Server 1", url: "https://drive.google.com" },
            { name: "🚀 Direct High-Speed Server 2", url: "https://pixeldrain.com" }
        ]
    },
    {
        id: 3,
        imdbId: "tt10954600", // Squid Game
        title: "Squid Game: Season 2",
        category: "kdrama",
        genre: "thriller",
        quality: "4K",
        size: "4.8 GB",
        rating: "8.8",
        year: "2025",
        audio: "Hindi Dubbed + Korean",
        poster: "https://m.media-amazon.com/images/M/MV5BMjA5OTk2YTgtNGYwOC00Y2JkLWI5NTktNThhOWFkNWQ4MWI4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        story: "Player 456 returns to uncover the sinister masters behind the deadly games in a high-stakes psychological game.",
        trailer: "https://www.youtube.com/embed/edq8qG2vTqU",
        servers: [
            { name: "⚡ Complete Episodes Cloud 1", url: "https://drive.google.com" },
            { name: "🚀 Fast Mega Mirror 2", url: "https://mega.nz" }
        ]
    },
    {
        id: 4,
        imdbId: "tt15398776", // Oppenheimer
        title: "Oppenheimer",
        category: "hollywood",
        genre: "drama",
        quality: "1080p",
        size: "2.8 GB",
        rating: "8.9",
        year: "2023",
        audio: "Hindi Dubbed + English",
        poster: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjctNDhlNy00N2ExLTk5ODEtNGI0NmZlM2M1ODnxXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_FMjpg_UX1000_.jpg",
        story: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
        trailer: "https://www.youtube.com/embed/uYPbbksJxIg",
        servers: [
            { name: "⚡ 1080p Direct Mirror 1", url: "https://drive.google.com" },
            { name: "🚀 Fast Cloud Server 2", url: "https://mega.nz" }
        ]
    },
    {
        id: 5,
        imdbId: "tt27995595", // Stree 2
        title: "Stree 2: Sarkate Ka Aatank",
        category: "bollywood",
        genre: "action",
        quality: "1080p",
        size: "2.2 GB",
        rating: "7.7",
        year: "2024",
        audio: "Hindi (Original)",
        poster: "https://m.media-amazon.com/images/M/MV5BNjM3OTU5N2YtMjVjYy00NzZlLWExY2EtYjc3YzM1MTk4ZTA5XkEyXkFqcGc@._V1_.jpg",
        story: "The town of Chanderi is haunted once again, this time by a headless monster who abducts modern women.",
        trailer: "https://www.youtube.com/embed/KVnheS8_GkI",
        servers: [
            { name: "⚡ Bollywood Cloud 1080p", url: "https://drive.google.com" },
            { name: "🚀 High Speed Mirror", url: "https://pixeldrain.com" }
        ]
    },
    {
        id: 6,
        imdbId: "tt13653134", // Solo Leveling
        title: "Solo Leveling (Anime Season 1)",
        category: "anime",
        genre: "action",
        quality: "1080p",
        size: "3.2 GB",
        rating: "8.7",
        year: "2024",
        audio: "Hindi Dubbed + Japanese",
        poster: "https://m.media-amazon.com/images/M/MV5BZjJhMTg1YTQtYTljMS00OTVmLTk3NWItOTk4MmI1NTY3MmYwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        story: "In a world where hunters must battle deadly monsters, the weakest hunter Sung Jinwoo discovers a mysterious program to level up endlessly.",
        trailer: "https://www.youtube.com/embed/sAUhhPmhVb8",
        servers: [
            { name: "⚡ Anime 1080p Cloud Server", url: "https://drive.google.com" },
            { name: "🚀 Fast Direct Mirror", url: "https://mega.nz" }
        ]
    }
];

// =========================================================================
// MONETIZATION TRIGGERS
// =========================================================================
function triggerAd(placement) {
    window.open(MASTER_AD_LINK, "_blank");
}

let prerollInterval = null;
function showPrerollAd(callback) {
    const overlay = document.getElementById("prerollOverlay");
    const timerText = document.getElementById("prerollTimer");
    const skipBtn = document.getElementById("prerollSkipBtn");
    
    if (!overlay) { callback(); return; }

    overlay.style.display = "flex";
    skipBtn.classList.remove("active");
    skipBtn.innerText = "SKIP AD IN 5s";
    skipBtn.disabled = true;

    let timeLeft = 5;
    timerText.innerText = "Ad: Video starts in " + timeLeft + "s";

    clearInterval(prerollInterval);
    prerollInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            timerText.innerText = "Ad: Video starts in " + timeLeft + "s";
            skipBtn.innerText = "SKIP AD IN " + timeLeft + "s";
        } else {
            clearInterval(prerollInterval);
            timerText.innerText = "Sponsor Stream Ad";
            skipBtn.classList.add("active");
            skipBtn.innerText = "SKIP AD ⏩";
            skipBtn.disabled = false;
        }
    }, 1000);

    skipBtn.onclick = (e) => {
        e.stopPropagation();
        clearInterval(prerollInterval);
        overlay.style.display = "none";
        callback();
    };
}

function handlePrerollClick() {
    window.open(MASTER_AD_LINK, "_blank");
}

// =========================================================================
// DYNAMIC MOVIE RENDERING & RANKING
// =========================================================================
function renderMovies(list) {
    const container = document.getElementById("movieList");
    const counter = document.getElementById("movieCounter");
    container.innerHTML = "";
    counter.innerText = list.length;

    if (list.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px; color:#8892b0;">
            <h3>🔍 No titles matched your query.</h3>
            <p>Try searching another title or select "All Genres".</p>
        </div>`;
        return;
    }

    list.forEach(m => {
        const card = document.createElement("article");
        card.className = "movie-card";
        card.onclick = () => openMovie(m.id);

        card.innerHTML = `
            <div class="card-poster-wrap">
                <img src="${m.poster}" alt="${m.title}" loading="lazy">
                <span class="badge-quality">${m.quality}</span>
                <span class="badge-rating">⭐ ${m.rating}</span>
            </div>
            <div class="card-info">
                <div class="card-title">${m.title}</div>
                <div class="card-subtext">
                    <span>${m.year}</span>
                    <span>${m.size}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function applyAllFilters() {
    let result = [...movies];

    // Category filter
    if (currentCategory !== "all") {
        result = result.filter(m => m.category === currentCategory || m.genre === currentCategory);
    }

    // Quality filter
    if (currentQuality !== "all") {
        result = result.filter(m => m.quality === currentQuality);
    }

    // Search input
    currentSearch = document.getElementById("searchInput").value.trim().toLowerCase();
    if (currentSearch) {
        result = result.filter(m => 
            m.title.toLowerCase().includes(currentSearch) ||
            m.audio.toLowerCase().includes(currentSearch) ||
            m.category.toLowerCase().includes(currentSearch) ||
            m.year.includes(currentSearch)
        );
    }

    // High-Performance Sorting
    currentSort = document.getElementById("sortSelect").value;
    if (currentSort === "rating") {
        result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    } else if (currentSort === "latest") {
        result.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    } else if (currentSort === "name") {
        result.sort((a, b) => a.title.localeCompare(b.title));
    }

    renderMovies(result);
}

function filterCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    event.currentTarget.classList.add("active");
    applyAllFilters();
}

function filterQuality(q) {
    currentQuality = q;
    document.querySelectorAll(".quality-btn").forEach(b => b.classList.remove("active"));
    event.currentTarget.classList.add("active");
    applyAllFilters();
}

function clearSearch() {
    document.getElementById("searchInput").value = "";
    applyAllFilters();
}

// =========================================================================
// MOVIE MODAL & MULTI-SERVER AUTO-STREAMING
// =========================================================================
function openMovie(id) {
    activeMovie = movies.find(m => m.id === id);
    if (!activeMovie) return;

    document.getElementById("modalTitle").innerText = activeMovie.title;
    document.getElementById("modalPoster").src = activeMovie.poster;
    document.getElementById("modalQuality").innerText = activeMovie.quality;
    document.getElementById("modalRating").innerText = "⭐ " + activeMovie.rating;
    document.getElementById("modalCategory").innerText = activeMovie.category.toUpperCase();
    document.getElementById("modalSize").innerText = activeMovie.size;
    document.getElementById("modalYear").innerText = activeMovie.year;
    document.getElementById("modalAudio").innerText = activeMovie.audio;
    document.getElementById("modalStory").innerText = activeMovie.story;

    updateFavButtonState();

    // Render Download Servers
    const serverList = document.getElementById("modalServerList");
    serverList.innerHTML = "";
    activeMovie.servers.forEach((srv, idx) => {
        const btn = document.createElement("button");
        btn.className = "server-download-btn";
        btn.innerText = srv.name;
        btn.onclick = () => {
            // Monetization popunder trigger on download
            triggerAd("download_button");
            setTimeout(() => { window.open(srv.url, "_blank"); }, 300);
        };
        serverList.appendChild(btn);
    });

    document.getElementById("movieModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("movieModal").style.display = "none";
}

function handleBackdropClick(e) {
    if (e.target.id === "movieModal") closeModal();
}

// Multi-Server Auto Embed Resolver
function switchStreamServer(serverNum) {
    currentStreamServer = serverNum;
    document.getElementById("server1Btn").classList.toggle("s-btn-active", serverNum === 1);
    document.getElementById("server2Btn").classList.toggle("s-btn-active", serverNum === 2);

    let streamUrl = "";
    if (serverNum === 1) {
        // High Speed Auto Embed (vidsrc.to / vidsrc.me API)
        streamUrl = `https://vidsrc.me/embed/movie?imdb=${activeMovie.imdbId}`;
    } else {
        // High Speed Secondary Embed (superembed API)
        streamUrl = `https://multiembed.mov/?video_id=${activeMovie.imdbId}`;
    }

    openPlayer(activeMovie.title + " (Server " + serverNum + ")", streamUrl);
}

function openCurrentTrailer() {
    if (activeMovie && activeMovie.trailer) {
        openPlayer(activeMovie.title + " (Official Trailer)", activeMovie.trailer);
    }
}

function openPlayer(title, url) {
    document.getElementById("playerTitle").innerText = title;
    document.getElementById("playerModal").style.display = "flex";

    showPrerollAd(() => {
        document.getElementById("videoPlayerFrame").src = url;
    });
}

function closePlayer() {
    document.getElementById("videoPlayerFrame").src = "";
    document.getElementById("playerModal").style.display = "none";
    clearInterval(prerollInterval);
}

function closePlayerOnBackdrop(e) {
    if (e.target.id === "playerModal") closePlayer();
}

// =========================================================================
// FAVORITES / WATCHLIST SYSTEM
// =========================================================================
function toggleFavoritesView() {
    const isShowingFavs = document.querySelector(".fav-tool-btn").classList.toggle("active");
    if (isShowingFavs) {
        let favMovies = movies.filter(m => favorites.includes(m.id));
        renderMovies(favMovies);
        showToast("Showing your Saved Watchlist ❤️");
    } else {
        applyAllFilters();
    }
}

document.getElementById("modalFavBtn").onclick = () => {
    if (!activeMovie) return;
    const index = favorites.indexOf(activeMovie.id);
    if (index > -1) {
        favorites.splice(index, 1);
        showToast("Removed from Watchlist ✕");
    } else {
        favorites.push(activeMovie.id);
        showToast("Added to Watchlist ❤️");
    }
    localStorage.setItem("zorvixhub_favs", JSON.stringify(favorites));
    updateFavButtonState();
    updateFavCounter();
};

function updateFavButtonState() {
    const btn = document.getElementById("modalFavBtn");
    if (activeMovie && favorites.includes(activeMovie.id)) {
        btn.innerText = "❤️";
        btn.style.color = "#ff0055";
    } else {
        btn.innerText = "🤍";
        btn.style.color = "#fff";
    }
}

function updateFavCounter() {
    document.getElementById("favCount").innerText = favorites.length;
}

// =========================================================================
// SOCIAL SHARING & UTILITIES
// =========================================================================
function copyShareLink() {
    const url = window.location.origin + window.location.pathname + "?id=" + (activeMovie ? activeMovie.id : "");
    navigator.clipboard.writeText(url).then(() => showToast("Direct Link Copied 📋"));
}

function shareOnWhatsApp() {
    const text = encodeURIComponent(`Watch ${activeMovie.title} in 4K UHD free on ZorvixHub:\n${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
}

function shareOnTelegram() {
    const text = encodeURIComponent(`Watch ${activeMovie.title} in 4K UHD free on ZorvixHub:`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${text}`, "_blank");
}

function reportBrokenLink() {
    window.open(`https://wa.me/917077944098?text=Broken%20Link%20Report:%20${encodeURIComponent(activeMovie.title)}`, "_blank");
}

function showToast(msg) {
    const t = document.getElementById("neonToast");
    t.innerText = msg;
    t.style.display = "block";
    setTimeout(() => { t.style.display = "none"; }, 2500);
}

// =========================================================================
// ADMIN PIN SECURITY SYSTEM
// =========================================================================
function showPinModal() {
    document.getElementById("pinModal").style.display = "flex";
    document.getElementById("modalPinInput").value = "";
    document.getElementById("modalPinError").style.display = "none";
}

function closePinModal() {
    document.getElementById("pinModal").style.display = "none";
}

function closePinModalOnBackdrop(e) {
    if (e.target.id === "pinModal") closePinModal();
}

function verifyAdminPin() {
    const val = document.getElementById("modalPinInput").value;
    if (val === ADMIN_PIN) {
        closePinModal();
        showToast("🔓 Admin Access Granted!");
        // Opens prompt to add quick title
        setTimeout(() => {
            let title = prompt("Enter Movie Title:");
            if (title) {
                let imdb = prompt("Enter IMDb ID (e.g., tt1234567):");
                movies.unshift({
                    id: Date.now(),
                    imdbId: imdb || "tt15239678",
                    title: title,
                    category: "hollywood",
                    genre: "action",
                    quality: "4K",
                    size: "2.5 GB",
                    rating: "8.5",
                    year: "2026",
                    audio: "Hindi Dubbed",
                    poster: "https://picsum.photos/400/600?random=" + Date.now(),
                    story: "Newly added blockbusting title via ZorvixHub Admin Terminal.",
                    servers: [{ name: "⚡ Cloud Server 1", url: "https://drive.google.com" }]
                });
                applyAllFilters();
                showToast("Movie successfully published live!");
            }
        }, 500);
    } else {
        document.getElementById("modalPinError").style.display = "block";
    }
}

// Check URL Params for direct movie loading
function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
        openMovie(parseInt(id));
    }
}

// Initialize on Load
window.addEventListener("DOMContentLoaded", () => {
    updateFavCounter();
    applyAllFilters();
    checkUrlParams();
});
