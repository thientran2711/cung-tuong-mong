const {open,clean}=require('./harness');const fs=require('fs');
(async()=>{process.env.SKIPIMG=1;const {b,p,errs}=await open(1180,820,'dev/_old.html');
 const r=await p.evaluate(()=>{SLOT=2;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const mk=(sex,age)=>{const k=mkKid(sex,age);return k};
  [['m',1],['f',3],['m',7]].forEach(a=>S.kids.push(mk(...a)));const R=rivals.filter(v=>v.alive&&!v.out);
  [[0,'m',2],[0,'f',9],[1,'m',4],[1,'m',12]].forEach(([i,...a])=>{if(R[i])R[i].kids.push(mk(...a))});
  try{allKids().forEach(([k])=>k61Know(k,'',true,3))}catch(e){}for(let i=0;i<2;i++){try{monthTick()}catch(e){}Q.length=0}
  birthP(S,true);birthP(R[0],true);Q.length=0;
  return {save:JSON.stringify(ser()),kids:allKids().map(([k,v])=>[k.name,k.age,!!v,Math.round(k.tv),Math.round(k.tw),Math.round(k.td),k.tal])}});
 fs.writeFileSync((process.env.OLDSAVE||__dirname+'/old-save.json'),r.save);console.log(JSON.stringify(r.kids),errs);await b.close()})();
