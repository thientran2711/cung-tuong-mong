#!/usr/bin/env python3
"""contest-thitam-scan (FOREMAN D job D3, LAW 11 whole family): list EVERY contest kind in dev/build/j*.js and whether its FIRST PLACE
also gets thị tẩm that night (a ctnWin( call in its finish). Usage: python3 dev/tools/contest-thitam-scan.py [repo_root]  (exit 1 = a kind
that should be wired is not). Run it on LIVE (origin/main checkout) for the BEFORE column and on the branch for the AFTER column.

How a contest is found (every marker, so a new contest kind shows up here even if nobody lists it):
  M1 bestow(<w>,"contest")   — every contest winner's Emperor gift (j8 / j71 / jcui / jts …)
  M2 the contest finish functions by name: cRun7 cFin7 fxFin7 festival contestEnd tsDressHold selxContest
  M3 story contests: an ending text «đứng đầu» inside a «Kỳ thi / Hội thi / khảo» node (j67 ARC67, jgedata)
  M4 children's contests (j53 khảo thí hoàng tử, j54 công chúa dâng nghệ): the CHILD places, not a consort (no night: listed, not wired)
Each site is classified (KIND table below); a site the table does not know is printed as UNKNOWN (exit 1) so nobody misses one."""
import re, sys, os
root = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
B = os.path.join(root, 'dev', 'build')
# (file, regex of the site line, kind name, wired? expected, why)
KIND = [
 ('j71.js', r'function cRun7', 'Hội thi ngày lễ (j71 festival contest, played by formula; she entered or not)', True, ''),
 ('j71.js', r'function cFin7', 'Hội thi ngày lễ after her mini-game (j71 cFin7)', True, ''),
 ('j71.js', r'function fxFin7', 'Yến tiệc đầu xuân / Thi tài Thất tịch after her mini-game (j71 fxFin7)', True, ''),
 ('j71.js', r'const L=capRank7\(cScore7\(E,p=>p===S\?me\.a:fxBest7', 'Yến tiệc đầu xuân / Thi tài Thất tịch, no mini-game (j71 festival wrapper)', True, ''),
 ('j8.js', r'^function festival\(', 'base feast (j8 festival, when j71 is off)', True, ''),
 ('j34.js', r'^function contestEnd', 'Tranh ghế (j34 seat contest, 3 rounds)', True, ''),
 ('jts.js', r'if\(x\.place===1\)', 'Hội phối đồ (jts dress contest)', True, ''),
 ('j67.js', r'tag:"Tài nữ số một"', 'Kỳ thi Tài nữ (j67 ARC67 thd_tho story contest, her first place)', True, ''),
 ('jrd_thd.js', r'tag:"Đứng đầu vòng thi"', 'Xuân thí round «Vòng thi Ngự hoa viên» (jrd_thd thd_tho 7) — her first place', True, ''),
 ('jrd_thd.js', r'lose:\{tag:"\{v\} đứng đầu",t:"\{v\} đứng đầu vòng Xuân thí', 'Xuân thí round — the NPC {v} first (two-way)', True, ''),
 ('jrd_thd.js', r'tag:"Đứng đầu bảng Xuân thí"', 'Xuân thí final board «Trước bảng vàng» (jrd_thd thd_tho) — her first place', True, ''),
 ('jrd_thd.js', r'lose:\{tag:"Tên ngươi xuống cuối bảng"', 'Xuân thí final board — {v} first (two-way)', True, ''),
 ('jrd_bd.js', r'tag:"Cung thần của hậu cung"', 'Hội bắn xuân (jrd_bd bd_san_9) — her own last shot wins (A.f.ctnself; the prince\'s shot is not hers)', True, ''),
 ('jkc.js', r'ngươi đứng đầu, cả kinh thành nhắc tên', 'khuê các festival contest (jkc / jkcg / jkc3a, home road)', False, 'home road (tiểu thư at home): no thẻ bài, not in the palace'),
 ('jpma.js', r'«Thách đấu»', 'Thách đấu / Cùng chơi (jpma person duel)', False, 'a 1-to-1 match between two people with a stake, not a contest with places'),
 ('j31.js', r'phoenix:\(\)=>', 'Hội Phượng archery try (j31 festival)', False, 'one try for Danh / Sủng (odds roll), no ranking, no first place'),
 ('jexam.js', r'^', 'khảo hạch / exams (jexam)', False, 'pass / fail rank exams, no first place among entrants'),
 ('jrd_thd.js', r'rdDef\("thd_tro",6', 'thd_tro story (scholars\' civil exam, bảng vàng / thi lại)', False, 'the scholars (her father\'s students) place, not a consort'),
 ('jrd_thd.js', r'rdDef\("thd_hoc",7', 'thd_hoc Kỳ khảo hạch các hoàng tự', False, 'the children place, not a consort'),
 ('jrd_bd.js', r'rdDef\("bd_soi",9', 'bd_soi Trận mã cầu chọn ngôi', False, 'a polo match for a foreign throne between princes, she does not place'),
 ('jrd_bd2.js', r'rdDef\("bd_hen",7', 'bd_hen Trận đấu vật', False, 'a wrestling bout of men at the frontier court, she does not place'),
 ('jcui.js', r'bestow\(p,"contest"\)', 'contest prize table (jcui cuAward: the prize by place of the SAME contests above)', False, 'not a contest of its own: pays the places of the j71 contests, whose finish is wired'),
 ('jselx.js', r'^function selxContest', 'Tuyển tú contest (jselx / jselxday: 12 tú nữ, top 4 kept)', False, 'before sắc phong: a tú nữ has no thẻ bài, nights are the yard dormitory (jselxday selxNight); she can be thị tẩm only once she is a consort'),
 ('j67.js', r'tag:"Học trò giỏi của Lưu ma ma"', 'Ngày khảo việc (j67 cung nữ exam, servant road)', False, 'servant road: a cung nữ is never thị tẩm (ctnWin refuses isSrv())'),
 ('j53.js', r'function ktGain', 'khảo thí hoàng tử (j53: her CHILD places)', False, 'the child places, not a consort'),
 ('j54.js', r'function h54GainTxt', 'công chúa dâng nghệ (j54: her DAUGHTER places)', False, 'the child places, not a consort'),
 ('j67.js', r'Con ngươi đứng đầu kỳ khảo', 'con đứng đầu kỳ khảo (j67 story: her child)', False, 'the child places, not a consort'),
]
# M3b lines that are NOT a contest result (each with its reason): mentions, other people's places, family / court ranks
IGNORE = [
 r'đứng đầu (danh sách|sổ|tờ|họ|hàng|tang|phủ|việc|ngõ|huyết thư|bá quan|lớp)',  # lists, family / court ranks, not a contest
 r'Bài thơ đứng đầu của ngươi treo',            # jrd_thd: a later step recalls the round already won (wired there)
 r'(Chọn bài đã đứng đầu|đứng đầu tập|bài đứng đầu đặt)',  # Ngự tuyển anthology steps after the board (no contest)
 r'Ai đứng đầu tập Ngự tuyển',                  # the board is announced (the board ending is wired)
 r'(\{n1\}|\{n2\}|Con ta|con mình|Con ngươi|con đứng đầu|học trò của cha|Không đứng đầu thì mẹ|đứng đầu phải tự học)',  # children / scholars place
 r'Em trai \{v\} thắng hội',                    # bd_san_9: {v}'s brother (a man) wins, no consort night
 r'(Bạn ngươi đứng đầu|Người đứng đầu là tiểu thư)',  # jkc3a home road
 r'(Không đứng đầu, nhưng|chưa đứng đầu)',       # not first
 r'nhà nào đứng đầu',                             # jrd_muoi: merchant guild (hội buôn), her family's trade, not a contest
]
def read(f):
    p = os.path.join(B, f)
    return open(p, encoding='utf-8').read().split('\n') if os.path.exists(p) else []
