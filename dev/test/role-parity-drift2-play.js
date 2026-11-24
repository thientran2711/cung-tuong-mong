/* role-parity-drift-2 PLAY CHECK (law 1 TWO-WAY): the four act families behind the 12 rows that 98f9f0f1 (monthly-allotment) turned red are played
   as the player AND as an NPC, through the game's own functions (the button's handler for her, the agent option + AGRUN for an NPC):
   A. Lập phe cùng (cx3:facFound) — her Phe phái button at Hoàng hậu rank (facHTML → facAct "lap") and an NPC consort's agent option + run;
      the receiver's answer is her own choice (jrcv), so A reads it and plays «yes» (whole family both ways: dev/test/fac-parity-play.js).
   B. Trò chuyện với cung nữ (cx2:maidTalk) — the risen maid's card (jact) → maidTalkDo, and the risen NPC's agent option + AGRUN.
   C. Lén giữ đồ Nội vụ phủ phát (maid:pil) — the maid player's card (j42 srvCards, eitPilMaidOk → eitPilTake) and an NPC maid on her master's
      monthly goods (stipGoods → eitPilfer).
   D. «Chứng cứ N ›» (kchipb data-kev) — opens the evidence panel only (no state change): a view button, not an act.
   usage: node dev/test/role-parity-drift2-play.js [dev/index.html]  → exit 1 on FAIL */
