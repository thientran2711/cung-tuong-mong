# ONE CORE odds word (owner 17/11 17:00Z / 17:35Z; KIT.md: a decision shows NO ladder word; a real chance gets its word only from
# word() / oddsOf / capW). Lists every ladder word TYPED into a player text (every rung: Liều, Khó, Năm phần, Khá chắc, Chắc,
# Nắm chắc, Nắm chắc) as a hint segment: at the start of a string or right after " · ". Regex sources, comments and help prose
# (the ladder explained as a list) are skipped.
# usage: python3 dev/tools/typed-ladder-scan.py [git-ref]   -> count + file:line list
import re,subprocess,sys,glob,os
ref=next((a for a in sys.argv[1:] if not a.startswith('-')),None)
def files():
  if ref:
    L=subprocess.run(['git','ls-tree','--name-only',ref,'dev/build/'],capture_output=True,text=True).stdout.split()
    for f in L:
      if f.endswith('.js') and not f.endswith('all.js'):yield f,subprocess.run(['git','show',f'{ref}:{f}'],capture_output=True,text=True).stdout
  else:
    for f in sorted(glob.glob('dev/build/*.js')):
      if not f.endswith('all.js'):yield f,open(f,encoding='utf-8').read()
W=r'(?:Nắm chắc|Khá chắc|Năm phần|Bấp bênh|Chắc|Khó|Liều|Năm ăn năm thua|Ngang ngửa|Rất chắc|Hơi khó)'
# a hint segment: string opener (" ` ') or "· " then the word, then " ·", end of string, or "${"
SEG=re.compile(r'(?:(?<=["`\'])|(?<=· ))'+W+r'(?=\s*·|["`\']|\$\{|\s*$)')
SKIP_LINE=re.compile(r'^\s*(/\*|\*|//)')
HELP=re.compile(r'Liều,\s*Khó|Liều\s*<|Liều / Khó|Liều … Nắm chắc|Liều…Nắm chắc')
out=[]
for f,t in files():
  for i,l in enumerate(t.split('\n'),1):
    if SKIP_LINE.match(l):continue
    for m in SEG.finditer(l):
      a=l[max(0,m.start()-1):m.start()]
      pre=l[max(0,m.start()-60):m.start()]
      if re.search(r'/\(\?:?[^/]*$|match\(/|test\(|RegExp|\[\s*$',pre[-25:]) or re.search(r'\|\s*$',pre) :continue  # inside a regex / alternation
      if HELP.search(l[max(0,m.start()-40):m.end()+40]):continue
      if re.search(r'\]\s*\.indexOf|KIT_ODDS|ODDS\s*=',pre):continue
      out.append((os.path.basename(f),i,m.group(0),l[max(0,m.start()-50):m.end()+70].replace('\n',' ')))
print(f'typed ladder words in hint segments: {len(out)}')
for f,i,w,c in out:print(f'{f}:{i}  [{w}]  …{c}…')
