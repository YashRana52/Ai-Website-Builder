import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import userRouter from "./routes/user.js";
import projectRouter from "./routes/project.js";
import { stripeWebhook } from "./controllers/stripeWebhook.js";

const app = express();

const corsOptions = {
  origin: process.env.TRUSTED_ORIGINS?.split(",") || ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));
app.post(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

const port = 3000;

app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json({ limit: "50mb" }));
app.use("/api/user", userRouter);
app.use("/api/project", projectRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
