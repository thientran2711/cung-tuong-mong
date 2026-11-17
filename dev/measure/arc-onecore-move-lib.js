/* arc-onecore-move-lib: shared parsing helpers of the arc movers (dev/measure/arc-onecore-*-move.js), review/one-core-arcs */
function mask(s,keepTplCode){const o=s.split('');let i=0;const n=s.length;const bl=(a,b)=>{for(let k=a;k<b;k++)if(o[k]!=='\n')o[k]=' '};
 const tpl=()=>{/* at the char after ` ; returns index of closing ` */let j=i;let a=j;
  while(j<n){if(s[j]==='\\'){j+=2;continue}if(s[j]==='`'){bl(a,j);return j}
   if(s[j]==='$'&&s[j+1]==='{'){bl(a,j);j+=2;let d=1;/* code until the matching } */
    while(j<n&&d>0){const c=s[j];
     if(c==='"'||c==="'"){let k=j+1;while(s[k]!==c){if(s[k]==='\\')k++;k++}bl(j+1,k);j=k+1;continue}
     if(c==='`'){i=j+1;j=tpl()+1;continue}
     if(c==='{')d++;else if(c==='}')d--;j++}
    if(!keepTplCode)bl(a,j);a=j;continue}
   j++}return j};
 while(i<n){const c=s[i];
  if(c==='/'&&s[i+1]==='*'){const e=s.indexOf('*/',i+2)+2;bl(i,e);i=e;continue}
  if(c==='/'&&s[i+1]==='/'){const e=s.indexOf('\n',i);bl(i,e);i=e;continue}
  if(c==='"'||c==="'"){let j=i+1;while(s[j]!==c){if(s[j]==='\\')j++;j++}bl(i+1,j);i=j+1;continue}
  if(c==='`'){i=i+1;const j=tpl();i=j+1;continue}
  i++}
 return o.join('')}
const close=(m,i)=>{let d=0;for(let j=i;j<m.length;j++){const c=m[j];if('([{'.includes(c))d++;else if(')]}'.includes(c)){d--;if(d===0)return j}}throw Error('unclosed at '+i)};
function members(m,i,arr){const end=close(m,i);const out=[];let j=i+1;
 while(j<end){while(j<end&&/[\s,]/.test(m[j]))j++;if(j>=end)break;let key=null,ks=j;
  if(!arr&&m.startsWith('...',j)){key='...';j+=3}else if(!arr){const km=/^([A-Za-z_$][\w$]*|"[^"]*"|'[^']*')\s*(?::|(?=\())/.exec(m.slice(j,j+80));if(!km)throw Error('no key at '+j+': '+m.slice(j,j+40));key=km[1];j+=km[0].length}
  const vs=j;let d=0;while(j<end){const c=m[j];if('([{'.includes(c))d++;else if(')]}'.includes(c))d--;else if(c===','&&d===0)break;j++}
  out.push({key,ks,vs,ve:j})}
 return out}
const NUMV='[+-]?\\d+(?:\\.\\d+)?';
const AMT=new RegExp('\\b(?:rdOan|rdRel|relAdd|oanAdd|affAdd|kcAf|tdPowAdd|e67(?:dad|bien|kho|heir|ally|pun|foe|drop|merit|srvUp))\\((?:(?:[^()]|\\([^()]*\\))*?[(,])?\\s*(?:[\\w$.!]+\\s*\\?\\s*)?'+NUMV+'(?:\\s*:\\s*'+NUMV+')?\\s*\\)','g');
const TAIL=new RegExp('((?:[\\w$.!]+\\s*\\?\\s*)?)('+NUMV+')(?:(\\s*:\\s*)('+NUMV+'))?\\s*\\)$');
const LIT_STAT=/^\{(\s*[A-Za-z_$]+\s*:\s*-?\d+(\.\d+)?\s*,?)*\s*\}$/;
/* cut "key:value" and one neighbouring comma */
function cutRange(src,x){let a=x.ks,b=x.ve;if(src[b]===',')b++;else{let k=a-1;while(/\s/.test(src[k]))k--;if(src[k]===',')a=k}return [a,b,'']}
/* go closure member x: typed amounts → G[i], G added as the third parameter; returns {G,ed} or null */
function goG(src,mc,x){const a=x.vs,b=x.ve;const seg=mc.slice(a,b);AMT.lastIndex=0;let r;const G=[];const ed=[];
 while((r=AMT.exec(seg))){const t=TAIL.exec(r[0]);if(!t)continue;const end=a+r.index+r[0].length;const p=end-t[0].length+t[1].length;const n1=t[2];
  if(/^[+-]?0$/.test(n1)&&!t[4])continue;ed.push([p,p+n1.length,`G[${G.length}]`]);G.push(+n1);
  if(t[4]!=null){const p2=p+n1.length+t[3].length;ed.push([p2,p2+t[4].length,`G[${G.length}]`]);G.push(+t[4])}}
 if(!G.length)return null;const h=src.slice(a,b);const hm=/^\s*(?:\(([^()]*)\)|([A-Za-z_$][\w$]*))\s*=>/.exec(h);if(!hm)throw Error('go head '+h.slice(0,40));
 const ps=(hm[1]!=null?hm[1]:hm[2]).split(',').map(s=>s.trim()).filter(Boolean);while(ps.length<2)ps.push(ps.length?'_ok':'_A');ps.push('G');
 ed.push([a,a+hm[0].length,`(${ps.join(',')})=>`]);return {G,ed}}
module.exports={mask,close,members,AMT,TAIL,LIT_STAT,cutRange,goG};
