#!/usr/bin/env node
/* Sổ vị trí (j95) — dev tool, not shipped in the game.
   usage: node dev/tools/roster.js <save> [tuần] [buổi] [khắc] [--json]
          node dev/tools/roster.js <save> --who <name | id | role> [--all] [--json]
     --who : ONE person (or a group by role) — "now: <place>, khắc k of buổi b (week w), doing <act>, with <target>, because <reason>"
             + her timeline across the record (S.rlog: this week + 4 before, and the current buổi; default the last 8 buổi, --all = all)
             + her rest / sleep rows today, the day's entourage pick (a mistress) and what she knows (S.knw: saw it / heard from whom).
             <name>: any part of the name (accents optional) · <id>: a record id (me, v12, mm:me, s34, emp, th, k:me:0, m3…) ·
             <role>: "cung nữ của ta" (her close maid + her maids), "thái giám của ta", "người hầu của ta", "cung nữ thân tín của ta",
             or the role as the record writes it ("cung nữ của Tô Uyển Dung").
     <save>: a file holding EITHER the "Chép sổ" code (CTM1:/CTM2:…), OR the JSON of one save (localStorage value of
             hclh-save-v2-<n>), OR a JSON dump of localStorage ({"hclh-save-v2-1":"…",…}; the slot in hclh-slot is used).
     tuần  : week number as the game counts it (S.turn*3+S.tuan); default = the current one in the save.
     buổi  : 0..BUOI.length-1 (default: the current buổi). khắc: 0..3 (default: the khắc the save stopped at).
   Prints "Tên — chức — nơi — việc — đối tượng — lý do" for everyone, the total, and self-checks:
   no duplicate, no one missing a place, every living consort / child / servant of a living mistress present, nobody
   dead present, counts per place equal to what the map showed at that khắc (recorded by the game). */
const fs=require('fs'),path=require('path'),zlib=require('zlib');
/* save-growth: a dumped sổ may be packed («CTMZ», j6 slotEnc) → the ONE decoder, taken from dev/build/j6.js */
const slotDecN=(()=>{try{const t=require('fs').readFileSync(require('path').join(__dirname,'../build/j6.js'),'utf8');const a=t.indexOf('const SLOTZ='),b=t.indexOf('function slotGet(');return new Function(t.slice(a,b)+';return slotDec')()}catch(e){return x=>x}})();
const JSONOUT=process.argv.includes('--json'),ALL=process.argv.includes('--all');const AV=process.argv.slice();const wi=AV.indexOf('--who');const WHO=wi>=0?AV.splice(wi,2)[1]:null;
const [,,FILE,T,B,K]=AV.filter(x=>x!=='--json'&&x!=='--all');if(!FILE){console.log(fs.readFileSync(__filename,'utf8').split('\n').slice(1,9).join('\n'));process.exit(1)}
const j95=fs.readFileSync(path.join(__dirname,'..','build','j95.js'),'utf8');
const ACT=Function('return '+j95.match(/const ACT95=(\{[\s\S]*?\});/)[1])();
/* act words (review live-servants FAIL 1, law 7: never a code key in an answer): every literal ACT95 word in the game sources (Object.assign(ACT95,{…}),
   ACT95["ag_…"]="…", ACT95.x="…"), the servants' deed words (j95s J95S_DW → ag_maid:<k> / ag_srv:<k>), the shared deeds (jagent AGACTW → ag_<k>);
   a key still without a word reads J95S_DW0 ("lo việc riêng") — the same rule as the game's j95sActW */
