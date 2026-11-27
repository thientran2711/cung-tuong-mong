/* HELP-HOUSEMATE gate (law 1 two-way, law 11 whole family; MAIN 159 26/11 12:55Z «FOR D: help-housemate» = YES):
   every «Nhờ giúp đỡ» entry point runs the ONE rule helpAsk (jrcv: the receiver picks one of the 4 answers; her «Lời nhờ» card when SHE is asked).
   (1) her «Cùng cung» list (housemate, j9 topicOpts same-house filter) has the «Nhờ giúp đỡ» card — an NPC may ask a housemate (cx2:help, no sameHouse filter);
   (2) her talk-menu «Nhờ giúp đỡ» (rival / housemate / Hoàng hậu) calls helpAsk(S,v) — not the old jaudit loan/tell copy (BAL.audit.loan, 50/50);
       its lock = the NPC pick rule (receiver likes the asker ≥ netTh «thân»), the number printed from netTh, never a typed 30;
   (3) an NPC's cx2:help may pick HER as the one to ask (was dropped by t!==S) → her «Lời nhờ» card (PEND.rcvHelp); one asker never stacks two waiting cards;
   (4) the Hoàng hậu talk list has the card too (an NPC may ask the queen).
   usage: node dev/test/help-housemate.test.js [dev/index.html] → exit 1 on FAIL or page error */
