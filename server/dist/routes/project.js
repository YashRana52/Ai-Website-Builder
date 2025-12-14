"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_js_1 = require("../middlewares/auth.js");
const projectController_js_1 = require("../controllers/projectController.js");
const projectRouter = express_1.default.Router();
projectRouter.post("/revision/:projectId", auth_js_1.protect, projectController_js_1.makeRevision);
projectRouter.put("/save/:projectId", auth_js_1.protect, projectController_js_1.saveProjectCode);
projectRouter.get("/rollback/:projectId/:versionId", auth_js_1.protect, projectController_js_1.rollbackToVersion);
projectRouter.delete("/:projectId", auth_js_1.protect, projectController_js_1.deleteProject);
projectRouter.get("/preview/:projectId", auth_js_1.protect, projectController_js_1.getProjectPreview);
projectRouter.get("/published", projectController_js_1.getPublishedProject);
projectRouter.get("/published/:projectId", projectController_js_1.getProjectById);
exports.default = projectRouter;
