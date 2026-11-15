/* LUẬT SỬA CẢ NHÓM scan (review/toilette): every quoted speech “…” in the game text (dev/build/j*.js) that holds more than one sentence,
   run through kitBulletsHTML (KIT 31.14) old (git ref) and new (working tree): how many are cut into separate bullets inside the quotes.
   usage: node dev/test/kbl-quote-scan.js [oldRef=HEAD] */
const fs=require('fs'),cp=require('child_process');const ref=process.argv[2]||'HEAD';
const grab=src=>{const m=/function kitBulletsHTML[\s\S]*?\n(?=function kitBullets\()/.exec(src);return new Function(m[0]+';return kitBulletsHTML')()};
const NEW=grab(fs.readFileSync('dev/build/jk3.js','utf8')),OLD=grab(cp.execSync(`git show ${ref}:dev/build/jk3.js`).toString());
const files=fs.readdirSync('dev/build').filter(f=>/^j.*\.js$/.test(f));const Qs=new Map();
for(const f of files){const s=fs.readFileSync('dev/build/'+f,'utf8');for(const m of s.matchAll(/“([^”"`\n]{6,400})”/g)){if(/[.!?…]\s+[A-ZĐÀ-Ỹ“]/u.test(m[1]))Qs.set('“'+m[1]+'”',f)}}
const cut=(fn,q)=>{const h=`Ta đến thỉnh an, người nói: ${q} Ta cúi đầu lui ra cho phải phép.`;const r=fn(h);if(!r)return false;
 return [...r.matchAll(/<li>([\s\S]*?)<\/li>/g)].some(x=>{const t=x[1].replace(/<[^>]+>/g,'');return (t.match(/“/g)||[]).length!==(t.match(/”/g)||[]).length})};
let o=0,n=0;const ex=[];for(const [q,f] of Qs){const a=cut(OLD,q),b=cut(NEW,q);if(a)o++;if(b){n++;ex.push([f,q.slice(0,80)])}}
console.log(JSON.stringify({quotesMultiSentence:Qs.size,cutBefore:o,cutAfter:n,stillCut:ex.slice(0,10)}));
