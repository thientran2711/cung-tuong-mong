/* ================= jpres — EVENT PRESENTATION BY GROUP (owner 15/11 20:05Z items 11-13 + 22:45Z list; D11, review/presentation) =================
   ONE table, no new art: every event dialog belongs to a GROUP (its picture category from EVENTS.json = evArtCat, the same key that picks the
   event picture and its kit category frame KIT §32.3). The group decides, ONCE when the card opens:
     - SOUND   a sting (SFXN moment) unless the card text already matches a keyword sound (jsfx SFXTXT wins: one sound per card)
     - MUSIC   the background track while the card is up (j11 musicCtx used to say "tension" for every event card)
     - VOICE   a fallback voice only when j36's tone logic found none (never over it)
     - FX      a painted §68 effect through kitFx / kitFxBurst / kitFxEdge (Gọn / reduced motion / bots: those functions do nothing)
     - FRAME   data hooks on the dialog: data-kpres-grp, data-kpres-cat, and for story cards data-kpres-story=main|side + data-kpres-origin=<k>
               (the kit's category frame colour already follows the group; the 9 origin frames need kit art = KIT REQUEST in the report).
   Wrap only: showModal (after jsfx) + musicCtx. Co-op: local presentation after the card is shown, nothing is sent or awaited.
   Test hook: window.KPRES_LOG [{cat,grp,sfx,mus,vo,fx,story}]; test dev/test/presentation.js. =================================================== */
/* group → default presentation. sfx = SFXN moment · mus = bgm file · vo = voice key (fallback) · fx = {kit}|{px:[sprite,n]}|{edge} */
const KPG={
 "trieu-chinh":{sfx:"edict",mus:"bgm-day",ent:"scroll"},
 "sung-ai":    {sfx:"favour",mus:"bgm-night",fx:{px:["petal-peach",7]}},
 "trung-phat": {sfx:"gloom",mus:"bgm-tension",fx:{kit:"ink"}},
 "le-nghi":    {sfx:"rite",mus:"bgm-festival"},
 "cham-con":   {sfx:"bloom",mus:"bgm-day"},
 "giao-thiep": {sfx:"visitor",mus:"bgm-day"},
 "hau-ha":     {sfx:"notice",mus:"bgm-day"},
 "hoc-tap":    {sfx:"notice",mus:"bgm-day"},
 "nghi-ngoi":  {sfx:"notice",mus:"bgm-day"},
 "muu-ke":     {sfx:"schemeOk",mus:"bgm-tension"},
 "hai-nguoi":  {sfx:"poison",mus:"bgm-tension",fx:{edge:"poison"}}};
