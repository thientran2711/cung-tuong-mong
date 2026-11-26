/* PERSON-PANEL options A / B / C (LOOK-ONLY mock builds, owner 26/11 ~19:25Z: avatar too big, left info far below, iPad choice buttons cut in half).
   NOTHING lands; the kit part stays KK44's. ONE constant PP_OPT picks the option of this branch: "a" medallion · "b" slim strip + tabs · "c" figure on demand + bottom dock.
   Every option re-uses kit parts only (pcPort frame crop, .pctabs/.pct tabs, .kb/.kr rows, .ka act cards, kpsheet); the three CSS blocks are the "kit request" text. */
const PP_OPT="c";
(function(){
const P="html body .pc.kpwide[data-k2][data-pp][class][class][class]";
const COMMON=`
${P}[style*="--kpcmax"]>.pcr{overflow:hidden!important;display:flex!important;flex-direction:column;padding-bottom:4px}
${P}[style*="--kpcmax"]>.pcr>*{flex-shrink:0}
${P}[style*="--kpcmax"]>.pcr>.pcg.on{display:flex!important;flex-direction:column;flex:1 1 0;min-height:0}
${P}[style*="--kpcmax"]>.pcr>.pcg.on>.pcb{flex:1 1 0;min-height:0;overflow-y:auto;overflow-x:hidden;scroll-snap-type:y mandatory;scrollbar-width:thin;align-content:start;grid-auto-rows:var(--ppch,auto)}
${P}[style*="--kpcmax"]>.pcr>.pcg.on>.pcb>button.ka{scroll-snap-align:start;box-sizing:border-box}
${P} .kpstick{position:static!important;box-shadow:none!important;margin:0 0 4px!important;padding:2px 0 4px!important}
${P} .pcp.kit .kin>.klab{display:none!important}
.ppmed{}
${P}>.pcl>.pcname{white-space:nowrap!important;overflow:visible}
`;
/* round head-and-shoulders crop of the kit portrait (A and C): the SAME .pcp.kit frame picture, cropped to the opening, no pendant/tassel */
const MEDAL=(S,d)=>`
${S}>.pcl>.pcp.kit.kit.kit{grid-column:1;grid-row:1/3;width:${d}px!important;height:${d}px!important;max-width:none!important;aspect-ratio:1!important;border-radius:50%!important;overflow:hidden!important;margin:0!important;float:none!important;position:relative!important;box-shadow:0 0 0 2px #c9a24a,0 1px 4px #0004!important}
${S}>.pcl>.pcp.kit.kit.kit>.kin{position:absolute!important;left:0!important;top:0!important;width:100%!important;height:100%!important;transform:none!important}
${S}>.pcl>.pcp.kit .kin>.kfr,${S}>.pcl>.pcp.kit .kin>.kgem,${S}>.pcl>.pcp.kit .kin>.kemb,${S}>.pcl>.pcp.kit .kin>.kemo,${S}>.pcl>.pcp.kit .kin>.klab{display:none!important}
${S}>.pcl>.pcp.kit .kin>.kbg{left:0!important;top:0!important;width:100%!important;height:100%!important}
${S}>.pcl>.pcp.kit .kin>img.kpor{left:0!important;top:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:50% 4%!important;transform:scale(1.18);transform-origin:50% 12%}
${S}>.pcl>.pcname{grid-column:2;grid-row:1;align-self:end;margin:0!important;min-height:0!important;font-size:1.05rem!important;line-height:1.15;display:block!important}
${S}>.pcl>.pcrk{grid-column:2;grid-row:2;align-self:start;margin:2px 0 0!important}
`;
const COMP=(S,cols)=>`
${S}>.pcr .pcg.on>.pcb,${S} .pcr .ppv .pcg.on>.pcb{display:grid!important;grid-template-columns:${cols}!important;gap:5px;grid-auto-rows:auto;align-content:start;scroll-snap-type:none;overflow-y:auto}
${S} .pcr .pcb>button.ka{display:block!important;height:auto!important;min-height:0!important;padding:5px 9px 6px!important;text-align:left}
${S} .pcr .pcb>button.ka>*:not(.ppc){display:none!important}
${S} .ppc{display:block;min-width:0}
${S} .ppc1{display:flex;align-items:center;gap:6px;justify-content:space-between}
${S} .ppct{font-weight:700;font-size:.92em;min-width:0}
${S} .ppc2{display:block;font-size:.8em;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}
${S} .ppc2 .krl{margin-right:3px}${S} .ppc2 .ppsep{opacity:.5;margin:0 4px}
${S} .ppc3{display:block;font-size:.76em;color:#9a2c1c;margin-top:1px}
${S} .ppci{margin-left:4px;font-size:.9em;opacity:.7}
`;
const CSS={
a:`${P}{grid-template-columns:var(--ppl,218px) minmax(0,1fr)!important}
${P}>.pcl{display:grid!important;grid-template-columns:${72}px minmax(0,1fr);grid-template-rows:auto auto auto minmax(0,1fr);column-gap:8px;align-content:start;height:100%}
${MEDAL(P,72)}
${P}>.pcl>.pcf{grid-column:1/-1;grid-row:3;margin-top:8px;font-size:.92em}
${P}>.pcl>.kplscr{grid-column:1/-1;grid-row:4;margin-top:4px!important;overflow-y:auto}
${P}>.pcl>.pcf .kpsec{margin:0 0 2px}
${COMP(P,'1fr')}`,
d:`${P}{grid-template-columns:var(--ppl,270px) minmax(0,1fr)!important}
${P}>.pcl{display:grid!important;grid-template-columns:72px minmax(0,1fr);grid-template-rows:auto auto auto minmax(0,1fr);column-gap:8px;align-content:start;height:100%}
${MEDAL(P,72)}
${P}>.pcl>.pcf{grid-column:1/-1;grid-row:3;margin-top:8px;font-size:.92em}
${P}>.pcl>.kplscr{grid-column:1/-1;grid-row:4;margin-top:4px!important;overflow-y:auto}
${P}>.pcl>.pcf .kpsec{margin:0 0 2px}
${COMP(P,'repeat(2,minmax(0,1fr))')}
html[data-pp="d"] body:has(#panel .pc.kpwide[data-pp="d"]) .stage#stage{display:none!important}
html[data-pp="d"] body:has(#panel .pc.kpwide[data-pp="d"]) #game.game{grid-template-columns:1fr!important;grid-template-areas:"hud" "panel" "bar"!important}
html[data-pp="d"] body:has(#panel .pc.kpwide[data-pp="d"]) #panel.panel{grid-column:1!important;width:auto!important;max-width:none!important}`,
b:`${P}{--kpcw:104px!important;--kpcl:116px!important;grid-template-columns:116px minmax(0,1fr)!important}
${P}>.pcl>.kplscr{display:none!important}
${P}>.pcl>.pcname{font-size:1rem!important;text-align:center}
${P}>.pcr>.ppt{display:flex;gap:4px;margin:0 0 6px;flex-wrap:nowrap}
${P}>.pcr>.ppt .pct{flex:1 1 0;text-align:center;white-space:nowrap}
${P}>.pcr>.ppv{display:none;min-height:0;overflow-y:auto;scrollbar-width:thin}
${P}[data-ppv="info"]>.pcr>.ppv[data-v="info"],${P}[data-ppv="rel"]>.pcr>.ppv[data-v="rel"]{display:block;flex:1 1 0}
${P}[data-ppv="act"]>.pcr>.ppv[data-v="act"]{display:flex;flex-direction:column;flex:1 1 0}
${P}>.pcr>.ppv[data-v="act"]>.pcg.on{display:flex!important;flex-direction:column;flex:1 1 0;min-height:0}
${P}>.pcr>.ppv[data-v="act"]>.kpstick{flex:0 0 auto}
${P}>.pcr>.ppv .kwear{float:none;width:auto;margin:6px 0 0}
${COMP(P,'repeat(2,minmax(0,1fr))')}`,
c:`${P}{display:flex!important;flex-direction:column;grid-template-columns:none!important}
${P}>.pcl{display:grid!important;grid-template-columns:60px minmax(0,1fr) auto;column-gap:10px;align-items:center;height:auto!important;flex:0 0 auto;padding:2px 0 6px}
${MEDAL(P,58)}
${P}>.pcl>.kplscr{display:none!important}
${P}>.pcl>.ppsee{grid-column:3;grid-row:1/3;white-space:nowrap}
${P}>.pcr{display:flex!important;flex-direction:column;flex:1 1 0;min-height:0;height:auto!important}
${P}>.pcr>.kpstick{display:contents!important}
${P}>.pcr>.kpstick>.pcf{order:1;display:grid;grid-template-columns:1fr 1fr;gap:0 14px;margin-bottom:4px}
${P}>.pcr>.kpstick>.pcf .kpsec{margin:0}
${P}>.pcr>.pcn{order:2;font-size:.82em;margin:2px 0}
${P}>.pcr>.kpstick>.pctabs{order:3;margin-top:auto;padding-top:6px;border-top:2px solid var(--gold,#b8892f)}
${P}>.pcr>.pcg.on{order:4;flex:0 0 auto!important}
${P}>.pcr>.pcg.on>.pcb{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:6px;overflow:visible;scroll-snap-type:none;padding-top:6px}
${COMP(P,'repeat(2,minmax(0,1fr))')}
${P}>.pcr>.pcg.on>.pcb{overflow:visible!important;padding-top:6px;flex:0 0 auto!important}`
};
const st=document.createElement("style");st.id="kit-pp-"+PP_OPT;st.textContent=COMMON+(CSS[PP_OPT]||"");document.head.appendChild(st);
document.documentElement.dataset.pp=PP_OPT;
/* ---- DOM helpers (run after every panel render; each card once) ---- */
function fix(pc){try{if(!pc.matches(".kpwide[data-k2]"))return;const L=pc.querySelector(":scope > .pcl"),R=pc.querySelector(":scope > .pcr");if(!L||!R)return;
 const pcp=L.querySelector(":scope > .pcp");if(pcp&&(PP_OPT==="a"||PP_OPT==="c"||PP_OPT==="d")){pcp.style.setProperty("margin-bottom","0","important");pcp.style.setProperty("margin-top","0","important")}
 const sc=L.querySelector(":scope > .kplscr");if(sc)sc.style.marginTop="0";
 if(pc.dataset.pp===PP_OPT){compactify(pc);fit(pc);return}pc.dataset.pp=PP_OPT;
 const nm=(L.querySelector(".pcname")||{}).textContent||"";
 if(PP_OPT==="a"||PP_OPT==="d"){const pcf=R.querySelector(":scope > .kpstick > .pcf");if(pcf&&sc)L.insertBefore(pcf,sc)}
 if(PP_OPT==="b"){buildB(pc,L,R,sc)}
 if(PP_OPT==="c"){const b=document.createElement("button");b.className="btn ppsee";b.textContent="Xem dáng";b.addEventListener("click",e=>{e.stopPropagation();const wear=sc?sc.querySelector(".kwear"):null,facts=sc?sc.querySelector(".kpfacts"):null,key=sc?sc.querySelector(".kpkey"):null,rows=sc?sc.querySelector(".pcrows"):null;
   const big=pcp?pcp.cloneNode(true):null;if(big){big.removeAttribute("style");big.style.cssText="width:200px;max-width:60%;margin:0 auto 8px;display:block"}
   const wrap=document.createElement("div");wrap.className="kpsheetb";if(big)wrap.appendChild(big);[rows,key,facts,wear].forEach(x=>{if(x)wrap.appendChild(x.cloneNode(true))});Q.unshift({t:nm,h:wrap.outerHTML});showModal()});L.appendChild(b)}
 compactify(pc);fit(pc)}catch(e){console.error("ppfix",e)}}
function buildB(pc,L,R,sc){const mk=(v,t)=>{const d=document.createElement("div");d.className="ppv";d.dataset.v=v;d.title=t;return d};
 const info=mk("info"),rel=mk("rel"),act=mk("act");const pcf=R.querySelector(":scope > .kpstick > .pcf");
 if(pcf)info.appendChild(pcf);if(sc){const f=sc.querySelector(".kpfacts"),w=sc.querySelector(".kwear"),k=sc.querySelector(".kpkey"),r=sc.querySelector(".pcrows");if(f)info.appendChild(f);if(w)info.appendChild(w);if(r)rel.appendChild(r);if(k)rel.appendChild(k)}
 [...R.children].forEach(c=>act.appendChild(c));
 const tabs=document.createElement("div");tabs.className="pctabs ppt";const cur=(window.__ppTab&&window.__ppTab)||"act";
 [["info","Thông tin"],["rel","Giao tình"],["act","Việc"]].forEach(([v,t])=>{const b=document.createElement("button");b.className="pct"+(v===cur?" on":"");b.dataset.ppv=v;b.textContent=t;tabs.appendChild(b)});
 R.appendChild(tabs);R.appendChild(info);R.appendChild(rel);R.appendChild(act);R.insertBefore(tabs,R.firstChild);pc.dataset.ppv=cur}
function compactify(pc){pc.querySelectorAll(".pcb>button.ka").forEach(b=>{if(b.querySelector(":scope>.ppc"))return;const T=x=>x?x.textContent.replace(/\s+/g," ").trim():"";const t=b.querySelector(".kan"),od=b.querySelector(".kodds,.oc"),ton=[...b.querySelectorAll(".kb .kr")].filter(r=>/^Tốn$/i.test(T(r.querySelector(".krl")))).map(r=>r.querySelector(".krv"))[0],du=[...b.querySelectorAll(".kb .kr")].filter(r=>/^(Được|Thành)$/i.test(T(r.querySelector(".krl")))).map(r=>T(r.querySelector(".krv"))).filter(Boolean),nd=b.querySelector(".kpabox .krv"),info=b.querySelector(".kainfo");
 const d=document.createElement("span");d.className="ppc";d.innerHTML=`<span class="ppc1"><span class="ppct">${T(t)}</span>${od?od.outerHTML:""}${info?'<span class="ppci" title="Xem thêm">ⓘ</span>':""}</span><span class="ppc2">${ton?'<span class="krl">Tốn</span>'+([...ton.children].length>1?[...ton.children].map(T).filter(t=>t&&!/^[·•\s]+$/.test(t)).join(" · "):T(ton)):""}${ton&&du.length?'<span class="ppsep">·</span>':""}${du.length?'<span class="krl">Được</span>'+du.join(" · "):""}</span>${b.classList.contains("kdis")&&nd?'<span class="ppc3">Cần: '+T(nd)+'</span>':""}`;b.appendChild(d);const i=d.querySelector(".ppci");if(i)i.addEventListener("click",e=>{e.stopPropagation();e.preventDefault();info.click()})})}
function fit(pc){try{const pcb=pc.querySelector(".pcg.on > .pcb");if(!pcb||PP_OPT==="c")return;pcb.style.removeProperty("--ppch");pcb.querySelectorAll(":scope>button.ka").forEach(e=>e.style.height="");if(pcb.scrollHeight<=pcb.clientHeight+2){pcb.dataset.ppn="all";return}const cs=[...pcb.querySelectorAll(":scope > button.ka")].filter(e=>e.offsetParent);if(!cs.length)return;
 const gap=parseFloat(getComputedStyle(pcb).rowGap)||8;let H=0;cs.forEach(e=>{e.style.height="auto";H=Math.max(H,Math.ceil(e.getBoundingClientRect().height));e.style.height=""});
 const A=pcb.clientHeight;if(A<20)return;const n=Math.max(1,Math.floor((A+gap)/(H+gap)));const h=Math.floor((A-gap*(n-1))/n);pcb.style.setProperty("--ppch",Math.max(h,Math.min(H,A))+"px");pcb.dataset.ppn=n}catch(e){}}
addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-ppv]");if(!b)return;const pc=b.closest(".pc");if(!pc)return;e.stopPropagation();pc.dataset.ppv=b.dataset.ppv;window.__ppTab=b.dataset.ppv;b.parentNode.querySelectorAll(".pct").forEach(x=>x.classList.toggle("on",x===b));requestAnimationFrame(()=>fit(pc))},true);
let busy=0;function run(){if(busy)return;busy=1;setTimeout(()=>{busy=0;document.querySelectorAll(".pc.kpwide[data-k2]").forEach(fix)},80)}
new MutationObserver(run).observe(document.body,{childList:true,subtree:true});addEventListener("resize",run);setInterval(run,1200);run();
})();
