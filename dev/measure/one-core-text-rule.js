/* one-core-text-rule (review/one-core-jkc, ONE CORE OD:L1267, LUẬT SỬA CẢ NHÓM): the WHOLE-GAME family of the tiểu thư fault (help «Từ 60 … tới 85»
   while the rules read 40 / 90). Every player-visible string / template text that TYPES a threshold number next to a stat word («Từ 60», «dưới 40»,
   «Đức 80+», «tới 90») is set beside the cuts the CODE compares that stat with (x.<stat> >=/</… N or a BAL key), across the whole game:
     TYPED  = the number is one of the stat's rule cuts but typed in the text (change the BAL value → the text lies): print the key instead;
     DIFF   = the number is none of the stat's rule cuts (the text tells the player a cut the rules never use): list → read → fix the text or the rule.
   ${…} prints are skipped (they already print). Scales «0–100», «trên 100» and 0 / 100 are skipped. Output: one row per hit (file:line).
   usage: node dev/measure/one-core-text-rule.js [buildDir] [--json] */
const fs=require('fs'),path=require('path');
const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const B=process.argv[2]&&!process.argv[2].startsWith('--')?process.argv[2]:path.join(__dirname,'..','build');
const ORDER=fs.readFileSync(path.join(B,'assemble.py'),'utf8').match(/for f in \[([^\]]+)\]/)[1].match(/'([^']+)'/g).map(s=>s.slice(1,-1));
const BAL=require(path.join(__dirname,'..','test','one-core-text.js')).loadBAL?require(path.join(__dirname,'..','test','one-core-text.js')).loadBAL(B):null;
/* stat word (player words) → the property names the rules compare */
const WORDS=[
 [/áp lực hôn sự|áp lực/i,['kap']],[/gia thanh/i,['kgt']],[/hồi môn/i,['khm']],[/gia tư|gia thế/i,['kgtu']],[/lời đồn/i,['kld']],
 [/nợ nhà|phe chủ chiến/i,['kap']],[/tiếng trong xóm|hòa ước/i,['kgt']],
 [/sủng/i,['sung']],[/đức/i,['duc']],[/danh/i,['danh']],[/tâm cơ/i,['tamco']],[/sắc/i,['sac']],[/tài/i,['tai']],[/sức/i,['suc']],
 [/bạc|lượng/i,['bac']],[/lòng/i,['loyal','loy']],[/chủ tin|tin cậy|\btin\b/i,['tin']],[/thiện cảm|thân thiết/i,['rel','af']],[/oán|thù/i,['oan']],
 [/tuổi/i,['age']],[/lễ nghi/i,['le']],[/khéo tay/i,['kim']],[/mê/i,['me']],[/thương/i,['fond']],[/ghen/i,['ghen']],[/hiểm|nguy/i,['h','risk']],
];
const CMP=new Set(['>=','>','<=','<','===','==']);
const lineOf=(src,i)=>src.slice(0,i).split('\n').length;
const balVal=n=>{let p=[];let x=n;while(x&&x.type==='MemberExpression'){p.unshift(x.computed?(x.property.type==='Literal'?x.property.value:null):x.property.name);x=x.object}
 if(!x||x.type!=='Identifier'||x.name!=='BAL'||p.includes(null))return undefined;let o=BAL;for(const k of p){if(o==null)return undefined;o=o[k]}return typeof o==='number'?o:undefined};
