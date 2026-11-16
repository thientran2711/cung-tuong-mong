/* summarise night-steal-bot output: node dev/test/night-steal-sum.js out.json [label] */
const J=JSON.parse(require('fs').readFileSync(process.argv[2]));const S={},TR={},EX={};let errs=0;
for(const L of J.lives){if(L.err){errs++;continue}for(const t in L.ex||{})EX[t]=(EX[t]||0)+L.ex[t];for(const k in L)if(k!=="tr"&&k!=="ex")S[k]=(S[k]||0)+L[k];for(const t in L.tr){TR[t]=TR[t]||[0,0];TR[t][0]+=L.tr[t][0];TR[t][1]+=L.tr[t][1]}}
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
