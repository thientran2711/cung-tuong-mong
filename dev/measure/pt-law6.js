/* pt-law6 (review/phutang-road r2, E21b): STATIC law-6 scan of the four Phù Tang roads, read from the real data (jbalpt.js + jrd_pt.js + jrd_pt2.js
   run in a node sandbox; no browser). Three passes the line scan pt-scan.py cannot do (r1 review fixes 2–4):
   6a  every option whose go calls rdOan(A,"v",…) (she confronts {v}) must be ROLLED (odds from BAL: pfR / pfX), never a sure pfS → SURE-VS-V must be 0;
       every option with rdOan/rdRel on {v} that fires on a failed roll too is listed (FAIL-COST, check it is the intended price).
   6b  person STATE: every pfP(id,"<key>",…) set other than w / alive / met (e.g. Trí Viễn's sight "mat") → every LATER unit of the road that names the
       person together with a word of that state must read pfP(id,"<key>") → UNGUARDED must be 0.
   6c  object READ: per road, per PFO key, the holders an earlier chapter can set (cast / go / E go). From the first chapter after the key has ≥ 2 possible
       holders, every unit whose text names the thing (word list W below) must read pfO("<key>") (or a named helper) in its own source, or its beat's `if`/t (a read inside cast() does not count: it moves state, it does not guard the text) → UNGUARDED must be 0. A unit = an option (n / wx / lx / rt / rf + its go/if source), a beat head (h / t), an ending (t), a chapter g.
   usage: node dev/measure/pt-law6.js [-v]   (exit 1 if any count above is not 0) */
const fs=require('fs'),vm=require('vm'),path=require('path');
const B=p=>fs.readFileSync(path.join(__dirname,'../build',p),'utf8');
const mk=()=>new Proxy(function(){},{get:(t,k)=>{if(k===Symbol.toPrimitive)return()=>"";if(!(k in t))t[k]=mk();return t[k]},apply:()=>mk()});
const DEF={};let cur=null;
const ctx={console,Math,JSON,Object,Array,String,Number,RegExp,Set,Map,
 BAL:mk(),S:mk(),ORIGIN_BR:{},STORY:{},QUEST67:{},NCL:{},TOK67:{},RTHEME67:{},RDQ:{},R97L:[],RD97L:[],
 ARC67:new Proxy({},{set:(t,k,v)=>{t[k]=v;if(/^pt_/.test(k))DEF[k]={road:k,n:4,def:v};return true}}),
 arcFx:(id,d)=>d,rdDef:(road,n,d)=>{DEF[road+"_"+n]={road,n,def:d}},rdRare:x=>x,RD_FL:()=>0,rdFb:()=>0,RDW:()=>()=>true,rdCast:()=>"",rdK:()=>0,rdEnd:()=>"",
 rdOan:()=>0,rdRel:()=>0,RR:()=>mk(),rv67:()=>null,queenP:()=>null,qOn:()=>true,menInit:()=>0,log:()=>0,roll:()=>true,od:x=>x};
vm.createContext(ctx);
vm.runInContext(B('jbalpt.js'),ctx);
const BALX=ctx.BAL;
vm.runInContext(B('jrd_pt.js')+'\n'+B('jrd_pt2.js'),ctx);
const V=process.argv.includes('-v');
const src=x=>typeof x==='function'?x.toString():typeof x==='string'?x:'';
const txt=(o,keys)=>keys.map(k=>src(o[k])).join(' ¦ ');
/* BAL numbers per option, by index (the arcFx / rdFx shape) */
const balOf=(id,bk,i)=>{const F=(/^pt_[a-z]+$/.test(id)?BALX.arc.fx[id]:BALX.road.fx[id])||{};const L=F[bk];return Array.isArray(L)?L[i]:null};
const rolled=(id,bk,i,o)=>{const b=balOf(id,bk,i);return !!(o.e||(b&&b.o!=null))};
/* units of every chapter */
const units=[];
for(const id of Object.keys(DEF).sort((a,b)=>DEF[a].road.localeCompare(DEF[b].road)||DEF[a].n-DEF[b].n)){
 const {road,n,def}=DEF[id];const rd=road.replace(/_\d+$/,'');const chap={rd,n,id};
 const SL={};(def.p||[]).forEach((g,i)=>g.forEach(k=>SL[k]=i));const sl=bk=>SL[bk]!=null?SL[bk]:50;
 units.push({...chap,kind:'g',slot:-1,t:src(def.g),s:src(def.g),set:src(def.g)+src(def.cast)});/* a read inside cast() moves state, it does not guard the text */
 for(const bk in def.B||{}){const b=def.B[bk];const bs=src(b.if)+src(b.t)+src(b.h);
  units.push({...chap,kind:'beat',bk,slot:sl(bk),t:src(b.h)+' ¦ '+src(b.t),s:bs});
  (Array.isArray(b.o)?b.o:[]).forEach((o,i)=>units.push({...chap,kind:'opt',bk,slot:sl(bk),i,o,t:txt(o,['n','wx','lx','rt','rf']),s:txt(o,['n','wx','lx','rt','rf','go','if'])+' '+bs,rolled:rolled(id,bk,i,o)}))}
 for(const ek in def.E||{}){const e=def.E[ek];units.push({...chap,kind:'end',bk:ek,slot:99,t:src(e.t),s:src(e.t)+src(e.go)})}}
