/* road-onecore-g-move: ONE CORE (OD:L1267) mover, part 2 (review/one-core-roads, brief one-core-dup §2b worker 2 — F1 roads).
   road-onecore-move.js moved option c / w / l / o and ending fx into BAL.road.fx. This moves the numbers still typed in the road data:
     option  sc:N (Lợi thế)                       → BAL.road.fx[id][beat][i].sc
     option  go: closure typed amounts            → BAL.road.fx[id][beat][i].g = [N, …]  (call order; the closure reads G[j])
     ending  k:-1/0/1 (tier) · sc:N · go: amounts → BAL.road.fx[id].E[end] = {fx, k, sc, g}
   A typed amount = the last argument (or each branch of `cond?N:M`) of rdOan / rdRel / relAdd / oanAdd / affAdd / kcAf / tdPowAdd /
   e67dad|bien|kho|ally|pun|foe|drop (the one-core-guard `amt` kind). The closure gets one more parameter G (option go(A,ok,G),
   ending go(A,G)); rdFx (jroad.js) wraps the chapter's go so G = the BAL list. `i` = the RUNTIME option index (a ...MAT2(a,m) spread
   yields two options: both get a's numbers).
   usage: node dev/measure/road-onecore-g-move.js <dev/build dir> <out json> [--dry] jrd_tt.js … jend14.js
          (rewrites the data files in place and the BAL.road.fx lines of jbalroad.js; --dry only reports) */
const fs=require('fs'),path=require('path'),vm=require('vm');
const argv=process.argv.slice(2),DRY=argv.includes('--dry');const [dir,outJson,...files]=argv.filter(a=>a!=='--dry'&&a!=='--rare');
function mask(s){const o=s.split('');let i=0;const n=s.length;const bl=(a,b)=>{for(let k=a;k<b;k++)if(o[k]!=='\n')o[k]=' '};
 while(i<n){const c=s[i];
  if(c==='/'&&s[i+1]==='*'){const e=s.indexOf('*/',i+2)+2;bl(i,e);i=e;continue}
  if(c==='/'&&s[i+1]==='/'){const e=s.indexOf('\n',i);bl(i,e);i=e;continue}
  if(c==='"'||c==="'"){let j=i+1;while(s[j]!==c){if(s[j]==='\\')j++;j++}bl(i+1,j);i=j+1;continue}
  if(c==='`'){let j=i+1,d=0;while(j<n){if(s[j]==='\\'){j+=2;continue}if(d===0&&s[j]==='`')break;if(s[j]==='$'&&s[j+1]==='{'){d++;j+=2;continue}if(d&&s[j]==='}'){d--;j++;continue}j++}bl(i+1,j);i=j+1;continue}
  i++}
 return o.join('')}
