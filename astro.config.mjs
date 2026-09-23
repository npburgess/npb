// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://npb.me",
	// Canonical URLs carry a trailing slash. This matches the default "directory"
	// build format (pages emit as `/path/index.html`, so GitHub Pages 301s the
	// no-slash form to the slash form). Setting it explicitly rather than relying
	// on the "ignore" default documents the intent and keeps canonicals, the
	// sitemap, and internal links aligned on one form — avoids the GSC
	// "page with redirect" noise from mixed no-slash/slash URLs.
	trailingSlash: "always",
	integrations: [mdx(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
		// Pre-bundle so the dev server doesn't re-optimize mid-session (avoids the
		// "Outdated Optimize Dep" 504 when the contact-form island first loads).
		optimizeDeps: {
			include: ["@emailjs/browser"]
		}
	}
});
