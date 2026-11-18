# names-unique — ONE NAME CORE (report)
Worker session_01UV1Szgg373UqQQZzKsCM7H · coordinator s23 · branch `review/names-unique` · 11/16/2026.
Owner rule: last line of dev/OWNER_DECISIONS.md (16/11 ~20:20Z). History research + exclusion reasons: `dev/handover/reports/names-expert.md`.

## What was built
- `dev/build/jname.js` (assembled right after j0): the ONLY name data in the game — `NM_SUR` 82 surnames, `NM_F` 139 noble ladies,
  `NM_M` 104 men, `NM_MAID` 114 maids, `NM_EUNX` 60 (Tiểu X Tử), `NM_EUNG` 29 senior eunuchs, `NM_DOC` 15 physicians, `NM_PGEN`+`NM_PX`
  princes (generation character), `NM_PRINCESS` 38; exclusions `NM_BAN_SUR` (19), `NM_BAN_G1`, `NM_BAN_GIVEN`.
  Generator `nmNew(kind,opts)` (kinds f, m, maid, eun, eunE, doc, prince, princess, mo): a name no one in the save has EVER had
  (registry `S.nmReg`, living + dead + every name held now), no shared short form with the LIVING (given name / surname + last word,
  the forms the stranger mask uses), no excluded surname/given, no word twice. Never a number; when a pool runs dry it widens (surname
  added to a maid / eunuch, next generation char for princes).
- Old pool names are aliases of the core (SURN, GIVEN, MALEN, MAIDS, EUN, PRINCE, PRINCESS, QNG, CTG); KCMN, KCFN, J59SUR/EUN/DOC/FAL,
  HEIRN, jaudit's xm/xe, MALEN2 and kcFreeName/j59taken are gone. `git grep` of review branches: no other branch had a name core.
- `dev/build/jnamefix.js` (assembled LAST): `nmFix()` sweep — renames NPC duplicates (living or dead; the first holder keeps it) and
  excluded names, never the player (an NPC who has her name is renamed); her own family keeps her surname; when the old name had one
  holder, every string AND name-keyed entry of the save (logs, notes, news, relations, roads, S.rcpK…) is rewritten, protecting other
  people's longer names. Runs after deser (one-time migration of old saves, then a no-op), after start(), and every month end (safety net:
  0 renames in 330 simulated years = every creation site goes through the core). Elders: `call` follows the new surname ("Tô ma ma").
