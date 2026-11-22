/* review/home-chapters r2 item 1 (law 3 + VANPHONG truth, fix the whole family): renders EVERY home-chapter choice the way she sees it —
   each arc beat option (9 arcs), each home event option (E9 E15 E28, early roads) and each roster act card (nhũ mẫu, bà mối, teachers) —
   at the sharpest hint level (Tâm cơ 100: the kit hides the failure words below it, by design), and lists every number its data carries (c / w / l / gain-loss words: «<stat> ±n») that the shown card does NOT print, plus any «Tốn: không».
   Before the kit part «KR home-stat rows» lands this is the BEFORE table; after wiring it must be empty.
   usage: node dev/test/home-chapters/costrows.js <url> [--list] */
const {chromium}=require('playwright');const A=process.argv.slice(2),URL=A[0],LIST=A.includes('--list');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await c.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));await p.goto(URL,{waitUntil:'domcontentloaded'});await sleep(6000);
 const r=await p.evaluate(()=>{const out=[];const N=s=>String(s||'').replace(/<[^>]+>/g,' ').replace(/[−–]/g,'-').replace(/\s+/g,' ').toLowerCase();
  /* the home-stat family: Gia thanh / Áp lực hôn sự / Hồi môn / Lời đồn (kgt kap khm kld), thế lực nhà, "<người> với ta ±n" — the kit option
     card turns palace stats into hint words (jk2b kitHintPhrase) but has no words for these yet, so it drops them */
  const HOME=/^(gia thanh|áp lực hôn sự|hồi môn|lời đồn|thế lực nhà|.{1,30} với ta)$/;
  const O=s=>String(s||'').replace(/<[^>]+>/g,' ').replace(/[−–]/g,'-').replace(/\s+/g,' ');
  const want=(fx,words)=>{const W=[];for(const o of fx)for(const k in o||{})if(o[k]&&/^(kgt|kap|khm|kld)$/.test(k)&&NAMES[k])W.push(`${NAMES[k]} ${o[k]>0?'+':''}${o[k]}`);
   for(const m of O(words).matchAll(/(?:^|[:·,] )([^:·,]{2,40}?) ([+-]\d+)/g)){const lab=m[1].trim();if(HOME.test(lab.toLowerCase()))W.push(lab+' '+m[2])}const seen=new Set();return W.filter(w=>!seen.has(N(w))&&seen.add(N(w)))};
  /* shown = the stat's name, or one of the kit's own words for it (jk2b kitHintPhrase: the option card tells palace and home stats in words, numbers hidden) */
  const said=w=>{const L=[];for(const sg of [1,-1])for(const lv of [0,1,2]){try{const ph=kitHintPhrase(w,sg,'',lv);if(ph)L.push(String(ph[lv]).replace(/\u0001\s*/g,'').trim())}catch(e){}}return L.filter(x=>x.length>3)};
  const miss=(shown,W)=>W.filter(w=>{const lab=w.replace(/ [+-]\d+$/,'');if(N(shown).includes(N(lab)))return false;return !said(w).some(p=>N(shown).includes(N(p)))});
  const empty=(shown,line)=>{const L=N(line),T=N(shown);return (/tốn \| không( \||$)/.test(T)&&/tốn:/.test(L))||(/được \| không( \||$)/.test(T)&&/thành:/.test(L))};
  const life=o=>{for(let i=0;i<80;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!S.srv&&!(typeof isSrv==='function'&&isSrv()))break}S.origin=ORIGINS.find(x=>x.k===o);S.kcPick='nha';Q=[];window.__bot=1;kcInit();delete window.__bot;Q=[];S.tamco=100;/* the sharpest hint level: every part of the card (incl. «hỏng thì …») is on screen */
   for(const id of ['title','curtain','kload','kroul']){const e=document.getElementById(id);if(e){e.hidden=true;e.style.display='none'}}};
  const dlg=(fam,name,push,datas)=>{Q=[];document.getElementById('modal').hidden=true;push();if(!Q.length)return;const q=Q[0];showModal();
   const B=[...document.querySelectorAll('#modal .opts button, #modal .kpscopts button')].map(x=>{x.dataset.t=x.innerText.replace(/\n/g,' | ');return x});(q.opts||[]).forEach((o,i)=>{const shown=B[i]?B[i].dataset.t:'';const d=datas?datas[i]:{};
    const W=want([o.fx,d&&d.w,d&&d.l],(o.j67||'')+' '+(d&&d.words||''));const M=miss(shown,W);out.push({fam,name,opt:o.n,miss:M,khong:empty(shown,o.j67||''),shown})});document.getElementById('modal').hidden=true;Q=[]};
  for(const o of ['tt','dtq','muoi','thd','ch','td']){life(o);const ids=Object.keys(KCA).filter(id=>id==='kc_'+o||!/^kc_(tt|dtq|muoi|thd|ch|td)$/.test(id));
   for(const id of ids){const a=KCA[id];if(id==='tm96z'&&!S.tm96)continue;for(const bid in a.B){const T=kc3Thread(id);T.cur=bid;S.kc.ar.A=T;const O=kc3Opts(T,a.B[bid]);
     dlg('arc '+id,bid,()=>pushDil(mkP('kc3',{a:id,b:bid,o:O.map(x=>x.o==null?100:50)}),a.t),O.map(x=>({w:x.w,l:x.l,words:''})))}}
   S.kc.ar.A=null;if(o==='tt'){S.kc.suit.push(kcSuitor());S.khm=999;for(const e of ['mebenh','divat','xemmat','hac','vhtrieu','thtrieu'])dlg('event',e,()=>pushDil(mkP('kcE',{e}),e))}}
  window.__cr={N,O,want,miss,empty,life,said};  return out});
 await p.evaluate(()=>{const {life}=window.__cr;life('tt');S.kc.suit.push(kcSuitor());S.place='kc_sanh';for(const m of S.kc.fam)if(m.grp)S.kc.at[m.id]=S.place;tab='act';Q=[];document.getElementById('modal').hidden=true;render()});await sleep(1500);
 r.push(...await p.evaluate(()=>{const {N,want,miss,empty}=window.__cr;const out=[];const X=[];kc3Acts(X);const els=[...document.querySelectorAll('body *')].filter(e=>e.offsetParent||e.getClientRects().length);
  for(const x of X){const n=String(x.n).replace(/<[^>]+>/g,'');const C=els.filter(e=>e.innerText&&e.innerText.includes(n)&&/tốn|cần|được/i.test(e.innerText)).sort((a,b)=>a.innerText.length-b.innerText.length);
   const shown=C[0]?C[0].innerText.replace(/\n/g,' | '):'';const line=(x.c&&fmt(x.c)?'tốn: '+fmt(x.c)+' · ':'')+(x.w&&fmt(x.w)?'thành: '+fmt(x.w)+' · ':'')+(x.x||'');
   if(!shown)continue;/* a card not dealt at this place this month */out.push({fam:'act',name:n,opt:n,miss:miss(shown,want([x.c,x.w,x.l],x.x||'')),khong:empty(shown,line)})}return out}));
 const bad=r.filter(x=>x.miss.length||x.khong);const fam={};for(const x of r){const f=x.fam.split(' ')[0];fam[f]=fam[f]||[0,0,0];fam[f][0]++;if(x.miss.length)fam[f][1]++;if(x.khong)fam[f][2]++}
 console.log('| family | choices | a number not shown | «Tốn: không» |\n|---|---|---|---|');for(const f in fam)console.log(`| ${f} | ${fam[f].join(' | ')} |`);
 if(LIST)for(const x of bad)console.log(`${x.fam} ${x.name} «${String(x.opt).replace(/<[^>]+>/g,'')}»: ${x.miss.join('; ')}${x.khong?' + Tốn: không':''}${process.env.CR_DEBUG?'  ⟨'+x.shown+'⟩':''}`);
 console.log(`choices ${r.length} · with a hidden number ${r.filter(x=>x.miss.length).length} · Tốn: không ${r.filter(x=>x.khong).length} · page errors ${errs.length}`);
 await b.close();process.exit(bad.length||errs.length?1:0)})();
