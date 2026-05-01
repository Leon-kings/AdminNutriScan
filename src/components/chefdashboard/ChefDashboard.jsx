// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */

// // ChefDashboard.jsx
// import React, { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   Kitchen as KitchenIcon,
//   RestaurantMenu as MenuIcon,
//   ShoppingCart as OrdersIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   Timer as TimerIcon,
//   AccessTime as TimeIcon,
//   Warning as WarningIcon,
//   LocalFireDepartment as FireIcon,
//   EmojiEvents as TrophyIcon,
//   Speed as SpeedIcon,
//   DoneAll as DoneAllIcon,
//   Visibility as ViewIcon,
//   Search as SearchIcon,
//   Refresh as RefreshIcon,
//   VolumeUp as AlertIcon,
//   Restaurant as RestaurantIcon,
//   Person as PersonIcon,
//   TableRestaurant as TableIcon,
//   HealthAndSafety as HealthIcon,
//   Close as CloseIcon,
//   PlayArrow as StartIcon,
//   Fastfood as FoodIcon,
// } from "@mui/icons-material";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../App";
// import { DashboardLayout } from "../sidebar/Sidebar";

// // ========== HELPER FUNCTIONS ==========
// const API_BASE_URL = "https://nutriscan-foodanddrinksupply.onrender.com";

// // Fetch orders from API
// const fetchOrdersFromAPI = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/orders?page=1&limit=100`);
//     if (!response.ok) {
//       throw new Error(`API error: ${response.status}`);
//     }
//     const result = await response.json();

//     if (result.success && Array.isArray(result.data)) {
//       // Transform API data to match component structure
//       return result.data.map((order) => transformAPIToLocal(order));
//     }
//     return [];
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     throw error;
//   }
// };

// // Transform API order structure to local component structure
// const transformAPIToLocal = (apiOrder) => {
//   // Extract medical conditions from health analysis if present
//   const medicalConditions = [];
//   const healthRisks = [];

//   // Check each item for health risks
//   if (apiOrder.items && Array.isArray(apiOrder.items)) {
//     apiOrder.items.forEach((item) => {
//       if (item.healthAnalysis && item.healthAnalysis.highRiskIngredients) {
//         item.healthAnalysis.highRiskIngredients.forEach((risk) => {
//           if (!healthRisks.includes(risk)) {
//             healthRisks.push(risk);
//           }
//         });
//       }
//       if (item.healthAnalysis && item.healthAnalysis.medicalConditions) {
//         item.healthAnalysis.medicalConditions.forEach((condition) => {
//           if (!medicalConditions.includes(condition)) {
//             medicalConditions.push(condition);
//           }
//         });
//       }
//     });
//   }

//   // Determine status based on bookingDetails.currentStatus or root status
//   let status = apiOrder.status || "pending";
//   if (apiOrder.bookingDetails?.currentStatus) {
//     status = apiOrder.bookingDetails.currentStatus;
//   }

//   // Get startedAt from statusHistory
//   let startedAt = null;
//   let completedAt = null;
//   if (apiOrder.bookingDetails?.statusHistory) {
//     const preparingEntry = apiOrder.bookingDetails.statusHistory.find(
//       (h) => h.status === "preparing",
//     );
//     if (preparingEntry) startedAt = preparingEntry.timestamp;

//     const completedEntry = apiOrder.bookingDetails.statusHistory.find(
//       (h) => h.status === "completed" || h.status === "ready",
//     );
//     if (completedEntry) completedAt = completedEntry.timestamp;
//   }

//   // Calculate estimated total time based on items
//   const totalPrepTime =
//     apiOrder.items?.reduce(
//       (sum, item) => sum + (item.preparationTime || 15),
//       0,
//     ) || 20;

//   return {
//     orderId: apiOrder.orderId,
//     _id: apiOrder._id,
//     tableNumber: apiOrder.personDetails?.tableNumber || "Unknown",
//     customerName: apiOrder.personDetails?.name || "Guest",
//     status: status,
//     items: apiOrder.items || [],
//     createdAt: apiOrder.createdAt,
//     updatedAt: apiOrder.updatedAt,
//     startedAt: startedAt,
//     completedAt: completedAt,
//     estimatedTime: totalPrepTime,
//     notes: apiOrder.notes || apiOrder.bookingDetails?.specialInstructions || "",
//     medicalConditions: medicalConditions,
//     healthRisks: healthRisks,
//     orderType: apiOrder.personDetails?.orderType || "dine-in",
//     estimatedPickupTime: apiOrder.bookingDetails?.estimatedPickupTime,
//     statusHistory: apiOrder.bookingDetails?.statusHistory || [],
//   };
// };

// // ========== KITCHEN ORDER CARD COMPONENT ==========
// const KitchenOrderCard = ({
//   order,
//   onStartPreparation,
//   onMarkReady,
//   onViewDetails,
// }) => {
//   const [timeElapsed, setTimeElapsed] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     if (order.status === "preparing" && order.startedAt) {
//       const interval = setInterval(() => {
//         const elapsed = Math.floor(
//           (Date.now() - new Date(order.startedAt)) / 60000,
//         );
//         setTimeElapsed(elapsed);
//       }, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [order.status, order.startedAt]);

//   const getPriorityColor = () => {
//     const elapsed = timeElapsed;
//     if (elapsed > (order.estimatedTime || 20))
//       return "border-red-500 bg-red-50";
//     if (elapsed > (order.estimatedTime || 20) * 0.7)
//       return "border-yellow-500 bg-yellow-50";
//     return "border-green-500 bg-green-50";
//   };

//   const getStatusBadge = () => {
//     switch (order.status) {
//       case "pending":
//         return (
//           <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <TimeIcon className="text-yellow-600 text-sm" /> Waiting
//           </span>
//         );
//       case "confirmed":
//         return (
//           <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <CheckCircleIcon className="text-blue-600 text-sm" /> Confirmed
//           </span>
//         );
//       case "preparing":
//         return (
//           <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <FireIcon className="text-purple-600 text-sm" /> Cooking
//           </span>
//         );
//       case "ready":
//         return (
//           <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <DoneAllIcon className="text-green-600 text-sm" /> Ready
//           </span>
//         );
//       default:
//         return (
//           <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
//             {order.status}
//           </span>
//         );
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, x: -100 }}
//       whileHover={{ scale: 1.02 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${getPriorityColor()} transition-all duration-300 ${isHovered ? "shadow-xl" : ""}`}
//     >
//       <div className="p-4 border-b bg-gray-50">
//         <div className="flex justify-between items-start flex-wrap gap-2">
//           <div>
//             <div className="flex items-center gap-2 flex-wrap">
//               <span className="font-mono text-sm font-bold text-gray-700">
//                 #{order.orderId?.slice(-8)}
//               </span>
//               {getStatusBadge()}
//             </div>
//             <div className="flex items-center gap-3 mt-2 text-sm text-gray-600 flex-wrap">
//               <span className="flex items-center gap-1">
//                 <TableIcon fontSize="small" /> Table {order.tableNumber}
//               </span>
//               <span className="flex items-center gap-1">
//                 <PersonIcon fontSize="small" /> {order.customerName || "Guest"}
//               </span>
//               <span className="flex items-center gap-1 text-xs text-gray-400">
//                 {order.orderType}
//               </span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="flex items-center gap-1 text-orange-600 font-bold">
//               <TimerIcon fontSize="small" />
//               <span>{order.estimatedTime || 20} min est.</span>
//             </div>
//             {order.status === "preparing" && (
//               <div className="text-xs text-gray-500 mt-1">
//                 Elapsed: {timeElapsed} min
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="p-4">
//         <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-1">
//           <FoodIcon fontSize="small" /> Order Items ({order.items?.length || 0})
//         </h4>
//         <div className="space-y-2 max-h-40 overflow-y-auto">
//           {order.items?.map((item, idx) => (
//             <div
//               key={idx}
//               className="text-sm border-b border-gray-100 pb-2 last:border-0"
//             >
//               <div className="flex justify-between flex-wrap gap-2">
//                 <span className="font-medium">
//                   {item.quantity}x {item.name}
//                 </span>
//                 <span className="text-gray-500">
//                   {item.preparationTime || 15} min
//                 </span>
//               </div>
//               {item.customizations?.length > 0 && (
//                 <div className="text-xs text-orange-600 mt-0.5">
//                   ✨ Custom: {item.customizations.join(", ")}
//                 </div>
//               )}
//               {item.specialInstructions && (
//                 <div className="text-xs text-blue-600 mt-0.5">
//                   📝 {item.specialInstructions}
//                 </div>
//               )}
//               {item.healthAnalysis?.highRiskCount > 0 && (
//                 <div className="text-xs text-red-500 mt-0.5 flex items-center gap-1">
//                   <HealthIcon fontSize="inherit" /> Allergy:{" "}
//                   {item.healthAnalysis.highRiskIngredients?.join(", ")}
//                 </div>
//               )}
//               {/* Display dietary flags if present */}
//               {item.healthAnalysis?.dietaryFlags &&
//                 Object.keys(item.healthAnalysis.dietaryFlags).some(
//                   (k) => item.healthAnalysis.dietaryFlags[k],
//                 ) && (
//                   <div className="text-xs text-green-600 mt-0.5">
//                     🥗{" "}
//                     {Object.entries(item.healthAnalysis.dietaryFlags)
//                       .filter(([, v]) => v)
//                       .map(([k]) => k)
//                       .join(", ")}
//                   </div>
//                 )}
//             </div>
//           ))}
//         </div>

