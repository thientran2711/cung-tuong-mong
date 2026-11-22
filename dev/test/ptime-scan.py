#!/usr/bin/env python3
"""PARALLEL TIME whole-group scan (owner OD 18/11 ~20:20Z: "bất cứ cái nút nào mà mình nhờ vả người khác"), round 4 (FAIL 7 item 5).
usage: python3 dev/test/ptime-scan.py [dev/build] > scan.md        (exit 1 = a send nobody looked at, or a PARALLEL proof missing)
PART A — every player-visible button / option label that asks or sends ANOTHER person (Sai / Nhờ / Mời / Truyền / Phái / Cử / Mua chuộc /
Cài người / Tặng quà / dò la / nghe ngóng / mang quà / đưa thư / mua lén / lẻn vào …), one row each, with its class:
  PARALLEL   runs through jptime (order khắc now, person away n khắc, result at the due khắc). PROOF: the rule names the code that wires it;
             the scan checks that code is in the build (else BROKEN, exit 1) — a label is never PARALLEL by its words alone.
  RECEIVER   an order / request TO her (maid road): a notice (S.ordQ) answered with the 4 answers of OD L1876 (Việc chủ sai: 3)
  FACE       the person is in front of her (she speaks / buys / asks in person): nothing is sent, nothing to wait for
  STORY      an option inside an event / road / story dialog (its cost and outcome are the event's own). NO file-wide pass: only the
             (file, label) pairs in dev/test/ptime-story.txt (reviewed list); a NEW send label in a story file is "?" until someone looks.
  STANDING   a standing order or a long arrangement kept as a state (weeks)
  OPEN       not converted (reason in the row; Foreman D's ruling)
PART B — every NPC sender path (two-way, law 1): call sites where an NPC sends a person (j9 runAct sent = bestSent; AGRUN deeds that use a
servant / maid; NPC gift / invitation). Each known site has a proof in jptime; a NEW bestSent( call site outside the list = "?" (exit 1)."""
import re, sys, os, glob
B = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '..', 'build')
HERE = os.path.dirname(os.path.abspath(__file__))
SEND = r'(?:Sai |Nhờ |Mời |Truyền |Phái |Cử |Mua chuộc|Cài người|Tặng quà)'
INNER = r'(?:dò la|Dò hỏi|Nghe ngóng|mang quà|đưa thư|chuyển lời|mua lén|lẻn vào|Việc chủ sai)'
PAT = re.compile(r'''n:\s*[`"'](''' + SEND + r'''[^`"']{0,80}|[^`"']{0,30}''' + INNER + r'''[^`"']{0,60})[`"']''')
PAT2 = re.compile(r'''pbtn\((?:`[^`]*`|"[^"]*"|[^,]+),\s*[`"']([^`"']*''' + '(?:' + SEND + '|' + INNER + ')' + r'''[^`"']*)[`"']''')
PAT4 = re.compile(r'''<button [^>]*>(''' + SEND + r'''[^<]{0,80})<''')   # raw kit buttons (j8 «Nhờ thái giám mua đồ», j10 «Mua chuộc»)
PAT3 = re.compile(r'''\bA\(\s*"(\w+)"\s*,\s*"(''' + SEND + r'''[^"]{0,60})"''')   # j8 ACT table: A("bribe","Mua chuộc cung nữ",…)
def src(f):
    try: return open(os.path.join(B, f), encoding='utf-8').read()
    except Exception: return ''
