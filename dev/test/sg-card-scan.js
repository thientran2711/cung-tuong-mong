/* review/sg-card (law 4 shown == applied + law 11 whole family; rv kit-opt-kem / MAIN 92 order):
   HER Sủng printed on an option card must be the Sủng the choice applies. apply() runs every Sủng change of hers through sg()
   (Hoàng thượng nồng nàn ×1.3, lạnh lùng ×.7 on gains); a card whose number was typed as a literal in its x text («thành: Sủng +4»)
   used to show the raw number (j7 «Tự trình lên Hoàng thượng»: card +4, applied +5).
   RUNTIME WALK: every saveable dialog builder PEND[id] (every event / choice dialog of the game: EV events and every pending choice
   that can be saved) × every option × Emperor traits {none, nồng nàn, lạnh lùng, both} × outcome {thành, bại}:
     shown   = her Sủng numbers on the RENDERED card (dilLine → kitParse kit rows; Thành/Được/Mất/Tốn rows for success, Bại row for failure)
     applied = S.sung after the real choice (apply(c.fx); c.go()) with Math.random forced to win / lose, from Sủng 50
   An option is in the SG family when shown == applied with NO trait (its number is right) but differs with a trait (the multiplier
   was not drawn). FAIL on any SG-family row. Options that differ even with no trait are another fault (listed, not this family).
   Also the STATIC family list (every literal «Sủng ±N» text of the build) is printed with --static.
   usage: node dev/test/sg-card-scan.js <url | worktree dir (served from disk via coop-serve, no http server)> [--table] [--static]      exit 1 when any SG-family row is left */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const ARG=process.argv[2]||'.';const LOCAL=!/^https?:/.test(ARG);const URL=LOCAL?'http://ctm.local/':ARG;