- Co-op: `nmOwner()` = `worldOn()` when present (review/coop-one-world, head 008ed0b9a: true = solo or host, false = guest), else
  COOPW seat "a". A guest never writes the registry and never sweeps. Her NEW world people (consorts from her maid, tuyển thêm, kin) are
  made by the host through jcoopask (host settle → freshName = core) and sync down; the host's sweep after each rebuild catches any
  clash. Her OWN kids/maid/servants (her personal blob) are named on her client by nmNew against the synced world (W.R + her P):
  a clash with a host name made the same week is possible but rare (coop worker's assessment); zero-clash would need the registry
  as a W key — left as an option, not built.

## Audit: every place a name is made (before → after)
| # | Where | Who | Before | After |
|---|---|---|---|---|
| 1 | j1 freshName | consorts, the player at start, a maid raised (j8 sendMaid), co-op host settle (jcoopask) | SURN×GIVEN, tries 200, then "… 57" | nmNew("f") |
| 2 | j1 mkKid | princes, princesses | 12 names each, then "Vĩnh Diễm 6" | nmNew("prince"/"princess"), generation char |
| 3 | j10 mkServ | maids, eunuchs of every palace | MAIDS/EUN, then "Thúy 2" | nmNew("maid"/"eun") |
| 4 | j10 court init | Tổng quản | fixed "Lý Liên Anh" (Lý excluded) | nmNew("eunE") |
| 5 | j2, j42, j8 (5 sites), jmort, jcmaid (2) | her maid, NPC consorts' maids, replacements, pick candidates | pick(MAIDS), no uniqueness | nmNew("maid") |
| 6 | j22 menInit + older lives | thị vệ, thái y, vương gia, nhạc sư, sứ thần, họa sư | own surname list incl. Bùi; given by index | nmNew("m") one by one |
| 7 | jmen | 3 extra guards | own list incl. Phan | nmNew("m") |
| 8 | jhc menUnique | renames men's clashes | first free name → always "Tử Khiêm" | nmNew, keeps last-word rule |
| 9 | j4 | storyline guard, Hàn lâm | pick(SURN)+pick(MALEN) | nmNew("m") |
| 10 | j67 casts (4) | event people (thị vệ, Hàn lâm, a man, "Tiểu X Tử") | pick | nmNew |
| 11 | j54 h54NewSon | sons of the great houses | SURN×MALEN, then "… 42" | nmNew("m") |
| 12 | j55 trS | court heads (her father keeps her surname) | SURN/MALEN shuffles | nmNew("m") |
| 13 | j59 court names | Tổng quản, Kính sự phòng, Nội vụ phủ, Thái y, lãnh cung | J59SUR incl. Đặng, Mạc; lãnh cung always Lý | nmNew("eunE"/"doc"/"f", Tần for lãnh cung) |
| 14 | jmort court successor | a new officer after a death | "Thái y Trần/Đỗ" (HEIRN) + kept the dead one's personal name | full new name, pn updated |
| 15 | j96 mkMan96 | Thanh mai trúc mã | SURN×MALEN | nmNew("m") |
| 16 | jht nPick/nFix | quý nữ, sons, spouses | QNG/CTG + own clash rule | nmNew |
| 17 | jkc kcInit | father, brother, sister (her surname), mothers "X thị", two friends | KCMN/KCFN (Đức Minh, Thu Thủy…), pick(SURN) thị | nmNew (mo: no two "X thị" alike) |
| 18 | jaudit aaNamesFix + mkServ wrap | numbered servants of old saves | extra pools xm/xe (Thu Thủy, Bích Hà…) | nmNew |
| 19 | j95c dedupe | roster duplicates | first free from pool | nmNew |
| 20 | jstaff mk/succeed | ma ma / cô cô (BAL.staff) | 3 names per post, cycling → repeats | BAL first holders, then nmNew + "<surname> ma ma" |
Fixed story names checked against the core: "Phế phi họ Lý" → "Phế phi họ Tần" (jly, j2, jreign), "thị vệ họ Lý" → "họ Hách" (j71),
BAL "Lạc Ngọc Dung" → "Lạc Uyển Hề", kit sample names (jkitpage/j79/jk2b) Lý/Mạc/Trịnh/Bùi removed. "Thái y Trương" stays (Trương kept).

### Old pools: Vietnamese-style entries (origin/main, static scan with nmBad)
| file | pool | size | VN-style | examples |
|---|---|---|---|---|
| j1 | SURN | 30 | 2 | Trịnh, Lý |
| j1 | GIVEN | 40 | 10 | Lan Chi, Cẩm Tú, Diễm Thu, Tố Tâm, Hải Đường, Phương Hoa, Họa Mi, Thủy Tiên |
| j1 | MALEN | 10 | 1 | Văn Uyên (also 2 names carrying a surname: Lục Trường, Tiêu Viễn) |
| j1 | MAIDS | 10 | 5 | Bích Ngọc, Xuân Hạnh, Thu Cúc, Hồng Liên, Ngọc Lan |
| j1 | PRINCESS | 12 | 1 | Ngọc Dung |
| j22 / jmen | men surnames | 7 / 6 | 1 / 1 | Bùi / Phan |
| j59 | J59SUR / J59DOC / J59FAL | 18 / 8 / 6 | 2 / 1 / 1 | Đặng, Mạc / Văn Chiêu / Tố Tâm |
| jaudit | xm (maids) | 40 | 5 | Hải Đường, Thanh Hà, Thu Thủy, Cẩm Tú, Bích Hà |
| jht | CTG | 22 | 5 | Kỳ Dương, Văn Cảnh, Tuấn Dật, Minh Triết, Gia Huy |
| jkc | KCMN / KCFN | 12 / 12 | 4 / 3 | Đức Minh, Hữu Chính, Hoài An / Bích Hà, Thu Thủy, Minh Châu |
| jmort | HEIRN | 8 | 2 | Trần, Đỗ |

## Before / after (dev/test/names-audit.js: 4 lives × 20 years, same sim on both builds, every person the save held)
| | origin/main 95282e69 | review/names-unique |
|---|---|---|
| people seen | 1842 | 1972 |
| distinct full names | 743 | 1972 |
| full names held by 2+ people | 207 names (1306 people; "Song Hỷ" ×13, "Quỳnh Chi" ×12, "Diệp Thanh Hòa" ×7, numbered "Vĩnh Diễm 6") | 0 |
| living people sharing a short form | 31 | 0 |
| people with a VN-style name | 317 | 0 |

## Tests (all PASS)
- `node dev/test/names-unique.js 55 6` — 6 lives × 55 years = 330 simulated years, a new consort + a child each year, servants refilled,
  some deaths; checked every 6 months: 0 duplicate full names, 0 excluded names, 0 names missing from the registry; month sweep renamed
  0 people (no creation site bypasses the core); stress 2000 names per kind: 0 dup, 0 excluded; planted old-save case (Nguyễn/Trần
  consorts, an NPC with the player's name, maid "Bích Ngọc", twin "Tiểu Phúc Tử") → renamed, texts rewritten, player name kept.
  Final run on b250c5ea: 330.0 years, 6 lives (origins tt, dtq, muoi, cn, nc, bd), 248–290 people per save, registry 571–1329, failures 0.
- `node dev/test/names-oldsave.js <main build> <new build> 12 3` — saves played 12 years on origin/main loaded in the new build: player
  name kept, 0 dup, 0 excluded, 0 missing from registry, 0 stale old names in texts, a turn passes. 27–31 renames per save, 270–660 text
  references rewritten.
- dev/test/cmaid-unit.js ok:true; dev/test/name-mask-oldsave.js PASS; `bash dev/tools/quickcheck.sh` on b250c5ea: QUICKCHECK PASS (open 1038 ms, old save from live loads + plays a buổi, perf new/live render 277/294 ms, buổi 997/1069 ms).

## Notes / open
- Registry size: ~400–1200 names after 55 years (~25 KB raw in the save, compresses well).
- Guest-local names (her own household in co-op) are not registry-checked against the host's same-week names (rare clash; see above).
- No UI change; no kit part touched.

## READY
sha b250c5ea on review/names-unique (3 commits on origin/main 95282e69). Worktree handover: none needed, work complete.
