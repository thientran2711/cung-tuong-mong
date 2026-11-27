/* toilrules.js — the toilette (Điểm trang) opens on the kit RULES screen first (ui-leftover-fold MG12: kgReady, «Sẵn sàng» = #toilrdy), then Hồi 1 (the dress, '.toilw').
   Every test that opens it and then waits for '.toilw' must pass that screen like a player: a REAL tap on «Sẵn sàng» (realtap.js hit-check).
   usage: const TR=require('./lib/toilrules'); await TR.passRules(p, rt);  // rt = RT.make(page,…) from ./realtap.js
   returns true when the rules screen was there and was tapped; false when the dress was already open. Throws on a DEAD «Sẵn sàng». */
async function passRules(p, rt, ms) {
  const ok = await p.waitForSelector('#toilrdy', { state: 'visible', timeout: ms || 8000 }).then(() => 1, () => 0);
  if (!ok) return false;
  if (!(await rt.tap('#toilrdy', { screen: 'toilette rules', label: 'Sẵn sàng', wait: 4000 }))) throw new Error('DEAD BUTTON #toilrdy');
  return true;
}
module.exports = { passRules };
