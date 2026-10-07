# Manav Tailor portfolio SEO

The homepage title is `Manav Tailor`. Its description and visible about section describe Manav's frontend and full stack development work. The HTML also includes a canonical URL, social sharing metadata, and linked WebSite, ProfilePage and Person JSON-LD using the existing GitHub and LinkedIn profiles.

Vite copies `public/robots.txt` and `public/sitemap.xml` into the production build. The sitemap lists the homepage only: section anchors are parts of that page, not separate pages.

## Publish and request indexing

1. Run `npm ci` and `npm run build`, then deploy the updated project to Vercel with output directory `dist`.
2. Choose a permanent production URL in Vercel. The current SEO configuration uses the supplied URL: `https://manav-tailor.vercel.app/`. If Vercel assigns a different production domain, update every occurrence in `index.html`, `public/robots.txt` and `public/sitemap.xml`, rebuild and deploy. Redirect old public URLs to the permanent one where possible.
3. Confirm the deployed homepage, `/robots.txt` and `/sitemap.xml` are publicly accessible without login and return HTTP 200. In Vercel, ensure Deployment Protection is disabled for the production site. Check that response headers do not contain `X-Robots-Tag: noindex`; a meta tag cannot override that header.
4. Open [Google Search Console](https://search.google.com/search-console/) using the owner's Google account. Add a **URL-prefix property** for the exact public URL. Follow Google's verification instructions. If using an HTML verification file, put the downloaded file in `public/` and redeploy; if using a verification meta tag, add the exact supplied tag to the HTML head and redeploy. Keep verification in place.
5. In Search Console's **Sitemaps**, submit `sitemap.xml`.
6. Inspect the homepage URL, run **Test live URL**, resolve any access/indexing errors, then click **Request indexing**. This requires the owner's verified Search Console account; source code alone cannot submit the request.
7. Add the same permanent portfolio URL to your GitHub and LinkedIn profiles. Track impressions, clicks and queries in Search Console, especially `Manav Tailor` and relevant developer portfolio searches.

## Expectations

SEO makes the portfolio easier to understand and discover; it cannot guarantee indexing, a number-one ranking, or the exact title Google displays. Broad searches such as `frontend developer` and `full stack developer portfolio` are competitive. Useful project write-ups, relevant links and a consistently used public URL support ongoing discovery. Avoid stuffing misspellings or repeated keywords into the page.

Google's guidance: [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [title links](https://developers.google.com/search/docs/appearance/title-link), and [requesting a recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
