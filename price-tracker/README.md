# BENARIAN Hotel Price Tracker

Production-oriented Cloudflare Worker for verified hotel prices, price history, deal ranking and hotel watches.

## Activation checklist

1. Create the D1 database and replace the placeholder database ID in `wrangler.jsonc`.
2. Apply `migrations/0001_initial.sql`.
3. Register with Hotelbeds/HBX and store `HOTELBEDS_API_KEY` and `HOTELBEDS_SECRET` as Worker secrets. Never commit credentials.
4. Add production searches using real Hotelbeds destination codes.
5. Deploy the Worker and map `api.benarian.com`.
6. Verify `/v1/health`, then update the website only after the supplier connection is healthy.

The public deals page intentionally shows no prices until verified supplier data exists.