const path=require('path');const HTML=process.argv[2]||'dev/index.html';const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{
 const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  window.kitNotice=undefined;if(BAL.ptime)BAL.ptime.on=0;const out={};
  const V=liveRivals(true).filter(x=>x!==S&&!x.out&&!x.coop&&!x.queen);S.met=S.met||{};const K61=k61S();for(const x of V.concat(consorts().filter(y=>y&&y.queen))){S.met[x.id]=0;if(K61)K61[kOf61(x)]=3}/* met and named: the stranger gate (j61) is not what this gate tests */const th=v=>netTh(v,"than");const like=(v,n)=>{v.rel=n};/* aff(v,S) = v.rel */
  let calls=[];const h0=window.helpAsk;window.helpAsk=helpAsk=function(a,t){calls.push([a===S?"S":a.id,t===S?"S":t.id]);return h0.apply(this,arguments)};
  /* LIVE act-merge (jdoor): her talk list folds «Nhờ giúp đỡ» into the «Giao hảo» door when ≥ 2 members stand; the card is read from the RAW list
     (doorRaw, the one the door card PEND.door lists) and reach(v) proves the tap path: a plain button, or a door whose members hold it */
  const raw=(v,kind)=>(typeof doorRaw==="function"?doorRaw({kind:kind||"rival",ref:v}):talkOpts({kind:kind||"rival",ref:v}))||[];
  const card=(v,kind)=>raw(v,kind).find(a=>a.n==="Nhờ giúp đỡ");
  const reach=(v,kind)=>{const F=talkOpts({kind:kind||"rival",ref:v})||[];if(F.some(a=>a.n==="Nhờ giúp đỡ"))return "button";const d=F.find(a=>a.door&&(a.m||[]).some(x=>x.n==="Nhờ giúp đỡ"));return d?"door:"+d.n:null};
  const press=(a)=>{calls=[];try{(a.run||a.go)()}catch(e){out.err=String(e)}return calls.slice()};
  /* (2) a rival she is not housed with */const v=V.find(x=>!sameHouse(S,x));like(v,th(v)+10);v.bac=500;const c=card(v);out.rival={has:!!c,reach:reach(v),lock:c&&c.lock,calls:c?press(c):null,x:c&&c.x};
  like(v,th(v)-10);const cl=card(v);out.lock={lock:cl&&cl.lock,t:cl&&cl.t,th:th(v)};
  /* (1) a housemate: move v into her palace */let hm=V.find(x=>x!==v&&sameHouse(S,x));if(!hm){/* she lodges under an NPC palace head h (jpal palHostOK), and so does hm */const h=consorts().find(x=>x&&x!==S&&x!==v&&!x.out&&palHostOK(x));hm=V.find(x=>x!==v&&x!==h&&rkOf(x)<PAL_HEAD);if(h&&hm){if(rkOf(S)>=PAL_HEAD)S.rank=PAL_HEAD-1;S.resHead=key(h);hm.resHead=key(h)}}try{if(typeof netMemoClr==="function")netMemoClr()}catch(e){}
  out.same=sameHouse(S,hm);like(hm,th(hm)+10);hm.bac=500;const ch=card(hm);out.hreach=reach(hm);const L=talkOpts({kind:"rival",ref:hm}).map(a=>a.n);out.house={has:!!ch,calls:ch?press(ch):null,list:L};
  /* (4) the Hoàng hậu */const q=typeof queenP==="function"?queenP():null;if(q&&q!==S){like(q,th(q)+10);q.bac=500;const cq=card(q,"hh");out.hh={has:!!cq,reach:reach(q,"hh"),calls:cq?press(cq):null}}else out.hh={none:1};
  /* (3) NPC cx2:help picks HER: she is the only one who likes the asker enough */window.helpAsk=helpAsk=h0;const a=V.find(x=>x!==v&&x!==hm&&(x.bac=0,(agNeedsG(x).bac||0)>0))||V[0];/* one who needs silver (a rich head has no bac need) */
  for(const x of consorts())if(x!==a&&x!==S){x.rl=x.rl||{};x.rl[a.id]=-50}S.rl[a.id]=th(S)+30;a.bac=0;
  const N=agNeedsG(a);let nS=0,n=0;for(let i=0;i<40;i++){const O=AGREG.consort.cx2(a,N,"bac")||[];const o=O.find(z=>z.k==="cx2:help");if(o){n++;if(o.t===S)nS++}}out.pick={n,nS};
  Q.length=0;S.rcvPend=[];AGRUN["cx2:help"](a,S);out.card1=Q.filter(d=>d.pid==="rcvHelp").length;out.cardOpts=(Q.find(d=>d.pid==="rcvHelp")||{opts:[]}).opts.map(o=>o.n);
  let n2=0;for(let i=0;i<40;i++){const O=AGREG.consort.cx2(a,N,"bac")||[];const o=O.find(z=>z.k==="cx2:help");if(o&&o.t===S)n2++}out.pickWait=n2;Q.length=0;
  return out});
 ok(r.rival.has&&!!r.rival.reach&&!r.rival.lock&&r.rival.calls&&r.rival.calls.length===1&&r.rival.calls[0][0]==="S",'(2) her talk «Nhờ giúp đỡ» (rival) runs helpAsk(S,v) once',r.rival);
 ok(r.lock.lock&&new RegExp('quý ngươi '+r.lock.th+' ').test(r.lock.t||"")&&!/thiện cảm 30/.test(r.lock.t||""),'(2) lock = receiver likes her ≥ netTh «thân», number from netTh',r.lock);
 ok(r.same&&r.house.has&&!!r.hreach&&r.house.calls&&r.house.calls.length===1&&r.house.calls[0][0]==="S"&&r.house.list.includes("Cùng cung"),'(1) her «Cùng cung» list has «Nhờ giúp đỡ» → helpAsk(S,housemate)',Object.assign({same:r.same,reach:r.hreach},r.house));
 ok(r.hh.none||(r.hh.has&&!!r.hh.reach&&r.hh.calls&&r.hh.calls.length===1),'(4) the Hoàng hậu talk list has «Nhờ giúp đỡ» → helpAsk',r.hh);
 ok(r.pick.n>0&&r.pick.nS===r.pick.n,'(3) NPC cx2:help may ask HER (she is the only one liking the asker ≥ «thân»)',r.pick);
 ok(r.card1===1&&r.cardOpts.length===4,'(3) cx2:help on her → her «Lời nhờ» card with the 4 answers',r.cardOpts);
 ok(r.pickWait===0,'(3) the same asker does not ask her again while her card waits',r.pickWait);
 ok(!errs.length&&!r.err,'no page errors',errs.slice(0,3).concat(r.err||[]));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:'ALL PASS');process.exit(f?1:0)})();
