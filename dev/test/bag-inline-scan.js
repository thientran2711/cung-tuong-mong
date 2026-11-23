/* bag-inline-scan (bag-inline-3, law 11 FIX THE WHOLE GROUP): static scan of dev/build/j*.js for item pop-up sites (kitItemCard( calls, kitModal info with itemPic, the old
   kitItemDetail "kidet-strip" beside a grid). Every site must be in the table below with the reason it is allowed; a NEW site (or a changed count) fails, so a new item grid cannot
   ship with a pop-up. usage: node dev/test/bag-inline-scan.js   (prints the before/after table, exit 1 on a new site) */
const fs=require('fs'),path=require('path');const D=path.resolve(__dirname,'../build');
const OK={ // file: [kitItemCard( calls, itemPic: sites, reason]
 'jinv.js':[0,5,'bag tile / slot / veil info: built inside kinvOpen & friends and DIVERTED into the strip by KINL.cap (kinlPick / kinlPickSlot)'],
 'jwdinv.js':[0,3,'WD pieces + slot info: same capture'],
 'jrcp.js':[0,1,'recipe-book item info: same capture'],
 'jecon.js':[0,1,'own work info: same capture (via kinvOpen)'],
 'jmark.js':[0,1,'Dấu ấn info: same capture'],
 'jshelf.js':[0,1,'shelf care = an ACT dialog (Chăm sóc), not item info'],
 'jpet.js':[0,3,'pet dialogs (shop tile card, rule tip): acts/notices; the old petPick info pop-up was dead code and is removed'],
 'jpetcare.js':[0,1,'Chăm pet = act dialog'],'jpetlife.js':[0,2,'pet farewell/notices = notices'],
 'jkrev.js':[0,1,'kitLose notice (centre display, 28.13b)'],
 'jgift.js':[1,1,'kitOtherItem = FALLBACK only when a worn-slot cell has no card/dialog host (kinlWear handles every person card)'],
 'jdisp.js':[2,0,'drawer tile / placed piece go to the strip (kdrShow); kitItemCard stays as its no-strip fallback + the read-only shelf of ANOTHER person (one displayed piece, no grid)'],
 'jitd.js':[2,0,'the generic [data-kid] card: a single picture (shop picture, reward row, event tag) or a pick tile outside any strip; pick tiles inside a strip swap the strip (kinlPickInline)'],
 'jkinl.js':[0,2,'the strip itself'],
};
const files=fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js');const bad=[],rows=[];
for(const f of files){const t=fs.readFileSync(path.join(D,f),'utf8');const strip=t.split('\n').filter(l=>!/^\s*(\/\*|\*)/.test(l)).join('\n');
 const c=(strip.match(/\bkitItemCard\(/g)||[]).length-(/function kitItemCard\(/.test(strip)?1:0),p=(strip.match(/\bitemPic:/g)||[]).length;
 const s=(strip.match(/cls:"kidet-strip/g)||[]).length;
 if(s&&f!=='jkinl.js'&&f!=='jitd.js'&&f!=='jksize.js')bad.push(`${f}: ${s} old kitItemDetail kidet-strip left beside a grid`);
 if(!c&&!p)continue;const a=OK[f];rows.push([f,c,p,a?a[2]:'NOT LISTED']);
 if(!a||c>a[0]||p>a[1])bad.push(`${f}: kitItemCard x${c} itemPic x${p} (allowed ${a?a[0]+'/'+a[1]:'none'})`)}
console.log('file | kitItemCard( | itemPic: | why allowed');for(const r of rows)console.log(r.join(' | '));
console.log(bad.length?'FAIL\n'+bad.join('\n'):'bag-inline-scan PASS');process.exit(bad.length?1:0);
