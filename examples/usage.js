const { searchLyrics, getLyrics } = require("lyrixtamp");

const cookie = "YOUR_COOKIE_HERE";

(async () => {
  const results = await searchLyrics("Coldplay Yellow", cookie);
  console.log(results);

  if (results.length > 0) {
    const { href, artist, id } = results[0];
    const lyrics = await getLyrics(href, artist, id, cookie);
    console.log(lyrics);
  }
})();
