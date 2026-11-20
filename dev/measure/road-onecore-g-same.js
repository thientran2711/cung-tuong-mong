/* road-onecore-g-same (review/one-core-roads): BEFORE / AFTER proof for road-onecore-g-move.js (option sc + go amounts, ending k / sc / go
   amounts, rare finale go amounts moved into BAL.road.fx / BAL.road.rare). Copy of road-onecore-same.js, extended:
   loads the 9 jrd_<origin>.js + jend14.js twice in separate sandboxes — OLD = the files at a git ref (default 16d4925f, before the move),
   NEW = the working tree — and compares
     · every option's c / w / l / sc / sf / f / e and every ending's fx / k / sc / tag (deep-equal),
     · every option's odds o(A) on random lives (===, bit-identical),
     · every option go(A,ok), ending go(A) and rare finale go(A) run on many random lives with every effect function STUBBED to RECORD its
       name + arguments (rdOan / rdRel go through the real jroad.js code into recording relAdd / oanAdd; e67*, apply, ap67, srvMerit …
       record) → the call log, the go's return value and the life's state after the call must be identical (===).
   Unknown globals the chapter code reads are stubbed as recording functions on first use (same in both sandboxes).
   usage: node dev/measure/road-onecore-g-same.js [old-ref] [trials]   (from the repo root; exit 1 on any difference) */
const fs=require('fs'),vm=require('vm'),cp=require('child_process');
const REF=process.argv[2]||'16d4925f50baca7dc1b19c708d1df332ed0b6051',TRIALS=+(process.argv[3]||60);
const FILES=['jrd_tt.js','jrd_dtq.js','jrd_muoi.js','jrd_cn.js','jrd_nc.js','jrd_td.js','jrd_ch.js','jrd_thd.js','jrd_cnv.js','jend14.js'];
const rd=(ref,f)=>ref?cp.execSync(`git show ${ref}:dev/build/${f}`,{encoding:'utf8',maxBuffer:1<<26}):fs.readFileSync('dev/build/'+f,'utf8');
const T={S:null,ends:{},rival:3,log:[],seed:1,P:null};/* the trial state both sandboxes read */
let rnd=12345;const R=()=>(rnd=(rnd*1103515245+12345)%2147483648)/2147483648;
const J=x=>{try{return JSON.stringify(x,(k,v)=>typeof v==='function'?'fn':v)}catch(e){return 'cyc'}};
const recName=new Set();
function mkCtx(){const rec=n=>function(){T.log.push(n+'('+J([...arguments].map(a=>a&&typeof a==='object'&&'id' in a?'#'+a.id:a))+')');return undefined};
 const base={console,Math:Object.create(Math,{random:{value:()=>{T.seed=(T.seed*16807)%2147483647;return T.seed/2147483647}}}),JSON,Object,Array,Number,String,Boolean,Error,isFinite,Set,Map,parseInt,parseFloat,
  ARC67:{},RTHEME67:{},RANKS:new Array(12).fill(0).map((_,i)=>({n:'R'+i})),RD97L:[],PEND:{},MS67:{},
  rdK:()=>0,rdPrev:()=>"",qOn:()=>true,rdEnd:n=>T.ends[n]||"",
  rv67:(A,k)=>T.P[k]||null,castRv67:()=>true,RV:id=>Object.values(T.P).find(p=>p&&p.id===id)||null,f14:()=>T.S.st.f14,son67:()=>T.P.son,mySons:()=>T.P.son?[T.P.son]:[],
  liveRivals:()=>[T.P.v,T.P.foe].filter(Boolean),rvOk67:()=>true,nsrv67:()=>!T.S.srv,isSrv:()=>!!T.S.srv,isSrv67:()=>!!T.S.srv,
  cl:(x,a,b)=>Math.max(a,Math.min(b,x)),fmt:o=>J(o),fill67:t=>t,roll:x=>{T.log.push('roll('+x+')');return R2()<x/100},
  relAdd(p,q,n){T.log.push('relAdd('+(p&&p.id)+','+(q&&q.id)+','+n+')')},oanAdd(p,q,n){T.log.push('oanAdd('+(p&&p.id)+','+(q&&q.id)+','+n+')')},
  log(x){T.log.push('log:'+x)}};
 let R2s=7;const R2=()=>(R2s=(R2s*48271)%2147483647)/2147483647;base.__R2reset=()=>{R2s=7};
 const ctx=vm.createContext(base);Object.defineProperty(ctx,'S',{get:()=>T.S,set:v=>{T.S=v}});ctx.window=ctx;ctx.__rec=rec;return ctx}
