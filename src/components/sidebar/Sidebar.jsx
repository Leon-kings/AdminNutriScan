// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */
// // Sidebar.jsx
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Menu as MenuIcon,
//   Close as CloseIcon,
//   Dashboard as DashboardIcon,
//   Restaurant as RestaurantIcon,
//   People as PeopleIcon,
//   Receipt as ReceiptIcon,
//   Settings as SettingsIcon,
//   Logout as LogoutIcon,
//   ChevronLeft as ChevronLeftIcon,
//   ChevronRight as ChevronRightIcon,
//   Analytics as AnalyticsIcon,
//   Assessment as AssessmentIcon,
//   Notifications as NotificationsIcon,
//   Person as PersonIcon,
//   TableRestaurant as TableIcon,
//   QrCodeScanner as QRIcon,
//   Inventory as InventoryIcon,
//   LocalOffer as LocalOfferIcon,
//   RestaurantMenu as RestaurantMenuIcon,
// } from "@mui/icons-material";

// export const Sidebar = ({
//   isOpen,
//   onToggle,
//   onClose,
//   onNavigate,
//   currentPath,
//   user,
// }) => {
//   const [hoveredItem, setHoveredItem] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isHovering, setIsHovering] = useState(false);

//   // Handle window resize for responsive behavior
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Load saved collapse state
//   useEffect(() => {
//     const savedState = localStorage.getItem("sidebarCollapsed");
//     if (savedState !== null && !isMobile) {
//       setIsCollapsed(JSON.parse(savedState));
//     }
//   }, [isMobile]);

//   // Save collapse state
//   useEffect(() => {
//     if (!isMobile) {
//       localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
//     }
//   }, [isCollapsed, isMobile]);

//   // Navigation items
//   const navItems = [
//     { id: "dashboard", label: "Dashboard", icon: <DashboardIcon />, path: "/dash/manager", roles: ["manager", "admin"] },
//     { id: "orders", label: "Orders", icon: <ReceiptIcon />, path: "/orders", roles: ["manager", "chef", "admin"] },
//     { id: "menu", label: "Menu Management", icon: <RestaurantMenuIcon />, path: "/menu", roles: ["manager", "admin"] },
//     { id: "inventory", label: "Inventory", icon: <InventoryIcon />, path: "/inventory", roles: ["manager", "admin"] },
//     { id: "tables", label: "Tables", icon: <TableIcon />, path: "/tables", roles: ["manager", "admin"] },
//     { id: "analytics", label: "Analytics", icon: <AnalyticsIcon />, path: "/analytics", roles: ["manager", "admin"] },
//     { id: "qr-scanner", label: "QR Scanner", icon: <QRIcon />, path: "/qr-scanner", roles: ["manager", "chef"] },
//     { id: "staff", label: "Staff", icon: <PeopleIcon />, path: "/staff", roles: ["manager", "admin"] },
//     { id: "promotions", label: "Promotions", icon: <LocalOfferIcon />, path: "/promotions", roles: ["manager"] },
//     { id: "reports", label: "Reports", icon: <AssessmentIcon />, path: "/reports", roles: ["manager", "admin"] },
//     { id: "settings", label: "Settings", icon: <SettingsIcon />, path: "/settings", roles: ["manager", "chef", "admin"] },
//   ];

//   const filteredNavItems = navItems.filter(
//     (item) => !item.roles || item.roles.includes(user?.role || "staff")
//   );

//   const handleNavigation = (path) => {
//     if (onNavigate) onNavigate(path);
//     if (isMobile && onClose) onClose();
//   };

//   const handleToggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//     if (onToggle) onToggle();
//   };

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good Morning";
//     if (hour < 18) return "Good Afternoon";
//     return "Good Evening";
//   };

