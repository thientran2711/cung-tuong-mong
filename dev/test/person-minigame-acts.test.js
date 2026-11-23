/* PERSON MINIGAME ACTS test (jpma, owner OD 19/11 ~23:55Z; plan dev/handover/reports/person-minigame-acts.md):
   (1) her ask → an NPC receiver answers with the card's own answers (Cùng chơi: Nhận lời / Từ chối; Thách đấu: + Nhường when outranked), all drawn;
   (2) HER card when an NPC asks her: every answer has a gain AND a cost (law 3), no % (law 7), odds only as a ladder word; saved (serQ → deserQ);
   (3) the three stakes have the same value V = BAL.pm.stake.bac[R] (bạc V · items within V·(1±band) · Danh·val.danhBac = V) (law 2);
   (4) a duel conserves bạc / Danh (what one loses the other gains), the item really moves (ledger S.il.log «pm»), memory remembers (jmem);
   (5) the popup (j2 talkOpts) and the Hậu cung card (j15 rvCard «Gặp mặt») both carry «Cùng chơi» / «Thách đấu»; same palace allowed (foreman Q1);
       a person she is not with → the button walks her there first (goSee), never remote;
   (6) NPC → NPC and NPC → her over ≥ 10 game days (the day plan, cx3:pmPlay / cx3:pmDuel), no page error;
   (7) co-op: the friend entry (coop:true) — both directions resolve through ACT.pmplay / ACT.pmduel inside the accepted ask (COOPW.inv), the ask text is
       the act's own (jcoopworld askWhat), the ASK list holds both;
   (8) old save: a save without S.pmM / S.pmGo / v.pmW loads and plays; (9) one core: no number typed in jpma.js outside BAL.pm, Emperor summons untouched.
   usage: node dev/test/person-minigame-acts.test.js [dev/index.html]  → exit 1 on FAIL */
