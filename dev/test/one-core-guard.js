/* ONE CORE guard (owner 16/11 07:25Z, OD:L1267; extends dev/test/rules-one-source.js, review/one-core).
   Every number of a game rule comes from ONE rulebook (BAL, dev/build/jbal.js + jbal2.js and the modules that add to it).
   This static check needs only node (no browser). It FAILS when:
     1. a BAL key is set twice (two values for one rule; example: outQ 85 in jbal and 60 in jbal2);
     2. a mirror table that must be filled from BAL (BL, SEATCAP, WVAL) is typed again with numbers;
     3. a player-visible text types a core number instead of printing the constant (CORE_TEXT patterns below);
     4. a module gains a NEW inline rule number (stat comparisons, stat gains/costs, khắc, odds, typed "Sủng +3" in text…)
        compared with the frozen list dev/test/one-core-baseline.json. The list only shrinks: move numbers into BAL, then
        run with --update (it refuses to grow a count unless --allow-grow is given by the coordinator).
   Pure layout / pixel / timing numbers are never counted (the patterns only look at rule stats), and the comments are skipped.
   usage: node dev/test/one-core-guard.js [--update] [--allow-grow] [--list <file>]  */
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..','..'),B=process.env.OC_BUILD||path.join(ROOT,'dev','build'),BASE=process.env.OC_BASE||path.join(__dirname,'one-core-baseline.json');
const args=process.argv.slice(2),UPD=args.includes('--update'),GROW=args.includes('--allow-grow'),LIST=args.includes('--list')?args[args.indexOf('--list')+1]:null;
const ORDER=fs.readFileSync(path.join(B,'assemble.py'),'utf8').match(/for f in \[([^\]]+)\]/)[1].match(/'([^']+)'/g).map(s=>s.slice(1,-1));

