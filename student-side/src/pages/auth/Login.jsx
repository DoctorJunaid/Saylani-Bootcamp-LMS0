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
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        background: "var(--bg)",
      }}
    >
      {/* Left Brand Panel — Same Rich Visual Panel as Admin */}
      <div
        className="login-left-panel"
        style={{
          flex: "1 1 50%",
          background: "#004a75",
          padding: "3rem",
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

          {/* Center Brand Illustration */}
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
                maxHeight: "260px",
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

      {/* Right Login Form */}
      <div
        style={{
          flex: "1 1 50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2.5rem 1.5rem",
          background: "var(--bg)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "2.25rem",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
            }}
          >
            <img
              src="/smit-logo.png"
              alt="Saylani SMIT"
              style={{ height: "36px", objectFit: "contain" }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                padding: "3px 10px",
                borderRadius: "9999px",
                background: "rgba(27, 117, 187, 0.1)",
                color: "var(--accent)",
                border: "1px solid rgba(27, 117, 187, 0.2)",
              }}
            >
              Student Portal
            </span>
          </div>

          <h2
            style={{
              fontSize: "1.65rem",
              fontWeight: "700",
              color: "var(--text)",
              margin: "0 0 6px 0",
              letterSpacing: "-0.02em",
            }}
          >
            Welcome back.
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "var(--text-muted)",
              margin: "0 0 1.75rem 0",
            }}
          >
            Sign in to open your bootcamp student portal.
          </p>

          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "var(--text)",
                  marginBottom: "6px",
                }}
              >
                Roll Number or Email
              </label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder="e.g. 100234 or student@smitlms.com"
                required
                autoComplete="username"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  background: "var(--bg)",
                  fontSize: "14px",
                  color: "var(--text)",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
              />
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "var(--text)",
                  }}
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() =>
                    toast(
                      "Please contact your campus instructor or admin to reset your password.",
                      {
                        icon: "ℹ️",
                      }
                    )
                  }
                  style={{
                    fontSize: "12px",
                    color: "var(--accent)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Forgot password?
                </button>
              </div>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  style={{
                    width: "100%",
                    padding: "0.75rem 2.5rem 0.75rem 1rem",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                    fontSize: "14px",
                    color: "var(--text)",
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                marginTop: "0.5rem",
                width: "100%",
                padding: "0.85rem",
                borderRadius: "10px",
                background: "var(--accent)",
                color: "#ffffff",
                fontSize: "14.5px",
                fontWeight: "600",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "opacity 0.2s, transform 0.1s",
                boxShadow: "0 4px 12px rgba(27, 117, 187, 0.25)",
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </form>

          <p
            style={{
              fontSize: "12.5px",
              color: "var(--text-muted)",
              textAlign: "center",
              marginTop: "1.75rem",
              marginBottom: 0,
            }}
          >
            Need help?{" "}
            <a
              href="mailto:support@saylaniwelfare.com"
              style={{
                color: "var(--accent)",
                fontWeight: "500",
                textDecoration: "none",
              }}
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
