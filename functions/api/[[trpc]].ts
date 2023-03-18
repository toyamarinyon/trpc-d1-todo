import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import tRPCPagesPluginFunction, {
  FetchCreateContextWithCloudflareEnvFnOptions,
} from "cloudflare-pages-plugin-trpc";
import { z } from "zod";

// Declare d1 binding as interface
// Key is same as d1_databases.binding on wrangler.toml
interface Env {
  DB: D1Database;
}

// Map binding to context of tRPC
const createContext = async ({
  env,
}: FetchCreateContextWithCloudflareEnvFnOptions<Env>) => ({
  db: env.DB,
});

// Alias context type
type Context = inferAsyncReturnType<typeof createContext>;

// Create a router instance with context
const t = initTRPC.context<Context>().create();

// Create routing to manage tasks
// It provides three routes:
//
//   - create: Create a task
//   - complete: Complete a task
//   - list: Retrieve tasks not completed
const appRouter = t.router({
  tasks: t.router({
    // Route to create a task
    create: t.procedure
      .input(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const result = await ctx.db
          .prepare("INSERT INTO tasks (title, description) VALUES (?, ?)")
          .bind(input.title, input.description)
          .run();
        if (!result.success) {
          throw new Error(result.error);
        }
      }),
    // Route to complete a task
    complete: t.procedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        const result = await ctx.db
          .prepare("UPDATE tasks SET completion_datetime = ? WHERE id = ?")
          .bind(new Date().valueOf(), input.id)
          .run();
        if (!result.success) {
          throw new Error(result.error);
        }
      }),
    // Route to retrieve tasks not completed
    list: t.procedure.query(async ({ ctx }) => {
      const result = await ctx.db
        .prepare("SELECT * FROM tasks WHERE completion_datetime IS NULL")
        .all<{ id: number, title: string; description: string }>();
      return { tasks: result.results };
    }),
  }),
});

// Expose type alias of appRouter. It uses on the client
export type AppRouter = typeof appRouter;

// Expose a request handler to run it on Cloudflare Pages Functions
// with tRPCPagesPlugin
export const onRequest: PagesFunction = tRPCPagesPluginFunction({
  router: appRouter,
  createContext,
  endpoint: "/api/trpc",
});
