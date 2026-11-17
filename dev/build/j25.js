/* ================= AUDIT PASS: one builder for talk lines, explicit results, honest locks ================= */
/* talk options: tag place harms with their act key so they share the dossier's builder */
const HARMK={"Dò la":"spy","Tung tin đồn":"rumor","Bỏ độc vào trà nàng":"poison","Bỏ xạ hương vào thuốc nàng":"musk","Đẩy con nàng xuống hồ":"pond","Vu oan":"frame","Tố vượt phẩm":"vp","Đẩy nàng xuống hồ sen":"pushp","Ngáng chân nàng":"trip"};
AOUT.trip=["nàng vấp ngã: Danh nàng -3 (có thai: có thể động thai)","bị thấy: nàng oán ngươi"];AOUT.pushp=["nàng rơi xuống hồ sen, Sức nàng giảm mạnh","bị lộ: bị phạt, nàng oán"];
const RISKRE=/(lộ:|mách lại|nắm thóp|có thể (mách|nắm|bị|lật)|phật ý|bị khám|tội|ban chết|sẽ)/;
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);const v=p&&p.ref;return A.map(a=>{a=Object.assign({},a);if(HARMK[a.n])a.k=HARMK[a.n];
  if(a.n==="Nhờ giúp đỡ"&&v&&aff(v,S)<30){a.lock=true;a.t=`cần nàng quý ngươi 30 (đang ${aff(v,S)})`}
  if(a.n==="Cảnh báo nàng"&&/không có căn cứ/.test(a.x||"")){a.lock=true;a.t="chưa biết ai đang hại nàng"}
  if(a.open&&!S.inv.some(e=>!e.h)){a.lock=true;a.t="rương trống"}
  if(/^Bàn tán về/.test(a.n)&&/mách lại/.test(a.x||"")){a.x="";a.x=`nàng quý ngươi ${balSg(-BAL.talk.gossip.miss)}`;a.risk=`nàng mách lại, ${a.n.replace(/^Bàn tán về /,"")} oán ngươi ${balSg(BAL.talk.gossip.tellOan)}: ${chanceW(BAL.talk.gossip.tell)}`}
  if(a.n==="Chia sẻ bí mật"&&/nắm thóp/.test(a.x||"")){a.x=a.x.replace(/ · nàng có thể nắm thóp ngươi/,"");a.risk=`nàng nắm ${balAb(BAL.eff.j9.evRun)} chứng cứ của ngươi: ${chanceW(50)}`}
  if(a.n==="Khiêu khích"){a.risk=a.x;a.x=""}
  return a})}})();
/* the talk line: cost in khắc, gains green, risks and failure red, needs as disabled reasons */
optLine=function(a){const o=a.o==null?100:a.o;const rolled=o<100&&!a.lock;const tc=a.act?2:1;
 if(a.k&&AOUT[a.k]){return actLineRaw(a.k,rolled?word(o):"Chắc chắn",[`${tc} khắc`,fmt(a.c||{})].filter(Boolean).join(", "))}
 const xs=String(a.x||"").split(" · ").filter(Boolean);const gain=xs.filter(s=>!RISKRE.test(s)),risk=xs.filter(s=>RISKRE.test(s)).concat(a.risk?[a.risk]:[]);
 return kitParse([rolled?word(o):"Chắc chắn",`tốn: ${tc} khắc${a.c&&fmt(a.c)?", "+fmt(a.c):""}`,[fmt(a.w||{}),...gain].filter(Boolean).length?"thành: "+[fmt(a.w||{}),...gain].filter(Boolean).join(", "):"",rolled?"hỏng: "+(fmt(a.l||{})||(a.fail?"có hậu quả, xem kết quả":"không được gì")):"",risk.length?"hỏng: "+risk.join(", "):""].filter(Boolean).join(" · "))};
