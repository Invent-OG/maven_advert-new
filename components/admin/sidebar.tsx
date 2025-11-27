// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import Image from "next/image";
// import {
//   Users,
//   MessageSquare,
//   Briefcase,
//   BookOpen,
//   LogOut,
//   Menu,
//   X,
//   Settings,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";

// import type { LucideIcon } from "lucide-react";

// interface NavSubItem {
//   label: string;
//   href: string;
//   icon?: LucideIcon;
// }

// interface NavItem {
//   label: string;
//   href: string;
//   icon?: LucideIcon;
//   submenu?: NavSubItem[];
// }

// // Add icons to submenu items
// const navItems: NavItem[] = [
//   {
//     label: "Leads",
//     href: "/admin/leads",
//     icon: Users,
//   },
//   {
//     label: "Testimonials",
//     href: "/admin/testimonials",
//     icon: MessageSquare,
//   },

//   {
//     label: "Blog",
//     href: "/admin/blog",
//     icon: BookOpen,
//   },
//   {
//     label: "Portfolio",
//     href: "/admin/portfolio",
//     icon: BookOpen,
//   },
//   {
//     label: "Settings",
//     href: "/admin/settings",
//     icon: Settings,
//   },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [expandedSubmenus, setExpandedSubmenus] = useState<
//     Record<string, boolean>
//   >({});
//   const [userName, setUserName] = useState<string>("");

//   useEffect(() => {
//     // Get user info from session storage
//     const userInfo = sessionStorage.getItem("userInfo");
//     if (userInfo) {
//       try {
//         const parsedInfo = JSON.parse(userInfo);
//         setUserName(parsedInfo.name || "Admin");
//       } catch (e) {
//         setUserName("Admin");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isMobileMenuOpen]);

//   const toggleSubmenu = (label: string) => {
//     setExpandedSubmenus((prev) => ({
//       ...prev,
//       [label]: !prev[label],
//     }));
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem("isAuthenticated");
//     sessionStorage.removeItem("userInfo");
//     router.push("/admin/login");
//   };

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <div className="lg:hidden fixed top-4 right-4 z-50">
//         <Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//           {isMobileMenuOpen ? (
//             <X className="h-5 w-5" />
//           ) : (
//             <Menu className="h-5 w-5" />
//           )}
//         </Button>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={cn(
//           "fixed top-0 left-0 h-screen bg-gradient-to-r from-orange-400 to-orange-600 text-white border-r border-border transition-transform duration-300 z-40",
//           "w-64",
//           isMobileMenuOpen
//             ? "translate-x-0"
//             : "-translate-x-full lg:translate-x-0"
//         )}
//       >
//         <div className="p-6">
//           <div className="flex items-center gap-2 mb-8">
//             <Image
//               title="Maven-Logo"
//               src="/favicon.ico"
//               alt="Maven Advert"
//               width={50}
//               height={50}
//             />
//             <div className="flex flex-col">
//               <span className="font-semibold">Admin Panel</span>
//               <span className="text-xs text-muted-foreground">
//                 Welcome, {userName}
//               </span>
//             </div>
//           </div>

//           <nav className="space-y-2">
//             {navItems.map((item) => {
//               const isActive = pathname.startsWith(item.href);
//               return (
//                 <Button
//                   key={item.href}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className={cn(
//                     "w-full justify-start transition-colors duration-200",
//                     isActive
//                       ? "bg-orange-700 text-white hover:bg-orange-700"
//                       : "bg-transparent hover:bg-orange-500"
//                   )}
//                 >
//                   <Link className="inline-flex" href={item.href}>
//                     {item.icon && <item.icon className="h-5 w-5 mr-2" />}
//                     <span>{item.label}</span>
//                   </Link>
//                 </Button>
//               );
//             })}

//             <Button
//               className="w-full justify-start text-destructive hover:text-destructive"
//               onClick={handleLogout}
//             >
//               <LogOut className="h-5 w-5 mr-2" />
//               <span>Logout</span>
//             </Button>
//           </nav>
//         </div>
//       </aside>

//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}
//     </>
//   );
// }
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import Image from "next/image";
// import {
//   Users,
//   MessageSquare,
//   Briefcase,
//   BookOpen,
//   LogOut,
//   Menu,
//   X,
//   Settings,
//   ChevronDown,
//   ChevronRight,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";

// import type { LucideIcon } from "lucide-react";

// interface NavSubItem {
//   label: string;
//   href: string;
//   icon?: LucideIcon;
// }

