/* TIER: which review a branch needs before it goes live (go-live kit, owner OD:L1370 (b): "a script decides, not the worker").
   usage: node dev/tools/tier.js [ref] [--base origin/main] [--json]      (default ref HEAD; diff = base..ref when ref contains base, else base...ref)
   SMALL = only UI / layout / CSS / text / art / kit look  -> touched-part tests + Fold 755x1000 & iPad 1180x820 shots + old-save load (+ quickcheck)
   BIG   = BAL / numbers, save / slots / migrations, co-op / sync, time / buổi / khắc, progression / rules, server Worker -> full review
   When unsure -> BIG. Decided per changed line, so a one-word label in a BIG module stays SMALL, and a number in a UI module is BIG
   unless it is a layout number (px, %, ms, z-index, opacity…). Generated files (index.html, sw.js, assets.json, dev/build/all*.js) are skipped.
   Exit code: 0 SMALL, 2 BIG, 1 error. */
const {execFileSync}=require('child_process');const path=require('path'),fs=require('fs');
const A=process.argv.slice(2);const opt=(k,d)=>{const i=A.indexOf('--'+k);return i<0?d:A[i+1]};
const REF=A.find((a,i)=>!a.startsWith('--')&&!(i>0&&A[i-1]==='--base'))||'HEAD';const BASE=opt('base',process.env.CTM_LIVE_REF||'origin/main');const JSONOUT=A.includes('--json');
const git=(...a)=>execFileSync('git',a,{encoding:'utf8',maxBuffer:1<<28});
const TOP=git('rev-parse','--show-toplevel').trim();

