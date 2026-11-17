/* ================= j99succ KẾ VỊ · BA ĐƯỜNG (owner 11/14 22:00Z) — design: dev/SUCCESSION_PLAN.md =================
   Hoàng thượng băng hà, con ngươi nối ngôi (hoặc ngươi là Hoàng hậu, đích mẫu, giữ quyền kế vị): ngươi CHỌN
   (a) Con làm vua → Hoàng thái hậu · (b) Buông rèm nhiếp chính · (c) Tự làm vua → Nữ đế. Không phải gieo hiếm: là lựa chọn thật,
   mỗi đường có điều kiện (hàng Cần trên thẻ, thiếu thì mờ và ghi lý do), giá (Tốn), được mất, bậc may rủi.
   Sau đó mỗi đường là một khúc vĩ thanh 3 chương (lựa chọn sự kiện: chỉ hiện chi phí), có kết cục riêng và một kết hiếm,
   ghi Sổ luân hồi (danh hiệu) và Phúc duyên (j52 PD_END). Hai chiều: mẹ ruột tân đế là phi tần khác cũng buông rèm được.
   Mọi thẻ là PEND (succ0 / succC) nên ghi sổ, nạp sổ, tải lại vẫn còn; khi đang ở vĩ thanh thế gian dừng (S.succ.on). */
const SUCC={b:{min:15,max:92},c:{min:5,max:80},yrs:3};
/* pictures (dev/SUCCESSION_PLAN.md §7): the choice card = Tiên đế băng hà (owner APPROVED 15/11 03:15Z, st-* style); the 9 epilogue chapters
   reuse approved event pictures already on the CDN (no new art): kit 31.16 headArt band at the top of each card */
const SUCC_ART={"succ-card":"img/ev-tien-de-bang-ha.webp",
 a1:"img/ev-tan-phong.webp",a2:"img/ev-trieu-chinh.webp",a3:"img/ev-am-muu.webp",
 b1:"img/ev-trieu-chinh-2.webp",b2:"img/ev-canh-phong.webp",b3:"img/ev-trieu-chinh.webp",
 c1:"img/ev-dai-xa.webp",c2:"img/ev-thang-tran.webp",c3:"img/ev-fest-nguyentieu-b.webp"};
const SUCC_END={
 a_ok:{h:"Hoàng thái hậu",pd:40},a_dm:{h:"Mẫu hậu Hoàng thái hậu",pd:30},a_bad:{h:"Thái hậu bị giam lỏng",pd:20},a_rare:{h:"Thái hoàng thái hậu",pd:80,rare:1},
 b_ok:{h:"Nhiếp chính Thái hậu",pd:55},b_keep:{h:"Thái hậu chấp chính",pd:45},b_bad:{h:"Bị ép trả rèm",pd:20},b_rare:{h:"Nhị thánh lâm triều",pd:90,rare:1},
 c_ok:{h:"Nữ đế",pd:100},c_abd:{h:"Nữ đế thoái vị",pd:70},c_bad:{h:"Nữ đế bị phế",pd:10},c_rare:{h:"Thiên cổ nhất đế",pd:150,rare:1},c_fail:{h:"Mưu nghịch bất thành",pd:5}};
try{if(typeof PD_END==="object")for(const k in SUCC_END){const e=SUCC_END[k];if(PD_END[e.h]==null)PD_END[e.h]=e.pd}}catch(e){}
const SUCC_ERA=["Thiên Thụ","Thánh Lịch","Trường An","Cửu Thị","Như Ý","Vĩnh Xương","Kim Thiên","Phượng Nghi"];
/* ---------- the court behind her ---------- */
function succSon(){const E=S&&S.succ;if(!E)return null;const L=allKids().map(x=>x[0]);return L.find(k=>k.name===E.son)||null}
/* a man's name only when she knows it (j61 name rule); else his title alone, never "Vương gia ???" */
function succMN(m){try{return typeof k61Named==="function"&&!k61Named(m)?m.role:m.name}catch(e){return m.name}}
function succSN(k){return String(k&&k.name||"tân đế").replace(/^Hoàng tử\s+/,"")}
function succSup(){const r={houses:[],pow:0,mil:false,milArmy:false,milGuard:false,vg:null,vgAlly:false,allies:0,thOK:false,thB:false,thOpp:false};
 try{const T=S.trieu&&S.trieu.H?S.trieu:(typeof trS==="function"?trS():null);if(T)for(const c in T.H){const h=T.H[c];if(!h)continue;
  if(h.dadOf==="me"||((h.af&&h.af.me)||0)>=40){r.houses.push({c,n:(typeof TDOFF==="object"&&TDOFF[c])||c,pow:h.pow||0});r.pow+=h.pow||0;if(c==="Đại tướng quân")r.milArmy=true}}}catch(e){}
 try{const tv=(S.men||[]).find(m=>m.alive&&m.role==="Thị vệ");if(tv&&((tv.af||0)>=40||(tv.tinh||0)>=40))r.milGuard=true;
  const vg=(S.men||[]).find(m=>m.alive&&m.role==="Vương gia");if(vg){r.vg=vg;r.vgAlly=(vg.tinh||0)>=60||S.vgAlly===vg.id}}catch(e){}
 r.mil=r.milArmy||r.milGuard;
 try{const set=new Set();const f=typeof facOf==="function"?facOf(S):null;if(f&&typeof facMembers==="function")facMembers(f).forEach(x=>{if(x!==S&&x.alive&&!x.out)set.add(x)});
  liveRivals(true).forEach(v=>{if((v.rel||0)>=40)set.add(v)});r.allies=set.size}catch(e){}
 r.thOK=!!S.thDead||(S.th||0)>=BAL.succN.cTh;r.thB=!!S.thDead||(S.th||0)>=BAL.succN.thB;r.thOpp=!S.thDead&&(S.th||0)<BAL.succN.thOpp;return r}
