/* ================= ONE UI KIT: effect line, odds chip, act card; every card, choice and action button goes through it ================= */
/* act-text (owner 15/11): the sentiment words match WHOLE words only — "nguy" no longer hits "Vọng nguyệt", "thù" no longer hits
   "Thêu thùa", "giữ" no longer hits "giữa", "truy" no longer hits "Mệnh truyện" (gains were painted red / put in Kèm) */
const kWB=re=>kRx("(?<![\\p{L}\\p{M}])(?:"+re.source+")(?![\\p{L}\\p{M}])",re.flags.replace("u","")+"u");
const KRED=kWB(/(tru di|ban chết|lộ:|bị lộ|bị phạt|phạt|giáng|sảy|chết|lật tẩy|mất|tội|nguy|hỏng|không ai tin|bị bắt|cấm túc|báo cho chủ|lạnh nhạt|bị đồn|đuổi|truy)/i);
const KHOST=kWB(/(thù|oán|ghen|nàng nắm|nắm .*chứng cứ của ngươi|nhắm vào thai|nghi ngươi|bị đuổi)/i);
const KGOOD=kWB(/(\+\s?\d|dễ|được|biết|che chở|giữ|thân|thiện cảm|quý ngươi|chứng cứ|thăng|ban thưởng|bớt|tăng|tiến bộ)/i);
/* split a value list at its top level only: never inside ( ) « » [ ] or a tag, so "(chơi 5 phần, …)" stays one item */
function kSplitTop(str,sep){str=String(str==null?"":str);const out=[];let d=0,tag=false,cur="";const O="(«[“",C=")»]”";
 for(let i=0;i<str.length;i++){const ch=str[i];if(ch==="<")tag=true;else if(ch===">")tag=false;else if(!tag){if(O.includes(ch))d++;else if(C.includes(ch)&&d>0)d--}
  if(!tag&&d===0){sep.lastIndex=i;const m=sep.exec(str);if(m&&m.index===i&&m[0].length){out.push(cur);cur="";i+=m[0].length-1;continue}}cur+=ch}
 out.push(cur);return out}
/* ranges in player words (owner 15/11: "+1..2" is code): tiến bộ steps as words ("tiến bộ Thi một hai phần"), stat ranges "Sủng +3 đến +8" */
const NUMW=["không","một","hai","ba","bốn","năm","sáu","bảy","tám","chín","mười"];
function kStepW(a,b){const w=n=>NUMW[n]||String(n);return b==null||a===b?`${w(a)} phần`:b===a+1?`${w(a)} ${w(b)} phần`:`${w(a)} đến ${w(b)} phần`}
function kRangeW(t){return String(t==null?"":t).replace(/(tiến bộ(?: [^\s+<]+(?: [^\s+<]+)?)?) \+(\d+)(?:\.\.(\d+))?(?![\d.])/g,(m,p,a,b)=>`${p} ${kStepW(+a,b==null?null:+b)}`)
 .replace(/([+\-−])(\d+)\.\.(\d+)/g,"$1$2 đến $1$3")}
const KNEU=/^(không|không tốn|không mất gì|không được mất gì|chỉ |—|\d+ (khắc|việc)|2 khắc|tốn 2 khắc|chọn )/i;
function kcls(t){const s=t.replace(/<[^>]+>/g,"").trim();if(!s)return"n";if(/bớt (ghen|thù|oán)|hết (ghen|thù)/i.test(s))return"g";if(KNEU.test(s))return"n";if(KHOST.test(s))return"r";
 if(/(\bnàng\b|con nàng|của nàng)/i.test(s)&&(/-\s?\d|sảy|chết|mất|phế|bị phạt|tịch thu|sa sút|không được lật thẻ|rơi/i.test(s)))return"g";
 if(KRED.test(s))return"r";if(KGOOD.test(s))return"g";if(/-\s?\d/.test(s))return"r";return"n"}
/* one effect token -> coloured span; fmt() spans keep their colour */
function eff(t){t=String(t).trim();if(!t)return"";if(/^<span class="(g|r)">/.test(t)&&/<\/span>$/.test(t)&&(t.match(/<span/g)||[]).length===1)return t.replace(/^<span class="(g|r)">/,'<span class="ef $1">');
 if(/^<b class="r">/.test(t))return `<span class="ef r">${t.replace(/<[^>]+>/g,"")}</span>`;return `<span class="ef ${kcls(t)}">${t}</span>`}
