import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

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
      toast.error("Please enter your Roll Number / Email and Password.");
      return;
    }

    setLoading(true);

    try {
      await login(formData.identifier.trim(), formData.password);
      toast.success("Successfully logged in!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-layout fade-in">
      <div className="login-photo-panel">
        <img
          src="/hero.jpg"
          alt="Student studying in library"
          className="login-photo"
        />
        <div className="login-photo-overlay">
          <div className="login-photo-brand">
            <img
              src="/smit-logo.png"
              alt="SMIT Logo"
              className="login-overlay-logo"
            />
            <blockquote className="login-quote">
              <p>"Building Pakistan's Tech Future — one student at a time."</p>
              <cite>— Saylani Mass IT Training</cite>
            </blockquote>
          </div>
        </div>
      </div>

      <div className="login-form-panel">
        <div className="login-form-inner">
          <div className="login-logo">
            <img
              src="/smit-logo.png"
              alt="SMIT Logo"
              className="login-logo-img"
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
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                onClick={() =>
                  toast("Please contact your campus administrator to reset your password.", {
                    icon: "ℹ️",
                  })
                }
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="btn-primary btn-full"
              disabled={loading}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
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
