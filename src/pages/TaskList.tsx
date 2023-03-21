import { Task } from '../components/Task'
import { useToast } from '../components/Toast'
import { trpc } from '../utils/trpc'
import { PlusIcon } from '@radix-ui/react-icons'
import { Link } from '@raula/router'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { useCallback, useState } from 'react'

export const TaskList = (): JSX.Element => {
  const queryClient = useQueryClient()
  const { data, isInitialLoading, isFetching } = trpc.tasks.list.useQuery()
  const mutation = trpc.tasks.complete.useMutation()
  const [completeTaskIds, setCompleteTaskIds] = useState<number[]>([])
  const toast = useToast()
  const handleTaskClick = useCallback(
    (clickTaskId: number) => async () => {
      setCompleteTaskIds((prev) => [...prev, clickTaskId])
      await mutation.mutateAsync({ id: clickTaskId })
      queryClient.invalidateQueries(getQueryKey(trpc.tasks))

      toast('Task completed')
    },
    [toast]
  )
  console.log({ completeTaskIds })
  return (
    <main>
      <section className="flex justify-between">
        <h1 className="text-2xl text-neutral-200 font-bold mb-8">Task list</h1>
        {!isInitialLoading && isFetching && (
          <p className="text-neutral-400">sync...</p>
        )}
      </section>
      {isInitialLoading ? (
        <p className="text-neutral-200 mb-4">Loading...</p>
      ) : (
        <ul className="divide-y divide-whiteA9 border-b border-whiteA9 mb-4">
          {data?.tasks?.map(({ id, title, description }) => (
            <li
              key={id}
              className={completeTaskIds.includes(id) ? 'hidden' : ''}
            >
              <Task
                title={title}
                description={description}
                onClick={handleTaskClick(id)}
              />
            </li>
          ))}
        </ul>
      )}
      <Link
        to="/new"
        className="flex items-center space-x-1 text-slate-400 hover:text-slate-300"
      >
        <PlusIcon />
        <span className="text-sm">Add task</span>
      </Link>
    </main>
  )
}
