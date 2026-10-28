import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const ROUTES = ["/", "/projects", "/experience", "/training", "/credentials", "/tools", "/resources", "/contact"];

/** Content-Security-Policy used as a fallback when the host cannot set response headers. */
function buildCsp(contactOrigin: string): string {
  return [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src 'self'${contactOrigin ? ` ${contactOrigin}` : ""}`,
    "frame-src https://www.chatbase.co",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
}

/** Production builds get the CSP meta tag. Dev keeps it off so Vite's HMR keeps working. */
function productionCsp(contactOrigin: string): Plugin {
  return {
    name: "production-csp",
    apply: "build",
    transformIndexHtml: () => [
      {
        tag: "meta",
        attrs: { "http-equiv": "Content-Security-Policy", content: buildCsp(contactOrigin) },
        injectTo: "head-prepend",
      },
    ],
  };
}

/** Fills the site URL into index.html and generates sitemap.xml and robots.txt, so no file needs editing by hand. */
function siteFiles(siteUrl: string): Plugin {
  return {
    name: "site-files",
    transformIndexHtml: (html) => html.replaceAll("__SITE_URL__", siteUrl),
    generateBundle() {
      const lastmod = new Date().toISOString().slice(0, 10);
      const urls = ROUTES.map(
        (route) => `  <url>\n    <loc>${siteUrl}${route}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
      ).join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  // Netlify exposes the site's primary URL as URL during builds, so the default needs no configuration.
  const siteUrl = (env.VITE_SITE_URL || process.env.URL || "https://ahmedabdelmonem.netlify.app").replace(/\/$/, "");

  let contactOrigin = "https://formspree.io";
  try {
    if (env.VITE_CONTACT_ENDPOINT) contactOrigin = new URL(env.VITE_CONTACT_ENDPOINT).origin;
  } catch {
    /* keep the default */
  }

  return {
    server: { host: "::", port: 8080 },
    plugins: [react(), siteFiles(siteUrl), productionCsp(contactOrigin)],
    define: { __SITE_URL__: JSON.stringify(siteUrl) },
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
    build: {
      target: "es2020",
      sourcemap: false,
      rollupOptions: {
        output: { manualChunks: { react: ["react", "react-dom", "react-router-dom"] } },
      },
    },
  };
});
