/* KIT §13.8 kitGameVs (K-PM-1, owner OD 20/11 ~01:00Z item 1, review/kit-gamevs): ONE shared live head-to-head «Thách đấu» split board for EVERY person-minigame art
   (đàn, cờ, hát, múa, thư pháp, họa, thêu, hương … any KG82 / person game): her board + the opponent's live score and clock side by side. Pure display: NO game logic,
   NO numbers of its own (the tick / warn / settle knobs are BAL.gameVs, jbal2). Built on the kit game frame look (.kgbox / .kgame tokens), kitFaceH portraits, kitRows words.
   API:  const vs = kitGameVs({box, me:{p|face|name}, opp:{p|face|name}, unit:"phần", round:"Ván 1/3", clock:true, oppBoard:false});
         vs.setScore(side,n) · vs.setClock(side,t) (t = seconds left, null = hide) · vs.setTurn(side|null) · vs.setMood(side,text) · vs.setRound(text) · vs.end({win:"me"|"opp"|"draw", text})
         vs.me / vs.opp = the board slots (.kgvs-bd) the game draws into (opp slot only when oppBoard:true) · vs.destroy(). side = "me" | "opp".
   Layout: html.kv1 (Fold portrait, one page) = opponent pane on top, her pane below (stacked); html.kv2 (iPad / spread) = side by side with the round state between. */
function kitGameVs(o){o=o||{};const B=BAL.gameVs||{pop:320,warn:.2,end:900};const unit=o.unit||"phần";
 const box=o.box||(typeof kg82Box==="function"?kg82Box():null);if(!box)return null;
 const side=(k,d)=>{d=d||{};let face="";try{face=d.face?d.face:kitFaceH(d.p,"sm")}catch(e){}
  return `<section class="kgvs-pane kgvs-${k}" data-side="${k}"><header class="kgvs-hd"><span class="kgvs-face">${face}</span><b class="kgvs-nm">${d.name||(d.p&&d.p.name)||""}</b><i class="kgvs-turn" hidden>Đến phiên</i></header>`+
   `<div class="kgvs-st"><span class="kchip kgvs-sc"><b data-vs="sc">0</b> <small>${unit}</small></span><span class="kchip kgvs-clk" data-vs="clk" hidden></span></div>`+
   `<small class="kgvs-mood" data-vs="mood" hidden></small>`+(k==="me"||o.oppBoard?`<div class="kgvs-bd"></div>`:"")+`</section>`};
 const el=document.createElement("div");el.className="kgvs";el.style.setProperty("--kgvs-pop",B.pop+"ms");el.style.setProperty("--kgvs-end",B.end+"ms");el.dataset.turn="";el.innerHTML=side("opp",o.opp)+`<div class="kgvs-mid"><b data-vs="round">${o.round||""}</b><span class="kgvs-res" hidden></span></div>`+side("me",o.me);
 box.insertBefore(el,box.firstChild);
 const q=(s,k)=>el.querySelector(`.kgvs-${s} [data-vs="${k}"]`),full=o.full||{};let over=false;
 const api={el,me:el.querySelector(".kgvs-me .kgvs-bd"),opp:el.querySelector(".kgvs-opp .kgvs-bd"),
  setScore(s,n){const e=q(s,"sc");if(!e||over)return;const t=String(n);if(e.textContent===t)return;e.textContent=t;const c=e.parentNode;c.classList.remove("kgvs-pop");void c.offsetWidth;c.classList.add("kgvs-pop");clearTimeout(c._t);c._t=setTimeout(()=>c.classList.remove("kgvs-pop"),B.pop)},
  setClock(s,t){const e=q(s,"clk");if(!e||over)return;if(t==null){e.hidden=true;return}e.hidden=false;e.textContent=`còn ${Math.max(0,Math.ceil(t))} giây`;if(o.total)e.classList.toggle("kgvs-warn",t<=o.total*B.warn)},
  setTurn(s){if(over)return;el.dataset.turn=s||"";el.querySelectorAll(".kgvs-turn").forEach(i=>{i.hidden=i.closest(".kgvs-pane").dataset.side!==s})},
  /* K-PM-1 fix 20/11 (E22g): a mood / reaction line («Nàng ấy đang cười») lives HERE, in the pane flow under the score — never an absolute bubble over the board / a ladder row */
  setMood(s,t){const e=q(s,"mood");if(!e)return;e.textContent=t||"";e.hidden=!t},
  setRound(t){const e=el.querySelector('[data-vs="round"]');if(e)e.textContent=t||""},
  end(r){if(over)return;over=true;r=r||{};el.dataset.turn="";el.dataset.end=r.win||"draw";el.querySelectorAll(".kgvs-turn").forEach(i=>i.hidden=true);
   const m=el.querySelector(".kgvs-res");m.hidden=false;m.textContent=r.text||(r.win==="me"?"Nàng thắng":r.win==="opp"?"Nàng thua":"Hòa nhau");
   el.querySelectorAll(".kgvs-pane").forEach(p=>p.classList.toggle("kgvs-win",p.dataset.side===r.win))},
  destroy(){over=true;el.remove()}};
 return api}