//         {/* Global order notes */}
//         {order.notes && (
//           <div className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
//             <div className="text-xs text-gray-600">
//               <span className="font-medium">Notes:</span> {order.notes}
//             </div>
//           </div>
//         )}

//         {/* Medical Conditions / Health Alerts */}
//         {order.medicalConditions?.length > 0 && (
//           <div className="mt-3 p-2 bg-red-50 rounded-lg border border-red-200">
//             <div className="flex items-center gap-1 text-xs text-red-700">
//               <HealthIcon fontSize="small" />
//               <span className="font-medium">Medical Conditions:</span>
//               <span className="truncate">
//                 {order.medicalConditions.join(", ")}
//               </span>
//             </div>
//           </div>
//         )}

//         {/* Health Risks */}
//         {order.healthRisks?.length > 0 && (
//           <div className="mt-2 p-2 bg-orange-50 rounded-lg border border-orange-200">
//             <div className="flex items-center gap-1 text-xs text-orange-700">
//               <WarningIcon fontSize="small" />
//               <span className="font-medium">Allergy Risks:</span>
//               <span className="truncate">{order.healthRisks.join(", ")}</span>
//             </div>
//           </div>
//         )}

//         {/* Estimated Pickup Time */}
//         {order.estimatedPickupTime && (
//           <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
//             <TimeIcon fontSize="inherit" />
//             Est. Pickup:{" "}
//             {new Date(order.estimatedPickupTime).toLocaleTimeString()}
//           </div>
//         )}
//       </div>

//       <div className="p-4 border-t bg-gray-50 flex gap-2 flex-col sm:flex-row">
//         {order.status === "pending" || order.status === "confirmed" ? (
//           <button
//             onClick={() => onStartPreparation(order)}
//             className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition flex items-center justify-center gap-2"
//           >
//             <StartIcon fontSize="small" /> Start Cooking
//           </button>
//         ) : order.status === "preparing" ? (
//           <button
//             onClick={() => onMarkReady(order)}
//             className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition flex items-center justify-center gap-2"
//           >
//             <DoneAllIcon fontSize="small" /> Mark as Ready
//           </button>
//         ) : order.status === "ready" ? (
//           <div className="flex-1 bg-gray-200 text-gray-600 py-2 rounded-lg text-center flex items-center justify-center gap-2">
//             <CheckCircleIcon fontSize="small" /> Ready for Service
//           </div>
//         ) : null}

//         <button
//           onClick={() => onViewDetails(order)}
//           className="px-4 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition flex items-center justify-center gap-1"
//         >
//           <ViewIcon fontSize="small" /> Details
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// // ========== ORDER DETAILS MODAL ==========
// const OrderDetailsModal = ({
//   order,
//   onClose,
//   onStartPreparation,
//   onMarkReady,
// }) => {
//   if (!order) return null;

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "confirmed":
//         return "bg-blue-100 text-blue-800";
//       case "preparing":
//         return "bg-purple-100 text-purple-800";
//       case "ready":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//       >
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0">
//           <div>
//             <h2 className="text-white font-bold text-xl">Order Details</h2>
//             <p className="text-purple-200 text-sm">Kitchen View</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-white/20 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>

//         <div className="p-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
//             <div>
//               <p className="text-xs text-gray-500">Order ID</p>
//               <p className="font-mono font-medium text-sm">{order.orderId}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Table Number</p>
//               <p className="font-medium">Table {order.tableNumber}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Customer</p>
//               <p className="font-medium">{order.customerName || "Guest"}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Status</p>
//               <span
//                 className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
//               >
//                 {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
//               </span>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Order Type</p>
//               <p className="font-medium">{order.orderType || "dine-in"}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Created At</p>
//               <p className="font-medium text-sm">
//                 {new Date(order.createdAt).toLocaleString()}
//               </p>
//             </div>
//           </div>

//           <h3 className="font-bold text-gray-800 mb-3">Items to Prepare</h3>
//           <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
//             {order.items?.map((item, idx) => (
//               <div key={idx} className="border rounded-lg p-4">
//                 <div className="flex justify-between items-start flex-wrap gap-2">
//                   <div>
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <span className="font-bold text-gray-800">
//                         {item.quantity}x
//                       </span>
//                       <span className="font-medium text-gray-800">
//                         {item.name}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-500 mt-1">
//                       {item.description || "No description"}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <span className="text-xs text-gray-400">Prep time</span>
//                     <p className="text-sm font-medium">
//                       {item.preparationTime || 15} min
//                     </p>
//                   </div>
//                 </div>

//                 {item.customizations?.length > 0 && (
//                   <div className="mt-2 p-2 bg-orange-50 rounded-lg">
//                     <p className="text-xs font-medium text-orange-700">
//                       Customizations:
//                     </p>
//                     <ul className="text-xs text-orange-600 list-disc list-inside">
//                       {item.customizations.map((c, i) => (
//                         <li key={i}>{c}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {item.specialInstructions && (
//                   <div className="mt-2 p-2 bg-blue-50 rounded-lg">
//                     <p className="text-xs font-medium text-blue-700">
//                       Special Instructions:
//                     </p>
//                     <p className="text-xs text-blue-600">
//                       {item.specialInstructions}
//                     </p>
//                   </div>
//                 )}

