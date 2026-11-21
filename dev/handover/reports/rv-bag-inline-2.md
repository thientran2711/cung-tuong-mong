# rv-bag-inline-2 — FAIL (one fault, one-line fix + group scan)

PRIORITY #1 CHECK: OD #21 #23 (OWNER_MARKS_2111), main kinlStrip / KIT §70.6, review/bag-inline-2, claims JuyC (worker bag-inline-3); read reports/bag-inline.md; reuse of ONE kit strip part confirmed (kinlHTML / kinlDetail / kinlWear / kinlPickInline).

Branch: review/bag-inline-2-rv = worker 626ca232 + LIVE 8b2e344d (j82.js conflict: LIVE's b.dataset.kgkeep AND the branch's b.querySelector(".kitem") both kept in pass(); node --check ok; index/sw rebuilt), sha 72fc5dd1e8d36c2a739ad287664d9172331c518b.

Passed: bag-inline PASS (755x1000, 1180x820), bag-inline-pickers PASS (both sizes), bag-inline-scan PASS (table: only listed fallbacks remain: jdisp, jgift fallback, jitd generic card, notices/act dialogs); real person card: kinlWear strip opens under the worn-slot row inside the card, narrow stack, no overflow, second tap folds; gift/veil/dress chest/slot/drawer strips looked on Fold + iPad. j82 «skip buttons wrapping .kitem» is right game-wide (tiles are pictures, not words).

FAIL — Hội phối đồ (ts): the strip's act buttons live INSIDE #kg82, and j82 pass() (no words in play) turns every text button without data-kgkeep/kgsign into «●». Probe of the strip: acts = [{t:"●", ds:{tsact:"on", kgsign:"●"}}] — so «Đặt vào <ô>» (data-tsact="on") and «Bỏ ra» (data-tsact="off") both read just «●», identical to the red confirm «●» next to it; the player cannot tell place from remove. On LIVE these acts sat in the item pop-up outside #kg82 and kept their words — new regression from moving them into the strip. OD 21/11 ~00:50Z (mg-5s-clear): a button the engine marks data-kgkeep=1 KEEPS its short word.
Fix: jts.js ~407/416: mark the strip act buttons data-kgkeep=1 (pbtn builder or after paint: box.querySelectorAll("[data-tsact]").forEach(b=>b.dataset.kgkeep=1)). Whole group (law 11): scan every strip/act inside .kg82 / #kg82box / .kg82act at Fold+iPad for acts that read only «●» (kinlDetail acts in the toil dress picker are fine — phase not play, words shown; re-check after the fix: toil, ts, any minigame bag/dress pick) and add a test check: strip acts' textContent has a letter.
Non-blocking: kinlWearSpec text «Hặc ăn mặc sai phẩm: thẻ người của nàng ta, nhóm Hại nặng.» — «Hặc» reads odd; confirm it is the intended cổ trang wording (VANPHONG).
Not run after FAIL: quickcheck (stopped, was disturbed by my probes), coop-e2e.

## Round 2 — PASS

Worker fix 0da9cc25 (jts.js: data-kgkeep="1" on both [data-tsact] buttons; bag-inline-pickers.js: ts-acts-have-words + toil acts letter check) + LIVE 666def0c merged (index/sw rebuilt) = review/bag-inline-2-rv2 sha c1f7733bd77e7a5fbd8f6e73d7afc0c9789ac41d.
- Probe: strip act is now «Đặt vào áo» (ds tsact=on, kgkeep=1) instead of «●»; the «Được hợp đề …» sentence row is still hidden in play (OD 20/11 ~05:10Z no text in minigames, OD 21/11 ~00:50Z kept short word) — only the short word shows. Looked at Hội phối đồ on Fold + iPad: «Đặt vào áo» readable, red confirm unchanged.
- bag-inline PASS, bag-inline-pickers PASS (new check included), bag-inline-scan PASS (both sizes where applicable); other strips inside #kg82 = toil only (setup phase, words shown).
- Older owner rules on the same element (MAIN 88 standing rule): grepped OWNER_DECISIONS for Hội phối đồ / item pop-ups — none contradicts the inline strip (17/11 + 18/11 entries are about the wrong-dress bug and option-card layout, unchanged).
- «Hặc ăn mặc sai phẩm» is existing wording copied from jgift/jk2b: left as is.
- coop-e2e 92/92. QUICKCHECK PASS 242 s (render 292/267, tab 508/638, buổi 1821/1499, core gates PASS, old save ok).
