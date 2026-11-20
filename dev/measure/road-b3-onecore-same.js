/* road-b3-onecore-same = road-onecore-same.js with SAME_FILES (default the B1 files) and the OLD sandbox reading the ref's own jbalroad.js. B3: SAME_FILES=jrd_thd.js,jrd_cnv.js node dev/measure/road-b3-onecore-same.js 94d041352 */
/* road-onecore-same (review/road-onecore): BEFORE / AFTER proof that moving the road numbers into BAL.road.fx changed no value.
   Loads the chapters twice in separate sandboxes — OLD = the files at a git ref (default c012bf32, before the move), NEW = the working tree —
   and compares every option's c / w / l, every ending's fx (deep-equal, same key order), and every option's odds o(A) on many random
   lives (stats, rank, A.f flags, earlier chapter endings, road flags, the rival's rank, arts) with === (bit-identical).
   usage: node dev/measure/road-onecore-same.js [old-ref]   (from the repo root; prints the before/after table, exit 1 on any difference) */
const fs=require('fs'),vm=require('vm'),cp=require('child_process');
const REF=process.argv[2]||'94d041352';
const FILES=(process.env.SAME_FILES||'jrd_tt.js,jrd_cn.js,jrd_muoi.js,jrd_dtq.js').split(',');
const rd=(ref,f)=>ref?cp.execSync(`git show ${ref}:dev/build/${f}`,{encoding:'utf8',maxBuffer:1<<26}):fs.readFileSync('dev/build/'+f,'utf8');
const T={S:null,ends:{},rival:3};/* the trial state both sandboxes read */
function load(ref){const J=rd(ref,'jroad.js');const src=J.slice(J.indexOf('const ROAD14'),J.indexOf('function rdOn'));
 const ctx=vm.createContext({console,Math,JSON,Object,Array,Number,String,Error,isFinite,ARC67:{},RTHEME67:{},RANKS:new Array(12).fill({}),
  BAL:{st14:{parts:[[1,3],[4,11]]}},rdK:()=>0,rdPrev:()=>"",RD97L:[],qOn:()=>true,thDead:false,
  rdEnd:n=>T.ends[n]||"",rv67:(A,k)=>({rank:T.rival,alive:true,id:1,kids:[]}),castRv67:()=>true,RV:()=>null,f14:()=>null,
  relAdd(){},oanAdd(){},log(){},PEND:{},e67dad:()=>0});
 Object.defineProperty(ctx,'S',{get:()=>T.S});ctx.window=ctx;
 vm.runInContext(rd(ref,'jbalroad.js'),ctx);/* BAL.road keys (bars the odds read); the OLD rdDef ignores .fx */
 vm.runInContext(src+'\n'+FILES.map(f=>rd(ref,f)).join('\n')+'\n;this.__A=ARC67;this.__R=RD97L',ctx);return [ctx.__A,ctx.__R]}
const [OLD,ROLD]=load(REF),[NEW,RNEW]=load(null);
const ST=['th','duc','sung','danh','bac','suc','tamco','tai','mat','hh','sac','an','loy','rel','ghen','tam','tin','age'];
let rnd=12345;const R=()=>(rnd=(rnd*1103515245+12345)%2147483648)/2147483648;
function life(){const S={rank:Math.floor(R()*10),arts:R()<.5?{y:Math.floor(R()*6)}:null,st:{f14:{fb:{}}}};for(const k of ST)S[k]=Math.floor(R()*130)-15;
 for(const k of ['cn_ban.deal','cn_than.deal','muoi_lau.keep','muoi_lau.deal'])if(R()<.5)S.st.f14.fb[k]=1;return S}
