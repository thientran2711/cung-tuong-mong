/* DOOR-ROW-HINT (law 3, E-GAIN3b-FIX 27/11): every row of every door dialog (jdoor PEND.door, pop-up {i,k} and card {r,k} modes) shows a hint
   that is EITHER the base hint (the kit hint of the row's own line, = what the row showed before E-GAIN3b: kitHint({n,x})) OR one that names a
   REAL gain (its first part lists a stat with + marks the way does not pay for, or a harm to the target «… nàng …»). A need text («cần …»),
   a tip («có … thì …») or a stat she PAYS shown as a gain = FAIL. A hint that only cleans the base (same gain pieces, kit heads no longer glued) passes.
   Reuses the act-audit state + surfaces (dev/test/act-audit.js LIB). No rolls are made.
   usage: node dev/test/door-row-hint.js <url> [out.json] [WxH@dpr] [scenarios]  → exit 1 on any bad row.
   Mutant: MUTANT=1 → DOOR.rowHint = the 78c8608a rule (raw way first) → must exit 1. MUTANT=hg / tgt / reg (E-GAIN3-LIVE) → DOOR.hintGain
   always true / DOOR.TGT always false / DOOR.REG back to «quý ngươi / tin ngươi» only → the fixed SELF cases fail → must exit 1. */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const [,,URL,OUT,SZ,SC]=process.argv;const [WH,DPR]=(SZ||'755x1000@1').split('@');const [W,H]=WH.split('x').map(Number);
