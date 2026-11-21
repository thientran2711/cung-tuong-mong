# J3 INDEX: act / dialog / banner pictures (KP23) + tall iPad figure-column backgrounds (M45)

PRIORITY #1 CHECK ('KP23|M45|act-pics|mgbg|figure-column'): OD 0 for new art wording | ledger 0 | claims: C art rows only on the outfit loop | origin/main: prompts2.py --todo, meanings.py, gens2.txt (427 keys), assets.json (1366 img/act-*, 280 img/ev-*, 0 img/mgbg-*) READ and REUSED | handover prompts_L2095 + dev/art read for style (MASTER_COMMON via _lib) | archive: PROGRESS_review-act-pics2.md, act-pics-d14 report. Nothing re-invented: scene text = meanings.py scenes, style = _lib sentences.

ART LAW A53 (owner verbatim): 'Tiếp đến là bây giờ tôi đã có thể à, vẽ ảnh bằng ChatGPT rồi, bạn không có dùng Magnific để vẽ nữa.' No Magnific call was made, no credit spent; this folder only holds paste-ready prompt files.

## How to use
1. New ChatGPT chat per picture. Attach the style reference `dev/handover/prompts_L2095/refs/mau_net_ve.jpg` (REF_STYLE). 2. Paste the whole `.txt` (ONE message). 3. Ask for ONE image. 4. Look at it (hands, no visible face, no text), then give it to C / the coordinator for the usual cut: act pictures centre-crop to 384:506 webp q82 (`dev/figwork/acts/fetchb.py` recipe), backdrops per the table. No identity reference is needed anywhere in J3: every act picture shows people far away, from behind or in silhouette (rule N1), and the backdrops hold no person.
5. Regenerate the files: `python3 dev/art/prompts/J3/gen_J3.py && python3 dev/art/prompts/J3/gen_index_J3.py` (reads meanings.py, gens2.txt, assets.json and the mini-game kind tables; no hand-typed key lists except the English scenery of the 35 mini-game places).

## Counts

| set | prompt files | note |
|---|---|---|
| KP23 act pictures still missing | 276 | of 284 keys the queue `prompts2.py --todo` would still list (8 are already in assets.json, skipped). Tone: 108 LIGHT / 168 DARK. 8 of them also have an old Magnific id in pending2.txt (see Open questions) |
| KP23 dialog banners | 0 | all 121 keys of dlg_scenes.txt exist as img/ev-<key>.webp in assets.json: nothing left to draw (the '97 of 121 left' in PROGRESS is stale) |
| KP23 outer outing places | 4 | Ngự uyển ngoài + chùa Hộ Quốc, portrait + landscape (L10); no code key yet |
| M45 tall figure-column backgrounds | 35 | one per mini-game kind; img/mgbg-<kind>.webp |
| TOTAL | 315 | |

### Act pictures by meaning group (rule N3)

| meaning group | count | LIGHT | DARK |
|---|---|---|---|
| Arts / study | 1 | 1 | 0 |
| Grooming / rest | 6 | 6 | 0 |
| Servants and palace staff | 25 | 20 | 5 |
| Alms / rites / festivals | 35 | 32 | 3 |
| Schemes | 118 | 0 | 118 |
| Punishment / cold palace / pardon | 35 | 0 | 35 |
| Maid status / promotion / selection | 15 | 12 | 3 |
| System lines of the week book (Tong luoc) | 41 | 37 | 4 |

## Target sizes and where the code reads them

- ACT pictures: key `img/act-<key>.webp`, 3:4 portrait; ask ChatGPT for 768x1024, ship centre-cropped to 384:506 (384x506 webp q82, existing live ones are 50-60 KB, keep <= 60 KB): `dev/figwork/acts/fetchb.py:1` and `fetch.py:26` (A=384/506). Read by `dev/build/j79.js:803` (kitActArt: `src:img/act-${key}.webp`), `j79.js:1014`, `j87.js:369/383/394`; the key is mapped from the book line by the `log` regexes of img/ACTS.json (built from `dev/figwork/acts/meanings.py`, `build_acts.py`), so a new file needs the ACTS.json patch and `cdn_sync` (coordinator).
- M45 backdrops: key `img/mgbg-<kind>.webp` from `dev/build/j82.js:102` (`KG82_MGBG` proxy, `img/mgbg-${k}.webp`), applied by `dev/build/j79.js:650-651` (`kitGameFig`, `--mgbg` + `.kgf-bg`) and CSS `j79.js:688` (`background:var(--mgbg) center/cover no-repeat`); a missing file = the cream gradient. Column size: `j79.js:640` grid `minmax(150px,30%) minmax(0,1fr)` of the frame body (frame width `--kpw` 560 px on iPad 1180, 620 px from 1200 wide, height `--kph` <= 720, KIT.md:412-416; `.kgfig` margin 10px 0 10px 14px, `j79.js:~686`), so the column is about 155-185 px wide x 480-600 px tall = ratio about 0.30-0.35 (my arithmetic, not measured: see Open questions). Prompt asks for a 2:3 source (1024x1536) with all content in the central 45 percent; deliver as webp, tall, <= 120 KB (suggest crop 512x1024 centre, 1:2, so `cover` loses only the side margins). The player's figure fills the column from the bottom, so the lower middle of every backdrop is left open. Wide screen only (html.kv2); Fold (kv1) has no column (KIT.md:679).
- Outings: portrait 768x1024 and landscape 1024x768 (L10). No code reads them yet (`PROGRESS_review-act-pics2`/`act-split-w2` say 'Dư đồ outer picture ... ART NEEDED'); keys below are PROPOSED.

