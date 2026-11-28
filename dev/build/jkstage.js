/* ===== KIT §102 kitStage «SÂN KHẤU KHÔNG KHUNG» — the ONE layout of every event-choice screen that holds a hand of cards (KIT §101 kitHand)
   Owner 24/11 ~15:15Z mẫu 1 «Bàn bài» (a) «no event frame first — the event opens straight into the animation» (c) «speaker left / her right»
   + 25/11 ~21:50Z (verbatim, via MAIN 146): «… không có còn cái kiểu là khung giao diện như thế này, mà là chỉ là hình nhân vật xuất hiện cùng với
   những cái thông tin … làm lại cái khung giao diện chung, như là một cái kit chuẩn chung … để bất kỳ một cái khung nào xuất hiện thì mình cũng đều
   lấy từ cái kit đó ra để làm như nhau» (KK32, review/kit-stage).
   ONE rule, whole family (laws 9/11): a #modal dialog whose option list became a hand (`.dlg.khdlg` > `.opts.khand`, jkhand) turns into a STAGE:
   - no panel box: the dialog takes the scene layer between the top bar and the tab bar (kscnGeo, §93.1), transparent, no frame / border / shadow;
   - the event's own picture (the band of the frame, `.k3ev` / `.kdlgart`) is the BACKGROUND of the whole layer (clear, bright; a soft shade only
     under the hand); no picture → the warm kit stage colour;
   - the SPEAKER (the frame's figure `.kszfig`) stands full body on the LEFT, HER figure (kitFigOf(S)) full body on the RIGHT (layout A, §93.4);
   - the title = a small plaque on top; the story (faces row + lines, `.kpmain`) = a LIGHT speech box (soft paper, thin edge, no heavy panel) between
     the two figures (iPad); on one page (Fold) a slim band that never covers a face or the upper half of a body: «foot» = just above the hand,
     «top» = under the plaque with the figures below it (KIT_STAGE.fold); it scrolls inside itself when long (owner OD 24/11 ~15:15Z (d), 25/11 ~21:50Z);
   - the hand lies at the foot of the layer across the whole width (kitHand lays the cards for that width); the details plate sits above the
     lifted card, under the faces.
   - Motion (transform / opacity only, kitHandStill = none): the picture settles, the speaker walks in from the left, she from the right, the
     speech box drops in, then kitHand deals.
   Data / taps are unchanged: the same #modal, the same buttons, the same choose path (chooseM). Numbers: geometry knobs only (KIT_STAGE). */
const KIT_STAGE={pickCol:.42/* §102.3 iPad: place lines column share */,pickBand:.34/* §102.3 Fold: place lines band height share */,pickGap:14,pad:8,fig:[.98,.98]/* figure height share of the room [fold,ipad] */,feetIn:.30/* share of the hand height the feet may stand behind the cards */,
 faceK:.19/* the face band = top share of the painted figure */,midMin:420/* px between the figures for the speech box beside them (else it goes under the faces) */,
 boxMaxW:[720,760],plateW:560,sayW:460/* iPad speech bubble */,fold:"foot"/* one-page (Fold) speech place: "foot" = a slim subtitle band over the figures' lower half, just above the hand | "top" = a slim band under the title plaque, the figures stand below it (owner 25/11 ~21:50Z «chỉ là hình nhân vật xuất hiện cùng với những cái thông tin»; MAIN 146 picks; html[data-kstfold] overrides for the review pair) */,talkIds:["adStroll","rcvHelp","thbirthday","cmTt","cmTd","vnight"]/* §102.2 the events that are a CONVERSATION (a person speaks to her; MAIN 148 25/11 ~23:45Z): their Q item pid = talk:1 */,bodyK:.45/* the speech never covers the top half of a painted figure (one page) */,topCap:.30/* "top": the band takes at most this share of the layer */,inMs:[620,520,300],veil:"linear-gradient(to bottom,rgba(20,12,8,0) 55%,rgba(20,12,8,.34) 100%)"};
