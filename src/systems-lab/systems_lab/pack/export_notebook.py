from __future__ import annotations
import html
from typing import List, Dict, Any

from ..resources.store import Store
from ..resources.uris import make_syslab_uri, parse_syslab_uri


def export_notebook(*, title: str, sections: List[str], format: str = "html", store: Store) -> Dict[str, Any]:
    if format != "html":
        raise ValueError("Only html format supported")
    body = ["<html><body>", f"<h1>{html.escape(title)}</h1>"]
    for uri in sections:
        kind, rel = parse_syslab_uri(uri)
        data = store.read_bytes(kind, rel)
        try:
            text = data.decode("utf-8")
        except Exception:
            text = str(data)
        body.append(f"<pre>{html.escape(text)}</pre>")
    body.append("</body></html>")
    html_bytes = "\n".join(body).encode("utf-8")
    out_uri = make_syslab_uri("viz", "exports", f"{title.replace(' ', '_')}.html")
    store.write_bytes(out_uri, html_bytes)
    return {"uri": out_uri}
