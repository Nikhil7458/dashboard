"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")

    const form = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      email: form.get("email") as string,
      password: form.get("password") as string,
      redirect: false,
    })

    if (result?.error) {
      setError("Wrong email or password")
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-16 p-6 border rounded">
      <h1 className="text-2xl font-bold mb-6">Log In</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input name="email" type="email" required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input name="password" type="password" required className="w-full border p-2 rounded" />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded">
          Log In
        </button>
      </form>

      <p className="mt-4 text-center">
        No account yet? <a href="/signup" className="text-blue-600">Sign up</a>
      </p>
    </div>
  )
}