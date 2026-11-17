PRIORITY #1 CHECK ('feelings-18|faceKeyFor|feelActTick|bove'): OD 0 new (rulings 18:33Z–20:45Z read verbatim) | ledger 0 | claims 8 | main 0 (jfeel not on main) | review/* review/feelings-18 (this job), review/mood-mem-r2 (base, own reviewer)

# REVIEW — FEELINGS-18 r1 (BIG, opus)
Reviewer session_01UV1SziX79WYk6de8Qzdw9E · foreman C-AG #6 session_01UV1SzjqdQPh2K9YUVK9VhU · START_CTX ≈ 5 % of 1M (rollover line 30 %, ceiling 60 %).
Target review/feelings-18 dec84f17 · base review/mood-mem-r2 1b4f4967 · range 1b4f4967..dec84f17 (mood-mem delta not re-reviewed).

## VERDICT: PASS 5ca1b262 (branch review/feelings-18-r1)
5ca1b262 = dec84f17 + one reviewer fix (below) + site rebuild. It fast-forwards from 1b4f4967.
LANDING NOTE: review/mood-mem-r2 has moved to 68178e5d (its reviewer changed jmem.js + jmoodknow.js + VANPHONG + the build). At landing, rebase 5ca1b262 onto the live mood-mem sha, then rebuild the site (jmoodknow.js is touched on both sides, but in different lines), and re-run feelings18 + mood-mem.

## Reviewer fix (commit 5ca1b262)
BUG: Hờn dỗi → "Không tiếp, bỏ về" when the sulk is at the Emperor. That is the common case (jmoodknow HỜN: "Hoàng thượng for a consort"). The act called relAdd(p, S.emp). j9 affAdd/oanAdd key relations by y.id, and the Emperor has no id, so:
- her act wrote S.rl["undefined"] = −5 and S.ro["undefined"];
- S.emp.rel became NaN (saved as null), and S.emp.oan was set;
- an NPC's act wrote v.rl["undefined"].
The daily sulk drift (feelBuoi → affAdd(p, t)) did the same.
FIX: a sulk at the Emperor costs Sủng instead (BAL.feel.act.fx.bove.sung = 1, through the same pay() as every other act, so it prints "Sủng −1"). The drift skips the Emperor.
TEST: feelings18 gets a new case, "hờn at the Emperor: bỏ về costs Sủng, no 'undefined' relation key", for her and for an NPC. It FAILS on dec84f17 and PASSES on 5ca1b262. feelings18 is now 34/34.

