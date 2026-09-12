# Valcare Deployment Documentation

## Payment Worker

The Paystack payment backend is deployed as a Cloudflare Worker.

- Worker name: `valcare-payments`
- Worker URL: `https://valcare-payments.frankokyere910.workers.dev`
- Entry point: `worker/index.js`
- Configuration: `wrangler.jsonc`

The Paystack secret is stored securely in Cloudflare as:

```text
PAYSTACK_SECRET_KEY
```

It is not stored in the repository.

## Worker Configuration

The root `wrangler.jsonc` contains:

```json
{
  "name": "valcare-payments",
  "main": "worker/index.js",
  "compatibility_date": "2026-09-08"
}
```

## Deployment

From the project root:

```powershell
npx wrangler deploy
```

## Frontend Payment Endpoint

The frontend should call:

```text
https://valcare-payments.frankokyere910.workers.dev/initialize
```

Payment amounts are sent in minor units. For example:

- GH₵18.00 = `1800`
- Currency code = `GHS`

## GitHub Deployment

Before committing, verify that secret keys are not present in tracked files.

```powershell
git status
git add DEPLOYMENT.md wrangler.jsonc worker/index.js
git commit -m "Document Paystack Worker deployment"
git push origin master
```

If the branch is `main`, use:

```powershell
git push origin main
```

## Troubleshooting

Check Cloudflare Worker logs at:

Cloudflare Dashboard → Workers & Pages → `valcare-payments` → Logs

The Paystack secret can be replaced through:

Cloudflare Dashboard → Workers & Pages → `valcare-payments` → Settings → Variables and Secrets