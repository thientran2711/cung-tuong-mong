/* xl-one-size (kit-stage-r15, RV-174 FAIL-1; law 10 «ONE XL size per device» + law 11 whole family; KIT §56.25): opens every kind of XL live frame
   (end dialogs: Đại kết cục / Kết cục / quiet end; long text; person + long text; 9-option pick list; 14-row intel list; many-option choice) on each device and checks:
   (a) every XL frame of a scene type has ONE height and ONE figure size (end scenes = their own room under the crown band), (b) the frame lies inside the screen.
   usage: [SHOTS=<dir outside the repo>] node dev/test/xl-one-size.js <url> [WxH@dpr,...]   exit 1 on FAIL. Prints a table row per dialog. */
const path=require('path');const {chromium}=require('playwright');
const URL=process.argv[2]||'file://'+path.resolve(__dirname,'../../index.html');
const SIZES=(process.argv[3]||'755x1000@1,1180x820@1').split(',').map(s=>{const m=s.match(/(\d+)x(\d+)@(\d+)/);return{w:+m[1],h:+m[2],d:+m[3]}});
const figEq=(a,R)=>{const b=R.fig;if(a==='-'||b==='-')return true;const [w1,h1]=a.split('x').map(Number),[w2,h2]=b.split('x').map(Number);return Math.abs(w1-w2)<=2&&Math.abs(h1-h2)<=2};let bad=0;const chk=(n,c,x)=>{if(c)console.log('ok  ',n);else{bad++;console.log('FAIL',n,JSON.stringify(x).slice(0,400))}};
const MEAS=`(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return null;const d=[...M.querySelectorAll('.dlg')].find(x=>x.offsetHeight>0);if(!d)return null;const r=d.getBoundingClientRect();const f=d.querySelector('.kszfig .kszfs');const fr=f&&f.getBoundingClientRect();
 return{ksz:d.dataset.ksz||'',stage:d.classList.contains('kstage'),kes:M.classList.contains('kes'),top:Math.round(r.top),bot:Math.round(r.bottom),h:d.offsetHeight/* layout size: a running pop-in scale (kesRise) never changes it */,fig:f?f.offsetWidth+'x'+f.offsetHeight:'-',ih:innerHeight}})()`;