function effList(x,def){const parts=[].concat(x).filter(Boolean).join(" · ");if(!parts)return eff("không");return kSplitTop(parts,/ · |, /y).filter(s=>s.trim()).map(s=>{let h=eff(s);if(def&&/class="ef n"/.test(h)&&!KNEU.test(s.replace(/<[^>]+>/g,"").trim()))h=h.replace('class="ef n"',`class="ef ${def}"`);return h}).join('<span class="ksep">·</span>')}
function oddsChip(w){if(/^Chắc chắn\b/.test(String(w))||String(w)==="Chắc chắn")return"";const m=String(w).match(ODDW);const k=m?m[1]:w;const lv=k==="Chắc chắn"?7:KIT_ODDS.indexOf(k)<0?undefined:KIT_ODDS.indexOf(k);const rest=String(w).replace(k,"").replace(/^\s*·\s*/,"");
 return `<span class="oc oc${lv==null?2:lv}">${k}</span>${rest?`<span class="ef ${/khó hơn/.test(rest)?"r":/dễ hơn/.test(rest)?"g":"n"}">${rest}</span>`:""}`}
/* parse a 'word · tốn: … · thành: … · hỏng: … · note' line into kit HTML */
function kitParse(str){str=String(str||"").trim();if(!str)return oddsChip("Chắc chắn");const segs=str.split(/ · (?![^<]*>)/);let odds="",out=[];let cur=null;
 for(let s of segs){const plain=s.replace(/<[^>]+>/g,"").trim();const mo=plain.match(/^(Chắc chắn|Nắm chắc|Rất chắc|Khá chắc|Năm ăn năm thua|Chắc|Khó|Liều)(?=$|\s|·)/);
  if(!odds&&mo&&plain.length<=mo[1].length+2){odds=mo[1];continue}
  if(/^Quẻ: /.test(plain)&&odds){odds+=" · "+plain;continue}
  const ml=s.match(/^\s*(?:<[^>]+>)*\s*(tốn|thành|hỏng|ngay|kèm|Tốn|Thành|Hỏng|Kèm)\s*:\s*/);if(ml){cur={l:ml[1].toLowerCase(),v:[s.slice(ml[0].length)]};out.push(cur);continue}
  if(cur&&cur.l!=="tốn"&&!/^(<b|<br)/.test(s)){cur.v.push(s);continue}out.push({l:"",v:[s]})}
 return (odds?oddsChip(odds):oddsChip("Chắc chắn"))+out.map(o=>(o.l?`<span class="kl">${o.l}</span>`:"")+(o.l==="kèm"?kemCol(effList(o.v,"r")):effList(o.v,o.l==="thành"?"g":o.l==="hỏng"||o.l==="tốn"?"r":""))).join(" ")}
/* KÈM side effects read red by default, but a value is coloured by its MEANING (owner 15/11 "Tại sao + mà màu đỏ"): an explicit gain ("tiến bộ Thêu thùa +1..2", "Danh +2") stays green, never red because of the row */
function kemCol(h){return String(h).replace(/<span class="ef ([gn])">([\s\S]*?)<\/span>/g,(m,c,x)=>{const p=x.replace(/<[^>]+>/g,"");return /\+\s?\d/.test(p)&&kcls(p)==="g"?`<span class="ef g">${x}</span>`:`<span class="ef r">${x}</span>`})}
/* the act card */
function cardH(a,i){const poor=a.c&&a.c.bac&&S.bac+a.c.bac<0,o=a.o==null?100:a.o;const dis=!can(cardCost(a))||a.done||poor||a.lock||S.dead||(a.b!=null&&(S.buoi||0)!==a.b);const rolled=o<100&&!a.lock;
 const ow=rolled?word(cl(o+lotB(S,a.dom),5,95))+lotTag(a.dom,o):"Chắc chắn";
 return `<button class="card kcard" data-i="${i}" ${dis?"disabled":""}><h4>${a.n}</h4><span class="ktime">${pips(cardCost(a))} ${cardCost(a)} khắc${a.b!=null?` · Chỉ ${BUOI[a.b].toLowerCase()}`:""}</span><p>${a.t||""}</p><span class="krow">${oddsChip(ow)}</span>
 <span class="kgrid"><span class="kl">Tốn</span><span>${effList([fmt(a.c)||"không",ducWarnTxt(a.c)])}</span><span class="kl">Thành</span><span>${effList([fmt(a.w||{}),String(a.x||"").split(/ · kèm: /)[0]],"g")}</span>${/ · kèm: /.test(a.x||"")?`<span class="kl">Kèm</span><span>${kemCol(effList(String(a.x).split(/ · kèm: /)[1],"r"))}</span>`:""}${rolled?`<span class="kl">Hỏng</span><span>${effList(fmt(a.l||{})||"không mất gì","r")}</span>`:""}</span></button>`}
