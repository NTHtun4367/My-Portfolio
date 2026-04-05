import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  HiOutlineSquares2X2,
  HiPencilSquare,
  HiTrash,
  HiPlus,
  HiGlobeAlt,
  HiHome,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import { IconMap } from "../common/Icons";
import UpdateProjectForm from "../components/admin/UpdateProjectForm";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { toast } from "sonner";
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectsQuery,
  useUpdateProjectMutation,
} from "../store/slices/projectApi";
import { useDispatch } from "react-redux";
import { apiSlice } from "../store/slices/api";
import { useLogoutMutation } from "../store/slices/userApi";

export default function AdminPanel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: projects = [], isLoading: isFetching } = useGetProjectsQuery();
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      // Reset the API state to clear cached user/project data
      dispatch(apiSlice.util.resetApiState());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleSave = async (data: any) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "tech" || key === "features") {
          formData.append(key, JSON.stringify(data[key]));
        } else if (key === "image") {
          if (data[key] instanceof File) {
            formData.append(key, data[key]);
          }
        } else {
          formData.append(key, data[key]);
        }
      });

      if (isAdding) {
        await createProject(formData).unwrap();
        toast.success("Project created!");
      } else {
        await updateProject({ id: editingProject._id, formData }).unwrap();
        toast.success("Project updated!");
      }

      setEditingProject(null);
      setIsAdding(false);
    } catch (error) {
      toast.error("Action failed. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
    }
  };

  const isLoading = isCreating || isUpdating || isFetching || isLoggingOut;

  if (editingProject || isAdding) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] py-12 px-6">
        <UpdateProjectForm
          initialData={
            isAdding
              ? { title: "", category: "", tech: [], features: [] }
              : editingProject
          }
          onCancel={() => {
            setEditingProject(null);
            setIsAdding(false);
          }}
          onSubmit={handleSave}
          isLoading={isCreating || isUpdating}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-10">
          <div className="space-y-2">
            <Link
              to="/"
              className="flex items-center gap-2 text-zinc-500 hover:text-blue-400 transition-colors text-xs font-mono uppercase tracking-widest mb-2 group"
            >
              <HiHome className="group-hover:-translate-y-0.5 transition-transform" />{" "}
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold tracking-tighter flex items-center gap-3">
              <HiOutlineSquares2X2 className="text-blue-500" /> Project Manager
            </h1>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
              {isLoading ? "Syncing Database..." : "System Online"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              variant="outline"
              className="border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-400/50 rounded-2xl px-6 py-6 font-bold bg-transparent"
            >
              <HiArrowRightOnRectangle className="mr-2 size-5" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>

            <Button
              onClick={() => setIsAdding(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-6 py-6 font-bold"
            >
              <HiPlus className="mr-2 size-5" /> Add New Project
            </Button>
          </div>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
          <Table>
            <TableHeader className="bg-zinc-900/50">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="py-6 text-zinc-400 pl-8 font-bold uppercase text-[10px]">
                  Details
                </TableHead>
                <TableHead className="text-zinc-400 font-bold uppercase text-[10px]">
                  Category
                </TableHead>
                <TableHead className="text-zinc-400 font-bold uppercase text-[10px]">
                  Stack
                </TableHead>
                <TableHead className="text-right pr-8 text-zinc-400 font-bold uppercase text-[10px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project: any) => (
                <TableRow
                  key={project._id}
                  className="border-zinc-800 hover:bg-zinc-800/20 group"
                >
                  <TableCell className="py-6 pl-8">
                    <div className="flex items-center gap-4">
                      <img
                        src={project.image.url}
                        className="size-14 rounded-2xl object-cover border border-zinc-800"
                        alt=""
                      />
                      <div>
                        <div className="font-bold text-lg">{project.title}</div>
                        <div className="text-zinc-500 text-xs font-mono">
                          ID: {project._id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-3 py-1 bg-zinc-800 rounded-full text-[10px] font-bold text-zinc-400 border border-zinc-700">
                      {project.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1.5">
                      {project.tech?.slice(0, 4).map((t: string) => (
                        <div
                          key={t}
                          className="size-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-blue-400"
                        >
                          {IconMap[t as keyof typeof IconMap] ||
                            IconMap.default}
                        </div>
                      ))}

                      {/* Logic for showing +N remaining items */}
                      {project.tech?.length > 4 && (
                        <div className="p-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 text-zinc-400 text-xs font-bold font-mono">
                          +{project.tech.length - 4}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-blue-400"
                        onClick={() => setEditingProject(project)}
                      >
                        <HiPencilSquare size={20} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-red-400"
                        onClick={() => handleDelete(project._id)}
                      >
                        <HiTrash size={20} />
                      </Button>
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noreferrer">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-zinc-800"
                          >
                            <HiGlobeAlt size={20} />
                          </Button>
                        </a>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
