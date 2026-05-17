/* eslint-disable react-refresh/only-export-components */
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
//   headers: {
//     "Content-Type": "application/json",
//   },
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
//       console.error("No response received from server - network issue");
//     } else {
//       console.error("Request error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// // ========== ALLOWED STATUSES AND TRANSITIONS ==========
// const ALLOWED_STATUSES = ["preparing", "ready", "completed"];

// // Define valid status transitions
// const VALID_TRANSITIONS = {
//   preparing: ["ready"], // Can only go from preparing to ready
//   ready: ["completed"], // Can only go from ready to completed
//   completed: [], // Cannot change from completed
// };

// // Check if status transition is valid
// const isValidTransition = (currentStatus, newStatus) => {
//   if (currentStatus === newStatus) return false;
//   const allowedNext = VALID_TRANSITIONS[currentStatus];
//   return allowedNext ? allowedNext.includes(newStatus) : false;
// };

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
//   // Get status from API (defaults to 'preparing' if not set)
//   let status = apiOrder.status || "preparing";

//   // Also check bookingDetails
//   if (apiOrder.bookingDetails?.currentStatus) {
//     status = apiOrder.bookingDetails.currentStatus;
//   }

//   // Ensure status is one of the allowed ones
//   if (!ALLOWED_STATUSES.includes(status)) {
//     status = "preparing";
//   }

//   let startedAt = null;
//   let completedAt = null;
//   if (apiOrder.bookingDetails?.statusHistory) {
//     const preparingEntry = apiOrder.bookingDetails.statusHistory.find(
//       (h) => h.status === "preparing"
//     );
//     if (preparingEntry) startedAt = preparingEntry.timestamp;

//     const completedEntry = apiOrder.bookingDetails.statusHistory.find(
//       (h) => h.status === "completed"
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

//     // Only retry on network errors, not on 4xx/5xx responses
//     if (
//       retryCount < maxRetries &&
//       (error.code === "ECONNABORTED" ||
//         error.code === "ERR_NETWORK" ||
//         !error.response)
//     ) {
//       const delay = 3000 * (retryCount + 1);
//       console.log(`Retrying in ${delay}ms...`);
//       await new Promise((resolve) => setTimeout(resolve, delay));
//       return fetchOrdersFromAPI(retryCount + 1, maxRetries);
//     }

//     throw error;
//   }
// };

// // Update order status via API
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

// // ========== ANIMATED BUTTON COMPONENT ==========
// const AnimatedButton = ({
//   onClick,
//   children,
//   variant,
//   className = "",
//   disabled = false,
//   isLoading = false,
// }) => {
//   const getButtonStyles = () => {
//     switch (variant) {
//       case "start":
//         return "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-purple-200";
//       case "ready":
//         return "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-green-200";
//       case "complete":
//         return "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-200";
//       case "details":
//         return "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300";
//       default:
//         return "bg-gray-500 hover:bg-gray-600 text-white";
//     }
//   };

//   const buttonVariants = {
//     idle: { scale: 1, rotate: 0 },
//     hover: {
//       scale: 1.05,
//       rotate: [0, -2, 2, 0],
//       transition: { duration: 0.3, type: "spring", stiffness: 300 },
//     },
//     tap: { scale: 0.95, transition: { duration: 0.1 } },
//     loading: {
//       rotate: 360,
//       transition: { duration: 1, repeat: Infinity, ease: "linear" },
//     },
//   };

//   return (
//     <motion.button
//       variants={buttonVariants}
//       initial="idle"
//       whileHover={!disabled && !isLoading ? "hover" : "idle"}
//       whileTap={!disabled && !isLoading ? "tap" : "idle"}
//       animate={isLoading ? "loading" : "idle"}
//       onClick={onClick}
//       disabled={disabled || isLoading}
//       className={`flex-1 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${getButtonStyles()} ${className}`}
//     >
//       {isLoading ? (
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
//         />
//       ) : (
//         children
//       )}
//     </motion.button>
//   );
// };

// // ========== INGREDIENT BADGE COMPONENT ==========
// const IngredientBadge = ({ ingredient }) => (
//   <motion.span
//     initial={{ opacity: 0, scale: 0.8 }}
//     animate={{ opacity: 1, scale: 1 }}
//     className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs border border-amber-200"
//   >
//     <GrassIcon fontSize="inherit" className="text-amber-500" />
//     {ingredient}
//   </motion.span>
// );

