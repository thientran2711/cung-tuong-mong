/* coop-real — make a co-op test's set-up REAL on both seats (review/coop-guest-staff r2, LAW 11 family).
   Root (proved in coop-pets r2, DBG dumps): a bot that writes S.srv.risen / S.kc.inPal / S.rank / S.pets on each seat's OWN screen changes
   only that screen. The other seat's entry of her (consort in rivals, or a maid in someone's staff) and the host's stored copy of the guest
   are built from the MERGED WEEK (CW.base.P), so until a week merges: a servant start (origin cnv) stays a maid (no consort entry, «each has the
   other as a consort entry» FAIL), and a rank < PAL_HEAD guest may live in the host's palace (runAct «Người cùng cung…», a legal block).
   Use:
     await require('./lib/coop-real.js').origin(ctx, seat)   // before goto: forces a consort start (env COOP_A_ORIGIN / COOP_B_ORIGIN; default tt / dtq; 'rand' = random)
     … the bot's own screen set-up, then ONE merged week (the bot's own week driver) …
     ok(await waitFr(o, REAL), …, await o.p.evaluate(DBGF))   // her consort entry exists, her own palace, rank ≥ PAL_HEAD
*/
const DEF={a:'tt',b:'dtq'};
async function origin(ctx,seat){const fo=process.env[seat==='a'?'COOP_A_ORIGIN':'COOP_B_ORIGIN']||DEF[seat];if(fo&&fo!=='rand')await ctx.addInitScript(k=>{window.__forceOrigin=k},fo);return fo}
const REAL=()=>{const f=COOPW.friend();return !!f&&!sameHouse(S,f)&&S.rank>=PAL_HEAD};
/* who each seat is and where the other one sits (consort entry in rivals / a servant in someone's staff / nowhere), plus the host's stored copy of the guest */
const DBGF=()=>{try{const T=COOPW.thin||{};const me=x=>x?{o:x.origin&&x.origin.k,rank:x.rank,srv:x.srv?{risen:x.srv.risen|0,role:x.srv.role}:null,kc:x.kc?{inPal:x.kc.inPal|0}:null,place:x.place,home:x.home,dead:!!x.dead}:null;
  let hb=null;try{if(COOPW.seat==='a'&&T.seatOf){const x=T.seatOf('b');hb=x&&x.S?me(x.S):null}}catch(e){hb='err '+e.message}
  const cr=rivals.filter(v=>v.coop).map(v=>({id:v.id,rank:v.rank,out:!!v.out,alive:v.alive}));const cs=[];for(const v of rivals)for(const x of v.staff||[])if(x&&x.coop)cs.push({in:v.id,role:x.role});
  let bp=null;try{const P=COOPW.base&&COOPW.base.P;bp=P?Object.fromEntries(Object.entries(P).map(([k,v])=>[k,v&&v.S?me(v.S):null])):null}catch(e){}
  return{seat:COOPW.seat,me:me(S),friend:!!COOPW.friend(),coopRivals:cr,coopStaff:cs,baseP:bp,hostCopyB:hb,inLife:!!COOPW.inLife}}catch(e){return'dbg err '+e.message}};
/* review/coop-flakes (D20): aim at what the friend REALLY has (law 6). Her entry on the other seat follows her own screen by the live pos, a
   moment later; a target read from it right after she changed (a pet lost to a harm, a new one bought) can be one she no longer has
   (coop-pets pb-4: B lost the crane to thaopet, A's entry still showed it, tg2 = crane, the steal took the cat). Wait until X's entry of
   the friend shows exactly Y's own list (key = a page function (who) => string, who = 'own' | 'fr') before reading the target. */
const PETK=who=>{const L=who==='own'?S.pets:(COOPW.friend()||{}).pets;return L?JSON.stringify(L.map(P=>[P.t,P.at||0]).sort()):'none'};
async function syncFr(X,Y,key=PETK,ms=15000){const t0=Date.now();let a,b;while(Date.now()-t0<ms){b=await Y.p.evaluate(key,'own').catch(()=>null);a=await X.p.evaluate(key,'fr').catch(()=>null);if(a!=null&&a===b)return true;await new Promise(r=>setTimeout(r,300))}return{fr:a,own:b}}
module.exports={origin,REAL,DBGF,DEF,syncFr,PETK};