## M45 table (35 mini-game kinds: every key of KG82_KIND that reaches kg82Frame, kg82Pic skips duho/den/may which have no picture column)

| code | key | prompt file | refs to attach | target | read at | note |
|---|---|---|---|---|---|---|
| AJ3-M45-01 | img/mgbg-dan.webp | mgbg-dan.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Đàn, LIGHT |
| AJ3-M45-02 | img/mgbg-hat.webp | mgbg-hat.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Hát, LIGHT |
| AJ3-M45-03 | img/mgbg-co.webp | mgbg-co.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Cờ, LIGHT |
| AJ3-M45-04 | img/mgbg-co7.webp | mgbg-co7.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Cờ năm quân, LIGHT |
| AJ3-M45-05 | img/mgbg-dauho.webp | mgbg-dauho.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Đầu hồ, LIGHT |
| AJ3-M45-06 | img/mgbg-ban.webp | mgbg-ban.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Bắn cung, LIGHT |
| AJ3-M45-07 | img/mgbg-tho.webp | mgbg-tho.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Thơ, LIGHT |
| AJ3-M45-08 | img/mgbg-doi.webp | mgbg-doi.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Câu đối, LIGHT |
| AJ3-M45-09 | img/mgbg-doden.webp | mgbg-doden.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Thắp đèn, LIGHT |
| AJ3-M45-10 | img/mgbg-ve.webp | mgbg-ve.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Vẽ, LIGHT |
| AJ3-M45-11 | img/mgbg-hoa.webp | mgbg-hoa.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Cắm hoa, LIGHT |
| AJ3-M45-12 | img/mgbg-theu.webp | mgbg-theu.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Thêu, LIGHT |
| AJ3-M45-13 | img/mgbg-kim.webp | mgbg-kim.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Khéo tay, LIGHT |
| AJ3-M45-14 | img/mgbg-mua.webp | mgbg-mua.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Múa, LIGHT |
| AJ3-M45-15 | img/mgbg-banh.webp | mgbg-banh.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Nấu ăn, LIGHT |
| AJ3-M45-16 | img/mgbg-huong.webp | mgbg-huong.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Điều hương, LIGHT |
| AJ3-M45-17 | img/mgbg-chai.webp | mgbg-chai.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Chải chuốt, LIGHT |
| AJ3-M45-18 | img/mgbg-hoadien.webp | mgbg-hoadien.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Dán hoa điền, LIGHT |
| AJ3-M45-19 | img/mgbg-le.webp | mgbg-le.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Lễ nghi, LIGHT |
| AJ3-M45-20 | img/mgbg-tc.webp | mgbg-tc.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Trị cung, LIGHT |
| AJ3-M45-21 | img/mgbg-xa.webp | mgbg-xa.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Xử án, LIGHT |
| AJ3-M45-22 | img/mgbg-thq.webp | mgbg-thq.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Thái hậu hỏi, LIGHT |
| AJ3-M45-23 | img/mgbg-nghe.webp | mgbg-nghe.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | nghe, DARK |
| AJ3-M45-24 | img/mgbg-truyen.webp | mgbg-truyen.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | truyen, LIGHT |
| AJ3-M45-25 | img/mgbg-mac.webp | mgbg-mac.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | mac, LIGHT |
| AJ3-M45-26 | img/mgbg-thoico.webp | mgbg-thoico.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | thoico, LIGHT |
| AJ3-M45-27 | img/mgbg-thu_tam.webp | mgbg-thu_tam.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Chải lông thú, LIGHT |
| AJ3-M45-28 | img/mgbg-thu_choi.webp | mgbg-thu_choi.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Chơi với thú, LIGHT |
| AJ3-M45-29 | img/mgbg-tuoi.webp | mgbg-tuoi.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Tưới cây, LIGHT |
| AJ3-M45-30 | img/mgbg-tat.webp | mgbg-tat.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Tát, DARK |
| AJ3-M45-31 | img/mgbg-ne.webp | mgbg-ne.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Né, DARK |
| AJ3-M45-32 | img/mgbg-td_cong.webp | mgbg-td_cong.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Công, LIGHT |
| AJ3-M45-33 | img/mgbg-td_dung.webp | mgbg-td_dung.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Dung, LIGHT |
| AJ3-M45-34 | img/mgbg-td_ngon.webp | mgbg-td_ngon.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Ngôn, LIGHT |
| AJ3-M45-35 | img/mgbg-td_hanh.webp | mgbg-td_hanh.txt | REF_STYLE | tall webp, gen 2:3 1024x1536, ship 512x1024 <= 120 KB | j82.js:102, j79.js:650 | Hạnh, LIGHT |

