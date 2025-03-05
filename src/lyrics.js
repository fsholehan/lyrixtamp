const axios = require("axios");
const cheerio = require("cheerio");
const { defaultHeaders } = require("./config");

/**
 * Mengambil lirik lagu dari Lyricsify berdasarkan URL
 * @param {string} href - Path utama ('lyrics')
 * @param {string} artist - Nama artis
 * @param {string} song - Judul lagu
 * @param {string} [cookie] - Cookie opsional
 * @returns {Promise<Object>}
 */
async function getLyrics(href, artist, song, cookie = "") {
  const url = `https://www.lyricsify.com/${href}/${artist}/${song}`;
  const config = { headers: { ...defaultHeaders, Cookie: cookie } };

  try {
    const { data } = await axios.get(url, config);
    const $ = cheerio.load(data);

    const lyricsElement = $('[id*="lyrics_"]').first();
    const lyricsText = lyricsElement.text();

    const lyricsArray = lyricsText
      .split("\n")
      .map((line) => {
        const timestampMatch = line.match(/\[(\d{2}:\d{2}\.\d{2})\]/);
        const text = line.replace(/\[.*?\]/g, "").trim();

        if (timestampMatch) {
          return { timestamp: timestampMatch[1], lyric: text };
        }
        return null;
      })
      .filter((entry) => entry !== null);

    return {
      artist: lyricsText.match(/\[ar: (.*?)\]/)?.[1]?.trim() || artist,
      title: lyricsText.match(/\[ti: (.*?)\]/)?.[1]?.trim() || song,
      lyrics: lyricsArray,
    };
  } catch (error) {
    console.error("Error scraping lyrics:", error.message);
    return { error: "Failed to fetch lyrics." };
  }
}

module.exports = getLyrics;
