# hoa-dien-art — report (art worker session_011xDdVR5e4J9ieDW6yVDSq1, coordinator Foreman C ROOT-9 session_011xDdVRcPyvGXaGQCff5fCJ)

PRIORITY #1 CHECK: OD tail 17/11 ~17:30Z / ~17:45Z (hoa điền becomes an item, clean foreheads) | main: none (art) | review/*: review/huadian-size(-r1..r3) dev/art/huadian-size (face.py, ref.json REUSED; shrink2/locate/a18_boxes looked at — boxes are stale after the r1–r6 swaps, so not used), review/hoa-dien-r1 (j92 WD_LIST hd_*, jhd.js hdImg/hdAnchor → file names) | claims: ROOT-9 order 17/11 19:42Z only.
START_CTX ~3 % (1M window). Code branch: review/hoa-dien-art (dev/art/hoa-dien-art/). Images never in git.

## STEP 0 answer (sent to ROOT-9)
1. No pixel-identical pre-huadian sources (marks painted at generation; huadian-size overwrote the CDN originals; img/_keep/maid-ty-redraw also marked) → local removal per file.
2. Live candidates (women por, CDN _index): consort t 1024, ty 1024, tm 640, kc 128, tcold 128; maid base 468, t 1664, tm 832, ty 1664, kc 208; player 36; same count fig; hd ~3.4k; tn 840. Marks seen on t, ty, tm, kc and maid base/tm; tcold clean.
3. Anchor: yes — clean3/twin write the mark centre per file (STEP 3 HD_ANCHOR source).

## STEP 1 method (dev/art/hoa-dien-art/det3.py, clean3.py, twin.py)
- det3.detect: forehead zone from the face (ref.json for a18, haar otherwise); 2nd-order Lab skin fit; mark = dE outliers clustered near the forehead centre; brow/hair (dark, low chroma, big or touching the zone edge) never touched; weak clusters (peak < MINPEAK 20) = "nomark", no change.
- det3.remove: Telea inpaint + matched skin grain inside the mask only (hard mask).
- twin.py (fig/hd/tn): template-match the por face into the twin (scale search) and detect in the mapped zone at the twin's own size; if the twin is a different painting (some hd are), its own haar face is used.
- Output LOSSLESS webp → pixel diff outside the mask = 0 (lossy re-encode would change edges outside by up to ~70 levels). Bytes: por ~2.8× (decision asked from ROOT-9).

## Batch 1 (6 por, NOT live, waiting ROOT-9's look)
| file | status | px changed | out_diff | size |
|---|---|---|---|---|
| por-consort-c05-t5-a18 | clean | 338 | 0 | same |
| por-consort-c03-t8-a26 | clean | 481 | 0 | same |
| por-consort-c01-kc-a18 | clean | 375 | 0 | same |
| por-maid-m01-a18 | clean | 337 | 0 | same |
| por-maid-m28-t8-a51 | clean | 246 | 0 | same |
| por-maid-m01-ty3-a18 | clean | 274 | 0 | same |
Singles: https://ctm-img.victoria-tntt.workers.dev/img/_review/hoa-dien-art/b1/{before,after}/<name>.webp . fig/hd twins of these tested: 10/11 clean (1 hd missing on CDN), out_diff 0.

## STEP 2 (8 sprites + 7 icons, NOT live, waiting ROOT-9's look)
Magnific gpt-2-6, folder ba4aecfe; picked (bg-removed) creations: hd-mai 3z5qLf9REY, hd-dao 9ZFu1azNYZ, hoadien-bac 6AqFxueiJO, hd-diep fHG2T2LCDY, hd-lan ovN4A9Y829, hd-sen 5jMToDeKxe, hd-maudon huZ3WG4vqL, hd-phuong SymIuCdUb8 (sources jUBdt57LD0, rgdpInMxtc, tC36GyfmZJ, LwoXhpQswO, 3z5qxbzREY, 1leD8Xwr4r, SymICCBUb8, 5jMTXIvKxe).
Files (names the code requests): img/hd-hd-{mai,dao,diep,lan,sen,maudon,phuong}.webp + img/hd-hoadien-bac.webp (long side 192, 9–16 KB); img/wd-hd-{mai,dao,diep,lan,sen,maudon,phuong}.webp (256², 8–15 KB). Review copies: img/_review/hoa-dien-art/sprites/.

