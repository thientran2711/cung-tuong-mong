/* law 3 GAIN-AND-LOSS (MAIN 111 21:33Z 23/11, typed-stat-bal): a c6 event card whose cost c and win w move the SAME stat by amounts that cancel
   (or the win does not beat the cost) leaves that stat a pure cost → FAIL. Reads every c6("…",{c:{…},w:{…}}) object literal in dev/build (numbers or
   BAL reads, resolved through loadBAL). usage: node dev/test/c6-cancel-scan.js [buildDir]   exit 1 when a card is listed */
const fs=require('fs'),path=require('path');const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const {loadBAL}=require('./one-core-text.js');
function scan(dir){const D=dir||path.join(__dirname,'..','build');const BAL=loadBAL(D);const rows=[];
 const val=(src,n)=>{if(!n)return null;if(n.type==='Literal')return n.value;if(n.type==='UnaryExpression'&&n.operator==='-'){const v=val(src,n.argument);return v==null?null:-v}
  const t=src.slice(n.start,n.end);if(/^BAL(\.[\w$]+|\[\d+\])+$/.test(t)){let o=BAL;for(const k of t.slice(4).split(/\.|\[|\]/).filter(Boolean))o=o==null?o:o[k];return typeof o==='number'?o:null}return null};
 const obj=(src,n)=>{const o={};if(!n||n.type!=='ObjectExpression')return o;for(const p of n.properties){if(p.type!=='Property')continue;const v=val(src,p.value);if(typeof v==='number')o[p.key.name||p.key.value]=v}return o};
 for(const f of fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f))){const src=fs.readFileSync(path.join(D,f),'utf8');if(!src.includes('c6('))continue;let ast;try{ast=acorn.parse(src,{ecmaVersion:'latest',locations:true})}catch(e){continue}
  (function w(n){if(!n||typeof n.type!=='string')return;
   if(n.type==='CallExpression'&&n.callee.type==='Identifier'&&n.callee.name==='c6'&&n.arguments[1]&&n.arguments[1].type==='ObjectExpression'){const s=n.arguments[1];const get=k=>s.properties.find(p=>p.type==='Property'&&(p.key.name||p.key.value)===k);
    const c=obj(src,get('c')&&get('c').value),wn=obj(src,get('w')&&get('w').value),hasP=!!get('p');
    for(const k in c)if(c[k]<0&&wn[k]>0&&wn[k]+c[k]<=0)rows.push({f,line:n.loc.start.line,name:src.slice(n.arguments[0].start,n.arguments[0].end).slice(0,40),stat:k,cost:c[k],win:wn[k],odds:hasP})}
   for(const k in n){if(k==='type')continue;const c=n[k];if(Array.isArray(c))c.forEach(w);else if(c&&typeof c.type==='string')w(c)}})(ast)}
 return rows}
module.exports={scan};
if(require.main===module){const r=scan(process.argv[2]);r.forEach(x=>console.log(`CANCEL ${x.f}:${x.line} ${x.name} ${x.stat}: cost ${x.cost} win +${x.win}${x.odds?' (on success only)':''}`));console.log(`c6-cancel-scan: ${r.length} cards`);process.exit(r.length?1:0)}
