
/* ================= j51 KẾ VỊ: lập đích, lập trưởng, lập hiền; tranh ngôi Đông cung (cùng một luật cho mọi người mẹ) ================= */
const KV={c:.007,base:22,deb:4,debGap:12};
/* hệ số theo tính nết: người mẹ có con trai đứng sau mưu dọn đường cho con */
const KVT={"Hiểm độc":2,"Tham vọng":1.7,"Kiêu ngạo":1.2,"Đa nghi":1,"Nhu mì":.4,"Hiền lành":.08};
const KVACT=[["kframe",3],["kpoison",2],["pond",1.5],["ksab",3],["spy",2.5],["frame",1.5]];
/* thứ tự sinh: mỗi con một mốc (tháng sinh), con cũ được gán một lần theo tuổi */
function kvStamp(){allKids().forEach(([k])=>{if(k.bt==null)k.bt=S.turn-(k.age||0)*12})}
function kvQueenMom(v){return v?!!(v.alive&&!v.out&&v.queen):S.rank>=7}
function kvMomName(v){return v?v.name:"ngươi"}
/* trọng số chọn Thái tử (dùng cho cả xét lập lẫn thứ tự hiển thị) */
function kvW(k,v,dich,truong){return 5+momRank(v)*10+k.tal/2+k.fond/2+Math.max(0,(v?v.th:S.th)||0)/2+(dich?60:0)+(truong?(S&&S.ps?BAL.ps.truongW:25):0)}/* palace-start (owner 16/11): in a new game being first-born is a small edge, not a lock */
function kvOrder(){if(!S)return[];kvStamp();const L=allKids().filter(([k])=>k.alive&&k.sex==="m");if(!L.length)return[];
 const eld=L.slice().sort((a,b)=>a[0].bt-b[0].bt)[0][0];
 return L.map(([k,v])=>{const dich=kvQueenMom(v),truong=k===eld;return{k,v,dich,truong,w:kvW(k,v,dich,truong)}})
  .sort((a,b)=>((+b.k.heir)-(+a.k.heir))||((+b.dich)-(+a.dich))||(b.w-a.w)||(a.k.bt-b.k.bt))}
function kvPos(o,k){return o.findIndex(x=>x.k===k)}
function kvWhy(x){if(x.k.heir)return x.dich?"Thái tử · Đích tử":x.truong?"Thái tử · Trưởng tử":"Thái tử";
 if(x.dich)return x.truong?"Đích tử · Trưởng tử":"Đích tử (con Hoàng hậu)";if(x.truong)return "Trưởng tử (lớn nhất)";
 return `Tài ${x.k.tal} · được thương ${x.k.fond}`}
/* động cơ: v có con trai, con của t là Thái tử hoặc đứng trước con v */
function kvMotive(v,t,o){if(!v||v===S||!v.alive||v.out||!t||t===v)return 0;o=o||kvOrder();
 const mine=o.map((x,i)=>[x,i]).filter(([x])=>x.v===v);if(!mine.length)return 0;const pv=Math.min(...mine.map(z=>z[1]));
 const th=o.map((x,i)=>[x,i]).filter(([x,i])=>(t===S?x.v===null:x.v===t)&&i<pv);if(!th.length)return 0;
 if(t!==S&&(!t.alive||t.out))return 0;
 let m=KV.base;for(const tr of traitsOf(v))if(KVT[tr]!=null)m*=KVT[tr];
 if(th.some(([x])=>x.k.heir))m*=1.3;if(aff(v,t)>=40)m*=.5;return Math.round(m)}
