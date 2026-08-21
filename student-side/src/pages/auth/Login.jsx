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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.identifier.trim() || !formData.password.trim()) {
      toast.error("Please enter your Roll Number or Email and Password.");
      return;
    }

    setLoading(true);

    try {
      await login(formData.identifier.trim(), formData.password);
      toast.success("Successfully logged in!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        background: "var(--bg)",
      }}
    >
      {/* Left Brand Panel — Saylani Deep Blue with Hero Logo & Highlights */}
      <div
        className="login-left-panel"
        style={{
          flex: "1 1 52%",
          background: "#004a75",
          padding: "3.5rem",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.35,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at 20% 20%, rgba(41,169,255,0.4), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(0,99,155,0.6), transparent 50%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "520px",
            margin: "0 auto",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Top Headline */}
          <div>
            <p
              style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "rgba(224, 242, 254, 0.8)",
                margin: "0 0 8px 0",
              }}
            >
              Saylani Mass IT Training
            </p>
            <h1
              style={{
                fontSize: "2.25rem",
                fontWeight: "800",
                letterSpacing: "-0.02em",
                color: "#ffffff",
                margin: 0,
              }}
            >
              Student Portal
            </h1>
          </div>

          {/* Center Illustration */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "2rem 0",
            }}
          >
            <img
              src="/smit-hero-logo.png"
              alt="SMIT Hero Logo"
              style={{
                maxHeight: "270px",
                maxWidth: "100%",
                width: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.35))",
              }}
              onError={(e) => {
                e.currentTarget.src = "/smit-logo.png";
              }}
            />
          </div>

          {/* Bottom Highlights */}
          <div>
            <p
              style={{
                fontSize: "15px",
                fontWeight: "500",
                lineHeight: "1.6",
                color: "rgba(240, 249, 255, 0.95)",
                marginBottom: "1.25rem",
              }}
            >
              Track your attendance, build team projects, submit assignments, and
              collaborate with mentors from one unified system.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {HIGHLIGHTS.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    background: "rgba(255, 255, 255, 0.12)",
                    padding: "6px 14px",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#f0f9ff",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <Icon size={14} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Login Form Panel — Restored Previous Clean Native Theme Form */}
      <div
        className="login-form-panel"
        style={{
          flex: "1 1 48%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3.5rem 3rem",
          background: "var(--surface)",
        }}
      >
        <div
          className="login-form-inner"
          style={{ width: "100%", maxWidth: "390px" }}
        >
          <div
            className="login-logo"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "2rem",
            }}
          >
            <img
              src="/smit-logo.png"
              alt="SMIT Logo"
              style={{ height: "38px", objectFit: "contain" }}
            />
          </div>

          <h1 className="login-headline">Welcome back.</h1>
          <p className="login-sub">
            Sign in to your <strong>Saylani Bootcamp</strong> student portal.
          </p>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-field">
              <label htmlFor="identifier" className="field-label">
                Roll Number or Email
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="e.g. 100234 or student@smitlms.com"
                className="field-input"
                autoComplete="username"
                value={formData.identifier}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="password" className="field-label">
                Password
              </label>
              <div className="field-password-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="field-input"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <button
                type="button"
                className="forgot-link"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  textAlign: "right",
                  display: "block",
                  width: "100%",
                }}
                onClick={() =>
                  toast(
                    "Please contact your campus administrator to reset your password.",
                    {
                      icon: "ℹ️",
                    }
                  )
                }
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="btn-primary btn-full"
              disabled={loading}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "0.85rem",
                marginTop: "0.5rem",
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </form>

          <p className="signup-cta" style={{ marginTop: "2rem" }}>
            Need help?{" "}
            <a
              href="mailto:support@saylaniwelfare.com"
              style={{ color: "var(--accent)", fontWeight: 500 }}
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
