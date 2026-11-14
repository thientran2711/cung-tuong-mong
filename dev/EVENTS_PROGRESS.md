# Common events (j68) — progress and shared helpers

Branch: `review/events`. Modules: `dev/build/j68.js` (engine + shared helpers), `dev/build/j68e.js` (event content), appended last in `assemble.py`.
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

## Status
- [x] engine, cadence hook, anti-repetition, shared helpers (first commit)
- [ ] content pool (target ≥300 template-variants)
- [ ] measurement, screenshots
