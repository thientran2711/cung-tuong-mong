#!/usr/bin/env python3
# Autopilot for one life: real clicks via the play.js server, human pace (>=1.3 s per action).
# usage: auto.py LOGFILE MONTHS "act1,act2,..." "prefer1|prefer2" ["avoid1|avoid2"]
import json, re, sys, time, urllib.request
LOG, MONTHS, ACTS = sys.argv[1], int(sys.argv[2]), sys.argv[3].split(',')
PREF = [p for p in (sys.argv[4] if len(sys.argv) > 4 else '').split('|') if p]
HEAL = True
DEF = sys.argv[6] if len(sys.argv) > 6 else 'stop'
AVOID = [p for p in (sys.argv[5] if len(sys.argv) > 5 else '').split('|') if p]
STOP = re.compile(r'luân hồi|Kiếp mới|kiếp sau|Kết thúc|Roll|Nộp tranh|Giấy họa|qua đời|băng hà|Một kiếp|tạ thế|Bắt đầu ·|Ván cờ', re.I)

CONT = re.compile(r'^(Hẹn kỳ sau.*|Đến .*|Nghe .*|Rút .*|Mở .*|Xem .*|Trở về.*|Quay về.*|Nghe lời chúc tiếp|Tiến vào quảng trường|Tiếp tục|Đã nhận.*|Lĩnh chỉ|Rút thăm.*|Rời tiệc.*|Kết thúc tiệc.*|Về cung.*|Hoàn tất.*|Đóng)$')

def call(d):
    req = urllib.request.Request('http://localhost:9333/', data=json.dumps(d).encode(), method='POST')
    op = urllib.request.build_opener(urllib.request.ProxyHandler({}))
    return op.open(req, timeout=60).read().decode()

def log(s):
    with open(LOG, 'a') as f: f.write(s + '\n')

def modal():
    try: return json.loads(call({'op': 'modal', 'wait': 900}))
    except Exception as e: return {'modal': None}

def click(t, exact=True):
    return call({'op': 'click', 't': t, 'exact': exact, 'n': -1, 'wait': 1400})

def odds(b):
    m = re.search(r'Thuận lợi (\d+)%', b) or re.search(r'(\d+)% thuận lợi', b); return int(m.group(1)) if m else -1

months = 0; last = None; same = 0
while months < MONTHS:
    m = modal()
    if m.get('modal'):
        txt = m['modal']; btns = [b for b in m['btns'] if b]
        if txt == last: same += 1
        else: same = 0; log('--- MODAL\n' + txt.replace('PHƯỢNG HOÀNG TRÙNG SINH · CẨM ĐIỆN\n', ''))
        last = txt
        if same > 2: print('STUCK', txt[:300], btns); break
        if not btns: print('NOBTN', txt[:400]); break
        opts = [b for b in btns if 'huận lợi' in b or (HEAL and re.search(r'[Yy] quan|[Tt]hái y', b))]
        if opts:
            def score(b):
                s = odds(b) if 'huận lợi' in b else 95
                if any(p in b for p in PREF): s += 1000
                if any(p in b for p in AVOID): s -= 1000
                return s
            pick = max(opts, key=score); label = pick.split(' ')[0]
            label = re.split(r' \d+ bạc$| \d+% | · | (May mắn|Tài nghệ|Trí tuệ|Dung mạo|Hoạt ngôn|Thiện|Ác|Sức khỏe|Uy danh|Công trạng|Ân điển)', pick)[0]
            log('>>> CHOSE: ' + pick); r = click(label, False)
            if r.startswith('ERR'):
                errs = globals().get('errs', 0) + 1; globals()['errs'] = errs
                if errs > 4: print('ERRCLICK', pick); break
            continue
        if any(b.startswith('Bắt đầu · 30') for b in btns):
            log('>>> RHYTHM minigame started, no taps (unskilled)'); click('Bắt đầu · 30 giây'); call({'op': 'text', 'wait': 33000}); continue
        if any(STOP.search(b) for b in btns) or STOP.search(txt[-400:].replace('Điểm luân hồi', '')):
            print('STOPWORD', txt[-900:], btns); break
        btns = [b for b in btns if 'Pháo hoa' not in b and not b.startswith('♫')]
        if len(btns) >= 2:
            # multi-button non-odds choice: prefer PREF, else stop for a human decision
            pk = [b for b in btns if any(p in b for p in PREF)]
            if pk: log('>>> CHOSE: ' + pk[0]); click(re.split(r' \d+% | · ', pk[0])[0], False); continue
            ck = [b for b in btns if CONT.search(b)]
            if ck: log('>>> ' + ck[-1]); click(ck[-1]); continue
            if DEF == 'first': log('>>> DEFAULT: ' + btns[0]); click(btns[0]); continue
            if DEF == 'last': log('>>> DEFAULT: ' + btns[-1]); click(btns[-1]); continue
            print('CHOICE', txt[-900:], btns); break
        log('>>> ' + btns[0]); r = click(btns[0])
        if r.startswith('ERR'): print('ERRCLICK', btns[0]); break
        continue
    # main screen: do actions then advance
    page = call({'op': 'text', 'wait': 300})
    hm = re.search(r'Sức khỏe\n(\d+)', page); hp = int(hm.group(1)) if hm else 99
    acts = (['Y quan', 'Y quan'] if hp < 60 else ['Y quan'] if hp < 80 else []) + ACTS
    for a in acts[:5]:
        r = click(a)
        mm = re.findall(r'\n(' + re.escape(a) + r': [^\n]+)', r)
        if mm: log('act ' + mm[-1])
        if modal().get('modal'): break
    if modal().get('modal'): continue
    r = call({'op': 'click', 't': 'THÁNG', 'exact': True, 'wait': 2200})
    hdr = re.search(r'Tháng \d+ · Năm \d+', r)
    st = re.search(r'\n(\S[^\n]*· \d+ tuổi[^\n]*)', r)
    log('=== ' + time.strftime('%H:%M:%S') + ' HP%d ' % hp + (st.group(1) if st else ''))
    months += 1
print('DONE months', months)