PT = src('jptime.js')
def has(f, rx): return re.search(rx, src(f) if f != 'jptime.js' else PT) is not None
# label regex -> (class, note, proof list [(file, regex)] — PARALLEL / RECEIVER only, all must be found)
HARM = [('jptime.js', r'function ptHarmSent'), ('j8.js', r'ptHarmSend|harmK\(')]
CLS = [
 (r'^Sai (cung nữ )?đi dò la$', 'PARALLEL', 'spy · jptime §1 (spyMaidRun deferred)', [('jptime.js', r'spyMaidRun=function'), ('jptime.js', r'ptReg\("spy"')]),
 (r'^Nghe ngóng chung$', 'PARALLEL', 'listen · jptime §2', [('jptime.js', r'function ptListen'), ('jptime.js', r'a\.n==="Nghe ngóng chung"')]),
 (r'^Sai tai mắt dò nơi ở$', 'PARALLEL', 'scout · j21 → ptSend (her runner)', [('j21.js', r'kind:"scout"'), ('jptime.js', r'ptReg\("scout"')]),
 (r'^Mời đến cung ta$', 'PARALLEL', 'invite · j21 → ptSend; guest comes at due', [('j21.js', r'kind:"invite"'), ('jptime.js', r'ptReg\("invite"')]),
 (r'^Sai người lẻn vào cung', 'PARALLEL', 'plant · PEND.plantpick (not "tại cung nàng")', [('jptime.js', r'PEND\.plantpick=function'), ('jptime.js', r'ptReg\("plant"')]),
 (r'^Tặng quà', 'PARALLEL', 'gift · PEND.giftpick when not together (a servant carries it)', [('jptime.js', r'PEND\.giftpick=function'), ('jptime.js', r'ptReg\("gift"')]),
 (r'^Sai cung nữ thân tín mua lén ngoài cung$', 'PARALLEL', 'buy · j83 illBuy maid route', [('jptime.js', r'illBuy=function'), ('jptime.js', r'ptReg\("buy"')]),
 (r'^Sai \$\{o\.m\.name\} đến Nội vụ phủ xin$', 'PARALLEL', 'clothes · jeitem eitReOpts (order = its Sức)', [('jptime.js', r'eitReOpts=function'), ('jptime.js', r'ptReg\("clothes"')]),
 (r'^Sai cung nữ dò la khẩu vị$', 'PARALLEL', 'taste · jrcp rcpAskQ maid → ptSend', [('jrcp.js', r'ptSend\(\{who:"mm:me".*run:"taste"'), ('jptime.js', r'ptReg\("taste"')]),
 (r'^Sai \$\{m\.name\} đòi lại phần bị cắt xén$', 'PARALLEL', 'ask · jptime §12 (jstip stipEvent)', [('jptime.js', r'stipEvent=function'), ('jptime.js', r'ptReg\("ask"')]),
 (r'^Sai người mua lén ngoài cung$', 'PARALLEL', 'vlbuy · jptime §13 (jveil PEND.vlout)', [('jptime.js', r'PEND\.vlout=function'), ('jptime.js', r'ptReg\("vlbuy"')]),
 (r'^Sai tai mắt dò bên chủ hội$', 'PARALLEL', 'mktspy · jptime §14 (jmkt tsMkScoutOpts)', [('jptime.js', r'tsMkScoutOpts=function'), ('jptime.js', r'ptReg\("mktspy"')]),
 (r'^Truyền thái y$|^Mời thái y bắt mạch$', 'PARALLEL', 'summon · jptime §15 (illCards / courtAct bm / nausea notice)', [('jptime.js', r'c\.n==="Truyền thái y"'), ('jptime.js', r'Mời thái y bắt mạch'), ('jptime.js', r'ptReg\("thyPay"')]),
 (r'^Truyền \$\{m\.rw\} vào cung$', 'PARALLEL', 'summon · jptime §15 (jroute rtCard ttord)', [('jptime.js', r'rtCard=function'), ('jptime.js', r'ptReg\("rtOrd"')]),
 (r'^Nhờ thái giám mua đồ$', 'PARALLEL', 'shop · jptime §17 (invAct shop → eunuch away, tray at due)', [('jptime.js', r'invAct=function'), ('jptime.js', r'ptReg\("shop"')]),
 (r'^Cài người( hầu)? vào cung', 'PARALLEL', 'bribe · jptime §19 (j10 PEND.plantsv: the servant walks over, placed at due)', [('jptime.js', r'PEND\.plantsv=function'), ('jptime.js', r'ptReg\("bribe"')]),
 (r'^Mua chuộc cung nữ$|^Mua chuộc bà đỡ$|^Sai cung nữ thân tín lấy lòng$', 'PARALLEL', 'an ACT on a consort (j8 doAct): sent when not together → harm row (jptime §6)', HARM),
 (r'^Việc chủ sai$', 'RECEIVER', 'maid road: notice (S.ordQ) + 3 answers (jptime ptErrFrame / ptErrCard)', [('jptime.js', r'function ptErrFrame'), ('jptime.js', r'function ptErrCard')]),
 (r'^Mua chuộc$', 'FACE', 'j10 servAct mua / j15 card: she meets the other palace\'s servant herself (2 khắc); nobody is sent', []),
 (r'^(Nghe ngóng cho chủ|Tự đi dò la cho chủ|Canh chừng cung chủ)$', 'FACE', 'maid road: her OWN deed for her master (she goes herself)', []),
 (r'^Nhờ thái giám tìm thú nuôi$', 'FACE', 'jpet petShop = the Nội vụ phủ seller dialog (kitShop): bought from him in person', []),
 (r'^Nhờ thái giám dẫn vào', 'FACE', 'j77: he walks WITH her (she goes too)', []),
 (r'^Nhờ giúp đỡ$|^Nhờ .*trả ân', 'FACE', 'asked of the person in front of her; the answer is hers at once', []),
 (r'^Nhờ dò tin$|^Biếu quà nhỏ$', 'FACE', 'maid road: asked of a fellow servant in front of her', []),
 (r'^Mời .* vào phe|^Mời \{v\}$', 'FACE', 'faction invitation (j10): spoken in person on her card', []),
 (r'^Mời làm thái y tâm phúc$', 'FACE', 'said to the physician in front of her (Thái y viện pop-up)', []),
 (r'^Nhờ \$\{m\.name\} nếm trước$', 'FACE', 'the taster stands beside her at the meal', []),
 (r'^Mời hảo hữu$', 'FACE', 'co-op lobby: invite a real friend (another player) to a game — not an in-game person, no game clock', []),
 (r'^Nhờ .* để ý giúp', 'STANDING', 'j70 ally watch: 6 weeks, kept as a state', []),
 (r'^Mua chuộc (người ở Ngự thiện phòng|cung nữ dâng trà|thái y đổi thuốc an thai|vú nuôi|thầy dạy)$|^Nhờ Nội vụ phủ cử bà đỡ', 'STANDING', 'j70 plot route: weeks of prep kept as the plot state; the deed itself at exec70 (§18 for an NPC)', []),
 (r'^Dò hỏi gia thế$', 'OPEN', 'jht: her runner asks about a family OUTSIDE the palace (quý nữ / a son\'s house) — parked by Foreman D with j54 / j55 (week clock)', []),
 (r'^Nhờ cha|^Nhờ con|^Dò la nhà ngoại|^Tung chứng cứ', 'OPEN', 'family / court route (j55 / j54): people outside the palace — parked by Foreman D (week clock)', []),
]
NOSEND = set(re.search(r'ACT_NOSEND=\[([^\]]*)\]', src('j9.js')).group(1).replace('"','').split(','))
OPENF = re.compile(r'^(j5[45]|jht)\.js$')
STORY = set()
try:
    for l in open(os.path.join(HERE, 'ptime-story.txt'), encoding='utf-8'):
        l = l.rstrip('\n')
        if l and not l.startswith('#') and '\t' in l: STORY.add(tuple(l.split('\t', 1)))
