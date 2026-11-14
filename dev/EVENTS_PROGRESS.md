# Common events (j68) — progress and shared helpers

Branch: `review/events`. Modules (appended last in `assemble.py`, in this order): `j68.js` (engine, shared helpers, GLOBAL EVENT SCHEDULER), `j68e.js` `j68f.js` `j68g.js` (event content), `j68h.js` (grounding: preconditions on real state, true hearsay, fixes to stock j7/j24/j28 sources), `j68i.js` (promotion reasons with numbers, week-summary grouping).
Scope split (owner approved): j68 = common daily/situational events only. j70 = mưu hại chains, j71 = lập công + festival mini-events, j72 = Việc nhờ quests.

## Shared helpers (global functions, defined in j68.js; load your module AFTER j68.js)
| helper | what it does |
|---|---|
| `evPickActor({kind,f,w,rw})` | picks a real NPC. kind: `rv` consort, `sv` her servant, `maid` her head maid, `emp`, `th`, `doc` court physician, `eun` tổng quản, `ksp` Kính sự phòng eunuch, `kid` her child, `man` palace man (`rw`: "thái y", "nhạc sư", "họa sư", "thị vệ", "vương gia", "sứ thần"). `f` filter(obj), `w` weight(obj). Returns `{o,n,f,k,id}` (o live object, n name, f portrait face for `who`, k kind, id = value to save in params) or null. |
| `evActor(kind,id)` | rebuilds the same actor from saved params (null if gone/dead). |
| `evChoice(name,spec)` | builds a dilemma option whose line always goes through the kit (dilLine/kitParse): `c` immediate fx, `p` odds (ladder word shown, never %), `w`/`l` fx on success/failure, `r`/`lr` `[[actor,n]]` relation change on success/failure, `wt`/`lt`/`k` extra green/red/kèm tokens, `ok`/`no` callbacks returning a log line, `wl`/`ll` default log lines. Result card comes from the existing chooseM wrapper. |
| `evRelTok(actor,n)` / `evRelDo(actor,n)` | coloured relation token (explicit green/red span) and the real change (relAdd for consorts, loyal for servants, fond for kids, th/sung for Thái hậu/Emperor). |
| `evCooldown(key,weeks)` | true and marks `key` as used now if not used within `weeks` tuần this life; `evCooldownLeft(key,weeks)` peeks. |
| `evHistSeen(key)` / `evHistMark(key)` | cross-life history in localStorage `ctm-e68h` (last 6 lives): how many of the previous 5 lives saw `key`; mark it for this life. Use keys like `j72:<quest>:<variant>`. |
| `evBusy()` / `evBusyMark()` | one big beat per tuần: `evBusy()` is true if someone already called `evBusyMark()` this tuần or `storyBusy()` (j67) says so. Call `evBusyMark()` when you push a big modal. `evBusyMonth()` = j68 fired a big beat this month. |

Event templates themselves: `EV6(id, fam, {a:[actor kinds], pp()->params with a0,a1.. ids, w(ctx)->weight, v:[variant texts with {A} {B} {C} {M} {S} {W} {P}], o(X)->[evChoice...], big, cd, t})`.
In-page testing: `e68Test(id)` pushes one template now; `e68Count()` gives template/variant counts; `window.__e68off=1` disables j68.

## Global event scheduler (j68.js, bottom)
Gates the ONE modal queue at `showModal`, so it covers every source, also modules loaded later.
- Optional events: j7 `ev()` events and the stock dilemmas (vase, coldletter, embezzle, tuyen, thbenh, loveletter), j24 visits (Có người đến, Kẻ hầu xin, Thái hậu triệu, Hoàng thượng đến, Một ánh mắt), j24 servant causes (Việc của kẻ hầu), j55 court pop-ups (tdPop), j54 princess moments (h54met/sad/tut/show), j42 servant-road events, all j68 events, black market, reward notices, and anything tagged `{opt:1}`.
- Mandatory (never held): endings, news digest, nights, pregnancy/birth, Thánh chỉ, festivals, story beats, tests (kt53), seat contests, anything the player opened, anything tagged `{must:1}`.
- Rules (`E68S`): at most 1 optional per buổi, at most 2 per day (tuần); never at day start when other news is up (moved to chiều/tối); held list of 4, stale after 6 tuần (info-only items then go to the Nhật ký); same template not within 5 tuần; same actor + same text not within 10 tuần (servant mishaps about once a season per servant); the same actor not in two optional events in a row; cross-life marks.
- Other modules: tag your modal `{opt:1}` or `{must:1}` if the default guess is wrong; nothing else needed.