## CHECK 1–11
| # | check | result |
|---|---|---|
| 1 | 18 × 3; muu out; old saves; Chạnh lòng | PASS. EMO has exactly the 18 approved keys, with VANPHONG names and the 6 heavy names. Old keys are converted at the one entry point (emoSet, mkAdd, feelMig, p.emo/emoH): dau → buon at the heavy level (hv keeps BAL.mood.emo.dau on the bar), muu → no feeling (emoH row → binh; same effect as "muu→binh"), khoc → none, because crying is an act. Chạnh lòng = the one constant EMO_GHEN (jemo:13), used by FEEL_N.ghen. |
| 2 | bar = signed sum; acts need heavy + bar; numbers in BAL | PASS. feelBar = moodBar (MOOD-MEM: signed sum of causes). feelActTick fires only when the feeling is at the heavy level AND the bar is past the jemoact line on its side. Thresholds, odds, timers and cooldowns all come from BAL.feel / BAL.ea. Text prints no typed numbers. one-core-guard PASS. Nit (no FAIL): code has fallbacks `BAL.ea.out.v||45`, `bar.out||25`, `bar.act||11` that repeat BAL values. They are harmless while BAL exists; remove them when this code is next touched. |
| 3 | 17 acts, own face, khắc + cooldown in BAL, NPC parity | PASS. BAL.feel.act.main matches the OD 20:45Z list (Bình thản has none). The act names reuse the existing reaction words: Lo âu → "Thức trắng đêm", Vui → "Ban thưởng cung nhân", Buồn → "Khóc suốt đêm"/"Khóc vì uất ức"; same meaning, VANPHONG. Each act has its own face "act-<feeling>", BAL.feel.act.kh timers, and per-feeling BAL.feel.act.cd. Other NPC roles use BAL.feel.act.g with the same face. NPC acts are host-only (feelWorld); coop-one-world PASS on seeds 7 and 3. |
| 4 | intent never on the seal or card | PASS. faceKeyFor returns kind 'act'\|'feel' only. No "Toan tính" line, no toantinh art key. A live intent is skipped. Intent can be read only through feelIntentOf (no UI). |
| 5 | seal for known people; Người lạ none | PASS. emoKnown = kitIsKnown; kitEmotion returns null for a stranger, so there is no seal and no grey "?". The shots show silhouette + "Người lạ" with no seal or makeup. Causes still need scouting: the tap dialog shows "Nguyên do chưa rõ · còn 12 khắc" for an unscouted NPC. NOTE for the kit-figure-mood worker: faceKeyFor(pid) itself is NOT gated (it returns a face for a stranger). Any new caller must gate with kitIsKnown/kitEmotion, as emoBadge does. |
| 6 | whole-family scan (my own grep, wider than the worker's) | 0 unconverted feeling reads. The full list of what is left is below. |
| 7 | every act changes state | PASS after the fix. My probe forced each of the 17 acts for her and for a consort (bar forced past the line, roll forced). Every one fired, with face act-<k>. State moved as follows. Her: khóc Sức −8 · đập đồ Danh −1, Bạc −12 · cáu gắt a maid's Lòng −3 · trốn/cáo bệnh Danh −1 · mất ngủ Sức −10 · bỏ dở Tài −1 · bỏ về (fixed) · nói móc Danh −1 + target · ban thưởng Bạc −15, Lòng +5 for each servant · khoe tài Danh +1 · mời Sủng +1 · trêu Lòng +1 · làm một mạch Tài +1, Sức −3 · quên giờ Tài +2, Sức −2 · sáng tác Tài +1, Danh +1. NPCs: the same moves on their own stats. Ngồi thừ người only vents the bar (its fx is vent only, by design). EA_H export works; the old closure-only bug is gone. |
| 8 | kit first; VANPHONG | PASS. No UI was built. The seal is the existing kit layer (emoBadge → pcPort) drawing faceKeyFor().art. Act art that is not painted yet falls back to the feeling's seal (act-buon → emo-buon, seen in the shots). Wording is cổ trang, with no % and no numbers in prose. Open for main's kit-figure-mood worker: the tap dialog ("Tâm trạng · …", "Hiện nay: Đau khổ") does not yet show the faceKeyFor lines "Đang: <act>", so an act is visible only through the seal. |
| 9 | act rate 17.5 / 100 tuần | No flood, so I recommend NO BAL change. 17.5 per 100 tuần across the whole palace is about one act every 6 tuần, which is tiny next to the deck and the news. My probe shows why it is rare: one heavy feeling alone moves an NPC bar only −9 (Choáng váng) to −33 (Vui +33), so acts need several causes stacked, as OD 18:33Z intends. Her line (BAL.ea.out.v 45) is even harder, which is why the bot shows 0 acts for her. The risk is that acts are too RARE to be seen ("họ khóc mình vẫn thấy họ khóc"), not that they flood. If main wants more, lower BAL.ea.npc.bar.out (25) or raise BAL.feel.act.o (35). That is a main/owner call; I changed nothing. |
| 10 | tests (head vs base) | See the table below. |
| 11 | devices | Fold 755x1000@2 and iPad 1180x820@2, Hậu cung card. Known Hoàng hậu with heavy Buồn + the Khóc act: seal on the large portrait (act face falls back to the Buồn art), the list avatars show seals for known people only, and the seal tap opens the kit mood dialog with the cause unscouted. Người lạ card: silhouette + "Người lạ", no seal, no marks. No page errors, no overflow seen. Shots are in scratch only (none in git, none on the CDN). |

## Tests
| test | head dec84f17 | base 1b4f4967 | fix 5ca1b262 |
|---|---|---|---|
| feelings18 | 33/33 | — | 34/34 (new case FAILS on head) |
| ag-moodknow | 33/33 | 33/33 | 33/33 |
| moodknow-step0 | 19/19 | 19/19 | 19/19 |
| mood-mem | 16/16 | 16/16 | 16/16 |
| one-core-guard | PASS | PASS | PASS |
| emotion-acts (755x1000) | PASS | PASS | — |
| emotion-acts-2 (755x1000) | FAIL hoitimid only | FAIL hoitimid only (same, not new) | — |
| coop-one-world seeds 7 / 3 | PASS / PASS | PASS / PASS | — |
| QUICKCHECK --cpu 4 | open, old save, perf, time-spill PASS; G1 one-core-bind FAIL (6 mismatches at j25.js:11 + j78.js:127, BAL.eff.j9/j2) | G1 the same 6 mismatches (pre-existing, not new) | — |

## Whole-family scan (my grep: every quoted "dau"/"muu"/"khoc", EMO_x.dau/muu/khoc, emo-*dau/muu/khoc art keys, and `dau:`/`muu:`/`khoc:` table keys in dev/build/j*.js, with jfeel's own conversion excluded)
38 hits. All fall into 4 kinds; none is an unconverted feeling read.
- Not a feeling (unrelated meanings of the same word):
  - "dau" = con gái: j20:20/27, j67:75, j8, jexam:104/107, jts:205/210.
  - "dau" = Dấu ấn: jmark:94/96.
  - jface:98/113 FXILLX/FXDOCX: KIT_EXPR mix keys of the illness face, not EMO.
  - "muu": jmind:43 SK.muu (the Mưu tính skill), jsgame:277 ctx "muu".
  - "matngu" = the illness key: j13, j72, jemoact eaIll.
- On purpose:
  - jbal2:286 BAL.mood.emo.dau (the heavy grief weight, read through hv).
  - jbal2:869 BAL.ag.day.mood.dau (read as heavy Buồn by jagday).
  - jtrong:71/74 TR_MH/TR_MW dau (read as heavy Buồn by trMK).
  - jemoact eaGrpK:119 still accepts dau/khoc (harmless compat).
  - jemoact khoc = an ACT key: 30, 48, 202, 233, 234, 315, 502.
- Dead config (never read now; harmless; tidy up when next touched):
  - jbal2 BAL.mood.emo.muu (0) and BAL.mood.emo.khoc.
  - BAL.mood2.dur.k dau/muu/khoc.
  - BAL.emo2.khoc ev/v/o: the khóc turn is gone; slap/slapV/tr are still read by jmoodknow's slap.
  - BAL.emo2.w/od/loy/lv.khoc.
  - jmoodknow:177 EMO_NIGHT/EMO_DECAY.khoc writes.
  - jmoodknow:176 comment "Seal art keys: emo-khoc".
- Seal-art sites (img/kit/emo-): jemo emoBadge and jevb 48/63 draw faceKeyFor().art. jk2b:589 and jkitpage:105 are the kit sample and old pages, keyed by the current EMO keys.

## Notes (no FAIL; for main / the next owner of this code)
1. Temper can block the ONE act. If r.ok() says no, there is no act at all:
   - a timid consort with heavy Giận never does "Đập đồ";
   - a stingy consort, or one without servants, with heavy Vui never does "Ban thưởng";
   - Chạnh lòng with no rival target (eaRival needs oán > 10 or a cause target) never does "Nói móc".
   The worker designed this on purpose, so I did not change it. If the owner wants "giận → đập đồ" to be fixed for everyone, drop the ok() blocks for the main 17.
2. faceKeyFor is not gated for strangers (row 5). The kit worker must gate it.
3. The tap dialog does not show the act ("Đang: …") yet. That is the kit-figure-mood worker's job.

Shots: scratch /home/user/wt/f18r-out/shots (deleted at the end); none in git or on the CDN.
