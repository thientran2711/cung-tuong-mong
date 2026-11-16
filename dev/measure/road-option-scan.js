/* road-option-scan (reviewer road-map-r1): every option of every road chapter (dev/build/jrd_*.js) must have a real loss (cost c, failure loss l with odds, or an ending) — lists FREE GAIN and NO-EFFECT options, digits in text, and road completeness. usage: node dev/measure/road-option-scan.js (from the repo root). Note: options with go (relation/oan) are listed with "go" — check by hand. */
const fs=require('fs');global.ARC67={};global.RTHEME67={};/* the real rulebook (ONE CORE): jbal.js + jbal2.js; fallback stub when they cannot load alone */
try{const vm=require('vm');const nop=new Proxy(function(){},{get:(f,k)=>k===Symbol.toPrimitive?()=>0:nop,apply:()=>nop,construct:()=>({})});const base={console,Math,JSON,Object,Array,Number,String,Symbol,isFinite,parseInt,setTimeout:()=>0};const ctx=vm.createContext(new Proxy(base,{has:()=>true,get:(o,k)=>k in o?o[k]:k==='window'||k==='globalThis'?ctx:nop,set:(o,k,v)=>(o[k]=v,true)}));vm.runInContext(fs.readFileSync('dev/build/jbal.js','utf8')+'\n'+fs.readFileSync('dev/build/jbal2.js','utf8')+'\n;this.BAL=BAL',ctx);global.BAL=base.BAL||ctx.BAL;if(!BAL.road)throw 0}catch(e){console.log('note: BAL not loaded ('+(e&&e.message||e)+'), stub used');global.BAL={road:{first:5,last:11}}}
global.rdK=()=>0;global.rdPrev=()=>"";global.window=global;global.RD97L=[];
const J=fs.readFileSync('dev/build/jroad.js','utf8');const src=J.slice(J.indexOf('const ROAD14'),J.indexOf('function rdOn'));
eval(src+(process.argv.length>2?process.argv.slice(2):fs.readdirSync('dev/build').filter(f=>/^jrd_.*\.js$/.test(f)).map(f=>'dev/build/'+f)).map(f=>fs.readFileSync(f,'utf8')).join('\n')+';global.ROAD14=ROAD14');
/* story tokens {n1} {n2} {v2} are not typed numbers (B2 finding) */
const nd67tok=x=>typeof x==='function'?'':String(x==null?'':x).replace(/\{[a-z]+\d\}/g,'');
let free=[],textOnly=[],n=0,chap=0,noLossCount=0;const typed=[];
for(const [id,a] of Object.entries(ARC67)){chap++;
 for(const [bk,b] of Object.entries(a.B||{})){const O=typeof b.o==='function'?[]:b.o;
  for(const o of O){n++;const cost=o.c&&Object.values(o.c).some(v=>v<0);const odds=o.o!=null;const lossNum=o.l&&Object.keys(o.l).length;
   const endLose=o.e&&(Array.isArray(o.e)?o.e.some(k=>a.E[k]&&a.E[k].k<0||k==='mid'):a.E[o.e]&&a.E[o.e].k<=0);
   const go=!!o.go;const gain=o.w&&Object.values(o.w).some(v=>v>0);
   if(!cost&&!(odds&&(lossNum||o.e))&&!endLose){(gain?free:textOnly).push(`${id}.${bk} «${o.n}» w=${JSON.stringify(o.w||{})} lx=${o.lx||''}${go?' go':''}${odds?' odds':''}`)}
  }}
 for(const k of ['t','g'])if(/\d/.test(nd67tok(a[k]||'')))typed.push(id+'.'+k);
 for(const [bk,b] of Object.entries(a.B||{})){if(/\d/.test(nd67tok(b.t||''))||/\d/.test(nd67tok(b.h||'')))typed.push(id+'.'+bk);(b.o||[]).forEach(o=>{for(const k of['n','rt','rf','wx','lx'])if(/\d|%/.test(nd67tok(o[k]||'')))typed.push(`${id}.${bk}.${k}:${o[k]}`)})}
 for(const [ek,E] of Object.entries(a.E||{}))if(/\d|%/.test(nd67tok(E.t)+nd67tok(E.tag)))typed.push(id+'.E.'+ek)}
