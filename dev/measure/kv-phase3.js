/* design-scale PHASE 3 codemod (KIT §0, owner 16/11 07:47Z + 07:50Z, OD:L345 one layout per orientation). Inside the design canvas only two
   sizes exist: SPREAD 1180x820 (html.kv2) and ONE PAGE 590x820 (html.kv1). Every remaining width/height/orientation CSS @media is rewritten:
     DEAD   (fires at neither size)  → deleted
     ALWAYS (fires at both)          → unwrapped (rules apply always)
     PAGE   (one page only)          → unwrapped, every selector prefixed :where(.kv1)   (specificity unchanged)
     LAND   (spread only)            → unwrapped, every selector prefixed :where(.kv2)
     ENV (reduced-motion / hover / pointer / display-mode / print) → kept.
   JS breakpoints (matchMedia, innerWidth/innerHeight compares) and the @media built in JS strings (j57, jbd) are converted by hand to
   kitView().pages / html.kv1 / html.kv2. dev/measure/media-check.js (run by build_site.sh) then fails on any new one.
   usage: node dev/measure/kv-phase3.js [--write] > table.md */
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const B=path.join(__dirname,'../build');const WRITE=process.argv.includes('--write');
const files=['p1.html',...fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f)&&!/^all/.test(f))];
function blocks(src){const out=[];const re=/@media\s*([^{;`'"]+?)\s*\{/g;let m;const cm=[...src.matchAll(/\/\*[\s\S]*?\*\//g)].map(c=>[c.index,c.index+c[0].length]);
 while((m=re.exec(src))){if(cm.some(([a,z])=>m.index>=a&&m.index<z))continue;const start=m.index,open=re.lastIndex-1;let d=1,k=open+1;while(d&&k<src.length){const c=src[k];if(c==='/'&&src[k+1]==='*'){k=src.indexOf('*/',k+2)+2;continue}d+=(c==='{')-(c==='}');k++}
  out.push({start,open,end:k,q:m[1].trim(),body:src.slice(open+1,k-1),line:src.slice(0,start).split('\n').length});re.lastIndex=k}return out}
function rules(body){const out=[];let i=0;
 while(i<body.length){const ws=body.slice(i).match(/^(\s|\/\*[\s\S]*?\*\/)*/)[0];if(ws){out.push({raw:ws});i+=ws.length;if(i>=body.length)break}
  const o=body.indexOf('{',i);if(o<0){out.push({raw:body.slice(i)});break}let d=1,k=o+1;while(d&&k<body.length){d+=(body[k]==='{')-(body[k]==='}');k++}
  out.push({sel:body.slice(i,o),decl:body.slice(o,k)});i=k}return out}
function pre(sel,cls){return sel.split(',').map(s=>{const t=s.trim();if(!t)return s;const lead=s.match(/^\s*/)[0];
 if(/^:root/.test(t))return lead+t.replace(/^:root/,`:root:where(.${cls})`);if(/^html\b/.test(t))return lead+t.replace(/^html/,`html:where(.${cls})`);
 return lead+`:where(.${cls}) `+t}).join(',')}
function prefixBody(body,cls){return rules(body).map(r=>{if(r.raw!==undefined)return r.raw;if(/^\s*@/.test(r.sel))throw new Error('nested at-rule: '+r.sel.trim());
 if(/[`$]/.test(r.sel))throw new Error('template selector: '+r.sel.trim());return pre(r.sel,cls)+r.decl}).join('')}
(async()=>{const b=await chromium.launch();const pg={};for(const [k,w] of [['L',1180],['P',590]]){pg[k]=await b.newPage({viewport:{width:w,height:820}});await pg[k].setContent('<html></html>')}
 const ev=async(k,q)=>pg[k].evaluate(q=>{try{return matchMedia(q).matches}catch(e){return null}},q);const table=[];const cnt={};
 for(const f of files){const p=path.join(B,f);const src=fs.readFileSync(p,'utf8');const bl=blocks(src);if(!bl.length)continue;let out='',pos=0;
  for(const x of bl){if(/reduced-motion|hover|pointer|display-mode|print/.test(x.q))continue;
   const l=await ev('L',x.q),pp=await ev('P',x.q);const cls=l===null?'BAD':l&&pp?'ALWAYS':!l&&!pp?'DEAD':l?'LAND':'PAGE';let rep=null,act;
   try{if(cls==='DEAD'){act='delete';rep=''}else if(cls==='ALWAYS'){act='unwrap';rep=x.body}else if(cls==='PAGE'){act='.kv1';rep=prefixBody(x.body,'kv1')}else if(cls==='LAND'){act='.kv2';rep=prefixBody(x.body,'kv2')}else act='keep'}
   catch(e){act='MANUAL ('+e.message.slice(0,60)+')';rep=null}
   cnt[act.split(' ')[0]]=(cnt[act.split(' ')[0]]||0)+1;table.push(`| ${f}:${x.line} | \`${x.q.replace(/\|/g,'\\|')}\` | ${cls} | ${act} |`);
   if(rep!==null){out+=src.slice(pos,x.start)+(cls==='DEAD'?'':`/* kv3:${act} */`+rep);pos=x.end}}
  out+=src.slice(pos);if(WRITE&&out!==src)fs.writeFileSync(p,out)}
 await b.close();console.log('| file:line | query | class | action |\n|---|---|---|---|\n'+table.join('\n'));console.error(JSON.stringify(cnt))})();
