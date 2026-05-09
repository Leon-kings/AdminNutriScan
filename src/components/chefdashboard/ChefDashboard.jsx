/* eslint-disable react-refresh/only-export-components */
// // /* eslint-disable react-hooks/set-state-in-effect */
// // /* eslint-disable no-unused-vars */

// // // ChefDashboard.jsx
// // import React, { useState, useEffect, useCallback, useRef } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import axios from "axios";
// // import {
// //   Kitchen as KitchenIcon,
// //   ShoppingCart as OrdersIcon,
// //   CheckCircle as CheckCircleIcon,
// //   Cancel as CancelIcon,
// //   Timer as TimerIcon,
// //   AccessTime as TimeIcon,
// //   Warning as WarningIcon,
// //   LocalFireDepartment as FireIcon,
// //   EmojiEvents as TrophyIcon,
// //   Speed as SpeedIcon,
// //   DoneAll as DoneAllIcon,
// //   Visibility as ViewIcon,
// //   Search as SearchIcon,
// //   Refresh as RefreshIcon,
// //   VolumeUp as AlertIcon,
// //   Person as PersonIcon,
// //   TableRestaurant as TableIcon,
// //   HealthAndSafety as HealthIcon,
// //   Close as CloseIcon,
// //   PlayArrow as StartIcon,
// //   Fastfood as FoodIcon,
// //   NoteAlt as NoteIcon,
// //   Settings as SettingsIcon,
// //   WifiOff as WifiOffIcon,
// //   Wifi as WifiIcon,
// // } from "@mui/icons-material";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { useAuth } from "../../App";

// // // ========== API CONFIGURATION ==========
// // const API_BASE_URL = "https://nutriscan-foodanddrinksupply.onrender.com";

// // // Create axios instance with default config
// // const apiClient = axios.create({
// //   baseURL: API_BASE_URL,
// // });

// // // Add response interceptor for error handling
// // apiClient.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     if (error.code === "ECONNABORTED") {
// //       console.error("Request timeout - server took too long to respond");
// //     } else if (error.response) {
// //       console.error(`API Error ${error.response.status}:`, error.response.data);
// //     } else if (error.request) {
// //       console.error("No response received from server");
// //     } else {
// //       console.error("Request error:", error.message);
// //     }
// //     return Promise.reject(error);
// //   },
// // );

// // // ========== HELPER FUNCTIONS ==========

// // // Transform API order to local component structure
// // const transformOrder = (apiOrder) => {
// //   // Determine status from multiple possible sources
// //   let status = apiOrder.status || "pending";
// //   if (apiOrder.bookingDetails?.currentStatus) {
// //     status = apiOrder.bookingDetails.currentStatus;
// //   }

// //   // Get timestamps from status history
// //   let startedAt = null;
// //   let completedAt = null;
// //   if (apiOrder.bookingDetails?.statusHistory) {
// //     const preparingEntry = apiOrder.bookingDetails.statusHistory.find(
// //       (h) => h.status === "preparing",
// //     );
// //     if (preparingEntry) startedAt = preparingEntry.timestamp;

// //     const completedEntry = apiOrder.bookingDetails.statusHistory.find(
// //       (h) => h.status === "ready" || h.status === "completed",
// //     );
// //     if (completedEntry) completedAt = completedEntry.timestamp;
// //   }

// //   // Calculate total preparation time
// //   const totalPrepTime =
// //     apiOrder.items?.reduce(
// //       (sum, item) => sum + (item.preparationTime || 15),
// //       0,
// //     ) || 20;

// //   // Calculate total order amount
// //   const totalAmount =
// //     apiOrder.items?.reduce(
// //       (sum, item) => sum + (item.finalPrice || item.originalPrice || 0),
// //       0,
// //     ) || 0;

// //   // Collect all customizations
// //   const allCustomizations = [];
// //   const allSpecialInstructions = [];
// //   apiOrder.items?.forEach((item) => {
// //     if (item.customizations?.length) {
// //       allCustomizations.push(...item.customizations);
// //     }
// //     if (item.specialInstructions) {
// //       allSpecialInstructions.push({
// //         itemName: item.name,
// //         instruction: item.specialInstructions,
// //       });
// //     }
// //   });

// //   return {
// //     _id: apiOrder._id,
// //     orderId: apiOrder.orderId,
// //     requestId: apiOrder.requestId,
// //     tableNumber: apiOrder.personDetails?.tableNumber || "Unknown",
// //     customerName: apiOrder.personDetails?.name || "Guest",
// //     orderType: apiOrder.personDetails?.orderType || "dine-in",
// //     status: status,
// //     items: apiOrder.items || [],
// //     notes: apiOrder.notes || "",
// //     specialInstructions: apiOrder.bookingDetails?.specialInstructions || "",
// //     estimatedPickupTime: apiOrder.bookingDetails?.estimatedPickupTime,
// //     createdAt: apiOrder.createdAt,
// //     updatedAt: apiOrder.updatedAt,
// //     startedAt: startedAt,
// //     completedAt: completedAt,
// //     estimatedTime: totalPrepTime,
// //     totalAmount: totalAmount,
// //     statusHistory: apiOrder.bookingDetails?.statusHistory || [],
// //     allCustomizations: allCustomizations,
// //     allSpecialInstructions: allSpecialInstructions,
// //     autoProgress: apiOrder.autoProgress || false,
// //   };
// // };

// // // Fetch orders from API with retry logic
// // const fetchOrdersFromAPI = async (retryCount = 0, maxRetries = 3) => {
// //   try {
// //     const response = await apiClient.get("/orders");

// //     const result = response.data;

// //     if (result.success && Array.isArray(result.data)) {
// //       return result.data.map(transformOrder);
// //     }

// //     // Handle alternative response structure
// //     if (Array.isArray(result)) {
// //       return result.map(transformOrder);
// //     }

// //     if (result.orders && Array.isArray(result.orders)) {
// //       return result.orders.map(transformOrder);
// //     }

// //     console.warn("Unexpected API response structure:", result);
// //     return [];
// //   } catch (error) {
// //     console.error(`Fetch attempt ${retryCount + 1} failed:`, error.message);

// //     // Retry logic for network errors
// //     if (
// //       retryCount < maxRetries &&
// //       (error.code === "ECONNABORTED" || !error.response)
// //     ) {
// //       const delay = 2000 * (retryCount + 1);
// //       console.log(`Retrying in ${delay}ms...`);
// //       await new Promise((resolve) => setTimeout(resolve, delay));
// //       return fetchOrdersFromAPI(retryCount + 1, maxRetries);
// //     }

// //     throw error;
// //   }
// // };

// // // Update order status via API
// // const updateOrderStatusAPI = async (orderId, newStatus) => {
// //   try {
// //     const response = await apiClient.patch(`/orders/${orderId}/status`, {
// //       status: newStatus,
// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error updating order status:", error);
// //     throw error;
// //   }
// // };

// // // ========== KITCHEN ORDER CARD COMPONENT ==========
// // const KitchenOrderCard = ({
// //   order,
// //   onStartPreparation,
// //   onMarkReady,
// //   onViewDetails,
// // }) => {
// //   const [timeElapsed, setTimeElapsed] = useState(0);
// //   const [isHovered, setIsHovered] = useState(false);

// //   useEffect(() => {
// //     if (order.status === "preparing" && order.startedAt) {
// //       const interval = setInterval(() => {
// //         const elapsed = Math.floor(
// //           (Date.now() - new Date(order.startedAt)) / 60000,
// //         );
// //         setTimeElapsed(elapsed);
// //       }, 60000);
// //       return () => clearInterval(interval);
// //     }
// //   }, [order.status, order.startedAt]);

// //   const getPriorityColor = () => {
// //     const elapsed = timeElapsed;
// //     const estimatedTime = order.estimatedTime || 20;
// //     if (elapsed > estimatedTime) return "border-red-500 bg-red-50";
// //     if (elapsed > estimatedTime * 0.7) return "border-yellow-500 bg-yellow-50";
// //     return "border-green-500 bg-green-50";
// //   };

// //   const getStatusBadge = () => {
// //     switch (order.status) {
// //       case "pending":
// //         return (
// //           <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
// //             <TimeIcon className="text-yellow-600 text-sm" /> Pending
// //           </span>
// //         );
// //       case "confirmed":
// //         return (
// //           <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
// //             <CheckCircleIcon className="text-blue-600 text-sm" /> Confirmed
// //           </span>
// //         );
// //       case "preparing":
// //         return (
// //           <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
// //             <FireIcon className="text-purple-600 text-sm" /> Cooking
// //           </span>
// //         );
// //       case "ready":
// //         return (
// //           <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
// //             <DoneAllIcon className="text-green-600 text-sm" /> Ready
// //           </span>
// //         );
// //       case "completed":
// //         return (
// //           <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
// //             <CheckCircleIcon className="text-gray-600 text-sm" /> Completed
// //           </span>
// //         );
// //       case "cancelled":
// //         return (
// //           <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
// //             <CancelIcon className="text-red-600 text-sm" /> Cancelled
// //           </span>
// //         );
// //       default:
// //         return (
// //           <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
// //             {order.status}
// //           </span>
// //         );
// //     }
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       exit={{ opacity: 0, x: -100 }}
// //       whileHover={{ scale: 1.02 }}
// //       onMouseEnter={() => setIsHovered(true)}
// //       onMouseLeave={() => setIsHovered(false)}
// //       className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${getPriorityColor()} transition-all duration-300 ${isHovered ? "shadow-xl" : ""}`}
// //     >
// //       <div className="p-4 border-b bg-gray-50">
// //         <div className="flex justify-between items-start flex-wrap gap-2">
// //           <div>
// //             <div className="flex items-center gap-2 flex-wrap">
// //               <span className="font-mono text-sm font-bold text-gray-700">
// //                 #{order.orderId?.slice(-8)}
// //               </span>
// //               {getStatusBadge()}
// //             </div>
// //             <div className="flex items-center gap-3 mt-2 text-sm text-gray-600 flex-wrap">
// //               <span className="flex items-center gap-1">
// //                 <TableIcon fontSize="small" /> Table {order.tableNumber}
// //               </span>
// //               <span className="flex items-center gap-1">
// //                 <PersonIcon fontSize="small" /> {order.customerName}
// //               </span>
// //               <span className="flex items-center gap-1 text-xs text-gray-400">
// //                 {order.orderType}
// //               </span>
// //             </div>
// //           </div>
// //           <div className="text-right">
// //             <div className="flex items-center gap-1 text-orange-600 font-bold">
// //               <TimerIcon fontSize="small" />
// //               <span>{order.estimatedTime} min est.</span>
// //             </div>
// //             {order.status === "preparing" && (
// //               <div className="text-xs text-gray-500 mt-1">
// //                 Elapsed: {timeElapsed} min
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       <div className="p-4">
// //         <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-1">
// //           <FoodIcon fontSize="small" /> Order Items ({order.items?.length || 0})
// //         </h4>
// //         <div className="space-y-3 max-h-48 overflow-y-auto">
// //           {order.items?.map((item, idx) => (
// //             <div
// //               key={idx}
// //               className="text-sm border-b border-gray-100 pb-2 last:border-0"
// //             >
// //               <div className="flex justify-between flex-wrap gap-2">
// //                 <span className="font-medium">
// //                   {item.quantity}x {item.name}
// //                 </span>
// //                 <span className="text-gray-500">
// //                   {item.preparationTime || 15} min
// //                 </span>
// //               </div>
// //               <div className="flex justify-between text-xs text-gray-500 mt-0.5">
// //                 <span>
// //                   RWF{" "}
// //                   {(
// //                     item.finalPrice ||
// //                     item.originalPrice ||
// //                     0
// //                   ).toLocaleString()}
// //                 </span>
// //               </div>
// //               {item.customizations?.length > 0 && (
// //                 <div className="text-xs text-orange-600 mt-1">
// //                   ✨ {item.customizations.join(", ")}
// //                 </div>
// //               )}
// //               {item.specialInstructions && (
// //                 <div className="text-xs text-blue-600 mt-1">
// //                   📝 {item.specialInstructions}
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //         </div>

// //         {/* Global order notes */}
// //         {order.notes && (
// //           <div className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
// //             <div className="text-xs text-gray-600 flex items-start gap-1">
// //               <NoteIcon fontSize="small" className="text-gray-400" />
// //               <span className="font-medium">Notes:</span> {order.notes}
// //             </div>
// //           </div>
// //         )}

// //         {/* Special instructions from booking details */}
// //         {order.specialInstructions &&
// //           order.specialInstructions !== order.notes && (
// //             <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
// //               <div className="text-xs text-blue-600 flex items-start gap-1">
// //                 <NoteIcon fontSize="small" />
// //                 <span className="font-medium">Special Instructions:</span>{" "}
// //                 {order.specialInstructions}
// //               </div>
// //             </div>
// //           )}

// //         {/* Estimated Pickup Time */}
// //         {order.estimatedPickupTime && (
// //           <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
// //             <TimeIcon fontSize="inherit" />
// //             Est. Pickup:{" "}
// //             {new Date(order.estimatedPickupTime).toLocaleTimeString()}
// //           </div>
// //         )}
// //       </div>

// //       <div className="p-4 border-t bg-gray-50 flex gap-2">
// //         {(order.status === "pending" || order.status === "confirmed") && (
// //           <button
// //             onClick={() => onStartPreparation(order)}
// //             className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition flex items-center justify-center gap-2"
// //           >
// //             <StartIcon fontSize="small" /> Start Cooking
// //           </button>
// //         )}
// //         {order.status === "preparing" && (
// //           <button
// //             onClick={() => onMarkReady(order)}
// //             className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition flex items-center justify-center gap-2"
// //           >
// //             <DoneAllIcon fontSize="small" /> Mark Ready
// //           </button>
// //         )}
// //         {order.status === "ready" && (
// //           <div className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg text-center flex items-center justify-center gap-2">
// //             <CheckCircleIcon fontSize="small" /> Ready for Pickup
// //           </div>
// //         )}
// //         {order.status === "completed" && (
// //           <div className="flex-1 bg-gray-100 text-gray-500 py-2 rounded-lg text-center flex items-center justify-center gap-2">
// //             <CheckCircleIcon fontSize="small" /> Completed
// //           </div>
// //         )}
// //         {order.status === "cancelled" && (
// //           <div className="flex-1 bg-red-100 text-red-500 py-2 rounded-lg text-center flex items-center justify-center gap-2">
// //             <CancelIcon fontSize="small" /> Cancelled
// //           </div>
// //         )}
// //         <button
// //           onClick={() => onViewDetails(order)}
// //           className="px-4 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition flex items-center justify-center gap-1"
// //         >
// //           <ViewIcon fontSize="small" /> Details
// //         </button>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // // ========== ORDER DETAILS MODAL ==========
// // const OrderDetailsModal = ({
// //   order,
// //   onClose,
// //   onStartPreparation,
// //   onMarkReady,
// // }) => {
// //   if (!order) return null;

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case "pending":
// //         return "bg-yellow-100 text-yellow-800";
// //       case "confirmed":
// //         return "bg-blue-100 text-blue-800";
// //       case "preparing":
// //         return "bg-purple-100 text-purple-800";
// //       case "ready":
// //         return "bg-green-100 text-green-800";
// //       case "completed":
// //         return "bg-gray-100 text-gray-800";
// //       case "cancelled":
// //         return "bg-red-100 text-red-800";
// //       default:
// //         return "bg-gray-100 text-gray-800";
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
// //       <motion.div
// //         initial={{ scale: 0.9, opacity: 0 }}
// //         animate={{ scale: 1, opacity: 1 }}
// //         className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
// //       >
// //         <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
// //           <div>
// //             <h2 className="text-white font-bold text-xl">Order Details</h2>
// //             <p className="text-purple-200 text-sm">Kitchen View</p>
// //           </div>
// //           <button
// //             onClick={onClose}
// //             className="p-1 hover:bg-white/20 rounded-full"
// //           >
// //             <CloseIcon className="text-white" />
// //           </button>
// //         </div>

// //         <div className="p-6">
// //           {/* Order Summary */}
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
// //             <div>
// //               <p className="text-xs text-gray-500">Order ID</p>
// //               <p className="font-mono font-medium text-sm">
// //                 {order.orderId?.slice(-12)}
// //               </p>
// //             </div>
// //             <div>
// //               <p className="text-xs text-gray-500">Request ID</p>
// //               <p className="font-mono text-xs text-gray-500">
// //                 {order.requestId?.slice(-8)}
// //               </p>
// //             </div>
// //             <div>
// //               <p className="text-xs text-gray-500">Table</p>
// //               <p className="font-medium text-lg">Table {order.tableNumber}</p>
// //             </div>
// //             <div>
// //               <p className="text-xs text-gray-500">Customer</p>
// //               <p className="font-medium">{order.customerName}</p>
// //             </div>
// //             <div>
// //               <p className="text-xs text-gray-500">Status</p>
// //               <span
// //                 className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
// //               >
// //                 {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
// //               </span>
// //             </div>
// //             <div>
// //               <p className="text-xs text-gray-500">Order Type</p>
// //               <p className="font-medium">{order.orderType}</p>
// //             </div>
// //             <div>
// //               <p className="text-xs text-gray-500">Created</p>
// //               <p className="font-medium text-sm">
// //                 {new Date(order.createdAt).toLocaleString()}
// //               </p>
// //             </div>
// //             <div>
// //               <p className="text-xs text-gray-500">Est. Prep Time</p>
// //               <p className="font-medium">{order.estimatedTime} minutes</p>
// //             </div>
// //             <div>
// //               <p className="text-xs text-gray-500">Total Amount</p>
// //               <p className="font-medium text-orange-600">
// //                 RWF {order.totalAmount?.toLocaleString() || 0}
// //               </p>
// //             </div>
// //             {order.estimatedPickupTime && (
// //               <div>
// //                 <p className="text-xs text-gray-500">Est. Pickup</p>
// //                 <p className="font-medium text-sm">
// //                   {new Date(order.estimatedPickupTime).toLocaleString()}
// //                 </p>
// //               </div>
// //             )}
// //           </div>

// //           {/* Items */}
// //           <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
// //             <FoodIcon fontSize="small" /> Items to Prepare
// //           </h3>
// //           <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
// //             {order.items?.map((item, idx) => (
// //               <div key={idx} className="border rounded-lg p-4">
// //                 <div className="flex justify-between items-start flex-wrap gap-2">
// //                   <div>
// //                     <div className="flex items-center gap-2 flex-wrap">
// //                       <span className="font-bold text-gray-800">
// //                         {item.quantity}x
// //                       </span>
// //                       <span className="font-medium text-gray-800">
// //                         {item.name}
// //                       </span>
// //                     </div>
// //                     <p className="text-xs text-gray-400 mt-1">ID: {item.id}</p>
// //                   </div>
// //                   <div className="text-right">
// //                     <span className="text-xs text-gray-400">Prep time</span>
// //                     <p className="text-sm font-medium">
// //                       {item.preparationTime || 15} min
// //                     </p>
// //                     <p className="text-xs text-orange-600">
// //                       RWF{" "}
// //                       {(item.finalPrice || item.originalPrice).toLocaleString()}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 {item.customizations?.length > 0 && (
// //                   <div className="mt-3 p-2 bg-orange-50 rounded-lg">
// //                     <p className="text-xs font-medium text-orange-700 flex items-center gap-1">
// //                       <SettingsIcon fontSize="small" /> Customizations:
// //                     </p>
// //                     <div className="flex flex-wrap gap-1 mt-1">
// //                       {item.customizations.map((c, i) => (
// //                         <span
// //                           key={i}
// //                           className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full"
// //                         >
// //                           {c}
// //                         </span>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}

// //                 {item.specialInstructions && (
// //                   <div className="mt-2 p-2 bg-blue-50 rounded-lg">
// //                     <p className="text-xs font-medium text-blue-700 flex items-center gap-1">
// //                       <NoteIcon fontSize="small" /> Special Instructions:
// //                     </p>
// //                     <p className="text-xs text-blue-600 mt-0.5">
// //                       {item.specialInstructions}
// //                     </p>
// //                   </div>
// //                 )}
// //               </div>
// //             ))}
// //           </div>

// //           {/* Order Notes */}
// //           {order.notes && (
// //             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
// //               <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
// //                 <NoteIcon fontSize="small" /> Order Notes
// //               </p>
// //               <p className="text-sm text-gray-600 mt-1">{order.notes}</p>
// //             </div>
// //           )}

// //           {/* Status History */}
// //           {order.statusHistory && order.statusHistory.length > 0 && (
// //             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
// //               <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
// //                 <TimeIcon fontSize="small" /> Status Timeline
// //               </p>
// //               <div className="space-y-2">
// //                 {order.statusHistory.map((entry, idx) => (
// //                   <div
// //                     key={idx}
// //                     className="flex justify-between items-center text-xs border-b border-gray-100 pb-1 last:border-0"
// //                   >
// //                     <span className="capitalize font-medium">
// //                       {entry.status}
// //                     </span>
// //                     <span className="text-gray-500">
// //                       {new Date(entry.timestamp).toLocaleString()}
// //                     </span>
// //                     {entry.note && (
// //                       <span className="text-gray-400 text-xs ml-2">
// //                         {entry.note}
// //                       </span>
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {/* Action Buttons */}
// //           <div className="flex gap-3 pt-4 border-t">
// //             <button
// //               onClick={onClose}
// //               className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
// //             >
// //               Close
// //             </button>
// //             {(order.status === "pending" || order.status === "confirmed") && (
// //               <button
// //                 onClick={() => {
// //                   onStartPreparation(order);
// //                   onClose();
// //                 }}
// //                 className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition"
// //               >
// //                 Start Cooking
// //               </button>
// //             )}
// //             {order.status === "preparing" && (
// //               <button
// //                 onClick={() => {
// //                   onMarkReady(order);
// //                   onClose();
// //                 }}
// //                 className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition"
// //               >
// //                 Mark as Ready
// //               </button>
// //             )}
// //           </div>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // // ========== STATISTICS CARD ==========
// // const StatCard = ({ title, value, icon, color, subtitle }) => {
// //   return (
// //     <motion.div
// //       whileHover={{ scale: 1.02 }}
// //       className={`bg-white rounded-xl shadow-lg p-4 sm:p-5 border-l-4 ${color}`}
// //     >
// //       <div className="flex justify-between items-start">
// //         <div>
// //           <p className="text-gray-500 text-xs sm:text-sm font-medium">
// //             {title}
// //           </p>
// //           <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
// //             {value}
// //           </p>
// //           {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
// //         </div>
// //         <div
// //           className={`p-2 sm:p-3 rounded-full bg-${color.split("-")[1]}-100 bg-opacity-20`}
// //         >
// //           {icon}
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // // ========== CONNECTION STATUS BANNER ==========
// // const ConnectionStatusBanner = ({ isConnected, onRetry }) => {
// //   if (isConnected) return null;

// //   return (
// //     <div className="mx-4 sm:mx-6 mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex justify-between items-center">
// //       <div className="flex items-center gap-3">
// //         <WifiOffIcon className="text-red-500" />
// //         <div>
// //           <p className="text-red-700 font-medium">Connection Error</p>
// //           <p className="text-red-600 text-sm">
// //             Cannot connect to the server. Using cached data.
// //           </p>
// //         </div>
// //       </div>
// //       <button
// //         onClick={onRetry}
// //         className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
// //       >
// //         Retry Connection
// //       </button>
// //     </div>
// //   );
// // };

// // // ========== MAIN CHEF DASHBOARD ==========
// // export const ChefDashboard = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [activeTab, setActiveTab] = useState("active");
// //   const [selectedOrder, setSelectedOrder] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isConnected, setIsConnected] = useState(true);
// //   const [stats, setStats] = useState({
// //     pendingOrders: 0,
// //     confirmedOrders: 0,
// //     preparingOrders: 0,
// //     readyOrders: 0,
// //     completedOrders: 0,
// //     cancelledOrders: 0,
// //     completedToday: 0,
// //     avgPreparationTime: 0,
// //     totalRevenue: 0,
// //   });
// //   const [soundEnabled, setSoundEnabled] = useState(true);
// //   const [lastRefresh, setLastRefresh] = useState(new Date());
// //   const [refreshing, setRefreshing] = useState(false);
// //   const previousOrdersRef = useRef([]);

// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { user } = useAuth();

// //   const handleNavigation = (path) => navigate(path);

// //   const handleLogout = async () => {
// //     try {
// //       const token = localStorage.getItem("token");

// //       await axios.post(
// //         "https://nutriscan-foodanddrinksupply.onrender.com/auth/logout",
// //         {},
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         },
// //       );
// //     } catch (error) {
// //       console.error("Logout error:", error?.response?.data || error.message);
// //     } finally {
// //       // clear auth data
// //       localStorage.removeItem("token");
// //       localStorage.removeItem("user");

// //       // redirect
// //       navigate("/login");
// //     }
// //   };

// //   // Play notification sound
// //   const playNotificationSound = useCallback(() => {
// //     if (!soundEnabled) return;
// //     try {
// //       const audio = new Audio(
// //         "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3",
// //       );
// //       audio.volume = 0.3;
// //       audio.play().catch((e) => console.log("Audio play failed:", e));
// //     } catch (error) {
// //       console.log("Sound not supported");
// //     }
// //   }, [soundEnabled]);

// //   // Calculate statistics from orders
// //   const calculateStats = useCallback((ordersList) => {
// //     const pending = ordersList.filter((o) => o.status === "pending").length;
// //     const confirmed = ordersList.filter((o) => o.status === "confirmed").length;
// //     const preparing = ordersList.filter((o) => o.status === "preparing").length;
// //     const ready = ordersList.filter((o) => o.status === "ready").length;
// //     const completed = ordersList.filter((o) => o.status === "completed").length;
// //     const cancelled = ordersList.filter((o) => o.status === "cancelled").length;

// //     const completedToday = ordersList.filter((o) => {
// //       const today = new Date().toDateString();
// //       return (
// //         o.status === "completed" &&
// //         new Date(o.createdAt).toDateString() === today
// //       );
// //     }).length;

// //     // Calculate average prep time for completed orders
// //     const completedOrdersWithTimes = ordersList.filter(
// //       (o) => o.status === "completed" && o.startedAt && o.completedAt,
// //     );
// //     const avgTime =
// //       completedOrdersWithTimes.length > 0
// //         ? Math.round(
// //             completedOrdersWithTimes.reduce((sum, o) => {
// //               const start = new Date(o.startedAt);
// //               const end = new Date(o.completedAt);
// //               return sum + (end - start) / 60000;
// //             }, 0) / completedOrdersWithTimes.length,
// //           )
// //         : 0;

// //     // Calculate total revenue from ready and completed orders
// //     const totalRevenue = ordersList
// //       .filter((o) => o.status === "ready" || o.status === "completed")
// //       .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

// //     setStats({
// //       pendingOrders: pending,
// //       confirmedOrders: confirmed,
// //       preparingOrders: preparing,
// //       readyOrders: ready,
// //       completedOrders: completed,
// //       cancelledOrders: cancelled,
// //       completedToday,
// //       avgPreparationTime: avgTime,
// //       totalRevenue,
// //     });
// //   }, []);

// //   // Load orders from API
// //   const loadOrders = useCallback(
// //     async (showLoading = true) => {
// //       if (showLoading) setRefreshing(true);
// //       try {
// //         const apiOrders = await fetchOrdersFromAPI();
// //         setOrders(apiOrders);
// //         setLastRefresh(new Date());
// //         setIsConnected(true);
// //         setError(null);

// //         calculateStats(apiOrders);

// //         // Check for new orders
// //         const previousOrders = previousOrdersRef.current;
// //         const newOrders = apiOrders.filter(
// //           (o) =>
// //             (o.status === "pending" || o.status === "confirmed") &&
// //             !previousOrders.some((prev) => prev._id === o._id),
// //         );

// //         if (newOrders.length > 0) {
// //           playNotificationSound();
// //           toast.info(
// //             `${newOrders.length} new order${newOrders.length > 1 ? "s" : ""} received!`,
// //           );
// //         }

// //         previousOrdersRef.current = apiOrders;
// //       } catch (error) {
// //         console.error("Error loading orders:", error);
// //         setIsConnected(false);
// //         setError(error.message);
// //         toast.error("Failed to load orders from server");

// //         // Try to load cached orders from localStorage
// //         const cachedOrders = localStorage.getItem("chef_orders_cache");
// //         if (cachedOrders) {
// //           try {
// //             const parsed = JSON.parse(cachedOrders);
// //             if (parsed.length > 0) {
// //               setOrders(parsed);
// //               calculateStats(parsed);
// //               toast.warning("Showing cached orders - server unreachable");
// //             }
// //           } catch (e) {
// //             console.error("Failed to parse cached orders");
// //           }
// //         }
// //       } finally {
// //         setLoading(false);
// //         setRefreshing(false);
// //       }
// //     },
// //     [calculateStats, playNotificationSound],
// //   );

// //   // Cache orders to localStorage
// //   useEffect(() => {
// //     if (orders.length > 0 && !error) {
// //       localStorage.setItem("chef_orders_cache", JSON.stringify(orders));
// //     }
// //   }, [orders, error]);

// //   // Start preparation
// //   const startPreparation = async (order) => {
// //     try {
// //       await updateOrderStatusAPI(order._id, "preparing");
// //       toast.success(`Started preparing Order #${order.orderId?.slice(-8)}`);
// //       loadOrders(false);
// //     } catch (error) {
// //       toast.error("Failed to update order status");
// //     }
// //   };

// //   // Mark as ready
// //   const markAsReady = async (order) => {
// //     try {
// //       await updateOrderStatusAPI(order._id, "ready");
// //       toast.success(`Order #${order.orderId?.slice(-8)} is ready for serving!`);
// //       loadOrders(false);
// //     } catch (error) {
// //       toast.error("Failed to update order status");
// //     }
// //   };

// //   // Initial load and auto-refresh
// //   useEffect(() => {
// //     loadOrders();
// //     const interval = setInterval(() => loadOrders(false), 30000); // Refresh every 30 seconds
// //     return () => clearInterval(interval);
// //   }, [loadOrders]);

// //   const getFilteredOrders = () => {
// //     let filtered = orders;

// //     if (activeTab === "active") {
// //       filtered = orders.filter((o) =>
// //         ["pending", "confirmed", "preparing"].includes(o.status),
// //       );
// //     } else if (activeTab === "ready") {
// //       filtered = orders.filter((o) => o.status === "ready");
// //     } else if (activeTab === "completed") {
// //       filtered = orders.filter((o) => o.status === "completed");
// //     } else if (activeTab === "cancelled") {
// //       filtered = orders.filter((o) => o.status === "cancelled");
// //     } else if (activeTab === "all") {
// //       filtered = orders;
// //     }

// //     if (searchTerm) {
// //       const term = searchTerm.toLowerCase();
// //       filtered = filtered.filter(
// //         (o) =>
// //           o.orderId?.toLowerCase().includes(term) ||
// //           o.tableNumber?.toString().includes(term) ||
// //           o.customerName?.toLowerCase().includes(term),
// //       );
// //     }

// //     // Sort: preparing first, then by creation date (newest first)
// //     return filtered.sort((a, b) => {
// //       if (a.status === "preparing" && b.status !== "preparing") return -1;
// //       if (a.status !== "preparing" && b.status === "preparing") return 1;
// //       return new Date(b.createdAt) - new Date(a.createdAt);
// //     });
// //   };

// //   const filteredOrders = getFilteredOrders();
// //   const pendingOrders = filteredOrders.filter(
// //     (o) => o.status === "pending" || o.status === "confirmed",
// //   );
// //   const preparingOrders = filteredOrders.filter(
// //     (o) => o.status === "preparing",
// //   );
// //   const readyOrders = filteredOrders.filter((o) => o.status === "ready");

// //   const tabs = [
// //     {
// //       id: "active",
// //       label: "Active Orders",
// //       icon: <FireIcon />,
// //       count:
// //         stats.pendingOrders + stats.confirmedOrders + stats.preparingOrders,
// //     },
// //     {
// //       id: "ready",
// //       label: "Ready",
// //       icon: <DoneAllIcon />,
// //       count: stats.readyOrders,
// //     },
// //     {
// //       id: "completed",
// //       label: "Completed",
// //       icon: <CheckCircleIcon />,
// //       count: stats.completedOrders,
// //     },
// //     {
// //       id: "cancelled",
// //       label: "Cancelled",
// //       icon: <CancelIcon />,
// //       count: stats.cancelledOrders,
// //     },
// //     { id: "all", label: "All Orders", icon: <OrdersIcon /> },
// //   ];

// //   if (loading && orders.length === 0) {
// //     return (
// //       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading kitchen orders...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       <ToastContainer
// //         position="top-right"
// //         autoClose={5000}
// //         hideProgressBar={false}
// //         newestOnTop={true}
// //         closeOnClick
// //         pauseOnHover
// //       />

// //       {/* Header */}
// //       <header className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg sticky top-0 z-10">
// //         <div className="px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-4">
// //           <div className="flex items-center gap-3">
// //             <div className="bg-white/20 p-2 rounded-lg">
// //               <KitchenIcon className="text-white" />
// //             </div>
// //             <div>
// //               <h1 className="text-lg sm:text-xl font-bold">
// //                 Kitchen Dashboard
// //               </h1>
// //               <p className="text-purple-200 text-xs sm:text-sm">
// //                 Real-time order management
// //               </p>
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-2 sm:gap-3">
// //             <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg text-xs">
// //               {isConnected ? (
// //                 <WifiIcon fontSize="small" />
// //               ) : (
// //                 <WifiOffIcon fontSize="small" />
// //               )}
// //               <span>{isConnected ? "Connected" : "Offline"}</span>
// //             </div>
// //             <button
// //               onClick={() => setSoundEnabled(!soundEnabled)}
// //               className={`p-2 rounded-full transition ${soundEnabled ? "bg-white/20" : "bg-white/10"}`}
// //               title={soundEnabled ? "Sound On" : "Sound Off"}
// //             >
// //               <AlertIcon className="text-white" />
// //             </button>
// //             <button
// //               onClick={() => loadOrders()}
// //               disabled={refreshing}
// //               className={`p-2 rounded-full transition ${refreshing ? "animate-spin" : "hover:bg-white/20"}`}
// //               title="Refresh"
// //             >
// //               <RefreshIcon className="text-white" />
// //             </button>
// //             <div className="bg-white/20 px-2 sm:px-3 py-2 rounded-lg text-xs">
// //               Last: {lastRefresh.toLocaleTimeString()}
// //             </div>
// //             <div className="bg-white/20 px-2 sm:px-3 py-2 rounded-lg text-xs">
// //               <button
// //                 onClick={handleLogout}
// //                 className="text-white hover:text-red-400"
// //               >
// //                 Logout
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Connection Status Banner */}
// //       <ConnectionStatusBanner
// //         isConnected={isConnected}
// //         onRetry={() => loadOrders()}
// //       />

