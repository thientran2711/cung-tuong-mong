/* arc-onecore-move: ONE CORE (OD:L1267) mover for the story arcs (ARC67 in j67.js / j96.js / jorigins.js + the GB67 shared beats), review/one-core-arcs.
   Same shape as dev/measure/road-onecore-move.js (BAL.road.fx). For every ARC67.<id>={… B:{beat:{… o:[option…]}}, E:{end:{…}}} and every
   Object.assign(GB67,{beat:{… o:[…]}}) it takes the rule numbers OUT of the data file and writes them into BAL.arc (dev/build/jbalarc.js):
     option  c · w · l (stat deltas) · o (odds: a number, or an arrow → rdOdds term list) · sc (Lợi thế) · g (the typed amounts of its go: closure)
     ending  fx · sc · k (tier −1/0/1) · g
   g: every typed amount of a relation / family effect call inside go: (rdOan, relAdd, oanAdd, e67dad/ally/pun/foe/…; the same calls the guard
   counts as amt) becomes G[i] (cond?N:M → cond?G[i]:G[i+1]); the closure gets G as its third parameter and arcFx (j67.js) passes BAL's list.
   The data file keeps words, flags and story logic. ARC67.<id>={…} becomes ARC67.<id>=arcFx("<id>",{…}); the GB67 block is followed by arcGb().
   usage: node dev/measure/arc-onecore-move.js <dev/build dir> <out json> [--dry] j67.js … */
const fs=require('fs'),path=require('path');
const argv=process.argv.slice(2),DRY=argv.includes('--dry');const [dir,outJson,...files]=argv.filter(a=>a!=='--dry');
/* blank string / template TEXT / comment bodies (same length); template ${…} code stays (calls inside it are code) */
function mask(s,keepTplCode){const o=s.split('');let i=0;const n=s.length;const bl=(a,b)=>{for(let k=a;k<b;k++)if(o[k]!=='\n')o[k]=' '};
 const tpl=()=>{/* at the char after ` ; returns index of closing ` */let j=i;let a=j;
  while(j<n){if(s[j]==='\\'){j+=2;continue}if(s[j]==='`'){bl(a,j);return j}
   if(s[j]==='$'&&s[j+1]==='{'){bl(a,j);j+=2;let d=1;/* code until the matching } */
    while(j<n&&d>0){const c=s[j];
     if(c==='"'||c==="'"){let k=j+1;while(s[k]!==c){if(s[k]==='\\')k++;k++}bl(j+1,k);j=k+1;continue}
     if(c==='`'){i=j+1;j=tpl()+1;continue}
     if(c==='{')d++;else if(c==='}')d--;j++}
    if(!keepTplCode)bl(a,j);a=j;continue}
   j++}return j};
 while(i<n){const c=s[i];
  if(c==='/'&&s[i+1]==='*'){const e=s.indexOf('*/',i+2)+2;bl(i,e);i=e;continue}
  if(c==='/'&&s[i+1]==='/'){const e=s.indexOf('\n',i);bl(i,e);i=e;continue}
  if(c==='"'||c==="'"){let j=i+1;while(s[j]!==c){if(s[j]==='\\')j++;j++}bl(i+1,j);i=j+1;continue}
  if(c==='`'){i=i+1;const j=tpl();i=j+1;continue}
  i++}
 return o.join('')}
