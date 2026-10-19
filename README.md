# octet-web

Website for [Octet](https://github.com/MrTomato77/octet). Next.js, static export.

```sh
pnpm install
pnpm dev        # http://localhost:3000
pnpm test       # the one-line setup parser
pnpm build      # static site in out/
```

```
app/          layout (fonts, metadata, language pick before paint), page, styles, favicon
components/   home (all sections + EN/TH switch), and the interactive bits:
              rolling headline IP, hero tour deck, paste demo, copy button
lib/          i18n (all copy, EN + TH), setup parser (+ test), site links / release version
public/       app screenshots (WebP)
```

All text lives in `lib/i18n.ts`; the Thai follows the app's own wording. The language switches in place
(no reload), is remembered in `localStorage`, and defaults to Thai for Thai browsers.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`, by hand
(Actions → deploy → Run workflow), and whenever an Octet release is published: the octet repo sends an
`octet-release` dispatch, so the version shown on the site updates by itself. Download links always point
at `releases/latest`, so they never need a rebuild.
