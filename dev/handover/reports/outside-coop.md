# outside-coop — GAP OR13 co-op half (J3b) — worker opus, session_01N1tNP4iVdUXvnLhmBA3k9Y, 20/11
PRIORITY #1 CHECK ('kcHook|kcSendToPal|palRecvFromKc|coopSend|home road co-op'): from J3's report + own grep — kcSendToPal/palRecvFromKc on review/outside-gaps (jkcg.js, family senders only, palace side needs S.kc); kcHook only queues (window.coopSend does not exist anywhere); co-op rebirth into the home road LIVE (jcoopthinb accept, test coop-home.js); review/coop-thin-g touches jkc.js/jkc2.js lines only — this branch does not edit jkc*/jcoop* (new module only), no overlap. Reused: part D D.later (her context on the host), kcCard/runOpt, pbtn + KINV_XTRA sub-tab, PEND dialogs, item ledger ilLog/ilUid, j55 tdPowAdd/tdRelAdd, j61 K61FR fog.
START_CTX ~4 % (1M window). Depth: worker (no children).

Branch **review/outside-coop** @ **2c904461** (from review/outside-gaps 70f3c853 + merged LIVE main 66bd36cd). New module dev/build/jkcco.js (after jkcg in assemble.py), BAL.kcco in jbal2.js, test dev/test/outside/coop-kcco.js.