//   // Determine if content should be visible
//   const showContent = !isMobile && (!isCollapsed || isHovering);
//   const sidebarWidth = isMobile 
//     ? (isOpen ? "w-72" : "w-0")
//     : (isCollapsed && !isHovering ? "w-20" : "w-72");

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && isMobile && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         onMouseEnter={() => !isMobile && isCollapsed && setIsHovering(true)}
//         onMouseLeave={() => !isMobile && isCollapsed && setIsHovering(false)}
//         className={`
//           fixed top-0 left-0 h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
//           text-white z-50 shadow-2xl overflow-hidden transition-all duration-300 ease-in-out
//           ${sidebarWidth}
//           ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}
//         `}
//       >
//         <div className="flex flex-col h-full">
//           {/* Sidebar Header */}
//           <div className="p-5 border-b border-white/10">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3 overflow-hidden">
//                 <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2.5 rounded-xl shadow-lg flex-shrink-0">
//                   <RestaurantIcon className="text-white text-xl" />
//                 </div>
//                 <div className={`transition-all duration-300 ${showContent ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}>
//                   <h1 className="font-bold text-lg bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent whitespace-nowrap">
//                     NutriScan·AI
//                   </h1>
//                   <p className="text-[11px] text-gray-400 whitespace-nowrap">Restaurant Management</p>
//                 </div>
//               </div>

//               {isMobile && isOpen && (
//                 <button onClick={onClose} className="p-2 rounded-xl bg-gradient-to-t from-red-500 to-red-700">
//                   <CloseIcon className="text-sm" />
//                 </button>
//               )}

//               {!isMobile && (
//                 <button
//                   onClick={handleToggleCollapse}
//                   className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 transition-all"
//                 >
//                   {isCollapsed && !isHovering ? (
//                     <ChevronRightIcon className="text-sm" />
//                   ) : (
//                     <ChevronLeftIcon className="text-sm" />
//                   )}
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* User Profile */}
//           <div className="p-4 border-b border-white/10">
//             <div className="flex items-center gap-3">
//               <div className="relative flex-shrink-0">
//                 <div className="w-11 h-11 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
//                   <PersonIcon className="text-white text-xl" />
//                 </div>
//                 <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
//               </div>
              
//               <div className={`transition-all duration-300 ${showContent ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
//                 <p className="font-semibold text-sm truncate whitespace-nowrap">
//                   {user?.name || user?.email?.split("@")[0] || "Guest User"}
//                 </p>
//                 <div className="flex items-center gap-2 mt-0.5">
//                   <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 capitalize whitespace-nowrap">
//                     {user?.role || "Staff"}
//                   </span>
//                 </div>
//               </div>
//             </div>
            
//             <div className={`mt-3 transition-all duration-300 ${showContent ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"}`}>
//               <p className="text-xs text-gray-400 flex items-center gap-1 whitespace-nowrap">
//                 <span>{getGreeting()}! 👋</span>
//               </p>
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
//             <div className="px-3 space-y-1.5">
//               {filteredNavItems.map((item) => (
//                 <div key={item.id} className="relative">
//                   <button
//                     onClick={() => handleNavigation(item.path)}
//                     className={`
//                       w-full flex items-center gap-3 px-3 py-2.5 rounded-xl 
//                       transition-all duration-200
//                       ${currentPath === item.path
//                         ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
//                         : "text-gray-300 hover:bg-white/10 hover:text-white"}
//                       ${!isMobile && isCollapsed && !isHovering ? "justify-center" : "justify-start"}
//                     `}
//                   >
//                     <span className="text-xl flex-shrink-0">
//                       {item.icon}
//                     </span>
                    
//                     <span className={`text-sm font-medium transition-all duration-300 ${showContent ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}>
//                       {item.label}
//                     </span>
//                   </button>

//                   {/* Tooltip */}
//                   {!isMobile && isCollapsed && !isHovering && hoveredItem === item.id && (
//                     <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 
//                                 bg-slate-800 text-white text-sm px-3 py-1.5 rounded-xl 
//                                 whitespace-nowrap z-50 shadow-xl border border-white/10">
//                       {item.label}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </nav>

