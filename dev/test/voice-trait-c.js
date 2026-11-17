/* VOICE BY TÍNH TÌNH — W-C (quests, j72): the asker's lead-in + her reaction at the end of a quest take HER tone.
   usage: node dev/test/voice-trait-c.js   (serves dev/index.html; run python3 dev/build/assemble.py first) */
const {chromium}=require('playwright');const http=require('http');const fs=require('fs');const path=require('path');
const ROOT=path.join(__dirname,'..');
function serve(){return new Promise(r=>{const s=http.createServer((q,a)=>{const f=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){a.writeHead(404);a.end();return}a.setHeader('Content-Type',/\.html$/.test(f)?'text/html; charset=utf-8':/\.js$/.test(f)?'text/javascript':'application/octet-stream');a.end(d)})});s.listen(0,'127.0.0.1',()=>r(s))})}
(async()=>{const srv=await serve();const url=`http://127.0.0.1:${srv.address().port}/index.html`;
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.__bot={pre:1}});await p.goto(url);await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(800);
 const R=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start();
  const fail=[],out=[];const T=(n,g,w)=>{out.push(n+" = "+g);if(w!=null&&g!==w)fail.push(`${n}: got ${g} want ${w}`)};
  const TONES=["Ân cần","Lạnh lùng","Nóng nảy","Điềm tĩnh","Nhiều chuyện","Kín đáo","Kiêu ngạo","Khiêm nhường"];
  const P=TONE_POOL;for(const k of ["askLead","askOk","askNo"]){if(!P[k]){fail.push("missing pool "+k);continue}}
  const v=rivals.find(x=>!x.queen&&x.alive);const X={A:{k:"rv",o:v,n:v.name}};const txt="“{Goi} giúp {xung} với.”";
  const lead={},ok={},no={};
  for(const t of TONES){v.net=[t,v.net[1],v.net[2]];S.vmem={};
   const full=q72Lead(X,txt);lead[t]=full;const l=full.slice(v.name.length+1,full.length-txt.length-1);if(!P.askLead[t].includes(l))fail.push("lead not from own pool: "+t+" → "+full);
   const o=q72Tone(X,"askOk","q72:ok"),n=q72Tone(X,"askNo","q72:no");if(!P.askOk[t].includes(o))fail.push("ok not from own pool: "+t);if(!P.askNo[t].includes(n))fail.push("no not from own pool: "+t);ok[t]=o;no[t]=n;
   T("lead / "+t,full);T("ok / "+t,v.name+" "+o);T("no / "+t,v.name+" "+n)}
  T("8 leads distinct",new Set(Object.values(lead)).size,8);T("8 ok distinct",new Set(Object.values(ok)).size,8);T("8 no distinct",new Set(Object.values(no)).size,8);
  /* not for emp / th / a non-quote h / unnamed kinds */
  /* event beats (j67): the speaker's waiting sentence in HER tone (maid path; the hh / v paths share the same code) */
  if(!S.maid)fail.push("no S.maid to test beat wait");else{const mw={};for(const t of TONES){S.maid.net=[t,S.maid.net?S.maid.net[1]:"Thật thà",S.maid.net?S.maid.net[2]:"Chăm chỉ"];S.vmem={};const w=wait67({w:"maid"},{});mw[t]=w;T("beat wait maid / "+t,w);
    if(!P.beatWait[t].some(l=>w.includes(l)))fail.push("beat wait not from own pool: "+t)}T("8 beat waits distinct",new Set(Object.values(mw)).size,8)}
  T("beat wait for a speaker with no name (dad)",wait67({w:"dad"},{}),"");
  T("emp ask untouched",q72Lead({A:{k:"emp",o:null,n:"Hoàng thượng"}},txt),txt);T("plain h untouched",q72Lead(X,"Việc này khó."),"Việc này khó.");
  /* noRepeat: a tone pool of 10, one draw per tuần */
  v.net=["Ân cần",v.net[1],v.net[2]];S.vmem={};const W=BAL.voice.noRepeat,seq=[];for(let i=0;i<40;i++){S.tuan=i%3;S.turn=Math.floor(i/3);S.buoi=0;seq.push(q72Tone(X,"askLead","q72:ask"))}
  let rep=0;for(let i=0;i<seq.length;i++)for(let j=Math.max(0,i-W+1);j<i;j++)if(seq[j]===seq[i])rep++;T(`noRepeat: repeats inside ${W} tuần / 40 draws`,rep,0);
  /* old save: no S.vmem, no S.tuan memory; a servant requester (rsv) speaks */
  delete S.vmem;T("old save speaks",!!q72Tone(X,"askLead","q72:ask"),true);
  /* a REAL offer: dialog text of the quest offer carries the lead */
  let real="";try{const vv=rivals.find(x=>!x.queen&&x.alive);vv.tai=30;vv.net=["Kiêu ngạo",vv.net[1],vv.net[2]];S.vmem={};const Tq=T72I["rv_tho"];const A=q72A("rv",vv.id);const x=q72Make(Tq,A,null);if(x){const d=mkP("q72o",{x,how:""});real=d&&d.t||"NO DIALOG"}else real="NO QUEST"}catch(e){real="ERR "+e.message}
  if(!/Kiêu ngạo|ngẩng cằm|phe phẩy|liếc|ban ơn|ra lệnh|cân nhắc|vuốt lại|kiêu kỳ|nhếch|nói như/.test(real)||!real.includes("“"))fail.push("real offer has no tone lead: "+real.slice(0,200));
  T("real offer html (rv_tho)",real.slice(0,300).replace(/\s+/g," "));
  return{out,fail}});
 console.log(R.out.join('\n'));console.log(R.fail.length?'FAIL\n'+R.fail.join('\n'):'PASS',errs.length?'pageerrors: '+errs.slice(0,3).join(' | '):'no page errors');
 await b.close();srv.close();process.exit(R.fail.length||errs.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
