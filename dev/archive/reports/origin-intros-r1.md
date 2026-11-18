PASS 34d90ea46861891036a1da02b6a36193f31a50ed (origin/main c1e1bbd1 and review/kc-roads-cn-nc-fix2 862d0a10 are ancestors; must go live AFTER Foreman D's kc-roads-cn-nc-fix2 — a fast-forward to this sha carries fix2 with it)

# Review origin-intros r1 (Opus reviewer, Foreman C) — 16/11

Reviewed: review/origin-intros 30b37ea0 (worker report dev/handover/reports/review-origin-intros.md). Tier BIG (entry flow).
START_CTX ≈ 4 % of the window (get_session read 0; own estimate).
Branch **review/origin-intros-r1** = latest origin/main c1e1bbd1 + review/kc-roads-cn-nc-fix2 862d0a10 + 30b37ea0 + reviewer fixes.
**Go-live order: Foreman D's review/kc-roads-cn-nc-fix2 first (it is inside this branch), then this branch** (a fast-forward of main to this
sha also carries fix2; if fix2 changes again before it goes live, this branch must re-merge it).

## Merges (conflicts resolved)
- main 2934bede + fix2 34dec2a9: assemble = main's list + jkc2, jentry after jkc; j83 = main's (mg-train newer); jdis = main disInit
  (with "th") + fix2 `known()`; jbal2 = main's mgTier + entry-exam BAL.entry. Then fix2 862d0a10 + main 84c00794 / 1aa0edb2 / c1e1bbd1 re-merged the same way
  (jbal2: fix2's `Object.assign(BAL.mgTier.occ,{tuyen:[1,0]})`, main's mgTier line untouched; assemble + joi after jeitem). Site rebuilt.
- New main modules (jst14, jtwoway, jstatus, jdh, jpetlife, jcoopchat) do not touch nlAccept / entCtx / kc2SelDo / Tiền truyện.

## Reviewer fixes on review/origin-intros-r1 (small, made here)
1. **Intro panels = the kit STORY CARD** (joi oiPanelSpec/oiBuild). The worker put a private 16:9 `kitSceneArt` block (300 px tall) inside a
   KIT §14 scene panel. That broke §14 "fits ONE screen, no scrolling" and the kit consistency of event pictures (every other story/event card
   shows its picture in the KIT event-picture dialog band `.kdlgart`): at 844x390 the narration sat under the fold on all 4 panels (#mb
   386/207 px), at 1000x755 the last panel's tiles were cut under the button (#mb 459/415). Tried kit `headArt` in the scene panel: the kit
   turns it into a small 3:4 slot (poor for a landscape painting). Final: each panel is a story card like jentry's own "Tiền truyện" card
   (`{t, who:pMe(), art, h, btn}`): picture band + her full-body figure + narration + ONE button; "n/N" in the title; last card keeps
   `kitTiles`; gate seam onClose unchanged. Checked at all sizes: no overflow, button visible; at 844x390 the card body scrolls like every
   story card there. If sếp wants the intro pictures BIGGER than the story-card band, that is a new kit size → KIT REQUEST, not a private block.
2. **ONE CORE**: jkc `kcMyScore` typed way 6 / ch Thái hậu +15 / origin r ×4 / vh 6 / tdFall −6, and joi's reason copied the 6 → now
   `BAL.entry.w.kc.{way,chTh,rW,vh,tdFall}` (same values). The reason line now also counts ch's Thái hậu +15 like the score does.
3. **K-OI-1 logged in dev/kit/KIT_REQUESTS.md** (the worker only wrote it in the report; rule OD:L513).
4. flow.js: checks the story-card band instead of the scene panel; waits up to 30 s for the band picture (CDN through the proxy is slow
   during the burst of loads at life start — probe: placeholder and her figure take ~10 s, then load; not a game fault).

## Checks
- Kit only: kitPanel/kitTiles/kitRows/kit story card; no private CSS (`.koi` had no styling; removed with the scene panel). KIT §8.1 short-notice
  centring was the reason panels 1–3 vs 4 looked different before the fix (kit behaviour, gone now).
- VANPHONG: no %, no "Chắc chắn"; narrator "ngươi" renders "ta" on screen (OD:L312), e.g. "Vì sao: Ma ma chê ta lam lũ, kém sắc". Reason lines
  read well on every road (tables in flow logs). Judges per road correct: Lễ ra mắt (Hoàng thượng, Thái hậu, bá quan, sứ thần), Xét phong danh
  phận (Thái hậu[, Hoàng hậu]), Tuyển cung nữ (ma ma).
- Owner rules: OD:L1244 narrated intro + illustrations (art = CDN; tt-1..4, tt-h3, G1 already up, rest = §59 placeholder — not a FAIL),
  reason on result ✓, minigame ✓ (jentry); entry animation = KIT REQUEST K-OI-1 (caller ready, no-op) ✓ per rules. OD:L1250 ceiling earned ✓.
  OD:L1288 co-op: own cards only, no wait ✓ (coop-together). OD:L1267 ONE CORE ✓ after fix 2. Old saves untouched (S.oiV) ✓.
- Rotate prompt at 390x844 shows over the panel ✓.

## Tests (final build 34d90ea4 (full suite on d9d2bdc0 = main 1aa0edb2; smoke on 34d90ea4 = main c1e1bbd1, generated files only), local server, one browser at a time)
| test | size | result |
|---|---|---|
| origin-intros/flow.js direct, 10 origin keys | 755x1000 | PASS 10/10 (d9d2bdc0); smoke 5/5 on 34d90ea4 |
| same | 1180x820 | 9/10 logic 10/10 — the 1 flag = first panel's placeholder picture still loading after 30 s (CDN via proxy at life start) |
| same | 1366x1024 (not run by worker) | PASS 10/10 |
| flow.js road=nha (9 home roads + cn skip) | 755x1000 | 9/9 logic; 1 same picture-timing flag (thd) |
| origin-intros/oldsave.js (origin/main → this build) | 755x1000 | PASS 3/3 |
| entry-exam/direct.js tt,nc,cn,cnv | 755x1000 | PASS 4/4; smoke tt,nc 1180x820 PASS 2/2 on 34d90ea4 |
| kc-roads/coop-together.js (live Worker) | Fold+iPad | 26/26 |
| coop-e2e.js (live Worker) | Fold+iPad | 59/59 (an earlier run against an older merge: 57/59, "B left" not seen by the live Worker — passed on re-run) |
| shots: intro panels, selection, exam frame, result card | 755x1000, 1000x755, 1180x820, 1366x1024, 844x390, 390x844 (rotate prompt) | looked at every shot; no h-overflow, no page errors, buttons visible, nothing cut |

## Notes (not this branch; for Foreman D / kit keeper)
- N1 (pre-existing, jkc2/jentry flow): while the exam frame is open, the pre-queued "Nhập cung" card behind it already shows the CEILING rank
  (e.g. "Tần"), then becomes the earned rank (e.g. "Quý nhân") after the exam. The HUD also shows the ceiling rank during the intro. Suggest the
  entry card is built after the exam, and the HUD rank waits too.
- N2 (pre-existing on main): a new life opens with the "Hoàng thượng lật thẻ bài" night scene over the first cards (seen on old main too).
- N3 (kit keeper, optional): a bigger "illustrated story" picture size for intro cards if sếp wants it (see fix 1).

## Handover / state
Done. Worktrees /home/user/wt/oir1 (branch), /home/user/wt/oiold, /home/user/wt/oidocs to be removed. Nothing left open for this review.
