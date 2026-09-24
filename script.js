// =========================================================================
// ZORVIXHUB MASTER ENGINE JAVASCRIPT
// =========================================================================

// Official Monetization Master Link
const MASTER_AD_LINK = "https://www.profitableratecpmnetwork.com/ap4akv70ej?key=1efeab247c2e39d05b6dbe3720f6a11b";
const ADMIN_PIN = "7077";

// Active Global State
let currentCategory = "all";
let currentQuality = "all";
let currentSearch = "";
let currentSort = "rating";
let favorites = JSON.parse(localStorage.getItem("cinehub_favs") || "[]");
let activeMovie = null;
let currentStreamServer = 1;
let popunderTriggerCount = 0;

// MASTER MOVIE CATALOG (Auto-Embed Ready with IMDb IDs)
let movies = [
    {
        "id": 1000,
        "imdbId": "tt6263850",
        "title": "Deadpool & Wolverine",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.4 GB",
        "rating": "7.7",
        "year": "2024",
        "audio": "Hindi Dubbed + English",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt6263850/img.jpg",
        "story": "Deadpool teams up with a reluctant Wolverine to face an existential threat to his home universe with explosive action and multiverse comedy.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Deadpool%20%26%20Wolverine%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1001,
        "imdbId": "tt9218128",
        "title": "Gladiator II",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.5 GB",
        "rating": "6.6",
        "year": "2024",
        "audio": "Hindi Dubbed + English",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt9218128/img.jpg",
        "story": "Years after witnessing the death of Maximus, Lucius must enter the Colosseum after his home is conquered by tyrannical emperors.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Gladiator%20II%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1002,
        "imdbId": "tt26932223",
        "title": "Bhool Bhulaiyaa 3",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "6.2",
        "year": "2024",
        "audio": "Hindi (Original)",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt26932223/img.jpg",
        "story": "Rooh Baba returns to tackle the supernatural spirit of Manjulika in the historic haunted palace of Raktaghat.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Bhool%20Bhulaiyaa%203%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1003,
        "imdbId": "tt11454532",
        "title": "Singham Again",
        "category": "bollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.2 GB",
        "rating": "5.5",
        "year": "2024",
        "audio": "Hindi (Original)",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt11454532/img.jpg",
        "story": "Bajirao Singham leads the cop universe in a high-octane rescue mission across Sri Lanka inspired by the epic Ramayana.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Singham%20Again%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1004,
        "imdbId": "tt26734796",
        "title": "Amaran",
        "category": "south",
        "genre": "action",
        "quality": "1080p",
        "size": "2.6 GB",
        "rating": "8.3",
        "year": "2024",
        "audio": "Hindi Dubbed + Tamil",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt26734796/img.jpg",
        "story": "The heroic true story of Major Mukund Varadarajan and his martyrdom during counter-terrorism operations in Jammu & Kashmir.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Amaran%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1005,
        "imdbId": "tt27487934",
        "title": "The Greatest of All Time (GOAT)",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.5 GB",
        "rating": "6.8",
        "year": "2024",
        "audio": "Hindi Dubbed + Tamil",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt27487934/img.jpg",
        "story": "A former elite agent from the Special Anti-Terrorist Squad is forced to confront a clone created from his past.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Greatest%20of%20All%20Time%20(GOAT)%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1006,
        "imdbId": "tt18412256",
        "title": "Alien: Romulus",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.1 GB",
        "rating": "7.2",
        "year": "2024",
        "audio": "Hindi Dubbed + English",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt18412256/img.jpg",
        "story": "A group of young space colonizers scavenge a derelict station and come face to face with the most terrifying life form in the universe.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Alien%3A%20Romulus%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1007,
        "imdbId": "tt22022452",
        "title": "Inside Out 2",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.2 GB",
        "rating": "7.6",
        "year": "2024",
        "audio": "Hindi Dubbed + English",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt22022452/img.jpg",
        "story": "Joy, Sadness, Anger, Fear, and Disgust navigate new teenage emotions including Anxiety in this record-breaking Pixar sequel.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Inside%20Out%202%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1008,
        "imdbId": "tt29623480",
        "title": "The Wild Robot",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "2.7 GB",
        "rating": "8.3",
        "year": "2024",
        "audio": "Hindi Dubbed + English",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt29623480/img.jpg",
        "story": "Shipwrecked on a deserted island, an intelligent robot named Roz must adapt to the wild surroundings and bond with wildlife.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Wild%20Robot%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1009,
        "imdbId": "tt13622970",
        "title": "Moana 2",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "2.8 GB",
        "rating": "6.8",
        "year": "2024",
        "audio": "Hindi Dubbed + English",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt13622970/img.jpg",
        "story": "Moana receives an unexpected call from her ancestors and sets off on an expansive journey into far uncharted waters.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Moana%202%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1010,
        "imdbId": "tt4220202",
        "title": "Wicked",
        "category": "hollywood",
        "genre": "romance",
        "quality": "4K",
        "size": "3.2 GB",
        "rating": "7.7",
        "year": "2024",
        "audio": "Hindi Dubbed + English",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt4220202/img.jpg",
        "story": "The untold story of the witches of Oz: Elphaba, misunderstood because of her green skin, and Glinda, popular and privileged.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Wicked%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1011,
        "imdbId": "tt27818458",
        "title": "Munjya",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.1 GB",
        "rating": "6.6",
        "year": "2024",
        "audio": "Hindi (Original)",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt27818458/img.jpg",
        "story": "A young man uncovers a long-hidden family secret and awakens the mischievous spirit of Munjya in the Konkan backwaters.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Munjya%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1012,
        "imdbId": "tt22039234",
        "title": "Kanguva",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.3 GB",
        "rating": "5.8",
        "year": "2024",
        "audio": "Hindi + Tamil + Telugu",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt22039234/img.jpg",
        "story": "A warrior from 1678 and a modern-day bounty hunter are connected by a shared destiny and ancient battle for honor.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Kanguva%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1013,
        "imdbId": "tt13818368",
        "title": "Fighter",
        "category": "bollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.2 GB",
        "rating": "6.4",
        "year": "2024",
        "audio": "Hindi (Original)",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt13818368/img.jpg",
        "story": "An elite Indian Air Force squadron battles enemy forces in high-altitude aerial dogfights to protect national sovereignty.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Fighter%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1014,
        "imdbId": "tt27734492",
        "title": "Shaitaan",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.3 GB",
        "rating": "6.6",
        "year": "2024",
        "audio": "Hindi (Original)",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt27734492/img.jpg",
        "story": "A family vacation turns into a terrifying nightmare when a mysterious stranger hypnotizes their teenage daughter.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Shaitaan%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1015,
        "imdbId": "tt30217036",
        "title": "Dandadan (Season 1)",
        "category": "anime",
        "genre": "action",
        "quality": "1080p",
        "size": "3.0 GB",
        "rating": "8.6",
        "year": "2024",
        "audio": "Hindi Dubbed + Japanese",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt30217036/img.jpg",
        "story": "Two high schoolers who believe in ghosts and aliens respectively find themselves hunted by supernatural entities across Japan.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Dandadan%20(Season%201)%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1016,
        "imdbId": "tt21650338",
        "title": "Kaiju No. 8",
        "category": "anime",
        "genre": "action",
        "quality": "1080p",
        "size": "2.9 GB",
        "rating": "8.1",
        "year": "2024",
        "audio": "Hindi Dubbed + Japanese",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt21650338/img.jpg",
        "story": "A man aspiring to join the Defense Force gains the ability to transform into a powerful Kaiju monster himself.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Kaiju%20No.%208%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1017,
        "imdbId": "tt27448348",
        "title": "Queen of Tears",
        "category": "kdrama",
        "genre": "romance",
        "quality": "1080p",
        "size": "4.2 GB",
        "rating": "8.3",
        "year": "2024",
        "audio": "Hindi Dubbed + Korean",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt27448348/img.jpg",
        "story": "The queen of department stores and her small-town husband weather a marital crisis until love miraculously begins to bloom again.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Queen%20of%20Tears%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1018,
        "imdbId": "tt14513804",
        "title": "Captain America: Brave New World",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.4 GB",
        "rating": "7.5",
        "year": "2025",
        "audio": "Hindi Dubbed + English",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt14513804/img.jpg",
        "story": "Sam Wilson takes flight as Captain America and finds himself in the middle of an international conspiracy involving Red Hulk.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Captain%20America%3A%20Brave%20New%20World%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1019,
        "imdbId": "tt5950044",
        "title": "Superman",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.6 GB",
        "rating": "8.0",
        "year": "2025",
        "audio": "Hindi Dubbed + English",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt5950044/img.jpg",
        "story": "Superman reconciles his alien heritage with his human upbringing, guided by truth, justice, and human kindness.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Superman%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1020,
        "imdbId": "tt27438466",
        "title": "War 2",
        "category": "bollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.5 GB",
        "rating": "8.4",
        "year": "2025",
        "audio": "Hindi (Original)",
        "trending": true,
        "poster": "https://images.metahub.space/poster/medium/tt27438466/img.jpg",
        "story": "Major Kabir Dhaliwal goes head-to-head in an intense international spy clash with Jr. NTR in the YRF Spy Universe.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=War%202%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1,
        "imdbId": "tt0499549",
        "title": "Avatar",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.2 GB",
        "rating": "7.9",
        "year": "2009",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0499549/img.jpg",
        "story": "Watch and stream Avatar (2009) in Ultra HD 4K with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Avatar%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 2,
        "imdbId": "tt1630029",
        "title": "Avatar: The Way of Water",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.8 GB",
        "rating": "7.6",
        "year": "2022",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt1630029/img.jpg",
        "story": "Watch and stream Avatar: The Way of Water (2022) in Ultra HD 4K with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Avatar%3A%20The%20Way%20of%20Water%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 3,
        "imdbId": "tt0120338",
        "title": "Titanic",
        "category": "hollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.9 GB",
        "rating": "7.9",
        "year": "1997",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0120338/img.jpg",
        "story": "Watch and stream Titanic (1997) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Titanic%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 4,
        "imdbId": "tt4154796",
        "title": "Avengers: Endgame",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.5 GB",
        "rating": "8.4",
        "year": "2019",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt4154796/img.jpg",
        "story": "Watch and stream Avengers: Endgame (2019) in Ultra HD 4K with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Avengers%3A%20Endgame%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 5,
        "imdbId": "tt4154756",
        "title": "Avengers: Infinity War",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.2 GB",
        "rating": "8.4",
        "year": "2018",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt4154756/img.jpg",
        "story": "Watch and stream Avengers: Infinity War (2018) in Ultra HD 4K with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Avengers%3A%20Infinity%20War%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 6,
        "imdbId": "tt10872600",
        "title": "Spider-Man: No Way Home",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.1 GB",
        "rating": "8.2",
        "year": "2021",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt10872600/img.jpg",
        "story": "Watch and stream Spider-Man: No Way Home (2021) in Ultra HD 4K with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Spider-Man%3A%20No%20Way%20Home%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 7,
        "imdbId": "tt2250912",
        "title": "Spider-Man: Homecoming",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "7.4",
        "year": "2017",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt2250912/img.jpg",
        "story": "Watch and stream Spider-Man: Homecoming (2017) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Spider-Man%3A%20Homecoming%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 8,
        "imdbId": "tt0468569",
        "title": "The Dark Knight",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.0 GB",
        "rating": "9.0",
        "year": "2008",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0468569/img.jpg",
        "story": "Watch and stream The Dark Knight (2008) in Ultra HD 4K with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Dark%20Knight%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 9,
        "imdbId": "tt1877830",
        "title": "The Batman",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.4 GB",
        "rating": "7.8",
        "year": "2022",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt1877830/img.jpg",
        "story": "Watch and stream The Batman (2022) in Ultra HD 4K with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Batman%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 10,
        "imdbId": "tt7286456",
        "title": "Joker",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "2.5 GB",
        "rating": "8.4",
        "year": "2019",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt7286456/img.jpg",
        "story": "Watch and stream Joker (2019) in Ultra HD 4K with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Joker%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 11,
        "imdbId": "tt1375666",
        "title": "Inception",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "2.8 GB",
        "rating": "8.8",
        "year": "2010",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt1375666/img.jpg",
        "story": "Watch and stream Inception (2010) in Ultra HD 4K with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Inception%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 12,
        "imdbId": "tt0816692",
        "title": "Interstellar",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.6 GB",
        "rating": "8.7",
        "year": "2014",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0816692/img.jpg",
        "story": "Watch and stream Interstellar (2014) in Ultra HD 4K with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Interstellar%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 13,
        "imdbId": "tt15398776",
        "title": "Oppenheimer",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.2 GB",
        "rating": "8.9",
        "year": "2023",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt15398776/img.jpg",
        "story": "Watch and stream Oppenheimer (2023) in Ultra HD 4K with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Oppenheimer%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 14,
        "imdbId": "tt0133093",
        "title": "The Matrix",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "2.7 GB",
        "rating": "8.7",
        "year": "1999",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0133093/img.jpg",
        "story": "Watch and stream The Matrix (1999) in Ultra HD 4K with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Matrix%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 15,
        "imdbId": "tt2911666",
        "title": "John Wick",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.1 GB",
        "rating": "7.4",
        "year": "2014",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt2911666/img.jpg",
        "story": "Watch and stream John Wick (2014) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=John%20Wick%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 16,
        "imdbId": "tt4425200",
        "title": "John Wick: Chapter 2",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.3 GB",
        "rating": "7.4",
        "year": "2017",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt4425200/img.jpg",
        "story": "Watch and stream John Wick: Chapter 2 (2017) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=John%20Wick%3A%20Chapter%202%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 17,
        "imdbId": "tt6146586",
        "title": "John Wick: Chapter 3 - Parabellum",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "2.8 GB",
        "rating": "7.4",
        "year": "2019",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt6146586/img.jpg",
        "story": "Watch and stream John Wick: Chapter 3 - Parabellum (2019) in Ultra HD 4K with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=John%20Wick%3A%20Chapter%203%20-%20Parabellum%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 18,
        "imdbId": "tt10366206",
        "title": "John Wick: Chapter 4",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.6 GB",
        "rating": "7.7",
        "year": "2023",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt10366206/img.jpg",
        "story": "Watch and stream John Wick: Chapter 4 (2023) in Ultra HD 4K with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=John%20Wick%3A%20Chapter%204%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 19,
        "imdbId": "tt0232500",
        "title": "The Fast and the Furious",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.2 GB",
        "rating": "6.8",
        "year": "2001",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0232500/img.jpg",
        "story": "Watch and stream The Fast and the Furious (2001) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Fast%20and%20the%20Furious%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 20,
        "imdbId": "tt0107290",
        "title": "Jurassic Park",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "8.2",
        "year": "1993",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0107290/img.jpg",
        "story": "Watch and stream Jurassic Park (1993) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Jurassic%20Park%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 21,
        "imdbId": "tt3694708",
        "title": "Jurassic World",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "2.9 GB",
        "rating": "6.9",
        "year": "2015",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt3694708/img.jpg",
        "story": "Watch and stream Jurassic World (2015) in Ultra HD 4K with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Jurassic%20World%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 22,
        "imdbId": "tt0418279",
        "title": "Transformers",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.7 GB",
        "rating": "7.0",
        "year": "2007",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0418279/img.jpg",
        "story": "Watch and stream Transformers (2007) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Transformers%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 23,
        "imdbId": "tt0117060",
        "title": "Mission: Impossible",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.2 GB",
        "rating": "7.2",
        "year": "1996",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0117060/img.jpg",
        "story": "Watch and stream Mission: Impossible (1996) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Mission%3A%20Impossible%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 24,
        "imdbId": "tt1745960",
        "title": "Top Gun: Maverick",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.1 GB",
        "rating": "8.3",
        "year": "2022",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt1745960/img.jpg",
        "story": "Watch and stream Top Gun: Maverick (2022) in Ultra HD 4K with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Top%20Gun%3A%20Maverick%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 25,
        "imdbId": "tt0120737",
        "title": "The Lord of the Rings: Fellowship",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "4.2 GB",
        "rating": "8.9",
        "year": "2001",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0120737/img.jpg",
        "story": "Watch and stream The Lord of the Rings: Fellowship (2001) in Ultra HD 4K with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Lord%20of%20the%20Rings%3A%20Fellowship%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 26,
        "imdbId": "tt0241527",
        "title": "Harry Potter & Sorcerer's Stone",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.8 GB",
        "rating": "7.6",
        "year": "2001",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0241527/img.jpg",
        "story": "Watch and stream Harry Potter & Sorcerer's Stone (2001) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Harry%20Potter%20%26%20Sorcerer's%20Stone%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 27,
        "imdbId": "tt0325980",
        "title": "Pirates of the Caribbean",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.6 GB",
        "rating": "8.1",
        "year": "2003",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0325980/img.jpg",
        "story": "Watch and stream Pirates of the Caribbean (2003) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Pirates%20of%20the%20Caribbean%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 28,
        "imdbId": "tt1392170",
        "title": "The Hunger Games",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.3 GB",
        "rating": "7.2",
        "year": "2012",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt1392170/img.jpg",
        "story": "Watch and stream The Hunger Games (2012) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Hunger%20Games%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 29,
        "imdbId": "tt1099212",
        "title": "Twilight",
        "category": "hollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.1 GB",
        "rating": "5.3",
        "year": "2008",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt1099212/img.jpg",
        "story": "Watch and stream Twilight (2008) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Twilight%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 30,
        "imdbId": "tt1457767",
        "title": "The Conjuring",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.0 GB",
        "rating": "7.5",
        "year": "2013",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt1457767/img.jpg",
        "story": "Watch and stream The Conjuring (2013) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Conjuring%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 31,
        "imdbId": "tt1396484",
        "title": "It",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "7.3",
        "year": "2017",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt1396484/img.jpg",
        "story": "Watch and stream It (2017) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=It%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 32,
        "imdbId": "tt6644200",
        "title": "A Quiet Place",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "1.8 GB",
        "rating": "7.5",
        "year": "2018",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt6644200/img.jpg",
        "story": "Watch and stream A Quiet Place (2018) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=A%20Quiet%20Place%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 33,
        "imdbId": "tt0070047",
        "title": "The Exorcist",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.2 GB",
        "rating": "8.1",
        "year": "1973",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0070047/img.jpg",
        "story": "Watch and stream The Exorcist (1973) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Exorcist%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 34,
        "imdbId": "tt0117571",
        "title": "Scream",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "1.9 GB",
        "rating": "7.4",
        "year": "1996",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0117571/img.jpg",
        "story": "Watch and stream Scream (1996) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Scream%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 35,
        "imdbId": "tt1591095",
        "title": "Insidious",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "1.9 GB",
        "rating": "6.8",
        "year": "2010",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt1591095/img.jpg",
        "story": "Watch and stream Insidious (2010) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Insidious%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 36,
        "imdbId": "tt3322940",
        "title": "Annabelle",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "1.8 GB",
        "rating": "5.4",
        "year": "2014",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt3322940/img.jpg",
        "story": "Watch and stream Annabelle (2014) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Annabelle%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 37,
        "imdbId": "tt5814060",
        "title": "The Nun",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "1.8 GB",
        "rating": "5.3",
        "year": "2018",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt5814060/img.jpg",
        "story": "Watch and stream The Nun (2018) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Nun%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 38,
        "imdbId": "tt0082348",
        "title": "Evil Dead",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "1.7 GB",
        "rating": "7.4",
        "year": "1981",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0082348/img.jpg",
        "story": "Watch and stream Evil Dead (1981) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Evil%20Dead%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 39,
        "imdbId": "tt0111161",
        "title": "The Shawshank Redemption",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.6 GB",
        "rating": "9.3",
        "year": "1994",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0111161/img.jpg",
        "story": "Watch and stream The Shawshank Redemption (1994) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Shawshank%20Redemption%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 40,
        "imdbId": "tt0109830",
        "title": "Forrest Gump",
        "category": "hollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "8.8",
        "year": "1994",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0109830/img.jpg",
        "story": "Watch and stream Forrest Gump (1994) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Forrest%20Gump%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 41,
        "imdbId": "tt0068646",
        "title": "The Godfather",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "3.0 GB",
        "rating": "9.2",
        "year": "1972",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0068646/img.jpg",
        "story": "Watch and stream The Godfather (1972) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Godfather%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 42,
        "imdbId": "tt0099685",
        "title": "Goodfellas",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "8.7",
        "year": "1990",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0099685/img.jpg",
        "story": "Watch and stream Goodfellas (1990) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Goodfellas%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 43,
        "imdbId": "tt0137523",
        "title": "Fight Club",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "8.8",
        "year": "1999",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0137523/img.jpg",
        "story": "Watch and stream Fight Club (1999) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Fight%20Club%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 44,
        "imdbId": "tt0993846",
        "title": "The Wolf of Wall Street",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.2 GB",
        "rating": "8.2",
        "year": "2013",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0993846/img.jpg",
        "story": "Watch and stream The Wolf of Wall Street (2013) in Ultra HD 4K with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Wolf%20of%20Wall%20Street%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 45,
        "imdbId": "tt0120689",
        "title": "The Green Mile",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.8 GB",
        "rating": "8.6",
        "year": "1999",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0120689/img.jpg",
        "story": "Watch and stream The Green Mile (1999) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Green%20Mile%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 46,
        "imdbId": "tt0458339",
        "title": "The Pursuit of Happyness",
        "category": "hollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.1 GB",
        "rating": "8.0",
        "year": "2006",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0458339/img.jpg",
        "story": "Watch and stream The Pursuit of Happyness (2006) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Pursuit%20of%20Happyness%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 47,
        "imdbId": "tt0332280",
        "title": "The Notebook",
        "category": "hollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.2 GB",
        "rating": "7.8",
        "year": "2004",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt0332280/img.jpg",
        "story": "Watch and stream The Notebook (2004) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Notebook%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 48,
        "imdbId": "tt3783958",
        "title": "La La Land",
        "category": "hollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.3 GB",
        "rating": "8.0",
        "year": "2016",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt3783958/img.jpg",
        "story": "Watch and stream La La Land (2016) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=La%20La%20Land%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 49,
        "imdbId": "tt2674426",
        "title": "Me Before You",
        "category": "hollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.0 GB",
        "rating": "7.4",
        "year": "2016",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt2674426/img.jpg",
        "story": "Watch and stream Me Before You (2016) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Me%20Before%20You%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 50,
        "imdbId": "tt6472976",
        "title": "Five Feet Apart",
        "category": "hollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.0 GB",
        "rating": "7.2",
        "year": "2019",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt6472976/img.jpg",
        "story": "Watch and stream Five Feet Apart (2019) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Five%20Feet%20Apart%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 51,
        "imdbId": "tt4126424",
        "title": "After",
        "category": "hollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "1.9 GB",
        "rating": "5.3",
        "year": "2019",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt4126424/img.jpg",
        "story": "Watch and stream After (2019) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=After%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 52,
        "imdbId": "tt2582846",
        "title": "The Fault in Our Stars",
        "category": "hollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.1 GB",
        "rating": "7.7",
        "year": "2014",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt2582846/img.jpg",
        "story": "Watch and stream The Fault in Our Stars (2014) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Fault%20in%20Our%20Stars%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 53,
        "imdbId": "tt4726236",
        "title": "Call Me by Your Name",
        "category": "hollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.3 GB",
        "rating": "7.8",
        "year": "2017",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt4726236/img.jpg",
        "story": "Watch and stream Call Me by Your Name (2017) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Call%20Me%20by%20Your%20Name%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 54,
        "imdbId": "tt3104988",
        "title": "Crazy Rich Asians",
        "category": "hollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.1 GB",
        "rating": "6.9",
        "year": "2018",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt3104988/img.jpg",
        "story": "Watch and stream Crazy Rich Asians (2018) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Crazy%20Rich%20Asians%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 55,
        "imdbId": "tt26047818",
        "title": "Anyone But You",
        "category": "hollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.0 GB",
        "rating": "6.2",
        "year": "2023",
        "audio": "Hindi + English",
        "poster": "https://images.metahub.space/poster/medium/tt26047818/img.jpg",
        "story": "Watch and stream Anyone But You (2023) in Ultra HD 1080p with Hindi + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Anyone%20But%20You%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 56,
        "imdbId": "tt22008740",
        "title": "Culpa Mía (My Fault)",
        "category": "hollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.1 GB",
        "rating": "6.2",
        "year": "2023",
        "audio": "Hindi Dubbed + Spanish",
        "poster": "https://images.metahub.space/poster/medium/tt22008740/img.jpg",
        "story": "Watch and stream Culpa Mía (My Fault) (2023) in Ultra HD 1080p with Hindi Dubbed + Spanish. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Culpa%20M%C3%ADa%20(My%20Fault)%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 57,
        "imdbId": "tt14439896",
        "title": "Through My Window",
        "category": "hollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.0 GB",
        "rating": "5.5",
        "year": "2022",
        "audio": "Hindi Dubbed + Spanish",
        "poster": "https://images.metahub.space/poster/medium/tt14439896/img.jpg",
        "story": "Watch and stream Through My Window (2022) in Ultra HD 1080p with Hindi Dubbed + Spanish. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Through%20My%20Window%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 58,
        "imdbId": "tt32420999",
        "title": "My Fault: London",
        "category": "hollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.1 GB",
        "rating": "6.0",
        "year": "2025",
        "audio": "Hindi Dubbed + English",
        "poster": "https://images.metahub.space/poster/medium/tt32420999/img.jpg",
        "story": "Watch and stream My Fault: London (2025) in Ultra HD 1080p with Hindi Dubbed + English. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=My%20Fault%3A%20London%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 59,
        "imdbId": "tt6751668",
        "title": "Parasite",
        "category": "kdrama",
        "genre": "action",
        "quality": "4K",
        "size": "2.8 GB",
        "rating": "8.5",
        "year": "2019",
        "audio": "Hindi Dubbed + Korean",
        "poster": "https://images.metahub.space/poster/medium/tt6751668/img.jpg",
        "story": "Watch and stream Parasite (2019) in Ultra HD 4K with Hindi Dubbed + Korean. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Parasite%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 60,
        "imdbId": "tt5700672",
        "title": "Train to Busan",
        "category": "kdrama",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "7.6",
        "year": "2016",
        "audio": "Hindi Dubbed + Korean",
        "poster": "https://images.metahub.space/poster/medium/tt5700672/img.jpg",
        "story": "Watch and stream Train to Busan (2016) in Ultra HD 1080p with Hindi Dubbed + Korean. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Train%20to%20Busan%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 61,
        "imdbId": "tt0364569",
        "title": "Oldboy",
        "category": "kdrama",
        "genre": "action",
        "quality": "1080p",
        "size": "2.3 GB",
        "rating": "8.4",
        "year": "2003",
        "audio": "Hindi Dubbed + Korean",
        "poster": "https://images.metahub.space/poster/medium/tt0364569/img.jpg",
        "story": "Watch and stream Oldboy (2003) in Ultra HD 1080p with Hindi Dubbed + Korean. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Oldboy%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 62,
        "imdbId": "tt4016934",
        "title": "The Handmaiden",
        "category": "kdrama",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.6 GB",
        "rating": "8.1",
        "year": "2016",
        "audio": "Korean + English Sub",
        "poster": "https://images.metahub.space/poster/medium/tt4016934/img.jpg",
        "story": "Watch and stream The Handmaiden (2016) in Ultra HD 1080p with Korean + English Sub. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Handmaiden%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 63,
        "imdbId": "tt12477780",
        "title": "Decision to Leave",
        "category": "kdrama",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "7.3",
        "year": "2022",
        "audio": "Korean + Hindi Sub",
        "poster": "https://images.metahub.space/poster/medium/tt12477780/img.jpg",
        "story": "Watch and stream Decision to Leave (2022) in Ultra HD 1080p with Korean + Hindi Sub. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Decision%20to%20Leave%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 64,
        "imdbId": "tt0353969",
        "title": "Memories of Murder",
        "category": "kdrama",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "8.1",
        "year": "2003",
        "audio": "Hindi Dubbed + Korean",
        "poster": "https://images.metahub.space/poster/medium/tt0353969/img.jpg",
        "story": "Watch and stream Memories of Murder (2003) in Ultra HD 1080p with Hindi Dubbed + Korean. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Memories%20of%20Murder%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 65,
        "imdbId": "tt7160070",
        "title": "Along with the Gods",
        "category": "kdrama",
        "genre": "action",
        "quality": "1080p",
        "size": "2.6 GB",
        "rating": "7.3",
        "year": "2017",
        "audio": "Hindi Dubbed + Korean",
        "poster": "https://images.metahub.space/poster/medium/tt7160070/img.jpg",
        "story": "Watch and stream Along with the Gods (2017) in Ultra HD 1080p with Hindi Dubbed + Korean. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Along%20with%20the%20Gods%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 66,
        "imdbId": "tt21966128",
        "title": "20th Century Girl",
        "category": "kdrama",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.1 GB",
        "rating": "7.3",
        "year": "2022",
        "audio": "Hindi Dubbed + Korean",
        "poster": "https://images.metahub.space/poster/medium/tt21966128/img.jpg",
        "story": "Watch and stream 20th Century Girl (2022) in Ultra HD 1080p with Hindi Dubbed + Korean. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=20th%20Century%20Girl%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 67,
        "imdbId": "tt10530176",
        "title": "The Call",
        "category": "kdrama",
        "genre": "action",
        "quality": "1080p",
        "size": "2.1 GB",
        "rating": "7.1",
        "year": "2020",
        "audio": "Hindi Dubbed + Korean",
        "poster": "https://images.metahub.space/poster/medium/tt10530176/img.jpg",
        "story": "Watch and stream The Call (2020) in Ultra HD 1080p with Hindi Dubbed + Korean. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Call%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 68,
        "imdbId": "tt7282468",
        "title": "Burning",
        "category": "kdrama",
        "genre": "action",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "7.5",
        "year": "2018",
        "audio": "Korean + English Sub",
        "poster": "https://images.metahub.space/poster/medium/tt7282468/img.jpg",
        "story": "Watch and stream Burning (2018) in Ultra HD 1080p with Korean + English Sub. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Burning%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 69,
        "imdbId": "tt9541108",
        "title": "Extreme Job",
        "category": "kdrama",
        "genre": "action",
        "quality": "1080p",
        "size": "2.1 GB",
        "rating": "7.1",
        "year": "2019",
        "audio": "Hindi Dubbed + Korean",
        "poster": "https://images.metahub.space/poster/medium/tt9541108/img.jpg",
        "story": "Watch and stream Extreme Job (2019) in Ultra HD 1080p with Hindi Dubbed + Korean. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Extreme%20Job%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 70,
        "imdbId": "tt10954600",
        "title": "Squid Game: Season 2",
        "category": "kdrama",
        "genre": "action",
        "quality": "4K",
        "size": "4.8 GB",
        "rating": "8.8",
        "year": "2025",
        "audio": "Hindi Dubbed + Korean",
        "poster": "https://images.metahub.space/poster/medium/tt10954600/img.jpg",
        "story": "Watch and stream Squid Game: Season 2 (2025) in Ultra HD 4K with Hindi Dubbed + Korean. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Squid%20Game%3A%20Season%202%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ],
        "trending": true
    },
    {
        "id": 71,
        "imdbId": "tt8178634",
        "title": "RRR",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.6 GB",
        "rating": "7.8",
        "year": "2022",
        "audio": "Hindi + Telugu + Tamil",
        "poster": "https://images.metahub.space/poster/medium/tt8178634/img.jpg",
        "story": "Watch and stream RRR (2022) in Ultra HD 4K with Hindi + Telugu + Tamil. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=RRR%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 72,
        "imdbId": "tt2631186",
        "title": "Baahubali: The Beginning",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.2 GB",
        "rating": "8.0",
        "year": "2015",
        "audio": "Hindi + Telugu + Tamil",
        "poster": "https://images.metahub.space/poster/medium/tt2631186/img.jpg",
        "story": "Watch and stream Baahubali: The Beginning (2015) in Ultra HD 4K with Hindi + Telugu + Tamil. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Baahubali%3A%20The%20Beginning%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 73,
        "imdbId": "tt4849438",
        "title": "Baahubali 2: The Conclusion",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.5 GB",
        "rating": "8.2",
        "year": "2017",
        "audio": "Hindi + Telugu + Tamil",
        "poster": "https://images.metahub.space/poster/medium/tt4849438/img.jpg",
        "story": "Watch and stream Baahubali 2: The Conclusion (2017) in Ultra HD 4K with Hindi + Telugu + Tamil. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Baahubali%202%3A%20The%20Conclusion%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 74,
        "imdbId": "tt9389998",
        "title": "Pushpa: The Rise",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.1 GB",
        "rating": "7.6",
        "year": "2021",
        "audio": "Hindi + Telugu + Tamil",
        "poster": "https://images.metahub.space/poster/medium/tt9389998/img.jpg",
        "story": "Watch and stream Pushpa: The Rise (2021) in Ultra HD 4K with Hindi + Telugu + Tamil. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Pushpa%3A%20The%20Rise%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 75,
        "imdbId": "tt11663228",
        "title": "Pushpa 2: The Rule",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.4 GB",
        "rating": "8.5",
        "year": "2024",
        "audio": "Hindi + Telugu + Tamil",
        "poster": "https://images.metahub.space/poster/medium/tt11663228/img.jpg",
        "story": "Watch and stream Pushpa 2: The Rule (2024) in Ultra HD 4K with Hindi + Telugu + Tamil. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Pushpa%202%3A%20The%20Rule%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ],
        "trending": true
    },
    {
        "id": 76,
        "imdbId": "tt7292634",
        "title": "Arjun Reddy",
        "category": "south",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.6 GB",
        "rating": "7.9",
        "year": "2017",
        "audio": "Hindi Dubbed + Telugu",
        "poster": "https://images.metahub.space/poster/medium/tt7292634/img.jpg",
        "story": "Watch and stream Arjun Reddy (2017) in Ultra HD 1080p with Hindi Dubbed + Telugu. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Arjun%20Reddy%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 77,
        "imdbId": "tt9851608",
        "title": "Jersey",
        "category": "south",
        "genre": "action",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "8.5",
        "year": "2019",
        "audio": "Hindi Dubbed + Telugu",
        "poster": "https://images.metahub.space/poster/medium/tt9851608/img.jpg",
        "story": "Watch and stream Jersey (2019) in Ultra HD 1080p with Hindi Dubbed + Telugu. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Jersey%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 78,
        "imdbId": "tt2258337",
        "title": "Eega (Makkhi)",
        "category": "south",
        "genre": "action",
        "quality": "1080p",
        "size": "2.3 GB",
        "rating": "7.7",
        "year": "2012",
        "audio": "Hindi + Telugu",
        "poster": "https://images.metahub.space/poster/medium/tt2258337/img.jpg",
        "story": "Watch and stream Eega (Makkhi) (2012) in Ultra HD 1080p with Hindi + Telugu. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Eega%20(Makkhi)%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 79,
        "imdbId": "tt1447500",
        "title": "Magadheera",
        "category": "south",
        "genre": "action",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "7.7",
        "year": "2009",
        "audio": "Hindi Dubbed + Telugu",
        "poster": "https://images.metahub.space/poster/medium/tt1447500/img.jpg",
        "story": "Watch and stream Magadheera (2009) in Ultra HD 1080p with Hindi Dubbed + Telugu. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Magadheera%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 80,
        "imdbId": "tt20850406",
        "title": "Sita Ramam",
        "category": "south",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "8.5",
        "year": "2022",
        "audio": "Hindi + Telugu + Tamil",
        "poster": "https://images.metahub.space/poster/medium/tt20850406/img.jpg",
        "story": "Watch and stream Sita Ramam (2022) in Ultra HD 1080p with Hindi + Telugu + Tamil. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Sita%20Ramam%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 81,
        "imdbId": "tt13619278",
        "title": "Salaar: Part 1 - Ceasefire",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.3 GB",
        "rating": "6.5",
        "year": "2023",
        "audio": "Hindi + Telugu",
        "poster": "https://images.metahub.space/poster/medium/tt13619278/img.jpg",
        "story": "Watch and stream Salaar: Part 1 - Ceasefire (2023) in Ultra HD 4K with Hindi + Telugu. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Salaar%3A%20Part%201%20-%20Ceasefire%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 82,
        "imdbId": "tt22154402",
        "title": "Devara: Part 1",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.2 GB",
        "rating": "6.3",
        "year": "2024",
        "audio": "Hindi + Telugu",
        "poster": "https://images.metahub.space/poster/medium/tt22154402/img.jpg",
        "story": "Watch and stream Devara: Part 1 (2024) in Ultra HD 4K with Hindi + Telugu. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Devara%3A%20Part%201%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 83,
        "imdbId": "tt11858890",
        "title": "Kalki 2898 AD",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.6 GB",
        "rating": "7.5",
        "year": "2024",
        "audio": "Hindi + Telugu",
        "poster": "https://images.metahub.space/poster/medium/tt11858890/img.jpg",
        "story": "Watch and stream Kalki 2898 AD (2024) in Ultra HD 4K with Hindi + Telugu. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Kalki%202898%20AD%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ],
        "trending": true
    },
    {
        "id": 84,
        "imdbId": "tt21867166",
        "title": "Kushi",
        "category": "south",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.3 GB",
        "rating": "6.4",
        "year": "2023",
        "audio": "Hindi Dubbed + Telugu",
        "poster": "https://images.metahub.space/poster/medium/tt21867166/img.jpg",
        "story": "Watch and stream Kushi (2023) in Ultra HD 1080p with Hindi Dubbed + Telugu. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Kushi%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 85,
        "imdbId": "tt7725596",
        "title": "K.G.F: Chapter 1",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.1 GB",
        "rating": "8.2",
        "year": "2018",
        "audio": "Hindi + Kannada + Tamil",
        "poster": "https://images.metahub.space/poster/medium/tt7725596/img.jpg",
        "story": "Watch and stream K.G.F: Chapter 1 (2018) in Ultra HD 4K with Hindi + Kannada + Tamil. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=K.G.F%3A%20Chapter%201%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 86,
        "imdbId": "tt10698680",
        "title": "K.G.F: Chapter 2",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.5 GB",
        "rating": "8.3",
        "year": "2022",
        "audio": "Hindi + Kannada + Tamil",
        "poster": "https://images.metahub.space/poster/medium/tt10698680/img.jpg",
        "story": "Watch and stream K.G.F: Chapter 2 (2022) in Ultra HD 4K with Hindi + Kannada + Tamil. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=K.G.F%3A%20Chapter%202%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 87,
        "imdbId": "tt15327088",
        "title": "Kantara",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.0 GB",
        "rating": "8.2",
        "year": "2022",
        "audio": "Hindi + Kannada + Tamil",
        "poster": "https://images.metahub.space/poster/medium/tt15327088/img.jpg",
        "story": "Watch and stream Kantara (2022) in Ultra HD 4K with Hindi + Kannada + Tamil. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Kantara%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 88,
        "imdbId": "tt11488102",
        "title": "777 Charlie",
        "category": "south",
        "genre": "action",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "8.8",
        "year": "2022",
        "audio": "Hindi + Kannada",
        "poster": "https://images.metahub.space/poster/medium/tt11488102/img.jpg",
        "story": "Watch and stream 777 Charlie (2022) in Ultra HD 1080p with Hindi + Kannada. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=777%20Charlie%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 89,
        "imdbId": "tt11317208",
        "title": "Vikrant Rona",
        "category": "south",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "7.0",
        "year": "2022",
        "audio": "Hindi + Kannada",
        "poster": "https://images.metahub.space/poster/medium/tt11317208/img.jpg",
        "story": "Watch and stream Vikrant Rona (2022) in Ultra HD 1080p with Hindi + Kannada. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Vikrant%20Rona%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 90,
        "imdbId": "tt29528999",
        "title": "Kantara: Chapter 1",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.4 GB",
        "rating": "8.5",
        "year": "2025",
        "audio": "Hindi + Kannada",
        "poster": "https://images.metahub.space/poster/medium/tt29528999/img.jpg",
        "story": "Watch and stream Kantara: Chapter 1 (2025) in Ultra HD 4K with Hindi + Kannada. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Kantara%3A%20Chapter%201%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 91,
        "imdbId": "tt30278783",
        "title": "Premalu",
        "category": "south",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.3 GB",
        "rating": "7.8",
        "year": "2024",
        "audio": "Hindi Dubbed + Malayalam",
        "poster": "https://images.metahub.space/poster/medium/tt30278783/img.jpg",
        "story": "Watch and stream Premalu (2024) in Ultra HD 1080p with Hindi Dubbed + Malayalam. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Premalu%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 92,
        "imdbId": "tt26421319",
        "title": "Manjummel Boys",
        "category": "south",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "8.5",
        "year": "2024",
        "audio": "Hindi Dubbed + Malayalam",
        "poster": "https://images.metahub.space/poster/medium/tt26421319/img.jpg",
        "story": "Watch and stream Manjummel Boys (2024) in Ultra HD 1080p with Hindi Dubbed + Malayalam. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Manjummel%20Boys%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 93,
        "imdbId": "tt22081510",
        "title": "2018: Everyone is a Hero",
        "category": "south",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "8.3",
        "year": "2023",
        "audio": "Hindi Dubbed + Malayalam",
        "poster": "https://images.metahub.space/poster/medium/tt22081510/img.jpg",
        "story": "Watch and stream 2018: Everyone is a Hero (2023) in Ultra HD 1080p with Hindi Dubbed + Malayalam. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=2018%3A%20Everyone%20is%20a%20Hero%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 94,
        "imdbId": "tt8760280",
        "title": "Lucifer",
        "category": "south",
        "genre": "action",
        "quality": "1080p",
        "size": "2.6 GB",
        "rating": "7.5",
        "year": "2019",
        "audio": "Hindi Dubbed + Malayalam",
        "poster": "https://images.metahub.space/poster/medium/tt8760280/img.jpg",
        "story": "Watch and stream Lucifer (2019) in Ultra HD 1080p with Hindi Dubbed + Malayalam. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Lucifer%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 95,
        "imdbId": "tt3417422",
        "title": "Drishyam (Malayalam)",
        "category": "south",
        "genre": "action",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "8.3",
        "year": "2013",
        "audio": "Malayalam + Hindi Sub",
        "poster": "https://images.metahub.space/poster/medium/tt3417422/img.jpg",
        "story": "Watch and stream Drishyam (Malayalam) (2013) in Ultra HD 1080p with Malayalam + Hindi Sub. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Drishyam%20(Malayalam)%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 96,
        "imdbId": "tt3578768",
        "title": "Bangalore Days",
        "category": "south",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "8.3",
        "year": "2014",
        "audio": "Malayalam + Hindi Sub",
        "poster": "https://images.metahub.space/poster/medium/tt3578768/img.jpg",
        "story": "Watch and stream Bangalore Days (2014) in Ultra HD 1080p with Malayalam + Hindi Sub. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Bangalore%20Days%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 97,
        "imdbId": "tt11394308",
        "title": "Hridayam",
        "category": "south",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "8.1",
        "year": "2022",
        "audio": "Malayalam + Hindi Sub",
        "poster": "https://images.metahub.space/poster/medium/tt11394308/img.jpg",
        "story": "Watch and stream Hridayam (2022) in Ultra HD 1080p with Malayalam + Hindi Sub. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Hridayam%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 98,
        "imdbId": "tt8436694",
        "title": "Kumbalangi Nights",
        "category": "south",
        "genre": "action",
        "quality": "1080p",
        "size": "2.3 GB",
        "rating": "8.5",
        "year": "2019",
        "audio": "Malayalam + English Sub",
        "poster": "https://images.metahub.space/poster/medium/tt8436694/img.jpg",
        "story": "Watch and stream Kumbalangi Nights (2019) in Ultra HD 1080p with Malayalam + English Sub. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Kumbalangi%20Nights%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 99,
        "imdbId": "tt31006494",
        "title": "Aavesham",
        "category": "south",
        "genre": "action",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "7.9",
        "year": "2024",
        "audio": "Hindi Dubbed + Malayalam",
        "poster": "https://images.metahub.space/poster/medium/tt31006494/img.jpg",
        "story": "Watch and stream Aavesham (2024) in Ultra HD 1080p with Hindi Dubbed + Malayalam. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Aavesham%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 100,
        "imdbId": "tt15654328",
        "title": "Leo",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.4 GB",
        "rating": "7.2",
        "year": "2023",
        "audio": "Hindi + Tamil + Telugu",
        "poster": "https://images.metahub.space/poster/medium/tt15654328/img.jpg",
        "story": "Watch and stream Leo (2023) in Ultra HD 4K with Hindi + Tamil + Telugu. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Leo%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 101,
        "imdbId": "tt9179430",
        "title": "Vikram",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.4 GB",
        "rating": "8.3",
        "year": "2022",
        "audio": "Hindi + Tamil + Telugu",
        "poster": "https://images.metahub.space/poster/medium/tt9179430/img.jpg",
        "story": "Watch and stream Vikram (2022) in Ultra HD 4K with Hindi + Tamil + Telugu. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Vikram%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 102,
        "imdbId": "tt9850384",
        "title": "Kaithi",
        "category": "south",
        "genre": "action",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "8.4",
        "year": "2019",
        "audio": "Hindi Dubbed + Tamil",
        "poster": "https://images.metahub.space/poster/medium/tt9850384/img.jpg",
        "story": "Watch and stream Kaithi (2019) in Ultra HD 1080p with Hindi Dubbed + Tamil. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Kaithi%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 103,
        "imdbId": "tt11663224",
        "title": "Jailer",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.2 GB",
        "rating": "7.1",
        "year": "2023",
        "audio": "Hindi + Tamil + Telugu",
        "poster": "https://images.metahub.space/poster/medium/tt11663224/img.jpg",
        "story": "Watch and stream Jailer (2023) in Ultra HD 4K with Hindi + Tamil + Telugu. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Jailer%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 104,
        "imdbId": "tt10579994",
        "title": "Master",
        "category": "south",
        "genre": "action",
        "quality": "1080p",
        "size": "2.8 GB",
        "rating": "7.8",
        "year": "2021",
        "audio": "Hindi + Tamil",
        "poster": "https://images.metahub.space/poster/medium/tt10579994/img.jpg",
        "story": "Watch and stream Master (2021) in Ultra HD 1080p with Hindi + Tamil. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Master%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 105,
        "imdbId": "tt7019842",
        "title": "96",
        "category": "south",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.3 GB",
        "rating": "8.5",
        "year": "2018",
        "audio": "Tamil + Hindi Sub",
        "poster": "https://images.metahub.space/poster/medium/tt7019842/img.jpg",
        "story": "Watch and stream 96 (2018) in Ultra HD 1080p with Tamil + Hindi Sub. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=96%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 106,
        "imdbId": "tt8466564",
        "title": "Vada Chennai",
        "category": "south",
        "genre": "action",
        "quality": "1080p",
        "size": "2.6 GB",
        "rating": "8.4",
        "year": "2018",
        "audio": "Hindi Dubbed + Tamil",
        "poster": "https://images.metahub.space/poster/medium/tt8466564/img.jpg",
        "story": "Watch and stream Vada Chennai (2018) in Ultra HD 1080p with Hindi Dubbed + Tamil. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Vada%20Chennai%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 107,
        "imdbId": "tt9654108",
        "title": "Asuran",
        "category": "south",
        "genre": "action",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "8.4",
        "year": "2019",
        "audio": "Hindi Dubbed + Tamil",
        "poster": "https://images.metahub.space/poster/medium/tt9654108/img.jpg",
        "story": "Watch and stream Asuran (2019) in Ultra HD 1080p with Hindi Dubbed + Tamil. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Asuran%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 108,
        "imdbId": "tt24151752",
        "title": "Jigarthanda DoubleX",
        "category": "south",
        "genre": "action",
        "quality": "1080p",
        "size": "2.6 GB",
        "rating": "8.1",
        "year": "2023",
        "audio": "Hindi Dubbed + Tamil",
        "poster": "https://images.metahub.space/poster/medium/tt24151752/img.jpg",
        "story": "Watch and stream Jigarthanda DoubleX (2023) in Ultra HD 1080p with Hindi Dubbed + Tamil. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Jigarthanda%20DoubleX%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 109,
        "imdbId": "tt10701074",
        "title": "Ponniyin Selvan: Part I",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.2 GB",
        "rating": "7.6",
        "year": "2022",
        "audio": "Hindi + Tamil",
        "poster": "https://images.metahub.space/poster/medium/tt10701074/img.jpg",
        "story": "Watch and stream Ponniyin Selvan: Part I (2022) in Ultra HD 4K with Hindi + Tamil. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Ponniyin%20Selvan%3A%20Part%20I%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 110,
        "imdbId": "tt22081514",
        "title": "Ponniyin Selvan: Part II",
        "category": "south",
        "genre": "action",
        "quality": "4K",
        "size": "3.2 GB",
        "rating": "7.3",
        "year": "2023",
        "audio": "Hindi + Tamil",
        "poster": "https://images.metahub.space/poster/medium/tt22081514/img.jpg",
        "story": "Watch and stream Ponniyin Selvan: Part II (2023) in Ultra HD 4K with Hindi + Tamil. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Ponniyin%20Selvan%3A%20Part%20II%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 111,
        "imdbId": "tt26443597",
        "title": "Maharaja",
        "category": "south",
        "genre": "action",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "8.5",
        "year": "2024",
        "audio": "Hindi Dubbed + Tamil",
        "poster": "https://images.metahub.space/poster/medium/tt26443597/img.jpg",
        "story": "Watch and stream Maharaja (2024) in Ultra HD 1080p with Hindi Dubbed + Tamil. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Maharaja%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 112,
        "imdbId": "tt15354916",
        "title": "Jawan",
        "category": "bollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.4 GB",
        "rating": "7.0",
        "year": "2023",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt15354916/img.jpg",
        "story": "Watch and stream Jawan (2023) in Ultra HD 4K with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Jawan%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 113,
        "imdbId": "tt12844910",
        "title": "Pathaan",
        "category": "bollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.2 GB",
        "rating": "5.9",
        "year": "2023",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt12844910/img.jpg",
        "story": "Watch and stream Pathaan (2023) in Ultra HD 4K with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Pathaan%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 114,
        "imdbId": "tt15428134",
        "title": "Dunki",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.6 GB",
        "rating": "6.7",
        "year": "2023",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt15428134/img.jpg",
        "story": "Watch and stream Dunki (2023) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Dunki%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 115,
        "imdbId": "tt13751694",
        "title": "Animal",
        "category": "bollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.6 GB",
        "rating": "6.6",
        "year": "2023",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt13751694/img.jpg",
        "story": "Watch and stream Animal (2023) in Ultra HD 4K with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Animal%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 116,
        "imdbId": "tt8983202",
        "title": "Kabir Singh",
        "category": "bollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.6 GB",
        "rating": "7.1",
        "year": "2019",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt8983202/img.jpg",
        "story": "Watch and stream Kabir Singh (2019) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Kabir%20Singh%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 117,
        "imdbId": "tt2178784",
        "title": "Yeh Jawaani Hai Deewani",
        "category": "bollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "7.2",
        "year": "2013",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt2178784/img.jpg",
        "story": "Watch and stream Yeh Jawaani Hai Deewani (2013) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Yeh%20Jawaani%20Hai%20Deewani%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 118,
        "imdbId": "tt1187043",
        "title": "3 Idiots",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.8 GB",
        "rating": "8.4",
        "year": "2009",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt1187043/img.jpg",
        "story": "Watch and stream 3 Idiots (2009) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=3%20Idiots%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 119,
        "imdbId": "tt5074352",
        "title": "Dangal",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.8 GB",
        "rating": "8.3",
        "year": "2016",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt5074352/img.jpg",
        "story": "Watch and stream Dangal (2016) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Dangal%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 120,
        "imdbId": "tt2338151",
        "title": "PK",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.7 GB",
        "rating": "8.1",
        "year": "2014",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt2338151/img.jpg",
        "story": "Watch and stream PK (2014) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=PK%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 121,
        "imdbId": "tt3863552",
        "title": "Bajrangi Bhaijaan",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.7 GB",
        "rating": "8.1",
        "year": "2015",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt3863552/img.jpg",
        "story": "Watch and stream Bajrangi Bhaijaan (2015) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Bajrangi%20Bhaijaan%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 122,
        "imdbId": "tt7459422",
        "title": "War",
        "category": "bollywood",
        "genre": "action",
        "quality": "4K",
        "size": "3.0 GB",
        "rating": "6.5",
        "year": "2019",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt7459422/img.jpg",
        "story": "Watch and stream War (2019) in Ultra HD 4K with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=War%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 123,
        "imdbId": "tt5956100",
        "title": "Tiger Zinda Hai",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.8 GB",
        "rating": "5.9",
        "year": "2017",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt5956100/img.jpg",
        "story": "Watch and stream Tiger Zinda Hai (2017) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Tiger%20Zinda%20Hai%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 124,
        "imdbId": "tt8096176",
        "title": "Stree",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.2 GB",
        "rating": "7.5",
        "year": "2018",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt8096176/img.jpg",
        "story": "Watch and stream Stree (2018) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Stree%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 125,
        "imdbId": "tt27995595",
        "title": "Stree 2: Sarkate Ka Aatank",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.2 GB",
        "rating": "7.7",
        "year": "2024",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt27995595/img.jpg",
        "story": "Watch and stream Stree 2: Sarkate Ka Aatank (2024) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Stree%202%3A%20Sarkate%20Ka%20Aatank%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ],
        "trending": true
    },
    {
        "id": 126,
        "imdbId": "tt0985633",
        "title": "Bhool Bhulaiyaa",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "7.4",
        "year": "2007",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt0985633/img.jpg",
        "story": "Watch and stream Bhool Bhulaiyaa (2007) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Bhool%20Bhulaiyaa%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 127,
        "imdbId": "tt10839088",
        "title": "Bhool Bhulaiyaa 2",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "5.7",
        "year": "2022",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt10839088/img.jpg",
        "story": "Watch and stream Bhool Bhulaiyaa 2 (2022) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Bhool%20Bhulaiyaa%202%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 128,
        "imdbId": "tt8239946",
        "title": "Tumbbad",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.1 GB",
        "rating": "8.2",
        "year": "2018",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt8239946/img.jpg",
        "story": "Watch and stream Tumbbad (2018) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Tumbbad%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 129,
        "imdbId": "tt8108198",
        "title": "Andhadhun",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "8.2",
        "year": "2018",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt8108198/img.jpg",
        "story": "Watch and stream Andhadhun (2018) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Andhadhun%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 130,
        "imdbId": "tt15501640",
        "title": "Drishyam 2 (Hindi)",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "8.2",
        "year": "2022",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt15501640/img.jpg",
        "story": "Watch and stream Drishyam 2 (Hindi) (2022) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Drishyam%202%20(Hindi)%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 131,
        "imdbId": "tt7929424",
        "title": "Gully Boy",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "7.9",
        "year": "2019",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt7929424/img.jpg",
        "story": "Watch and stream Gully Boy (2019) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Gully%20Boy%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 132,
        "imdbId": "tt1562872",
        "title": "Zindagi Na Milegi Dobara",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.6 GB",
        "rating": "8.2",
        "year": "2011",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt1562872/img.jpg",
        "story": "Watch and stream Zindagi Na Milegi Dobara (2011) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Zindagi%20Na%20Milegi%20Dobara%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 133,
        "imdbId": "tt2082197",
        "title": "Barfi!",
        "category": "bollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "8.1",
        "year": "2012",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt2082197/img.jpg",
        "story": "Watch and stream Barfi! (2012) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Barfi!%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 134,
        "imdbId": "tt3322420",
        "title": "Queen",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "8.1",
        "year": "2013",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt3322420/img.jpg",
        "story": "Watch and stream Queen (2013) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Queen%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 135,
        "imdbId": "tt1839596",
        "title": "Rockstar",
        "category": "bollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.6 GB",
        "rating": "7.7",
        "year": "2011",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt1839596/img.jpg",
        "story": "Watch and stream Rockstar (2011) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Rockstar%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 136,
        "imdbId": "tt3847842",
        "title": "Tamasha",
        "category": "bollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "7.3",
        "year": "2015",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt3847842/img.jpg",
        "story": "Watch and stream Tamasha (2015) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Tamasha%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 137,
        "imdbId": "tt7098658",
        "title": "Raazi",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.3 GB",
        "rating": "7.7",
        "year": "2018",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt7098658/img.jpg",
        "story": "Watch and stream Raazi (2018) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Raazi%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 138,
        "imdbId": "tt10292608",
        "title": "Shershaah",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "8.3",
        "year": "2021",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt10292608/img.jpg",
        "story": "Watch and stream Shershaah (2021) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Shershaah%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 139,
        "imdbId": "tt9075772",
        "title": "Chhichhore",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "8.3",
        "year": "2019",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt9075772/img.jpg",
        "story": "Watch and stream Chhichhore (2019) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Chhichhore%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 140,
        "imdbId": "tt1821480",
        "title": "Kahaani",
        "category": "bollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.2 GB",
        "rating": "8.1",
        "year": "2012",
        "audio": "Hindi (Original)",
        "poster": "https://images.metahub.space/poster/medium/tt1821480/img.jpg",
        "story": "Watch and stream Kahaani (2012) in Ultra HD 1080p with Hindi (Original). Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Kahaani%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 141,
        "imdbId": "tt5311514",
        "title": "Your Name. (Kimi no Na wa.)",
        "category": "anime",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.1 GB",
        "rating": "8.4",
        "year": "2016",
        "audio": "Hindi Dubbed + Japanese",
        "poster": "https://images.metahub.space/poster/medium/tt5311514/img.jpg",
        "story": "Watch and stream Your Name. (Kimi no Na wa.) (2016) in Ultra HD 1080p with Hindi Dubbed + Japanese. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Your%20Name.%20(Kimi%20no%20Na%20wa.)%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 142,
        "imdbId": "tt5323662",
        "title": "A Silent Voice",
        "category": "anime",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.2 GB",
        "rating": "8.1",
        "year": "2016",
        "audio": "Hindi Dubbed + Japanese",
        "poster": "https://images.metahub.space/poster/medium/tt5323662/img.jpg",
        "story": "Watch and stream A Silent Voice (2016) in Ultra HD 1080p with Hindi Dubbed + Japanese. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=A%20Silent%20Voice%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 143,
        "imdbId": "tt9426210",
        "title": "Weathering with You",
        "category": "anime",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.0 GB",
        "rating": "7.5",
        "year": "2019",
        "audio": "Hindi Dubbed + Japanese",
        "poster": "https://images.metahub.space/poster/medium/tt9426210/img.jpg",
        "story": "Watch and stream Weathering with You (2019) in Ultra HD 1080p with Hindi Dubbed + Japanese. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Weathering%20with%20You%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 144,
        "imdbId": "tt16428256",
        "title": "Suzume",
        "category": "anime",
        "genre": "action",
        "quality": "1080p",
        "size": "2.3 GB",
        "rating": "7.6",
        "year": "2022",
        "audio": "Hindi Dubbed + Japanese",
        "poster": "https://images.metahub.space/poster/medium/tt16428256/img.jpg",
        "story": "Watch and stream Suzume (2022) in Ultra HD 1080p with Hindi Dubbed + Japanese. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Suzume%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 145,
        "imdbId": "tt11032374",
        "title": "Demon Slayer: Mugen Train",
        "category": "anime",
        "genre": "action",
        "quality": "4K",
        "size": "2.6 GB",
        "rating": "8.2",
        "year": "2020",
        "audio": "Hindi Dubbed + Japanese",
        "poster": "https://images.metahub.space/poster/medium/tt11032374/img.jpg",
        "story": "Watch and stream Demon Slayer: Mugen Train (2020) in Ultra HD 4K with Hindi Dubbed + Japanese. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Demon%20Slayer%3A%20Mugen%20Train%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 4K Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 4K",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 146,
        "imdbId": "tt0245429",
        "title": "Spirited Away",
        "category": "anime",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "8.6",
        "year": "2001",
        "audio": "Hindi Dubbed + Japanese",
        "poster": "https://images.metahub.space/poster/medium/tt0245429/img.jpg",
        "story": "Watch and stream Spirited Away (2001) in Ultra HD 1080p with Hindi Dubbed + Japanese. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Spirited%20Away%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 147,
        "imdbId": "tt0347149",
        "title": "Howl's Moving Castle",
        "category": "anime",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.3 GB",
        "rating": "8.2",
        "year": "2004",
        "audio": "Hindi Dubbed + Japanese",
        "poster": "https://images.metahub.space/poster/medium/tt0347149/img.jpg",
        "story": "Watch and stream Howl's Moving Castle (2004) in Ultra HD 1080p with Hindi Dubbed + Japanese. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Howl's%20Moving%20Castle%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 148,
        "imdbId": "tt16183464",
        "title": "One Piece Film: Red",
        "category": "anime",
        "genre": "action",
        "quality": "1080p",
        "size": "2.2 GB",
        "rating": "6.7",
        "year": "2022",
        "audio": "Hindi Dubbed + Japanese",
        "poster": "https://images.metahub.space/poster/medium/tt16183464/img.jpg",
        "story": "Watch and stream One Piece Film: Red (2022) in Ultra HD 1080p with Hindi Dubbed + Japanese. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=One%20Piece%20Film%3A%20Red%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 149,
        "imdbId": "tt14331144",
        "title": "Jujutsu Kaisen 0",
        "category": "anime",
        "genre": "action",
        "quality": "1080p",
        "size": "2.3 GB",
        "rating": "7.8",
        "year": "2021",
        "audio": "Hindi Dubbed + Japanese",
        "poster": "https://images.metahub.space/poster/medium/tt14331144/img.jpg",
        "story": "Watch and stream Jujutsu Kaisen 0 (2021) in Ultra HD 1080p with Hindi Dubbed + Japanese. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Jujutsu%20Kaisen%200%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 150,
        "imdbId": "tt7961060",
        "title": "Dragon Ball Super: Broly",
        "category": "anime",
        "genre": "action",
        "quality": "1080p",
        "size": "2.1 GB",
        "rating": "7.7",
        "year": "2018",
        "audio": "Hindi Dubbed + Japanese",
        "poster": "https://images.metahub.space/poster/medium/tt7961060/img.jpg",
        "story": "Watch and stream Dragon Ball Super: Broly (2018) in Ultra HD 1080p with Hindi Dubbed + Japanese. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Dragon%20Ball%20Super%3A%20Broly%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 151,
        "imdbId": "tt5008578",
        "title": "Your Lie in April",
        "category": "anime",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.2 GB",
        "rating": "6.7",
        "year": "2016",
        "audio": "Japanese + English Sub",
        "poster": "https://images.metahub.space/poster/medium/tt5008578/img.jpg",
        "story": "Watch and stream Your Lie in April (2016) in Ultra HD 1080p with Japanese + English Sub. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Your%20Lie%20in%20April%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 152,
        "imdbId": "tt15242330",
        "title": "The First Slam Dunk",
        "category": "anime",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "8.2",
        "year": "2022",
        "audio": "Hindi Dubbed + Japanese",
        "poster": "https://images.metahub.space/poster/medium/tt15242330/img.jpg",
        "story": "Watch and stream The First Slam Dunk (2022) in Ultra HD 1080p with Hindi Dubbed + Japanese. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20First%20Slam%20Dunk%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 153,
        "imdbId": "tt13653134",
        "title": "Solo Leveling (Season 1)",
        "category": "anime",
        "genre": "action",
        "quality": "1080p",
        "size": "3.2 GB",
        "rating": "8.7",
        "year": "2024",
        "audio": "Hindi Dubbed + Japanese",
        "poster": "https://images.metahub.space/poster/medium/tt13653134/img.jpg",
        "story": "Watch and stream Solo Leveling (Season 1) (2024) in Ultra HD 1080p with Hindi Dubbed + Japanese. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Solo%20Leveling%20(Season%201)%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 154,
        "imdbId": "tt9586294",
        "title": "Better Days",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "7.5",
        "year": "2019",
        "audio": "Mandarin + English Sub",
        "poster": "https://images.metahub.space/poster/medium/tt9586294/img.jpg",
        "story": "Watch and stream Better Days (2019) in Ultra HD 1080p with Mandarin + English Sub. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Better%20Days%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 155,
        "imdbId": "tt7605617",
        "title": "The Wandering Earth",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.5 GB",
        "rating": "5.9",
        "year": "2019",
        "audio": "Hindi Dubbed + Mandarin",
        "poster": "https://images.metahub.space/poster/medium/tt7605617/img.jpg",
        "story": "Watch and stream The Wandering Earth (2019) in Ultra HD 1080p with Hindi Dubbed + Mandarin. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Wandering%20Earth%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 156,
        "imdbId": "tt13320662",
        "title": "Hi, Mom",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.3 GB",
        "rating": "7.0",
        "year": "2021",
        "audio": "Mandarin + English Sub",
        "poster": "https://images.metahub.space/poster/medium/tt13320662/img.jpg",
        "story": "Watch and stream Hi, Mom (2021) in Ultra HD 1080p with Mandarin + English Sub. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Hi%2C%20Mom%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 157,
        "imdbId": "tt8316274",
        "title": "Us and Them",
        "category": "hollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.2 GB",
        "rating": "7.4",
        "year": "2018",
        "audio": "Mandarin + English Sub",
        "poster": "https://images.metahub.space/poster/medium/tt8316274/img.jpg",
        "story": "Watch and stream Us and Them (2018) in Ultra HD 1080p with Mandarin + English Sub. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Us%20and%20Them%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 158,
        "imdbId": "tt5189770",
        "title": "Detective Chinatown",
        "category": "hollywood",
        "genre": "action",
        "quality": "1080p",
        "size": "2.4 GB",
        "rating": "6.6",
        "year": "2015",
        "audio": "Hindi Dubbed + Mandarin",
        "poster": "https://images.metahub.space/poster/medium/tt5189770/img.jpg",
        "story": "Watch and stream Detective Chinatown (2015) in Ultra HD 1080p with Hindi Dubbed + Mandarin. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Detective%20Chinatown%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 159,
        "imdbId": "tt4701660",
        "title": "The Mermaid",
        "category": "hollywood",
        "genre": "romance",
        "quality": "1080p",
        "size": "2.0 GB",
        "rating": "6.2",
        "year": "2016",
        "audio": "Hindi Dubbed + Mandarin",
        "poster": "https://images.metahub.space/poster/medium/tt4701660/img.jpg",
        "story": "Watch and stream The Mermaid (2016) in Ultra HD 1080p with Hindi Dubbed + Mandarin. Direct high-speed cloud mirrors and multi-server auto-embeds ready on ZorvixHub.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=The%20Mermaid%20official%20trailer",
        "servers": [
            {
                "name": "⚡ 1080p Fast Cloud Mirror 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Mega Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct PixelDrain 1080p",
                "url": "https://pixeldrain.com"
            }
        ]
    }
];