function succOdds(p,son,U){U=U||succSup();if(p==="b"){let o=35+U.pow/5+((S.danh||0)-BAL.succN.bDanh)/2+((S.tamco||0)-BAL.succN.bTam)/3+U.allies*3+(U.thB?8:U.thOpp?-10:0)+(U.vgAlly?5:U.vg?-8:0);return Math.round(cl(o,SUCC.b.min,SUCC.b.max))}
 let o=20+U.pow/6+((S.danh||0)-BAL.succN.cDanh)/2+((S.tamco||0)-BAL.succN.cTam)/2+U.allies*2+(U.milArmy&&U.milGuard?8:0)+(U.vgAlly?8:U.vg?-12:0)-((son&&son.age>=BAL.succN.bAge)?10:0);return Math.round(cl(o,SUCC.c.min,SUCC.c.max))}
function succNeed(t,ok){return{t:(ok?"✓ ":"✗ ")+t,ok:!!ok}}
function succNeeds(p,son,U){const N=[];if(p==="a")return N;const cold=!!S.out;
 if(p==="b"){N.push(succNeed(`Tân đế dưới ${BAL.succN.bAge} tuổi (${son?son.age:0} tuổi)`,son&&son.age<BAL.succN.bAge));N.push(succNeed(`Danh từ ${BAL.succN.bDanh} (có ${S.danh||0})`,(S.danh||0)>=BAL.succN.bDanh));
  N.push(succNeed(`Tâm cơ từ ${BAL.succN.bTam} (có ${S.tamco||0})`,(S.tamco||0)>=BAL.succN.bTam));N.push(succNeed(`Một nhà quyền thần đứng sau ngươi (có ${U.houses.length})`,U.houses.length>=1));
  N.push(succNeed(`Bạc ${BAL.succN.bBac} (có ${S.bac||0})`,(S.bac||0)>=BAL.succN.bBac));if(cold)N.push(succNeed("Không ở lãnh cung",false))}
 if(p==="c"){N.push(succNeed(`Phẩm ${RANKS[BAL.succN.cRank].n} trở lên (đang ${RANKS[S.rank].n})`,S.rank>=BAL.succN.cRank&&!cold));N.push(succNeed(`Danh từ ${BAL.succN.cDanh} (có ${S.danh||0})`,(S.danh||0)>=BAL.succN.cDanh));
  N.push(succNeed(`Tâm cơ từ ${BAL.succN.cTam} (có ${S.tamco||0})`,(S.tamco||0)>=BAL.succN.cTam));N.push(succNeed(`Hai nhà quyền thần đứng sau ngươi (có ${U.houses.length})`,U.houses.length>=2));
  N.push(succNeed(U.mil?`Binh quyền: ${[U.milArmy?"nhà Đại tướng quân":"",U.milGuard?"cấm quân":""].filter(Boolean).join(", ")}`:"Binh quyền: nhà Đại tướng quân hoặc cấm quân theo ngươi",U.mil));
  N.push(succNeed(S.thDead?"Thái hậu không phản đối (đã băng hà)":`Thái hậu không phản đối (Thái hậu với ngươi từ ${BAL.succN.cTh}, có ${S.th||0})`,U.thOK));
  N.push(succNeed(`Bạc ${BAL.succN.cBac} (có ${S.bac||0})`,(S.bac||0)>=BAL.succN.cBac));if(cold)N.push(succNeed("Không ở lãnh cung",false))}
 return N.sort((x,y)=>(+x.ok)-(+y.ok))}
/* ---------- NPC dowager (two-way): the same conditions as (b) ---------- */
function succNpcClaims(v,k){if(!v||!v.alive||v.out||!k||k.age>=BAL.succN.bAge)return false;const tr=(typeof traitsOf==="function"?traitsOf(v):[v.trait]);
 return (((v.danh||40)>=BAL.succN.npcDanh&&(v.tamco||40)>=BAL.succN.npcTam)||tr.some(t=>/Tham vọng|Xảo quyệt|Kiêu ngạo/.test(t||"")))}
let SUCC_NPC=null;
(function(){const o0=over;over=function(h,t,fate,alive){if(SUCC_NPC&&S&&!S.dead){const v=SUCC_NPC;SUCC_NPC=null;
  if(!/buông rèm/.test(t||""))t=String(t||"").replace(/\.?\s*$/,".")+` Tân đế còn nhỏ, ${v.name} buông rèm nhiếp chính, nắm cả triều đình lẫn hậu cung.`;fate=(fate||"")+" · Thánh mẫu nhiếp chính"}
 return o0.call(this,h,t,fate,alive)}})();
