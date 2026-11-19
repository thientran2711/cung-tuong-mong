"""Check: for every consort, the a26..a65 Nữ đế prompt = her a18 prompt + the SAME age edits as c01 (only pose/hands item slots differ). Lets the painter build age prompts from a18 safely."""
import re,subprocess,sys,difflib
def P(c,a): return subprocess.run([sys.executable,"dev/art/store-all/build_all.py",c,"nude","--age",a],capture_output=True,text=True).stdout
def norm(x): return re.sub(r"Her hands and body:[^.]*\.","HANDS.",re.sub(r"Pose: calm standing pose; she holds[^.]*\.","POSE.",x))
def edits(c,a):
    x,y=norm(P(c,"a18")),norm(P(c,a)); sm=difflib.SequenceMatcher(None,x,y,autojunk=False)
    return [(x[i1:i2],y[j1:j2]) for t,i1,i2,j1,j2 in sm.get_opcodes() if t!="equal"]
ref={a:edits("c01",a) for a in ("a26","a36","a51","a65")}
for n in range(2,33):
    c=f"c{n:02d}"; r=[a for a in ref if edits(c,a)!=ref[a]]
    print(c,"OK" if not r else "DIFF "+",".join(r))