rows, bad, seen = [], 0, set()
for f, rx, name, want, why in KIND:
    L = read(f); hit = [i for i, l in enumerate(L) if re.search(rx, l)]
    if not hit:
        rows.append((name, f, '-', 'MISSING', want, why)); bad += want; continue
    i = hit[0]; seen.add((f, i))
    # the site's own block: from the hit to the next top-level function / 14 lines, whichever first
    j = i + 1
    while j < len(L) and j < i + 14 and not re.match(r'^(function |const [A-Z0-9_]+=|\(function|/\* -{3,})', L[j]): j += 1
    blk = '\n'.join(L[i:j]); w = 'ctnWin(' in blk
    rows.append((name, f, i + 1, 'yes' if w else 'no', want, why))
    if want and not w: bad += 1
# M1 / M3 sites the table does not know
unk = []
for f in sorted(x for x in os.listdir(B) if re.match(r'^j[a-z0-9_]*\.js$', x)):
    L = read(f)
    for i, l in enumerate(L):
        m1 = re.search(r'bestow\(\s*[\w.]+\s*,\s*"contest"\s*\)', l)
        m3 = re.search(r'(Kỳ thi|Hội thi|kỳ khảo|khảo việc)', l) and re.search(r'đứng đầu', l) and re.search(r'(rt|t):"', l)
        # M3b (rv contest-thitam #1): story / road files: «đứng đầu / thắng hội» beside thi / bảng / khảo / hội / vòng / bắn anywhere on the line
        if not m3 and re.match(r'^(j67|jrd_|jgedata|jkc|jroad)', f) and re.search(r'(đứng đầu|thắng hội)', l) and re.search(r'(thi|bảng|khảo|hội|vòng|bắn)', l):
            m3 = not any(re.search(rx, l) for rx in IGNORE)
        if not (m1 or m3): continue
        near = any(ff == f and abs(ii - i) <= 14 for ff, ii in seen) or any(ff == f and re.search(rx, '\n'.join(L[max(0, i - 14):i + 14])) for ff, rx, *_ in KIND)
        if not near: unk.append((f, i + 1, l.strip()[:120]))
print('| contest kind | file:line | first place ⇒ thị tẩm (ctnWin) | should | why not |')
print('|---|---|---|---|---|')
for name, f, ln, w, want, why in rows:
    print(f'| {name} | {f}:{ln} | {w} | {"yes" if want else "no"} | {why} |')
for f, ln, t in unk: print(f'| UNKNOWN contest site | {f}:{ln} | ? | ? | {t} |')
n_w = sum(1 for r in rows if r[3] == 'yes'); n_should = sum(1 for r in rows if r[4])
print(f'\nSUMMARY: kinds {len(rows)} · should be wired {n_should} · wired {n_w} · missing {bad} · unknown sites {len(unk)}')
sys.exit(1 if bad or unk else 0)
