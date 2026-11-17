/* ONE CORE text guard (review/one-core-dup r2, owner OD:L1267 "text must print the constant, never a typed number").
   Sibling of dev/test/one-core-guard.js, run by the same gate (dev/tools/coregates.sh G1).
   FAILS when a player-visible string / template text TYPES an amount that is the value of a BAL.eff / BAL.road / BAL.arc constant read in
   the same expression (the rule reads the constant, the words beside it do not: change the BAL value and the text lies).
   "Beside" = inside the nearest enclosing option object of the BAL read, and within 300 chars of it. A typed number
   counts when it equals |value| and its sign agrees ("-15" for -15, "+15" for 15, "±15" / "bớt oán 15" for either; after "oán" / "thù" the sign is read
   inverted: a Thân amount -10 shows as "oán +10"). No enclosing option object (≤ 2500 chars) = the ±300-char window only. Print it instead:
   ${balSg(BAL.eff.m.k)} (signed "+4" / "-4") or ${balAb(BAL.eff.m.k)} (unsigned) — helpers in dev/build/jbal.js. No baseline: the list is empty.
   CUTS (review/one-core-dup2 r2): also fails a typed threshold copy of a moved ladder: beside a BAL.loy / ducLv / quyLv / wit / sungLv / tinhLv / tinLv / sucLv /
   rareLv / oanFade / tsDanger / cut / odds / ageBand read, or (stat-word scan, whole game) "lòng 60+" / "dưới 40" for BAL.loy, a typed tier range "80–100" for ducLv / sungLv …
   OC_WIDE=1 lists every stat-word threshold in any shape (diagnostic: lone "Đức từ 40" gates of other rules share numbers by coincidence and are NOT failures).
   AMOUNTS (review/one-core-dup r3, scanAmt): a typed signed amount after "thiện cảm / quý / thân / với ngươi" (rel), "oán / thù" (oán) or "thế lực" (pow) that equals a BAL.eff
   amount of the same kind read in the same module (or the linked modules, LINK) fails — previews, AOUT / add() tables, risk: lines, buttons, BOTH branches of an if; relAdd-derived
   oán (|n|×BAL.relOan.hurt / doer / mend, print balOan(ref,"hurt")) and an inverted read count. OC_GLOBAL=1 compares with every module (diagnostic).
   usage: node dev/test/one-core-text.js [--list]      (--list prints every site, exit 0)
   module: require('./one-core-text.js').scan(buildDir) → sites (used by dev/measure/one-core-text-move.js) */
