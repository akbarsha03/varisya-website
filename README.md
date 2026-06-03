# varisya-website

Premium marketing/pricing site for **Varisya** — a tailored, self-hosted deployment of Books, Inventory, Billing & Storefront, sold as a customization + SLA-support retainer (the premium counterpart to 399apps).

- **Live:** https://varisya.com (Cloudflare Pages)
- **Stack:** static HTML/CSS (no build) in `public/`
- **Deploy:** push to `main` → GitHub Actions → `wrangler pages deploy` (Cloudflare Pages project `varisya`)

## Local preview
Open `public/index.html` in a browser.

## Deploy
Automatic on push to `main`. Requires repo secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
