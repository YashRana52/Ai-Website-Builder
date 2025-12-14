"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const node_1 = require("better-auth/node");
const auth_js_1 = require("./lib/auth.js");
const user_js_1 = __importDefault(require("./routes/user.js"));
const project_js_1 = __importDefault(require("./routes/project.js"));
const stripeWebhook_js_1 = require("./controllers/stripeWebhook.js");
const app = (0, express_1.default)();
/* ---------------- CORS ---------------- */
const corsOptions = {
    origin: process.env.TRUSTED_ORIGINS?.split(",") || ["http://localhost:5173"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
/* ------------- Stripe Webhook (RAW) ------------- */
app.post("/api/stripe", express_1.default.raw({ type: "application/json" }), stripeWebhook_js_1.stripeWebhook);
/* ------------- JSON for rest ------------- */
app.use(express_1.default.json({ limit: "50mb" }));
/* ------------- Auth ------------- */
app.all("/api/auth/{*any}", (0, node_1.toNodeHandler)(auth_js_1.auth));
/* ------------- Routes ------------- */
app.use("/api/user", user_js_1.default);
app.use("/api/project", project_js_1.default);
/* ------------- Health Check ------------- */
app.get("/", (_req, res) => {
    res.send("Server is Live!");
});
/* ------------- Port (Render-safe) ------------- */
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
