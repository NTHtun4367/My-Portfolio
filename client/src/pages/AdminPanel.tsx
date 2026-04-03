import { useState } from "react";
import {
  HiOutlineSquares2X2,
  HiPencilSquare,
  HiTrash,
  HiPlus,
  HiGlobeAlt,
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

const MOCK_PROJECTS = [
  {
    id: "1",
    title: "Quantum Dashboard",
    category: "Web Application",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
    tech: ["react", "tailwind", "typescript"],
    live: "https://example.com",
    features: [
      { name: "Real-time Analytics", description: "Live data streaming" },
    ],
  },
  {
    id: "2",
    title: "EcoTracker Mobile",
    category: "Mobile App",
    image:
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=500&q=80",
    tech: ["nextjs", "node", "mongodb"],
    live: "https://example.com",
    features: [
      { name: "GPS Tracking", description: "Precise location services" },
    ],
  },
];

export default function AdminPanel() {
  const [projects, setProjects] = useState<any[]>(MOCK_PROJECTS);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async (data: any) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (isAdding) {
      const newProject = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
      };
      setProjects((prev) => [...prev, newProject]);
    } else {
      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? { ...p, ...data } : p)),
      );
    }

    setEditingProject(null);
    setIsAdding(false);
    setLoading(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // View Switcher: Show Form if Editing or Adding
  if (editingProject || isAdding) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] py-12 px-6">
        <UpdateProjectForm
          // Pass empty object if adding, otherwise pass the selected project
          initialData={
            isAdding
              ? { title: "", category: "", tech: [], features: [], image: "" }
              : editingProject
          }
          onCancel={() => {
            setEditingProject(null);
            setIsAdding(false);
          }}
          onSubmit={handleSave}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter flex items-center gap-3">
              <HiOutlineSquares2X2 className="text-blue-500" /> Project Manager
            </h1>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
              {loading ? "Processing..." : "Database Active"}
            </p>
          </div>
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-6 py-6 font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-95"
          >
            <HiPlus className="mr-2 size-5" /> Add New Project
          </Button>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
          <Table>
            <TableHeader className="bg-zinc-900/50">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="py-6 text-zinc-400 pl-8 font-bold uppercase text-[10px] tracking-widest">
                  Details
                </TableHead>
                <TableHead className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest">
                  Category
                </TableHead>
                <TableHead className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest">
                  Stack
                </TableHead>
                <TableHead className="text-right pr-8 text-zinc-400 font-bold uppercase text-[10px] tracking-widest">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow
                  key={project.id}
                  className="border-zinc-800 hover:bg-zinc-800/20 transition-all group"
                >
                  <TableCell className="py-6 pl-8">
                    <div className="flex items-center gap-4">
                      <img
                        src={project.image}
                        className="size-14 rounded-2xl object-cover border border-zinc-800"
                        alt=""
                      />
                      <div>
                        <div className="font-bold text-lg">{project.title}</div>
                        <div className="text-zinc-500 text-[10px] font-mono">
                          REF: {project.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-3 py-1 bg-zinc-800 rounded-full text-[10px] font-bold text-zinc-400 border border-zinc-700 uppercase">
                      {project.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1.5">
                      {project.tech.slice(0, 4).map((t: string) => (
                        <div
                          key={t}
                          className="size-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-blue-400"
                        >
                          {IconMap[t as keyof typeof IconMap] ||
                            IconMap.default}
                        </div>
                      ))}
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
                        onClick={() => handleDelete(project.id)}
                      >
                        <HiTrash size={20} />
                      </Button>
                      <a href={project.live} target="_blank" rel="noreferrer">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-zinc-800"
                        >
                          <HiGlobeAlt size={20} />
                        </Button>
                      </a>
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