/* ---------- a small JS lexer: code / string / template text / comment / regex, with offsets ---------- */
function lex(src){const out=[];let i=0,line=1;const n=src.length;let ca=-1,cl=1;
 const flush=()=>{if(ca>=0&&ca<i)out.push({t:'code',s:src.slice(ca,i),line:cl,a:ca,b:i});ca=-1};
 const lastCode=()=>{for(let k=out.length-1;k>=0;k--){const o=out[k];if(o.t==='com')continue;if(o.t!=='code')return 'x';const m=o.s.replace(/\s+$/,'');if(m)return m}return ''};
 const stack=[];let depth=0;
 const readTpl=()=>{const a=i,sl=line;let s='';while(i<n){const c=src[i];if(c==='\\'){s+=src.slice(i,i+2);i+=2;continue}if(c==='\n')line++;
   if(c==='`'){out.push({t:'tpl',s,line:sl,a,b:i});i++;return 'end'}
   if(c==='$'&&src[i+1]==='{'){out.push({t:'tpl',s,line:sl,a,b:i});i+=2;return 'expr'}s+=c;i++}out.push({t:'tpl',s,line:sl,a,b:i});return 'end'};
 while(i<n){const c=src[i];
  if(c==='/'&&src[i+1]==='*'){flush();const e=src.indexOf('*/',i+2);const b=e<0?n:e+2;const s=src.slice(i,b);out.push({t:'com',s,line,a:i,b});line+=(s.match(/\n/g)||[]).length;i=b;continue}
  if(c==='/'&&src[i+1]==='/'){flush();const e=src.indexOf('\n',i);const b=e<0?n:e;out.push({t:'com',s:src.slice(i,b),line,a:i,b});i=b;continue}
  if(c==='"'||c==="'"){flush();let j=i+1;while(j<n&&src[j]!==c){if(src[j]==='\\'){j+=2;continue}if(src[j]==='\n')break;j++}out.push({t:'str',s:src.slice(i+1,j),line,a:i+1,b:j});i=j+1;continue}
  if(c==='`'){flush();i++;if(readTpl()==='expr'){stack.push(depth);depth=0}continue}
  if(c==='}'&&stack.length&&depth===0){flush();i++;depth=stack.pop();if(readTpl()==='expr'){stack.push(depth);depth=0}continue}
  if(c==='/'){const pre=(ca>=0?src.slice(ca,i):'').replace(/\s+$/,'')||lastCode();const p=pre.slice(-1);
   if(!p||/[(,=:[!&|?{};+\-*%<>~^]/.test(p)||/\b(return|typeof|case|in|of|void)$/.test(pre)){flush();let j=i+1,cls=false;while(j<n){const d=src[j];if(d==='\\'){j+=2;continue}if(d==='[')cls=true;else if(d===']')cls=false;else if(d==='/'&&!cls)break;else if(d==='\n')break;j++}j++;while(/[a-z]/i.test(src[j]||''))j++;out.push({t:'re',s:src.slice(i,j),line,a:i,b:j});i=j;continue}}
  if(ca<0){ca=i;cl=line}if(c==='{')depth++;else if(c==='}')depth--;if(c==='\n')line++;i++}
 flush();return out}

/* ---------- patterns ---------- */
const ST='(?:th|duc|sung|danh|bac|suc|tamco|tam|tin|tai|mat|an|hh|age|loy|rel|ghen|malice|sac|nt|maid)';
const CODE_PAT={
 cmp:new RegExp('\\.'+ST+'\\s*(?:>=|<=|>|<)\\s*\\d+(?:\\.\\d+)?\\b','g'),          /* S.bac<20, v.sung>=45 … a typed bar */
 fx:new RegExp('(?<![\\w$.])'+ST+'\\s*:\\s*[+-]?\\d+(?:\\.\\d+)?\\b','g'),           /* {danh:-8}, {sung:3} … a typed gain / cost */
 khac:/\b(?:can|spend|j77Kh|walkOk)\(\s*\d+\s*\)/g,                                    /* can(2), spend(1) … typed khắc */
 roll:/\broll\(\s*\d+\s*\)/g,                                                         /* roll(35) … a typed odds base */
 /* review/one-core-dup (owner 17/11 03:00Z "cùng một vấn đề mà có 2-3 cái con số"; reviewer road-onecore-r1 item 3): typed amounts of
    dialog go: closures and option / ending fields. sw = a typed stat write S.x+=N; sc = an option's / ending's Lợi thế score;
    k = an ARC67 / road ending tier (-1 lose / 0 mid / 1 win, followed by its tag / text). */
 sw:new RegExp('\\bS\\.'+ST+'\\s*[+-]=\\s*\\d+(?:\\.\\d+)?\\b','g'),
 sc:/(?<![\w$.])sc\s*:\s*[+-]?\d+(?:\.\d+)?\b/g,
 k:/(?<![\w$.])k\s*:\s*[+-]?[01]\b(?=\s*,\s*(?:tag|t|n|w)\s*:)/g,
};
/* the same, read on the code with every string / template / regex blanked (an effect call spans its string arguments):
   amt    = the typed last amount (or `cond?N:M`) of a relation / family / power effect call: rdOan(A,"v",5), relAdd(p,S,-8), e67dad(10) … (a single-argument call e67dad(4) counts too: review/one-core-dup2, found by one-core-roads)
   ladder = a private threshold table typed as a ternary chain: r>=7?[4,2]:r>=5?[3,2]:… / o>=91?"Nắm chắc":o>=81?… (a second table for a
            concept the rulebook should hold once: capOf, the odds-word cut points …) */
const NUMV='[+-]?\\d+(?:\\.\\d+)?';
const NUMA='[+-]?(?:\\d+(?:\\.\\d+)?|\\.\\d+)'; /* an amount may be typed '.5' (srvMerit(.5), one-core-dup3) */
const JOIN_PAT={
 /* amt also counts ONE-argument calls (dup2 c66ef16a: e67dad(4)); e67heir added by review/one-core-arcs r2 (reviewer r1 item 1) —
    one kind, the former 'amt1' folded in here; the number after the '(' of a roll( inside the call is an odds, not the amount
    (evA(v,t,roll(40)?…): counted by the roll kind — review/one-core-dup3); a wrapper g(8) still counts */
 amt:new RegExp('\\b(?:rdOan|rdRel|relAdd|oanAdd|affAdd|kcAf|tdPowAdd|e67(?:dad|bien|kho|heir|ally|pun|foe|drop|merit|srvUp)|srvMerit|evA|evStory|tsbLoyal|relDo)\\((?:(?:[^()]|\\([^()]*\\))*?(?:,|(?<!\\broll)\\())?\\s*(?:[\\w$.!]+\\s*\\?\\s*)?'+NUMA+'(?:\\s*:\\s*'+NUMA+')?\\s*\\)','g'),
 /* h96 = a typed amount inside the tư tình arc's adj96({h,t,sus,ev,rise,lt}) (j96; all read BAL.arc.h96 since review/one-core-dup3) */
 /* rtk = a typed khắc cost of a «Lối riêng» card (jroute rtCard({…k:N}) / step("x",{…k:N}) / mk("x",{…k:N}); all read BAL.route.k since review/one-core-dup3) */
 rtk:/(?:\brtCard\(|\b(?:step|mk)\([^,()]*,)\s*\{(?:[^{}]|\{[^{}]*\})*?(?<![\w$.])k\s*:\s*\d/g,
 h96:/\badj96\(\s*\{[^{}]*?[:?]\s*[+-]?\d/g,
 /* evn = a typed chứng cứ amount the amt kind cannot see (review/one-core-dup3 r1): evStory(t,N,"why") — the amount is the 2nd argument, a why-text follows —
    and an evA amount that is an expression starting with a number (evA(f,p,1+(…?1:0))). 0 is not an amount (evA(v,u,0) = a mark). All read BAL.eff since r1. */
 evn:/\b(?:evStory\(\s*(?:[^(),]|\([^()]*\))+,|evA\(\s*(?:[^(),]|\([^()]*\))+,\s*(?:[^(),]|\([^()]*\))+,)\s*[+-]?(?!0(?![.\d]))\d/g,
 ladder:new RegExp('(?:[\\w$.\\])]+\\s*(?:>=|>|<=|<)\\s*'+NUMV+'\\s*\\?\\s*(?:\\[[^\\[\\]]*\\]|'+NUMV+'|""|``)\\s*:\\s*){2,}(?:\\[[^\\[\\]]*\\]|'+NUMV+'|""|``)','g'),
};
const TXT_PAT={
 stat:/(?:Sủng|Danh|Đức|Bạc|Sức|Thái hậu|Hoàng hậu|Tâm cơ|Tai mắt|Ân tình|thiện cảm|oán|Lòng|Chủ tin)\s*[+−-]\s*\d+/g,  /* "Danh -8" typed in a text */
 unit:/\d+\s*(?:bạc|khắc|tuổi|tháng|tuần)\b/g,                                         /* "20 bạc", "16 tuổi" typed in a text */
 need:/cần (?:[^\d<${}]{0,14})?\d+/g,                                                  /* "cần 40", "cần Chủ tin 40" */
};
/* texts that must PRINT a core constant (moved in review/one-core); a typed copy fails at once, baseline or not */
/* [pattern, BAL path(s) the typed number would copy]: with a path, the text fails only when the typed number EQUALS that constant
   (a copy); without one, any number fails. The constants are read from the ONE CORE block of jbal.js. */
const CORE_TEXT=[
 [/[Mm]ỗi buổi (?:có )?(\d+) khắc/,'time.khac'],
 [/Gieo lại tốn (\d+) bạc/,'lot.bac'],
 [/[Gg]ần (\d+) khắc, xa \d+/,'walk.near'],
 [/^Sức dưới (\d+), cần nghỉ$|Sức ≥(\d+) \(có|kiệt sức \(Sức \d+, cần (\d+)\)/,'time.sucMin'],
 [/xuất cung năm (\d+) tuổi|xuất cung tuổi (\d+)/,'srvAge.ask,srvAge.out'],
 [/(?:ở đến|làm ma ma trong cung đến năm) (\d+) tuổi/,'srvAge.mama'],
 [/(?:tròn|đủ|từ) (\d+) tuổi/,'age.betroth,age.matchShow'],
 [/cưới khi (?:con |hoàng tử )?tròn (\d+)/,'age.wed'],
 [/tân đế (?:dưới )?(\d+) tuổi/,'age.reign'],
 [/theo phẩm vị \(\d+–\d+ bạc\)/,null],
 [/bị bắt:? Danh -(\d+)(?: và bị phạt)?|Lẻn vào[^·]*Danh -(\d+)|bị thấy: Danh -(\d+)/,'sneak.danh,sneak.seen,sneak.heavy'],
 [/ít nhất Sủng \+(\d+), Ân tình \+\d+/,'night.sung'],
];
const CORE=(()=>{for(const d of [B,path.join(ROOT,'dev','build')]){const s=fs.readFileSync(path.join(d,'jbal.js'),'utf8');const m=s.match(/Object\.assign\(BAL,(\{time:[\s\S]*?\})\);\n/);
 if(m)try{return Function('return '+m[1])()}catch(e){}}return null})();
if(!CORE){console.log('FAIL: the ONE CORE block (Object.assign(BAL,{time:…})) is missing from jbal.js');process.exit(1)}
const coreVal=p=>p.split('.').reduce((o,k)=>o==null?o:o[k],CORE);
const MIRRORS=[['j20.js','BL'],['j30.js','SEATCAP'],['j83.js','WVAL']];

/* ---------- scan ---------- */
const fail=[];const now={};
const joinCode=T=>T.map(t=>t.t==='code'?t.s:t.t==='str'?'""':t.t==='tpl'?'``':t.t==='re'?'/r/':' ').join('');
/* the rulebook itself (const BAL={…} / Object.assign(BAL,{…}) bodies) is where numbers BELONG: blank it before counting inline numbers */
function balEnd(src,i){let d=0,inS=null;for(let j=i;j<src.length;j++){const c=src[j];if(inS){if(c==='\\'){j++;continue}if(c===inS)inS=null;continue}
  if(src.startsWith('/*',j)){j=src.indexOf('*/',j)+1;continue}if(src.startsWith('//',j)&&!/[\w)\]]\s*$/.test(src.slice(Math.max(0,j-3),j))){j=src.indexOf('\n',j);continue}
  if(c==='"'||c==="'"||c==='`'){inS=c;continue}if(c==='{'||c==='['||c==='(')d++;else if(c==='}'||c===']'||c===')'){d--;if(d===0)return j}}return src.length}
function maskBal(src){const re=/Object\.assign\(BAL,\{|const BAL=\{|(?<![\w$.])BAL(?:\.[\w$]+)+\s*=(?!=)\s*[{[]/g;let m,out=src;while((m=re.exec(src))){const a=m.index+m[0].length-1,b=balEnd(src,a);
  out=out.slice(0,a+1)+out.slice(a+1,b).replace(/[^\n]/g,' ')+out.slice(b)}return out}
for(const f of ORDER){const src=fs.readFileSync(path.join(B,f),'utf8');const T=lex(maskBal(src));const per={};const add=(k,s)=>{const m=per[k]=per[k]||{};m[s]=(m[s]||0)+1};
 for(const t of T){
  if(t.t==='code'){for(const k in CODE_PAT){const m=t.s.match(CODE_PAT[k]);if(m)m.forEach(s=>{if(/(?:[<>=:]|^)\s*[+-]?0(?:\.0+)?$/.test(s))return;/* 0 = a sign / empty / clamp, not a tunable rule number */add(k,s.replace(/\s+/g,''))})}}
  else if(t.t==='str'||t.t==='tpl'){for(const k in TXT_PAT){const m=t.s.match(TXT_PAT[k]);if(m)m.forEach(s=>add('t.'+k,s.replace(/\s+/g,' ')))}
   for(const [re,paths] of CORE_TEXT){const m=t.s.match(re);if(!m)continue;const nums=m.slice(1).filter(x=>x!=null).map(Number);
    const hit=!paths||paths.split(',').some(p=>nums.includes(coreVal(p)));
    if(hit)fail.push(`${f}:${t.line} text types a core number (print BAL.${paths||'pay'}): «${t.s.slice(0,110)}»`)}}}
 {const J=joinCode(T);for(const k in JOIN_PAT){const m=J.match(JOIN_PAT[k]);if(m)m.forEach(x=>{const v=x.replace(/\s+/g,'');if(k==='amt'&&/[(,][+-]?0\)$/.test(v))return;if(k==='ladder'&&[...v.matchAll(/(?:>=|>|<=|<)([+-]?[\d.]+)\?/g)].every(q=>+q[1]===0))return;/* a sign test (n>0 / n<0), not a table */add(k,v.length>90?v.slice(0,90)+'…':v)})}}
 now[f]=per;
 for(const [mf,name] of MIRRORS)if(mf===f){const m=src.match(new RegExp('(?:const |,)'+name+'\\s*=\\s*(\\[[^\\]]*\\]|\\{[^}]*\\})'));if(!m)fail.push(`${f}: mirror ${name} not found`);else if(/\d/.test(m[1].replace(/\/\*[\s\S]*?\*\//g,'')))fail.push(`${f}: mirror ${name} typed with numbers (${m[1].slice(0,60)}); it must be filled from BAL`)}
}
/* 5. a SECOND TABLE for one concept (review/one-core-dup, owner 17/11 03:00Z):
   (a) a rule function defined at the top level of two modules (the later one silently replaces the earlier, whose numbers stay in the
       file as a dead second copy: fillStaff j10 + j29 …) — fails unless named in SHADOW_OK (pure helpers with no rule number);
   (b) a typed numeric table outside BAL that equals a table typed inside a BAL body (a copy of the rulebook: [[1,1],[2,1],…]). */
/* OWNED: a second copy another branch is removing (name → branch); drop the entry when that branch lands */
const SHADOW_OK=new Set(['fillStaff'/* j10 + j29: servants per rank, owned by review/staff-root (capOf → BAL.promo.cap) */,...(process.env.OC_SHADOW_OK||'').split(',').filter(Boolean)]);
const topFns={},balLits=new Map(),outLits=[];
const LIT=/\[\s*(?:\[[\d\s,.+-]*\]\s*,\s*){1,}\[[\d\s,.+-]*\]\s*\]|\[\s*(?:[+-]?\d+(?:\.\d+)?\s*,\s*){3,}[+-]?\d+(?:\.\d+)?\s*\]/g;
for(const f of ORDER){const src=fs.readFileSync(path.join(B,f),'utf8');const J=joinCode(lex(src));let d=0;
 for(let i=0;i<J.length;i++){const c=J[i];if(c==='{')d++;else if(c==='}')d--;else if(d===0&&c==='f'&&J.startsWith('function',i)&&!/[\w$]/.test(J[i-1]||'')){const m=J.slice(i).match(/^function\s+([\w$]+)\s*\(/);if(m)(topFns[m[1]]=topFns[m[1]]||[]).push(f)}}
 const M=maskBal(J);let m;LIT.lastIndex=0;while((m=LIT.exec(J))){const v=m[0].replace(/\s+/g,'');if(M.slice(m.index,m.index+m[0].length).trim()==='')balLits.set(v,f);else outLits.push([f,v])}}
for(const n in topFns)if(topFns[n].length>1&&!SHADOW_OK.has(n))fail.push(`function ${n} is defined at the top level of ${topFns[n].join(' + ')}: the later copy replaces the earlier — keep ONE (second copy = second table)`);
for(const [f,v] of outLits)if(balLits.has(v)&&!/^\[(?:0,)*0\]$|^\[(?:1,)*1\]$/.test(v))fail.push(`${f}: typed table ${v.slice(0,70)} is a copy of the one in BAL (${balLits.get(v)}): read the BAL key`);
/* 1. one value per BAL key */
const sets={};
function objKeys(src,i){let d=0,inS=null,keys=[],tok='',want=true;for(let j=i;j<src.length;j++){const c=src[j];
  if(inS){if(c==='\\'){j++;continue}if(c===inS)inS=null;continue}if(c==='"'||c==="'"||c==='`'){inS=c;continue}
  if(src.startsWith('/*',j)){j=src.indexOf('*/',j)+1;continue}
  if('{[('.includes(c)){d++;if(d===1){want=true;tok=''}continue}if('}])'.includes(c)){d--;if(d===0)return keys;continue}
  if(d===1){if(c===','){want=true;tok='';continue}if(want){if(/[\w$]/.test(c))tok+=c;else if(c===':'&&tok){keys.push(tok);want=false}else if(!/\s/.test(c))tok=''}}}return keys}
for(const f of ORDER){const src=fs.readFileSync(path.join(B,f),'utf8');let m;const re=/Object\.assign\(BAL,\{|const BAL=\{/g;
 while((m=re.exec(src))){const ln=src.slice(0,m.index).split('\n').length;for(const k of objKeys(src,m.index+m[0].length-1))(sets[k]=sets[k]||[]).push(f+':'+ln)}
 for(const t of lex(src))if(t.t==='code'){const r2=/(?<![\w$.])BAL\.([A-Za-z_$][\w$]*)\s*=(?!=)\s*(?=[-+.\d\[{])/g  /* a typed value only (a copy b0 / a setter v forwards, not a second value) */;while((m=r2.exec(t.s))){(sets[m[1]]=sets[m[1]]||[]).push(f+':'+(t.line+t.s.slice(0,m.index).split('\n').length-1))}}}
for(const k in sets)if(sets[k].length>1)fail.push(`BAL.${k} is set ${sets[k].length} times (${sets[k].join(', ')}): one rule, one value`);
/* the same for every other knob table (const NAME={…} in one module, Object.assign(NAME,{…}) in another: J70CFG, FAIRN, WD …) */
const tset={};
for(const f of ORDER){const src=fs.readFileSync(path.join(B,f),'utf8');let m;const re=/(?:const ([A-Z][A-Z0-9_]{1,})\s*=\s*(?:window\.[A-Z0-9_]+\s*=\s*)?\{|Object\.assign\(([A-Z][A-Z0-9_]{1,}),\s*\{)/g;
 while((m=re.exec(src))){const name=m[1]||m[2];if(name==='BAL'||/^(KIT_GLOSS|HX|HXN|TELLS|ITIMG|FPOOL|PORK|TOK67|KG82_KIND|KG82_ENG|PCOL|ITEM_ART_G|WILL|PD_END|CW|VIB|ARC67|STORY|GB67|FEST)$/.test(name))continue;
  const ln=src.slice(0,m.index).split('\n').length;const body=src.slice(m.index+m[0].length-1,m.index+m[0].length+4000);
  for(const k of objKeys(src,m.index+m[0].length-1)){const v=(body.match(new RegExp('[{,]\\s*'+k.replace('$','\\$')+'\\s*:\\s*([^,}]{1,40})'))||[])[1]||'';
   if(!/^\s*(?:[-+.]?\d|\[\s*[-+.\d])/.test(v))continue;/* only numbers (a rule), not labels or state */const id=name+'.'+k;(tset[id]=tset[id]||[]).push(f+':'+ln)}}}
for(const id in tset)if(tset[id].length>1&&new Set(tset[id]).size>1)fail.push(`${id} is set ${tset[id].length} times (${tset[id].join(', ')}): one rule, one value`);

/* item prices: BAL.priceTier (jecon) is written over IT[k].pr at load; the item table must not type a different price */
try{const tier=Function('return '+fs.readFileSync(path.join(B,'jecon.js'),'utf8').match(/priceTier:(\{[^}]*\})/)[1])();const s8=fs.readFileSync(path.join(B,'j8.js'),'utf8');
 for(const k in tier){const m=s8.match(new RegExp('\\b'+k+'\\s*:\\s*\\{[^}]{0,400}?\\bpr\\s*:\\s*(\\d+)'));if(m&&+m[1]!==tier[k])fail.push(`IT.${k}.pr typed ${m[1]} in j8 but BAL.priceTier.${k} = ${tier[k]}: one price`)}}catch(e){fail.push('priceTier check: '+e.message)}
/* 4. ratchet against the frozen list */
const base=fs.existsSync(BASE)?JSON.parse(fs.readFileSync(BASE,'utf8')):null;
const total=o=>{let n=0;for(const f in o)for(const k in o[f])for(const s in o[f][k])n+=o[f][k][s];return n};
let grew=[];
/* kinds the frozen list already counts; a kind added to the guard later (review/one-core-dup: amt / sw / sc / k / ladder) is frozen by its
   first --update without --allow-grow (it is a new COUNT, not a new number), and from then on it may only shrink like the others */
const KINDS=new Set(base?(base.kinds||[...new Set(Object.values(base.files).flatMap(o=>Object.keys(o)))]):[]);
const fresh=new Set();
if(base){for(const f in now)for(const k in now[f]){if(!KINDS.has(k)){fresh.add(k);continue}for(const s in now[f][k]){const b=((base.files[f]||{})[k]||{})[s]||0,c=now[f][k][s];if(c>b)grew.push(`${f} [${k}] ${s}  (${b} → ${c})`)}}}
if(fresh.size&&!UPD)fail.push('kinds not frozen yet (run --update once): '+[...fresh].join(', '));
if(LIST){for(const k in now[LIST]||{})for(const s in now[LIST][k])console.log(k,s,now[LIST][k][s]);process.exit(0)}
if(UPD){if(grew.length&&!GROW){console.log('REFUSED: the list would grow (move these into BAL, or the coordinator passes --allow-grow):\n  '+grew.slice(0,40).join('\n  '));process.exit(1)}
 const files={};for(const f of Object.keys(now).sort()){const per={};for(const k of Object.keys(now[f]).sort()){const o={};for(const s of Object.keys(now[f][k]).sort())o[s]=now[f][k][s];per[k]=o}if(Object.keys(per).length)files[f]=per}
 /* every kind the guard declares is frozen, even one with no site left (review/one-core-dup3: h96 is 0 after its move; a later typed copy is a NEW number, not a fresh kind) */
 const DECL=[...Object.keys(CODE_PAT),...Object.keys(JOIN_PAT),...Object.keys(TXT_PAT).map(k=>'t.'+k)];
 const kinds=[...new Set([...KINDS,...fresh,...DECL,...Object.values(files).flatMap(o=>Object.keys(o))])].sort();
 if(fresh.size)console.log('new kinds frozen: '+[...fresh].join(', '));
 fs.writeFileSync(BASE,JSON.stringify({note:'one-core frozen list of inline rule numbers (dev/test/one-core-guard.js). It may only shrink.',total:total(files),kinds,files},null,0).replace(/\},"/g,'},\n"')+'\n');
 console.log('baseline written: '+total(files)+' inline rule numbers frozen'+(base?` (was ${base.total})`:''));}
else if(!base)fail.push('no baseline (run with --update once)');
else for(const g of grew)fail.push('NEW inline rule number: '+g);
if(process.env.OC_DUMP)fs.writeFileSync(process.env.OC_DUMP,JSON.stringify(now));
const T0=total(now);
console.log(JSON.stringify({modules:ORDER.length,inlineNow:T0,baseline:base?base.total:null,balKeys:Object.keys(sets).length,fails:fail.length}));
if(fail.length){console.log('FAIL\n  '+fail.slice(0,+(process.env.OCG_MAX||80)).join('\n  ')+(fail.length>+(process.env.OCG_MAX||80)?`\n  … ${fail.length-(process.env.OCG_MAX||80)} more`:''));process.exit(1)}
console.log('PASS: one core (no second value, no typed core text, no new inline rule number)');
