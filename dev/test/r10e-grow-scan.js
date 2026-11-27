/* robot10 E-FIX-3 scan (fix the whole group): which parts of the save grow without bound. Pure node, no browser.
   usage: node dev/test/r10e-grow-scan.js <a.json> <b.json> [years between]   — a/b = two saves (ser() JSON) of the same life, b later.
   Prints JSON chars per S.<key> (top 30) and per R[] field (all rivals summed, top 15), array lengths, and growth per year. */
const fs=require('fs');const [A,B,Y]=process.argv.slice(2);const yrs=+Y||1;
const load=f=>{const d=JSON.parse(fs.readFileSync(f,'utf8'));return d};const a=load(A),b=load(B);
const sz=v=>v==null?0:JSON.stringify(v).length;const len=v=>Array.isArray(v)?v.length:v&&typeof v==='object'?Object.keys(v).length:'';
const S=(d,k)=>d.S[k];const keys=new Set([...Object.keys(a.S),...Object.keys(b.S)]);
const rowsS=[...keys].map(k=>[k,sz(S(a,k)),sz(S(b,k)),len(S(a,k)),len(S(b,k))]).sort((x,y)=>y[2]-x[2]).slice(0,30);
const rf=d=>{const m={};for(const v of d.R||[])for(const k in v){m[k]=m[k]||[0,0];m[k][0]+=sz(v[k]);m[k][1]+=Array.isArray(v[k])?v[k].length:0}return m};
const ra=rf(a),rb=rf(b);const rowsR=[...new Set([...Object.keys(ra),...Object.keys(rb)])].map(k=>[k,(ra[k]||[0])[0],(rb[k]||[0])[0],(ra[k]||[0,0])[1],(rb[k]||[0,0])[1]]).sort((x,y)=>y[2]-x[2]).slice(0,15);
const tot=d=>JSON.stringify(d).length;console.log(`save chars ${tot(a)} → ${tot(b)} (+${Math.round((tot(b)-tot(a))/yrs)} / year) · year ${a.S.year} → ${b.S.year}`);
const pr=(t,R)=>{console.log(`| ${t} | chars a | chars b | +/year | len a | len b |\n|---|---|---|---|---|---|`);for(const r of R)console.log(`| ${r[0]} | ${r[1]} | ${r[2]} | ${Math.round((r[2]-r[1])/yrs)} | ${r[3]} | ${r[4]} |`)};
pr('S.<key>',rowsS);pr('R[].<field> (all rivals)',rowsR);
const P=d=>d.P?sz(d.P):0;console.log(`P (pending) ${P(a)} → ${P(b)} · rivals ${(a.R||[]).length} → ${(b.R||[]).length}`);
