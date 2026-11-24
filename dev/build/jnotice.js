/* ================= jnotice: THE ONE NOTICE SYSTEM — kitNotice · top-bar «!» box · top chip · «Tin báo» panel (KIT §42.2, stage-here r4) =================
   Owner OD 18/11 ~22:10Z (ROOT-56, angry): "Bất kỳ một cái thông báo nào của cái game đều phải vô cái ô này hết. Đó, tức là khi mà cái ô này nó sáng
   lên, đồng thời là cái thanh này nó cũng hiện ra ... chỉ hiện ra chỉ có khoảng 5 giây hay là 10 giây gì thôi" + "cái khung thông báo này nó phải nằm ở
   trên chứ không phải nằm ở dưới" + "bấm vô để nó hiện ra một cái khung nhỏ ... một cái tranh đại diện ... và cái thông tin kế bên".
   ONE ENTRY POINT for every game notice: kitNotice({id, line, text, pic, kind, sticky, go, goLabel}) (or kitNotice("one line")).
     id      same id = the same notice (updated, not doubled; the chip shows again only when its line changed). Default = the line itself.
     line    the SHORT one line of the chip («Ngự hoa viên sắp đóng cửa sau khắc này»). Plain text.
     text    the FULL text of the panel («… Ở lại = như lẻn vào: Có cơ.»), plain text; default = line.
     pic     representative picture (img/… path); default = the kit info picture of «Tin báo» (kitInfoArt).
     sticky  the box keeps its busy light while this notice exists, even when read (closing alert: until she leaves / the place opens).
     go      optional real action of the panel (one option row, label goLabel), e.g. the Tai mắt news «Để ta xem».
   → (1) the «!» BOX in the fixed TOP BAR (header.hud) lights (§77 square kit button + the §78 yellow round «!» disc `.khap`, kbusy + kbadge);
     (2) ONE short kit chip line `.ktbt` with the «!» disc appears at the TOP for BAL.entryToastMs (5 s), then goes: in a free spot of the top
         bar itself, else just under it, else straddling its lower edge — never over a person, a card, a button, a name (kitToastKeepRects) and
         NEVER at the bottom. No free spot at the top → no chip, the box alone lights (the notice is in its list);
     (3) tap the chip → the small kit panel «Tin báo» of that notice (picture + full text); tap the box → the same panel listing the unread
         notices (else the last ones). Reading marks them seen.
   kitNoticeDrop(id|prefix*) removes notices that no longer hold (closing alert after she left). kitNoticeList() / kitNoticeSeen(id?) / kitNoticeOpen(id?).
   Old toast calls route here: kitLine (jclose, every caller), kitLineToast (jplst place-entry lines), the closing alert (jstagehere), the
   Tai mắt news (jagknow tinBaoOn), the flip note (j93 kitFlipNote), the «CẤM» place line (j42 srvToast). Errands («cung nữ về báo tin») call
   kitNotice directly. NOT notices (own owner rulings, unchanged): the act result card #rtoast (jksize: routine acts keep the small result card),
   the tutorial coach kitTip, the co-op clock #kctm/#kctmf (status, 16/11 ruling).
   State: in memory only (the list of this session); S.closeSeen keeps the closing chip once per buổi. Old saves: nothing new stored. */
