import { z } from "zod";
export const workflowSchema = z.object({
  //   id: z.string(),
  name: z.string().max(50),
  description: z.string().max(100).optional(),
  //   steps: z.array(
  //     z.object({
  //       id: z.string(),
  //       name: z.string(),
  //       description: z.string(),
  //       type: z.string(),
  //       config: z.object({
  //         key: z.string(),
  //         value: z.string(),
  //       }),
  //     })
  //   ),
});

export type WorkflowSchemaType = z.infer<typeof workflowSchema>;