(function(){try{const st=document.createElement("style");st.id="kit-stage";st.textContent=`
html body #modal.kstg{background:transparent!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage{position:fixed!important;left:var(--kstL)!important;top:var(--kstT)!important;width:var(--kstW)!important;height:var(--kstH)!important;max-width:none!important;max-height:none!important;min-height:0!important;
 margin:0!important;padding:0!important;border:0!important;border-radius:var(--k-rad,12px)!important;box-shadow:none!important;background:#5a3c28!important;overflow:hidden!important;transform:none!important;display:block!important;outline:0!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage::before,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage::after{display:none!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>.kstg-bg{position:absolute;inset:0;z-index:0;background-size:cover;background-position:center;pointer-events:none}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>.kstg-veil{position:absolute;inset:0;z-index:0;background:${KIT_STAGE.veil};pointer-events:none}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>.kph{position:absolute!important;z-index:6;top:${KIT_STAGE.pad}px!important;left:50%!important;transform:translateX(-50%)!important;width:max-content!important;max-width:calc(100% - 96px)!important;
 margin:0!important;padding:5px 16px!important;min-height:0!important;border:1px solid var(--gold,#b8901f)!important;border-radius:999px!important;background:#fbf1e6eb!important;box-shadow:0 3px 12px #0004!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>.kph:has(>.kit-x){padding-right:54px!important}/* KK35: the plaque ✕ never sits over the title */
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>.kph .kptitle{white-space:normal!important;font-size:1.02rem!important;line-height:1.25!important;text-align:center}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>.kseal{position:absolute!important;z-index:6}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>#mb{position:absolute!important;inset:0!important;z-index:1;margin:0!important;padding:0!important;max-height:none!important;height:auto!important;overflow:visible!important;background:none!important;border:0!important;display:block!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>#mr,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>h2{display:none!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .k3body{position:static!important;display:block!important;height:auto!important;padding:0!important;margin:0!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .k3right{position:static!important;display:block!important;width:auto!important;height:auto!important;overflow:visible!important;padding:0!important;margin:0!important;max-height:none!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .k3ev,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kdlgart,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kevav,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kscue,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .k3body>.k3mpic,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpsubj.kpiart/* + a person-less frame's main picture (.k3mpic, «Tin báo») */ /* KK35: a head-art band (kitPanel headArt, «Mục tiêu chương») IS the stage background — never a framed tile too (K-KDTX-BAND family) */{display:none!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kstg-fig{position:absolute!important;z-index:2;left:var(--fx)!important;top:var(--fy)!important;width:var(--fw)!important;height:var(--fh)!important;margin:0!important;padding:0!important;
 display:block!important;overflow:visible!important;pointer-events:none;background:none!important;border:0!important;max-width:none!important;max-height:none!important;flex:none!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kszfig{display:none!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kstg-fig.kstg-nofig{visibility:hidden!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kstg-fig>img{position:absolute!important;left:0!important;top:0!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;min-height:0!important;object-fit:contain!important;object-position:50% 100%!important;filter:drop-shadow(0 4px 10px #0005)}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kstg-fig>.kt3{position:absolute!important;left:50%!important;top:var(--tagy,0px)!important;transform:translate(-50%,-100%)!important;width:max-content!important;max-width:14em!important;z-index:3;margin:0!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kt3 .knr{background:#fffaf0e8;border:1px solid var(--gold,#b8901f);border-radius:8px;padding:1px 8px;box-shadow:0 2px 6px #0003}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain{position:absolute!important;z-index:4;left:var(--bx)!important;top:var(--by)!important;width:var(--bw)!important;max-height:var(--bh)!important;height:auto!important;min-height:0!important;margin:0!important;
 overflow-y:auto!important;overscroll-behavior:contain;padding:8px 14px!important;background:#fbf1e6d6!important;border:1px solid #b8901f99!important;border-radius:12px!important;box-shadow:0 2px 10px rgba(0,0,0,.18)!important;display:block!important;flex:none!important;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces{display:flex!important;flex-wrap:wrap!important;gap:6px 14px!important;justify-content:flex-start!important;align-items:center!important;margin:0 0 6px!important;height:auto!important;min-height:0!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces>figure{display:flex!important;max-width:none!important;flex:0 0 auto!important;height:auto!important;flex-direction:row!important;align-items:center!important;gap:6px!important;width:auto!important;min-width:0!important;margin:0!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces .pframe,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces .pfwrap{--kffw:34px;width:34px!important;height:auto!important;flex:0 0 34px!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces figcaption,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces figcaption>*{width:auto!important;max-width:16em!important;flex:0 1 auto!important;height:auto!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces img{max-width:34px!important;max-height:46px!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces .pfnm,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces .pcname,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces .kfnm{font-size:.82rem!important;text-align:left!important;margin:0!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .opts.khand{position:absolute!important;z-index:5;left:0!important;right:0!important;bottom:4px!important;top:auto!important;width:auto!important;margin:0!important;max-height:none!important;overflow:visible!important;background:none!important;border:0!important;box-shadow:none!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage>.khplate{z-index:7}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain.kstg-foot>.faces{flex-wrap:nowrap!important;gap:4px 10px!important;margin:0 0 4px!important;overflow:hidden}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain.kstg-foot>.faces .pframe,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain.kstg-foot>.faces .pfwrap{--kffw:26px;width:26px!important;flex:0 0 26px!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain.kstg-foot>.faces img{max-width:26px!important;max-height:36px!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain.kstg-foot>.faces .pfnm,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain.kstg-foot>.faces .pcname,html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain.kstg-foot>.faces .kfnm{font-size:.72rem!important;line-height:1.1!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain.kstg-foot .kfacts>.kfact{font-size:.9rem;line-height:1.35;padding-block:1px!important}/* one page «foot»: a slim band — the faces row is one small line, the lines a touch tighter, so a usual story reads without scrolling */
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain{transition:opacity .16s ease-out}
html body #modal#modal#modal#modal#modal.kstg .dlg.dlg.kstage:has(>.khplate:not([hidden])) .kpmain.kpmain:not(.kstg-foot){max-height:var(--bhL,var(--bh))!important}
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage .kpmain>.faces>figure.kstg-dup{display:none!important}/* the speaker standing on the stage carries his own name tag: his face is not repeated in the story's faces row (KK34, duplicate «Hoàng thượng») */
html body #modal#modal#modal#modal#modal.kstg .dlg.kstage:has(>.khplate:not([hidden])) .kpmain.kstg-foot{opacity:0;visibility:hidden;pointer-events:none}/* one page «foot»: the lifted card's plate takes the band's place (✕ brings the story back) */`;document.head.appendChild(st)}catch(e){}})();
function kstgWants(dl,g){try{if(!(dl&&dl.matches&&dl.matches("#modal .dlg")&&!dl.closest(".pc,.kpdlg")))return false;/* RING-BUILD-5: a card that holds a kit picker (kitPicker, today only the new-game card's «Dung mạo») stays a card — on the stage the speech box lay over the picker and no face could be tapped */if(dl.querySelector(":scope>#mb .kpick"))return false;if(g)return g.closest(".dlg")===dl&&kitHandWants(g);return !!dl.querySelector(":scope>#mb .opts.khand")}catch(e){return false}}
function kstgGeo(){try{if(typeof kscnGeo==="function")return kscnGeo()}catch(e){}return{t:0,H:innerHeight,L:0,R:0,w:innerWidth}}
/* ONE bg-key rule for every event (KIT §102.1; Foreman C ROOT 3 KIT REQUEST via MAIN 146 25/11 22:35Z): the stage background =
   (1) the Q item's own `bg` key (img/<bg>.webp), (2) a MAJOR EVENT with no own picture key → its painted scene (KIT_EVBG, by the title words),
   (3) the event's own picture (the frame band), (4) the warm kit stage colour. A key whose picture is not on the CDN yet falls through (never a broken picture).
   kitEvBg(m) is exported so every scene host (kitScene.open bg, §93.1) reads the same rule. */
