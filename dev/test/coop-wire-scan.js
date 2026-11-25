/* coop-wire-scan.js — law 11 scan (robot-coop-fix-1 r2): every co-op test / measure that fakes or spies the WebSocket, and whether it
   sees gzip BINARY frames (Worker BIG 8000 + client GZ 8000 send every frame above 8000 chars as gzip binary).
   usage: node dev/test/coop-wire-scan.js        (exit 1 if a deaf filter or a received-type spy is still string-only) */
const fs=require('fs'),path=require('path');const R=path.join(__dirname,'..','..');
const files=[];for(const d of ['dev/test','dev/test/lib','dev/measure'])for(const f of fs.readdirSync(path.join(R,d)))if(/\.js$/.test(f))files.push(d+'/'+f);
const rows=[];let bad=0;
for(const f of files){const t=fs.readFileSync(path.join(R,f),'utf8');if(f==='dev/test/coop-wire-scan.js')continue;
 const lib=/lib\/coop-wire\.js'\)\.(guestNet|typeSpy)/g;const uses=[...t.matchAll(lib)].map(m=>m[1]);
 const deafStr=/__deafThin&&typeof ev\.data==='string'/.test(t);
 const rxStr=/addEventListener\('message',e=>\{try\{if\(typeof e\.data==='string'\)__rxT/.test(t);
 const txStr=/s\.send=d=>\{try\{if\(typeof d==='string'\)/.test(t);
 const doDeaf=/__deaf&&typeof ev\.data==='string'&&ev\.data\.indexOf\('"t":"do"'\)/.test(t);
 const allDeaf=/__wsDeaf/.test(t);
 if(!(uses.length||deafStr||rxStr||txStr||doDeaf))continue;
 const st=[];if(uses.length)st.push('coop-wire '+[...new Set(uses)].join('+'));if(deafStr){st.push('DEAF string-only');bad++}if(rxStr){st.push('RX spy string-only');bad++}
 if(txStr)st.push('tx spy string-only (own sends: do/act/snapreq < 8000, see note)');if(doDeaf)st.push('host deaf on "do"/"thin" string frames (relayed do/thin < 8000, see note)');if(allDeaf)st.push('__wsDeaf drops every frame (any type)');
 rows.push([f,st.join(' · ')])}
console.log('| file | socket fake / spy |\n|---|---|');for(const [f,s] of rows)console.log('| '+f+' | '+s+' |');
console.log('\nstring-only deaf filters / rx spies left: '+bad);process.exit(bad?1:0);
