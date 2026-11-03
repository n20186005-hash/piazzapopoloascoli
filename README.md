# Piazza del Popolo, Ascoli Piceno

Independent visitor guide in Italian, English, French and Traditional Chinese.
Every locale uses an explicit URL prefix (`/it`, `/en`, `/fr`, `/zh-hant`).

## Development

Run `npm ci`, then `npm run dev`. Fonts and the existing gallery photographs are served locally.

## Cloudflare build

The production pipeline runs these commands in this order:

```sh
npm ci
npm run build
npx wrangler deploy
```

`npm run build` creates the Next.js production output. Wrangler's configured custom build then runs the pinned OpenNext adapter with `--skipNextBuild` to package that output. Running the deploy command alone after source changes is insufficient: always run the Next.js build first. To validate packaging without publishing, use `npx wrangler deploy --dry-run` after the build. `npx wrangler dev` serves the native local Worker runtime.

The checked-in configuration uses the existing ASSETS, IMAGES and WORKER_SELF_REFERENCE bindings. It does not create an R2 bucket. Static requests run through the Worker so canonical host redirects precede asset handling. No domains or security settings are managed by this repository.

## Editorial notes

Guides link to municipal, national tourism and reconstruction sources. Public opening information for the outdoor square does not establish access to building interiors. Existing gallery photographs are retained; source, licence and scene identity remain subject to verification. Captions describe visible subjects without asserting a verified location or author.