/* route the older line builders through the kit */
function ducWarnTxt(c){const d=c&&c.duc;if(!d||d>=0||!S||S.rank>=7)return"";const after=S.duc+d,nd=hhNeed(S).duc;return after<nd?`Đức ${S.duc} → ${after}`:""}/* owner 07:05Z: the card shows only "Đức a → b"; the threshold lives in the top-bar Đức chip (jk3), read from BAL */
let actLineRaw;(function(){const o1=optLine,o2=dilLine,o3=actLine;actLineRaw=o3;optLine=a=>kitParse(o1(a));dilLine=c=>kitParse(o2(c));actLine=(k,w,c)=>kitParse(o3(k,w,c))})();
function kitFix(root){(root||document).querySelectorAll(".rbtn button small,.btn small,.pcb button small,.opt small").forEach(sm=>{if(sm.dataset.kp||sm.querySelector(".oc,.kl,.ef"))return;sm.dataset.kp=1;sm.innerHTML=kitParse(sm.innerHTML)})}
/* ONE portrait frame: the tall gold-framed 3:4 box, one size per breakpoint, for every person who is the subject (cards, dialogs, summaries) */
function pframe(f,col){return `<div class="pfwrap">${pcPort(f||{},col||(f&&f.col)).replace('class="pcp','class="pcp pfr')}${f&&f.rw?`<span class="pfrw">${f.rw}</span>`:""}</div>`}
function pframeArt(src){return `<div class="pcp pfr art"${src?` style="background-image:url(${src})"`:""}></div>`}
/* ===== RESULT FEEDBACK after every act and choice: seal THÀNH / HỎNG, the real deltas, one WHY line ===== */
const RKEYS=[["sung","Sủng"],["danh","Danh"],["suc","Sức"],["bac","Bạc"],["duc","Đức"],["th","Thái hậu quý ngươi"],["hh","Hoàng hậu quý ngươi"],["sac","Sắc"],["tai","Tài"],["tamco","Tâm cơ"],["mat","Tai mắt"],["an","Ân tình"]];
function rsnap(){if(!S)return null;const o={};RKEYS.forEach(([k])=>o[k]=S[k]||0);o.maid=S.maid?S.maid.loyal:0;o.seq=S.logSeq||0;o.rank=S.rank;return o}
const FAILRE=/(hỏng|không thành|bị phát hiện|bị lộ|lạnh nhạt|không ai tin|từ chối|không động lòng|chưa chuẩn|bỏ qua|bị đuổi|phải lui|không biết gì mới|chỉ cười|bị bắt|thất bại)/i;
function resultShow(title,before,okHint){if(!S||!before||S.dead)return;const d=RKEYS.map(([k,n])=>[n,(S[k]||0)-before[k]]).filter(x=>x[1]);if(S.maid&&S.maid.loyal!==before.maid)d.push(["Lòng cung nữ",S.maid.loyal-before.maid]);
 const n=Math.max(0,Math.min(S.logs.length,(S.logSeq||0)-before.seq));const L=S.logs.slice(0,n).map(plain).reverse();const why=L.join(" ").replace(/\s+/g," ").trim();
 const ok=okHint!=null?okHint:!FAILRE.test(why);if(!d.length&&!why&&okHint==null)return;
 if(window.__bot)return;let t=$("rtoast");if(!t){t=document.createElement("div");t.id="rtoast";document.body.appendChild(t);t.onclick=()=>t.classList.remove("on")}
 t.className="rtoast "+(ok?"ok":"bad");t.innerHTML=`<b class="seal">${ok?"THÀNH":"HỎNG"}</b><div class="rt"><b>${title}</b><div class="rd">${d.map(([k,v])=>{const key=(RKEYS.find(x=>x[1]===k)||[])[0];const now=key?(S[key]||0):null;return `<span class="ef ${v>0?"g":"r"}">${k} ${now!=null?`${now-v} → ${now}`:(v>0?"+":"")+v}</span>`}).join('<span class="ksep">·</span>')||'<span class="ef n">không đổi chỉ số</span>'}</div>${why?`<small>${why.length>140?why.slice(0,138)+"…":why}</small>`:""}</div>`;
 void t.offsetWidth;t.classList.add("on");clearTimeout(window.__rtT);window.__rtT=setTimeout(()=>t.classList.remove("on"),3200)}
