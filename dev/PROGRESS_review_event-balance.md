# PROGRESS · review/event-balance (base origin/main 70c792d4 + review/opt-render a8ec9851)

Brief (HANDOVER_1115_PM "review/event-honest → event-balance" + owner 17:06Z). event-honest was never pushed (lost), so this branch starts
from main. review/events (j68) is already in main and its helpers are reused. The choice DISPLAY (hint text, risk tag, cost mode,
kitHintPhrase / kitIsEventChoice) belongs to the review/opt-render worker: merge their branch again later, don't edit jk2b §6b here.

## Done
| what | where | test |
|---|---|---|
| Story label on every story dialog: `Chính tuyến · <quest> · Bước i/n`, `… · Cơ duyên hiếm`, `Phụ tuyến · <việc> · Lời nhờ (n bước)`, old saves j4 | jstory.js | dev/test/story-deadline.js |
| Deadline by severity (khẩn 4 buổi / vừa 9 / lớn 21, BAL.dl67*): option "<việc>: nhận lời, lo liệu trong N"; countdown chip in the top-bar state row (`#k3tt`, via new kit hook `window.K3_STATE`, KIT 31.2) + Mệnh truyện tab block; tap = the same choice again; lapses only at the deadline (gives up, Danh −2); chapter clock waits | jstory.js, jk3.js (1 line) | story-deadline.js (11 checks) |
| Price by rank (BAL.cost67 ×0.6 Đáp ứng … ×1.5) on every chapter Bạc cost | jstory.js | story-deadline.js |
| Route without silver on EVERY chapter beat with a Bạc option (lão Vương: kho củi via her maid, Thái y viện; others: "Nhờ người quen lo liệu, không dùng bạc") and on every j72 Bạc step (branch "… (nhờ người, không dùng bạc)"); j4 td1 too | jstory.js | dev/review/story_audit.js → dev/review/story-deadlines.md |
| Context outcomes: per-life hidden taste of the person × answer, their mood, their liking for her, the Emperor's mood (j68 c6 + j67 oOf67, BAL.ctx*) | jevb.js | dev/test/event-context.js |
| Event result → her mood + the mood of consorts whose feelings changed, with the cause; mood seal tap = cause box (kit panel) | jevb.js | event-context.js |
| Real preconditions: "trả lại quà ngươi tặng" only with a real gift (named, really returned); "hỏi mượn" only owned things | jevb.js, scan dev/review/scan_claims.py | event-context.js |
| 3 bots (hint / rand / same) — same sensible acts, differ only on event choices | dev/measure/evbot.js | → dev/review/event-balance.md |

## How to run
```
dev/tmp/mk.sh   # (local helper, not committed) = assemble + wrap dev/index.html with <meta charset> into dev/tmp/_t.html
python3 -m http.server 8861 --bind 127.0.0.1   # at the worktree root
NODE_PATH=$(npm root -g) node dev/test/story-deadline.js http://127.0.0.1:8861/dev/tmp/_t.html 755x1000 shot.png
NODE_PATH=$(npm root -g) node dev/test/event-context.js  http://127.0.0.1:8861/dev/tmp/_t.html
NODE_PATH=$(npm root -g) node dev/review/story_audit.js  http://127.0.0.1:8861/dev/tmp/_t.html
NODE_PATH=$(npm root -g) node dev/measure/evbot.js http://127.0.0.1:8861/dev/tmp/_t.html 40 hint,rand,same 1 > out.json
```
(serving dev/index.html directly breaks: no charset meta → "Invalid or unexpected token".)

## Open / next
- Banners: 305 of 365 chapter beats have no own picture → list in dev/review/story-deadlines.md for act-pics2.
- Hints are often vague/wrong ("có lợi; nhưng có hại", "Thái y" read as "thân thể bị hại") — opt-render worker's part.
