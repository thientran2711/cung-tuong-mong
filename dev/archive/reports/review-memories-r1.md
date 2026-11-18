PASS 99c06957882f5a74b9cd5e2ba59d7c55439a9927

# review/memories-r1 — independent review of review/memories @ bfe85a88 (D26 Kỷ niệm + hook ledger, dev/build/jmem.js)

Reviewer (Foreman C). Branch `review/memories-r1` = latest origin/main (bad941b4) + review/memories (bfe85a88) + reviewer fixes. Its parent chain contains current origin/main, so the coordinator can fast-forward main to it.

## Merge
- Conflicts: `dev/build/assemble.py` (module list: main had added jcloud/jreign/jlogsync/jact/jkc) → kept main's list, `jmem.js` appended as the LAST module (after jkc.js);
  `dev/build/jbal2.js` (main added `BAL.rg` jreign block at the same spot) → kept both, `BAL.mem/BAL.hook` after `BAL.rg`.
- `index.html`, `sw.js`, `assets.json` regenerated with `bash dev/site/build_site.sh` (not hand-merged). `node --check` passes on all.js and sw.js.

## Checked
- Rules read: CLAUDE.md, REVIEWER.txt, PREAMBLE.txt, START_CORE/WORKER/REVIEWER, topic people-life, systems-other, wording, kit-ui, balance-economy (skimmed for the gain-and-loss + one-core lines).
  OD grep for memor / kỷ niệm / hook / ledger: no owner ruling on this feature itself (only the location ledger OD:L34 = places, not people; the co-op one-world rule OD:L96).
- LUẬT ƯU TIÊN SỐ 1: worker's PROGRESS lists its git grep (no prior memAdd/S.mem/S.hooks); I re-grepped main build: no other `S.mem` / `S.hooks` users → no name clash.
- Reuse, not copy: hook ledger MIRRORS v.ev / v.evm.me / j72 q.d / j72 q.a (resolve acts on the owning system); only kinds with no home live in S.hooks. Good.
- KIT (HARD RULE + KIT CONSISTENCY): the two new person-card blocks use only `.kpsec` + `h4.kpst` + `kitRows` + `.kpnote` — the same parts as every other jpcf block
  (Lòng người với ta / Sở trọng / Đã biết / Dạo này). No CSS, no inline style, no new class. Consistency scan: all six jpcf blocks render with the same heading and row
  look at every viewport (screens below). jpcf change = a generic `PCF_X` extension hook, no visual change. → no KIT REQUEST.
- VANPHONG: no "%", no "Chắc chắn"; odds shown with the ladder (`od()` / `chanceW()` → "khả năng …"); stat deltas in the existing house form ("Nàng quý ngươi -10", "oán ngươi +15").
  VP repaint (ngươi→ta, nàng→nàng ta) works on the card rows; quotes keep ngươi/ta as dialogue. Cổ trang register in all 36 deed phrases.
- Co-op: `mem` / `hooks` are not in W_KEYS → personal state, sent as the player's own S. No change to shared world keys. coop-e2e not run (no world state touched; it runs against the live Worker).
- Old saves: lazy init (`memS()` / `hkS()`); worker test deletes the fields mid-life; my extra test loads a save written by the origin/main build (see Tests).

## Fixes made by the reviewer (commit on review/memories-r1)
1. ONE CORE (OD:L1267) — numbers typed in jmem.js moved into BAL (jbal2.js), text now prints the constant:
   | was in jmem.js | now |
   |---|---|
   | 36 deed base weights inside MEM_DEEDS | `BAL.mem.w` (MEM_DEEDS keeps sign / keep flag / phrase) |
   | fallback copies of BAL.mem / BAL.hook (two places holding the same numbers) | removed; `off()` when BAL.mem/hook missing |
   | quote tail / fade words 40 / 15 / 30 | `BAL.mem.strong`, `faint`, `hate` |
   | unseen scheme remembered at thiện cảm −8 | `BAL.mem.seenAf` |
   | tainted gift at thiện cảm −10 | `BAL.mem.taintAf` |
   | generic event memory cap 40 | `BAL.mem.relCap` |
   | invoke fallback thiện cảm +6 | `BAL.mem.invokeAff` |
   | +5 strike/lose chance per use (rule + shown odds) | `BAL.hook.useStep` |
   | failed press: relAdd −10 and the typed "-10" in the result text | `BAL.hook.failRel` (text prints it) |
   | press odds Tâm cơ/4 | `BAL.hook.tcDiv` |
