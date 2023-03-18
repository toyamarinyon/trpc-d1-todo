import { initTRPC } from "@trpc/server";
import { z } from "zod";

// mock db
export const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
  },
];

const wait = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

// Create a router instance
const t = initTRPC.create();

// Create routing to manage tasks
const appRouter = t.router({
  tasks: t.router({
    create: t.procedure.input(z.object({
      title: z.string(),
      description: z.string(),
    })).mutation(async ({ input }) => {
      await wait()
      return { message: `called creating task mutation with ${JSON.stringify(input)}` }
    }),
    complete: t.procedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      await wait(500)
      return { message: `complete task: ${input.id}` }
    }),
    list: t.procedure.query(async () => {
      await wait()
      return tasks
    })
  })
})

export type AppRouter = typeof appRouter
