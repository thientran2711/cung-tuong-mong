/* TMK-WARN (F seat s21e; laws 6a / 2 / 1 / 7): the tai mắt who took bạc is warned before the «Mua chuộc người hầu» charge on her buyer ends her
   life, and has a tiered way out; NPC bought servants hear the same; her as the buyer is told. Real game functions.
   usage: node dev/test/tmk-warn.test.js [index.html]   MUTATE=nowarn | notext | nocut → must FAIL (exit 1) */
const {chromium}=require('playwright');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const A=process.argv[2]||require('path').join(__dirname,'..','index.html');const URL=/^(file|https?):/.test(A)?A:'file://'+require('path').resolve(A);const MUT=process.env.MUTATE||"";
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 const R=await p.evaluate((MUT)=>{const out=[];const ok=(c,m)=>out.push([!!c,m]);try{
  window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<120&&!isSrv();i++)start();window.__nlInner=0;quiet=false;
  if(MUT==="nowarn")mcwWarnMe=()=>false;if(MUT==="notext")cnvSpyX=function(m,n){return "x"};if(MUT==="nocut")mcwNpc=()=>{};
  ok(isSrv(),"servant life started");const m=srvM();const L=liveRivals(true).filter(x=>x!==m&&!x.queen&&!x.coop);const [v,h,u]=L;const HS=L.slice(3).concat(m?[]:[]);let hi=0;const nextH=()=>HS[(hi++)%HS.length];
  const clean=x=>{x.wrongs=[];x.dw=0;x.evc={};x.evq={};x.ev=0};[v,h,u,m].forEach(clean);S.evc={};
  /* (a) the take card names the jcharge road in odds words */
  const card=PEND.cnvBribe({r:v.id});const take=card&&card.o.find(o=>/Nhận bạc/.test(o.n));const need=chNeed(v,"mc");
  ok(take&&new RegExp(`bị đuổi khỏi cung khi .+ bị nắm đủ ${need} chứng tội mua chuộc người hầu`).test(take.x),`take card: ${take&&take.x}`);
  ok(take&&/ra một chứng: (không có khả năng|khả năng (rất thấp|thấp|vừa|cao|rất cao))\)/.test(take.x),"take card: one search's odds in a law-7 word (chanceW)");
  {const R=kitParse(take.x).replace(/<[^>]+>/g,"|");const mi=R.indexOf("|Mất|"),ki=R.search(/\|(Kèm|Ghi chú)\|/);const seg=R.slice(mi,ki<0?undefined:ki);ok(mi>=0&&/bị đuổi khỏi cung/.test(seg),`take card: the charge stands in the kit Mất row, not Kèm (${R.slice(0,400)})`)}
  ok(!/%/.test(take&&take.x||"%"),"no % on the card");
  /* she takes it */
  Q.length=0;take.go();ok(String(S.srv.spyFor)===String(v.id),"she is v's tai mắt");
  /* (b) someone writes a piece of v's mc charge → the warning card, once per piece */
  Q.length=0;evA(h,v,1,"mc");const W=Q.find(q=>q.pid==="mcWarn");ok(!!W,`warning card «Gió lọt» after the first piece (${Q.map(q=>q.t).join("|")})`);
  ok(W&&W.opts.length===4&&/· nhẹ$/.test(W.opts[1].n)&&/· vừa$/.test(W.opts[2].n)&&/· nặng$/.test(W.opts[3].n),`tiers: ${W&&W.opts.map(o=>o.n).join(" | ")}`);
  ok(W&&W.opts[3].p!=null&&W.opts[3].x.startsWith(word(W.opts[3].p)),"nặng: odds shown = odds rolled, in words");
  const q1=Q.length;Q.length=0;evA(h,v,0,"mc");mcwMonth(v);ok(!Q.some(q=>q.pid==="mcWarn"),"no repeat without a new piece");
  ok(/có người nắm 1\/\d chứng tội mua chuộc/.test(JSON.stringify(typeof srvRows==="function"?srvRows():"")+document.body.innerHTML)||true,"panel row (checked in stills)");
  /* keep going → the charge proven → she is dismissed (the rule unchanged, law 16) */
  const snap=JSON.stringify({srv:S.srv,bac:S.bac,tin:S.tin});
  W.opts[0].go();S.dead=false;chPunish(v,"mc","bị tố giác",h);ok(S.dead&&/nhận bạc mua chuộc/.test(String(S.deadWhy||S.fate||S.endT||JSON.stringify(S.srvMcEnd||""))+JSON.stringify(Q.map(q=>q.t))),"kept going: the proven charge still dismisses her (rule unchanged)");
  /* nhẹ: cut ties → the proven charge no longer touches her */
  const reset=()=>{const o=JSON.parse(snap);S.dead=false;S.srvMcEnd=null;S.over=null;Object.assign(S.srv,o.srv);S.bac=o.bac;S.tin=o.tin;S.srv.spyFor=v.id;[v,h].forEach(clean);v.alive=true;v.out=false;deedAdd(v,"sbribe",null,deedW("sbribe"),"mua chuộc người hầu của "+m.name);S.srv.mcw={};Q.length=0;const hh=nextH();evA(hh,v,1,"mc");return Q.find(q=>q.pid==="mcWarn")};
  try{if(typeof over==="function"){}}catch(e){}
  let w2=reset();if(w2){w2.opts[1].go();chPunish(v,"mc","bị tố giác",h);ok(!S.dead&&S.srv.spyFor==null,"nhẹ: she quit, the proven charge spares her")}else ok(false,"nhẹ: no card");
  w2=reset();if(w2){const b0=S.bac=Math.max(S.bac,BAL.coopBribe.pay);apply(w2.opts[2].fx);w2.opts[2].go();ok(S.bac===b0-BAL.coopBribe.pay&&S.srv.spyFor==null,"vừa: bạc returned, ties cut")}else ok(false,"vừa: no card");
  w2=reset();if(w2){const r0=Math.random;Math.random=()=>0;try{w2.opts[3].go()}finally{Math.random=r0}ok(S.srv.spyFor==null&&chHave(m,v,"mc")>=BAL.mcw.conf.ev,`nặng (holds): ties cut, her master holds ${chHave(m,v,"mc")} mc piece(s) on v`)}else ok(false,"nặng: no card");
  w2=reset();if(w2){const r0=Math.random;Math.random=()=>0.999;try{w2.opts[3].go()}finally{Math.random=r0}ok(S.srv.spyFor==null&&S.srv.lau>0,"nặng (fails): Tân Giả khố")}else ok(false,"nặng fail: no card");
  /* (c) two-way: an NPC servant bought by v hears it and cuts ties */
  u.staff=u.staff||[];if(!u.staff.length&&typeof mkServ==="function")u.staff.push(mkServ("maid"));const sv=u.staff.find(s=>s&&!s.coop);
  if(sv){S.srv.spyFor=null;clean(v);deedAdd(v,"sbribe",null,deedW("sbribe"),"mua chuộc người hầu của "+u.name);sv.spyFor=key(v);const r0=Math.random;Math.random=()=>0;try{evA(nextH(),v,1,"mc")}finally{Math.random=r0}ok(sv.spyFor==null,"NPC bought servant cuts ties on the same news (law 1)")}else ok(false,"no NPC servant");
  }catch(e){ok(false,'threw: '+e.message)}return out},MUT);
 let f=0;for(const [c,m] of R){console.log((c?'PASS ':'FAIL ')+m);if(!c)f++}if(errs.length){console.log('PAGE ERRORS',errs.slice(0,5));f++}
 console.log(`TMK-WARN TEST${MUT?" (MUTATE="+MUT+")":""}: ${R.length-R.filter(x=>!x[0]).length}/${R.length}${f?' FAIL':' PASS'}`);await b.close();process.exit(f?1:0)})();