## Outer outing places

| code | key (proposed) | prompt file | refs | target | read at | note |
|---|---|---|---|---|---|---|
| AJ3-OUT-01 | (no key yet) proposed img/outing-ngu-uyen-ngoai-port.webp | outing-ngu-uyen-ngoai-port.txt | REF_STYLE | webp 768x1024 | none yet | LIGHT, empty establishing backdrop |
| AJ3-OUT-02 | (no key yet) proposed img/outing-ngu-uyen-ngoai-land.webp | outing-ngu-uyen-ngoai-land.txt | REF_STYLE | webp 1024x768 | none yet | LIGHT, empty establishing backdrop |
| AJ3-OUT-03 | (no key yet) proposed img/outing-chua-ho-quoc-port.webp | outing-chua-ho-quoc-port.txt | REF_STYLE | webp 768x1024 | none yet | LIGHT, empty establishing backdrop |
| AJ3-OUT-04 | (no key yet) proposed img/outing-chua-ho-quoc-land.webp | outing-chua-ho-quoc-land.txt | REF_STYLE | webp 1024x768 | none yet | LIGHT, empty establishing backdrop |

## KP23 act pictures, by meaning group

### Arts / study (1)

| code | key | prompt file | refs | target | read at | note |
|---|---|---|---|---|---|---|
| AJ3-KP23-001 | img/act-van-dong-do-dau.webp | act-van-dong-do-dau.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT; old Magnific id in pending2.txt |

### Grooming / rest (6)

| code | key | prompt file | refs | target | read at | note |
|---|---|---|---|---|---|---|
| AJ3-KP23-002 | img/act-chai-chuot-nhan-sac.webp | act-chai-chuot-nhan-sac.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT; old Magnific id in pending2.txt |
| AJ3-KP23-003 | img/act-nghi-lay-suc.webp | act-nghi-lay-suc.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT; old Magnific id in pending2.txt |
| AJ3-KP23-004 | img/act-o-yen-nghi.webp | act-o-yen-nghi.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT; old Magnific id in pending2.txt |
| AJ3-KP23-005 | img/act-tinh-duong.webp | act-tinh-duong.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT; old Magnific id in pending2.txt |
| AJ3-KP23-006 | img/act-ngu-som.webp | act-ngu-som.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT; old Magnific id in pending2.txt |
| AJ3-KP23-007 | img/act-o-cung-giu-am.webp | act-o-cung-giu-am.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT; old Magnific id in pending2.txt |

### Servants and palace staff (25)

| code | key | prompt file | refs | target | read at | note |
|---|---|---|---|---|---|---|
| AJ3-KP23-008 | img/act-ban-thuong.webp | act-ban-thuong.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT; old Magnific id in pending2.txt |
| AJ3-KP23-009 | img/act-dung-sau-hau-chu.webp | act-dung-sau-hau-chu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-010 | img/act-day-le-nghi.webp | act-day-le-nghi.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-011 | img/act-cau-xin-quan-su.webp | act-cau-xin-quan-su.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-012 | img/act-quan-su-gat-dau.webp | act-quan-su-gat-dau.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-013 | img/act-bi-quan-su-bat-gap.webp | act-bi-quan-su-bat-gap.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-014 | img/act-cui-dau-nhan-loi.webp | act-cui-dau-nhan-loi.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-015 | img/act-khoc-xin-tha.webp | act-khoc-xin-tha.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-016 | img/act-cai-lai.webp | act-cai-lai.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-017 | img/act-vang-lenh.webp | act-vang-lenh.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-018 | img/act-mat-bao-hh.webp | act-mat-bao-hh.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-019 | img/act-mat-bao-cho.webp | act-mat-bao-cho.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-020 | img/act-len-bao-tin.webp | act-len-bao-tin.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-021 | img/act-thanh-minh.webp | act-thanh-minh.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-022 | img/act-dut-bac-rut-loi.webp | act-dut-bac-rut-loi.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-023 | img/act-cui-dau-thua-ten.webp | act-cui-dau-thua-ten.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-024 | img/act-bi-bat-tra-khao.webp | act-bi-bat-tra-khao.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-025 | img/act-viec-khong-thanh.webp | act-viec-khong-thanh.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-026 | img/act-nang-so-viec-nguy.webp | act-nang-so-viec-nguy.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-027 | img/act-doan-ra-do-minh.webp | act-doan-ra-do-minh.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-028 | img/act-bat-gap-trao-anh-mat.webp | act-bat-gap-trao-anh-mat.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-029 | img/act-nhan-toi-thay.webp | act-nhan-toi-thay.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-030 | img/act-de-nang-chiu-don.webp | act-de-nang-chiu-don.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-031 | img/act-lam-ngo.webp | act-lam-ngo.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-032 | img/act-mua-lay.webp | act-mua-lay.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |

