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
let currentSort = "featured";
let favorites = JSON.parse(localStorage.getItem("cinehub_favs") || "[]");
let activeMovie = null;
let currentStreamServer = 1;
let popunderTriggerCount = 0;

// MASTER MOVIE CATALOG (Auto-Embed Ready with IMDb IDs)
let movies = [
    {
        "id": 1790275908166,
        "imdbId": "tt11198330",
        "title": "House of the Dragon",
        "originalTitle": "House of the Dragon",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K UHD",
        "size": "3 Seasons",
        "rating": "8.3",
        "year": "2022",
        "audio": "Multi-Audio",
        "trending": true,
        "type": "series",
        "poster": "https://images.metahub.space/poster/small/tt11198330/img",
        "backdrop": "https://images.metahub.space/background/medium/tt11198330/img",
        "story": "An internal succession war within House Targaryen at the height of its power, 172 years before the birth of Daenerys Targaryen.",
        "trailer": "https://www.youtube.com/embed/DotnJ7tTA34",
        "cast": [
            "Matt Smith",
            "Emma D&apos;Arcy",
            "Olivia Cooke"
        ],
        "directors": [
            []
        ],
        "seasons": [
            {
                "seasonNumber": 1,
                "episodeCount": 51,
                "episodes": [
                    {
                        "episodeNumber": 1,
                        "title": "Episode 1",
                        "airDate": "2022-08-14",
                        "overview": "Sue Perkins is joined by super fans Rickie Haywood-Williams and Jenny Ryan and actor Daniel Portman ahead of House of the Dragon’s release.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/1/w780.jpg"
                    },
                    {
                        "episodeNumber": 2,
                        "title": "Episode 2",
                        "airDate": "2022-08-21",
                        "overview": "Join Jamie East on the red carpet at the House of the Dragon Premiere, and enjoy exclusive interviews with the cast and crew.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/2/w780.jpg"
                    },
                    {
                        "episodeNumber": 3,
                        "title": "Episode 3",
                        "airDate": "2022-08-22",
                        "overview": "Take a deeper look at the episode \"The Heirs of the Dragon\"",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/3/w780.jpg"
                    },
                    {
                        "episodeNumber": 4,
                        "title": "Episode 4",
                        "airDate": "2022-08-29",
                        "overview": "Take a deeper look at the episode \"The Rogue Prince\"",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/4/w780.jpg"
                    },
                    {
                        "episodeNumber": 5,
                        "title": "Episode 5",
                        "airDate": "2022-09-05",
                        "overview": "Take a deeper look at the episode \"Second of His Name\"",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/5/w780.jpg"
                    },
                    {
                        "episodeNumber": 6,
                        "title": "Episode 6",
                        "airDate": "2022-09-12",
                        "overview": "Take a deeper look at the episode \"King of the Narrow Sea\"",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/6/w780.jpg"
                    },
                    {
                        "episodeNumber": 7,
                        "title": "Episode 7",
                        "airDate": "2022-09-19",
                        "overview": "Take a deeper look at the episode \"We Light the Way\"",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/7/w780.jpg"
                    },
                    {
                        "episodeNumber": 8,
                        "title": "Episode 8",
                        "airDate": "2022-09-26",
                        "overview": "Take a deeper look at the episode \"The Princess and the Queen\"",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/8/w780.jpg"
                    },
                    {
                        "episodeNumber": 9,
                        "title": "Episode 9",
                        "airDate": "2022-10-03",
                        "overview": "Take a deeper look inside the episode \"Driftmark\"",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/9/w780.jpg"
                    },
                    {
                        "episodeNumber": 10,
                        "title": "Episode 10",
                        "airDate": "2022-10-10",
                        "overview": "Take a deeper look inside the episode \"The Lord of the Tides\"",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/10/w780.jpg"
                    },
                    {
                        "episodeNumber": 11,
                        "title": "Episode 11",
                        "airDate": "2022-10-17",
                        "overview": "Take a deeper look at the episode \"The Green Council\"",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/11/w780.jpg"
                    },
                    {
                        "episodeNumber": 12,
                        "title": "Episode 12",
                        "airDate": "2022-10-24",
                        "overview": "Take a deeper look inside the episode \"The Black Queen\"",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/12/w780.jpg"
                    },
                    {
                        "episodeNumber": 13,
                        "title": "Episode 13",
                        "airDate": "2022-10-25",
                        "overview": "As season one of House of the Dragon comes to a close, sit down with Sue Perkins, Rickie Haywood-Williams, Joel Dommett and Lauren Layfield and unpack the gory season finale.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/13/w780.jpg"
                    },
                    {
                        "episodeNumber": 24,
                        "title": "Episode 24",
                        "airDate": "2022-12-21",
                        "overview": "Full Episode 24 of Season 1",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/24/w780.jpg"
                    },
                    {
                        "episodeNumber": 25,
                        "title": "Episode 25",
                        "airDate": "2022-12-21",
                        "overview": "Full Episode 25 of Season 1",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/25/w780.jpg"
                    },
                    {
                        "episodeNumber": 26,
                        "title": "Episode 26",
                        "airDate": "2022-12-21",
                        "overview": "Featurette from House of the Dragon season 1.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/26/w780.jpg"
                    },
                    {
                        "episodeNumber": 27,
                        "title": "Episode 27",
                        "airDate": "2022-12-21",
                        "overview": "George R. R. Martin, Ryan Condal and Miguel Sapochnik offer a look at what's to come in Game of Thrones prequel House of the Dragon.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/27/w780.jpg"
                    },
                    {
                        "episodeNumber": 28,
                        "title": "Episode 28",
                        "airDate": "2022-12-21",
                        "overview": "The cast and crew share the thrills and challenges of entering the world Game of Thrones, and approaching it when the Targaryens at the height of their power.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/28/w780.jpg"
                    },
                    {
                        "episodeNumber": 29,
                        "title": "Episode 29",
                        "airDate": "2022-12-21",
                        "overview": "Creator and executive producer George R. R. Martin sets up the Game of Thrones prequel, sharing key details on major Houses and relationships featured in the series, alongside illustrations from Fire & Blood artist Doug Wheatley.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/29/w780.jpg"
                    },
                    {
                        "episodeNumber": 30,
                        "title": "Episode 30",
                        "airDate": "2022-12-21",
                        "overview": "Paddy Considine, Matt Smith, and more cast and crew discuss how House of the Dragon takes place during the height of the Targaryen reign over Westeros, and how that influenced the story and design of the series.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/30/w780.jpg"
                    },
                    {
                        "episodeNumber": 31,
                        "title": "Episode 31",
                        "airDate": "2022-12-21",
                        "overview": "Rhys Ifans, Steve Toussaint, and more cast and crew break down the historical significance and role of the two prominent houses in the series: the Velaryons and the Hightowers.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/31/w780.jpg"
                    },
                    {
                        "episodeNumber": 32,
                        "title": "Episode 32",
                        "airDate": "2022-12-21",
                        "overview": "The cast and crew describe the various changes made to recognizable sets like the Red Keep and the Throne to reflect the decadence of the time period and how they evolved over time.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/32/w780.jpg"
                    },
                    {
                        "episodeNumber": 33,
                        "title": "Episode 33",
                        "airDate": "2024-05-10",
                        "overview": "Relive all of Season 1. Season 2 of the HBO Original Series #HouseoftheDragon premieres June 16 on Max.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/33/w780.jpg"
                    },
                    {
                        "episodeNumber": 34,
                        "title": "Episode 34",
                        "airDate": "2024-06-09",
                        "overview": "House of the Dragon is returning. Sue Perkins revisits the world of Westeros with a council of superfans, including Al Murray and Ellie Taylor, before season two arrives.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/34/w780.jpg"
                    },
                    {
                        "episodeNumber": 35,
                        "title": "Episode 35",
                        "airDate": "2024-06-17",
                        "overview": "Ryan Condal, Executive Producer, tells us what to expect in the season 2 premiere.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/35/w780.jpg"
                    },
                    {
                        "episodeNumber": 36,
                        "title": "Episode 36",
                        "airDate": "2024-06-24",
                        "overview": "Take a deeper look inside the episode \"Rhaenyra the Cruel\"",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/36/w780.jpg"
                    },
                    {
                        "episodeNumber": 37,
                        "title": "Episode 37",
                        "airDate": "2024-07-01",
                        "overview": "Take a deeper look inside the episode \"The Burning Mill\"",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/37/w780.jpg"
                    },
                    {
                        "episodeNumber": 38,
                        "title": "Episode 38",
                        "airDate": "2024-07-08",
                        "overview": "Take a deeper look inside the episode \"The Red Dragon and the Gold\"",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/38/w780.jpg"
                    },
                    {
                        "episodeNumber": 39,
                        "title": "Episode 39",
                        "airDate": "2024-07-15",
                        "overview": "Take a deeper look inside the episode \"Regent\"",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/39/w780.jpg"
                    },
                    {
                        "episodeNumber": 40,
                        "title": "Episode 40",
                        "airDate": "2024-07-22",
                        "overview": "Take a deeper look inside the episode \"Smallfolk\"",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/40/w780.jpg"
                    },
                    {
                        "episodeNumber": 41,
                        "title": "Episode 41",
                        "airDate": "2024-07-29",
                        "overview": "Take a deeper look inside the episode \"The Red Sowing\"",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/41/w780.jpg"
                    },
                    {
                        "episodeNumber": 42,
                        "title": "Episode 42",
                        "airDate": "2024-08-05",
                        "overview": "Take a deeper look inside the episode \"The Queen Who Ever Was\"",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/42/w780.jpg"
                    },
                    {
                        "episodeNumber": 43,
                        "title": "Episode 43",
                        "airDate": "2026-06-23",
                        "overview": "Recap of Season 1 and 2",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/43/w780.jpg"
                    },
                    {
                        "episodeNumber": 44,
                        "title": "Episode 44",
                        "airDate": "2026-06-23",
                        "overview": "Co-creator and showrunner Ryan Condal, along with episode director Loni Peristere, and the cast discuss how the first episode of Season 3 unravels in surprising and catastrophic ways. Aegon (Tom Glynn-Carney) is fleeing in the shadows, Alicent (Olivia Cooke) must face the consequences of her bargain with Rhaenyra (Emma D’Arcy), and in the Battle of the Gullet, Rhaenyra suffers another unfathomable loss, as war rages across sea and sky.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/44/w780.jpg"
                    },
                    {
                        "episodeNumber": 45,
                        "title": "Episode 45",
                        "airDate": "2026-06-30",
                        "overview": "Co-creator and showrunner Ryan Condal, Emma D’Arcy (Rhaenyra Targaryen), Matt Smith (Daemon Targaryen), and more go in-depth into Episode 2 of Season 3 of #HOTD. They discuss the devastating impact of the Battle of the Gullet, Aemond’s and Daemon’s similar nature, and Rhaenyra’s grief-stricken shift as she edges closer to the Iron Throne.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/45/w780.jpg"
                    },
                    {
                        "episodeNumber": 46,
                        "title": "Episode 46",
                        "airDate": "2026-07-07",
                        "overview": "Rhaenyra’s reign begins. Co-creator and showrunner Ryan Condal, Emma D’Arcy (Queen Rhaenyra Targaryen), Steve Toussaint (Lord Corlys Velaryon), James Norton (Lord Ormund Hightower), and more break down season 3, episode 3 of House of the Dragon. They discuss Rhaenyra’s trying first few days as queen, her shifting power dynamics with Alicent, and her revelation of Ormund’s shocking deceit.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/46/w780.jpg"
                    },
                    {
                        "episodeNumber": 47,
                        "title": "Episode 47",
                        "airDate": "2026-07-14",
                        "overview": "House of the Dragon co-creator and showrunner Ryan Condal, Emma D’Arcy (Rhaenyra Targaryen), Olivia Cooke (Alicent Hightower), Matt Smith (Daemon Targaryen), Fabien Frankel (Criston Cole), and James Norton (Ormund Hightower) dive in-depth into Season 3, Episode 4 of #HOTD. They discuss Lord Ormund’s strategic occupation of Tumbleton and its impact on Rhaenyra, Ser Criston’s feelings of betrayal, and Daemon’s conflicting family encounter.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/47/w780.jpg"
                    },
                    {
                        "episodeNumber": 48,
                        "title": "Episode 48",
                        "airDate": "2026-07-21",
                        "overview": "Tensions rise and truths are revealed. House of the Dragon co-creator and showrunner Ryan Condal, Emma D’Arcy (Rhaenyra Targaryen), Fabien Frankel (Ser Criston Cole), Olivia Cooke (Alicent Hightower), Matt Smith (Daemon Targaryen), and Ewan Mitchell (Aemond Targaryen) break down Season 3, Episode 5 of #HOTD. They discuss Aegon’s renewed confidence and violent revenge, Alicent’s and Mysaria’s striking similarities, and Lord Ormund’s ruthless plan to return the Iron Throne to its rightful heir.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/48/w780.jpg"
                    },
                    {
                        "episodeNumber": 49,
                        "title": "Episode 49",
                        "airDate": "2026-07-28",
                        "overview": "The longing for power lies with many. House of the Dragon co-creator and showrunner Ryan Condal, Emma D’Arcy (Rhaenyra Targaryen), Matt Smith (Daemon Targaryen), Fabien Frankel (Ser Criston Cole) and James Norton (Lord Ormund Hightower) break down Season 3, Episode 6 of #HOTD. They discuss Daemon’s and Rhaenyra’s conflicting approaches to war, Aemond’s and Alys’s potentially powerful partnership, and Cole's shocking, yet inevitable final moment on the battlefield.  ",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/49/w780.jpg"
                    },
                    {
                        "episodeNumber": 50,
                        "title": "Episode 50",
                        "airDate": "2026-08-04",
                        "overview": "Secrets and lies come to light. House of the Dragon co-creator and showrunner Ryan Condal, Emma D’Arcy (Rhaenyra Targaryen), Matt Smith (Daemon Targaryen), James Norton (Lord Ormund Hightower), Ewan Mitchell (Aemond Targaryen), and Steve Toussaint (Lord Corlys Velaryon) break down Season 3, Episode 7 of #HOTD. They discuss Daemon’s struggle to balance his loyalties, Alicent’s ill-intentioned reunion with Aemond in Harrenhal, and Aegon’s redemption-turned-rebirth.   ",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/50/w780.jpg"
                    },
                    {
                        "episodeNumber": 51,
                        "title": "Episode 51",
                        "airDate": "2026-08-11",
                        "overview": "No one emerges unscathed. House of the Dragon co-creator and showrunner Ryan Condal, Emma D’Arcy (Rhaenyra Targaryen), Matt Smith (Daemon Targaryen), James Norton (Lord Ormund Hightower), Ewan Mitchell (Aemond Targaryen), and Olivia Cooke (Alicent Hightower) explain their character arcs and the evolution of war in the #HOTD Season 3 finale. They dive into Ulf’s impact on the war between the factions, Helaena’s devastating decision, and Rhaenyra’s season-long transformation as a ruler.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/0/51/w780.jpg"
                    },
                    {
                        "episodeNumber": 1,
                        "title": "Episode 1",
                        "airDate": "2022-08-22",
                        "overview": "Viserys hosts a tournament to celebrate the birth of his second child. Rhaenyra welcomes her uncle, Daemon, back to the Red Keep.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/1/1/w780.jpg"
                    },
                    {
                        "episodeNumber": 2,
                        "title": "Episode 2",
                        "airDate": "2022-08-29",
                        "overview": "Rhaenyra oversteps at the Small Council. Viserys is urged to secure the succession through marriage. Daemon announces his intentions.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/1/2/w780.jpg"
                    },
                    {
                        "episodeNumber": 3,
                        "title": "Episode 3",
                        "airDate": "2022-09-05",
                        "overview": "Daemon and the Sea Snake battle the Crabfeeder. The realm celebrates Aegon’s second nameday. Rhaenyra faces the prospect of marriage.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/1/3/w780.jpg"
                    },
                    {
                        "episodeNumber": 4,
                        "title": "Episode 4",
                        "airDate": "2022-09-12",
                        "overview": "After Rhaenyra cuts short her tour of Westeros, Daemon introduces the princess to the Street of Silk after dark.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/1/4/w780.jpg"
                    },
                    {
                        "episodeNumber": 5,
                        "title": "Episode 5",
                        "airDate": "2022-09-19",
                        "overview": "Daemon visits his wife in the Vale. Viserys and Rhaenyra broker agreements with the Velaryons. Alicent seeks the truth about the princess.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/1/5/w780.jpg"
                    },
                    {
                        "episodeNumber": 6,
                        "title": "Episode 6",
                        "airDate": "2022-09-26",
                        "overview": "Ten years later. Rhaenyra navigates Alicent’s continued speculation about her children, while Daemon and Laena weigh an offer in Pentos.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/1/6/w780.jpg"
                    },
                    {
                        "episodeNumber": 7,
                        "title": "Episode 7",
                        "airDate": "2022-10-03",
                        "overview": "As the families gather on Driftmark for a funeral, Viserys calls for an end to infighting and Alicent demands justice.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/1/7/w780.jpg"
                    },
                    {
                        "episodeNumber": 8,
                        "title": "Episode 8",
                        "airDate": "2022-10-10",
                        "overview": "Six years later. With the Driftmark succession suddenly critical, Rhaenyra attempts to strike a bargain with Rhaenys.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/1/8/w780.jpg"
                    },
                    {
                        "episodeNumber": 9,
                        "title": "Episode 9",
                        "airDate": "2022-10-17",
                        "overview": "While Alicent enlists Cole and Aemond to track down Aegon, Otto gathers the great houses of Westeros to affirm their allegiance.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/1/9/w780.jpg"
                    },
                    {
                        "episodeNumber": 10,
                        "title": "Episode 10",
                        "airDate": "2022-10-24",
                        "overview": "While mourning a tragic loss, Rhaenyra tries to hold the realm together, and Daemon prepares for war.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/1/10/w780.jpg"
                    }
                ]
            },
            {
                "seasonNumber": 2,
                "episodeCount": 8,
                "episodes": [
                    {
                        "episodeNumber": 1,
                        "title": "Episode 1",
                        "airDate": "2024-06-17",
                        "overview": "While Rhaenyra struggles to come to terms with her son’s murder, in King’s Landing, Alicent grows concerned that Aegon’s Small Council may lead them to an all-out war. Larys suggests Aegon needs a new Hand, and Rhaenyra arrives at a fateful decision.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/2/1/w780.jpg"
                    },
                    {
                        "episodeNumber": 2,
                        "title": "Episode 2",
                        "airDate": "2024-06-24",
                        "overview": "As Otto schemes to turn the public against her, Rhaenyra questions Daemon’s loyalty. Meanwhile, Ser Criston Cole concocts a misguided plan for revenge.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/2/2/w780.jpg"
                    },
                    {
                        "episodeNumber": 3,
                        "title": "Episode 3",
                        "airDate": "2024-07-01",
                        "overview": "As ancient grudges resurface, Rhaenys suggests that Alicent may see reason while the men around her seek bloodshed. Ser Criston proposes a bold scheme. Daemon arrives at Harrenhal to raise an army for the Blacks.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/2/3/w780.jpg"
                    },
                    {
                        "episodeNumber": 4,
                        "title": "Episode 4",
                        "airDate": "2024-07-08",
                        "overview": "In Rhaenyra’s absence and with no word from Daemon at Harrenhal, Rhaenys tries to keep the peace on the Black Council as Cole mounts a campaign into the Crownlands. In King’s Landing, Aemond continues to undermine Aegon’s fragile hold on authority.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/2/4/w780.jpg"
                    },
                    {
                        "episodeNumber": 5,
                        "title": "Episode 5",
                        "airDate": "2024-07-15",
                        "overview": "Amid whispers of bad omens, the Greens consider how to fill a void on Aegon’s Council, Jacaerys sets out on a rogue mission to strike a deal, and Daemon enlists Lord Willem Blackwood to help persuade the Brackens to bend the knee.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/2/5/w780.jpg"
                    },
                    {
                        "episodeNumber": 6,
                        "title": "Episode 6",
                        "airDate": "2024-07-22",
                        "overview": "With few options left, Rhaenyra summons a trusted knight for a risky venture and plots with Mysaria to catalyze the smallfolk. Meanwhile, Daemon’s unease grows, and Aemond takes steps to reshape the Green Council.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/2/6/w780.jpg"
                    },
                    {
                        "episodeNumber": 7,
                        "title": "Episode 7",
                        "airDate": "2024-07-29",
                        "overview": "As Rhaenyra looks to gain an advantage by unusual means, Daemon pressures a young liege lord to raise up his bannermen.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/2/7/w780.jpg"
                    },
                    {
                        "episodeNumber": 8,
                        "title": "Episode 8",
                        "airDate": "2024-08-05",
                        "overview": "As Aemond becomes more volatile, Larys plots an escape, and Alicent grows more concerned about Helaena’s safety. Flush with new power, Rhaenyra looks to press her advantage.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/2/8/w780.jpg"
                    }
                ]
            },
            {
                "seasonNumber": 3,
                "episodeCount": 8,
                "episodes": [
                    {
                        "episodeNumber": 1,
                        "title": "Episode 1",
                        "airDate": "2026-06-22",
                        "overview": "Driven by her faith in Alicent, Rhaenyra positions herself to take King's Landing while the Triarchy sails to take on Corlys in the Gullet.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/3/1/w780.jpg"
                    },
                    {
                        "episodeNumber": 2,
                        "title": "Episode 2",
                        "airDate": "2026-06-29",
                        "overview": "As Alicent risks everything to fulfill her end of the bargain, Rhaenyra must decide whether the Iron Throne is worth the cost.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/3/2/w780.jpg"
                    },
                    {
                        "episodeNumber": 3,
                        "title": "Episode 3",
                        "airDate": "2026-07-06",
                        "overview": "Rhaenyra learns the situation in King's Landing is not what she anticipated. Unable to locate her enemies, and with demands coming from all sides, Rhaenyra must navigate a delicate balance between appeasing her supporters and consolidating her rule.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/3/3/w780.jpg"
                    },
                    {
                        "episodeNumber": 4,
                        "title": "Episode 4",
                        "airDate": "2026-07-13",
                        "overview": "Ormund's invasion of Tumbleton forces Rhaenyra into a corner.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/3/4/w780.jpg"
                    },
                    {
                        "episodeNumber": 5,
                        "title": "Episode 5",
                        "airDate": "2026-07-20",
                        "overview": "As the search for Aemond and Vhagar continues, Daemon attempts to control the spiraling situation in King's Landing.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/3/5/w780.jpg"
                    },
                    {
                        "episodeNumber": 6,
                        "title": "Episode 6",
                        "airDate": "2026-07-27",
                        "overview": "While Rhaenyra and Daemon focus on how best to deal with Ormund, tensions among their neglected allies begin to erupt.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/3/6/w780.jpg"
                    },
                    {
                        "episodeNumber": 7,
                        "title": "Episode 7",
                        "airDate": "2026-08-03",
                        "overview": "Torn between Mysaria and Daemon's visions for her reign, Rhaenyra grows desperate for a sign that she will prevail.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/3/7/w780.jpg"
                    },
                    {
                        "episodeNumber": 8,
                        "title": "Episode 8",
                        "airDate": "2026-08-10",
                        "overview": "Shifting alliances irrevocably reshape the war as Rhaenyra's forces converge around Tumbleton and both sides vie to gain the upper hand.",
                        "thumbnail": "https://episodes.metahub.space/tt11198330/3/8/w780.jpg"
                    }
                ]
            }
        ],
        "watchProviders": [
            {
                "provider": "Netflix",
                "type": "Subscription",
                "url": "https://www.netflix.com/search?q=House%20of%20the%20Dragon"
            },
            {
                "provider": "Prime Video",
                "type": "Rent/Buy",
                "url": "https://www.amazon.com/s?k=House%20of%20the%20Dragon"
            },
            {
                "provider": "Official Cinema",
                "type": "Theatrical/Legal",
                "url": "https://www.google.com/search?q=House%20of%20the%20Dragon%20watch%20online%20official"
            }
        ],
        "servers": [
            {
                "name": "⚡ Fast Cloud Server 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct Fast Server 3",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1790275908088,
        "imdbId": "tt1190634",
        "title": "The Boys",
        "originalTitle": "The Boys",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K UHD",
        "size": "5 Seasons",
        "rating": "8.5",
        "year": "2019",
        "audio": "Multi-Audio",
        "trending": true,
        "type": "series",
        "poster": "https://images.metahub.space/poster/small/tt1190634/img",
        "backdrop": "https://images.metahub.space/background/medium/tt1190634/img",
        "story": "A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.",
        "trailer": "https://www.youtube.com/embed/tcrNsIaQkb4",
        "cast": [
            "Karl Urban",
            "Jack Quaid",
            "Antony Starr"
        ],
        "directors": [
            []
        ],
        "seasons": [
            {
                "seasonNumber": 1,
                "episodeCount": 91,
                "episodes": [
                    {
                        "episodeNumber": 1,
                        "title": "Episode 1",
                        "airDate": "2020-09-10",
                        "overview": "Butcher relives the past, recalling violence and betrayal on the rough road towards finding his wife Becca.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/1/w780.jpg"
                    },
                    {
                        "episodeNumber": 2,
                        "title": "Episode 2",
                        "airDate": "2021-06-03",
                        "overview": "A super Star is born! Watch the WORLD PREMIERE of the new #Starlight music video “Never Truly Vanish” now.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/2/w780.jpg"
                    },
                    {
                        "episodeNumber": 3,
                        "title": "Episode 3",
                        "airDate": "2021-07-07",
                        "overview": "An update on America's favorite hero, Homelander. Meet the new man: Victoria Neuman announces FBSA hire. Where is Alastair?: Church of the Collective head missing amidst new allegations.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/3/w780.jpg"
                    },
                    {
                        "episodeNumber": 4,
                        "title": "Episode 4",
                        "airDate": "2021-08-07",
                        "overview": "Is Starlight headed for a supernova? Making Waves: Deep’s bombshell allegations about Church of the Collective. Wall They’ve Got: Homelander fans stand up against super-terrorists.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/4/w780.jpg"
                    },
                    {
                        "episodeNumber": 5,
                        "title": "Episode 5",
                        "airDate": "2021-09-01",
                        "overview": "\"Faster than the speed of light, watching as your dreams take flight. I think I should stand and fight, then disappear into the night.”",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/5/w780.jpg"
                    },
                    {
                        "episodeNumber": 6,
                        "title": "Episode 6",
                        "airDate": "2021-09-07",
                        "overview": "Today on Vought News Network: Is the FBSA strong arming Vought? San Diego superhero sees popularity soar! A-Train's new single speeding up the charts.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/6/w780.jpg"
                    },
                    {
                        "episodeNumber": 7,
                        "title": "Episode 7",
                        "airDate": "2021-10-07",
                        "overview": "Today on Vought News Network: Starlight Sells Out - Heroine’s costume is almost as popular as Homelander’s this halloween. Black Noir hunts serial killer to keep tri-state area safe. FBSA oversteps again as they target Ezekiel. Special Message from Liquid Death Mountain Water.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/7/w780.jpg"
                    },
                    {
                        "episodeNumber": 8,
                        "title": "Episode 8",
                        "airDate": "2021-10-07",
                        "overview": "A Special Message from The Deep, Liquid Death Mountain Water’s new Chief Sustainability Associate.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/8/w780.jpg"
                    },
                    {
                        "episodeNumber": 9,
                        "title": "Episode 9",
                        "airDate": "2021-11-07",
                        "overview": "Today on Vought News Network: Victoria Neuman Gives Herself a Virtual Victory Parade. A Train: “I Promise To Have A New Race As Fast As Possible.\" Payback’s Legendary Hero Gunpowder Teaches Kids About The 2nd Amendment.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/9/w780.jpg"
                    },
                    {
                        "episodeNumber": 10,
                        "title": "Episode 10",
                        "airDate": "2021-12-07",
                        "overview": "Today on Vought News Network: Silent Knight Brings Bulletproof Cheer; Gecko On Vought’s Naughty List; and Starlight Awarded Top Honor at Holiday Benefit.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/10/w780.jpg"
                    },
                    {
                        "episodeNumber": 11,
                        "title": "Episode 11",
                        "airDate": "2022-01-07",
                        "overview": "Today on Vought News Network: Anticipation High for Vought Hero Draft; Tiny Hero's Big Film Premiere; A Fair & Balanced Conversation with the FBSA",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/11/w780.jpg"
                    },
                    {
                        "episodeNumber": 12,
                        "title": "Episode 12",
                        "airDate": "2022-02-09",
                        "overview": "This #NationalPizzaDay, there’s no better place to be than Buster Beaver’s. Visit today and sign up for Buster’s Pizza Pals Club to get 7x the tokens. Come on in and Eat the Beav!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/12/w780.jpg"
                    },
                    {
                        "episodeNumber": 13,
                        "title": "Episode 13",
                        "airDate": "2022-05-20",
                        "overview": "Coming June 3. When darkness descends on the world, and it seems all hope is lost, seven heroes will rise. Seven who will stand. Seven who will fight. Seven who will restore light and hope, and see the sun rise on a new era.\r\n\r\nThis is the true story of the greatest superhero team the world has ever known. This is the Dawn of The Seven.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/13/w780.jpg"
                    },
                    {
                        "episodeNumber": 14,
                        "title": "Episode 14",
                        "airDate": "2022-05-30",
                        "overview": "This Memorial Day, Vought International remembers America's first Superhero - Soldier Boy. In this classic PSA, he spoke up to help protect the youth of our great nation, reminding them that \"taking drugs is not cool, and anyone who does is a loser.\" Be sure to hit the subscribe button to honor his legacy.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/14/w780.jpg"
                    },
                    {
                        "episodeNumber": 15,
                        "title": "Episode 15",
                        "airDate": "2022-06-04",
                        "overview": "Tonight at 9/8C on Vought+, it’s the season finale of #AmericanHero! Three contestants remain, but only TWO will join #TheSeven! Will Starlight choose her old flame Supersonic? Or will someone else be moving into the Seven Tower? Tune in tonight for the SHOCKING final episode, brought to you by Lean Lady Frozen Dinners by Vought: Where slim tastes super!\r\n\r\n\r\nOn this exclusive Behind the Scenes Mansion Tour, Vought's own Ashley Barrett takes you inside American Hero Mansion, to see contestants vie for a chance to be America's next top hero. ",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/15/w780.jpg"
                    },
                    {
                        "episodeNumber": 16,
                        "title": "Episode 16",
                        "airDate": "2022-06-10",
                        "overview": "Soldier Boy serenades the Solid Gold dancers with a super rendition of Blondie's \"Rapture\" in this classic clip recorded just before his heroic final mission. Shortly after this, he was posthumously awarded a Vrammy for Best Special Guest Performance!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/16/w780.jpg"
                    },
                    {
                        "episodeNumber": 17,
                        "title": "Episode 17",
                        "airDate": "2022-06-13",
                        "overview": "Based on the bestselling autobiography, Deeper: A Memoir, comes a thrilling story of Love, Loss, Redemption, Light, and Fresca. Only on Vought+. \r\n\r\nStarring 3 time Vemmy Award Winner The Deep as Deep, and MTV Movie Award Nominee Billy Zane as Alastair Adana. ",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/17/w780.jpg"
                    },
                    {
                        "episodeNumber": 20,
                        "title": "Episode 20",
                        "airDate": "2022-07-27",
                        "overview": "If you feel like #WisdomWednesday is surface-level, it's time for #DeepThoughtsWithTheDeep. Here's a collection of the Lord of the Seven Seas' greatest wisdom that will shape our lives forever. Continue your journey of enlightenment with #DeeperAndDeeper, the most intimate superhero interview of all time, now available on Audible.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/20/w780.jpg"
                    },
                    {
                        "episodeNumber": 21,
                        "title": "Episode 21",
                        "airDate": "2022-08-11",
                        "overview": "We saw your tweets, opened your emails, and read your one-star reviews. That’s why we’re making the brave choice to bring Soldier Boy back to Vought++. Films like Red Thunder will now have this content warning to properly prepare patriots before they press play!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/21/w780.jpg"
                    },
                    {
                        "episodeNumber": 22,
                        "title": "Episode 22",
                        "airDate": "2022-09-06",
                        "overview": "For months, you’ve asked to see the most inspirational commercial ever made again. Originally taken off air because the testing was too strong, this is “Taste The Movement,” the full-length spot for A-Train’s Turbo Rush. Look for a super back-to-school sale on 7-Packs now!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/22/w780.jpg"
                    },
                    {
                        "episodeNumber": 24,
                        "title": "Episode 24",
                        "airDate": "2022-09-10",
                        "overview": "On this day in 2008, one glance across study hall changed everything. Celebrate 14 years of Rock My Kiss, the chart-topping single from the boys of Super-Sweet. Upgrade to a Voughtify Premium Student subscription to listen to a Supersonic bonus tribute!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/24/w780.jpg"
                    },
                    {
                        "episodeNumber": 25,
                        "title": "Episode 25",
                        "airDate": "2022-09-16",
                        "overview": "This National Working Parents Day, we’re proud to support mothers and fathers like Homelander, who somehow manage to keep our country safe while raising the next generation of heroes. Work at Vought and get occasional access to our on-site Vought Tots Daycare!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/25/w780.jpg"
                    },
                    {
                        "episodeNumber": 26,
                        "title": "Episode 26",
                        "airDate": "2022-09-28",
                        "overview": "On this special edition of VNN's Seven on 7, Cameron has the details on a new energy drink Vought has partnered with G Fuel on. Inspired by Compound V, it sharpens focus, increases energy, and in select cases, turns you into a weapon of mass destruction.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/26/w780.jpg"
                    },
                    {
                        "episodeNumber": 27,
                        "title": "Episode 27",
                        "airDate": "2022-10-01",
                        "overview": "This Soy Sauce Day, enjoy a bottle of Kirei Shoyu, full of flavor and peak freshness. Now back in stock at your local store, thanks to the Deep personally escorting a cargo shipment across the ocean. Get 7% off with promo code GOODLUCK!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/27/w780.jpg"
                    },
                    {
                        "episodeNumber": 28,
                        "title": "Episode 28",
                        "airDate": "2022-10-08",
                        "overview": "This year, we lost one of Deep’s dear friends Timothy, who was sadly eaten by a predator. We can’t bring back Timothy, but we can try to make oceans safer for cephalopods on World Octopus Day. Vought is proud to offer continued support, thoughts and prayers for Timothy’s family!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/28/w780.jpg"
                    },
                    {
                        "episodeNumber": 29,
                        "title": "Episode 29",
                        "airDate": "2022-12-07",
                        "overview": "Coming to you a week late so we could collect more of your data and iron out a few technical glitches, it’s the 2022 Voughtify Recapped! Join A-Train as we celebrate the Top 5 songs of the year, and remember to separate art (Rapture) from the artist and traitor (Soldier Boy).",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/29/w780.jpg"
                    },
                    {
                        "episodeNumber": 30,
                        "title": "Episode 30",
                        "airDate": "2023-01-24",
                        "overview": "Transparency has always been our core value at Vought. That’s why ahead of our Q1 earnings call, we’ve prepped this summary for all shareholders to enjoy. Here's CEO Ashley Barrett, who has the board’s full confidence and was just given a new seven-month contract!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/30/w780.jpg"
                    },
                    {
                        "episodeNumber": 31,
                        "title": "Episode 31",
                        "airDate": "2023-03-12",
                        "overview": "Tonight, we honor Queen Maeve with this emotional in memoriam at the Supie Awards. A hero on and off screen, her acting in Dawn of the Seven and Her Majesty will be studied by performing arts students at Godolkin University for years to come. Rest In Pride, Queen! ????️‍????",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/31/w780.jpg"
                    },
                    {
                        "episodeNumber": 32,
                        "title": "Episode 32",
                        "airDate": "2023-06-14",
                        "overview": "It’s a dark day for America. But together, we can keep an innocent hero #HomeFree. Here’s CEO Ashley Barrett with more on Homelander.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/32/w780.jpg"
                    },
                    {
                        "episodeNumber": 33,
                        "title": "Episode 33",
                        "airDate": "2023-06-15",
                        "overview": "If there’s one thing Americans can count on right now, it’s that Cameron is committed to debunking the lies surrounding this shameless facade of a “trial.” Join him every night as he brings you hard-hitting news, and teaches the woke mob basic vocabulary like “loving father”!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/33/w780.jpg"
                    },
                    {
                        "episodeNumber": 35,
                        "title": "Episode 35",
                        "airDate": "2023-09-19",
                        "overview": "Congratulations, and welcome to Godolkin University! Join Dean Shetty, Professor Brink and a few of our Super students for this semester’s official Orientation Video. Watch, and then make a cash-only donation to our combat gym renovation at https://www.godolkinuniversity.com/",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/35/w780.jpg"
                    },
                    {
                        "episodeNumber": 36,
                        "title": "Episode 36",
                        "airDate": "2023-09-21",
                        "overview": "At Godolkin University, we encourage our Performing Arts students to learn everything they can about visual media. This semester, they developed their very own campus tour featuring No. 2-ranked Jordan Li. Please excuse any roughness in the edit, they are still learning what Director Bourke-level production quality looks like! ",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/36/w780.jpg"
                    },
                    {
                        "episodeNumber": 37,
                        "title": "Episode 37",
                        "airDate": "2023-09-27",
                        "overview": "Come one, come all. At Godolkin University, it doesn't matter who finishes first, as long as no one gets hurt. Watch for tips on having a pleasurable semester, and visit https://supeporn.com/en for a special back-to-school offer!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/37/w780.jpg"
                    },
                    {
                        "episodeNumber": 38,
                        "title": "Episode 38",
                        "airDate": "2023-10-03",
                        "overview": "WARNING: This message is for avid VNN viewers only. If you tuned in to the latest updates this weekend, please listen as CEO Ashley Barrett provides calm and collected reassurance around recent events at Godolkin.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/38/w780.jpg"
                    },
                    {
                        "episodeNumber": 39,
                        "title": "Episode 39",
                        "airDate": "2023-10-05",
                        "overview": "Today, Vought is proud to announce the #ThinkBrink initiative. Consider a sizable donation if you care about the future of education – for you, for God U, for Brink. And cash-only, please!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/39/w780.jpg"
                    },
                    {
                        "episodeNumber": 40,
                        "title": "Episode 40",
                        "airDate": "2023-10-12",
                        "overview": "Supercharge your social with V, the new browser powered by Vought and Opera GX. Follow your favorite supers, keep up with the latest at Godolkin University, and more. Homelander has more than 100M followers already!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/40/w780.jpg"
                    },
                    {
                        "episodeNumber": 41,
                        "title": "Episode 41",
                        "airDate": "2023-11-09",
                        "overview": "From the ashes of tragedy, a new generation of heroes will rise. Like, comment and smash that subscribe button to thank the new GUARDIANS OF GODOLKIN for their bravery in saving the lives of countless students. Cate Dunlap and Sam Riordan will return!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/41/w780.jpg"
                    },
                    {
                        "episodeNumber": 42,
                        "title": "Episode 42",
                        "airDate": "2022-06-17",
                        "overview": "After a lifetime of using her super powers to protect America as part of legendary supe team Payback, Crimson Countess is using the power of music to help chimps live happier lives.\r\n",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/42/w780.jpg"
                    },
                    {
                        "episodeNumber": 43,
                        "title": "Episode 43",
                        "airDate": "2022-06-23",
                        "overview": "Supersonic may be gone, but he'll live forever in our hearts - and our ears! Reminisce about summer nights cruising in the Jetta with “You Got Your License To Drive (Me Crazy),\" and all of SuperSweet’s catalogue, exclusively on Voughtify.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/43/w780.jpg"
                    },
                    {
                        "episodeNumber": 44,
                        "title": "Episode 44",
                        "airDate": "2023-07-10",
                        "overview": "BREAKING: Vought and VNN can exclusively confirm that Homelander, Black Noir and a hero who shall not be named are coming to Call of Duty. More insightful soundbites from Noir in this press conference for the ages!\r\n",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/44/w780.jpg"
                    },
                    {
                        "episodeNumber": 45,
                        "title": "Episode 45",
                        "airDate": "2024-02-11",
                        "overview": "Today, Vought brings you an exclusive new ad for The Big Game. Rated \"Too Patriotic\" for TV, this is a love letter to AMERICA. Please enjoy with an ice cold Turbo Rush!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/45/w780.jpg"
                    },
                    {
                        "episodeNumber": 46,
                        "title": "Episode 46",
                        "airDate": "2024-03-05",
                        "overview": "Despite what the fake news might tell you, Vought and Homelander have ALWAYS been steadfast friends with Robert Singer and Victoria Neuman. This Tuesday, we're proud to stand with them, and work towards a new era for the SUPERhuman community!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/46/w780.jpg"
                    },
                    {
                        "episodeNumber": 47,
                        "title": "Episode 47",
                        "airDate": "2024-05-21",
                        "overview": "At Vought, our primary goal is to create a stronger, MORE SUPER America. That’s why we’re endorsing Robert Singer and Victoria Neuman, who have promised to give Superhumans more just than a seat at the table. We’ll be holding them accountable every step of the way!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/47/w780.jpg"
                    },
                    {
                        "episodeNumber": 48,
                        "title": "Episode 48",
                        "airDate": "2024-06-07",
                        "overview": "We’re tired of socialist teachers brainwashing your kids with their woke takes on the “Civil War” and “Women’s Rights.\" That’s why we’re launching Vought’s American History – designed to teach your lil’ patriots the God-honest truth about this nation’s history. Buy now and get a special edition copy with a foreword from Homelander himself!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/48/w780.jpg"
                    },
                    {
                        "episodeNumber": 49,
                        "title": "Episode 49",
                        "airDate": "2024-06-08",
                        "overview": "This World Oceans Day, Vought is proud to present the triumphant return of Deep Thoughts With The Deep. This time, even Deeper! Listen as The Lord of the Seven Seas ponders provocative questions that no other mind in history has dared to tackle.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/49/w780.jpg"
                    },
                    {
                        "episodeNumber": 50,
                        "title": "Episode 50",
                        "airDate": "2024-06-11",
                        "overview": "Today, The Deep is proud to announce a renewed partnership with Liquid Death. Two years ago, he taught children to bring death to plastic, and now he is educating them on the dangers of sugar. He takes his job as role model and health & wellness ambassador Deep-ly serious!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/50/w780.jpg"
                    },
                    {
                        "episodeNumber": 51,
                        "title": "Episode 51",
                        "airDate": "2024-06-11",
                        "overview": "This Thursday, we’re proud to present Vought on Ice! It’s the most festive, family-friendly show ever – converting non-believers into God-fearing, upstanding citizens in under three hours. Nothing says \"Merry Christmas\" like Homelander landing a triple axel! https://www.voughtonice.com/",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/51/w780.jpg"
                    },
                    {
                        "episodeNumber": 53,
                        "title": "Episode 53",
                        "airDate": "2024-06-10",
                        "overview": "From the studio that brought you Rising Tide and Dawn of the Seven comes TRAINING A-TRAIN. Now in production, directed by award-winning filmmaker Adam Bourke and starring The World’s Fastest Man. Here’s A-Train on why this is his most heart-wrenching role yet!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/53/w780.jpg"
                    },
                    {
                        "episodeNumber": 54,
                        "title": "Episode 54",
                        "airDate": "2019-08-02",
                        "overview": "Billy Butcher visits an elementary school to teach students that superheroes ain't always nice.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/54/w780.jpg"
                    },
                    {
                        "episodeNumber": 56,
                        "title": "Episode 56",
                        "airDate": "2024-06-18",
                        "overview": "At Vought, we see the same spark in Firecracker as Homelander does: a fearless freedom fighter. Hear it for yourself today on this week's episode of Truthbomb as she recounts this weekend’s horrific events, and help ignite the resistance by sharing with #WhereWeGoOneWeGoVought!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/56/w780.jpg"
                    },
                    {
                        "episodeNumber": 58,
                        "title": "Episode 58",
                        "airDate": "2024-06-22",
                        "overview": "Vought is proud to usher in a new era of Internet privacy. Together with Opera GX, we’ve built BROWSER by Vought. What it lacks in branding creativity, it makes up for in speed and security. Download it today and you’ll be review bombing woke TV shows in no time!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/58/w780.jpg"
                    },
                    {
                        "episodeNumber": 59,
                        "title": "Episode 59",
                        "airDate": "2024-06-24",
                        "overview": "You saw it already on Firecracker’s recent six-hour VNN special, but for the first time ever online, it’s her full performance of “Up Where We Belong” featuring Deep. God Himself smiled down from heaven as they sang, and we bet He’ll be streaming on Voughtify too!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/59/w780.jpg"
                    },
                    {
                        "episodeNumber": 60,
                        "title": "Episode 60",
                        "airDate": "2024-06-28",
                        "overview": "If you missed #V52, we trust you had a completely invalid excuse or were trapped under something heavy. Here’s A-Train, Deep and Noir to recap the most important and influential day in entertainment history, destined to shape culture for at least the next seven decades!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/60/w780.jpg"
                    },
                    {
                        "episodeNumber": 61,
                        "title": "Episode 61",
                        "airDate": "2024-07-01",
                        "overview": "Ever wonder how CEO Ashley Barrett looks so composed in every meeting or press conference? Her secret is simple – Voughtality! Featuring a line of products that will have you feeling fresh and moist on every level. Voughtality – For A Super You.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/61/w780.jpg"
                    },
                    {
                        "episodeNumber": 62,
                        "title": "Episode 62",
                        "airDate": "2024-07-05",
                        "overview": "At Vought Fresh Farms, we’ll do anything to make sure you get the right amount of dairy. That’s why our milk is made from only the youngest and most God-fearing of cows, homegrown right here in America. Vought Fresh Farms, the only choice for true patriots like Homelander!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/62/w780.jpg"
                    },
                    {
                        "episodeNumber": 63,
                        "title": "Episode 63",
                        "airDate": "2024-07-09",
                        "overview": "At Vought, our top priority always has been transparency. That’s why CEO Ashley Barrett is here to debunk the woke conspiracy theories on the dark web. Remember, if you’re going to share misinformation, make sure you get it from reputable patriots like Firecracker!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/63/w780.jpg"
                    },
                    {
                        "episodeNumber": 64,
                        "title": "Episode 64",
                        "airDate": "2024-07-10",
                        "overview": "Back by popular demand, Vought proudly presents a new wave of Deep Thoughts with The Deep. Keep the waters of your mind still as you soak in these pearls of wisdom. Then when you’re done, be sure to share with a bro!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/64/w780.jpg"
                    },
                    {
                        "episodeNumber": 65,
                        "title": "Episode 65",
                        "airDate": "2024-07-22",
                        "overview": "This week, Olympics viewers will be delighted watching the events AND the ad breaks. Here's a first look at a new TV spot featuring The Deep, the greatest swimmer of all-time. He'd easily be world champion if Supers were allowed to compete!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/65/w780.jpg"
                    },
                    {
                        "episodeNumber": 66,
                        "title": "Episode 66",
                        "airDate": "2024-07-29",
                        "overview": "Our social media department on Floor 47 has seen lots of conversation about Soldier Boy the past few days. He’s still a traitor, but it’s footage like this that helps us remember his better days as a true hero. Share to tell someone you love GOD BLESS AMERICA!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/66/w780.jpg"
                    },
                    {
                        "episodeNumber": 104,
                        "title": "Episode 104",
                        "airDate": "2024-11-01",
                        "overview": "It’s more than a festive tune – it’s a cry of freedom from patriots everywhere! SEE SOMETHING, SAY SOMETHING. Performed by puppets, adored by everyone. Sing along, then call the hotline to report those groomers. Remember - T is for TRAITOR!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/104/w780.jpg"
                    },
                    {
                        "episodeNumber": 105,
                        "title": "Episode 105",
                        "airDate": "2024-06-15",
                        "overview": "Critics, families and online trolls have all been raving about Vought On Ice! That’s why we’re bringing you an exclusive and extended look at the magic. \r\n\r\nOnce you’re done watching, stream “Let’s Put the Christ Back in Christmas” anytime on Voughtify! ",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/105/w780.jpg"
                    },
                    {
                        "episodeNumber": 106,
                        "title": "Episode 106",
                        "airDate": "2025-06-04",
                        "overview": "Today, we present our most groundbreaking Superclass yet. Join legendary director Adam Bourke (Dawn of the Seven, Training A-Train) as he unveils proprietary trade secrets for dominating awards season. Actors, if you're putting up massive ratings and TikTok views, but have never hoisted the hardware, this video is for you!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/106/w780.jpg"
                    },
                    {
                        "episodeNumber": 107,
                        "title": "Episode 107",
                        "airDate": "2025-08-28",
                        "overview": "Full Episode 107 of Season 1",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/107/w780.jpg"
                    },
                    {
                        "episodeNumber": 108,
                        "title": "Episode 108",
                        "airDate": "2026-03-27",
                        "overview": "Back by popular demand, it’s Deep Thoughts With The Deep! These are his Deepest ones yet, as he’s plunged to Marianas Trench depths of enlightenment that no human has ever explored. James Cameron could never. But The Deep can. And could. And did. And will.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/108/w780.jpg"
                    },
                    {
                        "episodeNumber": 109,
                        "title": "Episode 109",
                        "airDate": "2026-03-31",
                        "overview": "Get ready for another TRUTHBOMB, patriots! Today, Firecracker sets the record straight on the whereabouts of A-Train. He is STILL on his top-secret, extended overseas mission serving the people of this great nation. All other rumors to the contrary are Starlighter propaganda!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/109/w780.jpg"
                    },
                    {
                        "episodeNumber": 110,
                        "title": "Episode 110",
                        "airDate": "2026-04-06",
                        "overview": "This week, the manosphere won’t know what hit it, as Deep and Noir are here with a truly goated episode of MANHANDLED. Get a sneak peek Wednesday on Vought+, then look out for an extended version online later in the week. Strength, independence, SIGMA!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/110/w780.jpg"
                    },
                    {
                        "episodeNumber": 111,
                        "title": "Episode 111",
                        "airDate": "2026-04-09",
                        "overview": "It’s time, Manhandlers, a new episode with Deep and Noir is live NOW. This is about to be the dopest 15 minutes of your entire life. All sigma, no beta! ",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/111/w780.jpg"
                    },
                    {
                        "episodeNumber": 112,
                        "title": "Episode 112",
                        "airDate": "2026-04-10",
                        "overview": "Vought is proud to partner with Ashley Barrett in her new role as Vice President. We knew she was destined for big things as we watched her climb the corporate ladder here in Vought Tower. Keep breaking those glass ceilings, Ashley!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/112/w780.jpg"
                    },
                    {
                        "episodeNumber": 113,
                        "title": "Episode 113",
                        "airDate": "2026-04-11",
                        "overview": "Introducing the Manhandled Manscaping Kit, for bros that want to take their anal wellness to the next level. If you’ve been tanning your taint without it, stop whatever you’re doing and order now! VoughtCoin accepted at purchase.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/113/w780.jpg"
                    },
                    {
                        "episodeNumber": 114,
                        "title": "Episode 114",
                        "airDate": "2026-04-12",
                        "overview": "This Lord’s Day, we set our sights to the heavens above, and say “see you soon” to A-Train. As Homelander so eloquently put at his recent memorial service, “he was a good friend, and used to be very fast.” Thank you for everything, A-Train, it was a good run!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/114/w780.jpg"
                    },
                    {
                        "episodeNumber": 115,
                        "title": "Episode 115",
                        "airDate": "2026-04-08",
                        "overview": "We're live with the next gen of Vought heroes, Teenage Kix! Spend a few minutes with Jetstreak, Sheline and Countess Crow from their HQ in the beautiful state of Ohio.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/115/w780.jpg"
                    },
                    {
                        "episodeNumber": 116,
                        "title": "Episode 116",
                        "airDate": "2026-04-17",
                        "overview": "For A-Train’s memorial service, Oh Father paid his respects by organizing a gospel choir to sing a soulful rendition of his hit song “Faster.” Watch the official music video, and lift your voice up to the heavens so A-Train and the angels can hear!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/116/w780.jpg"
                    },
                    {
                        "episodeNumber": 117,
                        "title": "Episode 117",
                        "airDate": "2026-04-18",
                        "overview": "Following his recent bombshell press conference at Vought Tower, Soldier Boy was kind enough to answer a few follow-up questions for VNN. His eloquent, straight-shooting professionalism will make him a perfect fit for The Seven!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/117/w780.jpg"
                    },
                    {
                        "episodeNumber": 118,
                        "title": "Episode 118",
                        "airDate": "2026-05-06",
                        "overview": "Today, we honor visionary writer, director and storyteller Adam Bourke. He recently died doing what he loved – giving back to the creative community directing a play. Crime Analytics will find the Starlighter responsible for his death, there’s something fishy about the circumstances!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/118/w780.jpg"
                    },
                    {
                        "episodeNumber": 119,
                        "title": "Episode 119",
                        "airDate": "2026-05-09",
                        "overview": "As gas prices continue to skyrocket, Deep has taken matters into his very muscular hands. He’s worked with Vought Petroleum to open a brand new, eco-friendly pipeline in Alaskan waters that will deliver gas to your tank and extra cash to your wallet. The Deep says sea life is stoked with America’s Energy Independence!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/119/w780.jpg"
                    },
                    {
                        "episodeNumber": 120,
                        "title": "Episode 120",
                        "airDate": "2026-05-10",
                        "overview": "Firecracker was a defender of honest, common sense straight talk.  But tragically, Starlight doesn’t want you to know the truth, so she murdered Firecracker in cold blood.  Rest in power Firecracker.  We’re sure you’re soaring to Heaven on the wings of an eagle!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/120/w780.jpg"
                    },
                    {
                        "episodeNumber": 121,
                        "title": "Episode 121",
                        "airDate": "2026-05-11",
                        "overview": "Here’s one from the archives featuring an original hero, Bombsight. He and his good friend Soldier Boy not only kept America safe from Communists, but also were the face of many new revolutionary products like this one. Then and now, you can always trust a hero-recommended brand!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/121/w780.jpg"
                    },
                    {
                        "episodeNumber": 122,
                        "title": "Episode 122",
                        "airDate": "2026-05-14",
                        "overview": "We trust that right now, the angels on high are singing the name of Homelander. And lucky for us, we have the voice of an angel in Oh Father to “Raise Him Up” here. Watch his full performance and stream the song that’s already climbed to the top of the Voughtify charts!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/122/w780.jpg"
                    },
                    {
                        "episodeNumber": 123,
                        "title": "Episode 123",
                        "airDate": "2026-05-15",
                        "overview": "Today, we are proud to help introduce a new spokesperson for @liquiddeath – Ashley Barrett. Just like Homelander, she cares deeply about what Americans put in their bodies. Throw out your nut milk and treat yourself to an easy drinking sparkling energy – guaranteed to not explode your head! (NOTE: President Barrett was still Vice President at time of filming)",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/123/w780.jpg"
                    },
                    {
                        "episodeNumber": 124,
                        "title": "Episode 124",
                        "airDate": "2026-05-29",
                        "overview": "Bro down, patriots. The Deep heroically gave his life saving his beloved marine animals from the Vought Pipeline, which to be clear, was a product of the corrupt Homelander administration.  Dolphins and octopi everywhere are in mourning, and the Manhandled Podcast is on pause until further notice.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/124/w780.jpg"
                    },
                    {
                        "episodeNumber": 125,
                        "title": "Episode 125",
                        "airDate": "2026-05-29",
                        "overview": "A Series Retrospective of The Boys featuring cast and crew interviews presented in six chapters: Origin Story, Building the World, Establishing the Voice, Crafting the Magic, Beyond the Screen, and Legacy.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/125/w780.jpg"
                    },
                    {
                        "episodeNumber": 126,
                        "title": "Episode 126",
                        "airDate": "2026-05-31",
                        "overview": "On the Lord’s Day, we take a moment to remember Oh Father, who was brutally murdered by Homelander in his recent reign of terror. He was a spiritual leader unlike any other, and his voice will never be gagged. Rest in power, Oh Father!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/126/w780.jpg"
                    },
                    {
                        "episodeNumber": 127,
                        "title": "Episode 127",
                        "airDate": "2026-06-14",
                        "overview": "We’ve seen your questions on Black Noir’s whereabouts, and can assure you he has merely departed on yet another critical mission overseas. If he could speak, he would tell you reports of his demise are greatly exaggerated. Thank you for your service, Noir, and for being the best bro this nation could ask for!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/0/127/w780.jpg"
                    },
                    {
                        "episodeNumber": 1,
                        "title": "Episode 1",
                        "airDate": "2019-07-26",
                        "overview": "When a Supe kills the love of his life, A/V salesman Hughie Campbell teams up with Billy Butcher, a vigilante hell-bent on punishing corrupt Supes -- and Hughie’s life will never be the same again.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/1/1/w780.jpg"
                    },
                    {
                        "episodeNumber": 2,
                        "title": "Episode 2",
                        "airDate": "2019-07-26",
                        "overview": "The Boys get themselves a Superhero, Starlight gets payback, Homelander gets naughty, and a Senator gets naughtier.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/1/2/w780.jpg"
                    },
                    {
                        "episodeNumber": 3,
                        "title": "Episode 3",
                        "airDate": "2019-07-26",
                        "overview": "It’s the race of the century. A-Train versus Shockwave, vying for the title of World’s Fastest Man. Meanwhile, the Boys are reunited and it feels so good.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/1/3/w780.jpg"
                    },
                    {
                        "episodeNumber": 4,
                        "title": "Episode 4",
                        "airDate": "2019-07-26",
                        "overview": "On a very special episode of The Boys... an hour of guts, gutterballs, airplane hijackings, madness, ghosts, and one very intriguing Female. Oh, and lots of heart -- both in the sentimental sense, and in the gory literal sense.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/1/4/w780.jpg"
                    },
                    {
                        "episodeNumber": 5,
                        "title": "Episode 5",
                        "airDate": "2019-07-26",
                        "overview": "The Boys head to the “Believe” Expo to follow a promising lead in their ongoing war against the Supes. There might -- MIGHT -- be a homicidal infant, but you'll have to see for yourself.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/1/5/w780.jpg"
                    },
                    {
                        "episodeNumber": 6,
                        "title": "Episode 6",
                        "airDate": "2019-07-26",
                        "overview": "SUPER IN AMERICA (2019). Vought Studios. Genre: Reality.   Starring: Homelander, Queen Maeve, Black Noir, The Deep, A-Train, Starlight, Tara Reid, Billy Zane.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/1/6/w780.jpg"
                    },
                    {
                        "episodeNumber": 7,
                        "title": "Episode 7",
                        "airDate": "2019-07-26",
                        "overview": "Never trust a washed-up Supe -- the Boys learn this lesson the hard way. Meanwhile, Homelander digs into his past, Starlight discovers that love hurts, and if you’re ever in Sandusky, Ohio and a girl asks if she can touch your gills, say NO.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/1/7/w780.jpg"
                    },
                    {
                        "episodeNumber": 8,
                        "title": "Episode 8",
                        "airDate": "2019-07-26",
                        "overview": "Season Finale Time! Questions answered! Secrets revealed! Conflicts… conflicted! Characters exploded! And so much more!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/1/8/w780.jpg"
                    }
                ]
            },
            {
                "seasonNumber": 2,
                "episodeCount": 8,
                "episodes": [
                    {
                        "episodeNumber": 1,
                        "title": "Episode 1",
                        "airDate": "2020-09-04",
                        "overview": "Season 2! New and improved! Now with 50% more explosive decapitations, terrorists, S&M hookers, cults, and a new pine fresh scent! But wait, there’s more! 2X MORE blood, guts and gore than the other leading brands! This exclusive offer is available only on Amazon Prime Video! Don’t delay! Order now!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/2/1/w780.jpg"
                    },
                    {
                        "episodeNumber": 2,
                        "title": "Episode 2",
                        "airDate": "2020-09-04",
                        "overview": "The Boys get themselves a Super Terrorist, Starlight gets evidence against Vought, The Deep gets in touch with his feelings, and Homelander gets himself a family (sort of).  All that, and a hard-hitting exposé on why Super Suits don’t have pockets.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/2/2/w780.jpg"
                    },
                    {
                        "episodeNumber": 3,
                        "title": "Episode 3",
                        "airDate": "2020-09-04",
                        "overview": "Attention: If you or a loved one were exposed to Compound V, you may be entitled to financial compensation. Vought has given the drug to multiple victims, without their knowledge or consent. If you believe that you or a loved one were administered Compound V, call the law firm of Bremmer & Bremmer at 1-888-177-2774 for a free legal consultation. Know your rights!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/2/3/w780.jpg"
                    },
                    {
                        "episodeNumber": 4,
                        "title": "Episode 4",
                        "airDate": "2020-09-11",
                        "overview": "Road trip!  The Boys head to North Carolina to follow a lead on a mysterious Supe named Liberty.  And did you know a person’s choice of candy bars might tell you if they’re a serial killer?  Watch and learn the warning signs!  This episode could save your life!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/2/4/w780.jpg"
                    },
                    {
                        "episodeNumber": 5,
                        "title": "Episode 5",
                        "airDate": "2020-09-18",
                        "overview": "VoughtStudios is pleased to announce that filming has begun on #DawnOfTheSeven. 12 years of VCU movies have led to this. If you like movies about One Hero, you’ll love a movie about Seven Heroes. Introducing newest member @RealStormfront! See how the legend began! In theaters Summer 2021!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/2/5/w780.jpg"
                    },
                    {
                        "episodeNumber": 6,
                        "title": "Episode 6",
                        "airDate": "2020-09-25",
                        "overview": "The Sage Grove Center® is dedicated to caring for those struggling with mental illness. Our compassionate doctors and counselors provide personalized services to help patients live their best lives. If you or a loved one need help, call the Sage Grove Center today at 1-800-122-8585. A proud subsidiary of Global Wellness Services®, which is a proud subsidiary of Vought International®",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/2/6/w780.jpg"
                    },
                    {
                        "episodeNumber": 7,
                        "title": "Episode 7",
                        "airDate": "2020-10-02",
                        "overview": "Congresswoman Victoria Neuman’s sham Congressional Hearing against Vought takes place in 3 DAYS. Are we going to let her criminalize Superheroes when we need them most? We have to stand up against such blatant partisan politics. Please join fellow Patriotic Americans and send $20 to VOUGHTPROMISE.COM to tell Neuman and her Kangaroo Court Cronies that they won’t win, “Not On Our Watch”™.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/2/7/w780.jpg"
                    },
                    {
                        "episodeNumber": 8,
                        "title": "Episode 8",
                        "airDate": "2020-10-09",
                        "overview": "***SUPER VILLAIN ALERT*** YOU ARE RECEIVING THIS NOTIFICATION FROM THE DEPARTMENT OF HOMELAND SECURITY. A SUPER VILLAIN ALERT HAS BEEN ISSUED FOR YOUR AREA. PLEASE BE VIGILANT AND REPORT ANY SUSPICIOUS PERSONS OR ACTIVITY. IF YOU BELIEVE YOU HAVE SEEN A SUPER VILLAIN, DO NOT APPROACH OR ATTEMPT TO APPREHEND THEM. CONTACT LAW ENFORCEMENT IMMEDIATELY",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/2/8/w780.jpg"
                    }
                ]
            },
            {
                "seasonNumber": 3,
                "episodeCount": 8,
                "episodes": [
                    {
                        "episodeNumber": 1,
                        "title": "Episode 1",
                        "airDate": "2022-06-03",
                        "overview": "You and a guest are invited to the premiere of DAWN OF THE SEVEN this Tuesday at 7PM in Vought Tower’s Lamplighter Memorial Theater! Screening will be followed by a Q&A with director Adam Bourke and an after-party with Supe DJ Malchemical on the turntables! Join us for the greatest true origin story ever told about America’s number one Superhero team and see how the legend began!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/3/1/w780.jpg"
                    },
                    {
                        "episodeNumber": 2,
                        "title": "Episode 2",
                        "airDate": "2022-06-03",
                        "overview": "Homelander. America’s greatest Superhero. Defending our shores from sea to shining sea. Today, America honors him on his birthday. And the Vought Shopping Network is celebrating by offering the exclusive Homelander Limited Birthday Edition Gold Coin for only $99.95 (plus tax and shipping) while supplies last. Vought Gold Commemorative Coins: An investment that lasts a lifetime.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/3/2/w780.jpg"
                    },
                    {
                        "episodeNumber": 3,
                        "title": "Episode 3",
                        "airDate": "2022-06-03",
                        "overview": "Tonight at 9/8C on Vought Plus, it’s the season finale of #AmericanHero! Three contestants remain, but only TWO will join #TheSeven! Will Starlight choose her old flame Supersonic? Or will someone else be moving into the Seven Tower? Tune in tonight for the SHOCKING final episode, brought to you by Lean Lady Frozen Dinners by Vought: Where slim tastes super!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/3/3/w780.jpg"
                    },
                    {
                        "episodeNumber": 4,
                        "title": "Episode 4",
                        "airDate": "2022-06-10",
                        "overview": "Tonight, streaming live exclusively for Supeporn.com Super-Subscribers, it’s the #ClashOfTheDildos! Which of The Seven-inspired dildos will crush the competition in this tip-to-tip challenge? Will it be the reigning champion Homelander Star-Spangled Banger or Starlight’s electrified Star-Brator? Join us as we put these pleasure-pounding penetrators through their paces! Only on Supeporn.com!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/3/4/w780.jpg"
                    },
                    {
                        "episodeNumber": 5,
                        "title": "Episode 5",
                        "airDate": "2022-06-17",
                        "overview": "Did you know chimpanzees are an endangered species largely because of human activity? But you can help by supporting construction costs for Crimson Countess’s Chimp Country! This beautiful refuge for chimpanzees will feature a banana plantation, four daily stunt shows, and a petting zoo! And when you donate, you’ll be entered to win a private video chat with Crimson Countess! Donate today!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/3/5/w780.jpg"
                    },
                    {
                        "episodeNumber": 6,
                        "title": "Episode 6",
                        "airDate": "2022-06-24",
                        "overview": "You’re invited to the 70th Annual Herogasm! You must present this invitation in order to be admitted! Same rules as always: no cameras, no non-Supe guests unless they sign an NDA and they’re DTF, and no telling any news media! It’s BYOD, but food, alcohol and lube will be provided! And please remember to RSVP so we can get an accurate headcount for the caterer!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/3/6/w780.jpg"
                    },
                    {
                        "episodeNumber": 7,
                        "title": "Episode 7",
                        "airDate": "2022-07-01",
                        "overview": "Did someone say birthday? Come celebrate at Buster Beaver’s with our new Deluxe VIP Birthday Package, with seating for up to 30 guests, ten large two-topping pizzas, and ten pitchers of your choice of soda! And of course, a special birthday play starring Buster Beaver and his cast of furry forest friends! All for only $199.99 + tax! Buster Beaver’s Pizza! Where Kids Make the Rules®!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/3/7/w780.jpg"
                    },
                    {
                        "episodeNumber": 8,
                        "title": "Episode 8",
                        "airDate": "2022-07-08",
                        "overview": "Calling all patriots! Let’s show Homelander we’ve got his back and we’re not going to let Starlight and her Starlight House of Horrors get away with trafficking children and drinking their adrenaline! It’s time for real Americans to fight back! Join the Hometeamers and Stormchasers tomorrow at Vought Square! Stand back and stand by!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/3/8/w780.jpg"
                    }
                ]
            },
            {
                "seasonNumber": 4,
                "episodeCount": 8,
                "episodes": [
                    {
                        "episodeNumber": 1,
                        "title": "Episode 1",
                        "airDate": "2024-06-13",
                        "overview": "CALLING ALL PATRIOTS.  BE AT THE COURTHOUSE TOMORROW FOR HOMELANDER’S #VERDICT AND BE READY.  IF THE CORRUPT “JUSTICE” SYSTEM WANTS TO F**K AROUND, THEY’RE GONNA FIND OUT.  #HOMEFREE",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/4/1/w780.jpg"
                    },
                    {
                        "episodeNumber": 2,
                        "title": "Episode 2",
                        "airDate": "2024-06-13",
                        "overview": "Did you know globalists put chemicals in food to make us gay, Dakota Bob is a demon from hell, and the Moon isn’t real? Find out what they don’t want you to know at #TruthCon!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/4/2/w780.jpg"
                    },
                    {
                        "episodeNumber": 3,
                        "title": "Episode 3",
                        "airDate": "2024-06-13",
                        "overview": "This December at VoughtCoin Arena, experience the story of Christmas the way it was meant to be told... on ice! Vought Presents Vought on Ice! Tickets available now at VoughtOnIce.com!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/4/3/w780.jpg"
                    },
                    {
                        "episodeNumber": 4,
                        "title": "Episode 4",
                        "airDate": "2024-06-20",
                        "overview": "Vought News Network is proud to announce its new series #Truthbomb! Join host Firecracker and her celebrity guests for the live 6-hour premiere as they expose Starlight’s Adrenochrome Parties!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/4/4/w780.jpg"
                    },
                    {
                        "episodeNumber": 5,
                        "title": "Episode 5",
                        "airDate": "2024-06-27",
                        "overview": "Attention #superfans! This year at #V52 see A-Train live and in person, as he presents an exclusive sneak peek at his powerful, true-life story: TRAINING A-TRAIN! V52: Powered by fans, for fans!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/4/5/w780.jpg"
                    },
                    {
                        "episodeNumber": 6,
                        "title": "Episode 6",
                        "airDate": "2024-07-04",
                        "overview": "Vernon Correctional Services provides compassionate rehabilitation to those in our care to prepare them for successful community reentry. At Vernon, it’s not about custody. It’s about family.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/4/6/w780.jpg"
                    },
                    {
                        "episodeNumber": 7,
                        "title": "Episode 7",
                        "airDate": "2024-07-11",
                        "overview": "Hey kids! Did you know your neighbor, uncle, or even Mom and Dad might be trying to destroy America? Find out how to stop them on the Avenue V Christmas Special! If you see something, say something!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/4/7/w780.jpg"
                    },
                    {
                        "episodeNumber": 8,
                        "title": "Episode 8",
                        "airDate": "2024-07-18",
                        "overview": "Calling all patriots! We will not allow this stolen election to be certified tomorrow! We must stop Bob Singer’s woke anti-Supe agenda! PREPARE FOR WAR! #WhereWeGoOneWeGoVought",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/4/8/w780.jpg"
                    }
                ]
            },
            {
                "seasonNumber": 5,
                "episodeCount": 8,
                "episodes": [
                    {
                        "episodeNumber": 1,
                        "title": "Episode 1",
                        "airDate": "2026-04-08",
                        "overview": "ATTENTION FREEDOM CAMPERS: ESCAPE ATTEMPTS WILL BE MET WITH DEADLY FORCE. Have a super day!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/5/1/w780.jpg"
                    },
                    {
                        "episodeNumber": 2,
                        "title": "Episode 2",
                        "airDate": "2026-04-08",
                        "overview": "Tonight at 9/8C a @VoughtNews special report: Is your loved one a secret Starlighter terrorist?",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/5/2/w780.jpg"
                    },
                    {
                        "episodeNumber": 3,
                        "title": "Episode 3",
                        "airDate": "2026-04-15",
                        "overview": "Storm her senses with V-Bro Mango Thunder Body Spray by Vought! She'll never know what hit her!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/5/3/w780.jpg"
                    },
                    {
                        "episodeNumber": 4,
                        "title": "Episode 4",
                        "airDate": "2026-04-22",
                        "overview": "IN THIS HOUSE WE BELIEVE IN HOMELANDER!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/5/4/w780.jpg"
                    },
                    {
                        "episodeNumber": 5,
                        "title": "Episode 5",
                        "airDate": "2026-04-29",
                        "overview": "Tonight at 9/8C a @VoughtNews special report: Treason in Tinseltown! Find out which of your favorite Hollywood stars are rumored to be Starlighters!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/5/5/w780.jpg"
                    },
                    {
                        "episodeNumber": 6,
                        "title": "Episode 6",
                        "airDate": "2026-05-06",
                        "overview": "Available now, EXCLUSIVELY at @VMCtheaters, get the new #DeepPopcornBucket for only $32.99!",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/5/6/w780.jpg"
                    },
                    {
                        "episodeNumber": 7,
                        "title": "Episode 7",
                        "airDate": "2026-05-13",
                        "overview": "WARNING: EXERCISE CAUTION WHEN ENTERING SOUNDSTAGE. PERFORMERS MAY BE USING SUPERPOWERS.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/5/7/w780.jpg"
                    },
                    {
                        "episodeNumber": 8,
                        "title": "Episode 8",
                        "airDate": "2026-05-20",
                        "overview": "Easter Sunday. 2PM. Live on @VoughtNews. Bear witness as Homelander reboots the universe.",
                        "thumbnail": "https://episodes.metahub.space/tt1190634/5/8/w780.jpg"
                    }
                ]
            }
        ],
        "watchProviders": [
            {
                "provider": "Netflix",
                "type": "Subscription",
                "url": "https://www.netflix.com/search?q=The%20Boys"
            },
            {
                "provider": "Prime Video",
                "type": "Rent/Buy",
                "url": "https://www.amazon.com/s?k=The%20Boys"
            },
            {
                "provider": "Official Cinema",
                "type": "Theatrical/Legal",
                "url": "https://www.google.com/search?q=The%20Boys%20watch%20online%20official"
            }
        ],
        "servers": [
            {
                "name": "⚡ Fast Cloud Server 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct Fast Server 3",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1790275907990,
        "imdbId": "tt18412256",
        "title": "Alien: Romulus",
        "originalTitle": "Alien: Romulus",
        "category": "hollywood",
        "genre": "horror",
        "quality": "4K UHD",
        "size": "2.6 GB",
        "rating": "7.1",
        "year": "2024",
        "audio": "Multi-Audio",
        "trending": false,
        "type": "movie",
        "poster": "https://images.metahub.space/poster/small/tt18412256/img",
        "backdrop": "https://images.metahub.space/background/medium/tt18412256/img",
        "story": "While scavenging the deep ends of a derelict space station, a group of young space colonists come face to face with the most terrifying life form in the universe.",
        "trailer": "https://www.youtube.com/embed/x0XDEhP4MQs",
        "cast": [
            "Cailee Spaeny",
            "David Jonsson",
            "Archie Renaux"
        ],
        "directors": [
            [
                "Fede Alvarez"
            ]
        ],
        "seasons": [],
        "watchProviders": [
            {
                "provider": "Netflix",
                "type": "Subscription",
                "url": "https://www.netflix.com/search?q=Alien%3A%20Romulus"
            },
            {
                "provider": "Prime Video",
                "type": "Rent/Buy",
                "url": "https://www.amazon.com/s?k=Alien%3A%20Romulus"
            },
            {
                "provider": "Official Cinema",
                "type": "Theatrical/Legal",
                "url": "https://www.google.com/search?q=Alien%3A%20Romulus%20watch%20online%20official"
            }
        ],
        "servers": [
            {
                "name": "⚡ Fast Cloud Server 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct Fast Server 3",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1790275907653,
        "imdbId": "tt9218128",
        "title": "Gladiator II",
        "originalTitle": "Gladiator II",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K UHD",
        "size": "2.6 GB",
        "rating": "6.4",
        "year": "2024",
        "audio": "Multi-Audio",
        "trending": false,
        "type": "movie",
        "poster": "https://images.metahub.space/poster/small/tt9218128/img",
        "backdrop": "https://images.metahub.space/background/medium/tt9218128/img",
        "story": "After his home is conquered by the tyrannical emperors who now lead Rome, Lucius is forced to enter the Colosseum and must look to his past to find strength to return the glory of Rome to its people.",
        "trailer": "https://www.youtube.com/embed/TQwSz88ITAE",
        "cast": [
            "Paul Mescal",
            "Denzel Washington",
            "Pedro Pascal"
        ],
        "directors": [
            [
                "Ridley Scott"
            ]
        ],
        "seasons": [],
        "watchProviders": [
            {
                "provider": "Netflix",
                "type": "Subscription",
                "url": "https://www.netflix.com/search?q=Gladiator%20II"
            },
            {
                "provider": "Prime Video",
                "type": "Rent/Buy",
                "url": "https://www.amazon.com/s?k=Gladiator%20II"
            },
            {
                "provider": "Official Cinema",
                "type": "Theatrical/Legal",
                "url": "https://www.google.com/search?q=Gladiator%20II%20watch%20online%20official"
            }
        ],
        "servers": [
            {
                "name": "⚡ Fast Cloud Server 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct Fast Server 3",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1790275907597,
        "imdbId": "tt6263850",
        "title": "Deadpool & Wolverine",
        "originalTitle": "Deadpool & Wolverine",
        "category": "hollywood",
        "genre": "action",
        "quality": "4K UHD",
        "size": "2.6 GB",
        "rating": "7.5",
        "year": "2024",
        "audio": "Multi-Audio",
        "trending": true,
        "type": "movie",
        "poster": "https://images.metahub.space/poster/small/tt6263850/img",
        "backdrop": "https://images.metahub.space/background/medium/tt6263850/img",
        "story": "Deadpool is offered a place in the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits a variant of Wolverine to save his universe from extinction.",
        "trailer": "https://www.youtube.com/embed/Idh8n5XuYIA",
        "cast": [
            "Ryan Reynolds",
            "Hugh Jackman",
            "Emma Corrin"
        ],
        "directors": [
            [
                "Shawn Levy"
            ]
        ],
        "seasons": [],
        "watchProviders": [
            {
                "provider": "Netflix",
                "type": "Subscription",
                "url": "https://www.netflix.com/search?q=Deadpool%20%26%20Wolverine"
            },
            {
                "provider": "Prime Video",
                "type": "Rent/Buy",
                "url": "https://www.amazon.com/s?k=Deadpool%20%26%20Wolverine"
            },
            {
                "provider": "Official Cinema",
                "type": "Theatrical/Legal",
                "url": "https://www.google.com/search?q=Deadpool%20%26%20Wolverine%20watch%20online%20official"
            }
        ],
        "servers": [
            {
                "name": "⚡ Fast Cloud Server 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct Fast Server 3",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1790275907560,
        "imdbId": "tt6473300",
        "title": "Mirzapur",
        "originalTitle": "Mirzapur",
        "category": "bollywood",
        "genre": "action",
        "quality": "4K UHD",
        "size": "3 Seasons",
        "rating": "8.4",
        "year": "2018",
        "audio": "Multi-Audio",
        "trending": true,
        "type": "series",
        "poster": "https://images.metahub.space/poster/small/tt6473300/img",
        "backdrop": "https://images.metahub.space/background/medium/tt6473300/img",
        "story": "A shocking incident at a wedding procession ignites a series of events entangling the lives of two families in the lawless city of Mirzapur.",
        "trailer": "https://www.youtube.com/embed/33o3s4Vs4Sw",
        "cast": [
            "Ali Fazal",
            "Rasika Dugal",
            "Shweta Tripathi"
        ],
        "directors": [
            []
        ],
        "seasons": [
            {
                "seasonNumber": 1,
                "episodeCount": 10,
                "episodes": [
                    {
                        "episodeNumber": 1,
                        "title": "Episode 1",
                        "airDate": "2024-08-30",
                        "overview": "Full Episode 1 of Season 1",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/0/1/w780.jpg"
                    },
                    {
                        "episodeNumber": 1,
                        "title": "Episode 1",
                        "airDate": "2018-11-15",
                        "overview": "A shocking incident at a wedding procession ignites a series of events entangling the lives of two families in the lawless city of Mirzapur.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/1/1/w780.jpg"
                    },
                    {
                        "episodeNumber": 2,
                        "title": "Episode 2",
                        "airDate": "2018-11-16",
                        "overview": "Guddu and Bablu have a life-altering choice to make. Munna gets a lesson in loyalty. A new, diabolical contender for Mirzapur emerges.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/1/2/w780.jpg"
                    },
                    {
                        "episodeNumber": 3,
                        "title": "Episode 3",
                        "airDate": "2018-11-16",
                        "overview": "A generation-old rivalry is rekindled.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/1/3/w780.jpg"
                    },
                    {
                        "episodeNumber": 4,
                        "title": "Episode 4",
                        "airDate": "2018-11-16",
                        "overview": "Akhandanand tests the boys' moral fibre, leading them down a path of no return. And Sweety must choose between Munna and Guddu.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/1/4/w780.jpg"
                    },
                    {
                        "episodeNumber": 5,
                        "title": "Episode 5",
                        "airDate": "2018-11-16",
                        "overview": "Guddu and Bablu hatch an ambitious plan to increase the gun trade, but for this, both the cops and criminals of Mirzapur must cooperate.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/1/5/w780.jpg"
                    },
                    {
                        "episodeNumber": 6,
                        "title": "Episode 6",
                        "airDate": "2018-11-16",
                        "overview": "A meeting of the mafia heads of Purvanchal masquerading as a Holi party leads to a fracas' that threatens to transform all equations.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/1/6/w780.jpg"
                    },
                    {
                        "episodeNumber": 7,
                        "title": "Episode 7",
                        "airDate": "2018-11-16",
                        "overview": "Guddu and Bablu have come into their own in their private and professional lives as gangsters. But is it time for a rethink?",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/1/7/w780.jpg"
                    },
                    {
                        "episodeNumber": 8,
                        "title": "Episode 8",
                        "airDate": "2018-11-16",
                        "overview": "Tempers reach a head between Guddu and Bablu while they're in exile. And it's time for the Mr. Purvanchal contest.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/1/8/w780.jpg"
                    },
                    {
                        "episodeNumber": 9,
                        "title": "Episode 9",
                        "airDate": "2018-11-16",
                        "overview": "Three generations of Tripathis show the world who they really are.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/1/9/w780.jpg"
                    }
                ]
            },
            {
                "seasonNumber": 2,
                "episodeCount": 10,
                "episodes": [
                    {
                        "episodeNumber": 1,
                        "title": "Episode 1",
                        "airDate": "2020-10-23",
                        "overview": "The Gorakhpur wedding massacre is a thing of the past for Akhandanand Tripathi. His focus is now on the present - the business and conquering larger territory to remain the King of Mirzapur. Everyone who survived that violent night has come out a different person. Despite horrific memories, they know that survival is their only option.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/2/1/w780.jpg"
                    },
                    {
                        "episodeNumber": 2,
                        "title": "Episode 2",
                        "airDate": "2020-10-23",
                        "overview": "The Tripathis, still unaware that Guddu and Golu are alive, continue to form new alliances. Munna impresses Bauji and Akhandanand with the way he has handled a negotiation. Akhandanand helps the Chief Minister of Uttar Pradesh close the wedding massacre chapter. Guddu, Golu and Dimpy who are still in hiding, reunite with a loyal partner and set their sights on Mirzapur.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/2/2/w780.jpg"
                    },
                    {
                        "episodeNumber": 3,
                        "title": "Episode 3",
                        "airDate": "2020-10-23",
                        "overview": "Akhandanand’s woes in the bedroom lead him to the doors of a sexologist. Beena continues to be gripped by the traumatic incident she endured but finds a compelling reason to survive. Guddu has to push himself to think beyond his physical strength while Golu has to learn the ropes of the trade. They make use of Dimpy’s past friendship and end up sending the Tripathis a strong message.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/2/3/w780.jpg"
                    },
                    {
                        "episodeNumber": 4,
                        "title": "Episode 4",
                        "airDate": "2020-10-23",
                        "overview": "Guddu and Golu are still not a threat to Akhandanand, but Munna thinks differently. Akhandanand assigns Munna to take charge of youth canvassing in the state along with the CM’s daughter, Madhuri Yadav. Beena safeguards a big secret. Guddu and Golu’s alliance with Lala begins to affect Akhandanand’s business. Golu decides to get Robin’s expertise. Sharad’s emotions overpower his thought process.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/2/4/w780.jpg"
                    },
                    {
                        "episodeNumber": 5,
                        "title": "Episode 5",
                        "airDate": "2020-10-23",
                        "overview": "Akhandanand reprimands Munna and Sharad for their impulsive actions. Bablu’s diary becomes a key in learning secrets about the Tripathi family for Golu. In order to impress Akhandanand Tripathi, Sharad introduces him and Munna to one of Bihar’s most powerful business family, the Tyagis. A fortunate coincidence triggers an unexpected alliance between parties that have a common goal.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/2/5/w780.jpg"
                    },
                    {
                        "episodeNumber": 6,
                        "title": "Episode 6",
                        "airDate": "2020-10-23",
                        "overview": "There has been a huge setback in the Tripathi family’s business, Akhandanand smells a rat but uses this set back to his advantage. Munna is coerced in to taking a big step in his life which makes the Tripathis’ political alliances stronger. Ramakant is surprised to find an unexpected ally. Golu makes a business proposition to Shatrughan, but it falls through. The elections come to an end.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/2/6/w780.jpg"
                    },
                    {
                        "episodeNumber": 7,
                        "title": "Episode 7",
                        "airDate": "2020-10-23",
                        "overview": "Guddu and Golu are growing from strength to strength, Guddu strives to become the bahubali of Balia. On the personal front, Guddu is getting closer to Shabnam, who asks him to let go of the past. Shatrugan doesn’t have the same influence in his family as his elder brother, a fact that Golu notices and uses to her advantage. The wheels of a Adventuretic political coup are set in to motion.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/2/7/w780.jpg"
                    },
                    {
                        "episodeNumber": 8,
                        "title": "Episode 8",
                        "airDate": "2020-10-23",
                        "overview": "Sharad Shukla and JP Yadav successfully manage to dent Akhandanand’s political aspirations. JP Yadav then calls for a debauche celebration with Zarina in private. After suffering a significant personal loss, Guddu takes upon an unexpected responsibility and Shabnam agrees to help. Golu doesn’t take this too well as she feels Shabnam will come in the way of their larger objective.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/2/8/w780.jpg"
                    },
                    {
                        "episodeNumber": 9,
                        "title": "Episode 9",
                        "airDate": "2020-10-23",
                        "overview": "Beena gives birth to a boy and is worried about the safety of the child. Lala is unhappy with Guddu’s closeness to Shabnam. Golu herself is in immense pain, questions what she has become. Maurya is frustrated with constant setbacks and decides to meet with the IG. Munna takes matters in his own hands when Maqbool’s lies are resurfaced. Loyalties are at stake as a repercussion of Munna’s actions.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/2/9/w780.jpg"
                    },
                    {
                        "episodeNumber": 10,
                        "title": "Episode 10",
                        "airDate": "2020-10-23",
                        "overview": "Beena confronts the horrors of her past, leaving the Tripathi household in chaos. Munna’s new found power through Madhuri leads him to make a drastic confrontation with Akhandanand. Dadda calls for a meeting with Mama, Shatrughan and Bharat. Ramakant is forced to confront his own beliefs. Guddu and Golu assure Beena of the promise they made. Sharad looks to bring his plan to a conclusion.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/2/10/w780.jpg"
                    }
                ]
            },
            {
                "seasonNumber": 3,
                "episodeCount": 10,
                "episodes": [
                    {
                        "episodeNumber": 1,
                        "title": "Episode 1",
                        "airDate": "2024-07-05",
                        "overview": "While Ramakant is tried for the murder of SSP Maurya, Guddu and Golu's claim to the throne is questioned because Kaleen Bhaiya's body is missing. Madhuri vows to fulfill her father's mission of a crime free state.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/3/1/w780.jpg"
                    },
                    {
                        "episodeNumber": 2,
                        "title": "Episode 2",
                        "airDate": "2024-07-05",
                        "overview": "Guddu and Golu kickstart the business again, but are still looking for a supply of opium which would allow them to establish control over Purvanchal's underworld. In the hunt for the same control, Sharad tries to crack a deal with one of Guddu's old allies, while Madhuri tries to eliminate Guddu.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/3/2/w780.jpg"
                    },
                    {
                        "episodeNumber": 3,
                        "title": "Episode 3",
                        "airDate": "2024-07-05",
                        "overview": "Guddu cements his power over Mirzapur while Sharad finally makes a very strong ally. Golu receives a threat from Bharat. Ramakant turns down Robin's offer and faces danger in prison. Meanwhile Madhuri strategises to bring Guddu down in other ways.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/3/3/w780.jpg"
                    },
                    {
                        "episodeNumber": 4,
                        "title": "Episode 4",
                        "airDate": "2024-07-05",
                        "overview": "Ramakant's case is in danger with the appearance of a new witness. In an attempt to save her father's opium business from collapsing, Shabnam turns to Guddu for help. Meanwhile Golu gets some much awaited information about the still missing Kaleen Bhaiya.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/3/4/w780.jpg"
                    },
                    {
                        "episodeNumber": 5,
                        "title": "Episode 5",
                        "airDate": "2024-07-05",
                        "overview": "Golu plans an attack outside Mirzapur without Guddu. Guddu returns from Nepal to find Golu missing. Sharad senses something is amiss in Siwan and decides to shift his most guarded secret to Jaunpur.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/3/5/w780.jpg"
                    },
                    {
                        "episodeNumber": 6,
                        "title": "Episode 6",
                        "airDate": "2024-07-05",
                        "overview": "Purvanchal is set ablaze with a gang war between Sharad and Guddu. Madhuri makes strong decisions to break the police-gangster nexus, while a ghost from the past resurfaces. Ramakant finds a purpose in prison, which catches Lala's attention.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/3/6/w780.jpg"
                    },
                    {
                        "episodeNumber": 7,
                        "title": "Episode 7",
                        "airDate": "2024-07-05",
                        "overview": "Purvanchal is thrown into turmoil following the shocking incident in the jail. Dadda confronts his son, while Sharad and Bharat have a fallout as well. A baithak is called to resolve the gang feud.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/3/7/w780.jpg"
                    },
                    {
                        "episodeNumber": 8,
                        "title": "Episode 8",
                        "airDate": "2024-07-05",
                        "overview": "Guddu goes down a dark downward spiral as he loses people close to him. A new judge is assigned before Ramakant's final hearing. Meanwhile, Saloni discovers her husband's secrets. IG Dubey is reinstated and is tasked with one mission: Capturing Guddu Pandit.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/3/8/w780.jpg"
                    },
                    {
                        "episodeNumber": 9,
                        "title": "Episode 9",
                        "airDate": "2024-07-05",
                        "overview": "Beena is compelled to find safety after the fall of Guddu. Madhuri urges Sharad to let go of the past for a better future. Will Shatrughan be able to convince Saloni to keep his secret? A broken Dimpy wants to take matters into her own hands.",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/3/9/w780.jpg"
                    },
                    {
                        "episodeNumber": 10,
                        "title": "Episode 10",
                        "airDate": "2024-07-05",
                        "overview": "Golu returns to Mirzapur only to discover the chaos that ensued in her absence. Madhuri inaugurates Aam Bagh despite the threat of JP Yadav looming large. As Dussehra closes in, there is only one question: Who will ascend the throne of Mirzapur?",
                        "thumbnail": "https://episodes.metahub.space/tt6473300/3/10/w780.jpg"
                    }
                ]
            }
        ],
        "watchProviders": [
            {
                "provider": "Netflix",
                "type": "Subscription",
                "url": "https://www.netflix.com/search?q=Mirzapur"
            },
            {
                "provider": "Prime Video",
                "type": "Rent/Buy",
                "url": "https://www.amazon.com/s?k=Mirzapur"
            },
            {
                "provider": "Official Cinema",
                "type": "Theatrical/Legal",
                "url": "https://www.google.com/search?q=Mirzapur%20watch%20online%20official"
            }
        ],
        "servers": [
            {
                "name": "⚡ Fast Cloud Server 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct Fast Server 3",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1790275901159,
        "imdbId": "tt26932223",
        "title": "Bhool Bhulaiyaa 3",
        "originalTitle": "Bhool Bhulaiyaa 3",
        "category": "bollywood",
        "genre": "comedy",
        "quality": "4K UHD",
        "size": "2.6 GB",
        "rating": "4.6",
        "year": "2024",
        "audio": "Multi-Audio",
        "trending": false,
        "type": "movie",
        "poster": "https://images.metahub.space/poster/small/tt26932223/img",
        "backdrop": "https://images.metahub.space/background/medium/tt26932223/img",
        "story": "Ruhaan, a fraudster posing as an exorcist, takes on a lucrative case at a haunted castle, unraveling a sinister plot involving mischievous priests, culminating in a hilarious yet thrilling ride filled with unexpected twists and sc...",
        "trailer": "https://www.youtube.com/embed/6YMY62tMLUA",
        "cast": [
            "Kartik Aaryan",
            "Vidya Balan",
            "Madhuri Dixit"
        ],
        "directors": [
            [
                "Anees Bazmee"
            ]
        ],
        "seasons": [],
        "watchProviders": [
            {
                "provider": "Netflix",
                "type": "Subscription",
                "url": "https://www.netflix.com/search?q=Bhool%20Bhulaiyaa%203"
            },
            {
                "provider": "Prime Video",
                "type": "Rent/Buy",
                "url": "https://www.amazon.com/s?k=Bhool%20Bhulaiyaa%203"
            },
            {
                "provider": "Official Cinema",
                "type": "Theatrical/Legal",
                "url": "https://www.google.com/search?q=Bhool%20Bhulaiyaa%203%20watch%20online%20official"
            }
        ],
        "servers": [
            {
                "name": "⚡ Fast Cloud Server 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct Fast Server 3",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1790275900689,
        "imdbId": "tt15327088",
        "title": "Kantara",
        "originalTitle": "Kantara",
        "category": "sandalwood",
        "genre": "action",
        "quality": "4K UHD",
        "size": "2.6 GB",
        "rating": "8.1",
        "year": "2022",
        "audio": "Multi-Audio",
        "trending": true,
        "type": "movie",
        "poster": "https://images.metahub.space/poster/small/tt15327088/img",
        "backdrop": "https://images.metahub.space/background/medium/tt15327088/img",
        "story": "When greed paves the way for betrayal, scheming and murder, a young tribal reluctantly dons the traditions of his ancestors to seek justice.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=Kantara%20official%20trailer",
        "cast": [
            "Rishab Shetty",
            "Kishore Kumar G.",
            "Achyuth Kumar"
        ],
        "directors": [
            [
                "Rishab Shetty"
            ]
        ],
        "seasons": [],
        "watchProviders": [
            {
                "provider": "Netflix",
                "type": "Subscription",
                "url": "https://www.netflix.com/search?q=Kantara"
            },
            {
                "provider": "Prime Video",
                "type": "Rent/Buy",
                "url": "https://www.amazon.com/s?k=Kantara"
            },
            {
                "provider": "Official Cinema",
                "type": "Theatrical/Legal",
                "url": "https://www.google.com/search?q=Kantara%20watch%20online%20official"
            }
        ],
        "servers": [
            {
                "name": "⚡ Fast Cloud Server 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct Fast Server 3",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1790275900311,
        "imdbId": "tt10698680",
        "title": "K.G.F: Chapter 2",
        "originalTitle": "K.G.F: Chapter 2",
        "category": "sandalwood",
        "genre": "action",
        "quality": "4K UHD",
        "size": "2.6 GB",
        "rating": "8.2",
        "year": "2022",
        "audio": "Multi-Audio",
        "trending": true,
        "type": "movie",
        "poster": "https://images.metahub.space/poster/small/tt10698680/img",
        "backdrop": "https://images.metahub.space/background/medium/tt10698680/img",
        "story": "In the blood-soaked Kolar Gold Fields, Rocky's name strikes fear into his foes, while the government sees him as a threat to law and order. Rocky must battle threats from all sides for unchallenged supremacy.",
        "trailer": "https://www.youtube.com/embed/Qah9sSIXJqk",
        "cast": [
            "Yash",
            "Sanjay Dutt",
            "Raveena Tandon"
        ],
        "directors": [
            [
                "Prashanth Neel"
            ]
        ],
        "seasons": [],
        "watchProviders": [
            {
                "provider": "Netflix",
                "type": "Subscription",
                "url": "https://www.netflix.com/search?q=K.G.F%3A%20Chapter%202"
            },
            {
                "provider": "Prime Video",
                "type": "Rent/Buy",
                "url": "https://www.amazon.com/s?k=K.G.F%3A%20Chapter%202"
            },
            {
                "provider": "Official Cinema",
                "type": "Theatrical/Legal",
                "url": "https://www.google.com/search?q=K.G.F%3A%20Chapter%202%20watch%20online%20official"
            }
        ],
        "servers": [
            {
                "name": "⚡ Fast Cloud Server 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct Fast Server 3",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1790275894358,
        "imdbId": "tt27487934",
        "title": "The Greatest of All Time",
        "originalTitle": "The Greatest of All Time",
        "category": "kollywood",
        "genre": "action",
        "quality": "4K UHD",
        "size": "2.6 GB",
        "rating": "5.7",
        "year": "2024",
        "audio": "Multi-Audio",
        "trending": false,
        "type": "movie",
        "poster": "https://images.metahub.space/poster/small/tt27487934/img",
        "backdrop": "https://images.metahub.space/background/medium/tt27487934/img",
        "story": "Gandhi is a hostage negotiator, field agent, and spy working for the Special Anti-Terrorist Squad (SATS). After years of service, he is called back for a critical mission that sets him on a dangerous collision course with his own ...",
        "trailer": "https://www.youtube.com/embed/B5GAjuSnNuQ",
        "cast": [
            "Joseph Vijay",
            "Prashanth",
            "Prabhu Deva"
        ],
        "directors": [
            [
                "Venkat Prabhu"
            ]
        ],
        "seasons": [],
        "watchProviders": [
            {
                "provider": "Netflix",
                "type": "Subscription",
                "url": "https://www.netflix.com/search?q=The%20Greatest%20of%20All%20Time"
            },
            {
                "provider": "Prime Video",
                "type": "Rent/Buy",
                "url": "https://www.amazon.com/s?k=The%20Greatest%20of%20All%20Time"
            },
            {
                "provider": "Official Cinema",
                "type": "Theatrical/Legal",
                "url": "https://www.google.com/search?q=The%20Greatest%20of%20All%20Time%20watch%20online%20official"
            }
        ],
        "servers": [
            {
                "name": "⚡ Fast Cloud Server 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct Fast Server 3",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1790275893316,
        "imdbId": "tt27995595",
        "category": "bollywood",
        "genre": "action",
        "quality": "4K UHD",
        "size": "2.6 GB",
        "rating": "7.8",
        "year": "2024",
        "audio": "Multi-Audio",
        "trending": true,
        "type": "movie",
        "poster": "https://images.metahub.space/poster/medium/tt27995595/img.jpg",
        "story": "Synopsis coming soon.",
        "trailer": "https://www.youtube.com/embed?listType=search&list=undefined%20official%20trailer",
        "cast": [
            "Lead Ensemble"
        ],
        "directors": [],
        "seasons": [],
        "watchProviders": [
            {
                "provider": "Netflix",
                "type": "Subscription",
                "url": "https://www.netflix.com/search?q=undefined"
            },
            {
                "provider": "Prime Video",
                "type": "Rent/Buy",
                "url": "https://www.amazon.com/s?k=undefined"
            },
            {
                "provider": "Official Cinema",
                "type": "Theatrical/Legal",
                "url": "https://www.google.com/search?q=undefined%20watch%20online%20official"
            }
        ],
        "servers": [
            {
                "name": "⚡ Fast Cloud Server 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct Fast Server 3",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1790275890979,
        "imdbId": "tt11858890",
        "title": "The Creator",
        "originalTitle": "The Creator",
        "category": "tollywood",
        "genre": "action",
        "quality": "4K UHD",
        "size": "2.6 GB",
        "rating": "6.7",
        "year": "2023",
        "audio": "Multi-Audio",
        "trending": false,
        "type": "movie",
        "poster": "https://images.metahub.space/poster/small/tt11858890/img",
        "backdrop": "https://images.metahub.space/background/medium/tt11858890/img",
        "story": "Against the backdrop of a war between humans and robots with artificial intelligence, a former soldier finds the robots' secret weapon to end the conflict, an AI in the form of a child.",
        "trailer": "https://www.youtube.com/embed/MAZuGdi32bk",
        "cast": [
            "John David Washington",
            "Madeleine Yuna Voyles",
            "Gemma Chan"
        ],
        "directors": [
            [
                "Gareth Edwards"
            ]
        ],
        "seasons": [],
        "watchProviders": [
            {
                "provider": "Netflix",
                "type": "Subscription",
                "url": "https://www.netflix.com/search?q=The%20Creator"
            },
            {
                "provider": "Prime Video",
                "type": "Rent/Buy",
                "url": "https://www.amazon.com/s?k=The%20Creator"
            },
            {
                "provider": "Official Cinema",
                "type": "Theatrical/Legal",
                "url": "https://www.google.com/search?q=The%20Creator%20watch%20online%20official"
            }
        ],
        "servers": [
            {
                "name": "⚡ Fast Cloud Server 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct Fast Server 3",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1790275890392,
        "imdbId": "tt11663228",
        "title": "Jailer",
        "originalTitle": "Jailer",
        "category": "tollywood",
        "genre": "action",
        "quality": "4K UHD",
        "size": "2.6 GB",
        "rating": "7.2",
        "year": "2023",
        "audio": "Multi-Audio",
        "trending": false,
        "type": "movie",
        "poster": "https://images.metahub.space/poster/small/tt11663228/img",
        "backdrop": "https://images.metahub.space/background/medium/tt11663228/img",
        "story": "A retired jailer goes on a manhunt to find his son's killers. But the road leads him to a familiar, albeit a bit darker place. Can he emerge from this complex situation successfully?",
        "trailer": "https://www.youtube.com/embed/xenOE1Tma0A",
        "cast": [
            "Rajinikanth",
            "Mohanlal",
            "Shivarajkumar"
        ],
        "directors": [
            [
                "Nelson Dilipkumar"
            ]
        ],
        "seasons": [],
        "watchProviders": [
            {
                "provider": "Netflix",
                "type": "Subscription",
                "url": "https://www.netflix.com/search?q=Jailer"
            },
            {
                "provider": "Prime Video",
                "type": "Rent/Buy",
                "url": "https://www.amazon.com/s?k=Jailer"
            },
            {
                "provider": "Official Cinema",
                "type": "Theatrical/Legal",
                "url": "https://www.google.com/search?q=Jailer%20watch%20online%20official"
            }
        ],
        "servers": [
            {
                "name": "⚡ Fast Cloud Server 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct Fast Server 3",
                "url": "https://pixeldrain.com"
            }
        ]
    },
    {
        "id": 1790275886131,
        "imdbId": "tt15242330",
        "title": "The First Slam Dunk",
        "originalTitle": "The First Slam Dunk",
        "category": "anime",
        "genre": "animation",
        "quality": "4K UHD",
        "size": "2.6 GB",
        "rating": "8.0",
        "year": "2022",
        "audio": "Multi-Audio",
        "trending": true,
        "type": "movie",
        "poster": "https://images.metahub.space/poster/small/tt15242330/img",
        "backdrop": "https://images.metahub.space/background/medium/tt15242330/img",
        "story": "Follows 17-year-old Ryota Miyagi, who struggles to accomplish his late elder brother's dream of becoming a basketball star.",
        "trailer": "https://www.youtube.com/embed/E-gGTCru5ZM",
        "cast": [
            "Shugo Nakamura",
            "Jun Kasama",
            "Shinichiro Kamio"
        ],
        "directors": [
            [
                "Takehiko Inoue"
            ]
        ],
        "seasons": [],
        "watchProviders": [
            {
                "provider": "Netflix",
                "type": "Subscription",
                "url": "https://www.netflix.com/search?q=The%20First%20Slam%20Dunk"
            },
            {
                "provider": "Prime Video",
                "type": "Rent/Buy",
                "url": "https://www.amazon.com/s?k=The%20First%20Slam%20Dunk"
            },
            {
                "provider": "Official Cinema",
                "type": "Theatrical/Legal",
                "url": "https://www.google.com/search?q=The%20First%20Slam%20Dunk%20watch%20online%20official"
            }
        ],
        "servers": [
            {
                "name": "⚡ Fast Cloud Server 1",
                "url": "https://drive.google.com"
            },
            {
                "name": "🚀 High-Speed Server 2",
                "url": "https://mega.nz"
            },
            {
                "name": "💾 Direct Fast Server 3",
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
