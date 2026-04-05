import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { Project } from "../models/project";
import { uploadSingleImage, deleteImage } from "../utils/cloudinary";

// GET ALL PROJECTS
export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.status(200).json(projects);
});

// GET SINGLE PROJECT
export const getProjectById = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
    res.status(200).json(project);
  },
);

// CREATE PROJECT
export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      title,
      category,
      github,
      live,
      description,
      longDescription,
      problem,
      solution,
    } = req.body;

    let tech: string[] = [];
    if (req.body.tech) {
      const parsedTech =
        typeof req.body.tech === "string"
          ? JSON.parse(req.body.tech)
          : req.body.tech;
      // Map to string array if objects are passed (e.g., [{name: 'React'}] -> ['React'])
      tech = parsedTech.map((t: any) => (typeof t === "object" ? t.name : t));
    }

    const features = req.body.features ? JSON.parse(req.body.features) : [];

    let imageData = { url: "", public_id: "" };

    if (req.file) {
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const uploadRes = await uploadSingleImage(base64Image, "my_projects");
      imageData = { url: uploadRes.image_url, public_id: uploadRes.public_alt };
    } else {
      res.status(400);
      throw new Error("Please upload an image");
    }

    const newProject = await Project.create({
      title,
      category,
      image: imageData,
      github: github || "",
      live: live || "",
      description,
      longDescription,
      problem: problem || "",
      solution: solution || "",
      tech,
      features,
    });

    res.status(201).json(newProject);
  },
);

// UPDATE PROJECT
export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: projectId } = req.params;
    const { id: idBody, ...restBody } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    const updateData: any = { ...restBody };

    if (req.body.tech) {
      const parsed =
        typeof req.body.tech === "string"
          ? JSON.parse(req.body.tech)
          : req.body.tech;
      updateData.tech = parsed.map((t: any) =>
        typeof t === "object" ? t.name : t,
      );
    }

    if (req.body.features) {
      updateData.features =
        typeof req.body.features === "string"
          ? JSON.parse(req.body.features)
          : req.body.features;
    }

    if (req.file) {
      if (project.image?.public_id) await deleteImage(project.image.public_id);
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const uploadRes = await uploadSingleImage(base64Image, "my_projects");
      updateData.image = {
        url: uploadRes.image_url,
        public_id: uploadRes.public_alt,
      };
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      updateData,
      { new: true, runValidators: true },
    );
    res.status(200).json(updatedProject);
  },
);

// DELETE PROJECT
export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
    if (project.image?.public_id) await deleteImage(project.image.public_id);
    await project.deleteOne();
    res.status(200).json({ message: "Project deleted successfully" });
  },
);