2. Balance (gain-and-loss / no free road): a repeated small-talk deed (Hỏi han sức khỏe, weight 6, reinforce .6, odds 100) climbed 6→10→14→18→22 in five
   talks, reaching invokeMin 20 → "Nhắc lại ân xưa" → one ân (≈ 50–60 bạc in the j72 trades, e.g. "Vay 60 bạc → nợ một ân"), then again every ~4 talks:
   an endless ân farm for khắc only. Fix: a repeated deed never grows past `BAL.mem.reinforceMax` (2) × its base weight → small talk caps at 12, gifts at 16;
   the invoke road now needs a real deed (kết giao, giúp việc khó, ân xá, giữ lời…). Big deeds unaffected (pardon 45 → 72 on repeat).

## Tests (merged build, served with UTF-8 charset)
- `node dev/test/memories.js <url> <out> <sizes>` — 31 logic checks + card blocks + overflow + page errors:
  755x1000@2, 1000x755@1, 1180x820@2, 1366x1024@2, 844x390@1, 390x844@1 → **ALL OK** after the fixes (also ALL OK before them at 755x1000@1, 1180x820@1 and the five others).
  hscroll false at every size, errs [] at every size.
- Reviewer extra (`old save + farm cap + month tick`): save written by the origin/main build (bad941b, no mem/hooks fields) deser() into the merged build → loads, S.mem empty; 12× "care" on one consort → weight 12 = cap (6×2), "Nhắc lại ân xưa" NOT offered; after a pardon → offered; oanMonth fade 45→43; both card blocks render; ser/deser round trip keeps memories; 0 page errors.
- Screens looked at (card with Kỷ niệm + Ân oán chưa dứt): 755x1000, 1180x820, 1366x1024, 1000x755, 844x390, 390x844 (rotate prompt "Xoay ngang điện thoại để chơi" shows).
  Blocks sit between "Đã biết" and "Dạo này", same heading/row look as the other blocks, no cut text, no overflow.

## Notes for the worker / coordinator (not blocking)
- Label + text repeat: row label "Nợ ngươi một ân" + text "X nợ ngươi một ân" (favour), "Ngươi nợ ân" + "ngươi nợ X một ân" (debt). Could shorten the label to "Ân" / "Nợ ân".
- Talk odds modifier (memMod) is also added to hostile talk options (Khiêu khích when <100); harmless, but a fond memory making a provocation land better is odd.
- The generic event memory uses a 6-second wall-clock window after an event choice (CTX); an unrelated relAdd ±15 inside that window would be named after the event. Rare.
- Co-op: NPC memories of the GUEST are kept in the guest's personal S.mem, so NPC minds on the host (hostility) do not see them. Fine for now (per-player
  knowledge), but if the owner wants NPC grudges to be world facts (OD:L96), S.mem's NPC side would move to the shared world.
- Skipped by the worker (marked in PROGRESS): invoke inside hard events, buy-back/steal proof, whole-palace ledger page, toilGrudge wiring.

## Open questions for the owner (from the worker, unchanged)
1. Should "Nhắc lại ân xưa" also appear inside hard events (instead of paying bạc)? Needs per-event wiring.
2. Block name "Ân oán chưa dứt" vs the design file's "Nắm thóp" (which only covers what she holds).
