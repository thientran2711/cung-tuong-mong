/* LUẬT SỬA CẢ NHÓM scan (review/toilette): every quoted speech “…” in the game text (dev/build/j*.js) that holds more than one sentence,
   run through BOTH text splitters of the kit — kitBulletsHTML (KIT 31.14, result cards) and kpSentences (j79 kit fact rows, event / news
   dialogs) — old (git ref) and new (working tree): how many are cut inside the quotes.   usage: node dev/test/kbl-quote-scan.js [oldRef=HEAD] */
const fs=require('fs'),cp=require('child_process');const ref=process.argv[2]||'HEAD';
const src=(f,r)=>r?cp.execSync(`git show ${r}:dev/build/${f}`).toString():fs.readFileSync('dev/build/'+f,'utf8');
const grabB=s=>{const m=/function kitBulletsHTML[\s\S]*?\n(?=function kitBullets\()/.exec(s);return new Function(m[0]+';return kitBulletsHTML')()};
const grabS=s=>{const p=/const kpPlain=.*\n/.exec(s)[0]+((/const KP_UP=.*\n/.exec(s)||[''])[0])+((/const KP_ENDS=.*\n/.exec(s)||[''])[0]);const m=/function kpSentences[\s\S]*?\n(?=\/\* text segments only)/.exec(s);return new Function(p+m[0]+';return kpSentences')()};
const F={bullets:[grabB(src('jk3.js',ref)),grabB(src('jk3.js'))],rows:[grabS(src('j79.js',ref)),grabS(src('j79.js'))]};
const files=fs.readdirSync('dev/build').filter(f=>/^j.*\.js$/.test(f));const Qs=new Map();
for(const f of files){const s=fs.readFileSync('dev/build/'+f,'utf8');for(const m of s.matchAll(/“([^”"`\n]{6,400})”/g)){if(/[.!?…]\s+[A-ZĐÀ-Ỹ“]/u.test(m[1]))Qs.set('“'+m[1]+'”',f)}}
const bad=t=>{t=t.replace(/<[^>]+>/g,'');return (t.match(/“/g)||[]).length!==(t.match(/”/g)||[]).length};
const cutB=(fn,q)=>{const r=fn(`Ta đến thỉnh an, người nói: ${q} Ta cúi đầu lui ra cho phải phép.`);return !!r&&[...r.matchAll(/<li>([\s\S]*?)<\/li>/g)].some(x=>bad(x[1]))};
const cutS=(fn,q)=>fn(`Ta đến thỉnh an. ${q} Ta cúi đầu lui ra.`).some(bad);
const out={quotesMultiSentence:Qs.size};const ex=[];
for(const [k,[o,n]] of Object.entries(F)){const cut=k==='bullets'?cutB:cutS;let a=0,b=0;for(const [q,f] of Qs){if(cut(o,q))a++;if(cut(n,q)){b++;ex.push([k,f,q.slice(0,60)])}}out[k]={before:a,after:b}}
out.stillCut=ex.slice(0,10);console.log(JSON.stringify(out));