/* ---------- hook: the Emperor dies ---------- */
(function(){const e0=emperorDies;emperorDies=function(ev){if(!S||S.dead||(S.succ&&S.succ.on))return e0.apply(this,arguments);/* co-op (review/coop-b1b5-p2 B3): on too; the death roll and the heir are the host's (jcoopworld B3 + B2 S.hr) */
 try{if(!(S.heir&&S.heir.k&&S.heir.k.alive)&&typeof kvOrder==="function"){const o=kvOrder().sort((a,b)=>a.k.bt-b.k.bt);const x=o.find(z=>z.dich)||o[0];if(x)S.heir={k:x.k,v:x.v}}}catch(e){}
 const h=S.heir&&S.heir.k&&S.heir.k.alive?S.heir:null;let open=false,npc=null;
 try{if(h){const v=h.v,live=v&&v.alive&&!v.out;npc=live&&succNpcClaims(v,h.k)?v:null;open=!v||(S.rank>=7&&!S.out&&!npc)}}catch(e){console.error(e)}
 /* co-op: the new Emperor's mother is the other PLAYER: she chooses on her own client; here the base reign ending (no NPC claim) */
 try{if(window.COOPW&&COOPW.on&&h&&h.v&&h.v.coop){open=false;npc=null}}catch(e){}
 if(open){if(ev)log(ev);succOpen(h);return}
 if(npc){SUCC_NPC=npc;const od0=od;od=function(b){return od0(b-12)};try{return e0.apply(this,arguments)}finally{od=od0;SUCC_NPC=null}}
 return e0.apply(this,arguments)}})();
function succOpen(h){const k=h.k;S.succ={on:1,st:0,son:k.name,dm:h.v?1:0,y0:S.year,age0:S.emp&&S.emp.age,era:S.emp&&S.emp.era,q:0,an:0,tam:0,hoa:0};S.empDead=1;
 log(`<b>${empName()} băng hà, thọ ${S.emp.age} tuổi. Di chiếu truyền ngôi cho ${k.name}${h.v?`, con của ${h.v.name}; ngươi là đích mẫu`:", con ngươi"}.</b>`);
 Q=Q.filter(m=>/^succ/.test(m.pid||""));const d=mkP("succ0",{});if(d)Q.unshift({t:"Tiên đế băng hà",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,cls:d.cls});
 try{fx("gold")}catch(e){}try{save()}catch(e){}showModal();render()}
/* ---------- the choice card ---------- */
PEND.succ0=function(){const E=S.succ,son=succSon();if(!E||!son)return null;const U=succSup();const sn=succSN(son);
 const pb=succOdds("b",son,U),pc=succOdds("c",son,U);const nb=succNeeds("b",son,U),nc=succNeeds("c",son,U);
 const hs=U.houses.length?U.houses.map(x=>`nhà ${x.n} (thế lực ${x.pow})`).join(", "):"chưa nhà quyền thần nào";
 const t=`<p>${E.era?`Hoàng thượng niên hiệu ${E.era}`:"Hoàng thượng"} băng hà${E.age0?`, thọ ${E.age0} tuổi`:""}; di chiếu truyền ngôi cho ${son.name}, ${son.age} tuổi, ${E.dm?"ngươi là đích mẫu":"con ngươi"}.</p>
<p>Ngọc tỷ đặt trên án, triều thần quỳ ngoài điện chờ ý ngươi.</p>
<p>Đứng sau ngươi: ${hs}; binh quyền: ${U.mil?[U.milArmy?"nhà Đại tướng quân":"",U.milGuard?"cấm quân":""].filter(Boolean).join(", ")+" theo ngươi":"chưa có"}; phe trong hậu cung: ${U.allies} người.</p>
<p>${S.thDead?"Thái hậu đã băng hà.":`Thái hậu (sắp thành Thái hoàng thái hậu) với ngươi: ${S.th||0}.`} ${U.vg?(U.vgAlly?`${succMN(U.vg)} đứng về phía ngươi.`:`${succMN(U.vg)} đang dòm ngó ngôi báu.`):""}</p>`;
 const o=[
  {n:`Để ${sn} lên ngôi, làm ${E.dm?"Mẫu hậu Hoàng thái hậu":"Hoàng thái hậu"}`,fx:{},x:`Chắc chắn · thành: ${E.dm?"Mẫu hậu Hoàng thái hậu":"Hoàng thái hậu"}, an hưởng ở Từ Ninh cung`,need:[],go:()=>succBegin("a")},
  {n:"Buông rèm nhiếp chính",fx:{},x:`${word(pb)} · tốn: ${fmt({bac:-100,suc:-10})} · thành: buông rèm nghe chính đến khi tân đế ${BAL.age.reign} tuổi, Danh +8 · hỏng: đại thần không phục, Danh -10, chỉ làm Hoàng thái hậu · kèm: tân đế lớn lên sinh oán vì ngươi giữ quyền`,need:nb,go:()=>succTry("b")},
  {n:"Tự lên ngôi Nữ đế",fx:{},x:`${word(pc)} · tốn: ${fmt({bac:-300,suc:-20})} · thành: lên ngôi Nữ đế, đổi niên hiệu · hỏng: binh biến bại lộ, bị phế, ban chết · kèm: vương gia, đại thần dễ khởi binh, thích khách rình rập`,need:nc,go:()=>succTry("c")}];
 return{t,o,who:Object.assign(pMe(),{rw:E.dm?"Hoàng hậu · đích mẫu":RANKS[S.rank].n}),cls:"succ"}};