/* R-E: a gift or a planted item spends the time only when an item is chosen */
(function(){const t1=talk;talk=function(oi){const p=S&&curPeople()[popIdx];const a=p&&talkOpts(p)[oi];if(a&&a.open){if(a.lock||S.dead||Q.length)return;const tc=a.act?2:1;if(!can(tc))return;S.payOnPick=tc;S.visit.tk=S.visit.tk||{};a.open();render();return}return t1.apply(this,arguments)}})();
["giftpick","plantpick"].forEach(id=>{const b0=PEND[id];if(!b0)return;PEND[id]=function(){const d=b0.apply(this,arguments);if(d&&d.o)d.o=d.o.map(o=>/^Thôi/.test(o.n)?Object.assign({},o,{go:()=>{S.payOnPick=0;if(o.go)o.go()}}):Object.assign({},o,{go:()=>{if(S.payOnPick){spend(S.payOnPick);S.payOnPick=0;if(popIdx!=null&&S.visit){S.visit.tk=S.visit.tk||{};S.visit.tk[popIdx]=1}}if(o.go)o.go()}}));return d};});
/* gifts list their gain per target and a face */
(function(){const g0=PEND.giftpick;PEND.giftpick=function(p){const d=g0.apply(this,arguments);try{const e=S.inv[p&&p.ix!=null?p.ix:-1];if(d&&d.o)d.o.forEach(o=>{if(/^Thôi/.test(o.n))return;if(e){const r=/Hoàng thượng/.test(o.n)?"emp":/Thái hậu/.test(o.n)?"th":rivals.find(v=>o.n.includes(v.name));if(r){const g=giftVal(Object.assign({k:e.k},IT[e.k]),r);o.x=o.x||`${r==="emp"?"Sủng":r==="th"?"Thái hậu quý ngươi":"nàng quý ngươi"} +${g}`}}})}catch(x){}return d}})();
/* R-B: explicit verdicts and every kind of change */
function relSnap(){const o={};for(const v of rivals){o[v.id]={a:aff(v,S),m:aff(S,v),e:v.ev||0,g:v.ghen||0,o:Math.round(oan(v,S))}}return o}
(function(){const rs=rsnap;rsnap=function(){const b=rs.apply(this,arguments);if(b){b.rel=relSnap();b.maidL=S.maid?S.maid.loyal:0}return b}})();
resultShow=function(title,before,okHint){if(!S||!before||S.dead)return;const d=RKEYS.map(([k,n])=>[n,(S[k]||0)-before[k],S[k]||0]).filter(x=>x[1]);if(S.maid&&S.maid.loyal!==before.maid)d.push([`Lòng ${S.maid.name}`,S.maid.loyal-before.maid,S.maid.loyal]);
 const R=before.rel||{};for(const v of rivals){const b=R[v.id];if(!b)continue;const a=aff(v,S),m=aff(S,v),e=v.ev||0,g=v.ghen||0,o=Math.round(oan(v,S));const nm=v.name.split(" ").pop();
  if(a!==b.a)d.push([`${nm} quý ngươi`,a-b.a,a]);if(m!==b.m)d.push([`Ngươi với ${nm}`,m-b.m,m]);if(e!==b.e)d.push([`Chứng cứ về ${nm}`,e-b.e,e]);if(g!==b.g)d.push([`${nm} ghen`,-(g-b.g),g,true]);if(o!==b.o)d.push([`${nm} oán ngươi`,-(o-b.o),o,true])}
 const n=Math.max(0,Math.min(S.logs.length,(S.logSeq||0)-before.seq));const why=S.logs.slice(0,n).map(plain).reverse().join(" ").replace(/\s+/g," ").trim();
 const seal=okHint==="sure"?"XONG":okHint===false?"HỎNG":okHint===true?"THÀNH":(/chặn kịp|phát giác|bị lộ|bị bắt|không thành|hỏng|từ chối|không ai tin/i.test(why)?"HỎNG":"THÀNH");if(!d.length&&!why)return;
 if(window.__bot)return;let t=$("rtoast");if(!t){t=document.createElement("div");t.id="rtoast";document.body.appendChild(t)}t.onclick=()=>t.classList.remove("on");
 t.className="rtoast "+(seal==="HỎNG"?"bad":seal==="XONG"?"sure":"ok");t.innerHTML=`<b class="seal">${seal}</b><div class="rt"><b>${title}</b><div class="rd">${d.map(([k,v,now,inv])=>`<span class="ef ${(inv?-v:v)>0?(inv?"r":"g"):(inv?"g":"r")}">${k} ${now-(inv?-v:v)} → ${now}</span>`).join('<span class="ksep">·</span>')||'<span class="ef n">không đổi chỉ số</span>'}</div>${why?`<small>${why}</small>`:""}<small class="past">Chạm để đóng · đầy đủ ở Nhật ký</small></div>`;
 void t.offsetWidth;t.classList.add("on");clearTimeout(window.__rtT);window.__rtT=setTimeout(()=>t.classList.remove("on"),7000)};
