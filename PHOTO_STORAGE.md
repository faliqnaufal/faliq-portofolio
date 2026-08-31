# Permanent portfolio photo configuration

The deployed photo baseline is stored in:

- `public/portfolio-photos-config.json`
- `public/portfolio-images/`

The JSON keeps the existing photo IDs plus zoom and X/Y offsets. Image bytes are stored as static image files instead of base64 strings, so the browser does not need to download a ~19 MB JSON document before it can render the page.

At runtime, `ImageStoreContext` loads `portfolio-photos-config.json` as the canonical public configuration. Browser `localStorage` and IndexedDB are used only for owner-side draft edits. A public reload always starts from the deployed configuration.

To permanently publish future owner edits, export the JSON, convert any base64 image values to files under `public/portfolio-images/`, update `public/portfolio-photos-config.json`, then redeploy the repository.
