/* arc-onecore-emit: writes dev/build/jbalarc.js (BAL.arc) from the JSON table of dev/measure/arc-onecore-move.js (one arc / shared beat per line).
   usage: node dev/measure/arc-onecore-emit.js <table.json> <out jbalarc.js> */
const fs=require('fs');const [tj,out]=process.argv.slice(2);const {table}=JSON.parse(fs.readFileSync(tj,'utf8'));
const lit=v=>Array.isArray(v)?'['+v.map(lit).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).map(k=>(/^[A-Za-z_$][\w$]*$/.test(k)?k:JSON.stringify(k))+':'+lit(v[k])).join(',')+'}':JSON.stringify(v);
const H=`/* ================= jbalarc: ONE CORE (OD:L1267) rulebook of the story arcs (ARC67: j67.js main / side arcs, j96.js tư tình, jorigins.js
   the four origin arcs) and the shared complications GB67, review/one-core-arcs. Loads right after jbal.js, before j67.js: arcFx / arcGb
   (j67.js) fill every arc's numbers from here when the arc is registered. The data files hold only words, flags and story logic.
   BAL.arc.fx["<arc>"] = { <beat>: [option 0, option 1, …] (same order as the beat's o:[…] list; 0 = an option with no numbers),
                           E: { <ending>: {fx, sc, k, g} } }
     option = {c: cost, w: win gain, l: loss, o: odds, sc: Lợi thế, g: go amounts}
       c / w / l / fx = stat deltas (an empty {} stays empty); sc = the Lợi thế the choice adds; k = ending tier (1 win / 0 mid / −1 lose)
       o = a fixed odds number, or [base, term, …] added LEFT TO RIGHT by rdOdds (jroad.js), the same order as the old inline arrow, so every
           value is bit-identical (dev/measure/arc-onecore-same.js). Terms as BAL.road.fx (jbalroad.js) plus
           ["dz",stat,k] +(S[stat]||0)/k · ["mz",stat,k] +(S[stat]||0)*k · ["a",art,k] +S.arts[art]*k
       g = the typed amounts of the choice's / ending's go: effect calls (relAdd, oanAdd, e67ally …) in call order; the go closure reads G[i].
   BAL.arc.gb["<beat>"] = [option …] for the shared complications GB67 (any arc lists "G.<beat>").
   NOTE: j67 halves story Sức / Hoàng hậu costs after the arcs are registered (balance, measured): the numbers here are BEFORE that halving.
   Moved here from inline literals by dev/measure/arc-onecore-move.js (+ arc-onecore-emit.js); new arcs write their numbers here. */
Object.assign(BAL,{arc:{
 gb:{
`;
let s=H;for(const k of Object.keys(table.gb))s+=' '+k+':'+lit(table.gb[k])+',\n';s+=' },\n fx:{\n';
for(const id of Object.keys(table.arcs))s+=' '+id+':'+lit(table.arcs[id])+',\n';s+=' }}});\n';fs.writeFileSync(out,s);console.log('wrote',out,s.length)
