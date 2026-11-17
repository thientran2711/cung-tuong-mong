/* npc-roads-fix: whole-group scan of the six r1 fault families on consorts + U2 maids/eunuchs + U3 men (reports/npc-roads-fix.md).
   usage: node dev/test/npc-roads-fix-scan.js <url> [label]   — run on the build before and after the fix; prints one table row per family.
   F1 month hook   : NPC roads of maids/eunuchs/men also run in a kẻ-hầu life (cnv, 24 months): chapters played > 0
   F2 endings      : tags an NPC can be dealt (every road of every NPC kind, every sign): with «ngươi» / rare ✦ → 0
   F3 «lần trước»  : a first nr_* offer card from every asker kind shows «chuyện lần trước» → 0
   F4 voice        : help cards per asker kind: wrong self-word, «ta» in her quote, lowercase after a full stop inside the quote,
                     a man/eunuch named «nàng» in options/steps/loss/result lines → 0
   F5 ONE CORE     : typed numbers in jnroad*.js code (option odds/losses, odds clamp, stat/loyal defaults, pick sizes) → 0 (source scan)
   F6 help hold    : a maid/eunuch/man/consort whose nr_* quest is active plays the chapter anyway → 0; an unshown queued one is withdrawn */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const [,,URL,LABEL]=process.argv;
