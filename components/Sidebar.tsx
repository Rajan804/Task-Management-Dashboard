"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ListTodo, Users } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/tasks", label: "Tasks", icon: ListTodo },
    { href: "/team", label: "Team", icon: Users },
  ];

  return (
    <aside className="w-56 bg-lightCard dark:bg-darkCard border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-300">
      <div className="p-4 font-bold text-lg border-b border-gray-200 dark:border-gray-700">
        TaskFlow
      </div>
      <nav className="flex-1 p-2 space-y-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
              pathname === href
                ? "bg-blue-500 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
