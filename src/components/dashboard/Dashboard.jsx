/* eslint-disable react-hooks/static-components */
/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/set-state-in-effect */

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
// } from "@mui/icons-material";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../App";
// import { DashboardLayout } from "../sidebar/Sidebar";

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

// // ========== ENHANCED ORDERS TABLE with sorting ==========
// const OrdersTable = ({ orders, onUpdateStatus, onViewDetails }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [currentPage, setCurrentPage] = useState(1);
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
//     if (sortBy === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortOrder("asc");
//     }
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
//         aVal = a.orderSummary?.total || 0;
//         bVal = b.orderSummary?.total || 0;
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
//                   {order.orderSummary?.totalItems || 0} items
//                 </td>
//                 <td className="px-4 py-3 text-sm font-semibold text-orange-600">
//                   RWF {order.orderSummary?.total?.toLocaleString()}
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

// // ========== IMAGE UPLOAD COMPONENT ==========
// const ImageUpload = ({
//   currentImage,
//   onImageChange,
//   onImageRemove,
//   label = "Item Image",
// }) => {
//   const [previewUrl, setPreviewUrl] = useState(currentImage || null);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef(null);

//   const handleFileSelect = (file) => {
//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result;
//         setPreviewUrl(base64String);
//         onImageChange(base64String);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       toast.error("Please select a valid image file");
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const file = e.dataTransfer.files[0];
//     handleFileSelect(file);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleRemove = () => {
//     setPreviewUrl(null);
//     onImageChange(null);
//     if (onImageRemove) onImageRemove();
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   return (
//     <div className="space-y-3">
//       <label className="block text-sm font-medium text-gray-700">{label}</label>
//       <div
//         className={`relative border-2 border-dashed rounded-xl p-4 transition-all ${
//           isDragging
//             ? "border-orange-500 bg-orange-50"
//             : "border-gray-300 hover:border-orange-400"
//         }`}
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//       >
//         {previewUrl ? (
//           <div className="relative">
//             <img
//               src={previewUrl}
//               alt="Preview"
//               className="h-32 w-full object-cover rounded-lg"
//             />
//             <button
//               type="button"
//               onClick={handleRemove}
//               className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
//             >
//               <Delete fontSize="small" />
//             </button>
//           </div>
//         ) : (
//           <div className="text-center py-6">
//             <CloudUploadIcon className="mx-auto h-12 w-12 text-gray-400" />
//             <p className="mt-2 text-sm text-gray-600">
//               Drag & drop an image here, or{" "}
//               <button
//                 type="button"
//                 onClick={() => fileInputRef.current?.click()}
//                 className="text-orange-500 hover:text-orange-600 font-medium"
//               >
//                 browse
//               </button>
//             </p>
//             <p className="text-xs text-gray-400 mt-1">
//               PNG, JPG, GIF up to 5MB
//             </p>
//           </div>
//         )}
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="image/*"
//           onChange={(e) => handleFileSelect(e.target.files[0])}
//           className="hidden"
//         />
//       </div>
//     </div>
//   );
// };

// // ========== FORM FIELD COMPONENT with label ==========
// const FormField = ({
//   label,
//   type = "text",
//   value,
//   onChange,
//   placeholder,
//   required,
//   rows,
//   options,
//   className = "",
// }) => {
//   if (type === "select") {
//     return (
//       <div className="flex flex-col gap-1">
//         <label className="text-sm font-medium text-gray-700">
//           {label} {required && <span className="text-red-500">*</span>}
//         </label>
//         <select
//           value={value}
//           onChange={onChange}
//           className={`w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 ${className}`}
//         >
//           {options?.map((opt) => (
//             <option key={opt} value={opt}>
//               {opt}
//             </option>
//           ))}
//         </select>
//       </div>
//     );
//   }

//   if (type === "textarea") {
//     return (
//       <div className="flex flex-col gap-1">
//         <label className="text-sm font-medium text-gray-700">
//           {label} {required && <span className="text-red-500">*</span>}
//         </label>
//         <textarea
//           rows={rows || 2}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           className={`w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 ${className}`}
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-1">
//       <label className="text-sm font-medium text-gray-700">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className={`w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 ${className}`}
//       />
//     </div>
//   );
// };

// const CheckboxField = ({ label, checked, onChange }) => (
//   <label className="flex items-center gap-2 text-sm text-gray-700">
//     <input
//       type="checkbox"
//       checked={checked}
//       onChange={onChange}
//       className="rounded text-orange-500 focus:ring-orange-400"
//     />
//     {label}
//   </label>
// );

// // ========== ENHANCED MENU MANAGEMENT with File Upload and Labeled Fields ==========
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
//   const [imageFile, setImageFile] = useState(null);
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
//     nutritionalInfo: {},
//     refluxTriggers: "",
//     migraineTriggers: "",
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

//   const handleImageChange = (base64Image) => {
//     setImageFile(base64Image);
//     setFormData({ ...formData, image: base64Image });
//   };

//   const handleImageRemove = () => {
//     setImageFile(null);
//     setFormData({ ...formData, image: "" });
//   };

//   const handleSubmit = () => {
//     const newItem = {
//       ...formData,
//       id: editingItem ? editingItem.id : editingItem?._id || Date.now(),
//       price: Number(formData.price),
//       prepTime: Number(formData.prepTime),
//       sodiumMg: formData.sodiumMg ? Number(formData.sodiumMg) : undefined,
//       ingredients: formData.ingredients.split(",").map((i) => i.trim()),
//       refluxTriggers: formData.refluxTriggers
//         .split(",")
//         .map((t) => t.trim())
//         .filter((t) => t),
//       migraineTriggers: formData.migraineTriggers
//         .split(",")
//         .map((t) => t.trim())
//         .filter((t) => t),
//       nutritionalInfo: formData.nutritionalInfo
//         ? typeof formData.nutritionalInfo === "string"
//           ? JSON.parse(formData.nutritionalInfo)
//           : formData.nutritionalInfo
//         : {},
//       image: imageFile || formData.image || "",
//     };
//     if (editingItem) onEditItem(newItem);
//     else onAddItem(newItem);
//     setShowModal(false);
//     resetForm();
//   };

//   const resetForm = () => {
//     setEditingItem(null);
//     setImageFile(null);
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
//       nutritionalInfo: {},
//       refluxTriggers: "",
//       migraineTriggers: "",
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
//       nutritionalInfo: item.nutritionalInfo
//         ? JSON.stringify(item.nutritionalInfo)
//         : "",
//       refluxTriggers: item.refluxTriggers?.join(", ") || "",
//       migraineTriggers: item.migraineTriggers?.join(", ") || "",
//     });
//     setImageFile(item.image || null);
//     setShowModal(true);
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
//         <div>
//           <h2 className="text-xl font-bold text-gray-800">
//             🍽️ Menu Management (Food Model)
//           </h2>
//           {!apiAvailable && (
//             <p className="text-xs text-yellow-600 mt-1 flex items-center gap-1">
//               <WarningIcon fontSize="small" /> API offline - changes saved
//               locally only
//             </p>
//           )}
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={onRefresh}
//             className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition shadow-md"
//           >
//             <RefreshIcon fontSize="small" /> Sync from API
//           </button>
//           <button
//             onClick={() => setShowModal(true)}
//             className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition shadow-md"
//           >
//             <AddIcon fontSize="small" /> Add Item
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//         {menuItems.map((item) => (
//           <div
//             key={item.id || item._id}
//             className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white"
//           >
//             <div className="h-40 w-full overflow-hidden bg-gray-100 relative">
//               {item.image ? (
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
//                   onError={(e) => {
//                     e.target.src =
//                       "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E";
//                   }}
//                 />
//               ) : (
//                 <div className="h-full w-full flex items-center justify-center bg-gray-100">
//                   <ImageIcon className="text-gray-400 text-4xl" />
//                 </div>
//               )}
//             </div>
//             <div className="p-4">
//               <div className="flex justify-between items-start">
//                 <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
//                 {item.purineLevel && (
//                   <span
//                     className={`text-xs px-2 py-0.5 rounded-full ${
//                       item.purineLevel === "low"
//                         ? "bg-green-100 text-green-700"
//                         : item.purineLevel === "moderate"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     Purine: {item.purineLevel}
//                   </span>
//                 )}
//               </div>
//               <p className="text-xs text-gray-500 mt-1 line-clamp-2">
//                 {item.description}
//               </p>
//               <div className="flex flex-wrap gap-1 mt-2">
//                 {item.containsGluten && (
//                   <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">
//                     Gluten
//                   </span>
//                 )}
//                 {item.containsDairy && (
//                   <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">
//                     Dairy
//                   </span>
//                 )}
//                 {item.containsPeanuts && (
//                   <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">
//                     Peanuts
//                   </span>
//                 )}
//                 {item.containsShellfish && (
//                   <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">
//                     Shellfish
//                   </span>
//                 )}
//               </div>
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

//       {menuItems.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">
//             No menu items found. Click "Sync from API" or "Add Item" to get
//             started.
//           </p>
//         </div>
//       )}

//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 modal-backdrop">
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
//           >
//             <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-t-2xl flex justify-between items-center sticky top-0">
//               <h2 className="text-white font-bold">
//                 {editingItem ? "Edit Menu Item" : "New Menu Item"}
//               </h2>
//               <button onClick={() => setShowModal(false)}>
//                 <CloseIcon className="text-white" />
//               </button>
//             </div>
//             <div className="p-5 space-y-4">
//               {/* Basic Information Section */}
//               <div className="bg-gray-50 p-4 rounded-xl">
//                 <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                   📋 Basic Information
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <FormField
//                     label="Item Name"
//                     required
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     placeholder="e.g., Grilled Tilapia"
//                   />
//                   <FormField
//                     label="Price (RWF)"
//                     type="number"
//                     required
//                     value={formData.price}
//                     onChange={(e) =>
//                       setFormData({ ...formData, price: e.target.value })
//                     }
//                     placeholder="e.g., 4500"
//                   />
//                   <FormField
//                     label="Category"
//                     type="select"
//                     value={formData.category}
//                     onChange={(e) =>
//                       setFormData({ ...formData, category: e.target.value })
//                     }
//                     options={categories}
//                   />
//                   <FormField
//                     label="Purine Level"
//                     type="select"
//                     value={formData.purineLevel}
//                     onChange={(e) =>
//                       setFormData({ ...formData, purineLevel: e.target.value })
//                     }
//                     options={purineLevels}
//                   />
//                   <FormField
//                     label="Prep Time (minutes)"
//                     type="number"
//                     value={formData.prepTime}
//                     onChange={(e) =>
//                       setFormData({ ...formData, prepTime: e.target.value })
//                     }
//                     placeholder="e.g., 15"
//                   />
//                 </div>
//               </div>

//               {/* Image Upload */}
//               <div className="bg-gray-50 p-4 rounded-xl">
//                 <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                   🖼️ Food Image
//                 </h3>
//                 <ImageUpload
//                   currentImage={imageFile || formData.image}
//                   onImageChange={handleImageChange}
//                   onImageRemove={handleImageRemove}
//                   label="Upload Food Image"
//                 />
//               </div>

//               {/* Description & Ingredients */}
//               <div className="bg-gray-50 p-4 rounded-xl">
//                 <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                   📝 Description & Ingredients
//                 </h3>
//                 <div className="space-y-4">
//                   <FormField
//                     label="Ingredients"
//                     type="textarea"
//                     rows={2}
//                     value={formData.ingredients}
//                     onChange={(e) =>
//                       setFormData({ ...formData, ingredients: e.target.value })
//                     }
//                     placeholder="e.g., tilapia, lemon, garlic, salt (comma separated)"
//                   />
//                   <FormField
//                     label="Description"
//                     type="textarea"
//                     rows={2}
//                     value={formData.description}
//                     onChange={(e) =>
//                       setFormData({ ...formData, description: e.target.value })
//                     }
//                     placeholder="Describe the dish..."
//                   />
//                 </div>
//               </div>

//               {/* Allergens Section */}
//               <div className="bg-gray-50 p-4 rounded-xl">
//                 <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                   ⚠️ Allergens & Dietary
//                 </h3>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                   <CheckboxField
//                     label="Contains Gluten"
//                     checked={formData.containsGluten}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         containsGluten: e.target.checked,
//                       })
//                     }
//                   />
//                   <CheckboxField
//                     label="Contains Dairy"
//                     checked={formData.containsDairy}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         containsDairy: e.target.checked,
//                       })
//                     }
//                   />
//                   <CheckboxField
//                     label="Contains Peanuts"
//                     checked={formData.containsPeanuts}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         containsPeanuts: e.target.checked,
//                       })
//                     }
//                   />
//                   <CheckboxField
//                     label="Contains Shellfish"
//                     checked={formData.containsShellfish}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         containsShellfish: e.target.checked,
//                       })
//                     }
//                   />
//                   <CheckboxField
//                     label="High Salt"
//                     checked={formData.highSalt}
//                     onChange={(e) =>
//                       setFormData({ ...formData, highSalt: e.target.checked })
//                     }
//                   />
//                 </div>
//               </div>

//               {/* Health Triggers & Nutrition */}
//               <div className="bg-gray-50 p-4 rounded-xl">
//                 <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                   💊 Health Triggers & Nutrition
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <FormField
//                     label="Sodium (mg)"
//                     type="number"
//                     value={formData.sodiumMg}
//                     onChange={(e) =>
//                       setFormData({ ...formData, sodiumMg: e.target.value })
//                     }
//                     placeholder="e.g., 500"
//                   />
//                   <FormField
//                     label="Reflux Triggers"
//                     value={formData.refluxTriggers}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         refluxTriggers: e.target.value,
//                       })
//                     }
//                     placeholder="e.g., spicy, acidic (comma separated)"
//                   />
//                   <FormField
//                     label="Migraine Triggers"
//                     value={formData.migraineTriggers}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         migraineTriggers: e.target.value,
//                       })
//                     }
//                     placeholder="e.g., caffeine, MSG (comma separated)"
//                   />
//                   <FormField
//                     label="Nutritional Info (JSON)"
//                     type="textarea"
//                     rows={2}
//                     value={
//                       typeof formData.nutritionalInfo === "object"
//                         ? JSON.stringify(formData.nutritionalInfo)
//                         : formData.nutritionalInfo
//                     }
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         nutritionalInfo: e.target.value,
//                       })
//                     }
//                     placeholder='{"calories": 450, "protein": "25g", "carbs": "30g"}'
//                   />
//                 </div>
//               </div>

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

// // ========== REVENUE CHART ==========
// const RevenueChart = ({ data }) => {
//   const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);
//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//       <h2 className="text-lg font-bold text-gray-800 mb-4">
//         📊 Revenue Overview (Last 7 days)
//       </h2>
//       <div className="h-64 flex items-end gap-2 sm:gap-3 overflow-x-auto pb-2">
//         {data.map((day, idx) => (
//           <div
//             key={idx}
//             className="flex-1 min-w-[50px] flex flex-col items-center gap-2"
//           >
//             <div
//               className="w-full bg-orange-100 rounded-t-xl relative"
//               style={{ height: `${(day.revenue / maxRevenue) * 180}px` }}
//             >
//               <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-medium text-gray-700 whitespace-nowrap">
//                 RWF {day.revenue.toLocaleString()}
//               </div>
//               <div
//                 className="w-full bg-orange-500 rounded-t-xl transition-all"
//                 style={{ height: `${(day.revenue / maxRevenue) * 100}%` }}
//               ></div>
//             </div>
//             <span className="text-[11px] sm:text-xs text-gray-500">
//               {day.day}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ========== ORDER DETAILS MODAL ==========
// const OrderDetailsModal = ({ order, onClose, onUpdateStatus }) => {
//   if (!order) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <motion.div
//         initial={{ scale: 0.95 }}
//         animate={{ scale: 1 }}
//         className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//       >
//         <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0">
//           <h2 className="text-white font-bold text-xl">Order Details</h2>
//           <button onClick={onClose}>
//             <CloseIcon className="text-white" />
//           </button>
//         </div>
//         <div className="p-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-xl">
//             <div>
//               <p className="text-xs text-gray-500">Order ID</p>
//               <p className="font-mono font-medium">{order.orderId}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Table</p>
//               <p className="font-medium">
//                 Table {order.personDetails?.tableNumber}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Customer</p>
//               <p className="font-medium">
//                 {order.personDetails?.name || "Guest"}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Status</p>
//               <select
//                 value={order.status}
//                 onChange={(e) => onUpdateStatus(order, e.target.value)}
//                 className="border rounded-md px-2 py-1 text-sm"
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
//                   <option key={s}>{s}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Order Type</p>
//               <p className="font-medium">
//                 {order.personDetails?.orderType || "dine-in"}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Created At</p>
//               <p className="font-medium">
//                 {new Date(order.createdAt).toLocaleString()}
//               </p>
//             </div>
//           </div>
//           <h3 className="font-bold mb-3">Items</h3>
//           <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
//             {order.orderSummary?.items?.map((item, idx) => (
//               <div key={idx} className="border-b pb-2 flex justify-between">
//                 <span>
//                   {item.quantity}x {item.name}
//                 </span>
//                 <span className="text-orange-600">
//                   RWF {item.finalPrice?.toLocaleString()}
//                 </span>
//               </div>
//             ))}
//           </div>
//           <div className="border-t pt-4 flex justify-between font-bold">
//             <span>Total</span>
//             <span className="text-orange-600">
//               RWF {order.orderSummary?.total?.toLocaleString()}
//             </span>
//           </div>
//           {order.bookingDetails?.specialInstructions && (
//             <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
//               <p className="text-xs text-gray-500">Special Instructions</p>
//               <p className="text-sm">
//                 {order.bookingDetails.specialInstructions}
//               </p>
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== API STATUS BANNER ==========
// const ApiStatusBanner = ({ isAvailable, onRetry }) => {
//   if (isAvailable) return null;

//   return (
//     <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r-xl flex justify-between items-center">
//       <div className="flex items-center gap-3">
//         <WarningIcon className="text-red-500" />
//         <div>
//           <p className="text-red-700 font-medium">API Connection Error</p>
//           <p className="text-red-600 text-sm">
//             Cannot connect to the server. Using local data only. Changes will be
//             saved locally.
//           </p>
//         </div>
//       </div>
//       <button
//         onClick={onRetry}
//         className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
//       >
//         Retry Connection
//       </button>
//     </div>
//   );
// };

// // ========== MAIN DASHBOARD COMPONENT ==========
// export const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [orders, setOrders] = useState([]);
//   const [allOrders, setAllOrders] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [apiAvailable, setApiAvailable] = useState(true);
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     totalRevenue: 0,
//     activeOrders: 0,
//     pendingOrders: 0,
//     completedToday: 0,
//     avgPrepTime: 0,
//   });
//   const [revenueData, setRevenueData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user } = useAuth();

//   const API_BASE_URL = "https://nutriscan-foodanddrinksupply.onrender.com";

//   const handleNavigation = (path) => navigate(path);

//   // Fetch orders from API with timeout and error handling
//   const fetchOrders = useCallback(async () => {
//     try {
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

//       const response = await fetch(`${API_BASE_URL}/orders`, {
//         signal: controller.signal,
//         headers: { Accept: "application/json" },
//       });
//       clearTimeout(timeoutId);

//       if (!response.ok) throw new Error(`HTTP ${response.status}`);

//       const data = await response.json();
//       if (data.success && data.orders) {
//         const transformedOrders = data.orders.map((order) => ({
//           ...order,
//           status:
//             order.status || order.bookingDetails?.currentStatus || "pending",
//           personDetails: order.personDetails || {},
//           orderSummary: order.orderSummary || {},
//           orderId: order.orderId,
//           _id: order._id,
//           createdAt: order.createdAt,
//         }));
//         setAllOrders(transformedOrders);
//         setOrders(transformedOrders);
//         computeStatsAndRevenue(transformedOrders);
//         setApiAvailable(true);
//       } else {
//         loadFromLocalStorage();
//       }
//     } catch (error) {
//       console.warn("API unavailable, using local data:", error.message);
//       setApiAvailable(false);
//       loadFromLocalStorage();
//       toast.warning("API server unavailable - using cached data");
//     }
//   }, []);

//   const loadFromLocalStorage = () => {
//     const storedOrders = JSON.parse(
//       localStorage.getItem("demo_orders_backup") || "[]",
//     );
//     if (storedOrders.length > 0) {
//       setAllOrders(storedOrders);
//       setOrders(storedOrders);
//       computeStatsAndRevenue(storedOrders);
//     } else {
//       // Sample demo data
//       const sampleOrders = [
//         {
//           _id: "sample1",
//           orderId: "ORD-1001",
//           status: "pending",
//           personDetails: { name: "Alice", tableNumber: "12" },
//           orderSummary: {
//             total: 6000,
//             totalItems: 2,
//             items: [{ name: "Pizza", quantity: 2, finalPrice: 6000 }],
//           },
//           createdAt: new Date().toISOString(),
//         },
//         {
//           _id: "sample2",
//           orderId: "ORD-1002",
//           status: "confirmed",
//           personDetails: { name: "Bob", tableNumber: "5" },
//           orderSummary: {
//             total: 3500,
//             totalItems: 1,
//             items: [{ name: "Burger", quantity: 1, finalPrice: 3500 }],
//           },
//           createdAt: new Date(Date.now() - 3600000).toISOString(),
//         },
//       ];
//       setAllOrders(sampleOrders);
//       setOrders(sampleOrders);
//       computeStatsAndRevenue(sampleOrders);
//     }
//   };

//   // Fetch foods from API
//   const fetchFoods = useCallback(async () => {
//     try {
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 10000);

