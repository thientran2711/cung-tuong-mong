/* dialog-fixed (review/kit-dialog, owner marks #44 #47 #49, 21/11): the kit DIALOG FRAME + OPTION CARD regression test. Fails when a future session drops any of:
   (a) option card: the odds meter (.kodds) sits ON THE TITLE ROW (same row as the title .kan), never its own row;
   (b) iPad (1180x820): option cards in TWO columns when the text fits (the Hồi kết nhánh Ngã rẽ 2 dialog: 3 short cards -> 2 columns); phone: one column;
   (c) the option picture FILLS its card (picture box height ~ card height, no gap above / below);
   (d) every dialog: the picture + info block stay FIXED, only the option list scrolls (scroll every scroller, the figure / event picture / info text must not move);
   (e) the «Trân nữ» seal: ONE corner (top-right of the header bar), ONE size, on every event dialog;
   (f) the left figure: the SAME size and the SAME position in every dialog of the same frame size (data-ksz) on one device.
   usage: node dev/test/dialog-fixed.js <url|-> <outdir> [WxH@dpr,...]   (shots go outside the repo). Exit 1 on any FAIL. */
const path=require('path');const fs=require('fs');const {chromium}=require('playwright');
const URL=process.argv[2]&&process.argv[2]!=='-'?process.argv[2]:'file://'+path.resolve(__dirname,'../../index.html');const OUT=process.argv[3]||'/tmp/dialog-fixed';
const SIZES=(process.argv[4]||'755x1000@2,1180x820@2').split(',').map(s=>{const m=s.match(/(\d+)x(\d+)@(\d+)/);return{w:+m[1],h:+m[2],d:+m[3]}});
fs.mkdirSync(OUT,{recursive:true});let bad=0;const chk=(n,c,x)=>{if(c){console.log('ok  ',n)}else{bad++;console.log('FAIL',n,JSON.stringify(x).slice(0,500))}};
const MEAS=`(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return null;const d=M.querySelector('.dlg');if(!d)return null;const R=e=>{const r=e.getBoundingClientRect();return{x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height)}};
 const fig=d.querySelector('.kszfig .kszfs')||d.querySelector('.kszfig');const tag=d.querySelector('.kszfig>.kt3');const ev=d.querySelector('.k3right>.k3ev');const opts=d.querySelector('.opts');
 const cards=opts?[...opts.querySelectorAll(':scope>button.ka.kopt')].filter(b=>b.offsetParent):[];
 const oc=cards.map(b=>{const kat=b.querySelector('.kat'),kan=b.querySelector('.kat>.kan'),od=b.querySelector('.kat>.kodds'),pic=b.querySelector(':scope>.kaart');const B=R(b);return{B,odd:od?(()=>{const o=R(od),t=R(kan);return o.y<t.y+t.h-2&&o.y+o.h>t.y+2})():null,pic:pic?R(pic):null,hasOdd:!!od}});
 const sealN=d.querySelectorAll(':scope>.kseal-ev').length,seal=d.querySelector(':scope>.kseal-ev');const D=R(d);const kph=d.querySelector('.kph');
 return{ksz:d.dataset.ksz||'',D,fig:fig?R(fig):null,tag:tag?R(tag):null,ev:ev?R(ev):null,kol:opts?(opts.dataset.kol||'')+(opts.dataset.kot||''):'',oc,sealN,seal:seal?{...R(seal),c:seal.dataset.c}:null,kph:kph?R(kph):null,title:((d.querySelector('.kph')||{}).textContent||'').trim().slice(0,30)}})()`;
