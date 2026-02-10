import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export default function SignUpPage() {
  async function createAccount(formData: FormData) {
    "use server"

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string

    if (!email || !password) {
      // Optionally, redirect or throw an error here
      return;
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      // Optionally, redirect or throw an error here
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
      },
    })

    redirect("/login")
  }

  return (
    <div className="max-w-sm mx-auto mt-16 p-6 border rounded">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>

      <form action={createAccount} className="space-y-4">
        <div>
          <label className="block mb-1">Name (optional)</label>
          <input name="name" className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1">Email *</label>
          <input name="email" type="email" required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1">Password *</label>
          <input name="password" type="password" required className="w-full border p-2 rounded" />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded">
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have account? <a href="/login" className="text-blue-600">Log in</a>
      </p>
    </div>
  )
}