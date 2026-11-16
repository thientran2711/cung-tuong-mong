# PROGRESS — review/memories (D26: idea builds #1 Kỷ niệm + #3 hook ledger)

Spec: `dev/ideas/DESIGN_IDEAS_1115.md` #1 and #3 (review/idea-design). `HISTORY_IDEAS_1115.md` has no memory/hook item; nothing taken from it.
Code: `dev/build/jmem.js` (last module in assemble.py). Numbers: `BAL.mem`, `BAL.hook` (end of `jbal2.js`). Person-card hook: `jpcf.js` `PCF_X`.
Test: `node dev/test/memories.js <build url> <outdir> 755x1000@1,1180x820@1` → 31 logic checks + card blocks per size. Serve `dev/` with a UTF-8 charset header
(plain `python3 -m http.server` breaks the page: "Invalid or unexpected token", the meta charset sits after the big icon data URI).

## LUẬT ƯU TIÊN SỐ 1 check
`git grep` origin/main + review/{toil-react-r1, log-sync, intrigue, personality, emotion, stories, dialog-person, mood-dialog-r1, evidence-truth-r1, schedules2,
kit-sweep, pcard-actrow} for memAdd / kỷ niệm / hookAdd / S.mem / S.hooks: nothing (only the item text "giữ làm kỷ niệm"). Reused instead of copied:
j21 notes (noteAdd), j72 nợ ân ledger (q72DebtAdd, q.a quests), j8/jtruth evidence (evA/evG), j9 relation (aff/relAdd/oanAdd/hostility), runAct/caught (schemes,
both ways incl. NPC↔NPC), giveTo, empAct, talk/talkOpts, chooseM (event title), oanMonth (monthly tick), jpcf person-card blocks, kitRows.
- toilGrudge (review/toil-react-r1) is NOT on main → not wired. When it lands, it can call `memAdd(npc, S, "bad", {x:"điểm trang", g:N})`.
- D29 location ledger (review/schedules3) is not pushed yet → no overlap (that one is places, this one is people).

## 1. Memories (Kỷ niệm)
- Store `S.mem["<holder>|<about>"] = [{d,s,g,g0,k,n,w,dt,x}]`, keys "me" / rival id / "emp" / "th". Personal state (not in co-op W_KEYS) → co-op safe;
  old saves start empty (lazy init). ≤ `cap` (5) per pair, ≤ `pairCap` pairs (NPC↔NPC pruned first).
- 34 deed templates `MEM_DEEDS` (sign, base weight, keep, phrase). Writers: runAct (ally success; any scheme that is caught / accuse / gives proof /
  drops thiện cảm ≥ 8 → the target remembers the doer; works for NPC→her and NPC→NPC), giveTo (gift / bad gift / tainted gift), empAct (reward,
  pardon, cutpay, confiscate, judge), talk options (secret, care, apology, humble, provoke, vent), q72End (helped / failed / exposed), a relation swing
  ≥ relMin inside an event choice = generic "good/bad" memory named after the event. Secret acts nobody saw write nothing.
- Fade: −fadeMo (2) a month, once per month (oanMonth); keep-deeds stop at g0 × keepFloor (betrayal never fades fully). Repeat = reinforce.
- Recall: (a) talk result gets the person's quoted line (once per recallCd tuần per person) + the card block shows it; (b) memMod (±10) on talk-option
  odds and Kết giao odds with that person, and subtracted from NPC hostility (NPC target choice); (c) talk option "Nhắc lại ân xưa" (weight ≥ invokeMin):
  spends invokeCost weight → that person owes her one ân in the existing j72 ledger (non-bạc road; the call-in buttons already exist).
- Strong memories (≥ logMin) write a Sổ ghi line → they appear in Tuần lục with the week's entries.
- API: `memAdd(h,a,deed,{g,x,keep,quiet})`, `memList`, `memScore`, `memMod`, `memTop(h,a,sign)`, `memLine(h,a)` (quote for event text), `memFade`, `memInvoke`, `memAgo`.

## 2. Hook ledger (Ân oán chưa dứt)
- Mirrors (never copies): her proof `v.ev` → proof; NPC proof on her `v.evm.me` → threat; j72 `q.d` → favour / debt; j72 accepted quests `q.a` → promise (with due).
- Own store `S.hooks = {n, L, done}` for kinds without a home: secret (auto from notes "tư thông với…" / "không khớp đêm thị tẩm"), promise, threat, favour, debt, vow.
- API: `hookAdd(kind,by,on,{t,str,due,src,x})`, `hookQuery({k,by,on,who,src,str,mir})`, `hookPick(filter)` (oldest open, for events), `hookResolve(id,res)`
  (mirrored ids act on their system: `ev:`/`evm:` clear proof, `q72:` ±1 debt; `q72a:` refused, quests end via q72End), `hookUse(id)` (weak = spent; strong =
  uses+1, target Oán +useOan, may strike back with proof or destroy the secret), `hookLabel`, `hookText`, `hookTick` (monthly: lapsed if a party is gone, promise
  past due = broken + memory, strong secret fades with fadeCh). Kept / broken promises write memories.
- Use on screen: rival talk option "Lấy chuyện riêng ép nàng" (strong secret; odds ladder; side chances with chanceW).

## Shown (KIT FIRST: no new component, no CSS)
Person card (jpcf, "Lòng người" tab or under the acts): block "Kỷ niệm" = quote line (`.kpnote`) + `kitRows` (when | "Nàng nhớ: …" / "Ngươi nhớ: …" + fade word,
green/red) + "Lòng nhớ" row; block "Ân oán chưa dứt" = `kitRows` (kind | text). VP paints ngươi→ta / nàng→nàng ta on screen as everywhere.

## Skipped / not built (mark)
- Invoking a memory INSIDE hard events (instead of paying) — not built; events can read `memTop/memLine` and add the option; the talk-option road exists.
- NPC↔NPC memories are written only from runAct (schemes / ally); on a co-op guest they stay per player (world agency runs on the host).
- A whole-palace ledger page (all hooks in one list): not built — design asks per person; would need a list view → KIT REQUEST if wanted (could be kitIntel).
- Two-way "buy back / steal proof" and 30 hand-written event uses of hooks: not built (API ready).
- Week book dedicated "memories" page: not built; strong memories come through the Sổ ghi lines.

## Tests (16/11)
755x1000@1 and 1180x820@1: ALL OK (31 checks each, both card blocks present, no horizontal overflow, no page errors). Shots looked at: card + card-mem at both sizes.
