/* review/mood-bar (D12, owner OD:L600): her mood bar (jmood) on every priority viewport.
   usage: node dev/test/mood-bar.js <build url> <outdir> [WxH@dpr,...]
   cases: box (mood box of her own seal, low mood: bar + "Vì sao lên xuống" + effects), self (her own card: mood tile + bar row),
          comfort (the visit of someone who loves her: two answers), lock (a show-off card locked at the lowest band: Cần row),
          high (mood box at Hân hoan), oldsave (a save without S.mood loads and gets a calm bar).
   Checks per case: no page error, no horizontal overflow of the page, the dialog's content does not run past its panel on the right. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R={};let bad=0;
 for(const sz of (SIZES||"755x1000@2,1000x755@1,1180x820@2,1366x1024@2,844x390@1,390x844@1").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const res={},errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr||1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,.kroul,.kmov{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&typeof mbS==='function',null,{timeout:90000});await sleep(2500);
  const fresh=()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}
   Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');
   const t=document.getElementById('rtoast');if(t)t.classList.remove('on');render()};
  const low=()=>{mbS();S.mood.v=0;S.mood.log=[];mbAdd(-30,"Quý phi Lý Thanh được tấn phong","e:a");mbAdd(-8,"Đánh đàn ở ngự hoa viên","fail");mbAdd(-4,"Làm thơ dâng lên","fail");mbAdd(-6,"Sức chỉ còn 24","w:suc");mbAdd(-3,"trời giông tố","w:wx");emoSet(S,"buon",70,"bị phạt quỳ ở Khôn Ninh cung")};
  const shot=async(nm,fn)=>{await p.evaluate(fresh);await sleep(800);const r0=await p.evaluate(fn);await sleep(3500);
   const m=await p.evaluate(()=>{const M=document.getElementById('modal');const d=M&&!M.hidden&&M.querySelector('.dlg');const dr=d&&d.getBoundingClientRect();
    const over=d?[...d.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>dr.right+1}).map(e=>e.className||e.tagName).slice(0,4):[];
    return{modal:!!d,title:d?(d.querySelector('.kph,h3,h2')||{}).textContent:"",bar:!!(M&&!M.hidden&&M.querySelector('.ksbar')),hscroll:document.documentElement.scrollWidth>innerWidth+1,over,
     secs:d?[...d.querySelectorAll('.kpst,h4')].map(h=>h.textContent.trim()).filter(Boolean).slice(0,8):[]}});
   res[nm]=Object.assign({r0},m);if(m.hscroll||m.over.length)bad++;await p.screenshot({path:`${OUT}/${wh}-${nm}.jpg`,type:'jpeg',quality:60})};
  await shot('box',`(${low.toString()})(),emoBox("me"),[S.mood.v,mbBand().name]`);
  await shot('self',`(${low.toString()})(),showSelf(),[S.mood.v]`);
  await shot('comfort',`(${low.toString()})(),(()=>{const v=liveRivals(true).find(x=>!x.queen);v.rel=60;try{k61Meet(v,"gặp",3)}catch(e){};S.mood.v=-80;BAL.mood.comfort.ch=100;S.mood.wk=-1;S.mood.cw=null;mbWeek();showModal();return [Q.length,Q[0]&&Q[0].t]})()`);
  await shot('lock',`(${low.toString()})(),(()=>{S.mood.v=-85;const a=pool().find(a=>a.n==="Múa trong yến tiệc");deck.unshift(a);render();const c=[...document.querySelectorAll('[data-i]')].find(b=>/Múa trong yến tiệc/.test(b.textContent));if(c)c.scrollIntoView({block:"center"});return c?c.innerText.replace(/\\s+/g," ").slice(0,160):"no card"})()`);
  await shot('high',`(()=>{mbS();S.mood.v=0;S.mood.log=[];mbAdd(40,"được Hoàng thượng lật thẻ","e:n");mbAdd(9,"Đánh đàn ở ngự hoa viên","ok");mbAdd(3,"2 người trong cung quý ngươi","w:fr");mbAdd(2,"trời hoa đào bay","w:wx");mbAdd(18,"được tấn phong Tần","e:u");emoSet(S,"vui",60,"được tấn phong Tần");emoBox("me");return [S.mood.v,mbBand().name,mbOdPts()]})()`);
  await shot('oldsave',`(()=>{const d=ser();delete d.S.mood;deser(d);render();const v=mbS().v;return [v,mbBand().name]})()`);
  R[wh]={res,errs};if(errs.length)bad++;await ctx.close()}
 console.log(JSON.stringify(R,null,1));console.log(bad?`FAIL ${bad}`:"PASS");await b.close()})();
