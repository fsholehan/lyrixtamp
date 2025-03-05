const axios = require("axios");
const cheerio = require("cheerio");
const { defaultHeaders } = require("./config");

/**
 * Mencari lagu berdasarkan query di Lyricsify
 * @param {string} query - Kata kunci pencarian
 * @param {string} [cookie] - Cookie opsional
 * @returns {Promise<Array>}
 */
async function searchLyrics(query, cookie = "") {
  const config = { headers: { ...defaultHeaders, Cookie: cookie } };

  try {
    const { data } = await axios.get(
      `https://www.lyricsify.com/search?q=${query}`,
      config
    );
    const $ = cheerio.load(data);

    const results = [];
    $(".row .li").each((_, element) => {
      const title = $(element).find(".title").text().trim();
      const href = $(element).find(".title").attr("href");

      if (title && href) {
        const partsPath = href.split("/").filter(Boolean);
        results.push({
          href: partsPath[0],
          artist: partsPath[1],
          id: partsPath[2],
          title,
        });
      }
    });

    return results;
  } catch (error) {
    console.error("Error fetching lyrics search results:", error);
    return [];
  }
}

module.exports = searchLyrics;
