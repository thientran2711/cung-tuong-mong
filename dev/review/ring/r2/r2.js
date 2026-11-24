const {boot}=require('/tmp/claude-0/ring/probe/boot');const fs=require('fs');
const KRR=fs.readFileSync('/tmp/claude-0/ring/rr.js','utf8'),SC=fs.readFileSync('/tmp/claude-0/ring/scen.js','utf8');
const DEV={fold:'fold',ipad:'ipadAir'};
async function open(devName,dsf,opt){opt=opt||{};const o=await boot(DEV[devName],dsf,opt.minP);const {g,pg}=o;
 await g.evaluate(()=>{for(const id of ['rtoast','kntchip']){const e=document.getElementById(id);if(e)e.remove()}});
 return o}
/* set the place + a bare visit so the real stage chrome shows; people list is replaced by the ring */
async function place(g,k,title){await g.evaluate(([k,t])=>{const P=curPeople().slice(0,2);S.place=k;S.visit={k,people:P,talked:false,tk:{},msg:t||''};render();const rt=document.getElementById('rtoast');if(rt)rt.remove();document.querySelectorAll('.kmov,.kmfls').forEach(e=>e.remove())},[k,title]);}
async function inject(g){await g.evaluate(KRR);await g.evaluate(SC)}
module.exports={open,place,inject,DEV};
