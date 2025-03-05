# lyrixtamp

A simple Node.js package for fetching song lyrics from **Lyricsify**.

## 🚀 Features

- Search for songs and retrieve their lyrics
- Structured JSON output
- Supports **custom cookies** for better request handling
- Lightweight and easy to use

## 📦 Installation

Install via npm:

```sh
npm install lyrixtamp
```

## 🔧 Usage

### 1️⃣ Import the package

```javascript
const { searchLyrics, getLyrics } = require("lyrixtamp");
```

### 2️⃣ Search for a song

```javascript
(async () => {
  const results = await searchLyrics("Linkin Park Numb", "YOUR_COOKIE_HERE");
  console.log(results);
})();
```

#### Sample Output:

```json
[
  {
    "href": "lyrics",
    "artist": "linkin-park",
    "id": "numb",
    "title": "Numb - Linkin Park"
  }
]
```

### 3️⃣ Get lyrics for a song

```javascript
(async () => {
  const lyrics = await getLyrics(
    "lyrics",
    "linkin-park",
    "numb",
    "YOUR_COOKIE_HERE"
  );
  console.log(lyrics);
})();
```

#### Sample Output:

```json
{
  "artist": "Linkin Park",
  "title": "Numb",
  "lyrics": [
    {
      "timestamp": "00:05.00",
      "lyric": "I'm tired of being what you want me to be"
    },
    {
      "timestamp": "00:10.00",
      "lyric": "Feeling so faithless, lost under the surface"
    }
  ]
}
```

## 🛠 Configuration

The package allows passing cookies for authentication and request handling.

```javascript
const cookie = "YOUR_COOKIE_HERE";
searchLyrics("Coldplay Yellow", cookie).then(console.log);
getLyrics("lyrics", "coldplay", "yellow", cookie).then(console.log);
```

## 🍪 Getting Cookies

To use this package effectively, you need to retrieve cookies from your browser. Here's how:

1. Open **Google Chrome** (or any modern browser) and go to [Lyricsify](https://www.lyricsify.com/).
2. Press `F12` or right-click and select **Inspect** to open Developer Tools.
3. Go to the **Network** tab and search for any request to `lyricsify.com`.
4. Click on a request and go to the **Headers** section.
5. Scroll down to the **Cookies** section and copy the `Cookie` header value.
6. Use this value as `YOUR_COOKIE_HERE` in the examples above.

## ⚡ Notes

- **Cookie is required** for stable scraping.
- Use proper error handling when fetching data.

- **Cookie is required** for stable scraping.
- Use proper error handling when fetching data.

## 📜 License

MIT License. Free to use and modify.
