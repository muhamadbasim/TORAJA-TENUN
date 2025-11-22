---
description: Deploy to Cloudflare Pages
---

# Deploy to Cloudflare Pages

This workflow guides you through deploying your React application to Cloudflare Pages.

## Prerequisites

1.  **Cloudflare Account**: You need a Cloudflare account.
2.  **Wrangler CLI**: We will use `npx wrangler` (no need to install globally).

## Steps

1.  **Login to Cloudflare**
    Run the following command to authenticate wrangler with your Cloudflare account. It will open a browser window.
    ```powershell
    npx wrangler login
    ```

2.  **Build the Project**
    Create the production build of your application.
    ```powershell
    npm run build
    ```

3.  **Deploy**
    Deploy the `dist` folder to Cloudflare Pages. You will be asked to create a new project name (e.g., `toraja-tenun`).
    ```powershell
    npx wrangler pages deploy dist
    ```

4.  **Environment Variables**
    If you are using `GEMINI_API_KEY`, you need to set it in the Cloudflare Dashboard or via command line (if supported for pages, usually dashboard is easier for secrets).
    
    *   Go to Cloudflare Dashboard > Pages > Your Project > Settings > Environment variables.
    *   Add `GEMINI_API_KEY` and your value.
    *   **Redeploy** usually required for env vars to take effect if they are build-time, but since we use `process.env` shimmed by Vite, they are baked in at build time. 
    *   **IMPORTANT**: Since we are using `vite.config.ts` `define` to bake in the key:
        ```ts
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        ```
        You MUST have the `.env` file present locally when you run `npm run build`. The key will be embedded in the HTML/JS. 
        **WARNING**: This exposes your API key to the public. For a frontend-only app using Gemini, this is often unavoidable unless you use a backend proxy. Ensure your API key has restrictions (e.g., HTTP referrer) in Google Cloud Console.

## Verification
- Visit the URL provided by Wrangler after deployment.
- Check if the site loads and navigation works (handled by `_redirects`).
