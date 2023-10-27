import { z } from "zod";
import * as svgr from '@svgr/core';
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const svgRouter = createTRPCRouter({
  transformSVG: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const jsxOutput = await svgr.transform(input);
    return jsxOutput;
  })
})