//       const response = await fetch(`${API_BASE_URL}/foods`, {
//         signal: controller.signal,
//         headers: { Accept: "application/json" },
//       });
//       clearTimeout(timeoutId);

//       if (!response.ok) throw new Error(`HTTP ${response.status}`);

//       const data = await response.json();
//       if (data.success && data.foods) {
//         const transformedFoods = data.foods.map((food) => ({
//           ...food,
//           id: food._id,
//         }));
//         setMenuItems(transformedFoods);
//         localStorage.setItem(
//           "menu_items_foods_backup",
//           JSON.stringify(transformedFoods),
//         );
//         if (transformedFoods.length > 0) {
//           toast.success(
//             `Loaded ${transformedFoods.length} menu items from API`,
//           );
//         }
//         setApiAvailable(true);
//       } else {
//         loadMenuFromLocalStorage();
//       }
//     } catch (error) {
//       console.warn("Foods API unavailable:", error.message);
//       loadMenuFromLocalStorage();
//     }
//   }, []);

//   const loadMenuFromLocalStorage = () => {
//     const storedMenu = JSON.parse(
//       localStorage.getItem("menu_items_foods_backup") || "[]",
//     );
//     if (storedMenu.length > 0) {
//       setMenuItems(storedMenu);
//       toast.info(`Loaded ${storedMenu.length} menu items from local storage`);
//     } else {
//       // Sample menu data matching Food schema
//       const sampleMenu = [
//         {
//           _id: "sample1",
//           name: "Grilled Tilapia",
//           price: 4500,
//           ingredients: ["tilapia", "lemon", "garlic"],
//           description: "Fresh lake tilapia grilled to perfection",
//           prepTime: 16,
//           category: "Seafood",
//           image: "",
//           purineLevel: "moderate",
//           containsGluten: false,
//           containsDairy: false,
//           containsPeanuts: false,
//           containsShellfish: false,
//           highSalt: false,
//           sodiumMg: 320,
//         },
//         {
//           _id: "sample2",
//           name: "Isombe ya Nyama",
//           price: 2800,
//           ingredients: ["cassava leaves", "beef"],
//           description: "Traditional cassava leaf stew with beef",
//           prepTime: 18,
//           category: "Mains",
//           image: "",
//           purineLevel: "moderate",
//           containsGluten: false,
//           containsDairy: false,
//           containsPeanuts: false,
//           containsShellfish: false,
//           highSalt: true,
//           sodiumMg: 480,
//         },
//       ];
//       setMenuItems(sampleMenu);
//       localStorage.setItem(
//         "menu_items_foods_backup",
//         JSON.stringify(sampleMenu),
//       );
//     }
//   };

