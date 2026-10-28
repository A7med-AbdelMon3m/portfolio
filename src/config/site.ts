/** Injected by vite.config.ts from VITE_SITE_URL, Netlify's URL, or a default. */
export const SITE_URL: string = __SITE_URL__;

// The Formspree form ID is public by design. VITE_CONTACT_ENDPOINT overrides it.
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || "https://formspree.io/f/mwlllvpl";
/** Only https endpoints are accepted, so a typo can never send form data over plain HTTP. */
export const CONTACT_ENDPOINT = endpoint.startsWith("https://") ? endpoint : "";