// interface NavItem {
//   label: string;
//   href: string;
//   icon?: LucideIcon;
//   submenu?: NavSubItem[];
// }

// const navItems: NavItem[] = [
//   {
//     label: "Leads",
//     href: "/admin/leads",
//     icon: Users,
//   },
//   {
//     label: "Testimonials",
//     href: "/admin/testimonials",
//     icon: MessageSquare,
//   },
//   {
//     label: "Blog",
//     href: "/admin/blog",
//     icon: BookOpen,
//   },
//   {
//     label: "Portfolio",
//     href: "/admin/portfolio",
//     icon: Briefcase,
//   },
//   {
//     label: "Settings",
//     href: "/admin/settings",
//     icon: Settings,
//   },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [expandedSubmenus, setExpandedSubmenus] = useState<
//     Record<string, boolean>
//   >({});
//   const [userName, setUserName] = useState<string>("");
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   useEffect(() => {
//     const userInfo = sessionStorage.getItem("userInfo");
//     if (userInfo) {
//       try {
//         const parsedInfo = JSON.parse(userInfo);
//         setUserName(parsedInfo.name || "Admin");
//       } catch (e) {
//         setUserName("Admin");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isMobileMenuOpen]);

//   const toggleSubmenu = (label: string) => {
//     setExpandedSubmenus((prev) => ({
//       ...prev,
//       [label]: !prev[label],
//     }));
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem("isAuthenticated");
//     sessionStorage.removeItem("userInfo");
//     router.push("/admin/login");
//   };

//   const isActive = (href: string) =>
//     pathname === href || pathname.startsWith(href + "/");

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <div className="lg:hidden fixed top-4 right-4 z-50">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           className="bg-white shadow-md border-gray-200"
//         >
//           {isMobileMenuOpen ? (
//             <X className="h-4 w-4" />
//           ) : (
//             <Menu className="h-4 w-4" />
//           )}
//         </Button>
//       </div>

//       {/* Desktop Collapse Button */}
//       <div className="hidden lg:block fixed top-4 left-4 z-50">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           className="bg-white shadow-md border-gray-200 h-8 w-8 p-0"
//         >
//           {isCollapsed ? (
//             <ChevronRight className="h-3 w-3" />
//           ) : (
//             <ChevronDown className="h-3 w-3" />
//           )}
//         </Button>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={cn(
//           "fixed top-0 left-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40 shadow-sm",
//           isCollapsed ? "w-20" : "w-64",
//           isMobileMenuOpen
//             ? "translate-x-0"
//             : "-translate-x-full lg:translate-x-0"
//         )}
//       >
//         <div className={cn("p-6", isCollapsed && "px-4")}>
//           {/* Logo and Brand */}
//           <div
//             className={cn(
//               "flex items-center gap-3 mb-8 transition-all duration-300",
//               isCollapsed && "justify-center"
//             )}
//           >
//             <div
//               className={cn(
//                 "relative transition-all duration-300",
//                 isCollapsed ? "w-8 h-8" : "w-10 h-10"
//               )}
//             >
//               <Image
//                 src="/favicon.ico"
//                 alt="Maven Advert"
//                 fill
//                 className="object-contain"
//               />
//             </div>
//             {!isCollapsed && (
//               <div className="flex flex-col">
//                 <span className="font-bold text-gray-900 text-lg">Maven</span>
//                 <span className="text-xs text-gray-500">Admin Panel</span>
//               </div>
//             )}
//           </div>

//           {/* User Info */}
//           {!isCollapsed && (
//             <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-100">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm font-medium">
//                     {userName.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-gray-900 truncate">
//                     {userName}
//                   </p>
//                   <p className="text-xs text-gray-500">Administrator</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Navigation */}
//           <nav className="space-y-1">
//             {navItems.map((item) => {
//               const active = isActive(item.href);
//               const Icon = item.icon;
//               return (
//                 <div key={item.href} className="relative">
//                   <Link href={item.href}>
//                     <Button
//                       variant="ghost"
//                       onClick={() => setIsMobileMenuOpen(false)}
//                       className={cn(
//                         "w-full justify-start transition-all duration-200 relative group",
//                         active
//                           ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700 font-semibold"
//                           : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
//                         isCollapsed ? "px-2" : "px-3"
//                       )}
//                     >
//                       <div
//                         className={cn(
//                           "flex items-center w-full",
//                           isCollapsed ? "justify-center" : "justify-start"
//                         )}
//                       >
//                         {Icon ? (
//                           <Icon
//                             className={cn(
//                               "transition-colors",
//                               active
//                                 ? "text-blue-700"
//                                 : "text-gray-400 group-hover:text-gray-600",
//                               isCollapsed ? "h-5 w-5" : "h-4 w-4 mr-3"
//                             )}
//                           />
//                         ) : (
//                           <div className={cn(isCollapsed ? "h-5 w-5" : "h-4 w-4 mr-3")} />
//                         )}
//                         {!isCollapsed && (
//                           <span className="flex-1 text-left">{item.label}</span>
//                         )}
//                       </div>

//                       {/* Active indicator */}
//                       {active && (
//                         <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
//                           <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
//                         </div>
//                       )}

//                       {/* Tooltip for collapsed state */}
//                       {isCollapsed && (
//                         <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
//                           {item.label}
//                         </div>
//                       )}
//                     </Button>
//                   </Link>
//                 </div>
//               );
//             })}

//             {/* Logout Button */}
//             <Button
//               variant="ghost"
//               onClick={handleLogout}
//               className={cn(
//                 "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 mt-6",
//                 isCollapsed ? "px-2" : "px-3"
//               )}
//             >
//               <div
//                 className={cn(
//                   "flex items-center w-full",
//                   isCollapsed ? "justify-center" : "justify-start"
//                 )}
//               >
//                 <LogOut
//                   className={cn(isCollapsed ? "h-5 w-5" : "h-4 w-4 mr-3")}
//                 />
//                 {!isCollapsed && <span>Logout</span>}
//               </div>

//               {/* Tooltip for collapsed state */}
//               {isCollapsed && (
//                 <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
//                   Logout
//                 </div>
//               )}
//             </Button>
//           </nav>
//         </div>

//         {/* Collapsed indicator */}
//         {isCollapsed && (
//           <div className="absolute bottom-4 left-0 right-0 text-center">
//             <div className="w-1 h-1 bg-gray-300 rounded-full mx-auto"></div>
//           </div>
//         )}
//       </aside>

//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}

//       {/* Main content spacer */}
//       <div
//         className={cn(
//           "transition-all duration-300",
//           isCollapsed ? "lg:ml-20" : "lg:ml-64"
//         )}
//       />
//     </>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Users,
  MessageSquare,
  Briefcase,
  BookOpen,
  LogOut,
  Menu,
  X,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import type { LucideIcon } from "lucide-react";

interface NavSubItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  submenu?: NavSubItem[];
}

const navItems: NavItem[] = [
  {
    label: "Leads",
    href: "/admin/leads",
    icon: Users,
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquare,
  },
  {
    label: "Blog",
    href: "/admin/blog",
    icon: BookOpen,
  },
  {
    label: "Portfolio",
    href: "/admin/portfolio",
    icon: Briefcase,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSubmenus, setExpandedSubmenus] = useState<
    Record<string, boolean>
  >({});
  const [userName, setUserName] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) {
      try {
        const parsedInfo = JSON.parse(userInfo);
        setUserName(parsedInfo.name || "Admin");
      } catch (e) {
        setUserName("Admin");
      }
    }
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleSubmenu = (label: string) => {
    setExpandedSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("userInfo");
    router.push("/admin/login");
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-lg border-gray-200 hover:bg-gray-50 h-10 w-10 rounded-xl"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Desktop Collapse Button */}
      <div
        className={cn(
          "hidden lg:block fixed top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300",
          isCollapsed ? "left-16" : "left-64"
        )}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="bg-white shadow-lg border-gray-200 hover:bg-gray-50 h-9 w-9 p-0 rounded-full flex items-center justify-center"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 transition-transform duration-300 rotate-0" />
          ) : (
            <ChevronRight className="h-5 w-5 transition-transform duration-300 rotate-180" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-gradient-to-b from-white to-gray-50/80 border-r border-gray-200/60 transition-all duration-300 z-40 shadow-xl backdrop-blur-sm",
          isCollapsed ? "w-20" : "w-64",
          isMobileMenuOpen
            ? "translate-x-0 shadow-2xl"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div
          className={cn("flex flex-col h-full", isCollapsed ? "px-3" : "px-6")}
        >
          {/* Header */}
          <div className={cn("flex-1", isCollapsed ? "pt-8" : "pt-8")}>
            {/* Logo and Brand */}
            <div
              className={cn(
                "flex items-center gap-3 transition-all duration-300 mb-8",
                isCollapsed && "justify-center"
              )}
            >
              <div
                className={cn(
                  "relative transition-all duration-300 bg-white rounded-xl shadow-sm border border-gray-100",
                  isCollapsed ? "w-10 h-10" : "w-12 h-12"
                )}
              >
                <Image
                  src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1763651201/logos_png-02_ykasmr.png"
                  alt="Maven Advert"
                  fill
                  className="object-cover p-2"
                />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 text-xl tracking-tight">
                    Maven
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    Admin Panel
                  </span>
                </div>
              )}
            </div>

            {/* User Info */}
            {!isCollapsed && (
              <div className="mb-8 p-4 bg-white rounded-xl border border-gray-200/80 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-white text-sm font-bold">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {userName}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      Administrator
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <nav className="space-y-2">
              {navItems.map((item) => {
                const active = isActive(item.href);
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                const isExpanded = expandedSubmenus[item.label];

                return (
                  <div key={item.href} className="relative">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Link
                          href={hasSubmenu ? "#" : item.href}
                          className="flex-1"
                          onClick={(e) => {
                            if (hasSubmenu) {
                              e.preventDefault();
                              toggleSubmenu(item.label);
                            } else {
                              setIsMobileMenuOpen(false);
                            }
                          }}
                        >
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start transition-all duration-200 relative group border-l-4",
                              active
                                ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-l-blue-600 font-semibold shadow-sm"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-transparent hover:border-l-gray-200",
                              isCollapsed ? "px-3" : "px-4",
                              hasSubmenu ? "pr-3" : ""
                            )}
                          >
                            <div
                              className={cn(
                                "flex items-center w-full",
                                isCollapsed ? "justify-center" : "justify-start"
                              )}
                            >
                              {item.icon && (
                                <item.icon
                                  className={cn(
                                    "transition-colors flex-shrink-0",
                                    active
                                      ? "text-blue-600"
                                      : "text-gray-400 group-hover:text-gray-600",
                                    isCollapsed ? "h-5 w-5" : "h-4 w-4 mr-3"
                                  )}
                                />
                              )}

                              {!isCollapsed && (
                                <span className="flex-1 text-left text-sm font-medium">
                                  {item.label}
                                </span>
                              )}

                              {/* Submenu indicator */}
                              {hasSubmenu && !isCollapsed && (
                                <ChevronDown
                                  className={cn(
                                    "h-4 w-4 ml-1 transition-transform duration-200",
                                    isExpanded ? "rotate-180" : ""
                                  )}
                                />
                              )}
                            </div>

                            {/* Active indicator for collapsed */}
                            {active && isCollapsed && (
                              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                              </div>
                            )}

                            {/* Tooltip for collapsed state */}
                            {isCollapsed && (
                              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-lg">
                                {item.label}
                              </div>
                            )}
                          </Button>
                        </Link>
                      </div>

                      {/* Submenu */}
                      {hasSubmenu && isExpanded && !isCollapsed && (
                        <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-3 py-1">
                          {item.submenu!.map((subItem) => {
                            const subActive = isActive(subItem.href);
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <Button
                                  variant="ghost"
                                  className={cn(
                                    "w-full justify-start text-xs h-8 px-3 transition-all duration-200",
                                    subActive
                                      ? "text-blue-600 bg-blue-50 font-medium"
                                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                  )}
                                >
                                  {subItem.icon && (
                                    <subItem.icon className="h-3.5 w-3.5 mr-2" />
                                  )}
                                  {subItem.label}
                                </Button>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Footer - Logout Button */}
          <div className={cn("pt-4 pb-6", isCollapsed ? "px-0" : "px-2")}>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className={cn(
                "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-100",
                isCollapsed ? "px-3" : "px-4"
              )}
            >
              <div
                className={cn(
                  "flex items-center w-full",
                  isCollapsed ? "justify-center" : "justify-start"
                )}
              >
                <LogOut
                  className={cn(isCollapsed ? "h-5 w-5" : "h-4 w-4 mr-3")}
                />
                {!isCollapsed && (
                  <span className="text-sm font-medium">Logout</span>
                )}
              </div>

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  Logout
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Collapsed indicator */}
        {isCollapsed && (
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <div className="w-6 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto rounded-full"></div>
          </div>
        )}
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main content spacer */}
      <div
        className={cn(
          "transition-all duration-300",
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        )}
      />
    </>
  );
}
