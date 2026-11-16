# PROGRESS review/kpanel-compact (worker, 16/11)
Owner live bug: iPad title menu in a near-full-screen §8.1 frame; picture-left appearing only sometimes; slot rows squeezed; Tiếp tục opened the last tab.
Done (all in the kit, no per-place CSS):
- KIT §8.1 amendment COMPACT SIZE: `dev/build/jkpc.js` (`kitPanelCompact`, `kitCompactFit`, `.kpcompact`), added last in assemble.py. Title menu sits small at the bottom.
- Deterministic layout: jph `kitPhEventLike(m)` gates the event placeholder picture (jph kitEvArt) and the option placeholder picture (jopic) to real events; title/scene menus, confirms, pickers never get a picture slot from load timing (root cause of the 10:36 vs 10:39 shots: EVART loaded or not).
- Slot card: ONE `.kslot` part (j74 CSS) for solo sổ + co-op rooms: rows full width on top, buttons one row below.
- Entering the game opens Hành sự: j6 slot load `d.tab="act"`, jcoopworld rejoin deser.
- Test: dev/test/panel-size.js prints compact/frame/content/empty% per case; new cases confirm, picker-3, title-menu/opt/slots/past.
Not done / notes: title background stays the generic painting (owner correction). Touch-scroll chain belongs to review/modal-scroll; compact only sets height/flex-basis on #mb, never overflow.
