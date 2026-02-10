"use client"

type Status = "TODO" | "IN_PROGRESS" | "DONE"

const options: { value: Status; label: string }[] = [
  { value: "TODO", label: "To do" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "DONE", label: "Done" },
]

export default function StatusSelect({
  taskId,
  currentStatus,
}: {
  taskId: string
  currentStatus: Status
}) {
  async function changeStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as Status

    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskId, status: newStatus }),
    })

    window.location.reload() // simple way
  }

  return (
    <select
      value={currentStatus}
      onChange={changeStatus}
      className="border rounded px-3 py-1 text-gray-700 bg-white"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}