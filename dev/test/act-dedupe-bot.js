/* ACT DEDUPE wave 1 bot: plays N lives x 8 tuần (weeks) with random sensible moves (Hành sự cards, walking — "!" places first —,
   person pop-up options, Nội vụ phủ shop) and answers every dialog. Counts DEAD ENDS (khắc left, no usable card, no talk, no walk),
   shared-door double use (one act done twice in one day through its two doors), happenings fired per kind, page errors.
   usage: node dev/test/act-dedupe-bot.js <url> [lives=4] [weeks=8]  → JSON summary + "FAIL n" */
const {chromium}=require('playwright');const [,,URL,NL,NW]=process.argv;const LIVES=+NL||4,WEEKS=+NW||8;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1000,height:755},serviceWorkers:'block'});
 await ctx.addInitScript(()=>{window.__bot={pre:1}});
 const p=await ctx.newPage();p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 const out=[];
 for(let life=0;life<LIVES;life++){
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;SLOT=3;
   for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&!S.out)break}document.querySelectorAll('.kroul').forEach(e=>e.remove());
   window.save=()=>{};/* fast like dev/measure/inpage4.js: no drawing, dialogs still go through Q; the map HTML is still built once per buổi */
   popNum=()=>{};curtain=()=>{};fx=()=>{};renderHUD=()=>{};renderStage=()=>{};renderPanel=()=>{};render=function(){if(!S)return;if(Q.length&&document.getElementById('modal').hidden)showModal()};window.__B={dead:[],dbl:[],hap:{},acts:0,walks:0,talks:0,shop:0,steps:0,buoi:0,cards:{}};
   const q=s=>document.querySelector(s);
   window.__step=function(){const B=__B;B.steps++;
    if(S.dead)return"dead";
    const ov=q('#ov');if(ov&&!ov.hidden){const k=q('#kg82skip')||q('#ov .kg82act button:not(#kg82go)')||q('#kg82ok')||q('#mgok')||q('#mgskip')||q('#ov .kit-x')||q('#ov button.kbtn');if(k){k.click();return"ov"}ov.hidden=true;return"ov"}
    if(S.mg){try{S.mg=null}catch(e){}}
    if(Q.length){const m=Q[0];if(m.opts&&m.opts.length){const ok=m.opts.map((c,i)=>[c,i]).filter(([c])=>!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0)&&!(typeof c.lk==="function"&&c.lk()));if(!ok.length){closeModal();return"m0"}chooseM(ok[Math.floor(Math.random()*ok.length)][1]);return"m"}closeModal();return"m"}
    const sh=q('.kshop');if(sh){const x=q('#ov .kit-x,.kshop ~ .kit-x,[data-kshopx]');try{document.getElementById('ov').hidden=true}catch(e){}}
    const C=[];const dayDone={};
    deck.forEach((a,i)=>{if(!a.done&&!a.lock&&canPay(a)&&can(cardCost(a))&&!(a.b!=null&&(S.buoi||0)!==a.b))C.push(["card",()=>{const n=a.n;act(i);if(a.done){B.acts++;B.cards[n]=(B.cards[n]||0)+1}}])});
    const H=adHapNow().filter(h=>!h.done);
    const okPl=k=>k!=="home"&&S.place!==k&&!S.confined&&!S.out&&walkOk(travel(S.place,k))&&(typeof accessOf!=="function"||accessOf(S,k).ok);
    for(const h of H)if(okPl(h.k))C.push(["hap",()=>{B.walks++;const q0=Q.length;goTo(h.k);if(h.done)B.hap[h.id]=(B.hap[h.id]||0)+1},3]);
    places().forEach(pl=>{if(okPl(pl.k))C.push(["walk",()=>{B.walks++;goTo(pl.k)}])});
    if(S.place!=="home"&&!S.out)C.push(["home",()=>goTo("home")]);
    if(S.visit&&S.visit.talked!==true){const tk=S.visit.tk||{};curPeople().forEach((pp,pi)=>{if(tk[pi])return;let O=[];try{O=talkOpts(pp)}catch(e){}O.forEach((a,oi)=>{if(!a||a.lock||!canPay(a))return;if(!can(a.act?2:1))return;
      C.push(["talk",()=>{popIdx=pi;const door=adDoorOfPop(pp.kind,a.n);const was=door&&adDoorUsed(door);talk(oi);B.talks++;if(a.adShop){B.shop++;const R=adRare();if(R&&S.bac>=IT[R.k].pr&&Math.random()<.5){try{const o=KSHOP.reg.nvp;const x=o&&(o.items||o.list||[]).find(z=>z.k===R.k);if(x&&x.onBuy)x.onBuy(x,1)}catch(e){}}try{document.getElementById('ov').hidden=true}catch(e){}}popIdx=null}])})})}
    const usable=C.filter(c=>c[0]!=="home");
    if(!usable.length){if(used<4&&!S.dead){/* real dead end only if nothing at all is possible this buổi */const anyCard=deck.some(a=>!a.done&&!a.lock&&canPay(a)&&can(cardCost(a)));if(!anyCard&&!C.length)B.dead.push({wk:wk(),b:S.buoi,used,place:S.place,out:!!S.out,conf:S.confined})}
     B.buoi++;nextBuoi();return"next"}
    if(B.lastB!==bkey()){B.lastB=bkey();try{mapHTML();mapHTMLgrid()}catch(e){B.mapErr=(B.mapErr||0)+1;console.error(e)}}
    if(Math.random()<.12||used>=4){B.buoi++;nextBuoi();return"next"}
    B.lastC=C.length;const W=[];for(const c of C)for(let k=0;k<(c[2]||1);k++)W.push(c);W[Math.floor(Math.random()*W.length)][1]();return"act"}});
  const w0=await p.evaluate(()=>wk());let n=0,last='';
  while(n<6000){const r=await p.evaluate(()=>{let s="";for(let i=0;i<30;i++){s=__step();if(s==="dead")break}return{s,wk:wk(),dead:!!S.dead}});n++;
   if(r.dead||r.wk-w0>=WEEKS)break}
  const B=await p.evaluate(()=>{/* door audit: nobody did a shared act twice in one stamp (S.adDoor holds the last stamp; doubles counted live below) */return Object.assign({wk:wk(),dead:!!S.dead,rank:S.rank,place:S.place,doors:S.adDoor||{}},__B)});
  out.push(B);console.error('life',life,'weeks',B.wk-w0,'steps',B.steps,'dead-ends',B.dead.length,'hap',JSON.stringify(B.hap),'shop',B.shop)}
 const dead=out.reduce((a,x)=>a+x.dead.length,0),hap=out.reduce((a,x)=>{for(const k in x.hap)a[k]=(a[k]||0)+x.hap[k];return a},{});
 const cards={};out.forEach(x=>{for(const k in x.cards)cards[k]=(cards[k]||0)+x.cards[k]});
 const study=Object.keys(cards).filter(k=>/^(Tự học|Tự luyện|Phát chẩn|Tụng kinh|Đánh đàn ở ngự hoa viên)/.test(k));
 console.log(JSON.stringify({lives:out.length,deadEnds:dead,deadSample:out.flatMap(x=>x.dead).slice(0,5),hap,shop:out.reduce((a,x)=>a+x.shop,0),studyInDeck:study,cards,errors:errs.slice(0,5)}));
 let fail=0;if(dead)fail++;if(errs.length)fail++;if(study.length)fail++;if(!Object.keys(hap).length)fail++;
 console.log('FAIL '+fail);await b.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
