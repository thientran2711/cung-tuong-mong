/* Tuần lục person pages = ONE kit template (owner 11/15 15:30Z, 16:50Z, 16:55Z, 16:58Z, 17:00Z, 17:16Z) + no flash on page turn (15:45Z).
   usage: node dev/test/book-person.js <url> [<W>x<H>@dpr ...] [--shots <dir>]
   Plays one real week (bot), adds the owner's cases (a seen gift, a seen misdeed, a mid-week promotion, an old log line with a card's
   range text, fractions, "..", a name-only line), opens the book at dawn and checks EVERY page:
   - every person section has the kit relation table (.krt) with the fixed rows for its kind, 3 aligned columns (x of each column ±1 px);
   - no private chips (.kbk-rel, .kbk-relchips, .kbk-pair), no non-integer number, no "..", no "Nàng ta oán ta", no bare "thiện cảm" label,
     no card text (" · kèm:", "đến +N"), no gift counted as evidence, current rank titles only;
   - every subject keeps its own page (owner 17:45Z: no page merging) and every page has its full-length figure (Triều đình · thiên hạ = Hoàng thượng);
   - small avatars: no box behind the frame (computed background transparent); Sổ này ghi names one colour; no "Lui" button (✕ only);
   - turning pages: every <img> on the turning sheet copy and on the next page is decoded before the turn starts (img.complete && decode)
     and the live page is not rebuilt (same DOM nodes before/after a turn). */
