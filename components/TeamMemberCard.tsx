type Member = {
  name: string;
  role: string;
  tasks?: number;
};

export default function TeamMemberCard({ member }: { member: Member }) {
  const initial = member.name.charAt(0).toUpperCase();
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-yellow-500",
  ];
  const color = colors[member.name.length % colors.length];

  return (
    <div className="flex items-center gap-4 p-4 bg-lightCard dark:bg-darkCard border dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      <div
        className={`w-12 h-12 rounded-full ${color} text-white flex items-center justify-center text-lg font-bold`}
      >
        {initial}
      </div>
      <div className="flex flex-col">
        <span className="font-semibold">{member.name}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{member.role}</span>
        <span className="text-sm text-gray-600 dark:text-gray-300">{member.tasks ?? 0} tasks</span>
      </div>
    </div>
  );
}