### Alms / rites / festivals (35)

| code | key | prompt file | refs | target | read at | note |
|---|---|---|---|---|---|---|
| AJ3-KP23-033 | img/act-dua-com-ao.webp | act-dua-com-ao.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-034 | img/act-li-xi.webp | act-li-xi.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-035 | img/act-nau-chao-phat.webp | act-nau-chao-phat.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-036 | img/act-nau-che-mung.webp | act-nau-che-mung.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-037 | img/act-chep-kinh.webp | act-chep-kinh.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-038 | img/act-theu-khan-ban-lc.webp | act-theu-khan-ban-lc.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-039 | img/act-trai-gioi.webp | act-trai-gioi.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-040 | img/act-le-tru-ta.webp | act-le-tru-ta.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-041 | img/act-rinh-bat-gia-ma.webp | act-rinh-bat-gia-ma.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-042 | img/act-ke-gia-ma.webp | act-ke-gia-ma.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-043 | img/act-goi-banh-u.webp | act-goi-banh-u.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-044 | img/act-tui-ngai.webp | act-tui-ngai.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-045 | img/act-cuoc-thuyen-rong.webp | act-cuoc-thuyen-rong.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-046 | img/act-thuyen-ve-nhat.webp | act-thuyen-ve-nhat.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-047 | img/act-theo-len-nui.webp | act-theo-len-nui.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-048 | img/act-ruou-cuc.webp | act-ruou-cuc.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-049 | img/act-tha-den-cau-sieu.webp | act-tha-den-cau-sieu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-050 | img/act-cung-phi-tan-oan.webp | act-cung-phi-tan-oan.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-051 | img/act-muon-le-do-hoi.webp | act-muon-le-do-hoi.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-052 | img/act-muon-dip-do-tin.webp | act-muon-dip-do-tin.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-053 | img/act-theo-hau-le-te.webp | act-theo-hau-le-te.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-054 | img/act-dang-ngoc-nhu-y.webp | act-dang-ngoc-nhu-y.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-055 | img/act-le-mon.webp | act-le-mon.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-056 | img/act-dang-cau-doi.webp | act-dang-cau-doi.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-057 | img/act-giai-cau-do-den.webp | act-giai-cau-do-den.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-058 | img/act-dao-den.webp | act-dao-den.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-059 | img/act-tha-den-cau-con.webp | act-tha-den-cau-con.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-060 | img/act-tao-mo.webp | act-tao-mo.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-061 | img/act-banh-trung-thu.webp | act-banh-trung-thu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-062 | img/act-lam-banh-cho-con.webp | act-lam-banh-cho-con.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-063 | img/act-don-giao-thua.webp | act-don-giao-thua.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-064 | img/act-viet-cau-doi.webp | act-viet-cau-doi.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-065 | img/act-thu-mui-ten.webp | act-thu-mui-ten.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-066 | img/act-cuoc-thien-xa.webp | act-cuoc-thien-xa.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-067 | img/act-hoi-phuong.webp | act-hoi-phuong.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |

### Schemes (118)

