import { Status } from "@prisma/client";
import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z
    .string("Description is required")
    .min(1, "Description is required")
    .max(5000, "Description must be less than 5000 characters"),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string("Description is required")
    .min(1, "Description is required")
    .max(5000, "Description must be less than 5000 characters")
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is requred.")
    .max(255)
    .optional()
    .nullable(),
  status: z.enum(Status).optional(),
});