(async()=>{const b=await chromium.launch();
 for(const z of SIZES){const tag=`${z.w}x${z.h}`;const ctx=await b.newContext({viewport:{width:z.w,height:z.h},deviceScaleFactor:z.d,serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(0);
  const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));const rows=[];
  const settle=async()=>{await p.waitForTimeout(700);await p.waitForFunction(()=>!(window.KLIFE&&KLIFE.on),null,{timeout:90000}).catch(()=>{});await p.waitForTimeout(1200);await p.evaluate(()=>{try{kmReset()}catch(e){}});await p.waitForTimeout(500)};
  const grab=async n=>{await settle();const m=await p.evaluate(MEAS);if(!m){rows.push({n,none:1});return}m.n=n;rows.push(m);if(process.env.SHOTS){require('fs').mkdirSync(process.env.SHOTS,{recursive:true});await p.screenshot({path:`${process.env.SHOTS}/${tag}-${n.replace(/[^a-z0-9]+/gi,'-')}.png`})}};
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof geS==='function');await p.waitForTimeout(2500);
  /* end dialogs (same set as dialog-fixed.js) */
  await p.evaluate(async()=>{localStorage.removeItem('ctm-ge');const road='tt_co',k='tt';quiet=true;const others=Object.keys(ARC67).filter(id=>ARC67[id].o===k&&id!==road);
   localStorage.setItem('ctm-arcs',JSON.stringify({[k]:others}));localStorage.setItem('ctm-tm96','1');window.__forceOrigin=k;document.getElementById('title').hidden=true;const kl=document.getElementById('kload');if(kl)kl.remove();window.__nlInner=1;start();window.__nlInner=0;
   await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin&&S.st&&S.st.f14)||++n>150)r();else setTimeout(t,100)};t()});Q.length=0;
   const s=geS();s.pull=[2,9,0,1];s.st=['o','o','x','o'];s.cx[2]=8;S.duc=62;S.sung=64;S.st.ch.all=1;S.st.f14.ends[11]='win';render();await new Promise(r=>setTimeout(r,2500));try{kmReset()}catch(e){}Q.length=0;geAsk();showModal()});
  await settle();await p.evaluate(()=>chooseM(0));await settle();
  await p.evaluate(()=>{const r0=window.roll;window.roll=()=>true;chooseM(0);window.roll=r0});await grab('end: Đại kết cục');
  await p.evaluate(()=>chooseM(0));await settle();
  await p.evaluate(()=>{Q.length=0;S.ge=null;const s=geS();s.st[0]='f';geAnswer(1,1);showModal()});await grab('end: Kết cục');
  await p.evaluate(()=>{Q.length=0;S.ge=null;const s=geS();s.pull=[0,3,0,0];geAnswer(3,0);showModal()});await grab('end: quiet end');
  /* ordinary XL frames (not an end scene) */
  await p.evaluate(()=>{Q.length=0;const M=document.getElementById('modal');M.hidden=true;M.className='modal';});
  const who=await p.evaluate(()=>!!pMaid());const mk=n=>Array.from({length:n},(_,i)=>({n:'Lựa chọn '+(i+1),fx:{},x:'tốn: 1 khắc · thành: biết thêm'}));
  const cases=[['long text',null,0,'<p>'+'Một đoạn rất dài. '.repeat(70)+'</p>'],['person + long text',1,0,'<p>'+'Một đoạn rất dài. '.repeat(70)+'</p>'],['person + 9 options',1,9,'<p>Ngươi muốn dò la ai?</p>'],['person + 6 options + text',1,6,'<p>'+'Một đoạn vừa. '.repeat(30)+'</p>']];
  for(const [n,w,o,h] of cases){await p.evaluate(([n,w,o,h])=>{Q.length=0;Q.push({t:'Thử '+n,who:w?pMaid():null,h,opts:Array.from({length:o},(_,i)=>({n:'Lựa chọn '+(i+1),fx:{},x:'tốn: 1 khắc · thành: biết thêm',go:()=>{}}))});showModal()},[n,w,o,h]);await grab(n);await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true})}
  await p.evaluate(()=>{const rv0=rivals.filter(v=>v&&v.name),rv=Array.from({length:14},(_,i)=>rv0[i%rv0.length]);Q.length=0;kitModal({kind:'intel',title:'Sổ nguyệt sự',sub:'Kính sự phòng',facts:rv.map(v=>({who:v,text:v.name+': tháng này đã báo, mong 3-8'}))})});await grab('intel 14 rows');
  console.log(tag+' | dialog | frame | end scene | top..bottom | height | figure');
  rows.forEach(r=>console.log(tag+' | '+r.n+' | '+(r.none?'(none)':`${r.ksz}${r.stage?' stage':''} | ${r.kes?'yes':'no'} | ${r.top}..${r.bot} | ${r.h} | ${r.fig}`)));
  const XL=rows.filter(r=>!r.none&&r.ksz==='XL'&&!r.stage);
  for(const k of [true,false]){const L=XL.filter(r=>r.kes===k);if(L.length<2)continue;chk(`${tag} XL ${k?'end-scene':'ordinary'} frames: one height + one figure (${L.length})`,L.every(r=>Math.abs(r.h-L[0].h)<=2&&figEq(r.fig,L.find(x=>x.fig!=='-')||L[0])),L.map(r=>[r.n,r.h,r.fig]))}
  chk(`${tag} every XL frame inside the screen`,XL.every(r=>r.top>=0&&r.bot<=r.ih),XL.filter(r=>r.top<0||r.bot>r.ih).map(r=>[r.n,r.top,r.bot]));
  chk(`${tag} no page errors`,!errs.length,errs.slice(0,3));await ctx.close()}
 await b.close();console.log(bad?`xl-one-size: ${bad} FAIL`:'xl-one-size: all pass');process.exit(bad?1:0)})();
