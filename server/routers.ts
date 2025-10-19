import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { nanoid } from "nanoid";
import { saveVelocityQuote } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  velocityAI: router({
    saveQuote: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          websiteType: z.string(),
          pages: z.string(),
          features: z.string(),
          design: z.string(),
          content: z.string(),
          packageTier: z.string(),
          priceRange: z.string(),
          timeline: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const id = nanoid();
        await saveVelocityQuote({
          id,
          ...input,
        });
        
        // Notify owner of new quote request
        await notifyOwner({
          title: "New Velocity AI Quote Request",
          content: `Email: ${input.email}\nPackage: ${input.packageTier}\nPrice Range: ${input.priceRange}\nTimeline: ${input.timeline}`,
        });
        
        return { success: true, id };
      }),
  }),
});

export type AppRouter = typeof appRouter;
