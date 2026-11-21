# NECK1 — G76 low neckline a18–a36, all women (owner L2228) — words/code only, 0 gens (A53)
Worker of Foreman C (opened by ROOT-B6, now reporting to ROOT-B7 session_01D3E3NXcBz6cJCUZtt6fsE3). depth 6, START_CTX ~3 % (window 1M).

## 1. Rule saved
`rule.py add G …` → **G76 LOW NECKLINE a18–a36 ALL WOMEN (L2228)**, owner verbatim inside; SUPERSEDES for a18–a36 the collar/neckline parts of G15, G17, G21, G22, G25, G53, G69 (neckline words), G70, G71, A42 (already revoked by G35); a51/a65 untouched; vân kiên throat clasp stays; Hán G62/G66 = OPEN QUESTION. `rule.py check`: only the old warnings (dup id G51, F12~G56), nothing new.

## 2. Code — ONE transform for everything: `dev/art/lowneck_L2228.py`
- `post(text)` = ordered regex list: every collar clause (thu square collar + band, t3 square / a36 crossed + stiff band, t1/t2 style-1 square opening, t1 crossed-collar top, t4 crossed collar, t7/t8 framed square neckline, Thái hậu a36 standing collar) → **one phrase** `a very low, wide, open neckline whose edge lies about a hand's width below the collarbones`; robes with no collar words (root/xuân/hạ/đông t2, t5 Phi, t6 Quý phi) get the phrase in the outfit noun; every guard/trim mention goes ('never hiding the square collar', 'never rising up the neck', 'below the collar', '(never at the neckline)', neckline-band edge/pearls, 'at the collar' embroidery, INNER-robe neckline sentence, '(collar, inner robe', 'robe, collar or belt' …). No chest/cleavage word added.
- **Proof it is the approved wording:** `post(M2187-06) == M2219-01` **byte for byte** (caption aside).
- Idempotent; `G76_OFF=1` env = off (only for before/after diffs); `OFF[0]` = raw a36 words for an a51/a65 cell.
- `store_swap(store, prompt)` = the check_store side (same swaps on the store text when the prompt carries the phrase).

Wired:
- `store-all/build_all.py`: `build()` (before the B26 length fit AND last step), `season_post` (builder a18–a36 cells only, flag `G76_ON`), `build_season` last step, `thaihau()` a36, `check()` invariant + frame sentences (`touches()`), a51/a65 winter cells take the RAW a36 words (`_LN.OFF`).
- `check_store.py`: `store_swap` after `l2119_store_swap`; G15 t3 option-B words, HQP (t7) template and the S13 thu-Tần capelet condition read with the phrase; `thu_fabric_waiver` also keyed on `--season thu` (the G53 square-collar marker words are gone at a18–a36).
- `t8-prompt-B/build.py` NOT changed: it is the raw STORE (Lượt 371/373: store words byte for byte; owner laws are applied by build_all, like L2119/B32). Every gen prompt comes out of build_all → G76 applied. See Q5.
- Why the phrase goes in BEFORE the B26 length fit: the gate's necessity rule rejects a length cut that is no longer needed; so a few cells now KEEP store boilerplate that was cut before (e.g. t3/t4 thu: frame sentence, hairpin sentence). That is less cutting, not new words.

## 3. Gate / proof (sweep, same code with G76_OFF=1 as "before")
432 cells: persons c06 m19 s62 p01 × t1–t8 × a18/a36 × root/thu/đông/xuân/hạ + c06 a26 root/thu + c06/s62 a51/a65 root/thu/đông.
- **0 new gate FAIL**; 258 PASS both; 173 FAIL both (pre-existing, unchanged); 1 newly PASS (c06 t4 a36 thu).
- **a51/a65: 96/96 files byte-identical** before/after (+ same rc); Thái hậu c06 a51 identical.
- every a18–a36 built prompt has the phrase exactly once (0 exceptions).
- s62 thu a18 t1–t8: all gate PASS.
Sample diffs (s62 t1–t8 thu a18, s62 t2 a36 đông, princess p01 t2 a18, Thái hậu c06 a36, Nữ đế c06 a26, maid proposal): **dev/handover/reports/NECK1_diffs.md**.

## 4. Test set M2228-01..08 (thu s62) — paste files, 0 cr
Maker `dev/art/thu_comoi/M2228/make_M2228.py` = `lowneck_L2228.post` on the newest bases: t1/t2 M2213-01/02, t3–t6 M2217-03..06, t7/t8 **M2227-07/08** (THUROOT8 phoenix versions). Only neckline words changed; ANGLE/Pose/GRACE asserted identical; phrase once each.
keep_check `--sidecar` **PASS ×8** (.keep allow lines = exactly the neckline phrases cut + old caption). CAPTION = own code. MA_HINH.json +8 (append). `M2228_ATTACH.md` (ONE image refs/mau_net_ve.jpg, as M2227). Lengths 10006–12557 chars (bases were 10144–13274; paste-only files, as THUROOT8 noted for M2213/M2217).

## 5. OPEN QUESTIONS (not guessed — kept as is)
- **Q1 MAIDS** (prod files `dev/art/maid7/prod*`, NOT changed): maid designs are layered collars — thô sử 'short crossed-collar jacket'; nhất 'over-vest with a stand collar … worn over a crossed-collar inner robe'; chưởng sự 'over-vest with a SQUARE collar … inside which the inner robe's crossed collar shows'; thân cận = colour flip + **square collar is her mark (K28)**. Proposal sample for thô sử in NECK1_diffs.md. Owner: apply the one phrase to maids too (both layers open?), and what marks thân cận then?
- **Q2 WINTER FUR** (G26): 'fur trim … along her collar, the front edges and hem' + 'the neckline keeps its shape' kept. Change to 'along the neckline'?
- **Q3 t7/t8 thu 'Collar SHAPE exactly as in image 3'** kept (ref image = the vân kiên? if it shows the square collar it fights the phrase).
- **Q4** kept: 'never inside the neckline' (bodice-sprig guard, M2228-04/05/07), G69 'embroidered flower at the CENTRE of the chest', 'pearl strands across the chest' (t6/Thái hậu), vân kiên/capelet 'collar lines', cloud collar words.
- **Q5** should the raw store `t8-prompt-B/build.py` CLI itself print G76 words at a18–a36? (Not done: the store/gate machinery keys on the store words.)
- **Q6 Hán — ANSWERED (owner L2234 'Cái bộ hán phục, cái cổ áo tôi chốt rồi là không sửa gì hết.')**: every Hán prompt EXCLUDED; `SKIP_MARK` = 'Hán' / 'Han-dynasty' / HAN_COLLAR … → post() no-op. Proof: all 225 Hán-marked prompt files under dev/art + dev/handover byte-identical under post(); no builder output / M2228 file carries a Hán marker; G76 rule text updated (rule.py set, --luot 2234).

## Commits
afbc831 (rule + module + M2228 set) · second commit = builders/gate wiring + report (hash in the message to the foreman).
