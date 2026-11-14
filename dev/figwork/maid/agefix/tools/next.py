# next.py [N] : print next N "jid srcgen cropX" not yet in ages.txt
import sys,os
H=os.path.dirname(os.path.abspath(__file__)); os.chdir(H)
REM=os.environ.get("REM","rem.txt"); LED=os.environ.get("LED","ages.txt")
done={l.split()[0] for l in open(LED)} if os.path.exists(LED) else set()
rem=[l.strip() for l in open(REM) if l.split() and l.split()[0] not in done]
n=int(sys.argv[1]) if len(sys.argv)>1 else 8
print(len(rem),"left"); print("\n".join(rem[:n]))
