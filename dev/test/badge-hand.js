/* badge-hand.js (KIT-STAGE-R12, owner OD 27/11 ~07:12Z: a cut odds badge is not allowed): the REAL event hand (Bàn bài) on Fold 755x1000 + iPad 1180x820.
   Fires real event hands (rg c1b + every rg event that deals a hand with odds), and on EVERY small hand card and on the enlarged card measures the kit odds badge .kodb:
   word element scrollWidth <= clientWidth, the word is one whole ladder word (no «…»), badge box inside its picture box, badge box inside the card box, and the word not clipped by any ancestor (overflow) box.
   usage: node dev/test/badge-hand.js <index.html> [outdir for shots]   FIG=1 adds a 46 px portrait row to every enlarged card (the late-loading figure case)   exit 1 on FAIL */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const [,,SRC,OUT]=process.argv;if(OUT)fs.mkdirSync(OUT,{recursive:true});

/* KIT-STAGE-R13: the ENLARGED card body (owner OD 27/11 ~07:12Z + MAIN 175 LOOK R12 FAIL): every row (Tốn / Thành / Bại / Cần …) shows WHOLE inside the card box — no ancestor clips it, no row below the box, no orphan stat mark («+» alone on a line). Returns null when no big card is open. */
const BIGM=()=>{const z=document.querySelector('#modal .khplate:not([hidden])');if(!z)return null;const bc=z.querySelector('.khbc'),bi=z.querySelector('.khbi');if(!bc||!bi)return null;const R=e=>e.getBoundingClientRect(),cr=R(bc),ir=R(bi),pr=R(z.querySelector('.khbp')||bc);
 const rows=[...bi.querySelectorAll('.kb>.kr')].map(r=>({cls:(r.className||'').replace(/\s+/g,' '),lab:((r.querySelector('.krl')||{}).textContent||'').trim()}));
 const bad=[];const leaf=[...bi.querySelectorAll('.krl,.krv,.krv .ef,.kwhy,.kat,.kbi *')].filter(e=>e.getClientRects().length&&!e.children.length&&(e.textContent||'').trim());
 leaf.forEach(e=>{const r=R(e);if(r.bottom>cr.bottom-4+0.5||r.top<cr.top-0.5||r.right>cr.right+0.5||r.left<cr.left-0.5)bad.push('out:'+e.textContent.trim().slice(0,24));if(r.bottom>ir.bottom+0.5||r.top<ir.top-0.5)bad.push('clipInfo:'+e.textContent.trim().slice(0,24))});
 if(bi.scrollHeight>bi.clientHeight+1)bad.push('infoScroll '+bi.scrollHeight+'>'+bi.clientHeight);
 /* orphan mark: a line of any text node that is only + - − – --  */
 const orph=[];const tw=document.createTreeWalker(bi,NodeFilter.SHOW_TEXT);let n;while(n=tw.nextNode()){const t=n.textContent;if(!t.trim()||!n.parentElement.getClientRects().length)continue;const rg=document.createRange();const lines=[];let cur='',top=null;for(let i=0;i<t.length;i++){rg.setStart(n,i);rg.setEnd(n,i+1);const q=rg.getClientRects()[0];if(!q)continue;if(top!==null&&Math.abs(q.top-top)>4){lines.push(cur);cur=''}top=q.top;cur+=t[i]}lines.push(cur);lines.forEach(l=>{if(/^[\s+\-−–·,]*[+\-−–]+[\s·,]*$/.test(l)&&l.trim())orph.push(l.trim())})}
 /* also an inline chip whose whole text is only marks on its own flex/grid line */
 bi.querySelectorAll('.krv .ef').forEach(e=>{if(/^[+\-−–]+$/.test((e.textContent||'').trim())&&e.getClientRects().length){const p=e.previousElementSibling,q=e.nextElementSibling;const a=R(e);if((!p||Math.abs(R(p).top-a.top)>4)&&(!q||Math.abs(R(q).top-a.top)>4)&&e.parentElement.children.length>1)orph.push('chip '+e.textContent.trim())}});
 const dump=orph.length?[...bi.querySelectorAll('.kb .krv')].map(e=>e.innerHTML).join(' || '):'';
 return {rows,bad,orph,dump,card:[Math.round(cr.width),Math.round(cr.height)],pic:[Math.round(pr.width),Math.round(pr.height)],info:[bi.scrollHeight,bi.clientHeight],fs:getComputedStyle(bc).fontSize,wide:z.classList.contains('khwide')}};