function stub(ctx,n){if(n in ctx)throw Error('stub loop '+n);ctx[n]=ctx.__rec(n);recName.add(n)}
const errKinds={};
const BALX=t=>t.replace('Object.assign(BAL,','this.BAL=this.BAL||{st14:{parts:[[1,3],[4,11]]},tc:{hienAge:6},ntRise:{at:60}};Object.assign(BAL,');
function load(ref){const Jr=rd(ref,'jroad.js');const src=Jr.slice(Jr.indexOf('const ROAD14'),Jr.indexOf('function rdOn'));
 const all=src+'\n'+FILES.map(f=>rd(ref,f)).join('\n')+'\n;this.__A=ARC67;this.__R=RD97L';const bal=BALX(rd(ref,'jbalroad.js'));
 /* a load-time global the code reads but the stubs lack: stub it (recording) and load again on a fresh context */
 for(let k=0;k<400;k++){const ctx=mkCtx();for(const n of recName)stub(ctx,n);vm.runInContext(bal,ctx);
  try{vm.runInContext(all,ctx);return {ctx}}catch(e){const m=/^(\w[\w$]*) is not defined$/.exec(e.message);if(e.name==='ReferenceError'&&m&&!recName.has(m[1])){recName.add(m[1]);continue}throw e}}
 throw Error('too many stubs')}
let O=load(REF),N=load(null);const nStub=recName.size;O=load(REF);N=load(null);/* same stub set in both */
const OLD=O.ctx.__A,NEW=N.ctx.__A,ROLD=O.ctx.__R,RNEW=N.ctx.__R;
const ST=['th','duc','sung','danh','bac','suc','tamco','tai','mat','hh','sac','an','loy','rel','ghen','tam','tin','age','nt'];
function person(id){return {id,name:'P'+id,rank:Math.floor(R()*10),alive:true,sung:Math.floor(R()*100),fond:Math.floor(R()*100),enemy:R()<.5,kids:R()<.5?[{alive:true,sex:R()<.5?'m':'f',name:'K'}]:[],age:20+Math.floor(R()*30)}}
function life(){const S={rank:Math.floor(R()*10),arts:R()<.5?{y:Math.floor(R()*6)}:null,st:{f14:{fb:{},ends:{},act:{}}},inv:[],kids:[],thDead:R()<.3,srv:R()<.3?{risen:R()<.3}:null,turn:30};
 for(const k of ST)S[k]=Math.floor(R()*130)-15;for(const k of ['cn_ban.deal','cn_than.deal','muoi_lau.keep','muoi_lau.deal','td_tha.ruong'])if(R()<.5)S.st.f14.fb[k]=1;
 const P={};for(const k of ['v','foe','mis','dad','son','maid','k'])P[k]=R()<.85?person(k.charCodeAt(0)):null;return {S,P}}
