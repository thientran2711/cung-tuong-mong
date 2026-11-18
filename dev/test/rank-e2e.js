/* Bảng vinh danh (jrank + Worker logic) end to end, Playwright, one viewport.
   usage: node dev/test/rank-e2e.js <game URL> <rank URL> <W>x<H>@dpr <outdir> [oldBuildURL]
   rank URL = local stand-in (node rank/worker/test/local-server.mjs, fresh) or the real Worker.
   Three fake guests (separate browser contexts = separate devices) end several lives; checks: order of both boards, own rows marked and
   shown at the bottom even outside the top, rename (+ duplicate + obscene refused), a life ended offline is queued and sent once back
   online, an old save (published build, no guest id) loads and gets a guest id, no page errors, no horizontal overflow, no clipped text,
   no "…", no "%", no Han characters. Shots: <outdir>/<n>-<scene>-<W>x<H>_<dpr>.png */
const {chromium}=require('playwright');
const [,,BASE,RURL,SZ,OUT,OLD]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const tag=SZ.replace('@','_');
const fails=[];const ok=(c,m)=>{console.log((c?'ok   ':'FAIL ')+m);if(!c)fails.push(m)};
(async()=>{const b=await chromium.launch();const errs=[];process.on('unhandledRejection',e=>{console.log('ABORT',String(e.stack).split('\n').slice(0,6).join(' | '),'errors:',JSON.stringify(errs.slice(0,6)));process.exit(2)});
 const mk=async(name,fresh)=>{const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
  await ctx.addInitScript(u=>{window.RANK_URL=u},RURL);await ctx.addInitScript(()=>{/* main's end-of-life cinematic (Hồng nhan bạc mệnh · Tiếp theo) must not cover the board under test */setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click());[...document.querySelectorAll('body > div button, #ov button')].filter(b=>b.textContent.trim()==='Tiếp theo'&&b.offsetParent).forEach(b=>b.click())},400)});await ctx.addInitScript(()=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='#kload{display:none!important}.kcf{display:none!important}';document.head.appendChild(s)})});const p=await ctx.newPage();p.setDefaultTimeout(150000);
  p.on('pageerror',e=>errs.push(name+': '+e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|ERR_INTERNET_DISCONNECTED|net::/.test(m.text()))errs.push(name+' console: '+m.text())});
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  for(let i=0;i<120;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return 'skip'}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':(window.KLOAD?'':'ok')});if(s==='ok')break;await p.waitForTimeout(500)}/* first-run download card (jload) skipped */
  if(!fresh)await p.evaluate(()=>rkIdSet({rcSeen:1}));/* recovery card is tested on its own (guest R) */
  return{ctx,p}};
 const newLife=async p=>{await p.evaluate(()=>{window.__prevS=S;SLOT=1;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}Q.length=0;start()});
  await p.waitForFunction(()=>(typeof NLP!=='undefined'&&NLP)||(S&&S!==window.__prevS&&!S.dead&&S.rkSeed));
  await p.evaluate(()=>{if(typeof NLP!=='undefined'&&NLP)nlAccept(false);Q.length=0;$('modal').hidden=true;render()});
  for(let i=0;i<30;i++){await p.waitForTimeout(300);await p.evaluate(()=>{const k=document.querySelector('#kroul .krskip');if(k)k.click()});if(i>=5&&await p.evaluate(()=>!document.getElementById('kroul')&&!document.getElementById('kroulw')))break}
  await p.evaluate(()=>{Q.length=0;$('modal').hidden=true});ok(await p.evaluate(()=>!document.getElementById('kroul')&&S&&!S.dead),'new life started')};
 /* o: {rank, years, sons, danh, duc, end:"die"|"thaihau"} — the life is played by setting the state, then the real ending runs */
 const endLife=async(p,o)=>{await p.evaluate(o=>{if(S.srv)S.srv.risen=1;for(let r=S.rank;r<=o.rank;r++){S.rank=r;rkTrack()}S.maxRank=o.rank;
   for(let y=1;y<o.years;y++){S.year++;S.age++;rkTrack()}S.danh=o.danh||0;S.duc=o.duc||0;
   for(let i=0;i<(o.sons||0);i++){S.kids.push({name:'Hoàng tử '+['Vĩnh An','Vĩnh Khang','Vĩnh Thọ'][i],sex:'m',age:3,hp:90,fond:50,born:0,alive:true});rkTrack()}
   if(o.end==='thaihau'){S.heir={k:S.kids[S.kids.length-1]};S.succ={on:true};emperorDies('')}else over('Hồng nhan bạc mệnh','Bệnh nặng không qua khỏi.','Bệnh mà chết')},o);
  await p.waitForSelector('.krk-end');};
 const endRank=p=>p.waitForFunction(()=>{const e=document.querySelector('.krk-end');return e&&/đứng hạng/.test(e.textContent)?e.textContent:null},null,{timeout:240000}).then(h=>h.jsonValue());
 const layout=async(p,scene)=>p.evaluate(scene=>{const vw=innerWidth,vh=innerHeight,bad=[];const root=document.querySelector('#krkov')||document.querySelector('#modal');
  if(document.documentElement.scrollWidth>vw+1)bad.push('page overflow-x '+document.documentElement.scrollWidth);
  root.querySelectorAll('*').forEach(e=>{if(e.closest('[aria-hidden="true"]'))return;const q=e.getBoundingClientRect();if(!q.width||!q.height)return;const cs=getComputedStyle(e);if(cs.visibility==='hidden')return;
   if(q.right>vw+1||q.left<-1)bad.push('out-x:'+e.className+':'+(e.textContent||'').slice(0,24));
   if(e.children.length===0&&e.textContent.trim()&&e.scrollWidth>e.clientWidth+1&&cs.overflow!=='visible'&&cs.display!=='inline')bad.push('clip:'+e.className+':'+e.textContent.slice(0,24))});
  const tx=root.innerText;if(/…/.test(tx))bad.push('ellipsis');if(/%/.test(tx))bad.push('percent');if(/[㐀-鿿]/.test(tx))bad.push('han');
  return{scene,bad:bad.slice(0,8)}},scene);
 const shot=async(p,n,scene)=>{await p.waitForTimeout(400);await p.evaluate(()=>{const r=document.querySelector('.kpod.krk');if(r)r.classList.add('kpod-skip')});await p.waitForTimeout(150);await p.screenshot({path:`${OUT}/${n}-${scene}-${tag}.png`})};
 const board=p=>p.evaluate(()=>{const R=[...document.querySelectorAll('#krkov .krlist .krl-row:not(.krl-hd)')].map(r=>({rk:+r.querySelector('.krl-rk').textContent,s:+r.querySelector('.krl-s b').textContent,pn:r.querySelector('.krl-pn').textContent.replace(/\s*(Ngươi|Ta)$/,''),mine:r.classList.contains('krl-mine')}));
  const me=document.querySelector('#krkov .krl-me');return{rows:R,me:me&&me.textContent,meRow:!!(me&&me.querySelector('.krl-row')),pod:[...document.querySelectorAll('#krkov .kpod-col')].map(c=>c.className.match(/kpod-p\d/)[0]+':'+c.querySelector('.kname').textContent),
   figs:[...document.querySelectorAll('#krkov .kpod-img')].map(i=>i.complete&&i.naturalWidth>0&&!/unknown-fig/.test(i.currentSrc)),/* review r1: the life's own painted figure (not the unknown silhouette) */faces:[...document.querySelectorAll('#krkov .krlist .krl-row:not(.krl-hd) .krl-fc img')].filter(i=>i.complete&&i.naturalWidth>0).length,tab:(document.querySelector('#krkov .ksubb.on')||{}).textContent}});
 const openBoard=async(p,tab)=>{await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove()});/* first-run download card is not under test */await p.evaluate(t=>rkOpen(t),tab||'lives');await p.waitForFunction(()=>document.querySelector('#krkov .krk-list')||/Chưa có/.test((document.querySelector('#krkov .krk-body')||{}).textContent||''));await p.waitForTimeout(600)};
 const sorted=rows=>rows.every((r,i)=>!i||rows[i-1].s>=r.s)&&rows.every((r,i)=>r.rk===i+1);

 if(process.env.PART!=='old'){
 /* guest A: two lives (Hoàng hậu 5 năm; Quý nhân 2 năm) */
 const A=await mk('A');const idA=await A.p.evaluate(()=>rkIdGet());ok(/^[a-z0-9]{24}$/.test(idA.gid),'first open makes a guest id');
 await A.p.waitForFunction(()=>rkIdGet().pn,null,{timeout:15000}).catch(()=>{});const nA=await A.p.evaluate(()=>rkIdGet().pn);ok(/^Khách vô danh #\d{4,5}$/.test(nA||''),'guest is remembered by the server: '+nA);
 await A.p.evaluate(()=>showTitle());await A.p.waitForTimeout(600);ok(await A.p.locator('#modal.kptitle .kpmenu [data-krk-open]').count()===1,'title screen has the Bảng vàng button');
 await shot(A.p,1,'title');
 await newLife(A.p);ok(await A.p.evaluate(()=>S.rkGid===rkIdGet().gid&&!!S.rkSeed),'guest id and roll seed written into the save');
 await endLife(A.p,{rank:7,years:5,danh:60,duc:50});const e1=await endRank(A.p);ok(/hạng 1 trên 1/.test(e1),'end card: '+e1);
 await shot(A.p,2,'endcard');
 /* owner 15/11: end card = kit person dialog; figure fills the column, name + rank above it, kit rows (no boxed .pcb panels), "Xem Bảng vàng" */
 await A.p.waitForFunction(()=>{const i=document.querySelector('#modal .kesimg');return i&&i.complete&&i.naturalWidth>0&&getComputedStyle(i.closest('.kesf')).visibility!=='hidden'},null,{timeout:30000}).catch(()=>{});await A.p.waitForTimeout(400);/* figure is a CDN picture: measure after it has loaded */
 const ec=await A.p.evaluate(()=>{const d=document.querySelector('#modal .dlg');const col=d.querySelector('.kpsubj.kes'),im=d.querySelector('.kes .kesimg'),cap=d.querySelector('.kes .kpsn');const c=col?col.getBoundingClientRect():{height:1},r=im?im.getBoundingClientRect():{bottom:0,top:0},q=cap?cap.getBoundingClientRect():null;
  return{fill:(r.bottom-(q?q.top:r.top))/c.height,above:!!q&&q.bottom<=r.top+40,boxes:d.querySelectorAll('#mb .pcb').length,kit:d.querySelectorAll('.krk-end .kpst, .kend-life .kpst').length,btn:(d.querySelector('.krk-eb')||{}).textContent,ngu:/Ngươi/.test(d.innerText)}});
 /* main's kit-size v3 frame owns the figure column (KIT 84); here only: kit rows + the Xem Bảng vàng button */ok(ec.kit>=1&&ec.btn==='Xem Bảng vàng'&&!ec.ngu,'end card: kit rows, Xem Bảng vàng '+JSON.stringify(ec));ok((await layout(A.p,'endcard')).bad.length===0,'end card layout '+JSON.stringify((await layout(A.p,'endcard')).bad));
 await A.p.evaluate(()=>{Q.length=0;$('modal').hidden=true});await A.p.waitForTimeout(1200);
 await newLife(A.p);await endLife(A.p,{rank:2,years:2,danh:20,duc:20});ok(/hạng 2 trên 2/.test(await endRank(A.p)),'second life of A = its own row, rank 2');
 /* guest B: Hoàng thái hậu */
 const B=await mk('B');await newLife(B.p);await endLife(B.p,{rank:7,years:9,sons:2,danh:80,duc:70,end:'thaihau'});ok(/hạng 1 trên 3/.test(await endRank(B.p)),'Hoàng thái hậu takes rank 1');
 /* guest C: a short life, then rename */
 const C=await mk('C');await newLife(C.p);await endLife(C.p,{rank:0,years:1});ok(/hạng 4 trên 4/.test(await endRank(C.p)),'short life is last');
 await C.p.evaluate(()=>document.querySelector('.krk-end .kbtn').click());await C.p.waitForSelector('#krkov .krk-list');await C.p.waitForTimeout(800);
 await C.p.waitForFunction(()=>{const f=[...document.querySelectorAll('#krkov .kpod-fig img, #krkov .kpod-col img')];return !f.length||f.every(i=>i.complete)},null,{timeout:30000}).catch(()=>{});await C.p.waitForTimeout(600);
 let bd=await board(C.p);ok(bd.rows.length===4&&sorted(bd.rows),'Kiếp board: 4 rows in order '+bd.rows.map(r=>r.s).join(' > '));
 ok(bd.rows[3].mine&&bd.rows.filter(r=>r.mine).length===1,'C: own life marked');ok(bd.meRow&&/Kiếp vừa rồi/.test(bd.me),'C: own row at the bottom');
 ok(bd.pod.length===3&&bd.pod[1].startsWith('kpod-p1')&&bd.figs.every(Boolean),'podium: three places, Nhất centre, own figures loaded '+bd.pod.join(' | ')+' '+JSON.stringify(bd.figs));ok(bd.faces>=bd.rows.length,'list: every row shows its painted face '+bd.faces+'/'+bd.rows.length);
 await shot(C.p,3,'board-lives');
 /* owner 15/11: ONE title "Bảng vàng" + kit ✕ (no seal, no Lui); podium = figures big, plaque is the step, medal at the plaque's top-right; row frame = highest phẩm */
 const ui=await C.p.evaluate(()=>{const r=document.querySelector('#krkov .kpod.krk');const st=r.querySelector('.krk-stage').getBoundingClientRect();
  const cols=[...r.querySelectorAll('.krk-stage .kpod-col')].map(c=>{const f=c.querySelector('.kpod-fig').getBoundingClientRect(),pl=c.querySelector('.kpod-step').getBoundingClientRect(),m=c.querySelector('.kpod-medal').getBoundingClientRect();
   return{fig:f.height/st.height,plq:pl.height/st.height,corner:m.right>=pl.right-4&&m.top<pl.top&&m.bottom>pl.top}});
  const fr=[...r.querySelectorAll('.krlist .krl-row:not(.krl-hd)')].map(x=>{const ph=x.querySelector('.krl-c1').textContent,h=x.querySelector('.krl-fc').innerHTML;const R=CTM_RANK.RULES;const i=R.consortN.indexOf(ph);
   return i>=0?h.includes('frame-consort-'+i):/frame-(maid|mama)-/.test(h)});
  return{title:r.querySelector('.kpod-hd').innerText.split('\n')[0],seal:!!r.querySelector('.kpod-hd .kpseal'),x:!!r.querySelector('.kpod-hd .kit-x'),lui:[...r.querySelectorAll('button')].some(b=>/^\s*Lui\s*$/.test(b.textContent)),cols,fr}});
 ok(ui.title==='Bảng vàng'&&!ui.seal&&ui.x&&!ui.lui,'one title Bảng vàng, kit ✕, no Lui '+JSON.stringify([ui.title,ui.seal,ui.x,ui.lui]));
 ok(ui.cols.length===3&&ui.cols.every(c=>c.fig>0),'podium: three columns with a figure (the 26.1 name-plaque restyle of r2 is NOT on main: dais podium stays, KIT 26) '+JSON.stringify(ui.cols));
 ok(ui.fr.length&&ui.fr.every(Boolean),'list: frame by highest phẩm on every row '+JSON.stringify(ui.fr));
 await C.p.locator('#krkov [data-krk="rules"]').click();await C.p.waitForTimeout(500);
 const ru=await C.p.evaluate(()=>{const c=document.querySelector('#modal:not([hidden]) .dlg.kpanel[data-kind="rule"]');return c?{t:c.innerText,x:!!c.querySelector('.kit-x'),kit:!!c.querySelector('.kph')&&!document.querySelector('.krk-pop,.krk-card')}:null});
 ok(ru&&ru.x&&ru.kit&&/Ví dụ một kiếp|Kiếp vừa rồi của ta/i.test(ru.t)&&/Hoàng hậu/i.test(ru.t)&&/2200/.test(ru.t),'Cách tính: kit card with the points table and a worked life');
 await shot(C.p,'3b','rules');await C.p.locator('#modal .dlg.kpanel .kit-x').click();await C.p.waitForTimeout(300);
 ok(await C.p.evaluate(()=>!document.querySelector('#modal.krkp:not([hidden])')),'Cách tính closes with its ✕');ok((await layout(C.p,'board')).bad.length===0,'board layout '+JSON.stringify((await layout(C.p,'board')).bad));
 await C.p.evaluate(()=>{document.querySelector('#krkov .krk-body').scrollTop=1e6});await shot(C.p,4,'board-lives-list');
 await C.p.locator('#krkov [data-krt="players"]').click();await C.p.waitForFunction(()=>{const d=RK.data.players;return d&&document.querySelector('#krkov .krk-list')});await C.p.waitForTimeout(600);
 bd=await board(C.p);ok(bd.rows.length===3&&sorted(bd.rows)&&bd.tab==='Người chơi','Người chơi board: one row per player '+bd.rows.map(r=>r.pn+' '+r.s).join(', '));
 ok(bd.rows[0].pn===(await B.p.evaluate(()=>rkIdGet().pn))&&bd.rows[1].pn===nA,'players ordered by best life (B, A, C)');
 const pA=await C.p.evaluate(()=>RK.data.players.rows[1]);ok(pA.k===2&&pA.t>pA.s,'A: 2 lives, total over best');
 await shot(C.p,5,'board-players');ok((await layout(C.p,'players')).bad.length===0,'players layout '+JSON.stringify((await layout(C.p,'players')).bad));
 /* rename */
 await C.p.locator('#krkov [data-krk="name"]').click();await C.p.fill('#krk-in','Đồ đụ');await C.p.locator('#modal [data-krk="save"]').click();
 await C.p.waitForFunction(()=>/không nhã/.test((document.querySelector('#krk-msg')||{}).textContent||''));ok(true,'obscene name refused');
 await B.p.evaluate(async()=>{const r=await rkReq('POST','/name',{gid:rkIdGet().gid,name:'Hoa Phi'});rkIdSet({pn:r.j.me.pn})});await C.p.fill('#krk-in','hoa phi');await C.p.locator('#modal [data-krk="save"]').click();await C.p.waitForFunction(()=>/đã có người/.test((document.querySelector('#krk-msg')||{}).textContent||''));ok(true,'duplicate name refused');
 await shot(C.p,6,'rename');ok((await layout(C.p,'rename')).bad.length===0,'rename layout');
 await C.p.fill('#krk-in','Lan Quý nhân');await C.p.locator('#modal [data-krk="save"]').click();await C.p.waitForFunction(()=>rkIdGet().pn==='Lan Quý nhân'&&document.querySelector('#krkov .krk-list')&&!document.querySelector('#modal.krkp:not([hidden])'));await C.p.waitForTimeout(600);
 bd=await board(C.p);ok(bd.rows.some(r=>r.pn==='Lan Quý nhân'&&r.mine),'renamed: shown on the board');
 /* offline: a life ends without network, is queued, then sent */
 await C.p.evaluate(()=>rkClose());await C.p.waitForTimeout(1200);await C.ctx.setOffline(true);
 await newLife(C.p);await endLife(C.p,{rank:4,years:3,danh:40,duc:40});await C.p.waitForTimeout(1500);
 const off=await C.p.evaluate(()=>({q:rkQ().length,t:document.querySelector('.krk-end').textContent}));ok(off.q===1&&/Mạng đứt/.test(off.t),'offline: life queued, end card says so');
 await shot(C.p,7,'endcard-offline');
 await C.p.evaluate(()=>rkOpen('lives'));await C.p.waitForTimeout(1500);const ob=await C.p.evaluate(()=>document.querySelector('#krkov').innerText);ok(/Mạng đứt/.test(ob)&&/chờ gửi/.test(ob),'offline board: last board + waiting note');
 await shot(C.p,8,'board-offline');await C.p.evaluate(()=>rkClose());
 await C.ctx.setOffline(false);await C.p.evaluate(()=>dispatchEvent(new Event('online')));
 const sent=await C.p.waitForFunction(()=>!rkQ().length&&/đứng hạng/.test(document.querySelector('.krk-end').textContent)?document.querySelector('.krk-end').textContent:null,null,{timeout:240000}).then(h=>h.jsonValue()).catch(()=>null);
 ok(!!sent&&/hạng 3 trên 5/.test(sent),'back online: sent, '+sent);
 /* A sees C's new best life above A's second life; A's own rows marked */
 await openBoard(A.p,'lives');bd=await board(A.p);ok(bd.rows.length===5&&sorted(bd.rows)&&bd.rows.filter(r=>r.mine).length===2,'A: 5 lives, own two marked');
 /* own row shown when outside the top (n=2 board) */
 const outside=await C.p.evaluate(async u=>{const r=await fetch(u+'/top/lives?n=1&gid='+rkIdGet().gid).then(r=>r.json());return r.rows.length===1&&r.mine&&r.mine.r>1},RURL);ok(outside,'own best life returned even outside the top');
 /* co-op (review kit-ico-rank-r2, owner OD:L94 rebirth at once): the co-op end card has the score / place rows but NO "Xem Bảng vàng" in front of
    "Chuyển kiếp"; nothing of the board opens over it; the life goes up as mode "coop" (COOPW.on, not j25's CW helper) */
 await A.p.evaluate(()=>rkClose());await newLife(A.p);await A.p.evaluate(()=>{window.COOPW.on=true});await endLife(A.p,{rank:1,years:1});
 const co=await A.p.evaluate(()=>{const m=document.querySelector('#modal:not([hidden])');const bs=m?[...m.querySelectorAll('button')].filter(b=>b.offsetParent!==null).map(b=>b.textContent.trim()):[];
   const lid=(document.querySelector('.krk-end')||{dataset:{}}).dataset.lid;return{rows:!!(m&&m.querySelector('.krk-end .kpst')),eb:!!document.querySelector('.krk-eb'),bs,ov:!!document.getElementById('krkov'),krkp:!!document.querySelector('#modal.krkp:not([hidden])'),mode:(RK.ends[lid]||{}).mode}});
 ok(co.rows&&!co.eb&&!co.ov&&!co.krkp&&co.bs.includes('Chuyển kiếp')&&!co.bs.some(x=>/Bảng vàng/.test(x))&&co.mode==='coop','co-op end card: rows kept, no Xem Bảng vàng, nothing over it, mode coop '+JSON.stringify(co));
 await A.p.evaluate(()=>{const b=[...document.querySelectorAll('#modal:not([hidden]) button')].find(x=>x.textContent.trim()==='Chuyển kiếp');if(b)b.click()});
 await A.p.waitForFunction(()=>(typeof NLP!=='undefined'&&NLP)||(S&&!S.dead)||!document.getElementById('title').hidden,null,{timeout:20000}).then(()=>ok(true,'co-op: Chuyển kiếp goes on to the next life'),()=>ok(false,'co-op: Chuyển kiếp goes on to the next life'));
 await A.p.evaluate(()=>{window.COOPW.on=false;Q.length=0;$('modal').hidden=true});
 /* recovery code (owner Q20): first open shows it once, copyable; a second device restores the same guest with it */
 const R1=await mk('R1',true);const gA=await A.p.evaluate(()=>rkIdGet());await R1.p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove()});
 await R1.p.evaluate(()=>rkOpen('lives'));await R1.p.waitForSelector('#modal #krk-code');
 const c1=await R1.p.evaluate(()=>({code:document.getElementById('krk-code').value,ro:document.getElementById('krk-code').readOnly,seen:!!document.querySelector('[data-krk="seen"]'),gid:rkIdGet().gid}));
 ok(/^([A-Z0-9]{4}-){5}[A-Z0-9]{4}$/.test(c1.code)&&c1.code.replace(/-/g,'').toLowerCase()===c1.gid&&c1.ro&&c1.seen,'first open shows the recovery code once (readonly, copyable): '+c1.code);
 await shot(R1.p,8,'recovery');ok((await layout(R1.p,'recovery')).bad.length===0,'recovery layout');
 await R1.ctx.grantPermissions(['clipboard-read','clipboard-write']).catch(()=>{});await R1.p.click('[data-krk="copy"]');await R1.p.waitForTimeout(300);
 ok(await R1.p.evaluate(()=>/Đã chép|Chọn mã/.test(document.querySelector('[data-krk="copy"]').textContent)),'copy button answers');
 await R1.p.fill('#krk-rin','abcd-efgh');await R1.p.click('[data-krk="restore"]');await R1.p.waitForTimeout(300);ok(await R1.p.evaluate(()=>/chưa đúng/.test(document.querySelector('#krk-msg').textContent)),'short code refused');
 await R1.p.fill('#krk-rin','zzzz-zzzz-zzzz-zzzz-zzzz-zzzz');await R1.p.click('[data-krk="restore"]');await R1.p.waitForFunction(()=>/Không tìm thấy/.test((document.querySelector('#krk-msg')||{}).textContent||''),null,{timeout:15000});ok(true,'unknown code: not found');
 await R1.p.click('[data-krk="seen"]');await R1.p.waitForFunction(()=>document.querySelector('#krkov .krk-list')||/Chưa có/.test((document.querySelector('#krkov .krk-body')||{}).textContent||''));
 ok(await R1.p.evaluate(()=>rkIdGet().rcSeen===1),'after "Ta đã ghi lại" the card does not open by itself');
 await R1.p.evaluate(()=>rkClose());await R1.p.evaluate(()=>rkOpen('lives'));await R1.p.waitForTimeout(500);ok(await R1.p.evaluate(()=>!document.querySelector('#krk-code')),'second open goes to the board');
 await R1.p.click('#krkov [data-krk="code"]');await R1.p.waitForSelector('#modal #krk-code');ok(await R1.p.evaluate(()=>!document.querySelector('[data-krk="seen"]')&&/Mã của ta/.test(document.querySelector('#modal .dlg').textContent)),'code can be read again from the board button');
 await R1.p.fill('#krk-rin',gA.gid.toUpperCase().replace(/(.{4})(?=.)/g,'$1-'));await R1.p.click('[data-krk="restore"]');
 await R1.p.waitForFunction(g=>rkIdGet().gid===g,gA.gid,{timeout:15000});await R1.p.waitForFunction(()=>document.querySelector('#krkov .krk-list'),null,{timeout:15000});
 const rs=await R1.p.evaluate(()=>({pn:rkIdGet().pn,mine:[...document.querySelectorAll('#krkov .krl-row')].some(r=>r.classList.contains('krl-mine')||/^Ta$/.test(((r.querySelector('.kchip')||{}).textContent||'').trim()))}));
 ok(rs.pn===gA.pn&&rs.mine,'restored with the code: same guest on a new device ('+rs.pn+')');await shot(R1.p,9,'restored');ok((await layout(R1.p,'restored')).bad.length===0,'restored layout');await R1.ctx.close()
 }
 /* old save from the published build (no guest id, no S.rk) */
 if(OLD){const O=await b.newContext({viewport:{width:W,height:H}});const op=await O.newPage();await op.goto(OLD,{waitUntil:'domcontentloaded'});await op.waitForTimeout(3000);
  const sv=await op.evaluate(()=>{SLOT=2;document.getElementById('title').hidden=true;start();if(typeof nlAccept==='function'&&typeof NLP!=='undefined'&&NLP)nlAccept(false);Q.length=0;save();return localStorage.getItem(SK(2))});await O.close();
  const N=await mk('old');await N.p.evaluate(s=>{localStorage.clear();localStorage.setItem(SK(2),s)},sv);await N.p.reload({waitUntil:'domcontentloaded'});await N.p.waitForTimeout(2500);
  const st=await N.p.evaluate(()=>{SLOT=2;const d=loadSlot(2);if(!d)return{none:1};$('slots').querySelector('[data-load="2"]').click();return{had:!!d.S.rkGid}});await N.p.waitForTimeout(1500);
  const ld=await N.p.evaluate(()=>({name:S&&S.name,gid:rkIdGet().gid,rk:!!S.rk}));ok(!st.had&&ld.name&&/^[a-z0-9]{24}$/.test(ld.gid)&&ld.rk,'old save loads, guest id made, life tracking baseline');
  await N.p.evaluate(()=>{Q.length=0;$('modal').hidden=true});await endLife(N.p,{rank:3,years:2});ok(/đứng hạng/.test(await endRank(N.p)),'old save life ends and is ranked');await N.ctx.close()}
 ok(errs.length===0,'no page errors '+JSON.stringify(errs.slice(0,5)));
 console.log(fails.length?`${fails.length} FAILED`:'ALL OK');await b.close();process.exit(fails.length?1:0)})();
