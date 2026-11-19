# MMX4 — ma ma SAMPLE Lượt 573 (m05 + m13 × a36/a51/a65)
depth 4 (limit 8). START_CTX ~3 % (get_session reads 0; estimate). Parent ROOT-51 session_01PEhRbv7bE33BmBdtEDJ1zF.

## Done (19/11 ~19:10Z)
- Prompts: `build.py mNN v0 --state mama --nostyle --noflower --twocol "deep teal" --age aXX` → mama-specs/mNN-aXX.oneref.twocol.noflower.prompt.txt; check_store PASS 6/6 (approved_check PASS).
- Secondary per two-new-8rank.md §5: m05 coral red + deep teal; m13 lilac + deep teal.
- Gens gpt-2-6 1024x2304 2k seed 7172, folder ba4aecfe, references = ONE kc_ref only (m05 KLpSlnEkqp, m13 VX7IB7sMMU). No regen needed.

| | gen | cut |
|---|---|---|
| m05 a36 | TdwK2CXVNR | SyhMrolUb8 |
| m05 a51 | hu2Je8PvqL | bxMZC0r5Y2 |
| m05 a65 | 9ZHIS9dNYZ | TdwKGSqVNR |
| m13 a36 | vQAOXpBa47 | kseGQFB16B |
| m13 a51 | If3UDD3tvE | KLpAuFakqp |
| m13 a65 | jUoWqKELD0 | rgXnHKjxtc |

- SHEET: dev/handover/review-sheets/mama-sample-L573-m05-m13.jpg (CDN img/_review/mama-mass/twocol/mama-sample-L573-m05-m13.jpg); per person mama-twocol-m05/m13.jpg (OLD 1 màu | NEW 2 màu).
- Gate (looked at full size + face strip): 2 colours in big areas (teal skirt, cuffs, sash), no glare, NO hair flower (the old ones had a yellow flower), clean forehead at all 3 ages, items differ by age. m05 a51 and m13 a65 gens had a dark glow behind them; the cut removed it.
- Ledger 6 lines (OWNER-DESIGN, refs = kc_ref only). mmx3.py ledger fixed: cmd adds `v0`, old 2nd ref 79fNlPEJAL dropped, `who` from MMX_WHO.
- Credits: 6 × 135 + 6 × 3 = 828.

## NOTES for the owner (LAW #0: notes only, nothing changed — có muốn sửa không?)
1. B8 says the face words are COPIED from mNN.v3.FULL.txt, but the builder has no such flag: the prompts carry only "face exactly as in the identity reference". Faces still read as her (the ref carries them).
2. The builder ends with "Eyes soft, warm and round-almond, never slanted or upturned". That conflicts with m13's PHOENIX eyes (upturned outer corners), and the m13 gens have round eyes.
3. m13 a51 looks young for 51 (silver streaks are there but the face reads ~36); m05 a51 ages better.
4. The new hair has a long loose back fall and a hair ribbon that come from the thiếu nữ ref. The old ma ma had a neat high bun.

## STATUS: STOPPED, waiting for owner GO. No mass.

## OWNER VERDICT Lượt 583 (via ROOT-51, 19:07Z)
1. Colours of the OLD ones are fine (old m05 a36 a bit too fresh; older ages fine) → the new two-colour version must keep that soft, held-back tone (B18), not fresher.
2. Hair UP in a neat bun at every age: no long loose fall, no ribbon (F11).
3. Faces may look younger than their age but must clearly BE that age; a51 must never read 18–26 (D13).
BW3 is fixing the builder. MMX4 on HOLD: NO gens until ROOT-51 says so.

## 19:22Z PREP ONLY (ROOT-51: builder has F11 bun + one ref; colour tone still being reworked by BW4; HOLD, no gens)
- Rebuilt with `build.py mNN --state mama --age aXX --nostyle --twocol "deep teal" --noflower` → mama-specs/mNN-aXX.oneref.twocol.noflower.f11.prompt.txt (6 files); check_store same args PASS 6/6 (approved_check PASS).
- Diff vs my sample prompts: face words now copied from v3.FULL (note 1 solved); "never slanted or upturned" removed (note 2 solved); D13 line "looks younger than her age but still clearly about fifty, never 18–26"; hair = ALL pinned UP in a neat bun, NO loose hair, NO ribbons (F11). Colour sentences unchanged (waiting for BW4 B18 tone).
- Remaining text (note only): the identity sentence still says "keep ONLY her face, facial features her own hairstyle ... and hair colour" (hairstyle from ref vs F11 bun line).
- Next on GO: pull, rebuild with BW4's colour change, gate, gen m05+m13 ×3 (seed 7172, one kc_ref), sheet, send, STOP.