function kvTargets(v,o){const L=[];for(const t of others(v)){if(t===S&&(S.dead||(typeof isSrv==="function"&&isSrv())))continue;const m=kvMotive(v,t,o);if(m>0)L.push([t,m])}return L}
function kvSonOf(v,o){const x=(o||kvOrder()).find(x=>x.v===v);return x?x.k:null}
window.__kvS=null;window.__kvDue={};
/* thực đơn khi mưu vì ngôi Đông cung: chỉ các mưu nhắm vào con nàng (và dò la, vu cáo chính nàng) */
(function(){const m0=mindMenu;mindMenu=function(v,t){const K=window.__kvS;if(!K||K.v!==v||K.t!==t)return m0.apply(this,arguments);
 try{const b=bandOf(danger(v,t)+K.m);const allow=BANDS.slice(1,b+1).flatMap(x=>x[2]);const tc=witOf(v);const O=[];v.fails=v.fails||{};
  for(const [k,w0] of KVACT){const a=ACT[k];if(!a||!allow.includes(k))continue;let ok=false;try{ok=a.ok(v,t)}catch(e){}if(!ok)continue;
   let w=w0*persW(v,k)*(1+K.m/40);let od=null;try{od=a.o?a.o(v,t):null}catch(e){}if(od!=null&&tc>=BAL.wit.lo)w*=Math.pow(cl(od,5,95)/50,(tc-BAL.wit.lo)/BAL.wit.mid);
   const f=v.fails[k]||0;if(f)w*=tc<BAL.wit.mid?1+.6*f:Math.pow(.5,f);if(w>0)O.push([k,w])}
  return O}catch(e){return[]}}})();
/* con bị nhắm: con trai đứng cao nhất trong thứ tự kế vị */
(function(){const t0=tKid;tKid=function(t){const K=window.__kvS;if(K&&K.t===t){const o=kvOrder();const L=o.filter(x=>(t===S?x.v===null:x.v===t)&&(x.k.age>=3||x.k.heir));if(L.length)return L[0].k}return t0.apply(this,arguments)}})();
(function(){const a=ACT.pond;if(!a)return;const f0=a.f;a.f=function(x,t){const K=window.__kvS;if(K&&K.t===t){const son=kvOrder().find(z=>(t===S?z.v===null:z.v===t)&&z.k.age>=2);if(son){const k0=kidsOf;kidsOf=function(p){if(p===t){kidsOf=k0;return [son.k]}return k0.apply(this,arguments)};try{return f0.apply(this,arguments)}finally{kidsOf=k0}}}return f0.apply(this,arguments)}})();
/* mưu bị lộ: tra ra cả động cơ (chỉ khi đã lần ra người làm) */
(function(){const r0=mindRun;mindRun=function(v,t,k,err){const D=window.__kvDue[v&&v.id];let set=false;
 if(!window.__kvS&&D&&D.k===k&&D.t===key(t)){window.__kvS={v,t,m:D.m};set=true;delete window.__kvDue[v.id]}
 const K=window.__kvS;const son=K&&K.v===v?kvSonOf(v):null;let r;try{r=r0.apply(this,arguments)}finally{if(set)window.__kvS=null}
 if(son&&r&&FAILRX.test(r)&&r.includes(v.name))r+=`Tra ra ${v.name} muốn dọn đường cho con mình là ${son.name} lên ngôi Đông cung. `;return r}})();
/* tin công khai: hoàng tự chết hay Thái tử bị phế thì cả cung đều biết; kẻ ra tay vẫn không rõ nếu không ai thấy */
(function(){const s0=seenNPC;seenNPC=function(v,t,txt){const r=s0.apply(this,arguments);if(r||!txt||t===S||v===S)return r;
 if(/mà chết|chết đuối|bị phế ngôi Thái tử/.test(txt)&&!txt.includes(v.name))return txt.replace(/\(Để lại dấu vết[^)]*\)/,"")+"Chưa rõ kẻ ra tay. ";return r}})();