| code | key | prompt file | refs | target | read at | note |
|---|---|---|---|---|---|---|
| AJ3-KP23-068 | img/act-sai-di-do-la.webp | act-sai-di-do-la.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-069 | img/act-nho-do-tin.webp | act-nho-do-tin.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-070 | img/act-do-la-duoc.webp | act-do-la-duoc.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-071 | img/act-nghe-len-duoc.webp | act-nghe-len-duoc.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-072 | img/act-nap-nghe-bi-bat.webp | act-nap-nghe-bi-bat.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-073 | img/act-len-cai.webp | act-len-cai.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-074 | img/act-ke-len-cai-bi-bat.webp | act-ke-len-cai-bi-bat.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-075 | img/act-tim-thay-hinh-nhan.webp | act-tim-thay-hinh-nhan.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-076 | img/act-vu-oan-bi-lo.webp | act-vu-oan-bi-lo.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-077 | img/act-dao-duoc-hinh-nhan-trieu.webp | act-dao-duoc-hinh-nhan-trieu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-078 | img/act-hinh-nhan-lan-goc.webp | act-hinh-nhan-lan-goc.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-079 | img/act-khap-cung-don.webp | act-khap-cung-don.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-080 | img/act-loi-don-khong-ai-tin.webp | act-loi-don-khong-ai-tin.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-081 | img/act-loi-don-phung-phi.webp | act-loi-don-phung-phi.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-082 | img/act-ly-gian-khong-tin.webp | act-ly-gian-khong-tin.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-083 | img/act-ngam-doc-dan.webp | act-ngam-doc-dan.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-084 | img/act-trung-doc.webp | act-trung-doc.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-085 | img/act-trung-doc-thuoc-giai.webp | act-trung-doc-thuoc-giai.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-086 | img/act-thuoc-doc-bi-phat-hien.webp | act-thuoc-doc-bi-phat-hien.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-087 | img/act-bat-thuoc-bi-do.webp | act-bat-thuoc-bi-do.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-088 | img/act-hoang-hau-bang-ha-tra.webp | act-hoang-hau-bang-ha-tra.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-089 | img/act-cai-ba-do.webp | act-cai-ba-do.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-090 | img/act-pha-hoc-lo.webp | act-pha-hoc-lo.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-091 | img/act-bi-day-xuong-ho.webp | act-bi-day-xuong-ho.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-092 | img/act-to-giac-truoc-hh.webp | act-to-giac-truoc-hh.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-093 | img/act-to-giac-truoc-ht.webp | act-to-giac-truoc-ht.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-094 | img/act-to-giac-truoc.webp | act-to-giac-truoc.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-095 | img/act-to-giac-khong-thanh.webp | act-to-giac-khong-thanh.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-096 | img/act-to-loi-voi-chu.webp | act-to-loi-voi-chu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-097 | img/act-to-khong-tin.webp | act-to-khong-tin.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-098 | img/act-ke-toi.webp | act-ke-toi.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-099 | img/act-hh-nghe-giang.webp | act-hh-nghe-giang.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-100 | img/act-hh-gat-loi.webp | act-hh-gat-loi.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-101 | img/act-hh-bac-chung-cu.webp | act-hh-bac-chung-cu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-102 | img/act-trinh-len-ht.webp | act-trinh-len-ht.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-103 | img/act-so-lo-chuoc-chung-cu.webp | act-so-lo-chuoc-chung-cu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-104 | img/act-khong-chiu-dua-bac.webp | act-khong-chiu-dua-bac.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-105 | img/act-giu-chung-cu.webp | act-giu-chung-cu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-106 | img/act-ghi-nho-chung-cu.webp | act-ghi-nho-chung-cu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-107 | img/act-cat-giu-con-tin.webp | act-cat-giu-con-tin.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-108 | img/act-chung-cu-bi-huy.webp | act-chung-cu-bi-huy.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-109 | img/act-hop-muu.webp | act-hop-muu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-110 | img/act-hop-muu-lo.webp | act-hop-muu-lo.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-111 | img/act-bi-phat-giac-dinh.webp | act-bi-phat-giac-dinh.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-112 | img/act-tu-thong-ban-chet.webp | act-tu-thong-ban-chet.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-113 | img/act-dut-bac-bit-mieng.webp | act-dut-bac-bit-mieng.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-114 | img/act-diet-khau.webp | act-diet-khau.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-115 | img/act-thai-giam-chet-duoi.webp | act-thai-giam-chet-duoi.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-116 | img/act-dut-bac-dap-don.webp | act-dut-bac-dap-don.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-117 | img/act-tim-ke-tung-tin.webp | act-tim-ke-tung-tin.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-118 | img/act-de-loi-don-lan.webp | act-de-loi-don-lan.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-119 | img/act-khiem-nhuong-choi-tu.webp | act-khiem-nhuong-choi-tu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-120 | img/act-bay-ke-phan-gian.webp | act-bay-ke-phan-gian.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-121 | img/act-bo-bac-chuoc.webp | act-bo-bac-chuoc.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-122 | img/act-bo-mac.webp | act-bo-mac.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-123 | img/act-tra-bac-thay.webp | act-tra-bac-thay.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-124 | img/act-diet-ke-tong-tien.webp | act-diet-ke-tong-tien.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-125 | img/act-de-ong-tu-lo.webp | act-de-ong-tu-lo.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-126 | img/act-mua-chuoc-khtg.webp | act-mua-chuoc-khtg.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-127 | img/act-mua-chuoc-ccti.webp | act-mua-chuoc-ccti.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-128 | img/act-can-rang-chiu.webp | act-can-rang-chiu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-129 | img/act-dung-ra-noi-do.webp | act-dung-ra-noi-do.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-130 | img/act-do-them-dau.webp | act-do-them-dau.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-131 | img/act-im-lang.webp | act-im-lang.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-132 | img/act-quy-xin-tha-cho-nang.webp | act-quy-xin-tha-cho-nang.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-133 | img/act-dung-xem.webp | act-dung-xem.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-134 | img/act-them-loi-buoc-toi.webp | act-them-loi-buoc-toi.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-135 | img/act-len-gui-bac-nha.webp | act-len-gui-bac-nha.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-136 | img/act-khong-can-du.webp | act-khong-can-du.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-137 | img/act-quay-lung-bo-di.webp | act-quay-lung-bo-di.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-138 | img/act-truy-ngu-thien.webp | act-truy-ngu-thien.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-139 | img/act-doi-nguoi-nau.webp | act-doi-nguoi-nau.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-140 | img/act-khoc-ke-ht.webp | act-khoc-ke-ht.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-141 | img/act-dot-ngay-lan-dau.webp | act-dot-ngay-lan-dau.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-142 | img/act-keu-oan.webp | act-keu-oan.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-143 | img/act-nho-th-dung-ra.webp | act-nho-th-dung-ra.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-144 | img/act-day-toi-cung-nu.webp | act-day-toi-cung-nu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-145 | img/act-xin-ht-tra-xet.webp | act-xin-ht-tra-xet.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-146 | img/act-thu-long.webp | act-thu-long.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-147 | img/act-mat-tau.webp | act-mat-tau.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-148 | img/act-theo-cha-muu.webp | act-theo-cha-muu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-149 | img/act-cam-quan-vay-cung.webp | act-cam-quan-vay-cung.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-150 | img/act-hh-bi-phe.webp | act-hh-bi-phe.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-151 | img/act-vien-co-thoai-thac.webp | act-vien-co-thoai-thac.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-152 | img/act-bo-bac-lo-lot.webp | act-bo-bac-lo-lot.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-153 | img/act-vang-menh.webp | act-vang-menh.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-154 | img/act-trung-co-quoc.webp | act-trung-co-quoc.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-155 | img/act-giau-ong.webp | act-giau-ong.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-156 | img/act-tim-chung-cu-cha.webp | act-tim-chung-cu-cha.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-157 | img/act-dieu-tra-an-cu.webp | act-dieu-tra-an-cu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-158 | img/act-tim-chung-cu-minh-oan.webp | act-tim-chung-cu-minh-oan.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-159 | img/act-hoi-chuyen-cu.webp | act-hoi-chuyen-cu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-160 | img/act-dang-thu-ht.webp | act-dang-thu-ht.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-161 | img/act-nho-dua-thu-keu-oan.webp | act-nho-dua-thu-keu-oan.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-162 | img/act-bi-bat-mang-thu-lanh-cung.webp | act-bi-bat-mang-thu-lanh-cung.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-163 | img/act-an-cu-duoc-lat.webp | act-an-cu-duoc-lat.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-164 | img/act-lat-an-tien-de.webp | act-lat-an-tien-de.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-165 | img/act-xu-tram.webp | act-xu-tram.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-166 | img/act-tau-xin-nguoi-cua-cha.webp | act-tau-xin-nguoi-cua-cha.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-167 | img/act-bi-bat-buon-lau.webp | act-bi-bat-buon-lau.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-168 | img/act-ban-len.webp | act-ban-len.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-169 | img/act-cam-co.webp | act-cam-co.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-170 | img/act-chuoc-lai.webp | act-chuoc-lai.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-171 | img/act-ban.webp | act-ban.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-172 | img/act-may-ao.webp | act-may-ao.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-173 | img/act-tam-doc.webp | act-tam-doc.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-174 | img/act-nghiem-doc.webp | act-nghiem-doc.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-175 | img/act-thai-y-phat-hien.webp | act-thai-y-phat-hien.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-176 | img/act-thai-y-khong-thay-la.webp | act-thai-y-khong-thay-la.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-177 | img/act-kiem-tra-ruong.webp | act-kiem-tra-ruong.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-178 | img/act-kiem-tra-ruong-sach.webp | act-kiem-tra-ruong-sach.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-179 | img/act-tich-thu-co-co.webp | act-tich-thu-co-co.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-180 | img/act-tich-thu-vo-co.webp | act-tich-thu-vo-co.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-181 | img/act-hh-ban-cho.webp | act-hh-ban-cho.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-182 | img/act-duoc-ban.webp | act-duoc-ban.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-183 | img/act-an-thuong.webp | act-an-thuong.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-184 | img/act-hh-thuong-hien-thuc.webp | act-hh-thuong-hien-thuc.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-185 | img/act-tro-ve-lanh-cung-nuoi.webp | act-tro-ve-lanh-cung-nuoi.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |

### Punishment / cold palace / pardon (35)

| code | key | prompt file | refs | target | read at | note |
|---|---|---|---|---|---|---|
| AJ3-KP23-186 | img/act-bi-giang.webp | act-bi-giang.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-187 | img/act-bi-cam-tuc.webp | act-bi-cam-tuc.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-188 | img/act-bi-ban-chet.webp | act-bi-ban-chet.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-189 | img/act-tha-toi-chet.webp | act-tha-toi-chet.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-190 | img/act-vao-lanh-cung.webp | act-vao-lanh-cung.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-191 | img/act-roi-lanh-cung.webp | act-roi-lanh-cung.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-192 | img/act-dem-dong-lanh-cung.webp | act-dem-dong-lanh-cung.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-193 | img/act-duoc-an-xa-ve-cung.webp | act-duoc-an-xa-ve-cung.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-194 | img/act-thai-hau-quo-trach.webp | act-thai-hau-quo-trach.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-195 | img/act-vuong-gia-quo-trach.webp | act-vuong-gia-quo-trach.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-196 | img/act-cach-chuc-bien-ai.webp | act-cach-chuc-bien-ai.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-197 | img/act-thai-hau-bang-ha.webp | act-thai-hau-bang-ha.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-198 | img/act-nhan-sac-phai.webp | act-nhan-sac-phai.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-199 | img/act-gai-ngua-yen-tiec.webp | act-gai-ngua-yen-tiec.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-200 | img/act-dich-dau-mua.webp | act-dich-dau-mua.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-201 | img/act-nhiem-benh.webp | act-nhiem-benh.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-202 | img/act-benh-chua-giam.webp | act-benh-chua-giam.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-203 | img/act-tu-boc-thuoc.webp | act-tu-boc-thuoc.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-204 | img/act-hau-benh-ca-thang.webp | act-hau-benh-ca-thang.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-205 | img/act-gui-le-van-an.webp | act-gui-le-van-an.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-206 | img/act-gui-bac-chua-benh.webp | act-gui-bac-chua-benh.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-207 | img/act-xin-an-ve-tham.webp | act-xin-an-ve-tham.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-208 | img/act-viet-thu-hoi-han.webp | act-viet-thu-hoi-han.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-209 | img/act-bo-yen-thuc-ben-con.webp | act-bo-yen-thuc-ben-con.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-210 | img/act-moi-thai-y-du-yen.webp | act-moi-thai-y-du-yen.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-211 | img/act-lao-vao-cuu.webp | act-lao-vao-cuu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-212 | img/act-chi-huy-dap-lua.webp | act-chi-huy-dap-lua.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-213 | img/act-tra-ke-phong-hoa.webp | act-tra-ke-phong-hoa.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-214 | img/act-bao-cho.webp | act-bao-cho.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-215 | img/act-giup-mot-tay.webp | act-giup-mot-tay.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-216 | img/act-dung-ra-can.webp | act-dung-ra-can.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-217 | img/act-dung-ve-phia.webp | act-dung-ve-phia.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-218 | img/act-mach-hh.webp | act-mach-hh.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-219 | img/act-mach.webp | act-mach.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-220 | img/act-gop-bac-giau-the.webp | act-gop-bac-giau-the.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |

