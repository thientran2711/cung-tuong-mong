const {boot}=require('./boot');const fs=require('fs');
(async()=>{const o=await boot('fold',1,0,{});const {g}=o;
 await g.evaluate(fs.readFileSync(__dirname+'/scen3.js','utf8'));
 const r=await g.evaluate(async()=>{S.place='vuon';S.visit={k:'vuon',people:[],talked:false,tk:{}};tab='act';render();try{j77Tap('vuon')}catch(e){}await new Promise(r=>setTimeout(r,1500));
  const st=document.getElementById('stage'),sr=st.getBoundingClientRect();const o=[];
  const pth=e=>{const a=[];let x=e;for(let i=0;i<4&&x&&x!==st;i++){a.push(x.tagName.toLowerCase()+(x.id?'#'+x.id:'')+(x.className&&typeof x.className==='string'?'.'+x.className.trim().split(/\s+/).join('.'):''));x=x.parentElement}return a.join(' < ')};
  [...st.querySelectorAll('*')].forEach(e=>{const b=e.getBoundingClientRect();if(b.top-sr.top<90&&b.width>4&&e.children.length===0&&getComputedStyle(e).display!=='none')o.push([Math.round(b.left-sr.left),Math.round(b.top-sr.top),Math.round(b.width),Math.round(b.height),(e.textContent||'').trim().slice(0,20),pth(e)])});return {W:sr.width,o}});
 console.log(JSON.stringify(r,null,0).replace(/\],\[/g,'],\n['));await o.b.close();o.srv.close()})();
