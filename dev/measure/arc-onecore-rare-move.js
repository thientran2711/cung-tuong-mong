/* arc-onecore-rare-move (review/one-core-arcs): ONE CORE mover for the rare-ending catalogue R97L (j97.js).
   Every entry {a,…,p,np,sc,c,fx,x:[cond,text],go} → BAL.arc.rare[a] = {p,np,sc,c,fx,bar,g} (dev/build/jbalarc.js), same shape as BAL.road.rare:
   bar = the typed number(s) the x condition reads (one → a number, several → a list in code order); the condition reads AR(a).bar and its
   text prints it (`Đức từ ${AR(a).bar}`), so the shown floor is the floor checked. g = the typed amounts of go: (as arc-onecore-move).
   usage: node dev/measure/arc-onecore-rare-move.js <j97.js> <out json> [--dry] */
const fs=require('fs');const argv=process.argv.slice(2),DRY=argv.includes('--dry');const [file,outJson]=argv.filter(a=>a!=='--dry');
const M=require('./arc-onecore-move-lib.js');
let src=fs.readFileSync(file,'utf8');const m=M.mask(src,false),mc=M.mask(src,true);const ed=[],left=[],rare={};
const i0=m.indexOf('const R97L=[');const ab=i0+'const R97L='.length;
for(const el of M.members(m,ab,true)){if(m[el.vs]!=='{')continue;const mem=M.members(m,el.vs,false);const aM=mem.find(x=>x.key==='a');const a=JSON.parse(src.slice(aM.vs,aM.ve).trim());
 const T={};const AR=`AR("${a}")`;
 for(const x of mem){const txt=src.slice(x.vs,x.ve).trim();
  if(['p','np','sc'].includes(x.key)){if(!/^-?\d*\.?\d+$/.test(txt)){left.push(a+' '+x.key+' '+txt);continue}T[x.key]=+txt;ed.push(M.cutRange(src,x))}
  else if(x.key==='c'||x.key==='fx'){if(!M.LIT_STAT.test(txt)){left.push(a+' '+x.key+' '+txt.slice(0,50));continue}T[x.key]=Function('return '+txt)();ed.push(M.cutRange(src,x))}
  else if(x.key==='go'){const r=M.goG(src,mc,x);if(r){T.g=r.G;ed.push(...r.ed)}}
  else if(x.key==='x'){/* [cond, text] */const xs=M.members(m,x.vs,true);if(xs.length!==2){left.push(a+' x shape');continue}
   const c=xs[0],t=xs[1];const ct=src.slice(c.vs,c.ve);const nums=[];const reps=[];
   const re=/(>=|>|<=|<)\s*(\d+(?:\.\d+)?)(?![\w.])|\br97allies\((\d+)\)/g;let r;
   while((r=re.exec(ct))){const v=r[2]!=null?r[2]:r[3];const off=r.index+r[0].lastIndexOf(v);
    nums.push(+v);reps.push([c.vs+off,c.vs+off+v.length])}
   if(!nums.length){continue}
   const tt=src.slice(t.vs,t.ve).trim();if(!/^"[^"`$]*"$/.test(tt)){left.push(a+' x text '+tt.slice(0,50));continue}
   const s=JSON.parse(tt);const used=nums.map(()=>false);let out='',last=0;const tr=/\d+(?:\.\d+)?/g;let q,ok=true;
   while((q=tr.exec(s))){const v=+q[0];const k=nums.findIndex((n,i)=>n===v&&!used[i]);if(k<0){ok=false;break}used[k]=true;
    out+=s.slice(last,q.index).replace(/[`\\$]/g,'\\$&')+'${'+AR+'.bar'+(nums.length>1?`[${k}]`:'')+'}';last=q.index+q[0].length}
   out+=s.slice(last).replace(/[`\\$]/g,'\\$&');
   if(!ok||used.some(u=>!u)){left.push(a+' x text/number mismatch: '+ct+' | '+s);continue}
   T.bar=nums.length>1?nums:nums[0];reps.forEach(([p,q2],k)=>ed.push([p,q2,AR+'.bar'+(nums.length>1?`[${k}]`:'')]));ed.push([t.vs+src.slice(t.vs,t.ve).indexOf('"'),t.ve-(src.slice(t.vs,t.ve).length-src.slice(t.vs,t.ve).trimEnd().length),'`'+out+'`'])}}
 rare[a]=T}
ed.sort((x,y)=>y[0]-x[0]||y[1]-x[1]);for(const [a,b,t] of ed)src=src.slice(0,a)+t+src.slice(b);
if(!DRY)fs.writeFileSync(file,src);fs.writeFileSync(outJson,JSON.stringify({rare,left}));
console.log('entries',Object.keys(rare).length,'edits',ed.length,'left',left.length);left.forEach(x=>console.log('  LEFT',x));
