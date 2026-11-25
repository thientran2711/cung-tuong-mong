/* review/ob-ngoaicung (owner OD 25/11 ~22:45Z, law 11): WORDING FAMILY SCAN of the pre-palace road (isKc: home, khuê phòng, phủ, city, journeys).
   usage: node dev/test/ob-ngoaicung/scan.js <site url> <out.json> [--origins=tt,td,cnv,nc,bd] [--size=1180x820@1] [--shots=<dir>]
   Per origin: new life -> home road -> every surface a player reads while she is OUTSIDE the palace: the stage head-count buttons + both open group lists,
   the maid title (kitMaidTitle / figure tag pMaid().rw), the crew chip tips, every bottom tab panel, the person card of the maid.
   Each palace-only word (PALACE below) found is listed with its context. Exit 1 when a palace word sits on a surface that must never have one
   (head-count labels, group lists, maid title, figure tags). Panel text hits are listed for the table (some are legit: "Ngày tuyển cung nữ"). */
const {chromium}=require('playwright');const fs=require('fs');
const A=process.argv.slice(2);const URL=A[0];const OUT=A[1]||'scan.json';
const opt=k=>{const a=A.find(x=>x.startsWith('--'+k+'='));return a?a.split('=')[1]:null};
const ORGS=(opt('origins')||'tt,td,cnv,nc,bd').split(',');const [wh,d]=(opt('size')||'1180x820@1').split('@');const [W,H]=wh.split('x').map(Number);const SH=opt('shots');
const PALACE=/Cung nhân|Chí tôn|[Cc]ung nữ|[Tt]hái giám|(tam|nhị|nhất) đẳng|[Tt]iểu chủ|[Nn]ương nương|[Nn]ội vụ phủ|[Pp]hi tần|[Cc]hủ tử/g;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const rep={};let bad=0;
 for(const ORG of ORGS){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,serviceWorkers:'block',reducedMotion:'reduce'});
  await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click());document.querySelectorAll('[data-km-close]').forEach(b=>{if(b.offsetParent)b.click()})},300)});
  const p=await c.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  const skip=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const o=document.getElementById('kroul');
    if(o&&o.isConnected){const b=[...o.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(b){b.click();return 1}}return 0});if(!n)break;await sleep(700)}};
  await p.goto(URL,{waitUntil:'domcontentloaded'});await sleep(2500);await p.evaluate(()=>{try{localStorage.clear()}catch(e){}});await p.reload({waitUntil:'domcontentloaded'});await sleep(3000);await skip();
  await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skip();
  const rolled=await p.evaluate(o=>{for(let i=0;i<200&&S.origin.k!==o;i++){try{store.set(NL_KEY,null)}catch(e){}start()}
   if(S.origin.k!==o){const O=ORIGINS.find(x=>x.k===o);if(!O)return 'NO-ORIGIN';S.origin=O;nlCard()}return S.origin.k+(S.srv?' srv':'')},ORG);await sleep(600);await skip();
  await p.evaluate(()=>{const b=document.querySelector('#modal [data-kcp="nha"]');if(b)b.click()});await sleep(700);
  for(let i=0;i<40&&await p.evaluate(()=>!!document.getElementById('kroul'));i++)await sleep(500);
  await p.evaluate(()=>{const b=document.querySelector('#modal button[data-nl="ok"]');if(b)b.click()});await sleep(1200);
  await p.evaluate(()=>{for(let i=0;i<12&&Q.length;i++){const m=Q[0];if(m.opts&&m.opts.length)break;closeModal()}tab='act';render()});await sleep(1500);
  const R=await p.evaluate(async()=>{const o={isKc:isKc(),kd:S.kc&&S.kc.kd||'',maid:!!S.maid,staff:(S.staff||[]).length,surf:{}};const put=(k,v)=>o.surf[k]=String(v||'').replace(/\s+/g,' ').trim();
   const w=ms=>new Promise(r=>setTimeout(r,ms));
   put('headcount',[...document.querySelectorAll('#kshR .kgfbtn, #krail [data-rail^=kgf-]')].filter(x=>x.offsetParent).map(x=>x.innerText.replace(/\s+/g,' ')).join(' | '));
   for(const k of ['cn','ct']){window.__kgfOpen=k;try{k3Stage()}catch(e){}await w(300);const f=document.querySelector('#kshR .kgfopen');put('list-'+k,f?f.innerText:'');
    put('tips-'+k,f?[...f.querySelectorAll('[title]')].map(x=>x.title).join(' | '):'')}
   window.__kgfOpen=null;try{k3Stage()}catch(e){}
   put('maidTitle',typeof kitMaidTitle==='function'&&S.maid?kitMaidTitle():'');put('maidFigTag',S.maid&&typeof pMaid==='function'?pMaid().rw:'');
   put('stageTags',[...document.querySelectorAll('.figtag,.kfigt,.ftag,[class*=figname]')].filter(x=>x.offsetParent).map(x=>x.innerText).join(' | '));
   for(const t of ['act','go','rv','staff','rel','kid','inv','art','story']){tab=t;render();await w(500);const P=document.getElementById('panel');put('tab-'+t,P?P.innerText:'')}
   tab='act';render();return o});
  /* --play=N: N random steps at home (cards, options, moves, next buổi; as dev/test/outside/route.js) collecting every dialog (title, speaker tag, text)
     and every new journal line shown while she is still at home: the EVENT / NEWS / DIALOGUE-TAG family */
  const NP=+(opt('play')||0);if(NP){R.ev=await p.evaluate(async n=>{const out=[];const seen=new Set();const L0=S.logSeq||0;const w=ms=>new Promise(r=>setTimeout(r,ms));
   for(let i=0;i<n&&isKc()&&!S.dead;i++){try{if(Q.length)showModal();/* a dialog held for later (jdayq pacing) is what she sees later: sift it as the game will (placeSift), then read it */if(typeof placeSift==='function')placeSift();if(Q.length){const m=Q[0];const who=m.who&&(m.who.rw||m.who.n)||'';const tx=String(m.h||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').slice(0,400);
      const k=m.t+'|'+who;if(!seen.has(k)){seen.add(k);out.push({t:m.t,who,tx,opts:(m.opts||[]).map(o=>String(o.n||'').replace(/<[^>]+>/g,'')).join(' / ')})}
      if(m.opts&&m.opts.length){const L=m.opts.map((o,j)=>j).filter(j=>!m.opts[j].dis&&!m.opts[j].off);chooseM(L.length?L[Math.floor(Math.random()*L.length)]:0)}else closeModal();await w(30);continue}
     const G=new Set(Object.values(typeof KCG==='object'?KCG:{}));const D=deck.map((a,j)=>[a,j]).filter(([a])=>(!G.size||G.has(a.g))&&!a.done&&!a.lock&&can(cardCost(a))&&canPay(a));if(D.length&&Math.random()<.7){act(D[Math.floor(Math.random()*D.length)][1]);continue}
     if(Math.random()<.2){const ks=Object.keys(KCPL).filter(k=>!kcGoWhy(k));if(ks.length){kcGo(ks[Math.floor(Math.random()*ks.length)]);render();continue}}
     nextBuoi()}catch(e){out.push({t:'ERR',tx:e.message})}}
   const lg=(S.logs||[]).slice(0,Math.min(150,Math.max(0,(S.logSeq||0)-L0))).map(x=>String(x).replace(/<[^>]+>/g,''));return{d:out,log:lg,stillKc:isKc(),turn:S.turn}},NP);
   R.surf['ev-dialogs']=R.ev.d.map(x=>`«${x.t}» [${x.who}] ${x.tx} {${x.opts}}`).join(' ‖ ');R.surf['ev-log']=R.ev.log.join(' ‖ ')}
  R.rolled=rolled;R.errs=errs.slice(0,5);R.hits={};
  const strict=['headcount','list-cn','list-ct','tips-cn','tips-ct','maidTitle','maidFigTag','stageTags'];
  for(const [k,v] of Object.entries(R.surf)){const H2=[];let m;PALACE.lastIndex=0;while((m=PALACE.exec(v)))H2.push(v.slice(Math.max(0,m.index-60),m.index+m[0].length+40));if(H2.length){R.hits[k]=H2.slice(0,k.startsWith('ev')?60:12);if(strict.includes(k)){bad++;R.fail=(R.fail||[]).concat(k)}}}
  if(SH){fs.mkdirSync(SH,{recursive:true});await p.evaluate(()=>{window.__kgfOpen='cn';try{k3Stage()}catch(e){}});await sleep(400);await p.screenshot({path:`${SH}/${ORG}-${wh}.jpg`,type:'jpeg',quality:70})}
  rep[ORG]=R;console.log(ORG,R.isKc,R.kd,'strict-fails:',(R.fail||[]).join(',')||'none');await c.close()}
 fs.writeFileSync(OUT,JSON.stringify(rep,null,1));await b.close();console.log(bad?'SCAN FAIL '+bad:'SCAN PASS');process.exit(bad?1:0)})();
