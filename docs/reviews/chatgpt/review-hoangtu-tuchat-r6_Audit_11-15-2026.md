# Single-item audit: review/hoangtu-tuchat-r6

Date: 2026-11-15 UTC. Role: DUYET B; chat 7c1b9e42.
Queued and inspected head: ca361b147a359169664dd0f5c6efec0f3d7a8eab.
Comparison baseline: 70c792d41. Live cross-check: main 17e8fc0382027e20ed7b80fa884ed38ef29e7817.
Claim: claims/20261115-1810-7c1b9e42-review-hoangtu-tuchat-r6__ca361b14.md.

## Result and boundaries

**BLOCKED: four blocking findings.** The birth/growth/display separation exists, and the sampled old save migrates and reloads without a second conversion. That does not establish that the education numbers and choices are correct.

This is an audit of this item's complete child-education/knowledge/succession family, including inherited defects in those paths; it is not a whole-game balance certification. All four findings below remain reproducible in the inspected live main. No game, design, art, build output, or deployment was changed. Proposed repairs are recommendations for the implementer, not approved new rules or replacement balance numbers.

Authority: current owner DUYET B instructions; main AGENTS.md and CLAUDE.md; live handover-branch OWNER_DECISIONS.md and WORKER_BRIEF.md; HANDOVER_1115_PM.md; main HANDOVER.md, KIT.md, VANPHONG.md, KIT_REQUESTS.md and the listed design/progress sources. The older weekly-only protocol and missing AGENTS §5 do not override the owner's current per-item instructions; the requested finding fields and verdict are used here.

## Blocking findings

### B1 — Education forecasts ignore the changed growth model

**Location:** dev/build/j53.js:86; consumers at :191 and :198; real model at :49, :53 and :88.
**What:** ktYear uses only the selected base teaching rate and current saturation. It does not include tcMul, health, passive development, mother's presence, or imperial attention. The new model now multiplies teaching by innate aptitude, but the advertised annual gain remains identical across aptitude values.
**Why:** the owner requires action effects to agree with actual rules and numbers (OWNER_DECISIONS 06:15Z/06:20Z and 05:40Z); KIT §37.6 explicitly describes the growth factors. This is materially misleading when choosing recurring paid tuition. The comment deliberately excludes hidden disposition; that does not explain omitting the entire new aptitude model.
**Machine measure:** held age 6, male, starting Văn/Võ/Đức 25, health 100, fond 50, Chuyên cần, living mother Tài/Đức 60, no Cầm bonus; ran the real ktGrow 12 times without external events. Each cell is shown Văn gain / actual gain.

| Aptitude | Common class | Teacher 1 | Teacher 2 | Teacher 3 |
|---|---:|---:|---:|---:|
| 5 | 1 / 1.907 | 3 / 2.831 | 5 / 4.050 | 7 / 5.555 |
| 50 | 1 / 3.741 | 3 / 5.531 | 5 / 7.869 | 7 / 10.718 |
| 95 | 1 / 5.543 | 3 / 8.159 | 5 / 11.543 | 7 / 15.613 |

These are controlled forward calculations, not a whole-life simulation; they do not prove Hoàng hậu or early-death rates.
**Proposed repair:** derive every tutor and martial-learning preview from the same growth model, while preserving hidden aptitude/disposition through honest known-information ranges or clearly specified estimates. Distinguish the teacher's marginal benefit from total growth. Cover all tutors, Văn/Đức, martial on/off, health bands, and caps.
**Weight: BLOCKING** — wrong action numbers in ordinary play.

### B2 — A real zero in maternal attributes becomes a nonzero default

**Location:** dev/build/j53.js:46; also review the same zero/default pattern at :57.
**What:** p.tai || 40, p.duc || 40, and p.tamco || 30 treat a valid zero as absent. A mother whose attributes fall from 1 to 0 can suddenly produce a child with higher innate aptitude.
**Why:** KIT §37.6 and the owner's 12:45Z decision make aptitude depend on the mother's actual attributes. Zero is valid within the game's normal attribute bounds; it must not acquire the missing-field defaults.
**Machine measure:** fixed Emperor gifts to {v:50,w:50,d:50}, no maternal arts, and identical zero luck offset by holding Math.random at .5. tcBorn returns **30** for maternal Tài/Đức/Tâm cơ all 1, but **42** for all 0. This follows the real function, not a replacement formula.
**Proposed repair:** distinguish absent fields from real zero in this complete birth/migration/default family; retain existing approved defaults only for missing data. Add paired zero/one and missing-field regression cases for every maternal input and zero fond during migration.
**Weight: BLOCKING** — changes the new inherited statistic using the wrong inputs.

