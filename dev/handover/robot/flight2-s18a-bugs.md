# flight2-s18a bugs (iPad 1180x820, persona speed, seed 2026112547)
Game build cccd76a7a38a (main 066d9af0, CTM_BI.s 0b43ee55+). Harness: review/robot-realtap 39c6e505 for buoi 0-21, then f65d019b from the first resume (05:31Z) on.
Result: LIFE DONE «Xuất cung tuổi 30» · year 13 · buoi 1708 · 7729 real taps · dead buttons 0 · stuck 0 · jsClicks 0 · exitPick none. robot-audit.js: VALID (age-out by the game, Nội vụ phủ j42:303; offers 15 seen / 12 picked).

## GAME bugs
1. [js] page error «ly is not defined» (ReferenceError at index.html:82959 via kcDo :77980 / Object.go :77978), first seen buoi ~275 (year 3). No visible hang.
2. [game] KG82.phase stays «play» after the round ended: board theu shows its result / next («#kg82ok Xem kết quả», #kg82box hidden), the game never sets phase «result» (known open bug, seen buoi ~300).
3. [game, known] rank readout: «maid 0» / maid N swings. Rank changes (buoi · from → to · trigger):
   b0 maid1→0 «Tiền truyện · Cung nữ tuyển vào cung» · b270 0→maid1 «Nhập cung làm cung nữ» · b293 1→2 #kmrew · b318 2→3 #kmrew · b488 3→0 .kne · b524 0→2 .kne · b636 2→0 .kne · b676 0→1 .kne · b756 1→0 .kne · b796 0→1 .kne · b872 1→0 .kne · b912 0→1 .kne · b1684 1→0 .kne (and others between b912 and b1684, see moments log). Rank 0 held b0-b270 (known «rank 0» bug); then she dropped back to maid 0 repeatedly via .kne event cards and never left the maid tiers in 13 years.
4. [assets, 404] /img/kit/ico-download.webp, /img/kit/emo-anim/binh.webp, /img/kit/emo-fx/binh.webp, /img/kit/emo-khochiu.webp, /img/kit/emo-hungkhoi.webp, /img/kit/emo-anim/vui.webp (served from the local pinned build; the sparse set holds only root, audio/, icons/, dev/vendor/, coop/ — may be a local serve gap, not a LIVE bug; check LIVE before fixing).
5. Save size grew 2.13M chars (b1124) → 2.92M (b1674), ~+60-90K per 50 buoi; SAVE QUOTA SPLIT (~5.2M) not reached in this life.

## Known open bugs NOT hit in this life
«#kdaytc no reachable button» 0 · Ban hoa at b1 0 · gift picker all disabled not seen · Mt._tick freeze 0.

## HARNESS / INFRA notes (not game bugs)
- Background node + Chromium died ~5 min after the Claude turn ended three times (04:39Z, 05:38Z, 05:58Z); each time the same life resumed from the ckpt (save hash identical). From 06:06Z the runner turn was kept open with foreground waits and it ran 3.4 h with no restart. Resumes at buoi 21, 52, 73.
- First resume (buoi 21): «BUG SAVE REWIND: reload went back from b21 (clock 1.1.2.0) to the stored b20 (clock 1.1.1.3)» although the save hash was identical to the ckpt: the ckpt was written at b21 but the page save was still b20 (ckpt/save timing at a kill). The line is in the log only; the results json does not keep it after the resume (R.bugs restored from the ckpt).
- harness.sha in the json says 39c6e505 (stamped at the first start; resumed runs on f65d019b, see harness.resumed).
- The first pin server for this life came from rt-serve-build.sh (self-check OK, pixi 200); the harness started its own pinned server on :8921 (pixi 200).
