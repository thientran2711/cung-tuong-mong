# KYNGO — «Kỳ ngộ thường ngày» (daily rare fortune encounters) — STEP 2 DESIGN (E18, waiting for MAIN's OK before any build)

PRIORITY #1 CHECK ('kỳ ngộ'): OD 5 (OD "(19/11 ~03:30Z real)" owner-ordered build, freeze lifted for this item; OD "(19/11 ~03:25Z real)" no double gate) | ledger 0 | claims 5 (story-bound rares; E16 expert DONE 018d29b8) | main 3 (j97.js Cơ duyên hiếm, jroad RD97L, j96 — story-bound; reused below, not duplicated) | review/* 0 | archive 11. git grep origin/main 'kyngo|kỳ ngộ thường|BAL.kyngo' → 0 hits (nothing to reuse under that name).
★ THE 18 LAWS: read the block at the very top of dev/rules/START_CORE.md FIRST (all 18; laws 1–6 top priority); put this line in every brief/takeover prompt; reviewers FAIL any break.
Source: dev/handover/reports/hist-kyngo.md (E16 expert, law 8). Owner words: OD "(19/11 ~03:30Z real)" + "(19/11 ~03:25Z real)" (read verbatim, not restated here, law 15).
Worker: E18, depth 8, START_CTX ≈ 3 % of the window.

## 1. What it is (one paragraph)
On an ordinary buổi, when a person (her, or any NPC) is at a place and a REAL person + a REAL object (or a real fact) for one of the encounters below are there at that moment, the game may roll a small, rising chance. A hit opens ONE event card with that person: a hidden master, a lost treasure, a chance favour. The reward is BIG (a lối learnt, a big art jump, a Ngự tứ-class piece, a hidden ally/informant, real evidence, a big Danh / Sủng / Bạc gain). Each encounter happens at most once per life per person, is remembered in Sổ luân hồi like j97, and NPCs meet the same encounters by the same rule.