## Grounding (owner rule): how events are tied to the world
- Every template has a precondition on real state and binds real actors (consorts by trait/relation/danger band, her servants by hidden trait/loyalty/spy status, her children by health/talent, the court house behind a consort, the Emperor's mood, season/weather).
- Servant mishaps only happen to a servant whose trait explains them (nhát gan breaks things, tham steals or gambles, nhiều chuyện quarrels, low loyalty is careless; trung/lanh servants do heroic things); thefts have a real culprit (tham, or a spy for someone) that the clues lead to.
- Hearsay names its source (a consort with a motive: dislike, jealousy) and is marked "(Lời đồn)"; it is either true or that source's lie; checking it always reports the truth from state (pregnancy, evidence held, favour level, Thái hậu's opinion, spy status).
- Gossip carries a real fact (fact6: pregnancy, confinement, favour, Thái hậu's view, children, jealousy, wealth). Stock j28 'rỉ tai' and j24 'kể chuyện trong cung' now say what was said; j7 ghost/guard rumours blame only a consort who really bears her ill will (or nobody).
- Consequences write back to state: relations (relAdd), servant loyalty/causes, child health/talent/fondness, evidence (evA), guard (guardWarn), Kho lúa/Biên cương (j55), Ân tình.
- Promotions (j68i): every decree (her and NPCs) appends "Lý do:" with the conditions that held and their numbers, the Emperor's pick among N qualified, the Tranh ghế win, or a son's birth. Week summary: each sentence under one heading only, reasons kept with their decree, split so no line is cut.

## Audit of the existing event sources (origin/main d3c1c1b; rates from the sensible bot, 95 lives, about 8 years each)
| source | how many | cadence | repeats |
|---|---|---|---|
| j7 `ev()` events | 32 (framing, rumours, alliances, Emperor, flood, festivals...) | only through makeDil: 22% a tuần and only when nothing else was queued, so in practice about 1 a year in total | 12-month cooldown each; mostly unseen |
| j3 makeDil fixed dilemmas | 6 (vase, coldletter, embezzle, tuyen, thbenh, loveletter) | same draw as above | no cooldown |
| j24 approaches ("people come to her") | ~10 kinds | 1 to 3 every tuần: Có người đến 22/yr, Kẻ hầu xin 13/yr (always the sick-mother text), Thái hậu triệu 10/yr, Hoàng thượng đến 5/yr, Một ánh mắt 4/yr | no cooldown; same text again within days |
| j24 servant causes (Việc của kẻ hầu) | 2 per trait | 12% per servant per tuần: 10/yr | one servant's trait gives the same mishap ("làm vỡ chén ngọc") again and again |
| info notices | Tin trong cung 42/yr, Thánh thượng ban thưởng 12/yr, Tai mắt báo tin 3/yr | weekly | — |
| j31 festivals + j7 festival events | 7 + 5 | once a year each | — |
| moodMonth (j3, replaced by j55 Quốc sự) | 8 (j55: 7 weighted) | monthly line in the news | — |
| j5 art mini-games | 15 couplets, 12 medicine questions, painting, dance | per lesson | couplets repeat soon |
| j53 children tests / j54 princess / j55 court | tests every 2 months; 7 princess events monthly; 3 court pop-up kinds | monthly | — |
| total | — | about 5.0 modals per tuần (day), about 2.1 of them optional; often 3 or more at day start | the same visit or mishap within 5 days was common |

## Measurement (sensible bot, inpage5 + counters; base = origin/main, new = this branch)
| | base (107 lives) | new (83 lives) |
|---|---|---|
| Hoàng hậu reached | 32% | 30% |
| early death | 53% | 36% |
| died in first 2 tuần | 0 | 0 |
| childbirth deaths per birth | 13.1% | 5.2% |
| modals per day (tuần), all kinds | 5.07 | 3.53 |
| optional event modals per day | 2.46 (45% of days had 3 or more; up to 7 in one buổi; 91% shown at day start) | 1.02 (never more than 2 a day, never 2 in one buổi; 29% at day start, and then alone) |
| same event again within 5 days (per 100 days) | 106 | 0.1 |
| j68 events per year | 0 | 9 |
Note: fewer stacked optional events means fewer small Sức costs, which the childbirth formula feels (Sức under 40 adds risk). Childbirth is now under the 8–12% target band; the main session may retune (jbal) if wanted.

## Status
- [x] engine, cadence hook, anti-repetition, shared helpers
- [x] content: 72 templates, 316 text variants (x real actors x context)
- [x] global scheduler, grounding, promotion reasons, summary grouping
- [ ] left for follow-up: more templates for rank-specific life (Hoàng hậu duties), lãnh cung life, servant-road (j42) j68 variants; per-life day histogram in measurement