/* verdicts: deck cards by their roll, sure acts 'XONG', scheme acts by their own outcome words */
(function(){const ro=runOpt;runOpt=function(a){const r=ro.apply(this,arguments);window.__lastOk=(a&&(a.o==null||a.o>=100))?"sure":r;return r}})();
(function(){const f=window.doAct;window.doAct=function(i,k){window.__actK=k;return f.apply(this,arguments)}})();
/* stop the buổi from turning over under the result: wait a little longer */
(function(){const r0=render;render=function(){const L=advLock;if(!S||S.dead||Q.length||S.mg||used<BAL.time.khac||L)return r0.apply(this,arguments);advLock=true;const ret=(function(){const a=advLock;advLock=true;return r0.apply(this,arguments)}).apply(this,arguments);setTimeout(()=>{advLock=false;if(used>=BAL.time.khac&&!Q.length&&S&&!S.dead&&!S.mg)nextBuoi()},2600);return ret}})();
/* Xuất gia asks first */
function xgConfirm(go){Q.unshift({act:1,t:"Xuất gia?",h:"<p>Cạo tóc đi tu là <b>kết thúc kiếp này</b>. Không quay lại được.</p>",opts:[{n:"Xuất gia, kết thúc kiếp này",fx:{},x:"kết thúc kiếp này",go},{n:"Thôi, ở lại",fx:{}}]});showModal()}
/* no faking illness from lãnh cung; no deck card that cannot help */
(function(){const d0=deal;deal=function(){d0.apply(this,arguments);if(S&&S.out)deck=deck.filter(a=>a.n!=="Giả bệnh")}})();
/* map tiles: every disabled tile says why */
(function(){const m0=mapHTML;mapHTML=function(){let h=m0.apply(this,arguments);const why=S.out?"đang ở lãnh cung":S.confined?`đang cấm túc (còn ${S.confined} tháng)`:"";if(why)h=h.replace(/<span class="mband">/g,`<span class="mband"><span class="mchip">${why}</span>`);
 h=h.replace(new RegExp(`(data-go="${S.place}"[^>]*>(?:(?!</button>).)*?<span class="mband">)`,"s"),`$1<span class="mchip">đang ở đây</span>`);return h}})();
/* kids: acts on the card, and a guard over them (two-way: rivals harm kids, she can protect them) */
function kidActs(k){if(!k.alive)return[];const t2=whyTime(2);return [pbtn(`data-kid="teach" data-kn="${k.name}"`,"Dạy học",`Chắc chắn · tốn: 2 khắc · thành: Tài con +${4+Math.round(S.tai/20)}`,t2||(k.age<3?"con còn quá nhỏ":"")),
 pbtn(`data-kid="care" data-kn="${k.name}"`,"Chăm sóc",`Chắc chắn · tốn: 2 khắc, Bạc -${BAL.bacFee.kidCare} · thành: Sức khỏe con +10`,t2||(S.bac<BAL.bacFee.kidCare?"thiếu bạc (cần "+BAL.bacFee.kidCare+")":k.hp>=100?"con đang khỏe":"")),
 pbtn(`data-kid="greet" data-kn="${k.name}"`,"Dẫn đi thỉnh an Hoàng thượng",`${word(od(70+S.sung/10))} · tốn: 2 khắc, Sức -5 · thành: Hoàng thượng thương con +8, Sủng +2 · hỏng: không gặp được ngài`,t2||(k.age<2?"con còn quá nhỏ":"")),
 pbtn(`data-kid="guard"`,"Canh giữ các con",`Chắc chắn · tốn: 2 khắc, Bạc -${BAL.bacFee.kidGuard} · thành: 2 tháng kẻ hại con ngươi dễ bị chặn (1 trong 2 lần)`,t2||(S.bac<BAL.bacFee.kidGuard?"thiếu bạc (cần "+BAL.bacFee.kidGuard+")":S.kidGuard>0?`đang canh (còn ${S.kidGuard} tháng)`:""))]}