const flagNames=new Set();for(const a of Object.values(OLD))for(const b of Object.values(a.B||{}))for(const o of (Array.isArray(b.o)?b.o:[]))if(typeof o.o==='function')for(const m of o.o.toString().matchAll(/A\.f\.(\w+)/g))flagNames.add(m[1]);
const FL=[...flagNames];
const row={};const bad=[];const add=(id,k)=>{const f=id.split('_')[0];row[f]=row[f]||{chapters:new Set(),c:0,w:0,l:0,o:0,fx:0,oTrials:0};row[f].chapters.add(id);row[f][k]++};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const ids=Object.keys(OLD);if(!same(ids,Object.keys(NEW)))bad.push('chapter list differs');
for(const id of ids){const a=OLD[id],b=NEW[id];
 for(const bk of Object.keys(a.B||{})){const A=a.B[bk].o,B2=(b.B[bk]||{}).o;if(!Array.isArray(A))continue;if(!Array.isArray(B2)||A.length!==B2.length){bad.push(id+'.'+bk+' option count');continue}
  A.forEach((x,i)=>{const y=B2[i];for(const k of ['c','w','l']){if(x[k]===undefined&&y[k]===undefined)continue;add(id,k);if(!same(x[k],y[k]))bad.push(`${id}.${bk}[${i}].${k} ${JSON.stringify(x[k])} → ${JSON.stringify(y[k])}`)}
   if(x.o===undefined&&y.o===undefined)return;add(id,'o');if(typeof x.o!==typeof y.o){bad.push(`${id}.${bk}[${i}].o type`);return}
   if(typeof x.o!=='function'){if(x.o!==y.o)bad.push(`${id}.${bk}[${i}].o ${x.o} → ${y.o}`);return}
   for(let t=0;t<400;t++){T.S=life();T.ends={};for(let n=4;n<=11;n++)T.ends[n]=['win','mid','lose',''][Math.floor(R()*4)];T.rival=Math.floor(R()*10);
    const f={};for(const g of FL)if(R()<.5)f[g]=1;const AA={f,sc:0,act:{v:1}};const p=x.o(AA),q=y.o(AA);row[id.split('_')[0]].oTrials++;
    if(!Object.is(p,q)){bad.push(`${id}.${bk}[${i}].o ${x.o} : ${p} → ${q}`);break}}});}
 for(const ek of Object.keys(a.E||{})){const x=a.E[ek].fx,y=(b.E[ek]||{}).fx;if(x===undefined&&y===undefined)continue;add(id,'fx');if(!same(x,y))bad.push(`${id}.E.${ek}.fx ${JSON.stringify(x)} → ${JSON.stringify(y)}`)}}
/* the rare finale choices (RD97L): numbers, condition text and the condition's answer on random lives */
let rareN=0;if(ROLD.length!==RNEW.length)bad.push('RD97L count');
ROLD.forEach((x,i)=>{const y=RNEW[i]||{};rareN++;for(const k of ['a','p','np','sc','c','fx'])if(!same(x[k],y[k]))bad.push(`RD97L ${x.a}.${k} ${JSON.stringify(x[k])} → ${JSON.stringify(y[k])}`);
 if(!x.x||!y.x||x.x[1]!==y.x[1])bad.push(`RD97L ${x.a}.x text «${x.x&&x.x[1]}» → «${y.x&&y.x[1]}»`);
 else for(let t=0;t<400;t++){T.S=life();const AA={f:{},sc:0,act:{v:1}};let p,q;try{p=x.x[0](AA)}catch(e){p='E'}try{q=y.x[0](AA)}catch(e){q='E'}if(p!==q){bad.push(`RD97L ${x.a}.x answer ${p} → ${q}`);break}}});
console.log('RD97L rare finale choices compared:',rareN);
console.log('| origin | chapters | c (cost) | w (gain) | l (loss) | o (odds fn) | odds trials | E fx | differences |');console.log('|---|---|---|---|---|---|---|---|---|');
for(const f in row){const r=row[f];console.log(`| ${f} | ${r.chapters.size} | ${r.c} | ${r.w} | ${r.l} | ${r.o} | ${r.oTrials} | ${r.fx} | ${bad.filter(x=>x.startsWith(f+'_')).length} |`)}
console.log(bad.length?'DIFFERENT:\n  '+bad.join('\n  '):'SAME: every value before = after (deep-equal c/w/l/fx, odds === on every trial)');process.exit(bad.length?1:0);
