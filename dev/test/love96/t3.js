// screenshots at 755x1000@2: a beat dialog (cost-only), a result card, the Mệnh tab, the man's card in Giao tình; + old save loads
const {chromium}=require('playwright');const fs=require('fs');const D=__dirname;const OUT=process.argv[2]||D+'/shots';fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const errs=[];
 for(const [w,h,dpr] of [[755,1000,2],[1180,820,2],[390,844,3]]){
 const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:dpr,serviceWorkers:'block'});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(w+' '+e.message));
 await p.goto(''+(process.env.GAME||'http://localhost:8796/t_new.html')+'');await p.waitForTimeout(600);await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(600);
 await p.evaluate(()=>{localStorage.setItem("ctm-tm96","1");window.__forceOrigin="dtq"});await p.waitForSelector('#slots button[data-new="1"]');
 await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.st&&S.st.ch,null,{timeout:20000});
 await p.waitForTimeout(2500);await p.evaluate(fs=>eval(fs),fs.readFileSync(D+'/drive.js','utf8'));
 await p.evaluate(()=>{__d96.clear();while(Q.length)closeModal();__tm96.jump("tm96a")});await p.waitForTimeout(800);await p.screenshot({path:`${OUT}/${w}-1-chapter-card.png`});
 await p.evaluate(()=>{while(Q.length)closeModal();const A=S.st.M;A.due=S.turn;deal();render()});await p.waitForTimeout(500);
 // play the Mệnh truyện card from Hành sự by clicking it
 const has=await p.evaluate(()=>{const i=deck.findIndex(a=>a.j67);return i});
 if(has>=0){await p.evaluate(i=>act(i),has)}else{await p.evaluate(()=>fireBeat67(S.st.M))}
 await p.waitForTimeout(800);await p.screenshot({path:`${OUT}/${w}-2-beat.png`});
 const texts=await p.evaluate(()=>document.getElementById('mb')?document.getElementById('mb').innerText.slice(0,900):'');
 await p.evaluate(()=>{const R=Math.random;Math.random=()=>0.0001;chooseM(0);Math.random=R});await p.waitForTimeout(500);
 // jump to the last beat of chapter c with the final choice visible
 await p.evaluate(()=>{while(Q.length)closeModal();__d96.run("tm96b",{});while(Q.length)closeModal();__tm96.jump("tm96c");while(Q.length)closeModal();const A=S.st.M;for(let n=0;n<5;n++){A.due=S.turn;fireBeat67(A);__d96.clear();chooseM(0);__d96.clear()}A.due=S.turn;fireBeat67(A)});
 await p.waitForTimeout(800);await p.screenshot({path:`${OUT}/${w}-3-final-choice.png`});
 await p.evaluate(()=>{const R=Math.random;Math.random=()=>0.0001;chooseM(0);Math.random=R});await p.waitForTimeout(800);
 await p.evaluate(()=>{for(let k=0;k<10&&Q.length;k++){if(/khép lại/.test(Q[0].t||""))break;closeModal()}});await p.waitForTimeout(300);await p.screenshot({path:`${OUT}/${w}-4-result.png`});
 await p.evaluate(()=>{while(Q.length)closeModal();tab="story";render()});await p.waitForTimeout(800);await p.screenshot({path:`${OUT}/${w}-5-tab-story.png`,fullPage:false});
 const ovf=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 await p.evaluate(()=>{tab="rv";render()});await p.waitForTimeout(500);
 await p.evaluate(()=>{const b=[...document.querySelectorAll('#panel button, #panel [data-pg]')].find(x=>/Thống lĩnh|Khương|Lục|Tiêu/.test(x.innerText||"")&&x.closest('.pager,.pgwrap'));return !!b});
 await p.screenshot({path:`${OUT}/${w}-6-tab-rv.png`});
 console.log(JSON.stringify({w,ovf,texts}));await ctx.close()}
 console.log('ERRS',JSON.stringify(errs));await b.close()})();
