"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/films/watch", label: "Film Library", icon: "movie" },
  { href: "/tools/prompter", label: "Prompter", icon: "auto_awesome" },
  { href: "/tools/shotlist", label: "Shot List", icon: "format_list_numbered" },
  { href: "/tools/budget", label: "Budget", icon: "calculate" },
  { href: "/tools/styles", label: "Styles", icon: "palette" },
  { href: "/tools/character", label: "Character Bible", icon: "person" },
  { href: "/tools/podcast", label: "Podcast", icon: "mic" },
  { href: "/courses", label: "Courses", icon: "school" },
  { href: "/community", label: "Community", icon: "forum" },
  { href: "/submit", label: "Submit Film", icon: "upload" },
  { href: "/dashboard/account", label: "Account", icon: "settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      <div className="lg:hidden fixed top-16 left-0 z-[9997]">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="m-2 p-2 bg-surface text-on-surface border border-border-custom/30"
        >
          <span className="material-symbols-outlined text-sm">
            {collapsed ? "menu" : "menu_open"}
          </span>
        </button>
      </div>

      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-surface border-r border-border-custom/30 transition-all duration-300 z-[9996] ${
          collapsed ? "w-16" : "w-56"
        } ${collapsed ? "max-lg:-translate-x-full" : ""} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full py-4">
          {/* Collapse button (desktop) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center mb-4 px-3 text-muted-text hover:text-on-surface transition-colors duration-150"
          >
            <span className="material-symbols-outlined text-sm">
              {collapsed ? "chevron_right" : "chevron_left"}
            </span>
          </button>

          <nav className="flex-1 space-y-1 px-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 font-studio text-sm transition-colors duration-150 ${
                    isActive
                      ? "bg-primary/15 text-primary border-l-2 border-primary"
                      : "text-muted-text hover:text-on-surface hover:bg-deep-surface"
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="tracking-wide">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