except FileNotFoundError: pass
rows = []; bad = []; seen = set()
for f in sorted(glob.glob(os.path.join(B, 'j*.js'))):
    bn = os.path.basename(f)
    if bn.startswith('all'): continue
    for i, line in enumerate(open(f, encoding='utf-8'), 1):
        labs = [(m.group(1), None) for m in list(PAT.finditer(line)) + list(PAT2.finditer(line)) + list(PAT4.finditer(line))] + [(m.group(2), m.group(1)) for m in PAT3.finditer(line)]
        for lab, ak in labs:
            lab = lab.strip()
            if len(lab) > 90 or '<' in lab: continue
            c = next(((k, n, p) for r, k, n, p in CLS if re.search(r, lab)), None)
            if ak and not c:  # an ACT (A("k","label")): runAct — her deed sent when not together = harm row (§6), an NPC's = §18
                c = ('FACE', f'ACT {ak}: done in person / its own path (j9 ACT_NOSEND)', []) if ak in NOSEND else ('PARALLEL', f'ACT {ak} (runAct): sent servant when not together → harm row (§6 hers, §18 NPC)', HARM + [('jptime.js', r'runAct=function\(a,t,k,extra\)\{if\(!ptNpcSent')])
            if c and c[0] == 'OPEN' and not OPENF.match(bn): c = None
            if not c and (bn, lab) in STORY: c = ('STORY', 'option inside an event / road / story dialog (reviewed list ptime-story.txt)', [])
            cls, note = (c[0], c[1]) if c else ('?', 'a send label nobody classed (add a rule with its proof, or to ptime-story.txt after review)')
            if c and c[2]:
                miss = [f'{pf}:{rx}' for pf, rx in c[2] if not has(pf, rx)]
                if miss: cls, note = 'BROKEN', 'PARALLEL proof missing: ' + ', '.join(miss)
            key = (lab, bn, cls)
            if key in seen: continue
            seen.add(key); row = (lab, f'{bn}:{i}', cls, note); rows.append(row)
            if cls in ('?', 'BROKEN'): bad.append(row)
