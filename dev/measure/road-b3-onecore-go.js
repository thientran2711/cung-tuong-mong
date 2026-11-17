/* road-b3-onecore-go: B3 stat literals inside chapter code → BAL.road.go[id][i], read by rdGo (jrd_thd header). Run after road-b3-onecore-move. */
/* moves stat-literal objects inside code (go: functions, helpers) of the B3 road fragments into BAL.road.go["<chapter>"][i];
   the source reads rdGo("<chapter>",i) (a fresh copy). usage: node go.js <rdfrag dir> <out json> files… */
const fs=require('fs'),path=require('path');const [dir,out,...files]=process.argv.slice(2);
function mask(s){const o=s.split('');let i=0;const n=s.length;const bl=(a,b)=>{for(let k=a;k<b;k++)if(o[k]!=='\n')o[k]=' '};
 while(i<n){const c=s[i];
  if(c==='/'&&s[i+1]==='*'){const e=s.indexOf('*/',i+2)+2;bl(i,e);i=e;continue}
  if(c==='/'&&s[i+1]==='/'){const e=s.indexOf('\n',i);bl(i,e);i=e;continue}
  if(c==='"'||c==="'"){let j=i+1;while(s[j]!==c){if(s[j]==='\\')j++;j++}bl(i+1,j);i=j+1;continue}
  if(c==='`'){let j=i+1,d=0;while(j<n){if(s[j]==='\\'){j+=2;continue}if(d===0&&s[j]==='`')break;if(s[j]==='$'&&s[j+1]==='{'){d++;j+=2;continue}if(d&&s[j]==='}'){d--;j++;continue}j++}bl(i+1,j);i=j+1;continue}
  i++}return o.join('')}
const ST='(?:th|duc|sung|danh|bac|suc|tamco|tam|tin|tai|mat|an|hh|age|loy|rel|ghen|malice|sac|nt|maid)';
const LIT=new RegExp('\\{\\s*'+ST+'\\s*:\\s*[+-]?\\d+(?:\\.\\d+)?(?:\\s*,\\s*'+ST+'\\s*:\\s*[+-]?\\d+(?:\\.\\d+)?)*\\s*\\}','g');
const table={};
for(const f of files){const fp=path.join(dir,f);let src=fs.readFileSync(fp,'utf8');const m=mask(src);
 const marks=[];for(const r of m.matchAll(/rdDef\(/g)){const a=src.slice(r.index).match(/^rdDef\("(\w+)",(\d+)/);marks.push([r.index,a[1]+'_'+a[2]])}
 for(const r of src.matchAll(/RD97L\.push\(rdRare\(\{a:"(\w+)"/g))marks.push([r.index,r[1]]);for(const r of src.matchAll(/\bARC67\.(\w+)=\{o:"eg"/g))marks.push([r.index,r[1]]);marks.sort((x,y)=>x[0]-y[0]);
 const reps=[];for(const r of m.matchAll(LIT)){const at=r.index;let id=null;for(const [p,k] of marks)if(p<at)id=k;if(!id){console.log('NO CHAPTER',f,src.slice(at,at+60));continue}
  const lit=src.slice(at,at+r[0].length);const T=table[id]=table[id]||[];T.push(Function('return '+lit)());reps.push([at,at+r[0].length,`rdGo("${id}",${T.length-1})`])}
 reps.sort((x,y)=>y[0]-x[0]);for(const [a,b,s] of reps)src=src.slice(0,a)+s+src.slice(b);fs.writeFileSync(fp,src);console.log(f,'literals',reps.length)}
fs.writeFileSync(out,JSON.stringify(table));
