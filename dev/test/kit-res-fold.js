/* kit-res-fold.js (KIT §7.4a THE ONE FOLD, owner OD 26/11 ~20:45Z «khung kết quả quá nhiều thông tin»; MAIN 164: ONE fold rule = jnsieve nsCard + kitKemRow K.sum):
   a real act moves 15 consorts' thiện cảm and 9 consorts' ghen; resultShow's card keeps HER rows, the person named in the title first, at most
   BAL.news.card.keep (3) named people, then ONE line per group «Hậu cung: thiện cảm … (N người) · ghen … (N người)» + «Xem đủ trong Sổ ghi»;
   no «một vị …» line; ONE Sổ ghi record holds every folded person (no second append); the card fits the screen and its height = its content
   (no empty band, OD 26/11 ~22:07Z (1)); the link is a real tap that opens the Sổ ghi tab.
   usage: node dev/test/kit-res-fold.js <index.html> [WxH,...]  exit 1 on FAIL */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const path=require('path');const SRC=path.resolve(process.argv[2]);const SIZES=(process.argv[3]||'755x1000,1180x820').split(',');
(async()=>{const b=await chromium.launch();let fails=0;const chk=(n,ok,v)=>{console.log((ok?'ok  ':'FAIL')+' '+n+' '+JSON.stringify(v));if(!ok)fails++};
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(1200);
  const r=await p.evaluate(async()=>{quiet=true;window.__forceOrigin='tt';document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;await new Promise(r=>setTimeout(r,2500));Q.length=0;document.getElementById('modal').hidden=true;document.body.classList.remove('kdlg-on');
   const R=rivals.filter(v=>v&&v!==S&&v.name&&v.alive!==false&&!v.out).slice(0,15);if(R.length<6)return {err:'rivals '+R.length};const tgt=R[1]/* met, small change (+3): kept only because the title names her */;
   R.slice(0,10).forEach(v=>{try{if(typeof k61Meet==="function")k61Meet(v)}catch(e){}v.__k61=1});
   if(S.kc)S.kc.inPal=1/* in the palace: the Sổ ghi record is on (jnsieve recOn) */;const b0=rsnap();if(!b0.rel)return {err:'rsnap has no rel'};const h0=(S.hrec||[]).length;
   S.duc+=2;S.suc=Math.max(0,S.suc-5);R.forEach((v,i)=>{v.rel=(v.rel||0)+(i%3?1:-1)*(i+2)});R.slice(0,9).forEach((v,i)=>{v.ghen=(v.ghen||0)+(i%2?1:2)});
   log('Yến tiệc: '+tgt.name+' được ban rượu.');resultShow('Yến tiệc mời '+tgt.name,b0,null);await new Promise(r=>setTimeout(r,400));
   const t=document.getElementById('rtoast');if(!t||!t.classList.contains('on'))return {err:'no card'};
   const vis=[...t.querySelectorAll('.kb .kitem')].filter(e=>e.getClientRects().length).map(e=>e.textContent.replace(/\s+/g,' ').trim());
   const ppl=new Set(vis.filter(x=>/:/.test(x)&&!/^(Hậu cung|Người khác):/.test(x)).map(x=>x.split(':')[0]).filter(n=>!/^(Đức|Sức|Sủng|Danh)/.test(n)));
   const R2=t.getBoundingClientRect();const kids=[...t.querySelectorAll('.rt > *')].filter(e=>e.getClientRects().length);const cb=Math.max(...kids.map(e=>e.getBoundingClientRect().bottom));
   const a=t.querySelector('.kalog');const H=(S.hrec||[]).slice(0,(S.hrec||[]).length-h0)/* recPush unshifts */;const recs=H.filter(x=>x.kem);
   return {fit:R2.top>=0&&R2.bottom<=innerHeight&&t.scrollHeight<=t.clientHeight+1,band:Math.round(R2.bottom-cb),vis,ppl:[...ppl],tgt:kaWho(tgt),
    link:a&&a.textContent,nRec:recs.length,recAll:recs.length===1&&R.every(v=>v===tgt||ppl.has(kaWho(v))||(recs[0].ids||[]).includes(v.id)),logsHas:S.logs.slice(0,3).some(l=>/người chịu ảnh hưởng/.test(l))}});
  if(r.err){chk(wh+' setup',false,r);await p.close();continue}
  const sum=r.vis.filter(x=>/^Hậu cung:/.test(x));
  chk(`${wh} her own rows kept (Đức / Sức)`,r.vis.some(x=>/^Đức \+2/.test(x))&&r.vis.some(x=>/^Sức −/.test(x)),r.vis.slice(0,4));
  chk(`${wh} at most 3 named people, the one named in the title first`,r.ppl.length<=3&&r.ppl.includes(r.tgt),{ppl:r.ppl,tgt:r.tgt});
  chk(`${wh} ONE summary line «Hậu cung: thiện cảm … (N người)»`,sum.length===1&&/^Hậu cung: (thiện cảm|ghen) [+−±]\d+ \(\d+ người\)/.test(sum[0]),sum);
  chk(`${wh} no nameless «một vị …» line on the card`,!r.vis.some(x=>/một vị|vị khác/i.test(x)),r.vis.filter(x=>/một vị|vị khác/i.test(x)));
  chk(`${wh} «Xem đủ trong Sổ ghi» + ONE Sổ ghi record with every folded person (no second append)`,r.link==='Xem đủ trong Sổ ghi'&&r.nRec===1&&r.recAll&&!r.logsHas,{link:r.link,nRec:r.nRec,recAll:r.recAll,second:r.logsHas});
  chk(`${wh} card fits without scroll, height = content (band ${r.band} px ≤ 16)`,r.fit&&r.band<=16,{band:r.band});
  await p.waitForTimeout(300);const pt=await p.evaluate(()=>{for(const id of ['kdaytc','kmrew','klife']){const o=document.getElementById(id);if(o)o.remove()}const a=document.querySelector('#rtoast .kalog');const q=a.getBoundingClientRect();const x=q.x+q.width/2,y=q.y+q.height/2;const e=document.elementFromPoint(x,y);return {x,y,hit:!!(e&&e.closest&&e.closest('.kalog'))}});
  await p.mouse.click(pt.x,pt.y);await p.waitForTimeout(500);
  const tabOn=await p.evaluate(()=>{const b=document.querySelector('[data-tab="log"]');return {sel:b&&(b.getAttribute('aria-selected')==='true'||b.classList.contains('on')),tab:typeof tab!=='undefined'?tab:null}});
  chk(`${wh} real tap on «Xem đủ trong Sổ ghi» opens Sổ ghi`,pt.hit&&(tabOn.sel||tabOn.tab==='log'),{hit:pt.hit,tabOn});
  /* F3 family: the event-result card with its small picture (jk2b .kevres) and ONE short row: height = content, no empty band */
  const ev=await p.evaluate(async()=>{const b0=rsnap();S.duc+=1;window.__kitLastEvArt={src:(typeof PH!=="undefined"&&PH.ev)||"img/title-key.webp",lab:""};resultShow('Dạo vườn',b0,null);await new Promise(r=>setTimeout(r,500));
   const t=document.getElementById('rtoast');if(!t.classList.contains('kevres'))return {err:'no kevres'};const cs=getComputedStyle(t);const R=t.getBoundingClientRect();const rt=t.querySelector('.rt').getBoundingClientRect();const pic=t.querySelector('.kpevr').getBoundingClientRect();
   return {band:Math.round(R.bottom-parseFloat(cs.paddingBottom)-parseFloat(cs.borderBottomWidth)-Math.max(rt.bottom,pic.bottom>rt.bottom+1?rt.bottom:pic.bottom)),rtH:Math.round(rt.height),picH:Math.round(pic.height),cardH:Math.round(R.height)}});
  chk(`${wh} event-result card (picture + short rows): height = content, no empty band`,!ev.err&&ev.band<=2&&ev.picH<=Math.max(72,ev.rtH)+1,ev);
  chk(`${wh} no page errors`,!errs.length,errs.slice(0,3));await p.close()}
 await b.close();console.log(fails?'KIT-RES-FOLD FAIL '+fails:'KIT-RES-FOLD PASS');process.exit(fails?1:0)})();