## What (OUTSIDE_PLAN §13 + §1 co-op entry; laws 1, 2/3, 4, 6)
On when: co-op room, both alive, one friend at home (isKc) and one in the palace. Both ways (law 1):
| act | sender (price · odds from BAL.kcco) | receiver card | world (host only) |
|---|---|---|---|
| Viết thư | 1 khắc, Sức · Chắc; fail: Danh/Lời đồn | Đọc thư, cất (true intel on a consort via j61/kcIntel1 + real «thunha» item) / Đọc xong đốt (intel, no trace) | — |
| Gửi quà | 1 khắc + a REAL item picked from her chest (kit dialog); crosses on the next visiting day (next turn) | Nhận (item in, ledger line) / Trả lại quà (Đức +, bond −; item back in the sender's chest, ledger line) | — |
| Sớ tiến cử | 2 khắc, Sức · odds from house power (+ father's liking at home); fail: father/Danh | Đội ơn (Danh/Lời đồn + bond; world after accept) / Xin thôi (Đức +) | house power +, relation of the two houses + |
| Sớ hặc | same price/odds; target = top-ranked consort's house not hers/friend's | note card | that house power −, relation − |
| Tung tin (2 equal roads: Bạc / Sức, law 2) | pick: khen/chê hảo hữu, chê a consort | good: name up; bad: Mặc kệ (Đức +) / Bỏ bạc dập tin / Tự đi giải thích (odds) | an NPC consort's Danh ± + news |
| Nhập cung (join) | automatic at kcEnter (kcHook "enter") | «Xin ban nàng về ở cung mình» (chủ vị only; Sức, odds by Sủng; fail Sủng −) / Gửi lời mừng | — ; success: entrant S.resHead = friend (side-hall resident) |
UI (kit only): home = kc cards in «Thư từ» (same card frame); palace = Tư trang › «Hảo hữu ở nhà» sub-tab (KINV_XTRA, pbtn acts + «Thư từ qua lại» kitRows); cards = PEND kit dialogs. Fog OD:L165: the friend is «Hảo hữu của ta» everywhere until met (K61FR).
Transport (ONE path): route(seat, op, m) — host runs its own seat directly and seat b via part D D.later (her context, her patch) when part D is on; the guest runs her own; otherwise the room act relay k "ctm-kc" (no Worker change), resent every BAL.kcco.resend s and on peer reconnect until acked, deduped per message+op. World writes (j55 power/relations, NPC Danh) only in the host's context (worldOn). At thin level 6 the guest's card act already runs on the host (host-computed roll); the result + every number travel in the message, so both phones read the same number.

## Tests (LIVE Worker; Fold 755x1000@2 = A at home, iPad 1180x820@2 = B in the palace)
- NEW dev/test/outside/coop-kcco.js: **63/63 PASS** (3 runs: 61/61, 61/61, 63/63 after adding 2 checks) — letter both ways + answer back, gift taken (item moved, both ledgers), gift returned (item back), sớ tiến cử accepted both ways (host world power +4 incl. guest-answer → host), sớ hặc (power −4 + note), bad rumour Mặc kệ (Danh −3), good rumour (Lời đồn −3), merged week keeps items + logs, join → A.resHead = B, no page errors.
- dev/test/coop-e2e.js **68/68 PASS**; dev/test/outside/coop-home.js **51/51 PASS** (an earlier run's room-create failure came from running two co-op tests in parallel; alone it passes).
- dev/test/outside/gaps.js both devices: fail []; oldsave.js (LIVE main → this build): PASS.
- Not run: coop-thin lanes (no jcoop*/jkc* file edited); thin level ≥4 path (D.later) is code-reviewed only — the test room runs level 0 (relay path). Reviewer: please run coop-thin-f* with ctm-thin if you want the D path exercised.
- Shots (looked at all): https://ctm-img.victoria-tntt.workers.dev/img/_review/outside-coop/10-home-thu-tu-fold.png · https://ctm-img.victoria-tntt.workers.dev/img/_review/outside-coop/10-palace-hao-huu-ipad.png · https://ctm-img.victoria-tntt.workers.dev/img/_review/outside-coop/11-home-after-fold.png · https://ctm-img.victoria-tntt.workers.dev/img/_review/outside-coop/11-palace-after-ipad.png. Found+fixed: palace pane showed the home friend's real name (fog) → K61FR; «Sớ tiến cử» locked wrongly on the palace side (friend house read from P.ok). Accept-card shots were covered by the game's own night/mini-game transitions; the cards are the standard PEND kit dialog.

## Scan (law 11)
| group | before | after |
|---|---|---|
| OR13 hook kinds wired for co-op (letter/gift/so/rumour/join) | 0 (kcHook queue only) | 5, both directions |
| typed numbers in the new acts | – | 0 (BAL.kcco) |
| friend name shown unmasked before meeting (new panes) | 1 (palace pane) | 0 |

## Notes / open
- Letters use the existing item «thunha» (named "Thư nhà"); no new item (feature freeze).
- Join's two-way mirror = the palace side's accept (she asks for the friend); no extra "nói giúp ở tuyển tú" act was added (not designed).
SẴN SÀNG KIỂM outside-coop 2c904461 → BIG review (rules-numbers + UI + co-op).

## REVIEW r1 — BIG (opus), session_01N1tNP2SCHwhuKDqSe6NWh8, 20/11
PRIORITY #1 CHECK ('kcco|kcSendToPal|palRecvFromKc|ctm-kc|thin lvl'): OD/coop.md L96 L594 (every feature in co-op, one world) | main: no kcco; jcoopthin* (TH.D.later / F intents / pDiff) reused | review/*: outside-gaps-r1 52f0638e (base fixes, merged here), coop-thin-g (no jkc* overlap with jkcco) | claims: this row. START_CTX ~3 % (1M window).
**Verdict: PASS review/outside-coop-r1 @ da0c7397** (contains origin/main dbddaed2 + review/outside-gaps-r1 52f0638e). Lands AFTER outside-gaps(-r1).

### Thin-level co-op (the MUST-DO): room level 9 = LIVE Worker THINMAX (both seats read TH.lvl 9)
- `coop-kcco.js` got a `THIN=<n>` lane (host asks `ctm-thin`), waits for the host's part-D patch instead of reading at once, and new checks: B→A gift **returned** (item back once), **guest phone == host's stored copy of her** after a merged week (Danh, chest, tình hảo hữu, kcco log), both phones read the same house power, join roll forced on the host too (at level ≥ 4 her card's choice runs on the host).
- NEW `dev/test/outside/coop-kcco-ui.js` — roles SWAPPED (guest at HOME on Fold, host in the PALACE on iPad), every act through the **real buttons**: host taps Tư trang › Hảo hữu ở nhà › Viết thư (price once), guest reads the card on her phone (part D) and keeps the letter, guest plays her «Thư từ» deck cards (Gửi quà → kit pick dialog → host takes it; Thuê người tung tin → chê a consort → host world Danh −3 once, guest reads the same; sớ hặc → house power down once, same on both), then one buổi (her `do erd`) → **guest phone == host copy of B** (Danh, Bạc, Lời đồn, chest, log).
- What the worker could not see at level 0 and is now proven: at level 9 the receiver's card runs on the host in her context (D.later) and its roll is the host's; the guest's own sender act runs on her phone like every deck card at level 9 (F1 moves only runAct) and its person diff reaches the host with her ready — no duplicate, no lost item, no double charge.
- Found at thin, not fixed (nit, no player effect): a guest-sent message's `out[].ans` stays empty when the answer is applied on the host's copy before her diff arrives (only her log line «… đã nhận thư của ngươi» shows it; `ans` is read nowhere).

### Fixes made here (review/outside-coop-r1)
| # | law | before | after |
|---|---|---|---|
| 1 | 2 equal value | letter card: «Đọc xong đốt đi» = intel only, strictly worse than «Đọc thư, cất» (intel + item + bond) | burn gives Tâm cơ +BAL.kcco.letter.burn |
| 2 | 3 / 6 | sớ tiến cử «Đội ơn»: "mất: bị coi là cùng phe" was words only (no loss) | real Đức −BAL.kcco.so.beDuc |
| 3 | 3 / 7 | home «Thư từ» cards showed **Bại: Tốn công, không được gì** while a fail took Lời đồn / Danh | `failL(k)` → card `l` (runOpt applies it, the card prints it); failOf keeps only the non-stat part (father's liking) |
| 4 | 6b real people | join card / result said «Hoàng hậu chuẩn tấu» even with no Hoàng hậu or when she is the Hoàng hậu | `grantBy()` = queenP(): the living Hoàng hậu, else Hoàng thượng; the word travels in the answer |
| 5 | design §13 | sớ hặc hit the top-ranked other house | the friend's ENEMY's clan first (consort whose row toward the friend `rl[pid]` is lowest), then rank |
| 6 | 6c real objects | a gift reaching a dead receiver vanished | returns to the sender once («gone», deduped) |
| 7 | 4 one core | khắc costs typed (kh:1 / kh:2), fallback power 40 typed | BAL.kcco.*.kh, fallback BAL.kcco.so.mid |
| 8 | UI (kit price line) | palace pane: Sức / Bạc price fell into GHI CHÚ («tốn: 1 khắc · Sức 10») | «tốn: 1 khắc, Sức -10» = the j25/j54 kit form (now TỐN 1 khắc · Sức -10) |
| 9 | KIT FIRST | gift pick listed 6 items + Thôi = 7 options → kit T3 frame 307 px on Fold, each item name ONE LETTER PER LINE (pre-existing kit fault, same on LIVE) | KIT_REQUESTS 20/11 filed (kit keeper via Foreman B); interim BAL.kcco.gift.pickMax 3, newest first (4 options = the normal 562 px frame, item pictures) |

### Laws / design (rows of OUTSIDE_PLAN §13)
- Law 1 two-way: letter / gift / sớ up / sớ hặc / rumour both directions ✔ (tested both ways, both role layouts); join = home→palace entry + the palace friend's «Xin ban nàng về ở cung mình» ✔.
- Law 2/3: every card option now has a real gain; Bạc / Sức rumour roads equal (12 / 12) ✔. Law 4: one-core guard **0 fails**, one-core-text PASS, every number in BAL.kcco ✔. Law 5: n/a (no mini-game). Law 6a n/a; 6b fixed (#4), letter sender never on the stage ✔; 6c gift = the sender's real chest item, item ledger both sides, return / gone paths ✔.
- Fog OD:L165 «Hảo hữu của ta» on every pane/card ✔ (both devices). KIT: kcCard, pbtn, kitRows, h4.kpst, PEND kit dialogs only ✔; VANPHONG odds words, no % ✔.
- Same family, NOT this branch (FOR B): the base «Thư nhà» pbtn (jkcg) and these palace acts roll with raw `roll()` (no agTry odds cap / soft fail) — consistent with each other, differs from deck cards; and older jkc home cards keep fail effects in `fail:` closures so their Bại column says «không mất gì» (e.g. Lời đồn +8) — a whole-group fix for the jkc owner.

### Tests (final build da0c7397)
| test | result |
|---|---|
| coop-kcco.js THIN=9 (LIVE level) | 68/68 |
| coop-kcco.js level 0 (relay path) | 65/65 (pre-final build, same jkcco) |
| coop-kcco-ui.js THIN=9 (swapped roles, real buttons) | 32/32 |
| coop-e2e.js | 68/68 |
| outside/coop-home.js | 51/51 |
| outside/gaps.js Fold + iPad | fail [] / errs [] |
| outside/oldsave.js (LIVE → this) | same: true, errs [] |
| one-core-guard / one-core-text / undef-scan | 0 fails / PASS / PASS |
| coop-cyc.js THIN=9 | 69/73 — LIVE main fd682a8d gives 70/73 on the same lane (giau + mixed-old-guest cases, jcycle; not touched here) = pre-existing, FOR B |
Shots looked at (scratch, not uploaded): Fold «Thư từ» cards + gift pick dialog (before: letters stacked; after: 3 items with pictures), iPad Tư trang › Hảo hữu ở nhà (price line before/after), card dialogs both devices. Worker's CDN folder img/_review/outside-coop wiped with this verdict.
