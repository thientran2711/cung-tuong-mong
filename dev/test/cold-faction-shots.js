/* cold-faction review shots (CDN 401 on account E → regenerate here): Fold 755x1000@2 + iPad 1180x820@2 — her faction tab as leader with a member in lãnh cung (Gạch tên card), her tab in lãnh cung, her lãnh cung cards (letter cards). usage: node dev/test/cold-faction-shots.js <outdir> */
const path=require('path');const {chromium}=require('playwright');const OUT=process.argv[2];
(async()=>{const b=await chromium.launch();for(const [n,w,h] of [["fold",755,1000],["ipad",1180,820]]){const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:2});
 await p.route(u=>/^https?:/.test(u.href),r=>r.abort());await p.goto('file://'+path.resolve('dev/index.html'));await p.waitForTimeout(2500);
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false;Q.length=0;try{$("modal").hidden=true}catch(e){}document.querySelectorAll("[class^=km],[id^=kr],.kchest,#kchest").forEach(e=>{if(getComputedStyle(e).position==="fixed")e.remove()});
  const L=liveRivals(true).filter(x=>!x.queen&&!sameHouse(S,x));S.rank=6;L[0].rank=1;L[1].rank=1;S.facs=[];found(S,L[0]);joinFac(L[1],facOf(S));L[0].out=true;found(L[2],L[3]);tab="fac";render()});
 await p.waitForTimeout(800);await p.screenshot({path:`${OUT}/${n}-lead-gach.png`});
 await p.evaluate(()=>{const L=liveRivals(true).filter(x=>!x.queen&&!sameHouse(S,x));S.facs=[];found(L[0],L[1]);joinFac(S,facOf(L[0]));cold("Thử");Q.length=0;S.bac=100;tab="fac";render()});
 await p.waitForTimeout(800);await p.screenshot({path:`${OUT}/${n}-cold-tab.png`});
 await p.evaluate(()=>{tab="act";render()});await p.waitForTimeout(800);await p.screenshot({path:`${OUT}/${n}-cold-cards.png`});await p.close()}await b.close()})();
