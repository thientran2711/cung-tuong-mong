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
 const oc=cards.map(b=>{const kat=b.querySelector('.kat'),kan=b.querySelector('.kat>.kan'),od=b.querySelector('.kat>.kodds'),pic=b.querySelector(':scope>.kaart');const B=R(b);return{B,kodrow:b.classList.contains('kodrow'),odd:od?(()=>{const o=R(od),t=R(kan);return o.y<t.y+t.h-2&&o.y+o.h>t.y+2})():null,pic:pic?R(pic):null,hasOdd:!!od}});
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
   if(m.oc.length){chk(`${tag} ${name}: odds on the title row (${m.oc.filter(c=>c.hasOdd).length}/${m.oc.length} cards have odds)`,m.oc.every(c=>!c.hasOdd||c.odd||c.kodrow),m.oc.map(c=>c.odd));
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
  await p.evaluate(()=>chooseM(0));await grab('4-danh-hieu-moi');
  {const c=await p.evaluate(()=>{const d=document.querySelector('#modal .dlg'),ev=d&&d.querySelector('.k3ev,.k3body>.k3mpic'),pl=ev&&ev.querySelector('.kt3');if(!ev||!pl)return{ev:!!ev,kt3:[...d.querySelectorAll('.kt3')].map(e=>e.className+'|'+e.parentElement.className),kdh:d.querySelectorAll('.kdh').length,title:(d.querySelector('.kph')||{}).textContent};const a=ev.getBoundingClientRect(),b=pl.getBoundingClientRect();return{a:[a.left,a.top,a.right,a.bottom].map(Math.round),b:[b.left,b.top,b.right,b.bottom].map(Math.round),in:b.left>=a.left-1&&b.right<=a.right+1&&b.top>=a.top-1&&b.bottom<=a.bottom+1}});chk(`${tag} (#54) the new-title plate sits ON the event picture`,c&&c.in===true,c)}
  await p.evaluate(()=>{Q.length=0;S.ge=null;const s=geS();s.st[0]='f';geAnswer(1,1);showModal()});await grab('7-ket-cuc-thua');
  await p.evaluate(()=>{Q.length=0;S.ge=null;const s=geS();s.pull=[0,3,0,0];geAnswer(3,0);showModal()});await grab('8-quiet');
  /* (f) same frame size => same figure size + position on this device */
  const by={};R.filter(m=>m.fig&&m.ksz).forEach(m=>{(by[m.ksz]=by[m.ksz]||[]).push(m)});
  for(const k in by){const L=by[k];if(L.length<2)continue;const ref=L[0];chk(`${tag} frame size ${k}: left figure same size + position in ${L.length} dialogs`,L.every(m=>Math.abs(m.fig.w-ref.fig.w)<=2&&Math.abs(m.fig.h-ref.fig.h)<=2&&Math.abs(m.fig.y-m.D.y-(ref.fig.y-ref.D.y))<=2&&Math.abs(m.fig.x-m.D.x-(ref.fig.x-ref.D.x))<=2),L.map(m=>[m.name,m.D.h,m.fig]))}
  /* (g) #56 owner 21/11 ~04:20Z: EVERY option card of EVERY dialog shows its picture (own art or the §59 stand-in), never a picture-less card (fresh ordinary game, real events) */
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf{display:none!important}'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&window.__ctmBuilt,null,{timeout:0});await p.waitForTimeout(2500);
  await p.evaluate(()=>{try{kitReward=()=>{}}catch(e){}const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<400;i++){start();if(!isSrv())break}window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.th=Math.max(S.th||0,40);S.bac=500;render()});await p.waitForTimeout(800);
  const TITLES=[['Tiếp chuyện','Không tiếp'],['Nhận lời','Khéo từ chối','Mặc kệ'],['Ở lại cho trọn','Xin lui về'],['Lặng lẽ quan sát','Hỏi thẳng một câu','Nhờ người dò hỏi','Bỏ qua tất cả']];
  const evs=TITLES.map((t,i)=>'Có người tìm đến '+i);const noPic=[];let nCards=0;
  for(let i=0;i<TITLES.length;i++){const r=await p.evaluate(async([t,ns])=>{Q.length=0;Q.push({t,h:'<p>Có người tìm đến cung nàng, dáng vẻ ngập ngừng như có điều muốn nói.</p>',opts:ns.map(n=>({n,fx:{},x:'tốn: 1 khắc · thành: cùng nhau trải qua khắc này',go:()=>{}}))});showModal();await new Promise(r=>setTimeout(r,700));const d=document.querySelector('#modal .dlg');const cs=d?[...d.querySelectorAll('.opts>button.ka')].filter(b=>b.offsetParent):[];return{n:cs.length,bad:cs.filter(b=>{const a=b.querySelector(':scope>.kaart');return !a||!a.getClientRects().length||!a.querySelector('img')}).map(b=>(b.querySelector('.kan')||b).textContent.trim().slice(0,30))}},[evs[i],TITLES[i]]);nCards+=r.n;if(r.bad.length)noPic.push([evs[i],r.bad])}
  /* (h) #72 owner 21/11 ~05:0xZ: the loss has its OWN «Mất» row (Tốn / Được / Mất), never folded into Tốn */
  {const r=await p.evaluate(async()=>{Q.length=0;Q.push({t:'Thử mất',h:'<p>Một việc có giá, có lợi và có thể mất.</p>',opts:[{n:'Nhận lời nàng',fx:{},x:'tốn: 1 khắc · thành: Sủng +2 · mất: Danh -3',go:()=>{}},{n:'Từ chối khéo',fx:{},x:'tốn: không · mất: Đức -2',go:()=>{}}]});showModal();await new Promise(r=>setTimeout(r,700));const d=document.querySelector('#modal .dlg');return [...d.querySelectorAll('.opts>button.ka')].filter(b=>b.offsetParent).map(b=>{const rows=[...b.querySelectorAll('small.kb>.kr')].filter(x=>x.querySelector('.krl').getClientRects().length).map(x=>[(x.querySelector('.krl')||{}).textContent,(x.querySelector('.krv')||{}).textContent.trim()]);return rows})});
   await p.screenshot({path:`${OUT}/${tag}-72-mat-row.png`});
   chk(`${tag} (#72) cards show Tốn / Được / Mất rows, the loss not inside Tốn`,r.length===2&&r.every(rows=>Array.isArray(rows)&&rows.some(x=>x[0]==='Mất')&&rows.some(x=>x[0]==='Tốn'&&!/Danh|Đức/.test(x[1]))),r)}
  /* (i) #71 owner 21/11 ~05:02Z: EVERY dialog uses a kit frame size S / M / L / XL (data-ksz) and has that size's width (law 10) - the Fold «Sai … đi dò la» dialog had a size of its own. Every kind is opened for real. */
  {const rows=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const res=[];const FW=KIT_SIZE.frame,mode=kitSzMode();
    const meas=async(name)=>{await sleep(1500);const L=[...document.querySelectorAll('.dlg,.dbox.kpanel')].filter(d=>{const r=d.getBoundingClientRect();return r.width>5&&r.height>5&&!d.closest('[hidden]')&&!d.closest('#kload')&&getComputedStyle(d).visibility!=='hidden'});
     L.forEach(d=>{const r=d.getBoundingClientRect(),k=d.dataset.ksz||'';const want=FW[k]?Math.min(FW[k].w[mode],innerWidth-16):null;res.push({name,cls:d.className.slice(0,50),ksz:k,w:Math.round(r.width),want,ok:!!FW[k]&&Math.abs(r.width-want)<=2})});if(!L.length)res.push({name,none:1});
     Q.length=0;document.getElementById('modal').hidden=true;['kidfl','ktip'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});try{kitCoachOff()}catch(e){}};
    const who=pMaid(),nm='Cung nữ thân tín tam đẳng Bạch Lan';const mk=n=>Array.from({length:n},(_,i)=>({n:'Lựa chọn '+(i+1),fx:{},x:'tốn: 1 khắc · thành: biết thêm',go:()=>{}}));
    for(const k of['notice','news','intel','result','threat','reward','info','rule']){try{kitPanel({kind:k,title:'Thử '+k,rows:[['Việc','Thử ấn']],facts:['Điều thử.'],sections:[{h:'',rows:[['a','b']]}]},true);showModal();await meas('kitPanel '+k)}catch(e){res.push({name:'kitPanel '+k,err:e.message})}}
    for(const [nme,w,o,h] of[['choice',null,mk(2),'<p>Một việc.</p>'],['choice+person',who,mk(2),'<p>Một việc.</p>'],['pick-list+person',who,mk(9),'<p>Ngươi muốn dò la ai?</p>'],['long text',null,[],'<p>'+'Một đoạn rất dài. '.repeat(70)+'</p>'],['person+text',who,[],'<p>Có người.</p>']]){Q.length=0;Q.push({t:'Sai '+nm+' đi dò la',who:w,h,opts:o});showModal();await meas(nme)}
    try{S.maid=S.maid||{};S.maid.name='Bạch Lan';S.bac=500;spyPick(2);await meas('spyPick (real pick-list)')}catch(e){res.push({name:'spyPick',err:e.message})}
    try{kitConfirm({title:'Chắc chăng?',lines:['Một dòng.'],yes:'Có',no:'Thôi'});await meas('kitConfirm')}catch(e){res.push({name:'kitConfirm',err:e.message})}
    try{kitItemCard({e:S.inv.find(x=>x&&IT[x.k])});await meas('item card')}catch(e){res.push({name:'item card',err:e.message})}
    try{kitTip({id:'scan',title:'Lời dặn thử',html:'<p>Một lời dặn ngắn.</p>'});await meas('tip')}catch(e){res.push({name:'tip',err:e.message})}
    try{kitCoach({title:'Dặn thử',html:'<p>Một lời.</p>'});await meas('coach')}catch(e){res.push({name:'coach',err:e.message})}
    try{S.shop=Object.keys(IT).filter(k=>IT[k].pr).slice(0,12);kitShopNvp();await meas('shop')}catch(e){res.push({name:'shop',err:e.message})}
    return res});
   const bad=rows.filter(r=>r.err||r.none||!r.ok);
   console.log(tag,'(#71) dialogs measured:',rows.map(r=>`${r.name}:${r.ksz}/${r.w}`).join(' | '));
   chk(`${tag} (#71) every dialog (${rows.length} opened, ${new Set(rows.map(r=>r.name)).size} kinds) uses a kit frame size S/M/L/XL and its width`,!bad.length,bad.slice(0,6))}
  /* (j) #75 #76 #80 owner 21/11: the LEFT SLOT of a small frame = the main subject (person portrait / ITEM tile / matter picture) on EVERY device, and the event picture is the TOP of the right column (no empty band above it) */
  {const r=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const A=rivals.filter(v=>v&&v.name)[0],e=S.inv.find(x=>x&&IT[x.k]);const out={};
    const cases={result:()=>kitPanel({kind:'result',title:'Bị từ chối',facts:['Cung nữ ra cửa: “Chủ tử nhà nô tỳ không tiện tiếp.”'],who:pv(A)},true),
     lohen:()=>Q.push({t:'Lỡ hẹn',btn:'Đã hiểu',who:pv(A),h:`<p>Đã quá hạn việc ${A.name} nhờ: <b>Mời Thường tại cùng nhau uống trà</b>.</p><p>Thiện cảm −3</p>`}),
     lost:()=>Q.push({t:'Đồ thất lạc',who:pMe(),h:`${loTag(e)}<p><b>${loNm(e.k)}</b> trong rương ngươi đã thất lạc.</p><p class="past">Chưa rõ vì sao.</p>`,btn:'Đã hiểu'}),
     matter:()=>kitPanel({kind:'news',title:'Tin cung',facts:['Mưa lớn suốt đêm, ngự hoa viên ngập nước.']},true)};
    for(const k in cases){Q.length=0;cases[k]();showModal();await sleep(1700);const d=document.querySelector('#modal .dlg');const R=x=>x?x.getBoundingClientRect():null;const rc=R(d.querySelector('.k3right')),ev=R(d.querySelector('.k3right>.k3ev'));
     out[k]={ksz:d.dataset.ksz,left:(d.querySelector('.k3body>:first-child')||{}).className||'',evTop:ev&&rc?Math.round(ev.top-rc.top):null,kievInText:d.querySelectorAll('.k3right .kiev').length,picLeft:!!d.querySelector('.k3body>.k3mpic')};Q.length=0;document.getElementById('modal').hidden=true}
    return out});
   chk(`${tag} (#75) small notice «Lỡ hẹn»: the person is the left slot (portrait) on this device`,r.lohen.ksz==='S'&&/k3mpor/.test(r.lohen.left),r.lohen);
   chk(`${tag} (#80) event picture is the TOP of the right column (result + notice with a person)`,r.result.evTop!==null&&r.result.evTop<=3&&r.lohen.evTop!==null&&r.lohen.evTop<=3,[r.result,r.lohen]);
   chk(`${tag} (#76) «Đồ thất lạc»: the ITEM tile is the left slot, not in the text, not a generic picture`,r.lost.ksz==='S'&&/k3mitem/.test(r.lost.left)&&r.lost.kievInText===0&&!r.lost.picLeft,r.lost);
   chk(`${tag} (#76) no person / item: the matter (event picture) is the left slot`,r.matter.picLeft,r.matter)}
  /* (k) #82 owner 21/11 ~05:37Z: a list of SHORT rows (Sổ nguyệt sự, people lists) is in TWO columns on the iPad, ONE on the phone */
  {const r=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const rv0=rivals.filter(v=>v&&v.name),rv=Array.from({length:14},(_,i)=>rv0[i%rv0.length]);/* 14 short rows: too tall for M, so the frame is XL (wide text column) like the owner's Sổ nguyệt sự */
    const facts=[{who:S,text:'Ta: tháng này đã báo, ngày 13-19 · tháng trước: đã báo, ngày 13-19'},...rv.map(v=>({who:v,text:`${v.name}: tháng này đã báo, mong 3-8 · tháng trước: đã báo, mong 3-9`}))];
    const long=[{who:S,text:'Một hàng rất dài. '.repeat(12)},...rv.slice(0,3).map(v=>({who:v,text:'Một hàng rất dài. '.repeat(12)}))];
    const one=async(f)=>{Q.length=0;kitModal({kind:'intel',title:'Sổ nguyệt sự',sub:'Kính sự phòng',facts:f});await sleep(1800);const d=document.querySelector('#modal .dlg');const L=[...d.querySelectorAll('.kfacts')].map(x=>{const rs=[...x.children].filter(c=>c.classList.contains('kfact'));const xs=new Set(rs.map(c=>Math.round(c.getBoundingClientRect().left)));return{rows:rs.length,cols:xs.size,attr:x.dataset.kcols||''}});const sc=d.querySelector('.k3right');const o={ksz:d.dataset.ksz,L,scroll:sc?Math.max(0,...[d,...d.querySelectorAll('*:not(img):not(figure)')].filter(e=>/(auto|scroll|hidden|clip)/.test(getComputedStyle(e).overflowY)).map(e=>e.scrollHeight-e.clientHeight)):0};Q.length=0;document.getElementById('modal').hidden=true;return o};
    return{short:await one(facts),long:await one(long)}});
   const big=r.short.L.find(x=>x.rows>=3);
   if(z.w>=1100)chk(`${tag} (#82) iPad: a list of short rows is in 2 columns (${big&&big.rows} rows, ${big&&big.cols} columns)`,big&&big.cols===2&&big.attr==='2'&&r.short.ksz==='XL',r.short);
   else chk(`${tag} (#82) phone: the same list stays in 1 column`,big&&big.cols===1&&!big.attr,r.short);
   chk(`${tag} (#82) long rows stay in 1 column`,r.long.L.every(x=>x.cols===1),r.long)}
  /* (l) MAIN 88 (a) no empty «Được» cell: a card with no gain says «không» on every device (j65 dedupe used to delete the second «không»); (b) ONE title alignment on every card */
  {const r=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));Q.length=0;Q.push({t:'Thử',h:'<p>Thử.</p>',opts:[{n:'Đeo ngay',fx:{},x:'Danh +2',go:()=>{}},{n:'Mặc kệ',fx:{},x:'',go:()=>{}},{n:'Vô ích',fx:{},x:'tốn: 1 khắc',go:()=>{}}]});showModal();await sleep(2200);const ob=[...document.querySelectorAll('#modal .opts>button.kopt')];if(ob.some(b=>!b.querySelector('.kr-duoc')))await sleep(3000);
    const o=[...document.querySelectorAll('#modal .opts>button.kopt')].map(b=>({ta:getComputedStyle(b.querySelector('.kan')).textAlign,duoc:((b.querySelector('.kr-duoc')||{}).innerText||'').replace(/\s+/g,' ').replace(/^Được\s*/i,'').trim(),ton:((b.querySelector('.kr-ton')||{}).innerText||'').replace(/\s+/g,' ').replace(/^Tốn\s*/i,'').trim()}));Q.length=0;document.getElementById('modal').hidden=true;return o});
   chk(`${tag} (kit-dialog-2 a) no empty Tốn / Được cell`,r.every(c=>c.duoc&&c.ton),r[1]);chk(`${tag} (kit-dialog-2 b) one title alignment on every card`,new Set(r.map(c=>c.ta)).size===1,r)}
  chk(`${tag} (#56) ${evs.length} dialogs with unlisted option titles, ${nCards} option cards: none without a picture`,!noPic.length,noPic.slice(0,6));
  console.log(tag,'summary',JSON.stringify(R.map(m=>[m.name,m.ksz,m.D.w+'x'+m.D.h,m.kol,m.fig&&m.fig.w+'x'+m.fig.h+'@'+(m.fig.y-m.D.y)])));
  chk(`${tag}: no page errors`,!errs.length,errs.slice(0,3));await ctx.close()}
 await b.close();console.log(bad?`dialog-fixed: ${bad} FAIL`:'dialog-fixed: all pass');process.exit(bad?1:0)})();
