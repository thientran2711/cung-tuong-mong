/* review/monthly-ration FIX 1 shots + checks (review point 7): the mirror (owned colours only, a missing part NOT painted on the face),
   a face close-up A/B (all four parts vs no son môi vs no phấn má), the month's ration chest line, the visit cards (Mượn / Xin / Lấy trộm son phấn)
   and the "Sang mượn son phấn" event card. Reveal boxes (kitReward) are cleared before every shot.
   usage: node dev/test/monthly-ration-shots.js <worktree|url> <outdir> [WxH@dpr,...]   (exit 1 on a FAIL) */
const {chromium}=require('playwright');const fs=require('fs'),http=require('http'),path=require('path');let [,,URL,OUT,SIZES]=process.argv;
function serve(root){const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.css':'text/css'};return new Promise(res=>{const s=http.createServer((q,r)=>{let f=path.join(root,decodeURIComponent(new (require('url').URL)(q.url,'http://x').pathname).replace(/^\/+/,'')||'index.html');
 if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}r.setHeader('Content-Type',T[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(r)});s.listen(0,'127.0.0.1',()=>res({url:'http://127.0.0.1:'+s.address().port+'/index.html',close:()=>s.close()}))})}fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));let bad=0;const ok=(n,c,x)=>{if(!c)bad++;console.log(`${c?'PASS':'FAIL'} ${n}${x!==undefined?' '+JSON.stringify(x):''}`)};
