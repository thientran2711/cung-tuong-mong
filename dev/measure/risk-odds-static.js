/* KC-ODDS-CHIP (27/11, law 7 + law 11): STATIC family scan over every dev/build/j*.js (not all.js): each place that labels an option «có rủi ro» / «liều»
   (risk:"…", .risk="…", kc2H(…,"có rủi ro"), a hint table row) and whether the same statement also carries an odds source (word( / oddsP / odds: / p: /
   kitRiskOpt / chanceW / KIT_ODDS / toilOddsW / oddsLv / odds,). Lines without one are listed for a manual verdict (runtime proof: kc-odds-scan.js for kc,
   dev/test/opt-render.js for the rest). usage: node dev/measure/risk-odds-static.js   (prints a table; exit 0) */
const fs=require('fs'),path=require('path');const D=path.join(__dirname,'../build');
const RISK=/(risk\s*[:=]\s*["'`]?(?:có rủi ro|liều)|["'](?:có rủi ro|liều)["']\s*[\]\)])/;
const ODDS=/word\(|oddsP|\bodds\b|\bp\s*:|kitRiskOpt|chanceW|KIT_ODDS|toilOddsW|oddsLv|oddsCl|kitOdds|rp\(\)/;
const rows=[];for(const f of fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js')){
 const L=fs.readFileSync(path.join(D,f),'utf8').split('\n');
 L.forEach((ln,i)=>{if(!RISK.test(ln))return;const ctx=[L[i-1]||'',ln,L[i+1]||''].join('\n');
  rows.push({f,n:i+1,odds:ODDS.test(ctx),txt:ln.trim().slice(0,110)})})}
const miss=rows.filter(r=>!r.odds);
console.log(`risk-labelled statements: ${rows.length} · with an odds source in ±1 line: ${rows.length-miss.length} · without: ${miss.length}`);
for(const r of miss)console.log(`${r.f}:${r.n}  ${r.txt}`);
