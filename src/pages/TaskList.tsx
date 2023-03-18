import { Link } from "@raula/router";
import { Task } from "../components/Task";
import { PlusIcon } from "@radix-ui/react-icons";
import { tasks as mockTasks } from "../db/task";
import { useCallback, useState } from "react";
import { useToast } from "../components/Toast";
import { trpc } from "../utils/trpc";

export const TaskList = (): JSX.Element => {
  const [tasks, setTasks] = useState<typeof mockTasks>(mockTasks);
  const { data } = trpc.tasks.list.useQuery()
  const toast = useToast();
  const handleTaskClick = useCallback(
    (clickTaskId: number) => () => {
      setTasks(tasks.filter(({ id }) => id !== clickTaskId));
      toast("Task completed");
    },
    [tasks, toast]
  );
  return (
    <main>
      <h1 className="text-2xl text-neutral-200 font-bold mb-8">Task list</h1>
      <ul className="divide-y divide-whiteA9 border-b border-whiteA9 mb-4">
        {data?.tasks.map(({ id, title, description }) => (
          <li key={id}>
            <Task
              title={title}
              description={description}
              onClick={handleTaskClick(id)}
            />
          </li>
        ))}
      </ul>
      <Link
        to="/new"
        className="flex items-center space-x-1 text-slate-400 hover:text-slate-300"
      >
        <PlusIcon />
        <span className="text-sm">Add task</span>
      </Link>
    </main>
  );
};