// //       {/* Stats Bar */}
// //       <div className="p-4 sm:p-6 pb-2">
// //         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
// //           <StatCard
// //             title="Pending"
// //             value={stats.pendingOrders}
// //             icon={<TimeIcon className="text-yellow-600" />}
// //             color="border-yellow-500"
// //             subtitle="New orders"
// //           />
// //           <StatCard
// //             title="Confirmed"
// //             value={stats.confirmedOrders}
// //             icon={<CheckCircleIcon className="text-blue-600" />}
// //             color="border-blue-500"
// //             subtitle="Awaiting start"
// //           />
// //           <StatCard
// //             title="In Progress"
// //             value={stats.preparingOrders}
// //             icon={<FireIcon className="text-purple-600" />}
// //             color="border-purple-500"
// //             subtitle="Cooking"
// //           />
// //           <StatCard
// //             title="Ready"
// //             value={stats.readyOrders}
// //             icon={<DoneAllIcon className="text-green-600" />}
// //             color="border-green-500"
// //             subtitle="Awaiting pickup"
// //           />
// //           <StatCard
// //             title="Completed"
// //             value={stats.completedOrders}
// //             icon={<CheckCircleIcon className="text-gray-600" />}
// //             color="border-gray-500"
// //           />
// //           <StatCard
// //             title="Completed Today"
// //             value={stats.completedToday}
// //             icon={<TrophyIcon className="text-teal-600" />}
// //             color="border-teal-500"
// //           />
// //           <StatCard
// //             title="Avg Prep Time"
// //             value={`${stats.avgPreparationTime} min`}
// //             icon={<SpeedIcon className="text-indigo-600" />}
// //             color="border-indigo-500"
// //           />
// //         </div>
// //       </div>

// //       {/* Navigation Tabs */}
// //       <div className="px-4 sm:px-6">
// //         <div className="flex gap-2 overflow-x-auto pb-2">
// //           {tabs.map((tab) => (
// //             <button
// //               key={tab.id}
// //               onClick={() => setActiveTab(tab.id)}
// //               className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
// //                 activeTab === tab.id
// //                   ? "bg-purple-600 text-white shadow-md"
// //                   : "bg-white text-gray-600 hover:bg-gray-100"
// //               }`}
// //             >
// //               {tab.icon}
// //               <span className="text-sm">{tab.label}</span>
// //               {tab.count !== undefined && tab.count > 0 && (
// //                 <span
// //                   className={`ml-1 px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? "bg-white/20" : "bg-purple-100 text-purple-600"}`}
// //                 >
// //                   {tab.count}
// //                 </span>
// //               )}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Search Bar */}
// //       <div className="px-4 sm:px-6 pt-4">
// //         <div className="relative max-w-md">
// //           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
// //           <input
// //             type="text"
// //             placeholder="Search by Order ID, Table, or Customer..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
// //           />
// //         </div>
// //       </div>

// //       {/* Orders Display */}
// //       <div className="p-4 sm:p-6">
// //         {activeTab === "active" && (
// //           <>
// //             {preparingOrders.length > 0 && (
// //               <div className="mb-6">
// //                 <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
// //                   <FireIcon className="text-purple-600" /> In Progress (
// //                   {preparingOrders.length})
// //                 </h2>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
// //                   <AnimatePresence>
// //                     {preparingOrders.map((order) => (
// //                       <KitchenOrderCard
// //                         key={order._id}
// //                         order={order}
// //                         onStartPreparation={startPreparation}
// //                         onMarkReady={markAsReady}
// //                         onViewDetails={setSelectedOrder}
// //                       />
// //                     ))}
// //                   </AnimatePresence>
// //                 </div>
// //               </div>
// //             )}

// //             {pendingOrders.length > 0 && (
// //               <div>
// //                 <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
// //                   <TimeIcon className="text-yellow-600" /> Pending (
// //                   {pendingOrders.length})
// //                 </h2>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
// //                   <AnimatePresence>
// //                     {pendingOrders.map((order) => (
// //                       <KitchenOrderCard
// //                         key={order._id}
// //                         order={order}
// //                         onStartPreparation={startPreparation}
// //                         onMarkReady={markAsReady}
// //                         onViewDetails={setSelectedOrder}
// //                       />
// //                     ))}
// //                   </AnimatePresence>
// //                 </div>
// //               </div>
// //             )}

// //             {preparingOrders.length === 0 && pendingOrders.length === 0 && (
// //               <div className="text-center py-12 bg-white rounded-xl">
// //                 <KitchenIcon className="text-gray-300 text-6xl mx-auto mb-4" />
// //                 <p className="text-gray-500">
// //                   No active orders. Kitchen is idle.
// //                 </p>
// //               </div>
// //             )}
// //           </>
// //         )}

// //         {(activeTab === "ready" ||
// //           activeTab === "completed" ||
// //           activeTab === "cancelled" ||
// //           activeTab === "all") && (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
// //             {filteredOrders.map((order) => (
// //               <KitchenOrderCard
// //                 key={order._id}
// //                 order={order}
// //                 onStartPreparation={startPreparation}
// //                 onMarkReady={markAsReady}
// //                 onViewDetails={setSelectedOrder}
// //               />
// //             ))}
// //             {filteredOrders.length === 0 && (
// //               <div className="col-span-full text-center py-12 bg-white rounded-xl">
// //                 <OrdersIcon className="text-gray-300 text-6xl mx-auto mb-4" />
// //                 <p className="text-gray-500">No orders found.</p>
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       {/* Order Details Modal */}
// //       {selectedOrder && (
// //         <OrderDetailsModal
// //           order={selectedOrder}
// //           onClose={() => setSelectedOrder(null)}
// //           onStartPreparation={startPreparation}
// //           onMarkReady={markAsReady}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */

// // ChefDashboard.jsx
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import {
//   Kitchen as KitchenIcon,
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
//   Person as PersonIcon,
//   TableRestaurant as TableIcon,
//   HealthAndSafety as HealthIcon,
//   Close as CloseIcon,
//   PlayArrow as StartIcon,
//   Fastfood as FoodIcon,
//   NoteAlt as NoteIcon,
//   Settings as SettingsIcon,
//   WifiOff as WifiOffIcon,
//   Wifi as WifiIcon,
//   ListAlt as ListAltIcon,
//   Egg as EggIcon,
//   Grass as GrassIcon,
//   LocalDrink as DrinkIcon,
//   Science as ScienceIcon,
// } from "@mui/icons-material";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../App";

// // ========== API CONFIGURATION ==========
// const API_BASE_URL = "https://nutriscan-foodanddrinksupply.onrender.com";

// // Create axios instance with default config
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 15000,
// });

// // Add response interceptor for error handling
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.code === "ECONNABORTED") {
//       console.error("Request timeout - server took too long to respond");
//     } else if (error.response) {
//       console.error(`API Error ${error.response.status}:`, error.response.data);
//     } else if (error.request) {
//       console.error("No response received from server");
//     } else {
//       console.error("Request error:", error.message);
//     }
//     return Promise.reject(error);
//   },
// );

// // ========== CACHE FOR MENU ITEMS ==========
// let menuItemsCache = null;

// // Fetch all menu items (foods) from API to get ingredients
// const fetchMenuItems = async () => {
//   if (menuItemsCache) return menuItemsCache;
//   try {
//     const response = await apiClient.get("/foods");
//     let foods = [];
//     if (response.data?.success && response.data.foods) {
//       foods = response.data.foods;
//     } else if (Array.isArray(response.data)) {
//       foods = response.data;
//     }
//     // Create a map for quick lookup by name (case insensitive)
//     const menuMap = new Map();
//     foods.forEach((food) => {
//       menuMap.set(food.name.toLowerCase(), food);
//       // Also store by ID if available
//       if (food._id) menuMap.set(food._id, food);
//     });
//     menuItemsCache = menuMap;
//     return menuMap;
//   } catch (error) {
//     console.error("Error fetching menu items:", error);
//     return new Map();
//   }
// };

// // Enrich order items with full ingredient details from menu
// const enrichOrderItemWithIngredients = async (orderItem, menuMap) => {
//   const itemName = orderItem.name?.toLowerCase();
//   const menuItem = menuMap.get(itemName);

//   if (menuItem) {
//     return {
//       ...orderItem,
//       fullIngredients: menuItem.ingredients || [],
//       nutritionalInfo: menuItem.nutritionalInfo || {},
//       purineLevel: menuItem.purineLevel,
//       containsGluten: menuItem.containsGluten,
//       containsPeanuts: menuItem.containsPeanuts,
//       containsShellfish: menuItem.containsShellfish,
//       containsDairy: menuItem.containsDairy,
//       highSalt: menuItem.highSalt,
//       refluxTriggers: menuItem.refluxTriggers || [],
//       migraineTriggers: menuItem.migraineTriggers || [],
//       image: menuItem.image,
//       description: menuItem.description,
//     };
//   }

//   // Fallback: try to extract ingredients from customizations or use default
//   return {
//     ...orderItem,
//     fullIngredients: [],
//     nutritionalInfo: {},
//     purineLevel: "unknown",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     highSalt: false,
//     refluxTriggers: [],
//     migraineTriggers: [],
//   };
// };

// // Transform API order to local component structure with enriched ingredients
// const transformOrder = async (apiOrder, menuMap) => {
//   // Determine status from multiple possible sources
//   let status = apiOrder.status || "pending";
//   if (apiOrder.bookingDetails?.currentStatus) {
//     status = apiOrder.bookingDetails.currentStatus;
//   }

//   // Get timestamps from status history
//   let startedAt = null;
//   let completedAt = null;
//   if (apiOrder.bookingDetails?.statusHistory) {
//     const preparingEntry = apiOrder.bookingDetails.statusHistory.find(
//       (h) => h.status === "preparing",
//     );
//     if (preparingEntry) startedAt = preparingEntry.timestamp;

//     const completedEntry = apiOrder.bookingDetails.statusHistory.find(
//       (h) => h.status === "ready" || h.status === "completed",
//     );
//     if (completedEntry) completedAt = completedEntry.timestamp;
//   }

//   // Enrich each item with ingredients
//   const enrichedItems = await Promise.all(
//     (apiOrder.items || []).map(async (item) => {
//       const enriched = await enrichOrderItemWithIngredients(item, menuMap);
//       return enriched;
//     })
//   );

//   // Calculate total preparation time
//   const totalPrepTime =
//     enrichedItems.reduce(
//       (sum, item) => sum + (item.preparationTime || 15),
//       0,
//     ) || 20;

//   // Calculate total order amount
//   const totalAmount =
//     enrichedItems.reduce(
//       (sum, item) => sum + (item.finalPrice || item.originalPrice || 0),
//       0,
//     ) || 0;

//   // Collect all customizations and special instructions
//   const allCustomizations = [];
//   const allSpecialInstructions = [];
//   enrichedItems.forEach((item) => {
//     if (item.customizations?.length) {
//       allCustomizations.push(...item.customizations);
//     }
//     if (item.specialInstructions) {
//       allSpecialInstructions.push({
//         itemName: item.name,
//         instruction: item.specialInstructions,
//       });
//     }
//   });

//   return {
//     _id: apiOrder._id,
//     orderId: apiOrder.orderId,
//     requestId: apiOrder.requestId,
//     tableNumber: apiOrder.personDetails?.tableNumber || "Unknown",
//     customerName: apiOrder.personDetails?.name || "Guest",
//     orderType: apiOrder.personDetails?.orderType || "dine-in",
//     status: status,
//     items: enrichedItems,
//     notes: apiOrder.notes || "",
//     specialInstructions: apiOrder.bookingDetails?.specialInstructions || "",
//     estimatedPickupTime: apiOrder.bookingDetails?.estimatedPickupTime,
//     createdAt: apiOrder.createdAt,
//     updatedAt: apiOrder.updatedAt,
//     startedAt: startedAt,
//     completedAt: completedAt,
//     estimatedTime: totalPrepTime,
//     totalAmount: totalAmount,
//     statusHistory: apiOrder.bookingDetails?.statusHistory || [],
//     allCustomizations: allCustomizations,
//     allSpecialInstructions: allSpecialInstructions,
//     autoProgress: apiOrder.autoProgress || false,
//   };
// };

// // Fetch orders from API with enriched ingredients
// const fetchOrdersFromAPI = async (retryCount = 0, maxRetries = 3) => {
//   try {
//     // First fetch menu items to get ingredients
//     const menuMap = await fetchMenuItems();
//     const response = await apiClient.get("/orders");

//     const result = response.data;

//     let ordersArray = [];
//     if (result.success && Array.isArray(result.data)) {
//       ordersArray = result.data;
//     } else if (Array.isArray(result)) {
//       ordersArray = result;
//     } else if (result.orders && Array.isArray(result.orders)) {
//       ordersArray = result.orders;
//     }

//     // Transform each order with enriched ingredients
//     const transformedOrders = await Promise.all(
//       ordersArray.map((order) => transformOrder(order, menuMap))
//     );

//     return transformedOrders;
//   } catch (error) {
//     console.error(`Fetch attempt ${retryCount + 1} failed:`, error.message);

//     // Retry logic for network errors
//     if (
//       retryCount < maxRetries &&
//       (error.code === "ECONNABORTED" || !error.response)
//     ) {
//       const delay = 2000 * (retryCount + 1);
//       console.log(`Retrying in ${delay}ms...`);
//       await new Promise((resolve) => setTimeout(resolve, delay));
//       return fetchOrdersFromAPI(retryCount + 1, maxRetries);
//     }

//     throw error;
//   }
// };

// // Update order status via API
// const updateOrderStatusAPI = async (orderId, newStatus) => {
//   try {
//     const response = await apiClient.patch(`/orders/${orderId}/status`, {
//       status: newStatus,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     throw error;
//   }
// };

// // ========== INGREDIENT BADGE COMPONENT ==========
// const IngredientBadge = ({ ingredient }) => (
//   <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs border border-amber-200">
//     <GrassIcon fontSize="inherit" className="text-amber-500" />
//     {ingredient}
//   </span>
// );

// // ========== KITCHEN ORDER CARD COMPONENT with Ingredients ==========
// const KitchenOrderCard = ({
//   order,
//   onStartPreparation,
//   onMarkReady,
//   onUpdateStatus,
//   onViewDetails,
// }) => {
//   const [timeElapsed, setTimeElapsed] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [showIngredients, setShowIngredients] = useState(false);

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
//     const estimatedTime = order.estimatedTime || 20;
//     if (elapsed > estimatedTime) return "border-red-500 bg-red-50";
//     if (elapsed > estimatedTime * 0.7) return "border-yellow-500 bg-yellow-50";
//     return "border-green-500 bg-green-50";
//   };

//   const getStatusBadge = () => {
//     switch (order.status) {
//       case "pending":
//         return (
//           <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <TimeIcon className="text-yellow-600 text-sm" /> Pending
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
//       case "completed":
//         return (
//           <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <CheckCircleIcon className="text-gray-600 text-sm" /> Completed
//           </span>
//         );
//       case "cancelled":
//         return (
//           <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <CancelIcon className="text-red-600 text-sm" /> Cancelled
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

//   const getAllIngredients = () => {
//     const allIngredients = [];
//     order.items?.forEach((item) => {
//       if (item.fullIngredients && item.fullIngredients.length > 0) {
//         allIngredients.push(...item.fullIngredients);
//       }
//     });
//     return [...new Set(allIngredients)]; // Remove duplicates
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
//                 <PersonIcon fontSize="small" /> {order.customerName}
//               </span>
//               <span className="flex items-center gap-1 text-xs text-gray-400">
//                 {order.orderType}
//               </span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="flex items-center gap-1 text-orange-600 font-bold">
//               <TimerIcon fontSize="small" />
//               <span>{order.estimatedTime} min est.</span>
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
//         <div className="space-y-3 max-h-60 overflow-y-auto">
//           {order.items?.map((item, idx) => (
//             <div
//               key={idx}
//               className="text-sm border-b border-gray-100 pb-3 last:border-0"
//             >
//               <div className="flex justify-between flex-wrap gap-2">
//                 <span className="font-medium">
//                   {item.quantity}x {item.name}
//                 </span>
//                 <span className="text-gray-500">
//                   {item.preparationTime || 15} min
//                 </span>
//               </div>

//               {/* INGREDIENTS SECTION - Main feature for chef */}
//               {item.fullIngredients && item.fullIngredients.length > 0 && (
//                 <div className="mt-2">
//                   <button
//                     onClick={() => setShowIngredients(!showIngredients)}
//                     className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium"
//                   >
//                     <ListAltIcon fontSize="inherit" />
//                     {showIngredients ? "Hide" : "Show"} Ingredients ({item.fullIngredients.length})
//                   </button>
//                   {showIngredients && (
//                     <div className="mt-2 p-2 bg-emerald-50 rounded-lg">
//                       <p className="text-xs font-medium text-emerald-700 mb-1.5 flex items-center gap-1">
//                         <ScienceIcon fontSize="small" /> Required Ingredients:
//                       </p>
//                       <div className="flex flex-wrap gap-1.5">
//                         {item.fullIngredients.map((ing, i) => (
//                           <IngredientBadge key={i} ingredient={ing} />
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Allergen warnings */}
//               {(item.containsGluten || item.containsPeanuts || item.containsShellfish || item.containsDairy) && (
//                 <div className="mt-1 flex flex-wrap gap-1">
//                   {item.containsGluten && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">⚠️ Gluten</span>
//                   )}
//                   {item.containsPeanuts && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">⚠️ Peanuts</span>
//                   )}
//                   {item.containsShellfish && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">⚠️ Shellfish</span>
//                   )}
//                   {item.containsDairy && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">⚠️ Dairy</span>
//                   )}
//                 </div>
//               )}

//               {/* Customizations */}
//               {item.customizations?.length > 0 && (
//                 <div className="text-xs text-orange-600 mt-1">
//                   ✨ Custom: {item.customizations.join(", ")}
//                 </div>
//               )}

//               {/* Special Instructions */}
//               {item.specialInstructions && (
//                 <div className="text-xs text-blue-600 mt-1">
//                   📝 {item.specialInstructions}
//                 </div>
//               )}

//               <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>RWF {(item.finalPrice || item.originalPrice || 0).toLocaleString()}</span>
//                 {item.purineLevel && item.purineLevel !== "unknown" && (
//                   <span className={`px-1.5 py-0.5 rounded-full text-xs ${
//                     item.purineLevel === 'low' ? 'bg-green-100 text-green-700' :
//                     item.purineLevel === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
//                     'bg-red-100 text-red-700'
//                   }`}>
//                     {item.purineLevel} purine
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Summary of all unique ingredients across order */}
//         {getAllIngredients().length > 0 && (
//           <div className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
//             <p className="text-xs font-medium text-amber-700 mb-1 flex items-center gap-1">
//               <ListAltIcon fontSize="small" /> All Ingredients Needed:
//             </p>
//             <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
//               {getAllIngredients().slice(0, 8).map((ing, i) => (
//                 <span key={i} className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
//                   {ing}
//                 </span>
//               ))}
//               {getAllIngredients().length > 8 && (
//                 <span className="text-xs text-gray-400">+{getAllIngredients().length - 8} more</span>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Global order notes */}
//         {order.notes && (
//           <div className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
//             <div className="text-xs text-gray-600 flex items-start gap-1">
//               <NoteIcon fontSize="small" className="text-gray-400" />
//               <span className="font-medium">Notes:</span> {order.notes}
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="p-4 border-t bg-gray-50 flex gap-2 flex-wrap">
//         {/* Status update dropdown */}
//         <select
//           value={order.status}
//           onChange={(e) => onUpdateStatus(order, e.target.value)}
//           className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-purple-500"
//         >
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="preparing">Preparing</option>
//           <option value="ready">Ready</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>

//         {(order.status === "pending" || order.status === "confirmed") && (
//           <button
//             onClick={() => onStartPreparation(order)}
//             className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition flex items-center justify-center gap-2"
//           >
//             <StartIcon fontSize="small" /> Start Cooking
//           </button>
//         )}
//         {order.status === "preparing" && (
//           <button
//             onClick={() => onMarkReady(order)}
//             className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition flex items-center justify-center gap-2"
//           >
//             <DoneAllIcon fontSize="small" /> Mark Ready
//           </button>
//         )}
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

// // ========== ORDER DETAILS MODAL with Full Ingredients ==========
// const OrderDetailsModal = ({
//   order,
//   onClose,
//   onStartPreparation,
//   onMarkReady,
//   onUpdateStatus,
// }) => {
//   if (!order) return null;

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "pending": return "bg-yellow-100 text-yellow-800";
//       case "confirmed": return "bg-blue-100 text-blue-800";
//       case "preparing": return "bg-purple-100 text-purple-800";
//       case "ready": return "bg-green-100 text-green-800";
//       case "completed": return "bg-gray-100 text-gray-800";
//       case "cancelled": return "bg-red-100 text-red-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getAllIngredients = () => {
//     const allIngredients = [];
//     order.items?.forEach((item) => {
//       if (item.fullIngredients && item.fullIngredients.length > 0) {
//         allIngredients.push(...item.fullIngredients);
//       }
//     });
//     return [...new Set(allIngredients)];
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//       >
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
//           <div>
//             <h2 className="text-white font-bold text-xl">Order Details</h2>
//             <p className="text-purple-200 text-sm">Kitchen View - Full Ingredients</p>
//           </div>
//           <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
//             <CloseIcon className="text-white" />
//           </button>
//         </div>

//         <div className="p-6">
//           {/* Order Summary */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
//             <div><p className="text-xs text-gray-500">Order ID</p><p className="font-mono font-medium text-sm">{order.orderId?.slice(-12)}</p></div>
//             <div><p className="text-xs text-gray-500">Table</p><p className="font-medium text-lg">Table {order.tableNumber}</p></div>
//             <div><p className="text-xs text-gray-500">Customer</p><p className="font-medium">{order.customerName}</p></div>
//             <div><p className="text-xs text-gray-500">Status</p><span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>{order.status}</span></div>
//             <div><p className="text-xs text-gray-500">Created</p><p className="font-medium text-sm">{new Date(order.createdAt).toLocaleString()}</p></div>
//             <div><p className="text-xs text-gray-500">Est. Prep Time</p><p className="font-medium">{order.estimatedTime} minutes</p></div>
//             <div><p className="text-xs text-gray-500">Total Amount</p><p className="font-medium text-orange-600">RWF {order.totalAmount?.toLocaleString() || 0}</p></div>
//           </div>

//           {/* Items with Full Ingredients */}
//           <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
//             <FoodIcon fontSize="small" /> Items to Prepare
//           </h3>
//           <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
//             {order.items?.map((item, idx) => (
//               <div key={idx} className="border rounded-lg p-4">
//                 <div className="flex justify-between items-start flex-wrap gap-2">
//                   <div>
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <span className="font-bold text-gray-800">{item.quantity}x</span>
//                       <span className="font-medium text-gray-800">{item.name}</span>
//                     </div>
//                     <p className="text-xs text-gray-400 mt-1">Prep: {item.preparationTime || 15} min</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-orange-600">RWF {(item.finalPrice || item.originalPrice).toLocaleString()}</p>
//                   </div>
//                 </div>

//                 {/* FULL INGREDIENTS DISPLAY */}
//                 {item.fullIngredients && item.fullIngredients.length > 0 && (
//                   <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
//                     <p className="text-xs font-bold text-emerald-700 flex items-center gap-1 mb-2">
//                       <ScienceIcon fontSize="small" /> Ingredients for {item.name}:
//                     </p>
//                     <div className="flex flex-wrap gap-1.5">
//                       {item.fullIngredients.map((ing, i) => (
//                         <span key={i} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">{ing}</span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Allergen Information */}
//                 {(item.containsGluten || item.containsPeanuts || item.containsShellfish || item.containsDairy || item.highSalt) && (
//                   <div className="mt-2 p-2 bg-red-50 rounded-lg">
//                     <p className="text-xs font-medium text-red-700 flex items-center gap-1">
//                       <WarningIcon fontSize="small" /> Allergen Info:
//                     </p>
//                     <div className="flex flex-wrap gap-1 mt-1">
//                       {item.containsGluten && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Gluten</span>}
//                       {item.containsPeanuts && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Peanuts</span>}
//                       {item.containsShellfish && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Shellfish</span>}
//                       {item.containsDairy && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Dairy</span>}
//                       {item.highSalt && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">High Salt</span>}
//                     </div>
//                   </div>
//                 )}

//                 {/* Health Triggers */}
//                 {(item.refluxTriggers?.length > 0 || item.migraineTriggers?.length > 0) && (
//                   <div className="mt-2 p-2 bg-orange-50 rounded-lg">
//                     <p className="text-xs font-medium text-orange-700">Health Triggers:</p>
//                     <div className="flex flex-wrap gap-1 mt-0.5">
//                       {item.refluxTriggers?.map((t, i) => <span key={i} className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">Reflux: {t}</span>)}
//                       {item.migraineTriggers?.map((t, i) => <span key={i} className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">Migraine: {t}</span>)}
//                     </div>
//                   </div>
//                 )}

