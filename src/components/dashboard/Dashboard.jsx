/* eslint-disable react-hooks/immutability */
/* eslint-disable no-unused-vars */
// Dashboard.jsx
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dashboard as DashboardIcon,
  RestaurantMenu as MenuIcon,
  ShoppingCart as OrdersIcon,
  People as UsersIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Kitchen as KitchenIcon,
  DeliveryDining as DeliveryIcon,
  DoneAll as DoneAllIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  Save as SaveIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AttachMoney as MoneyIcon,
  TableRestaurant as TableIcon,
  AccessTime as TimeIcon,
  Warning as WarningIcon,
  Restaurant as RestaurantIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from "@mui/icons-material";

// API Configuration
const API_BASE_URL = "http://localhost:5000/api";

// ========== STATISTICS CARDS COMPONENT ==========
const StatCard = ({ title, value, icon, color, trend, trendValue }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl shadow-lg p-5 border-l-4 ${color}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend === "up" ? (
                <ArrowUpIcon className="text-green-500 text-sm" />
              ) : (
                <ArrowDownIcon className="text-red-500 text-sm" />
              )}
              <span className={`text-xs ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color.split('-')[1]}-100`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

// ========== ORDERS TABLE COMPONENT ==========
const OrdersTable = ({ orders, onUpdateStatus, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "preparing": return "bg-purple-100 text-purple-800";
      case "ready": return "bg-green-100 text-green-800";
      case "served": return "bg-teal-100 text-teal-800";
      case "completed": return "bg-gray-100 text-gray-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending": return <TimeIcon className="text-yellow-600 text-sm" />;
      case "confirmed": return <CheckCircleIcon className="text-blue-600 text-sm" />;
      case "preparing": return <KitchenIcon className="text-purple-600 text-sm" />;
      case "ready": return <DeliveryIcon className="text-green-600 text-sm" />;
      case "served": return <DoneAllIcon className="text-teal-600 text-sm" />;
      case "completed": return <CheckCircleIcon className="text-gray-600 text-sm" />;
      case "cancelled": return <CancelIcon className="text-red-600 text-sm" />;
      default: return null;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.tableNumber?.toString().includes(searchTerm);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by Order ID, Customer, or Table..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="served">Served</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Table</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedOrders.map((order) => (
              <tr key={order._id || order.orderId} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-mono text-gray-900">{order.orderId?.slice(-8)}</td>
                <td className="px-6 py-4 text-sm text-gray-600">Table {order.tableNumber}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.customerName || "Guest"}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.items?.length || 0} items</td>
                <td className="px-6 py-4 text-sm font-medium text-orange-600">RWF {order.total?.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleTimeString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewDetails(order)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <ViewIcon fontSize="small" />
                    </button>
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateStatus(order, e.target.value)}
                      className="text-xs border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready</option>
                      <option value="served">Served</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-4 border-t flex justify-between items-center">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

// ========== MENU ITEMS MANAGEMENT ==========
const MenuManagement = ({ menuItems, onAddItem, onEditItem, onDeleteItem }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    ingredients: "",
    description: "",
    prepTime: "",
    category: "Mains",
    image: "",
  });

  const categories = ["Mains", "Vegan", "Seafood", "Desserts", "Beverages"];

  const handleSubmit = () => {
    const newItem = {
      ...formData,
      price: Number(formData.price),
      prepTime: Number(formData.prepTime),
      ingredients: formData.ingredients.split(",").map(i => i.trim()),
    };
    if (editingItem) {
      onEditItem({ ...editingItem, ...newItem });
    } else {
      onAddItem(newItem);
    }
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      name: "", price: "", ingredients: "", description: "", prepTime: "", category: "Mains", image: "",
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price,
      ingredients: item.ingredients?.join(", "),
      description: item.description,
      prepTime: item.prepTime,
      category: item.category,
      image: item.image,
    });
    setShowModal(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Menu Items</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          <AddIcon fontSize="small" /> Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
            <img src={item.image} alt={item.name} className="h-32 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-gray-800">{item.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-orange-600 font-bold">RWF {item.price.toLocaleString()}</span>
                <span className="text-gray-400 text-xs">{item.prepTime} min</span>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => handleEdit(item)} className="flex-1 bg-blue-500 text-white py-1 rounded text-sm">Edit</button>
                <button onClick={() => onDeleteItem(item.id)} className="flex-1 bg-red-500 text-white py-1 rounded text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="bg-orange-500 p-4 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-white font-bold">{editingItem ? "Edit Item" : "Add New Item"}</h2>
              <button onClick={() => setShowModal(false)}><CloseIcon className="text-white" /></button>
            </div>
            <div className="p-6 space-y-4">
              <input type="text" placeholder="Item Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border rounded-lg" />
              <input type="number" placeholder="Price (RWF)" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full p-2 border rounded-lg" />
              <textarea placeholder="Ingredients (comma separated)" value={formData.ingredients} onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })} className="w-full p-2 border rounded-lg" rows="3" />
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border rounded-lg" rows="2" />
              <input type="number" placeholder="Prep Time (minutes)" value={formData.prepTime} onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })} className="w-full p-2 border rounded-lg" />
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-2 border rounded-lg">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <input type="text" placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full p-2 border rounded-lg" />
              <button onClick={handleSubmit} className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold">Save Item</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// ========== CHART COMPONENT ==========
