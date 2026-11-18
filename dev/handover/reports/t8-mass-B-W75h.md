# t8-mass-B W75h — c24 a36 done; rest TODO
Same recipe as W75f handover (dev/handover/reports/t8-mass-B-W75f.md); fin script t8-mass-B-W75f-fin.py unchanged. Frozen builder only, no code changes.
## Done
c24 a36: sheet c24_a36_sheet.jpg in img/_review/t8-reprompt/ (CDN synced + --check ok). md5[:8] t8 v0/v1/v2 72169f64/2aa8f8d8/b67c97f7 ; t7 a4a2b7cd/76028d5d/75f087e6. READY sent to Foreman C (use mcp__claude-code-remote__send_message, not SendMessage).
## TODO: c24 a51 (ref upload url .../img/hd/fig-consort-c24-t1-a51.webp), c25 a26/a36/a51.
## Tips
- Prompts: t7 v1/v2 differ from t7 v0 only in 2 substitutions (robe colour word in Outfit + COLOUR RULE clause); diff v0 vs vN to save context, but pasted prompt must equal build.py output exactly.
- Ref upload ids are per session (re-upload). images_generate: width 1024 height 2304 resolution 2k, refs [{image,upload},{style,eIyOFEidqL}], folder ba4aecfe-...
- Each person-age costs ~35-40k tokens.