//   const updateOrderStatus = async (order, newStatus) => {
//     if (!apiAvailable) {
//       // Local update only
//       const updatedAllOrders = allOrders.map((o) =>
//         o._id === order._id ? { ...o, status: newStatus } : o,
//       );
//       setAllOrders(updatedAllOrders);
//       setOrders(updatedAllOrders);
//       computeStatsAndRevenue(updatedAllOrders);
//       localStorage.setItem(
//         "demo_orders_backup",
//         JSON.stringify(updatedAllOrders),
//       );
//       toast.success(`Order status updated to ${newStatus} (local only)`);
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/orders/${order._id}/status`,
//         {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ status: newStatus }),
//         },
//       );
//       if (response.ok) {
//         const updatedAllOrders = allOrders.map((o) =>
//           o._id === order._id ? { ...o, status: newStatus } : o,
//         );
//         setAllOrders(updatedAllOrders);
//         setOrders(updatedAllOrders);
//         computeStatsAndRevenue(updatedAllOrders);
//         toast.success(`Order status updated to ${newStatus}`);
//       } else {
//         throw new Error("API update failed");
//       }
//     } catch (error) {
//       // Fallback to local update
//       const updatedAllOrders = allOrders.map((o) =>
//         o._id === order._id ? { ...o, status: newStatus } : o,
//       );
//       setAllOrders(updatedAllOrders);
//       setOrders(updatedAllOrders);
//       computeStatsAndRevenue(updatedAllOrders);
//       localStorage.setItem(
//         "demo_orders_backup",
//         JSON.stringify(updatedAllOrders),
//       );
//       toast.warning(`Order updated locally (API sync failed)`);
//     }
//   };

//   const computeStatsAndRevenue = (ordersList) => {
//     const totalOrders = ordersList.length;
//     const totalRevenue = ordersList.reduce(
//       (s, o) => s + (o.orderSummary?.total || 0),
//       0,
//     );
//     const activeOrders = ordersList.filter(
//       (o) => !["completed", "cancelled"].includes(o.status),
//     ).length;
//     const pendingOrders = ordersList.filter(
//       (o) => o.status === "pending",
//     ).length;
//     const completedToday = ordersList.filter(
//       (o) =>
//         o.status === "completed" &&
//         new Date(o.createdAt).toDateString() === new Date().toDateString(),
//     ).length;
//     setStats({
//       totalOrders,
//       totalRevenue,
//       activeOrders,
//       pendingOrders,
//       completedToday,
//       avgPrepTime: 18,
//     });

//     const last7 = [];
//     for (let i = 6; i >= 0; i--) {
//       let d = new Date();
//       d.setDate(d.getDate() - i);
//       const rev = ordersList
//         .filter(
//           (o) =>
//             new Date(o.createdAt).toDateString() === d.toDateString() &&
//             o.status !== "cancelled",
//         )
//         .reduce((s, o) => s + (o.orderSummary?.total || 0), 0);
//       last7.push({
//         day: d.toLocaleDateString("en-US", { weekday: "short" }),
//         revenue: rev,
//       });
//     }
//     setRevenueData(last7);
//   };

//   // CRUD operations for menu items
//   const addMenuItem = async (item) => {
//     const newItem = {
//       ...item,
//       _id: item._id || Date.now().toString(),
//       id: item._id || Date.now().toString(),
//     };
//     const updated = [...menuItems, newItem];
//     setMenuItems(updated);
//     localStorage.setItem("menu_items_foods_backup", JSON.stringify(updated));

//     if (apiAvailable) {
//       try {
//         const response = await fetch(`${API_BASE_URL}/foods`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(item),
//         });
//         if (response.ok) {
//           toast.success("Item added to API");
//           fetchFoods(); // Refresh from API
//         } else {
//           toast.warning("Item saved locally (API sync failed)");
//         }
//       } catch (error) {
//         toast.warning("Item saved locally (API unavailable)");
//       }
//     } else {
//       toast.success("Item added locally");
//     }
//   };

//   const editMenuItem = async (item) => {
//     const updated = menuItems.map((m) => (m._id === item._id ? item : m));
//     setMenuItems(updated);
//     localStorage.setItem("menu_items_foods_backup", JSON.stringify(updated));

//     if (apiAvailable && item._id && !item._id.toString().startsWith("sample")) {
//       try {
//         await fetch(`${API_BASE_URL}/foods/${item._id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(item),
//         });
//         toast.success("Item updated in API");
//       } catch (error) {
//         toast.warning("Item updated locally (API unavailable)");
//       }
//     } else {
//       toast.success("Item updated locally");
//     }
//   };

//   const deleteMenuItem = async (id) => {
//     const filtered = menuItems.filter((m) => m._id !== id);
//     setMenuItems(filtered);
//     localStorage.setItem("menu_items_foods_backup", JSON.stringify(filtered));

//     if (apiAvailable && !id.toString().startsWith("sample")) {
//       try {
//         await fetch(`${API_BASE_URL}/foods/${id}`, { method: "DELETE" });
//         toast.success("Item deleted from API");
//       } catch (error) {
//         toast.warning("Item deleted locally (API unavailable)");
//       }
//     } else {
//       toast.success("Item deleted locally");
//     }
//   };

//   const retryConnection = () => {
//     setLoading(true);
//     Promise.all([fetchOrders(), fetchFoods()]).finally(() => setLoading(false));
//   };

//   const exportData = () => {
//     const blob = new Blob(
//       [
//         JSON.stringify({
//           orders: allOrders,
//           menuItems,
//           exportDate: new Date().toISOString(),
//         }),
//       ],
//       { type: "application/json" },
//     );
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(blob);
//     a.download = `export_${new Date().toISOString()}.json`;
//     a.click();
//     toast.success("Data exported");
//   };

//   useEffect(() => {
//     Promise.all([fetchOrders(), fetchFoods()]).finally(() => setLoading(false));
//   }, [fetchOrders, fetchFoods]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (apiAvailable) fetchOrders();
//     }, 60000); // Check every minute
//     return () => clearInterval(interval);
//   }, [fetchOrders, apiAvailable]);

//   if (loading)
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//       </div>
//     );

//   return (
//     <DashboardLayout
//       user={user}
//       currentPath={location.pathname}
//       onNavigate={handleNavigation}
//     >
//       <div className="min-h-screen bg-gray-100">
//         <ToastContainer position="top-right" />

//         <header className="bg-white shadow-sm sticky top-0 z-10 px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center gap-3">
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
//               title="Refresh all"
//             >
//               <RefreshIcon />
//             </button>
//             <button
//               onClick={exportData}
//               className="p-2 hover:bg-gray-100 rounded-full"
//             >
//               <DownloadIcon />
//             </button>
//             <div className="flex items-center gap-2 pl-3">
//               <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
//                 <PersonIcon className="text-white text-sm" />
//               </div>
//               <span className="text-sm font-medium hidden sm:inline">
//                 Manager
//               </span>
//               {!apiAvailable && (
//                 <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full ml-2">
//                   Offline Mode
//                 </span>
//               )}
//             </div>
//           </div>
//         </header>

//         <ApiStatusBanner isAvailable={apiAvailable} onRetry={retryConnection} />

//         <div className="px-4 sm:px-6 pt-4 border-b bg-white overflow-x-auto flex gap-1">
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
//                   trend="up"
//                   trendValue="+12%"
//                 />
//                 <StatCard
//                   title="Revenue"
//                   value={`RWF ${stats.totalRevenue.toLocaleString()}`}
//                   icon={<MoneyIcon className="text-green-600" />}
//                   color="border-green-500"
//                   trend="up"
//                   trendValue="+8%"
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
//               <RevenueChart data={revenueData} />
//               <div className="mt-6">
//                 <h2 className="text-lg font-bold mb-4">📋 All Orders</h2>
//                 <OrdersTable
//                   orders={orders}
//                   onUpdateStatus={updateOrderStatus}
//                   onViewDetails={setSelectedOrder}
//                 />
//               </div>
//             </>
//           )}
//           {activeTab === "orders" && (
//             <OrdersTable
//               orders={orders}
//               onUpdateStatus={updateOrderStatus}
//               onViewDetails={setSelectedOrder}
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
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <RevenueChart data={revenueData} />
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h2 className="font-bold">Order Status Distribution</h2>
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
//                 <div className="mt-6 pt-4 border-t">
//                   <h3 className="font-bold mb-2">Menu Stats</h3>
//                   <p>Total Menu Items: {menuItems.length}</p>
//                   <p>
//                     Categories:{" "}
//                     {[...new Set(menuItems.map((i) => i.category))].join(", ")}
//                   </p>
//                 </div>
//                 {!apiAvailable && (
//                   <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-700">
//                     ⚠️ Working in offline mode. Changes are saved locally and
//                     will sync when API reconnects.
//                   </div>
//                 )}
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
//     </DashboardLayout>
//   );
// };











/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/purity */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dashboard as DashboardIcon,
  RestaurantMenu as MenuIcon,
  ShoppingCart as OrdersIcon,
  Analytics as AnalyticsIcon,
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
  Add as AddIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  AccessTime as TimeIcon,
  AttachMoney as MoneyIcon,
  Person as PersonIcon,
  Restaurant as RestaurantIcon,
  Sort as SortIcon,
  FilterList as FilterIcon,
  CloudUpload as CloudUploadIcon,
  Image as ImageIcon,
  Warning as WarningIcon,
  Delete,
  Lightbulb as LightbulbIcon,
  Settings as SettingsIcon,
  LocalOffer as LocalOfferIcon,
  Assignment as AssignmentIcon,
  Healing as HealingIcon,
  Checklist as ChecklistIcon,
  Schedule as ScheduleIcon,
  NoteAlt as NoteIcon,
  TrendingUp as TrendingUpIcon,
  ShowChart as ShowChartIcon,
  PieChart as PieChartIcon,
  Today as TodayIcon,
  DateRange as DateRangeIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ========== STATISTICS CARD ==========
const StatCard = ({ title, value, icon, color, trend, trendValue }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-2xl shadow-md p-4 sm:p-5 border-l-4 ${color} hover:shadow-lg transition-all duration-200`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-xs sm:text-sm font-medium">
            {title}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1 break-words">
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend === "up" ? (
                <ArrowUpIcon className="text-green-500 text-sm" />
              ) : (
                <ArrowDownIcon className="text-red-500 text-sm" />
              )}
              <span
                className={`text-xs ${trend === "up" ? "text-green-600" : "text-red-600"}`}
              >
                {trendValue}
              </span>
            </div>
          )}
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

// ========== DAILY ANALYTICS CARD ==========
const DailyAnalytics = ({ analytics, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const COLORS = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <TodayIcon className="text-orange-500" />
        <h2 className="text-lg font-bold text-gray-800">Daily Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stats Summary */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Total Orders Today</p>
            <p className="text-2xl font-bold text-green-600">
              {analytics.totalOrders || 0}
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Total Income Today</p>
            <p className="text-2xl font-bold text-blue-600">
              RWF {(analytics.totalIncome || 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Top Plates Chart */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">
            Top Selling Items
          </p>
          {analytics.topPlates && analytics.topPlates.length > 0 ? (
            <div className="space-y-3">
              {analytics.topPlates.map((plate, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-gray-700">{plate.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-orange-600">
                      {plate.quantity}
                    </span>
                    <span className="text-xs text-gray-400">sold</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No data available</p>
          )}
        </div>
      </div>

      {/* Top Plates Bar Chart */}
      {analytics.topPlates && analytics.topPlates.length > 0 && (
        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.topPlates}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#FF6B6B" name="Quantity Sold" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

// ========== WEEKLY ANALYTICS CARD ==========
const WeeklyAnalytics = ({ analytics, loading }) => {
  const [chartType, setChartType] = useState("line");

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!analytics || !analytics.data || analytics.data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <DateRangeIcon className="text-orange-500" />
          <h2 className="text-lg font-bold text-gray-800">Weekly Analytics</h2>
        </div>
        <p className="text-center text-gray-400 py-8">
          No weekly data available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <DateRangeIcon className="text-orange-500" />
          <h2 className="text-lg font-bold text-gray-800">Weekly Analytics</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType("line")}
            className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
              chartType === "line"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <ShowChartIcon fontSize="small" /> Line
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
              chartType === "bar"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <BarChartIcon fontSize="small" /> Bar
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 p-3 rounded-xl">
          <p className="text-xs text-gray-500">Total Orders (Week)</p>
          <p className="text-xl font-bold text-green-600">
            {analytics.data?.reduce((sum, d) => sum + (d.orders || 0), 0) || 0}
          </p>
        </div>
        <div className="bg-blue-50 p-3 rounded-xl">
          <p className="text-xs text-gray-500">Total Revenue (Week)</p>
          <p className="text-xl font-bold text-blue-600">
            RWF{" "}
            {(
              analytics.data?.reduce((sum, d) => sum + (d.revenue || 0), 0) || 0
            ).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart data={analytics.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "revenue")
                    return `RWF ${value.toLocaleString()}`;
                  return value;
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="orders"
                stroke="#FF6B6B"
                name="Orders"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#4ECDC4"
                name="Revenue"
                strokeWidth={2}
              />
            </LineChart>
          ) : (
            <BarChart data={analytics.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "revenue")
                    return `RWF ${value.toLocaleString()}`;
                  return value;
                }}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="orders"
                fill="#FF6B6B"
                name="Orders"
              />
              <Bar
                yAxisId="right"
                dataKey="revenue"
                fill="#4ECDC4"
                name="Revenue"
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// ========== ORDER RECOMMENDATIONS COMPONENT ==========
const OrderRecommendations = ({ order }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const generateRecommendations = () => {
      const recs = [];
      const items = order.items || order.orderSummary?.items || [];

      const hasSpicyItems = items.some(
        (item) =>
          item.name?.toLowerCase().includes("spicy") ||
          item.customizations?.some((c) => c.toLowerCase().includes("spicy")),
      );

      const hasDairyItems = items.some(
        (item) =>
          item.name?.toLowerCase().includes("cheese") ||
          item.name?.toLowerCase().includes("cream") ||
          item.name?.toLowerCase().includes("milk"),
      );

      const hasGlutenItems = items.some(
        (item) =>
          item.name?.toLowerCase().includes("bread") ||
          item.name?.toLowerCase().includes("pasta") ||
          item.name?.toLowerCase().includes("pizza"),
      );

      if (hasSpicyItems) {
        recs.push({
          type: "health",
          icon: <HealingIcon className="text-orange-500" />,
          title: "Acid Reflux Alert",
          description:
            "This order contains spicy items. Consider offering a side of yogurt or mint tea to help with digestion.",
          priority: "high",
        });
      }

      if (hasDairyItems) {
        recs.push({
          type: "health",
          icon: <HealingIcon className="text-blue-500" />,
          title: "Lactose Consideration",
          description:
            "Contains dairy products. Ensure lactose-free alternatives are available if requested.",
          priority: "medium",
        });
      }

      if (hasGlutenItems) {
        recs.push({
          type: "dietary",
          icon: <NutritionIcon className="text-yellow-500" />,
          title: "Gluten-Free Option",
          description:
            "Consider suggesting gluten-free alternatives for customers with celiac disease or gluten sensitivity.",
          priority: "medium",
        });
      }

      if (items.length < 3) {
        recs.push({
          type: "upsell",
          icon: <LocalOfferIcon className="text-green-500" />,
          title: "Add a Side Dish",
          description:
            "Customer ordered few items. Suggest adding fries, salad, or a beverage to complete the meal.",
          priority: "low",
        });
      }

      const itemNames = items.map((i) => i.name?.toLowerCase());
      if (
        itemNames.some((n) => n?.includes("burger")) &&
        !itemNames.some((n) => n?.includes("fries"))
      ) {
        recs.push({
          type: "pairing",
          icon: <RestaurantIcon className="text-purple-500" />,
          title: "Popular Pairing",
          description:
            "Customers who ordered burgers also enjoyed our crispy fries or onion rings.",
          priority: "medium",
        });
      }

      if (
        order.notes?.toLowerCase().includes("birthday") ||
        order.bookingDetails?.specialInstructions
          ?.toLowerCase()
          .includes("birthday")
      ) {
        recs.push({
          type: "occasion",
          icon: <ChecklistIcon className="text-pink-500" />,
          title: "Birthday Celebration",
          description:
            "Add a complimentary dessert or candle to make the celebration special!",
          priority: "high",
        });
      }

      return recs;
    };

    setRecommendations(generateRecommendations());
  }, [order]);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="font-bold mb-3 flex items-center gap-2">
        <LightbulbIcon className="text-yellow-500" />
        AI Recommendations & Insights
      </h3>
      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg border-l-4 ${
              rec.priority === "high"
                ? "bg-orange-50 border-orange-500"
                : rec.priority === "medium"
                  ? "bg-blue-50 border-blue-500"
                  : "bg-gray-50 border-gray-400"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{rec.icon}</div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{rec.title}</p>
                <p className="text-xs text-gray-600 mt-1">{rec.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ========== ENHANCED ORDER DETAILS MODAL ==========
const OrderDetailsModal = ({ order, onClose, onUpdateStatus }) => {
  const [activeInfoTab, setActiveInfoTab] = useState("details");

  if (!order) return null;

  const getOrderTotal = () => {
    if (order.orderSummary?.total) return order.orderSummary.total;
    if (order.items) {
      return order.items.reduce(
        (sum, item) => sum + (item.finalPrice || item.originalPrice || 0),
        0,
      );
    }
    return 0;
  };

  const getAllCustomizations = () => {
    const items = order.items || order.orderSummary?.items || [];
    const customizations = [];
    items.forEach((item) => {
      if (item.customizations && item.customizations.length > 0) {
        customizations.push({
          itemName: item.name,
          customizations: item.customizations,
          specialInstructions: item.specialInstructions,
        });
      }
    });
    return customizations;
  };

  const getAllSpecialInstructions = () => {
    const items = order.items || order.orderSummary?.items || [];
    const instructions = [];
    if (order.bookingDetails?.specialInstructions) {
      instructions.push({
        type: "order",
        instruction: order.bookingDetails.specialInstructions,
      });
    }
    if (order.notes) {
      instructions.push({
        type: "order",
        instruction: order.notes,
      });
    }
    items.forEach((item) => {
      if (item.specialInstructions) {
        instructions.push({
          type: "item",
          itemName: item.name,
          instruction: item.specialInstructions,
        });
      }
    });
    return instructions;
  };

  const customizations = getAllCustomizations();
  const instructions = getAllSpecialInstructions();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-white font-bold text-xl">Order Details</h2>
          <button onClick={onClose}>
            <CloseIcon className="text-white" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex border-b mb-4 overflow-x-auto">
            {[
              "details",
              "items",
              "customizations",
              "instructions",
              "recommendations",
              "timeline",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveInfoTab(tab)}
                className={`px-4 py-2 text-sm font-medium capitalize whitespace-nowrap ${
                  activeInfoTab === tab
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "details" && "Order Details"}
                {tab === "items" && "Items"}
                {tab === "customizations" && "Customizations"}
                {tab === "instructions" && "Instructions"}
                {tab === "recommendations" && "Recommendations"}
                {tab === "timeline" && "Timeline"}
              </button>
            ))}
          </div>

          {activeInfoTab === "details" && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-xl">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="font-mono font-medium text-sm break-all">
                    {order.orderId}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Table Number</p>
                  <p className="font-medium text-lg">
                    Table {order.personDetails?.tableNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Customer Name</p>
                  <div className="flex items-center gap-2">
                    <PersonIcon className="text-gray-400 text-sm" />
                    <p className="font-medium">
                      {order.personDetails?.name || "Guest"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Order Type</p>
                  <p className="font-medium">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.personDetails?.orderType === "dine-in"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.personDetails?.orderType || "dine-in"}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Current Status</p>
                  <select
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order, e.target.value)}
                    className="border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400"
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
                  </select>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Created At</p>
                  <p className="font-medium text-sm flex items-center gap-1">
                    <ScheduleIcon className="text-gray-400 text-sm" />
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-orange-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Total Items</p>
                  <p className="text-xl font-bold text-orange-600">
                    {order.items?.reduce(
                      (sum, i) => sum + (i.quantity || 1),
                      0,
                    ) || 0}
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Total Amount</p>
                  <p className="text-xl font-bold text-green-600">
                    RWF {getOrderTotal().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeInfoTab === "items" && (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {(order.items || []).map((item, idx) => (
                <div key={idx} className="border-b pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">
                        {item.quantity || 1}x {item.name}
                      </p>
                      {item.preparationTime && (
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                          <TimeIcon fontSize="small" /> Prep time:{" "}
                          {item.preparationTime} min
                        </p>
                      )}
                    </div>
                    <p className="font-semibold text-orange-600">
                      RWF{" "}
                      {(
                        item.finalPrice ||
                        item.originalPrice ||
                        0
                      ).toLocaleString()}
                    </p>
                  </div>
                  {item.customizations && item.customizations.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Customizations:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.customizations.map((c, i) => (
                          <span
                            key={i}
                            className="text-xs bg-gray-100 px-2 py-0.5 rounded-full"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeInfoTab === "customizations" && (
            <div>
              {customizations.length > 0 ? (
                <div className="space-y-4">
                  {customizations.map((cust, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-sm">{cust.itemName}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {cust.customizations.map((c, i) => (
                          <span
                            key={i}
                            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1"
                          >
                            <SettingsIcon fontSize="small" /> {c}
                          </span>
                        ))}
                      </div>
                      {cust.specialInstructions && (
                        <p className="text-xs text-gray-500 mt-2">
                          <NoteIcon fontSize="small" className="inline mr-1" />
                          {cust.specialInstructions}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  No customizations for this order
                </p>
              )}
            </div>
          )}

          {activeInfoTab === "instructions" && (
            <div>
              {instructions.length > 0 ? (
                <div className="space-y-3">
                  {instructions.map((inst, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg ${inst.type === "order" ? "bg-yellow-50" : "bg-gray-50"}`}
                    >
                      {inst.type === "item" && (
                        <p className="font-medium text-sm mb-1">
                          For: {inst.itemName}
                        </p>
                      )}
                      <p className="text-sm flex items-start gap-2">
                        <AssignmentIcon className="text-gray-400 text-sm mt-0.5" />
                        {inst.instruction}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  No special instructions
                </p>
              )}
            </div>
          )}

          {activeInfoTab === "recommendations" && (
            <OrderRecommendations order={order} />
          )}

          {activeInfoTab === "timeline" && (
            <div className="space-y-4">
              {order.bookingDetails?.statusHistory &&
              order.bookingDetails.statusHistory.length > 0 ? (
                order.bookingDetails.statusHistory.map((event, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      {idx < order.bookingDetails.statusHistory.length - 1 && (
                        <div className="w-0.5 h-12 bg-gray-300"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium capitalize">{event.status}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                      {event.note && (
                        <p className="text-xs text-gray-400 mt-1">
                          {event.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-8">
                  No timeline data available
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// ========== ENHANCED ORDERS TABLE ==========
const OrdersTable = ({
  orders,
  onUpdateStatus,
  onViewDetails,
  onDeleteOrder,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const itemsPerPage = 10;

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
      case "served":
        return "bg-teal-100 text-teal-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <TimeIcon className="text-yellow-600 text-sm" />;
      case "confirmed":
        return <CheckCircleIcon className="text-blue-600 text-sm" />;
      case "preparing":
        return <KitchenIcon className="text-purple-600 text-sm" />;
      case "ready":
        return <DeliveryIcon className="text-green-600 text-sm" />;
      case "served":
        return <DoneAllIcon className="text-teal-600 text-sm" />;
      case "completed":
        return <CheckCircleIcon className="text-gray-600 text-sm" />;
      case "cancelled":
        return <CancelIcon className="text-red-600 text-sm" />;
      default:
        return null;
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getOrderTotal = (order) => {
    if (order.orderSummary?.total) return order.orderSummary.total;
    if (order.items) {
      return order.items.reduce(
        (sum, item) => sum + (item.finalPrice || item.originalPrice || 0),
        0,
      );
    }
    return 0;
  };

  const getTotalItems = (order) => {
    if (order.orderSummary?.totalItems) return order.orderSummary.totalItems;
    if (order.items) {
      return order.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }
    return 0;
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.personDetails?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.personDetails?.tableNumber?.toString().includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let aVal, bVal;
    switch (sortBy) {
      case "createdAt":
        aVal = new Date(a.createdAt);
        bVal = new Date(b.createdAt);
        break;
      case "status":
        const statusOrder = {
          pending: 1,
          confirmed: 2,
          preparing: 3,
          ready: 4,
          served: 5,
          completed: 6,
          cancelled: 7,
        };
        aVal = statusOrder[a.status] || 99;
        bVal = statusOrder[b.status] || 99;
        break;
      case "total":
        aVal = getOrderTotal(a);
        bVal = getOrderTotal(b);
        break;
      case "tableNumber":
        aVal = a.personDetails?.tableNumber || 0;
        bVal = b.personDetails?.tableNumber || 0;
        break;
      default:
        aVal = a[sortBy];
        bVal = b[sortBy];
    }
    if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const SortButton = ({ field, label }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-orange-500 transition"
    >
      {label}
      {sortBy === field &&
        (sortOrder === "asc" ? (
          <ArrowUpIcon fontSize="small" />
        ) : (
          <ArrowDownIcon fontSize="small" />
        ))}
    </button>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl w-full max-w-md p-6"
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <WarningIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Delete Order
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this order? This action cannot
                be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onDeleteOrder(deleteConfirmId);
                    setDeleteConfirmId(null);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by Order ID, Customer, or Table..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white"
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
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                <SortButton field="orderId" label="Order ID" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                <SortButton field="tableNumber" label="Table" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Items
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                <SortButton field="total" label="Total" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                <SortButton field="status" label="Status" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                <SortButton field="createdAt" label="Time" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedOrders.map((order) => (
              <tr
                key={order._id || order.orderId}
                className="hover:bg-orange-50/30 transition"
              >
                <td className="px-4 py-3 text-sm font-mono text-gray-700">
                  {order.orderId?.slice(-8)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  Table {order.personDetails?.tableNumber}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {order.personDetails?.name || "Guest"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {getTotalItems(order)} items
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-orange-600">
                  RWF {getOrderTotal(order).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status?.charAt(0).toUpperCase() +
                      order.status?.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => onViewDetails(order)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded-md"
                      title="View Details"
                    >
                      <ViewIcon fontSize="small" />
                    </button>
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateStatus(order, e.target.value)}
                      className="text-xs border rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-orange-400"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready</option>
                      <option value="served">Served</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() =>
                        setDeleteConfirmId(order._id || order.orderId)
                      }
                      className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                      title="Delete Order"
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t flex flex-col sm:flex-row justify-between items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-lg disabled:opacity-50 text-sm"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-lg disabled:opacity-50 text-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

// ========== MENU MANAGEMENT ==========
const MenuManagement = ({
  menuItems,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onRefresh,
  apiAvailable,
}) => {
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
    "Vegan",
    "Seafood",
    "Desserts",
    "Beverages",
    "Appetizers",
    "Soups",
    "Salads",
  ];
  const purineLevels = ["low", "moderate", "high"];

  const handleSubmit = () => {
    const newItem = {
      ...formData,
      id: editingItem ? editingItem.id : Date.now(),
      price: Number(formData.price),
      prepTime: Number(formData.prepTime),
      sodiumMg: formData.sodiumMg ? Number(formData.sodiumMg) : undefined,
      ingredients: formData.ingredients.split(",").map((i) => i.trim()),
    };
    if (editingItem) onEditItem(newItem);
    else onAddItem(newItem);
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      name: "",
      price: "",
      ingredients: "",
      description: "",
      prepTime: "",
      category: "Mains",
      image: "",
      purineLevel: "low",
      containsGluten: false,
      containsPeanuts: false,
      containsShellfish: false,
      containsDairy: false,
      highSalt: false,
      sodiumMg: "",
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price,
      ingredients: item.ingredients?.join(", "),
      description: item.description || "",
      prepTime: item.prepTime || "",
      category: item.category || "Mains",
      image: item.image || "",
      purineLevel: item.purineLevel || "low",
      containsGluten: item.containsGluten || false,
      containsPeanuts: item.containsPeanuts || false,
      containsShellfish: item.containsShellfish || false,
      containsDairy: item.containsDairy || false,
      highSalt: item.highSalt || false,
      sodiumMg: item.sodiumMg || "",
    });
    setShowModal(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            🍽️ Menu Management
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition"
          >
            <RefreshIcon fontSize="small" /> Sync from API
          </button>
          <button
            onClick={() => {
              setEditingItem(null);
              setFormData({
                name: "",
                price: "",
                ingredients: "",
                description: "",
                prepTime: "",
                category: "Mains",
                image: "",
                purineLevel: "low",
                containsGluten: false,
                containsPeanuts: false,
                containsShellfish: false,
                containsDairy: false,
                highSalt: false,
                sodiumMg: "",
              });
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition"
          >
            <AddIcon fontSize="small" /> Add Item
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {menuItems.map((item) => (
          <div
            key={item.id || item._id}
            className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition bg-white"
          >
            <div className="h-40 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
              <ImageIcon className="text-gray-400 text-4xl" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {item.description}
              </p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-orange-600 font-bold text-base">
                  RWF {item.price?.toLocaleString()}
                </span>
                <span className="text-gray-400 text-xs flex items-center gap-1">
                  <TimeIcon fontSize="inherit" /> {item.prepTime || "N/A"} min
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-blue-500 text-white py-1.5 rounded-xl text-sm font-medium hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteItem(item.id || item._id)}
                  className="flex-1 bg-red-500 text-white py-1.5 rounded-xl text-sm font-medium hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-white font-bold">
                {editingItem ? "Edit Menu Item" : "New Menu Item"}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <CloseIcon className="text-white" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <input
                type="text"
                placeholder="Item Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded-xl"
              />
              <input
                type="number"
                placeholder="Price (RWF)"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full p-2 border rounded-xl"
              />
              <textarea
                placeholder="Ingredients (comma separated)"
                value={formData.ingredients}
                onChange={(e) =>
                  setFormData({ ...formData, ingredients: e.target.value })
                }
                className="w-full p-2 border rounded-xl"
                rows={2}
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2 border rounded-xl"
                rows={2}
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-orange-500 text-white py-2.5 rounded-xl font-bold hover:bg-orange-600 transition"
              >
                {editingItem ? "Update Item" : "Create Item"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// ========== MAIN DASHBOARD ==========
export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [apiAvailable, setApiAvailable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dailyAnalytics, setDailyAnalytics] = useState(null);
  const [weeklyAnalytics, setWeeklyAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeOrders: 0,
    pendingOrders: 0,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const API_BASE_URL = "https://nutriscan-foodanddrinksupply.onrender.com";

  const transformOrder = (order) => ({
    ...order,
    status: order.status || order.bookingDetails?.currentStatus || "pending",
    personDetails: order.personDetails || {},
    orderSummary: order.orderSummary || {
      total: order.items?.reduce((s, i) => s + (i.finalPrice || 0), 0) || 0,
      totalItems: order.items?.reduce((s, i) => s + (i.quantity || 1), 0) || 0,
      items: order.items || [],
    },
    orderId: order.orderId,
    _id: order._id,
    createdAt: order.createdAt,
  });

  const fetchOrders = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const response = await fetch(`${API_BASE_URL}/orders`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      let ordersData = [];
      if (data.success && Array.isArray(data.data)) ordersData = data.data;
      else if (data.success && Array.isArray(data.orders))
        ordersData = data.orders;
      else if (Array.isArray(data)) ordersData = data;
      if (ordersData.length > 0) {
        const transformed = ordersData.map(transformOrder);
        setAllOrders(transformed);
        setOrders(transformed);
        const totalOrders = transformed.length;
        const totalRevenue = transformed.reduce(
          (s, o) => s + (o.orderSummary?.total || 0),
          0,
        );
        const activeOrders = transformed.filter(
          (o) => !["completed", "cancelled"].includes(o.status),
        ).length;
        const pendingOrders = transformed.filter(
          (o) => o.status === "pending",
        ).length;
        setStats({ totalOrders, totalRevenue, activeOrders, pendingOrders });
        localStorage.setItem("demo_orders_backup", JSON.stringify(transformed));
        setApiAvailable(true);
        toast.success(`Loaded ${transformed.length} orders from API`);
      } else {
        loadOrdersFromLocalStorage();
      }
    } catch (error) {
      console.warn("API unavailable:", error.message);
      setApiAvailable(false);
      loadOrdersFromLocalStorage();
      toast.warning("API server unavailable - using cached data");
    }
  }, []);

  const loadOrdersFromLocalStorage = () => {
    const stored = JSON.parse(
      localStorage.getItem("demo_orders_backup") || "[]",
    );
    if (stored.length > 0) {
      setAllOrders(stored);
      setOrders(stored);
      const totalRevenue = stored.reduce(
        (s, o) => s + (o.orderSummary?.total || 0),
        0,
      );
      setStats({
        totalOrders: stored.length,
        totalRevenue,
        activeOrders: stored.filter(
          (o) => !["completed", "cancelled"].includes(o.status),
        ).length,
        pendingOrders: stored.filter((o) => o.status === "pending").length,
      });
    }
  };

  const fetchDailyAnalytics = useCallback(async () => {
    setAnalyticsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/orders/analytics/daily`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) setDailyAnalytics(data);
      }
    } catch (error) {
      console.warn("Daily analytics fetch failed:", error);
    } finally {
      setAnalyticsLoading(false);
    }
  }, []);

  const fetchWeeklyAnalytics = useCallback(async () => {
    setAnalyticsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/orders/analytics/weekly`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) setWeeklyAnalytics(data);
      }
    } catch (error) {
      console.warn("Weekly analytics fetch failed:", error);
    } finally {
      setAnalyticsLoading(false);
    }
  }, []);

  const fetchFoods = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/foods`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.foods) {
          setMenuItems(data.foods.map((f) => ({ ...f, id: f._id })));
          localStorage.setItem(
            "menu_items_foods_backup",
            JSON.stringify(data.foods),
          );
          toast.success(`Loaded ${data.foods.length} menu items`);
        } else loadMenuFromLocalStorage();
      } else loadMenuFromLocalStorage();
    } catch (error) {
      loadMenuFromLocalStorage();
    }
  }, []);

  const loadMenuFromLocalStorage = () => {
    const stored = JSON.parse(
      localStorage.getItem("menu_items_foods_backup") || "[]",
    );
    if (stored.length > 0) setMenuItems(stored);
    else
      setMenuItems([
        {
          _id: "sample1",
          name: "Grilled Tilapia",
          price: 4500,
          ingredients: ["tilapia"],
          description: "Fresh tilapia",
          prepTime: 16,
          category: "Seafood",
        },
      ]);
  };

  const updateOrderStatus = async (order, newStatus) => {
    const updatedOrders = allOrders.map((o) =>
      o._id === order._id ? { ...o, status: newStatus } : o,
    );
    setAllOrders(updatedOrders);
    setOrders(updatedOrders);
    localStorage.setItem("demo_orders_backup", JSON.stringify(updatedOrders));
    toast.success(`Order status updated to ${newStatus}`);
    if (apiAvailable) {
      try {
        await fetch(`${API_BASE_URL}/orders/${order._id}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
      } catch (error) {
        toast.warning("API sync failed - saved locally");
      }
    }
  };

  const deleteOrder = async (orderId) => {
    const updatedOrders = allOrders.filter((o) => o._id !== orderId);
    setAllOrders(updatedOrders);
    setOrders(updatedOrders);
    localStorage.setItem("demo_orders_backup", JSON.stringify(updatedOrders));
    toast.success("Order deleted");
    if (apiAvailable) {
      try {
        await fetch(`${API_BASE_URL}/orders/${orderId}`, { method: "DELETE" });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addMenuItem = async (item) => {
    const newItem = { ...item, _id: Date.now().toString() };
    const updated = [...menuItems, newItem];
    setMenuItems(updated);
    localStorage.setItem("menu_items_foods_backup", JSON.stringify(updated));
    toast.success("Item added locally");
  };

  const editMenuItem = async (item) => {
    const updated = menuItems.map((m) => (m._id === item._id ? item : m));
    setMenuItems(updated);
    localStorage.setItem("menu_items_foods_backup", JSON.stringify(updated));
    toast.success("Item updated locally");
  };

  const deleteMenuItem = async (id) => {
    const filtered = menuItems.filter((m) => m._id !== id);
    setMenuItems(filtered);
    localStorage.setItem("menu_items_foods_backup", JSON.stringify(filtered));
    toast.success("Item deleted locally");
  };

  const retryConnection = () => {
    setLoading(true);
    Promise.all([
      fetchOrders(),
      fetchFoods(),
      fetchDailyAnalytics(),
      fetchWeeklyAnalytics(),
    ]).finally(() => setLoading(false));
  };

  useEffect(() => {
    Promise.all([
      fetchOrders(),
      fetchFoods(),
      fetchDailyAnalytics(),
      fetchWeeklyAnalytics(),
    ]).finally(() => setLoading(false));
  }, [fetchOrders, fetchFoods, fetchDailyAnalytics, fetchWeeklyAnalytics]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );

  return (

      <div className="min-h-screen bg-gray-100">
        <ToastContainer position="top-right" />
        <header className="bg-white shadow-sm sticky top-0 z-10 px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
              <RestaurantIcon className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">NutriScan·AI Manager</h1>
              <p className="text-xs text-gray-500">
                Restaurant Management Dashboard
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={retryConnection}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <RefreshIcon />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <PersonIcon className="text-white text-sm" />
              </div>
              {!apiAvailable && (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                  Offline
                </span>
              )}
            </div>
          </div>
        </header>
        <div className="px-4 sm:px-6 pt-4 border-b bg-white flex gap-1 overflow-x-auto">
          {["overview", "orders", "menu", "analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-xl transition whitespace-nowrap ${activeTab === tab ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
              {tab === "overview" && <DashboardIcon />}
              {tab === "orders" && <OrdersIcon />}
              {tab === "menu" && <MenuIcon />}
              {tab === "analytics" && <AnalyticsIcon />}
              <span className="capitalize">{tab}</span>
            </button>
          ))}
        </div>
        <div className="p-4 sm:p-6">
          {activeTab === "overview" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <StatCard
                  title="Total Orders"
                  value={stats.totalOrders}
                  icon={<OrdersIcon className="text-blue-600" />}
                  color="border-blue-500"
                />
                <StatCard
                  title="Revenue"
                  value={`RWF ${stats.totalRevenue.toLocaleString()}`}
                  icon={<MoneyIcon className="text-green-600" />}
                  color="border-green-500"
                />
                <StatCard
                  title="Active Orders"
                  value={stats.activeOrders}
                  icon={<KitchenIcon className="text-purple-600" />}
                  color="border-purple-500"
                />
                <StatCard
                  title="Pending"
                  value={stats.pendingOrders}
                  icon={<TimeIcon className="text-yellow-600" />}
                  color="border-yellow-500"
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <DailyAnalytics
                  analytics={dailyAnalytics}
                  loading={analyticsLoading}
                />
                <WeeklyAnalytics
                  analytics={weeklyAnalytics}
                  loading={analyticsLoading}
                />
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-bold mb-4">📋 Recent Orders</h2>
                <OrdersTable
                  orders={orders.slice(0, 10)}
                  onUpdateStatus={updateOrderStatus}
                  onViewDetails={setSelectedOrder}
                  onDeleteOrder={deleteOrder}
                />
              </div>
            </>
          )}
          {activeTab === "orders" && (
            <OrdersTable
              orders={orders}
              onUpdateStatus={updateOrderStatus}
              onViewDetails={setSelectedOrder}
              onDeleteOrder={deleteOrder}
            />
          )}
          {activeTab === "menu" && (
            <MenuManagement
              menuItems={menuItems}
              onAddItem={addMenuItem}
              onEditItem={editMenuItem}
              onDeleteItem={deleteMenuItem}
              onRefresh={fetchFoods}
              apiAvailable={apiAvailable}
            />
          )}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <DailyAnalytics
                analytics={dailyAnalytics}
                loading={analyticsLoading}
              />
              <WeeklyAnalytics
                analytics={weeklyAnalytics}
                loading={analyticsLoading}
              />
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="font-bold mb-4">Order Status Distribution</h2>
                {[
                  "pending",
                  "confirmed",
                  "preparing",
                  "ready",
                  "served",
                  "completed",
                  "cancelled",
                ].map((s) => {
                  const count = allOrders.filter((o) => o.status === s).length;
                  const perc = allOrders.length
                    ? ((count / allOrders.length) * 100).toFixed(0)
                    : 0;
                  return (
                    <div key={s} className="mt-3">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{s}</span>
                        <span>{count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${perc}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
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