/* per picture category: overrides of its group (only what differs) */
const KPC={
 /* triều chính: bad news vs good news vs rites */
 "lu-lut":{sfx:"alarm",mus:"bgm-tension"},"han-han":{sfx:"alarm",mus:"bgm-tension"},"bien-ai":{sfx:"alarm",mus:"bgm-tension"},"tham-quan":{sfx:"gloom",mus:"bgm-tension"},
 "thang-tran":{sfx:"win",fx:{px:["petal-peach",8]}},"duoc-mua":{sfx:"win"},"dai-xa":{sfx:"decree",fx:{px:["petal-peach",8]}},
 "su-than":{sfx:"visitor"},"hoa-than":{sfx:"gloom",mus:"bgm-sorrow"},
 "quoc-tang":{sfx:"death",mus:"bgm-sorrow",vo:"f-sigh"},"tang-le":{sfx:"death",mus:"bgm-sorrow",vo:"f-sigh"},
 /* sủng ái */
 "hoang-de-vui":{sfx:"favour",fx:{kit:"favour"},vo:"f-laugh-soft"},"hoang-de-dem":{sfx:"night",fx:{kit:"night"}},
 "vi-hanh":{sfx:"step",mus:"bgm-day"},"di-san":{sfx:"favour"},"tu-tinh":{sfx:"favour",fx:{kit:"romance"},vo:"f-laugh-soft"},"mat-uoc":{sfx:"favour",fx:{kit:"romance"}},"nguy-gia":{sfx:"step",fx:0},
 /* trừng phạt */
 "hoang-de-gian":{sfx:"gloom",fx:{kit:"ink"},vo:"m-angry"},"hinh-phat":{sfx:"cane",fx:{kit:"ink"}},"lanh-cung":{sfx:"doorShut",mus:"bgm-cold",fx:{kit:"ash"}},"hoa-hoan":{sfx:"alarm",fx:{px:["ember",10]}},
 /* lễ nghi */
 "le-xuan":{sfx:"festival",mus:"bgm-festival",fx:{px:["petal-plum",8]}},"le-ha":{sfx:"festival",mus:"bgm-festival",fx:{px:["petal-lotus",6]}},
 "le-thu":{sfx:"festival",mus:"bgm-festival",fx:{px:["leaf",6]}},"le-dong":{sfx:"festival",mus:"bgm-festival",fx:{px:["snow",8]}},
 "te-le":{sfx:"rite",mus:"bgm-sorrow"},"yen-tiec":{sfx:"banquet",mus:"bgm-festival",vo:"crowd-gossip"},
 "tan-phong":{sfx:"edict",fx:{px:["petal-peach",8]},ent:"scroll"},"tuyen-tu":{sfx:"visitor",mus:"bgm-day"},"thinh-an":{sfx:"kneel",mus:"bgm-day"},"hh-viec":{sfx:"rite",mus:"bgm-day"},
 /* chăm con */
 "sinh-no":{sfx:"bloom",fx:{px:["petal-lotus",6]}},"con-tre":{sfx:"bloom",vo:"child-laugh"},
 /* giao thiệp */
 "khach-den":{sfx:"visitor"},"thu-nha":{sfx:"notice",fx:{px:["paper",6]}},"chuyen-la":{sfx:"notice",mus:"bgm-night"},"tham-hoi":{sfx:"visitor"},
 "qua-tang":{sfx:"lidGift",fx:{px:["spark",6]}},"bac-tien":{sfx:"coin"},"hao-huu":{sfx:"join"},"tin-cung":{sfx:"notice"},
 /* hầu hạ */
 "cung-nhan":{sfx:"step"},"cung-nu":{sfx:"step"},"canh-phong":{sfx:"notice"},
 /* học tập, thiên thời */
 "tai-nghe":{sfx:"mgwin"},"thoi-tiet":{sfx:"wind"},"dieu-troi":{sfx:"xamDrop",mus:"bgm-night"},"dieu-lanh":{sfx:"lotGood",fx:{px:["petal-lotus",6]}},
 "benh-tat":{sfx:"sick",mus:"bgm-sorrow",vo:"f-sigh"},"dich-benh":{sfx:"sick",mus:"bgm-sorrow"},
 /* mưu kế */
 "tranh-sung":{sfx:"schemeOk"},"tin-don":{sfx:"schemeOk",fx:{kit:"rumour"},vo:"crowd-gossip"},"tai-mat":{sfx:"search",fx:{px:["paper",6]}},"mat-bao":{sfx:"search",fx:{px:["paper",6]}},
 "am-muu":{sfx:"schemeOk"},"vu-oan":{sfx:"expose",fx:{kit:"ink"}},"hoi-lo":{sfx:"coin",fx:{kit:"coin"}},
 /* hại người */
 "dau-doc":{sfx:"poison",fx:{edge:"poison"}},"hai-thai":{sfx:"gloom",fx:{edge:"blood"},mus:"bgm-sorrow"}};
/* S3-152 / S3-181 ORIGIN FRAME PLACEHOLDER (ART REQUEST A1 = 9 painted frames, one per origin; until they land a main-story card gets a double rule in the origin's colour so it reads as main story at a glance).
   When the painted frame of an origin exists, KPO_ART[k] = its url and the rule is dropped (data-kpres-art). Colours: tt gold · dtq crimson · muoi salt-blue · cn rose · nc teal · td ash · ch amber · thd moss · cnv (maid start, the 9th) + srv jade. */
