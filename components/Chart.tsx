'use client'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const COLORS = ['#10B981', '#F59E0B']

export default function Chart({ data }: { data: { name: string, value: number }[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow h-64">
      <h3 className="mb-2 font-medium">Status Overview</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={50} outerRadius={80}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