### Maid status / promotion / selection (15)

| code | key | prompt file | refs | target | read at | note |
|---|---|---|---|---|---|---|
| AJ3-KP23-221 | img/act-tuyen-tu.webp | act-tuyen-tu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-222 | img/act-tau-tuyen-it.webp | act-tau-tuyen-it.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-223 | img/act-tau-tuyen-nhieu.webp | act-tau-tuyen-nhieu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-224 | img/act-vao-cung-phong.webp | act-vao-cung-phong.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-225 | img/act-dau-ba-quan.webp | act-dau-ba-quan.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-226 | img/act-so-hac-can-chinh.webp | act-so-hac-can-chinh.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-227 | img/act-so-khen.webp | act-so-khen.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-228 | img/act-quy-xin-tha.webp | act-quy-xin-tha.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-229 | img/act-xin-th-do-loi.webp | act-xin-th-do-loi.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-230 | img/act-cau-xin.webp | act-cau-xin.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-231 | img/act-nho-nguoi-ben-ngoai.webp | act-nho-nguoi-ben-ngoai.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-232 | img/act-nho-cau-xin.webp | act-nho-cau-xin.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-233 | img/act-nho-minh-oan.webp | act-nho-minh-oan.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-234 | img/act-dang-bac-n.webp | act-dang-bac-n.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-235 | img/act-cat-bong-de-dang.webp | act-cat-bong-de-dang.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |

### System lines of the week book (Tong luoc) (41)

