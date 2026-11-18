PRIORITY #1 CHECK ('nữ đế thái hậu khuê các nhà nghèo công chúa'): OD L1206/1207/1209/1212/1238/1239 + 1281–1308 read; FIGURE_GATE F rows (Nữ đế, Thái hậu), NỮ ĐẾ crown/shoulder lines, AGE/a51 lines read; reports princess-sample, princess-rank-sample, foreign-princess-art (fp-s5 v26) read; live old figures fig-consort-cNN-kc/-ngheo-a18, fig-thaihau-h1/h2-a51 used as left column; claims 0, review/* 0 → REUSED build.py prompt-B structure (pushed tip 39ce0c8c).
# states-sample (W102, Foreman C ROOT-30) — SAMPLES ONLY, nothing live
Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/states-sample/sheet.jpg (1392 px; per pair: old/ref left | NEW right). Per-file PNGs (1024x2304 transparent) in the same CDN folder: {c06,c25}_a18_{nude,kc,ngheo}_v0.png, {c13,c05}_a51_thaihau_v0.png, {nc,bd}_a18_{t1,t6}_v0.png.

## Builder
`build.py --state nude|thaihau|kc|ngheo|nc1|nc6|bd1|bd6` (same sentence structure as the 8 ranks: PRE, identity, AGE_TXT, outfit, COLOUR RULE, embroidery + drape, item/hand pose, hairpin rule, END). Existing outputs byte-identical (md5 of 405 builds before/after equal; golden pB_c06 cmp OK; test_low_all.py OK 2304 builds). Princess faces live in a SEPARATE dict PDATA (not DATA, because tests iterate DATA); `--state` is only reached with the flag.
- nude: woman's robe, YEL_NEW dominant + her ORIG1 colour, DRAGON+PHOENIX embroidery, short stiff shoulder piece (pointed/not per person), phoenix crown WITH DRAGON + front tassels to the forehead only (5 / full row / 7 by n%3), REQUIRED side-dangle pins both sides; item = her t8 item +1 (different from her t8).
- thaihau: Hoàng-hậu phoenix crown, deep antique gold mixed with muted deep own colour; own COLOUR RULE (no "fresh" clause), used with --age a51.
- kc / ngheo: stepped-down t1 structure; kc = fine embroidery + jade/pearl pins, no crown/phoenix/yellow; ngheo = neat cotton-silk, small embroidery sprigs, wooden/silver pins, no gold, never rags. ORIG1 colour kept (no yellow).
- nc1/bd1 = home costume at Đáp ứng (rank by richness, hairpins present, BD: low knot + loose hair + headband, NO side braid, NO high bun per OD 1297–1308); nc6/bd6 = standard court Quý phi robes with only small homeland marks (NC: silver camellia pin + silver tassel earrings; BD: white fur edge, turquoise-coral strands, belt plaque). t6 uses the LUX text WITHOUT the royal-yellow swatch (brief: refs = identity + style only; no image 3).

## Gens (all gpt-2-6, 1024x2304, 2k, folder ba4aecfe, count 1, no seed; refs = own identity image + style B kspkwKx16B; m09 NOT needed; prompts pasted unchanged from build.py output)
| figure | gens | pass | note |
|---|---|---|---|
| c06 a18 nude | 1 | yes | dragon+phoenix on chest/skirt, yellow dominant, coral inner, 5 short front tassels, round fan |
| c25 a18 nude | 1 | yes | full tassel row, squared shoulder piece, feminine robe, hand mirror |
| c13 a51 thaihau | 1 | yes | muted apricot-rose + antique gold, silver temples clear, scroll |
| c05 a51 thaihau | 1 | yes | deep teal + antique gold, casket, silver visible |
| c06 a18 kc | 1 | yes | coral silk, butterflies, jade/pearl pins + orchid, book |
| c25 a18 kc | 1 | yes | brick-rust silk, bamboo, round fan |
| c06 a18 ngheo | 1 | yes | simpler coral cotton-silk, small sprigs, basket of flowers, pretty not poor |
| c25 a18 ngheo | 1 | yes | rust cotton-silk, plum sprig |
| NC a18 t1 | 1 | yes | teal-blue jacket + rose pleated skirt, silver pins, ivory fan |
| NC a18 t6 | 1 | yes | teal-blue court robe + cape + gold crown, silver pin/earrings |
| BD a18 t1 | 1 | yes | teal-green fur-trimmed robe, loose hair + headband, no braid, coral bouquet |
| BD a18 t6 | 1 | yes | deep teal court robe, fur edge, jade ruyi |
gens=12 (1620 credits) + 12 cut-outs (36). No regen.
Honest notes: nude crown reads as phoenix crown with dragon motif — dragon is clearest on chest/skirt (c06/c25); front tassels are thin on c25. Princess identity = the W43 a18 sample faces (img/_review/princess-sample/{namchieu,bacdich}_a18_s1.png), not a later fp-s5 face (fp-s5 figures are other renders of the same girls). Left column for Nữ đế = the same person's live t8 (no live Nữ đế exists); princess rows left = entry sample / rank-sample Tần.

