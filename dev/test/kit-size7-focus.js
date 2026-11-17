/* kit-size7-focus.js — owner 16/11 19:54Z (focal crop, whole group): EVERY event picture (img/ev-*, img/info-*, img/act-cat-* in assets.json)
   has a subject box in KIT_PIC_SUBJ (jksize.js), and every box is valid (0 ≤ x0 < x1 ≤ 1, 0 ≤ y0 < y1 ≤ 1).
   usage: node dev/test/kit-size7-focus.js [repo root=.]   exit 1 on a missing / bad box */
const fs=require('fs'),path=require('path');const R=process.argv[2]||'.';
const js=fs.readFileSync(path.join(R,'dev/build/jksize.js'),'utf8');const m=/const KIT_PIC_SUBJ=(\{.*?\});/s.exec(js);if(!m){console.error('KIT_PIC_SUBJ not found');process.exit(1)}
const B=JSON.parse(m[1].replace(/:\[\./g,':[0.').replace(/,\./g,',0.'));
const A=fs.readFileSync(path.join(R,'assets.json'),'utf8');const pics=[...new Set([...A.matchAll(/"img\/((?:ev-|info-|act-cat-)[^"\/]+)\.webp"/g)].map(x=>x[1]))];
const miss=pics.filter(p=>!B[p]),bad=Object.entries(B).filter(([k,b])=>!(b.length===4&&b[0]>=0&&b[2]<=1&&b[1]>=0&&b[3]<=1&&b[0]<b[2]&&b[1]<b[3]));
console.log(`event pictures ${pics.length} · boxes ${Object.keys(B).length} · missing ${miss.length} · bad ${bad.length}`);if(miss.length)console.log('missing:',miss.join(' '));if(bad.length)console.log('bad:',bad.map(x=>x[0]).join(' '));
process.exit(miss.length||bad.length?1:0)
