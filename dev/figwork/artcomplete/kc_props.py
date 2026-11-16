# kc_props.py: prop sets for kc c11+ (vary from c01-c10 fan/handkerchief/beads). prints "jid ref ref2 prompt"
import json,sys
J=json.load(open("kc_jobs.json")); T=open("kc_prompt.txt").read().strip()
SETS=[("holding a folded paper fan","holding a small embroidered silk sachet","holding a small bronze hand-warmer"),
("holding a sprig of plum blossom","holding a rolled book scroll","holding a small jade ruyi sceptre"),
("holding a lotus flower","holding a small lidded teacup on a saucer","resting one hand on a carved wooden walking cane"),
("with a long silk shawl draped over both forearms","hands folded in front, a jade bangle on the wrist","holding a small bronze incense burner"),
("holding a small embroidery hoop","holding a closed account ledger","holding a folded paper fan"),
("holding a small flower basket","holding a sprig of osmanthus","holding a small red sandalwood box")]
A=("holding a round silk fan","hands folded in front holding a handkerchief","holding a string of prayer beads")
ids=sys.argv[1:]
for i,jid in enumerate(ids):
    j=J[jid]; n=int(jid[-2:]); s=SETS[((n-11) if jid.startswith("kc-c") else (n-1))%len(SETS)]; p=T.replace("<PALETTE>",j["pal"])
    for a,b in zip(A,s): assert a in p; p=p.replace(a,b)
    print(json.dumps({"jid":jid,"ref":j["ref"],"ref2":j["ref2"],"prompt":p},ensure_ascii=False))
