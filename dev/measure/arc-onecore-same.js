/* arc-onecore-same (review/one-core-arcs): BEFORE / AFTER proof that moving the story-arc numbers into BAL.arc (jbalarc.js) changed no value.
   Builds the game twice — OLD = dev/build at a git ref (default 16d4925f, before the move), NEW = the working tree — loads each built
   dev/index.html in Chromium (direct mode) and dumps, for every ARC67 arc (j67 / j96 / jorigins …) and every GB67 shared beat:
     every option's and ending's fields (canonical JSON, functions as "fn"), every odds o(A) on many seeded random lives (=== bit-identical),
     every go: closure run on seeded lives with the effect calls (relAdd, oanAdd, e67ally …) stubbed to RECORD their arguments (call logs ===),
     the rare-ending catalogue R97 (j97) and the route / story extras listed in EXTRA below.
   usage: node dev/measure/arc-onecore-same.js [old-ref]   (from the repo root; prints the before/after table, exit 1 on any difference) */
const fs=require('fs'),cp=require('child_process'),path=require('path'),os=require('os');
const REF=process.argv[2]||'16d4925f50baca7dc1b19c708d1df332ed0b6051';
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'arcsame-'));
cp.execSync(`git archive ${REF} dev/build dev/site/kvfallback.js | tar -x -C ${tmp}`,{stdio:'inherit'});
cp.execSync(`python3 ${tmp}/dev/build/assemble.py`,{stdio:'ignore',env:{...process.env,CTM_IMG_BASE:''}});
cp.execSync(`python3 dev/build/assemble.py`,{stdio:'ignore',env:{...process.env,CTM_IMG_BASE:''}});
function DUMP(){const out={opt:{},end:{},odds:{},go:{},rare:{},err:[]};
 let seed=7;const R=()=>(seed=(seed*1103515245+12345)%2147483648)/2147483648;Math.random=R;
 try{crypto.getRandomValues=a=>{for(let i=0;i<a.length;i++)a[i]=Math.floor(R()*4294967296);return a}}catch(e){}
 const canon=v=>typeof v==='function'?'fn':Array.isArray(v)?v.map(canon):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,canon(v[k])])):v;
 let LOG=[];const arg=a=>typeof a==='number'||typeof a==='string'||typeof a==='boolean'||a==null?a:a===S?'S':(a.id!=null?'#'+a.id:'obj');
 for(const n of ['relAdd','oanAdd','affAdd','kcAf','tdPowAdd','rdOan','rdRel','e67dad','e67bien','e67kho','e67ally','e67pun','e67foe','e67drop','log','evA','harmTxt'])
  try{const f=eval(n);if(typeof f==='function')eval(`${n}=function(){LOG.push(["${n}",...[...arguments].map(arg)]);return "${n}"}`)}catch(e){}
 const V=k=>({id:k.length,name:'V'+k,alive:true,rank:3,rel:10,oan:5,ro:{},kids:[],inv:[],loyal:40});
 try{rv67=(A,k)=>V(k||'v');RV=id=>V('x'+id)}catch(e){out.err.push('stub rv67 '+e.message)}
 const ST=['th','duc','sung','danh','bac','suc','tamco','tai','mat','hh','sac','an','loy','tam','tin','age','rank'];
 const life=()=>{const s={arts:{y:Math.floor(R()*6),thi:Math.floor(R()*6),vu:Math.floor(R()*6)},st:{f14:{fb:{}},v2:1},ro:{},inv:[],logs:[],month:1,year:1,tuan:0,turn:5};
  for(const k of ST)s[k]=Math.floor(R()*130)-15;if(R()<.3)delete s.mat;return s};
 const FL=['obey','own','cold','keep','clean','pact','help','quiet','greed','deal','trust','fight','loyal','spy','brave','calm'];
 const AA=()=>{const f={};for(const g of FL)if(R()<.5)f[g]=1;return {f,sc:Math.floor(R()*5),act:{v:1,v2:2,hh:3},a:'x',i:0,hist:[],used:[]}};
 const S0=S;
 const walkO=(key,o)=>{out.opt[key]=canon(o);
  if(typeof o.o==='function'){const r=[];for(let t=0;t<60;t++){S=life();const A=AA();let v;try{v=o.o(A)}catch(e){v='ERR '+e.message}r.push(v)}out.odds[key]=r}
  if(typeof o.go==='function'){const r=[];for(let t=0;t<6;t++){S=life();LOG=[];const A=AA();let v;try{v=o.go(A,t%2===0)}catch(e){v='ERR '+e.message}r.push([v,LOG])}out.go[key]=r}};
 for(const id of Object.keys(ARC67).sort()){const a=ARC67[id];
  for(const bk of Object.keys(a.B||{}))(Array.isArray(a.B[bk].o)?a.B[bk].o:[]).forEach((o,i)=>walkO(`${id}.${bk}[${i}]`,o));
  for(const ek of Object.keys(a.E||{}))walkO(`${id}.E.${ek}`,a.E[ek]);
  const rest={...a};delete rest.B;delete rest.E;out.opt[id+'.arc']=canon(rest)}
 for(const bk of Object.keys(GB67))(GB67[bk].o||[]).forEach((o,i)=>walkO(`G.${bk}[${i}]`,o));
 try{for(const id of Object.keys(R97)){const d=R97[id];out.rare[id]=canon(d);const r=[];for(let t=0;t<40;t++){S=life();const A=AA();let v;try{v=d.x&&d.x[0](A)}catch(e){v='ERR '+e.message}r.push(v)}out.rare[id+'.x']=r;
  if(typeof d.go==='function'){const g=[];for(let t=0;t<4;t++){S=life();LOG=[];let v;try{v=d.go(AA())}catch(e){v='ERR '+e.message}g.push([v,LOG])}out.rare[id+'.go']=g}}}catch(e){out.err.push('R97 '+e.message)}
 try{if(typeof window.ARC_SAME_EXTRA==='function')out.extra=window.ARC_SAME_EXTRA({life,AA,canon,R,LOG:()=>LOG,setLog:l=>LOG=l})}catch(e){out.err.push('extra '+e.message)}
 S=S0;return JSON.stringify(out)}
