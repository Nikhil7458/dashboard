import StatusSelect from "./StatusSelect"


type Task = {
  id: string
  title: string
  status: "TODO" | "IN_PROGRESS" | "DONE"
}

export default function TaskCard({ task }: { task: Task }) {
  let color = "bg-gray-100"
  if (task.status === "IN_PROGRESS") color = "bg-yellow-50 border-yellow-400"
  if (task.status === "DONE") color = "bg-green-50 border-green-400"

  return (
    <div className={`p-4 border rounded ${color} flex justify-between items-center`}>
      <div className="flex-1">
        <p className={task.status === "DONE" ? "line-through text-gray-700" : "text-gray-900"}>
          {task.title}
        </p>
      </div>

      <StatusSelect taskId={task.id} currentStatus={task.status} />
    </div>
  )
}