function wrapR(name,titleOf,okOf){const f=window[name];if(typeof f!=="function")return;window[name]=function(){const b=rsnap(),ttl=titleOf?titleOf.apply(null,arguments):"";let r;r=f.apply(this,arguments);try{if(b&&(S.logSeq||0)!==b.seq||(b&&RKEYS.some(([k])=>(S[k]||0)!==b[k])))resultShow(ttl,b,okOf?okOf(r,arguments):null)}catch(e){}return r}}
wrapR("act",i=>deck[i]?deck[i].n:"",()=>window.__lastOk==null?null:!!window.__lastOk);
wrapR("doAct",(i,k)=>ACT[k]?ACT[k].n:"");
wrapR("talk",oi=>{try{return talkOpts(curPeople()[popIdx])[oi].n}catch(e){return""}});
wrapR("servAct",a=>({thuong:"Thưởng",phat:"Phạt",hoi:"Hỏi chuyện",doi:"Đổi người",che:"Che chở",mua:"Mua chuộc",doa:"Dọa tố"})[a]||"");
wrapR("courtAct",a=>a==="thuong"?"Biếu":"Hỏi chuyện");
wrapR("empAct",(i,k)=>({judge:"Xử tội",conf:"Tịch thu trang sức",reward:"Ban thưởng",pardon:"Ân xá"})[k]||"");
wrapR("recommend",()=>"Tiến cử");
wrapR("chooseM",i=>{try{return Q[0].opts[i].n}catch(e){return""}});
/* exact result for deck cards: runOpt knows */
(function(){const ro=runOpt;runOpt=function(a){const r=ro.apply(this,arguments);window.__lastOk=r;return r}})();
(function(){const f=window.act;window.act=function(i){window.__lastOk=null;return f.apply(this,arguments)}})();
/* why a card cannot be played, in words */
function cardWhy(a){if(S.dead)return"";if(a.done)return"Đã làm trong buổi này";if(a.b!=null&&(S.buoi||0)!==a.b){const nm=BUOI[a.b].toLowerCase();return (S.buoi||0)>a.b?`Đã qua ${nm} — mở lại ${nm} mai`:`Chỉ ${nm} — chờ đến ${nm}`}
 if(a.c&&a.c.bac&&S.bac+a.c.bac<0)return `Thiếu bạc (cần ${-a.c.bac})`;if(a.lock)return a.t||"Chưa đủ điều kiện";const w=whyTime(cardCost(a));return w?(/khắc/.test(w)?"Hết khắc buổi này — chờ buổi sau":w):""}
(function(){const ch=cardH;cardH=function(a,i){let h=ch(a,i);const txt=(a.t||"")+" "+(a.x||"");const vs=rivals.filter(v=>txt.includes(v.name));if(vs.length)h=h.replace("<h4>",`<h4>${vs.slice(0,2).map(v=>mdH(pv(v),"xs")).join("")}`);const w=cardWhy(a);return w?h.replace('<span class="krow">',`<span class="kwhy">${w}</span><span class="krow">`):h}})();
/* ===== RANK GROUNDS for every portrait frame and avatar ===== */
function rkOfFace(kind,o){if(kind==="consort"){if(o.out)return["cold","Phế phi · lãnh cung"];const r=o===S?S.rank:(o.queen?7:o.rank);return["c"+r,typeof kitHieuJoin==="function"?kitHieuJoin(r>=7?"Hoàng hậu":RANKS[r].n,o):r>=7?"Hoàng hậu":RANKS[r].n]}
 if(kind==="serv"){const r=srk(o);return[(o.role==="maid"?"sv":"eu")+r,srkName(o)]}return[kind,""]}
