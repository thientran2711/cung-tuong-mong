/* KIT §51 kit table test (owner 11/15 17:27Z): every label|value list in the game is ONE kit table (kitRows .kb grid): the values of all
   rows start at the same x (±1px), labels wrap inside their column and never stand one word per line.
   Opens every tab + sub-tab + person page + sub-category, the HUD rule dialogs (LUẬT: Ân thưởng, Bổng lộc, Thang nguy hiểm, every ⓘ),
   item dialogs, the shop, the end-of-life card, and measures every list it finds:
     kit   = .kb grid (kitRows) rows       → value x = left of .krv
     legacy= .pcrow rows (old two-cell flex row) → value x = left of the 2nd cell   (any legacy row with two cells is a FAIL)
     flex  = any other flex row with justify-content:space-between and two text cells, ≥ 2 such rows in one parent
   usage: node dev/test/kit-table.js <url of a build at the site root> <W>x<H>@dpr [outdir for shots] [only steps,comma]
   Prints JSON {size, lists:[{at,kind,rows,spread,oneWord,label}], fails, errs}. Exit 1 when a list fails. */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,SZ,OUT,ONLY]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);if(OUT)fs.mkdirSync(OUT,{recursive:true});
const SCAN=()=>{const roots=[...document.querySelectorAll('#panel,#modal:not([hidden]),.kbk')].filter(e=>e.offsetParent||e.id==='modal');const out=[];
 const vis=e=>{if(!e)return false;const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(e).visibility!=='hidden'};
 const x0=e=>{const rs=[...e.getClientRects()].filter(r=>r.width>0);if(!rs.length)return null;return Math.min(...rs.map(r=>r.left))};
 const lines=e=>{const rg=document.createRange();rg.selectNodeContents(e);const tops=new Set([...rg.getClientRects()].filter(r=>r.width>1).map(r=>Math.round(r.top/4)));return Math.max(1,tops.size)};
 const where=e=>{const m=e.closest('#modal');if(m){const t=m.querySelector('.kptitle,#mt');return 'dialog:'+(t?t.textContent.trim().slice(0,30):'?')}if(e.closest('.kbk'))return 'book';
  const on=document.querySelector('#tabs [data-tab].on,#tabs [aria-selected="true"]');const sub=document.querySelector('#panel .ksubb.on');const pct=document.querySelector('#panel .pct.on');
  return 'tab:'+(sub?sub.textContent.trim():on?on.textContent.trim():'?')+(pct?' / '+pct.textContent.trim().replace(/\s*\d+(\/\d+)?$/,''):'')};
 const add=(kind,par,rows)=>{rows=rows.filter(r=>vis(r.l)&&vis(r.v)&&r.l.textContent.trim()&&r.v.textContent.trim());if(rows.length<2)return;
  const xs=rows.map(r=>x0(r.v)).filter(x=>x!=null);const spread=Math.round((Math.max(...xs)-Math.min(...xs))*10)/10;
  const oneWord=rows.filter(r=>{const w=r.l.textContent.trim().split(/\s+/).length;const n=lines(r.l);return w>=2&&n>=w}).map(r=>r.l.textContent.trim());
  const ovf=rows.filter(r=>r.l.scrollWidth>r.l.clientWidth+2||r.v.scrollWidth>r.v.clientWidth+2).map(r=>r.l.textContent.trim().slice(0,20));
  out.push({at:where(par),kind,rows:rows.length,spread,oneWord,ovf,label:rows[0].l.textContent.trim().slice(0,28)})};
 for(const R of roots){
  R.querySelectorAll('.kb').forEach(kb=>{if(!vis(kb))return;add('kit',kb,[...kb.querySelectorAll(':scope>.kr')].map(r=>({l:r.querySelector(':scope>.krl'),v:r.querySelector(':scope>.krv')})).filter(r=>r.l&&r.v))});
  /* two kit tables right after each other (no heading between) read as ONE list: their values must line up too */
  R.querySelectorAll('.kb').forEach(kb=>{const nx=kb.nextElementSibling;if(!nx||!nx.matches('.kb')||!vis(kb)||!vis(nx))return;
   const rs=[kb,nx].flatMap(k=>[...k.querySelectorAll(':scope>.kr')].map(r=>({l:r.querySelector(':scope>.krl'),v:r.querySelector(':scope>.krv')})).filter(r=>r.l&&r.v));add('kit-adjacent',kb,rs)});
  /* KIT §51.1 (owner 15/11 "Hàng trên hàng dưới chưa alignment"): kit tables that read as ONE block (same left edge, no heading between,
     a small vertical gap, e.g. two kitPanel sections where the 2nd has no heading) must share one label column: values on one line */
  {const K=[...R.querySelectorAll('.kb')].filter(vis);const HD='h1,h2,h3,h4,h5,h6,.kpst,.kptitle,legend';const par=K.map((_,i)=>i);const f=i=>par[i]===i?i:(par[i]=f(par[i]));
   for(let i=0;i+1<K.length;i++){const A=K[i],B=K[i+1];if(A.contains(B)||B.contains(A))continue;const a=A.getBoundingClientRect(),b=B.getBoundingClientRect();
    if(Math.abs(a.left-b.left)>2||b.top-a.bottom>22||b.top<a.bottom-2)continue;if(A.closest('button')!==B.closest('button'))continue;
    const rg=document.createRange();rg.setStartAfter(A);rg.setEndBefore(B);const fr=rg.cloneContents();if(fr.querySelector&&fr.querySelector(HD))continue;
    let hd=false;R.querySelectorAll(HD).forEach(h=>{if(vis(h)&&(A.compareDocumentPosition(h)&4)&&(h.compareDocumentPosition(B)&4))hd=true});if(hd)continue;par[f(i+1)]=f(i)}
   const G=new Map();K.forEach((k,i)=>{const r=f(i);if(!G.has(r))G.set(r,[]);G.get(r).push(k)});
   G.forEach(ks=>{if(ks.length<2)return;add('kit-block',ks[0],ks.flatMap(k=>[...k.querySelectorAll(':scope>.kr')].map(r=>({l:r.querySelector(':scope>.krl'),v:r.querySelector(':scope>.krv')})).filter(r=>r.l&&r.v)))})}
  const pars=new Set([...R.querySelectorAll('.pcrow')].map(r=>r.parentElement));
  pars.forEach(par=>add('legacy',par,[...par.querySelectorAll(':scope>.pcrow')].map(r=>{const c=[...r.children].filter(vis);return c.length>=2?{l:c[0],v:c[1]}:null}).filter(Boolean)));
  const fl=new Map();R.querySelectorAll('div,li,p,label').forEach(e=>{if(e.classList.contains('pcrow')||!vis(e)||e.closest('.kb,button,.opts,#tabs,.pager,.kpkb'))return;const cs=getComputedStyle(e);if(!/flex/.test(cs.display)||cs.flexDirection!=='row'||cs.justifyContent!=='space-between')return;
   const c=[...e.children].filter(vis);if(c.length!==2||!c[0].textContent.trim()||!c[1].textContent.trim())return;const p=e.parentElement;if(!fl.has(p))fl.set(p,[]);fl.get(p).push({l:c[0],v:c[1]})});
  fl.forEach((rows,p)=>add('flex',p,rows))}
 return out};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:60000});
 await p.evaluate(()=>{Q.length=0;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}
  try{kn();for(const v of rivals){S.met[v.id]=1;try{k61Meet(v,"gặp",3)}catch(e){}}k61Meet(S.emp,"gặp",3)}catch(e){}
  try{S.awards=[{d:"T3/1",why:"Đêm thị tẩm vui",it:"Trâm ngọc bích",bac:0},{d:"T5/1",why:"Sinh hoàng tử",it:"Ngọc bội ngự ban",bac:30}]}catch(e){}
  try{const mk=(sex,age,fond)=>{const k=mkKid(sex,age);k.fond=fond;k.tal=40+age*2;return k};[['m',4,60],['f',9,55],['m',16,70]].forEach(a=>S.kids.push(mk(...a)));
   const R=rivals.filter(v=>v.alive&&!v.out);[[0,'m',12,50],[1,'m',8,72]].forEach(([i,...a])=>{if(R[i])R[i].kids.push(mk(...a))});try{allKids().forEach(([k])=>k61Know(k,'',true,3))}catch(e){}}catch(e){}
  try{S.news=[{w:wk(),t:"Tin thử một",id:rivals[0].id},{w:wk(),t:"Tin thử hai",id:rivals[1].id}]}catch(e){}});
 const clean=()=>p.evaluate(()=>{['kroul','kroulw'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kroul').forEach(e=>e.remove());
  for(let i=0;i<4;i++)document.querySelectorAll('[data-km-close]').forEach(b=>b.click());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');document.querySelectorAll('.kbk').forEach(e=>e.remove());try{render()}catch(e){}});
 await p.waitForTimeout(1200);await clean();
 const L=[];let shotN=0;const scan=async(tag,shot)=>{if(process.env.KT_DEBUG)console.error(tag);await p.waitForTimeout(350);const r=await p.evaluate(SCAN);r.forEach(x=>{x.step=tag;L.push(x)});
  if(OUT&&shot&&r.some(x=>x.kind!=='kit'||x.spread>1||x.oneWord.length))await p.screenshot({path:`${OUT}/${W}x${H}-${String(++shotN).padStart(2,'0')}-${tag.replace(/[^a-z0-9]+/gi,'_')}.jpg`,type:'jpeg',quality:60})};
 const steps=(ONLY||'tabs,hud,rules,items,shop,mood,end').split(',');
 const modal=async(tag,fn,arg)=>{await clean();const ok=await p.evaluate(fn,arg).catch(e=>'ERR '+e.message.slice(0,80));await p.waitForTimeout(700);await scan(tag,true);return ok};
 if(steps.includes('tabs')){
  const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].map(b=>b.dataset.tab));
  for(const t of tabs){await clean();await p.evaluate(t=>{const b=document.querySelector(`#tabs [data-tab="${t}"]`);if(b)b.click()},t);await p.waitForTimeout(500);
   const subs=await p.evaluate(()=>[...document.querySelectorAll('#panel .ksubb')].map((b,i)=>i));
   for(const si of (subs.length?subs:[-1])){if(si>=0){await p.evaluate(i=>{const b=document.querySelectorAll('#panel .ksubb')[i];if(b)b.click()},si);await p.waitForTimeout(500)}
    const nf=await p.evaluate(()=>document.querySelectorAll('#panel [data-pg]').length);
    for(let fi=0;fi<Math.min(4,Math.max(1,nf));fi++){
     if(nf){await p.evaluate(i=>{const f=[...document.querySelectorAll('#panel .pface[data-pg]')][i];if(f)f.click()},fi);await p.waitForTimeout(400)}
     const np=await p.evaluate(()=>document.querySelectorAll('#panel .pct').length);
     for(let ci=0;ci<Math.max(1,np);ci++){if(np){await p.evaluate(i=>{const c=document.querySelectorAll('#panel .pct')[i];if(c)c.click()},ci);await p.waitForTimeout(350)}
      await scan(`${t}.${si}.${fi}.${ci}`,ci===0&&fi===0)}}}}}
 if(steps.includes('hud')){
  const hx=await p.evaluate(()=>[...document.querySelectorAll('.hc[data-hx]')].map(b=>b.dataset.hx));
  for(const k of hx)await modal('hud.'+k,k=>{const b=document.querySelector(`.hc[data-hx="${k}"]`);if(b)b.click();return !!b},k)}
 if(steps.includes('rules')){
  await modal('rule.aw',()=>{Q.unshift({t:"Ân thưởng",h:awCard()});showModal();return 1});
  await modal('rule.bl',()=>{Q.unshift({t:"Bổng lộc",h:blCard()});showModal();return 1});
  await modal('rule.band',()=>{Q.unshift({t:"Thang nguy hiểm",h:bandCard()});showModal();return 1});
  await modal('rule.rankboard',()=>{if(typeof rankBoard!=='function')return 0;Q.unshift({t:"Bảng phẩm vị",h:rankBoard()});showModal();return 1});
  await modal('rule.score',()=>{if(typeof scoreTable!=='function')return 0;const h=scoreTable();if(!h)return 0;Q.unshift({t:"Tranh ghế",h});showModal();return 1});
  await modal('rule.srv',()=>{if(typeof srvRows!=='function')return 0;try{const h=[].concat(srvRows()).join('');Q.unshift({t:"Hầu hạ",h:`<div class="pcb rows">${h}</div>`});showModal();return 1}catch(e){return 'x '+e.message}});
  await modal('rule.nl',()=>{if(typeof panel67!=='function')return 0;try{Q.unshift({t:"Bản thân",h:panel67()});showModal();return 1}catch(e){return 'x '+e.message}});
  // every ⓘ / info link on every tab
  const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].map(b=>b.dataset.tab));
  for(const t of tabs){await clean();await p.evaluate(t=>{const b=document.querySelector(`#tabs [data-tab="${t}"]`);if(b)b.click()},t);await p.waitForTimeout(400);
   const n=await p.evaluate(()=>[...document.querySelectorAll('#panel .lnk,#panel [data-acinfo],#panel [data-ladder],#panel [data-v85tab]')].filter(e=>e.offsetParent).length);
   for(let i=0;i<Math.min(n,6);i++){await clean();await p.evaluate(t=>{const b=document.querySelector(`#tabs [data-tab="${t}"]`);if(b)b.click()},t);await p.waitForTimeout(300);
    await p.evaluate(i=>{const e=[...document.querySelectorAll('#panel .lnk,#panel [data-acinfo],#panel [data-ladder],#panel [data-v85tab]')].filter(e=>e.offsetParent)[i];if(e)e.click()},i);await p.waitForTimeout(600);await scan(`info.${t}.${i}`,true)}}}
 if(steps.includes('items')){
  await clean();await p.evaluate(()=>{const b=document.querySelector('#tabs [data-tab="inv"]');if(b)b.click()});await p.waitForTimeout(500);
  const n=await p.evaluate(()=>document.querySelectorAll('#panel [data-kinvi]').length);
  for(let i=0;i<Math.min(n,4);i++){await clean();await p.evaluate(()=>{const b=document.querySelector('#tabs [data-tab="inv"]');if(b)b.click()});await p.waitForTimeout(400);
   await p.evaluate(i=>{const e=document.querySelectorAll('#panel [data-kinvi]')[i];if(e)e.click()},i);await p.waitForTimeout(700);await scan('item.'+i,true)}}
 if(steps.includes('shop')){
  await clean();await p.evaluate(()=>{const b=document.querySelector('#tabs [data-tab="inv"]');if(b)b.click()});await p.waitForTimeout(500);
  await p.evaluate(()=>{S.bac=500;const b=document.querySelector('#panel [data-inv="shop"]');if(b)b.click()});await p.waitForTimeout(900);await scan('shop',true);
  for(let i=0;i<3;i++){await p.evaluate(i=>{const e=document.querySelectorAll('#modal [data-kshdet]')[i];if(e)e.click()},i);await p.waitForTimeout(700);await scan('shop.item'+i,i===0);
   await p.evaluate(()=>{const b=document.querySelector('#modal .kshdet [data-kitx],#modal [data-kshback]');if(b)b.click()});await p.waitForTimeout(300)}
  await clean();await p.evaluate(()=>{const b=document.querySelector('#tabs [data-tab="inv"]');if(b)b.click()});await p.waitForTimeout(500);
  const ne=await p.evaluate(()=>document.querySelectorAll('#panel [data-keqi]').length);
  for(let i=0;i<Math.min(ne,3);i++){await p.evaluate(i=>{const e=document.querySelectorAll('#panel [data-keqi]')[i];if(e)e.click()},i);await p.waitForTimeout(600);await scan('wear.'+i,true)}}
 if(steps.includes('mood')){
  /* the mood dialog (jevb emoBox: Đang tác động rows + Ảnh hưởng) for the player and a few women, with causes */
  await p.evaluate(()=>{try{const R=rivals.filter(v=>v.alive&&!v.out).slice(0,3);R.forEach((v,i)=>{emoSet(v,["lo","ghen","vui"][i],40,"Khương Lạc Anh được tấn phong");emoSet(v,"gian",30,"bị trái ý")});emoSet(S,"lo",30,"chuyện thử")}catch(e){}});
  const ks=await p.evaluate(()=>[S].concat(rivals.filter(v=>v.alive&&!v.out).slice(0,3)).map(p=>{try{return emoKey(emoRes(p))}catch(e){return null}}).filter(Boolean));
  for(const k of ks)await modal('mood.'+k,k=>{try{emoBox(k);return 1}catch(e){return 'x '+e.message}},k)}
 if(steps.includes('end')){
  await modal('end.past',()=>{const h=pastHTML();if(!h)return 0;Q.unshift({t:"Sổ luân hồi",h});showModal();return 1});
  await modal('end.card',()=>{try{const s0=start;start=()=>{};over("Kiếp này đã hết","Thử thẻ kết kiếp.","bệnh mà mất",false);window.__s0=s0;return 1}catch(e){return 'x '+e.message}})}
 await clean();
 const fails=L.filter(x=>x.kind!=='kit'||x.spread>1||x.oneWord.length);
 console.log(JSON.stringify({size:SZ,n:L.length,fails:fails.length,lists:L,errs}));await b.close();process.exit(fails.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
