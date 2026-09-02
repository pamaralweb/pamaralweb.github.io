import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const blogSchema = z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.string().optional(),
    heroImage: z.string().optional(),
    badge: z.string().optional(),
});

export const DISCIPLINES = [
    "Product Design",
    "UX Design",
    "UI Design",
    "UX Research",
    "Design Systems",
    "Design Strategy",
    "Discovery",
] as const;

export const CASE_STATUSES = ["draft", "published"] as const;

const metricSchema = z.object({
    label: z.string(),
    value: z.string(),
    note: z.string().optional(),
    // Um valor absoluto e algo como "R$500 mil" ou "1.2M usuarios".
    // Um valor relativo e algo como "queda de 30%" ou "dobrou a conversao".
    // Casos confidential nao podem ter nenhuma metric com isAbsolute: true.
    isAbsolute: z.boolean(),
});

const summarySchema = z.object({
    problem: z.string().optional(),
    action: z.string().optional(),
    outcome: z.string().optional(),
});

const casesSchemaBase = z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),

    featured: z.boolean().default(false),
    order: z.number().default(0),
    status: z.enum(CASE_STATUSES).default("draft"),

    company: z.string().optional(),
    period: z.string().optional(),
    platform: z.string().optional(),
    disciplines: z.array(z.enum(DISCIPLINES)).default([]),

    myRole: z.string().optional(),
    teamContext: z.string().optional(),

    summary: summarySchema.default({}),
    metrics: z.array(metricSchema).default([]),

    confidential: z.boolean().default(false),
    // private: fora do indice de /trabalhos, mas ainda acessivel por link direto.
    private: z.boolean().default(false),

    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    thumbnail: z.string().optional(),
    thumbnailAlt: z.string().optional(),

    ogImage: z.string().optional(),
    description: z.string().optional(),
});

function isBlank(value: string | undefined): boolean {
    return !value || value.trim() === "";
}

const casesSchema = casesSchemaBase.superRefine((data, ctx) => {
    if (data.status === "published") {
        const requiredForPublish: Array<[string | undefined, (string | number)[]]> = [
            [data.title, ["title"]],
            [data.subtitle, ["subtitle"]],
            [data.company, ["company"]],
            [data.myRole, ["myRole"]],
            [data.cover, ["cover"]],
            [data.coverAlt, ["coverAlt"]],
            [data.thumbnail, ["thumbnail"]],
            [data.thumbnailAlt, ["thumbnailAlt"]],
            [data.description, ["description"]],
            [data.summary.problem, ["summary", "problem"]],
            [data.summary.action, ["summary", "action"]],
            [data.summary.outcome, ["summary", "outcome"]],
        ];
        for (const [value, path] of requiredForPublish) {
            if (isBlank(value)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `"${path.join(".")}" e obrigatorio para publicar um case (status: published)`,
                    path,
                });
            }
        }
        if (data.disciplines.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "ao menos uma discipline e obrigatoria para publicar um case",
                path: ["disciplines"],
            });
        }
    }

    if (data.featured && data.status !== "published") {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "um case featured precisa estar com status published",
            path: ["featured"],
        });
    }
    if (data.featured && data.private) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "um case private nao pode ser featured, ele apareceria na home",
            path: ["featured"],
        });
    }

    if (data.confidential) {
        data.metrics.forEach((metric, index) => {
            if (metric.isAbsolute) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `metrics[${index}] ("${metric.label}") e isAbsolute: true num case confidential. Troque para um valor relativo (ex: "queda de 30% em X") e isAbsolute: false`,
                    path: ["metrics", index, "isAbsolute"],
                });
            }
        });
    }
});

export type BlogSchema = z.infer<typeof blogSchema>;
export type CaseSchema = z.infer<typeof casesSchema>;

const blogCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: blogSchema,
});
const casesCollection = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/cases" }),
    schema: casesSchema,
});

export const collections = {
    'blog': blogCollection,
    'cases': casesCollection,
}
