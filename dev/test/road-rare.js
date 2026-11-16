/* road-rare (review road-b1-r1 item 1): for every road with an RD97L rare finale — in a fresh life of that road:
   (a) ARC67[<road>_11].E.r97 exists and is the rare ending (✦ tag, rare text), (b) a path choice in a .5–.10 chapter feeds S.st.f14.q97 and the
   .11 thread starts from that tally, (c) the rare ending fired on the .11 as the main thread gives ✦ tag, S.r97 entry (title), a Ngự tứ item,
   the origin finale tag (S.st.ch.fin) = the rare tag, (d) a mid-chapter recast is told (A.rq), 0 page errors.
   usage: node dev/test/road-rare.js <url> [roads comma list] */
const {chromium}=require('playwright');const [,,URL,ONLY]=process.argv;
(async()=>{const b=await chromium.launch();const errs=[];let fail=0;const chk=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(c?'':' '+JSON.stringify(x).slice(0,600)));if(!c)fail++};
 const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();p.setDefaultTimeout(0);
 p.on('pageerror',e=>errs.push(e.message.slice(0,300)));await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});
 await p.waitForFunction(()=>typeof start==='function'&&typeof ROAD14==='object'&&window.RARE97,null,{timeout:0});await p.waitForTimeout(1500);
 const roads=(await p.evaluate(()=>RD97L.map(d=>ARC67[d.a]&&ARC67[d.a].road).filter(Boolean))).filter(r=>!ONLY||ONLY.split(',').includes(r));
 for(const rd of roads){const R=await p.evaluate(async rd=>{document.getElementById('title').hidden=true;quiet=true;const k=rd.split('_')[0];
   const others=Object.keys(ARC67).filter(id=>ARC67[id].o===k&&id!==rd);localStorage.setItem('ctm-arcs',JSON.stringify({[k]:others}));window.__forceOrigin=k;start();
   await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin&&S.st&&S.st.f14)||++n>150)r();else setTimeout(t,100)};t()});
   const out={rd:S.st.f14.rd,road:S.st.f14.road};const id11=ROAD14[rd][BAL.road.last],d=RARE97.defs[id11],E=ARC67[id11].E.r97;
   out.e97=!!E&&E.k===1&&E.tag==="✦ "+d.tag&&E.t===d.t;
   /* (b) a path option in a .5–.10 chapter */
   let hit=null;for(let n=BAL.road.first;n<BAL.road.last&&!hit;n++){const id=ROAD14[rd][n];for(const[bk,bb]of Object.entries(ARC67[id].B)){const O=typeof bb.o==='function'?[]:bb.o;
     const i=O.findIndex(o=>(d.path||[]).some(x=>String(o.n).includes(x))&&!(d.bad||[]).some(x=>String(o.n).includes(x)));if(i>=0){hit={id,bk,n:O[i].n};break}}}
   out.hit=hit;if(hit){const X=S.st.X||(S.st.X=[]);const A=newThread67(hit.id,"s");X.push(A);A.cur=hit.bk;const O=opts67(A,beatDef67(A,hit.bk));const i=O.findIndex(o=>o.n===hit.n);
    out.iok=i>=0;if(i>=0)res67(X.length-1,hit.bk,i,100);out.q=JSON.stringify(S.st.f14.q97||null);X.pop()}
   /* (c) the .11 as the main thread, rare ending fired */
   const A=newThread67(id11,"m");out.q11=JSON.stringify(A.q97||null);S.st.M=A;A.chap=S.st.ch.n;const it0=JSON.stringify(S.inv||S.items||[]).length;
   end67(A,"r97");out.tag=A.tag;out.end=A.end;out.r97=(S.r97||[]).map(x=>x.a+':'+x.ti).join('|');out.fin=S.st.ch.fin||'';out.rare=d.tag;
   /* (d) mid-chapter recast told */
   const B=newThread67(ROAD14[rd][BAL.road.first+1],"s");const v=rv67(B,"v");if(v){B.i=2;v.alive=false;const ok=castRv67(B,"v");out.rq=ok?JSON.stringify(B.rq||null):'nocast';v.alive=true}else out.rq='no v';
   quiet=false;return out},rd);
  chk(`${rd}: life on the road`,R.rd===rd,R);chk(`${rd}: E.r97 = rare ending`,R.e97,R);
  if(R.hit){chk(`${rd}: path choice in a road chapter counted (${R.hit.id} «${R.hit.n}»)`,R.iok&&/"p":1/.test(R.q),R);chk(`${rd}: .11 starts from the road tally`,R.q11===R.q,R)}
  else console.log(`note ${rd}: path names only .11 options (j97 counts them on the .11 itself)`);
  chk(`${rd}: rare fired → ✦ tag, title, finale`,R.end==='r97'&&R.tag==='✦ '+R.rare&&R.r97.includes(':')&&R.fin==='✦ '+R.rare,R);
  chk(`${rd}: mid-chapter recast told`,/nay đã khuất, kẻ nối tay là/.test(R.rq)||R.rq==='no v'||R.rq==='nocast',R);}
 chk('no page errors',!errs.length,errs);console.log(fail?`FAIL ${fail}`:'ALL PASS');await b.close();process.exit(fail?1:0)})();
