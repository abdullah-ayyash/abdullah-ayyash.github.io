# 📌 Portfolio Overview

Welcome to my portfolio! This repository showcases my personal projects, skills, and creativity. It is a fast, static site with no build step, written in plain HTML, CSS and JavaScript.

## 🌐 Live Site

[🔗 abdullahayyash.ca](https://abdullahayyash.ca/)

## 🛠 Technologies Used

- HTML5 (semantic markup, structured data)
- CSS3 (one shared stylesheet, no frameworks)
- JavaScript (menu, header behaviour, contact form)
- Formspree (contact form)
- GitHub Pages (hosting, custom domain via `CNAME`)

## 🚀 Features

- Fully responsive design
- Accessible: skip link, keyboard-friendly menu, visible focus, reduced-motion support
- Full SEO setup: meta tags, canonical URLs, Open Graph and Twitter cards, JSON-LD schema, `robots.txt`, `sitemap.xml`
- Complete favicon and app icon set, plus web manifest
- No external icon fonts: icons are an inline SVG sprite (`icons.svg`)

## 🗂 Project structure

| File | Purpose |
| --- | --- |
| `index.html`, `contact.html`, `404.html` | Pages |
| `styles.css` | Shared styles for every page |
| `site.js` | Menu, header, footer year, background effect |
| `contact.js` | Contact form handling |
| `icons.svg` | SVG icon sprite (`<use href="/icons.svg#i-github">`) |
| `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icon-*.png`, `site.webmanifest` | Favicons and app icons |
| `og-image.png` | 1200×630 social share image |
| `robots.txt`, `sitemap.xml` | Crawler files |

## 🔍 When you add a project or page

1. Add the project card in `index.html`.
2. Add a matching entry to the `ItemList` JSON-LD in the `<head>` of `index.html` (same name, description and links as the card).
3. For a new page: set its own `<title>`, description, canonical, Open Graph tags, and add it to `sitemap.xml`.
4. Bump `dateModified` in the JSON-LD and `lastmod` in `sitemap.xml`.

## 💻 Local development

Pages use root-relative paths (`/styles.css`), so serve the folder from its root instead of opening the files directly:

```bash
git clone https://github.com/abdullah-ayyash/abdullah-ayyash.github.io.git
cd abdullah-ayyash.github.io
python3 -m http.server 8000
# open http://localhost:8000
```
