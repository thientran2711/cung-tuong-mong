# PALAUDIT1 — colours outside the person's palette, in the prompts the owner approved (owner Lượt 1405)

depth 8 (limit 8) · START_CTX ≈ 4 % (get_session used_tokens read 0; own estimate) · worker of Foreman C #8 · 0 credits, 0 gens · **AUDIT ONLY: no prompt, builder or rule was edited.**

Owner (verbatim): "Cho người chạy prompt kiểm tra lại hết các cái prompt nào mà tôi đã duyệt, coi thử nó còn sót một cái màu sắc nào đó mà không có nằm trong bảng màu không."

## How it was checked
Scripts in `dev/art/palaudit1/` (re-runnable, read-only):
- `dump_builder.py` — runs `store-all/build_all.py` in-process for every builder person (146 listed, **112 drawn**; 34 refused = B8 NotDrawn) × t1–t8 + Nữ đế × a18/a26/a36/a51/a65 × default + `--season dong` → `cells_<age>.jsonl` (9 207 prompts).
- `audit.py` — colour lexicon (≈110 hue words + every `#xxxxxx`), per sentence. Subtract (1) the person's palette: `face-common/palettes_season.json` (B20, all seasons + root_drawn) **plus** `palettes_season_deep.json` (P6/A32, owner L1042 — the only file that has s62–s65) **plus** the MAIN/SECONDARY slot words printed in the prompt itself; (2) allowed classes, each with its rule: negations/bans ("never black…"), body words (skin/hair/eyes/lips), parchment background (B9), gold/silver/jade/pearl/white jewellery + embroidery + thin accents (B15), royal yellow #EFBD69/#F2BC61 at t6–t8/Nữ đế (B17/B21/B22), B24 rank colours/hexes, held item (B16/E5), elder darkening a51/a65 (J2), winter ivory fur (G26), flower/motif names (cotton-rose, China roses, lilac sprays = flower names, not robe colours). What is left = LEFTOVER, grouped by template sentence (`run_builder.py`, `run_files.py`, `agg.py` → `leftover_files.tsv`, `leftover_builder.tsv`).
- `structural.py` — compares each builder prompt's MAIN/SECONDARY slot with the B20/P6 palette (root season for the default build, đông for `--season dong`) → `structural_a18.txt`.
- Files also scanned: `approved/proof/*.txt` (12), KC face pictures `KC_REFS.json prompt_file` (115, approved 19/11), `owner-copy/**` (427, old 18–19/11 copies), and the **samples, not yet duyệt**: `seasons4/*.txt` (52), `thu_comoi/*.txt` (8), `b26/s62_*.txt` (3).

## (a) CLEAR STRAY — hard-coded colour that is not in the person's palette and has no rule

| # | block / file | leftover colour | example sentence | cells affected | cause |
|---|---|---|---|---|---|
| a1 | store `t8-prompt-B/build.py` t8 Hoàng hậu outfit (l.479) → build_all t8 + Nữ đế | **kingfisher-blue** silk thread | "…dragons, peonies and clouds in gold and **kingfisher-blue silk thread** (far denser than any other rank)…" | 1 385 (all 112 drawn people: t8 1 120 + Nữ đế 265) | HARD-CODED in the template, every person's t8 / Nữ đế robe gets a blue embroidery colour that is in nobody's palette (same kind as the DESIGN10 "pink"). B15 says gold or silver only as thin accents, never a third colour. |
| a2 | `store-all/build_all.py` `secondary()` l.163–177 + `FAMILY_CONTRAST` l.154 | the SECONDARY colour itself: **deep rose / crimson / jade green / deep teal / warm coral rose / deep sapphire blue** | s08 "the MAIN colour soft emerald green and the SECONDARY colour **deep rose**" — B20 says **pearl white**; s61 builder **deep teal**, B20 **ivory** | **30 people** × t1–t8 × 5 ages ≈ 1 200 cells (list in `structural_a18.txt`, block "main same / SEC DIFFERENT") | HARD-CODED fallback (Lượt 483 fix): when the store's listed secondary is neutral / metal / same family, the builder throws it away and puts a family-contrast colour. The B20 palettes the owner approved often HAVE a light neutral secondary (pearl white, warm ivory, champagne ivory, pale gold beige, silver white…), so the builder prints a secondary that is NOT in her palette. People: s08 s10 s12 s14 s15 s17 s20 s21 s22 s23 s24 s25 s26 s28 s29 s30 s32 s34 s35 s36 s37 s38 s40 s41 s43 s45 s57 s61 s63 (+ s44 sage green vs B20 sage grey). |
| a3 | store ORIG1 table for **c06** (t1–t8 "her ORIGINAL robe colour is kept exactly as in image 1"), + "her signature colour family coral red and ivory stays the MAIN robe colour", + "the robe itself is clearly coral red silk" (t1–t5) | **coral red #D5745E**, **ivory** (and #BA5F49 deeper coral at t8) | c06 t1: TWO-COLOUR sentence says "MAIN colour vermilion … SECONDARY jade green", the next sentences say "coral red silk like #D5745E … signature colour family coral red **and ivory**" | c06: 80 cells (ORIGINAL), 60 (signature family), c06 part of 100 (c06 50; m05 50 is fine — coral red IS m05's colour) | PERSON-SPECIFIC stale slot: c06's B20 palette = soft vermilion #D28977 / jade green #6AAF98 (root_drawn #CF816E). Her old 18–19/11 colours (coral red + ivory) are still in three sentences, so one prompt names two different main colours and a secondary (ivory) that is not hers any more. |

