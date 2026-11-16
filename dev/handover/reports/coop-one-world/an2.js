const raw=require('./raw.json');
function flat(o,p,out){if(o&&typeof o==='object'){if(Array.isArray(o)&&o.every(e=>e&&typeof e==='object'&&e.id!=null)){for(const e of o)flat(e,p+'[#'+e.id+']',out);return out}
 for(const k of Object.keys(o))flat(o[k],p+'.'+k,out);if(!Object.keys(o).length)out[p]=Array.isArray(o)?'[]':'{}';return out}out[p]=JSON.stringify(o);return out}
const norm=s=>s.replace(/\.(rl|ro|gp|ep|evm)\.90[12]/,'.$1.ME');
const top=k=>{let m=k.match(/^\.W\.R\[#\d+\]\.([^.\[]+)(\.[^.\[]+)?/);if(m)return 'R.'+m[1]+(['rl','ro','gp','ep','evm','arts','artp','emo'].includes(m[1])&&m[2]?m[2]:'');m=k.match(/^\.W\.S\.([^.\[]+)(\.[^.\[]+)?/);if(m)return 'S.'+m[1]+(m[1]==='emp'||m[1]==='court'?m[2]||'':'');m=k.match(/^\.W\.R\[#(\d+)\]$/);if(m)return 'R(person add/remove)';return k.slice(0,30)};
const agg={};
for(const r of raw){
 const f=[r.H.c0,r.H.c1,r.G.c0,r.G.c1].map(x=>flat(x,'',{}));
 const ch=(a,b)=>{const m={};for(const k of new Set([...Object.keys(a),...Object.keys(b)]))if(a[k]!==b[k])m[norm(k)]=[a[k],b[k]];return m};
 const dH=ch(f[0],f[1]),dG=ch(f[2],f[3]);
 for(const k of new Set([...Object.keys(dH),...Object.keys(dG)])){if(!k.startsWith('.W'))continue;
  const h=dH[k],g=dG[k];const cls=h&&g?(h[1]===g[1]?'same':'DIFF'):g?'G':'H';const t=top(k);agg[t]=agg[t]||{};agg[t][cls]=(agg[t][cls]||0)+1}}
for(const [k,v] of Object.entries(agg).sort())console.log(k.padEnd(28),JSON.stringify(v));