(async()=>{const b=await chromium.launch();
 for(const z of SIZES){const tag=`${z.w}x${z.h}`;const ctx=await b.newContext({viewport:{width:z.w,height:z.h},deviceScaleFactor:z.d,serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(0);
  const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,300)));
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof geS==='function',null,{timeout:0});await p.waitForTimeout(2500);
  await p.evaluate(async()=>{localStorage.removeItem('ctm-ge');const road='tt_co',k='tt';quiet=true;const others=Object.keys(ARC67).filter(id=>ARC67[id].o===k&&id!==road);
   localStorage.setItem('ctm-arcs',JSON.stringify({[k]:others}));localStorage.setItem('ctm-tm96','1');window.__forceOrigin=k;document.getElementById('title').hidden=true;const kl=document.getElementById('kload');if(kl)kl.remove();window.__nlInner=1;start();window.__nlInner=0;
   await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin&&S.st&&S.st.f14)||++n>150)r();else setTimeout(t,100)};t()});Q.length=0;
   const s=geS();s.pull=[2,9,0,1];s.st=['o','o','x','o'];s.cx[2]=8;S.duc=62;S.sung=64;S.st.ch.all=1;S.st.f14.ends[11]='win';render();await new Promise(r=>setTimeout(r,2500));try{kmReset()}catch(e){}Q.length=0;geAsk();showModal()});
  const R=[];const settle=async()=>{await p.waitForTimeout(700);await p.waitForFunction(()=>!(window.KLIFE&&KLIFE.on),null,{timeout:90000}).catch(()=>{});await p.waitForTimeout(1200);await p.evaluate(()=>{try{kmReset()}catch(e){}});await p.waitForTimeout(500)};
  const grab=async(name)=>{await settle();const m=await p.evaluate(MEAS);if(!m){chk(`${tag} ${name}: dialog open`,false,null);return}m.name=name;R.push(m);await p.screenshot({path:`${OUT}/${tag}-${name}.png`});
   /* (a)(b)(c) option cards */
   if(m.oc.length){chk(`${tag} ${name}: odds on the title row (${m.oc.filter(c=>c.hasOdd).length}/${m.oc.length} cards have odds)`,m.oc.every(c=>!c.hasOdd||c.odd),m.oc.map(c=>c.odd));
    chk(`${tag} ${name}: option picture fills the card`,m.oc.every(c=>!c.pic||c.pic.h>=c.B.h-8),m.oc.map(c=>[c.pic&&c.pic.h,c.B.h]));
    if(z.w>=1100&&m.oc.length>=3)chk(`${tag} ${name}: iPad option cards in 2 columns (layout ${m.kol})`,m.kol[0]==='2',m.kol);
    if(z.w<800)chk(`${tag} ${name}: phone option cards in 1 column (layout ${m.kol})`,m.kol[0]==='1',m.kol)}
   /* (e) seal */
   chk(`${tag} ${name}: exactly one seal, top-right of the header`,m.sealN===1&&m.seal&&m.seal.c==='tr'&&m.kph&&m.seal.y<m.kph.y+m.kph.h&&m.seal.x+m.seal.w>m.D.x+m.D.w-110&&m.seal.w===34,{n:m.sealN,seal:m.seal,kph:m.kph,D:m.D});
   /* (d) only the option list scrolls: scroll every scroller down, the figure / event picture / info must not move */
   const mv=await p.evaluate(MEASMOVE=>{const M=document.getElementById('modal'),d=M.querySelector('.dlg');const pos=()=>[d.querySelector('.kszfig'),d.querySelector('.k3right>.k3ev'),d.querySelector('.k3right>.k3info,.k3right>.kpmain,.k3right')].map(e=>{if(!e)return null;const r=e.getBoundingClientRect();return[Math.round(r.top),Math.round(r.left)]});
    const a=pos();let n=0;[d,...d.querySelectorAll('*')].forEach(e=>{if(e.scrollHeight>e.clientHeight+2&&/(auto|scroll)/.test(getComputedStyle(e).overflowY)){e.scrollTop=1e5;n++}});const c=pos();return{a,c,n}},null);
   chk(`${tag} ${name}: picture + info stay fixed while ${mv.n} scroller(s) scroll`,JSON.stringify(mv.a)===JSON.stringify(mv.c),mv)};
  await grab('1-hoi-nga-re-1');
  await p.evaluate(()=>chooseM(0));await grab('2-hoi-nga-re-2');
  await p.evaluate(()=>{const r0=window.roll;window.roll=()=>true;chooseM(0);window.roll=r0});await grab('3-dai-ket-cuc');
  await p.evaluate(()=>{Q.length=0;S.ge=null;const s=geS();s.st[0]='f';geAnswer(1,1);showModal()});await grab('7-ket-cuc-thua');
  await p.evaluate(()=>{Q.length=0;S.ge=null;const s=geS();s.pull=[0,3,0,0];geAnswer(3,0);showModal()});await grab('8-quiet');
  /* (f) same frame size => same figure size + position on this device */
  const by={};R.filter(m=>m.fig&&m.ksz).forEach(m=>{(by[m.ksz]=by[m.ksz]||[]).push(m)});
  for(const k in by){const L=by[k];if(L.length<2)continue;const ref=L[0];chk(`${tag} frame size ${k}: left figure same size + position in ${L.length} dialogs`,L.every(m=>Math.abs(m.fig.w-ref.fig.w)<=2&&Math.abs(m.fig.h-ref.fig.h)<=2&&Math.abs(m.fig.y-m.D.y-(ref.fig.y-ref.D.y))<=2&&Math.abs(m.fig.x-m.D.x-(ref.fig.x-ref.D.x))<=2),L.map(m=>[m.name,m.D.h,m.fig]))}
  console.log(tag,'summary',JSON.stringify(R.map(m=>[m.name,m.ksz,m.D.w+'x'+m.D.h,m.kol,m.fig&&m.fig.w+'x'+m.fig.h+'@'+(m.fig.y-m.D.y)])));
  chk(`${tag}: no page errors`,!errs.length,errs.slice(0,3));await ctx.close()}
 await b.close();console.log(bad?`dialog-fixed: ${bad} FAIL`:'dialog-fixed: all pass');process.exit(bad?1:0)})();
