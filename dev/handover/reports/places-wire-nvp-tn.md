# places-wire-nvp-tn (worker session_01964izBkKhrTs2P14hVfJc1, depth 1, START_CTX 0%)
PRIORITY #1 CHECK ('places-wire nvp tu-ninh-cung-ngu'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 — source PLACES2.md lines 71-77.
SẴN SÀNG KIỂM 56479bcf (branch review/places-wire-nvp-tn; assembled index.html/sw.js included in the commit)

## What changed (code hook-up only, no art)
- NEW dev/build/jplw.js (assembled before jend.js), j11.js (smoke effect also for sc "tnn"), jact.js (nvp place sc "ksp" -> "nvp"), assemble.py (+jplw.js).
- Reuses the existing path: SCIMG + j94 sceneImg/SCN_HAVE/scnSync + KIT_FLOOR/KIT_FANCHOR. No private loader.
- Scene keys: SCIMG.nvp="nvp" (live img/nvp-ha-sang.webp), SCIMG.tnn="tu-ninh-cung-ngu" (live img/tu-ninh-cung-ngu-ha-sang.webp).

## Findings
- Live nvp-v4-* (img/nvp-v4-*, raw + 16 variants) were never referenced by index.html (only dev/ test sheets); NOT used. Nội vụ phủ place was a stand-in: placeOf nvp sc "ksp" (Kính sự phòng picture).
- Nội vụ phủ call sites (all go through placeOf("nvp").sc): stage (renderStage j6 + pxScene j11), event art (evArt j17), Dư đồ tiles (j9), place notice (jnotice), jplace card, jmen menArt, jstagehere chip. srvMerit / «Nội vụ phủ» giver lines draw on the same place scene. All now read SCIMG.nvp.
- Từ Ninh bedroom: place "tn" has no separate bedroom place. Thái hậu sleeps at tn in buổi tối (j95planTH c=3 "sleep"; errand «Hầu Thái hậu một đêm» j72:335 at B4L). Rule: placeOf("tn") at S.buoi===B4L returns sc "tnn" (bedroom); by day it stays "tn" (reception). Call sites = same list as above for place "tn" at night (stage, event art, tiles, notice, card).

## Fallback (no broken image / blank frame)
sceneImg wrapper: if no live variant is registered for the season/buổi, the base key resolves to the CURRENT picture with its own season set (nvp -> kinh-su-phong-<mùa>-<buổi>; tu-ninh-cung-ngu -> tu-ninh-cung-<…>). A one-time silent Image probe of img/nvp-ha-sang.webp / img/tu-ninh-cung-ngu-ha-sang.webp registers SCN_HAVE when the file exists, so Foreman C's swap needs NO code change. Floor/anchor = fallback place's (KIT_FLOOR .66, KIT_FANCHOR by scene base name). Same variant rule: only hạ-sáng (j94 near-buổi order sang,trua,chieu; tối takes tối only).
- Cost: until the files are live each start makes 2 tiny 404 requests (harmless; one-time).

## OPEN FOR D / MAIN (decision needed)
Bedroom = night only, but the new picture is hạ-SÁNG only and j94's rule gives tối only tối pictures. So today the bedroom picture can NEVER show (night falls back to the reception's hạ-tối). Options: (a) Foreman C paints tu-ninh-cung-ngu tối variants (rule-faithful); (b) owner OK to use the hạ-sáng bedroom at night as stand-in (one-line change in jplw sceneImg wrapper). Not done without an owner word (law 16). Nội vụ phủ has no such issue (daytime place).

## Gates
- build (assemble.py + build_site.sh): OK. quickcheck 56479bcf: PASS (open 11.4 s, old save loads, 0 errors, core gates, time-spill guard, perf render 317/265 ms new/live).
- coop-e2e x1: 129/129 passed.
- SCIMG state tests on built root (Fold 755x1000@2 + iPad 1180x820@2, 14 runs: nvp hạ-sáng live/fallback, nvp đông-tối, tn day/night live/fallback): scimg names as designed (nvp-ha-sang when live; kinh-su-phong-ha-sang / -dong-toi fallback; tn day tu-ninh-cung-ha-sang; tn night sc tnn -> tu-ninh-cung-ha-toi), 0 page errors, no broken scene image (404 only the two probes while not live). "Live" simulated by routing the review-folder pictures into the live names (stand-ins, nothing uploaded). Shots looked (Fold nvp live: new shop picture fills the frame, figures + chips on kit; iPad nvp fallback: Kính sự phòng picture; iPad tn night fallback: Đức Thọ reception). Shots are in the worker scratchpad, not in git.
- Not run: dev/test/scene-pic-scan.js (its page closed in this box before finishing), scene-seasons/place-stage-scan full sweeps (long); my own scene check above covers the new keys.

## HANDOVER: none needed (ctx low); work complete.
~100% xong (code) / chờ C thay file + quyết định buồng ngủ ban đêm.