//                 {/* Detailed Health Analysis */}
//                 {item.healthAnalysis && (
//                   <div className="mt-2 space-y-2">
//                     {item.healthAnalysis.highRiskCount > 0 && (
//                       <div className="p-2 bg-red-50 rounded-lg flex items-start gap-2">
//                         <WarningIcon className="text-red-500 text-sm" />
//                         <div>
//                           <p className="text-xs font-medium text-red-700">
//                             ⚠️ Allergy/Health Alert!
//                           </p>
//                           <p className="text-xs text-red-600">
//                             Contains {item.healthAnalysis.highRiskCount}{" "}
//                             high-risk ingredient(s)
//                           </p>
//                           {item.healthAnalysis.highRiskIngredients && (
//                             <p className="text-xs text-red-500 mt-1">
//                               High risk:{" "}
//                               {item.healthAnalysis.highRiskIngredients.join(
//                                 ", ",
//                               )}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {item.healthAnalysis.medicalConditions &&
//                       item.healthAnalysis.medicalConditions.length > 0 && (
//                         <div className="p-2 bg-yellow-50 rounded-lg">
//                           <p className="text-xs font-medium text-yellow-700">
//                             Medical Conditions:
//                           </p>
//                           <p className="text-xs text-yellow-600">
//                             {item.healthAnalysis.medicalConditions.join(", ")}
//                           </p>
//                         </div>
//                       )}

//                     {item.healthAnalysis.dietaryFlags &&
//                       Object.keys(item.healthAnalysis.dietaryFlags).some(
//                         (k) => item.healthAnalysis.dietaryFlags[k],
//                       ) && (
//                         <div className="p-2 bg-green-50 rounded-lg">
//                           <p className="text-xs font-medium text-green-700">
//                             Dietary Info:
//                           </p>
//                           <p className="text-xs text-green-600">
//                             {Object.entries(item.healthAnalysis.dietaryFlags)
//                               .filter(([, v]) => v)
//                               .map(([k]) => k)
//                               .join(", ")}
//                           </p>
//                         </div>
//                       )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Global order notes */}
//           {order.notes && (
//             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//               <p className="text-sm font-medium text-gray-700">
//                 📝 Order Notes
//               </p>
//               <p className="text-sm text-gray-600">{order.notes}</p>
//             </div>
//           )}

//           {/* Global health conditions */}
//           {order.medicalConditions?.length > 0 && (
//             <div className="mb-4 p-3 bg-red-50 rounded-lg">
//               <p className="text-sm font-medium text-red-700">
//                 🏥 Medical Conditions
//               </p>
//               <p className="text-sm text-red-600">
//                 {order.medicalConditions.join(", ")}
//               </p>
//             </div>
//           )}

//           {/* Status History */}
//           {order.statusHistory && order.statusHistory.length > 0 && (
//             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//               <p className="text-sm font-medium text-gray-700 mb-2">
//                 📋 Status History
//               </p>
//               <div className="space-y-1">
//                 {order.statusHistory.map((entry, idx) => (
//                   <div
//                     key={idx}
//                     className="text-xs text-gray-500 flex justify-between"
//                   >
//                     <span className="capitalize">{entry.status}</span>
//                     <span>{new Date(entry.timestamp).toLocaleString()}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="flex gap-3 pt-4 border-t flex-col sm:flex-row">
//             <button
//               onClick={onClose}
//               className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
//             >
//               Close
//             </button>
//             {(order.status === "pending" || order.status === "confirmed") && (
//               <button
//                 onClick={() => {
//                   onStartPreparation(order);
//                   onClose();
//                 }}
//                 className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition"
//               >
//                 Start Cooking
//               </button>
//             )}
//             {order.status === "preparing" && (
//               <button
//                 onClick={() => {
//                   onMarkReady(order);
//                   onClose();
//                 }}
//                 className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition"
//               >
//                 Mark as Ready
//               </button>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== STATISTICS CARD ==========
// const StatCard = ({ title, value, icon, color, subtitle }) => {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       className={`bg-white rounded-xl shadow-lg p-4 sm:p-5 border-l-4 ${color}`}
//     >
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-gray-500 text-xs sm:text-sm font-medium">
//             {title}
//           </p>
//           <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
//             {value}
//           </p>
//           {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
//         </div>
//         <div
//           className={`p-2 sm:p-3 rounded-full bg-${color.split("-")[1]}-100 bg-opacity-20`}
//         >
//           {icon}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ========== MAIN CHEF DASHBOARD ==========
// export const ChefDashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const [activeTab, setActiveTab] = useState("active");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [stats, setStats] = useState({
//     pendingOrders: 0,
//     preparingOrders: 0,
//     readyOrders: 0,
//     completedToday: 0,
//     avgPreparationTime: 0,
//   });
//   const [soundEnabled, setSoundEnabled] = useState(true);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user } = useAuth();

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   // Update order status via API
//   const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to update status: ${response.status}`);
//       }

//       const result = await response.json();
//       return result;
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       throw error;
//     }
//   };

//   // Load orders from API
//   const loadOrders = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const apiOrders = await fetchOrdersFromAPI();
//       setOrders(apiOrders);

//       // Calculate statistics
//       const pending = apiOrders.filter(
//         (o) => o.status === "pending" || o.status === "confirmed",
//       ).length;
//       const preparing = apiOrders.filter(
//         (o) => o.status === "preparing",
//       ).length;
//       const ready = apiOrders.filter((o) => o.status === "ready").length;
//       const completedToday = apiOrders.filter((o) => {
//         const today = new Date().toDateString();
//         return (
//           (o.status === "completed" || o.status === "ready") &&
//           new Date(o.createdAt).toDateString() === today
//         );
//       }).length;

//       const completedOrders = apiOrders.filter(
//         (o) => o.status === "completed" && o.startedAt && o.completedAt,
//       );
//       const avgTime =
//         completedOrders.length > 0
//           ? completedOrders.reduce((sum, o) => {
//               const start = new Date(o.startedAt);
//               const end = new Date(o.completedAt);
//               return sum + (end - start) / 60000;
//             }, 0) / completedOrders.length
//           : 0;

//       setStats({
//         pendingOrders: pending,
//         preparingOrders: preparing,
//         readyOrders: ready,
//         completedToday,
//         avgPreparationTime: Math.round(avgTime),
//       });

//       // Check for new orders (within last 30 seconds)
//       const newOrders = apiOrders.filter(
//         (o) =>
//           (o.status === "pending" || o.status === "confirmed") &&
//           new Date(o.createdAt) > new Date(Date.now() - 30000),
//       );

//       if (soundEnabled && newOrders.length > 0) {
//         playNotificationSound();
//         toast.info(
//           `${newOrders.length} new order${newOrders.length > 1 ? "s" : ""} received!`,
//         );
//       }
//     } catch (error) {
//       console.error("Error loading orders:", error);
//       setError("Failed to load orders. Please check your connection.");
//       toast.error("Failed to load orders from server");
//     } finally {
//       setLoading(false);
//     }
//   }, [soundEnabled]);

//   const playNotificationSound = () => {
//     try {
//       const audio = new Audio(
//         "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3",
//       );
//       audio.volume = 0.3;
//       audio.play().catch((e) => console.log("Audio play failed:", e));
//     } catch (error) {
//       console.log("Sound not supported");
//     }
//   };

//   useEffect(() => {
//     loadOrders();
//     const interval = setInterval(loadOrders, 30000); // Refresh every 30 seconds
//     return () => clearInterval(interval);
//   }, [loadOrders]);

//   const startPreparation = async (order) => {
//     try {
//       await updateOrderStatus(order._id || order.orderId, "preparing");

