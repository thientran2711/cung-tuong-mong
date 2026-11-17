/* ONE CORE text guard (review/one-core-dup r2, owner OD:L1267 "text must print the constant, never a typed number").
   Sibling of dev/test/one-core-guard.js, run by the same gate (dev/tools/coregates.sh G1).
   FAILS when a player-visible string / template text TYPES an amount that is the value of a BAL.eff / BAL.road / BAL.arc constant read in
   the same expression (the rule reads the constant, the words beside it do not: change the BAL value and the text lies).
   "Beside" = inside the nearest enclosing option object of the BAL read, and within 300 chars of it. A typed number
   counts when it equals |value| and its sign agrees ("-15" for -15, "+15" for 15, "±15" / "bớt oán 15" for either; after "oán" / "thù" the sign is read
   inverted: a Thân amount -10 shows as "oán +10"). No enclosing option object (≤ 2500 chars) = the ±300-char window only. Print it instead:
   ${balSg(BAL.eff.m.k)} (signed "+4" / "-4") or ${balAb(BAL.eff.m.k)} (unsigned) — helpers in dev/build/jbal.js. No baseline: the list is empty.
   usage: node dev/test/one-core-text.js [--list]      (--list prints every site, exit 0)
   module: require('./one-core-text.js').scan(buildDir) → sites (used by dev/measure/one-core-text-move.js) */
const fs=require('fs'),path=require('path'),vm=require('vm');
const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const ROOT=path.join(__dirname,'..','..');
const NS=new Set(['eff','road','arc']);
const WIN=300;
const isNum=v=>typeof v==='number'&&isFinite(v)&&v!==0;
function loadBAL(B){
 /* the rulebook values (the BAL files only; a file that needs the game to finish still leaves its const BAL / Object.assign done before it throws) */
 const ctx=vm.createContext({console,Math,Object,Array,JSON,Number,String,window:{},document:{},localStorage:{getItem(){return null}},navigator:{}});
 for(const f of ['jbal.js','jbal2.js','jbaleff.js','jbalroad.js']){try{vm.runInContext(fs.readFileSync(path.join(B,f),'utf8'),ctx)}catch(e){}}
 return vm.runInContext('BAL',ctx)}
/* a typed text and a BAL read in different branches of one if / else / switch are not "beside" each other (two outcomes, two sentences) */
function sameBranch(sa,sb,na,nb){let i=0;while(i<sa.length&&i<sb.length&&sa[i]===sb[i])i++;const L=sa[i-1];if(!L)return true;
 const ca=sa[i]||na,cb=sb[i]||nb;
 if(L.type==='IfStatement'||L.type==='ConditionalExpression')return !(ca!==cb&&[L.consequent,L.alternate].includes(ca)&&[L.consequent,L.alternate].includes(cb));
 if(L.type==='SwitchStatement'||L.type==='SwitchCase'&&false)return ca===cb;
 return true}