function succCanPick(p){const son=succSon();return !succNeeds(p,son,succSup()).some(n=>!n.ok)}
function succTry(p){if(!succCanPick(p))return succResume();
 const son=succSon(),o=succOdds(p,son);if(p==="b"){apply({bac:-100,suc:-10});if(roll(o)){apply({danh:8});log(`<b class="g">Ngươi buông rèm nhiếp chính cho tân đế ${succSN(son)} (${word(o)}): thành.</b>`);return succBegin("b")}
  apply({danh:-10});log(`<span class="r">Ngươi xin buông rèm nhiếp chính (${word(o)}): đại thần không phục, quỳ ngoài điện ba ngày. Ngươi đành lui về làm Hoàng thái hậu.</span>`);return succBegin("a",1)}
 apply({bac:-300,suc:-20});if(roll(o)){log(`<b class="g">Ngươi tự lên ngôi Nữ đế (${word(o)}): thành.</b>`);return succBegin("c")}
 log(`<span class="r">Ngươi mưu lên ngôi (${word(o)}): binh biến bại lộ.</span>`);succEnd("c_fail")}
/* ---------- the epilogue: 3 chapters per path ---------- */
function succEnemy(){try{const L=liveRivals(false).filter(v=>v.alive&&!v.out&&!v.queen&&(typeof kitKnownName!=="function"||kitKnownName(v)));if(!L.length)return null;return L.slice().sort((a,b)=>(a.rel||0)-(b.rel||0))[0]}catch(e){return null}}
function succBegin(p,failB){const E=S.succ;const U=succSup();E.p=p;E.st=1;E.ch=0;
 Object.assign(E,p==="a"?{q:1,an:failB?1:0,tam:1,hoa:failB?1:2}:p==="b"?{q:3,an:1,tam:1,hoa:1}:{q:5,an:3,tam:0,hoa:0});
 E.tam+=U.allies>=3?1:0;E.an+=U.vg&&!U.vgAlly?1:0;E.an-=U.mil?1:0;
 if(p==="c")E.nh=pick(SUCC_ERA);
 const en=succEnemy();E.foe=en?en.id:null;succNext()}
function succNext(){const E=S.succ;Q=Q.filter(m=>!/^succ/.test(m.pid||""));const d=mkP("succC",{});if(d)Q.unshift({t:d.title,h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,cls:d.cls});try{save()}catch(e){}}/* chooseM shows and renders after go() */
function succAge(){const son=succSon();const co=!!(window.COOPW&&COOPW.on);S.age=(S.age||30)+SUCC.yrs;/* co-op: the year is the shared world's date (her epilogue is her own ending; the world goes on) */if(!co)S.year=(S.year||1)+SUCC.yrs;if(son&&(!co||(S.kids||[]).includes(son)))son.age=(son.age||0)+SUCC.yrs}
function succRareOK(){const E=S.succ;if(E.p==="a")return (S.duc||0)>=60&&E.hoa>=3&&E.an<=1;if(E.p==="b")return E.hoa>=3&&E.tam>=3&&(S.duc||0)>=50&&(S.tamco||0)>=55;return E.tam>=4&&E.an<=2&&(S.danh||0)>=BAL.succN.rareCDanh&&(S.duc||0)>=50}
function succPick(c){const E=S.succ;if(!E||!c)return;if(c.c)apply(c.c);if(c.s)apply(c.s);for(const k of ["q","an","tam","hoa"])if(c.e&&c.e[k])E[k]=(E[k]||0)+c.e[k];
 if(c.txt)log(c.txt);if(c.do)try{c.do()}catch(e){console.error(e)}
 if(c.end)return succEnd(typeof c.end==="function"?c.end():c.end);
 E.ch++;succAge();if(E.ch===2&&E.r==null)E.r=succRareOK()&&roll(E.p==="a"?12:E.p==="b"?10:8)?1:0;succNext()}