print('## A. Her buttons\n\n| button / option | file:line | class | how / why |\n|---|---|---|---|')
for r in rows: print('| ' + ' | '.join(x.replace('|', '/') for x in r) + ' |')
print(f'\n{len(rows)} labels · ' + ' · '.join(f'{k} {sum(1 for r in rows if r[2]==k)}' for k in ['PARALLEL','RECEIVER','FACE','STORY','STANDING','OPEN','BROKEN','?']))
# ---------------- PART B: NPC senders ----------------
NPC = [  # (call site file, regex of the site, how it is wired, proof in jptime)
 ('j28.js', r'function npcAct', 'npcAct → runAct(v,t,k): sent servant away n, deed at due (§18 runAct wrapper)', r'runAct=function\(a,t,k,extra\)\{if\(!ptNpcSent'),
 ('j40.js', r'function mindRun', 'mindRun (NPC mind step) at due (§18)', r'mindRun=function\(v,t,k,err\)'),
 ('j70.js', r'function exec70', 'NPC plot exec70: the servant goes, the plot lands at due (§18)', r'exec70=function\(p,opp\)'),
 ('jtruth.js', r'function npcFrame', 'npcFrame → runAct (§18)', r'ptReg\("npcAct"'),
 ('jtsb.js', r'function tsbHit', 'planned harm → runAct under TSB.now; the card at due (tsbHit) (§18)', r'tsbHit\(a\.a\.k,r\)'),
 ('jagacts3.js', r'"cx2:maidSpy"', 'NPC maid sent to spy (PT_NPC)', r'"cx2:maidSpy":\{kind:"spy"'),
 ('jagacts3.js', r'"cx3:invite2"', 'NPC host invitation (PT_NPC npcinv)', r'PT_NPC\["cx3:invite2"\]'),
 ('jagacts2.js', r'"cx2:plantSrv"', 'NPC plants a servant (PT_NPC bribe)', r'PT_NPC\["cx2:plantSrv"\]'),
 ('jagacts2.js', r'"cx2:maidTalk"', 'NPC talks with her maid: locked while the maid is away (§18 maid lock)', r'function ptMaidOut'),
 ('j8.js', r'function sendMaid', 'NPC sends her maid to the Emperor: locked while away (§18)', r'sendMaid=function\(a\)\{if\(ptMaidOut'),
 ('jagacts4.js', r'illBuy\(v,r,k\)', 'NPC sends her maid out by the Thần Vũ gate (cx4 ill route): away n, known at due (§20)', r'ptReg\("npcBuy"'),
 ('j8.js', r'PEND\.giftin|"giftin"', 'NPC gift carried by her servant (§16)', r'd\.pid==="giftin"'),
]
print('\n## B. NPC senders (two-way)\n\n| site | how | class |\n|---|---|---|')
for f, rx, how, proof in NPC:
    ok_site = has(f, rx); ok = ok_site and re.search(proof, PT) is not None
    cls = 'PARALLEL' if ok else ('BROKEN' if ok_site else 'GONE')
    print(f'| {f} {rx} | {how} | {cls} |')
    if cls == 'BROKEN': bad.append((f, rx, cls, how))
# every bestSent( call site must be known: a NEW one is a sender nobody looked at
KNOWN_BS = {'j10.js': 'bestSent itself + plantServ (Cài người: §19 / cx2:plantSrv)', 'j9.js': 'runAct / actCtx (the sent servant of every ACT: §6 hers, §18 NPC)',
 'j8.js': 'act previews / doAct (§6)', 'jptime.js': 'the mechanism', 'jagacts2.js': 'cx2:plantSrv weight (PT_NPC)', 'j15.js': 'card text (runner line)',
 'jagstf2.js': 'stf2Ord: the sent servant answers inside runAct (lands at due)', 'j29.js': 'runAct wrapper: the sent servant answers (inside runAct)',
 'j6.js': 'card text («phải sai người»)', 'j78.js': 'preview of runAct (confess risk)', 'jagknow.js': 'tmFear: effect inside runAct', 'jaudit.js': 'display (odds why / runner bar)',
 'jhc.js': 'runner pick (who runs her errands)', 'jerr.js': 'MAIN errand-scene: errRunner = fallback ledger when the core is off; with the core on, errPtRun picks HER runner (bestSent, the same pick as ptHarmSend; jptime ptRunner for named flows) for gates the core does not adapt and writes the task into the core S.away via PTIME.send (fixer #6)', 'jwhy.js': 'spyAgent / why rows: her spy = §1, NPC spy via runAct §18',
 'jht.js': 'Dò hỏi gia thế: people OUTSIDE the palace (quý nữ / sons\' families) = OPEN, parked by Foreman D with j54 / j55 (week clock)'}
for bn, why in sorted(KNOWN_BS.items()): print(f'| {bn} bestSent( | {why} | known |')
for f in sorted(glob.glob(os.path.join(B, 'j*.js'))):
    bn = os.path.basename(f)
    if bn in KNOWN_BS or bn.startswith('all'): continue
    for i, line in enumerate(open(f, encoding='utf-8'), 1):
        if re.search(r'\bbestSent\(', line) and not re.search(r'function bestSent', line):
            print(f'| {bn}:{i} bestSent( | new sender site, not reviewed | ? |'); bad.append((bn, i, '?', 'bestSent'))
print(f'\n{len(bad)} problem rows')
sys.exit(1 if bad else 0)
