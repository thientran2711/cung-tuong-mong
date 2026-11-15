/* ================= jkitpage: TRANG MẪU KIT — the kit sample page (luật KIT TRƯỚC, owner 11/15 16:50Z; tabs-kit r7) =================
   Open the game with "#kit" at the end of the address (…/index.html#kit) or call kitSamplePage() in the console: a full-screen page shows
   every registered kit part drawn by the REAL kit functions (no copies), at the current screen size. Close = the kit ✕ or remove "#kit".
   Every new kit part adds its sample here in the same commit as its KIT.md section:
     KIT_SAMPLES.push({id:"§21", title:"kitSkillCard", html:()=>kitSkillCard({...})});
   Samples render inside .kpanel-like paper; act cards (pbtn) are normalised by j63 kaNorm and compacted by §43 like in the game. */
const KIT_SAMPLES=[];window.KIT_SAMPLES=KIT_SAMPLES;
function kitSamplePage(){try{let pg=document.getElementById("kitpage");if(!pg){pg=document.createElement("div");pg.id="kitpage";pg.setAttribute("role","dialog");pg.setAttribute("aria-label","Trang mẫu kit");document.body.appendChild(pg)}
 pg.innerHTML=`<div class="kitpg-h"><b>Trang mẫu kit</b><small>${KIT_SAMPLES.length} thành phần · dev/kit/KIT.md</small><button type="button" class="kitpg-x" aria-label="Đóng">✕</button></div>`+
  KIT_SAMPLES.map(x=>{let h="";try{h=x.html()}catch(e){h=`<em class="r">lỗi: ${String(e.message||e).slice(0,80)}</em>`}
   return `<section class="kitpg-s" data-kit="${x.id}"><h4 class="kpst">${x.id} · ${x.title}</h4><div class="kitpg-b">${h}</div></section>`}).join("");
 pg.hidden=false;pg.querySelector(".kitpg-x").onclick=()=>{pg.hidden=true;if(location.hash==="#kit")history.replaceState(null,"",location.pathname+location.search)};
 try{if(typeof kitFix==="function")kitFix(pg);if(typeof kitActCompactOn==="function")kitActCompactOn(pg)}catch(e){}return pg}catch(e){console.error("kitSamplePage",e)}}
window.kitSamplePage=kitSamplePage;
addEventListener("hashchange",()=>{if(location.hash==="#kit")kitSamplePage()});
if(location.hash==="#kit")setTimeout(kitSamplePage,1200);
/* samples of the parts added / changed by tabs-kit r7 (§21, §28.19 thumb, §43 compact acts, §45 pane bar, §46 tab parts) */
KIT_SAMPLES.push(
 {id:"§28.19",title:"kitSceneArt: wide · tall · thumb",html:()=>`<div class="kitpg-row"><div style="width:220px">${kitSceneArt(kitInfoArt("sắc phong").src,"Rộng 16:9",{shape:"wide"})}</div><div style="width:120px">${kitSceneArt(kitSkillArt("vir","cong","Công"),"Cao 3:4",{shape:"tall"})}</div>${kitSceneArt(kitSkillArt("art","cam","Cầm"),"Nhỏ",{shape:"tall",size:"thumb",cap:false})}</div>`},
 {id:"§21",title:"kitSkillCard: môn (có việc), chương, trống",html:()=>`<div class="kskills">`+
  kitSkillCard({kind:"art",k:"cam",name:"Cầm",level:2,max:5,prog:[1,4],desc:"Tài: thơ, đàn, thi tài",next:"Tài +2",stepsAttr:'data-v85tab="cam"',
   acts:[pbtn('data-kitsample="1"',"Tự học","Chắc chắn · tốn: 2 khắc, Sức -15 · thành: tiến bộ +1..2",""),pbtn('data-kitsample="2"',"Học với thầy","Chắc chắn · tốn: 2 khắc, Bạc -15 · thành: tiến bộ +1..3","thiếu bạc (cần 15)")]})+
  kitSkillCard({kind:"story",k:"x",kicker:"Chương 2",name:"Tên chương",level:1,max:4,word:"Hồi",bar:false,next:"",img:kitInfoArt("Mệnh truyện").src})+
  kitEmpty("Việc nhờ","Chưa ai nhờ ngươi việc gì.")+`</div>`},
 {id:"§46",title:"kitChecks · kitInfo",html:()=>kitChecks([[false,"Sủng 8 (cần 38)"],[true,"Danh 33 (cần 30)"]])+(typeof kitInfo==="function"?kitInfo("Việc nhờ"):"")},
 {id:"§43",title:"Việc gọn (cột hẹp, kpanec)",html:()=>`<div class="pcb ktacts"><div class="kpanec">${pbtn('data-kitsample="3"',"Hỏi han ở tẩm cung ta: ai cần giúp?","tốn: 1 khắc · thành: người ở đây có việc thì ngỏ lời nhờ","")}</div></div>`});
(function(){const st=document.createElement("style");st.id="kit-page";st.textContent=`
#kitpage{position:fixed;inset:0;z-index:2147483000;overflow:auto;background:var(--panel,#fffaf0);padding:0 16px 24px;color:var(--ink)}
#kitpage[hidden]{display:none}
.kitpg-h{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:10px 0;background:var(--panel,#fffaf0);border-bottom:1px solid var(--k-hair,#e6d3ac)}
.kitpg-h b{font-family:var(--display,serif);color:var(--gold);font-size:1.1rem}.kitpg-h small{color:var(--dim);flex:1}
.kitpg-x{min-width:44px;min-height:44px;border:1px solid var(--line);border-radius:var(--k-rad,8px);background:var(--k-card,#fffaf0);font-size:1.1rem;cursor:pointer}
.kitpg-s{margin:14px 0}.kitpg-b{padding:10px;border:1px dashed var(--k-hair,#e6d3ac);border-radius:var(--k-rad,8px)}
.kitpg-row{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start}
`;document.head.appendChild(st)})();
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kitsample]");if(b){e.stopPropagation();e.preventDefault()}},true);
