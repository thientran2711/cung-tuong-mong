# residence-rooms — audit + samples (art worker for Foreman C, 17/11)

START_CTX ≈ 12 % of window (low). No handover needed; task = audit + 8 samples, then STOP.
Owner rule used VERBATIM from dev/OWNER_DECISIONS.md L1490-1491 (17/11 01:45Z / 01:55Z / 02:00Z / 02:05Z): pictures are drawn PER PLACE, every residence of every rank has exactly TWO rooms (chính điện/phòng khách + phòng ngủ), count of residences per rank = that rank's max seats, each room keeps buổi × mùa, one style anchor (rich furnished palace interior), her Hành sự stage = the bedroom of HER residence.

## 1. How main picks backdrops today (origin/main index.html, block "jres", ~line 26140-26300)
- `SCIMG` (line 2611) = map of stage keys → image base. Stage keys relevant: `home` (her room), `rv` (visit room), plus unrelated ones (vuon, thu, dtd, tn, kn, tyv, ksp, lc).
- `resApply()` (wrapper around renderStage / pxScene / evArt) sets `SCIMG.home = resScene(residenceOf(S))` (fallback `tam-cung-dem` = Ngọc Thanh các) and `SCIMG.rv = ...` for a visit (fallback `phi-tan-cung`, one generic room for everybody).
- `residenceOf(p)` → `{pal, part}`. `part` ∈ chinh | dong | tay | cungnhan | ngocthanh | kn | lc. Rank ≥ PAL_HEAD (=3, Tần) with `pal` → `chinh` (this is what the owner saw: Tần Chu Yên Nhiên, Chung Tú cung = `chung-tu-cung-<mùa>-<buổi>`, an open lake veranda). Lower ranks → `dong`/`tay` phối điện of a head, or `ngocthanh` (tam-cung-dem) when no palace.
- Art key = `<slug>-cung[-dong-phoi|-tay-phoi]-<mùa>-<buổi>` (`resBase`/`resPick`); `RES_SLUG` has only 8 slugs; `RES_VAR` lists the 16 variants per room; `resPick` falls back to nearest buổi → xuân → xuân-sáng.
- So today the picture is chosen by PERSON (rank / co-resident slot), not by PLACE, and `chinh` = the head's grand hall. Her Hành sự stage as a chủ vị therefore shows the (open) hall, never her bedroom — this is the bug.
- Seat caps (one core, `BAL.seat`, mirrored by `SEATCAP`): Hoàng hậu 1, Hoàng quý phi 1, Quý phi 2, Phi 4, Tần 6 = **14 residences**. Map: `PALN` = 8 east cung (Cảnh Phúc, Khải Tường, Chung Tú, Hàm An, Thừa Minh, Diên Huy, Vĩnh Hòa, Trường Xuân) + 5 west (Vĩnh Thọ, Dực Khôn, Trữ Tú, Hàm Phúc, Thái Cực điện; added by jpal, no art, `RES_SLUG` has no slug for them → generic fallback) + Càn Ninh (Hoàng hậu, `khon-ninh-cung`) = 14. Ranks below Tần (Đáp ứng / Thường tại / Quý nhân) have no seat cap: they live in a head's phối điện or in Ngọc Thanh các (tam-cung-dem) → I count **Ngọc Thanh các as the 15th, shared low-rank residence** (owner: low-rank shared = small reception room).

