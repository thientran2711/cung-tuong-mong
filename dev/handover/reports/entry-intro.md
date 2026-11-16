# entry-intro — narrated intro + entry scene per origin (review/entry-exam, Foreman D worker)

Owner lines: OD:L1244 (every origin: a NARRATED intro with ILLUSTRATIONS + an ENTRY animation), OD:L1251, OD:L1261 (every animation scene
ends with ONE short button). Built with existing kit parts and existing pictures only (no new CSS, no new art).

## What is in the game now (dev/build/jentry.js)
| origin | intro (Tiền truyện) | picture used | entry scene (after the "Nhập cung" card) | its one button |
|---|---|---|---|---|
| tt Con gái Tể tướng | direct road: 2 narrated paragraphs; home road: its own Khuê các card + the origin painting | img/origin-wide-tt | kitPersonReveal: her full figure, "Nhập cung · Con gái Tể tướng · <rank>", one line | Tạ ơn |
| dtq Con gái Đại tướng quân | same | img/origin-wide-dtq | same | Tạ ơn |
| muoi Con gái nhà buôn muối | same | img/origin-wide-muoi | same | Tạ ơn |
| cn Cung nữ được sủng hạnh | direct road / co-op wait (no home road) | img/origin-wide-cn | same | Tạ ơn |
| nc Công chúa Nam Chiếu | direct road: Tiền truyện; home road: its own cố quốc card (already has origin-wide-nc) | img/origin-wide-nc | same | Tạ ơn |
| bd Công chúa Bắc Địch (wakes when review/origins-r1 lands) | same as nc | img/origin-wide-bd | same | Tạ ơn |
| td Con gái tội thần | direct road only (home road keeps kc-lore's card: the family is still alive there) | img/origin-wide-td | same | Tạ ơn |
| ch Cháu gái Thái hậu | same as tt | img/origin-wide-ch | same | Tạ ơn |
| thd Con gái thầy đồ nghèo | same as tt | img/origin-wide-thd | same | Tạ ơn |
| cnv Cung nữ tuyển vào cung | direct road: Tiền truyện; home road: its own thôn quê card (already has origin-wide-cnv) | img/origin-wide-cnv | kitPersonReveal "Nhập cung làm cung nữ" | Theo ma ma |

Parts used: the event card (Q card with `who` + `art`, KIT §32/§50.1), KIT §65.2 `kitPersonReveal` (manual scene: ONLY its kit button
`.kbtn.kmtake` closes it; an outside tap does nothing — tested), which counts as the KIT §81 scene-end button ("scenes that already end with
their own button count as having it"). When §81 `kitSceneEnd` is live on main nothing here needs to change (no auto-close anywhere).

## KIT REQUEST (for the main coordinator / kit keeper — not built here)
1. **Entry animation part (OD:L1244)**: a dedicated "nhập cung" scene on `kmStage` (KIT "Chuyển động"), e.g. the red palace gate (Ngọ môn)
   opening, her sedan / procession crossing, the gate closing behind, then the rank chip (or "Cung nữ") — ending with the §81 button.
   Variants by origin group: consort sedan (tt, dtq, muoi, ch, thd, td) · bridal sedan + foreign envoy (nc, bd: + horses for bd) ·
   maids walking behind a mama (cnv) · the Càn Thanh corridor at night (cn). Until it exists the entry scene is kitPersonReveal (above).
2. kitPersonReveal shows "Ta" as the name when the person is HER (kitName cap for herself). For the entry scene her real name would read
   better ("Liễu Nhược Lan"); a `name` option on kitPersonReveal (kit keeper) would fix it for every caller.

## MISSING ILLUSTRATIONS (main paints samples; then mass production by Foreman C)
Each Tiền truyện card today shows ONE picture (the origin painting, also used by the identity card). A narrated intro reads better with
one picture per paragraph. Needed, 16:9 scene paintings, gpt-2-6, style anchor; no people's faces needed close-up (she is the card's figure):
| # | origin | picture | goes with |
|---|---|---|---|
| 1 | tt | night hall of the Chancellor's mansion, lanterns, officials' shadows | paragraph 1 |
| 2 | tt | the edict of selection laid on a red table in the mansion | paragraph 2 |
| 3 | dtq | border camp: drill field, war drums, banners at dusk | paragraph 1 |
| 4 | muoi | salt boats at a southern river landing, sacks and scales | paragraph 1 |
| 5 | cn | Càn Thanh cung tea room at night, rain on the lattice (ev-nhap-cung-cn exists — check it fits, else paint) | paragraph 2 |
| 6 | nc | Nhĩ Hải lake with the three white pagodas, camellias | paragraph 1 |
| 7 | bd | steppe at sunset, a herd of horses, felt tents | paragraph 1 |
| 8 | td | the sealed mansion gate at night, torches, a paper seal across the door (no blood, no bodies) | paragraph 1 |
| 9 | ch | Từ Ninh cung garden path, the Thái hậu's palace seen from afar | paragraph 1 |
| 10 | thd | thatched house with old bookshelves, rain leaking through the roof | paragraph 1 |
| 11 | cnv | the village hall with the draft list posted, girls in line | paragraph 1 |
| 12 | all | the selection hall (Điện tuyển / Trữ Tú cung) for the "Tuyển chọn" card (ev-tuyen-tu exists — reuse is fine) | Tuyển chọn |
| 13 | all | the entry animation art for KIT REQUEST 1: palace gate (closed / open), red sedan, bridal sedan, envoy horses, mama + maid line | entry scene |

Sizes per PERFORMANCE BUDGET: centre art ≤ ~250 KB WebP at display size; sprites ≤ ~40 KB. All on the CDN (dev/site/cdn_sync.py).
