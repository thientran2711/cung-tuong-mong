#!/bin/bash
# pick.sh N : click Nth choice button in modal (1-based) and then continue auto for M steps
export NODE_PATH=$(npm root -g); cd /tmp/ts
node act.js "const bs=p.locator('.modal-backdrop button').filter({hasText:/\S/}).filter({hasNotText:/^✕$/});const n=await bs.count();const i=$1-1;const t=(await bs.nth(i).innerText()).replace(/\n/g,' / ');globalThis.F.appendFileSync('/tmp/ts/life.log','   CHOSE: '+t+'\n');await bs.nth(i).click();await p.waitForTimeout(2000);return 'chose '+t"
