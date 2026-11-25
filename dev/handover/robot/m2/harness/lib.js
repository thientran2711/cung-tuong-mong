const {chromium}=require('playwright');
exports.conn=async()=>{const b=await chromium.connectOverCDP('http://127.0.0.1:9333');const ctx=b.contexts()[0];let p=ctx.pages().find(x=>/127.0.0.1:8123/.test(x.url()));return {b,ctx,p}};
exports.open=async()=>{const {b,ctx}=await exports.conn();let p=ctx.pages()[0]||await ctx.newPage();await p.setViewportSize({width:755,height:1000});
 await p.addInitScript(()=>{let s=102;Math.random=()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}});
 await p.goto('http://127.0.0.1:8123/index.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(8000);return {b,p}};
/* list visible clickable elements with centre + hit-test */
exports.clickables=(p)=>p.evaluate(()=>{const out=[];const seen=new Set();
 const els=document.querySelectorAll('button,[data-load],[onclick],a,.btn,[role=button],[data-act],.kbtn,[class*=tap],[class*=opt]');
 els.forEach(e=>{const r=e.getBoundingClientRect();if(r.width<8||r.height<8)return;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity===0||cs.pointerEvents==='none')return;
  const x=r.left+r.width/2,y=r.top+r.height/2;if(x<0||y<0||x>innerWidth||y>innerHeight)return;
  const t=document.elementFromPoint(x,y);const hit=!!t&&(t===e||e.contains(t));
  out.push({tag:e.tagName,id:e.id,cls:(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className)+'',txt:(e.innerText||e.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,60),x:Math.round(x),y:Math.round(y),hit,cover:hit?'':(t?t.tagName+'#'+t.id+'.'+(t.className+'').slice(0,40):'none')})});return out});
exports.tapAt=async(p,x,y)=>{await p.mouse.move(x,y);await p.mouse.down();await p.mouse.up()};
