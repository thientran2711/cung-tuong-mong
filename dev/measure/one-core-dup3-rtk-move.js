/* one-core-dup3-rtk-move (review/one-core-dup3, item 3): the khắc cost k:N of every jroute «Lối riêng» card rtCard({id,…,k:N}) moves to
   BAL.route.k.<card id> (jbal.js); an id built as "pre_"+x keys as pre_; a card made by step("x",{…}) / mk("x",{…}) keys as step_x / mk_x. usage: node dev/measure/one-core-dup3-rtk-move.js (proof: one-core-dup2-same NS route) */
const fs=require('fs');const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const F='dev/build/jroute.js',J='dev/build/jbal.js';const src=fs.readFileSync(F,'utf8');const ast=acorn.parse(src,{ecmaVersion:'latest'});
const K={},edits=[];
(function walk(n){if(!n||typeof n.type!=='string')return;
 /* rtCard({id,…}) or a card helper step("name",{…}) / mk("name",{…}) (the name is the card id's tail) */
 const helper=n.type==='CallExpression'&&/^(step|mk)$/.test(n.callee.name)&&n.arguments[0]&&n.arguments[0].type==='Literal'&&n.arguments[1]&&n.arguments[1].type==='ObjectExpression';
 if(helper){const P=n.arguments[1].properties,k=P.find(p=>p.key&&p.key.name==='k');if(k&&k.value.type==='Literal'&&typeof k.value.value==='number'){const key=n.callee.name+'_'+String(n.arguments[0].value).replace(/[^\w$]/g,'_');if(K[key]!==undefined&&K[key]!==k.value.value)throw new Error('two costs for '+key);K[key]=k.value.value;edits.push([k.value.start,k.value.end,'BAL.route.k.'+key])}}
 if(n.type==='CallExpression'&&n.callee.name==='rtCard'&&n.arguments[0]&&n.arguments[0].type==='ObjectExpression'){const P=n.arguments[0].properties;
  const id=P.find(p=>p.key&&p.key.name==='id'),k=P.find(p=>p.key&&p.key.name==='k');
  if(k&&k.value.type==='Literal'&&typeof k.value.value==='number'){let key=null;const v=id&&id.value;
   if(v&&v.type==='Literal')key=v.value;else if(v&&v.type==='BinaryExpression'&&v.left.type==='Literal')key=v.left.value;else if(v&&v.type==='TemplateLiteral')key=v.quasis[0].value.cooked;
   if(!key)throw new Error('no id at '+n.start);key=key.replace(/[^\w$]/g,'_');
   if(K[key]!==undefined&&K[key]!==k.value.value)throw new Error('two costs for '+key);K[key]=k.value.value;edits.push([k.value.start,k.value.end,'BAL.route.k.'+key])}}
 for(const x in n){if(x==='type'||x==='start'||x==='end')continue;const c=n[x];if(Array.isArray(c))c.forEach(walk);else if(c&&typeof c.type==='string')walk(c)}})(ast);
let out=src;for(const [a,b,r] of edits.sort((x,y)=>y[0]-x[0]))out=out.slice(0,a)+r+out.slice(b);fs.writeFileSync(F,out);
let j=fs.readFileSync(J,'utf8');const anchor='Object.assign(BAL,{route:{';if(!j.includes(anchor))throw new Error('anchor');
j=j.replace(anchor,anchor+'\n /* k = the khắc each «Lối riêng» card costs, by card id (rtCard({id,…,k}); review/one-core-dup3, dev/measure/one-core-dup3-rtk-move.js) */\n k:{'+Object.entries(K).map(([a,b])=>a+':'+b).join(',')+'},');
fs.writeFileSync(J,j);console.log(edits.length,'cards',Object.keys(K).length,'ids')