function kidAct(a,name){const k=S.kids.find(x=>x.name===name&&x.alive);if(S.dead||Q.length||!can(2))return;const b=rsnap();
 if(a==="teach"&&k&&k.age>=3){spend(2);const g=4+Math.round(S.tai/20);k.tal=cl(k.tal+g,0,100);log(`Dạy ${k.name} học: Tài con +${g}.`)}
 else if(a==="care"&&k&&S.bac>=BAL.bacFee.kidCare){spend(2);apply({bac:-BAL.bacFee.kidCare});k.hp=cl(k.hp+BAL.eff.j25.hpKidAct,0,100);log(`Chăm sóc ${k.name}: Sức khỏe con ${balSg(BAL.eff.j25.hpKidAct)}.`)}
 else if(a==="greet"&&k){spend(2);apply({suc:-5});if(roll(od(70+S.sung/10))){k.fond=cl(k.fond+BAL.eff.j25.fondKidAct,0,100);apply({sung:BAL.eff.j25.sungKidAct});log(`Dẫn ${k.name} thỉnh an: Hoàng thượng thương con ${balSg(BAL.eff.j25.fondKidAct)}, Sủng ${balSg(BAL.eff.j25.sungKidAct)}.`)}else log(`Dẫn ${k.name} đi thỉnh an, Hoàng thượng bận không gặp.`)}
 else if(a==="guard"&&S.bac>=BAL.bacFee.kidGuard&&!(S.kidGuard>0)){spend(2);apply({bac:-BAL.bacFee.kidGuard});S.kidGuard=2;log("Ngươi cắt người canh giữ các con 2 tháng.")}else return;resultShow(a==="guard"?"Canh giữ các con":"Việc của con",b,a==="greet"?null:"sure");render()}
