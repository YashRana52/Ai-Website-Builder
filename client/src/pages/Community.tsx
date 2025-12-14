import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Loader2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import api from "@/configs/axios";
import { toast } from "sonner";

const Community = () => {
  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState<Project[]>([]);

  const naviagte = useNavigate();

  const fetchprojects = async () => {
    try {
      const { data } = await api.get("/api/project/published");
      setProjects(data.projects);
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchprojects();
  }, []);

  return (
    <>
      <div className="px-4 md:px-16 lg:px-24 xl:px-32">
        {loading ? (
          <div className="flex items-center justify-center h-[80vh]">
            <Loader2Icon className="size-7 animate-spin text-indigo-200" />
          </div>
        ) : projects.length > 0 ? (
          <div className="py-10 min-h-[80vh]">
            <div className="flex items-center justify-between mb-12">
              <h1 className="text-2xl font-medium text-white">
                Published Projects
              </h1>
            </div>

            <div className="flex flex-wrap gap-3.5">
              {projects.map((project) => (
                <Link
                  to={`/view/${project.id}`}
                  key={project.id}
                  target="_blank"
                  className=" w-72 max-sm:mx-auto cursor-pointer bg-gray-900/60 border border-gray-700 rounded-lg overflow-hidden  group  hover:border-indigo-800/80 transition-all duration-300"
                >
                  {/* Desktop like mini preview */}

                  <div className="relative w-full h-40 bg-gray-900 overflow-hidden border-b border-gray-800">
                    {project.current_code ? (
                      <iframe
                        srcDoc={project.current_code}
                        sandbox="allow-scripts allow-same-origin"
                        style={{ transform: "scale(0.25)" }}
                        className="absolute top-0 left-0 w-[1200px] h-[800px]  origin-top-left pointer-events-none"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <p>No Preview</p>
                      </div>
                    )}
                  </div>

                  {/* content */}
                  <div className="p-4 text-white bg-linear-180 from-transparent group-hover:from-indigo-950 to-transparent transition-colors">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium line-clamp-2">
                        {project.name}
                      </h2>
                      <button className="px-2.5 pt-0.5 mt-1 ml-2 text-xs bg-gray-800 border border-gray-700 rounded-full">
                        Website
                      </button>
                    </div>
                    <p className="text-sm line-clamp-2 text-gray-400 mt-1">
                      {project.initial_prompt}
                    </p>

                    <div className="flex items-center justify-between mt-6">
                      <span className="text-xs text-gray-500">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>

                      <div className="flex gap-3 text-white text-sm">
                        <button
                          onClick={() => naviagte(`/preview/${project.id}`)}
                          className="px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-md  transition-colors flex items-center gap-2"
                        >
                          <span className="bg-gray-200 size-4.5 rounded-full text-black font-semibold flex items-center justify-center">
                            {project.user?.name?.slice(0, 1)}
                          </span>
                          {project.user?.name}
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[80vh] space-y-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7.5V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V7.5m-18 0l2.648-3.973A2.25 2.25 0 017.476 2.25h9.048a2.25 2.25 0 011.828 1.277L21 7.5m-18 0h18M6 12h12"
              />
            </svg>

            <h1 className="text-3xl font-semibold text-gray-200">
              You have no projects yet
            </h1>

            <p className="text-gray-400 text-center max-w-xs">
              Start by creating your first project. It only takes a moment!
            </p>

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg
               bg-indigo-600 hover:bg-indigo-700 active:scale-95 
               transition-all text-white font-medium shadow-lg shadow-indigo-500/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#ffffff"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Create New
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Community;