/* ===== the always-visible status row (was inside Hành động) ===== */
const HX={get buoi(){return `Mỗi buổi có ${BAL.time.khac} khắc. Mỗi việc tốn khắc; hết khắc thì sang buổi sau.`},get date(){return `Ngày tháng trong cung. Mỗi tuần có ${B4N} buổi (sáng, trưa, chiều, tối), mỗi tháng 3 tuần.`},get lot(){return typeof KIT_GLOSS==="object"&&KIT_GLOSS["Quẻ"]?KIT_GLOSS["Quẻ"]:`Quẻ đầu tuần. Gieo lại tốn ${BAL.lot.bac} bạc và ${BAL.lot.k} khắc.`},set lot(v){},sac:"Sắc: nhan sắc. Giúp múa, thị tẩm, được để ý.",tai:"Tài: tài học. Giúp đàn, thơ, nói chuyện với Hoàng thượng.",tamco:"Tâm cơ: mưu trí. Giúp dò la, mưu kế, nhìn thấu.",duc:"Đức: tiếng hiền. Cần để lên Hoàng hậu (ngưỡng: xem chú giải Đức).",mat:"Tai mắt: người của ngươi khắp cung. Giúp biết tin, phát giác mưu hại.",th:"Thái hậu quý ngươi: lòng thương của Thái hậu.",hh:"Hoàng hậu quý ngươi: lòng quý của Hoàng hậu (âm là ghét), một con số duy nhất.",maid:"Lòng cung nữ thân tín. Dưới 45 dễ bị mua chuộc.",con:"Khả năng có thai mỗi lần thị tẩm.",dem:"Khả năng được lật thẻ bài mỗi tuần.",an:"Ân tình: tình nghĩa với Hoàng thượng, tích qua các đêm."};
const HXN={sac:"Sắc",tai:"Tài",tamco:"Tâm cơ",duc:"Đức",mat:"Tai mắt",th:"Thái hậu",hh:"Hoàng hậu",maid:"Lòng cung nữ",an:"Ân tình",aw:"Ân thưởng"};
function renderHud2(){const el=$("hud2");if(!el||!S)return;const prev=window.__h2p||{};const cur={};
 const c=(k,label,val,cls,ico)=>{cls=(cls||"")+(["buoi","lot","date"].includes(k)?" keep":"");cur[k]=val;const ch=prev[k]!=null&&typeof val==="number"&&prev[k]!==val?val-prev[k]:0;return `<button class="hc ${cls||""}${ch?" flash":""}" data-hx="${k}">${ico?ic(ico,12):""}${label}${val!=null&&val!==""?` <b>${val}</b>`:""}${ch?`<i class="${ch>0?"g":"r"}">${ch>0?"+":""}${ch}</i>`:""}</button>`};
 const st=[S.preg?c("preg",S.hidden?"Giấu thai":"Mang thai",`th.${S.preg}`,"hot","thai"):"",illOf(S)?c("ill",illName(S),"","hot"):"",S.fakeIll?c("fake","Giả bệnh","","hot"):"",S.out?c("out","Lãnh cung","","hot"):"",S.block?c("block","Thẻ bài bị rút",`${S.block} tuần`,"hot"):"",S.doctor?c("doc","Thái y tâm phúc","","ok"):"",S.confined?c("conf","Cấm túc",`${S.confined} tháng`,"hot"):"",S.shield?c("shield","Hoàng hậu che chở","","ok"):"",S.preg>=6&&!S.fake?c("birth","Hiểm sinh nở",chanceLvl(Math.round(birthRisk(S))),birthRisk(S)>5?"hot":""):""];
 let colz=window.__h2c!=null?window.__h2c:true;try{const v=localStorage.getItem("hclh-h2c");if(v!=null)colz=v==="1"}catch(e){}el.classList.toggle("col",colz);el.innerHTML=`<button class="h2t" data-h2t="1" aria-label="${colz?"Mở rộng":"Thu gọn"}">${colz?"▾":"▴"}</button>`+c("date",`T${S.month}/${S.year} · ${TUAN[S.tuan]}`,"")+c("buoi",`${BUOI[S.buoi||0].replace("Buổi ","")} · còn`,`${BAL.time.khac-used} khắc`)+(S.lot?c("lot",`Quẻ ${LV[S.lot.lv]}·${S.lot.dom}`,"",LVB[S.lot.lv]<0||S.lot.dom==="Hung"&&S.lot.lv>=3?"hot":LVB[S.lot.lv]>0?"ok":""):"")+
  c("sac","Sắc",S.sac,"","sac")+c("tai","Tài",S.tai,"","tai")+c("tamco","Tâm cơ",S.tamco,"","tam-co")+c("duc","Đức",S.duc,S.rank<7&&S.duc<50?"hot":"","duc")+c("mat","Tai mắt",S.mat,"","tai-mat")+c("th","Thái hậu quý ngươi",S.th,"","thai-hau")+(queenP()&&queenP()!==S?c("hh","Hoàng hậu quý ngươi",S.hh,S.hh<-20?"hot":S.hh>20?"ok":"","hoang-hau"):"")+c("maid",S.maid.name.split(" ").pop(),S.maid.loyal,S.maid.loyal<BAL.loy.warn?"hot":"")+c("con","Thai",word(conceiveCh()))+c("dem","Lật thẻ",word(nightCh()))+c("an","Ân tình",S.an||0,(S.an||0)>=50?"ok":"")+c("bl","Bổng lộc sau",`${3-S.tuan} tuần`)+c("aw","Ân thưởng",(S.awards||[]).length)+st.join("");
 if(colz){const chg=Object.keys(cur).filter(k=>typeof cur[k]==="number"&&prev[k]!=null&&prev[k]!==cur[k]).map(k=>`${(HXN[k]||k)} ${cur[k]-prev[k]>0?"+":""}${cur[k]-prev[k]}`);if(chg.length)el.insertAdjacentHTML("beforeend",`<span class="h2pulse">${chg.join(" · ")}</span>`)}window.__h2p=cur;
 el.onclick=e=>{if(e.target.closest(".h2t")||(el.classList.contains("col")&&e.target.closest(".hc.keep"))){const nv=el.classList.contains("col")?"0":"1";window.__h2c=nv==="1";try{localStorage.setItem("hclh-h2c",nv)}catch(x){}window.__h2p=cur;renderHud2();return}const b=e.target.closest(".hc");if(!b||Q.length||S.dead)return;const k=b.dataset.hx;
  if(k==="lot"&&S.lot){const can1=!S.relot&&S.bac>=BAL.lot.bac&&can(BAL.lot.k);Q.unshift({t:`Quẻ ${LV[S.lot.lv]} · ${S.lot.dom}`,h:lotHTML(S.lot)+`<p class="past">${HX.lot}</p>`+(can1?`<div class="opts"><button class="opt" id="relot2">Gieo lại<small>${kitParse("Chắc chắn · tốn: Bạc -"+(BAL.lot.bac)+", "+(BAL.lot.k)+" khắc")}</small></button></div>`:"")});showModal();const r=$("relot2");if(r)r.onclick=()=>{Q.shift();showModal();reLot(false)};return}
  if(k==="bl"){Q.unshift({t:"Bổng lộc",h:blCard()});showModal();return}if(k==="aw"){Q.unshift({t:"Ân thưởng",h:awCard()});showModal();return}const t=HX[k]||b.textContent;Q.unshift({t:b.textContent.replace(/[+-]\d+$/,"").trim(),h:`<p>${t}</p>`});showModal()}}
