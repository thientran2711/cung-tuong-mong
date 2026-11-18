import {merge3} from '/home/user/wt/oneworld/coop/worker/src/merge.js';
import fs from 'fs';const raw=JSON.parse(fs.readFileSync('./raw.json'));
const F=["bac","suc","dad","danh","duc","sung","pg"];const st={};
for(const r of raw){const base=r.H.c0.W,A=r.H.c1.W,B=r.G.c1.W;
 /* guest base/result use pid 902 maps; align: put guest's own rel rows aside (not needed for these numeric fields) */
 const M=merge3(base,A,B);
 for(const v of base.R){const a=A.R.find(x=>x.id===v.id),b=B.R.find(x=>x.id===v.id),m=M.R.find(x=>x.id===v.id);if(!a||!b||!m)continue;
  for(const f of F){if(typeof v[f]!=='number')continue;const dA=a[f]-v[f],dB=b[f]-v[f],dM=m[f]-v[f];if(dA&&dB){st[f]=st[f]||[];st[f].push(`${v.id}: base ${v[f]} host ${a[f]} guest ${b[f]} -> merged ${m[f]}`)}}}
 const s=['thO','trieu','emp'];for(const k of s){}
 const tH=JSON.stringify(base.S.trieu&&base.S.trieu.H),mH=JSON.stringify(M.S.trieu&&M.S.trieu.H);st.trieuH=st.trieuH||[];st.trieuH.push('base '+tH.slice(0,120)+'\n   host '+JSON.stringify(A.S.trieu.H).slice(0,120)+'\n   guest '+JSON.stringify(B.S.trieu.H).slice(0,120)+'\n   merged '+mH.slice(0,120));
 st.mood=st.mood||[];st.mood.push(`emp.mood base ${base.S.emp.mood} host ${A.S.emp.mood} guest ${B.S.emp.mood} merged ${M.S.emp.mood}`);
}
for(const k in st)console.log('##',k,'\n'+st[k].slice(0,4).join('\n'));