const KIT_EVBG=[[/(tấn phong|sắc phong)/i,"selx-tanphong"],[/(lập hậu|sách phong)/i,"selx-laphau"],[/(hòa thân)/i,"selx-hoathan"],[/(thắng trận|khải hoàn)/i,"selx-thangtran"]];
/* review/art-event (ART-EVENT, owner 25/11: the thbirthday banquet too busy behind the dialogue on iPad): an event whose own band picture is too busy for a stage gets a calm painted stage by its PEND id (Q item pid) */
const KIT_EVBG_PID={thbirthday:"ev-bg-thanhtho-calm",adStroll:"ev-bg-vuon-calm",cmTt:"ev-bg-tamthat-calm",rcvHelp:"ev-bg-tamthat-calm",cmLand:"ev-bg-hanhlang-calm",cmTd:"ev-bg-tangia-calm"};/* ART-EVENT2: quiet talks get a calm place picture (no people, open centre) instead of the busy ev-yen-tiec band: garden path · her side chamber · corridor · Tân Giả khố yard */
function kitEvBg(m){try{const ok=src=>{try{return typeof KIT_CDNHAVE!=="undefined"&&!!KIT_CDNHAVE&&KIT_CDNHAVE.has(String(src).replace(/^.*?(?=img\/)/,""))}catch(e){return false}};/* the CDN index (jevban KIT_CDNHAVE): a key not published yet = not used */if(m&&m.bg){const s=/\//.test(m.bg)?m.bg:"img/"+m.bg+".webp";if(ok(s))return s}
 if(m&&m.pid&&KIT_EVBG_PID[m.pid]){const s="img/"+KIT_EVBG_PID[m.pid]+".webp";if(ok(s))return s}
 const t=String(m&&(m.t||m.title)||"").replace(/<[^>]+>/g," ");for(const [re,k] of KIT_EVBG)if(re.test(t)){const s="img/"+k+".webp";if(ok(s))return s}}catch(e){}return""}
/* KK36 (MAIN 151 look of 893613ee, «Tin báo» Fold flat dark brown; law 11 = every stage caller): no event picture → the painting of the place she is in
   right now (the same #scimg picture the home stage shows: SCIMG[placeOf(S.place).sc], season × buổi via scnSync); the flat kit colour is never shown */
function kstgPlacePic(){try{if(typeof scnSync==="function")scnSync();const P=typeof placeOf==="function"&&S?placeOf(S.place):null;const f=P&&typeof SCIMG==="object"&&(SCIMG[P.sc]||SCIMG.rv);if(f)return "img/"+f+".webp"}catch(e){}
 try{const s=getComputedStyle(document.getElementById("scimg")).backgroundImage||"";const u=/url\(["']?([^"')]+)/.exec(s);if(u)return u[1]}catch(e){}return""}
function kstgPic(dl){try{const m=typeof Q!=="undefined"&&Q[0];const k=kitEvBg(m);if(k)return k;const im=dl.querySelector(".k3ev img,.kdlgart img,.kpiart img,.k3mpic img");return im&&(im.currentSrc||im.src)||kstgPlacePic()}catch(e){return kstgPlacePic()}}
try{window.kitEvBg=kitEvBg;window.KIT_EVBG=KIT_EVBG;window.KIT_EVBG_PID=KIT_EVBG_PID}catch(e){}
/* the two full figures of the stage (made once per dialog): the SPEAKER = the frame's speaker (Q item .who; else the frame's figure picture), with
   the frame's own name tag; HER = kitFigOf(S) (right tier / age band / dress), unless she is the speaker */
function kstgFig(mb,cls,src,tagHTML){const grey=!!src&&typeof KIT_GREYSRC!=="undefined"&&KIT_GREYSRC.test(src);if(grey)src="";/* KK36: the grey stand-in (§59.1 silhouette) never stands on the stage */
 let f=mb.querySelector(":scope>."+cls);if(f){const im=f.querySelector("img");if(im&&src&&im.getAttribute("src")!==src){f.style.visibility="hidden";f.classList.remove("kstg-nofig");im.src=src;const sh=()=>{if(!(mb.closest(".dlg")||{}).__kstHold)f.style.visibility=""};(im.decode?im.decode().then(sh,()=>f.classList.add("kstg-nofig")):sh())}if(grey){f.remove();return null}return f}if(!src)return null;
 f=document.createElement("div");f.className="kstg-fig "+cls;f.setAttribute("aria-hidden","true");const im=document.createElement("img");im.alt="";im.decoding="async";im.crossOrigin="anonymous";im.src=src;f.appendChild(im);
 if(tagHTML){const tg=document.createElement("div");tg.className="kt3";tg.innerHTML=tagHTML;f.appendChild(tg)}if(mb.closest(".dlg")&&mb.closest(".dlg").__kstHold)f.style.visibility="hidden";mb.appendChild(f);return f}
function kstgFigs(dl,mb){try{const m=typeof Q!=="undefined"&&Q&&Q[0]||null;let who=m&&m.who&&typeof m.who==="object"?m.who:null;
 /* KK36 (vlnvp: the speaker slot showed HER): a FACE object (pEunCourt / pMaid style {src,nm}) is resolved to the real person it names (kitWhoPerson, jksize) — his own figure + tag */
 let own="";if(who&&who.src&&!who.kind){const r=typeof kitWhoPerson==="function"?kitWhoPerson(who):who;if(r&&r!==who&&!(r.src&&!r.kind)){who=r;try{const d=document.createElement("div");d.innerHTML=kszFigHtml(r);const k=d.querySelector(".kt3");own=k?k.innerHTML:""}catch(e){}}else who=null}
 const old=mb.querySelector(".kszfig");
 let src="";try{if(who&&who!==S&&typeof kitFigOf==="function")src=kitFigOf(who)}catch(e){}if(!src){const im=old&&old.querySelector("img");src=im&&(im.getAttribute("src")||"")||""}
 const tg=old&&old.querySelector(".kt3");kstgFig(mb,"kstg-sp",who===S?"":src,own||(tg?tg.innerHTML:""));
 let me="",me2skip=0;try{me=typeof kitFigOf==="function"?kitFigOf(S):(typeof figFor==="function"?figFor(S):"")}catch(e){}{const pk0=kstgPickWants();let sp0=mb.querySelector(":scope>.kstg-sp");const sq=s=>String(s||"").replace(/^.*img\//,"");if(sp0&&me&&sq((sp0.querySelector("img")||{}).getAttribute&&sp0.querySelector("img").getAttribute("src"))===sq(me)){sp0.remove();sp0=null}/* KK36 dedupe first: a «speaker» that is HER is no speaker */if(pk0||(!kstgTalkWants(dl)&&sp0))me2skip=1}if(!me2skip)kstgFig(mb,"kstg-me",me,"");
 /* KK36 (STG scan: 12 story frames tt1–3, td1, nc1, ge1, prep, phoenix, thInv, vl* had HER on both sides): a frame with no other speaker keeps only HER figure */
 const sp=mb.querySelector(":scope>.kstg-sp"),spi=sp&&sp.querySelector("img"),strip=s=>String(s||"").replace(/^.*img\//,"");if(sp&&spi&&me&&strip(spi.getAttribute("src"))===strip(me))sp.remove();
 /* §102.7 ONE FIGURE (owner OD 26/11 ~18:55Z «Mình chỉ cần một người đứng ở đó lúc đó là được rồi. 2 người xuất hiện chỉ khi nào mà đó là cuộc hội thoại giữa 2 người»):
    only a DIALOGUE (§102.2, kstgTalkWants) has two figures; any other stage keeps ONE — the speaker when there is one (her figure never walks in), else her.
    A thẻ gỗ place card (§102.3, kind "pick") has no figure at all: the place painting + its signpost. */
 const two=kstgTalkWants(dl),pk=kstgPickWants(),sp2=mb.querySelector(":scope>.kstg-sp"),me2=mb.querySelector(":scope>.kstg-me");
 /* §102.7 NO FIGURE ON AN EVENT STAGE (owner OD 26/11 ~22:07Z, verbatim: "những cái khung sự kiện thế này là mình bỏ cái hình nhân vật luôn, mình chỉ để cái nền của sự kiện cho nó đẹp thôi, rồi sau đó hiện mấy cái lá bài và cái khung thông tin ở trên"; CANON OVERWRITE of «one figure»):
    a Bàn bài / thẻ gỗ event stage = the event background + the cards + the info box; figures stand only in a DIALOGUE (§102.2, two people talking). */
 if(!two){if(sp2)sp2.remove();if(me2)me2.remove()}}catch(e){console.error("kstgFigs",e)}}
/* §102.3 kind "pick" (KIT §101.9 kitKind): the frame's choices are THẺ GỖ TREO on the stage, never a hand */
function kstgPickWants(){try{return typeof kitKind==="function"&&typeof Q!=="undefined"&&kitKind(Q[0])==="pick"}catch(e){return false}}
/* the painted part of a figure picture (opaque box, §93.2 kscnOpaque) — cached per picture */
const KST_OB=new Map();function kstgOb(im){try{const k=im&&(im.currentSrc||im.src);if(!k)return null;if(KST_OB.has(k))return KST_OB.get(k);if(!im.complete||!im.naturalWidth)return null;const o=typeof kscnOpaque==="function"?kscnOpaque(im):{l:0,r:1,t:0,b:1};KST_OB.set(k,o);return o}catch(e){return null}}
/* turn the dialog into the stage (classes + background + her figure); idempotent */
function kstgOn(dl,g){try{if(!kstgWants(dl,g))return false;const M=document.getElementById("modal"),mb=dl.querySelector(":scope>#mb");if(!mb)return false;
 const G=kstgGeo();dl.style.setProperty("--kstL",G.L+"px");dl.style.setProperty("--kstT",G.t+"px");dl.style.setProperty("--kstW",G.w+"px");dl.style.setProperty("--kstH",G.H+"px");
 if(M)M.classList.add("kstg");document.body.classList.add("kscn-on");if(M&&M.__kstFresh){M.__kstFresh=0;dl.__kstNew=1}/* every open (a reopened dialog keeps its own classes, the layer's are reset on close) */
 if(!dl.classList.contains("kstage")||!dl.querySelector(":scope>.kstg-bg")){dl.classList.add("kstage");
  const bg=document.createElement("div");bg.className="kstg-bg";const v=document.createElement("div");v.className="kstg-veil";dl.prepend(v);dl.prepend(bg);dl.__kstNew=1}
 const bg=dl.querySelector(":scope>.kstg-bg"),pic=kstgPic(dl);if(bg&&pic&&bg.dataset.src!==pic){bg.dataset.src=pic;const pl=kstgPlacePic();/* KK36: the place painting lies UNDER the event picture — while the event picture is still on its way the stage shows the place she is in, never the flat colour */bg.style.backgroundImage=`url("${pic}")`+(pl&&pl!==pic?`, url("${pl}")`:"")}
 kstgFigs(dl,mb);return true}catch(e){console.error("kstgOn",e);return false}}
/* place the figures, the speech box and the hand inside the layer (px, layer-local) */
function kstgPlace(dl){try{if(!dl||!dl.classList.contains("kstage"))return;const K=KIT_STAGE,ip=(()=>{try{return kitView().pages===2?1:0}catch(e){return document.documentElement.classList.contains("kv2")?1:0}})();
 const W=dl.clientWidth,H=dl.clientHeight;if(!W||!H)return;const mb=dl.querySelector(":scope>#mb"),g=mb&&mb.querySelector(".opts.khand");if(!g)return;
 const hd=dl.querySelector(":scope>.kph"),sl=dl.querySelector(":scope>.kseal");const T0=(hd&&hd.getClientRects().length?hd.offsetTop+hd.offsetHeight:K.pad)+6;
 if(sl){sl.style.setProperty("right",K.pad+"px","important");sl.style.setProperty("left","auto","important");sl.style.setProperty("top",K.pad+"px","important")}
 const tk=kstgTalkOn(dl,g),hH=tk?0:(g.offsetHeight||parseFloat(getComputedStyle(g).getPropertyValue("--khH"))||0),handTop=H-4-hH;
 const figBot=Math.min(H-4,handTop+Math.round(hH*K.feetIn));let fh=Math.max(120,Math.round((figBot-T0)*K.fig[ip])),fy=figBot-fh;
 const sp=mb.querySelector(":scope>.kstg-sp"),me=mb.querySelector(":scope>.kstg-me");let faceBot=T0,midL=K.pad,midR=W-K.pad;
 const put=(el,side)=>{if(!el)return;const im=el.querySelector("img");const nw=im&&im.naturalWidth||420,nh=im&&im.naturalHeight||1000,ob=kstgOb(im)||{l:.08,r:.92,t:.02,b:1};
  const fw=Math.round(fh*nw/nh);/* the painted part sits fully inside the layer; speaker hugs the left edge, she the right */
  let fx=side<0?Math.round(K.pad-ob.l*fw):Math.round(W-K.pad-ob.r*fw);el.style.setProperty("--fx",fx+"px");el.style.setProperty("--fy",fy+"px");el.style.setProperty("--fw",fw+"px");el.style.setProperty("--fh",fh+"px");
  const top=fy+ob.t*fh;el.style.setProperty("--tagy",Math.max(T0+16-fy,Math.round(ob.t*fh-2))+"px");faceBot=Math.max(faceBot,Math.round(top+K.faceK*fh*(ob.b-ob.t)));
  if(side<0)midL=Math.max(midL,Math.round(fx+ob.r*fw)+6);else midR=Math.min(midR,Math.round(fx+ob.l*fw)-6)};
 const pm=mb.querySelector(".kpmain");const fm=document.documentElement.dataset.kstfold||K.fold;
 try{const nm=e=>((e&&e.textContent)||"").replace(/\s+/g," ").trim();const tags=[sp,me].map(f=>nm(f&&f.querySelector(".kt3"))).filter(Boolean);if(pm)pm.querySelectorAll(":scope>.faces>figure").forEach(f=>{const t=nm(f.querySelector("figcaption"))||nm(f);f.classList.toggle("kstg-dup",!!t&&tags.some(x=>x===t||x.replace(/\s/g,"")===t.replace(/\s/g,"")))})}catch(e){}
 const box=(bx,by,bw,bh)=>{pm.style.setProperty("--bx",bx+"px");pm.style.setProperty("--by",by+"px");pm.style.setProperty("--bw",bw+"px");pm.style.setProperty("--bh",bh+"px");dl.__kstBox={bx,by,bw,bh}};
 /* one page, «top»: the slim band goes first under the plaque; the figures stand from under it to the hand (their faces never under the band) */
 if(pm&&!ip&&fm==="top"){const bw=Math.min(K.boxMaxW[ip],W-2*K.pad-8),bx=Math.round((W-bw)/2),cap=Math.round(H*K.topCap);box(bx,T0,bw,cap);const bb=T0+Math.min(cap,pm.offsetHeight)+6;
  fh=Math.max(120,figBot-bb);fy=figBot-fh;put(sp,-1);put(me,1);pm.classList.add("kstg-top");pm.classList.remove("kstg-foot")}
 else{put(sp,-1);put(me,1);
 if(pm){let bx,bw,by;const roomMid=midR-midL;pm.classList.remove("kstg-top","kstg-foot");
  if(roomMid>=K.midMin){bw=Math.min(K.boxMaxW[ip],roomMid);bx=Math.round(midL+(roomMid-bw)/2);by=T0+(ip?10:6);box(bx,by,bw,Math.max(90,handTop-by-10))}/* between the two figures, beside their faces */
  else{/* one page, «foot»: a slim subtitle band just above the hand, over the figures' LOWER half only (faces + upper bodies stay clear); long text scrolls inside */
   bw=Math.min(K.boxMaxW[ip],W-2*K.pad-8);bx=Math.round((W-bw)/2);const lim=Math.round(Math.max(faceBot+6,fy+fh*K.bodyK)),bot=handTop-6,bh=Math.max(90,bot-lim);box(bx,lim,bw,bh);
   const h=Math.min(bh,pm.offsetHeight);box(bx,bot-h,bw,bh);pm.classList.add("kstg-foot")}}}
 dl.__kstFace=faceBot;dl.__kstHandTop=handTop;if(tk)kstgTalkPlace(dl,{W,H,ip,T0,faceBot,midL,midR,sp,me});
 if(dl.__kstNew){dl.__kstNew=0;kstgIn(dl)}}catch(e){console.error("kstgPlace",e)}}
/* entrance: picture settles, speaker in from the left, she from the right, the speech box drops in (cards: kitHand deal) */
function kstgIn(dl){try{const still=typeof kitHandStill==="function"&&kitHandStill();const mb=dl.querySelector(":scope>#mb");if(!mb)return;
 /* the frame's layout passes may rebuild the body in the first frames: the figures are looked up when the entrance starts, never captured early */
 const figsNow=()=>[...mb.querySelectorAll(":scope>.kstg-fig")];figsNow().forEach(f=>f.style.visibility="hidden");dl.__kstHold=1;
 /* smooth (MD4 lesson): nobody walks in half-painted — the figures wait (hidden) until their pictures are decoded, at most KIT_HAND.readyMs */
 const ims=()=>figsNow().map(f=>f.querySelector("img")).filter(Boolean),cap=(typeof KIT_HAND!=="undefined"&&KIT_HAND.readyMs)||700;
 /* KK36 (MAIN 151 look, figure-wait family): no cap — a figure shows ONLY once its painting is decoded (a slow network never shows a half-painted
    or grey figure); a picture that fails stays hidden (kstg-nofig) */
 const dec=i=>!i.decode?Promise.resolve(i.complete&&i.naturalWidth>0):i.decode().then(()=>i.naturalWidth>0,()=>false);void cap;
 const ready=new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))).then(()=>Promise.all(ims().map(i=>dec(i).then(ok=>{if(!ok)try{i.parentNode.classList.add("kstg-nofig")}catch(e){}}))));
 const pm=mb.querySelector(".kpmain");if(pm&&!still)pm.animate([{transform:"translateY(-14px)",opacity:0},{transform:"none",opacity:1}],{duration:KIT_STAGE.inMs[2],delay:380,easing:"ease-out",fill:"backwards"});
 ready.then(()=>{dl.__kstHold=0;try{kstgPlace(dl)}catch(e){}const F=figsNow().filter(f=>!f.classList.contains("kstg-nofig"));F.forEach(f=>f.style.visibility="");if(still)return;const [a,b]=KIT_STAGE.inMs,E="cubic-bezier(.2,.8,.3,1)";
  const bg=dl.querySelector(":scope>.kstg-bg");if(bg)bg.animate([{transform:"scale(1.05)"},{transform:"none"}],{duration:900,easing:"ease-out"});
  const sp=mb.querySelector(":scope>.kstg-sp"),me=mb.querySelector(":scope>.kstg-me");
  if(sp)sp.animate([{transform:"translateX(-36%)"},{transform:"none"}],{duration:a,easing:E,fill:"backwards"});
  if(me)me.animate([{transform:"translateX(30%)"},{transform:"none"}],{duration:b,delay:160,easing:E,fill:"backwards"})})}catch(e){}}
/* the ENLARGED card on the stage (KIT §101.10 no flip, one part with the hand): in the centre under the faces band; the story box ends above it */
function kstgPlate(b){try{const g=b.parentElement,dl=g&&g.closest(".dlg.kstage");if(!dl)return;const z=dl.querySelector(":scope>.khplate");if(!z||z.hidden)return;
 const D=dl.getBoundingClientRect();const top0=D.top+(dl.__kstFace||0)+4;if(typeof kitHandBigPlace==="function")kitHandBigPlace(b,z,dl,top0,D.left+8,D.right-8);
 /* the story box beside the faces (iPad) never runs under the enlarged card: it ends above its top and shows its LAST lines (MAIN 147 look; KK34) */
 const pm=dl.querySelector(".kpmain:not(.kstg-foot):not(.ksay)");if(pm&&dl.__kstBox&&z.__khRect){const pt=z.__khRect.t-8,bh=Math.max(60,Math.round(pt-dl.__kstBox.by));if(dl.__kstBox.by+pm.offsetHeight>pt){pm.style.setProperty("--bhL",bh+"px");requestAnimationFrame(()=>{pm.scrollTop=pm.scrollHeight})}else pm.style.removeProperty("--bhL")}}catch(e){console.error("kstgPlate",e)}}
(function(){if(typeof kitHandLay!=="function")return;const L0=kitHandLay;
 kitHandLay=function(g,quiet){let dl=null;try{dl=g&&g.closest&&g.closest(".dlg");if(dl&&kitHandWants(g))kstgOn(dl,g)}catch(e){}
  const r=L0.call(this,g,dl&&dl.classList.contains("kstage")?true:quiet);/* the stage owns the frame: the frame-fit passes (kszEvLaw10 / kszTextFirst3) do not run on it */
  try{if(dl&&dl.classList.contains("kstage")){if(!kstgWants(dl)){kstgOff(dl)}else{kstgPlace(dl);const L=g.querySelector(":scope>button.klift");if(L)kstgPlate(L)}}}catch(e){}return r};window.kitHandLay=kitHandLay;
 if(typeof kitHandPlate==="function"){const P0=kitHandPlate;kitHandPlate=function(b){const r=P0.apply(this,arguments);kstgPlate(b);return r};window.kitHandPlate=kitHandPlate}})();
/* COOP-QCARD (RV-173, law 11): body.kscn-on has TWO owners — this stage (a #modal dialog drawn as a stage) and the kit scene layer (kitScene, jkitsel
   §93: the selection days, the ring screens). The stage dropped it whenever #modal was hidden or repainted, even while a kit scene was still playing:
   the mood seal (.kemo-big) popped over the scene and every check that reads «a scene is up» (body.kscn-on) saw none. The stage now lets it go only
   when no kit scene is open. */
function kstgScnOff(){try{if(typeof kitScene==="object"&&kitScene&&kitScene.cur)return;document.body.classList.remove("kscn-on")}catch(e){}}
function kstgOff(dl){try{dl.classList.remove("kstage","kstalk","kspick");if(dl.__kstT){try{dl.__kstT.P&&dl.__kstT.P.destroy()}catch(e){}dl.__kstT=null}/* KK35: a talk's thẻ gỗ never outlive the stage */["--kstL","--kstT","--kstW","--kstH"].forEach(p=>dl.style.removeProperty(p));dl.querySelectorAll(":scope>.kstg-bg,:scope>.kstg-veil,:scope>#mb>.kstg-fig").forEach(e=>e.remove());
 const M=document.getElementById("modal");if(M)M.classList.remove("kstg");kstgScnOff()}catch(e){}}
/* a closed / replaced dialog leaves no stage classes behind (the next frame decides again) */
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){try{const M=document.getElementById("modal");if(M){if(M.hidden)M.__kstFresh=1;M.classList.remove("kstg");kstgScnOff()}}catch(e){}return s0.apply(this,arguments)};window.showModal=showModal;
 let t=0;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(()=>{document.querySelectorAll("#modal .dlg.kstage").forEach(dl=>{kstgOn(dl);const g=dl.querySelector(".opts.khand");if(g){g.__khSig="";kitHandLay(g,true)}})},140)})})();
