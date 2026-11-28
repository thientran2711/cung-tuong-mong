/* KIT §87 kitDisplayRoom test (owner 17/11): Đa Bảo Các full-screen between the top bar and the bottom bar; iPad (kv2) 2 cols x 6 shelves, phone 1 col x 12;
   tap a shelf -> drawer with only that group's pieces; tap piece -> kit item card -> Trưng bày -> placed + drawer closes; tap placed -> Cất xuống; read-only has no drawer.
   HOST mode (built root index.html through rot.js, the real design canvas; dev/test/README.md). Fixture mode (no jshelf API needed). CDN pictures via curl (sandbox).
   usage: node dev/test/display-room.js <url> <outdir|-> [device,...]  (default fold,ipadAir,ipadPro,foldLand)  -> JSON per device; exit 1 on FAIL */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const D=require('./lib/device');const {execFileSync}=require('child_process');const [,,URL,OUT,SZ]=process.argv;const devs=(SZ||'fold,ipadAir,ipadPro,foldLand').split(',');
const cdn={};const {execFile}=require('child_process');const pcurl=u=>new Promise(res=>execFile('curl',['-sSf','-m','30',u],{encoding:'buffer',maxBuffer:60e6},(e,o)=>res(e?null:o)));
async function viaCurl(ctx){await ctx.route(/ctm-img\.victoria-tntt\.workers\.dev/,async r=>{const u=r.request().url();if(!(u in cdn))cdn[u]=pcurl(u);const body=await cdn[u];if(!body)return r.abort();r.fulfill({status:200,body,contentType:u.endsWith('.json')?'application/json':'image/webp',headers:{'access-control-allow-origin':'*'}})})}
(async()=>{const b=await chromium.launch();let bad=0;const all={};
 for(const sz of devs){const ctx=await D.newDeviceContext(b,sz,{reducedMotion:'reduce'});await viaCurl(ctx);
  const pg=await ctx.newPage();pg.setDefaultTimeout(30000);const errs=[];pg.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  const fr=await D.openHost(pg,URL);const p={evaluate:(...a)=>fr.evaluate(...a),click:(...a)=>fr.click(...a),$:(...a)=>fr.$(...a),waitForTimeout:(n)=>pg.waitForTimeout(n),screenshot:(o)=>pg.screenshot(o)};
  const W=sz,H='';await fr.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf{display:none!important}'});await fr.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:120000});await p.waitForTimeout(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await p.waitForTimeout(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s){try{nlNew()}catch(e){}start()}return s});if(!srv)break}
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
  r.inslot=await p.evaluate(()=>[...document.querySelectorAll('.kdr-sh.has')].every(s=>{const a=s.getBoundingClientRect(),i=s.querySelector('.kdr-it').getBoundingClientRect();return i.left>=a.left-2&&i.right<=a.right+2&&i.bottom<=a.bottom+2&&i.top>=a.top-2}));r.multi=await p.evaluate(()=>{const m=[...document.querySelectorAll('.kdr-sh')].filter(s=>s.querySelectorAll('.kdr-it').length>1);return m.length>0&&m.every(s=>{const r=[...s.querySelectorAll('.kdr-it')].map(i=>i.getBoundingClientRect()).sort((a,b)=>a.left-b.left);return r.every((x,i)=>i===0||x.left>=r[i-1].right-2)})});r.sil=await p.evaluate(()=>{const k=document.getElementById('kdr');const sil=k.querySelectorAll('.kdr-sil').length,pcs=k.querySelectorAll('.kdr-it').length,gl=[...k.querySelectorAll('.kdr-glow')];return{sil,pcs,glow:gl.length,sum:sil+pcs===60,glowAnim:gl.every(i=>getComputedStyle(i).animationName==='none'),silPtr:[...k.querySelectorAll('.kdr-sil')].every(i=>getComputedStyle(i).pointerEvents==='none')}});r.noBars=await p.evaluate(()=>{const s=document.querySelector('.kdr-seg');const pl=s&&s.querySelector('.kdr-plank');return !!s&&(s.querySelector('.kdr-bgi')?getComputedStyle(pl).display==='none':true)});
  r.layout=r.inslot&&r.sil.sum&&r.sil.glow===3&&r.sil.glowAnim&&r.sil.silPtr&&r.multi&&r.noBars&&g.n===12&&(g.kv2?(g.cols===2&&!g.scrolls):g.cols===1);
  r.sets=await p.evaluate(()=>{const k=document.getElementById('kdr'),f=k.querySelector('.kdr-sets');if(!f)return null;const kr=k.getBoundingClientRect(),fr=f.getBoundingClientRect(),sc=k.querySelector('.kdr-sc').getBoundingClientRect(),rows=[...f.querySelectorAll('.kdr-set')];
   return{rows:rows.length,kinds:rows.map(x=>x.className.replace('kdr-set kdr-s-','')).join(','),inside:fr.left>=kr.left-1&&fr.right<=kr.right+1&&fr.bottom<=kr.bottom+1,belowCab:fr.top>=sc.bottom-1,h:Math.round(fr.height),calm:getComputedStyle(f.querySelector('.kdr-s-on .kdr-sd')).animationName==='none',cut:rows.some(x=>x.scrollWidth>x.clientWidth+1)}});
  r.setsOk=!!r.sets&&r.sets.rows===4&&r.sets.kinds==='on,wait,miss,bad'&&r.sets.inside&&r.sets.belowCab&&r.sets.calm&&!r.sets.cut;
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
  /* REAL API (jshelf on main, BAL.shelf.ui=1): put a chest piece on a shelf through the UI, then take it down */
  r.real=await (async()=>{try{await p.evaluate(()=>{BAL.shelf.ui=1;const k=Object.keys(BAL.shelf.it).find(k=>IT[k]&&BAL.shelf.it[k].g&&!BAL.shelf.it[k].plant);S.inv.push({k});window.__k=k;window.__g=BAL.shelf.it[k].g;kitStageRail.paint();kitDisplayRoomOpen(S)});await p.waitForTimeout(400);
   const L=await p.evaluate(()=>({rail:!!document.querySelector('#krail [data-rail=disp]'),n:document.querySelectorAll('#kdr .kdr-sh').length,per:BAL.shelf.per,sil:document.querySelectorAll('#kdr .kdr-sil').length}));
   await fr.click(`#kdr [data-kdrg="${await p.evaluate(()=>window.__g)}"]`);await p.waitForTimeout(300);await fr.click('#kdrdrw [data-kdrk]');
   const a=await fr.waitForSelector('#kidfl [data-kidact=put]',{timeout:8000});await a.click();await p.waitForTimeout(500);
   const put=await p.evaluate(()=>({inShelf:shelfIn(S,window.__g).some(x=>x[1].k===window.__k),inInv:S.inv.some(e=>e.k===window.__k)}));
   await fr.click(`#kdr [data-kdrg="${await p.evaluate(()=>window.__g)}"]`);await p.waitForTimeout(300);await fr.click('#kdrdrw [data-kdron]');
   const tk=await fr.waitForSelector('#kidfl [data-kidact=take]',{timeout:8000});await tk.click();await p.waitForTimeout(500);
   const back=await p.evaluate(()=>({inShelf:shelfIn(S,window.__g).some(x=>x[1].k===window.__k),inInv:S.inv.some(e=>e.k===window.__k)}));
   /* set lines from the REAL data: a whole pair (quattron + quatgap) glows and counts, one lone piece of another set reads "còn thiếu" */
   const SL=await p.evaluate(()=>{const z=S.shelf&&S.shelf.g;if(!z)return null;S.rank=5;const keys=["quattron","quatgap","lanquy"];keys.forEach(k=>{if(!IT[k])return;S.inv.push({k});const ix=S.inv.length-1;try{shelfPut(S,ix)}catch(e){}});shelfSetCheck(S);kitDisplayRoomClose();kitDisplayRoomOpen(S);
    const f=document.querySelector('#kdr .kdr-sets');const rows=f?[...f.querySelectorAll('.kdr-set')]:[];const lines=shelfView(S).sets;
    return{n:rows.length,view:lines.length,texts:rows.map(x=>x.textContent),ks:lines.map(x=>x.k).join(','),glow:document.querySelectorAll('#kdr .kdr-glow').length,same:rows.length===lines.length&&rows.every((x,i)=>x.textContent===lines[i].t)}});
   if(OUT&&OUT!=='-')await p.screenshot({path:`${OUT}/disp-${sz}-real.jpg`,type:'jpeg',quality:60});
   const mo=await p.evaluate(()=>{kitDisplayRoomClose();shelfOpen(S);const m=document.querySelector('#modal');const rows=m?m.querySelectorAll('.kdr-sets .kdr-set').length:0;try{closeModal()}catch(e){}return rows});
   if(!SL||!SL.n||!SL.same||SL.glow<2||mo!==SL.n)return{ok:false,err:'sets '+JSON.stringify(SL)+' modal '+mo};
   await p.evaluate(()=>{kitDisplayRoomClose();BAL.shelf.ui=0});
   return{L,put,back,ok:L.rail&&L.n===12&&L.sil>0&&L.sil<=12*L.per&&put.inShelf&&!put.inInv&&!back.inShelf&&back.inInv}}catch(e){return{ok:false,err:String(e).slice(0,160)}}})();
  r.errs=errs;
  const ok=r.apiHidden&&r.noFixtureOpen&&r.fit&&r.layout&&r.setsOk&&!g.frames&&!g.cut&&r.drawer&&r.drawer.tiles>0&&r.drawer.inside&&r.drawer.x&&Array.isArray(r.card)&&r.card.some(t=>/Trưng bày/.test(t))&&r.placed.now===before+1&&r.placed.drawerClosed&&r.placed.cardClosed&&r.on&&r.take&&r.taken&&r.closed&&r.real.ok&&r.ro.ro&&r.roNoDrawer&&!errs.length;
  r.verdict=ok?'PASS':'FAIL';if(!ok)bad++;all[sz]=r;await ctx.close()}
 console.log(JSON.stringify(all,null,1));await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
