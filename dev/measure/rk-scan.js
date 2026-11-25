/* pcport-rk scan: every figure-rk READER (f.rk / p.rk / .rk.split|slice|test|match) and WRITER (rk: / .rk= in a figure builder) in dev/build/j*.js.
   READER must go through rkStr(f); WRITER from rkOfFace must go through rkCanon(). Literal-string writers are canonical. Exit 1 = a raw reader left. */
const fs=require('fs'),path=require('path');const D=path.join(__dirname,'../build');let bad=0;const rows=[];
for(const f of fs.readdirSync(D).filter(x=>/^j.*\.js$/.test(x)&&!/^jbal/.test(x))){fs.readFileSync(path.join(D,f),'utf8').split('\n').forEach((l,i)=>{
 const rd=l.match(/\b(f|p)\.rk\.(split|slice|match|replace)|test\(f\.rk|String\(f\.rk|String\(p\.rk|typeof f\.rk/);if(rd){rows.push(['READER-RAW',f+':'+(i+1),rd[0]]);bad++}
 if(/rkStr\(/.test(l))rows.push(['reader-ok',f+':'+(i+1),'rkStr']);
 const w=l.match(/rk:(rkCanon\(|"[a-z0-9 ]*"|S\.out\?"cold":rkCanon|k==="tq"\?"eu3":"eu2"|g\[0\])/);if(w)rows.push([/g\[0\]/.test(w[0])&&!/rkCanon/.test(l)?'WRITER-RAW':'writer-ok',f+':'+(i+1),w[0]]);if(w&&/g\[0\]/.test(w[0])&&!/rkCanon/.test(l)){bad++}})}
console.table(rows.map(r=>({kind:r[0],at:r[1],how:r[2]})));console.log(bad?'FAIL '+bad:'PASS');process.exit(bad?1:0);