## (b) ALLOWED BY RULE (no action)
| class | rule | note |
|---|---|---|
| gold / silver / jade / pearl / white jewellery, gold embroidery, gold-and-pearl bands, pearl nets on Phi capes (t5), crowns | B15 (gold or silver thin accents), G1 rank designs | largest group (~20 000 hits / age) |
| royal yellow #EFBD69 / #F2BC61, "royal golden yellow", "golden yellow outer robe" t8 (thu_comoi t8), "less golden than the Empress" (t7) | B17 / B21 / B22 | t6–t8 + Nữ đế only; none found below t6 |
| B24 rank colours | B24 / K13 / L1 | only 5 hits in thường phục (blue rank accent) |
| winter fur "plain ivory-white fur trim … the same plain ivory at every rank" | G26 (owner: no coloured fur) | every `--season dong` cell |
| elder darkening a51/a65 ("pink becomes deep rose-plum, blue becomes deep navy … red becomes deep burgundy") | J2 | |
| held-item colours (carved jade handle, silver-banded drum, pearl cord, white jade seal, kingfisher-blue paper item) | B16 / E5 (item = contrasting colour) | |
| parchment / white background | B9 | |
| skin / hair / eyes / lips (black hair, peach lips, white teeth words) | face rules | |
| bans: "never black, never grey, NOT a cream, beige or all-gold robe" | (negation, not a colour used) | |
| COLOUR RULE tone text "(it may be a little deeper or a soft ivory …)", KC face "the same as the soft coral-red and brick-red robes of the game" | B18 tone sentence (describes the tone, not a robe colour) | approved verbatim text |
| flower / motif names: cotton-rose hibiscus, tea-scented China roses, lilac sprays, plum blossoms | motif slot (B2) | flower names, not robe colours |
| s62 seasons4 Hán files (xuân TONG, hạ DUONG, thu HAN/MINH, HAN_BAC t4–t8 incl. **_vai** after 73a4828) | B20/P6 | colours = her season palette (peach-blossom pink + ivory white / light peach orange + soft indigo-violet / light clear warm plum + bright blush). The DESIGN10 _vai "pink" is gone: inner top now = her 2nd colour "bright blush pink". |
| 38 maid-persons m01, m03, m06, m07, m11–m13, m15, m17, m21, m23–m27, m30–m52 (not in the 86 consorts) | BW4 owner table `m_colours_proposed.json` (Lượt 603) | no B20 palette exists for them; builder uses the owner table — nothing to subtract |

