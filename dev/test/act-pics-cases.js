/* review/act-pics: the owner's exact cases (11/15) through the real game code, Fold 755x1000@2.
   "Có người đến" taunt -> Nhịn; a last-khắc walk -> Đi; Làm thơ dâng lên; Ngủ đêm hồi sức; Thỉnh an Hoàng hậu / Thái hậu; a borrow -> Cho mượn.
   usage: node dev/test/act-pics-cases.js <baseURL> <outdir>  -> prints the "Việc của ngươi" / person lines with their pictures, the Sổ ghi lines,
   the result-card title + picture after "Nhịn", and writes cases-book.jpg (the book page with those lines). */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const [,,BASE,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:2,hasTouch:true,isMobile:true});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s)break;await sleep(500)}
 await sleep(1500);
 const R=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));
  SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.buoi=0;deal();render();
  for(let i=0;i<40&&!(KIT_ACTS.log&&EVART);i++)await W(250);
  S.wkSnap=wkSnap();const out={};
  const v=liveRivals(true)[0]||rivals[1];
  /* 1. taunt -> Nhịn */
  Q.length=0;Q.push({t:"Có người đến",who:pv(v),h:`<p>${v.name} đến tận cửa cung, buông lời mỉa mai ngươi trước mặt cung nhân.</p>`,opts:[{n:"Nhịn",fx:{duc:2},x:"giữ lễ; nàng ghen +3",go:()=>{}},{n:"Đáp trả sắc sảo",fx:{danh:1},x:"",go:()=>{}}]});showModal();await W(600);
  chooseM(0);await W(900);const t=document.getElementById('rtoast');out.result=t?{text:t.innerText.replace(/\s+/g,' ').slice(0,160),art:(t.querySelector('img')||{}).src||''}:null;
  Q.length=0;showModal();
  /* 2. borrow -> Cho mượn */
  Q.push({t:"Có người đến",who:pv(v),h:`<p>${v.name} ngượng ngùng hỏi mượn 20 lượng bạc.</p>`,opts:[{n:"Cho mượn",fx:{bac:-20},x:"",go:()=>{}},{n:"Từ chối",fx:{},x:"",go:()=>{}}]});chooseM(0);Q.length=0;showModal();
  /* 3. acts */
  for(const n of ["Làm thơ dâng lên","Thỉnh an Hoàng hậu","Thỉnh an Thái hậu"]){const i=deck.findIndex(a=>a.n===n);if(i>=0){deck[i].done=0;deck[i].o=100;Q.length=0;used=0;S.buoi=0;try{act(i)}catch(e){}await W(300);Q.length=0;showModal()}else out["missing "+n]=deck.map(a=>a.n).slice(0,40)}
  /* 4. a walk on the last khắc -> Đi */
  const k=places().map(x=>x.k).find(x=>x!==S.place&&x!=="home"&&x!=="lc");Q.length=0;used=3;try{j77LastWalk(k,1)}catch(e){out.walkErr=String(e)}await W(200);
  const di=Q[0]&&Q[0].opts?Q[0].opts.findIndex(o=>o.n==="Đi"):-1;if(di>=0)chooseM(di);await W(600);Q.length=0;showModal();
  /* 5. night sleep */
  S.buoi=1;log("Đến Ngự hoa viên.");S.buoi=2;log("Đến Đức Thọ cung.");S.buoi=0;
  log("Ngủ đêm hồi sức: Sức +14");
  const d=wkBookPages();out.pages=d.pages.map(pg=>({title:pg.title||(pg.who&&pg.who.name)||"",facts:[].concat(...(pg.blocks||[]).map(bl=>(bl.facts||[]).map(f=>kpPlain(f.text||"")+"  =>  "+String(f.art||"").replace(/^.*img\//,""))))})).filter(x=>x.facts.length);
  out.sogi=S.logs.slice(0,12).map(x=>kpPlain(x));
  dawn();await W(2500);return out});
 /* every page of the book (Fold shows one page at a time): shoot each, keep its text */
 R.bookPages=[];await sleep(2000);
 for(let k=0;k<7;k++){await p.evaluate(()=>Promise.all([...document.querySelectorAll('#dawn img.kbk-evart')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));
  await sleep(1200);const info=await p.evaluate(()=>{const n=document.querySelector('#dawn .kbk-no');const b=document.querySelector('#dawn .kbk-book');const r=b.getBoundingClientRect();
   const f=document.elementsFromPoint(r.left+r.width*.5,r.top+r.height*.4).find(e=>e.classList&&e.classList.contains('kbk-face'));return{no:n?n.textContent:'',txt:f?f.innerText.replace(/\s+/g,' ').slice(0,160):''}});
  R.bookPages.push(info);await p.screenshot({path:`${OUT}/book-p${k}.jpg`,type:'jpeg',quality:80});
  const end=await p.evaluate(()=>window.__kbk.cur>=window.__kbk.max);if(end)break;await p.evaluate(()=>window.__kbk.next());await sleep(1500)}
 R.broken=await p.evaluate(()=>[...document.querySelectorAll('#dawn img.kbk-evart')].filter(i=>!i.naturalWidth).map(i=>i.getAttribute('src')));
 R.overflowX=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 R.errs=errs;console.log(JSON.stringify(R,null,1));await b.close()})();