const numOf=n=>n&&(n.type==='Literal'&&typeof n.value==='number'?n.value:n.type==='UnaryExpression'&&n.operator==='-'&&n.argument.type==='Literal'?-n.argument.value:n.type==='MemberExpression'?balVal(n):undefined);
const propOf=n=>n&&n.type==='MemberExpression'&&!n.computed?n.property.name:undefined;
const rules={};/* prop → Map(value → [where]) */
const texts=[];
for(const f of ORDER){if(/^jbal/.test(f))continue;const p=path.join(B,f);if(!fs.existsSync(p))continue;const src=fs.readFileSync(p,'utf8');let ast;try{ast=acorn.parse(src,{ecmaVersion:'latest'})}catch(e){continue}
 (function walk(n,par){if(!n||typeof n.type!=='string')return;
  if(n.type==='BinaryExpression'&&CMP.has(n.operator)){for(const [a,b] of [[n.left,n.right],[n.right,n.left]]){const pr=propOf(a),v=numOf(b);if(pr&&v!==undefined){(rules[pr]=rules[pr]||new Map());const m=rules[pr];if(!m.has(v))m.set(v,[]);m.get(v).push(f+':'+lineOf(src,n.start)+(b.type==='MemberExpression'?'(BAL)':''))}}}
  if(n.type==='Literal'&&typeof n.value==='string')texts.push({f,line:lineOf(src,n.start),s:n.value,key:par&&par.type==='Property'&&par.value===n?(par.key.name||par.key.value):null});
  if(n.type==='TemplateLiteral')n.quasis.forEach(q=>texts.push({f,line:lineOf(src,q.start),s:q.value.cooked||'',key:par&&par.type==='Property'&&par.value===n?(par.key.name||par.key.value):null}));
  for(const k in n){if(k==='type'||k==='start'||k==='end')continue;const c=n[k];if(Array.isArray(c))c.forEach(x=>walk(x,n));else if(c&&typeof c.type==='string')walk(c,n)}})(ast,null)}
/* a threshold phrase: «từ 60», «tới 85», «dưới 40», «trên 50», «đủ 70», «quá 80», «ít nhất 30», «60+», «≥ 60» … */
const PH=/(?:(từ|tới|đến|dưới|trên|đủ|quá|chạm|đạt|cần|ít nhất|hơn|lên|xuống|còn|≥|>=|<|>|≤)\s+(\d{1,3})(?![\d.,%]|\s*(?:tháng|năm|ngày|lượng|lạng|tuổi|người|buổi|lần|việc|đêm|bước|phần))|(\d{1,3})\+)/gi;
const out=[];
for(const t of texts){if(!/[à-ỹÀ-Ỹ]/.test(t.s))continue;let m;PH.lastIndex=0;
 while((m=PH.exec(t.s))){const n=+(m[2]||m[3]);if(!n||n>=100)continue;const pre=t.s.slice(Math.max(0,m.index-40),m.index);if(/0\s*[–-]\s*$/.test(pre))continue;
  let props=null,word=null;for(const [re,ps] of WORDS){const all=[...pre.matchAll(new RegExp(re.source,'gi'))];if(all.length){const at=all[all.length-1].index;if(word===null||at>word.at){word={at,w:all[all.length-1][0]};props=ps}}}
  if(!props&&t.key&&rules[t.key]){props=[t.key];word={w:'('+t.key+')'}}
  if(!props&&t.key)for(const [re,ps] of WORDS)if(re.test(t.key)){props=ps;word={w:'('+t.key+')'};break}/* KIT_GLOSS {"Áp lực hôn sự":"…"} */
  if(!props)continue;
  const cuts=new Map();for(const pr of props)for(const [v,w] of (rules[pr]||new Map()))cuts.set(v,(cuts.get(v)||[]).concat(w));
  const kind=cuts.has(n)?'TYPED':'DIFF';
  out.push({kind,f:t.f,line:t.line,word:word.w,n,props:props.join('/'),cuts:[...cuts.keys()].sort((a,b)=>a-b).join(','),where:(cuts.get(n)||[]).slice(0,3).join(' '),text:t.s.slice(Math.max(0,m.index-50),m.index+m[0].length+25).replace(/\s+/g,' ')})}}
if(process.argv.includes('--json')){console.log(JSON.stringify(out,null,1));process.exit(0)}
for(const o of out)console.log(`${o.kind}\t${o.f}:${o.line}\t${o.word}=${o.n}\t[${o.props}: ${o.cuts}]\t${o.where}\t«${o.text}»`);
console.log(JSON.stringify({hits:out.length,TYPED:out.filter(o=>o.kind==='TYPED').length,DIFF:out.filter(o=>o.kind==='DIFF').length}));