/* keep the Pixi scene the size of the stage whenever the layout changes (not only on window resize) */
(function(){let ro=null;setInterval(()=>{try{if(PX&&PX.app&&!ro&&window.ResizeObserver){const st=$("stage");ro=new ResizeObserver(()=>{try{PX.app.resize()}catch(e){}try{if(typeof kitStagePause==="function")kitStagePause()}catch(e){}});ro.observe(st)}}catch(e){}},1000)})();
/* every disabled button says why */
function guessWhy(b){const t=b.textContent;if(S&&S.dead)return"";const m=t.match(/Bạc -(\d+)/);if(m&&S.bac<+m[1])return `thiếu bạc (cần ${m[1]})`;if(/việc|khắc/.test(t)&&!can(2))return used>=BAL.time.khac?"hết khắc buổi này":"Sức dưới "+(BAL.time.sucMin)+"";if(S.confined)return"đang cấm túc";return"chưa đủ điều kiện"}
(function(){const kf=kitFix;kitFix=function(root){kf(root);(root||document).querySelectorAll(".rbtn button:disabled,.btn:disabled,.pcb button:disabled").forEach(b=>{if(b.querySelector(".kwhy"))return;const sm=b.querySelector("small");const w=guessWhy(b);if(!w)return;if(sm)sm.insertAdjacentHTML("afterbegin",`<span class="kwhy">${w}</span> `);else b.insertAdjacentHTML("beforeend",`<small><span class="kwhy">${w}</span></small>`)})}})();
