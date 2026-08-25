// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://npb.me",
	integrations: [react(), mdx(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
		// Pre-bundle so the dev server doesn't re-optimize mid-session (avoids the
		// "Outdated Optimize Dep" 504 when the contact-form island first loads).
		optimizeDeps: {
			include: ["@emailjs/browser"]
		}
	}
});