window.kitGameVs=kitGameVs;
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§13.8",title:"kitGameVs · bảng thách đấu hai bên (phần + khắc trực tiếp) cho MỌI trò tài nghệ có người",where:"mọi trò đối đầu với người (đàn, cờ, hát, múa, thư pháp …): bảng của nàng và phần / thời gian của đối thủ cạnh nhau; Fold xếp trên dưới, iPad xếp ngang",
 html:()=>{requestAnimationFrame(()=>{try{document.querySelectorAll("[data-kgvs-demo]").forEach(h=>{if(h.firstChild)return;const v=kitGameVs({box:h,me:{name:"Ngươi",face:'<span class="md sm">Ta</span>'},opp:{name:"Lâm Tuyết Vi",face:'<span class="md sm">Vi</span>'},round:"Ván 2/3",total:30});
   if(!v)return;v.me.innerHTML='<div class="kgvs-demo">Bảng của nàng</div>';let n=0,m=0,t=30;v.setScore("me",3);v.setScore("opp",2);v.setClock("me",t);v.setClock("opp",t);v.setTurn("opp");
   const id=setInterval(()=>{if(!document.body.contains(h)){clearInterval(id);return}n++;if(n%3==0){m+=1;v.setScore("opp",2+m)}t=Math.max(0,t-1);v.setClock("me",t);v.setClock("opp",t);v.setTurn(n%6<3?"opp":"me");if(t<=0){clearInterval(id);v.end({win:"me"})}},1000)})}catch(e){}});
  return `<div class="mg kpanel kgame kg82" style="position:relative;max-width:100%;margin:0 auto 12px"><div class="kgbody"><div class="kginfo"><div class="kgbox" data-kgvs-demo></div></div></div></div>`}})}catch(e){}
/* layout only (colours + chrome from the kit tokens; html.kv1 / html.kv2 are the only layout switches, KIT §0) */
(function(){const st=document.createElement("style");st.id="kgvs-css";st.textContent=`
.kgvs{display:grid;grid-template-columns:1fr;gap:8px;margin:0 0 8px}
.kgvs-pane{display:flex;flex-direction:column;gap:6px;min-width:0;border:1px solid var(--k-hair);border-radius:var(--k-rad,8px);background:var(--k-card);padding:6px 8px}
.kgvs-hd{display:flex;align-items:center;gap:8px}.kgvs-nm{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.kgvs-turn{flex:none;font-style:normal;font-size:.78rem;color:var(--gold)}
.kgvs-st{display:flex;gap:6px;flex-wrap:wrap}.kgvs-sc b{font-size:1.15rem}.kgvs-warn{color:var(--bad,#c23b22)}
.kgvs-pop{animation:kgvsPop var(--kgvs-pop) ease-out}@keyframes kgvsPop{50%{transform:scale(1.18)}}
.kgvs[data-turn=me] .kgvs-me,.kgvs[data-turn=opp] .kgvs-opp{border-color:var(--gold);box-shadow:0 0 0 2px var(--gold)}
.kgvs-mid{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:4px;order:0}
.kgvs-opp{order:-1}.kgvs-me{order:1}.kgvs-mid{order:0}
.kgvs-bd{min-height:80px}.kgvs-win{border-color:var(--good,#2d7a52);box-shadow:0 0 0 2px var(--good,#2d7a52)}
.kgvs[data-end=opp] .kgvs-me{border-color:var(--bad,#c23b22)}
.kgvs-res{font-weight:700;animation:kgvsEnd var(--kgvs-end) ease-out}@keyframes kgvsEnd{from{opacity:0;transform:translateY(4px)}}
html.kv2 .kgvs{grid-template-columns:1fr auto 1fr;align-items:start}.kgvs-pane{align-self:start}.kgvs-mood{color:var(--dim,#6b5a44);font-size:.8rem;line-height:1.3;overflow-wrap:anywhere}.kgvs-mood[hidden]{display:none}html.kv2 .kgvs-me{order:0}html.kv2 .kgvs-opp{order:2}html.kv2 .kgvs-mid{order:1;min-width:84px}
@media (prefers-reduced-motion:reduce){.kgvs-pop,.kgvs-res{animation:none}}`;document.head.appendChild(st)})();