function scan(B){
 const BAL=loadBAL(B);
 const ORDER=fs.readFileSync(path.join(B,'assemble.py'),'utf8').match(/for f in \[([^\]]+)\]/)[1].match(/'([^']+)'/g).map(s=>s.slice(1,-1));
 const refOf=n=>{const p=[];let c=n;while(c.type==='MemberExpression'){const k=c.computed?(c.property.type==='Literal'?c.property.value:null):c.property.name;if(k==null)return null;p.unshift(k);c=c.object}
  return c.type==='Identifier'&&c.name==='BAL'?p:null};
 const valOf=p=>{try{let o=BAL;for(const k of p){if(o==null)return undefined;o=o[k]}return o}catch(e){return undefined}};
 const sites=[];
 for(const f of ORDER){const src=fs.readFileSync(path.join(B,f),'utf8');if(!/BAL\.(?:eff|road|arc)/.test(src))continue;
  const ast=acorn.parse(src,{ecmaVersion:'latest',locations:true});
  const strs=[],refs=[];
  (function walk(n,stack){if(!n||typeof n.type!=='string')return;const par=stack[stack.length-1];
   if(n.type==='Literal'&&typeof n.value==='string'&&!(par&&par.type==='Property'&&par.key===n&&!par.computed))strs.push({a:n.start,b:n.end,s:n.value,lit:1,line:n.loc.start.line,stack:stack.slice()});
   else if(n.type==='TemplateElement')strs.push({a:n.start,b:n.end,s:n.value.cooked||'',lit:0,line:n.loc.start.line,stack:stack.slice()});
   else if(n.type==='MemberExpression'&&!(par&&par.type==='MemberExpression'&&par.object===n)){
    const p=refOf(n);if(p&&p.length>=2&&NS.has(p[0])){const v=valOf(p);if(isNum(v))refs.push({n,p,v,stack:stack.slice()})}}
   stack.push(n);for(const k in n){if(k==='type'||k==='start'||k==='end'||k==='loc')continue;const c=n[k];if(Array.isArray(c))c.forEach(x=>walk(x,stack));else if(c&&typeof c.type==='string')walk(c,stack)}stack.pop()})(ast,[]);
  /* per typed number: every ref it could copy */
  const byTok=new Map();
  for(const r of refs){
   let box=null;for(let i=r.stack.length-1;i>=0;i--){const x=r.stack[i];if(x.type==='ObjectExpression'&&x.end-x.start<=2500){box=x;break}}
   const a=Math.max(box?box.start:0,r.n.start-WIN),b=Math.min(box?box.end:src.length,r.n.end+WIN);
   const abs=Math.abs(r.v);
   for(const t of strs){if(t.a<a||t.b>b)continue;if(!sameBranch(r.stack,t.stack,r.n,t))continue;if(t.lit&&!/[^\x00-\x7f]|[A-Za-z]{3}/.test(t.s))continue;/* a plain string must hold words (not a CSS / key string); a template piece may be just " (-8)." after a ${} */
    const re=/([+\-−±]?)(?<![\w$.,])(\d+(?:\.\d+)?)(?![\d]|[.,]\d)/g;let m;
    while((m=re.exec(t.s))){if(+m[2]!==abs)continue;const sg=m[1];const pre=t.s.slice(Math.max(0,m.index-14),m.index);if(!sg&&!/(?:oán|thù|bớt|giảm|mất|thiện cảm|thân|quý|ghen|lòng)\s*$/i.test(pre))continue;/* an unsigned number must follow a relation word */
     const inv=/(?:oán|thù)\s*$/i.test(t.s.slice(Math.max(0,m.index-12),m.index));const v=inv?-r.v:r.v;
     if(sg==='+'&&v<0||(sg==='-'||sg==='−')&&v>0)continue;
     const k=t.a+':'+m.index;const e=byTok.get(k)||{t,idx:m.index,sg,abs:m[2],inv,cands:[]};e.cands.push(r);byTok.set(k,e)}}}
  for(const e of byTok.values()){const uniq=[...new Map(e.cands.map(r=>[r.n.start,r])).values()];const r=uniq[0];
   sites.push({f,line:e.t.line,t:e.t,idx:e.idx,sg:e.sg,abs:e.abs,inv:e.inv,cands:uniq.map(x=>({key:x.p.join('.'),v:x.v,ref:src.slice(x.n.start,x.n.end)})),amb:uniq.length>1,
    text:e.t.s.slice(Math.max(0,e.idx-24),e.idx+e.abs.length+14).replace(/\s+/g,' ')})}}
 sites.sort((x,y)=>ORDER.indexOf(x.f)-ORDER.indexOf(y.f)||x.line-y.line);
 return sites}
module.exports={scan,loadBAL};
if(require.main===module){
 const B=process.env.OC_BUILD||path.join(ROOT,'dev','build');
 const sites=scan(B);const per={};sites.forEach(s=>per[s.f]=(per[s.f]||0)+1);
 const row=s=>`${s.f}:${s.line} ${s.cands.map(c=>c.key+'='+c.v).join(' | ')}  «…${s.text}…»`;
 if(process.argv.includes('--list')){sites.forEach(s=>console.log(row(s)));console.log(JSON.stringify({sites:sites.length,per}));process.exit(0)}
 console.log(JSON.stringify({sites:sites.length,per}));
 if(sites.length){console.log('FAIL: a player text types an amount that is a BAL.eff / BAL.road / BAL.arc value read beside it (print the constant: ${balSg(BAL…)} / ${balAb(BAL…)})\n  '+sites.slice(0,+(process.env.OCG_MAX||60)).map(row).join('\n  '));process.exit(1)}
 console.log('PASS: no player text types an amount that lives in BAL.eff / BAL.road / BAL.arc')}