## 19:45Z BW4 REBUILD (ROOT-52; builder 043d1c6) — prompts + gate ONLY, no gens, HOLD
- `build.py mNN --state mama --age aXX --nostyle --twocol auto --noflower` → mama-specs/mNN-aXX.oneref.twocol.noflower.b4.prompt.txt (6); check_store same args PASS 6/6 (approved_check PASS).
- Colours: m05 coral red #D4897D + teal #499597; m13 lilac #C3A1CE + deep teal #468E91. a51/a65 = calmer, softer, less saturated, same lightness, "never darker or heavier" (B18).
- Identity: "keep ONLY her face, facial features, hair COLOUR and signature colour family" (no hairstyle). F11 bun + D13 lines kept.
- Note: no phi bạch / sheer-stole sentence appears in the ma ma prompts (F12 seems not to apply to ma ma, which wear no phi bạch).

## 20:20Z ROOT-53 OWNER ORDER
Only faces of groups SẮC SẢO / TINH NGHỊCH may be produced (dev/art/face-common/LOOK_GROUPS.md). m13 (Tươi tắn) is STOPPED and dropped from this job; m05 (Sắc sảo) stays. HOLD for J2 rebuild + owner GO. Foreman now ROOT-53 session_01PEhRbuf8GDz77QZRdK2XXP.

## 20:50Z REBUILD on 98fa7a3+877944c (ROOT-54; m05 only) — gate ONLY, no gens
- Pulled to a8dbfcd. `build.py m05 --state mama --age aXX --nostyle --twocol auto --noflower` → mama-specs/m05-aXX.oneref.twocol.noflower.r54.prompt.txt (3); check_store same args PASS 3/3 (approved_check PASS).
- Present in all 3: neat bun, NO flowers in hair, NO ribbons, TWO-COLOUR (coral red + teal), m05 face words.
- Changes vs b4: items now a36 lidded food carrier, a51 abacus (E6). a51 D13 "clearly about fifty" line removed (D13 Lượt 624: verbatim 18/11 Thái hậu age text).
- NOTE for the owner (LAW #0, nothing changed): a51/a65 colour text is back to "DEEPER, DARKER ... deep burgundy / deeper dusty coral red" (the 18/11 Thái hậu wording). That contradicts B18 (Lượt 583: ma ma tone soft and held back, never darker) which the b4 build had. Which one should win for ma ma?

- 20:48Z ROOT-54 RULING: J2 wins for a51/a65 (owner Lượt 620/622 "everyone, every group, every rank, maids too"; B18 covers only a18–a36). Keep the DEEPER/DARKER Thái hậu colour text for ma ma a51/a65 (never vivid, never grey/black/mud). r54 prompts (8742bd7) accepted. HOLD until GO after BW6 same-rank fix.

## 20:56Z OWNER STOP (via ROOT-54): no Sắc sảo face pictures. m05 (Sắc sảo) ma ma CANCELLED. MMX4 job now empty (m13 dropped 20:20Z, m05 cancelled). No gens made since the Lượt 573 sample. IDLE.

## 21:15Z GO (ROOT-54, repeated by ROOT-55 session_01PEhRbuVvNzbWughTNoFwoa) — GENS PERMISSION-BLOCKED
The 3 m05 gens from the r54 prompts were refused by the auto-mode permission check: a36 and a51 denied; a65 approval prompt closed unanswered; then the session restarted. 0 gens, 0 credits. Not retried. Told ROOT-55 with the prompt paths. Needs owner approval of images_generate in this session, or another worker.

## 21:17Z ROOT-55 made the 3 m05 gens itself from my r54 prompts (gpt-2-6 1024x2304 seed 7172, one ref KLpSlnEkqp): a36 BhNUblSoQR, a51 KLpnPqWkqp, a65 fHzNsafCDY. ROOT-55 does the sheet and the look. MMX4 makes NO gens; waiting.
ROOT-55 19/11 ~21:30Z: ROOT-55 gen'd the 3 r54 prompts itself (gpt-2-6 1024x2304 2k seed 7172, ref KLpSlnEkqp): a36 BhNUblSoQR, a51 KLpnPqWkqp, a65 fHzNsafCDY. Sheet dev/handover/review-sheets/mama-m05/m05_mama_r55.jpg sent to owner (Lượt 689).

## 21:25Z OWNER Lượt 694 (via ROOT-55): ma ma OK, "do NOT change anything any more". Recipe FROZEN (ART_RULES D16): a36 = m05-a36.oneref.twocol.noflower.r54.prompt.txt; a51/a65 = m05-aNN.styleref.r55.prompt.txt (style lock + her a36 picture as 2nd ref); gpt-2-6 1024x2304 2k seed 7172. FINAL m05: a36 BhNUblSoQR, a51 gOmpWytSXO, a65 eIPlkhrdqL. No prompt edits; no gens until ROOT-55 GO.