console.log('chapters',chap,'options',n);console.log('FREE GAIN (no cost, no numeric loss):',free.length);free.forEach(x=>console.log('  '+x));
console.log('NO COST NO GAIN NO LOSS (text-only):',textOnly.length);textOnly.forEach(x=>console.log('  '+x));
console.log('digits/% in text:',typed);
const R=ROAD14;for(const r in R)console.log(r,Object.keys(R[r]).join(','));
/* climax options must not read A.sc: j67 oOf67 already adds Lợi thế (A.sc*7) to every option with e: or in an x beat */
{let d=[];for(const[id,a]of Object.entries(ARC67))for(const[bk,b]of Object.entries(a.B||{}))for(const o of (typeof b.o==='function'?[]:b.o)){if(typeof o.o==='function'&&/A\.sc\*/.test(o.o.toString())&&(o.e||b.x))d.push(id+'.'+bk+' «'+o.n+'»')}
 console.log('DOUBLE LỢI THẾ (A.sc in a climax option):',d.length);d.forEach(x=>console.log('  '+x))}
/* ---------- review road-b1-r1 additions (items 2, 3, 9 + RD97L) — guard every jrd_* file ----------
   base odds are read with a neutral life (every number 30, rank 3, no road flags, Lợi thế 0); a base that cannot be read is listed. */
{const N=30;/* neutral life: favour/fame stats 30, Tai mắt (0–10) 3, Lợi thế 0 */const S0={rank:3,mat:3,st:{f14:{}},kids:[],thDead:false};
 global.S=new Proxy(S0,{get:(t,k)=>k in t?t[k]:(typeof k==='string'?N:undefined)});
 for(const f of ['rv67','rdEnd','rdPrev','qOn','illOf','RV','f14'])if(!global[f])global[f]=()=>null;
 const A0=()=>({f:{},sc:0,act:{},n1:'',n2:'',q97:{p:0,b:0}});
 const rk=(a,k)=>{const E=a.E&&a.E[k];return !E?NaN:E.k>0?2:E.k<0?0:1};
 const base=o=>{if(o.o==null)return 100;try{const x=typeof o.o==='function'?o.o(A0()):o.o;return typeof x==='number'&&isFinite(x)?x:NaN}catch(e){return NaN}};
 const ends=(a,o)=>{if(!o.e)return null;if(!Array.isArray(o.e))return [rk(a,o.e),rk(a,o.e)];if(o.o==null)return [rk(a,o.e[0]),rk(a,o.e[0])];return [rk(a,o.e[0]),rk(a,o.e[1])]};
 const costOf=o=>Object.entries(o.c||{}).filter(([k,v])=>v<0);
 const le=(X,Y)=>{const y=Object.fromEntries(costOf(Y));return costOf(X).every(([k,v])=>y[k]!=null&&-v<=-y[k])};
 const upside=(Y,X)=>Object.entries(Y.w||{}).some(([k,v])=>v>0&&!((X.w||{})[k]>=v));
 let inv=[],dom=[],weak=[],unread=[],freeMid=[];
 for(const[id,a]of Object.entries(ARC67)){const xs=new Set((a.p||[]).slice(-1)[0]||[]);
  for(const[bk,b]of Object.entries(a.B||{})){const O=typeof b.o==='function'?[]:b.o;
   for(const o of O){const e=ends(a,o);if(e&&o.o!=null&&Array.isArray(o.e)&&e[0]<e[1])inv.push(`${id}.${bk} «${o.n}» e:${JSON.stringify(o.e)}`)}
   if(!xs.has(bk))continue;
   const E=O.filter(o=>o.e).map(o=>({o,e:ends(a,o),b:base(o)}));E.filter(x=>isNaN(x.b)).forEach(x=>unread.push(`${id}.${bk} «${x.o.n}»`));
   /* (A) an option whose worst ending is at least another's best, at no more cost, and the other has no upside of its own */
   for(const X of E)for(const Y of E){if(X===Y)continue;const wX=Math.min(...X.e),bY=Math.max(...Y.e);
    if(wX>=bY&&le(X.o,Y.o)&&!upside(Y.o,X.o)&&!(costOf(X.o).length===costOf(Y.o).length&&wX===bY&&Math.min(...Y.e)===bY&&!le(Y.o,X.o)))dom.push(`${id}.${bk} «${X.o.n}» (${X.e}) ≥ «${Y.o.n}» (${Y.e})`)}
   /* (B) bold win/lose beside a safe win/mid: the safe one must cost something, or the bold one must have base ≥ safe + 10 */
   for(const B of E)for(const F of E){if(B===F||B.o.o==null||F.o.o==null)continue;if(!(B.e[0]===2&&B.e[1]===0&&F.e[0]===2&&F.e[1]===1))continue;
    if(!costOf(F.o).length&&!(B.b>=F.b+10))weak.push(`${id}.${bk} bold «${B.o.n}» ${B.b} vs free safe «${F.o.n}» ${F.b}`);
    else if(costOf(F.o).length&&!(B.b>F.b)&&le(F.o,B.o))weak.push(`${id}.${bk} bold «${B.o.n}» ${B.b} ≤ safe «${F.o.n}» ${F.b} at no more cost`)}
   /* (D) review road-b3-fix-r1 (b3-r1 item 1 rule, thd + cnv + jend14 at 0): a free sure «mid» with a stat gain beside a costed option (the gain needs a real loss too); B1 roads (cn/dtq/muoi/tt) were held only to the narrower b1-r1 rule — their hits are for the coordinator to rule on */
   if(O.some(o=>costOf(o).length))for(const o of O)if(o.o==null&&o.e==="mid"&&!costOf(o).length&&o.w&&Object.values(o.w).some(v=>v>0))freeMid.push(`${id}.${bk} «${o.n}» w=${JSON.stringify(o.w)}`)}}
 console.log('INVERTED e: (success gives a worse ending than failure):',inv.length);inv.forEach(x=>console.log('  '+x));
 console.log('X-BEAT DOMINANCE (one option at least as good at no more cost):',dom.length);dom.forEach(x=>console.log('  '+x));
 console.log('X-BEAT BOLD ≤ SAFE (free safe needs bold base +10; costed safe needs bold base above it):',weak.length);weak.forEach(x=>console.log('  '+x));
 console.log('X-BEAT FREE SURE MID WITH A GAIN beside a costed option:',freeMid.length);freeMid.forEach(x=>console.log('  '+x));
 console.log('x-beat odds not readable by the scan (check by hand):',unread.length);unread.forEach(x=>console.log('  '+x));
 /* (C) wording (VANPHONG + road-history): every text field incl. function texts (string parts of the source) and RD97L */
 const BAN=[[/chắc chắn/i,'chắc chắn'],[/(^|[^\p{L}])bạn([^\p{L}]|$)/iu,'bạn'],[/cơ hội/i,'cơ hội'],[/kế toán/i,'kế toán'],[/hóa đơn|hoá đơn/i,'hóa đơn'],[/cạnh tranh/i,'cạnh tranh'],[/tẩy chay/i,'tẩy chay'],[/Khôn Ninh/,'Khôn Ninh (Hoàng hậu ở Càn Ninh cung)'],[/chỉ số|\bstat\b/i,'chỉ số'],[/(^|[^\p{L}])(bấm|nhấn|click)([^\p{L}]|$)/iu,'bấm'],[/%/,'%']];
 const strs=f=>{if(typeof f!=='function')return [String(f==null?'':f)];const s=f.toString();const out=[];s.replace(/"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g,(m,a,b)=>{out.push((a!=null?a:b).replace(/\$\{[^}]*\}/g,''))});return out};
 const TF=['t','g','h','n','rt','rf','wx','lx','tag','l'];let bad=[],fdig=[];
 const chk=(where,v)=>{if(v==null||typeof v==='object')return;for(const s of strs(v)){for(const[r,w]of BAN)if(r.test(s))bad.push(`${where}: ${w} — ${s.slice(0,90)}`);if(typeof v==='function'&&/\s/.test(s)&&/\d/.test(nd67tok(s)))fdig.push(`${where}: ${s.slice(0,90)}`)}};
 for(const[id,a]of Object.entries(ARC67)){for(const k of TF)chk(`${id}.${k}`,a[k]);
  for(const[bk,b]of Object.entries(a.B||{})){for(const k of TF)chk(`${id}.${bk}.${k}`,b[k]);const O=typeof b.o==='function'?[]:b.o;O.forEach((o,i)=>{for(const k of TF)chk(`${id}.${bk}[${i}].${k}`,o[k])})}
  for(const[ek,E]of Object.entries(a.E||{}))for(const k of ['t','tag'])chk(`${id}.E.${ek}.${k}`,E[k])}
 RD97L.forEach(d=>{for(const k of ['t','tag','n','ti'])chk(`RD97L ${d.a}.${k}`,d[k])});
 console.log('VANPHONG / banned words in text (incl. function texts, RD97L):',bad.length);bad.forEach(x=>console.log('  '+x));
 console.log('digits in function texts (string parts):',fdig.length);fdig.forEach(x=>console.log('  '+x));
 /* (D) rare finales: path options reachable on the road (.5–.10 beats holding a path option; j67 deals a subset), no bad option forced */
 let rr=[];for(const d of RD97L){const a=ARC67[d.a];if(!a){rr.push(`${d.a}: no such chapter`);continue}const R=ROAD14[a.road]||{};let beats=0,chs=0;
  for(let n=5;n<11;n++){const c=ARC67[R[n]];if(!c)continue;let h=0;for(const[bk,b]of Object.entries(c.B||{})){const O=typeof b.o==='function'?[]:b.o;if(O.some(o=>(d.path||[]).some(x=>String(o.n).includes(x))&&!(d.bad||[]).some(x=>String(o.n).includes(x))))h++}beats+=h;if(h)chs++}
  /* the .11 counts per pool before its climax (one beat of each pool is played) */
  const hit=b=>b&&(typeof b.o==='function'?[]:b.o).some(o=>(d.path||[]).some(x=>String(o.n).includes(x))&&!(d.bad||[]).some(x=>String(o.n).includes(x)));
  const own=(a.p||[]).slice(0,-1).filter(P=>P.some(bk=>hit(a.B[bk]))).length;
  const dead=(d.path||[]).filter(x=>![5,6,7,8,9,10,11].some(n=>{const c=ARC67[R[n]];return c&&Object.values(c.B||{}).some(b=>(typeof b.o==='function'?[]:b.o).some(o=>String(o.n).includes(x)))}));
  const ok=chs+own>=(d.np||2)+1;rr.push(`${ok?'ok  ':'LOW '}${d.a}: np ${d.np||2}, road chapters .5–.10 with a path option ${chs} (beats ${beats}) + .11 pools ${own}${dead.length?`, path names found nowhere on the road: ${dead.join(' | ')}`:''}`)}
 console.log('RARE FINALES (RD97L) reachability — needs ≥ np+1 chances (road chapters .5–.10 + .11 pools before the climax holding a path option; LOW = fail):',rr.filter(x=>!x.startsWith('ok')).length);rr.forEach(x=>console.log('  '+x));}