const fs=require('fs'),path=require('path'),vm=require('vm');
const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const ROOT=path.join(__dirname,'..','..');
const NS=new Set(['eff','road','arc']);/* amounts of effects: a signed typed number beside them is a copy */
/* CUT keys (review/one-core-dup2): thresholds / ladders the words show ("lòng 60+", "dưới 40", "80–100"): ANY typed number equal to one of their values beside the read is a copy */
const CUT=new Set(['loy','wit','ducLv','quyLv','sungLv','tinhLv','tinLv','rareLv','sucLv','oanFade','tsDanger','cut','odds','ageBand']);
const CUT2={age:new Set(['adult']),srvAge:new Set(['old']),pet:new Set(['life'])};
const WIN=300;
const isNum=v=>typeof v==='number'&&isFinite(v)&&v!==0;
function loadBAL(B){
 /* the rulebook values (the BAL files only). Each top-level statement runs on its own, so one that needs the game (contestOpen …) cannot stop the
    Object.assign(BAL,{…}) after it from running */
 const ctx=vm.createContext({console,Math,Object,Array,JSON,Number,String,window:{},document:{},localStorage:{getItem(){return null}},navigator:{}});
 for(const f of ['jbal.js','jbal2.js','jbaleff.js','jbalroad.js','jbalarc.js','jecon.js'])/* jecon: only its Object.assign(BAL,…) rule tables (BAL.loyalCost / selfMinus …) */{const src=fs.readFileSync(path.join(B,f),'utf8');
  for(const st of acorn.parse(src,{ecmaVersion:'latest'}).body){const code=src.slice(st.start,st.end);if(f==='jecon.js'&&!/^Object\.assign\(BAL,/.test(code))continue;try{vm.runInContext(code,ctx)}catch(e){}}}
 return vm.runInContext('BAL',ctx)}
/* BAL.a.b[2] / BAL.a["b"] path text → value */
const BALPATH='BAL(?:\\.[\\w$]+|\\["[^"]+"\\]|\\[\\d+\\])+';
function valAt(BAL,txt){try{let o=BAL;for(const m of txt.slice(3).matchAll(/\.([\w$]+)|\["([^"]+)"\]|\[(\d+)\]/g))o=o[m[1]!==undefined?m[1]:m[2]!==undefined?m[2]:+m[3]];return o}catch(e){return undefined}}
/* a typed text and a BAL read in different branches of one if / else / switch are not "beside" each other (two outcomes, two sentences) */
function sameBranch(sa,sb,na,nb){let i=0;while(i<sa.length&&i<sb.length&&sa[i]===sb[i])i++;const L=sa[i-1];if(!L)return true;
 const ca=sa[i]||na,cb=sb[i]||nb;
 if(L.type==='IfStatement'||L.type==='ConditionalExpression')return !(ca!==cb&&[L.consequent,L.alternate].includes(ca)&&[L.consequent,L.alternate].includes(cb));
 if(L.type==='SwitchStatement'||L.type==='SwitchCase'&&false)return ca===cb;
 return true}

/* ---- AMOUNT SCAN (review/one-core-dup r3): every typed signed amount in a text that equals a BAL.eff amount of the SAME KIND, anywhere in the game ----
   kind of a BAL.eff key = what the call that reads it changes: relAdd / affAdd / kcAf / rdRel / e67ally … = thiện cảm (rel); oanAdd / rdOan = oán;
   tdPowAdd = thế lực (pow). A text number counts when the words just before it name that kind ("thiện cảm +8", "quý ngươi -3", "thân -4", "oán +5",
   "thù -12", "thế lực -3") and it equals a value of that kind (sign included). Derived oán: relAdd(n<0) also gives oán |n|×BAL.relOan.hurt (hurt one) and
   |n|×doer (the doer), relAdd(n>0) takes mend×n off: those derived amounts count as oán values too (print balOan(ref)). A relation read inverted ("nàng oán +10" for a
   Thân amount -10) counts. Searched in EVERY module (previews, action tables AOUT / add() / risk:, buttons) and in both branches of an if. */
const PROP_KIND={th:'th',hh:'hh',loyal:'loyal',maid:'loyal'};
const KIND_OF={relAdd:'rel',affAdd:'rel',kcAf:'rel',rdRel:'rel',e67ally:'rel',e67dad:'rel',e67bien:'pow',e67kho:'pow',e67pun:'rel',e67foe:'rel',e67drop:'rel',oanAdd:'oan',rdOan:'oan',tdPowAdd:'pow'};
/* (c) the STAT word just before the number decides its kind, before any relation word: "Thái hậu với nàng +5" is Thái hậu (th), "Hoàng hậu thiện cảm -5"
   is Hoàng hậu (hh: her own stat for the player, or her relation to a consort), "lòng với ngươi -8" is a servant's lòng (loyal). Only the amounts that
   the code applies to THAT stat count: {th:BAL…} / x.th=…BAL… (th), {hh:BAL…} or a relation call (hh), {loyal:…} / {maid:…} / .loyal=…BAL… (loyal). */
const STATW=[[/Thái hậu/,'th'],[/Hoàng hậu/,'hh'],[/(?:^|[^\p{L}])[Ll]òng(?![\p{L}])/u,'loyal']];
const WORD={rel:/(?:thiện cảm|thù|quý(?: mến)?(?: ngươi| nàng| ta| nhau)?|[Tt]hân(?: với ngươi| với nàng)?|với ngươi|với nàng|với ta|mến)\s*$/,oan:/(?:oán|thù)[^\d+\-−()]{0,26}\(?\s*$/i,pow:/thế lực\s*$/};
/* a text is compared with the BAL.eff amounts read in ITS OWN module and in the modules whose actions it previews. A module that wraps another module's option
   (Object.assign({},A[i],{x:…,risk:…}) in a talkOpts / coldActs wrapper) shows that module's amounts: list the pair here (text module → rule modules). OC_GLOBAL=1 compares
   with every module (diagnostic: lists numbers that coincide, to find a missing pair). */
/* LINKS ARE DERIVED FROM CODE (review/one-core-dup2 r3, reviewer FAIL 3a: no hand list): dev/test/one-core-bind.js linkMods() — every link name of the
   text (AOUT / ACT / act-table property keys, add("k") / A("k") / loBtn(c,"k") string arguments, data-x="k", ACT.k.f= chains, if(k==="lit") branches) → the
   module that defines that act (A("k",…), ACT.k=…, k:{…run…} table entries, if(…==="k") branches, a handler named …K); an option looked up by name
   (A.findIndex(a=>a.n==="…"), /^…/.test(a.n)) → the module that defines n:"…". */
const BIND=require('./one-core-bind.js');
function scanAmt(B,BAL,ORDER){
 const mods=ORDER.map(f=>{const src=fs.readFileSync(path.join(B,f),'utf8');return{f,src,ast:acorn.parse(src,{ecmaVersion:'latest',locations:true})}});
 const kindOf={};/* key → Set of kinds */
 const refPath=n=>{const p=[];let c=n;while(c.type==='MemberExpression'){const k=c.computed?(c.property.type==='Literal'?c.property.value:null):c.property.name;if(k==null)return null;p.unshift(k);c=c.object}return c.type==='Identifier'&&c.name==='BAL'&&p[0]==='eff'?p:null};
 const valOfP=p=>{try{let o=BAL;for(const k of p)o=o[k];return o}catch(e){return undefined}};
 const refsOf=m=>{const R=[],S=[];(function walk(n,stack){if(!n||typeof n.type!=='string')return;const par=stack[stack.length-1];
   if(n.type==='Literal'&&typeof n.value==='string'&&!(par&&par.type==='Property'&&par.key===n&&!par.computed))S.push({a:n.start,b:n.end,s:n.value,lit:1,line:n.loc.start.line,node:n,stack:stack.slice()});
   else if(n.type==='TemplateElement')S.push({a:n.start,b:n.end,s:n.value.cooked||'',lit:0,line:n.loc.start.line,node:n,stack:stack.slice()});
   else if(n.type==='MemberExpression'&&!(par&&par.type==='MemberExpression'&&par.object===n)){const p=refPath(n);if(p&&p.length>=3){let kind=null;for(let i=stack.length-1;i>=0;i--){const x=stack[i];if(x.type==='CallExpression'&&x.callee.type==='Identifier'&&KIND_OF[x.callee.name]){kind=KIND_OF[x.callee.name];break}
       /* {th:BAL…} in apply / ap, x.th=x.th+BAL…, s.loyal=cl(s.loyal+BAL…) */
       if(x.type==='Property'&&!x.computed&&PROP_KIND[x.key.name]){kind=PROP_KIND[x.key.name];break}
       if(x.type==='AssignmentExpression'&&x.left.type==='MemberExpression'&&!x.left.computed&&PROP_KIND[x.left.property.name]){kind=PROP_KIND[x.left.property.name];break}
       if(/Function|Statement/.test(x.type))break}
     R.push({n,p,kind,src:m.src.slice(n.start,n.end)})}}
   stack.push(n);for(const k in n){if(k==='type'||k==='start'||k==='end'||k==='loc')continue;const c=n[k];if(Array.isArray(c))c.forEach(x=>walk(x,stack));else if(c&&typeof c.type==='string')walk(c,stack)}stack.pop()})(m.ast,[]);return{R,S}};
 /* pass 1: the amounts of each kind (key + [i] index), every module */
 const vals={rel:[],oan:[],pow:[],th:[],hh:[],loyal:[]};const idx=BIND.index(B);const per=mods.map(m=>refsOf(m));
 const hurt=BAL.relOan?BAL.relOan.hurt:.6,doer=BAL.relOan?BAL.relOan.doer:.2,mend=BAL.relOan?BAL.relOan.mend:.3;
 const seen=new Set();
 per.forEach((pr,mi)=>pr.R.forEach(r=>{if(!r.kind)return;const v=valOfP(r.p);const list=Array.isArray(v)?v.map((x,i)=>[x,r.src.replace(/\[[01]\]$/,'')+'['+i+']']):[[v,r.src]];
  for(const [x,ref] of list){if(!isNum(x))continue;const id=r.kind+ref;if(seen.has(id))continue;seen.add(id);
   vals[r.kind].push({v:x,ref,as:'sg',mod:mods[mi].f,pos:r.n.start});
   if(r.kind==='rel'){if(x<0){vals.oan.push({v:-x,ref,as:'ab',inv:1,mod:mods[mi].f,pos:r.n.start});const d=Math.round(-x*hurt),e=Math.round(-x*doer);if(d)vals.oan.push({v:d,ref,as:'oan',mult:'hurt',mod:mods[mi].f,pos:r.n.start});if(e)vals.oan.push({v:e,ref,as:'oan',mult:'doer',mod:mods[mi].f,pos:r.n.start})}else{const d=Math.round(x*mend);if(d)vals.oan.push({v:-d,ref,as:'oan',mult:'mend',mod:mods[mi].f,pos:r.n.start})}}}}));
 const out=[];
 mods.forEach((m,mi)=>{for(const t of per[mi].S){if(!/\d/.test(t.s))continue;
  const re=/([+\-−±]?)(?<![\w$.,])(\d+(?:\.\d+)?)(?![\d]|[.,]\d)/g;let q;
  while((q=re.exec(t.s))){const before=t.s.slice(Math.max(0,q.index-40),q.index).replace(/\s+$/,' ');
   /* the clause the number sits in (after the last "·" / ";" / "," / "." / ":"): its stat word wins */
   const clause=before.split(/[·;,.]/).pop();let st=null,at=1e9;for(const w of STATW){const q=w[0].exec(clause);if(q&&q.index<at){at=q.index;st=w}}/* the FIRST stat word: "Thái hậu với Hoàng hậu +5" is Thái hậu's */
   const kinds=st?(st[1]==='hh'?['hh','rel']:[st[1]]).filter(k=>st[1]!=='hh'||k==='hh'||WORD.rel.test(before)):Object.keys(WORD).filter(k=>WORD[k].test(before));if(!kinds.length)continue;
   if(!t.links)t.links=BIND.linkMods(idx,m.f,t.stack,t.node);
   const sg=q[1];if(!sg&&!/(?:oán|thù|bớt|giảm|mất|thiện cảm|thân|quý|ghen|lòng)\s*$/i.test(before))continue;/* unsigned only straight after a relation word */
   const n=+q[2];const cands=[];
   for(const k of kinds)for(const c of vals[k]){if(!(process.env.OC_GLOBAL||t.links.has(c.mod)))continue;const sv=sg==='-'||sg==='−'?-n:(sg==='+'?n:null);const cv=c.v;
     /* signed typed: equal value and sign; unsigned: equal magnitude */
     if(sv!=null?cv!==sv&&!(c.inv&&cv===n&&sg==='+'):Math.abs(cv)!==n)continue;cands.push(c)}
   if(!cands.length)continue;
   /* nearest rule first: same module, closest in the file; then the linked modules */
   const tp=t.a;cands.sort((a,b)=>(a.mod===m.f?0:1)-(b.mod===m.f?0:1)||(a.mod===m.f?Math.abs(a.pos-tp)-Math.abs(b.pos-tp):0));
   const uq=[...new Map(cands.map(c=>[c.ref+c.as+(c.mult||''),c])).values()];
   out.push({f:m.f,line:t.line,t,idx:q.index,sg,abs:q[2],inv:false,amt2:true,cands:uq.map(c=>({key:c.ref.replace(/^BAL\./,''),v:c.v,ref:c.ref,as:c.as,mult:c.mult,mod:c.mod})),amb:uq.length>1,
    text:t.s.slice(Math.max(0,q.index-24),q.index+q[2].length+14).replace(/\s+/g,' ')})}}});
 return out}
/* ---- EVIDENCE COUNT SCAN (review/one-core-dup3 r1, reviewer FAIL 2: the window pass above missed every typed "nắm 1 chứng cứ" whose evA read sat
   > 300 chars away, in another function, an AOUT pair or a caught() helper) ----
   A typed chứng cứ count in a player text: "chứng cứ +1" / "Chứng cứ -1" / "chứng cứ ${v.name} +2" (signed, after the word, a name between allowed) or
   "nắm 2 chứng cứ" / "tốn: 1 chứng cứ" / "(dò ra mưu kế: 1 chứng cứ)" (unsigned, before the word, after nắm / thêm / tốn / dùng / trả lại / được / "(" / ":").
   Thresholds ("cần 2 chứng cứ", "có …", "đủ …", "Gom 3 …", "N/2") are not counts. It FAILS when the number equals an evidence amount BAL.eff.<m>.ev<Site>
   (the 2nd / 3rd argument of evA / evStory, BAL.evWipe excluded) read in the text's own module or a module it previews (BIND.linkMods, the same links as
   the amount scan; signed text: sign included). A caught / confession sentence ("bị phát giác", "bị bắt", "bắt gặp", "khai ra" ≤ 80 chars before) is also
   compared with the two shared catch rules every scheme runs through: caught() BAL.eff.j8.evCaught and runAct's sent-servant confession BAL.eff.j9.evN.
   Not a copy (skipped): the option / function the text sits in changes a counter with the SAME typed number and reads no ev amount (S.coldEv+1, st.proof++,
   S.caseEv-1, deA(a,t,1) — a quest / tham-ô counter: the typed rule belongs to one-core-guard, not to this text scan).
   Templates are read whole (each ${} = "{}") so "chứng cứ ${v.name} +2" is one sentence. */
const EV_SG=/chứng cứ((?:\s*(?:về|của)?\s*(?:\{\}|[^\d\s·;,.:()+\-−{}<>][^\d·;,.:()+\-−{}<>]{0,30}?))?)\s*([+\-−])(\d+)(?![\d.,]\d|\s*\/)/gi;
const EV_AB=/(?<![\w$.,\/])(\d+)\s+chứng cứ/gi;
const EV_PRE=/(?:nắm(?: thêm| được)?|thêm|tốn:?|dùng|trả lại|chuộc lại|lấy được|được|ra|kế:|\(|:)\s*$/i;
const EV_THR=/(?:cần|có|đủ|gom|tới|ít nhất|hơn)\s*$/i;
function scanEv(B,BAL,ORDER){
 const idx=BIND.index(B);const out=[];const vals=[];/* {v,ref,mod} */
 const mods=ORDER.map(f=>{const src=fs.readFileSync(path.join(B,f),'utf8');return{f,src,ast:acorn.parse(src,{ecmaVersion:'latest',locations:true})}});
 const refPath=n=>{const p=[];let c=n;while(c.type==='MemberExpression'){const k=c.computed?(c.property.type==='Literal'?c.property.value:null):c.property.name;if(k==null)return null;p.unshift(k);c=c.object}return c.type==='Identifier'&&c.name==='BAL'?p:null};
 const valOfP=p=>{try{let o=BAL;for(const k of p)o=o[k];return o}catch(e){return undefined}};
 const walk=(n,stack,fn)=>{if(!n||typeof n.type!=='string')return;fn(n,stack);stack.push(n);for(const k in n){if(k==='type'||k==='start'||k==='end'||k==='loc')continue;const c=n[k];if(Array.isArray(c))c.forEach(x=>walk(x,stack,fn));else if(c&&typeof c.type==='string')walk(c,stack,fn)}stack.pop()};
 const per=mods.map(m=>{const R=[],T=[];walk(m.ast,[],(n,stack)=>{const par=stack[stack.length-1];
   if(n.type==='MemberExpression'&&!(par&&par.type==='MemberExpression'&&par.object===n)){const p=refPath(n);if(p&&p[0]==='eff'&&p.length>=3&&/^ev[A-Z0-9_]/.test(p[2])){const v=valOfP(p);const L=Array.isArray(v)?v.map((x,i)=>[x,'BAL.'+p.join('.')+'['+i+']']):[[v,'BAL.'+p.join('.')]];for(const [x,ref] of L)if(isNum(x))R.push({v:x,ref,mod:m.f,pos:n.start})}}
   if(n.type==='TemplateLiteral'&&!(par&&par.type==='TaggedTemplateExpression'))T.push({node:n,stack:stack.slice(),s:n.quasis.map(q=>q.value.cooked||'').join('{}'),line:n.loc.start.line,a:n.start});
   else if(n.type==='Literal'&&typeof n.value==='string'&&!(par&&par.type==='Property'&&par.key===n&&!par.computed))T.push({node:n,stack:stack.slice(),s:n.value,line:n.loc.start.line,a:n.start})});
  R.forEach(r=>vals.push(r));return{R,T}});
 /* CALL LINKS (x / go of one option, result text of an act): a function the text's own option object (or function) calls → every module that defines or
    re-defines it (function f(){…}, f=function…, const f=()=>…). The evidence API itself (evA / evStory / evG) is not a link: its amount is an argument. */
 const defs={};mods.forEach(m=>walk(m.ast,[],(n,stack)=>{let nm=null;if(n.type==='FunctionDeclaration'&&n.id)nm=n.id.name;
   else if(n.type==='AssignmentExpression'&&n.left.type==='Identifier'&&/Function/.test(n.right.type))nm=n.left.name;
   else if(n.type==='VariableDeclarator'&&n.id.type==='Identifier'&&n.init&&/Function/.test(n.init.type))nm=n.id.name;
   if(nm)(defs[nm]=defs[nm]||new Set()).add(m.f)}));
 /* only an OPTION: the nearest object around the text (no function boundary between) and only the calls inside its function-valued properties
    (go / run / open / ok / f / fail …): what choosing it runs. A text inside a render / map callback (kit sample rows, pbtn / ch helpers) has no call link. */
 const callLinks=t=>{let box=null,own=null;for(let i=t.stack.length-1;i>=0;i--){const x=t.stack[i];
   /* a text in a function-valued property (line:w=>`…`, x:()=>…) belongs to that property's option; any other function boundary ends the search */
   if(/Function/.test(x.type)){const p=t.stack[i-1],o=t.stack[i-2];if(p&&p.type==='Property'&&p.value===x&&o&&o.type==='ObjectExpression'){box=o;own=p;break}break}
   if(x.type==='ObjectExpression'){box=x;own=t.stack[i+1];break}}const M=new Set();if(!box)return M;
  for(const pr of box.properties)if(pr!==own&&pr.type==='Property'&&pr.value&&/Function/.test(pr.value.type))walk(pr.value,[],n=>{if(n.type==='CallExpression'&&n.callee.type==='Identifier'&&!/^ev(A|Story|G)$/.test(n.callee.name)&&defs[n.callee.name])defs[n.callee.name].forEach(f=>M.add(f))});return M};
 const catchV=['BAL.eff.j8.evCaught','BAL.eff.j9.evN'].map(ref=>({v:valOfP(ref.slice(4).split('.')),ref,mod:'*'})).filter(c=>isNum(c.v));
 /* the counter rule beside a text: an UpdateExpression / x=…±N / call(…,N) with the same number in the nearest option object or function, and no ev read there */
 const counterNear=(m,t,n)=>{let box=null;for(let i=t.stack.length-1;i>=0;i--){const x=t.stack[i];if(x.type==='ObjectExpression'||/Function/.test(x.type)){box=x;break}}if(!box)return false;
  const code=m.src.slice(box.start,box.end);if(/BAL\.eff\.\w+\.ev[A-Z0-9_]/.test(code))return false;
  return new RegExp('(?:\\b(?:\\w+Ev|proof|cev)\\s*(?:\\+\\+|--)|(?:\\+\\+|--)\\s*[\\w.]*(?:Ev|proof|cev)\\b|(?:Ev|proof|cev)\\b[^;]{0,24}[+\\-]\\s*'+n+'\\b|\\bdeA\\([^()]*,\\s*-?'+n+'\\s*\\))').test(code)};
 mods.forEach((m,mi)=>{for(const t of per[mi].T){if(!/chứng cứ/i.test(t.s))continue;const hits=[];let q;
   EV_SG.lastIndex=0;while((q=EV_SG.exec(t.s)))hits.push({i:q.index+q[0].length-q[3].length,n:+q[3],sg:q[2]==='+'?1:-1});
   EV_AB.lastIndex=0;while((q=EV_AB.exec(t.s))){const pre=t.s.slice(Math.max(0,q.index-24),q.index);if(EV_THR.test(pre)||!EV_PRE.test(pre))continue;hits.push({i:q.index,n:+q[1],sg:0})}
   for(const h of hits){if(!h.n)continue;if(counterNear(m,t,h.n))continue;
    if(!t.links){t.links=BIND.linkMods(idx,m.f,t.stack,t.node);callLinks(t).forEach(f=>t.links.add(f))}
    const before=t.s.slice(Math.max(0,h.i-80),h.i);
    const pool=vals.filter(c=>process.env.OC_GLOBAL||t.links.has(c.mod)).concat(/phát giác|bị bắt|bắt gặp|khai ra/i.test(before)?catchV:[]);
    const cands=pool.filter(c=>h.sg?c.v===h.sg*h.n:Math.abs(c.v)===h.n);if(!cands.length)continue;
    cands.sort((a,b)=>(a.mod===m.f?0:1)-(b.mod===m.f?0:1)||(a.mod===m.f?Math.abs(a.pos-t.a)-Math.abs(b.pos-t.a):0));
    const uq=[...new Map(cands.map(c=>[c.ref,c])).values()];
    out.push({f:m.f,line:t.line,t:{a:t.a+1},idx:h.i,sg:h.sg>0?'+':h.sg<0?'-':'',abs:String(h.n),inv:false,ev:true,cands:uq.map(c=>({key:c.ref.replace(/^BAL\./,''),v:c.v,ref:c.ref,mod:c.mod})),amb:uq.length>1,
     text:t.s.slice(Math.max(0,h.i-34),h.i+String(h.n).length+14).replace(/\s+/g,' ')})}}});
 return out}
function scan(B){
 const BAL=loadBAL(B);
 const ORDER=fs.readFileSync(path.join(B,'assemble.py'),'utf8').match(/for f in \[([^\]]+)\]/)[1].match(/'([^']+)'/g).map(s=>s.slice(1,-1));
 const refOf=n=>{const p=[];let c=n;while(c.type==='MemberExpression'){const k=c.computed?(c.property.type==='Literal'?c.property.value:null):c.property.name;if(k==null)return null;p.unshift(k);c=c.object}
  return c.type==='Identifier'&&c.name==='BAL'?p:null};
 const valOf=p=>{try{let o=BAL;for(const k of p){if(o==null)return undefined;o=o[k]}return o}catch(e){return undefined}};
 /* stat word → the BAL ladders its thresholds live in; 'any' = every threshold shape ("lòng 60+", "dưới 40", "từ 30"), 'range' = only a typed range "80–100"
    (a lone "Đức từ 40" can be an unrelated gate that happens to share the number, e.g. a road option's own requirement) */
 const STATS=[[/[Ll]òng|trung thành|thân tín/,['loy'],'any'],[/Đức|đức/,['ducLv'],'range'],[/Sủng|sủng/,['sungLv'],'range'],[/Sức|sức/,['sucLv'],'range'],[/Tâm cơ|tâm cơ/,['wit'],'range'],[/Chủ tin/,['tinLv'],'range']];
 /* the stat word closest before position i of a text (within 24 chars): the number at i belongs to THAT stat */
 const nearestStat=(txt,i)=>{const seg=txt.slice(Math.max(0,i-24),i);let best=null,at=-1;for(const [re] of STATS){const g=new RegExp(re.source,'g');let q;while((q=g.exec(seg)))if(q.index>=at){at=q.index;best=re}}return best};
 /* a cut ref is a number, or a small array / object of numbers (its leaves are what a text may copy) */
 const leaves=(v,suf)=>{if(isNum(v))return[{suf,v}];if(Array.isArray(v))return v.flatMap((x,i)=>leaves(x,suf+'['+i+']'));if(v&&typeof v==='object')return Object.keys(v).flatMap(k=>leaves(v[k],suf+(/^[A-Za-z_$][\w$]*$/.test(k)?'.'+k:'["'+k+'"]')));return[]};
 const sites=[],early=[];const home={eff:'jbaleff.js',road:'jbalroad.js',arc:'jbalarc.js'};const homeOf=r=>r.mode==='cut'?'jbal.js':home[r.p[0]];
 for(const f of ORDER){const src=fs.readFileSync(path.join(B,f),'utf8');
  const ast=acorn.parse(src,{ecmaVersion:'latest',locations:true});
  const strs=[],refs=[];
  (function walk(n,stack){if(!n||typeof n.type!=='string')return;const par=stack[stack.length-1];
   if(n.type==='Literal'&&typeof n.value==='string'&&!(par&&par.type==='Property'&&par.key===n&&!par.computed))strs.push({a:n.start,b:n.end,s:n.value,lit:1,line:n.loc.start.line,stack:stack.slice()});
   else if(n.type==='TemplateElement')strs.push({a:n.start,b:n.end,s:n.value.cooked||'',lit:0,line:n.loc.start.line,stack:stack.slice()});
   else if(n.type==='MemberExpression'&&!(par&&par.type==='MemberExpression'&&par.object===n)){
    const p=refOf(n);const printed=stack.some(x=>x.type==='CallExpression'&&x.callee.type==='Identifier'&&/^bal(Sg|Ab|Oan)$/.test(x.callee.name));
    if(printed){}/* a print (balSg / balAb / balOan) is not a rule read: nothing beside it copies it */
    else if(p&&p.length>=2&&NS.has(p[0])){let v=valOf(p);/* x.p-BAL.eff.m.k (the sign typed in the code, review/one-core-dup3 stat move): the amount it applies is −k */let neg=false;if(isNum(v)&&par&&par.right===n&&(par.type==='BinaryExpression'&&par.operator==='-'||par.type==='AssignmentExpression'&&par.operator==='-=')){v=-v;neg=true}if(isNum(v))refs.push({n,p,v,neg,mode:'amt',stack:stack.slice()})}
    else if(p&&p.length>=2&&(CUT.has(p[0])||(CUT2[p[0]]&&CUT2[p[0]].has(p[1])))){const v=valOf(p);const L=leaves(v,'');if(L.length&&L.length<=14)refs.push({n,p,v,mode:'cut',leaves:L,stack:stack.slice()})}}
   stack.push(n);for(const k in n){if(k==='type'||k==='start'||k==='end'||k==='loc')continue;const c=n[k];if(Array.isArray(c))c.forEach(x=>walk(x,stack));else if(c&&typeof c.type==='string')walk(c,stack)}stack.pop()})(ast,[]);
  /* a BAL.eff / road / arc read outside every function (it runs while the script loads) in a module that loads BEFORE the file that sets it = TDZ crash
     ("Cannot access 'BAL' before initialization"): read it lazily (inside the function, or a `get x(){…}` for a text) */
  for(const r of refs)if(!r.stack.some(x=>/Function/.test(x.type))&&ORDER.indexOf(f)<ORDER.indexOf(homeOf(r)))early.push({f,line:r.n.loc.start.line,key:r.p.join('.')});
  /* STAT-WORD CUTS: a text that says "lòng 60+", "dưới 40", "Đức 80–100" with a stat word of a moved ladder and a threshold-shaped number equal to one of
     that ladder's values (the rule behind it may sit in another function: watcher(), econLoyalMaid() …) */
  for(const t of strs){if(t.lit&&!/[^\x00-\x7f]|[A-Za-z]{3}/.test(t.s))continue;
   const SH=/(?:(?:dưới|từ|trên|đến|ít nhất|nhiều hơn|≥|≤|<|>)\s*(\d+))|(?:(?<![\w$.,])(\d+)\s*(?:\+|trở lên))|(?:(?<![\w$.,])(\d+)\s*[–-]\s*(\d+))/g;let m;
   while((m=SH.exec(t.s))){const nums=[[m[1],m.index+m[0].lastIndexOf(m[1])],[m[2],m.index],[m[3],m.index],[m[4],m.index+m[0].lastIndexOf(m[4]||'~')]].filter(x=>x[0]!=null&&x[0]!==undefined);
    const ctx=t.s.slice(Math.max(0,m.index-24),m.index+m[0].length+1);
    const isRange=m[3]!=null;
    for(const [num,idx] of nums){const near=nearestStat(t.s,idx);const hit=STATS.filter(([re,keys,shape])=>re.test(ctx)&&(shape==='any'||isRange||process.env.OC_WIDE)&&(isRange||near===re)).flatMap(([re,keys])=>keys.flatMap(k=>{const L=leaves(valOf(k.split('.')),'');return L.filter(l=>Math.abs(l.v)===+num).map(l=>({key:k+l.suf,v:l.v,ref:'BAL.'+k+l.suf}))}));
     if(hit.length){const uq=[...new Map(hit.map(h=>[h.key,h])).values()];sites.push({f,line:t.line,t,idx:idx+(t.s.slice(idx).search(/\d/)),sg:'',abs:String(num),inv:false,cut:true,cands:uq,amb:uq.length>1,text:t.s.slice(Math.max(0,idx-24),idx+String(num).length+14).replace(/\s+/g,' ')})}}}}
  /* a tier label that is only a range ("80–100", "60–79") inside a section that names a stat (Thang Đức page): its ends are the ladder's cuts */
  for(const t of strs){const m=/^\s*(\d+)\s*[–-]\s*(\d+)\s*$/.exec(t.s);if(!m)continue;const ctx=src.slice(Math.max(0,t.a-400),t.a);
   for(const [num,pos] of [[m[1],t.s.indexOf(m[1])],[m[2],t.s.lastIndexOf(m[2])]]){const hit=STATS.filter(([re,keys,shape])=>shape==='range'&&re.test(ctx)).flatMap(([re,keys])=>keys.flatMap(k=>leaves(valOf(k.split('.')),'').filter(l=>Math.abs(l.v)===+num).map(l=>({key:k+l.suf,v:l.v,ref:'BAL.'+k+l.suf}))));
    if(hit.length){const uq=[...new Map(hit.map(h=>[h.key,h])).values()];sites.push({f,line:t.line,t,idx:pos,sg:'',abs:String(num),inv:false,cut:true,cands:uq,amb:uq.length>1,text:t.s})}}}
  /* per typed number: every ref it could copy */
  const byTok=new Map();
  for(const r of refs){/* amounts (BAL.road / BAL.arc / any BAL.eff) beside their read: this pass; BAL.eff amounts anywhere in the module or its linked acts: scanAmt() below */
   let box=null;for(let i=r.stack.length-1;i>=0;i--){const x=r.stack[i];if(x.type==='ObjectExpression'&&x.end-x.start<=2500){box=x;break}}
   const a=Math.max(box?box.start:0,r.n.start-WIN),b=Math.min(box?box.end:src.length,r.n.end+WIN);
   const absOf=r.mode==='cut'?null:Math.abs(r.v);
   for(const t of strs){if(t.a<a||t.b>b)continue;if(!sameBranch(r.stack,t.stack,r.n,t))continue;if(t.lit&&!/[^\x00-\x7f]|[A-Za-z]{3}/.test(t.s))continue;/* a plain string must hold words (not a CSS / key string); a template piece may be just " (-8)." after a ${} */
    const re=/([+\-−±]?)(?<![\w$.,])(\d+(?:\.\d+)?)(?![\d]|[.,]\d)/g;let m;
    while((m=re.exec(t.s))){let cand=null;
     if(r.mode==='cut'){const lf=r.leaves.find(l=>Math.abs(l.v)===+m[2]);if(!lf)continue;cand=lf;
      /* the stat word just before the number must be the ladder's own ("Chủ tin 60+" beside BAL.loy.close is another stat) */
      const before=t.s.slice(Math.max(0,m.index-24),m.index);const sw=STATS.filter(([re])=>re.test(before));if(sw.length&&!sw.some(([re,keys])=>keys.includes(r.p[0])))continue}
     else{if(+m[2]!==absOf)continue;const sg=m[1];const pre=t.s.slice(Math.max(0,m.index-14),m.index);if(!sg&&!/(?:oán|thù|bớt|giảm|mất|thiện cảm|thân|quý|ghen|lòng)\s*$/i.test(pre)&&!(/^ev[A-Z]/.test(r.p[r.p.length-1])&&/^\s*chứng cứ/.test(t.s.slice(m.index+m[0].length))&&/(?:nắm|nắm thêm|thêm|được|lấy được|mất)\s*$/.test(pre)))continue;/* an unsigned number must follow a relation word; or (review/one-core-dup3) "nắm 2 chứng cứ" beside an evA amount BAL.eff.m.ev<Site> */
      const inv=/(?:oán|thù)\s*$/i.test(t.s.slice(Math.max(0,m.index-12),m.index));const v=inv?-r.v:r.v;
      if(sg==='+'&&v<0||(sg==='-'||sg==='−')&&v>0)continue;
      /* a person-stat amount (servant lòng / tin, child tài / sức khỏe, thương, mê: review/one-core-dup3) is not the number right after ANOTHER stat's word
         ("Sức -15", "Danh -1" beside s.loyal-BAL.eff.j42.loyalGo belong to that stat's apply) */
      if(/^(?:loyal|tin|tal|hp|fond|me)[A-Z0-9_]/.test(r.p[r.p.length-1])&&/(?:Sức|Danh|Đức|Bạc|Sủng|Thái hậu|Hoàng hậu|Tâm cơ|Sắc|Tai mắt|Ân tình|Chủ tin)\s*$/.test(pre)&&!(/^tin/.test(r.p[r.p.length-1])&&/Chủ tin\s*$/.test(pre)))continue;
      cand={suf:'',v:r.v,inv:inv||!!r.neg}}
     const sg=m[1];const k=t.a+':'+m.index;const e=byTok.get(k)||{t,idx:m.index,sg,abs:m[2],inv:!!cand.inv,cut:r.mode==='cut',cands:[]};e.cands.push(Object.assign({},r,{suf:cand.suf,cv:cand.v}));byTok.set(k,e)}}}
  for(const e of byTok.values()){const uniq=[...new Map(e.cands.map(r=>[r.n.start+r.suf,r])).values()];
   sites.push({f,line:e.t.line,t:e.t,idx:e.idx,sg:e.sg,abs:e.abs,inv:e.inv,cut:e.cut,cands:uniq.map(x=>({key:x.p.join('.')+x.suf,v:x.cv!==undefined?x.cv:x.v,ref:src.slice(x.n.start,x.n.end)+x.suf})),amb:uniq.length>1,
    text:e.t.s.slice(Math.max(0,e.idx-24),e.idx+e.abs.length+14).replace(/\s+/g,' ')})}}
 {const seen=new Set(sites.map(x=>x.f+':'+x.t.a+':'+x.idx));for(const x of scanAmt(B,BAL,ORDER)){const k=x.f+':'+x.t.a+':'+x.idx;if(!seen.has(k)){seen.add(k);sites.push(x)}}}
 {const seen=new Set(sites.map(x=>x.f+':'+x.line+':'+x.text));for(const x of scanEv(B,BAL,ORDER)){const k=x.f+':'+x.line+':'+x.text;if(!seen.has(k)){seen.add(k);sites.push(x)}}}/* evidence counts (r1) */
 sites.sort((x,y)=>ORDER.indexOf(x.f)-ORDER.indexOf(y.f)||x.line-y.line);
 sites.early=early;return sites}
/* proof helpers (dev/measure/one-core-text-same.js, one-core-dup-same.js): printed(src) turns every ${balSg(expr)} / ${balAb(expr)} back into the words it prints
   (expr = BAL paths + arithmetic, evaluated with the BAL values), back(src) puts the value back in every BAL.a.b[i] read that is a number */
function proof(B){const BAL=loadBAL(B);const re=new RegExp(BALPATH,'g');const lit=v=>v<0?`(-${-v})`:String(v);
 const back=src=>src.replace(re,m=>{const v=valAt(BAL,m);return typeof v==='number'?lit(v):m});
 const sg=n=>(n>0?'+':n<0?'-':'')+Math.abs(n);
 const oanF=(n,m)=>String(Math.round(Math.abs(n)*BAL.relOan[m]));
 const printed=src=>src.replace(/\$\{bal(Sg|Ab|Oan)\(((?:[^()]|\([^()]*\))*)\)\}/g,(m,fn,ex)=>{try{if(fn==='Oan'){const q=/^(.*),\s*"(\w+)"$/.exec(ex);return oanF(Function('return '+back(q[1]))(),q[2])}const n=Function('return '+back(ex))();return fn==='Sg'?sg(n):String(Math.abs(n))}catch(e){return m}});/* a print of a non-BAL table (LO.act.duc) stays as code: the compare then shows it */
 return{printed,back,BAL}}
module.exports={scan,loadBAL,valAt,BALPATH,proof};
if(require.main===module){
 const B=process.env.OC_BUILD||path.join(ROOT,'dev','build');
 const sites=scan(B);const per={};sites.forEach(s=>per[s.f]=(per[s.f]||0)+1);
 const row=s=>`${s.f}:${s.line} ${s.cands.map(c=>c.key+'='+c.v).join(' | ')}  «…${s.text}…»`;
 const early=sites.early.map(e=>`${e.f}:${e.line} reads BAL.${e.key} at load, before the file that sets it`);
 if(process.argv.includes('--list')){sites.forEach(s=>console.log(row(s)));console.log(JSON.stringify({sites:sites.length,per}));process.exit(0)}
 console.log(JSON.stringify({sites:sites.length,early:early.length,per}));
 if(early.length){console.log('FAIL: a BAL.eff / road / arc read at load time in a module that loads before it (TDZ): read it lazily\n  '+early.join('\n  '));process.exit(1)}
 if(sites.length){console.log('FAIL: a player text types an amount (BAL.eff / road / arc) or a cut (BAL.loy / ducLv / quyLv / wit / sungLv / tinhLv / tinLv / sucLv / rareLv / tsDanger / cut / …) that lives in BAL (print the constant: ${balSg(BAL…)} / ${balAb(BAL…)})\n  '+sites.slice(0,+(process.env.OCG_MAX||60)).map(row).join('\n  '));process.exit(1)}
 console.log('PASS: no player text types an amount or a cut that lives in BAL (eff / road / arc amounts, loy / ducLv / quyLv … cuts)')}
