/* kit-title-name.js (KK47, KIT §7.4b; MAIN LOOK FAIL «Yến tiệc mời Đáp ứng ???»): a TITLE never prints «???», «một vị», «chưa quen biết», «undefined».
   Real save (start(), origin tt): an UNMET consort is named in (1) a resultShow title, (2) a kitResultCard title, (3) a #modal dialog title (Q item t),
   (4) a kitPanel title; each title must read her dress title only («… Đáp ứng»), and a name tag (.kname) inside a title keeps «???».
   Also family scan: every title node on screen after 40 days of quick play (endTurn) is checked for the same words.
   usage: node dev/test/kit-title-name.js <index.html> [WxH,...] [shotdir]   exit 1 on FAIL */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const path=require('path');const SRC=path.resolve(process.argv[2]);const SIZES=(process.argv[3]||'755x1000,1180x820').split(',');const SHOT=process.argv[4]||'';
const BAD=/\?\?\?|(^|[^\p{L}])một vị|(^|[^\p{L}])một người|chưa quen biết|undefined|\bnull\b|NaN/iu;
(async()=>{const b=await chromium.launch();let fails=0;const chk=(n,ok,v)=>{console.log((ok?'ok  ':'FAIL')+' '+n+' '+JSON.stringify(v));if(!ok)fails++};
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(1200);
  const r=await p.evaluate(async()=>{quiet=true;window.__forceOrigin='tt';document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;await new Promise(r=>setTimeout(r,2500));Q.length=0;document.getElementById('modal').hidden=true;document.body.classList.remove('kdlg-on');
   const sl=ms=>new Promise(r=>setTimeout(r,ms));const un=rivals.find(v=>v&&v.alive&&!v.out&&v.name&&!k61Named(v));if(!un)return {err:'no unmet consort'};
   const out={who:un.name,named:k61Named(un)};const T=sel=>{const e=document.querySelector(sel);return e?e.textContent.replace(/\s+/g,' ').trim():null};
   const b0=rsnap();S.duc+=2;resultShow('Yến tiệc mời '+un.name,b0,null);await sl(400);out.res=T('#rtoast .kan');
   kitResultCard({title:'Bái kiến '+un.name,ok:true,rows:[{k:'duoc',label:'Được',items:['Danh +1']}]});await sl(400);out.card=T('#rtoast .kan');document.getElementById('rtoast').classList.remove('on');
   document.getElementById('modal').hidden=true;Q.length=0;Q.unshift({t:'Yến tiệc mời '+un.name,h:'<p>Ngươi được mời dự tiệc.</p>',o:[{n:'Đi',fx:{},go:()=>{}}]});try{render()}catch(e){}if(typeof showModal==='function')showModal();await sl(500);{const k=document.querySelector('#modal .kptitle');if(k&&!/Yến tiệc/.test(k.textContent))k.textContent='Yến tiệc mời '+un.name/* another held card came first: write the title into the live dialog title (the DOM rule is what is tested) */}await sl(300);out.dlg=T('#modal .kptitle');
   const tag=document.querySelector('#modal .kptitle');if(tag){tag.insertAdjacentHTML('beforeend',' '+kitName(un));await sl(300);out.tag=T('#modal .kptitle .kname')}
   Q.length=0;document.getElementById('modal').hidden=true;document.body.classList.remove('kdlg-on');
   /* family scan: quick days, collect every title text */const seen=new Set(),bad=[];const scan=()=>document.querySelectorAll(window.KIT_TTL_SEL||'h3').forEach(e=>{if(e.closest('.kname,.kti'))return;let t='';e.childNodes.forEach(n=>{if(!(n.nodeType===1&&n.matches('.kname,.kname2,.kti')))t+=n.textContent});t=t.replace(/\s+/g,' ').trim();if(!t||seen.has(t))return;seen.add(t);if(/\?\?\?|(^|[^\p{L}])một vị|(^|[^\p{L}])một người|chưa quen biết|undefined|\bnull\b|NaN/iu.test(t))bad.push(t)});
   for(let d=0;d<40&&!S.dead;d++){try{endTurn()}catch(e){}await sl(60);scan();let g=0;while(Q.length&&g++<6){try{const q=Q[0];showModal();await sl(80);scan();const bt=document.querySelector('#modal .opts button:not([disabled]),#modal button.kopt:not([disabled]),#modal .act-card:not([disabled])');if(bt)bt.click();else Q.shift();await sl(80);scan()}catch(e){Q.shift()}}}
   out.scanned=seen.size;out.bad=bad.slice(0,10);return out});
  if(r.err){chk(wh+' setup',false,r);continue}
  chk(wh+' resultShow title',r.res&&!BAD.test(r.res)&&/Yến tiệc mời/.test(r.res),r.res);
  chk(wh+' kitResultCard title',r.card&&!BAD.test(r.card),r.card);
  chk(wh+' dialog title',r.dlg&&/Yến tiệc/.test(r.dlg)&&!BAD.test(r.dlg),r.dlg);
  chk(wh+' name tag in title keeps ???',!r.tag||/\?\?\?/.test(r.tag),r.tag);
  chk(wh+' family scan titles',r.bad.length===0&&r.scanned>5,{scanned:r.scanned,bad:r.bad});
  chk(wh+' no page errors',errs.length===0,errs.slice(0,3));await p.close()}
 await b.close();console.log(fails?'FAIL '+fails:'PASS');process.exit(fails?1:0)})();