function succCH(){const E=S.succ,son=succSon(),sn=succSN(son),foe=E.foe!=null?rivals.find(v=>v.id===E.foe&&v.alive):null,U=succSup();
 const vgN=U.vg?succMN(U.vg):"Thân vương Dụ";const fN=foe?foe.name:"một phi tần cũ";
 const A=[
  {t:"Lễ tôn phong ở Từ Ninh cung",h:`<p>Tân đế ${sn} lên ngôi. Ngươi nhận kim sách, được tôn làm ${E.dm?"Mẫu hậu Hoàng thái hậu":"Hoàng thái hậu"}, dời sang Từ Ninh cung.</p><p>Ấn phượng của hậu cung vẫn còn trong tay ngươi. Tân đế quỳ trước thềm: “Mẫu hậu muốn thế nào, nhi thần đều nghe.”</p>`,
   o:[{n:"Trao ấn phượng cho tân Hoàng hậu, lui về Từ Ninh cung",e:{hoa:2,q:-1},s:{duc:3},txt:"Ngươi trao ấn phượng, lui về Từ Ninh cung."},
      {n:"Giữ ấn phượng, tự tay chọn Hoàng hậu cho tân đế",e:{q:2,hoa:-1,an:1},s:{danh:3},txt:"Ngươi giữ ấn phượng, tự chọn Hoàng hậu cho tân đế."},
      {n:"Xin tân đế ân xá phi tần tiên đế",c:{bac:-50},e:{tam:2},s:{duc:4},txt:"Phi tần tiên đế được ân xá, cả cung cảm ơn ngươi."}]},
  {t:"Ngoại thích",h:`<p>Họ ngoại của ngươi dâng sớ xin vào triều. Các đại thần nhìn nhau: ngoại thích chuyên quyền là chuyện sử sách vẫn chép.</p><p>Tân đế đến Từ Ninh cung hỏi ý ngươi.</p>`,
   o:[{n:"Cất nhắc họ ngoại vào triều",e:{q:2,an:2},s:{danh:4},txt:"Họ ngoại của ngươi được cất nhắc vào triều."},
      {n:"Dặn họ ngoại giữ phận, không can chính",e:{hoa:1,tam:1},s:{duc:2},txt:"Ngươi dặn họ ngoại giữ phận."},
      {n:"Để Hoàng đế tự quyết",e:{hoa:2,q:-1},txt:"Ngươi để Hoàng đế tự quyết chuyện họ ngoại."}]},
  {t:"Chuyện cũ hậu cung",h:`<p>${foe?`${fN}, người từng ghét ngươi nhất, nay là Thái phi ở Thọ Khang cung.`:"Những người từng hại ngươi nay đều là Thái phi ở Thọ Khang cung."} Có kẻ dâng tờ khai cũ lên Từ Ninh cung.</p><p>Tân đế nói: “Mẫu hậu định đoạt.”</p>`,
   o:[{n:`Tha cho ${foe?fN:"họ"}, cho xuất gia`,e:{tam:1,hoa:1},s:{duc:3},txt:`Ngươi tha cho ${foe?fN:"các Thái phi"}, cho xuất gia.`,end:()=>succEndA()},
      {n:`Ép ${foe?fN:"họ"} tuẫn táng theo tiên đế`,e:{q:1,an:2,hoa:-2},s:{duc:-6},txt:`Ngươi ban lụa trắng cho ${foe?fN:"các Thái phi"}.`,do:()=>{if(foe){foe.alive=false}},end:()=>succEndA()},
      {n:"Giao cho Hoàng đế xét xử",e:{hoa:1},txt:"Ngươi giao chuyện cũ cho Hoàng đế xét.",end:()=>succEndA()},
      {n:"✦ Tự tay dạy hoàng trưởng tôn đọc sách",rare:1,c:{suc:-5},txt:"Ngươi tự tay dạy hoàng trưởng tôn đọc sách.",end:"a_rare"}]}];
 const B=[
  {t:"Buông rèm ở Dưỡng Tâm điện",h:`<p>Sau ngai rồng buông một tấm rèm châu. Tân đế ${sn} ${son?son.age:""} tuổi ngồi trước, ngươi ngồi sau rèm nghe tấu.</p><p>Tấu chương chất cao trên án; các phụ chính đại thần chờ xem ngươi tin ai.</p>`,
   o:[{n:"Trọng dụng phụ chính đại thần",e:{tam:2,q:-1},txt:"Ngươi giao việc cho phụ chính đại thần."},
      {n:"Tự tay phê tấu chương",c:{suc:-10},e:{q:2,an:1},s:{tamco:2},txt:"Ngươi tự tay phê tấu chương đến canh ba."},
      {n:"Mời đại nho vào cung dạy tân đế",c:{bac:-50},e:{hoa:2},s:{danh:2},txt:"Đại nho vào cung dạy tân đế."}]},
  {t:"Vương gia và đại thần",h:`<p>${vgN} giữ binh ở đất phong, lời ra tiếng vào: “Đàn bà sau rèm, sao trị được thiên hạ?”</p><p>Mấy đại thần dâng mật sớ, chờ ý ngươi.</p>`,
   o:[{n:"Ban thưởng, vỗ về vương gia",c:{bac:-150},e:{an:-2},txt:`Ngươi ban thưởng hậu cho ${vgN}.`},
      {n:"Tước binh quyền vương gia",e:{q:2,an:2},txt:`Ngươi tước binh quyền của ${vgN}.`},
      {n:"Gả con gái nhà vương gia cho người thân tín",e:{tam:1,an:-1},txt:"Hai nhà kết thông gia, lời xì xào lắng xuống."}]},
  {t:"Tân đế mười sáu tuổi",h:`<p>Tân đế ${sn} tròn mười sáu tuổi, đã đọc xong kinh sử. Triều thần dâng sớ xin Hoàng thái hậu trả rèm, để Hoàng đế thân chính.</p>`,
   o:[{n:"Trả rèm, để Hoàng đế thân chính",e:{hoa:2},s:{duc:3},txt:"Ngươi cuốn rèm châu, trao ngọc tỷ cho Hoàng đế.",end:"b_ok"},
      {n:"Giữ rèm thêm vài năm",e:{q:2,hoa:-3},txt:"Ngươi giữ rèm thêm vài năm.",end:()=>E.q>=6&&E.tam>=2?"b_keep":"b_bad"},
      {n:"✦ Cùng Hoàng đế ngự triều",rare:1,c:{suc:-5},txt:"Ngươi cùng Hoàng đế ngự triều.",end:"b_rare"}]}];
 const C=[
  {t:"Đăng cơ",h:`<p>Chuông Thái Hòa điện rung chín hồi. Ngươi khoác long bào, đội mũ miện, bước lên ngai rồng; niên hiệu đổi thành ${E.nh||"Thiên Thụ"}.</p><p>Triều thần quỳ rạp. ${sn} đứng hàng đầu, chờ xem mẫu thân định phận mình thế nào.</p>`,
   o:[{n:`Lập ${sn} làm Hoàng thái tử`,e:{hoa:2,an:-1},txt:`Ngươi lập ${sn} làm Hoàng thái tử.`},
      {n:`Phong ${sn} làm thân vương, tự giữ toàn quyền`,e:{q:2,an:2,hoa:-3},txt:`Ngươi phong ${sn} làm thân vương.`},
      {n:"Đại xá thiên hạ, giảm thuế ba năm",c:{bac:-200},e:{tam:3},txt:"Thiên hạ được đại xá, giảm thuế ba năm."}]},
  {t:"Vương gia khởi binh",h:`<p>${vgN} dựng cờ “thanh quân trắc”, kéo quân về kinh. Kinh thành đóng cửa, lòng người hoang mang.</p>`,
   o:[{n:"Sai đại tướng dẹp loạn",need:[succNeed("Binh quyền theo ngươi",U.mil)],e:U.mil?{an:-2,q:1}:{an:1},txt:"Đại tướng lĩnh quân dẹp loạn."},
      {n:"Chiêu hàng, phong thêm đất",c:{bac:-200},e:{an:-1,tam:1,q:-1},txt:`Ngươi chiêu hàng ${vgN}.`},
      {n:"Tự thân ra trận đốc chiến",c:{suc:-25},e:{tam:2,q:1,an:1},txt:"Ngươi tự thân ra cổng thành đốc chiến."}]},
  {t:"Đêm Nguyên tiêu",h:`<p>Đêm Nguyên tiêu, một thích khách lẻn vào giữa đám đèn hoa, bị cấm quân bắt ngay trước kiệu ngươi. Hôm sau, triều thần dâng sớ: “Xin bệ hạ trả ngôi cho chính thống.”</p>`,
   o:[{n:`Nhường ngôi cho ${sn}, lui về làm Thái thượng hoàng`,e:{hoa:2},txt:`Ngươi nhường ngôi cho ${sn}.`,end:"c_abd"},
      {n:"Giữ ngôi đến cuối đời",e:{q:1},txt:"Ngươi giữ ngôi.",end:()=>E.an>=BAL.cut.succEnd.an?"c_bad":E.q>=BAL.cut.succEnd.q?"c_ok":"c_abd"},
      {n:"✦ Dặn lập bia không chữ",rare:1,c:{suc:-5},txt:"Ngươi dặn lập bia không chữ.",end:"c_rare"}]}];
 const L=E.p==="a"?A:E.p==="b"?B:C;return L[Math.min(E.ch||0,2)]}