/* serve a built worktree from disk inside Playwright (no local http server; the root index.html the site build writes) */
const serveDir=async(ctx,root)=>{const fs=require('fs'),path=require('path');root=path.resolve(root);const M={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.css':'text/css','.svg':'image/svg+xml','.mp3':'audio/mpeg'};
 await ctx.route('http://ctm.local/**',route=>{let q=decodeURIComponent(new (require("url").URL)(route.request().url()).pathname);if(q.endsWith('/'))q+='index.html';const f=path.join(root,q);
  if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return route.fulfill({status:404,body:''});route.fulfill({status:200,contentType:M[path.extname(f)]||'application/octet-stream',body:fs.readFileSync(f)})})};const TABLE=process.argv.includes('--table');
/* r2/r3 STATIC pass, also alone: node dev/test/sg-card-scan.js --static-only (no browser) */
const staticPass=()=>{const fs=require('fs'),path=require('path');const D=path.join(__dirname,'../build');const rows=[];
  const VER=[['jtoil.js','Sủng +1":"Sủng -1','±1: sg(±1) = ±1 for every trait'],['jtoil.js','?`Sủng ${f.aff>0?"+1"','±1 (aff>0) / NPC host'],['jmkt.js','Sủng ${n>0?"+":"-"}${Math.abs(Math.sign(n))}','±1 sign only: sg(±1) = ±1'],
   ['j54.js','Sủng +${V.length}','each child ap(p,{sung:1}) once: sg(1) = 1 → sum = V.length'],['j71.js','Sủng +${V.length}','each child ap(p,{sung:1}) once: sg(1) = 1'],
   ['j68.js','`Sủng ${n>0?"+":""}${n}`','e68 «emp» line: n = the measured/sgStat number of the e68 row (j68 fx6, rv r1)'],['jemoact.js','`Sủng của ${who} ${v}`:`Sủng ${v}`','label formatter: v comes in already drawn (eaN / sgStat)'],
   ['jkitpage.js','','kit sample page (demo cards, kitParse draws them)'],['jstatfx.js','Sủng −3</button>','kit sample button (kitStatFx demo)'],['j87.js','Sủng ${wkeSign(d)}','measured week delta'],
   ['jlost.js','${wdNmC(h)} mang tội lấy trộm: Danh ${LO.thief.danh}, Sủng ${LO.thief.sung}','NPC branch (h !== S)'],['j75.js','mỗi +2: Sủng +1','a ratio rule (Ân tình steps), not a change'],
   ['jgift.js','thành: Sủng +2 đến +4, Ân tình +1, then','comment'],
   ['j54.js','`Sủng mẹ +${g.sung}`','the mother is an NPC (x.p !== S): ap raw'],['j67.js','return `${v.name}: Sủng -${n}.`','NPC (v.sung -= n)'],['j92.js','AOUT.giahoa=["nàng mang tội','NPC act-outcome text (nàng …)'],
   ['jface.js','a===S?"Sủng ngươi":`Sủng ${NM(a)}`','the label of sgOf(a, …) — the number is drawn by sgOf'],['j30.js','ốm 3 tháng (Sủng -4 mỗi tháng','the target (nàng) falls ill: NPC monthly rule']];
  for(const f of fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f)&&f!=='jaudit.js'&&!/^jbal/.test(f))){const src=fs.readFileSync(path.join(D,f),'utf8').replace(/\/\*[\s\S]*?\*\//g,m=>m.replace(/[^\n]/g,' '));
   src.split('\n').forEach((l,i)=>{const re=/Sủng(?: ngươi| ta| mẹ)? (?:[+\-−]\d|[+\-−]?\$\{)/g;let m;while((m=re.exec(l))){const pre=l.slice(Math.max(0,m.index-240),m.index),sn=l.slice(Math.max(0,m.index-60),m.index+40);let k;
    const v=VER.find(([vf,vs])=>vf===f&&(!vs||l.includes(vs)&&sn.includes(vs.slice(0,8))||l.slice(Math.max(0,m.index-80),m.index+80).includes(vs)));
    if(v)k='OK';else if(/(nàng(?: ta)?|của nàng|\$\{(?:v\.name|W|w\.name|NM\([^)]*\)|who|row\.name)\}|\p{Lu}\p{Ll}+)\s*$/u.test(pre.replace(/<[^>]*>/g,'')))k='NPC';
    else if(/^Sủng \$\{(?:S|p|v|k|row|x)\.(?:sung|s)\b|^Sủng \$\{(?:Math\.round\(v\.sung|p\.sung\|0|N\.sung|RANKS|BAL\.st14|F14G|S\.sung)/.test(l.slice(m.index))||/cần Sủng|Sủng \$\{[^}]*\}\/\$\{|Sủng \$\{[^}]*\} →/.test(l.slice(m.index,m.index+40)))k='VALUE';
    else if(/(?:\b(?:x|lx|duoc|mat|kem|need|gain|loss|use|u)\s*:\s*\[?\s*[`"]|R6\(|G6\(|kitParse\(|\bx=`|aoLz\(|rtX\(|get x\(\)\{return `|return `\$\{w\} · thành|const risk=`|r\.x=\(r\.x\|\|""\)\+`|pbtn\()[^]*$/.test(pre)&&!/(?:log\(|Q\.push\(|txt:`|L\.push\(`)[^]*$/.test(pre.slice(pre.search(/(?:\b(?:x|lx|duoc|mat|kem|need|gain|loss)\s*:\s*\[?\s*[`"]|R6\(|G6\(|kitParse\(|\bx=`|aoLz\(|rtX\(|pbtn\()[^]*$/)>=0?pre.search(/(?:\b(?:x|lx|duoc|mat|kem|need|gain|loss)\s*:\s*\[?\s*[`"]|R6\(|G6\(|kitParse\(|\bx=`|aoLz\(|rtX\(|pbtn\()[^]*$/):0)))k=/^Sủng(?: ngươi| ta| mẹ)? [+\-−]\d/.test(l.slice(m.index))?'TYPED':'CARD';else k='CHECK';
    rows.push({k,at:`${f}:${i+1}`,t:sn.replace(/\s+/g,' '),why:v&&v[2]})}
    const rg=/Sủng [+\-−]?\$\{[^}]*\}\s*(?:đến|\.\.|–)\s*[+\-−]?\$\{/.exec(l);if(rg)rows.push({k:'RANGE',at:`${f}:${i+1}`,t:rg[0]})})}
  return rows};
/* law4-typed (21/11): Danh / Tài / Tâm cơ / Thế lực typed at the jaudit death line, j34 contest and AOUT spy/ksab/pond — part of the static pass */
const law4Pass=()=>{const R=require('./law4-typed.js').law4Typed();R.forEach(r=>console.log('LAW4 ',r.at,'«'+r.t+'»'));console.log(`static law4-typed: ${R.length} typed`);return R};
if(process.argv.includes('--static-only')){const ST=staticPass();const L4=law4Pass();const c={};ST.forEach(x=>c[x.k]=(c[x.k]||0)+1);const bad=ST.filter(x=>['CHECK','RANGE','TYPED'].includes(x.k));bad.forEach(x=>console.log(x.k.padEnd(5),x.at,x.t));console.log('static raw «Sủng ±» sites: '+Object.entries(c).map(([k,v])=>`${k} ${v}`).join(' · '));const nb=bad.length+L4.length;console.log(nb?'FAIL '+nb:'PASS');process.exit(nb?1:0)}
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});if(LOCAL)await serveDir(ctx,ARG);const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));await p.goto(URL,{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof PEND==='object'&&typeof kitParse==='function',null,{timeout:240000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}});await p.waitForTimeout(800);
 const r=await p.evaluate(async()=>{
  const T=[[],['nongnay'],['lanhlung'],['nongnay','lanhlung']];
  /* her Sủng in a row text: the same reading as the card law — «nàng / nàng ta / hắn / <Tên> Sủng», «của nàng», «nàng mất» are someone else's */
  const herS=t=>{let s=0,f=false;String(t||"").replace(/(^|[^\p{L}])(Sủng(?: ngươi| ta)?)[  ]([+\-−])(\d+)(?!\s*(?:\.\.|–|mỗi|\/))/gu,(m,pp,l,g,n,off,all)=>{const pre=all.slice(Math.max(0,off-40),off+pp.length);
    if(/nàng(?: ta)? mất|của nàng|nàng ta\s*$|đứng đầu \($/.test(pre))return m;/* «<Tên> dâng … đứng đầu (Sủng +N…)» = the winner's (j71 sgOf) */const w=pre.match(/(\p{L}+)\s*$/u);if(w&&(/^(nàng|hắn|y|thị)$/.test(w[1])||/^\p{Lu}/u.test(w[1])))return m;
    f=true;s+=(g==="+"?1:-1)*+n;return m});return f?s:null};
  const card=c=>{const d=document.createElement('div');d.innerHTML=dilLine(c);const R={};d.querySelectorAll('.kr').forEach(x=>{const k=(x.className.match(/kr-(\w+)/)||[])[1];const v=x.querySelector('.krv');R[k]=(R[k]?R[k]+' · ':'')+(v?v.textContent:'')});return R};
  const sum=(R,ks)=>{let s=0,f=false;for(const k of ks){const v=herS(R[k]);if(v!=null){s+=v;f=true}}return f?s:null};
  /* the ONE rewrite (j1 sgTxt) by hand, Hoàng thượng nồng nàn: her literal is scaled once; fmt / a second pass never scale again; someone else's Sủng stays raw */
  const unit=[];{const k=S.emp.traits.slice();try{S.emp.traits=['nongnay'];const P=h=>kaPlainU(h);const kaPlainU=h=>String(h).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
   const C=[['thành: Sủng +4','thành: Sủng +5'],['hỏng: Sủng -8','hỏng: Sủng -10'],['thành: nàng Sủng -3','thành: nàng Sủng -3'],['thành: nàng ta Sủng +3','thành: nàng ta Sủng +3'],['Lý Tần Sủng +3 · Hoàng thượng nghi ngươi','Lý Tần Sủng +3 · Hoàng thượng nghi ngươi'],['đêm vui, Sủng +3','đêm vui, Sủng +4'],['ngài lơ đãng: chỉ Sủng +1','ngài lơ đãng: chỉ Sủng +1']];
   for(const [a,w] of C){const g=P(sgTxt(a));if(g!==w)unit.push(`sgTxt «${a}» → «${g}», want «${w}»`);if(sgTxt(sgTxt(a))!==sgTxt(a))unit.push(`sgTxt twice scales again: «${a}»`)}
   const f4=fmt({sung:4});if(sgTxt(f4)!==f4)unit.push('fmt Sủng scaled twice by sgTxt: '+P(sgTxt(f4)));if(!/\+5/.test(P(f4)))unit.push('fmt({sung:4}) not +5: '+P(f4));
   const kp=P(kitParse('Khá chắc · thành: Sủng +4 · hỏng: Sủng -8'));if(!/Sủng \+5/.test(kp)||!/Sủng -10/.test(kp))unit.push('kit card does not draw the applied Sủng: '+kp);
   const kp2=P(kitParse('Khá chắc · thành: '+fmt({sung:4})));if(!/Sủng \+5/.test(kp2))unit.push('kit card of a fmt Sủng: '+kp2);
   /* r2: RANGES scale both ends (nồng nàn 2..4 → 3..5; lạnh lùng 2..4 → 1..3), «..» / «–» too; helpers sgRange / sgOf / sgFix / sgRule */
   const RC=[[['nongnay'],'thành: Sủng +2 đến +4','thành: Sủng +3 đến +5'],[['lanhlung'],'thành: Sủng +2 đến +4','thành: Sủng +1 đến +3'],[['nongnay'],'Sủng +2..+4','Sủng +3..+5'],
    [['nongnay'],'hỏng: Sủng -2 – -4','hỏng: Sủng -3 – -5'],[['nongnay'],'nàng Sủng +2 đến +4','nàng Sủng +2 đến +4']];
   for(const [tr,a,w] of RC){S.emp.traits=tr;const g=P(sgTxt(a));if(g!==w)unit.push(`range ${tr} «${a}» → «${g}», want «${w}»`);if(sgTxt(sgTxt(a))!==sgTxt(a))unit.push(`range scaled twice: «${a}»`)}
   S.emp.traits=['nongnay'];const kr=P(kitParse('Khá chắc · thành: Sủng +2 đến +4'));if(!/Sủng \+3 đến \+5/.test(kr))unit.push('kit card range half-scaled: '+kr);
   if(P(sgRange(2,4))!=='Sủng +3 đến +5')unit.push('sgRange(2,4) nồng nàn: '+P(sgRange(2,4)));if(sgTxt(sgRange(2,4))!==sgRange(2,4))unit.push('sgRange rescaled by sgTxt');
   const v0=rivals[0];if(v0&&P(sgOf(v0,4))!=='Sủng +4')unit.push('sgOf(NPC) scaled: '+P(sgOf(v0,4)));if(P(sgOf(S,4))!=='Sủng +5')unit.push('sgOf(her) not scaled: '+P(sgOf(S,4)));
   if(sgTxt(sgFix(2))!==sgFix(2)||P(sgFix(2))!=='Sủng +2')unit.push('sgFix (applied as is) rescaled: '+P(sgTxt(sgFix(2))));
   if(P(sgRule('x {sg:deck.cam.w.sung} y'))!==`x Sủng +${sg(BAL.deck.cam.w.sung)} y`)unit.push('sgRule deck token: '+P(sgRule('x {sg:deck.cam.w.sung} y')));
   if(P(sgRule('{sgRaw:tho.sung5} (thay {n:tho.sung})'))!==`Sủng +${BAL.tho.sung5} (thay +${BAL.tho.sung})`)unit.push('sgRule raw token: '+P(sgRule('{sgRaw:tho.sung5} (thay {n:tho.sung})')));
   /* folded from review/kit-opt-sg (kit keeper, dev/test/kit-opt-sg.js): optLine + dilLine on synthetic options × traits — her literal x Sủng
      scaled ONCE (no 2nd rewrite: 4 → 5, never 7), fmt(w)/fmt(fx) Sủng scaled once, someone else's («nàng Sủng -5», «Hoàn Bích Sủng -15») raw,
      o.x left as written; then the real j7 «Tự trình lên Hoàng thượng» line: card == apply() */
   for(const tr of [[],['nongnay'],['lanhlung']]){S.emp.traits=tr;const want=v=>(sg(v)>0?'+':'-')+Math.abs(sg(v));
    const a={n:'Thử',x:'Khá chắc · thành: Sủng +4 · hỏng: Sủng -3 · kèm: nàng Sủng -5, Hoàn Bích Sủng -15',w:{sung:2}},c={n:'Thử',x:'Khó · thành: Danh +2, Sủng +3',fx:{sung:-2}};
    const t1=P(optLine(a)),t2=P(kitParse(dilLine(c)));
    if(!(t1.includes('Sủng '+want(4))&&t1.includes('Sủng '+want(-3))&&t1.includes('nàng Sủng -5')&&t1.includes('Hoàn Bích Sủng -15')&&t1.includes('Sủng '+want(2))&&a.x.includes('Sủng +4')))unit.push(`optLine ${tr} «${t1.slice(0,170)}»`);
    if(!(t2.includes('Sủng '+want(3))&&t2.includes('Sủng '+want(-2))&&c.x.includes('Sủng +3')))unit.push(`dilLine ${tr} «${t2.slice(0,140)}»`);
    const v=BAL.eff.j7.sungGo,s0=S.sung;const sh=+(/thành: Sủng ([+\-]\d+)/.exec(P(optLine({n:'Tự trình lên Hoàng thượng',x:`Khá chắc · thành: Sủng ${balSg(v)} · hỏng: Sủng ${balSg(BAL.eff.j7.sungGo_2)}`,fx:{danh:-3}})))||[])[1];
    S.sung=50;apply({sung:v});const ap1=S.sung-50;S.sung=s0;if(sh!==ap1)unit.push(`real j7 ${tr}: card ${sh}, applied ${ap1}`)}
   }catch(e){unit.push('unit threw (helper missing in this build?): '+e.message)}
   S.emp.traits=k}
  const S0=structuredClone(S),RV0=structuredClone(rivals),rnd=Math.random,q0=quiet,lg=console.error;const out=[],unb=[];let ids=Object.keys(PEND),built=0;
  const fresh=()=>{S=structuredClone(S0);rivals.length=0;structuredClone(RV0).forEach(x=>rivals.push(x));Q.length=0;quiet=true};
  const mk=(id,pp)=>{try{const d=PEND[id](pp);return d&&Array.isArray(d.o)?d:null}catch(e){return null}};
  /* the dialog's own context (EV pre-check) when it can be met now; else a stand-in context (a live rival, a middling odds, a servant) so the
     builder still draws its options — the scan reads the options' own lines and handlers, not the event's trigger */
  const ppOf=id=>{const e=typeof EVI==='object'&&EVI[id];if(e&&e.pp){for(let i=0;i<8;i++){try{const x=e.pp();if(x)return x}catch(er){}}}
   const v=(rivals.find(x=>!x.dead&&!x.out)||rivals[0]||{}).id,st=(S.staff||[])[0];return {v,o:50,y:'',sid:st&&st.sid,id:v,who:v,k:0,n:1}};
  console.error=()=>{};
  try{for(const id of ids){fresh();Math.random=rnd;const pp=ppOf(id);const PP=JSON.stringify(pp);let d=mk(id,JSON.parse(PP));if(!d){if(/Sủng/.test(String(PEND[id])))unb.push(id);continue}built++;
   for(let i=0;i<d.o.length;i++){const row={id,n:String(d.o[i].n||'').replace(/<[^>]+>/g,'').slice(0,40),t:{}};let any=false;
    for(const tr of T){fresh();S.emp.traits=tr.slice();const dd=mk(id,JSON.parse(PP));const c=dd&&dd.o[i];if(!c)continue;let R;try{R=card(c)}catch(e){continue}
     const shT=sum(R,['thanh','duoc','mat','ton','ngay']),shB=R.bai!=null?sum(R,['bai','ton','ngay']):null;if(shT==null&&shB==null)continue;any=true;
     const res={};for(const [o,rv,sh] of [['T',0,shT],['B',.99999,shB]]){if(o==='B'&&R.bai==null)continue;fresh();S.emp.traits=tr.slice();const d2=mk(id,JSON.parse(PP));const c2=d2&&d2.o[i];if(!c2)continue;
      S.sung=50;Math.random=()=>rv;let got,lg=null,goD=0;try{if(c2.cap!=null){}apply(c2.fx||{});const s1=S.sung,q0=Q.length,l0=S.logSeq||0;if(c2.go)c2.go();await new Promise(z=>setTimeout(z,0));got=S.sung-50;goD=S.sung-s1;
       /* r2 result / log pass: her Sủng printed by the lines this choice wrote (Sổ ghi + result cards) == the measured change */
       const nl=Math.min(150,(S.logSeq||0)-l0),T2=S.logs.slice(0,nl).concat(Q.slice(q0).map(q=>(q&&(q.h||''))+' '+(q&&q.past||''))).map(x=>String(x).replace(/<[^>]+>/g,' ')).join(' · ');lg=herS(T2)}catch(e){got='err'}Math.random=rnd;
      res[o]={sh:sh==null?0:sh,got,lg,goD}}
     row.t[tr.join('+')||'-']=res}
    if(any)out.push(row)}}}finally{console.error=lg;Math.random=rnd;fresh();quiet=q0;S=S0}
  /* r2 DIRECT pass: result functions that are not a dialog option (their own log / result card) × traits: printed == measured */
  /* kmEmpAct: open its day / time / weather gate (a fresh game has none of it) so the act itself runs, thành and hỏng */
  const KMO=f=>{const w=kmEmpWhy;kmEmpWhy=()=>'';S.suc=100;try{return f()}finally{kmEmpWhy=w}};
  const direct=[];const DF=[['empTeaCard',()=>{const r=empTeaCard();return r&&r.h}],['nightFx',()=>{nightFx(2)}],['kmEmpAct ky',()=>KMO(()=>{S.arts.ky=4;const r=kmEmpAct(S,'ky');return r&&r.txt})],['kmEmpAct ky hỏng',()=>KMO(()=>{S.arts.ky=4;Math.random=()=>.99999;const r=kmEmpAct(S,'ky');return r&&r.txt})],
   ['kmEmpAct walk',()=>KMO(()=>{const r=kmEmpAct(S,'walk');return r&&r.txt})],['visAfter',()=>{const r=visAfter();return Array.isArray(r)?r.join(' '):r}],['festival',()=>festival('Hội',"tai","Tài")],['festival (she wins)',()=>{const t0=S.tai,a0=Object.assign({},S.arts);S.tai=999;for(const k in S.arts)S.arts[k]=9;window.__j71off=1;/* the base j8 contest (j71 needs her signed up) */try{return festival('Hội',"tai","Tài")}finally{window.__j71off=0;S.tai=t0;Object.assign(S.arts,a0)}}]];
  for(const [nm,f] of DF){if(typeof window[nm.split(' ')[0]]!=='function'){direct.push({ok:true,t:`${nm}: not in this build`});continue}const per=[];let bad=0;
   for(const tr of T){fresh();S.emp.traits=tr.slice();S.sung=50;Math.random=()=>0;const l0=S.logSeq||0,q0=Q.length;let ret='';try{ret=f()||''}catch(e){ret='err '+e.message}Math.random=rnd;
    const d=S.sung-50,nl=Math.min(150,(S.logSeq||0)-l0),txt=[String(ret)].concat(S.logs.slice(0,nl),Q.slice(q0).map(q=>q&&q.h||'')).map(x=>String(x).replace(/<[^>]+>/g,' ')).join(' · ');
    const shown=herS(txt);per.push(`${tr.join('+')||'-'} ${shown}/${d}`);if(shown!=null&&shown!==d)bad++}
   direct.push({ok:!bad,t:`${nm}: printed/applied ${per.join(' · ')}${bad?' ← MISMATCH':''}`})}
  fresh();S=S0;
  return {out,built,ids:ids.length,unb,unit,direct}});
 /* classify */
 const fam=[],other=[],ok=[];for(const row of r.out){const base=row.t['-']||{};const baseOk=Object.values(base).every(x=>x.got!=='err'&&x.sh===x.got);
  const bad=Object.entries(row.t).filter(([k])=>k!=='-').flatMap(([k,v])=>Object.entries(v).filter(([o,x])=>x.got!=='err'&&x.sh!==x.got).map(([o,x])=>`${k} ${o==='T'?'thành':'bại'} shown ${x.sh} applied ${x.got}`));
  const fmtR=Object.entries(row.t).map(([k,v])=>`${k}: `+Object.entries(v).map(([o,x])=>`${o==='T'?'thành':'bại'} ${x.sh}/${x.got}`).join(', ')).join(' | ');
  if(!baseOk)other.push(`${row.id} «${row.n}» ${fmtR}`);else if(bad.length)fam.push(`${row.id} «${row.n}» ${bad.join('; ')}`);else ok.push(`${row.id} «${row.n}» ${fmtR}`)}
 /* r2: result/log lines — a line that prints her Sủng must print the measured change (the go() part or the whole choice) */
 const lgFam=[],lgOther=[];let lgRows=0;for(const row of r.out){let any=false;const bad=[],base=[];for(const [k,v] of Object.entries(row.t))for(const [o,x] of Object.entries(v)){if(x.lg==null||x.got==='err')continue;any=true;
   if(x.lg!==x.got&&x.lg!==x.goD)(k==='-'?base:bad).push(`${k} ${o==='T'?'thành':'bại'} log ${x.lg} applied ${x.goD}`)}
  if(any)lgRows++;if(base.length)lgOther.push(`${row.id} «${row.n}» ${base.concat(bad).join('; ')}`);else if(bad.length)lgFam.push(`${row.id} «${row.n}» ${bad.join('; ')}`)}
 console.log(`result/log lines with her Sủng after a choice: ${lgRows} · SG family (log ≠ applied only with a trait) ${lgFam.length} · other ${lgOther.length}`);
 lgFam.forEach(x=>console.log('LOG ',x));if(TABLE)lgOther.forEach(x=>console.log('LOTH',x));fam.push(...lgFam);
 r.direct.forEach(x=>console.log(x.ok?'DIR ':'DIRX',x.t));fam.push(...r.direct.filter(x=>!x.ok).map(x=>x.t));
 console.log(`dialogs built ${r.built}/${r.ids} · options with her Sủng on the card ${r.out.length} · shown==applied for every trait ${ok.length} · SG family (shown≠applied only with a trait) ${fam.length} · other (≠ even with no trait) ${other.length}`);
 if(TABLE){console.log('--- OK (shown/applied per trait)');ok.forEach(x=>console.log('OK  ',x));console.log('--- OTHER (not the sg family)');other.forEach(x=>console.log('OTH ',x))}
 fam.forEach(x=>console.log('SG  ',x));r.unit.forEach(x=>console.log('UNIT',x));console.log(`sgTxt unit cases: ${r.unit.length?'FAIL '+r.unit.length:'all pass'}`);if(r.unit.length)fam.push(...r.unit);
 if(r.unb.length)console.log(`not drawn (builder needs a live situation) yet names Sủng in its code: ${r.unb.length} — ${r.unb.join(', ')}`);
 /* r2 STATIC pass (law 11, whole family): every raw «Sủng ±N» text left in dev/build/j*.js (comments stripped; sgStat / sgOf / sgRange /
    sgFix / sgRule print the applied number and do not write «Sủng ±» in the source) is one of:
    NPC   someone else's Sủng (nàng / <name> / ${W} / ${NM(…)} before it) — applied raw (ap), printed raw;
    VALUE a level or threshold, not a change (Sủng ${p.sung}, cần Sủng ${N.sung});
    CARD  an option / card line (x / lx / duoc / mat / kem / R6 / kitParse …) — drawn through kitParse → sgTxt (walk above = 0 SG rows);
    OK    hand-verified (VERIFIED list: ±1 steps sg can't change, a measured delta, a sample page);
    TYPED a CARD line whose Sủng is a typed digit (law 4 one core: «Sủng -8» → BAL key + sgStat / balSg) → FAIL (r3, MAIN 92 whole family);
    anything else = CHECK → FAIL. Plus: no «Sủng ±A ..|đến|– ±B» range built from a template (must be sgRange). */
 const ST=staticPass();law4Pass().forEach(r=>fam.push(r.at));
 const stc={};ST.forEach(x=>stc[x.k]=(stc[x.k]||0)+1);console.log('static raw «Sủng ±» sites: '+Object.entries(stc).map(([k,v])=>`${k} ${v}`).join(' · '));
 ST.filter(x=>x.k==='CHECK'||x.k==='RANGE'||x.k==='TYPED').forEach(x=>{console.log(x.k.padEnd(5),x.at,x.t);fam.push(x.at)});if(TABLE)ST.filter(x=>x.k==='OK').forEach(x=>console.log('OK   ',x.at,x.why));
 if(process.argv.includes('--static')){const fs=require('fs'),path=require('path');const D=path.join(__dirname,'../build');let n=0;for(const f of fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f))){fs.readFileSync(path.join(D,f),'utf8').split('\n').forEach((l,i)=>{const m=l.match(/Sủng(?: ngươi| ta)? (?:[+\-−]|\$\{)/g);if(m){n+=m.length}})}console.log('static: literal «Sủng ±» texts in dev/build/j*.js: '+n)}
 if(errs.length)console.log('page errors (not fatal for the scan): '+[...new Set(errs)].slice(0,5).join(' | '));
 console.log(fam.length?`FAIL ${fam.length} option(s) show a Sủng that is not the applied one`:'PASS');await b.close();process.exit(fam.length?1:0)})();
