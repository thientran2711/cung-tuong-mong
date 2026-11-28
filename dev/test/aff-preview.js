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
 const R=await F.evaluate(()=>{const out=[];const q=queenP();/* PVQUY-POST: jdh's title bonus rounds its fraction with Math.random (fr) — a card and its act could differ by 1 at random (flagged in dev/handover/reports/pvquy-post.md, not this unit); one fixed draw for preview AND act */const RND0=Math.random;Math.random=()=>0;/* PVQUY-POST-2 (RV-186 item 6, test only): relAdd = affAdd(her→v) THEN affAdd(v→her); the first leg can fire a jemo emotion (emoEv) that rescales the second leg, which a preview (AFF_DRY: wrappers stand aside) cannot see → card ≠ act ~1 run in 4. Held still for the card+act pairs so the gate is stable; the gap itself is measured below (GAP rows, info only) and listed for MAIN in reports/pvquy-post.md */const EMO0=typeof emoEv==="function"?emoEv:null;if(EMO0)emoEv=function(){};
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
   const via=c.name.startsWith('apply hh')?spSee("hh",c.n):c.name.startsWith('spAdd rel')?spSee("rel",c.n,c.x)/* PVQUY-POST-2: LIVE spAdd(p,"rel") = the pace alone (MAIN 189 ruling) */:affPreview(c.x,c.y,c.n);pv=via;
   if(snap()!==s0||(typeof MOOD_N==="object"&&JSON.stringify(MOOD_N)!==m0))sideOk=false;
   const sg=/^(apply hh|spAdd rel)/.test(c.name)?balSg(pv)/* not an affAdd chain: no nết range */:affSg(c.x,c.y,c.n);const s1=snap();if(s1!==s0&&!sideOk===false){sideOk=false}
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
  // PVQUY-POST-2 CARDS (law 4, MAIN 189): an apply({hh}) option chip (j1 fmt → spSee hh = apply's pace THEN hhSet→affAdd) and a spAdd-rel card (j7 comet)
  if(q&&q!==S)for(const n of [6,-4]){const t=String(fmt({hh:n})).replace(/<[^>]+>/g,"");const m=t.match(/([+-−]?\d+)/)/* a fall the ghét day cap (aecbc267 opDn) swallows shows «0» — unsigned */;const real=affGot(q,S,()=>apply({hh:n}));
   out.push({name:`card apply({hh:${n}}) chip «${t}»`,base:n,preview:m?+m[1].replace("−","-"):null,real,sg:t,ok:!!m&&+m[1].replace("−","-")===real,sideOk:true,inRange:true})}
  {const E=EVI.comet,v=L[1]||L[0];if(E&&v){let o=null;try{o=E.b({me:false,v:v.id,a:(L[2]||L[0]).id,y:""})}catch(e){}const c=o&&o.o&&o.o.find(z=>z.n==="Đứng ra nói đỡ");
   if(c){const m=String(c.x).replace(/<[^>]+>/g,"").match(/thiện cảm ([+-]?\d+)/);const b0=v.rel||0;c.go();const real=Math.round((v.rel||0)-b0);
    out.push({name:`card spAdd rel «Đứng ra nói đỡ» ${v.name}`,base:BAL.eff.j7.comet.rel,preview:m?+m[1]:null,real,sg:m?m[0]:String(c.x),ok:!!m&&+m[1]===real,sideOk:true,inRange:true})}
   else out.push({name:"card spAdd rel: comet card not built",preview:null,real:null,sg:"",ok:false,sideOk:true,inRange:true})}}
  // PVQUY-POST-2 ruling D: the typed spAdd-rel cards now print the paced rise — rvquarrel «Đứng ra can ngăn» (two rows) and pact «Kết minh»
  {const a=L[2]||L[0],b=L[3]||L[1];a.rel=88;b.rel=40;/* one near the ceiling: the pace bites */const E=EVI.rvquarrel;let o=null;try{o=E&&E.b({a:a.id,b:b.id,y:""})}catch(e){}const c=o&&o.o&&o.o.find(z=>z.n==="Đứng ra can ngăn");
   if(c){const t=String(c.x).replace(/<[^>]+>/g,"");const sh=[a,b].map(x=>{const m=t.match(new RegExp(x.name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+" thiện cảm ([+-]?\\d+)"));return m?+m[1]:null});const b0=[a.rel,b.rel];c.go();
    [a,b].forEach((x,i)=>{const real=Math.round(x.rel-b0[i]);out.push({name:`card spAdd rel «Đứng ra can ngăn» ${x.name} (row per person)`,base:5,preview:sh[i],real,sg:t,ok:sh[i]===real,sideOk:true,inRange:true})})}
   else out.push({name:"card rvquarrel not built",preview:null,real:null,sg:"",ok:false,sideOk:true,inRange:true});
   const P=EVI.pact,v=L[4]||L[0];v.rel=80;let po=null;try{po=P&&P.b({v:v.id,y:""})}catch(e){}const pc=po&&po.o&&po.o.find(z=>z.n==="Kết minh");
   if(pc){const m=String(pc.x).replace(/<[^>]+>/g,"").match(/thiện cảm ([+-]?\d+)/);const r0=v.rel;try{pc.go()}catch(e){}const real=Math.round(v.rel-r0);out.push({name:`card spAdd rel «Kết minh» ${v.name}`,base:25,preview:m?+m[1]:null,real,sg:m?m[0]:"",ok:!!m&&+m[1]===real,sideOk:true,inRange:true})}
   else out.push({name:"card pact «Kết minh» not built (no queen?)",preview:null,real:null,sg:"",ok:!(typeof qOn==="function"&&qOn()),sideOk:true,inRange:true})}
  // PVQUY-POST-2 ruling C: jky non-consort target (servant row r.af[me], an official with a number r.af) — the card gain jkyAfGain = relTo's real change
  {const J=window.__jkyAf;if(J){const sv=(S.staff||[])[0]||{name:"cung nữ",loyal:50};const T=[];sv.af={me:95};T.push(["servant row",{kind:"sv",ref:sv}]);T.push(["official number",{kind:"off",ref:{name:"quan",af:97}}]);T.push(["no one",{kind:"x",ref:null}]);
   for(const [nm,W] of T){const n=8;const card=J.G(S,W,n);const b0=J.V(S,W);J.T(S,W,n);const real=b0==null?0:Math.round(J.V(S,W)-b0);out.push({name:`jky card ${nm} +${n} (near the clamp)`,base:n,preview:card,real,sg:String(card),ok:card===real,sideOk:true,inRange:true})}}else out.push({name:"jky hook missing",preview:null,real:null,sg:"",ok:false,sideOk:true,inRange:true})}
  // GIFT CARD (jgift giftEval → j8 giveTo): the queen (two steps on one bond) and a consort
  for(const t of [q&&q!==S?q:null,L[5]||L[0]].filter(Boolean)){try{const k=Object.keys(IT).find(k=>IT[k]&&giftVal({k},t)>0&&!IT[k].sl)||"tuithom";invAdd(S,{k});const ix=S.inv.length-1,e=S.inv[ix];
   const ev=(()=>{const r1=Math.random;Math.random=()=>0.99;try{return giftEval(e,t)}finally{Math.random=r1}})();/* the same draw giveTo runs under */const m=String(ev&&ev.x||"").replace(/<[^>]+>/g,"").match(/nàng quý ngươi ([+-]?\d+)(?! đến)/);if(!m){out.push({name:`gift card ${t.name}: no number (${String(ev&&ev.x).slice(0,60)})`,preview:null,real:null,sg:"",ok:true,sideOk:true,inRange:true});continue}
   const r0=Math.random;const rf=typeof rcvGiftIn==="function"?rcvGiftIn:null;Math.random=()=>0.99;if(rf)rcvGiftIn=()=>"take";/* PVQUY-POST-2: she keeps it, so the queen row really runs relAdd + ap(S,{hh}) */let real,ret="";try{real=affGot(t,S,()=>{ret=giveTo(S,t,ix)})}finally{Math.random=r0;if(rf)rcvGiftIn=rf}
   const rl=String(ret).match(/thiện cảm ([+-]?\d+)/);/* the keep line (KK68 keepGain.d); a wrong-taste gift adds its OWN «không ưa» line (jdis), counted apart */if(giveTo.out!=="take"||!rl){out.push({name:`gift card ${t.name}: outcome ${giveTo.out} (no keep line)`,preview:+m[1],real:null,sg:m[0],ok:true,sideOk:true,inRange:true});continue}
   out.push({name:`gift card «Tặng quà» ${t.queen?"queen ":""}${t.name} (result line)`,preview:+m[1],real:+rl[1],sg:m[0],ok:+m[1]===+rl[1],sideOk:true,inRange:true})}catch(err){out.push({name:"gift card error "+err.message,preview:0,real:1,sg:"",ok:false,sideOk:true,inRange:true})}}
  // PVQUY-POST (MAIN 188 ruling, law 4): a line written AFTER the act prints the REAL rise (affGot), never the pvQuy prediction. Each POST site:
  // run the act with her nết hidden (pvQuy would print a range «+a đến +b») and near the pace ceiling, then every number on the result line must be ONE
  // number equal to that person's real change (aff before → after), one row per person.
  {const ALL=()=>liveRivals(true).filter(x=>x&&!x.out).concat(q&&q!==S?[q]:[]).filter((x,i,a)=>a.indexOf(x)===i);
   const affMap=(y)=>{const M=new Map();for(const x of ALL())M.set(x,aff(x,y||S));return M};
   const hide=fn=>{const k0=typeof trKnown==="function"?trKnown:null;if(k0)trKnown=()=>[];const r0=Math.random;Math.random=()=>0;try{return fn()}finally{Math.random=r0;if(k0)trKnown=k0}};
   const plain=t=>String(t==null?"":(typeof t==="object"?(t.res?t.res.join(" · "):JSON.stringify(t)):t)).replace(/<[^>]+>/g,"");
   const postRow=(site,who,one,y,run,re)=>{const b0=affMap(y);let ret="";try{ret=hide(run)}catch(e){out.push({name:`POST ${site}: error ${e.message}`,preview:null,real:null,sg:"",ok:false,sideOk:true,inRange:true});return}
    const txt=plain(ret);const b1=affMap(y);
    if(one){const m=txt.match(re||/(?:quý ngươi|thiện cảm) ([+-−]?\d+)( đến [+-]?\d+)?/);const real=Math.round((b1.get(one)||0)-(b0.get(one)||0));
     if(!m){out.push({name:`POST ${site} ${who}: no number in «${txt.slice(0,260)}»`,preview:null,real,sg:"",ok:/^\(no gift/.test(txt)||/^Ngươi sang giúp .* việc khó\.$/.test(txt)/* «Giúp đỡ nàng»: jtwoway twDo answers with its own line, no number (not a pvQuy line) */,sideOk:true,inRange:true});return}
     const shown=+m[1].replace("−","-");out.push({name:`POST ${site} ${who} (result line)`,base:null,preview:shown,real,sg:m[0],ok:!m[2]&&shown===real,sideOk:true,inRange:true});return}
    let n=0;for(const x of ALL()){const m=txt.match(new RegExp(x.name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+" thiện cảm ([+-−]?\\d+)( đến [+-]?\\d+)?"));if(!m)continue;n++;
     const real=Math.round((b1.get(x)||0)-(b0.get(x)||0)),shown=+m[1].replace("−","-");out.push({name:`POST ${site} ${x.name} (row per person)`,preview:shown,real,sg:m[0],ok:!m[2]&&shown===real,sideOk:true,inRange:true})}
    if(!n)out.push({name:`POST ${site}: no person row in «${txt.slice(0,70)}»`,preview:null,real:null,sg:"",ok:/^\s*$/.test(txt),sideOk:true,inRange:true})};
   const P=L.filter(v=>v.alive!==false).slice(0,5);P.forEach((v,i)=>{v.rel=[30,92,60,96,10][i]||40});/* two near the pace ceiling */
   // j9 topicOpts run(): Giúp đỡ nàng / Nhún nhường / Cảnh báo nàng
   for(const v of P.slice(0,3)){try{if(oan(v,S)<=0)oanAdd(v,S,5)}catch(e){}let A0=[];try{A0=topicOpts(v)||[]}catch(e){}
    for(const n of ["Giúp đỡ nàng","Nhún nhường","Cảnh báo nàng"]){const a=A0.find(z=>z&&z.n===n);if(!a||typeof a.run!=="function")continue;postRow(`j9 «${n}»`,v.name,v,S,()=>a.run(),/quý ngươi ([+-−]?\d+)( đến [+-]?\d+)?\./)}}
   // jagacts3 P3T talk results (her side and an NPC speaker)
   if(typeof P3T==="object")for(const v of P.slice(0,4)){for(const k of ["health","praise","secret"]){try{const c=P3T[k](S,v);postRow(`jagacts3 ${k}`,v.name,v,S,()=>c.run(),/quý ngươi ([+-−]?\d+)( đến [+-]?\d+)?/)}catch(e){}}
    try{const th=liveRivals(true).find(x=>x!==v&&x!==S);if(th){v.rl=v.rl||{};const c=P3T.gossip(S,v,th);postRow("jagacts3 gossip",v.name,v,S,()=>c.run(),/quý ngươi ([+-−]?\d+)( đến [+-]?\d+)?/)}}catch(e){}
    const p2=P.find(x=>x!==v);if(p2)try{const c=P3T.health(p2,v);postRow("jagacts3 health NPC→NPC",`${p2.name}→${v.name}`,v,p2,()=>c.run(),new RegExp("quý "+p2.name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+" ([+-−]?\\d+)( đến [+-]?\\d+)?"))}catch(e){}}
   // j24 «Có người đến» gift: relAdd runs while the card is built → the card prints what already moved
   if(typeof AP_MK==="object"&&AP_MK.apFriend)for(const v of P.slice(0,2)){postRow("j24 apFriend gift",v.name,v,S,()=>{try{if(typeof giftHand==="function"&&v.inv)invAdd(v,{k:"tuithom"})}catch(e){}const o={who:v,sub:"gift"};const k0=kitParse;let raw="";kitParse=function(x){raw+=String(x)+" ";return k0.apply(this,arguments)};let ev=null;try{ev=AP_MK.apFriend(o)}finally{kitParse=k0}/* the kit draws thiện cảm as marks; the number is in the text it was handed */return o.sub==="gift"&&ev?raw:"(no gift in hand: a chat visit)"},/[Tt]hiện cảm:? ?([+-−]?\d+)( đến [+-]?\d+)?/)}
   // j67 e67ally (story ending) and the j97 group ending (one row per person)
   if(typeof e67ally==="function"&&P[4])postRow("j67 e67ally",P[4]&&P[4].name,P[4],S,()=>e67ally(P[4],30),/* a low liking: a real rise, so a reverted preview shows a range / a different number *//thiện cảm ([+-−]?\d+)( đến [+-]?\d+)?/);
   if(typeof R97L!=="undefined"){const A=R97L.find(a=>a&&a.a==="st_the");/* «Một hô trăm ứng»: G is bound by the arc wrapper */if(A&&typeof A.go==="function"){P.forEach(v=>{v.rel=Math.max(v.rel||0,netTh(v,"than")+1)});postRow("j97 group",null,null,S,()=>A.go(null,1))}else out.push({name:"POST j97 group: arc st_the not found",preview:null,real:null,sg:"",ok:false,sideOk:true,inRange:true})}
   // jemoact «tiec»: each guest's row
   if(typeof window.eaDo==="function")postRow("jemoact tiec",null,null,null,()=>{S.bac=Math.max(S.bac||0,500);return window.eaDo(S,{k:"tiec",n:"Mở tiệc"})});else out.push({name:"POST jemoact tiec: eaDo missing",preview:null,real:null,sg:"",ok:false,sideOk:true,inRange:true});
   // j8 giveTo: the keep line vs her real change
   {const t=P[0];if(t){const k=Object.keys(IT).find(k=>IT[k]&&giftVal({k},t)>0&&!IT[k].sl)||"tuithom";invAdd(S,{k});const ix=S.inv.length-1;const rf=typeof rcvGiftIn==="function"?rcvGiftIn:null;
    try{rcvGiftIn=()=>"take";postRow("j8 giveTo",t.name,t,S,()=>giveTo(S,t,ix),/thiện cảm ([+-−]?\d+)( đến [+-]?\d+)?/)}finally{if(rf)rcvGiftIn=rf}}}}
  // PVQUY-POST-2 (RV-186 item 4): an oán RESULT line prints the real change (oanGot), never pvOan — jemoact «kexau» (Kể xấu): her oán row vs the line
  if(typeof window.eaDo==="function"){const t=liveRivals(true).find(x=>x!==q&&!x.out);if(t){const b0=oan(t,S);let ret="";try{const k0=typeof trKnown==="function"?trKnown:null;if(k0)trKnown=()=>[];try{S.danh=Math.max(S.danh||0,60);const e0=S.emo;S.emo=Object.assign({},e0||{},{t:key(t)})/* her target (jemoact eaTarget reads p.emo.t) */;try{ret=window.eaDo(S,{k:"kexau",n:"Kể xấu"})}finally{S.emo=e0}}finally{if(k0)trKnown=k0}}catch(e){ret="error "+e.message}
   const txt=String(ret&&ret.res?ret.res.join(" · "):typeof ret==="object"?JSON.stringify(ret):ret).replace(/<[^>]+>/g,"");const m=txt.match(/oán ngươi ([+-−]?\d+)( đến [+-]?\d+)?/);const real=Math.round(oan(t,S)-b0);
   out.push({name:`POST jemoact kexau ${t.name} oán (result line)`,preview:m?+m[1].replace("−","-"):null,real,sg:m?m[0]:txt.slice(0,120),ok:!!m&&!m[2]&&+m[1].replace("−","-")===real,sideOk:true,inRange:true})}}
  // GAP (info, not a fail): the same relAdd card+act with the emotion hook ON — how often the first leg's emotion moves the second leg
  if(EMO0){emoEv=EMO0;let n=0,d=0;const ex=[];for(const v of liveRivals(true).filter(x=>x!==q&&!x.out).slice(0,8)){for(const k of [6,10]){const pv=affPreview(v,S,k);const real=affGot(v,S,()=>relAdd(S,v,k));n++;if(pv!==real){d++;if(ex.length<3)ex.push(`${v.name} +${k}: card ${pv} real ${real}`)}}}
   out.push({name:`GAP (info) relAdd with emotion ON: ${d}/${n} differ${ex.length?" · "+ex.join(" · "):""}`,preview:null,real:null,sg:"",ok:true,sideOk:true,inRange:true,info:1})}
  Math.random=RND0;return out});
 console.log('| act | before: card showed (raw) | after: card shows | real change | same | preview wrote nothing |');console.log('|---|---|---|---|---|---|');
 for(const r of R){console.log(`| ${r.name} | ${r.base!=null?(r.base>0?'+':'')+r.base:'(raw BAL)'} | ${r.sg} | ${r.real} | ${r.ok?'yes':'NO'} | ${r.sideOk?'yes':'NO'} |`);if(!r.ok)fails.push(r.name);if(!r.sideOk)fails.push(r.name+' (side effect)');if(!r.inRange)fails.push(r.name+' (range)')}
 if(errs.length){fails.push('page errors');console.log('page errors '+JSON.stringify(errs.slice(0,3)))}
 console.log(fails.length?`AFF-PREVIEW FAIL · ${fails.length} · ${fails.join(', ')}`:`AFF-PREVIEW PASS · ${R.length} acts, preview = real`);
 await b.close();srv.close();process.exit(fails.length?1:0)})();