const KPO={tt:"#c9952a",dtq:"#a8321f",muoi:"#6f95a8",cn:"#c4708a",nc:"#3f8a74",td:"#6d6779",ch:"#b8742f",thd:"#6c8a4f",srv:"#5a9a86",cnv:"#5a9a86"},KPO_ART={tt:"img/kit/kpo-tt.webp",dtq:"img/kit/kpo-dtq.webp",muoi:"img/kit/kpo-muoi.webp",cn:"img/kit/kpo-cn.webp",nc:"img/kit/kpo-nc.webp",td:"img/kit/kpo-td.webp",ch:"img/kit/kpo-ch.webp",thd:"img/kit/kpo-thd.webp",srv:"img/kit/kpo-srv.webp",cnv:"img/kit/kpo-srv.webp"};
(function(){const st=document.createElement("style");st.id="kpres-css";st.textContent=`.dlg[data-kpres-story="main"][data-kpres-origin]:not([data-kpres-art]){box-shadow:inset 0 0 0 2px var(--kpo),inset 0 0 0 4px transparent,inset 0 0 0 5px var(--kpo)}html body #modal .dlg[data-kpres-story="main"][data-kpres-art]{position:relative;box-sizing:border-box;padding:var(--kpo-w,26px)!important;--kpo-w:26px}.dlg[data-kpres-story="main"][data-kpres-art]::after{content:"";position:absolute;inset:0;z-index:5;pointer-events:none;border:var(--kpo-w,26px) solid transparent;border-image-source:var(--kpo-img);border-image-slice:110;border-image-width:var(--kpo-w,26px);border-image-repeat:stretch}`;document.head.appendChild(st)})();
const KPFEST={sfx:"festival",mus:"bgm-festival",fx:{kit:"lantern"}};
const KPRES_LOG=window.KPRES_LOG=[];const KPRES_LAST={};
/* the picture category of a card (null = not an event card): same sources as the picture itself (jk2b kitEvArt chain) */
function kpresCat(m){try{if(!m||m.kit&&(m.kit.shop||m.kit.pick))return null;
 let c=null;if(typeof evArtCat==="function"){const pp=m.pp||{};const id=m.evId||(m.pid?m.pid+(pp.id||pp.k?":"+(pp.id||pp.k):""):"");c=(id&&evArtCat(id))||(m.pid&&evArtCat(m.pid))||null}
 if(!c&&typeof kitEvArt==="function"){const a=kitEvArt(m);const mm=a&&/\/ev-([a-z0-9]+(?:-[a-z0-9]+)*?)(?:-[b-z]|-\d+)?\.webp/.exec(String(a.src||""));if(mm)c=mm[1]}
 return c||null}catch(e){return null}}
function kpresGrp(c){try{return c&&(/^fest/.test(c)?"le-nghi":(typeof KIT_EVCAT==="object"&&KIT_EVCAT[c])||null)}catch(e){return null}}
/* story cards: "Chính tuyến · …" / "Phụ tuyến · …" (jstory labels); main = her origin's line */
function kpresStory(m){const t=String(m&&m.t||"").replace(/<[^>]+>/g,"");return /^\s*Chính tuyến/.test(t)?"main":/^\s*Phụ tuyến/.test(t)?"side":""}
function kpresPlan(m){const c=kpresCat(m),story=kpresStory(m);if(!c&&!story)return null;const g=kpresGrp(c);
 const P=Object.assign({},KPG[g]||{},/^fest/.test(c||"")?KPFEST:{},KPC[c]||{});
 if(!c&&story){/* story card with no event picture: main line = grave (court), side = plain */ Object.assign(P,story==="main"?{sfx:"edict",mus:"bgm-day",ent:"scroll"}:{sfx:"notice"})}
 if(story==="main")P.ent=P.ent||"scroll"
 return Object.assign(P,{cat:c||"",grp:g||(story?"story":""),story})}
function kpresFx(f,el){if(!f)return"";try{
 if(f.kit&&typeof kitFx==="function"){if(!KPRES_LAST[f.kit]||performance.now()-KPRES_LAST[f.kit]>6000){KPRES_LAST[f.kit]=performance.now();kitFx(f.kit,{el})}return"kit:"+f.kit}
 if(f.px&&typeof kitFxBurst==="function"){kitFxBurst(f.px[0],null,f.px[1]);return"px:"+f.px[0]}
 if(f.edge&&typeof kitFxEdge==="function"){kitFxEdge(f.edge,{in:500,hold:900,out:1100,opacity:.7});return"edge:"+f.edge}}catch(e){}return""}
