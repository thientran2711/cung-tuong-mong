/* TAG RANK / NAME SCAN (fig-feet-crop-2 add-on, owner 17/11 "Kính sự phòng là cái phẩm hả?", OD:L1351).
   Every figure tag in the game has TWO lines: line 1 = the person's RANK / post grade, line 2 = the bare NAME. The office or place (Kính sự phòng, Thái y viện, Tân Giả khố…)
   is the dialog title, never the rank line; the rank is never repeated inside the name line. Lists the tag of EVERY kind of person (the player, Hoàng thượng, Thái hậu, queen, consorts, children,
   eunuchs, maids, staff, S.court tq / ksp / ped / ty, S.maid, court men, bare NPCs) from the three tag sources:
     tag = the v3 frame / pendant tag (kszRankName), col = the 32.7 column tag (kitName, .kname .kti + name), and the printed pair must be the same in both.
   FAIL: line 1 empty (except a person with no rank word at all), line 1 an office / place word, line 2 starting with a title word, line 1 ≠ the column tag's rank, line 2 ≠ its name.
   usage: node dev/test/tag-rank-scan.js <url> [--table]   exit 1 on any FAIL */
const {chromium}=require('playwright');const [,,URL,FLAG]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block',reducedMotion:'reduce'});const p=await ctx.newPage();p.setDefaultTimeout(240000);
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<400;i++){start();if(!isSrv())break}window.__nlInner=0});await sleep(1500);
 const rows=await p.evaluate(()=>{const L=[];const add=(g,w)=>{if(w)L.push([g,w])};add('player',S);add('emperor',S.emp);S.thO=S.thO||{};add('thai-hau',S.thO);const rv=rivals||[];rv.slice(0,4).forEach(v=>add(v.queen?'queen':'consort',v));
  (rv.flatMap(v=>v.kids||[]).concat(S.kids||[])).slice(0,3).forEach(k=>add('child',k));try{allServ().forEach(s=>add(s.eid?'staff':s.role==='maid'?'maid':'eunuch',s))}catch(e){}
  const C=S.court||{};['tq','ksp','ped','ty'].forEach(x=>add('court-'+x,C[x]));add('S.maid',S.maid);(S.men||[]).forEach(m=>add('man',m));
  add('npc',{kind:'npc',name:'Quản sự Tân Giả khố',ini:'Quản',info:'Quản sự'});add('npc',{kind:'npc',name:'Phế phi họ Lý',ini:'Lý',info:'Phế phi'});add('npc',{kind:'npc',name:'Thầy dạy Thượng thư phòng',ini:'Thầy'});
  add('npc',{__cap:'Tiểu Lý Tử',__role:'Thái giám',age:28,sex:'m'});
  const T=/^(tổng quản|thái giám|cung nữ|thái y|ma ma|cô cô|thị vệ|nữ quan|nhũ mẫu|nhạc sư|họa sư|vương gia|hoàng tử|công chúa|phế phi|quản sự)\b/i,OFF=/(phòng|viện|cung|điện|các|phủ|khố|đường|sảnh|môn|ty)$/i;
  return L.map(([g,w])=>{let r='',n='',cr='',cn='',err='';try{[r,n]=kszRankName(w)}catch(e){err='kszRankName '+e.message}
   try{const h=kitName(w,{});const d=document.createElement('div');d.innerHTML=h;const t=d.querySelector('.kti');cr=t?t.textContent.trim():'';cn=d.textContent.trim();if(cr&&cn.startsWith(cr))cn=cn.slice(cr.length).trim()}catch(e){err+=' kitName '+e.message}
   const why=[];if(err)why.push(err);const noRank=g==='npc'&&!r&&!cr;
   if(!r&&!noRank&&g!=='npc')why.push('rank line empty');if(r&&OFF.test(r))why.push('rank line is an office / place');if(n&&T.test(n)&&r)why.push('name line starts with a title word');
   if(r&&cr&&r!==cr)why.push('v3 tag rank ≠ column tag rank');if(n&&cn&&cn!=='???'&&n!==cn&&!(g==='player'))why.push('v3 tag name ≠ column tag name');
   return{g,r,n,cr,cn,why:why.join('; ')}})});
 await b.close();let bad=0;rows.forEach(x=>{if(x.why)bad++;if(x.why||FLAG==='--table')console.log(`${x.why?'FAIL':'ok  '} ${x.g.padEnd(9)} L1="${x.r}" L2="${x.n}"  | column: "${x.cr}" / "${x.cn}" ${x.why}`)});
 console.log(bad?`TAG-RANK-SCAN FAIL · ${bad} of ${rows.length}`:`TAG-RANK-SCAN OK · ${rows.length} tags`);process.exit(bad?1:0)})();
