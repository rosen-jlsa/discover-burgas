"""Independent Supabase REST verification using only Python's standard library."""
import json
import os
import sys
import urllib.parse
import urllib.request


def load_local_env(path=".env.local"):
    """Load a simple Next.js env file without overriding the process environment."""
    if not os.path.exists(path):
        return
    with open(path, encoding="utf-8") as env_file:
        for raw_line in env_file:
            line = raw_line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            name, value = line.split("=", 1)
            value = value.strip().strip('"').strip("'")
            os.environ.setdefault(name.strip(), value)


load_local_env()

url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "").rstrip("/")
key = os.environ.get("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "")
if not url or not key:
    print("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", file=sys.stderr)
    raise SystemExit(2)

query = urllib.parse.urlencode({"select": "slug,latitude,longitude,translations,sources", "status": "eq.PUBLISHED", "order": "slug.asc"})
request = urllib.request.Request(f"{url}/rest/v1/landmarks?{query}", headers={"apikey": key, "Authorization": f"Bearer {key}"})
with urllib.request.urlopen(request, timeout=20) as response:
    rows = json.load(response)

errors = []
for row in rows:
    if row.get("latitude") is None or row.get("longitude") is None:
        errors.append(f"{row.get('slug')}: missing coordinates")
    translations = row.get("translations") or {}
    if not all(locale in translations for locale in ("bg", "en")):
        errors.append(f"{row.get('slug')}: missing bg/en translation")
    if not row.get("sources"):
        errors.append(f"{row.get('slug')}: missing sources")

if not rows:
    errors.append("no published landmarks returned")
print(json.dumps({"published": len(rows), "errors": errors}, ensure_ascii=False, indent=2))
raise SystemExit(1 if errors else 0)
