#!/usr/bin/env python3
import json
import sys
from typing import Any, Dict


def handle_request(message: Dict[str, Any]) -> Dict[str, Any]:
    fn = message.get("fn")
    payload = message.get("payload", {})

    if fn == "run_model":
        # For now, directly call Bass runner. Could be extended to dynamic entry dispatch.
        try:
            from models.bass_diffusion import run_bass
        except Exception as import_error:  # Fallback using absolute style if needed
            raise RuntimeError(f"Failed to import Bass model: {import_error}")
        return run_bass(payload)

    raise ValueError(f"Unknown function: {fn}")


def main() -> None:
    try:
        line = sys.stdin.readline()
        if not line:
            raise RuntimeError("No input received on stdin")
        message = json.loads(line)
        result = handle_request(message)
        sys.stdout.write(json.dumps(result) + "\n")
        sys.stdout.flush()
    except Exception as e:
        err = {"error": str(e)}
        sys.stdout.write(json.dumps(err) + "\n")
        sys.stdout.flush()


if __name__ == "__main__":
    main()