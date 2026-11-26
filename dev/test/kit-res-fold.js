/* kit-res-fold.js (KK46, KIT §7.4a, owner OD 26/11 ~20:45Z «khung kết quả quá nhiều thông tin»): a result card with her own rows + 15 consorts'
   thiện cảm items + 9 oán items + 2 nameless «một vị …» items keeps HER rows, the person named in the title first, at most 3 named people, then ONE line
   per group «Hậu cung: thiện cảm … (N người) · oán … (N người)» + «Xem đủ trong Sổ ghi»; no «một vị» line left; the full list lands in Sổ ghi;
   the card fits the screen without scroll; the link is a real tap that opens the Sổ ghi tab; kitResultCard folds the same way.
   usage: node dev/test/kit-res-fold.js <index.html> [WxH,...]  exit 1 on FAIL (FAILS on the KK44 tap-to-open fold) */
const {chromium}=require('playwright');const path=require('path');const SRC=path.resolve(process.argv[2]);const SIZES=(process.argv[3]||'755x1000,1180x820').split(',');
(async()=>{const b=await chromium.launch();let fails=0;const chk=(n,ok,v)=>{console.log((ok?'ok  ':'FAIL')+' '+n+' '+JSON.stringify(v));if(!ok)fails++};
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(1200);
  const r=await p.evaluate(async()=>{quiet=true;window.__forceOrigin='tt';document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;await new Promise(r=>setTimeout(r,2500));Q.length=0;document.getElementById('modal').hidden=true;document.body.classList.remove('kdlg-on');
   const R=rivals.filter(v=>v&&v.name).slice(0,15);if(R.length<6)return {err:'rivals '+R.length};const tgt=R[R.length-1];
   R.forEach(v=>{try{if(typeof k61Meet==="function")k61Meet(v)}catch(e){}v.__k61=1});
   const b0=rsnap();S.duc+=2;S.suc=Math.max(0,S.suc-5);log('Yến tiệc: '+tgt.name+' được ban rượu.');
   resultShow('Yến tiệc mời '+tgt.name,b0,null);await new Promise(r=>setTimeout(r,300));const t=document.getElementById('rtoast');if(!t)return {err:'no toast'};
   /* inject the people rows the way kaResultRows / kitKemRow print them, then fold again (fresh innerHTML length) */
   const it=(who,s,c)=>`<span class="kitem"><span class="ef t">${who}:</span> <span class="ef ${c}">${s}</span></span>`;
   const kb=t.querySelector('.kb');const sh=v=>kaWho(v);
   kb.querySelector('.kr-duoc .krv').insertAdjacentHTML('beforeend',R.map((v,i)=>it(sh(v),`thiện cảm ${i%3?'+':'−'}${i===R.length-1?1:i+2} (${40+i})`,'g')).join('')+it('một vị Quý nhân','thiện cảm +6 (12)','g'));
   kb.insertAdjacentHTML('beforeend',`<span class="kr kr-kem"><span class="krl">Kèm</span><span class="krv">${R.slice(0,9).map((v,i)=>it(sh(v),`oán +${i%2?1:2} (${10+i})`,'r')).join('')}${it('một vị phi tần','oán +3 (5)','r')}</span></span>`);
   const h0=t.getBoundingClientRect().height;const lg0=S.logs[0];kitResFold(t,{fresh:true});
   const vis=[...t.querySelectorAll('.kb .kitem')].filter(e=>!e.hidden&&e.getClientRects().length&&!e.closest('[hidden]')).map(e=>e.textContent.replace(/\s+/g,' ').trim());
   const R2=t.getBoundingClientRect();const ppl=new Set(vis.filter(x=>/:/.test(x)&&!/^(Hậu cung|Người khác):/.test(x)).map(x=>x.split(':')[0]));
   const a=t.querySelector('.kalog');const ar=a&&a.getBoundingClientRect();const lg=S.logs[0];
   return {h0:Math.round(h0),h1:Math.round(R2.height),fit:R2.top>=0&&R2.bottom<=innerHeight&&t.scrollHeight<=t.clientHeight+1,vis,ppl:[...ppl],tgt:sh(tgt),
    link:a&&a.textContent,ax:ar&&ar.x+ar.width/2,ay:ar&&ar.y+ar.height/2,logHas:lg!==lg0&&/người chịu ảnh hưởng/.test(lg)&&R.every(v=>lg.includes(v.name))&&/một vị Quý nhân/.test(lg)}});
  if(r.err){chk(wh+' setup',false,r);await p.close();continue}
  const sum=r.vis.find(x=>/^Hậu cung:/.test(x))||'';
  chk(`${wh} her own rows kept (Đức / Sức)`,r.vis.some(x=>/^Đức \+2/.test(x))&&r.vis.some(x=>/^Sức −/.test(x)),r.vis.slice(0,4));
  chk(`${wh} at most 3 named people, the one named in the title first`,r.ppl.length<=3&&r.ppl.includes(r.tgt),{ppl:r.ppl,tgt:r.tgt});
  chk(`${wh} ONE summary line «Hậu cung: thiện cảm … (N người) · oán … (N người)»`,/^Hậu cung: thiện cảm [+−±]\d+ \(\d+ người\) · oán \+\d+ \(\d+ người\)/.test(sum)&&r.vis.filter(x=>/^Hậu cung:/.test(x)).length===1,sum);
  chk(`${wh} no nameless «một vị …» line on the card`,!r.vis.some(x=>/một vị/i.test(x)),r.vis.filter(x=>/một vị/i.test(x)));
  chk(`${wh} «Xem đủ trong Sổ ghi» + full list written to Sổ ghi`,r.link==='Xem đủ trong Sổ ghi'&&r.logHas,{link:r.link,logHas:r.logHas});
  chk(`${wh} card fits without scroll (${r.h0} → ${r.h1} px)`,r.fit&&r.h1<r.h0,{h0:r.h0,h1:r.h1});
  /* real tap on the link */
  await p.waitForTimeout(600);const pt=await p.evaluate(()=>{for(const id of ['kdaytc','kmrew','klife']){const o=document.getElementById(id);if(o)o.remove()}/* boot notices of a fresh life, not part of the card */const a=document.querySelector('#rtoast .kalog');const q=a.getBoundingClientRect();const x=q.x+q.width/2,y=q.y+q.height/2;const e=document.elementFromPoint(x,y);return {x,y,hit:!!(e&&e.closest('.kalog')),el:e&&(e.id||e.className||e.tagName),body:document.body.className}});const hit=pt.hit;if(!hit)console.log('  tap probe',JSON.stringify(pt));await p.mouse.click(pt.x,pt.y);await p.waitForTimeout(500);
  const tabOn=await p.evaluate(()=>{const b=document.querySelector('[data-tab="log"]');return {sel:b&&(b.getAttribute('aria-selected')==='true'||b.classList.contains('on')),tab:typeof tab!=='undefined'?tab:null}});
  chk(`${wh} real tap on «Xem đủ trong Sổ ghi» opens Sổ ghi`,hit&&(tabOn.sel||tabOn.tab==='log'),{hit,tabOn});
  /* kitResultCard family member */
  const k=await p.evaluate(()=>{document.body.classList.remove('kdlg-on');const R=rivals.filter(v=>v&&v.name).slice(0,8);const t=kitResultCard({title:'Kết quả tuyển',ok:null,rows:[{k:'duoc',label:'Được',items:['<span class="ef g">Danh +2</span>',...R.map((v,i)=>`<span class="ef t">${kaWho(v)}:</span> <span class="ef g">thiện cảm +${i+1} (30)</span>`)]}]});
   const vis=[...t.querySelectorAll('.kb .kitem')].filter(e=>!e.hidden&&!e.closest('[hidden]')).map(e=>e.textContent.replace(/\s+/g,' ').trim());return {vis,link:(t.querySelector('.kalog')||{}).textContent}});
  chk(`${wh} kitResultCard folds the same way`,k.vis.length===5&&/^Hậu cung: thiện cảm \+\d+ \(5 người\)/.test(k.vis[4])&&k.link==='Xem đủ trong Sổ ghi',k);
  chk(`${wh} no page errors`,!errs.length,errs.slice(0,3));await p.close()}
 await b.close();console.log(fails?'KIT-RES-FOLD FAIL '+fails:'KIT-RES-FOLD PASS');process.exit(fails?1:0)})();
