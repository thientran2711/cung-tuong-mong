/* pckey-fit.inject.js — the KIT REQUEST patch (OWNER-UI-C → KK56) as a runtime injection, for dev/test/pckey-scan.js. Same body as the proposed jk4.js §6.3e kitPcKeyFit. */
(function(){const fit=function(pc){try{const nat=+pc.dataset.kpcw0||0;if(!nat||!pc.classList.contains("kpwide"))return;
 const L=pc.querySelector(":scope > .pcl"),key=L&&L.querySelector(":scope > .kpkey"),pcp=L&&L.querySelector(":scope > .pcp");
 pc.style.setProperty("--kpcw",nat+"px");if(!key||!pcp)return;
 const floor=Math.ceil(nat*.65);let cw=nat;
 for(let i=0;i<4;i++){const over=key.getBoundingClientRect().bottom-(pc.getBoundingClientRect().bottom-26);
  if(over<=0||cw<=floor)break;cw=Math.max(floor,Math.floor(cw-over/((pcp.offsetHeight||1)/cw)));pc.style.setProperty("--kpcw",cw+"px")}}catch(e){}};
 window.kitPcKeyFit=fit;kitPcKeyFit=fit;document.querySelectorAll(".pc.kpwide").forEach(pc=>fit(pc));return"ok"})()
