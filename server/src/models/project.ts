import { Schema, model, Document } from "mongoose";

interface IFeature {
  name: string;
  description: string;
}

export interface IProject extends Document {
  title: string;
  category: string;
  image: {
    url: string;
    public_id: string;
  };
  github?: string;
  live?: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  tech: string[];
  features: IFeature[];
  createdAt: Date;
}

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  github: { type: String, default: "" },
  live: { type: String, default: "" },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  problem: { type: String, required: true },
  solution: { type: String, required: true },
  tech: { type: [String], required: true },
  features: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const Project = model<IProject>("Project", projectSchema);
