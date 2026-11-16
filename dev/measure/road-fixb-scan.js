/* road-fixb-scan (fix B of review road-b1-r1): per road file, counts the FAIL families of review-road-b1-r1 items 2,3,6,8,9 so a fix can show
   a before/after table. Usage: node dev/measure/road-fixb-scan.js [file-regex] [-v]
   - DOM: climax dominance — in a beat whose options carry e:, a "safe" option (failure ending not k<0) beside a "bold" one (failure ending k<0):
     FAIL when cost(safe)==0 and base(bold) < base(safe)+10; also any option whose worst ending >= another option's best at <= cost.
   - INV: e:[a,b] where E[a].k < E[b].k (success gives the worse ending).
   - HH/TH: option/beat text naming Hoàng hậu / Thái hậu with no need:["hh"]/["th"] on the option or its beat and no qOn()/thDead guard.
   - WORD: VANPHONG words (chắc chắn, bạn, modern words, Khôn Ninh, digits/% in strings).
   - NUM: private number-word tables, typed RANKS index, typed "… lượng" amounts. */
const fs=require('fs');const V=process.argv.includes('-v');const FR=new RegExp(process.argv.slice(2).find(a=>!a.startsWith('-'))||'^jrd_.*\\.js$');
global.ARC67={};global.RTHEME67={};global.BAL={road:{first:5,last:11}};global.rdK=()=>0;global.rdPrev=()=>"";global.window=global;global.RD97L=[];
const bal=fs.readFileSync('dev/build/jbal2.js','utf8');
const J=fs.readFileSync('dev/build/jroad.js','utf8');const src=J.slice(J.indexOf('const ROAD14'),J.indexOf('function rdOn'));
const files=fs.readdirSync('dev/build').filter(f=>/^jrd_.*\.js$/.test(f));
const owner={};let all='';for(const f of files){const t=fs.readFileSync('dev/build/'+f,'utf8');all+=t+'\n';}
eval(src+all+';global.ROAD14=ROAD14');
for(const f of files){const t=fs.readFileSync('dev/build/'+f,'utf8');for(const m of t.matchAll(/rdDef\("([a-z_]+)",(\d+)/g))owner[m[1]+'_'+m[2]]=f}
/* stub state for base odds: mid-game values */
const dflt={danh:40,duc:40,tamco:30,th:40,mat:3,suc:20,bac:200,rank:5,tai:40,sac:40,trung:40,an:40,ht:40,love:40,fav:40};
for(const k of['rdEnd','rdPrev','rdNote'])global[k]=global[k]||(()=>'');global.qOn=()=>true;global.rv67=()=>null;global.rdRel=global.rdOan=()=>'';
global.S=new Proxy({st:{f14:{}}},{get:(o,k)=>k in o?o[k]:(k in dflt?dflt[k]:30)});
const A0={f:{},sc:0,rc:{},r:{},hist:[],used:[]};
const base=o=>{if(o.o==null)return 100;try{return typeof o.o==='function'?o.o(A0):o.o}catch(e){return NaN}};
const costOf=o=>{let s=0;for(const[k,v]of Object.entries(o.c||{}))if(v<0)s+=k==='bac'?-v/10:-v;return s};
const T=x=>typeof x==='function'?x.toString():String(x==null?'':x);
const R={};const add=(f,k,s)=>{R[f]=R[f]||{DOM:[],INV:[],HH:[],TH:[],WORD:[],NUM:[],EMPTY:[]};R[f][k].push(s)};
for(const[id,a]of Object.entries(ARC67)){const f=owner[id];if(!f||!FR.test(f))continue;const E=a.E||{};const ek=k=>E[k]?E[k].k:0;
 for(const[bk,b]of Object.entries(a.B||{})){const O=typeof b.o==='function'?[]:b.o;const bneed=b.need||[];const bif=T(b.if);
  const eo=O.filter(o=>Array.isArray(o.e)||typeof o.e==='string');
  const en=o=>Array.isArray(o.e)?o.e:[o.e,o.e];
  for(const o of eo){const [s,fl]=en(o);if(ek(s)<ek(fl))add(f,'INV',`${id}.${bk} «${o.n}» e:[${s},${fl}]`)}
  if(eo.length>1){const roll=o=>o.o!=null&&base(o)<100,wsum=o=>Object.values(o.w||{}).reduce((a,v)=>a+Math.max(0,v),0);
   const safe=eo.filter(o=>roll(o)&&ek(en(o)[1])>=0&&ek(en(o)[0])>ek(en(o)[1])),bold=eo.filter(o=>roll(o)&&ek(en(o)[1])<0&&ek(en(o)[0])>0);let hit=[];
   for(const s of safe)for(const d of bold)if(costOf(s)===0&&!(base(d)>=base(s)+10))hit.push(`safe «${s.n}» b${Math.round(base(s))} vs bold «${d.n}» b${Math.round(base(d))} c${costOf(d)}`);
   for(const x of eo)for(const y of eo)if(x!==y){const wx=Math.min(ek(en(x)[0]),ek(en(x)[1])),bx=Math.max(ek(en(x)[0]),ek(en(x)[1])),by=Math.max(ek(en(y)[0]),ek(en(y)[1]));
    if(wx>=by&&bx>by&&costOf(x)<=costOf(y)&&wsum(x)>=wsum(y)&&!y.go)hit.push(`«${x.n}» worst>=best of «${y.n}» at <= cost`)}
   /* free sure option with a gain beside a free rolled mid/lose with no upside */
   for(const x of eo)if(!roll(x)&&costOf(x)===0&&wsum(x)>0)for(const y of eo)if(roll(y)&&costOf(y)===0&&ek(en(y)[0])<=ek(en(x)[0]))hit.push(`free sure «${x.n}» beside free «${y.n}»`);
   if(hit.length)add(f,'DOM',`${id}.${bk}: `+hit.join(' | '))}
  /* EMPTY: a beat whose every option needs hh/th (or has an if) while the beat itself does not need them: no option left when she is gone */
  for(const k of ['hh','th']){if(!bneed.includes(k)&&O.length&&O.every(o=>(o.need||[]).includes(k)))add(f,'EMPTY',`${id}.${bk} all options need ${k}`)}
  const bt=T(b.t)+T(b.h);
  const guardHH=s=>/qOn|_QK|CN_J|need:\["hh"|MUOIN_NOQ|HH_OK|hhOk|_Q\(\)|_QP\(\)/.test(s);
  const chk=(txt,need,ifs,lab)=>{if(/Hoàng hậu|Càn Ninh|\{hh\}/.test(txt)&&!need.includes('hh')&&!bneed.includes('hh')&&!guardHH(ifs+bif+txt))add(f,'HH',lab);
   if(/Thái hậu|Thọ Khang|Từ Ninh|\{th\}/.test(txt)&&!need.includes('th')&&!bneed.includes('th')&&!/thDead/.test(ifs+bif+txt))add(f,'TH',lab)};
  chk(bt+(b.w==='hh'?' {hh}':'')+(b.w==='th'?' {th}':''),[],'',`${id}.${bk} beat`);
  for(const o of O){const txt=['n','rt','rf','wx','lx'].map(k=>T(o[k])).join(' ');chk(txt+(o.f==='hh'?' {hh}':'')+(o.f==='th'?' {th}':''),o.need||[],T(o.if),`${id}.${bk} «${o.n}»`)}
 }
 for(const[k,e]of Object.entries(E)){const t=T(e.t)+T(e.tag);if(/Hoàng hậu|\{hh\}/.test(t)&&!/qOn|MUOIN_NOQ/.test(t))add(f,'HH',`${id}.E.${k}`);if(/Thái hậu|\{th\}/.test(t)&&!/thDead/.test(t))add(f,'TH',`${id}.E.${k}`)}
}
/* text-level word/number scan over the raw file (strings only, rough) */
const BAN=[[/chắc chắn/i,'chắc chắn'],[/(^|[^a-zà-ỹ])bạn(?! bè)([^a-zà-ỹ]|$)/i,'bạn'],[/bạn bè/i,'bạn bè'],[/kế toán/i,'kế toán'],[/hóa đơn|hoá đơn/i,'hóa đơn'],[/cạnh tranh/i,'cạnh tranh'],[/tẩy chay/i,'tẩy chay'],[/Khôn Ninh/,'Khôn Ninh'],[/Quản Trọng|nước Tề|người Hán/,'real name'],[/\d\s*%|%/,'%'],[/sau rèm/,'sau rèm'],[/Tam ty/,'Tam ty']];
for(const f of files){if(!FR.test(f))continue;const L=fs.readFileSync('dev/build/'+f,'utf8').split('\n');
 L.forEach((l,i)=>{const strs=(l.match(/"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`/g)||[]).join(' ');for(const[r,w]of BAN)if(r.test(strs))add(f,'WORD',`L${i+1} ${w}`);
  if(/\["không","một","hai"/.test(l))add(f,'NUM',`L${i+1} private number-word table`);
  if(/RANKS\[[^\]]*\b[1-9]\b/.test(l.replace(/length-1/g,""))||/Math\.min\([^)]*,\s*7\)/.test(l))add(f,'NUM',`L${i+1} typed rank index`);
  if(/(mười|mươi|trăm) lượng/.test(strs))add(f,'NUM',`L${i+1} typed lượng`);})}
const keys=['DOM','INV','HH','TH','WORD','NUM','EMPTY'];console.log('file'.padEnd(14)+keys.map(k=>k.padStart(6)).join(''));
for(const f of Object.keys(R).sort()){console.log(f.padEnd(14)+keys.map(k=>String(R[f][k].length).padStart(6)).join(''));if(V)for(const k of keys)R[f][k].forEach(s=>console.log('  '+k+' '+s))}
