/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

// --- Tailwind CSS CDN (add to index.html or via build tool) ---
// <script src="https://cdn.tailwindcss.com"></script>

// --- Auth Context for global user state ---
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// --- REAL API CONFIGURATION ---
// Replace this base URL with your actual backend API endpoint
const API_BASE_URL = "https://reqres.in/api"; // Using reqres.in as mock API endpoint for demo
// For a real backend, change to: 'https://your-api.com/api'

// Real API login function
const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Invalid email or password");
    }

    // After successful login, fetch user details (in real API, you'd have a /me endpoint)
    // For demo, we'll simulate user role fetch. Replace with actual user endpoint.
    const userDetails = await fetchUserByEmail(email);

    return {
      success: true,
      user: userDetails,
      token: data.token, // Store token for authenticated requests
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Login failed. Please try again.",
    };
  }
};

// Fetch user details from real API (replace with your actual endpoint)
const fetchUserByEmail = async (email) => {
  // In a real app, you'd call: GET ${API_BASE_URL}/users/me with the token
  // For demo purposes, we'll simulate role assignment based on email
  // Replace this with actual API call to your backend

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Real role determination - in production, this comes from your backend
  if (email === "manager@resto.com" || email === "manager@example.com") {
    return { id: 1, email, name: "Alex Manager", role: "manager" };
  } else if (email === "chef@resto.com" || email === "chef@example.com") {
    return { id: 2, email, name: "Gordon Chef", role: "chef" };
  }

  // Default fallback - your API should return role from database
  return { id: 3, email, name: email.split("@")[0], role: "staff" };
};

// Example of authenticated API request helper
const authenticatedFetch = async (url, token, options = {}) => {
  return fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
};

// --- Protected Route Wrapper (checks auth + role) ---
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
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "manager") return <Navigate to="/dashboard" replace />;
    if (user.role === "chef") return <Navigate to="/chef/dashboard" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
};

// --- LOGIN MODAL COMPONENT (with real API integration) ---
const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await loginUser(email, password);

      if (result.success) {
        // Store token in localStorage (not cookies)
        if (result.token) {
          localStorage.setItem("auth_token", result.token);
        }
        onLoginSuccess(result.user);
        onClose();

        // Navigate based on role
        if (result.user.role === "manager") {
          navigate("/dashboard");
        } else if (result.user.role === "chef") {
          navigate("/chef/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Network error. Please try again.");
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
              <p className="mt-6 text-sm text-amber-50">
                Demo Manager: manager@resto.com / any password
              </p>
              <p className="text-sm text-amber-50">
                Demo Chef: chef@resto.com / any password
              </p>
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
                <div className="bg-red-50 text-red-600 text-sm p-2 rounded-lg border border-red-200">
                  {error}
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
            <div className="mt-6 text-center text-xs text-gray-400">
              Real API integration • Token stored in localStorage
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MANAGER DASHBOARD ---
const ManagerDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({ orders: 24, revenue: 4850, staff: 12 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch real data from API
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        // Example API call - replace with your actual endpoint
        // const response = await fetch('https://your-api.com/dashboard/stats', {
        //   headers: { 'Authorization': `Bearer ${token}` }
        // });
        // const data = await response.json();
        // setStats(data);

        // Simulated API delay
        setTimeout(() => setLoading(false), 500);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-amber-600 p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Manager Portal</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">👋 Hi, {user?.name}</span>
          <button
            onClick={logout}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h2>
          <p className="text-gray-500">
            Restaurant performance metrics & management tools
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow p-6 border-l-4 border-amber-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Today's Orders</p>
                    <p className="text-3xl font-bold">{stats.orders}</p>
                  </div>
                  <div className="bg-amber-100 p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Revenue (Today)</p>
                    <p className="text-3xl font-bold">${stats.revenue}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Active Staff</p>
                    <p className="text-3xl font-bold">{stats.staff}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span>🍝 Order #234 - Completed</span>
                  <span className="text-gray-400 text-sm">10 min ago</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>🥗 New reservation for 8 guests</span>
                  <span className="text-gray-400 text-sm">1 hour ago</span>
                </div>
                <div className="flex justify-between">
                  <span>⭐ Inventory low: Olive oil</span>
                  <span className="text-gray-400 text-sm">2 hours ago</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// --- CHEF DASHBOARD ---
const ChefDashboard = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from real API
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        // Example API call - replace with your actual endpoint
        // const response = await fetch('https://your-api.com/kitchen/orders', {
        //   headers: { 'Authorization': `Bearer ${token}` }
        // });
        // const data = await response.json();
        // setOrders(data);

        // Simulated API data
        setTimeout(() => {
          setOrders([
            {
              id: 101,
              item: "Margherita Pizza",
              table: 4,
              status: "pending",
              time: "12:30 PM",
            },
            {
              id: 102,
              item: "Grilled Salmon",
              table: 2,
              status: "preparing",
              time: "12:45 PM",
            },
            {
              id: 103,
              item: "Caesar Salad",
              table: 1,
              status: "ready",
              time: "12:15 PM",
            },
          ]);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("auth_token");
      // Example API call to update order status
      // await fetch(`https://your-api.com/orders/${orderId}/status`, {
      //   method: 'PATCH',
      //   headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: newStatus })
      // });

      // Optimistic update
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-green-700 p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Chef's Station</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">👨‍🍳 Chef {user?.name}</span>
          <button
            onClick={logout}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Kitchen Order Board
          </h2>
          <p className="text-gray-500">
            Manage & update dish preparation status
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-sm font-semibold text-gray-500">
                          Order #{order.id}
                        </span>
                        <h3 className="text-xl font-bold mt-1">{order.item}</h3>
                        <div className="flex gap-3 mt-2 text-sm text-gray-600">
                          <span>🍽️ Table {order.table}</span>
                          <span>⏱️ {order.time}</span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "preparing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      {order.status === "pending" && (
                        <button
                          onClick={() => updateStatus(order.id, "preparing")}
                          className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm"
                        >
                          Start Prep
                        </button>
                      )}
                      {order.status === "preparing" && (
                        <button
                          onClick={() => updateStatus(order.id, "ready")}
                          className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm"
                        >
                          Mark Ready
                        </button>
                      )}
                      {order.status === "ready" && (
                        <span className="text-green-700 text-sm font-medium">
                          ✅ Ready for service
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-amber-50 p-4 rounded-xl border border-amber-200">
              <p className="text-amber-800 text-sm">
                💡 Tip: Update order status as you cook. Completed orders go to
                serving team.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// --- LOGIN PAGE (redirects to home with modal) ---
const LoginPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (user) {
      if (user.role === "manager") navigate("/dashboard");
      else if (user.role === "chef") navigate("/chef/dashboard");
      else navigate("/");
    }
  }, [user, navigate]);

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
    // Check localStorage for existing session (no cookies)
    const storedUser = localStorage.getItem("resto_user");
    const token = localStorage.getItem("auth_token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("resto_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("resto_user");
    localStorage.removeItem("auth_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- MAIN APP WITH ROUTER ---
const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["manager"]}>
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chef/dashboard"
        element={
          <ProtectedRoute allowedRoles={["chef"]}>
            <ChefDashboard />
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
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
