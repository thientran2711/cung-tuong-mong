/* review/odds-no-unknown (law 4 + law 7): STATIC scan of every dialog option object in dev/build/j*.js — an object literal with `n` and a
   `go`/`fail` and no odds field of its own (`o` / `odds` / `p`) — whose choice ROLLS: roll(…)/aRoll(…) in its own code, or in a helper it
   calls (a global function, or a local arrow const of the same file, one level deep). Its card meter must show the odds of that roll, so its
   line (`j67` or `x` or `hint`) must carry a ladder word (word(…)) or a chance phrase (chanceW, a side chance) — otherwise the card showed
   «Khó lường» (roll the kit could not read) or «Nắm chắc» (roll hidden in a helper). Also lists every «Khó lường» left in code.
   usage: node dev/test/odds-unknown-scan.js [build dir] [--all]   — exit 1 when any option is left */
const fs=require('fs'),path=require('path');let espree;try{espree=require('espree')}catch(e){espree=require('/opt/node-tools/node_modules/espree')}
const DIR=process.argv[2]&&!process.argv[2].startsWith('--')?process.argv[2]:path.join(__dirname,'../build');
const ODDW=/(Nắm chắc|Nắm chắc|Khá chắc|Tùy duyên|Chắc|Khó|Liều)/,CHW=/khả năng (rất thấp|thấp|vừa|cao|rất cao)|không có khả năng/;
const WORDF=/\b(word|chanceW|oddsW|kitOddsW|plantOdds|kitCapLine)\(/;const ROLL=/\b(roll|aRoll)\(/;
const PAR=new Map();const enclosing=n=>{let c=PAR.get(n);while(c&&!/Function/.test(c.type))c=PAR.get(c);return c};
/* rolls that are NOT the card's own outcome (checked by hand, review/odds-no-unknown) — file + option name → why */
const EXEMPT=[
 [/^j5[34]\.js$/,/Cáo bệnh cho con/,'ktRun / h54Run roll the OTHER mothers\' prep and skip; her own choice is certain'],
 [/^j67\.js$/,/fill67/,'its line is built with word(od0) (variable `line`)'],
 [/^(j77|jagent|jty)\.js$/,/./,'goTo: travel; the rolls are the next scene\'s own encounters'],
 [/^j8\.js$/,/đã tẩm|^n$/,'giveTo: a tainted gift gets p via giftTaintOpt (Object.assign); roll(25) = the NPC\'s own wear choice'],
 [/^j99succ\.js$/,/./,'succPick: the rare-story flag drawn for the next step, not this choice'],
 [/^jeitem\.js$/,/./,'newsAdd: who hears the court news, not her choice'],
 [/^jkc\.js$/,/./,'kcChance: a chance meeting at the place = the next scene\'s own encounter'],
 [/^jkc2\.js$/,/Trả bớt nợ/,'bonus only when the lý trưởng is "Ham lợi" (a hidden trait): a chance word would reveal it'],
 [/^jkiep\.js$/,/Vẫn chọn/,'a confirm gate of a card already shown with its own odds'],
 [/^jmen\.js$/,/./,'menOpts writes word(o) into every rolled x'],
 [/^jtoil\.js$/,/Xin lỗi/,'toilAns "sorry" returns before any roll'],
 [/^jts\.js$/,/Tự tay phối đồ/,'opens the dressing mini-game; the roll is inside the game']];
const files=fs.readdirSync(DIR).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js');const out=[];const khoLuong=[];const exempt=[];
function walk(n,f,par){if(!n||typeof n.type!=='string')return;if(par)PAR.set(n,par);f(n,par);for(const k in n){const v=n[k];if(Array.isArray(v))v.forEach(c=>c&&typeof c.type==='string'&&walk(c,f,n));else if(v&&typeof v.type==='string'&&k!=='parent')walk(v,f,n)}}
const SRC={},AST={},GF={};/* global function name -> body source */
for(const f of files){const src=fs.readFileSync(path.join(DIR,f),'utf8');SRC[f]=src;
 src.split('\n').forEach((l,i)=>{const code=l.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\/\/.*$/,'');if(f!=='j0.js'&&/Khó lường/.test(code)&&!/^\s*\*/.test(l))/* 23/11: «Khó lường» is now the 3rd ladder word (KIT_ODDS j0), no longer the retired unknown chip */khoLuong.push(`${f}:${i+1}`)});
 try{AST[f]=espree.parse(src,{ecmaVersion:2024,range:true,loc:true})}catch(e){console.error('parse',f,e.message);continue}
 for(const st of AST[f].body)if(st.type==='FunctionDeclaration'&&st.id)GF[st.id.name]=src.slice(st.range[0],st.range[1])}
const rollsIn=(code,loc)=>{if(ROLL.test(code))return 'own';const ids=new Set();code.replace(/\b([A-Za-z_$][\w$]*)\s*\(/g,(m,id)=>{ids.add(id);return m});
 for(const id of ids){if(['roll','aRoll','log','apply','ap','Q','pick','R','cl','oddsCl','word','fmt','render'].includes(id))continue;const b=loc[id]||GF[id];if(b&&ROLL.test(b))return id}return ''};
for(const f of files){const src=SRC[f],ast=AST[f];if(!ast)continue;
 /* local arrow/function consts of this file (any scope): name -> source (one level) */
 const loc={};walk(ast,n=>{if(n.type==='VariableDeclarator'&&n.id&&n.id.type==='Identifier'&&n.init&&/Function/.test(n.init.type))loc[n.id.name]=src.slice(n.init.range[0],n.init.range[1])});
 walk(ast,n=>{if(n.type!=='ObjectExpression')return;const P={};for(const p of n.properties){if(p.type!=='Property')continue;const k=p.key.name||p.key.value;P[k]=p.value}
  if(!P.n||!(P.go||P.fail)||P.o||P.odds||P.p||P.lock)return;
  const code=[P.go,P.fail].filter(Boolean).map(v=>src.slice(v.range[0],v.range[1])).join(' ');
  /* go:go(…) (a call that RETURNS the handler): read the callee's body too */
  const how=rollsIn(code,loc);if(!how)return;
  /* the card reads ONLY its line: j67 when present (j67 dilLine → kitParse(j67)), else x (dilLine); the Gợi ý hint never sets the meter */
  const line=(P.j67?src.slice(P.j67.range[0],P.j67.range[1]):P.x?src.slice(P.x.range[0],P.x.range[1]):'').replace(/Khó lường/g,'');
  if(ODDW.test(line)||CHW.test(line)||WORDF.test(line)||P.p)return;
  /* a line built by a helper (accAskLine(k)) or held in a variable (x) of the same function: read that helper / that variable's text */
  {let ok=false;line.replace(/\b([A-Za-z_$][\w$]*)\s*\(/g,(m,id)=>{const b=loc[id]||GF[id];if(b&&(WORDF.test(b)||ODDW.test(b.replace(/Khó lường/g,''))))ok=true;return m});
   const fn=enclosing(n);if(!ok&&fn&&/^[\w$.\s|"']+$/.test(line.trim())){const t=src.slice(fn.range[0],n.range[0]);for(const v of line.match(/[A-Za-z_$][\w$]*/g)||[]){const re=new RegExp(`\\b${v}\\s*=([^;]*)`,'g');let m;while((m=re.exec(t)))if(WORDF.test(m[1]))ok=true}}
   if(ok)return}
  if(/^\s*\(?\s*\)?\s*=>\s*\{?\s*if\s*\(\s*roll\(\s*\d+\s*\)\s*\)\s*\{?\s*[^;{}]*?(apply\(\{|ap\(S,\{|die\()/.test(code.slice(code.indexOf('=>')-4)))return;/* j79 kitBranchFx reads it */
  const nm=src.slice(P.n.range[0],P.n.range[1]);const ex=EXEMPT.find(([fr,nr])=>fr.test(f)&&nr.test(nm.replace(/^["'`]|["'`]$/g,'')));if(ex){exempt.push(`${f}:${n.loc.start.line} ${nm.slice(0,30)} — ${ex[2]}`);return}
  out.push({at:`${f}:${n.loc.start.line}`,n:src.slice(P.n.range[0],P.n.range[1]).slice(0,48),how,line:line.trim().slice(0,70)})})}
for(const o of out)console.log(`${o.at.padEnd(16)} via ${o.how.padEnd(12)} n=${o.n} | ${o.line}`);
console.log(`rolled dialog options whose card line carries no odds: ${out.length} (own roll ${out.filter(o=>o.how==='own').length}, via helper ${out.filter(o=>o.how!=='own').length})`);
if(process.argv.includes('--all'))exempt.forEach(e=>console.log('exempt',e));console.log(`exempt (not the card's own roll, reason in EXEMPT): ${exempt.length}`);
console.log(`«Khó lường» in code: ${khoLuong.length} ${khoLuong.join(' ')}`);
process.exit(out.length||khoLuong.length?1:0);
