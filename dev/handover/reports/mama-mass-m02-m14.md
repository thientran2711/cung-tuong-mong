# MA MA mass, range m02-m14 (mama-mass helper, Foreman C ROOT-47). PAUSED by owner Luot 423 (postpone): no new gens after the in-flight ones.

Recipe = m01 approved (ec5fcd559), unchanged: prompt = exact build.py stdout (mama-specs/mNN-aXX.prompt.txt), refs style 6AbGv6EiJO / own live maid face / costume 79fNlPEJAL, gpt-2-6 1024x2304 2k seed 7172, then remove_bg. a65 face ref = her a51 (all fig-maid-mNN-a65 are 404).
Store check: run as `check_store.py <file> mNN --state mama --age aXX` -> 33/33 PASS. Without --age the store defaults to a18 and FAILS on the age/colour slot sentences (the m01 PASS without --age is vacuous: the a18 store build of m01 crashes and gives empty text).

## Done: 11 persons x 3 ages = 33 pictures (mNN aXX -> gen id / cut id)
| person | age | gen | cut |
|---|---|---|---|
| m02 | a36 | iG58H2d3uK | 8aiL6KUIrU |
| m02 | a51 | 4RFdEwT9Aa | MBJb7QFDCm |
| m02 | a65 | DoO5wTRpcl | jUoGB2nLD0 |
| m03 | a36 | 6AbobNqiJO | 0eUFyPmTfW |
| m03 | a51 | nVsClcPYQD | EbYOVe1uuO |
| m03 | a65 | WDguSDjcXe | rgX2tC8xtc |
| m04 | a36 | cpSQwt30eP | xSBAmQejfW |
| m04 | a51 | 79fVEceJAL | lJtYfkXgv9 |
| m04 | a65 | If3sZl1tvE | YMlE72KWeC |
| m07 | a36 | CqnJciDEEy | xSBAmktjfW |
| m07 | a51 | 6AbokQniJO | If3sG8VtvE |
| m07 | a65 | EbYO0WHuuO | jUoGv4OLD0 |
| m08 | a36 | mEZgcaFhJQ | DoO5YIypcl |
| m08 | a51 | vQAUTQka47 | 1ldZF79r4r |
| m08 | a65 | xSBAa7QjfW | KLp3u7rkqp |
| m09 | a36 | s7InH7vl8e | TdwHGhWVNR |
| m09 | a51 | xSBAuJAjfW | p8yKWQQehw |
| m09 | a65 | P3QeLW642C | rgX2Hi3xtc |
| m10 | a36 | nVsCNfRYQD | YMlERitWeC |
| m10 | a51 | EbYOo40uuO | rgX2HHpxtc |
| m10 | a65 | UPv0kdfwny | rgX2Hbdxtc |
| m11 | a36 | WDgu3s3cXe | SyhcrscUb8 |
| m11 | a51 | Lw8zqIpswO | JNCMswkOq4 |
| m11 | a65 | lJtY5ERgv9 | iG58Oi43uK |
| m12 | a36 | vQAU8Xpa47 | kseRKYK16B |
| m12 | a51 | eIPkTTSdqL | nVsCzKZYQD |
| m12 | a65 | hu2SomwvqL | 5jDib0LKxe |
| m13 | a36 | w4aTg4K7EI | SyhcgIKUb8 |
| m13 | a51 | CqnJv1kEEy | s7InLIUl8e |
| m13 | a65 | Lw8zrNEswO | yiupOQFPW9 |
| m14 | a36 | iG58NdW3uK | s7InLhel8e |
| m14 | a51 | VX7q0HwMMU | kseRK8J16B |
| m14 | a65 | iG58Nmp3uK | Lw8zjfMswO |

Sheets: img/_review/mama-mass/mama-m02-m07.jpg (m02 m03 m04 m07), mama-m08-m11.jpg, mama-m12-m14.jpg. Cuts: img/_review/mama-mass/cuts/mNN-aXX.png.

## Not done
- m05 (all 3 ages): SKIPPED, builder crash `build.py m05 --state mama --age a51` and `--age a65`: AssertionError 'PRE frontal sentence' (build_mama l.960).
- m06 (all 3 ages): SKIPPED, same builder crash for `--age a51` (a36/a65 build fine; person skipped per brief).

## Flagged for redo (no redo used: owner pause came first)
- m14 a65: robe came out grey-green, not deep ivory (the builder elder sentence carries '(for green: a dusky green-grey)' for every colour; probably steers non-green colours greenish).
- m12 a65: dusky gold reads olive/khaki-brown at sheet size (prompt says never brown).
- m04 a65 / m08 a65: dusky rose-brown shade, still in family; acceptable but weakest.

Credits: 33 gens x 135 + 33 remove_bg x 3 = 4,554 (cap 7,000).