// =========================================================================
// MONETIZATION TRIGGERS & POPUNDERS
// =========================================================================
function triggerAd(placement) {
    window.open(MASTER_AD_LINK, "_blank");
}

// Global Screen-Tap Popunder Trigger
window.addEventListener("click", function(e) {
    if (e.target.closest("#playerModal") || e.target.closest("#pinModal") || e.target.closest(".close-sticky-ad")) {
        return;
    }
    popunderTriggerCount++;
    if (popunderTriggerCount === 1 || popunderTriggerCount % 3 === 0) {
        window.open(MASTER_AD_LINK, "_blank");
    }
}, true);

function closeStickyAd(event) {
    event.stopPropagation();
    const ad = document.getElementById("stickyAd");
    if (ad) ad.style.display = "none";
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
                ${m.trending ? '<span class="badge-trending">🔥 TRENDING</span>' : ''}
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

    if (currentCategory === "trending") {
        result = result.filter(m => m.trending === true);
    } else if (currentCategory !== "all") {
        result = result.filter(m => m.category === currentCategory || m.genre === currentCategory);
    }

    if (currentQuality !== "all") {
        result = result.filter(m => m.quality === currentQuality);
    }

    currentSearch = document.getElementById("searchInput").value.trim().toLowerCase();
    if (currentSearch) {
        result = result.filter(m => 
            m.title.toLowerCase().includes(currentSearch) ||
            m.audio.toLowerCase().includes(currentSearch) ||
            m.category.toLowerCase().includes(currentSearch) ||
            m.year.includes(currentSearch)
        );
    }

    currentSort = document.getElementById("sortSelect").value;
    if (currentSort === "featured") {
        result.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || parseFloat(b.rating) - parseFloat(a.rating));
    } else if (currentSort === "rating") {
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
    activeMovie.servers.forEach((srv) => {
        const btn = document.createElement("button");
        btn.className = "server-download-btn";
        btn.innerText = srv.name;
        btn.onclick = () => {
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

// Multi-Server Auto Embed Resolvers
function switchStreamServer(serverNum) {
    currentStreamServer = serverNum;
    document.getElementById("server1Btn").classList.toggle("s-btn-active", serverNum === 1);
    document.getElementById("server2Btn").classList.toggle("s-btn-active", serverNum === 2);
    document.getElementById("server3Btn").classList.toggle("s-btn-active", serverNum === 3);

    let streamUrl = "";
    if (serverNum === 1) {
        streamUrl = `https://vidsrc.me/embed/movie?imdb=${activeMovie.imdbId}`;
    } else if (serverNum === 2) {
        streamUrl = `https://multiembed.mov/?video_id=${activeMovie.imdbId}`;
    } else {
        streamUrl = `https://vidsrc.to/embed/movie/${activeMovie.imdbId}`;
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
    localStorage.setItem("cinehub_favs", JSON.stringify(favorites));
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

function downloadSubtitles() {
    triggerAd("subtitles");
    window.open(`https://subdl.com/search/${encodeURIComponent(activeMovie.title)}`, "_blank");
}

function showToast(msg) {
    const t = document.getElementById("neonToast");
    t.innerText = msg;
    t.style.display = "block";
    setTimeout(() => { t.style.display = "none"; }, 2500);
}

// =========================================================================
// ADMIN PIN SECURITY SYSTEM (PIN: 7077)
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
                    story: "Newly added blockbuster title via ZorvixHub Admin Terminal.",
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

// Deep Linking via URL Query Parameters
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
