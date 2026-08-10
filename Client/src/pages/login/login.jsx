import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../Services/auth.services";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    console.log("LOGIN BUTTON CLICKED");
    e.preventDefault();
    setIsLoading(true);
    try {

        const data = await loginAdmin(email, password);

        toast.success("Login successfully!")
        navigate("/dashboard")
    } 
    catch (error) 
    {
       toast.error(error.response?.data?.message || "Inavlid Email or password" );
  
    } finally {

    setIsLoading(false);

  }
      
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Left Side - Dark Blue Background */}
      <div className="hidden flex-col justify-between bg-[#004a75] p-10 text-white lg:flex xl:p-16">

        {/* SMIT Logo - Top Left */}
        <div className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="SMIT Logo"
            className="h-24 w-auto object-contain"
          />
        </div>

        {/* Center Text */}
        <div className="flex flex-1 max-w-[500px] flex-col justify-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Bootcamp LMS
            </h2>
            <p className="text-sm text-blue-100/70">
              One dashboard for your whole bootcamp.
            </p>
          </div>

          <p className="mt-12 text-[1.1rem] font-medium leading-relaxed text-blue-100/90">
            Students, daily attendance, teams and projects, and task tracking
            — all connected to a single central database.
          </p>
        </div>

        {/* Empty bottom section to preserve spacing */}
        <div></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-[420px]">

          {/* Heading */}
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl">
            Admin Login
          </h2>

          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Sign in to unlock the bootcamp dashboard.
          </p>

          {/* Toggle Switch */}
          <div className="mt-8 mb-7 flex rounded-lg border border-[#e5e7eb] bg-[#f0f2f5] p-1">
            <button
              type="button"
              className="flex-1 rounded-md bg-white py-2 text-sm font-semibold text-[var(--color-text)] shadow-sm ring-1 ring-black/5 transition-all"
            >
              Sign in
            </button>

            <button
              type="button"
              className="flex-1 py-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              Create admin
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            {/* Email */}
            <div>
              <label
                htmlFor="admin-email"
                className="mb-1.5 block text-[13px] font-medium text-[var(--color-text)]"
              >
                Email
              </label>

              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bootcamp.dev"
                className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3.5 py-2.5 text-sm text-[var(--color-text)] placeholder-[var(--color-outline)]/50 transition-all focus:border-[#00639b] focus:outline-none focus:ring-1 focus:ring-[#00639b]"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block text-[13px] font-medium text-[var(--color-text)]"
              >
                Password
              </label>

              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3.5 py-2.5 text-sm text-[var(--color-text)] transition-all focus:border-[#00639b] focus:outline-none focus:ring-1 focus:ring-[#00639b]"
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full rounded-lg bg-primary cursor-pointer py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#005180] disabled:opacity-70"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
