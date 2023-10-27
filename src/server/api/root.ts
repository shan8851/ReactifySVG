import { createTRPCRouter } from "~/server/api/trpc";
import { svgRouter } from "~/server/api/routers/svg";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  svg: svgRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
