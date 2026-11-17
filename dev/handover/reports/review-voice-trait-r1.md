# REVIEW review/voice-trait (BIG tier, OD:L1370) — r1, reviewer opus, 17/11

PRIORITY #1 CHECK ('voice-trait|kTone|jtone'): OD 0 | ledger 0 | claims 5 | main 15 | review/* 1 — reviewed the existing branch review/voice-trait @ e134694; nothing rebuilt. Fixes on review/voice-trait-r1 (from e134694 + merges of origin/main 6ca04148 and c29866a6).
Start context ~8% of window; finish ~45%; no rollover.

## Verdict basis
| check | result |
|---|---|
| ONE engine | PASS. jvoice.js kTone/kLine only; jtone_b.js helpers (kTP/kToneSt/kToneRand/kToneBand) are glue that feed the same kLine. Every tone comes from traitsOf (ONE trait pool) or BAL.voice.tone (emp/th maps, alias, dflt). No second system. |
| old saves | PASS. Old pools stay as fallback; S.vmem optional; QUICKCHECK "old save ok" (x3); voice-trait*.js old-save cases PASS. |
| co-op | PASS. No co-op file touched, nothing new in the world blob (S.vmem pre-existing). Crowd tone kToneRand / line choice are display text only, like the old kLine. coop-e2e.js 63/63 (Fold host + iPad guest, live Worker). |
| VANPHONG | FIXED → PASS (list below). Hoàng thượng address goes through kAddr {goi} ("nàng" / "ái phi" by BAL.voice.aiPhi): 0 typed "nàng"/"ái phi" in Emperor quotes; 0 wrong self-address (trẫm/ai gia/bổn cung) by speaker; 0 typed tiểu chủ/nương nương in quotes. |
| tone-pool-check.js "0 pools" | FIXED: no argument = every dev/build/jtone*.js; th*/emp* pools need only the tones BAL.voice.tone.th/.emp can give (read from jbal2, ONE CORE); {x} known. Now **86 pools, 7,021 lines, OK** (≥10 per tone, no dup, no line shared by tones, no digit/%, placeholders known). |
| QUICKCHECK | PASS on 4fa118ec (139 s · old save ok · core gates PASS incl. one-core-guard); rerun on d0a839e8: PASS (132 s, old save ok, core gates PASS). |
| unit tests | voice-trait.js / -b / -c PASS, no page errors, noRepeat 0. |
| REAL cards Fold 755x1000 + iPad 1180x820 | PASS. New dev/test/voice-trait-shots.js opens the real cards directly (no headless-modal issue): greet AG-MEET (Ân cần), Thái hậu toil scold (Kiêu ngạo), rival toil jealous (Nóng nảy), j72 quest offer (Kiêu ngạo lead), Kính sự phòng ask (maid Nhiều chuyện), staff talk (Khiêm nhường) = 6 situations x 2 devices, 12 shots, all painted, no overflow, no page errors; looked at every one. Shots kept outside git (scratch /home/user/wt/vt-r1-shots, deleted with this verdict). |

## Fixed on review/voice-trait-r1 (commit 08944bbc + 4fa118ec)
1. tone-pool-check.js scanned nothing (see table).
2. BUG: Thái hậu archetypes Nghiêm khắc (trait Thật thà) and Sùng Phật (Mê tín) had no tone in BAL.voice.tone.th → kToneSt fell to a hashed tone ("Nhiều chuyện") in toil lines while kOutcome used dflt: the same Thái hậu changed voice by situation. Mapped both to Điềm tĩnh; voice-trait.js now asserts every TH_ARCH trait has a tone.
3. Address (whole family): rival slip pools (toilSlip:rival:brow/powder/son + toilSlip:diem:rival, 179 lines) typed "tỷ"/"muội" — wrong when the rival is the lower rank (she must say tỷ tỷ / "X nương nương"). Replaced by {xung}/{goi} (kAddr, rank-aware; "tỷ muội" compound kept); "mày/phấn/son/má/da/mặt {goi}" → "... của {goi}".
4. Typed NPC names that do not exist in a life: Hạ tần (x8), Lệ tần, Lương tần, Lệ phi, Lệ quý nhân, Từ phi, Triệu quý nhân, "Lý công công" (x10) → "một vị tần / quý nhân", "tổng quản thái giám". "Thọ An cung" → Đức Thọ cung (the game's Thái hậu palace).
5. VANPHONG words: "cơ hội" x4 (emp-dislike, staff:kn:lo, ts:warn, beatWait) → dịp / kẽ hở / dịp may; "chắc chắn" x3 → hẳn / ắt / vững vàng.
6. Merged origin/main twice (assemble.py: main's list + the 8 jtone*.js after jvoice.js); site rebuilt.

## Sample-read of W-B's 5,481 lines (5 sub-writers)
Read ~110 random lines + scripted scans of all 7,021. Tone fit is good and the 8 voices are clearly distinct (Lạnh lùng short and dry, Nhiều chuyện gossip, Khiêm nhường self-lowering…); cổ trang register holds; placeholders all valid; no wrong-gender lines found. Repetition: inside a pool/tone no 3-word opening repeats ≥4 times in W-B pools; 68 short lines repeat ACROSS pools (e.g. "Lau đi.", "Chướng mắt." in emp/hh/th slip pools) — acceptable (noRepeat is per pool).
Left as notes (not blocking):
- Dead lines: th pools carry all 8 tones but the Thái hậu only speaks Ân cần/Kín đáo/Kiêu ngạo/Điềm tĩnh; the Emperor never speaks Kiêu ngạo/Nhiều chuyện/Khiêm nhường (BAL.voice.tone maps). Those sub-pools (e.g. a humble Thái hậu "ai gia biết mình chẳng có quyền…") are never shown. Harmless; trim later or keep for a future map.
- greet act predicates (W-A greetSecret/Praise/Health) open alike ("kéo ngươi ra góc…" up to 8/10 per tone) — they must name the act, so kept.
- The game itself names the Thái hậu palace both Đức Thọ cung (353) and Từ Ninh cung (25, old events); tone pools follow both. Whole-game naming is outside this branch.
- Worker's own leftovers stand (ty/man/kid outcome kinds, jrd_*/j95–97 beats not toned) — next job.
- Harness note: a stranger greet card whose NPC is not in the room is dropped by the game; voice-trait-shots.js warns and keeps going.

## Tests on the final sha
node dev/test/tone-pool-check.js: 86 pools, 7,021 lines, OK · voice-trait.js / -b / -c PASS · coop-e2e 63/63 (on 08944bbc) · node dev/test/voice-trait-shots.js: SHOTS OK 
QUICKCHECK on d0a839e8: PASS · 132 s · open 1300 ms · old save ok · core gates PASS (one-core-guard).

~90% xong / ~75% chơi được (giọng theo tính tình: phần lớn lời thoại đã theo tính tình, còn vài loại lời ty/man/kid và beat ngoài j67)

PASS d0a839e8
