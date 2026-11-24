/* maid-mis-away (law 1, law1-audit row 10; role-parity open gap «maid:beside N-ONLY»): the player maid's talk with her master follows the ONE
   rule of an NPC maid (jagstaff asOpts): «Đấm lưng / Xin chủ ban thưởng / Bẩm tin / Xin chủ tiến cử» only while her master is in her own palace
   (asMisHome); met anywhere else → «Hầu bên cạnh chủ» (SRVA.beside), as an NPC maid does.
   usage: node dev/test/maid-mis-away.js [dev/index.html]   → exit 1 on FAIL or page error */
const {chromium}=require('playwright');const path=require('path');const HTML=process.argv[2]||'dev/index.html';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(u=>/^https?:/.test(u.href)||/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/.test(u.pathname),r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{let sd=20261124;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&!isSrv();i++)start();window.__nlInner=0;quiet=true;
  const m=srvM();if(!m)return{err:'no master'};const pal=palaceOf(m);const card={sk:"mis",kind:"srv",ref:m};const names=()=>srvTalk(card).map(o=>o.n);
  const W0=window.srvWhere;let at=pal;window.srvWhere=function(v){return v===m?at:W0.apply(this,arguments)};
  const home=names(),homeNpc=asMisHome(m);const away0=places().map(x=>x.k).find(k=>k!==pal&&k!=="home");at=away0;const away=names(),awayNpc=asMisHome(m);window.srvWhere=W0;
  return{srv:isSrv(),home,away,homeNpc,awayNpc,awayAt:away0}});
 const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
 const TO=['Đấm lưng, hầu chuyện','Xin chủ ban thưởng','Bẩm tin dò được','Xin chủ tiến cử lên Nội vụ phủ'];
 ok(r.srv,'a maid life started',r.err);
 ok(r.homeNpc&&TO.every(n=>r.home.includes(n))&&!r.home.includes('Hầu bên cạnh chủ'),'master in her palace: the four «to the master» acts (NPC maid: same, asMisHome true)',r.home);
 ok(!r.awayNpc&&TO.every(n=>!r.away.includes(n))&&r.away.includes('Hầu bên cạnh chủ'),'master away ('+r.awayAt+'): only «Hầu bên cạnh chủ» (NPC maid: beside, asMisHome false)',r.away);
 ok(!errs.length,'no page errors',errs.slice(0,3));await b.close();
 const pass=res.every(Boolean);console.log(pass?'MAID-MIS-AWAY PASS':'MAID-MIS-AWAY FAIL');process.exit(pass?0:1)})();
