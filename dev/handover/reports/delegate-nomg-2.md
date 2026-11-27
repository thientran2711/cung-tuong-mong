# DELEGATE-NOMG-2 — «ask someone» acts (MAIN 134 follow-up, BIG rv note n3)

PRIORITY #1 CHECK: same topic as review/delegate-nomg (BIG PASS 70ae8c73, this branch stacks on it + LIVE ee37ab5f); reused the ONE classifier jdf dfDlg / class E — no new code path.

Owner rule (OD 25/11 ~04:12Z, verbatim): "Khi nào mà tôi là người tự làm thì mới có thể làm mini game cho tôi. Còn cái này là người ta làm mà tại sao lại là mini game của tôi?"

## Who really does the act (whole family: every «Xin / Mượn / Nhờ / Bài thuốc» act on a person card)
| card | act | who does it | before | after |
|---|---|---|---|---|
| Thái y (ty) | Xin bắt mạch | the Thái y examines (jthaiy req, his findings) | GAME (words) | no game (E) |
| Thái y (ty) | Bài thuốc dễ thụ thai | the Thái y prescribes | GAME (drag) | no game (E) |
| Thái hậu (th) | Xin Thái hậu đỡ lời | the Thái hậu speaks for her | GAME (words) | no game (E) |
| Thái hậu / Hoàng hậu | Xin son phấn | the elder gives | GAME (drag) | no game (E) |
| Hoàng hậu (hh) | Xin Hoàng hậu che chở | the Hoàng hậu protects | GAME (words) | no game (E) |
| consort (rival) | Mượn son phấn | the consort lends | GAME (drag) | no game (E) |
| consort (rival) | Nhờ giúp đỡ | the consort helps | GAME (words) | no game (E) |
| (any) | Xin thuốc cho con, Nhờ thái giám …, Nhờ Thái hậu … | the other | (not on stage this run) | E by the same rule |
KEPT (she does it herself): her own talk (Chào hỏi, Thỉnh an, Hỏi chuyện, Hỏi han, Tâm sự, Kể tội, Khen, Rỉ tai, Bàn tán, Cảnh báo, Khiêu khích, Hạ nhục, Hặc/Tố, Hỏi sở thích, Mời làm thái y tâm phúc — her persuasion), her own hands (Tặng quà, Biếu, Đút lót, Lục rương, Lấy trộm son phấn, Xem sổ, Hầu chuyện xem lén, Nghe lén), in-person deeds (Tát, Hắt, Quạt mực, Ngáng chân, Đẩy).
Outcome: each act keeps its own BAL odds / result (the other's goodwill / the Thái y's findings); no number changed (law 4).
Not in scope, noted: peddler «Để ta xem» (her shop browse) still plays a «words» game — her own act, left to MAIN.

## Code
- dev/build/jdf.js: DF_DLG += `Nhờ ` (was `Nhờ thái giám`), `Xin `, `Mượn `, `Bài thuốc ` (comment lists who does each).
- dev/test/delegate-nomg.js (6): ty «Xin bắt mạch» / «Bài thuốc dễ thụ thai» are class E; 7 ask-someone names delegated; her own talk («Chào hỏi», «Thỉnh an», «Hỏi chuyện», «Kể tội…», «Mời làm thái y tâm phúc») never E. Runtime opener spy over every E act at every place: 0 openers.
- dev/test/delegate-nomg-audit.js regex synced; audit: delegated 12 · delegated-with-game 0.

## Tests (sha below, on LIVE ee37ab5f)
- delegate-nomg.js PASS (Fold 755x1000 + iPad 1180x820 real tap, opener spy, (5) Giao doer odds, (6) ask-someone) · audit delegated-with-game 0 · quickcheck PASS (657 s, core gates incl. one-world + dead-card) · coop-e2e 142/142 both orders (default + COOP_SWAP=1).
- No new picture: the acts now run straight (no rules card), the same look as «Nghe ngóng chung» in img/_review/delegate-nomg/.
