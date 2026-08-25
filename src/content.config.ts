import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			summary: z.string(),
			type: z.enum(["work", "hobby"]),
			featured: z.boolean().default(false),
			liveUrl: z.string().url().optional(),
			repoUrl: z.string().url().optional(),
			tech: z.array(z.string()).default([]),
			cover: image().optional(),
			date: z.coerce.date(),
			draft: z.boolean().default(false)
		})
});

export const collections = { projects };
