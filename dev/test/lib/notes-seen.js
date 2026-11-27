/* Shared test helper (rv27, LAW 11): a test that wipes the storage (localStorage.clear()) and then starts or loads a life is a player whose
   «Điều mới trong cung» notes are already settled. The wipe also removes jnotes' record (ctm-notes-seen); with a sổ in the slot (the save stack
   writes it at once at a life start, jqSaveNow) jnotes then sees «a sổ exists, notes unseen» = an OLD player and queues the notes pop-up at the
   first calm moment, in front of the test's next tap (goal-links Fold «đi tới» 3/13, q-softlock). This keeps the record across every wipe.
   Usage: const {keepNotesSeen}=require('./lib/notes-seen'); await keepNotesSeen(ctxOrPage);   // before page.goto
   update-notes.js (the notes test itself) resets the record with CTM_NOTES_UI.reset(), which this does not touch. */
async function keepNotesSeen(target){
  await target.addInitScript(()=>{try{const c0=Storage.prototype.clear;Storage.prototype.clear=function(){const r=c0.apply(this,arguments);
    try{const u=window.CTM_NOTES_UI;if(this===window.localStorage&&u&&u.list&&u.list.length)this.setItem('ctm-notes-seen',u.list[0].id)}catch(e){}return r}}catch(e){}});
}
module.exports={keepNotesSeen};
