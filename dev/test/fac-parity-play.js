/* facfound-parity PLAY CHECK (law 1 TWO-WAY, law 6b REAL PEOPLE): the whole Phe phái family, played as the player AND as an NPC, both ways
   (she → an NPC, an NPC → her, an NPC → an NPC), through the game's own functions (j10 facHTML/facAct for her, jagacts3 par3fac + AGRUN for an NPC,
   jrcv RCVK.* for every receiver's 4 answers; her answers = the PEND.rcvAsk card).
   Every ask (Lập phe cùng · Mời vào phe · Xin vào phe) is a REAL choice of the receiver (rcvPick: yes / qua loa / no / mách): a row checks that the
   receiver answered with one of the 4 and that the faction changed exactly when she said yes; a second row plays the «yes» answer itself.
   Math.random is re-seeded at the top of EVERY act (the old drift2-play rows drew from a sequence that timers between two page.evaluate calls had
   already consumed → the receiver's answer flipped run to run).
   usage: node dev/test/fac-parity-play.js [dev/index.html]  → exit 1 on FAIL */
const path=require('path');const {chromium}=require('playwright');const HTML=process.argv[2]||'dev/index.html';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(u=>/^https?:/.test(u.href)||/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/.test(u.pathname),r=>r.abort());
 await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{window.__seed=s=>{let sd=s;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646}};__seed(20261120);localStorage.clear();SLOT=4;
  document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{render()}catch(e){}});
 const r=await p.evaluate(()=>{const o={},K4=["full","half","no","sab"];
  /* helpers: a fresh world per act (no factions, she is Hoàng hậu with time), the receiver's answer counted by jrcv's own __rcvN */
 /* stat-pace (LIVE): the liking SETUP writes are exact (pace off for this test, as ag-moodknow / cold-faction; the paced rise has its own test dev/test/stat-pace.js) */window.SP_OFF=(window.SP_OFF||0)+1;
 /* review/oan-pace (merged onto LC28): the oán / ghét / ghen SETUP writes are exact too (as cold-faction / receiver-choice switch BAL.oanPace.on off for setup); the paced rise has its own test dev/test/oan-pace.js */if(BAL.oanPace)BAL.oanPace.on=0;
  const reset=s=>{__seed(s);S.facs=[];S.rank=7;S.queen=true;for(const x of rivals)if(x!==S)x.queen=false;S.kh=0;try{used=0}catch(e){}Q.length=0;
   for(const x of liveRivals(true))if(x!==S)x.p3FacM=-1};
  /* the receiver's answer: jrcv rcvPick wrapped (her own global), only the picks of THIS receiver to THIS asker are kept */
  const RP=window.rcvPick;let REC=[];window.rcvPick=function(t,a,O,kind){const c=RP.apply(this,arguments);REC.push({t,a,id:c&&c.id});return c};
  const pick=(t,a,f)=>{REC=[];const v=f();const k=REC.filter(x=>x.t===t&&x.a===a).map(x=>x.id);return{k,v}};
  const LG=window.log;let LOG=[];window.log=function(x){LOG.push(String(x));return LG.apply(this,arguments)};
  const L=()=>liveRivals(true).filter(x=>x!==S&&!x.out&&!sameHouse(S,x));
  const N=v=>{const n={};for(const k of Object.keys(agNeedsC(v)))n[k]=100;return n};
  const opt=(v,k)=>(AGREG.consort.par3fac(v,N(v),null)||[]).find(z=>z.k===k);
    /* her card for an NPC's ask: PEND.rcvAsk builds the 4 answers she taps (the same RCVK opts an NPC picks from) */
  const herCard=(k,a,x)=>PEND.rcvAsk({k,a:key(a),x:x==null?null:x});
  /* ---- 1. Lập phe cùng: she → NPC (facAct lap) ---- */
  reset(1);{const t=L()[0];const K=k61S();if(K)K[kOf61(t)]=3;affAdd(t,S,Math.max(40,netTh(t,"than")-aff(t,S)));/* parity-facfix: «likes her» = at least «thân» (a drawn start below 0 left +40 short) */const h=facHTML();
   o.lapBtn=new RegExp('data-fa="lap" data-fv="'+t.id+'"').test(h);const a=pick(t,S,()=>facAct("lap",{fv:String(t.id)}));
   o.lapAns=a.k;o.lapJoined=!!(facOf(S)&&facMembers(facOf(S)).includes(t));o.lapOk=a.k.length===1&&K4.includes(a.k[0])&&o.lapJoined===(a.k[0]==="full");
   reset(2);RCVK.facFound.opts(S,t)[0].go();o.lapYes=!!(facOf(S)&&facMembers(facOf(S)).includes(t))}
  /* ---- 2. Lập phe cùng: NPC → NPC (par3fac cx3:facFound + AGRUN) ---- */
  reset(3);{const v=L()[0],y=L().find(x=>x!==v&&!sameHouse(v,x));affAdd(v,y,Math.max(60,netTh(v,"than")-aff(v,y)));/* parity-facfix: at least «thân» */for(const x of L())if(x!==y)affAdd(v,x,-100);affAdd(v,S,-100);
   const op=opt(v,"cx3:facFound");o.nnOpt=!!op&&op.t===y;const a=pick(y,v,()=>AGRUN["cx3:facFound"](v,op?op.t:y));o.nnAns=a.k;
   o.nnOk=a.k.length===1&&(!!facOf(v)===(a.k[0]==="full"));reset(4);RCVK.facFound.opts(v,y)[0].go();o.nnYes=!!(facOf(v)&&facMembers(facOf(v)).includes(y))}
  /* ---- 3. Lập phe cùng: NPC → HER (law 1 reverse; was never sent: p3FacFr / j10 dropped her) ---- */
  reset(5);{const v=L()[0];affAdd(v,S,Math.max(60,netTh(v,"than")-aff(v,S)));/* parity-facfix: at least «thân» */for(const x of L())if(x!==v)affAdd(v,x,-100);
   const op=opt(v,"cx3:facFound");o.nhOpt=!!op&&op.t===S;const r=op?AGRUN["cx3:facFound"](v,S):"";o.nhSent=/rủ lập phe với ngươi/.test(String(r));
   const c=herCard("facFound",v);o.nhCard=!!c&&c.o.length===4&&c.o[0].n==="Nhận lời lập phe";Q.length=0;if(c){c.o[0].go()}o.nhYes=!!(facOf(v)&&facMembers(facOf(v)).includes(S))}
  /* ---- 4. Xin vào phe: she → NPC leader (facAct xin) and NPC → NPC leader (cx3:facJoin) ---- */
  reset(6);{const [l,m]=L();found(l,m);const f=facOf(l);affAdd(l,S,40);const a=pick(l,S,()=>facAct("xin",{ff:String(f.id)}));o.xinAns=a.k;o.xinOk=a.k.length===1&&(facOf(S)===f)===(a.k[0]==="full"||a.k[0]==="half");
   reset(7);found(l,m);const g=facOf(l);RCVK.facJoin.opts(S,l,g.id)[0].go();o.xinYes=facOf(S)===g;
   reset(8);found(l,m);const g2=facOf(l);const v=L().find(x=>x!==l&&x!==m&&!facOf(x));affAdd(v,l,60);const op=opt(v,"cx3:facJoin");o.njOpt=!!op;
   const a2=pick(l,v,()=>AGRUN["cx3:facJoin"](v,l));o.njAns=a2.k;o.njOk=a2.k.length===1&&(facOf(v)===g2)===(a2.k[0]==="full"||a2.k[0]==="half")}
  /* ---- 5. Xin vào phe: NPC → HER faction (law 1 reverse; p3FacJoin dropped factions she leads) ---- */
  reset(9);{const [m,v]=L();found(S,m);const f=facOf(S);o.herLead=facLeader(f)===S;affAdd(v,S,Math.max(60,netTh(v,"quen")-aff(v,S)));/* lr5: at least «quen» (p3FacJoin), as rows 1/3/5 — the drawn start on LIVE can sit below −(60 − quen) */const op=opt(v,"cx3:facJoin");o.hjOpt=!!op&&op.t===S;
   const r=op?AGRUN["cx3:facJoin"](v,S):"";o.hjSent=/xin vào phe của ngươi/.test(String(r));
   const c=herCard("facJoin",v,f.id);o.hjCard=!!c&&c.o.length===4&&c.o[0].n==="Nhận vào phe";Q.length=0;if(c)c.o[0].go();o.hjYes=facOf(v)===f}
  /* ---- 6. Mời vào phe: she → NPC (facAct moi) and an NPC leader → her (j10 rcvAsk facInvite, her card) ---- */
  reset(10);{const [m,t]=L();found(S,m);const f=facOf(S);const a=pick(t,S,()=>facAct("moi",{fv:String(t.id)}));o.moiAns=a.k;o.moiOk=a.k.length===1&&(facOf(t)===f)===(a.k[0]==="full");
   reset(11);found(m,t);const g=facOf(m);const rs=String(rcvAsk("facInvite",facLeader(g),S)||"");o.miSent=/mời vào phe ngươi/.test(rs);const c=herCard("facInvite",facLeader(g));
   o.miCard=!!c&&c.o.length===4;Q.length=0;if(c)c.o[0].go();o.miYes=facOf(S)===g}
  /* ---- 7. Rời phe · Bán đứng · Ly gián: her button and the NPC option + AGRUN ---- */
  reset(12);{const [a1,a2,a3,a4]=L();found(S,a1);joinFac(a2,facOf(S));facAct("roi",{});o.roiHer=!facOf(S);
   reset(13);found(a1,a2);joinFac(a3,facOf(a1));relAdd(a3,a1,-100);affAdd(a3,a1,-100);o.roiOpt=!!opt(a3,"cx3:facLeave");AGRUN["cx3:facLeave"](a3);o.roiNpc=!facOf(a3);
   reset(14);found(S,a1);joinFac(a2,facOf(S));facAct("ban",{});o.banHer=!facOf(S);
   reset(15);found(a1,a2);joinFac(a3,facOf(a1));affAdd(a3,a1,-100);o.banOpt=!!opt(a3,"cx3:facSell");AGRUN["cx3:facSell"](a3);o.banNpc=!facOf(a3);
   reset(16);found(a1,a2);joinFac(a3,facOf(a1));const f=facOf(a1);LOG=[];facAct("ly",{fv:"",ff:String(f.id)});o.lyHer=LOG.some(x=>/ly gián|chứng cứ|lộ/i.test(x));o.lyLog=LOG.slice(0,2);
   reset(17);found(S,a2);joinFac(a3,facOf(S));const g=facOf(S);for(const x of [S,a2,a3])oanAdd(a1,x,90);
   o.lyOpt=!!opt(a1,"cx3:facDiv");const rr=AGRUN["cx3:facDiv"](a1,S);o.lyNpc=typeof rr==="string"&&rr.length>0}
  window.rcvPick=RP;window.log=LG;return o});
 ok(r.lapBtn,'1 her→NPC: «Lập phe cùng» shows for a consort who likes her (facHTML)',r.lapBtn);
 ok(r.lapOk,'1 her→NPC: the NPC answers with one of the 4 (receiver choice); the faction exists only on «Nhận lời»',{ans:r.lapAns,joined:r.lapJoined});
 ok(r.lapYes,'1 her→NPC: «Nhận lời lập phe» founds the faction with her');
 ok(r.nnOpt&&r.nnOk,'2 NPC→NPC: a consort weighs cx3:facFound for her friend; AGRUN asks, the friend answers (faction only on yes)',{opt:r.nnOpt,ans:r.nnAns});
 ok(r.nnYes,'2 NPC→NPC: «Nhận lời lập phe» founds the faction');
 ok(r.nhOpt&&r.nhSent,'3 NPC→her: a consort who likes her weighs cx3:facFound WITH HER and AGRUN sends her the ask',{opt:r.nhOpt,sent:r.nhSent});
 ok(r.nhCard&&r.nhYes,'3 NPC→her: her card has the 4 answers; «Nhận lời lập phe» founds the faction with her',{card:r.nhCard,yes:r.nhYes});
 ok(r.xinOk&&r.xinYes,'4 her→NPC: «Xin vào phe» asks the leader (4 answers); yes puts her in',{ans:r.xinAns,yes:r.xinYes});
 ok(r.njOpt&&r.njOk,'4 NPC→NPC: cx3:facJoin asks the leader; she is in only on a yes',{opt:r.njOpt,ans:r.njAns});
 ok(r.herLead&&r.hjOpt&&r.hjSent,'5 NPC→her: a consort who likes her weighs cx3:facJoin for HER faction and AGRUN asks her',{lead:r.herLead,opt:r.hjOpt,sent:r.hjSent});
 ok(r.hjCard&&r.hjYes,'5 NPC→her: her card has the 4 answers; «Nhận vào phe» takes the consort in',{card:r.hjCard,yes:r.hjYes});
 ok(r.moiOk,'6 her→NPC: «Mời» asks the consort (4 answers); she joins only on yes',{ans:r.moiAns});
 ok(r.miSent&&r.miCard&&r.miYes,'6 NPC→her: an NPC leader\'s invitation is her 4-answer card; yes puts her in',{sent:r.miSent,card:r.miCard,yes:r.miYes});
 ok(r.roiHer&&r.roiOpt&&r.roiNpc,'7 Rời phe: her button and an NPC (cx3:facLeave) both leave',{her:r.roiHer,opt:r.roiOpt,npc:r.roiNpc});
 ok(r.banHer&&r.banOpt&&r.banNpc,'7 Bán đứng: her button and an NPC (cx3:facSell) both sell out',{her:r.banHer,opt:r.banOpt,npc:r.banNpc});
 ok(r.lyHer&&r.lyOpt&&r.lyNpc,'7 Ly gián: her button on an NPC faction, and an NPC with a grudge weighs cx3:facDiv on HER faction and runs it',{her:r.lyHer,log:r.lyLog,opt:r.lyOpt,npc:r.lyNpc});
 ok(!errs.length,'no page errors',errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:'ALL PASS');process.exit(f?1:0)})();
