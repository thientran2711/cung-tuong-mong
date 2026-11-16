/* design-scale codemod (KIT §0, owner 16/11 07:47Z + 07:50Z): inside the design canvas only two sizes exist — SPREAD 1180x820 (html.kv2) and
   ONE PAGE 590x820 (html.kv1). The one page must be the spread's page scaled, so every width/orientation @media is rewritten:
     CONTENT rule (panels, cards, modals, stage plaques …): PAGE-only → DROP (the page uses what the spread uses) · LAND-only → UNWRAP (always)
     CHROME rule (top bar, tab bar, page grid, back-to-room button) and SCREEN rule (full-canvas scenes: title, roulette, map, scene panel,
       mini-game overlays, podium, load): unchanged in phase 1 — inside the canvas a width query on them already means kv1/kv2 (OD:L345 one
       layout per orientation); phase 3 rewrites them as :where(.kv1/.kv2) selectors (the pre() helper below).
     ALWAYS → UNWRAP · DEAD (fires at neither size) and ENV (motion/hover/pointer) → unchanged (DEAD are removed in phase 3).
   :where() keeps every selector's specificity unchanged. usage: node dev/measure/kv-codemod.js [--write] > table.md */
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const B=path.join(__dirname,'../build');const WRITE=process.argv.includes('--write');
const files=['p1.html',...fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f)&&!/^all/.test(f)&&!/^(j57|jbd)\.js$/.test(f))];/* j57 (tab labels, chrome) and jbd build their @media in JS strings: chrome/screen, unchanged */
const SCREEN=/(\.title|\.tbox|\.kroul|\.krgrid|\.kpod|#kpodov|\.kleather|\.kl-|\.pmap|\.mtile|\.mspot|\.mleg|\.msil|\.mwhy|\.kpscene|\.kpsc|\.kload|\.dawn|#dawn|\.kmtabs|\.kmcap|\.kgame|\.kghud|\.kgbox|\.kgpic|\.kginfo|\.kg82|#kg82|#ov|\.mg(?![\w-])|\.ktut|\.ktip|\.kipd|\.kipg|\.kctm|\.art(?![\w-])|\.kpmv|\.kpm-)/;
const CHROME=/(^|[\s>,(])(header\.hud|#kstrow|#k3tc|\.hud(?![\w-])|\.hud>|#tabs|\.tabs(?![\w-])|nav\.bar|\.bar(?![\w-])|#k3room|\.game(?:#game)?(?:[.:#][\w-]+(?:\([^)]*\))?)*\s*(?:\{|$|,)|\.me(?![\w-])|\.emp(?![\w-])|#next)/;
function blocks(src){const out=[];const re=/@media\s*([^{;`'"]+?)\s*\{/g;let m;
 while((m=re.exec(src))){const start=m.index,open=re.lastIndex-1;let d=1,k=open+1;while(d&&k<src.length){const c=src[k];if(c==='/'&&src[k+1]==='*'){k=src.indexOf('*/',k+2)+2;continue}d+=(c==='{')-(c==='}');k++}
  out.push({start,open,end:k,q:m[1].trim(),body:src.slice(open+1,k-1),line:src.slice(0,start).split('\n').length});re.lastIndex=k}return out}
function rules(body){/* split a block body into [selector, declarations] + raw comments/space */const out=[];let i=0;
 while(i<body.length){const ws=body.slice(i).match(/^(\s|\/\*[\s\S]*?\*\/)*/)[0];if(ws){out.push({raw:ws});i+=ws.length;if(i>=body.length)break}
  const o=body.indexOf('{',i);if(o<0){out.push({raw:body.slice(i)});break}let d=1,k=o+1;while(d&&k<body.length){d+=(body[k]==='{')-(body[k]==='}');k++}
  out.push({sel:body.slice(i,o),decl:body.slice(o,k)});i=k}return out}
function pre(sel,cls){return sel.split(',').map(s=>{const t=s.trim();if(!t)return s;const lead=s.match(/^\s*/)[0];
 if(/^:root/.test(t))return lead+t.replace(/^:root/,`:root:where(.${cls})`);if(/^html\b/.test(t))return lead+t.replace(/^html/,`html:where(.${cls})`);
 return lead+`:where(.${cls}) `+t}).join(',')}
(async()=>{const b=await chromium.launch();const pg={};for(const [k,w] of [['L',1180],['P',590]]){pg[k]=await b.newPage({viewport:{width:w,height:820}});await pg[k].setContent('<html></html>')}
 const ev=async(k,q)=>pg[k].evaluate(q=>{try{return matchMedia(q).matches}catch(e){return null}},q);const table=[];const cnt={};
 for(const f of files){const p=path.join(B,f);let src=fs.readFileSync(p,'utf8');const bl=blocks(src);if(!bl.length)continue;let out='',pos=0;
  for(const x of bl){if(/reduced-motion|hover|pointer|display-mode|print/.test(x.q)){continue}const l=await ev('L',x.q),pp=await ev('P',x.q);
   const cls=l===null?'BAD':l&&pp?'ALWAYS':!l&&!pp?'DEAD':l?'LAND':'PAGE';const rs=rules(x.body);
   const isC=r=>/--kstH/.test(r.decl||'')||r.sel&&(CHROME.test(r.sel.trim())||SCREEN.test(r.sel));const chrome=rs.some(isC);
   let act='keep',rep=null;
   if(chrome&&(cls==='PAGE'||cls==='LAND'||cls==='ALWAYS'))act='keep: chrome/screen (phase 3 → .kv'+(cls==='PAGE'?1:cls==='LAND'?2:'')+')';
   else if(cls==='ALWAYS'){act='unwrap';rep=x.body}
   else if(cls==='PAGE'){act='drop';rep=''}
   else if(cls==='LAND'){act='unwrap';rep=x.body}
   cnt[act]=(cnt[act]||0)+1;table.push(`| ${f}:${x.line} | \`${x.q.replace(/\|/g,'\\|')}\` | ${cls} | ${act} | \`${(rs.find(r=>r.sel)||{sel:''}).sel.trim().replace(/\s+/g,' ').slice(0,70).replace(/\|/g,'\\|')}\` |`);
   if(rep!==null){out+=src.slice(pos,x.start)+(rep.trim()?'/* kv:'+x.q.replace(/\*\//g,'')+' */'+rep:'/* kv: dropped @media '+x.q.replace(/\*\//g,'')+' (one page = spread page, KIT §0) */');pos=x.end}}
  out+=src.slice(pos);if(WRITE&&out!==src)fs.writeFileSync(p,out)}
 await b.close();console.log('| file:line | query | class | action | first selector |\n|---|---|---|---|---|\n'+table.join('\n'));console.error(JSON.stringify(cnt))})();