### B3 — Exam previews invent uncertainty at impossible/certain endpoints

**Location:** dev/build/j53.js:129, :130, :136, :139; resolver at :149.
**What:** ktOdds clamps the displayed probability to 3–97, while the actual resolver uses edge + R(41) - 20 and may have exactly 0 or 100 percent excellent outcomes. Neither the clamp nor the rounded ktPEx is the resolver's actual sample count for fractional edges.
**Why:** the action's odds must describe its true resolution (one-source/act-audit ruling). The wording rules also say certain acts carry no uncertainty word. The audit percentage is developer evidence, not suggested player-facing text.
**Machine measure:** enumerated all **41** integer draws for every KTE member (tet, khao, tthu, san), with and without preparation. With age-appropriate minimum age and all study stats 0, preview = 3 but excellent = 0/41. With study stats 80 at minimum age, preview = 97 but excellent = 41/41. Both endpoint defects occur across all four exam types and both preparation states.
**Proposed repair:** share the exact outcome model between preview, explanations, NPC decisions and resolution; explicitly represent impossible/certain outcomes without the artificial clamp. Test fractional edges as well as all thresholds.
**Weight: BLOCKING** — displayed outcome likelihood contradicts the implemented roll.

### B4 — Asking for the imperial tutor rolls against post-cost favour

**Location:** dev/build/j53.js:194 and :206–207.
**What:** the card computes KT.favO + S.sung/2 before spending favour. ktAct first subtracts 4 Sủng, then recomputes the same expression for the actual roll. This inherited defect remains in the education menu touched by the item.
**Why:** the card and resolver must use the same actual chance and the same timing of costs; the owner requires every touched family member to be checked, not only newly added lines.
**Machine measure:** a living seven-year-old, Sủng **42**, two free khắc, outside cold palace. Card calculation = **56**, word **Khá chắc**. Calling the real ktAct("fav", child.name) leaves Sủng **38** and its resolver calculation = **54**, word **Năm ăn năm thua**. This crosses a visible ladder boundary.
**Proposed repair:** compute and reuse one chance at the chosen pre/post-cost timing for the card, Vì sao and resolver; apply the same timing to the NPC counterpart. Do not select new odds in this report.
**Weight: BLOCKING** — visible odds word and real roll differ.

## Further findings

### W1 — Preparation can be strictly dominated; numerical tests are missing

**Location:** dev/build/j53.js:139–150; dev/test/hoangtu-tuchat/test.js:1.
**What/why:** the existing 22 checks cover presentation and migration, but do not assert any of B1–B4, exact exam outcome probabilities, or dominated choices. With a single eligible child aged 18 at study stats 100, all four exams yield excellent in 41/41 draws with or without preparation, and that child also necessarily takes the top reward. Preparation adds 15 Bạc cost with no reward improvement. Multiple contestants may change the top-place benefit, so this is a contextual dominance finding, not a claim that preparation is always useless.
**Proposed repair:** include contestant-aware dominance checks and handle the no-benefit paid option within the existing design; add numerical regressions for the four blockers and old-save round trips. Test all four tutor fees, free/imperial tutors, maternal teaching and martial on/off.
**Weight: worth doing.**

### W2 — Legacy talent terminology still needs the family sweep already identified by the reviewer

**Location:** dev/build/j67.js:1643; j68f.js:59; j68g.js:54–56; j72.js:551.
**What/why:** legacy tal operations/text coexist with the new Văn/Võ/Đức/Hiền tài model. The original review already acknowledges wording debt; it is not reported here as a newly discovered closed bug. ktSync distributes the tal delta to all three dimensions, so a phrase suggesting only literary tuition can also improve Võ.
**Proposed repair:** document and verify the intended mapping at every legacy writer and reader; update wording through the existing kit, without changing the design in the audit.
**Weight: minor** for wording; the zero-fallback aspect belongs to B2's family review.

## Family scans and law applicability

Commands used against the pinned item head (the same relevant numeric functions were cross-checked on pinned main):

```sh
git diff 70c792d41 ca361b147 -- dev/build/j53.js dev/build/j61.js dev/build/jht.js dev/kit/KIT.md
git grep -n -E 'ktYear\(|ktRates\(|ktGrow\(|ktTeach\(|ktBorn\(|tcBorn\(|kvW\(|kidFace\(|kidMeet\(|k61IsKid\(' ca361b147 -- 'dev/build/j*.js'
git grep -n -E 'Hiền tài|Tài năng của con|k\.tal|\.tv|\.tw|\.td' ca361b147 -- 'dev/build/j*.js'
git grep -n -E 'tcv|tcO|tcR|hn|function ser|function deser' ca361b147 -- 'dev/build/j*.js'
```

