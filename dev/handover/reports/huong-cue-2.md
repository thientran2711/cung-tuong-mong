# huong-cue-2 report (worker, 21/11)
PRIORITY #1 CHECK: OD 1998 (words rule, canon overwrite 21/11 ~00:50Z) + 2014/2023 | main LIVE e4fd4dcf (merged) | review/huong-cue d9fa3a93 (base) | claims: mg-5s-clear owns td_ngon/ban/tat/ne/banh/duho/doi/hoadien/jhd; dauho-lv5 owns Đầu hồ — untouched

Branch review/huong-cue-2 @ fffd3f59 = review/huong-cue d9fa3a93 + code 5e1fdb7d + merge of origin/main e4fd4dcf (index.html/sw.js conflicts taken from main, then rebuilt with build_site.sh).

## Table: kind | stripped | guiding? | restored
| kind | stripped text | guiding | restored |
|---|---|---|---|
| tho (jnwp) | verdict «Nét thần!/vững/Tạm được/run» (was ★), hint «Từ chấm xanh, theo nét mờ» | YES | YES |
| doi (jnwp) | «VẾ RA», «VẾ ĐỐI», «KHAY NÉT BÚT», wrong-drop tip «Chưa đối: nét này khác / chưa lật gương», hint «Nét sáng: hình lật gương», verdict «Đối chỉnh…/Đối được a/b nét» | YES | YES |
| thq (jnwq seat) | «GẦN THÁI HẬU · PHẨM CAO → XA · PHẨM THẤP», slip «Thái hậu» (was ♛), panel captions MẪU/BÀN LỄ/Kho lương/Kho hương, tips (wrong/hint), verdicts | YES | YES. Seat label stays «◷ năm» (NOT «phong năm…», OD 2023) |
| xa (jnwq clue) | «AI MẶC ÁO VÀ MANG VẬT KHỚP VẬT CHỨNG?», tier-0 «mảnh áo/đồ rơi/áo X · Y», Ma ma tip, accuse tips, verdicts | YES | YES |
| td_cong (theu) | «Chỉ mẫu», «Chạm sợi chỉ cùng màu», «bắt đầu», «hết nét» | YES | YES |
| td_dung | «◀ nghiêng trái / nghiêng phải ▶», floor «◀ trái / phải ▶», «giữ nửa trái/phải đỡ bát…» | YES | YES (same family, law 11) |
| td_hanh | «còn N phần để chia», «<tên> · cần X phần · nhận Y» (beside the pips) | YES | YES (new kit class .nwb-cap in jnwb.js — one-line caption, flagged for the reviewer) |
| td_ngon | voice / mood / phase lines | YES | NOT mine (mg-5s-clear) |
| jhd (hoadien) | instruction line | YES | NOT mine (mg-5s-clear) |
| Ma ma tip row in jtd wrapper (TD_HINT / IDLE line, 55–65 chars) | long hint sentences | reading-heavy | NO — the gold ring is the hint |

## Decision: «Cách chơi» row hidden during play
KEEP HIDDEN. The `how` sentences are 200–350 chars (reading-heavy, her own exclusion); there is no short per-kind field, and the guiding words she needs are now on the canvas (labels, tips, verdicts). Option if she still wants it: a `how1` field (≤ 30 chars, 31 kinds) shown in the row — a content job, not started.

## Tests (index.html rebuilt)
mg-noword-a 0 FAIL, mg-noword-b 0 FAIL, mg-noword-kit PASS (31 kinds), mg-allkinds 7/7, mgcal-redo 12/12, quickcheck PASS (core gates PASS). coop-e2e NOT run: no co-op origins in this box; the change is canvas/DOM labels only, no sync state.
Shots Fold 755x1000 + iPad 1180x820 (doi, thq, td_cong, td_dung, td_hanh looked): labels readable, no overflow. Slight nit: «Chạm sợi chỉ cùng màu» sits on the hoop (small). Shots not in git.

## Handover
Nothing open for my items. Remaining across the group: td_ngon + jhd (mg-5s-clear), Đầu hồ (dauho-lv5).
