# BENARIAN Travel Stories — Cloudflare activation

The website and upload API are already in the repository. Complete these steps once in Cloudflare Pages.

## 1. Create D1 database

Create a D1 database, for example `benarian-stories`.

Open its Console and run the SQL in:

`database/stories-schema.sql`

## 2. Create R2 bucket

Create an R2 bucket, for example:

`benarian-story-media`

Keep it private. The upload function stores new files under `pending/<story-id>/`.

## 3. Add Pages bindings

Open the BENARIAN Pages project:

Settings → Bindings

Add a D1 binding:

- Variable name: `STORIES_DB`
- Database: your `benarian-stories` D1 database

Add an R2 binding:

- Variable name: `STORIES_MEDIA`
- Bucket: your `benarian-story-media` bucket

Add the same bindings to both Production and Preview if required.

## 4. Redeploy

Redeploy the latest main branch. The form posts to:

`/api/stories`

Successful submissions are saved with status `pending` and are not public automatically.

## Limits currently enforced

- Maximum 20 media files per story
- JPG, PNG, WEBP and MP4 only
- Maximum 15 MB per file
- Text is stored in D1
- Media is stored privately in R2
- New submissions are marked `pending`