The first call-family scan found members in **j15, j17, j21, j51, j53, j54, j60, j61, j67, j68, j71, j72 and jht**. Calls were traced through the shipped index.html so later wrappers, including j90's exam presentation, were loaded. Full-file design/progress indexing covered the CLAUDE rule-source path patterns and printed relevant child/old-save/choice passages with file hashes; it was not used to claim unrelated systems were numerically validated.

| Binding family | Members checked / outcome |
|---|---|
| Birth attributes and fixed hidden aptitude | tcBorn/ktBorn; 1,000 sampled births per inspected build: every birth study stat 0–2. Zero-input bug B2. |
| Monthly growth and education actions | tcGrowCore/ktGrow/ktRates/ktTeachG/ktTeach/ktBtns/ktAct; every tutor tier and martial preview consumer scanned. B1/B4. |
| All four examinations | KTE tet/khao/tthu/san; base/prepared/skip, full 41-draw supports; B3/W1. |
| Succession under 6 / skill from 6 | kvW/kvOrder/ktHeirInstall, jht kvReasons/kvCard; inspected age guards and inherited weighted ordering. No new rule written. |
| Public facts / strangers | j61 k61Pub/k61IsKid and kidFace path; jht own birth/visit/festival/exam/adoption/co-residence/load hooks and kid/kvo/kin/hon/qt views. Art-based identity cannot be certified with blocked image requests. |
| Saves | Actual pre-item baseline save with child ages 1/3/7 and rival children 2/9/12; every sampled child migrated to tcv=1; own known=3, others=0; second serialize/deserialize kept tc/tv/tw/td unchanged. |
| Shared kit / wording / supported sizes | Five supported sizes opened and five child views requested at each; no page errors or document horizontal overflow in these asset-isolated probes. This is not a screenshot/layout PASS. W2 remains. |
| Numbers in BAL and design | BAL.tc embedded in j53, KT/KTE/KTG, shared odds ladder, and jbal/jbal2 wrappers were traced in the shipped build. No replacement constants proposed. Whole-game target rates were not measured. |
| Images, CDN, art model | Item has no new generated art; no images drawn/uploaded. Child silhouettes require a separate successful asset/render check. |
| Unrelated economy, items, romance, minigames, audio, roster and rare-ending laws | Rule sources indexed for interactions; no changes by this item and no blanket certification. A whole-game seam audit belongs to share A. |

## Method and limitations

The shipped Git objects were served into Playwright by an in-memory route; no build command or code-file write was used. Playwright's default browser executable was absent; the installed /usr/bin/chromium was used instead. No browser installation was attempted. Image/audio requests were blocked and JSON asset manifests replaced by empty responses to isolate logic; therefore image identity, actual painted layout and all-image loading are expressly unverified. No external live player save was read or changed.

The shallow fetch used --depth=30 and flock. /home/user/wt/fetch.lock was unavailable because /home/user could not be created; /tmp/cung-tuong-mong-fetch.lock was used for this environment. No full clone or history rewrite.

## Historical check with named sources

The Palace Museum's [“皇子们的生活” (Life of the Princes)](https://young.dpm.org.cn/article/1077?source=pc) supports schooling from six, learned teachers, literary study and riding/archery, with imperial supervision. This supports the education setting, not the game's numerical aptitude coefficients.

Academia Sinica's [“Last Testament of the Yongzheng Emperor,” item 038236-001](https://museum.sinica.edu.tw/en/collection/17/item/448/) documents secret heir designation under Yongzheng and later Qing rulers. The game's public crown-prince and legitimacy/seniority ordering must be understood as its fictional court rule; it is not a universal Qing succession law. No history-based blocker or unapproved succession redesign is asserted.

## Summary for the owner

Sếp: mục này có 4 lỗi chặn về công thức và số hiển thị; em đã ghi cách tái hiện và hướng sửa. Sổ cũ thử nghiệm nạp được, nhưng chưa đủ cơ sở duyệt cân bằng hoặc hình ảnh. Phần kiểm toán mục này đã hoàn tất; tỷ lệ chơi được của toàn game chưa đo.

CHATGPT AUDIT BLOCKED: review/hoangtu-tuchat-r6 ca361b147a359169664dd0f5c6efec0f3d7a8eab (4 blocking)
