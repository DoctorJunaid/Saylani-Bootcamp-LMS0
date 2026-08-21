import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import {
  Eye,
  EyeOff,
  Users,
  CalendarDays,
  UsersRound,
  FolderKanban,
  ListTodo,
  Loader2,
} from "lucide-react";

const HIGHLIGHTS = [
  { label: "Attendance", icon: CalendarDays },
  { label: "Assignments", icon: ListTodo },
  { label: "Teams", icon: UsersRound },
  { label: "Projects", icon: FolderKanban },
  { label: "Community", icon: Users },
];

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.identifier.trim() || !formData.password.trim()) {
      toast.error("Please enter your Roll Number or Email and Password.");
      return;
    }

    setIsLoading(true);

    try {
      await login(formData.identifier.trim(), formData.password);
      toast.success("Login successful!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Invalid Roll Number/Email or password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-dvh lg:h-dvh lg:grid lg:grid-cols-2 lg:overflow-hidden bg-[var(--bg)]">
      {/* Left Brand Panel — Same Rich Visual Panel as Admin */}
      <div className="relative hidden h-full min-h-0 flex-col overflow-hidden bg-[#004a75] p-8 text-white lg:flex xl:p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 20% 20%, rgba(41,169,255,0.35), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(0,99,155,0.5), transparent 50%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[540px] flex-col gap-5 justify-between">
          {/* Top Headline */}
          <div className="shrink-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100/70">
              Saylani Mass IT Training
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight xl:text-4xl text-white">
              Student Portal
            </h2>
          </div>

          {/* Center Brand Illustration */}
          <div className="flex min-h-80 flex-1 items-center justify-center -my-4">
            <img
              src="/smit-hero-logo.png"
              alt="SMIT Hero Logo"
              className="max-h-full w-auto max-w-full object-contain drop-shadow-2xl"
              onError={(e) => {
                // fallback to smit-logo if needed
                e.currentTarget.src = "/smit-logo.png";
              }}
            />
          </div>

          {/* Bottom Highlights */}
          <div className="shrink-0 space-y-4">
            <p className="text-base font-medium leading-relaxed text-blue-50/95 xl:text-lg">
              Track your attendance, build team projects, submit assignments, and
              accelerate your tech career with Saylani.
            </p>

            <div className="flex flex-wrap gap-2">
              {HIGHLIGHTS.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-50 backdrop-blur-sm"
                >
                  <Icon size={14} strokeWidth={2} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="flex min-h-dvh flex-col justify-center bg-[var(--bg)] px-6 py-8 sm:px-12 lg:min-h-0 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-[440px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <img
              src="/smit-logo.png"
              alt="Saylani SMIT"
              className="h-9 object-contain"
            />
            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-[var(--accent)] border border-blue-100">
              Student
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
            Welcome back.
          </h2>
          <p className="mt-1.5 text-sm text-[var(--text-muted)]">
            Sign in to open your bootcamp student portal.
          </p>

          <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
            <div>
              <label
                htmlFor="student-identifier"
                className="mb-1.5 block text-[13px] font-medium text-[var(--text)]"
              >
                Roll Number or Email
              </label>
              <input
                id="student-identifier"
                name="identifier"
                type="text"
                value={formData.identifier}
                onChange={handleChange}
                placeholder="e.g. 100234 or student@smitlms.com"
                required
                autoComplete="username"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--text)] placeholder-[var(--text-muted)]/60 transition-all focus:border-[var(--accent)] focus:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="student-password"
                  className="block text-[13px] font-medium text-[var(--text)]"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() =>
                    toast("Please contact your campus instructor or admin to reset your password.", {
                      icon: "ℹ️",
                    })
                  }
                  className="text-xs text-[var(--accent)] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative flex items-center">
                <input
                  id="student-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] py-2.5 pr-10 pl-3.5 text-sm text-[var(--text)] placeholder-[var(--text-muted)]/60 transition-all focus:border-[var(--accent)] focus:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 cursor-pointer text-[var(--text-muted)] hover:text-[var(--text)]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={16} strokeWidth={2} />
                  ) : (
                    <Eye size={16} strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full cursor-pointer rounded-lg bg-[var(--accent)] py-3 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
            Need help?{" "}
            <a
              href="mailto:support@saylaniwelfare.com"
              className="text-[var(--accent)] font-medium hover:underline"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
