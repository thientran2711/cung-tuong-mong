# BRIEF event-art-dark-fix (Foreman C ROOT-6, 17/11 ~12:25Z) — sonnet art worker
PRIORITY #1 CHECK ('too dark|tối quá|event-art-style|brighter'): OD 8 | ledger 0 | claims 8 | main 10 | review/* 0 — this is a FIX of the live event-art-style darks (report dev/handover/reports/event-art-style.md, brief briefs/event-art-style.md); reuse their per-key prompts / creation ids, never invent new scenes.

READ FIRST in full: dev/rules/START_CORE.md, START_WORKER.md, START_ART.md; dev/rules/topic/art-events-effects.md (lines under OD:L545 + OD:L638 — the owner's verbatim light/dark rules incl. the new line below); briefs/event-art-style.md; reports/event-art-style.md (prompts, creation ids, OLD backups, the dark refs).

OWNER (verbatim, 17/11 ~12:20Z, relayed by Foreman C ROOT): "Cảnh tối giờ lại tối quá. Má. Mày vẽ sao á"
Earlier (17/11 06:08Z) she said the night pictures were too HAZY ("mờ quá") vs the OLD ones ("đậm đà, đẹp"). So the target is the OLD pictures' brightness with rich colour: not hazy, not near-black.

OWNER (verbatim, 17/11 12:22:21Z, checked in the old ROOT chat): "Mấy cái cảnh tối đâu có nghĩa là mày cho nó đen tùi lui rồi mày bỏ vô thêm có mỗi cái đèn nhìn nó tối thui tối mù kiểu đó đâu. Bây giờ mày gửi cho tao một cái ảnh hành sự mà mang cái ý nghĩa là âm mưu" → she was shown img/act-bat-dau-bay-muu.webp + img/act-ha-doc-dan.webp (Hành sự scheming act cards) = THE TARGET LOOK: mean luminance ≈ 64–80 (0–255), warm red/rose interior, moonlit window, candle + lantern, whole room and person clearly visible — NOT black with one lamp. Use these two files as STYLE REFERENCES on every dark generation.

TARGET per dark key (both must hold): mean luminance ≥ ~65 and like the two act cards; and not darker than its OLD picture −10% (measure all three, print the numbers on the sheet); mid-tone shadows; faces of nobody visible (style rule), but props/figures/scene readable on a phone (Fold 755x1000); rich, deep colour (đậm đà), never washed/hazy. Dark refs used before: Magnific gOtZze5SXO + cpghCxF0eP — add "brighter mid-tones, readable, not near-black".

KEYS (whole family — LUẬT SỬA CẢ NHÓM: measure EVERY dark event/option/act/intro picture made by event-art-style #2/#3/#3b/#4/#5 vs its OLD; fix every one darker than OLD −10%):
- known live darks: ev-am-muu, ev-stormnight, ev-poisonedfish, ev-bordernews, ev-hhsummons; batch-2 leakroof, rumor ×4, spoiledfood; b5 nc1 + news; b9 ev-toil-hh-scold, ev-toil-rival-jealous, ev-toil-rival-tease, ev-toil-th-scold; b11/b13 ev-tt3, ev-taintpick, ev-td1, ev-plantpick, opt-giu-chan-hoang-thuong; intro td-2; check q72-*, j71f-*, news-tin-trong-cung, b2–b8 darks too.
STEP 1: measurement table (key | OLD lum | live lum | ratio) in your report → the fail list.
STEP 2: SAMPLES: 4 failing keys redone, sheet OLD | LIVE | NEW (≤1100 px, lum numbers) → send to Foreman C ROOT-6 session_011xDdVQNdyTACuGN42yEBQZ and wait. Upload nothing before C says OK.
STEP 3: after OK: the rest in sheets of ~12, each OLD|LIVE|NEW, upload only the keys C OKs (same keys, in place; never write FIGURES.json/TN.json/any manifest).
Rules: Magnific gpt-2-6 only; look at every image yourself; images on the CDN, not in git; sparse worktree under /home/user/wt, fetch --depth=30 under flock /home/user/wt/fetch.lock; push only your own paths (report dev/handover/reports/event-art-dark-fix.md, sheets under dev/handover/reports/event-art-dark-fix/) to the handover branch claude/cung-tuong-mong-handover-hj0h8w. Never talk to the owner. Report in English.