/* the words of an epilogue choice (no numbers): from its hidden meters; risk (nguy up, mẫu tử down) goes to Kèm */
const SUCC_W={hoa:["mẹ con thêm gần","mẹ con xa cách"],q:["quyền trong tay thêm chặt","quyền lỏng tay"],tam:["lòng người theo ngươi","mất lòng người"],an:["bớt kẻ dòm ngó","thêm kẻ dòm ngó, nguy hơn"]};
function succWords(c){const g=[],k=[];const e=c.e||{};for(const m of ["hoa","q","tam","an"]){const v=e[m];if(!v)continue;const up=m==="an"?v<0:v>0;(up?g:k).push(SUCC_W[m][up?0:1])}
 if(c.end)g.push("khép lại vĩ thanh");return "Chắc chắn"+(g.length?" · thành: "+g.join(", "):"")+(k.length?" · kèm: "+k.join(", "):"")+" · hỏng: không mất gì"}
PEND.succC=function(){const E=S.succ;if(!E||!E.on||!E.p)return null;const ch=succCH();if(!ch)return null;const son=succSon();
 const o=ch.o.filter(c=>!c.rare||(E.ch===2&&E.r)).map(c=>({n:c.n,fx:Object.assign({},c.c||{}),x:succWords(c),need:c.need||[],rare:c.rare?1:0,go:()=>succPick(Object.assign({},c,{c:null}))}));
 const ttl={a:E.dm?"Mẫu hậu Hoàng thái hậu":"Hoàng thái hậu",b:"Nhiếp chính Thái hậu",c:"Nữ đế"}[E.p];
 return{title:`${ttl} · Chương ${(E.ch||0)+1}: ${ch.t}`,t:ch.h,o,who:Object.assign(pMe(),{rw:ttl}),cls:"succ"}};
