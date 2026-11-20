/* story-frame (review/story-frame): a bd (Bắc Địch) life saved by a build BEFORE the fix had no chapter frame (S.st without v2, story bot
   fault 1). Loaded in this build, the frame starts once at the chapter the life has reached (jst14 f67Mig): month 0 → chương 1 with its full
   time; month 9 → chương 1 closed «Lỡ dịp» (limit 6), chương 2 with 10-3 = 7 months left; month 40 → the three tutorial chapters closed,
   chương 4 = an origin chapter of bd. Then a second load / more buổi: no second frame, chapter numbers never repeat; no page errors.
   Also a save of another origin with the old v1 storyline keeps its old storyline (only late-registered origins migrate).
   usage: NODE_PATH=$(npm root -g) node dev/test/story-frame-oldsave.js <before url> <after url> */
const {chromium}=require('playwright');const [,,BEF,AFT]=process.argv;
(async()=>{const b=await chromium.launch();const errs=[];
 const boot=async(url)=>{const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();p.on('pageerror',e=>errs.push(url.slice(-12)+': '+e.message.slice(0,160)));
  await p.goto(url,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);return p};
 const p0=await boot(BEF);
 const saves=await p0.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;
  window.__forceOrigin='bd';start();const st=JSON.stringify(S.st);const o={st,v2:!!(S.st&&S.st.v2),k:S.origin.k};
  for(const t of [0,9,40]){S.turn=t;o['m'+t]=JSON.stringify(ser())}
  window.__forceOrigin='tt';start();S.st={step:1,done:0,tag:''};o.tt=JSON.stringify(ser());return o});
 await p0.close();
 console.log('before build: bd origin',saves.k,'S.st',saves.st,'framed',saves.v2);
 const p=await boot(AFT);const out={};
 for(const k of ['m0','m9','m40','tt']){out[k]=await p.evaluate(async s=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;Q.length=0;
   deser(JSON.parse(s));await new Promise(r=>setTimeout(r,150));const c=S.st.ch,m=S.st.ms;
   const r={v2:!!S.st.v2,n:c?c.n:0,ms:m?m.id:null,left:m&&typeof msHan67==="function"?msHan67(m,0)[1]:"",past:c?c.past.map(x=>`${x.n}:${x.ms||x.a}:${x.tag}`):[],arc:S.st.M?S.st.M.a:null,road:S.st.f14?S.st.f14.road:null,cards:Q.filter(q=>/Chương/.test(String(q.t||""))).length,
    log:(S.logs.slice(0,6).find(x=>/Mệnh truyện mở lại/.test(x))||"").replace(/<[^>]+>/g,"").slice(0,160)};
   /* a second load of the same life must not frame it again */
   const st1=JSON.stringify(S.st);deser(JSON.parse(JSON.stringify(ser())));await new Promise(r=>setTimeout(r,150));r.same=JSON.stringify(S.st)===st1;
   const seen=[];for(let i=0;i<6;i++){try{used=0;nextBuoi()}catch(e){r.err=e.message;break}Q.length=0;if(S.st.ch)seen.push(S.st.ch.n)}r.nAfter=seen;return r},saves[k])}
 console.log(JSON.stringify(out,null,1));
 const C=[['m0 framed, chương 1 full time',out.m0.v2&&out.m0.n===1&&out.m0.ms==='nhap14'&&!out.m0.past.length&&/còn 6 tháng/.test(out.m0.left)],
  ['m9: ch1 Lỡ dịp, ch2 with 7 months',out.m9.v2&&out.m9.n===2&&out.m9.ms==='sung14'&&out.m9.past.length===1&&/Lỡ dịp/.test(out.m9.past[0])&&/còn 7 tháng/.test(out.m9.left)],
  ['m40: ch1–3 closed, ch4 = a bd origin chapter',out.m40.v2&&out.m40.n===4&&out.m40.past.length===3&&!!out.m40.arc&&/^bd_/.test(out.m40.arc)],
  ['migration is quiet (no chapter card) + one log line',['m0','m9','m40'].every(k=>out[k].cards===0&&/Mệnh truyện mở lại/.test(out[k].log))],
  ['second load: same frame',['m0','m9','m40','tt'].every(k=>out[k].same)],
  ['buổi play on, chapter numbers never go back',['m0','m9','m40'].every(k=>!out[k].err&&out[k].nAfter.every((n,i,a)=>n>=out[k].n&&(!i||n>=a[i-1])))],
  ['old tt v1 storyline untouched',!out.tt.v2&&!out.tt.err],
  ['0 page errors',!errs.length]];
 for(const [n,ok] of C)console.log(ok?'ok  ':'FAIL',n);const ok=C.every(x=>x[1]);
 console.log(ok?'PASS':'FAIL',errs.slice(0,4));await b.close();process.exit(ok?0:1)})().catch(e=>{console.error(e);process.exit(2)});
