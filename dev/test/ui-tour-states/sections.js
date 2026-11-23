/* sections of ui-tour-states: each run({p,f,shot,walk,seed}) seeds a state and shoots views. */
const CLEAN=()=>{for(let i=0;i<4;i++)document.querySelectorAll('[data-km-close]').forEach(b=>b.click());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
 const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');try{kg82Close()}catch(e){}document.querySelectorAll('.kmov').forEach(e=>{e.hidden=true;e.classList.remove('on')});
 document.querySelectorAll('.kroul,#kroul,#kroulw,#klife').forEach(e=>e.id==='klife'?(e.hidden=true,e.classList.remove('on')):e.remove());try{render()}catch(e){}};
const clean=f=>f.evaluate(CLEAN);
/* scroller of the panel: first ancestor (or itself) that scrolls */
const SCR=()=>{let e=document.getElementById('panel');while(e&&e!==document.body){const cs=getComputedStyle(e);if(/(auto|scroll)/.test(cs.overflowY)&&e.scrollHeight>e.clientHeight+60)return e;e=e.parentElement}
 let best=null;document.querySelectorAll('#panel *').forEach(x=>{if(x.offsetParent&&x.scrollHeight>x.clientHeight+60&&/(auto|scroll)/.test(getComputedStyle(x).overflowY)&&(!best||x.clientHeight>best.clientHeight))best=x});if(best)return best;
 const d=document.scrollingElement;return d.scrollHeight>d.clientHeight+60?d:null};