const path=require('path');const {chromium}=require('playwright');const HTML=process.argv[2]||'dev/index.html';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
async function page(b,maid){const p=await b.newPage({viewport:{width:755,height:1000}});await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(u=>/^https?:/.test(u.href)||/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/.test(u.pathname),r=>r.abort());
 await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(maid=>{let sd=20261119;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();
  for(let i=0;i<60&&(maid?!isSrv():isSrv());i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{render()}catch(e){}},maid);return{p,errs}}
(async()=>{const b=await chromium.launch();
 /* ---- consort life: A (her) + A (NPC) + D ---- */
 {const {p,errs}=await page(b,false);
  /* facfound-parity: re-seed here — timers between the two page.evaluate calls used to eat a run-dependent number of draws, so the receiver's
     answer (a REAL choice, jrcv rcvPick: yes / qua loa / no / mách) flipped run to run; the rows now read that answer and play «yes» itself */
  const r=await p.evaluate(()=>{let sd=20261120;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};
   const RP=window.rcvPick;let REC=[];window.rcvPick=function(t,a){const c=RP.apply(this,arguments);REC.push({t,a,id:c&&c.id});return c};
   const o={};S.rank=7;S.queen=true;for(const x of rivals)if(x!==S)x.queen=false;S.kh=0;try{used=0}catch(e){}
   const t=liveRivals(true).find(v=>v!==S&&!v.out&&!facOf(v)&&!sameHouse(S,v));const K=k61S();if(K)K[kOf61(t)]=3;affAdd(t,S,40);
   const h=facHTML();o.btn=new RegExp('data-fa="lap" data-fv="'+t.id+'"[^>]*>[\\s\\S]*?Lập phe cùng '+t.name).test(h);o.dis=/data-fa="lap"[^>]*disabled/.test(h);
   REC=[];facAct("lap",{fv:String(t.id)});Q.length=0;const f=facOf(S);o.joined=!!(f&&facMembers(f).includes(t));o.name=f&&f.name;
   o.ans=REC.filter(x=>x.t===t&&x.a===S).map(x=>x.id);o.lapOk=o.ans.length===1&&o.joined===(o.ans[0]==="full");
   if(!o.joined){S.facs=[];RCVK.facFound.opts(S,t)[0].go()}o.yes=!!(facOf(S)&&facMembers(facOf(S)).includes(t));
   /* NPC consort: the same deed through her agent option (jagacts3 par3fac) and AGRUN */
   const v=liveRivals(true).find(x=>x!==S&&x!==t&&!x.out&&!facOf(x))||null;
   if(v){const y=liveRivals(true).find(x=>x!==S&&x!==t&&x!==v&&!x.out&&!facOf(x)&&!sameHouse(v,x));affAdd(v,y,60);v.p3FacM=-1;
    const N={};for(const k of Object.keys(agNeedsC(v)))N[k]=100;const opt=(AGREG.consort.par3fac(v,N,null)||[]).find(z=>z.k==="cx3:facFound");o.npcOpt=!!opt;
    if(opt){const tg=opt.t||y;REC=[];AGRUN["cx3:facFound"](v,tg);const g=facOf(v);o.npcJoined=!!(g&&facMembers(g).includes(tg));o.npcAns=REC.filter(x=>x.t===tg&&x.a===v).map(x=>x.id);
     o.npcOk=o.npcAns.length===1&&o.npcJoined===(o.npcAns[0]==="full");if(!o.npcJoined)RCVK.facFound.opts(v,tg)[0].go();o.npcYes=!!(facOf(v)&&facMembers(facOf(v)).includes(tg))}}
   /* D: the evidence chip only opens the panel */
   const e=liveRivals(true).find(x=>x!==S&&!x.out);e.ev=2;const card=rvCard(e,rivals.indexOf(e));o.chip=/<button class="chip hot kchipb" data-kev="\d+"[^>]*>[\s\S]*?Chứng cứ 2 ›<\/button>/.test(card);
   const snap=JSON.stringify({ev:e.ev,kh:S.kh,bac:S.bac,danh:S.danh});let opened=0;const P0=window.kitEvidencePanel;window.kitEvidencePanel=x=>{opened=x===e?1:0};
   const d=document.createElement('div');d.innerHTML=`<button class="chip hot kchipb" data-kev="${e.id}">Chứng cứ 2 ›</button>`;document.body.appendChild(d);d.firstChild.click();d.remove();window.kitEvidencePanel=P0;
   o.opened=opened;o.same=snap===JSON.stringify({ev:e.ev,kh:S.kh,bac:S.bac,danh:S.danh});window.rcvPick=RP;return o});
  ok(r.btn&&!r.dis,'A her: Hoàng hậu sees «Lập phe cùng» for a consort she knows who likes her (facHTML)',r);
  ok(r.lapOk&&r.yes,'A her: tapping it asks the consort (facAct "lap" → rcvAsk); she answers one of the 4, the faction exists only on yes; «Nhận lời lập phe» founds it',{ans:r.ans,joined:r.joined,yes:r.yes,name:r.name});
  ok(r.npcOpt&&r.npcOk&&r.npcYes,'A NPC: a consort weighs cx3:facFound (par3fac); AGRUN asks, the friend answers one of the 4; «Nhận lời» founds it',{opt:r.npcOpt,ans:r.npcAns,joined:r.npcJoined,yes:r.npcYes});
  ok(r.chip&&r.opened&&r.same,'D: «Chứng cứ 2 ›» is the kit chip that only opens the evidence panel (no state change)',{chip:r.chip,opened:r.opened,same:r.same});
  ok(!errs.length,'no page errors (consort life)',errs.slice(0,3));await p.close()}
 /* ---- maid life: B (her + NPC) + C (her + NPC) ---- */
 {const {p,errs}=await page(b,true);
  const r=await p.evaluate(()=>{const o={};
   /* C her: a sour maid (S.tin under BAL.eit.pil.loyal) with this month's Nội vụ phủ goods at her master's */
   const m=srvM();S.tin=Math.min(S.tin,BAL.eit.pil.loyal-15);S.srv.lau=0;S.srv.pilDet=null;S.srv.pilM=null;o.herOk=eitPilMaidOk();
   o.herCard=(srvCards()||[]).some(c=>c.n==="Lén giữ đồ Nội vụ phủ phát");const pk=eitPilPick(m);const n0=(m.inv||[]).length,b0=S.bac;o.herTake=eitPilTake(true);o.herGone=(m.inv||[]).length===n0-1&&!!pk;o.herBac=S.bac-b0;
   /* C NPC: an NPC maid, as sour, on her master's monthly goods (stipGoods → eitPilfer); the dice set to her side */
   const v=liveRivals(true).find(x=>x!==S&&x!==m&&!x.out&&(x.staff||[]).some(s=>s&&s.role==="maid"));const s=v.staff.find(z=>z&&z.role==="maid");
   for(const z of v.staff)if(z&&z!==s)z.loyal=100;if(v.maid&&v.maid!==s)v.maid.loyal=100;s.loyal=10;s.pilDet=null;o.npcWho=eitPilWho(v).some(c=>c.s===s&&c.ch>0);
   const pn=s.pilN||0;const R0=Math.random;Math.random=()=>0.001;try{stipGoods(v,false)}catch(e){o.err=String(e)}Math.random=R0;o.npcPil=(s.pilN||0)>pn;
   /* B her: risen maid (srvRise) talks with her own maid (jact card → maidTalkDo) */
   S.age=Math.max(S.age||0,18);srvRise("drift-2 play");o.risen=!isSrv();if(!S.maid)try{fillStaff(S,true)}catch(e){}
   if(S.maid){S.maid.loyal=40;const l0=S.maid.loyal;try{deal()}catch(e){}
    o.herTalkCard=(deck||[]).concat(window.pool?pool():[]).some(c=>c&&c.n==="Trò chuyện với cung nữ");maidTalkDo(S);o.herTalk=S.maid.loyal-l0}
   /* B NPC: a risen NPC maid (amRise) and her confidant maid under BAL.ag.cx2.maidTalk.below */
   const o2=liveRivals(true).find(x=>!x.out&&x!==S&&(x.staff||[]).some(z=>z&&z.role==="maid"));const mm=o2.staff.find(z=>z&&z.role==="maid");mm.sung=40;mm.loyal=80;
   amRise(mm,o2,"send");const n=rivals[rivals.length-1];if(!n.maid)try{fillStaff(n,true)}catch(e){}o.npcHasMaid=!!n.maid;
   if(n.maid){n.maid.loyal=BAL.ag.cx2.maidTalk.below-25;const N={};for(const k of Object.keys(agNeedsC(n)))N[k]=100;let opt=null;
    for(const g in AGREG.consort){try{const L=AGREG.consort[g](n,Object.assign({},N),"safe")||[];opt=opt||L.find(z=>z&&z.k==="cx2:maidTalk")}catch(e){}}o.npcTalkOpt=!!opt;
    const l0=n.maid.loyal;AGRUN["cx2:maidTalk"](n);o.npcTalk=n.maid.loyal-l0}
   return o});
  ok(r.herOk&&r.herCard,'C her: a sour maid sees «Lén giữ đồ Nội vụ phủ phát» (eitPilMaidOk + srvCards)',{ok:r.herOk,card:r.herCard});
  ok(r.herGone&&r.herBac>=0&&/lén giữ/.test(r.herTake),'C her: taking it removes the piece from her master and sells it',{take:r.herTake,bac:r.herBac});
  ok(r.npcWho&&r.npcPil,'C NPC: a sour NPC maid pilfers on her master\'s monthly goods (stipGoods → eitPilWho / eitPilfer)',{who:r.npcWho,pil:r.npcPil,err:r.err});
  ok(r.risen&&r.herTalkCard&&r.herTalk>0,'B her: the risen maid has «Trò chuyện với cung nữ» and it raises her maid\'s lòng',{card:r.herTalkCard,gain:r.herTalk});
  ok(r.npcHasMaid&&r.npcTalkOpt&&r.npcTalk>0,'B NPC: the risen NPC weighs cx2:maidTalk and AGRUN raises her maid\'s lòng',{maid:r.npcHasMaid,opt:r.npcTalkOpt,gain:r.npcTalk});
  ok(!errs.length,'no page errors (maid life)',errs.slice(0,3));await p.close()}
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:'ALL PASS');process.exit(f?1:0)})();
