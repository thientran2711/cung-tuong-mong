/* ui-tour-coop capture: two browsers (host A = seat a, guest B = seat b) against the LIVE co-op Worker; every shot taken at Fold 755x1000 AND iPad 1180x820 (same page, viewport switched). Reuses coop-e2e.js setup (serve, clear, press, tapText). */
const T=process.env.WT||require('path').resolve(__dirname,'../..');
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require(T+'/dev/test/coop-serve.js');
const OUT=process.argv[2]||'/home/user/wt/uitc/shots';fs.mkdirSync(OUT,{recursive:true});
const WURL='https://ctm-coop.victoria-tntt.workers.dev';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const LIST=[];const log=(...a)=>console.log(...a);
const VPS=[['fold',755,1000],['ipad',1180,820]];
async function mk(b,name){const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,hasTouch:true,reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='.kcf,#kroul{display:none!important}';document.head.appendChild(s)});
  window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};return{code:s.room||'',seat:c.seat||s.you||null,week:s.week||0,status:s.status,peer:!!s.peerOnline,world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}}},WURL);
 const o={ctx,name,errs:[]};o.p=await ctx.newPage();o.p.setDefaultTimeout(30000);o.p.setDefaultNavigationTimeout(120000);o.p.on('pageerror',e=>o.errs.push(e.message));return o}
async function shot(o,id,title,group,opts){opts=opts||{};const files={};for(const [d,w,h] of VPS){try{await o.p.setViewportSize({width:w,height:h});await sleep(opts.wait||700);if(opts.prep)await o.p.evaluate(opts.prep).catch(()=>{});
  const f=`${OUT}/${id}-${o.name}-${d}.jpg`;await o.p.screenshot({path:f,type:'jpeg',quality:72,timeout:60000});files[d]=f}catch(e){log('shot fail',id,d,e.message.split('\n')[0])}}
 await o.p.setViewportSize({width:755,height:1000}).catch(()=>{});LIST.push({id,seat:o.name,title,group,files});fs.writeFileSync(OUT+'/list.json',JSON.stringify(LIST,null,1));log('shot',id,o.name,title)}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);const el=h.asElement();if(el){try{await el.click({noWaitAfter:true,timeout:15000});return true}catch(e){}}await sleep(250)}return false}
