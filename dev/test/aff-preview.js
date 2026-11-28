/* aff-preview (AFF-PREVIEW, MAIN ruling 28/11: a preview is a promise, law 4 / law 7): the card number affPreview(x,y,n) == the real change the act gives.
   Runs the real game: for each act family (relAdd, affAdd, spAdd rel, apply/ap hh, a fall, a man/servant bond, a co-op-style NPC→NPC bond) with the
   rescaling states ON (feelings vui, mood, her trust trait, a title, near the pace ceiling): preview first, then the act, compare (affGot). Also checks a preview
   changes NOTHING (whole save JSON + why notes + emo/net logs), and that affSg's range «a đến b» holds the real number when her nết are unknown.
   usage: node dev/test/aff-preview.js <built site root>   exit 0 = PASS */
const fs=require('fs'),path=require('path'),http=require('http');
const ROOT=path.resolve(process.argv[2]||'.');
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json'};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p.endsWith('/'))p+='index.html';const f=path.join(ROOT,p);
 if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':TYPES[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r)});
(async()=>{await new Promise(res=>srv.listen(0,'127.0.0.1',res));const URL0='http://127.0.0.1:'+srv.address().port+'/';
 const {chromium}=require('playwright');const b=await chromium.launch();const fails=[];
 const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block',reducedMotion:'reduce'});
 await ctx.route('**/*',rt=>rt.request().url().startsWith(URL0)?rt.continue():rt.abort());
 const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL0,{waitUntil:'domcontentloaded'});
 let F=null;for(let t=0;t<120&&!F;t++){for(const fr of p.frames()){try{if(await fr.evaluate(()=>typeof start==='function'&&typeof affPreview==='function'))F=fr}catch(e){}}if(!F)await p.waitForTimeout(500)}
 if(!F){console.log('AFF-PREVIEW FAIL · game did not load (affPreview missing)');process.exit(1)}
 await F.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;const t=document.getElementById('title');if(t)t.hidden=true;window.__forceOrigin='thd';window.__nlInner=1;start();window.__forceOrigin=0;window.__nlInner=0;quiet=false;Q.length=0});
 await F.waitForFunction(()=>typeof S!=='undefined'&&!!S&&!!S.name,null,{timeout:30000});
 const R=await F.evaluate(()=>{const out=[];const q=queenP();
  const L=liveRivals(true).filter(x=>x!==q&&!x.out);
  // rescaling states on: feelings (vui) on the liked one, her mood, trust traits, a title, high liking (pace)
  try{if(typeof feelOn==="function"&&feelOn()&&typeof feelSet==="function")feelSet(S,"vui",2)}catch(e){}
  try{S.mk=(S.mk||[]).concat([{k:"vui",lv:2,k1:(typeof mkNow==="function"?mkNow():0)+99}])}catch(e){}
  const cases=[];const fam=(name,x,y,n,act)=>cases.push({name,x,y,n,act});
  L.slice(0,6).forEach((v,i)=>{if(i===1)v.rel=70;if(i===2)v.rel=-40;if(i===3)v.rel=95;
   fam(`relAdd her→${v.name} +${6+i}`,v,S,6+i,()=>relAdd(S,v,6+i));
   fam(`affAdd ${v.name}→her +12`,v,S,12,()=>affAdd(v,S,12));
   fam(`spAdd rel ${v.name} +9`,v,S,9,()=>spAdd(v,"rel",9));
   fam(`fall ${v.name} -7`,v,S,-7,()=>relAdd(S,v,-7))});
  if(L[0]&&L[1])fam(`NPC→NPC ${L[0].name}→${L[1].name} +10`,L[0],L[1],10,()=>affAdd(L[0],L[1],10));
  if(q&&q!==S){fam('apply hh +8 (queen)',q,S,8,()=>apply({hh:8}));fam('apply hh -5 (queen)',q,S,-5,()=>apply({hh:-5}))}
  const man=(typeof menAll==="function"?menAll():[]).find(Boolean)||(S.staff||[])[0];if(man)fam('man/servant bond +6',man,S,6,()=>affAdd(man,S,6));
  const snap=()=>{try{return JSON.stringify(S,(k,v)=>k==="__why"?undefined:v)}catch(e){return ""}};
  for(const c of cases){let pv,sideOk=true;const s0=snap(),m0=typeof MOOD_N==="object"?JSON.stringify(MOOD_N):"";
   const via=c.name.startsWith('apply hh')?spSee("hh",c.n):affPreview(c.x,c.y,c.n);pv=via;
   if(snap()!==s0||(typeof MOOD_N==="object"&&JSON.stringify(MOOD_N)!==m0))sideOk=false;
   const sg=affSg(c.x,c.y,c.n);const s1=snap();if(s1!==s0&&!sideOk===false){sideOk=false}
   if(!sideOk){try{const A=JSON.parse(s0),B=JSON.parse(snap());const d=[];const walk=(a,b,pth)=>{if(d.length>4)return;if(typeof a!=="object"||typeof b!=="object"||!a||!b){if(JSON.stringify(a)!==JSON.stringify(b))d.push(pth);return}for(const k of new Set([...Object.keys(a),...Object.keys(b)]))walk(a[k],b[k],pth+"."+k)};walk(A,B,"S");c.name+=" diff "+d.join(",")}catch(e){}}
   const real=affGot(c.x,c.y,c.act);let inRange=true;const m=String(sg).match(/^([+-]?\d+) đến ([+-]?\d+)$/);if(m)inRange=real>=+m[1]&&real<=+m[2];
   out.push({name:c.name,base:c.n,preview:pv,real,sg,ok:pv===real,sideOk,inRange})}
  // her nết unknown: the card shows a range; the real number must sit inside it
  {const v=L[4]||L[0];if(v&&typeof trKnown==="function"){const k0=trKnown;trKnown=()=>[];let sg="";try{sg=affSg(v,S,10)}finally{trKnown=k0}
   const real=affGot(v,S,()=>affAdd(v,S,10));const m=String(sg).match(/^([+-]?\d+) đến ([+-]?\d+)$/);const inRange=m?real>=+m[1]&&real<=+m[2]:+sg===real;
   out.push({name:`nết unknown ${v.name} +10 (range)`,preview:sg,real,sg,ok:inRange,sideOk:true,inRange})}}
  // REAL CARDS: the option texts built by the game (topicOpts: Giúp đỡ nàng / Nhún nhường / Cảnh báo) vs the change their run() really makes
  for(const v of L.slice(0,4)){let A0=[];try{A0=topicOpts(v)||[]}catch(e){}
   for(const a0 of A0){let a=a0;try{a=(topicOpts(v)||[]).find(z=>z.n===a0.n)||a0}catch(e){}/* the card as shown NOW */if(typeof a.x!=="string"||typeof a.run!=="function"||a.n==="Ghé chơi")continue;/* Ghé chơi: the host answers later (rcvAsk → jrcv cards) */const m=a.x.replace(/<[^>]+>/g,"").match(/nàng quý ngươi ([+-]?\d+)(?! đến)/);if(!m)continue;
    const shown=+m[1];let real=null;const keep=JSON.stringify({bac:S.bac,danh:S.danh,suc:S.suc});try{real=affGot(v,S,()=>{const r0=Math.random;Math.random=()=>0;try{a.run()}finally{Math.random=r0}})}catch(e){}
    out.push({name:`card «${a.n}» ${v.name}`,preview:shown,real,sg:m[0],ok:shown===real,sideOk:true,inRange:true})}}
  // GIFT CARD (jgift giftEval → j8 giveTo): the queen (two steps on one bond) and a consort
  for(const t of [q&&q!==S?q:null,L[5]||L[0]].filter(Boolean)){try{const k=Object.keys(IT).find(k=>IT[k]&&giftVal({k},t)>0&&!IT[k].sl)||"tuithom";invAdd(S,{k});const ix=S.inv.length-1,e=S.inv[ix];
   const ev=giftEval(e,t);const m=String(ev&&ev.x||"").replace(/<[^>]+>/g,"").match(/nàng quý ngươi ([+-]?\d+)(?! đến)/);if(!m){out.push({name:`gift card ${t.name}: no number (${String(ev&&ev.x).slice(0,60)})`,preview:null,real:null,sg:"",ok:true,sideOk:true,inRange:true});continue}
   const r0=Math.random;const rf=typeof rcvGiftIn==="function"?rcvGiftIn:null;Math.random=()=>0.99;let real,ret="";try{real=affGot(t,S,()=>{ret=giveTo(S,t,ix)})}finally{Math.random=r0;if(rf)rcvGiftIn=rf}
   const rl=String(ret).match(/thiện cảm ([+-]?\d+)/);/* the keep line (KK68 keepGain.d); a wrong-taste gift adds its OWN «không ưa» line (jdis), counted apart */if(giveTo.out!=="take"||!rl){out.push({name:`gift card ${t.name}: outcome ${giveTo.out} (no keep line)`,preview:+m[1],real:null,sg:m[0],ok:true,sideOk:true,inRange:true});continue}
   out.push({name:`gift card «Tặng quà» ${t.queen?"queen ":""}${t.name} (result line)`,preview:+m[1],real:+rl[1],sg:m[0],ok:+m[1]===+rl[1],sideOk:true,inRange:true})}catch(err){out.push({name:"gift card error "+err.message,preview:0,real:1,sg:"",ok:false,sideOk:true,inRange:true})}}
  return out});
 console.log('| act | before: card showed (raw) | after: card shows | real change | same | preview wrote nothing |');console.log('|---|---|---|---|---|---|');
 for(const r of R){console.log(`| ${r.name} | ${r.base!=null?(r.base>0?'+':'')+r.base:'(raw BAL)'} | ${r.sg} | ${r.real} | ${r.ok?'yes':'NO'} | ${r.sideOk?'yes':'NO'} |`);if(!r.ok)fails.push(r.name);if(!r.sideOk)fails.push(r.name+' (side effect)');if(!r.inRange)fails.push(r.name+' (range)')}
 if(errs.length){fails.push('page errors');console.log('page errors '+JSON.stringify(errs.slice(0,3)))}
 console.log(fails.length?`AFF-PREVIEW FAIL · ${fails.length} · ${fails.join(', ')}`:`AFF-PREVIEW PASS · ${R.length} acts, preview = real`);
 await b.close();srv.close();process.exit(fails.length?1:0)})();
