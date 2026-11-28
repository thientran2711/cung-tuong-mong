/* REGARD-SCAN (E-GAIN3-LIVE, law 11): every «regard / trust for someone» wording the game source prints (verb + pronoun), and whether the door gain
   filters know it — OLD = the E-GAIN3b reading («quý ngươi / tin ngươi / thiện cảm»), NEW = DOOR.REG (jdoor.js, read from the file).
   usage: node dev/measure/regard-scan.js  → table; exit 1 when a form is not known by NEW. */
const fs=require('fs'),path=require('path');const D=path.join(__dirname,'../build');
const src=fs.readFileSync(path.join(D,'jdoor.js'),'utf8');const m=src.match(/DOOR\.REG=(\/.*?\/u);/);if(!m){console.error('no DOOR.REG');process.exit(2)}
const NEW=eval(m[1]),OLD=/quý ngươi|thiện cảm|tin ngươi/;
const RX=/(?<![\p{L}])(quý|tin|thương|nể|mến|kính)\s+(ngươi|ta|bổn cung|nàng|chị|em)(?![\p{L}])/gu;const C={};
for(const f of fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f))){const t=fs.readFileSync(path.join(D,f),'utf8');for(const x of t.matchAll(RX)){const k=x[1]+' '+x[2];(C[k]=C[k]||{n:0,f:new Set()}).n++;C[k].f.add(f)}}
let miss=0;console.log('| form | uses | files (first 3) | OLD | NEW |\n|---|---|---|---|---|');
for(const k of Object.keys(C).sort((a,b)=>C[b].n-C[a].n)){const o=OLD.test(k),n=NEW.test(k)||/(chị|em)$/.test(k);if(!n)miss++;
 console.log(`| ${k} | ${C[k].n} | ${[...C[k].f].slice(0,3).join(', ')} | ${o?'yes':'**no**'} | ${NEW.test(k)?'yes':/(chị|em)$/.test(k)?'n/a (kin word, not a pronoun)':'**no**'} |`)}
console.log('forms '+Object.keys(C).length+', not known by NEW '+miss);process.exit(miss?1:0);
