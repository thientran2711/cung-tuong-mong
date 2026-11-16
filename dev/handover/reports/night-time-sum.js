const fs=require('fs');for(const f of process.argv.slice(2)){const d=JSON.parse(fs.readFileSync(f,'utf8'));const L=d.lives.filter(l=>l.t);const n=L.length;
const s=k=>L.reduce((a,l)=>a+(l.t[k]||0),0);const sv=k=>L.reduce((a,l)=>a+(l[k]||0),0);const yrs=L.reduce((a,l)=>a+Math.min(l.months,120)/12,0);
const tu=s("tuan"),f2=x=>x.toFixed(2),pc=x=>(100*x).toFixed(1)+"%";
const her=s("meFlip")+s("meLedger");
console.log(`== ${f} env ${JSON.stringify(d.env)} lives ${n} life-years ${yrs.toFixed(0)} died-before-end ${L.filter(l=>l.dead).length} errs ${d.errs.length}`);
console.log(`tuần ${tu} | flips: her ${s("meFlip")} npc ${s("npcFlip")} none ${s("noFlip")} | causes tablet ${s("cause_tablet")} custom ${s("cause_custom")} stolen ${s("cause_stolen")} empx ${s("empx")}`);
console.log(`cards on tray (eligible) mean ${f2(s("tray")/(s("cause_tablet")+s("cause_custom")+s("cause_stolen")+s("cause_none")))} | her eligible tuần ${pc(s("eligT")/tu)} | her mean share when eligible ${pc(s("share")/s("eligT"))}`);
console.log(`HER nights/yr ${f2(her/yrs)} (flip ${f2(s("meFlip")/yrs)} + ledger ${f2(s("meLedger")/yrs)}) | per month ${f2(her/yrs/12)} | months with >=1 night ${pc(sv("moWith")/(yrs*12))} | chance per tuần ${pc(her/tu)} (>=1)`);
console.log(`her conception: nights ${s("meN")} mean ch ${f2(s("meC")/Math.max(1,s("meN")))} conceived ${s("meP")} = ${f2(s("meP")/yrs)}/yr | her births ${f2(sv("meB")/yrs)}/yr | NPC: nights ${f2(s("npcN")/sv("consY"))}/consort-yr conc ${f2(s("npcP")/sv("consY"))}/consort-yr births ${f2(sv("npcB")/sv("consY"))}/consort-yr`);
const E=L.filter(l=>l.months>=120);console.log(`end (${E.length} full 10-yr lives): kids alive ${f2(E.reduce((a,l)=>a+l.kids,0)/E.length)} NPC sons ${f2(E.reduce((a,l)=>a+l.npcSons,0)/E.length)} her sons ${f2(E.reduce((a,l)=>a+l.meSons,0)/E.length)} | heir NPC son ${pc(E.filter(l=>l.heirNpc).length/E.length)} her son ${pc(E.filter(l=>l.heirMe).length/E.length)} | any-life her son alive ${pc(L.filter(l=>l.meSons>0).length/n)} | HH reached ${pc(L.filter(l=>l.hh).length/n)}`)}
for(const f of process.argv.slice(2)){const L=JSON.parse(require('fs').readFileSync(f,'utf8')).lives.filter(l=>l.t);if(!L.some(l=>'son1' in l))continue;
 const by=m=>{const at=L.filter(l=>l.months>=m||(l.son1!=null&&l.son1<=m));return at.length?(100*at.filter(l=>l.son1!=null&&l.son1<=m).length/at.length).toFixed(0)+"% (n"+at.length+")":"-"};
 console.log(`${f}: her first son by year 3 ${by(36)} · by year 5 ${by(60)} · by year 10 ${by(120)}`)}
