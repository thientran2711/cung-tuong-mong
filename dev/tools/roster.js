#!/usr/bin/env node
/* Sổ vị trí (j95) — dev tool, not shipped in the game.
   usage: node dev/tools/roster.js <save> [tuần] [buổi] [khắc] [--json]
     <save>: a file holding EITHER the "Chép sổ" code (CTM1:/CTM2:…), OR the JSON of one save (localStorage value of
             hclh-save-v2-<n>), OR a JSON dump of localStorage ({"hclh-save-v2-1":"…",…}; the slot in hclh-slot is used).
     tuần  : week number as the game counts it (S.turn*3+S.tuan); default = the current one in the save.
     buổi  : 0..BUOI.length-1 (default: the current buổi). khắc: 0..3 (default: the khắc the save stopped at).
   Prints "Tên — chức — nơi — việc — đối tượng — lý do" for everyone, the total, and self-checks:
   no duplicate, no one missing a place, every living consort / child / servant of a living mistress present, nobody
   dead present, counts per place equal to what the map showed at that khắc (recorded by the game). */
const fs=require('fs'),path=require('path'),zlib=require('zlib');
const JSONOUT=process.argv.includes('--json');const [,,FILE,T,B,K]=process.argv.filter(x=>x!=='--json');if(!FILE){console.log(fs.readFileSync(__filename,'utf8').split('\n').slice(1,9).join('\n'));process.exit(1)}
const j95=fs.readFileSync(path.join(__dirname,'..','build','j95.js'),'utf8');
const ACT=Function('return '+j95.match(/const ACT95=(\{[\s\S]*?\});/)[1])();
const PLN={home:"Tẩm cung của ngươi",kn:"Càn Ninh cung (Hoàng hậu)",tn:"Đức Thọ cung (Thái hậu)",dtd:"Dưỡng Hòa điện",thu:"Cần Chính điện",lc:"Trường Môn viện (lãnh cung)",vuon:"Ngự hoa viên",tyv:"Thái y viện",ksp:"Kính sự phòng",tgk:"Tân Giả khố",cnh:"Dãy nhà cung nhân",ttp:"Thượng thư phòng",acs:"A ca sở",dc:"Đông cung",ngoai:"Ngoài cung (chưa vào)"};
function readSave(txt){txt=txt.trim();let d=null;
 const m=/^CTM([12]):([A-Za-z0-9+/=\s]+)$/.exec(txt);if(m){let u=Buffer.from(m[2].replace(/\s+/g,''),'base64');if(m[1]==='2')u=zlib.inflateRawSync(u);d=JSON.parse(u.toString('utf8'))}
 else{d=JSON.parse(txt);if(!d.S){const slot=d['hclh-slot']||Object.keys(d).find(k=>/^hclh-save-v2-/.test(k)).split('-').pop();const v=d['hclh-save-v2-'+slot];d=typeof v==='string'?JSON.parse(v):v}}
 if(!d||!d.S)throw new Error('không thấy ván chơi trong tệp');return d}
const d=readSave(fs.readFileSync(FILE,'utf8'));const S=d.S,RV=d.R||[];
const wk=S.turn*3+S.tuan;const t=T!=null&&T!==''?+T:null,b=B!=null&&B!==''?+B:null,kh=K!=null&&K!==''?+K:null;
const pn=k=>{if(!k)return'—';if(PLN[k])return PLN[k];if(k[0]==='r'){const v=RV.find(x=>'r'+x.id===k);return v?`Cung của ${v.name}`:k}return k};
let rows=[],map=null,at={},log=null;const R=S.roster;
if(R&&(t==null||t===R.wk)&&(b==null||b===R.b)){const k2=kh==null?(R.kh||0):kh;at={wk:R.wk,b:R.b,kh:k2};
 rows=Object.keys(R.P).map(id=>{const e=R.P[id][k2];return{id,name:(R.who[id]||[id])[0],role:(R.who[id]||['',''])[1],place:e[0],placeName:pn(e[0]),act:ACT[e[1]]||e[1],tgt:e[2]?((R.who[e[2]]||[e[2]])[0]):'',why:e[3]||''}});map=R.m&&R.m[k2]||null}
