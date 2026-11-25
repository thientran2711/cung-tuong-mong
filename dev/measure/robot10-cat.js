/* robot10-cat.js — the ROBOT-10 catalogue of every way a life can end (OWNER ORDER #4, MAIN 111 20:50Z 23/11): enumerated FROM THE CODE, never typed.
   deaths  = every die(why) / kcDie(why) / mort kill(her, why) text in dev/build/j*.js (template ${…} = wildcard) + the mort accident lists (ACC me/odd,
             «Ngươi …») + endings that kill her (over(…) with alive false: Ban chết, succession «ban chết» …)
   endings = every over(title) literal + the data tables the game ends a life from: RARE97 exits (j97), GE_CAT titles (jge «Đại kết cục · …»),
             SUCC_END (j99succ), plus KY.TITLE (kỳ ngộ ids, metric 8) and RANKS (rank names)
   USE  const cat=require('./robot10-cat.js'); cat.staticScan(repoDir) → {deaths,endings,dynamic}; robot10.js adds the runtime tables
        (cat.RUNTIME evaluated in the game page) and writes <out>/catalog.json; robot10-agg.js matches every life to one entry (cat.match).
   A site whose text is built at run time with no literal (over(h,…), die(why)) is listed under «dynamic» with file:line (its callers' texts are caught
   where they are literals). */