## Pending
- ROOT-9 look on batch 1 + sprites; lossless decision; W2c consort-ty skip list.
- Whole-family detector pass (counts per family) running; then batches by family (por → fig → hd → tn), counts reported per batch.

## UPDATE 17/11 ~21:15Z — STEP 2 DONE (live), STEP 1 in progress, HANDOVER (context rollover)
Code: review/hoa-dien-art @ 08318bb6. Foreman: ROOT-10 session_011xDdVReyG8hSRH5URJJdVX.

### Sprites/icons LIVE (owner rounds: 10/tier → +10 different type/colour → no black/white/birds)
- img/hd-<key>-NN.webp (long side 192; hd-phuong-05 256) + img/wd-<key>-NN.webp (256²), key ∈ hd-mai, hd-dao, hoadien-bac, hd-diep, hd-lan, hd-sen, hd-maudon, hd-phuong; NN 01..20 = 320 files, --check all same.
- Legacy single names also live: img/hd-hd-*.webp, img/hd-hoadien-bac.webp, img/wd-hd-*.webp (= design 01; hd-lan = jade orchid, hd-mai = red plum).
- Phoenix kept only as the t8 rank sign (ROOT-10/owner). No fruit, no leaves, no black, no white, no birds.
- CODE SIDE (Foreman B / main) must read the -NN names (10→20 variants per tier) — not done by me.
- Generation ids: dev/art/hoa-dien-art/grids*.txt, gens.txt; total ≈ 3.5k credits.

