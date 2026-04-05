import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    // check image or not
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type. Only images are allowed!") as any,
        false,
      );
    }
  },
});
