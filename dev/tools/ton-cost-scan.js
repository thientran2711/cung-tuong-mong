/* ILLNESS-CURE r5c family scan (law 11, RV-189 F1): every deck card whose c holds a price (any stat key < 0) shown as a plaque in a tab-door
   frame (DOOR.card, the illness card's frame) — does its Tốn row print EVERY priced stat? Groups the misses by stat.
   node dev/tools/ton-cost-scan.js <dir with index.html> [out.md] */
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');const DIR=path.resolve(process.argv[2]||'.');const OUTF=process.argv[3];
(async()=>{const b=await chromium.launch();let md='';
 for(const [name,w,h] of [['fold',755,1000],['ipad',1180,820]]){const p=await b.newPage({viewport:{width:w,height:h}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.route(u=>/^https?:/.test(u.href)&&!/cdn|r2.dev|workers.dev|pages.dev/.test(u.host),r=>r.abort());await p.goto('file://'+path.join(DIR,'index.html'));await p.waitForTimeout(2500);
  const R=await p.evaluate(async()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false;Q.length=0;try{$("modal").hidden=true}catch(e){}
   const LBL={bac:"Bạc",suc:"Sức",sung:"Sủng",danh:"Danh",tam:"Tâm cơ",duc:"Đức",uy:"Uy",sac:"Sắc"};const seen=new Set(),cards=[];
   S.ill={k:"lao",st:2,known:true};S.bac=999;S.sung=99;for(let t=0;t<6;t++){try{deal()}catch(e){}for(const a of deck||[])if(a&&a.c&&!seen.has(a.n)&&Object.keys(a.c).some(k=>a.c[k]<0&&LBL[k])){seen.add(a.n);cards.push(a)}}
   try{(IC.deck&&IC.deck())}catch(e){}for(const a of deck||[])if(a&&a.c&&!seen.has(a.n)&&Object.keys(a.c).some(k=>a.c[k]<0&&LBL[k])){seen.add(a.n);cards.push(a)}
   const out={n:0,miss:{},ex:[]};
   for(let i=0;i<cards.length;i+=4){const grp=cards.slice(i,i+4);Q.length=0;try{$("modal").hidden=true}catch(e){}
    DOOR.card("Quét Tốn","",grp.map(a=>({n:a.n,x:optLine(a),c:a.c,hint:""})));await new Promise(r=>setTimeout(r,500));
    for(const a of grp){const btn=[...document.querySelectorAll('#modal button')].find(e=>{const k=e.querySelector('.kan');return (k?k.textContent:e.textContent).trim().startsWith(a.n)});const t=btn&&btn.querySelector('.kr-ton')?btn.querySelector('.kr-ton').textContent:'';
     for(const k of Object.keys(a.c)){if(!(a.c[k]<0)||!LBL[k])continue;out.n++;if(!new RegExp(LBL[k]+"\\s*"+(-a.c[k])).test(t)){out.miss[LBL[k]]=(out.miss[LBL[k]]||0)+1;if(out.ex.length<8)out.ex.push(a.n+" → "+(t||"(no Tốn)"))}}}}
   Q.length=0;try{$("modal").hidden=true}catch(e){}S.ill=null;return out});
  md+=`| ${name} | ${R.n} | ${Object.entries(R.miss).map(([k,v])=>k+" "+v).join(" · ")||"0"} | ${R.ex.join(" ; ")||"—"} |\n`;await p.close()}
 md='| device | priced stats checked | missing on the Tốn row | examples |\n|---|---|---|---|\n'+md;console.log(md);if(OUTF)fs.writeFileSync(OUTF,md);await b.close()})();
