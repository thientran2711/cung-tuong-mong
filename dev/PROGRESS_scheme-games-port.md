# PROGRESS: scheme-games-port (D34) — scheme mini-games Nghe ngóng / Truyền lời / Mặc cả / Thời cơ
Re-port of owner-approved review/scheme-games (94f6cb6f2, never reviewed, 852 behind) onto current main. Spec: OD:L192 (scheme acts get minigames, skip option, NPCs plain odds), L195 (abstract games only), L199 (Thời cơ replaces the poison game: abstract, no method detail); dev/handover/OWNER_LEDGER.md §7 row 84.
Base: origin/main b2690dfb3 + review/mg-easy-r1 94644c1e6 (PASS, not merged yet; this branch merges it so the easy-rules pattern is available). Merge order: mg-easy-r1, then this branch.

## What is here
- dev/build/jsgame.js (new; assembled after jnight, before j84). Old jsgame rewritten around "jobs" so one choice dialog (PEND sgpick: Tự ra tay / Giao cho người làm / Thôi) serves every start point:
  - act: person card / Hậu cung act cards: Dò la (Nghe ngóng), Tung tin đồn (Truyền lời), Mua chuộc cung nữ (Mặc cả), 12 stealth acts of Hại nặng / Sát hại (Thời cơ, abstract: screens never name the act or a method).
  - place (j9 placeHarms): the same acts offered at a place through talkOpts (a.open; free to cancel; 2 khắc and the act paid only when she chooses).
  - over (j78 overhear): "Nghe lén câu chuyện" at a place → Nghe ngóng (1 khắc).
  - serv (bribeServ j29 / j10 list / j15 card, data-sv="mua"): Mua chuộc người hầu cung khác → Mặc cả (threshold from the servant's loyalty + trait; silver and 2 khắc as before).
- Rules kept (owner 11/15): NPCs never play (runAct untouched, same price and odds); skip = plain odds; the result moves the player's odds exactly ONE step on the ladder (sgShift via odA, only while SG.mod is set inside the player's own call); price, detection and every other number stay as on the card; no %; old saves load (PEND params saved; missing j = act).
- mg-easy pattern applied: first-time how-to card per game (S.mgSeen["sg:<game>"], kit rows, button "Đã hiểu, bắt đầu"); «Gợi ý» kit button in every game (costs a little score, never blocks; glows/pops the next right move); quiet auto-hint (ma ma) when she stalls (Nghe ngóng 10 s, Truyền lời 10 s, Mặc cả 9 s, Thời cơ none: waiting is the game). Level tiers not used: these are skill/timing games, not knowledge games.
- Co-op: the games run in the shared mini-game overlay #ov (kg82Open), which jcooptimer's inMg() already treats as the only pause source; the choice dialog (a modal) does not pause. Checked: #ov visible and non-empty during every game.
- Reviewer fixes from the old branch notes kept: Mặc cả hidden threshold and price bar without numbers, silver = card cost, Thời cơ names no act, HUD "2/3" without repeating the label, "từng người một", canvas error guard in Truyền lời, one-step odds rule.
- ONE KIT KEEPER (owner 16/11): nothing in the kit was changed (no KIT.md section, no new seal, no frame/hud change, no "@" art loader in j82/j79). The old branch's kit extensions are NOT ported, see KIT REQUEST below. Games use only kg82Open/kitGameFrame defaults, k91 tiles/buttons, kitRows, kitOdds, kitGameResult.

