
# C3-RGART — own act picture for c1b option 1 «Cúi đầu vâng dạ»

PRIORITY #1 CHECK: OD — kit-hand.js rule «every card its own picture»; jopic.js KIT_OPT_RULES grep (only «nhận lỗi … cúi đầu đi qua» → cui-dau-nhan-loi-h = hands-on-floor, no Thái hậu; `^vâng…` → cui-dau-tuan-lenh-h = consort bows before the EMPEROR) | ACT_PIC_ALL.md grep thái hậu/cúi/bái (no «bows to Thái hậu» picture) | main 03a8c17c, review/kit-stage-r3 report L62 | claims C3-RGART.
DECISION: PAINT (no existing picture shows "she kneels/obeys before Thái hậu"; tuan-lenh shows the Emperor, wrong person).
- Magnific gpt-2-6, folder ba4aecfe…, refs consort-01/05/12/18, 3:4, 1k, count 2 → jUIbqxnLD0 (CHOSEN: head clearly bowed, two clean hands, Thái hậu face out of frame, cổ trang dress, no text) and 9ZbwU4rNYZ (rejected: slightly odd shoe on Thái hậu). Credits 160 (2 × 80). Looked at both.
- CDN: https://ctm-img.victoria-tntt.workers.dev/img/act-opt-cui-dau-vang-da.webp (384x506 webp, 58 KB, HTTP 200 with ?v=random).
- Code: ONE line in dev/build/jopic.js KIT_OPT_RULES `[/^cúi đầu vâng dạ/i,"opt-cui-dau-vang-da"]`. Branch review/c3-rg-c1b-art sha ba3bcdf9 (from origin/main).
- Tests: kit-hand.js is NOT on main (only review/kit-stage-r3), so ran it on kit-stage-r3 + this commit cherry-picked (scratch worktree, not pushed): KIT-HAND PASS (c2a «every card its own picture» ok on Fold + iPad; was FAIL 2). kit-stage.js PASS. Order for the coordinator: this line must travel with / after kit-stage-r3 (kit-hand needs its .khand hand).
- Screenshots (looked at both; card 1 shows the new picture, other cards unchanged): https://ctm-img.victoria-tntt.workers.dev/img/_review/c3-rgart/fold-c1b-hand.png · .../ipad-c1b-hand.png · picture alone .../pic.webp
- Wipe _review/c3-rgart with the verdict. ~100% xong / art done, awaiting review.
