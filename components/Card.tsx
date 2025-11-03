"use client";
import { motion } from "framer-motion";

export default function Card({ title, value }: { title: string, value: number }) {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md transition-colors"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-gray-500 dark:text-gray-300">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  );
}
