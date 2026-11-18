/* E7b render/voice test: every NRASK entry of jnrask_b.js through the j72 offer + card, several asker kinds */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();p.setDefaultTimeout(0);
 p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});
 await p.waitForFunction(()=>typeof start==='function'&&typeof nrMaidL==='function',null,{timeout:0});await p.waitForTimeout(1500);
 if(!(await p.evaluate(()=>typeof nrAskFill==='function')))await p.addScriptTag({path:__dirname+'/hook-local.js'});
 const R=await p.evaluate(()=>{document.getElementById('title').hidden=true;
  const boot=k=>{for(let t=0;t<3;t++){quiet=true;window.__forceOrigin=k;start();quiet=false;Q.length=0;if(S&&S.origin)return true}return false};
  const month=n=>{for(let m=0;m<n;m++){if(S.dead){S.dead=false;S.suc=60}const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){Q.length=0;used=0;try{nextBuoi()}catch(e){break}}Q.length=0}};
  boot('muoi');month(14);
  const txt=h=>String(h||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  const where={};for(const r in ROAD14)for(const n in ROAD14[r])where[ROAD14[r][n]]=[r,+n];
  const ids=Object.keys(NRASK).filter(id=>/^(nc|td|ch|thd|cnv)_/.test(id));
  const L=liveRivals(true).filter(v=>!v.coop);const lo=L.find(v=>!v.queen&&v.rank<=S.rank),hi=L.find(v=>!v.queen&&v.rank>S.rank),queen=rivals.find(v=>v.alive&&v.queen&&!v.out);
  const own=S.staff.find(s=>s.role==='maid'),oth=allServ().find(s=>s.role==='maid'&&ownerOf(s)!==S);
  const As=[['lower consort',lo,'rv',/(^|[^\p{L}])(muội|Muội)(?![\p{L}])/u],['higher consort',hi,'rv',/(^|[^\p{L}])(tỷ|Tỷ)(?![\p{L}])/u],['Hoàng hậu',queen,'hh',/bổn cung|Bổn cung/],['own maid',own,'sv',/nô tỳ|Nô tỳ/],['trusted maid',S.maid,'maid',/nô tỳ|Nô tỳ/],['other maid',oth,'rsv',/nô tỳ|Nô tỳ/]].filter(a=>a[1]);
  const bad=[],rows=[];let cards=0;const q=q72();const B0=L.find(v=>v!==lo&&v!==hi&&!v.queen);
  for(const id of ids){const e=NRASK[id];const [r,n]=where[id]||[];if(!r){bad.push(id+': no chapter');continue}
   if(nrKind(nrCh(r,n))!==e.k)bad.push(id+': kind not used');
   const maid=/^cnv_/.test(id);
   for(const [lab,o,rk,self] of As){const sv=rk==='sv'||rk==='rsv'||rk==='maid';if(maid!==sv)continue;const ri=rk==='maid'?null:sv?o.sid:o.id;
    const keep=o.nr;o.nr={o:r.split('_')[0],r,n,k:0,t:S.turn,h:n,hs:0,hb:0,c:null,e:'',x:0,l:[]};
    const AA=q72A(rk,ri);if(!AA){o.nr=keep;continue}const x=q72Make(T72I['nr_'+e.k],AA);if(!x){o.nr=keep;continue}x.p={nr:r,nn:n};
    if(B0&&!maid){x.bk='rv';x.bi=B0.id}
    const d=PEND.q72o({x,how:'fu'});if(!d){bad.push(id+' '+lab+': no offer');o.nr=keep;continue}cards++;
    q.a.push(x);let card='';try{card=q72Card(x)}catch(er){card='ERR '+er.message}q.a.splice(q.a.indexOf(x),1);
    const H=txt(d.t||d.h),C=txt(card),O=(d.o||[]).map(z=>txt(z.n)+' / '+txt(z.x)).join(' | ');const all=H+' '+C+' '+O;
    const quote=(H.match(/“([^”]*)”/)||[,''])[1];const f=[];
    if(!quote)f.push('no quote');if(!self.test(quote))f.push('self-word');if(/\{\w+\}/.test(all))f.push('raw token');if(/%|\d+ ?%/.test(all))f.push('%');
    if(/[.!?] +\p{Ll}/u.test(quote))f.push('lowercase after stop');if(/^\p{Ll}/u.test(quote))f.push('lowercase start');
    if(!C.includes(nrAskFill(e.o[0][0],q72X(x)))||!C.includes(nrAskFill(e.o[1][0],q72X(x))))f.push('labels missing on card');
    if(/kẻ kia/.test(quote)&&!maid&&B0)f.push('B fallback while rival set');
    if(f.length)bad.push(id+' '+lab+': '+f.join('+')+' | '+quote.slice(0,80));
    if(lab==='lower consort'||lab==='other maid')rows.push(id+' ['+e.k+'] '+quote);o.nr=keep}}
  return{ids:ids.length,cards,bad,rows,asker:As.map(a=>a[0])}});
 console.log(`entries ${R.ids} · cards rendered ${R.cards} · askers ${R.asker.join(', ')} · faults ${R.bad.length} · page errors ${errs.length}`);
 for(const x of R.bad.slice(0,40))console.log('  FAIL',x);for(const e of errs.slice(0,5))console.log('  ERR',e);
 fs.writeFileSync(__dirname+'/render-rows.txt',R.rows.join('\n'));await b.close();process.exit(R.bad.length||errs.length?1:0)})();
