/* palace-voice core test: kAddr over speaker × listener × rank × mood (VANPHONG §2), kLine no-repeat window, toilSay pools.
   usage: node dev/test/voice-core.js [url]  (default: dev/index.html via a local server) */
const {chromium}=require('playwright');const http=require('http');const fs=require('fs');const path=require('path');
const ROOT=path.join(__dirname,'..');
function serve(){return new Promise(r=>{const s=http.createServer((q,a)=>{const f=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){a.writeHead(404);a.end();return}a.setHeader('Content-Type',/\.html$/.test(f)?'text/html; charset=utf-8':/\.js$/.test(f)?'text/javascript; charset=utf-8':'application/octet-stream');a.end(d)})});s.listen(0,'127.0.0.1',()=>r(s))})}
(async()=>{const srv=await serve();const url=process.argv[2]||`http://127.0.0.1:${srv.address().port}/index.html`;
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.__bot={pre:1}});
 await p.goto(url);await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(800);
 const R=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start();
  const out=[],fail=[];const T=(name,got,want)=>{out.push([name,got]);if(want!=null&&got!==want)fail.push(`${name}: got "${got}" want "${want}"`)};
  const v=rivals.find(x=>!x.queen&&x.alive);const q=rivals.find(x=>x.queen);
  for(const r of [0,2,3,5]){S.rank=r;S.sung=10;S.th=0;S.hh=0;
   T(`srv→S r${r}`,kAddr({srv:"f"},S).goi,r>=3?"nương nương":"tiểu chủ");T(`srv→S close r${r}`,kAddr({srv:"f"},S,{close:1}).goi,"chủ tử");
   T(`eun self`,kAddr({srv:"m"},S).xung,"nô tài");T(`S→emp r${r}`,kAddr(S,"emp").xung,"thần thiếp");
   T(`S→srv r${r}`,kAddr(S,{srv:"f",name:"Tiểu Thúy"}).xung,r>=3?"bổn cung":"ta")}
  /* owner 16/11 ~21:05Z: Hoàng thượng calls her only "nàng" (Sủng < BAL.voice.aiPhi) or "ái phi" (Sủng >= BAL.voice.aiPhi), whatever the mood */
  S.rank=1;S.sung=BAL.voice.aiPhi;T('emp→S high Sủng',kAddr("emp",S).goi,"ái phi");S.sung=BAL.voice.aiPhi-1;T('emp→S low Sủng',kAddr("emp",S).goi,"nàng");
  T('emp→S low Sủng, angry',kAddr("emp",S,{m:"cold"}).goi,"nàng");S.sung=BAL.voice.aiPhi+10;T('emp→S high Sủng, angry',kAddr("emp",S,{m:"cold"}).goi,"ái phi");S.rank=7;T('emp→S as Hoàng hậu',kAddr("emp",S).goi,"ái phi");S.rank=1;S.sung=10;T('emp self',kAddr("emp",S).xung,"trẫm");
  S.th=60;T('th→S warm',kAddr("th",S).goi,"con");S.th=-60;T('th→S cold',kAddr("th",S).goi,"ngươi");T('th self',kAddr("th",S).xung,"ai gia");
  T('hh→S warm',kAddr("hh",S,{m:"warm"}).goi,"muội muội");T('hh self',kAddr("hh",S).xung,"bổn cung");T('S→hh',kAddr(S,"hh").goi,"Hoàng hậu nương nương");
  T('emp→th',kAddr("emp","th").goi,"mẫu hậu");
  if(v){S.rank=0;const vr=v.rank;v.rank=4;T('S(Đáp ứng)→Phi self',kAddr(S,v,{m:"cool"}).xung,"tần thiếp");T('S→Phi goi',kAddr(S,v,{m:"cool"}).goi,kAddr(S,v).ten+" nương nương");
   T('Phi→S self',kAddr(v,S,{m:"cool"}).xung,"bổn cung");T('Phi→S goi',kAddr(v,S,{m:"cool"}).goi,"muội muội");
   v.rank=1;S.rank=1;T('equal warm self',["tỷ","muội"].includes(kAddr(v,S,{m:"warm"}).xung)?"ok":"bad","ok");
   T('srv→other consort',kAddr({srv:"f"},v,{own:false,full:1}).goi,kAddr({srv:"f"},v).ten+" tiểu chủ");v.rank=vr}
  T('kSay',kSay("th",S,"“{Goi} lui đi, {xung} mệt rồi.”",{m:"cool"}),null);
  /* kLine: a 4-line pool never repeats inside the window */
  const P=["a","b","c","d"];const seen=[];const t0=S.tuan,turn0=S.turn;for(let i=0;i<4;i++){S.buoi=i%4;seen.push(kLine("test:x",P))}
  T('kLine same buổi = same line (a rebuilt dialog keeps its line)',kLine("test:x",P),seen[3]);
  T('kLine 4 distinct',new Set(seen).size,4);
  /* toilSay: praise pool across 6 tuần → 6 distinct */
  const said=[];for(let i=0;i<6;i++){S.tuan=(S.tuan+1)%3;if(S.tuan===0)S.turn++;said.push(toilSay("th-praise",{mk:"vua",dress:"doan",host:"th"}))}
  /* no line twice inside any BAL.voice.noRepeat window (the 6th may equal the 1st: gap = window) */
  const W=BAL.voice.noRepeat;let okW=true;for(let i=0;i+W<=said.length;i++)if(new Set(said.slice(i,i+W)).size!==W)okW=false;T(`th-praise: no repeat inside ${W} tuần`,okW,true);
  return{out,fail,said}});
 console.log(R.out.map(x=>x.join(' = ')).join('\n'));console.log('--- th-praise over 6 tuần:\n'+R.said.join('\n'));
 console.log(R.fail.length?'FAIL\n'+R.fail.join('\n'):'PASS',errs.length?'pageerrors: '+errs.slice(0,3).join(' | '):'no page errors');
 await b.close();srv.close();process.exit(R.fail.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