const fs=require('fs'),path=require('path');
const lits=a=>{const out=[];const re=/(["`])((?:\\.|(?!\1)[^\\])*)\1/g;let m;while((m=re.exec(a)))out.push(m[2]);return out};
/* the argument text of a call starting at i (just after "name("), balanced parens, capped */
function argAt(src,i,first){let d=1,j=i,q=null;for(;j<src.length&&j-i<600;j++){const c=src[j];if(q){if(c==='\\'){j++;continue}if(c===q)q=null;else if(q==='`'&&c==='$'&&src[j+1]==='{'){/* skip ${…} */let e=1;j+=2;for(;j<src.length&&e;j++){if(src[j]==='{')e++;else if(src[j]==='}')e--}j--}continue}
 if(c==='"'||c==="'"||c==='`'){q=c;continue}if(c==='(')d++;else if(c===')'){d--;if(!d)break}else if(first&&c===','&&d===1)break}return src.slice(i,j)}
const toRx=t=>t.split(/\$\{(?:[^{}]|\{[^{}]*\})*\}/).map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('.*?');
const good=(t,min)=>/\p{L}{2}/u.test(t)&&t.replace(/\$\{[^}]*\}/g,'').trim().length>=(min||6)&&!/^<|class=|^\s*$/.test(t);
function staticScan(repo){const dir=path.join(repo,'dev','build');const files=fs.readdirSync(dir).filter(f=>/^j.*\.js$/.test(f)&&!/^jpetlife|^jbal/.test(f)).sort();
 const deaths=[],endings=[],dynamic=[];const seen=new Set();
 const add=(L,kind,text,src)=>{const t=text.replace(/\s+/g,' ').trim().replace(/\.$/,'');const k=kind+'|'+t;if(seen.has(k))return;seen.add(k);L.push({kind,text:t,rx:toRx(t),src})};
 for(const f of files){const src=fs.readFileSync(path.join(dir,f),'utf8');const lineOf=i=>src.slice(0,i).split('\n').length;
  const scan=(name,kind,L,first)=>{const re=new RegExp('(^|[^\\w.$])'+name+'\\(','g');let m;while((m=re.exec(src))){const i=m.index+m[0].length;
   if(/function\s*$/.test(src.slice(Math.max(0,m.index-12),m.index+1)))continue;const a=argAt(src,i,first);const ls=lits(a).filter(t=>good(t,kind==='ending'?4:6));
   if(!ls.length){if(!/^\s*\)?$/.test(a))dynamic.push({kind,call:name+'('+a.slice(0,60)+')',src:f+':'+lineOf(m.index)});continue}
   ls.forEach(t=>add(L,kind,t,f+':'+lineOf(m.index)))}};
  if(f!=='j79.js'){scan('die','death',deaths,false);scan('kcDie','death',deaths,false);scan('deathSentence','death',deaths,false);scan('mortKill','death',deaths,false)}
  scan('over','ending',endings,true);
  /* mort: kill(p,`…`) of her and the accident lists */
  if(f==='jmort.js'){const k=src.indexOf('const ACC=');if(k>=0){const e=src.indexOf('};',k);try{const ACC=require('vm').runInNewContext('('+src.slice(k+10,e+1)+')');
     ['me','odd'].forEach(x=>(ACC[x]||[]).forEach(t=>add(deaths,'death','Ngươi '+t,'jmort.js ACC.'+x)))}catch(err){dynamic.push({kind:'death',call:'ACC parse failed '+err.message,src:'jmort.js'})}}
   scan('kill','death',deaths,false)}}
 return{deaths,endings,dynamic,files:files.length}}
/* evaluated inside the game page (robot10.js): the data tables a life ends from */
const RUNTIME=`(()=>{const o={rare:[],grand:[],succ:[],ky:[],ranks:[],ill:[],kitOdds:null};
 try{const d=RARE97.defs;for(const k in d){const e=d[k];if(e&&Array.isArray(e.exit)&&e.exit[2])o.rare.push({id:k,t:String(e.exit[2])})}}catch(e){}
 try{for(const b in GE_CAT){(GE_CAT[b].e||[]).forEach((e,i)=>{[e[6],e[7]].filter(Boolean).forEach(t=>o.grand.push({id:b+'#'+(i+1),t:'Đại kết cục · '+t}))})}}catch(e){}
 try{for(const k in SUCC_END)o.succ.push({id:k,t:SUCC_END[k].h,rare:!!SUCC_END[k].rare})}catch(e){}
 try{for(const k in KY.TITLE)o.ky.push({id:k,t:KY.TITLE[k]})}catch(e){}
 try{o.ranks=RANKS.map(r=>r.n)}catch(e){}try{o.ill=Object.values(ILL).map(x=>x.n)}catch(e){}try{o.kitOdds=KIT_ODDS.slice()}catch(e){}
 return o})()`;
function build(st,rt){const E=st.endings.slice(),D=st.deaths.slice();const s=new Set(E.map(e=>e.text));
 const addE=(t,src,kind)=>{if(!t||s.has(t))return;s.add(t);E.push({kind:kind||'ending',text:t,rx:toRx(t),src})};
 (rt.rare||[]).forEach(x=>addE(x.t,'RARE97 '+x.id));(rt.succ||[]).forEach(x=>addE(x.t,'SUCC_END '+x.id));(rt.grand||[]).forEach(x=>addE(x.t,'GE_CAT '+x.id));
 return{at:new Date().toISOString(),deaths:D,endings:E,dynamic:st.dynamic,ky:rt.ky||[],ranks:rt.ranks||[],ill:rt.ill||[],kitOdds:rt.kitOdds,counts:{deaths:D.length,endings:E.length,dynamic:st.dynamic.length,ky:(rt.ky||[]).length}}}
/* one life → its catalogue entry (the most specific pattern that matches: longest literal text) */
function match(L,text){text=String(text||'').replace(/\s+/g,' ').trim().replace(/\.$/,'');if(!text)return null;let best=null,bl=-1;
 for(const e of L){let r=e._r;if(!r)try{r=e._r=new RegExp('^'+e.rx+'$|^'+e.rx+'[.,:;·]','u')}catch(x){continue}
  if(r.test(text)){const l=e.text.replace(/\$\{[^}]*\}/g,'').length;if(l>bl){bl=l;best=e}}}
 if(!best)for(const e of L){/* the cause can carry a prefix (year, «Năm N,» / a lead-in sentence): match anywhere */let r2=e._r2;if(!r2)try{r2=e._r2=new RegExp(e.rx,'u')}catch(x){continue}
  if(e.text.replace(/\$\{[^}]*\}/g,'').length>=10&&r2.test(text)){const l=e.text.length;if(l>bl){bl=l;best=e}}}
 return best}
module.exports={staticScan,RUNTIME,build,match,toRx};
if(require.main===module){const st=staticScan(path.join(__dirname,'..','..'));console.log(JSON.stringify({counts:{deaths:st.deaths.length,endings:st.endings.length,dynamic:st.dynamic.length}},null,0));
 st.deaths.forEach(d=>console.log('D',d.src.padEnd(14),d.text.slice(0,110)));st.endings.forEach(d=>console.log('E',d.src.padEnd(14),d.text.slice(0,110)));st.dynamic.forEach(d=>console.log('?',d.src.padEnd(14),d.kind,d.call))}
