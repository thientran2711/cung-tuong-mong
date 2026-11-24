/* coop-house-unit (robot-coop-fix-3 r4, law 6b REAL PEOPLE + identity): the friend's HOUSE rides her pos relay (jcoopworld houseWire/houseIn)
   and no seat's own palFix (jpal, wrapped by jcoophl) re-houses her entry or rewrites a housing number neither seat changed.
   Runs the real palFix / houseIn on a solo page with the seat set to the host ("a") and then the guest ("b"); no network.
   Root (robot10-coop A/B fix-3 r2 «guest sees host at r5, host is at r902»): the viewer's palFix housed the friend's entry like an NPC (an
   over-cap house evicts «the newest extra», a re-picked side hall), so palaceOf(her entry) said r5 while she lives in the viewer's house.
   usage: python3 dev/build/assemble.py && node dev/test/coop-house-unit.js */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820}});await serve(ctx);const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(BASE,{timeout:0,waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function'&&window.COOPW&&COOPW.houseIn&&COOPW.friendHouse&&typeof palFix==='function',null,{timeout:0});
 await p.evaluate(()=>{document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});
 await p.waitForFunction(()=>typeof S==='object'&&S&&S.name&&Array.isArray(rivals)&&rivals.length>4,null,{timeout:60000});
 const R=await p.evaluate(()=>{const out=[];const ck=(n,ok,i)=>out.push([n,!!ok,i==null?"":JSON.stringify(i).slice(0,300)]);
  const CW=COOPW,H=CW.X.HOUSE,J=x=>JSON.parse(JSON.stringify(x));Q.length=0;
  const on0=CW.on,seat0=CW.seat,fpos0=CW.fpos,log0=log;let logs=[];log=function(t){logs.push(String(t));return log0.apply(this,arguments)};
  const hsOf=v=>H.map(f=>v[f]==null?null:v[f]);const npcs=()=>rivals.filter(v=>v&&!v.coop&&v.alive&&!v.out),allN=()=>rivals.filter(v=>v&&!v.coop);
  const npcSig=()=>JSON.stringify(allN().map(v=>[v.id].concat(hsOf(v))));
  ck('ONE house list: jcoophl reads CW.X.HOUSE (no typed copy)',Array.isArray(H)&&H.join()==="resHead,resHall,pal,palLone,palWait",H);
  /* the scene: S = a chủ vị (Tần, own palace) with a full house of NPCs; the friend = one rival entry {coop:true} living in S's house */
  const setup=(seat)=>{CW.on=true;CW.seat=seat;const fid=seat==="a"?902:901;
   for(let i=rivals.length-1;i>=0;i--)if(rivals[i]&&rivals[i].coop)rivals.splice(i,1);
   S.rank=Math.max(S.rank,3);if(S.pal==null)S.pal=PALN.findIndex((_,i)=>!rivals.some(v=>v.pal===i));S.resHead=null;S.resHall=null;
   palFix();/* settle the solo world first */
   const low=npcs().filter(v=>rkOf(v)<3&&!v.queen);const cap=resCap();
   /* fill S's house to the cap with NPCs (the friend comes on top: the house is over the cap on this seat) */
   for(const v of low.slice(0,cap)){v.resHead="me";v.resHall=null;v.pal=null;v.palLone=0}palFix();
   const t=low[cap]||low[0];const f=J(t);f.id=fid;f.coop=true;f.name="Bạn Hiền";f.rank=Math.min(f.rank,2);f.alive=true;f.out=false;f.queen=false;delete f.pal;
   rivals.push(f);return f};
  for(const seat of ["a","b"]){logs=[];const f=setup(seat);const SEAT=seat==="a"?"host":"guest";
   /* her relay (what her own seat sends: canon ids, "me" = her pid → her house is MY house = my pid) */
   const myPid=seat==="a"?901:902;const relay={resHead:myPid,resHall:BAL.res.halls[0],pal:null,palLone:0,palWait:0};
   CW.fpos={name:f.name,hs:J(relay),week:0,buoi:S.buoi||0,place:"home"};
   const ch=CW.houseIn(f,J(relay));ck(SEAT+': houseIn puts her relayed house on her entry (my pid → "me")',ch&&f.resHead==="me"&&f.resHall===BAL.res.halls[0],hsOf(f));
   ck(SEAT+': palaceOf(her entry) = "home" (she lives in my house)',palaceOf(f)==="home",palaceOf(f));
   /* identity: a 2nd houseIn of the same relay changes nothing (no write, returns false) */
   const sig0=JSON.stringify(hsOf(f));ck(SEAT+': same relay again = no write',CW.houseIn(f,J(relay))===false&&JSON.stringify(hsOf(f))===sig0,hsOf(f));
   /* houseIn writes ONLY her entry */
   const n0=npcSig();CW.houseIn(f,{resHead:5,resHall:"tay",pal:null,palLone:0,palWait:0});CW.houseIn(f,J(relay));ck(SEAT+': houseIn touches no NPC housing',npcSig()===n0,null);
   /* palFix on this seat (render / month / deser): over-cap house, she is on top → before r4 she was evicted and re-housed (r5) */
   palFix();const nA=npcSig(),mineA=JSON.stringify(CW.houseWire());
   ck(SEAT+': palFix keeps her relayed house (never evicted / re-housed)',JSON.stringify(hsOf(f))===sig0&&palaceOf(f)==="home",{f:hsOf(f),pl:palaceOf(f)});
   ck(SEAT+': no log line about her on my seat',!logs.some(t=>t.indexOf(f.name)>=0),logs.filter(t=>t.indexOf(f.name)>=0));
   /* identity: palFix again and again with nothing changed on either seat → no housing number rewritten (NPCs, hers, mine) */
   palFix();palFix();palFix();
   ck(SEAT+': palFix ×3 with nothing changed: NPC housing identical',npcSig()===nA,null);
   ck(SEAT+': palFix ×3: her housing identical',JSON.stringify(hsOf(f))===sig0,hsOf(f));
   ck(SEAT+': palFix ×3: my own house (houseWire → posKey) identical',JSON.stringify(CW.houseWire())===mineA,CW.houseWire());
   /* her entry re-housed by anything else on this seat → keepFriendPos (every place step) puts her relayed house back, S.where follows */
   f.resHead=null;f.resHall=null;S.where=S.where||{};CW.fpos.week=-1;CW.keepFriendPos();
   ck(SEAT+': keepFriendPos restores her house and her place = home',f.resHead==="me"&&S.where[f.id]==="home",{f:hsOf(f),w:S.where[f.id]});
   /* a reborn friend (other name): the old relay never lands on the new entry */
   f.name="Người Khác";f.resHead=null;CW.friendHouse();ck(SEAT+': another life: old relay not applied',f.resHead==null,hsOf(f));
   rivals.splice(rivals.indexOf(f),1)}
  /* solo: no coop entry → palFix exactly as before (no friend, CW.on false): identity on a settled world */
  CW.on=false;CW.seat=seat0;palFix();const s1=npcSig();palFix();ck('solo: palFix identity (no coop entry, nothing moves)',npcSig()===s1,null);
  CW.on=on0;CW.seat=seat0;CW.fpos=fpos0;log=log0;return out});
 let bad=0;for(const [n,ok,i] of R){if(!ok)bad++;console.log((ok?'ok  ':'FAIL')+' '+n+(ok?'':' '+i))}
 if(errs.length){bad++;console.log('FAIL page errors',errs.slice(0,3))}console.log(`\n${R.length-bad}/${R.length} passed`);await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
