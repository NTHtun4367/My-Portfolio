import { motion } from "framer-motion";
import {
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendContactMessageMutation } from "../store/slices/contactApi";
import { CustomAlert } from "./CustomAlert";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../components/ui/field";
import { contactSchema, type ContactFormInputs } from "../schema/contact";
import { Textarea } from "./ui/textarea";

export default function Contact() {
  const [sendContact, { isLoading }] = useSendContactMessageMutation();

  // Initialize Hook Form with Zod Resolver
  const { control, handleSubmit, reset } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Alert State
  const [alert, setAlert] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({
    show: false,
    type: "success",
    message: "",
  });

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, show: false }));
  };

  const onSubmit = async (data: ContactFormInputs) => {
    try {
      await sendContact(data).unwrap();
      setAlert({
        show: true,
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
      reset();
    } catch (err: any) {
      setAlert({
        show: true,
        type: "error",
        message:
          err?.data?.message ||
          "Failed to send message. Please try again later.",
      });
    }
  };

  return (
    <section id="contact" className="py-32 md:px-6 relative overflow-hidden">
      <CustomAlert
        show={alert.show}
        type={alert.type}
        message={alert.message}
        onClose={handleCloseAlert}
      />

      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-125 md:bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-20 space-y-4 flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tighter"
          >
            Get in <span className="text-blue-400">Touch</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Info & Socials */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                I’m currently looking for new opportunities and collaborations.
                Whether you have a question or just want to say hi, my inbox is
                always open.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 group">
                <div className="size-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-all">
                  <HiOutlineEnvelope className="size-5" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest">
                    Email
                  </p>
                  <p className="text-white font-medium">naythu1943@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="size-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:border-purple-500/50 group-hover:text-purple-400 transition-all">
                  <HiOutlineMapPin className="size-5" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest">
                    Location
                  </p>
                  <p className="text-white font-medium">
                    Pathein, Ayeyarwaddy, Myanmar
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 pt-4"
            >
              {[
                {
                  icon: <FaGithub />,
                  link: "https://github.com/NTHtun4367",
                  color: "hover:text-white",
                },
                {
                  icon: <FaLinkedin />,
                  link: "https://www.linkedin.com/in/nay-thu-htun-372704318/",
                  color: "hover:text-blue-400",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  className={`size-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 text-xl transition-all ${social.color} hover:border-zinc-700`}
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-2 bg-zinc-900/30 border border-zinc-800/50 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-sm hover:border-blue-500/50 transition-all duration-500"
            >
              <FieldGroup className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-xs font-mono text-zinc-500 uppercase tracking-widest ml-1">
                          Name
                        </FieldLabel>
                        <input
                          {...field}
                          type="text"
                          placeholder="John Doe"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                        {fieldState.invalid && (
                          <FieldError className="text-red-500 text-[10px] mt-1 ml-1">
                            {fieldState.error?.message}
                          </FieldError>
                        )}
                      </Field>
                    )}
                  />

                  {/* Email Field */}
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-xs font-mono text-zinc-500 uppercase tracking-widest ml-1">
                          Email
                        </FieldLabel>
                        <input
                          {...field}
                          type="email"
                          placeholder="john@example.com"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                        {fieldState.invalid && (
                          <FieldError className="text-red-500 text-[10px] mt-1 ml-1">
                            {fieldState.error?.message}
                          </FieldError>
                        )}
                      </Field>
                    )}
                  />
                </div>

                {/* Message Field */}
                <Controller
                  name="message"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-xs font-mono text-zinc-500 uppercase tracking-widest ml-1">
                        Message
                      </FieldLabel>
                      <Textarea
                        {...field}
                        rows={5}
                        placeholder="Tell me about your project..."
                        className="w-full h-32 bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                      />
                      {fieldState.invalid && (
                        <FieldError className="text-red-500 text-[10px] mt-1 ml-1">
                          {fieldState.error?.message}
                        </FieldError>
                      )}
                    </Field>
                  )}
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group relative flex items-center justify-center gap-3 bg-white text-black font-bold py-4 rounded-2xl overflow-hidden transition-all hover:pr-8 disabled:opacity-50 hover:cursor-pointer"
                >
                  <span className="relative z-10">
                    {isLoading ? "Sending..." : "Send Message"}
                  </span>
                  <HiOutlineChatBubbleLeftRight className="size-5 transition-all group-hover:scale-110" />
                </button>
              </FieldGroup>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
