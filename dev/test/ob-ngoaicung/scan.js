/* review/ob-ngoaicung (owner OD 25/11 ~22:45Z, law 11): WORDING FAMILY SCAN of the pre-palace road (isKc: home, khuê phòng, phủ, city, journeys).
   usage: node dev/test/ob-ngoaicung/scan.js <site url> <out.json> [--origins=tt,td,cnv,nc,bd] [--size=1180x820@1] [--shots=<dir>]
   Per origin: new life -> home road -> every surface a player reads while she is OUTSIDE the palace: the stage head-count buttons + both open group lists,
   the maid title (kitMaidTitle / figure tag pMaid().rw), the crew chip tips, every bottom tab panel, the person card of the maid.
   Each palace-only word (PALACE below) found is listed with its context. Exit 1 when a palace word sits on a surface that must never have one
   (head-count labels, group lists, maid title, figure tags). Panel text hits are listed for the table (some are legit: "Ngày tuyển cung nữ"). */
const {chromium}=require('playwright');const fs=require('fs');
const A=process.argv.slice(2);const URL=A[0];const OUT=A[1]||'scan.json';
const opt=k=>{const a=A.find(x=>x.startsWith('--'+k+'='));return a?a.split('=')[1]:null};
const ORGS=(opt('origins')||'tt,td,cnv,nc,bd').split(',');const [wh,d]=(opt('size')||'1180x820@1').split('@');const [W,H]=wh.split('x').map(Number);const SH=opt('shots');
const PALACE=/Cung nhân|Chí tôn|[Cc]ung nữ|[Tt]hái giám|(tam|nhị|nhất) đẳng|[Tt]iểu chủ|[Nn]ương nương|[Nn]ội vụ phủ|[Pp]hi tần|[Cc]hủ tử/g;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const rep={};let bad=0;
 for(const ORG of ORGS){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,serviceWorkers:'block',reducedMotion:'reduce'});
  await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click());document.querySelectorAll('[data-km-close]').forEach(b=>{if(b.offsetParent)b.click()})},300)});
  const p=await c.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  const skip=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const o=document.getElementById('kroul');
    if(o&&o.isConnected){const b=[...o.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(b){b.click();return 1}}return 0});if(!n)break;await sleep(700)}};
  await p.goto(URL,{waitUntil:'domcontentloaded'});await sleep(2500);await p.evaluate(()=>{try{localStorage.clear()}catch(e){}});await p.reload({waitUntil:'domcontentloaded'});await sleep(3000);await skip();
  await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skip();
  const rolled=await p.evaluate(o=>{for(let i=0;i<200&&S.origin.k!==o;i++){try{store.set(NL_KEY,null)}catch(e){}start()}
   if(S.origin.k!==o){const O=ORIGINS.find(x=>x.k===o);if(!O)return 'NO-ORIGIN';S.origin=O;nlCard()}return S.origin.k+(S.srv?' srv':'')},ORG);await sleep(600);await skip();
  await p.evaluate(()=>{const b=document.querySelector('#modal [data-kcp="nha"]');if(b)b.click()});await sleep(700);
  for(let i=0;i<40&&await p.evaluate(()=>!!document.getElementById('kroul'));i++)await sleep(500);
  /* RV-OB-NGOAICUNG FAIL 1: every dialog the place gate drops at home is listed (title + speaker); only palace speakers may be in it */
  await p.evaluate(()=>{window.__dropped=[];if(typeof placeEvOk==='function'){const f0=placeEvOk;placeEvOk=function(m){const r=f0.apply(this,arguments);if(!r&&m){const w=m.who||{};window.__dropped.push({ww:!!m.wwin,t:m.t||'',rk:String(w.rk||''),rw:String(w.rw||w.n||''),me:Array.isArray(w.w)&&w.w.includes('me')})}return r};window.placeEvOk=placeEvOk}});
  await p.evaluate(()=>{const b=document.querySelector('#modal button[data-nl="ok"]');if(b)b.click()});await sleep(1200);
  await p.evaluate(()=>{for(let i=0;i<12&&Q.length;i++){const m=Q[0];if(m.opts&&m.opts.length)break;closeModal()}tab='act';render()});await sleep(1500);
  const R=await p.evaluate(async()=>{const o={isKc:isKc(),kd:S.kc&&S.kc.kd||'',maid:!!S.maid,staff:(S.staff||[]).length,surf:{}};const put=(k,v)=>o.surf[k]=String(v||'').replace(/\s+/g,' ').trim();
   const w=ms=>new Promise(r=>setTimeout(r,ms));
   put('headcount',[...document.querySelectorAll('#kshR .kgfbtn, #krail [data-rail^=kgf-]')].filter(x=>x.offsetParent).map(x=>x.innerText.replace(/\s+/g,' ')).join(' | '));
   for(const k of ['cn','ct']){window.__kgfOpen=k;try{k3Stage()}catch(e){}await w(300);const f=document.querySelector('#kshR .kgfopen');put('list-'+k,f?f.innerText:'');
    put('tips-'+k,f?[...f.querySelectorAll('[title]')].map(x=>x.title).join(' | '):'')}
   window.__kgfOpen=null;try{k3Stage()}catch(e){}
   put('tabs',[...document.querySelectorAll('#tabs button[data-tab]')].filter(x=>x.offsetParent).map(x=>x.textContent.trim()).join(' | '));put('tabsRenamed',[...document.querySelectorAll('#tabs button[data-tab]')].filter(x=>x.offsetParent&&x.dataset.r8l0!=null||x.offsetParent&&typeof KCTABS==='object'&&Object.values(KCTABS).includes(x.textContent.trim())&&!/^(Tư trang|Tài nghệ|Dư đồ|Mệnh truyện)$/.test(x.textContent.trim())).map(x=>x.dataset.tab+'='+x.textContent.trim()).join(' | '));put('meTag',typeof pMe==='function'?pMe().rw:'');put('meRank',[typeof meRankN==='function'?meRankN():'NO-meRankN',kszRankName(S)[0],rkName(S),(rkOfFace('consort',S)||[])[1],(document.getElementById('me-r')||{}).textContent||''].join(' | '));
   try{Q.unshift({t:'Thử thẻ tên',who:pMe(),h:'<p>.</p>'});showModal();await w(400);const k=[...document.querySelectorAll('#modal .knr')].find(k=>k.querySelector('.knr-ta')||k.querySelector('.kmy'));put('drawnTag',k?(k.querySelector('.knr-r')||{}).textContent||'(no rank line)':'NO-PLATE');closeModal();await w(200)}catch(e){put('drawnTag','ERR '+e.message)}put('maidTitle',typeof kitMaidTitle==='function'&&S.maid?kitMaidTitle():'');put('maidFigTag',S.maid&&typeof pMaid==='function'?pMaid().rw:'');
   put('stageTags',[...document.querySelectorAll('.figtag,.kfigt,.ftag,[class*=figname]')].filter(x=>x.offsetParent).map(x=>x.innerText).join(' | '));
   for(const t of ['act','go','rv','staff','rel','kid','inv','art','story']){tab=t;render();await w(500);const P=document.getElementById('panel');put('tab-'+t,P?P.innerText:'')}
   tab='act';render();return o});
  /* --play=N: N random steps at home (cards, options, moves, next buổi; as dev/test/outside/route.js) collecting every dialog (title, speaker tag, text)
     and every new journal line shown while she is still at home: the EVENT / NEWS / DIALOGUE-TAG family */
  const NP=+(opt('play')||0);if(NP){R.ev=await p.evaluate(async n=>{const out=[];const seen=new Set();const L0=S.logSeq||0;const w=ms=>new Promise(r=>setTimeout(r,ms));
   /* k5 ACTS family (MAIN 150 item 5): every home card (deck) and person-card / Giao tình act she can press at home, checked for a PALACE person
      (a live consort, the emperor, Thái hậu, a palace servant) — her family, her thanh mai (j96 S.tm96.mid, his office title is his own) excepted */
   /* k3/k9 ASK family: every palace NPC ask (jrcv rcvAsk) that reaches HER while at home */
   /* BIG FAIL r2 (law 11): HER rank as DRAWN in each dialog — the .knr-r of her own plate (the one carrying «(ta)» / .kmy) */
   const drawn=new Set();const drawnRead=t=>{try{document.querySelectorAll('#modal .knr').forEach(k=>{if(k.querySelector('.knr-ta')||k.querySelector('.kmy')){const r=k.querySelector('.knr-r');drawn.add((r?r.textContent.trim():'')+' «'+t+'»')}})}catch(e){}};
   const asks=[];if(typeof rcvAsk==='function'){const a0=rcvAsk;rcvAsk=function(k,p,t){const r=a0.apply(this,arguments);if(t===S&&isKc()&&r)asks.push(k+': '+String(r).slice(0,80));return r}}
   /* RESULT-CARD family (jaudit «time passed» card, every resultShow at home): no «Trong cung vừa qua» title off a palace, no palace person's row */
   const cards=[];let lastR=null;const cardScan=()=>{try{const R=window.kaLastResult;if(!R||R===lastR)return;lastR=R;const N=palN();const tx=JSON.stringify(R.rows||[]);
     if(/^Trong cung vừa qua/.test(R.title||'')&&!/^kc:nc/.test(placeCtx()))cards.push('title «'+R.title+'»');for(const nm of N)if(tx.includes(nm)&&!String(R.title||'').includes(nm)){const i=tx.indexOf(nm);let who='';try{const v=(liveRivals(true)||[]).find(x=>x.name===nm);const sv=(typeof allServ==='function'?allServ():[]).find(x=>x.name===nm);who=v?'consort r'+v.rank:sv?'servant of '+((typeof ownerOf==='function'&&ownerOf(sv)||{}).name||'?'):'other'}catch(e){}cards.push('«'+R.title+'» row names '+nm+' ('+who+') :: '+tx.slice(Math.max(0,i-60),i+80))}}/* her own act naming its person (a gift into the palace) is hers */catch(e){}};
   const acts=new Set();const palN=()=>{const N=new Set();const add=x=>{if(x&&x.name&&String(x.name).length>2)N.add(String(x.name))};try{(liveRivals(true)||[]).forEach(add)}catch(e){}
     try{add(typeof EMP==='object'&&EMP);add(S.emp);add(S.th)}catch(e){}try{(typeof allServ==='function'?allServ():[]).forEach(s=>{if(s!==S.maid)add(s)})}catch(e){}
     try{const own=new Set((S.kc&&S.kc.fam||[]).map(m=>m.name));const tm=S.tm96&&S.tm96.mid;(S.kc&&S.kc.fam||[]).forEach(m=>{if(m.id===tm)own.add(m.name)});for(const x of own)N.delete(x)}catch(e){}return N};
   const actScan=()=>{try{const N=palN();for(const a of (deck||[])){const t=String((a.n||'')+' '+(a.t||'')).replace(/<[^>]+>/g,'');/* sending INTO the palace (letters, gifts, needlework by someone's hand) is her own act and kept by design; meeting a palace person is not */if(/^(Viết thư|Gửi |Nhờ .*đưa)/.test(String(a.n||'')))continue;for(const nm of N)if(t.includes(nm))acts.add('card «'+a.n+'» names '+nm)}
     const P=document.getElementById('panel');if(P&&tab==='staff'){const t=P.innerText;for(const nm of N)if(t.includes(nm))acts.add('Giao tình names '+nm)}}catch(e){}};
   /* RV r3 FAIL 1: FORCED palace drift every run (palace consort relAdd both ways + Hoàng hậu / Thái hậu stat drift) inside a home result card:
      no palace person's row may show (rows, Kèm, Vì sao); the card text is read from kaLastResult AND the drawn #rtoast */
   const forceCard=(tag)=>{if(!isKc())return;try{const b=rsnap();const L=(liveRivals(true)||[]).filter(v=>v&&v!==S);const v=L[0];if(v){relAdd(v,S,-5);relAdd(S,v,-5)}const q=typeof queenP==='function'?queenP():null;if(q&&q!==S&&q!==v)relAdd(q,S,-4);
     S.hh=(S.hh||0)-3;S.th=(S.th||0)-3;/* RV r5: a forced drift that makes NO card must not be read as the previous real card (kaLastResult / #rtoast kept, e.g. her own «Gửi bức thêu … cho <consort>») */window.kaLastResult=undefined;{const t=document.getElementById('rtoast');if(t)t.remove()}resultShow('Trong cung vừa qua',b);const R=window.kaLastResult||{};const tx=JSON.stringify(R.rows||[])+' '+((document.getElementById('rtoast')||{}).innerText||'');
     const N=[...palN()].filter(nm=>tx.includes(nm));if(/Hoàng hậu|Thái hậu/.test(tx))N.push('Hoàng hậu/Thái hậu row');if(N.length)cards.push('forced['+tag+'] «'+(R.title||'')+'»: '+N.join(', '))}catch(e){cards.push('forced['+tag+'] ERR '+e.message)}};
   forceCard('start');
   for(let i=0;i<n&&isKc()&&!S.dead;i++){if(i===Math.floor(n/2))forceCard('mid');cardScan();if(i%10===0){if(i%50===0){const t0=tab;tab='staff';try{render()}catch(e){}actScan();tab=t0;try{render()}catch(e){}}else actScan()}await w(5)/* every step its own task, as a real tap */;try{if(Q.length)showModal();/* a dialog held for later (jdayq pacing) is what she sees later: sift it as the game will (placeSift), then read it */if(typeof placeSift==='function')placeSift();if(Q.length){const m=Q[0];drawnRead(m.t);const who=m.who&&(m.who.rw||m.who.n)||'';const tx=String(m.h||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').slice(0,400);
      const k=m.t+'|'+who;if(!seen.has(k)){seen.add(k);out.push({ww:!!m.wwin,t:m.t,who,tx,opts:(m.opts||[]).map(o=>String(o.n||'').replace(/<[^>]+>/g,'')).join(' / ')})}
      if(m.opts&&m.opts.length){const L=m.opts.map((o,j)=>j).filter(j=>!m.opts[j].dis&&!m.opts[j].off);chooseM(L.length?L[Math.floor(Math.random()*L.length)]:0)}else closeModal();await w(30);continue}
     const G=new Set(Object.values(typeof KCG==='object'?KCG:{}));const D=deck.map((a,j)=>[a,j]).filter(([a])=>(!G.size||G.has(a.g))&&!a.done&&!a.lock&&can(cardCost(a))&&canPay(a));if(D.length&&Math.random()<.7){act(D[Math.floor(Math.random()*D.length)][1]);continue}
     if(Math.random()<.2){const ks=Object.keys(KCPL).filter(k=>!kcGoWhy(k));if(ks.length){kcGo(ks[Math.floor(Math.random()*ks.length)]);render();continue}}
     nextBuoi()}catch(e){out.push({t:'ERR',tx:e.message})}}
   try{render()}catch(e){}/* the feed as she sees it after a repaint */
   const nt=(typeof kitNoticeList==='function'?kitNoticeList():[]).map(x=>String((x.line||'')+' | '+(x.text||'')).replace(/<[^>]+>/g,''));
   const lg=(S.logs||[]).slice(0,Math.min(150,Math.max(0,(S.logSeq||0)-L0))).map(x=>String(x).replace(/<[^>]+>/g,''));return{drawn:[...drawn],d:out,log:lg,nt,acts:[...acts],asks,cards:[...new Set(cards)].slice(0,20),stillKc:isKc(),turn:S.turn}},NP);
   R.surf['ev-dialogs']=R.ev.d.map(x=>`«${x.t}» [${x.who}] ${x.tx} {${x.opts}}`).join(' ‖ ');R.surf['ev-log']=R.ev.log.join(' ‖ ');R.surf['ev-notice']=R.ev.nt.join(' ‖ ');R.acts=R.ev.acts;R.asks=R.ev.asks||[];R.cards=R.ev.cards||[];if(R.cards.length){bad++;R.fail=(R.fail||[]).concat('cards')}if(R.asks.length){bad++;R.fail=(R.fail||[]).concat('asks')}if(R.acts.length){bad++;R.fail=(R.fail||[]).concat('acts')}}
  R.dropped=await p.evaluate(()=>{const L=window.__dropped||[];const seen=new Set();return L.filter(x=>{const k=x.t+'|'+x.rw;if(seen.has(k))return false;seen.add(k);return true})});
  if(R.ev){R.wwShown=R.ev.d.filter(x=>x.ww).map(x=>x.t);if(R.wwShown.length){bad++;R.fail=(R.fail||[]).concat('worldcare')}}
  R.droppedBad=R.dropped.filter(x=>x.me||(!/^(emp|th|c\d|cold|sv)/.test(x.rk)&&!/^Tin trong cung/.test(x.t)&&!x.ww));/* the palace news sheet of the buổi is dropped by design */if(R.droppedBad.length){bad++;R.fail=(R.fail||[]).concat('dropped')}
  R.rolled=rolled;R.errs=errs.slice(0,5);R.hits={};
  /* MAIN 159 r5 (law 6+11): no palace FAVOUR line in her whole home Sổ ghi (start line «Sủng 8 → 0 (Hoàng thượng phật ý)», Thái hậu / Hoàng hậu numbers)
     and so no emperor page «Hoàng thượng nhạt lòng / để tâm» in Tuần lục */
  R.favour=await p.evaluate(()=>{if(!isKc())return[];const F=/Sủng\s*[+−-]?\s*\d|Sủng \d+\s*→|Hoàng thượng (nhạt lòng|để tâm)|(Thái hậu|Hoàng hậu)( phật lòng| vừa lòng|: thiện cảm)/;
   return (S.logs||[]).map(x=>String(x).replace(/<[^>]+>/g,'')).filter(x=>F.test(x)).slice(0,8)});
  if(R.favour.length){bad++;R.fail=(R.fail||[]).concat('favourLog')}
  /* BIG FAIL r2: no palace RANK word (RANKS[].n, e.g. «Đáp ứng») on her own tag / probes / drawn plates at home */
  if(R.ev)R.surf['drawnPlay']=(R.ev.drawn||[]).join(' ‖ ');
  R.rankHits=await p.evaluate(sv=>{const N=(RANKS||[]).map(x=>x&&x.n).filter(Boolean);const out={};for(const k of ['meTag','meRank','drawnTag','drawnPlay']){const v=sv[k]||'';const h=N.filter(n=>new RegExp('(^|[^\\p{L}])'+n+'($|[^\\p{L}])','u').test(v));if(h.length)out[k]=h}return out},R.surf);
  if(R.isKc&&Object.keys(R.rankHits).length){bad++;R.fail=(R.fail||[]).concat('rank:'+Object.keys(R.rankHits).join('/'))}
  if(R.isKc&&!R.surf.drawnTag||R.isKc&&/^(NO-|ERR)/.test(R.surf.drawnTag)){bad++;R.fail=(R.fail||[]).concat('drawnTag-missing')}
  /* tab names are checked by tabsRenamed below (they keep the palace names everywhere, OD:L2108) */
  const strict=['meTag','headcount','list-cn','list-ct','tips-cn','tips-ct','maidTitle','maidFigTag','stageTags'];
  for(const [k,v] of Object.entries(R.surf)){const H2=[];let m;PALACE.lastIndex=0;while((m=PALACE.exec(v)))H2.push(v.slice(Math.max(0,m.index-60),m.index+m[0].length+40));if(H2.length){R.hits[k]=H2.slice(0,k.startsWith('ev')?60:12);if(strict.includes(k)){bad++;R.fail=(R.fail||[]).concat(k)}}}
  /* owner OD:L2108 (21/11 ~03:15Z): the SAME 8 bottom tabs with the SAME names on every road — a home tab renamed to a KCTABS name is a FAIL */
  if(R.surf.tabsRenamed){bad++;R.fail=(R.fail||[]).concat('tabsRenamed')}
  if(SH){fs.mkdirSync(SH,{recursive:true});await p.evaluate(()=>{window.__kgfOpen='cn';try{k3Stage()}catch(e){}});await sleep(400);await p.screenshot({path:`${SH}/${ORG}-${wh}.jpg`,type:'jpeg',quality:70})}
  rep[ORG]=R;console.log(ORG,R.isKc,R.kd,'favour:',JSON.stringify(R.favour||[]).slice(0,200),'meRank:',R.surf.meRank,'drawn:',R.surf.drawnTag,'play:',(R.ev&&R.ev.drawn||[]).slice(0,4).join(' ; '),'strict-fails:',(R.fail||[]).join(',')||'none');await c.close()}
 fs.writeFileSync(OUT,JSON.stringify(rep,null,1));await b.close();console.log(bad?'SCAN FAIL '+bad:'SCAN PASS');process.exit(bad?1:0)})();
