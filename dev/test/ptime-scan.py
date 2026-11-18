#!/usr/bin/env python3
"""PARALLEL TIME whole-group scan (owner OD 18/11 ~20:20Z: "bất cứ cái nút nào mà mình nhờ vả người khác").
usage: python3 dev/test/ptime-scan.py [dev/build] > dev/review/ptime-scan.md
Finds every player-visible button / option label that asks or sends ANOTHER person (Sai / Nhờ / Mời / Truyền / Phái / đưa thư / mang quà / dò la /
nghe ngóng / mua lén …) in dev/build/j*.js and prints one row each with its class:
  PARALLEL      the button runs through jptime (order khắc now, person away n khắc, result at the due khắc)
  RECEIVER      the maid-road order frame «Đi» (same BAL row as the sender)
  FACE          the person is in front of her (she speaks / buys / asks in person): nothing is sent, nothing to wait for
  STORY         an option inside an event / story dialog (its cost and outcome are the event's own)
  STANDING      a standing order or a long arrangement already kept as a state (busy list / weeks)
  OPEN          not converted: reason in the row (reported to Foreman D)
Exit 1 when a label matches the send pattern and has no class (a new send button nobody looked at)."""
import re, sys, os, glob
B = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '..', 'build')
PAT = re.compile(r'''n:\s*[`"']((?:Sai |Nhờ |Mời |Truyền |Phái |Cử )[^`"']{2,80}|[^`"']{0,30}(?:dò la|Nghe ngóng|mang quà|đưa thư|chuyển lời|mua lén|lẻn vào)[^`"']{0,60})[`"']''')
PAT2 = re.compile(r'''pbtn\([^,]+,\s*[`"']([^`"']*(?:Sai |Nhờ |Mời )[^`"']*)[`"']''')
# label regex -> (class, note)
CLS = [
 (r'^Sai (cung nữ )?đi dò la$|^Sai cung nữ đi dò la$', 'PARALLEL', 'spy · jptime §1 (spyMaidRun deferred)'),
 (r'^Nghe ngóng chung$', 'PARALLEL', 'listen · jptime §2'),
 (r'^Sai tai mắt dò nơi ở$', 'PARALLEL', 'scout · j21 scout → ptSend (her runner)'),
 (r'^Mời đến cung ta$', 'PARALLEL', 'invite · j21 invite → ptSend; guest comes at due'),
 (r'^Sai người lẻn vào cung', 'PARALLEL', 'plant · PEND.plantpick (not "tại cung nàng")'),
 (r'^Sai cung nữ thân tín mua lén ngoài cung$', 'PARALLEL', 'buy · j83 illBuy maid route'),
 (r'^Sai \$\{o\.m\.name\} đến Nội vụ phủ xin$', 'PARALLEL', 'clothes · jeitem eitReOpts (order = its Sức, no khắc)'),
 (r'^Việc chủ sai$', 'RECEIVER', 'maid road order frame «Đi» (jptime ptErrFrame)'),
 (r'^(Nghe ngóng cho chủ|Tự đi dò la cho chủ|Canh chừng cung chủ)$', 'FACE', 'maid road: her OWN deed for her master (she goes herself, pays its khắc; nobody is sent)'),
 (r'^Sai cung nữ giả cớ', 'STORY', 'Tranh sủng night card: the maid runs to the Emperor tonight (night act, result is the night)'),
 (r'^Sai cung nữ chuyển lời|^Nhờ người gửi trả', 'STORY', 'j96 story choice'),
 (r'^Sai người (mặc cả|canh chừng|đi hỏi tội|lùng tìm)|^Sai thợ', 'STORY', 'event / việc nhờ step (j72 / j68e / j92): its own cost and W wait'),
 (r'^Sai đại tướng', 'STORY', 'succession event (j99succ)'),
 (r'^Nhờ thái giám mua đồ$', 'FACE', 'PEND.shop: the Nội vụ phủ eunuch brings the tray in and stands before her'),
 (r'^Nhờ thái giám tìm thú nuôi$', 'FACE', 'jpet petShop = the Nội vụ phủ seller dialog (kitShop): bought from him in person'),
 (r'^Nhờ thái giám dẫn vào', 'FACE', 'j77: he walks WITH her (she goes too)'),
 (r'^Nhờ giúp đỡ$|^Nhờ .*trả ân', 'FACE', 'asked of the person in front of her; the answer is hers at once'),
 (r'^Nhờ cha|^Nhờ con|^Dò la nhà ngoại|^Tung chứng cứ', 'OPEN', 'family / court route (j55 / j54): the people are outside the palace — parked for D (no palace walk, a week clock fits better)'),
 (r'^Nhờ dò tin$|^Biếu quà nhỏ$', 'FACE', 'maid road: asked of a fellow servant in front of her'),
 (r'^Nhờ .* đưa thư', 'STORY', 'lãnh cung story option (j24)'),
 (r'^Nhờ .* để ý giúp', 'STANDING', 'j70 ally watch: 6 weeks, kept as a state'),
 (r'^Sai cung nữ thân tín lấy lòng$', 'PARALLEL', 'bribel = an ACT on a consort (j8 doAct): sent when not together → harm row'),
 (r'^Mời .* vào phe|^Mời \{v\}$', 'FACE', 'faction invitation (j10): spoken in person on her card'),
 (r'^Truyền thái y$|^Mời thái y bắt mạch$|^Truyền \$\{m\.rw\} vào cung$', 'OPEN', 'SUMMON: a person called TO her who then treats / serves her in person (her own khắc); proposal for D: messenger = n khắc, the visit at arrival'),
 (r'^Sai cung nữ dò la khẩu vị$', 'PARALLEL', 'spy row · jrcp rcpAskQ maid → ptSend (runner taste)'),
 (r'^Sai \$\{m\.name\} đi đòi$|^Sai người mua lén ngoài cung$|^Sai tai mắt dò bên chủ hội$', 'OPEN', 'a send button not converted in round 1 (jstip / jveil / jmkt): same adapter as §9/§1, next round'),
 (r'^Mời làm thái y tâm phúc$', 'FACE', 'said to the physician in front of her (Thái y viện pop-up)'),
 (r'^Nhờ \$\{m\.name\} nếm trước$', 'FACE', 'the taster stands beside her at the meal'),
]
STORYF = re.compile(r'^(jrd_\w+|j67|j68\w?|j72|j96|j97|j99succ|jkc|jend14|jorigins|jstory|jreign|j7|j14|j4|j53|j54|j55|jworld2|jroute|j70|jrcp|jtruth|jthaiy)\.js$')
rows = []; unknown = []
for f in sorted(glob.glob(os.path.join(B, 'j*.js'))):
    if os.path.basename(f).startswith('all'): continue
    for i, line in enumerate(open(f, encoding='utf-8'), 1):
        for m in list(PAT.finditer(line)) + list(PAT2.finditer(line)):
            lab = m.group(1).strip()
            if len(lab) > 90 or '<' in lab: continue
            c = next(((k, n) for r, k, n in CLS if re.search(r, lab)), None)
            if c and c[1].startswith('family / court route') and not re.match(r'^j5[45]\.js$', os.path.basename(f)): c = None
            if not c and STORYF.match(os.path.basename(f)): c = ('STORY', 'option inside an event / road / story dialog (its own fx and outcome)')
            row = (lab, f'{os.path.basename(f)}:{i}', c[0] if c else '?', c[1] if c else '')
            if row not in rows: rows.append(row)
            if not c: unknown.append(row)
print('| button / option | file:line | class | how / why |\n|---|---|---|---|')
for r in rows: print('| ' + ' | '.join(x.replace('|', '/') for x in r) + ' |')
print(f'\n{len(rows)} labels · ' + ' · '.join(f'{k} {sum(1 for r in rows if r[2]==k)}' for k in ['PARALLEL','RECEIVER','FACE','STORY','STANDING','OPEN','?']))
sys.exit(1 if unknown else 0)