/* close story/news modals (copied from coop-e2e.js clear) */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{const ov=document.getElementById('ov');if(ov&&!ov.hidden&&ov.getClientRects().length&&getComputedStyle(ov).display!=='none'){const B=[...ov.querySelectorAll('button')].filter(x=>x.offsetParent!==null&&!x.disabled);const b=B.find(x=>/Để tài nghệ|Để trời định/.test(x.textContent))||B.find(x=>x.id==='kg82ok')||B.find(x=>x.id!=='kg82go'&&!/Hướng dẫn|Sẵn sàng|Bắt đầu/.test(x.textContent));if(b){b.click();return'x'}}const ko=document.getElementById('kg82ok');if(ko&&!ko.disabled&&ko.isConnected&&ko.getClientRects().length){ko.click();return'x'}const kx=[...document.querySelectorAll('[class*=kg82] button,[id^=kg82] button')].find(x=>x.offsetParent!==null&&/^(✕|×)$|Đóng/.test((x.textContent||'').trim()+' '+(x.getAttribute('aria-label')||'')));if(kx){kx.click();return'x'}const mgb=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&/^(Để tài nghệ quyết định|Để trời định)/.test(x.textContent.trim()));if(mgb){mgb.click();return'x'}const mgr=[...document.querySelectorAll('.kg82 button,[class*=kg82] button,[class*=kgres] button,.kmrew button')].find(x=>x.offsetParent!==null&&!x.disabled&&/^(Nhận|Xong|Đóng|Về|Tạ ơn|Đã hiểu)/.test(x.textContent.trim()));if(mgr){mgr.click();return'x'}const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}
   const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp)||all[0];if(b){b.click();return'x'}return''}).catch(()=>'');
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}if(st!=='x')return st;await sleep(250)}return'many'}
const modalTitle=o=>o.p.evaluate(()=>{const m=document.getElementById('modal');if(!m||m.hidden)return null;const h=m.querySelector('.kph');const t=(h?h.textContent:m.textContent).replace(/\s+/g,' ').trim();return t.replace(/^(BÁO|VIỆC|TIN|LỆNH|CHỌN|KẾT QUẢ|LUẬT)\s*/,'').slice(0,70)+' ¦ '+m.textContent.replace(/\s+/g,' ').slice(0,300)}).catch(()=>null);
async function shotModals(o,id,group,max=6){/* shoot each queued popup on this seat then close it */for(let i=0;i<max;i++){const t=await modalTitle(o);if(!t)return i;await shot(o,`${id}-${i}`,'Popup: '+t.split(' ¦ ')[0],group);await o.p.evaluate(()=>{const m=document.getElementById('modal');const b=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);(b.find(x=>!x.dataset.kcp)||b[0])&&(b.find(x=>!x.dataset.kcp)||b[0]).click()}).catch(()=>{});await sleep(500)}return max}
async function nextOn(o){return o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true}).catch(()=>false)}
const fr=o=>o.p.evaluate(()=>{const i=rivals.findIndex(v=>v.coop);const s=rivals.flatMap(v=>v.staff||[]).find(x=>x.coop);return{i,name:i>=0?rivals[i].name:s?s.name:null,srv:!!s,home:i<0&&!s,me:S.name,rank:S.rank,org:S.origin&&S.origin.k}});
async function openRv(o,i){return o.p.evaluate(i=>{try{tab='rv';renderPanel();render();const f=rivals[i];const nm=[f.name,f.name.split(' ').pop(),'Hảo hữu của ta'];
 const th=[...document.querySelectorAll('.pface[data-pg=rv]')].find(x=>nm.some(n=>x.textContent.includes(n)));if(th){th.click();return 'thumb'}PG.rv=i;renderPanel();return 'idx'}catch(e){return e.message}},i)}