(function(){try{
const NT=window.NT={list:[],seq:0,chips:0,shown:[],log:[]};
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const plain=s=>String(s==null?"":s).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
const ms=()=>{try{return BAL.entryToastMs}catch(e){return 5000}};
const cap=()=>{try{return BAL.noticeMax}catch(e){return 20}};
const calm=()=>{try{return typeof reducedMotion==="function"&&reducedMotion()}catch(e){return false}};
const dlgOpen=()=>{try{const m=$("modal");if(m&&!m.hidden)return true;if(document.body.classList.contains("kdlg-on")||document.body.classList.contains("kbk-open"))return true;
 const t=$("title");return !!(t&&!t.hidden&&t.getClientRects().length)}catch(e){return false}};
const hudEl=()=>{const h=document.querySelector("header.hud");return h&&h.getClientRects().length&&getComputedStyle(h).visibility!=="hidden"?h:null};
const unread=()=>NT.list.filter(x=>!x.seen);
/* ---------- entry point ---------- */
/* owner rule (VANPHONG §3): «???» NEVER prints in prose (news / notices / log / dialog text). An unnamed person is «một vị <phẩm> chưa quen biết» (the k61Mask plain wording); a bare «???» = «một người chưa quen biết». ONE function, used by kitNotice, the log and every dialog text (owner flight bug 24/11) */
function kitNoUnk(s){if(typeof s!=="string")return s;if(s.indexOf("chưa quen biết")>=0)s=s.replace(/(một vị [^,.;:()<>\d]{2,30}?) chưa quen biết/gi,"$1");if(s.indexOf("???")<0)return s;return s.replace(/(Hoàng quý phi|Hoàng hậu|Thái hậu|Tổng quản thái giám|Thái giám|Quý phi|Quý nhân|Thường tại|Đáp ứng|Thị vệ|Thái y|Vương gia|Nhạc sư|Sứ thần|Họa sư|Phi|Tần|cung nữ|thái giám|thị nữ|tì nữ|nô tì)\s+\?\?\?/g,(m,r)=>`một vị ${/^(thái giám|cung nữ|thị nữ|tì nữ|nô tì)$/i.test(r)?r.toLowerCase():r}`).replace(/\?\?\?/g,"một người").replace(/^(<[^>]+>)*một /,m=>m.slice(0,-4)+"Một ")}
window.kitNoUnk=kitNoUnk;
(function(){const st=document.createElement("style");st.id="knt-css";st.textContent=".kntg{display:block;margin:1px 0 0;font-size:.92em}.kntrh{list-style:none;margin-left:-.2em}";document.head.appendChild(st)})();
/* option / act cards (kaNorm1, j63) + the card detail parser (kitParse, j19): prose text nodes lose «???» too; the stranger NAME chips (.kname / .kti / name tags) keep the j61 mask (owner flight bug 24/11, law 11) */
window.kitNoUnkDom=function(root){try{if(!root||root.textContent.indexOf("???")<0)return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const L=[];let n;while(n=w.nextNode()){if(n.nodeValue.indexOf("???")>=0&&!(n.parentElement&&n.parentElement.closest(".kname,.kti,.krname,.kptag,.ktag,.kan,.kpname,.kprank,.kname2")))L.push(n)}L.forEach(t=>{t.nodeValue=kitNoUnk(t.nodeValue)})}catch(e){}};
function kitNotice(spec){try{if(spec==null)return null;if(typeof spec!=="object")spec={line:String(spec)};if(spec.line)spec.line=kitNoUnk(spec.line);if(spec.text)spec.text=kitNoUnk(spec.text);if(Array.isArray(spec.items))spec.items=spec.items.map(kitNoUnk);
 let line=plain(spec.line||spec.text||"");if(!line)return null;try{if(typeof kShort==="function")line=kShort(line)}catch(e){}
 const id=String(spec.id||line);const text=plain(spec.text||line);NT.log.push(line);
 let it=NT.list.find(x=>x.id===id);const again=!it||it.line!==line||!!spec.again;
 if(!it){it={id};NT.list.unshift(it)}else if(again){NT.list.splice(NT.list.indexOf(it),1);NT.list.unshift(it)}
 Object.assign(it,{items:Array.isArray(spec.items)?spec.items.map(x=>plain(x)).filter(Boolean):null,line,text,pic:spec.pic||it.pic||"",kind:spec.kind||it.kind||"",sticky:!!spec.sticky,go:spec.go||null,goLabel:spec.goLabel||"",t:Date.now()});
 if(again)it.seen=false;
 while(NT.list.length>cap()){const i=NT.list.map(x=>!!x.sticky).lastIndexOf(false);NT.list.splice(i>=0?i:NT.list.length-1,1)}
 boxPaint();if(again)chipShow(it);return it}catch(e){console.error("kitNotice",e);return null}}
function kitNoticeDrop(id){try{const pre=String(id).endsWith("*")?String(id).slice(0,-1):null;const n0=NT.list.length;
 NT.list=NT.list.filter(x=>pre!=null?x.id.indexOf(pre)!==0:x.id!==String(id));if(NT.list.length!==n0){const c=$("kntchip");if(c&&!NT.list.some(x=>x.id===c.dataset.id))chipHide(c);boxPaint()}}catch(e){}}
function kitNoticeSeen(id){for(const x of NT.list)if(id==null||x.id===id)x.seen=true;boxPaint()}
function kitNoticeList(){return NT.list.slice()}
/* ---------- placement (one finder for the box and the chip; screen px calibrated to style px on the scaled design canvas, KIT §0) ---------- */
function cal(el){el.style.left="0px";el.style.top="0px";const a=el.getBoundingClientRect();el.style.left="100px";el.style.top="100px";const b=el.getBoundingClientRect();
 return{A:a.left,B:a.top,sx:(b.left-a.left)/100||1,sy:(b.top-a.top)/100||1,w:a.width,h:a.height}}
function setAt(el,c,x,y){el.style.left=((x-c.A)/c.sx).toFixed(1)+"px";el.style.top=((y-c.B)/c.sy).toFixed(1)+"px"}
/* header obstacles: every visible leaf / button / picture of the top bar except the given element and the stage rail dock (which places itself around us) */
function hudRects(hud,skip){const R=[];for(const e of hud.querySelectorAll("*")){if(skip&&(skip===e||skip.contains(e)))continue;if(e.closest("#krail"))continue;
 if(e.children.length&&!e.matches("button,img,svg,canvas,[role=button]"))continue;if(!e.getClientRects().length)continue;const r=e.getBoundingClientRect();if(r.width<2||r.height<2)continue;
 const cs=getComputedStyle(e);if(cs.visibility==="hidden"||+cs.opacity===0)continue;
 r.__t=e.children.length?e.matches("img,svg,canvas"):!!(e.textContent.trim()||e.matches("img,svg,canvas,button,[role=button]")||e.closest("svg"));/* a tappable ROW counts by its own words, not its whole box *//* a word / number / picture / button (not a bare bar track, even inside a tappable row) */
 R.push(r)}return R}
const hits=(R,x,y,w,h,m)=>R.some(r=>x<r.right+m&&x+w>r.left-m&&y<r.bottom+m&&y+h>r.top-m);
/* scan a region; xs = centre-out (chip) or right→left (box) */
function scan(Rg,w,h,R,m,mode,up){if(w>Rg.right-Rg.left-2*m||h>Rg.bottom-Rg.top)return null;
 const X=[];if(mode==="right"){for(let x=Rg.right-m-w;x>=Rg.left+m;x-=2)X.push(x)}else{const c=Rg.left+(Rg.right-Rg.left-w)/2;X.push(c);for(let d=4;c-d>=Rg.left+m||c+d+w<=Rg.right-m;d+=4){if(c+d+w<=Rg.right-m)X.push(c+d);if(c-d>=Rg.left+m)X.push(c-d)}}
 const Y=[];for(let y=Rg.top;y+h<=Rg.bottom;y+=2)Y.push(y);if(up)Y.reverse();
 for(const y of Y)for(const x of X)if(!hits(R,x,y,w,h,m))return{x,y};return null}
/* ---------- the BOX ---------- */
function boxPaint(){try{const hud=hudEl();let b=$("kntbox");const L=NT.list,U=unread();const live=typeof S!=="undefined"&&S&&!S.dead;
 if(!hud||!L.length||!live){if(b)b.remove();return null}
 if(getComputedStyle(hud).position==="static")hud.style.position="relative";
 if(!b){b=document.createElement("button");b.type="button";b.id="kntbox";b.className="krailb kglyph kntb";b.innerHTML=`<i class="khap" aria-hidden="true">!</i>`}
 const lit=U.length>0||L.some(x=>x.sticky);b.classList.toggle("kbusy",lit&&!calm());b.classList.toggle("kbadge",U.length>0);b.classList.toggle("kntcalm",!lit);b.dataset.n=String(U.length);
 const lab=U.length?`Tin báo: ${U.length} tin mới`:"Tin báo";b.setAttribute("aria-label",lab);b.title=lab;
 if(b.parentNode!==hud){hud.appendChild(b);b.__ok=0}
 /* keep the spot while it is still free (no jumping on every render); else the first free spot from the top-right corner of the bar */
 const H=hud.getBoundingClientRect(),R=hudRects(hud,b),cur=b.getBoundingClientRect();
 /* re-checked on every paint: the spot must still be free of every word / picture / button of the bar (a render can change the bar's text) */
 if(!b.__ok||hits(R,cur.left,cur.top,cur.width,cur.height,2)){const c=cal(b);const p=scan({left:H.left+4,right:H.right-4,top:H.top+3,bottom:H.bottom-3},c.w,c.h,R,3,"right");
  if(p){setAt(b,c,p.x,p.y);b.__ok=1}else{const sl=hud.querySelector(".kseal-hud,#emp,.kseal")||null;const r=sl&&sl.getClientRects().length?sl.getBoundingClientRect():null;
   setAt(b,c,r?r.left+(r.width-c.w)/2:H.right-c.w-6,r?r.bottom-c.h:H.top+4);b.__ok=0}}
 return b}catch(e){console.error("kntbox",e);return null}}
/* ---------- the CHIP ---------- */
function chipEl(it){let el=$("kntchip");if(!el){el=document.createElement("div");el.id="kntchip";el.className="ktbt kntc";el.setAttribute("role","status");document.body.appendChild(el)}
 el.dataset.id=it.id;el.innerHTML=`<i class="khap" aria-hidden="true">!</i><span>${esc(it.line)}</span>`;el.classList.remove("out");return el}
function chipHide(el){el=el||$("kntchip");if(!el)return;el.classList.add("out");clearTimeout(NT.t);setTimeout(()=>{if(el.classList.contains("out"))el.remove()},500)}
function chipPlace(el){try{el.style.transform="none";el.style.maxWidth="none";const c=cal(el);const w=c.w,h=c.h;const hud=hudEl();
 const keep=(typeof kitToastKeepRects==="function"?kitToastKeepRects(el):[]);const box=$("kntbox");
 if(!hud){const p=scan({left:6,right:innerWidth-6,top:6,bottom:6+3*h},w,h,keep,4);if(p){setAt(el,c,p.x,p.y);el.style.visibility="";el.dataset.slot="top";return true}el.style.visibility="hidden";return false}
 const H=hud.getBoundingClientRect();const HR=hudRects(hud,null);
 const noHud=keep.filter(r=>!(Math.abs(r.left-H.left)<1.5&&Math.abs(r.top-H.top)<1.5&&Math.abs(r.right-H.right)<1.5));/* the whole bar box itself is not an obstacle; its parts are */
 const col=typeof kitToastCol==="function"?kitToastCol():{left:0,right:innerWidth};
 /* (a) a free spot of the top bar itself (owner: "cái phần khung ở trên ... trống nhiều quá") */
 let p=scan({left:H.left+4,right:H.right-4,top:H.top+3,bottom:H.bottom-3},w,h,HR.concat(box?[box.getBoundingClientRect()]:[]),4);let slot="bar";
 /* (a2) a quiet part of the top bar: over no word, number, picture or button of it — only its empty bar tracks (the mood slider): the phone's
    top bar has no fully empty slot, and the chip stays IN the top frame for its few seconds (owner: "phải nằm ở trên chứ không phải nằm ở dưới") */
 if(!p){slot="bar2";const Q=HR.filter(r=>r.__t);p=scan({left:H.left+4,right:H.right-4,top:H.top+2,bottom:H.bottom-1},w,h,Q.concat(box?[box.getBoundingClientRect()]:[]),1,"",true)}/* lowest first: the bar's edge nearest the screen */
 /* (b) just under the top bar (a band of two chip heights), over nothing kept (map title plaque .maptools::before included) */
 const mt=[...document.querySelectorAll(".maptools")].filter(e=>e.getClientRects().length).map(e=>e.getBoundingClientRect());
 if(!p){slot="under";p=scan({left:Math.max(col.left,0)+4,right:Math.min(col.right,innerWidth)-4,top:H.bottom+3,bottom:H.bottom+3+2*h},w,h,keep.concat(mt),3)}
 /* (c) straddling the bar's lower edge: over no word of the bar and nothing kept under it */
 if(!p){slot="edge";p=scan({left:H.left+4,right:H.right-4,top:H.bottom-h+2,bottom:H.bottom+h-2},w,h,HR.concat(noHud,mt),2)}
 if(!p){el.style.visibility="hidden";el.dataset.slot="";return false}/* no free spot at the top: no chip — the box carries it (never at the bottom, never over people / cards) */
 setAt(el,c,p.x,p.y);el.style.visibility="";el.dataset.slot=slot;return true}catch(e){el.style.visibility="hidden";return false}}
function chipShow(it){try{if(dlgOpen()){NT.pend=it;watch();return null}NT.pend=null;const el=chipEl(it);chipPlace(el);NT.chips++;NT.shown.push(it.id);
 clearTimeout(NT.t);NT.t=setTimeout(()=>chipHide(el),window.__toastKeep?60000:ms());watch();return el}catch(e){return null}}
/* while a chip is up (or waits for a dialog to close) re-check every 300 ms: tab switches, scrolling lists, a dialog opening */
function watch(){if(NT.w)return;NT.w=setInterval(()=>{try{const el=$("kntchip");
 if(NT.pend&&!dlgOpen()){const it=NT.pend;NT.pend=null;if(NT.list.includes(it))chipShow(it)}
 if(el&&!el.classList.contains("out")){if(dlgOpen())el.style.visibility="hidden";else chipPlace(el)}
 if(!el&&!NT.pend){clearInterval(NT.w);NT.w=0}}catch(e){}},300)}
/* ---------- the PANEL «Tin báo» (kit panel kind info: picture left/top, text beside) ---------- */
function picOf(it){return it&&it.pic||""}
/* ONE NEWS ROW (owner 24/11 ~21:58Z, kỳ-ngộ rumours): «Nghe nói A gặp kỳ ngộ với B: Danh +2; Đức +3; cung nữ ??? thiện cảm +30.» → a row «A gặp kỳ ngộ với B» (when 2+ rumours the «Nghe nói:» head row says it once) + its gains as kit stat chips (kitChip / kpSent: ONE colour scheme for every stat), other clauses stay words; no « · » */
function ntRow(t,drop){try{const m=/^Nghe nói (.+?) gặp kỳ ngộ(?: với ([^:]+?))?(?:: (.+?))?\.?$/.exec(t);if(!m)return esc(t);
 const cap=x=>String(x||"").replace(/^một /,"Một "),G=[],words=[];
 if(m[3])m[3].split(/;\s*/).forEach(pt=>{const q=/^(.*?)\s*(Danh|Đức|Sủng|Bạc|Tài|Sắc|Tâm cơ|Sức|thiện cảm|oán|ghen|tin cậy)\s*([+−-])\s?(\d+(?:[.,]\d+)?)$/i.exec(pt.trim());
  if(q&&typeof kitChip==="function"){const v=(q[3]==="+"?1:-1)*parseFloat(q[4].replace(",","."));const who=cap((q[1]||m[1]).trim());let g=G.find(x=>x.w===who);if(!g)G.push(g={w:who,c:[]});g.c.push(kitChip(q[2],v))}else if(pt.trim())words.push(pt.trim())});
 /* owner 24/11 ~21:57Z (OD): every change = ONE short line «<Tên>: thiện cảm +30»; a stat without its own subject belongs to the one who met (A) */
 return `${drop?"":"Nghe nói "}${esc(cap(m[1]))} gặp kỳ ngộ${m[2]?" với "+esc(m[2]):""}${words.length?": "+esc(words.join("; ")):""}${G.map(g=>`<span class="kntg">${esc(g.w)}: <span class="kchips kntch">${g.c.join(" ")}</span></span>`).join("")}`}catch(e){return esc(t)}}
function kitNoticeOpen(id){try{if(typeof kitPanel!=="function")return null;const one=id!=null?NT.list.find(x=>x.id===id):null;
 const U=unread();const L=one?[one]:(U.length?U:NT.list.slice(0,6));if(!L.length)return null;
 const lead=L[0];/* plain kit text rows (kpsec html), not kitFacts: no person figure is guessed from the words — the panel stays SMALL */
 /* owner 24/11 flight bug #8: ONE NEWS = ONE ROW. Every notice is its own row of the kit bullet list (ul.kbl, KIT 31.14); a notice that carries several facts (kitKnow batch: x.items) gives one row per fact — never one wall of text joined with « · » */
 const rows=[];for(const x of L){const seen=!one&&x.seen?" <small>(đã xem)</small>":"";const A=x.items&&x.items.length?x.items:[x.text];const nR=A.filter(t=>/^Nghe nói /.test(t)).length;if(nR>=2&&!rows.some(r=>/kntrh/.test(r)))rows.push('<li class="kntrh"><b>Nghe nói:</b></li>');A.forEach((t,i)=>rows.push(`<li>${ntRow(t,nR>=2)}${i===A.length-1?seen:""}</li>`))}
 const html=`<ul class="kbl kntl">${rows.join("")}</ul>`;
 const go=L.find(x=>typeof x.go==="function");const opts=go?[{n:go.goLabel||"Để ta xem",fx:{},go:()=>{try{go.go()}catch(e){}boxPaint()}},{n:"Để sau",fx:{},go:()=>{boxPaint()}}]:undefined;/* review r4: a kit panel with options has no ✕ (jksize) — «Để sau» always lets her close it without being sent to Dư đồ */
 const m=kitPanel({kind:"notice",title:"Tin báo",sub:one&&rows.length<2?"":(U.length||(one&&rows.length>1)?`${rows.length} tin mới`:"Đã xem hết"),sections:[{html}],opts,onClose:()=>boxPaint()},true);m.__ntc=lead;showModal();picSwap(document,lead);for(const t of [0,150,400,800,1500])setTimeout(()=>{if(NT.open===m){picSwap(document,lead);try{kitNoUnkDom(document.getElementById("modal"))}catch(e){}}},t);NT.open=m;
 for(const x of L)x.seen=true;const c=$("kntchip");if(c)chipHide(c);setTimeout(boxPaint,0);return m}catch(e){console.error("kitNoticeOpen",e);return null}}
/* the panel's picture = the notice's own (the kit info panel puts kitInfoArt("Tin báo") there; a notice with a picture swaps it in the same kit frame) */
function picSwap(M,it){try{const src=picOf(it);if(!src)return;const im=M.querySelector("#mb figure.ksart img, #mb .ksart img");if(im&&im.getAttribute("src")!==src)im.setAttribute("src",src)}catch(e){}}
try{const b0=kpBuild;kpBuild=function(M,m){const r=b0.apply(this,arguments);try{const it=m&&m.__ntc;if(it){picSwap(M,it);setTimeout(()=>picSwap(M,it),0)}}catch(e){console.error("kntpanel",e)}return r}}catch(e){}/* the kit picture slot of the panel (info art «Tin báo» by default) shows the notice's own picture */
document.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest("#kntbox,#kntchip");if(!t)return;e.stopPropagation();e.preventDefault();
 try{if(typeof sfx==="function")sfx("sfx-tap")}catch(x){}kitNoticeOpen(t.id==="kntchip"?t.dataset.id:null)},true);
/* ---------- routing of the old notice calls (one entry point) ---------- */
window.kitLine=kitLine=function(text){return kitNotice({line:text})?$("kntchip"):null};/* §42.2: was a bottom pill (#kupdline) */
window.kitLineToast=function(text){const it=kitNotice({line:text});return it?$("kntchip"):null};/* jplst place-entry line (was #ktbtoast) */
try{if(typeof kitFlipNote==="function")kitFlipNote=window.kitFlipNote=function(p){if(!p||p===S)return;let rk="";try{rk=kmRankName(typeof rkOf==="function"?rkOf(p):0)}catch(e){}
 kitNotice({id:"flip",line:`Tối nay Hoàng thượng lật thẻ ${rk} ${p.name||""}`.replace(/\s+/g," "),again:true})}}catch(e){}
try{if(typeof srvToast==="function")srvToast=window.srvToast=function(msg){if(window.__bot)return;kitNotice({line:msg,again:true})}}catch(e){}
/* Tai mắt news (jagknow AG-ALL-2c API; the reviewed review/tinbao-ui line «<người> báo: <nơi> có chuyện»): into the box; «Để ta xem» = the Dư đồ tab */
function tbBy(it){try{const by=String(it&&it.by||"");if(by==="mat")return"Tai mắt";if(by==="here")return"";let p=null;
 if(/^s\d/.test(by)){p=(S.staff||[]).find(s=>"s"+s.sid===by)||null;if(!p)for(const v of (rivals||[])){p=(v.staff||[]).find(s=>"s"+s.sid===by);if(p)break}}
 else if(/^v\d/.test(by))p=(rivals||[]).find(v=>"v"+v.id===by)||null;else if(by.indexOf("scm")===0){const m=by.slice(3);p=m==="me"?S.maid:((rivals||[]).find(v=>"v"+v.id===m)||{}).maid||null}
 return p&&p.name?String(p.name):""}catch(e){return""}}
const plName=k=>{try{return placeName(k)||String(k||"")}catch(e){return String(k||"")}};
const scenePic=k=>{try{const n=SCIMG[placeOf(k).sc];return n?`img/${n}.webp`:""}catch(e){return""}};/* the place picture (same path as the Dư đồ list, j9) */
function goDuDo(){try{const b=document.querySelector('#tabs [data-tab="go"]');if(b)b.click()}catch(e){}}
let tbSub=null;function tbHook(){if(tbSub||typeof tinBaoOn!=="function")return;tbSub=tinBaoOn(it=>{try{if(!it||!it.id||it.seen)return;const w=tbBy(it);const pn=plName(it.place);
 kitNotice({id:"tb:"+it.id,kind:"tin",line:`${w?w+" báo: ":"Có tin: "}${pn}${it.ended?" vừa":""} có chuyện`,text:`${w?w+" báo: ":""}${plain(it.line)}`,pic:scenePic(it.place),
  go:it.ended?null:()=>{try{tinBaoSeen(it.id)}catch(e){}goDuDo()},goLabel:"Để ta xem"})}catch(e){}})}
/* ---------- repaint ---------- */
const paintR=()=>(window.renderAfter||((k,g)=>g()))("knotice",()=>{tbHook();boxPaint()});
try{const r1=render;render=function(){const r=r1.apply(this,arguments);try{paintR()}catch(e){}return r};window.render=render}catch(e){}
let rt=0;addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(()=>{const b=$("kntbox");if(b)b.__ok=0;boxPaint();const c=$("kntchip");if(c)chipPlace(c)},80)});
const st=document.createElement("style");st.id="kit-notice";st.textContent=`
#kntbox.kntb{position:absolute;z-index:8;width:32px;height:32px;min-width:0;min-height:0;padding:0;display:flex;align-items:center;justify-content:center}
#kntbox.kntb .khap{margin:0;width:20px;height:20px;line-height:20px;font-size:.86rem;vertical-align:0;animation:none}
#kntbox.kntb.kntcalm .khap{opacity:.5;box-shadow:0 0 0 1.5px #fffbe0}
#kntbox.kntb.kbusy .khap{animation:kntBlink calc(1.1s*var(--pace,1)) ease-in-out infinite}
@keyframes kntBlink{0%,100%{opacity:1}50%{opacity:.4}}
#kntchip.kntc{left:0;transform:none;white-space:nowrap;max-width:none;width:max-content}
#kntchip.kntc .khap{flex:0 0 auto;margin:0;width:16px;height:16px;line-height:16px;font-size:.72rem;vertical-align:0;animation:none}
body.kdlg-on #kntchip,body.kbk-open #kntchip{visibility:hidden!important}`;document.head.appendChild(st);
/* ---------- KNOW-NOTICE (owner OD 23/11 ~23:08Z "Cái thông tin nào tôi biết cũng phải có cái sự thông báo rõ ràng"): kitKnow = the ONE kit entry for "she learned something" ----------
   kitKnow({key,text,pri}): a name, a face, a rank, a nature, a liking, a rumour, a note in the Sổ. Facts that arrive in the same tick (one act) are BATCHED
   into ONE kitNotice (kind "know"): one fact = its own line; several = «Ngươi biết thêm N điều» + every line in the «Tin báo» panel. Same key in one batch =
   one fact (the richer pri wins; a Sổ note never doubles the trait it came from). Never blocks play; plain cổ trang words, no %. */