const DISMISS=()=>{let n=0;for(let r=0;r<4;r++){const vis=e=>!!(e&&!e.hidden&&e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden'&&getComputedStyle(e).display!=='none');
  const g=[...document.querySelectorAll('button')].filter(b=>vis(b)&&!b.closest('#panel')&&/^Đã hiểu$/.test(b.textContent.trim())&&!b.closest('#modal')&&!b.closest('.kmbox'));g.forEach(b=>b.click());n+=g.length;
  /* stage dialogue scenes (random cung nữ talk) advance with «Tiếp▸» outside the panel */
  const t=[...document.querySelectorAll('button')].filter(b=>vis(b)&&!b.closest('#panel')&&!b.closest('#modal')&&!b.closest('.kmbox')&&/^Tiếp\s*▸?$/.test(b.textContent.trim()));t.forEach(b=>b.click());n+=t.length;
  const L=[...document.querySelectorAll('#modal,.kmbox,#kmrew,.kmov,#dawn')].filter(vis);if(!L.length&&!g.length&&!t.length)break;
  for(const e of L){const x=e.querySelector('[data-km-close]');const b=[...e.querySelectorAll('button')].find(b=>vis(b)&&/^(Nhận|Đóng|Thôi|Tiếp|Đã hiểu|Đã rõ|Xong)/.test(b.textContent.trim()));
   if(x)x.click();else if(b)b.click();else{e.hidden=true}n++}Q.length=0}
 try{render()}catch(e){}return n};
async function view(f,shot,group,title){/* delayed overlays (edict/bloom .kmov, birth cards) arrive ~0.5-1 s after a tab switch: dismiss until two quiet checks in a row (22/11 refresh) */
 for(let q=0,i=0;q<2&&i<8;i++){if(await f.evaluate(DISMISS)){q=0;await f.waitForTimeout(600)}else{q++;await f.waitForTimeout(500)}}await f.evaluate(`(()=>{const e=(${SCR})();if(e)e.scrollTop=0})()`);await shot(group,title,'',1);
 const sc=await f.evaluate(`(()=>{const e=(${SCR})();if(!e)return 0;e.scrollTop=e.scrollHeight;return 1})()`);if(sc){await f.waitForTimeout(350);await shot(group,title+' (cuộn xuống)','',1)}
 await f.evaluate(`(()=>{const e=(${SCR})();if(e)e.scrollTop=0})()`)}
/* modal visible? + click first real option */
const MODAL_ON=()=>{const vis=e=>!!(e&&!e.hidden&&e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden');const m=document.getElementById('modal');return vis(m)||[...document.querySelectorAll('.kmbox')].some(vis)};
async function waitModal(f,ms){for(let t=0;t<(ms||4000);t+=250){if(await f.evaluate(MODAL_ON))return true;await f.waitForTimeout(250)}return false}
async function pickFirst(f){return f.evaluate(()=>{const box=[...document.querySelectorAll('#modal,.kmbox')].filter(b=>!b.hidden&&b.getClientRects().length);for(const bx of box){const bs=[...bx.querySelectorAll('button')].filter(b=>b.getClientRects().length&&!b.disabled&&!b.matches('[data-km-close],.kmx,.kinfo,.lnk'));if(bs.length){bs[0].click();return bs[0].textContent.trim().slice(0,40)}}return ''})}
async function richWalk(ctx,group,opt,onlyTabs){const {f,shot,walk,seed}=ctx;await f.evaluate(`(${seed.rich})(${JSON.stringify(opt)})`);await f.waitForTimeout(800);await clean(f);
 await walk(f,async path=>{const t=group+' · '+path.join(' › ');await view(f,shot,group,t);
  /* kit sub-tab rows inside the view (Mệnh truyện chương, Việc nhờ, Hành sự nhóm): one shot per extra tab */
  const ks=await f.evaluate(()=>{const row=document.querySelector('#panel [data-ktsub]');return row?[...row.querySelectorAll('[data-ktsv]')].map(b=>[b.dataset.ktsv,b.textContent.trim().replace(/\s+/g,' ')]):[]});
  for(const [k,kn] of ks.slice(1)){await f.evaluate(k=>{const b=document.querySelector(`#panel [data-ktsub] [data-ktsv="${k}"]`);if(b)b.click()},k);await f.waitForTimeout(450);await view(f,shot,group,t+' › '+kn)}
  if(ks.length>1)await f.evaluate(k=>{const b=document.querySelector(`#panel [data-ktsub] [data-ktsv="${k}"]`);if(b)b.click()},ks[0][0]);
 },onlyTabs,()=>f.evaluate(DISMISS))}
module.exports.list=[
 {k:'tabs',run:async c=>richWalk(c,'A. Tab — đời đầy đủ (Quý phi, có phe, có con)',{org:'tt',rank:5})},
 {k:'queen',seed:777,run:async c=>{await richWalk(c,'B. Tab — khi ta là Hoàng hậu',{org:'tt',rank:7,queen:1},['court','rel','kid'])}},
];
module.exports.h={DISMISS,clean,view,waitModal,pickFirst,MODAL_ON};
/* ---------- popups / dialogs in filled states ---------- */
const H=module.exports.h;
const NOMOV=()=>{document.querySelectorAll('.kmov').forEach(e=>{if(e.getClientRects().length){e.hidden=true;e.classList.remove('on')}});[...document.querySelectorAll('button')].filter(b=>b.getClientRects().length&&/^Đã hiểu$/.test(b.textContent.trim())&&!b.closest('#modal,.kmbox,#panel')).forEach(b=>b.click())};
async function chain(c,group,title,n){const {f,shot}=c;for(let i=0;i<(n||1);i++){const wm=await H.waitModal(f,3500);if(!wm)break;await f.waitForTimeout(900);await f.evaluate(NOMOV);
  await shot(group,title+(i?` — bước ${i+1}`:''));const t=await H.pickFirst(f);if(!t)break;await f.waitForTimeout(1300);
  if(!(await f.evaluate(H.MODAL_ON))){await f.evaluate(NOMOV);await f.waitForTimeout(500);await shot(group,title+` — sau khi chọn «${t}»`);break}}}
async function rich(c,opt){console.log("seed",JSON.stringify(await c.f.evaluate(`(${c.seed.rich})(${JSON.stringify(opt||{org:"tt",rank:5})})`)));await c.f.waitForTimeout(2500);await H.clean(c.f);await c.f.waitForTimeout(800);await H.clean(c.f);await c.f.evaluate(DISMISS);await c.f.waitForTimeout(600);await c.f.evaluate(DISMISS)}
const G='C. Popup — trạng thái đầy đủ';
module.exports.list.push(
 {k:'fac',run:async c=>{const {f,shot}=c;await rich(c);
  /* she leaves her faction: the «chưa vào phe» view WITH factions listed */
  await f.evaluate(()=>{leaveFac(S);tab='rel';render();const b=[...document.querySelectorAll('#panel .ksubb')].find(e=>e.dataset.ksub==='fac');if(b)b.click()});await f.waitForTimeout(500);
  await H.view(f,shot,G,'Giao tình › Phe phái — ta chưa vào phe, trong cung đã có 3 phe');
  /* a faction leader invites her: the receiver card goes to the notice tray (kitNotice) → HUD shows a notice waiting */
  await f.evaluate(()=>{const F=(S.facs||[]).filter(x=>!x.m.includes(key(S)));const L=F.length?facLeader(F[0]):null;if(L){const t=facInvite(L,S);if(t)log(t)}tab='act';render()});await f.waitForTimeout(900);
  await shot(G,'Thông báo chờ — có người mời ta vào phe (góc trên)');
  await f.evaluate(()=>{try{kitNoticeOpen()}catch(e){}});await f.waitForTimeout(900);await shot(G,'Bảng thông báo — các việc đang chờ ta');
  await f.evaluate(()=>{const L=kitNoticeList().filter(x=>/^rcv:/.test(x.id));try{document.querySelectorAll('.kmbox').forEach(b=>{const x=b.querySelector('[data-km-close]');if(x)x.click()})}catch(e){}if(L.length)kitNoticeOpen(L[L.length-1].id)});
  await chain(c,G,'Phe phái — có người mời ta vào phe',2)}},
 {k:'q72',run:async c=>{const {f,shot}=c;await rich(c);
  await f.evaluate(()=>{const q=q72();q.a.length=0;q.mo={};const PL=["cung","vuon","tyv","dtd","ksp","tcv","ccd","nvp"];let x=null;for(const pl of PL){try{x=q72Choose(q72Cands(pl),pl)}catch(e){}if(x)break}if(x){q72Offer(x,"ask");showModal()}});
  await chain(c,G,'Việc nhờ — có người ngỏ lời nhờ',2)}},
 {k:'hon',run:async c=>{const {f}=c;await rich(c,{org:'tt',rank:5,nobetroth:1});
  await f.evaluate(()=>{const d=S.kids.find(k=>k.sex==='f'&&k.age>=16&&!k.hB);if(d){h54PoolUp();Q.length=0;pushDil(mkP("h54ban",{k:d.name,c:h54Cands(S,d).map(s=>s.id)}),"Bàn hôn sự");showModal()}});
  await chain(c,G,'Hôn sự — Bàn hôn sự cho công chúa 17 tuổi',3)}},
 {k:'night',run:async c=>{const {f}=c;await rich(c,{org:'tt',rank:2,nokids:1});await f.evaluate(()=>{nightScene();showModal()});await chain(c,G,'Thị tẩm — Chuẩn bị thị tẩm',4)}},
 {k:'dress',run:async c=>{const {f,shot}=c;await rich(c);await f.evaluate(()=>{try{toilOpen()}catch(e){console.log('dress',e.message)}});await f.waitForTimeout(2500);await f.evaluate(NOMOV);await f.waitForTimeout(600);await shot(G,'Trước gương đồng — chọn y phục (kitDressPicker)')}},
 {k:'mg',run:async c=>{const {f}=c;await rich(c,{org:'tt',rank:3,nokids:1,nofac:1});const kinds=await f.evaluate(()=>Object.keys(KG82_KIND));console.log('kinds',kinds.length);
  const MG='D. Trò chơi nhỏ — màn kết quả';
  /* the promotion edict (Thánh chỉ, .kmov) left by the seed covered every result screen in the first refresh: hide it before each shot (22/11) */
  const shot=async(g,t)=>{await f.evaluate(NOMOV);await f.waitForTimeout(400);await f.evaluate(NOMOV);return c.shot(g,t)};
  const reset=()=>f.evaluate(()=>{try{kg82Close()}catch(e){}document.querySelectorAll('.kmbox').forEach(b=>{let r=b;while(r.parentElement&&r.parentElement!==document.body)r=r.parentElement;r.remove()});const k=document.getElementById('krkov');if(k)k.remove()});
  const skip=async()=>{await f.waitForTimeout(900);await f.evaluate(()=>{const b=document.getElementById('kg82skip');if(b)b.click()});let res=false;
   for(let t=0;t<30&&!res;t++){await f.waitForTimeout(250);res=await f.evaluate(()=>{const r=document.getElementById('kg82box-res');return !!(r&&!r.hidden&&r.textContent.trim())})}return res};
  for(const k of kinds){await reset();const nm=await f.evaluate(k=>{const K=KG82_KIND[k]||{};return K.n||K.name||K.t||k},k);
   await f.evaluate(k=>{try{playArt({art:k,title:'Tự luyện',onDone:()=>{}})}catch(e){}},k);
   if(await skip())await shot(MG,`${nm} — tự luyện: kết quả (Để trời định)`);else console.log('mg no result',k)}
  /* contest: podium (Vinh danh) then the next card, two kinds */
  for(const k of kinds.slice(0,2)){await reset();const nm=await f.evaluate(k=>{const K=KG82_KIND[k]||{};return K.n||K.name||K.t||k},k);
   await f.evaluate(k=>{try{startContest({art:k,title:'Hội thi',rivals:liveRivals(true).filter(v=>v!==S).slice(0,4),prep:6,onDone:()=>{}})}catch(e){}},k);
   if(await skip()){await f.waitForTimeout(1200);await shot(MG,`${nm} — hội thi: bảng vinh danh`);
    await f.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(b=>b.getClientRects().length&&/^Tiếp/.test(b.textContent.trim()));if(b)b.click()});await f.waitForTimeout(1500);await shot(MG,`${nm} — hội thi: sau bảng vinh danh`)}}}},
);
module.exports.list.push(
 {k:'tut',init:`try{Object.defineProperty(Navigator.prototype,'webdriver',{get:()=>false});localStorage.setItem('hclh-tut-test','1')}catch(e){}`,run:async c=>{const {f,shot}=c;
  await rich(c,{org:'tt',rank:0,nokids:1,nofac:1,nomen:1,nopet:1,noq72:1,noge:1});
  await f.waitForTimeout(3000);await H.clean(f);await f.evaluate(()=>{try{S.tutOld=0;S.tutTour=0}catch(e){}window.kitTour()});let last=-2,stuck=0;
  let miss=0;
  for(let i=0;i<45&&stuck<3&&miss<8;i++){await f.waitForTimeout(900);const st=await f.evaluate(()=>{const r=document.getElementById('ktut');return {on:!!(r&&!r.hidden&&r.querySelector('.ktut-card')),step:KTUT.step,live:KTUT.on,t:(r&&r.querySelector('.ktut-card')||{}).innerText||''}});
   if(!st.live)break;if(!st.on){miss++;await H.clean(f);continue}miss=0;
   const sig=st.step+'|'+st.t;if(sig===last){stuck++;const bb=await f.evaluate(()=>{const c=[...document.querySelectorAll('#panel *')].filter(e=>e.getClientRects().length&&e.children.length>2&&/CẦN|Cần/.test(e.innerText)&&e.getBoundingClientRect().height>60&&e.getBoundingClientRect().height<400);const cd=document.querySelector('#ktut .ktut-card');const ct=cd?cd.getBoundingClientRect().top:innerHeight;const e=c.find(x=>{const r=x.getBoundingClientRect();return r.bottom>140&&r.top<ct-20});if(!e)return null;const r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:Math.min(r.bottom-6,ct-22)}});
   if(bb)await c.p.mouse.click(bb.x,bb.y);continue}stuck=0;last=sig;
   await shot('E. Lời dặn tân thủ (thẻ hướng dẫn)',st.t.replace(/LỜI DẶN/,"").replace(/\s+/g," ").trim().slice(0,70));
   await f.evaluate(()=>{const bs=[...document.querySelectorAll('#ktut .ktut-card button')].filter(b=>b.getClientRects().length);const nx=bs.find(b=>/Tiếp|Hiểu|Rồi|Được|Xong|›/.test(b.textContent)&&!/Bỏ qua/.test(b.textContent));if(nx)nx.click()})}}},
 {k:'cnv',run:async c=>{const {f,shot}=c;await f.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<120;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(typeof isSrv==='function'&&isSrv())break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove());render()});
  const seen=new Set();let n=0;
  await f.waitForTimeout(2500);await H.clean(f);
  const DAWN=()=>{const w=document.getElementById('dawn');if(w&&!w.hidden&&w.getClientRects().length&&w.innerHTML.trim()){const b=[...w.querySelectorAll('button')].find(b=>b.getClientRects().length);if(b)b.click();else{w.hidden=true;w.innerHTML=''}return true}const k=document.getElementById('klife');if(k&&!k.hidden&&k.getClientRects().length){const b=[...k.querySelectorAll('button')].pop();if(b)b.click();else k.hidden=true;return true}return false};
  for(let i=0;i<220&&n<14;i++){if(await f.evaluate(DAWN)){await f.waitForTimeout(900);continue}
   if(await f.evaluate(H.MODAL_ON)){await f.waitForTimeout(1800);/* the night fade must be over: wait until #dawn is gone */
    for(let t=0;t<12&&await f.evaluate(()=>{const w=document.getElementById('dawn');return !!(w&&!w.hidden&&w.offsetParent)});t++)await f.waitForTimeout(400);
    const tt=await f.evaluate(()=>{const b=[...document.querySelectorAll('#modal,.kmbox')].find(x=>!x.hidden&&x.getClientRects().length);const h=b&&b.querySelector('h2,h3,.kmt,#mt,.kmtitle');return (h?h.textContent:(b?b.innerText:'')).trim().replace(/\s+/g,' ').slice(0,70)});
    if(tt&&!seen.has(tt)){seen.add(tt);n++;await shot('F. Cung nữ — popup chụp lại (bản cũ bị tối)',tt)}
    if(!(await H.pickFirst(f)))await H.clean(f);await f.waitForTimeout(700)}
   else{await f.evaluate(()=>{try{const b=[...document.querySelectorAll('#panel button')].filter(b=>b.offsetParent&&!b.disabled&&/act|kact|pbtn|option/.test(b.className));if(b.length&&Math.random()<0.7)b[Math.floor(Math.random()*b.length)].click();else nextBuoi()}catch(e){}});await f.waitForTimeout(600)}}}},
);
/* detail: tap the first real act button of a filled view → the dialog / result it opens */
const OPEN=async(f,t,sub,kinv)=>f.evaluate(([t,sub,kinv])=>{tab=t;render();if(sub){const b=[...document.querySelectorAll('#panel .ksubb')].find(e=>e.dataset.ksub===sub||e.dataset.kinvsub===sub);if(b)b.click()}},[t,sub,kinv]);
const ACTS=f=>f.evaluate(()=>[...document.querySelectorAll('#panel button')].filter(b=>b.getClientRects().length&&!b.disabled&&!b.closest('.ksub,.pctabs,[data-ktsub],.kpbar')&&/Tốn|TỐN|tốn/.test(b.textContent)).map(b=>b.textContent.trim().replace(/\s+/g,' ').slice(0,50)));
module.exports.list.push({k:'detail',run:async c=>{const {f,shot}=c;
 const V=[['court','men','Hậu cung › Nam nhân'],['kid','kid','Hoàng tự › Con của ta'],['kid','qt','Hoàng tự › Quý tộc kén rể'],['inv','pet','Tư trang › Thú cưng'],['rel','fac','Giao tình › Phe phái'],['story','q72','Mệnh truyện › Việc nhờ']];
 for(const [t,sub,name] of V){await rich(c);await OPEN(f,t,sub);await f.waitForTimeout(500);const A=await ACTS(f);console.log(name,JSON.stringify(A.slice(0,8)));
  for(let i=0;i<Math.min(2,A.length);i++){if(i){await H.clean(f);await OPEN(f,t,sub);await f.waitForTimeout(400)}
   await f.evaluate(i=>{const B=[...document.querySelectorAll('#panel button')].filter(b=>b.getClientRects().length&&!b.disabled&&!b.closest('.ksub,.pctabs,[data-ktsub],.kpbar')&&/Tốn|TỐN|tốn/.test(b.textContent));if(B[i])B[i].click()},i);
   await f.waitForTimeout(900);if(await f.evaluate(H.MODAL_ON))await chain(c,'C. Popup — trạng thái đầy đủ',`${name} — bấm «${A[i].replace(/(Tốn|TỐN|tốn).*$/,'').trim()}»`,2);
   else{await f.evaluate(NOMOV);await f.waitForTimeout(500);await shot('C. Popup — trạng thái đầy đủ',`${name} — sau khi bấm «${A[i].replace(/(Tốn|TỐN|tốn).*$/,'').trim()}»`)}}}}});
