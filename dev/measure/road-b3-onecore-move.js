/* road-b3-onecore-move = dev/measure/road-onecore-move.js (review/road-onecore) + the B3 odds patterns (artThi, th0/hh0/tin0, cnvQv, chuE, banE, banRS, matTin, lmmR; "kd" = RDQ/k) + ...MAT2(o,m) twins (two runtime options). Run on dev/build/rdfrag, then rdfrag/cat.sh. */
/* road-onecore-move: ONE CORE (OD:L1267) mover for the full-road data files (jrd_<origin>.js), review/road-onecore.
   For every rdDef(road,n,{… B:{beat:{… o:[option…]}}, E:{end:{… fx}}}) it takes the rule numbers OUT of the data file
   and writes them into BAL.road.fx["<road>_<n>"] (dev/build/jbalroad.js):
     option  c (cost) · w (win gain) · l (loss) · o (odds, an arrow function)  → BAL.road.fx[id][beat][i] = {c,w,l,o}
     ending  fx                                                                → BAL.road.fx[id].E[end]
   An odds function is stored as an ordered term list evaluated left to right by rdOdds (jroad.js), so the value is bit-identical:
     [base, ["d",stat,k] = +S[stat]/k, ["m",stat,k] = +S[stat]*k, ["f",flag,y,n] = +(A.f[flag]?y:n), ["e",ch,end,y,n] = +(rdEnd(ch)===end?y:n)]
   An odds function of any other shape is left in the data file and listed (fixed by hand with named BAL keys).
   usage: node dev/measure/road-onecore-move.js <dev/build dir> <out json> jrd_tt.js … (rewrites the files in place, writes the table) */
const fs=require('fs'),path=require('path');
const [dir,outJson,...files]=process.argv.slice(2);
function mask(s){/* blank string / template / comment bodies (same length) so brackets can be matched on the mask */
 const o=s.split('');let i=0;const n=s.length;const bl=(a,b)=>{for(let k=a;k<b;k++)if(o[k]!=='\n')o[k]=' '};
 while(i<n){const c=s[i];
  if(c==='/'&&s[i+1]==='*'){const e=s.indexOf('*/',i+2)+2;bl(i,e);i=e;continue}
  if(c==='/'&&s[i+1]==='/'){const e=s.indexOf('\n',i);bl(i,e);i=e;continue}
  if(c==='"'||c==="'"){let j=i+1;while(s[j]!==c){if(s[j]==='\\')j++;j++}bl(i+1,j);i=j+1;continue}
  if(c==='`'){let j=i+1,d=0;while(j<n){if(s[j]==='\\'){j+=2;continue}if(d===0&&s[j]==='`')break;if(s[j]==='$'&&s[j+1]==='{'){d++;j+=2;continue}if(d&&s[j]==='}'){d--;j++;continue}j++}bl(i+1,j);i=j+1;continue}
  i++}
 return o.join('')}
