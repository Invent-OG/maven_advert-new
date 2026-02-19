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
          "hidden lg:block fixed bottom-1/6 transform -translate-y-1/2 z-50 transition-all duration-300",
          isCollapsed ? "left-16" : "left-60",
        )}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="bg-orange-500 text-white shadow-lg border-gray-200 hover:bg-gray-50 h-9 w-9 p-0 rounded-full flex items-center justify-center"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5  transition-transform duration-300 rotate-0" />
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
            : "-translate-x-full lg:translate-x-0",
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
                isCollapsed && "justify-center",
              )}
            >
              <div
                className={cn(
                  "relative transition-all duration-300 bg-white rounded-xl shadow-sm border border-gray-100",
                  isCollapsed ? "w-10 h-10" : "w-12 h-12",
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

            {/* Navigation */}
            <nav className="space-y-2">
              {navItems.map((item) => {
                const active = isActive(item.href);
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                const isExpanded = expandedSubmenus[item.label];

                return (
                  <div key={item.href} className="relative">
                    <div className="flex flex-col">
                      <div className="flex items-center ">
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
                              "w-full justify-start transition-all duration-200 relative cursor-pointer group mb-1",
                              active
                                ? "bg-orange-600 text-white hover:bg-orange-600/80 font-medium shadow-md shadow-orange-200 hover:text-white"
                                : " hover:bg-orange-500/80 hover:text-white",
                              isCollapsed
                                ? "px-2 justify-center rounded-xl"
                                : "px-4 rounded-xl",
                              hasSubmenu ? "pr-3" : "",
                            )}
                          >
                            <div
                              className={cn(
                                "flex items-center w-full",
                                isCollapsed
                                  ? "justify-center"
                                  : "justify-start",
                              )}
                            >
                              {item.icon && (
                                <item.icon
                                  className={cn(
                                    "transition-colors flex-shrink-0",
                                    active
                                      ? "text-white"
                                      : "text-gray-400 group-hover:text-white",
                                    isCollapsed ? "h-6 w-6" : "h-5 w-5 mr-3",
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
                                    isExpanded ? "rotate-180" : "",
                                  )}
                                />
                              )}
                            </div>

                            {/* Active indicator for collapsed */}
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
                                  size="sm"
                                  className={cn(
                                    "w-full justify-start text-sm h-9 rounded-lg px-3 transition-colors",
                                    subActive
                                      ? "text-orange-700 bg-orange-50 font-medium"
                                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
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
                isCollapsed ? "px-3" : "px-4",
              )}
            >
              <div
                className={cn(
                  "flex items-center w-full",
                  isCollapsed ? "justify-center" : "justify-start",
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
          isCollapsed ? "lg:ml-20" : "lg:ml-64",
        )}
      />
    </>
  );
}
