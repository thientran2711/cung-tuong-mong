"""regscan (review/story-frame): find LOAD-TIME loops over a registry that a LATER module extends.
Builds an instrumented copy of the game (module markers + Object.keys/values/entries hook while the script loads),
then (regscan.js) lists every load-time iteration whose object gained keys after that iteration ran.
Usage: python3 dev/measure/regscan.py <outdir>  ->  <outdir>/regscan.html ; node dev/measure/regscan.js <outdir>/regscan.html"""
import re,sys,os
d=os.path.dirname(os.path.abspath(__file__))+'/../'
out=sys.argv[1];os.makedirs(out,exist_ok=True)
src=open(d+'build/assemble.py',encoding='utf-8').read()
mods=eval(re.search(r"for f in (\[.*?\])\)",src).group(1))+['jcoopthin.js']
hook=r'''window.__RS=[];window.__RSon=1;(function(){const K=Object.keys,V=Object.values,E=Object.entries;
function rec(o,how){try{if(window.__RSon&&o&&typeof o==="object"){const st=(new Error().stack||"").split("\n")[3]||"";window.__RSon=0;try{window.__RS.push({mod:window.__mod,o,keys:K(o),how,st:st.trim()})}finally{window.__RSon=1}}}catch(e){}}
const AP=Array.prototype,AM={};for(const m of ["forEach","map","filter","some","every","reduce","find","findIndex","flatMap"]){const f=AP[m];AM[m]=f;AP[m]=function(){rec(this,m);return f.apply(this,arguments)}}
const IT=AP[Symbol.iterator];AP[Symbol.iterator]=function(){rec(this,"for-of");return IT.call(this)};
Object.keys=function(o){rec(o,"keys");return K(o)};Object.values=function(o){rec(o,"values");return V(o)};Object.entries=function(o){rec(o,"entries");return E(o)};
window.__rsIn=function(o,loc){if(window.__RSon&&o&&typeof o==="object"){window.__RSon=0;try{window.__RS.push({mod:window.__mod,o,keys:K(o),how:"for-in",st:loc})}finally{window.__RSon=1}}return o};
window.__RSoff=function(){window.__RSon=0;for(const m in AM)AP[m]=AM[m];AP[Symbol.iterator]=IT;Object.keys=K;Object.values=V;Object.entries=E}})();
'''
parts=[hook]
for f in mods:
  t=open(d+'build/'+f,encoding='utf-8').read()
  t=re.sub(r'for\s*\(\s*(const|let|var)\s+(\w+)\s+in\s+([A-Za-z_$][\w$]*)\s*\)',lambda m:'for(%s %s in __rsIn(%s,"%s:%d"))'%(m.group(1),m.group(2),m.group(3),f,t.count('\n',0,m.start())+1),t)
  parts.append(';window.__mod=%r;\n'%f+t)
parts.append(';window.__mod="(end)";try{regSweep()}catch(e){};window.__RSoff();\n')
js=open(d+'site/kvfallback.js',encoding='utf-8').read()+'\n'+'\n'.join(parts)
p1=open(d+'build/p1.html',encoding='utf-8').read().rstrip();assert p1.endswith('<script>');p1=p1[:-8]
av=open(d+'build/avatars.js',encoding='utf-8').read()
open(out+'/regscan.html','w',encoding='utf-8').write(p1+'<script>\n'+av+'\n</script>\n<script>\n'+js+'\nwindow.__ctmBuilt=1;\n</script>\n')
# names of every top-level const/let/var/function-free object a module declares, for naming the iterated objects
names=set()
for f in mods:
  for m in re.finditer(r'^(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=',open(d+'build/'+f,encoding='utf-8').read(),re.M):names.add(m.group(1))
open(out+'/regscan-names.txt','w').write('\n'.join(sorted(names)))
print('ok',len(mods),'modules',len(names),'names')
