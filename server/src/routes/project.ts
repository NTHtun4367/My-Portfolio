import express from "express";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
  getProjectById,
} from "../controllers/project";
import { upload } from "../utils/upload";
import { validateRequest } from "../middlewares/validateRequest";
import { projectValidation } from "../validators/project";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router
  .route("/")
  .get(getProjects)
  .post(
    protect,
    upload.single("image"),
    projectValidation,
    validateRequest,
    createProject,
  );

router
  .route("/:id")
  .get(getProjectById)
  .patch(protect, upload.single("image"), updateProject)
  .delete(protect, deleteProject);

export default router;
