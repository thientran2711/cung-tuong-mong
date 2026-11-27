/* TIER-AUDIT classifier over reg.json (ARC67 sets, BAL-filled) → per-set status + family table. Read-only.
   Status per set (law 2 three tiers, OD 27/11 ~00:46Z):
     MERGE      ≥2 real options with the same result kind (same gain keys + same cost keys, sign-wise) → fold into one tier
     CAP        > 3 real options → at most 3 tiers
     UNEQUAL    an option ends the life / leaves the road (exit) while a sibling continues, and the card does not say so
     FLAT       2–3 options, no dup, but cost and result do not rise together (cost order ≠ result order, or all costs equal) → retune as tiers
     OK         2–3 options, distinct results, cost and result rise together (tier-shaped already)
   usage: node classify.js reg.json <repo root> out.tsv */
const fs=require('fs');const [RJ,ROOT,OUT]=process.argv.slice(2);const reg=require(require('path').resolve(RJ)).out.filter(x=>!x.err);
const B=ROOT+'/dev/build/';const idx={};
for(const f of fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f))){const L=fs.readFileSync(B+f,'utf8').split('\n');L.forEach((l,i)=>{const re=/\bh\s*:\s*"([^"]{2,120})"/g;let m;while((m=re.exec(l)))(idx[m[1]]=idx[m[1]]||[]).push(f+':'+(i+1))})}
const rdFile={};for(const f of fs.readdirSync(B).filter(f=>/^j(rd_|67|96|end14|kc3a|orig)/.test(f))){const s=fs.readFileSync(B+f,'utf8');for(const m of s.matchAll(/rdDef\("([\w]+)",\s*(\d+)/g))rdFile[m[1]+'_'+m[2]]=f}
const idL={};for(const f of fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f))){const L=fs.readFileSync(B+f,'utf8').split('\n');L.forEach((l,i)=>{for(const m of l.matchAll(/"id":"([\w]+)"/g))if(!idL[m[1]])idL[m[1]]=f+':'+(i+1)})}
const parse=s=>{const o={};String(s||'').split(',').filter(Boolean).forEach(t=>{const m=t.match(/^(\w+)([+-]\d+(?:\.\d+)?)$/);if(m)o[m[1]]=+m[2]});return o};
const CANCEL=/^(Thôi|Lui|Đóng|Bỏ qua|Để sau)\b/;
const W={bac:0.1,suc:0.5};/* rough weights so bạc 30 ≈ 3 points, Sức 10 ≈ 5 points; other stats 1 */
const mag=o=>Object.entries(o).reduce((a,[k,v])=>a+Math.abs(v)*(W[k]!=null?W[k]:1),0);
const rows=[];
for(const s of reg){const R=s.o.filter(o=>!CANCEL.test(o.n));if(R.length<2)continue;
 const P=R.map(o=>{const c=parse(o.c),w=parse(o.w),l=parse(o.l);const cost=mag(c)+mag(l)*0.5,gain=mag(w);
  const kind='G['+Object.keys(w).filter(k=>w[k]>0).sort().join(',')+']C['+Object.keys(c).sort().join(',')+']';return{n:o.n,c,w,l,cost,gain,kind,ex:o.ex,f:o.f,od:o.od}});
 const grp={};P.forEach(p=>{if(p.kind!=='G[]C[]')(grp[p.kind]=grp[p.kind]||[]).push(p)});
 /* look-alikes = same result kind AND near-equal size (cost and gain within 25 %); a same-kind group whose cost and gain both rise is a tier LADDER (kept) */
 const near=(a,b)=>Math.abs(a-b)<=Math.max(1,0.25*Math.max(a,b));
 const dup=[];let ladder=0;for(const g of Object.values(grp)){if(g.length<2)continue;const L=[];for(let i=0;i<g.length;i++)for(let j=i+1;j<g.length;j++)if(near(g[i].cost,g[j].cost)&&near(g[i].gain,g[j].gain)){if(!L.includes(g[i]))L.push(g[i]);if(!L.includes(g[j]))L.push(g[j])}
  if(L.length)dup.push(L.map(p=>p.n));else ladder=1}
 const exMix=P.some(p=>p.ex)&&P.some(p=>!p.ex);
 const byC=[...P].sort((a,b)=>a.cost-b.cost);let mono=true;for(let i=1;i<byC.length;i++)if(byC[i].gain<byC[i-1].gain-0.01)mono=false;
 const distinctC=new Set(P.map(p=>Math.round(p.cost*10))).size===P.length;
 let st=P.length>3?'CAP':dup.length?'MERGE':exMix?'UNEQUAL':((mono&&distinctC)||ladder)?'OK':'FLAT';
 const where=(idx[s.h]||[])[0]||idL[s.id]||idL[s.id.replace(/_\d+$/,'')]||rdFile[s.id]||'';
 rows.push({src:s.src,id:s.id,path:s.path,h:s.h,where,st,n:P.length,dup,exMix,P})}
const fam=r=>r.id.replace(/_\d+$/,'').replace(/^((?:tm96|noi14|hau14|ke14|s|st)[a-z]?)\d*$/,'$1');
const T={};for(const r of rows){const k=r.src+':'+fam(r);const t=T[k]=T[k]||{sets:0,OK:0,FLAT:0,MERGE:0,CAP:0,UNEQUAL:0,file:''};t.sets++;t[r.st]++;if(!t.file&&r.where)t.file=r.where.split(' ')[0].split(':')[0]}
const fmt=o=>Object.entries(o).map(([k,v])=>k+(v>0?'+':'')+v).join(' ');
fs.writeFileSync(OUT,['src\tid\tpath\twhere\ttitle\tstatus\tn\tsameResult\toptions (cost | win | loss)'].concat(rows.map(r=>[r.src,r.id,r.path,r.where,r.h,r.st,r.n,r.dup.map(g=>g.join(' = ')).join(' ; '),
 r.P.map(p=>`${p.n} [${fmt(p.c)} | ${fmt(p.w)} | ${fmt(p.l)}]${p.ex?' EXIT':''}`).join(' ‖ ')].join('\t'))).join('\n'));
const tot={sets:rows.length};for(const r of rows)tot[r.st]=(tot[r.st]||0)+1;console.log(JSON.stringify(tot));
for(const [k,t] of Object.entries(T).sort((a,b)=>b[1].sets-a[1].sets))console.log([k,t.file,t.sets,t.OK,t.FLAT,t.MERGE,t.CAP,t.UNEQUAL].join('\t'));
