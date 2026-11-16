# ORPHAN AUDIT (dropped work across closed sessions) — 11/16/2026 ~07:50Z
Worker: session_01UV1SzhYyEjF9w3R6uZtPwu (read-only; claims and starts nothing). Report to main s12.
Owner ask (OD 07:44Z): find work left behind when old sessions closed, like the night/day-close painted scenes; share it out among the foremen.

## 0. Method and limits (read first)
- Branches: `git ls-remote` = 518 heads (501 `review/*`). Ancestry vs `origin/main` bad941b (07:17Z) with `merge-base --is-ancestor` on a commit-only mirror (full history, no blobs). 156 review heads are NOT in main; they collapse to 111 families.
- "In flight" = ancestor of `review/merge-train-4` (4675e90, last push 07:33Z, final test round) or named in an open claim/ff-queue. These are NOT counted as dropped.
- Sessions: `list_sessions` shows main-s8..s12 + their workers (all Foreman B/C/D sessions are on other accounts: get_session = not found). For those I judge by last push + the foreman STATUS file. Rule used: dropped = no live session AND no push for 3 h (before 04:41Z), OR a finished/idle worker with no reviewer/merge slot, OR an owner-approved item that no CLAIMS line / foreman status covers.
- Not verified line by line: old 11/14-15 base branches whose content I judged superseded from SESSION8_QUEUE/OWNER_LEDGER "re-port" notes (section 5). A worker should spot-check before deleting any of them.
- Skipped per brief: D5 (replaced by NPC roads OD:L1252), festival Dư đồ painting (cancelled OD 07:26Z), ChatGPT gates, art deliberately paused by the owner (listed only in section 4).

## 1. Headline
- 12 PASS branches have NO merge slot (not in train-4, train-5 or the ff queue). One of them is the painted night scenes (night-end-r2).
- 2 owner-approved items nobody holds at all: D57 preg-rate, D58 close-maid (Foreman D says "nothing else waiting").
- 3 owner bugs reported 07:35–07:39Z have no claim (person pop-up template, one frame size per event, stage-slot overlap).
- Foreman B has not written its status since 06:23Z although main moved 14 items to it at 07:30Z (D3 D9 D11 D12 D13 D14 D19 D25 D44, mg-balance, no-word-games, D36). Unacknowledged, not started.
- 6 claims are RUNNING with no branch ever pushed (reviewers/workers): coop-chat-r1, slap-mg-r1, servant-mline-r1, perf-r1, balance-after-truth-r1, fig-bg-k1-r1 (all opened 06:26–07:27Z, so under the 3 h limit, but watch). merge-train-5 and story14-p1, kit-keeper-2 show an IDLE session with no branch.