const LAD=['Mong manh','Hiểm','Khó lường','Tùy duyên','Có cơ','Vững','Rất vững'];
(async()=>{const b=await chromium.launch();const html=fs.readFileSync(path.resolve(SRC||'index.html'));let bad=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)bad++};
for(const [dn,W,H] of [['fold',755,1000],['ipad',1180,820]].filter(x=>!process.env.DEV||x[0]===process.env.DEV)){const touch=W<1100;
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:touch,isMobile:touch,serviceWorkers:'block'});
 await ctx.addInitScript(()=>{window.__bot=1;let s=777;Math.random=()=>{s=(s*1664525+1013904223)%4294967296;return s/4294967296}});
 await ctx.route('http://ctm.test/**',r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>{if(!/Unexpected token '<'/.test(String(e)))errs.push(String(e).slice(0,160))});
 await p.route(/\.(mp3|ogg|m4a|mp4|webm|wav)(\?|$)/,r=>r.abort());
 await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof rgFire==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{if(typeof kitRoulette==='function'){kitRoulette=function(o){try{o&&o.done&&o.done()}catch(e){}}}try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;render()});
 await p.addStyleTag({content:'#dawn,.kroul,.kmbox,.kne,[class*=kmrew],#kxcatch,.kmov,#kroulw,#kdaytc,#klife,#kload{display:none!important}'});
 for(let i=0;i<6;i++){await p.waitForTimeout(600);await p.evaluate(()=>{if(Q.length){Q.length=0;document.getElementById('modal').hidden=true;render()}})}
 const ids=await p.evaluate(()=>{try{return Object.keys(RG||{})}catch(e){return []}});
 const meas=()=>p.evaluate(LAD=>{const out=[];const vis=e=>e.getClientRects().length;const R=e=>e.getBoundingClientRect();
  const clipped=(w)=>{const r=R(w);for(let a=w.parentElement;a&&a!==document.body;a=a.parentElement){const cs=getComputedStyle(a);if(/hidden|clip|auto|scroll/.test(cs.overflowX+cs.overflow)){const q=R(a);if(r.left<q.left-0.5||r.right>q.right+0.5||r.top<q.top-0.5||r.bottom>q.bottom+0.5)return a.className||a.tagName}}return ''};
  document.querySelectorAll('#modal .khand button.ka, #modal .khbig, #modal .khbp').forEach(c=>{});
  document.querySelectorAll('#modal .kodb').forEach(bd=>{if(!vis(bd))return;const w=bd.querySelector('.kodm b')||bd.querySelector('b');const pic=bd.parentElement;const card=bd.closest('button.ka')||bd.closest('.khbig')||pic.parentElement;const br=R(bd),pr=R(pic),cr=R(card),wr=w?R(w):br;
   out.push({kind:pic.classList.contains('khbp')?'big':'small',word:w?w.textContent.trim():'',sw:w?w.scrollWidth:0,cw:w?w.clientWidth:0,to:w?getComputedStyle(w).textOverflow:'',inPic:br.left>=pr.left-1&&br.right<=pr.right+1&&br.top>=pr.top-1,inCard:br.left>=cr.left-1&&br.right<=cr.right+1,air:Math.round(Math.min(wr.left-br.left,br.right-wr.right)),clip:w?clipped(w):'',cardW:Math.round(cr.width),picW:Math.round(pr.width),bdW:Math.round(br.width),wW:w?Math.round(R(w).width):0})});return out},LAD);
 let all=[],hands=0;const bigs=[];const want=['c1b',...ids.filter(x=>x!=='c1b')];
 for(const id of want){if(hands>=6)break;const f=await p.evaluate(id=>{for(let k=0;k<3;k++){Q.length=0;document.getElementById('modal').hidden=true;try{S.evc=null;EVCW.length=0}catch(e){}let r=false;try{r=rgFire(id)}catch(e){}if(r){Q.length=1;showModal();return true}}return false},id);if(!f)continue;
  await p.waitForTimeout(2600);const has=await p.evaluate(()=>!!document.querySelector('#modal .opts.khand .kodb'));if(!has)continue;hands++;
  const m1=await meas();m1.forEach(x=>x.ev=id);all=all.concat(m1);if(OUT)await p.screenshot({path:path.join(OUT,`${dn}-${id}-hand.png`)});
  /* enlarge every card with a badge, one by one */
  const n=await p.evaluate(()=>[...document.querySelectorAll('#modal .opts.khand>button.kopt')].length);
  for(let i=0;i<n;i++){const r=await p.evaluate(i=>{const e=[...document.querySelectorAll('#modal .opts.khand>button.kopt')][i];if(!e)return null;const q=e.getBoundingClientRect();return {x:q.left+q.width/2,y:q.top+Math.min(q.height/2,40),lab:[...e.querySelectorAll('.kb .krl')].map(x=>x.textContent.trim()),w:((e.querySelector('.kodb .kodm b')||{}).textContent||'').trim()}},i);if(!r)continue;
   if(touch)await p.touchscreen.tap(r.x,r.y);else await p.mouse.click(r.x,r.y);await p.waitForTimeout(1300);if(process.env.FIG){await p.evaluate(()=>{const k=document.querySelector('#modal .khbi .kabody');if(k){const d=document.createElement('span');d.className='klead';d.style.cssText='display:block;height:46px;background:#ccc';d.textContent='fig';k.insertBefore(d,k.firstChild)}});await p.waitForTimeout(900)} const bm=await p.evaluate(BIGM);if(bm){bm.ev=id+'#'+i;bm.sl=r.lab;bm.sw=r.w;bm.real=1;bm.bw=await p.evaluate(()=>((document.querySelector('#modal .khbp .kodm b')||{}).textContent||'').trim());bigs.push(bm)}const m2=(await meas()).filter(x=>x.kind==='big');m2.forEach(x=>x.ev=id+'#'+i);all=all.concat(m2);
   if(OUT&&i<2)await p.screenshot({path:path.join(OUT,`${dn}-${id}-lift${i}.png`)});
   await p.evaluate(()=>{const x=document.querySelector('#modal .dlg>.khconf>.khno');if(x)x.click()});await p.waitForTimeout(900)}}
 /* every hand size 2..5 (the real deal + kitHandLay), every card picture carries each of the 7 ladder words in turn (kitOddsBadgeOn = the same opt-in part) */
 const sizes={};for(const N of [2,3,4,5]){const f=await p.evaluate(N=>{for(let k=0;k<3;k++){Q.length=0;document.getElementById('modal').hidden=true;try{S.evc=null;EVCW.length=0}catch(e){}if(rgFire('c1b')){const o=Q[0].opts.slice();const a=[];for(let i=0;i<N;i++)a.push(Object.assign({},o[i%o.length]));Q[0].opts=a;Q.length=1;showModal();return true}}return false},N);if(!f)continue;
  await p.waitForTimeout(2600);const r=await p.evaluate(LAD=>{const res=[];const cards=[...document.querySelectorAll('#modal .opts.khand>button.kopt')].filter(c=>c.getClientRects().length);
   for(const c of cards){const art=c.querySelector(':scope > .kaart');if(!art)continue;for(const W of LAD){const bd=kitOddsBadgeOn(art,W);if(!bd)continue;const w=bd.querySelector('.kodm b');const br=bd.getBoundingClientRect(),ar=art.getBoundingClientRect(),wr=w.getBoundingClientRect();
    res.push({W,cardW:Math.round(c.getBoundingClientRect().width),sw:w.scrollWidth,cw:w.clientWidth,word:w.textContent.trim(),inPic:br.left>=ar.left-1&&br.right<=ar.right+1&&br.top>=ar.top-1&&br.bottom<=ar.bottom+1,wIn:wr.left>=ar.left&&wr.right<=ar.right,air:Math.round(Math.min(wr.left-br.left,br.right-wr.right)),rows:Math.round(br.height)})}}return {n:cards.length,res}},LAD);
  sizes[N]=r.n+' cards w '+[...new Set(r.res.map(x=>x.cardW))].join('/')+' h '+[...new Set(r.res.map(x=>x.rows))].join('/');r.res.forEach(x=>{x.kind='small';x.ev='N'+N;x.clip=x.wIn?'':'kaart';x.inCard=true});all=all.concat(r.res);
  if(OUT)await p.screenshot({path:path.join(OUT,`${dn}-hand${N}.png`)});
  /* R13: enlarge every card of the stress hand, measure the whole body */
  for(let i=0;i<N;i++){const r=await p.evaluate(i=>{const e=[...document.querySelectorAll('#modal .opts.khand>button.kopt')].filter(c=>c.getClientRects().length)[i];if(!e)return null;const q=e.getBoundingClientRect();return {x:q.left+q.width/2,y:q.top+Math.min(q.height/2,40),lab:[...e.querySelectorAll('.kb .krl')].map(x=>x.textContent.trim()),w:((e.querySelector('.kodb .kodm b')||{}).textContent||'').trim()}},i);if(!r)continue;
   if(touch)await p.touchscreen.tap(r.x,r.y);else await p.mouse.click(r.x,r.y);await p.waitForTimeout(1300);if(process.env.FIG){await p.evaluate(()=>{const k=document.querySelector('#modal .khbi .kabody');if(k){const d=document.createElement('span');d.className='klead';d.style.cssText='display:block;height:46px;background:#ccc';d.textContent='fig';k.insertBefore(d,k.firstChild)}});await p.waitForTimeout(900)} const bm=await p.evaluate(BIGM);if(bm){bm.ev='N'+N+'#'+i;bm.sl=r.lab;bigs.push(bm)}
   if(OUT&&(N===5||i===0))await p.screenshot({path:path.join(OUT,`${dn}-hand${N}-big${i}.png`)});
   await p.evaluate(()=>{const x=document.querySelector('#modal .dlg>.khconf>.khno');if(x)x.click()});await p.waitForTimeout(900)}}
 console.log(dn,'stress sizes',JSON.stringify(sizes));
 const badA=all.filter(x=>x.air<2);
 const badW=all.filter(x=>x.sw>x.cw+0),badL=all.filter(x=>!LAD.includes(x.word)),badP=all.filter(x=>!x.inPic||!x.inCard),badC=all.filter(x=>x.clip);
 console.log(dn,'hands',hands,'badges',all.length,'small',all.filter(x=>x.kind==='small').length,'big',all.filter(x=>x.kind==='big').length,'card w',[...new Set(all.filter(x=>x.kind==='small').map(x=>x.cardW))].join('/'));
 [...badW,...badL,...badP,...badC,...badA].slice(0,8).forEach(x=>console.log('  bad',JSON.stringify(x)));
 ok(hands>0&&all.length>0,`${dn}: real event hands dealt with odds badges (${hands} hands, ${all.length} badges)`);
 ok(!badW.length,`${dn}: badge word scrollWidth <= clientWidth on every card (${badW.length} bad)`);
 ok(!badL.length,`${dn}: every badge word is one whole ladder word (${badL.length} bad)`);
 ok(!badP.length,`${dn}: every badge inside its picture and its card (${badP.length} bad)`);
 ok(!badC.length,`${dn}: no badge word clipped by an ancestor box (${badC.length} bad)`);
 ok(!badA.length,`${dn}: the word keeps >= 2 px air to the badge edge (${badA.length} bad)`);
 bigs.forEach(x=>{const miss=(x.sl||[]).filter(l=>l!=='Gợi ý'&&!x.rows.some(r=>r.lab===l||(l==='Bại'&&r.lab==='Mất')));/* kit-stage-r17: KIT §6.2o K-HAND-MAT — the ONE card copy (kitOptCopy) labels a no-roll card's Bại row «Mất» (a certain loss, as on the card) */if(miss.length)x.bad.push('missingRow:'+miss.join('/'))});
 const wordDiff=bigs.filter(x=>x.real&&x.sw&&x.bw&&x.sw!==x.bw);wordDiff.slice(0,4).forEach(x=>console.log('  worddiff',x.ev,x.sw,'->',x.bw));
 ok(!wordDiff.length,`${dn}: the enlarged card shows the same odds word as its small card (law 4) (${wordDiff.length} bad)`);
 const bigBad=bigs.filter(x=>x.bad.length),bigOrph=bigs.filter(x=>x.orph.length),bigNoRow=bigs.filter(x=>!x.rows.length);
 console.log(dn,'enlarged cards measured',bigs.length,'sample',JSON.stringify(bigs.slice(0,2).map(x=>({ev:x.ev,card:x.card,pic:x.pic,info:x.info,fs:x.fs,rows:x.rows.map(r=>r.lab)}))));
 [...bigBad,...bigOrph].slice(0,8).forEach(x=>console.log('  bigbad',x.ev,JSON.stringify({bad:x.bad.slice(0,4),orph:x.orph,dump:x.dump,card:x.card,pic:x.pic,info:x.info,fs:x.fs})));
 ok(bigs.length>0,`${dn}: enlarged cards measured (${bigs.length})`);
 ok(!bigBad.length,`${dn}: every enlarged card shows every row whole inside its box, nothing clipped (${bigBad.length} bad of ${bigs.length})`);
 ok(!bigOrph.length,`${dn}: no stat mark alone on a line in an enlarged card (${bigOrph.length} bad)`);
 ok(!errs.length,`${dn}: no page errors ${errs.slice(0,2).join(' | ')}`);await ctx.close()}
await b.close();process.exit(bad?1:0)})();
