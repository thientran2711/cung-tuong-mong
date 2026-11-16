#!/usr/bin/env python3
"""Co-op audit (owner RULE 15/11 20:05Z: every player feature must work in 2-player co-op, no "later").
usage: python3 dev/test/coop-audit.py [--md dev/coop/COOP_AUDIT.md]

For every player feature: its source files, the S keys it keeps, and machine evidence read from the code:
  shared  = keys that are WORLD keys (jcoopworld W_KEYS: one truth, host wins non-numeric conflicts) vs personal (P[seat].S, own merge side)
  muted   = world functions the guest does not run (jcoopworld `mute`) that the feature lives in
  other   = writes to ANOTHER person's non-stat state (inv / kids / pets / ill / staff) — on the friend's entry these never reach her
            unless jcoopworld relays them (res.pet / res.items, review/coop-pets)
  coop    = the feature (or jcoopworld) has explicit co-op handling
The verdict column is the auditor's reading of that evidence + the two-browser tests (coop-e2e, coop-world, coop-pets).
"""
import re, sys, os
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
B = os.path.join(ROOT, 'dev', 'build')
def rd(f):
    try: return open(os.path.join(B, f), encoding='utf-8').read()
    except OSError: return ''
CW = rd('jcoopworld.js')
W_KEYS = re.findall(r'"([a-zA-Z]+)"', re.search(r'const W_KEYS=\[(.*?)\]', CW).group(1))
MUTED = re.findall(r'"(\w+)"', re.search(r'\[([^\]]*)\]\.forEach\(mute\)', CW).group(1)) + ['emperorDies']
RELAYED = {'pets': 'res.pet' in CW, 'inv': 'res.items' in CW or 'items&&items.length' in CW}
OTHER = re.compile(r'\b(?:t|r|v|q|p|f)\.(inv|kids|pets|ill|staff)\s*(?:\.push|\.splice|=[^=])')

# feature, files, S keys, verdict, note (what works / what breaks), fix (DONE here / PLAN)
F = [
 ("Acts on NPCs (all act tabs)", ["j8.js","j9.js","jtsb.js","j78.js"], ["acts","used"], "WORKS",
  "runAct on W.R rivals; numbers merge by delta, host wins other conflicts; guest's NPC-vs-NPC rolls muted", ""),
 ("Acts on the friend (talk, harm, scheme, accuse…)", ["jcoopworld.js"], [], "WORKS",
  "PROTOCOL §9.1: invite card (Kết giao/Tặng quà) or `res` with stat fx + flags; death/lãnh cung on her side", ""),
 ("Late act on a friend who already ended the week", ["jcoopworld.js"], [], "FIXED",
  "res after her `end` was lost at the merge (any act)", "DONE: she re-sends `end` before the ack; my `end` waits for acks (≤10 s)"),
 ("Gift / handmade work / poisoned gift TO the friend", ["j8.js","j83.js","jgift.js","jpoison.js","jcoopworld.js"], ["inv"], "FIXED",
  "item left the giver and was pushed into the friend ENTRY's bag only — never reached her", "DONE: res.items → her own Quà tặng dialog (keep / thái y nghiệm, poison path jpoison)"),
 ("Pets: own care, growth, shop", ["jpet.js","jpetcare.js"], ["pets","petOn","petB"], "WORKS",
  "personal S.pets", "DONE: NPC pet week/month rolled on host only (was decayed twice by the merge)"),
 ("Pets: help / harm / steal the friend's pet", ["jpetcare.js","jpet.js","jcoopworld.js"], ["pets"], "FIXED",
  "coopPetAct hook had no relay; friend entry had no pets so the acts were never offered", "DONE: live pets on her entry (pos), res.pet ops applied to her own pets, follow bonus once"),
 ("Steal an ITEM / harm a KID of the friend", ["j8.js","j1.js"], ["inv","kids"], "SINGLE-PLAYER ONLY",
  "her entry carries no items/kids (buildFriend inv:[] kids:[]) → acts not offered on her", "PLAN B1"),
 ("Minigames (cầm kỳ thi họa, works games)", ["jwkg.js","j83.js","j60.js"], ["mg"], "WORKS",
  "local S.mg; buổi end waits while a game is open", ""),
 ("Toilette (điểm trang buổi sáng) / wardrobe / makeup", ["jtoil.js","jwdinv.js","jwd92b.js"], ["toil","dress","wd"], "WORKS",
  "personal; friend sees her look via LOOK keys on her entry", ""),
 ("Recipes / handmade works", ["jwkr.js","j83.js"], ["wk","wkr"], "WORKS", "personal", ""),
 ("Month calendar", ["jmcal.js"], [], "WORKS", "reads the shared date", ""),
 ("Item events (items in events)", ["jitev.js"], ["inv"], "WORKS", "personal events + her own bag", ""),
 ("Stories / side stories / rare endings", ["jstory.js","j67.js","j68.js"], ["story","st"], "WORKS",
  "personal; NPC changes merge one-sided (host wins a real conflict)", ""),
 ("Promotion exams (khảo hạch tấn phong)", ["jexam.js"], ["exam"], "WORKS (caveat)",
  "personal exam; seat caps (one Hoàng hậu, phi seats) do not see a promotion the friend makes in the SAME week", "PLAN B5"),
 ("Thỉnh an / Thái hậu, Hoàng hậu favour", ["j2.js","j84.js"], ["th","hh"], "WORKS", "personal favour numbers", ""),
 ("Nights (thị tẩm, lật thẻ, Kính sự phòng)", ["j8.js","j75.js","j7.js"], ["tonight"], "BROKEN IN CO-OP",
  "S.tonight is personal: each client flips its own night → the Emperor can spend the same night with both players (or an NPC on one screen, her on the other)", "PLAN B2"),
 ("Pregnancy, kids, heir (Thái tử)", ["j1.js","j32.js","jht.js"], ["kids","heir","preg"], "WORKS (caveat)",
  "personal; two players can each have a Thái tử named (S.heir personal); friend's kids not on her entry", "PLAN B2 (with nights)"),
 ("Emperor death / succession", ["jht.js","j1.js"], [], "SINGLE-PLAYER ONLY",
  "emperorDies is muted in co-op (both seats)", "PLAN B3"),
 ("Festival contests (Yến xuân, Thất tịch)", ["j3.js","j8.js"], ["festDone"], "BROKEN IN CO-OP",
  "festival() muted on the guest and run without the friend on the host → the guest never competes", "PLAN B4"),
 ("NPC month / turn schemes against the player", ["j8.js","j9.js"], [], "BROKEN IN CO-OP",
  "rivalsTurn / rivalsMonth muted on the guest and the friend is pulled out on the host → the guest is never their target", "PLAN B4"),
 ("Places / map / who is where", ["jplace.js","jcoopworld.js"], ["place","where"], "WORKS", "host's `where` + both `pos`", ""),
 ("Economy: stipend, skimming, shops, selling", ["jecon.js","jstip.js","jinv.js"], ["bac","inv"], "WORKS", "personal", ""),
 ("Men outside the harem (jmen)", ["jmen.js"], ["men"], "WORKS", "personal S.men; menW places from host", ""),
 ("Death → rebirth (Luân hồi)", ["jcoopworld.js","jkiep.js"], [], "WORKS", "same world, `me` (coop-e2e)", ""),
 ("Cung nữ road (friend serves a mistress)", ["jcoopworld.js","jtsb.js"], ["srv"], "WORKS (caveat)",
  "she is a servant entry: consort acts and pet acts are not offered on her", "PLAN B1"),
 ("Save / old saves", ["jcoopworld.js"], [], "WORKS", "room DO is the save; solo slots untouched; old save loads (coop-e2e)", ""),
]