const path=require('path');const fs=require('fs');const {execSync}=require('child_process');
const OW=require('./odds-words.js');/* ladder words from the ONE source j0 */
const HTML=process.argv[2]||'dev/index.html';const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{
 const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  window.kitNotice=undefined;window.ptOn=()=>false;/* her cards as queued dialogs (the notice path only delays the same card) */
  const out={};const V=liveRivals(true).filter(x=>x!==S&&!x.out&&!x.coop);const hi=V.filter(x=>rkOf(x)>rkOf(V[V.length-1]));const a=hi[0]||V[0],t=V.filter(x=>rkOf(x)<rkOf(a))[0]||V[1];
  /* (1) NPC receivers */const H={play:{},duel:{}};for(let i=0;i<300;i++){t.suc=90;a.suc=90;t.bac=500;a.bac=500;t.rl=t.rl||{};t.rl[a.id]=(i%9-4)*10;t.oan=0;
   const act=i%2?"duel":"play";const x=pmX(a,t,act,{s:"bac"});const rr=rcvAsk(act==="play"?"pmPlay":"pmDuel",a,t,x);const k=/từ chối/.test(rr)?"no":/nhường/.test(rr)?"yield":/thắng|chơi/.test(rr)?"yes":"?";H[act][k]=(H[act][k]||0)+1}out.H=H;
  /* (2) her card */Q.length=0;const xd=pmX(a,S,"duel",{s:"bac"});S.bac=Math.max(S.bac,200);rcvAsk("pmDuel",a,S,xd);const c=Q[0];out.card=c?c.opts.map(o=>({n:o.n,x:o.x})):null;
  const ser=serQ();const de=deserQ(JSON.parse(JSON.stringify(ser)));out.save={pid:ser[0]&&ser[0].pid,n:de[0]&&de[0].opts.length};Q.length=0;
  rcvAsk("pmPlay",a,S,pmX(a,S,"play"));out.card2=Q[0]?Q[0].opts.map(o=>({n:o.n,x:o.x})):null;Q.length=0;
  out.rankHi=rkOf(a)>rkOf(S);out.ladder=KIT_ODDS.slice();
  /* (3) stakes */const R=pmR(S,a),Vv=BAL.pm.stake.bac[R];const st=pmStakes(S,a);out.st={V:Vv,bac:st[0].V,ia:st[1].ia?ilVal(st[1].ia):null,it:st[1].it?ilVal(st[1].it):null,danh:st[2].d*BAL.pm.val.danhBac,band:BAL.pm.stake.band};
  /* (4) conservation + item + memory */const sum=k=>S[k]+liveRivals(true).filter(x=>x!==S).reduce((s,v)=>s+(v[k]||0),0);a.bac=500;t.bac=500;a.danh=60;t.danh=60;
  const b0=sum("bac");for(let i=0;i<20;i++)pmDuelEnd(a,t,{a:"duel",kind:"dauho",n:"Đầu hồ",s:"bac"},i%2===0,"home");out.bacCons=sum("bac")===b0;
  const d0=a.danh+t.danh;pmDuelEnd(a,t,{a:"duel",kind:"dauho",n:"Đầu hồ",s:"danh"},true,"home");out.danhMove=[d0,a.danh+t.danh,BAL.pm.duel];
  const IK=Object.keys(IT).find(k=>IT[k].pr>=Vv*.8&&IT[k].pr<=Vv*1.2&&!IT[k].evi&&!IT[k].keep&&!IT[k].il);if(IK){a.inv=a.inv||[];t.inv=t.inv||[];a.inv.push({k:IK});t.inv.push({k:IK})}
  const sti=pmStakeOf(a,t,"item");out.itemOk=!!(sti&&sti.ok);if(sti&&sti.ok){const e=sti.it,n0=(S.il&&S.il.log||[]).length;pmDuelEnd(a,t,{a:"duel",kind:"dauho",n:"Đầu hồ",s:"item"},true,"home");
   out.itemMoved=a.inv.includes(e)&&!t.inv.includes(e);out.itemLog=(S.il.log||[]).slice(n0).some(z=>z[5]==="pm")}
  pmPlayEnd(S,a,{a:"play",kind:"dauho",n:"Đầu hồ"},8,8);out.mem=typeof memTop==="function"?JSON.stringify(memTop(a,S)||[]):"?";
  /* (5) popup + Hậu cung card */const same=V.find(x=>sameHouse(S,x));const rows=v=>talkOpts({kind:"rival",ref:v}).filter(o=>o.pm).map(o=>o.n);out.pop=rows(a);out.popSame=same?rows(same):["n/a"];
  const i=rivals.indexOf(a);const h=rvCard(a,i);out.card3=(h.match(/data-pmgo="\d+" data-pma="(play|duel)"/g)||[]).length;out.walk=/đi đến chỗ nàng|chưa rõ nàng ở đâu/.test(h)||together(S,a);
  /* (6b) NPC → her through the SAME executor the day plan lands (it aims at her rarely: one of her ~10 neighbours, the world's pace) */
  {const me=[];const rc0=rcvCard;rcvCard=function(pid,pp,title,p){if(pp&&/^pm/.test(pp.k||""))me.push(pp.k);return rc0.apply(this,arguments)};Q.length=0;const v=a;v.pmW=null;S.pmMeW=null;
   AGRUN["cx3:pmPlay"](v,S);v.pmW=null;S.pmMeW=null;S.bac=Math.max(S.bac,200);v.bac=Math.max(v.bac||0,200);AGRUN["cx3:pmDuel"](v,S);rcvCard=rc0;out.exec=me;Q.length=0}
  /* (7) co-op friend entry */const f=Object.assign({},t,{id:9901,coop:true,name:"Hảo hữu",rl:{},ro:{},inv:[],bac:300,danh:50});rivals.push(f);window.COOPW=window.COOPW||{};const cw0=Object.assign({},window.COOPW);
  window.COOPW.on=false;window.COOPW.inv=1;const xc=pmX(S,f,"duel",{s:"bac"});S.bac=Math.max(S.bac,200);const bS=S.bac+f.bac;const r1=ACT.pmduel.f(S,f,xc);const r2=ACT.pmplay.f(f,S,pmX(f,S,"play"));
  out.coop={r1,r2,cons:S.bac+f.bac===bS,ask:typeof ACT_NOSEND!=="undefined"&&ACT_NOSEND.includes("pmplay")&&ACT_NOSEND.includes("pmduel")};
  /* (7b) foreman E #14 ruling (3): the friend's duel card offers «Nhường bề trên» when the asker outranks the reader (as with an NPC), not otherwise;
     the answer «yield» runs pmYield inside the accepted ask (COOPW.yd): the reader pays the stake, no game, bạc conserved */
  {const r0=S.rank,f0=f.rank;const cardN=()=>{try{return (PEND.thInv({id:"t7b",k:"pmduel",who:"Hảo hữu",v:f.id}).o||[]).map(o=>o.n)}catch(e){return["ERR "+e.message]}};
   S.rank=1;f.rank=3;const up=cardN();S.rank=3;f.rank=1;const low=cardN();
   const xy=pmX(S,f,"duel",{s:"bac"});const bY=S.bac+f.bac,sb=S.bac;window.COOPW.inv=1;window.COOPW.yd=true;const ry=ACT.pmduel.f(S,f,xy);window.COOPW.yd=false;
   out.coopY={up,low,ry,gain:S.bac-sb,V:pmV(S,f),cons:S.bac+f.bac===bY};S.rank=r0;f.rank=f0}Object.assign(window.COOPW,cw0);window.COOPW.inv=0;rivals.splice(rivals.indexOf(f),1);
  /* (10) review r1 fixes (r2): 1+2 the friend's card = the NPC card with her pick x; 3 NPC practice = addArtP; 4 receiver weights own key; 5 walk on her card; 6 wording */
  {const f2=Object.assign({},t,{id:9902,coop:true,name:"Hảo hữu",rl:{},ro:{},inv:[],bac:300,danh:50});rivals.push(f2);S.bac=Math.max(S.bac,200);
   const xs=pmX(f2,S,"duel",{s:"bac"});const c7=PEND.thInv({id:"t10",k:"pmduel",who:"Hảo hữu",v:f2.id,x:xs});const c8=PEND.thInv({id:"t10b",k:"pmplay",who:"Hảo hữu",v:f2.id,x:pmX(f2,S,"play")});
   out.fc={h:c7&&String(c7.t),o:c7&&c7.o.map(o=>[o.n,o.x]),hp:c8&&String(c8.t),op:c8&&c8.o.map(o=>[o.n,o.x]),n:xs.n,X:pmCoopX("pmduel",JSON.parse(JSON.stringify(xs)))};rivals.splice(rivals.indexOf(f2),1)}
  {const ak=(ARTS.find(z=>typeof KG82_PLAIN==="object"&&KG82_PLAIN[z.k])||ARTS[0]).k;const v=V.find(x=>x.arts&&x.arts[ak]!=null&&x.arts[ak]<4)||V[0];v.arts=v.arts||{};if(v.arts[ak]==null)v.arts[ak]=1;v.artp=v.artp||{};const l0=v.arts[ak];v.artp[ak]=l0+1;
   const st=(ARTS.find(z=>z.k===ak)||{}).st;const s0=v[st]||0;let called=0;const a0=window.addArtP;window.addArtP=function(){called++;return a0.apply(this,arguments)};
   try{pmPlayEnd(v,a,{a:"play",kind:KG82_PLAIN[ak]||"dauho",ak,n:"x"},8,8)}finally{window.addArtP=a0}out.xp={ak,l0,l1:v.arts[ak],st,s0,s1:v[st]||0,called}}
  out.rk={pm:BAL.rcv.k.pm,off:BAL.pm.rcvOff,help:BAL.rcv.k.help};
  {const far=V.find(x=>!together(S,x))||a;const xx=pmX(far,S,"play");Q.length=0;rcvAsk("pmPlay",far,S,xx);const q=Q[0];out.walkPlay=q?q.opts[0].x:null;Q.length=0;
   rcvAsk("pmDuel",far,S,pmX(far,S,"duel",{s:"bac"}));out.walkDuel=Q[0]?Q[0].opts[0].x:null;Q.length=0;out.farTc=travel(S.place,whereOf(far))}
  {const h=rvCard(a,rivals.indexOf(a));out.btnX=(h.match(/data-pmgo[^>]*>[\s\S]*?<\/button>/g)||[]).join(" ").replace(/<[^>]+>/g," ");out.rowX=pmRows(a).map(o=>o.x);
   const pk=PEND.pmPick({v:a.id,a:"duel"});out.pickX=pk?pk.o.filter(o=>o.x).map(o=>o.x):[];
   const n0=S.logs.length;Q.length=0;const v=a;v.pmW=null;S.pmMeW=null;S.pmMeN=0;const r=AGRUN["cx3:pmPlay"](v,S);out.runR=r;Q.length=0}
  /* (9) Emperor summons untouched (law 16): the functions still exist and run */out.ts=typeof tsSummonKind==="function"&&typeof tsSummonOdds==="function"&&typeof tsSummonGo==="function";
  return out});
 const L=r.ladder;const lad=x=>L.some(w=>x.startsWith(w+" ·")||x===w);
 ok(r.H.play.yes>0&&r.H.play.no>0&&!r.H.play["?"],'NPC receiver of «Cùng chơi»: Nhận lời and Từ chối both drawn (rcvPick)',r.H.play);
 ok(r.H.duel.yes>0&&r.H.duel.no>0&&r.H.duel.yield>0&&!r.H.duel["?"],'NPC receiver of «Thách đấu» (outranked): Nhận lời, Nhường, Từ chối all drawn',r.H.duel);
 ok(r.card&&r.card.length>=2&&r.card.every(o=>/(được|thành):/.test(o.x)&&/(mất|hỏng):/.test(o.x)),'her duel card: every answer has a gain AND a cost (law 3)',r.card);
 ok(r.card2&&r.card2.length===2&&r.card2.every(o=>/được:/.test(o.x)&&/mất:/.test(o.x)),'her pastime card: Nhận lời / Từ chối, each gain + cost',r.card2);
 ok([...(r.card||[]),...(r.card2||[])].every(o=>!/%|phần trăm/.test(o.x)),'no % on any answer (law 7)');
 ok(r.card&&lad(r.card[0].x),'the accept row shows her chance as a ladder word only',r.card&&r.card[0].x);
 ok(r.save.pid==="rcvAsk"&&r.save.n>=2,'a pending pm card survives serQ → deserQ',r.save);
 ok(r.st.bac===r.st.V&&r.st.danh>=r.st.V-r.st.V*r.st.band&&r.st.danh<=r.st.V+r.st.V*r.st.band&&(r.st.ia==null||Math.abs(r.st.ia-r.st.V)<=r.st.V*r.st.band)&&(r.st.it==null||Math.abs(r.st.it-r.st.V)<=r.st.V*r.st.band),'three stakes of equal value V (law 2)',r.st);
 ok(r.bacCons,'duels conserve bạc (the stake moves, nothing is minted)');
 ok(r.itemOk&&r.itemMoved&&r.itemLog,'an item stake really changes hands, written in the item ledger (law 6c)',{ok:r.itemOk,moved:r.itemMoved,log:r.itemLog});
 ok(/pmplay/.test(r.mem),'the pastime is remembered (jmem pmplay)',r.mem.slice(0,160));
 ok(r.pop.length===2&&r.popSame.length===2,'popup rows «Cùng chơi» + «Thách đấu», also inside the same palace',{pop:r.pop,same:r.popSame});
 ok(r.card3===2&&r.walk,'Hậu cung card: both buttons in «Gặp mặt», bound to walking to her (goSee) or her place unknown',{n:r.card3,walk:r.walk});
 ok(/thắng|ván/.test(r.coop.r1)&&r.coop.cons&&r.coop.ask,'co-op friend: the accepted duel resolves by both hands, bạc conserved; both acts are ask acts',r.coop);
 ok(r.coopY&&r.coopY.up.includes('Nhường bề trên')&&!r.coopY.low.includes('Nhường bề trên')&&/nhường/.test(r.coopY.ry)&&r.coopY.gain===r.coopY.V&&r.coopY.cons,'co-op friend card: «Nhường bề trên» when the asker outranks (same as NPC), the yield pays the stake, bạc conserved',r.coopY);
 ok(r.fc.h&&r.fc.h.includes(r.fc.n)&&/Cược:/.test(r.fc.h)&&r.fc.o&&r.fc.o[0][0]==='Nhận lời thách đấu'&&lad(r.fc.o[0][1])&&/thành:/.test(r.fc.o[0][1])&&/hỏng:/.test(r.fc.o[0][1])&&r.fc.o.some(o=>o[0]==='Từ chối'&&/được:/.test(o[1])&&/mất:/.test(o[1])),'r2 fix 2: the friend\'s duel card = the NPC card (game, stake, ladder word, gain + cost)',r.fc);
 ok(r.fc.hp&&r.fc.hp.includes('chơi')&&r.fc.op&&r.fc.op[0][0]==='Nhận lời'&&/được:/.test(r.fc.op[0][1])&&/mất:/.test(r.fc.op[0][1])&&!/đi sang/.test(r.fc.hp+JSON.stringify(r.fc.op)),'r2 fix 2: the friend\'s pastime card = the NPC card, no walk line for the co-op friend',{h:r.fc.hp,o:r.fc.op});
 ok(r.fc.X&&r.fc.X.kind&&r.fc.X.n===r.fc.n&&'s' in r.fc.X,'r2 fix 1: her pick survives the JSON carrier (pmCoopX)',r.fc.X);
 ok(r.xp.called>=1&&r.xp.l1===r.xp.l0+1&&r.xp.s1>r.xp.s0,'r2 fix 3: NPC practice goes through addArtP (level-up gives the stat as for anyone)',r.xp);
 ok(Array.isArray(r.rk.off)&&r.rk.pm.every((w,i)=>w===(r.rk.off.includes(i)?0:r.rk.help[i]))&&r.rk.pm[3]===0,'r2 fix 4: BAL.rcv.k.pm = help weights, slots BAL.pm.rcvOff off (own key)',r.rk);
 ok(r.farTc>0&&/mất: Sức [^·]*, \d+ khắc$/.test(r.walkPlay||"")&&/tốn: \d+ khắc ·/.test(r.walkDuel||""),'r2 fix 5 / r3 fix A: her invite / challenge card shows the walk as a plain «N khắc» cost (the kit word mode keeps it; dev/test/pm-wordmode.test.js scans every pm option)',{tc:r.farTc,play:r.walkPlay,duel:r.walkDuel});
 ok(!/có thể (nhận lời|từ chối)/.test(r.btnX+r.rowX.join(" "))&&r.pickX.every(x=>!/\)$/.test(x)&&new RegExp('^(?:'+OW.ALT+') · nàng bậc').test(x)),'r2 fix 6a: labelled segments only (no stray «nàng có thể từ chối», the level note before the labels)',{btn:r.btnX.slice(0,300),row:r.rowX,pick:r.pickX});
 ok(!/[.]\s*$/.test(r.runR||"")&&!/\.\./.test(r.runR+"."),'r2 fix 6b: the day-plan line has one full stop when logged',r.runR);
 ok(r.ts,'Emperor summons (jts tsSummon*) still in place');
 /* (6) NPC day plan over ≥ 10 days (fresh page) */
 const p2=await b.newPage();p2.on('pageerror',e=>errs.push(e.message));/* a seeded Math.random for the 200-buổi day plan (the role-parity-scan idiom): the world it starts from is the same each run */await p2.addInitScript(()=>{let s=7;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646}});await p2.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());await p2.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p2.waitForTimeout(2500);
 const d=await p2.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;window.__agAll=1;quiet=false;Q.length=0;
  const me=[];const rc0=rcvCard;rcvCard=function(pid,pp,title,p){if(pp&&/^pm/.test(pp.k||""))me.push(pp.k);return rc0.apply(this,arguments)};const t0=[S.year,S.month,S.tuan];let n=0;
  for(let i=0;i<200&&!S.dead;i++){Q.length=0;S.mg=null;nextBuoi();n++}const sim={n,t0,t1:[S.year,S.month,S.tuan],by:{play:AG3.stat.by.pmPlay||0,duel:AG3.stat.by.pmDuel||0},me:me.slice()};
  sim.S={dead:!!S.dead,out:!!S.out,conf:S.confined||0,srv:typeof isSrv==="function"&&isSrv()};return sim});
 ok(d.by.play+d.by.duel>=2,'NPC → NPC over ≥ 10 game days (day plan cx3:pmPlay / cx3:pmDuel land)',d);
 ok(r.exec.includes("pmPlay")&&r.exec.includes("pmDuel"),'NPC → her: the day-plan deed reaches her as her answer card (both acts)',{exec:r.exec,simMe:d.me,S:d.S});
 /* foreman E #14 ruling (2) 20/11: law 1 two-way + 6b — over 200 buổi NPCs really invite / challenge HER (≥ 4, BAL.pm.npc.meK) and NPC → NPC still lands (≥ 4) */
 const nMe=d.me.length,nNpc=d.by.play+d.by.duel-nMe;ok(d.n>=200&&nMe>=4&&nNpc>=4,'NPC → her ≥ 4 in 200 buổi, NPC → NPC still lands (≥ 4)',{buoi:d.n,me:nMe,npc:nNpc,kinds:d.me});
 /* (8) old save */
 const o=await p2.evaluate(()=>{try{window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;Q.length=0;delete S.pmM;delete S.pmGo;delete S.pmMeW;delete S.pmMeN;for(const v of rivals)delete v.pmW;save();const d=loadSlot(SLOT);quiet=true;deser(d);quiet=false;render();
  const v=liveRivals(true).find(x=>x!==S&&!x.out);return{ok:!!S&&!S.dead&&!!d,rows:talkOpts({kind:"rival",ref:v}).filter(z=>z.pm).length,st:pmStakes(S,v).length}}catch(e){return{err:e.message}}});
 ok(o.ok&&o.rows===2,'an old save without the pm fields loads and offers the acts',o);
 ok(!errs.length,'no page errors',errs.slice(0,3));
 /* (9) one core: jpma.js types no number of its own (only 0 / 1 / indices / 100-odds / 7 the top rank / 2 halves) */
 const src=fs.readFileSync(path.join(__dirname,'../build/jpma.js'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'').replace(/`[^`]*`/g,m=>m.replace(/\$\{[^}]*\}/g,'')).replace(/"[^"]*"/g,'""');
 const nums=(src.match(/(?<![\w.$])\d+(\.\d+)?(?![\w])/g)||[]).filter(n=>!["0","1","2","5","7","10","100","9901","2166136261","16777619","4294967296"]/* FNV-1a hash constants (pmHash), not balance */.includes(n));
 ok(nums.length===0,'one core: no stray number in jpma.js (all in BAL.pm)',nums);
 let tsDiff="";try{tsDiff=execSync('git diff --stat origin/main -- dev/build/jts.js',{cwd:path.join(__dirname,'../..')}).toString().trim()}catch(e){tsDiff="(no origin/main)"}
 ok(!tsDiff,'jts.js (Emperor summons) unchanged vs origin/main (law 16)',tsDiff);
 await b.close();const fail=res.filter(x=>!x).length;console.log(fail?`FAIL ${fail}/${res.length}`:`PASS ${res.length}/${res.length}`);process.exit(fail?1:0)})();
