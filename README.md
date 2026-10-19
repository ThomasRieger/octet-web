# octet-web

Website for [Octet](https://github.com/MrTomato77/octet). Next.js, static export.

```sh
pnpm install
pnpm dev        # http://localhost:3000
pnpm test       # the one-line setup parser
pnpm build      # static site in out/
```

```
app/(en)/     English root layout + page  →  /
app/(th)/     Thai root layout + page     →  /th/
app/          styles, favicon
components/   home (all sections), root (html, fonts, metadata), and the interactive bits:
              rolling headline IP, hero tour deck, paste demo, copy button
lib/          i18n (all copy, EN + TH), setup parser (+ test), site links / release version
public/       app screenshots (WebP)
```

All text lives in `lib/i18n.ts`; the Thai follows the app's own wording.

The release version is fetched from GitHub at build time, so rebuild after each Octet release.
