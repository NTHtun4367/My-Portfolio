import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  HiPlus,
  HiTrash,
  HiXMark,
  HiOutlineCpuChip,
  HiOutlinePuzzlePiece,
  HiOutlineLightBulb,
  HiArrowLeft,
  HiOutlineDocumentText,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";
import { FiSave, FiGithub, FiExternalLink } from "react-icons/fi";
import { projectSchema, type ProjectFormValues } from "../../schema/schema";
import { IconMap } from "../../common/Icons";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";

export default function UpdateProjectForm({
  initialData,
  onSubmit,
  onCancel,
}: any) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      ...initialData,
      tech:
        initialData.tech?.map((t: any) =>
          typeof t === "string" ? t : t.name.toLowerCase(),
        ) || [],
      features: initialData.features || [],
    },
  });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    name: "features",
    control: form.control,
  });

  const availableTech = Object.keys(IconMap).filter(
    (key) => key !== "default" && key !== "code",
  );

  const toggleTech = (techKey: string) => {
    const currentTech = form.getValues("tech");
    const updated = currentTech.includes(techKey)
      ? currentTech.filter((t) => t !== techKey)
      : [...currentTech, techKey];
    form.setValue("tech", updated, { shouldValidate: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#0a0a0c] border border-zinc-800 rounded-[2.5rem] p-6 md:p-12 text-white max-w-6xl mx-auto mb-20 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center mb-10 border-b border-zinc-800/50 pb-6">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tighter">
          Update <span className="text-blue-400">Project</span>
        </h2>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest group"
        >
          <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
          Back
        </button>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Field className="md:col-span-2">
            <FieldLabel className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
              Project Title
            </FieldLabel>
            <Input
              {...form.register("title")}
              className="bg-zinc-900/50 border-zinc-800 h-12 rounded-xl text-lg font-semibold"
              placeholder="Project Name"
            />
            <FieldError>{form.formState.errors.title?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
              Category
            </FieldLabel>
            <Input
              {...form.register("category")}
              className="bg-zinc-900/50 border-zinc-800 h-12 rounded-xl"
              placeholder="e.g. Web App"
            />
          </Field>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-zinc-900/20 rounded-3xl border border-zinc-800/50">
          <Field>
            <FieldLabel className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
              <FiGithub /> GitHub
            </FieldLabel>
            <Input
              {...form.register("github")}
              className="bg-zinc-950 border-zinc-800 rounded-lg h-10"
            />
          </Field>
          <Field>
            <FieldLabel className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
              <FiExternalLink /> Demo
            </FieldLabel>
            <Input
              {...form.register("live")}
              className="bg-zinc-950 border-zinc-800 rounded-lg h-10"
            />
          </Field>
          <Field>
            <FieldLabel className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
              Main Image URL
            </FieldLabel>
            <Input
              {...form.register("image")}
              className="bg-zinc-950 border-zinc-800 rounded-lg h-10"
            />
          </Field>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <HiOutlineDocumentText />
            <h3 className="text-sm font-bold uppercase tracking-widest">
              About the Project
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <FieldLabel className="text-[10px] uppercase text-zinc-500">
                Short Summary (Grid View)
              </FieldLabel>
              <Textarea
                {...form.register("description")}
                className="bg-zinc-900/50 border-zinc-800 rounded-xl h-24 resize-none"
              />
            </Field>
            <Field>
              <FieldLabel className="text-[10px] uppercase text-zinc-500">
                Detailed Story (Detail View)
              </FieldLabel>
              <Textarea
                {...form.register("longDescription")}
                className="bg-zinc-900/50 border-zinc-800 rounded-xl h-24 resize-none"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <div className="flex items-center gap-2 mb-2 text-blue-400/70">
                <HiOutlinePuzzlePiece size={14} />
                <span className="text-[10px] uppercase font-bold">
                  The Problem
                </span>
              </div>
              <Textarea
                {...form.register("problem")}
                className="bg-zinc-950 border-zinc-800 rounded-xl h-20 resize-none"
              />
            </Field>
            <Field>
              <div className="flex items-center gap-2 mb-2 text-green-400/70">
                <HiOutlineLightBulb size={14} />
                <span className="text-[10px] uppercase font-bold">
                  The Solution
                </span>
              </div>
              <Textarea
                {...form.register("solution")}
                className="bg-zinc-950 border-zinc-800 rounded-xl h-20 resize-none"
              />
            </Field>
          </div>
        </section>

        {/* Dynamic Grid */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
              <HiOutlineGlobeAlt className="text-blue-500" /> Key Capabilities
            </h3>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="rounded-lg border-zinc-800 h-8 text-xs text-black"
              onClick={() => appendFeature({ name: "", description: "" })}
            >
              <HiPlus className="mr-1" /> Add Capability
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featureFields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 bg-zinc-900/20 border border-zinc-800 rounded-2xl relative group space-y-2"
              >
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="absolute top-2 right-2 text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <HiTrash />
                </button>
                <Input
                  {...form.register(`features.${index}.name`)}
                  placeholder="Capability Name"
                  className="bg-zinc-950 border-zinc-800 rounded-lg h-10"
                />
                <Textarea
                  {...form.register(`features.${index}.description`)}
                  placeholder="Description"
                  className="bg-zinc-950 border-zinc-800 rounded-lg h-10 resize-none"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack - Condensed Scroll */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-blue-500">
            <HiOutlineCpuChip />
            <h3 className="text-sm font-bold uppercase tracking-widest">
              Stack
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-zinc-950 border border-zinc-800/50 min-h-12">
            {form.watch("tech").map((t) => (
              <Badge
                key={t}
                onClick={() => toggleTech(t)}
                className="bg-blue-600/10 text-blue-400 border-blue-500/20 p-3 capitalize gap-2 cursor-pointer rounded-lg hover:bg-red-500/10 hover:text-red-500"
              >
                <span className="text-sm">
                  {IconMap[t as keyof typeof IconMap]}
                </span>{" "}
                {t} <HiXMark className="size-3" />
              </Badge>
            ))}
          </div>
          <ScrollArea className="h-40 w-full rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-10 gap-2">
              {availableTech.map((key) => {
                const isSelected = form.watch("tech").includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleTech(key)}
                    className={`flex flex-col items-center p-2 rounded-lg border transition-all ${isSelected ? "bg-blue-600 border-blue-400" : "bg-zinc-900 border-zinc-800 text-zinc-600"}`}
                  >
                    <span className="text-lg">
                      {IconMap[key as keyof typeof IconMap]}
                    </span>
                    <span className="text-[8px] uppercase font-bold mt-1">
                      {key}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </section>

        {/* Footer */}
        <footer className="flex justify-end gap-4 pt-8 border-t border-zinc-800">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="text-black px-6 h-12 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-10 h-12 font-bold shadow-xl shadow-blue-600/20"
          >
            <FiSave className="mr-2" /> Update Project
          </Button>
        </footer>
      </form>
    </motion.div>
  );
}
