/* one-core-text-move (review/one-core-dup r2): make every player text that TYPES an amount living in BAL.eff / BAL.road / BAL.arc print the
   constant instead: "-15" → ${balSg(BAL.eff.m.k)}, "oán 15" → ${balAb(BAL.eff.m.k)}, "±4" → ±${balAb(…)} (balSg / balAb: dev/build/jbal.js).
   A "…" / '…' string that gains a ${} becomes a `…` template (same text). Sites come from dev/test/one-core-text.js (the guard that finds them).
   usage: node dev/measure/one-core-text-move.js        (proof: dev/measure/one-core-text-same.js)  */
const fs=require('fs'),path=require('path');
const {scan}=require('../test/one-core-text.js');
const B=path.join(__dirname,'..','build');
const sites=scan(B);const by={};for(const s of sites)(by[s.f]=by[s.f]||[]).push(s);
const bad=[];let n=0;
const rep=s=>{const r=s.cands[0].ref;return s.inv&&(s.sg==='+'||s.sg==='-')?s.sg+'${balAb('+r+')}':(s.sg==='+'||s.sg==='-')?'${balSg('+r+')}':s.sg==='±'?'±${balAb('+r+')}':'${balAb('+r+')}'};
for(const f in by){let src=fs.readFileSync(path.join(B,f),'utf8');const E=[];const groups=new Map();
 for(const s of by[f]){if(s.sg==='−'){bad.push(f+':'+s.line+' unicode minus');continue}(groups.get(s.t.a)||groups.set(s.t.a,[]).get(s.t.a)).push(s)}
 for(const [a,L] of groups){const t=L[0].t,sorted=L.slice().sort((x,y)=>y.idx-x.idx);
  if(t.lit){const body=src.slice(a+1,t.b-1);if(body!==t.s){bad.push(f+':'+t.line+' literal with escapes — by hand');continue}
   /* cut the body at the typed numbers, escape the pieces for a template, join with the ${} */
   const esc=x=>x.replace(/`/g,'\\`').replace(/\$\{/g,'\\${');
   let out='',last=body.length;for(const s of sorted){out=rep(s)+esc(body.slice(s.idx+s.sg.length+s.abs.length,last))+out;last=s.idx;n++}
   out=esc(body.slice(0,last))+out;E.push([a,t.b,'`'+out+'`'])}
  else for(const s of sorted){E.push([a+s.idx,a+s.idx+s.sg.length+s.abs.length,rep(s)]);n++}}
 E.sort((x,y)=>y[0]-x[0]);for(const [x,y,r] of E)src=src.slice(0,x)+r+src.slice(y);
 fs.writeFileSync(path.join(B,f),src);console.log(f,E.length,'edits')}
if(bad.length)console.log('HAND:\n  '+bad.join('\n  '));
console.log(n,'amounts now printed from BAL');
