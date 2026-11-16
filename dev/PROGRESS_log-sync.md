# PROGRESS — review/log-sync

Task (owner 15/11, OWNER_DECISIONS "Sổ ghi numbers don't match the header", screenshot dev/handover/refs/owner-log-mismatch.jpg
on the docs branch): "Tại sao không khớp." Sổ ghi said "Đêm nay ta được thị tẩm. Sủng 33 → 40 …" while the header showed Sủng 37.
Rules: (1) every change of a header stat / relation number has a log line with its reason; (2) each stat's "X → Y" / "+n" chain
replays to the header value; (3) same-moment changes in the order applied. LUẬT SỬA CẢ NHÓM: audit + fix the whole family.

## Cause (owner's case)
The night-talk card (PEND.night2, j8.js) runs `nightFx(s)` — which writes the night line "Sủng 33 → 40 · Ân tình …" (j75) — and
THEN the chosen talk's own effect, with no line: "Xin ân cho gia đình" hỏng = Sủng -3 (40 → 37, exactly the screenshot), "Thì thầm
nói xấu" hỏng = Sủng -2 / -6 + Danh -3, "Xin cho con" hỏng = Ân tình -2, "Xin tha cho cung nữ" = Đức +3 + Ân tình +1, "Im lặng" =
Ân tình +2, "Xin ân" thành = Danh +5 + Bạc +40. (On today's main logChoice folds the line and appends a net "Sủng 33→37", which
still breaks the chain and gives no reason; the owner's build was older and showed nothing at all.)

## Fix (dev/build/jlogsync.js, loaded last; small edits in j2, j3, j65)
- Shared parser of her stat tokens (Sắc, Tài, Tâm cơ, Đức, Danh, Sủng, Bạc, Sức, Ân tình, Tai mắt, Thái hậu / Hoàng hậu → ta):
  "L a → b", "L +n", "L -n (chạm đáy)", "L đã đầy N". A token right after a word ("nàng Sủng -10", "Hàn Như Ý Danh +2",
  "ít nhất Sủng +3") is someone else's or a promise.
- lsFix: a stated delta that is not the real one (clamp at 0/100, Sủng trait ×1.3 / ×0.7) is rewritten to the real one
  ("Danh 3 → 0 (chạm đáy)", "Sủng +9"); what no line explains is returned.
- Ledger + lsSync after every player action (act, choice, talk, place, scheme, lesson, danh sư, buổi / tuần change, mini-game
  pay, any tap + render): an unexplained change gets one line "<action>: Sủng 40 → 37 (reason)".
- Time ticks name their reason: weekly "Một tuần trôi qua, ân sủng nhạt dần: Sủng -1." / "Nghỉ ngơi qua tuần: Sức +4." (j3),
  "thơ hay được truyền tụng", "Đức cao/thấp" → Thái hậu (j3, v85Month), "lâu ngày, ân tình phai dần" (anMonth), "đàn cầm dưỡng
  sức" (artMonth); stipend / illness / lãnh cung / festivals / rivals' turn / y phục … join the end-of-turn line as reasons.
- Night talk: its own result line after the night line ("Xin ân cho gia đình: hỏng. Sủng 40 → 37.").
- Act summaries (runOpt, j2) and choice lines (logChoice, j3) list only what their own lines do not already say, starting from
  the value the Sổ ghi already shows (no "Đức 0→3" after "Đức +3 vì …").
- j2 snapReal now includes Ân tình: every act / choice summary used to say "Ân tình 0→N" (false; broken chain).
- j65 trueText: "Tài +1 (đã đầy 100)" (owner: unclear) → "Tài 99 → 100 (đã đầy)"; ACTRES / fixToast accept the new form.
- No UI / CSS added (log text only) — no kit part needed.

## Tests
- `python3 dev/build/assemble.py`, wrap dev/index.html with `<!doctype html><meta charset=utf-8>…` as dev/_t2.html, serve dev/.
- `CH=100 node dev/test/log-sync.js http://127.0.0.1:<port>/_t2.html 25 sens 777` (also `rand 4242`, `rand 99`): bots
  (dev/measure/inpage4.js) play 2500 actions; after EVERY action the new Sổ ghi lines are replayed per stat and must end at the live
  value; every miss is reported with the stack of the code that changed the stat (accessors on S), mapped to j*.js:line.
  For a build elsewhere: IDX=<index.html> BLD=<build dir> ASM=<assemble.py>.
- `python3 dev/test/log-sync-table.py before1.json,before2.json after1.json,after2.json` → before/after table.
- `node dev/test/log-sync-night.js <url>`: the owner's case, each night-talk choice forced to fail → PASS when the night's lines
  replay to the header.
- Screens 755x1000 and 1180x820: Mệnh truyện › Sổ ghi after a failed "Xin ân cho gia đình": "… Sủng 8 → 13 … Xin ân cho gia
  đình: hỏng. Sủng 13 → 10." with header Sủng 10; "Thi lên bậc 2. Tài 99 → 100 (đã đầy)".

## Before / after (3 bot runs × 2500 actions: sens 777, rand 4242, rand 99; before = origin/main d34b5116a)
(see table below)