/* a chapter option's cost is put into fx (so the kit shows it in Tốn and chooseM takes it); succPick must not take it twice */
function succEndA(){const E=S.succ;return E.an>=4&&E.hoa<=0?"a_bad":E.dm?"a_dm":"a_ok"}
/* ---------- endings ---------- */
function succEnd(k){const E=S.succ||{},e=SUCC_END[k]||SUCC_END.a_ok,son=succSon(),sn=succSN(son);const yrs=window.COOPW&&COOPW.on?(E.ch||0)*SUCC.yrs/* co-op: the world's year does not move */:S.year-(E.y0||S.year);
 const pre=yrs>0?`${yrs} năm sau ngày tiên đế băng hà. `:"";let t="",fate=e.h,die=false;
 switch(k){
  case"a_ok":t=`${pre}Hoàng đế ${sn} hiếu thuận, sớm tối thỉnh an. Ngươi sống những năm cuối đời yên ổn ở Từ Ninh cung, được tôn là Hoàng thái hậu đức độ.`;break;
  case"a_dm":t=`${pre}Hoàng đế ${sn} kính ngươi như mẹ ruột. Ngươi là Mẫu hậu Hoàng thái hậu, giữ lễ nghi lục cung đến cuối đời.`;break;
  case"a_bad":t=`${pre}Họ ngoại lộng quyền, Hoàng đế ${sn} nghi kỵ mẫu thân. Từ Ninh cung bị khóa cửa, ngươi sống nốt đời trong cảnh giam lỏng, chỉ còn danh Hoàng thái hậu.`;break;
  case"a_rare":t=`${pre}Hoàng trưởng tôn do chính tay ngươi dạy dỗ lớn lên nhân hậu, sáng suốt. Ngày cháu đăng cơ, ngươi được tôn Thái hoàng thái hậu, ba đời đế vương cùng quỳ trước Từ Ninh cung.`;break;
  case"b_ok":t=`${pre}Ngươi cuốn rèm châu, trả ngọc tỷ cho Hoàng đế ${sn}. Sử quan chép: Thái hậu buông rèm mười năm, thiên hạ yên ổn, trả quyền không chút luyến tiếc.`;break;
  case"b_keep":t=`${pre}Ngươi giữ rèm đến cuối đời. Triều đình nghe theo ngươi, nhưng mẹ con chỉ còn lễ nghi lạnh nhạt; Hoàng đế ${sn} đợi đến ngày ngươi nhắm mắt mới thật sự thân chính.`;break;
  case"b_bad":t=`${pre}Hoàng đế ${sn} cùng đại thần ép ngươi trả rèm. Thân tín của ngươi bị bãi chức; ngươi sống nốt đời ở Từ Ninh cung, cửa cung có cấm quân canh giữ.`;break;
  case"b_rare":t=`${pre}Hoàng đế ${sn} đặt hai ngai song song trên điện, mẹ con cùng ngự triều. Thiên hạ gọi là “Nhị thánh”; triều ấy được sử sách chép là thịnh trị.`;break;
  case"c_ok":t=`${pre}Ngươi trị vì đến cuối đời, niên hiệu ${E.nh||"Thiên Thụ"}. Bờ cõi yên ổn, kho lúa đầy; ngươi băng hà trên ngai rồng, truyền ngôi lại cho ${sn}.`;break;
  case"c_abd":t=`${pre}Ngươi nhường ngôi cho ${sn}, lui về làm Thái thượng hoàng. Niên hiệu ${E.nh||"Thiên Thụ"} khép lại; ngươi sống những năm cuối bên hồ sen, được con cháu phụng dưỡng.`;break;
  case"c_bad":t=`${pre}Đại thần và vương gia cùng khởi binh, cấm quân mở cửa cung. Ngươi bị phế, giam ở biệt cung, rồi được ban rượu độc.`;die=true;break;
  case"c_rare":t=`${pre}Ngươi trị vì đến cuối đời, dặn lập bia không chữ trước lăng: “Công tội để đời sau phán xét.” Ngàn năm sau người ta vẫn đứng trước tấm bia ấy.`;break;
  case"c_fail":t=`Binh biến bại lộ trước khi trời sáng. Đại thần quỳ ngoài điện tâu ngươi mưu nghịch; ${sn} được đỡ lên ngôi, ngươi bị phế và ban chết.`;die=true;break}
 if(E.p==="c"&&k!=="c_fail")fate+=` · niên hiệu ${E.nh||"Thiên Thụ"}`;if(die)fate+=" · ban chết";
 succBook(k);if(e.rare)try{if(window.RARE97){RARE97.add("succ_"+k,{t:"Kế vị",tag:e.h});RARE97.meet("succ_"+k,e.h)}}catch(x){}
 try{S.succ.on=0;S.succ.end=k}catch(x){}Q=Q.filter(m=>!/^succ/.test(m.pid||""));over(e.h,t,fate,!die)}
