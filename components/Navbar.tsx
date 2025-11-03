"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const mode = saved ? saved === "true" : prefersDark;
    setDarkMode(mode);
    document.documentElement.classList.toggle("dark", mode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 transition-colors">
      <h1 className="text-xl font-bold">TaskFlow</h1>
      <button 
        onClick={toggleDarkMode} 
        className="p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      >
        {darkMode ? <Sun /> : <Moon />}
      </button>
    </nav>
  );
}
