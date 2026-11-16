/* LUẬT SỬA CẢ NHÓM scan for owner 15/11 20:30Z (story progress shows the CHAPTER and the ACT, "Chương 1 · Hồi 3"): every place a story line's
   progress is shown is read in the live page, for the main line (arc chapter, milestone chapter, rare chance), side lines (old v2 phụ tuyến
   arcs, j72 Việc nhờ) and old saves (v1 story without chapters, v2 thread without A.chap).
   usage: NODE_PATH=$(npm root -g) node dev/test/chap-label.js <url> [WxH] [out.json] [shot-prefix]
   Prints one row per site: id · where · text; checks (exit 1 on a failure) only run with CHECK=1 (the "after" build). */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,VP,OUT,SHOT]=process.argv;const [W,H]=(VP||'755x1000').split('x').map(Number);
const CHECK=process.env.CHECK==='1';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(process.env.DPR||1),serviceWorkers:'block'});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='td';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1800);await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});
 const rows=[];const add=(id,where,t)=>rows.push({id,where,t:String(t==null?'':t).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim().slice(0,170)});
 const clear=()=>p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());const md=document.getElementById('modal');md.hidden=true;md.className='modal';try{NLP=null}catch(e){}Q.length=0});
 const tabTxt=(t,sel)=>p.evaluate(([t,sel])=>{tab=t;render();const el=document.querySelector(sel||'#panel');return el?el.innerText:''},[t,sel]);
 const shot=async n=>{if(SHOT){await p.evaluate(()=>{document.querySelectorAll('.kmov,#kmrew,.kmfx,.kmnote,#rtoast').forEach(e=>e.remove())});await p.waitForTimeout(300)}if(SHOT)await p.screenshot({path:`${SHOT}-${n}.png`})};
 /* 1. milestone chapter (new life: Chương 1 Nhập cung) */
 await clear();
 let r=await p.evaluate(()=>({obj:obj67(),hint:STORY[S.origin.k].hint(),goal:STORY[S.origin.k].goal}));
 add('ms.obj','Hành sự head + STORY.hint (milestone chapter)',r.obj);add('ms.goal','STORY.goal (milestone chapter)',r.goal);
 add('ms.tab','Mệnh truyện tab card (milestone chapter)',(await p.evaluate(()=>{tab='story';render();const k=document.querySelector('#panel .kskill');return k?k.innerText:''})));
 /* 2. arc chapter of the main line, act 2 of n */
 await clear();
 r=await p.evaluate(()=>{const A=newThread67('td_an','m');S.st.ch.n=2;A.chap=2;A.i=1;pickNext67(A);A.due=0;A.dl=S.turn+6;S.st.M=A;S.st.ms=null;
  const act=storyActs67()[0];return{act:act&&act.t,actn:act&&act.n,obj:obj67(),goal:STORY[S.origin.k].goal,panel:panel67(),n:A.seq.length}});
 add('arc.act','Hành sự card «Mệnh truyện» (line under the name)',r.act);add('arc.obj','Hành sự head + STORY.hint (arc chapter)',r.obj);add('arc.goal','STORY.goal (arc chapter)',r.goal);
 add('arc.panel','panel67 (servant road / Mệnh truyện block) head',(r.panel.match(/<h3>Chương[^<]*<\/h3>/g)||[]).join(' | '));
 add('arc.tab','Mệnh truyện tab card (arc chapter)',(await p.evaluate(()=>{tab='story';render();const k=document.querySelector('#panel .kskill');return k?k.innerText:''})));
 await shot('tab');
 r=await p.evaluate(()=>{tab='act';render();const h=document.querySelector('#panel .obj67');return h?h.innerText:''});add('arc.head','Hành sự head (DOM)',r);
 r=await p.evaluate(()=>{const A=S.st.M;fireBeat67(A);showModal();const m=Q[0];const hd=document.querySelector('#modal .kptitle,#mt');
  return{t:m&&m.t,head:hd&&hd.innerText,body:(m&&String(m.h||'').split('<br>')[0])}});
 add('arc.dlg','beat dialog title (kit header)',r.t);add('arc.dlgdom','beat dialog header (DOM)',r.head);add('arc.body','beat dialog first line',r.body);
 await shot('dlg');
 r=await p.evaluate(()=>{const n0=S.logs.length;chooseM(0);Q.length=0;return S.logs.slice(0,Math.max(1,S.logs.length-n0+1)).map(x=>String(x).replace(/<[^>]+>/g,'')).find(x=>/Thành|Hỏng|:/.test(x)&&!/Tốn|^\S+ \S+\. /.test(x))||S.logs[0]});
 add('arc.log','Tuần lục entry after the act',r);
 /* 3. pledge (Hạn lo liệu) */
 await clear();
 r=await p.evaluate(()=>{const A=newThread67('td_an','m');A.chap=3;A.i=1;A.nb='c1';A.due=0;A.dl=S.turn+6;S.st.M=A;S.bac=5;fireBeat67(A);const i=Q[0].opts.findIndex(o=>o.pl67);
  if(i<0)return{};chooseM(i);Q.length=0;const pan=panel67();pl67Open();const t=Q[0]&&Q[0].t;Q.length=0;return{obj:obj67(),t,blk:(pan.match(/Đang lo liệu.*?<\/div><\/div>/)||[''])[0]}});
 add('pl.obj','Hành sự head while a pledge runs',r.obj);add('pl.dlg','pledge dialog title (chip tap)',r.t);
 await p.evaluate(()=>{S.pl67=null});
 /* 4. rare chance (j97x) */
 await clear();
 r=await p.evaluate(()=>{const A=S.st.M;pushDil({pid:'j97x',t:'x',o:[{n:'ok'}],pp:{a:A&&A.a}},'Cơ duyên hiếm');const t=Q[0]&&Q[0].t;Q.length=0;return t});add('r97.dlg','rare chance dialog title',r);
 /* 5. chapter-start + chapter-end cards / log */
 await clear();
 r=await p.evaluate(()=>{const n0=S.logs.length;const A=S.st.M;end67(A,Object.keys(ARC67[A.a].E)[0]);const L=S.logs.slice(0,S.logs.length-n0).map(x=>String(x).replace(/<[^>]+>/g,''));
  return{end:L.find(x=>/khép lại/.test(x)),start:L.find(x=>/^T\d+\/\d+ \S+ ?\S*Chương \d+: /.test(x)||/Chương \d+: .*Hạn/.test(x))}});
 add('arc.end','Tuần lục: chapter closes',r.end);add('arc.start','Tuần lục: next chapter opens',r.start);
 /* 6. old v2 save: main thread without A.chap, no S.st.ch */
 await clear();
 r=await p.evaluate(()=>{const A=newThread67('td_an','m');delete A.chap;A.i=1;pickNext67(A);A.due=0;A.dl=S.turn+6;S.st.M=A;const ch=S.st.ch;S.st.ch=null;S.st.ms=null;
  let t='',head='';try{fireBeat67(A);t=Q[0]&&Q[0].t}catch(e){t='ERR '+e.message}Q.length=0;S.st.ch=ch;return{t}});add('old2.dlg','old v2 save (no chapter) beat dialog title',r.t);
 /* 7. old v2 side arc (phụ tuyến S.st.X) */
 await clear();
 r=await p.evaluate(()=>{const ids=Object.keys(ARC67).filter(id=>ARC67[id].o==='*'||/^s_/.test(id));const id=ids[0];const X=newThread67(id,'s');X.i=0;pickNext67(X);S.st.X=[X];X.due=0;
  let t='';try{fireBeat67(X);t=Q[0]&&Q[0].t}catch(e){t='ERR '+e.message}Q.length=0;const pan=panel67();S.st.X=[];return{t,id}});add('side.dlg','old phụ tuyến arc beat dialog title ('+r.id+')',r.t);
 /* 8. old v1 save (story before chapters) */
 await clear();
 r=await p.evaluate(()=>{const st0=S.st;S.st={step:1,done:0,tag:''};let t='',tabT='';try{pushDil({t:'x',o:[{n:'ok'}]},'Tuyến truyện');t=Q[0]&&Q[0].t}catch(e){t='ERR '+e.message}Q.length=0;
  try{tab='story';render();const k=document.querySelector('#panel');tabT=k?k.innerText:''}catch(e){tabT='ERR '+e.message}window.__st0=st0;return{t,tabT}});
 add('old1.dlg','old v1 save story dialog title',r.t);add('old1.tab','old v1 save Mệnh truyện tab',r.tabT);
 await shot('old1');
 await p.evaluate(()=>{S.st=window.__st0;tab='act';render()});
 const out={rows,errs};
 if(CHECK){const g=id=>(rows.find(x=>x.id===id)||{}).t||'';const ok=[];const chk=(n,c)=>ok.push([n,!!c]);
  const CH=/Chương \d+ · Hồi \d+\/\d+/;
  chk('arc dialog title has Chương · Hồi',CH.test(g('arc.dlg')));chk('arc act card has Chương · Hồi',CH.test(g('arc.act')));chk('arc head has Chương · Hồi',CH.test(g('arc.obj'))&&CH.test(g('arc.head')));
  chk('arc tab card has Chương and Hồi',/Chương 2/.test(g('arc.tab'))&&/Hồi 2\//.test(g('arc.tab')));chk('panel67 head',CH.test(g('arc.panel')));chk('Tuần lục after the act',CH.test(g('arc.log')));
  chk('pledge dialog',CH.test(g('pl.dlg')));chk('rare chance title has Chương',/Chương \d+/.test(g('r97.dlg')));chk('old v2 save → Chương 1',/Chương 1 · Hồi \d+\/\d+/.test(g('old2.dlg')));
  chk('old v1 save title → Chương 1 · Hồi',/Chương 1 · Hồi \d+\/\d+/.test(g('old1.dlg')));chk('old v1 save tab shows the story',/Chương 1/.test(g('old1.tab'))&&/Hồi/.test(g('old1.tab')));
  chk('milestone head has Chương',/Chương \d+/.test(g('ms.obj')));chk('no page errors',!errs.length);
  out.checks=ok;out.pass=ok.every(x=>x[1])}
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(out,null,1));
 for(const x of rows)console.log(`${x.id.padEnd(10)} | ${x.where} | ${x.t}`);if(out.checks)console.log(out.checks.map(x=>(x[1]?'ok  ':'FAIL')+' '+x[0]).join('\n'));if(errs.length)console.log('ERRS',errs);
 await b.close();process.exit(CHECK&&!out.pass?1:0)})().catch(e=>{console.error(e);process.exit(2)});
