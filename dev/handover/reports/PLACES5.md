# PLACES5 — owner L2391 "Chỗ không phải cửa sổ cũng thành cửa sổ" (structure-true window fix) · L2392 "Sửa đi" = GO
depth 5 · START_CTX ~4 % (get_session read 0; own estimate) · coordinator ROOT-C5 session_01D3E3Na19R1KD7i2QJSJgsf

## Rules (0 cr)
- `rule.py set L30` (Lượt 2391): WINDOW RULE STRUCTURE-TRUE — drapes off REAL windows only; never wall/column/niche/shrine → window; no new openings; no sash opened unless already open; hangings on walls/niches/shrines stay; hung objects on solid wall.
- `dev/art/common_blocks/window_L30.txt` = new text; L2389 text frozen as `window_L30_v2_L2389.txt` (builder job 2389 now reads it → -40..45 prompts byte-identical).
- `rule.py add G` → **G78 STRUCTURE CHECK** (owner L2391 verbatim); same line in START_ART_WORKER.md §4.
- Khôn Ninh: untouched (old approved live picture stays; swap_L2387_khon.py NOT run).

## OLD vs NEW check of the L2389 set (sheet L2389-old-new.jpg)
| room | L2389 pic | verdict |
|---|---|---|
| A ca sở | -40 | REDO: wall behind the bed became a window |
| Thượng thư phòng | -41 | KEEP: right window wall, columns, transoms same; original already showed garden through the opening |
| Ngự thư phòng | -42 | REDO: a big sash swung open that the original did not have |
| Phi tần cung | -43 | KEEP: window wall + moon gate same (note: lattice frames turned pale green — colour, not structure) |
| Từ Ninh | -44 | REDO: shrine hanging removed, window behind the Buddha |
| Đông cung | -45 | REDO: map floating on a window |

## Builder job 2391 (prompts_places_L2376.py): record prompts M2370-47..51 from the ORIGINAL approved prompts (window clause only + L30 block); room_gate PASS; keep_check --sidecar PASS ×5; all older prompt txt byte-identical.
## Gens — EDITs of the ORIGINAL approved pictures, gpt-2-6 2k 2688×1386, 135 cr each
| code | key | from | gen id | structure check |
|---|---|---|---|---|
| M2370-47 | a-ca-so-r7 | -31 vQG5MOsa47 | Bh6FuAPoQR | walls/pillars same; left real windows: drapes off → zitan lattice + gauze, shut; bed + all bed curtains same, wall behind bed solid; bow, sword, scroll, screen, bookcase same |
| M2370-48 | ngu-thu-phong-r6 | -26 O6u9Co7ynm | UPaZ3HMwny | left window same opening, shut lattice, no open sash; red dragon pillars, dragon screen, bookcase, desk/dais same |
| M2370-49 | tu-ninh-cung-r5 | -25 MBOd7xtDCm | 1lXyJvWr4r | left shrine + Buddha + its amber hangings kept, wall behind it solid; right window drapes off → red lattice + gauze, shut; pillars, screen, daybed, chairs same |
| M2370-50 | dong-cung-r4 | -14 6A5ZvesiJO | 3zkMTSmREY | REJECTED by my check (not sent): faithful to the original, where the map ALREADY hangs in front of a window → still floats |
| M2370-51 | dong-cung-r5 | -14 6A5ZvesiJO | eI4EC9GdqL | left drapes off → gilt lattice + gauze, shut; right: map on a solid carved red-lacquer wall panel, lattice transom only above; bookcases, sword stand, desk, screen, banners same |
Credits: 5 × 135 = **675 cr**. Pictures: img/_review/place-rank/places-l2370/<key>-ha-sang.webp (CDN). Sheet (4 rows, -50 left out): https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/places-l2370/people/L2391-old-new.jpg
Ledger 5 lines; MA_HINH M2370-47..51.

## Swap (after the owner's OK only)
swap_L2370.py picks the highest rN: a-ca-so←-47 (r7), ngu-thu-phong←-48 (r6), tu-ninh-cung←-49 (r5), dong-cung←-51 (r5), thuong-thu-phong←-41 (r7), phi-tan-cung←-43 (r3). Its dry run needs every review picture downloaded locally first. Khôn Ninh: no swap.
## 29 rooms: CANCELLED (ROOT-C5 00:17Z: MAIN 106 order — Group 2 CLOSED, C stops painting). Not started.
## STATE: STOPPED. No more gens. Total 675 cr (4 planned redos + 1 Đông cung retry, -50 self-rejected). Open: owner verdict on the L2391 sheet → swap only after her OK.
