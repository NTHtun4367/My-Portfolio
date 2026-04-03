import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Must be a valid image URL"),
  github: z
    .string()
    .url("Must be a valid GitHub URL")
    .optional()
    .or(z.literal("")),
  live: z.string().url("Must be a valid Live URL").optional().or(z.literal("")),
  description: z.string().min(10, "Card summary is too short"),
  longDescription: z.string().min(20, "Detailed description is too short"),
  problem: z.string().min(1, "Problem description is required"),
  solution: z.string().min(1, "Solution description is required"),
  tech: z.array(z.string()).min(1, "Select at least one technology"),
  features: z.array(
    z.object({
      name: z.string().min(1, "Capability title required"),
      description: z.string().min(1, "Description required"),
    }),
  ),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
