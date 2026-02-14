import { z } from 'zod';

export const sectionTypeSchema = z.enum([
  'hero',
  'valueProps',
  'packages',
  'proof',
  'useCasesTabs',
  'process',
  'faq',
  'ctaForm',
  'footer'
]);

export const siteSpecSchema = z.object({
  brand: z.object({
    name: z.string(),
    city: z.string(),
    tone: z.array(z.string()),
    theme: z.object({
      radius: z.string(),
      density: z.string()
    })
  }),
  sections: z.array(
    z.object({
      type: sectionTypeSchema,
      enabled: z.boolean(),
      segments: z.array(z.string()).optional()
    })
  ),
  form: z.object({
    mode: z.enum(['formspree', 'basin', 'api']),
    endpoint: z.string().url(),
    fields: z.array(z.string())
  })
});

export type SiteSpec = z.infer<typeof siteSpecSchema>;
