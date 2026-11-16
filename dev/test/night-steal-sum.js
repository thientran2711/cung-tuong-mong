/* summarise night-steal-bot output: node dev/test/night-steal-sum.js out.json[,out2.json,…] [label]  (comma list = pooled over runs) */
const J=process.argv[2].split(',').map(f=>JSON.parse(require('fs').readFileSync(f))).reduce((a,j)=>({lives:a.lives.concat(j.lives),errs:a.errs.concat(j.errs||[])}),{lives:[],errs:[]});const S={},TR={},EX={};let errs=0;
for(const L of J.lives){if(L.err){errs++;continue}for(const t in L.ex||{})EX[t]=(EX[t]||0)+L.ex[t];for(const k in L)if(k!=="tr"&&k!=="ex"&&k!=="N")S[k]=(S[k]||0)+L[k];for(const t in L.tr){TR[t]=TR[t]||[0,0];TR[t][0]+=L.tr[t][0];TR[t][1]+=L.tr[t][1]}}
const g=k=>S[k]||0,per10=(x,n)=>n?(10*x/n).toFixed(2):"-",pc=(x,n)=>n?(100*x/n).toFixed(1)+"%":"-";
const nN=g("nights"),meN=g("meNights"),npcN=nN-meN;
console.log(`## ${process.argv[3]||""} lives ${J.lives.length} (errors ${errs}, page errors ${J.errs.length}) weeks ${g("weeks")} flip nights ${nN} (hers ${meN}) avg rivals ${(g("rivN")/g("weeks")).toFixed(1)}`);
console.log(`| target | nights | tries | tries / 10 nights | wins | wins / 10 nights | share of nights stolen | tries / tuần |`);
console.log(`|---|---|---|---|---|---|---|---|`);
console.log(`| her night | ${meN} | ${g("try_me")} | ${per10(g("try_me"),meN)} | ${g("win_me")} | ${per10(g("win_me"),meN)} | ${pc(g("win_me"),meN)} | ${(g("try_me")/g("weeks")).toFixed(3)} |`);
console.log(`| NPC night | ${npcN} | ${g("try_npc")} | ${per10(g("try_npc"),npcN)} | ${g("win_npc")} | ${per10(g("win_npc"),npcN)} | ${pc(g("win_npc"),npcN)} | ${(g("try_npc")/g("weeks")).toFixed(3)} |`);
console.log(`| all | ${nN} | ${g("try_me")+g("try_npc")} | ${per10(g("try_me")+g("try_npc"),nN)} | ${g("win_me")+g("win_npc")} | ${per10(g("win_me")+g("win_npc"),nN)} | ${pc(g("win_me")+g("win_npc"),nN)} | ${((g("try_me")+g("try_npc"))/g("weeks")).toFixed(3)} |`);
console.log(`modes: feign ${g("mode_feign")} · road ${g("mode_road")}`);
console.log(`| doer's first trait | NPC-nights present | tries | tries / 100 NPC-nights | wins | win rate |\n|---|---|---|---|---|---|`);
for(const [t,[a,w]] of Object.entries(TR).sort((x,y)=>y[1][0]-x[1][0]))console.log(`| ${t} | ${EX[t]||"-"} | ${a} | ${EX[t]?(100*a/EX[t]).toFixed(2):"-"} | ${w} | ${pc(w,a)} |`);
/* night-steal-2: her row vs an NPC holder of the SAME rank (control: NPC-held nights at each rank she held, weighted by her rank mix).
   printed as the last line; with a comma list of runs it is pooled over them */
{const N=[].concat(...J.lives.map(L=>L.N||[]));const me=N.filter(n=>n[0]),hr={};me.forEach(n=>hr[n[1]]=(hr[n[1]]||0)+1);
 const st=L=>L.length?L.filter(n=>n[3]).length/L.length:NaN,tr=L=>L.length?L.reduce((a,n)=>a+n[2],0)/L.length:NaN;let w=0,cs=0,ct=0,cn=0;
 for(const r in hr){const L=N.filter(n=>!n[0]&&n[1]===+r);if(L.length){w+=hr[r];cs+=hr[r]*st(L);ct+=hr[r]*tr(L);cn+=L.length}}
 console.log(`| her row vs same-rank NPC control | her nights ${me.length} · stolen ${(100*st(me)).toFixed(1)}% · tries/10 ${(10*tr(me)).toFixed(2)} | control nights ${cn} · stolen ${(100*cs/w).toFixed(1)}% · tries/10 ${(10*ct/w).toFixed(2)} | her ranks ${JSON.stringify(hr)} |`)}
