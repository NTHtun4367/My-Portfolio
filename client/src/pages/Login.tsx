import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiLockClosed, HiEnvelope, HiArrowRight } from "react-icons/hi2";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Field, FieldError, FieldLabel } from "../components/ui/field";
import { loginSchema, type LoginFormValues } from "../schema/auth";

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      console.log("Attempting login...", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-500 mb-6">
              <HiLockClosed size={32} />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter text-white">
              Admin Access
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <Field>
              <FieldLabel className="text-zinc-400 ml-1">
                Email Address
              </FieldLabel>
              <div className="relative">
                <HiEnvelope
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={20}
                />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="admin@portfolio.com"
                  className="text-white bg-zinc-950 border-zinc-800 pl-12 h-14 rounded-xl focus:ring-blue-500 transition-all"
                />
              </div>
              <FieldError>{errors.email?.message}</FieldError>
            </Field>

            {/* Password Field */}
            <Field>
              <FieldLabel className="text-zinc-400 ml-1">Password</FieldLabel>
              <div className="relative">
                <HiLockClosed
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={20}
                />
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="text-white bg-zinc-950 border-zinc-800 pl-12 h-14 rounded-xl focus:ring-blue-500 transition-all"
                />
              </div>
              <FieldError>{errors.password?.message}</FieldError>
            </Field>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl font-bold text-lg shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] group"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Authorize Access{" "}
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-tighter">
              Authorized Personnel Only. All actions are logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
