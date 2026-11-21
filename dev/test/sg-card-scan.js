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
   usage: node dev/test/sg-card-scan.js <url> [--table] [--static]      exit 1 when any SG-family row is left */
const {chromium}=require('playwright');const URL=process.argv[2];const TABLE=process.argv.includes('--table');
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));await p.goto(URL,{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof PEND==='object'&&typeof kitParse==='function',null,{timeout:240000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}});await p.waitForTimeout(800);
 const r=await p.evaluate(async()=>{
  const T=[[],['nongnay'],['lanhlung'],['nongnay','lanhlung']];
  /* her Sủng in a row text: the same reading as the card law — «nàng / nàng ta / hắn / <Tên> Sủng», «của nàng», «nàng mất» are someone else's */
  const herS=t=>{let s=0,f=false;String(t||"").replace(/(^|[^\p{L}])(Sủng(?: ngươi| ta)?)[  ]([+\-−])(\d+)(?!\s*(?:\.\.|–|mỗi|\/))/gu,(m,pp,l,g,n,off,all)=>{const pre=all.slice(Math.max(0,off-40),off+pp.length);
    if(/nàng(?: ta)? mất|của nàng|nàng ta\s*$/.test(pre))return m;const w=pre.match(/(\p{L}+)\s*$/u);if(w&&(/^(nàng|hắn|y|thị)$/.test(w[1])||/^\p{Lu}/u.test(w[1])))return m;
    f=true;s+=(g==="+"?1:-1)*+n;return m});return f?s:null};
  const card=c=>{const d=document.createElement('div');d.innerHTML=dilLine(c);const R={};d.querySelectorAll('.kr').forEach(x=>{const k=(x.className.match(/kr-(\w+)/)||[])[1];const v=x.querySelector('.krv');R[k]=(R[k]?R[k]+' · ':'')+(v?v.textContent:'')});return R};
  const sum=(R,ks)=>{let s=0,f=false;for(const k of ks){const v=herS(R[k]);if(v!=null){s+=v;f=true}}return f?s:null};
  /* the ONE rewrite (j1 sgTxt) by hand, Hoàng thượng nồng nàn: her literal is scaled once; fmt / a second pass never scale again; someone else's Sủng stays raw */
  const unit=[];{const k=S.emp.traits.slice();S.emp.traits=['nongnay'];const P=h=>kaPlainU(h);const kaPlainU=h=>String(h).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
   const C=[['thành: Sủng +4','thành: Sủng +5'],['hỏng: Sủng -8','hỏng: Sủng -10'],['thành: nàng Sủng -3','thành: nàng Sủng -3'],['thành: nàng ta Sủng +3','thành: nàng ta Sủng +3'],['Lý Tần Sủng +3 · Hoàng thượng nghi ngươi','Lý Tần Sủng +3 · Hoàng thượng nghi ngươi'],['đêm vui, Sủng +3','đêm vui, Sủng +4'],['ngài lơ đãng: chỉ Sủng +1','ngài lơ đãng: chỉ Sủng +1']];
   for(const [a,w] of C){const g=P(sgTxt(a));if(g!==w)unit.push(`sgTxt «${a}» → «${g}», want «${w}»`);if(sgTxt(sgTxt(a))!==sgTxt(a))unit.push(`sgTxt twice scales again: «${a}»`)}
   const f4=fmt({sung:4});if(sgTxt(f4)!==f4)unit.push('fmt Sủng scaled twice by sgTxt: '+P(sgTxt(f4)));if(!/\+5/.test(P(f4)))unit.push('fmt({sung:4}) not +5: '+P(f4));
   const kp=P(kitParse('Khá chắc · thành: Sủng +4 · hỏng: Sủng -8'));if(!/Sủng \+5/.test(kp)||!/Sủng -10/.test(kp))unit.push('kit card does not draw the applied Sủng: '+kp);
   const kp2=P(kitParse('Khá chắc · thành: '+fmt({sung:4})));if(!/Sủng \+5/.test(kp2))unit.push('kit card of a fmt Sủng: '+kp2);
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
      S.sung=50;Math.random=()=>rv;let got;try{if(c2.cap!=null){}apply(c2.fx||{});if(c2.go)c2.go();await new Promise(z=>setTimeout(z,0));got=S.sung-50}catch(e){got='err'}Math.random=rnd;
      res[o]={sh:sh==null?0:sh,got}}
     row.t[tr.join('+')||'-']=res}
    if(any)out.push(row)}}}finally{console.error=lg;Math.random=rnd;fresh();quiet=q0;S=S0}
  return {out,built,ids:ids.length,unb,unit}});
 /* classify */
 const fam=[],other=[],ok=[];for(const row of r.out){const base=row.t['-']||{};const baseOk=Object.values(base).every(x=>x.got!=='err'&&x.sh===x.got);
  const bad=Object.entries(row.t).filter(([k])=>k!=='-').flatMap(([k,v])=>Object.entries(v).filter(([o,x])=>x.got!=='err'&&x.sh!==x.got).map(([o,x])=>`${k} ${o==='T'?'thành':'bại'} shown ${x.sh} applied ${x.got}`));
  const fmtR=Object.entries(row.t).map(([k,v])=>`${k}: `+Object.entries(v).map(([o,x])=>`${o==='T'?'thành':'bại'} ${x.sh}/${x.got}`).join(', ')).join(' | ');
  if(!baseOk)other.push(`${row.id} «${row.n}» ${fmtR}`);else if(bad.length)fam.push(`${row.id} «${row.n}» ${bad.join('; ')}`);else ok.push(`${row.id} «${row.n}» ${fmtR}`)}
 console.log(`dialogs built ${r.built}/${r.ids} · options with her Sủng on the card ${r.out.length} · shown==applied for every trait ${ok.length} · SG family (shown≠applied only with a trait) ${fam.length} · other (≠ even with no trait) ${other.length}`);
 if(TABLE){console.log('--- OK (shown/applied per trait)');ok.forEach(x=>console.log('OK  ',x));console.log('--- OTHER (not the sg family)');other.forEach(x=>console.log('OTH ',x))}
 fam.forEach(x=>console.log('SG  ',x));r.unit.forEach(x=>console.log('UNIT',x));console.log(`sgTxt unit cases: ${r.unit.length?'FAIL '+r.unit.length:'all pass'}`);if(r.unit.length)fam.push(...r.unit);
 if(r.unb.length)console.log(`not drawn (builder needs a live situation) yet names Sủng in its code: ${r.unb.length} — ${r.unb.join(', ')}`);
 if(process.argv.includes('--static')){const fs=require('fs'),path=require('path');const D=path.join(__dirname,'../build');let n=0;for(const f of fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f))){fs.readFileSync(path.join(D,f),'utf8').split('\n').forEach((l,i)=>{const m=l.match(/Sủng(?: ngươi| ta)? (?:[+\-−]|\$\{)/g);if(m){n+=m.length}})}console.log('static: literal «Sủng ±» texts in dev/build/j*.js: '+n)}
 if(errs.length)console.log('page errors (not fatal for the scan): '+[...new Set(errs)].slice(0,5).join(' | '));
 console.log(fam.length?`FAIL ${fam.length} option(s) show a Sủng that is not the applied one`:'PASS');await b.close();process.exit(fam.length?1:0)})();
