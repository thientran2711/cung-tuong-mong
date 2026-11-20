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
