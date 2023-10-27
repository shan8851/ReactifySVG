import { z } from "zod";
import { transform } from '@svgr/core';
import svgoPlugin from '@svgr/plugin-svgo';
import jsxPlugin from "@svgr/plugin-jsx";
import prettierPlugin from "@svgr/plugin-prettier";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ExportType } from "~/types";

const transformInputSchema = z.object({
  svgString: z.string(),
  exportType: z.nativeEnum(ExportType),
  componentName: z.string(),
});

export const svgRouter = createTRPCRouter({
  transformSVG: publicProcedure.input(transformInputSchema).mutation(async ({ input }) => {
    const { svgString, exportType, componentName } = input;
    const jsxOutput = await transform(
      svgString,
      {
        plugins: [svgoPlugin, jsxPlugin, prettierPlugin],
        icon: true,
        exportType: exportType,
      },
      { componentName: componentName }
    )
    return jsxOutput;
  }),
  getCount: publicProcedure.query(({ ctx }) => {
      return ctx.db.transformationStats.findFirst();
  }),
  incrementCount: publicProcedure.mutation(async ({ ctx }) => {
    const record = await ctx.db.transformationStats.findFirst();
    if (!record) {
      return ctx.db.transformationStats.create({
        data: { transformationCount: 1 },
      })
    }
    return ctx.db.transformationStats.update({
      where: { id: record.id },
      data: { transformationCount: record.transformationCount + 1 },
    });
  }),
})