const DW={},AW={};let DW0='lo việc riêng';
for(const f of fs.readdirSync(path.join(__dirname,'..','build')).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js')){const t=fs.readFileSync(path.join(__dirname,'..','build',f),'utf8');
 for(const m of t.matchAll(/Object\.assign\(ACT95,(\{[^}]*\})\)/g))try{Object.assign(ACT,Function('return '+m[1])())}catch(e){}
 for(const m of t.matchAll(/ACT95\[("[^"]+")\]=(?:ACT95\[[^\]]+\]\|\|)?("[^"]*")/g))try{const k=JSON.parse(m[1]);if(!ACT[k])ACT[k]=JSON.parse(m[2])}catch(e){}
 for(const m of t.matchAll(/ACT95\.(\w+)=("[^"]*")/g))try{if(!ACT[m[1]])ACT[m[1]]=JSON.parse(m[2])}catch(e){}
 {const m=t.match(/const J95S_DW=(\{[^}]*\})/);if(m)try{Object.assign(DW,Function('return '+m[1])())}catch(e){}const m0=t.match(/const J95S_DW0="([^"]*)"/);if(m0)DW0=m0[1]}
 /* the consorts' own deed tables (runtime: ACT95["ag_cx:"+k]=AGCX[k].act …): read the act words of each row literally */
 for(const [nm,pre] of [['AGSELF','ag_'],['AGCX','ag_cx:'],['AGHH','ag_hh:'],['AGC2','ag_cx2:']]){const i=t.indexOf('const '+nm+'={');if(i<0)continue;
  let d=0,st=-1,key=null;for(let q=i+nm.length+8;q<t.length;q++){const c=t[q];if(c==='"'){const e=t.indexOf('"',q+1);if(e>0)q=e;continue}
   if(c==='{'){d++;if(d===1){const m=/(\w+)\s*:\s*$/.exec(t.slice(Math.max(0,q-40),q));key=m?m[1]:null;st=q}}else if(c==='}'){if(d===1&&key){const a=/\bact\s*:\s*"([^"]*)"/.exec(t.slice(st,q+1));if(a&&!ACT[pre+key])ACT[pre+key]=a[1]}d--;if(d<0)break}}}
 for(const m of t.matchAll(/(?:const AGC3ACT=|Object\.assign\(AGC3ACT,)(\{[^}]*\})/g))try{const o=Function('return '+m[1])();for(const k in o)if(!ACT['ag_cx3:'+k])ACT['ag_cx3:'+k]=o[k]}catch(e){}
 {const m=t.match(/const AGACTW=(\{[^}]*\})/);if(m)try{Object.assign(AW,Function('return '+m[1])())}catch(e){}for(const x of t.matchAll(/AGACTW\.(\w+)="([^"]*)"/g))AW[x[1]]=x[2]}}
function actW(a){a=a==null?'':String(a);if(ACT[a])return ACT[a];let m=/^ag_(?:maid|srv):(\w+)$/.exec(a);if(m&&DW[m[1]])return DW[m[1]];m=/^ag_(\w+)$/.exec(a);if(m&&AW[m[1]])return AW[m[1]];return /^[\x00-\x7f]*$/.test(a)?DW0:a}
const PLN={home:"Tẩm cung của ngươi",kn:"Càn Ninh cung (Hoàng hậu)",tn:"Đức Thọ cung (Thái hậu)",dtd:"Dưỡng Hòa điện",thu:"Cần Chính điện",lc:"Trường Môn viện (lãnh cung)",vuon:"Ngự hoa viên",tyv:"Thái y viện",ksp:"Kính sự phòng",tgk:"Tân Giả khố",cnh:"Dãy nhà cung nhân",ttp:"Thượng thư phòng",acs:"A ca sở",dc:"Đông cung",ngoai:"Ngoài cung (chưa vào)"};
function readSave(txt){txt=txt.trim();let d=null;
 const m=/^CTM([12]):([A-Za-z0-9+/=\s]+)$/.exec(txt);if(m){let u=Buffer.from(m[2].replace(/\s+/g,''),'base64');if(m[1]==='2')u=zlib.inflateRawSync(u);d=JSON.parse(u.toString('utf8'))}
 else{d=JSON.parse(txt);if(!d.S){const slot=d['hclh-slot']||Object.keys(d).find(k=>/^hclh-save-v2-/.test(k)).split('-').pop();const v=d['hclh-save-v2-'+slot];d=typeof v==='string'?JSON.parse(slotDecN(v)):v}}
 if(!d||!d.S)throw new Error('không thấy ván chơi trong tệp');return d}
const d=readSave(fs.readFileSync(FILE,'utf8'));const S=d.S,RV=d.R||[];
const wk=S.turn*3+S.tuan;const t=T!=null&&T!==''?+T:null,b=B!=null&&B!==''?+B:null,kh=K!=null&&K!==''?+K:null;
const pn=k=>{if(!k)return'—';if(PLN[k])return PLN[k];if(k[0]==='r'){const v=RV.find(x=>'r'+x.id===k);return v?`Cung của ${v.name}`:k}return k};
if(WHO!=null){process.exit(whoMode(WHO))}
let rows=[],map=null,at={},log=null;const R=S.roster;
if(R&&(t==null||t===R.wk)&&(b==null||b===R.b)){const k2=kh==null?(R.kh||0):kh;at={wk:R.wk,b:R.b,kh:k2};
 rows=Object.keys(R.P).map(id=>{const e=R.P[id][k2];return{id,name:(R.who[id]||[id])[0],role:(R.who[id]||['',''])[1],place:e[0],placeName:pn(e[0]),act:actW(e[1]),tgt:e[2]?((R.who[e[2]]||[e[2]])[0]):'',why:e[3]||''}});map=R.m&&R.m[k2]||null}
else{const L=S.rlog&&S.rlog.e&&S.rlog.e[(t==null?wk:t)+'-'+(b||0)];if(!L){console.log('Không có sổ cho thời điểm này. Có:',Object.keys((S.rlog||{}).e||{}).join(' '),R?`(hiện tại ${R.key})`:'');process.exit(2)}
 const k2=kh||0;at={wk:L.wk,b:L.b,kh:k2};log=L;rows=L.ids.map((id,i)=>{const q=L.s[i].length===8?L.s[i]:L.s[i].slice(k2*8,k2*8+8);const g=j=>parseInt(q.slice(j*2,j*2+2),36);const P=L.D.P[g(0)],Tg=L.D.T[g(2)];
  return{id,name:(S.rlog.who[id]||[id])[0],role:(S.rlog.who[id]||['',''])[1],place:P,placeName:L.pn[P]||pn(P),act:L.D.A[g(1)],tgt:Tg?((S.rlog.who[Tg]||[Tg])[0]):'',why:L.D.W[g(3)]}});
 if(L.m[k2]){map={};L.m[k2].split(',').filter(Boolean).forEach(x=>{const [k,n]=x.split(':');map[k]=+n})}}
/* ONE RULE (review/coop-main-faults): a save made by this build records who the map leaves out at each khắc (j95vis false: R.nv / log nv);
   a person counts where the record puts her unless the game left her out. An older save has no list: the people-ledger rule itself (j95.js
   PEOPLE LEDGER, j95vis under j95led: everyone in the record at a real place, except herself and her maid walking with her away from home).
   The rule from before the people ledger (only who the stage drew) is gone: it counted 1-8 fewer than the screen (dev/test/roster_dom.js). */
let NV=null;{const k2=at.kh||0;if(log&&log.nv){NV=new Set(String(log.nv[k2]||'').split(',').filter(Boolean))}else if(!log&&R&&Array.isArray(R.nv)&&R.nv[k2]){NV=new Set(R.nv[k2])}}
const vis=r=>{const id=r.id,k=r.place;if(!k||k==='ngoai'||id==='me')return false;if(NV)return !NV.has(id);return !(id==='mm:me'&&k===S.place&&k!=='home')};
if(JSONOUT){const err0=[];const ids0=new Set();for(const r of rows){if(ids0.has(r.id))err0.push('trùng '+r.id);ids0.add(r.id)}const C0={};for(const r of rows)if(r.place&&vis(r))C0[r.place]=(C0[r.place]||0)+1;console.log(JSON.stringify({at,total:rows.length,counts:C0,map,rows,err:err0}));process.exit(0)}
const BN=(b2)=>{const nb=(log&&log.nb)||(R&&R.nb)||3;return (nb>=4?["Sáng","Trưa","Chiều","Tối"]:["Sáng","Chiều","Tối"])[b2]||b2};
console.log(`Sổ vị trí · tuần ${at.wk} (tháng ${S.month}/${S.year} khi lưu) · buổi ${BN(at.b)} · khắc ${at.kh+1}`);
const w=(s,n)=>{s=String(s||'');return s.length>n?s.slice(0,n-1)+'…':s.padEnd(n)};
console.log(w('Tên',24)+' — '+w('Chức',28)+' — '+w('Nơi',28)+' — '+w('Việc',22)+' — '+w('Đối tượng',18)+' — Lý do');
for(const r of rows.slice().sort((a,b)=>a.place<b.place?-1:a.place>b.place?1:0))console.log(w(r.name,24)+' — '+w(r.role,28)+' — '+w(r.placeName,28)+' — '+w(r.act,22)+' — '+w(r.tgt,18)+' — '+(r.why||''));
/* self-checks */
const err=[];const ids=new Set();for(const r of rows){if(ids.has(r.id))err.push('trùng: '+r.id);ids.add(r.id);if(!r.place)err.push('thiếu nơi: '+r.name)}
const C={};for(const r of rows)if(r.place&&vis(r))C[r.place]=(C[r.place]||0)+1;
if(map)for(const k of new Set(Object.keys(C).concat(Object.keys(map))))if((C[k]||0)!==(map[k]||0))err.push(`bản đồ lệch ở ${pn(k)}: sổ ${C[k]||0}, bản đồ ${map[k]||0}`);
if(!log){/* the current record against the people in the save */
 for(const v of RV){const id='v'+v.id;if(v.alive&&!ids.has(id))err.push('thiếu phi tần còn sống: '+v.name);if(!v.alive&&ids.has(id))err.push('người đã mất còn trong sổ: '+v.name);if(v.alive&&v.out&&ids.has(id)&&rows.find(r=>r.id===id).place!=='lc')err.push('phế phi không ở lãnh cung: '+v.name)}
 for(const p of [S].concat(RV)){if(p!==S&&!p.alive)continue;for(const s of p.staff||[])if(s&&s.sid!=null&&!ids.has('s'+s.sid))err.push('thiếu kẻ hầu: '+s.name)}
 for(const m of S.men||[])if(!m.alive&&ids.has(m.id))err.push('nam nhân đã chết còn trong sổ: '+m.name)}
console.log(`\nTổng: ${rows.length} người · ${Object.keys(C).length} nơi${map?'':' · (không có số bản đồ cho khắc này)'}`);
console.log(err.length?'TỰ KIỂM: LỖI\n - '+err.join('\n - '):'TỰ KIỂM: sạch (không trùng, không thiếu, khớp bản đồ)');
const acts=(log?log.acts:R&&R.acts)||[];if(acts.length){console.log('\nHành động nhắm vào người khác trong buổi (qua cổng động cơ):');for(const a of acts){const nm=id=>id?(((log?S.rlog.who:R.who)[id]||[id])[0]):'';console.log(` khắc ${a.kh+1}: ${nm(a.id)} → ${nm(a.t)} · ${actW(/^ag:/.test(a.k||'')?'ag_'+a.k.slice(3):a.k)} · ${a.ok?'cho làm':'CHẶN'} · ${a.why}${a.src?` · nguồn: ${a.src}`:''}`)}}
process.exit(err.length?3:0);
/* ---------- --who: where is she, since when, doing what, why (owner OD L1901 point 3) ---------- */
function whoMode(q){const R=S.roster,L=S.rlog||{e:{},who:{}};const WHOD=Object.assign({},L.who||{},(R&&R.who)||{});
 const nz=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().replace(/\s+/g,' ').trim();
 const nb=b2=>{const n=(R&&R.nb)||3;return (n>=4?["Sáng","Trưa","Chiều","Tối"]:["Sáng","Chiều","Tối"])[b2]||String(b2)};
 let qq=nz(q).replace(/ (cua )?(ta|toi|me|minh)$/,' cua nguoi').replace(/^(my )?maids?$/,'cung nu cua nguoi').replace(/^(my )?eunuchs?$/,'thai giam cua nguoi').replace(/^(my )?servants?$/,'nguoi hau cua nguoi');
 const ids=Object.keys(WHOD).filter(id=>{const [nm,rl]=WHOD[id];const n=nz(nm),r=nz(rl);if(id===q||nz(id)===qq)return true;
   if(qq==='nguoi hau cua nguoi')return /^(cung nu|thai giam)( than tin)? cua nguoi$/.test(r);
   if(r&&(r===qq||r.replace(' than tin','')===qq))return true;return !!n&&n.includes(qq)});
 if(!ids.length){console.log(`Không thấy ai khớp "${q}" trong sổ. Có ${Object.keys(WHOD).length} người; thử tên, mã (me, mm:me, s12, v3…) hoặc "cung nữ của ta".`);return 2}
 /* every buổi the record holds: the log (closed buổi) + the current one (khắc after the save's khắc = still the plan) */
 const B=[];for(const k in L.e||{}){const E=L.e[k];B.push({wk:E.wk,b:E.b,nb:E.nb,get:(id,kh)=>{const i=E.ids.indexOf(id);if(i<0)return null;const sq=E.s[i].length===8?E.s[i]:E.s[i].slice(kh*8,kh*8+8);const g=j=>parseInt(sq.slice(j*2,j*2+2),36);const P=E.D.P[g(0)],Tg=E.D.T[g(2)];
   return{place:P,placeName:E.pn[P]||pn(P),act:E.D.A[g(1)],tgt:Tg?((WHOD[Tg]||[Tg])[0]):'',why:E.D.W[g(3)]}}})}
 if(R&&R.P)B.push({wk:R.wk,b:R.b,nb:R.nb,cur:1,kh:R.kh==null?0:R.kh,get:(id,kh)=>{const e=R.P[id]&&R.P[id][kh];if(!e)return null;return{place:e[0],placeName:pn(e[0]),act:actW(e[1]),tgt:e[2]?((WHOD[e[2]]||[e[2]])[0]):'',why:e[3]||''}}});
 B.sort((x,y)=>x.wk-y.wk||x.b-y.b);const out=[];
 for(const id of ids){const [nm,rl]=WHOD[id];const cur=B.find(x=>x.cur);let now=null;
  if(cur){now=Object.assign({wk:cur.wk,b:cur.b,kh:cur.kh},cur.get(id,cur.kh)||{})}
  else{const last=B.slice().reverse().find(x=>x.get(id,3));if(last)now=Object.assign({wk:last.wk,b:last.b,kh:3,old:1},last.get(id,3))}
  const tl=[];for(const x of (ALL?B:B.slice(-8))){let run=null;for(let kh=0;kh<4;kh++){const e=x.get(id,kh);if(!e)continue;const sig=[e.place,e.act,e.tgt,e.why].join('|');const plan=x.cur&&kh>x.kh;
    if(run&&run.sig===sig&&run.plan===plan){run.k2=kh;continue}run={wk:x.wk,b:x.b,k1:kh,k2:kh,sig,plan,e};tl.push(run)}}
  /* (5) her rest rhythm today: the rows of today's buổi that are sleep / rest turn / night watch / break */
  const RH=new Set([ACT.sleep,ACT.shift,ACT.nightw,ACT.brk].filter(Boolean));const rhythm=tl.filter(r=>r.wk===wk&&RH.has(r.e.act)).map(r=>({b:r.b,kh:[r.k1+1,r.k2+1],act:r.e.act,why:r.e.why,plan:r.plan?1:0}));
  if(!ALL){/* the timeline above keeps the last 8 buổi; the rhythm reads the whole of today */}
  /* (4) entourage: the player's day pick (S.ent) or an NPC mistress's (S.entN) */
  let entourage='';const dn=x=>(WHOD[x]||[x])[0];
  if(id==='me'&&S.ent&&S.ent.d===wk)entourage=S.ent.ids.length?`picked ${S.ent.ids.map(dn).join(', ')} (first departure to ${pn(S.ent.at)})`:`went alone (first departure to ${pn(S.ent.at)})`;
  else if(S.entN&&S.entN.d===wk&&S.entN.P[id])entourage=`${S.entN.P[id].ids.map(dn).join(', ')} — ${S.entN.P[id].why}`;
  /* (4) what she knows (witness + gossip record S.knw) */
  const Z=S.knw;const knows=Z&&Z.K&&Z.K[id]?Object.keys(Z.K[id]).filter(i=>Z.I[i]).map(i=>{const I=Z.I[i],F=Z.K[id][i];return{what:I.w,place:pn(I.pl),wk:I.wk,b:I.b,kh:I.kh,from:F[0],fromName:F[0]==='saw'?'':dn(F[0]),hop:F[1]}}):[];
  out.push({id,name:nm,role:rl,now,rhythm,entourage,knows,timeline:tl.map(r=>({wk:r.wk,b:r.b,kh:[r.k1+1,r.k2+1],plan:r.plan?1:0,place:r.e.placeName,act:r.e.act,tgt:r.e.tgt,why:r.e.why}))})}
 if(JSONOUT){console.log(JSON.stringify(out));return 0}
 for(const o of out){console.log(`${o.name} — ${o.role} (${o.id})`);const n=o.now;
  if(n&&n.place!==undefined)console.log(`  now: ${n.placeName||pn(n.place)}, khắc ${n.kh+1} of buổi ${nb(n.b)} (week ${n.wk}), doing ${n.act||'—'}${n.tgt?`, with ${n.tgt}`:''}, because ${n.why||'—'}${n.old?' (last record; she is not in the current buổi)':''}`);
  else console.log('  now: not in the current record (gone from the palace, or not in it yet)');
  console.log(`  timeline${ALL?'':' (last 8 buổi; --all for every buổi kept)'}:`);
  for(const r of o.timeline)console.log(`   week ${r.wk} · ${nb(r.b)} · khắc ${r.kh[0]}${r.kh[1]!==r.kh[0]?'–'+r.kh[1]:''}${r.plan?' (plan)':''}: ${r.place} · ${r.act}${r.tgt?' · với '+r.tgt:''} · ${r.why}`);
  if(o.rhythm&&o.rhythm.length)console.log(`  rest / sleep today (week ${wk}): ${o.rhythm.map(r=>`${nb(r.b)} khắc ${r.kh[0]}${r.kh[1]!==r.kh[0]?'–'+r.kh[1]:''} ${r.act}${r.plan?' (plan)':''} (${r.why})`).join(' · ')}`);
  if(o.entourage)console.log(`  entourage today: ${o.entourage}`);
  if(o.knows&&o.knows.length){console.log(`  knows (${o.knows.length}; who saw / who told her):`);for(const k of o.knows)console.log(`   ${k.what} — ${k.from==='saw'?`saw it at ${k.place}`:`heard from ${k.fromName} (hand ${k.hop})`} · week ${k.wk} · ${nb(k.b)} · khắc ${k.kh+1}`)}}
 return 0}