(async()=>{const b=await chromium.launch();const errs=[];
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(0);
 p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});
 await p.waitForFunction(()=>typeof start==='function'&&typeof nrMaidL==='function'&&typeof nrMenL==='function',null,{timeout:0});await p.waitForTimeout(1500);
 const R=await p.evaluate(()=>{document.getElementById('title').hidden=true;
  const boot=k=>{for(let t=0;t<3;t++){quiet=true;window.__forceOrigin=k;start();quiet=false;Q.length=0;if(S&&S.origin)return true}return false};
  const month=n=>{for(let m=0;m<n;m++){if(S.dead){S.dead=false;S.suc=60}const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){Q.length=0;used=0;try{nextBuoi()}catch(e){break}}Q.length=0}};
  const chs=()=>{let n=0;for(const s of nrMaidL().concat(nrServL('eunuch')))if(s.nr)n+=s.nr.l.length;for(const e of nrMenL())if(e.p.nr)n+=e.p.nr.l.length;let c=0;for(const v of rivals)if(v.nr)c+=v.nr.l.length;return[n,c]};
  const out={};
  /* F1: a kẻ-hầu life */
  boot('cnv');const srv=typeof isSrv==='function'&&isSrv();month(24);const [sm,sc]=chs();out.F1={srv,servMen:sm,consorts:sc};
  /* palace life for the rest */
  boot('muoi');month(14);
  /* F2: every tag an NPC can be dealt */
  const roads=new Set();for(const o of Object.keys(BAL.nroad.org).flatMap(c=>BAL.nroad.org[c].map(z=>z[0])).concat(['cn','cnv']))for(const r of nrRoads(o))roads.add(r);
  const men=Object.keys(NRM);const bad2=[];let n2=0;
  for(const r of [...roads,...men])for(let n=4;n<=11;n++){const A=nrCh(r,n);if(!A)continue;for(const k of [1,0,-1]){const seen=new Set();for(let i=0;i<40;i++)seen.add(men.includes(r)?nrEnd(A,k,'hắn'):nrEnd(A,k));
    for(const t of seen){if(!t)continue;n2++;if(/\bngươi\b|\bNgươi\b|✦/.test(t))bad2.push(r+'.'+n+': '+t)}}}
  out.F2={tags:n2,bad:bad2.length,ex:bad2.slice(0,4)};
  /* asker samples: consort, own maid, other house maid, trusted maid, staff eunuch, S.men man / Vương gia, court men, house head */
  const q=q72();const tids=Object.keys(T72I).filter(t=>/^nr_/.test(t));
  const own=S.staff.find(s=>s.role==='maid'),oth=allServ().find(s=>s.role==='maid'&&ownerOf(s)!==S),eu=allServ().find(s=>s.role==='eunuch'&&ownerOf(s)===S)||allServ().find(s=>s.role==='eunuch');
  const mL=nrMenL();const man=mL.find(e=>e.g==='men'&&e.p.role!=='Vương gia'),vg=mL.find(e=>e.g==='men'&&e.p.role==='Vương gia'),off=mL.find(e=>e.g==='off'),ct=mL.filter(e=>e.g==='court'&&e.a);
  const cons=liveRivals(true).find(v=>!v.queen),queen=rivals.find(v=>v.alive&&v.queen&&!v.out);
  const A=[];const add=(lab,o,rk,ri,self,male)=>{if(o)A.push({lab,o,rk,ri,self,male})};
  add('consort',cons,'rv',cons&&cons.id,/\b(tỷ|muội|Tỷ|Muội)\b/,0);add('Hoàng hậu',queen,'hh',queen&&queen.id,/bổn cung|Bổn cung/,0);
  add('own maid',own,'sv',own&&own.sid,/nô tỳ|Nô tỳ/,0);add('other maid',oth,'rsv',oth&&oth.sid,/nô tỳ|Nô tỳ/,0);add('trusted maid',S.maid,'maid',null,/nô tỳ|Nô tỳ/,0);
  if(eu)add('staff eunuch',eu,ownerOf(eu)===S?'sv':'rsv',eu.sid,/nô tài|Nô tài/,1);
  if(man)add('man '+man.p.role,man.p,'man',man.p.id,/\bthần\b|\bThần\b/,1);if(vg)add('Vương gia',vg.p,'man',vg.p.id,/bản vương|Bản vương/,1);
  if(off)add('house head',off.p,'off',off.c,/\bthần\b|\bThần\b/,1);for(const e of ct)add('court '+e.a[0],e.p,e.a[0],e.a[1],e.a[0]==='doc'?/\bthần\b|\bThần\b/:/nô tài|Nô tài/,1);
  const F3=[],F4=[];let cards=0;const txt=h=>String(h||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
  for(const a of A){const N=a.o.nr||(a.rk==='rv'||a.rk==='hh'?nrInit(a.o):a.rk==='man'||a.rk==='off'||a.rk==='doc'||a.rk==='eun'||a.rk==='ksp'?nrMenInit(mL.find(e=>e.p===a.o)):nrMInit(a.o));if(!N)continue;
   for(const tid of tids){const AA=q72A(a.rk,a.ri);if(!AA)continue;const x=q72Make(T72I[tid],AA);if(!x)continue;x.p={nr:N.r,nn:N.n};
    const d=PEND.q72o({x,how:'fu'});if(!d)continue;cards++;q.a.push(x);let card='';try{card=q72Card(x)}catch(e){card=''}q.a.splice(q.a.indexOf(x),1);
    const X=q72X(x);const res=(nrHelped(X,1)||'')+' '+(nrHelped(X,-1)||'');N.hs=0;N.hb=0;
    const all=txt(d.t||d.h)+' '+(d.o||[]).map(o=>txt(o.n)+' '+txt(o.x)).join(' ')+' '+txt(card)+' '+res;
    if(/chuyện lần trước/.test(all))F3.push(a.lab+' '+tid);
    const quote=(txt(d.t||d.h).match(/“([^”]*)”/)||[,''])[1];const f=[];
    if(!a.self.test(quote))f.push('self-word');if(/\bta\b/.test(quote))f.push('«ta»');if(/[.!?] +[a-zà-ỹđ]/.test(quote))f.push('lowercase after stop');
    const mt=(txt(card)+' '+res+' '+(d.o||[]).map(o=>txt(o.x)).join(' ')).match(/.{0,30}\bnàng\b(?! ấy).{0,12}/);if(a.male&&mt)f.push('man called nàng «'+mt[0]+'»');
    if(f.length)F4.push(a.lab+' '+tid+': '+f.join('+')+' | '+quote.slice(0,90))}}
  out.F3={cards,bad:F3.length,ex:F3.slice(0,3)};const by={};for(const z of F4){const k=z.split(' nr_')[0];by[k]=(by[k]||0)+1}out.F4={kinds:A.map(a=>a.lab),cards,bad:F4.length,by,ex:F4.slice(0,6)};
  /* F6: active quest holds the chapter; an unshown queued one is withdrawn */
  const F6=[];let n6=0;
  const hold=(lab,o,rk,ri,init)=>{const N=o.nr||init();if(!N)return;N.x=0;N.n=N.n||nrNext(N.r,4);if(!N.n)return;N.h=N.n;N.hs=1;N.t=S.turn;const L0=N.l.length;
    const tid=Object.keys(T72I).find(t=>/^nr_/.test(t));const x={u:++q.u,tid,rk,ri,bk:null,bi:null,st:0,t0:wk(),dl:wk()+6,p:{nr:N.r,nn:N.n},log:[]};q.a.push(x);
    window.__nroff=0;try{nrMonth()}catch(e){}n6++;if(N.l.length!==L0)F6.push(lab+': played during an active quest');q.a.splice(q.a.indexOf(x),1);
    q.ch.push(Object.assign({},x,{at:wk()+99}));N.t=S.turn;try{nrMonth()}catch(e){}n6++;if(q.ch.some(c=>c.u===x.u))F6.push(lab+': unshown request not withdrawn');if(N.l.length===L0)F6.push(lab+': did not play after the request was withdrawn');
    for(let i=q.ch.length-1;i>=0;i--)if(q.ch[i].u===x.u)q.ch.splice(i,1)};
  if(cons)hold('consort',cons,'rv',cons.id,()=>nrInit(cons));if(own)hold('own maid',own,'sv',own.sid,()=>nrMInit(own));if(oth)hold('other maid',oth,'rsv',oth.sid,()=>nrMInit(oth));
  if(eu)hold('staff eunuch',eu,ownerOf(eu)===S?'sv':'rsv',eu.sid,()=>nrMInit(eu));if(man)hold('man',man.p,'man',man.p.id,()=>nrMenInit(man));if(off)hold('house head',off.p,'off',off.c,()=>nrMenInit(off));
  out.F6={checks:n6,bad:F6.length,ex:F6};
  return out});
 /* F5: source scan of the NPC-road code (the men template data rows are text, not numbers) */
 const root=path.resolve(__dirname,'../build');const src=['jnroad.js','jnroadm.js'].map(f=>fs.existsSync(path.join(root,f))?fs.readFileSync(path.join(root,f),'utf8'):'').join('\n');
 const pats=[[/\b(?:p|l|rb):\s*-?[1-9]\d*/g,'option odds/loss/bond'],[/\{(?:sung|danh|duc|suc):-\d+\}/g,'typed loss/cost'],[/no:\{r:-?\d+\}/g,'refusal bond'],[/,\s*5\s*,\s*95\s*\)/g,'odds clamp 5..95'],[/\|\|\s*(?:40|50)\)/g,'stat/loyal default'],[/Math\.min\(\d+,/g,'pick size']];
 const F5=[];for(const [re,lab] of pats){const m=src.match(re)||[];if(m.length)F5.push(`${lab} ×${m.length}`)}
 R.F5={bad:F5.reduce((a,s)=>a+ +s.split('×')[1],0),ex:F5};
 console.log(`== ${LABEL||URL}`);for(const k of ['F1','F2','F3','F4','F5','F6'])console.log(k,JSON.stringify(R[k]));
 console.log('page errors',errs.length,errs.slice(0,3));await b.close()})();