/* mỗi buổi: người mẹ có động cơ có thể mưu (qua đúng đường nghĩ của NPC: do dự, sai sót, chuẩn bị, để lộ dấu) */
(function(){const r0=rivalsBuoi;rivalsBuoi=function(){
 try{const nb=(S.bqN||0)+1;for(const v of liveRivals(true)){const P=v.plan;if(P&&P.kv&&P.due<=nb)window.__kvDue[v.id]={k:P.k,t:P.t,m:P.kv}}}catch(e){}
 let ev=r0.apply(this,arguments)||"";
 try{if(!S||S.dead)return ev;const run=()=>{let e="";const o=kvOrder();if(o.length<2)return e;
   for(const v of liveRivals(true)){if(!v.alive||v.out||v.plan)continue;const T=kvTargets(v,o);if(!T.length)continue;
    let r=Math.random()*T.reduce((a,b)=>a+b[1],0),i=0;while(r>T[i][1]&&i<T.length-1){r-=T[i][1];i++}const [t,m]=T[i];
    let c=KV.c*m/KV.base;if(t.shield)c*=.5;if(t===S&&S.guardWarn)c*=.5;if(Math.random()>=c)continue;
    window.__kvS={v,t,m};let res="";try{res=npcAct(v,t)}finally{window.__kvS=null}
    if(v.plan&&v.plan.t===key(t)&&KVACT.some(z=>z[0]===v.plan.k))v.plan.kv=m;
    e+=seenNPC(v,t,res);if(S.dead)return e}return e};
  ev+=(typeof srvW==="function"?srvW(run):run())||""}catch(e){}return ev}})();
/* ---- lập Thái tử: lập đích, lập trưởng, lập hiền ---- */
function kvDebate(){const H=S.heir;if(!H||!H.k||!H.k.alive||kvQueenMom(H.v))return"";if(S.turn-(S.kvDeb==null?-99:S.kvDeb)<KV.debGap)return"";
 const o=kvOrder();const d=o.find(x=>x.dich&&!x.k.heir&&x.k.age>=6);if(!d||!roll(KV.deb))return"";S.kvDeb=S.turn;const h=H.k;
 const p=cl(Math.round(30+(d.k.tal-h.tal)/2+(d.k.fond-h.fond)/2-(h.age>=16?10:0)),10,85);
 const pre=`<b>Triều đình bàn lệ lập đích:</b> đại thần dâng sớ xin lập ${d.k.name}, đích tử của ${d.v?"Hoàng hậu "+d.v.name:"ngươi (Hoàng hậu)"}, thay Thái tử ${h.name} (con ${kvMomName(H.v)}). `;
 if(roll(p)){setHeir(d.k,d.v);fx("gold");return pre+`<span class="${d.v?(H.v?"":"r"):"g"}">Hoàng thượng phế ${h.name}, lập ${d.k.name} làm Thái tử</span> (khả năng đổi ngôi: ${chanceLo(p)}).${d.v?"":" Danh +10."} `}
 return pre+`Hoàng thượng giữ ${h.name} ở ngôi Thái tử (khả năng đổi ngôi: ${chanceLo(p)}). `}
heirMonth=function(){if(S.heir&&S.heir.k&&S.heir.k.alive)return kvDebate();S.heir=null;
 const o=kvOrder();const c=o.filter(x=>x.k.age>=6);if(!c.length)return"";
 const wait=!c.some(x=>x.dich)&&o.some(x=>x.dich);/* đích tử còn nhỏ: triều đình chờ */
 if(!roll(wait?5:15))return"";
 let r=Math.random()*c.reduce((a,b)=>a+b.w,0),i=0;while(r>c[i].w&&i<c.length-1){r-=c[i].w;i++}const x=c[i];setHeir(x.k,x.v);fx("gold");
 const why=x.dich?"theo lệ lập đích: con của Hoàng hậu":S.ps?`theo lệ lập hiền: Tài ${x.k.tal}, được ngài thương ${x.k.fond}; mẹ là ${(RANKS[momRank(x.v)]||RANKS[0]).n}${x.truong?", lại là con trưởng":""}`/* r1: keeps the "lập hiền: Tài N, được ngài thương N" form so j53 swaps the raw talent for the Văn/Đức/Võ words (rival: rumour word) */:x.truong?"theo lệ lập trưởng: hoàng tử lớn nhất":`theo lệ lập hiền: Tài ${x.k.tal}, được ngài thương ${x.k.fond}`;
 return x.v?`Hoàng thượng lập ${x.k.name}, con của ${x.v.name}, làm Thái tử (${why}). `:`<b class="g">Hoàng thượng lập ${x.k.name}, con của ngươi, làm Thái tử</b> (${why}). Danh +10. `};