const close=(m,i)=>{let d=0;for(let j=i;j<m.length;j++){const c=m[j];if('([{'.includes(c))d++;else if(')]}'.includes(c)){d--;if(d===0)return j}}throw Error('unclosed at '+i)};
/* depth-1 members of the object/array opening at i: [{key,ks (key start),vs (value start),ve (value end, exclusive)}] */
function members(m,i,arr){const end=close(m,i);const out=[];let j=i+1;
 while(j<end){while(j<end&&/[\s,]/.test(m[j]))j++;if(j>=end)break;let key=null,ks=j;
  if(!arr){const km=/^(get\s+[A-Za-z_$][\w$]*(?=\s*\())|^([A-Za-z_$][\w$]*|"[^"]*"|'[^']*')\s*(?::|(?=\())/.exec(m.slice(j,j+80));if(km&&km[1])km[1]=km[1].replace(/\s+/,' ');else if(km)km[1]=km[2];if(!km)throw Error('no key at '+j+': '+m.slice(j,j+40));key=km[1];j+=km[0].length}
  const vs=j;let d=0;while(j<end){const c=m[j];if('([{'.includes(c))d++;else if(')]}'.includes(c))d--;else if(c===','&&d===0)break;j++}
  out.push({key,ks,vs,ve:j})}
 return out}
const ODDS_T=[[/^S\.(\w+)\/(\d+(?:\.\d+)?)$/,m=>["d",m[1],+m[2]]],[/^\(S\.(\w+)\/(\d+(?:\.\d+)?)\)$/,m=>["d",m[1],+m[2]]],[/^S\.(\w+)\*(\d+(?:\.\d+)?)$/,m=>["m",m[1],+m[2]]],
 [/^\(A\.f\.(\w+)\?(\d+):(\d+)\)$/,m=>["f",m[1],+m[2],+m[3]]],[/^\(rdEnd\((\d+)\)==="(\w+)"\?(\d+):(\d+)\)$/,m=>["e",+m[1],m[2],+m[3],+m[4]]],
 [/^\((?:CN_FL|MUOI_FL)\("([\w.]+)"\)\?(\d+):(\d+)\)$/,m=>["b",m[1],+m[2],+m[3]]],
 [/^\(((?:A\.f\.\w+\|\|)+A\.f\.\w+)\?(\d+):(\d+)\)$/,m=>["f",m[1].replace(/A\.f\./g,'').split('||').join('|'),+m[2],+m[3]]],
 [/^\(((?:rdEnd\(\d+\)==="win"\|\|)+rdEnd\(\d+\)==="win")\?(\d+):(\d+)\)$/,m=>["e",m[1].match(/\d+/g).map(Number),"win",+m[2],+m[3]]],
 /* named road predicates / counts (RDQ in jroad.js, registered by the data file; their own bars are BAL keys) */
 [/^DTQBN_WON\(\)\*(\d+)$/,m=>["k","dtqbnWon",+m[1]]],[/^DTQV_WON\(\)\*(\d+)$/,m=>["k","dtqvWon",+m[1]]],
 [/^\(S\.arts&&S\.arts\.y\|\|0\)\*(\d+)$/,m=>["k","artY",+m[1]]],
 [/^\(S\.arts&&S\.arts\.thi\|\|0\)\*(\d+)$/,m=>["k","artThi",+m[1]]],
 [/^\(S\.(th|hh|tin)\|\|0\)\/(\d+)$/,m=>["kd",m[1]+"0",+m[2]]],
 [/^CNV_QV\(\)\/(\d+)$/,m=>["kd","cnvQv",+m[1]]],[/^CHU_E\(\)\/(\d+)$/,m=>["kd","chuE",+m[1]]],[/^BAN_E\(\)\/(\d+)$/,m=>["kd","banE",+m[1]]],
 [/^\(BAN_R\(\)\?S\.sung\/5:\(S\.tin\|\|0\)\/5\)$/,m=>["k","banRS",1]],
 [/^\(MATR\(\)\?0:S\.tin\/5\)$/,m=>["k","matTin",1]],
 [/^\(LMMR\(\)\?(\d+):(\d+)\)$/,m=>["q","lmmR",+m[1],+m[2]]],
 [/^\(CNCHU_UP\(A\)>=BAL\.road\.cn_chu\.gap\?(\d+):(\d+)\)$/,m=>["q","cnchuGap",+m[1],+m[2]]],
 [/^\(S\.danh>=BAL\.road\.cn_tinh\.danh\?(\d+):(\d+)\)$/,m=>["q","cnTinhDanh",+m[1],+m[2]]]];
const ODDS_WHOLE={'A=>CNCHU_UP(A)>=0?55+S.danh/5:30+S.danh/5':[0,["q","cnchuUp",55,30],["d","danh",5]]};
function odds(fn){if(ODDS_WHOLE[fn])return ODDS_WHOLE[fn];const b=fn.replace(/^(\(\)|A|\(A\))=>/,'');if(b===fn)return null;
 /* split on top-level + / − (no top-level ?:, comparisons, ||) */
 let d=0;const parts=[];let a=0,sg='+';for(let i=0;i<b.length;i++){const c=b[i];if(c==='(')d++;else if(c===')')d--;else if(d===0){if(c==='+'||c==='-'){parts.push([sg,b.slice(a,i)]);sg=c;a=i+1}else if('?<>=|&'.includes(c))return null}}
 parts.push([sg,b.slice(a)]);const q=[];let bad=false;
 parts.forEach(([g,p],k)=>{if(bad)return;if(k===0&&g==='+'&&/^\d+(\.\d+)?$/.test(p)){q.push(+p);return}if(k===0)q.push(0);
  for(const [re,f] of ODDS_T){const m=re.exec(p);if(m){const t=f(m);if(g==='-'){if(!/^[feb]$/.test(t[0])){bad=true;return}t[0]='-'+t[0]}q.push(t);return}}bad=true});
 return bad?null:q}
function _unused_evalOdds(q,S,A,rdEnd){let x=q[0];for(let i=1;i<q.length;i++){const t=q[i];
 x+=t[0]==="d"?S[t[1]]/t[2]:t[0]==="m"?S[t[1]]*t[2]:t[0]==="f"?(A.f[t[1]]?t[2]:t[3]):(rdEnd(t[1])===t[2]?t[3]:t[4])}return x}
const table={},left=[],check=[];
for(const f of files){const fp=path.join(dir,f);let src=fs.readFileSync(fp,'utf8');const m=mask(src);const cuts=[];/* [a,b] ranges to delete */
 const re=/\brdDef\(/g;let r;
 while((r=re.exec(m))){const pa=r.index+5;const args=members(m,pa,true);if(args.length<3)continue;
  const road=JSON.parse(src.slice(args[0].vs,args[0].ve).trim()),n=+src.slice(args[1].vs,args[1].ve).trim(),id=road+'_'+n;
  const def=args[2];if(m[def.vs]!=='{')throw Error(id+': def is not a literal');proc(id,def.vs)}
 /* jend14 (Phần cuối hồi form): ARC67.<id>={… B, E …} literals take the same table; the file calls rdFx(id,ARC67.<id>) after each */
 const re2=/\bARC67\.(\w+)=\{/g;let r2;while((r2=re2.exec(m))){if(src.slice(r2.index,r2.index+80).indexOf('o:"eg"')<0)continue;proc(r2[1],r2.index+r2[0].length-1)}
 function proc(id,defVs){const T=table[id]={};
  const dm=members(m,defVs,false);
  const take=(mem,keys,into,where)=>{const own=members(m,mem.vs,false);let any=false;
   own.forEach((x,ix)=>{if(!keys.includes(x.key))return;let txt=src.slice(x.vs,x.ve).trim();
    if(x.key==='o'){const q=odds(txt);if(!q){left.push(`${f} ${where} o: ${txt}`);return}check.push({fn:txt,q,where:f+' '+where});into.o=q}
    else{if(!/^\{(\s*[A-Za-z_$]+\s*:\s*-?\d+(\.\d+)?\s*,?)*\s*\}$/.test(txt)){left.push(`${f} ${where} ${x.key}: ${txt}`);return}into[x.key]=Function('return '+txt)()}
    /* cut "key:value" and one neighbouring comma */
    let a=x.ks,b=x.ve;if(src[b]===',')b++;else{let k=a-1;while(/\s/.test(src[k]))k--;if(src[k]===',')a=k}
    cuts.push([a,b]);any=true});return any};
  for(const mem of dm){
   if(mem.key==='B'){for(const beat of members(m,mem.vs,false)){const bm=members(m,beat.vs,false);const om=bm.find(x=>x.key==='o');if(!om||m[om.vs]!=='[')continue;
     T[beat.key]=[];members(m,om.vs,true).forEach((op,i)=>{const W=id+'.'+beat.key+'['+i+']';
      /* ...MAT2(o,m) (jrd_cnv cnv_mat) = TWO runtime options: o, and o overridden by m (Object.assign) */
      if(src.startsWith('...MAT2(',op.vs)){const ar=members(m,op.vs+7,true);const a0={},a1={};take(ar[0],['c','w','l','o'],a0,W+'.o');if(ar[1])take(ar[1],['c','w','l','o'],a1,W+'.m');
       const b0=Object.keys(a0).length?a0:0,b1=Object.assign({},a0,a1);T[beat.key].push(b0,Object.keys(b1).length?b1:0);return}
      if(m[op.vs]!=='{'){if(src[op.vs]==='.')left.push(W+' spread');T[beat.key].push(0);return}const into={};take(op,['c','w','l','o'],into,W);T[beat.key].push(Object.keys(into).length?into:0)})}}
   if(mem.key==='E'){T.E={};for(const en of members(m,mem.vs,false)){const into={};take(en,['fx'],into,id+'.E.'+en.key);if(Object.keys(into).length)T.E[en.key]=Object.keys(into).length===1&&into.fx?into.fx:into}}}
 }
 cuts.sort((x,y)=>y[0]-x[0]);for(const [a,b] of cuts)src=src.slice(0,a)+src.slice(b);fs.writeFileSync(fp,src);console.log(f,'cuts',cuts.length)}
/* the before/after proof is dev/measure/road-onecore-same.js (loads old + new chapters and compares every value) */
fs.writeFileSync(outJson,JSON.stringify({table,left,checks:check.length},null,0));
console.log('chapters',Object.keys(table).length,'odds converted',check.length,'left for hand',left.length);left.forEach(x=>console.log('  LEFT',x));