//       // Update local state
//       const updatedOrders = orders.map((o) => {
//         if (o.orderId === order.orderId || o._id === order._id) {
//           return {
//             ...o,
//             status: "preparing",
//             startedAt: new Date().toISOString(),
//           };
//         }
//         return o;
//       });
//       setOrders(updatedOrders);
//       toast.success(`Started preparing Order #${order.orderId?.slice(-8)}`);
//       loadOrders(); // Refresh from server
//     } catch (error) {
//       toast.error("Failed to update order status");
//     }
//   };

//   const markAsReady = async (order) => {
//     try {
//       await updateOrderStatus(order._id || order.orderId, "ready");

//       // Update local state
//       const updatedOrders = orders.map((o) => {
//         if (o.orderId === order.orderId || o._id === order._id) {
//           return {
//             ...o,
//             status: "ready",
//             completedAt: new Date().toISOString(),
//           };
//         }
//         return o;
//       });
//       setOrders(updatedOrders);
//       toast.success(`Order #${order.orderId?.slice(-8)} is ready for serving!`);
//       loadOrders(); // Refresh from server
//     } catch (error) {
//       toast.error("Failed to update order status");
//     }
//   };

//   const getFilteredOrders = () => {
//     let filtered = orders;

//     if (activeTab === "active") {
//       filtered = orders.filter((o) =>
//         ["pending", "confirmed", "preparing"].includes(o.status),
//       );
//     } else if (activeTab === "ready") {
//       filtered = orders.filter((o) => o.status === "ready");
//     } else if (activeTab === "completed") {
//       filtered = orders.filter((o) => o.status === "completed");
//     } else if (activeTab === "all") {
//       filtered = orders;
//     }

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (o) =>
//           o.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           o.tableNumber?.toString().includes(searchTerm) ||
//           o.customerName?.toLowerCase().includes(searchTerm.toLowerCase()),
//       );
//     }

//     return filtered.sort((a, b) => {
//       if (a.status === "preparing" && b.status !== "preparing") return -1;
//       if (a.status !== "preparing" && b.status === "preparing") return 1;
//       return new Date(a.createdAt) - new Date(b.createdAt);
//     });
//   };

//   const filteredOrders = getFilteredOrders();
//   const pendingOrders = filteredOrders.filter(
//     (o) => o.status === "pending" || o.status === "confirmed",
//   );
//   const preparingOrders = filteredOrders.filter(
//     (o) => o.status === "preparing",
//   );
//   const readyOrders = filteredOrders.filter((o) => o.status === "ready");

//   const tabs = [
//     {
//       id: "active",
//       label: "Active Orders",
//       icon: <FireIcon />,
//       count: stats.pendingOrders + stats.preparingOrders,
//     },
//     {
//       id: "ready",
//       label: "Ready to Serve",
//       icon: <DoneAllIcon />,
//       count: stats.readyOrders,
//     },
//     { id: "completed", label: "Completed", icon: <CheckCircleIcon /> },
//     { id: "all", label: "All Orders", icon: <OrdersIcon /> },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading kitchen orders...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <DashboardLayout
//         user={user}
//         currentPath={location.pathname}
//         onNavigate={handleNavigation}
//       >
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//           <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md">
//             <WarningIcon className="text-red-500 text-5xl mx-auto mb-4" />
//             <h2 className="text-xl font-bold text-gray-800 mb-2">
//               Connection Error
//             </h2>
//             <p className="text-gray-600 mb-4">{error}</p>
//             <button
//               onClick={loadOrders}
//               className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
//             >
//               <RefreshIcon className="inline mr-2" /> Retry
//             </button>
//           </div>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout
//       user={user}
//       currentPath={location.pathname}
//       onNavigate={handleNavigation}
//     >
//       <div className="min-h-screen bg-gray-100">
//         <ToastContainer position="top-right" />

//         {/* Header */}
//         <header className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg sticky top-0 z-10">
//           <div className="px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-4">
//             <div className="flex items-center gap-3">
//               <div className="bg-white/20 p-2 rounded-lg">
//                 <KitchenIcon className="text-white" />
//               </div>
//               <div>
//                 <h1 className="text-lg sm:text-xl font-bold">
//                   Kitchen Dashboard
//                 </h1>
//                 <p className="text-purple-200 text-xs sm:text-sm">
//                   Real-time order management
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 sm:gap-3">
//               <button
//                 onClick={() => setSoundEnabled(!soundEnabled)}
//                 className={`p-2 rounded-full transition ${soundEnabled ? "bg-white/20" : "bg-white/10"}`}
//               >
//                 <AlertIcon className="text-white" />
//               </button>
//               <button
//                 onClick={loadOrders}
//                 className="p-2 rounded-full hover:bg-white/20 transition"
//               >
//                 <RefreshIcon className="text-white" />
//               </button>
//               <div className="bg-white/20 px-2 sm:px-3 py-2 rounded-lg">
//                 <span className="text-xs sm:text-sm font-medium">
//                   Avg Prep: {stats.avgPreparationTime} min
//                 </span>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Stats Bar */}
//         <div className="p-4 sm:p-6">
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
//             <StatCard
//               title="Pending"
//               value={stats.pendingOrders}
//               icon={<TimeIcon className="text-yellow-600" />}
//               color="border-yellow-500"
//               subtitle="Waiting"
//             />
//             <StatCard
//               title="In Progress"
//               value={stats.preparingOrders}
//               icon={<FireIcon className="text-purple-600" />}
//               color="border-purple-500"
//               subtitle="Cooking"
//             />
//             <StatCard
//               title="Ready"
//               value={stats.readyOrders}
//               icon={<DoneAllIcon className="text-green-600" />}
//               color="border-green-500"
//               subtitle="Awaiting pickup"
//             />
//             <StatCard
//               title="Completed Today"
//               value={stats.completedToday}
//               icon={<TrophyIcon className="text-teal-600" />}
//               color="border-teal-500"
//             />
//             <StatCard
//               title="Avg Prep Time"
//               value={`${stats.avgPreparationTime} min`}
//               icon={<SpeedIcon className="text-indigo-600" />}
//               color="border-indigo-500"
//             />
//           </div>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="px-4 sm:px-6">
//           <div className="flex gap-2 overflow-x-auto pb-2">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
//                   activeTab === tab.id
//                     ? "bg-purple-600 text-white shadow-md"
//                     : "bg-white text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 {tab.icon}
//                 <span className="text-sm">{tab.label}</span>
//                 {tab.count !== undefined && tab.count > 0 && (
//                   <span
//                     className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
//                       activeTab === tab.id
//                         ? "bg-white/20"
//                         : "bg-purple-100 text-purple-600"
//                     }`}
//                   >
//                     {tab.count}
//                   </span>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="px-4 sm:px-6 pt-4">
//           <div className="relative max-w-md">
//             <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
//             <input
//               type="text"
//               placeholder="Search by Order ID, Table, or Customer..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
//             />
//           </div>
//         </div>

//         {/* Orders Grid */}
//         <div className="p-4 sm:p-6">
//           {activeTab === "active" && (
//             <>
//               {preparingOrders.length > 0 && (
//                 <div className="mb-6">
//                   <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
//                     <FireIcon className="text-purple-600" /> In Progress (
//                     {preparingOrders.length})
//                   </h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//                     <AnimatePresence>
//                       {preparingOrders.map((order) => (
//                         <KitchenOrderCard
//                           key={order.orderId}
//                           order={order}
//                           onStartPreparation={startPreparation}
//                           onMarkReady={markAsReady}
//                           onViewDetails={setSelectedOrder}
//                         />
//                       ))}
//                     </AnimatePresence>
//                   </div>
//                 </div>
//               )}

