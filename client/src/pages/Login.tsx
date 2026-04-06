import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiLockClosed, HiEnvelope, HiArrowRight } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { loginSchema, type LoginFormInputs } from "../schema/auth";
import { useLoginMutation } from "../store/slices/userApi";
import type { RootState } from "../store";
import { setUserInfo } from "../store/slices/auth";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../components/ui/field";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginMutation, { isLoading }] = useLoginMutation();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  // Initialize Hook Form
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (userInfo) navigate("/admin");
  }, [navigate, userInfo]);

  // Submit Handler
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await loginMutation(data).unwrap();
      dispatch(setUserInfo(response));
      form.reset();
      toast.success("Login successful");
    } catch (error: any) {
      toast.error(error?.data?.message || "Invalid credentials");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/admin", { replace: true });
    }
  }, [navigate, userInfo]);

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
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

          <form id="admin-login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-4">
              {/* Email Field */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-zinc-400 ml-1">
                      Email Address
                    </FieldLabel>
                    <div className="relative">
                      <HiEnvelope
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 z-20"
                        size={20}
                      />
                      <Input
                        {...field}
                        type="email"
                        id="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="abcd@example.com"
                        className="text-white bg-zinc-950 border-zinc-800 pl-12 h-14 rounded-xl focus:ring-blue-500 transition-all"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError className="text-red-500 text-xs mt-1 ml-1">
                        {fieldState.error?.message}
                      </FieldError>
                    )}
                  </Field>
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-zinc-400 ml-1">
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <HiLockClosed
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 z-20"
                        size={20}
                      />
                      <Input
                        {...field}
                        type="password"
                        id="password"
                        aria-invalid={fieldState.invalid}
                        placeholder="••••••••"
                        className="text-white bg-zinc-950 border-zinc-800 pl-12 h-14 rounded-xl focus:ring-blue-500 transition-all"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError className="text-red-500 text-xs mt-1 ml-1">
                        {fieldState.error?.message}
                      </FieldError>
                    )}
                  </Field>
                )}
              />

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
            </FieldGroup>
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