def evidence(files, keys):
    src = ''.join(rd(f) for f in files)
    sh = [k for k in keys if k in W_KEYS]
    mu = sorted({m for m in MUTED if re.search(r'function %s\b' % m, src)})
    oth = sorted({m for m in OTHER.findall(src)})
    rel = [o for o in oth if RELAYED.get(o)]
    coop = bool(re.search(r'COOPW|coop', src)) or 'jcoopworld.js' in files
    return sh, mu, oth, rel, coop

rows = []
for name, files, keys, verdict, note, fix in F:
    sh, mu, oth, rel, coop = evidence(files, keys)
    rows.append((name, verdict, 'shared:' + (','.join(sh) or '–'), 'muted:' + (','.join(mu) or '–'),
                 'other-writes:' + (','.join(oth) or '–') + (' (relay to the friend: ' + ','.join(rel) + ')' if rel else ''), 'yes' if coop else 'no', note, fix))
md = ['# Co-op audit (generated by dev/test/coop-audit.py — rerun after co-op changes)', '',
      f'W_KEYS (shared world): {", ".join(W_KEYS)}  ·  guest-muted: {", ".join(MUTED)}', '',
      '| Feature | Co-op | Evidence | Note | Fix |', '|---|---|---|---|---|']
for r in rows:
    md.append(f'| {r[0]} | **{r[1]}** | {r[2]} · {r[3]} · {r[4]} · co-op code: {r[5]} | {r[6]} | {r[7]} |')
cnt = {}
for r in rows: cnt[r[1]] = cnt.get(r[1], 0) + 1
md += ['', 'Totals: ' + ', '.join(f'{k} {v}' for k, v in sorted(cnt.items())), '',
 '## Big items (plan, not started)',
 '- **B1 friend\'s items / kids / servant form on her entry**: send a compact view of her bag (giftable/stealable only) and kids in `pos` like the pets; extend res ops (`items` remove / `kid` fx) the same way res.pet does; servant entry gets the maid act set.',
 '- **B2 nights + heir host-authoritative**: the host decides the night for the whole harem (both players + NPCs) in placeWhere/flip and sends it with `where` (`tonight: pid|npc id`); the guest\'s flip only reads it. Heir: S.heir moves to a world key `emp.heir` (pid + kid name).',
 '- **B3 Emperor death / succession in co-op**: unmute on the host, carry the new Emperor in W.S (already a world key), both clients run the succession dialogs from the merged week.',
 '- **B4 festivals + NPC schemes reach the guest**: run festival / rivalsTurn / rivalsMonth on the host WITH the friend entry (not pulled); her stat changes already write back through toCanon; dialogs for her go out as `res`-style notes (new `note` relay exists in the server).',
 '- **B5 seat caps across both players**: promotion checks count the friend entry\'s live rank (pos) and the server refuses a second Hoàng hậu in one merge (host wins, the guest gets the fallback rank + a card).',
]
out = '\n'.join(md) + '\n'
print(out)
if '--md' in sys.argv:
    open(os.path.join(ROOT, sys.argv[sys.argv.index('--md') + 1]), 'w', encoding='utf-8').write(out)
