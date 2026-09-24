const fs = require("fs");

const baseUrl = "https://subbhu7077.github.io/movies-site/";
const today = new Date().toISOString().split("T")[0];

let staticPages = [
    { loc: "", priority: "1.0", changefreq: "daily" },
    { loc: "privacy.html", priority: "0.5", changefreq: "monthly" },
    { loc: "terms.html", priority: "0.5", changefreq: "monthly" },
    { loc: "dmca.html", priority: "0.6", changefreq: "monthly" },
    { loc: "contact.html", priority: "0.7", changefreq: "weekly" }
];

let scriptContent = fs.readFileSync("script.js", "utf8");
let moviesMatch = scriptContent.match(/let movies = (\[[\s\S]*?\]);/);

let movieLinks = [];
if (moviesMatch) {
    try {
        let movies = JSON.parse(moviesMatch[1]);
        movieLinks = movies.map(m => ({
            loc: `?id=${m.id}`,
            priority: "0.9",
            changefreq: "weekly"
        }));
    } catch (e) {
        console.log("Could not parse movies for sitemap deep links, using static pages.");
    }
}

let sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

staticPages.concat(movieLinks).forEach(item => {
    sitemapXML += `  <url>
    <loc>${baseUrl}${item.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>\n`;
});

sitemapXML += `</urlset>`;

fs.writeFileSync("sitemap.xml", sitemapXML);
console.log(`✅ sitemap.xml generated with ${staticPages.length + movieLinks.length} global index URLs!`);
