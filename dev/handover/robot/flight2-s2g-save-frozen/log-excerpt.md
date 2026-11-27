# flight2-s2g log excerpt (QuotaExceededError / SAVE STALE), harness process 97e55a457, game 539603bf+ c1633dab8e17
```
274:CP buổi 1350 year 10 save 3096653 chars
285:CP buổi 1400 year 10 save 3150836 chars
289:CP buổi 1450 year 11 save 3287176 chars
292:STATUS flight2-s2g · buổi 1492 · year 11 · rank 0 · bugs 6 · stuck 0 · dead buttons 0
295:CP buổi 1500 year 11 save 3304480 chars
301:CP buổi 1550 year 11 save 3410938 chars
303:CP buổi 1600 year 12 save 3500023 chars
305:CP buổi 1650 year 12 save 3629440 chars
307:CP buổi 1700 year 12 save 3749458 chars
311:CP buổi 1750 year 13 save 3859701 chars
314:STATUS flight2-s2g · buổi 1791 · year 13 · rank 0 · bugs 6 · stuck 0 · dead buttons 0
316:CP buổi 1800 year 13 save 3892458 chars
319:CP buổi 1850 year 13 save 3997935 chars
323:CP buổi 1900 year 14 save 4078454 chars
325:CP buổi 1950 year 14 save 4194372 chars
326:CP buổi 2000 year 14 save 4224528 chars
331:CP buổi 2050 year 15 save 4332562 chars
333:STATUS flight2-s2g · buổi 2050 · year 15 · rank 0 · bugs 6 · stuck 0 · dead buttons 0
340:CP buổi 2100 year 15 save 4459091 chars
342:CP buổi 2150 year 15 save 4533803 chars
344:CP buổi 2200 year 16 save 4557641 chars
346:CP buổi 2250 year 16 save 4655616 chars
348:CP buổi 2300 year 16 save 4702657 chars
350:STATUS flight2-s2g · buổi 2343 · year 17 · rank 0 · bugs 6 · stuck 0 · dead buttons 0
351:CP buổi 2350 year 17 save 4776615 chars
362:CP buổi 2400 year 17 save 4806282 chars
370:CP buổi 2450 year 17 save 4915667 chars
372:CP buổi 2500 year 18 save 5071445 chars
376:CP buổi 2550 year 18 save 5149910 chars
378:PAGE CONSOLE error: [rt] localStorage.setItem failed: QuotaExceededError key hclh-save-v2-1 (5247844 chars): Failed to execute 'setItem' on 'Storage': Setting the value of 'hclh-save-v2-1' exceeded the quota.
379:BUG game QuotaExceededError: the game save no longer fits localStorage (j6 save() swallows it: every later save is lost)
380:PAGE CONSOLE error ×2: [rt] localStorage.setItem failed: QuotaExceededError key hclh-save-v2-1 (5247844 chars): Failed to execute 'setItem' on 'Storage': Setting the value of 'hclh-save-v2-1' exceeded the quota.
381:PAGE CONSOLE error ×3: [rt] localStorage.setItem failed: QuotaExceededError key hclh-save-v2-1 (5247844 chars): Failed to execute 'setItem' on 'Storage': Setting the value of 'hclh-save-v2-1' exceeded the quota.
384:PAGE CONSOLE error ×100: [rt] localStorage.setItem failed: QuotaExceededError key hclh-save-v2-1 (5262661 chars): Failed to execute 'setItem' on 'Storage': Setting the value of 'hclh-save-v2-1' exceeded the quota.
386:STATUS flight2-s2g · buổi 2572 · year 18 · rank 0 · bugs 7 · stuck 0 · dead buttons 0
390:PAGE CONSOLE error ×200: [rt] localStorage.setItem failed: QuotaExceededError key hclh-save-v2-1 (5282277 chars): Failed to execute 'setItem' on 'Storage': Setting the value of 'hclh-save-v2-1' exceeded the quota.
393:CP buổi 2600 year 18 save 5154622 chars
394:CP SAVE ERROR: setItem failed 259× — QuotaExceededError key hclh-save-v2-1 (5299793 chars)
395:BUG SAVE STALE stored b2550 live b2600 chars 5154622 (stored clock 18.218.2.3, live 18.223.2.1, QuotaExceededError)
396:BUG game SAVE STALE: the stored save stopped following the live game (QuotaExceededError)
```

Shot (VM only, not in git): /home/user/wt/out5/shots-flight2-s2g/m-look-2600.png
