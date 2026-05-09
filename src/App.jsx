
 
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { Register } from "./components/register/Register";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dashboard } from "./components/dashboard/Dashboard";
import { ChefDashboard } from "./components/chefdashboard/ChefDashboard";

// --- Auth Context for global user state ---
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// --- REAL API CONFIGURATION ---
const API_BASE_URL = "https://nutriscan-foodanddrinksupply.onrender.com";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// ========== SECURE STORAGE HELPERS (No Cookies) ==========
// Store only essential user data (email, role) with expiration
const setAuthData = (token, user) => {
  const expiresAt = Date.now() + 12 * 60 * 60 * 1000; // 12 hours expiration

  const authData = {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name || user.email?.split("@")[0],
    },
    expiresAt,
  };

  localStorage.setItem("auth_data", JSON.stringify(authData));
};

const getAuthData = () => {
  const data = localStorage.getItem("auth_data");
  if (!data) return null;

  try {
    const parsed = JSON.parse(data);
    // Check if token has expired
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      clearAuthData();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

const getToken = () => {
  const authData = getAuthData();
  return authData?.token || null;
};

const getUserFromStorage = () => {
  const authData = getAuthData();
  return authData?.user || null;
};

const clearAuthData = () => {
  localStorage.removeItem("auth_data");
};

// Axios interceptor for auth token
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Axios interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthData();
      window.dispatchEvent(new CustomEvent("auth:logout"));
    }
    return Promise.reject(error);
  },
);

// REAL API login function - FIXED to handle your API response structure
const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    const data = response.data;

    // console.log("Full Login API Response:", data);

    // YOUR API RETURNS: { success: true, message: "...", data: { token: "...", user: {...} } }
    if (data.success === true && data.data) {
      const token = data.data.token;
      const userData = data.data.user;

      if (token && userData) {
        // Store user data with expiration
        setAuthData(token, {
          id: userData.id,
          email: userData.email,
          role: userData.role,
          name: userData.name,
        });

        console.log("Login successful, user role:", userData.role);

        return {
          success: true,
          user: {
            id: userData.id,
            email: userData.email,
            role: userData.role,
            name: userData.name,
          },
          token: token,
        };
      } else {
        return {
          success: false,
          message: "Invalid response structure from server",
        };
      }
    } else {
      return {
        success: false,
        message: data.message || "Invalid email or password",
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    let message = "Invalid email or password";
    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.response?.data?.error) {
      message = error.response.data.error;
    } else if (error.message) {
      message = error.message;
    }
    return { success: false, message };
  }
};

// LOGOUT FUNCTION - clears localStorage
const logoutUser = async () => {
  try {
    const token = getToken();
    if (token) {
      // Optional: Send logout request to backend
      await apiClient
        .post(
          "/auth/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        .catch(() => {
          // Ignore logout API errors, just clear local data
          console.log("Logout API call failed, clearing local data only");
        });
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Always clear local storage regardless of API response
    clearAuthData();
  }
};

