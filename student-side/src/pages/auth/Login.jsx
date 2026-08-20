import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("student"); // "student" | "admin"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.identifier.trim() || !formData.password.trim()) {
      import("react-hot-toast").then((module) => {
        module.default.error("Please enter your Roll Number and Password.");
      });
      return;
    }

    setLoading(true);
    
    try {
      await login(formData.identifier, formData.password);
      import("react-hot-toast").then((module) => {
        module.default.success("Successfully logged in!");
      });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      import("react-hot-toast").then((module) => {
        module.default.error(err.message || "Invalid credentials. Please try again.");
      });
      setLoading(false);
    }
  };

  return (
    <div className="login-layout fade-in">
      <div className="login-photo-panel">
        <img src="/hero.jpg" alt="Student studying in library" className="login-photo" />
        <div className="login-photo-overlay">
          <div className="login-photo-brand">
            <img src="/smit-logo.png" alt="SMIT Logo" className="login-overlay-logo" />
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
            <img src="/smit-logo.png" alt="SMIT Logo" className="login-logo-img" />
          </div>
          
          <h1 className="login-headline">Welcome back.</h1>
          <p className="login-sub">
            Sign in to your <strong>Saylani Bootcamp</strong> {activeTab} dashboard.
          </p>

          <div className="login-tab-group">
            <button 
              className={`login-tab ${activeTab === "student" ? "active" : ""}`}
              onClick={() => setActiveTab("student")}
            >
              Student
            </button>
            <button 
              className={`login-tab ${activeTab === "admin" ? "active" : ""}`}
              onClick={() => setActiveTab("admin")}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-field">
              <label htmlFor="identifier" className="field-label">
                Roll Number or Email
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="100234 or you@email.com"
                className="field-input"
                autoComplete="username"
                value={formData.identifier}
                onChange={handleChange}
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
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>
            
            <button type="submit" className="btn-primary btn-full" disabled={loading}>
              <span>{loading ? "Signing in..." : "Sign in"}</span>
            </button>
          </form>

          <div className="or-divider">
            <span>or</span>
          </div>

          <div className="sso-group">
            <button className="btn-sso">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
            <button className="btn-sso">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0078D4">
                <path d="M11.4 24H0V12.6L11.4 24zM24 24H12.6L24 12.6V24zM24 11.4V0H12.6L24 11.4zM11.4 0H0v11.4L11.4 0z" />
              </svg>
              Continue with Microsoft
            </button>
          </div>

          <p className="signup-cta">
            New student? <a href="#">Activate your account</a>
          </p>
        </div>
      </div>
    </div>
  );
};
