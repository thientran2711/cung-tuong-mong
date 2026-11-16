#!/usr/bin/env python3
"""review/weekbook-entries scan: python3 dev/test/weekbook-entries-scan.py before.json after.json
Input = JSON written by dev/test/weekbook-entries-scan.js (every week-book page of bot games, one snapshot per week).
Counts, over every person page (Hoàng thượng, Thái hậu, Hoàng hậu, phi tần, servants) and her own page:
 - unrelated: an entry that neither names the person nor carries one of the person's own numbers
 - raw: card promise / hint text (kèm:, thành:, ai gặp ta cũng nhìn, (thẻ ...), table dumps)
 - foreign: an entry on a person page carrying HER stat numbers (Danh/Sức/Bạc/Đức/Tai mắt) of an act done to someone else
 - sum: a relation row whose week change differs from the sum of the numbers listed in that page's entries"""
import json,re,sys
RAW=re.compile(r"(^|\s)·\s*(kèm|thành|hỏng)\s*:|ai gặp ta cũng nhìn|\(thẻ [^)]*\)|chọn món trong rương|Sổ thị tẩm:|Dùng được ở thẻ")
OWN=re.compile(r"\b(Danh|Sức|Bạc|Đức|Tai mắt|Ân tình|Tài|Sắc)\s+(-?\d+\s*(?:→|->)\s*-?\d+|[+\-−]\d+)")
TOK=re.compile(r"(Sủng(?: của [^\d,.;]+?)?|Thái hậu|Hoàng hậu|[A-ZÀ-Ỹ][\wÀ-ỹ]*(?: [A-ZÀ-Ỹ][\wÀ-ỹ]*){0,3})?\s*(quý ngươi|quý ta|thiện cảm|oán ngươi|oán ta|oán|ghen|Sủng)?\s*(-?\d+\s*(?:→|->)\s*-?\d+|[+\-−]\d+)")
def val(v):
    v=v.replace("−","-");m=re.match(r"(-?\d+)\s*(?:→|->)\s*(-?\d+)$",v)
    return int(m.group(2))-int(m.group(1)) if m else int(v)
def rowkey(l):
    return "oan" if "oán" in l else "ghen" if "ghen" in l else "sung" if "sủng" in l else "aff"
def analyse(path):
    R=json.load(open(path));c=dict(pages=0,entries=0,unrelated=0,raw=0,foreign=0,rows=0,sumbad=0,mine_entries=0,mine_raw=0)
    ex=[]
    for g in R:
        for pg in g["pages"]:
            if pg.get("kind")!="person":continue
            c["pages"]+=1;k=pg["k"];nm=pg.get("name","");fs=pg["facts"]
            for f in fs:
                c["entries"]+=1
                if RAW.search(f):c["raw"]+=1;ex.append(("raw",pg["title"],f[:110]))
                rel=(k=="emp" and re.search(r"Hoàng thượng|Sủng|Thánh|ngài",f)) or (k=="th" and "Thái hậu" in f) or (k not in("emp","th") and (nm and nm.split()[-1] in f or nm in f or re.search(r"\b(nàng|hắn)\b",f,re.I)))
                if k=="emp":own=bool(re.search(r"Sủng [+\-−0-9]",f))
                elif k=="th":own=bool(re.search(r"Thái hậu[^.]*?[+\-−]\d|Thái hậu[^.]*?\d\s*→",f))
                else:own=bool(re.search(r"(thiện cảm|oán|ghen|quý ngươi)\s*[+\-−]?\d",f))
                if not (rel or own):c["unrelated"]+=1;ex.append(("unrelated",pg["title"],f[:110]))
                if OWN.search(f):c["foreign"]+=1;ex.append(("foreign",pg["title"],f[:110]))
            for r in pg["rel"]:
                if r.get("d") in(None,0) or r["l"].startswith("Ta ") or "tin cậy" in r["l"]:continue
                c["rows"]+=1;key="sung" if k=="emp" else rowkey(r["l"]);s=0
                for f in fs:
                    for m in re.finditer(r"(Sủng của|Sủng|thiện cảm|quý ngươi|quý ta|oán ta|oán ngươi|ghen)\s*(-?\d+\s*(?:→|->)\s*-?\d+|[+\-−]\d+)",f):
                        lab=m.group(1)
                        if lab=="Sủng của":continue
                        kk="sung" if lab=="Sủng" else "oan" if lab.startswith("oán") else "ghen" if lab=="ghen" else "aff"
                        if kk==key:s+=val(m.group(2))
                if s!=r["d"]:c["sumbad"]+=1;ex.append(("sum",pg["title"],f'{r["l"]} d={r["d"]} listed={s}'))
    return c,ex
if __name__=="__main__":
    a=[analyse(p) for p in sys.argv[1:3]]
    keys=[("pages","person pages scanned"),("entries","entries on person pages"),("unrelated","entries unrelated to the page's person"),("raw","raw card/hint/table text entries"),("foreign","her own stat numbers on a person's entry"),("rows","relation rows with a week change"),("sumbad","rows whose change != sum of listed entries")]
    print("| check | before | after |\n|---|---|---|")
    for k,t in keys:print(f"| {t} | {a[0][0][k]} | {a[1][0][k]} |")
    for tag,(c,ex) in zip(("BEFORE","AFTER"),a):
        print("\n"+tag+" examples:")
        seen={}
        for t,ti,f in ex:
            seen.setdefault(t,[]).append((ti,f))
        for t,L in seen.items():
            for ti,f in L[:3]:print("  ",t,"|",ti,"|",f)