async function openTab(o,k){return o.p.evaluate(k=>{try{if(typeof goTab==='function'&&goTab(k))return true;tab=k;renderPanel();render();return true}catch(e){return e.message}},k)}
const scrollPanelTo=(o,sel)=>o.p.evaluate(sel=>{const e=document.querySelector(sel);if(e)e.scrollIntoView({block:'start'})},sel).catch(()=>{});
(async()=>{const b=await chromium.launch();
 const A=await mk(b,'host'),B=await mk(b,'guest');
 for(const [o,k] of [[A,process.env.COOP_A_ORIGIN],[B,process.env.COOP_B_ORIGIN]])if(k)await o.ctx.addInitScript(k=>{window.__forceOrigin=k},k);
 const G1='1 · Vào phòng chơi cùng';
 await A.p.goto(BASE,{waitUntil:'domcontentloaded'});await A.p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:90000}).catch(()=>{});await sleep(1500);
 await shot(A,'01','Màn đầu (chủ phòng)',G1);
 log('tap coop',await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/));await sleep(800);await shot(A,'02','Chọn sổ — tab Cùng hảo hữu',G1);
 log('tap invite',await tapText(A,/^(Mời bạn|Mời hảo hữu)/));
 await A.p.waitForFunction(()=>__co().code&&__co().seat==='a',null,{timeout:40000}).catch(()=>log('no room'));await sleep(1200);
 const code=(await A.p.evaluate(()=>__co())).code;log('room',code);
 await shot(A,'03','Phòng chờ của chủ phòng: ám hiệu, 1-2-3, chọn phút mỗi buổi',G1);
 await B.p.goto(BASE+'?room='+code,{waitUntil:'domcontentloaded'});await B.p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:90000}).catch(()=>{});await sleep(1500);
 await shot(B,'04','Khách mở đường dẫn mời (vào phòng)',G1);
 await tapText(B,/^Vào phòng/,4000);await sleep(1500);await shot(B,'05','Khách sau khi bấm Vào phòng',G1);await shot(A,'05','Chủ phòng khi khách vào',G1);
 {const t0=Date.now();while(Date.now()-t0<90000){const a=await A.p.evaluate(()=>__co().world).catch(()=>0),c=await B.p.evaluate(()=>__co().world).catch(()=>0);if(a&&c)break;
   /* shoot the life draw / intro the first time each shows */await clear(A,3);await clear(B,3);await sleep(600)}}
 {const t0=Date.now();while(Date.now()-t0<40000){const x=await fr(A),y=await fr(B);if(x.name&&y.name)break;await clear(A,3);await clear(B,3);await sleep(500)}}
 const FA=await fr(A),FB=await fr(B);log('friend',FA,FB);
 /* the opening popups of each seat */
 const G2='2 · Màn chính khi chơi cùng (chip hảo hữu, đồng hồ)';
 await shotModals(A,'06m',G2,4);await shotModals(B,'06m',G2,4);await clear(A);await clear(B);
 await shot(A,'07','Màn chính: chip hảo hữu trên cùng + đồng hồ buổi',G2);await shot(B,'07','Màn chính: chip hảo hữu trên cùng + đồng hồ buổi',G2);
 for(const o of [A,B]){await o.p.evaluate(()=>{const b=document.querySelector('[data-ctm="fr"]');b&&b.click()});await sleep(700);await shot(o,'08','Chạm chip hảo hữu → bảng hảo hữu (chỉ trạng thái)',G2);await o.p.evaluate(()=>{const b=document.querySelector('[data-ctm="frx"]');if(b)b.click();else{const p=document.getElementById('kctmp');p&&p.remove()}});await sleep(300)}
 /* 3 partner info */
 const G3='3 · Thông tin hảo hữu (Hậu cung › Phi tần, Giao tình)';
 for(const [o,F] of [[A,FA],[B,FB]]){await clear(o);if(F.i>=0){log('openRv',await openRv(o,F.i));await sleep(600);await shot(o,'09','Hậu cung › Phi tần: thẻ của hảo hữu khi CHƯA quen (luật người lạ)',G3)}
   else await shot(o,'09','Hảo hữu không có thẻ Phi tần ('+(F.srv?'nàng là cung nữ':'nàng còn là tiểu thư ở nhà')+')',G3)}
 for(const o of [A,B]){await clear(o);await openTab(o,'rel');await sleep(600);await shot(o,'10','Giao tình › Quan hệ (hảo hữu trong nhóm Phi tần)',G3)}
 /* met: set the stranger level to "Đã quen" (test step, as after greeting her in game) */
 for(const [o,F] of [[A,FA],[B,FB]]){const r=await o.p.evaluate(()=>{try{const f=rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop);if(!f)return'none';S.known=S.known||{};S.known[kOf61(f)]=3;if(f.id!=null){S.met=S.met||{};S.met[f.id]=0}if(typeof k61S==='function'){const K=k61S();if(K)K[kOf61(f)]=3}return k61St(f)}catch(e){return e.message}});log('met',o.name,r);
   await clear(o);if(F.i>=0){await openRv(o,F.i);await sleep(600);await shot(o,'11','Thẻ hảo hữu khi ĐÃ QUEN (đầu thẻ)',G3);
     await o.p.evaluate(()=>{const p=document.getElementById('panel');const sc=[p,...p.querySelectorAll('*')].find(e=>e.scrollHeight>e.clientHeight+40&&/(auto|scroll)/.test(getComputedStyle(e).overflowY));if(sc)sc.scrollTop=sc.scrollHeight});await sleep(400);
     await shot(o,'12','Thẻ hảo hữu khi ĐÃ QUEN (cuộn xuống: nút Gặp mặt, giao thiệp, hại)',G3,{prep:()=>{const p=document.getElementById('panel');const sc=[p,...p.querySelectorAll('*')].find(e=>e.scrollHeight>e.clientHeight+40&&/(auto|scroll)/.test(getComputedStyle(e).overflowY));if(sc)sc.scrollTop=sc.scrollHeight}})}}
 for(const o of [A,B]){await clear(o);await openTab(o,'rel');await sleep(600);await shot(o,'13','Giao tình › Quan hệ khi đã quen',G3)}
 /* 4 visit her palace */
 const G4='4 · Sang cung hảo hữu';
 for(const [o,F] of [[A,FA],[B,FB]]){await clear(o);if(F.i<0)continue;const r=await o.p.evaluate(()=>{try{const f=rivals.find(v=>v.coop);const k=palaceOf(f);used=0;S.place=k;S.visit={k,people:typeof peopleAt==='function'?peopleAt(k):[],talked:false,tk:{}};try{refreshHere&&refreshHere()}catch(e){}tab='act';render();return k}catch(e){return e.message}});log('visit',o.name,r);await sleep(900);await shot(o,'14','Ở cung của hảo hữu ('+r+')',G4)}
 /* 5 asks */
 const G5='5 · Lời mời / hành động giữa hai người';
 async function waitModal(o,re,ms){const t0=Date.now();while(Date.now()-t0<ms){const t=await modalTitle(o);if(t&&re.test(t))return t;if(t){/* close an unrelated card first */await o.p.evaluate(()=>{const m=document.getElementById('modal');const b=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);(b.find(x=>!x.dataset.kcp)||b[0])&&(b.find(x=>!x.dataset.kcp)||b[0]).click()}).catch(()=>{})}await sleep(400)}return null}
 async function askPair(S1,S2,F,k,id,label){if(F.i<0)return;await clear(S1);await clear(S2);
  const r=await S1.p.evaluate(([i,k])=>{try{used=0;Q.length=0;const v=rivals[i];const t=typeof runAct==='function'?runAct(S,v,k):'';try{log(t)}catch(e){}render();return t}catch(e){return 'ERR '+e.message}},[F.i,k]);log('ask',k,r);
  await sleep(800);await shot(S1,id+'a',label+' — người ngỏ ý: «'+String(r).replace(/<[^>]+>/g,'').slice(0,70)+'»',G5);
  const t=await waitModal(S2,/Hảo hữu tìm đến|ngỏ ý|hảo hữu/i,15000);log('ask modal',t);if(t){await shot(S2,id+'b',label+' — hảo hữu nhận lời mời: '+t.split(' ¦ ')[0],G5);
   await S2.p.evaluate(()=>{const m=document.getElementById('modal');const b=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const y=b.find(x=>/^Nhận/.test(x.textContent.trim()))||b[0];y&&y.click()});
   const t2=await waitModal(S1,/./,10000);if(t2)await shot(S1,id+'c',label+' — kết quả về người ngỏ ý: '+t2.split(' ¦ ')[0],G5);await sleep(1000);const t3=await modalTitle(S2);if(t3)await shot(S2,id+'d',label+' — bên hảo hữu sau khi nhận: '+t3.split(' ¦ ')[0],G5)}}
 await askPair(A,B,FA,'ally','15','Kết giao (ally) chủ phòng → khách');
 await askPair(B,A,FB,'gift','16','Tặng quà (gift) khách → chủ phòng');
 if(FA.i>=0){await clear(A);await clear(B);const r=await A.p.evaluate(i=>{try{used=0;Q.length=0;return String(runAct(S,rivals[i],'rumor'))}catch(e){return 'ERR '+e.message}},FA.i);log('rumor',r);await sleep(800);
   await shot(A,'17a','Tung tin đồn (hại nhỏ) chủ phòng → khách — người ra tay: «'+r.replace(/<[^>]+>/g,'').slice(0,70)+'»',G5);const t=await waitModal(B,/./,12000);if(t)await shot(B,'17b','Tung tin đồn — bên bị hại thấy: '+t.split(' ¦ ')[0],G5)}
 await clear(A);await clear(B);
 /* 6 chat */
 const G6='6 · Thư từ (trò chuyện)';
 for(const [o,msg] of [[A,'Tỷ tỷ, chiều nay sang ngự hoa viên nhé.'],[B,'Muội tới ngay.']]){log('chat',await o.p.evaluate(m=>{try{COOPCHAT.send(m);return COOPCHAT.msgs.length}catch(e){return e.message}},msg));await sleep(1500)}
 for(const o of [A,B]){await shot(o,'18a','Thư từ: nút 信 có tin mới (trên đầu)',G6);await o.p.evaluate(()=>{try{COOPCHAT.openPanel()}catch(e){}});await sleep(800);await shot(o,'18','Thư từ: bảng trò chuyện',G6);await o.p.evaluate(()=>{try{COOPCHAT.closePanel()}catch(e){}})}
 for(const o of [A,B])await o.p.evaluate(()=>{const p=document.querySelector('.kchat-list');const m=p&&p.closest('.modal,[role=dialog]');if(m)m.remove()}).catch(()=>{});
 /* 7 timer / ready / hold */
 const G7='7 · Đồng hồ, Sẵn sàng, Tạm dừng';
 await clear(A);await clear(B);
 for(const o of [A,B])await o.p.evaluate(()=>{try{S.place='home';tab='act';render()}catch(e){}});
 log('A next',await nextOn(A));await sleep(1500);await shot(A,'19','Chủ phòng đã bấm Sẵn sàng: chờ hảo hữu',G7);await shot(B,'19','Khách thấy: hảo hữu đã sẵn sàng',G7);
 log('B next',await nextOn(B));await sleep(2500);await shotModals(A,'20a','7 · Đồng hồ, Sẵn sàng, Tạm dừng',3);await shotModals(B,'20b',G7,3);await shot(A,'20','Sang buổi mới cho cả hai',G7);
 await clear(A);await clear(B);
 await A.p.evaluate(()=>{const f=document.querySelector('[data-ctm="fr"]');f&&f.click()});await sleep(600);await A.p.evaluate(()=>{const b=document.querySelector('[data-ctm="hold"]');b&&b.click()});await sleep(1500);await shot(A,'21','Tạm dừng (người bấm)',G7);await shot(B,'21','Tạm dừng (hảo hữu thấy)',G7);
 await A.p.evaluate(()=>{const b=document.querySelector('[data-ctm="go"]');b&&b.click()});await sleep(1500);
 /* 8 week end */
 const G8='8 · Cuối tuần / đợi hảo hữu';
 for(let k=0;k<6;k++){const wk0=await A.p.evaluate(()=>__co().week);await clear(A);await clear(B);const a=await nextOn(A);await sleep(1200);
   if(k===2||k===3){await shot(A,'22-'+k,'Chủ phòng xong buổi, chờ hảo hữu',G8)}
   await clear(B);const c=await nextOn(B);await sleep(2500);const wk1=await A.p.evaluate(()=>__co().week);log('buoi',k,a,c,wk0,wk1);
   if(wk1!==wk0){await shotModals(A,'23a',G8,3);await shotModals(B,'23b',G8,3);await clear(A);await clear(B);await shot(A,'23','Sang tuần mới (chủ phòng)',G8);await shot(B,'23','Sang tuần mới (khách)',G8);break}}
 await clear(A);await clear(B);
 /* 9 friend leaves */
 const G9='9 · Hảo hữu rời phòng';
 await B.p.close();await sleep(6000);await shot(A,'24','Hảo hữu mất kết nối: chờ hảo hữu trở lại',G9);
 fs.writeFileSync(OUT+'/errs.json',JSON.stringify({A:A.errs.slice(0,30),B:B.errs.slice(0,30),FA,FB},null,1));
 await b.close();log('DONE',LIST.length)})().catch(e=>{console.error('FATAL',e);fs.writeFileSync(OUT+'/list.json',JSON.stringify(LIST,null,1));process.exit(1)});
