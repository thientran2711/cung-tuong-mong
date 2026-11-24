const {boot}=require('./boot');const fs=require('fs');
(async()=>{for(let t=0;t<6;t++){const o=await boot('fold',1,0,{reducedMotion:'no-preference'});const {g}=o;
 await g.evaluate(fs.readFileSync(__dirname+'/scen3.js','utf8'));
 const r=await g.evaluate(async()=>{const c=await KSC(17);const strip=m=>({name:m.name,role:m.role,act:m.act,src:m.src,sil:m.sil,asp:m.asp,tag:m.tag,tc:m.tc,acts:m.acts,kind:m.p&&m.p.kind});
  return {roster:JSON.stringify(S.roster),best:c.best,fh:c.fh,me:window.__karMe,meAsp:window.__karMeAsp,groups:c.groups.map(g=>({act:g.act,cap:g.cap,pri:g.pri,masters:g.masters.map(strip),fol:g.fol.map(strip)}))}});
 await o.b.close();o.srv.close();const nf=r.groups.reduce((s,g)=>s+g.masters.length+g.fol.length,0);console.log(t,r.groups.length,nf);
 if(r.groups.length>=7&&nf>=12){fs.writeFileSync(__dirname+'/crowd.json',JSON.stringify(r));console.log('saved');break}}})();