function kpresShow(m){try{if(!m||m.__pres)return;const P=kpresPlan(m);if(!P)return;m.__pres=P;
 const md=document.getElementById("modal"),dlg=md&&md.querySelector(".dlg");
 if(dlg){dlg.dataset.kpresGrp=P.grp;dlg.dataset.kpresCat=P.cat;if(P.story){dlg.dataset.kpresStory=P.story;try{if(P.story==="main"){const ok=S&&S.origin?S.origin.k:(S&&S.srv?"srv":"");if(ok){dlg.dataset.kpresOrigin=ok;if(KPO_ART[ok]){dlg.dataset.kpresArt=KPO_ART[ok];dlg.style.setProperty("--kpo-img",'url("'+KPO_ART[ok]+'")')}dlg.style.setProperty("--kpo",KPO[ok]||KPO.srv)}}}catch(e){}}}
 if(typeof S!=="undefined"&&S&&!S.dead&&P.mus)m.__presMus=P.mus;
 let sfx="",vo="",fx="";
 const kw=typeof ksfxText==="function"?ksfxText((m.t||"")+" "+(m.h||"")):null;
 if(P.sfx&&!kw&&typeof kitSfx==="function"&&kitSfx(P.sfx,{at:140}))sfx=P.sfx;
 try{if(P.vo&&typeof voKind==="function"&&!voKind(m)&&typeof voice==="function"){voice(P.vo);vo=P.vo}}catch(e){}
 fx=kpresFx(P.fx,dlg||null);
 let ent="";if(P.ent&&dlg&&typeof kitEdictOpen==="function"&&kitEdictOpen(dlg,{kind:P.ent}))ent=P.ent;   /* S3-152: the card opens like an edict unrolling (KIT §68.9) */
 KPRES_LOG.push({cat:P.cat,grp:P.grp,sfx,mus:P.mus||"",vo,fx,ent,story:P.story||""});if(KPRES_LOG.length>80)KPRES_LOG.shift()}catch(e){console.error("kpres",e)}}
(function(){const W=(n,f)=>{const o=window[n];if(typeof o!=="function"||o.__kpres)return;const w=f(o);w.__kpres=1;window[n]=w;try{(0,eval)(n+"=window."+n)}catch(e){}};
 W("showModal",o=>function(){const r=o.apply(this,arguments);try{kpresShow(typeof Q!=="undefined"&&Q[0])}catch(e){}return r});
 W("musicCtx",o=>function(){try{const m=typeof Q!=="undefined"&&Q[0];if(m&&m.__presMus&&S&&!S.dead&&S.place!=="lc"&&(m.pid||m.evId))return m.__presMus}catch(e){}return o.apply(this,arguments)})})();
/* ================= PEOPLE MOMENTS (owner 15/11 20:05Z item 13 + 22:45Z list; S3-151/182/205; review/presentation-wiring) =================
   The 13 approved people animations + the painted-effect list, wired from ONE table (KPM) through the kit: kitFigMove (KIT §68.8, what happens to a stage figure),
   kitFx (§54 screen moments), kitFxBurst / kitFxSheet / kitFxRim (§68). No private drawing here. Every moment is local presentation after the state applied
   (co-op: nothing sent, nothing awaited); Gọn / reduced motion / bots / no figure on the stage: nothing. Where the person is not on the stage the log line already says it.
   Her own moments (rank, cold palace, pregnancy, birth, death, hit, poison, harm) keep their j93 / j11 scenes; this adds what happens to OTHER people and to her figure.
   Test hook window.KPM_LOG [{m, who, fig, t}]; test dev/test/presentation-people.js. */
