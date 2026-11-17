/* arc-onecore-g2 (review/one-core-arcs r2): second pass of the go-amount move. The r1 mover's amt pattern missed ONE-argument effect calls
   (e67dad(10), e67heir(6) …). This pass finds every typed amount still left in a go: closure of an ARC67 arc / GB67 beat (j67, j96, jorigins)
   or an R97L rare entry (j97), appends it to that choice's / ending's g list in BAL.arc (existing indices unchanged) and makes the closure read
   G[i] (adds G as its third parameter when it had none). Lines of dev/build/jbalarc.js are rewritten per arc / rare entry.
   usage: node dev/measure/arc-onecore-g2.js <dev/build dir> [--dry] */
const fs=require('fs'),path=require('path');const M=require('./arc-onecore-move-lib.js');
const argv=process.argv.slice(2),DRY=argv.includes('--dry');const dir=argv.find(a=>a!=='--dry');
const balF=path.join(dir,'jbalarc.js');let bal=fs.readFileSync(balF,'utf8');const BAL={};Function('BAL',bal)(BAL);const A=BAL.arc;
const lit=v=>Array.isArray(v)?'['+v.map(lit).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).map(k=>(/^[A-Za-z_$][\w$]*$/.test(k)?k:JSON.stringify(k))+':'+lit(v[k])).join(',')+'}':JSON.stringify(v);
const touched={fx:new Set(),gb:new Set(),rare:new Set()};let moved=0;const log=[];
function goPass(src,mc,x,getG,where){/* returns edits; getG() gives the g array to append to */
 const a=x.vs,b=x.ve;const seg=mc.slice(a,b);M.AMT.lastIndex=0;let r;const ed=[];let G=null;
 while((r=M.AMT.exec(seg))){const t=M.TAIL.exec(r[0]);if(!t)continue;const end=a+r.index+r[0].length;const p=end-t[0].length+t[1].length;const n1=t[2];
  if(/^[+-]?0$/.test(n1)&&!t[4])continue;if(!G)G=getG();ed.push([p,p+n1.length,`G[${G.length}]`]);G.push(+n1);moved++;log.push(where+' '+r[0].replace(/\s+/g,''));
  if(t[4]!=null){const p2=p+n1.length+t[3].length;ed.push([p2,p2+t[4].length,`G[${G.length}]`]);G.push(+t[4]);moved++}}
 if(!ed.length)return ed;const h=src.slice(a,b);const hm=/^\s*(?:\(([^()]*)\)|([A-Za-z_$][\w$]*))\s*=>/.exec(h);if(!hm)throw Error('go head '+where);
 const ps=(hm[1]!=null?hm[1]:hm[2]).split(',').map(s=>s.trim()).filter(Boolean);if(!ps.includes('G')){while(ps.length<2)ps.push(ps.length?'_ok':'_A');ps.push('G');ed.push([a,a+hm[0].length,`(${ps.join(',')})=>`])}
 return ed}
const slot=(T,bk,i,n)=>{T[bk]=T[bk]||Array(n).fill(0);if(!T[bk][i])T[bk][i]={};return T[bk][i]};
for(const f of ['j67.js','j96.js','jorigins.js','j97.js']){const fp=path.join(dir,f);let src=fs.readFileSync(fp,'utf8');const m=M.mask(src,false),mc=M.mask(src,true);const ed=[];
 const beats=(ob,T,id,set)=>{for(const beat of M.members(m,ob,false)){if(m[beat.vs]!=='{')continue;const om=M.members(m,beat.vs,false).find(x=>x.key==='o');if(!om||m[om.vs]!=='[')continue;
   const ops=M.members(m,om.vs,true);ops.forEach((op,i)=>{if(m[op.vs]!=='{')return;const go=M.members(m,op.vs,false).find(x=>x.key==='go');if(!go)return;
    ed.push(...goPass(src,mc,go,()=>{set();const o=slot(T,beat.key,i,ops.length);return o.g=o.g||[]},id+'.'+beat.key+'['+i+']'))})}};
 const re=/\bARC67\.([A-Za-z_$][\w$]*)\s*=\s*arcFx\("[^"]+",\s*\{/g;let r;
 while((r=re.exec(m))){const id=r[1],ob=r.index+r[0].length-1;const T=A.fx[id]||(A.fx[id]={});
  for(const mem of M.members(m,ob,false)){if(mem.key==='B'&&m[mem.vs]==='{')beats(mem.vs,T,id,()=>touched.fx.add(id));
   if(mem.key==='E'&&m[mem.vs]==='{')for(const en of M.members(m,mem.vs,false)){if(m[en.vs]!=='{')continue;const go=M.members(m,en.vs,false).find(x=>x.key==='go');if(!go)continue;
    ed.push(...goPass(src,mc,go,()=>{touched.fx.add(id);T.E=T.E||{};const e=T.E[en.key]=T.E[en.key]||{};return e.g=e.g||[]},id+'.E.'+en.key))}}}
 const rg=/\bObject\.assign\(GB67,\s*\{/g;while((r=rg.exec(m)))beats(r.index+r[0].length-1,A.gb,'G',()=>{for(const k in A.gb)touched.gb.add(k)});
 const i0=m.indexOf('const R97L=[');if(i0>=0)for(const el of M.members(m,i0+'const R97L='.length,true)){if(m[el.vs]!=='{')continue;const mem=M.members(m,el.vs,false);
  const a=JSON.parse(src.slice(mem.find(x=>x.key==='a').vs,mem.find(x=>x.key==='a').ve).trim());const go=mem.find(x=>x.key==='go');if(!go)continue;
  ed.push(...goPass(src,mc,go,()=>{touched.rare.add(a);const R=A.rare[a]=A.rare[a]||{};return R.g=R.g||[]},'rare '+a))}
 ed.sort((x,y)=>y[0]-x[0]);for(const [a,b,t] of ed)src=src.slice(0,a)+t+src.slice(b);if(!DRY)fs.writeFileSync(fp,src);console.log(f,'edits',ed.length)}
/* rewrite the touched lines of jbalarc.js (one entry per line inside gb:{ / rare:{ / fx:{ ) */
const sect=(name,set,obj)=>{const a=bal.indexOf('\n '+name+':{\n');if(a<0)throw Error('no section '+name);let b=bal.indexOf('\n },\n',a);if(b<0)b=bal.indexOf('\n }}});',a);
 let body=bal.slice(a,b);for(const id of set){const line=new RegExp('\\n '+id.replace('$','\\$')+':\\{.*','');const nl='\n '+id+':'+lit(obj[id])+',';if(line.test(body))body=body.replace(line,nl);else body+=nl}
 bal=bal.slice(0,a)+body+bal.slice(b)};
sect('gb',touched.gb,A.gb);sect('rare',touched.rare,A.rare);sect('fx',touched.fx,A.fx);
if(!DRY)fs.writeFileSync(balF,bal);console.log('moved amounts',moved,'arcs',touched.fx.size,'rare',touched.rare.size,'gb',touched.gb.size);if(DRY)log.forEach(x=>console.log('  ',x));
