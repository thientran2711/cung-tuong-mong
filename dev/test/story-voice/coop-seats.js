/* story-voice CO-OP BOTH-SEAT check (CO-OP LAND GATE OD:L594, law 1; reviewer E39r): two real browsers in one room (live Worker).
   Each seat builds its story dialog on its own client from its own S, so the SAME hồi must read with each seat's OWN address word:
   host high rank + high Sủng ↔ guest low rank + low Sủng, then the ranks SWAPPED. Per seat, per pass:
   (1) Tân quân lập uy c1a in the real modal: the Emperor says «Ái phi …» (Sủng ≥ BAL.voice.aiPhi) or «Nàng …», never «Nàng ta» inside quotes;
       the hồi ends on her choice («Ta nên đáp ra sao?»);
   (2) a Chính tuyến servant word {N} (j67 fill) = «nương nương» (rank ≥ BAL.voice.nuong) or «tiểu chủ»;
   (3) the friend (the other seat's coop entry) speaking to her through kSay gives a peer word, never a servant word or «nàng ta».
   usage: python3 dev/build/assemble.py && node dev/test/story-voice/coop-seats.js [workerURL]   (exit 1 on FAIL) */
const {chromium}=require('playwright');const path=require('path');const {serve,BASE}=require('../coop-serve.js');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const fails=[];const ok=(c,m,x)=>{console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''));if(!c)fails.push(m)};
(async()=>{const b=await chromium.launch();
 const mk=async(name,vp)=>{const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1,reducedMotion:'reduce'});await serve(ctx);
  await ctx.addInitScript(u=>{window.COOP_URL=u;document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='.kcf,#kroul,#kroulw,.kmov{display:none!important}';document.head.appendChild(s)})},WURL);
  const p=await ctx.newPage();p.setDefaultTimeout(60000);const o={name,p,errs:[]};p.on('pageerror',e=>o.errs.push(e.message.slice(0,200)));return o};
 const tap=async(o,re,ms=10000)=>{const t0=Date.now();while(Date.now()-t0<ms){const d=await o.p.evaluate(src=>{const R=new RegExp(src);const el=[...document.querySelectorAll('button,a,[role=button]')].find(x=>x.offsetParent!==null&&!x.disabled&&R.test(x.textContent.trim()));if(el){el.click();return true}return false},re.source).catch(()=>false);if(d)return true;await sleep(300)}return false};
 const clear=o=>o.p.evaluate(()=>{for(let i=0;i<30;i++){const m=document.getElementById('modal');if(!m||m.hidden)return;const bs=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);if(!bs.length)return;
   (bs.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||bs.find(x=>/^(Nhập cung|Tiến cung|Vào cung|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ|Nhận)\b/.test(x.textContent.trim()))||{click(){}}).click()}}).catch(()=>{});
 const world=o=>o.p.evaluate(()=>!!(window.COOP&&COOP.state&&COOP.state.you&&typeof S!=='undefined'&&S&&window.COOPW&&COOPW.base)).catch(()=>false);
 const A=await mk('host-Fold',[755,1000]),B=await mk('guest-iPad',[1180,820]);
 await A.p.goto(BASE,{waitUntil:'domcontentloaded'});await A.p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:120000});
 ok(await tap(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'host opens co-op');await sleep(500);ok(await tap(A,/^(Mời bạn|Mời hảo hữu)/),'host makes a room');
 await A.p.waitForFunction(()=>window.COOP&&COOP.state&&COOP.state.room&&COOP.state.you==='a',null,{timeout:60000});const code=await A.p.evaluate(()=>COOP.state.room);console.log('room',code);
 await B.p.goto(BASE+'?room='+code,{waitUntil:'domcontentloaded'});await B.p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:120000});await tap(B,/^Vào phòng/,8000);
 {const t0=Date.now();while(Date.now()-t0<120000){await clear(A);await clear(B);if(await world(A)&&await world(B))break;await sleep(600)}}
 const dump=o=>o.p.evaluate(()=>{const m=document.getElementById('modal');return{st:COOP.state&&COOP.state.status,you:COOP.state&&COOP.state.you,room:COOP.state&&COOP.state.room,S:typeof S!=='undefined'&&!!S,base:!!(window.COOPW&&COOPW.base),title:!document.getElementById('title').hidden,modal:m&&!m.hidden?m.innerText.slice(0,200):'',btn:[...document.querySelectorAll('button')].filter(x=>x.offsetParent!==null).map(x=>x.textContent.trim()).slice(0,12)}}).catch(e=>e.message);
 ok(await world(A)&&await world(B),'both seats are in the shared world',(await world(A)&&await world(B))?undefined:{A:await dump(A),B:await dump(B)});
 const seats=await Promise.all([A,B].map(o=>o.p.evaluate(()=>COOP.state.you)));ok(seats[0]==='a'&&seats[1]==='b','seats a / b',seats);
 /* one seat reads the hồi with its own S */
 const read=(o,hi)=>o.p.evaluate(async hi=>{const V=BAL.voice;Q.length=0;$("modal").hidden=true;
  S.rank=hi?Math.max(V.nuong,(S.rank|0)):0;if(hi&&S.rank>=V.hq)S.rank=V.hq-1;S.sung=hi?V.aiPhi+5:Math.max(0,V.aiPhi-10);S.cold=0;
  if(!S.reign){S.ps=S.ps||1;S.reign={side:null,tr:0}}const side0=S.reign.side;S.reign.side=null;
  let seen='',err='';try{if(rgFire('c1a')){showModal();await new Promise(z=>setTimeout(z,200));seen=document.getElementById('modal').innerText}}catch(e){err=e.message}
  $("modal").hidden=true;Q.length=0;S.reign.side=side0;
  const N=VP.fix(kSay({srv:'f'},S,'“Xin {goi} giữ gìn.”'))/* = j67 {N} */;const fr=rivals.find(v=>v.coop);const fw=fr?VP.fix(kSay(fr,S,'“{Goi} có khỏe không?”')):'';
  return{seat:COOP.state.you,rank:S.rank,sung:S.sung,aiPhi:V.aiPhi,nuong:V.nuong,seen:seen.replace(/\s+/g,' ').slice(0,700),err,N,fw,fr:fr&&{n:fr.name,r:fr.rank}}},hi);
 const check=(r,hi,tag)=>{const t=`${tag} seat ${r.seat} (${hi?'high':'low'} rank ${r.rank}, Sủng ${r.sung})`;console.log(t,JSON.stringify({c1a:r.seen.slice(0,420),N:r.N,friend:r.fw,fr:r.fr}));
  ok(!r.err&&r.seen,t+': c1a shows',r.err||undefined);
  ok(hi?/“Ái phi thấy trẫm nên làm thế nào\?”/.test(r.seen):/“Nàng thấy trẫm nên làm thế nào\?”/.test(r.seen),t+': the Emperor asks HER with her own word ('+(hi?'Ái phi':'Nàng')+')');
  ok(!/“[^”]*[Nn]àng ta[^”]*”/.test(r.seen),t+': no «nàng ta» inside speech');ok(/Ta nên đáp ra sao\?/.test(r.seen),t+': hồi ends on her choice');
  ok(r.N===(hi?'“Xin nương nương giữ gìn.”':'“Xin tiểu chủ giữ gìn.”'),t+': servant word by her own rank',r.N);
  if(r.fr)ok(/^“(Tỷ tỷ|Muội muội|Ngươi|[^”]*(tần|phi|nương nương|Quý nhân|Thường tại|Đáp ứng|Tần|Phi)[^”]*) có khỏe không\?”$/.test(r.fw)&&!/tiểu chủ|[Nn]àng ta/.test(r.fw),t+': the friend speaks to her as a peer',r.fw)};
 for(const [tag,hiA] of [['pass 1',true],['pass 2 (swapped)',false]]){const [ra,rb]=await Promise.all([read(A,hiA),read(B,!hiA)]);check(ra,hiA,tag);check(rb,!hiA,tag);
  ok(ra.seen.replace(/(Ái phi|Nàng) thấy/,'X thấy').split(' | ')[0]!==''&&ra.seat!==rb.seat,tag+': two different seats read the same hồi')}
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,3));
 console.log(fails.length?'FAIL '+fails.length:'PASS');await b.close();process.exit(fails.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
