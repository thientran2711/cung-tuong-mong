/* danh-balance: where her Danh comes from, and how far it gets (load after inx.js, which owns window.__ix and attaches it per life).
   x.ix.ds["<kind>: <name>"] = [times, Danh gained, Danh lost]  kind = card (Hành sự) / talk (person pop-up) / pick (event or dialog option) /
     scheme (rival act) / lesson / walk / tick (buổi change: monthly, events applied on the clock) / other (between bot calls).
   Only the OUTERMOST hooked call is charged (a card whose dialog is answered later is charged to the "pick").
   x.ix.dt = {tuần: Danh} at the checkpoints DT (tuần since the life began), x.ix.rk = {tuần: rank} at the same checkpoints.
   window.__hsOnly = 1 → the sensible bot plays ONLY Hành sự cards (+ the exam card, + every dialog it is asked): no person pop-ups,
     no walking, no rival schemes, no Tài nghệ lessons (see inpage6.js guards).
   window.__capWk = N → a life is closed after N tuần as "CAP-STOP" (counted as survived by anpass.py). */
(function(){const DT=[12,24,36,48,72,96,120,144,180,216];let depth=0,w0=null,lastW=-1,d0=null;
 const strip=x=>String(x==null?"":x).replace(/<[^>]+>/g,"").replace(/-?\d+/g,"#").replace(/\s+/g," ").trim();
 const add=(k,d)=>{const I=window.__ix;if(!I||!d)return;const D=I.ds=I.ds||{};const a=D[k]=D[k]||[0,0,0];a[0]++;if(d>0)a[1]+=d;else a[2]-=d};
 const stray=()=>{try{if(S&&!S.dead&&d0!=null&&S.danh!==d0)add("other: between calls",S.danh-d0)}catch(e){}};
 function wrap(name,keyOf){const f=window[name];if(typeof f!=="function")return;window[name]=function(){if(depth||!S||S.dead){depth++;try{return f.apply(this,arguments)}finally{depth--}}
   stray();let k="";try{k=keyOf.apply(this,arguments)}catch(e){k=name}const b=S.danh,me=S;depth++;let r;try{r=f.apply(this,arguments)}finally{depth--}
   try{if(S===me&&!S.dead)add(k,S.danh-b);d0=S&&S.danh}catch(e){}return r}}
 wrap("act",i=>"card: "+strip((deck[i]||{}).n).slice(0,48));
 wrap("talk",oi=>{const p=curPeople()[popIdx];const a=p&&talkOpts(p)[oi];return "talk: "+strip(a&&a.n).slice(0,40)+" @"+((p&&p.kind)||"?")});
 wrap("chooseM",i=>{const m=Q[0]||{};const o=(m.opts||[])[i]||{};return "pick: "+strip(m.t||m.title||"").slice(0,34)+" → "+strip(o.n).slice(0,34)});
 wrap("doAct",(i,k)=>"scheme: "+k);
 wrap("lesson",k=>"lesson: "+k);
 wrap("goTo",k=>"walk: "+k);
 wrap("nextBuoi",()=>"tick: buổi change");
 /* checkpoints */
 const nb=nextBuoi;nextBuoi=function(){const r=nb.apply(this,arguments);try{if(S&&!S.dead&&window.__ix){const w=wk();if(w0==null)w0=w;const t=w-w0;if(t!==lastW){lastW=t;
   if(DT.includes(t)){const I=window.__ix;(I.dt=I.dt||{})[t]=S.danh;(I.rk=I.rk||{})[t]=S.rank}}
   if(window.__capWk&&t>=window.__capWk&&!S.srv){window.__res.push({origin:S.origin.k,rank:S.rank,maxRank:Math.max(window.__maxRank||0,S.rank),turns:S.turn,years:+(S.turn/12).toFixed(2),title:"CAP",fate:"CAP-STOP",danh:S.danh,sung:S.sung,duc:S.duc,bac:S.bac,wk:t,kids:S.kids.length});
     window.__maxRank=0;window.__lifeIter=0;window.__hhTurn=null;window.__hhWk=null;window.__acts={};Q=[];start()}}}catch(e){}return r};
 const st=start;start=function(){w0=null;lastW=-1;d0=null;depth=0;return st.apply(this,arguments)};
})();
