/* ILLNESS-CURE family scan (law 11): every illness (ILL, j13) × every stage (nhẹ · nặng · nguy kịch) — what her status chip opens, the cure roads
   of the Hành sự door by tier (nhẹ · vừa · nặng), a bạc road's matching non-bạc road, the danger line, and the NPC road.
   node dev/tools/illness-road-scan.js <dir with index.html> [out.md]   (one Chromium; prints a markdown table) */
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');const DIR=path.resolve(process.argv[2]||'.');const OUTF=process.argv[3];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(u=>/^https?:/.test(u.href)&&!/cdn|r2.dev|workers.dev|pages.dev/.test(u.host),r=>r.abort());await p.goto('file://'+path.join(DIR,'index.html'));await p.waitForTimeout(2500);
 const rows=await p.evaluate(async()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false;Q.length=0;try{$("modal").hidden=true}catch(e){}
  const txt=h=>String(h||"").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();const out=[];S.bac=200;S.sung=40;S.suc=93;
  const r=(DOOR.D||[]).find(x=>x.k==="hs-thaiy");
  for(const k of Object.keys(ILL))for(const st of [1,2,3]){S.ill={k,st,known:true};Q.length=0;try{$("modal").hidden=true}catch(e){}deal();render();
   /* the chip */
   const c=document.querySelector('#hud2 [data-hx="ill"]');let chip="no chip";if(c){c.click();await new Promise(z=>setTimeout(z,250));const m=document.querySelector('#modal');const opts=(Q[0]&&Q[0].opts||[]).filter(o=>o.n!=="Thôi").length;
    chip=m&&!m.hidden?(opts?`card, ${opts} roads`:"text only («Lui»)"):"nothing";Q.length=0;try{m.hidden=true}catch(e){}}
   /* the door tiers (the ONE pick per tier) and every cure way in the deck */
   let tiers="no door";const ways=[];if(r&&typeof ONE==="object"){const L=[];deck.forEach((a,i)=>{if(a&&r.re.test(a.n)){L.push({id:"d:"+a.n,n:a.n,a,x:a.x,off:!!(a.lock||!canPay(a))});ways.push(a.n+(a.c&&a.c.bac?" (bạc)":""))}});
    const R=ONE.tierRows(r,L,"me");tiers=R.map(x=>`${x.t}: ${x.m?txt(x.m.n):"—"}`).join(" · ")}
   const cure=ways.filter(w=>!/bắt mạch/.test(w));const bac=cure.filter(w=>/\(bạc\)/.test(w)).length,non=cure.filter(w=>!/\(bạc\)/.test(w)).length;
   const dang=typeof illDanger==="function"?txt(illDanger(S)):"—";
   let npc="—";try{if(window.IC&&IC.bestWay){const v=liveRivals(true).find(x=>!x.coop);v.bac=200;npc=st>=2?IC.bestWay(v)[0]+" (bạc)":"(nhẹ: none)";v.bac=0;v.sung=40;npc+=" / no bạc: "+(st>=2?IC.bestWay(v)[0]:"—")}}catch(e){npc="err"}
   out.push({ill:ILL[k].n,st:STG[st],die:ILL[k].die,chip,tiers,cure:cure.length,bac,non,dang:dang.slice(0,120),npc})}
  S.ill=null;return out});
 const L=["| Illness | Stage | die | Chip tap opens | Door tiers (pick) | cure ways (bạc / non-bạc) | Danger line | NPC road (bạc / no bạc) |","|---|---|---|---|---|---|---|---|"];
 for(const r of rows)L.push(`| ${r.ill} | ${r.st} | ${r.die} | ${r.chip} | ${r.tiers} | ${r.cure} (${r.bac} / ${r.non}) | ${r.dang} | ${r.npc} |`);
 const s=L.join("\n")+`\n\npage errors: ${errs.length}\n`;console.log(s);if(OUTF)fs.writeFileSync(OUTF,s);await b.close()})();
