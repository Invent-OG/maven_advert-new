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

// Add icons to submenu items
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
    icon: BookOpen,
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

  useEffect(() => {
    // Get user info from session storage
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

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-gradient-to-r from-orange-400 to-orange-600 text-white border-r border-border transition-transform duration-300 z-40",
          "w-64",
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Image
              title="Maven-Logo"
              src="/favicon.ico"
              alt="Maven Advert"
              width={50}
              height={50}
            />
            <div className="flex flex-col">
              <span className="font-semibold">Admin Panel</span>
              <span className="text-xs text-muted-foreground">
                Welcome, {userName}
              </span>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Button
                  key={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "w-full justify-start transition-colors duration-200",
                    isActive
                      ? "bg-orange-700 text-white hover:bg-orange-700"
                      : "bg-transparent hover:bg-orange-500"
                  )}
                >
                  <Link className="inline-flex" href={item.href}>
                    {item.icon && <item.icon className="h-5 w-5 mr-2" />}
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            })}

            <Button
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span>Logout</span>
            </Button>
          </nav>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
