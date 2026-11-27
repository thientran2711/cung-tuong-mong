/* vp-doubled.js — KK38 whole-family scan for a DOUBLED WORD made by the screen wording pass (VP.fix, j84) (FOREMAN E 26/11 06:15Z: LIVE «VÌ SAO» row
   «thiện cảm thiện cảm +6»; promo-build-2: «thiện cảm với ngươi +5» → «thiện cảm thiện cảm +5»).
   Family = every text that names a relation / stat word right before «với / quý ngươi|ta ±N» and every reason («Vì sao») row:
   (A) every string literal of dev/build/j*.js with «với|quý ngươi|ta» (template ${…} → a number), (B) «Vì sao» lines from whyText for every WHY_STAT
   label × sign, drawn through the real result-row markup (kitWhyRowHTML) on screen, (C) every KIT_REL / NAMES label + «với ta ±N».
   A FAIL = the on-screen text repeats a two-word phrase («thiện cảm thiện cảm»).  usage: node dev/test/vp-doubled.js <index.html>   exit 1 on a FAIL */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');const F=path.resolve(process.argv[2]||'index.html');
const D=path.join(__dirname,'..','build');const LIT=new Set();
for(const f of fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f))){const s=fs.readFileSync(path.join(D,f),'utf8');
 for(const m of s.matchAll(/`((?:[^`\\]|\\.)*)`|"((?:[^"\\\n]|\\.)*)"/g)){let t=m[1]!=null?m[1]:m[2];if(!/(?:với|quý) (?:ngươi|ta)/.test(t))continue;
  t=t.replace(/\$\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g,'6').replace(/\\(.)/g,'$1');if(t.length<300)LIT.add(f+'|'+t)}}
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(mp3|ogg|m4a|mp4|webm|wav)(\?|$)/,r=>r.abort());await p.goto('file://'+F,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.VP&&typeof VP.fix==='function'&&typeof kitWhyRowHTML==='function',null,{timeout:240000});await p.waitForTimeout(800);
 const R=await p.evaluate(async L=>{const DBL=/(?<![\p{L}])(\p{L}+ \p{L}+) \1(?![\p{L}])/u,out=[];const chk=(src,t,shown)=>{const m=DBL.exec(shown);out.push({src,t,shown,bad:m?m[1]:null})};
  for(const x of L){const i=x.indexOf('|');const src=x.slice(0,i),t=x.slice(i+1);let s=t;try{s=VP.fix(t)}catch(e){}chk('A '+src,t,s)}
  const ST=typeof WHY_STAT==='object'?WHY_STAT:{};const host=document.createElement('div');host.id='vpdbl';document.body.appendChild(host);
  /* real causes of jwhyn (whyMoodMe / whyGreetF / trThDeed): any word the screen pass keys on («lòng», «quý ngươi», «nàng») makes it rewrite the line */
  const CAUSE=['tính Ân cần','lòng ngươi đang vui, người ta dễ mến','Thái hậu đã quý ngươi lắm: khó thêm','trọng Lễ, hợp ý','ta chưa rõ tính nết nàng'];
  for(const k of Object.keys(ST))for(const c of CAUSE)for(const d of [6,-3]){const t=`Hoàng hậu Liễu Họa Mi: ${c} → ${ST[k]} ${d>0?'+':'−'}${Math.abs(d)}`;host.innerHTML=`<div class="kb">${kitWhyRowHTML([t])}</div>`;await new Promise(r=>setTimeout(r,60));
   const el=host.querySelector('.krv');let s=el?el.textContent:'';try{s=VP.fix(s)}catch(e){}chk('B WHY_STAT.'+k,t,s)}
  host.remove();
  const labs=new Set([...Object.values(typeof KIT_REL==='object'?KIT_REL:{}),...Object.values(typeof NAMES==='object'?NAMES:{})].filter(x=>typeof x==='string'&&x.length<40));
  for(const l of labs)for(const t of [`${l} với ta +6`,`${l} với ngươi −3`,`nàng ${l} với ta +6`])chk('C '+l,t,VP.fix(t));
  return out},[...LIT]);
 const bad=R.filter(r=>r.bad);const by={};for(const r of R){const k=r.src.slice(0,1);by[k]=by[k]||{n:0,bad:0};by[k].n++;if(r.bad)by[k].bad++}
 console.log('| group | texts | doubled |');console.log('|---|---|---|');for(const k of Object.keys(by).sort())console.log(`| ${k} | ${by[k].n} | ${by[k].bad} |`);
 for(const r of bad.slice(0,40))console.log('DOUBLED «'+r.bad+'» '+r.src+' :: '+r.t+'  →  '+r.shown);
 if(errs.length)console.log('page errors: '+errs.slice(0,3).join(' | '));
 console.log(bad.length||errs.length?'VP-DOUBLED FAIL '+bad.length:'VP-DOUBLED PASS');await b.close();process.exit(bad.length||errs.length?1:0)})();
