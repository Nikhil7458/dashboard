"use client"

import { useState } from "react"

export default function TaskForm() {
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    setLoading(true)

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      })

      if (res.ok) {
        setTitle("")
        window.location.reload() // simple refresh
      } else {
        alert("Something went wrong")
      }
    } catch {
      alert("Error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 border p-3 rounded"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !title.trim()}
        className="bg-green-600 text-black px-6 py-3 rounded disabled:bg-gray-400"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  )
}