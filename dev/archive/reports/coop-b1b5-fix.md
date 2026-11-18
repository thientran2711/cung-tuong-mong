SẴN SÀNG KIỂM 7c7fcc452d2e6bed5267d3f5f5bf62bbea255992 — review/coop-b1b5-fix: fix 1 (BLOCKING) of review-coop-b1b5-r2 done; guest's Kỳ nguyệt sự answer now reaches the host before the B2 draw; coop-cyc 69/69 ×2, all listed tests pass. START_CTX ≈ 5 %; finished ≈ 20 %.

# coop-b1b5-fix — worker report (Foreman D)
Branch review/coop-b1b5-fix @ 7c7fcc452d2e6bed5267d3f5f5bf62bbea255992 = origin/review/coop-b1b5-r2 d5879537 (R1–R4 kept) + merge origin/main 9ddb3f6c (sw.js conflict → rebuilt) + fix. Not deployed. Full detail: dev/PROGRESS_review-coop-b1b5-fix.md on the branch.
## Bug
main's jcycle (Kỳ nguyệt sự) × co-op B2: the HOST draws the one night with the guest's entry in its deck, but jcycle read the
lie / back / hide / rum flags only from its own S (`p===S`). The guest's maid card (Báo lùi / Báo sớm / Giấu) cost her Đức / ghen and
changed nothing on the host: her card stayed off the host's tray (her own screen said it was on), "báo lùi" never halved her next flip.
Both seats end the week at once, so the host's draw also came before her answer existed.

## Fix (ONE CORE: numbers only from BAL.cyc; no new transport: the existing ctm-p2 act relay)
- jcycle: `cybOf(p)` = the report flags of a player: own S.cyb, or for the friend's entry `COOPW.fcyb()`; NPC = null (truth rule).
  Used by cyTray, nightCh (luiNext), cyCover / cyLateSeen, cyRep (rum / cover = the book), cyHideOf, rivalsMonth (seen lateness).
  `cyRec()` = what a seat relays: {w, c:{lie,lieM,back,rk,rv,df,hide,rum,giauM}, pend (her card still open)}; `cyWk()`.
- jcoopworld: each seat relays cyRec on render when it changes (`ctm-p2` mode "cyb"; not mid-endTurn; resent after a reconnect);
  the other keeps it as CW.fcy; `COOPW.fcyb()` = the relay, else her blob's S.cyb (after a merge both hold the same).
  HOST week draw waits (`CW.cyHold`: no draw, `sendEnd` held) while the friend's entry is in her cycle tuần and her answer for this
  week is not in; her answer (relay, pend=false) or her week end (`presence` ended: an old client that never relays = true report)
  frees it → flip() again (R1's deferred-flip week rule gives tn.w = the new week) → week end goes out. Not when the host's own maid
  card is open (its answer runs the flip). Cleared on stop / begin.
- Costs stay on her client only (she pays once); the lie check by the Kính sự phòng mama runs where her night is resolved (her client).

## LUẬT SỬA CẢ NHÓM — every jcycle decision the guest makes that the other seat resolves
| # | Her decision | Resolved where | Before | After |
|---|---|---|---|---|
| 1 | Báo sớm / Giấu (lie) | host flip deck (cyTray / nightCh) | card OFF on host, ON on her screen; host draws without her | ON on both; host draws her (forced deck) |
| 2 | Báo lùi (back) | host nightCh next week | ignored | × luiNext (0.5) on the host |
| 3 | Báo lùi (cover) | other seat's book + host rivals reading (cyLateSeen) | true lateness | reads one cycle later, as solo |
| 4 | Giấu / a forged "không báo" (rum) | other seat's book (cyRep) | "đã báo" | "không báo" (one fact) |
| 5 | Sửa sổ / Dặn ma ma báo ngày giả (hide) | host rivalsMonth rival-vs-rival read | ignored (a rival could learn her hidden pregnancy) | hidden |
| 6 | timing: her card is answered after the host's draw | host endTurn | draw first | draw waits for her answer |
Checked, no change: mama lie check (nightScene, her client); costs Đức / ghen / Danh / ksKnows (her client, once); Tranh sủng /
Chặn ngự giá / Thắp đèn / ksp locks (her client, claim via ctm-tn); monthly lie evidence, mừng hụt, NPC forge/read vs her (monthPay,
her client); nightWhy "đang kỳ nguyệt sự" row of the friend on the host (private row, pub only for S).
Old save: no S.cyb → {} → nothing changes. Old client: no relay → host waits for her week end → true report; week merges (test).

## Tests (LIVE Worker, one at a time; host 755x1000@2, guest 1180x820@2)
| Test | Result |
|---|---|
| coop-cyc (NEW) before (d5879537 build) | 51/68: host never waits; som/giau card OFF on host / ON on guest, host draws nobody; book "đã báo"; lui ignored |
| coop-cyc (NEW) after | 69/69, 69/69 (+ mixed old guest: host held, freed by her week end, week merges) |
| coop-b2b5 | 30/30 |
| coop-p2 | 45/45 (after a test-only fix: clear the setup week's dialogs; before it 40/45 ×3 — B1 card behind "Tuần mới"/"Bộ sưu tập", no cy trace) |
| coop-rev2 | 38/38 |
| coop-r2 | 47/47, 47/47 (2 earlier runs FAIL at start-up "each has the other as a consort entry" — flaky placement; same build passes) |
| coop-b1 | 41/41 |
| coop-e2e (E2E_TO=120000) | 59/59 |
| coop-pets | 48/48 (one earlier run 45/48: start-up placement + first-time "Thú nuôi" tip) |
| oldroom-r1 / oldsave-r1 | 16/16 / 16/16 |
New: dev/test/coop-cyc.js (needs .tmp/old.html = origin/main build for the mixed case; CYC_HTML=<build> runs it on another build,
CYC_ONLY=dung,lui,… picks cases).

## Notes for the reviewer
- No UI / kit change, no new player-visible words, no new numbers (BAL.cyc only). Wire: one new ctm-p2 mode "cyb" (old clients ignore unknown modes).
- The host's week end now waits while the guest's card is open ("Đợi bạn xong tuần" as usual); an old guest is waited for until her own week end (presence), never forever.
- Known start-up flakiness (not this change): coop-r2 / coop-pets / coop-cyc sometimes start a seat as cung nữ / at home, so 'each has the other as a consort entry' fails within 30 s; coop-cyc now merges one setup week then; coop-r2/pets untouched.
- Test-only edit: coop-p2 clears the setup week's dialogs before B1 (they hid the Bạc lạ card).
