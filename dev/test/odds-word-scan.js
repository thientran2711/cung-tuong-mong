/* odds-word-scan (E-ODDS2, law 7 + law 4 + law 11): no player-visible line may print the odds of a REAL roll as a raw word/number.
   Scan of dev/build/j*.js (non-comment lines). Classes:
     FAIL  roll-outcome print: «khả năng …${chanceLo(` / «khả năng đổi ngôi» / typed «khả năng (rất thấp|thấp|vừa|cao|rất cao)» / «xác suất»
           outside the owner-question allow-list below  → must read «(cơ may: ${word(o)})» (KIT_ODDS = BAL.odds.cut, 7 bands).
     LEFT  owner question (Q1, OD:L221/L228, law 16): chanceW/chanceLo side-chance scale in status cells / Được-Mất-Kèm rows. Counted only.
   Allow-list (kept, listed in the report): Kèm rows «kèm: hỏng mà bị lần ra (khả năng ${chanceLo(…)})» jpq/jpoison.
   usage: node dev/test/odds-word-scan.js → exit 1 on any FAIL */
const fs=require('fs'),path=require('path');
const dir=path.join(__dirname,'../build');let bad=0,left=0;const fails=[];const notRoll=[];
const KEM=/kèm: hỏng mà bị lần ra \(khả năng \$\{chanceLo\(/;           /* owner-question Kèm rows */
const RULES=[
 [/khả năng[^`'"\n]{0,30}\$\{chanceLo\(/g,'khả năng ${chanceLo(} print'],
 [/khả năng (đổi ngôi|rất thấp|thấp|vừa|cao|rất cao)\b/g,'typed raw odds word'],
 [/xác suất|tỉ lệ|tỷ lệ/g,'xác suất/tỉ lệ word']];
/* typed «NN %» in a player string: scanned by hand (grep, 0 hits outside CSS/comments); not a source rule (CSS noise) */
const NOTROLL_FILE=/^(jbal2|jbancung|j97|jsmg|jkitpage|jplfs|jopic|jchatl|j72sd|jselxd|jrdcsd|jrd_bd|jtut|jtq14|j23|j79|j84|j13|j64)\.js$/; /* design comments, kit samples, story dialog, mechanic help text */
for(const f of fs.readdirSync(dir).filter(f=>/^j.*\.js$/.test(f))){
 const src=fs.readFileSync(path.join(dir,f),'utf8').split('\n');
 src.forEach((l,i)=>{if(/^\s*(\/\*|\/\/|\*)/.test(l))return;const at=f+':'+(i+1);
  left+=(l.match(/chanceW\(|chanceLo\(/g)||[]).length;
  for(const [re,why] of RULES){re.lastIndex=0;if(!re.test(l))continue;
   if(KEM.test(l)&&why.startsWith('khả năng'))continue;                 /* owner-question Kèm row */
   if(/typeof chanceW==="function"\?chanceW\([^)]*\):"khả năng thấp"/.test(l)){left++;continue}   /* fallback of the side-chance scale = owner question */
   if(NOTROLL_FILE.test(f)||/width|height|margin|padding|translate|flex|calc|gradient|rgba|\bfont|%\)|%;|<style|[{;]\s*\.|background|inset|transform|clamp|minmax|object-/.test(l)){notRoll.push(at+' '+why);continue}
   if(f==='j1.js'&&/CHW=|function chance/.test(l))continue;              /* the side-chance scale definition itself */
   fails.push(at+' ['+why+'] '+l.trim().slice(0,140));bad++}});
}
console.log('side-chance scale calls left for owner (chanceW/chanceLo incl. 2 defs):',left);
console.log('not-odds-of-a-roll hits (design/story/kit/CSS):',notRoll.length);
console.log('FAIL raw odds prints:',fails.length);fails.forEach(x=>console.log('  '+x));
process.exit(bad?1:0);
