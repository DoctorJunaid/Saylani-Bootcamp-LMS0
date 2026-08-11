import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-background)] px-4 py-8 font-sans">
      {/* Header section */}
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-3 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="SMIT Logo"
            className="h-20 w-auto object-contain max-w-[220px]"
          />
        </div>
        <h2 className="text-base font-semibold text-[var(--color-text-muted)]">
          Teacher Portal
        </h2>
      </div>

      {/* Main card box */}
      <div className="w-full max-w-[420px]">
        <div className="rounded-2xl border border-[var(--color-surface-high)] bg-[var(--color-surface)] p-6 shadow-sm">
          <h3 className="mb-1 text-xl font-bold text-[var(--color-text)]">
            Login
          </h3>
          <p className="mb-6 text-xs text-[var(--color-text-muted)] leading-relaxed">
            Kindly provide the email address and password used during SMIT onboarding.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="teacher-email"
                className="mb-1.5 block text-xs font-semibold text-[var(--color-text)]"
              >
                Email *
              </label>
              <input
                id="teacher-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teacher@saylani.org"
                className="w-full rounded-lg border border-[var(--color-surface-high)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-text)] placeholder-[var(--color-outline)]/60 transition-all focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              />
            </div>

            <div>
              <label
                htmlFor="teacher-password"
                className="mb-1.5 block text-xs font-semibold text-[var(--color-text)]"
              >
                Password *
              </label>
              <div className="relative flex items-center">
                <input
                  id="teacher-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-[var(--color-surface-high)] bg-[var(--color-surface)] py-2.5 pr-10 pl-3.5 text-sm text-[var(--color-text)] placeholder-[var(--color-outline)]/60 transition-all focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer"
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
              className="mt-2 w-full rounded-lg bg-[var(--color-primary)] py-2.5 text-xs font-bold tracking-wider text-[var(--color-on-primary)] uppercase transition-all duration-200 hover:bg-[#005180] active:scale-[0.99] cursor-pointer disabled:opacity-70"
            >
              {isLoading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}