/* one-core-dup3-h96-move (review/one-core-dup3, item 3): move the typed amounts of the tư tình arc's adj96({h,t,sus,ev,rise,lt}) calls (j96.js:
   h = her heat, t = his tình ý, sus = suspicion, ev = affair-case evidence, rise = his rise, lt = letters) into BAL.arc.h96 (jbalarc.js).
   Key path = BAL.arc.h96.<arc>.<beat>[<option index>] (an option with two calls: [<option index>][<n>]); an ending: .<arc>.E.<ending>;
   the month tick: .month. A `c ? a : b` amount stays a ternary on the two stored values ([a,b]). Writes jbalarc.js + j96.js.
   usage: node dev/measure/one-core-dup3-h96-move.js   (proof: dev/measure/one-core-dup2-same.js, NS 'arc' — put back as the typed objects) */
const fs=require('fs');const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const F='dev/build/j96.js',OUT='dev/build/jbalarc.js';const src=fs.readFileSync(F,'utf8');const ast=acorn.parse(src,{ecmaVersion:'latest'});
const num=n=>n&&((n.type==='Literal'&&typeof n.value==='number')||(n.type==='UnaryExpression'&&n.operator==='-'&&n.argument.type==='Literal'&&typeof n.argument.value==='number'));
const val=n=>n.type==='Literal'?n.value:-n.argument.value;
const calls=[];
(function walk(n,st){if(!n||typeof n.type!=='string')return;st.push(n);
 if(n.type==='CallExpression'&&n.callee.name==='adj96'&&n.arguments[0]&&n.arguments[0].type==='ObjectExpression'){
  let arc=null,beat=null,opt=null,end=null;
  for(let i=0;i<st.length;i++){const x=st[i];
   if(x.type==='AssignmentExpression'&&x.left.type==='MemberExpression'&&x.left.object.name==='ARC67')arc=x.left.property.name;
   if(x.type==='Property'&&st[i-2]&&st[i-2].type==='Property'&&st[i-2].key&&st[i-2].key.name==='B')beat=x.key.name||x.key.value;
   if(x.type==='Property'&&st[i-2]&&st[i-2].type==='Property'&&st[i-2].key&&st[i-2].key.name==='E')end=x.key.name||x.key.value;
   if(x.type==='ArrayExpression'&&st[i-1]&&st[i-1].type==='Property'&&st[i-1].key&&st[i-1].key.name==='o'&&st[i+1])opt=x.elements.indexOf(st[i+1])}
  const fn=st.slice().reverse().find(x=>x.type==='FunctionDeclaration');
  calls.push({n,arc,beat,opt,end,fn:fn&&fn.id.name})}
 for(const k in n){if(k==='type'||k==='start'||k==='end')continue;const c=n[k];if(Array.isArray(c))c.forEach(x=>walk(x,st));else if(c&&typeof c.type==='string')walk(c,st)}st.pop()})(ast,[]);
const H={};const groups={};
for(const c of calls){let g;if(c.fn==='tm96Month')g='month';else if(!c.arc)throw new Error('no arc at '+c.n.start);else if(c.end)g=c.arc+'.E.'+c.end;else g=c.arc+'.'+c.beat+'|'+c.opt;(groups[g]=groups[g]||[]).push(c)}
const edits=[];
for(const g in groups){const L=groups[g];
 const objs=L.map(c=>{const o={},ed=[];for(const p of c.n.arguments[0].properties){const k=p.key.name;if(num(p.value))o[k]=val(p.value);
   else if(p.value.type==='ConditionalExpression'&&num(p.value.consequent)&&num(p.value.alternate)){o[k]=[val(p.value.consequent),val(p.value.alternate)];ed.push(p)}
   else throw new Error('not a number: '+src.slice(p.start,p.end))}return{o,ed,c}});
 let base;if(g==='month')base='BAL.arc.h96.month';else if(g.includes('.E.')){const [a,,e]=g.split('.');base=`BAL.arc.h96.${a}.E.${e}`}else{const [ab,i]=g.split('|');base=`BAL.arc.h96.${ab}[${i}]`}
 const put=(path,v)=>{/* store */const segs=path.replace(/^BAL\.arc\.h96\./,'').match(/[\w$]+|\[\d+\]/g);let o=H;for(let j=0;j<segs.length-1;j++){const s=segs[j],nx=segs[j+1];const k=s[0]==='['?+s.slice(1,-1):s;if(o[k]===undefined)o[k]=nx[0]==='['?[]:{};o=o[k]}const s=segs[segs.length-1];o[s[0]==='['?+s.slice(1,-1):s]=v};
 objs.forEach((x,j)=>{const ref=L.length>1?`${base}[${j}]`:base;put(ref,x.o);
  if(!x.ed.length)edits.push([x.c.n.arguments[0].start,x.c.n.arguments[0].end,ref]);
  else{const parts=x.c.n.arguments[0].properties.map(p=>{const k=p.key.name;return x.ed.includes(p)?`${k}:${src.slice(p.value.test.start,p.value.test.end)}?${ref}.${k}[0]:${ref}.${k}[1]`:`${k}:${ref}.${k}`});
   edits.push([x.c.n.arguments[0].start,x.c.n.arguments[0].end,'{'+parts.join(',')+'}'])}})}
let out=src;for(const [a,b,r] of edits.sort((x,y)=>y[0]-x[0]))out=out.slice(0,a)+r+out.slice(b);fs.writeFileSync(F,out);
/* holes (options with no call) → 0, as BAL.arc.fx does */
const fill=o=>{if(Array.isArray(o)){for(let i=0;i<o.length;i++)if(o[i]===undefined)o[i]=0;else fill(o[i])}else if(o&&typeof o==='object')for(const k in o)fill(o[k])};fill(H);
const ser=v=>Array.isArray(v)?'['+v.map(ser).join(',')+']':v&&typeof v==='object'?'{'+Object.entries(v).map(([k,x])=>k+':'+ser(x)).join(',')+'}':JSON.stringify(v);
const block=` /* h96 = the tư tình arc's adj96 amounts (j96.js; review/one-core-dup3, dev/measure/one-core-dup3-h96-move.js): h = her heat, t = his tình ý,
    sus = suspicion, ev = affair-case evidence, rise = his rise, lt = letters. <arc>.<beat>[option] = the object one option applies (two calls in one
    option: [option][n]; 0 = no call); <arc>.E.<ending> = an ending's; month = the month tick (tm96Month). [a,b] = the two values of a \`c ? a : b\`. */
 h96:{${Object.entries(H).map(([k,v])=>'\n  '+k+':'+ser(v)).join(',')}},
`;
let J=fs.readFileSync(OUT,'utf8');const anchor='Object.assign(BAL,{arc:{\n';if(!J.includes(anchor))throw new Error('anchor');if(J.includes(' h96:{'))throw new Error('h96 already there');
fs.writeFileSync(OUT,J.replace(anchor,anchor+block));console.log(calls.length,'calls',Object.keys(groups).length,'groups')
