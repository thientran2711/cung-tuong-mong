/* review emotion-acts-2-r1 scan (LUẬT SỬA CẢ NHÓM): every emotion line of every NPC kind (each outburst reaction, each NPC act, each extreme) → where the
   Tuần lục book files it (her own "Việc của ngươi" vs that person's page vs world) and whether the printed text is broken ("( , )", "()"),
   and whether a number that is NOT hers is shown on her page. usage: node dev/test/emotion-acts-lines.js <build url>   (SEEN=1: every person counts as known)
   FAIL when a printed line is broken, or a line about someone else (no "ngươi" in it) is filed on her own page "Việc của ngươi". */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof eaDo==='function'&&typeof wkBookData==='function',null,{timeout:120000});await p.waitForTimeout(2000);
 await p.evaluate(`window.__SEEN=${process.env.SEEN?1:0}`);const R=await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}try{trS()}catch(e){}
  if(window.__SEEN){const s0=KIT_FACEFX.seen;KIT_FACEFX.seen=()=>true}const one={};for(const x of eaPeople()){const k=eaKind(x);if(!one[k])one[k]=x}
  const out=[];const txt=f=>String((f&&(f.text||f.t||f.h))||"").replace(/<[^>]+>/g,"");
  const where=(line)=>{S.wkSnap=Object.assign(wkSnap(),{seq:S.logSeq||0});log(line);const d=wkBookData();
   const me=(d.me||[]).map(txt).join(" | ");const per=(d.persons||[]).map(x=>{const nm=x.who===S.emp?"[Hoàng thượng]":x.who===S.thO||x.who&&x.who.kind==="th"?"[Thái hậu]":"["+(x.who&&x.who.name)+"]";
     const t=JSON.stringify(x.blocks||x.F||[]).replace(/<[^>]+>/g,"").replace(/\\"/g,"'");return nm+" "+t.slice(0,240)}).join(" | ");const wd=(d.world||[]).map(txt).join(" | ");return{me,per,wd}};
  const broken=s=>/\(\s*[,;]|[,;]\s*\)|\(\s*\)|undefined|NaN/.test(s);
  const run=(kd,x,lab,h)=>{if(!h)return;const w=where(h);const all=w.me+" "+w.per+" "+w.wd;out.push({kd,lab,line:h.replace(/<[^>]+>/g,""),onMe:!!w.me,me:w.me.slice(0,200),per:w.per.slice(0,200),wd:w.wd.slice(0,120),broken:broken(all)||broken(h)})};
  for(const kd of ["e","t","s","m","o","q","k","c"]){const x=one[kd];if(!x){out.push({kd,lab:"NO PERSON"});continue}
   for(const r of EA_REACT.filter(r=>r.who===kd)){if(kd==="m")x.eaAway=0;if(kd==="e")x.eaQ=-1;let o=null;try{o=eaDo(x,r)}catch(e){out.push({kd,lab:r.k,err:String(e)});continue}Q.length=0;run(kd,x,"out:"+r.k+":"+r.g,o&&o.h)}
   for(const g of ["gian","buon","so","ghen","vui"]){if(kd==="c")continue;const n=(window.EA_NACT_||null);}
   for(const g of ["gian","buon","so","ghen","vui"]){if(kd==="c")continue;let o=null;try{o=eaDo(x,{k:"act",g,n:"Thử"})}catch(e){}Q.length=0;run(kd,x,"act:"+g,o&&o.h)}
   for(const g of ["gian","buon","so","ghen","vui"]){x.eaX={};const L0=S.logSeq||0;const keep=log;let got="";window.log=function(h){got=h;return keep.apply(this,arguments)};
    try{x.ill=null;if(kd==="t")S.thIll=null;for(let i=0;i<BAL.ea.ext.wk;i++){x.emo={k:g==="ghen"?"ghen":g,v:99,w:wk()};eaExtNpc(x,g)}}catch(e){out.push({kd,lab:"ext:"+g,err:String(e)})}window.log=keep;Q.length=0;
    if(got){S.logs.shift();S.logSeq--;run(kd,x,"ext:"+g,got)}else out.push({kd,lab:"ext:"+g,line:"(no log line: fog / q tdNews)"})}}
  return out});
 let nb=0,nMe=0;for(const r of R){if(r.broken)nb++;if(r.onMe&&r.line&&!/ngươi/.test(r.line))nMe++;if(r.broken||(r.onMe&&r.line&&!/ngươi/.test(r.line)))console.log(JSON.stringify(r))}
 console.log("SUMMARY lines",R.length,"broken",nb,"lines about others filed on her own page",nMe,"pageerrors",errs.length,errs.slice(0,3));await b.close();process.exit(nb||nMe||errs.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