const KB={m:new Map(),t:0,n:0};
function kitKnow(o){try{if(!o||!o.text)return;const k=String(o.key||o.text),p=o.pri|0,ex=KB.m.get(k);if(!ex||p>=ex.pri)KB.m.set(k,{text:plain(o.text),pri:p});if(!KB.t)KB.t=setTimeout(kitKnowFlush,0)}catch(e){console.error("kitKnow",e)}}
function kitKnowFlush(){try{if(KB.t){clearTimeout(KB.t);KB.t=0}const L=[...KB.m.values()].map(x=>x.text);KB.m.clear();if(!L.length)return null;
 return kitNotice({id:"know:"+Date.now()+":"+(++KB.n),kind:"know",line:L.length===1?L[0]:`Ngươi biết thêm ${L.length} điều`,text:L.join(" · "),items:L,again:true})}catch(e){console.error("kitKnowFlush",e);return null}}
/* kitKnowMany([{key,text,pri}…]) = the call for a LIST of things learned at once (the sắc phong news of SELSCENE: one line per girl «<tên> nay là <phẩm>»): all into the same batch, flushed NOW → ONE notice «Ta biết thêm N điều» (returns it) */
function kitKnowMany(list){try{for(const x of list||[])kitKnow(x);return kitKnowFlush()}catch(e){console.error("kitKnowMany",e);return null}}
try{const l0=log;log=window.log=function(h){return l0.call(this,kitNoUnk(h))}}catch(e){}
setTimeout(()=>{try{const sm=showModal;showModal=window.showModal=function(){try{const m=typeof Q!=="undefined"?Q[0]:null;if(m){if(typeof m.h==="string")m.h=kitNoUnk(m.h);if(typeof m.t==="string")m.t=kitNoUnk(m.t)}}catch(e){}return sm.apply(this,arguments)}}catch(e){}},0);
Object.assign(window,{kitNotice,kitNoticeDrop,kitNoticeSeen,kitNoticeList,kitNoticeOpen,kitNoticeBox:boxPaint,kitKnow,kitKnowFlush,kitKnowMany});
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§42.3",title:"kitKnow · «Ta biết thêm N điều» (one kitNotice kind know; same chip, box and Tin báo panel as §42.2)",
 html:()=>`<div class="kitpg-row" style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><span class="ktbt" style="position:static;transform:none;white-space:nowrap"><i class="khap" style="margin:0">!</i><span>Ta biết thêm 3 điều</span></span><button type="button" class="btn" onclick="kitKnowMany([{key:'a',text:'Ngươi biết tên: đó là Lệ tần Mai thị.'},{key:'b',text:'Ngươi đã thấy mặt một phi tần áo bậc Tần; chưa biết tên.'},{key:'c',text:'Quý phi Đào Cẩm Tâm nay được tấn phong Hoàng quý phi.'}]);kitNoticeOpen()">Mở khung Tin báo</button></div>`})}catch(e){}
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§42.2",title:"kitNotice · ô ! trên thanh trên + chip một dòng ở trên + khung Tin báo",
 html:()=>`<div class="kitpg-row" style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><button type="button" class="krailb kglyph kntb kbusy kbadge" style="position:relative;width:32px;height:32px;min-width:0;min-height:0;padding:0;display:flex;align-items:center;justify-content:center"><i class="khap" style="margin:0">!</i></button>`+
  `<button type="button" class="krailb kglyph kntb kntcalm" style="position:relative;width:32px;height:32px;min-width:0;min-height:0;padding:0;display:flex;align-items:center;justify-content:center"><i class="khap" style="margin:0;opacity:.5">!</i></button>`+
  `<span class="ktbt" style="position:static;transform:none;white-space:nowrap"><i class="khap" style="margin:0">!</i><span>Ngự hoa viên sắp đóng cửa sau khắc này</span></span>`+
  `<button type="button" class="btn" onclick="kitNotice({id:'kitpg',line:'Ngự hoa viên sắp đóng cửa sau khắc này',text:'Ngự hoa viên sắp đóng cửa sau khắc này (đóng cửa tối). Ở lại = như lẻn vào: Có cơ.'});kitNoticeOpen('kitpg')">Mở khung Tin báo</button></div>`})}catch(e){}
}catch(e){console.error("jnotice",e)}})();