// --- Protected Route Wrapper ---
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log("ProtectedRoute - No user, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on role
    if (user.role === "manager") return <Navigate to="/dash/manager" replace />;
    if (user.role === "chef") return <Navigate to="/chef/dashboard" replace />;
    if (user.role === "staff")
      return <Navigate to="/staff/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

// --- LOGIN MODAL COMPONENT ---
const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await loginUser(email, password);
      console.log("Login result:", result);

      if (result.success && result.user) {
        // FIRST: Update the auth context
        login(result.user);

        // Show success toast only on successful login
        toast.success(
          `Welcome back, ${result.user.name || result.user.email}!`,
        );
        onLoginSuccess(result.user);
        onClose();

        // Give a small delay to ensure auth state is updated before navigation
        setTimeout(() => {
          // Redirect based on role
          console.log("Redirecting based on role:", result.user.role);
          if (result.user.role === "manager") {
            navigate("/dash/manager", { replace: true });
          } else if (result.user.role === "chef") {
            navigate("/chef/dashboard", { replace: true });
          } else if (result.user.role === "staff") {
            navigate("/staff/dashboard", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }, 100);
      } else {
        const errorMsg = result.message || "Invalid email or password";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMsg =
        err.response?.data?.message || "Network error. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* LEFT IMAGE SECTION */}
          <div className="md:w-1/2 bg-gradient-to-br from-amber-500 to-orange-600 p-8 flex flex-col justify-center items-center text-white">
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mx-auto mb-4 drop-shadow-lg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6.5M17 13l1.5 6.5M9 21h6M12 17v4M6 3h12l-1 4H7L6 3z"
                />
              </svg>
              <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
              <p className="text-amber-100">Sign in to access your dashboard</p>
              <div className="mt-6 w-24 h-1 bg-white/50 rounded-full mx-auto"></div>
            </div>
          </div>

          {/* RIGHT FORM SECTION */}
          <div className="md:w-1/2 p-8 bg-white">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Sign In</h3>
              <p className="text-gray-500 text-sm mt-1">
                Enter your credentials to continue
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200 flex items-start gap-2">
                  <svg
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {isLoading ? "Authenticating..." : "Login →"}
              </button>
            </form>
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/register")}
                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                Don't have an account? Register →
              </button>
            </div>
            <div className="mt-4 text-center text-xs text-gray-400">
              Secure authentication • Session expires after 12 hours
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- LOGIN PAGE ---
const LoginPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    // Only redirect if not loading and user exists
    if (!loading && user) {
      console.log("LoginPage - User detected, redirecting:", user.role);
      if (user.role === "manager") {
        navigate("/dash/manager", { replace: true });
      } else if (user.role === "chef") {
        navigate("/chef/dashboard", { replace: true });
      } else if (user.role === "staff") {
        navigate("/staff/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [user, loading, navigate]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
      <LoginModal
        isOpen={showLogin}
        onClose={() => {
          setShowLogin(false);
          navigate("/");
        }}
        onLoginSuccess={(user) => {}}
      />
    </div>
  );
};

// --- AUTH PROVIDER WRAPPER ---
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const initializeAuth = async () => {
      const authData = getAuthData();

      if (authData && authData.user && authData.token) {
        // Check if token is still valid (not expired)
        if (authData.expiresAt && Date.now() < authData.expiresAt) {
          setUser(authData.user);
        } else {
          // Token expired, clear storage

          clearAuthData();
        }
      }
      setLoading(false);
    };

    initializeAuth();

    // Listen for auth logout events from axios interceptor
    const handleAuthLogout = () => {
      setUser(null);
      clearAuthData();
      toast.info("Session expired. Please login again.");
    };

    window.addEventListener("auth:logout", handleAuthLogout);
    return () => window.removeEventListener("auth:logout", handleAuthLogout);
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
    clearAuthData();
    toast.info("Logged out successfully");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- CHECK AUTH STATUS HELPER (for use in other components) ---
export const checkAuthStatus = () => {
  const authData = getAuthData();
  if (authData && authData.expiresAt && Date.now() < authData.expiresAt) {
    return {
      isAuthenticated: true,
      user: authData.user,
      token: authData.token,
    };
  }
  return {
    isAuthenticated: false,
    user: null,
    token: null,
  };
};

// --- GET AUTH HEADERS HELPER (for API calls) ---
export const getAuthHeaders = () => {
  const token = getToken();
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {};
};

// --- MAIN APP WITH ROUTER ---
const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginPage />} />
      {/* Your existing protected routes - keep these as they are */}
      <Route
        path="/dash/manager"
        element={
          <ProtectedRoute allowedRoles={["manager"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chef/dashboard"
        element={
          <ProtectedRoute allowedRoles={["chef"]}>
            {/* Your existing Chef Dashboard Component */}
            <ChefDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/dashboard"
        element={
          <ProtectedRoute allowedRoles={["staff"]}>
            {/* Your existing Staff Dashboard Component */}
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
      
    </Routes>
  );
};

// --- ROOT COMPONENT ---
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
