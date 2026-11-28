/* tier-b2-retune (WORKLIST row 42 batch 2, review/f-tier-b2): law 2 TIERED CHOICES (NHẸ · VỪA · NẶNG, owner 27/11 ~00:46Z) for the
   FLAT beats of the tier audit (dev/handover/reports/tier-audit.md v2 99ead418, arc.tsv status FLAT), BAL ONLY (law 4): rewrites the
   option numbers (c Tốn / w Được / l Mất) of those beats where the rulebook holds them — BAL.road.fx / BAL.arc.fx in dev/build/jbalroad.js,
   jbalarc.js, jbalbd.js (Bắc Địch roads), jbalpt.js (Phù Tang roads). No text, no option removed, odds / Lợi thế / go amounts untouched.
   Rule per beat (the real options: the cancel words «Thôi / Lui / Đóng / Bỏ qua / Để sau» untouched):
     1. order the options by what they cost today (the audit's scale: Tốn + ½ Mất, bạc ×0.1, Sức ×0.5, other stats ×1), cheapest first;
     2. option j gets step BAL.road.tier3.step[j] (2 options: steps 1–2, 3 options: 1–2–3) of the beat's unit U = the beat's own size
        (Σ cost + Σ gain) / (2 Σ steps), never below BAL.road.tier3.unit; its cost and its gain are both scaled to step × U (same stat
        keys and signs; Tai mắt = informants counted in people stays, BAL.road.tier3.keep) → Tốn and Được / Mất rise together by tier;
     3. law 3: an option with no Được gets one (BAL.road.tier3.gain: the first key of that list it does not pay — Tâm cơ, the craft any act
        teaches; never Đức, which a wicked deed must not earn); a free option that is not the cheapest pays BAL.road.tier3.cost (Sức);
     4. bạc moves in tens, every amount at least one unit; a rounding tie is nudged until cost and gain strictly rise.
   Bạc roads (law 2 last clause): every beat with a bạc option already gets a road WITHOUT silver with the same Được and Lợi thế at run
   time (jstory.js opts67 → ALT67 / altOf67, its Sức priced by what the silver is worth, BAL.altK) — reused, not rebuilt; this script
   only counts the beats that hold two bạc options (altOf67 copies the first one).
   Arcs (every ARC67 entry that is not a road chapter «<road>_<n>», o:"rd"): j67 halves story Sức / Hoàng hậu costs and losses at run
   time, so the tiers are set on the PLAYED value and the rulebook holds 2× (min(−1, round(x/2)) gives the played value back exactly).
   Where the rulebook writes an option with a shape helper (bdR / bdS / pfR / pfS: arguments rewritten; other helpers: Object.assign(<call>,
   {c,w,l}) so the helper's own BAL defaults stay referenced), the edit keeps the helper.
   usage: node dev/tools/tier-b2-retune.js <arc.tsv> <reg.json> [--write] [--list out.json] [--v]
     arc.tsv = the audit table (handover branch dev/handover/reports/tier-audit/arc.tsv); reg.json = regdump.js output (same folder) of
     the build the table was made from. Prints the plan table; --write edits the BAL files; --list writes every planned option (its
     tier and played target numbers) for the robot proof dev/measure/tier-b2-same.js. */
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..'),FILES=['jbalroad.js','jbalarc.js','jbalbd.js','jbalpt.js'].map(f=>ROOT+'/dev/build/'+f);
const args=process.argv.slice(2),WRITE=args.includes('--write'),LI=args.indexOf('--list'),LIST=LI>=0?args[LI+1]:null,V=args.includes('--v');
const [TSV,REG]=args.filter((a,i)=>!a.startsWith('--')&&args[i-1]!=='--list');
const lit=v=>Array.isArray(v)?'['+v.map(lit).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).map(k=>(/^[A-Za-z_$][\w$]*$/.test(k)?k:JSON.stringify(k))+':'+lit(v[k])).join(',')+'}':JSON.stringify(v);
const SRC=FILES.map(f=>fs.readFileSync(f,'utf8'));
/* ---- BAL.road.tier3 (steps, unit floor, added gain / cost keys) read from jbalroad.js itself (law 4: no number typed in this script) ---- */
const T3=Function('return '+SRC[0].match(/\btier3:(\{[^\n]*?\}),\s*\/\*T3\*\//)[1])();
/* ---- a small JS reader: matching bracket (strings and comments skipped), top-level split ---- */
function close(s,i){const O='([{',C=')]}';let d=0;for(;i<s.length;i++){const ch=s[i];
  if(ch==='"'||ch==="'"||ch==='`'){const q=ch;for(i++;i<s.length&&s[i]!==q;i++)if(s[i]==='\\')i++;continue}
  if(ch==='/'&&s[i+1]==='*'){i=s.indexOf('*/',i+2)+1;continue}if(ch==='/'&&s[i+1]==='/'){i=s.indexOf('\n',i);continue}
  if(O.includes(ch))d++;else if(C.includes(ch)){d--;if(!d)return i}}return -1}
function parts(s,a,b){/* the top-level items between s[a] (an opening bracket) and s[b] (its closing one) → [[start,end)…] */
 const R=[];let st=a+1;for(let i=a+1;i<b;i++){const ch=s[i];
  if('([{'.includes(ch)||ch==='"'||ch==="'"||ch==='`'){i=('([{'.includes(ch)?close(s,i):(()=>{let j=i+1;for(;j<s.length&&s[j]!==ch;j++)if(s[j]==='\\')j++;return j})());continue}
  if(ch==='/'&&s[i+1]==='*'){i=s.indexOf('*/',i+2)+1;continue}if(ch===','){R.push([st,i]);st=i+1}}
 if(s.slice(st,b).trim())R.push([st,b]);return R.map(([x,y])=>{for(;;){while(/\s/.test(s[x]))x++;if(s[x]==='/'&&s[x+1]==='*')x=s.indexOf('*/',x)+2;else break}while(y>x&&/\s/.test(s[y-1]))y--;return [x,y]})}
/* find «<id>:{» whose object holds «<bk>:[» at its top level, in any of the BAL files → {f, a, b, items} (the beat array and its items) */
function findBeat(id,bk){let hits=[];SRC.forEach((s,f)=>{const re=new RegExp('(^|[\\s,{])'+id+':\\{','g');let m;
  while((m=re.exec(s))){const o=s.indexOf('{',m.index+m[1].length+id.length);const e=close(s,o);if(e<0)continue;
   for(const [x,y] of parts(s,o,e)){const k=s.slice(x,y).match(/^(\w+)\s*:\s*\[/);if(k&&k[1]===bk){const a=s.indexOf('[',x);hits.push({f,a,b:close(s,a)})}}}});
 /* BAL.arc.h96 holds the tư tình adj96 amounts under the same arc / beat keys (not option numbers): never a rulebook copy */
 const H96=[];SRC.forEach((s,f)=>{const i=s.indexOf('h96:{');if(i>=0)H96.push([f,i,close(s,i+4)])});
 hits=hits.filter(h=>!H96.some(([f,a,b])=>f===h.f&&h.a>a&&h.a<b));
 if(hits.length!==1)return {err:hits.length?hits.length+' rulebook copies':'no rulebook row'};const h=hits[0];h.items=parts(SRC[h.f],h.a,h.b);return h}
/* road aliases: the old Bắc Địch premises play the Cao Ly chapters (jrd_nc.js nc_tail); ch_ho after the Thái hậu's death: ch_hoD (jrd_ch.js) */
const ALIAS={bd_hoa:'nc_su',bd_ngua:'nc_gian',bd_tuc:'nc_tuc',bd_hoang:'nc_vuong'};
const ruleId=(id,bk)=>{const m=id.match(/^(bd_(?:hoa|ngua|tuc|hoang))_(\d+)$/);if(m)return ALIAS[m[1]]+'_'+m[2];if(/^ch_ho_\d+$/.test(id)&&/D$/.test(bk))return 'ch_hoD';return id};
/* ---- the audit rows + the runtime option lists ---- */
const reg=JSON.parse(fs.readFileSync(REG,'utf8')).out.filter(x=>!x.err&&x.src==='ARC67');const regBy={};for(const s of reg)regBy[s.id+'|'+s.path]=s;
const tsv=fs.readFileSync(TSV,'utf8').split('\n').slice(1).map(l=>l.split('\t')).filter(r=>r[5]==='FLAT');
const CANCEL=/^(Thôi|Lui|Đóng|Bỏ qua|Để sau)\b/,W={bac:0.1,suc:0.5};
const wt=k=>W[k]!=null?W[k]:1,mag=o=>Object.entries(o||{}).reduce((a,[k,v])=>a+Math.abs(v)*wt(k),0);
const parse=s=>{const o={};String(s||'').split(',').filter(Boolean).forEach(t=>{const m=t.match(/^(\w+)([+-]\d+(?:\.\d+)?)$/);if(m)o[m[1]]=+m[2]});return o};
const cost=p=>mag(p.c)+0.5*mag(p.l),gain=p=>mag(p.w);
const unitOf=k=>k==='bac'?10:1;/* amounts are whole; bạc moves in tens */
function setMag(o,target,add){/* scale o's amounts to the target size; the kept stats (BAL.road.tier3.keep) stay as they are and the rest of
   the target goes to the other keys, or to the make-up key «add» when there are none */
 const r={},keep=Object.keys(o).filter(k=>T3.keep.includes(k)),rest=Object.keys(o).filter(k=>!T3.keep.includes(k));keep.forEach(k=>r[k]=o[k]);
 const F=keep.reduce((a,k)=>a+Math.abs(o[k])*wt(k),0),R=target-F,m=rest.reduce((a,k)=>a+Math.abs(o[k])*wt(k),0);
 if(m){const f=Math.max(0,R)/m;for(const k of rest){const u=unitOf(k);r[k]=Math.sign(o[k])*Math.max(u,Math.round(Math.abs(o[k])*f/u)*u)}}
 else if(R>=1&&add){const [k,sg]=add,u=unitOf(k);r[k]=sg*Math.max(u,Math.round(R/wt(k)/u)*u)}
 return r}
const kind=p=>Object.keys(p.w).filter(k=>p.w[k]>0).sort()+'|'+Object.keys(p.c).sort(),near=(x,y)=>Math.abs(x-y)<=Math.max(1,0.25*Math.max(x,y));
function bump(o){let ks=Object.keys(o).filter(k=>!T3.keep.includes(k));if(!ks.length)ks=Object.keys(o);if(!ks.length)return false;ks.sort((a,b)=>Math.abs(o[b])*wt(b)-Math.abs(o[a])*wt(a));o[ks[0]]+=Math.sign(o[ks[0]])*unitOf(ks[0]);return true}
const plan=[],skip=[],twoBac=[],done=new Set(),edits=[];
for(const r of tsv){const [src,id,p,where]=r;const tag=id+' '+p;
 if(/^jrdcsd/.test(where)){skip.push([tag,'composed road (jroadc rule = batch 1, E-TIER-B13)']);continue}
 const bk=(p.match(/^B\.(\w+)\.o$/)||[])[1];if(!bk){skip.push([tag,'path not B.<beat>.o']);continue}
 const rid=ruleId(id,bk),key=rid+'.'+bk;
 const s=regBy[id+'|'+p];if(!s){skip.push([tag,'not in reg.json']);continue}
 if(done.has(key)){plan.find(q=>q.key===key).also.push(tag);continue}
 const h=findBeat(rid,bk);if(h.err){skip.push([tag,h.err]);continue}done.add(key);
 const halved=!/_\d+$/.test(id);/* j67 halves every ARC67 arc except the road chapters (o:"rd") */
 const idx=s.o.map((o,i)=>i).filter(i=>!CANCEL.test(s.o[i].n));
 const P=idx.map(i=>({i,n:s.o[i].n,c:parse(s.o[i].c),w:parse(s.o[i].w),l:parse(s.o[i].l)}));
 if(P.length<2||P.length>3){skip.push([tag,P.length+' real options']);continue}
 if(P.filter(q=>(q.c.bac||0)<0).length>1)twoBac.push(tag);
 /* 1 + 3: order by today's cost; a gain for every option (law 3); a free option above the cheapest pays a small cost */
 P.sort((a,b)=>cost(a)-cost(b)||gain(a)-gain(b)||a.i-b.i);
 P.forEach((q,j)=>{if(!gain(q)){const k=T3.gain.find(k=>!(k in q.c))||T3.gain[0];q.w={[k]:1};q.addG=k}
  if(!cost(q)&&j>0){q.c={...q.c,[T3.cost]:-1};q.addC=T3.cost}});
 /* 2: scale to step × U */
 const st=T3.step.slice(0,P.length),S=st.reduce((a,b)=>a+b,0);
 const U=Math.max(T3.unit,Math.round(P.reduce((a,q)=>a+cost(q)+gain(q),0)/(2*S)*2)/2);
 P.forEach((q,j)=>{const c0=cost(q);if(c0){const f=st[j]*U/c0;const lc=mag(q.c),ll=mag(q.l);q.c=setMag(q.c,lc?lc*f:0,lc?[T3.cost,-1]:null);q.l=setMag(q.l,ll*f,null)}
  const gk=T3.gain.find(k=>!(k in q.c))||T3.gain[0];q.w=setMag(q.w,st[j]*U,[gk,1])});
 /* 4: strictly rising after rounding (the dearer option is nudged up) */
 for(let it=0;it<60;it++){let ok=true;for(let j=1;j<P.length;j++){const a=P[j-1],b=P[j];
   if(cost(b)-cost(a)<0.1){ok=false;bump(Object.keys(b.c).length?b.c:b.l)}if(gain(b)-gain(a)<0.1){ok=false;bump(b.w)}}
  /* no two options of the same kind (same gained keys + same cost keys) at a near size (±25 %, the audit's MERGE test): the dearer grows */
  for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const a=P[i],b=P[j];if(kind(a)===kind(b)&&near(cost(a),cost(b))&&near(gain(a),gain(b))){ok=false;bump(Object.keys(b.c).length?b.c:b.l);bump(b.w)}}
  if(ok)break}
 const ok=P.every((q,j)=>!j||(cost(q)>cost(P[j-1])&&gain(q)>gain(P[j-1])))&&!P.some((a,i)=>P.some((b,j)=>j>i&&kind(a)===kind(b)&&near(cost(a),cost(b))&&near(gain(a),gain(b))));
 plan.push({key,id,bk,tag,title:r[4],where,U,ok,halved,h,also:[],P:P.map((q,j)=>({i:q.i,n:q.n,tier:j+1,c:q.c,w:q.w,l:q.l,addG:q.addG,addC:q.addC}))})}
/* ---- the edit of one option token ---- */
const twice=(o,halved)=>{const y={...o};if(halved)for(const k of ['suc','hh'])if(y[k]<0)y[k]*=2;return y};
function newTok(s,[x,y],p,halved){const t=s.slice(x,y),C=lit(twice(p.c,halved)),Wt=lit(p.w),L=lit(twice(p.l,halved)),hasL=Object.keys(p.l).length>0;
 if(t==='0')return '{c:'+C+',w:'+Wt+(hasL?',l:'+L:'')+'}';
 if(t[0]==='{'){const e=close(s,x);const it=parts(s,x,e);const seen={};let out=it.map(([a,b])=>{const kv=s.slice(a,b),k=(kv.match(/^(\w+)\s*:/)||[])[1];
   if(k==='c'){seen.c=1;return 'c:'+C}if(k==='w'){seen.w=1;return 'w:'+Wt}if(k==='l'){seen.l=1;return 'l:'+L}return kv});
  if(!seen.c)out.unshift('c:'+C);if(!seen.w)out.splice(1,0,'w:'+Wt);if(!seen.l&&hasL)out.push('l:'+L);return '{'+out.join(',')+'}'}
 const m=t.match(/^(\w+)\(/);if(!m)return null;const o=x+m[0].length-1,e=close(s,o),A=parts(s,o,e).map(([a,b])=>s.slice(a,b));
 if(/^(bdG|pfG)$/.test(m[1])){const [a,b]=parts(s,o,e)[0];const inner=newTok(s,[a,b],p,halved);return inner&&m[1]+'('+inner+','+A.slice(1).join(',')+')'}
 if(/^(bdR|pfR)$/.test(m[1])&&A.length>=3){A[1]=Wt;A[2]=hasL?L:'{}';A[3]=C;return m[1]+'('+A.join(',')+')'}/* (stat, w, l, c, base) */
 if(/^(bdS|pfS)$/.test(m[1])&&A.length===2&&!hasL)return m[1]+'('+C+','+Wt+')';/* (c, w) */
 return 'Object.assign('+t+',{c:'+C+',w:'+Wt+(hasL?',l:'+L:'')+'})'}
for(const q of plan){const s=SRC[q.h.f],it=q.h.items;for(const p of q.P){
  if(p.i<it.length){const t=newTok(s,it[p.i],p,q.halved);if(t==null){q.ok=false;q.err='token '+s.slice(...it[p.i]).slice(0,30);continue}edits.push({f:q.h.f,a:it[p.i][0],b:it[p.i][1],t})}
  else{const pad=',0'.repeat(p.i-it.length)+','+newTok('0',[0,1],p,q.halved);edits.push({f:q.h.f,a:it[it.length-1][1],b:it[it.length-1][1],t:pad})}}}
if(WRITE){for(let f=0;f<FILES.length;f++){let s=SRC[f];for(const e of edits.filter(e=>e.f===f).sort((a,b)=>b.a-a.a))s=s.slice(0,e.a)+e.t+s.slice(e.b);if(s!==SRC[f])fs.writeFileSync(FILES[f],s)}}
if(LIST)fs.writeFileSync(LIST,JSON.stringify(plan.map(q=>({key:q.key,rows:[q.tag].concat(q.also),title:q.title,U:q.U,ok:q.ok,P:q.P})),null,0));
const by={};for(const q of plan){const f=q.where.split(':')[0];const b=by[f]=by[f]||{beats:0,rows:0,ok:0,addG:0,addC:0};b.beats++;b.rows+=1+q.also.length;b.ok+=q.ok?1:0;q.P.forEach(p=>{if(p.addG)b.addG++;if(p.addC)b.addC++})}
console.log('| file | rulebook beats retuned | FLAT rows covered | cost + gain strictly rise | gains added (law 3) | costs added |');console.log('|---|---|---|---|---|---|');
for(const [f,b] of Object.entries(by).sort())console.log(`| ${f} | ${b.beats} | ${b.rows} | ${b.ok} | ${b.addG} | ${b.addC} |`);
console.log(`FLAT rows ${tsv.length} · rulebook beats ${plan.length} covering ${plan.reduce((a,q)=>a+1+q.also.length,0)} rows · not rising ${plan.filter(q=>!q.ok).length} · option edits ${edits.length} · skipped rows ${skip.length} · beats with 2 bạc options ${twoBac.length}`);
const sk={};skip.forEach(([t,w])=>sk[w]=(sk[w]||0)+1);console.log('skipped by reason:',JSON.stringify(sk));
if(V){skip.forEach(s=>console.log('  skip',s.join(' — ')));plan.filter(q=>!q.ok).forEach(q=>console.log('  not rising',q.tag,q.err||''));twoBac.forEach(t=>console.log('  2 bạc',t))}
