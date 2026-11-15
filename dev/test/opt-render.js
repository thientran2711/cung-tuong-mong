/* review/opt-render (owner 11/15): event choices keep the KIT 28.6 "cost" mode — ONLY Tốn (Sức / Bạc / khắc; "Tốn: không" when free) and
   Cần, never Được / Mất / odds (the choice stays suspenseful; the owner's design, confirmed after a short reversal).
   The result card: THÀNH / HỎNG only from the act's own roll, else the neutral "KẾT QUẢ"; others' ghen / oán in a collapsed KÈM line.
   usage: node dev/test/opt-render.js <build page url> <outdir> [WxH@dpr]   (default 1180x820@2)
   Each event option also carries ONE word hint ("Gợi ý", no numbers, true for this moment) and a risk tag (an toàn / có rủi ro / liều).
   Prints, per dialog: every option with its rows; FAILS: an event option that shows a Được / Mất / Kèm row or an odds word, no Tốn / Cần
   row, no hint line, a digit in the hint, or no risk tag. "Thôi" / "Lui" (close options) are skipped. Also checks the hint gets sharper
   with Tâm cơ (vague → names who reacts). */
const {chromium}=require('playwright');const fs=require('fs');
const [,,PAGE,OUT,SZ]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const [wh,dpr]=(SZ||"1180x820@2").split("@");const [W,H]=wh.split("x").map(Number);const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
 await ctx.route('**/*',async rt=>{const u=new URL(rt.request().url());
  if(/^(127\.0\.0\.1|localhost)$/.test(u.hostname)&&/\.html$/.test(u.pathname)&&fs.existsSync(process.cwd()+u.pathname))return rt.fulfill({status:200,body:fs.readFileSync(process.cwd()+u.pathname),contentType:'text/html; charset=utf-8'});
  return rt.continue()});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
 for(let i=0;i<40;i++){await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name,null,{timeout:90000});if(!(await p.evaluate(()=>isSrv())))break;await p.evaluate(()=>{S=null;start()})}
 await sleep(1800);await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;const md=document.getElementById('modal');md.hidden=true;md.className='modal';try{NLP=null}catch(e){}S.bac=300;S.suc=80;render()});
 /* every option rendered in the dialog now on screen, against its data */
 const audit=()=>p.evaluate(()=>{const m=Q[0];const M=document.getElementById('modal');if(!m||M.hidden||!m.opts)return null;
  const T=s=>String(s||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
  return m.opts.map((o,i)=>{const b=M.querySelector(`#mb .opt[data-m="${i}"]`);if(!b)return{n:T(o.n),hidden:true};
   const rows=[...b.querySelectorAll(".kr")].map(r=>[T((r.querySelector(".krl")||{}).textContent),T((r.querySelector(".krv")||r).textContent)]);
   const src=T([o.x,o.j67,o.lx,o.wx].filter(Boolean).join(" · "));
   /* an outcome = a "thành / hỏng / được / mất" part, or a signed number that is not just the cost already shown in Tốn */
   const tonTxt=rows.filter(([l])=>/^Tốn$/i.test(l)).map(r=>r[1]).join(" ").replace(/−/g,"-");
   const signed=(src.match(/[A-ZĐÀ-Ỹa-zà-ỹ]+\s[+\-−]\d+/g)||[]).map(x=>x.replace("−","-"));
   const outcome=/thành\s*:|hỏng\s*:|được\s*:|mất\s*:/i.test(src)||signed.some(x=>!tonTxt.includes(x));
   const has=rows.some(([l])=>/^(Được|Mất|Thành|Hỏng)$/i.test(l));
   /* numbers of the data's "thành:" / plain outcome part must appear in the rows */
   const nums=(src.replace(/^[^·]*?(Liều|Khó|Năm ăn năm thua|Khá chắc|Chắc|Rất chắc|Nắm chắc)\s*·\s*/,"").match(/[A-ZĐÀ-Ỹa-zà-ỹ ]{2,}\s[+\-−]\d+/g)||[]).map(x=>x.trim().replace("−","-"));
   const rowTxt=rows.map(r=>r[1]).join(" · ").replace(/−/g,"-");const miss=nums.filter(x=>!rowTxt.includes(x.split(/\s(?=[+\-]\d)/).pop()));
   const tonKhong=rows.some(([l,v])=>/^Tốn$/i.test(l)&&/^không$/i.test(v));const ton=rows.some(([l])=>/^Tốn$/i.test(l));
   const odds=!!b.querySelector(".kodds");const hint=T((b.querySelector(".kr-hint .krv")||{}).textContent);const risk=T((b.querySelector(".krisk")||{}).textContent);const can=rows.some(([l])=>/^Cần$/i.test(l));const ownShow=!!(o.showOut||m.showOut);
   const has2=rows.some(([l])=>/^(Được|Mất|Thành|Hỏng|Kèm)$/i.test(l));
   return{n:T(o.n).slice(0,40),src:src.slice(0,90),outcome,has:has2,miss,tonKhong,ton,can,odds,ownShow,hint,risk,rows:rows.map(r=>r.join(": ")).slice(0,5)}})});
 const close=()=>p.evaluate(()=>{Q.length=0;const md=document.getElementById('modal');md.hidden=true;render()});
 const R={sz:SZ||"1180x820@2",dialogs:{},fails:[]};
 const openP=async(id,pp,title)=>{const ok=await p.evaluate(([id,pp,title])=>{try{const d=mkP(id,pp||{});if(!d||!d.o||!d.o.length)return false;pushDil(d,title||id);showModal();return true}catch(e){return "ERR "+e.message}},[id,pp,title]);
  if(ok!==true)return ok;await sleep(500);const a=await audit();await close();return a};
 /* the ones the owner named + every other PEND with options */
 const ids=await p.evaluate(()=>Object.keys(PEND));
 const PP={night2:{s:5},night1:{q:3,vp:0}};
 for(const id of ids){const a=await openP(id,PP[id]||{});if(!a||typeof a==="string"){R.dialogs[id]=a||"no options";continue}R.dialogs[id]=a;
  for(const o of a){if(o.hidden||o.ownShow||/^(Thôi|Lui|Đóng)$/.test(o.n))continue;if(o.has)R.fails.push([id,o.n,"outcome shown on an event choice",o.rows.join(" / ")]);if(!o.ton&&!o.can)R.fails.push([id,o.n,"no Tốn / Cần row"]);if(o.odds)R.fails.push([id,o.n,"odds word shown"]);
   if(!o.hint)R.fails.push([id,o.n,"no hint"]);else if(/\d/.test(o.hint))R.fails.push([id,o.n,"number in hint",o.hint]);if(!/^(an toàn|có rủi ro|liều)$/.test(o.risk))R.fails.push([id,o.n,"no risk tag"])}}
 /* the same option read by a careless and a sharp woman: the sharp hint names who reacts */
 R.levels=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const out={};const t0=S.tamco,m0=S.mat;
  for(const [k,tc,mt] of [["vague",5,0],["plain",30,0],["sharp",70,3]]){S.tamco=tc;S.mat=mt;Q.length=0;pushDil(mkP("giu",{}),"Giữ hay không giữ");showModal();await W(400);
   out[k]=[...document.querySelectorAll('#mb .opt')].map(b=>`${(b.querySelector('.kan')||b).textContent.trim()} — ${(b.querySelector('.kr-hint .krv')||{}).textContent||""} [${(b.querySelector('.krisk')||{}).textContent||""}]`)}
  S.tamco=t0;S.mat=m0;Q.length=0;document.getElementById('modal').hidden=true;render();return out});
 /* night2 shot */
 await p.evaluate(()=>{pushDil(mkP("night2",{s:5}),"Gối đầu");showModal()});await sleep(900);await p.screenshot({path:`${OUT}/night2-${wh}.jpg`,type:'jpeg',quality:74});await close();
 /* "Có người đến": the visitor builders (approachOne) until a few with options came */
 R.visitors=[];for(let i=0;i<60&&R.visitors.length<5;i++){const got=await p.evaluate(()=>{Q.length=0;let m=null;try{m=approachOne()}catch(e){return null}if(!m||!m.opts||!m.opts.length)return null;Q.push(m);showModal();return m.t},null);
  if(!got)continue;await sleep(400);const a=await audit();if(a){R.visitors.push(a)}
  if(R.visitors.length===1)await p.screenshot({path:`${OUT}/visitor-${wh}.jpg`,type:'jpeg',quality:74});await close()}
 /* the result card: a night with gains + mass jealousy + the night's own Bạc cost → no BẠI, a collapsed KÈM line */
 R.night=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const b=rsnap();S.sung+=5;S.duc+=3;S.an=(S.an||0)+6;S.bac-=5;
  liveRivals(true).forEach(v=>{v.ghen=(v.ghen||0)+8});log("Xin tha cho cung nữ bị phạt. Đức +3, Ân tình +1");resultShow("Đêm thị tẩm",b,"sure");await W(400);
  const t=document.getElementById('rtoast');const k=t.querySelector('.kakem');const lst=k&&k.querySelector('.kakeml');
  return{cls:t.className,seal:(t.querySelector('.seal')||{}).textContent,stamp:!!t.querySelector('.kmseal'),mat:[...t.querySelectorAll('.kr-mat .kitem')].map(x=>x.textContent),
   kem:k&&k.querySelector('.kakems').textContent,collapsed:!!lst&&getComputedStyle(lst).display==="none",hasGhenInMat:[...t.querySelectorAll('.kr-mat')].some(x=>/ghen/.test(x.textContent))}});
 await p.screenshot({path:`${OUT}/night-result-${wh}.jpg`,type:'jpeg',quality:74});
 if(/HỎNG|BẤT LỢI/.test(R.night.seal||"")||/\bbad\b/.test(R.night.cls)||R.night.hasGhenInMat||!R.night.kem||!R.night.collapsed)R.fails.push(["night result",JSON.stringify(R.night)]);
 R.rolled=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const b=rsnap();S.danh-=3;resultShow("Tung tin đồn",b,false);await W(300);const t=document.getElementById('rtoast');const s1=(t.querySelector('.seal')||{}).textContent;
  const b2=rsnap();S.danh+=3;resultShow("Thỉnh an",b2,true);await W(300);return{fail:s1,ok:(t.querySelector('.seal')||{}).textContent}});
 if(R.rolled.fail!=="HỎNG"||R.rolled.ok!=="THÀNH")R.fails.push(["rolled seals",JSON.stringify(R.rolled)]);
 R.errs=errs;console.log(JSON.stringify({sz:R.sz,fails:R.fails,levels:R.levels,night:R.night,rolled:R.rolled,visitors:R.visitors.length,errs,
  dialogs:Object.fromEntries(Object.entries(R.dialogs).map(([k,v])=>[k,Array.isArray(v)?v.map(o=>o.hidden?`(${o.n}: ✕)`:`${o.n} [${o.risk}] | ${o.rows.join(" / ")}`):v]))},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