const CLEAR=()=>{try{kmReset()}catch(e){}document.querySelectorAll('.kmov,.kroul,#kroul,.kroul-ov').forEach(o=>o.remove());try{kmBusy=false}catch(e){}};
(async()=>{let SV=null;if(!/^https?:/.test(URL)){SV=await serve(path.resolve(URL));URL=SV.url}const b=await chromium.launch();
 for(const sz of (SIZES||"755x1000@2,1180x820@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
  await p.evaluate(()=>{new MutationObserver(()=>document.querySelectorAll('.kroul,#kload,#klife').forEach(e=>e.remove())).observe(document.body,{childList:true,subtree:true});const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){start();if(!isSrv())break}
   Q.length=0;document.getElementById('modal').hidden=true;render()});await sleep(800);
  await p.evaluate(()=>{try{const dw=document.getElementById('dawn');if(dw){dw.classList.remove('on');dw.hidden=true}}catch(e){}});
  const shot=async(n,sel)=>{await p.evaluate(CLEAR);await sleep(400);const f=`${OUT}/${n}-${wh}.jpg`;if(sel){const el=await p.$(sel);if(el)await el.screenshot({path:f,type:'jpeg',quality:80});else await p.screenshot({path:f,type:'jpeg',quality:70})}else await p.screenshot({path:f,type:'jpeg',quality:70})};
  /* 1. the mirror with son môi missing: no son row, the note, the face without lip colour */
  const m=await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;S.inv=S.inv.filter(e=>!(lxOf(e.k)&&lxOf(e.k).part==="son"));S.bac=200;S.buoi=0;delete S.toilette;toilOpen();TOIL.st.dv="hopdip";toilColUI();
   const box=kg82Box();return{no:(TOIL.prev&&TOIL.prev.col&&TOIL.prev.col.no||[]).join(),key:[...box.querySelectorAll('img.kmkc')].map(i=>i.dataset.mkk).join(" ")}});
  await sleep(2500);ok(`mirror look has col.no=son ${wh}`,m.no==="son",m);await shot("mirror-noson");
  /* 2. face A/B, the shared colour layer itself (toilMkLayer → toilMkDraw) over her picture: all four parts · no son môi · no phấn má · no mày + phấn mắt */
  await p.evaluate(()=>{TOIL.prev=null;try{kg82Close()}catch(e){}});const f=await p.evaluate(()=>{const f=kitFile(toilPor().src);MK_FIT.get(f);return f});
  await p.waitForFunction(f=>!!MK_FIT.get(f),f,{timeout:60000}).catch(()=>{});
  const NOS=[[],["son"],["ma"],["may","mat"]];const keys=await p.evaluate(({f,NOS})=>NOS.map(no=>{const col=toilColDef();if(no.length)col.no=no;const h=toilMkLayer(f,"dep",col);return h?/data-mkk="([^"]*)"/.exec(h)[1]:null}),{f,NOS});
  await p.waitForFunction(keys=>keys.every(k=>k&&TOIL_MKC[k]&&TOIL_MKC[k].src),keys,{timeout:60000}).catch(()=>{});
  const ab=await p.evaluate(({f,keys})=>{const src=IMG_U("img/"+f),Wd=Math.min(220,(innerWidth-40)/4);const lab=["đủ 4 thứ","thiếu son môi","thiếu phấn má","thiếu màu mày, phấn mắt"];
   const d=document.createElement('div');d.id='lxab';d.style.cssText='position:fixed;left:8px;top:8px;z-index:99999;display:flex;gap:6px;background:#fff8ec;padding:6px';
   d.innerHTML=keys.map((k,i)=>{const e=TOIL_MKC[k];if(!e)return"";const b=e.box,Hh=Wd*1.3;return `<figure style="margin:0;width:${Wd}px"><div style="position:relative;width:${Wd}px;height:${Hh}px;overflow:hidden"><div style="position:absolute;left:${-b[0]/b[2]*Wd}px;top:${-b[1]/b[3]*Hh}px;width:${100/b[2]*Wd}px;height:${100/b[3]*Hh}px"><img src="${src}" style="position:absolute;inset:0;width:100%;height:100%"><img src="${e.src}" style="position:absolute;left:${b[0]}%;top:${b[1]}%;width:${b[2]}%;height:${b[3]}%"></div></div><figcaption style="font-size:12px;text-align:center">${lab[i]}</figcaption></figure>`}).join("");
   document.body.appendChild(d);return keys.filter(Boolean).length},{f,keys});
  await sleep(1500);ok(`face A/B layers ${wh}`,ab===4,keys);await shot("face-ab",'#lxab');await p.evaluate(()=>{const d=document.getElementById('lxab');if(d)d.remove()});
  const px=await p.evaluate(()=>Object.keys(TOIL_MKC).filter(k=>/\|dep\|/.test(k)).map(k=>k.split("|")[6]));ok(`layers keyed by col.no ${wh}`,px.includes("son")&&px.includes("ma")&&px.includes(""),px);
  await p.evaluate(()=>{try{kg82Close()}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;render()});
  /* 3. the month's ration line (her rank's goods incl. 2 son phấn boxes) */
  const g=await p.evaluate(()=>{S.out=false;S.dead=false;Q.length=0;const G=stipGoods(S,null);const t=stipGoodsTxt(G);return{dbg:{srv:isSrv(),dead:!!S.dead,out:!!S.out,n:G.length},t,ok:/hộp/.test(t)&&BAL.ration.parts.some(x=>new RegExp(LX_N[x].join("|")).test(t))}});ok(`ration line names the boxes ${wh}`,g.ok,[g.t,g.dbg]);
  /* 4. visit cards: borrow on a rival visit (popCard), beg at Thái hậu, steal at a chest */
  const v=await p.evaluate(()=>{const v=consorts().find(x=>x!==S&&x.alive!==false&&!x.out&&!x.coop);v.inv.push({k:"lxson1",from:"noivu",d:S.turn});lxFix(v);S.inv=S.inv.filter(e=>!(lxOf(e.k)&&lxOf(e.k).part==="son"));
   const A=talkOpts({kind:"rival",ref:v}),Bg=talkOpts({kind:"th"}),C=talkOpts({kind:"chest",ref:v});const f=(L,n)=>{const a=(L||[]).find(a=>a&&a.n===n);return a?a.x:null};
   const opt=a=>({n:a.n,fx:{},x:a.x,go:()=>{}});const L=[A.find(a=>a&&a.n==="Mượn son phấn"),Bg.find(a=>a&&a.n==="Xin son phấn"),C.find(a=>a&&a.n==="Lấy trộm son phấn")].filter(Boolean);
   Q.length=0;Q.push({ev:1,t:"Đường kiếm son phấn",who:pv(v),h:`<p>Ba đường khi thiếu son môi (thẻ chọn như trong cuộc thăm).</p>`,opts:L.map(opt)});showModal();
   return{borrow:f(A,"Mượn son phấn"),beg:f(Bg,"Xin son phấn"),steal:f(C,"Lấy trộm son phấn"),pct:L.some(a=>/%/.test(a.x))}});
  ok(`visit cards exist, no % ${wh}`,v.borrow&&v.beg&&v.steal&&!v.pct,v);await sleep(800);await shot("cards");
  /* 5. the NPC asks her (event card) */
  const e=await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;S.inv.push({k:"lxma1",from:"noivu",d:S.turn});lxFix(S);const v=consorts().find(x=>x!==S&&x.alive!==false&&!x.out&&!x.coop);lxAskHer(v,"ma");const ok=Q.some(q=>q.t==="Sang mượn son phấn");showModal();return ok||{bot:!!window.__bot,srv:isSrv(),e:!!lxLend(S,"ma"),inv:S.inv.filter(e=>lxOf(e.k)).map(e=>e.k+":"+e.u)}});
  ok(`ask-her event ${wh}`,e===true,e);await sleep(900);await shot("askher");
  const hs=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);ok(`no h-scroll ${wh}`,!hs);
  ok(`no page errors ${wh}`,!errs.length,errs.slice(0,3));await ctx.close()}
 await b.close();if(SV)SV.close();console.log(bad?`RATION-SHOTS FAIL ${bad}`:"RATION-SHOTS ALL PASS");process.exit(bad?1:0)})();
