/* TIER-AUDIT runtime registry dump (read-only): every option list held in ARC67 (roads + j67 arcs), E68I, EVI-built cards, NRASK,
   with the BAL-filled numbers (c cost, w win, l loss, o odds) and an exit marker read from the option's go source.
   usage: node regdump.js <repo root> <out.json> */
const {chromium}=require('playwright');const fs=require('fs');const ROOT=process.argv[2],OUT=process.argv[3];
const D=require(ROOT+'/dev/test/lib/device');
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'ipadAir');const p=await ctx.newPage();
 await p.route(/\.(webp|png|jpe?g|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());const g=await D.openHost(p,srv.url);
 const res=await g.evaluate(()=>{const out=[];const EX=/kcMarry|\bover\(|endLife|S\.dead\s*=|\bdie\(|tự vẫn|xuất gia|lụa trắng|ban hoa|lên kiệu|toCold|lãnh cung|rời cung|endG|ending/i;
  const st=x=>x&&typeof x==='object'?Object.entries(x).filter(([k,v])=>typeof v==='number'&&v).map(([k,v])=>k+(v>0?'+':'')+v).join(','):'';
  const od=o=>Array.isArray(o)?o[0]:typeof o==='number'?o:typeof o==='function'?'fn':'';
  const walk=(src,id,obj,path,depth)=>{if(!obj||typeof obj!=='object'||depth>5)return;
   for(const [k,v] of Object.entries(obj)){if((k==='o'||k==='opts')&&Array.isArray(v)&&v.length>=2&&v.some(x=>x&&x.n)){
     out.push({src,id,path:path.concat(k).join('.'),h:typeof obj.h==='string'?obj.h:typeof obj.t==='string'?obj.t.replace(/<[^>]+>/g,'').slice(0,80):'',
      o:v.map(x=>({n:String(x&&x.n||'').replace(/<[^>]+>/g,'').slice(0,70),c:st(x&&x.c),w:st(x&&x.w),l:st(x&&x.l),od:od(x&&x.o),f:x&&x.f||'',ex:x&&x.go&&EX.test(String(x.go))?1:0,wx:String(x&&x.wx||'').slice(0,60),lx:String(x&&x.lx||'').slice(0,60)}))})}
    else if(v&&typeof v==='object'&&!Array.isArray(v))walk(src,id,v,path.concat(k),depth+1);
    else if(Array.isArray(v)&&depth<4)v.forEach((x,i)=>{if(x&&typeof x==='object')walk(src,id,x,path.concat(k+'['+i+']'),depth+1)})}};
  try{for(const id of Object.keys(ARC67))walk('ARC67',id,ARC67[id],[],0)}catch(e){out.push({err:'ARC67 '+e.message})}
  try{for(const id of Object.keys(E68I))walk('E68',id,E68I[id],[],0)}catch(e){out.push({err:'E68 '+e.message})}
  try{for(const id of Object.keys(NRASK))walk('NRASK',id,NRASK[id],[],0)}catch(e){}
  const cnt={ARC67:Object.keys(window.ARC67||{}).length,E68:Object.keys(window.E68I||{}).length,EV:(window.EV||[]).length,PEND:Object.keys(PEND).length,NRASK:Object.keys(window.NRASK||{}).length};
  return {cnt,out}});
 fs.writeFileSync(OUT,JSON.stringify(res));console.log(JSON.stringify(res.cnt),'sets',res.out.length);await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(2)});