//           {/* Bottom Section */}
//           <div className="p-4 border-t border-white/10 space-y-2">
//             <button
//               onClick={() => handleNavigation("/notifications")}
//               className={`
//                 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl 
//                 transition-all duration-200 text-gray-300 hover:bg-white/10 hover:text-white relative
//                 ${!isMobile && isCollapsed && !isHovering ? "justify-center" : "justify-start"}
//               `}
//             >
//               <NotificationsIcon className="text-xl flex-shrink-0" />
//               <span className={`text-sm font-medium transition-all duration-300 ${showContent ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
//                 Notifications
//               </span>
//               <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
//                 3
//               </span>
//             </button>

//             <button
//               onClick={() => handleNavigation("/logout")}
//               className={`
//                 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl 
//                 transition-all duration-200 text-red-400 hover:bg-red-500/20 hover:text-red-300
//                 ${!isMobile && isCollapsed && !isHovering ? "justify-center" : "justify-start"}
//               `}
//             >
//               <LogoutIcon className="text-xl flex-shrink-0" />
//               <span className={`text-sm font-medium transition-all duration-300 ${showContent ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
//                 Logout
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #f59e0b, #f97316);
//           border-radius: 10px;
//         }
//       `}</style>
//     </>
//   );
// };

// // Hamburger Menu Button
// export const MenuButton = ({ onClick, isOpen }) => {
//   return (
//     <button
//       onClick={onClick}
//       className="fixed top-5 left-5 z-50 p-2.5 bg-gradient-to-r from-amber-500 to-orange-500 
//                  text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200
//                  md:hidden"
//     >
//       <MenuIcon />
//     </button>
//   );
// };

// // Main Dashboard Layout Component - FIXED CONTENT VISIBILITY
// export const DashboardLayout = ({ children, user, currentPath, onNavigate }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(true); // Changed to true by default
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setSidebarOpen(false);
//       } else {
//         setSidebarOpen(true);
//         // On tablet, default to collapsed for more space
//         if (window.innerWidth >= 768 && window.innerWidth < 1024) {
//           setIsCollapsed(true);
//         }
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);
//   const handleSidebarClose = () => setSidebarOpen(false);
//   const handleSidebarCollapse = (collapsed) => setIsCollapsed(collapsed);

//   // Calculate margin left based on sidebar state - FIXED
//   const getMarginLeft = () => {
//     if (window.innerWidth < 768) return 0;
//     if (!sidebarOpen) return 0;
//     if (isCollapsed) return "5rem"; // w-20 = 5rem
//     return "18rem"; // w-72 = 18rem
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <Sidebar
//         isOpen={sidebarOpen}
//         onToggle={handleSidebarCollapse}
//         onClose={handleSidebarClose}
//         onNavigate={onNavigate}
//         currentPath={currentPath}
//         user={user}
//       />

//       <MenuButton onClick={handleSidebarToggle} isOpen={sidebarOpen} />

//       {/* Main Content - Ensures content is visible */}
//       <main 
//         className="min-h-screen transition-all duration-300 ease-in-out"
//         style={{ marginLeft: getMarginLeft() }}
//       >
//         <div className="p-4 sm:p-6 lg:p-8">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// };










// Sidebar.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  Restaurant as RestaurantIcon,
  People as PeopleIcon,
  Receipt as ReceiptIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Analytics as AnalyticsIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  TableRestaurant as TableIcon,
  QrCodeScanner as QRIcon,
  Inventory as InventoryIcon,
  LocalOffer as LocalOfferIcon,
  RestaurantMenu as RestaurantMenuIcon,
} from "@mui/icons-material";