(function(){const M=document.getElementById("modal");if(!M||typeof MutationObserver!=="function")return;new MutationObserver(()=>{if(M.hidden){M.classList.remove("kstg");kstgScnOff()}}).observe(M,{attributes:true,attributeFilter:["hidden"]})})();
/* ===== §102.2 DIALOGUE ON THE STAGE (owner 25/11 ~22:00Z «làm luôn cái khung sự kiện đối thoại. Là đối thoại xong rồi có các cái option chọn bằng cái thẻ gỗ»;
   24/11 ~15:15Z: odds choices = cards (đỏ đen), a talk between people = the conversation look: speaker left, her answers right).
   ONE rule: a stage frame whose choices carry NO odds (no kit odds meter on any card; Q item talk:1 / talk:0 overrides) is a DIALOGUE:
   - no panel: the story lines are spoken ONE at a time in a small speech bubble — a line of hers (.kfme) on HER side (tail to the right),
     every other line on the speaker's side (tail to the left); tap the stage = next line (after the last, a tap starts again: she can re-read);
   - Fold (one page): the bubble is a slim subtitle at the foot (over the legs, never a face or an upper body); iPad: between the two figures;
   - after the last line her answers drop as THẺ GỖ TREO (kitPick §98) beside HER, low (waist → feet), at most 3 per page (tabs «Đáp · 1/2/3»);
     tap = lift + line, green ✓ = choose (the frame's own card is chosen: same chooseM path), ✕ = put back.
   The hand cards stay in the DOM (hidden) as the data + choose path; nothing else changes. */