const fixId=u=>`${u.rd}.${u.n} ${u.bk||u.kind}${u.i!=null?'#'+u.i:''}`;
const short=s=>s.replace(/\s+/g,' ').slice(0,110);
let bad=0;
/* ---- 6a ---- */
const oan=units.filter(u=>u.kind==='opt'&&/rdOan\(A,"v"/.test(src(u.o.go)));
const sure=oan.filter(u=>!u.rolled);
console.log(`6a options that confront {v} (go calls rdOan(A,"v")): ${oan.length} · rolled ${oan.length-sure.length} · SURE-VS-V ${sure.length}`);
for(const u of sure)console.log("   SURE-VS-V",fixId(u),"«"+short(src(u.o.n))+"»",JSON.stringify(balOf(u.id,u.bk,u.i)));
bad+=sure.length;
const fc=units.filter(u=>u.kind==='opt'&&u.rolled&&/rd(Oan|Rel)\(A,"v"/.test(src(u.o.go))&&!/ok\s*\?|if\s*\(\s*ok|ok&&|!ok/.test(src(u.o.go)));
console.log(`6a rolled options whose {v} cost fires on a failed roll too (FAIL-COST, by design = the price of trying): ${fc.length}`);
if(V)for(const u of fc)console.log('   FAIL-COST',fixId(u),'«'+short(src(u.o.n))+'»');
/* ---- 6b state ---- */
const NAMEW={trivien:/Trí Viễn|thầy|Thầy|pháp sư|Pháp sư/,tinhvien:/Tịnh Viên/,kimthanh:/Kim Thành|đại sứ|Đại sứ/,huuthanh:/Kim Hựu Thành|thương chủ/,ocuu:/Ô Cửu/,tieungoc:/Tiểu Ngọc/,namlao:/Nham Lão/,thanlao:/Thân Lão/,trongla:/Trọng Lữ/};
const STATEW={mat:/mù|mắt|sáng mắt|đôi mắt/,quan:/làm quan|chức quan|quan Đại Hy|áo quan/,ve:/về nước|về {land}|theo thuyền về|lên thuyền về/};
const sets=[];for(const u of units)for(const m of (u.set||u.s).matchAll(/pfP\("(\w+)","(\w+)",/g))if(!['w','alive','met'].includes(m[2]))sets.push({u,id:m[1],k:m[2]});
const seen=new Set();let st=0;
for(const x of sets){const key=x.u.rd+x.id+x.k;if(seen.has(key))continue;seen.add(key);const W=STATEW[x.k];if(!W){console.log('6b state key without a word list',x.id,x.k);bad++;continue}
 const later=units.filter(u=>u.rd===x.u.rd&&u.n>x.u.n&&NAMEW[x.id]&&NAMEW[x.id].test(u.t)&&W.test(u.t));
 const ung=later.filter(u=>!new RegExp(`pfP\\("${x.id}","${x.k}"\\)|PF[A-Z]+\\(`).test(u.s));
 console.log(`6b state ${x.u.rd} ${x.id}.${x.k} (set at .${x.u.n}): later units naming it ${later.length} · UNGUARDED ${ung.length}`);
 for(const u of ung)console.log('   UNGUARDED',fixId(u),short(u.t));st+=ung.length}
bad+=st;
/* ---- 6c read ---- */
const W={ /* object words per road (a key means one thing inside one road) */
 pt_hai:{van:/mảnh ván|ván sơn son/,danhsach:/danh sách/,nhatky:/nhật ký/,trang:/trang cuối|trang nhật ký|trang ấy/,ruong:/rương cống|rương ngọc|nửa rương|Rương cống/,
  niem:/niêm phong|dấu niêm|cắt niêm|niêm còn/,ngoctrai:/ngọc trai|hộp ngọc|ngọc chuộc|chuộc bằng ngọc/,haido:/hải đồ/,giaythue:/giấy miễn thuế/,hoimon:/hồi môn/,guong:/gương đồng/,thu:/thư của Nham Lão|thư Nham Lão|lá thư của lão/},
 pt_su:{quocthu:/quốc thư|Quốc thư/,hoithu:/hồi thư|Hồi thư/,lenh:/tờ lệnh|Tờ lệnh|lệnh giả/,kiem:/thanh kiếm|Thanh kiếm|kiếm Phù Tang/,sach:/danh mục sách|sách tặng/,tho:/bài thơ/,thuta:/thư riêng/},
 pt_tang:{hopkinh:/hộp kinh|Hộp kinh/,hatgiong:/hạt giống|Hạt giống/,dodiep:/độ điệp|Độ điệp/,xaloi:/xá lợi|Xá lợi|bình xá lợi/,daotang:/thanh đao|Thanh đao|đao hồi môn/,thuthay:/thư của thầy|thư thầy|thư thệ/},
 pt_dang:{ruongbac:/rương bạc|Rương bạc/,hangdao:/hòm đao|Hòm đao|sáu hòm/,thugiac:/thư của Ô Cửu|thư giặc/,ngoctrai:/ngọc trai|hộp ngọc/,sothibac:/sổ Thị bạc|cuốn sổ|Cuốn sổ|sổ thật|sổ giả/,daochem:/đao chém sắt|thanh đao|Thanh đao/,haido:/hải đồ/}};
const HELP={nhatky:/PFLOG\(/,ngoctrai:/PFNGOC\(/};
/* reviewed mentions that are true whoever holds the thing (e.g. «fewer men than the names on the roll» is a fact, not a claim to hold the roll):
   dev/measure/pt-law6-ok*.json = {"<road>.<n> <beat>#<i>:<key>": "why it is true for every holder"} — each entry is a reviewed exception, printed with -v */
const OK={};for(const f of fs.readdirSync(__dirname).filter(f=>/^pt-law6-ok.*\.json$/.test(f)))Object.assign(OK,JSON.parse(fs.readFileSync(path.join(__dirname,f),'utf8')));
let c6=0;
for(const rd of Object.keys(W)){for(const k of Object.keys(W[rd])){
 const re=new RegExp(`pfO\\("${k}","(\\w+)"`,'g');const sets=[];/* every place the road sets the key: [chapter, slot, holder] */
 for(const u of units.filter(u=>u.rd===rd))for(const m of (u.set||u.s).matchAll(re))sets.push([u.n,u.slot,m[1]]);
 if(!sets.length)continue;const hold={};for(const [n,,h] of sets)(hold[n]=hold[n]||new Set()).add(h);const ns=Object.keys(hold).map(Number).sort((a,b)=>a-b);
 /* holders possible when unit u is shown: every set in an earlier chapter, or earlier in the same chapter (cast/g < s < c < t < x < endings) */
 const poss=u=>{const s=new Set();for(const [n,sl,h] of sets)if(n<u.n||(n===u.n&&sl<u.slot))s.add(h);return s};
 const rd2=new RegExp(`pfO\\("${k}"\\)`+(HELP[k]?'|'+HELP[k].source:''));
 const ment=units.filter(u=>u.rd===rd&&poss(u).size>=2&&W[rd][k].test(u.t));
 const gOf=u=>units.find(x=>x.rd===u.rd&&x.n===u.n&&x.kind==='g');
 const ung=ment.filter(u=>!rd2.test(u.s)&&!OK[fixId(u)+':'+k]);const okd=ment.filter(u=>!rd2.test(u.s)&&OK[fixId(u)+':'+k]);
 if(V)for(const u of okd)console.log('   ok-reviewed',fixId(u)+':'+k,'—',OK[fixId(u)+':'+k]);
 console.log(`6c read ${rd} ${k}: holders ${JSON.stringify(Object.fromEntries(ns.map(n=>[n,[...hold[n]]])))} · mentions ${ment.length} · UNGUARDED ${ung.length}`);
 for(const u of ung)console.log('   UNGUARDED',fixId(u),short(u.t));c6+=ung.length}}
bad+=c6;
console.log(`pt-law6: 6a SURE-VS-V ${sure.length} · 6b state UNGUARDED ${st} · 6c read UNGUARDED ${c6} · ${bad?'FAIL':'PASS'}`);
process.exit(bad?1:0);
