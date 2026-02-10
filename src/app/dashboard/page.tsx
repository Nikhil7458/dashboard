

// import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";   // ← this is the only thing you import from auth.ts
// import { prisma } from "@/lib/prisma";
// import TaskForm from "@/components/TaskForm";
// import TaskCard from "@/components/TaskCard";

// export default async function Dashboard() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.id) {
//     redirect("/login");
//   }

//   const tasks = await prisma.task.findMany({
//     where: { userId: session.user.id },
//     orderBy: { createdAt: "desc" },
//   });

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-8">My Tasks</h1>

//       <TaskForm />

//       {tasks.length === 0 ? (
//         <p className="text-gray-500 mt-12 text-center">No tasks yet...</p>
//       ) : (
//         <div className="mt-8 space-y-3">
//           {tasks.map((task) => (
//             <TaskCard key={task.id} task={task} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TaskForm from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";

type Task = Awaited<ReturnType<typeof prisma.task.findMany>>[number];

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const tasks = await prisma.task.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Tasks</h1>

      <TaskForm />

      {tasks.length === 0 ? (
        <p className="text-gray-500 mt-12 text-center">No tasks yet...</p>
      ) : (
        <div className="mt-9 space-y-3">
          {tasks.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