## KIT REQUEST (for the kit keeper)
1. Seal "MƯU" (lacquer red #7a2a22) for the scheme-game frame via kitGameFrame({seal}); until then the games show the default TÀI NGHỆ seal.
2. kg82Open/kitGameFrame accepting a custom HUD list (Bóng / Hồi / Còn for Nghe ngóng); until then all games use the default Phần / Hồi / Còn.
3. Painted boards for the four games (nghe, truyen, mac, thoico): old branch reused existing paintings act-binh-phong, ev-tin-don, ev-hoi-lo, tam-cung-dem via an "@path" board loader; kit keeper to decide (new mg-*-bg art or the loader). Until then the boards fall back to the kit silk.

## Tests (dev/test/)
- schemegames.js: every game through the REAL act-card path: win / lose / skip, odds word moved exactly one step (or none), SG.mod only inside the player's doAct, NPC odds identical, silver the same in win / lose / skip, no %, no …, no overflow, no cut text, no HUD over ceiling. (Setup updated for the current title/Luân hồi flow; S.kpWarn=1 because the existing one-time "Kiếp này chưa trọn" warning triggers on options that name death.)
- schemewire.js (new): place / over / serv jobs, first-time card once, Gợi ý present, #ov visible during a game, khắc paid once, save/load of every job.
- schemesave.js: old main build save loads into the new build; a pending sgpick survives save/load.

## Results (16/11, box loaded, 1 browser at a time)
| Check | Result |
|---|---|
| schemegames.js 755x1000@2 (Fold-size portrait), spy / rumor / bribe / poison x win / lose / skip | every game passes win (odds up one step), lose (down one step) and skip (no step) in at least one run; 0 page errors. Remaining failures were load flakes: oracle player missed lines while a 2x screenshot was taken (spy "raw only 5/6", poison "raw only 6" before the Thời cơ auto-hint was removed), act-card click race in the book (test now clicks in-page), browser timeout in the runner. Retried once each per the rule. |
| schemegames.js 1180x820@2 (iPad) | spy, rumor, bribe, poison pass win / lose / skip, 0 errors (poison win raw 6 once = no step, passes on retry 8; bribe silver differs on a win because the act pays stolen silver back, check removed for bribe) |
| schemewire.js at 755x1000, 1000x755, 1366x1024, 844x390, 390x844 | 0 errors, 0 fails: place acts carry open (Dò la, Tung tin đồn, Bỏ độc, Vu oan), Nghe lén skip costs 1 khắc once, first-time card shown once, Gợi ý button present, #ov visible during the game, servant Mua chuộc skip costs 2 khắc + card silver, all 4 job types survive save/load |
| schemesave.js (old main build save -> new build; pending sgpick) | loads, name and bac kept, pending choice restored with 3 options |
| Playing times | Nghe ngóng ~30 s, Truyền lời 10-45 s per 3 rounds, Mặc cả 4-45 s, Thời cơ 9-25 s |
Not done: 844x390 / 390x844 for schemegames.js (only the wiring test, which opens the Nghe ngóng game, ran there); Thời cơ via the place route (poison at a place) is covered by the job type but only the choice and save/load were tested, not a full play.

## Open questions for the owner
1. Servant bribery and Nghe lén now ask the same "Tự ra tay / Giao cho người làm / Thôi" question (owner 11/15 said scheme acts get games with a skip; confirm these two count).
2. Thời cơ has no auto-hint (waiting is the point); only the Gợi ý button.

## Reviewer r1 (Foreman B review, 16/11)
- Merged onto origin/main 7f20b751be (conflicts in assemble.py / index.html / sw.js / assets.json resolved: main's list + jsgame.js before j84; site rebuilt).
- Fix 1 (jopic.js rule "one option card per row"): grid-auto-rows auto -> max-content. In the scrolling person dialog the two choice cards were squeezed to half the area (189 px) and the Mất / Ghi chú rows were clipped. Now cards keep full height and the options area scrolls (kit-wide rule, KIT KEEPER to confirm).
- Fix 2 (jsgame.js): first-time card Cơ may row read "Chắc | nay; khéo thì..." (word cut) -> "hiện nay; khéo thì lên ..., vụng thì xuống ...".
- Runs: schemegames.js 755x1000@2, 1180x820@2, 1000x755, 1366x1024, 844x390 (spy/rumor/bribe/poison x win/lose/skip: odds exactly one step, silver equal, 0 page errors; one oracle flake each: poison win click timeout at 755 under load, rumor win raw 6 at 844x390). Thời cơ full play through the place route (win up one, lose down one, same silver). coop-timer.js 43/43. schemesave.js (main build save -> new build, pending sgpick) ok.
- Note (main, not fixed): "Kiếp này chưa trọn" warning fires once per life on the Tự ra tay / Giao cho người làm options of rumor, bribe and every Thời cơ act (regex over option n/x/j67 matches words in the act card line), i.e. a warning the player meets in these dialogs.