/* băng hà khi chưa lập Thái tử: đích tử trước, không có thì trưởng tử (ván mới S.ps: người nặng ký nhất, trưởng tử chỉ là một phần) */
(function(){const e0=emperorDies;emperorDies=function(){try{if(!(S.heir&&S.heir.k&&S.heir.k.alive)){const o=kvOrder().sort((a,b)=>S.ps?b.w-a.w:a.k.bt-b.k.bt);const x=o.find(z=>z.dich)||o[0];if(x)S.heir={k:x.k,v:x.v}}}catch(e){}return e0.apply(this,arguments)}})();
/* ---- hiển thị: nhãn trên thẻ con, chip con của phi tần, bảng thứ tự kế vị ---- */
function kvLabels(k,o){o=o||kvOrder();const i=kvPos(o,k);if(i<0)return[];const x=o[i];const L=[];if(x.dich)L.push("Đích tử");if(x.truong)L.push("Trưởng tử");L.push(`Kế vị thứ ${i+1}`);return L}
(function(){const p0=pcard;pcard=function(o){const k=window.__kvKid;if(k&&o){window.__kvKid=null;try{const L=kvLabels(k);o=Object.assign({},o,{chips:(o.chips||[]).concat(L.map(t=>chip(t,/Đích|Trưởng/.test(t)?"ok":"")))})}catch(e){}}return p0.call(this,o)}})();
(function(){const kc=kidCard;kidCard=function(k){window.__kvKid=k&&k.alive&&k.sex==="m"?k:null;try{return kc.apply(this,arguments)}finally{window.__kvKid=null}}})();
(function(){const rc=rvCard;rvCard=function(v){let h=rc.apply(this,arguments);try{const o=kvOrder();for(const k of (v.kids||[]).filter(k=>k.alive&&k.sex==="m")){const L=kvLabels(k,o).filter(t=>!/^Kế vị/.test(t));if(L.length)h=h.split(`${k.name} · ${k.age} tuổi`).join(`${k.name} · ${k.age} tuổi · ${L.join(" · ")}`)}}catch(e){}return h}})();
function kvBoxHTML(){const o=kvOrder();if(!o.length)return `<div class="kvbox"><h5>Thứ tự kế vị</h5><p class="past">Trong cung chưa có hoàng tử.</p></div>`;
 const rows=kitRows(o.slice(0,3).map((x,i)=>[`${mdH(kidFace(x.k),"xs")}<span>${i+1}. ${x.k.name} · ${x.k.age} tuổi · con ${x.v?x.v.name:"<b class=\"g\">ngươi</b>"}${x.v&&(!x.v.alive||x.v.out)?(x.v.alive?" (lãnh cung)":" (đã mất)"):""}</span>`,`${kvWhy(x)}${x.k.age<6?" · chưa đủ 6 tuổi":""}`,"t"]));
 return `<div class="kvbox"><h5>Thứ tự kế vị</h5>${rows}<p class="past">Lập đích, lập trưởng, lập hiền: con Hoàng hậu đứng đầu, rồi hoàng tử lớn nhất; tài và lòng thương của Hoàng thượng, phẩm vị mẹ và Thái hậu cũng tính. Băng hà khi chưa lập Thái tử: đích tử lên ngôi, không có thì trưởng tử.${o.length>3?` Còn ${o.length-3} hoàng tử khác.`:""}</p></div>`}
(function(){const k0=kidTabHTML;kidTabHTML=function(hl){let h=k0.apply(this,arguments);try{const i=h.indexOf("</span></div>");if(i>=0){const j=i+"</span></div>".length;h=h.slice(0,j)+kvBoxHTML()+h.slice(j)}}catch(e){}return h}})();
(function(){const st=document.createElement("style");st.textContent=".kvbox{margin:0 0 6px}.kvbox .pcrow{align-items:center}.kvbox .pcrow>span{min-width:0;overflow-wrap:anywhere;display:flex;align-items:center;gap:5px}.kvbox .pcrow>span .md{flex-shrink:0;margin:0}.kvbox .pcrow b{text-align:right;flex-shrink:0;max-width:48%}.kvbox .past{margin:2px 0 0;font-size:.72rem}";document.head.appendChild(st)})();
