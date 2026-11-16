# How to keep the canon (dev/rules)
1. New owner line in dev/OWNER_DECISIONS.md → copy it UNCHANGED as "[OD:Lnn] <text>" into ONE file: the START file of the role that always needs it (START_CORE = every role), otherwise the matching dev/rules/topic/<topic>.md (list with scopes: dev/PRIORITY_RULES.md); grep -rn '\[OD:Lnn\]' dev/rules first — a tag lives in exactly one file.
2. Overwrite in place (owner OD:L1232): if it changes an existing rule, delete the old line and put the new one IN ITS SLOT in the same file; never keep the old one with a "changed to" note. If the old line is only partly changed, keep both, new one directly after it.
3. After any edit run `python3 dev/rules/make_index.py` from the repo root to regenerate the indexes dev/PRIORITY_RULES.md and dev/art/OWNER_ART_RULES.md (file sizes + start sets).

Start sets: Main = START_CORE + START_FOREMAN + START_MAIN; Foreman = START_CORE + START_FOREMAN; Worker = START_CORE + START_WORKER; Reviewer = + START_REVIEWER; Art = START_CORE + START_WORKER + START_ART. Split history: dev/handover/reports/canon-pairs.md.
