# AURORA product assistant

The chat API uses the OpenAI Responses API and the shared product catalog. Keep
the OpenAI API key on the server; do not add it to frontend environment
variables or commit it to source control.

If the backend is unreachable or OpenAI is unavailable, the chat widget clearly
switches to catalog-only product answers. OpenAI-generated replies require the
backend and a valid server-side API key.

## Run locally

Use Node.js 20 or newer. In PowerShell, open a terminal in `Backend` and run:

```powershell
$env:OPENAI_API_KEY = "your-openai-api-key"
npm.cmd start
```

In another terminal, start the frontend from `Frontend` with `npm.cmd run dev`.
The widget sends requests to `http://localhost:3001/api/chat` by default. To use
a different API address, set `VITE_CHAT_API_URL` in the frontend environment
before starting or building Vite.

Optional backend settings:

- `PORT` (default: `3001`)
- `HOST` (default: `127.0.0.1`)
- `OPENAI_MODEL` (default: `gpt-4o-mini`)
- `CHAT_ALLOWED_ORIGINS` (comma-separated; defaults to localhost and
  127.0.0.1 on port 5173)

For a public deployment, configure the allowed frontend origin and add
deployment-level authentication or rate limiting appropriate to the store.
