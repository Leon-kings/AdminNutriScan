/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/immutability */
// /* eslint-disable react-hooks/purity */
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   Dashboard as DashboardIcon,
//   RestaurantMenu as MenuIcon,
//   ShoppingCart as OrdersIcon,
//   Analytics as AnalyticsIcon,
//   Close as CloseIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   Kitchen as KitchenIcon,
//   DeliveryDining as DeliveryIcon,
//   DoneAll as DoneAllIcon,
//   Visibility as ViewIcon,
//   Search as SearchIcon,
//   Add as AddIcon,
//   Refresh as RefreshIcon,
//   Download as DownloadIcon,
//   ArrowUpward as ArrowUpIcon,
//   ArrowDownward as ArrowDownIcon,
//   AccessTime as TimeIcon,
//   AttachMoney as MoneyIcon,
//   Person as PersonIcon,
//   Restaurant as RestaurantIcon,
//   Sort as SortIcon,
//   FilterList as FilterIcon,
//   CloudUpload as CloudUploadIcon,
//   Image as ImageIcon,
//   Warning as WarningIcon,
//   Delete,
//   Lightbulb as LightbulbIcon,
//   Settings as SettingsIcon,
//   LocalOffer as LocalOfferIcon,
//   Assignment as AssignmentIcon,
//   Healing as HealingIcon,
//   Checklist as ChecklistIcon,
//   Schedule as ScheduleIcon,
//   NoteAlt as NoteIcon,
//   TrendingUp as TrendingUpIcon,
//   ShowChart as ShowChartIcon,
//   PieChart as PieChartIcon,
//   Today as TodayIcon,
//   DateRange as DateRangeIcon,
// } from "@mui/icons-material";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../App";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// // ========== STATISTICS CARD ==========
// const StatCard = ({ title, value, icon, color, trend, trendValue }) => {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       className={`bg-white rounded-2xl shadow-md p-4 sm:p-5 border-l-4 ${color} hover:shadow-lg transition-all duration-200`}
//     >
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-gray-500 text-xs sm:text-sm font-medium">
//             {title}
//           </p>
//           <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1 break-words">
//             {value}
//           </p>
//           {trend && (
//             <div className="flex items-center gap-1 mt-2">
//               {trend === "up" ? (
//                 <ArrowUpIcon className="text-green-500 text-sm" />
//               ) : (
//                 <ArrowDownIcon className="text-red-500 text-sm" />
//               )}
//               <span
//                 className={`text-xs ${trend === "up" ? "text-green-600" : "text-red-600"}`}
//               >
//                 {trendValue}
//               </span>
//             </div>
//           )}
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

// // ========== DAILY ANALYTICS CARD ==========
// const DailyAnalytics = ({ analytics, loading }) => {
//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <div className="animate-pulse">
//           <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
//           <div className="h-32 bg-gray-200 rounded"></div>
//         </div>
//       </div>
//     );
//   }

//   if (!analytics) return null;

//   const COLORS = [
//     "#FF6B6B",
//     "#4ECDC4",
//     "#45B7D1",
//     "#96CEB4",
//     "#FFEAA7",
//     "#DDA0DD",
//   ];

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//       <div className="flex items-center gap-2 mb-4">
//         <TodayIcon className="text-orange-500" />
//         <h2 className="text-lg font-bold text-gray-800">Daily Analytics</h2>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Stats Summary */}
//         <div className="space-y-4">
//           <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-xl">
//             <p className="text-sm text-gray-500">Total Orders Today</p>
//             <p className="text-2xl font-bold text-green-600">
//               {analytics.totalOrders || 0}
//             </p>
//           </div>
//           <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
//             <p className="text-sm text-gray-500">Total Income Today</p>
//             <p className="text-2xl font-bold text-blue-600">
//               RWF {(analytics.totalIncome || 0).toLocaleString()}
//             </p>
//           </div>
//         </div>

//         {/* Top Plates Chart */}
//         <div>
//           <p className="text-sm font-medium text-gray-700 mb-3">
//             Top Selling Items
//           </p>
//           {analytics.topPlates && analytics.topPlates.length > 0 ? (
//             <div className="space-y-3">
//               {analytics.topPlates.map((plate, idx) => (
//                 <div key={idx} className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <div
//                       className="w-3 h-3 rounded-full"
//                       style={{ backgroundColor: COLORS[idx % COLORS.length] }}
//                     ></div>
//                     <span className="text-sm text-gray-700">{plate.name}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm font-semibold text-orange-600">
//                       {plate.quantity}
//                     </span>
//                     <span className="text-xs text-gray-400">sold</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-sm text-gray-400">No data available</p>
//           )}
//         </div>
//       </div>

//       {/* Top Plates Bar Chart */}
//       {analytics.topPlates && analytics.topPlates.length > 0 && (
//         <div className="mt-6 h-64">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={analytics.topPlates}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" tick={{ fontSize: 12 }} />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="quantity" fill="#FF6B6B" name="Quantity Sold" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//     </div>
//   );
// };

// // ========== WEEKLY ANALYTICS CARD ==========
// const WeeklyAnalytics = ({ analytics, loading }) => {
//   const [chartType, setChartType] = useState("line");

//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <div className="animate-pulse">
//           <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
//           <div className="h-64 bg-gray-200 rounded"></div>
//         </div>
//       </div>
//     );
//   }

//   if (!analytics || !analytics.data || analytics.data.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <div className="flex items-center gap-2 mb-4">
//           <DateRangeIcon className="text-orange-500" />
//           <h2 className="text-lg font-bold text-gray-800">Weekly Analytics</h2>
//         </div>
//         <p className="text-center text-gray-400 py-8">
//           No weekly data available
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//       <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
//         <div className="flex items-center gap-2">
//           <DateRangeIcon className="text-orange-500" />
//           <h2 className="text-lg font-bold text-gray-800">Weekly Analytics</h2>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={() => setChartType("line")}
//             className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
//               chartType === "line"
//                 ? "bg-orange-500 text-white"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             <ShowChartIcon fontSize="small" /> Line
//           </button>
//           <button
//             onClick={() => setChartType("bar")}
//             className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
//               chartType === "bar"
//                 ? "bg-orange-500 text-white"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             <BarChartIcon fontSize="small" /> Bar
//           </button>
//         </div>
//       </div>

//       {/* Summary Stats */}
//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <div className="bg-green-50 p-3 rounded-xl">
//           <p className="text-xs text-gray-500">Total Orders (Week)</p>
//           <p className="text-xl font-bold text-green-600">
//             {analytics.data?.reduce((sum, d) => sum + (d.orders || 0), 0) || 0}
//           </p>
//         </div>
//         <div className="bg-blue-50 p-3 rounded-xl">
//           <p className="text-xs text-gray-500">Total Revenue (Week)</p>
//           <p className="text-xl font-bold text-blue-600">
//             RWF{" "}
//             {(
//               analytics.data?.reduce((sum, d) => sum + (d.revenue || 0), 0) || 0
//             ).toLocaleString()}
//           </p>
//         </div>
//       </div>

//       {/* Chart */}
//       <div className="h-80">
//         <ResponsiveContainer width="100%" height="100%">
//           {chartType === "line" ? (
//             <LineChart data={analytics.data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis yAxisId="left" />
//               <YAxis yAxisId="right" orientation="right" />
//               <Tooltip
//                 formatter={(value, name) => {
//                   if (name === "revenue")
//                     return `RWF ${value.toLocaleString()}`;
//                   return value;
//                 }}
//               />
//               <Legend />
//               <Line
//                 yAxisId="left"
//                 type="monotone"
//                 dataKey="orders"
//                 stroke="#FF6B6B"
//                 name="Orders"
//                 strokeWidth={2}
//               />
//               <Line
//                 yAxisId="right"
//                 type="monotone"
//                 dataKey="revenue"
//                 stroke="#4ECDC4"
//                 name="Revenue"
//                 strokeWidth={2}
//               />
//             </LineChart>
//           ) : (
//             <BarChart data={analytics.data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis yAxisId="left" />
//               <YAxis yAxisId="right" orientation="right" />
//               <Tooltip
//                 formatter={(value, name) => {
//                   if (name === "revenue")
//                     return `RWF ${value.toLocaleString()}`;
//                   return value;
//                 }}
//               />
//               <Legend />
//               <Bar
//                 yAxisId="left"
//                 dataKey="orders"
//                 fill="#FF6B6B"
//                 name="Orders"
//               />
//               <Bar
//                 yAxisId="right"
//                 dataKey="revenue"
//                 fill="#4ECDC4"
//                 name="Revenue"
//               />
//             </BarChart>
//           )}
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// // ========== ORDER RECOMMENDATIONS COMPONENT ==========
// const OrderRecommendations = ({ order }) => {
//   const [recommendations, setRecommendations] = useState([]);

//   useEffect(() => {
//     const generateRecommendations = () => {
//       const recs = [];
//       const items = order.items || order.orderSummary?.items || [];

//       const hasSpicyItems = items.some(
//         (item) =>
//           item.name?.toLowerCase().includes("spicy") ||
//           item.customizations?.some((c) => c.toLowerCase().includes("spicy")),
//       );

//       const hasDairyItems = items.some(
//         (item) =>
//           item.name?.toLowerCase().includes("cheese") ||
//           item.name?.toLowerCase().includes("cream") ||
//           item.name?.toLowerCase().includes("milk"),
//       );

//       const hasGlutenItems = items.some(
//         (item) =>
//           item.name?.toLowerCase().includes("bread") ||
//           item.name?.toLowerCase().includes("pasta") ||
//           item.name?.toLowerCase().includes("pizza"),
//       );

//       if (hasSpicyItems) {
//         recs.push({
//           type: "health",
//           icon: <HealingIcon className="text-orange-500" />,
//           title: "Acid Reflux Alert",
//           description:
//             "This order contains spicy items. Consider offering a side of yogurt or mint tea to help with digestion.",
//           priority: "high",
//         });
//       }

//       if (hasDairyItems) {
//         recs.push({
//           type: "health",
//           icon: <HealingIcon className="text-blue-500" />,
//           title: "Lactose Consideration",
//           description:
//             "Contains dairy products. Ensure lactose-free alternatives are available if requested.",
//           priority: "medium",
//         });
//       }

//       if (hasGlutenItems) {
//         recs.push({
//           type: "dietary",
//           icon: <NutritionIcon className="text-yellow-500" />,
//           title: "Gluten-Free Option",
//           description:
//             "Consider suggesting gluten-free alternatives for customers with celiac disease or gluten sensitivity.",
//           priority: "medium",
//         });
//       }

//       if (items.length < 3) {
//         recs.push({
//           type: "upsell",
//           icon: <LocalOfferIcon className="text-green-500" />,
//           title: "Add a Side Dish",
//           description:
//             "Customer ordered few items. Suggest adding fries, salad, or a beverage to complete the meal.",
//           priority: "low",
//         });
//       }

//       const itemNames = items.map((i) => i.name?.toLowerCase());
//       if (
//         itemNames.some((n) => n?.includes("burger")) &&
//         !itemNames.some((n) => n?.includes("fries"))
//       ) {
//         recs.push({
//           type: "pairing",
//           icon: <RestaurantIcon className="text-purple-500" />,
//           title: "Popular Pairing",
//           description:
//             "Customers who ordered burgers also enjoyed our crispy fries or onion rings.",
//           priority: "medium",
//         });
//       }

//       if (
//         order.notes?.toLowerCase().includes("birthday") ||
//         order.bookingDetails?.specialInstructions
//           ?.toLowerCase()
//           .includes("birthday")
//       ) {
//         recs.push({
//           type: "occasion",
//           icon: <ChecklistIcon className="text-pink-500" />,
//           title: "Birthday Celebration",
//           description:
//             "Add a complimentary dessert or candle to make the celebration special!",
//           priority: "high",
//         });
//       }

//       return recs;
//     };

//     setRecommendations(generateRecommendations());
//   }, [order]);

//   if (recommendations.length === 0) return null;

//   return (
//     <div className="mt-6">
//       <h3 className="font-bold mb-3 flex items-center gap-2">
//         <LightbulbIcon className="text-yellow-500" />
//         AI Recommendations & Insights
//       </h3>
//       <div className="space-y-3">
//         {recommendations.map((rec, idx) => (
//           <div
//             key={idx}
//             className={`p-3 rounded-lg border-l-4 ${
//               rec.priority === "high"
//                 ? "bg-orange-50 border-orange-500"
//                 : rec.priority === "medium"
//                   ? "bg-blue-50 border-blue-500"
//                   : "bg-gray-50 border-gray-400"
//             }`}
//           >
//             <div className="flex items-start gap-3">
//               <div className="mt-0.5">{rec.icon}</div>
//               <div className="flex-1">
//                 <p className="font-semibold text-sm">{rec.title}</p>
//                 <p className="text-xs text-gray-600 mt-1">{rec.description}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ========== ENHANCED ORDER DETAILS MODAL ==========
// const OrderDetailsModal = ({ order, onClose, onUpdateStatus }) => {
//   const [activeInfoTab, setActiveInfoTab] = useState("details");

//   if (!order) return null;

//   const getOrderTotal = () => {
//     if (order.orderSummary?.total) return order.orderSummary.total;
//     if (order.items) {
//       return order.items.reduce(
//         (sum, item) => sum + (item.finalPrice || item.originalPrice || 0),
//         0,
//       );
//     }
//     return 0;
//   };

//   const getAllCustomizations = () => {
//     const items = order.items || order.orderSummary?.items || [];
//     const customizations = [];
//     items.forEach((item) => {
//       if (item.customizations && item.customizations.length > 0) {
//         customizations.push({
//           itemName: item.name,
//           customizations: item.customizations,
//           specialInstructions: item.specialInstructions,
//         });
//       }
//     });
//     return customizations;
//   };

//   const getAllSpecialInstructions = () => {
//     const items = order.items || order.orderSummary?.items || [];
//     const instructions = [];
//     if (order.bookingDetails?.specialInstructions) {
//       instructions.push({
//         type: "order",
//         instruction: order.bookingDetails.specialInstructions,
//       });
//     }
//     if (order.notes) {
//       instructions.push({
//         type: "order",
//         instruction: order.notes,
//       });
//     }
//     items.forEach((item) => {
//       if (item.specialInstructions) {
//         instructions.push({
//           type: "item",
//           itemName: item.name,
//           instruction: item.specialInstructions,
//         });
//       }
//     });
//     return instructions;
//   };

//   const customizations = getAllCustomizations();
//   const instructions = getAllSpecialInstructions();

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <motion.div
//         initial={{ scale: 0.95 }}
//         animate={{ scale: 1 }}
//         className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//       >
//         <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
//           <h2 className="text-white font-bold text-xl">Order Details</h2>
//           <button onClick={onClose}>
//             <CloseIcon className="text-white" />
//           </button>
//         </div>

//         <div className="p-6">
//           <div className="flex border-b mb-4 overflow-x-auto">
//             {[
//               "details",
//               "items",
//               "customizations",
//               "instructions",
//               "recommendations",
//               "timeline",
//             ].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveInfoTab(tab)}
//                 className={`px-4 py-2 text-sm font-medium capitalize whitespace-nowrap ${
//                   activeInfoTab === tab
//                     ? "border-b-2 border-blue-500 text-blue-600"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 {tab === "details" && "Order Details"}
//                 {tab === "items" && "Items"}
//                 {tab === "customizations" && "Customizations"}
//                 {tab === "instructions" && "Instructions"}
//                 {tab === "recommendations" && "Recommendations"}
//                 {tab === "timeline" && "Timeline"}
//               </button>
//             ))}
//           </div>

//           {activeInfoTab === "details" && (
//             <div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-xl">
//                 <div>
//                   <p className="text-xs text-gray-500">Order ID</p>
//                   <p className="font-mono font-medium text-sm break-all">
//                     {order.orderId}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Table Number</p>
//                   <p className="font-medium text-lg">
//                     Table {order.personDetails?.tableNumber}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Customer Name</p>
//                   <div className="flex items-center gap-2">
//                     <PersonIcon className="text-gray-400 text-sm" />
//                     <p className="font-medium">
//                       {order.personDetails?.name || "Guest"}
//                     </p>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Order Type</p>
//                   <p className="font-medium">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs ${
//                         order.personDetails?.orderType === "dine-in"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-blue-100 text-blue-700"
//                       }`}
//                     >
//                       {order.personDetails?.orderType || "dine-in"}
//                     </span>
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Current Status</p>
//                   <select
//                     value={order.status}
//                     onChange={(e) => onUpdateStatus(order, e.target.value)}
//                     className="border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400"
//                   >
//                     {[
//                       "pending",
//                       "confirmed",
//                       "preparing",
//                       "ready",
//                       "served",
//                       "completed",
//                       "cancelled",
//                     ].map((s) => (
//                       <option key={s} className="capitalize">
//                         {s}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Created At</p>
//                   <p className="font-medium text-sm flex items-center gap-1">
//                     <ScheduleIcon className="text-gray-400 text-sm" />
//                     {new Date(order.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3 mb-6">
//                 <div className="bg-orange-50 p-3 rounded-lg text-center">
//                   <p className="text-xs text-gray-500">Total Items</p>
//                   <p className="text-xl font-bold text-orange-600">
//                     {order.items?.reduce(
//                       (sum, i) => sum + (i.quantity || 1),
//                       0,
//                     ) || 0}
//                   </p>
//                 </div>
//                 <div className="bg-green-50 p-3 rounded-lg text-center">
//                   <p className="text-xs text-gray-500">Total Amount</p>
//                   <p className="text-xl font-bold text-green-600">
//                     RWF {getOrderTotal().toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeInfoTab === "items" && (
//             <div className="space-y-3 max-h-96 overflow-y-auto">
//               {(order.items || []).map((item, idx) => (
//                 <div key={idx} className="border-b pb-3">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="font-semibold">
//                         {item.quantity || 1}x {item.name}
//                       </p>
//                       {item.preparationTime && (
//                         <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
//                           <TimeIcon fontSize="small" /> Prep time:{" "}
//                           {item.preparationTime} min
//                         </p>
//                       )}
//                     </div>
//                     <p className="font-semibold text-orange-600">
//                       RWF{" "}
//                       {(
//                         item.finalPrice ||
//                         item.originalPrice ||
//                         0
//                       ).toLocaleString()}
//                     </p>
//                   </div>
//                   {item.customizations && item.customizations.length > 0 && (
//                     <div className="mt-2">
//                       <p className="text-xs text-gray-500">Customizations:</p>
//                       <div className="flex flex-wrap gap-1 mt-1">
//                         {item.customizations.map((c, i) => (
//                           <span
//                             key={i}
//                             className="text-xs bg-gray-100 px-2 py-0.5 rounded-full"
//                           >
//                             {c}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {activeInfoTab === "customizations" && (
//             <div>
//               {customizations.length > 0 ? (
//                 <div className="space-y-4">
//                   {customizations.map((cust, idx) => (
//                     <div key={idx} className="bg-gray-50 p-3 rounded-lg">
//                       <p className="font-medium text-sm">{cust.itemName}</p>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {cust.customizations.map((c, i) => (
//                           <span
//                             key={i}
//                             className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1"
//                           >
//                             <SettingsIcon fontSize="small" /> {c}
//                           </span>
//                         ))}
//                       </div>
//                       {cust.specialInstructions && (
//                         <p className="text-xs text-gray-500 mt-2">
//                           <NoteIcon fontSize="small" className="inline mr-1" />
//                           {cust.specialInstructions}
//                         </p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-400 text-center py-8">
//                   No customizations for this order
//                 </p>
//               )}
//             </div>
//           )}

//           {activeInfoTab === "instructions" && (
//             <div>
//               {instructions.length > 0 ? (
//                 <div className="space-y-3">
//                   {instructions.map((inst, idx) => (
//                     <div
//                       key={idx}
//                       className={`p-3 rounded-lg ${inst.type === "order" ? "bg-yellow-50" : "bg-gray-50"}`}
//                     >
//                       {inst.type === "item" && (
//                         <p className="font-medium text-sm mb-1">
//                           For: {inst.itemName}
//                         </p>
//                       )}
//                       <p className="text-sm flex items-start gap-2">
//                         <AssignmentIcon className="text-gray-400 text-sm mt-0.5" />
//                         {inst.instruction}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-400 text-center py-8">
//                   No special instructions
//                 </p>
//               )}
//             </div>
//           )}

//           {activeInfoTab === "recommendations" && (
//             <OrderRecommendations order={order} />
//           )}

//           {activeInfoTab === "timeline" && (
//             <div className="space-y-4">
//               {order.bookingDetails?.statusHistory &&
//               order.bookingDetails.statusHistory.length > 0 ? (
//                 order.bookingDetails.statusHistory.map((event, idx) => (
//                   <div key={idx} className="flex gap-3">
//                     <div className="flex flex-col items-center">
//                       <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
//                       {idx < order.bookingDetails.statusHistory.length - 1 && (
//                         <div className="w-0.5 h-12 bg-gray-300"></div>
//                       )}
//                     </div>
//                     <div className="flex-1 pb-4">
//                       <p className="font-medium capitalize">{event.status}</p>
//                       <p className="text-xs text-gray-500">
//                         {new Date(event.timestamp).toLocaleString()}
//                       </p>
//                       {event.note && (
//                         <p className="text-xs text-gray-400 mt-1">
//                           {event.note}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-400 text-center py-8">
//                   No timeline data available
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== ENHANCED ORDERS TABLE ==========
// const OrdersTable = ({
//   orders,
//   onUpdateStatus,
//   onViewDetails,
//   onDeleteOrder,
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [deleteConfirmId, setDeleteConfirmId] = useState(null);
//   const itemsPerPage = 10;

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
//       case "served":
//         return "bg-teal-100 text-teal-800";
//       case "completed":
//         return "bg-gray-100 text-gray-800";
//       case "cancelled":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "pending":
//         return <TimeIcon className="text-yellow-600 text-sm" />;
//       case "confirmed":
//         return <CheckCircleIcon className="text-blue-600 text-sm" />;
//       case "preparing":
//         return <KitchenIcon className="text-purple-600 text-sm" />;
//       case "ready":
//         return <DeliveryIcon className="text-green-600 text-sm" />;
//       case "served":
//         return <DoneAllIcon className="text-teal-600 text-sm" />;
//       case "completed":
//         return <CheckCircleIcon className="text-gray-600 text-sm" />;
//       case "cancelled":
//         return <CancelIcon className="text-red-600 text-sm" />;
//       default:
//         return null;
//     }
//   };

//   const handleSort = (field) => {
//     if (sortBy === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     else {
//       setSortBy(field);
//       setSortOrder("asc");
//     }
//   };

//   const getOrderTotal = (order) => {
//     if (order.orderSummary?.total) return order.orderSummary.total;
//     if (order.items) {
//       return order.items.reduce(
//         (sum, item) => sum + (item.finalPrice || item.originalPrice || 0),
//         0,
//       );
//     }
//     return 0;
//   };

//   const getTotalItems = (order) => {
//     if (order.orderSummary?.totalItems) return order.orderSummary.totalItems;
//     if (order.items) {
//       return order.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
//     }
//     return 0;
//   };

//   const filteredOrders = orders.filter((order) => {
//     const matchesSearch =
//       order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.personDetails?.name
//         ?.toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       order.personDetails?.tableNumber?.toString().includes(searchTerm);
//     const matchesStatus =
//       statusFilter === "all" || order.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const sortedOrders = [...filteredOrders].sort((a, b) => {
//     let aVal, bVal;
//     switch (sortBy) {
//       case "createdAt":
//         aVal = new Date(a.createdAt);
//         bVal = new Date(b.createdAt);
//         break;
//       case "status":
//         const statusOrder = {
//           pending: 1,
//           confirmed: 2,
//           preparing: 3,
//           ready: 4,
//           served: 5,
//           completed: 6,
//           cancelled: 7,
//         };
//         aVal = statusOrder[a.status] || 99;
//         bVal = statusOrder[b.status] || 99;
//         break;
//       case "total":
//         aVal = getOrderTotal(a);
//         bVal = getOrderTotal(b);
//         break;
//       case "tableNumber":
//         aVal = a.personDetails?.tableNumber || 0;
//         bVal = b.personDetails?.tableNumber || 0;
//         break;
//       default:
//         aVal = a[sortBy];
//         bVal = b[sortBy];
//     }
//     if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
//     return aVal < bVal ? 1 : -1;
//   });

//   const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
//   const paginatedOrders = sortedOrders.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   const SortButton = ({ field, label }) => (
//     <button
//       onClick={() => handleSort(field)}
//       className="flex items-center gap-1 hover:text-orange-500 transition"
//     >
//       {label}
//       {sortBy === field &&
//         (sortOrder === "asc" ? (
//           <ArrowUpIcon fontSize="small" />
//         ) : (
//           <ArrowDownIcon fontSize="small" />
//         ))}
//     </button>
//   );

//   return (
//     <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//       {/* Delete Confirmation Modal */}
//       {deleteConfirmId && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="bg-white rounded-2xl w-full max-w-md p-6"
//           >
//             <div className="text-center">
//               <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
//                 <WarningIcon className="h-6 w-6 text-red-600" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 Delete Order
//               </h3>
//               <p className="text-sm text-gray-500 mb-6">
//                 Are you sure you want to delete this order? This action cannot
//                 be undone.
//               </p>
//               <div className="flex gap-3 justify-center">
//                 <button
//                   onClick={() => setDeleteConfirmId(null)}
//                   className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => {
//                     onDeleteOrder(deleteConfirmId);
//                     setDeleteConfirmId(null);
//                   }}
//                   className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-3">
//         <div className="relative flex-1">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
//           <input
//             type="text"
//             placeholder="Search by Order ID, Customer, or Table..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
//           />
//         </div>
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white"
//         >
//           <option value="all">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="preparing">Preparing</option>
//           <option value="ready">Ready</option>
//           <option value="served">Served</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 <SortButton field="orderId" label="Order ID" />
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 <SortButton field="tableNumber" label="Table" />
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Customer
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Items
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 <SortButton field="total" label="Total" />
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 <SortButton field="status" label="Status" />
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 <SortButton field="createdAt" label="Time" />
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {paginatedOrders.map((order) => (
//               <tr
//                 key={order._id || order.orderId}
//                 className="hover:bg-orange-50/30 transition"
//               >
//                 <td className="px-4 py-3 text-sm font-mono text-gray-700">
//                   {order.orderId?.slice(-8)}
//                 </td>
//                 <td className="px-4 py-3 text-sm text-gray-600">
//                   Table {order.personDetails?.tableNumber}
//                 </td>
//                 <td className="px-4 py-3 text-sm text-gray-600">
//                   {order.personDetails?.name || "Guest"}
//                 </td>
//                 <td className="px-4 py-3 text-sm text-gray-600">
//                   {getTotalItems(order)} items
//                 </td>
//                 <td className="px-4 py-3 text-sm font-semibold text-orange-600">
//                   RWF {getOrderTotal(order).toLocaleString()}
//                 </td>
//                 <td className="px-4 py-3">
//                   <span
//                     className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
//                   >
//                     {getStatusIcon(order.status)}
//                     {order.status?.charAt(0).toUpperCase() +
//                       order.status?.slice(1)}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 text-sm text-gray-500">
//                   {new Date(order.createdAt).toLocaleString()}
//                 </td>
//                 <td className="px-4 py-3">
//                   <div className="flex gap-2 flex-wrap">
//                     <button
//                       onClick={() => onViewDetails(order)}
//                       className="p-1 text-blue-600 hover:bg-blue-50 rounded-md"
//                       title="View Details"
//                     >
//                       <ViewIcon fontSize="small" />
//                     </button>
//                     <select
//                       value={order.status}
//                       onChange={(e) => onUpdateStatus(order, e.target.value)}
//                       className="text-xs border rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-orange-400"
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="confirmed">Confirmed</option>
//                       <option value="preparing">Preparing</option>
//                       <option value="ready">Ready</option>
//                       <option value="served">Served</option>
//                       <option value="completed">Completed</option>
//                       <option value="cancelled">Cancelled</option>
//                     </select>
//                     <button
//                       onClick={() =>
//                         setDeleteConfirmId(order._id || order.orderId)
//                       }
//                       className="p-1 text-red-600 hover:bg-red-50 rounded-md"
//                       title="Delete Order"
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {totalPages > 1 && (
//         <div className="px-4 py-3 border-t flex flex-col sm:flex-row justify-between items-center gap-2">
//           <button
//             onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-1 border rounded-lg disabled:opacity-50 text-sm"
//           >
//             Previous
//           </button>
//           <span className="text-sm text-gray-600">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 border rounded-lg disabled:opacity-50 text-sm"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // ========== MENU MANAGEMENT ==========
// const MenuManagement = ({
//   menuItems,
//   onAddItem,
//   onEditItem,
//   onDeleteItem,
//   onRefresh,
//   apiAvailable,
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     ingredients: "",
//     description: "",
//     prepTime: "",
//     category: "Mains",
//     image: "",
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     highSalt: false,
//     sodiumMg: "",
//   });
//   const categories = [
//     "Mains",
//     "Vegan",
//     "Seafood",
//     "Desserts",
//     "Beverages",
//     "Appetizers",
//     "Soups",
//     "Salads",
//   ];
//   const purineLevels = ["low", "moderate", "high"];

//   const handleSubmit = () => {
//     const newItem = {
//       ...formData,
//       id: editingItem ? editingItem.id : Date.now(),
//       price: Number(formData.price),
//       prepTime: Number(formData.prepTime),
//       sodiumMg: formData.sodiumMg ? Number(formData.sodiumMg) : undefined,
//       ingredients: formData.ingredients.split(",").map((i) => i.trim()),
//     };
//     if (editingItem) onEditItem(newItem);
//     else onAddItem(newItem);
//     setShowModal(false);
//     setEditingItem(null);
//     setFormData({
//       name: "",
//       price: "",
//       ingredients: "",
//       description: "",
//       prepTime: "",
//       category: "Mains",
//       image: "",
//       purineLevel: "low",
//       containsGluten: false,
//       containsPeanuts: false,
//       containsShellfish: false,
//       containsDairy: false,
//       highSalt: false,
//       sodiumMg: "",
//     });
//   };

//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setFormData({
//       name: item.name,
//       price: item.price,
//       ingredients: item.ingredients?.join(", "),
//       description: item.description || "",
//       prepTime: item.prepTime || "",
//       category: item.category || "Mains",
//       image: item.image || "",
//       purineLevel: item.purineLevel || "low",
//       containsGluten: item.containsGluten || false,
//       containsPeanuts: item.containsPeanuts || false,
//       containsShellfish: item.containsShellfish || false,
//       containsDairy: item.containsDairy || false,
//       highSalt: item.highSalt || false,
//       sodiumMg: item.sodiumMg || "",
//     });
//     setShowModal(true);
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
//         <div>
//           <h2 className="text-xl font-bold text-gray-800">
//             🍽️ Menu Management
//           </h2>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={onRefresh}
//             className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition"
//           >
//             <RefreshIcon fontSize="small" /> Sync from API
//           </button>
//           <button
//             onClick={() => {
//               setEditingItem(null);
//               setFormData({
//                 name: "",
//                 price: "",
//                 ingredients: "",
//                 description: "",
//                 prepTime: "",
//                 category: "Mains",
//                 image: "",
//                 purineLevel: "low",
//                 containsGluten: false,
//                 containsPeanuts: false,
//                 containsShellfish: false,
//                 containsDairy: false,
//                 highSalt: false,
//                 sodiumMg: "",
//               });
//               setShowModal(true);
//             }}
//             className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition"
//           >
//             <AddIcon fontSize="small" /> Add Item
//           </button>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//         {menuItems.map((item) => (
//           <div
//             key={item.id || item._id}
//             className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition bg-white"
//           >
//             <div className="h-40 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
//               <ImageIcon className="text-gray-400 text-4xl" />
//             </div>
//             <div className="p-4">
//               <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
//               <p className="text-xs text-gray-500 mt-1 line-clamp-2">
//                 {item.description}
//               </p>
//               <div className="flex justify-between items-center mt-3">
//                 <span className="text-orange-600 font-bold text-base">
//                   RWF {item.price?.toLocaleString()}
//                 </span>
//                 <span className="text-gray-400 text-xs flex items-center gap-1">
//                   <TimeIcon fontSize="inherit" /> {item.prepTime || "N/A"} min
//                 </span>
//               </div>
//               <div className="flex gap-2 mt-4">
//                 <button
//                   onClick={() => handleEdit(item)}
//                   className="flex-1 bg-blue-500 text-white py-1.5 rounded-xl text-sm font-medium hover:bg-blue-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => onDeleteItem(item.id || item._id)}
//                   className="flex-1 bg-red-500 text-white py-1.5 rounded-xl text-sm font-medium hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//           >
//             <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-t-2xl flex justify-between items-center">
//               <h2 className="text-white font-bold">
//                 {editingItem ? "Edit Menu Item" : "New Menu Item"}
//               </h2>
//               <button onClick={() => setShowModal(false)}>
//                 <CloseIcon className="text-white" />
//               </button>
//             </div>
//             <div className="p-5 space-y-4">
//               <input
//                 type="text"
//                 placeholder="Item Name"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 className="w-full p-2 border rounded-xl"
//               />
//               <input
//                 type="number"
//                 placeholder="Price (RWF)"
//                 value={formData.price}
//                 onChange={(e) =>
//                   setFormData({ ...formData, price: e.target.value })
//                 }
//                 className="w-full p-2 border rounded-xl"
//               />
//               <textarea
//                 placeholder="Ingredients (comma separated)"
//                 value={formData.ingredients}
//                 onChange={(e) =>
//                   setFormData({ ...formData, ingredients: e.target.value })
//                 }
//                 className="w-full p-2 border rounded-xl"
//                 rows={2}
//               />
//               <textarea
//                 placeholder="Description"
//                 value={formData.description}
//                 onChange={(e) =>
//                   setFormData({ ...formData, description: e.target.value })
//                 }
//                 className="w-full p-2 border rounded-xl"
//                 rows={2}
//               />
//               <button
//                 onClick={handleSubmit}
//                 className="w-full bg-orange-500 text-white py-2.5 rounded-xl font-bold hover:bg-orange-600 transition"
//               >
//                 {editingItem ? "Update Item" : "Create Item"}
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ========== MAIN DASHBOARD ==========
// export const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [orders, setOrders] = useState([]);
//   const [allOrders, setAllOrders] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [apiAvailable, setApiAvailable] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [dailyAnalytics, setDailyAnalytics] = useState(null);
//   const [weeklyAnalytics, setWeeklyAnalytics] = useState(null);
//   const [analyticsLoading, setAnalyticsLoading] = useState(false);
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     totalRevenue: 0,
//     activeOrders: 0,
//     pendingOrders: 0,
//   });
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user } = useAuth();

//   const API_BASE_URL = "https://nutriscan-foodanddrinksupply.onrender.com";

//   const transformOrder = (order) => ({
//     ...order,
//     status: order.status || order.bookingDetails?.currentStatus || "pending",
//     personDetails: order.personDetails || {},
//     orderSummary: order.orderSummary || {
//       total: order.items?.reduce((s, i) => s + (i.finalPrice || 0), 0) || 0,
//       totalItems: order.items?.reduce((s, i) => s + (i.quantity || 1), 0) || 0,
//       items: order.items || [],
//     },
//     orderId: order.orderId,
//     _id: order._id,
//     createdAt: order.createdAt,
//   });

//   const fetchOrders = useCallback(async () => {
//     try {
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 10000);
//       const response = await fetch(`${API_BASE_URL}/orders`, {
//         signal: controller.signal,
//       });
//       clearTimeout(timeoutId);
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
//       const data = await response.json();
//       let ordersData = [];
//       if (data.success && Array.isArray(data.data)) ordersData = data.data;
//       else if (data.success && Array.isArray(data.orders))
//         ordersData = data.orders;
//       else if (Array.isArray(data)) ordersData = data;
//       if (ordersData.length > 0) {
//         const transformed = ordersData.map(transformOrder);
//         setAllOrders(transformed);
//         setOrders(transformed);
//         const totalOrders = transformed.length;
//         const totalRevenue = transformed.reduce(
//           (s, o) => s + (o.orderSummary?.total || 0),
//           0,
//         );
//         const activeOrders = transformed.filter(
//           (o) => !["completed", "cancelled"].includes(o.status),
//         ).length;
//         const pendingOrders = transformed.filter(
//           (o) => o.status === "pending",
//         ).length;
//         setStats({ totalOrders, totalRevenue, activeOrders, pendingOrders });
//         localStorage.setItem("demo_orders_backup", JSON.stringify(transformed));
//         setApiAvailable(true);
//         toast.success(`Loaded ${transformed.length} orders from API`);
//       } else {
//         loadOrdersFromLocalStorage();
//       }
//     } catch (error) {
//       console.warn("API unavailable:", error.message);
//       setApiAvailable(false);
//       loadOrdersFromLocalStorage();
//       toast.warning("API server unavailable - using cached data");
//     }
//   }, []);

//   const loadOrdersFromLocalStorage = () => {
//     const stored = JSON.parse(
//       localStorage.getItem("demo_orders_backup") || "[]",
//     );
//     if (stored.length > 0) {
//       setAllOrders(stored);
//       setOrders(stored);
//       const totalRevenue = stored.reduce(
//         (s, o) => s + (o.orderSummary?.total || 0),
//         0,
//       );
//       setStats({
//         totalOrders: stored.length,
//         totalRevenue,
//         activeOrders: stored.filter(
//           (o) => !["completed", "cancelled"].includes(o.status),
//         ).length,
//         pendingOrders: stored.filter((o) => o.status === "pending").length,
//       });
//     }
//   };

//   const fetchDailyAnalytics = useCallback(async () => {
//     setAnalyticsLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/orders/analytics/daily`);
//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) setDailyAnalytics(data);
//       }
//     } catch (error) {
//       console.warn("Daily analytics fetch failed:", error);
//     } finally {
//       setAnalyticsLoading(false);
//     }
//   }, []);

//   const fetchWeeklyAnalytics = useCallback(async () => {
//     setAnalyticsLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/orders/analytics/weekly`);
//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) setWeeklyAnalytics(data);
//       }
//     } catch (error) {
//       console.warn("Weekly analytics fetch failed:", error);
//     } finally {
//       setAnalyticsLoading(false);
//     }
//   }, []);

//   const fetchFoods = useCallback(async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/foods`);
//       if (response.ok) {
//         const data = await response.json();
//         if (data.success && data.foods) {
//           setMenuItems(data.foods.map((f) => ({ ...f, id: f._id })));
//           localStorage.setItem(
//             "menu_items_foods_backup",
//             JSON.stringify(data.foods),
//           );
//           toast.success(`Loaded ${data.foods.length} menu items`);
//         } else loadMenuFromLocalStorage();
//       } else loadMenuFromLocalStorage();
//     } catch (error) {
//       loadMenuFromLocalStorage();
//     }
//   }, []);

//   const loadMenuFromLocalStorage = () => {
//     const stored = JSON.parse(
//       localStorage.getItem("menu_items_foods_backup") || "[]",
//     );
//     if (stored.length > 0) setMenuItems(stored);
//     else
//       setMenuItems([
//         {
//           _id: "sample1",
//           name: "Grilled Tilapia",
//           price: 4500,
//           ingredients: ["tilapia"],
//           description: "Fresh tilapia",
//           prepTime: 16,
//           category: "Seafood",
//         },
//       ]);
//   };

//   const updateOrderStatus = async (order, newStatus) => {
//     const updatedOrders = allOrders.map((o) =>
//       o._id === order._id ? { ...o, status: newStatus } : o,
//     );
//     setAllOrders(updatedOrders);
//     setOrders(updatedOrders);
//     localStorage.setItem("demo_orders_backup", JSON.stringify(updatedOrders));
//     toast.success(`Order status updated to ${newStatus}`);
//     if (apiAvailable) {
//       try {
//         await fetch(`${API_BASE_URL}/orders/${order._id}/status`, {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ status: newStatus }),
//         });
//       } catch (error) {
//         toast.warning("API sync failed - saved locally");
//       }
//     }
//   };

//   const deleteOrder = async (orderId) => {
//     const updatedOrders = allOrders.filter((o) => o._id !== orderId);
//     setAllOrders(updatedOrders);
//     setOrders(updatedOrders);
//     localStorage.setItem("demo_orders_backup", JSON.stringify(updatedOrders));
//     toast.success("Order deleted");
//     if (apiAvailable) {
//       try {
//         await fetch(`${API_BASE_URL}/orders/${orderId}`, { method: "DELETE" });
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   const addMenuItem = async (item) => {
//     const newItem = { ...item, _id: Date.now().toString() };
//     const updated = [...menuItems, newItem];
//     setMenuItems(updated);
//     localStorage.setItem("menu_items_foods_backup", JSON.stringify(updated));
//     toast.success("Item added locally");
//   };

//   const editMenuItem = async (item) => {
//     const updated = menuItems.map((m) => (m._id === item._id ? item : m));
//     setMenuItems(updated);
//     localStorage.setItem("menu_items_foods_backup", JSON.stringify(updated));
//     toast.success("Item updated locally");
//   };

//   const deleteMenuItem = async (id) => {
//     const filtered = menuItems.filter((m) => m._id !== id);
//     setMenuItems(filtered);
//     localStorage.setItem("menu_items_foods_backup", JSON.stringify(filtered));
//     toast.success("Item deleted locally");
//   };

//   const retryConnection = () => {
//     setLoading(true);
//     Promise.all([
//       fetchOrders(),
//       fetchFoods(),
//       fetchDailyAnalytics(),
//       fetchWeeklyAnalytics(),
//     ]).finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     Promise.all([
//       fetchOrders(),
//       fetchFoods(),
//       fetchDailyAnalytics(),
//       fetchWeeklyAnalytics(),
//     ]).finally(() => setLoading(false));
//   }, [fetchOrders, fetchFoods, fetchDailyAnalytics, fetchWeeklyAnalytics]);

//   if (loading)
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//       </div>
//     );

//   return (

//       <div className="min-h-screen bg-gray-100">
//         <ToastContainer position="top-right" />
//         <header className="bg-white shadow-sm sticky top-0 z-10 px-4 sm:px-6 py-4 flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
//               <RestaurantIcon className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold">NutriScan·AI Manager</h1>
//               <p className="text-xs text-gray-500">
//                 Restaurant Management Dashboard
//               </p>
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={retryConnection}
//               className="p-2 hover:bg-gray-100 rounded-full"
//             >
//               <RefreshIcon />
//             </button>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
//                 <PersonIcon className="text-white text-sm" />
//               </div>
//               {!apiAvailable && (
//                 <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
//                   Offline
//                 </span>
//               )}
//             </div>
//           </div>
//         </header>
//         <div className="px-4 sm:px-6 pt-4 border-b bg-white flex gap-1 overflow-x-auto">
//           {["overview", "orders", "menu", "analytics"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`flex items-center gap-2 px-4 py-2 rounded-t-xl transition whitespace-nowrap ${activeTab === tab ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
//             >
//               {tab === "overview" && <DashboardIcon />}
//               {tab === "orders" && <OrdersIcon />}
//               {tab === "menu" && <MenuIcon />}
//               {tab === "analytics" && <AnalyticsIcon />}
//               <span className="capitalize">{tab}</span>
//             </button>
//           ))}
//         </div>
//         <div className="p-4 sm:p-6">
//           {activeTab === "overview" && (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
//                 <StatCard
//                   title="Total Orders"
//                   value={stats.totalOrders}
//                   icon={<OrdersIcon className="text-blue-600" />}
//                   color="border-blue-500"
//                 />
//                 <StatCard
//                   title="Revenue"
//                   value={`RWF ${stats.totalRevenue.toLocaleString()}`}
//                   icon={<MoneyIcon className="text-green-600" />}
//                   color="border-green-500"
//                 />
//                 <StatCard
//                   title="Active Orders"
//                   value={stats.activeOrders}
//                   icon={<KitchenIcon className="text-purple-600" />}
//                   color="border-purple-500"
//                 />
//                 <StatCard
//                   title="Pending"
//                   value={stats.pendingOrders}
//                   icon={<TimeIcon className="text-yellow-600" />}
//                   color="border-yellow-500"
//                 />
//               </div>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                 <DailyAnalytics
//                   analytics={dailyAnalytics}
//                   loading={analyticsLoading}
//                 />
//                 <WeeklyAnalytics
//                   analytics={weeklyAnalytics}
//                   loading={analyticsLoading}
//                 />
//               </div>
//               <div className="mt-6">
//                 <h2 className="text-lg font-bold mb-4">📋 Recent Orders</h2>
//                 <OrdersTable
//                   orders={orders.slice(0, 10)}
//                   onUpdateStatus={updateOrderStatus}
//                   onViewDetails={setSelectedOrder}
//                   onDeleteOrder={deleteOrder}
//                 />
//               </div>
//             </>
//           )}
//           {activeTab === "orders" && (
//             <OrdersTable
//               orders={orders}
//               onUpdateStatus={updateOrderStatus}
//               onViewDetails={setSelectedOrder}
//               onDeleteOrder={deleteOrder}
//             />
//           )}
//           {activeTab === "menu" && (
//             <MenuManagement
//               menuItems={menuItems}
//               onAddItem={addMenuItem}
//               onEditItem={editMenuItem}
//               onDeleteItem={deleteMenuItem}
//               onRefresh={fetchFoods}
//               apiAvailable={apiAvailable}
//             />
//           )}
//           {activeTab === "analytics" && (
//             <div className="space-y-6">
//               <DailyAnalytics
//                 analytics={dailyAnalytics}
//                 loading={analyticsLoading}
//               />
//               <WeeklyAnalytics
//                 analytics={weeklyAnalytics}
//                 loading={analyticsLoading}
//               />
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h2 className="font-bold mb-4">Order Status Distribution</h2>
//                 {[
//                   "pending",
//                   "confirmed",
//                   "preparing",
//                   "ready",
//                   "served",
//                   "completed",
//                   "cancelled",
//                 ].map((s) => {
//                   const count = allOrders.filter((o) => o.status === s).length;
//                   const perc = allOrders.length
//                     ? ((count / allOrders.length) * 100).toFixed(0)
//                     : 0;
//                   return (
//                     <div key={s} className="mt-3">
//                       <div className="flex justify-between text-sm">
//                         <span className="capitalize">{s}</span>
//                         <span>{count}</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div
//                           className="bg-orange-500 h-2 rounded-full"
//                           style={{ width: `${perc}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>
//         {selectedOrder && (
//           <OrderDetailsModal
//             order={selectedOrder}
//             onClose={() => setSelectedOrder(null)}
//             onUpdateStatus={updateOrderStatus}
//           />
//         )}
//       </div>

//   );
// };

// import React, { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Icons
// import {
//   Dashboard as DashboardIcon,
//   RestaurantMenu as MenuIcon,
//   ShoppingCart as OrdersIcon,
//   Analytics as AnalyticsIcon,
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Close as CloseIcon,
//   CloudUpload as CloudUploadIcon,
//   Image as ImageIcon,
//   Search as SearchIcon,
//   Refresh as RefreshIcon,
//   AttachMoney as MoneyIcon,
//   AccessTime as TimeIcon,
//   Person as PersonIcon,
//   Restaurant as RestaurantIcon,
//   Visibility as ViewIcon,
//   ListAlt as ListAltIcon,
//   Healing as HealingIcon,
//   Warning as WarningIcon,
//   Today as TodayIcon,
//   DateRange as DateRangeIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   Kitchen as KitchenIcon,
//   ArrowUpward as ArrowUpIcon,
//   ArrowDownward as ArrowDownIcon,
//   LocalOffer as LocalOfferIcon,
//   Schedule as ScheduleIcon,
//   DeleteSweep as DeleteSweepIcon,
//   Visibility,
// } from "@mui/icons-material";

// // ====================== API CONFIG ======================
// const API_BASE = "https://nutriscan-foodanddrinksupply.onrender.com";
// const axiosInstance = axios.create({ baseURL: API_BASE, timeout: 30000 });

// // ====================== STAT CARD ======================
// const StatCard = ({ title, value, icon, color, trend, trendValue }) => (
//   <motion.div
//     whileHover={{ y: -5, scale: 1.02 }}
//     transition={{ duration: 0.2 }}
//     className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-4 sm:p-5 border-t-4 ${color} hover:shadow-xl transition-all duration-300`}
//   >
//     <div className="flex justify-between items-start">
//       <div className="flex-1">
//         <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide">
//           {title}
//         </p>
//         <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mt-2 break-words">
//           {value}
//         </p>
//         {trend && (
//           <div className="flex items-center gap-1 mt-2">
//             {trend === "up" ? (
//               <ArrowUpIcon className="text-green-500 text-sm" />
//             ) : (
//               <ArrowDownIcon className="text-red-500 text-sm" />
//             )}
//             <span
//               className={`text-xs font-medium ${
//                 trend === "up" ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {trendValue}
//             </span>
//           </div>
//         )}
//       </div>
//       <div
//         className={`p-3 rounded-2xl bg-gradient-to-br ${color
//           .replace("border-", "from-")
//           .replace("-500", "-100")} to-white shadow-inner`}
//       >
//         {icon}
//       </div>
//     </div>
//   </motion.div>
// );

// // ====================== FOOD DETAILS MODAL ======================
// const FoodDetailsModal = ({ item, onClose }) => {
//   if (!item) return null;
//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 20 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 20 }}
//         className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="relative">
//           {item.image ? (
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-48 sm:h-64 object-cover rounded-t-3xl"
//             />
//           ) : (
//             <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-3xl flex items-center justify-center">
//               <RestaurantIcon className="text-gray-400 text-6xl" />
//             </div>
//           )}
//           <div className="absolute top-4 right-4">
//             <button
//               onClick={onClose}
//               className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition"
//             >
//               <CloseIcon className="text-white" />
//             </button>
//           </div>
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
//             <h2 className="text-white text-2xl sm:text-3xl font-bold">
//               {item.name}
//             </h2>
//             <p className="text-white/90 text-sm mt-1">{item.category}</p>
//           </div>
//         </div>

//         <div className="p-5 sm:p-6 space-y-5">
//           <div className="flex justify-between items-center pb-3 border-b">
//             <div>
//               <p className="text-xs text-gray-500">Price</p>
//               <p className="text-2xl font-bold text-orange-600">
//                 RWF {item.price?.toLocaleString()}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Prep Time</p>
//               <p className="text-lg font-semibold flex items-center gap-1">
//                 <TimeIcon fontSize="small" className="text-gray-400" />{" "}
//                 {item.prepTime} min
//               </p>
//             </div>
//             <div>
//               <span
//                 className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   item.purineLevel === "low"
//                     ? "bg-green-100 text-green-700"
//                     : item.purineLevel === "moderate"
//                     ? "bg-yellow-100 text-yellow-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {item.purineLevel?.toUpperCase()} Purine
//               </span>
//             </div>
//           </div>

//           {item.description && (
//             <div>
//               <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                 📖 Description
//               </h3>
//               <p className="text-sm text-gray-600 leading-relaxed">
//                 {item.description}
//               </p>
//             </div>
//           )}

//           <div>
//             <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               <ListAltIcon className="text-emerald-600" /> Ingredients
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {item.ingredients?.map((ing, idx) => (
//                 <span
//                   key={idx}
//                   className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium"
//                 >
//                   {ing}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//               <HealingIcon className="text-blue-500" /> Dietary Information
//             </h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.containsGluten ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.containsGluten ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   Gluten: {item.containsGluten ? "Contains" : "Free"}
//                 </span>
//               </div>
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.containsPeanuts ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.containsPeanuts ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   Peanuts: {item.containsPeanuts ? "Contains" : "Free"}
//                 </span>
//               </div>
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.containsShellfish ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.containsShellfish ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   Shellfish: {item.containsShellfish ? "Contains" : "Free"}
//                 </span>
//               </div>
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.containsDairy ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.containsDairy ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   Dairy: {item.containsDairy ? "Contains" : "Free"}
//                 </span>
//               </div>
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.highSalt ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.highSalt ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   High Salt: {item.highSalt ? "Yes" : "No"}
//                 </span>
//               </div>
//               {item.sodiumMg && (
//                 <div className="bg-blue-50 p-2 rounded-lg">
//                   <span className="text-sm">Sodium: {item.sodiumMg}mg</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {(item.refluxTriggers?.length > 0 ||
//             item.migraineTriggers?.length > 0) && (
//             <div>
//               <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                 <WarningIcon className="text-orange-500" /> Health Triggers
//               </h3>
//               {item.refluxTriggers?.length > 0 && (
//                 <div className="mb-2">
//                   <p className="text-xs text-gray-500 mb-1">Reflux Triggers:</p>
//                   <div className="flex flex-wrap gap-1">
//                     {item.refluxTriggers.map((t, i) => (
//                       <span
//                         key={i}
//                         className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full"
//                       >
//                         {t}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {item.migraineTriggers?.length > 0 && (
//                 <div>
//                   <p className="text-xs text-gray-500 mb-1">
//                     Migraine Triggers:
//                   </p>
//                   <div className="flex flex-wrap gap-1">
//                     {item.migraineTriggers.map((t, i) => (
//                       <span
//                         key={i}
//                         className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
//                       >
//                         {t}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ====================== DAILY ANALYTICS CARD ======================
// const DailyAnalyticsCard = ({ analytics, loading }) => {
//   if (loading)
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
//         <div className="h-32 bg-gray-200 rounded"></div>
//       </div>
//     );
//   if (!analytics)
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-400">
//         No data available
//       </div>
//     );
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-gradient-to-br from-white to-orange-50/30 rounded-2xl shadow-lg p-5 sm:p-6"
//     >
//       <div className="flex items-center gap-2 mb-5">
//         <div className="p-2 bg-orange-100 rounded-xl">
//           <TodayIcon className="text-orange-600" />
//         </div>
//         <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//           Daily Analytics
//         </h2>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//         <div className="space-y-4">
//           <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl text-white">
//             <p className="text-sm opacity-90">Total Orders Today</p>
//             <p className="text-3xl font-bold">{analytics.totalOrders || 0}</p>
//           </div>
//           <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-xl text-white">
//             <p className="text-sm opacity-90">Total Income Today</p>
//             <p className="text-2xl font-bold">
//               RWF {(analytics.totalIncome || 0).toLocaleString()}
//             </p>
//           </div>
//         </div>
//         <div>
//           <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//             <LocalOfferIcon fontSize="small" /> Top Selling Items
//           </p>
//           <div className="space-y-2">
//             {analytics.topPlates?.slice(0, 5).map((plate, idx) => (
//               <div
//                 key={idx}
//                 className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
//               >
//                 <span className="text-sm font-medium text-gray-700">
//                   {plate.name}
//                 </span>
//                 <span className="text-sm font-bold text-orange-600">
//                   {plate.quantity} sold
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ====================== WEEKLY ANALYTICS ======================
// const WeeklyAnalyticsCard = ({ analytics, loading }) => {
//   if (loading)
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
//         <div className="h-64 bg-gray-200 rounded"></div>
//       </div>
//     );
//   if (!analytics?.data?.length)
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-400">
//         No weekly data
//       </div>
//     );
//   const totalOrders = analytics.data.reduce((sum, d) => sum + d.orders, 0);
//   const maxOrders = Math.max(...analytics.data.map((d) => d.orders));
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg p-5 sm:p-6"
//     >
//       <div className="flex items-center gap-2 mb-5">
//         <div className="p-2 bg-blue-100 rounded-xl">
//           <DateRangeIcon className="text-blue-600" />
//         </div>
//         <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//           Weekly Overview
//         </h2>
//       </div>
//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <div className="bg-green-100 p-3 rounded-xl text-center">
//           <p className="text-xs text-gray-600">Total Orders</p>
//           <p className="text-2xl font-bold text-green-700">{totalOrders}</p>
//         </div>
//       </div>
//       <div className="space-y-3">
//         {analytics.data.map((day, idx) => (
//           <div key={idx} className="flex items-center gap-3">
//             <span className="text-sm font-semibold w-12 text-gray-700">
//               {day.day.substring(0, 3)}
//             </span>
//             <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${(day.orders / maxOrders) * 100}%` }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
//               ></motion.div>
//             </div>
//             <span className="text-sm font-bold text-gray-700 w-16 text-right">
//               {day.orders}
//             </span>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// // ====================== MENU MANAGEMENT ======================
// const MenuManagement = ({
//   menuItems,
//   onAddItem,
//   onEditItem,
//   onDeleteItem,
//   onRefresh,
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [loadingUpload, setLoadingUpload] = useState(false);
//   const [viewDetailsItem, setViewDetailsItem] = useState(null);
//   const [deleteConfirmId, setDeleteConfirmId] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const [imageFile, setImageFile] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     ingredients: "",
//     description: "",
//     prepTime: "",
//     category: "Mains",
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: "",
//     migraineTriggers: "",
//     highSalt: false,
//     sodiumMg: "",
//     nutritionalInfo: "",
//   });

//   const categories = [
//     "Mains",
//     "Appetizers",
//     "Seafood",
//     "Vegan",
//     "Desserts",
//     "Beverages",
//     "Soups",
//     "Salads",
//   ];

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formData.name || !formData.price) {
//       toast.error("Please fill in name and price");
//       return;
//     }
//     setLoadingUpload(true);
//     try {
//       const submitData = new FormData();
//       submitData.append("name", formData.name);
//       submitData.append("price", formData.price);
//       submitData.append(
//         "ingredients",
//         JSON.stringify(
//           formData.ingredients
//             .split(",")
//             .map((i) => i.trim())
//             .filter((i) => i)
//         )
//       );
//       submitData.append("description", formData.description);
//       submitData.append("prepTime", formData.prepTime || "15");
//       submitData.append("category", formData.category);
//       submitData.append("purineLevel", formData.purineLevel);
//       submitData.append("containsGluten", String(formData.containsGluten));
//       submitData.append("containsPeanuts", String(formData.containsPeanuts));
//       submitData.append(
//         "containsShellfish",
//         String(formData.containsShellfish)
//       );
//       submitData.append("containsDairy", String(formData.containsDairy));
//       submitData.append("highSalt", String(formData.highSalt));
//       submitData.append(
//         "refluxTriggers",
//         JSON.stringify(
//           formData.refluxTriggers
//             .split(",")
//             .map((s) => s.trim())
//             .filter((s) => s)
//         )
//       );
//       submitData.append(
//         "migraineTriggers",
//         JSON.stringify(
//           formData.migraineTriggers
//             .split(",")
//             .map((s) => s.trim())
//             .filter((s) => s)
//         )
//       );
//       if (formData.sodiumMg) submitData.append("sodiumMg", formData.sodiumMg);
//       if (formData.nutritionalInfo)
//         submitData.append("nutritionalInfo", formData.nutritionalInfo);
//       if (imageFile) submitData.append("image", imageFile);

//       if (editingItem) {
//         await onEditItem(editingItem._id, submitData);
//         toast.success("Item updated successfully!");
//       } else {
//         await onAddItem(submitData);
//         toast.success("Item created successfully!");
//       }
//       setShowModal(false);
//       resetForm();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Operation failed");
//     } finally {
//       setLoadingUpload(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       price: "",
//       ingredients: "",
//       description: "",
//       prepTime: "",
//       category: "Mains",
//       purineLevel: "low",
//       containsGluten: false,
//       containsPeanuts: false,
//       containsShellfish: false,
//       containsDairy: false,
//       refluxTriggers: "",
//       migraineTriggers: "",
//       highSalt: false,
//       sodiumMg: "",
//       nutritionalInfo: "",
//     });
//     setImageFile(null);
//     setImagePreview("");
//     setEditingItem(null);
//   };

//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setFormData({
//       name: item.name,
//       price: item.price.toString(),
//       ingredients: item.ingredients?.join(", ") || "",
//       description: item.description || "",
//       prepTime: item.prepTime?.toString() || "",
//       category: item.category || "Mains",
//       purineLevel: item.purineLevel,
//       containsGluten: item.containsGluten,
//       containsPeanuts: item.containsPeanuts,
//       containsShellfish: item.containsShellfish,
//       containsDairy: item.containsDairy,
//       refluxTriggers: item.refluxTriggers?.join(", ") || "",
//       migraineTriggers: item.migraineTriggers?.join(", ") || "",
//       highSalt: item.highSalt,
//       sodiumMg: item.sodiumMg?.toString() || "",
//       nutritionalInfo: item.nutritionalInfo
//         ? JSON.stringify(item.nutritionalInfo)
//         : "",
//     });
//     setImagePreview(item.image || "");
//     setShowModal(true);
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {deleteConfirmId && (
//           <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               className="bg-white rounded-2xl max-w-md w-full p-6"
//             >
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <DeleteIcon className="text-red-600 text-3xl" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">
//                   Delete Item
//                 </h3>
//                 <p className="text-gray-500 mb-6">
//                   Are you sure you want to delete this item? This action cannot
//                   be undone.
//                 </p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setDeleteConfirmId(null)}
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={async () => {
//                       await onDeleteItem(deleteConfirmId);
//                       setDeleteConfirmId(null);
//                     }}
//                     className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             <MenuIcon className="text-orange-500" /> Menu Management
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Manage your restaurant's food items
//           </p>
//         </div>
//         <div className="flex gap-2 w-full sm:w-auto">
//           <button
//             onClick={onRefresh}
//             className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition flex-1 sm:flex-none"
//           >
//             <RefreshIcon fontSize="small" /> Sync
//           </button>
//           <button
//             onClick={() => {
//               resetForm();
//               setShowModal(true);
//             }}
//             className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-xl hover:shadow-lg transition flex-1 sm:flex-none"
//           >
//             <AddIcon fontSize="small" /> Add Item
//           </button>
//         </div>
//       </div>

//       {/* Menu Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//         {menuItems.map((item) => (
//           <motion.div
//             key={item._id}
//             whileHover={{ y: -5 }}
//             className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
//           >
//             <div className="relative h-48 overflow-hidden">
//               {item.image ? (
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
//                   <RestaurantIcon className="text-gray-400 text-5xl" />
//                 </div>
//               )}
//               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-3">
//                 <button
//                   onClick={() => handleEdit(item)}
//                   className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
//                 >
//                   <EditIcon fontSize="small" />
//                 </button>
//                 <button
//                   onClick={() => setViewDetailsItem(item)}
//                   className="p-2 bg-emerald-500 rounded-full text-white hover:bg-emerald-600 transition"
//                 >
//                   <VisibilityIcon fontSize="small" />
//                 </button>
//                 <button
//                   onClick={() => setDeleteConfirmId(item._id)}
//                   className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
//                 >
//                   <DeleteIcon fontSize="small" />
//                 </button>
//               </div>
//               <div className="absolute top-3 right-3">
//                 <span
//                   className={`px-2 py-1 rounded-lg text-xs font-medium ${
//                     item.purineLevel === "low"
//                       ? "bg-green-500"
//                       : item.purineLevel === "moderate"
//                       ? "bg-yellow-500"
//                       : "bg-red-500"
//                   } text-white shadow-lg`}
//                 >
//                   {item.purineLevel}
//                 </span>
//               </div>
//             </div>
//             <div className="p-4">
//               <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
//                 {item.name}
//               </h3>
//               <p className="text-xs text-gray-500 line-clamp-2 mb-2">
//                 {item.description}
//               </p>
//               <div className="flex flex-wrap gap-1 mb-3">
//                 {item.ingredients?.slice(0, 3).map((ing, i) => (
//                   <span
//                     key={i}
//                     className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600"
//                   >
//                     {ing}
//                   </span>
//                 ))}
//                 {item.ingredients?.length > 3 && (
//                   <span className="text-xs text-gray-400">
//                     +{item.ingredients.length - 3}
//                   </span>
//                 )}
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-orange-600 font-bold text-xl">
//                   RWF {item.price?.toLocaleString()}
//                 </span>
//                 <span className="text-gray-400 text-xs flex items-center gap-1">
//                   <TimeIcon fontSize="small" /> {item.prepTime} min
//                 </span>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Create/Edit Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <div
//             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//             onClick={() => setShowModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-5 rounded-t-3xl flex justify-between items-center">
//                 <h2 className="text-white font-bold text-xl">
//                   {editingItem ? "Edit Menu Item" : "Create New Menu Item"}
//                 </h2>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="p-1 hover:bg-white/20 rounded-full transition"
//                 >
//                   <CloseIcon className="text-white" />
//                 </button>
//               </div>
//               <div className="p-5 sm:p-6 space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     placeholder="Item Name *"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Price (RWF) *"
//                     value={formData.price}
//                     onChange={(e) =>
//                       setFormData({ ...formData, price: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   />
//                 </div>
//                 <textarea
//                   placeholder="Ingredients (comma separated)"
//                   value={formData.ingredients}
//                   onChange={(e) =>
//                     setFormData({ ...formData, ingredients: e.target.value })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   rows={2}
//                 />
//                 <textarea
//                   placeholder="Description"
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   rows={2}
//                 />
//                 <div className="grid grid-cols-2 gap-4">
//                   <input
//                     type="number"
//                     placeholder="Prep time (minutes)"
//                     value={formData.prepTime}
//                     onChange={(e) =>
//                       setFormData({ ...formData, prepTime: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl"
//                   />
//                   <select
//                     value={formData.category}
//                     onChange={(e) =>
//                       setFormData({ ...formData, category: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl bg-white"
//                   >
//                     {categories.map((c) => (
//                       <option key={c}>{c}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-orange-400 transition">
//                   <label className="flex flex-col items-center gap-2 cursor-pointer">
//                     <CloudUploadIcon className="text-gray-400 text-4xl" />
//                     <span className="text-sm text-gray-500">
//                       Click to upload image
//                     </span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="hidden"
//                     />
//                   </label>
//                   {imagePreview && (
//                     <img
//                       src={imagePreview}
//                       alt="preview"
//                       className="mt-3 h-32 w-32 object-cover rounded-xl mx-auto shadow-md"
//                     />
//                   )}
//                 </div>
//                 <textarea
//                   placeholder='Nutritional Info (JSON) e.g. {"calories": 450, "protein": "25g"}'
//                   value={formData.nutritionalInfo}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       nutritionalInfo: e.target.value,
//                     })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl font-mono text-sm"
//                   rows={2}
//                 />
//                 <div className="grid grid-cols-2 gap-4">
//                   <select
//                     value={formData.purineLevel}
//                     onChange={(e) =>
//                       setFormData({ ...formData, purineLevel: e.target.value })
//                     }
//                     className="w-full p-3 border rounded-xl"
//                   >
//                     <option value="low">Low Purine</option>
//                     <option value="moderate">Moderate Purine</option>
//                     <option value="high">High Purine</option>
//                   </select>
//                   <input
//                     type="number"
//                     placeholder="Sodium (mg)"
//                     value={formData.sodiumMg}
//                     onChange={(e) =>
//                       setFormData({ ...formData, sodiumMg: e.target.value })
//                     }
//                     className="w-full p-3 border rounded-xl"
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-xl">
//                   <label className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={formData.containsGluten}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           containsGluten: e.target.checked,
//                         })
//                       }
//                       className="w-4 h-4"
//                     />{" "}
//                     Gluten
//                   </label>
//                   <label className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={formData.containsPeanuts}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           containsPeanuts: e.target.checked,
//                         })
//                       }
//                     />{" "}
//                     Peanuts
//                   </label>
//                   <label className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={formData.containsShellfish}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           containsShellfish: e.target.checked,
//                         })
//                       }
//                     />{" "}
//                     Shellfish
//                   </label>
//                   <label className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={formData.containsDairy}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           containsDairy: e.target.checked,
//                         })
//                       }
//                     />{" "}
//                     Dairy
//                   </label>
//                   <label className="flex items-center gap-2 text-sm col-span-2">
//                     <input
//                       type="checkbox"
//                       checked={formData.highSalt}
//                       onChange={(e) =>
//                         setFormData({ ...formData, highSalt: e.target.checked })
//                       }
//                     />{" "}
//                     High Salt Content
//                   </label>
//                 </div>
//                 <textarea
//                   placeholder="Reflux Triggers (comma separated)"
//                   value={formData.refluxTriggers}
//                   onChange={(e) =>
//                     setFormData({ ...formData, refluxTriggers: e.target.value })
//                   }
//                   className="w-full p-3 border rounded-xl"
//                   rows={2}
//                 />
//                 <textarea
//                   placeholder="Migraine Triggers (comma separated)"
//                   value={formData.migraineTriggers}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       migraineTriggers: e.target.value,
//                     })
//                   }
//                   className="w-full p-3 border rounded-xl"
//                   rows={2}
//                 />
//                 <button
//                   onClick={handleSubmit}
//                   disabled={loadingUpload}
//                   className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold text-lg hover:shadow-lg transition disabled:opacity-50"
//                 >
//                   {loadingUpload
//                     ? "Saving..."
//                     : editingItem
//                     ? "Update Item"
//                     : "Create Item"}
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       <FoodDetailsModal
//         item={viewDetailsItem}
//         onClose={() => setViewDetailsItem(null)}
//       />
//     </div>
//   );
// };

// // ====================== ORDERS TABLE ======================
// const OrdersTable = ({
//   orders,
//   onUpdateStatus,
//   onViewDetails,
//   onDeleteOrder,
// }) => {
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [deleteConfirmId, setDeleteConfirmId] = useState(null);

//   const getStatusConfig = (status) => {
//     const config = {
//       pending: {
//         color: "bg-yellow-100 text-yellow-700",
//         icon: <TimeIcon fontSize="small" />,
//       },
//       confirmed: {
//         color: "bg-blue-100 text-blue-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       preparing: {
//         color: "bg-purple-100 text-purple-700",
//         icon: <KitchenIcon fontSize="small" />,
//       },
//       ready: {
//         color: "bg-green-100 text-green-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       served: {
//         color: "bg-teal-100 text-teal-700",
//         icon: <RestaurantIcon fontSize="small" />,
//       },
//       completed: {
//         color: "bg-gray-100 text-gray-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       cancelled: {
//         color: "bg-red-100 text-red-700",
//         icon: <CancelIcon fontSize="small" />,
//       },
//     };
//     return config[status] || config.pending;
//   };

//   const filtered = orders.filter(
//     (o) =>
//       (o.orderId?.toLowerCase().includes(search.toLowerCase()) ||
//         o.personDetails?.name?.toLowerCase().includes(search.toLowerCase())) &&
//       (statusFilter === "all" || o.status === statusFilter)
//   );

//   return (
//     <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//       <AnimatePresence>
//         {deleteConfirmId && (
//           <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               className="bg-white rounded-2xl max-w-md w-full p-6"
//             >
//               <div className="text-center">
//                 <DeleteSweepIcon className="text-red-500 text-5xl mb-4" />
//                 <h3 className="text-xl font-bold mb-2">Delete Order</h3>
//                 <p className="text-gray-500 mb-6">
//                   Are you sure you want to delete this order?
//                 </p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setDeleteConfirmId(null)}
//                     className="flex-1 px-4 py-2 border rounded-xl"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={async () => {
//                       await onDeleteOrder(deleteConfirmId);
//                       setDeleteConfirmId(null);
//                     }}
//                     className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       <div className="p-4 flex flex-col sm:flex-row gap-3 border-b bg-gray-50/50">
//         <div className="relative flex-1">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by Order ID or Customer..."
//             className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-orange-400"
//         >
//           <option value="all">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="preparing">Preparing</option>
//           <option value="ready">Ready</option>
//           <option value="served">Served</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               {[
//                 "Order ID",
//                 "Table",
//                 "Customer",
//                 "Items",
//                 "Total",
//                 "Status",
//                 "Actions",
//               ].map((h) => (
//                 <th
//                   key={h}
//                   className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {filtered.map((order) => {
//               const statusConfig = getStatusConfig(order.status);
//               return (
//                 <tr
//                   key={order._id}
//                   className="hover:bg-orange-50/30 transition"
//                 >
//                   <td className="px-4 py-3 text-sm font-mono font-medium text-gray-700">
//                     {order.orderId?.slice(-8)}
//                   </td>
//                   <td className="px-4 py-3 text-sm">
//                     Table {order.personDetails?.tableNumber}
//                   </td>
//                   <td className="px-4 py-3 text-sm font-medium">
//                     {order.personDetails?.name || "Guest"}
//                   </td>
//                   <td className="px-4 py-3 text-sm">
//                     {order.orderSummary?.totalItems || order.items?.length || 0}{" "}
//                     items
//                   </td>
//                   <td className="px-4 py-3 text-sm font-bold text-orange-600">
//                     RWF {order.orderSummary?.total?.toLocaleString() || 0}
//                   </td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
//                     >
//                       {statusConfig.icon}
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => onViewDetails(order)}
//                         className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
//                       >
//                         <Visibility fontSize="small" />
//                       </button>
//                       <select
//                         value={order.status}
//                         onChange={(e) => onUpdateStatus(order, e.target.value)}
//                         className="text-xs border rounded-lg px-2 py-1 bg-white focus:ring-1 focus:ring-orange-400"
//                       >
//                         <option value="pending">pending</option>
//                         <option value="confirmed">confirmed</option>
//                         <option value="preparing">preparing</option>
//                         <option value="ready">ready</option>
//                         <option value="served">served</option>
//                         <option value="completed">completed</option>
//                         <option value="cancelled">cancelled</option>
//                       </select>
//                       <button
//                         onClick={() => setDeleteConfirmId(order._id)}
//                         className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // ====================== ORDER DETAILS MODAL ======================
// const OrderDetailsModal = ({ order, onClose, onUpdateStatus }) => {
//   if (!order) return null;
//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 p-5 rounded-t-3xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl">
//             Order #{order.orderId?.slice(-8)}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-white/20 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>
//         <div className="p-6 space-y-5">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-gray-50 p-3 rounded-xl">
//               <p className="text-xs text-gray-500">Customer</p>
//               <p className="font-semibold text-gray-800">
//                 {order.personDetails?.name || "Guest"}
//               </p>
//             </div>
//             <div className="bg-gray-50 p-3 rounded-xl">
//               <p className="text-xs text-gray-500">Table Number</p>
//               <p className="font-semibold text-gray-800">
//                 {order.personDetails?.tableNumber}
//               </p>
//             </div>
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 mb-2">Status</p>
//             <select
//               value={order.status}
//               onChange={(e) => onUpdateStatus(order, e.target.value)}
//               className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400"
//             >
//               {[
//                 "pending",
//                 "confirmed",
//                 "preparing",
//                 "ready",
//                 "served",
//                 "completed",
//                 "cancelled",
//               ].map((s) => (
//                 <option key={s} className="capitalize">
//                   {s}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="bg-orange-50 p-4 rounded-xl">
//             <p className="text-xs text-gray-500">Total Amount</p>
//             <p className="text-3xl font-bold text-orange-600">
//               RWF {order.orderSummary?.total?.toLocaleString() || 0}
//             </p>
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 mb-3">Order Items</p>
//             <div className="space-y-2">
//               {order.items?.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
//                 >
//                   <div className="flex items-center gap-3">
//                     <span className="font-bold text-gray-600">
//                       {item.quantity}x
//                     </span>
//                     <span className="font-medium">{item.name}</span>
//                   </div>
//                   <span className="font-bold text-orange-600">
//                     RWF{" "}
//                     {(
//                       item.finalPrice ||
//                       item.originalPrice ||
//                       0
//                     ).toLocaleString()}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ====================== NAV BUTTON ======================
// const NavButton = ({ active, onClick, icon, label }) => (
//   <button
//     onClick={onClick}
//     className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
//       active
//         ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
//         : "text-gray-600 hover:bg-gray-100"
//     }`}
//   >
//     {icon}
//     <span className="hidden sm:inline">{label}</span>
//   </button>
// );

// // ====================== MAIN DASHBOARD ======================
// export const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [orders, setOrders] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dailyAnalytics, setDailyAnalytics] = useState(null);
//   const [weeklyAnalytics, setWeeklyAnalytics] = useState(null);
//   const [analyticsLoading, setAnalyticsLoading] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     totalRevenue: 0,
//     activeOrders: 0,
//     pendingOrders: 0,
//   });

//   const fetchOrders = useCallback(async () => {
//     try {
//       const res = await axiosInstance.get("/orders");
//       let data = res.data?.data || res.data?.orders || [];
//       if (Array.isArray(data)) {
//         const transformed = data.map((o) => ({
//           ...o,
//           orderSummary: o.orderSummary || { total: 0 },
//           status: o.status || "pending",
//         }));
//         setOrders(transformed);
//         setStats({
//           totalOrders: transformed.length,
//           totalRevenue: transformed.reduce(
//             (s, o) => s + (o.orderSummary?.total || 0),
//             0
//           ),
//           activeOrders: transformed.filter(
//             (o) => !["completed", "cancelled"].includes(o.status)
//           ).length,
//           pendingOrders: transformed.filter((o) => o.status === "pending")
//             .length,
//         });
//       }
//     } catch (err) {
//       toast.error("Failed to fetch orders");
//     }
//   }, []);

//   const fetchFoods = useCallback(async () => {
//     try {
//       const res = await axiosInstance.get("/foods");
//       if (res.data?.success && res.data.foods) setMenuItems(res.data.foods);
//       else if (Array.isArray(res.data)) setMenuItems(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch menu");
//     }
//   }, []);

//   const fetchAnalytics = async () => {
//     setAnalyticsLoading(true);
//     try {
//       const [daily, weekly] = await Promise.all([
//         axiosInstance.get("/orders/analytics/daily"),
//         axiosInstance.get("/orders/analytics/weekly"),
//       ]);
//       if (daily.data?.success) setDailyAnalytics(daily.data);
//       if (weekly.data?.success) setWeeklyAnalytics(weekly.data);
//     } catch (e) {
//     } finally {
//       setAnalyticsLoading(false);
//     }
//   };

//   const handleAddFood = async (formData) => {
//     try {
//       await axiosInstance.post("/foods", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       await fetchFoods();
//       toast.success("Food created!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Creation failed");
//     }
//   };

//   const handleEditFood = async (id, formData) => {
//     try {
//       await axiosInstance.put(`/foods/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       await fetchFoods();
//       toast.success("Food updated!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Update failed");
//     }
//   };

//   const handleDeleteFood = async (id) => {
//     try {
//       await axiosInstance.delete(`/foods/${id}`);
//       await fetchFoods();
//       toast.success("Food deleted!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Delete failed");
//     }
//   };

//   const updateOrderStatus = async (order, newStatus) => {
//     try {
//       await axiosInstance.patch(`/orders/${order._id}/status`, {
//         status: newStatus,
//       });
//       await fetchOrders();
//       toast.success(`Status updated to ${newStatus}!`);
//     } catch (e) {
//       toast.error("Update failed");
//     }
//   };

//   const deleteOrder = async (id) => {
//     try {
//       await axiosInstance.delete(`/orders/${id}`);
//       await fetchOrders();
//       toast.success("Order deleted!");
//     } catch (e) {
//       toast.error("Delete failed");
//     }
//   };

//   const refreshAll = async () => {
//     setLoading(true);
//     await Promise.all([fetchOrders(), fetchFoods(), fetchAnalytics()]);
//     setLoading(false);
//     toast.success("Data refreshed!");
//   };

//   useEffect(() => {
//     refreshAll();
//   }, []);

//   if (loading)
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-orange-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/20">
//       <ToastContainer position="top-right" />
//       <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-3">
//         <div className="flex items-center gap-3">
//           <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2.5 rounded-2xl shadow-lg">
//             <RestaurantIcon className="text-white" />
//           </div>
//           <div>
//             <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
//               NutriScan·AI
//             </h1>
//             <p className="text-xs text-gray-500">
//               Restaurant Intelligence Dashboard
//             </p>
//           </div>
//         </div>
//         <button
//           onClick={refreshAll}
//           className="p-2 hover:bg-gray-100 rounded-full transition"
//         >
//           <RefreshIcon />
//         </button>
//       </header>

//       <div className="px-4 sm:px-6 pt-4 sticky top-[73px] z-10 bg-transparent">
//         <div className="flex gap-1 bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-sm overflow-x-auto">
//           <NavButton
//             active={activeTab === "overview"}
//             onClick={() => setActiveTab("overview")}
//             icon={<DashboardIcon />}
//             label="Overview"
//           />
//           <NavButton
//             active={activeTab === "orders"}
//             onClick={() => setActiveTab("orders")}
//             icon={<OrdersIcon />}
//             label="Orders"
//           />
//           <NavButton
//             active={activeTab === "menu"}
//             onClick={() => setActiveTab("menu")}
//             icon={<MenuIcon />}
//             label="Menu"
//           />
//           <NavButton
//             active={activeTab === "analytics"}
//             onClick={() => setActiveTab("analytics")}
//             icon={<AnalyticsIcon />}
//             label="Analytics"
//           />
//         </div>
//       </div>

//       <div className="p-4 sm:p-6">
//         {activeTab === "overview" && (
//           <>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-6">
//               <StatCard
//                 title="Total Orders"
//                 value={stats.totalOrders}
//                 icon={<OrdersIcon />}
//                 color="border-blue-500"
//               />
//               <StatCard
//                 title="Revenue"
//                 value={`RWF ${stats.totalRevenue.toLocaleString()}`}
//                 icon={<MoneyIcon />}
//                 color="border-green-500"
//               />
//               <StatCard
//                 title="Active Orders"
//                 value={stats.activeOrders}
//                 icon={<KitchenIcon />}
//                 color="border-purple-500"
//               />
//               <StatCard
//                 title="Pending"
//                 value={stats.pendingOrders}
//                 icon={<TimeIcon />}
//                 color="border-yellow-500"
//               />
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//               <DailyAnalyticsCard
//                 analytics={dailyAnalytics}
//                 loading={analyticsLoading}
//               />
//               <WeeklyAnalyticsCard
//                 analytics={weeklyAnalytics}
//                 loading={analyticsLoading}
//               />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <OrdersIcon className="text-orange-500" /> Recent Orders
//               </h2>
//               <OrdersTable
//                 orders={orders.slice(0, 5)}
//                 onUpdateStatus={updateOrderStatus}
//                 onViewDetails={setSelectedOrder}
//                 onDeleteOrder={deleteOrder}
//               />
//             </div>
//           </>
//         )}
//         {activeTab === "orders" && (
//           <OrdersTable
//             orders={orders}
//             onUpdateStatus={updateOrderStatus}
//             onViewDetails={setSelectedOrder}
//             onDeleteOrder={deleteOrder}
//           />
//         )}
//         {activeTab === "menu" && (
//           <MenuManagement
//             menuItems={menuItems}
//             onAddItem={handleAddFood}
//             onEditItem={handleEditFood}
//             onDeleteItem={handleDeleteFood}
//             onRefresh={fetchFoods}
//           />
//         )}
//         {activeTab === "analytics" && (
//           <div className="space-y-6">
//             <DailyAnalyticsCard
//               analytics={dailyAnalytics}
//               loading={analyticsLoading}
//             />
//             <WeeklyAnalyticsCard
//               analytics={weeklyAnalytics}
//               loading={analyticsLoading}
//             />
//           </div>
//         )}
//       </div>
//       {selectedOrder && (
//         <OrderDetailsModal
//           order={selectedOrder}
//           onClose={() => setSelectedOrder(null)}
//           onUpdateStatus={updateOrderStatus}
//         />
//       )}
//     </div>
//   );
// };

// import React, { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Icons
// import {
//   Dashboard as DashboardIcon,
//   RestaurantMenu as MenuIcon,
//   ShoppingCart as OrdersIcon,
//   Analytics as AnalyticsIcon,
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Close as CloseIcon,
//   CloudUpload as CloudUploadIcon,
//   Search as SearchIcon,
//   Refresh as RefreshIcon,
//   AttachMoney as MoneyIcon,
//   AccessTime as TimeIcon,
//   Person as PersonIcon,
//   Restaurant as RestaurantIcon,
//   Visibility as VisibilityIcon,
//   ListAlt as ListAltIcon,
//   Healing as HealingIcon,
//   Warning as WarningIcon,
//   Today as TodayIcon,
//   DateRange as DateRangeIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   Kitchen as KitchenIcon,
//   ArrowUpward as ArrowUpIcon,
//   ArrowDownward as ArrowDownIcon,
//   LocalOffer as LocalOfferIcon,
//   DeleteSweep as DeleteSweepIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";

// // ====================== API CONFIG ======================
// const API_BASE = "https://nutriscan-foodanddrinksupply.onrender.com";
// const axiosInstance = axios.create({ baseURL: API_BASE, timeout: 30000 });

// // ====================== STAT CARD ======================
// const StatCard = ({ title, value, icon, color, trend, trendValue }) => (
//   <motion.div
//     whileHover={{ y: -5, scale: 1.02 }}
//     transition={{ duration: 0.2 }}
//     className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-4 sm:p-5 border-t-4 ${color} hover:shadow-xl transition-all duration-300`}
//   >
//     <div className="flex justify-between items-start">
//       <div className="flex-1">
//         <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide">
//           {title}
//         </p>
//         <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mt-2 break-words">
//           {value}
//         </p>
//         {trend && (
//           <div className="flex items-center gap-1 mt-2">
//             {trend === "up" ? (
//               <ArrowUpIcon className="text-green-500 text-sm" />
//             ) : (
//               <ArrowDownIcon className="text-red-500 text-sm" />
//             )}
//             <span
//               className={`text-xs font-medium ${
//                 trend === "up" ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {trendValue}
//             </span>
//           </div>
//         )}
//       </div>
//       <div
//         className={`p-3 rounded-2xl bg-gradient-to-br ${color
//           .replace("border-", "from-")
//           .replace("-500", "-100")} to-white shadow-inner`}
//       >
//         {icon}
//       </div>
//     </div>
//   </motion.div>
// );

// // ====================== FOOD DETAILS MODAL ======================
// const FoodDetailsModal = ({ item, onClose }) => {
//   if (!item) return null;
//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 20 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 20 }}
//         className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="relative">
//           {item.image ? (
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-48 sm:h-64 object-cover rounded-t-3xl"
//             />
//           ) : (
//             <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-3xl flex items-center justify-center">
//               <RestaurantIcon className="text-gray-400 text-6xl" />
//             </div>
//           )}
//           <div className="absolute top-4 right-4">
//             <button
//               onClick={onClose}
//               className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition"
//             >
//               <CloseIcon className="text-white" />
//             </button>
//           </div>
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
//             <h2 className="text-white text-2xl sm:text-3xl font-bold">
//               {item.name}
//             </h2>
//             <p className="text-white/90 text-sm mt-1">{item.category}</p>
//           </div>
//         </div>

//         <div className="p-5 sm:p-6 space-y-5">
//           <div className="flex justify-between items-center pb-3 border-b">
//             <div>
//               <p className="text-xs text-gray-500">Price</p>
//               <p className="text-2xl font-bold text-orange-600">
//                 RWF {item.price?.toLocaleString()}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Prep Time</p>
//               <p className="text-lg font-semibold flex items-center gap-1">
//                 <TimeIcon fontSize="small" className="text-gray-400" />{" "}
//                 {item.prepTime} min
//               </p>
//             </div>
//             <div>
//               <span
//                 className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   item.purineLevel === "low"
//                     ? "bg-green-100 text-green-700"
//                     : item.purineLevel === "moderate"
//                     ? "bg-yellow-100 text-yellow-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {item.purineLevel?.toUpperCase()} Purine
//               </span>
//             </div>
//           </div>

//           {item.description && (
//             <div>
//               <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                 📖 Description
//               </h3>
//               <p className="text-sm text-gray-600 leading-relaxed">
//                 {item.description}
//               </p>
//             </div>
//           )}

//           <div>
//             <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               <ListAltIcon className="text-emerald-600" /> Ingredients
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {item.ingredients?.map((ing, idx) => (
//                 <span
//                   key={idx}
//                   className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium"
//                 >
//                   {ing}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//               <HealingIcon className="text-blue-500" /> Dietary Information
//             </h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.containsGluten ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.containsGluten ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   Gluten: {item.containsGluten ? "Contains" : "Free"}
//                 </span>
//               </div>
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.containsPeanuts ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.containsPeanuts ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   Peanuts: {item.containsPeanuts ? "Contains" : "Free"}
//                 </span>
//               </div>
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.containsShellfish ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.containsShellfish ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   Shellfish: {item.containsShellfish ? "Contains" : "Free"}
//                 </span>
//               </div>
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.containsDairy ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.containsDairy ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   Dairy: {item.containsDairy ? "Contains" : "Free"}
//                 </span>
//               </div>
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.highSalt ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.highSalt ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   High Salt: {item.highSalt ? "Yes" : "No"}
//                 </span>
//               </div>
//               {item.sodiumMg && (
//                 <div className="bg-blue-50 p-2 rounded-lg">
//                   <span className="text-sm">Sodium: {item.sodiumMg}mg</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {(item.refluxTriggers?.length > 0 ||
//             item.migraineTriggers?.length > 0) && (
//             <div>
//               <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                 <WarningIcon className="text-orange-500" /> Health Triggers
//               </h3>
//               {item.refluxTriggers?.length > 0 && (
//                 <div className="mb-2">
//                   <p className="text-xs text-gray-500 mb-1">Reflux Triggers:</p>
//                   <div className="flex flex-wrap gap-1">
//                     {item.refluxTriggers.map((t, i) => (
//                       <span
//                         key={i}
//                         className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full"
//                       >
//                         {t}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {item.migraineTriggers?.length > 0 && (
//                 <div>
//                   <p className="text-xs text-gray-500 mb-1">
//                     Migraine Triggers:
//                   </p>
//                   <div className="flex flex-wrap gap-1">
//                     {item.migraineTriggers.map((t, i) => (
//                       <span
//                         key={i}
//                         className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
//                       >
//                         {t}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ====================== DAILY ANALYTICS CARD ======================
// const DailyAnalyticsCard = ({ analytics, loading }) => {
//   if (loading)
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
//         <div className="h-32 bg-gray-200 rounded"></div>
//       </div>
//     );
//   if (!analytics)
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-400">
//         No data available
//       </div>
//     );
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-gradient-to-br from-white to-orange-50/30 rounded-2xl shadow-lg p-5 sm:p-6"
//     >
//       <div className="flex items-center gap-2 mb-5">
//         <div className="p-2 bg-orange-100 rounded-xl">
//           <TodayIcon className="text-orange-600" />
//         </div>
//         <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//           Daily Analytics
//         </h2>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//         <div className="space-y-4">
//           <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl text-white">
//             <p className="text-sm opacity-90">Total Orders Today</p>
//             <p className="text-3xl font-bold">{analytics.totalOrders || 0}</p>
//           </div>
//           <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-xl text-white">
//             <p className="text-sm opacity-90">Total Income Today</p>
//             <p className="text-2xl font-bold">
//               RWF {(analytics.totalIncome || 0).toLocaleString()}
//             </p>
//           </div>
//         </div>
//         <div>
//           <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//             <LocalOfferIcon fontSize="small" /> Top Selling Items
//           </p>
//           <div className="space-y-2">
//             {analytics.topPlates?.slice(0, 5).map((plate, idx) => (
//               <div
//                 key={idx}
//                 className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
//               >
//                 <span className="text-sm font-medium text-gray-700">
//                   {plate.name}
//                 </span>
//                 <span className="text-sm font-bold text-orange-600">
//                   {plate.quantity} sold
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ====================== WEEKLY ANALYTICS ======================
// const WeeklyAnalyticsCard = ({ analytics, loading }) => {
//   if (loading)
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
//         <div className="h-64 bg-gray-200 rounded"></div>
//       </div>
//     );
//   if (!analytics?.data?.length)
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-400">
//         No weekly data
//       </div>
//     );
//   const totalOrders = analytics.data.reduce((sum, d) => sum + d.orders, 0);
//   const maxOrders = Math.max(...analytics.data.map((d) => d.orders));
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg p-5 sm:p-6"
//     >
//       <div className="flex items-center gap-2 mb-5">
//         <div className="p-2 bg-blue-100 rounded-xl">
//           <DateRangeIcon className="text-blue-600" />
//         </div>
//         <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//           Weekly Overview
//         </h2>
//       </div>
//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <div className="bg-green-100 p-3 rounded-xl text-center">
//           <p className="text-xs text-gray-600">Total Orders</p>
//           <p className="text-2xl font-bold text-green-700">{totalOrders}</p>
//         </div>
//       </div>
//       <div className="space-y-3">
//         {analytics.data.map((day, idx) => (
//           <div key={idx} className="flex items-center gap-3">
//             <span className="text-sm font-semibold w-12 text-gray-700">
//               {day.day.substring(0, 3)}
//             </span>
//             <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${(day.orders / maxOrders) * 100}%` }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
//               ></motion.div>
//             </div>
//             <span className="text-sm font-bold text-gray-700 w-16 text-right">
//               {day.orders}
//             </span>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// // ====================== MENU MANAGEMENT ======================
// const MenuManagement = ({
//   menuItems,
//   onAddItem,
//   onEditItem,
//   onDeleteItem,
//   onRefresh,
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [loadingUpload, setLoadingUpload] = useState(false);
//   const [viewDetailsItem, setViewDetailsItem] = useState(null);
//   const [deleteConfirmId, setDeleteConfirmId] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const [imageFile, setImageFile] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     ingredients: "",
//     description: "",
//     prepTime: "",
//     category: "Mains",
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: "",
//     migraineTriggers: "",
//     highSalt: false,
//     sodiumMg: "",
//     nutritionalInfo: "",
//   });

//   const categories = [
//     "Mains",
//     "Appetizers",
//     "Seafood",
//     "Vegan",
//     "Desserts",
//     "Beverages",
//     "Soups",
//     "Salads",
//   ];

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formData.name || !formData.price) {
//       toast.error("Please fill in name and price");
//       return;
//     }
//     setLoadingUpload(true);
//     try {
//       const submitData = new FormData();
//       submitData.append("name", formData.name);
//       submitData.append("price", formData.price);
//       submitData.append(
//         "ingredients",
//         JSON.stringify(
//           formData.ingredients
//             .split(",")
//             .map((i) => i.trim())
//             .filter((i) => i)
//         )
//       );
//       submitData.append("description", formData.description);
//       submitData.append("prepTime", formData.prepTime || "15");
//       submitData.append("category", formData.category);
//       submitData.append("purineLevel", formData.purineLevel);
//       submitData.append("containsGluten", String(formData.containsGluten));
//       submitData.append("containsPeanuts", String(formData.containsPeanuts));
//       submitData.append(
//         "containsShellfish",
//         String(formData.containsShellfish)
//       );
//       submitData.append("containsDairy", String(formData.containsDairy));
//       submitData.append("highSalt", String(formData.highSalt));
//       submitData.append(
//         "refluxTriggers",
//         JSON.stringify(
//           formData.refluxTriggers
//             .split(",")
//             .map((s) => s.trim())
//             .filter((s) => s)
//         )
//       );
//       submitData.append(
//         "migraineTriggers",
//         JSON.stringify(
//           formData.migraineTriggers
//             .split(",")
//             .map((s) => s.trim())
//             .filter((s) => s)
//         )
//       );
//       if (formData.sodiumMg) submitData.append("sodiumMg", formData.sodiumMg);
//       if (formData.nutritionalInfo)
//         submitData.append("nutritionalInfo", formData.nutritionalInfo);
//       if (imageFile) submitData.append("image", imageFile);

//       if (editingItem) {
//         await onEditItem(editingItem._id, submitData);
//         toast.success("Item updated successfully!");
//       } else {
//         await onAddItem(submitData);
//         toast.success("Item created successfully!");
//       }
//       setShowModal(false);
//       resetForm();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Operation failed");
//     } finally {
//       setLoadingUpload(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       price: "",
//       ingredients: "",
//       description: "",
//       prepTime: "",
//       category: "Mains",
//       purineLevel: "low",
//       containsGluten: false,
//       containsPeanuts: false,
//       containsShellfish: false,
//       containsDairy: false,
//       refluxTriggers: "",
//       migraineTriggers: "",
//       highSalt: false,
//       sodiumMg: "",
//       nutritionalInfo: "",
//     });
//     setImageFile(null);
//     setImagePreview("");
//     setEditingItem(null);
//   };

//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setFormData({
//       name: item.name,
//       price: item.price.toString(),
//       ingredients: item.ingredients?.join(", ") || "",
//       description: item.description || "",
//       prepTime: item.prepTime?.toString() || "",
//       category: item.category || "Mains",
//       purineLevel: item.purineLevel,
//       containsGluten: item.containsGluten,
//       containsPeanuts: item.containsPeanuts,
//       containsShellfish: item.containsShellfish,
//       containsDairy: item.containsDairy,
//       refluxTriggers: item.refluxTriggers?.join(", ") || "",
//       migraineTriggers: item.migraineTriggers?.join(", ") || "",
//       highSalt: item.highSalt,
//       sodiumMg: item.sodiumMg?.toString() || "",
//       nutritionalInfo: item.nutritionalInfo
//         ? JSON.stringify(item.nutritionalInfo)
//         : "",
//     });
//     setImagePreview(item.image || "");
//     setShowModal(true);
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {deleteConfirmId && (
//           <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               className="bg-white rounded-2xl max-w-md w-full p-6"
//             >
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <DeleteIcon className="text-red-600 text-3xl" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">
//                   Delete Item
//                 </h3>
//                 <p className="text-gray-500 mb-6">
//                   Are you sure you want to delete this item? This action cannot
//                   be undone.
//                 </p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setDeleteConfirmId(null)}
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={async () => {
//                       await onDeleteItem(deleteConfirmId);
//                       setDeleteConfirmId(null);
//                     }}
//                     className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             <MenuIcon className="text-orange-500" /> Menu Management
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Manage your restaurant's food items
//           </p>
//         </div>
//         <div className="flex gap-2 w-full sm:w-auto">
//           <button
//             onClick={onRefresh}
//             className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition flex-1 sm:flex-none"
//           >
//             <RefreshIcon fontSize="small" /> Sync
//           </button>
//           <button
//             onClick={() => {
//               resetForm();
//               setShowModal(true);
//             }}
//             className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-xl hover:shadow-lg transition flex-1 sm:flex-none"
//           >
//             <AddIcon fontSize="small" /> Add Item
//           </button>
//         </div>
//       </div>

//       {/* Menu Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//         {menuItems.map((item) => (
//           <motion.div
//             key={item._id}
//             whileHover={{ y: -5 }}
//             className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
//           >
//             <div className="relative h-48 overflow-hidden">
//               {item.image ? (
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
//                   <RestaurantIcon className="text-gray-400 text-5xl" />
//                 </div>
//               )}
//               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-3">
//                 <button
//                   onClick={() => handleEdit(item)}
//                   className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
//                 >
//                   <EditIcon fontSize="small" />
//                 </button>
//                 <button
//                   onClick={() => setViewDetailsItem(item)}
//                   className="p-2 bg-emerald-500 rounded-full text-white hover:bg-emerald-600 transition"
//                 >
//                   <VisibilityIcon fontSize="small" />
//                 </button>
//                 <button
//                   onClick={() => setDeleteConfirmId(item._id)}
//                   className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
//                 >
//                   <DeleteIcon fontSize="small" />
//                 </button>
//               </div>
//               <div className="absolute top-3 right-3">
//                 <span
//                   className={`px-2 py-1 rounded-lg text-xs font-medium ${
//                     item.purineLevel === "low"
//                       ? "bg-green-500"
//                       : item.purineLevel === "moderate"
//                       ? "bg-yellow-500"
//                       : "bg-red-500"
//                   } text-white shadow-lg`}
//                 >
//                   {item.purineLevel}
//                 </span>
//               </div>
//             </div>
//             <div className="p-4">
//               <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
//                 {item.name}
//               </h3>
//               <p className="text-xs text-gray-500 line-clamp-2 mb-2">
//                 {item.description}
//               </p>
//               <div className="flex flex-wrap gap-1 mb-3">
//                 {item.ingredients?.slice(0, 3).map((ing, i) => (
//                   <span
//                     key={i}
//                     className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600"
//                   >
//                     {ing}
//                   </span>
//                 ))}
//                 {item.ingredients?.length > 3 && (
//                   <span className="text-xs text-gray-400">
//                     +{item.ingredients.length - 3}
//                   </span>
//                 )}
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-orange-600 font-bold text-xl">
//                   RWF {item.price?.toLocaleString()}
//                 </span>
//                 <span className="text-gray-400 text-xs flex items-center gap-1">
//                   <TimeIcon fontSize="small" /> {item.prepTime} min
//                 </span>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Create/Edit Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <div
//             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//             onClick={() => setShowModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-5 rounded-t-3xl flex justify-between items-center">
//                 <h2 className="text-white font-bold text-xl">
//                   {editingItem ? "Edit Menu Item" : "Create New Menu Item"}
//                 </h2>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="p-1 hover:bg-white/20 rounded-full transition"
//                 >
//                   <CloseIcon className="text-white" />
//                 </button>
//               </div>
//               <div className="p-5 sm:p-6 space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     placeholder="Item Name *"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Price (RWF) *"
//                     value={formData.price}
//                     onChange={(e) =>
//                       setFormData({ ...formData, price: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   />
//                 </div>
//                 <textarea
//                   placeholder="Ingredients (comma separated)"
//                   value={formData.ingredients}
//                   onChange={(e) =>
//                     setFormData({ ...formData, ingredients: e.target.value })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   rows={2}
//                 />
//                 <textarea
//                   placeholder="Description"
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   rows={2}
//                 />
//                 <div className="grid grid-cols-2 gap-4">
//                   <input
//                     type="number"
//                     placeholder="Prep time (minutes)"
//                     value={formData.prepTime}
//                     onChange={(e) =>
//                       setFormData({ ...formData, prepTime: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl"
//                   />
//                   <select
//                     value={formData.category}
//                     onChange={(e) =>
//                       setFormData({ ...formData, category: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl bg-white"
//                   >
//                     {categories.map((c) => (
//                       <option key={c}>{c}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-orange-400 transition">
//                   <label className="flex flex-col items-center gap-2 cursor-pointer">
//                     <CloudUploadIcon className="text-gray-400 text-4xl" />
//                     <span className="text-sm text-gray-500">
//                       Click to upload image
//                     </span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="hidden"
//                     />
//                   </label>
//                   {imagePreview && (
//                     <img
//                       src={imagePreview}
//                       alt="preview"
//                       className="mt-3 h-32 w-32 object-cover rounded-xl mx-auto shadow-md"
//                     />
//                   )}
//                 </div>
//                 <textarea
//                   placeholder='Nutritional Info (JSON) e.g. {"calories": 450, "protein": "25g"}'
//                   value={formData.nutritionalInfo}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       nutritionalInfo: e.target.value,
//                     })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl font-mono text-sm"
//                   rows={2}
//                 />
//                 <div className="grid grid-cols-2 gap-4">
//                   <select
//                     value={formData.purineLevel}
//                     onChange={(e) =>
//                       setFormData({ ...formData, purineLevel: e.target.value })
//                     }
//                     className="w-full p-3 border rounded-xl"
//                   >
//                     <option value="low">Low Purine</option>
//                     <option value="moderate">Moderate Purine</option>
//                     <option value="high">High Purine</option>
//                   </select>
//                   <input
//                     type="number"
//                     placeholder="Sodium (mg)"
//                     value={formData.sodiumMg}
//                     onChange={(e) =>
//                       setFormData({ ...formData, sodiumMg: e.target.value })
//                     }
//                     className="w-full p-3 border rounded-xl"
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-xl">
//                   <label className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={formData.containsGluten}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           containsGluten: e.target.checked,
//                         })
//                       }
//                       className="w-4 h-4"
//                     />{" "}
//                     Gluten
//                   </label>
//                   <label className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={formData.containsPeanuts}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           containsPeanuts: e.target.checked,
//                         })
//                       }
//                     />{" "}
//                     Peanuts
//                   </label>
//                   <label className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={formData.containsShellfish}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           containsShellfish: e.target.checked,
//                         })
//                       }
//                     />{" "}
//                     Shellfish
//                   </label>
//                   <label className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={formData.containsDairy}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           containsDairy: e.target.checked,
//                         })
//                       }
//                     />{" "}
//                     Dairy
//                   </label>
//                   <label className="flex items-center gap-2 text-sm col-span-2">
//                     <input
//                       type="checkbox"
//                       checked={formData.highSalt}
//                       onChange={(e) =>
//                         setFormData({ ...formData, highSalt: e.target.checked })
//                       }
//                     />{" "}
//                     High Salt Content
//                   </label>
//                 </div>
//                 <textarea
//                   placeholder="Reflux Triggers (comma separated)"
//                   value={formData.refluxTriggers}
//                   onChange={(e) =>
//                     setFormData({ ...formData, refluxTriggers: e.target.value })
//                   }
//                   className="w-full p-3 border rounded-xl"
//                   rows={2}
//                 />
//                 <textarea
//                   placeholder="Migraine Triggers (comma separated)"
//                   value={formData.migraineTriggers}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       migraineTriggers: e.target.value,
//                     })
//                   }
//                   className="w-full p-3 border rounded-xl"
//                   rows={2}
//                 />
//                 <button
//                   onClick={handleSubmit}
//                   disabled={loadingUpload}
//                   className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold text-lg hover:shadow-lg transition disabled:opacity-50"
//                 >
//                   {loadingUpload
//                     ? "Saving..."
//                     : editingItem
//                     ? "Update Item"
//                     : "Create Item"}
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       <FoodDetailsModal
//         item={viewDetailsItem}
//         onClose={() => setViewDetailsItem(null)}
//       />
//     </div>
//   );
// };

// // ====================== ORDERS TABLE ======================
// const OrdersTable = ({
//   orders,
//   onUpdateStatus,
//   onViewDetails,
//   onDeleteOrder,
// }) => {
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [deleteConfirmId, setDeleteConfirmId] = useState(null);

//   const getStatusConfig = (status) => {
//     const config = {
//       pending: {
//         color: "bg-yellow-100 text-yellow-700",
//         icon: <TimeIcon fontSize="small" />,
//       },
//       confirmed: {
//         color: "bg-blue-100 text-blue-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       preparing: {
//         color: "bg-purple-100 text-purple-700",
//         icon: <KitchenIcon fontSize="small" />,
//       },
//       ready: {
//         color: "bg-green-100 text-green-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       served: {
//         color: "bg-teal-100 text-teal-700",
//         icon: <RestaurantIcon fontSize="small" />,
//       },
//       completed: {
//         color: "bg-gray-100 text-gray-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       cancelled: {
//         color: "bg-red-100 text-red-700",
//         icon: <CancelIcon fontSize="small" />,
//       },
//     };
//     return config[status] || config.pending;
//   };

//   const filtered = orders.filter(
//     (o) =>
//       (o.orderId?.toLowerCase().includes(search.toLowerCase()) ||
//         o.personDetails?.name?.toLowerCase().includes(search.toLowerCase())) &&
//       (statusFilter === "all" || o.status === statusFilter)
//   );

//   return (
//     <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//       <AnimatePresence>
//         {deleteConfirmId && (
//           <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               className="bg-white rounded-2xl max-w-md w-full p-6"
//             >
//               <div className="text-center">
//                 <DeleteSweepIcon className="text-red-500 text-5xl mb-4" />
//                 <h3 className="text-xl font-bold mb-2">Delete Order</h3>
//                 <p className="text-gray-500 mb-6">
//                   Are you sure you want to delete this order?
//                 </p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setDeleteConfirmId(null)}
//                     className="flex-1 px-4 py-2 border rounded-xl"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={async () => {
//                       await onDeleteOrder(deleteConfirmId);
//                       setDeleteConfirmId(null);
//                     }}
//                     className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       <div className="p-4 flex flex-col sm:flex-row gap-3 border-b bg-gray-50/50">
//         <div className="relative flex-1">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by Order ID or Customer..."
//             className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-orange-400"
//         >
//           <option value="all">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="preparing">Preparing</option>
//           <option value="ready">Ready</option>
//           <option value="served">Served</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               {[
//                 "Order ID",
//                 "Table",
//                 "Customer",
//                 "Items",
//                 "Total",
//                 "Status",
//                 "Actions",
//               ].map((h) => (
//                 <th
//                   key={h}
//                   className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {filtered.map((order) => {
//               const statusConfig = getStatusConfig(order.status);
//               return (
//                 <tr
//                   key={order._id}
//                   className="hover:bg-orange-50/30 transition"
//                 >
//                   <td className="px-4 py-3 text-sm font-mono font-medium text-gray-700">
//                     {order.orderId?.slice(-8)}
//                   </td>
//                   <td className="px-4 py-3 text-sm">
//                     Table {order.personDetails?.tableNumber}
//                   </td>
//                   <td className="px-4 py-3 text-sm font-medium">
//                     {order.personDetails?.name || "Guest"}
//                   </td>
//                   <td className="px-4 py-3 text-sm">
//                     {order.orderSummary?.totalItems || order.items?.length || 0}{" "}
//                     items
//                   </td>
//                   <td className="px-4 py-3 text-sm font-bold text-orange-600">
//                     RWF {order.orderSummary?.total?.toLocaleString() || 0}
//                   </td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
//                     >
//                       {statusConfig.icon}
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => onViewDetails(order)}
//                         className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
//                       >
//                         <VisibilityIcon fontSize="small" />
//                       </button>
//                       <select
//                         value={order.status}
//                         onChange={(e) => onUpdateStatus(order, e.target.value)}
//                         className="text-xs border rounded-lg px-2 py-1 bg-white focus:ring-1 focus:ring-orange-400"
//                       >
//                         <option value="pending">pending</option>
//                         <option value="confirmed">confirmed</option>
//                         <option value="preparing">preparing</option>
//                         <option value="ready">ready</option>
//                         <option value="served">served</option>
//                         <option value="completed">completed</option>
//                         <option value="cancelled">cancelled</option>
//                       </select>
//                       <button
//                         onClick={() => setDeleteConfirmId(order._id)}
//                         className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // ====================== ORDER DETAILS MODAL ======================
// const OrderDetailsModal = ({ order, onClose, onUpdateStatus }) => {
//   if (!order) return null;
//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 p-5 rounded-t-3xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl">
//             Order #{order.orderId?.slice(-8)}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-white/20 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>
//         <div className="p-6 space-y-5">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-gray-50 p-3 rounded-xl">
//               <p className="text-xs text-gray-500">Customer</p>
//               <p className="font-semibold text-gray-800">
//                 {order.personDetails?.name || "Guest"}
//               </p>
//             </div>
//             <div className="bg-gray-50 p-3 rounded-xl">
//               <p className="text-xs text-gray-500">Table Number</p>
//               <p className="font-semibold text-gray-800">
//                 {order.personDetails?.tableNumber}
//               </p>
//             </div>
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 mb-2">Status</p>
//             <select
//               value={order.status}
//               onChange={(e) => onUpdateStatus(order, e.target.value)}
//               className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400"
//             >
//               {[
//                 "pending",
//                 "confirmed",
//                 "preparing",
//                 "ready",
//                 "served",
//                 "completed",
//                 "cancelled",
//               ].map((s) => (
//                 <option key={s} className="capitalize">
//                   {s}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="bg-orange-50 p-4 rounded-xl">
//             <p className="text-xs text-gray-500">Total Amount</p>
//             <p className="text-3xl font-bold text-orange-600">
//               RWF {order.orderSummary?.total?.toLocaleString() || 0}
//             </p>
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 mb-3">Order Items</p>
//             <div className="space-y-2">
//               {order.items?.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
//                 >
//                   <div className="flex items-center gap-3">
//                     <span className="font-bold text-gray-600">
//                       {item.quantity}x
//                     </span>
//                     <span className="font-medium">{item.name}</span>
//                   </div>
//                   <span className="font-bold text-orange-600">
//                     RWF{" "}
//                     {(
//                       item.finalPrice ||
//                       item.originalPrice ||
//                       0
//                     ).toLocaleString()}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ====================== NAV BUTTON ======================
// const NavButton = ({ active, onClick, icon, label }) => (
//   <button
//     onClick={onClick}
//     className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
//       active
//         ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
//         : "text-gray-600 hover:bg-gray-100"
//     }`}
//   >
//     {icon}
//     <span className="hidden sm:inline">{label}</span>
//   </button>
// );

// // ====================== MAIN DASHBOARD ======================
// export const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [orders, setOrders] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dailyAnalytics, setDailyAnalytics] = useState(null);
//   const [weeklyAnalytics, setWeeklyAnalytics] = useState(null);
//   const [analyticsLoading, setAnalyticsLoading] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     totalRevenue: 0,
//     activeOrders: 0,
//     pendingOrders: 0,
//   });

//   const fetchOrders = useCallback(async () => {
//     try {
//       const res = await axiosInstance.get("/orders");
//       let data = res.data?.data || res.data?.orders || [];
//       if (Array.isArray(data)) {
//         const transformed = data.map((o) => ({
//           ...o,
//           orderSummary: o.orderSummary || { total: 0 },
//           status: o.status || "pending",
//         }));
//         setOrders(transformed);
//         setStats({
//           totalOrders: transformed.length,
//           totalRevenue: transformed.reduce(
//             (s, o) => s + (o.orderSummary?.total || 0),
//             0
//           ),
//           activeOrders: transformed.filter(
//             (o) => !["completed", "cancelled"].includes(o.status)
//           ).length,
//           pendingOrders: transformed.filter((o) => o.status === "pending")
//             .length,
//         });
//       }
//     } catch (err) {
//       toast.error("Failed to fetch orders");
//     }
//   }, []);

//   const fetchFoods = useCallback(async () => {
//     try {
//       const res = await axiosInstance.get("/foods");
//       if (res.data?.success && res.data.foods) setMenuItems(res.data.foods);
//       else if (Array.isArray(res.data)) setMenuItems(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch menu");
//     }
//   }, []);

//   const fetchAnalytics = async () => {
//     setAnalyticsLoading(true);
//     try {
//       const [daily, weekly] = await Promise.all([
//         axiosInstance.get("/orders/analytics/daily"),
//         axiosInstance.get("/orders/analytics/weekly"),
//       ]);
//       if (daily.data?.success) setDailyAnalytics(daily.data);
//       if (weekly.data?.success) setWeeklyAnalytics(weekly.data);
//     } catch (e) {
//     } finally {
//       setAnalyticsLoading(false);
//     }
//   };

//   const handleAddFood = async (formData) => {
//     try {
//       await axiosInstance.post("/foods", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       await fetchFoods();
//       toast.success("Food created!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Creation failed");
//     }
//   };

//   const handleEditFood = async (id, formData) => {
//     try {
//       await axiosInstance.put(`/foods/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       await fetchFoods();
//       toast.success("Food updated!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Update failed");
//     }
//   };

//   const handleDeleteFood = async (id) => {
//     try {
//       await axiosInstance.delete(`/foods/${id}`);
//       await fetchFoods();
//       toast.success("Food deleted!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Delete failed");
//     }
//   };

//   const updateOrderStatus = async (order, newStatus) => {
//     try {
//       await axiosInstance.patch(`/orders/${order._id}/status`, {
//         status: newStatus,
//       });
//       await fetchOrders();
//       toast.success(`Status updated to ${newStatus}!`);
//     } catch (e) {
//       toast.error("Update failed");
//     }
//   };

//   const deleteOrder = async (id) => {
//     try {
//       await axiosInstance.delete(`/orders/${id}`);
//       await fetchOrders();
//       toast.success("Order deleted!");
//     } catch (e) {
//       toast.error("Delete failed");
//     }
//   };

//   const refreshAll = async () => {
//     setLoading(true);
//     await Promise.all([fetchOrders(), fetchFoods(), fetchAnalytics()]);
//     setLoading(false);
//     toast.success("Data refreshed!");
//   };

//   const handleLogout = () => {
//     // Simple logout - you can expand this to clear auth tokens or redirect
//     toast.info("Logged out successfully");
//     // Optional: Redirect to login page or clear any auth state
//     // window.location.href = '/login';
//   };

//   useEffect(() => {
//     refreshAll();
//   }, []);

//   if (loading)
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-orange-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/20">
//       <ToastContainer position="top-right" />
//       <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-3">
//         <div className="flex items-center gap-3">
//           <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2.5 rounded-2xl shadow-lg">
//             <RestaurantIcon className="text-white" />
//           </div>
//           <div>
//             <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
//               NutriScan·AI
//             </h1>
//             <p className="text-xs text-gray-500">
//               Restaurant Intelligence Dashboard
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={refreshAll}
//             className="p-2 hover:bg-gray-100 rounded-full transition"
//           >
//             <RefreshIcon />
//           </button>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition shadow-md"
//           >
//             <LogoutIcon fontSize="small" />
//             <span className="hidden sm:inline">Logout</span>
//           </button>
//         </div>
//       </header>

//       <div className="px-4 sm:px-6 pt-4 sticky top-[73px] z-10 bg-transparent">
//         <div className="flex gap-1 bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-sm overflow-x-auto">
//           <NavButton
//             active={activeTab === "overview"}
//             onClick={() => setActiveTab("overview")}
//             icon={<DashboardIcon />}
//             label="Overview"
//           />
//           <NavButton
//             active={activeTab === "orders"}
//             onClick={() => setActiveTab("orders")}
//             icon={<OrdersIcon />}
//             label="Orders"
//           />
//           <NavButton
//             active={activeTab === "menu"}
//             onClick={() => setActiveTab("menu")}
//             icon={<MenuIcon />}
//             label="Menu"
//           />
//           <NavButton
//             active={activeTab === "analytics"}
//             onClick={() => setActiveTab("analytics")}
//             icon={<AnalyticsIcon />}
//             label="Analytics"
//           />
//         </div>
//       </div>

//       <div className="p-4 sm:p-6">
//         {activeTab === "overview" && (
//           <>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-6">
//               <StatCard
//                 title="Total Orders"
//                 value={stats.totalOrders}
//                 icon={<OrdersIcon />}
//                 color="border-blue-500"
//               />
//               <StatCard
//                 title="Revenue"
//                 value={`RWF ${stats.totalRevenue.toLocaleString()}`}
//                 icon={<MoneyIcon />}
//                 color="border-green-500"
//               />
//               <StatCard
//                 title="Active Orders"
//                 value={stats.activeOrders}
//                 icon={<KitchenIcon />}
//                 color="border-purple-500"
//               />
//               <StatCard
//                 title="Pending"
//                 value={stats.pendingOrders}
//                 icon={<TimeIcon />}
//                 color="border-yellow-500"
//               />
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//               <DailyAnalyticsCard
//                 analytics={dailyAnalytics}
//                 loading={analyticsLoading}
//               />
//               <WeeklyAnalyticsCard
//                 analytics={weeklyAnalytics}
//                 loading={analyticsLoading}
//               />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <OrdersIcon className="text-orange-500" /> Recent Orders
//               </h2>
//               <OrdersTable
//                 orders={orders.slice(0, 5)}
//                 onUpdateStatus={updateOrderStatus}
//                 onViewDetails={setSelectedOrder}
//                 onDeleteOrder={deleteOrder}
//               />
//             </div>
//           </>
//         )}
//         {activeTab === "orders" && (
//           <OrdersTable
//             orders={orders}
//             onUpdateStatus={updateOrderStatus}
//             onViewDetails={setSelectedOrder}
//             onDeleteOrder={deleteOrder}
//           />
//         )}
//         {activeTab === "menu" && (
//           <MenuManagement
//             menuItems={menuItems}
//             onAddItem={handleAddFood}
//             onEditItem={handleEditFood}
//             onDeleteItem={handleDeleteFood}
//             onRefresh={fetchFoods}
//           />
//         )}
//         {activeTab === "analytics" && (
//           <div className="space-y-6">
//             <DailyAnalyticsCard
//               analytics={dailyAnalytics}
//               loading={analyticsLoading}
//             />
//             <WeeklyAnalyticsCard
//               analytics={weeklyAnalytics}
//               loading={analyticsLoading}
//             />
//           </div>
//         )}
//       </div>
//       {selectedOrder && (
//         <OrderDetailsModal
//           order={selectedOrder}
//           onClose={() => setSelectedOrder(null)}
//           onUpdateStatus={updateOrderStatus}
//         />
//       )}
//     </div>
//   );
// };

// import React, { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Icons
// import {
//   Dashboard as DashboardIcon,
//   RestaurantMenu as MenuIcon,
//   ShoppingCart as OrdersIcon,
//   Analytics as AnalyticsIcon,
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Close as CloseIcon,
//   CloudUpload as CloudUploadIcon,
//   Search as SearchIcon,
//   Refresh as RefreshIcon,
//   AttachMoney as MoneyIcon,
//   AccessTime as TimeIcon,
//   Person as PersonIcon,
//   Restaurant as RestaurantIcon,
//   Visibility as VisibilityIcon,
//   ListAlt as ListAltIcon,
//   Healing as HealingIcon,
//   Warning as WarningIcon,
//   Today as TodayIcon,
//   DateRange as DateRangeIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   Kitchen as KitchenIcon,
//   ArrowUpward as ArrowUpIcon,
//   ArrowDownward as ArrowDownIcon,
//   LocalOffer as LocalOfferIcon,
//   DeleteSweep as DeleteSweepIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";

// // ====================== API CONFIG ======================
// const API_BASE = "https://nutriscan-foodanddrinksupply.onrender.com";
// const axiosInstance = axios.create({ baseURL: API_BASE, timeout: 30000 });

// // ====================== AUTH CONTEXT ======================
// const AuthContext = React.createContext(null);

// // Mock authentication - replace with your actual auth logic
// const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     return localStorage.getItem("auth_token") !== null;
//   });

//   const login = (token) => {
//     localStorage.setItem("auth_token", token);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("auth_token");
//     setIsAuthenticated(false);
//     toast.info("Logged out successfully");
//     // Redirect to login page (you can implement your own login page)
//     window.location.href = "/login";
//   };

//   return { isAuthenticated, login, logout };
// };

// // ====================== STAT CARD ======================
// const StatCard = ({ title, value, icon, color, trend, trendValue }) => (
//   <motion.div
//     whileHover={{ y: -5, scale: 1.02 }}
//     transition={{ duration: 0.2 }}
//     className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-4 sm:p-5 border-t-4 ${color} hover:shadow-xl transition-all duration-300`}
//   >
//     <div className="flex justify-between items-start">
//       <div className="flex-1">
//         <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide">
//           {title}
//         </p>
//         <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mt-2 break-words">
//           {value}
//         </p>
//         {trend && (
//           <div className="flex items-center gap-1 mt-2">
//             {trend === "up" ? (
//               <ArrowUpIcon className="text-green-500 text-sm" />
//             ) : (
//               <ArrowDownIcon className="text-red-500 text-sm" />
//             )}
//             <span
//               className={`text-xs font-medium ${
//                 trend === "up" ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {trendValue}
//             </span>
//           </div>
//         )}
//       </div>
//       <div
//         className={`p-3 rounded-2xl bg-gradient-to-br ${color
//           .replace("border-", "from-")
//           .replace("-500", "-100")} to-white shadow-inner`}
//       >
//         {icon}
//       </div>
//     </div>
//   </motion.div>
// );

// // ====================== FOOD DETAILS MODAL ======================
// const FoodDetailsModal = ({ item, onClose }) => {
//   if (!item) return null;
//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 20 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 20 }}
//         className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="relative">
//           {item.image ? (
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-48 sm:h-64 object-cover rounded-t-3xl"
//             />
//           ) : (
//             <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-3xl flex items-center justify-center">
//               <RestaurantIcon className="text-gray-400 text-6xl" />
//             </div>
//           )}
//           <div className="absolute top-4 right-4">
//             <button
//               onClick={onClose}
//               className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition"
//             >
//               <CloseIcon className="text-white" />
//             </button>
//           </div>
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
//             <h2 className="text-white text-2xl sm:text-3xl font-bold">
//               {item.name}
//             </h2>
//             <p className="text-white/90 text-sm mt-1">{item.category}</p>
//           </div>
//         </div>

//         <div className="p-5 sm:p-6 space-y-5">
//           <div className="flex justify-between items-center pb-3 border-b">
//             <div>
//               <p className="text-xs text-gray-500">Price</p>
//               <p className="text-2xl font-bold text-orange-600">
//                 RWF {item.price?.toLocaleString()}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Prep Time</p>
//               <p className="text-lg font-semibold flex items-center gap-1">
//                 <TimeIcon fontSize="small" className="text-gray-400" />{" "}
//                 {item.prepTime} min
//               </p>
//             </div>
//             <div>
//               <span
//                 className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   item.purineLevel === "low"
//                     ? "bg-green-100 text-green-700"
//                     : item.purineLevel === "moderate"
//                     ? "bg-yellow-100 text-yellow-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {item.purineLevel?.toUpperCase()} Purine
//               </span>
//             </div>
//           </div>

//           {item.description && (
//             <div>
//               <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                 📖 Description
//               </h3>
//               <p className="text-sm text-gray-600 leading-relaxed">
//                 {item.description}
//               </p>
//             </div>
//           )}

//           <div>
//             <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               <ListAltIcon className="text-emerald-600" /> Ingredients
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {item.ingredients?.map((ing, idx) => (
//                 <span
//                   key={idx}
//                   className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium"
//                 >
//                   {ing}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//               <HealingIcon className="text-blue-500" /> Dietary Information
//             </h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.containsGluten ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.containsGluten ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   Gluten: {item.containsGluten ? "Contains" : "Free"}
//                 </span>
//               </div>
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.containsPeanuts ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.containsPeanuts ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   Peanuts: {item.containsPeanuts ? "Contains" : "Free"}
//                 </span>
//               </div>
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.containsShellfish ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.containsShellfish ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   Shellfish: {item.containsShellfish ? "Contains" : "Free"}
//                 </span>
//               </div>
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.containsDairy ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.containsDairy ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   Dairy: {item.containsDairy ? "Contains" : "Free"}
//                 </span>
//               </div>
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.highSalt ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.highSalt ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   High Salt: {item.highSalt ? "Yes" : "No"}
//                 </span>
//               </div>
//               {item.sodiumMg && (
//                 <div className="bg-blue-50 p-2 rounded-lg">
//                   <span className="text-sm">Sodium: {item.sodiumMg}mg</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {(item.refluxTriggers?.length > 0 ||
//             item.migraineTriggers?.length > 0) && (
//             <div>
//               <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                 <WarningIcon className="text-orange-500" /> Health Triggers
//               </h3>
//               {item.refluxTriggers?.length > 0 && (
//                 <div className="mb-2">
//                   <p className="text-xs text-gray-500 mb-1">Reflux Triggers:</p>
//                   <div className="flex flex-wrap gap-1">
//                     {item.refluxTriggers.map((t, i) => (
//                       <span
//                         key={i}
//                         className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full"
//                       >
//                         {t}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {item.migraineTriggers?.length > 0 && (
//                 <div>
//                   <p className="text-xs text-gray-500 mb-1">
//                     Migraine Triggers:
//                   </p>
//                   <div className="flex flex-wrap gap-1">
//                     {item.migraineTriggers.map((t, i) => (
//                       <span
//                         key={i}
//                         className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
//                       >
//                         {t}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ====================== DAILY ANALYTICS CARD ======================
// const DailyAnalyticsCard = ({ analytics, loading }) => {
//   if (loading)
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
//         <div className="h-32 bg-gray-200 rounded"></div>
//       </div>
//     );
//   if (!analytics)
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-400">
//         No data available
//       </div>
//     );
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-gradient-to-br from-white to-orange-50/30 rounded-2xl shadow-lg p-5 sm:p-6"
//     >
//       <div className="flex items-center gap-2 mb-5">
//         <div className="p-2 bg-orange-100 rounded-xl">
//           <TodayIcon className="text-orange-600" />
//         </div>
//         <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//           Daily Analytics
//         </h2>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//         <div className="space-y-4">
//           <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl text-white">
//             <p className="text-sm opacity-90">Total Orders Today</p>
//             <p className="text-3xl font-bold">{analytics.totalOrders || 0}</p>
//           </div>
//           <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-xl text-white">
//             <p className="text-sm opacity-90">Total Income Today</p>
//             <p className="text-2xl font-bold">
//               RWF {(analytics.totalIncome || 0).toLocaleString()}
//             </p>
//           </div>
//         </div>
//         <div>
//           <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//             <LocalOfferIcon fontSize="small" /> Top Selling Items
//           </p>
//           <div className="space-y-2">
//             {analytics.topPlates?.slice(0, 5).map((plate, idx) => (
//               <div
//                 key={idx}
//                 className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
//               >
//                 <span className="text-sm font-medium text-gray-700">
//                   {plate.name}
//                 </span>
//                 <span className="text-sm font-bold text-orange-600">
//                   {plate.quantity} sold
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ====================== WEEKLY ANALYTICS ======================
// const WeeklyAnalyticsCard = ({ analytics, loading }) => {
//   if (loading)
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
//         <div className="h-64 bg-gray-200 rounded"></div>
//       </div>
//     );
//   if (!analytics?.data?.length)
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-400">
//         No weekly data
//       </div>
//     );
//   const totalOrders = analytics.data.reduce((sum, d) => sum + d.orders, 0);
//   const maxOrders = Math.max(...analytics.data.map((d) => d.orders));
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg p-5 sm:p-6"
//     >
//       <div className="flex items-center gap-2 mb-5">
//         <div className="p-2 bg-blue-100 rounded-xl">
//           <DateRangeIcon className="text-blue-600" />
//         </div>
//         <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//           Weekly Overview
//         </h2>
//       </div>
//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <div className="bg-green-100 p-3 rounded-xl text-center">
//           <p className="text-xs text-gray-600">Total Orders</p>
//           <p className="text-2xl font-bold text-green-700">{totalOrders}</p>
//         </div>
//       </div>
//       <div className="space-y-3">
//         {analytics.data.map((day, idx) => (
//           <div key={idx} className="flex items-center gap-3">
//             <span className="text-sm font-semibold w-12 text-gray-700">
//               {day.day.substring(0, 3)}
//             </span>
//             <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${(day.orders / maxOrders) * 100}%` }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
//               ></motion.div>
//             </div>
//             <span className="text-sm font-bold text-gray-700 w-16 text-right">
//               {day.orders}
//             </span>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// // ====================== MENU MANAGEMENT ======================
// const MenuManagement = ({
//   menuItems,
//   onAddItem,
//   onEditItem,
//   onDeleteItem,
//   onRefresh,
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [loadingUpload, setLoadingUpload] = useState(false);
//   const [viewDetailsItem, setViewDetailsItem] = useState(null);
//   const [deleteConfirmId, setDeleteConfirmId] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const [imageFile, setImageFile] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     ingredients: "",
//     description: "",
//     prepTime: "",
//     category: "Mains",
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: "",
//     migraineTriggers: "",
//     highSalt: false,
//     sodiumMg: "",
//     nutritionalInfo: "",
//   });

//   const categories = [
//     "Mains",
//     "Appetizers",
//     "Seafood",
//     "Vegan",
//     "Desserts",
//     "Beverages",
//     "Soups",
//     "Salads",
//   ];

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formData.name || !formData.price) {
//       toast.error("Please fill in name and price");
//       return;
//     }
//     setLoadingUpload(true);
//     try {
//       const submitData = new FormData();
//       submitData.append("name", formData.name);
//       submitData.append("price", formData.price);
//       submitData.append(
//         "ingredients",
//         JSON.stringify(
//           formData.ingredients
//             .split(",")
//             .map((i) => i.trim())
//             .filter((i) => i)
//         )
//       );
//       submitData.append("description", formData.description);
//       submitData.append("prepTime", formData.prepTime || "15");
//       submitData.append("category", formData.category);
//       submitData.append("purineLevel", formData.purineLevel);
//       submitData.append("containsGluten", String(formData.containsGluten));
//       submitData.append("containsPeanuts", String(formData.containsPeanuts));
//       submitData.append(
//         "containsShellfish",
//         String(formData.containsShellfish)
//       );
//       submitData.append("containsDairy", String(formData.containsDairy));
//       submitData.append("highSalt", String(formData.highSalt));
//       submitData.append(
//         "refluxTriggers",
//         JSON.stringify(
//           formData.refluxTriggers
//             .split(",")
//             .map((s) => s.trim())
//             .filter((s) => s)
//         )
//       );
//       submitData.append(
//         "migraineTriggers",
//         JSON.stringify(
//           formData.migraineTriggers
//             .split(",")
//             .map((s) => s.trim())
//             .filter((s) => s)
//         )
//       );
//       if (formData.sodiumMg) submitData.append("sodiumMg", formData.sodiumMg);
//       if (formData.nutritionalInfo)
//         submitData.append("nutritionalInfo", formData.nutritionalInfo);
//       if (imageFile) submitData.append("image", imageFile);

//       if (editingItem) {
//         await onEditItem(editingItem._id, submitData);
//         toast.success("Item updated successfully!");
//       } else {
//         await onAddItem(submitData);
//         toast.success("Item created successfully!");
//       }
//       setShowModal(false);
//       resetForm();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Operation failed");
//     } finally {
//       setLoadingUpload(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       price: "",
//       ingredients: "",
//       description: "",
//       prepTime: "",
//       category: "Mains",
//       purineLevel: "low",
//       containsGluten: false,
//       containsPeanuts: false,
//       containsShellfish: false,
//       containsDairy: false,
//       refluxTriggers: "",
//       migraineTriggers: "",
//       highSalt: false,
//       sodiumMg: "",
//       nutritionalInfo: "",
//     });
//     setImageFile(null);
//     setImagePreview("");
//     setEditingItem(null);
//   };

//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setFormData({
//       name: item.name,
//       price: item.price.toString(),
//       ingredients: item.ingredients?.join(", ") || "",
//       description: item.description || "",
//       prepTime: item.prepTime?.toString() || "",
//       category: item.category || "Mains",
//       purineLevel: item.purineLevel,
//       containsGluten: item.containsGluten,
//       containsPeanuts: item.containsPeanuts,
//       containsShellfish: item.containsShellfish,
//       containsDairy: item.containsDairy,
//       refluxTriggers: item.refluxTriggers?.join(", ") || "",
//       migraineTriggers: item.migraineTriggers?.join(", ") || "",
//       highSalt: item.highSalt,
//       sodiumMg: item.sodiumMg?.toString() || "",
//       nutritionalInfo: item.nutritionalInfo
//         ? JSON.stringify(item.nutritionalInfo)
//         : "",
//     });
//     setImagePreview(item.image || "");
//     setShowModal(true);
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {deleteConfirmId && (
//           <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               className="bg-white rounded-2xl max-w-md w-full p-6"
//             >
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <DeleteIcon className="text-red-600 text-3xl" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">
//                   Delete Item
//                 </h3>
//                 <p className="text-gray-500 mb-6">
//                   Are you sure you want to delete this item? This action cannot
//                   be undone.
//                 </p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setDeleteConfirmId(null)}
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={async () => {
//                       await onDeleteItem(deleteConfirmId);
//                       setDeleteConfirmId(null);
//                     }}
//                     className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             <MenuIcon className="text-orange-500" /> Menu Management
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Manage your restaurant's food items
//           </p>
//         </div>
//         <div className="flex gap-2 w-full sm:w-auto">
//           <button
//             onClick={onRefresh}
//             className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition flex-1 sm:flex-none"
//           >
//             <RefreshIcon fontSize="small" /> Sync
//           </button>
//           <button
//             onClick={() => {
//               resetForm();
//               setShowModal(true);
//             }}
//             className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-xl hover:shadow-lg transition flex-1 sm:flex-none"
//           >
//             <AddIcon fontSize="small" /> Add Item
//           </button>
//         </div>
//       </div>

//       {/* Menu Grid */}
//       {menuItems.length === 0 ? (
//         <div className="text-center py-12">
//           <MenuIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//           <p className="text-gray-400">
//             No menu items found. Click "Add Item" to create your first menu
//             item.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//           {menuItems.map((item) => (
//             <motion.div
//               key={item._id}
//               whileHover={{ y: -5 }}
//               className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
//             >
//               <div className="relative h-48 overflow-hidden">
//                 {item.image ? (
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
//                     <RestaurantIcon className="text-gray-400 text-5xl" />
//                   </div>
//                 )}
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-3">
//                   <button
//                     onClick={() => handleEdit(item)}
//                     className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
//                   >
//                     <EditIcon fontSize="small" />
//                   </button>
//                   <button
//                     onClick={() => setViewDetailsItem(item)}
//                     className="p-2 bg-emerald-500 rounded-full text-white hover:bg-emerald-600 transition"
//                   >
//                     <VisibilityIcon fontSize="small" />
//                   </button>
//                   <button
//                     onClick={() => setDeleteConfirmId(item._id)}
//                     className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </button>
//                 </div>
//                 <div className="absolute top-3 right-3">
//                   <span
//                     className={`px-2 py-1 rounded-lg text-xs font-medium ${
//                       item.purineLevel === "low"
//                         ? "bg-green-500"
//                         : item.purineLevel === "moderate"
//                         ? "bg-yellow-500"
//                         : "bg-red-500"
//                     } text-white shadow-lg`}
//                   >
//                     {item.purineLevel}
//                   </span>
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
//                   {item.name}
//                 </h3>
//                 <p className="text-xs text-gray-500 line-clamp-2 mb-2">
//                   {item.description}
//                 </p>
//                 <div className="flex flex-wrap gap-1 mb-3">
//                   {item.ingredients?.slice(0, 3).map((ing, i) => (
//                     <span
//                       key={i}
//                       className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600"
//                     >
//                       {ing}
//                     </span>
//                   ))}
//                   {item.ingredients?.length > 3 && (
//                     <span className="text-xs text-gray-400">
//                       +{item.ingredients.length - 3}
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-orange-600 font-bold text-xl">
//                     RWF {item.price?.toLocaleString()}
//                   </span>
//                   <span className="text-gray-400 text-xs flex items-center gap-1">
//                     <TimeIcon fontSize="small" /> {item.prepTime} min
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* Create/Edit Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <div
//             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//             onClick={() => setShowModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-5 rounded-t-3xl flex justify-between items-center">
//                 <h2 className="text-white font-bold text-xl">
//                   {editingItem ? "Edit Menu Item" : "Create New Menu Item"}
//                 </h2>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="p-1 hover:bg-white/20 rounded-full transition"
//                 >
//                   <CloseIcon className="text-white" />
//                 </button>
//               </div>
//               <div className="p-5 sm:p-6 space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     placeholder="Item Name *"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Price (RWF) *"
//                     value={formData.price}
//                     onChange={(e) =>
//                       setFormData({ ...formData, price: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   />
//                 </div>
//                 <textarea
//                   placeholder="Ingredients (comma separated)"
//                   value={formData.ingredients}
//                   onChange={(e) =>
//                     setFormData({ ...formData, ingredients: e.target.value })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   rows={2}
//                 />
//                 <textarea
//                   placeholder="Description"
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   rows={2}
//                 />
//                 <div className="grid grid-cols-2 gap-4">
//                   <input
//                     type="number"
//                     placeholder="Prep time (minutes)"
//                     value={formData.prepTime}
//                     onChange={(e) =>
//                       setFormData({ ...formData, prepTime: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl"
//                   />
//                   <select
//                     value={formData.category}
//                     onChange={(e) =>
//                       setFormData({ ...formData, category: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl bg-white"
//                   >
//                     {categories.map((c) => (
//                       <option key={c}>{c}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-orange-400 transition">
//                   <label className="flex flex-col items-center gap-2 cursor-pointer">
//                     <CloudUploadIcon className="text-gray-400 text-4xl" />
//                     <span className="text-sm text-gray-500">
//                       Click to upload image
//                     </span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="hidden"
//                     />
//                   </label>
//                   {imagePreview && (
//                     <img
//                       src={imagePreview}
//                       alt="preview"
//                       className="mt-3 h-32 w-32 object-cover rounded-xl mx-auto shadow-md"
//                     />
//                   )}
//                 </div>
//                 <textarea
//                   placeholder='Nutritional Info (JSON) e.g. {"calories": 450, "protein": "25g"}'
//                   value={formData.nutritionalInfo}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       nutritionalInfo: e.target.value,
//                     })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl font-mono text-sm"
//                   rows={2}
//                 />
//                 <div className="grid grid-cols-2 gap-4">
//                   <select
//                     value={formData.purineLevel}
//                     onChange={(e) =>
//                       setFormData({ ...formData, purineLevel: e.target.value })
//                     }
//                     className="w-full p-3 border rounded-xl"
//                   >
//                     <option value="low">Low Purine</option>
//                     <option value="moderate">Moderate Purine</option>
//                     <option value="high">High Purine</option>
//                   </select>
//                   <input
//                     type="number"
//                     placeholder="Sodium (mg)"
//                     value={formData.sodiumMg}
//                     onChange={(e) =>
//                       setFormData({ ...formData, sodiumMg: e.target.value })
//                     }
//                     className="w-full p-3 border rounded-xl"
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-xl">
//                   <label className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={formData.containsGluten}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           containsGluten: e.target.checked,
//                         })
//                       }
//                       className="w-4 h-4"
//                     />{" "}
//                     Gluten
//                   </label>
//                   <label className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={formData.containsPeanuts}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           containsPeanuts: e.target.checked,
//                         })
//                       }
//                     />{" "}
//                     Peanuts
//                   </label>
//                   <label className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={formData.containsShellfish}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           containsShellfish: e.target.checked,
//                         })
//                       }
//                     />{" "}
//                     Shellfish
//                   </label>
//                   <label className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={formData.containsDairy}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           containsDairy: e.target.checked,
//                         })
//                       }
//                     />{" "}
//                     Dairy
//                   </label>
//                   <label className="flex items-center gap-2 text-sm col-span-2">
//                     <input
//                       type="checkbox"
//                       checked={formData.highSalt}
//                       onChange={(e) =>
//                         setFormData({ ...formData, highSalt: e.target.checked })
//                       }
//                     />{" "}
//                     High Salt Content
//                   </label>
//                 </div>
//                 <textarea
//                   placeholder="Reflux Triggers (comma separated)"
//                   value={formData.refluxTriggers}
//                   onChange={(e) =>
//                     setFormData({ ...formData, refluxTriggers: e.target.value })
//                   }
//                   className="w-full p-3 border rounded-xl"
//                   rows={2}
//                 />
//                 <textarea
//                   placeholder="Migraine Triggers (comma separated)"
//                   value={formData.migraineTriggers}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       migraineTriggers: e.target.value,
//                     })
//                   }
//                   className="w-full p-3 border rounded-xl"
//                   rows={2}
//                 />
//                 <button
//                   onClick={handleSubmit}
//                   disabled={loadingUpload}
//                   className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold text-lg hover:shadow-lg transition disabled:opacity-50"
//                 >
//                   {loadingUpload
//                     ? "Saving..."
//                     : editingItem
//                     ? "Update Item"
//                     : "Create Item"}
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       <FoodDetailsModal
//         item={viewDetailsItem}
//         onClose={() => setViewDetailsItem(null)}
//       />
//     </div>
//   );
// };

// // ====================== ORDERS TABLE ======================
// const OrdersTable = ({
//   orders,
//   onUpdateStatus,
//   onViewDetails,
//   onDeleteOrder,
// }) => {
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [deleteConfirmId, setDeleteConfirmId] = useState(null);

//   const getStatusConfig = (status) => {
//     const config = {
//       pending: {
//         color: "bg-yellow-100 text-yellow-700",
//         icon: <TimeIcon fontSize="small" />,
//       },
//       confirmed: {
//         color: "bg-blue-100 text-blue-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       preparing: {
//         color: "bg-purple-100 text-purple-700",
//         icon: <KitchenIcon fontSize="small" />,
//       },
//       ready: {
//         color: "bg-green-100 text-green-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       served: {
//         color: "bg-teal-100 text-teal-700",
//         icon: <RestaurantIcon fontSize="small" />,
//       },
//       completed: {
//         color: "bg-gray-100 text-gray-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       cancelled: {
//         color: "bg-red-100 text-red-700",
//         icon: <CancelIcon fontSize="small" />,
//       },
//     };
//     return config[status] || config.pending;
//   };

//   const filtered = orders.filter(
//     (o) =>
//       (o.orderId?.toLowerCase().includes(search.toLowerCase()) ||
//         o.personDetails?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         o.personDetails?.tableNumber?.toString().includes(search)) &&
//       (statusFilter === "all" || o.status === statusFilter)
//   );

//   // Calculate total revenue from filtered orders
//   const totalRevenue = filtered.reduce(
//     (sum, order) => sum + (order.orderSummary?.total || 0),
//     0
//   );

//   return (
//     <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//       <AnimatePresence>
//         {deleteConfirmId && (
//           <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               className="bg-white rounded-2xl max-w-md w-full p-6"
//             >
//               <div className="text-center">
//                 <DeleteSweepIcon className="text-red-500 text-5xl mb-4" />
//                 <h3 className="text-xl font-bold mb-2">Delete Order</h3>
//                 <p className="text-gray-500 mb-6">
//                   Are you sure you want to delete this order?
//                 </p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setDeleteConfirmId(null)}
//                     className="flex-1 px-4 py-2 border rounded-xl"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={async () => {
//                       await onDeleteOrder(deleteConfirmId);
//                       setDeleteConfirmId(null);
//                     }}
//                     className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       <div className="p-4 flex flex-col sm:flex-row gap-3 border-b bg-gray-50/50">
//         <div className="relative flex-1">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by Order ID, Customer, or Table..."
//             className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-orange-400"
//         >
//           <option value="all">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="preparing">Preparing</option>
//           <option value="ready">Ready</option>
//           <option value="served">Served</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//       </div>

//       {/* Summary Stats */}
//       <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 border-b">
//         <div className="flex justify-between items-center">
//           <span className="text-sm text-gray-600">
//             Showing {filtered.length} of {orders.length} orders
//           </span>
//           <span className="text-sm font-semibold text-orange-600">
//             Total Revenue: RWF {totalRevenue.toLocaleString()}
//           </span>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               {[
//                 "Order ID",
//                 "Table",
//                 "Customer",
//                 "Items",
//                 "Total",
//                 "Status",
//                 "Actions",
//               ].map((h) => (
//                 <th
//                   key={h}
//                   className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {filtered.map((order) => {
//               const statusConfig = getStatusConfig(order.status);
//               return (
//                 <tr
//                   key={order._id}
//                   className="hover:bg-orange-50/30 transition"
//                 >
//                   <td className="px-4 py-3 text-sm font-mono font-medium text-gray-700">
//                     {order.orderId?.slice(-8)}
//                   </td>
//                   <td className="px-4 py-3 text-sm">
//                     Table {order.personDetails?.tableNumber}
//                   </td>
//                   <td className="px-4 py-3 text-sm font-medium">
//                     <div>
//                       <div>{order.personDetails?.name || "Guest"}</div>
//                       <div className="text-xs text-gray-400">
//                         {order.personDetails?.orderType || "dine-in"}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-sm">
//                     <div>
//                       <div>
//                         {order.orderSummary?.totalItems ||
//                           order.items?.length ||
//                           0}{" "}
//                         items
//                       </div>
//                       <div className="text-xs text-gray-400">
//                         {order.items?.map((item) => item.name).join(", ")}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-sm font-bold text-orange-600">
//                     RWF {order.orderSummary?.total?.toLocaleString() || 0}
//                   </td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
//                     >
//                       {statusConfig.icon}
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => onViewDetails(order)}
//                         className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
//                       >
//                         <VisibilityIcon fontSize="small" />
//                       </button>
//                       <select
//                         value={order.status}
//                         onChange={(e) => onUpdateStatus(order, e.target.value)}
//                         className="text-xs border rounded-lg px-2 py-1 bg-white focus:ring-1 focus:ring-orange-400"
//                       >
//                         <option value="pending">pending</option>
//                         <option value="confirmed">confirmed</option>
//                         <option value="preparing">preparing</option>
//                         <option value="ready">ready</option>
//                         <option value="served">served</option>
//                         <option value="completed">completed</option>
//                         <option value="cancelled">cancelled</option>
//                       </select>
//                       <button
//                         onClick={() => setDeleteConfirmId(order._id)}
//                         className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {filtered.length === 0 && (
//         <div className="text-center py-12">
//           <OrdersIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//           <p className="text-gray-400">
//             No orders found matching your criteria.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// // ====================== ORDER DETAILS MODAL ======================
// const OrderDetailsModal = ({ order, onClose, onUpdateStatus }) => {
//   if (!order) return null;

//   const calculateSubtotal = () => {
//     return (
//       order.items?.reduce(
//         (sum, item) =>
//           sum +
//           (item.finalPrice || item.originalPrice || 0) * (item.quantity || 1),
//         0
//       ) || 0
//     );
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 p-5 rounded-t-3xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl">
//             Order #{order.orderId?.slice(-8)}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-white/20 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>
//         <div className="p-6 space-y-5">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-gray-50 p-3 rounded-xl">
//               <p className="text-xs text-gray-500">Customer</p>
//               <p className="font-semibold text-gray-800">
//                 {order.personDetails?.name || "Guest"}
//               </p>
//             </div>
//             <div className="bg-gray-50 p-3 rounded-xl">
//               <p className="text-xs text-gray-500">Table Number</p>
//               <p className="font-semibold text-gray-800">
//                 {order.personDetails?.tableNumber}
//               </p>
//             </div>
//             <div className="bg-gray-50 p-3 rounded-xl">
//               <p className="text-xs text-gray-500">Order Type</p>
//               <p className="font-semibold text-gray-800 capitalize">
//                 {order.personDetails?.orderType || "dine-in"}
//               </p>
//             </div>
//             <div className="bg-gray-50 p-3 rounded-xl">
//               <p className="text-xs text-gray-500">Created At</p>
//               <p className="font-semibold text-gray-800 text-sm">
//                 {new Date(order.createdAt).toLocaleString()}
//               </p>
//             </div>
//           </div>

//           {order.bookingDetails?.specialInstructions && (
//             <div className="bg-yellow-50 p-3 rounded-xl">
//               <p className="text-xs text-gray-500">Special Instructions</p>
//               <p className="text-sm text-gray-700">
//                 {order.bookingDetails.specialInstructions}
//               </p>
//             </div>
//           )}

//           {order.notes && (
//             <div className="bg-blue-50 p-3 rounded-xl">
//               <p className="text-xs text-gray-500">Notes</p>
//               <p className="text-sm text-gray-700">{order.notes}</p>
//             </div>
//           )}

//           <div>
//             <p className="text-xs text-gray-500 mb-2">Status</p>
//             <select
//               value={order.status}
//               onChange={(e) => onUpdateStatus(order, e.target.value)}
//               className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400"
//             >
//               {[
//                 "pending",
//                 "confirmed",
//                 "preparing",
//                 "ready",
//                 "served",
//                 "completed",
//                 "cancelled",
//               ].map((s) => (
//                 <option key={s} className="capitalize">
//                   {s}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="bg-orange-50 p-4 rounded-xl">
//             <p className="text-xs text-gray-500">Total Amount</p>
//             <p className="text-3xl font-bold text-orange-600">
//               RWF{" "}
//               {order.orderSummary?.total?.toLocaleString() ||
//                 calculateSubtotal().toLocaleString()}
//             </p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-500 mb-3">Order Items</p>
//             <div className="space-y-2">
//               {order.items?.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="flex flex-col p-3 bg-gray-50 rounded-xl"
//                 >
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-3">
//                       <span className="font-bold text-gray-600">
//                         {item.quantity}x
//                       </span>
//                       <span className="font-medium">{item.name}</span>
//                     </div>
//                     <span className="font-bold text-orange-600">
//                       RWF{" "}
//                       {(
//                         (item.finalPrice || item.originalPrice || 0) *
//                         (item.quantity || 1)
//                       ).toLocaleString()}
//                     </span>
//                   </div>
//                   {item.customizations && item.customizations.length > 0 && (
//                     <div className="mt-2 text-xs text-gray-500">
//                       Customizations: {item.customizations.join(", ")}
//                     </div>
//                   )}
//                   {item.specialInstructions && (
//                     <div className="mt-1 text-xs text-gray-500">
//                       Instructions: {item.specialInstructions}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {order.bookingDetails?.statusHistory &&
//             order.bookingDetails.statusHistory.length > 0 && (
//               <div>
//                 <p className="text-xs text-gray-500 mb-2">Status History</p>
//                 <div className="space-y-1">
//                   {order.bookingDetails.statusHistory.map((history, idx) => (
//                     <div key={idx} className="text-xs text-gray-600">
//                       <span className="font-medium">{history.status}</span> -{" "}
//                       {new Date(history.timestamp).toLocaleString()}
//                       {history.note && (
//                         <span className="text-gray-400 ml-2">
//                           ({history.note})
//                         </span>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ====================== NAV BUTTON ======================
// const NavButton = ({ active, onClick, icon, label }) => (
//   <button
//     onClick={onClick}
//     className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
//       active
//         ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
//         : "text-gray-600 hover:bg-gray-100"
//     }`}
//   >
//     {icon}
//     <span className="hidden sm:inline">{label}</span>
//   </button>
// );

// // ====================== MAIN DASHBOARD ======================
// export const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [orders, setOrders] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dailyAnalytics, setDailyAnalytics] = useState(null);
//   const [weeklyAnalytics, setWeeklyAnalytics] = useState(null);
//   const [analyticsLoading, setAnalyticsLoading] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     totalRevenue: 0,
//     activeOrders: 0,
//     pendingOrders: 0,
//   });

//   const fetchOrders = useCallback(async () => {
//     try {
//       const res = await axiosInstance.get("/orders");
//       // Handle the actual API response structure
//       let ordersData = [];
//       if (res.data?.data && Array.isArray(res.data.data)) {
//         ordersData = res.data.data;
//       } else if (Array.isArray(res.data)) {
//         ordersData = res.data;
//       } else if (res.data?.orders && Array.isArray(res.data.orders)) {
//         ordersData = res.data.orders;
//       }

//       const transformed = ordersData.map((o) => ({
//         ...o,
//         orderSummary: o.orderSummary || {
//           total:
//             o.items?.reduce(
//               (sum, item) =>
//                 sum +
//                 (item.finalPrice || item.originalPrice || 0) *
//                   (item.quantity || 1),
//               0
//             ) || 0,
//           totalItems: o.items?.length || 0,
//         },
//         status: o.status || "pending",
//       }));

//       setOrders(transformed);
//       setStats({
//         totalOrders: transformed.length,
//         totalRevenue: transformed.reduce(
//           (s, o) => s + (o.orderSummary?.total || 0),
//           0
//         ),
//         activeOrders: transformed.filter(
//           (o) => !["completed", "cancelled"].includes(o.status)
//         ).length,
//         pendingOrders: transformed.filter((o) => o.status === "pending").length,
//       });
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       toast.error("Failed to fetch orders");
//     }
//   }, []);

//   const fetchFoods = useCallback(async () => {
//     try {
//       const res = await axiosInstance.get("/foods");
//       let foodsData = [];
//       if (res.data?.success && res.data.foods) {
//         foodsData = res.data.foods;
//       } else if (Array.isArray(res.data)) {
//         foodsData = res.data;
//       } else if (res.data?.data && Array.isArray(res.data.data)) {
//         foodsData = res.data.data;
//       }
//       setMenuItems(foodsData);
//     } catch (err) {
//       console.error("Error fetching foods:", err);
//       toast.error("Failed to fetch menu");
//     }
//   }, []);

//   const fetchAnalytics = async () => {
//     setAnalyticsLoading(true);
//     try {
//       const [daily, weekly] = await Promise.all([
//         axiosInstance.get("/orders/analytics/daily"),
//         axiosInstance.get("/orders/analytics/weekly"),
//       ]);
//       if (daily.data?.success) setDailyAnalytics(daily.data);
//       if (weekly.data?.success) setWeeklyAnalytics(weekly.data);
//     } catch (e) {
//       console.error("Error fetching analytics:", e);
//     } finally {
//       setAnalyticsLoading(false);
//     }
//   };

//   const handleAddFood = async (formData) => {
//     try {
//       const response = await axiosInstance.post("/foods", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       if (response.data?.success) {
//         await fetchFoods();
//         toast.success("Food created successfully!");
//       } else {
//         toast.error(response.data?.message || "Creation failed");
//       }
//     } catch (err) {
//       console.error("Error creating food:", err);
//       toast.error(err.response?.data?.message || "Creation failed");
//     }
//   };

//   const handleEditFood = async (id, formData) => {
//     try {
//       const response = await axiosInstance.put(`/foods/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       if (response.data?.success) {
//         await fetchFoods();
//         toast.success("Food updated successfully!");
//       } else {
//         toast.error(response.data?.message || "Update failed");
//       }
//     } catch (err) {
//       console.error("Error updating food:", err);
//       toast.error(err.response?.data?.message || "Update failed");
//     }
//   };

//   const handleDeleteFood = async (id) => {
//     try {
//       const response = await axiosInstance.delete(`/foods/${id}`);
//       if (response.data?.success) {
//         await fetchFoods();
//         toast.success("Food deleted successfully!");
//       } else {
//         toast.error(response.data?.message || "Delete failed");
//       }
//     } catch (err) {
//       console.error("Error deleting food:", err);
//       toast.error(err.response?.data?.message || "Delete failed");
//     }
//   };

//   const updateOrderStatus = async (order, newStatus) => {
//     try {
//       const response = await axiosInstance.patch(
//         `/orders/${order.orderId}/status`,
//         {
//           status: newStatus,
//         }
//       );
//       if (response.data?.success) {
//         await fetchOrders();
//         toast.success(`Status updated to ${newStatus}!`);
//       } else {
//         toast.error(response.data?.message || "Update failed");
//       }
//     } catch (e) {
//       console.error("Error updating order status:", e);
//       toast.error("Update failed");
//     }
//   };

//   const deleteOrder = async (orderId) => {
//     try {
//       const response = await axiosInstance.delete(`/orders/${orderId}`);
//       if (response.data?.success) {
//         await fetchOrders();
//         toast.success("Order deleted successfully!");
//       } else {
//         toast.error(response.data?.message || "Delete failed");
//       }
//     } catch (e) {
//       console.error("Error deleting order:", e);
//       toast.error("Delete failed");
//     }
//   };

//   const refreshAll = async () => {
//     setLoading(true);
//     await Promise.all([fetchOrders(), fetchFoods(), fetchAnalytics()]);
//     setLoading(false);
//     toast.success("Data refreshed!");
//   };

//   const handleLogout = async () => {
//     try {
//       /* ================= API LOGOUT ================= */

//       const token = localStorage.getItem("auth_token");

//       await axios.post(
//         "https://nutriscan-foodanddrinksupply.onrender.com/auth/logout",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       /* ================= CLEAR STORAGE ================= */

//       localStorage.removeItem("auth_token");
//       localStorage.removeItem("user_data");

//       sessionStorage.clear();

//       toast.success("Logged out successfully");

//       /* ================= REDIRECT ================= */

//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 1500);
//     } catch (error) {
//       console.error("LOGOUT ERROR:", error.response?.data || error.message);

//       /* ================= FORCE LOGOUT ================= */

//       localStorage.removeItem("auth_token");
//       localStorage.removeItem("user_data");

//       sessionStorage.clear();

//       toast.error("Session ended");

//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 1500);
//     }
//   };

//   useEffect(() => {
//     refreshAll();
//   }, []);

//   if (loading)
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-orange-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/20">
//       <ToastContainer position="top-right" />
//       <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-3">
//         <div className="flex items-center gap-3">
//           <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2.5 rounded-2xl shadow-lg">
//             <RestaurantIcon className="text-white" />
//           </div>
//           <div>
//             <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
//               NutriScan·AI
//             </h1>
//             <p className="text-xs text-gray-500">
//               Restaurant Intelligence Dashboard
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={refreshAll}
//             className="p-2 hover:bg-gray-100 rounded-full transition"
//             title="Refresh Data"
//           >
//             <RefreshIcon />
//           </button>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition shadow-md"
//           >
//             <LogoutIcon fontSize="small" />
//             <span className="hidden sm:inline">Logout</span>
//           </button>
//         </div>
//       </header>

//       <div className="px-4 sm:px-6 pt-4 sticky top-[73px] z-10 bg-transparent">
//         <div className="flex gap-1 bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-sm overflow-x-auto">
//           <NavButton
//             active={activeTab === "overview"}
//             onClick={() => setActiveTab("overview")}
//             icon={<DashboardIcon />}
//             label="Overview"
//           />
//           <NavButton
//             active={activeTab === "orders"}
//             onClick={() => setActiveTab("orders")}
//             icon={<OrdersIcon />}
//             label="Orders"
//           />
//           <NavButton
//             active={activeTab === "menu"}
//             onClick={() => setActiveTab("menu")}
//             icon={<MenuIcon />}
//             label="Menu"
//           />
//           <NavButton
//             active={activeTab === "analytics"}
//             onClick={() => setActiveTab("analytics")}
//             icon={<AnalyticsIcon />}
//             label="Analytics"
//           />
//         </div>
//       </div>

//       <div className="p-4 sm:p-6">
//         {activeTab === "overview" && (
//           <>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-6">
//               <StatCard
//                 title="Total Orders"
//                 value={stats.totalOrders}
//                 icon={<OrdersIcon />}
//                 color="border-blue-500"
//               />
//               <StatCard
//                 title="Revenue"
//                 value={`RWF ${stats.totalRevenue.toLocaleString()}`}
//                 icon={<MoneyIcon />}
//                 color="border-green-500"
//               />
//               <StatCard
//                 title="Active Orders"
//                 value={stats.activeOrders}
//                 icon={<KitchenIcon />}
//                 color="border-purple-500"
//               />
//               <StatCard
//                 title="Pending"
//                 value={stats.pendingOrders}
//                 icon={<TimeIcon />}
//                 color="border-yellow-500"
//               />
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//               <DailyAnalyticsCard
//                 analytics={dailyAnalytics}
//                 loading={analyticsLoading}
//               />
//               <WeeklyAnalyticsCard
//                 analytics={weeklyAnalytics}
//                 loading={analyticsLoading}
//               />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <OrdersIcon className="text-orange-500" /> Recent Orders
//               </h2>
//               <OrdersTable
//                 orders={orders.slice(0, 5)}
//                 onUpdateStatus={updateOrderStatus}
//                 onViewDetails={setSelectedOrder}
//                 onDeleteOrder={deleteOrder}
//               />
//             </div>
//           </>
//         )}
//         {activeTab === "orders" && (
//           <OrdersTable
//             orders={orders}
//             onUpdateStatus={updateOrderStatus}
//             onViewDetails={setSelectedOrder}
//             onDeleteOrder={deleteOrder}
//           />
//         )}
//         {activeTab === "menu" && (
//           <MenuManagement
//             menuItems={menuItems}
//             onAddItem={handleAddFood}
//             onEditItem={handleEditFood}
//             onDeleteItem={handleDeleteFood}
//             onRefresh={fetchFoods}
//           />
//         )}
//         {activeTab === "analytics" && (
//           <div className="space-y-6">
//             <DailyAnalyticsCard
//               analytics={dailyAnalytics}
//               loading={analyticsLoading}
//             />
//             <WeeklyAnalyticsCard
//               analytics={weeklyAnalytics}
//               loading={analyticsLoading}
//             />
//           </div>
//         )}
//       </div>
//       {selectedOrder && (
//         <OrderDetailsModal
//           order={selectedOrder}
//           onClose={() => setSelectedOrder(null)}
//           onUpdateStatus={updateOrderStatus}
//         />
//       )}
//     </div>
//   );
// };

// import React, { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Icons
// import {
//   Dashboard as DashboardIcon,
//   RestaurantMenu as MenuIcon,
//   ShoppingCart as OrdersIcon,
//   Analytics as AnalyticsIcon,
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Close as CloseIcon,
//   CloudUpload as CloudUploadIcon,
//   Search as SearchIcon,
//   Refresh as RefreshIcon,
//   AttachMoney as MoneyIcon,
//   AccessTime as TimeIcon,
//   Person as PersonIcon,
//   Restaurant as RestaurantIcon,
//   Visibility as VisibilityIcon,
//   ListAlt as ListAltIcon,
//   Healing as HealingIcon,
//   Warning as WarningIcon,
//   Today as TodayIcon,
//   DateRange as DateRangeIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   Kitchen as KitchenIcon,
//   ArrowUpward as ArrowUpIcon,
//   ArrowDownward as ArrowDownIcon,
//   LocalOffer as LocalOfferIcon,
//   DeleteSweep as DeleteSweepIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";

// // ====================== API CONFIG ======================
// const API_BASE = "https://nutriscan-foodanddrinksupply.onrender.com";
// const axiosInstance = axios.create({ baseURL: API_BASE, timeout: 30000 });

// // ====================== AUTH CONTEXT ======================
// const AuthContext = React.createContext(null);

// // Mock authentication - replace with your actual auth logic
// const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     return localStorage.getItem("auth_token") !== null;
//   });

//   const login = (token) => {
//     localStorage.setItem("auth_token", token);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("auth_token");
//     setIsAuthenticated(false);
//     toast.info("Logged out successfully");
//     window.location.href = "/login";
//   };

//   return { isAuthenticated, login, logout };
// };

// // ====================== STAT CARD ======================
// const StatCard = ({ title, value, icon, color, trend, trendValue }) => (
//   <motion.div
//     whileHover={{ y: -5, scale: 1.02 }}
//     transition={{ duration: 0.2 }}
//     className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-4 sm:p-5 border-t-4 ${color} hover:shadow-xl transition-all duration-300`}
//   >
//     <div className="flex justify-between items-start">
//       <div className="flex-1">
//         <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide">
//           {title}
//         </p>
//         <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mt-2 break-words">
//           {value}
//         </p>
//         {trend && (
//           <div className="flex items-center gap-1 mt-2">
//             {trend === "up" ? (
//               <ArrowUpIcon className="text-green-500 text-sm" />
//             ) : (
//               <ArrowDownIcon className="text-red-500 text-sm" />
//             )}
//             <span
//               className={`text-xs font-medium ${
//                 trend === "up" ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {trendValue}
//             </span>
//           </div>
//         )}
//       </div>
//       <div
//         className={`p-3 rounded-2xl bg-gradient-to-br ${color
//           .replace("border-", "from-")
//           .replace("-500", "-100")} to-white shadow-inner`}
//       >
//         {icon}
//       </div>
//     </div>
//   </motion.div>
// );

// // ====================== FOOD DETAILS MODAL ======================
// const FoodDetailsModal = ({ item, onClose }) => {
//   if (!item) return null;
//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 20 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 20 }}
//         className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="relative">
//           {item.image ? (
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-48 sm:h-64 object-cover rounded-t-3xl"
//             />
//           ) : (
//             <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-3xl flex items-center justify-center">
//               <RestaurantIcon className="text-gray-400 text-6xl" />
//             </div>
//           )}
//           <div className="absolute top-4 right-4">
//             <button
//               onClick={onClose}
//               className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition"
//             >
//               <CloseIcon className="text-white" />
//             </button>
//           </div>
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
//             <h2 className="text-white text-2xl sm:text-3xl font-bold">
//               {item.name}
//             </h2>
//             <p className="text-white/90 text-sm mt-1">{item.category}</p>
//           </div>
//         </div>

//         <div className="p-5 sm:p-6 space-y-5">
//           <div className="flex justify-between items-center pb-3 border-b">
//             <div>
//               <p className="text-xs text-gray-500">Price</p>
//               <p className="text-2xl font-bold text-orange-600">
//                 RWF {item.price?.toLocaleString()}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Prep Time</p>
//               <p className="text-lg font-semibold flex items-center gap-1">
//                 <TimeIcon fontSize="small" className="text-gray-400" />{" "}
//                 {item.prepTime} min
//               </p>
//             </div>
//             <div>
//               <span
//                 className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   item.purineLevel === "low"
//                     ? "bg-green-100 text-green-700"
//                     : item.purineLevel === "moderate"
//                     ? "bg-yellow-100 text-yellow-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {item.purineLevel?.toUpperCase()} Purine
//               </span>
//             </div>
//           </div>

//           {item.description && (
//             <div>
//               <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                 📖 Description
//               </h3>
//               <p className="text-sm text-gray-600 leading-relaxed">
//                 {item.description}
//               </p>
//             </div>
//           )}

//           <div>
//             <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               <ListAltIcon className="text-emerald-600" /> Ingredients
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {item.ingredients?.map((ing, idx) => (
//                 <span
//                   key={idx}
//                   className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium"
//                 >
//                   {ing}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//               <HealingIcon className="text-blue-500" /> Dietary Information
//             </h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.containsGluten ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.containsGluten ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   Gluten: {item.containsGluten ? "Contains" : "Free"}
//                 </span>
//               </div>
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.containsPeanuts ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.containsPeanuts ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   Peanuts: {item.containsPeanuts ? "Contains" : "Free"}
//                 </span>
//               </div>
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.containsShellfish ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.containsShellfish ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   Shellfish: {item.containsShellfish ? "Contains" : "Free"}
//                 </span>
//               </div>
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.containsDairy ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.containsDairy ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   Dairy: {item.containsDairy ? "Contains" : "Free"}
//                 </span>
//               </div>
//               <div
//                 className={`flex items-center gap-2 p-2 rounded-lg ${
//                   item.highSalt ? "bg-red-50" : "bg-green-50"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.highSalt ? "bg-red-500" : "bg-green-500"
//                   }`}
//                 ></span>
//                 <span className="text-sm">
//                   High Salt: {item.highSalt ? "Yes" : "No"}
//                 </span>
//               </div>
//               {item.sodiumMg && (
//                 <div className="bg-blue-50 p-2 rounded-lg">
//                   <span className="text-sm">Sodium: {item.sodiumMg}mg</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {(item.refluxTriggers?.length > 0 ||
//             item.migraineTriggers?.length > 0) && (
//             <div>
//               <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                 <WarningIcon className="text-orange-500" /> Health Triggers
//               </h3>
//               {item.refluxTriggers?.length > 0 && (
//                 <div className="mb-2">
//                   <p className="text-xs text-gray-500 mb-1">Reflux Triggers:</p>
//                   <div className="flex flex-wrap gap-1">
//                     {item.refluxTriggers.map((t, i) => (
//                       <span
//                         key={i}
//                         className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full"
//                       >
//                         {t}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {item.migraineTriggers?.length > 0 && (
//                 <div>
//                   <p className="text-xs text-gray-500 mb-1">
//                     Migraine Triggers:
//                   </p>
//                   <div className="flex flex-wrap gap-1">
//                     {item.migraineTriggers.map((t, i) => (
//                       <span
//                         key={i}
//                         className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
//                       >
//                         {t}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ====================== DAILY ANALYTICS CARD ======================
// const DailyAnalyticsCard = ({ analytics, loading }) => {
//   if (loading)
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
//         <div className="h-32 bg-gray-200 rounded"></div>
//       </div>
//     );
//   if (!analytics)
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-400">
//         No data available
//       </div>
//     );
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-gradient-to-br from-white to-orange-50/30 rounded-2xl shadow-lg p-5 sm:p-6"
//     >
//       <div className="flex items-center gap-2 mb-5">
//         <div className="p-2 bg-orange-100 rounded-xl">
//           <TodayIcon className="text-orange-600" />
//         </div>
//         <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//           Daily Analytics
//         </h2>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//         <div className="space-y-4">
//           <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl text-white">
//             <p className="text-sm opacity-90">Total Orders Today</p>
//             <p className="text-3xl font-bold">{analytics.totalOrders || 0}</p>
//           </div>
//           <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-xl text-white">
//             <p className="text-sm opacity-90">Total Income Today</p>
//             <p className="text-2xl font-bold">
//               RWF {(analytics.totalIncome || 0).toLocaleString()}
//             </p>
//           </div>
//         </div>
//         <div>
//           <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//             <LocalOfferIcon fontSize="small" /> Top Selling Items
//           </p>
//           <div className="space-y-2">
//             {analytics.topPlates?.slice(0, 5).map((plate, idx) => (
//               <div
//                 key={idx}
//                 className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
//               >
//                 <span className="text-sm font-medium text-gray-700">
//                   {plate.name}
//                 </span>
//                 <span className="text-sm font-bold text-orange-600">
//                   {plate.quantity} sold
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ====================== WEEKLY ANALYTICS ======================
// const WeeklyAnalyticsCard = ({ analytics, loading }) => {
//   if (loading)
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
//         <div className="h-64 bg-gray-200 rounded"></div>
//       </div>
//     );
//   if (!analytics?.data?.length)
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-400">
//         No weekly data
//       </div>
//     );
//   const totalOrders = analytics.data.reduce((sum, d) => sum + d.orders, 0);
//   const maxOrders = Math.max(...analytics.data.map((d) => d.orders));
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg p-5 sm:p-6"
//     >
//       <div className="flex items-center gap-2 mb-5">
//         <div className="p-2 bg-blue-100 rounded-xl">
//           <DateRangeIcon className="text-blue-600" />
//         </div>
//         <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//           Weekly Overview
//         </h2>
//       </div>
//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <div className="bg-green-100 p-3 rounded-xl text-center">
//           <p className="text-xs text-gray-600">Total Orders</p>
//           <p className="text-2xl font-bold text-green-700">{totalOrders}</p>
//         </div>
//       </div>
//       <div className="space-y-3">
//         {analytics.data.map((day, idx) => (
//           <div key={idx} className="flex items-center gap-3">
//             <span className="text-sm font-semibold w-12 text-gray-700">
//               {day.day.substring(0, 3)}
//             </span>
//             <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${(day.orders / maxOrders) * 100}%` }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
//               ></motion.div>
//             </div>
//             <span className="text-sm font-bold text-gray-700 w-16 text-right">
//               {day.orders}
//             </span>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// // ====================== MENU MANAGEMENT ======================
// const MenuManagement = ({
//   menuItems,
//   onAddItem,
//   onEditItem,
//   onDeleteItem,
//   onRefresh,
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [loadingUpload, setLoadingUpload] = useState(false);
//   const [viewDetailsItem, setViewDetailsItem] = useState(null);
//   const [deleteConfirmId, setDeleteConfirmId] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const [imageFile, setImageFile] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     ingredients: "",
//     description: "",
//     prepTime: "",
//     category: "Mains",
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: "",
//     migraineTriggers: "",
//     highSalt: false,
//     sodiumMg: "",
//     nutritionalInfo: "",
//   });

//   const categories = [
//     "Mains",
//     "Appetizers",
//     "Seafood",
//     "Vegan",
//     "Desserts",
//     "Beverages",
//     "Soups",
//     "Salads",
//   ];

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formData.name || !formData.price) {
//       toast.error("Please fill in name and price");
//       return;
//     }
//     setLoadingUpload(true);
//     try {
//       const submitData = new FormData();
//       submitData.append("name", formData.name);
//       submitData.append("price", formData.price);
//       submitData.append(
//         "ingredients",
//         JSON.stringify(
//           formData.ingredients
//             .split(",")
//             .map((i) => i.trim())
//             .filter((i) => i)
//         )
//       );
//       submitData.append("description", formData.description);
//       submitData.append("prepTime", formData.prepTime || "15");
//       submitData.append("category", formData.category);
//       submitData.append("purineLevel", formData.purineLevel);
//       submitData.append("containsGluten", String(formData.containsGluten));
//       submitData.append("containsPeanuts", String(formData.containsPeanuts));
//       submitData.append(
//         "containsShellfish",
//         String(formData.containsShellfish)
//       );
//       submitData.append("containsDairy", String(formData.containsDairy));
//       submitData.append("highSalt", String(formData.highSalt));
//       submitData.append(
//         "refluxTriggers",
//         JSON.stringify(
//           formData.refluxTriggers
//             .split(",")
//             .map((s) => s.trim())
//             .filter((s) => s)
//         )
//       );
//       submitData.append(
//         "migraineTriggers",
//         JSON.stringify(
//           formData.migraineTriggers
//             .split(",")
//             .map((s) => s.trim())
//             .filter((s) => s)
//         )
//       );
//       if (formData.sodiumMg) submitData.append("sodiumMg", formData.sodiumMg);
//       if (formData.nutritionalInfo)
//         submitData.append("nutritionalInfo", formData.nutritionalInfo);
//       if (imageFile) submitData.append("image", imageFile);

//       if (editingItem) {
//         await onEditItem(editingItem._id, submitData);
//         toast.success("Item updated successfully!");
//       } else {
//         await onAddItem(submitData);
//         toast.success("Item created successfully!");
//       }
//       setShowModal(false);
//       resetForm();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Operation failed");
//     } finally {
//       setLoadingUpload(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       price: "",
//       ingredients: "",
//       description: "",
//       prepTime: "",
//       category: "Mains",
//       purineLevel: "low",
//       containsGluten: false,
//       containsPeanuts: false,
//       containsShellfish: false,
//       containsDairy: false,
//       refluxTriggers: "",
//       migraineTriggers: "",
//       highSalt: false,
//       sodiumMg: "",
//       nutritionalInfo: "",
//     });
//     setImageFile(null);
//     setImagePreview("");
//     setEditingItem(null);
//   };

//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setFormData({
//       name: item.name,
//       price: item.price.toString(),
//       ingredients: item.ingredients?.join(", ") || "",
//       description: item.description || "",
//       prepTime: item.prepTime?.toString() || "",
//       category: item.category || "Mains",
//       purineLevel: item.purineLevel,
//       containsGluten: item.containsGluten,
//       containsPeanuts: item.containsPeanuts,
//       containsShellfish: item.containsShellfish,
//       containsDairy: item.containsDairy,
//       refluxTriggers: item.refluxTriggers?.join(", ") || "",
//       migraineTriggers: item.migraineTriggers?.join(", ") || "",
//       highSalt: item.highSalt,
//       sodiumMg: item.sodiumMg?.toString() || "",
//       nutritionalInfo: item.nutritionalInfo
//         ? JSON.stringify(item.nutritionalInfo)
//         : "",
//     });
//     setImagePreview(item.image || "");
//     setShowModal(true);
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {deleteConfirmId && (
//           <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               className="bg-white rounded-2xl max-w-md w-full p-6"
//             >
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <DeleteIcon className="text-red-600 text-3xl" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">
//                   Delete Item
//                 </h3>
//                 <p className="text-gray-500 mb-6">
//                   Are you sure you want to delete this item? This action cannot
//                   be undone.
//                 </p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setDeleteConfirmId(null)}
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={async () => {
//                       await onDeleteItem(deleteConfirmId);
//                       setDeleteConfirmId(null);
//                     }}
//                     className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             <MenuIcon className="text-orange-500" /> Menu Management
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Manage your restaurant's food items
//           </p>
//         </div>
//         <div className="flex gap-2 w-full sm:w-auto">
//           <button
//             onClick={onRefresh}
//             className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition flex-1 sm:flex-none"
//           >
//             <RefreshIcon fontSize="small" /> Sync
//           </button>
//           <button
//             onClick={() => {
//               resetForm();
//               setShowModal(true);
//             }}
//             className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-xl hover:shadow-lg transition flex-1 sm:flex-none"
//           >
//             <AddIcon fontSize="small" /> Add Item
//           </button>
//         </div>
//       </div>

//       {/* Menu Grid */}
//       {menuItems.length === 0 ? (
//         <div className="text-center py-12">
//           <MenuIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//           <p className="text-gray-400">
//             No menu items found. Click "Add Item" to create your first menu
//             item.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//           {menuItems.map((item) => (
//             <motion.div
//               key={item._id}
//               whileHover={{ y: -5 }}
//               className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
//             >
//               <div className="relative h-48 overflow-hidden">
//                 {item.image ? (
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
//                     <RestaurantIcon className="text-gray-400 text-5xl" />
//                   </div>
//                 )}
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-3">
//                   <button
//                     onClick={() => handleEdit(item)}
//                     className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
//                   >
//                     <EditIcon fontSize="small" />
//                   </button>
//                   <button
//                     onClick={() => setViewDetailsItem(item)}
//                     className="p-2 bg-emerald-500 rounded-full text-white hover:bg-emerald-600 transition"
//                   >
//                     <VisibilityIcon fontSize="small" />
//                   </button>
//                   <button
//                     onClick={() => setDeleteConfirmId(item._id)}
//                     className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </button>
//                 </div>
//                 <div className="absolute top-3 right-3">
//                   <span
//                     className={`px-2 py-1 rounded-lg text-xs font-medium ${
//                       item.purineLevel === "low"
//                         ? "bg-green-500"
//                         : item.purineLevel === "moderate"
//                         ? "bg-yellow-500"
//                         : "bg-red-500"
//                     } text-white shadow-lg`}
//                   >
//                     {item.purineLevel}
//                   </span>
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
//                   {item.name}
//                 </h3>
//                 <p className="text-xs text-gray-500 line-clamp-2 mb-2">
//                   {item.description}
//                 </p>
//                 <div className="flex flex-wrap gap-1 mb-3">
//                   {item.ingredients?.slice(0, 3).map((ing, i) => (
//                     <span
//                       key={i}
//                       className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600"
//                     >
//                       {ing}
//                     </span>
//                   ))}
//                   {item.ingredients?.length > 3 && (
//                     <span className="text-xs text-gray-400">
//                       +{item.ingredients.length - 3}
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-orange-600 font-bold text-xl">
//                     RWF {item.price?.toLocaleString()}
//                   </span>
//                   <span className="text-gray-400 text-xs flex items-center gap-1">
//                     <TimeIcon fontSize="small" /> {item.prepTime} min
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* Create/Edit Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <div
//             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//             onClick={() => setShowModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-5 rounded-t-3xl flex justify-between items-center">
//                 <h2 className="text-white font-bold text-xl">
//                   {editingItem ? "Edit Menu Item" : "Create New Menu Item"}
//                 </h2>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="p-1 hover:bg-white/20 rounded-full transition"
//                 >
//                   <CloseIcon className="text-white" />
//                 </button>
//               </div>
//               <div className="p-5 sm:p-6 space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     placeholder="Item Name *"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Price (RWF) *"
//                     value={formData.price}
//                     onChange={(e) =>
//                       setFormData({ ...formData, price: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   />
//                 </div>
//                 <textarea
//                   placeholder="Ingredients (comma separated)"
//                   value={formData.ingredients}
//                   onChange={(e) =>
//                     setFormData({ ...formData, ingredients: e.target.value })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   rows={2}
//                 />
//                 <textarea
//                   placeholder="Description"
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   rows={2}
//                 />
//                 <div className="grid grid-cols-2 gap-4">
//                   <input
//                     type="number"
//                     placeholder="Prep time (minutes)"
//                     value={formData.prepTime}
//                     onChange={(e) =>
//                       setFormData({ ...formData, prepTime: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl"
//                   />
//                   <select
//                     value={formData.category}
//                     onChange={(e) =>
//                       setFormData({ ...formData, category: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl bg-white"
//                   >
//                     {categories.map((c) => (
//                       <option key={c}>{c}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-orange-400 transition">
//                   <label className="flex flex-col items-center gap-2 cursor-pointer">
//                     <CloudUploadIcon className="text-gray-400 text-4xl" />
//                     <span className="text-sm text-gray-500">
//                       Click to upload image
//                     </span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="hidden"
//                     />
//                   </label>
//                   {imagePreview && (
//                     <img
//                       src={imagePreview}
//                       alt="preview"
//                       className="mt-3 h-32 w-32 object-cover rounded-xl mx-auto shadow-md"
//                     />
//                   )}
//                 </div>
//                 <textarea
//                   placeholder='Nutritional Info (JSON) e.g. {"calories": 450, "protein": "25g"}'
//                   value={formData.nutritionalInfo}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       nutritionalInfo: e.target.value,
//                     })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl font-mono text-sm"
//                   rows={2}
//                 />
//                 <div className="grid grid-cols-2 gap-4">
//                   <select
//                     value={formData.purineLevel}
//                     onChange={(e) =>
//                       setFormData({ ...formData, purineLevel: e.target.value })
//                     }
//                     className="w-full p-3 border rounded-xl"
//                   >
//                     <option value="low">Low Purine</option>
//                     <option value="moderate">Moderate Purine</option>
//                     <option value="high">High Purine</option>
//                   </select>
//                   <input
//                     type="number"
//                     placeholder="Sodium (mg)"
//                     value={formData.sodiumMg}
//                     onChange={(e) =>
//                       setFormData({ ...formData, sodiumMg: e.target.value })
//                     }
//                     className="w-full p-3 border rounded-xl"
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-xl">
//                   <label className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={formData.containsGluten}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           containsGluten: e.target.checked,
//                         })
//                       }
//                       className="w-4 h-4"
//                     />{" "}
//                     Gluten
//                   </label>
//                   <label className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={formData.containsPeanuts}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           containsPeanuts: e.target.checked,
//                         })
//                       }
//                     />{" "}
//                     Peanuts
//                   </label>
//                   <label className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={formData.containsShellfish}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           containsShellfish: e.target.checked,
//                         })
//                       }
//                     />{" "}
//                     Shellfish
//                   </label>
//                   <label className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={formData.containsDairy}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           containsDairy: e.target.checked,
//                         })
//                       }
//                     />{" "}
//                     Dairy
//                   </label>
//                   <label className="flex items-center gap-2 text-sm col-span-2">
//                     <input
//                       type="checkbox"
//                       checked={formData.highSalt}
//                       onChange={(e) =>
//                         setFormData({ ...formData, highSalt: e.target.checked })
//                       }
//                     />{" "}
//                     High Salt Content
//                   </label>
//                 </div>
//                 <textarea
//                   placeholder="Reflux Triggers (comma separated)"
//                   value={formData.refluxTriggers}
//                   onChange={(e) =>
//                     setFormData({ ...formData, refluxTriggers: e.target.value })
//                   }
//                   className="w-full p-3 border rounded-xl"
//                   rows={2}
//                 />
//                 <textarea
//                   placeholder="Migraine Triggers (comma separated)"
//                   value={formData.migraineTriggers}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       migraineTriggers: e.target.value,
//                     })
//                   }
//                   className="w-full p-3 border rounded-xl"
//                   rows={2}
//                 />
//                 <button
//                   onClick={handleSubmit}
//                   disabled={loadingUpload}
//                   className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold text-lg hover:shadow-lg transition disabled:opacity-50"
//                 >
//                   {loadingUpload
//                     ? "Saving..."
//                     : editingItem
//                     ? "Update Item"
//                     : "Create Item"}
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       <FoodDetailsModal
//         item={viewDetailsItem}
//         onClose={() => setViewDetailsItem(null)}
//       />
//     </div>
//   );
// };

// // ====================== ORDERS TABLE ======================
// const OrdersTable = ({
//   orders,
//   onUpdateStatus,
//   onViewDetails,
//   onDeleteOrder,
// }) => {
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [deleteConfirmId, setDeleteConfirmId] = useState(null);

//   const getStatusConfig = (status) => {
//     const config = {
//       pending: {
//         color: "bg-yellow-100 text-yellow-700",
//         icon: <TimeIcon fontSize="small" />,
//       },
//       confirmed: {
//         color: "bg-blue-100 text-blue-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       preparing: {
//         color: "bg-purple-100 text-purple-700",
//         icon: <KitchenIcon fontSize="small" />,
//       },
//       ready: {
//         color: "bg-green-100 text-green-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       served: {
//         color: "bg-teal-100 text-teal-700",
//         icon: <RestaurantIcon fontSize="small" />,
//       },
//       completed: {
//         color: "bg-gray-100 text-gray-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       cancelled: {
//         color: "bg-red-100 text-red-700",
//         icon: <CancelIcon fontSize="small" />,
//       },
//     };
//     return config[status] || config.pending;
//   };

//   const filtered = orders.filter(
//     (o) =>
//       (o.orderId?.toLowerCase().includes(search.toLowerCase()) ||
//         o.personDetails?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         o.personDetails?.tableNumber?.toString().includes(search)) &&
//       (statusFilter === "all" || o.status === statusFilter)
//   );

//   // Calculate total revenue from filtered orders
//   const totalRevenue = filtered.reduce(
//     (sum, order) => sum + (order.orderSummary?.total || 0),
//     0
//   );

//   return (
//     <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//       <AnimatePresence>
//         {deleteConfirmId && (
//           <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               className="bg-white rounded-2xl max-w-md w-full p-6"
//             >
//               <div className="text-center">
//                 <DeleteSweepIcon className="text-red-500 text-5xl mb-4" />
//                 <h3 className="text-xl font-bold mb-2">Delete Order</h3>
//                 <p className="text-gray-500 mb-6">
//                   Are you sure you want to delete this order?
//                 </p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setDeleteConfirmId(null)}
//                     className="flex-1 px-4 py-2 border rounded-xl"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={async () => {
//                       await onDeleteOrder(deleteConfirmId);
//                       setDeleteConfirmId(null);
//                     }}
//                     className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       <div className="p-4 flex flex-col sm:flex-row gap-3 border-b bg-gray-50/50">
//         <div className="relative flex-1">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by Order ID, Customer, or Table..."
//             className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-orange-400"
//         >
//           <option value="all">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="preparing">Preparing</option>
//           <option value="ready">Ready</option>
//           <option value="served">Served</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//       </div>

//       {/* Summary Stats */}
//       <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 border-b">
//         <div className="flex justify-between items-center">
//           <span className="text-sm text-gray-600">
//             Showing {filtered.length} of {orders.length} orders
//           </span>
//           <span className="text-sm font-semibold text-orange-600">
//             Total Revenue: RWF {totalRevenue.toLocaleString()}
//           </span>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               {[
//                 "Order ID",
//                 "Table",
//                 "Customer",
//                 "Items",
//                 "Total",
//                 "Status",
//                 "Actions",
//               ].map((h) => (
//                 <th
//                   key={h}
//                   className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {filtered.map((order) => {
//               const statusConfig = getStatusConfig(order.status);
//               return (
//                 <tr
//                   key={order._id}
//                   className="hover:bg-orange-50/30 transition"
//                 >
//                   <td className="px-4 py-3 text-sm font-mono font-medium text-gray-700">
//                     {order.orderId?.slice(-8)}
//                   </td>
//                   <td className="px-4 py-3 text-sm">
//                     Table {order.personDetails?.tableNumber}
//                   </td>
//                   <td className="px-4 py-3 text-sm font-medium">
//                     <div>
//                       <div>{order.personDetails?.name || "Guest"}</div>
//                       <div className="text-xs text-gray-400">
//                         {order.personDetails?.orderType || "dine-in"}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-sm">
//                     <div>
//                       <div>
//                         {order.orderSummary?.totalItems ||
//                           order.items?.length ||
//                           0}{" "}
//                         items
//                       </div>
//                       <div className="text-xs text-gray-400">
//                         {order.items?.map((item) => item.name).join(", ")}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-sm font-bold text-orange-600">
//                     RWF {order.orderSummary?.total?.toLocaleString() || 0}
//                   </td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
//                     >
//                       {statusConfig.icon}
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => onViewDetails(order)}
//                         className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
//                       >
//                         <VisibilityIcon fontSize="small" />
//                       </button>
//                       <select
//                         value={order.status}
//                         onChange={(e) => onUpdateStatus(order, e.target.value)}
//                         className="text-xs border rounded-lg px-2 py-1 bg-white focus:ring-1 focus:ring-orange-400"
//                       >
//                         <option value="pending">pending</option>
//                         <option value="confirmed">confirmed</option>
//                         <option value="preparing">preparing</option>
//                         <option value="ready">ready</option>
//                         <option value="served">served</option>
//                         <option value="completed">completed</option>
//                         <option value="cancelled">cancelled</option>
//                       </select>
//                       <button
//                         onClick={() => setDeleteConfirmId(order.orderId)} // FIXED: Use orderId instead of _id
//                         className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {filtered.length === 0 && (
//         <div className="text-center py-12">
//           <OrdersIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//           <p className="text-gray-400">
//             No orders found matching your criteria.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// // ====================== ORDER DETAILS MODAL ======================
// const OrderDetailsModal = ({ order, onClose, onUpdateStatus }) => {
//   if (!order) return null;

//   const calculateSubtotal = () => {
//     return (
//       order.items?.reduce(
//         (sum, item) =>
//           sum +
//           (item.finalPrice || item.originalPrice || 0) * (item.quantity || 1),
//         0
//       ) || 0
//     );
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 p-5 rounded-t-3xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl">
//             Order #{order.orderId?.slice(-8)}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-white/20 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>
//         <div className="p-6 space-y-5">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-gray-50 p-3 rounded-xl">
//               <p className="text-xs text-gray-500">Customer</p>
//               <p className="font-semibold text-gray-800">
//                 {order.personDetails?.name || "Guest"}
//               </p>
//             </div>
//             <div className="bg-gray-50 p-3 rounded-xl">
//               <p className="text-xs text-gray-500">Table Number</p>
//               <p className="font-semibold text-gray-800">
//                 {order.personDetails?.tableNumber}
//               </p>
//             </div>
//             <div className="bg-gray-50 p-3 rounded-xl">
//               <p className="text-xs text-gray-500">Order Type</p>
//               <p className="font-semibold text-gray-800 capitalize">
//                 {order.personDetails?.orderType || "dine-in"}
//               </p>
//             </div>
//             <div className="bg-gray-50 p-3 rounded-xl">
//               <p className="text-xs text-gray-500">Created At</p>
//               <p className="font-semibold text-gray-800 text-sm">
//                 {new Date(order.createdAt).toLocaleString()}
//               </p>
//             </div>
//           </div>

//           {order.bookingDetails?.specialInstructions && (
//             <div className="bg-yellow-50 p-3 rounded-xl">
//               <p className="text-xs text-gray-500">Special Instructions</p>
//               <p className="text-sm text-gray-700">
//                 {order.bookingDetails.specialInstructions}
//               </p>
//             </div>
//           )}

//           {order.notes && (
//             <div className="bg-blue-50 p-3 rounded-xl">
//               <p className="text-xs text-gray-500">Notes</p>
//               <p className="text-sm text-gray-700">{order.notes}</p>
//             </div>
//           )}

//           <div>
//             <p className="text-xs text-gray-500 mb-2">Status</p>
//             <select
//               value={order.status}
//               onChange={(e) => onUpdateStatus(order, e.target.value)}
//               className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400"
//             >
//               {[
//                 "pending",
//                 "confirmed",
//                 "preparing",
//                 "ready",
//                 "served",
//                 "completed",
//                 "cancelled",
//               ].map((s) => (
//                 <option key={s} className="capitalize">
//                   {s}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="bg-orange-50 p-4 rounded-xl">
//             <p className="text-xs text-gray-500">Total Amount</p>
//             <p className="text-3xl font-bold text-orange-600">
//               RWF{" "}
//               {order.orderSummary?.total?.toLocaleString() ||
//                 calculateSubtotal().toLocaleString()}
//             </p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-500 mb-3">Order Items</p>
//             <div className="space-y-2">
//               {order.items?.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="flex flex-col p-3 bg-gray-50 rounded-xl"
//                 >
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-3">
//                       <span className="font-bold text-gray-600">
//                         {item.quantity}x
//                       </span>
//                       <span className="font-medium">{item.name}</span>
//                     </div>
//                     <span className="font-bold text-orange-600">
//                       RWF{" "}
//                       {(
//                         (item.finalPrice || item.originalPrice || 0) *
//                         (item.quantity || 1)
//                       ).toLocaleString()}
//                     </span>
//                   </div>
//                   {item.customizations && item.customizations.length > 0 && (
//                     <div className="mt-2 text-xs text-gray-500">
//                       Customizations: {item.customizations.join(", ")}
//                     </div>
//                   )}
//                   {item.specialInstructions && (
//                     <div className="mt-1 text-xs text-gray-500">
//                       Instructions: {item.specialInstructions}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {order.bookingDetails?.statusHistory &&
//             order.bookingDetails.statusHistory.length > 0 && (
//               <div>
//                 <p className="text-xs text-gray-500 mb-2">Status History</p>
//                 <div className="space-y-1">
//                   {order.bookingDetails.statusHistory.map((history, idx) => (
//                     <div key={idx} className="text-xs text-gray-600">
//                       <span className="font-medium">{history.status}</span> -{" "}
//                       {new Date(history.timestamp).toLocaleString()}
//                       {history.note && (
//                         <span className="text-gray-400 ml-2">
//                           ({history.note})
//                         </span>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ====================== NAV BUTTON ======================
// const NavButton = ({ active, onClick, icon, label }) => (
//   <button
//     onClick={onClick}
//     className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
//       active
//         ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
//         : "text-gray-600 hover:bg-gray-100"
//     }`}
//   >
//     {icon}
//     <span className="hidden sm:inline">{label}</span>
//   </button>
// );

// // ====================== MAIN DASHBOARD ======================
// export const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [orders, setOrders] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dailyAnalytics, setDailyAnalytics] = useState(null);
//   const [weeklyAnalytics, setWeeklyAnalytics] = useState(null);
//   const [analyticsLoading, setAnalyticsLoading] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     totalRevenue: 0,
//     activeOrders: 0,
//     pendingOrders: 0,
//   });

//   const fetchOrders = useCallback(async () => {
//     try {
//       const res = await axiosInstance.get("/orders");
//       // Handle the actual API response structure
//       let ordersData = [];
//       if (res.data?.data && Array.isArray(res.data.data)) {
//         ordersData = res.data.data;
//       } else if (Array.isArray(res.data)) {
//         ordersData = res.data;
//       } else if (res.data?.orders && Array.isArray(res.data.orders)) {
//         ordersData = res.data.orders;
//       }

//       const transformed = ordersData.map((o) => ({
//         ...o,
//         orderSummary: o.orderSummary || {
//           total:
//             o.items?.reduce(
//               (sum, item) =>
//                 sum +
//                 (item.finalPrice || item.originalPrice || 0) *
//                   (item.quantity || 1),
//               0
//             ) || 0,
//           totalItems: o.items?.length || 0,
//         },
//         status: o.status || "pending",
//       }));

//       setOrders(transformed);
//       setStats({
//         totalOrders: transformed.length,
//         totalRevenue: transformed.reduce(
//           (s, o) => s + (o.orderSummary?.total || 0),
//           0
//         ),
//         activeOrders: transformed.filter(
//           (o) => !["completed", "cancelled"].includes(o.status)
//         ).length,
//         pendingOrders: transformed.filter((o) => o.status === "pending").length,
//       });
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       toast.error("Failed to fetch orders");
//     }
//   }, []);

//   const fetchFoods = useCallback(async () => {
//     try {
//       const res = await axiosInstance.get("/foods");
//       let foodsData = [];
//       if (res.data?.success && res.data.foods) {
//         foodsData = res.data.foods;
//       } else if (Array.isArray(res.data)) {
//         foodsData = res.data;
//       } else if (res.data?.data && Array.isArray(res.data.data)) {
//         foodsData = res.data.data;
//       }
//       setMenuItems(foodsData);
//     } catch (err) {
//       console.error("Error fetching foods:", err);
//       toast.error("Failed to fetch menu");
//     }
//   }, []);

//   const fetchAnalytics = async () => {
//     setAnalyticsLoading(true);
//     try {
//       const [daily, weekly] = await Promise.all([
//         axiosInstance.get("/orders/analytics/daily"),
//         axiosInstance.get("/orders/analytics/weekly"),
//       ]);
//       if (daily.data?.success) setDailyAnalytics(daily.data);
//       if (weekly.data?.success) setWeeklyAnalytics(weekly.data);
//     } catch (e) {
//       console.error("Error fetching analytics:", e);
//     } finally {
//       setAnalyticsLoading(false);
//     }
//   };

//   const handleAddFood = async (formData) => {
//     try {
//       const response = await axiosInstance.post("/foods", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       if (response.data?.success) {
//         await fetchFoods();
//         toast.success("Food created successfully!");
//       } else {
//         toast.error(response.data?.message || "Creation failed");
//       }
//     } catch (err) {
//       console.error("Error creating food:", err);
//       toast.error(err.response?.data?.message || "Creation failed");
//     }
//   };

//   const handleEditFood = async (id, formData) => {
//     try {
//       const response = await axiosInstance.put(`/foods/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       if (response.data?.success) {
//         await fetchFoods();
//         toast.success("Food updated successfully!");
//       } else {
//         toast.error(response.data?.message || "Update failed");
//       }
//     } catch (err) {
//       console.error("Error updating food:", err);
//       toast.error(err.response?.data?.message || "Update failed");
//     }
//   };

//   const handleDeleteFood = async (id) => {
//     try {
//       const response = await axiosInstance.delete(`/foods/${id}`);
//       if (response.data?.success) {
//         await fetchFoods();
//         toast.success("Food deleted successfully!");
//       } else {
//         toast.error(response.data?.message || "Delete failed");
//       }
//     } catch (err) {
//       console.error("Error deleting food:", err);
//       toast.error(err.response?.data?.message || "Delete failed");
//     }
//   };

//   // FIXED: Use order.orderId instead of order._id
//   const updateOrderStatus = async (order, newStatus) => {
//     try {
//       const response = await axiosInstance.patch(
//         `/orders/${order.orderId}/status`,
//         {
//           status: newStatus,
//         }
//       );
//       if (response.data?.success) {
//         await fetchOrders();
//         toast.success(`Status updated to ${newStatus}!`);
//       } else {
//         toast.error(response.data?.message || "Update failed");
//       }
//     } catch (e) {
//       console.error("Error updating order status:", e);
//       toast.error(e.response?.data?.message || "Update failed");
//     }
//   };

//   // FIXED: Expect orderId parameter (which is the custom order ID)
//   const deleteOrder = async (orderId) => {
//     try {
//       const response = await axiosInstance.delete(`/orders/${orderId}`);
//       if (response.data?.success) {
//         await fetchOrders();
//         toast.success("Order deleted successfully!");
//       } else {
//         toast.error(response.data?.message || "Delete failed");
//       }
//     } catch (e) {
//       console.error("Error deleting order:", e);
//       toast.error(e.response?.data?.message || "Delete failed");
//     }
//   };

//   const refreshAll = async () => {
//     setLoading(true);
//     await Promise.all([fetchOrders(), fetchFoods(), fetchAnalytics()]);
//     setLoading(false);
//     toast.success("Data refreshed!");
//   };

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("auth_token");

//       await axios.post(
//         "https://nutriscan-foodanddrinksupply.onrender.com/auth/logout",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       localStorage.removeItem("auth_token");
//       localStorage.removeItem("user_data");
//       sessionStorage.clear();

//       toast.success("Logged out successfully");

//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 1500);
//     } catch (error) {
//       console.error("LOGOUT ERROR:", error.response?.data || error.message);

//       localStorage.removeItem("auth_token");
//       localStorage.removeItem("user_data");
//       sessionStorage.clear();

//       toast.error("Session ended");

//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 1500);
//     }
//   };

//   useEffect(() => {
//     refreshAll();
//   }, []);

//   if (loading)
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-orange-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/20">
//       <ToastContainer position="top-right" />
//       <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-3">
//         <div className="flex items-center gap-3">
//           <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2.5 rounded-2xl shadow-lg">
//             <RestaurantIcon className="text-white" />
//           </div>
//           <div>
//             <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
//               NutriScan·AI
//             </h1>
//             <p className="text-xs text-gray-500">
//               Restaurant Intelligence Dashboard
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={refreshAll}
//             className="p-2 hover:bg-gray-100 rounded-full transition"
//             title="Refresh Data"
//           >
//             <RefreshIcon />
//           </button>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition shadow-md"
//           >
//             <LogoutIcon fontSize="small" />
//             <span className="hidden sm:inline">Logout</span>
//           </button>
//         </div>
//       </header>

//       <div className="px-4 sm:px-6 pt-4 sticky top-[73px] z-10 bg-transparent">
//         <div className="flex gap-1 bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-sm overflow-x-auto">
//           <NavButton
//             active={activeTab === "overview"}
//             onClick={() => setActiveTab("overview")}
//             icon={<DashboardIcon />}
//             label="Overview"
//           />
//           <NavButton
//             active={activeTab === "orders"}
//             onClick={() => setActiveTab("orders")}
//             icon={<OrdersIcon />}
//             label="Orders"
//           />
//           <NavButton
//             active={activeTab === "menu"}
//             onClick={() => setActiveTab("menu")}
//             icon={<MenuIcon />}
//             label="Menu"
//           />
//           <NavButton
//             active={activeTab === "analytics"}
//             onClick={() => setActiveTab("analytics")}
//             icon={<AnalyticsIcon />}
//             label="Analytics"
//           />
//         </div>
//       </div>

//       <div className="p-4 sm:p-6">
//         {activeTab === "overview" && (
//           <>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-6">
//               <StatCard
//                 title="Total Orders"
//                 value={stats.totalOrders}
//                 icon={<OrdersIcon />}
//                 color="border-blue-500"
//               />
//               <StatCard
//                 title="Revenue"
//                 value={`RWF ${stats.totalRevenue.toLocaleString()}`}
//                 icon={<MoneyIcon />}
//                 color="border-green-500"
//               />
//               <StatCard
//                 title="Active Orders"
//                 value={stats.activeOrders}
//                 icon={<KitchenIcon />}
//                 color="border-purple-500"
//               />
//               <StatCard
//                 title="Pending"
//                 value={stats.pendingOrders}
//                 icon={<TimeIcon />}
//                 color="border-yellow-500"
//               />
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//               <DailyAnalyticsCard
//                 analytics={dailyAnalytics}
//                 loading={analyticsLoading}
//               />
//               <WeeklyAnalyticsCard
//                 analytics={weeklyAnalytics}
//                 loading={analyticsLoading}
//               />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <OrdersIcon className="text-orange-500" /> Recent Orders
//               </h2>
//               <OrdersTable
//                 orders={orders.slice(0, 5)}
//                 onUpdateStatus={updateOrderStatus}
//                 onViewDetails={setSelectedOrder}
//                 onDeleteOrder={deleteOrder}
//               />
//             </div>
//           </>
//         )}
//         {activeTab === "orders" && (
//           <OrdersTable
//             orders={orders}
//             onUpdateStatus={updateOrderStatus}
//             onViewDetails={setSelectedOrder}
//             onDeleteOrder={deleteOrder}
//           />
//         )}
//         {activeTab === "menu" && (
//           <MenuManagement
//             menuItems={menuItems}
//             onAddItem={handleAddFood}
//             onEditItem={handleEditFood}
//             onDeleteItem={handleDeleteFood}
//             onRefresh={fetchFoods}
//           />
//         )}
//         {activeTab === "analytics" && (
//           <div className="space-y-6">
//             <DailyAnalyticsCard
//               analytics={dailyAnalytics}
//               loading={analyticsLoading}
//             />
//             <WeeklyAnalyticsCard
//               analytics={weeklyAnalytics}
//               loading={analyticsLoading}
//             />
//           </div>
//         )}
//       </div>
//       {selectedOrder && (
//         <OrderDetailsModal
//           order={selectedOrder}
//           onClose={() => setSelectedOrder(null)}
//           onUpdateStatus={updateOrderStatus}
//         />
//       )}
//     </div>
//   );
// };

// import React, { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Icons
// import {
//   Dashboard as DashboardIcon,
//   RestaurantMenu as MenuIcon,
//   ShoppingCart as OrdersIcon,
//   Analytics as AnalyticsIcon,
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Close as CloseIcon,
//   CloudUpload as CloudUploadIcon,
//   Search as SearchIcon,
//   Refresh as RefreshIcon,
//   AttachMoney as MoneyIcon,
//   AccessTime as TimeIcon,
//   Person as PersonIcon,
//   Restaurant as RestaurantIcon,
//   Visibility as VisibilityIcon,
//   ListAlt as ListAltIcon,
//   Healing as HealingIcon,
//   Warning as WarningIcon,
//   Today as TodayIcon,
//   DateRange as DateRangeIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   Kitchen as KitchenIcon,
//   ArrowUpward as ArrowUpIcon,
//   ArrowDownward as ArrowDownIcon,
//   LocalOffer as LocalOfferIcon,
//   DeleteSweep as DeleteSweepIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";

// // ====================== API CONFIG ======================
// const API_BASE = "https://nutriscan-foodanddrinksupply.onrender.com";
// const axiosInstance = axios.create({ baseURL: API_BASE, timeout: 30000 });

// // ====================== AUTH CONTEXT ======================
// const AuthContext = React.createContext(null);

// // Mock authentication - replace with your actual auth logic
// const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     return localStorage.getItem("auth_token") !== null;
//   });

//   const login = (token) => {
//     localStorage.setItem("auth_token", token);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("auth_token");
//     setIsAuthenticated(false);
//     toast.info("Logged out successfully");
//     window.location.href = "/login";
//   };

//   return { isAuthenticated, login, logout };
// };

// // ====================== ANIMATED STAT CARD ======================
// const StatCard = ({ title, value, icon, color, trend, trendValue }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     whileHover={{ y: -5, scale: 1.02 }}
//     transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
//     className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-4 sm:p-5 border-t-4 ${color} hover:shadow-xl transition-all duration-300`}
//   >
//     <div className="flex justify-between items-start">
//       <div className="flex-1">
//         <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide">
//           {title}
//         </p>
//         <motion.p
//           initial={{ scale: 0.5 }}
//           animate={{ scale: 1 }}
//           className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mt-2 break-words"
//         >
//           {value}
//         </motion.p>
//         {trend && (
//           <motion.div
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex items-center gap-1 mt-2"
//           >
//             {trend === "up" ? (
//               <ArrowUpIcon className="text-green-500 text-sm" />
//             ) : (
//               <ArrowDownIcon className="text-red-500 text-sm" />
//             )}
//             <span
//               className={`text-xs font-medium ${
//                 trend === "up" ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {trendValue}
//             </span>
//           </motion.div>
//         )}
//       </div>
//       <motion.div
//         whileHover={{ rotate: 360 }}
//         transition={{ duration: 0.5 }}
//         className={`p-3 rounded-2xl bg-gradient-to-br ${color
//           .replace("border-", "from-")
//           .replace("-500", "-100")} to-white shadow-inner`}
//       >
//         {icon}
//       </motion.div>
//     </div>
//   </motion.div>
// );

// // ====================== ANIMATED BUTTON ======================
// const AnimatedButton = ({
//   onClick,
//   children,
//   variant = "primary",
//   className = "",
//   disabled = false,
//   isLoading = false,
// }) => {
//   const variants = {
//     primary:
//       "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white",
//     secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
//     danger: "bg-red-500 hover:bg-red-600 text-white",
//     success: "bg-green-500 hover:bg-green-600 text-white",
//   };

//   return (
//     <motion.button
//       whileHover={!disabled && !isLoading ? { scale: 1.05, y: -2 } : {}}
//       whileTap={!disabled && !isLoading ? { scale: 0.95 } : {}}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       onClick={onClick}
//       disabled={disabled || isLoading}
//       className={`${variants[variant]} px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${className}`}
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

// // ====================== FOOD DETAILS MODAL ======================
// const FoodDetailsModal = ({ item, onClose }) => {
//   if (!item) return null;
//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0, y: 20 }}
//           animate={{ scale: 1, opacity: 1, y: 0 }}
//           exit={{ scale: 0.9, opacity: 0, y: 20 }}
//           transition={{ type: "spring", damping: 25, stiffness: 300 }}
//           className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="relative">
//             <motion.img
//               initial={{ scale: 1.1, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 0.5 }}
//               src={
//                 item.image ||
//                 "https://via.placeholder.com/400x200?text=No+Image"
//               }
//               alt={item.name}
//               className="w-full h-48 sm:h-64 object-cover rounded-t-3xl"
//               onError={(e) => {
//                 e.target.src =
//                   "https://via.placeholder.com/400x200?text=No+Image";
//               }}
//             />
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="absolute top-4 right-4"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.1, rotate: 90 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={onClose}
//                 className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition"
//               >
//                 <CloseIcon className="text-white" />
//               </motion.button>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6"
//             >
//               <h2 className="text-white text-2xl sm:text-3xl font-bold">
//                 {item.name}
//               </h2>
//               <p className="text-white/90 text-sm mt-1">{item.category}</p>
//             </motion.div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="p-5 sm:p-6 space-y-5"
//           >
//             <div className="flex justify-between items-center pb-3 border-b">
//               <div>
//                 <p className="text-xs text-gray-500">Price</p>
//                 <p className="text-2xl font-bold text-orange-600">
//                   RWF {item.price?.toLocaleString()}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Prep Time</p>
//                 <p className="text-lg font-semibold flex items-center gap-1">
//                   <TimeIcon fontSize="small" className="text-gray-400" />{" "}
//                   {item.prepTime} min
//                 </p>
//               </div>
//               <div>
//                 <motion.span
//                   initial={{ scale: 0.8 }}
//                   animate={{ scale: 1 }}
//                   className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
//                     item.purineLevel === "low"
//                       ? "bg-green-100 text-green-700"
//                       : item.purineLevel === "moderate"
//                       ? "bg-yellow-100 text-yellow-700"
//                       : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   {item.purineLevel?.toUpperCase()} Purine
//                 </motion.span>
//               </div>
//             </div>

//             {item.description && (
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                   📖 Description
//                 </h3>
//                 <p className="text-sm text-gray-600 leading-relaxed">
//                   {item.description}
//                 </p>
//               </motion.div>
//             )}

//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.5 }}
//             >
//               <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                 <ListAltIcon className="text-emerald-600" /> Ingredients
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {item.ingredients?.map((ing, idx) => (
//                   <motion.span
//                     key={idx}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: idx * 0.03 }}
//                     whileHover={{ scale: 1.05 }}
//                     className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium"
//                   >
//                     {ing}
//                   </motion.span>
//                 ))}
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.6 }}
//             >
//               <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                 <HealingIcon className="text-blue-500" /> Dietary Information
//               </h3>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {[
//                   { label: "Gluten", value: item.containsGluten },
//                   { label: "Peanuts", value: item.containsPeanuts },
//                   { label: "Shellfish", value: item.containsShellfish },
//                   { label: "Dairy", value: item.containsDairy },
//                   { label: "High Salt", value: item.highSalt },
//                 ].map((diet, idx) => (
//                   <motion.div
//                     key={diet.label}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: idx * 0.05 }}
//                     className={`flex items-center gap-2 p-2 rounded-lg ${
//                       diet.value ? "bg-red-50" : "bg-green-50"
//                     }`}
//                   >
//                     <motion.span
//                       animate={{ scale: diet.value ? [1, 1.2, 1] : 1 }}
//                       transition={{
//                         duration: 0.5,
//                         repeat: diet.value ? Infinity : 0,
//                       }}
//                       className={`w-2 h-2 rounded-full ${
//                         diet.value ? "bg-red-500" : "bg-green-500"
//                       }`}
//                     ></motion.span>
//                     <span className="text-sm">
//                       {diet.label}: {diet.value ? "Contains" : "Free"}
//                     </span>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             {(item.refluxTriggers?.length > 0 ||
//               item.migraineTriggers?.length > 0) && (
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.7 }}
//               >
//                 <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                   <WarningIcon className="text-orange-500" /> Health Triggers
//                 </h3>
//                 {item.refluxTriggers?.length > 0 && (
//                   <div className="mb-2">
//                     <p className="text-xs text-gray-500 mb-1">
//                       Reflux Triggers:
//                     </p>
//                     <div className="flex flex-wrap gap-1">
//                       {item.refluxTriggers.map((t, i) => (
//                         <motion.span
//                           key={i}
//                           initial={{ opacity: 0, scale: 0.8 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           transition={{ delay: i * 0.05 }}
//                           className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full"
//                         >
//                           {t}
//                         </motion.span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {item.migraineTriggers?.length > 0 && (
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">
//                       Migraine Triggers:
//                     </p>
//                     <div className="flex flex-wrap gap-1">
//                       {item.migraineTriggers.map((t, i) => (
//                         <motion.span
//                           key={i}
//                           initial={{ opacity: 0, scale: 0.8 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           transition={{ delay: i * 0.05 }}
//                           className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
//                         >
//                           {t}
//                         </motion.span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             )}
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// // ====================== DAILY ANALYTICS CARD ======================
// const DailyAnalyticsCard = ({ analytics, loading }) => {
//   if (loading)
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="bg-white rounded-2xl shadow-lg p-6"
//       >
//         <div className="space-y-4">
//           <motion.div
//             animate={{ opacity: [0.5, 1, 0.5] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             className="h-32 bg-gray-200 rounded"
//           />
//         </div>
//       </motion.div>
//     );
//   if (!analytics)
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-400"
//       >
//         No data available
//       </motion.div>
//     );
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-gradient-to-br from-white to-orange-50/30 rounded-2xl shadow-lg p-5 sm:p-6"
//     >
//       <motion.div
//         initial={{ scale: 0.8 }}
//         animate={{ scale: 1 }}
//         className="flex items-center gap-2 mb-5"
//       >
//         <motion.div
//           whileHover={{ rotate: 360 }}
//           transition={{ duration: 0.5 }}
//           className="p-2 bg-orange-100 rounded-xl"
//         >
//           <TodayIcon className="text-orange-600" />
//         </motion.div>
//         <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//           Daily Analytics
//         </h2>
//       </motion.div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//         <div className="space-y-4">
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl text-white"
//           >
//             <p className="text-sm opacity-90">Total Orders Today</p>
//             <motion.p
//               initial={{ scale: 0.5 }}
//               animate={{ scale: 1 }}
//               className="text-3xl font-bold"
//             >
//               {analytics.totalOrders || 0}
//             </motion.p>
//           </motion.div>
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-xl text-white"
//           >
//             <p className="text-sm opacity-90">Total Income Today</p>
//             <motion.p
//               initial={{ scale: 0.5 }}
//               animate={{ scale: 1 }}
//               className="text-2xl font-bold"
//             >
//               RWF {(analytics.totalIncome || 0).toLocaleString()}
//             </motion.p>
//           </motion.div>
//         </div>
//         <div>
//           <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//             <LocalOfferIcon fontSize="small" /> Top Selling Items
//           </p>
//           <div className="space-y-2">
//             {analytics.topPlates?.slice(0, 5).map((plate, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 whileHover={{ scale: 1.02, x: 5 }}
//                 className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
//               >
//                 <span className="text-sm font-medium text-gray-700">
//                   {plate.name}
//                 </span>
//                 <motion.span
//                   initial={{ scale: 0.8 }}
//                   animate={{ scale: 1 }}
//                   className="text-sm font-bold text-orange-600"
//                 >
//                   {plate.quantity} sold
//                 </motion.span>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ====================== WEEKLY ANALYTICS ======================
// const WeeklyAnalyticsCard = ({ analytics, loading }) => {
//   if (loading)
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="bg-white rounded-2xl shadow-lg p-6"
//       >
//         <motion.div
//           animate={{ opacity: [0.5, 1, 0.5] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//           className="h-64 bg-gray-200 rounded"
//         />
//       </motion.div>
//     );
//   if (!analytics?.data?.length)
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-400"
//       >
//         No weekly data
//       </motion.div>
//     );
//   const totalOrders = analytics.data.reduce((sum, d) => sum + d.orders, 0);
//   const maxOrders = Math.max(...analytics.data.map((d) => d.orders));
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg p-5 sm:p-6"
//     >
//       <motion.div
//         initial={{ scale: 0.8 }}
//         animate={{ scale: 1 }}
//         className="flex items-center gap-2 mb-5"
//       >
//         <motion.div
//           whileHover={{ rotate: 360 }}
//           transition={{ duration: 0.5 }}
//           className="p-2 bg-blue-100 rounded-xl"
//         >
//           <DateRangeIcon className="text-blue-600" />
//         </motion.div>
//         <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//           Weekly Overview
//         </h2>
//       </motion.div>
//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           className="bg-green-100 p-3 rounded-xl text-center"
//         >
//           <p className="text-xs text-gray-600">Total Orders</p>
//           <motion.p
//             initial={{ scale: 0.5 }}
//             animate={{ scale: 1 }}
//             className="text-2xl font-bold text-green-700"
//           >
//             {totalOrders}
//           </motion.p>
//         </motion.div>
//       </div>
//       <div className="space-y-3">
//         {analytics.data.map((day, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: idx * 0.1 }}
//             className="flex items-center gap-3"
//           >
//             <span className="text-sm font-semibold w-12 text-gray-700">
//               {day.day.substring(0, 3)}
//             </span>
//             <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${(day.orders / maxOrders) * 100}%` }}
//                 transition={{ duration: 0.8, delay: idx * 0.1, type: "spring" }}
//                 className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
//               />
//             </div>
//             <motion.span
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               className="text-sm font-bold text-gray-700 w-16 text-right"
//             >
//               {day.orders}
//             </motion.span>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// // ====================== MENU MANAGEMENT ======================
// const MenuManagement = ({
//   menuItems,
//   onAddItem,
//   onEditItem,
//   onDeleteItem,
//   onRefresh,
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [loadingUpload, setLoadingUpload] = useState(false);
//   const [viewDetailsItem, setViewDetailsItem] = useState(null);
//   const [deleteConfirmId, setDeleteConfirmId] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const [imageFile, setImageFile] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     ingredients: "",
//     description: "",
//     prepTime: "",
//     category: "Mains",
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: "",
//     migraineTriggers: "",
//     highSalt: false,
//     sodiumMg: "",
//     nutritionalInfo: "",
//   });

//   const categories = [
//     "Mains",
//     "Appetizers",
//     "Seafood",
//     "Vegan",
//     "Desserts",
//     "Beverages",
//     "Soups",
//     "Salads",
//   ];

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formData.name || !formData.price) {
//       toast.error("Please fill in name and price");
//       return;
//     }
//     setLoadingUpload(true);
//     try {
//       const submitData = new FormData();
//       submitData.append("name", formData.name);
//       submitData.append("price", formData.price);
//       submitData.append(
//         "ingredients",
//         JSON.stringify(
//           formData.ingredients
//             .split(",")
//             .map((i) => i.trim())
//             .filter((i) => i)
//         )
//       );
//       submitData.append("description", formData.description);
//       submitData.append("prepTime", formData.prepTime || "15");
//       submitData.append("category", formData.category);
//       submitData.append("purineLevel", formData.purineLevel);
//       submitData.append("containsGluten", String(formData.containsGluten));
//       submitData.append("containsPeanuts", String(formData.containsPeanuts));
//       submitData.append(
//         "containsShellfish",
//         String(formData.containsShellfish)
//       );
//       submitData.append("containsDairy", String(formData.containsDairy));
//       submitData.append("highSalt", String(formData.highSalt));
//       submitData.append(
//         "refluxTriggers",
//         JSON.stringify(
//           formData.refluxTriggers
//             .split(",")
//             .map((s) => s.trim())
//             .filter((s) => s)
//         )
//       );
//       submitData.append(
//         "migraineTriggers",
//         JSON.stringify(
//           formData.migraineTriggers
//             .split(",")
//             .map((s) => s.trim())
//             .filter((s) => s)
//         )
//       );
//       if (formData.sodiumMg) submitData.append("sodiumMg", formData.sodiumMg);
//       if (formData.nutritionalInfo)
//         submitData.append("nutritionalInfo", formData.nutritionalInfo);
//       if (imageFile) submitData.append("image", imageFile);

//       if (editingItem) {
//         await onEditItem(editingItem._id, submitData);
//         toast.success("Item updated successfully!");
//       } else {
//         await onAddItem(submitData);
//         toast.success("Item created successfully!");
//       }
//       setShowModal(false);
//       resetForm();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Operation failed");
//     } finally {
//       setLoadingUpload(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       price: "",
//       ingredients: "",
//       description: "",
//       prepTime: "",
//       category: "Mains",
//       purineLevel: "low",
//       containsGluten: false,
//       containsPeanuts: false,
//       containsShellfish: false,
//       containsDairy: false,
//       refluxTriggers: "",
//       migraineTriggers: "",
//       highSalt: false,
//       sodiumMg: "",
//       nutritionalInfo: "",
//     });
//     setImageFile(null);
//     setImagePreview("");
//     setEditingItem(null);
//   };

//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setFormData({
//       name: item.name,
//       price: item.price.toString(),
//       ingredients: item.ingredients?.join(", ") || "",
//       description: item.description || "",
//       prepTime: item.prepTime?.toString() || "",
//       category: item.category || "Mains",
//       purineLevel: item.purineLevel,
//       containsGluten: item.containsGluten,
//       containsPeanuts: item.containsPeanuts,
//       containsShellfish: item.containsShellfish,
//       containsDairy: item.containsDairy,
//       refluxTriggers: item.refluxTriggers?.join(", ") || "",
//       migraineTriggers: item.migraineTriggers?.join(", ") || "",
//       highSalt: item.highSalt,
//       sodiumMg: item.sodiumMg?.toString() || "",
//       nutritionalInfo: item.nutritionalInfo
//         ? JSON.stringify(item.nutritionalInfo)
//         : "",
//     });
//     setImagePreview(item.image || "");
//     setShowModal(true);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white rounded-2xl shadow-xl p-4 sm:p-6"
//     >
//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {deleteConfirmId && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-2xl max-w-md w-full p-6"
//             >
//               <div className="text-center">
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ type: "spring" }}
//                   className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
//                 >
//                   <DeleteIcon className="text-red-600 text-3xl" />
//                 </motion.div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">
//                   Delete Item
//                 </h3>
//                 <p className="text-gray-500 mb-6">
//                   Are you sure you want to delete this item? This action cannot
//                   be undone.
//                 </p>
//                 <div className="flex gap-3">
//                   <AnimatedButton
//                     variant="secondary"
//                     onClick={() => setDeleteConfirmId(null)}
//                     className="flex-1"
//                   >
//                     Cancel
//                   </AnimatedButton>
//                   <AnimatedButton
//                     variant="danger"
//                     onClick={async () => {
//                       await onDeleteItem(deleteConfirmId);
//                       setDeleteConfirmId(null);
//                     }}
//                     className="flex-1"
//                   >
//                     Delete
//                   </AnimatedButton>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b"
//       >
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             <MenuIcon className="text-orange-500" /> Menu Management
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Manage your restaurant's food items
//           </p>
//         </div>
//         <div className="flex gap-2 w-full sm:w-auto">
//           <AnimatedButton
//             variant="secondary"
//             onClick={onRefresh}
//             className="flex-1 sm:flex-none"
//           >
//             <RefreshIcon fontSize="small" /> Sync
//           </AnimatedButton>
//           <AnimatedButton
//             variant="primary"
//             onClick={() => {
//               resetForm();
//               setShowModal(true);
//             }}
//             className="flex-1 sm:flex-none"
//           >
//             <AddIcon fontSize="small" /> Add Item
//           </AnimatedButton>
//         </div>
//       </motion.div>

//       {/* Menu Grid */}
//       {menuItems.length === 0 ? (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center py-12"
//         >
//           <MenuIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//           <p className="text-gray-400">
//             No menu items found. Click "Add Item" to create your first menu
//             item.
//           </p>
//         </motion.div>
//       ) : (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
//         >
//           <AnimatePresence>
//             {menuItems.map((item, idx) => (
//               <motion.div
//                 key={item._id}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 transition={{ delay: idx * 0.05 }}
//                 whileHover={{ y: -5 }}
//                 className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
//               >
//                 <div className="relative h-48 overflow-hidden">
//                   <motion.img
//                     whileHover={{ scale: 1.1 }}
//                     transition={{ duration: 0.5 }}
//                     src={
//                       item.image ||
//                       "https://via.placeholder.com/400x200?text=No+Image"
//                     }
//                     alt={item.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.src =
//                         "https://via.placeholder.com/400x200?text=No+Image";
//                     }}
//                   />
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     whileHover={{ opacity: 1 }}
//                     className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3"
//                   >
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => handleEdit(item)}
//                       className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
//                     >
//                       <EditIcon fontSize="small" />
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => setViewDetailsItem(item)}
//                       className="p-2 bg-emerald-500 rounded-full text-white hover:bg-emerald-600 transition"
//                     >
//                       <VisibilityIcon fontSize="small" />
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => setDeleteConfirmId(item._id)}
//                       className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </motion.button>
//                   </motion.div>
//                   <div className="absolute top-3 right-3">
//                     <motion.span
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       className={`px-2 py-1 rounded-lg text-xs font-medium ${
//                         item.purineLevel === "low"
//                           ? "bg-green-500"
//                           : item.purineLevel === "moderate"
//                           ? "bg-yellow-500"
//                           : "bg-red-500"
//                       } text-white shadow-lg inline-block`}
//                     >
//                       {item.purineLevel}
//                     </motion.span>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
//                     {item.name}
//                   </h3>
//                   <p className="text-xs text-gray-500 line-clamp-2 mb-2">
//                     {item.description}
//                   </p>
//                   <div className="flex flex-wrap gap-1 mb-3">
//                     {item.ingredients?.slice(0, 3).map((ing, i) => (
//                       <span
//                         key={i}
//                         className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600"
//                       >
//                         {ing}
//                       </span>
//                     ))}
//                     {item.ingredients?.length > 3 && (
//                       <span className="text-xs text-gray-400">
//                         +{item.ingredients.length - 3}
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-orange-600 font-bold text-xl">
//                       RWF {item.price?.toLocaleString()}
//                     </span>
//                     <span className="text-gray-400 text-xs flex items-center gap-1">
//                       <TimeIcon fontSize="small" /> {item.prepTime} min
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       )}

//       {/* Create/Edit Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//             onClick={() => setShowModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-5 rounded-t-3xl flex justify-between items-center">
//                 <h2 className="text-white font-bold text-xl">
//                   {editingItem ? "Edit Menu Item" : "Create New Menu Item"}
//                 </h2>
//                 <motion.button
//                   whileHover={{ scale: 1.1, rotate: 90 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setShowModal(false)}
//                   className="p-1 hover:bg-white/20 rounded-full transition"
//                 >
//                   <CloseIcon className="text-white" />
//                 </motion.button>
//               </div>
//               <div className="p-5 sm:p-6 space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <motion.input
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 }}
//                     type="text"
//                     placeholder="Item Name *"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//                   />
//                   <motion.input
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 }}
//                     type="number"
//                     placeholder="Price (RWF) *"
//                     value={formData.price}
//                     onChange={(e) =>
//                       setFormData({ ...formData, price: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   />
//                 </div>
//                 <motion.textarea
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                   placeholder="Ingredients (comma separated)"
//                   value={formData.ingredients}
//                   onChange={(e) =>
//                     setFormData({ ...formData, ingredients: e.target.value })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   rows={2}
//                 />
//                 <motion.textarea
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   placeholder="Description"
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   rows={2}
//                 />
//                 <div className="grid grid-cols-2 gap-4">
//                   <motion.input
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.4 }}
//                     type="number"
//                     placeholder="Prep time (minutes)"
//                     value={formData.prepTime}
//                     onChange={(e) =>
//                       setFormData({ ...formData, prepTime: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl"
//                   />
//                   <motion.select
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.4 }}
//                     value={formData.category}
//                     onChange={(e) =>
//                       setFormData({ ...formData, category: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl bg-white"
//                   >
//                     {categories.map((c) => (
//                       <option key={c}>{c}</option>
//                     ))}
//                   </motion.select>
//                 </div>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5 }}
//                   className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-orange-400 transition cursor-pointer"
//                 >
//                   <label className="flex flex-col items-center gap-2 cursor-pointer">
//                     <CloudUploadIcon className="text-gray-400 text-4xl" />
//                     <span className="text-sm text-gray-500">
//                       Click to upload image
//                     </span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="hidden"
//                     />
//                   </label>
//                   {imagePreview && (
//                     <motion.img
//                       initial={{ scale: 0.8, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       src={imagePreview}
//                       alt="preview"
//                       className="mt-3 h-32 w-32 object-cover rounded-xl mx-auto shadow-md"
//                     />
//                   )}
//                 </motion.div>
//                 <motion.textarea
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.6 }}
//                   placeholder='Nutritional Info (JSON) e.g. {"calories": 450, "protein": "25g"}'
//                   value={formData.nutritionalInfo}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       nutritionalInfo: e.target.value,
//                     })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl font-mono text-sm"
//                   rows={2}
//                 />
//                 <div className="grid grid-cols-2 gap-4">
//                   <motion.select
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.7 }}
//                     value={formData.purineLevel}
//                     onChange={(e) =>
//                       setFormData({ ...formData, purineLevel: e.target.value })
//                     }
//                     className="w-full p-3 border rounded-xl"
//                   >
//                     <option value="low">Low Purine</option>
//                     <option value="moderate">Moderate Purine</option>
//                     <option value="high">High Purine</option>
//                   </motion.select>
//                   <motion.input
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.7 }}
//                     type="number"
//                     placeholder="Sodium (mg)"
//                     value={formData.sodiumMg}
//                     onChange={(e) =>
//                       setFormData({ ...formData, sodiumMg: e.target.value })
//                     }
//                     className="w-full p-3 border rounded-xl"
//                   />
//                 </div>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.8 }}
//                   className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-xl"
//                 >
//                   {[
//                     { label: "Gluten", key: "containsGluten" },
//                     { label: "Peanuts", key: "containsPeanuts" },
//                     { label: "Shellfish", key: "containsShellfish" },
//                     { label: "Dairy", key: "containsDairy" },
//                     {
//                       label: "High Salt",
//                       key: "highSalt",
//                       colSpan: "col-span-2",
//                     },
//                   ].map((option) => (
//                     <label
//                       key={option.key}
//                       className={`flex items-center gap-2 text-sm ${
//                         option.colSpan || ""
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={formData[option.key]}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             [option.key]: e.target.checked,
//                           })
//                         }
//                         className="w-4 h-4 rounded"
//                       />{" "}
//                       {option.label}
//                     </label>
//                   ))}
//                 </motion.div>
//                 <motion.textarea
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.9 }}
//                   placeholder="Reflux Triggers (comma separated)"
//                   value={formData.refluxTriggers}
//                   onChange={(e) =>
//                     setFormData({ ...formData, refluxTriggers: e.target.value })
//                   }
//                   className="w-full p-3 border rounded-xl"
//                   rows={2}
//                 />
//                 <motion.textarea
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.0 }}
//                   placeholder="Migraine Triggers (comma separated)"
//                   value={formData.migraineTriggers}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       migraineTriggers: e.target.value,
//                     })
//                   }
//                   className="w-full p-3 border rounded-xl"
//                   rows={2}
//                 />
//                 <AnimatedButton
//                   variant="primary"
//                   onClick={handleSubmit}
//                   isLoading={loadingUpload}
//                   className="w-full py-3 text-lg"
//                 >
//                   {editingItem ? "Update Item" : "Create Item"}
//                 </AnimatedButton>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <FoodDetailsModal
//         item={viewDetailsItem}
//         onClose={() => setViewDetailsItem(null)}
//       />
//     </motion.div>
//   );
// };

// // ====================== ORDERS TABLE ======================
// const OrdersTable = ({
//   orders,
//   onUpdateStatus,
//   onViewDetails,
//   onDeleteOrder,
// }) => {
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [deleteConfirmId, setDeleteConfirmId] = useState(null);

//   const getStatusConfig = (status) => {
//     const config = {
//       pending: {
//         color: "bg-yellow-100 text-yellow-700",
//         icon: <TimeIcon fontSize="small" />,
//       },
//       confirmed: {
//         color: "bg-blue-100 text-blue-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       preparing: {
//         color: "bg-purple-100 text-purple-700",
//         icon: <KitchenIcon fontSize="small" />,
//       },
//       ready: {
//         color: "bg-green-100 text-green-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       served: {
//         color: "bg-teal-100 text-teal-700",
//         icon: <RestaurantIcon fontSize="small" />,
//       },
//       completed: {
//         color: "bg-gray-100 text-gray-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       cancelled: {
//         color: "bg-red-100 text-red-700",
//         icon: <CancelIcon fontSize="small" />,
//       },
//     };
//     return config[status] || config.pending;
//   };

//   const filtered = orders.filter(
//     (o) =>
//       (o.orderId?.toLowerCase().includes(search.toLowerCase()) ||
//         o.personDetails?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         o.personDetails?.tableNumber?.toString().includes(search)) &&
//       (statusFilter === "all" || o.status === statusFilter)
//   );

//   const totalRevenue = filtered.reduce(
//     (sum, order) => sum + (order.orderSummary?.total || 0),
//     0
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white rounded-2xl shadow-xl overflow-hidden"
//     >
//       <AnimatePresence>
//         {deleteConfirmId && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.9 }}
//               className="bg-white rounded-2xl max-w-md w-full p-6"
//             >
//               <div className="text-center">
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ type: "spring" }}
//                 >
//                   <DeleteSweepIcon className="text-red-500 text-5xl mb-4" />
//                 </motion.div>
//                 <h3 className="text-xl font-bold mb-2">Delete Order</h3>
//                 <p className="text-gray-500 mb-6">
//                   Are you sure you want to delete this order?
//                 </p>
//                 <div className="flex gap-3">
//                   <AnimatedButton
//                     variant="secondary"
//                     onClick={() => setDeleteConfirmId(null)}
//                     className="flex-1"
//                   >
//                     Cancel
//                   </AnimatedButton>
//                   <AnimatedButton
//                     variant="danger"
//                     onClick={async () => {
//                       await onDeleteOrder(deleteConfirmId);
//                       setDeleteConfirmId(null);
//                     }}
//                     className="flex-1"
//                   >
//                     Delete
//                   </AnimatedButton>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="p-4 flex flex-col sm:flex-row gap-3 border-b bg-gray-50/50"
//       >
//         <div className="relative flex-1">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by Order ID, Customer, or Table..."
//             className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-orange-400"
//         >
//           <option value="all">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="preparing">Preparing</option>
//           <option value="ready">Ready</option>
//           <option value="served">Served</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 border-b"
//       >
//         <div className="flex justify-between items-center">
//           <span className="text-sm text-gray-600">
//             Showing {filtered.length} of {orders.length} orders
//           </span>
//           <span className="text-sm font-semibold text-orange-600">
//             Total Revenue: RWF {totalRevenue.toLocaleString()}
//           </span>
//         </div>
//       </motion.div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               {[
//                 "Order ID",
//                 "Table",
//                 "Customer",
//                 "Items",
//                 "Total",
//                 "Status",
//                 "Actions",
//               ].map((h, idx) => (
//                 <th
//                   key={h}
//                   className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             <AnimatePresence>
//               {filtered.map((order, idx) => {
//                 const statusConfig = getStatusConfig(order.status);
//                 return (
//                   <motion.tr
//                     key={order._id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     transition={{ delay: idx * 0.03 }}
//                     whileHover={{ backgroundColor: "rgba(251, 146, 60, 0.05)" }}
//                     className="transition"
//                   >
//                     <td className="px-4 py-3 text-sm font-mono font-medium text-gray-700">
//                       {order.orderId?.slice(-8)}
//                     </td>
//                     <td className="px-4 py-3 text-sm">
//                       Table {order.personDetails?.tableNumber}
//                     </td>
//                     <td className="px-4 py-3 text-sm font-medium">
//                       <div>
//                         <div>{order.personDetails?.name || "Guest"}</div>
//                         <div className="text-xs text-gray-400">
//                           {order.personDetails?.orderType || "dine-in"}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 text-sm">
//                       <div>
//                         <div>
//                           {order.orderSummary?.totalItems ||
//                             order.items?.length ||
//                             0}{" "}
//                           items
//                         </div>
//                         <div className="text-xs text-gray-400 line-clamp-1">
//                           {order.items?.map((item) => item.name).join(", ")}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 text-sm font-bold text-orange-600">
//                       RWF {order.orderSummary?.total?.toLocaleString() || 0}
//                     </td>
//                     <td className="px-4 py-3">
//                       <motion.span
//                         whileHover={{ scale: 1.05 }}
//                         className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
//                       >
//                         {statusConfig.icon}
//                         {order.status}
//                       </motion.span>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex gap-2">
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => onViewDetails(order)}
//                           className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
//                         >
//                           <VisibilityIcon fontSize="small" />
//                         </motion.button>
//                         <motion.select
//                           whileHover={{ scale: 1.02 }}
//                           value={order.status}
//                           onChange={(e) =>
//                             onUpdateStatus(order, e.target.value)
//                           }
//                           className="text-xs border rounded-lg px-2 py-1 bg-white focus:ring-1 focus:ring-orange-400 cursor-pointer"
//                         >
//                           {[
//                             "pending",
//                             "confirmed",
//                             "preparing",
//                             "ready",
//                             "served",
//                             "completed",
//                             "cancelled",
//                           ].map((s) => (
//                             <option key={s} className="capitalize">
//                               {s}
//                             </option>
//                           ))}
//                         </motion.select>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => setDeleteConfirmId(order.orderId)}
//                           className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </motion.button>
//                       </div>
//                     </td>
//                   </motion.tr>
//                 );
//               })}
//             </AnimatePresence>
//           </tbody>
//         </table>
//       </div>

//       {filtered.length === 0 && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center py-12"
//         >
//           <OrdersIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//           <p className="text-gray-400">
//             No orders found matching your criteria.
//           </p>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// // ====================== ORDER DETAILS MODAL ======================
// const OrderDetailsModalComponent = ({ order, onClose, onUpdateStatus }) => {
//   if (!order) return null;

//   const calculateSubtotal = () => {
//     return (
//       order.items?.reduce(
//         (sum, item) =>
//           sum +
//           (item.finalPrice || item.originalPrice || 0) * (item.quantity || 1),
//         0
//       ) || 0
//     );
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           transition={{ type: "spring", damping: 25, stiffness: 300 }}
//           className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 p-5 rounded-t-3xl flex justify-between items-center">
//             <h2 className="text-white font-bold text-xl">
//               Order #{order.orderId?.slice(-8)}
//             </h2>
//             <motion.button
//               whileHover={{ scale: 1.1, rotate: 90 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={onClose}
//               className="p-1 hover:bg-white/20 rounded-full"
//             >
//               <CloseIcon className="text-white" />
//             </motion.button>
//           </div>
//           <div className="p-6 space-y-5">
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 {
//                   label: "Customer",
//                   value: order.personDetails?.name || "Guest",
//                 },
//                 {
//                   label: "Table Number",
//                   value: order.personDetails?.tableNumber,
//                 },
//                 {
//                   label: "Order Type",
//                   value: order.personDetails?.orderType || "dine-in",
//                   capitalize: true,
//                 },
//                 {
//                   label: "Created At",
//                   value: new Date(order.createdAt).toLocaleString(),
//                 },
//               ].map((field, idx) => (
//                 <motion.div
//                   key={field.label}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: idx * 0.1 }}
//                   className="bg-gray-50 p-3 rounded-xl"
//                 >
//                   <p className="text-xs text-gray-500">{field.label}</p>
//                   <p
//                     className={`font-semibold text-gray-800 ${
//                       field.capitalize ? "capitalize" : ""
//                     }`}
//                   >
//                     {field.value}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>

//             {order.bookingDetails?.specialInstructions && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="bg-yellow-50 p-3 rounded-xl"
//               >
//                 <p className="text-xs text-gray-500">Special Instructions</p>
//                 <p className="text-sm text-gray-700">
//                   {order.bookingDetails.specialInstructions}
//                 </p>
//               </motion.div>
//             )}

//             {order.notes && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="bg-blue-50 p-3 rounded-xl"
//               >
//                 <p className="text-xs text-gray-500">Notes</p>
//                 <p className="text-sm text-gray-700">{order.notes}</p>
//               </motion.div>
//             )}

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//             >
//               <p className="text-xs text-gray-500 mb-2">Status</p>
//               <motion.select
//                 whileHover={{ scale: 1.02 }}
//                 value={order.status}
//                 onChange={(e) => onUpdateStatus(order, e.target.value)}
//                 className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 cursor-pointer"
//               >
//                 {[
//                   "pending",
//                   "confirmed",
//                   "preparing",
//                   "ready",
//                   "served",
//                   "completed",
//                   "cancelled",
//                 ].map((s) => (
//                   <option key={s} className="capitalize">
//                     {s}
//                   </option>
//                 ))}
//               </motion.select>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.7, type: "spring" }}
//               className="bg-orange-50 p-4 rounded-xl"
//             >
//               <p className="text-xs text-gray-500">Total Amount</p>
//               <p className="text-3xl font-bold text-orange-600">
//                 RWF{" "}
//                 {order.orderSummary?.total?.toLocaleString() ||
//                   calculateSubtotal().toLocaleString()}
//               </p>
//             </motion.div>

//             <div>
//               <p className="text-xs text-gray-500 mb-3">Order Items</p>
//               <div className="space-y-2">
//                 {order.items?.map((item, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.8 + idx * 0.05 }}
//                     whileHover={{ scale: 1.02 }}
//                     className="flex flex-col p-3 bg-gray-50 rounded-xl"
//                   >
//                     <div className="flex justify-between items-center">
//                       <div className="flex items-center gap-3">
//                         <span className="font-bold text-gray-600">
//                           {item.quantity}x
//                         </span>
//                         <span className="font-medium">{item.name}</span>
//                       </div>
//                       <span className="font-bold text-orange-600">
//                         RWF{" "}
//                         {(
//                           (item.finalPrice || item.originalPrice || 0) *
//                           (item.quantity || 1)
//                         ).toLocaleString()}
//                       </span>
//                     </div>
//                     {item.customizations && item.customizations.length > 0 && (
//                       <div className="mt-2 text-xs text-gray-500">
//                         Customizations: {item.customizations.join(", ")}
//                       </div>
//                     )}
//                     {item.specialInstructions && (
//                       <div className="mt-1 text-xs text-gray-500">
//                         Instructions: {item.specialInstructions}
//                       </div>
//                     )}
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {order.bookingDetails?.statusHistory &&
//               order.bookingDetails.statusHistory.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.0 }}
//                 >
//                   <p className="text-xs text-gray-500 mb-2">Status History</p>
//                   <div className="space-y-1">
//                     {order.bookingDetails.statusHistory.map((history, idx) => (
//                       <motion.div
//                         key={idx}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 1.1 + idx * 0.05 }}
//                         className="text-xs text-gray-600"
//                       >
//                         <span className="font-medium capitalize">
//                           {history.status}
//                         </span>{" "}
//                         - {new Date(history.timestamp).toLocaleString()}
//                         {history.note && (
//                           <span className="text-gray-400 ml-2">
//                             ({history.note})
//                           </span>
//                         )}
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// // ====================== NAV BUTTON ======================
// const NavButton = ({ active, onClick, icon, label }) => (
//   <motion.button
//     whileHover={{ scale: 1.05, y: -2 }}
//     whileTap={{ scale: 0.95 }}
//     onClick={onClick}
//     className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
//       active
//         ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
//         : "text-gray-600 hover:bg-gray-100"
//     }`}
//   >
//     {icon}
//     <span className="hidden sm:inline">{label}</span>
//   </motion.button>
// );

// // ====================== MAIN DASHBOARD ======================
// export const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [orders, setOrders] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dailyAnalytics, setDailyAnalytics] = useState(null);
//   const [weeklyAnalytics, setWeeklyAnalytics] = useState(null);
//   const [analyticsLoading, setAnalyticsLoading] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     totalRevenue: 0,
//     activeOrders: 0,
//     pendingOrders: 0,
//   });

//   const fetchOrders = useCallback(async () => {
//     try {
//       const res = await axiosInstance.get("/orders");
//       let ordersData = [];
//       if (res.data?.data && Array.isArray(res.data.data)) {
//         ordersData = res.data.data;
//       } else if (Array.isArray(res.data)) {
//         ordersData = res.data;
//       } else if (res.data?.orders && Array.isArray(res.data.orders)) {
//         ordersData = res.data.orders;
//       }

//       const transformed = ordersData.map((o) => ({
//         ...o,
//         orderSummary: o.orderSummary || {
//           total:
//             o.items?.reduce(
//               (sum, item) =>
//                 sum +
//                 (item.finalPrice || item.originalPrice || 0) *
//                   (item.quantity || 1),
//               0
//             ) || 0,
//           totalItems: o.items?.length || 0,
//         },
//         status: o.status || "pending",
//       }));

//       setOrders(transformed);
//       setStats({
//         totalOrders: transformed.length,
//         totalRevenue: transformed.reduce(
//           (s, o) => s + (o.orderSummary?.total || 0),
//           0
//         ),
//         activeOrders: transformed.filter(
//           (o) => !["completed", "cancelled"].includes(o.status)
//         ).length,
//         pendingOrders: transformed.filter((o) => o.status === "pending").length,
//       });
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       toast.error("Failed to fetch orders");
//     }
//   }, []);

//   const fetchFoods = useCallback(async () => {
//     try {
//       const res = await axiosInstance.get("/foods");
//       let foodsData = [];
//       if (res.data?.success && res.data.foods) {
//         foodsData = res.data.foods;
//       } else if (Array.isArray(res.data)) {
//         foodsData = res.data;
//       } else if (res.data?.data && Array.isArray(res.data.data)) {
//         foodsData = res.data.data;
//       }
//       setMenuItems(foodsData);
//     } catch (err) {
//       console.error("Error fetching foods:", err);
//       toast.error("Failed to fetch menu");
//     }
//   }, []);

//   const fetchAnalytics = async () => {
//     setAnalyticsLoading(true);
//     try {
//       const [daily, weekly] = await Promise.all([
//         axiosInstance.get("/orders/analytics/daily"),
//         axiosInstance.get("/orders/analytics/weekly"),
//       ]);
//       if (daily.data?.success) setDailyAnalytics(daily.data);
//       if (weekly.data?.success) setWeeklyAnalytics(weekly.data);
//     } catch (e) {
//       console.error("Error fetching analytics:", e);
//     } finally {
//       setAnalyticsLoading(false);
//     }
//   };

//   const handleAddFood = async (formData) => {
//     try {
//       const response = await axiosInstance.post("/foods", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       if (response.data?.success) {
//         await fetchFoods();
//         toast.success("Food created successfully!");
//       } else {
//         toast.error(response.data?.message || "Creation failed");
//       }
//     } catch (err) {
//       console.error("Error creating food:", err);
//       toast.error(err.response?.data?.message || "Creation failed");
//     }
//   };

//   const handleEditFood = async (id, formData) => {
//     try {
//       const response = await axiosInstance.put(`/foods/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       if (response.data?.success) {
//         await fetchFoods();
//         toast.success("Food updated successfully!");
//       } else {
//         toast.error(response.data?.message || "Update failed");
//       }
//     } catch (err) {
//       console.error("Error updating food:", err);
//       toast.error(err.response?.data?.message || "Update failed");
//     }
//   };

//   const handleDeleteFood = async (id) => {
//     try {
//       const response = await axiosInstance.delete(`/foods/${id}`);
//       if (response.data?.success) {
//         await fetchFoods();
//         toast.success("Food deleted successfully!");
//       } else {
//         toast.error(response.data?.message || "Delete failed");
//       }
//     } catch (err) {
//       console.error("Error deleting food:", err);
//       toast.error(err.response?.data?.message || "Delete failed");
//     }
//   };

//   const updateOrderStatus = async (order, newStatus) => {
//     try {
//       const response = await axiosInstance.patch(
//         `/orders/${order.orderId}/status`,
//         {
//           status: newStatus,
//         }
//       );
//       if (response.data?.success) {
//         await fetchOrders();
//         toast.success(`Status updated to ${newStatus}!`);
//       } else {
//         toast.error(response.data?.message || "Update failed");
//       }
//     } catch (e) {
//       console.error("Error updating order status:", e);
//       toast.error(e.response?.data?.message || "Update failed");
//     }
//   };

//   const deleteOrder = async (orderId) => {
//     try {
//       const response = await axiosInstance.delete(`/orders/${orderId}`);
//       if (response.data?.success) {
//         await fetchOrders();
//         toast.success("Order deleted successfully!");
//       } else {
//         toast.error(response.data?.message || "Delete failed");
//       }
//     } catch (e) {
//       console.error("Error deleting order:", e);
//       toast.error(e.response?.data?.message || "Delete failed");
//     }
//   };

//   const refreshAll = async () => {
//     setLoading(true);
//     await Promise.all([fetchOrders(), fetchFoods(), fetchAnalytics()]);
//     setLoading(false);
//     toast.success("Data refreshed!");
//   };

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("auth_token");

//       await axios.post(
//         "https://nutriscan-foodanddrinksupply.onrender.com/auth/logout",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       localStorage.removeItem("auth_token");
//       localStorage.removeItem("user_data");
//       sessionStorage.clear();

//       toast.success("Logged out successfully");

//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 1500);
//     } catch (error) {
//       console.error("LOGOUT ERROR:", error.response?.data || error.message);

//       localStorage.removeItem("auth_token");
//       localStorage.removeItem("user_data");
//       sessionStorage.clear();

//       toast.error("Session ended");

//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 1500);
//     }
//   };

//   useEffect(() => {
//     refreshAll();
//   }, []);

//   if (loading)
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="text-center"
//         >
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//             className="rounded-full h-16 w-16 border-b-3 border-orange-500 mx-auto mb-4"
//           />
//           <p className="text-gray-600">Loading dashboard...</p>
//         </motion.div>
//       </div>
//     );

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/20"
//     >
//       <ToastContainer position="top-right" />
//       <motion.header
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-3"
//       >
//         <div className="flex items-center gap-3">
//           <motion.div
//             whileHover={{ rotate: 180 }}
//             transition={{ duration: 0.5 }}
//             className="bg-gradient-to-r from-orange-500 to-red-500 p-2.5 rounded-2xl shadow-lg"
//           >
//             <RestaurantIcon className="text-white" />
//           </motion.div>
//           <div>
//             <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
//               NutriScan·AI
//             </h1>
//             <p className="text-xs text-gray-500">
//               Restaurant Intelligence Dashboard
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <motion.button
//             whileHover={{ scale: 1.1, rotate: 180 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={refreshAll}
//             className="p-2 hover:bg-gray-100 rounded-full transition"
//             title="Refresh Data"
//           >
//             <RefreshIcon />
//           </motion.button>
//           <AnimatedButton
//             variant="danger"
//             onClick={handleLogout}
//             className="flex items-center gap-2"
//           >
//             <LogoutIcon fontSize="small" />
//             <span className="hidden sm:inline">Logout</span>
//           </AnimatedButton>
//         </div>
//       </motion.header>

//       <div className="px-4 sm:px-6 pt-4 sticky top-[73px] z-10 bg-transparent">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex gap-1 bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-sm overflow-x-auto"
//         >
//           <NavButton
//             active={activeTab === "overview"}
//             onClick={() => setActiveTab("overview")}
//             icon={<DashboardIcon />}
//             label="Overview"
//           />
//           <NavButton
//             active={activeTab === "orders"}
//             onClick={() => setActiveTab("orders")}
//             icon={<OrdersIcon />}
//             label="Orders"
//           />
//           <NavButton
//             active={activeTab === "menu"}
//             onClick={() => setActiveTab("menu")}
//             icon={<MenuIcon />}
//             label="Menu"
//           />
//           <NavButton
//             active={activeTab === "analytics"}
//             onClick={() => setActiveTab("analytics")}
//             icon={<AnalyticsIcon />}
//             label="Analytics"
//           />
//         </motion.div>
//       </div>

//       <div className="p-4 sm:p-6">
//         <AnimatePresence mode="wait">
//           {activeTab === "overview" && (
//             <motion.div
//               key="overview"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-6">
//                 <StatCard
//                   title="Total Orders"
//                   value={stats.totalOrders}
//                   icon={<OrdersIcon />}
//                   color="border-blue-500"
//                 />
//                 <StatCard
//                   title="Revenue"
//                   value={`RWF ${stats.totalRevenue.toLocaleString()}`}
//                   icon={<MoneyIcon />}
//                   color="border-green-500"
//                 />
//                 <StatCard
//                   title="Active Orders"
//                   value={stats.activeOrders}
//                   icon={<KitchenIcon />}
//                   color="border-purple-500"
//                 />
//                 <StatCard
//                   title="Pending"
//                   value={stats.pendingOrders}
//                   icon={<TimeIcon />}
//                   color="border-yellow-500"
//                 />
//               </div>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                 <DailyAnalyticsCard
//                   analytics={dailyAnalytics}
//                   loading={analyticsLoading}
//                 />
//                 <WeeklyAnalyticsCard
//                   analytics={weeklyAnalytics}
//                   loading={analyticsLoading}
//                 />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                   <OrdersIcon className="text-orange-500" /> Recent Orders
//                 </h2>
//                 <OrdersTable
//                   orders={orders.slice(0, 5)}
//                   onUpdateStatus={updateOrderStatus}
//                   onViewDetails={setSelectedOrder}
//                   onDeleteOrder={deleteOrder}
//                 />
//               </div>
//             </motion.div>
//           )}
//           {activeTab === "orders" && (
//             <motion.div
//               key="orders"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               <OrdersTable
//                 orders={orders}
//                 onUpdateStatus={updateOrderStatus}
//                 onViewDetails={setSelectedOrder}
//                 onDeleteOrder={deleteOrder}
//               />
//             </motion.div>
//           )}
//           {activeTab === "menu" && (
//             <motion.div
//               key="menu"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               <MenuManagement
//                 menuItems={menuItems}
//                 onAddItem={handleAddFood}
//                 onEditItem={handleEditFood}
//                 onDeleteItem={handleDeleteFood}
//                 onRefresh={fetchFoods}
//               />
//             </motion.div>
//           )}
//           {activeTab === "analytics" && (
//             <motion.div
//               key="analytics"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-6"
//             >
//               <DailyAnalyticsCard
//                 analytics={dailyAnalytics}
//                 loading={analyticsLoading}
//               />
//               <WeeklyAnalyticsCard
//                 analytics={weeklyAnalytics}
//                 loading={analyticsLoading}
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//       {selectedOrder && (
//         <OrderDetailsModalComponent
//           order={selectedOrder}
//           onClose={() => setSelectedOrder(null)}
//           onUpdateStatus={updateOrderStatus}
//         />
//       )}
//     </motion.div>
//   );
// };

// import React, { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Icons
// import {
//   Dashboard as DashboardIcon,
//   RestaurantMenu as MenuIcon,
//   ShoppingCart as OrdersIcon,
//   Analytics as AnalyticsIcon,
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Close as CloseIcon,
//   CloudUpload as CloudUploadIcon,
//   Search as SearchIcon,
//   Refresh as RefreshIcon,
//   AttachMoney as MoneyIcon,
//   AccessTime as TimeIcon,
//   Person as PersonIcon,
//   Restaurant as RestaurantIcon,
//   Visibility as VisibilityIcon,
//   ListAlt as ListAltIcon,
//   Healing as HealingIcon,
//   Warning as WarningIcon,
//   Today as TodayIcon,
//   DateRange as DateRangeIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   Kitchen as KitchenIcon,
//   ArrowUpward as ArrowUpIcon,
//   ArrowDownward as ArrowDownIcon,
//   LocalOffer as LocalOfferIcon,
//   DeleteSweep as DeleteSweepIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";

// // ====================== API CONFIG ======================
// const API_BASE = "https://nutriscan-foodanddrinksupply.onrender.com";
// const axiosInstance = axios.create({ baseURL: API_BASE, timeout: 30000 });

// // ====================== AUTH CONTEXT ======================
// const AuthContext = React.createContext(null);

// // Mock authentication - replace with your actual auth logic
// const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     return localStorage.getItem("auth_token") !== null;
//   });

//   const login = (token) => {
//     localStorage.setItem("auth_token", token);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("auth_token");
//     setIsAuthenticated(false);
//     toast.info("Logged out successfully");
//     window.location.href = "/login";
//   };

//   return { isAuthenticated, login, logout };
// };

// // ====================== ANIMATED STAT CARD ======================
// const StatCard = ({ title, value, icon, color, trend, trendValue }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     whileHover={{ y: -5, scale: 1.02 }}
//     transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
//     className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-4 sm:p-5 border-t-4 ${color} hover:shadow-xl transition-all duration-300`}
//   >
//     <div className="flex justify-between items-start">
//       <div className="flex-1">
//         <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide">
//           {title}
//         </p>
//         <motion.p
//           initial={{ scale: 0.5 }}
//           animate={{ scale: 1 }}
//           className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mt-2 break-words"
//         >
//           {value}
//         </motion.p>
//         {trend && (
//           <motion.div
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex items-center gap-1 mt-2"
//           >
//             {trend === "up" ? (
//               <ArrowUpIcon className="text-green-500 text-sm" />
//             ) : (
//               <ArrowDownIcon className="text-red-500 text-sm" />
//             )}
//             <span
//               className={`text-xs font-medium ${
//                 trend === "up" ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {trendValue}
//             </span>
//           </motion.div>
//         )}
//       </div>
//       <motion.div
//         whileHover={{ rotate: 360 }}
//         transition={{ duration: 0.5 }}
//         className={`p-3 rounded-2xl bg-gradient-to-br ${color
//           .replace("border-", "from-")
//           .replace("-500", "-100")} to-white shadow-inner`}
//       >
//         {icon}
//       </motion.div>
//     </div>
//   </motion.div>
// );

// // ====================== ANIMATED BUTTON ======================
// const AnimatedButton = ({
//   onClick,
//   children,
//   variant = "primary",
//   className = "",
//   disabled = false,
//   isLoading = false,
// }) => {
//   const variants = {
//     primary:
//       "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white",
//     secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
//     danger: "bg-red-500 hover:bg-red-600 text-white",
//     success: "bg-green-500 hover:bg-green-600 text-white",
//   };

//   return (
//     <motion.button
//       whileHover={!disabled && !isLoading ? { scale: 1.05, y: -2 } : {}}
//       whileTap={!disabled && !isLoading ? { scale: 0.95 } : {}}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       onClick={onClick}
//       disabled={disabled || isLoading}
//       className={`${variants[variant]} px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${className}`}
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

// // ====================== FOOD DETAILS MODAL ======================
// const FoodDetailsModal = ({ item, onClose }) => {
//   if (!item) return null;
//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0, y: 20 }}
//           animate={{ scale: 1, opacity: 1, y: 0 }}
//           exit={{ scale: 0.9, opacity: 0, y: 20 }}
//           transition={{ type: "spring", damping: 25, stiffness: 300 }}
//           className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="relative">
//             <motion.img
//               initial={{ scale: 1.1, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 0.5 }}
//               src={
//                 item.image ||
//                 "https://via.placeholder.com/400x200?text=No+Image"
//               }
//               alt={item.name}
//               className="w-full h-48 sm:h-64 object-cover rounded-t-3xl"
//               onError={(e) => {
//                 e.target.src =
//                   "https://via.placeholder.com/400x200?text=No+Image";
//               }}
//             />
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="absolute top-4 right-4"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.1, rotate: 90 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={onClose}
//                 className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition"
//               >
//                 <CloseIcon className="text-white" />
//               </motion.button>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6"
//             >
//               <h2 className="text-white text-2xl sm:text-3xl font-bold">
//                 {item.name}
//               </h2>
//               <p className="text-white/90 text-sm mt-1">{item.category}</p>
//             </motion.div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="p-5 sm:p-6 space-y-5"
//           >
//             <div className="flex justify-between items-center pb-3 border-b">
//               <div>
//                 <p className="text-xs text-gray-500">Price</p>
//                 <p className="text-2xl font-bold text-orange-600">
//                   RWF {item.price?.toLocaleString()}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Prep Time</p>
//                 <p className="text-lg font-semibold flex items-center gap-1">
//                   <TimeIcon fontSize="small" className="text-gray-400" />{" "}
//                   {item.prepTime} min
//                 </p>
//               </div>
//               <div>
//                 <motion.span
//                   initial={{ scale: 0.8 }}
//                   animate={{ scale: 1 }}
//                   className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
//                     item.purineLevel === "low"
//                       ? "bg-green-100 text-green-700"
//                       : item.purineLevel === "moderate"
//                       ? "bg-yellow-100 text-yellow-700"
//                       : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   {item.purineLevel?.toUpperCase()} Purine
//                 </motion.span>
//               </div>
//             </div>

//             {item.description && (
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                   📖 Description
//                 </h3>
//                 <p className="text-sm text-gray-600 leading-relaxed">
//                   {item.description}
//                 </p>
//               </motion.div>
//             )}

//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.5 }}
//             >
//               <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                 <ListAltIcon className="text-emerald-600" /> Ingredients
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {item.ingredients?.map((ing, idx) => (
//                   <motion.span
//                     key={idx}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: idx * 0.03 }}
//                     whileHover={{ scale: 1.05 }}
//                     className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium"
//                   >
//                     {ing}
//                   </motion.span>
//                 ))}
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.6 }}
//             >
//               <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                 <HealingIcon className="text-blue-500" /> Dietary Information
//               </h3>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {[
//                   { label: "Gluten", value: item.containsGluten },
//                   { label: "Peanuts", value: item.containsPeanuts },
//                   { label: "Shellfish", value: item.containsShellfish },
//                   { label: "Dairy", value: item.containsDairy },
//                   { label: "High Salt", value: item.highSalt },
//                 ].map((diet, idx) => (
//                   <motion.div
//                     key={diet.label}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: idx * 0.05 }}
//                     className={`flex items-center gap-2 p-2 rounded-lg ${
//                       diet.value ? "bg-red-50" : "bg-green-50"
//                     }`}
//                   >
//                     <motion.span
//                       animate={{ scale: diet.value ? [1, 1.2, 1] : 1 }}
//                       transition={{
//                         duration: 0.5,
//                         repeat: diet.value ? Infinity : 0,
//                       }}
//                       className={`w-2 h-2 rounded-full ${
//                         diet.value ? "bg-red-500" : "bg-green-500"
//                       }`}
//                     ></motion.span>
//                     <span className="text-sm">
//                       {diet.label}: {diet.value ? "Contains" : "Free"}
//                     </span>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             {(item.refluxTriggers?.length > 0 ||
//               item.migraineTriggers?.length > 0) && (
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.7 }}
//               >
//                 <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                   <WarningIcon className="text-orange-500" /> Health Triggers
//                 </h3>
//                 {item.refluxTriggers?.length > 0 && (
//                   <div className="mb-2">
//                     <p className="text-xs text-gray-500 mb-1">
//                       Reflux Triggers:
//                     </p>
//                     <div className="flex flex-wrap gap-1">
//                       {item.refluxTriggers.map((t, i) => (
//                         <motion.span
//                           key={i}
//                           initial={{ opacity: 0, scale: 0.8 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           transition={{ delay: i * 0.05 }}
//                           className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full"
//                         >
//                           {t}
//                         </motion.span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {item.migraineTriggers?.length > 0 && (
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">
//                       Migraine Triggers:
//                     </p>
//                     <div className="flex flex-wrap gap-1">
//                       {item.migraineTriggers.map((t, i) => (
//                         <motion.span
//                           key={i}
//                           initial={{ opacity: 0, scale: 0.8 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           transition={{ delay: i * 0.05 }}
//                           className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
//                         >
//                           {t}
//                         </motion.span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             )}
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// // ====================== DAILY ANALYTICS CARD ======================
// const DailyAnalyticsCard = ({ analytics, loading }) => {
//   if (loading)
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="bg-white rounded-2xl shadow-lg p-6"
//       >
//         <div className="space-y-4">
//           <motion.div
//             animate={{ opacity: [0.5, 1, 0.5] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             className="h-32 bg-gray-200 rounded"
//           />
//         </div>
//       </motion.div>
//     );

//   if (!analytics || !analytics.success)
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-400"
//       >
//         No daily data available
//       </motion.div>
//     );

//   const mostOrdered = analytics.mostOrderedPlates?.[0];
//   const leastOrdered = analytics.leastOrderedPlates?.[0];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-gradient-to-br from-white to-orange-50/30 rounded-2xl shadow-lg p-5 sm:p-6"
//     >
//       <motion.div
//         initial={{ scale: 0.8 }}
//         animate={{ scale: 1 }}
//         className="flex items-center gap-2 mb-5"
//       >
//         <motion.div
//           whileHover={{ rotate: 360 }}
//           transition={{ duration: 0.5 }}
//           className="p-2 bg-orange-100 rounded-xl"
//         >
//           <TodayIcon className="text-orange-600" />
//         </motion.div>
//         <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//           Daily Analytics
//         </h2>
//       </motion.div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//         <div className="space-y-4">
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl text-white"
//           >
//             <p className="text-sm opacity-90">Total Orders Today</p>
//             <motion.p
//               initial={{ scale: 0.5 }}
//               animate={{ scale: 1 }}
//               className="text-3xl font-bold"
//             >
//               {analytics.totalOrders || 0}
//             </motion.p>
//           </motion.div>
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-xl text-white"
//           >
//             <p className="text-sm opacity-90">Total Income Today</p>
//             <motion.p
//               initial={{ scale: 0.5 }}
//               animate={{ scale: 1 }}
//               className="text-2xl font-bold"
//             >
//               RWF {(analytics.totalIncome || 0).toLocaleString()}
//             </motion.p>
//           </motion.div>
//         </div>

//         <div>
//           <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//             <LocalOfferIcon fontSize="small" /> Top Selling Items
//           </p>
//           <div className="space-y-2">
//             {analytics.mostOrderedPlates?.slice(0, 5).map((plate, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 whileHover={{ scale: 1.02, x: 5 }}
//                 className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
//               >
//                 <span className="text-sm font-medium text-gray-700">
//                   {plate.name}
//                 </span>
//                 <motion.span
//                   initial={{ scale: 0.8 }}
//                   animate={{ scale: 1 }}
//                   className="text-sm font-bold text-orange-600"
//                 >
//                   {plate.quantity} sold
//                 </motion.span>
//               </motion.div>
//             ))}
//             {(!analytics.mostOrderedPlates || analytics.mostOrderedPlates.length === 0) && (
//               <p className="text-sm text-gray-400 text-center py-4">No orders today</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ====================== WEEKLY ANALYTICS CARD ======================
// const WeeklyAnalyticsCard = ({ analytics, loading }) => {
//   if (loading)
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="bg-white rounded-2xl shadow-lg p-6"
//       >
//         <motion.div
//           animate={{ opacity: [0.5, 1, 0.5] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//           className="h-64 bg-gray-200 rounded"
//         />
//       </motion.div>
//     );

//   if (!analytics || !analytics.success)
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-400"
//       >
//         No weekly data available
//       </motion.div>
//     );

//   const totalOrders = analytics.totalOrders || 0;
//   const totalIncome = analytics.totalIncome || 0;
//   const mostOrdered = analytics.mostOrderedPlates?.[0];
//   const leastOrdered = analytics.leastOrderedPlates?.[0];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg p-5 sm:p-6"
//     >
//       <motion.div
//         initial={{ scale: 0.8 }}
//         animate={{ scale: 1 }}
//         className="flex items-center gap-2 mb-5"
//       >
//         <motion.div
//           whileHover={{ rotate: 360 }}
//           transition={{ duration: 0.5 }}
//           className="p-2 bg-blue-100 rounded-xl"
//         >
//           <DateRangeIcon className="text-blue-600" />
//         </motion.div>
//         <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//           Weekly Analytics
//         </h2>
//         <span className="text-xs text-gray-400 ml-2 capitalize">
//           ({analytics.period})
//         </span>
//       </motion.div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl text-white"
//         >
//           <p className="text-sm opacity-90">Total Orders (Week)</p>
//           <motion.p
//             initial={{ scale: 0.5 }}
//             animate={{ scale: 1 }}
//             className="text-3xl font-bold"
//           >
//             {totalOrders}
//           </motion.p>
//         </motion.div>
//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-xl text-white"
//         >
//           <p className="text-sm opacity-90">Total Income (Week)</p>
//           <motion.p
//             initial={{ scale: 0.5 }}
//             animate={{ scale: 1 }}
//             className="text-2xl font-bold"
//           >
//             RWF {totalIncome.toLocaleString()}
//           </motion.p>
//         </motion.div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//         <div>
//           <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//             <ArrowUpIcon fontSize="small" className="text-green-500" /> Most Ordered Plates
//           </p>
//           <div className="space-y-2">
//             {analytics.mostOrderedPlates?.map((plate, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 whileHover={{ scale: 1.02, x: 5 }}
//                 className="flex justify-between items-center p-2 bg-green-50 rounded-lg"
//               >
//                 <span className="text-sm font-medium text-gray-700">
//                   {plate.name}
//                 </span>
//                 <motion.span
//                   initial={{ scale: 0.8 }}
//                   animate={{ scale: 1 }}
//                   className="text-sm font-bold text-green-600"
//                 >
//                   {plate.quantity} sold
//                 </motion.span>
//               </motion.div>
//             ))}
//             {(!analytics.mostOrderedPlates || analytics.mostOrderedPlates.length === 0) && (
//               <p className="text-sm text-gray-400 text-center py-4">No orders this week</p>
//             )}
//           </div>
//         </div>

//         <div>
//           <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//             <ArrowDownIcon fontSize="small" className="text-red-500" /> Least Ordered Plates
//           </p>
//           <div className="space-y-2">
//             {analytics.leastOrderedPlates?.map((plate, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 whileHover={{ scale: 1.02, x: 5 }}
//                 className="flex justify-between items-center p-2 bg-red-50 rounded-lg"
//               >
//                 <span className="text-sm font-medium text-gray-700">
//                   {plate.name}
//                 </span>
//                 <motion.span
//                   initial={{ scale: 0.8 }}
//                   animate={{ scale: 1 }}
//                   className="text-sm font-bold text-red-600"
//                 >
//                   {plate.quantity} sold
//                 </motion.span>
//               </motion.div>
//             ))}
//             {(!analytics.leastOrderedPlates || analytics.leastOrderedPlates.length === 0) && (
//               <p className="text-sm text-gray-400 text-center py-4">All items sold evenly</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ====================== MENU MANAGEMENT ======================
// const MenuManagement = ({
//   menuItems,
//   onAddItem,
//   onEditItem,
//   onDeleteItem,
//   onRefresh,
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [loadingUpload, setLoadingUpload] = useState(false);
//   const [viewDetailsItem, setViewDetailsItem] = useState(null);
//   const [deleteConfirmId, setDeleteConfirmId] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const [imageFile, setImageFile] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     ingredients: "",
//     description: "",
//     prepTime: "",
//     category: "Mains",
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: "",
//     migraineTriggers: "",
//     highSalt: false,
//     sodiumMg: "",
//     nutritionalInfo: "",
//   });

//   const categories = [
//     "Mains",
//     "Appetizers",
//     "Seafood",
//     "Vegan",
//     "Desserts",
//     "Beverages",
//     "Soups",
//     "Salads",
//   ];

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formData.name || !formData.price) {
//       toast.error("Please fill in name and price");
//       return;
//     }
//     setLoadingUpload(true);
//     try {
//       const submitData = new FormData();
//       submitData.append("name", formData.name);
//       submitData.append("price", formData.price);
//       submitData.append(
//         "ingredients",
//         JSON.stringify(
//           formData.ingredients
//             .split(",")
//             .map((i) => i.trim())
//             .filter((i) => i)
//         )
//       );
//       submitData.append("description", formData.description);
//       submitData.append("prepTime", formData.prepTime || "15");
//       submitData.append("category", formData.category);
//       submitData.append("purineLevel", formData.purineLevel);
//       submitData.append("containsGluten", String(formData.containsGluten));
//       submitData.append("containsPeanuts", String(formData.containsPeanuts));
//       submitData.append(
//         "containsShellfish",
//         String(formData.containsShellfish)
//       );
//       submitData.append("containsDairy", String(formData.containsDairy));
//       submitData.append("highSalt", String(formData.highSalt));
//       submitData.append(
//         "refluxTriggers",
//         JSON.stringify(
//           formData.refluxTriggers
//             .split(",")
//             .map((s) => s.trim())
//             .filter((s) => s)
//         )
//       );
//       submitData.append(
//         "migraineTriggers",
//         JSON.stringify(
//           formData.migraineTriggers
//             .split(",")
//             .map((s) => s.trim())
//             .filter((s) => s)
//         )
//       );
//       if (formData.sodiumMg) submitData.append("sodiumMg", formData.sodiumMg);
//       if (formData.nutritionalInfo)
//         submitData.append("nutritionalInfo", formData.nutritionalInfo);
//       if (imageFile) submitData.append("image", imageFile);

//       if (editingItem) {
//         await onEditItem(editingItem._id, submitData);
//         toast.success("Item updated successfully!");
//       } else {
//         await onAddItem(submitData);
//         toast.success("Item created successfully!");
//       }
//       setShowModal(false);
//       resetForm();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Operation failed");
//     } finally {
//       setLoadingUpload(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       price: "",
//       ingredients: "",
//       description: "",
//       prepTime: "",
//       category: "Mains",
//       purineLevel: "low",
//       containsGluten: false,
//       containsPeanuts: false,
//       containsShellfish: false,
//       containsDairy: false,
//       refluxTriggers: "",
//       migraineTriggers: "",
//       highSalt: false,
//       sodiumMg: "",
//       nutritionalInfo: "",
//     });
//     setImageFile(null);
//     setImagePreview("");
//     setEditingItem(null);
//   };

//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setFormData({
//       name: item.name,
//       price: item.price.toString(),
//       ingredients: item.ingredients?.join(", ") || "",
//       description: item.description || "",
//       prepTime: item.prepTime?.toString() || "",
//       category: item.category || "Mains",
//       purineLevel: item.purineLevel,
//       containsGluten: item.containsGluten,
//       containsPeanuts: item.containsPeanuts,
//       containsShellfish: item.containsShellfish,
//       containsDairy: item.containsDairy,
//       refluxTriggers: item.refluxTriggers?.join(", ") || "",
//       migraineTriggers: item.migraineTriggers?.join(", ") || "",
//       highSalt: item.highSalt,
//       sodiumMg: item.sodiumMg?.toString() || "",
//       nutritionalInfo: item.nutritionalInfo
//         ? JSON.stringify(item.nutritionalInfo)
//         : "",
//     });
//     setImagePreview(item.image || "");
//     setShowModal(true);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white rounded-2xl shadow-xl p-4 sm:p-6"
//     >
//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {deleteConfirmId && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-2xl max-w-md w-full p-6"
//             >
//               <div className="text-center">
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ type: "spring" }}
//                   className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
//                 >
//                   <DeleteIcon className="text-red-600 text-3xl" />
//                 </motion.div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">
//                   Delete Item
//                 </h3>
//                 <p className="text-gray-500 mb-6">
//                   Are you sure you want to delete this item? This action cannot
//                   be undone.
//                 </p>
//                 <div className="flex gap-3">
//                   <AnimatedButton
//                     variant="secondary"
//                     onClick={() => setDeleteConfirmId(null)}
//                     className="flex-1"
//                   >
//                     Cancel
//                   </AnimatedButton>
//                   <AnimatedButton
//                     variant="danger"
//                     onClick={async () => {
//                       await onDeleteItem(deleteConfirmId);
//                       setDeleteConfirmId(null);
//                     }}
//                     className="flex-1"
//                   >
//                     Delete
//                   </AnimatedButton>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b"
//       >
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             <MenuIcon className="text-orange-500" /> Menu Management
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Manage your restaurant's food items
//           </p>
//         </div>
//         <div className="flex gap-2 w-full sm:w-auto">
//           <AnimatedButton
//             variant="secondary"
//             onClick={onRefresh}
//             className="flex-1 sm:flex-none"
//           >
//             <RefreshIcon fontSize="small" /> Sync
//           </AnimatedButton>
//           <AnimatedButton
//             variant="primary"
//             onClick={() => {
//               resetForm();
//               setShowModal(true);
//             }}
//             className="flex-1 sm:flex-none"
//           >
//             <AddIcon fontSize="small" /> Add Item
//           </AnimatedButton>
//         </div>
//       </motion.div>

//       {/* Menu Grid */}
//       {menuItems.length === 0 ? (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center py-12"
//         >
//           <MenuIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//           <p className="text-gray-400">
//             No menu items found. Click "Add Item" to create your first menu
//             item.
//           </p>
//         </motion.div>
//       ) : (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
//         >
//           <AnimatePresence>
//             {menuItems.map((item, idx) => (
//               <motion.div
//                 key={item._id}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 transition={{ delay: idx * 0.05 }}
//                 whileHover={{ y: -5 }}
//                 className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
//               >
//                 <div className="relative h-48 overflow-hidden">
//                   <motion.img
//                     whileHover={{ scale: 1.1 }}
//                     transition={{ duration: 0.5 }}
//                     src={
//                       item.image ||
//                       "https://via.placeholder.com/400x200?text=No+Image"
//                     }
//                     alt={item.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.src =
//                         "https://via.placeholder.com/400x200?text=No+Image";
//                     }}
//                   />
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     whileHover={{ opacity: 1 }}
//                     className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3"
//                   >
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => handleEdit(item)}
//                       className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
//                     >
//                       <EditIcon fontSize="small" />
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => setViewDetailsItem(item)}
//                       className="p-2 bg-emerald-500 rounded-full text-white hover:bg-emerald-600 transition"
//                     >
//                       <VisibilityIcon fontSize="small" />
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => setDeleteConfirmId(item._id)}
//                       className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </motion.button>
//                   </motion.div>
//                   <div className="absolute top-3 right-3">
//                     <motion.span
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       className={`px-2 py-1 rounded-lg text-xs font-medium ${
//                         item.purineLevel === "low"
//                           ? "bg-green-500"
//                           : item.purineLevel === "moderate"
//                           ? "bg-yellow-500"
//                           : "bg-red-500"
//                       } text-white shadow-lg inline-block`}
//                     >
//                       {item.purineLevel}
//                     </motion.span>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
//                     {item.name}
//                   </h3>
//                   <p className="text-xs text-gray-500 line-clamp-2 mb-2">
//                     {item.description}
//                   </p>
//                   <div className="flex flex-wrap gap-1 mb-3">
//                     {item.ingredients?.slice(0, 3).map((ing, i) => (
//                       <span
//                         key={i}
//                         className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600"
//                       >
//                         {ing}
//                       </span>
//                     ))}
//                     {item.ingredients?.length > 3 && (
//                       <span className="text-xs text-gray-400">
//                         +{item.ingredients.length - 3}
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-orange-600 font-bold text-xl">
//                       RWF {item.price?.toLocaleString()}
//                     </span>
//                     <span className="text-gray-400 text-xs flex items-center gap-1">
//                       <TimeIcon fontSize="small" /> {item.prepTime} min
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       )}

//       {/* Create/Edit Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//             onClick={() => setShowModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-5 rounded-t-3xl flex justify-between items-center">
//                 <h2 className="text-white font-bold text-xl">
//                   {editingItem ? "Edit Menu Item" : "Create New Menu Item"}
//                 </h2>
//                 <motion.button
//                   whileHover={{ scale: 1.1, rotate: 90 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setShowModal(false)}
//                   className="p-1 hover:bg-white/20 rounded-full transition"
//                 >
//                   <CloseIcon className="text-white" />
//                 </motion.button>
//               </div>
//               <div className="p-5 sm:p-6 space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <motion.input
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 }}
//                     type="text"
//                     placeholder="Item Name *"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//                   />
//                   <motion.input
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 }}
//                     type="number"
//                     placeholder="Price (RWF) *"
//                     value={formData.price}
//                     onChange={(e) =>
//                       setFormData({ ...formData, price: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   />
//                 </div>
//                 <motion.textarea
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                   placeholder="Ingredients (comma separated)"
//                   value={formData.ingredients}
//                   onChange={(e) =>
//                     setFormData({ ...formData, ingredients: e.target.value })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   rows={2}
//                 />
//                 <motion.textarea
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   placeholder="Description"
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//                   rows={2}
//                 />
//                 <div className="grid grid-cols-2 gap-4">
//                   <motion.input
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.4 }}
//                     type="number"
//                     placeholder="Prep time (minutes)"
//                     value={formData.prepTime}
//                     onChange={(e) =>
//                       setFormData({ ...formData, prepTime: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl"
//                   />
//                   <motion.select
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.4 }}
//                     value={formData.category}
//                     onChange={(e) =>
//                       setFormData({ ...formData, category: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-xl bg-white"
//                   >
//                     {categories.map((c) => (
//                       <option key={c}>{c}</option>
//                     ))}
//                   </motion.select>
//                 </div>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5 }}
//                   className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-orange-400 transition cursor-pointer"
//                 >
//                   <label className="flex flex-col items-center gap-2 cursor-pointer">
//                     <CloudUploadIcon className="text-gray-400 text-4xl" />
//                     <span className="text-sm text-gray-500">
//                       Click to upload image
//                     </span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="hidden"
//                     />
//                   </label>
//                   {imagePreview && (
//                     <motion.img
//                       initial={{ scale: 0.8, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       src={imagePreview}
//                       alt="preview"
//                       className="mt-3 h-32 w-32 object-cover rounded-xl mx-auto shadow-md"
//                     />
//                   )}
//                 </motion.div>
//                 <motion.textarea
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.6 }}
//                   placeholder='Nutritional Info (JSON) e.g. {"calories": 450, "protein": "25g"}'
//                   value={formData.nutritionalInfo}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       nutritionalInfo: e.target.value,
//                     })
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-xl font-mono text-sm"
//                   rows={2}
//                 />
//                 <div className="grid grid-cols-2 gap-4">
//                   <motion.select
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.7 }}
//                     value={formData.purineLevel}
//                     onChange={(e) =>
//                       setFormData({ ...formData, purineLevel: e.target.value })
//                     }
//                     className="w-full p-3 border rounded-xl"
//                   >
//                     <option value="low">Low Purine</option>
//                     <option value="moderate">Moderate Purine</option>
//                     <option value="high">High Purine</option>
//                   </motion.select>
//                   <motion.input
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.7 }}
//                     type="number"
//                     placeholder="Sodium (mg)"
//                     value={formData.sodiumMg}
//                     onChange={(e) =>
//                       setFormData({ ...formData, sodiumMg: e.target.value })
//                     }
//                     className="w-full p-3 border rounded-xl"
//                   />
//                 </div>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.8 }}
//                   className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-xl"
//                 >
//                   {[
//                     { label: "Gluten", key: "containsGluten" },
//                     { label: "Peanuts", key: "containsPeanuts" },
//                     { label: "Shellfish", key: "containsShellfish" },
//                     { label: "Dairy", key: "containsDairy" },
//                     {
//                       label: "High Salt",
//                       key: "highSalt",
//                       colSpan: "col-span-2",
//                     },
//                   ].map((option) => (
//                     <label
//                       key={option.key}
//                       className={`flex items-center gap-2 text-sm ${
//                         option.colSpan || ""
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={formData[option.key]}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             [option.key]: e.target.checked,
//                           })
//                         }
//                         className="w-4 h-4 rounded"
//                       />{" "}
//                       {option.label}
//                     </label>
//                   ))}
//                 </motion.div>
//                 <motion.textarea
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.9 }}
//                   placeholder="Reflux Triggers (comma separated)"
//                   value={formData.refluxTriggers}
//                   onChange={(e) =>
//                     setFormData({ ...formData, refluxTriggers: e.target.value })
//                   }
//                   className="w-full p-3 border rounded-xl"
//                   rows={2}
//                 />
//                 <motion.textarea
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.0 }}
//                   placeholder="Migraine Triggers (comma separated)"
//                   value={formData.migraineTriggers}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       migraineTriggers: e.target.value,
//                     })
//                   }
//                   className="w-full p-3 border rounded-xl"
//                   rows={2}
//                 />
//                 <AnimatedButton
//                   variant="primary"
//                   onClick={handleSubmit}
//                   isLoading={loadingUpload}
//                   className="w-full py-3 text-lg"
//                 >
//                   {editingItem ? "Update Item" : "Create Item"}
//                 </AnimatedButton>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <FoodDetailsModal
//         item={viewDetailsItem}
//         onClose={() => setViewDetailsItem(null)}
//       />
//     </motion.div>
//   );
// };

// // ====================== ORDERS TABLE ======================
// const OrdersTable = ({
//   orders,
//   onUpdateStatus,
//   onViewDetails,
//   onDeleteOrder,
// }) => {
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [deleteConfirmId, setDeleteConfirmId] = useState(null);

//   const getStatusConfig = (status) => {
//     const config = {
//       pending: {
//         color: "bg-yellow-100 text-yellow-700",
//         icon: <TimeIcon fontSize="small" />,
//       },
//       confirmed: {
//         color: "bg-blue-100 text-blue-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       preparing: {
//         color: "bg-purple-100 text-purple-700",
//         icon: <KitchenIcon fontSize="small" />,
//       },
//       ready: {
//         color: "bg-green-100 text-green-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       served: {
//         color: "bg-teal-100 text-teal-700",
//         icon: <RestaurantIcon fontSize="small" />,
//       },
//       completed: {
//         color: "bg-gray-100 text-gray-700",
//         icon: <CheckCircleIcon fontSize="small" />,
//       },
//       cancelled: {
//         color: "bg-red-100 text-red-700",
//         icon: <CancelIcon fontSize="small" />,
//       },
//     };
//     return config[status] || config.pending;
//   };

//   const filtered = orders.filter(
//     (o) =>
//       (o.orderId?.toLowerCase().includes(search.toLowerCase()) ||
//         o.personDetails?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         o.personDetails?.tableNumber?.toString().includes(search)) &&
//       (statusFilter === "all" || o.status === statusFilter)
//   );

//   const totalRevenue = filtered.reduce(
//     (sum, order) => sum + (order.orderSummary?.total || 0),
//     0
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white rounded-2xl shadow-xl overflow-hidden"
//     >
//       <AnimatePresence>
//         {deleteConfirmId && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.9 }}
//               className="bg-white rounded-2xl max-w-md w-full p-6"
//             >
//               <div className="text-center">
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ type: "spring" }}
//                 >
//                   <DeleteSweepIcon className="text-red-500 text-5xl mb-4" />
//                 </motion.div>
//                 <h3 className="text-xl font-bold mb-2">Delete Order</h3>
//                 <p className="text-gray-500 mb-6">
//                   Are you sure you want to delete this order?
//                 </p>
//                 <div className="flex gap-3">
//                   <AnimatedButton
//                     variant="secondary"
//                     onClick={() => setDeleteConfirmId(null)}
//                     className="flex-1"
//                   >
//                     Cancel
//                   </AnimatedButton>
//                   <AnimatedButton
//                     variant="danger"
//                     onClick={async () => {
//                       await onDeleteOrder(deleteConfirmId);
//                       setDeleteConfirmId(null);
//                     }}
//                     className="flex-1"
//                   >
//                     Delete
//                   </AnimatedButton>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="p-4 flex flex-col sm:flex-row gap-3 border-b bg-gray-50/50"
//       >
//         <div className="relative flex-1">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by Order ID, Customer, or Table..."
//             className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-orange-400"
//         >
//           <option value="all">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="preparing">Preparing</option>
//           <option value="ready">Ready</option>
//           <option value="served">Served</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 border-b"
//       >
//         <div className="flex justify-between items-center">
//           <span className="text-sm text-gray-600">
//             Showing {filtered.length} of {orders.length} orders
//           </span>
//           <span className="text-sm font-semibold text-orange-600">
//             Total Revenue: RWF {totalRevenue.toLocaleString()}
//           </span>
//         </div>
//       </motion.div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               {[
//                 "Order ID",
//                 "Table",
//                 "Customer",
//                 "Items",
//                 "Total",
//                 "Status",
//                 "Actions",
//               ].map((h, idx) => (
//                 <th
//                   key={h}
//                   className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             <AnimatePresence>
//               {filtered.map((order, idx) => {
//                 const statusConfig = getStatusConfig(order.status);
//                 return (
//                   <motion.tr
//                     key={order._id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     transition={{ delay: idx * 0.03 }}
//                     whileHover={{ backgroundColor: "rgba(251, 146, 60, 0.05)" }}
//                     className="transition"
//                   >
//                     <td className="px-4 py-3 text-sm font-mono font-medium text-gray-700">
//                       {order.orderId?.slice(-8)}
//                     </td>
//                     <td className="px-4 py-3 text-sm">
//                       Table {order.personDetails?.tableNumber}
//                     </td>
//                     <td className="px-4 py-3 text-sm font-medium">
//                       <div>
//                         <div>{order.personDetails?.name || "Guest"}</div>
//                         <div className="text-xs text-gray-400">
//                           {order.personDetails?.orderType || "dine-in"}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 text-sm">
//                       <div>
//                         <div>
//                           {order.orderSummary?.totalItems ||
//                             order.items?.length ||
//                             0}{" "}
//                           items
//                         </div>
//                         <div className="text-xs text-gray-400 line-clamp-1">
//                           {order.items?.map((item) => item.name).join(", ")}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 text-sm font-bold text-orange-600">
//                       RWF {order.orderSummary?.total?.toLocaleString() || 0}
//                     </td>
//                     <td className="px-4 py-3">
//                       <motion.span
//                         whileHover={{ scale: 1.05 }}
//                         className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
//                       >
//                         {statusConfig.icon}
//                         {order.status}
//                       </motion.span>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex gap-2">
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => onViewDetails(order)}
//                           className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
//                         >
//                           <VisibilityIcon fontSize="small" />
//                         </motion.button>
//                         <motion.select
//                           whileHover={{ scale: 1.02 }}
//                           value={order.status}
//                           onChange={(e) =>
//                             onUpdateStatus(order, e.target.value)
//                           }
//                           className="text-xs border rounded-lg px-2 py-1 bg-white focus:ring-1 focus:ring-orange-400 cursor-pointer"
//                         >
//                           {[
//                             "pending",
//                             "confirmed",
//                             "preparing",
//                             "ready",
//                             "served",
//                             "completed",
//                             "cancelled",
//                           ].map((s) => (
//                             <option key={s} className="capitalize">
//                               {s}
//                             </option>
//                           ))}
//                         </motion.select>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => setDeleteConfirmId(order.orderId)}
//                           className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </motion.button>
//                       </div>
//                     </td>
//                   </motion.tr>
//                 );
//               })}
//             </AnimatePresence>
//           </tbody>
//         </table>
//       </div>

//       {filtered.length === 0 && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center py-12"
//         >
//           <OrdersIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//           <p className="text-gray-400">
//             No orders found matching your criteria.
//           </p>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// // ====================== ORDER DETAILS MODAL ======================
// const OrderDetailsModalComponent = ({ order, onClose, onUpdateStatus }) => {
//   if (!order) return null;

//   const calculateSubtotal = () => {
//     return (
//       order.items?.reduce(
//         (sum, item) =>
//           sum +
//           (item.finalPrice || item.originalPrice || 0) * (item.quantity || 1),
//         0
//       ) || 0
//     );
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           transition={{ type: "spring", damping: 25, stiffness: 300 }}
//           className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 p-5 rounded-t-3xl flex justify-between items-center">
//             <h2 className="text-white font-bold text-xl">
//               Order #{order.orderId?.slice(-8)}
//             </h2>
//             <motion.button
//               whileHover={{ scale: 1.1, rotate: 90 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={onClose}
//               className="p-1 hover:bg-white/20 rounded-full"
//             >
//               <CloseIcon className="text-white" />
//             </motion.button>
//           </div>
//           <div className="p-6 space-y-5">
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 {
//                   label: "Customer",
//                   value: order.personDetails?.name || "Guest",
//                 },
//                 {
//                   label: "Table Number",
//                   value: order.personDetails?.tableNumber,
//                 },
//                 {
//                   label: "Order Type",
//                   value: order.personDetails?.orderType || "dine-in",
//                   capitalize: true,
//                 },
//                 {
//                   label: "Created At",
//                   value: new Date(order.createdAt).toLocaleString(),
//                 },
//               ].map((field, idx) => (
//                 <motion.div
//                   key={field.label}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: idx * 0.1 }}
//                   className="bg-gray-50 p-3 rounded-xl"
//                 >
//                   <p className="text-xs text-gray-500">{field.label}</p>
//                   <p
//                     className={`font-semibold text-gray-800 ${
//                       field.capitalize ? "capitalize" : ""
//                     }`}
//                   >
//                     {field.value}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>

//             {order.bookingDetails?.specialInstructions && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="bg-yellow-50 p-3 rounded-xl"
//               >
//                 <p className="text-xs text-gray-500">Special Instructions</p>
//                 <p className="text-sm text-gray-700">
//                   {order.bookingDetails.specialInstructions}
//                 </p>
//               </motion.div>
//             )}

//             {order.notes && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="bg-blue-50 p-3 rounded-xl"
//               >
//                 <p className="text-xs text-gray-500">Notes</p>
//                 <p className="text-sm text-gray-700">{order.notes}</p>
//               </motion.div>
//             )}

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//             >
//               <p className="text-xs text-gray-500 mb-2">Status</p>
//               <motion.select
//                 whileHover={{ scale: 1.02 }}
//                 value={order.status}
//                 onChange={(e) => onUpdateStatus(order, e.target.value)}
//                 className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 cursor-pointer"
//               >
//                 {[
//                   "pending",
//                   "confirmed",
//                   "preparing",
//                   "ready",
//                   "served",
//                   "completed",
//                   "cancelled",
//                 ].map((s) => (
//                   <option key={s} className="capitalize">
//                     {s}
//                   </option>
//                 ))}
//               </motion.select>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.7, type: "spring" }}
//               className="bg-orange-50 p-4 rounded-xl"
//             >
//               <p className="text-xs text-gray-500">Total Amount</p>
//               <p className="text-3xl font-bold text-orange-600">
//                 RWF{" "}
//                 {order.orderSummary?.total?.toLocaleString() ||
//                   calculateSubtotal().toLocaleString()}
//               </p>
//             </motion.div>

//             <div>
//               <p className="text-xs text-gray-500 mb-3">Order Items</p>
//               <div className="space-y-2">
//                 {order.items?.map((item, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.8 + idx * 0.05 }}
//                     whileHover={{ scale: 1.02 }}
//                     className="flex flex-col p-3 bg-gray-50 rounded-xl"
//                   >
//                     <div className="flex justify-between items-center">
//                       <div className="flex items-center gap-3">
//                         <span className="font-bold text-gray-600">
//                           {item.quantity}x
//                         </span>
//                         <span className="font-medium">{item.name}</span>
//                       </div>
//                       <span className="font-bold text-orange-600">
//                         RWF{" "}
//                         {(
//                           (item.finalPrice || item.originalPrice || 0) *
//                           (item.quantity || 1)
//                         ).toLocaleString()}
//                       </span>
//                     </div>
//                     {item.customizations && item.customizations.length > 0 && (
//                       <div className="mt-2 text-xs text-gray-500">
//                         Customizations: {item.customizations.join(", ")}
//                       </div>
//                     )}
//                     {item.specialInstructions && (
//                       <div className="mt-1 text-xs text-gray-500">
//                         Instructions: {item.specialInstructions}
//                       </div>
//                     )}
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {order.bookingDetails?.statusHistory &&
//               order.bookingDetails.statusHistory.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.0 }}
//                 >
//                   <p className="text-xs text-gray-500 mb-2">Status History</p>
//                   <div className="space-y-1">
//                     {order.bookingDetails.statusHistory.map((history, idx) => (
//                       <motion.div
//                         key={idx}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 1.1 + idx * 0.05 }}
//                         className="text-xs text-gray-600"
//                       >
//                         <span className="font-medium capitalize">
//                           {history.status}
//                         </span>{" "}
//                         - {new Date(history.timestamp).toLocaleString()}
//                         {history.note && (
//                           <span className="text-gray-400 ml-2">
//                             ({history.note})
//                           </span>
//                         )}
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// // ====================== NAV BUTTON ======================
// const NavButton = ({ active, onClick, icon, label }) => (
//   <motion.button
//     whileHover={{ scale: 1.05, y: -2 }}
//     whileTap={{ scale: 0.95 }}
//     onClick={onClick}
//     className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
//       active
//         ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
//         : "text-gray-600 hover:bg-gray-100"
//     }`}
//   >
//     {icon}
//     <span className="hidden sm:inline">{label}</span>
//   </motion.button>
// );

// // ====================== MAIN DASHBOARD ======================
// export const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [orders, setOrders] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dailyAnalytics, setDailyAnalytics] = useState(null);
//   const [weeklyAnalytics, setWeeklyAnalytics] = useState(null);
//   const [analyticsLoading, setAnalyticsLoading] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     totalRevenue: 0,
//     activeOrders: 0,
//     pendingOrders: 0,
//   });

//   const fetchOrders = useCallback(async () => {
//     try {
//       const res = await axiosInstance.get("/orders");
//       let ordersData = [];
//       if (res.data?.data && Array.isArray(res.data.data)) {
//         ordersData = res.data.data;
//       } else if (Array.isArray(res.data)) {
//         ordersData = res.data;
//       } else if (res.data?.orders && Array.isArray(res.data.orders)) {
//         ordersData = res.data.orders;
//       }

//       const transformed = ordersData.map((o) => ({
//         ...o,
//         orderSummary: o.orderSummary || {
//           total:
//             o.items?.reduce(
//               (sum, item) =>
//                 sum +
//                 (item.finalPrice || item.originalPrice || 0) *
//                   (item.quantity || 1),
//               0
//             ) || 0,
//           totalItems: o.items?.length || 0,
//         },
//         status: o.status || "pending",
//       }));

//       setOrders(transformed);
//       setStats({
//         totalOrders: transformed.length,
//         totalRevenue: transformed.reduce(
//           (s, o) => s + (o.orderSummary?.total || 0),
//           0
//         ),
//         activeOrders: transformed.filter(
//           (o) => !["completed", "cancelled"].includes(o.status)
//         ).length,
//         pendingOrders: transformed.filter((o) => o.status === "pending").length,
//       });
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       toast.error("Failed to fetch orders");
//     }
//   }, []);

//   const fetchFoods = useCallback(async () => {
//     try {
//       const res = await axiosInstance.get("/foods");
//       let foodsData = [];
//       if (res.data?.success && res.data.foods) {
//         foodsData = res.data.foods;
//       } else if (Array.isArray(res.data)) {
//         foodsData = res.data;
//       } else if (res.data?.data && Array.isArray(res.data.data)) {
//         foodsData = res.data.data;
//       }
//       setMenuItems(foodsData);
//     } catch (err) {
//       console.error("Error fetching foods:", err);
//       toast.error("Failed to fetch menu");
//     }
//   }, []);

//   const fetchAnalytics = async () => {
//     setAnalyticsLoading(true);
//     try {
//       const [dailyRes, weeklyRes] = await Promise.all([
//         axiosInstance.get("/orders/analytics/daily"),
//         axiosInstance.get("/orders/analytics/weekly"),
//       ]);
//       setDailyAnalytics(dailyRes.data);
//       setWeeklyAnalytics(weeklyRes.data);
//     } catch (e) {
//       console.error("Error fetching analytics:", e);
//       toast.error("Failed to fetch analytics data");
//     } finally {
//       setAnalyticsLoading(false);
//     }
//   };

//   const handleAddFood = async (formData) => {
//     try {
//       const response = await axiosInstance.post("/foods", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       if (response.data?.success) {
//         await fetchFoods();
//         toast.success("Food created successfully!");
//       } else {
//         toast.error(response.data?.message || "Creation failed");
//       }
//     } catch (err) {
//       console.error("Error creating food:", err);
//       toast.error(err.response?.data?.message || "Creation failed");
//     }
//   };

//   const handleEditFood = async (id, formData) => {
//     try {
//       const response = await axiosInstance.put(`/foods/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       if (response.data?.success) {
//         await fetchFoods();
//         toast.success("Food updated successfully!");
//       } else {
//         toast.error(response.data?.message || "Update failed");
//       }
//     } catch (err) {
//       console.error("Error updating food:", err);
//       toast.error(err.response?.data?.message || "Update failed");
//     }
//   };

//   const handleDeleteFood = async (id) => {
//     try {
//       const response = await axiosInstance.delete(`/foods/${id}`);
//       if (response.data?.success) {
//         await fetchFoods();
//         toast.success("Food deleted successfully!");
//       } else {
//         toast.error(response.data?.message || "Delete failed");
//       }
//     } catch (err) {
//       console.error("Error deleting food:", err);
//       toast.error(err.response?.data?.message || "Delete failed");
//     }
//   };

//   const updateOrderStatus = async (order, newStatus) => {
//     try {
//       const response = await axiosInstance.patch(
//         `/orders/${order.orderId}/status`,
//         {
//           status: newStatus,
//         }
//       );
//       if (response.data?.success) {
//         await fetchOrders();
//         toast.success(`Status updated to ${newStatus}!`);
//       } else {
//         toast.error(response.data?.message || "Update failed");
//       }
//     } catch (e) {
//       console.error("Error updating order status:", e);
//       toast.error(e.response?.data?.message || "Update failed");
//     }
//   };

//   const deleteOrder = async (orderId) => {
//     try {
//       const response = await axiosInstance.delete(`/orders/${orderId}`);
//       if (response.data?.success) {
//         await fetchOrders();
//         toast.success("Order deleted successfully!");
//       } else {
//         toast.error(response.data?.message || "Delete failed");
//       }
//     } catch (e) {
//       console.error("Error deleting order:", e);
//       toast.error(e.response?.data?.message || "Delete failed");
//     }
//   };

//   const refreshAll = async () => {
//     setLoading(true);
//     await Promise.all([fetchOrders(), fetchFoods(), fetchAnalytics()]);
//     setLoading(false);
//     toast.success("Data refreshed!");
//   };

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("auth_token");

//       await axios.post(
//         "https://nutriscan-foodanddrinksupply.onrender.com/auth/logout",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       localStorage.removeItem("auth_token");
//       localStorage.removeItem("user_data");
//       sessionStorage.clear();

//       toast.success("Logged out successfully");

//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 1500);
//     } catch (error) {
//       console.error("LOGOUT ERROR:", error.response?.data || error.message);

//       localStorage.removeItem("auth_token");
//       localStorage.removeItem("user_data");
//       sessionStorage.clear();

//       toast.error("Session ended");

//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 1500);
//     }
//   };

//   useEffect(() => {
//     refreshAll();
//   }, []);

//   if (loading)
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="text-center"
//         >
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//             className="rounded-full h-16 w-16 border-b-3 border-orange-500 mx-auto mb-4"
//           />
//           <p className="text-gray-600">Loading dashboard...</p>
//         </motion.div>
//       </div>
//     );

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/20"
//     >
//       <ToastContainer position="top-right" />
//       <motion.header
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-3"
//       >
//         <div className="flex items-center gap-3">
//           <motion.div
//             whileHover={{ rotate: 180 }}
//             transition={{ duration: 0.5 }}
//             className="bg-gradient-to-r from-orange-500 to-red-500 p-2.5 rounded-2xl shadow-lg"
//           >
//             <RestaurantIcon className="text-white" />
//           </motion.div>
//           <div>
//             <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
//               NutriScan·AI
//             </h1>
//             <p className="text-xs text-gray-500">
//               Restaurant Intelligence Dashboard
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <motion.button
//             whileHover={{ scale: 1.1, rotate: 180 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={refreshAll}
//             className="p-2 hover:bg-gray-100 rounded-full transition"
//             title="Refresh Data"
//           >
//             <RefreshIcon />
//           </motion.button>
//           <AnimatedButton
//             variant="danger"
//             onClick={handleLogout}
//             className="flex items-center gap-2"
//           >
//             <LogoutIcon fontSize="small" />
//             <span className="hidden sm:inline">Logout</span>
//           </AnimatedButton>
//         </div>
//       </motion.header>

//       <div className="px-4 sm:px-6 pt-4 sticky top-[73px] z-10 bg-transparent">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex gap-1 bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-sm overflow-x-auto"
//         >
//           <NavButton
//             active={activeTab === "overview"}
//             onClick={() => setActiveTab("overview")}
//             icon={<DashboardIcon />}
//             label="Overview"
//           />
//           <NavButton
//             active={activeTab === "orders"}
//             onClick={() => setActiveTab("orders")}
//             icon={<OrdersIcon />}
//             label="Orders"
//           />
//           <NavButton
//             active={activeTab === "menu"}
//             onClick={() => setActiveTab("menu")}
//             icon={<MenuIcon />}
//             label="Menu"
//           />
//           <NavButton
//             active={activeTab === "analytics"}
//             onClick={() => setActiveTab("analytics")}
//             icon={<AnalyticsIcon />}
//             label="Analytics"
//           />
//         </motion.div>
//       </div>

//       <div className="p-4 sm:p-6">
//         <AnimatePresence mode="wait">
//           {activeTab === "overview" && (
//             <motion.div
//               key="overview"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-6">
//                 <StatCard
//                   title="Total Orders"
//                   value={stats.totalOrders}
//                   icon={<OrdersIcon />}
//                   color="border-blue-500"
//                 />
//                 <StatCard
//                   title="Revenue"
//                   value={`RWF ${stats.totalRevenue.toLocaleString()}`}
//                   icon={<MoneyIcon />}
//                   color="border-green-500"
//                 />
//                 <StatCard
//                   title="Active Orders"
//                   value={stats.activeOrders}
//                   icon={<KitchenIcon />}
//                   color="border-purple-500"
//                 />
//                 <StatCard
//                   title="Pending"
//                   value={stats.pendingOrders}
//                   icon={<TimeIcon />}
//                   color="border-yellow-500"
//                 />
//               </div>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                 <DailyAnalyticsCard
//                   analytics={dailyAnalytics}
//                   loading={analyticsLoading}
//                 />
//                 <WeeklyAnalyticsCard
//                   analytics={weeklyAnalytics}
//                   loading={analyticsLoading}
//                 />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                   <OrdersIcon className="text-orange-500" /> Recent Orders
//                 </h2>
//                 <OrdersTable
//                   orders={orders.slice(0, 5)}
//                   onUpdateStatus={updateOrderStatus}
//                   onViewDetails={setSelectedOrder}
//                   onDeleteOrder={deleteOrder}
//                 />
//               </div>
//             </motion.div>
//           )}
//           {activeTab === "orders" && (
//             <motion.div
//               key="orders"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               <OrdersTable
//                 orders={orders}
//                 onUpdateStatus={updateOrderStatus}
//                 onViewDetails={setSelectedOrder}
//                 onDeleteOrder={deleteOrder}
//               />
//             </motion.div>
//           )}
//           {activeTab === "menu" && (
//             <motion.div
//               key="menu"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               <MenuManagement
//                 menuItems={menuItems}
//                 onAddItem={handleAddFood}
//                 onEditItem={handleEditFood}
//                 onDeleteItem={handleDeleteFood}
//                 onRefresh={fetchFoods}
//               />
//             </motion.div>
//           )}
//           {activeTab === "analytics" && (
//             <motion.div
//               key="analytics"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-6"
//             >
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <DailyAnalyticsCard
//                   analytics={dailyAnalytics}
//                   loading={analyticsLoading}
//                 />
//                 <WeeklyAnalyticsCard
//                   analytics={weeklyAnalytics}
//                   loading={analyticsLoading}
//                 />
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//       {selectedOrder && (
//         <OrderDetailsModalComponent
//           order={selectedOrder}
//           onClose={() => setSelectedOrder(null)}
//           onUpdateStatus={updateOrderStatus}
//         />
//       )}
//     </motion.div>
//   );
// };

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import {
  Dashboard as DashboardIcon,
  RestaurantMenu as MenuIcon,
  ShoppingCart as OrdersIcon,
  Analytics as AnalyticsIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  AttachMoney as MoneyIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Restaurant as RestaurantIcon,
  Visibility as VisibilityIcon,
  ListAlt as ListAltIcon,
  Healing as HealingIcon,
  Warning as WarningIcon,
  Today as TodayIcon,
  DateRange as DateRangeIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Kitchen as KitchenIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  LocalOffer as LocalOfferIcon,
  DeleteSweep as DeleteSweepIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

// ====================== API CONFIG ======================
const API_BASE = "https://nutriscan-foodanddrinksupply.onrender.com";
const axiosInstance = axios.create({ baseURL: API_BASE, timeout: 30000 });

// ====================== AUTH CONTEXT ======================
const AuthContext = React.createContext(null);

// ====================== ANIMATED STAT CARD ======================
const StatCard = ({ title, value, icon, color, trend, trendValue }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
    className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-4 sm:p-5 border-t-4 ${color} hover:shadow-xl transition-all duration-300`}
  >
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide">
          {title}
        </p>
        <motion.p
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mt-2 break-words"
        >
          {value}
        </motion.p>
        {trend && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1 mt-2"
          >
            {trend === "up" ? (
              <ArrowUpIcon className="text-green-500 text-sm" />
            ) : (
              <ArrowDownIcon className="text-red-500 text-sm" />
            )}
            <span
              className={`text-xs font-medium ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trendValue}
            </span>
          </motion.div>
        )}
      </div>
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className={`p-3 rounded-2xl bg-gradient-to-br ${color
          .replace("border-", "from-")
          .replace("-500", "-100")} to-white shadow-inner`}
      >
        {icon}
      </motion.div>
    </div>
  </motion.div>
);

// ====================== ANIMATED BUTTON ======================
const AnimatedButton = ({
  onClick,
  children,
  variant = "primary",
  className = "",
  disabled = false,
  isLoading = false,
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
  };

  return (
    <motion.button
      whileHover={!disabled && !isLoading ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.95 } : {}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${variants[variant]} px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${className}`}
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

// ====================== PAGINATION COMPONENT ======================
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center gap-2 mt-6"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-xl transition ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-orange-500 hover:text-white"
        }`}
      >
        <ChevronLeftIcon />
      </motion.button>
      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <motion.button
            key={page}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-xl text-sm font-medium transition ${
              currentPage === page
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {page}
          </motion.button>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-xl transition ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-orange-500 hover:text-white"
        }`}
      >
        <ChevronRightIcon />
      </motion.button>
    </motion.div>
  );
};

// ====================== FOOD DETAILS MODAL ======================
const FoodDetailsModal = ({ item, onClose }) => {
  if (!item) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={
                item.image ||
                "https://via.placeholder.com/400x200?text=No+Image"
              }
              alt={item.name}
              className="w-full h-48 sm:h-64 object-cover rounded-t-3xl"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x200?text=No+Image";
              }}
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-4 right-4"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition"
              >
                <CloseIcon className="text-white" />
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6"
            >
              <h2 className="text-white text-2xl sm:text-3xl font-bold">
                {item.name}
              </h2>
              <p className="text-white/90 text-sm mt-1">{item.category}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-5 sm:p-6 space-y-5"
          >
            <div className="flex justify-between items-center pb-3 border-b">
              <div>
                <p className="text-xs text-gray-500">Price</p>
                <p className="text-2xl font-bold text-orange-600">
                  RWF {item.price?.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Prep Time</p>
                <p className="text-lg font-semibold flex items-center gap-1">
                  <TimeIcon fontSize="small" className="text-gray-400" />{" "}
                  {item.prepTime} min
                </p>
              </div>
              <div>
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                    item.purineLevel === "low"
                      ? "bg-green-100 text-green-700"
                      : item.purineLevel === "moderate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.purineLevel?.toUpperCase()} Purine
                </motion.span>
              </div>
            </div>

            {item.description && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  📖 Description
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <ListAltIcon className="text-emerald-600" /> Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.ingredients?.map((ing, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {ing}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <HealingIcon className="text-blue-500" /> Dietary Information
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Gluten", value: item.containsGluten },
                  { label: "Peanuts", value: item.containsPeanuts },
                  { label: "Shellfish", value: item.containsShellfish },
                  { label: "Dairy", value: item.containsDairy },
                  { label: "High Salt", value: item.highSalt },
                ].map((diet, idx) => (
                  <motion.div
                    key={diet.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex items-center gap-2 p-2 rounded-lg ${
                      diet.value ? "bg-red-50" : "bg-green-50"
                    }`}
                  >
                    <motion.span
                      animate={{ scale: diet.value ? [1, 1.2, 1] : 1 }}
                      transition={{
                        duration: 0.5,
                        repeat: diet.value ? Infinity : 0,
                      }}
                      className={`w-2 h-2 rounded-full ${
                        diet.value ? "bg-red-500" : "bg-green-500"
                      }`}
                    ></motion.span>
                    <span className="text-sm">
                      {diet.label}: {diet.value ? "Contains" : "Free"}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ====================== DAILY ANALYTICS CARD ======================
const DailyAnalyticsCard = ({ analytics, loading }) => {
  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="space-y-4">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-32 bg-gray-200 rounded"
          />
        </div>
      </motion.div>
    );

  if (!analytics || !analytics.success)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-400"
      >
        No daily data available
      </motion.div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white to-orange-50/30 rounded-2xl shadow-lg p-5 sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="flex items-center gap-2 mb-5"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="p-2 bg-orange-100 rounded-xl"
        >
          <TodayIcon className="text-orange-600" />
        </motion.div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          Daily Analytics
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl text-white"
          >
            <p className="text-sm opacity-90">Total Orders Today</p>
            <motion.p
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold"
            >
              {analytics.totalOrders || 0}
            </motion.p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-xl text-white"
          >
            <p className="text-sm opacity-90">Total Income Today</p>
            <motion.p
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold"
            >
              RWF {(analytics.totalIncome || 0).toLocaleString()}
            </motion.p>
          </motion.div>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <LocalOfferIcon fontSize="small" /> Top Selling Items
          </p>
          <div className="space-y-2">
            {analytics.mostOrderedPlates?.slice(0, 5).map((plate, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-700">
                  {plate.name}
                </span>
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-sm font-bold text-orange-600"
                >
                  {plate.quantity} sold
                </motion.span>
              </motion.div>
            ))}
            {(!analytics.mostOrderedPlates ||
              analytics.mostOrderedPlates.length === 0) && (
              <p className="text-sm text-gray-400 text-center py-4">
                No orders today
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ====================== WEEKLY ANALYTICS CARD ======================
const WeeklyAnalyticsCard = ({ analytics, loading }) => {
  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-64 bg-gray-200 rounded"
        />
      </motion.div>
    );

  if (!analytics || !analytics.success)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-400"
      >
        No weekly data available
      </motion.div>
    );

  const totalOrders = analytics.totalOrders || 0;
  const totalIncome = analytics.totalIncome || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg p-5 sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="flex items-center gap-2 mb-5"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="p-2 bg-blue-100 rounded-xl"
        >
          <DateRangeIcon className="text-blue-600" />
        </motion.div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          Weekly Analytics
        </h2>
        <span className="text-xs text-gray-400 ml-2 capitalize">
          ({analytics.period})
        </span>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl text-white"
        >
          <p className="text-sm opacity-90">Total Orders (Week)</p>
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold"
          >
            {totalOrders}
          </motion.p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-xl text-white"
        >
          <p className="text-sm opacity-90">Total Income (Week)</p>
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold"
          >
            RWF {totalIncome.toLocaleString()}
          </motion.p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <ArrowUpIcon fontSize="small" className="text-green-500" /> Most
            Ordered Plates
          </p>
          <div className="space-y-2">
            {analytics.mostOrderedPlates?.map((plate, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex justify-between items-center p-2 bg-green-50 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-700">
                  {plate.name}
                </span>
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-sm font-bold text-green-600"
                >
                  {plate.quantity} sold
                </motion.span>
              </motion.div>
            ))}
            {(!analytics.mostOrderedPlates ||
              analytics.mostOrderedPlates.length === 0) && (
              <p className="text-sm text-gray-400 text-center py-4">
                No orders this week
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <ArrowDownIcon fontSize="small" className="text-red-500" /> Least
            Ordered Plates
          </p>
          <div className="space-y-2">
            {analytics.leastOrderedPlates?.map((plate, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex justify-between items-center p-2 bg-red-50 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-700">
                  {plate.name}
                </span>
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-sm font-bold text-red-600"
                >
                  {plate.quantity} sold
                </motion.span>
              </motion.div>
            ))}
            {(!analytics.leastOrderedPlates ||
              analytics.leastOrderedPlates.length === 0) && (
              <p className="text-sm text-gray-400 text-center py-4">
                All items sold evenly
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ====================== MENU MANAGEMENT ======================
const MenuManagement = ({
  menuItems,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onRefresh,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [viewDetailsItem, setViewDetailsItem] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    ingredients: "",
    description: "",
    prepTime: "",
    category: "Mains",
    purineLevel: "low",
    containsGluten: false,
    containsPeanuts: false,
    containsShellfish: false,
    containsDairy: false,
    highSalt: false,
    sodiumMg: "",
  });

  const categories = [
    "Mains",
    "Appetizers",
    "Seafood",
    "Vegan",
    "Desserts",
    "Beverages",
    "Soups",
    "Salads",
  ];

  // Pagination logic
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);
  const paginatedItems = menuItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price) {
      toast.error("Please fill in name and price");
      return;
    }
    setLoadingUpload(true);
    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("price", formData.price);
      submitData.append(
        "ingredients",
        JSON.stringify(
          formData.ingredients
            .split(",")
            .map((i) => i.trim())
            .filter((i) => i),
        ),
      );
      submitData.append("description", formData.description);
      submitData.append("prepTime", formData.prepTime || "15");
      submitData.append("category", formData.category);
      submitData.append("purineLevel", formData.purineLevel);
      submitData.append("containsGluten", String(formData.containsGluten));
      submitData.append("containsPeanuts", String(formData.containsPeanuts));
      submitData.append(
        "containsShellfish",
        String(formData.containsShellfish),
      );
      submitData.append("containsDairy", String(formData.containsDairy));
      submitData.append("highSalt", String(formData.highSalt));
      if (formData.sodiumMg) submitData.append("sodiumMg", formData.sodiumMg);
      if (imageFile) submitData.append("image", imageFile);

      if (editingItem) {
        await onEditItem(editingItem._id, submitData);
        toast.success("Item updated successfully!");
      } else {
        await onAddItem(submitData);
        toast.success("Item created successfully!");
      }
      setShowModal(false);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoadingUpload(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      ingredients: "",
      description: "",
      prepTime: "",
      category: "Mains",
      purineLevel: "low",
      containsGluten: false,
      containsPeanuts: false,
      containsShellfish: false,
      containsDairy: false,
      highSalt: false,
      sodiumMg: "",
    });
    setImageFile(null);
    setImagePreview("");
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price.toString(),
      ingredients: item.ingredients?.join(", ") || "",
      description: item.description || "",
      prepTime: item.prepTime?.toString() || "",
      category: item.category || "Mains",
      purineLevel: item.purineLevel,
      containsGluten: item.containsGluten,
      containsPeanuts: item.containsPeanuts,
      containsShellfish: item.containsShellfish,
      containsDairy: item.containsDairy,
      highSalt: item.highSalt,
      sodiumMg: item.sodiumMg?.toString() || "",
    });
    setImagePreview(item.image || "");
    setShowModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-4 sm:p-6"
    >
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <DeleteIcon className="text-red-600 text-3xl" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Delete Item
                </h3>
                <p className="text-gray-500 mb-6">
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </p>
                <div className="flex gap-3">
                  <AnimatedButton
                    variant="secondary"
                    onClick={() => setDeleteConfirmId(null)}
                    className="flex-1"
                  >
                    Cancel
                  </AnimatedButton>
                  <AnimatedButton
                    variant="danger"
                    onClick={async () => {
                      await onDeleteItem(deleteConfirmId);
                      setDeleteConfirmId(null);
                    }}
                    className="flex-1"
                  >
                    Delete
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <MenuIcon className="text-orange-500" /> Menu Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your restaurant's food items
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <AnimatedButton
            variant="secondary"
            onClick={onRefresh}
            className="flex-1 sm:flex-none"
          >
            <RefreshIcon fontSize="small" /> Sync
          </AnimatedButton>
          <AnimatedButton
            variant="primary"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex-1 sm:flex-none"
          >
            <AddIcon fontSize="small" /> Add Item
          </AnimatedButton>
        </div>
      </motion.div>

      {/* Menu Grid */}
      {menuItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <MenuIcon className="text-gray-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-400">
            No menu items found. Click "Add Item" to create your first menu
            item.
          </p>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence>
              {paginatedItems.map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      src={
                        item.image ||
                        "https://via.placeholder.com/400x200?text=No+Image"
                      }
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x200?text=No+Image";
                      }}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(item)}
                        className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
                      >
                        <EditIcon fontSize="small" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setViewDetailsItem(item)}
                        className="p-2 bg-emerald-500 rounded-full text-white hover:bg-emerald-600 transition"
                      >
                        <VisibilityIcon fontSize="small" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setDeleteConfirmId(item._id)}
                        className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
                      >
                        <DeleteIcon fontSize="small" />
                      </motion.button>
                    </motion.div>
                    <div className="absolute top-3 right-3">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          item.purineLevel === "low"
                            ? "bg-green-500"
                            : item.purineLevel === "moderate"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        } text-white shadow-lg inline-block`}
                      >
                        {item.purineLevel}
                      </motion.span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.ingredients?.slice(0, 3).map((ing, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600"
                        >
                          {ing}
                        </span>
                      ))}
                      {item.ingredients?.length > 3 && (
                        <span className="text-xs text-gray-400">
                          +{item.ingredients.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-600 font-bold text-xl">
                        RWF {item.price?.toLocaleString()}
                      </span>
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <TimeIcon fontSize="small" /> {item.prepTime} min
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-5 rounded-t-3xl flex justify-between items-center">
                <h2 className="text-white font-bold text-xl">
                  {editingItem ? "Edit Menu Item" : "Create New Menu Item"}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowModal(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition"
                >
                  <CloseIcon className="text-white" />
                </motion.button>
              </div>
              <div className="p-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.input
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    type="text"
                    placeholder="Item Name *"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                  <motion.input
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    type="number"
                    placeholder="Price (RWF) *"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <motion.textarea
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  placeholder="Ingredients (comma separated)"
                  value={formData.ingredients}
                  onChange={(e) =>
                    setFormData({ ...formData, ingredients: e.target.value })
                  }
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
                  rows={2}
                />
                <motion.textarea
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
                  rows={2}
                />
                <div className="grid grid-cols-2 gap-4">
                  <motion.input
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    type="number"
                    placeholder="Prep time (minutes)"
                    value={formData.prepTime}
                    onChange={(e) =>
                      setFormData({ ...formData, prepTime: e.target.value })
                    }
                    className="w-full p-3 border border-gray-200 rounded-xl"
                  />
                  <motion.select
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full p-3 border border-gray-200 rounded-xl bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </motion.select>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-orange-400 transition cursor-pointer"
                >
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <CloudUploadIcon className="text-gray-400 text-4xl" />
                    <span className="text-sm text-gray-500">
                      Click to upload image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <motion.img
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      src={imagePreview}
                      alt="preview"
                      className="mt-3 h-32 w-32 object-cover rounded-xl mx-auto shadow-md"
                    />
                  )}
                </motion.div>
                <div className="grid grid-cols-2 gap-4">
                  <motion.select
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    value={formData.purineLevel}
                    onChange={(e) =>
                      setFormData({ ...formData, purineLevel: e.target.value })
                    }
                    className="w-full p-3 border rounded-xl"
                  >
                    <option value="low">Low Purine</option>
                    <option value="moderate">Moderate Purine</option>
                    <option value="high">High Purine</option>
                  </motion.select>
                  <motion.input
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    type="number"
                    placeholder="Sodium (mg)"
                    value={formData.sodiumMg}
                    onChange={(e) =>
                      setFormData({ ...formData, sodiumMg: e.target.value })
                    }
                    className="w-full p-3 border rounded-xl"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-xl"
                >
                  {[
                    { label: "Gluten", key: "containsGluten" },
                    { label: "Peanuts", key: "containsPeanuts" },
                    { label: "Shellfish", key: "containsShellfish" },
                    { label: "Dairy", key: "containsDairy" },
                    {
                      label: "High Salt",
                      key: "highSalt",
                      colSpan: "col-span-2",
                    },
                  ].map((option) => (
                    <label
                      key={option.key}
                      className={`flex items-center gap-2 text-sm ${
                        option.colSpan || ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData[option.key]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [option.key]: e.target.checked,
                          })
                        }
                        className="w-4 h-4 rounded"
                      />{" "}
                      {option.label}
                    </label>
                  ))}
                </motion.div>
                <AnimatedButton
                  variant="primary"
                  onClick={handleSubmit}
                  isLoading={loadingUpload}
                  className="w-full py-3 text-lg"
                >
                  {editingItem ? "Update Item" : "Create Item"}
                </AnimatedButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FoodDetailsModal
        item={viewDetailsItem}
        onClose={() => setViewDetailsItem(null)}
      />
    </motion.div>
  );
};

// ====================== ORDERS TABLE ======================
const OrdersTable = ({
  orders,
  onUpdateStatus,
  onViewDetails,
  onDeleteOrder,
  itemsPerPage = 8,
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const getStatusConfig = (status) => {
    const config = {
      pending: {
        color: "bg-yellow-100 text-yellow-700",
        icon: <TimeIcon fontSize="small" />,
      },
      confirmed: {
        color: "bg-blue-100 text-blue-700",
        icon: <CheckCircleIcon fontSize="small" />,
      },
      preparing: {
        color: "bg-purple-100 text-purple-700",
        icon: <KitchenIcon fontSize="small" />,
      },
      ready: {
        color: "bg-green-100 text-green-700",
        icon: <CheckCircleIcon fontSize="small" />,
      },
      served: {
        color: "bg-teal-100 text-teal-700",
        icon: <RestaurantIcon fontSize="small" />,
      },
      completed: {
        color: "bg-gray-100 text-gray-700",
        icon: <CheckCircleIcon fontSize="small" />,
      },
      cancelled: {
        color: "bg-red-100 text-red-700",
        icon: <CancelIcon fontSize="small" />,
      },
    };
    return config[status] || config.pending;
  };

  const filtered = orders.filter(
    (o) =>
      (o.orderId?.toLowerCase().includes(search.toLowerCase()) ||
        o.personDetails?.name?.toLowerCase().includes(search.toLowerCase()) ||
        o.personDetails?.tableNumber?.toString().includes(search)) &&
      (statusFilter === "all" || o.status === statusFilter),
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedOrders = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalRevenue = filtered.reduce(
    (sum, order) => sum + (order.orderSummary?.total || 0),
    0,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <AnimatePresence>
        {deleteConfirmId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl max-w-md w-full p-6"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  <DeleteSweepIcon className="text-red-500 text-5xl mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">Delete Order</h3>
                <p className="text-gray-500 mb-6">
                  Are you sure you want to delete this order?
                </p>
                <div className="flex gap-3">
                  <AnimatedButton
                    variant="secondary"
                    onClick={() => setDeleteConfirmId(null)}
                    className="flex-1"
                  >
                    Cancel
                  </AnimatedButton>
                  <AnimatedButton
                    variant="danger"
                    onClick={async () => {
                      await onDeleteOrder(deleteConfirmId);
                      setDeleteConfirmId(null);
                    }}
                    className="flex-1"
                  >
                    Delete
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 flex flex-col sm:flex-row gap-3 border-b bg-gray-50/50"
      >
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Order ID, Customer, or Table..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-orange-400"
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 border-b"
      >
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Showing {paginatedOrders.length} of {filtered.length} orders
          </span>
          <span className="text-sm font-semibold text-orange-600">
            Total Revenue: RWF {totalRevenue.toLocaleString()}
          </span>
        </div>
      </motion.div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Order ID",
                "Table",
                "Customer",
                "Items",
                "Total",
                "Status",
                "Actions",
              ].map((h, idx) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <AnimatePresence>
              {paginatedOrders.map((order, idx) => {
                const statusConfig = getStatusConfig(order.status);
                return (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: idx * 0.03 }}
                    whileHover={{ backgroundColor: "rgba(251, 146, 60, 0.05)" }}
                    className="transition"
                  >
                    <td className="px-4 py-3 text-sm font-mono font-medium text-gray-700">
                      {order.orderId?.slice(-8)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      Table {order.personDetails?.tableNumber}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      <div>
                        <div>{order.personDetails?.name || "Guest"}</div>
                        <div className="text-xs text-gray-400">
                          {order.personDetails?.orderType || "dine-in"}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div>
                        <div>
                          {order.orderSummary?.totalItems ||
                            order.items?.length ||
                            0}{" "}
                          items
                        </div>
                        <div className="text-xs text-gray-400 line-clamp-1">
                          {order.items?.map((item) => item.name).join(", ")}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-orange-600">
                      RWF {order.orderSummary?.total?.toLocaleString() || 0}
                    </td>
                    <td className="px-4 py-3">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
                      >
                        {statusConfig.icon}
                        {order.status}
                      </motion.span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onViewDetails(order)}
                          className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                        >
                          <VisibilityIcon fontSize="small" />
                        </motion.button>
                        <motion.select
                          whileHover={{ scale: 1.02 }}
                          value={order.status}
                          onChange={(e) =>
                            onUpdateStatus(order, e.target.value)
                          }
                          className="text-xs border rounded-lg px-2 py-1 bg-white focus:ring-1 focus:ring-orange-400 cursor-pointer"
                        >
                          {[
                            "pending",
                            "confirmed",
                            "preparing",
                            "ready",
                            "served",
                            "completed",
                            "cancelled",
                          ].map((s) => (
                            <option key={s} className="capitalize">
                              {s}
                            </option>
                          ))}
                        </motion.select>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setDeleteConfirmId(order.orderId)}
                          className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                        >
                          <DeleteIcon fontSize="small" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <OrdersIcon className="text-gray-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-400">
            No orders found matching your criteria.
          </p>
        </motion.div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </motion.div>
  );
};

// ====================== ORDER DETAILS MODAL ======================
const OrderDetailsModalComponent = ({ order, onClose, onUpdateStatus }) => {
  if (!order) return null;

  const calculateSubtotal = () => {
    return (
      order.items?.reduce(
        (sum, item) =>
          sum +
          (item.finalPrice || item.originalPrice || 0) * (item.quantity || 1),
        0,
      ) || 0
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 p-5 rounded-t-3xl flex justify-between items-center">
            <h2 className="text-white font-bold text-xl">
              Order #{order.orderId?.slice(-8)}
            </h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-full"
            >
              <CloseIcon className="text-white" />
            </motion.button>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "Customer",
                  value: order.personDetails?.name || "Guest",
                },
                {
                  label: "Table Number",
                  value: order.personDetails?.tableNumber,
                },
                {
                  label: "Order Type",
                  value: order.personDetails?.orderType || "dine-in",
                  capitalize: true,
                },
                {
                  label: "Created At",
                  value: new Date(order.createdAt).toLocaleString(),
                },
              ].map((field, idx) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-50 p-3 rounded-xl"
                >
                  <p className="text-xs text-gray-500">{field.label}</p>
                  <p
                    className={`font-semibold text-gray-800 ${
                      field.capitalize ? "capitalize" : ""
                    }`}
                  >
                    {field.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {order.bookingDetails?.specialInstructions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-yellow-50 p-3 rounded-xl"
              >
                <p className="text-xs text-gray-500">Special Instructions</p>
                <p className="text-sm text-gray-700">
                  {order.bookingDetails.specialInstructions}
                </p>
              </motion.div>
            )}

            {order.notes && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-50 p-3 rounded-xl"
              >
                <p className="text-xs text-gray-500">Notes</p>
                <p className="text-sm text-gray-700">{order.notes}</p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs text-gray-500 mb-2">Status</p>
              <motion.select
                whileHover={{ scale: 1.02 }}
                value={order.status}
                onChange={(e) => onUpdateStatus(order, e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 cursor-pointer"
              >
                {[
                  "pending",
                  "confirmed",
                  "preparing",
                  "ready",
                  "served",
                  "completed",
                  "cancelled",
                ].map((s) => (
                  <option key={s} className="capitalize">
                    {s}
                  </option>
                ))}
              </motion.select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="bg-orange-50 p-4 rounded-xl"
            >
              <p className="text-xs text-gray-500">Total Amount</p>
              <p className="text-3xl font-bold text-orange-600">
                RWF{" "}
                {order.orderSummary?.total?.toLocaleString() ||
                  calculateSubtotal().toLocaleString()}
              </p>
            </motion.div>

            <div>
              <p className="text-xs text-gray-500 mb-3">Order Items</p>
              <div className="space-y-2">
                {order.items?.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-600">
                          {item.quantity}x
                        </span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="font-bold text-orange-600">
                        RWF{" "}
                        {(
                          (item.finalPrice || item.originalPrice || 0) *
                          (item.quantity || 1)
                        ).toLocaleString()}
                      </span>
                    </div>
                    {item.customizations && item.customizations.length > 0 && (
                      <div className="mt-2 text-xs text-gray-500">
                        Customizations: {item.customizations.join(", ")}
                      </div>
                    )}
                    {item.specialInstructions && (
                      <div className="mt-1 text-xs text-gray-500">
                        Instructions: {item.specialInstructions}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {order.bookingDetails?.statusHistory &&
              order.bookingDetails.statusHistory.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <p className="text-xs text-gray-500 mb-2">Status History</p>
                  <div className="space-y-1">
                    {order.bookingDetails.statusHistory.map((history, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 + idx * 0.05 }}
                        className="text-xs text-gray-600"
                      >
                        <span className="font-medium capitalize">
                          {history.status}
                        </span>{" "}
                        - {new Date(history.timestamp).toLocaleString()}
                        {history.note && (
                          <span className="text-gray-400 ml-2">
                            ({history.note})
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ====================== NAV BUTTON ======================
const NavButton = ({ active, onClick, icon, label }) => (
  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
      active
        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </motion.button>
);

// ====================== MAIN DASHBOARD ======================
export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dailyAnalytics, setDailyAnalytics] = useState(null);
  const [weeklyAnalytics, setWeeklyAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeOrders: 0,
    pendingOrders: 0,
  });

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/orders");
      let ordersData = [];
      if (res.data?.data && Array.isArray(res.data.data)) {
        ordersData = res.data.data;
      } else if (Array.isArray(res.data)) {
        ordersData = res.data;
      } else if (res.data?.orders && Array.isArray(res.data.orders)) {
        ordersData = res.data.orders;
      }

      const transformed = ordersData.map((o) => ({
        ...o,
        orderSummary: o.orderSummary || {
          total:
            o.items?.reduce(
              (sum, item) =>
                sum +
                (item.finalPrice || item.originalPrice || 0) *
                  (item.quantity || 1),
              0,
            ) || 0,
          totalItems: o.items?.length || 0,
        },
        status: o.status || "pending",
      }));

      setOrders(transformed);
      setStats({
        totalOrders: transformed.length,
        totalRevenue: transformed.reduce(
          (s, o) => s + (o.orderSummary?.total || 0),
          0,
        ),
        activeOrders: transformed.filter(
          (o) => !["completed", "cancelled"].includes(o.status),
        ).length,
        pendingOrders: transformed.filter((o) => o.status === "pending").length,
      });
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to fetch orders");
    }
  }, []);

  const fetchFoods = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/foods");
      let foodsData = [];
      if (res.data?.success && res.data.foods) {
        foodsData = res.data.foods;
      } else if (Array.isArray(res.data)) {
        foodsData = res.data;
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        foodsData = res.data.data;
      }
      setMenuItems(foodsData);
    } catch (err) {
      console.error("Error fetching foods:", err);
      toast.error("Failed to fetch menu");
    }
  }, []);

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const [dailyRes, weeklyRes] = await Promise.all([
        axiosInstance.get("/orders/analytics/daily"),
        axiosInstance.get("/orders/analytics/weekly"),
      ]);
      setDailyAnalytics(dailyRes.data);
      setWeeklyAnalytics(weeklyRes.data);
    } catch (e) {
      console.error("Error fetching analytics:", e);
      toast.error("Failed to fetch analytics data");
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const handleAddFood = async (formData) => {
    try {
      const response = await axiosInstance.post("/foods", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.success) {
        await fetchFoods();
        toast.success("Food created successfully!");
      } else {
        toast.error(response.data?.message || "Creation failed");
      }
    } catch (err) {
      console.error("Error creating food:", err);
      toast.error(err.response?.data?.message || "Creation failed");
    }
  };

  const handleEditFood = async (id, formData) => {
    try {
      const response = await axiosInstance.put(`/foods/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.success) {
        await fetchFoods();
        toast.success("Food updated successfully!");
      } else {
        toast.error(response.data?.message || "Update failed");
      }
    } catch (err) {
      console.error("Error updating food:", err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleDeleteFood = async (id) => {
    try {
      const response = await axiosInstance.delete(`/foods/${id}`);
      if (response.data?.success) {
        await fetchFoods();
        toast.success("Food deleted successfully!");
      } else {
        toast.error(response.data?.message || "Delete failed");
      }
    } catch (err) {
      console.error("Error deleting food:", err);
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const updateOrderStatus = async (order, newStatus) => {
    try {
      const response = await axiosInstance.patch(
        `/orders/${order.orderId}/status`,
        {
          status: newStatus,
        },
      );
      if (response.data?.success) {
        await fetchOrders();
        toast.success(`Status updated to ${newStatus}!`);
      } else {
        toast.error(response.data?.message || "Update failed");
      }
    } catch (e) {
      console.error("Error updating order status:", e);
      toast.error(e.response?.data?.message || "Update failed");
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await axiosInstance.delete(`/orders/${orderId}`);
      if (response.data?.success) {
        await fetchOrders();
        toast.success("Order deleted successfully!");
      } else {
        toast.error(response.data?.message || "Delete failed");
      }
    } catch (e) {
      console.error("Error deleting order:", e);
      toast.error(e.response?.data?.message || "Delete failed");
    }
  };

  const refreshAll = async () => {
    setLoading(true);
    await Promise.all([fetchOrders(), fetchFoods(), fetchAnalytics()]);
    setLoading(false);
    toast.success("Data refreshed!");
  };

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
      // ALWAYS clear session (important fix)
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      sessionStorage.clear();

      delete axios.defaults.headers.common["Authorization"];

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-16 w-16 border-b-3 border-orange-500 mx-auto mb-4"
          />
          <p className="text-gray-600">Loading dashboard...</p>
        </motion.div>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/20"
    >
      <ToastContainer position="top-right" />
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 px-4 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-orange-500 to-red-500 p-2.5 rounded-2xl shadow-lg"
          >
            <RestaurantIcon className="text-white" />
          </motion.div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              NutriScan·AI
            </h1>
            <p className="text-xs text-gray-500">
              Restaurant Intelligence Dashboard
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={refreshAll}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            title="Refresh Data"
          >
            <RefreshIcon />
          </motion.button>
          <AnimatedButton
            variant="danger"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogoutIcon fontSize="small" />
            <span className="hidden sm:inline">Logout</span>
          </AnimatedButton>
        </div>
      </motion.header>

      <div className="px-4 sm:px-6 pt-4 sticky top-[73px] z-10 bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-1 bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-sm overflow-x-auto"
        >
          <NavButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            icon={<DashboardIcon />}
            label="Overview"
          />
          <NavButton
            active={activeTab === "orders"}
            onClick={() => setActiveTab("orders")}
            icon={<OrdersIcon />}
            label="Orders"
          />
          <NavButton
            active={activeTab === "menu"}
            onClick={() => setActiveTab("menu")}
            icon={<MenuIcon />}
            label="Menu"
          />
          <NavButton
            active={activeTab === "analytics"}
            onClick={() => setActiveTab("analytics")}
            icon={<AnalyticsIcon />}
            label="Analytics"
          />
        </motion.div>
      </div>

      <div className="p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-6">
                <StatCard
                  title="Total Orders"
                  value={stats.totalOrders}
                  icon={<OrdersIcon />}
                  color="border-blue-500"
                />
                <StatCard
                  title="Revenue"
                  value={`RWF ${stats.totalRevenue.toLocaleString()}`}
                  icon={<MoneyIcon />}
                  color="border-green-500"
                />
                <StatCard
                  title="Active Orders"
                  value={stats.activeOrders}
                  icon={<KitchenIcon />}
                  color="border-purple-500"
                />
                <StatCard
                  title="Pending"
                  value={stats.pendingOrders}
                  icon={<TimeIcon />}
                  color="border-yellow-500"
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <DailyAnalyticsCard
                  analytics={dailyAnalytics}
                  loading={analyticsLoading}
                />
                <WeeklyAnalyticsCard
                  analytics={weeklyAnalytics}
                  loading={analyticsLoading}
                />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <OrdersIcon className="text-orange-500" /> Recent Orders
                </h2>
                <OrdersTable
                  orders={orders}
                  onUpdateStatus={updateOrderStatus}
                  onViewDetails={setSelectedOrder}
                  onDeleteOrder={deleteOrder}
                  itemsPerPage={8}
                />
              </div>
            </motion.div>
          )}
          {activeTab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OrdersTable
                orders={orders}
                onUpdateStatus={updateOrderStatus}
                onViewDetails={setSelectedOrder}
                onDeleteOrder={deleteOrder}
                itemsPerPage={8}
              />
            </motion.div>
          )}
          {activeTab === "menu" && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MenuManagement
                menuItems={menuItems}
                onAddItem={handleAddFood}
                onEditItem={handleEditFood}
                onDeleteItem={handleDeleteFood}
                onRefresh={fetchFoods}
              />
            </motion.div>
          )}
          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DailyAnalyticsCard
                  analytics={dailyAnalytics}
                  loading={analyticsLoading}
                />
                <WeeklyAnalyticsCard
                  analytics={weeklyAnalytics}
                  loading={analyticsLoading}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {selectedOrder && (
        <OrderDetailsModalComponent
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={updateOrderStatus}
        />
      )}
    </motion.div>
  );
};