//                 {item.customizations?.length > 0 && (
//                   <div className="mt-2 p-2 bg-orange-50 rounded-lg">
//                     <p className="text-xs font-medium text-orange-700 flex items-center gap-1">
//                       <SettingsIcon fontSize="small" /> Customizations:
//                     </p>
//                     <div className="flex flex-wrap gap-1 mt-1">
//                       {item.customizations.map((c, i) => (
//                         <span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{c}</span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {item.specialInstructions && (
//                   <div className="mt-2 p-2 bg-blue-50 rounded-lg">
//                     <p className="text-xs font-medium text-blue-700 flex items-center gap-1">
//                       <NoteIcon fontSize="small" /> Special Instructions:
//                     </p>
//                     <p className="text-xs text-blue-600 mt-0.5">{item.specialInstructions}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Summary of All Ingredients Needed */}
//           {getAllIngredients().length > 0 && (
//             <div className="mb-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
//               <p className="text-sm font-bold text-amber-800 flex items-center gap-2 mb-2">
//                 <ListAltIcon /> Complete Shopping List for this Order
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {getAllIngredients().map((ing, i) => (
//                   <span key={i} className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">{ing}</span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Order Notes */}
//           {order.notes && (
//             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//               <p className="text-sm font-medium text-gray-700 flex items-center gap-1"><NoteIcon fontSize="small" /> Order Notes</p>
//               <p className="text-sm text-gray-600 mt-1">{order.notes}</p>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex gap-3 pt-4 border-t flex-wrap">
//             <button onClick={onClose} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">Close</button>
//             <select
//               value={order.status}
//               onChange={(e) => onUpdateStatus(order, e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
//             >
//               <option value="pending">Pending</option>
//               <option value="confirmed">Confirmed</option>
//               <option value="preparing">Preparing</option>
//               <option value="ready">Ready</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
//             {(order.status === "pending" || order.status === "confirmed") && (
//               <button onClick={() => { onStartPreparation(order); onClose(); }} className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition">Start Cooking</button>
//             )}
//             {order.status === "preparing" && (
//               <button onClick={() => { onMarkReady(order); onClose(); }} className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition">Mark as Ready</button>
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
//     <motion.div whileHover={{ scale: 1.02 }} className={`bg-white rounded-xl shadow-lg p-4 sm:p-5 border-l-4 ${color}`}>
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-gray-500 text-xs sm:text-sm font-medium">{title}</p>
//           <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">{value}</p>
//           {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
//         </div>
//         <div className={`p-2 sm:p-3 rounded-full bg-${color.split("-")[1]}-100 bg-opacity-20`}>{icon}</div>
//       </div>
//     </motion.div>
//   );
// };

// // ========== CONNECTION STATUS BANNER ==========
// const ConnectionStatusBanner = ({ isConnected, onRetry }) => {
//   if (isConnected) return null;
//   return (
//     <div className="mx-4 sm:mx-6 mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex justify-between items-center">
//       <div className="flex items-center gap-3"><WifiOffIcon className="text-red-500" /><div><p className="text-red-700 font-medium">Connection Error</p><p className="text-red-600 text-sm">Cannot connect to the server.</p></div></div>
//       <button onClick={onRetry} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm">Retry</button>
//     </div>
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
//   const [isConnected, setIsConnected] = useState(true);
//   const [stats, setStats] = useState({
//     pendingOrders: 0, confirmedOrders: 0, preparingOrders: 0, readyOrders: 0,
//     completedOrders: 0, cancelledOrders: 0, completedToday: 0, avgPreparationTime: 0, totalRevenue: 0,
//   });
//   const [soundEnabled, setSoundEnabled] = useState(true);
//   const [lastRefresh, setLastRefresh] = useState(new Date());
//   const [refreshing, setRefreshing] = useState(false);
//   const previousOrdersRef = useRef([]);

//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post("https://nutriscan-foodanddrinksupply.onrender.com/auth/logout", {}, { headers: { Authorization: `Bearer ${token}` } });
//     } catch (error) {
//       console.error("Logout error:", error?.response?.data || error.message);
//     } finally {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       navigate("/login");
//     }
//   };

//   const playNotificationSound = useCallback(() => {
//     if (!soundEnabled) return;
//     try {
//       const audio = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");
//       audio.volume = 0.3;
//       audio.play().catch((e) => console.log("Audio play failed:", e));
//     } catch (error) { console.log("Sound not supported"); }
//   }, [soundEnabled]);

//   const calculateStats = useCallback((ordersList) => {
//     const pending = ordersList.filter((o) => o.status === "pending").length;
//     const confirmed = ordersList.filter((o) => o.status === "confirmed").length;
//     const preparing = ordersList.filter((o) => o.status === "preparing").length;
//     const ready = ordersList.filter((o) => o.status === "ready").length;
//     const completed = ordersList.filter((o) => o.status === "completed").length;
//     const cancelled = ordersList.filter((o) => o.status === "cancelled").length;
//     const completedToday = ordersList.filter((o) => o.status === "completed" && new Date(o.createdAt).toDateString() === new Date().toDateString()).length;
//     const completedOrdersWithTimes = ordersList.filter((o) => o.status === "completed" && o.startedAt && o.completedAt);
//     const avgTime = completedOrdersWithTimes.length > 0 ? Math.round(completedOrdersWithTimes.reduce((sum, o) => {
//       const start = new Date(o.startedAt);
//       const end = new Date(o.completedAt);
//       return sum + (end - start) / 60000;
//     }, 0) / completedOrdersWithTimes.length) : 0;
//     const totalRevenue = ordersList.filter((o) => o.status === "ready" || o.status === "completed").reduce((sum, o) => sum + (o.totalAmount || 0), 0);
//     setStats({ pendingOrders: pending, confirmedOrders: confirmed, preparingOrders: preparing, readyOrders: ready, completedOrders: completed, cancelledOrders: cancelled, completedToday, avgPreparationTime: avgTime, totalRevenue });
//   }, []);

//   const loadOrders = useCallback(async (showLoading = true) => {
//     if (showLoading) setRefreshing(true);
//     try {
//       const apiOrders = await fetchOrdersFromAPI();
//       setOrders(apiOrders);
//       setLastRefresh(new Date());
//       setIsConnected(true);
//       setError(null);
//       calculateStats(apiOrders);
//       const previousOrders = previousOrdersRef.current;
//       const newOrders = apiOrders.filter((o) => (o.status === "pending" || o.status === "confirmed") && !previousOrders.some((prev) => prev._id === o._id));
//       if (newOrders.length > 0) { playNotificationSound(); toast.info(`${newOrders.length} new order${newOrders.length > 1 ? "s" : ""} received!`); }
//       previousOrdersRef.current = apiOrders;
//     } catch (error) {
//       console.error("Error loading orders:", error);
//       setIsConnected(false);
//       setError(error.message);
//       toast.error("Failed to load orders from server");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [calculateStats, playNotificationSound]);

//   const updateOrderStatus = async (order, newStatus) => {
//     try {
//       await updateOrderStatusAPI(order._id, newStatus);
//       toast.success(`Order #${order.orderId?.slice(-8)} status updated to ${newStatus}`);
//       await loadOrders(false);
//     } catch (error) {
//       toast.error("Failed to update order status");
//     }
//   };

//   const startPreparation = async (order) => {
//     await updateOrderStatus(order, "preparing");
//   };

//   const markAsReady = async (order) => {
//     await updateOrderStatus(order, "ready");
//     toast.success(`Order #${order.orderId?.slice(-8)} is ready for serving!`);
//   };

//   useEffect(() => { loadOrders(); const interval = setInterval(() => loadOrders(false), 30000); return () => clearInterval(interval); }, [loadOrders]);

//   const getFilteredOrders = () => {
//     let filtered = orders;
//     if (activeTab === "active") filtered = orders.filter((o) => ["pending", "confirmed", "preparing"].includes(o.status));
//     else if (activeTab === "ready") filtered = orders.filter((o) => o.status === "ready");
//     else if (activeTab === "completed") filtered = orders.filter((o) => o.status === "completed");
//     else if (activeTab === "cancelled") filtered = orders.filter((o) => o.status === "cancelled");
//     else if (activeTab === "all") filtered = orders;
//     if (searchTerm) { const term = searchTerm.toLowerCase(); filtered = filtered.filter((o) => o.orderId?.toLowerCase().includes(term) || o.tableNumber?.toString().includes(term) || o.customerName?.toLowerCase().includes(term)); }
//     return filtered.sort((a, b) => { if (a.status === "preparing" && b.status !== "preparing") return -1; if (a.status !== "preparing" && b.status === "preparing") return 1; return new Date(b.createdAt) - new Date(a.createdAt); });
//   };

//   const filteredOrders = getFilteredOrders();
//   const pendingOrders = filteredOrders.filter((o) => o.status === "pending" || o.status === "confirmed");
//   const preparingOrders = filteredOrders.filter((o) => o.status === "preparing");
//   const tabs = [{ id: "active", label: "Active Orders", icon: <FireIcon />, count: stats.pendingOrders + stats.confirmedOrders + stats.preparingOrders }, { id: "ready", label: "Ready", icon: <DoneAllIcon />, count: stats.readyOrders }, { id: "completed", label: "Completed", icon: <CheckCircleIcon />, count: stats.completedOrders }, { id: "cancelled", label: "Cancelled", icon: <CancelIcon />, count: stats.cancelledOrders }, { id: "all", label: "All Orders", icon: <OrdersIcon /> }];

//   if (loading && orders.length === 0) {
//     return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div><p className="text-gray-600">Loading kitchen orders...</p></div></div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover />
//       <header className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg sticky top-0 z-10">
//         <div className="px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-4">
//           <div className="flex items-center gap-3"><div className="bg-white/20 p-2 rounded-lg"><KitchenIcon className="text-white" /></div><div><h1 className="text-lg sm:text-xl font-bold">Kitchen Dashboard</h1><p className="text-purple-200 text-xs sm:text-sm">Real-time order management with ingredients</p></div></div>
//           <div className="flex items-center gap-2 sm:gap-3">
//             <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg text-xs">{isConnected ? <WifiIcon fontSize="small" /> : <WifiOffIcon fontSize="small" />}<span>{isConnected ? "Connected" : "Offline"}</span></div>
//             <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-full transition ${soundEnabled ? "bg-white/20" : "bg-white/10"}`}><AlertIcon className="text-white" /></button>
//             <button onClick={() => loadOrders()} disabled={refreshing} className={`p-2 rounded-full transition ${refreshing ? "animate-spin" : "hover:bg-white/20"}`}><RefreshIcon className="text-white" /></button>
//             <div className="bg-white/20 px-2 sm:px-3 py-2 rounded-lg text-xs">Last: {lastRefresh.toLocaleTimeString()}</div>
//             <button onClick={handleLogout} className="bg-white/20 px-3 py-2 rounded-lg text-sm hover:bg-white/30">Logout</button>
//           </div>
//         </div>
//       </header>

//       <ConnectionStatusBanner isConnected={isConnected} onRetry={() => loadOrders()} />

//       <div className="p-4 sm:p-6 pb-2">
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
//           <StatCard title="Pending" value={stats.pendingOrders} icon={<TimeIcon className="text-yellow-600" />} color="border-yellow-500" subtitle="New orders" />
//           <StatCard title="Confirmed" value={stats.confirmedOrders} icon={<CheckCircleIcon className="text-blue-600" />} color="border-blue-500" subtitle="Awaiting start" />
//           <StatCard title="In Progress" value={stats.preparingOrders} icon={<FireIcon className="text-purple-600" />} color="border-purple-500" subtitle="Cooking" />
//           <StatCard title="Ready" value={stats.readyOrders} icon={<DoneAllIcon className="text-green-600" />} color="border-green-500" subtitle="Awaiting pickup" />
//           <StatCard title="Completed" value={stats.completedOrders} icon={<CheckCircleIcon className="text-gray-600" />} color="border-gray-500" />
//           <StatCard title="Completed Today" value={stats.completedToday} icon={<TrophyIcon className="text-teal-600" />} color="border-teal-500" />
//           <StatCard title="Avg Prep Time" value={`${stats.avgPreparationTime} min`} icon={<SpeedIcon className="text-indigo-600" />} color="border-indigo-500" />
//         </div>
//       </div>

//       <div className="px-4 sm:px-6"><div className="flex gap-2 overflow-x-auto pb-2">{tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-purple-600 text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100"}`}>{tab.icon}<span className="text-sm">{tab.label}</span>{tab.count !== undefined && tab.count > 0 && <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? "bg-white/20" : "bg-purple-100 text-purple-600"}`}>{tab.count}</span>}</button>))}</div></div>

//       <div className="px-4 sm:px-6 pt-4"><div className="relative max-w-md"><SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" /><input type="text" placeholder="Search by Order ID, Table, or Customer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white" /></div></div>

//       <div className="p-4 sm:p-6">
//         {activeTab === "active" && (
//           <>
//             {preparingOrders.length > 0 && (<div className="mb-6"><h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2"><FireIcon className="text-purple-600" /> In Progress ({preparingOrders.length})</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"><AnimatePresence>{preparingOrders.map((order) => (<KitchenOrderCard key={order._id} order={order} onStartPreparation={startPreparation} onMarkReady={markAsReady} onUpdateStatus={updateOrderStatus} onViewDetails={setSelectedOrder} />))}</AnimatePresence></div></div>)}
//             {pendingOrders.length > 0 && (<div><h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2"><TimeIcon className="text-yellow-600" /> Pending ({pendingOrders.length})</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"><AnimatePresence>{pendingOrders.map((order) => (<KitchenOrderCard key={order._id} order={order} onStartPreparation={startPreparation} onMarkReady={markAsReady} onUpdateStatus={updateOrderStatus} onViewDetails={setSelectedOrder} />))}</AnimatePresence></div></div>)}
//             {preparingOrders.length === 0 && pendingOrders.length === 0 && (<div className="text-center py-12 bg-white rounded-xl"><KitchenIcon className="text-gray-300 text-6xl mx-auto mb-4" /><p className="text-gray-500">No active orders. Kitchen is idle.</p></div>)}
//           </>
//         )}
//         {(activeTab === "ready" || activeTab === "completed" || activeTab === "cancelled" || activeTab === "all") && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">{filteredOrders.map((order) => (<KitchenOrderCard key={order._id} order={order} onStartPreparation={startPreparation} onMarkReady={markAsReady} onUpdateStatus={updateOrderStatus} onViewDetails={setSelectedOrder} />))}{filteredOrders.length === 0 && (<div className="col-span-full text-center py-12 bg-white rounded-xl"><OrdersIcon className="text-gray-300 text-6xl mx-auto mb-4" /><p className="text-gray-500">No orders found.</p></div>)}</div>)}
//       </div>

//       {selectedOrder && (<OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onStartPreparation={startPreparation} onMarkReady={markAsReady} onUpdateStatus={updateOrderStatus} />)}
//     </div>
//   );
// };

// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */

// // ChefDashboard.jsx
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import {
//   Kitchen as KitchenIcon,
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
//   Person as PersonIcon,
//   TableRestaurant as TableIcon,
//   HealthAndSafety as HealthIcon,
//   Close as CloseIcon,
//   PlayArrow as StartIcon,
//   Fastfood as FoodIcon,
//   NoteAlt as NoteIcon,
//   Settings as SettingsIcon,
//   WifiOff as WifiOffIcon,
//   Wifi as WifiIcon,
//   ListAlt as ListAltIcon,
//   Egg as EggIcon,
//   Grass as GrassIcon,
//   LocalDrink as DrinkIcon,
//   Science as ScienceIcon,
// } from "@mui/icons-material";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../App";

// // ========== API CONFIGURATION ==========
// const API_BASE_URL = "https://nutriscan-foodanddrinksupply.onrender.com";

// // Create axios instance with default config
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 15000,
// });

// // Add response interceptor for error handling
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.code === "ECONNABORTED") {
//       console.error("Request timeout - server took too long to respond");
//     } else if (error.response) {
//       console.error(`API Error ${error.response.status}:`, error.response.data);
//     } else if (error.request) {
//       console.error("No response received from server");
//     } else {
//       console.error("Request error:", error.message);
//     }
//     return Promise.reject(error);
//   },
// );

// // ========== CACHE FOR MENU ITEMS ==========
// let menuItemsCache = null;

// // Fetch all menu items (foods) from API to get ingredients
// const fetchMenuItems = async () => {
//   if (menuItemsCache) return menuItemsCache;
//   try {
//     const response = await apiClient.get("/foods");
//     let foods = [];
//     if (response.data?.success && response.data.foods) {
//       foods = response.data.foods;
//     } else if (Array.isArray(response.data)) {
//       foods = response.data;
//     }
//     // Create a map for quick lookup by name (case insensitive)
//     const menuMap = new Map();
//     foods.forEach((food) => {
//       menuMap.set(food.name.toLowerCase(), food);
//       // Also store by ID if available
//       if (food._id) menuMap.set(food._id, food);
//     });
//     menuItemsCache = menuMap;
//     return menuMap;
//   } catch (error) {
//     console.error("Error fetching menu items:", error);
//     return new Map();
//   }
// };

// // Enrich order items with full ingredient details from menu
// const enrichOrderItemWithIngredients = async (orderItem, menuMap) => {
//   const itemName = orderItem.name?.toLowerCase();
//   const menuItem = menuMap.get(itemName);

//   if (menuItem) {
//     return {
//       ...orderItem,
//       fullIngredients: menuItem.ingredients || [],
//       nutritionalInfo: menuItem.nutritionalInfo || {},
//       purineLevel: menuItem.purineLevel,
//       containsGluten: menuItem.containsGluten,
//       containsPeanuts: menuItem.containsPeanuts,
//       containsShellfish: menuItem.containsShellfish,
//       containsDairy: menuItem.containsDairy,
//       highSalt: menuItem.highSalt,
//       refluxTriggers: menuItem.refluxTriggers || [],
//       migraineTriggers: menuItem.migraineTriggers || [],
//       image: menuItem.image,
//       description: menuItem.description,
//     };
//   }

//   // Fallback: try to extract ingredients from customizations or use default
//   return {
//     ...orderItem,
//     fullIngredients: [],
//     nutritionalInfo: {},
//     purineLevel: "unknown",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     highSalt: false,
//     refluxTriggers: [],
//     migraineTriggers: [],
//   };
// };

// // Transform API order to local component structure with enriched ingredients
// const transformOrder = async (apiOrder, menuMap) => {
//   // Determine status from multiple possible sources
//   let status = apiOrder.status || "pending";
//   if (apiOrder.bookingDetails?.currentStatus) {
//     status = apiOrder.bookingDetails.currentStatus;
//   }

//   // Get timestamps from status history
//   let startedAt = null;
//   let completedAt = null;
//   if (apiOrder.bookingDetails?.statusHistory) {
//     const preparingEntry = apiOrder.bookingDetails.statusHistory.find(
//       (h) => h.status === "preparing",
//     );
//     if (preparingEntry) startedAt = preparingEntry.timestamp;

//     const completedEntry = apiOrder.bookingDetails.statusHistory.find(
//       (h) => h.status === "ready" || h.status === "completed",
//     );
//     if (completedEntry) completedAt = completedEntry.timestamp;
//   }

//   // Enrich each item with ingredients
//   const enrichedItems = await Promise.all(
//     (apiOrder.items || []).map(async (item) => {
//       const enriched = await enrichOrderItemWithIngredients(item, menuMap);
//       return enriched;
//     })
//   );

//   // Calculate total preparation time
//   const totalPrepTime =
//     enrichedItems.reduce(
//       (sum, item) => sum + (item.preparationTime || 15),
//       0,
//     ) || 20;

//   // Calculate total order amount
//   const totalAmount =
//     enrichedItems.reduce(
//       (sum, item) => sum + (item.finalPrice || item.originalPrice || 0),
//       0,
//     ) || 0;

//   // Collect all customizations and special instructions
//   const allCustomizations = [];
//   const allSpecialInstructions = [];
//   enrichedItems.forEach((item) => {
//     if (item.customizations?.length) {
//       allCustomizations.push(...item.customizations);
//     }
//     if (item.specialInstructions) {
//       allSpecialInstructions.push({
//         itemName: item.name,
//         instruction: item.specialInstructions,
//       });
//     }
//   });

//   return {
//     _id: apiOrder._id,
//     orderId: apiOrder.orderId,
//     requestId: apiOrder.requestId,
//     tableNumber: apiOrder.personDetails?.tableNumber || "Unknown",
//     customerName: apiOrder.personDetails?.name || "Guest",
//     orderType: apiOrder.personDetails?.orderType || "dine-in",
//     status: status,
//     items: enrichedItems,
//     notes: apiOrder.notes || "",
//     specialInstructions: apiOrder.bookingDetails?.specialInstructions || "",
//     estimatedPickupTime: apiOrder.bookingDetails?.estimatedPickupTime,
//     createdAt: apiOrder.createdAt,
//     updatedAt: apiOrder.updatedAt,
//     startedAt: startedAt,
//     completedAt: completedAt,
//     estimatedTime: totalPrepTime,
//     totalAmount: totalAmount,
//     statusHistory: apiOrder.bookingDetails?.statusHistory || [],
//     allCustomizations: allCustomizations,
//     allSpecialInstructions: allSpecialInstructions,
//     autoProgress: apiOrder.autoProgress || false,
//   };
// };

// // Fetch orders from API with enriched ingredients
// const fetchOrdersFromAPI = async (retryCount = 0, maxRetries = 3) => {
//   try {
//     // First fetch menu items to get ingredients
//     const menuMap = await fetchMenuItems();
//     const response = await apiClient.get("/orders");

//     const result = response.data;

//     let ordersArray = [];
//     if (result.success && Array.isArray(result.data)) {
//       ordersArray = result.data;
//     } else if (Array.isArray(result)) {
//       ordersArray = result;
//     } else if (result.orders && Array.isArray(result.orders)) {
//       ordersArray = result.orders;
//     }

//     // Transform each order with enriched ingredients
//     const transformedOrders = await Promise.all(
//       ordersArray.map((order) => transformOrder(order, menuMap))
//     );

//     return transformedOrders;
//   } catch (error) {
//     console.error(`Fetch attempt ${retryCount + 1} failed:`, error.message);

//     // Retry logic for network errors
//     if (
//       retryCount < maxRetries &&
//       (error.code === "ECONNABORTED" || !error.response)
//     ) {
//       const delay = 2000 * (retryCount + 1);
//       console.log(`Retrying in ${delay}ms...`);
//       await new Promise((resolve) => setTimeout(resolve, delay));
//       return fetchOrdersFromAPI(retryCount + 1, maxRetries);
//     }

//     throw error;
//   }
// };

// // Update order status via API
// const updateOrderStatusAPI = async (orderId, newStatus) => {
//   try {
//     const response = await apiClient.patch(`/orders/${orderId}/status`, {
//       status: newStatus,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     throw error;
//   }
// };

// // ========== INGREDIENT BADGE COMPONENT ==========
// const IngredientBadge = ({ ingredient }) => (
//   <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs border border-amber-200">
//     <GrassIcon fontSize="inherit" className="text-amber-500" />
//     {ingredient}
//   </span>
// );

// // ========== KITCHEN ORDER CARD COMPONENT with Ingredients ==========
// const KitchenOrderCard = ({
//   order,
//   onStartPreparation,
//   onMarkReady,
//   onUpdateStatus,
//   onViewDetails,
// }) => {
//   const [timeElapsed, setTimeElapsed] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [showIngredients, setShowIngredients] = useState(false);

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
//     const estimatedTime = order.estimatedTime || 20;
//     if (elapsed > estimatedTime) return "border-red-500 bg-red-50";
//     if (elapsed > estimatedTime * 0.7) return "border-yellow-500 bg-yellow-50";
//     return "border-green-500 bg-green-50";
//   };

//   const getStatusBadge = () => {
//     switch (order.status) {
//       case "pending":
//         return (
//           <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <TimeIcon className="text-yellow-600 text-sm" /> Pending
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
//       case "completed":
//         return (
//           <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <CheckCircleIcon className="text-gray-600 text-sm" /> Completed
//           </span>
//         );
//       case "cancelled":
//         return (
//           <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <CancelIcon className="text-red-600 text-sm" /> Cancelled
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

//   const getAllIngredients = () => {
//     const allIngredients = [];
//     order.items?.forEach((item) => {
//       if (item.fullIngredients && item.fullIngredients.length > 0) {
//         allIngredients.push(...item.fullIngredients);
//       }
//     });
//     return [...new Set(allIngredients)]; // Remove duplicates
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
//                 <PersonIcon fontSize="small" /> {order.customerName}
//               </span>
//               <span className="flex items-center gap-1 text-xs text-gray-400">
//                 {order.orderType}
//               </span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="flex items-center gap-1 text-orange-600 font-bold">
//               <TimerIcon fontSize="small" />
//               <span>{order.estimatedTime} min est.</span>
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
//         <div className="space-y-3 max-h-60 overflow-y-auto">
//           {order.items?.map((item, idx) => (
//             <div
//               key={idx}
//               className="text-sm border-b border-gray-100 pb-3 last:border-0"
//             >
//               <div className="flex justify-between flex-wrap gap-2">
//                 <span className="font-medium">
//                   {item.quantity}x {item.name}
//                 </span>
//                 <span className="text-gray-500">
//                   {item.preparationTime || 15} min
//                 </span>
//               </div>

//               {/* INGREDIENTS SECTION - Main feature for chef */}
//               {item.fullIngredients && item.fullIngredients.length > 0 && (
//                 <div className="mt-2">
//                   <button
//                     onClick={() => setShowIngredients(!showIngredients)}
//                     className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium"
//                   >
//                     <ListAltIcon fontSize="inherit" />
//                     {showIngredients ? "Hide" : "Show"} Ingredients ({item.fullIngredients.length})
//                   </button>
//                   {showIngredients && (
//                     <div className="mt-2 p-2 bg-emerald-50 rounded-lg">
//                       <p className="text-xs font-medium text-emerald-700 mb-1.5 flex items-center gap-1">
//                         <ScienceIcon fontSize="small" /> Required Ingredients:
//                       </p>
//                       <div className="flex flex-wrap gap-1.5">
//                         {item.fullIngredients.map((ing, i) => (
//                           <IngredientBadge key={i} ingredient={ing} />
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Allergen warnings */}
//               {(item.containsGluten || item.containsPeanuts || item.containsShellfish || item.containsDairy) && (
//                 <div className="mt-1 flex flex-wrap gap-1">
//                   {item.containsGluten && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">⚠️ Gluten</span>
//                   )}
//                   {item.containsPeanuts && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">⚠️ Peanuts</span>
//                   )}
//                   {item.containsShellfish && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">⚠️ Shellfish</span>
//                   )}
//                   {item.containsDairy && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">⚠️ Dairy</span>
//                   )}
//                 </div>
//               )}

//               {/* Customizations */}
//               {item.customizations?.length > 0 && (
//                 <div className="text-xs text-orange-600 mt-1">
//                   ✨ Custom: {item.customizations.join(", ")}
//                 </div>
//               )}

//               {/* Special Instructions */}
//               {item.specialInstructions && (
//                 <div className="text-xs text-blue-600 mt-1">
//                   📝 {item.specialInstructions}
//                 </div>
//               )}

//               <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>RWF {(item.finalPrice || item.originalPrice || 0).toLocaleString()}</span>
//                 {item.purineLevel && item.purineLevel !== "unknown" && (
//                   <span className={`px-1.5 py-0.5 rounded-full text-xs ${item.purineLevel === 'low' ? 'bg-green-100 text-green-700' :
//                       item.purineLevel === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
//                         'bg-red-100 text-red-700'
//                     }`}>
//                     {item.purineLevel} purine
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Summary of all unique ingredients across order */}
//         {getAllIngredients().length > 0 && (
//           <div className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
//             <p className="text-xs font-medium text-amber-700 mb-1 flex items-center gap-1">
//               <ListAltIcon fontSize="small" /> All Ingredients Needed:
//             </p>
//             <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
//               {getAllIngredients().slice(0, 8).map((ing, i) => (
//                 <span key={i} className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
//                   {ing}
//                 </span>
//               ))}
//               {getAllIngredients().length > 8 && (
//                 <span className="text-xs text-gray-400">+{getAllIngredients().length - 8} more</span>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Global order notes */}
//         {order.notes && (
//           <div className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
//             <div className="text-xs text-gray-600 flex items-start gap-1">
//               <NoteIcon fontSize="small" className="text-gray-400" />
//               <span className="font-medium">Notes:</span> {order.notes}
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="p-4 border-t bg-gray-50 flex gap-2 flex-wrap">
//         {/* Status update dropdown */}
//         <select
//           value={order.status}
//           onChange={(e) => onUpdateStatus(order, e.target.value)}
//           className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-purple-500"
//         >
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="preparing">Preparing</option>
//           <option value="ready">Ready</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>

//         {(order.status === "pending" || order.status === "confirmed") && (
//           <button
//             onClick={() => onStartPreparation(order)}
//             className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition flex items-center justify-center gap-2"
//           >
//             <StartIcon fontSize="small" /> Start Cooking
//           </button>
//         )}
//         {order.status === "preparing" && (
//           <button
//             onClick={() => onMarkReady(order)}
//             className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition flex items-center justify-center gap-2"
//           >
//             <DoneAllIcon fontSize="small" /> Mark Ready
//           </button>
//         )}
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

// // ========== ORDER DETAILS MODAL with Full Ingredients ==========
// const OrderDetailsModal = ({
//   order,
//   onClose,
//   onStartPreparation,
//   onMarkReady,
//   onUpdateStatus,
// }) => {
//   if (!order) return null;

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "pending": return "bg-yellow-100 text-yellow-800";
//       case "confirmed": return "bg-blue-100 text-blue-800";
//       case "preparing": return "bg-purple-100 text-purple-800";
//       case "ready": return "bg-green-100 text-green-800";
//       case "completed": return "bg-gray-100 text-gray-800";
//       case "cancelled": return "bg-red-100 text-red-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getAllIngredients = () => {
//     const allIngredients = [];
//     order.items?.forEach((item) => {
//       if (item.fullIngredients && item.fullIngredients.length > 0) {
//         allIngredients.push(...item.fullIngredients);
//       }
//     });
//     return [...new Set(allIngredients)];
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//       >
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
//           <div>
//             <h2 className="text-white font-bold text-xl">Order Details</h2>
//             <p className="text-purple-200 text-sm">Kitchen View - Full Ingredients</p>
//           </div>
//           <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
//             <CloseIcon className="text-white" />
//           </button>
//         </div>

//         <div className="p-6">
//           {/* Order Summary */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
//             <div><p className="text-xs text-gray-500">Order ID</p><p className="font-mono font-medium text-sm">{order.orderId?.slice(-12)}</p></div>
//             <div><p className="text-xs text-gray-500">Table</p><p className="font-medium text-lg">Table {order.tableNumber}</p></div>
//             <div><p className="text-xs text-gray-500">Customer</p><p className="font-medium">{order.customerName}</p></div>
//             <div><p className="text-xs text-gray-500">Status</p><span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>{order.status}</span></div>
//             <div><p className="text-xs text-gray-500">Created</p><p className="font-medium text-sm">{new Date(order.createdAt).toLocaleString()}</p></div>
//             <div><p className="text-xs text-gray-500">Est. Prep Time</p><p className="font-medium">{order.estimatedTime} minutes</p></div>
//             <div><p className="text-xs text-gray-500">Total Amount</p><p className="font-medium text-orange-600">RWF {order.totalAmount?.toLocaleString() || 0}</p></div>
//           </div>

//           {/* Items with Full Ingredients */}
//           <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
//             <FoodIcon fontSize="small" /> Items to Prepare
//           </h3>
//           <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
//             {order.items?.map((item, idx) => (
//               <div key={idx} className="border rounded-lg p-4">
//                 <div className="flex justify-between items-start flex-wrap gap-2">
//                   <div>
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <span className="font-bold text-gray-800">{item.quantity}x</span>
//                       <span className="font-medium text-gray-800">{item.name}</span>
//                     </div>
//                     <p className="text-xs text-gray-400 mt-1">Prep: {item.preparationTime || 15} min</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-orange-600">RWF {(item.finalPrice || item.originalPrice).toLocaleString()}</p>
//                   </div>
//                 </div>

//                 {/* FULL INGREDIENTS DISPLAY */}
//                 {item.fullIngredients && item.fullIngredients.length > 0 && (
//                   <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
//                     <p className="text-xs font-bold text-emerald-700 flex items-center gap-1 mb-2">
//                       <ScienceIcon fontSize="small" /> Ingredients for {item.name}:
//                     </p>
//                     <div className="flex flex-wrap gap-1.5">
//                       {item.fullIngredients.map((ing, i) => (
//                         <span key={i} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">{ing}</span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Allergen Information */}
//                 {(item.containsGluten || item.containsPeanuts || item.containsShellfish || item.containsDairy || item.highSalt) && (
//                   <div className="mt-2 p-2 bg-red-50 rounded-lg">
//                     <p className="text-xs font-medium text-red-700 flex items-center gap-1">
//                       <WarningIcon fontSize="small" /> Allergen Info:
//                     </p>
//                     <div className="flex flex-wrap gap-1 mt-1">
//                       {item.containsGluten && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Gluten</span>}
//                       {item.containsPeanuts && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Peanuts</span>}
//                       {item.containsShellfish && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Shellfish</span>}
//                       {item.containsDairy && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Dairy</span>}
//                       {item.highSalt && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">High Salt</span>}
//                     </div>
//                   </div>
//                 )}

//                 {/* Health Triggers */}
//                 {(item.refluxTriggers?.length > 0 || item.migraineTriggers?.length > 0) && (
//                   <div className="mt-2 p-2 bg-orange-50 rounded-lg">
//                     <p className="text-xs font-medium text-orange-700">Health Triggers:</p>
//                     <div className="flex flex-wrap gap-1 mt-0.5">
//                       {item.refluxTriggers?.map((t, i) => <span key={i} className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">Reflux: {t}</span>)}
//                       {item.migraineTriggers?.map((t, i) => <span key={i} className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">Migraine: {t}</span>)}
//                     </div>
//                   </div>
//                 )}

//                 {item.customizations?.length > 0 && (
//                   <div className="mt-2 p-2 bg-orange-50 rounded-lg">
//                     <p className="text-xs font-medium text-orange-700 flex items-center gap-1">
//                       <SettingsIcon fontSize="small" /> Customizations:
//                     </p>
//                     <div className="flex flex-wrap gap-1 mt-1">
//                       {item.customizations.map((c, i) => (
//                         <span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{c}</span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {item.specialInstructions && (
//                   <div className="mt-2 p-2 bg-blue-50 rounded-lg">
//                     <p className="text-xs font-medium text-blue-700 flex items-center gap-1">
//                       <NoteIcon fontSize="small" /> Special Instructions:
//                     </p>
//                     <p className="text-xs text-blue-600 mt-0.5">{item.specialInstructions}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Summary of All Ingredients Needed */}
//           {getAllIngredients().length > 0 && (
//             <div className="mb-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
//               <p className="text-sm font-bold text-amber-800 flex items-center gap-2 mb-2">
//                 <ListAltIcon /> Complete Shopping List for this Order
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {getAllIngredients().map((ing, i) => (
//                   <span key={i} className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">{ing}</span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Order Notes */}
//           {order.notes && (
//             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//               <p className="text-sm font-medium text-gray-700 flex items-center gap-1"><NoteIcon fontSize="small" /> Order Notes</p>
//               <p className="text-sm text-gray-600 mt-1">{order.notes}</p>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex gap-3 pt-4 border-t flex-wrap">
//             <button onClick={onClose} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">Close</button>
//             <select
//               value={order.status}
//               onChange={(e) => onUpdateStatus(order, e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
//             >
//               <option value="pending">Pending</option>
//               <option value="confirmed">Confirmed</option>
//               <option value="preparing">Preparing</option>
//               <option value="ready">Ready</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
//             {(order.status === "pending" || order.status === "confirmed") && (
//               <button onClick={() => { onStartPreparation(order); onClose(); }} className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition">Start Cooking</button>
//             )}
//             {order.status === "preparing" && (
//               <button onClick={() => { onMarkReady(order); onClose(); }} className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition">Mark as Ready</button>
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
//     <motion.div whileHover={{ scale: 1.02 }} className={`bg-white rounded-xl shadow-lg p-4 sm:p-5 border-l-4 ${color}`}>
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-gray-500 text-xs sm:text-sm font-medium">{title}</p>
//           <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">{value}</p>
//           {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
//         </div>
//         <div className={`p-2 sm:p-3 rounded-full bg-${color.split("-")[1]}-100 bg-opacity-20`}>{icon}</div>
//       </div>
//     </motion.div>
//   );
// };

// // ========== CONNECTION STATUS BANNER ==========
// const ConnectionStatusBanner = ({ isConnected, onRetry }) => {
//   if (isConnected) return null;
//   return (
//     <div className="mx-4 sm:mx-6 mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex justify-between items-center">
//       <div className="flex items-center gap-3"><WifiOffIcon className="text-red-500" /><div><p className="text-red-700 font-medium">Connection Error</p><p className="text-red-600 text-sm">Cannot connect to the server.</p></div></div>
//       <button onClick={onRetry} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm">Retry</button>
//     </div>
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
//   const [isConnected, setIsConnected] = useState(true);
//   const [stats, setStats] = useState({
//     pendingOrders: 0, confirmedOrders: 0, preparingOrders: 0, readyOrders: 0,
//     completedOrders: 0, cancelledOrders: 0, completedToday: 0, avgPreparationTime: 0, totalRevenue: 0,
//   });
//   const [soundEnabled, setSoundEnabled] = useState(true);
//   const [lastRefresh, setLastRefresh] = useState(new Date());
//   const [refreshing, setRefreshing] = useState(false);
//   const previousOrdersRef = useRef([]);

//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post("https://nutriscan-foodanddrinksupply.onrender.com/auth/logout", {}, { headers: { Authorization: `Bearer ${token}` } });
//     } catch (error) {
//       console.error("Logout error:", error?.response?.data || error.message);
//     } finally {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       navigate("/login");
//     }
//   };

//   const playNotificationSound = useCallback(() => {
//     if (!soundEnabled) return;
//     try {
//       const audio = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");
//       audio.volume = 0.3;
//       audio.play().catch((e) => console.log("Audio play failed:", e));
//     } catch (error) { console.log("Sound not supported"); }
//   }, [soundEnabled]);

//   const calculateStats = useCallback((ordersList) => {
//     const pending = ordersList.filter((o) => o.status === "pending").length;
//     const confirmed = ordersList.filter((o) => o.status === "confirmed").length;
//     const preparing = ordersList.filter((o) => o.status === "preparing").length;
//     const ready = ordersList.filter((o) => o.status === "ready").length;
//     const completed = ordersList.filter((o) => o.status === "completed").length;
//     const cancelled = ordersList.filter((o) => o.status === "cancelled").length;
//     const completedToday = ordersList.filter((o) => o.status === "completed" && new Date(o.createdAt).toDateString() === new Date().toDateString()).length;
//     const completedOrdersWithTimes = ordersList.filter((o) => o.status === "completed" && o.startedAt && o.completedAt);
//     const avgTime = completedOrdersWithTimes.length > 0 ? Math.round(completedOrdersWithTimes.reduce((sum, o) => {
//       const start = new Date(o.startedAt);
//       const end = new Date(o.completedAt);
//       return sum + (end - start) / 60000;
//     }, 0) / completedOrdersWithTimes.length) : 0;
//     const totalRevenue = ordersList.filter((o) => o.status === "ready" || o.status === "completed").reduce((sum, o) => sum + (o.totalAmount || 0), 0);
//     setStats({ pendingOrders: pending, confirmedOrders: confirmed, preparingOrders: preparing, readyOrders: ready, completedOrders: completed, cancelledOrders: cancelled, completedToday, avgPreparationTime: avgTime, totalRevenue });
//   }, []);

//   const loadOrders = useCallback(async (showLoading = true) => {
//     if (showLoading) setRefreshing(true);
//     try {
//       const apiOrders = await fetchOrdersFromAPI();
//       setOrders(apiOrders);
//       setLastRefresh(new Date());
//       setIsConnected(true);
//       setError(null);
//       calculateStats(apiOrders);
//       const previousOrders = previousOrdersRef.current;
//       const newOrders = apiOrders.filter((o) => (o.status === "pending" || o.status === "confirmed") && !previousOrders.some((prev) => prev._id === o._id));
//       if (newOrders.length > 0) { playNotificationSound(); toast.info(`${newOrders.length} new order${newOrders.length > 1 ? "s" : ""} received!`); }
//       previousOrdersRef.current = apiOrders;
//     } catch (error) {
//       console.error("Error loading orders:", error);
//       setIsConnected(false);
//       setError(error.message);
//       toast.error("Failed to load orders from server");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [calculateStats, playNotificationSound]);

//   const updateOrderStatus = async (order, newStatus) => {
//     try {
//       await updateOrderStatusAPI(order._id, newStatus);
//       toast.success(`Order #${order.orderId?.slice(-8)} status updated to ${newStatus}`);
//       await loadOrders(false);
//     } catch (error) {
//       toast.error("Failed to update order status");
//     }
//   };

//   const startPreparation = async (order) => {
//     await updateOrderStatus(order, "preparing");
//   };

//   const markAsReady = async (order) => {
//     await updateOrderStatus(order, "ready");
//     toast.success(`Order #${order.orderId?.slice(-8)} is ready for serving!`);
//   };

//   useEffect(() => { loadOrders(); const interval = setInterval(() => loadOrders(false), 30000); return () => clearInterval(interval); }, [loadOrders]);

//   const getFilteredOrders = () => {
//     let filtered = orders;
//     if (activeTab === "active") filtered = orders.filter((o) => ["pending", "confirmed", "preparing"].includes(o.status));
//     else if (activeTab === "ready") filtered = orders.filter((o) => o.status === "ready");
//     else if (activeTab === "completed") filtered = orders.filter((o) => o.status === "completed");
//     else if (activeTab === "cancelled") filtered = orders.filter((o) => o.status === "cancelled");
//     else if (activeTab === "all") filtered = orders;
//     if (searchTerm) { const term = searchTerm.toLowerCase(); filtered = filtered.filter((o) => o.orderId?.toLowerCase().includes(term) || o.tableNumber?.toString().includes(term) || o.customerName?.toLowerCase().includes(term)); }
//     return filtered.sort((a, b) => { if (a.status === "preparing" && b.status !== "preparing") return -1; if (a.status !== "preparing" && b.status === "preparing") return 1; return new Date(b.createdAt) - new Date(a.createdAt); });
//   };

//   const filteredOrders = getFilteredOrders();
//   const pendingOrders = filteredOrders.filter((o) => o.status === "pending" || o.status === "confirmed");
//   const preparingOrders = filteredOrders.filter((o) => o.status === "preparing");
//   const tabs = [{ id: "active", label: "Active Orders", icon: <FireIcon />, count: stats.pendingOrders + stats.confirmedOrders + stats.preparingOrders }, { id: "ready", label: "Ready", icon: <DoneAllIcon />, count: stats.readyOrders }, { id: "completed", label: "Completed", icon: <CheckCircleIcon />, count: stats.completedOrders }, { id: "cancelled", label: "Cancelled", icon: <CancelIcon />, count: stats.cancelledOrders }, { id: "all", label: "All Orders", icon: <OrdersIcon /> }];

//   if (loading && orders.length === 0) {
//     return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div><p className="text-gray-600">Loading kitchen orders...</p></div></div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover />
//       <header className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg sticky top-0 z-10">
//         <div className="px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-4">
//           <div className="flex items-center gap-3"><div className="bg-white/20 p-2 rounded-lg"><KitchenIcon className="text-white" /></div><div><h1 className="text-lg sm:text-xl font-bold">Kitchen Dashboard</h1><p className="text-purple-200 text-xs sm:text-sm">Real-time order management with ingredients</p></div></div>
//           <div className="flex items-center gap-2 sm:gap-3">
//             <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg text-xs">{isConnected ? <WifiIcon fontSize="small" /> : <WifiOffIcon fontSize="small" />}<span>{isConnected ? "Connected" : "Offline"}</span></div>
//             <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-full transition ${soundEnabled ? "bg-white/20" : "bg-white/10"}`}><AlertIcon className="text-white" /></button>
//             <button onClick={() => loadOrders()} disabled={refreshing} className={`p-2 rounded-full transition ${refreshing ? "animate-spin" : "hover:bg-white/20"}`}><RefreshIcon className="text-white" /></button>
//             <div className="bg-white/20 px-2 sm:px-3 py-2 rounded-lg text-xs">Last: {lastRefresh.toLocaleTimeString()}</div>
//             <button onClick={handleLogout} className="bg-white/20 px-3 py-2 rounded-lg text-sm hover:bg-white/30">Logout</button>
//           </div>
//         </div>
//       </header>

//       <ConnectionStatusBanner isConnected={isConnected} onRetry={() => loadOrders()} />

//       <div className="p-4 sm:p-6 pb-2">
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
//           <StatCard title="Pending" value={stats.pendingOrders} icon={<TimeIcon className="text-yellow-600" />} color="border-yellow-500" subtitle="New orders" />
//           <StatCard title="Confirmed" value={stats.confirmedOrders} icon={<CheckCircleIcon className="text-blue-600" />} color="border-blue-500" subtitle="Awaiting start" />
//           <StatCard title="In Progress" value={stats.preparingOrders} icon={<FireIcon className="text-purple-600" />} color="border-purple-500" subtitle="Cooking" />
//           <StatCard title="Ready" value={stats.readyOrders} icon={<DoneAllIcon className="text-green-600" />} color="border-green-500" subtitle="Awaiting pickup" />
//           <StatCard title="Completed" value={stats.completedOrders} icon={<CheckCircleIcon className="text-gray-600" />} color="border-gray-500" />
//           <StatCard title="Completed Today" value={stats.completedToday} icon={<TrophyIcon className="text-teal-600" />} color="border-teal-500" />
//           <StatCard title="Avg Prep Time" value={`${stats.avgPreparationTime} min`} icon={<SpeedIcon className="text-indigo-600" />} color="border-indigo-500" />
//         </div>
//       </div>

//       <div className="px-4 sm:px-6"><div className="flex gap-2 overflow-x-auto pb-2">{tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-purple-600 text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100"}`}>{tab.icon}<span className="text-sm">{tab.label}</span>{tab.count !== undefined && tab.count > 0 && <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? "bg-white/20" : "bg-purple-100 text-purple-600"}`}>{tab.count}</span>}</button>))}</div></div>

//       <div className="px-4 sm:px-6 pt-4"><div className="relative max-w-md"><SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" /><input type="text" placeholder="Search by Order ID, Table, or Customer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white" /></div></div>

//       <div className="p-4 sm:p-6">
//         {activeTab === "active" && (
//           <>
//             {preparingOrders.length > 0 && (<div className="mb-6"><h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2"><FireIcon className="text-purple-600" /> In Progress ({preparingOrders.length})</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"><AnimatePresence>{preparingOrders.map((order) => (<KitchenOrderCard key={order._id} order={order} onStartPreparation={startPreparation} onMarkReady={markAsReady} onUpdateStatus={updateOrderStatus} onViewDetails={setSelectedOrder} />))}</AnimatePresence></div></div>)}
//             {pendingOrders.length > 0 && (<div><h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2"><TimeIcon className="text-yellow-600" /> Pending ({pendingOrders.length})</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"><AnimatePresence>{pendingOrders.map((order) => (<KitchenOrderCard key={order._id} order={order} onStartPreparation={startPreparation} onMarkReady={markAsReady} onUpdateStatus={updateOrderStatus} onViewDetails={setSelectedOrder} />))}</AnimatePresence></div></div>)}
//             {preparingOrders.length === 0 && pendingOrders.length === 0 && (<div className="text-center py-12 bg-white rounded-xl"><KitchenIcon className="text-gray-300 text-6xl mx-auto mb-4" /><p className="text-gray-500">No active orders. Kitchen is idle.</p></div>)}
//           </>
//         )}
//         {(activeTab === "ready" || activeTab === "completed" || activeTab === "cancelled" || activeTab === "all") && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">{filteredOrders.map((order) => (<KitchenOrderCard key={order._id} order={order} onStartPreparation={startPreparation} onMarkReady={markAsReady} onUpdateStatus={updateOrderStatus} onViewDetails={setSelectedOrder} />))}{filteredOrders.length === 0 && (<div className="col-span-full text-center py-12 bg-white rounded-xl"><OrdersIcon className="text-gray-300 text-6xl mx-auto mb-4" /><p className="text-gray-500">No orders found.</p></div>)}</div>)}
//       </div>

//       {selectedOrder && (<OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onStartPreparation={startPreparation} onMarkReady={markAsReady} onUpdateStatus={updateOrderStatus} />)}
//     </div>
//   );
// };

// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */

// // ChefDashboard.jsx
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import {
//   Kitchen as KitchenIcon,
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
//   Person as PersonIcon,
//   TableRestaurant as TableIcon,
//   HealthAndSafety as HealthIcon,
//   Close as CloseIcon,
//   PlayArrow as StartIcon,
//   Fastfood as FoodIcon,
//   NoteAlt as NoteIcon,
//   Settings as SettingsIcon,
//   WifiOff as WifiOffIcon,
//   Wifi as WifiIcon,
//   ListAlt as ListAltIcon,
//   Egg as EggIcon,
//   Grass as GrassIcon,
//   LocalDrink as DrinkIcon,
//   Science as ScienceIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// // ========== API CONFIGURATION ==========
// const API_BASE_URL = "https://nutriscan-foodanddrinksupply.onrender.com";

// // Create axios instance with default config
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 30000,
// });

// // Add request interceptor for auth token
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add response interceptor for error handling
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.code === "ECONNABORTED") {
//       console.error("Request timeout - server took too long to respond");
//     } else if (error.response) {
//       console.error(`API Error ${error.response.status}:`, error.response.data);
//       if (error.response.status === 401) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         window.location.href = "/login";
//       }
//     } else if (error.request) {
//       console.error("No response received from server");
//     } else {
//       console.error("Request error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// // ========== CACHE FOR MENU ITEMS ==========
// let menuItemsCache = null;
// let menuItemsListCache = null;

// // Fetch all menu items (foods) from API to get ingredients
// const fetchMenuItems = async () => {
//   if (menuItemsCache) return menuItemsCache;
//   try {
//     const response = await apiClient.get("/foods");
//     let foods = [];
//     if (response.data?.success && response.data.foods) {
//       foods = response.data.foods;
//     } else if (Array.isArray(response.data)) {
//       foods = response.data;
//     } else if (response.data?.data && Array.isArray(response.data.data)) {
//       foods = response.data.data;
//     }

//     // Create a map for quick lookup by name (case insensitive)
//     const menuMap = new Map();
//     foods.forEach((food) => {
//       menuMap.set(food.name.toLowerCase(), food);
//       if (food._id) menuMap.set(food._id, food);
//     });
//     menuItemsCache = menuMap;
//     menuItemsListCache = foods;
//     return menuMap;
//   } catch (error) {
//     console.error("Error fetching menu items:", error);
//     return new Map();
//   }
// };

// // Get all menu items list
// export const getAllMenuItems = async () => {
//   if (menuItemsListCache) return menuItemsListCache;
//   await fetchMenuItems();
//   return menuItemsListCache || [];
// };

// // Enrich order item with full ingredient details from menu
// const enrichOrderItemWithIngredients = async (orderItem, menuMap) => {
//   const itemName = orderItem.name?.toLowerCase();
//   const menuItem = menuMap.get(itemName);

//   if (menuItem) {
//     return {
//       ...orderItem,
//       fullIngredients: menuItem.ingredients || [],
//       nutritionalInfo: menuItem.nutritionalInfo || {},
//       purineLevel: menuItem.purineLevel,
//       containsGluten: menuItem.containsGluten,
//       containsPeanuts: menuItem.containsPeanuts,
//       containsShellfish: menuItem.containsShellfish,
//       containsDairy: menuItem.containsDairy,
//       highSalt: menuItem.highSalt,
//       refluxTriggers: menuItem.refluxTriggers || [],
//       migraineTriggers: menuItem.migraineTriggers || [],
//       image: menuItem.image,
//       description: menuItem.description,
//       category: menuItem.category,
//       prepTime: menuItem.prepTime,
//     };
//   }

//   return {
//     ...orderItem,
//     fullIngredients: [],
//     nutritionalInfo: {},
//     purineLevel: "unknown",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     highSalt: false,
//     refluxTriggers: [],
//     migraineTriggers: [],
//   };
// };

// // Transform API order to local component structure
// const transformOrder = async (apiOrder, menuMap) => {
//   let status = apiOrder.status || "pending";
//   if (apiOrder.bookingDetails?.currentStatus) {
//     status = apiOrder.bookingDetails.currentStatus;
//   }

//   let startedAt = null;
//   let completedAt = null;
//   if (apiOrder.bookingDetails?.statusHistory) {
//     const preparingEntry = apiOrder.bookingDetails.statusHistory.find(
//       (h) => h.status === "preparing"
//     );
//     if (preparingEntry) startedAt = preparingEntry.timestamp;

//     const completedEntry = apiOrder.bookingDetails.statusHistory.find(
//       (h) => h.status === "ready" || h.status === "completed"
//     );
//     if (completedEntry) completedAt = completedEntry.timestamp;
//   }

//   const enrichedItems = await Promise.all(
//     (apiOrder.items || []).map(async (item) => {
//       const enriched = await enrichOrderItemWithIngredients(item, menuMap);
//       return enriched;
//     })
//   );

//   const totalPrepTime =
//     enrichedItems.reduce(
//       (sum, item) => sum + (item.preparationTime || item.prepTime || 15),
//       0
//     ) || 20;

//   const totalAmount =
//     enrichedItems.reduce(
//       (sum, item) =>
//         sum +
//         (item.finalPrice || item.originalPrice || 0) * (item.quantity || 1),
//       0
//     ) || 0;

//   const allCustomizations = [];
//   const allSpecialInstructions = [];
//   enrichedItems.forEach((item) => {
//     if (item.customizations?.length) {
//       allCustomizations.push(...item.customizations);
//     }
//     if (item.specialInstructions) {
//       allSpecialInstructions.push({
//         itemName: item.name,
//         instruction: item.specialInstructions,
//       });
//     }
//   });

//   return {
//     _id: apiOrder._id,
//     orderId: apiOrder.orderId,
//     requestId: apiOrder.requestId,
//     tableNumber: apiOrder.personDetails?.tableNumber || "Unknown",
//     customerName: apiOrder.personDetails?.name || "Guest",
//     orderType: apiOrder.personDetails?.orderType || "dine-in",
//     status: status,
//     items: enrichedItems,
//     notes: apiOrder.notes || "",
//     specialInstructions: apiOrder.bookingDetails?.specialInstructions || "",
//     estimatedPickupTime: apiOrder.bookingDetails?.estimatedPickupTime,
//     createdAt: apiOrder.createdAt,
//     updatedAt: apiOrder.updatedAt,
//     startedAt: startedAt,
//     completedAt: completedAt,
//     estimatedTime: totalPrepTime,
//     totalAmount: totalAmount,
//     statusHistory: apiOrder.bookingDetails?.statusHistory || [],
//     allCustomizations: allCustomizations,
//     allSpecialInstructions: allSpecialInstructions,
//     autoProgress: apiOrder.autoProgress || false,
//   };
// };

// // Fetch orders from API with enriched ingredients
// const fetchOrdersFromAPI = async (retryCount = 0, maxRetries = 3) => {
//   try {
//     const menuMap = await fetchMenuItems();
//     const response = await apiClient.get("/orders");

//     const result = response.data;
//     let ordersArray = [];

//     if (result.success && Array.isArray(result.data)) {
//       ordersArray = result.data;
//     } else if (Array.isArray(result)) {
//       ordersArray = result;
//     } else if (result.orders && Array.isArray(result.orders)) {
//       ordersArray = result.orders;
//     }

//     const transformedOrders = await Promise.all(
//       ordersArray.map((order) => transformOrder(order, menuMap))
//     );

//     return transformedOrders;
//   } catch (error) {
//     console.error(`Fetch attempt ${retryCount + 1} failed:`, error.message);

//     if (
//       retryCount < maxRetries &&
//       (error.code === "ECONNABORTED" || !error.response)
//     ) {
//       const delay = 2000 * (retryCount + 1);
//       console.log(`Retrying in ${delay}ms...`);
//       await new Promise((resolve) => setTimeout(resolve, delay));
//       return fetchOrdersFromAPI(retryCount + 1, maxRetries);
//     }

//     throw error;
//   }
// };

// // Update order status via API
// const updateOrderStatusAPI = async (orderId, newStatus) => {
//   try {
//     const response = await apiClient.patch(`/orders/${orderId}/status`, {
//       status: newStatus,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     throw error;
//   }
// };

// // ========== INGREDIENT BADGE COMPONENT ==========
// const IngredientBadge = ({ ingredient }) => (
//   <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs border border-amber-200">
//     <GrassIcon fontSize="inherit" className="text-amber-500" />
//     {ingredient}
//   </span>
// );

// // ========== KITCHEN ORDER CARD COMPONENT ==========
// const KitchenOrderCard = ({
//   order,
//   onStartPreparation,
//   onMarkReady,
//   onUpdateStatus,
//   onViewDetails,
// }) => {
//   const [timeElapsed, setTimeElapsed] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [showIngredients, setShowIngredients] = useState(false);

//   useEffect(() => {
//     if (order.status === "preparing" && order.startedAt) {
//       const interval = setInterval(() => {
//         const elapsed = Math.floor(
//           (Date.now() - new Date(order.startedAt)) / 60000
//         );
//         setTimeElapsed(elapsed);
//       }, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [order.status, order.startedAt]);

//   const getPriorityColor = () => {
//     const elapsed = timeElapsed;
//     const estimatedTime = order.estimatedTime || 20;
//     if (elapsed > estimatedTime) return "border-red-500 bg-red-50";
//     if (elapsed > estimatedTime * 0.7) return "border-yellow-500 bg-yellow-50";
//     return "border-green-500 bg-green-50";
//   };

//   const getStatusBadge = () => {
//     switch (order.status) {
//       case "pending":
//         return (
//           <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <TimeIcon className="text-yellow-600 text-sm" /> Pending
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
//       case "completed":
//         return (
//           <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <CheckCircleIcon className="text-gray-600 text-sm" /> Completed
//           </span>
//         );
//       case "cancelled":
//         return (
//           <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <CancelIcon className="text-red-600 text-sm" /> Cancelled
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

//   const getAllIngredients = () => {
//     const allIngredients = [];
//     order.items?.forEach((item) => {
//       if (item.fullIngredients && item.fullIngredients.length > 0) {
//         allIngredients.push(...item.fullIngredients);
//       }
//     });
//     return [...new Set(allIngredients)];
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, x: -100 }}
//       whileHover={{ scale: 1.02 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${getPriorityColor()} transition-all duration-300 ${
//         isHovered ? "shadow-xl" : ""
//       }`}
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
//                 <PersonIcon fontSize="small" /> {order.customerName}
//               </span>
//               <span className="flex items-center gap-1 text-xs text-gray-400">
//                 {order.orderType}
//               </span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="flex items-center gap-1 text-orange-600 font-bold">
//               <TimerIcon fontSize="small" />
//               <span>{order.estimatedTime} min est.</span>
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
//         <div className="space-y-3 max-h-60 overflow-y-auto">
//           {order.items?.map((item, idx) => (
//             <div
//               key={idx}
//               className="text-sm border-b border-gray-100 pb-3 last:border-0"
//             >
//               <div className="flex justify-between flex-wrap gap-2">
//                 <span className="font-medium">
//                   {item.quantity}x {item.name}
//                 </span>
//                 <span className="text-gray-500">
//                   {item.preparationTime || item.prepTime || 15} min
//                 </span>
//               </div>

//               {item.fullIngredients && item.fullIngredients.length > 0 && (
//                 <div className="mt-2">
//                   <button
//                     onClick={() => setShowIngredients(!showIngredients)}
//                     className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium"
//                   >
//                     <ListAltIcon fontSize="inherit" />
//                     {showIngredients ? "Hide" : "Show"} Ingredients (
//                     {item.fullIngredients.length})
//                   </button>
//                   {showIngredients && (
//                     <div className="mt-2 p-2 bg-emerald-50 rounded-lg">
//                       <p className="text-xs font-medium text-emerald-700 mb-1.5 flex items-center gap-1">
//                         <ScienceIcon fontSize="small" /> Required Ingredients:
//                       </p>
//                       <div className="flex flex-wrap gap-1.5">
//                         {item.fullIngredients.map((ing, i) => (
//                           <IngredientBadge key={i} ingredient={ing} />
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {(item.containsGluten ||
//                 item.containsPeanuts ||
//                 item.containsShellfish ||
//                 item.containsDairy) && (
//                 <div className="mt-1 flex flex-wrap gap-1">
//                   {item.containsGluten && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                       ⚠️ Gluten
//                     </span>
//                   )}
//                   {item.containsPeanuts && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                       ⚠️ Peanuts
//                     </span>
//                   )}
//                   {item.containsShellfish && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                       ⚠️ Shellfish
//                     </span>
//                   )}
//                   {item.containsDairy && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                       ⚠️ Dairy
//                     </span>
//                   )}
//                 </div>
//               )}

//               {item.customizations?.length > 0 && (
//                 <div className="text-xs text-orange-600 mt-1">
//                   ✨ Custom: {item.customizations.join(", ")}
//                 </div>
//               )}

//               {item.specialInstructions && (
//                 <div className="text-xs text-blue-600 mt-1">
//                   📝 {item.specialInstructions}
//                 </div>
//               )}

//               <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>
//                   RWF{" "}
//                   {(
//                     (item.finalPrice || item.originalPrice || 0) *
//                     (item.quantity || 1)
//                   ).toLocaleString()}
//                 </span>
//                 {item.purineLevel && item.purineLevel !== "unknown" && (
//                   <span
//                     className={`px-1.5 py-0.5 rounded-full text-xs ${
//                       item.purineLevel === "low"
//                         ? "bg-green-100 text-green-700"
//                         : item.purineLevel === "moderate"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {item.purineLevel} purine
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {getAllIngredients().length > 0 && (
//           <div className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
//             <p className="text-xs font-medium text-amber-700 mb-1 flex items-center gap-1">
//               <ListAltIcon fontSize="small" /> All Ingredients Needed:
//             </p>
//             <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
//               {getAllIngredients()
//                 .slice(0, 8)
//                 .map((ing, i) => (
//                   <span
//                     key={i}
//                     className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full"
//                   >
//                     {ing}
//                   </span>
//                 ))}
//               {getAllIngredients().length > 8 && (
//                 <span className="text-xs text-gray-400">
//                   +{getAllIngredients().length - 8} more
//                 </span>
//               )}
//             </div>
//           </div>
//         )}

//         {order.notes && (
//           <div className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
//             <div className="text-xs text-gray-600 flex items-start gap-1">
//               <NoteIcon fontSize="small" className="text-gray-400" />
//               <span className="font-medium">Notes:</span> {order.notes}
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="p-4 border-t bg-gray-50 flex gap-2 flex-wrap">
//         <select
//           value={order.status}
//           onChange={(e) => onUpdateStatus(order, e.target.value)}
//           className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-purple-500"
//         >
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="preparing">Preparing</option>
//           <option value="ready">Ready</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>

//         {(order.status === "pending" || order.status === "confirmed") && (
//           <button
//             onClick={() => onStartPreparation(order)}
//             className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition flex items-center justify-center gap-2"
//           >
//             <StartIcon fontSize="small" /> Start Cooking
//           </button>
//         )}
//         {order.status === "preparing" && (
//           <button
//             onClick={() => onMarkReady(order)}
//             className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition flex items-center justify-center gap-2"
//           >
//             <DoneAllIcon fontSize="small" /> Mark Ready
//           </button>
//         )}
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
//   onUpdateStatus,
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
//       case "completed":
//         return "bg-gray-100 text-gray-800";
//       case "cancelled":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getAllIngredients = () => {
//     const allIngredients = [];
//     order.items?.forEach((item) => {
//       if (item.fullIngredients && item.fullIngredients.length > 0) {
//         allIngredients.push(...item.fullIngredients);
//       }
//     });
//     return [...new Set(allIngredients)];
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//       >
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
//           <div>
//             <h2 className="text-white font-bold text-xl">Order Details</h2>
//             <p className="text-purple-200 text-sm">
//               Kitchen View - Full Ingredients
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-white/20 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>

//         <div className="p-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
//             <div>
//               <p className="text-xs text-gray-500">Order ID</p>
//               <p className="font-mono font-medium text-sm">
//                 {order.orderId?.slice(-12)}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Table</p>
//               <p className="font-medium text-lg">Table {order.tableNumber}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Customer</p>
//               <p className="font-medium">{order.customerName}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Status</p>
//               <span
//                 className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//                   order.status
//                 )}`}
//               >
//                 {order.status}
//               </span>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Created</p>
//               <p className="font-medium text-sm">
//                 {new Date(order.createdAt).toLocaleString()}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Est. Prep Time</p>
//               <p className="font-medium">{order.estimatedTime} minutes</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Total Amount</p>
//               <p className="font-medium text-orange-600">
//                 RWF {order.totalAmount?.toLocaleString() || 0}
//               </p>
//             </div>
//           </div>

//           <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
//             <FoodIcon fontSize="small" /> Items to Prepare
//           </h3>
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
//                     <p className="text-xs text-gray-400 mt-1">
//                       Prep: {item.preparationTime || item.prepTime || 15} min
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-orange-600">
//                       RWF{" "}
//                       {(
//                         (item.finalPrice || item.originalPrice) *
//                         (item.quantity || 1)
//                       ).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>

//                 {item.fullIngredients && item.fullIngredients.length > 0 && (
//                   <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
//                     <p className="text-xs font-bold text-emerald-700 flex items-center gap-1 mb-2">
//                       <ScienceIcon fontSize="small" /> Ingredients for{" "}
//                       {item.name}:
//                     </p>
//                     <div className="flex flex-wrap gap-1.5">
//                       {item.fullIngredients.map((ing, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full"
//                         >
//                           {ing}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {(item.containsGluten ||
//                   item.containsPeanuts ||
//                   item.containsShellfish ||
//                   item.containsDairy ||
//                   item.highSalt) && (
//                   <div className="mt-2 p-2 bg-red-50 rounded-lg">
//                     <p className="text-xs font-medium text-red-700 flex items-center gap-1">
//                       <WarningIcon fontSize="small" /> Allergen Info:
//                     </p>
//                     <div className="flex flex-wrap gap-1 mt-1">
//                       {item.containsGluten && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           Gluten
//                         </span>
//                       )}
//                       {item.containsPeanuts && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           Peanuts
//                         </span>
//                       )}
//                       {item.containsShellfish && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           Shellfish
//                         </span>
//                       )}
//                       {item.containsDairy && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           Dairy
//                         </span>
//                       )}
//                       {item.highSalt && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           High Salt
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {(item.refluxTriggers?.length > 0 ||
//                   item.migraineTriggers?.length > 0) && (
//                   <div className="mt-2 p-2 bg-orange-50 rounded-lg">
//                     <p className="text-xs font-medium text-orange-700">
//                       Health Triggers:
//                     </p>
//                     <div className="flex flex-wrap gap-1 mt-0.5">
//                       {item.refluxTriggers?.map((t, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded"
//                         >
//                           Reflux: {t}
//                         </span>
//                       ))}
//                       {item.migraineTriggers?.map((t, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded"
//                         >
//                           Migraine: {t}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {item.customizations?.length > 0 && (
//                   <div className="mt-2 p-2 bg-orange-50 rounded-lg">
//                     <p className="text-xs font-medium text-orange-700 flex items-center gap-1">
//                       <SettingsIcon fontSize="small" /> Customizations:
//                     </p>
//                     <div className="flex flex-wrap gap-1 mt-1">
//                       {item.customizations.map((c, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full"
//                         >
//                           {c}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {item.specialInstructions && (
//                   <div className="mt-2 p-2 bg-blue-50 rounded-lg">
//                     <p className="text-xs font-medium text-blue-700 flex items-center gap-1">
//                       <NoteIcon fontSize="small" /> Special Instructions:
//                     </p>
//                     <p className="text-xs text-blue-600 mt-0.5">
//                       {item.specialInstructions}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {getAllIngredients().length > 0 && (
//             <div className="mb-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
//               <p className="text-sm font-bold text-amber-800 flex items-center gap-2 mb-2">
//                 <ListAltIcon /> Complete Shopping List for this Order
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {getAllIngredients().map((ing, i) => (
//                   <span
//                     key={i}
//                     className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-sm"
//                   >
//                     {ing}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {order.notes && (
//             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//               <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
//                 <NoteIcon fontSize="small" /> Order Notes
//               </p>
//               <p className="text-sm text-gray-600 mt-1">{order.notes}</p>
//             </div>
//           )}

//           <div className="flex gap-3 pt-4 border-t flex-wrap">
//             <button
//               onClick={onClose}
//               className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
//             >
//               Close
//             </button>
//             <select
//               value={order.status}
//               onChange={(e) => onUpdateStatus(order, e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
//             >
//               <option value="pending">Pending</option>
//               <option value="confirmed">Confirmed</option>
//               <option value="preparing">Preparing</option>
//               <option value="ready">Ready</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
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
//           className={`p-2 sm:p-3 rounded-full bg-${
//             color.split("-")[1]
//           }-100 bg-opacity-20`}
//         >
//           {icon}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ========== CONNECTION STATUS BANNER ==========
// const ConnectionStatusBanner = ({ isConnected, onRetry }) => {
//   if (isConnected) return null;
//   return (
//     <div className="mx-4 sm:mx-6 mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex justify-between items-center">
//       <div className="flex items-center gap-3">
//         <WifiOffIcon className="text-red-500" />
//         <div>
//           <p className="text-red-700 font-medium">Connection Error</p>
//           <p className="text-red-600 text-sm">Cannot connect to the server.</p>
//         </div>
//       </div>
//       <button
//         onClick={onRetry}
//         className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
//       >
//         Retry
//       </button>
//     </div>
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
//   const [isConnected, setIsConnected] = useState(true);
//   const [stats, setStats] = useState({
//     pendingOrders: 0,
//     confirmedOrders: 0,
//     preparingOrders: 0,
//     readyOrders: 0,
//     completedOrders: 0,
//     cancelledOrders: 0,
//     completedToday: 0,
//     avgPreparationTime: 0,
//     totalRevenue: 0,
//   });
//   const [soundEnabled, setSoundEnabled] = useState(true);
//   const [lastRefresh, setLastRefresh] = useState(new Date());
//   const [refreshing, setRefreshing] = useState(false);
//   const previousOrdersRef = useRef([]);

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   const playNotificationSound = useCallback(() => {
//     if (!soundEnabled) return;
//     try {
//       const audio = new Audio(
//         "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
//       );
//       audio.volume = 0.3;
//       audio.play().catch((e) => console.log("Audio play failed:", e));
//     } catch (error) {
//       console.log("Sound not supported");
//     }
//   }, [soundEnabled]);

//   const calculateStats = useCallback((ordersList) => {
//     const pending = ordersList.filter((o) => o.status === "pending").length;
//     const confirmed = ordersList.filter((o) => o.status === "confirmed").length;
//     const preparing = ordersList.filter((o) => o.status === "preparing").length;
//     const ready = ordersList.filter((o) => o.status === "ready").length;
//     const completed = ordersList.filter((o) => o.status === "completed").length;
//     const cancelled = ordersList.filter((o) => o.status === "cancelled").length;
//     const completedToday = ordersList.filter(
//       (o) =>
//         o.status === "completed" &&
//         new Date(o.createdAt).toDateString() === new Date().toDateString()
//     ).length;
//     const completedOrdersWithTimes = ordersList.filter(
//       (o) => o.status === "completed" && o.startedAt && o.completedAt
//     );
//     const avgTime =
//       completedOrdersWithTimes.length > 0
//         ? Math.round(
//             completedOrdersWithTimes.reduce((sum, o) => {
//               const start = new Date(o.startedAt);
//               const end = new Date(o.completedAt);
//               return sum + (end - start) / 60000;
//             }, 0) / completedOrdersWithTimes.length
//           )
//         : 0;
//     const totalRevenue = ordersList
//       .filter((o) => o.status === "ready" || o.status === "completed")
//       .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
//     setStats({
//       pendingOrders: pending,
//       confirmedOrders: confirmed,
//       preparingOrders: preparing,
//       readyOrders: ready,
//       completedOrders: completed,
//       cancelledOrders: cancelled,
//       completedToday,
//       avgPreparationTime: avgTime,
//       totalRevenue,
//     });
//   }, []);

//   const loadOrders = useCallback(
//     async (showLoading = true) => {
//       if (showLoading) setRefreshing(true);
//       try {
//         const apiOrders = await fetchOrdersFromAPI();
//         setOrders(apiOrders);
//         setLastRefresh(new Date());
//         setIsConnected(true);
//         setError(null);
//         calculateStats(apiOrders);
//         const previousOrders = previousOrdersRef.current;
//         const newOrders = apiOrders.filter(
//           (o) =>
//             (o.status === "pending" || o.status === "confirmed") &&
//             !previousOrders.some((prev) => prev._id === o._id)
//         );
//         if (newOrders.length > 0) {
//           playNotificationSound();
//           toast.info(
//             `${newOrders.length} new order${
//               newOrders.length > 1 ? "s" : ""
//             } received!`
//           );
//         }
//         previousOrdersRef.current = apiOrders;
//       } catch (error) {
//         console.error("Error loading orders:", error);
//         setIsConnected(false);
//         setError(error.message);
//         toast.error("Failed to load orders from server");
//       } finally {
//         setLoading(false);
//         setRefreshing(false);
//       }
//     },
//     [calculateStats, playNotificationSound]
//   );

//   const updateOrderStatus = async (order, newStatus) => {
//     try {
//       await updateOrderStatusAPI(order._id, newStatus);
//       toast.success(
//         `Order #${order.orderId?.slice(-8)} status updated to ${newStatus}`
//       );
//       await loadOrders(false);
//     } catch (error) {
//       toast.error("Failed to update order status");
//     }
//   };

//   const startPreparation = async (order) => {
//     await updateOrderStatus(order, "preparing");
//   };

//   const markAsReady = async (order) => {
//     await updateOrderStatus(order, "ready");
//     toast.success(`Order #${order.orderId?.slice(-8)} is ready for serving!`);
//   };

//   useEffect(() => {
//     loadOrders();
//     const interval = setInterval(() => loadOrders(false), 30000);
//     return () => clearInterval(interval);
//   }, [loadOrders]);

//   const getFilteredOrders = () => {
//     let filtered = orders;
//     if (activeTab === "active")
//       filtered = orders.filter((o) =>
//         ["pending", "confirmed", "preparing"].includes(o.status)
//       );
//     else if (activeTab === "ready")
//       filtered = orders.filter((o) => o.status === "ready");
//     else if (activeTab === "completed")
//       filtered = orders.filter((o) => o.status === "completed");
//     else if (activeTab === "cancelled")
//       filtered = orders.filter((o) => o.status === "cancelled");
//     else if (activeTab === "all") filtered = orders;
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (o) =>
//           o.orderId?.toLowerCase().includes(term) ||
//           o.tableNumber?.toString().includes(term) ||
//           o.customerName?.toLowerCase().includes(term)
//       );
//     }
//     return filtered.sort((a, b) => {
//       if (a.status === "preparing" && b.status !== "preparing") return -1;
//       if (a.status !== "preparing" && b.status === "preparing") return 1;
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });
//   };

//   const filteredOrders = getFilteredOrders();
//   const pendingOrders = filteredOrders.filter(
//     (o) => o.status === "pending" || o.status === "confirmed"
//   );
//   const preparingOrders = filteredOrders.filter(
//     (o) => o.status === "preparing"
//   );
//   const tabs = [
//     {
//       id: "active",
//       label: "Active Orders",
//       icon: <FireIcon />,
//       count:
//         stats.pendingOrders + stats.confirmedOrders + stats.preparingOrders,
//     },
//     {
//       id: "ready",
//       label: "Ready",
//       icon: <DoneAllIcon />,
//       count: stats.readyOrders,
//     },
//     {
//       id: "completed",
//       label: "Completed",
//       icon: <CheckCircleIcon />,
//       count: stats.completedOrders,
//     },
//     {
//       id: "cancelled",
//       label: "Cancelled",
//       icon: <CancelIcon />,
//       count: stats.cancelledOrders,
//     },
//     { id: "all", label: "All Orders", icon: <OrdersIcon /> },
//   ];

//   if (loading && orders.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading kitchen orders...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         pauseOnHover
//       />
//       <header className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg sticky top-0 z-10">
//         <div className="px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-4">
//           <div className="flex items-center gap-3">
//             <div className="bg-white/20 p-2 rounded-lg">
//               <KitchenIcon className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-lg sm:text-xl font-bold">
//                 Kitchen Dashboard
//               </h1>
//               <p className="text-purple-200 text-xs sm:text-sm">
//                 Real-time order management with ingredients
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 sm:gap-3">
//             <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg text-xs">
//               {isConnected ? (
//                 <WifiIcon fontSize="small" />
//               ) : (
//                 <WifiOffIcon fontSize="small" />
//               )}
//               <span>{isConnected ? "Connected" : "Offline"}</span>
//             </div>
//             <button
//               onClick={() => setSoundEnabled(!soundEnabled)}
//               className={`p-2 rounded-full transition ${
//                 soundEnabled ? "bg-white/20" : "bg-white/10"
//               }`}
//             >
//               <AlertIcon className="text-white" />
//             </button>
//             <button
//               onClick={() => loadOrders()}
//               disabled={refreshing}
//               className={`p-2 rounded-full transition ${
//                 refreshing ? "animate-spin" : "hover:bg-white/20"
//               }`}
//             >
//               <RefreshIcon className="text-white" />
//             </button>
//             <div className="bg-white/20 px-2 sm:px-3 py-2 rounded-lg text-xs">
//               Last: {lastRefresh.toLocaleTimeString()}
//             </div>
//             <button
//               onClick={handleLogout}
//               className="bg-white/20 px-3 py-2 rounded-lg text-sm hover:bg-white/30 flex items-center gap-1"
//             >
//               <LogoutIcon fontSize="small" /> Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <ConnectionStatusBanner
//         isConnected={isConnected}
//         onRetry={() => loadOrders()}
//       />

//       <div className="p-4 sm:p-6 pb-2">
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
//           <StatCard
//             title="Pending"
//             value={stats.pendingOrders}
//             icon={<TimeIcon className="text-yellow-600" />}
//             color="border-yellow-500"
//             subtitle="New orders"
//           />
//           <StatCard
//             title="Confirmed"
//             value={stats.confirmedOrders}
//             icon={<CheckCircleIcon className="text-blue-600" />}
//             color="border-blue-500"
//             subtitle="Awaiting start"
//           />
//           <StatCard
//             title="In Progress"
//             value={stats.preparingOrders}
//             icon={<FireIcon className="text-purple-600" />}
//             color="border-purple-500"
//             subtitle="Cooking"
//           />
//           <StatCard
//             title="Ready"
//             value={stats.readyOrders}
//             icon={<DoneAllIcon className="text-green-600" />}
//             color="border-green-500"
//             subtitle="Awaiting pickup"
//           />
//           <StatCard
//             title="Completed"
//             value={stats.completedOrders}
//             icon={<CheckCircleIcon className="text-gray-600" />}
//             color="border-gray-500"
//           />
//           <StatCard
//             title="Completed Today"
//             value={stats.completedToday}
//             icon={<TrophyIcon className="text-teal-600" />}
//             color="border-teal-500"
//           />
//           <StatCard
//             title="Avg Prep Time"
//             value={`${stats.avgPreparationTime} min`}
//             icon={<SpeedIcon className="text-indigo-600" />}
//             color="border-indigo-500"
//           />
//         </div>
//       </div>

//       <div className="px-4 sm:px-6">
//         <div className="flex gap-2 overflow-x-auto pb-2">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
//                 activeTab === tab.id
//                   ? "bg-purple-600 text-white shadow-md"
//                   : "bg-white text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               {tab.icon}
//               <span className="text-sm">{tab.label}</span>
//               {tab.count !== undefined && tab.count > 0 && (
//                 <span
//                   className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
//                     activeTab === tab.id
//                       ? "bg-white/20"
//                       : "bg-purple-100 text-purple-600"
//                   }`}
//                 >
//                   {tab.count}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="px-4 sm:px-6 pt-4">
//         <div className="relative max-w-md">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
//           <input
//             type="text"
//             placeholder="Search by Order ID, Table, or Customer..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
//           />
//         </div>
//       </div>

//       <div className="p-4 sm:p-6">
//         {activeTab === "active" && (
//           <>
//             {preparingOrders.length > 0 && (
//               <div className="mb-6">
//                 <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
//                   <FireIcon className="text-purple-600" /> In Progress (
//                   {preparingOrders.length})
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//                   <AnimatePresence>
//                     {preparingOrders.map((order) => (
//                       <KitchenOrderCard
//                         key={order._id}
//                         order={order}
//                         onStartPreparation={startPreparation}
//                         onMarkReady={markAsReady}
//                         onUpdateStatus={updateOrderStatus}
//                         onViewDetails={setSelectedOrder}
//                       />
//                     ))}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             )}
//             {pendingOrders.length > 0 && (
//               <div>
//                 <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
//                   <TimeIcon className="text-yellow-600" /> Pending (
//                   {pendingOrders.length})
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//                   <AnimatePresence>
//                     {pendingOrders.map((order) => (
//                       <KitchenOrderCard
//                         key={order._id}
//                         order={order}
//                         onStartPreparation={startPreparation}
//                         onMarkReady={markAsReady}
//                         onUpdateStatus={updateOrderStatus}
//                         onViewDetails={setSelectedOrder}
//                       />
//                     ))}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             )}
//             {preparingOrders.length === 0 && pendingOrders.length === 0 && (
//               <div className="text-center py-12 bg-white rounded-xl">
//                 <KitchenIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//                 <p className="text-gray-500">
//                   No active orders. Kitchen is idle.
//                 </p>
//               </div>
//             )}
//           </>
//         )}
//         {(activeTab === "ready" ||
//           activeTab === "completed" ||
//           activeTab === "cancelled" ||
//           activeTab === "all") && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//             {filteredOrders.map((order) => (
//               <KitchenOrderCard
//                 key={order._id}
//                 order={order}
//                 onStartPreparation={startPreparation}
//                 onMarkReady={markAsReady}
//                 onUpdateStatus={updateOrderStatus}
//                 onViewDetails={setSelectedOrder}
//               />
//             ))}
//             {filteredOrders.length === 0 && (
//               <div className="col-span-full text-center py-12 bg-white rounded-xl">
//                 <OrdersIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//                 <p className="text-gray-500">No orders found.</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {selectedOrder && (
//         <OrderDetailsModal
//           order={selectedOrder}
//           onClose={() => setSelectedOrder(null)}
//           onStartPreparation={startPreparation}
//           onMarkReady={markAsReady}
//           onUpdateStatus={updateOrderStatus}
//         />
//       )}
//     </div>
//   );
// };

// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */

// // ChefDashboard.jsx
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import {
//   Kitchen as KitchenIcon,
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
//   Person as PersonIcon,
//   TableRestaurant as TableIcon,
//   HealthAndSafety as HealthIcon,
//   Close as CloseIcon,
//   PlayArrow as StartIcon,
//   Fastfood as FoodIcon,
//   NoteAlt as NoteIcon,
//   Settings as SettingsIcon,
//   WifiOff as WifiOffIcon,
//   Wifi as WifiIcon,
//   ListAlt as ListAltIcon,
//   Egg as EggIcon,
//   Grass as GrassIcon,
//   LocalDrink as DrinkIcon,
//   Science as ScienceIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// // ========== API CONFIGURATION ==========
// const API_BASE_URL = "https://nutriscan-foodanddrinksupply.onrender.com";

// // Create axios instance with default config
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 30000,
// });

// // Add request interceptor for auth token
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add response interceptor for error handling
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.code === "ECONNABORTED") {
//       console.error("Request timeout - server took too long to respond");
//     } else if (error.response) {
//       console.error(`API Error ${error.response.status}:`, error.response.data);
//       if (error.response.status === 401) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         window.location.href = "/login";
//       }
//     } else if (error.request) {
//       console.error("No response received from server");
//     } else {
//       console.error("Request error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// // ========== CACHE FOR MENU ITEMS ==========
// let menuItemsCache = null;
// let menuItemsListCache = null;

// // Fetch all menu items (foods) from API to get ingredients
// const fetchMenuItems = async () => {
//   if (menuItemsCache) return menuItemsCache;
//   try {
//     const response = await apiClient.get("/foods");
//     let foods = [];
//     if (response.data?.success && response.data.foods) {
//       foods = response.data.foods;
//     } else if (Array.isArray(response.data)) {
//       foods = response.data;
//     } else if (response.data?.data && Array.isArray(response.data.data)) {
//       foods = response.data.data;
//     }

//     // Create a map for quick lookup by name (case insensitive)
//     const menuMap = new Map();
//     foods.forEach((food) => {
//       menuMap.set(food.name.toLowerCase(), food);
//       if (food._id) menuMap.set(food._id, food);
//     });
//     menuItemsCache = menuMap;
//     menuItemsListCache = foods;
//     return menuMap;
//   } catch (error) {
//     console.error("Error fetching menu items:", error);
//     return new Map();
//   }
// };

// // Get all menu items list
// export const getAllMenuItems = async () => {
//   if (menuItemsListCache) return menuItemsListCache;
//   await fetchMenuItems();
//   return menuItemsListCache || [];
// };

// // Enrich order item with full ingredient details from menu
// const enrichOrderItemWithIngredients = async (orderItem, menuMap) => {
//   const itemName = orderItem.name?.toLowerCase();
//   const menuItem = menuMap.get(itemName);

//   if (menuItem) {
//     return {
//       ...orderItem,
//       fullIngredients: menuItem.ingredients || [],
//       nutritionalInfo: menuItem.nutritionalInfo || {},
//       purineLevel: menuItem.purineLevel,
//       containsGluten: menuItem.containsGluten,
//       containsPeanuts: menuItem.containsPeanuts,
//       containsShellfish: menuItem.containsShellfish,
//       containsDairy: menuItem.containsDairy,
//       highSalt: menuItem.highSalt,
//       refluxTriggers: menuItem.refluxTriggers || [],
//       migraineTriggers: menuItem.migraineTriggers || [],
//       image: menuItem.image,
//       description: menuItem.description,
//       category: menuItem.category,
//       prepTime: menuItem.prepTime,
//     };
//   }

//   return {
//     ...orderItem,
//     fullIngredients: [],
//     nutritionalInfo: {},
//     purineLevel: "unknown",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     highSalt: false,
//     refluxTriggers: [],
//     migraineTriggers: [],
//   };
// };

// // Transform API order to local component structure
// const transformOrder = async (apiOrder, menuMap) => {
//   let status = apiOrder.status || "pending";
//   if (apiOrder.bookingDetails?.currentStatus) {
//     status = apiOrder.bookingDetails.currentStatus;
//   }

//   let startedAt = null;
//   let completedAt = null;
//   if (apiOrder.bookingDetails?.statusHistory) {
//     const preparingEntry = apiOrder.bookingDetails.statusHistory.find(
//       (h) => h.status === "preparing"
//     );
//     if (preparingEntry) startedAt = preparingEntry.timestamp;

//     const completedEntry = apiOrder.bookingDetails.statusHistory.find(
//       (h) => h.status === "ready" || h.status === "completed"
//     );
//     if (completedEntry) completedAt = completedEntry.timestamp;
//   }

//   const enrichedItems = await Promise.all(
//     (apiOrder.items || []).map(async (item) => {
//       const enriched = await enrichOrderItemWithIngredients(item, menuMap);
//       return enriched;
//     })
//   );

//   const totalPrepTime =
//     enrichedItems.reduce(
//       (sum, item) => sum + (item.preparationTime || item.prepTime || 15),
//       0
//     ) || 20;

//   const totalAmount =
//     enrichedItems.reduce(
//       (sum, item) =>
//         sum +
//         (item.finalPrice || item.originalPrice || 0) * (item.quantity || 1),
//       0
//     ) || 0;

//   const allCustomizations = [];
//   const allSpecialInstructions = [];
//   enrichedItems.forEach((item) => {
//     if (item.customizations?.length) {
//       allCustomizations.push(...item.customizations);
//     }
//     if (item.specialInstructions) {
//       allSpecialInstructions.push({
//         itemName: item.name,
//         instruction: item.specialInstructions,
//       });
//     }
//   });

//   return {
//     _id: apiOrder._id,
//     orderId: apiOrder.orderId,
//     requestId: apiOrder.requestId,
//     tableNumber: apiOrder.personDetails?.tableNumber || "Unknown",
//     customerName: apiOrder.personDetails?.name || "Guest",
//     orderType: apiOrder.personDetails?.orderType || "dine-in",
//     status: status,
//     items: enrichedItems,
//     notes: apiOrder.notes || "",
//     specialInstructions: apiOrder.bookingDetails?.specialInstructions || "",
//     estimatedPickupTime: apiOrder.bookingDetails?.estimatedPickupTime,
//     createdAt: apiOrder.createdAt,
//     updatedAt: apiOrder.updatedAt,
//     startedAt: startedAt,
//     completedAt: completedAt,
//     estimatedTime: totalPrepTime,
//     totalAmount: totalAmount,
//     statusHistory: apiOrder.bookingDetails?.statusHistory || [],
//     allCustomizations: allCustomizations,
//     allSpecialInstructions: allSpecialInstructions,
//     autoProgress: apiOrder.autoProgress || false,
//   };
// };

// // Fetch orders from API with enriched ingredients
// const fetchOrdersFromAPI = async (retryCount = 0, maxRetries = 3) => {
//   try {
//     const menuMap = await fetchMenuItems();
//     const response = await apiClient.get("/orders");

//     const result = response.data;
//     let ordersArray = [];

//     if (result.success && Array.isArray(result.data)) {
//       ordersArray = result.data;
//     } else if (Array.isArray(result)) {
//       ordersArray = result;
//     } else if (result.orders && Array.isArray(result.orders)) {
//       ordersArray = result.orders;
//     }

//     const transformedOrders = await Promise.all(
//       ordersArray.map((order) => transformOrder(order, menuMap))
//     );

//     return transformedOrders;
//   } catch (error) {
//     console.error(`Fetch attempt ${retryCount + 1} failed:`, error.message);

//     if (
//       retryCount < maxRetries &&
//       (error.code === "ECONNABORTED" || !error.response)
//     ) {
//       const delay = 2000 * (retryCount + 1);
//       console.log(`Retrying in ${delay}ms...`);
//       await new Promise((resolve) => setTimeout(resolve, delay));
//       return fetchOrdersFromAPI(retryCount + 1, maxRetries);
//     }

//     throw error;
//   }
// };

// // FIXED: Update order status via API using orderId (custom order ID)
// const updateOrderStatusAPI = async (orderId, newStatus) => {
//   try {
//     const response = await apiClient.patch(`/orders/${orderId}/status`, {
//       status: newStatus,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     throw error;
//   }
// };

// // ========== INGREDIENT BADGE COMPONENT ==========
// const IngredientBadge = ({ ingredient }) => (
//   <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs border border-amber-200">
//     <GrassIcon fontSize="inherit" className="text-amber-500" />
//     {ingredient}
//   </span>
// );

// // ========== KITCHEN ORDER CARD COMPONENT ==========
// const KitchenOrderCard = ({
//   order,
//   onStartPreparation,
//   onMarkReady,
//   onUpdateStatus,
//   onViewDetails,
// }) => {
//   const [timeElapsed, setTimeElapsed] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [showIngredients, setShowIngredients] = useState(false);

//   useEffect(() => {
//     if (order.status === "preparing" && order.startedAt) {
//       const interval = setInterval(() => {
//         const elapsed = Math.floor(
//           (Date.now() - new Date(order.startedAt)) / 60000
//         );
//         setTimeElapsed(elapsed);
//       }, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [order.status, order.startedAt]);

//   const getPriorityColor = () => {
//     const elapsed = timeElapsed;
//     const estimatedTime = order.estimatedTime || 20;
//     if (elapsed > estimatedTime) return "border-red-500 bg-red-50";
//     if (elapsed > estimatedTime * 0.7) return "border-yellow-500 bg-yellow-50";
//     return "border-green-500 bg-green-50";
//   };

//   const getStatusBadge = () => {
//     switch (order.status) {
//       case "pending":
//         return (
//           <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <TimeIcon className="text-yellow-600 text-sm" /> Pending
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
//       case "completed":
//         return (
//           <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <CheckCircleIcon className="text-gray-600 text-sm" /> Completed
//           </span>
//         );
//       case "cancelled":
//         return (
//           <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <CancelIcon className="text-red-600 text-sm" /> Cancelled
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

//   const getAllIngredients = () => {
//     const allIngredients = [];
//     order.items?.forEach((item) => {
//       if (item.fullIngredients && item.fullIngredients.length > 0) {
//         allIngredients.push(...item.fullIngredients);
//       }
//     });
//     return [...new Set(allIngredients)];
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, x: -100 }}
//       whileHover={{ scale: 1.02 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${getPriorityColor()} transition-all duration-300 ${
//         isHovered ? "shadow-xl" : ""
//       }`}
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
//                 <PersonIcon fontSize="small" /> {order.customerName}
//               </span>
//               <span className="flex items-center gap-1 text-xs text-gray-400">
//                 {order.orderType}
//               </span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="flex items-center gap-1 text-orange-600 font-bold">
//               <TimerIcon fontSize="small" />
//               <span>{order.estimatedTime} min est.</span>
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
//         <div className="space-y-3 max-h-60 overflow-y-auto">
//           {order.items?.map((item, idx) => (
//             <div
//               key={idx}
//               className="text-sm border-b border-gray-100 pb-3 last:border-0"
//             >
//               <div className="flex justify-between flex-wrap gap-2">
//                 <span className="font-medium">
//                   {item.quantity}x {item.name}
//                 </span>
//                 <span className="text-gray-500">
//                   {item.preparationTime || item.prepTime || 15} min
//                 </span>
//               </div>

//               {item.fullIngredients && item.fullIngredients.length > 0 && (
//                 <div className="mt-2">
//                   <button
//                     onClick={() => setShowIngredients(!showIngredients)}
//                     className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium"
//                   >
//                     <ListAltIcon fontSize="inherit" />
//                     {showIngredients ? "Hide" : "Show"} Ingredients (
//                     {item.fullIngredients.length})
//                   </button>
//                   {showIngredients && (
//                     <div className="mt-2 p-2 bg-emerald-50 rounded-lg">
//                       <p className="text-xs font-medium text-emerald-700 mb-1.5 flex items-center gap-1">
//                         <ScienceIcon fontSize="small" /> Required Ingredients:
//                       </p>
//                       <div className="flex flex-wrap gap-1.5">
//                         {item.fullIngredients.map((ing, i) => (
//                           <IngredientBadge key={i} ingredient={ing} />
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {(item.containsGluten ||
//                 item.containsPeanuts ||
//                 item.containsShellfish ||
//                 item.containsDairy) && (
//                 <div className="mt-1 flex flex-wrap gap-1">
//                   {item.containsGluten && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                       ⚠️ Gluten
//                     </span>
//                   )}
//                   {item.containsPeanuts && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                       ⚠️ Peanuts
//                     </span>
//                   )}
//                   {item.containsShellfish && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                       ⚠️ Shellfish
//                     </span>
//                   )}
//                   {item.containsDairy && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                       ⚠️ Dairy
//                     </span>
//                   )}
//                 </div>
//               )}

//               {item.customizations?.length > 0 && (
//                 <div className="text-xs text-orange-600 mt-1">
//                   ✨ Custom: {item.customizations.join(", ")}
//                 </div>
//               )}

//               {item.specialInstructions && (
//                 <div className="text-xs text-blue-600 mt-1">
//                   📝 {item.specialInstructions}
//                 </div>
//               )}

//               <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>
//                   RWF{" "}
//                   {(
//                     (item.finalPrice || item.originalPrice || 0) *
//                     (item.quantity || 1)
//                   ).toLocaleString()}
//                 </span>
//                 {item.purineLevel && item.purineLevel !== "unknown" && (
//                   <span
//                     className={`px-1.5 py-0.5 rounded-full text-xs ${
//                       item.purineLevel === "low"
//                         ? "bg-green-100 text-green-700"
//                         : item.purineLevel === "moderate"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {item.purineLevel} purine
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {getAllIngredients().length > 0 && (
//           <div className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
//             <p className="text-xs font-medium text-amber-700 mb-1 flex items-center gap-1">
//               <ListAltIcon fontSize="small" /> All Ingredients Needed:
//             </p>
//             <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
//               {getAllIngredients()
//                 .slice(0, 8)
//                 .map((ing, i) => (
//                   <span
//                     key={i}
//                     className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full"
//                   >
//                     {ing}
//                   </span>
//                 ))}
//               {getAllIngredients().length > 8 && (
//                 <span className="text-xs text-gray-400">
//                   +{getAllIngredients().length - 8} more
//                 </span>
//               )}
//             </div>
//           </div>
//         )}

//         {order.notes && (
//           <div className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
//             <div className="text-xs text-gray-600 flex items-start gap-1">
//               <NoteIcon fontSize="small" className="text-gray-400" />
//               <span className="font-medium">Notes:</span> {order.notes}
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="p-4 border-t bg-gray-50 flex gap-2 flex-wrap">
//         <select
//           value={order.status}
//           onChange={(e) => onUpdateStatus(order, e.target.value)}
//           className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-purple-500"
//         >
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="preparing">Preparing</option>
//           <option value="ready">Ready</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>

//         {(order.status === "pending" || order.status === "confirmed") && (
//           <button
//             onClick={() => onStartPreparation(order)}
//             className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition flex items-center justify-center gap-2"
//           >
//             <StartIcon fontSize="small" /> Start Cooking
//           </button>
//         )}
//         {order.status === "preparing" && (
//           <button
//             onClick={() => onMarkReady(order)}
//             className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition flex items-center justify-center gap-2"
//           >
//             <DoneAllIcon fontSize="small" /> Mark Ready
//           </button>
//         )}
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
//   onUpdateStatus,
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
//       case "completed":
//         return "bg-gray-100 text-gray-800";
//       case "cancelled":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getAllIngredients = () => {
//     const allIngredients = [];
//     order.items?.forEach((item) => {
//       if (item.fullIngredients && item.fullIngredients.length > 0) {
//         allIngredients.push(...item.fullIngredients);
//       }
//     });
//     return [...new Set(allIngredients)];
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//       >
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
//           <div>
//             <h2 className="text-white font-bold text-xl">Order Details</h2>
//             <p className="text-purple-200 text-sm">
//               Kitchen View - Full Ingredients
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-white/20 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>

//         <div className="p-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
//             <div>
//               <p className="text-xs text-gray-500">Order ID</p>
//               <p className="font-mono font-medium text-sm">
//                 {order.orderId?.slice(-12)}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Table</p>
//               <p className="font-medium text-lg">Table {order.tableNumber}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Customer</p>
//               <p className="font-medium">{order.customerName}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Status</p>
//               <span
//                 className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//                   order.status
//                 )}`}
//               >
//                 {order.status}
//               </span>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Created</p>
//               <p className="font-medium text-sm">
//                 {new Date(order.createdAt).toLocaleString()}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Est. Prep Time</p>
//               <p className="font-medium">{order.estimatedTime} minutes</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Total Amount</p>
//               <p className="font-medium text-orange-600">
//                 RWF {order.totalAmount?.toLocaleString() || 0}
//               </p>
//             </div>
//           </div>

//           <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
//             <FoodIcon fontSize="small" /> Items to Prepare
//           </h3>
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
//                     <p className="text-xs text-gray-400 mt-1">
//                       Prep: {item.preparationTime || item.prepTime || 15} min
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-orange-600">
//                       RWF{" "}
//                       {(
//                         (item.finalPrice || item.originalPrice) *
//                         (item.quantity || 1)
//                       ).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>

//                 {item.fullIngredients && item.fullIngredients.length > 0 && (
//                   <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
//                     <p className="text-xs font-bold text-emerald-700 flex items-center gap-1 mb-2">
//                       <ScienceIcon fontSize="small" /> Ingredients for{" "}
//                       {item.name}:
//                     </p>
//                     <div className="flex flex-wrap gap-1.5">
//                       {item.fullIngredients.map((ing, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full"
//                         >
//                           {ing}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {(item.containsGluten ||
//                   item.containsPeanuts ||
//                   item.containsShellfish ||
//                   item.containsDairy ||
//                   item.highSalt) && (
//                   <div className="mt-2 p-2 bg-red-50 rounded-lg">
//                     <p className="text-xs font-medium text-red-700 flex items-center gap-1">
//                       <WarningIcon fontSize="small" /> Allergen Info:
//                     </p>
//                     <div className="flex flex-wrap gap-1 mt-1">
//                       {item.containsGluten && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           Gluten
//                         </span>
//                       )}
//                       {item.containsPeanuts && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           Peanuts
//                         </span>
//                       )}
//                       {item.containsShellfish && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           Shellfish
//                         </span>
//                       )}
//                       {item.containsDairy && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           Dairy
//                         </span>
//                       )}
//                       {item.highSalt && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           High Salt
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {(item.refluxTriggers?.length > 0 ||
//                   item.migraineTriggers?.length > 0) && (
//                   <div className="mt-2 p-2 bg-orange-50 rounded-lg">
//                     <p className="text-xs font-medium text-orange-700">
//                       Health Triggers:
//                     </p>
//                     <div className="flex flex-wrap gap-1 mt-0.5">
//                       {item.refluxTriggers?.map((t, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded"
//                         >
//                           Reflux: {t}
//                         </span>
//                       ))}
//                       {item.migraineTriggers?.map((t, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded"
//                         >
//                           Migraine: {t}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {item.customizations?.length > 0 && (
//                   <div className="mt-2 p-2 bg-orange-50 rounded-lg">
//                     <p className="text-xs font-medium text-orange-700 flex items-center gap-1">
//                       <SettingsIcon fontSize="small" /> Customizations:
//                     </p>
//                     <div className="flex flex-wrap gap-1 mt-1">
//                       {item.customizations.map((c, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full"
//                         >
//                           {c}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {item.specialInstructions && (
//                   <div className="mt-2 p-2 bg-blue-50 rounded-lg">
//                     <p className="text-xs font-medium text-blue-700 flex items-center gap-1">
//                       <NoteIcon fontSize="small" /> Special Instructions:
//                     </p>
//                     <p className="text-xs text-blue-600 mt-0.5">
//                       {item.specialInstructions}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {getAllIngredients().length > 0 && (
//             <div className="mb-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
//               <p className="text-sm font-bold text-amber-800 flex items-center gap-2 mb-2">
//                 <ListAltIcon /> Complete Shopping List for this Order
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {getAllIngredients().map((ing, i) => (
//                   <span
//                     key={i}
//                     className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-sm"
//                   >
//                     {ing}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {order.notes && (
//             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//               <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
//                 <NoteIcon fontSize="small" /> Order Notes
//               </p>
//               <p className="text-sm text-gray-600 mt-1">{order.notes}</p>
//             </div>
//           )}

//           <div className="flex gap-3 pt-4 border-t flex-wrap">
//             <button
//               onClick={onClose}
//               className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
//             >
//               Close
//             </button>
//             <select
//               value={order.status}
//               onChange={(e) => onUpdateStatus(order, e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
//             >
//               <option value="pending">Pending</option>
//               <option value="confirmed">Confirmed</option>
//               <option value="preparing">Preparing</option>
//               <option value="ready">Ready</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
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
//           className={`p-2 sm:p-3 rounded-full bg-${
//             color.split("-")[1]
//           }-100 bg-opacity-20`}
//         >
//           {icon}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ========== CONNECTION STATUS BANNER ==========
// const ConnectionStatusBanner = ({ isConnected, onRetry }) => {
//   if (isConnected) return null;
//   return (
//     <div className="mx-4 sm:mx-6 mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex justify-between items-center">
//       <div className="flex items-center gap-3">
//         <WifiOffIcon className="text-red-500" />
//         <div>
//           <p className="text-red-700 font-medium">Connection Error</p>
//           <p className="text-red-600 text-sm">Cannot connect to the server.</p>
//         </div>
//       </div>
//       <button
//         onClick={onRetry}
//         className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
//       >
//         Retry
//       </button>
//     </div>
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
//   const [isConnected, setIsConnected] = useState(true);
//   const [stats, setStats] = useState({
//     pendingOrders: 0,
//     confirmedOrders: 0,
//     preparingOrders: 0,
//     readyOrders: 0,
//     completedOrders: 0,
//     cancelledOrders: 0,
//     completedToday: 0,
//     avgPreparationTime: 0,
//     totalRevenue: 0,
//   });
//   const [soundEnabled, setSoundEnabled] = useState(true);
//   const [lastRefresh, setLastRefresh] = useState(new Date());
//   const [refreshing, setRefreshing] = useState(false);
//   const previousOrdersRef = useRef([]);

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   const playNotificationSound = useCallback(() => {
//     if (!soundEnabled) return;
//     try {
//       const audio = new Audio(
//         "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
//       );
//       audio.volume = 0.3;
//       audio.play().catch((e) => console.log("Audio play failed:", e));
//     } catch (error) {
//       console.log("Sound not supported");
//     }
//   }, [soundEnabled]);

//   const calculateStats = useCallback((ordersList) => {
//     const pending = ordersList.filter((o) => o.status === "pending").length;
//     const confirmed = ordersList.filter((o) => o.status === "confirmed").length;
//     const preparing = ordersList.filter((o) => o.status === "preparing").length;
//     const ready = ordersList.filter((o) => o.status === "ready").length;
//     const completed = ordersList.filter((o) => o.status === "completed").length;
//     const cancelled = ordersList.filter((o) => o.status === "cancelled").length;
//     const completedToday = ordersList.filter(
//       (o) =>
//         o.status === "completed" &&
//         new Date(o.createdAt).toDateString() === new Date().toDateString()
//     ).length;
//     const completedOrdersWithTimes = ordersList.filter(
//       (o) => o.status === "completed" && o.startedAt && o.completedAt
//     );
//     const avgTime =
//       completedOrdersWithTimes.length > 0
//         ? Math.round(
//             completedOrdersWithTimes.reduce((sum, o) => {
//               const start = new Date(o.startedAt);
//               const end = new Date(o.completedAt);
//               return sum + (end - start) / 60000;
//             }, 0) / completedOrdersWithTimes.length
//           )
//         : 0;
//     const totalRevenue = ordersList
//       .filter((o) => o.status === "ready" || o.status === "completed")
//       .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
//     setStats({
//       pendingOrders: pending,
//       confirmedOrders: confirmed,
//       preparingOrders: preparing,
//       readyOrders: ready,
//       completedOrders: completed,
//       cancelledOrders: cancelled,
//       completedToday,
//       avgPreparationTime: avgTime,
//       totalRevenue,
//     });
//   }, []);

//   const loadOrders = useCallback(
//     async (showLoading = true) => {
//       if (showLoading) setRefreshing(true);
//       try {
//         const apiOrders = await fetchOrdersFromAPI();
//         setOrders(apiOrders);
//         setLastRefresh(new Date());
//         setIsConnected(true);
//         setError(null);
//         calculateStats(apiOrders);
//         const previousOrders = previousOrdersRef.current;
//         const newOrders = apiOrders.filter(
//           (o) =>
//             (o.status === "pending" || o.status === "confirmed") &&
//             !previousOrders.some((prev) => prev._id === o._id)
//         );
//         if (newOrders.length > 0) {
//           playNotificationSound();
//           toast.info(
//             `${newOrders.length} new order${
//               newOrders.length > 1 ? "s" : ""
//             } received!`
//           );
//         }
//         previousOrdersRef.current = apiOrders;
//       } catch (error) {
//         console.error("Error loading orders:", error);
//         setIsConnected(false);
//         setError(error.message);
//         toast.error("Failed to load orders from server");
//       } finally {
//         setLoading(false);
//         setRefreshing(false);
//       }
//     },
//     [calculateStats, playNotificationSound]
//   );

//   // FIXED: Update order status using order.orderId (custom order ID)
//   const updateOrderStatus = async (order, newStatus) => {
//     try {
//       await updateOrderStatusAPI(order.orderId, newStatus);
//       toast.success(
//         `Order #${order.orderId?.slice(-8)} status updated to ${newStatus}`
//       );
//       await loadOrders(false);
//     } catch (error) {
//       toast.error("Failed to update order status");
//     }
//   };

//   const startPreparation = async (order) => {
//     await updateOrderStatus(order, "preparing");
//   };

//   const markAsReady = async (order) => {
//     await updateOrderStatus(order, "ready");
//     toast.success(`Order #${order.orderId?.slice(-8)} is ready for serving!`);
//   };

//   useEffect(() => {
//     loadOrders();
//     const interval = setInterval(() => loadOrders(false), 30000);
//     return () => clearInterval(interval);
//   }, [loadOrders]);

//   const getFilteredOrders = () => {
//     let filtered = orders;
//     if (activeTab === "active")
//       filtered = orders.filter((o) =>
//         ["pending", "confirmed", "preparing"].includes(o.status)
//       );
//     else if (activeTab === "ready")
//       filtered = orders.filter((o) => o.status === "ready");
//     else if (activeTab === "completed")
//       filtered = orders.filter((o) => o.status === "completed");
//     else if (activeTab === "cancelled")
//       filtered = orders.filter((o) => o.status === "cancelled");
//     else if (activeTab === "all") filtered = orders;
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (o) =>
//           o.orderId?.toLowerCase().includes(term) ||
//           o.tableNumber?.toString().includes(term) ||
//           o.customerName?.toLowerCase().includes(term)
//       );
//     }
//     return filtered.sort((a, b) => {
//       if (a.status === "preparing" && b.status !== "preparing") return -1;
//       if (a.status !== "preparing" && b.status === "preparing") return 1;
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });
//   };

//   const filteredOrders = getFilteredOrders();
//   const pendingOrders = filteredOrders.filter(
//     (o) => o.status === "pending" || o.status === "confirmed"
//   );
//   const preparingOrders = filteredOrders.filter(
//     (o) => o.status === "preparing"
//   );
//   const tabs = [
//     {
//       id: "active",
//       label: "Active Orders",
//       icon: <FireIcon />,
//       count:
//         stats.pendingOrders + stats.confirmedOrders + stats.preparingOrders,
//     },
//     {
//       id: "ready",
//       label: "Ready",
//       icon: <DoneAllIcon />,
//       count: stats.readyOrders,
//     },
//     {
//       id: "completed",
//       label: "Completed",
//       icon: <CheckCircleIcon />,
//       count: stats.completedOrders,
//     },
//     {
//       id: "cancelled",
//       label: "Cancelled",
//       icon: <CancelIcon />,
//       count: stats.cancelledOrders,
//     },
//     { id: "all", label: "All Orders", icon: <OrdersIcon /> },
//   ];

//   if (loading && orders.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading kitchen orders...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         pauseOnHover
//       />
//       <header className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg sticky top-0 z-10">
//         <div className="px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-4">
//           <div className="flex items-center gap-3">
//             <div className="bg-white/20 p-2 rounded-lg">
//               <KitchenIcon className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-lg sm:text-xl font-bold">
//                 Kitchen Dashboard
//               </h1>
//               <p className="text-purple-200 text-xs sm:text-sm">
//                 Real-time order management with ingredients
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 sm:gap-3">
//             <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg text-xs">
//               {isConnected ? (
//                 <WifiIcon fontSize="small" />
//               ) : (
//                 <WifiOffIcon fontSize="small" />
//               )}
//               <span>{isConnected ? "Connected" : "Offline"}</span>
//             </div>
//             <button
//               onClick={() => setSoundEnabled(!soundEnabled)}
//               className={`p-2 rounded-full transition ${
//                 soundEnabled ? "bg-white/20" : "bg-white/10"
//               }`}
//             >
//               <AlertIcon className="text-white" />
//             </button>
//             <button
//               onClick={() => loadOrders()}
//               disabled={refreshing}
//               className={`p-2 rounded-full transition ${
//                 refreshing ? "animate-spin" : "hover:bg-white/20"
//               }`}
//             >
//               <RefreshIcon className="text-white" />
//             </button>
//             <div className="bg-white/20 px-2 sm:px-3 py-2 rounded-lg text-xs">
//               Last: {lastRefresh.toLocaleTimeString()}
//             </div>
//             <button
//               onClick={handleLogout}
//               className="bg-white/20 px-3 py-2 rounded-lg text-sm hover:bg-white/30 flex items-center gap-1"
//             >
//               <LogoutIcon fontSize="small" /> Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <ConnectionStatusBanner
//         isConnected={isConnected}
//         onRetry={() => loadOrders()}
//       />

//       <div className="p-4 sm:p-6 pb-2">
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
//           <StatCard
//             title="Pending"
//             value={stats.pendingOrders}
//             icon={<TimeIcon className="text-yellow-600" />}
//             color="border-yellow-500"
//             subtitle="New orders"
//           />
//           <StatCard
//             title="Confirmed"
//             value={stats.confirmedOrders}
//             icon={<CheckCircleIcon className="text-blue-600" />}
//             color="border-blue-500"
//             subtitle="Awaiting start"
//           />
//           <StatCard
//             title="In Progress"
//             value={stats.preparingOrders}
//             icon={<FireIcon className="text-purple-600" />}
//             color="border-purple-500"
//             subtitle="Cooking"
//           />
//           <StatCard
//             title="Ready"
//             value={stats.readyOrders}
//             icon={<DoneAllIcon className="text-green-600" />}
//             color="border-green-500"
//             subtitle="Awaiting pickup"
//           />
//           <StatCard
//             title="Completed"
//             value={stats.completedOrders}
//             icon={<CheckCircleIcon className="text-gray-600" />}
//             color="border-gray-500"
//           />
//           <StatCard
//             title="Completed Today"
//             value={stats.completedToday}
//             icon={<TrophyIcon className="text-teal-600" />}
//             color="border-teal-500"
//           />
//           <StatCard
//             title="Avg Prep Time"
//             value={`${stats.avgPreparationTime} min`}
//             icon={<SpeedIcon className="text-indigo-600" />}
//             color="border-indigo-500"
//           />
//         </div>
//       </div>

//       <div className="px-4 sm:px-6">
//         <div className="flex gap-2 overflow-x-auto pb-2">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
//                 activeTab === tab.id
//                   ? "bg-purple-600 text-white shadow-md"
//                   : "bg-white text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               {tab.icon}
//               <span className="text-sm">{tab.label}</span>
//               {tab.count !== undefined && tab.count > 0 && (
//                 <span
//                   className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
//                     activeTab === tab.id
//                       ? "bg-white/20"
//                       : "bg-purple-100 text-purple-600"
//                   }`}
//                 >
//                   {tab.count}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="px-4 sm:px-6 pt-4">
//         <div className="relative max-w-md">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
//           <input
//             type="text"
//             placeholder="Search by Order ID, Table, or Customer..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
//           />
//         </div>
//       </div>

//       <div className="p-4 sm:p-6">
//         {activeTab === "active" && (
//           <>
//             {preparingOrders.length > 0 && (
//               <div className="mb-6">
//                 <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
//                   <FireIcon className="text-purple-600" /> In Progress (
//                   {preparingOrders.length})
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//                   <AnimatePresence>
//                     {preparingOrders.map((order) => (
//                       <KitchenOrderCard
//                         key={order._id}
//                         order={order}
//                         onStartPreparation={startPreparation}
//                         onMarkReady={markAsReady}
//                         onUpdateStatus={updateOrderStatus}
//                         onViewDetails={setSelectedOrder}
//                       />
//                     ))}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             )}
//             {pendingOrders.length > 0 && (
//               <div>
//                 <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
//                   <TimeIcon className="text-yellow-600" /> Pending (
//                   {pendingOrders.length})
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//                   <AnimatePresence>
//                     {pendingOrders.map((order) => (
//                       <KitchenOrderCard
//                         key={order._id}
//                         order={order}
//                         onStartPreparation={startPreparation}
//                         onMarkReady={markAsReady}
//                         onUpdateStatus={updateOrderStatus}
//                         onViewDetails={setSelectedOrder}
//                       />
//                     ))}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             )}
//             {preparingOrders.length === 0 && pendingOrders.length === 0 && (
//               <div className="text-center py-12 bg-white rounded-xl">
//                 <KitchenIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//                 <p className="text-gray-500">
//                   No active orders. Kitchen is idle.
//                 </p>
//               </div>
//             )}
//           </>
//         )}
//         {(activeTab === "ready" ||
//           activeTab === "completed" ||
//           activeTab === "cancelled" ||
//           activeTab === "all") && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//             {filteredOrders.map((order) => (
//               <KitchenOrderCard
//                 key={order._id}
//                 order={order}
//                 onStartPreparation={startPreparation}
//                 onMarkReady={markAsReady}
//                 onUpdateStatus={updateOrderStatus}
//                 onViewDetails={setSelectedOrder}
//               />
//             ))}
//             {filteredOrders.length === 0 && (
//               <div className="col-span-full text-center py-12 bg-white rounded-xl">
//                 <OrdersIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//                 <p className="text-gray-500">No orders found.</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {selectedOrder && (
//         <OrderDetailsModal
//           order={selectedOrder}
//           onClose={() => setSelectedOrder(null)}
//           onStartPreparation={startPreparation}
//           onMarkReady={markAsReady}
//           onUpdateStatus={updateOrderStatus}
//         />
//       )}
//     </div>
//   );
// };

// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */

// // ChefDashboard.jsx
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import {
//   Kitchen as KitchenIcon,
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
//   Person as PersonIcon,
//   TableRestaurant as TableIcon,
//   Close as CloseIcon,
//   PlayArrow as StartIcon,
//   Fastfood as FoodIcon,
//   NoteAlt as NoteIcon,
//   Settings as SettingsIcon,
//   ListAlt as ListAltIcon,
//   Grass as GrassIcon,
//   Science as ScienceIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// // ========== API CONFIGURATION ==========
// const API_BASE_URL = "https://nutriscan-foodanddrinksupply.onrender.com";

// // Create axios instance with default config
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 30000,
// });

// // Add request interceptor for auth token
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add response interceptor for error handling
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.code === "ECONNABORTED") {
//       console.error("Request timeout - server took too long to respond");
//     } else if (error.response) {
//       console.error(`API Error ${error.response.status}:`, error.response.data);
//       if (error.response.status === 401) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         window.location.href = "/login";
//       }
//     } else if (error.request) {
//       console.error("No response received from server");
//     } else {
//       console.error("Request error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// // ========== CACHE FOR MENU ITEMS ==========
// let menuItemsCache = null;
// let menuItemsListCache = null;

// // Fetch all menu items (foods) from API to get ingredients
// const fetchMenuItems = async () => {
//   if (menuItemsCache) return menuItemsCache;
//   try {
//     const response = await apiClient.get("/foods");
//     let foods = [];
//     if (response.data?.success && response.data.foods) {
//       foods = response.data.foods;
//     } else if (Array.isArray(response.data)) {
//       foods = response.data;
//     } else if (response.data?.data && Array.isArray(response.data.data)) {
//       foods = response.data.data;
//     }

//     // Create a map for quick lookup by name (case insensitive)
//     const menuMap = new Map();
//     foods.forEach((food) => {
//       menuMap.set(food.name.toLowerCase(), food);
//       if (food._id) menuMap.set(food._id, food);
//     });
//     menuItemsCache = menuMap;
//     menuItemsListCache = foods;
//     return menuMap;
//   } catch (error) {
//     console.error("Error fetching menu items:", error);
//     return new Map();
//   }
// };

// // Get all menu items list
// export const getAllMenuItems = async () => {
//   if (menuItemsListCache) return menuItemsListCache;
//   await fetchMenuItems();
//   return menuItemsListCache || [];
// };

// // Enrich order item with full ingredient details from menu
// const enrichOrderItemWithIngredients = async (orderItem, menuMap) => {
//   const itemName = orderItem.name?.toLowerCase();
//   const menuItem = menuMap.get(itemName);

//   if (menuItem) {
//     return {
//       ...orderItem,
//       fullIngredients: menuItem.ingredients || [],
//       nutritionalInfo: menuItem.nutritionalInfo || {},
//       purineLevel: menuItem.purineLevel,
//       containsGluten: menuItem.containsGluten,
//       containsPeanuts: menuItem.containsPeanuts,
//       containsShellfish: menuItem.containsShellfish,
//       containsDairy: menuItem.containsDairy,
//       highSalt: menuItem.highSalt,
//       refluxTriggers: menuItem.refluxTriggers || [],
//       migraineTriggers: menuItem.migraineTriggers || [],
//       image: menuItem.image,
//       description: menuItem.description,
//       category: menuItem.category,
//       prepTime: menuItem.prepTime,
//     };
//   }

//   return {
//     ...orderItem,
//     fullIngredients: [],
//     nutritionalInfo: {},
//     purineLevel: "unknown",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     highSalt: false,
//     refluxTriggers: [],
//     migraineTriggers: [],
//   };
// };

// // Transform API order to local component structure
// const transformOrder = async (apiOrder, menuMap) => {
//   let status = apiOrder.status || "pending";
//   if (apiOrder.bookingDetails?.currentStatus) {
//     status = apiOrder.bookingDetails.currentStatus;
//   }

//   let startedAt = null;
//   let completedAt = null;
//   if (apiOrder.bookingDetails?.statusHistory) {
//     const preparingEntry = apiOrder.bookingDetails.statusHistory.find(
//       (h) => h.status === "preparing"
//     );
//     if (preparingEntry) startedAt = preparingEntry.timestamp;

//     const completedEntry = apiOrder.bookingDetails.statusHistory.find(
//       (h) => h.status === "ready" || h.status === "completed"
//     );
//     if (completedEntry) completedAt = completedEntry.timestamp;
//   }

//   const enrichedItems = await Promise.all(
//     (apiOrder.items || []).map(async (item) => {
//       const enriched = await enrichOrderItemWithIngredients(item, menuMap);
//       return enriched;
//     })
//   );

//   const totalPrepTime =
//     enrichedItems.reduce(
//       (sum, item) => sum + (item.preparationTime || item.prepTime || 15),
//       0
//     ) || 20;

//   const totalAmount =
//     enrichedItems.reduce(
//       (sum, item) =>
//         sum +
//         (item.finalPrice || item.originalPrice || 0) * (item.quantity || 1),
//       0
//     ) || 0;

//   const allCustomizations = [];
//   const allSpecialInstructions = [];
//   enrichedItems.forEach((item) => {
//     if (item.customizations?.length) {
//       allCustomizations.push(...item.customizations);
//     }
//     if (item.specialInstructions) {
//       allSpecialInstructions.push({
//         itemName: item.name,
//         instruction: item.specialInstructions,
//       });
//     }
//   });

//   return {
//     _id: apiOrder._id,
//     orderId: apiOrder.orderId,
//     requestId: apiOrder.requestId,
//     tableNumber: apiOrder.personDetails?.tableNumber || "Unknown",
//     customerName: apiOrder.personDetails?.name || "Guest",
//     orderType: apiOrder.personDetails?.orderType || "dine-in",
//     status: status,
//     items: enrichedItems,
//     notes: apiOrder.notes || "",
//     specialInstructions: apiOrder.bookingDetails?.specialInstructions || "",
//     estimatedPickupTime: apiOrder.bookingDetails?.estimatedPickupTime,
//     createdAt: apiOrder.createdAt,
//     updatedAt: apiOrder.updatedAt,
//     startedAt: startedAt,
//     completedAt: completedAt,
//     estimatedTime: totalPrepTime,
//     totalAmount: totalAmount,
//     statusHistory: apiOrder.bookingDetails?.statusHistory || [],
//     allCustomizations: allCustomizations,
//     allSpecialInstructions: allSpecialInstructions,
//     autoProgress: apiOrder.autoProgress || false,
//   };
// };

// // Fetch orders from API with enriched ingredients
// const fetchOrdersFromAPI = async (retryCount = 0, maxRetries = 3) => {
//   try {
//     const menuMap = await fetchMenuItems();
//     const response = await apiClient.get("/orders");

//     const result = response.data;
//     let ordersArray = [];

//     if (result.success && Array.isArray(result.data)) {
//       ordersArray = result.data;
//     } else if (Array.isArray(result)) {
//       ordersArray = result;
//     } else if (result.orders && Array.isArray(result.orders)) {
//       ordersArray = result.orders;
//     }

//     const transformedOrders = await Promise.all(
//       ordersArray.map((order) => transformOrder(order, menuMap))
//     );

//     return transformedOrders;
//   } catch (error) {
//     console.error(`Fetch attempt ${retryCount + 1} failed:`, error.message);

//     if (
//       retryCount < maxRetries &&
//       (error.code === "ECONNABORTED" || !error.response)
//     ) {
//       const delay = 2000 * (retryCount + 1);
//       console.log(`Retrying in ${delay}ms...`);
//       await new Promise((resolve) => setTimeout(resolve, delay));
//       return fetchOrdersFromAPI(retryCount + 1, maxRetries);
//     }

//     throw error;
//   }
// };

// // Update order status via API using orderId (custom order ID)
// const updateOrderStatusAPI = async (orderId, newStatus) => {
//   try {
//     const response = await apiClient.patch(`/orders/${orderId}/status`, {
//       status: newStatus,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     throw error;
//   }
// };

// // ========== INGREDIENT BADGE COMPONENT ==========
// const IngredientBadge = ({ ingredient }) => (
//   <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs border border-amber-200">
//     <GrassIcon fontSize="inherit" className="text-amber-500" />
//     {ingredient}
//   </span>
// );

// // ========== KITCHEN ORDER CARD COMPONENT ==========
// const KitchenOrderCard = ({
//   order,
//   onStartPreparation,
//   onMarkReady,
//   onUpdateStatus,
//   onViewDetails,
// }) => {
//   const [timeElapsed, setTimeElapsed] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [showIngredients, setShowIngredients] = useState(false);

//   useEffect(() => {
//     if (order.status === "preparing" && order.startedAt) {
//       const interval = setInterval(() => {
//         const elapsed = Math.floor(
//           (Date.now() - new Date(order.startedAt)) / 60000
//         );
//         setTimeElapsed(elapsed);
//       }, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [order.status, order.startedAt]);

//   const getPriorityColor = () => {
//     const elapsed = timeElapsed;
//     const estimatedTime = order.estimatedTime || 20;
//     if (elapsed > estimatedTime) return "border-red-500 bg-red-50";
//     if (elapsed > estimatedTime * 0.7) return "border-yellow-500 bg-yellow-50";
//     return "border-green-500 bg-green-50";
//   };

//   const getStatusBadge = () => {
//     switch (order.status) {
//       case "pending":
//         return (
//           <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <TimeIcon className="text-yellow-600 text-sm" /> Pending
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
//       case "completed":
//         return (
//           <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <CheckCircleIcon className="text-gray-600 text-sm" /> Completed
//           </span>
//         );
//       case "cancelled":
//         return (
//           <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <CancelIcon className="text-red-600 text-sm" /> Cancelled
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

//   const getAllIngredients = () => {
//     const allIngredients = [];
//     order.items?.forEach((item) => {
//       if (item.fullIngredients && item.fullIngredients.length > 0) {
//         allIngredients.push(...item.fullIngredients);
//       }
//     });
//     return [...new Set(allIngredients)];
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, x: -100 }}
//       whileHover={{ scale: 1.02 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${getPriorityColor()} transition-all duration-300 ${
//         isHovered ? "shadow-xl" : ""
//       }`}
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
//                 <PersonIcon fontSize="small" /> {order.customerName}
//               </span>
//               <span className="flex items-center gap-1 text-xs text-gray-400">
//                 {order.orderType}
//               </span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="flex items-center gap-1 text-orange-600 font-bold">
//               <TimerIcon fontSize="small" />
//               <span>{order.estimatedTime} min est.</span>
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
//         <div className="space-y-3 max-h-60 overflow-y-auto">
//           {order.items?.map((item, idx) => (
//             <div
//               key={idx}
//               className="text-sm border-b border-gray-100 pb-3 last:border-0"
//             >
//               <div className="flex justify-between flex-wrap gap-2">
//                 <span className="font-medium">
//                   {item.quantity}x {item.name}
//                 </span>
//                 <span className="text-gray-500">
//                   {item.preparationTime || item.prepTime || 15} min
//                 </span>
//               </div>

//               {item.fullIngredients && item.fullIngredients.length > 0 && (
//                 <div className="mt-2">
//                   <button
//                     onClick={() => setShowIngredients(!showIngredients)}
//                     className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium"
//                   >
//                     <ListAltIcon fontSize="inherit" />
//                     {showIngredients ? "Hide" : "Show"} Ingredients (
//                     {item.fullIngredients.length})
//                   </button>
//                   {showIngredients && (
//                     <div className="mt-2 p-2 bg-emerald-50 rounded-lg">
//                       <p className="text-xs font-medium text-emerald-700 mb-1.5 flex items-center gap-1">
//                         <ScienceIcon fontSize="small" /> Required Ingredients:
//                       </p>
//                       <div className="flex flex-wrap gap-1.5">
//                         {item.fullIngredients.map((ing, i) => (
//                           <IngredientBadge key={i} ingredient={ing} />
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {(item.containsGluten ||
//                 item.containsPeanuts ||
//                 item.containsShellfish ||
//                 item.containsDairy) && (
//                 <div className="mt-1 flex flex-wrap gap-1">
//                   {item.containsGluten && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                       ⚠️ Gluten
//                     </span>
//                   )}
//                   {item.containsPeanuts && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                       ⚠️ Peanuts
//                     </span>
//                   )}
//                   {item.containsShellfish && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                       ⚠️ Shellfish
//                     </span>
//                   )}
//                   {item.containsDairy && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                       ⚠️ Dairy
//                     </span>
//                   )}
//                 </div>
//               )}

//               {item.customizations?.length > 0 && (
//                 <div className="text-xs text-orange-600 mt-1">
//                   ✨ Custom: {item.customizations.join(", ")}
//                 </div>
//               )}

//               {item.specialInstructions && (
//                 <div className="text-xs text-blue-600 mt-1">
//                   📝 {item.specialInstructions}
//                 </div>
//               )}

//               <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>
//                   RWF{" "}
//                   {(
//                     (item.finalPrice || item.originalPrice || 0) *
//                     (item.quantity || 1)
//                   ).toLocaleString()}
//                 </span>
//                 {item.purineLevel && item.purineLevel !== "unknown" && (
//                   <span
//                     className={`px-1.5 py-0.5 rounded-full text-xs ${
//                       item.purineLevel === "low"
//                         ? "bg-green-100 text-green-700"
//                         : item.purineLevel === "moderate"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {item.purineLevel} purine
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {getAllIngredients().length > 0 && (
//           <div className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
//             <p className="text-xs font-medium text-amber-700 mb-1 flex items-center gap-1">
//               <ListAltIcon fontSize="small" /> All Ingredients Needed:
//             </p>
//             <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
//               {getAllIngredients()
//                 .slice(0, 8)
//                 .map((ing, i) => (
//                   <span
//                     key={i}
//                     className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full"
//                   >
//                     {ing}
//                   </span>
//                 ))}
//               {getAllIngredients().length > 8 && (
//                 <span className="text-xs text-gray-400">
//                   +{getAllIngredients().length - 8} more
//                 </span>
//               )}
//             </div>
//           </div>
//         )}

//         {order.notes && (
//           <div className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
//             <div className="text-xs text-gray-600 flex items-start gap-1">
//               <NoteIcon fontSize="small" className="text-gray-400" />
//               <span className="font-medium">Notes:</span> {order.notes}
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="p-4 border-t bg-gray-50 flex gap-2 flex-wrap">
//         <select
//           value={order.status}
//           onChange={(e) => onUpdateStatus(order, e.target.value)}
//           className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-purple-500"
//         >
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="preparing">Preparing</option>
//           <option value="ready">Ready</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>

//         {(order.status === "pending" || order.status === "confirmed") && (
//           <button
//             onClick={() => onStartPreparation(order)}
//             className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition flex items-center justify-center gap-2"
//           >
//             <StartIcon fontSize="small" /> Start Cooking
//           </button>
//         )}
//         {order.status === "preparing" && (
//           <button
//             onClick={() => onMarkReady(order)}
//             className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition flex items-center justify-center gap-2"
//           >
//             <DoneAllIcon fontSize="small" /> Mark Ready
//           </button>
//         )}
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
//   onUpdateStatus,
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
//       case "completed":
//         return "bg-gray-100 text-gray-800";
//       case "cancelled":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getAllIngredients = () => {
//     const allIngredients = [];
//     order.items?.forEach((item) => {
//       if (item.fullIngredients && item.fullIngredients.length > 0) {
//         allIngredients.push(...item.fullIngredients);
//       }
//     });
//     return [...new Set(allIngredients)];
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//       >
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
//           <div>
//             <h2 className="text-white font-bold text-xl">Order Details</h2>
//             <p className="text-purple-200 text-sm">
//               Kitchen View - Full Ingredients
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-white/20 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>

//         <div className="p-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
//             <div>
//               <p className="text-xs text-gray-500">Order ID</p>
//               <p className="font-mono font-medium text-sm">
//                 {order.orderId?.slice(-12)}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Table</p>
//               <p className="font-medium text-lg">Table {order.tableNumber}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Customer</p>
//               <p className="font-medium">{order.customerName}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Status</p>
//               <span
//                 className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//                   order.status
//                 )}`}
//               >
//                 {order.status}
//               </span>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Created</p>
//               <p className="font-medium text-sm">
//                 {new Date(order.createdAt).toLocaleString()}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Est. Prep Time</p>
//               <p className="font-medium">{order.estimatedTime} minutes</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Total Amount</p>
//               <p className="font-medium text-orange-600">
//                 RWF {order.totalAmount?.toLocaleString() || 0}
//               </p>
//             </div>
//           </div>

//           <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
//             <FoodIcon fontSize="small" /> Items to Prepare
//           </h3>
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
//                     <p className="text-xs text-gray-400 mt-1">
//                       Prep: {item.preparationTime || item.prepTime || 15} min
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-orange-600">
//                       RWF{" "}
//                       {(
//                         (item.finalPrice || item.originalPrice) *
//                         (item.quantity || 1)
//                       ).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>

//                 {item.fullIngredients && item.fullIngredients.length > 0 && (
//                   <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
//                     <p className="text-xs font-bold text-emerald-700 flex items-center gap-1 mb-2">
//                       <ScienceIcon fontSize="small" /> Ingredients for{" "}
//                       {item.name}:
//                     </p>
//                     <div className="flex flex-wrap gap-1.5">
//                       {item.fullIngredients.map((ing, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full"
//                         >
//                           {ing}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {(item.containsGluten ||
//                   item.containsPeanuts ||
//                   item.containsShellfish ||
//                   item.containsDairy ||
//                   item.highSalt) && (
//                   <div className="mt-2 p-2 bg-red-50 rounded-lg">
//                     <p className="text-xs font-medium text-red-700 flex items-center gap-1">
//                       <WarningIcon fontSize="small" /> Allergen Info:
//                     </p>
//                     <div className="flex flex-wrap gap-1 mt-1">
//                       {item.containsGluten && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           Gluten
//                         </span>
//                       )}
//                       {item.containsPeanuts && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           Peanuts
//                         </span>
//                       )}
//                       {item.containsShellfish && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           Shellfish
//                         </span>
//                       )}
//                       {item.containsDairy && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           Dairy
//                         </span>
//                       )}
//                       {item.highSalt && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           High Salt
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {(item.refluxTriggers?.length > 0 ||
//                   item.migraineTriggers?.length > 0) && (
//                   <div className="mt-2 p-2 bg-orange-50 rounded-lg">
//                     <p className="text-xs font-medium text-orange-700">
//                       Health Triggers:
//                     </p>
//                     <div className="flex flex-wrap gap-1 mt-0.5">
//                       {item.refluxTriggers?.map((t, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded"
//                         >
//                           Reflux: {t}
//                         </span>
//                       ))}
//                       {item.migraineTriggers?.map((t, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded"
//                         >
//                           Migraine: {t}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {item.customizations?.length > 0 && (
//                   <div className="mt-2 p-2 bg-orange-50 rounded-lg">
//                     <p className="text-xs font-medium text-orange-700 flex items-center gap-1">
//                       <SettingsIcon fontSize="small" /> Customizations:
//                     </p>
//                     <div className="flex flex-wrap gap-1 mt-1">
//                       {item.customizations.map((c, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full"
//                         >
//                           {c}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {item.specialInstructions && (
//                   <div className="mt-2 p-2 bg-blue-50 rounded-lg">
//                     <p className="text-xs font-medium text-blue-700 flex items-center gap-1">
//                       <NoteIcon fontSize="small" /> Special Instructions:
//                     </p>
//                     <p className="text-xs text-blue-600 mt-0.5">
//                       {item.specialInstructions}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {getAllIngredients().length > 0 && (
//             <div className="mb-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
//               <p className="text-sm font-bold text-amber-800 flex items-center gap-2 mb-2">
//                 <ListAltIcon /> Complete Shopping List for this Order
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {getAllIngredients().map((ing, i) => (
//                   <span
//                     key={i}
//                     className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-sm"
//                   >
//                     {ing}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {order.notes && (
//             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//               <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
//                 <NoteIcon fontSize="small" /> Order Notes
//               </p>
//               <p className="text-sm text-gray-600 mt-1">{order.notes}</p>
//             </div>
//           )}

//           <div className="flex gap-3 pt-4 border-t flex-wrap">
//             <button
//               onClick={onClose}
//               className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
//             >
//               Close
//             </button>
//             <select
//               value={order.status}
//               onChange={(e) => onUpdateStatus(order, e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
//             >
//               <option value="pending">Pending</option>
//               <option value="confirmed">Confirmed</option>
//               <option value="preparing">Preparing</option>
//               <option value="ready">Ready</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
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
//           className={`p-2 sm:p-3 rounded-full bg-${
//             color.split("-")[1]
//           }-100 bg-opacity-20`}
//         >
//           {icon}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ========== CONNECTION STATUS BANNER ==========
// const ConnectionStatusBanner = ({ isConnected, onRetry }) => {
//   if (isConnected) return null;
//   return (
//     <div className="mx-4 sm:mx-6 mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex justify-between items-center">
//       <div className="flex items-center gap-3">
//         <div className="text-red-500">
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//             />
//           </svg>
//         </div>
//         <div>
//           <p className="text-red-700 font-medium">Connection Error</p>
//           <p className="text-red-600 text-sm">Cannot connect to the server.</p>
//         </div>
//       </div>
//       <button
//         onClick={onRetry}
//         className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
//       >
//         Retry
//       </button>
//     </div>
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
//   const [isConnected, setIsConnected] = useState(true);
//   const [stats, setStats] = useState({
//     pendingOrders: 0,
//     confirmedOrders: 0,
//     preparingOrders: 0,
//     readyOrders: 0,
//     completedOrders: 0,
//     cancelledOrders: 0,
//     completedToday: 0,
//     avgPreparationTime: 0,
//     totalRevenue: 0,
//   });
//   const [lastRefresh, setLastRefresh] = useState(new Date());
//   const [refreshing, setRefreshing] = useState(false);
//   const previousOrdersRef = useRef([]);

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   const calculateStats = useCallback((ordersList) => {
//     const pending = ordersList.filter((o) => o.status === "pending").length;
//     const confirmed = ordersList.filter((o) => o.status === "confirmed").length;
//     const preparing = ordersList.filter((o) => o.status === "preparing").length;
//     const ready = ordersList.filter((o) => o.status === "ready").length;
//     const completed = ordersList.filter((o) => o.status === "completed").length;
//     const cancelled = ordersList.filter((o) => o.status === "cancelled").length;
//     const completedToday = ordersList.filter(
//       (o) =>
//         o.status === "completed" &&
//         new Date(o.createdAt).toDateString() === new Date().toDateString()
//     ).length;
//     const completedOrdersWithTimes = ordersList.filter(
//       (o) => o.status === "completed" && o.startedAt && o.completedAt
//     );
//     const avgTime =
//       completedOrdersWithTimes.length > 0
//         ? Math.round(
//             completedOrdersWithTimes.reduce((sum, o) => {
//               const start = new Date(o.startedAt);
//               const end = new Date(o.completedAt);
//               return sum + (end - start) / 60000;
//             }, 0) / completedOrdersWithTimes.length
//           )
//         : 0;
//     const totalRevenue = ordersList
//       .filter((o) => o.status === "ready" || o.status === "completed")
//       .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
//     setStats({
//       pendingOrders: pending,
//       confirmedOrders: confirmed,
//       preparingOrders: preparing,
//       readyOrders: ready,
//       completedOrders: completed,
//       cancelledOrders: cancelled,
//       completedToday,
//       avgPreparationTime: avgTime,
//       totalRevenue,
//     });
//   }, []);

//   const loadOrders = useCallback(
//     async (showLoading = true) => {
//       if (showLoading) setRefreshing(true);
//       try {
//         const apiOrders = await fetchOrdersFromAPI();
//         setOrders(apiOrders);
//         setLastRefresh(new Date());
//         setIsConnected(true);
//         setError(null);
//         calculateStats(apiOrders);
//         const previousOrders = previousOrdersRef.current;
//         const newOrders = apiOrders.filter(
//           (o) =>
//             (o.status === "pending" || o.status === "confirmed") &&
//             !previousOrders.some((prev) => prev._id === o._id)
//         );
//         if (newOrders.length > 0) {
//           toast.info(
//             `${newOrders.length} new order${
//               newOrders.length > 1 ? "s" : ""
//             } received!`
//           );
//         }
//         previousOrdersRef.current = apiOrders;
//       } catch (error) {
//         console.error("Error loading orders:", error);
//         setIsConnected(false);
//         setError(error.message);
//         toast.error("Failed to load orders from server");
//       } finally {
//         setLoading(false);
//         setRefreshing(false);
//       }
//     },
//     [calculateStats]
//   );

//   // Update order status using order.orderId (custom order ID)
//   const updateOrderStatus = async (order, newStatus) => {
//     try {
//       await updateOrderStatusAPI(order.orderId, newStatus);
//       toast.success(
//         `Order #${order.orderId?.slice(-8)} status updated to ${newStatus}`
//       );
//       await loadOrders(false);
//     } catch (error) {
//       toast.error("Failed to update order status");
//     }
//   };

//   const startPreparation = async (order) => {
//     await updateOrderStatus(order, "preparing");
//   };

//   const markAsReady = async (order) => {
//     await updateOrderStatus(order, "ready");
//     toast.success(`Order #${order.orderId?.slice(-8)} is ready for serving!`);
//   };

//   useEffect(() => {
//     loadOrders();
//     const interval = setInterval(() => loadOrders(false), 30000);
//     return () => clearInterval(interval);
//   }, [loadOrders]);

//   const getFilteredOrders = () => {
//     let filtered = orders;
//     if (activeTab === "active")
//       filtered = orders.filter((o) =>
//         ["pending", "confirmed", "preparing"].includes(o.status)
//       );
//     else if (activeTab === "ready")
//       filtered = orders.filter((o) => o.status === "ready");
//     else if (activeTab === "completed")
//       filtered = orders.filter((o) => o.status === "completed");
//     else if (activeTab === "cancelled")
//       filtered = orders.filter((o) => o.status === "cancelled");
//     else if (activeTab === "all") filtered = orders;
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (o) =>
//           o.orderId?.toLowerCase().includes(term) ||
//           o.tableNumber?.toString().includes(term) ||
//           o.customerName?.toLowerCase().includes(term)
//       );
//     }
//     return filtered.sort((a, b) => {
//       if (a.status === "preparing" && b.status !== "preparing") return -1;
//       if (a.status !== "preparing" && b.status === "preparing") return 1;
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });
//   };

//   const filteredOrders = getFilteredOrders();
//   const pendingOrders = filteredOrders.filter(
//     (o) => o.status === "pending" || o.status === "confirmed"
//   );
//   const preparingOrders = filteredOrders.filter(
//     (o) => o.status === "preparing"
//   );
//   const tabs = [
//     {
//       id: "active",
//       label: "Active Orders",
//       icon: <FireIcon />,
//       count:
//         stats.pendingOrders + stats.confirmedOrders + stats.preparingOrders,
//     },
//     {
//       id: "ready",
//       label: "Ready",
//       icon: <DoneAllIcon />,
//       count: stats.readyOrders,
//     },
//     {
//       id: "completed",
//       label: "Completed",
//       icon: <CheckCircleIcon />,
//       count: stats.completedOrders,
//     },
//     {
//       id: "cancelled",
//       label: "Cancelled",
//       icon: <CancelIcon />,
//       count: stats.cancelledOrders,
//     },
//     { id: "all", label: "All Orders", icon: <OrdersIcon /> },
//   ];

//   if (loading && orders.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading kitchen orders...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         pauseOnHover
//       />
//       <header className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg sticky top-0 z-10">
//         <div className="px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-4">
//           <div className="flex items-center gap-3">
//             <div className="bg-white/20 p-2 rounded-lg">
//               <KitchenIcon className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-lg sm:text-xl font-bold">
//                 Kitchen Dashboard
//               </h1>
//               <p className="text-purple-200 text-xs sm:text-sm">
//                 Real-time order management with ingredients
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 sm:gap-3">
//             <button
//               onClick={() => loadOrders()}
//               disabled={refreshing}
//               className={`p-2 rounded-full transition ${
//                 refreshing ? "animate-spin" : "hover:bg-white/20"
//               }`}
//             >
//               <RefreshIcon className="text-white" />
//             </button>
//             <div className="bg-white/20 px-2 sm:px-3 py-2 rounded-lg text-xs">
//               Last: {lastRefresh.toLocaleTimeString()}
//             </div>
//             <button
//               onClick={handleLogout}
//               className="bg-white/20 px-3 py-2 rounded-lg text-sm hover:bg-white/30 flex items-center gap-1"
//             >
//               <LogoutIcon fontSize="small" /> Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <ConnectionStatusBanner
//         isConnected={isConnected}
//         onRetry={() => loadOrders()}
//       />

//       <div className="p-4 sm:p-6 pb-2">
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
//           <StatCard
//             title="Pending"
//             value={stats.pendingOrders}
//             icon={<TimeIcon className="text-yellow-600" />}
//             color="border-yellow-500"
//             subtitle="New orders"
//           />
//           <StatCard
//             title="Confirmed"
//             value={stats.confirmedOrders}
//             icon={<CheckCircleIcon className="text-blue-600" />}
//             color="border-blue-500"
//             subtitle="Awaiting start"
//           />
//           <StatCard
//             title="In Progress"
//             value={stats.preparingOrders}
//             icon={<FireIcon className="text-purple-600" />}
//             color="border-purple-500"
//             subtitle="Cooking"
//           />
//           <StatCard
//             title="Ready"
//             value={stats.readyOrders}
//             icon={<DoneAllIcon className="text-green-600" />}
//             color="border-green-500"
//             subtitle="Awaiting pickup"
//           />
//           <StatCard
//             title="Completed"
//             value={stats.completedOrders}
//             icon={<CheckCircleIcon className="text-gray-600" />}
//             color="border-gray-500"
//           />
//           <StatCard
//             title="Completed Today"
//             value={stats.completedToday}
//             icon={<TrophyIcon className="text-teal-600" />}
//             color="border-teal-500"
//           />
//           <StatCard
//             title="Avg Prep Time"
//             value={`${stats.avgPreparationTime} min`}
//             icon={<SpeedIcon className="text-indigo-600" />}
//             color="border-indigo-500"
//           />
//         </div>
//       </div>

//       <div className="px-4 sm:px-6">
//         <div className="flex gap-2 overflow-x-auto pb-2">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
//                 activeTab === tab.id
//                   ? "bg-purple-600 text-white shadow-md"
//                   : "bg-white text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               {tab.icon}
//               <span className="text-sm">{tab.label}</span>
//               {tab.count !== undefined && tab.count > 0 && (
//                 <span
//                   className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
//                     activeTab === tab.id
//                       ? "bg-white/20"
//                       : "bg-purple-100 text-purple-600"
//                   }`}
//                 >
//                   {tab.count}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="px-4 sm:px-6 pt-4">
//         <div className="relative max-w-md">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
//           <input
//             type="text"
//             placeholder="Search by Order ID, Table, or Customer..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
//           />
//         </div>
//       </div>

//       <div className="p-4 sm:p-6">
//         {activeTab === "active" && (
//           <>
//             {preparingOrders.length > 0 && (
//               <div className="mb-6">
//                 <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
//                   <FireIcon className="text-purple-600" /> In Progress (
//                   {preparingOrders.length})
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//                   <AnimatePresence>
//                     {preparingOrders.map((order) => (
//                       <KitchenOrderCard
//                         key={order._id}
//                         order={order}
//                         onStartPreparation={startPreparation}
//                         onMarkReady={markAsReady}
//                         onUpdateStatus={updateOrderStatus}
//                         onViewDetails={setSelectedOrder}
//                       />
//                     ))}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             )}
//             {pendingOrders.length > 0 && (
//               <div>
//                 <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
//                   <TimeIcon className="text-yellow-600" /> Pending (
//                   {pendingOrders.length})
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//                   <AnimatePresence>
//                     {pendingOrders.map((order) => (
//                       <KitchenOrderCard
//                         key={order._id}
//                         order={order}
//                         onStartPreparation={startPreparation}
//                         onMarkReady={markAsReady}
//                         onUpdateStatus={updateOrderStatus}
//                         onViewDetails={setSelectedOrder}
//                       />
//                     ))}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             )}
//             {preparingOrders.length === 0 && pendingOrders.length === 0 && (
//               <div className="text-center py-12 bg-white rounded-xl">
//                 <KitchenIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//                 <p className="text-gray-500">
//                   No active orders. Kitchen is idle.
//                 </p>
//               </div>
//             )}
//           </>
//         )}
//         {(activeTab === "ready" ||
//           activeTab === "completed" ||
//           activeTab === "cancelled" ||
//           activeTab === "all") && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//             {filteredOrders.map((order) => (
//               <KitchenOrderCard
//                 key={order._id}
//                 order={order}
//                 onStartPreparation={startPreparation}
//                 onMarkReady={markAsReady}
//                 onUpdateStatus={updateOrderStatus}
//                 onViewDetails={setSelectedOrder}
//               />
//             ))}
//             {filteredOrders.length === 0 && (
//               <div className="col-span-full text-center py-12 bg-white rounded-xl">
//                 <OrdersIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//                 <p className="text-gray-500">No orders found.</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {selectedOrder && (
//         <OrderDetailsModal
//           order={selectedOrder}
//           onClose={() => setSelectedOrder(null)}
//           onStartPreparation={startPreparation}
//           onMarkReady={markAsReady}
//           onUpdateStatus={updateOrderStatus}
//         />
//       )}
//     </div>
//   );
// };

// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */

// // ChefDashboard.jsx
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import {
//   Kitchen as KitchenIcon,
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
//   Person as PersonIcon,
//   TableRestaurant as TableIcon,
//   Close as CloseIcon,
//   PlayArrow as StartIcon,
//   Fastfood as FoodIcon,
//   NoteAlt as NoteIcon,
//   Settings as SettingsIcon,
//   ListAlt as ListAltIcon,
//   Grass as GrassIcon,
//   Science as ScienceIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// // ========== API CONFIGURATION ==========
// const API_BASE_URL = "https://nutriscan-foodanddrinksupply.onrender.com";

// // Create axios instance with default config
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 30000,
// });

// // Add request interceptor for auth token
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add response interceptor for error handling
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.code === "ECONNABORTED") {
//       console.error("Request timeout - server took too long to respond");
//     } else if (error.response) {
//       console.error(`API Error ${error.response.status}:`, error.response.data);
//       if (error.response.status === 401) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         window.location.href = "/login";
//       }
//     } else if (error.request) {
//       console.error("No response received from server");
//     } else {
//       console.error("Request error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// // ========== ALLOWED STATUSES ==========
// const ALLOWED_STATUSES = ["preparing", "ready", "completed"];

// // ========== CACHE FOR MENU ITEMS ==========
// let menuItemsCache = null;
// let menuItemsListCache = null;

// // Fetch all menu items (foods) from API to get ingredients
// const fetchMenuItems = async () => {
//   if (menuItemsCache) return menuItemsCache;
//   try {
//     const response = await apiClient.get("/foods");
//     let foods = [];
//     if (response.data?.success && response.data.foods) {
//       foods = response.data.foods;
//     } else if (Array.isArray(response.data)) {
//       foods = response.data;
//     } else if (response.data?.data && Array.isArray(response.data.data)) {
//       foods = response.data.data;
//     }

//     // Create a map for quick lookup by name (case insensitive)
//     const menuMap = new Map();
//     foods.forEach((food) => {
//       menuMap.set(food.name.toLowerCase(), food);
//       if (food._id) menuMap.set(food._id, food);
//     });
//     menuItemsCache = menuMap;
//     menuItemsListCache = foods;
//     return menuMap;
//   } catch (error) {
//     console.error("Error fetching menu items:", error);
//     return new Map();
//   }
// };

// // Get all menu items list
// export const getAllMenuItems = async () => {
//   if (menuItemsListCache) return menuItemsListCache;
//   await fetchMenuItems();
//   return menuItemsListCache || [];
// };

// // Enrich order item with full ingredient details from menu
// const enrichOrderItemWithIngredients = async (orderItem, menuMap) => {
//   const itemName = orderItem.name?.toLowerCase();
//   const menuItem = menuMap.get(itemName);

//   if (menuItem) {
//     return {
//       ...orderItem,
//       fullIngredients: menuItem.ingredients || [],
//       nutritionalInfo: menuItem.nutritionalInfo || {},
//       purineLevel: menuItem.purineLevel,
//       containsGluten: menuItem.containsGluten,
//       containsPeanuts: menuItem.containsPeanuts,
//       containsShellfish: menuItem.containsShellfish,
//       containsDairy: menuItem.containsDairy,
//       highSalt: menuItem.highSalt,
//       refluxTriggers: menuItem.refluxTriggers || [],
//       migraineTriggers: menuItem.migraineTriggers || [],
//       image: menuItem.image,
//       description: menuItem.description,
//       category: menuItem.category,
//       prepTime: menuItem.prepTime,
//     };
//   }

//   return {
//     ...orderItem,
//     fullIngredients: [],
//     nutritionalInfo: {},
//     purineLevel: "unknown",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     highSalt: false,
//     refluxTriggers: [],
//     migraineTriggers: [],
//   };
// };

// // Transform API order to local component structure
// const transformOrder = async (apiOrder, menuMap) => {
//   let status = apiOrder.status || "pending";
//   if (apiOrder.bookingDetails?.currentStatus) {
//     status = apiOrder.bookingDetails.currentStatus;
//   }

//   // Ensure status is one of the allowed ones for display
//   if (!ALLOWED_STATUSES.includes(status) && status !== "pending") {
//     status = "preparing"; // Default fallback
//   }

//   let startedAt = null;
//   let completedAt = null;
//   if (apiOrder.bookingDetails?.statusHistory) {
//     const preparingEntry = apiOrder.bookingDetails.statusHistory.find(
//       (h) => h.status === "preparing"
//     );
//     if (preparingEntry) startedAt = preparingEntry.timestamp;

//     const completedEntry = apiOrder.bookingDetails.statusHistory.find(
//       (h) => h.status === "ready" || h.status === "completed"
//     );
//     if (completedEntry) completedAt = completedEntry.timestamp;
//   }

//   const enrichedItems = await Promise.all(
//     (apiOrder.items || []).map(async (item) => {
//       const enriched = await enrichOrderItemWithIngredients(item, menuMap);
//       return enriched;
//     })
//   );

//   const totalPrepTime =
//     enrichedItems.reduce(
//       (sum, item) => sum + (item.preparationTime || item.prepTime || 15),
//       0
//     ) || 20;

//   const totalAmount =
//     enrichedItems.reduce(
//       (sum, item) =>
//         sum +
//         (item.finalPrice || item.originalPrice || 0) * (item.quantity || 1),
//       0
//     ) || 0;

//   const allCustomizations = [];
//   const allSpecialInstructions = [];
//   enrichedItems.forEach((item) => {
//     if (item.customizations?.length) {
//       allCustomizations.push(...item.customizations);
//     }
//     if (item.specialInstructions) {
//       allSpecialInstructions.push({
//         itemName: item.name,
//         instruction: item.specialInstructions,
//       });
//     }
//   });

//   return {
//     _id: apiOrder._id,
//     orderId: apiOrder.orderId,
//     requestId: apiOrder.requestId,
//     tableNumber: apiOrder.personDetails?.tableNumber || "Unknown",
//     customerName: apiOrder.personDetails?.name || "Guest",
//     orderType: apiOrder.personDetails?.orderType || "dine-in",
//     status: status,
//     items: enrichedItems,
//     notes: apiOrder.notes || "",
//     specialInstructions: apiOrder.bookingDetails?.specialInstructions || "",
//     estimatedPickupTime: apiOrder.bookingDetails?.estimatedPickupTime,
//     createdAt: apiOrder.createdAt,
//     updatedAt: apiOrder.updatedAt,
//     startedAt: startedAt,
//     completedAt: completedAt,
//     estimatedTime: totalPrepTime,
//     totalAmount: totalAmount,
//     statusHistory: apiOrder.bookingDetails?.statusHistory || [],
//     allCustomizations: allCustomizations,
//     allSpecialInstructions: allSpecialInstructions,
//     autoProgress: apiOrder.autoProgress || false,
//   };
// };

// // Fetch orders from API with enriched ingredients
// const fetchOrdersFromAPI = async (retryCount = 0, maxRetries = 3) => {
//   try {
//     const menuMap = await fetchMenuItems();
//     const response = await apiClient.get("/orders");

//     const result = response.data;
//     let ordersArray = [];

//     if (result.success && Array.isArray(result.data)) {
//       ordersArray = result.data;
//     } else if (Array.isArray(result)) {
//       ordersArray = result;
//     } else if (result.orders && Array.isArray(result.orders)) {
//       ordersArray = result.orders;
//     }

//     const transformedOrders = await Promise.all(
//       ordersArray.map((order) => transformOrder(order, menuMap))
//     );

//     return transformedOrders;
//   } catch (error) {
//     console.error(`Fetch attempt ${retryCount + 1} failed:`, error.message);

//     if (
//       retryCount < maxRetries &&
//       (error.code === "ECONNABORTED" || !error.response)
//     ) {
//       const delay = 2000 * (retryCount + 1);
//       console.log(`Retrying in ${delay}ms...`);
//       await new Promise((resolve) => setTimeout(resolve, delay));
//       return fetchOrdersFromAPI(retryCount + 1, maxRetries);
//     }

//     throw error;
//   }
// };

// // Update order status via API using orderId (custom order ID)
// const updateOrderStatusAPI = async (orderId, newStatus) => {
//   // Validate status is allowed
//   if (!ALLOWED_STATUSES.includes(newStatus)) {
//     throw new Error(
//       `Invalid status: ${newStatus}. Allowed statuses: ${ALLOWED_STATUSES.join(
//         ", "
//       )}`
//     );
//   }

//   try {
//     const response = await apiClient.patch(`/orders/${orderId}/status`, {
//       status: newStatus,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     throw error;
//   }
// };

// // ========== INGREDIENT BADGE COMPONENT ==========
// const IngredientBadge = ({ ingredient }) => (
//   <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs border border-amber-200">
//     <GrassIcon fontSize="inherit" className="text-amber-500" />
//     {ingredient}
//   </span>
// );

// // ========== KITCHEN ORDER CARD COMPONENT ==========
// const KitchenOrderCard = ({
//   order,
//   onStartPreparation,
//   onMarkReady,
//   onUpdateStatus,
//   onViewDetails,
// }) => {
//   const [timeElapsed, setTimeElapsed] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [showIngredients, setShowIngredients] = useState(false);

//   useEffect(() => {
//     if (order.status === "preparing" && order.startedAt) {
//       const interval = setInterval(() => {
//         const elapsed = Math.floor(
//           (Date.now() - new Date(order.startedAt)) / 60000
//         );
//         setTimeElapsed(elapsed);
//       }, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [order.status, order.startedAt]);

//   const getPriorityColor = () => {
//     const elapsed = timeElapsed;
//     const estimatedTime = order.estimatedTime || 20;
//     if (elapsed > estimatedTime) return "border-red-500 bg-red-50";
//     if (elapsed > estimatedTime * 0.7) return "border-yellow-500 bg-yellow-50";
//     return "border-green-500 bg-green-50";
//   };

//   const getStatusBadge = () => {
//     switch (order.status) {
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
//       case "completed":
//         return (
//           <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//             <CheckCircleIcon className="text-gray-600 text-sm" /> Completed
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

//   const getAllIngredients = () => {
//     const allIngredients = [];
//     order.items?.forEach((item) => {
//       if (item.fullIngredients && item.fullIngredients.length > 0) {
//         allIngredients.push(...item.fullIngredients);
//       }
//     });
//     return [...new Set(allIngredients)];
//   };

//   // Determine if order can be started (any status that's not already preparing or completed)
//   const canStart =
//     order.status !== "preparing" &&
//     order.status !== "ready" &&
//     order.status !== "completed";

//   // Determine if order can be marked as ready
//   const canMarkReady = order.status === "preparing";

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, x: -100 }}
//       whileHover={{ scale: 1.02 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${getPriorityColor()} transition-all duration-300 ${
//         isHovered ? "shadow-xl" : ""
//       }`}
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
//                 <PersonIcon fontSize="small" /> {order.customerName}
//               </span>
//               <span className="flex items-center gap-1 text-xs text-gray-400">
//                 {order.orderType}
//               </span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="flex items-center gap-1 text-orange-600 font-bold">
//               <TimerIcon fontSize="small" />
//               <span>{order.estimatedTime} min est.</span>
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
//         <div className="space-y-3 max-h-60 overflow-y-auto">
//           {order.items?.map((item, idx) => (
//             <div
//               key={idx}
//               className="text-sm border-b border-gray-100 pb-3 last:border-0"
//             >
//               <div className="flex justify-between flex-wrap gap-2">
//                 <span className="font-medium">
//                   {item.quantity}x {item.name}
//                 </span>
//                 <span className="text-gray-500">
//                   {item.preparationTime || item.prepTime || 15} min
//                 </span>
//               </div>

//               {item.fullIngredients && item.fullIngredients.length > 0 && (
//                 <div className="mt-2">
//                   <button
//                     onClick={() => setShowIngredients(!showIngredients)}
//                     className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium"
//                   >
//                     <ListAltIcon fontSize="inherit" />
//                     {showIngredients ? "Hide" : "Show"} Ingredients (
//                     {item.fullIngredients.length})
//                   </button>
//                   {showIngredients && (
//                     <div className="mt-2 p-2 bg-emerald-50 rounded-lg">
//                       <p className="text-xs font-medium text-emerald-700 mb-1.5 flex items-center gap-1">
//                         <ScienceIcon fontSize="small" /> Required Ingredients:
//                       </p>
//                       <div className="flex flex-wrap gap-1.5">
//                         {item.fullIngredients.map((ing, i) => (
//                           <IngredientBadge key={i} ingredient={ing} />
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {(item.containsGluten ||
//                 item.containsPeanuts ||
//                 item.containsShellfish ||
//                 item.containsDairy) && (
//                 <div className="mt-1 flex flex-wrap gap-1">
//                   {item.containsGluten && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                       ⚠️ Gluten
//                     </span>
//                   )}
//                   {item.containsPeanuts && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                       ⚠️ Peanuts
//                     </span>
//                   )}
//                   {item.containsShellfish && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                       ⚠️ Shellfish
//                     </span>
//                   )}
//                   {item.containsDairy && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                       ⚠️ Dairy
//                     </span>
//                   )}
//                 </div>
//               )}

//               {item.customizations?.length > 0 && (
//                 <div className="text-xs text-orange-600 mt-1">
//                   ✨ Custom: {item.customizations.join(", ")}
//                 </div>
//               )}

//               {item.specialInstructions && (
//                 <div className="text-xs text-blue-600 mt-1">
//                   📝 {item.specialInstructions}
//                 </div>
//               )}

//               <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>
//                   RWF{" "}
//                   {(
//                     (item.finalPrice || item.originalPrice || 0) *
//                     (item.quantity || 1)
//                   ).toLocaleString()}
//                 </span>
//                 {item.purineLevel && item.purineLevel !== "unknown" && (
//                   <span
//                     className={`px-1.5 py-0.5 rounded-full text-xs ${
//                       item.purineLevel === "low"
//                         ? "bg-green-100 text-green-700"
//                         : item.purineLevel === "moderate"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {item.purineLevel} purine
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {getAllIngredients().length > 0 && (
//           <div className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
//             <p className="text-xs font-medium text-amber-700 mb-1 flex items-center gap-1">
//               <ListAltIcon fontSize="small" /> All Ingredients Needed:
//             </p>
//             <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
//               {getAllIngredients()
//                 .slice(0, 8)
//                 .map((ing, i) => (
//                   <span
//                     key={i}
//                     className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full"
//                   >
//                     {ing}
//                   </span>
//                 ))}
//               {getAllIngredients().length > 8 && (
//                 <span className="text-xs text-gray-400">
//                   +{getAllIngredients().length - 8} more
//                 </span>
//               )}
//             </div>
//           </div>
//         )}

//         {order.notes && (
//           <div className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
//             <div className="text-xs text-gray-600 flex items-start gap-1">
//               <NoteIcon fontSize="small" className="text-gray-400" />
//               <span className="font-medium">Notes:</span> {order.notes}
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="p-4 border-t bg-gray-50 flex gap-2 flex-wrap">
//         {/* Status Select - Only showing allowed statuses */}
//         <select
//           value={order.status}
//           onChange={(e) => onUpdateStatus(order, e.target.value)}
//           className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-purple-500"
//         >
//           <option value="preparing">Preparing</option>
//           <option value="ready">Ready</option>
//           <option value="completed">Completed</option>
//         </select>

//         {/* Start Cooking Button - Shows for orders not yet in progress */}
//         {canStart && order.status !== "completed" && (
//           <button
//             onClick={() => onStartPreparation(order)}
//             className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition flex items-center justify-center gap-2"
//           >
//             <StartIcon fontSize="small" /> Start Cooking
//           </button>
//         )}

//         {/* Mark Ready Button - Only shows when status is preparing */}
//         {canMarkReady && (
//           <button
//             onClick={() => onMarkReady(order)}
//             className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition flex items-center justify-center gap-2"
//           >
//             <DoneAllIcon fontSize="small" /> Mark Ready
//           </button>
//         )}

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
//   onUpdateStatus,
// }) => {
//   if (!order) return null;

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "preparing":
//         return "bg-purple-100 text-purple-800";
//       case "ready":
//         return "bg-green-100 text-green-800";
//       case "completed":
//         return "bg-gray-100 text-gray-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getAllIngredients = () => {
//     const allIngredients = [];
//     order.items?.forEach((item) => {
//       if (item.fullIngredients && item.fullIngredients.length > 0) {
//         allIngredients.push(...item.fullIngredients);
//       }
//     });
//     return [...new Set(allIngredients)];
//   };

//   const canStart =
//     order.status !== "preparing" &&
//     order.status !== "ready" &&
//     order.status !== "completed";
//   const canMarkReady = order.status === "preparing";

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//       >
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
//           <div>
//             <h2 className="text-white font-bold text-xl">Order Details</h2>
//             <p className="text-purple-200 text-sm">
//               Kitchen View - Full Ingredients
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-white/20 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>

//         <div className="p-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
//             <div>
//               <p className="text-xs text-gray-500">Order ID</p>
//               <p className="font-mono font-medium text-sm">
//                 {order.orderId?.slice(-12)}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Table</p>
//               <p className="font-medium text-lg">Table {order.tableNumber}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Customer</p>
//               <p className="font-medium">{order.customerName}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Status</p>
//               <span
//                 className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//                   order.status
//                 )}`}
//               >
//                 {order.status}
//               </span>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Created</p>
//               <p className="font-medium text-sm">
//                 {new Date(order.createdAt).toLocaleString()}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Est. Prep Time</p>
//               <p className="font-medium">{order.estimatedTime} minutes</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Total Amount</p>
//               <p className="font-medium text-orange-600">
//                 RWF {order.totalAmount?.toLocaleString() || 0}
//               </p>
//             </div>
//           </div>

//           <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
//             <FoodIcon fontSize="small" /> Items to Prepare
//           </h3>
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
//                     <p className="text-xs text-gray-400 mt-1">
//                       Prep: {item.preparationTime || item.prepTime || 15} min
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-orange-600">
//                       RWF{" "}
//                       {(
//                         (item.finalPrice || item.originalPrice) *
//                         (item.quantity || 1)
//                       ).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>

//                 {item.fullIngredients && item.fullIngredients.length > 0 && (
//                   <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
//                     <p className="text-xs font-bold text-emerald-700 flex items-center gap-1 mb-2">
//                       <ScienceIcon fontSize="small" /> Ingredients for{" "}
//                       {item.name}:
//                     </p>
//                     <div className="flex flex-wrap gap-1.5">
//                       {item.fullIngredients.map((ing, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full"
//                         >
//                           {ing}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {(item.containsGluten ||
//                   item.containsPeanuts ||
//                   item.containsShellfish ||
//                   item.containsDairy ||
//                   item.highSalt) && (
//                   <div className="mt-2 p-2 bg-red-50 rounded-lg">
//                     <p className="text-xs font-medium text-red-700 flex items-center gap-1">
//                       <WarningIcon fontSize="small" /> Allergen Info:
//                     </p>
//                     <div className="flex flex-wrap gap-1 mt-1">
//                       {item.containsGluten && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           Gluten
//                         </span>
//                       )}
//                       {item.containsPeanuts && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           Peanuts
//                         </span>
//                       )}
//                       {item.containsShellfish && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           Shellfish
//                         </span>
//                       )}
//                       {item.containsDairy && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           Dairy
//                         </span>
//                       )}
//                       {item.highSalt && (
//                         <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                           High Salt
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {(item.refluxTriggers?.length > 0 ||
//                   item.migraineTriggers?.length > 0) && (
//                   <div className="mt-2 p-2 bg-orange-50 rounded-lg">
//                     <p className="text-xs font-medium text-orange-700">
//                       Health Triggers:
//                     </p>
//                     <div className="flex flex-wrap gap-1 mt-0.5">
//                       {item.refluxTriggers?.map((t, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded"
//                         >
//                           Reflux: {t}
//                         </span>
//                       ))}
//                       {item.migraineTriggers?.map((t, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded"
//                         >
//                           Migraine: {t}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {item.customizations?.length > 0 && (
//                   <div className="mt-2 p-2 bg-orange-50 rounded-lg">
//                     <p className="text-xs font-medium text-orange-700 flex items-center gap-1">
//                       <SettingsIcon fontSize="small" /> Customizations:
//                     </p>
//                     <div className="flex flex-wrap gap-1 mt-1">
//                       {item.customizations.map((c, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full"
//                         >
//                           {c}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {item.specialInstructions && (
//                   <div className="mt-2 p-2 bg-blue-50 rounded-lg">
//                     <p className="text-xs font-medium text-blue-700 flex items-center gap-1">
//                       <NoteIcon fontSize="small" /> Special Instructions:
//                     </p>
//                     <p className="text-xs text-blue-600 mt-0.5">
//                       {item.specialInstructions}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {getAllIngredients().length > 0 && (
//             <div className="mb-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
//               <p className="text-sm font-bold text-amber-800 flex items-center gap-2 mb-2">
//                 <ListAltIcon /> Complete Shopping List for this Order
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {getAllIngredients().map((ing, i) => (
//                   <span
//                     key={i}
//                     className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-sm"
//                   >
//                     {ing}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {order.notes && (
//             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//               <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
//                 <NoteIcon fontSize="small" /> Order Notes
//               </p>
//               <p className="text-sm text-gray-600 mt-1">{order.notes}</p>
//             </div>
//           )}

//           <div className="flex gap-3 pt-4 border-t flex-wrap">
//             <button
//               onClick={onClose}
//               className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
//             >
//               Close
//             </button>

//             {/* Status Select - Only showing allowed statuses */}
//             <select
//               value={order.status}
//               onChange={(e) => onUpdateStatus(order, e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
//             >
//               <option value="preparing">Preparing</option>
//               <option value="ready">Ready</option>
//               <option value="completed">Completed</option>
//             </select>

//             {/* Start Cooking Button */}
//             {canStart && order.status !== "completed" && (
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

//             {/* Mark Ready Button */}
//             {canMarkReady && (
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
//           className={`p-2 sm:p-3 rounded-full bg-${
//             color.split("-")[1]
//           }-100 bg-opacity-20`}
//         >
//           {icon}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ========== CONNECTION STATUS BANNER ==========
// const ConnectionStatusBanner = ({ isConnected, onRetry }) => {
//   if (isConnected) return null;
//   return (
//     <div className="mx-4 sm:mx-6 mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex justify-between items-center">
//       <div className="flex items-center gap-3">
//         <div className="text-red-500">
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//             />
//           </svg>
//         </div>
//         <div>
//           <p className="text-red-700 font-medium">Connection Error</p>
//           <p className="text-red-600 text-sm">Cannot connect to the server.</p>
//         </div>
//       </div>
//       <button
//         onClick={onRetry}
//         className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
//       >
//         Retry
//       </button>
//     </div>
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
//   const [isConnected, setIsConnected] = useState(true);
//   const [stats, setStats] = useState({
//     preparingOrders: 0,
//     readyOrders: 0,
//     completedOrders: 0,
//     completedToday: 0,
//     avgPreparationTime: 0,
//     totalRevenue: 0,
//   });
//   const [lastRefresh, setLastRefresh] = useState(new Date());
//   const [refreshing, setRefreshing] = useState(false);
//   const previousOrdersRef = useRef([]);

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   const calculateStats = useCallback((ordersList) => {
//     const preparing = ordersList.filter((o) => o.status === "preparing").length;
//     const ready = ordersList.filter((o) => o.status === "ready").length;
//     const completed = ordersList.filter((o) => o.status === "completed").length;
//     const completedToday = ordersList.filter(
//       (o) =>
//         o.status === "completed" &&
//         new Date(o.createdAt).toDateString() === new Date().toDateString()
//     ).length;
//     const completedOrdersWithTimes = ordersList.filter(
//       (o) => o.status === "completed" && o.startedAt && o.completedAt
//     );
//     const avgTime =
//       completedOrdersWithTimes.length > 0
//         ? Math.round(
//             completedOrdersWithTimes.reduce((sum, o) => {
//               const start = new Date(o.startedAt);
//               const end = new Date(o.completedAt);
//               return sum + (end - start) / 60000;
//             }, 0) / completedOrdersWithTimes.length
//           )
//         : 0;
//     const totalRevenue = ordersList
//       .filter((o) => o.status === "ready" || o.status === "completed")
//       .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
//     setStats({
//       preparingOrders: preparing,
//       readyOrders: ready,
//       completedOrders: completed,
//       completedToday,
//       avgPreparationTime: avgTime,
//       totalRevenue,
//     });
//   }, []);

//   const loadOrders = useCallback(
//     async (showLoading = true) => {
//       if (showLoading) setRefreshing(true);
//       try {
//         const apiOrders = await fetchOrdersFromAPI();
//         setOrders(apiOrders);
//         setLastRefresh(new Date());
//         setIsConnected(true);
//         setError(null);
//         calculateStats(apiOrders);
//         const previousOrders = previousOrdersRef.current;
//         const newOrders = apiOrders.filter(
//           (o) =>
//             o.status === "preparing" &&
//             !previousOrders.some((prev) => prev._id === o._id)
//         );
//         if (newOrders.length > 0) {
//           toast.info(
//             `${newOrders.length} new order${
//               newOrders.length > 1 ? "s" : ""
//             } received!`
//           );
//         }
//         previousOrdersRef.current = apiOrders;
//       } catch (error) {
//         console.error("Error loading orders:", error);
//         setIsConnected(false);
//         setError(error.message);
//         toast.error("Failed to load orders from server");
//       } finally {
//         setLoading(false);
//         setRefreshing(false);
//       }
//     },
//     [calculateStats]
//   );

//   // Update order status using order.orderId (custom order ID)
//   const updateOrderStatus = async (order, newStatus) => {
//     // Validate status is allowed
//     if (!ALLOWED_STATUSES.includes(newStatus)) {
//       toast.error(
//         `Invalid status: ${newStatus}. Allowed statuses: ${ALLOWED_STATUSES.join(
//           ", "
//         )}`
//       );
//       return;
//     }

//     try {
//       await updateOrderStatusAPI(order.orderId, newStatus);
//       toast.success(
//         `Order #${order.orderId?.slice(-8)} status updated to ${newStatus}`
//       );
//       await loadOrders(false);
//     } catch (error) {
//       toast.error("Failed to update order status");
//     }
//   };

//   const startPreparation = async (order) => {
//     await updateOrderStatus(order, "preparing");
//   };

//   const markAsReady = async (order) => {
//     await updateOrderStatus(order, "ready");
//     toast.success(`Order #${order.orderId?.slice(-8)} is ready for serving!`);
//   };

//   useEffect(() => {
//     loadOrders();
//     const interval = setInterval(() => loadOrders(false), 30000);
//     return () => clearInterval(interval);
//   }, [loadOrders]);

//   const getFilteredOrders = () => {
//     let filtered = orders;
//     if (activeTab === "active")
//       filtered = orders.filter((o) => ["preparing"].includes(o.status));
//     else if (activeTab === "ready")
//       filtered = orders.filter((o) => o.status === "ready");
//     else if (activeTab === "completed")
//       filtered = orders.filter((o) => o.status === "completed");
//     else if (activeTab === "all") filtered = orders;

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (o) =>
//           o.orderId?.toLowerCase().includes(term) ||
//           o.tableNumber?.toString().includes(term) ||
//           o.customerName?.toLowerCase().includes(term)
//       );
//     }
//     return filtered.sort((a, b) => {
//       if (a.status === "preparing" && b.status !== "preparing") return -1;
//       if (a.status !== "preparing" && b.status === "preparing") return 1;
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });
//   };

//   const filteredOrders = getFilteredOrders();
//   const preparingOrders = filteredOrders.filter(
//     (o) => o.status === "preparing"
//   );
//   const readyOrders = filteredOrders.filter((o) => o.status === "ready");

//   const tabs = [
//     {
//       id: "active",
//       label: "Active Orders",
//       icon: <FireIcon />,
//       count: stats.preparingOrders,
//     },
//     {
//       id: "ready",
//       label: "Ready",
//       icon: <DoneAllIcon />,
//       count: stats.readyOrders,
//     },
//     {
//       id: "completed",
//       label: "Completed",
//       icon: <CheckCircleIcon />,
//       count: stats.completedOrders,
//     },
//     { id: "all", label: "All Orders", icon: <OrdersIcon /> },
//   ];

//   if (loading && orders.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading kitchen orders...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         pauseOnHover
//       />
//       <header className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg sticky top-0 z-10">
//         <div className="px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-4">
//           <div className="flex items-center gap-3">
//             <div className="bg-white/20 p-2 rounded-lg">
//               <KitchenIcon className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-lg sm:text-xl font-bold">
//                 Kitchen Dashboard
//               </h1>
//               <p className="text-purple-200 text-xs sm:text-sm">
//                 Real-time order management with ingredients
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 sm:gap-3">
//             <button
//               onClick={() => loadOrders()}
//               disabled={refreshing}
//               className={`p-2 rounded-full transition ${
//                 refreshing ? "animate-spin" : "hover:bg-white/20"
//               }`}
//             >
//               <RefreshIcon className="text-white" />
//             </button>
//             <div className="bg-white/20 px-2 sm:px-3 py-2 rounded-lg text-xs">
//               Last: {lastRefresh.toLocaleTimeString()}
//             </div>
//             <button
//               onClick={handleLogout}
//               className="bg-white/20 px-3 py-2 rounded-lg text-sm hover:bg-white/30 flex items-center gap-1"
//             >
//               <LogoutIcon fontSize="small" /> Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <ConnectionStatusBanner
//         isConnected={isConnected}
//         onRetry={() => loadOrders()}
//       />

//       <div className="p-4 sm:p-6 pb-2">
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
//           <StatCard
//             title="In Progress"
//             value={stats.preparingOrders}
//             icon={<FireIcon className="text-purple-600" />}
//             color="border-purple-500"
//             subtitle="Cooking"
//           />
//           <StatCard
//             title="Ready"
//             value={stats.readyOrders}
//             icon={<DoneAllIcon className="text-green-600" />}
//             color="border-green-500"
//             subtitle="Awaiting pickup"
//           />
//           <StatCard
//             title="Completed"
//             value={stats.completedOrders}
//             icon={<CheckCircleIcon className="text-gray-600" />}
//             color="border-gray-500"
//           />
//           <StatCard
//             title="Completed Today"
//             value={stats.completedToday}
//             icon={<TrophyIcon className="text-teal-600" />}
//             color="border-teal-500"
//           />
//           <StatCard
//             title="Avg Prep Time"
//             value={`${stats.avgPreparationTime} min`}
//             icon={<SpeedIcon className="text-indigo-600" />}
//             color="border-indigo-500"
//           />
//           <StatCard
//             title="Total Revenue"
//             value={`RWF ${(stats.totalRevenue / 1000).toFixed(0)}k`}
//             icon={<OrdersIcon className="text-emerald-600" />}
//             color="border-emerald-500"
//           />
//         </div>
//       </div>

//       <div className="px-4 sm:px-6">
//         <div className="flex gap-2 overflow-x-auto pb-2">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
//                 activeTab === tab.id
//                   ? "bg-purple-600 text-white shadow-md"
//                   : "bg-white text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               {tab.icon}
//               <span className="text-sm">{tab.label}</span>
//               {tab.count !== undefined && tab.count > 0 && (
//                 <span
//                   className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
//                     activeTab === tab.id
//                       ? "bg-white/20"
//                       : "bg-purple-100 text-purple-600"
//                   }`}
//                 >
//                   {tab.count}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="px-4 sm:px-6 pt-4">
//         <div className="relative max-w-md">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
//           <input
//             type="text"
//             placeholder="Search by Order ID, Table, or Customer..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
//           />
//         </div>
//       </div>

//       <div className="p-4 sm:p-6">
//         {activeTab === "active" && (
//           <>
//             {preparingOrders.length > 0 && (
//               <div className="mb-6">
//                 <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
//                   <FireIcon className="text-purple-600" /> In Progress (
//                   {preparingOrders.length})
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//                   <AnimatePresence>
//                     {preparingOrders.map((order) => (
//                       <KitchenOrderCard
//                         key={order._id}
//                         order={order}
//                         onStartPreparation={startPreparation}
//                         onMarkReady={markAsReady}
//                         onUpdateStatus={updateOrderStatus}
//                         onViewDetails={setSelectedOrder}
//                       />
//                     ))}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             )}
//             {preparingOrders.length === 0 && (
//               <div className="text-center py-12 bg-white rounded-xl">
//                 <KitchenIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//                 <p className="text-gray-500">
//                   No active orders. Kitchen is idle.
//                 </p>
//               </div>
//             )}
//           </>
//         )}
//         {(activeTab === "ready" ||
//           activeTab === "completed" ||
//           activeTab === "all") && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//             {filteredOrders.map((order) => (
//               <KitchenOrderCard
//                 key={order._id}
//                 order={order}
//                 onStartPreparation={startPreparation}
//                 onMarkReady={markAsReady}
//                 onUpdateStatus={updateOrderStatus}
//                 onViewDetails={setSelectedOrder}
//               />
//             ))}
//             {filteredOrders.length === 0 && (
//               <div className="col-span-full text-center py-12 bg-white rounded-xl">
//                 <OrdersIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//                 <p className="text-gray-500">No orders found.</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {selectedOrder && (
//         <OrderDetailsModal
//           order={selectedOrder}
//           onClose={() => setSelectedOrder(null)}
//           onStartPreparation={startPreparation}
//           onMarkReady={markAsReady}
//           onUpdateStatus={updateOrderStatus}
//         />
//       )}
//     </div>
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
  Close as CloseIcon,
  PlayArrow as StartIcon,
  Fastfood as FoodIcon,
  NoteAlt as NoteIcon,
  Settings as SettingsIcon,
  ListAlt as ListAltIcon,
  Grass as GrassIcon,
  Science as ScienceIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// ========== API CONFIGURATION ==========
const API_BASE_URL = "https://nutriscan-foodanddrinksupply.onrender.com";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout - server took too long to respond");
    } else if (error.response) {
      console.error(`API Error ${error.response.status}:`, error.response.data);
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } else if (error.request) {
      console.error("No response received from server - network issue");
    } else {
      console.error("Request error:", error.message);
    }
    return Promise.reject(error);
  }
);

// ========== ALLOWED STATUSES AND TRANSITIONS ==========
const ALLOWED_STATUSES = ["preparing", "ready", "completed"];

// Define valid status transitions
const VALID_TRANSITIONS = {
  preparing: ["ready"], // Can only go from preparing to ready
  ready: ["completed"], // Can only go from ready to completed
  completed: [], // Cannot change from completed
};

// Check if status transition is valid
const isValidTransition = (currentStatus, newStatus) => {
  if (currentStatus === newStatus) return false;
  const allowedNext = VALID_TRANSITIONS[currentStatus];
  return allowedNext ? allowedNext.includes(newStatus) : false;
};

// ========== CACHE FOR MENU ITEMS ==========
let menuItemsCache = null;
let menuItemsListCache = null;

// Fetch all menu items (foods) from API to get ingredients
const fetchMenuItems = async () => {
  if (menuItemsCache) return menuItemsCache;
  try {
    const response = await apiClient.get("/foods");
    let foods = [];
    if (response.data?.success && response.data.foods) {
      foods = response.data.foods;
    } else if (Array.isArray(response.data)) {
      foods = response.data;
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      foods = response.data.data;
    }

    // Create a map for quick lookup by name (case insensitive)
    const menuMap = new Map();
    foods.forEach((food) => {
      menuMap.set(food.name.toLowerCase(), food);
      if (food._id) menuMap.set(food._id, food);
    });
    menuItemsCache = menuMap;
    menuItemsListCache = foods;
    return menuMap;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return new Map();
  }
};

// Get all menu items list
export const getAllMenuItems = async () => {
  if (menuItemsListCache) return menuItemsListCache;
  await fetchMenuItems();
  return menuItemsListCache || [];
};

// Enrich order item with full ingredient details from menu
const enrichOrderItemWithIngredients = async (orderItem, menuMap) => {
  const itemName = orderItem.name?.toLowerCase();
  const menuItem = menuMap.get(itemName);

  if (menuItem) {
    return {
      ...orderItem,
      fullIngredients: menuItem.ingredients || [],
      nutritionalInfo: menuItem.nutritionalInfo || {},
      purineLevel: menuItem.purineLevel,
      containsGluten: menuItem.containsGluten,
      containsPeanuts: menuItem.containsPeanuts,
      containsShellfish: menuItem.containsShellfish,
      containsDairy: menuItem.containsDairy,
      highSalt: menuItem.highSalt,
      refluxTriggers: menuItem.refluxTriggers || [],
      migraineTriggers: menuItem.migraineTriggers || [],
      image: menuItem.image,
      description: menuItem.description,
      category: menuItem.category,
      prepTime: menuItem.prepTime,
    };
  }

  return {
    ...orderItem,
    fullIngredients: [],
    nutritionalInfo: {},
    purineLevel: "unknown",
    containsGluten: false,
    containsPeanuts: false,
    containsShellfish: false,
    containsDairy: false,
    highSalt: false,
    refluxTriggers: [],
    migraineTriggers: [],
  };
};

// Transform API order to local component structure
const transformOrder = async (apiOrder, menuMap) => {
  // Get status from API (defaults to 'preparing' if not set)
  let status = apiOrder.status || "preparing";

  // Also check bookingDetails
  if (apiOrder.bookingDetails?.currentStatus) {
    status = apiOrder.bookingDetails.currentStatus;
  }

  // Ensure status is one of the allowed ones
  if (!ALLOWED_STATUSES.includes(status)) {
    status = "preparing";
  }

  let startedAt = null;
  let completedAt = null;
  if (apiOrder.bookingDetails?.statusHistory) {
    const preparingEntry = apiOrder.bookingDetails.statusHistory.find(
      (h) => h.status === "preparing"
    );
    if (preparingEntry) startedAt = preparingEntry.timestamp;

    const completedEntry = apiOrder.bookingDetails.statusHistory.find(
      (h) => h.status === "completed"
    );
    if (completedEntry) completedAt = completedEntry.timestamp;
  }

  const enrichedItems = await Promise.all(
    (apiOrder.items || []).map(async (item) => {
      const enriched = await enrichOrderItemWithIngredients(item, menuMap);
      return enriched;
    })
  );

  const totalPrepTime =
    enrichedItems.reduce(
      (sum, item) => sum + (item.preparationTime || item.prepTime || 15),
      0
    ) || 20;

  const totalAmount =
    enrichedItems.reduce(
      (sum, item) =>
        sum +
        (item.finalPrice || item.originalPrice || 0) * (item.quantity || 1),
      0
    ) || 0;

  const allCustomizations = [];
  const allSpecialInstructions = [];
  enrichedItems.forEach((item) => {
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
    items: enrichedItems,
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

// Fetch orders from API with enriched ingredients
const fetchOrdersFromAPI = async (retryCount = 0, maxRetries = 3) => {
  try {
    const menuMap = await fetchMenuItems();
    const response = await apiClient.get("/orders");

    const result = response.data;
    let ordersArray = [];

    if (result.success && Array.isArray(result.data)) {
      ordersArray = result.data;
    } else if (Array.isArray(result)) {
      ordersArray = result;
    } else if (result.orders && Array.isArray(result.orders)) {
      ordersArray = result.orders;
    }

    const transformedOrders = await Promise.all(
      ordersArray.map((order) => transformOrder(order, menuMap))
    );

    return transformedOrders;
  } catch (error) {
    console.error(`Fetch attempt ${retryCount + 1} failed:`, error.message);

    // Only retry on network errors, not on 4xx/5xx responses
    if (
      retryCount < maxRetries &&
      (error.code === "ECONNABORTED" ||
        error.code === "ERR_NETWORK" ||
        !error.response)
    ) {
      const delay = 3000 * (retryCount + 1);
      console.log(`Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchOrdersFromAPI(retryCount + 1, maxRetries);
    }

    throw error;
  }
};

// Update order status via API
const updateOrderStatusAPI = async (orderId, newStatus) => {
  // Validate status is allowed
  if (!ALLOWED_STATUSES.includes(newStatus)) {
    throw new Error(
      `Invalid status: ${newStatus}. Allowed statuses: ${ALLOWED_STATUSES.join(
        ", "
      )}`
    );
  }

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

// ========== ANIMATED BUTTON COMPONENT ==========
const AnimatedButton = ({
  onClick,
  children,
  variant,
  className = "",
  disabled = false,
  isLoading = false,
}) => {
  const getButtonStyles = () => {
    switch (variant) {
      case "start":
        return "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-purple-200";
      case "ready":
        return "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-green-200";
      case "complete":
        return "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-200";
      case "details":
        return "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300";
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white";
    }
  };

  const buttonVariants = {
    idle: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.05,
      rotate: [0, -2, 2, 0],
      transition: { duration: 0.3, type: "spring", stiffness: 300 },
    },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
    loading: {
      rotate: 360,
      transition: { duration: 1, repeat: Infinity, ease: "linear" },
    },
  };

  return (
    <motion.button
      variants={buttonVariants}
      initial="idle"
      whileHover={!disabled && !isLoading ? "hover" : "idle"}
      whileTap={!disabled && !isLoading ? "tap" : "idle"}
      animate={isLoading ? "loading" : "idle"}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`flex-1 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${getButtonStyles()} ${className}`}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
        />
      ) : (
        children
      )}
    </motion.button>
  );
};

// ========== INGREDIENT BADGE COMPONENT ==========
const IngredientBadge = ({ ingredient }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs border border-amber-200"
  >
    <GrassIcon fontSize="inherit" className="text-amber-500" />
    {ingredient}
  </motion.span>
);

// ========== KITCHEN ORDER CARD COMPONENT ==========
const KitchenOrderCard = ({
  order,
  onStartPreparation,
  onMarkReady,
  onMarkCompleted,
  onUpdateStatus,
  onViewDetails,
}) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    if (order.status === "preparing" && order.startedAt) {
      const interval = setInterval(() => {
        const elapsed = Math.floor(
          (Date.now() - new Date(order.startedAt)) / 60000
        );
        setTimeElapsed(elapsed);
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [order.status, order.startedAt]);

  const getPriorityColor = () => {
    const elapsed = timeElapsed;
    const estimatedTime = order.estimatedTime || 20;
    if (order.status === "preparing" && elapsed > estimatedTime)
      return "border-red-500 bg-red-50";
    if (order.status === "preparing" && elapsed > estimatedTime * 0.7)
      return "border-yellow-500 bg-yellow-50";
    if (order.status === "ready") return "border-green-500 bg-green-50";
    if (order.status === "completed") return "border-gray-500 bg-gray-50";
    return "border-purple-500 bg-purple-50";
  };

  const getStatusBadge = () => {
    switch (order.status) {
      case "preparing":
        return (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FireIcon className="text-purple-600 text-sm" />
            </motion.div>
            Preparing
          </motion.span>
        );
      case "ready":
        return (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <DoneAllIcon className="text-green-600 text-sm" />
            </motion.div>
            Ready
          </motion.span>
        );
      case "completed":
        return (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
          >
            <CheckCircleIcon className="text-gray-600 text-sm" />
            Completed
          </motion.span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
            {order.status}
          </span>
        );
    }
  };

  const getAllIngredients = () => {
    const allIngredients = [];
    order.items?.forEach((item) => {
      if (item.fullIngredients && item.fullIngredients.length > 0) {
        allIngredients.push(...item.fullIngredients);
      }
    });
    return [...new Set(allIngredients)];
  };

  // Determine which actions are available based on current status
  const canStart = order.status === "preparing" && !order.startedAt;
  const canMarkReady = order.status === "preparing";
  const canMarkCompleted = order.status === "ready";

  const handleAction = async (action, fn) => {
    setIsActionLoading(true);
    try {
      await fn(order);
    } finally {
      setIsActionLoading(false);
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
      className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${getPriorityColor()} transition-all duration-300 ${
        isHovered ? "shadow-xl" : ""
      }`}
    >
      <div className="p-4 border-b bg-gray-50">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-sm font-bold text-gray-700"
              >
                #{order.orderId?.slice(-8)}
              </motion.span>
              {getStatusBadge()}
            </div>
            <div className="flex items-center gap-3 mt-2 text-sm text-gray-600 flex-wrap">
              <motion.span
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-1"
              >
                <TableIcon fontSize="small" /> Table {order.tableNumber}
              </motion.span>
              <motion.span
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-1"
              >
                <PersonIcon fontSize="small" /> {order.customerName}
              </motion.span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                {order.orderType}
              </span>
            </div>
          </div>
          <div className="text-right">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1 text-orange-600 font-bold"
            >
              <TimerIcon fontSize="small" />
              <span>{order.estimatedTime} min est.</span>
            </motion.div>
            {order.status === "preparing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-gray-500 mt-1"
              >
                Elapsed: {timeElapsed} min
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-1">
          <FoodIcon fontSize="small" /> Order Items ({order.items?.length || 0})
        </h4>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {order.items?.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="text-sm border-b border-gray-100 pb-3 last:border-0"
            >
              <div className="flex justify-between flex-wrap gap-2">
                <span className="font-medium">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-gray-500">
                  {item.preparationTime || item.prepTime || 15} min
                </span>
              </div>

              {item.fullIngredients && item.fullIngredients.length > 0 && (
                <div className="mt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowIngredients(!showIngredients)}
                    className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium"
                  >
                    <ListAltIcon fontSize="inherit" />
                    {showIngredients ? "Hide" : "Show"} Ingredients (
                    {item.fullIngredients.length})
                  </motion.button>
                  <AnimatePresence>
                    {showIngredients && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 p-2 bg-emerald-50 rounded-lg overflow-hidden"
                      >
                        <p className="text-xs font-medium text-emerald-700 mb-1.5 flex items-center gap-1">
                          <ScienceIcon fontSize="small" /> Required Ingredients:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.fullIngredients.map((ing, i) => (
                            <IngredientBadge key={i} ingredient={ing} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {(item.containsGluten ||
                item.containsPeanuts ||
                item.containsShellfish ||
                item.containsDairy) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 flex flex-wrap gap-1"
                >
                  {item.containsGluten && (
                    <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                      ⚠️ Gluten
                    </span>
                  )}
                  {item.containsPeanuts && (
                    <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                      ⚠️ Peanuts
                    </span>
                  )}
                  {item.containsShellfish && (
                    <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                      ⚠️ Shellfish
                    </span>
                  )}
                  {item.containsDairy && (
                    <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                      ⚠️ Dairy
                    </span>
                  )}
                </motion.div>
              )}

              {item.customizations?.length > 0 && (
                <div className="text-xs text-orange-600 mt-1">
                  ✨ Custom: {item.customizations.join(", ")}
                </div>
              )}

              {item.specialInstructions && (
                <div className="text-xs text-blue-600 mt-1">
                  📝 {item.specialInstructions}
                </div>
              )}

              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>
                  RWF{" "}
                  {(
                    (item.finalPrice || item.originalPrice || 0) *
                    (item.quantity || 1)
                  ).toLocaleString()}
                </span>
                {item.purineLevel && item.purineLevel !== "unknown" && (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`px-1.5 py-0.5 rounded-full text-xs ${
                      item.purineLevel === "low"
                        ? "bg-green-100 text-green-700"
                        : item.purineLevel === "moderate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.purineLevel} purine
                  </motion.span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {getAllIngredients().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200"
          >
            <p className="text-xs font-medium text-amber-700 mb-1 flex items-center gap-1">
              <ListAltIcon fontSize="small" /> All Ingredients Needed:
            </p>
            <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
              {getAllIngredients()
                .slice(0, 8)
                .map((ing, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full"
                  >
                    {ing}
                  </motion.span>
                ))}
              {getAllIngredients().length > 8 && (
                <span className="text-xs text-gray-400">
                  +{getAllIngredients().length - 8} more
                </span>
              )}
            </div>
          </motion.div>
        )}

        {order.notes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="text-xs text-gray-600 flex items-start gap-1">
              <NoteIcon fontSize="small" className="text-gray-400" />
              <span className="font-medium">Notes:</span> {order.notes}
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 border-t bg-gray-50 flex gap-2 flex-wrap">
        {/* Status actions with animations */}
        {canStart && (
          <AnimatedButton
            variant="start"
            onClick={() => handleAction("start", onStartPreparation)}
            isLoading={isActionLoading}
          >
            <StartIcon fontSize="small" /> Start Cooking
          </AnimatedButton>
        )}

        {canMarkReady && (
          <AnimatedButton
            variant="ready"
            onClick={() => handleAction("ready", onMarkReady)}
            isLoading={isActionLoading}
          >
            <DoneAllIcon fontSize="small" /> Mark Ready
          </AnimatedButton>
        )}

        {canMarkCompleted && (
          <AnimatedButton
            variant="complete"
            onClick={() => handleAction("complete", onMarkCompleted)}
            isLoading={isActionLoading}
          >
            <CheckCircleIcon fontSize="small" /> Complete Order
          </AnimatedButton>
        )}

        <AnimatedButton
          variant="details"
          onClick={() => onViewDetails(order)}
          className="px-4"
        >
          <ViewIcon fontSize="small" /> Details
        </AnimatedButton>
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
  onMarkCompleted,
  onUpdateStatus,
}) => {
  const [isActionLoading, setIsActionLoading] = useState(false);

  if (!order) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "bg-purple-100 text-purple-800";
      case "ready":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAllIngredients = () => {
    const allIngredients = [];
    order.items?.forEach((item) => {
      if (item.fullIngredients && item.fullIngredients.length > 0) {
        allIngredients.push(...item.fullIngredients);
      }
    });
    return [...new Set(allIngredients)];
  };

  const canStart = order.status === "preparing" && !order.startedAt;
  const canMarkReady = order.status === "preparing";
  const canMarkCompleted = order.status === "ready";

  const handleAction = async (fn) => {
    setIsActionLoading(true);
    try {
      await fn(order);
      onClose();
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-white font-bold text-xl">Order Details</h2>
            <p className="text-purple-200 text-sm">
              Kitchen View - Full Ingredients
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full"
          >
            <CloseIcon className="text-white" />
          </motion.button>
        </div>

        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl"
          >
            <div>
              <p className="text-xs text-gray-500">Order ID</p>
              <p className="font-mono font-medium text-sm">
                {order.orderId?.slice(-12)}
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
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </motion.span>
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
          </motion.div>

          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FoodIcon fontSize="small" /> Items to Prepare
          </h3>
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {order.items?.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="border rounded-lg p-4"
              >
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
                    <p className="text-xs text-gray-400 mt-1">
                      Prep: {item.preparationTime || item.prepTime || 15} min
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-orange-600">
                      RWF{" "}
                      {(
                        (item.finalPrice || item.originalPrice) *
                        (item.quantity || 1)
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>

                {item.fullIngredients && item.fullIngredients.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 p-3 bg-emerald-50 rounded-lg"
                  >
                    <p className="text-xs font-bold text-emerald-700 flex items-center gap-1 mb-2">
                      <ScienceIcon fontSize="small" /> Ingredients for{" "}
                      {item.name}:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.fullIngredients.map((ing, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.02 }}
                          className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full"
                        >
                          {ing}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {(item.containsGluten ||
                  item.containsPeanuts ||
                  item.containsShellfish ||
                  item.containsDairy ||
                  item.highSalt) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 p-2 bg-red-50 rounded-lg"
                  >
                    <p className="text-xs font-medium text-red-700 flex items-center gap-1">
                      <WarningIcon fontSize="small" /> Allergen Info:
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.containsGluten && (
                        <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                          Gluten
                        </span>
                      )}
                      {item.containsPeanuts && (
                        <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                          Peanuts
                        </span>
                      )}
                      {item.containsShellfish && (
                        <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                          Shellfish
                        </span>
                      )}
                      {item.containsDairy && (
                        <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                          Dairy
                        </span>
                      )}
                      {item.highSalt && (
                        <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                          High Salt
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}

                {(item.refluxTriggers?.length > 0 ||
                  item.migraineTriggers?.length > 0) && (
                  <div className="mt-2 p-2 bg-orange-50 rounded-lg">
                    <p className="text-xs font-medium text-orange-700">
                      Health Triggers:
                    </p>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {item.refluxTriggers?.map((t, i) => (
                        <span
                          key={i}
                          className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded"
                        >
                          Reflux: {t}
                        </span>
                      ))}
                      {item.migraineTriggers?.map((t, i) => (
                        <span
                          key={i}
                          className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded"
                        >
                          Migraine: {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {item.customizations?.length > 0 && (
                  <div className="mt-2 p-2 bg-orange-50 rounded-lg">
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
              </motion.div>
            ))}
          </div>

          {getAllIngredients().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-amber-50 rounded-xl border border-amber-200"
            >
              <p className="text-sm font-bold text-amber-800 flex items-center gap-2 mb-2">
                <ListAltIcon /> Complete Shopping List for this Order
              </p>
              <div className="flex flex-wrap gap-2">
                {getAllIngredients().map((ing, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-sm"
                  >
                    {ing}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {order.notes && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 bg-gray-50 rounded-lg"
            >
              <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <NoteIcon fontSize="small" /> Order Notes
              </p>
              <p className="text-sm text-gray-600 mt-1">{order.notes}</p>
            </motion.div>
          )}

          <div className="flex gap-3 pt-4 border-t flex-wrap">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              Close
            </motion.button>

            {canStart && (
              <AnimatedButton
                variant="start"
                onClick={() => handleAction(onStartPreparation)}
                isLoading={isActionLoading}
              >
                <StartIcon fontSize="small" /> Start Cooking
              </AnimatedButton>
            )}

            {canMarkReady && (
              <AnimatedButton
                variant="ready"
                onClick={() => handleAction(onMarkReady)}
                isLoading={isActionLoading}
              >
                <DoneAllIcon fontSize="small" /> Mark as Ready
              </AnimatedButton>
            )}

            {canMarkCompleted && (
              <AnimatedButton
                variant="complete"
                onClick={() => handleAction(onMarkCompleted)}
                isLoading={isActionLoading}
              >
                <CheckCircleIcon fontSize="small" /> Complete Order
              </AnimatedButton>
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
      transition={{ type: "spring", stiffness: 300 }}
      className={`bg-white rounded-xl shadow-lg p-4 sm:p-5 border-l-4 ${color}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-xs sm:text-sm font-medium">
            {title}
          </p>
          <motion.p
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-xl sm:text-2xl font-bold text-gray-800 mt-1"
          >
            {value}
          </motion.p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className={`p-2 sm:p-3 rounded-full bg-${
            color.split("-")[1]
          }-100 bg-opacity-20`}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
};

// ========== CONNECTION STATUS BANNER ==========
const ConnectionStatusBanner = ({ isConnected, onRetry, isLoading }) => {
  if (isConnected && !isLoading) return null;

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 sm:mx-6 mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-5 w-5 border-b-2 border-blue-500"
          />
          <p className="text-blue-700">Connecting to server...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 sm:mx-6 mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex justify-between items-center"
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-red-500"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </motion.div>
        <div>
          <p className="text-red-700 font-medium">Connection Error</p>
          <p className="text-red-600 text-sm">
            Cannot connect to the server. The server might be starting up or
            experiencing issues.
          </p>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRetry}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
      >
        Retry
      </motion.button>
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
  const [isConnected, setIsConnected] = useState(true);
  const [stats, setStats] = useState({
    preparingOrders: 0,
    readyOrders: 0,
    completedOrders: 0,
    completedToday: 0,
    avgPreparationTime: 0,
    totalRevenue: 0,
  });
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const previousOrdersRef = useRef([]);

  const navigate = useNavigate();

const handleLogout = async () => {
  const token = localStorage.getItem("auth_token");

  try {
    if (token) {
      await axios.post(
        "https://nutriscan-foodanddrinksupply.onrender.com/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    toast.success("Logged out successfully");
  } catch (error) {
    console.error("LOGOUT ERROR:", error.response?.data || error.message);
    toast.error("Session ended");
  } finally {
    // 1. CLEAR STORAGE
    localStorage.clear();
    sessionStorage.clear();

    // 2. CLEAR COOKIES (IMPORTANT)
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
    });

    // 3. CLEAR AXIOS AUTH HEADER
    delete axios.defaults.headers.common["Authorization"];

    // 4. FORCE HARD RESET STATE (important if using React state)
    window.dispatchEvent(new Event("logout"));

    // 5. FORCE REDIRECT (no back to dashboard)
    window.location.replace("/login");
  }
};

  const calculateStats = useCallback((ordersList) => {
    const preparing = ordersList.filter((o) => o.status === "preparing").length;
    const ready = ordersList.filter((o) => o.status === "ready").length;
    const completed = ordersList.filter((o) => o.status === "completed").length;
    const completedToday = ordersList.filter(
      (o) =>
        o.status === "completed" &&
        new Date(o.createdAt).toDateString() === new Date().toDateString()
    ).length;
    const completedOrdersWithTimes = ordersList.filter(
      (o) => o.status === "completed" && o.startedAt && o.completedAt
    );
    const avgTime =
      completedOrdersWithTimes.length > 0
        ? Math.round(
            completedOrdersWithTimes.reduce((sum, o) => {
              const start = new Date(o.startedAt);
              const end = new Date(o.completedAt);
              return sum + (end - start) / 60000;
            }, 0) / completedOrdersWithTimes.length
          )
        : 0;
    const totalRevenue = ordersList
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    setStats({
      preparingOrders: preparing,
      readyOrders: ready,
      completedOrders: completed,
      completedToday,
      avgPreparationTime: avgTime,
      totalRevenue,
    });
  }, []);

  const loadOrders = useCallback(
    async (showLoading = true) => {
      if (showLoading) {
        setRefreshing(true);
        setLoading(true);
      }
      try {
        const apiOrders = await fetchOrdersFromAPI();
        setOrders(apiOrders);
        setLastRefresh(new Date());
        setIsConnected(true);
        calculateStats(apiOrders);
        const previousOrders = previousOrdersRef.current;
        const newOrders = apiOrders.filter(
          (o) =>
            o.status === "preparing" &&
            !previousOrders.some((prev) => prev._id === o._id)
        );
        if (newOrders.length > 0) {
          toast.info(
            `${newOrders.length} new order${
              newOrders.length > 1 ? "s" : ""
            } received!`
          );
        }
        previousOrdersRef.current = apiOrders;
      } catch (error) {
        console.error("Error loading orders:", error);
        setIsConnected(false);
        toast.error(
          "Failed to load orders from server. Check your connection."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [calculateStats]
  );

  // Update order status
  const updateOrderStatus = async (order, newStatus) => {
    // Validate status transition
    if (!isValidTransition(order.status, newStatus)) {
      let errorMessage = `Cannot change status from ${order.status} to ${newStatus}. `;
      if (order.status === "preparing") {
        errorMessage += 'Order must be marked as "ready" first.';
      } else if (order.status === "ready") {
        errorMessage += 'Order can only be marked as "completed".';
      } else if (order.status === "completed") {
        errorMessage += "Completed orders cannot be changed.";
      }
      toast.error(errorMessage);
      return;
    }

    try {
      await updateOrderStatusAPI(order.orderId, newStatus);
      toast.success(
        `Order #${order.orderId?.slice(-8)} marked as ${newStatus}`
      );
      await loadOrders(false);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to update order status";
      toast.error(errorMsg);
    }
  };

  const startPreparation = async (order) => {
    await updateOrderStatus(order, "preparing");
  };

  const markAsReady = async (order) => {
    await updateOrderStatus(order, "ready");
    toast.success(`Order #${order.orderId?.slice(-8)} is ready for serving!`);
  };

  const markAsCompleted = async (order) => {
    await updateOrderStatus(order, "completed");
    toast.success(`Order #${order.orderId?.slice(-8)} is completed!`);
  };

  useEffect(() => {
    loadOrders();
    const interval = setInterval(() => {
      if (isConnected) {
        loadOrders(false);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [loadOrders, isConnected]);

  const getFilteredOrders = () => {
    let filtered = orders;
    if (activeTab === "active")
      filtered = orders.filter((o) => o.status === "preparing");
    else if (activeTab === "ready")
      filtered = orders.filter((o) => o.status === "ready");
    else if (activeTab === "completed")
      filtered = orders.filter((o) => o.status === "completed");
    else if (activeTab === "all") filtered = orders;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.orderId?.toLowerCase().includes(term) ||
          o.tableNumber?.toString().includes(term) ||
          o.customerName?.toLowerCase().includes(term)
      );
    }
    return filtered.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  const filteredOrders = getFilteredOrders();

  const tabs = [
    {
      id: "active",
      label: "Active Orders",
      icon: <FireIcon />,
      count: stats.preparingOrders,
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
    { id: "all", label: "All Orders", icon: <OrdersIcon /> },
  ];

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"
          />
          <p className="text-gray-600">Connecting to kitchen server...</p>
          <p className="text-gray-400 text-sm mt-2">
            This may take a few moments
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg sticky top-0 z-10"
      >
        <div className="px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="bg-white/20 p-2 rounded-lg"
            >
              <KitchenIcon className="text-white" />
            </motion.div>
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
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => loadOrders()}
              disabled={refreshing}
              className={`p-2 rounded-full transition ${
                refreshing ? "animate-spin" : "hover:bg-white/20"
              }`}
            >
              <RefreshIcon className="text-white" />
            </motion.button>
            <div className="bg-white/20 px-2 sm:px-3 py-2 rounded-lg text-xs">
              Last: {lastRefresh.toLocaleTimeString()}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-white/20 px-3 py-2 rounded-lg text-sm hover:bg-white/30 flex items-center gap-1"
            >
              <LogoutIcon fontSize="small" /> Logout
            </motion.button>
          </div>
        </div>
      </motion.header>

      <ConnectionStatusBanner
        isConnected={isConnected}
        isLoading={loading && orders.length === 0}
        onRetry={() => loadOrders()}
      />

      <div className="p-4 sm:p-6 pb-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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
            subtitle="Awaiting serving"
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

      <div className="px-4 sm:px-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id
                      ? "bg-white/20"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {tab.count}
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

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

      <div className="p-4 sm:p-6">
        {filteredOrders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 bg-white rounded-xl"
          >
            <OrdersIcon className="text-gray-300 text-6xl mx-auto mb-4" />
            <p className="text-gray-500">No orders found in this category.</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <AnimatePresence>
            {filteredOrders.map((order) => (
              <KitchenOrderCard
                key={order._id}
                order={order}
                onStartPreparation={startPreparation}
                onMarkReady={markAsReady}
                onMarkCompleted={markAsCompleted}
                onUpdateStatus={updateOrderStatus}
                onViewDetails={setSelectedOrder}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onStartPreparation={startPreparation}
            onMarkReady={markAsReady}
            onMarkCompleted={markAsCompleted}
            onUpdateStatus={updateOrderStatus}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
