//               {pendingOrders.length > 0 && (
//                 <div>
//                   <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
//                     <TimeIcon className="text-yellow-600" /> Pending (
//                     {pendingOrders.length})
//                   </h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//                     <AnimatePresence>
//                       {pendingOrders.map((order) => (
//                         <KitchenOrderCard
//                           key={order.orderId}
//                           order={order}
//                           onStartPreparation={startPreparation}
//                           onMarkReady={markAsReady}
//                           onViewDetails={setSelectedOrder}
//                         />
//                       ))}
//                     </AnimatePresence>
//                   </div>
//                 </div>
//               )}

//               {preparingOrders.length === 0 && pendingOrders.length === 0 && (
//                 <div className="text-center py-12 bg-white rounded-xl">
//                   <KitchenIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//                   <p className="text-gray-500">
//                     No active orders. Kitchen is idle.
//                   </p>
//                 </div>
//               )}
//             </>
//           )}

//           {activeTab === "ready" && (
//             <>
//               {readyOrders.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//                   {readyOrders.map((order) => (
//                     <KitchenOrderCard
//                       key={order.orderId}
//                       order={order}
//                       onStartPreparation={startPreparation}
//                       onMarkReady={markAsReady}
//                       onViewDetails={setSelectedOrder}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12 bg-white rounded-xl">
//                   <DoneAllIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//                   <p className="text-gray-500">No orders ready for serving.</p>
//                 </div>
//               )}
//             </>
//           )}

//           {(activeTab === "completed" || activeTab === "all") && (
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Order ID
//                       </th>
//                       <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Table
//                       </th>
//                       <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Customer
//                       </th>
//                       <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Items
//                       </th>
//                       {activeTab === "completed" && (
//                         <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                           Prep Time
//                         </th>
//                       )}
//                       <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Status
//                       </th>
//                       <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {filteredOrders
//                       .filter((o) =>
//                         activeTab === "completed"
//                           ? o.status === "completed"
//                           : true,
//                       )
//                       .map((order) => {
//                         const prepTime =
//                           order.startedAt && order.completedAt
//                             ? Math.round(
//                                 (new Date(order.completedAt) -
//                                   new Date(order.startedAt)) /
//                                   60000,
//                               )
//                             : "N/A";
//                         const getStatusBadge = () => {
//                           switch (order.status) {
//                             case "pending":
//                               return (
//                                 <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">
//                                   Pending
//                                 </span>
//                               );
//                             case "confirmed":
//                               return (
//                                 <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
//                                   Confirmed
//                                 </span>
//                               );
//                             case "preparing":
//                               return (
//                                 <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">
//                                   Preparing
//                                 </span>
//                               );
//                             case "ready":
//                               return (
//                                 <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
//                                   Ready
//                                 </span>
//                               );
//                             case "completed":
//                               return (
//                                 <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs">
//                                   Completed
//                                 </span>
//                               );
//                             default:
//                               return (
//                                 <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs">
//                                   {order.status}
//                                 </span>
//                               );
//                           }
//                         };
//                         return (
//                           <tr key={order.orderId} className="hover:bg-gray-50">
//                             <td className="px-4 sm:px-6 py-4 text-sm font-mono">
//                               {order.orderId?.slice(-8)}
//                             </td>
//                             <td className="px-4 sm:px-6 py-4 text-sm">
//                               Table {order.tableNumber}
//                             </td>
//                             <td className="px-4 sm:px-6 py-4 text-sm">
//                               {order.customerName}
//                             </td>
//                             <td className="px-4 sm:px-6 py-4 text-sm">
//                               {order.items?.length} items
//                             </td>
//                             {activeTab === "completed" && (
//                               <td className="px-4 sm:px-6 py-4 text-sm">
//                                 {prepTime} min
//                               </td>
//                             )}
//                             <td className="px-4 sm:px-6 py-4">
//                               {getStatusBadge()}
//                             </td>
//                             <td className="px-4 sm:px-6 py-4">
//                               <button
//                                 onClick={() => setSelectedOrder(order)}
//                                 className="text-purple-600 hover:text-purple-800"
//                               >
//                                 <ViewIcon fontSize="small" />
//                               </button>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Order Details Modal */}
//         {selectedOrder && (
//           <OrderDetailsModal
//             order={selectedOrder}
//             onClose={() => setSelectedOrder(null)}
//             onStartPreparation={startPreparation}
//             onMarkReady={markAsReady}
//           />
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */

// ChefDashboard.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  Kitchen as KitchenIcon,
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
  Refresh as RefreshIcon,
  VolumeUp as AlertIcon,
  Person as PersonIcon,
  TableRestaurant as TableIcon,
  HealthAndSafety as HealthIcon,
  Close as CloseIcon,
  PlayArrow as StartIcon,
  Fastfood as FoodIcon,
  NoteAlt as NoteIcon,
  Settings as SettingsIcon,
  WifiOff as WifiOffIcon,
  Wifi as WifiIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../App";

// ========== API CONFIGURATION ==========
const API_BASE_URL = "https://nutriscan-foodanddrinksupply.onrender.com";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout - server took too long to respond");
    } else if (error.response) {
      console.error(`API Error ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.error("No response received from server");
    } else {
      console.error("Request error:", error.message);
    }
    return Promise.reject(error);
  },
);

// ========== HELPER FUNCTIONS ==========

// Transform API order to local component structure
const transformOrder = (apiOrder) => {
  // Determine status from multiple possible sources
  let status = apiOrder.status || "pending";
  if (apiOrder.bookingDetails?.currentStatus) {
    status = apiOrder.bookingDetails.currentStatus;
  }

  // Get timestamps from status history
  let startedAt = null;
  let completedAt = null;
  if (apiOrder.bookingDetails?.statusHistory) {
    const preparingEntry = apiOrder.bookingDetails.statusHistory.find(
      (h) => h.status === "preparing",
    );
    if (preparingEntry) startedAt = preparingEntry.timestamp;

    const completedEntry = apiOrder.bookingDetails.statusHistory.find(
      (h) => h.status === "ready" || h.status === "completed",
    );
    if (completedEntry) completedAt = completedEntry.timestamp;
  }

  // Calculate total preparation time
  const totalPrepTime =
    apiOrder.items?.reduce(
      (sum, item) => sum + (item.preparationTime || 15),
      0,
    ) || 20;

  // Calculate total order amount
  const totalAmount =
    apiOrder.items?.reduce(
      (sum, item) => sum + (item.finalPrice || item.originalPrice || 0),
      0,
    ) || 0;

  // Collect all customizations
  const allCustomizations = [];
  const allSpecialInstructions = [];
  apiOrder.items?.forEach((item) => {
    if (item.customizations?.length) {
      allCustomizations.push(...item.customizations);
    }
    if (item.specialInstructions) {
      allSpecialInstructions.push({
        itemName: item.name,
        instruction: item.specialInstructions,
      });
    }
  });

  return {
    _id: apiOrder._id,
    orderId: apiOrder.orderId,
    requestId: apiOrder.requestId,
    tableNumber: apiOrder.personDetails?.tableNumber || "Unknown",
    customerName: apiOrder.personDetails?.name || "Guest",
    orderType: apiOrder.personDetails?.orderType || "dine-in",
    status: status,
    items: apiOrder.items || [],
    notes: apiOrder.notes || "",
    specialInstructions: apiOrder.bookingDetails?.specialInstructions || "",
    estimatedPickupTime: apiOrder.bookingDetails?.estimatedPickupTime,
    createdAt: apiOrder.createdAt,
    updatedAt: apiOrder.updatedAt,
    startedAt: startedAt,
    completedAt: completedAt,
    estimatedTime: totalPrepTime,
    totalAmount: totalAmount,
    statusHistory: apiOrder.bookingDetails?.statusHistory || [],
    allCustomizations: allCustomizations,
    allSpecialInstructions: allSpecialInstructions,
    autoProgress: apiOrder.autoProgress || false,
  };
};

// Fetch orders from API with retry logic
const fetchOrdersFromAPI = async (retryCount = 0, maxRetries = 3) => {
  try {
    const response = await apiClient.get("/orders");

    const result = response.data;

    if (result.success && Array.isArray(result.data)) {
      return result.data.map(transformOrder);
    }

    // Handle alternative response structure
    if (Array.isArray(result)) {
      return result.map(transformOrder);
    }

    if (result.orders && Array.isArray(result.orders)) {
      return result.orders.map(transformOrder);
    }

    console.warn("Unexpected API response structure:", result);
    return [];
  } catch (error) {
    console.error(`Fetch attempt ${retryCount + 1} failed:`, error.message);

    // Retry logic for network errors
    if (
      retryCount < maxRetries &&
      (error.code === "ECONNABORTED" || !error.response)
    ) {
      const delay = 2000 * (retryCount + 1);
      console.log(`Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchOrdersFromAPI(retryCount + 1, maxRetries);
    }

    throw error;
  }
};