// // ========== KITCHEN ORDER CARD COMPONENT ==========
// const KitchenOrderCard = ({
//   order,
//   onStartPreparation,
//   onMarkReady,
//   onMarkCompleted,
//   onUpdateStatus,
//   onViewDetails,
// }) => {
//   const [timeElapsed, setTimeElapsed] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [showIngredients, setShowIngredients] = useState(false);
//   const [isActionLoading, setIsActionLoading] = useState(false);

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
//     if (order.status === "preparing" && elapsed > estimatedTime)
//       return "border-red-500 bg-red-50";
//     if (order.status === "preparing" && elapsed > estimatedTime * 0.7)
//       return "border-yellow-500 bg-yellow-50";
//     if (order.status === "ready") return "border-green-500 bg-green-50";
//     if (order.status === "completed") return "border-gray-500 bg-gray-50";
//     return "border-purple-500 bg-purple-50";
//   };

//   const getStatusBadge = () => {
//     switch (order.status) {
//       case "preparing":
//         return (
//           <motion.span
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
//           >
//             <motion.div
//               animate={{ rotate: [0, 10, -10, 0] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               <FireIcon className="text-purple-600 text-sm" />
//             </motion.div>
//             Preparing
//           </motion.span>
//         );
//       case "ready":
//         return (
//           <motion.span
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
//           >
//             <motion.div
//               animate={{ scale: [1, 1.2, 1] }}
//               transition={{ duration: 1, repeat: Infinity }}
//             >
//               <DoneAllIcon className="text-green-600 text-sm" />
//             </motion.div>
//             Ready
//           </motion.span>
//         );
//       case "completed":
//         return (
//           <motion.span
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
//           >
//             <CheckCircleIcon className="text-gray-600 text-sm" />
//             Completed
//           </motion.span>
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

//   // Determine which actions are available based on current status
//   const canStart = order.status === "preparing" && !order.startedAt;
//   const canMarkReady = order.status === "preparing";
//   const canMarkCompleted = order.status === "ready";

//   const handleAction = async (action, fn) => {
//     setIsActionLoading(true);
//     try {
//       await fn(order);
//     } finally {
//       setIsActionLoading(false);
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
//       className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${getPriorityColor()} transition-all duration-300 ${
//         isHovered ? "shadow-xl" : ""
//       }`}
//     >
//       <div className="p-4 border-b bg-gray-50">
//         <div className="flex justify-between items-start flex-wrap gap-2">
//           <div>
//             <div className="flex items-center gap-2 flex-wrap">
//               <motion.span
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="font-mono text-sm font-bold text-gray-700"
//               >
//                 #{order.orderId?.slice(-8)}
//               </motion.span>
//               {getStatusBadge()}
//             </div>
//             <div className="flex items-center gap-3 mt-2 text-sm text-gray-600 flex-wrap">
//               <motion.span
//                 initial={{ x: -10, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 0.1 }}
//                 className="flex items-center gap-1"
//               >
//                 <TableIcon fontSize="small" /> Table {order.tableNumber}
//               </motion.span>
//               <motion.span
//                 initial={{ x: -10, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="flex items-center gap-1"
//               >
//                 <PersonIcon fontSize="small" /> {order.customerName}
//               </motion.span>
//               <span className="flex items-center gap-1 text-xs text-gray-400">
//                 {order.orderType}
//               </span>
//             </div>
//           </div>
//           <div className="text-right">
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               className="flex items-center gap-1 text-orange-600 font-bold"
//             >
//               <TimerIcon fontSize="small" />
//               <span>{order.estimatedTime} min est.</span>
//             </motion.div>
//             {order.status === "preparing" && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-xs text-gray-500 mt-1"
//               >
//                 Elapsed: {timeElapsed} min
//               </motion.div>
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
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: idx * 0.05 }}
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
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setShowIngredients(!showIngredients)}
//                     className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium"
//                   >
//                     <ListAltIcon fontSize="inherit" />
//                     {showIngredients ? "Hide" : "Show"} Ingredients (
//                     {item.fullIngredients.length})
//                   </motion.button>
//                   <AnimatePresence>
//                     {showIngredients && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         className="mt-2 p-2 bg-emerald-50 rounded-lg overflow-hidden"
//                       >
//                         <p className="text-xs font-medium text-emerald-700 mb-1.5 flex items-center gap-1">
//                           <ScienceIcon fontSize="small" /> Required Ingredients:
//                         </p>
//                         <div className="flex flex-wrap gap-1.5">
//                           {item.fullIngredients.map((ing, i) => (
//                             <IngredientBadge key={i} ingredient={ing} />
//                           ))}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               )}