Counts per suggested owner (33 dropped items, section 2; #8 and #15 are counted once per owner they split to): main 12 · Foreman B 7 · Foreman C 8 · Foreman D 7.

## 2. DROPPED — table (ranked by owner impact)
Legend: state = what exists; left = what remains; model per OD:L1059 (sonnet default, opus only rules/numbers/structure).

| # | Item | Branch@sha (last push) | State | Left | Owner | Model |
|---|---|---|---|---|---|---|
| 1 | **Painted night / day-close scenes (night-end r2)**: night card by mood tier, lonely night per season, season/festival dawn beat, 15 painted ne-* pictures (1536x1152), light panel, follow-ups L666–669 | review/night-end-r2@ea39ada (11/16 03:22Z) | **PASS** (reviewer notes in its PROGRESS), stalled since s8, never merged, no claim, not in train-4/5; jne.js absent on main | re-merge onto current main (conflicts expected: j79, jk4, p1, assemble list "jne after jevb"), rebuild site, run night-end.js 5 sizes + coop-e2e, ff. Follow-up: pregnancy FX plays over the night card | main (merge-train-6) then B for the follow-up | sonnet |
| 2 | **D57 preg-rate** (owner picked option 4: double conception chance + fertile-window peak from jcycle) | none (no branch) | owner-approved (s9), listed in FOREMAN_D.md:47 only; not in D status, not in CLAIMS | start (after jcycle lands = train-4) + balance check | D | opus (numbers) |
| 3 | **D58 close-maid-by-origin table v2** (Tể tướng, Đại tướng quân, cháu gái Thái hậu, buôn muối… each with gain + loss) | none | owner APPROVED; FOREMAN_D.md:50 only; D status says nothing waiting | start | D | opus (rules/numbers) |
| 4 | **Pop-up with a person must use the approved event template** (full-body figure left, picture top right) + **one frame size per event, all pages** + kit-conform FAIL for small-portrait (OD:L1271–1272) | none | owner furious 07:35–07:37Z; only kit-keeper-2 (idle, no branch) has an adjacent list; not in its list | whole-family scan + convert + kit-conform rule | main (kit keeper path) | sonnet |
| 5 | **Stage slots overlap** (Fold, 2 people + "+1"; fix j59 so figures never intersect at 5 sizes) (OD:L1273) | none | owner angry 07:39Z; no claim | fix + bounding-box test at 1/2/3 people | main | sonnet |
| 6 | **mg-balance + no-word-games**: minigame difficulty rises with rank, medium target Tuyệt phẩm 20–30 %, replace every word/text minigame by a non-word one (OD:L1255, 1265, 1266) | none | assigned to B (HANDOVER_SESSION9 07:10/07:20Z) but B status not updated since 06:23Z | B must claim; opus for the numbers, sonnet for the replacement games | B | opus + sonnet |
| 7 | **mortality** (age-based death/illness for all incl. Emperor/Thái hậu, poison, giữ mẹ/giữ con) | review/mortality@14c3640 (05:30Z) | SẴN SÀNG KIỂM; s8 session ARCHIVED; report says "→ Foreman D / opus reviewer"; no reviewer claim; jmort.js absent on main | open reviewer (opus), re-merge, then balance-after-truth rerun | D | opus |
| 8 | **PASS-without-slot batch ("merge-train-6")**: econ-items-r1 eed75e7 (D6), toil-react-r1 75bd0eb (D27), pcard-dislikes-r1 3b2e15e (C35b), coop-invite-ux-r1 727b611 (C43), dlg-fig-ph-r1 fd7768b (D50), row-align-r2 69e6d56, origins-r1 968ed00 (D18), memories-r1 99c0695 (D26), luxury-r1 a84d31c (D17), balance-pass-r1 89ea80f (C7; HH 45 % > 32 % target, owner Q6 open), **cycle-art-r1 74f96d6** (needs train-4 jcycle first) | see names | all PASS (reports/ + foreman PASS lists); train-5 only takes personality-r1, tuduc-pic-r1, newgame-ui-r3, opt-pics3-r1, skin-audit-r1 | merge in 2–3 trains (order: econ/luxury share files → one at a time; npc-mind builds on personality-r1 + pcard-dislikes-r1, so those land before it) | main (merge worker) | sonnet |
| 9 | **kit-keeper-1 sign-offs** (K1 fig-bg-k1 c2cbe40; podium + person-dialog chips 05bce55) | review/kit-keeper-1@05bce55, review/fig-bg-k1@c2cbe40 (06:38Z) | DONE, "KIT OK", never merged; D36 and C8 wait on it | land with train-6; fig-bg-k1-r1 reviewer (C) has no branch yet | main | sonnet |
| 10 | **promo-skip** (quest rewards → direct rank; prince → rank, princess → exam waived) | review/promo-skip@16a5d35 (07:16Z) | worker idle, promo tests 11/11 PASS, no "SẴN SÀNG KIỂM", no report, no reviewer; model OK (opus) | write report + open reviewer (opus) | main (it is main's claim) | opus |
| 11 | **D3 item-big** (big item centre display frameless + hi-res) | review/item-big@adda320 (06:21Z) | PARTIAL, blocked on KIT REQUEST (frameless kitItem big mode + kitItemBigSrc, 20 call sites); the request is NOT in kit-keeper-2's list | add to kit-keeper-2, then B switches call sites | main (kit) then B | sonnet |
| 12 | **D36 leaderboard + Bảng vàng podium** | review/rank-port@123195a (03:10Z; **no push 4.5 h**) | "BLOCKED on kit-keeper-1" — now unblocked (kit-keeper-1 DONE 06:38Z); B has not woken; Worker ctm-rank + DO deploy needs Cloudflare (account C / main) | resume + re-run rank-e2e, deploy Worker via C | B (+C for deploy) | sonnet |
| 13 | **D29 schedules + ONE location ledger j95** (blocks D13) | review/schedules3@1051741 (05:49Z, **2 h**, verdict "NOT READY 85 %") | C session invisible; "D29 finish re-runs RUNNING" last push 05:49Z | confirm alive or finish: motive gate, ROSTER bot audit, qsave | C | opus |
| 14 | **D25 veil-zoom** | review/veil-zoom@d378253 (06:37Z) | claimed by C (06:09Z) AND moved to B (07:30Z); no verdict; ownership conflict | decide owner, get report/PASS | B | sonnet |
| 15 | **D11 presentation** (sound by event group + voices, frames by event group, §68 painted fx into every event, 15-item list) | none | HELD at B (Q24); main said D11 → B/ D51 wiring → main | one foreman for D11 + D51 together ("related items to one foreman", OD:L1229) | main (D51) + B (D11) → give both to ONE | sonnet |
| 16 | **D13 spread events across buổi** (cap + histogram) | none | HELD; needs D29 ledger | after #13 | B | opus |
| 17 | **D19 Biếu quà làm lành accepts works/items** | none | HELD; shares econ files with D17/D6 (both in #8) | after #8 lands | B | sonnet |
| 18 | **D4 NPC death/replacement with NEW faces + Phế phi Lý side story** (OD:L641–643) | none | no branch, no claim; mortality only covers ages/causes | start after mortality | D | opus |
| 19 | **D8 Emperor visits her palace and stays the night; poison Emperor/Thái hậu roads** (OD:L602–603) | none | no branch (mortality has Emperor plot causes only) | start | D | opus |
| 20 | **D21 co-op B1–B5** (item/kid steal + servant acts, host night + shared heir, Emperor death in co-op, festivals/NPC schemes include guest, exam seat caps) | partly coop-night-sync (merged) | only night-sync part is live; rest nobody | audit + split | D | sonnet |
| 21 | **Co-op home road simultaneous** (both players' pre-palace roads + entry at the same moment, OD 07:25Z) and **NPC roads for men** (OD 07:25Z) | none | new, no claim (kc-roads-cn-nc / story14 may fold them in — not stated) | confirm with those two workers or open | main (story14 owner) | opus |
| 22 | **Every animation scene ends with a button (kit part)** (OD 07:20Z) | none | kit-keeper-2 queued (idle, no branch); family conversion not assigned | kit part, then whole-game convert | main (kit-keeper-2) then D | sonnet |
| 23 | **Tutorial must be part of the story** (OD 07:15Z) | none | falls under story14-p1 plan (idle 07:32Z, no branch; dev/STORY_ROADS_PLAN.md exists) | confirm in plan | main | opus |
| 24 | **D14 học thành tài painted scene; D44 fig export ≥1100 px; D43 postponed appearance art; D51 fxkit sprites; fig-hd-upscale + face-sharp-hd2 (owner "spend the credits", OD:L1160)** | fig-hd-upscale and face-sharp-hd2: **no branch at all** though CLAIMS C61/s8 said RUNNING | art; owner paused all art tonight | resume at owner's morning | C | sonnet |
| 25 | **D2 item-art leftovers** (poem items as calligraphy, incense distinct colours, dress items without rack, chubby thiếu niên pets) | item-art-r5 merged | leftovers never listed done | check + draw | C | sonnet |
| 26 | **D16 Tứ đức sub-styles ×4 + CDNH works 10×4 with art** | tuduc-sub (train-4), opt-pics3 (train-5) | only part; "10 items × 4 tiers giftable" not seen | audit then finish | C | sonnet |
| 27 | **D23 mole audit (rest) + D24 consort-c12-ty5-a51 eye patch** | review/mole-audit-r2@474f735 (06:24Z) | "D23 fixes staged locally" (worktrees were cleaned at ~05:00Z — probably lost); D24 never taken | redo staged fixes; fix c12-ty5-a51 | C (art paused) | sonnet |
| 28 | **huadian-size r3 FAIL list** (c14 t4/t5 discs, rings/beads on m48/m14/m34/c28, c28-t6-a36 damaged, m22-t6…) | review/huadian-size-r3@1aed287 (06:01Z) | FAIL, "fix queued (art pause)", C9 worker #4 queued | resume | C | sonnet |
| 29 | **art-complete part 2 / act-pics2 resume / small-art** | art-complete@79d5d5b (00:19Z), act-pics2@5f80a27 (23:13Z, 237/380 → 143 keys left from thu-cu-lot), cdn-pending-b | art paused; eunuch ranks 360/360 done on branch but the code part "eunuch picker" (A12) never reviewed; u10/u20/u30 colour TODO | review code part, then resume art | C | sonnet |
| 30 | **NVP (Nội vụ phủ) scene redo with the approved Kính sự phòng palette** (OD 07:42Z: v2 washed out) | place-glyphs worker (idle 07:37Z, before the order) | no live worker holds the redo; not wired | main art sample (main does samples only) | main | sonnet |
| 31 | **6 princesses per foreign country + 6 cung nữ identities** (OD 07:23Z) and remaining 6 place glyphs after v2 approval | foreign-princess-samples@962cb8d | paused for owner; mass production waits for approval | after approval → C | C | sonnet |
| 32 | **D9 header-own** | review/header-own@d6e1699 | worker found it already true on main; only a probe test added | close the item; land probe or drop branch | B | sonnet |
| 33 | **reign-road-r1b second reviewer, 2 extra findings** | reports/reign-road-r1b.md | branch stopped as duplicate, findings never triaged | read the 2 findings, file as D follow-up | D | sonnet |

## 3. NOT dropped but stuck — watch (in someone's queue)
- **Main-frozen ff queue (07:09Z)**: flip-newlife-r1 cdad710 (owner bug, push to main DENIED by classifier at 07:25Z, waiting owner OK), servant-system-r1 e82a9bc (LIVE bug: household on her room stage), kc-lore-r1 c40335d, weather-fx-one-r1 5a6ea97, then merge-train-5 (branch not pushed yet; session idle 07:41Z) and merge-train-4 (4675e90).
- **Reviews opened 06:26–07:27Z, no branch yet**: coop-chat-r1 (80 min), slap-mg-r1, servant-mline-r1, perf-r1 (D15, ef6bc7d), balance-after-truth-r1, promote-servants-r1, fig-bg-k1-r1, act-split-w2.
- **Running workers with recent pushes**: npc-mind, cardflip-glow, danh-balance, mood-bar (D12), one-core, kc-roads-cn-nc (branch 05eeced).

## 4. Deliberately held (owner decision) — not dropped
foreign-princess v3b samples (owner verdict), place-glyphs v2 (owner verdict), all art tonight (OD 07:30/07:45Z), D43 (confirm with owner first), Danh balance numbers (need owner OK), Hoàng thượng-side faction win (decided OD 06:10Z).

## 5. Old / superseded branches (no action, candidates to delete after a spot check)
Replaced by a merged port or later branch: schedules, schedules-audit, schedules2, kit-j95 (→ schedules3); routes, difficulty, scheme-games, tutorial, lost-items, outside, weather, drag-curl, appearance, items-earned, succession2, places, residence-art, palace-map, scene-phone, pregnancy-art (stopped on purpose), rank, rank-ui (→ rank-port); an-tinh-fix(-r1), kit-sweep path (merged via merge-hot-1); balance-old, kit-audit, stories, landscape-art, wardrobe, hud-chance, main-next2, fix-float-kiem2-wip, gift-chest-wip, person-acts-review-wip, r5-notes, kiem2-notes, idea-design, idea-history (docs only: land to docs/ once), mole-fix, seasons, place-seasons, img-quality-art, por-scale, khuecac, m05-huadian, skin-match (in skin-audit-r1), small-art(-wire), cardflip duplicates (cycle-art = cycle-art-r1).
Unverified (look first): gift-chest (jflow.js + jrankset.js not on main), person-acts (jpa.js not on main), coop-pets (A10 QUEUED in s8, never reviewed), hud-chance, khuecac, m05-huadian, appearance/items-earned jrash vs main jrash.

## 6. Suggested split (main s12 decides)
- **main**: #1 (merge), #4, #5, #8 + #9 (merge worker), #10, #11 (kit request), #15 D51 half, #21, #22, #23, #30.
- **Foreman B**: #6, #12, #14, #15 D11 half (together with D51 — one foreman), #16, #17, #32, then the night-card pregnancy-FX follow-up of #1.
- **Foreman C**: #13, #24–#29 (art; resume at the owner's morning), #31.
- **Foreman D**: #2, #3, #7, #18, #19, #20, #33.

## 7. Top 10 by owner impact
1. night-end-r2 painted night/day scenes (PASS, 4.5 h waiting) — owner named it.
2. Person pop-up template + one frame size per event + stage-slot overlap (3 angry bugs, no claim).
3. 12-branch PASS batch with no merge slot (econ, luxury, memories, origins, toil-react, pcard-dislikes, coop-invite-ux, dlg-fig-ph, row-align, balance-pass, cycle-art; plus servant-system-r1 and flip-newlife-r1 stuck behind the main freeze).
4. mg-balance + no word games (owner: minigames too easy; Foreman B silent since 06:23Z).
5. mortality (SẴN SÀNG KIỂM, archived author, no reviewer).
6. D57 preg-rate and D58 close-maid (approved, nobody has them).
7. D36 leaderboard/podium (unblocked, stale 4.5 h) and D3 item-big (kit request lost).
8. D4/D8 NPC death + Emperor visits/poison roads (no branch, no claim).
9. D29 schedules ledger (blocks D13; "NOT READY 85 %", 2 h quiet).
10. fig-hd-upscale + face-sharp-hd2 (owner "spend the credits"; no branch ever pushed) and the huadian-size FAIL list — art resumes tomorrow.