const {chromium}=require('playwright');const args=process.argv.slice(2);const URL=args[0];
const si=args.indexOf('--shots');const SHOTS=si>0?args[si+1]:null;
let SIZES=args.slice(1).filter((a,i,A)=>a!=='--shots'&&A[i-1]!=='--shots');if(!SIZES.length)SIZES=['755x1000@2','1000x755@2','1180x820@2','1366x1024@2','844x390@3'];
(async()=>{const b=await chromium.launch();const errs=[];const OUT={};let ok=true;
 for(const SZ of SIZES){const [wh,d]=SZ.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});const p=await ctx.newPage();
  p.on('pageerror',e=>errs.push(SZ+' '+e.message.slice(0,200)));p.setDefaultTimeout(0);
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof dawn==='function',null,{timeout:0});await p.waitForTimeout(2500);
  const setup=await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;
   Math.random=(()=>{let s=12345;return()=>{s=(s*16807)%2147483647;return s/2147483647}})();
   for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render();window.__bot=true;tmPlace(S,12);
   S.wkSnap=wkSnap();let n=0;while(n<9&&!S.dead){Q.length=0;S.mg=null;used=4;try{nextBuoi()}catch(e){}n++}Q.length=0;
   const L=liveRivals(false);const [a,c,e]=[L[0],L[1],L[2]||L[0]];kn();for(const v of L)S.met[v.id]=wk();
   /* a seen plain gift (j8 giveTo through seenNPC): news, never evidence */
   const ev0=a.ev||0;a.inv.push({k:Object.keys(IT).find(k=>IT[k].tg&&IT[k].tg.includes("rv"))});const gi=a.inv.length-1;const r0=Math.random;Math.random=()=>0.001;
   const seen=seenNPC(a,c,giveTo(a,c,gi));Math.random=r0;if(seen)log(seen);const giftEv=(a.ev||0)-ev0;
   /* a seen misdeed: evidence with its source */
   const e0=c.ev||0;Math.random=()=>0.001;const s2=seenNPC(c,a,`${c.name} sai người bỏ xạ hương vào túi thơm của ${a.name}. `);Math.random=r0;if(s2)log(s2);const badEv=(c.ev||0)-e0;
   /* mid-week promotion: older lines carry the old title */
   log(`${RANKS[e.rank].n} ${e.name} đến chơi, trò chuyện nửa buổi.`);const r1=e.rank;if(e.rank<5)e.rank++;
   /* an old line with the card's range text + fractions + ".." (versions before this fix) */
   log(`Tranh sủng. <span class="g">Thành.</span> · kèm: ${a.name} ghen +25, thiện cảm -15, oán ta +3 đến +23`);
   log(`${c.name} nhờ người đưa thư.. Nàng oán ngươi +2.36, thân -1.76.`);
   /* Tranh sủng: the real change of the one she took the night from (owner 16:58Z) */
   let steal='';try{S.tonight=c;S.buoi=B4L;Math.random=()=>0.001;const rr=runAct(S,c,"steal");Math.random=r0;if(rr)log(rr);steal=plain(rr||"");Q.length=0;S.toMorning=0}catch(x){steal='ERR '+x.message;Math.random=r0}
   log(`${a.name}.`);log('Triều đình: Được mùa ở Giang Nam, kho lúa đầy.');a.oan=(a.oan||0)+3;a.ghen=(a.ghen||0)+4;
   return{steal,giftEv,badEv,seen:plain(seen||""),promo:[r1,e.rank],names:[a.name,c.name,e.name]}});
  const R={setup};
  await p.waitForFunction(()=>typeof FIGS!=='undefined'&&FIGS.length>0,null,{timeout:60000}).catch(()=>{});
  await p.evaluate(()=>{dawn()});await p.waitForTimeout(3500);
  await p.evaluate(()=>kitImgSync(document.querySelector('.kbk')));
  await p.evaluate(async()=>{await Promise.all([...document.querySelectorAll('.kbk img')].map(i=>i.decode?i.decode().catch(()=>0):0))});
  R.pages=await p.evaluate(async()=>{const root=document.querySelector('.kbk');const out=[];const bk=window.__kbk;const seen=new Set();const pgs=[];
   for(let c=0;c<=bk.max;c++){bk.go(c);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));const sh=[...root.querySelectorAll('.kbk-sheet')];
    const vis=bk.mode==='spread'?[sh[c-1]&&sh[c-1].querySelector('.kbk-back>.kbk-pg'),sh[c]&&sh[c].querySelector('.kbk-front>.kbk-pg')]:[sh[c]&&sh[c].querySelector('.kbk-front>.kbk-pg')];
    for(const pg of vis){if(!pg||seen.has(pg)||/k-cover|k-blank|k-back|k-verso|k-end/.test(pg.className))continue;seen.add(pg);pgs.push(pg);await measure(pg)}}
   bk.go(0);
   async function measure(pg){const f=pg.querySelector('.kbk-flow');const txt=(pg.querySelector('.kbk-body')||pg).innerText.replace(/\s+/g,' ').trim();
    const R=c=>Math.round(c.getBoundingClientRect().right);const tables=[...pg.querySelectorAll('.krt')].map(t=>{const h=[...t.querySelectorAll('.krt-h')];
     return{labels:[...t.querySelectorAll('.krt-l')].map(c=>c.innerText.trim()),x1:[h[1],...t.querySelectorAll('.krt-v')].filter(Boolean).map(R),x2:[h[2],...t.querySelectorAll('.krt-d,.krt-u')].filter(Boolean).map(R),
      lx:[...t.querySelectorAll('.krt-l')].filter(Boolean).map(c=>Math.round(c.getBoundingClientRect().left)),
      over:t.scrollWidth>t.clientWidth+1||[...t.querySelectorAll('*')].some(c=>c.getBoundingClientRect().right>pg.querySelector('.kbk-flow,.kbk-phead').getBoundingClientRect().right+1&&c.closest('.kbk-phead,.kbk-flow')&&c.getBoundingClientRect().right>t.getBoundingClientRect().right+1)||t.getBoundingClientRect().right>(t.closest('.kbk-phead,.kbk-flow')||pg).getBoundingClientRect().right+1}});
    const fill=f?f.scrollHeight/Math.max(1,f.clientHeight):1;
    out.push({cls:pg.className.replace('kbk-pg ',''),title:(pg.querySelector('.kbk-t,.kbk-pname')||{}).innerText||'',fig:!!pg.querySelector('.kbk-full'),txt:txt.slice(0,2000),tables,
     priv:pg.querySelectorAll('.kbk-rel,.kbk-relchips,.kbk-pair,.kbk-pchips').length,fill:+fill.toFixed(2),secs:pg.querySelectorAll('.kbk-sec').length})}
   const toc=[...root.querySelectorAll('.kbk-toc .kbk-tc')];const nameCols=[...new Set(toc.map(t=>getComputedStyle(t.lastElementChild).color))];
   const md=[...root.querySelectorAll('.kbk-toc .md, .kbk-sec .md')].map(m=>getComputedStyle(m).backgroundColor+'|'+getComputedStyle(m).borderTopWidth+'|'+getComputedStyle(m).boxShadow);
   const bar=[...root.querySelectorAll('.kbk-bar button')].map(x=>x.innerText.trim());
   return{pages:out,nameCols,md:[...new Set(md)],bar}});
  /* page turn: what the turning copy shows must already be decoded, the live sheets are not rebuilt */
  R.turn=await p.evaluate(async()=>{const bk=window.__kbk;const root=document.querySelector('.kbk');await kitImgSync(root);const res={steps:[],rebuilt:0,undecoded:[]};
   const ids=()=>[...root.querySelectorAll('.kbk-sheet')];for(let k=0;k<Math.min(5,bk.max);k++){const before=ids();
    const watch=new MutationObserver(()=>{});let bad=[];
    const chk=()=>{for(const im of root.querySelectorAll('.ksht img,.kbk-sheet img')){const sh=im.closest('.ksht,.kbk-sheet');if(sh.style.visibility==='hidden'||getComputedStyle(sh).visibility==='hidden')continue;
      if(!im.complete||!im.naturalWidth){/* still downloading everywhere = the network, not a flash; a copy blank while its page holds the picture decoded = a flash */const live=[...root.querySelectorAll('.kbk-sheet img')].find(x=>x.src===im.src&&x.complete&&x.naturalWidth);if(im.closest('.ksht')&&!live)res.net=(res.net||0)+1;else bad.push((im.closest('.ksht')?'copy:':'live:')+(im.complete?'broken:':'loading:')+im.src.split('/').pop())}else if(im.closest('.ksht')&&im.decoding!=='sync')bad.push('async:'+im.src.split('/').pop())}};
    bk.next();await new Promise(r=>requestAnimationFrame(()=>r()));chk();await new Promise(r=>setTimeout(r,1600));chk();
    const after=ids();res.rebuilt+=before.filter((x,i)=>x!==after[i]).length;res.undecoded.push(...bad)}
   res.undecoded=[...new Set(res.undecoded)].slice(0,8);return res});
  if(SHOTS){const fs=require('fs');fs.mkdirSync(SHOTS,{recursive:true});await p.evaluate(()=>window.__kbk.go(1));await p.waitForTimeout(600);await p.screenshot({path:`${SHOTS}/book-${wh}-1.jpg`,type:'jpeg',quality:60});
   const fp=R.pages.pages.findIndex(x=>x.fig&&/(Phi|Tần|Quý nhân|Thường tại|Đáp ứng|Hoàng hậu|Quý phi) /.test(x.title));await p.evaluate(n=>window.__kbk.go(n),fp>=0?fp+1:2);await p.waitForTimeout(600);await p.screenshot({path:`${SHOTS}/book-${wh}-2.jpg`,type:'jpeg',quality:60})}
  /* verdict */
  const P=R.pages.pages;const all=P.map(x=>x.txt).join(' \n ');const bad=[];
  if(R.setup.giftEv!==0)bad.push('gift gave evidence');if(!/ghen \+\d+/.test(R.setup.steal)||/đến/.test(R.setup.steal))bad.push('steal log: '+R.setup.steal);if(R.setup.badEv!==1)bad.push('misdeed gave no evidence');
  if(/\d[.,]\d/.test(all.replace(/\d+\/\d+/g,'')))bad.push('fraction: '+(all.match(/.{20}\d[.,]\d.{10}/)||[''])[0]);
  if(/(?<!\.)\.\.(?!\.)/.test(all))bad.push('double stop');if(/[Nn]àng ta (oán|→|ghen)/.test(all))bad.push('Nàng ta oán ta: '+(all.match(/.{0,40}[Nn]àng ta (oán|→|ghen).{0,20}/)||[''])[0]);
  if(/·\s*(kèm|thành|hỏng)\s*:|đến \+\d/.test(all))bad.push('card text: '+(all.match(/.{30}(kèm|đến \+).{20}/)||[''])[0]);
  if(/(?<![\p{L}])thân [+\-−]\d/u.test(all))bad.push('thân chip');if(/Dùng được ở thẻ|\(Chứng cứ [^)]*\+\d/.test(all))bad.push('card help / glued evidence');
  if(new RegExp(`(Đáp ứng|Thường tại|Quý nhân|Tần|Phi) ${R.setup.names[2]}`).test(all)&&R.setup.promo[0]!==R.setup.promo[1]){/* must be the new title */
   const m=all.match(new RegExp(`(\\S+ \\S+|\\S+) ${R.setup.names[2]}`,'g'))||[];R.titles=[...new Set(m)].slice(0,6)}
  P.forEach((x,i)=>{if(x.priv)bad.push('private chip p'+i);for(const t of x.tables){if(new Set(t.x1).size>1&&Math.max(...t.x1)-Math.min(...t.x1)>1)bad.push('col1 x p'+i);if(Math.max(...t.x2)-Math.min(...t.x2)>1)bad.push('col2 x p'+i);if(Math.max(...t.lx)-Math.min(...t.lx)>1)bad.push('label x p'+i);
    if(t.labels.some(l=>/^thiện cảm$/i.test(l)))bad.push('bare thiện cảm');if(t.over)bad.push('table overflows p'+i+' '+x.title+' '+t.labels.join('|'))}});
  P.forEach((x,i)=>{if(/^(Thái giám|Thị vệ|Thái y|Hoàng thượng)/.test(x.title))for(const tb of x.tables)if(tb.labels.some(l=>/^Nàng/.test(l)))bad.push('man labelled Nàng p'+i+' '+x.title)});
  const persons=P.filter(x=>x.fig);for(const x of persons)if(!x.tables.length&&!/tiếp theo|^Tổng lược|^Triều đình/.test(x.title))bad.push('person page without kit table: '+x.title);
  /* owner 17:45Z: every page (Tổng lược, each person, Triều đình · thiên hạ) has the full-length figure of its subject */
  P.forEach((x,i)=>{if(!x.fig)bad.push(`page ${i} "${x.title}" has no figure`)});if(!P.some(x=>/^Triều đình/.test(x.title)))bad.push('no Triều đình page');
  if(R.pages.nameCols.length>1)bad.push('toc names '+R.pages.nameCols.length+' colours');
  if(R.pages.md.some(m=>!/^rgba\(0, 0, 0, 0\)\|0px\|none$/.test(m)))bad.push('avatar box '+R.pages.md.join(' ; '));
  if(R.pages.bar.some(t=>/^Lui$/.test(t)))bad.push('Lui button');
  if(R.turn.rebuilt)bad.push('sheets rebuilt on turn: '+R.turn.rebuilt);if(R.turn.undecoded.length)bad.push('undecoded on turn: '+R.turn.undecoded.join(','));
  R.bad=bad;ok=ok&&!bad.length;OUT[SZ]={bad,pages:P.map(x=>({t:x.title,fig:x.fig,fill:x.fill,secs:x.secs,tables:x.tables.map(t=>t.labels.join(' | '))})),setup:R.setup,titles:R.titles};
  await ctx.close()}
 console.log(JSON.stringify({ok,OUT,errs},null,1));await b.close();process.exit(ok&&!errs.length?0:1)})();
