/* ILLNESS-CURE r4 family scan (law 11, MAIN 186: «Tâm bệnh · nhẹ» shown on the HUD only — no dialog, no danger word, no cure road).
   Every illness (ILL, j13) × stage (nhẹ · nặng · nguy kịch) × life (Hành sự / lãnh cung / cung nữ):
   shown = her illness chip is on screen (top bar k3 or hud2) · sign = the card opens by itself (nhẹ: the real catchIll call; nặng / nguy kịch:
   the monthly stage-up through illMonth) · tap = what the visible chip opens: open roads, danger line in words, no % · law 2 = a bạc road has
   its non-bạc road in the same tier.
   node dev/tools/illness-sign-scan.js <dir with index.html> [out.md]   (one Chromium; prints a markdown table + a summary line) */
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');const DIR=path.resolve(process.argv[2]||'.');const OUTF=process.argv[3];
(async()=>{const b=await chromium.launch();const errs=[];const all=[];
 for(const life of ['hs','cold','srv']){const p=await b.newPage({viewport:{width:755,height:1000}});p.on('pageerror',e=>errs.push(life+': '+e.message));
  await p.route(u=>/^https?:/.test(u.href)&&!/cdn|r2.dev|workers.dev|pages.dev/.test(u.host),r=>r.abort());await p.goto('file://'+path.join(DIR,'index.html'));await p.waitForTimeout(2500);
  const rows=await p.evaluate(async life=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();
   for(let i=0;i<300&&(life==='srv'?!isSrv():isSrv());i++)start();window.__nlInner=0;quiet=false;
   const txt=h=>String(h||"").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();const W=z=>new Promise(r=>setTimeout(r,z));
   const close=()=>{Q.length=0;try{$("modal").hidden=true}catch(e){}};const modal=()=>{const m=document.querySelector('#modal');return m&&!m.hidden?m.innerText.replace(/\s+/g," "):""};
   if(life==='srv'&&!isSrv())return[{life,err:"no cung nữ life in 300 starts"}];
   if(life==='cold')S.out=1;S.bac=200;S.sung=40;S.suc=90;const out=[];
   for(const k of Object.keys(ILL))for(const st of [1,2,3]){close();S.ill=null;delete S.illAlarm;deal();render();await W(30);
    /* the sign: nhẹ = she falls ill (catchIll, as every game path does); nặng / nguy kịch = the month it worsens (illMonth) */
    if(st===1)catchIll(S,k);else{S.ill={k,st:st-1,known:true};const o=illMonthP;illMonthP=function(q){if(q===S&&S.ill)S.ill.st=st;return""};try{illMonth()}catch(e){}illMonthP=o}
    if(!S.ill||S.ill.st!==st){S.ill={k,st,known:true}}deal();render();await W(120);const sg=modal();const sign=(life==="srv"&&st>1)?"n/a":sg?(/Chọn mức|·/.test(sg)&&/(nhẹ|vừa|nặng)/.test(sg)?"card + roads":"card, no road"):"none";
    close();render();await W(30);
    const ch=[...document.querySelectorAll('[data-k3="ill"],[data-hx="ill"]')].find(e=>e.offsetParent);const shown=!!ch;let tap="—",roads=0,danger=false,pct=false;
    if(ch){ch.click();await W(200);const t=modal();if(!t)tap="nothing";else{const R=[...document.querySelectorAll('#modal button.ka, #modal .opt')].map(x=>x.innerText.replace(/\s+/g," ")).filter(x=>/· (nhẹ|vừa|nặng)/.test(x));roads=R.length;
      danger=/(tự khỏi|không qua khỏi|trở nặng|trở nguy kịch|không nguy đến tính mạng)/.test(t);pct=/\d+ ?%/.test(t);tap=roads?`${roads} roads`:"text only"}}
    close();
    /* law 2 in every tier: a bạc way has a non-bạc way in its tier (ONE.tierRows over the deck, as the card) */
    let l2="—";try{const r=(DOOR.D||[]).find(x=>x.k==="hs-thaiy");IC.deck();const L=[];deck.forEach(a=>{if(a&&r.re.test(a.n))L.push({id:"d:"+a.n,n:a.n,a,x:"",off:!!(a.lock||!canPay(a))})});
     const R=ONE.tierRows(r,L,"me");const tiers=[...new Set(R.map(x=>x.t))];const bad=tiers.filter(t=>{const ws=L.filter(x=>R.some(y=>y.t===t&&y.T&&y.T.includes(x)));return ws.some(x=>x.a.c&&x.a.c.bac)&&!ws.some(x=>!(x.a.c&&x.a.c.bac))});
     l2=bad.length?"bạc alone in "+bad.join(","):"ok ("+tiers.join(" · ")+")"}catch(e){l2="err "+e.message}
    out.push({life,ill:ILL[k].n,st:STG[st],shown,sign,tap,danger,pct,l2})}
   S.ill=null;return out},life);all.push(...rows);await p.close()}
 const L=["| Life | Illness | Stage | shown | sign (opens by itself) | chip tap | danger words | % | law 2 (bạc ⇒ non-bạc, same tier) |","|---|---|---|---|---|---|---|---|---|"];
 for(const r of all)L.push(r.err?`| ${r.life} | ${r.err} |`:`| ${r.life} | ${r.ill} | ${r.st} | ${r.shown?"yes":"**no**"} | ${r.sign==="card + roads"?r.sign:r.sign==="n/a"?"n/a (cung nữ: no monthly stage-up, j42 srvIllWorld)":"**"+r.sign+"**"} | ${/roads/.test(r.tap)?r.tap:"**"+r.tap+"**"} | ${r.danger?"yes":"**no**"} | ${r.pct?"**%**":"none"} | ${r.l2} |`);
 const bad=all.filter(r=>r.err||!r.shown||!/card \+ roads|n\/a/.test(r.sign)||!/roads/.test(r.tap)||!r.danger||r.pct||!/^ok/.test(r.l2));
 const sum=`SUMMARY ${all.length} cases · gaps ${bad.length} (not shown ${all.filter(r=>!r.shown).length} · no sign ${all.filter(r=>!/card \+ roads|n\/a/.test(r.sign||"")).length} · tap without road ${all.filter(r=>!/roads/.test(r.tap||"")).length} · no danger words ${all.filter(r=>!r.danger).length} · % ${all.filter(r=>r.pct).length} · law 2 ${all.filter(r=>!/^ok/.test(r.l2||"")).length}) · page errors ${errs.length}`;
 const md=L.join("\n")+"\n\n"+sum+"\n"+(errs.length?"errors: "+errs.slice(0,5).join(" | ")+"\n":"");if(OUTF)fs.writeFileSync(OUTF,md);console.log(md);await b.close()})();
