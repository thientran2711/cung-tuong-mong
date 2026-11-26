/* RECEIVER-CARD HINT SCAN (law 3 + law 11, review help-housemate B1): every option of every card SHE answers as the receiver
   (PEND.rcvHelp · PEND.rcvAsk for every RCVK key · PEND.rcvJudge for every RCVJ key) goes through the kit hint (jk2b kitHint);
   an option whose «Được» reads «chẳng được gì» is a fault (law 3). Two passes: A = asker and third person are not the Hoàng hậu (the queen
   can be told: «Mách lẻo với Hoàng hậu»); B = the Hoàng hậu herself asks (nobody above to tell).
   OPEN (pre-existing on LIVE, a missing gain, not wording — needs a ruling, law 16): B rcvAsk:mediate «Mách lẻo» (gain «giữ mối oán» only).
   usage: node dev/tools/rcv-hint-scan.js [dev/index.html] → table; exit 1 when a row outside OPEN reads «chẳng được gì» */
const path=require('path');const HTML=process.argv[2]||'dev/index.html';
(async()=>{const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const R=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  if(S.selx2&&S.selx2.days)S.selx2.days=null;S.bac=500;
  const All=liveRivals(true).filter(x=>x!==S&&!x.out&&!x.coop);S.met=S.met||{};for(const v of All)S.met[v.id]=0;const V=All.filter(x=>!x.queen),q=All.find(x=>x.queen);
  const rows=[];const pass=(P,a,x)=>{const look=(card,title)=>{title=P+" "+title;if(!card||!card.o){rows.push({card:title,opt:"(no card built)",hint:""});return}
   for(const o of card.o){let h="";try{h=(kitHint(o,null,2)||{}).hint||""}catch(e){h="ERR "+e.message}rows.push({card:title,opt:o.n,x:String(o.x||"").replace(/<[^>]+>/g,"").slice(0,140),hint:String(h).replace(/<[^>]+>/g,"")})}};
  look(PEND.rcvHelp({a:a.id}),"rcvHelp");
  for(const k in RCVK){let c=null;try{c=PEND.rcvAsk({k,a:key(a),x:key(x)})}catch(e){}look(c,"rcvAsk:"+k)}
  for(const k in RCVJ){let c=null;try{c=PEND.rcvJudge({k,a:key(a),t:key(x)})}catch(e){}look(c,"rcvJudge:"+k)}
  };pass("A",V[0],V[1]);if(q)pass("B",q,V[0]);else rows.push({card:"B",opt:"(no Hoàng hậu in this world)",hint:""});return rows});
 const OPEN=new Set(["B rcvAsk:mediate · Mách lẻo"]);let bad=0;for(const r of R){const nm=r.card+' · '+r.opt.replace(/ với .*$/,'');const hit=/chẳng được gì/.test(r.hint),op=hit&&OPEN.has(nm),f=hit&&!op;if(f)bad++;console.log((f?'FAIL':op?'OPEN':'ok  ')+' '+r.card+' · '+r.opt+' → '+(r.hint||'')+(f?'   [x: '+r.x+']':''))}
 console.log(errs.length?'page errors: '+errs.slice(0,3).join(' | '):'no page errors');console.log(bad?bad+' option(s) read «chẳng được gì»':'RCV-HINT PASS');await b.close();process.exit(bad||errs.length?1:0)})();
