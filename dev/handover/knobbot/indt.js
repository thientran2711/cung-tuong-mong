/* reviewer balance-core-r3: Danh gains by source (stack frames) + monthly stats; attached to each __res row as dt */
(function(){Error.stackTraceLimit=20;let D=null;const fresh=()=>({src:{},src36:{},l36:{},me:[],m0:-1});D=fresh();
 const fr=()=>{const L=(new Error().stack||'').split('\n').slice(3,22);const o=[];for(const l of L){const m=l.match(/at (?:Object\.)?([\w$.<>]+)? ?\(?.*?:(\d+):\d+\)?$/);if(!m)continue;const n=m[1]||'anon';if(/^(apply|ap|Array\.|forEach|map)$/.test(n)||/:(78|16):/.test(l)&&n==='anon')continue;o.push(n+'@'+m[2]);if(o.length>=3)break}return o.join('<')};
 const inst=()=>{try{if(!S||S.__dtI)return;let v=S.danh;Object.defineProperty(S,'danh',{configurable:true,enumerable:true,get(){return v},set(n){const d=n-v;if(d){const k=(window.__dtCtx||'-')+' | '+fr();const t=S.turn||0;const a=D.src[k]||(D.src[k]=[0,0,0]);if(d>0){a[0]+=d;a[2]++}else a[1]+=d;if(t<36&&d>0)D.src36[k]=(D.src36[k]||0)+d;if(t<36&&d<0)D.l36[k]=(D.l36[k]||0)+d}v=n}});Object.defineProperty(S,'__dtI',{value:1,enumerable:false})}catch(e){}};
 const snap=()=>{try{if(!S||S.dead)return;const t=S.turn||0;if(t===D.m0)return;D.m0=t;const A=S.arts||{};const av=Object.values(A).map(x=>+x||0);
   const bq=typeof artLv==='function'?Object.keys(A).map(k=>{try{return artLv(S,k)}catch(e){return 0}}):[];
   D.me.push([t,S.sac,S.tai,S.tamco,S.duc,S.danh,S.sung,S.rank,Math.max(0,...av),av.reduce((a,b)=>a+b,0),bq.length?Math.max(0,...bq):-1])}catch(e){}};
 const attach=()=>{const R=window.__res;const x=R&&R[R.length-1];if(x&&!x.dt){x.dt={src:D.src,src36:D.src36,l36:D.l36,me:D.me}}};
 const st=start;start=function(){attach();D=fresh();const r=st.apply(this,arguments);inst();return r};
 const et=endTurn;endTurn=function(){inst();snap();return et.apply(this,arguments)};
 const s0=window.__bot.step;window.__bot.step=function(){inst();const r=s0.apply(this,arguments);inst();return r};
 const W=(nm,lab)=>{try{const f=window[nm];if(typeof f!=='function')return;window[nm]=function(){const p=window.__dtCtx;try{window.__dtCtx=lab.apply(null,arguments)}catch(e){window.__dtCtx=nm}try{return f.apply(this,arguments)}finally{window.__dtCtx=p}};}catch(e){}};
 W('act',i=>'card:'+((deck[i]&&deck[i].n)||'?'));W('talk',i=>{try{return 'talk:'+(talkOpts(curPeople()[popIdx])[i]||{}).n}catch(e){return 'talk'}});
 W('doAct',(i,k)=>'scheme:'+k);W('chooseM',i=>{try{return 'dlg:'+String(Q[0].t||'').replace(/<[^>]+>/g,'').slice(0,30)+'>'+((Q[0].opts[i]||{}).n||'')}catch(e){return 'dlg'}});
 W('endTurn',()=>'endTurn');W('nextBuoi',()=>'nextBuoi');W('lessonMode',k=>'lesson:'+k);W('lesson',k=>'lesson:'+k);W('charity',()=>'charity');W('goTo',k=>'go:'+k);
 inst();
})();
