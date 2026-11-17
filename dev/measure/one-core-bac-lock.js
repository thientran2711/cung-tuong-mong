/* review/one-core-jkc-2 — the «thiếu bạc (cần N)» price-lock family scan (ONE CORE OD:L1267, LUẬT SỬA CẢ NHÓM).
   Lists, game-wide (dev/build/j*.js minus BAL tables / kit sample pages):
     cmp  = a typed bạc compare  x.bac<N / x.bac>=N, N>0 (a lock / an affordability check; a sign test <0 is not a price)
     lock = a typed price in a lock word  «cần N bạc» «thiếu bạc (cần N)» «cần Bạc N» «Bạc N (có …)»
   usage: node dev/measure/one-core-bac-lock.js [git-ref]   (no ref = working tree) */
const fs=require('fs'),cp=require('child_process'),path=require('path');
const ref=process.argv[2];const dir=path.join(__dirname,'..','build');
const SKIP=/^(jbal|jbal2|jbalarc|jkitpage|jksize)\.js$/;
const files=ref?cp.execSync(`git ls-tree --name-only ${ref} ./`,{cwd:dir}).toString().trim().split('\n'):fs.readdirSync(dir);
const rd=f=>ref?cp.execSync(`git show ${ref}:./${f}`,{cwd:dir,maxBuffer:1<<28}).toString():fs.readFileSync(path.join(dir,f),'utf8');
const PAT={cmp:/[\w$.)\]]*\.bac\s*(?:<=|>=|<|>)\s*[1-9]\d*/g,lock:/(?:cần \d+ bạc|thiếu bạc[^"`\d]{0,6}cần \d+|cần Bạc \d+|Bạc \d+ \(có)/g};
const out={cmp:[],lock:[]};
for(const f of files.filter(f=>/^j.*\.js$/.test(f)&&!SKIP.test(f)).sort()){const L=rd(f).split('\n');
 L.forEach((s,i)=>{for(const k in PAT)for(const m of s.matchAll(PAT[k]))out[k].push(`${f}:${i+1}\t${m[0]}`)})}
for(const k in out)out[k].forEach(x=>console.log(k+'\t'+x));
console.log(JSON.stringify({ref:ref||'tree',cmp:out.cmp.length,lock:out.lock.length}));