## (c) UNSURE → OWNER
| # | where | colour | cells | question for the owner |
|---|---|---|---|---|
| c1 | store t7 HQP + t8 HH + Nữ đế crown | **kingfisher-blue inlay** ("pearl strands, kingfisher-blue inlay and a few gold tassels"; t8 "kingfisher-blue inlay, rubies and pearls") | 2 505 (112 people: t7 1 120, t8 1 120, Nữ đế 265) (every person, t7/t8/Nữ đế) | It is jewellery (điểm thúy), but blue + **rubies** are not gold/jade/pearl/silver. Keep as crown jewellery, or change to her palette / gold-pearl only? |
| c2 | Nữ đế option rotation (`t8-prompt-B/build.py` NUDE2_COL / nude3, l.1332–1851) | **deep wine-crimson #7E2A33** (option B) or **black** (option C) as the Nữ đế 2nd colour instead of her own colour | wine-crimson 130 (26 people); black 70 (14 people) | Nữ đế is outside B20 (B20 = 86 consorts, t1–t8). Approved proof c06_nude_a36 = black. Should every Nữ đế use her own palette colour as the 2nd colour, or keep the fixed wine-crimson / black? |
| c3 | `build_all.py --season dong` (winter) | the person's ROOT colours, not her **đông** palette | 54 people whose root season ≠ đông × 8 ranks × 5 ages ≈ 2 430 cells (structural_all.txt) (e.g. m02 winter = moss green / coral rose; B20 đông = sky blue / cool rose pink) | G26 owner: "mùa đông mình vẫn giữ y nguyên mọi cái prompt … chỉ thêm lông" (keep every prompt, only add fur) **vs** B20 đông palette. Which wins for winter: the root colours (G26 as built) or the đông palette (B20)? Same question will hit xuân/hạ/thu once those builders exist. |
| c4 | SAMPLES (not yet duyệt): `seasons4/s62_t4–t7_XUAN_COMOI.txt` (4) and `thu_comoi/s62_t4–t8_THU_COMOI*.txt` (8) | **ice blue #71B5D7 / mint mist** = s62's **đông (root)** palette inside a **Xuân** / **Thu** prompt | 12 sample prompts | s62 Xuân palette = soft clear cool peach-blossom pink #EB8186 + ivory white; Thu = light clear warm plum #DF9ED9 + bright blush. If "XUAN/THU_COMOI" means the season, the colours are wrong; if it is only a design (cut) test on her root colours, fine. Owner to say. |
| c5 | s62 Thu sample files (thu_HAN, HAN_BAC*, *_LADDER) | "bright blush **pink**" | 37 sample prompts | palette name is "bright blush" (#FFE3EA); the prompts add the word "pink". Same hue — owner OK with the extra word? |
| c6 | approved pictures that were drawn BEFORE B20: `approved/proof/c06_*` (coral red #D5745E + ivory, t8 deeper coral #BA5F49), `owner-copy/**` c06 + triều phục ("court red, brick-crimson"), KC face prompts | old colours | 12 + 427 + 115 files | These are the prompts of pictures she approved earlier; B24 says colour changes = prompt only, never redraw. Only matters if one of them is copied again as a base (A17/A38 diff): the copy must take B20 colours, not these. No action unless the owner wants it. |

## Totals
- Builder: 9 207 prompts (112 drawn people × t1–t8 + Nữ đế × 5 ages × default/đông; 34 not-drawn people refused by B8; **18 a65 winter cells fail the builder's own G28 assert "see-through words"** — side note for Foreman C, not a colour issue). Per age ≈113 000 colour hits: ≈55 % palette, ≈45 % allowed classes, LEFTOVER ≈0.8 % (a51/a65 more only because of the J2 elder darkening sentence, allowed).
- (a) clear stray: 3 findings — a1 kingfisher-blue thread 1 385 cells, a2 secondary override 30 people / 1 200 cells, a3 c06 coral red/ivory 80 cells.
- (b) allowed: all other hits (see table).
- (c) owner: 6 questions (c1 kingfisher inlay + rubies 2 505 cells, c2 Nữ đế wine-crimson/black 200 cells, c3 winter root vs đông palette ≈2 430 cells / 54 people, c4 s62 XUAN/THU_COMOI samples in đông colours 12 files, c5 'bright blush pink' 37 sample files, c6 old pre-B20 approved prompts).
- Samples (not yet duyệt): seasons4 52 + thu_comoi 8 + b26 3 files — no hard stray besides c4/c5; DESIGN10 _vai pink fixed (73a4828).
- Raw: dev/art/palaudit1/leftover_builder.tsv, leftover_files.tsv, structural_all.txt (cells_*.jsonl / g_*.json are git-ignored; re-run dump_builder.py a18 a26 a36 a51 a65, then run_builder.py).

## Open / handover
Nothing left for this brief; report only. Fix owners (if the owner says yes): a1/a2/a3 = builder (`t8-prompt-B/build.py` t8 outfit string, `build_all.py secondary()` + c06 ORIG1/DATA rows) → Foreman C assigns a builder worker; c1–c6 need the owner's answer first. Commit: see push line in the Foreman message.
