import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, "Title is required"),
  category: z.string().min(1, "Category is required"),
  github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  live: z.string().url("Invalid Live URL").optional().or(z.literal("")),
  image: z
    .any()
    .refine(
      (file) =>
        !file ||
        file instanceof File ||
        (typeof file === "object" && file.url) ||
        typeof file === "string",
      "Invalid image format",
    ),
  description: z.string().min(10, "Summary must be at least 10 characters"),
  longDescription: z.string().min(20, "Detailed story is required"),
  problem: z.string().optional(),
  solution: z.string().optional(),
  tech: z.array(z.string()).min(1, "Select at least one tech stack"),
  features: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      description: z.string().min(1, "Description is required"),
    }),
  ),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
