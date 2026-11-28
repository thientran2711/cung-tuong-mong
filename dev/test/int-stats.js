/* whole numbers only (jint, owner 11/15 "Nàng oán ta +2.36"): after 4 simulated weeks every stat of every person is an integer;
   an old save with fractions is rounded on load; the log has no "thù -N" and no card help text dumped into it ("Dùng được ngay");
   the week book never clips a page (an entry longer than a page scrolls inside it) and no stat chip breaks inside.
   usage: node dev/test/int-stats.js <url> [<W>x<H>@dpr ...] */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const args=process.argv.slice(2);const URL=args[0];
let SIZES=args.slice(1);if(!SIZES.length)SIZES=['755x1000@2','1180x820@2','412x1058@2','1000x755@2','844x390@3'];
(async()=>{const b=await chromium.launch();const errs=[];const OUT={};let ok=true;
 for(const [si,SZ] of SIZES.entries()){const [wh,d]=SZ.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();
  p.on('pageerror',e=>errs.push(SZ+' '+e.message.slice(0,200)));p.setDefaultTimeout(0);
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(2500);
  await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;
   for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()});
  const R={};
  if(si===0){
   /* 4 weeks */
   R.sim=await p.evaluate(()=>{const t0=S.turn||0;let n=0;window.__bot=true;while((S.turn||0)<t0+4&&n<400&&!S.dead){Q.length=0;S.mg=null;used=4;try{nextBuoi()}catch(e){console.error(e)}n++}Q.length=0;
    const bad=[];for(const P of intPeople()){for(const k of INT_KEYS){const v=P[k];if(typeof v==="number"&&!Number.isInteger(v))bad.push(`${P.name||P.id||"?"}.${k}=${v}`)}
     for(const m of ["rl","ro","evm","gp"])if(P[m])for(const k in P[m]){const v=P[m][k];if(typeof v==="number"&&!Number.isInteger(v))bad.push(`${P.name||"?"}.${m}.${k}=${v}`)}}
    const logs=S.logs.map(plain);return{weeks:(S.turn||0)-t0,buoi:n,dead:!!S.dead,people:intPeople().length,bad:bad.slice(0,10),nbad:bad.length,thu:logs.filter(l=>/thù -\d/.test(l)).slice(0,3),help:logs.filter(l=>/Dùng được ngay|nhóm Dùng chứng cứ/.test(l)).slice(0,2)}});
   /* an old save with fractions */
   R.load=await p.evaluate(()=>{const v=rivals[0];v.oan=2.36;v.rel=-3.4;S.ro[v.id]=1.64;if(S.maid)S.maid.loyal=50.5;const d=ser();deser(d);const w=rivals.find(x=>x.id===v.id);return{oan:w.oan,rel:w.rel,ro:S.ro[v.id],loyal:S.maid&&S.maid.loyal}});
   /* the real log line of a sure act (no card text) */
   R.logLine=await p.evaluate(()=>{const a={n:"Thử việc chắc",c:{suc:-5},o:100,w:{danh:2},x:"được: Danh +2 · kèm: lời hứa trên thẻ"};const s0=S.logSeq;{const r0=window.roll;window.roll=()=>true;try{runOpt(a)}finally{window.roll=r0}}return plain(S.logs[0])});
   ok=ok&&R.sim.nbad===0&&R.sim.weeks>=4&&!R.sim.thu.length&&!R.sim.help.length&&Number.isInteger(R.load.oan)&&Number.isInteger(R.load.rel)&&Number.isInteger(R.load.ro)&&(R.load.loyal==null||Number.isInteger(R.load.loyal))&&!/lời hứa/.test(R.logLine)&&/Danh \d+→\d+/.test(R.logLine);
   /* a dialog choice is logged with its event and what really happened */
   R.choice=await p.evaluate(()=>{Q.length=0;Q.push({t:"Lão Vương bị truy sát",h:"",opts:[{n:"Mặc kệ",fx:{danh:-2},go:()=>log("Ông bị giết, mất nhân chứng.")}]});const n0=S.logs.length;chooseM(0);Q.length=0;return{line:plain(S.logs[0]),added:S.logs.length-n0}});
   ok=ok&&/^Lão Vương bị truy sát: Mặc kệ → Ông bị giết, mất nhân chứng\. Danh \d+→\d+\.$/.test(R.choice.line.trim())&&R.choice.added===1}
  /* week book: a page with one very long entry and long chips */
  R.book=await p.evaluate(async()=>{const v=rivals[0];const long=`<b>Ngươi có thêm chứng cứ về ${v.name}</b>: `+Array(40).fill(`lời ${v.name} nói xấu người khác sau lưng <span class="ef r">${v.name} Sủng −10</span>`).join("; ")+".";
   const bk=kitBook({pages:[{kind:"cover",title:"Tuần lục"},{kind:"text",title:"Thử",blocks:[{facts:[long]},{facts:["Một dòng ngắn."]}]},{kind:"person",who:v,blocks:[{facts:[long,long]}]},{kind:"end"}],head:"Thử"});
   await new Promise(r=>setTimeout(r,900));const root=document.querySelector(".kbk");const res={pages:0,clipped:[],chipWrap:[]};
   const pages=root?[...root.querySelectorAll(".kbk-pg")]:[];res.pages=pages.length;
   for(const pg of pages){const f=pg.querySelector(".kbk-flow");if(!f)continue;const cs=getComputedStyle(f);if(f.scrollHeight>f.clientHeight+1&&!/(auto|scroll)/.test(cs.overflowY))res.clipped.push(pg.className)
    }
   /* chips on the visible face only */
   for(const c of root.querySelectorAll(".kbk-flow .ef:not(.kbk-long)")){const r=c.getClientRects();if(r.length>1)res.chipWrap.push(c.textContent)}
   res.long=root.querySelectorAll(".kbk-flow .kbk-long").length;try{(bk&&bk.close)?bk.close():root.remove()}catch(e){}return res});
  ok=ok&&R.book.pages>0&&!R.book.clipped.length&&!R.book.chipWrap.length;
  OUT[SZ]=R;await ctx.close()}
 console.log(JSON.stringify({ok,OUT,errs},null,1));await b.close();process.exit(ok&&!errs.length?0:1)})();