### Forehead cleaning (STEP 1) — owner-approved harmonic method (no grain)
- Tool: detf.py (locate v3b/v5 + brow guards + box mask) + det3.remove (Laplace), clean3.py (por, LOSSLESS, out_diff 0), twin.py (fig/hd/tn, q98, out_mad vs base_mad ≤ +0.2 = ROOT-9 rule).
- POR run (this container /home/user/wt/hda/all): 6,403 women por (all families EXCEPT consort-ty), ~5,600 done at 21:15Z; logs log_part1.jsonl + log_chunk.*.jsonl; outputs out/. NOTHING of STEP 1 uploaded yet.
- Inputs downloaded: all/por (6,403), all/fig (6,403), all/hd (2,804), all/tn (840).
### Remaining (successor)
1. When the POR run ends: counts per family (clean/nomark), 2 sample before/after per family to ROOT-10 (img/_review/hoa-dien-art/<family>/), look at 4× zooms of ~20 random per family (brows!), then cdn_sync out/*.webp to img/ (same names).
2. twin.py fig → hd → tn per family from the por log (PORSRC = ORIGINAL por dir, not cleaned); QA table; upload.
3. consort-ty: skip W2C_SKIP_KEYS_hoadien.txt (handover branch, 574 keys) + 16 W2c batch-1 keys; the 48 finished W2c keys (/home/user/wt/hda/w2c54.txt; ROOT-9 said 54) → fig+por now, hd only after W2d session_011xDdVSFebEJbrw8z3ZeoVU says.
4. W12 session_011xDdVNfbdbZPTtegkYCYtp: 681 maid trung-y keys restored from sheets → clean after its message.
5. Leftovers by hand: m44-t3 a26/a36 (old botched shrink), any pendant dots seen in QA.
6. STEP 3: HD_ANCHOR table from the 'anchor' field of the logs (por px; code wants /4000 of img) — after fig/hd.
If the container is gone: rerun clean3.py on por (≈1.5 h with 4 workers, OMP_NUM_THREADS=1) — tools are in the branch.

## FINAL 17/11 ~21:55Z — R5e4 DONE (POR uploaded, option A by ROOT-11)
- POR clean3 run: 6,403 women por (no consort-ty): clean 3,927 / nomark 2,476. Per family clean/nomark: consort t 931/93, kc 55/73, tm 181/458; maid t 1,322/342, ty 1,247/417, tm 85/747, kc 53/155, base 21/187; player 32/4.
- QA all 3,927: same w×h, pixel diff outside the mask = 0 (lossless webp). Look: 30 random at 4× — brows/hair intact 30/30; ~1/3 still show a faint/partial mark (pale ornate ty/t at a26–a51); ~2/3 of sampled t 'nomark' are real misses → 2nd pass = hoa-điền #2 session_011xDdVNfSx9r7wqg7ooEXKn.
- UPLOADED to img/ (same names): 3,927 (uploaded_por.txt on review/hoa-dien-art 65c0c2c5); final --check: 3,890 same, 37+ maid-ty differ = newer files written by W12 (maid trung-y restore) during my upload → left alone. RACE: my upload may have replaced W12 restores done before ~21:50Z on maid ty keys (uploaded_maid_ty.txt, 1,247 keys) — W12 told to re-push its restored keys; #2 cleans them after.
- Sprites/icons: 320 live (see 21:15Z update). Logs: dev/art/hoa-dien-art/log_por.jsonl. Nothing else pending from this session.
## UPDATE 17/11 ~23:45Z — hoa-dien #2 (session_011xDdVNfSx9r7wqg7ooEXKn) — fig/hd LIVE, consort-ty por LIVE, HANDOVER (context 26 %, START 5 %)
PRIORITY #1 CHECK: OD 17/11 ~17:30Z/~17:45Z/~20:00Z | main none (art) | review/hoa-dien-art 8f7586ce | claims hoa-dien-art.
Foreman now ROOT-12 session_011xDdVP8NwhY7F8EwPHbZsi (ROOT-13 when open). Code + logs: review/hoa-dien-art dev/art/hoa-dien-art/ (README v3).
### LIVE on CDN (md5 verified; lists in the branch)
- fig pass 1: 2,842 (uploaded_fig.txt, log_fig.jsonl). hd + hd2 pass 1: 1,238 (uploaded_hd.txt, log_hd*.jsonl). consort-ty por: 492 (uploaded_por_consort_ty.txt, log_cty.jsonl = 450 non-skip + 48 w2c54; 6 nomark).
- QA every file: size same; fig/hd q98 out_mad ≤ base+0.2; por lossless out_diff 0. Looked at random sheets per family; ROOT-12 OK'd singles (fig, consort-ty).
### NEW TOOLS
- guided.py = 2nd pass for twin misses (twin 'nomark' is ~17 % of fig and is usually a REAL miss: re-painted pose, mark small). Pilot 10/12, brows intact.
- por2.py = POR 2nd pass for faint leftovers (#1's ~30 %): guided mask at por scale on the pass-1 result; looked: removes the leftover outlines, does nothing harmful on already-clean ones.
- resume.sh (resumable twin runner, PORLOG env), runclean.sh, stage.py (QA + copy to upload dir), look.py.
### NOT DONE (successor; my container's data is NOT reachable — re-pull from CDN; ORIGINALS: live por of #1's 3,927 are now cleaned, the true originals are only in img/_keep? NO — re-pull is impossible for por originals; use the live pass-1 por as input for por2 (guided needs log_por.jsonl box/anchor only), and for twins PORSRC must be the ORIGINAL por → for twin work on por already live-cleaned, template match still works on the cleaned por (forehead+eyes patch, mark removed is tiny) — check score ≥ 0.93.)
1. W12 680 maid-ty keys (restored, still marked; NOTHING uploaded): pass 1 done here: por 512 clean/169 nomark, fig 386/124 miss, hd 465/45 miss (logs log_w12_*.jsonl). Rerun: w12_run.sh then w12_run2.sh (por2 + guided) on a fresh pull of img/{por,fig,hd/fig}-<key> (list img/_review/restore-ty/KEYS_RESTORED.txt), look, 4 singles to foreman, upload.
2. consort-ty twins: fig of the 498 (cty list = log_cty.jsonl names) and hd of the 450 non-w2c (hd of the 48 w2c54 keys HELD: ask lead #7 session_011xDdVNkgEgTqsZJxUh9Xd8 / W2f first).
3. guided 2nd pass on twin misses: fig 571 (log_fig.jsonl status nomark/noface), hd 76 (log_hd.jsonl) → look → upload.
4. POR 2nd pass: por2.py on the live 3,413 pass-1 por (uploaded_por.txt minus W12 keys) with log_por.jsonl → look → singles → upload. Then por 'nomark' misses (~1,000 + 169 W12 + 6 cty): no anchor → idea: guided with a per-person median anchor (relative to face) from the clean logs; NOT tried yet.
5. tn: foreman OK'd: at the END regenerate all 840 img/tn/* with dev/art/tn_make.py from the cleaned live por/fig (same names; do NOT push TN.json); 4 singles first. (Live tn are older paintings, MAD 20–33 vs today's sources; detector can't work at 2–3 px marks.)
6. HD_ANCHOR table (STEP 3) from the 'anchor' fields of all logs; leftovers by hand (m44-t3 a26/a36).
Bytes: fig q98 +18 % vs originals (233→275 MB).