const KPM_LOG=window.KPM_LOG=[];const KPM_LAST={};let KPM_PREV=[],KPM_PL="";const KPM_OUT=new Set();lifeStore("KPM_LOG / KPRES_LOG presentation test-hook logs + KPM stage memory (names of that life)",()=>{KPM_LOG.length=0;KPRES_LOG.length=0;for(const k in KPM_LAST)delete KPM_LAST[k];for(const k in KPRES_LAST)delete KPRES_LAST[k];KPM_PREV=[];KPM_PL="";KPM_OUT.clear()});   /* KPM_PREV = the people list the stage was LAST drawn with (the game changes the list before it re-renders) */
const kpmKey=w=>w&&(w.ref||(w.kind?w.kind+":"+w.name:w));   /* the stage lists wrappers {kind, ref, name}; homePeople() builds NEW wrappers every render, so identity = ref, else kind:name */
function kpmOn(){try{return typeof kfOn==="function"&&kfOn()&&typeof S!=="undefined"&&S&&!S.dead&&typeof kitFigMove==="function"}catch(e){return false}}
function kpmOnce(k,ms){const n=performance.now();if(KPM_LAST[k]&&n-KPM_LAST[k]<ms)return false;KPM_LAST[k]=n;return true}
function kpmSide(p){try{const e=kfkFigEl(p);if(!e||e.snap)return 1;const r=e.getBoundingClientRect();return r.left+r.width/2<innerWidth/2?-1:1}catch(x){return 1}}
/* moment → what it does. p = the person it happens to (person | "me"), q = the second person (thread), o = options. Returns true when a figure moved. */
const KPM={
 slap:(p)=>{const f=kitFigMove("flush",p);if(!f&&p!==S&&kpmOnce("slapb"+(p&&p.name),800))kitFxBurst("brush",null,5);return !!f},                       /* one beat: jolt + brief red flush (hit's brush streak + shake is kitFx hit, her only, j11) */
 poison:(p)=>{const f=kitFigMove("poison",p);if(p===S&&kpmOnce("poison",1500))kitFx("poison");return !!f},                                            /* figure tints green, then blurs */
 harm:(p)=>{const f=kitFigMove("flush",p);if(p===S&&kpmOnce("harm",1500))kitFx("harm");return !!f},                                                  /* heavy harm: ink-blood edge on her; the figure jolts */
 rumour:(p)=>{const e=kfkFigEl(p);if(kpmOnce("rumour",2500))kitFx("rumour",{el:e&&!e.snap?e:null});if(e&&!e.snap&&p!==S)kitFxBurst("paper",e,6);return !!e},    /* ink wisps + fluttering paper notes */
 death:(p)=>{if(p===S)return false;return !!kitFigMove("die",p)},                                                                                    /* figure greys, sinks and fades; white silk falls over */
 drag:(p)=>{return !!kitFigMove("drag",p,{dir:kpmSide(p)})},                                                                                          /* dragged off the stage, screen dims (her: j93 scenes) */
 out:(p)=>!!kitFigMove("out",p,{dir:kpmSide(p)}),                                                                                                     /* leaves the stage: fades out */
 preg:(p)=>{const f=kitFigMove("glow",p,{tone:"lotuslight",r:16});const e=kfkFigEl(p);if(e&&!e.snap)kitFxBurst("petal-lotus",e,5);return !!f},       /* soft pink light round her (rim only, never over the face) */
 birth:(p)=>{const f=kitFigMove("glow",p,{tone:"lotuslight",r:20,ms:3200});const e=kfkFigEl(p);if(e&&!e.snap){kitFxBurst("petal-lotus",e,8);kitFxBurst("lotuslight",e,1)}return !!f},   /* ART REQUEST: swaddled baby appears in her arms (sprite not drawn yet) */
 rise:(p)=>{const f=kitFigMove("glow",p,{tone:"glow-gold",r:18});const e=kfkFigEl(p);if(e&&!e.snap)kitFxBurst("petal-peach",e,6);return !!f},          /* promoted: gold rim + petals */
 fall:(p)=>{return !!kitFigMove("grey",p)},                                                                                                          /* demoted / cold palace: figure greys */
 favour:(p)=>{const e=kfkFigEl(p);if(e&&!e.snap)kitFxBurst("petal-peach",e,9);return !!kitFigMove("glow",p,{tone:"candle",r:12})},                       /* favoured: petals fall round her */
 seal:(el)=>{if(!kpmOnce("seal",1500))return false;kitFx("seal",{el:el&&el.nodeType===1&&el!==document.body?el:null});return true},                 /* a verdict is stamped (contest result, promotion exam): the seal slam + ink blot (kitFx seal) at the stamp */
 join:(p,q)=>kpmThread(p,q,true),betray:(p,q)=>kpmThread(p,q,false)};                                                                                /* alliance: a red thread joins two people; betrayal: it snaps */
function kpmThread(p,q,join){try{const a=kfkFigEl(p),b=kfkFigEl(q);if(!a||!b||a.snap||b.snap||a===b){const e=a||b;if(e&&!e.snap)kitFxBurst("petal-peach",e,5);return false}
 const ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect(),x=(ra.left+ra.width/2+rb.left+rb.width/2)/2,y=(ra.top+ra.height*.45+rb.top+rb.height*.45)/2,w=Math.max(120,Math.min(innerWidth*.6,Math.abs(ra.left+ra.width/2-(rb.left+rb.width/2))*1.1));
 kitFxSheet("thread",{x,y},{size:w,reverse:!!join,hold:700});return true}catch(e){return false}}
