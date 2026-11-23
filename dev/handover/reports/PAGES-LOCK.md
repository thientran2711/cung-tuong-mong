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

## REVIEW (small reviewer, 23/11, review/pages-lock @f7016b8d03a1ab1171528123d81fd94a069d6c38)
PRIORITY #1 CHECK: OD pages-lock ruling 23/11 ~15:45Z | main: no Pages workflow | review/*: pages-lock only | claims: MAIN 109 order.

**VERDICT: PASS** (f7016b8d03a1ab1171528123d81fd94a069d6c38). Branch sits directly on current origin/main 2ba6c64e (merge-base = main tip) so it merges clean today; index.html/sw.js are generated, so if main moves first the coordinator must rebuild them (build_site.sh), not hand-merge.

1. Allowlist completeness (staged _site with dev/site/pages_stage.sh = 144 files, 25 MB; served under /cung-tuong-mong/ like Pages; my own script, real ctm-coop + ctm-img workers through the proxy):
 - Fresh profiles A (755x1000) and B (1180x820) boot, co-op lobby path: A COOP.create() → room, B COOP.join(room) → both `open`, each sees the other online over the real WebSocket. PASS.
 - 8 mini-game kinds opened via mgCalRun (of 39) with no error on the site (the only "ERR" lines were my probe touching S.mg on a fresh profile, not the game). Old save (.out/oldsave.json, v6) loads in a fresh profile, 3 endTurn OK. 0 page errors.
 - SW update path: installed the PREVIOUS main build (shell 091e2c4152a7) on the site, swapped the site to the new build, registration.update(): caches became ctm-assets + ctm-shell-3e9088f91727, old shell dropped, localStorage kept, page reload = new build (robots meta present), 0 errors.
 - Every same-origin request logged: index.html, sw.js, assets.json, manifest.webmanifest, audio/MANIFEST.json, audio/VOICES.json, audio/*.mp3, 6 icons, dev/vendor/pixi-8.5.2.min.js. **0 × 404** in all phases.
 - Static cross-check: assets.json lists 32201 files = 32065 `img/` (resolved to the CDN, never same-origin), 129 audio, 6 icons, 1 dev (pixi) → all 129 mp3 + 6 icons + pixi are in the stage. Source grep of fetch/src/href shows only CDN URLs, `audio/…mp3`, `audio/VOICES.json`, `assets.json`; no coop/, rank/, cdn/, docs/ same-origin path (those are other origins). Manifest icons all staged.
2. Leak check: stage contains nothing else (find shows only the allowlist); CLAUDE.md, AGENTS.md, README.md, dev/OWNER_DECISIONS.md, dev/ITEMS.md, dev/build/jbal.js, docs/, coop/, rank/, cdn/, .github/ all absent → 404 (worker's proof also fetched them over HTTP: 404). Only dev/vendor/pixi-8.5.2.min.js under dev/. The guard in pages_stage.sh fails the job if anything else is staged.
3. pages.yml: triggers push main (path-filtered to the allowlist files + the workflow + stage script) + workflow_dispatch; permissions contents:read, pages:write, id-token:write; concurrency group pages (no cancel); checkout@v4, configure-pages@v5, upload-pages-artifact@v3, deploy-pages@v4 (all existing majors); environment github-pages. Nothing in it depends on repo visibility; on a private repo it deploys the same way (needs Pro/Team plan and Settings → Pages → Source = GitHub Actions). sw.js bump safe (V = content hash; reproduced: build_site.sh rebuild gives the same shell 3e9088f91727, only the CTM_BI stamp line differs). The noindex/noai meta is in the SOURCE template (build_site.sh head printf, which every land/perf build runs), not only in the built index.html; assemble.py still runs clean.

Non-blocking notes for MAIN:
 - Crawlers read robots.txt only at the host root (thientran2711.github.io/robots.txt), which a project site cannot serve; the `<meta name=robots noindex,noai>` in index.html is the effective tag, robots.txt under /cung-tuong-mong/ is cosmetic. The real protection is the allowlist (dev/docs/tests 404), not the tags.
 - A Pages site from a private repo is public by URL on Pro; index.html and the CDN pictures stay copyable by anyone with the link (worker caveat stands).
 - The proof script's lobby probe found no button (it only logs); I covered the lobby with COOP.create/join on the real worker instead. Not tested on real iPad/Fold hardware.
 - perf.yml still runs on every `review/**` push (not touched, as ordered): owner/MAIN call on Actions minutes.
 - The path filter means a main push that only changes other files does not redeploy; fine since only allowlisted files reach the site.