document.addEventListener("click",e=>{const b=e.target.closest("[data-kid]");if(b&&!b.disabled){e.stopPropagation();kidAct(b.dataset.kid,b.dataset.kn)}},true);
(function(){const kc=kidCard;kidCard=function(k){let h=kc.apply(this,arguments);if(k.alive){const acts=kidActs(k).join("");h=h.replace('<div class="pcr">',`<div class="pcr"><h5>Chăm con</h5><div class="pcb">${acts}</div>`)}return h}})();
(function(){const r0=runAct;runAct=function(a,t,k){if(t===S&&a!==S&&["kpoison","pond","kframe","ksab"].includes(k)&&S.kidGuard>0&&roll(50)){/*evok: kid-harm act (runAct deed, outer wrapper)*/evA(S,a,BAL.eff.j25.evTop);return `<b>[${ACT[k].n} · hỏng]</b> Người canh con ngươi chặn được kẻ lạ, khai ra người của ${a.name}: chứng cứ ${balSg(BAL.eff.j25.evTop)}. `}return r0.apply(this,arguments)}})();
(function(){const m0=monthTick;monthTick=function(){const r=m0.apply(this,arguments);if(S&&S.kidGuard>0)S.kidGuard--;return r}})();
/* honest disabled reasons on the dossier for acts whose x is a goal, not a lack */
const LACK={musk:t=>!t.preg||t.hidden?"nàng không có thai (ngươi biết)":"",catswap:t=>!(t.preg>=6)||t.hidden?"nàng chưa có thai tháng 6":"",vp:t=>!vpItems(t).length?"nàng không mặc đồ quá phẩm":"",plant:()=>!S.inv.some(e=>!e.h)?"rương ngươi trống":"",gift:()=>!S.inv.some(e=>!e.h)?"rương ngươi trống":"",block:t=>t.block?"thẻ nàng đang bị rút":S.bac<actBac("block",S,t)?"thiếu bạc (cần "+actBac("block",S,t)+")":""};
(function(){const g0=rvGroups;rvGroups=function(v,i){const G=g0.apply(this,arguments);for(const g of G)g[1]=g[1].map(h=>{const m=String(h).match(/data-a="(\w+)"/);if(!m||!LACK[m[1]]||!/ disabled/.test(h))return h;const w=LACK[m[1]](v);return w?h.replace(/<span class="kwhy">[^<]*<\/span>/,`<span class="kwhy">${w}</span>`):h});return G}})();
/* HUD chip names say exactly what they are */
(function(){const r0=renderHud2;renderHud2=function(){r0.apply(this,arguments);const el=$("hud2");if(!el)return;const fix=(k,lab)=>{const b=el.querySelector(`.hc[data-hx="${k}"]`);if(b){const bb=b.querySelector("b");const i=b.querySelector("i");b.innerHTML=lab+(bb?` <b>${bb.innerHTML}</b>`:"")+(i?i.outerHTML:"")}};fix("maid",`Lòng ${S.maid?S.maid.name:"cung nữ"}`);fix("con","Dễ có thai:");fix("dem","Được lật thẻ:");fix("an","Ân tình (đêm)");fix("aw","Số lần ân thưởng");if(S.lot)fix("lot",`Quẻ tuần: ${LV[S.lot.lv]} (${S.lot.dom})`)}})();
/* relation words in lines: one wording, colour by meaning for her */
(function(){const kp=kitParse;kitParse=function(str){str=String(str||"").replace(/(nàng |hắn )?thù -(\d+)/g,(m,p,n)=>`${p||""}oán ngươi +${n}`).replace(/thân -(\d+)/g,"quý ngươi -$1").replace(/thân \+(\d+)/g,"quý ngươi +$1").replace(/\bngay: /g,"được ngay: ");return kp(str)}})();
(function(){const k0=kcls;kcls=function(t){const s=String(t).replace(/<[^>]+>/g,"");if(/thiện cảm\s*-|quý ngươi\s*-|lòng\s*-|Sủng\s*-|Danh\s*-|Đức\s*-|oán ngươi \+|ghen \+/i.test(s)&&!/\bnàng\b.*-/.test(s.replace(/oán ngươi.*/,"")))return"r";return k0(t)}})();
/* dialog options: a face beside every named person */
(function(){const s0=showModal;showModal=function(){s0.apply(this,arguments);const M=$("modal");if(M.hidden)return;M.querySelectorAll(".opt").forEach(b=>{if(b.querySelector(".md"))return;const tx=b.firstChild&&b.firstChild.textContent||"";const v=rivals.find(r=>tx.includes(r.name));const f=v?pv(v):/Hoàng thượng/.test(tx)?pEmp():/Thái hậu/.test(tx)?pTH():null;if(f)b.insertAdjacentHTML("afterbegin",mdH(f,"xs"))})}})();
/* the ghen of a rival is hidden until she knows her */
(function(){const rc=rvCard;rvCard=function(v,i){let h=rc.apply(this,arguments);if(!knows(v))h=h.replace(/<div class="pgh">[\s\S]*?<\/div><\/div>/,`<div class="pgh"><span>Ghen: <span class="ef n">chưa rõ</span></span></div>`);return h}})();
/* her portrait in the death dialog is labelled by her name and rank */
(function(){const p0=pMe;pMe=function(){const f=p0.apply(this,arguments);f.rw=(S.rank>=7?"Hoàng hậu":RANKS[S.rank].n);return f}})();
/* older eunuchs are not 'Tiểu': Lão X; servant names unique across all palaces */
(function(){const a0=ageInit;ageInit=function(){const r=a0.apply(this,arguments);try{allServ().forEach(s=>{if(s.role!=="maid"&&s.age>=BAL.srvAge.old&&/^Tiểu /.test(s.name))s.name=s.name.replace(/^Tiểu /,"Lão ")})}catch(e){}return r}})();
(function(){const m0=mkServ;mkServ=function(role){let s=m0.apply(this,arguments);const taken=new Set([S&&S.maid&&S.maid.name].concat((rivals||[]).map(v=>v.maid&&v.maid.name),allServ().map(x=>x.name)));let n=2;const base=s.name;while(taken.has(s.name))s.name=base+" "+(n++);if(role!=="maid"&&s.age>=BAL.srvAge.old&&/^Tiểu /.test(s.name))s.name=s.name.replace(/^Tiểu /,"Lão ");return s}})();
/* items without their own picture yet use the nearest picture; the proof bundle uses the proof icon */
Object.assign(ITIMG,{tramngoc:"tram-phuong",vongvang:"vong-ngoc",gamvang:"gam-to-chau",demgam:"lua-hang-chau"});
(function(){const i0=iic;iic=function(k,s){if(k==="chungcu")return ic("chung-cu",s||22);return i0.apply(this,arguments)}})();
/* each rival palace looks a little different (tint of the shared hall art by owner rank) */
(function(){const r0=renderStage;renderStage=function(){r0.apply(this,arguments);try{const st=$("stage");const k=S.place;st.classList.remove("rp0","rp1","rp2","rp3","day","night");if(k&&k[0]==="r"){const v=RV(+k.slice(1));if(v)st.classList.add("rp"+(v.rank>=5?3:v.rank>=3?2:v.rank>=1?1:0))}st.classList.add((S.buoi||0)===B4L?"night":"day")}catch(e){}}})();
/* a faction may ask her to join (two-way) */
(function(){const a1=approachOne;approachOne=function(){if(!facOf(S)&&(S.facs||[]).length&&roll(20)){const f=pick(S.facs);const l=facLeader(f);if(l&&l!==S&&aff(l,S)>=0)return{ev:1,t:"Có người đến",who:pv(l),h:`<p>${l.name}, người đứng đầu ${f.name}, mời ngươi vào phe.</p>`,opts:[{n:"Nhận lời vào phe",fx:{},x:`nàng quý ngươi ${balSg(BAL.eff.j25.go)} · kẻ thù của phe oán ngươi`,go:()=>{f.m.push(key(S));relAdd(S,l,BAL.eff.j25.go)}},{n:"Khéo từ chối",fx:{},x:`nàng quý ngươi ${balSg(BAL.eff.j25.go_2)}`,go:()=>relAdd(S,l,BAL.eff.j25.go_2)}]}}return a1.apply(this,arguments)}})();
/* card sub-tabs: one group at a time, remembered per role */
document.addEventListener("click",e=>{const b=e.target.closest("[data-pct]");if(!b)return;e.stopPropagation();e.preventDefault();window.__pcTab=window.__pcTab||{};window.__pcTab[b.dataset.role]=b.dataset.pct;const c=b.closest(".pcr");c.querySelectorAll(".pct").forEach(x=>x.classList.toggle("on",x===b));c.querySelectorAll(".pcg").forEach(g=>g.classList.toggle("on",g.dataset.g===b.dataset.pct))},true);
/* consort faces by DRESS TIER (picked by rank), reviewed by eye: only serene, slim, adult, approved-style faces; stern, plump, sad or childlike ones are left out */
const CW=n=>"@W"+n,CF=n=>"face-consort-"+pad(n);
Object.assign(FPOOL,{ct1:[3,8,9,10,11,12,13,16,22,23].map(CW).concat([2,5,11,31,37,39].map(CF)),ct2:[1,2,6,14,15,21,24].map(CW).concat([1,12,15,18,28,32,38].map(CF)),ct3:[0,4,5,7,18,19,20].map(CW).concat([7,21,25].map(CF)),ct4:[17].map(CW).concat([13].map(CF)),ct5:[]});
FPOOL.consort=[].concat(FPOOL.ct1,FPOOL.ct2,FPOOL.ct3,FPOOL.ct4);
function tierOf(p){const r=p===S?S.rank:(p.queen?7:p.rank);return r<=1?1:r<=3?2:r<=5?3:r===6?4:5}
(function(){const b0=bandKeys;bandKeys=function(kind,age,p){if(kind==="consort"&&p){const t=tierOf(p);const near=[1,2,3,4,5].sort((a,b)=>Math.abs(a-t)-Math.abs(b-t)||b-a).map(x=>"ct"+x);return age>35?["womid"].concat(near):near}return b0.apply(this,arguments)}})();
/* a consort's face follows her rank tier: re-picked on promotion or demotion */
(function(){const ff=faceFor;faceFor=function(o,kind,age){if(kind==="consort"){const keys=bandKeys("consort",age,o);const k=keys[0];if(o.fc==null||o.fk!==k){o.fc="";o.fc=drawF(keys);o.fk=k}return}return ff.apply(this,arguments)}})();
(function(){const fs=fsrc;fsrc=function(fc,fb){if(fc&&fc[0]==="@"){const n=+fc.slice(2);return (AV.women||[])[n]||fb||""}return fs.apply(this,arguments)}})();
/* owner review 11/13: only serene, fair-skinned, adult faces stay in the pools */
Object.assign(FPOOL,{ct1:[3,8,9,10,11,12,13,16,22,23].map(CW).concat([2,5,11,37].map(CF)),ct4:[17].map(CW).concat([13,41,42,43,44,45].map(CF)),
 maid:[1,2,4,5].map(n=>"face-maid-"+n).concat([8,9,13,14,22,25,27,30,31,32,33].map(n=>"face-maid-"+pad(n))),mama:[1,3,4,6,7,8].map(n=>"face-mama-"+n),womid:[1,3,4,5,8].map(n=>"face-woman-mid-"+n),manold:[1,3].map(n=>"face-man-old-"+n),
 eun1:["16","20"].map(EU),eun2:["4"].map(EU),eun3:["3","13"].map(EU),th0:[1,5,6].map(TH),th1:[4].map(TH)});
