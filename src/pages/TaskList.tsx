import { Link } from "@raula/router";
import { Task } from "../components/Task";
import { PlusIcon } from "@radix-ui/react-icons";

export const TaskList = (): JSX.Element => {
  return (
    <main>
      <h1 className="text-2xl text-neutral-200 font-bold mb-8">Task list</h1>

      <ul className="divide-y divide-whiteA9 border-b border-whiteA9 mb-4">
        <li>
          <Task />
        </li>
        <li>
          <Task />
        </li>
      </ul>
      <Link to="/new" className="flex items-center space-x-1 text-slate-400 hover:text-slate-300">
        <PlusIcon />
        <span className="text-sm">Add task</span>
      </Link>
    </main>
  );
};
