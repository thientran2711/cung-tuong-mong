// staff-cap-table: average and worst-case servant totals per candidate table (MEASURE ONLY).
// usage: node dev/measure/staff-cap-table-count.js <snaps.json from staff-caps-count.js>
// Average: each bot snapshot's live rank mix (her + live NPC consorts, cold palace, queen=7, Thái hậu alive) x the table.
// Worst case: the 8 chủ vị of OD 17/11 04:32Z (HH, HQP, QP, Phi x2, Tần x3) + every other consort at Quý nhân + Thái hậu alive.
const T=require('./staff-cap-tables.js');const J=JSON.parse(require('fs').readFileSync(process.argv[2],'utf8'));
const row=(t,r)=>r==="cold"?[1,0]:t.cap[r];
const count=(t,ranks,th)=>{let m=0,e=0;for(const r of ranks){const c=row(t,r);m+=c[0];e+=c[1]}if(th){m+=t.capTh[0];e+=t.capTh[1]}return[m,e]};
const worst=N=>{const SEAT=[7,6,5,4,4,3,3,3];const L=[];for(let i=0;i<N;i++)L.push(i<SEAT.length?SEAT[i]:2);return L};
const out={};for(const [k,t] of Object.entries(T)){out[k]={note:t.note};for(const m of [0,24,60]){const S=J.snaps.filter(s=>s.m===m);
  const c=S.map(s=>count(t,s.ranks,s.th));const n=S.length;out[k]['m'+m]={n,cons:+(S.reduce((a,s)=>a+s.ranks.length,0)/n).toFixed(1),maids:+(c.reduce((a,x)=>a+x[0],0)/n).toFixed(1),eun:+(c.reduce((a,x)=>a+x[1],0)/n).toFixed(1),tot:+(c.reduce((a,x)=>a+x[0]+x[1],0)/n).toFixed(1),max:Math.max(...c.map(x=>x[0]+x[1]))}}
 for(const N of [12,16,20]){const c=count(t,worst(N),true);out[k]['w'+N]={maids:c[0],eun:c[1],tot:c[0]+c[1]}}}
console.log(JSON.stringify(out,null,0).replace(/\},"/g,'},\n"'));
