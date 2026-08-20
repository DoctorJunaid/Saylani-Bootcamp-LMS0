import React, { createContext, useState, useEffect, useCallback } from "react";
import { storage } from "../utils/storage";
import { authService } from "../services/auth.service";

export const AuthContext = createContext(null);

const DEFAULT_MOCK_STUDENT = {
  id: "student-mock-01",
  name: "Muhammad Junaid",
  rollNumber: "102341",
  email: "junaid@example.com",
  course: "MERN Stack Development",
  batch: "Batch 11",
  avatar: "",
  role: "student",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => storage.getUser() || null);
  const [token, setToken] = useState(() => storage.getToken() || null);
  const [loading, setLoading] = useState(false);

  // Sync / verify current user session on mount
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = storage.getToken();
      if (savedToken) {
        // In a real app, verify token with backend here
        // For now, we trust local storage
        setUser(storage.getUser() || DEFAULT_MOCK_STUDENT);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = useCallback(async (identifier, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      // Simulate network request latency
      setTimeout(() => {
        setLoading(false);
        // Simple mock validation
        if (identifier && password.length >= 6) {
          const devStudent = {
            ...DEFAULT_MOCK_STUDENT,
            email: identifier.includes("@") ? identifier : DEFAULT_MOCK_STUDENT.email,
            rollNumber: !identifier.includes("@") ? identifier : DEFAULT_MOCK_STUDENT.rollNumber,
          };
          
          const fakeToken = "ey.mock-jwt-token." + Date.now();
          setUser(devStudent);
          setToken(fakeToken);
          storage.setUser(devStudent);
          storage.setToken(fakeToken);
          resolve({ token: fakeToken, student: devStudent });
        } else {
          reject(new Error("Invalid credentials. Password must be at least 6 characters."));
        }
      }, 1000);
    });
  }, []);

  const logout = useCallback(async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        storage.clearAuth();
        setUser(null);
        setToken(null);
        resolve();
      }, 500);
    });
  }, []);

  const updateUser = useCallback((updatedUserData) => {
    setUser((prev) => {
      const merged = { ...prev, ...updatedUserData };
      storage.setUser(merged);
      return merged;
    });
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