function kstgTalkWants(dl,g){try{const m=typeof Q!=="undefined"&&Q[0];if(m&&m.talk===0)return false;if(m&&(m.talk===1||KIT_STAGE.talkIds.includes(m.pid)))return true;
 return false/* only the events MAIN marked (KIT_STAGE.talkIds / Q item talk:1): a card frame with no odds word (certain outcomes, KIT_ODDS_SURE off) stays a hand (KK34) */}catch(e){return false}}
function kstgTalkOn(dl,g){try{if(!dl.classList.contains("kstage"))return false;const pk=kstgPickWants(),on=pk||kstgTalkWants(dl,g);dl.classList.toggle("kstalk",on);dl.classList.toggle("kspick",pk&&on);if(!on){if(dl.__kstT){try{dl.__kstT.P&&dl.__kstT.P.destroy()}catch(e){}dl.__kstT=null}return false}
 /* the talk state lives on the Q item (a re-render of the frame makes a new .dlg: the line she reached and the open plaques stay) */
 const m=typeof Q!=="undefined"&&Q[0]||null;if(m){if(!m.__kstT)m.__kstT={i:0,asked:false,P:null};if(dl.__kstT!==m.__kstT){const o=dl.__kstT;dl.__kstT=m.__kstT;if(o&&o.P&&o!==m.__kstT)try{o.P.destroy()}catch(e){}if(dl.__kstT.P&&dl.__kstT.P.host!==dl){try{dl.__kstT.P.destroy()}catch(e){}dl.__kstT.P=null;dl.__kstT.sig=""}}}else if(!dl.__kstT)dl.__kstT={i:0,asked:false,P:null};
 if(!dl.__kstL){dl.__kstL=1;dl.addEventListener("click",e=>{try{const t=e.target;if(!dl.__kstT||!dl.classList.contains("kstalk"))return;if(t.closest(".kpk,.khconf,.kph,.kseal,button"))return;if(dl.classList.contains("kspick"))return;kstgTalkNext(dl)}catch(x){}})}
 if(pk&&dl.__kstT)dl.__kstT.asked=true;/* §102.3: the plaques hang at once (no lines to step through) */
 return true}catch(e){return false}}
