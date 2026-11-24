# KP23 redraw — gen worker steps (D1-KP23RD hands you a list of keys)
For EACH key, in this order, one at a time or several in parallel:
1. Read the prompt file `/home/user/cung-tuong-mong/dev/art/kp23-redraw/txt/<key>.txt` (whole file, exact text).
2. Call the Magnific tool `images_generate` (load it with ToolSearch "select:mcp__4c7ac879-56e4-477d-a542-344302dc7827__images_generate,mcp__4c7ac879-56e4-477d-a542-344302dc7827__creations_wait") with EXACTLY:
   prompt = the file text, byte for byte (do not shorten, rewrite or add anything)
   mode = "gpt-2-6", resolution = "2k", aspectRatio = "3:4", count = 1
   folderReference = "d06c0d09-6b77-49b7-9b61-6c5057ca21ed"
   references = [{"type":"image","identifier":"VXJxowRMMU"}]
3. `creations_wait` until completed (repeat if not terminal). Never start a second gen for the same key.
4. Download the full `url` with curl to `/tmp/claude-0/-home-user-cung-tuong-mong/d35a73e1-e014-5dd4-8abd-21c4aa8c02d4/scratchpad/new/<key>.png`
5. Run `python3 /home/user/cung-tuong-mong/dev/art/kp23-redraw/make_webp.py <that png> <key>`
Do NOT look at the pictures, judge them, regenerate, upload, commit or push. Do not edit any file.
Return ONLY lines `<key> <creation identifier> <ok|error: reason>`.