function kpmGo(m,p,q,o){try{if(!kpmOn()||!p||!KPM[m])return false;const ok=KPM[m](p,q,o);KPM_LOG.push({m,who:p===S?"me":p&&p.name||"",fig:!!ok,t:Date.now()});if(KPM_LOG.length>80)KPM_LOG.shift();return ok}catch(e){console.error("kpm",m,e);return false}}
window.kpmGo=kpmGo;window.KPM=KPM;
/* hooks: ONE list of the game actions that do something to a person (ACT key → moment on the target / actor+target), plus the state functions */
const KPM_ACT={tat:{m:"slap",ok:/./},phatquy:{m:"slap",ok:/./},
 poison:{m:"poison",ok:/trúng độc|nôn ra máu|thập tử|chết sau/,no:/may có thuốc|bị phát hiện/},kpoison:{m:"poison",ok:/trúng độc|ốm|sốt|lâm bệnh|thập tử/,no:/bị phát hiện|chặn kịp/},slowpoison:{m:"poison",ok:/./,no:/bị phát hiện|không thành|chặn kịp/},pgift:{m:"poison",ok:/trúng độc|nôn|ngã bệnh|lâm bệnh/,no:/bị phát hiện|không thành/},
 pond:{m:"harm",ok:/./,no:/bị phát hiện|bị lộ|không thành|chặn kịp/},pushp:{m:"harm",ok:/./,no:/bị phát hiện|bị lộ|không thành|chặn kịp/},trip:{m:"harm",ok:/./,no:/bị phát hiện|bị lộ|không thành|chặn kịp/},
 huydung:{m:"harm",ok:/./,no:/bị phát hiện|bị lộ|không thành|chặn kịp/},thathu:{m:"harm",ok:/./,no:/bị phát hiện|bị lộ|không thành|chặn kịp/},phonghoa:{m:"harm",ok:/./,no:/bị phát hiện|bị lộ|không thành|chặn kịp/},
 rumor:{m:"rumour",ok:/đồn/,no:/bị phát hiện|bị lộ|không thành/},lygian:{m:"rumour",ok:/./,no:/bị phát hiện|bị lộ|không thành/},frame:{m:"rumour",ok:/hình nhân|bùa ngải/,no:/bị lộ|bị phát hiện/},kframe:{m:"rumour",ok:/./,no:/bị lộ|bị phát hiện/},
 ally:{m:"join",two:1,ok:/thành/,no:/lạnh nhạt/},xinhh:{m:"join",two:1,ok:/thành/,no:/không thành/},banphe:{m:"betray",two:1,ok:/./,no:/không thành|bị phát hiện/}};