//               {(item.containsGluten ||
//                 item.containsPeanuts ||
//                 item.containsShellfish ||
//                 item.containsDairy) && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="mt-1 flex flex-wrap gap-1"
//                 >
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
//                 </motion.div>
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
//                   <motion.span
//                     initial={{ scale: 0.8 }}
//                     animate={{ scale: 1 }}
//                     className={`px-1.5 py-0.5 rounded-full text-xs ${
//                       item.purineLevel === "low"
//                         ? "bg-green-100 text-green-700"
//                         : item.purineLevel === "moderate"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {item.purineLevel} purine
//                   </motion.span>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {getAllIngredients().length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200"
//           >
//             <p className="text-xs font-medium text-amber-700 mb-1 flex items-center gap-1">
//               <ListAltIcon fontSize="small" /> All Ingredients Needed:
//             </p>
//             <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
//               {getAllIngredients()
//                 .slice(0, 8)
//                 .map((ing, i) => (
//                   <motion.span
//                     key={i}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: i * 0.02 }}
//                     className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full"
//                   >
//                     {ing}
//                   </motion.span>
//                 ))}
//               {getAllIngredients().length > 8 && (
//                 <span className="text-xs text-gray-400">
//                   +{getAllIngredients().length - 8} more
//                 </span>
//               )}
//             </div>
//           </motion.div>
//         )}

//         {order.notes && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-200"
//           >
//             <div className="text-xs text-gray-600 flex items-start gap-1">
//               <NoteIcon fontSize="small" className="text-gray-400" />
//               <span className="font-medium">Notes:</span> {order.notes}
//             </div>
//           </motion.div>
//         )}
//       </div>

//       <div className="p-4 border-t bg-gray-50 flex gap-2 flex-wrap">
//         {/* Status actions with animations */}
//         {canStart && (
//           <AnimatedButton
//             variant="start"
//             onClick={() => handleAction("start", onStartPreparation)}
//             isLoading={isActionLoading}
//           >
//             <StartIcon fontSize="small" /> Start Cooking
//           </AnimatedButton>
//         )}

//         {canMarkReady && (
//           <AnimatedButton
//             variant="ready"
//             onClick={() => handleAction("ready", onMarkReady)}
//             isLoading={isActionLoading}
//           >
//             <DoneAllIcon fontSize="small" /> Mark Ready
//           </AnimatedButton>
//         )}

//         {canMarkCompleted && (
//           <AnimatedButton
//             variant="complete"
//             onClick={() => handleAction("complete", onMarkCompleted)}
//             isLoading={isActionLoading}
//           >
//             <CheckCircleIcon fontSize="small" /> Complete Order
//           </AnimatedButton>
//         )}

//         <AnimatedButton
//           variant="details"
//           onClick={() => onViewDetails(order)}
//           className="px-4"
//         >
//           <ViewIcon fontSize="small" /> Details
//         </AnimatedButton>
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
//   onMarkCompleted,
//   onUpdateStatus,
// }) => {
//   const [isActionLoading, setIsActionLoading] = useState(false);

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

//   const canStart = order.status === "preparing" && !order.startedAt;
//   const canMarkReady = order.status === "preparing";
//   const canMarkCompleted = order.status === "ready";

//   const handleAction = async (fn) => {
//     setIsActionLoading(true);
//     try {
//       await fn(order);
//       onClose();
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//       >
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
//           <div>
//             <h2 className="text-white font-bold text-xl">Order Details</h2>
//             <p className="text-purple-200 text-sm">
//               Kitchen View - Full Ingredients
//             </p>
//           </div>
//           <motion.button
//             whileHover={{ scale: 1.1, rotate: 90 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={onClose}
//             className="p-1 hover:bg-white/20 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </motion.button>
//         </div>

//         <div className="p-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl"
//           >
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
//               <motion.span
//                 initial={{ scale: 0.8 }}
//                 animate={{ scale: 1 }}
//                 className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//                   order.status
//                 )}`}
//               >
//                 {order.status}
//               </motion.span>
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
//           </motion.div>

//           <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
//             <FoodIcon fontSize="small" /> Items to Prepare
//           </h3>
//           <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
//             {order.items?.map((item, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="border rounded-lg p-4"
//               >
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
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     className="mt-3 p-3 bg-emerald-50 rounded-lg"
//                   >
//                     <p className="text-xs font-bold text-emerald-700 flex items-center gap-1 mb-2">
//                       <ScienceIcon fontSize="small" /> Ingredients for{" "}
//                       {item.name}:
//                     </p>
//                     <div className="flex flex-wrap gap-1.5">
//                       {item.fullIngredients.map((ing, i) => (
//                         <motion.span
//                           key={i}
//                           initial={{ opacity: 0, scale: 0.8 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           transition={{ delay: i * 0.02 }}
//                           className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full"
//                         >
//                           {ing}
//                         </motion.span>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}

