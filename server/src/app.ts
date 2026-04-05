import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import { ENV } from "./utils/env";
import { connectDB } from "./db/dbConnect";
import authRoutes from "./routes/auth";
import projectRoutes from "./routes/project";
import contactRoutes from "./routes/contact";

const app = express();

// Security Headers
app.use(helmet());

// CORS Configuration
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);

// 3. Body Parsers
app.use(json({ limit: "10mb" }));
app.use(urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Parameter Pollution Prevent
app.use(hpp());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

app.listen(ENV.PORT, () => {
  connectDB();
  console.log(`Server running on port ${ENV.PORT}`);
});
