/* review/cycle (jcycle.js, owner 15/11 ~20:25Z): kỳ nguyệt sự + sổ nguyệt sự at Kính sự phòng.
   Logic (once): every woman has 5–7 days inside one tuần, deterministic by name (co-op friend entry = same days), none while pregnant
   / from age 50; during her cycle tuần nightCh = 0, never flipped in 300 flips, steal acts closed, late-visit / ksp night options locked;
   cycleLate counts missed cycles; the book (both roads) lists every woman, a rival's hidden pregnancy shows "không báo" and opens musk;
   pregMismatch → chứng cứ; NPC forge → rumour → correction option; her forgery deck cards (both roads); NPC foe guesses her pregnancy;
   a save without any cycle field loads (deser) and the functions work. UI per size: the book panel opens, no page / panel h-overflow,
   no clipped text; 390x844 = rotate prompt.
   usage: node dev/test/cycle.js <index.html> [outdir] [WxH@dpr ...] */
const {chromium}=require('playwright');const fs=require('fs');
const a=process.argv.slice(2);const IDX=a[0];const OUT=a[1]&&!/^\d+x/.test(a[1])?a[1]:null;
let SIZES=a.filter(x=>/^\d+x\d+@/.test(x));if(!SIZES.length)SIZES=['755x1000@2','1000x755@2','1180x820@2','1366x1024@2','844x390@3','390x844@3'];
const LIVE='https://thientran2711.'+'github.io/cung-tuong-mong/';const html=fs.readFileSync(IDX,'utf8');
(async()=>{const b=await chromium.launch();const R={};const errs=[];let bad=0;let logicDone=false;
 for(const SZ of SIZES){const [wh,d]=SZ.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
  await ctx.route(u=>u.href.split('?')[0]===LIVE||u.href.split('?')[0]===LIVE+'index.html',r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));
  await ctx.route(/\.(mp3|ogg)$/,r=>r.fulfill({status:404,body:''}));
  const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(SZ+' '+e.message.slice(0,200)));
  const narrow=W<H&&W<500;await p.goto(LIVE+(narrow?'?khost=1':''),{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'}).catch(()=>{});
  if(narrow){await p.waitForTimeout(4000);const rot=await p.evaluate(()=>{const f=document.getElementById('krotf');if(!f)return false;const t=getComputedStyle(f).transform;const m=t.match(/matrix\(([^)]+)\)/);if(!m)return false;const v=m[1].split(',').map(Number);return Math.abs(v[0])<0.01&&Math.abs(v[1])>0.01});R[SZ]=rot?'ok rotate prompt':'NO rotate prompt';if(!rot)bad++;await ctx.close();continue}
  await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}render()});
  await p.waitForTimeout(1500);
  if(!logicDone){logicDone=true;
   const L=await p.evaluate(()=>{const f=[],info={};const clear=()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true};
    /* 1 days */
    const all=consorts();for(const q of all){const dd=cycleDaysOf(q,S.month);if(cyAge(q)>=50)continue;if(q.preg&&!q.fake){if(dd.length)f.push('days while pregnant '+q.name);continue}
     if(dd.length<5||dd.length>7)f.push('len '+q.name+' '+dd.length);const t=Math.floor((dd[0]-1)/10);if(dd.some(x=>Math.floor((x-1)/10)!==t))f.push('crosses tuần '+q.name);
     if(JSON.stringify(dd)!==JSON.stringify(cycleDaysOf(q,S.month)))f.push('not deterministic');}
    const fr={name:S.name};if(JSON.stringify(cyBase(fr))!==JSON.stringify(cyBase(S)))f.push('friend entry differs');
    info.myDays=cycleDaysOf(S,S.month);info.next=[1,2,3].map(o=>cycleDaysOf(S,0,o).join(','));
    /* 2 flip */
    S.preg=0;S.fake=0;S.block=0;S.confined=0;S.out=false;S.sung=90;const t0=S.tuan;const myT=cyBase(S).t;
    S.tuan=myT;if(!cycOn(S))f.push('cycOn false in her tuần');if(nightCh(S)!==0)f.push('nightCh in cycle '+nightCh(S));
    let me=0;for(let i=0;i<300;i++){S.ntk=null;S.ntTry=null;flip();if(S.tonight==="me")me++;const t=tonightOf&&tonightOf();if(t&&t!==S&&cycOn(t))f.push('rival in cycle flipped')}
    if(me)f.push('flipped in cycle '+me);Q.length=0;
    const v=liveRivals(false)[0];if(ACT.steal.ok(S,v))f.push('steal ok in cycle');
    const pe=PEND.empnight({o:50});const lo=pe.o.find(o=>/^Thắp đèn/.test(o.n));if(!lo||!lo.lk||!/nguyệt sự/.test(lo.lk()))f.push('empnight not locked');
    const pk=PEND.ksp();const lk=pk.o.find(o=>/^Tắm gội/.test(o.n));if(!lk||!/nguyệt sự/.test(lk.lk()))f.push('ksp night not locked');
    const why=S.nightWhy&&S.nightWhy.rows.find(r=>r.id==="me");if(!why||!why.reasons.some(x=>x.k==='cyc'))f.push('nightWhy no reason');
    S.tuan=(myT+1)%3;if(cycOn(S))f.push('cycOn outside her tuần');if(!(nightCh(S)>0))f.push('nightCh 0 outside cycle');
    let me2=0;for(let i=0;i<300;i++){S.ntk=null;S.ntTry=null;flip();if(S.tonight==="me")me2++}info.flipOutside=me2;if(!me2)f.push('never flipped outside cycle');Q.length=0;
    /* 3 late */
    S.tuan=myT;S.preg=1;S.fake=0;S.pregWk=wk()-4;S.hidden=true;S.pregUnk=0;info.late=cycleLate(S);if(cycleLate(S)<1)f.push('cycleLate 0 after 4 weeks');
    if(cycleDaysOf(S,S.month).length)f.push('days while pregnant');
    /* 4 deck cards */
    deal();const names=deck.map(x=>x.n);if(!names.includes('Sửa sổ nguyệt sự')||!names.includes('Dặn ma ma báo ngày giả'))f.push('hide cards missing');
    const hc=deck.find(x=>x.n==='Sửa sổ nguyệt sự');hc.go();if(!cyb_ok())f.push('hide not stored');function cyb_ok(){return S.cyb&&S.cyb.hide===S.pregWk}
    S.pregMismatch=true;S.nightLog=[S.pregWk-3];deal();if(!deck.some(x=>x.n==='Khai lùi ngày nguyệt sự'))f.push('back card missing');
    S.preg=0;S.hidden=false;S.pregMismatch=false;S.cyb={};
    /* 5 book */
    const tq={kind:'ksp'};const T=talkOpts(tq);const r1=T.find(x=>x.n==='Xem sổ nguyệt sự'),r2=T.find(x=>/xem lén sổ nguyệt sự/.test(x.n));if(!r1||!r2)f.push('ksp roads missing');
    info.roads=[r1&&JSON.stringify(r1.c),r2&&JSON.stringify(r2.c)+' o'+r2.o];
    const rv=liveRivals(false).filter(x=>!x.preg);const h=rv[0];if(h){h.preg=1;h.fake=0;h.hidden=true;h.pregWk=wk()-4;h.tamco=10;h.bac=100}
    const m2=rv[1];if(m2){m2.preg=2;m2.fake=0;m2.hidden=false;m2.pregWk=wk()-6;m2.pregMismatch=true}
    clear();const ev0=m2?m2.ev:0;r1.run();const M=document.getElementById('modal');const txt=M.innerText;info.book=txt.slice(0,300);
    if(M.hidden||!/Sổ nguyệt sự/.test(txt))f.push('book not open');const rows=M.querySelectorAll('.kfact').length;if(rows<all.length)f.push('book rows '+rows+'<'+all.length);
    if(h&&!(S.cyKnow&&S.cyKnow[h.id]===h.pregWk))f.push('hidden pregnancy not learned');if(h&&!ACT.musk.ok(Object.assign(S,{bac:Math.max(S.bac,40)}),h))f.push('musk not open after book');
    if(m2&&m2.ev<ev0+2)f.push('mismatch evidence not given');clear();
    /* 6 NPC forge + correction */
    const foe=liveRivals(false).find(x=>x!==h&&x!==m2)||v;foe.bac=200;foe.ghen=100;oanAdd(foe,S,90);const nf=BAL.cyc.npcForge;BAL.cyc.npcForge=100;S.preg=0;monthPay();BAL.cyc.npcForge=nf;
    if(!(S.cyb.rum&&S.cyb.rum.m===S.turn))f.push('npc forge did not happen (host '+Math.round(hostility(foe,S))+')');
    else{clear();r1.run();const m=Q[0];const fx=m&&m.opts&&m.opts.find(o=>/chép lại/.test(o.n));if(!fx)f.push('no correction option');else{fx.go();if(!S.cyb.rum.fixed)f.push('not fixed')}clear()}
    /* 7 foe guesses her hidden pregnancy */
    S.preg=1;S.fake=0;S.hidden=true;S.pregWk=wk()-4;S.cyb={};const nr=BAL.cyc.npcRead;BAL.cyc.npcRead=100;monthPay();BAL.cyc.npcRead=nr;
    if(!liveRivals(true).some(x=>x.cyKnowMe===S.pregWk))f.push('foe did not read the book');
    S.preg=0;S.hidden=false;S.tuan=t0;
    /* 8 old save */
    const s=ser();delete s.cyb;delete s.cyKnow;const js=JSON.stringify(s).replace(/,"cyKnowMe":-?\d+/g,'').replace(/,"cyKnow":\{[^}]*\}/g,'').replace(/,"cyEvi":"?f?-?\d+"?/g,'');
    try{deser(JSON.parse(js));render();const dd=cycleDaysOf(S,S.month);if(!dd.length&&!S.preg&&cyAge(S)<50)f.push('old save: no days');nightCh(S);cyBook('thử');clear()}catch(e){f.push('old save: '+e.message)}
    return{f,info}});
   console.log('logic',JSON.stringify(L.info));if(L.f.length){bad++;console.log('LOGIC FAIL',L.f)}else console.log('logic ok')}
  /* UI: the book panel at this size */
  const u=await p.evaluate(async()=>{const f=[];const sleep=t=>new Promise(r=>setTimeout(r,t));Q.length=0;document.getElementById('modal').hidden=true;
   const v=liveRivals(false)[0];if(v){v.preg=1;v.fake=0;v.hidden=true;v.pregWk=wk()-4;v.tamco=10}
   cyBook('đút lót xem sổ');await sleep(700);const M=document.getElementById('modal');if(M.hidden)f.push('book hidden');
   const dl=M.querySelector('.dlg');if(dl){const r=dl.getBoundingClientRect();if(r.left<-1||r.right>innerWidth+1)f.push('panel off screen')}
   const clip=[];M.querySelectorAll('.kfact,.kchip,.kptitle,.kpsub').forEach(e=>{if(e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflowX!=='auto')clip.push(e.textContent.slice(0,20))});if(clip.length)f.push('clipped '+clip.slice(0,4).join('|'));
   if(document.documentElement.scrollWidth>innerWidth+1)f.push('page h-overflow');return{f,rows:M.querySelectorAll('.kfact').length}});
  if(OUT)await p.screenshot({path:`${OUT}/cycle-${SZ}.jpg`,type:'jpeg',quality:60});
  /* the two roads at Kính sự phòng (Tổng quản's talk cards) */
  const k=await p.evaluate(async()=>{const f=[];const sleep=t=>new Promise(r=>setTimeout(r,t));Q.length=0;document.getElementById('modal').hidden=true;used=0;S.bac=Math.max(S.bac,200);
   goTo('ksp');Q.length=0;document.getElementById('modal').hidden=true;const i=curPeople().findIndex(x=>x.kind==='ksp');if(i<0){f.push('no Tổng quản at ksp');return{f}}popIdx=i;popMsg='';render();await sleep(300);for(let g=0;g<2;g++){const o=talkOpts(curPeople()[i]);if(o[0]&&o[0].k61){talk(0);popIdx=i;render();await sleep(200)}}
   const T2=talkOpts(curPeople()[i]);const r1=T2.find(x=>x.n==='Xem sổ nguyệt sự');if(!r1||r1.lock)f.push('road 1 locked after greeting');await sleep(400);
   const t=document.body.innerText;if(!/Xem sổ nguyệt sự/.test(t))f.push('road 1 not shown');if(!/xem lén sổ nguyệt sự/.test(t))f.push('road 2 not shown');
   if(document.documentElement.scrollWidth>innerWidth+1)f.push('page h-overflow (ksp)');return{f}});
  if(OUT)await p.screenshot({path:`${OUT}/cycle-ksp-${SZ}.jpg`,type:'jpeg',quality:60});u.f.push(...k.f);
  R[SZ]=u.f.length?'FAIL '+u.f.join('; '):'ok rows '+u.rows;if(u.f.length)bad++;await ctx.close()}
 await b.close();console.log(JSON.stringify(R,null,1));if(errs.length){console.log('PAGE ERRORS',errs.slice(0,8));bad++}
 console.log(bad?'FAIL':'ALL OK');process.exit(bad?1:0)})();
