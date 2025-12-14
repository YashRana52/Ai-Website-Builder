import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Project } from "../types";
import {
  ArrowBigDownDashIcon,
  EyeIcon,
  EyeOffIcon,
  Fullscreen,
  LaptopIcon,
  Loader2Icon,
  MessageSquareIcon,
  SaveIcon,
  SmartphoneIcon,
  TabletIcon,
  XIcon,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import ProjectPreview, {
  type ProjectPreviewRef,
} from "../components/ProjectPreview";
import { toast } from "sonner";
import api from "@/configs/axios";
import { authClient } from "@/lib/auth-client";

function Projects() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(true);
  const [device, setDevice] = useState<"phone" | "tablet" | "desktop">(
    "desktop"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const previewRef = useRef<ProjectPreviewRef>(null);

  // ---------------- FETCH PROJECT ----------------
  const fetchProject = async () => {
    try {
      const { data } = await api.get(`/api/user/project/${projectId}`);
      setProject(data.project);
      setIsGenerating(!data.project.current_code);
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // ---------------- SAVE PROJECT ----------------
  const saveProject = async () => {
    try {
      if (!previewRef.current) return;

      const code = previewRef.current.getCode();
      if (!code) return;

      setIsSaving(true);

      const { data } = await api.put(`/api/project/save/${projectId}`, {
        code,
      });

      toast.success(data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  // ---------------- TOGGLE PUBLISH ----------------
  const togglePublish = async () => {
    try {
      const { data } = await api.get(`/api/user/publish-toggle/${projectId}`);

      setProject((prev) =>
        prev ? { ...prev, isPublished: data.isPublished } : prev
      );

      toast.success(
        data.isPublished ? "Project published" : "Project unpublished"
      );
    } catch {
      toast.error("Failed to update publish status");
    }
  };

  // ---------------- DOWNLOAD CODE ----------------
  const downLoadCode = async () => {
    const code = previewRef.current?.getCode() || project?.current_code;
    if (!code || isGenerating) return;

    const file = new Blob([code], { type: "text/html" });
    const element = document.createElement("a");

    element.href = URL.createObjectURL(file);
    element.download = "index.html";
    document.body.appendChild(element);
    element.click();

    URL.revokeObjectURL(element.href);
    element.remove();
  };

  // ---------------- AUTH GUARD ----------------
  useEffect(() => {
    if (session?.user) {
      fetchProject();
    } else if (!isPending && !session?.user) {
      navigate("/");
      toast("please login to view your project");
    }
  }, [session?.user]);

  // ---------------- POLLING WHILE GENERATING ----------------
  useEffect(() => {
    if (!project?.current_code) {
      const interval = setInterval(fetchProject, 10000);
      return () => clearInterval(interval);
    }
  }, [project?.current_code]);

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2Icon className="animate-spin size-7 text-violet-200" />
      </div>
    );
  }

  // ---------------- MAIN UI ----------------
  return project ? (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white">
      {/* Navbar */}
      <div className="flex max-sm:flex-col sm:items-center gap-4 px-4 py-2">
        <div className="flex items-center gap-2 sm:min-w-90">
          <img
            src="/favicon.svg"
            alt="logo"
            className="h-16 cursor-pointer"
            onClick={() => navigate("/")}
          />

          <div className="max-w-64 sm:max-w-xs">
            <p className="text-sm capitalize truncate">{project.name}</p>
            <p className="text-gray-400 text-xs">
              Previewing last saved version
            </p>
          </div>

          <div className="sm:hidden flex-1 flex justify-end">
            {isMenuOpen ? (
              <XIcon
                onClick={() => setIsMenuOpen(false)}
                className="size-6 cursor-pointer"
              />
            ) : (
              <MessageSquareIcon
                onClick={() => setIsMenuOpen(true)}
                className="size-6 cursor-pointer"
              />
            )}
          </div>
        </div>

        {/* Device Switch */}
        <div className="hidden sm:flex gap-2 bg-gray-950 p-1.5 rounded-md">
          <SmartphoneIcon
            onClick={() => setDevice("phone")}
            className={`size-6 p-1 rounded cursor-pointer ${
              device === "phone" ? "bg-gray-700" : ""
            }`}
          />
          <TabletIcon
            onClick={() => setDevice("tablet")}
            className={`size-6 p-1 rounded cursor-pointer ${
              device === "tablet" ? "bg-gray-700" : ""
            }`}
          />
          <LaptopIcon
            onClick={() => setDevice("desktop")}
            className={`size-6 p-1 rounded cursor-pointer ${
              device === "desktop" ? "bg-gray-700" : ""
            }`}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-1 justify-end text-xs sm:text-sm">
          <button
            onClick={saveProject}
            disabled={isSaving}
            className="max-sm:hidden bg-gray-800 hover:bg-gray-700 px-3.5 py-1 flex items-center gap-2 rounded border border-gray-700"
          >
            {isSaving ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <SaveIcon size={16} />
            )}
            Save
          </button>

          <Link
            target="_blank"
            to={`/preview/${projectId}`}
            className="flex items-center gap-2 px-4 py-1 rounded border border-gray-700 hover:border-gray-500"
          >
            <Fullscreen size={16} /> Preview
          </Link>

          <button
            onClick={downLoadCode}
            className="bg-linear-to-br from-blue-700 to-indigo-600 px-3.5 py-1 flex items-center gap-2 rounded"
          >
            <ArrowBigDownDashIcon size={16} /> Download
          </button>

          <button
            onClick={togglePublish}
            className="bg-linear-to-br from-indigo-500 to-indigo-700 px-3.5 py-1 flex items-center gap-2 rounded"
          >
            {project.isPublished ? (
              <EyeOffIcon size={16} />
            ) : (
              <EyeIcon size={16} />
            )}
            {project.isPublished ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 flex overflow-auto">
        <Sidebar
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
          isMenuOpen={isMenuOpen}
          setProject={setProject}
          project={project}
        />

        <div className="flex-1 p-2 pl-0">
          <ProjectPreview
            ref={previewRef}
            project={project}
            isGenerating={isGenerating}
            device={device}
          />
        </div>
      </div>
    </div>
  ) : null;
}

export default Projects;
