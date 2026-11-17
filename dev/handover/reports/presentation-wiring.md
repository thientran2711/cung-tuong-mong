# presentation-wiring (sonnet worker, main s28) — PARTIAL, handover below
Branch review/presentation-wiring · sha b0b972b97 (base origin/main 7abaf07ac) · session_01UV1SziPP4d9141LvjeJ4wM · START_CTX ~3% (get_session reads 0; own estimate) → roll at 28%, ceiling 60%.
STATUS: code + kit part + tests PUSHED; entrance animation / origin frames / group voices NOT done (ART REQUEST below); VISUAL CHECK of the figure animations NOT done (see Blockers). ~65% xong / ~50% chơi được (animations hook in code and pass the logic test; not yet looked at on a live stage).

## What was built (kit first: I am the keeper for the missing part)
- NEW KIT PART `kitFigFx(kind, who, o)` = KIT §68.8 (dev/build/jfxkit.js, KIT.md §68.8, kit page sample §68.8): the one place that animates a stage figure. Kinds flush (slap), poison (tint green → blur), grey (demote / cold palace), die (ghost greys, sinks, fades + silk sheet), drag (ghost dragged off), out (leaves the stage), in (slides in), glow (rim light only, person-safe §68.7). Ghost copies for terminal kinds (a re-render cannot cut them). Pace kitPace. Gọn / reduced motion / bot / hidden figure = nothing. Helpers kfkFigEl (accepts stage wrapper .ref), kfkSnap, kfkSeen; `kitFxSheet(..,{reverse:true})`.
- jpres.js PEOPLE MOMENTS: table KPM + `kpmGo(moment, person, second)`; hooks: ACT[k].f for 19 actions (success text only), kill/deathSentence/dieIf, punish/fall/slapGive/birthP, renderStage (figure that left the stage fades out), render state scan (pregnancy announced, rank up/down, cold palace of NPCs on the stage). Her own moments stay j93 scenes / j11 feedback.
## The 13 approved animations + S3-205 list — before / after
| # | moment (OD:L610 / L722-738) | before | after |
|---|---|---|---|
| 1 | people slide in | LIVE (j11 tokAnim .enter) | unchanged |
| 1b | people fade out of the stage | missing | kitFigFx out via renderStage (same place only) |
| 2 | promotion (her) | LIVE j93 kitEdict + kitFx promote | unchanged; NPC rise = gold rim + petals (state scan) |
| 3 | demotion / cold palace (her) | LIVE j93 kitGloom | unchanged; NPC = figure greys (state scan) |
| 4 | dragged away for punishment | missing | punish(NPC, sev>=2) / fall(NPC) → drag |
| 5 | slapped / scolded | her only (feedback hit) | slapGive + ACT tat/phatquy + punish(NPC) → flush on the figure |
| 6 | death | her only (j93 inkov + kitFx death) | kill / deathSentence / dieIf (NPC) → die (ghost + silk) |
| 7 | pregnancy announced | her only (j93 bloom) | NPC: state scan → pink rim + lotus petals |
| 8 | birth | her only | birthP(NPC) → rim + lotus petals + lotuslight; baby sprite = ART REQUEST |
| 9 | favoured | LIVE kitFx favour (nightFx) | unchanged; kpmGo favour available |
| 10 | poisoned | her edge only (j11) | ACT poison/kpoison/slowpoison/pgift → figure tint+blur (+ edge for her) |
| 11 | alliance / betrayal | thread sheet existed, unwired | ACT ally/xinhh → thread (reversed = joins), banphe → snaps |
| S3-205 harm / poison / rumour / seal | kinds existed, not wired | harm: ACT pond/pushp/trip/huydung/thathu/phonghoa; rumour: rumor/lygian/frame/kframe; seal: NOT wired (no single result hook found; resultShow already does win/fail/expose; contest-ui + promo-exam stamp = TODO) |
## Tests
- `node dev/test/presentation-people.js <url> <out> [--shots] 755x1000@2 1180x820@2`: per size 0 page errors, every moment returns through the kit, no ghost left, Gọn animates nothing, hooks (death via dieIf, out via kpmOutCheck, preg via state scan, rumour + tat via forced-success ACT), perf max frame gap 17–26 ms, no overflow: ok:true at 755x1000@2 and 1180x820@2 (local build, LOCAL art only). NOTE: those runs used hidden/undecoded stage figures (see Blockers), so they prove the wiring + cleanup, not the look.
- quickcheck on b0b972b97: PASS · 132 s · open 917 ms · old save ok · perf median of 3 new/live: render 251/237 ms, tab 331/316 ms, buổi 932/979 ms (perf gate +5 %: met, −4.8 %) · core gates PASS · time-spill PASS.
## Blockers / what the successor must do
1. VISUAL CHECK (owner rule: look at every shot): the stage tokens stay `.j59wait` (visibility hidden, stacked) until every figure body is measured; with a local partial art pull nothing is visible, and the roulette overlay `#kroul` re-opens after removal. Do it with the default CTM_IMG_BASE (CDN, ~20 s to load) and click the roulette "Tiếp" via the page, or on the coordinator's full-art box; take Fold 755x1000@2 + iPad 1180x820@2 shots of slap, poison, die, drag, preg, join and LOOK. Tune the filter strengths in kitFigFx if they read wrong (all in KFK_FIG / kitFigFx). The same test `--shots` mode takes them.
2. S3-152 entrance animation (edict scroll) + 9 origin frames; S3-181 frame art per group/main/side; S3-180 group voices. Not started (budget). Needs: kit part for the entrance (an `kitEdictOpen` unroll using the painted edict from j93 kitEdict) and the 9 origin frame arts (ART REQUEST A1).
3. seal moment wiring (contest result + promo-exam stamp → kitFx seal at the stamp element).
4. Perf gate: met by the quickcheck smoke (buổi 932 vs 979 ms); re-measure after the entrance animation lands.
## ART REQUESTS (do not draw; placeholder in code)
- A1 origin frames: 9 painted event-dialog frames, one per origin (jpres sets data-kpres-origin only), 3:4 and 4:3, transparent centre, same family as the kit category frames.
- A2 swaddled baby: painted sprite (1 frame, ~256 px, alpha) for the birth moment ("baby appears in her arms / beside her"); placeholder = lotus light + petals.
- A3 red thread JOIN: painted thread tying two hands/sleeves (sheet like thread-sheet); placeholder = the snap sheet played in reverse.
## HANDOVER (verbatim rollover lines for the successor's takeover prompt)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
Successor: continue branch review/presentation-wiring from b0b972b97 (worktree /home/user/wt/presentation-wiring may be gone: `git worktree add … -B review/presentation-wiring origin/review/presentation-wiring`). Read this file first, START_CORE + START_WORKER, KIT §68.8, dev/build/jpres.js (PEOPLE MOMENTS) and jfxkit.js (§68.8). Do blockers 1-3, then report + SẴN SÀNG KIỂM.