function kstgLines(dl){return[...dl.querySelectorAll(".kpmain .kfacts>.kfact")].filter(x=>(x.textContent||"").trim())}
function kstgTalkShow(dl){const T=dl.__kstT,L=kstgLines(dl);if(!T||!L.length)return;T.i=Math.min(T.i,L.length-1);L.forEach((x,k)=>x.classList.toggle("kson",k===T.i));
 const pm=dl.querySelector(".kpmain");if(pm){const me=L[T.i].classList.contains("kfme");pm.classList.toggle("ksay-me",me);pm.classList.toggle("ksay-sp",!me);pm.classList.toggle("ksay-more",T.i<L.length-1||!T.asked)}}
function kstgTalkNext(dl){const T=dl.__kstT,L=kstgLines(dl);if(!T||!L.length)return;if(T.i<L.length-1)T.i++;else{if(!T.asked){T.asked=true;kstgTalkPlace(dl);return}T.i=0}
 kstgTalkShow(dl);kstgTalkPlace(dl);const pm=dl.querySelector(".kpmain");if(pm&&!(typeof kitHandStill==="function"&&kitHandStill()))pm.animate([{opacity:.2,transform:"translateY(4px)"},{opacity:1,transform:"none"}],{duration:180,easing:"ease-out"})}
