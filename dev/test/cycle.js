/* review/cycle (jcycle.js, owner 15/11 ~20:25Z): kỳ nguyệt sự + sổ nguyệt sự at Kính sự phòng.
   Logic (once): every woman has 5–7 days inside one tuần, deterministic by name (co-op friend entry = same days), none while pregnant
   / from age 50; during her cycle tuần nightCh = 0, never flipped in 300 flips, steal acts closed, late-visit / ksp night options locked;
   cycleLate counts missed cycles; the book (both roads) lists every woman, a rival's hidden pregnancy shows "không báo" and opens musk;
   pregMismatch → chứng cứ; NPC forge → rumour → correction option; her forgery deck cards (both roads); NPC foe guesses her pregnancy;
   a save without any cycle field loads (deser) and the functions work. r2: the book as two Hành sự deck cards (costs, opens the book);
   the monthly report pop-up (4 options, flip deferred, đúng / sớm / giấu / lùi effects, mama check, forgery evidence, mừng hụt, default). UI per size: the book panel opens, no page / panel h-overflow,
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
   window.__nlInner=1;for(let i=0;i<60;i++){start();if(!isSrv())break}window.__nlInner=0;Q.length=0;S.buoi=B4L;S.nfF=wk();/* flip-entry (jfe): the flip (and with it her cycle pop-up) runs at buổi tối; tests call flip() there */const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}render()});
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
    const hc=deck.find(x=>x.n==='Sửa sổ nguyệt sự');if(!hc)f.push('dbg '+JSON.stringify({out:S.out,dead:S.dead,rank:S.rank,preg:S.preg,hid:S.hidden,unk:S.pregUnk,n:names.length}));else hc.go();if(!cyb_ok())f.push('hide not stored');function cyb_ok(){return S.cyb&&S.cyb.hide===S.pregWk}
    S.pregMismatch=true;S.nightLog=[S.pregWk-3];deal();if(!deck.some(x=>x.n==='Khai lùi ngày nguyệt sự'))f.push('back card missing');
    S.preg=0;S.hidden=false;S.pregMismatch=false;S.cyb={};
    /* 5 book */
    const tq={kind:'ksp'};const T=talkOpts(tq);const r1=T.find(x=>x.n==='Xem sổ nguyệt sự'),r2=T.find(x=>/xem lén sổ nguyệt sự/.test(x.n));if(!r1||!r2){f.push('ksp roads missing '+JSON.stringify({names:T.map(x=>x.n),srv:isSrv(),out:S.out,dead:S.dead,rank:S.rank}));return{f,info}}
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
    /* 9 (r2) the book as HÀNH SỰ deck cards: both roads, same numbers as the place cards; the bạc card opens the book */
    S.tuan=t0;S.cyb={};S.out=false;S.dead=false;deal();const d1=deck.find(x=>x.n==='Xem sổ nguyệt sự'),d2=deck.find(x=>x.n==='Xem lén sổ nguyệt sự');
    if(!d1||!d2)f.push('book deck cards missing');else{const r=Math.min(7,S.rank||0);
     if(!d1.c||d1.c.bac!==-BAL.cyc.read[r]||cardCost(d1)!==1)f.push('bạc card cost '+JSON.stringify(d1.c)+' k'+cardCost(d1));
     if(!d2.c||d2.c.suc!==-BAL.cyc.peekSuc||cardCost(d2)!==2||!(d2.o<100))f.push('peek card cost '+JSON.stringify(d2.c)+' k'+cardCost(d2)+' o'+d2.o);
     info.deckCards=[d1.n+' '+JSON.stringify(d1.c)+' k'+cardCost(d1),d2.n+' '+JSON.stringify(d2.c)+' k'+cardCost(d2)+' o'+d2.o];
     clear();used=0;S.bac=500;S.suc=80;const b0=S.bac;act(deck.indexOf(d1));const M=document.getElementById('modal');
     if(S.bac!==b0-BAL.cyc.read[r])f.push('bạc not paid '+b0+'→'+S.bac);if(!(Q.length&&/Sổ nguyệt sự/.test(M.innerText||'')))f.push('deck card did not open the book');clear();
     const af0=(S.court.ksp.af.me||0),dn0=S.danh;d2.fail();if(S.court.ksp.af.me!==af0-BAL.cyc.peekAfLoss)f.push('peek fail no thiện cảm loss')}
    /* 10 (r2) the monthly report pop-up */
    const pop=()=>{clear();S.cyb={};S.tuan=myT;S.preg=0;S.fake=0;S.hidden=false;S.out=false;S.tonight=null;flip();const m=Q.find(x=>x.pid==='cyrep');return m};
    let m=pop();if(!m)f.push('no monthly pop-up in her cycle tuần');else{
     const N=m.opts.map(o=>o.n);info.popup=m.opts.map(o=>o.n+' :: '+String(o.x).replace(/<[^>]+>/g,''));if(N.length!==4)f.push('pop-up options '+N.length);
     if(S.tonight)f.push('flip not deferred');if(m.opts.some(o=>/%/.test(o.x)))f.push('% in option');
     if(!/Khó|Liều|Năm phần|Khá chắc|Chắc|Nắm chắc|Nắm chắc/.test(m.opts[1].x))f.push('lùi: no odds word');if(!/khả năng/.test(m.opts[2].x)||!/khả năng/.test(m.opts[3].x))f.push('lies: no risk chance');
     /* a: báo đúng → card off this tuần, the deferred flip ran */
     clear();m.opts[0].go();if(S.cyb.rk!==wk()||S.cyb.rv!=='dung')f.push('đúng not stored');if(nightCh(S)!==0)f.push('đúng: card on tray');if(S.tonight==='me')f.push('đúng: flipped');
     if(Q.some(x=>x.pid==='cyrep'))f.push('pop-up again after answer');clear();flip();if(Q.some(x=>x.pid==='cyrep'))f.push('pop-up twice same tuần');clear()}
    /* b: báo sớm → card on the tray, can be flipped, mama check on the night, forgery evidence at month end */
    m=pop();if(m){m.opts[2].go();if(!(nightCh(S)>0))f.push('sớm: card off');if(S.cyb.lie!==wk())f.push('sớm: lie not stored');if(ACT.steal&&LACK.steal&&LACK.steal()==="Đang kỳ nguyệt sự, thẻ bài tạm cất, không tiện hầu giá")f.push('sớm: steal still locked');
     let n=0;for(let i=0;i<300;i++){S.tonight=null;S.ntk=null;S.ntTry=null;flip();if(S.tonight==='me')n++}Q.length=0;info.flipLie=n;if(!n)f.push('sớm: never flipped');
     const rn2=Math.random;Math.random=()=>0.999;S.sung=60;S.danh=40;S.ksKnows=0;S.tonight='me';delete S.cyb.lck;try{nightScene()}finally{Math.random=rn2}clear();
     if(!(S.sung<60&&S.danh<40&&S.ksKnows))f.push('sớm: caught at the night did not cost '+S.sung+'/'+S.danh+'/'+S.ksKnows);
     const fo=liveRivals(false).find(x=>hostility(x,S)>=BAL.cyc.foeHost);if(!fo)f.push('no foe for evidence');else{const ek=key(S),e0=(fo.evm&&fo.evm[ek])||0;S.cyb.lieM=S.turn-1;S.cyb.lieEv=0;const nr2=BAL.cyc.npcRead;BAL.cyc.npcRead=100;monthPay();BAL.cyc.npcRead=nr2;if(!(((fo.evm&&fo.evm[ek])||0)>e0))f.push('no forgery evidence for foe')}}
    /* c: giấu → card on the tray, the book says "không báo" (no correction option for her own lie), mừng hụt at the month's end */
    m=pop();if(m){m.opts[3].go();if(!(nightCh(S)>0))f.push('giấu: card off');clear();cyBook('thử');const MM=document.getElementById('modal');const mt=MM.innerText||'';
     if(!/không báo/.test(mt))f.push('giấu: book does not say không báo');if(Q[0]&&Q[0].opts&&Q[0].opts.some(o=>/chép lại/.test(o.n)))f.push('giấu: correction offered for her own lie');clear();
     S.turn++;const sg0=S.sung,dn1=S.danh;monthPay();S.turn--;if(!(S.sung<sg0&&S.danh<dn1))f.push('giấu: no mừng hụt '+sg0+'→'+S.sung)}
    /* d: báo lùi (forced success) → card off now, next tuần's flip halved, a pregnancy begun after it reads one cycle later */
    m=pop();if(m){const rnd=Math.random;Math.random=()=>0;try{m.opts[1].go()}finally{Math.random=rnd}clear();const W0=wk();
     if(S.cyb.back!==W0)f.push('lùi: not stored');if(nightCh(S)!==0)f.push('lùi: card on tray');
     S.tuan=(myT+1)%3;const tb=S.turn;if(myT===2)S.turn++;const hv=nightCh(S);const bk=S.cyb.back;delete S.cyb.back;const full=nightCh(S);S.cyb.back=bk;info.luiNext=[hv,full];if(!(hv<full))f.push('lùi: next tuần not harder '+hv+'/'+full);
     S.turn=tb;S.tuan=myT;S.preg=1;S.fake=0;S.hidden=true;S.pregWk=W0+1;const tt=S.turn;S.turn+=2;const tl=cycleLateTrue(S),sl=cycleLate(S);info.luiLate=[tl,sl];if(!(tl>=1&&sl===tl-1))f.push('lùi: lateness not delayed '+tl+'/'+sl);
     S.pregMismatch=true;S.nightLog=[S.pregWk-3];deal();if(S.pregMismatch)f.push('lùi: mismatch not covered');S.turn=tt;S.preg=0;S.hidden=false;S.pregMismatch=false}
    /* e: unanswered → the week ends with the true report */
    m=pop();if(m){clear();const c=S.cyb;endTurn();if(c.rv!=='dung')f.push('unanswered not defaulted '+c.rv);const dw=document.getElementById('dawn');if(dw)dw.remove();document.body.classList.remove('kbk-open')}
    /* f (r3): no pop-up on the first screen of a new life (start() flips right after "Nhập cung"): that week reads as báo đúng */
    {Q.length=0;S.cyb={};S.tuan=myT;Q.push({t:"Nhập cung",h:"<p>x</p>"});S.buoi=B4L;S.ntk=null;S.ntTry=null;flip();if(Q.some(x=>x.pid==='cyrep'))f.push('pop-up on a new life start');if(!(S.cyb.rv==='dung'&&S.cyb.rk===wk()))f.push('start: no default report');
     info.startQ=Q.map(x=>x.t);clear();S.cyb={}}
    {const fr=liveRivals(false).find(x=>!x.preg);if(fr&&window.COOPW){const on=COOPW.on;fr.coop=true;S.tuan=(myT+1)%3;let got=0;try{COOPW.on=true;for(let i=0;i<200;i++){S.tonight=null;S.ntk=null;S.ntTry=null;cyNoFriend(flip);if(S.tonight===fr)got++}}finally{COOPW.on=on;delete fr.coop}
      if(got)f.push('co-op: deferred flip picked the friend '+got);if(!rivals.includes(fr))f.push('co-op: friend entry lost');Q.length=0;S.tuan=myT}}
    S.cyb={};S.tuan=t0;clear();
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
  /* (r2) the monthly pop-up at this size: kit dialog + 4 option cards, nothing clipped / off screen */
  const pu=await p.evaluate(async()=>{const f=[];const sleep=t=>new Promise(r=>setTimeout(r,t));Q.length=0;document.getElementById('modal').hidden=true;
   S.cyb={};S.preg=0;S.fake=0;S.out=false;S.tuan=cyBase(S).t;S.buoi=B4L;flip();render();showModal();await sleep(2500);const M=document.getElementById('modal');
   if(M.hidden||!/Kính sự phòng báo thế nào/.test(M.innerText))f.push('pop-up not shown');const cards=M.querySelectorAll('button.ka,.kopt,.opt');if(cards.length<4)f.push('pop-up cards '+cards.length);
   const dl=M.querySelector('.dlg');if(dl){const r=dl.getBoundingClientRect();if(r.left<-1||r.right>innerWidth+1)f.push('pop-up off screen')}
   const clip=[];M.querySelectorAll('button.ka .kan,.kfact,.kchip').forEach(e=>{if(e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflowX!=='auto')clip.push(e.textContent.slice(0,20))});if(clip.length)f.push('pop-up clipped '+clip.slice(0,3).join('|'));
   const ov=[];cards.forEach(b=>{const r=b.getBoundingClientRect();let bot=0;b.querySelectorAll('.krv .ef,.krv span,.kan').forEach(e=>{bot=Math.max(bot,e.getBoundingClientRect().bottom)});if(bot>r.bottom+2)ov.push((b.querySelector('.kan')||b).textContent.slice(0,14)+' '+Math.round(bot-r.bottom)+'px h'+Math.round(r.height)+' '+getComputedStyle(b).height+'/'+getComputedStyle(b).maxHeight+'/'+getComputedStyle(b.parentElement).gridAutoRows)});if(ov.length)f.push('pop-up card content overflows: '+ov.join(' | '));
   if(document.documentElement.scrollWidth>innerWidth+1)f.push('page h-overflow (pop-up)');return{f,n:cards.length}});
  if(OUT)await p.screenshot({path:`${OUT}/cycle-pop-${SZ}.jpg`,type:'jpeg',quality:60});
  if(OUT){await p.evaluate(()=>{const M=document.querySelector('#modal .dlg');const sc=[...(M?M.querySelectorAll('*'):[])].find(e=>e.scrollHeight>e.clientHeight+20&&/auto|scroll/.test(getComputedStyle(e).overflowY));if(sc)sc.scrollTop=sc.scrollHeight});await p.waitForTimeout(600);await p.screenshot({path:`${OUT}/cycle-pop2-${SZ}.jpg`,type:'jpeg',quality:60})}
  const hs=await p.evaluate(async()=>{const f=[];const sleep=t=>new Promise(r=>setTimeout(r,t));const c=S.cyb;if(c){c.rk=wk();c.rv='dung'}Q.length=0;document.getElementById('modal').hidden=true;
   S.tuan=(cyBase(S).t+1)%3;used=0;S.bac=Math.max(S.bac,300);tab='act';try{localStorage.removeItem('hclh-kcat-act-0')}catch(e){}deal();render();await sleep(800);
   const B=[...document.querySelectorAll('#panel button.ka')].filter(b=>/sổ nguyệt sự/.test(b.textContent));if(B.length<2)f.push('Hành sự: book cards shown '+B.length);
   B.forEach(b=>{const r=b.getBoundingClientRect();if(r.right>innerWidth+1)f.push('card off screen')});if(document.documentElement.scrollWidth>innerWidth+1)f.push('page h-overflow (Hành sự)');return{f}});
  if(OUT){await p.evaluate(()=>{const b=[...document.querySelectorAll('#panel button.ka')].find(b=>/sổ nguyệt sự/.test(b.textContent));if(b)b.scrollIntoView({block:'center'})});await p.waitForTimeout(1200);await p.screenshot({path:`${OUT}/cycle-hs-${SZ}.jpg`,type:'jpeg',quality:60})}
  u.f.push(...pu.f,...hs.f);
  /* the two roads at Kính sự phòng (Tổng quản's talk cards) */
  const k=await p.evaluate(async()=>{const f=[];const sleep=t=>new Promise(r=>setTimeout(r,t));Q.length=0;document.getElementById('modal').hidden=true;used=0;S.bac=Math.max(S.bac,200);
   S.confined=0;S.out=false;goTo('ksp');Q.length=0;document.getElementById('modal').hidden=true;const i=curPeople().findIndex(x=>x.kind==='ksp');if(i<0){f.push('no Tổng quản at ksp '+JSON.stringify({pl:S.place,v:!!S.visit,used,ppl:curPeople().map(x=>x.kind)}));return{f}}popIdx=i;popMsg='';render();await sleep(300);for(let g=0;g<2;g++){const o=talkOpts(curPeople()[i]);if(o[0]&&o[0].k61){talk(0);popIdx=i;render();await sleep(200)}}
   const T2=talkOpts(curPeople()[i]);const r1=T2.find(x=>x.n==='Xem sổ nguyệt sự');if(!r1||r1.lock)f.push('road 1 locked after greeting');await sleep(400);
   const t=document.body.innerText;if(!/Xem sổ nguyệt sự/.test(t))f.push('road 1 not shown');if(!/xem lén sổ nguyệt sự/.test(t))f.push('road 2 not shown');
   if(document.documentElement.scrollWidth>innerWidth+1)f.push('page h-overflow (ksp)');return{f}});
  if(OUT)await p.screenshot({path:`${OUT}/cycle-ksp-${SZ}.jpg`,type:'jpeg',quality:60});u.f.push(...k.f);
  R[SZ]=u.f.length?'FAIL '+u.f.join('; '):'ok rows '+u.rows;if(u.f.length)bad++;await ctx.close()}
 await b.close();console.log(JSON.stringify(R,null,1));if(errs.length){console.log('PAGE ERRORS',errs.slice(0,8));bad++}
 console.log(bad?'FAIL':'ALL OK');process.exit(bad?1:0)})();
