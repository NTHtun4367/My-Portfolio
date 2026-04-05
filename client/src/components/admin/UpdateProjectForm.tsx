import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
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
  HiPhoto,
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
  isLoading,
}: any) {
  // Use existing image URL if available
  const [preview, setPreview] = useState<string | null>(
    initialData?.image?.url || null,
  );

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      ...initialData,
      image: initialData?.image || undefined,
      tech:
        initialData?.tech?.map((t: any) =>
          typeof t === "string" ? t : t.name?.toLowerCase(),
        ) || [],
      features: initialData?.features || [],
    },
  });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    name: "features",
    control,
  });

  const availableTech = Object.keys(IconMap).filter(
    (key) => key !== "default" && key !== "code",
  );

  const toggleTech = (techKey: string) => {
    const currentTech = watch("tech");
    const updated = currentTech.includes(techKey)
      ? currentTech.filter((t: string) => t !== techKey)
      : [...currentTech, techKey];
    setValue("tech", updated, { shouldValidate: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#0a0a0c] border border-zinc-800 rounded-[2.5rem] p-6 md:p-12 text-white max-w-6xl mx-auto mb-20 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex justify-between items-center mb-10 border-b border-zinc-800/50 pb-6">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tighter">
          {initialData?._id ? "Update" : "Create"}
          <span className="text-blue-400"> Project</span>
        </h2>
        <Button
          variant={"outline"}
          onClick={onCancel}
          type="button"
          className="flex items-center gap-2 text-zinc-500 transition-colors font-mono text-xs uppercase tracking-widest group"
        >
          <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
          Back
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <FieldLabel className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest ml-1">
              Project Title
            </FieldLabel>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className="bg-zinc-900/50 border-zinc-800 h-12 rounded-xl text-lg font-semibold text-white"
                  placeholder="Project Name"
                />
              )}
            />
            <FieldError>{errors.title?.message}</FieldError>
          </div>
          <div>
            <FieldLabel className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest ml-1">
              Category
            </FieldLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className="bg-zinc-900/50 border-zinc-800 h-12 rounded-xl text-white"
                  placeholder="e.g. Web App"
                />
              )}
            />
            <FieldError>{errors.category?.message}</FieldError>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-zinc-900/20 rounded-3xl border border-zinc-800/50 items-center">
          <div className="md:col-span-1">
            <FieldLabel className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-3 ml-1">
              <HiPhoto /> Cover Image
            </FieldLabel>
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => (
                <div className="relative group aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center">
                  {preview ? (
                    <img
                      src={preview}
                      className="size-full object-cover"
                      alt="Preview"
                    />
                  ) : (
                    <HiPhoto className="size-10 text-zinc-800" />
                  )}
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-xs font-bold uppercase tracking-tighter">
                    <span>{initialData?._id ? "Change" : "Add"} Image</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          onChange(file);
                          const reader = new FileReader();
                          reader.onloadend = () =>
                            setPreview(reader.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              )}
            />
            <FieldError>{errors.image?.message as any}</FieldError>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <FieldLabel className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-widest ml-1">
                <FiGithub /> GitHub
              </FieldLabel>
              <Controller
                name="github"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="bg-zinc-950 border-zinc-800 rounded-lg h-10 text-white"
                  />
                )}
              />
            </Field>
            <Field>
              <FieldLabel className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-widest ml-1">
                <FiExternalLink /> Demo
              </FieldLabel>
              <Controller
                name="live"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="bg-zinc-950 border-zinc-800 rounded-lg h-10 text-white"
                  />
                )}
              />
            </Field>
          </div>
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
              <FieldLabel className="text-[10px] uppercase text-zinc-500 ml-1">
                Short Summary
              </FieldLabel>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="bg-zinc-900/50 border-zinc-800 rounded-xl h-24 resize-none text-white"
                  />
                )}
              />
              <FieldError>{errors.description?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel className="text-[10px] uppercase text-zinc-500 ml-1">
                Detailed Story
              </FieldLabel>
              <Controller
                name="longDescription"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="bg-zinc-900/50 border-zinc-800 rounded-xl h-24 resize-none text-white"
                  />
                )}
              />
              <FieldError>{errors.longDescription?.message}</FieldError>
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
              <Controller
                name="problem"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="bg-zinc-950 border-zinc-800 rounded-xl h-20 resize-none text-white"
                  />
                )}
              />
            </Field>
            <Field>
              <div className="flex items-center gap-2 mb-2 text-green-400/70">
                <HiOutlineLightBulb size={14} />
                <span className="text-[10px] uppercase font-bold">
                  The Solution
                </span>
              </div>
              <Controller
                name="solution"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="bg-zinc-950 border-zinc-800 rounded-xl h-20 resize-none text-white"
                  />
                )}
              />
            </Field>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
              <HiOutlineGlobeAlt className="text-blue-500" /> Key Capabilities
            </h3>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="rounded-lg border-zinc-800 h-8 text-xs text-black bg-white hover:bg-zinc-200"
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
                <Button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="absolute top-2 right-2 text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <HiTrash />
                </Button>
                <Input
                  {...register(`features.${index}.name`)}
                  placeholder="Capability Name"
                  className="bg-zinc-950 border-zinc-800 rounded-lg h-10 text-white"
                />
                <Textarea
                  {...register(`features.${index}.description`)}
                  placeholder="Description"
                  className="bg-zinc-950 border-zinc-800 rounded-lg h-16 resize-none text-white"
                />
              </div>
            ))}
          </div>
          <FieldError>{errors.features?.message as any}</FieldError>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-blue-500">
            <HiOutlineCpuChip />
            <h3 className="text-sm font-bold uppercase tracking-widest">
              Stack
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-zinc-950 border border-zinc-800/50 min-h-12">
            {watch("tech").map((t) => (
              <Badge
                key={t}
                onClick={() => toggleTech(t)}
                className="bg-blue-600/10 text-blue-400 border-blue-500/20 p-3 capitalize gap-2 cursor-pointer rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors"
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
                const isSelected = watch("tech").includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleTech(key)}
                    className={`flex flex-col items-center p-2 rounded-lg border transition-all ${isSelected ? "bg-blue-600 border-blue-400" : "bg-zinc-900 border-zinc-800 text-zinc-600 hover:border-zinc-500"}`}
                  >
                    <span className="text-lg">
                      {IconMap[key as keyof typeof IconMap]}
                    </span>
                    <span className="text-[8px] text-white uppercase font-bold mt-1">
                      {key}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
          <FieldError>{errors.tech?.message}</FieldError>
        </section>

        <footer className="flex justify-end gap-4 pt-8 border-t border-zinc-800">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="text-black px-6 h-12 rounded-xl bg-white hover:bg-zinc-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-10 h-12 font-bold shadow-xl shadow-blue-600/20 disabled:opacity-50"
          >
            {isLoading ? (
              "Saving..."
            ) : (
              <>
                <FiSave className="mr-2" />{" "}
                {initialData?._id ? "Update" : "Save"} Project
              </>
            )}
          </Button>
        </footer>
      </form>
    </motion.div>
  );
}
