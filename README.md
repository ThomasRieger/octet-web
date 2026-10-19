# octet-web

Website for [Octet](https://github.com/MrTomato77/octet). Next.js, static export.

```sh
pnpm install
pnpm dev        # http://localhost:3000
pnpm test       # the one-line setup parser
pnpm build      # static site in out/
```

```
app/          layout, page (all sections), styles, favicon
components/   the interactive bits: rolling headline IP, tabs, paste demo, copy button
lib/          setup parser (+ test) and site links / release version
public/       app screenshots
```

The release version is fetched from GitHub at build time, so rebuild after each Octet release.