const close=(m,i)=>{let d=0;for(let j=i;j<m.length;j++){const c=m[j];if('([{'.includes(c))d++;else if(')]}'.includes(c)){d--;if(d===0)return j}}throw Error('unclosed at '+i)};
function members(m,i,arr){const end=close(m,i);const out=[];let j=i+1;
 while(j<end){while(j<end&&/[\s,]/.test(m[j]))j++;if(j>=end)break;let key=null,ks=j,get=false;
  if(!arr&&m.startsWith('...',j)){key='...';j+=3}else if(!arr){const gm=/^get\s+/.exec(m.slice(j,j+8));if(gm){get=true;j+=gm[0].length}
   const km=/^([A-Za-z_$][\w$]*|"[^"]*"|'[^']*')\s*(?::|(?=\())/.exec(m.slice(j,j+80));if(!km)throw Error('no key at '+j+': '+m.slice(j,j+40));key=km[1];j+=km[0].length}
  const vs=j;let d=0;while(j<end){const c=m[j];if('([{'.includes(c))d++;else if(')]}'.includes(c))d--;else if(c===','&&d===0)break;j++}
  out.push({key,ks,vs,ve:j,get})}
 return out}
const NUM='[+-]?\\d+(?:\\.\\d+)?';
/* an effect call (the guard's amt names), run on the masked closure (strings blanked, same offsets); its last (or only) argument is a typed
   amount when it is N or cond?N:M */
const CALL=/\b(?:rdOan|rdRel|relAdd|oanAdd|affAdd|kcAf|tdPowAdd|e67(?:dad|bien|kho|ally|pun|foe|drop|merit|heir|srvUp)|CHU_MIS|BAN_MIS|CHU_NT|BAN_NT|CHR_TH|matMis)\(/g;
/* road amount helpers whose EVERY argument is an amount (matMis(rel, oán)); the others take the amount last */
const ALLARG=/^(?:CHU_MIS|BAN_MIS|CHU_NT|BAN_NT|CHR_TH|matMis|e67\w+)\($/;
const ARG=new RegExp('^\\s*(?:[\\w$.!]+\\s*\\?\\s*)?'+NUM+'(?:\\s*:\\s*'+NUM+')?\\s*$');
const AMT_GUARD=new RegExp('\\b(?:rdOan|rdRel|relAdd|oanAdd|affAdd|kcAf|tdPowAdd|e67(?:dad|bien|kho|ally|pun|foe|drop))\\((?:[^()]|\\([^()]*\\))*?[(,]\\s*(?:[\\w$.!]+\\s*\\?\\s*)?'+NUM+'(?:\\s*:\\s*'+NUM+')?\\s*\\)','g');
const table={},left=[],otherNums=[];let nSc=0,nK=0,nG=0;
/* rewrite one go closure: typed amounts → G[j]; returns {txt, g} or null when there is nothing to move */
function goRewrite(txt,mtxt,isEnd,where){const g=[];const reps=[];CALL.lastIndex=0;let r;
 while((r=CALL.exec(mtxt))){const p0=r.index+r[0].length-1,p1=close(mtxt,p0);/* the last argument = after the last comma at call depth 1 */let d=0,lc=p0;
  const cuts=[p0];for(let k=p0;k<p1;k++){const c=mtxt[k];if('([{'.includes(c))d++;else if(')]}'.includes(c))d--;else if(c===','&&d===1)cuts.push(k)}
  const spans=[];for(let q=0;q<cuts.length;q++)spans.push([cuts[q]+1,q+1<cuts.length?cuts[q+1]:p1]);
  for(const [a0,a1] of (ALLARG.test(r[0].replace(/^.*?(\w+\()$/,'$1'))?spans:spans.slice(-1))){const arg=mtxt.slice(a0,a1);if(!ARG.test(arg))continue;
  const nums=[...arg.matchAll(new RegExp('(?<![\\w$.])'+NUM+'(?![\\w.])','g'))];
  /* a typed 0 is not a rule number (the guard skips `…,0)`): keep it */
  if(nums.length===1&&+nums[0][0]===0)continue;
  for(const q of nums)reps.push([a0+q.index,a0+q.index+q[0].length,+q[0],''])}}
 /* a typed stat step on a road person: v.sung=cl((v.sung||0)±N,…) / s.fond=cl((s.fond||0)−N,…) / v.sung=(v.sung||0)+N → +G[j] (signed) */
 for(const q of mtxt.matchAll(/\b(\w+)\.(sung|fond)=(?:cl\()?\(\1\.\2\|\|0\)([+-])(\d+(?:\.\d+)?)(?![\w.])/g)){const a=q.index+q[0].length-q[3].length-q[4].length;reps.push([a,a+q[3].length+q[4].length,+(q[3]+q[4]),'+'])}
 reps.sort((x,y)=>x[0]-y[0]);reps.forEach((x,j)=>{x[4]=j;g.push(x[2])});
 if(!g.length)return null;
 /* other typed numbers left in the closure (listed for the report) */
 let out=txt;reps.sort((a,b)=>b[0]-a[0]);for(const [a,b,,pre,j] of reps)out=out.slice(0,a)+pre+'G['+j+']'+out.slice(b);
 /* the parameter list: add G */
 const pm=/^(\s*)(\(\s*\)|\(([^()]*)\)|([A-Za-z_$][\w$]*))\s*=>/.exec(out);if(!pm){left.push(where+' go: not an arrow '+out.slice(0,50));return null}
 let ps=pm[3]!=null?pm[3].split(',').map(x=>x.trim()).filter(Boolean):pm[4]?[pm[4]]:[];
 if(ps.some(p=>p==='G'))throw Error(where+' go already has G');
 const want=isEnd?1:2;while(ps.length<want)ps.push(ps.length===0?'_A':'_ok');if(ps.length>want){left.push(where+' go: '+ps.length+' params');return null}
 out=pm[1]+'('+ps.concat('G').join(',')+')=>'+out.slice(pm[0].length);
 if(/(?<![\w$.])G(?![\w$])/.test(txt.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g,'""')))throw Error(where+' go reads a free G');
 return {txt:out,g}}
function chapter(src,m,defAt,id,cuts,edits){const T=table[id]={B:{},E:{}};
 for(const mem of members(m,defAt,false)){
  if(mem.key==='B'){for(const beat of members(m,mem.vs,false)){if(m[beat.vs]!=='{')continue;const bm=members(m,beat.vs,false);const om=bm.find(x=>x.key==='o');if(!om||m[om.vs]!=='[')continue;
    const row=[];let ri=0;
    for(const op of members(m,om.vs,true)){let objAt=op.vs,n=1;
     if(m.startsWith('...',op.vs)){const sm=/^\.\.\.MAT2\(/.exec(m.slice(op.vs,op.vs+8));if(!sm){left.push(id+'.'+beat.key+' spread '+src.slice(op.vs,op.vs+30));ri++;continue}
      const args=members(m,op.vs+7,true);objAt=args[0].vs;n=2;
      if(args[1]&&members(m,args[1].vs,false).some(x=>['sc','go','sf'].includes(x.key)))left.push(id+'.'+beat.key+' MAT2 second arg has sc/go')}
     if(m[objAt]!=='{'){ri+=n;continue}
     const into=one(src,m,objAt,false,id+'.'+beat.key+'['+ri+']',cuts,edits);
     for(let k=0;k<n;k++)row[ri+k]=Object.keys(into).length?into:0;ri+=n}
    if(row.some(Boolean))T.B[beat.key]={row,len:ri}}}
  if(mem.key==='E'){for(const en of members(m,mem.vs,false)){if(m[en.vs]!=='{')continue;const into=one(src,m,en.vs,true,id+'.E.'+en.key,cuts,edits);if(Object.keys(into).length)T.E[en.key]=into}}}}
function one(src,m,at,isEnd,where,cuts,edits){const into={};
 for(const x of members(m,at,false)){const txt=src.slice(x.vs,x.ve).trim();
  const cut=()=>{let a=x.ks,b=x.ve;if(src[b]===',')b++;else{let k=a-1;while(/\s/.test(src[k]))k--;if(src[k]===',')a=k}cuts.push([a,b])};
  if(x.key==='sc'||(isEnd&&x.key==='k')){if(x.get||!new RegExp('^'+NUM+'$').test(txt)){if(new RegExp('^'+NUM+'$').test(txt)||/\d/.test(txt))left.push(where+' '+x.key+': '+txt.slice(0,60));continue}
   into[x.key]=+txt;cut();x.key==='sc'?nSc++:nK++}
  else if(x.key==='go'&&!x.get){const a=x.vs+(src.slice(x.vs,x.ve).length-src.slice(x.vs,x.ve).trimStart().length);const b=a+txt.length;
   const rw=goRewrite(src.slice(a,b),m.slice(a,b),isEnd,where);if(rw){into.g=rw.g;nG+=rw.g.length;edits.push([a,b,rw.txt])}
   const rest=(rw?rw.txt:txt).replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g,'""').replace(/G\[\d+\]/g,'');
   const nn=rest.match(new RegExp('(?<![\\w$.\\]])'+NUM+'(?![\\w.])','g'));if(nn&&nn.some(v=>+v!==0))otherNums.push(where+' go: '+rest.slice(0,140))}}
 return into}
/* --rare: the rare finale choices rdRare({a:"<road>_11",… go:…}) → BAL.road.rare[a].g (rdRare wraps go(A,G)) */
if(argv.includes('--rare')){const BP=path.join(dir,'jbalroad.js');let bal=fs.readFileSync(BP,'utf8');let n=0;
 for(const f of files.filter(x=>x!=='--rare')){const fp=path.join(dir,f);let src=fs.readFileSync(fp,'utf8');const m=mask(src);const edits=[];const re=/\brdRare\(\{/g;let r;
  while((r=re.exec(m))){const at=r.index+r[0].length-1;const mem=members(m,at,false);const a=JSON.parse(src.slice(mem.find(x=>x.key==='a').vs,mem.find(x=>x.key==='a').ve).trim());
   const go=mem.find(x=>x.key==='go');if(!go)continue;const txt=src.slice(go.vs,go.ve).trim();const ga=go.vs+(src.slice(go.vs,go.ve).length-src.slice(go.vs,go.ve).trimStart().length);
   const rw=goRewrite(src.slice(ga,ga+txt.length),m.slice(ga,ga+txt.length),true,a+' rare');if(!rw)continue;edits.push([ga,ga+txt.length,rw.txt]);
   const lre=new RegExp('^( '+a+':\\{.*?)(\\},? *(?:/\\*.*)?)$','m');const lm=lre.exec(bal.slice(bal.indexOf('\n rare:{'),bal.indexOf('\n fx:{')));if(!lm)throw Error('rare line '+a);
   const ra=bal.indexOf('\n rare:{'),rb=bal.indexOf('\n fx:{');bal=bal.slice(0,ra)+bal.slice(ra,rb).replace(lre,(x,p1,p2)=>p1+',g:'+JSON.stringify(rw.g)+p2)+bal.slice(rb);n+=rw.g.length;console.log(a,JSON.stringify(rw.g))}
  edits.sort((x,y)=>y[0]-x[0]);for(const [a,b,t] of edits)src=src.slice(0,a)+t+src.slice(b);fs.writeFileSync(fp,src)}
 fs.writeFileSync(BP,bal);console.log('rare amounts',n);process.exit(0)}
for(const f of files){const fp=path.join(dir,f);let src=fs.readFileSync(fp,'utf8');const m=mask(src);const cuts=[],edits=[];
 const re=/\brdDef\(|\bARC67\.(\w+)=\{/g;let r;
 while((r=re.exec(m))){let id,defAt;
  if(r[0].startsWith('rdDef')){const args=members(m,r.index+5,true);if(args.length<3)continue;const r0=src.slice(args[0].vs,args[0].ve).trim();if(!/^"\w+"$/.test(r0))continue;
   id=JSON.parse(r0)+'_'+(+src.slice(args[1].vs,args[1].ve).trim());defAt=args[2].vs;if(m[defAt]!=='{')throw Error(id+': def not literal')}
  else{id=r[1];defAt=r.index+r[0].length-1}
  chapter(src,m,defAt,id,cuts,edits)}
 const all=cuts.map(([a,b])=>[a,b,'']).concat(edits).sort((x,y)=>y[0]-x[0]);
 for(let k=1;k<all.length;k++)if(all[k][1]>all[k-1][0])throw Error(f+' overlapping edits');
 for(const [a,b,t] of all)src=src.slice(0,a)+t+src.slice(b);if(!DRY)fs.writeFileSync(fp,src);console.log(f,'cuts',cuts.length,'go rewritten',edits.length)}
console.log('sc',nSc,'k',nK,'g amounts',nG,'left',left.length,'go with other typed numbers',otherNums.length);
left.forEach(x=>console.log('  LEFT',x));
if(DRY){otherNums.forEach(x=>console.log('  OTHER',x));process.exit(0)}
/* ---------- merge into BAL.road.fx (jbalroad.js) ---------- */
const BP=path.join(dir,'jbalroad.js');let bal=fs.readFileSync(BP,'utf8');
const ctx=vm.createContext({BAL:{st14:{parts:[[1,3],[4,11]]}},console});vm.runInContext(bal,ctx);const FX=ctx.BAL.road.fx;
const lit=v=>Array.isArray(v)?'['+v.map(lit).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).map(k=>(/^[A-Za-z_$][\w$]*$/.test(k)?k:JSON.stringify(k))+':'+lit(v[k])).join(',')+'}':JSON.stringify(v);
const merged={};
for(const id in table){const T=table[id];const old=FX[id]?JSON.parse(JSON.stringify(FX[id])):null;
 if(!old&&!Object.keys(T.B).length&&!Object.keys(T.E).length)continue;const N=old||{};
 for(const bk in T.B){const {row,len}=T.B[bk];const a=N[bk]||[];if(a.length>len)throw Error(id+'.'+bk+' BAL row longer than the runtime options');
  for(let i=0;i<len;i++){const x=row[i];if(!x)continue;const o=a[i]&&typeof a[i]==='object'?a[i]:{};for(const k in x)o[k]=x[k];a[i]=o}
  for(let i=0;i<a.length;i++)if(a[i]==null)a[i]=0;N[bk]=a}
 /* E: every ending becomes {fx?, k?, sc?, g?} */
 const OE=N.E||{};const NE={};for(const ek of new Set([...Object.keys(OE),...Object.keys(T.E)])){const e={};if(OE[ek])e.fx=OE[ek];Object.assign(e,T.E[ek]||{});NE[ek]=e}
 if(Object.keys(NE).length){delete N.E;N.E=NE}merged[id]=N}
/* rewrite the lines of the fx block; ids new to the block go after the last line of their road (or the block's end) */
const fxA=bal.indexOf('\n fx:{\n'),fxB=bal.indexOf('\n},\n',fxA);if(fxA<0||fxB<0)throw Error('fx block not found');
let block=bal.slice(fxA,fxB);const lines=block.split('\n');const seen=new Set();
for(let i=0;i<lines.length;i++){const lm=/^ (\w+):\{/.exec(lines[i]);if(!lm)continue;const id=lm[1];if(!(id in FX))continue;
 const N=merged[id];if(!N)continue;const tail=lines[i].endsWith(',')?',':'';lines[i]=' '+id+':'+lit(N)+tail;seen.add(id)}
for(const id in merged){if(seen.has(id))continue;const road=id.replace(/_\d+$/,'');let at=-1;
 for(let i=0;i<lines.length;i++){const lm=/^ (\w+):\{/.exec(lines[i]);if(lm&&lm[1].replace(/_\d+$/,'')===road)at=i}
 const L=' '+id+':'+lit(merged[id])+',';if(at<0)lines.push(L);else lines.splice(at+1,0,L)}
bal=bal.slice(0,fxA)+lines.join('\n')+bal.slice(fxB);fs.writeFileSync(BP,bal);
fs.writeFileSync(outJson,JSON.stringify({table,left,otherNums},null,0));console.log('BAL.road.fx chapters written',Object.keys(merged).length,'new',Object.keys(merged).filter(i=>!seen.has(i)).length);
