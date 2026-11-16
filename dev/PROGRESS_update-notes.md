# PROGRESS update-notes (D10) — branch review/update-notes

Owner ruling (OWNER_DECISIONS L611): after each live update a short notice, once per version; Settings button "Thông tin cập nhật" listing each version's changes. Very short.

## Priority-rule-1 check
`git grep -il "changelog|capnhat|whatsnew|updateNotes|Thông tin cập nhật"` over origin/main and every origin/review/* (dev/build): nothing. Related but different: review/update-flow (merged, KIT 35.2) = "Có bản mới" chip / reopen of a NEW BUILD; this item = the "what changed" text after it.

## What was built
- `dev/build/jnotes.js` (last module in assemble.py): the ONE list `CTM_NOTES` (newest first) + pop-up + Settings row.
- `dev/build/j74.js`: title sub-screen page "notes" (HEAD/SUBH/mount; ‹ Lui goes back to Thiết lập). Settings row = kit `.kctl` row + `.kbtn.alt` `data-tgo="notes"`.
- Pop-up = `kitModal({kind:"notice",...})` with `sections` + facts (kind "notice": news/info/rule kinds add a picture column that would show a placeholder), button "Đã hiểu", sub "Xem lại ở Thiết lập, mục «Thông tin cập nhật»."
- Test: `node dev/test/update-notes.js [WxH ...]`.

## HOW THE COORDINATOR ADDS A LINE PER MERGE
Edit ONLY `CTM_NOTES` at the top of `dev/build/jnotes.js`:
```js
{id:"2026-11-17",n:["Câu ngắn, cổ trang.","Câu thứ hai."]},   // new entry at the TOP of the array
```
- `id` = ISO date of the release; a second release the same day = `"2026-11-17b"`. The id is what is remembered, so a NEW id re-shows the pop-up once; extra lines added to an already-seen id are not re-announced (add a new id instead).
- One entry per release, 1–4 lines, VANPHONG words (no %, no "phiên bản", "lưu", "cài đặt", "điểm"). The date heading ("Ngày 17 tháng mười một") is made from the id.
- Keep ≤ 8 entries visible in Settings (older are cut automatically); pop-up shows up to 3 missed releases together.
- Then `bash dev/site/build_site.sh`; commit the rebuilt files.

## Behaviour / safety
- Remembered in `localStorage["ctm-notes-seen"]` (try/catch; storage blocked ⇒ it simply shows each visit when calm, never throws).
- Shows only when calm in play: no title, loading, dialog, mini game, motion/podium/week-book/lesson overlay, update card, or co-op room (COOP/COOPW). Two calm ticks (1.5 s) first. Polling is a 1.5 s timer that stops once handled; it never touches boot, save load or co-op sync.
- Brand-new player (no sổ): no pop-up, id just recorded. Old player (has a sổ, no key): shows the newest entry once.
- Co-op: never shown inside a room; id not marked, so it shows after she leaves the room and is calm.

## KIT REQUESTS
None blocking. Note for the kit keeper (optional): a kit "action row" (label + button in the Settings grid) does not exist; the row uses the `.kctl` row part with a `.kbtn.alt` in `.kctl-c`, no new CSS. If the keeper wants a named part (`kitAction`), the row is one line in jnotes.js `optHTML`.

## Tests (dev/test/update-notes.js)
See final report numbers below.

Results (node dev/test/update-notes.js, 13 checks per viewport): 755x1000, 1000x755, 1180x820, 1366x1024, 844x390, 390x844 all OK (no page errors, no horizontal overflow, panel/pop-up fit the screen, old save loads via Tiếp tục, pop-up once then remembered, none in a co-op room, new player none). Bytes added: ~4 KB JS, no images.