const close=(m,i)=>{let d=0;for(let j=i;j<m.length;j++){const c=m[j];if('([{'.includes(c))d++;else if(')]}'.includes(c)){d--;if(d===0)return j}}throw Error('unclosed at '+i)};
function members(m,i,arr){const end=close(m,i);const out=[];let j=i+1;
 while(j<end){while(j<end&&/[\s,]/.test(m[j]))j++;if(j>=end)break;let key=null,ks=j;
  if(!arr&&m.startsWith('...',j)){key='...';j+=3}else if(!arr){const km=/^([A-Za-z_$][\w$]*|"[^"]*"|'[^']*')\s*(?::|(?=\())/.exec(m.slice(j,j+80));if(!km)throw Error('no key at '+j+': '+m.slice(j,j+40));key=km[1];j+=km[0].length}
  const vs=j;let d=0;while(j<end){const c=m[j];if('([{'.includes(c))d++;else if(')]}'.includes(c))d--;else if(c===','&&d===0)break;j++}
  out.push({key,ks,vs,ve:j})}
 return out}
/* odds terms (rdOdds, jroad.js): same as the road mover */
const ODDS_T=[[/^S\.(\w+)\/(\d+(?:\.\d+)?)$/,m=>["d",m[1],+m[2]]],[/^\(S\.(\w+)\/(\d+(?:\.\d+)?)\)$/,m=>["d",m[1],+m[2]]],[/^S\.(\w+)\*(\d+(?:\.\d+)?)$/,m=>["m",m[1],+m[2]]],
 [/^\(S\.(\w+)\|\|0\)\/(\d+(?:\.\d+)?)$/,m=>["dz",m[1],+m[2]]],[/^\(S\.(\w+)\|\|0\)\*(\d+(?:\.\d+)?)$/,m=>["mz",m[1],+m[2]]],
 [/^S\.arts\.(\w+)\*(\d+(?:\.\d+)?)$/,m=>["a",m[1],+m[2]]],
 [/^\(A\.f\.(\w+)\?(\d+):(\d+)\)$/,m=>["f",m[1],+m[2],+m[3]]],
 [/^\(((?:A\.f\.\w+\|\|)+A\.f\.\w+)\?(\d+):(\d+)\)$/,m=>["f",m[1].replace(/A\.f\./g,'').split('||').join('|'),+m[2],+m[3]]]];
function odds(fn){const b=fn.replace(/^(\(\)|A|\(A\))=>/,'');if(b===fn)return null;
 let d=0;const parts=[];let a=0,sg='+';for(let i=0;i<b.length;i++){const c=b[i];if(c==='(')d++;else if(c===')')d--;else if(d===0){if(c==='+'||c==='-'){parts.push([sg,b.slice(a,i)]);sg=c;a=i+1}else if('?<>=|&'.includes(c))return null}}
 parts.push([sg,b.slice(a)]);const q=[];let bad=false;
 parts.forEach(([g,p],k)=>{if(bad)return;if(k===0&&g==='+'&&/^\d+(\.\d+)?$/.test(p)){q.push(+p);return}if(k===0)q.push(0);
  for(const [re,f] of ODDS_T){const m=re.exec(p);if(m){const t=f(m);if(g==='-'){if(!/^[f]$/.test(t[0])){bad=true;return}t[0]='-'+t[0]}q.push(t);return}}bad=true});
 return bad?null:q}
/* the amt calls (same family as dev/test/one-core-guard.js JOIN_PAT.amt) */
const NUMV='[+-]?\\d+(?:\\.\\d+)?';
const AMT=new RegExp('\\b(?:rdOan|rdRel|relAdd|oanAdd|affAdd|kcAf|tdPowAdd|e67(?:dad|bien|kho|ally|pun|foe|drop))\\((?:[^()]|\\([^()]*\\))*?[(,]\\s*(?:[\\w$.!]+\\s*\\?\\s*)?'+NUMV+'(?:\\s*:\\s*'+NUMV+')?\\s*\\)','g');
const TAIL=new RegExp('((?:[\\w$.!]+\\s*\\?\\s*)?)('+NUMV+')(?:(\\s*:\\s*)('+NUMV+'))?\\s*\\)$');
const table={arcs:{},gb:{}},left=[],edits=[];let nOdds=0,nG=0;
const LIT_STAT=/^\{(\s*[A-Za-z_$]+\s*:\s*-?\d+(\.\d+)?\s*,?)*\s*\}$/;
for(const f of files){const fp=path.join(dir,f);let src=fs.readFileSync(fp,'utf8');const m=mask(src,false),mc=mask(src,true);const ed=[];/* [a,b,text] */
 const cut=(x)=>{let a=x.ks,b=x.ve;if(src[b]===',')b++;else{let k=a-1;while(/\s/.test(src[k]))k--;if(src[k]===',')a=k}ed.push([a,b,''])};
 /* go closure: typed amounts → G[i]; returns the list (or null) */
 const goG=(x,where)=>{const a=x.vs,b=x.ve;const seg=mc.slice(a,b);AMT.lastIndex=0;let r;const G=[];const reps=[];
  while((r=AMT.exec(seg))){const t=TAIL.exec(r[0]);if(!t)continue;const end=a+r.index+r[0].length;/* position of ')' */
   const tailStart=end-t[0].length;let p=tailStart+t[1].length;/* first number */
   const n1=t[2];if(/^[+-]?0$/.test(n1)&&!t[4])continue;/* 0 = no change, the guard skips it too */
   reps.push([p,p+n1.length,`G[${G.length}]`]);G.push(+n1);
   if(t[4]!=null){const p2=p+n1.length+t[3].length;reps.push([p2,p2+t[4].length,`G[${G.length}]`]);G.push(+t[4])}}
  if(!G.length)return null;
  /* head: add G as the third parameter */
  const h=src.slice(a,b);const hm=/^\s*(?:\(([^()]*)\)|([A-Za-z_$][\w$]*))\s*=>/.exec(h);if(!hm){left.push(`${f} ${where} go head: ${h.slice(0,40)}`);return null}
  const ps=(hm[1]!=null?hm[1]:hm[2]).split(',').map(s=>s.trim()).filter(Boolean);if(ps.includes('G')){left.push(`${f} ${where} go has G`);return null}
  while(ps.length<2)ps.push(ps.length?'_ok':'_A');ps.push('G');
  ed.push([a,a+hm[0].length,`(${ps.join(',')})=>`]);for(const r of reps)ed.push(r);nG+=G.length;return G};
 const take=(mem,keys,into,where)=>{for(const x of members(m,mem.vs,false)){if(!keys.includes(x.key))continue;const txt=src.slice(x.vs,x.ve).trim();
   if(x.key==='go'){const G=goG(x,where);if(G)into.g=G;continue}
   if(x.key==='o'){if(/^\d+(\.\d+)?$/.test(txt)){into.o=+txt;cut(x);continue}const q=odds(txt);if(!q){left.push(`${f} ${where} o: ${txt}`);continue}nOdds++;into.o=q;cut(x);continue}
   if(x.key==='sc'||x.key==='k'){if(!/^-?\d+(\.\d+)?$/.test(txt)){left.push(`${f} ${where} ${x.key}: ${txt}`);continue}into[x.key]=+txt;cut(x);continue}
   if(!LIT_STAT.test(txt)){left.push(`${f} ${where} ${x.key}: ${txt.slice(0,60)}`);continue}into[x.key]=Function('return '+txt)();cut(x)}};
 const beats=(bobj,T,id)=>{for(const beat of members(m,bobj,false)){if(m[beat.vs]!=='{'){left.push(`${f} ${id}.${beat.key} not a literal`);continue}const bm=members(m,beat.vs,false);const om=bm.find(x=>x.key==='o');if(!om||m[om.vs]!=='['){continue}
   const L=members(m,om.vs,true).map((op,i)=>{if(m[op.vs]!=='{')return 0;const into={};take(op,['c','w','l','o','sc','go'],into,id+'.'+beat.key+'['+i+']');return Object.keys(into).length?into:0});
   if(L.some(Boolean))T[beat.key]=L}};
 const re=/\bARC67\.([A-Za-z_$][\w$]*)\s*=\s*\{/g;let r;
 while((r=re.exec(m))){const id=r[1],ob=r.index+r[0].length-1;const T={};
  for(const mem of members(m,ob,false)){
   if(mem.key==='B'&&m[mem.vs]==='{')beats(mem.vs,T,id);
   if(mem.key==='E'&&m[mem.vs]==='{'){const E={};for(const en of members(m,mem.vs,false)){if(m[en.vs]!=='{')continue;const into={};take(en,['fx','sc','k','go'],into,id+'.E.'+en.key);if(Object.keys(into).length)E[en.key]=into}if(Object.keys(E).length)T.E=E}
   if(mem.key==='sc'||mem.key==='k')left.push(`${f} ${id} arc-level ${mem.key}`)}
  table.arcs[id]=T;const ce=close(m,ob);ed.push([ob,ob,`arcFx("${id}",`]);ed.push([ce+1,ce+1,')'])}
 const rg=/\bObject\.assign\(GB67,\s*\{/g;
 while((r=rg.exec(m))){const ob=r.index+r[0].length-1;beats(ob,table.gb,'G');const ce=close(m,r.index+'Object.assign'.length);/* the ')' of assign */
  let k=ce+1;if(src[k]===';')k++;ed.push([k,k,'arcGb();'])}
 ed.sort((x,y)=>y[0]-x[0]||y[1]-x[1]);for(let i=1;i<ed.length;i++)if(ed[i][1]>ed[i-1][0]&&ed[i][0]!==ed[i-1][0])throw Error(f+' overlapping edits at '+ed[i][0]);
 for(const [a,b,t] of ed)src=src.slice(0,a)+t+src.slice(b);
 if(!DRY)fs.writeFileSync(fp,src);console.log(f,'edits',ed.length)}
fs.writeFileSync(outJson,JSON.stringify({table,left},null,0));
console.log('arcs',Object.keys(table.arcs).length,'gb beats',Object.keys(table.gb).length,'odds converted',nOdds,'go amounts',nG,'left for hand',left.length);left.forEach(x=>console.log('  LEFT',x));
