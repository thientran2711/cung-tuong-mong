/* bang-words SCREEN test (E40r review): plays real lives of every foreign land (Cao Ly nc · Ba Tư = new bd · Bắc Địch = bd on an old
   premise · Phù Tang pf) through the home phase + palace chapters (beats forced as in caoly-oldsave.js), grabs every line the player can
   read (whole page text after each buổi + the story / act / rel tabs), and flags another land's identity words and any raw {token}.
   usage: node dev/test/bang-words/screen.js [url] [--seeds N] [--months N]   → exit 1 on a hit */
const {chromium}=require('playwright');const path=require('path');
const arg=(k,d)=>{const i=process.argv.indexOf(k);return i>0?+process.argv[i+1]:d};
const url=process.argv[2]&&!/^--/.test(process.argv[2])?process.argv[2]:'file://'+path.join(__dirname,'../../../index.html');
const SEEDS=arg('--seeds',3),MONTHS=arg('--months',45);
/* identity words of each land (a word true for every land — ngựa, chợ biên, sứ đoàn — is not here; Bắc Địch / Cao Ly as a NEIGHBOUR
   country stays allowed, so the bare country names are not flagged, only the princess-home words) */
const W={steppe:/thảo nguyên|Khả hãn|Khả đôn|Phụ hãn|sữa ngựa|canh sữa dê|trà sữa|lều nỉ|lều da|trướng vàng|kim trướng|đèn bơ/i,
 korea:/Nhiên Đăng|Khai Kinh|nhân sâm Cao Ly|lão Phác|Thế tử huynh|Vương thúc|sông Áp Lục/i,
 persia:/lửa thánh|Hỏa giáo|lạc đà|Vương trung vương|Tô Lận|Nô Nhụ|đền lửa/i,
 japan:/Thiên hoàng|Nại Lương|đền Thần|Nan Ba|nước thanh tẩy/i};
const BAD={nc:['steppe','persia','japan'],bt:['steppe','japan'],bd:['korea','persia','japan'],pf:['steppe','persia']};
(async()=>{const b=await chromium.launch();let hits=0;const rows=[];const errs=[];
 const ONLY=(process.argv.find(x=>/^--land=/.test(x))||'').slice(7);for(const L of ['nc','bt','bd','pf'].filter(x=>!ONLY||ONLY.split(',').includes(x)))for(let s=0;s<SEEDS;s++){
  const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(L+' '+e.message.slice(0,160)));
  await p.goto(url,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(800);
  const r=await p.evaluate(async([L,MONTHS,WS])=>{const W={};for(const k in WS)W[k]=new RegExp(WS[k],'i');const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}
   SLOT=3;window.__forceOrigin=L==='bt'?'bd':L;document.getElementById('title').hidden=true;
   /* Bắc Địch legacy: the old premises come back into the roll for this life only (a save already on BD_OLD keeps them) */
   if(L==='bd'){const a0=arcIds67;arcIds67=function(o){const r=a0.apply(this,arguments);return o==='bd'?BD_OLD.slice():r}}
   if(L==='bt'){const a0=arcIds67;arcIds67=function(o){const r=a0.apply(this,arguments);return o==='bd'?r.filter(id=>!BD_OLD.includes(id)):r}}
   quiet=true;start();quiet=false;await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin)||++n>150)r();else setTimeout(t,100)};t()});
   const seen=new Set(),out=[],arcs=new Set();
   const grab=tag=>{const t=(document.body.innerText||'').split('\n');for(const x of t){const y=x.trim();if(!y||seen.has(y))continue;seen.add(y);out.push(tag+'\t'+y)}};
   const tabs=()=>{for(const t of['story','act','rel','go']){try{tab=t;render();grab('tab:'+t)}catch(e){}}};
   if(!S.kc&&typeof kcOk==='function'&&kcOk(S.origin.k))try{kcInit()}catch(e){}
   grab('start');tabs();
   for(let m=0;m<MONTHS;m++){if(m===6&&S.kc&&!S.kc.inPal&&typeof kc2Enter==='function'){try{Q.length=0;kc2Enter(7);grab('enter')}catch(e){out.push('err\tkc2Enter '+e.message)}}const t=S.turn;for(let g=0;g<40&&S&&S.turn===t;g++){Q.length=0;used=0;try{nextBuoi()}catch(e){out.push('err\t'+e.message);break}grab('buoi')}
    if(m>6&&S.st&&S.st.ch){const M0=S.st.M;if(!M0||M0.done){try{S.st.ms=null;chAdvance67({k:(m%3)-1});grab('chapter')}catch(e){out.push('err\tchAdvance '+e.message)}}}
    const A=S&&S.st&&S.st.M;if(A&&(A.a||A.id))arcs.add(A.a||A.id);if(A&&!A.done&&!A.cur&&A.nb){A.due=0;try{fireBeat67(A)}catch(e){}}
    if(A&&A.cur){try{const bd=beatDef67(A,A.cur);grab('beat');const O=opts67(A,bd);const i=(m+L.length)%Math.max(1,O.length);res67(thKey67(A),A.cur,i,O[i]&&O[i].o!=null?oOf67(A,O[i],bd):100);grab('res')}catch(e){}}
    if(S&&S.st&&S.st.ms)S.st.ms.t0=-99;if(m%3===0)tabs()}
   tabs();const prem=(S.st.f14&&S.st.f14.road)||'';
   const bad=[];for(const line of out){const x=line.split('\t').slice(1).join(' ');if(/\{[a-zA-Z]\w*\}/.test(x))bad.push('raw-token\t'+line.slice(0,240));for(const w of WS.__bad)if(W[w].test(x))bad.push(w+'\t«'+x.match(W[w])[0]+'»\t'+line.slice(0,260))}
   return{ch:S.st.ch&&S.st.ch.i,kcLeft:!!S.kc&&!S.kc.inPal,land:S.origin.land,k:S.origin.k,prem,legacy:typeof bdLegacy==='function'?bdLegacy():null,arcs:[...arcs],n:out.length,kc:!!S.kc,bad}},[L,MONTHS,Object.assign(Object.fromEntries(Object.entries(W).map(([k,v])=>[k,v.source])),{__bad:BAD[L]})]);
  hits+=r.bad.length;rows.push(`${L}#${s}\t${r.land}\tpremise ${r.prem}${L==='bd'||L==='bt'?' legacy='+r.legacy:''}\tarcs ${r.arcs.join(',')}\tch ${r.ch} home ${r.kcLeft}\tlines ${r.n}\thits ${r.bad.length}`);
  for(const x of r.bad)console.log(L+'#'+s+'\t'+x);console.log(rows[rows.length-1]);await ctx.close()}
 console.log(rows.join('\n'));if(errs.length)console.log('page errors',errs.length,errs.slice(0,4));console.log(hits||errs.length?'FAIL':'PASS');await b.close();process.exit(hits||errs.length?1:0)})();
