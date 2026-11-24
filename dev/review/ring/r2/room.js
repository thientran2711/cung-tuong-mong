const {open,place,inject}=require('./r2');const fs=require('fs');
(async()=>{const devs=(process.argv[2]||'fold,ipad').split(',');const out='shots3';fs.mkdirSync(out,{recursive:true});
 for(const dev of devs){const {srv,b,pg,g}=await open(dev,2,{minP:6});await inject(g);
  const cnt=await g.evaluate(()=>curPeople().length);console.log(dev,'people',cnt);
  for(const n of [4,6]){
   await g.evaluate(n=>{const P=liveRivals(true).slice(0,n).map(v=>({kind:'hh',name:v.name,ref:v,ini:v.name[0],col:'#c9a0e0',info:''}));S.place='home';S.visit={k:'home',people:P,talked:false,tk:{}};const l=document.getElementById('krr');if(l)l.remove();document.getElementById('stage').classList.remove('krring');document.getElementById('scimg').style.opacity='';render();const rt=document.getElementById('rtoast');if(rt)rt.remove()},n);
   await pg.waitForTimeout(2500);await pg.screenshot({path:`${out}/ROOM${n}-${dev}-today.png`});
   for(const lay of ['ROW','G']){
    await g.evaluate(([n,lay,dev])=>{window.__rm=SCEN.roomReal(n);return KRR.init({mode:lay,groups:window.__rm,fh:dev==='fold'?400:430,depth:dev==='fold'?70:80,rxk:1,edge:.22,scMin:.74,brMin:.85,fitw:.98,plateBelow:78,tags:true})},[n,lay,dev]);
    await pg.waitForTimeout(1800);await g.evaluate(()=>KRR.render());await pg.waitForTimeout(600);
    await pg.screenshot({path:`${out}/ROOM${n}-${dev}-${lay==='ROW'?'row':'ring'}.png`});console.log('ok',n,lay,dev)}}
  await b.close();srv.close()}
})().catch(e=>{console.error(e);process.exit(1)});
