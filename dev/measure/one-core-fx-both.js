/* review/one-core-jkc-2 item 2 — amounts typed in BOTH a player text and its rule (the guard's fx kind, the text half of it):
   on one source line, each text «<Stat> ±N» (Danh -5, Đức +3 …) and a typed code amount of the same stat and value ({danh:-5}, apply({duc:3}), S.duc+=3).
   usage: node dev/measure/one-core-fx-both.js [git-ref] [--list]   (no ref = working tree) */
const fs=require('fs'),cp=require('child_process'),path=require('path');
const args=process.argv.slice(2),LIST=args.includes('--list'),ref=args.find(a=>!a.startsWith('--'));const dir=path.join(__dirname,'..','build');
const SKIP=/^(jbal|jbal2|jbalarc|jkitpage|jksize)\.js$/;
const files=ref?cp.execSync(`git ls-tree --name-only ${ref} ./`,{cwd:dir}).toString().trim().split('\n'):fs.readdirSync(dir);
const rd=f=>ref?cp.execSync(`git show ${ref}:./${f}`,{cwd:dir,maxBuffer:1<<28}).toString():fs.readFileSync(path.join(dir,f),'utf8');
const W={'Sủng':'sung','Danh':'danh','Đức':'duc','Bạc':'bac','Sức':'suc','Thái hậu':'th','Tâm cơ':'tamco','Tai mắt':'mat','Ân tình':'an','Tài':'tai','Sắc':'sac','Chủ tin':'tin'};
const TX=new RegExp('('+Object.keys(W).join('|')+')\\s*([+−-])\\s*(\\d+)(?!\\d|\\.\\d)','g');
let n=0;const per={};
for(const f of files.filter(f=>/^j.*\.js$/.test(f)&&!SKIP.test(f)).sort()){const L=rd(f).split('\n');
 L.forEach((s,i)=>{const seen=new Set();for(const m of s.matchAll(TX)){const st=W[m[1]],v=(m[2]==='+'?'':'-')+m[3];
   const code=new RegExp('(?<![\\w$.])'+st+'\\s*:\\s*'+(v.startsWith('-')?'-':'\\+?')+v.replace('-','')+'(?![\\d.])|\\bS\\.'+st+'\\s*'+(v.startsWith('-')?'-':'\\+')+'=\\s*'+v.replace('-','')+'(?![\\d.])');
   if(code.test(s)){n++;per[f]=(per[f]||0)+1;if(LIST)console.log(`${f}:${i+1}\t${m[1]} ${v}\t${st}:${v}`)}}})}
console.log(JSON.stringify({ref:ref||'tree',pairs:n,per}));
