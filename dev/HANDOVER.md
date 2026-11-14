# Cung Tường Mộng — handover (from MAIN 493, 11/14/2026 ~01:00 UTC)

Owner: Victoria ("sếp"). Reply to her in Vietnamese only, as "em", short, no questions unless truly needed; she reads on a Samsung Galaxy Z Fold (inner ~1510x2000 portrait, cover ~904x2316). This is her standalone game, NOT Đại Hy (Đại Hy has its own main session; send any Đại Hy word of hers to MAIN 495 session_01Rc5AsLpa5TYV5oV2gBycQy via send_message).

## Where things are
- Live app: https://thientran2711.github.io/cung-tuong-mong/ (GitHub Pages from main /(root); PWA, icon, service worker; app auto-refreshes to the newest build).
- Repo root = the published site (index.html wrapper, img/, audio/, icons/, sw.js, manifest). Do not hand-edit root index.html: it is generated.
- dev/ = source of truth from now on:
  - dev/build/p1.html + j0..j43 + jbal/jkit/jtin modules, concatenated in the order listed in dev/build/assemble.py (later modules patch earlier ones by wrapping functions). `python3 dev/build/assemble.py` writes dev/index.html (no charset; the site wrapper adds it).
  - dev/site/make_site.sh: builds the PWA into the repo root (copies img/audio, writes manifest + sw.js, wraps index with charset/viewport/manifest, title background). It was written for the old scratchpad paths: adapt S/R paths to dev/ before use.
  - dev/art/STYLE_ANCHOR.md + STYLE_REFS.txt: THE art rules (every art agent uses them verbatim).
  - dev/measure/: bot balance harness (inpage4.js, run*.js, an6.py, m43/ for NPC-mind sims).
- Images: img/fig-*.webp (full-body, transparent) + img/por-*.webp (round portraits) listed in img/FIGURES.json (consorts, player looks, emperor, eunuchs), img/FIGURES-servants.json (maids, mamas), img/FIGURES-others.json (thái hậu, officials, physicians, men). Code merges all FIGURES*.json; old faces img/face-*.webp are the fallback. Map: img/map-<season>-<buổi>.webp, img/map-fest-*.webp, img/map-hotspots.json (+festivals table).
- Testing: serve over http with a <meta charset=utf-8> wrapper; Playwright (require('playwright')); sizes 1510x2000, 904x2316, 1024x768, 390x844; no page errors, no horizontal overflow, no truncated text, equal act-card sizes, old save (localStorage hclh-slot / hclh-save-v2-<n>) must still load.

## Workers still running in the OLD session at handover (they finish there, then stop)
- Code integrator: balance final pass (targets below), publishes green builds; will sync scratchpad build → dev/ and push; final commit message contains "HANDOFF COMPLETE".
- Art 1: consorts (32 identities × 8 dress tiers × 4 ages), player looks (4 × 8 tiers × 4 ages + lãnh cung), eunuchs (30 × 4), Emperor (2 × 4) — new early-portrait style.
- Art 2: maids (52) + mamas (8) × 4 ages — owner APPROVED this look (quality bar for all).
- Art 3: thái hậu/officials/physicians/men done; redrawing men in pink/purple (official o5, nhạc sư, check vương gia 2).
- Servant-start module j42: adding maid romance/marriage with palace men.
Until you see a commit with "HANDOFF COMPLETE", do not edit existing dev/build files; put new work in NEW module files (j50+) appended to assemble.py, and pull often.

## Owed / next
1. Balance targets (sensible bot): Hoàng hậu reach 20–35%; dies before HH/old age 50–60%; childbirth ~8–12% per birth, not dominating; random play may die a lot but never in the first 2 weeks without a warning; keep-vs-fire servants within ~10%; affair-heavy dies more than clean road. Last measured: HH 42%, died 45% (v9); final knobs being confirmed.
2. Maid romance/marriage (j42 extension) — integrate when READY.
3. Wire newly drawn figures as they land (picker reads manifests every 5 min); publish batches.
4. Contact sheets to her for approval as each art group completes.

## Her standing rules for this game (all in force)
- One UI kit everywhere; every act shows price + gain/loss numbers (green gain / red cost, risks on a separate red 'kèm' line) + an odds word from the ladder Liều/Khó/Năm ăn năm thua/Khá chắc/Chắc/Rất chắc/Nắm chắc (never %, never 'Chắc chắn'; sure acts show no word); result card after every act; disabled buttons say why; every name has its face; every bar labelled; no truncated text; act cards one size; scene not covered (slim ribbon, collapsible status); map full screen.
- Map: Đại Hy palace overview by season, buổi and festival; named palaces; anonymous silhouettes only ("hữu duyên"), no faces of who is where; unreachable places fully grey with the reason; access by rank and place, 'Lẻn vào' with risk, 'Xin yết kiến'.
- Two-way and equal rules for everyone in a group (every act she can do, others can do to her, same odds/costs); NPCs act by traits, human not optimal (mistakes, wrong beliefs, tells); true information only (never a false report to her; NPCs may hold false beliefs).
- People come to her (visits, gifts, summons) as well as she to them. Four ways to meet: wander the map, visit her palace, scout then go, invite.
- Death is core (reincarnation game); chết là hết: no carry-over; 'Kiếp này' + 'Sổ luân hồi'.
- 13 consorts at start (her + 12), tuyển tú every 3 years, cap ~16; seat caps per rank (HH 1, HQP 1, QP 2, Phi 4, Tần 6); Tranh ghế contest for open seats; push-down schemes; demotion review.
- Stipend ladder 30–320 bạc/month by rank; servant wage; rewards with a Sổ ân thưởng; judgment acts need causes (punishing without cause costs).
- Servant traits hidden, each with upside and downside; Chủ tin (mistress→servant) + Lòng (servant→mistress) on every bond.
- Adults 18+ for every cast member and the player; man–woman only; intimacy fade-to-black; consequences at full weight.
- Art: style = the early consort portraits (semi-realistic, near-3D, soft light), refs consort-01/05/12/18; everyone beautiful/handsome at every age; fair skin; serene faces (no sly, glare, smirk, open laugh, pout, sad/teary, no slanted 'mắt xếch' eyes); faces never reveal personality (personality only via pose/props/colour; Hiểm độc drawn with a gentle persona); 8 dress tiers = 8 ranks; 4 age bands (18–25, 26–35, 36–50, 51+) for everyone; one face per person for life, no reuse within a game; identity pools 1.5–2× group max; nobody looks poor (maids in embroidered silk with hairpins); men never wear pink or purple; her own figure appears only in her own palace.
- Seasonal UI theme; festivals; emotion voice sounds (Giọng slider).