(async()=>{const {chromium}=require('playwright');const b=await chromium.launch();
 const dump=async f=>{const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+f,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:60000});
  const s=await p.evaluate(`(${DUMP})()`);await p.close();return [JSON.parse(s),errs]};
 const [O,eo]=await dump(path.join(tmp,'dev/index.html')),[N,en]=await dump(path.resolve('dev/index.html'));await b.close();
 const bad=[];const J=JSON.stringify;const cnt={};
 for(const sec of ['opt','end','odds','go','rare']){const a=O[sec]||{},c=N[sec]||{};cnt[sec]=Object.keys(a).length;
  for(const k of new Set([...Object.keys(a),...Object.keys(c)]))if(J(a[k])!==J(c[k]))bad.push(`${sec} ${k}: ${J(a[k]).slice(0,160)} → ${J(c[k]).slice(0,160)}`)}
 if(J(O.err)!==J(N.err))bad.push('dump errors differ '+J(O.err)+' → '+J(N.err));
 const nOdds=Object.values(O.odds).reduce((s,x)=>s+x.length,0),nGo=Object.values(O.go).reduce((s,x)=>s+x.length,0);
 console.log(`options+endings+arcs ${cnt.opt} (fields deep-equal) · odds fns ${cnt.odds} (${nOdds} trials ===) · go closures ${cnt.go} (${nGo} runs, call logs ===) · rare entries ${Object.keys(O.rare).length}`);
 console.log('page errors OLD',eo.length,'NEW',en.length,en.slice(0,3));
 fs.rmSync(tmp,{recursive:true,force:true});
 console.log(bad.length?'DIFFERENT ('+bad.length+'):\n  '+bad.slice(0,40).join('\n  '):'SAME: every value before = after');process.exit(bad.length?1:0)})();
