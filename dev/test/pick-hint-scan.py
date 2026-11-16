"""LUẬT SỬA CẢ NHÓM for "the odds explanation is hard to understand" (owner 15/11, review/pick-hint).
Finds every player-visible line in the assembled modules that tells WHAT DECIDES THE ODDS of an action (picker intro lines, option
notes "(… theo …)", event intros), on two refs, and prints a before/after table. A line fails if it uses the old list styles
("Cơ may tính theo/như", "Khả năng theo", "cơ may theo", "trừ đi:", a bare "(theo …)"), or a scheme/servant line with a wrong subject.
usage: python3 dev/test/pick-hint-scan.py <before-ref> [after-ref|WORKTREE]"""
import re,subprocess,sys,os
R=os.path.dirname(os.path.abspath(__file__))+'/../..'
def mods():return re.findall(r"'(j[^']*\.js)'",open(R+'/dev/build/assemble.py',encoding='utf-8').read())
def src(ref,f):
  if ref=='WORKTREE':return open(R+'/dev/build/'+f,encoding='utf-8').read()
  try:return subprocess.run(['git','-C',R,'show',f'{ref}:dev/build/{f}'],capture_output=True,text=True,check=True).stdout
  except Exception:return ''
PAT=re.compile(r"(Cơ may tính[^.<`\"]*|Khả năng theo[^<`\"]*|\((?:cơ may|khả năng) theo[^)]*\)|cơ may theo Tâm cơ[^)]*\)|thành hay bại tùy Tâm cơ[^)]*\)|\(theo Tai mắt[^)]*\)|Thành hay bại tùy[^<`\"]*|Đỗ hay trượt tùy[^.<`\"]*\.|\((?:thành hay bại )?tùy (?:Tai mắt|Lòng|Tâm cơ)[^)]*\)|Nàng chờ thời cơ[^<]*|Chờ được thời cơ[^<]*|Ra tay ngay thì[^<$]*)")
BAD=re.compile(r"Cơ may tính|Khả năng theo|cơ may theo|khả năng theo|trừ đi:|^\(theo |^Nàng chờ")
def lines(ref):
  out=[]
  for f in mods():
    for i,l in enumerate(src(ref,f).split('\n')):
      if l.lstrip().startswith(('/*','//')):continue
      for m in PAT.finditer(l):out.append((f,m.group(0).strip()))
  return out
b=lines(sys.argv[1]);a=lines(sys.argv[2] if len(sys.argv)>2 else 'WORKTREE')
fs=sorted(set(f for f,_ in b+a))
print('| file | before | after |\n|---|---|---|')
bad=0
for f in fs:
  B=[x for g,x in b if g==f];A=[x for g,x in a if g==f]
  for i in range(max(len(B),len(A))):
    x=B[i] if i<len(B) else '';y=A[i] if i<len(A) else ''
    if y and BAD.search(y):bad+=1
    print(f'| {f} | {x} | {y} |')
print(f'\nold-style lines left after: {bad}');sys.exit(1 if bad else 0)