const flagNames=new Set();for(const a of Object.values(OLD))for(const b of Object.values(a.B||{}))for(const o of (Array.isArray(b.o)?b.o:[]))for(const fn of [o.o,o.go])if(typeof fn==='function')for(const m of fn.toString().matchAll(/A\.f\.(\w+)/g))flagNames.add(m[1]);
const FL=[...flagNames];
const row={};const bad=[];const add=(id,k,n=1)=>{const f=id.split('_')[0].replace(/14$/,'14');row[f]=row[f]||{chapters:new Set(),sc:0,k:0,cwl:0,o:0,fx:0,go:0,goRuns:0,goErr:0};row[f].chapters.add(id);row[f][k]+=n};
const same=(a,b)=>J(a)===J(b);
/* run one go in both sandboxes on the same life; compare call log + return + state after */
function goPair(where,fx,fy,isEnd){const f0=where.replace(/ rare$/,'').split(/[_.]/)[0];
 for(let t=0;t<TRIALS;t++){const seed=Math.floor(R()*1e9);const ok=R()<.5;const ends={};for(let n=4;n<=11;n++)ends[n]=['win','mid','lose',''][Math.floor(R()*4)];
  const flags={};for(const g of FL)if(R()<.3)flags[g]=1;const out=[];
  for(const [fn,X] of [[fx,O],[fy,N]]){rnd=seed;const L=life();T.S=L.S;T.P=L.P;T.ends=ends;T.log=[];T.seed=seed%2147483646+1;X.ctx.__R2reset();
   const A={f:Object.assign({},flags),sc:1,act:{v:1,foe:2},rc:[],i:2,seq:[1,2,3]};let r;try{r=isEnd?fn(A):fn(A,ok)}catch(e){const m=/^(\w[\w$]*) is not defined$/.exec(e.message);if(e.name==='ReferenceError'&&m){for(const Y of [O,N])if(!(m[1] in Y.ctx))stub(Y.ctx,m[1]);t--;out.length=0;break}r='ERR:'+e.message}
   out.push(J([r,T.log,T.S,T.P,A]))}
  if(!out.length)continue;
  row[f0]&&row[f0].goRuns++;if(String(out[0]).includes('ERR:')){row[f0]&&row[f0].goErr++;const em=/ERR:([^"]{0,60})/.exec(out[0]);errKinds[em[1]]=(errKinds[em[1]]||0)+1}
  if(out[0]!==out[1]){bad.push(`${where} go differs on trial ${t}:\n     OLD ${out[0].slice(0,400)}\n     NEW ${out[1].slice(0,400)}`);return}}}
const ids=Object.keys(OLD);if(!same(ids,Object.keys(NEW)))bad.push('chapter list differs');
for(const id of ids){const a=OLD[id],b=NEW[id];add(id,'sc',0);
 for(const bk of Object.keys(a.B||{})){const A=a.B[bk].o,B2=(b.B[bk]||{}).o;if(!Array.isArray(A))continue;if(!Array.isArray(B2)||A.length!==B2.length){bad.push(id+'.'+bk+' option count');continue}
  A.forEach((x,i)=>{const y=B2[i],w=`${id}.${bk}[${i}]`;
   for(const k of ['c','w','l','sc','sf','f','ff','e','need']){if(x[k]===undefined&&y[k]===undefined)continue;add(id,k==='sc'?'sc':'cwl');if(!same(x[k],y[k]))bad.push(`${w}.${k} ${J(x[k])} → ${J(y[k])}`)}
   if(typeof x.go!==typeof y.go)bad.push(w+'.go type');else if(x.go){add(id,'go');goPair(w,x.go,y.go,false)}
   if(x.o===undefined&&y.o===undefined)return;add(id,'o');if(typeof x.o!==typeof y.o){bad.push(`${w}.o type`);return}
   if(typeof x.o!=='function'){if(x.o!==y.o)bad.push(`${w}.o ${x.o} → ${y.o}`);return}
   for(let t=0;t<TRIALS;t++){const seed=Math.floor(R()*1e9);const ends={};for(let n=4;n<=11;n++)ends[n]=['win','mid','lose',''][Math.floor(R()*4)];const fl={};for(const g of FL)if(R()<.5)fl[g]=1;
    const v=[];for(const fn of [x.o,y.o]){rnd=seed;const L=life();T.S=L.S;T.P=L.P;T.ends=ends;v.push(fn({f:Object.assign({},fl),sc:0,act:{v:1}}))}
    if(!Object.is(v[0],v[1])){bad.push(`${w}.o : ${v[0]} → ${v[1]}`);break}}});}
 for(const ek of Object.keys(a.E||{})){const x=a.E[ek],y=b.E[ek]||{},w=`${id}.E.${ek}`;
  for(const k of ['fx','k','sc','tag']){let p,q;try{p=x[k]}catch(e){p='E'}try{q=y[k]}catch(e){q='E'}if(p===undefined&&q===undefined)continue;add(id,k==='fx'?'fx':k==='k'?'k':k==='sc'?'sc':'cwl');if(!same(p,q))bad.push(`${w}.${k} ${J(p)} → ${J(q)}`)}
  if(typeof x.go!==typeof y.go)bad.push(w+'.go type');else if(x.go){add(id,'go');goPair(w,x.go,y.go,true)}}}
/* the rare finale choices (RD97L): numbers + their go */
let rareN=0;if(ROLD.length!==RNEW.length)bad.push('RD97L count');
ROLD.forEach((x,i)=>{const y=RNEW[i]||{};rareN++;for(const k of ['a','p','np','sc','c','fx','bar'])if(!same(x[k],y[k]))bad.push(`RD97L ${x.a}.${k} ${J(x[k])} → ${J(y[k])}`);
 if(typeof x.go!==typeof y.go)bad.push(`RD97L ${x.a}.go type`);else if(x.go)goPair(x.a+' rare',x.go,y.go,true)});
console.log('stub errors (same in OLD and NEW):',J(Object.entries(errKinds).sort((a,b)=>b[1]-a[1]).slice(0,12)));console.log('stubbed globals (recording):',recName.size,'· trials per go / odds:',TRIALS,'· RD97L rare finale choices compared:',rareN);
console.log('| origin | chapters | sc | k | c/w/l/f/e/tag | odds fn | E fx | go fns | go runs (OLD=NEW) | runs ending in a stub error (same both) | differences |');console.log('|---|---|---|---|---|---|---|---|---|---|---|');
for(const f in row){const r=row[f];console.log(`| ${f} | ${r.chapters.size} | ${r.sc} | ${r.k} | ${r.cwl} | ${r.o} | ${r.fx} | ${r.go} | ${r.goRuns} | ${r.goErr} | ${bad.filter(x=>x.startsWith(f)).length} |`)}
console.log(bad.length?'DIFFERENT ('+bad.length+'):\n  '+bad.slice(0,30).join('\n  '):'SAME: every value before = after (deep-equal sc/k/c/w/l/fx, odds === , every go call log + return + state === on every trial)');process.exit(bad.length?1:0);
