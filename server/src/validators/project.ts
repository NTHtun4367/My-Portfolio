import { body } from "express-validator";

export const projectValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 }),
  body("category").notEmpty().withMessage("Category is required"),
  body("description")
    .isLength({ min: 10 })
    .withMessage("Summary must be 10+ chars"),
  body("longDescription").notEmpty().withMessage("Detailed story is required"),
  body("tech").custom((value) => {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      throw new Error("Select at least one tech stack");
    }
    return true;
  }),
];