export const Sidebar = ({
  isOpen,
  onToggle,
  onClose,
  onNavigate,
  currentPath,
  user,
  isCollapsed: externalCollapsed,
  onCollapseChange,
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isHovering, setIsHovering] = useState(false);
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  
  const isCollapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load saved collapse state
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState !== null && !isMobile) {
      const collapsed = JSON.parse(savedState);
      if (onCollapseChange) {
        onCollapseChange(collapsed);
      } else {
        setInternalCollapsed(collapsed);
      }
    }
  }, [isMobile]);

  const handleToggleCollapse = () => {
    const newState = !isCollapsed;
    if (onCollapseChange) {
      onCollapseChange(newState);
    } else {
      setInternalCollapsed(newState);
    }
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
    if (onToggle) onToggle();
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon />, path: "/dash/manager", roles: ["manager", "admin"] },
    { id: "orders", label: "Orders", icon: <ReceiptIcon />, path: "/orders", roles: ["manager", "chef", "admin"] },
    { id: "menu", label: "Menu Management", icon: <RestaurantMenuIcon />, path: "/menu", roles: ["manager", "admin"] },
    { id: "inventory", label: "Inventory", icon: <InventoryIcon />, path: "/inventory", roles: ["manager", "admin"] },
    { id: "tables", label: "Tables", icon: <TableIcon />, path: "/tables", roles: ["manager", "admin"] },
    { id: "analytics", label: "Analytics", icon: <AnalyticsIcon />, path: "/analytics", roles: ["manager", "admin"] },
    { id: "qr-scanner", label: "QR Scanner", icon: <QRIcon />, path: "/qr-scanner", roles: ["manager", "chef"] },
    { id: "staff", label: "Staff", icon: <PeopleIcon />, path: "/staff", roles: ["manager", "admin"] },
    { id: "promotions", label: "Promotions", icon: <LocalOfferIcon />, path: "/promotions", roles: ["manager"] },
    { id: "reports", label: "Reports", icon: <AssessmentIcon />, path: "/reports", roles: ["manager", "admin"] },
    { id: "settings", label: "Settings", icon: <SettingsIcon />, path: "/settings", roles: ["manager", "chef", "admin"] },
  ];

  const filteredNavItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(user?.role || "staff")
  );

  const handleNavigation = (path) => {
    if (onNavigate) onNavigate(path);
    if (isMobile && onClose) onClose();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const showContent = !isMobile && (!isCollapsed || isHovering);
  const sidebarWidth = isMobile 
    ? (isOpen ? "w-72" : "w-0")
    : (isCollapsed && !isHovering ? "w-20" : "w-72");

  return (
    <>
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <div
        onMouseEnter={() => !isMobile && isCollapsed && setIsHovering(true)}
        onMouseLeave={() => !isMobile && isCollapsed && setIsHovering(false)}
        className={`
          fixed top-0 left-0 h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
          text-white z-50 shadow-2xl overflow-hidden transition-all duration-300 ease-in-out
          ${sidebarWidth}
          ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2.5 rounded-xl shadow-lg flex-shrink-0">
                  <RestaurantIcon className="text-white text-xl" />
                </div>
                <div className={`transition-all duration-300 ${showContent ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}>
                  <h1 className="font-bold text-lg whitespace-nowrap">NutriScan·AI</h1>
                  <p className="text-[11px] text-gray-400 whitespace-nowrap">Restaurant Management</p>
                </div>
              </div>

              {isMobile && isOpen && (
                <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/10">
                  <CloseIcon className="text-sm" />
                </button>
              )}

              {!isMobile && (
                <button
                  onClick={handleToggleCollapse}
                  className="p-2 rounded-xl hover:bg-white/10 transition-all"
                >
                  {isCollapsed && !isHovering ? (
                    <ChevronRightIcon className="text-sm" />
                  ) : (
                    <ChevronLeftIcon className="text-sm" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <PersonIcon className="text-white text-xl" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
              </div>
              
              <div className={`transition-all duration-300 ${showContent ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
                <p className="font-semibold text-sm truncate whitespace-nowrap">
                  {user?.name || user?.email?.split("@")[0] || "Guest User"}
                </p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 capitalize whitespace-nowrap">
                  {user?.role || "Staff"}
                </span>
              </div>
            </div>
            
            <div className={`mt-3 transition-all duration-300 ${showContent ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"}`}>
              <p className="text-xs text-gray-400 whitespace-nowrap">{getGreeting()}! 👋</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
            <div className="px-3 space-y-1.5">
              {filteredNavItems.map((item) => (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                      ${currentPath === item.path
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"}
                      ${!isMobile && isCollapsed && !isHovering ? "justify-center" : "justify-start"}
                    `}
                  >
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <span className={`text-sm font-medium transition-all duration-300 ${showContent ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}>
                      {item.label}
                    </span>
                  </button>

                  {!isMobile && isCollapsed && !isHovering && hoveredItem === item.id && (
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-sm px-3 py-1.5 rounded-xl whitespace-nowrap z-50 shadow-xl border border-white/10">
                      {item.label}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <button
              onClick={() => handleNavigation("/notifications")}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                text-gray-300 hover:bg-white/10 hover:text-white relative
                ${!isMobile && isCollapsed && !isHovering ? "justify-center" : "justify-start"}
              `}
            >
              <NotificationsIcon className="text-xl flex-shrink-0" />
              <span className={`text-sm font-medium transition-all duration-300 ${showContent ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
                Notifications
              </span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                3
              </span>
            </button>

            <button
              onClick={() => handleNavigation("/logout")}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                text-red-400 hover:bg-red-500/20 hover:text-red-300
                ${!isMobile && isCollapsed && !isHovering ? "justify-center" : "justify-start"}
              `}
            >
              <LogoutIcon className="text-xl flex-shrink-0" />
              <span className={`text-sm font-medium transition-all duration-300 ${showContent ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #f59e0b, #f97316); border-radius: 10px; }
      `}</style>
    </>
  );
};

// Hamburger Menu Button
export const MenuButton = ({ onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-5 left-5 z-50 p-2.5 bg-gradient-to-r from-amber-500 to-orange-500 
                 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200
                 md:hidden"
    >
      <MenuIcon />
    </button>
  );
};

// Main Dashboard Layout Component - FIXED: Content expands when sidebar closes/collapses
export const DashboardLayout = ({ children, user, currentPath, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
        // Auto-collapse on tablet for more space
        if (window.innerWidth >= 768 && window.innerWidth < 1024) {
          setIsCollapsed(true);
        } else if (window.innerWidth >= 1024) {
          // On desktop, load saved preference or default to false
          const saved = localStorage.getItem("sidebarCollapsed");
          if (saved !== null) {
            setIsCollapsed(JSON.parse(saved));
          } else {
            setIsCollapsed(false);
          }
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarClose = () => setSidebarOpen(false);
  const handleCollapseChange = (collapsed) => setIsCollapsed(collapsed);

  // Calculate margin-left based on sidebar state - CONTENT EXPANDS WHEN CLOSED/COLLAPSED
  const getMarginLeft = () => {
    const isMobile = windowWidth < 768;
    if (isMobile) return 0;
    if (!sidebarOpen) return 0;
    if (isCollapsed) return "5rem"; // w-20 = 80px
    return "18rem"; // w-72 = 288px
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={handleSidebarToggle}
        onClose={handleSidebarClose}
        onNavigate={onNavigate}
        currentPath={currentPath}
        user={user}
        isCollapsed={isCollapsed}
        onCollapseChange={handleCollapseChange}
      />

      <MenuButton onClick={handleSidebarToggle} isOpen={sidebarOpen} />

      {/* Main Content - Dynamically expands when sidebar is closed or collapsed */}
      <main 
        className="min-h-screen transition-all duration-300 ease-in-out"
        style={{ marginLeft: getMarginLeft() }}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};