/* FEEL-SHOWN checks — the odds she SEES for a person-menu act = the odds the act ROLLS with (jfeel feelWrapActs; C-AG #12 ask, 18/11)
   jfeel adds her feeling points to odA only inside an act context (FEEL.cur, set by runAct). The person menu (j15) reads ACT[k].o(S,v) outside
   runAct, so before the fix the word she saw lacked the feeling points the roll had.
   1 family: for EVERY ACT k whose o is a function, o(S,v) read from the menu (no context) = o(S,v) read inside runAct's context, with a
     feeling stub of +6 on every act name (and −6) → shown = rolled, and the stub really moves odds for the odA acts (not vacuous)
   2 the real roll: her person-menu Tranh sủng (doAct steal) rolls exactly the odds ACT.steal.o(S,H) showed, with the stub on
   3 no double: inside runAct the wrapper leaves FEEL.cur as runAct set it (odds moved once, not twice)
   usage: node dev/test/feel-shown.test.js [dev/index.html] → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto(URL);await p.waitForTimeout(1500);
 const R=await p.evaluate(async()=>{const out=[];const ok=(n,c,x)=>out.push([c?"PASS":"FAIL",n,x==null?"":JSON.stringify(x)]);
  window.__bot=1;document.getElementById('title').hidden=true;window.render=function(){};window.__agOff=1;
  for(let i=0;i<60;i++){start();if(!isSrv()&&!(typeof isKc==="function"&&isKc())&&!(S.origin&&S.origin.k==="cnv"))break}Q.length=0;S.rank=Math.max(S.rank,2);S.sung=40;S.duc=60;S.suc=70;S.cyb={};if(window.cyBase)S.tuan=(cyBase(S).t+1)%3;
  const H=liveRivals(true).filter(v=>!v.coop&&v.alive&&!v.out&&!(typeof sameHouse==="function"&&sameHouse(S,v)))[0];try{k61Meet(H,"gặp mặt",3)}catch(e){}
  const D=BAL.feel.od;const clean=()=>{S.mk=[];S.emo=null};const kindFor=(n,sg)=>{const c=kitActCat(String(n||"").replace(/<[^>]+>/g,""));return Object.keys(D).find(k=>D[k].c&&D[k].c.includes(c)&&(sg>0?D[k].p[2]>0:D[k].p[2]<0))};
  const ctx=(k,fn)=>{const c0=FEEL.cur;FEEL.cur={a:S,n:ACT[k].n||"",k,t:H};try{return fn()}finally{FEEL.cur=c0}};
  const mm0=mm;mm=()=>0;/* emperor mood fixed for the whole case */
  /* 1 family: a real feeling (emoSet, the kind that moves this act's category) */
  for(const sg of [1,-1]){const bad=[];let moved=0,n=0;
   for(const k in ACT){const A=ACT[k];if(!A||typeof A.o!=="function")continue;const fk=kindFor(A.n,sg);if(!fk)continue;let shown,inside,off;
    try{clean();window.__feelOff=1;off=A.o(S,H);delete window.__feelOff;emoSet(S,fk,80,"(thử) "+fk);shown=A.o(S,H);inside=ctx(k,()=>A.o(S,H))}catch(e){delete window.__feelOff;continue}finally{clean()}
    if(typeof shown!=="number"||typeof inside!=="number")continue;n++;if(shown!==inside)bad.push([k,shown,inside]);if(shown!==off)moved++}
   ok(`family (${sg>0?"good":"bad"} feeling): every ACT odds shown outside runAct = inside its runAct context`,bad.length===0&&n>=5,{n,bad:bad.slice(0,8)});
   ok(`family (${sg>0?"good":"bad"} feeling): the feeling really moves the shown odds (not vacuous)`,moved>=3,{moved,n})}
  /* 2 real roll: her person-menu Tranh sủng */
  const fk=kindFor(ACT.steal.n,1);S.tonight=H;S.ntk=null;S.ntTry=null;if(typeof stf2Ord==="function")stf2Ord=()=>"obey";window.__smgFake=()=>({raw:0});
  clean();window.__feelOff=1;const plain=ACT.steal.o(S,H);delete window.__feelOff;emoSet(S,fk,80,"(thử) "+fk);const shown=ACT.steal.o(S,H);
  /* 3 no double inside runAct */
  const inside=ctx("steal",()=>ACT.steal.o(S,H));ok("no double count inside runAct",inside===shown,{inside,shown});
  const cap=[];const r0=roll;window.roll=o=>{cap.push(o);return false};doAct(rivals.indexOf(H),"steal");await new Promise(r=>setTimeout(r,60));window.roll=r0;window.__smgFake=null;clean();mm=mm0;
  ok("her Tranh sủng: the roll uses the odds she saw (feeling points in both)",cap.includes(shown)&&shown!==plain,{fk,shown,plain,cap:cap.slice(0,12)});
  return out});
 let fail=0;for(const [s,n,x] of R){if(s==="FAIL")fail++;console.log(`${s} | ${n} | ${x}`)}
 if(errs.length){fail++;console.log("page errors:",errs.slice(0,3))}
 console.log(fail?`${fail} FAIL`:`${R.length}/${R.length} PASS`);await b.close();process.exit(fail?1:0)})();