/* ---------- Sổ luân hồi ---------- */
const SUCC_BK="ctm-succ-book";
function succBookGet(){try{return JSON.parse(localStorage.getItem(SUCC_BK)||"{}")||{}}catch(e){return {}}}
function succBook(k){try{const b=succBookGet();b[k]=(b[k]||0)+1;localStorage.setItem(SUCC_BK,JSON.stringify(b))}catch(e){}}
if(typeof pastHTML==="function")(function(){const p0=pastHTML;pastHTML=function(){const h=p0.apply(this,arguments);try{const b=succBookGet();const K=Object.keys(SUCC_END).filter(k=>k!=="a_dm");const seen=K.filter(k=>b[k]);if(!seen.length)return h;
 const R=K.filter(k=>SUCC_END[k].rare),rs=R.filter(k=>b[k]);
 const rows=[["Đã gặp",`<b>${seen.length}/${K.length}</b> kết cục · kết hiếm ${rs.length}/${R.length}`,seen.length?"g":""]].concat(seen.map(k=>[(SUCC_END[k].rare?"✦ ":"")+SUCC_END[k].h,b[k]>1?`${b[k]} lần`:"1 lần"]));
 return h+`<h3>Kết cục kế vị</h3>`+(typeof rows67==="function"?rows67(rows):kitRows(rows))}catch(e){return h}}})();
/* ---------- the world stands still while the succession is open ---------- */
(function(){const e0=endTurn;endTurn=function(){if(S&&S.succ&&S.succ.on&&!S.dead&&Q.some(m=>/^succ/.test(m.pid||""))){showModal();return}const r=e0.apply(this,arguments);
 try{if(S&&S.succ&&S.succ.on&&!S.dead){Q=Q.filter(m=>/^succ/.test(m.pid||""));if(!Q.length)succResume();else showModal();const d=$("dawn");if(d){d.classList.remove("on","kbkdawn");d.hidden=true;document.body.classList.remove("kbk-open")}}}catch(e){console.error(e)}return r}})();
if(typeof dawn==="function")(function(){const d0=dawn;dawn=function(){if(S&&S.succ&&S.succ.on)return;return d0.apply(this,arguments)}})();
function succResume(){const E=S.succ;if(!E||!E.on)return;const id=E.p?"succC":"succ0";const d=mkP(id,{});if(!d){E.on=0;return}Q.unshift({t:d.title||"Tiên đế băng hà",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,cls:d.cls});showModal()}
(function(){const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{if(S&&S.succ&&S.succ.on){Q=Q.filter(m=>/^succ/.test(m.pid||""));
 Q.forEach(m=>{if(m.pid==="succC"){const d=mkP("succC",{});if(d)m.t=d.title}else if(m.pid==="succ0")m.t="Tiên đế băng hà"});if(!Q.length){const E=S.succ,id=E.p?"succC":"succ0";const d=mkP(id,{});if(d)Q.push({t:d.title||"Tiên đế băng hà",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,cls:d.cls})}}}catch(e){console.error(e)}return r}})();
/* ---------- the card on screen: full act-card rows on the choice card (owner brief), Cần lists, rare glow ---------- */
function succPatch(m){const M=$("modal");if(!M)return;m.opts.forEach((c,i)=>{const b=M.querySelector(`.opt[data-m="${i}"]`);if(!b)return;
 if(c.need&&c.need.length){b.setAttribute("data-kneed",encodeURIComponent(JSON.stringify(c.need)));if(c.need.some(n=>!n.ok))b.disabled=true}
 if(c.rare){b.classList.add("ksel","k97");b.setAttribute("aria-label","Cơ duyên hiếm: "+String(c.n).replace(/<[^>]+>/g,""))}})}
(function(){const s0=showModal;showModal=function(){const m=Q[0];if(!m||!/^succ/.test(m.pid||""))return s0.apply(this,arguments);
 if(m.pid==="succ0"){m.showOut=true;m.optLayout="rows";m.headArt=SUCC_ART["succ-card"]}/* no caption: the dialog title already says it (one fact, one place) */
 else if(m.pid==="succC"){const E=S.succ;const a=E&&E.p&&SUCC_ART[E.p+((E.ch||0)+1)];if(a)m.headArt=a}
 const kf=kitFix;kitFix=function(){kitFix=kf;try{succPatch(m)}catch(e){console.error(e)}return kf.apply(this,arguments)};
 try{return s0.apply(this,arguments)}finally{kitFix=kf}}})();
/* chooseM refuses a locked option even if it is reached another way */
(function(){const c0=chooseM;chooseM=function(i){const m=Q[0];if(m&&/^succ/.test(m.pid||"")){const c=m.opts&&m.opts[i];if(!c||(c.need&&c.need.some(n=>!n.ok)))return}return c0.apply(this,arguments)}})();
/* ---------- debug jump: succDebug("a"|"b"|"c"|"") ---------- */
window.succDebug=function(p,prepOnly){if(!S)return"no life";Q.length=0;let son=mySons()[0];if(!son){son=mkKid("m",p==="c"?17:9);son.bt=S.turn-son.age*12;S.kids.push(son)}
 if(p==="b")son.age=Math.min(son.age,10);setHeir(son,null);
 if(p==="b"||p==="c"){S.danh=p==="c"?85:62;S.tamco=p==="c"?70:50;S.bac=Math.max(S.bac,500);S.duc=Math.max(S.duc,55);S.rank=Math.max(S.rank,p==="c"?5:3);S.th=70;
  try{const T=trS();const ks=Object.keys(T.H);ks.slice(0,p==="c"?3:1).forEach(c=>{T.H[c].af.me=60});if(p==="c")T.H["Đại tướng quân"].af.me=60}catch(e){}}
 if(prepOnly){render();return "prep"}emperorDies("");return S.succ};
