# Noa Jablon · Portfolio

Static site built from the Figma file (page "Final Format") and published with GitHub Pages at
https://noajablon.github.io/portfolio/

## Pages
`index.html` (scroll intro), `portfolio.html`, `about.html`, `work-with-me.html`, and one page per project.

## Editing
- Page markup comes from `src/fragments/*.html` (converted from Figma with `tools/figma2html.mjs`).
- Behaviour (hovers, scroll intro, page fades, sound buttons, To Top, contact form) lives in `src/js/site.js`.
- Styles live in `src/input.css` (Tailwind v4).
- Rebuild everything with `python3 tools/build.py` (needs `beautifulsoup4` and the Tailwind standalone CLI at `~/bin/tailwindcss` or `$TAILWIND`).

## Videos
Drop new videos into `assets/video/` as H.264 `.mp4` and map them to their Figma slot in `MEDIA` inside `tools/build.py`.
