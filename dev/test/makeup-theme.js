/* review/makeup-theme (jmkt.js + jtoil.js labels + jts.js Hội phối đồ): the six level names from ONE source, no tone words on presets,
   the đề's hidden makeup want (notice row + scouting roads), the contest sitting (real kit mirror, then the contest goes on), the bot contest,
   per-person taste (known → on the card; unknown → one surprise + learned), rivals by the same rule, an old save without the new fields.
   usage: node dev/test/makeup-theme.js <url of dev/index.html> <WxH@dpr> <shotdir>   (prints JSON; exit 1 on a failed check) */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const [,,URL,VP,DIR]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@2');const W=+m[1],H=+m[2],DPR=+m[3];const tag=`${W}x${H}`;
fs.mkdirSync(DIR,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,serviceWorkers:'block'});await ctx.route(u=>/ctmload=1|x-ctm-load/.test(String(u)),r=>r.abort());const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(180000);const out={vp:VP},fail=[];const ck=(k,ok,v)=>{out[k]=v;if(!ok)fail.push(k);console.error('ck',k,ok?'ok':'FAIL',JSON.stringify(v).slice(0,300))};
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true})});
 console.error('loaded');for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:120000});
  const ok=await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out&&S.rank<7);if(ok)break}
 await require('./lib/roulette').dismissRoulette(p);await p.waitForTimeout(1200);
 await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove();Q.length=0;try{closeModal()}catch(e){}S.suc=90;S.bac=200;render()});
 /* 1. names: one source, six final names; presets show no tone word */
 const N=await p.evaluate(()=>({mk:TOIL_MK,sty:TOIL_STY,pre:toilPreRows(toilColDef()).flatMap(r=>r.items.map(i=>i.name)),pn:TOIL_PRE.map(x=>toilPreName(x[4],x[2]==="diem"?"diem":"dep")),hint:TOIL_HINT}));
 ck('names',JSON.stringify(N.mk)===JSON.stringify({moc:"Mặt mộc",vung:"Vụng về",vua:"Đoan trang",dep:"Kiều diễm",tuyet:"Khuynh thành",diem:"Diêm dúa"}),N.mk);
 ck('noTone',![...N.pre,...N.pn].some(s=>/sắc lạnh|sắc ấm/.test(s)),{pre:N.pre.slice(0,3),pn:N.pn.slice(0,3)});
 ck('hintNoOtherName',!Object.entries(N.hint).some(([k,t])=>Object.entries(N.mk).some(([k2,n])=>k2!==k&&t.toLowerCase().includes(n.toLowerCase()))),N.hint);
 /* 2. the notice: the Son phấn row + the scouting roads */
 const A=await p.evaluate(()=>{Q.length=0;S.month=3;S.tuan=1;const s=tsS();s.dress=null;tsDressAnnounce();const q=Q[Q.length-1];return{t:q&&q.t,h:q&&q.h.replace(/<[^>]+>/g," ").replace(/\s+/g," "),opts:q?q.opts.map(o=>o.n+" — "+o.x):[],th:s.dress&&s.dress.th,m:s.dress&&s.dress.m}});
 ck('notice',/Son phấn/.test(A.h)&&A.opts.some(o=>/tai mắt/.test(o)),A);
 await p.evaluate(()=>{try{showModal()}catch(e){}});await p.waitForTimeout(700);await p.screenshot({path:`${DIR}/mkt-${tag}-1-notice.jpg`,quality:70});
 /* a scouting road taken (forced win) teaches the want */
 const L1=await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}const th=tsS().dress.th,m=tsS().dress.m;const r0=roll;roll=()=>true;try{const o=tsMkScoutOpts(th,m).find(o=>/tai mắt/.test(o.n));S.mat=Math.max(S.mat||0,2);o.go()}finally{roll=r0}return{k:S.mkKnow,row:tsMkRow(th,m)}});
 ck('scoutLearn',/đề chuộng/.test(L1.row[1]),L1);
 /* 3. the contest sitting: the ONE mirror in the kit frame, the đề note under the swatches; leaving it hands the contest back */
 const th=A.th;await p.evaluate(()=>{S.toilette=null;window.__mkDone=0});
 await p.evaluate(th=>{S.month=4;tsMkSit(th,4,()=>{window.__mkDone++})},th);
 await p.waitForSelector('#kg82 .toilw');await p.waitForTimeout(1200);
 const note=await p.evaluate(()=>document.querySelector('#kg82 .toilfig .past').textContent);
 ck('sitNote',/Đề /.test(note)&&/Kiểu cầu kỳ/.test(note)&&!/sắc lạnh|sắc ấm/.test(note),note);
 await p.screenshot({path:`${DIR}/mkt-${tag}-2-sit.jpg`,quality:70});
 const sw=await p.evaluate(()=>[...document.querySelectorAll('#kg82 .toilw')].map(e=>e.textContent).join(' ').slice(0,4000));ck('swNoTone',!/sắc lạnh|sắc ấm/.test(sw),sw.slice(0,160));
 await p.click('#toilmoc2');await p.waitForTimeout(1500);
 await p.waitForTimeout(800);for(let i=0;i<6&&await p.$('.ktrv');i++){if(await p.$('.ktrv-ov>.kmend'))await p.click('.ktrv-ov>.kmend').catch(()=>{});else await p.evaluate(()=>{const o=document.querySelector('.ktrv-ov');o&&o.click()});await p.waitForTimeout(900)}
 await require('./lib/roulette').clearMoments(p);await p.waitForSelector('#toildone');await p.screenshot({path:`${DIR}/mkt-${tag}-2b-sitres.jpg`,quality:70});await p.click('#toildone');
 await p.waitForTimeout(800);const done=await p.evaluate(()=>({n:window.__mkDone,rec:S.toilette&&{makeup:S.toilette.makeup,F:S.toilette.F}}));ck('sitDone',done.n===1&&done.rec&&done.rec.F===2,done);
 /* 4. the whole contest, bot seat (dress + sitting from skill), rivals by the same rule */
 const C=await p.evaluate(th=>{window.__bot=1;Q.length=0;try{closeModal()}catch(e){}S.toilette=null;S.month=4;S.tuan=1;S.out=false;const s=tsS();s.dress={th,m:4,y:S.year};const l0=(S.logs||[]).length;
  tsDressHold();const q=Q[Q.length-1];const o=q&&q.opts.find(o=>/Tự tay/.test(o.n));if(o)o.go();return new Promise(res=>setTimeout(()=>{const L=(S.logs||[]).slice(0,Math.max(0,(S.logs||[]).length-l0)).map(x=>typeof x==="string"?x:x.t||x.h||JSON.stringify(x)).join(" ");
   const W=tsMkWant(th,4);const R=liveRivals(true).slice(0,6).map(v=>{const r=tsMkNpc(v,W,"t");const x=tsMkPts(r,W);return{n:v.name,knows:r.knows,look:r.look,tone:x.tone,bold:x.bold,pts:x.pts}});delete window.__bot;res({log:L.replace(/<[^>]+>/g,"").slice(-600),R,know:S.mkKnow.th})},1500))},th);
 ck('contest',/chuộng/.test(C.log)&&/Dung nhan/.test(C.log),C);
 /* 5. per-person taste: known → on the card; unknown → a surprise popup once + learned; NPCs judged by the same table */
 const T=await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}TOIL_POP.length=0;S.toilSeen=null;const like=toilTasteOf("th")||"w";const pre=TOIL_PRE.find(x=>x[2]==="dep"&&(x[3]==="warm"?"w":"c")===like);
  S.toilette={day:toilWk()*10,wk:toilWk(),score:75,makeup:true,style:"fit",dv:"hopdip",F:1,occ:["th"],look:"dep",col:Object.assign({},pre[4])};S.mkKnow={p:{},th:{}};
  const n0=toilTasteN(S,"th");const opt=talkOpts({kind:'th'}).find(a=>/^Thỉnh an/.test(a.n));const th0=S.th;if(opt){if(opt.run)try{opt.run()}catch(e){}else try{opt.go()}catch(e){}}
  const learned=toilTasteKnown("th");const fx=toilFx(S,"th",1,"ok");S.toilSeen=null;const fx2=toilFx(S,"th",1,"ok");
  const v=liveRivals(true)[0];const nv=toilTasteN(v,"th");
  return{like:toilTasteOf("th"),emp:toilTasteOf("emp"),n0,learned,pop:TOIL_POP.length+Q.filter(q=>q.toilEv).length,fx2:fx2&&fx2.why,nv,hkTxt:LIKES.mk,empRow:LIKEN.mk}});
 ck('taste',T.n0!==0&&T.learned&&T.pop>=1&&T.fx2&&T.fx2.some(w=>/son phấn/.test(w[0])),T);
 await p.evaluate(()=>{try{showModal()}catch(e){}});await p.waitForTimeout(700);await p.screenshot({path:`${DIR}/mkt-${tag}-3-taste.jpg`,quality:70});
 /* 6. rank: a low rank allows less, a high rank more (overdoing beyond rank = Diêm dúa) */
 const R=await p.evaluate(()=>({lo:toilAllow(["th"],0),mid:toilAllow(["th"],3),hi:toilAllow(["th"],6),none:toilAllow(["th"])}));ck('rank',R.lo<R.mid&&R.mid<R.hi,R);
 /* 7. old save: a save from before (no mkKnow, no emp.likes.mk, old look ids) loads and reads the new names */
 const O=await p.evaluate(()=>{const raw=JSON.parse(JSON.stringify(ser()));const R0=raw.S;delete R0.mkKnow;if(R0.emp&&R0.emp.likes)delete R0.emp.likes.mk;if(R0.emp&&R0.emp.known)delete R0.emp.known.mk;R0.toilette={day:toilWk()*10,wk:toilWk(),score:90,makeup:true,style:"fit",dv:"hopdip",look:null,col:{mat:"hongmai",ma:"yenchi",son:"dotham",may:"den",want:"diem"}};
  let ok=true,err="";try{deser(raw);render()}catch(e){ok=false;err=String(e)}const c=toilChip();return{ok,err,chip:c&&c.full,taste:toilTasteOf("emp"),row:typeof tsMkRow==="function"&&tsMkRow("phu",4)[1]}});
 ck('oldSave',O.ok&&/Khuynh thành/.test(O.chip||""),O);
 out.errs=errs;if(errs.length)fail.push('pageerror');out.fail=fail;console.log(JSON.stringify(out,null,1));await b.close();process.exit(fail.length?1:0)})();