FPOOL.consort=[].concat(FPOOL.ct1,FPOOL.ct2,FPOOL.ct3,FPOOL.ct4);
/* a saved face that left the pools (owner review) is re-picked on load */
(function(){const ff=faceFor;faceFor=function(o,kind,age){if(o&&o.fc&&o.fc[0]!=="@"){const all=new Set([].concat(...Object.values(FPOOL)));if(!all.has(o.fc)){o.fc=null;o.fk=null}}return ff.apply(this,arguments)}})();
FPOOL.ct3=[0,4,5,7,18,19,20].map(CW).concat([7,25].map(CF));FPOOL.consort=[].concat(FPOOL.ct1,FPOOL.ct2,FPOOL.ct3,FPOOL.ct4);
/* the rank race, as she knows it */
function rankBoard(){const L=consorts().concat(rivals.filter(v=>v.alive&&v.out)).filter((v,i,a)=>a.indexOf(v)===i).sort((a,b)=>rkOf(b)-rkOf(a));
 return `<div class="rboard"><p class="past">Bảng phẩm vị: ai đang ở đâu, ai sắp lên (theo điều ngươi biết).</p>${L.map(p=>{const me=p===S,r=rkOf(p);const nx=r<7?RANKS[r+1].n:"";const since=S.turn-(p.lastPromo||0);
  const known=me||knows(p);const req=me&&r<7?promoReqP(S).filter(x=>!x[0]).map(x=>x[1]):[];
  return `<div class="rrow2">${mdH(me?pMe():pv(p),"sm")}<div><b>${me?"Ngươi":p.name}</b> <span class="past">${r>=7?"Hoàng hậu":RANKS[r].n}${p.out?" · lãnh cung":""}</span>
   <div class="rl">${me?`${ic("sung",14)}Sủng ${S.sung} · Danh ${S.danh}`:favLine(p)} · ${since} tháng từ lần sắc phong trước</div>
   ${r<7&&!p.out?`<div class="rl">Lên ${nx}: ${me?(req.length?`<span class="ef r">còn thiếu: ${req.join("; ")}</span>`:`<span class="ef g">đủ điều kiện</span>`):known?`cần Sủng ${RANKS[r+1].s}, Danh ${RANKS[r+1].d}${p.hh<=-40&&r+1>=2?' · <span class="ef r">Hoàng hậu chặn</span>':""}`:'<span class="ef n">chưa rõ</span>'}</div>`:""}</div></div>`}).join("")}</div>`}
document.addEventListener("click",e=>{const b=e.target.closest("[data-rboard]");if(b){e.stopPropagation();window.__rb=!window.__rb;render()}},true);
(function(){const r0=rvTabHTML;rvTabHTML=function(){const btn=`<button class="pct${window.__rb?" on":""}" data-rboard="1">${window.__rb?"Về hồ sơ từng người":"Bảng phẩm vị"}</button>`;if(window.__rb)return `<div class="pgwrap"><div class="pctabs">${btn}</div><div style="overflow:auto;min-height:0">${rankBoard()}</div></div>`;return r0.apply(this,arguments).replace('<div class="pgwrap">',`<div class="pgwrap"><div class="pctabs">${btn}</div>`)}})();
