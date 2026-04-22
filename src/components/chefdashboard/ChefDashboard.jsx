/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
/* eslint-disable no-unused-vars */
// ChefDashboard.jsx
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Kitchen as KitchenIcon,
  RestaurantMenu as MenuIcon,
  ShoppingCart as OrdersIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Timer as TimerIcon,
  AccessTime as TimeIcon,
  Warning as WarningIcon,
  LocalFireDepartment as FireIcon,
  EmojiEvents as TrophyIcon,
  Speed as SpeedIcon,
  DoneAll as DoneAllIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  VolumeUp as AlertIcon,
  Print as PrintIcon,
  Restaurant as RestaurantIcon,
  Person as PersonIcon,
  TableRestaurant as TableIcon,
  HealthAndSafety as HealthIcon,
  Science as ScienceIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  PlayArrow as StartIcon,
  Fastfood as FoodIcon,
} from "@mui/icons-material";

// ========== KITCHEN ORDER CARD COMPONENT ==========
const KitchenOrderCard = ({ order, onStartPreparation, onMarkReady, onViewDetails }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (order.status === "preparing" && order.startedAt) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - new Date(order.startedAt)) / 60000);
        setTimeElapsed(elapsed);
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [order.status, order.startedAt]);

  const getPriorityColor = () => {
    const elapsed = timeElapsed;
    if (elapsed > (order.estimatedTime || 20)) return "border-red-500 bg-red-50";
    if (elapsed > (order.estimatedTime || 20) * 0.7) return "border-yellow-500 bg-yellow-50";
    return "border-green-500 bg-green-50";
  };

  const getStatusBadge = () => {
    switch (order.status) {
      case "pending":
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"><TimeIcon className="text-yellow-600 text-sm" /> Waiting</span>;
      case "confirmed":
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"><CheckCircleIcon className="text-blue-600 text-sm" /> Confirmed</span>;
      case "preparing":
        return <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"><FireIcon className="text-purple-600 text-sm" /> Cooking</span>;
      case "ready":
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"><DoneAllIcon className="text-green-600 text-sm" /> Ready</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">{order.status}</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${getPriorityColor()} transition-all duration-300 ${isHovered ? "shadow-xl" : ""}`}
    >
      {/* Order Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-gray-700">#{order.orderId?.slice(-8)}</span>
              {getStatusBadge()}
            </div>
            <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
              <span className="flex items-center gap-1"><TableIcon fontSize="small" /> Table {order.tableNumber}</span>
              <span className="flex items-center gap-1"><PersonIcon fontSize="small" /> {order.customerName || "Guest"}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-orange-600 font-bold">
              <TimerIcon fontSize="small" />
              <span>{order.estimatedTime || 20} min est.</span>
            </div>
            {order.status === "preparing" && (
              <div className="text-xs text-gray-500 mt-1">Elapsed: {timeElapsed} min</div>
            )}
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-4">
        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-1">
          <FoodIcon fontSize="small" /> Order Items ({order.items?.length || 0})
        </h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {order.items?.map((item, idx) => (
            <div key={idx} className="text-sm">
              <div className="flex justify-between">
                <span className="font-medium">{item.quantity}x {item.name}</span>
                <span className="text-gray-500">{item.preparationTime || 15} min</span>
              </div>
              {item.customizations?.length > 0 && (
                <div className="text-xs text-orange-600 mt-0.5">
                  ✨ {item.customizations.join(", ")}
                </div>
              )}
              {item.specialInstructions && (
                <div className="text-xs text-blue-600 mt-0.5">
                  📝 {item.specialInstructions}
                </div>
              )}
              {item.healthAnalysis?.highRiskCount > 0 && (
                <div className="text-xs text-red-500 mt-0.5 flex items-center gap-1">
                  <HealthIcon fontSize="inherit" /> Allergy Alert
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Special Notes */}
        {order.medicalConditions?.length > 0 && (
          <div className="mt-3 p-2 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-1 text-xs text-red-700">
              <HealthIcon fontSize="small" />
              <span className="font-medium">Medical Conditions:</span>
              <span>{order.medicalConditions.join(", ")}</span>
            </div>
          </div>
        )}

        {order.notes && (
          <div className="mt-2 p-2 bg-yellow-50 rounded-lg text-xs text-yellow-700">
            📌 {order.notes}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t bg-gray-50 flex gap-2">
        {order.status === "pending" || order.status === "confirmed" ? (
          <button
            onClick={() => onStartPreparation(order)}
            className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition flex items-center justify-center gap-2"
          >
            <StartIcon fontSize="small" /> Start Cooking
          </button>
        ) : order.status === "preparing" ? (
          <button
            onClick={() => onMarkReady(order)}
            className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition flex items-center justify-center gap-2"
          >
            <DoneAllIcon fontSize="small" /> Mark as Ready
          </button>
        ) : order.status === "ready" ? (
          <div className="flex-1 bg-gray-200 text-gray-600 py-2 rounded-lg text-center flex items-center justify-center gap-2">
            <CheckCircleIcon fontSize="small" /> Ready for Service
          </div>
        ) : null}
        
        <button
          onClick={() => onViewDetails(order)}
          className="px-4 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition flex items-center gap-1"
        >
          <ViewIcon fontSize="small" /> Details
        </button>
      </div>
    </motion.div>
  );
};

// ========== ORDER DETAILS MODAL ==========
const OrderDetailsModal = ({ order, onClose, onStartPreparation, onMarkReady }) => {
  if (!order) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "preparing": return "bg-purple-100 text-purple-800";
      case "ready": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0">
          <div>
            <h2 className="text-white font-bold text-xl">Order Details</h2>
            <p className="text-purple-200 text-sm">Kitchen View</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
            <CloseIcon className="text-white" />
          </button>
        </div>

        <div className="p-6">
          {/* Order Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-xs text-gray-500">Order ID</p>
              <p className="font-mono font-medium text-sm">{order.orderId}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Table Number</p>
              <p className="font-medium">Table {order.tableNumber}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Customer</p>
              <p className="font-medium">{order.customerName || "Guest"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Order Time</p>
              <p className="text-sm">{new Date(order.createdAt).toLocaleTimeString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Est. Preparation</p>
              <p className="text-sm">{order.estimatedTime || 20} minutes</p>
            </div>
            {order.startedAt && (
              <div>
                <p className="text-xs text-gray-500">Started At</p>
                <p className="text-sm">{new Date(order.startedAt).toLocaleTimeString()}</p>
              </div>
            )}
            {order.completedAt && (
              <div>
                <p className="text-xs text-gray-500">Completed At</p>
                <p className="text-sm">{new Date(order.completedAt).toLocaleTimeString()}</p>
              </div>
            )}
          </div>

          {/* Items List */}
          <h3 className="font-bold text-gray-800 mb-3">Items to Prepare</h3>
          <div className="space-y-4 mb-6">
            {order.items?.map((item, idx) => (
              <div key={idx} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">{item.quantity}x</span>
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400">Prep time</span>
                    <p className="text-sm font-medium">{item.preparationTime || 15} min</p>
                  </div>
                </div>

                {/* Ingredients */}
                {item.ingredients?.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Ingredients:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.ingredients.map((ing, i) => (
                        <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{ing}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Customizations */}
                {item.customizations?.length > 0 && (
                  <div className="mt-2 p-2 bg-orange-50 rounded-lg">
                    <p className="text-xs font-medium text-orange-700">Customizations:</p>
                    <ul className="text-xs text-orange-600 list-disc list-inside">
                      {item.customizations.map((c, i) => (<li key={i}>{c}</li>))}
                    </ul>
                  </div>
                )}

                {/* Special Instructions */}
                {item.specialInstructions && (
                  <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                    <p className="text-xs font-medium text-blue-700">Special Instructions:</p>
                    <p className="text-xs text-blue-600">{item.specialInstructions}</p>
                  </div>
                )}

                {/* Health Alerts */}
                {item.healthAnalysis?.highRiskCount > 0 && (
                  <div className="mt-2 p-2 bg-red-50 rounded-lg flex items-start gap-2">
                    <WarningIcon className="text-red-500 text-sm" />
                    <div>
                      <p className="text-xs font-medium text-red-700">Allergy/Health Alert!</p>
                      <p className="text-xs text-red-600">Contains {item.healthAnalysis.highRiskCount} high-risk ingredient(s)</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Medical Conditions Summary */}
          {order.medicalConditions?.length > 0 && (
            <div className="p-3 bg-purple-50 rounded-xl mb-6">
              <p className="text-sm font-medium text-purple-700 flex items-center gap-1">
                <HealthIcon fontSize="small" /> Customer Medical Conditions
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {order.medicalConditions.map((cond, i) => (
                  <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{cond}</span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button onClick={onClose} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
              Close
            </button>
            {order.status === "pending" || order.status === "confirmed" ? (
              <button
                onClick={() => { onStartPreparation(order); onClose(); }}
                className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition"
              >
                Start Cooking
              </button>
            ) : order.status === "preparing" ? (
              <button
                onClick={() => { onMarkReady(order); onClose(); }}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition"
              >
                Mark as Ready
              </button>
            ) : null}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ========== STATISTICS CARD ==========
const StatCard = ({ title, value, icon, color, subtitle }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl shadow-lg p-5 border-l-4 ${color}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full bg-${color.split('-')[1]}-100`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

// ========== MAIN CHEF DASHBOARD ==========
export const ChefDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pendingOrders: 0,
    preparingOrders: 0,
    readyOrders: 0,
    completedToday: 0,
    avgPreparationTime: 0,
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioContext, setAudioContext] = useState(null);

  // Load orders from localStorage
  const loadOrders = useCallback(() => {
    setLoading(true);
    try {
      const storedOrders = JSON.parse(localStorage.getItem("order_history") || "[]");
      const fallbackOrders = JSON.parse(localStorage.getItem("fallback_orders") || "[]");
      const allOrders = [...storedOrders, ...fallbackOrders];
      
      // Sort by creation date (newest first for pending, oldest first for active)
      const sorted = allOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sorted);
      
      // Calculate stats
      const pending = sorted.filter(o => o.status === "pending" || o.status === "confirmed").length;
      const preparing = sorted.filter(o => o.status === "preparing").length;
      const ready = sorted.filter(o => o.status === "ready").length;
      const completedToday = sorted.filter(o => {
        const today = new Date().toDateString();
        return (o.status === "completed" || o.status === "ready") && 
               new Date(o.createdAt).toDateString() === today;
      }).length;
      
      // Calculate average preparation time for completed orders
      const completedOrders = sorted.filter(o => o.status === "completed" && o.startedAt && o.completedAt);
      const avgTime = completedOrders.length > 0
        ? completedOrders.reduce((sum, o) => {
            const start = new Date(o.startedAt);
            const end = new Date(o.completedAt);
            return sum + (end - start) / 60000;
          }, 0) / completedOrders.length
        : 0;
      
      setStats({
        pendingOrders: pending,
        preparingOrders: preparing,
        readyOrders: ready,
        completedToday,
        avgPreparationTime: Math.round(avgTime),
      });
      
      // Play sound for new orders
      const newOrders = sorted.filter(o => 
        (o.status === "pending" || o.status === "confirmed") && 
        new Date(o.createdAt) > new Date(Date.now() - 30000)
      );
      if (soundEnabled && newOrders.length > 0) {
        playNotificationSound();
      }
      
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [soundEnabled]);

  // Play notification sound
  const playNotificationSound = () => {
    try {
      const audio = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");
      audio.volume = 0.3;
      audio.play().catch(e => console.log("Audio play failed:", e));
    } catch (error) {
      console.log("Sound not supported");
    }
  };

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [loadOrders]);

  // Start preparing an order
  const startPreparation = (order) => {
    const updatedOrders = orders.map(o => {
      if (o.orderId === order.orderId) {
        return {
          ...o,
          status: "preparing",
          startedAt: new Date().toISOString(),
        };
      }
      return o;
    });
    setOrders(updatedOrders);
    updateStorage(updatedOrders);
    toast.success(`Started preparing Order #${order.orderId?.slice(-8)}`);
    loadOrders(); // Refresh stats
  };

  // Mark order as ready
  const markAsReady = (order) => {
    const updatedOrders = orders.map(o => {
      if (o.orderId === order.orderId) {
        return {
          ...o,
          status: "ready",
          completedAt: new Date().toISOString(),
        };
      }
      return o;
    });
    setOrders(updatedOrders);
    updateStorage(updatedOrders);
    toast.success(`Order #${order.orderId?.slice(-8)} is ready for serving!`);
    loadOrders(); // Refresh stats
  };

  // Update localStorage
  const updateStorage = (updatedOrders) => {
    const storedOrders = JSON.parse(localStorage.getItem("order_history") || "[]");
    const updatedStored = storedOrders.map(o => {
      const updated = updatedOrders.find(u => u.orderId === o.orderId);
      return updated || o;
    });
    localStorage.setItem("order_history", JSON.stringify(updatedStored));
  };

  // Filter orders based on active tab and search
  const getFilteredOrders = () => {
    let filtered = orders;
    
    // Filter by status tab
    if (activeTab === "active") {
      filtered = orders.filter(o => ["pending", "confirmed", "preparing"].includes(o.status));
    } else if (activeTab === "ready") {
      filtered = orders.filter(o => o.status === "ready");
    } else if (activeTab === "completed") {
      filtered = orders.filter(o => o.status === "completed");
    } else if (activeTab === "all") {
      filtered = orders;
    }
    
    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(o => 
        o.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.tableNumber?.toString().includes(searchTerm) ||
        o.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort: preparing orders first, then by creation time
    return filtered.sort((a, b) => {
      if (a.status === "preparing" && b.status !== "preparing") return -1;
      if (a.status !== "preparing" && b.status === "preparing") return 1;
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  };

  const filteredOrders = getFilteredOrders();

  // Group orders by status for better organization
  const pendingOrders = filteredOrders.filter(o => o.status === "pending" || o.status === "confirmed");
  const preparingOrders = filteredOrders.filter(o => o.status === "preparing");
  const readyOrders = filteredOrders.filter(o => o.status === "ready");

  const tabs = [
    { id: "active", label: "Active Orders", icon: <FireIcon />, count: stats.pendingOrders + stats.preparingOrders },
    { id: "ready", label: "Ready to Serve", icon: <DoneAllIcon />, count: stats.readyOrders },
    { id: "completed", label: "Completed", icon: <CheckCircleIcon /> },
    { id: "all", label: "All Orders", icon: <OrdersIcon /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading kitchen orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer position="top-right" />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg sticky top-0 z-10">
        <div className="px-6 py-4 flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <KitchenIcon className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Kitchen Dashboard</h1>
              <p className="text-purple-200 text-sm">Real-time order management for kitchen staff</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-full transition ${soundEnabled ? "bg-white/20" : "bg-white/10"}`}
            >
              <AlertIcon className="text-white" />
            </button>
            <button
              onClick={loadOrders}
              className="p-2 rounded-full hover:bg-white/20 transition"
            >
              <RefreshIcon className="text-white" />
            </button>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg">
              <SpeedIcon className="text-white" />
              <span className="text-sm font-medium">Avg Prep: {stats.avgPreparationTime} min</span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="px-6 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard
            title="Pending Orders"
            value={stats.pendingOrders}
            icon={<TimeIcon className="text-yellow-600" />}
            color="border-yellow-500"
            subtitle="Waiting to start"
          />
          <StatCard
            title="In Progress"
            value={stats.preparingOrders}
            icon={<FireIcon className="text-purple-600" />}
            color="border-purple-500"
            subtitle="Being cooked"
          />
          <StatCard
            title="Ready to Serve"
            value={stats.readyOrders}
            icon={<DoneAllIcon className="text-green-600" />}
            color="border-green-500"
            subtitle="Awaiting pickup"
          />
          <StatCard
            title="Completed Today"
            value={stats.completedToday}
            icon={<TrophyIcon className="text-teal-600" />}
            color="border-teal-500"
          />
          <StatCard
            title="Avg Prep Time"
            value={`${stats.avgPreparationTime} min`}
            icon={<SpeedIcon className="text-indigo-600" />}
            color="border-indigo-500"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 pt-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? "bg-white/20" : "bg-purple-100 text-purple-600"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 pt-4">
        <div className="relative max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by Order ID, Table, or Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          />
        </div>
      </div>

      {/* Orders Grid */}
      <div className="p-6">
        {activeTab === "active" && (
          <>
            {/* Preparing Orders Section */}
            {preparingOrders.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FireIcon className="text-purple-600" /> In Progress ({preparingOrders.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <AnimatePresence>
                    {preparingOrders.map(order => (
                      <KitchenOrderCard
                        key={order.orderId}
                        order={order}
                        onStartPreparation={startPreparation}
                        onMarkReady={markAsReady}
                        onViewDetails={setSelectedOrder}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Pending Orders Section */}
            {pendingOrders.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <TimeIcon className="text-yellow-600" /> Pending ({pendingOrders.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <AnimatePresence>
                    {pendingOrders.map(order => (
                      <KitchenOrderCard
                        key={order.orderId}
                        order={order}
                        onStartPreparation={startPreparation}
                        onMarkReady={markAsReady}
                        onViewDetails={setSelectedOrder}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {preparingOrders.length === 0 && pendingOrders.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl">
                <KitchenIcon className="text-gray-300 text-6xl mx-auto mb-4" />
                <p className="text-gray-500">No active orders. Kitchen is idle.</p>
              </div>
            )}
          </>
        )}

        {activeTab === "ready" && (
          <>
            {readyOrders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {readyOrders.map(order => (
                  <KitchenOrderCard
                    key={order.orderId}
                    order={order}
                    onStartPreparation={startPreparation}
                    onMarkReady={markAsReady}
                    onViewDetails={setSelectedOrder}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl">
                <DoneAllIcon className="text-gray-300 text-6xl mx-auto mb-4" />
                <p className="text-gray-500">No orders ready for serving.</p>
              </div>
            )}
          </>
        )}

        {activeTab === "completed" && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Table</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prep Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.filter(o => o.status === "completed").map(order => {
                  const prepTime = order.startedAt && order.completedAt
                    ? Math.round((new Date(order.completedAt) - new Date(order.startedAt)) / 60000)
                    : "N/A";
                  return (
                    <tr key={order.orderId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-mono">{order.orderId?.slice(-8)}</td>
                      <td className="px-6 py-4 text-sm">Table {order.tableNumber}</td>
                      <td className="px-6 py-4 text-sm">{order.items?.length} items</td>
                      <td className="px-6 py-4 text-sm">{prepTime} min</td>
                      <td className="px-6 py-4 text-sm">{order.completedAt ? new Date(order.completedAt).toLocaleTimeString() : "-"}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => setSelectedOrder(order)} className="text-purple-600 hover:text-purple-800">
                          <ViewIcon fontSize="small" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "all" && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Table</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map(order => {
                  const getStatusBadge = () => {
                    switch (order.status) {
                      case "pending": return <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">Pending</span>;
                      case "confirmed": return <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">Confirmed</span>;
                      case "preparing": return <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">Preparing</span>;
                      case "ready": return <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">Ready</span>;
                      case "completed": return <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs">Completed</span>;
                      default: return <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs">{order.status}</span>;
                    }
                  };
                  return (
                    <tr key={order.orderId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-mono">{order.orderId?.slice(-8)}</td>
                      <td className="px-6 py-4 text-sm">Table {order.tableNumber}</td>
                      <td className="px-6 py-4 text-sm">{order.customerName || "Guest"}</td>
                      <td className="px-6 py-4 text-sm">{order.items?.length} items</td>
                      <td className="px-6 py-4">{getStatusBadge()}</td>
                      <td className="px-6 py-4 text-sm">{new Date(order.createdAt).toLocaleTimeString()}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => setSelectedOrder(order)} className="text-purple-600 hover:text-purple-800">
                          <ViewIcon fontSize="small" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStartPreparation={startPreparation}
          onMarkReady={markAsReady}
        />
      )}

      {/* Real-time notification for new orders */}
      {soundEnabled && (
        <audio id="orderNotification" preload="auto" style={{ display: "none" }}>
          <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};

