/* self-word CO-OP BOTH-SEAT check (CO-OP LAND GATE OD:L594, law 1 two-way; reviewer E41r): two real browsers in one live room.
   Each seat fills the SAME road line «{tx} … {tg} … {tsv}» with the OTHER seat (the friend = its coop entry) as the peer of the beat:
   pass 1 host high (rank ≥ nuong) / guest low; pass 2 SWAPPED. Per pass: the higher seat says «bổn cung»/«tỷ» and calls the friend «muội muội»;
   the lower seat says «tần thiếp»/«muội» and calls the friend by title / «… nương nương» / «tỷ tỷ»; {tsv} = bổn cung (rank ≥ nuong) / ta;
   words agree two-way (A→B self word matches B→A address); then a servant-origin seat says «nô tỳ» (never «bổn cung»).
   usage: python3 dev/build/assemble.py && node dev/test/self-word/coop-seats.js [workerURL]   (exit 1 on FAIL) */
const {chromium}=require('playwright');const {serve,BASE}=require('../coop-serve.js');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const fails=[];const ok=(c,m,x)=>{console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''));if(!c)fails.push(m)};
(async()=>{const b=await chromium.launch();
 const mk=async(name,vp)=>{const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1,reducedMotion:'reduce'});await serve(ctx);
  await ctx.addInitScript(u=>{window.COOP_URL=u},WURL);const p=await ctx.newPage();p.setDefaultTimeout(60000);const o={name,p,errs:[]};p.on('pageerror',e=>o.errs.push(e.message.slice(0,200)));return o};
 const tap=async(o,re,ms=10000)=>{const t0=Date.now();while(Date.now()-t0<ms){const d=await o.p.evaluate(src=>{const R=new RegExp(src);const el=[...document.querySelectorAll('button,a,[role=button]')].find(x=>x.offsetParent!==null&&!x.disabled&&R.test(x.textContent.trim()));if(el){el.click();return true}return false},re.source).catch(()=>false);if(d)return true;await sleep(300)}return false};
 const clear=o=>o.p.evaluate(()=>{for(let i=0;i<30;i++){const m=document.getElementById('modal');if(!m||m.hidden)return;const bs=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);if(!bs.length)return;
   (bs.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||bs.find(x=>/^(Nhập cung|Tiến cung|Vào cung|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ|Nhận)\b/.test(x.textContent.trim()))||{click(){}}).click()}}).catch(()=>{});
 const world=o=>o.p.evaluate(()=>!!(window.COOP&&COOP.state&&COOP.state.you&&typeof S!=='undefined'&&S&&window.COOPW&&COOPW.base&&rivals.find(v=>v.coop))).catch(()=>false);
 const A=await mk('host-Fold',[755,1000]),B=await mk('guest-iPad',[1180,820]);
 await A.p.goto(BASE,{waitUntil:'domcontentloaded'});await A.p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:120000});
 ok(await tap(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'host opens co-op');await sleep(500);ok(await tap(A,/^(Mời bạn|Mời hảo hữu)/),'host makes a room');
 await A.p.waitForFunction(()=>window.COOP&&COOP.state&&COOP.state.room&&COOP.state.you==='a',null,{timeout:60000});const code=await A.p.evaluate(()=>COOP.state.room);console.log('room',code);
 await B.p.goto(BASE+'?room='+code,{waitUntil:'domcontentloaded'});await B.p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:120000});await tap(B,/^Vào phòng/,8000);
 {const t0=Date.now();while(Date.now()-t0<120000){await clear(A);await clear(B);if(await world(A)&&await world(B))break;await sleep(600)}}
 ok(await world(A)&&await world(B),'both seats are in the shared world, each sees the friend entry');
 /* one seat: own rank me, the friend's rank them (as the other seat set it), fill the road line with the friend as {v} */
 const read=(o,me,them,srv)=>o.p.evaluate(({me,them,srv})=>{const V=BAL.voice;const fr=rivals.find(v=>v.coop);S.rank=me;fr.rank=them;S.cold=0;const s0=S.srv;if(srv)S.srv={risen:false};
  const real=rv67;window.rv67=(X,k)=>k==='v'?fr:null;let line='';try{line=fill67('{Tx} không tranh · {tg} cứ yên · {tsv} sẽ lo',{act:{}})}catch(e){line='ERR '+e.message}
  window.rv67=real;const a=kAddr(S,fr);if(srv)S.srv=s0;return{seat:COOP.state.you,me,them,nuong:V.nuong,line,xung:a.xung,goi:a.goi,fr:fr.name}},{me,them,srv});
 const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
 for(const [tag,hiA] of [['pass 1',true],['pass 2 (swapped)',false]]){const nu=await A.p.evaluate(()=>BAL.voice.nuong);const hi=nu+1,lo=Math.max(0,nu-2);
  const ra=await read(A,hiA?hi:lo,hiA?lo:hi),rb=await read(B,hiA?lo:hi,hiA?hi:lo);
  for(const r of [ra,rb]){const H=r.me>r.them,t=`${tag} seat ${r.seat} (rank ${r.me} → friend ${r.them})`;console.log(t,r.line);
   ok(!/\{|ERR/.test(r.line),t+': every token filled');
   ok(H?/^(Bổn cung|Tỷ) không tranh/.test(r.line):/^(Tần thiếp|Muội) không tranh/.test(r.line),t+': her self word to the friend by rank',r.line);
   ok(H?/· (muội muội|ngươi) cứ yên/.test(r.line):/· (tỷ tỷ|[^·]*(tần|phi|nương nương|Quý nhân|Thường tại|Đáp ứng)[^·]*) cứ yên/i.test(r.line),t+': what she calls the friend by rank',r.line);
   ok(r.me>=r.nuong?/bổn cung sẽ lo$/.test(r.line):/· ta sẽ lo$/.test(r.line),t+': {tsv} by her rank',r.line)}
  ok(/^(muội muội|ngươi)$/.test(hiA?ra.goi:rb.goi)&&/^(tần thiếp|muội)$/.test(hiA?rb.xung:ra.xung),tag+': two-way — the higher calls the lower «muội muội» and the lower calls herself «tần thiếp/muội»',hiA?[ra.goi,rb.xung]:[rb.goi,ra.xung])}
 const rs=await read(B,0,4,true);console.log('servant-origin seat',rs.line);ok(/^Nô tỳ không tranh/.test(rs.line)&&!/bổn cung/i.test(rs.line),'servant-origin seat: «nô tỳ», never «bổn cung»',rs.line);
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,3));
 console.log(fails.length?'FAIL '+fails.length:'PASS');await b.close();process.exit(fails.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