(function(){const W=(n,f)=>{const o=window[n];if(typeof o!=="function"||o.__kpm)return;const w=f(o);w.__kpm=1;window[n]=w;try{(0,eval)(n+"=window."+n)}catch(e){}};
 for(const k in KPM_ACT){const A=typeof ACT==="object"&&ACT[k];if(!A||typeof A.f!=="function"||A.f.__kpm)continue;const D=KPM_ACT[k],F=A.f;
  A.f=function(a,t){const r=F.apply(this,arguments);try{const s=String(r||"");if(t&&t!=="string"&&typeof t==="object"&&D.ok.test(s)&&!(D.no&&D.no.test(s)))setTimeout(()=>kpmGo(D.m,t,D.two?a:null),typeof kitPace==="function"?kitPace(450):450)}catch(e){}return r};A.f.__kpm=1}
 /* death: an NPC on the stage greys, sinks and fades (kill = illness, ban chết, childbirth, dieIf) */
 for(const n of ["kill","deathSentence","dieIf"])W(n,o=>function(p){const was=p&&typeof p==="object"&&p!==S&&p.alive!==false;const r=o.apply(this,arguments);try{if(was&&p.alive===false)kpmGo("death",p)}catch(e){}return r});
 /* punished / phế: dragged off the stage (NPC, sev 2+ or fall); a light punishment is a flush */
 W("punish",o=>function(p,why,sev){const r=o.apply(this,arguments);try{if(p&&typeof p==="object"&&p!==S)kpmGo((sev|0)>=2?"drag":"slap",p)}catch(e){}return r});
 W("fall",o=>function(p){const r=o.apply(this,arguments);try{if(p&&typeof p==="object"&&p!==S)kpmGo("drag",p)}catch(e){}return r});
 W("slapGive",o=>function(p){const r=o.apply(this,arguments);try{if(p&&typeof p==="object")kpmGo("slap",p)}catch(e){}return r});
 /* a birth that lives: soft light + lotus petals round the mother (NPC; hers = the j93 bloom scene) */
 W("birthP",o=>function(p,fake){const r=o.apply(this,arguments);try{if(p&&p!==S&&p.alive!==false&&!fake)kpmGo("birth",p)}catch(e){}return r});
 /* seal (S3-205): the contest result card ("Kết quả tranh ghế") and the promotion exam verdict (exDone, hers) are stamped; the stamp is the card title / the result toast seal */
 W("showModal",o=>function(){const r=o.apply(this,arguments);try{const m=typeof Q!=="undefined"&&Q[0];if(m&&m.t==="Kết quả tranh ghế"&&!m.__seal){m.__seal=1;setTimeout(()=>{const md=document.getElementById("modal");kpmGo("seal",md&&!md.hidden&&md.querySelector("#mt:not([hidden]), .dlg")||document.body)},typeof kitPace==="function"?kitPace(420):420)}}catch(e){}return r});
 W("exDone",o=>function(p){const r=o.apply(this,arguments);try{if(p===S)setTimeout(()=>{const t=document.querySelector("#rtoast.on .seal")||document.querySelector("#modal:not([hidden]) .dlg");kpmGo("seal",t||document.body)},typeof kitPace==="function"?kitPace(700):700)}catch(e){}return r});
 /* people leave the stage: the figure fades out (the old pictures are snapshot before the stage re-renders) */
 W("renderStage",o=>function(){let snap=[];try{if(kpmOn()&&KPM_PREV.length){document.querySelectorAll("#tokens .tok.fig").forEach(t=>{const e=t.querySelector("img.figimg"),w=KPM_PREV[+t.dataset.p],sn=e&&w&&kfkSnap(e);if(sn)snap.push([w,sn])})}}catch(e){}
  const r=o.apply(this,arguments);try{const cur=typeof curPeople==="function"?curPeople():[];const pl=(S&&S.place)+"|"+(S&&S.visit&&S.visit.k),same=pl===KPM_PL;KPM_PL=pl;
   if(snap.length&&same)kpmOutCheck(snap,cur);KPM_PREV=cur.slice()}catch(e){}return r});
 /* state changes of the people on the stage, read after each render (any code path): pregnancy announced, rank up / down, cold palace */
 W("render",o=>function(){const r=o.apply(this,arguments);try{kpmScan()}catch(e){}return r})})();
/* snap = [[wrapper, kfkSnap(picture)]] of the figures drawn BEFORE; cur = the people list now: every figure whose person is gone fades out (a ghost of the old picture) */
function kpmOutCheck(snap,cur){const now=new Set(cur.map(kpmKey));let n=0;for(const [w,sn] of snap){const k=kpmKey(w),pp=w.ref||w;if(!now.has(k)&&pp.alive!==false&&!KPM_OUT.has(k)){KPM_OUT.add(k);setTimeout(()=>KPM_OUT.delete(k),900);n++;try{kitFigMove("out",sn,{dir:sn.rect.left+sn.rect.width/2<innerWidth/2?-1:1})}catch(e){}}}return n}
window.kpmOutCheck=kpmOutCheck;
const KPM_SNAP=new WeakMap();
function kpmScan(){if(!kpmOn()||typeof curPeople!=="function")return;for(const w of curPeople()){const p=w&&w.ref||w;if(!p||p===S||typeof p!=="object"||p.alive===false||typeof p.rank!=="number")continue;
  const now={pg:!!(p.preg&&!p.hidden&&!p.fake),rk:typeof rkOf==="function"?rkOf(p):p.rank,out:!!p.out},old=KPM_SNAP.get(p);KPM_SNAP.set(p,now);if(!old)continue;
  if(!old.pg&&now.pg)kpmGo("preg",p);else if(now.out&&!old.out)kpmGo("fall",p);else if(now.rk>old.rk&&!now.out)kpmGo("rise",p);else if(now.rk<old.rk&&!now.out)kpmGo("fall",p)}}
window.kpmScan=kpmScan;window.KPO=KPO;window.KPO_ART=KPO_ART;
window.kpresPlan=kpresPlan;window.kpresCat=kpresCat;window.KPC=KPC;window.KPG=KPG;