| code | key | prompt file | refs | target | read at | note |
|---|---|---|---|---|---|---|
| AJ3-KP23-236 | img/act-ke-la-vao-phong.webp | act-ke-la-vao-phong.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-237 | img/act-thay-dong-tinh.webp | act-thay-dong-tinh.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-238 | img/act-do-hoi-gia-the.webp | act-do-hoi-gia-the.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-239 | img/act-len-mua-ngoai-cung.webp | act-len-mua-ngoai-cung.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-240 | img/act-ban-ra-ngoai.webp | act-ban-ra-ngoai.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-241 | img/act-chuyen-lo-ra.webp | act-chuyen-lo-ra.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-242 | img/act-cam-do.webp | act-cam-do.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-243 | img/act-chuoc-do.webp | act-chuoc-do.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-244 | img/act-dat-noi-vu.webp | act-dat-noi-vu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-245 | img/act-giau-trong-ruong.webp | act-giau-trong-ruong.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-246 | img/act-tu-tay-ket.webp | act-tu-tay-ket.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-247 | img/act-bay-o-yen-tiec.webp | act-bay-o-yen-tiec.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-248 | img/act-minh-oan.webp | act-minh-oan.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-249 | img/act-nhan-loi-tra-do.webp | act-nhan-loi-tra-do.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-250 | img/act-kham-phong.webp | act-kham-phong.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-251 | img/act-ngu-tu.webp | act-ngu-tu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-252 | img/act-ngu-tu-tim-lai.webp | act-ngu-tu-tim-lai.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-253 | img/act-giau-ngu-tu.webp | act-giau-ngu-tu.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-254 | img/act-ban-hon-con.webp | act-ban-hon-con.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-255 | img/act-cuoi-chinh-phi.webp | act-cuoi-chinh-phi.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | DARK |
| AJ3-KP23-256 | img/act-doi-cung.webp | act-doi-cung.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-257 | img/act-quoc-tang.webp | act-quoc-tang.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-258 | img/act-de-bat-nguoi-hau.webp | act-de-bat-nguoi-hau.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-259 | img/act-nhan-nguoi-chay-viec.webp | act-nhan-nguoi-chay-viec.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-260 | img/act-giao-viec.webp | act-giao-viec.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-261 | img/act-co-viec-nho.webp | act-co-viec-nho.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-262 | img/act-nhan-loi-nho.webp | act-nhan-loi-nho.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-263 | img/act-nho-tra-an.webp | act-nho-tra-an.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-264 | img/act-cung-duong-dau-den.webp | act-cung-duong-dau-den.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-265 | img/act-khan-cha-me.webp | act-khan-cha-me.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-266 | img/act-moi-uong-tra.webp | act-moi-uong-tra.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-267 | img/act-du-tiec-nguoi-khac.webp | act-du-tiec-nguoi-khac.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-268 | img/act-thang-bac.webp | act-thang-bac.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-269 | img/act-thua-bac.webp | act-thua-bac.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-270 | img/act-thang-cuoc.webp | act-thang-cuoc.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-271 | img/act-thua-cuoc.webp | act-thua-cuoc.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-272 | img/act-le-duoc-khen.webp | act-le-duoc-khen.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-273 | img/act-hanh-le-bi-che.webp | act-hanh-le-bi-che.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-274 | img/act-tiec-duoc-khen.webp | act-tiec-duoc-khen.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-275 | img/act-tiec-truc-trac.webp | act-tiec-truc-trac.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |
| AJ3-KP23-276 | img/act-tu-dung.webp | act-tu-dung.txt | REF_STYLE | 384x506 webp (gen 768x1024) | j79.js:803 | LIGHT |

## Skipped (already exists)

- 8 act keys the queue still listed but whose `img/act-<key>.webp` is already in assets.json: xin-mang-che, thao-mang-che, vet-thuong-lanh, lanh-con-seo, sai-theo-doi, theo-doi-duoc, theo-doi-trang, theo-doi-bi-bat
- 427 act keys drawn earlier (gens2.txt), all present in assets.json: not listed.
- All 121 dialog banners `img/ev-<key>.webp` (dlg_scenes.txt) present in assets.json; also the 280 ev-* in total; MISSING_PICS.md shows 0 events on the placeholder.
- No `img/mgbg-*.webp` exists anywhere in assets.json (so none skipped).

## Open questions for the owner / C

1. M45 column ratio is derived from the CSS numbers (about 0.30-0.35 wide:tall); C should confirm with one screenshot at iPad 1180x820 before painting all 35 (the prompt keeps the content in the central strip so a mistake costs only a crop).
2. KP23 banners: the task says 97 banners left but assets.json holds all 121 `ev-` keys (640x480 landscape per PROGRESS). N4 wants the result/news pop-up picture on the LEFT as 3:4 (EVENT_ART.md says 768x1024). Do the existing 4:3 banners stay (then banners = 0 prompts) or must they be redrawn 3:4? If redrawn, say so and the generator can emit 121 more files from dlg_scenes.txt.
3. The old queue (prompts2.py) asked for visible faces and 'near-3D realistic' style; J3 follows the current canon instead (N1 no visible face, _lib style sentences, A53). Existing live act pictures show faces: say if the new ones should match that look.
4. 8 of the missing act keys have an old Magnific id in pending2.txt (rendered or queued earlier). If those renders still exist on Magnific, fetching them costs nothing; otherwise use these prompts.
5. Outing places: which code key and size should they take (no reader exists)? Proposed names are in the table.
6. The English subject lines quote the Vietnamese scene from meanings.py verbatim (as the approved prompts2.py recipe does); the glossary only covers titles. If ChatGPT misreads a scene, give it the English by hand.

## Checks

`python3 dev/art/prompts/check_prompts.py dev/art/prompts/J3` (from /home/user/wt/apj): `checked 315 files, 0 FAIL`
Canon checks that apply: A56 caption (one unique code per file, AJ3-KP23-nnn / AJ3-OUT-nn / AJ3-M45-nn), N1 no visible face (S_NOFACE in every act and outing prompt; backdrops forbid any person), N2 tone (DARK for the scheme / punishment groups and harm / sadness keywords, else LIGHT, night scenes get a warm lantern glow), N3 groups above, F14 (own Han/Ming sentence, the checker bans the words of S_NOQING), one held item per figure, no % and no text. L10 backdrops port + land: outings have both; act pictures are portrait only like all act art; M45 is a tall portrait column only. check_store.py (outfit figure gate) and keep_check: not applicable (all prompts new, no figure outfits).
