export default function TeamCard({ name, role, avatar, tasks }: { name: string, role: string, avatar: string, tasks: number }) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded shadow">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-gray-500">{role}</div>
        <div className="text-xs text-gray-400">{tasks} tasks assigned</div>
      </div>
    </div>
  )
}