else{const L=S.rlog&&S.rlog.e&&S.rlog.e[(t==null?wk:t)+'-'+(b||0)];if(!L){console.log('Không có sổ cho thời điểm này. Có:',Object.keys((S.rlog||{}).e||{}).join(' '),R?`(hiện tại ${R.key})`:'');process.exit(2)}
 const k2=kh||0;at={wk:L.wk,b:L.b,kh:k2};log=L;rows=L.ids.map((id,i)=>{const q=L.s[i].length===8?L.s[i]:L.s[i].slice(k2*8,k2*8+8);const g=j=>parseInt(q.slice(j*2,j*2+2),36);const P=L.D.P[g(0)],Tg=L.D.T[g(2)];
  return{id,name:(S.rlog.who[id]||[id])[0],role:(S.rlog.who[id]||['',''])[1],place:P,placeName:L.pn[P]||pn(P),act:L.D.A[g(1)],tgt:Tg?((S.rlog.who[Tg]||[Tg])[0]):'',why:L.D.W[g(3)]}});
 if(L.m[k2]){map={};L.m[k2].split(',').filter(Boolean).forEach(x=>{const [k,n]=x.split(':');map[k]=+n})}}
/* the map counts only the people she would meet there (j95vis in the game, port 16/11): consorts (at her palace only visitors), the Emperor
   (not at Dưỡng Hòa điện when Sủng < 50), Thái hậu, men, officials, the court physician, the Kính sự phòng eunuch; at her palace also her maid and children */
/* named elders (jstaff): counted only where the stage draws them (j95vis) */
const ELD={};for(const x of [].concat((S.thO&&S.thO.staff)||[],S.staff||[],...RV.map(v=>v.staff||[])))if(x&&x.eid&&x.sid!=null)ELD['s'+x.sid]=x.eid;
const SRV=!!(S.srv&&!S.srv.risen);/* maid road (isSrv in the game) */
const vis=r=>{const id=r.id,k=r.place;if(!k||k==='ngoai'||id==='me')return false;
 if(ELD[id]){const e=ELD[id];return e==='kn'?k==='kn':e==='tn'?(k==='tn'&&!S.thDead)||k==='tgk':e==='gt'?k==='home'&&(S.turn||0)<=4&&!S.out:false}
 /* jplx places (main): the fixtures, servants resting / punished there, children 6+ at the study and their halls */
 if(id==='c:tgk'||id==='c:ttp')return true;if(id[0]==='s'&&(k==='cnh'||k==='tgk'))return /nghỉ tay|giặt giũ/.test(r.act||'');if(id[0]==='k'&&/^(ttp|acs|dc)$/.test(k))return true;if(id[0]==='v')return k!=='home'||r.tgt===S.name||/sang chơi|gây sự|hẹn hò/.test(r.act||'');
 if(id==='emp')return k!=='home'&&!(k==='dtd'&&(S.sung||0)<50);if(id==='th'||id[0]==='q'||id==='c:ty'||id==='c:ksp')return true;if(id==='c:ped')return k==='nvp'&&!(S.out||S.srv||(typeof isSrv==='function'&&isSrv()));/* r2: no Nội vụ phủ in lãnh cung / on the maid road (jact adSrv) */
 /* her household servants (jhouse, main): on her room / lãnh cung stage (r1) */if(id[0]==='s'&&(k==='home'||k==='lc')&&!S.dead&&!SRV&&(S.staff||[]).some(x=>x&&x.sid!=null&&'s'+x.sid===id))return true;if(id[0]==='m'&&id[1]!=='m')return true;
 if(k==='home')return id==='mm:me'||id.indexOf('k:me:')===0;return false};
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
const acts=(log?log.acts:R&&R.acts)||[];if(acts.length){console.log('\nHành động nhắm vào người khác trong buổi (qua cổng động cơ):');for(const a of acts){const nm=id=>id?(((log?S.rlog.who:R.who)[id]||[id])[0]):'';console.log(` khắc ${a.kh+1}: ${nm(a.id)} → ${nm(a.t)} · ${a.k} · ${a.ok?'cho làm':'CHẶN'} · ${a.why}${a.src?` · nguồn: ${a.src}`:''}`)}}
process.exit(err.length?3:0);
