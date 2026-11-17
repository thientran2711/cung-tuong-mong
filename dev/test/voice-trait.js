/* VOICE BY TÍNH TÌNH unit test (owner 17/11 06:05Z, review/voice-trait): same situation, 8 tính tình → 8 distinct tones (>=10 lines each, no line shared by two tones);
   noRepeat inside BAL.voice.noRepeat tuần; old save (no S.vmem / nameless speaker) still speaks; Emperor / Thái hậu / male nết mapped; person narration uses her tone.
   usage: node dev/test/voice-trait.js [url]  (default dev/index.html via a local server) */
const {chromium}=require('playwright');const http=require('http');const fs=require('fs');const path=require('path');
const ROOT=path.join(__dirname,'..');
function serve(){return new Promise(r=>{const s=http.createServer((q,a)=>{const f=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){a.writeHead(404);a.end();return}a.setHeader('Content-Type',/\.html$/.test(f)?'text/html; charset=utf-8':/\.js$/.test(f)?'text/javascript; charset=utf-8':'application/octet-stream');a.end(d)})});s.listen(0,'127.0.0.1',()=>r(s))})}
(async()=>{const srv=await serve();const url=process.argv[2]||`http://127.0.0.1:${srv.address().port}/index.html`;
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.__bot={pre:1}});await p.goto(url);await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(800);
 const R=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start();
  const fail=[],out=[];const T=(n,g,w)=>{out.push(n+" = "+g);if(w!=null&&g!==w)fail.push(`${n}: got ${g} want ${w}`)};
  const TONES=["Ân cần","Lạnh lùng","Nóng nảy","Điềm tĩnh","Nhiều chuyện","Kín đáo","Kiêu ngạo","Khiêm nhường"];
  const P=TONE_POOL,all={};const REQ={thOk:["Ân cần","Kín đáo","Kiêu ngạo","Điềm tĩnh"],empOk:["Nóng nảy","Lạnh lùng","Kín đáo","Ân cần","Điềm tĩnh"]};REQ.thNo=REQ.thOk;REQ.empNo=REQ.empOk;/* th: BAL.voice.tone.th, emp: BAL.voice.tone.emp (the tones those two can have); every other pool needs all 8 */
  for(const k in P){const seen=new Set();for(const t of (REQ[k]||TONES)){const L=P[k][t]||[];if(L.length<10)fail.push(`${k}/${t}: only ${L.length} lines`);if(new Set(L).size!==L.length)fail.push(`${k}/${t}: duplicate line inside the tone`);
    for(const x of L){if(seen.has(x))fail.push(`${k}: line shared by two tones: ${x}`);seen.add(x);if(/%|\d/.test(x))fail.push(`${k}/${t}: typed number/% in: ${x}`)}}all[k]=[...seen].length}
  /* same situation, 8 tones → 8 distinct lines (each speaker is a rival whose first nết is forced) */
  const v=rivals.find(x=>!x.queen&&x.alive);const first=v.net[0];
  const said={};for(const t of TONES){v.net=[t,v.net[1],v.net[2]];S.vmem={};const line=kOutcome("rival",true,{kind:"rival",ref:v});said[t]=line;T("rival ok / "+t,line)}
  T("8 tones → 8 distinct lines",new Set(Object.values(said)).size,8);
  for(const t of TONES)if(!P.rivalOk[t].includes(said[t]))fail.push(`rival ok / ${t}: line not from its own pool`);
  /* hosts: Thái hậu / Hoàng thượng / Hoàng hậu speak in their own tone, address tokens filled */
  S.thTrait="Kiêu ngạo";S.vmem={};T("th ok (Kiêu ngạo)",kOutcome("th",true,{kind:"th"}),null);
  {const L=[];for(let i=0;i<12;i++){S.tuan=i%3;S.turn=Math.floor(i/3);L.push(kOutcome("th",false,{kind:"th"}))}if(L.some(x=>/\{/.test(x)))fail.push("th: unfilled token");if(new Set(L).size<8)fail.push("th no: too few distinct over 12 tuần: "+new Set(L).size)}
  S.emp.traits=["nongnay"];S.vmem={};{const l=kOutcome("emp",false,{kind:"emp"});if(/\{/.test(l)||!/Hoàng thượng/.test(l))fail.push("emp line: "+l);T("emp no (nongnay)",l)}
  S.emp.traits=["lanhlung"];S.vmem={};T("emp ok (lanhlung)",kOutcome("emp",true,{kind:"emp"}),null);
  {const q=rivals.find(x=>x.queen);if(q){q.net=["Nóng nảy",q.net[1],q.net[2]];S.vmem={};T("hh no (Nóng nảy)",kOutcome("hh",false,{kind:"hh",ref:q}),null)}}
  /* kTone */
  v.net=["Nóng nảy",v.net[1],v.net[2]];T("kTone rival",kTone(v),"Nóng nảy");
  S.emp.traits=["nongnay"];T("kTone emp nongnay",kTone("emp"),"Nóng nảy");S.emp.traits=["lanhlung"];T("kTone emp lanhlung",kTone("emp"),"Lạnh lùng");
  S.thTrait="Kín đáo";T("kTone th",kTone("th"),"Kín đáo");
  T("kTone nameless servant",kTone({srv:"f"}),null);T("kTone null",kTone(null),null);
  {const m={name:"Trần Văn Khải",sex:"m",net:["Cương trực","Thật thà","Tham vọng"]};T("kTone male nết alias (Cương trực)",kTone(m),"Nóng nảy");m.net=["Xu nịnh","Thật thà","Tham vọng"];T("kTone male nết alias (Xu nịnh)",kTone(m),"Khiêm nhường")}
  /* nameless speaker still speaks (default tone), old save: no S.vmem */
  delete S.vmem;T("nameless servant speaks",!!kLine("t:nameless",P.maidOk,{sp:{srv:"f"},ls:S}),true);T("old save (no S.vmem) speaks",!!kLine("t:old",P.rivalNo,{about:v}),true);
  /* noRepeat: a 10-line tone pool, one draw per tuần → no line again inside BAL.voice.noRepeat tuần */
  v.net=["Ân cần",v.net[1],v.net[2]];S.vmem={};const W=BAL.voice.noRepeat,seq=[];
  for(let i=0;i<40;i++){S.tuan=i%3;S.turn=Math.floor(i/3);S.buoi=0;seq.push(kLine("t:rep",P.rivalOk,{about:v}))}
  let rep=0;for(let i=0;i<seq.length;i++)for(let j=Math.max(0,i-W+1);j<i;j++)if(seq[j]===seq[i])rep++;T(`noRepeat: repeats inside ${W} tuần over 40 draws`,rep,0);
  /* greet narration carries the tone */
  for(const t of ["Ân cần","Lạnh lùng","Nóng nảy"]){v.net=[t,v.net[1],v.net[2]];S.vmem={};const l=kLine("greet:come",P.greetCome,{about:v});if(!P.greetCome[t].includes(l))fail.push("greet "+t);T("greet / "+t,l)}
  return{out,fail,all}});
 console.log(R.out.join('\n'));console.log('pool sizes (distinct lines):',JSON.stringify(R.all));
 console.log(R.fail.length?'FAIL\n'+R.fail.join('\n'):'PASS',errs.length?'pageerrors: '+errs.slice(0,3).join(' | '):'no page errors');
 await b.close();srv.close();process.exit(R.fail.length||errs.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
