#!/usr/bin/env python3
"""Generate an image via the Gemini API and save it.

Usage: python gen_image.py "<prompt>" <output_path> [model]
Key is read from the GEMINI_KEY environment variable (never hard-coded).
"""
import base64
import json
import os
import sys
import urllib.request

KEY = os.environ["GEMINI_KEY"]
MODELS = [
    "gemini-3-pro-image-preview",
    "gemini-2.5-flash-image",
]


def generate(prompt, out_path, model):
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{model}:generateContent?key={KEY}"
    )
    body = json.dumps(
        {"contents": [{"parts": [{"text": prompt}]}]}
    ).encode("utf-8")
    req = urllib.request.Request(
        url, data=body, headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=180) as resp:
        data = json.loads(resp.read())

    parts = data["candidates"][0]["content"]["parts"]
    for part in parts:
        inline = part.get("inlineData") or part.get("inline_data")
        if inline:
            img = base64.b64decode(inline["data"])
            with open(out_path, "wb") as f:
                f.write(img)
            return len(img)
    raise RuntimeError("No image in response: " + json.dumps(data)[:500])


if __name__ == "__main__":
    prompt, out_path = sys.argv[1], sys.argv[2]
    forced = sys.argv[3] if len(sys.argv) > 3 else None
    models = [forced] if forced else MODELS
    last_err = None
    for m in models:
        try:
            n = generate(prompt, out_path, m)
            print(f"OK  {m}  ->  {out_path}  ({n} bytes)")
            break
        except Exception as e:  # noqa: BLE001
            last_err = e
            print(f"FAIL {m}: {str(e)[:300]}")
    else:
        raise SystemExit(f"All models failed. Last: {last_err}")