/* ---- rules (edit here; keep the reason words short) ---- */
const GENERATED=/^(index\.html|sw\.js|assets\.json|dev\/index\.html|dev\/build\/all[\w]*\.js|manifest\.webmanifest)$/;
const SMALL_PATH=[[/^dev\/(kit|art|handover|rules|review|shots-td|fxwork|figwork|measure|ideas|research|audio)\//,'docs/art/kit files'],[/\.(md|txt|png|jpe?g|webp|svg|gif|mp3|ogg|mp4|webm)$/i,'docs/media'],
 [/^dev\/test\//,'tests only'],[/^(img|icons|audio|cdn|docs)\//,'art/sound/docs'],[/^dev\/build\/avatars\.js$/,'art list'],[/^\.gitignore$/,'git ignore']];
const BIG_PATH=[[/^coop\//,'co-op server Worker','coop'],[/^dev\/coop\//,'co-op protocol','coop'],[/^dev\/build\/assemble\.py$/,'module order'],[/^dev\/site\/(swreg\.js|sw\.tpl\.js|assets\.py|build_site\.sh|kboot\.js|rot\.js|buildinfo\.py|cdn_sync\.py)$/,'boot / update / deploy','save'],
 [/^\.github\//,'CI'],[/^dev\/tools\/(tier|quickcheck|golive|rollback|nightly|shots|perfgate|gate-selftest)\b/,'go-live gate (checks itself)','gate'],
 [/^dev\/test\/lib\//,'test harness shared by the gate','gate'],[/^dev\/tools\//,'dev tools (unsure -> BIG)'],[/wrangler|worker/i,'server Worker','coop']];
/* modules where ANY logic change is BIG (text-only edits stay SMALL) */
const BIG_MOD={bal:/^j(bal2?|bac|diff|ecom?|econ|eitem|stip|earn|int|lux|wd92b|wdinv|weather|rcp|tds|wkr|col|jpet|pet|petcare)\.js$/,save:/^j(slots|load|cloud|kiep)\.js$/,coop:/^jcoop\w*\.js$/,
 time:/^j(time4z?|buoi|cycle|mcal|night|rest)\.js$/,prog:/^j(promo|promsv|exam|chap|route|reign|goal|story|truth|mort|logsync|why|evb|trong|tin|mline|house|staff|cmaid|poison|lost|mem|kc|ts|tsb|orig|origins|age|pal|men|rash|veil|ty|emo|mood|cmood|dis|thaiy|jact|act2?|audit|clos|close|jly)\.js$/};
/* modules that are kit / look only: logic edits here are SMALL unless a BIG word shows up in the changed line */
const UI_MOD=/^j(bd|book|cdn|evban|evfit|face|fighd|fx|fxkit|hcpor|inv|itd|k2b|k3|k4|kit|kitctl|kitpage|kpc|kpor|krel|krev|mark|opic|pane|pcf|pdlg|ph|place|rail|seal|sfx|sl|statfx|title|tabs|notes|img|wkpics|pres|artc|ct2|jly|ly|tut|jtut|gpick|gift|cui|ne|flip|plx|pm|res|hc|ht|jhc|jht|kjrel|nwp|nwq|lant|td|jtd|sgame|wkg|itev|jitev)\.js$|^p1\.html$/;
const BIGWORD=/\bBAL2?\b|\bser\(|\bdeser\(|\bsave\(|loadSlot|\bSK\(|localStorage|migrat|\bS\.v\b|\bCOOPW?\b|\.send\(|\bisHost\b|\bguest\b|\bS\.(turn|buoi|khac|month|year|age|rank|sung|danh|duc|bac|dead|week)\b|endTurn|nextBuoi|\bpromote|\bexam|\bchance|\bodds\b|Math\.random|\brnd\(|\bprice|\bcost\b|\bdeal\(|\bstart\(/;
const UIWORD=/class=|className|classList|innerHTML|outerHTML|insertAdjacentHTML|style|css|\bkit[A-Z]\w*|\.k[a-z0-9]+\b|<\/?[a-z][\w-]*[\s>]|querySelector|getElementById|getBoundingClientRect|\brender\w*\(|\bhtml\b|\b(width|height|margin|padding|font|color|border|opacity|transform|display|grid|flex|top|left|right|bottom|z-index|scale)\b|\bsfx\(|\bimg\b|\.webp|\bpor-|\bfig/;
const LAYOUTNUM=/px|rem|em\b|vh|vw|%|ms\b|z-?index|opacity|scale|translate|rotate|rgba?\(|#[0-9a-f]{3,8}\b|font|width|height|margin|padding|top|left|right|bottom|gap|radius|blur|shadow|setTimeout|setInterval|duration|delay|quality|dpr/i;
/* strip string literal contents (text edits), then numbers (number edits); comments removed */
const catOf=w=>/BAL|price|cost|odds|chance|random|rnd|sung|danh|duc|bac/.test(w)?'bal':/ser|deser|save|loadSlot|SK|localStorage|migrat|S\.v/.test(w)?'save':/COOP|send|isHost|guest/.test(w)?'coop':/turn|buoi|khac|month|year|week|endTurn|nextBuoi|age/.test(w)?'time':'prog';
const noComment=l=>l.replace(/\/\*.*?\*\//g,'').replace(/(^|[^:\\])\/\/.*$/,'$1').replace(/^\s*(\*|\/\*|#).*$/,'');
const noStr=l=>l.replace(/"(?:[^"\\]|\\.)*"/g,'""').replace(/'(?:[^'\\]|\\.)*'/g,"''").replace(/`(?:[^`\\$]|\\.|\$(?!\{))*`/g,'``');
const noNum=l=>l.replace(/\b\d+(\.\d+)?\b/g,'0');
/* which lines of a file are comment only (block comments and // lines), so a changed comment never counts as code */
function commentMask(text){const L=text.split('\n');const m=new Array(L.length+1).fill(false);let inB=false;
 for(let i=0;i<L.length;i++){let l=L[i],code='';let j=0;
  while(j<l.length){if(inB){const e=l.indexOf('*/',j);if(e<0){j=l.length;break}inB=false;j=e+2;continue}
   const c=l[j];if(c==='"'||c==="'"||c==='`'){const q=c;let k=j+1;while(k<l.length&&l[k]!==q){if(l[k]==='\\')k++;k++}code+=l.slice(j,k+1);j=k+1;continue}
   if(l.startsWith('/*',j)){inB=true;j+=2;continue}if(l.startsWith('//',j)&&!/:$/.test(code))break;code+=c;j++}
  m[i+1]=!code.trim()}return m}
const show=(rev,f)=>{try{return git('show',`${rev}:${f}`)}catch(e){return ''}};
function classifyFile(f,patch,oldRev,newRev){const base=path.basename(f);
 if(GENERATED.test(f))return null;
 for(const [re,why,cat] of BIG_PATH)if(re.test(f))return {tier:'BIG',why,cats:[cat||'prog']};
 for(const [re,why] of SMALL_PATH)if(re.test(f))return {tier:'SMALL',why};
 if(/\.css$/.test(f))return {tier:'SMALL',why:'stylesheet'};
 if(!/^dev\/build\//.test(f))return {tier:'BIG',why:'unknown place (unsure -> BIG)'};
 const bigMod=Object.entries(BIG_MOD).find(([,re])=>re.test(base));const uiMod=UI_MOD.test(base);
 /* changed lines, minus the ones that are comments in their own file version */
 const minus=[],plus=[];const mo=commentMask(show(oldRev,f)),mn=commentMask(show(newRev,f));let lo=0,ln=0;
 for(const l of patch.split('\n')){const h=/^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(l);if(h){lo=+h[1];ln=+h[2];continue}if(/^(\+\+\+|---)/.test(l))continue;
  if(l[0]==='-'){if(!mo[lo])minus.push(l.slice(1));lo++}else if(l[0]==='+'){if(!mn[ln])plus.push(l.slice(1));ln++}}
 const M=minus.map(noComment).filter(x=>x.trim()),P=plus.map(noComment).filter(x=>x.trim());
 if(!M.length&&!P.length)return {tier:'SMALL',why:'comments only'};
 /* each added line is matched with the most similar removed line; only the part that differs (after common prefix/suffix) is judged */
 const used=new Set();const pre=(a,b)=>{let i=0;while(i<a.length&&i<b.length&&a[i]===b[i])i++;return i};
 const mid=(a,b)=>{const p=pre(a,b);const s=pre([...a.slice(p)].reverse().join(''),[...b.slice(p)].reverse().join(''));return [a.slice(p,a.length-s),b.slice(p,b.length-s)]};
 const pairs=[];for(const b of P){let best=-1,bs=0;M.forEach((a,i)=>{if(used.has(i))return;const [x,y]=mid(a,b);const sim=1-(x.length+y.length)/(a.length+b.length);if(sim>bs){bs=sim;best=i}});
  if(best>=0&&bs>=0.5){used.add(best);pairs.push([M[best],b])}else pairs.push(['',b])}
 M.forEach((a,i)=>{if(!used.has(i))pairs.push([a,''])});
 let big=null;const kinds=new Set(),cats=new Set();const cut=x=>x.trim().slice(0,90);
 for(const [a,b] of pairs){
  if(a&&b&&noStr(a)===noStr(b)){const d=x=>(x.match(/\d+/g)||[]).join(',');                /* only words inside strings changed */
   if(d(a)!==d(b)){big=big||('number inside text (one-core rule: numbers come from BAL): '+cut(b));cats.add('bal');continue}kinds.add('text');continue}
  if(a&&b&&noNum(noStr(a))===noNum(noStr(b))){                                    /* only numbers changed */
   if(LAYOUTNUM.test(a+'\n'+b)&&!BIGWORD.test(noStr(a+'\n'+b))){kinds.add('layout numbers');continue}
   big=big||('game number changed: '+cut(b||a));cats.add('bal');continue}
  const [x,y]=a&&b?mid(noStr(a),noStr(b)):[noStr(a),noStr(b)];const code=x+'\n'+y;
  const w=code.match(BIGWORD);if(w){big=big||(`${catOf(w[0])} word "${w[0]}": `+cut(b||a));cats.add(catOf(w[0]));continue}
  if(bigMod){big=big||(bigMod[0]+' module logic: '+cut(b||a));cats.add(bigMod[0]);continue}
  if(uiMod||UIWORD.test(code)){kinds.add('ui code');continue}
  big=big||('logic change (unsure): '+cut(b||a));cats.add('prog')}
 if(big)return {tier:'BIG',why:big,cats:[...cats]};
 return {tier:'SMALL',why:[...kinds].join(' + ')||'ui'}}

/* ---- diff ---- */
let mb;try{mb=git('merge-base',BASE,REF).trim()}catch(e){console.error(`tier: no merge-base between ${BASE} and ${REF} (fetch ${BASE} deeper: git fetch --deepen=200 origin main)`);process.exit(1)}
/* what going live changes: ref contains base (ready to fast-forward) -> base..ref; else only the branch's own side (base...ref) */
let ff=true;try{git('merge-base','--is-ancestor',BASE,REF)}catch(e){ff=false}
const RANGE=ff?[BASE,REF]:[`${BASE}...${REF}`];
const names=git('diff','--name-only',...RANGE).split('\n').filter(Boolean);
const files=[];
for(const f of names){let patch='';try{patch=git('diff','-U0',...RANGE,'--',f)}catch(e){}
 const c=classifyFile(f,patch,ff?BASE:git('merge-base',BASE,REF).trim(),REF);if(c)files.push(Object.assign({file:f},c))}
const tier=files.some(x=>x.tier==='BIG')?'BIG':'SMALL';

/* ---- tests ---- */
const T=(cmd,why)=>({cmd,why});const tests=[];
const tdir=path.join(TOP,'dev/test');const tlist=fs.existsSync(tdir)?fs.readdirSync(tdir).filter(x=>/\.js$/.test(x)):[];
const touched=files.filter(x=>/^dev\/build\/|^dev\/kit\//.test(x.file)).map(x=>path.basename(x.file).replace(/\.(js|html|md)$/,''));
const near=new Set();for(const m of touched){const k=m.replace(/^j/,'');
 for(const t of tlist){const tb=t.replace(/\.js$/,'');if(tb===k||tb.startsWith(k+'-')||(k.length>=4&&tb.includes(k)))near.add(t);
  else{try{const s=fs.readFileSync(path.join(tdir,t),'utf8').slice(0,1500);if(new RegExp(`\\b${m}(\\.js)?\\b`).test(s))near.add(t)}catch(e){}}}}
tests.push(T('bash dev/tools/quickcheck.sh <READY sha>','always: build, open, old-save load, perf smoke (1–3 min)'));
if(tier==='SMALL'){
 [...near].sort().forEach(t=>tests.push(T(`node dev/test/${t}`,'tests the touched part')));
 tests.push(T('node dev/tools/shots.js <outdir>','Fold 755x1000 + iPad 1180x820 shots of title, home and every tab (look at them)'));
 if(files.some(x=>/^dev\/(kit|build)\//.test(x.file)))tests.push(T('node dev/test/kit-conform.js','kit consistency scan (KIT FIRST)'));
}else{
 const has=c=>files.some(x=>(x.cats||[]).includes(c));
 [...near].sort().forEach(t=>tests.push(T(`node dev/test/${t}`,'tests the touched part')));
 tests.push(T('FULL REVIEW (reviewer, as before)','BIG: every suite below on Fold + iPad first'));
 ['game-feel.js (old save, offline, open time)','kit-conform.js','tab-pairs.js','phone-bars.js','perf.js --devices fold,ipadAir'].forEach(t=>tests.push(T('node dev/test/'+t,'full suite')));
 if(has('save'))['save-slots.js','ts-oldsave.js','load-migrate.js','cloud-save.js'].forEach(t=>tests.push(T('node dev/test/'+t,'save / slots')));
 if(has('coop'))['coop-e2e.js','coop-timer.js','coop-world.js'].forEach(t=>tests.push(T('node dev/test/'+t,'co-op')));
 if(has('time'))['khac-day-run.js','buoi-transition.js','night-day.js'].forEach(t=>tests.push(T('node dev/test/'+t,'time / buổi')));
 if(has('gate'))['bash dev/tools/gate-selftest.sh  (rollback dry runs on a scratch clone + perf gate injection)'].forEach(t=>tests.push(T(t,'go-live gate itself')));
 if(has('bal'))['rules-one-source.js','paid-tiers.js','difficulty.js'].forEach(t=>tests.push(T('node dev/test/'+t,'numbers / BAL one-source')));
}
const seen=new Set();const TL=tests.filter(t=>!seen.has(t.cmd)&&seen.add(t.cmd)&&(!/^node dev\/test\/(\S+)/.test(t.cmd)||tlist.includes(t.cmd.match(/^node dev\/test\/(\S+)/)[1])));
const out={ff,ref:REF,sha:git('rev-parse','--short=8',REF).trim(),base:BASE,mergeBase:mb.slice(0,8),tier,files,tests:TL};
if(JSONOUT){console.log(JSON.stringify(out,null,1))}else{
 console.log(`TIER ${tier} · ${REF} ${out.sha} vs ${BASE} · ${files.length} files${ff?'':' · NOTE: does not contain '+BASE+' yet (merge it before going live)'}`);
 for(const x of files.sort((a,b)=>(a.tier>b.tier?1:-1)))console.log(`  ${x.tier.padEnd(5)} ${x.file}  — ${x.why}`);
 console.log(tier==='SMALL'?'Run (SMALL ≈ 15–25 min):':'Run (BIG = full review as before):');TL.forEach(t=>console.log(`  ${t.cmd}    # ${t.why}`))}
process.exit(tier==='BIG'?2:0);
