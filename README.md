# Ahmed AbdelMonem, portfolio

Vite + React + TypeScript + Tailwind. English and Arabic (right-to-left), light and dark themes.

## Run

```sh
npm install
npm run dev        # http://localhost:8080
npm run build      # production build in dist/
npm run typecheck
```

Copy `.env.example` to `.env` and set:

- `VITE_SITE_URL`: optional. The public URL used for canonical links, Open Graph, sitemap.xml and robots.txt. On Netlify it is detected automatically; set it only when you add a custom domain.
- `VITE_CONTACT_ENDPOINT`: your Formspree (or similar) endpoint. If empty, the contact form opens the visitor's mail app instead.

## Where to edit content

Everything you would update lives in `src/content/`. Pages never contain copy.

| File | What it controls |
| --- | --- |
| `projects.ts` | Project register, filters, home page picks, and the counts in the hero diagram |
| `experience.ts` | Experience timeline |
| `credentials.ts` | Education and certificates (add the images in `src/assets/certs`) |
| `skills.ts` | Skill groups and software |
| `resources.ts` | The Resources page |
| `profile.ts` | Name, email, phone, links, CV path |

Every text has an `en` and an `ar` version. UI strings are in `src/i18n/en.ts` and `src/i18n/ar.ts`; the compiler flags any key missing from the Arabic file.

To add a project: add one object to `projects.ts`. Mark it `featured: true` to show it on the home page.

## Security

- `public/_headers` (Netlify, Cloudflare Pages) and `public/.htaccess` (Apache) set CSP, HSTS, `X-Frame-Options`, `nosniff`, Referrer-Policy and Permissions-Policy. Hosts that cannot set headers (Lovable hosting) still get a CSP `<meta>` from the build.
- No inline scripts and no third-party scripts.
- Contact form: zod validation with length limits, honeypot field, minimum fill time, one message per minute, 10 s timeout, https-only endpoint.
- The chatbot iframe is sandboxed and loads only after the visitor clicks.
- All external links use `rel="noopener noreferrer"`.
- Fonts are self-hosted, so no request goes to Google Fonts.

If the form endpoint is not `formspree.io`, add its origin to `connect-src` in `public/_headers` and `public/.htaccess`.

## Notes

- The CV button opens the Google Drive file set in `src/content/profile.ts`. Replace the file in Drive (keeping the same link) and the site shows the new version with no redeploy.
- `sitemap.xml` and `robots.txt` are generated at build time.
- Old URLs (`/skills`, `/electrical-gems`, `/ai-electrical-assistant`) redirect to the new pages.
