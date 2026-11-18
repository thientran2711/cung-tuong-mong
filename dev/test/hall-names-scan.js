/* hall-names scan (E3 / OD:L1475): (1) jhall.js table: every palace of PALN + jpal list + Càn Ninh has its halls, all plaque names unique and distinct from palace names;
   (2) no display path still prints the bare generic role as a place name (only HALL_ROLE / jhall.js may hold those strings).
   usage: node dev/test/hall-names-scan.js   (exit 1 on failure) */
const fs=require('fs'),path=require('path');const B=path.resolve(__dirname,'../build/');
const src=fs.readFileSync(B+'/jhall.js','utf8');const vm=require('vm');const ctx={};vm.createContext(ctx);vm.runInContext(src+';this.T={HALL_PN,HALL_ROLE,hallName,HALL_SRV}',ctx);const T=ctx.T;
let bad=0;const F=(m)=>{bad++;console.log('FAIL',m)};
const j26=fs.readFileSync(B+'/j26.js','utf8'),jpal=fs.readFileSync(B+'/jpal.js','utf8');
const palaces=[...j26.matchAll(/"name": ?"([^"]+)"/g)].map(m=>m[1]).concat([...jpal.matchAll(/\["([^"]+)",\.\d+,\.\d+\]/g)].map(m=>m[1]));
console.log('palaces',palaces.length);
const all=[];palaces.concat(['Càn Ninh cung']).forEach(p=>{const L=T.HALL_PN[p];const need=p==='Càn Ninh cung'?1:3;if(!L||L.length<need)F('missing halls for '+p);else L.forEach(n=>all.push(n))});
all.push(T.HALL_SRV);
const seen={};all.forEach(n=>{if(seen[n])F('duplicate '+n);seen[n]=1});palaces.forEach(p=>{if(seen[p])F('hall = palace name '+p)});
Object.values(T.HALL_ROLE).forEach(r=>{if(seen[r])F('role used as plaque '+r)});
console.log('plaque names',all.length,'unique',Object.keys(seen).length);
/* (2) generic role strings outside jhall.js as player-visible place labels */
const files=fs.readdirSync(B).filter(f=>f.endsWith('.js')&&f!=='jhall.js'&&f!=='all.js');let leaks=0;
for(const f of files){const t=fs.readFileSync(B+'/'+f,'utf8').split('\n');t.forEach((l,i)=>{if(/["'`](Đông phối điện|Tây phối điện)["'`]/.test(l)&&!/pl-courtyards/.test(l)){leaks++;console.log('LEAK',f+':'+(i+1),l.trim().slice(0,120))}})}
if(leaks)bad+=leaks;
console.log(bad?'HALL-NAMES SCAN FAILED':'HALL-NAMES SCAN OK');process.exit(bad?1:0);
