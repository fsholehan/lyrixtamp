const { searchLyrics, getLyrics } = require("../src");

const cookie = "YOUR_COOKIE_HERE";

(async () => {
  console.log("🔍 Searching for songs...");
  const results = await searchLyrics("Linkin Park Numb", cookie);
  console.log(results);

  if (results.length > 0) {
    console.log("\n🎵 Fetching lyrics...");
    const { href, artist, id } = results[0];
    const lyrics = await getLyrics(href, artist, id, cookie);
    console.log(lyrics);
  }
})();
