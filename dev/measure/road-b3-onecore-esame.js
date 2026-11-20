/* usage: node dev/measure/road-b3-onecore-esame.js <jend14 before> dev/build/jend14.js (from the repo root) */
/* before/after proof for jend14 (ARC67.noi14/hau14/ke14): c/w/l/fx (getters evaluated both ways of egThGone) and odds on random lives */
const fs=require('fs'),vm=require('vm');const [pre,post]=process.argv.slice(2);
const T={S:null};
const STUB=new Set();
function load(file){const J=fs.readFileSync('dev/build/jroad.js','utf8');const src=J.slice(J.indexOf('const RDQ'),J.indexOf('function rdOn'));
 const code=src+'\n'+fs.readFileSync(file,'utf8');
 for(let k=0;k<60;k++){const base={console,Math,JSON,Object,Array,Number,String,Error,isFinite,Set,ARC67:{},BAL:{st14:{parts:[[1,3],[4,11]]},tc:{hienAge:6}},RANKS:new Array(12).fill({n:"x"}),
  rdEnd:()=>"",rdIn:(a,f)=>[].concat(a).some(f),rdFb:()=>false,son67:()=>T.son,mySons:()=>[],liveRivals:()=>[],nsrv67:()=>true,f14:()=>null,apply(){},ap67(){},fmt:()=>"",rv67:()=>null,MS67:{},arcOk67:()=>true};
  for(const s of STUB)base[s]=function(){return 0};const ctx=vm.createContext(base);Object.defineProperty(ctx,'S',{get:()=>T.S});ctx.window=ctx;
  vm.runInContext(fs.readFileSync('dev/build/jbalroad.js','utf8'),ctx);ctx.rdGo=(id,i)=>Object.assign({},ctx.BAL.road.go[id][i]);
  try{vm.runInContext(code,ctx);return ctx.ARC67}catch(e){const m=/(\w+) is not defined/.exec(e.message);if(!m)throw e;STUB.add(m[1])}}throw Error('stubs')}
const A0=load(pre),A1=load(post);let n=0,bad=[];const J=JSON.stringify;
let rnd=7;const R=()=>(rnd=(rnd*1103515245+12345)%2147483648)/2147483648;
for(const id of ['noi14','hau14','ke14']){const a=A0[id],b=A1[id];
 for(const th of [false,true]){T.S={thDead:th,rank:3,st:{}};
  for(const bk in a.B){const x=a.B[bk].o,y=b.B[bk].o;if(!Array.isArray(x))continue;if(x.length!==y.length){bad.push(id+bk+' len');continue}
   x.forEach((o,i)=>{const p=y[i];for(const k of ['c','w','l']){n++;if(J(o[k])!==J(p[k]))bad.push(`${id}.${bk}[${i}].${k} ${J(o[k])} → ${J(p[k])}`)}
    if(typeof o.o!==typeof p.o){bad.push(`${id}.${bk}[${i}].o type`);return}
    if(typeof o.o==='function')for(let t=0;t<300;t++){const S={thDead:th,rank:Math.floor(R()*10),st:{}};for(const s of ['th','duc','sung','danh','bac','suc','tamco','tai','mat','hh','sac','an','tin','nt'])S[s]=Math.floor(R()*130)-15;T.S=S;T.son=R()<.5?{age:Math.floor(R()*9),alive:true,sex:"m"}:null;
     const f={};for(const g of 'abcdefghij')if(R()<.5)f[g]=1;const AA={f,sc:0,act:{v:1}};let u,v;try{u=o.o(AA)}catch(e){u='E'+e.message}try{v=p.o(AA)}catch(e){v='E'+e.message}n++;if(!Object.is(u,v)){bad.push(`${id}.${bk}[${i}].o ${u} → ${v}`);break}}})}
  for(const ek in a.E||{}){n++;if(J(a.E[ek].fx)!==J((b.E[ek]||{}).fx))bad.push(`${id}.E.${ek}.fx`)}}}
console.log('compared',n,bad.length?'DIFFERENT\n '+bad.join('\n '):'SAME');process.exit(bad.length?1:0)
