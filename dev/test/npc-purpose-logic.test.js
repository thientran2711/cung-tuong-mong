/* NPC-PURPOSE LOGIC fixes (review-npc-purpose FAIL items 3 / 4 / 5 / 9 + should-fix): knowledge and clocks.
   3 a story clock restarts when its step fires (no monthly repeat after the wait)
   4 npcTell: only real knowers tell (npwIn = same palace / own tai mắt inside), the player never tells, a teller cd (o.cd) holds,
     the Thái hậu / Emperor path reads her Thái hậu regard / her Sủng (aff(w, S.thO) was always 0); raid needs an insider
   5 a maid learns an affair only when j95secApply recorded her at the tryst (s.trSaw), read by p3MaidMonth
   9 heirName = the Emperor's reckoning clock (no bare roll), restarts on fire; tyCall = the patient's need + cd; KV.deb now in BAL
   + jmind slip keeps the whole list (near-best weigh the same); npwPick {all} keeps minor habits
   usage: node dev/test/npc-purpose-logic.test.js [dev/index.html] → exit 1 on any FAIL */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const path=require('path');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 const r=await p.evaluate(()=>{const o={};const L=liveRivals(true).filter(v=>!v.queen);o.n=L.length;const W=BAL.ag.why;
  /* 3 */const st={};st.at_dad=wk()-W.story.wait.dad;o.s1=!!npcWhy("story",npw1Sc(st,"dad"));o.s2=st.at_dad===wk();o.s3=!npcWhy("story",npw1Sc(st,"dad"));
  /* 4 */delete S.npw;const a=L[0],c=L[1];for(const v of rivals){v.oan=0;v.ghen=0;v.rl={};v.rel=0;v.th=0}
  const tr0=hostility;hostility=(x,y)=>x===a&&y===c?90:0;
  o.t0=!npcTell(c,{from:[]});o.t1=!!npcTell(c,{from:[a]});o.tS=!npcTell(c,{from:[S]});
  o.t2=!!npcTell(c,{from:[a],cd:"tellJ75"});o.t3=!npcTell(c,{from:[a],cd:"tellJ75"});hostility=tr0;
  for(const v of rivals){v.oan=0;v.ghen=0;v.rl={};v.rel=0}const h0=hostility;hostility=()=>0;
  S.thO=S.thO||{};a.th=W.tell.friend+10;const th=npcTell(c,{from:[a],to:S.thO});o.th=th?th.why:null;a.th=0;o.th0=!npcTell(c,{from:[a],to:S.thO});
  a.sung=W.tell.friend+10;const em=npcTell(c,{from:[a],to:S.emp});o.em=em?em.why:null;hostility=h0;
  const In=npwIn(c);o.in=In.every(x=>sameHouse(x,c)||taiMatRaw(x).some(s=>ownerOf(s)===c))&&!In.includes(S)&&!In.includes(c);
  /* raid: an illegal piece, nobody inside her house → nobody tells (npwIn stubbed empty) */const in0=npwIn;npwIn=()=>[];const k=Object.keys(IT).find(x=>itm(x).il);
  if(k){c.inv=(c.inv||[]).concat([{k}]);delete S.npw;o.raid0=!npcWhy("raid",{p:c});npwIn=()=>[a];hostility=(x,y)=>x===a&&y===c?90:0;delete S.npw;const rd=npcWhy("raid",{p:c});o.raid1=!!rd&&rd.tgt===a;hostility=h0;c.inv=c.inv.filter(e=>e.k!==k)}else o.raid0=o.raid1="skip";npwIn=in0;
  /* 5 */o.m5="skip";try{const pr=[...amMaids()].find(([s,m])=>m!==S&&s!==S&&p3CnvOn(s));if(pr&&p3On()&&stf2On()){const [s,m]=pr;const v=liveRivals(true).find(x=>x!==m&&!x.out);v.affair=v.affair||1;
    const see0=W.p3.see,hi0=BAL.odds.hi;W.p3.see=100;BAL.odds.hi=100;/* roll() caps at BAL.odds.hi (95): lift it so the sighting check is not a 1-in-20 flake */const c0=window.cnvAffOpts;let n=0;window.cnvAffOpts=function(){n++;return c0.apply(this,arguments)};
    try{s.knowAff=[];s.trSaw=[];p3MaidMonth();const a0=n>0;s.trSaw=[v.id];p3MaidMonth();const a1=n>0;o.m5={a0,a1,left:(s.trSaw||[]).length}}finally{W.p3.see=see0;BAL.odds.hi=hi0;window.cnvAffOpts=c0}}}catch(e){o.m5="err "+e.message}
  /* 5b j95secApply records the servants at the spot */try{const z=j95z();const R=S.roster;if(R&&R.P){const sid=Object.keys(R.P).find(id=>/^s\d+$/.test(id));const v=liveRivals(true)[1];if(sid&&v){const sv=servById(+sid.slice(1));const k0=R.P[sid][1][0];sv.trSaw=[];
    const keep=z.sec;z.sec=[{a:"v"+v.id,b:null,c:R.c,kh:[1],k:k0,spot:"x",kind:"tryst",why:"t",wk:wk()}];try{j95secApply(R)}finally{z.sec=keep}o.sec=(sv.trSaw||[]).includes(v.id)}else o.sec="skip"}else o.sec="skip"}catch(e){o.sec="err "+e.message}
  /* 9 */const c9=[{k:{age:7},w:1}];S.kvHW=wk();delete S.npw;o.h0=!npcWhy("heirName",{wait:false,c:c9});S.kvHW=wk()-W.g3.heir.go;const hn=npcWhy("heirName",{wait:false,c:c9});o.h1=!!hn&&S.kvHW==null;
  S.kvHW=wk()-W.g3.heir.go;o.hw=!npcWhy("heirName",{wait:true,c:[{k:{age:6},w:1}]});
  delete S.npw;const pt=L[2]||L[0];pt.preg=1;const t1=npcWhy("tyCall",{sick:[pt]});const t2=npcWhy("tyCall",{sick:[pt]});o.ty=!!t1&&!t2;pt.preg=0;
  o.kv=typeof KV==="object"&&KV.deb===undefined&&W.g3.deb&&W.g3.deb.p>0;
  /* slip */const sl0=BAL.mind.slip;BAL.mind.slip=100;const hh=hostility,dg=window.danger;hostility=()=>90;try{window.danger=()=>90}catch(e){}try{let M=null,N=null;BAL.mind.slip=0;for(const x of L){for(const t of [S].concat(L)){if(t===x)continue;const q=mindMenu(x,t);if(q&&q.length>1){N=q.length;BAL.mind.slip=100;M=mindMenu(x,t);break}}if(M)break}o.slip=M?[N,M.length]:"skip"}finally{BAL.mind.slip=sl0;hostility=hh;try{window.danger=dg}catch(e){}}
  /* habits */let hit=0;for(let i=0;i<400;i++)if(npwPick([["a",10],["b",1]],y=>y[1],{all:1})[0]==="b")hit++;o.hab=hit;
  return o});
 ok(r.n>=2,'setup',r.n);
 ok(r.s1&&r.s2&&r.s3,'3 story clock: fires after its wait, restarts on fire, quiet right after',[r.s1,r.s2,r.s3]);
 ok(r.t0&&r.t1&&r.tS,'4 npcTell: nobody who knows → nobody tells; a knower with a grudge tells; the player is never a teller',[r.t0,r.t1,r.tS]);
 ok(r.t2&&r.t3,'4 npcTell o.cd: the same teller waits her cooldown',[r.t2,r.t3]);
 ok(/Thái hậu/.test(r.th||"")&&r.th0,'4 to the Thái hậu: her Thái hậu regard opens the path (was aff = 0, dead)',[r.th,r.th0]);
 ok(/Hoàng thượng/.test(r.em||""),'4 to the Emperor: her Sủng opens the path',r.em);
 ok(r.in,'4 npwIn = same palace or own tai mắt inside (never the subject, never the player)');
 ok(r.raid0===true&&r.raid1===true||r.raid0==="skip",'4 raid: no insider → no raid; an insider with a grudge → raid, teller named',[r.raid0,r.raid1]);
 ok(r.m5==="skip"||(r.m5&&r.m5.a0===false&&r.m5.a1===true&&r.m5.left===0),'5 maid learns an affair only from a recorded sighting (s.trSaw), consumed once',r.m5);
 ok(r.sec===true||r.sec==="skip",'5 j95secApply records the servants at the tryst spot and khắc',r.sec);
 ok(r.h0&&r.h1&&r.hw,'9 heirName: waits his reckoning, fires after g3.heir.go, restarts; slower while a đích son is small',[r.h0,r.h1,r.hw]);
 ok(r.ty,'9 tyCall: the patient with a need sends for him, once per cooldown');
 ok(r.kv,'9 KV.deb gone → BAL.ag.why.g3.deb');
 ok(r.slip==="skip"||r.slip[1]===r.slip[0],'jmind slip keeps the whole list (near-best weigh the same; was one option)',r.slip);
 ok(r.hab>10,'npwPick {all}: minor habits still happen',r.hab);
 const bot=await p.evaluate(()=>{const o={e:[]};for(let i=0;i<24&&!S.dead;i++){try{nextBuoi()}catch(e){o.e.push(e.message)}Q.length=0}return o});
 ok(!bot.e.length&&!errs.length,'bot 24 buổi: no errors',bot.e.concat(errs).slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?'FAIL npc-purpose-logic: '+f:'PASS npc-purpose-logic ('+res.length+' checks)');process.exit(f?1:0)})();
