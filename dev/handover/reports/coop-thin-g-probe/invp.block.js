/* F2 HELPER probe (invp): insert after the 'G9 a host sync' ok(...) line of dev/test/coop-thin-g.js as dev/test/zz-invp.tmp.js (untracked); run with INVP=1 [TRIP=1] WEEKS=1 node dev/test/zz-invp.tmp.js http://127.0.0.1:8787 13 1 */
 if(process.env.INVP){const r=await G.p.evaluate(async()=>{const out=[];let S0=S,a0=S.inv,e0=(S.inv||[]).slice();let kr=0;const r0=window.kitReward;window.kitReward=function(){kr++;return r0.apply(this,arguments)};
   const st=()=>(new Error().stack||'').split('\n').slice(2,30).map(x=>x.trim().replace(/^at /,'').replace(/https?:\/\/[^ )]*:(\d+):\d+/,':$1')).join(' < ');
   /* trap: S.inv set, and the array's element writes */
   const trap=s=>{let v=s.inv;const px=a=>new Proxy(a,{set(t,k,x){if(out.length<15)out.push({ev:'elem',k,st:st()});t[k]=x;return true}});
     try{Object.defineProperty(s,'inv',{get(){return v},set(x){if(out.length<15)out.push({ev:'setInv',st:st()});v=Array.isArray(x)?px(x):x},configurable:true,enumerable:true});v=px(v)}catch(e){out.push({ev:'trapfail',e:String(e)})}};
   trap(S);
   for(let i=0;i<4;i++){try{render()}catch(e){}await new Promise(r=>setTimeout(r,300));out.push({ev:'after render '+i,sameS:S===S0,kr,same0:(S.inv||[])[0]===e0[0],KM:typeof KMSNAP!=='undefined'&&KMSNAP?{kms:KMS===S,inc:KMSNAP.inv.includes((S.inv||[])[0])}:null})}
   return out});
  console.log('INVP',JSON.stringify(r).slice(0,12000));process.exit(0)}