## Face count (owner's question "đủ 90 mặt nữ 18 tuổi chưa")
From the CDN index (img/fig-*-a18*): live a18 women figures = 32 consorts (c01–c32) + 52 maid ids + 8 mama + 3 thaihau + 4 player. a18 t1–t8 ladders exist for the 32 consorts; of the 58 new faces only n01–n03 have a18 rows (img/_review/new-faces, t1–t7). I could not verify a full set of 90 distinct a18 faces; the 58 others still need their a18 face/t1 first.

## Ids
Identity uploads: c06 s7IS1gNl8e, c25 JNCPg4tOq4, NC gOmwxOjSXO, BD BhNIDfhoQR; c13 rgXL37zxtc, c05 If3hxHCtvE (live a51 t1). Gens: nude c06 CqnQmTyEEy, c25 EbYFhDzuuO; thaihau c13 xSBs5fpjfW, c05 dt4oDycXSL; kc c06 nVscAlOYQD, c25 ksexb8r16B; ngheo c06 O6E4wblynm, c25 6AbR68diJO; NC t1 yiu9O45PW9, t6 hu2fmEQvqL; BD t1 EbYFC5muuO, t6 BhNIXCIoQR.
~100% xong (samples) / ~35% chơi được (waiting owner verdict; no mass)

## Round 2 (Foreman C LOOKED, order 21:16Z): fix Nữ đế + nhà nghèo
Findings: (1) c06 Nữ đế had a red forehead mark (D2 FAIL) and dragon-in-crown / front tassels / dragon embroidery not readable at game size; (2) ngheo as rich as khuê các (layered sheer silk).
Builder (pushed, only `--state nude` and `--state ngheo` text changed; every other output identical to the tip before the change, kc/thaihau/princess prompts cmp-equal): nude = LARGE clearly visible gold DRAGON rising from the crown front-centre + a clear curtain of bead strings in front of the upper forehead ending above the eyebrows + bare forehead (no red dot/jewel/mark) + large readable dragons on chest and both sleeves; ngheo = plain matte cotton-silk short jacket with narrow sleeves over ONE plain long skirt, 1-2 layers, no sheer/overskirt/scarves, embroidery only at collar + hem, fabric sentence "plain cotton-silk... not sheer, not airy".
Gens (same refs/settings, 1 each, all pass, no regen): c06 nude xSBlUibjfW, c25 nude 9ZH32dRNYZ, c06 ngheo rgXsSAFxtc, c25 ngheo SyhJPMnUb8 (+4 cut-outs). Looked: both Nữ đế show dragon on crown, front bead curtain, clean forehead, big dragons + phoenix; both ngheo clearly humbler (short jacket + plain skirt, hem/collar sprigs only, wooden/silver pin + flower), still pretty. Total gens now 16 (2160 credits + 16 cut-outs).
Files: img/_review/states-sample/{c06,c25}_a18_{nude,ngheo}_v1.png ; sheet2.jpg (1350 px; first | FIXED): https://ctm-img.victoria-tntt.workers.dev/img/_review/states-sample/sheet2.jpg