// Update order status via API
const updateOrderStatusAPI = async (orderId, newStatus) => {
  try {
    const response = await apiClient.patch(`/orders/${orderId}/status`, {
      status: newStatus,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

// ========== KITCHEN ORDER CARD COMPONENT ==========
const KitchenOrderCard = ({
  order,
  onStartPreparation,
  onMarkReady,
  onViewDetails,
}) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (order.status === "preparing" && order.startedAt) {
      const interval = setInterval(() => {
        const elapsed = Math.floor(
          (Date.now() - new Date(order.startedAt)) / 60000,
        );
        setTimeElapsed(elapsed);
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [order.status, order.startedAt]);

  const getPriorityColor = () => {
    const elapsed = timeElapsed;
    const estimatedTime = order.estimatedTime || 20;
    if (elapsed > estimatedTime) return "border-red-500 bg-red-50";
    if (elapsed > estimatedTime * 0.7) return "border-yellow-500 bg-yellow-50";
    return "border-green-500 bg-green-50";
  };

  const getStatusBadge = () => {
    switch (order.status) {
      case "pending":
        return (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <TimeIcon className="text-yellow-600 text-sm" /> Pending
          </span>
        );
      case "confirmed":
        return (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <CheckCircleIcon className="text-blue-600 text-sm" /> Confirmed
          </span>
        );
      case "preparing":
        return (
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <FireIcon className="text-purple-600 text-sm" /> Cooking
          </span>
        );
      case "ready":
        return (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <DoneAllIcon className="text-green-600 text-sm" /> Ready
          </span>
        );
      case "completed":
        return (
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <CheckCircleIcon className="text-gray-600 text-sm" /> Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <CancelIcon className="text-red-600 text-sm" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
            {order.status}
          </span>
        );
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
      <div className="p-4 border-b bg-gray-50">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-sm font-bold text-gray-700">
                #{order.orderId?.slice(-8)}
              </span>
              {getStatusBadge()}
            </div>
            <div className="flex items-center gap-3 mt-2 text-sm text-gray-600 flex-wrap">
              <span className="flex items-center gap-1">
                <TableIcon fontSize="small" /> Table {order.tableNumber}
              </span>
              <span className="flex items-center gap-1">
                <PersonIcon fontSize="small" /> {order.customerName}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                {order.orderType}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-orange-600 font-bold">
              <TimerIcon fontSize="small" />
              <span>{order.estimatedTime} min est.</span>
            </div>
            {order.status === "preparing" && (
              <div className="text-xs text-gray-500 mt-1">
                Elapsed: {timeElapsed} min
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-1">
          <FoodIcon fontSize="small" /> Order Items ({order.items?.length || 0})
        </h4>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {order.items?.map((item, idx) => (
            <div
              key={idx}
              className="text-sm border-b border-gray-100 pb-2 last:border-0"
            >
              <div className="flex justify-between flex-wrap gap-2">
                <span className="font-medium">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-gray-500">
                  {item.preparationTime || 15} min
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-0.5">
                <span>
                  RWF{" "}
                  {(
                    item.finalPrice ||
                    item.originalPrice ||
                    0
                  ).toLocaleString()}
                </span>
              </div>
              {item.customizations?.length > 0 && (
                <div className="text-xs text-orange-600 mt-1">
                  ✨ {item.customizations.join(", ")}
                </div>
              )}
              {item.specialInstructions && (
                <div className="text-xs text-blue-600 mt-1">
                  📝 {item.specialInstructions}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Global order notes */}
        {order.notes && (
          <div className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-600 flex items-start gap-1">
              <NoteIcon fontSize="small" className="text-gray-400" />
              <span className="font-medium">Notes:</span> {order.notes}
            </div>
          </div>
        )}

        {/* Special instructions from booking details */}
        {order.specialInstructions &&
          order.specialInstructions !== order.notes && (
            <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xs text-blue-600 flex items-start gap-1">
                <NoteIcon fontSize="small" />
                <span className="font-medium">Special Instructions:</span>{" "}
                {order.specialInstructions}
              </div>
            </div>
          )}

        {/* Estimated Pickup Time */}
        {order.estimatedPickupTime && (
          <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
            <TimeIcon fontSize="inherit" />
            Est. Pickup:{" "}
            {new Date(order.estimatedPickupTime).toLocaleTimeString()}
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-gray-50 flex gap-2">
        {(order.status === "pending" || order.status === "confirmed") && (
          <button
            onClick={() => onStartPreparation(order)}
            className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition flex items-center justify-center gap-2"
          >
            <StartIcon fontSize="small" /> Start Cooking
          </button>
        )}
        {order.status === "preparing" && (
          <button
            onClick={() => onMarkReady(order)}
            className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition flex items-center justify-center gap-2"
          >
            <DoneAllIcon fontSize="small" /> Mark Ready
          </button>
        )}
        {order.status === "ready" && (
          <div className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg text-center flex items-center justify-center gap-2">
            <CheckCircleIcon fontSize="small" /> Ready for Pickup
          </div>
        )}
        {order.status === "completed" && (
          <div className="flex-1 bg-gray-100 text-gray-500 py-2 rounded-lg text-center flex items-center justify-center gap-2">
            <CheckCircleIcon fontSize="small" /> Completed
          </div>
        )}
        {order.status === "cancelled" && (
          <div className="flex-1 bg-red-100 text-red-500 py-2 rounded-lg text-center flex items-center justify-center gap-2">
            <CancelIcon fontSize="small" /> Cancelled
          </div>
        )}
        <button
          onClick={() => onViewDetails(order)}
          className="px-4 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition flex items-center justify-center gap-1"
        >
          <ViewIcon fontSize="small" /> Details
        </button>
      </div>
    </motion.div>
  );
};

// ========== ORDER DETAILS MODAL ==========
const OrderDetailsModal = ({
  order,
  onClose,
  onStartPreparation,
  onMarkReady,
}) => {
  if (!order) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "preparing":
        return "bg-purple-100 text-purple-800";
      case "ready":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-white font-bold text-xl">Order Details</h2>
            <p className="text-purple-200 text-sm">Kitchen View</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full"
          >
            <CloseIcon className="text-white" />
          </button>
        </div>

        <div className="p-6">
          {/* Order Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-xs text-gray-500">Order ID</p>
              <p className="font-mono font-medium text-sm">
                {order.orderId?.slice(-12)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Request ID</p>
              <p className="font-mono text-xs text-gray-500">
                {order.requestId?.slice(-8)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Table</p>
              <p className="font-medium text-lg">Table {order.tableNumber}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Customer</p>
              <p className="font-medium">{order.customerName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
              >
                {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Order Type</p>
              <p className="font-medium">{order.orderType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Created</p>
              <p className="font-medium text-sm">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Est. Prep Time</p>
              <p className="font-medium">{order.estimatedTime} minutes</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Amount</p>
              <p className="font-medium text-orange-600">
                RWF {order.totalAmount?.toLocaleString() || 0}
              </p>
            </div>
            {order.estimatedPickupTime && (
              <div>
                <p className="text-xs text-gray-500">Est. Pickup</p>
                <p className="font-medium text-sm">
                  {new Date(order.estimatedPickupTime).toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* Items */}
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FoodIcon fontSize="small" /> Items to Prepare
          </h3>
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {order.items?.map((item, idx) => (
              <div key={idx} className="border rounded-lg p-4">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-800">
                        {item.quantity}x
                      </span>
                      <span className="font-medium text-gray-800">
                        {item.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">ID: {item.id}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400">Prep time</span>
                    <p className="text-sm font-medium">
                      {item.preparationTime || 15} min
                    </p>
                    <p className="text-xs text-orange-600">
                      RWF{" "}
                      {(item.finalPrice || item.originalPrice).toLocaleString()}
                    </p>
                  </div>
                </div>

                {item.customizations?.length > 0 && (
                  <div className="mt-3 p-2 bg-orange-50 rounded-lg">
                    <p className="text-xs font-medium text-orange-700 flex items-center gap-1">
                      <SettingsIcon fontSize="small" /> Customizations:
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.customizations.map((c, i) => (
                        <span
                          key={i}
                          className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {item.specialInstructions && (
                  <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                    <p className="text-xs font-medium text-blue-700 flex items-center gap-1">
                      <NoteIcon fontSize="small" /> Special Instructions:
                    </p>
                    <p className="text-xs text-blue-600 mt-0.5">
                      {item.specialInstructions}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Order Notes */}
          {order.notes && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <NoteIcon fontSize="small" /> Order Notes
              </p>
              <p className="text-sm text-gray-600 mt-1">{order.notes}</p>
            </div>
          )}

          {/* Status History */}
          {order.statusHistory && order.statusHistory.length > 0 && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <TimeIcon fontSize="small" /> Status Timeline
              </p>
              <div className="space-y-2">
                {order.statusHistory.map((entry, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-xs border-b border-gray-100 pb-1 last:border-0"
                  >
                    <span className="capitalize font-medium">
                      {entry.status}
                    </span>
                    <span className="text-gray-500">
                      {new Date(entry.timestamp).toLocaleString()}
                    </span>
                    {entry.note && (
                      <span className="text-gray-400 text-xs ml-2">
                        {entry.note}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              Close
            </button>
            {(order.status === "pending" || order.status === "confirmed") && (
              <button
                onClick={() => {
                  onStartPreparation(order);
                  onClose();
                }}
                className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition"
              >
                Start Cooking
              </button>
            )}
            {order.status === "preparing" && (
              <button
                onClick={() => {
                  onMarkReady(order);
                  onClose();
                }}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition"
              >
                Mark as Ready
              </button>
            )}
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
      className={`bg-white rounded-xl shadow-lg p-4 sm:p-5 border-l-4 ${color}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-xs sm:text-sm font-medium">
            {title}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
            {value}
          </p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div
          className={`p-2 sm:p-3 rounded-full bg-${color.split("-")[1]}-100 bg-opacity-20`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

// ========== CONNECTION STATUS BANNER ==========
const ConnectionStatusBanner = ({ isConnected, onRetry }) => {
  if (isConnected) return null;

  return (
    <div className="mx-4 sm:mx-6 mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex justify-between items-center">
      <div className="flex items-center gap-3">
        <WifiOffIcon className="text-red-500" />
        <div>
          <p className="text-red-700 font-medium">Connection Error</p>
          <p className="text-red-600 text-sm">
            Cannot connect to the server. Using cached data.
          </p>
        </div>
      </div>
      <button
        onClick={onRetry}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
      >
        Retry Connection
      </button>
    </div>
  );
};

// ========== MAIN CHEF DASHBOARD ==========
export const ChefDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [stats, setStats] = useState({
    pendingOrders: 0,
    confirmedOrders: 0,
    preparingOrders: 0,
    readyOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    completedToday: 0,
    avgPreparationTime: 0,
    totalRevenue: 0,
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const previousOrdersRef = useRef([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleNavigation = (path) => navigate(path);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://nutriscan-foodanddrinksupply.onrender.com/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.error("Logout error:", error?.response?.data || error.message);
    } finally {
      // clear auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // redirect
      navigate("/login");
    }
  };

  // Play notification sound
  const playNotificationSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const audio = new Audio(
        "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3",
      );
      audio.volume = 0.3;
      audio.play().catch((e) => console.log("Audio play failed:", e));
    } catch (error) {
      console.log("Sound not supported");
    }
  }, [soundEnabled]);

  // Calculate statistics from orders
  const calculateStats = useCallback((ordersList) => {
    const pending = ordersList.filter((o) => o.status === "pending").length;
    const confirmed = ordersList.filter((o) => o.status === "confirmed").length;
    const preparing = ordersList.filter((o) => o.status === "preparing").length;
    const ready = ordersList.filter((o) => o.status === "ready").length;
    const completed = ordersList.filter((o) => o.status === "completed").length;
    const cancelled = ordersList.filter((o) => o.status === "cancelled").length;

    const completedToday = ordersList.filter((o) => {
      const today = new Date().toDateString();
      return (
        o.status === "completed" &&
        new Date(o.createdAt).toDateString() === today
      );
    }).length;

    // Calculate average prep time for completed orders
    const completedOrdersWithTimes = ordersList.filter(
      (o) => o.status === "completed" && o.startedAt && o.completedAt,
    );
    const avgTime =
      completedOrdersWithTimes.length > 0
        ? Math.round(
            completedOrdersWithTimes.reduce((sum, o) => {
              const start = new Date(o.startedAt);
              const end = new Date(o.completedAt);
              return sum + (end - start) / 60000;
            }, 0) / completedOrdersWithTimes.length,
          )
        : 0;

    // Calculate total revenue from ready and completed orders
    const totalRevenue = ordersList
      .filter((o) => o.status === "ready" || o.status === "completed")
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    setStats({
      pendingOrders: pending,
      confirmedOrders: confirmed,
      preparingOrders: preparing,
      readyOrders: ready,
      completedOrders: completed,
      cancelledOrders: cancelled,
      completedToday,
      avgPreparationTime: avgTime,
      totalRevenue,
    });
  }, []);

  // Load orders from API
  const loadOrders = useCallback(
    async (showLoading = true) => {
      if (showLoading) setRefreshing(true);
      try {
        const apiOrders = await fetchOrdersFromAPI();
        setOrders(apiOrders);
        setLastRefresh(new Date());
        setIsConnected(true);
        setError(null);

        calculateStats(apiOrders);

        // Check for new orders
        const previousOrders = previousOrdersRef.current;
        const newOrders = apiOrders.filter(
          (o) =>
            (o.status === "pending" || o.status === "confirmed") &&
            !previousOrders.some((prev) => prev._id === o._id),
        );

        if (newOrders.length > 0) {
          playNotificationSound();
          toast.info(
            `${newOrders.length} new order${newOrders.length > 1 ? "s" : ""} received!`,
          );
        }

        previousOrdersRef.current = apiOrders;
      } catch (error) {
        console.error("Error loading orders:", error);
        setIsConnected(false);
        setError(error.message);
        toast.error("Failed to load orders from server");

        // Try to load cached orders from localStorage
        const cachedOrders = localStorage.getItem("chef_orders_cache");
        if (cachedOrders) {
          try {
            const parsed = JSON.parse(cachedOrders);
            if (parsed.length > 0) {
              setOrders(parsed);
              calculateStats(parsed);
              toast.warning("Showing cached orders - server unreachable");
            }
          } catch (e) {
            console.error("Failed to parse cached orders");
          }
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [calculateStats, playNotificationSound],
  );

  // Cache orders to localStorage
  useEffect(() => {
    if (orders.length > 0 && !error) {
      localStorage.setItem("chef_orders_cache", JSON.stringify(orders));
    }
  }, [orders, error]);

  // Start preparation
  const startPreparation = async (order) => {
    try {
      await updateOrderStatusAPI(order._id, "preparing");
      toast.success(`Started preparing Order #${order.orderId?.slice(-8)}`);
      loadOrders(false);
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  // Mark as ready
  const markAsReady = async (order) => {
    try {
      await updateOrderStatusAPI(order._id, "ready");
      toast.success(`Order #${order.orderId?.slice(-8)} is ready for serving!`);
      loadOrders(false);
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  // Initial load and auto-refresh
  useEffect(() => {
    loadOrders();
    const interval = setInterval(() => loadOrders(false), 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [loadOrders]);

  const getFilteredOrders = () => {
    let filtered = orders;

    if (activeTab === "active") {
      filtered = orders.filter((o) =>
        ["pending", "confirmed", "preparing"].includes(o.status),
      );
    } else if (activeTab === "ready") {
      filtered = orders.filter((o) => o.status === "ready");
    } else if (activeTab === "completed") {
      filtered = orders.filter((o) => o.status === "completed");
    } else if (activeTab === "cancelled") {
      filtered = orders.filter((o) => o.status === "cancelled");
    } else if (activeTab === "all") {
      filtered = orders;
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.orderId?.toLowerCase().includes(term) ||
          o.tableNumber?.toString().includes(term) ||
          o.customerName?.toLowerCase().includes(term),
      );
    }

    // Sort: preparing first, then by creation date (newest first)
    return filtered.sort((a, b) => {
      if (a.status === "preparing" && b.status !== "preparing") return -1;
      if (a.status !== "preparing" && b.status === "preparing") return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const filteredOrders = getFilteredOrders();
  const pendingOrders = filteredOrders.filter(
    (o) => o.status === "pending" || o.status === "confirmed",
  );
  const preparingOrders = filteredOrders.filter(
    (o) => o.status === "preparing",
  );
  const readyOrders = filteredOrders.filter((o) => o.status === "ready");

  const tabs = [
    {
      id: "active",
      label: "Active Orders",
      icon: <FireIcon />,
      count:
        stats.pendingOrders + stats.confirmedOrders + stats.preparingOrders,
    },
    {
      id: "ready",
      label: "Ready",
      icon: <DoneAllIcon />,
      count: stats.readyOrders,
    },
    {
      id: "completed",
      label: "Completed",
      icon: <CheckCircleIcon />,
      count: stats.completedOrders,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      icon: <CancelIcon />,
      count: stats.cancelledOrders,
    },
    { id: "all", label: "All Orders", icon: <OrdersIcon /> },
  ];

  if (loading && orders.length === 0) {
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
      />

      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <KitchenIcon className="text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">
                Kitchen Dashboard
              </h1>
              <p className="text-purple-200 text-xs sm:text-sm">
                Real-time order management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg text-xs">
              {isConnected ? (
                <WifiIcon fontSize="small" />
              ) : (
                <WifiOffIcon fontSize="small" />
              )}
              <span>{isConnected ? "Connected" : "Offline"}</span>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-full transition ${soundEnabled ? "bg-white/20" : "bg-white/10"}`}
              title={soundEnabled ? "Sound On" : "Sound Off"}
            >
              <AlertIcon className="text-white" />
            </button>
            <button
              onClick={() => loadOrders()}
              disabled={refreshing}
              className={`p-2 rounded-full transition ${refreshing ? "animate-spin" : "hover:bg-white/20"}`}
              title="Refresh"
            >
              <RefreshIcon className="text-white" />
            </button>
            <div className="bg-white/20 px-2 sm:px-3 py-2 rounded-lg text-xs">
              Last: {lastRefresh.toLocaleTimeString()}
            </div>
            <div className="bg-white/20 px-2 sm:px-3 py-2 rounded-lg text-xs">
              <button
                onClick={handleLogout}
                className="text-white hover:text-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Connection Status Banner */}
      <ConnectionStatusBanner
        isConnected={isConnected}
        onRetry={() => loadOrders()}
      />

      {/* Stats Bar */}
      <div className="p-4 sm:p-6 pb-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          <StatCard
            title="Pending"
            value={stats.pendingOrders}
            icon={<TimeIcon className="text-yellow-600" />}
            color="border-yellow-500"
            subtitle="New orders"
          />
          <StatCard
            title="Confirmed"
            value={stats.confirmedOrders}
            icon={<CheckCircleIcon className="text-blue-600" />}
            color="border-blue-500"
            subtitle="Awaiting start"
          />
          <StatCard
            title="In Progress"
            value={stats.preparingOrders}
            icon={<FireIcon className="text-purple-600" />}
            color="border-purple-500"
            subtitle="Cooking"
          />
          <StatCard
            title="Ready"
            value={stats.readyOrders}
            icon={<DoneAllIcon className="text-green-600" />}
            color="border-green-500"
            subtitle="Awaiting pickup"
          />
          <StatCard
            title="Completed"
            value={stats.completedOrders}
            icon={<CheckCircleIcon className="text-gray-600" />}
            color="border-gray-500"
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
      <div className="px-4 sm:px-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              <span className="text-sm">{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={`ml-1 px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? "bg-white/20" : "bg-purple-100 text-purple-600"}`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 sm:px-6 pt-4">
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

      {/* Orders Display */}
      <div className="p-4 sm:p-6">
        {activeTab === "active" && (
          <>
            {preparingOrders.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FireIcon className="text-purple-600" /> In Progress (
                  {preparingOrders.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  <AnimatePresence>
                    {preparingOrders.map((order) => (
                      <KitchenOrderCard
                        key={order._id}
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

            {pendingOrders.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <TimeIcon className="text-yellow-600" /> Pending (
                  {pendingOrders.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  <AnimatePresence>
                    {pendingOrders.map((order) => (
                      <KitchenOrderCard
                        key={order._id}
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
                <p className="text-gray-500">
                  No active orders. Kitchen is idle.
                </p>
              </div>
            )}
          </>
        )}

        {(activeTab === "ready" ||
          activeTab === "completed" ||
          activeTab === "cancelled" ||
          activeTab === "all") && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredOrders.map((order) => (
              <KitchenOrderCard
                key={order._id}
                order={order}
                onStartPreparation={startPreparation}
                onMarkReady={markAsReady}
                onViewDetails={setSelectedOrder}
              />
            ))}
            {filteredOrders.length === 0 && (
              <div className="col-span-full text-center py-12 bg-white rounded-xl">
                <OrdersIcon className="text-gray-300 text-6xl mx-auto mb-4" />
                <p className="text-gray-500">No orders found.</p>
              </div>
            )}
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
    </div>
  );
};
