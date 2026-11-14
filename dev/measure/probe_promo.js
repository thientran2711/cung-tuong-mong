// usage: GAME=<build with meta charset> node dev/measure/probe_promo.js <lives> <out.json>   env: BALJ, ORIG
// sensible bot; once per tuần samples her rank and which promotion requirements fail (numbers stripped) -> what holds the climb back
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const M=__dirname,GAME=process.env.GAME||path.join(M,'..','index.html'),N=+process.argv[2]||2,out=process.argv[3];
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844}});
 await ctx.addInitScript(()=>{window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};HTMLElement.prototype.focus=function(){};});
 const page=await ctx.newPage();await page.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());const errs=[];page.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await page.goto('file://'+GAME);await page.waitForTimeout(500);await page.evaluate(()=>localStorage.clear());await page.reload();await page.waitForTimeout(500);
 await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 await page.evaluate(`window.__hhStop=1;window.__balO=${process.env.BALJ||'null'};window.__origO=${process.env.ORIG?JSON.stringify(process.env.ORIG):'null'}`);
 await page.evaluate(fs.readFileSync(path.join(M,'inpage6.js'),'utf8'));
 await page.evaluate(()=>{window.__pp={};window.__ppk="";const nb=nextBuoi;nextBuoi=function(){try{if(S&&!S.dead&&!S.srv){const k=S.turn+"_"+S.tuan;if(k!==window.__ppk){window.__ppk=k;const r=rkOf(S);const o=window.__pp[r]=window.__pp[r]||{wk:0,f:{},g:{}};o.wk++;const gg=String(S.turn-S.lastPromo);o.g[gg]=(o.g[gg]||0)+1;
   for(const x of promoReqP(S))if(!x[0]){const t=x[1].replace(/-?\d+/g,"#");o.f[t]=(o.f[t]||0)+1}}}}catch(e){}return nb.apply(this,arguments)};
  /* every line in her log that demotes or confines her */
  window.__pd={};const lg=log;log=function(t){try{const x=String(t).replace(/<[^>]+>/g,"");if(/^(Ngươi|Nàng)?.{0,40}(bị giáng|bị cấm túc|cấm túc)/.test(x)&&(/^Ngươi/.test(x)||(S&&x.indexOf(S.name)===0))){const k=x.replace(/-?\d+/g,"#").slice(0,140);window.__pd[k]=(window.__pd[k]||0)+1}}catch(e){}return lg.apply(this,arguments)}});
 if(process.env.BALJ)await page.evaluate(`try{Object.assign(BAL,${process.env.BALJ})}catch(e){}`);
 while(true){const n=await page.evaluate(()=>window.__bot.step("sens",300));const pp=await page.evaluate(()=>({pp:window.__pp,pd:window.__pd,res:window.__res.map(x=>({o:x.origin,f:x.fate,mr:x.maxRank,wk:x.wk,hhWk:x.hhWk}))}));fs.writeFileSync(out,JSON.stringify(pp));if(n>=N)break}
 console.log('pageerrors',JSON.stringify(errs.slice(0,5)));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
