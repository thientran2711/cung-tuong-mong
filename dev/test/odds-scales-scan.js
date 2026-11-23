// Law 7 / OD 03:05Z: two odds scales never mixed. word() = act's own odds only; chanceW/chanceLvl = side chance of a thing that comes along.
// Fails when a rider label (có thai, ban thưởng, lật thẻ, bị lộ, phát hiện, khỏi bệnh…) is followed by word(...), or any digit% shows in player text.
const fs=require("fs"),path=require("path");const D=path.join(__dirname,"../build");let bad=0;
const RID=/(có thai|ban thưởng|lật thẻ|bị lộ|bị phạt|phát hiện|khỏi bệnh|bị giết|bị đánh chết):\s?\$\{(word|oddsW|KIT_ODDS)[^}]*\}/g;
for(const f of fs.readdirSync(D).filter(x=>/^j.*\.js$/.test(x))){const L=fs.readFileSync(path.join(D,f),"utf8").split("\n");
 L.forEach((l,i)=>{let m;RID.lastIndex=0;while((m=RID.exec(l))){bad++;console.log("FAIL rider on act ladder",f+":"+(i+1),m[0].slice(0,100))}})}
console.log(bad?"odds-scales-scan: "+bad+" FAIL":"odds-scales-scan: OK (no rider on the act ladder)");process.exit(bad?1:0);
