const fs = require("fs");
const Parser = require("rss-parser");
const parser = new Parser();
const rssData = require("./rss");

(async () => {
  let jsonFeed = [];
  for (let i = 0; i < rssData.rss.length; i++) {
    const feed = await parser.parseURL(rssData.rss[i].url);
    const items = feed.items.map((data) => {
      return {
        siteName: rssData.rss[i].name,
        title: data.title,
        pubDate: data.pubDate,
        author: data.author,
        link: data.link,
      };
    });
    jsonFeed.push(items);
  }
  fs.writeFileSync("data.json", JSON.stringify(jsonFeed));
})();
