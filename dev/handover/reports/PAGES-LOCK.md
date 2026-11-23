# PAGES-LOCK report

PRIORITY #1 CHECK: OD 0 prior Pages/privacy rulings | main: no Pages workflow (site = branch deploy of root) | review/*: none before this | claims: MAIN 109 order.

Branch `review/pages-lock`, commit f7016b8d03a1ab1171528123d81fd94a069d6c38 (off origin/main 2ba6c64e). Not pushed to main, no PR, no repo settings changed.

## Allowlist (what the running game fetches from the site origin)
Evidence: static grep of built index.html + sw.js + assets.json, then a live run (`dev/test/pages-lock-proof.js`) against a site containing ONLY the allowlist, served under `/cung-tuong-mong/`, service worker ON.
Same-origin 200s seen: `index.html`, `sw.js`, `assets.json`, `manifest.webmanifest`, `audio/MANIFEST.json`, `audio/VOICES.json`, `audio/*.mp3` (97 seen of 129 in assets.json), `icons/*.png` (6), `dev/vendor/pixi-8.5.2.min.js`, `robots.txt` (new).
- `dev/vendor/pixi-8.5.2.min.js` is the ONE file under dev/ the game needs (j11.js PIXI_SRC, listed in assets.json group fig). Allowlist exactly that file, never the dev/ folder.
- Pictures (all `img/`, all `img/*.json` manifests, KCMAP maps) come from the Cloudflare CDN (ctm-img...workers.dev), not the site. No same-origin `img/`, `cdn/`, `coop/`, `rank/`, `docs/` request exists (grep: 0 hits). Co-op = ctm-coop worker, rank = ctm-rank worker (other origins).
- Other origins touched: Google Fonts, ctm-img, ctm-rank workers (unchanged by this work).
Final allowlist (enforced by guard in `dev/site/pages_stage.sh`, which fails if any other file is staged):
`index.html sw.js assets.json manifest.webmanifest .nojekyll robots.txt audio/*.mp3 audio/MANIFEST.json audio/VOICES.json icons/*.png dev/vendor/pixi-8.5.2.min.js` = 144 files, 25 MB.

## Proof (all PASS, `node dev/test/pages-lock-proof.js <staged dir>`)
cold start with SW active; old save (.out/oldsave.json, v6) loads (year 1 month 3); 4 turns via endTurn; Pixi loads from site; mini-game list (39 kinds) opens; second open; offline reload served by SW; manifest + 4 icons + robots.txt 200; CLAUDE.md, AGENTS.md, README.md, dev/OWNER_DECISIONS.md, dev/build/jbal.js, dev/kit/KIT.md, docs/, coop/ worker source, .github, .mgport all 404; 0 unexpected 404; every served path on allowlist; 0 page errors.
Gaps, honestly: the co-op lobby button was not found by the text probe, so lobby/co-op WebSocket and a real mini-game round were not played; they are covered by static grep (no same-origin path) and by the fact co-op/CDN are other origins. There is no file named "quickcheck" in the repo; the proof script above is the check. Not tested on real devices/iPad.

## Changes
1. `.github/workflows/pages.yml`: on push to main (paths limited to the allowlist files) + workflow_dispatch; permissions contents read, pages write, id-token write; concurrency group `pages`; stages with `dev/site/pages_stage.sh _site`, configure-pages, upload-pages-artifact@v3, deploy-pages@v4. ~1 min per run.
2. `dev/site/pages_stage.sh` (allowlist + guard), `dev/site/robots.txt` (Disallow / for * and GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, Google-Extended, Applebot-Extended, CCBot, PerplexityBot, Bytespider, Amazonbot, meta-externalagent, cohere-ai, Diffbot and more).
3. `dev/site/build_site.sh` head template now has `<meta name="robots" content="noindex,nofollow,noarchive,noai,noimageai">`; index.html + sw.js rebuilt with it (assets.json unchanged).

## EXACT owner steps (MAIN translates to Vietnamese)
Order matters: merge to main first, then:
a. Repo Settings -> Pages -> Build and deployment -> Source: **GitHub Actions**. (Until this is set the workflow cannot deploy.)
b. Actions tab -> "Deploy game to Pages" -> Run workflow (main), wait for green. Open https://thientran2711.github.io/cung-tuong-mong/ and check the game loads and https://thientran2711.github.io/cung-tuong-mong/CLAUDE.md is 404.
c. Settings -> General -> Danger Zone -> Change visibility -> **Private** (only after b).
Caveats to tell her: a Pages site of a private repo is still PUBLIC to anyone with the URL on Pro (no login). The game itself (index.html is the whole client code, plus assets.json listing every picture path, and the CDN pictures at ctm-img...workers.dev) stays downloadable by anyone with the link; robots/noai only stops polite crawlers, it does not stop copying. Only dev/ design docs, rules, tests and worker source become unreachable.

## Actions minutes on a private repo (Pro = 3000 min/month, Linux runners 1x)
- pages.yml: ~1 min per main push that touches game files (new, small).
- coop-worker / img-worker / rank-worker: push to main with path filter on their own folder + dispatch; short deploys (~1 min), rare. Keep as is.
- perf.yml: push to main AND every `review/**` push (paths-ignore only md/handover/progress), builds site + Playwright + perf at two profiles, timeout 75 min. With many workers pushing review branches this alone can burn the 3000 min. Recommendation: make it `workflow_dispatch` + push to main only (drop `review/**`), or dispatch-only and run before merging. Not changed here (owner/MAIN decision).
