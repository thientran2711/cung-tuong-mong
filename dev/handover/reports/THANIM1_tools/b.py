SAME=("Same elderly empress dowager, same soft hand-painted storybook style, same large gold phoenix crown with pearl strings, same silver-grey hair, same royal yellow (#EFBD69) brocade robe with deep plum (#6E3A5E) collar, bare earlobes, no earrings")
T={
"gian":("red","ANGRY but restrained","shoulders drawn up stiffly, both hands resting tense on the gold rim; stern frown, narrowed eyes, mouth closed, one small steam puff by her crown"),
"hanghai":("bright coral","EAGER","shoulders lifted eagerly, chin up, both hands resting on the gold rim; bright determined eyes, small eager smile, no raised fist"),
"chuyentam":("warm cream-beige","calmly FOCUSED","her chin resting lightly on one hand on the gold rim, the other hand still; steady calm eyes, closed mouth, no book, no props"),
"vui":("warm sunny yellow","HAPPY","both hands resting on the gold rim, a gentle happy laugh; sparkling eyes, warm open smile, three tiny gold sparkles by her crown"),
"buon":("pale blue","SAD","both hands resting folded on the gold rim; droopy eyes looking down, small pout, one tear on her cheek, one tiny pale-blue raincloud above her head"),
}
for k,(col,cap,d) in T.items():
    print(k,"|",f"{SAME}, same round gold-rimmed {col} medallion as the reference. NEW: she is {cap} and leans slightly OUT of the round medallion toward the viewer: her head and shoulders come a little forward over the gold rim, her hands overlap the gold ring; small calm gesture only, no big arms, no waving, no extra hands; {d}. Wide royal yellow sleeves with plum cuffs visible. Both eyes looking together. The medallion stays round and centred, a bit smaller, with her popping slightly out of it. Whole picture on a flat pure chroma green (#00FF00) background, nothing else, no text.")
