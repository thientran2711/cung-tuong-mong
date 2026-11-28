/* hand-max-hook.js — in-page census for dev/test/hand-max-scan.js (KIT §101.11, owner 26/11 ~21:25Z «mỗi sự kiện maximum 7 lá»).
   Wraps showModal: every frame on screen with an option list → key (pid or title) → max option cards shown, ranks seen, one example of the names.
   Loaded by dev/measure/evbot.js when env EVJS=<this file>; read back with window.__cen. */
(function(){if(window.__cenOn)return;window.__cenOn=1;window.__cen={};const tx=h=>String(h||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
 const rec=()=>{try{const M=document.getElementById('modal');if(!M||M.hidden)return;const m=Q[0];if(!m)return;const o=M.querySelector('.opts');if(!o)return;
  const bs=[...o.children].filter(c=>c.tagName==='BUTTON'),n=bs.length,nm=Array.isArray(m.opts)?m.opts.length:0;if(Math.max(n,nm)<2)return;
  const t=tx(m.t).slice(0,48),key=(m.pid?m.pid+' · ':'')+t.replace(/\d+/g,'#');const c=window.__cen[key]||(window.__cen[key]={pid:m.pid||'',t,kind:typeof kitKind==='function'?kitKind(m):'',max:0,maxOpts:0,ranks:{},n:0,names:[]});
  c.n++;const r=typeof S!=='undefined'&&S?S.rank:-1;c.ranks[r]=Math.max(c.ranks[r]||0,n);if(n>c.max){c.max=n;c.names=bs.map(b=>tx((b.querySelector('.kan')||b).textContent).slice(0,40))}c.maxOpts=Math.max(c.maxOpts,nm)}catch(e){}};
 const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);rec();return r};window.showModal=showModal})();
