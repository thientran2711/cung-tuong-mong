/* review/small-art-wire (D45 art wiring). usage: node dev/test/small-art-wire.js <url> [outdir|-] [WxH@dpr ...]
   1. every new key has itemArt() + both pictures answer 200 on the CDN (hoatai, hoataivang, giayhoa, giaygam, ngocboi_r0..7, vongngoc_r1..4, tuithom_r1..7, wd-y-*).
   2. per-rank promotion set (prSetFor 0..7): Đeo tay / Đeo eo / Túi thơm of THE rank, all wearable (sl), art loads, rk = rank (never vượt phẩm).
   3. servant road sets (prSrvSetFor 3,4,5) carry the maid robes y_chuongsu / y_nuquan / y_mama; those robes are never drawn at random (wdPickAt, wdPool).
   4. real rank-up chest (rank 3 consort) + servant pouch: pictures inside the chest are loaded (naturalWidth > 0), no overflow, button in view.
   5. wearing the per-rank pieces: Tư trang slots show the right picture; old save (ngocboi / tuithom / vongngoc only) loads. */
const {chromium}=require('playwright');const args=process.argv.slice(2);const URL=args[0],OUT=args[1]&&args[1]!=='-'?args[1]:null;
let SIZES=args.slice(2);if(!SIZES.length)SIZES=['755x1000@2','1180x820@2','844x390@3'];
const boot=async(p,u,srv)=>{await p.goto(u,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(srv=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;
  for(let i=0;i<80;i++){start();if(srv?isSrv():(!isSrv()&&S.rank<=2))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.bac=200;S.suc=90;render()},!!srv)};
const clearOv=p=>p.evaluate(()=>{document.querySelectorAll('.kmov').forEach(e=>e.remove());try{KMQ.length=0;kmBusy=false}catch(e){}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});
(async()=>{const b=await chromium.launch();const errs=[],T=[];const ok=(c,n,x)=>T.push([c?'PASS':'FAIL',n,x==null?'':String(x).slice(0,220)]);
 for(const [si,SZ] of SIZES.entries()){const [wh,d]=SZ.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});await ctx.addInitScript(()=>{/* merge-train-4: the card-flip scene now waits for its kit end button (KIT 81); hide it like main's tests do */document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='.kcf{display:none!important}';document.head.appendChild(s)})});const p=await ctx.newPage();
  p.on('pageerror',e=>errs.push(SZ+' '+e.message.slice(0,200)));p.setDefaultTimeout(0);await boot(p,URL);
  if(si===0){
   const keys=await p.evaluate(()=>{const K=['hoatai','hoataivang','giayhoa','giaygam'];for(let r=0;r<8;r++)K.push('ngocboi_r'+r);for(let r=1;r<5;r++)K.push('vongngoc_r'+r);for(let r=1;r<8;r++)K.push('tuithom_r'+r);
    return K.map(k=>{const a=itemArt(k);return{k,a:a&&[a.src,a.src512,a.grade],it:!!IT[k]}})});
   const miss=[];for(const x of keys){if(!x.a){miss.push(x.k+':noart');continue}for(const u of [x.a[0],x.a[1]]){const r=await p.evaluate(async u=>{try{return (await fetch(IMG_U(u),{method:'HEAD'})).status}catch(e){return 0}},u);if(r!==200)miss.push(x.k+' '+u+' '+r)}}
   ok(!miss.length,'new item keys: itemArt + 256/512 pictures on the CDN ('+keys.length+' keys)',miss.join(' | '));
   const noIT=keys.filter(x=>!x.it).map(x=>x.k).join(',');ok(noIT==='hoatai,hoataivang,giayhoa,giaygam','items with a slot row exist as IT; earrings/shoes wait for a wear slot (KIT REQUEST)',noIT);
   const wd=await p.evaluate(()=>['y_chuongsu','y_nuquan','y_mama'].map(k=>[k,!!WD_ITEMS[k],WD_ITEMS[k]&&WD_ITEMS[k].icon]));
   const wm=[];for(const [k,e,ic] of wd){if(!e){wm.push(k);continue}const r=await p.evaluate(async u=>(await fetch(IMG_U(u),{method:'HEAD'})).status,ic);if(r!==200)wm.push(k+' '+r)}
   ok(!wm.length,'maid robes in WD_LIST with their picture on the CDN',wm.join(',')||wd.map(x=>x[2]).join(','));
   const sets=await p.evaluate(()=>{const o=[];for(let r=0;r<8;r++){const L=prSetFor(r).map(x=>x[0]);const sl=s=>L.find(k=>IT[k]&&IT[k].sl===s);o.push({r,wrist:sl('wrist'),waist:sl('waist'),scent:sl('scent'),rk:L.filter(k=>IT[k]&&IT[k].sl).map(k=>IT[k].rk)})}return o});
   const exp=r=>({wrist:r===0?'vongngoc':r<5?'vongngoc_r'+r:'vongvang',waist:'ngocboi_r'+r,scent:r?'tuithom_r'+r:'tuithom'});
   ok(sets.every(s=>{const e=exp(s.r);return s.wrist===e.wrist&&s.waist===e.waist&&s.scent===e.scent&&s.rk.every(x=>(x|0)<=s.r)}),'prSetFor(0..7): the rank\'s own Đeo tay + Đeo eo + Túi thơm, none above its rank',sets.map(s=>s.r+':'+s.wrist+'/'+s.waist+'/'+s.scent).join(' '));
   const sv=await p.evaluate(()=>({r3:prSrvSetFor(3).map(x=>x[0]),r4:prSrvSetFor(4).map(x=>x[0]),r5:prSrvSetFor(5).map(x=>x[0]),
     rnd:(()=>{let bad=0;for(let i=0;i<600;i++)for(const P of [0,1,2]){for(const sl of ['y','tram']){const k=wdPickAt(P,sl,0);if(k&&/^y_(chuongsu|nuquan|mama)$/.test(k))bad++}}for(const P of [0,1])for(const k of wdPool('y',P,true))if(/^y_(chuongsu|nuquan|mama)$/.test(k))bad++;return bad})()}));
   ok(sv.r3.includes('y_chuongsu')&&sv.r4.includes('y_nuquan')&&sv.r5.includes('y_mama')&&sv.rnd===0,'servant road: Chưởng sự → y_chuongsu, Nữ quan → y_nuquan, Ma ma → y_mama; never random/shop',JSON.stringify(sv).slice(0,200));
   /* old save: only the old keys in the chest, deser/ser round trip */
   const old=await p.evaluate(()=>{try{S.inv.push({k:'ngocboi',from:'emp'},{k:'tuithom',from:'nvp'},{k:'vongngoc',from:'nvp',w:1});const j=JSON.stringify(ser?ser():S);const n=S.inv.length;render();return{n,ok:true,len:j.length}}catch(e){return{ok:false,e:e.message}}});
   ok(old.ok,'old save items (ngocboi, tuithom, vongngoc) still fine',JSON.stringify(old));
  }
  /* 4. real rank-up chest (consort): pictures of the set */
  const run=async(srvRoad)=>{
   if(srvRoad)await boot(p,URL,true);else await boot(p,URL);
   await p.evaluate(async srvRoad=>{window.__chk=[];if(srvRoad){S.srv.lau=0;S.prSeen={r:null,s:2};S.srv.rk=3;render()}else{S.rank=Math.min(S.rank,2);S.prSeen={r:2,s:null};S.rank=3;render()}
    await new Promise(r=>setTimeout(r,500))},srvRoad);
   for(let i=0;i<24&&!(await p.$('.km-reward .kmlist'));i++){await p.evaluate(()=>{const e=document.querySelector('.kmov.km-edict');if(e)e.click();/* merge-train-4: KIT 81 scenes close only by their end button */const eb=document.querySelector('.kmov:not(.km-reward) .kmend');if(eb)eb.click();const o=document.querySelector('.kmov.km-reward:not(.km-prev)');if(o)o.click()});await p.waitForTimeout(500)}
   await p.waitForTimeout(1200);
   const keys=srvRoad?['wd-y-chuongsu']:['ngocboi_r3','vongngoc_r3','tuithom_r3'];const r={rows:[],pics:[]};
   r.t=await p.evaluate(()=>{const L=document.querySelector('.km-reward .kmlist');return L?L.innerText.replace(/\s+/g,' ').slice(0,200):''});
   r.sw=await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   for(const k of keys){const kid=k.replace('wd-y-','y_');const has=await p.evaluate(kid=>{const e=document.querySelector('[data-kid="'+kid+'"]');if(!e)return false;e.click();return true},kid);r.rows.push([kid,has]);if(!has)continue;for(let w=0;w<20;w++){const bad=await p.evaluate(()=>[...document.querySelectorAll('#modal img,.kmov img')].some(i=>/item|wd-/.test(i.getAttribute('src')||'')&&!i.naturalWidth&&!i.complete));if(!bad)break;await p.waitForTimeout(400)}await p.waitForTimeout(1200);
    const im=await p.evaluate(()=>[...document.querySelectorAll('img')].filter(i=>/\/(item512\/item-|item-|wd-)/.test(i.getAttribute('src')||'')&&i.getBoundingClientRect().width>16).map(i=>[i.getAttribute('src').split('/').pop(),i.naturalWidth,Math.round(i.getBoundingClientRect().width)]));
    r.pics.push([kid,im]);if(OUT&&si<3)await p.screenshot({path:`${OUT}/saw-${srvRoad?'srv':'consort'}-${kid}-${W}x${H}.png`});
    await p.evaluate(()=>{const c=document.querySelector('#modal .kmx,#modal [data-close],#modal .x,.kmov [data-kclose]');if(c)c.click();document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))});await p.waitForTimeout(400)}
   const btn=await p.evaluate(()=>{const b=document.querySelector('.km-reward .kmtake,.km-reward [data-km-close]');if(!b)return null;const q=b.getBoundingClientRect();return q.bottom<=innerHeight+1&&q.top>=0});r.btn=btn;
   return r};
  const c=await run(false);
  const pic=(c,k)=>c&&c.pics.some(([kid,im])=>kid===k&&im.some(x=>new RegExp(k).test(x[0])&&x[1]>0));
  ok(pic(c,'ngocboi_r3')&&pic(c,'vongngoc_r3')&&pic(c,'tuithom_r3')&&!c.sw,SZ+' rank-up chest (Tần): per-rank pendant + bangle + sachet pictures open from the chest list, loaded, no overflow',c&&(c.t.slice(0,100)+' | '+JSON.stringify(c.pics).slice(0,300)+' sw'+c.sw+' btn'+c.btn));
  await clearOv(p);
  if(si===0){
   const s=await run(true);
   ok(s&&s.pics.some(([kid,im])=>im.some(x=>/wd-y-chuongsu/.test(x[0])&&x[1]>0)),SZ+' servant pouch (Chưởng sự cô cô): maid robe picture loaded',s&&(s.t.slice(0,100)+' | '+JSON.stringify(s.pics).slice(0,300)));
   await clearOv(p);
   /* wear the per-rank pieces; Tư trang shows their pictures */
   await boot(p,URL);
   const w=await p.evaluate(()=>{S.rank=Math.max(S.rank,4);const ks=['vongngoc_r3','ngocboi_r3','tuithom_r3'];for(const k of ks)S.inv.push({k,from:'nvp'});
    for(const e of S.inv)if(ks.includes(e.k))e.w=1;render();return{wb:wearBonus(S),lux:luxOf(S).sc}});
   ok(w.wb.sac>=5&&w.wb.danh>=3,'worn per-rank pieces count in wearBonus (Sắc / Danh)',JSON.stringify(w));
  }
  await ctx.close()}
 await b.close();for(const t of T)console.log(t.join('  '));console.log('page errors:',errs.length?errs.join(' | '):'none');const f=T.filter(t=>t[0]==='FAIL').length;console.log(`${T.length-f}/${T.length} pass`);process.exit(f?1:0)})();
