/* self-word scan (E39r follow-up to story-voice; VANPHONG §2 one address core): HER own words to a peer consort in the story roads must come from
   the tokens {tx}/{Tx} (her self word) and {tg}/{Tg} (what she calls the peer), never a hand-typed «muội / tỷ / thiếp / bổn cung / tần thiếp».
   Static: option labels (n:) and her quoted lines («Ngươi …: “…”»). Lines to a brother / cousin (huynh, biểu ca, {pa}) or the noun «tỷ muội» are kin words, kept.
   Runtime: fill67 of every {tx}/{tg} line with the peer above / equal / below her rank gives the kAddr word for that pair.
   usage: node dev/test/self-word/scan.js [--static] [url] */
const fs=require('fs'),path=require('path');const D=path.join(__dirname,'../../build/');
const FILES=fs.readdirSync(D).filter(f=>/^(jrd_\w+|j67|jend14|j72)\.js$/.test(f));
const SELF=/(?<![\p{L}])(muội|Muội|tỷ|Tỷ|thiếp|Thiếp|bổn cung|Bổn cung|tần thiếp)(?![\p{L}])/u;
const KIN=/huynh|biểu ca|\{pa\}|tỷ muội|thần thiếp|Thần thiếp|Hoàng thượng|bệ hạ|Thái hậu|Hoàng hậu|mẫu hậu/;
/* reviewed kin / fellow-maid lines (she speaks to a cousin, a brother, a fellow maid — kin words, not rank words) */
const KEEP=new Set(['Hồi thư: muội sẽ thưa giúp','Đỡ {v} dậy, gọi một tiếng tỷ','Ở lại cùng tỷ','Tùy muội','Muội ở đây là để hai nước khỏi phải xa nhau.']);
let hits=[],tok=0;
for(const f of FILES){const s=fs.readFileSync(D+f,'utf8');
 for(const m of s.matchAll(/\{n:"([^"]*)"/g)){const n=m[1];if(/\{(?:[Tt][xg]|tsv)\}/.test(n))tok++;else if(KEEP.has(n))continue;else if(SELF.test(n)&&!KIN.test(n)&&!/\{(?:v|mis)\} (?:nói|đáp|hỏi)/.test(n))hits.push(f+': n: '+n)}
 for(const m of s.matchAll(/Ngươi [^“"`]{0,40}“([^”]*)”/g)){const q=m[1];if(/\{(?:[Tt][xg]|tsv)\}/.test(q))tok++;else if(KEEP.has(q))continue;else if(SELF.test(q)&&!KIN.test(q))hits.push(f+': her: '+q)}}
console.log(`tokens ${tok} · hand-typed her self/peer words ${hits.length}`);for(const h of hits)console.log('  '+h);
if(process.argv.includes('--static')){process.exit(hits.length?1:0)}
const {chromium}=require('playwright');
(async()=>{const a=process.argv.slice(2).filter(x=>!/^--/.test(x));const url=a[0]||'file://'+path.join(__dirname,'../../index.html');const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(url);await p.waitForFunction(()=>typeof start==='function'&&typeof fill67==='function'&&TOK67.tx,null,{timeout:120000});await p.waitForTimeout(800);
 const r=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start();const out=[];
  const v=liveRivals(true).find(x=>!x.queen&&x.alive);if(!v)return{err:'no rival'};const A={act:{v:rivals.indexOf(v)}};
  const id=Object.keys(ARC67)[0];let T;try{T=newThread67(id,'x')}catch(e){T={}}Object.assign(T,{act:{v:RV.length?null:null}});
  const real=rv67;window.rv67=(X,k)=>k==='v'?v:null;
  for(const [lab,me,them] of [['she lower',1,4],['equal',3,3],['she higher',5,2],['she Hoàng hậu',7,3]]){S.rank=me;v.rank=them;
   out.push([lab,fill67('Gửi {v} lời: {tx} không tranh · lời ấy từ cung {tg} ra',T),kAddr(S,v).xung,kAddr(S,v).goi])}
  window.rv67=real;return{out}});
 console.log(JSON.stringify(r,null,0));let bad=r.err?1:0;for(const x of r.out||[]){if(/\{[Tt][xg]\}/.test(x[1])||x[1].indexOf(x[2]+' không tranh')<0||x[1].indexOf('cung '+x[3]+' ra')<0)bad++}
 const sh=(r.out||[]).find(x=>x[0]==='she higher');if(sh&&/muội không tranh/.test(sh[1])&&sh[2]!=='muội')bad++;
 console.log(hits.length||bad||errs.length?'FAIL':'PASS',errs.slice(0,2));await b.close();process.exit(hits.length||bad||errs.length?1:0)})();
