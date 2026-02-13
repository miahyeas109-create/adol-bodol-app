import { z } from 'zod';
import { insertAdSchema, ads } from './schema';

// Export schema/types for frontend convenience if they import from routes
export { insertAdSchema, ads };
export type { InsertAd, Ad } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  ads: {
    create: {
      method: 'POST' as const,
      path: '/api/ads' as const,
      input: insertAdSchema,
      responses: {
        201: z.custom<typeof ads.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/ads' as const,
      responses: {
        200: z.array(z.custom<typeof ads.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