const src=fs.readFileSync(__dirname+'/act-audit.js','utf8');const LIB=src.slice(src.indexOf('String.raw`')+11,src.indexOf('})();`;')+5);
const PROBE=String.raw`
window.DRH={};
DRH.STAT=/^(Sủng|Danh|Đức|Bạc|Sức|Tâm cơ|Tai mắt|Chứng cứ|Sắc|Tài|Ân tình|Văn|Võ|Cầm|Kỳ|Thư|Họa|Hồi môn|Gia thanh|Thái hậu|Hoàng hậu|Hoàng thượng|Bề trên|Phi tần)\b/;
/* E-GAIN3-LIVE: her regard / trust for someone, every pronoun form (own copy: the test does not trust the code under test) */
DRH.REG=/(?:quý|tin|thương|nể|mến|kính)\s+(?:ngươi|ta|bổn cung|nàng)(?![\p{L}\d])|thiện cảm|quý nhau/u;
DRH.CK={"Sủng":"sung","Danh":"danh","Đức":"duc","Bạc":"bac","Sức":"suc","Tâm cơ":"tamco"};
DRH.real=(h,c)=>{const g=String(h||"").split("; ")[0];if(!g||/^(chẳng được gì|không được mất gì)/.test(g))return false;
 return g.split(/,\s+/).some(p=>{p=p.trim();if(/^cần\b|^có .* thì\b|\bthì khỏi\b/.test(p))return false;
  const m=p.match(/^(.+?)\s(\+{1,3})$/);if(m&&DRH.STAT.test(m[1])&&!/\snàng\b/.test(m[1])){const k=DRH.CK[m[1]];return !(k&&c&&(c[k]||0)<0)}/* a stat she pays is no gain */
  return /(^|\s)nàng(\s|$)/.test(p)&&!DRH.REG.test(p)&&!/oán|ghen|thù|nghi|nắm|biết|đoán|khai/.test(p)&&/(−|mất|trúng|ngã|bị|giảm|quở|phạt|quỳ|bẽ)/.test(p)})};
/* the same gain, written cleaner: every piece of the hint's gain part sits inside the base gain part (a base that glued kit heads) and nothing is lost */
DRH.same=(f,b)=>{const NO=/^(chẳng được gì|không được mất gì)/;const g=String(f||"").split("; ")[0],bg=String(b||"").split("; ")[0];if(!g||NO.test(g))return !bg||NO.test(bg);return g.split(/,\s+/).every(p=>bg.includes(p.trim()))};
DRH.rows=(pp,sc,sf,who)=>{const out=[];let m=null;try{m=PEND.door(pp)}catch(e){out.push({err:String(e).slice(0,120)});return out}if(!m||!m.o)return out;
 for(const o of m.o){if(!o.go&&o.n==="Thôi")continue;for(const lv of [0,1,2]){let fin="",base="";try{fin=kitHint(o,null,lv).hint}catch(e){fin="ERR "+e}
  try{base=kitHint({n:o.n,x:o.x},null,lv).hint}catch(e){base="ERR"}
  const ok=fin===base||DRH.real(fin,o.__c)||DRH.same(fin,base);out.push({sc,sf,who,door:pp.k,mode:pp.r!=null?"card":"pop",row:o.n,lv,base,fin,ok,off:!!o.off})}}return out};
DRH.run=(sc)=>{const SF=AA.surfaces();const L=[];
 for(const sf of SF){if(!sf.place)continue;AA.restore();AA.show(sf);const n=S.visit&&S.visit.people?S.visit.people.length:0;
  for(let i=0;i<n;i++){AA.restore();AA.show(sf);const P=S.visit&&S.visit.people;if(!P||!P[i])continue;const who=P[i].kind+":"+(P[i].name||"");
   for(const r of DOOR.T){if(!r.acts)continue;L.push(...DRH.rows({i,k:r.k},sc,sf.id,who))}}}
 AA.restore();try{(rivals||[]).forEach((v,ri)=>{if(!v||v.dead)return;for(const r of DOOR.T){if(!r.acts)continue;L.push(...DRH.rows({r:ri,k:r.k},sc,"card",v.name))}})}catch(e){L.push({err:String(e).slice(0,120)})}
 AA.restore();return L};`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(0);const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(LIB);await p.evaluate(PROBE);
 if(process.env.MUTANT==="1")await p.evaluate(()=>{if(!DOOR.rowHint)throw new Error("no DOOR.rowHint");DOOR.rowHint=(a,x,lv)=>{const NO=/^(chẳng được gì|không được mất gì)/;let h1="",h2="";try{h1=kitHint(a,null,lv).hint}catch(e){}if(h1&&!NO.test(h1))return h1;try{h2=kitHint({x,o:a.o,c:a.c},null,lv).hint}catch(e){}return h2&&!NO.test(h2)?h2:h1}});
 /* E-GAIN3-LIVE (reviewer note: mutants on DOOR.hintGain / DOOR.TGT exited 0 = defence code never reached): fixed cases that reach both, and the
    regard / trust family of every pronoun form (doorGain must not take «nàng quý ta −−» as Được). Each failed case is a bad row. */
 if(process.env.MUTANT==="hg")await p.evaluate(()=>{DOOR.hintGain=h=>!!h});
 if(process.env.MUTANT==="tgt")await p.evaluate(()=>{DOOR.TGT=()=>false});
 if(process.env.MUTANT==="reg")await p.evaluate(()=>{DOOR.REG=/quý ngươi|tin ngươi|thiện cảm/});
 const SELF=await p.evaluate(()=>{const R=[];const ck=(name,got,want)=>R.push({sc:"self",door:"SELF",row:name,lv:0,base:String(want),fin:String(got),ok:got===want});
  const HG=[["Danh nàng −−",{},true],["nàng bị quở trách",{},true],["Danh +",{},true],["Danh +",{danh:-1},false],["cần nguyên cớ: đã nghe người nhận xét",{},false],
   ["có hạc đỉnh hồng thì khỏi mua thạch tín",{},false],["nàng quý ta −−",{},false],["nàng quý ngươi −",{},false],["nàng tin ta −",{},false],["nàng oán ngươi +",{},false]];
  for(const [h,c,w] of HG)ck("hintGain «"+h+"»"+(c.danh?" (pays Danh)":""),DOOR.hintGain(h,c),w);
  const TG=[["Danh nàng −−",true],["nàng bị phạt quỳ",true],["Sủng nàng −",true],["nàng quý ta −−",false],["nàng tin ta −",false],["nàng thương ngươi −",false],["nàng oán ngươi +",false],["nàng biết chuyện",false]];
  for(const [h,w] of TG)ck("TGT «"+h+"»",DOOR.TGT(h),w);
  const DG=[["thành: nàng quý ta −−",""],["thành: nàng quý ngươi −−",""],["thành: nàng tin ta −",""],["thành: thiện cảm −−",""]];
  for(const [x,w] of DG){let g="";try{const d=document.createElement("div");d.innerHTML=doorGain([x],2);g=d.textContent.trim()}catch(e){g="ERR "+e}ck("doorGain «"+x+"»",g,w)}
  /* E-GAIN3-LIVE-2: DOOR.rowHint itself — a way whose OWN text is a need line, its door line a real gain → the row's line wins (base first); the 78c8608a raw-first rule (MUTANT=1) shows the need text */
  const RH=[[{n:"Thử",x:"cần nguyên cớ: đã nghe người nhận xét"},"thành: Danh +"],[{n:"Thử",x:"có hạc đỉnh hồng thì khỏi mua thạch tín"},"thành: nàng bị quở trách"]];
  for(const [a,x] of RH){let got="",want="";try{got=DOOR.rowHint(a,x,0);want=kitHint({n:a.n,x},null,0).hint}catch(e){got="ERR "+e}ck("rowHint «"+a.x+"» / «"+x+"»",got,want)}
  return R});
 const ALL=[...SELF];console.error('self cases '+SELF.length+', bad '+SELF.filter(x=>!x.ok).length);for(const sc of (SC||'dau,toi,cao,con,hau,hh').split(',')){await p.evaluate(n=>AA.scen(n),sc);ALL.push(...await p.evaluate(n=>DRH.run(n),sc));console.error(sc+' rows '+ALL.length)}
 const bad=ALL.filter(x=>x.err||x.ok===false);const U={};bad.forEach(x=>{const k=x.err?'ERR '+x.err:`${x.door} › ${x.row} lv${x.lv}: «${x.fin}» (base «${x.base}»)`;U[k]=(U[k]||0)+1});
 if(OUT)fs.writeFileSync(OUT,JSON.stringify({all:ALL,bad,perr},null,1));
 console.log('rows '+ALL.length+' | changed '+ALL.filter(x=>x.fin!==x.base).length+' | bad '+bad.length+' ('+Object.keys(U).length+' distinct) | page errors '+perr.length);
 for(const k of Object.keys(U).sort())console.log('  BAD: '+k+'  x'+U[k]);
 await b.close();process.exit(Object.keys(U).length||perr.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