function kstgTalkPlace(dl,c){try{if(dl.classList.contains("kspick"))return kstgPickPlace(dl,c);const T=dl.__kstT;if(!T)return;const pm=dl.querySelector(".kpmain");if(!pm)return;c=c||dl.__kstC;if(!c)return;dl.__kstC=c;const K=KIT_STAGE,{W,H,ip}=c;
 kstgTalkShow(dl);pm.classList.add("ksay");pm.classList.remove("kstg-foot","kstg-top");
 /* bubble geometry: Fold = foot subtitle, iPad = between the figures beside the faces */
 let bw,bx,by;const side=!!(ip&&c.midR-c.midL>=K.midMin);pm.classList.toggle("ksay-side",side);if(side){bw=Math.min(K.sayW,c.midR-c.midL);bx=Math.round(c.midL+(c.midR-c.midL-bw)/2);pm.style.setProperty("--bw",bw+"px");pm.style.setProperty("--bh",Math.round(H*.36)+"px");pm.style.setProperty("--bx",bx+"px");by=Math.round(c.faceBot-12);pm.style.setProperty("--by",by+"px")}
 else{bw=Math.min(K.boxMaxW[ip],W-2*K.pad-8);bx=Math.round((W-bw)/2);pm.style.setProperty("--bw",bw+"px");pm.style.setProperty("--bh",Math.round(H*.24)+"px");pm.style.setProperty("--bx",bx+"px");const h=pm.offsetHeight;by=H-10-h;pm.style.setProperty("--by",by+"px")}
 const tail=pm.classList.contains("ksay-me")?(c.me?.6:.5):.22;pm.style.setProperty("--ktail",Math.round(bw*(pm.classList.contains("ksay-me")?.78:.16))+"px");
 if(T.asked)kstgTalkAsk(dl,{bx,by,bw,bh:pm.offsetHeight,ip,W,H})}catch(e){console.error("kstgTalkPlace",e)}}
function kstgTalkAsk(dl,B,A0){try{if(typeof kitPick==="undefined")return;const T=dl.__kstT,g=dl.querySelector(".opts.khand");if(!g)return;const bs=kitHandCards(g);
 const me=dl.querySelector("#mb>.kstg-me"),im=me&&me.querySelector("img");const D=dl.getBoundingClientRect();let A;
 if(A0)A=A0;else if(me){const r=me.getBoundingClientRect(),ob=kstgOb(im)||{l:.1,r:.9,t:.02,b:1};A={x:r.left-D.left+ob.l*r.width,y:r.top-D.top+ob.t*r.height,w:(ob.r-ob.l)*r.width,h:(ob.b-ob.t)*r.height}}else A={x:B.W*.62,y:B.H*.15,w:B.W*.3,h:B.H*.7};
 if(!B.ip&&!A0){A.h=Math.max(120,Math.min(A.h,B.by-8-A.y))}/* Fold: the plaques hang above the foot subtitle */
 const acts=bs.map((b,i)=>{const kan=b.querySelector(".kan");const kc=kan?kan.cloneNode(true):null;if(kc)kc.querySelectorAll(".kodds,.khnx,small,.kb,.kwhy,.md,img,.kitmk").forEach(e=>e.remove());const n=((kc&&kc.textContent)||"").replace(/\s+/g," ").trim()||kitOptPlain(b.textContent);const im2=b.querySelector(".kaart img");const ton=b.querySelector(".kr-ton .krv");const why=b.querySelector(".kwhy");
  const ow=b.querySelector(".kodds .kow,.kodds b,.kodds");const wd=((b.querySelector(".kodds")||{}).textContent||"").match(new RegExp(KIT_ODDS.slice().sort((x,y)=>y.length-x.length).join("|")));/* the odds word only on a real roll (a certain answer has no .kodds, KIT_ODDS_SURE off) */return {id:String(i),n,word:wd?wd[0]:"",pic:im2&&(im2.getAttribute("src")||""),ton:ton&&!/^(không|—|-)?$/i.test(ton.textContent.trim())?ton.textContent.trim():"",off:!!b.disabled,why:why&&why.textContent.trim()||""}});
 const pk=!!A0,per=Math.max(acts.length,1)/* owner 26/11 ~21:25Z + MAIN 164 ruling: NO paging of thẻ gỗ either — every answer (≤ 7, KIT_HAND.max, cut at the source) hangs at once */,groups=[];for(let i=0;i<acts.length;i+=per)groups.push({k:"p"+(i/per),n:acts.length>per?`${pk?"Việc":"Đáp"} · ${i/per+1}`:"",acts:acts.slice(i,i+per)});
 const sig=acts.map(a=>a.n).join("|")+"|"+Math.round(A.x)+","+Math.round(A.y)+","+Math.round(A.h);if(T.P&&T.P.open&&T.sig===sig)return;const grp=T.P&&T.P.group;try{T.P&&T.P.destroy()}catch(e){}T.sig=sig;
 const sp=dl.querySelector("#mb>.kstg-sp");const av=[];if(sp){const r=sp.getBoundingClientRect();av.push({x:r.left-D.left,y:r.top-D.top,w:r.width,h:r.height})}
 T.P=kitPick.open({host:dl,anchor:A,side:pk?"r":"l",groups,group:grp||groups[0].k,dismiss:false,avoid:av,noLap:false,
  onPick:(id)=>{const b=bs[+id];if(!b||b.disabled)return;const P=T.P;T.P=null;try{P.destroy()}catch(e){}b.click()},
  onOff:(a)=>{}})}catch(e){console.error("kstgTalkAsk",e)}}
/* §102.3 THẺ GỖ AT THE PLACE (kind "pick": the place card KIT 32.8 — Đi tới / Xin bái kiến / Xin yết kiến / Lẻn vào / greeting / last walk; OD 26/11 ~19:00Z, KK44 row «place card»):
   the place painting fills the stage (kstgPic = the card's place picture), no figure (§102.7), the place lines (Chủ vị · Đường đi · Còn · Bóng người · Giờ + the card's own lines)
   in the light story box — iPad: a left column; Fold: a band under the title plaque — and the card's choices hang as THẺ GỖ TREO (kitPick §98.1) on a signpost beside the box
   (iPad: right of the column; Fold: under the band), at most KIT_PLAQUE.max per page («Việc · 1/2»); ✓ = the card's own button is chosen (same chooseM path). */
