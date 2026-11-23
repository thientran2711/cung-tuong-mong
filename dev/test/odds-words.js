/* the odds ladder words for node-side test code, read from the ONE source dev/build/j0.js (KIT_ODDS / KIT_ODDS_OLD / KIT_ODDS_ALT) — tests never type the ladder.
   W = the 7 shown words (index = rung), ALL = shown + parse-only old words, ALT = regex alternation (longest first), RE = any ladder word as a whole word */
const fs=require('fs'),path=require('path');const src=fs.readFileSync(path.join(__dirname,'../build/j0.js'),'utf8');
const pick=n=>{const m=src.match(new RegExp('^const '+n+'=.*$','m'));if(!m)throw new Error('odds-words: '+n+' not in j0.js');return m[0]};
const O=new Function(pick('KIT_ODDS')+';'+pick('KIT_ODDS_OLD')+';'+pick('KIT_ODDS_ALT')+';return{W:KIT_ODDS,OLD:KIT_ODDS_OLD,ALT:KIT_ODDS_ALT}')();
O.ALL=O.W.concat(Object.keys(O.OLD));O.RE=new RegExp('(?<![\\p{L}])(?:'+O.ALT+')(?![\\p{L}])','u');module.exports=O;
