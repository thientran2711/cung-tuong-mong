/* KIT §54.2 kitLose + §54.1 reveal pacing (owner 11/15 08:20Z + 17:02Z). review/game-feel.
   usage: node dev/test/sw-serve.js 8955 <repo root>  (another shell);  node dev/test/item-lose.js http://localhost:8955/ <outdir> [WxH]
   A. LOSE: drives real call sites (buy, sellItem, giveTo, search, inspect, useItem, wdWear, apply bạc −) and story-style removals (a log line
      says the item was confiscated / robbed / bullied out of her) and checks what kmDiff answered with: kitLose(why) + kitCoins(out|in), the
      loss card (kit notice panel with the falling kitItem), nothing for using / wearing, no reveal for a garment taken off.
   B. REVEAL: a 3-item chest — after the tap, each item rises into the spotlight one at a time (kit frame kitItem xl + kit grade chip in the
      item's REAL grade = kitItemInfo = the Tư trang bag), holds ≥ 1.2 s, the list shows only after every item; a single kitGain uses the
      same kit piece and cannot be tapped away at once. No private .kfg / .kmit markup left. Exit 1 on a miss. */
const {chromium}=require('playwright');const fs=require('fs');const [,,BASE,OUT,VP]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const [W,H]=(VP||'1180x820').split('x').map(Number);
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitLose&&window.kitGain,null,{timeout:180000});
 await p.waitForFunction(()=>!document.getElementById('kload')||(window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)),null,{timeout:240000}).catch(()=>{});
 const R=await p.evaluate(async()=>{const wait=t=>new Promise(o=>setTimeout(o,t));
  document.querySelectorAll('#kload').forEach(e=>e.remove());SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;
  document.querySelectorAll('[id^=kroul],#dawn,.kmov').forEach(e=>e.remove());render();await wait(300);S.bac=500;render();await wait(200);
  const lo=[],co=[],ga=[];const kl=window.kitLose,kc=window.kitCoins,kg=window.kitGain;
  window.kitLose=function(x,o){lo.push({why:(o&&o.why)||(x&&x.bac!=null?'bac':'lose'),n:(Array.isArray(x)?x:[x]).filter(Boolean).map(e=>e.k?kitItemInfo(e).name:'bạc'),title:o&&o.title||'',text:o&&o.text||'',bac:o&&o.bac||0});return kl.apply(this,arguments)};
  window.kitCoins=function(d,n){co.push(d+':'+n);return kc.apply(this,arguments)};window.kitGain=function(x){ga.push(kitItemInfo(x).name);return kg.apply(this,arguments)};
  const drain=async()=>{for(let i=0;i<30;i++){document.querySelectorAll('[id^=kroul],.kroul-ov').forEach(e=>e.remove());const v=document.querySelector('.kmov');if(!v){await wait(120);if(!document.querySelector('.kmov')&&!(window.KMQ&&KMQ.length))break;continue}v.click();await wait(200);v.click();await wait(250)}};
  const closeModal=()=>{Q.length=0;document.getElementById('modal').hidden=true};
  const out=[];const step=async(name,fn,keepModal)=>{const l0=lo.length,c0=co.length,g0=ga.length;let err='',card=null;try{fn()}catch(e){err=e.message}render();await wait(500);
   const M=document.getElementById('modal');const qc=Q.find((q,i)=>i>0&&q&&q.cls==='klose');if(qc){const d=document.createElement('div');d.innerHTML=qc.kit.itemPic;document.body.appendChild(d);card={title:qc.t,queued:true,pic:!!d.querySelector('.klspic'),tiles:d.querySelectorAll('.kitem').length,fall:getComputedStyle(d.querySelector('.klsfall')).animationName,text:(qc.kit.facts||[]).join(' ')};d.remove()}
   else if(M&&!M.hidden){const pic=M.querySelector('.klspic');card={title:(M.querySelector('.kpt,.kph,h2,h3,.ttl')||{}).textContent||'',pic:!!pic,tiles:pic?pic.querySelectorAll('.kitem').length:0,fall:pic?getComputedStyle(pic.querySelector('.klsfall')).animationName:'',text:M.innerText.slice(0,240)}}
   if(!keepModal)closeModal();render();await wait(150);out.push({name,lose:lo.slice(l0),coins:co.slice(c0),gains:ga.slice(g0),card,err});await drain()};
  const ix=k=>S.inv.findIndex(e=>e.k===k&&!e.h);const add=async(...ks)=>{for(const k of ks)S.inv.push({k});render();await wait(200);await drain();closeModal();ga.length=ga.length};
  const rv=rivals.find(v=>v.alive&&!v.out);
  await step('buy sonphan (j8 buy)',()=>buy(S,'sonphan'));
  await add('nhansam');await step('sell nhansam (sellItem)',()=>sellItem(S,ix('nhansam')));
  await add('tuithom');await step('give tuithom (giveTo)',()=>giveTo(S,rv,ix('tuithom')));
  const il=Object.keys(IT).find(k=>IT[k].il);if(il){await add(il);await step(`palace search finds ${il} (search)`,()=>search(S))}
  await add('vongngoc');await step('confiscated (story log)',()=>{const i=ix('vongngoc');S.inv.splice(i,1);log(`<span class="r">Hoàng hậu sai người tịch thu ${IT.vongngoc.n} của ngươi vì vượt phẩm.</span>`)});
  await add('tramngoc');await step('robbed (story log)',()=>{const i=ix('tramngoc');S.inv.splice(i,1);log(`Trên đường về cung, ngươi bị kẻ lạ cướp mất ${IT.tramngoc.n}.`)});
  await add('luahang');await step('bullied (story log)',()=>{const i=ix('luahang');S.inv.splice(i,1);Q.push({t:'Bị bắt nạt',h:`<p>Mấy cung nữ cũ bắt nạt, đòi ngươi giao ${IT.luahang.n} ra.</p>`})});
  await add('yensao');await step('use yensao (useItem): nothing',()=>useItem(S,ix('yensao')));
  await add('demgam');await step('gone with no story: fade only',()=>{S.inv.splice(ix('demgam'),1)});
  await step('spend silver (apply bạc −30)',()=>apply({bac:-30}));
  const wdk=Object.keys(WD_ITEMS).find(k=>WD_ITEMS[k].sl==='tram'&&WD_ITEMS[k].g>=1&&WD_ITEMS[k].g<4);
  await add(wdk);await step(`wear ${wdk} (wdWear): nothing`,()=>wdWear(S,ix(wdk)));
  await step(`take ${wdk} off: no reveal`,()=>wdTakeOff(S,'tram'));
  /* B. reveal pacing */
  const keys=['sonphan','nhansam','gamto'];const want=keys.map(k=>{const I=kitItemInfo(k);return I.gname});
  kitReward({kind:'gift',title:'Hộp gấm',from:'thử',items:keys.map(k=>({n:IT[k].n,img:kitItemInfo(k).src,tier:kitItemInfo(k).grade}))});let ov=null;for(let i=0;i<60&&!ov;i++){await wait(150);ov=document.querySelector('#kmrew')}
  if(!ov)return{out,err:'no #kmrew: busy='+kmBusy+' q='+KMQ.length+' kmov='+document.querySelectorAll('.kmov').length+' free='+kmFree()+' kroul='+[...document.querySelectorAll('[id^="kroul"],.kroul-ov,#kpodov,#kmrew')].map(e=>e.id+'.'+e.className).join()};const rec=[];const t0=performance.now();ov.click();
  for(let i=0;i<160;i++){await wait(100);const s=ov.querySelector('.kmspot .krev');const done=ov.querySelector('.kmrew.km-done');
   rec.push({t:Math.round(performance.now()-t0),i:s?+ov.querySelector('.kmrew').dataset.kmi:-1,frame:s?!!s.querySelector('.kitem.kitem-xl'):false,chip:s?(s.querySelector('.kgchip')||{}).textContent:'',done:!!done});if(done)break}
  const list=[...ov.querySelectorAll('.kmlist .kmrow .kgchip')].map(x=>x.textContent);const shelf=ov.querySelectorAll('.kmshelf .kitem').length;const priv=ov.querySelectorAll('.kmit,.kmtier,.kmini0').length;
  ov.querySelector('[data-km-close]').click();await wait(400);await drain();
  /* single kitGain: kit piece + not tapped away at once */
  S.inv.push({k:'nhansam'});render();await wait(600);const g=document.querySelector('.kmov.kfgain');const gi={kit:!!(g&&g.querySelector('.krev .kitem.kitem-xl')),chip:g&&(g.querySelector('.kgchip')||{}).textContent,priv:g?g.querySelectorAll('.kfg,.kfgn,.kfgg,.kfgi').length:-1};
  if(g){g.click();await wait(100);gi.openAfterEarlyTap=!!document.querySelector('.kmov.kfgain');await wait(1000);g.click();await wait(400);gi.closedLater=!document.querySelector('.kmov.kfgain')}
  await drain();
  return{out,rev:{want,rec,list,shelf,priv},gi}});
 if(R.err){console.log('FAIL',R.err,JSON.stringify(R.out.map(s=>[s.name,s.lose,s.coins,s.gains,s.err])));process.exit(1)}
 const F=[];const by=n=>R.out.find(s=>s.name.startsWith(n));const has=(s,why)=>s&&s.lose.some(l=>l.why===why);
 for(const s of R.out)if(s.err)F.push(`${s.name}: ${s.err}`);
 let s=by('buy');if(!s||!s.gains.length||!s.coins.some(c=>c.startsWith('out')))F.push('buy: item reveal + silver out expected');
 s=by('sell');if(!has(s,'sell')||!s.lose.find(l=>l.why==='sell').bac)F.push('sell: kitLose sell with silver in expected');
 s=by('give');if(!has(s,'give'))F.push('give: kitLose give expected');
 s=by('palace search');if(s&&(!has(s,'lose')||!s.card||!s.card.pic))F.push('search: loss card expected');
 for(const [n,t] of [['confiscated','Bị tịch thu'],['robbed','Bị cướp'],['bullied','Bị ép giao đồ']]){s=by(n);const l=s&&s.lose.find(x=>x.why==='lose');
  if(!l||l.title!==t||!l.text)F.push(`${n}: lose card "${t}" with the story line expected, got ${JSON.stringify(s&&s.lose)}`);if(!s||!s.card||!s.card.pic||!s.card.tiles||s.card.fall!=='klsFall')F.push(`${n}: card with falling kitItem expected ${JSON.stringify(s&&s.card)}`)}
 s=by('use');if(!s||s.lose.length)F.push('use: no kitLose expected');
 s=by('gone');if(!has(s,'fade')||s.card)F.push('gone: fade, no card expected');
 s=by('spend');if(!s||!s.coins.some(c=>c==='out:30'))F.push('spend: coins out 30 expected');
 s=by('wear');if(!s||s.lose.length)F.push('wear: no kitLose expected');
 s=by('take');if(!s||s.gains.length)F.push('take off: no reveal expected');
 const rv=R.rev;const firstDone=rv.rec.find(r=>r.done);const shown=[...new Set(rv.rec.filter(r=>r.i>=0).map(r=>r.i))];
 if(shown.join()!=='0,1,2')F.push('reveal: items not one by one '+shown.join());
 for(const i of [0,1]){const L=rv.rec.filter(r=>r.i===i);if(!L.length||L[L.length-1].t-L[0].t<1200)F.push(`reveal item ${i}: in spotlight ${L.length?L[L.length-1].t-L[0].t:0} ms (< 1200)`)}
 if(!firstDone||firstDone.t<3*1800)F.push(`reveal: list after ${firstDone&&firstDone.t} ms (too fast)`);
 if(rv.rec.some(r=>r.i>=0&&!r.frame))F.push('reveal: spotlight without kitItem xl');
 const chips=[...new Set(rv.rec.filter(r=>r.i>=0).map(r=>r.i+':'+r.chip))].map(x=>x.split(':')[1]);if(chips.join()!==rv.want.join())F.push(`reveal grade chips ${chips} ≠ real ${rv.want}`);
 if(rv.list.join()!==rv.want.join())F.push(`list grade chips ${rv.list} ≠ real ${rv.want}`);if(rv.shelf!==3)F.push('shelf tiles '+rv.shelf);if(rv.priv)F.push('private .kmit markup left');
 const gi=R.gi;if(!gi.kit||gi.chip!==`Tinh phẩm · ${'Thuốc bổ'}`&&!/^Tinh phẩm/.test(gi.chip||''))F.push('kitGain: kit piece / grade chip '+JSON.stringify(gi));if(gi.priv)F.push('kitGain private .kfg markup');if(!gi.openAfterEarlyTap||!gi.closedLater)F.push('kitGain early tap / close '+JSON.stringify(gi));
 if(errs.length)F.push('page errors: '+errs.join(' | '));
 fs.writeFileSync(OUT+'/item-lose.json',JSON.stringify({R,errs,F},null,1));
 for(const s of R.out)console.log(s.name,'| lose',JSON.stringify(s.lose.map(l=>[l.why,l.n.join('+'),l.title,l.bac])),'| coins',s.coins.join(' '),'| gains',s.gains.join(', '),'| card',s.card?`${s.card.tiles} tile(s) ${s.card.fall}`:'-');
 console.log('reveal: shown',shown.join(),'| done at',firstDone&&firstDone.t,'ms | chips',rv.list.join(' / '),'| kitGain',JSON.stringify(gi));
 console.log(F.length?'FAIL\n'+F.join('\n'):'PASS');await b.close();process.exit(F.length?1:0)})();
