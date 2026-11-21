/* review/kit-rankunit (KIT §48.3): static scan of every dev/build/j*.js string for «title Capitalised Name» — OLD rule (2–4 words) vs NEW rule (3–4 words + place suffix guard + place stoplist).
   Prints the before/after table; exit 1 when the NEW rule still matches a known place/palace/country name. usage: node dev/test/kit-rankunit-scan.js */
const fs=require('fs'),path=require('path');const dir=path.join(__dirname,'../build');
const j79=fs.readFileSync(path.join(dir,'j79.js'),'utf8');
const T=/const KIT_RP_TITLES="([^"]+)"/.exec(j79)[1];
const PL=new RegExp(/const KIT_RP_PLACES=\/(.+)\/;/.exec(j79)[1]);
const oldRe=new RegExp(`(?<![\\p{L}])(${T}) (\\p{Lu}\\p{Ll}+(?: \\p{Lu}\\p{Ll}+){1,3})(?![\\p{L}])`,'gu');
const newRe=new RegExp(`(?<![\\p{L}])(${T}) (\\p{Lu}\\p{Ll}+(?: \\p{Lu}\\p{Ll}+){2,3})(?! (?:cung|điện|khố|viện|quốc|phủ|các|lâu|môn|hiên|quán|sảnh)(?![\\p{L}]))(?![\\p{L}])`,'gu');
const files=fs.readdirSync(dir).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js');const O=new Map(),N=new Map();
for(const f of files){const src=fs.readFileSync(path.join(dir,f),'utf8');let m;oldRe.lastIndex=0;while((m=oldRe.exec(src)))O.set(m[0],(O.get(m[0])||0)+1);newRe.lastIndex=0;while((m=newRe.exec(src))){if(PL.test(m[2]))continue;N.set(m[0],(N.get(m[0])||0)+1)}}
const known=['Ma ma Đức Thọ','Ma ma Càn Ninh','Thái giám Càn Thanh','Thái giám Càn Ninh','Thái giám Dưỡng Tâm','Tổng quản Càn Thanh','Thị vệ Đại Hy','Công chúa Cao Ly','Công chúa Ba Tư','Công chúa Bắc Địch','Cung nữ Tân Giả'];
console.log('| rule | distinct matches | total uses |\n|---|---|---|');const sum=m=>[...m.values()].reduce((a,b)=>a+b,0);
console.log(`| OLD 2–4 words | ${O.size} | ${sum(O)} |\n| NEW 3–4 words + guard + stoplist | ${N.size} | ${sum(N)} |`);
console.log('\nOLD matches that the NEW rule drops (places/palaces/countries):');[...O.keys()].filter(k=>!N.has(k)).slice(0,60).forEach(k=>console.log('  -',k,'x'+O.get(k)));
console.log('\nNEW matches (persons):');[...N.keys()].slice(0,40).forEach(k=>console.log('  +',k,'x'+N.get(k)));
const bad=known.filter(k=>[...N.keys()].some(x=>x.includes(k)));
console.log(bad.length?'\nFAIL still matched: '+bad.join(' | '):'\nPASS: none of the known place names is matched');process.exit(bad.length?1:0);