## 2. Existing backdrops (live on CDN, 1620x1080 for the 24 palace rooms, 1280x720 for the rest; all 16 variants each = 4 mùa × 4 buổi)
| Image set | Variants | Verdict vs her rule |
|---|---|---|
| `<8 slug>-cung` (chính điện) ×8 | 128 | **BREAKS** — pastel hall whose whole back/side is OPEN to veranda/garden/lake/pavilion (chung-tu = lake colonnade = her screenshot; vinh-hoa = bamboo railing; truong-xuan = railing/bridge; dien-huy = open pavilion colonnade; canh-phuc/khai-tuong/ham-an/thua-minh = round-door/open doors to courtyard). Furnished but reads as a veranda, not a closed palace interior. |
| `<slug>-cung-dong-phoi` / `-tay-phoi` ×16 | 256 | Enclosed furnished rooms. 8 of them have a canopy bed (usable as phòng ngủ): dong-phối of canh-phuc, khai-tuong, dien-huy; tay-phối of chung-tu, ham-an, thua-minh, vinh-hoa, truong-xuan. The other 8 are study / tea / sewing rooms (no bed) → retire. Style = pastel per-palace palette, NOT the red-gold of Ngọc Thanh các → style mismatch with her bedroom backdrop. |
| `tam-cung-dem` (Ngọc Thanh các, her bedroom) | 16 | **ANCHOR** — red/gold canopy bed, lanterns, screen, carpet. Keep. |
| `khon-ninh-cung` (Càn Ninh, throne hall) | 16 | OK as Hoàng hậu CHÍNH ĐIỆN (red/gold, furnished, enclosed-ish). Has no bedroom. |
| `cung-nhan` (servants' row) | 16 | OK (pink dormitory, not a rank residence) — outside this rule. |
| `phi-tan-cung` (generic visit room) | 16 | pink dressing room; obsolete once visits use the target's own place → retire. |
| `lanh-cung` | 16 | ruined courtyard EXTERIOR, deliberately bleak (Lãnh cung = punishment). Not a rank residence; flagged as a question (§5). |
| west palaces (Vĩnh Thọ, Dực Khôn, Trữ Tú, Hàm Phúc, Thái Cực) | 0 | **MISSING** entirely. |
| Càn Ninh phòng ngủ | 0 | **MISSING**. |
(Other sets — tu-ninh, duong-tam-dien, kinh-su-phong, thai-y-vien, tan-gia-kho, nhat-can-chinh, map, … — are not residences.)

## 3. Target table: residence × room × variants (16 each)
| Residence (rank cap) | Chính điện | Phòng ngủ |
|---|---|---|
| Cảnh Phúc, Khải Tường, Chung Tú, Hàm An, Thừa Minh, Diên Huy, Vĩnh Hòa, Trường Xuân (8) | BREAKS (open) → repaint | exists pastel bed room in a phối slot (style mismatch, reusable candidate) |
| Vĩnh Thọ, Dực Khôn, Trữ Tú, Hàm Phúc, Thái Cực (5) | MISSING | MISSING |
| Càn Ninh (HH, 1 seat) | exists (khon-ninh-cung) | MISSING |
| Ngọc Thanh các (shared low rank, 15th) | MISSING (small reception) | exists (tam-cung-dem) = anchor |
Totals: 15 residences × 2 rooms × 16 = **480 images**.
- Option A (uniform, recommended — "one style anchor"): keep tam-cung-dem (16) + khon-ninh chính (16); repaint/make the other **448** → 448 × 65 = **29,120 cr**.
- Option B (keep the 8 existing pastel bed-rooms as phòng ngủ): 448 − 128 = **320** → **20,800 cr**, but 8 of 15 bedrooms stay a different palette from her anchor.
Balance now 1,219,701 cr (plenty).

## 4. Code changes main must make (art-key = PLACE)
1. New key: `<residence-id>-<chinhdien|phongngu>-<mùa>-<buổi>` (residence-id = 14 palace slugs + `ngoc-thanh`), e.g. `chung-tu-phongngu-xuan-sang`. `RES_SLUG` → 14 entries (add the 5 west, `can-ninh`), `RES_VAR` regenerate (gen_res_var.py), KIT_FLOOR / KIT_FANCHOR per new room.
2. Hành sự stage (`S.place==="home"`): always `<her residence>-phongngu` (every rank, also chủ vị, also Ngọc Thanh các = tam-cung-dem). Drop `part` chinh/dong/tay from picture choice.
3. Visit another consort (`rv`): `<THAT person's residence>-chinhdien`; low-rank targets = their shared residence's small chính điện. Visitors to her: existing visit illustration (no place picture).
4. Retire `-dong-phoi` / `-tay-phoi` picture keys, `phi-tan-cung` fallback, and `part` in `resScene`; keep resPick fallback chain (nearest buổi → xuân).
5. Residence assignment must follow the seat table (14 + Ngọc Thanh các) so each palace maps to exactly one bedroom + one reception.
6. 3072x2048 raw gens → webp 1620x1080 (the 24 current ones are 1620x1080; tam-cung-dem 1280x720); upload to CDN only after owner OK.

## 5. Questions for C / owner (not blocking samples)
- Lãnh cung: keep as a deliberately ruined exterior, or also a furnished (poor-but-furnished) room? (rule says every place has bedroom + reception)
- Which of the 14 palaces is which rank is dynamic (jpal) → bedroom/reception per palace are drawn once, by palace.
- Bedroom layout: samples re-use the anchor's composition (bed left, screen, window right) — fine for one palace; for the batch I will vary camera/furniture per palace so the 14 bedrooms are not clones.

## 6. SAMPLES (8 images, 520 cr, Magnific gpt-2-6, 2K 3:2, reference = tam-cung-dem-xuan-sang, all looked at)
Season xuân; buổi sáng + tối; no people. Night = edit of the morning image.
- High-rank: **Chung Tú cung** (the owner's screenshot palace): chính điện + phòng ngủ — wisteria blue/silver/gold, gilded armchair on a dais, painted wisteria screen, side chairs, enclosed lattice walls (no open veranda/lake), canopy bed.
- Low-rank shared: **Trữ Tú cung** (a west palace without art today): small chính điện (jade-green/rose, small dais, tea table, shelf) + phòng ngủ.
- Sheet: `dev/handover/reports/residence-rooms/sheet-samples.jpg` (4 rows: Chung Tú chính sáng|tối, Chung Tú ngủ sáng|tối, Trữ Tú chính sáng|tối, Trữ Tú ngủ sáng|tối). Before/after: `sheet-before-after.jpg` (live Chung Tú | new | anchor).
- Full-res (3072x2048) in the Magnific Personal folder — creations: Chung Tú chính sáng Xm4Q8l2Bfo, tối rgdPsGSxtc; Chung Tú ngủ sáng fHGxuNNCDY, tối gOt37TGSXO; Trữ Tú chính sáng Xm4Q8UzBfo, tối lJIiwTIgv9; Trữ Tú ngủ sáng 1leyjT3r4r, tối O6Cz98bynm (https://www.magnific.com/app/creation/<id>). Not on the CDN yet (no live upload before OK).
- Self-check: all 8 enclosed, furnished, rich, same red-gold lantern/gilded-wood/silk-canopy style as Ngọc Thanh các, no people, no text, night versions keep the room with lit lanterns + moon in windows. Weak points: bedrooms are close in composition to the anchor; the Trữ Tú "small" hall still looks fairly large (can be shrunk further).
- In-game stage shot: NOT done — the stage needs a live save + code (resolver above) that does not exist yet; the before/after sheet stands in.

STOP here: no batch, no upload until C relays the owner's OK.