//                 {(item.containsGluten ||
//                   item.containsPeanuts ||
//                   item.containsShellfish ||
//                   item.containsDairy ||
//                   item.highSalt) && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="mt-2 p-2 bg-red-50 rounded-lg"
//                   >
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
//                   </motion.div>
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
//               </motion.div>
//             ))}
//           </div>

//           {getAllIngredients().length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mb-4 p-4 bg-amber-50 rounded-xl border border-amber-200"
//             >
//               <p className="text-sm font-bold text-amber-800 flex items-center gap-2 mb-2">
//                 <ListAltIcon /> Complete Shopping List for this Order
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {getAllIngredients().map((ing, i) => (
//                   <motion.span
//                     key={i}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: i * 0.02 }}
//                     className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-sm"
//                   >
//                     {ing}
//                   </motion.span>
//                 ))}
//               </div>
//             </motion.div>
//           )}

//           {order.notes && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="mb-4 p-3 bg-gray-50 rounded-lg"
//             >
//               <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
//                 <NoteIcon fontSize="small" /> Order Notes
//               </p>
//               <p className="text-sm text-gray-600 mt-1">{order.notes}</p>
//             </motion.div>
//           )}

//           <div className="flex gap-3 pt-4 border-t flex-wrap">
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={onClose}
//               className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
//             >
//               Close
//             </motion.button>

//             {canStart && (
//               <AnimatedButton
//                 variant="start"
//                 onClick={() => handleAction(onStartPreparation)}
//                 isLoading={isActionLoading}
//               >
//                 <StartIcon fontSize="small" /> Start Cooking
//               </AnimatedButton>
//             )}

//             {canMarkReady && (
//               <AnimatedButton
//                 variant="ready"
//                 onClick={() => handleAction(onMarkReady)}
//                 isLoading={isActionLoading}
//               >
//                 <DoneAllIcon fontSize="small" /> Mark as Ready
//               </AnimatedButton>
//             )}

//             {canMarkCompleted && (
//               <AnimatedButton
//                 variant="complete"
//                 onClick={() => handleAction(onMarkCompleted)}
//                 isLoading={isActionLoading}
//               >
//                 <CheckCircleIcon fontSize="small" /> Complete Order
//               </AnimatedButton>
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
//       transition={{ type: "spring", stiffness: 300 }}
//       className={`bg-white rounded-xl shadow-lg p-4 sm:p-5 border-l-4 ${color}`}
//     >
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-gray-500 text-xs sm:text-sm font-medium">
//             {title}
//           </p>
//           <motion.p
//             initial={{ scale: 0.5, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="text-xl sm:text-2xl font-bold text-gray-800 mt-1"
//           >
//             {value}
//           </motion.p>
//           {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
//         </div>
//         <motion.div
//           whileHover={{ rotate: 360 }}
//           transition={{ duration: 0.5 }}
//           className={`p-2 sm:p-3 rounded-full bg-${
//             color.split("-")[1]
//           }-100 bg-opacity-20`}
//         >
//           {icon}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// // ========== CONNECTION STATUS BANNER ==========
// const ConnectionStatusBanner = ({ isConnected, onRetry, isLoading }) => {
//   if (isConnected && !isLoading) return null;

//   if (isLoading) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mx-4 sm:mx-6 mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl"
//       >
//         <div className="flex items-center gap-3">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//             className="rounded-full h-5 w-5 border-b-2 border-blue-500"
//           />
//           <p className="text-blue-700">Connecting to server...</p>
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="mx-4 sm:mx-6 mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex justify-between items-center"
//     >
//       <div className="flex items-center gap-3">
//         <motion.div
//           animate={{ scale: [1, 1.2, 1] }}
//           transition={{ duration: 1, repeat: Infinity }}
//           className="text-red-500"
//         >
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
//         </motion.div>
//         <div>
//           <p className="text-red-700 font-medium">Connection Error</p>
//           <p className="text-red-600 text-sm">
//             Cannot connect to the server. The server might be starting up or
//             experiencing issues.
//           </p>
//         </div>
//       </div>
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={onRetry}
//         className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
//       >
//         Retry
//       </motion.button>
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

// const handleLogout = async () => {
//   const token = localStorage.getItem("auth_token");

//   try {
//     if (token) {
//       await axios.post(
//         "https://nutriscan-foodanddrinksupply.onrender.com/auth/logout",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//     }

//     toast.success("Logged out successfully");
//   } catch (error) {
//     console.error("LOGOUT ERROR:", error.response?.data || error.message);
//     toast.error("Session ended");
//   } finally {
//     // 1. CLEAR STORAGE
//     localStorage.clear();
//     sessionStorage.clear();

//     // 2. CLEAR COOKIES (IMPORTANT)
//     document.cookie.split(";").forEach((cookie) => {
//       document.cookie = cookie
//         .replace(/^ +/, "")
//         .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
//     });

//     // 3. CLEAR AXIOS AUTH HEADER
//     delete axios.defaults.headers.common["Authorization"];

//     // 4. FORCE HARD RESET STATE (important if using React state)
//     window.dispatchEvent(new Event("logout"));

//     // 5. FORCE REDIRECT (no back to dashboard)
//     window.location.replace("/login");
//   }
// };

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
//       .filter((o) => o.status === "completed")
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
//       if (showLoading) {
//         setRefreshing(true);
//         setLoading(true);
//       }
//       try {
//         const apiOrders = await fetchOrdersFromAPI();
//         setOrders(apiOrders);
//         setLastRefresh(new Date());
//         setIsConnected(true);
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
//         toast.error(
//           "Failed to load orders from server. Check your connection."
//         );
//       } finally {
//         setLoading(false);
//         setRefreshing(false);
//       }
//     },
//     [calculateStats]
//   );

//   // Update order status
//   const updateOrderStatus = async (order, newStatus) => {
//     // Validate status transition
//     if (!isValidTransition(order.status, newStatus)) {
//       let errorMessage = `Cannot change status from ${order.status} to ${newStatus}. `;
//       if (order.status === "preparing") {
//         errorMessage += 'Order must be marked as "ready" first.';
//       } else if (order.status === "ready") {
//         errorMessage += 'Order can only be marked as "completed".';
//       } else if (order.status === "completed") {
//         errorMessage += "Completed orders cannot be changed.";
//       }
//       toast.error(errorMessage);
//       return;
//     }

//     try {
//       await updateOrderStatusAPI(order.orderId, newStatus);
//       toast.success(
//         `Order #${order.orderId?.slice(-8)} marked as ${newStatus}`
//       );
//       await loadOrders(false);
//     } catch (error) {
//       const errorMsg =
//         error.response?.data?.message ||
//         error.message ||
//         "Failed to update order status";
//       toast.error(errorMsg);
//     }
//   };

//   const startPreparation = async (order) => {
//     await updateOrderStatus(order, "preparing");
//   };

//   const markAsReady = async (order) => {
//     await updateOrderStatus(order, "ready");
//     toast.success(`Order #${order.orderId?.slice(-8)} is ready for serving!`);
//   };

//   const markAsCompleted = async (order) => {
//     await updateOrderStatus(order, "completed");
//     toast.success(`Order #${order.orderId?.slice(-8)} is completed!`);
//   };

//   useEffect(() => {
//     loadOrders();
//     const interval = setInterval(() => {
//       if (isConnected) {
//         loadOrders(false);
//       }
//     }, 30000);
//     return () => clearInterval(interval);
//   }, [loadOrders, isConnected]);

//   const getFilteredOrders = () => {
//     let filtered = orders;
//     if (activeTab === "active")
//       filtered = orders.filter((o) => o.status === "preparing");
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
//     return filtered.sort(
//       (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//     );
//   };

//   const filteredOrders = getFilteredOrders();

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
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="text-center"
//         >
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//             className="rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"
//           />
//           <p className="text-gray-600">Connecting to kitchen server...</p>
//           <p className="text-gray-400 text-sm mt-2">
//             This may take a few moments
//           </p>
//         </motion.div>
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
//       <motion.header
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg sticky top-0 z-10"
//       >
//         <div className="px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-4">
//           <div className="flex items-center gap-3">
//             <motion.div
//               whileHover={{ rotate: 180 }}
//               transition={{ duration: 0.5 }}
//               className="bg-white/20 p-2 rounded-lg"
//             >
//               <KitchenIcon className="text-white" />
//             </motion.div>
//             <div>
//               <h1 className="text-lg sm:text-xl font-bold">
//                 Kitchen Dashboard
//               </h1>
//               <p className="text-purple-200 text-xs sm:text-sm">
//                 Real-time order management
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 sm:gap-3">
//             <motion.button
//               whileHover={{ scale: 1.1, rotate: 180 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => loadOrders()}
//               disabled={refreshing}
//               className={`p-2 rounded-full transition ${
//                 refreshing ? "animate-spin" : "hover:bg-white/20"
//               }`}
//             >
//               <RefreshIcon className="text-white" />
//             </motion.button>
//             <div className="bg-white/20 px-2 sm:px-3 py-2 rounded-lg text-xs">
//               Last: {lastRefresh.toLocaleTimeString()}
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleLogout}
//               className="bg-gradient-to-t from-red-500 to-red-700 text-white px-3 py-2 rounded-lg text-sm hover:bg-white/30 flex items-center gap-1"
//             >
//               <LogoutIcon fontSize="small" /> Logout
//             </motion.button>
//           </div>
//         </div>
//       </motion.header>

//       <ConnectionStatusBanner
//         isConnected={isConnected}
//         isLoading={loading && orders.length === 0}
//         onRetry={() => loadOrders()}
//       />

//       <div className="p-4 sm:p-6 pb-2">
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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
//             subtitle="Awaiting serving"
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
//             <motion.button
//               key={tab.id}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
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
//                 <motion.span
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
//                     activeTab === tab.id
//                       ? "bg-white/20"
//                       : "bg-purple-100 text-purple-600"
//                   }`}
//                 >
//                   {tab.count}
//                 </motion.span>
//               )}
//             </motion.button>
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
//         {filteredOrders.length === 0 && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="text-center py-12 bg-white rounded-xl"
//           >
//             <OrdersIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//             <p className="text-gray-500">No orders found in this category.</p>
//           </motion.div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//           <AnimatePresence>
//             {filteredOrders.map((order) => (
//               <KitchenOrderCard
//                 key={order._id}
//                 order={order}
//                 onStartPreparation={startPreparation}
//                 onMarkReady={markAsReady}
//                 onMarkCompleted={markAsCompleted}
//                 onUpdateStatus={updateOrderStatus}
//                 onViewDetails={setSelectedOrder}
//               />
//             ))}
//           </AnimatePresence>
//         </div>
//       </div>

//       <AnimatePresence>
//         {selectedOrder && (
//           <OrderDetailsModal
//             order={selectedOrder}
//             onClose={() => setSelectedOrder(null)}
//             onStartPreparation={startPreparation}
//             onMarkReady={markAsReady}
//             onMarkCompleted={markAsCompleted}
//             onUpdateStatus={updateOrderStatus}
//           />
//         )}
//       </AnimatePresence>
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
  PictureAsPdf as PdfIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
  (error) => Promise.reject(error),
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
  },
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
      (h) => h.status === "preparing",
    );
    if (preparingEntry) startedAt = preparingEntry.timestamp;

    const completedEntry = apiOrder.bookingDetails.statusHistory.find(
      (h) => h.status === "completed",
    );
    if (completedEntry) completedAt = completedEntry.timestamp;
  }

  const enrichedItems = await Promise.all(
    (apiOrder.items || []).map(async (item) => {
      const enriched = await enrichOrderItemWithIngredients(item, menuMap);
      return enriched;
    }),
  );

  const totalPrepTime =
    enrichedItems.reduce(
      (sum, item) => sum + (item.preparationTime || item.prepTime || 15),
      0,
    ) || 20;

  const totalAmount =
    enrichedItems.reduce(
      (sum, item) =>
        sum +
        (item.finalPrice || item.originalPrice || 0) * (item.quantity || 1),
      0,
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
      ordersArray.map((order) => transformOrder(order, menuMap)),
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
        ", ",
      )}`,
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

// ========== RECEIPT PDF GENERATION FUNCTION ==========
const generateReceiptPDF = (order) => {
  try {
    // Create new PDF document
    const doc = new jsPDF();

    // Set document properties
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let yPosition = 20;

    // Header Section
    doc.setFontSize(22);
    doc.setTextColor(128, 0, 128); // Purple color
    doc.setFont("helvetica", "bold");
    doc.text("NUTRI SCAN", pageWidth / 2, yPosition, { align: "center" });

    yPosition += 8;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.text("Food & Drink Supply", pageWidth / 2, yPosition, {
      align: "center",
    });

    yPosition += 6;
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Healthy Meals, Happy Lives", pageWidth / 2, yPosition, {
      align: "center",
    });

    // Divider Line
    yPosition += 10;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);

    // Receipt Title
    yPosition += 10;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("ORDER RECEIPT", pageWidth / 2, yPosition, { align: "center" });

    // Order Info Section
    yPosition += 12;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(`Order ID:`, margin, yPosition);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`${order.orderId || "N/A"}`, margin + 35, yPosition);

    yPosition += 6;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(`Date:`, margin, yPosition);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(
      `${new Date(order.createdAt).toLocaleString()}`,
      margin + 35,
      yPosition,
    );

    yPosition += 6;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(`Customer:`, margin, yPosition);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`${order.customerName || "Guest"}`, margin + 35, yPosition);

    yPosition += 6;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(`Table Number:`, margin, yPosition);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`${order.tableNumber || "N/A"}`, margin + 35, yPosition);

    yPosition += 6;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(`Order Type:`, margin, yPosition);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`${order.orderType || "dine-in"}`, margin + 35, yPosition);

    // Divider
    yPosition += 10;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);

    // Items Table Header
    yPosition += 8;
    doc.setFillColor(128, 0, 128);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.rect(margin, yPosition, pageWidth - margin * 2, 8, "F");
    doc.setFontSize(9);
    doc.text("Item", margin + 3, yPosition + 5);
    doc.text("Qty", margin + 100, yPosition + 5);
    doc.text("Price", margin + 130, yPosition + 5);
    doc.text("Total", margin + 160, yPosition + 5);

    // Items Table Rows
    yPosition += 8;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);

    let tableY = yPosition;
    order.items?.forEach((item, index) => {
      const itemTotal =
        (item.finalPrice || item.originalPrice || 0) * (item.quantity || 1);

      // Handle multi-line item names
      const itemName = item.name || "Unknown Item";
      const itemNameLines = doc.splitTextToSize(itemName, 85);

      // Check if we need a new page
      if (
        tableY + itemNameLines.length * 5 >
        doc.internal.pageSize.getHeight() - 40
      ) {
        doc.addPage();
        tableY = 20;

        // Re-add header on new page
        doc.setFillColor(128, 0, 128);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 255, 255);
        doc.rect(margin, tableY, pageWidth - margin * 2, 8, "F");
        doc.setFontSize(9);
        doc.text("Item", margin + 3, tableY + 5);
        doc.text("Qty", margin + 100, tableY + 5);
        doc.text("Price", margin + 130, tableY + 5);
        doc.text("Total", margin + 160, tableY + 5);
        tableY += 8;
      }

      // Add item name (with wrapping)
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      for (let i = 0; i < itemNameLines.length; i++) {
        doc.text(itemNameLines[i], margin + 3, tableY + i * 4);
      }

      // Add quantity, price, total
      const rowHeight = Math.max(5, itemNameLines.length * 4);
      doc.text(`${item.quantity || 1}`, margin + 100, tableY + rowHeight / 2);
      doc.text(
        `RWF ${(item.finalPrice || item.originalPrice || 0).toLocaleString()}`,
        margin + 130,
        tableY + rowHeight / 2,
      );
      doc.text(
        `RWF ${itemTotal.toLocaleString()}`,
        margin + 160,
        tableY + rowHeight / 2,
      );

      tableY += rowHeight + 2;
    });

    // Total Amount Section
    yPosition = tableY + 8;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition - 5, pageWidth - margin, yPosition - 5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(128, 0, 128);
    doc.text("Total Amount:", pageWidth - margin - 70, yPosition);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `RWF ${(order.totalAmount || 0).toLocaleString()}`,
      pageWidth - margin - 15,
      yPosition,
      { align: "right" },
    );

    // Footer Section
    yPosition += 15;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);

    yPosition += 8;
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for choosing Nutri Scan!", pageWidth / 2, yPosition, {
      align: "center",
    });

    yPosition += 5;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "For any inquiries, please contact our customer service.",
      pageWidth / 2,
      yPosition,
      { align: "center" },
    );

    yPosition += 5;
    doc.text(
      "Email: support@nutriscan.com | Phone: +250 788 123 456",
      pageWidth / 2,
      yPosition,
      { align: "center" },
    );

    return doc;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return null;
  }
};

// ========== RECEIPT MODAL COMPONENT ==========
const ReceiptModal = ({ order, onClose, onDownload, onPrint }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-white font-bold text-xl flex items-center gap-2">
              <PdfIcon /> Order Receipt
            </h2>
            <p className="text-green-200 text-sm">
              Order completed successfully
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
          {/* Receipt Content */}
          <div className="border-2 border-gray-200 rounded-xl p-6 mb-6 bg-white">
            {/* Header */}
            <div className="text-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-purple-600">NUTRI SCAN</h2>
              <p className="text-gray-500 text-sm">Food & Drink Supply</p>
              <p className="text-gray-400 text-xs">
                Healthy Meals, Happy Lives
              </p>
            </div>

            {/* Order Info */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Order ID</p>
                <p className="font-mono font-medium">
                  {order.orderId?.slice(-12)}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Date</p>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Customer</p>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Table</p>
                <p className="font-medium">Table {order.tableNumber}</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-4">
              <table className="w-full text-sm">
                <thead className="bg-purple-50">
                  <tr>
                    <th className="text-left p-2 font-semibold text-purple-600">
                      Item
                    </th>
                    <th className="text-center p-2 font-semibold text-purple-600">
                      Qty
                    </th>
                    <th className="text-right p-2 font-semibold text-purple-600">
                      Price
                    </th>
                    <th className="text-right p-2 font-semibold text-purple-600">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item, idx) => {
                    const itemTotal =
                      (item.finalPrice || item.originalPrice || 0) *
                      (item.quantity || 1);
                    return (
                      <tr key={idx} className="border-b">
                        <td className="p-2">{item.name}</td>
                        <td className="text-center p-2">{item.quantity}</td>
                        <td className="text-right p-2">
                          RWF{" "}
                          {(
                            item.finalPrice ||
                            item.originalPrice ||
                            0
                          ).toLocaleString()}
                        </td>
                        <td className="text-right p-2 font-medium">
                          RWF {itemTotal.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2">
                    <td colSpan="3" className="text-right p-2 font-bold">
                      Total:
                    </td>
                    <td className="text-right p-2 font-bold text-purple-600">
                      RWF {order.totalAmount?.toLocaleString() || 0}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Footer */}
            <div className="text-center border-t pt-4 mt-4">
              <p className="text-gray-500 text-sm">
                Thank you for choosing Nutri Scan!
              </p>
              <p className="text-gray-400 text-xs mt-2">
                support@nutriscan.com | +250 788 123 456
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onDownload}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 font-medium"
            >
              <DownloadIcon /> Download PDF
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onPrint}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2 font-medium"
            >
              <PrintIcon /> Print Receipt
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="px-6 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
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
                  order.status,
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
  const [receiptOrder, setReceiptOrder] = useState(null); // State for receipt modal
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
          },
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
        new Date(o.createdAt).toDateString() === new Date().toDateString(),
    ).length;
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
            !previousOrders.some((prev) => prev._id === o._id),
        );
        if (newOrders.length > 0) {
          toast.info(
            `${newOrders.length} new order${
              newOrders.length > 1 ? "s" : ""
            } received!`,
          );
        }
        previousOrdersRef.current = apiOrders;
      } catch (error) {
        console.error("Error loading orders:", error);
        setIsConnected(false);
        toast.error(
          "Failed to load orders from server. Check your connection.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [calculateStats],
  );

  // Handle PDF download
  const handleDownloadPDF = (order) => {
    const doc = generateReceiptPDF(order);
    if (doc) {
      const fileName = `receipt_${order.orderId || "order"}_${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.pdf`;
      doc.save(fileName);
      toast.success("Receipt PDF downloaded successfully!");
    } else {
      toast.error("Failed to generate PDF");
    }
  };

  // Handle print
  const handlePrint = (order) => {
    const doc = generateReceiptPDF(order);
    if (doc) {
      doc.autoPrint();
      window.open(doc.output("bloburl"), "_blank");
      toast.success("Print dialog opened!");
    } else {
      toast.error("Failed to generate PDF for printing");
    }
  };

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
        `Order #${order.orderId?.slice(-8)} marked as ${newStatus}`,
      );

      // If status is being changed to "completed", show receipt modal
      if (newStatus === "completed") {
        // Refresh orders to get the latest data
        await loadOrders(false);
        // Find the updated order
        const updatedOrder = orders.find((o) => o._id === order._id) || order;
        // Show receipt modal
        setReceiptOrder(updatedOrder);
        toast.info("Receipt is ready for download!");
      } else {
        await loadOrders(false);
      }
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
          o.customerName?.toLowerCase().includes(term),
      );
    }
    return filtered.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
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
              className="bg-gradient-to-t from-red-500 to-red-700 text-white px-3 py-2 rounded-lg text-sm hover:bg-white/30 flex items-center gap-1"
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

      {/* Receipt Modal */}
      <AnimatePresence>
        {receiptOrder && (
          <ReceiptModal
            order={receiptOrder}
            onClose={() => setReceiptOrder(null)}
            onDownload={() => handleDownloadPDF(receiptOrder)}
            onPrint={() => handlePrint(receiptOrder)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