const RevenueChart = ({ data }) => {
  const maxRevenue = Math.max(...data.map(d => d.revenue), 0);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Revenue Overview</h2>
      <div className="h-64 flex items-end gap-2">
        {data.map((day, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-orange-100 rounded-t-lg relative" style={{ height: `${(day.revenue / maxRevenue) * 200}px` }}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-600">RWF {day.revenue.toLocaleString()}</div>
              <div className="w-full bg-orange-500 rounded-t-lg transition-all" style={{ height: `${(day.revenue / maxRevenue) * 100}%` }}></div>
            </div>
            <span className="text-xs text-gray-500">{day.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ========== ORDER DETAILS MODAL ==========
const OrderDetailsModal = ({ order, onClose, onUpdateStatus }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0">
          <h2 className="text-white font-bold text-xl">Order Details</h2>
          <button onClick={onClose}><CloseIcon className="text-white" /></button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div><p className="text-sm text-gray-500">Order ID</p><p className="font-mono font-medium">{order.orderId}</p></div>
            <div><p className="text-sm text-gray-500">Table Number</p><p className="font-medium">Table {order.tableNumber}</p></div>
            <div><p className="text-sm text-gray-500">Customer</p><p className="font-medium">{order.customerName || "Guest"}</p></div>
            <div><p className="text-sm text-gray-500">Order Type</p><p className="font-medium">{order.orderType || "Dine-in"}</p></div>
            <div><p className="text-sm text-gray-500">Created At</p><p className="font-medium">{new Date(order.createdAt).toLocaleString()}</p></div>
            <div><p className="text-sm text-gray-500">Status</p>
              <select value={order.status} onChange={(e) => onUpdateStatus(order, e.target.value)} className="mt-1 text-sm border rounded px-2 py-1">
                <option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="preparing">Preparing</option>
                <option value="ready">Ready</option><option value="served">Served</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <h3 className="font-bold mb-3">Order Items</h3>
          <div className="space-y-3 mb-6">
            {order.items?.map((item, idx) => (
              <div key={idx} className="border-b pb-3">
                <div className="flex justify-between">
                  <div><span className="font-medium">{item.quantity}x {item.name}</span></div>
                  <span className="text-orange-600">RWF {item.finalPrice?.toLocaleString()}</span>
                </div>
                {item.customizations?.length > 0 && (
                  <div className="text-xs text-gray-500 mt-1">Customizations: {item.customizations.join(", ")}</div>
                )}
                {item.specialInstructions && (
                  <div className="text-xs text-orange-600 mt-1">Note: {item.specialInstructions}</div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-bold"><span>Total</span><span className="text-orange-600">RWF {order.total?.toLocaleString()}</span></div>
          </div>

          {order.medicalConditions?.length > 0 && (
            <div className="mt-4 p-3 bg-purple-50 rounded-xl">
              <p className="text-sm font-medium text-purple-700">Medical Conditions Considered</p>
              <div className="flex flex-wrap gap-1 mt-1">{order.medicalConditions.map((c, i) => (<span key={i} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{c}</span>))}</div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// ========== MAIN DASHBOARD COMPONENT ==========
export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeOrders: 0,
    pendingOrders: 0,
    completedToday: 0,
    avgPrepTime: 0,
  });
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Load initial data
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Load orders from localStorage (fallback) or API
      const storedOrders = JSON.parse(localStorage.getItem("order_history") || "[]");
      const fallbackOrders = JSON.parse(localStorage.getItem("fallback_orders") || "[]");
      const allOrders = [...storedOrders, ...fallbackOrders];
      
      setOrders(allOrders);
      
      // Load menu items
      const storedMenu = JSON.parse(localStorage.getItem("menu_items") || JSON.stringify(MENU_ITEMS_DEFAULT));
      setMenuItems(storedMenu);
      
      // Calculate stats
      const totalOrders = allOrders.length;
      const totalRevenue = allOrders.reduce((sum, o) => sum + (o.total || 0), 0);
      const activeOrders = allOrders.filter(o => !["completed", "cancelled"].includes(o.status)).length;
      const pendingOrders = allOrders.filter(o => o.status === "pending").length;
      const completedToday = allOrders.filter(o => {
        const today = new Date().toDateString();
        return o.status === "completed" && new Date(o.createdAt).toDateString() === today;
      }).length;
      
      // Calculate average preparation time
      const completedOrders = allOrders.filter(o => o.status === "completed" && o.createdAt);
      const avgPrepTime = completedOrders.length > 0 
        ? completedOrders.reduce((sum, o) => {
            const created = new Date(o.createdAt);
            const completed = new Date(o.completedAt || o.updatedAt || Date.now());
            return sum + (completed - created) / 60000;
          }, 0) / completedOrders.length
        : 0;
      
      setStats({
        totalOrders,
        totalRevenue,
        activeOrders,
        pendingOrders,
        completedToday,
        avgPrepTime: Math.round(avgPrepTime),
      });
      
      // Generate revenue data for last 7 days
      const last7Days = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayRevenue = allOrders.filter(o => {
          const orderDate = new Date(o.createdAt);
          return orderDate.toDateString() === date.toDateString() && o.status !== "cancelled";
        }).reduce((sum, o) => sum + (o.total || 0), 0);
        last7Days.push({
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          revenue: dayRevenue,
        });
      }
      setRevenueData(last7Days);
      
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = (order, newStatus) => {
    const updatedOrders = orders.map(o => {
      if (o.orderId === order.orderId || o._id === order._id) {
        return { ...o, status: newStatus, updatedAt: new Date().toISOString() };
      }
      return o;
    });
    setOrders(updatedOrders);
    
    // Update localStorage
    const storedOrders = JSON.parse(localStorage.getItem("order_history") || "[]");
    const updatedStored = storedOrders.map(o => {
      if (o.orderId === order.orderId) return { ...o, status: newStatus, updatedAt: new Date().toISOString() };
      return o;
    });
    localStorage.setItem("order_history", JSON.stringify(updatedStored));
    
    toast.success(`Order ${order.orderId?.slice(-8)} status updated to ${newStatus}`);
    loadDashboardData(); // Refresh stats
  };

  const addMenuItem = (newItem) => {
    const updatedMenu = [...menuItems, { ...newItem, id: Date.now() }];
    setMenuItems(updatedMenu);
    localStorage.setItem("menu_items", JSON.stringify(updatedMenu));
    toast.success("Menu item added successfully");
  };

  const editMenuItem = (updatedItem) => {
    const updatedMenu = menuItems.map(item => item.id === updatedItem.id ? updatedItem : item);
    setMenuItems(updatedMenu);
    localStorage.setItem("menu_items", JSON.stringify(updatedMenu));
    toast.success("Menu item updated successfully");
  };

  const deleteMenuItem = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedMenu = menuItems.filter(item => item.id !== itemId);
      setMenuItems(updatedMenu);
      localStorage.setItem("menu_items", JSON.stringify(updatedMenu));
      toast.success("Menu item deleted successfully");
    }
  };

  const exportData = () => {
    const data = {
      orders,
      menuItems,
      stats,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nutriscan_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully");
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <DashboardIcon /> },
    { id: "orders", label: "Orders", icon: <OrdersIcon /> },
    { id: "menu", label: "Menu", icon: <MenuIcon /> },
    { id: "analytics", label: "Analytics", icon: <AnalyticsIcon /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
              <RestaurantIcon className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">NutriScan·AI Admin</h1>
              <p className="text-xs text-gray-500">Restaurant Management Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={loadDashboardData} className="p-2 hover:bg-gray-100 rounded-full transition">
              <RefreshIcon className="text-gray-600" />
            </button>
            <button onClick={exportData} className="p-2 hover:bg-gray-100 rounded-full transition">
              <DownloadIcon className="text-gray-600" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <PersonIcon className="text-white text-sm" />
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="px-6 pt-4 border-b bg-white">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition ${
                activeTab === tab.id
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === "overview" && (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
              <StatCard title="Total Orders" value={stats.totalOrders} icon={<OrdersIcon className="text-blue-600" />} color="border-blue-500" trend="up" trendValue="+12% from last week" />
              <StatCard title="Total Revenue" value={`RWF ${stats.totalRevenue.toLocaleString()}`} icon={<MoneyIcon className="text-green-600" />} color="border-green-500" trend="up" trendValue="+8% from last week" />
              <StatCard title="Active Orders" value={stats.activeOrders} icon={<KitchenIcon className="text-purple-600" />} color="border-purple-500" />
              <StatCard title="Pending Orders" value={stats.pendingOrders} icon={<TimeIcon className="text-yellow-600" />} color="border-yellow-500" trend="down" trendValue="-3 from yesterday" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <StatCard title="Completed Today" value={stats.completedToday} icon={<CheckCircleIcon className="text-teal-600" />} color="border-teal-500" />
              <StatCard title="Avg Prep Time" value={`${stats.avgPrepTime} min`} icon={<TimeIcon className="text-indigo-600" />} color="border-indigo-500" />
            </div>

            {/* Revenue Chart */}
            <RevenueChart data={revenueData} />

            {/* Recent Orders */}
            <div className="mt-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Orders</h2>
              <OrdersTable
                orders={orders.slice(0, 5)}
                onUpdateStatus={updateOrderStatus}
                onViewDetails={setSelectedOrder}
              />
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <OrdersTable
            orders={orders}
            onUpdateStatus={updateOrderStatus}
            onViewDetails={setSelectedOrder}
          />
        )}

        {activeTab === "menu" && (
          <MenuManagement
            menuItems={menuItems}
            onAddItem={addMenuItem}
            onEditItem={editMenuItem}
            onDeleteItem={deleteMenuItem}
          />
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RevenueChart data={revenueData} />
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Order Status Distribution</h2>
                <div className="space-y-3">
                  {["pending", "confirmed", "preparing", "ready", "served", "completed", "cancelled"].map(status => {
                    const count = orders.filter(o => o.status === status).length;
                    const percentage = orders.length ? (count / orders.length * 100).toFixed(1) : 0;
                    return (
                      <div key={status}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{status}</span>
                          <span>{count} orders ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Popular Items</h2>
              <div className="space-y-3">
                {(() => {
                  const itemCounts = {};
                  orders.forEach(order => {
                    order.items?.forEach(item => {
                      itemCounts[item.name] = (itemCounts[item.name] || 0) + (item.quantity || 1);
                    });
                  });
                  const popularItems = Object.entries(itemCounts)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5);
                  return popularItems.map(([name, count], idx) => (
                    <div key={name} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-gray-400">#{idx + 1}</span>
                        <span className="font-medium">{name}</span>
                      </div>
                      <span className="text-orange-600 font-medium">{count} orders</span>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={updateOrderStatus}
        />
      )}
    </div>
  );
};

// Default menu items (fallback)
const MENU_ITEMS_DEFAULT = [
  {
    id: 1,
    name: "Isombe ya Nyama",
    price: 2800,
    ingredients: ["cassava leaves", "beef", "coconut milk", "peanut flour", "palm oil"],
    description: "Traditional cassava leaf stew with beef",
    prepTime: 18,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
  },
  {
    id: 2,
    name: "Brochette de Boeuf",
    price: 3500,
    ingredients: ["beef sirloin", "black pepper", "potato", "garlic", "salt"],
    description: "Grilled beef skewers with fries",
    prepTime: 15,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
  },
  {
    id: 3,
    name: "Ibiharage",
    price: 1800,
    ingredients: ["kidney beans", "palm oil", "tomato", "onion", "salt"],
    description: "Rwandan bean stew - vegan",
    prepTime: 12,
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
  },
  {
    id: 4,
    name: "Matoke ya Nyama",
    price: 3200,
    ingredients: ["green plantain", "goat meat", "ginger", "onion", "coconut oil"],
    description: "Steamed plantain with goat stew",
    prepTime: 20,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
  },
  {
    id: 5,
    name: "Grilled Tilapia",
    price: 4500,
    ingredients: ["tilapia", "lemon", "garlic", "rosemary", "olive oil"],
    description: "Fresh lake tilapia",
    prepTime: 16,
    category: "Seafood",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
  },
];

