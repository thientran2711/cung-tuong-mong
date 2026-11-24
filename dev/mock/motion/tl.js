/* Mock timeline helper for MOTION-DESIGN mocks that run INSIDE the real game page (real kit CSS, real DOM).
   A(el,keyframes,{at,dur,ease,stagger,back}) = a paused Web Animation on ONE shared clock; at(ms,fn) = state trigger; go() plays once in real time. */
window.TL=(()=>{const anims=[],ats=[];let end=0,t0=0,running=false,cur=0;
 function A(t,kf,o={}){const els=typeof t==='string'?[...document.querySelectorAll(t)]:(t instanceof Element?[t]:[...t]);
  const at=o.at||0,dur=o.dur||500,st=o.stagger||0,ease=o.ease||'cubic-bezier(.22,.9,.28,1)';
  els.forEach((el,i)=>{const a=el.animate(kf,{delay:at+i*st,duration:dur,easing:ease,fill:o.back?'both':'forwards'});a.pause();a.currentTime=0;anims.push(a);end=Math.max(end,at+i*st+dur)});return els}
 function at(ms,fn){ats.push({ms,fn,done:false});end=Math.max(end,ms)}
 function nowT(){return cur}
 function go(){t0=performance.now();running=true;const f=now=>{const t=now-t0;cur=t;anims.forEach(a=>{a.currentTime=Math.min(t,end+5000)});for(const x of ats)if(!x.done&&t>=x.ms){x.done=true;try{x.fn()}catch(e){console.error('TL.at',e)}}if(t<end+300)requestAnimationFrame(f);else running=false};requestAnimationFrame(f)}
 const E=(tag,cls,html,par)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;if(par)par.appendChild(e);return e};
 const rnd=(()=>{let s=7;return()=>{s=(s*16807)%2147483647;return(s-1)/2147483646}})();
 const ctr=e=>{const r=e.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]};
 const cell=n=>[...document.querySelectorAll('.kst')].find(e=>{const l=e.querySelector('.kstl');return l&&l.textContent.trim()===n});
 const wait=ms=>new Promise(r=>setTimeout(r,ms));
 return {A,at,go,now:nowT,E,rnd,ctr,cell,wait,get end(){return end}}})();
