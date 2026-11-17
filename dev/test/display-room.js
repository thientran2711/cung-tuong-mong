/* KIT §87 kitDisplayRoom test (owner 17/11): Nơi trưng bày full-screen between the top bar and the bottom bar; iPad (kv2) 2 cols x 6 shelves, phone 1 col x 12;
   tap a shelf -> drawer with only that group's pieces; tap piece -> kit item card -> Trưng bày -> placed + drawer closes; tap placed -> Cất xuống; read-only has no drawer.
   HOST mode (built root index.html through rot.js, the real design canvas; dev/test/README.md). Fixture mode (no jshelf API needed). CDN pictures via curl (sandbox).
   usage: node dev/test/display-room.js <url> <outdir|-> [device,...]  (default fold,ipadAir,ipadPro,foldLand)  -> JSON per device; exit 1 on FAIL */
const {chromium}=require('playwright');const D=require('./lib/device');const {execFileSync}=require('child_process');const [,,URL,OUT,SZ]=process.argv;const devs=(SZ||'fold,ipadAir,ipadPro,foldLand').split(',');
const cdn={};const {execFile}=require('child_process');const pcurl=u=>new Promise(res=>execFile('curl',['-sSf','-m','30',u],{encoding:'buffer',maxBuffer:60e6},(e,o)=>res(e?null:o)));
async function viaCurl(ctx){await ctx.route(/ctm-img\.victoria-tntt\.workers\.dev/,async r=>{const u=r.request().url();if(!(u in cdn))cdn[u]=pcurl(u);const body=await cdn[u];if(!body)return r.abort();r.fulfill({status:200,body,contentType:u.endsWith('.json')?'application/json':'image/webp',headers:{'access-control-allow-origin':'*'}})})}
(async()=>{const b=await chromium.launch();let bad=0;const all={};
 for(const sz of devs){const ctx=await D.newDeviceContext(b,sz,{reducedMotion:'reduce'});await viaCurl(ctx);
  const pg=await ctx.newPage();pg.setDefaultTimeout(30000);const errs=[];pg.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  const fr=await D.openHost(pg,URL);const p={evaluate:(...a)=>fr.evaluate(...a),click:(...a)=>fr.click(...a),$:(...a)=>fr.$(...a),waitForTimeout:(n)=>pg.waitForTimeout(n),screenshot:(o)=>pg.screenshot(o)};
  const W=sz,H='';await fr.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf{display:none!important}'});await fr.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:120000});await p.waitForTimeout(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await p.waitForTimeout(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s){start()}return s});if(!srv)break}
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('.kroul,#kroul,#kcoach,.kcoach,.kcf,#kcf,.kflip,#kflip').forEach(e=>e.remove());try{S.tutDone=1}catch(e){}tab='act';render()});await p.waitForTimeout(1200);
  const r={};
  r.apiHidden=await p.evaluate(()=>!document.querySelector('#krail [data-rail=disp]')||typeof shelfOf==='function'); /* no jshelf on main: rail icon must stay hidden */
  r.noFixtureOpen=await p.evaluate(()=>{kitDisplayRoomOpen(S);return !document.getElementById('kdr')});
  await p.evaluate(()=>kitDisplayRoomOpen(S,{fixture:true}));await p.waitForTimeout(500);
  const geo=()=>p.evaluate(()=>{const q=e=>{const r=e.getBoundingClientRect();return{l:Math.round(r.left),t:Math.round(r.top),r:Math.round(r.right),b:Math.round(r.bottom),w:Math.round(r.width),h:Math.round(r.height)}};
   const k=document.getElementById('kdr');const hud=document.querySelector('header.hud'),bar=document.querySelector('nav.bar');const sh=[...k.querySelectorAll('.kdr-sh')];
   const cols=new Set(sh.map(e=>Math.round(e.getBoundingClientRect().left))).size;const sc=k.querySelector('.kdr-sc');
   const imgs=sh.filter(e=>e.classList.contains('has')).map(e=>q(e.querySelector('.kdr-it')));
   const frames=k.querySelectorAll('.kdr-it').length&&[...k.querySelectorAll('.kdr-it')].some(i=>i.closest('.kitem'));
   return{room:q(k),hud:q(hud),bar:q(bar),n:sh.length,cols,placed:sh.filter(e=>e.classList.contains('has')).length,scrolls:sc.scrollHeight>sc.clientHeight+1,hscroll:document.documentElement.scrollWidth>innerWidth+1,imgs,frames,kv2:document.documentElement.classList.contains('kv2'),title:k.querySelector('.kdr-cart').textContent,
    cut:sh.some(e=>{const a=e.querySelector('.kdr-lab').getBoundingClientRect(),s=e.getBoundingClientRect();return a.right>s.right+1})}});
  r.geo=await geo();const g=r.geo;
  r.fit=g.room.t>=g.hud.b-1&&g.room.b<=g.bar.b+1&&g.room.b>=g.bar.t-6&&!g.hscroll;
  r.layout=g.n===12&&(g.kv2?(g.cols===2&&!g.scrolls):g.cols===1);
  if(OUT&&OUT!=='-')await p.screenshot({path:`${OUT}/disp-${sz}.jpg`,type:'jpeg',quality:60});
  /* drawer */
  await p.click('.kdr-sh:not(.has)');await p.waitForTimeout(350);
  r.drawer=await p.evaluate(()=>{const d=document.getElementById('kdrdrw');if(!d||d.hidden)return null;const sel=document.querySelector('.kdr-sh.sel');const gname=sel&&sel.querySelector('.kdr-lab').textContent;const t=[...d.querySelectorAll('[data-kdrix]')];const rc=d.getBoundingClientRect(),kr=document.getElementById('kdr').getBoundingClientRect();
   return{g:gname,head:d.querySelector('.kdr-dh b').textContent,tiles:t.length,inside:rc.left>=kr.left-1&&rc.right<=kr.right+1&&rc.bottom<=kr.bottom+1&&rc.top>=kr.top,x:!!d.querySelector('.kit-x'),lux:t.every(e=>e.querySelector('.kitlux,.kluxc,[class*=lux]')||/xa xỉ/i.test(e.title)),h:Math.round(rc.height)}});
  if(OUT&&OUT!=='-')await p.screenshot({path:`${OUT}/disp-${sz}-drawer.jpg`,type:'jpeg',quality:60});
  /* tap piece -> card -> Trưng bày */
  const before=await p.evaluate(()=>document.querySelectorAll('.kdr-sh.has').length);
  await p.click('#kdrdrw [data-kdrix]');await p.waitForTimeout(400);
  r.card=await p.evaluate(()=>{const f=document.getElementById('kidfl');return f?[...f.querySelectorAll('button')].map(x=>x.textContent.replace(/\s+/g,' ').trim().slice(0,24)):null});
  const act=await fr.waitForSelector('#kidfl [data-kidact=put]',{timeout:8000}).catch(()=>null);if(act)await act.click();await p.waitForTimeout(450);await fr.waitForFunction(()=>!document.getElementById('kidfl'),null,{timeout:8000}).catch(()=>{});
  r.placed=await p.evaluate(b=>({now:document.querySelectorAll('.kdr-sh.has').length,before:b,drawerClosed:document.getElementById('kdrdrw').hidden,cardClosed:!document.getElementById('kidfl')}),before);
  /* tap placed -> drawer shows Đang bày -> Cất xuống */
  await p.click('.kdr-sh.has');await p.waitForTimeout(350);
  r.on=await p.evaluate(()=>!!document.querySelector('#kdrdrw [data-kdron]'));
  await p.click('#kdrdrw [data-kdron]');await p.waitForTimeout(350);
  const take=await fr.waitForSelector('#kidfl [data-kidact=take]',{timeout:8000}).catch(()=>null);r.take=!!take;if(take)await take.click();await p.waitForTimeout(450);await fr.waitForFunction(()=>!document.getElementById('kidfl'),null,{timeout:8000}).catch(()=>{});
  r.taken=await p.evaluate(b=>document.querySelectorAll('.kdr-sh.has').length===b,before);
  /* close by ✕ */
  await p.click('#kdr [data-kdrx]');await p.waitForTimeout(250);r.closed=await p.evaluate(()=>!document.getElementById('kdr'));
  /* read-only (NPC room) */
  await p.evaluate(()=>{const o=(typeof liveRivals==='function'?liveRivals(true):[])[0]||{name:'Nàng',id:-9};kitDisplayRoomOpen(o,{fixture:true})});await p.waitForTimeout(300);
  r.ro=await p.evaluate(()=>{const k=document.getElementById('kdr');return{ro:k.dataset.ro==='1',title:k.querySelector('.kdr-cart').textContent}});
  await p.click('.kdr-sh').catch(()=>{});await p.waitForTimeout(250);r.roNoDrawer=await p.evaluate(()=>{const d=document.getElementById('kdrdrw');return !d||d.hidden});
  await p.evaluate(()=>kitDisplayRoomClose());
  r.errs=errs;
  const ok=r.apiHidden&&r.noFixtureOpen&&r.fit&&r.layout&&!g.frames&&!g.cut&&r.drawer&&r.drawer.tiles>0&&r.drawer.inside&&r.drawer.x&&Array.isArray(r.card)&&r.card.some(t=>/Trưng bày/.test(t))&&r.placed.now===before+1&&r.placed.drawerClosed&&r.placed.cardClosed&&r.on&&r.take&&r.taken&&r.closed&&r.ro.ro&&r.roNoDrawer&&!errs.length;
  r.verdict=ok?'PASS':'FAIL';if(!ok)bad++;all[sz]=r;await ctx.close()}
 console.log(JSON.stringify(all,null,1));await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