function kstgPickPlace(dl,c){try{const T=dl.__kstT,pm=dl.querySelector(".kpmain");if(!T||!pm||!c)return;dl.__kstC=c;const K=KIT_STAGE,{W,H,ip,T0}=c;pm.classList.remove("ksay","kstg-foot","kstg-top","ksay-me","ksay-sp","ksay-more","ksay-side");
 const set=(bx,by,bw,bh)=>{pm.style.setProperty("--bx",bx+"px");pm.style.setProperty("--by",by+"px");pm.style.setProperty("--bw",bw+"px");pm.style.setProperty("--bh",bh+"px");dl.__kstBox={bx,by,bw,bh}};
 let A;if(ip){const bw=Math.min(K.boxMaxW[ip],Math.round(W*K.pickCol)),bx=K.pad+4,by=T0+10;set(bx,by,bw,H-by-K.pad);A={x:bx+bw+K.pickGap,y:by,w:8,h:H-by-K.pad*2}}
 else{const bw=Math.min(K.boxMaxW[ip],W-2*K.pad-8),bx=Math.round((W-bw)/2),by=T0+4;set(bx,by,bw,Math.round(H*K.pickBand));const bb=by+Math.min(Math.round(H*K.pickBand),pm.offsetHeight)+K.pickGap;A={x:K.pad+4,y:bb,w:8,h:Math.max(140,H-bb-K.pad*2)}}
 if(T.asked)kstgTalkAsk(dl,{ip,W,H,by:H},A)}catch(e){console.error("kstgPickPlace",e)}}
(function(){try{const st=document.createElement("style");st.id="kit-stage-talk";const P="html body #modal#modal#modal#modal#modal.kstg .dlg.kstage.kstalk";st.textContent=`
${P} .opts.khand{visibility:hidden!important;pointer-events:none!important}
${P}>.khplate,${P}>.khconf{display:none!important}
${P} .kpmain.ksay{overflow-y:auto!important;padding:10px 16px 12px!important;border-radius:16px!important;background:#fffaf0f0!important;border:1px solid #b8901f88!important;box-shadow:0 3px 12px rgba(0,0,0,.22)!important;cursor:pointer;overflow:visible!important}
${P} .kpmain.ksay>.faces{display:none!important}
${P} .kpmain.ksay .kfacts>.kfact{display:none!important;border:0!important;margin:0!important;padding:0!important}
${P} .kpmain.ksay .kfacts>.kfact.kson{display:block!important;font-size:1.02rem;line-height:1.45}
${P} .kpmain.ksay::before{content:"";position:absolute;left:var(--ktail,30px);top:-11px;width:18px;height:18px;background:inherit;border-left:1px solid #b8901f88;border-top:1px solid #b8901f88;transform:rotate(45deg);border-radius:3px 0 0 0}
${P} .kpmain.ksay.ksay-side::before{top:22px;left:-10px;border-top:0;border-bottom:1px solid #b8901f88}
${P} .kpmain.ksay.ksay-side.ksay-me::before{left:auto;right:-10px;border-left:0;border-right:1px solid #b8901f88;border-bottom:0;border-top:1px solid #b8901f88}
${P} .kpmain.ksay.ksay-more::after{content:"▸";position:absolute;right:10px;bottom:2px;font-size:.9rem;color:#9a6a1c;animation:kstg-blink 1.1s ease-in-out infinite alternate}
@keyframes kstg-blink{from{opacity:.35}to{opacity:1}}
${P} .kpk{z-index:9}`;document.head.appendChild(st)}catch(e){}})();
try{window.KIT_STAGE=KIT_STAGE;window.kstgOn=kstgOn;window.kstgPlace=kstgPlace;window.kstgWants=kstgWants;window.kstgPickWants=kstgPickWants}catch(e){}
/* KIT §102.6 ROOM PICTURE NEVER EMPTY (KK38, MAIN 153 / RV-OB-NGOAICUNG 26/11 06:17Z: iPad Khuê phòng from buổi chiều showed a FLAT GREY box while the next room
   picture loaded). Whole family = the one room backdrop #scimg (renderStage is its only writer; the Pixi copy in j11 keeps its old sprite until the new one is drawn)
   + the event / scene pictures (§102 a: the place painting lies under them). Here: when #scimg gets a picture that is not decoded yet, the PREVIOUS painting stays
   under it as a second CSS layer until the new one is decoded; then only the new one is left. Readers of #scimg take the FIRST url = the new picture. */
(function(){try{const im=document.getElementById("scimg");if(!im||typeof MutationObserver!=="function")return;let last="",pend=null;const url=v=>{const m=/url\(["']?([^"')]+)["']?\)/.exec(v||"");return m?m[1]:""},two=v=>/\)\s*,\s*url\(/.test(v||"");
 const lay=()=>{if(pend)im.style.backgroundImage=`url("${pend.u}"), url("${pend.prev}")`};
 new MutationObserver(()=>{const v=im.style.backgroundImage||"",u=url(v);if(!u){last="";pend=null;return}
  if(u===last){if(pend&&pend.u===u&&!two(v))lay();/* a re-render wrote the single picture again while it is still loading */return}
  const prev=last;last=u;pend=null;if(!prev||two(v))return;
  const I=new Image();I.src=u;if(I.complete&&I.naturalWidth)return;
  pend={u,prev};lay();
  const done=()=>{if(!pend||pend.u!==u)return;pend=null;if(url(im.style.backgroundImage)===u)im.style.backgroundImage=`url("${u}")`};
  (I.decode?I.decode():Promise.reject()).then(done,()=>{if(I.complete)done();else{I.onload=done;I.onerror=done}})}).observe(im,{attributes:true,attributeFilter:["style"]})}catch(e){console.error("kstgScimgKeep",e)}})();

/* KIT §95.4 K-SRV-OWNFIG (KK63, RV-177 FAIL-1 nhv-areas): figFor maps a servant-shaped Emperor / Thái y to the real person (kitFigWho, j28) before any
   implementation sees it — a late wrapper because j39 / j88 replace figFor's whole body after j28. */
(function(){if(typeof figFor!=="function"||typeof kitFigWho!=="function")return;const f0=figFor;figFor=function(p,kind){try{const q=kitFigWho(p);if(q!==p){p=q&&typeof S!=="undefined"&&S&&q===S.emp?{kind:"emp"}:q}}catch(e){}return f0.call(this,p,kind)};window.figFor=figFor})();