## 2. Reuse map (law 13 — nothing rebuilt)
| Need | Existing part (origin/main) |
|---|---|
| She arrives at a place | `goTo(k)` (j2) → `S.visit.people` = who is really there (wrap, never edit) |
| Where NPCs are this buổi | jagday day plan → `S.where[id]`, `S.where.emp`, Thái hậu; men `menPlace` / `S.menW` (jmen); fixed posts: `S.court.tq/ksp/ty/ped`, named staff gt/tn/kn (jstaff), Phế phi họ Lý `lcPeople` (lc) |
| Real objects | ONE item ledger jil.js: chests `p.inv`, `S.il.box` ("nvp" dead person's effects / store, "mkt", "cct", "emp", "th", "srv"), `ilGone` / `ilTake`, `S.il.log`; lost pieces = jlost open cases `S.lost[]` (st "lost"); pets `p.pets` (jpet); Nội vụ phủ weekly rare piece `S.adRare` (jact) |
| Real facts / evidence | j8 `evA` counters, j78 `intelLearn`, j70 pending plots `p.pend`, jlost case evidence `cev` |
| Rewards | `apply` (her) / `ap` (NPC); arts `S.arts`; lối learning `S.rcpL` (jrcp hand-copied sheet / teacher road); informant `s.spyFor="me"` (j10 tai mắt); thiện cảm via KIT_REL; Ngự tứ items via IT + `nt:1` entry flag like j97 `r97give` but MOVED from a holder (see §6) |
| Hidden rare roll + memory | j97 shape: one hidden roll, cost-only option cards, Sổ luân hồi in localStorage (own key, own line) |
| NPC choices | `mindPick` (jmind) over the same option list with the same values |
| News of NPC fortunes | `newsAdd` (j28) seen-rule + `kitNotice` (§42.2) when it touches her |
| Two-way risk after keeping | jlost recognition / `loKeepHear` hearing; spy discovery rules (j10); jmen MEN_ZONE "caught with a man" rule |
| Calendar / weather / world | `festToday` (FEST, j31), `wxSev` (jweather), `worldWin(k)` (jworld) — weights only, never gates |

## 3. The ONE gate + the roll (owner OD 03:25Z: no double gate)
- ELIGIBLE buổi = she is at a place (arrival through goTo, or a Hành sự act done at a place — the act's place counts as being there) AND at least one encounter below has, right now, a real WHO present at that place and a real WHAT (object/fact) existing, and is not used up (once per life) and not on cooldown. That is reality, not a stat gate: stats, rank and relations only change WHICH encounter and HOW BIG, never WHETHER the roll happens.
- At most ONE roll per person per buổi (first eligible arrival of the buổi). Never re-rolled behind her back.
- Chance (hidden, j97-style): `p = min(BAL.kyngo.pMax, BAL.kyngo.p0 + BAL.kyngo.step × miss) + festival/weather bonus` where `miss` = eligible buổi since the last hit. Hard pity: when `miss ≥ BAL.kyngo.pity` the roll is sure. A hit resets `miss` and starts a cooldown of `BAL.kyngo.cd[band]` tuần (no rolls during it, `miss` does not grow).
- Which encounter: weighted pick among the eligible ones: `BAL.kyngo.E[id].w × BAL.kyngo.pw[place] × fest/wx/world multipliers`.
- Omen (telegraph, hist-kyngo §c(6)): the event text opens with one omen sentence (a fragrance, a bird, wind) — text only, no extra UI.
- TUNING RULE (from OD 03:25Z, written into the measure): the bot first measures eligibility `e` = share of her buổi that are eligible, per rank band and play style; then p0/step are set FROM `e` so that the mean gap is the target. If e ≈ 1 the base sits near the story rares (9–13 per hundred); the lower e is, the higher p0 goes (up to a sure thing via pity). Starting numbers (to be replaced by measurement): p0 8, step 2, pMax 50, pity 18, cd [2,3,4] tuần.
- TARGET (owner 03:30Z "roughly one every few weeks of game time"): a normal player meets one every 3–5 tuần (12–20 buổi at 4 buổi a tuần); report mean, p10, p90 gap and the share of lives (≥ 6 game months) that see zero — must be ≤ BAL.kyngo.zeroMax (5 per hundred).

## 4. Rank bands (law 5: harder / rarer as she climbs, early life not starved)
| Band | Ranks | Pool | Cooldown | Reward size | Trials |
|---|---|---|---|---|---|
| S (cung nữ road, `isSrv()`) | servant ranks | S-marked encounters | cd[0] | value V[0] | base odds |
| L | Đáp ứng – Quý nhân (rank 0–2) | widest (all L) | cd[0] | V[0] | base odds |
| M | Tần – Phi (3–4) | M-marked (some L ones drop: a ma ma will not teach a Phi in the kitchen) | cd[1] | V[1] | odds − BAL.kyngo.hard[1] |
| H | Quý phi – Hoàng hậu (5–7) | H-marked, fewest | cd[2] | V[2] | odds − BAL.kyngo.hard[2] |
Numbers: `BAL.kyngo.band`, `V`, `cd`, `hard`. A bigger reward at a higher band always comes with a harder roll inside the option (law 5) and a longer wait.

## 5. Equal value + gain-and-loss (laws 2, 3)
- Every option's value is priced by ONE table `BAL.kyngo.vw` (value weights: Danh, Sủng, Bạc per 10, thiện cảm per 5, art step, a lối, an informant, an evidence step, item = its IT price / 10, Sức, khắc). Each option of one encounter sums to `V[band] ± BAL.kyngo.eqTol`. A bot script (dev/test/kyngo-eq.js) prints every option's value per band and FAILS if max/min > eqTol (law 2 proof, like hist-kyngo §b).
- Every option carries a gain AND a loss (law 3), except the plain-gain encounters (marked «plain»), which cost only time (khắc) and are allowed by law 3.
- Cards show only costs (28.6 cost mode); outcomes hidden like j97; any option that contains a roll shows its odds as a ladder word only (kitOptOdds, law 7). No % anywhere; the fortune roll itself is never shown.

## 6. Real people, real objects (law 6) — the conservation rule
- WHO: chosen at roll time only from people who are at that place in that buổi (S.where / S.visit / fixed posts / men's places) and alive. If no such person: the encounter is not eligible (never conjured).
- WHAT: either (a) a piece already in the ledger — it MOVES (holder before → after) through `ilGone`/`ilTake`/the jlost case close, logged in `S.il.log` with how = "kyngo:<id>"; (b) a piece CRAFTED on the spot by that real person from their real skill (a painting by the Họa sư, a calligraphy by the Emperor — crafting is a legal source per ITEMS_EARNED.md); (c) a fact/knowledge (lối, art step, evidence, intel) — no object. Never a piece from nothing; never a vanished piece (if she refuses a piece it stays with its holder).
- j97's `r97give` creates a new piece; kỳ ngộ does NOT: a Ngự tứ-class gift is either crafted by the Emperor/Thái hậu (b) or moved from a real holder (Nội vụ phủ weekly rare piece S.adRare, the "emp"/"th" boxes) (a).

## 7. The encounters (25) — WHO · WHAT (before → after) · where/when · band · options
Notation: place keys from j2/jplx/jact (vuon Ngự hoa viên, thu Cần Chính điện, dtd Dưỡng Hòa điện, tn Đức Thọ cung, kn Càn Ninh cung, r<id> a consort's palace, tyv Thái y viện, ksp Kính sự phòng, lc Lãnh cung, nvp Nội vụ phủ, home). Numbers are BAL.kyngo.E[id] keys; the sample titles are working names for the writer.

### A. Hidden masters (skills, lối)
| id | Title (working) | WHO | WHAT | Where / when | Band | Options (gain / loss) |
|---|---|---|---|---|---|---|
| ma_phe | Phế phi trong lãnh cung | Phế phi họ Lý (lcPeople), alive | knowledge only | lc, any buổi; bonus at night | L M S | (1) Học nghề điều hương: Y thuật & điều hương +big step / Danh − (seen visiting lãnh cung, odds word) · (2) Hỏi chuyện cũ: one real intel on a living rival (intelLearn) + her thiện cảm / same Danh risk |
| ma_giao | Sổ tay của giáo tập ma ma | Giáo tập ma ma (gt) at her post | her hand-copied sheet (jrcp "hand-copied sheet" road; consumable paper, ilDur) | nvp / tn, sáng | L M S | (1) Xin chép phổ: learn one lối she lacks / Sức −, khắc · (2) Xin ma ma chỉ dạy tận tay: gt thiện cảm + Thêu tiến bộ now (BAL g.art) / Bạc − (lễ thầy) |
| ma_nhac | Khúc đàn đêm vườn ngự | Nhạc sư (S.men role Nhạc sư) whose place is vuon | knowledge | vuon, tối | L M | (1) Ngồi lại nghe dạy: Cầm big step / risk "with a man in hậu cung" (jmen caught rule, odds word) · (2) Xin bệ hạ cho y vào điện dạy, có cung nhân hầu: Cầm smaller + Sủng small / Bạc − (lễ) |
| ma_hoa | Họa sư vẽ dung nhan | Họa sư (S.men) at vuon / tn | (b) a painting he makes of her, a WK painting work if that kind exists (build checks), else none | vuon / tn, sáng–chiều, spring bonus | L M H | (1) Ngồi cho y vẽ: the painting into her chest (item, made by him) / khắc + jmen risk (odds word) · (2) Học bút pháp: Họa big step / same risk |
| ma_ty | Thái y già trực đêm | Thái y Trương (S.court.ty) | knowledge (a prescription) | tyv, tối | L M H S | (1) Xin chữa dứt bệnh cũ: cures one lingering illness / scar step (jkh/ILL) / Bạc − · (2) Học phương thuốc: Y thuật step + his thiện cảm / Sức − |
| ma_co | Ván cờ với Tổng quản | Tổng quản Lý Liên Anh (S.court.tq) when the Emperor is busy | knowledge | thu / dtd, chiều | M H | (1) Đánh hết ván: Kỳ big step + tq thiện cảm (his help to see the Emperor) / khắc, Sức − · (2) Nhường y một nước: tq thiện cảm bigger / Kỳ small, Danh − (seen fawning on a eunuch) |
| ma_lao | Vị phi tần già bên hiên Phật | the oldest living consort (age band 51+) at tn | knowledge only | tn, sáng | M H | (1) Xin chỉ giáo: Kỳ step + she becomes an adviser (thiện cảm big both ways) / khắc, Sức · (2) Hầu chuyện chuyện cũ tiên triều: one real intel + Danh / her rival's oán small |

### B. Found objects (real pieces move)
| id | Title | WHO | WHAT (before → after) | Where / when | Band | Options |
|---|---|---|---|---|---|---|
| vat_lac | Ngọc rơi trên lối | the owner of an open jlost case (another person) — named in text; the finder is her | the lost piece (case holds it → found) | any outdoor place; garden bonus | L M H S | (1) Trả tận tay: piece → owner, case "found"; owner thiện cảm big + Danh / no Bạc · (2) Giữ lại: piece → her chest; value in Bạc / the case stays open: owner may recognise it when worn → loKeepHear (two-way) |
| vat_minh | Của mình tìm lại | her own maid / a servant present | HER open jlost case piece (case → her chest) | any place | all | «plain»: piece back + one case evidence step (who took it) |
| vat_cu | Di vật người đã khuất | Tiểu Ngân Tử (S.court.ped) / Nội vụ phủ eunuch | a dead person's piece in S.il.box "nvp" (box → her or → "th") | nvp, any | M H | (1) Xin chuộc lại: piece → her chest / Bạc − (BAL price share) · (2) Xin dâng Thái hậu thay người đã khuất: piece → "th" box; Thái hậu thiện cảm + Đức / no piece |
| vat_thu | Con vật lạc chủ | the pet's owner (a consort) — the pet is a real `p.pets` entry wandering | the pet stays the owner's | vuon, sáng–chiều | L M S | «plain»: return it: owner thiện cảm big + Danh small |
| vat_chung | Lá thư trong chậu hoa | none present but the writer is real: a living rival X with a REAL pending deed (j70 p.pend / a real plant / a real jlost riv case) | (c) one evidence step on X (evA) — the letter is a consumable story piece (ilDur) | lc / vuon / r<id>, tối | M H | (1) Giữ làm chứng cứ: evA(S,X,+step) / X oán + if she learns it (odds word) · (2) Lặng lẽ trả cho X: X thiện cảm big + X owes one favour (existing "nợ ân" if present, else thiện cảm only) / no evidence |
| vat_ngu | Món quý Nội vụ phủ dâng thử | Tiểu Ngân Tử (ped) | the week's rare piece S.adRare (Nội vụ phủ stock → her) | nvp, sáng | L M | (1) Nhận về dùng: the piece at BAL.kyngo cost share / Bạc − · (2) Tiến lên Thái hậu: piece → "th" box, Thái hậu thiện cảm + / Bạc − (same) |

### C. Imperial favour
| id | Title | WHO | WHAT | Where / when | Band | Options |
|---|---|---|---|---|---|---|
| de_mua | Chung ô dưới mưa | Hoàng thượng (S.where.emp = this place) | none | vuon / outdoor, wxSev ≥ 1 | L M H | (1) Theo ngài về điện tránh mưa: Sủng big / a present consort's oán +, Sức − (weather) · (2) Xin ngài giữ long thể, cung tiễn: Danh + Thái hậu thiện cảm + Sủng small / no Sủng jump |
| de_but | Nét ngự bút | Hoàng thượng at thu | (b) a scroll he writes for her → IT `bienngu` class Ngự tứ (non-sellable), entry `from:"kyngo"`, giver Hoàng thượng | thu, tối | M H | (1) Xin một chữ: the scroll (Ngự tứ) / khắc, Sủng small · (2) Mài mực hầu bút: Sủng big + this week's thị tẩm weight + / no scroll |
| de_den | Điều ước đêm hoa đăng | Hoàng thượng at the festival place | none | FEST nguyentieu / trungthu / thattich night | L M H | (1) Xin cho gia đình: Danh big / no Sủng · (2) Xin ngài một đêm: Sủng big / a rival's oán + |
| de_su | Câu hỏi của sứ thần | Sứ thần (S.men) at thu | none | thu, world window "su" open (bonus; else rare) | M H | (1) Đáp khiêm cung: Danh + Thái hậu thiện cảm / no art step · (2) Đối thơ: Thi step + Danh bigger / roll (Thi-based odds word): fail = Danh − |

### D. Thái hậu / palace women
| id | Title | WHO | WHAT | Where / when | Band | Options |
|---|---|---|---|---|---|---|
| th_kinh | Sớm mai ở Phật đường | Thái hậu alone at tn (no consort present) | none | tn, sáng; bonus when world window "sao"/"tang" | L M H S | (1) Ở lại chép kinh cùng người: Thái hậu thiện cảm big / Sức − · (2) Xin người dạy lễ nghi: Đức / Lễ step + tn cô cô thiện cảm / Thái hậu thiện cảm small |
| th_tham | Bánh trung thu có thư | her own trusted maid brings it; the writer is a real person who knows a REAL pending plot against her (j70 p.pend target S) | (c) the warning (intel + the plot's odds down by BAL step) | FEST trungthu, home | L M H | «plain»: the warning + the writer's thiện cảm known (fires only if a real plot exists — law 6a) |
| th_chi | Chỉ ngũ sắc Đoan ngọ | an elderly ma ma (any staff role mama, a51) present | (b) a five-colour thread she plaits (consumable; new IT key `chingusac` if none exists — build checks) | FEST doanngo | L M S | «plain»: protection from the next illness roll this month (BAL) + her thiện cảm |
| th_sao | Đêm Thất tịch ngắm sao | a consort of her band also at vuon | none | FEST thattich, tối | L M | (1) Kết làm tri kỷ: both thiện cảm big (two-way) / the other's rival oán + · (2) Đối thơ dưới sao: Thi step + Danh / thiện cảm small |

### E. Servants / allies
| id | Title | WHO | WHAT | Where / when | Band | Options |
|---|---|---|---|---|---|---|
| sv_den | Đèn rơi cứu người | a maid of another consort X, present | none (her burn salve: her own consumable if she holds one, else none) | any place, tối | L M H S | (1) Giữ nàng làm tai mắt: s.spyFor="me" (kitPersonReveal) / if X finds out (existing spy rules), X oán big · (2) Đưa nàng về tận cung X: X thiện cảm + Danh / no informant |
| sv_tuyet | Đêm tuyết, người gác đêm | a eunuch servant (any household) present at night | his lantern stays his | any outdoor, tối, winter wx snow/frost | L M H S | «plain»: Sức restored (BAL) + his thiện cảm; he becomes a loyal watcher for her (one witness bonus, existing witness rule) |
| sv_co | Chưởng sự cô cô để mắt (cung nữ road only) | Chưởng sự cô cô (tn) | knowledge | tn / nvp, sáng | S | (1) Xin theo học quy củ: srvRk step (r97srvRk shape) / Sức −, khắc · (2) Xin về hầu Đức Thọ cung: Thái hậu household access + TH thiện cảm / her current mistress's thiện cảm − |
| sv_tre | Hoàng tử lạc đường | a child of a consort (kidsOf(v), age ≤ 12) at vuon without his mother | none | vuon, spring/summer | L M | «plain»: bring him home: the mother's thiện cảm big + the child's warmth (existing kid af) |

Count: 25 (A 7 · B 6 · C 4 · D 4 · E 4); sv_co is cung-nữ-road only, so each road sees 24 or fewer. Bạc-big: vat_lac (keep), vat_cu; Danh-big: de_den, de_su, vat_lac; Ngự tứ-class: de_but, vat_ngu, vat_cu; rare skill/lối: A group; hidden ally: sv_den, ma_lao, ma_giao.

## 8. NPC parity (law 1)
- The SAME gate, roll, pity, cooldown and table run for every consort (and maids for S-marked ones) on their own planned buổi place (jagday S.where), host only, once per buổi, inside the existing agTick budget. WHO = someone else present at that place; WHAT = the same ledger pools (an NPC can find HER lost piece, buy back a dead woman's effects, be given the Emperor's scroll).
- Option = `mindPick` over the same options with the same values (needs × traits, jmind slip).
- Shared scarcity: one piece, one finder. If an NPC took it, it is gone for her and the ledger shows the new holder; if an NPC keeps HER lost piece, her case stays open and she can recognise it (loKeepHear) — two-way.
- Visible: `newsAdd` line («Nghe nói {x} …», by the existing seen rule); if it touches her (her piece, her maid as informant) → `kitNotice`. Week report (j87 Tuần lục) gets one line.
- Bot check: NPC hit rate per band within ± BAL.kyngo.parTol of hers.

## 9. Sổ luân hồi (like j97)
localStorage `ctm-kyngo` = {id: {n, first:{who, o, y}}}; one line "x/y kỳ ngộ đã gặp" under j97's line in the Sổ luân hồi block (same wrapper pattern as RARE97.book), and the life line gets "Kỳ ngộ: <titles>". Memory only: nothing carries to the next life.

## 10. Save, old saves, co-op
- State: `S.ky = {m: miss, cd: wk until, seen: {id: wk}, n}`, NPC `v.ky` the same; created lazily → old saves load untouched (test: old-save fixtures from dev/test).
- Co-op: NPC rolls host only (agOn). Each player's own S.ky is personal. Encounters that move an NPC-held or world piece (vat_lac other-owner, vat_cu, vat_ngu, vat_chung, sv_den) are host-side only in co-op v1 (same as item-ledger-solo, owner 17/11 02:05Z: no co-op patching); a guest still meets every encounter that moves nothing of the world (A group, C, th_kinh, th_sao, vat_minh, sv_tuyet). State-only sync, animations after state.

## 11. UI — kit parts only (law 9)
| Use | Kit part |
|---|---|
| The encounter card (person left, banner right, text, options) | `kitEventDp` (§50) via a PEND event (`pushFront`, flagged `ev`) |
| Cost-only options, odds word inside an option | §28.6 cost mode, §53 `kitOptOdds` / `kitHint`, §6.2b option card, §32.9 `kitOptLayout` |
| Event seal | §39.1 `kitSealEvPla` (type = place) |
| Result | §7 result card + §53 `kitResultSeal` |
| A piece moving (found / returned / given / kept) | §64 `kitItemTag` + `kitItemFx` |
| A lối / art step learnt | §86 `kitLearn` |
| The hidden ally / informant | §65 `kitPersonReveal` |
| NPC fortune news / a touch on her | §42.2 `kitNotice`, §32.11 news card |
| Picture missing | §59 `KIT_PH` placeholder banner |
| Sổ luân hồi line | j97's existing Sổ luân hồi block (same row style) |
KIT REQUESTS: none needed (no new part). If MAIN wants a distinct "Kỳ ngộ" mark on the card, that is a KIT REQUEST for a seal kind (not filed; not required by this design).

## 12. BAL (law 4) — new file dev/build/jbalky.js (after jbal2 in assemble.py), one block BAL.kyngo
`on, p0, step, pMax, pity, cd[3], band, V[3], hard[3], vw{...}, eqTol, zeroMax, parTol, pw{place: w}, fest{k: mult}, wx{sev: mult}, world{k: mult}, E{id: {w, band:[...], hard, gains per option}}`. Every number printed on a card reads these (no typed number).

## 13. FOR C (pictures; draw nothing here)
- 25 event banners, landscape, KIT §50 banner crop, evId `kyngo:<id>` (j89 evArtOf), one per encounter id above; people shown = the WHO kind (master, Emperor, Thái hậu, maid…), Magnific gpt-2-6, owner art rules.
- Item icons only if the build finds the IT key missing: `chingusac` (five-colour thread). The scroll uses the existing `bienngu` icon.

## 14. STEP 3 tests (after OK)
Unit (gate, pity, cooldown, once-per-life, conservation: every piece moved shows in S.il.log, ilAudit net stays 0), vp (VANPHONG scan of all new text), one-core-guard (no typed numbers), quickcheck, old-save load, perf smoke (NPC loop ms per buổi), eq script (law 2), bot measure ≥ 20 lives × ≥ 12 game months: eligibility e per band and style, mean/p10/p90 gap, zero-share, NPC vs her parity, then retune p0/step from e and re-measure (before/after table). Shots Fold 755x1000 + iPad 1180x820, looked at.

## 15. Questions for MAIN (only real ones)
1. OK to read "acts done at a place" as presence there (one roll per buổi max), or walks (goTo) only?
2. Target gap 3–5 tuần with zero-share ≤ 5 per hundred over 6 months — OK as the measure bar?

## 16. BUILD NOTES (step 3, after MAIN ROOT-67 OK 19/11 09:00Z) — what changed from the table above
- MAIN (a) law 6c: no crafted piece is made from nothing. The ledger holds no paper / paint / silk stock for the Họa sư, the Emperor or a ma ma, so NO crafted piece is created at all: ma_hoa option 1 = "Nhờ y nói tốt trước bệ hạ" (Sủng + his regard, Bạc lễ); de_but option 1 = "Xin ngài chỉ cho một nét chữ" (Thi step); th_chi = knowledge (Y step + her regard), no thread. The only pieces that appear are pieces that already exist and MOVE: a jlost case piece (vat_lac, vat_minh), a dead person's effects in S.il.box "nvp" (vat_cu → her chest, or → the "th" box), the Nội vụ phủ weekly rare piece adRare() (vat_ngu, bought at BAL.kyngo.nguPr of its price → her chest, or → the "th" box). Every move is logged in S.il.log ("kyngo: …").
- MAIN (b) law 1: she is a WHO for NPC encounters where she walked this buổi (S.kyAt): an NPC returns HER pet (vat_thu), finds HER lost piece (vat_lac: return → her chest; keep → her case held by that NPC with keep=1, so the existing recognition / loKeepHear road works for her), befriends her at Thất tịch (th_sao).
- MAIN (c): no new seal kind; the card is a plain PEND event (pid "kyngo", evId "kyngo:<id>").
- MAIN (d) law 3: every option of a choice has a gain and a real cost (khắc / Sức / Bạc lễ / a third person's grudge); dev/test/kyngo-eq.js FAILs an option with "no real cost".
- WHO comes from the j95 location record S.roster (placeOfId: R.P[id][j95kh()]), the same record the stage and countAt read; servants and children stand with their mistress.
- Hành sự acts count as presence (MAIN Q1) by act name → place (KY.actPlace); the cung nữ road's walks (srvGoTo) roll too.
- NPC finders = consorts (host only). Maids are not finders in v1 (they have no Danh / art / chest of their own in the same form); sv_co and ma_giao band S stay hers only.
- The intel special for an NPC finder = one evidence step (NPCs have no intel book); lối for an NPC finder = an art step (NPCs have no lối list).
- ROUND 2 (E18b, review E18r FAIL 8cb39e38): (1) bar 3–5 tuần for every band: ma_giao / th_chi open to M, sv_tuyet to M + H; band H: vat_ngu / ma_nhac / th_chi open to H and cd[H] 2 → 1 tuần (the 2-tuần wait kept H at 6.4; law 5 stays in hard[] / V[]) — BAL only. (2) the NPC pass runs at the END of her buổi (before nextBuoi advances), so she — and her servants / children — are the WHO of a consort's encounter where she walked (law 1). (3) co-op: the friend entry (v.coop) never rolls; one guard worldOn(). (4) option words: gains in kit class g, costs in class r; the option line names no piece («món đồ / di vật / món quý»; the piece is named in the card text + kitItemTag), because the kit reads a word's meaning before its class and «Son phần giáng» flipped a gain to TỐN (KIT REQUEST filed). (5) no card whose every option asks more Bạc than the finder holds (vat_ngu). (6) every number in BAL (loiK/loiArt, kidAge, relSung, relLoyal/relLoyK, BAL.ageBand[2] for 51+). (7) ma_giao option 2 «Xin ma ma chỉ dạy tận tay» = a real art lesson now (the old «bái sư» kyTeach was read by nothing). (8) Thái hậu is met where her j95 schedule puts her (placeOfId("th")), not always at tn.