## HANDOVER (W102 rollover, 21:30Z; context ~32 % > START+25 %) — round 3 NOT started
Foreman C order after the owner verdict ~21:30Z (verbatim summary): (1) Thái hậu c13+c05 a51: outfit must differ from t7/t8 — copy the IDEA of the old live Thái hậu (img/hd/fig-thaihau-* on the CDN, described in WORDS, never as a ref): STIFF structured shoulder piece (cầu vai cứng) showing authority, a collar different from Hoàng quý phi; keep elder colours. (2) KHUÊ CÁC c06+c25: a girl BEFORE the palace, NOT consort dress; idea of live fig-consort-cNN-kc-a18 (simpler noble-house daywear: vest/jacket over a long skirt), refined, clearly not palace rank. (3) NHÀ NGHÈO c06+c25: idea of live fig-consort-cNN-ngheo-a18 (plain jacket, APRON, plain skirt, simple hair), neat, pretty, never rags. (4) BD Quý phi (bd6): redraw, softer less garish palette, embroidery truly stitched into the cloth (not floating). (5) NỮ ĐẾ c06+c25: text EXACTLY as the round-2 prompt (owner loves the multicolour flower embroidery), change ONLY colours = royal YELLOW + true RED/crimson (not orange), others may mix in; crown clearly LARGER/taller than the Hoàng hậu crown. Sheet states-sample/sheet3.jpg: pairs old live | new; for Nữ đế show new beside her t8 Hoàng hậu as a SIZE CHECK, labelled. 9 gens total (1 each, same refs: own identity + style B kspkwKx16B). Builder first (golden/test_low_all/base md5 identical), then gens.
Practical notes for the successor:
- Worktrees: /home/user/wt/h (sparse handover tip; DO NOT run `git checkout -- .` before committing: it wipes your edit), /home/user/wt/cdn (origin/main sparse dev/site; `CLOUDFLARE_API_TOKEN=proxy-injected python3 dev/site/cdn_sync.py img/_review/states-sample`).
- Scratch (may be gone): sheet.py/sheet2.py in the old scratchpad; old live figures from https://ctm-img.victoria-tntt.workers.dev/img/fig-consort-cNN-{kc,ngheo}-a18.webp and img/hd/fig-thaihau-*.
- Identity uploads already in Magnific (folder ba4aecfe): c06 s7IS1gNl8e, c25 JNCPg4tOq4, NC gOmwxOjSXO, BD BhNIDfhoQR; c13 rgXL37zxtc, c05 If3hxHCtvE; style B kspkwKx16B.
- Builder: dev/art/t8-prompt-B/build.py `build_state()`; Nữ đế colour comes from colour(c,"v0",False) (ORIG1 + YEL_NEW); for red+yellow replace only that colour sentence in the nude branch (keep every other word). kc/ngheo are one branch (stepped-down t1 text + FAB_LOW/plain fab); redo their outfit sentences. BD t6 text is in the bd6 branch. Max 4 gens in flight; paste prompts unchanged; look at every image; cut with images_remove_background.
- Base md5 check: others change build.py too (t2/t3 rewrite landed); compare against `git stash` baseline, not an old md5 file.
Gens so far: 16 (2160 credits + 16 cut-outs). Rounds 1-2 files stay on the CDN; nothing live.

## Round 3 (W102b, successor): 5 fixes — READY
PRIORITY #1 CHECK: report HANDOVER W102 + brief read; live kc/ngheo/thaihau/t8 figures (CDN) looked at as the left column; claims 0; REUSED build.py `build_state` (only the five text branches changed).
Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/states-sample/sheet3.jpg (1500 px; per pair old live | new; Nữ đế left = her live t8 Hoàng hậu, labelled SIZE CHECK). Per-file PNGs (1024x2304 transparent): c06/c25_a18_nude_v2, c13/c05_a51_thaihau_v1, c06/c25_a18_kc_v1, c06/c25_a18_ngheo_v2, bd_a18_t6_v1 in the same folder.
Builder (pushed): nude = round-2 text unchanged except colours (royal yellow dominant + TRUE RED crimson #C21F2B second, own colour only small accents, no orange) and crown "VERY tall and wide, clearly larger than the Empress's nine-phoenix crown"; thaihau = cloud collar replaced by a STIFF squared shoulder piece (cầu vai cứng) + own high round standing collar with jade button; kc = refined daywear: crossed-collar blouse + sleeveless embroidered vest + pleated long skirt + ribbon sash, bun with ribbon, no crown; ngheo = crossed-collar cotton jacket + linen apron + plain pleated skirt + cloth ribbon, embroidery only collar/cuffs/small sprigs; bd6 = soft muted teal-green, tone-on-tone stitched embroidery woven into the cloth, soft turquoise/coral accents, and (after the 1st gen showed side braids) "all hair gathered under the headdress, NO braids". Verified: golden cmp OK, test_low_all.py OK 2304 builds, 130 other prompt dumps (t7/t8/low1-6/trieu/golden/nc1/nc6/bd1) byte-identical before/after; only nude/thaihau/kc/ngheo/bd6 changed.
Gens: 9 final + 1 regen (BD t6 first try had side braids = OD 1297–1308 fail; regen with the no-braid sentence passes) = 10 gens, 10 cut-outs. Looked at all: Nữ đế yellow+red, big dragon crown, wider/taller than the Hoàng hậu crown (modestly, still gold-phoenix family); Thái hậu stiff shoulder + standing collar, elder colours kept, silver temples visible; kc = pre-palace girl with vest+skirt (c06 coral/cream, c25 brick/rose; skirt reads a little sheer/airy from FAB_LOW); ngheo = jacket+apron+plain skirt, clean, pretty; BD soft, stitched, no braid.
~100% xong (samples r3) / ~35% chơi được (waiting owner verdict; nothing live)
