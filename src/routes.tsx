import { NewTaskPage } from './pages/NewTask'
import { TaskList } from './pages/TaskList'
import { Layout } from './pages/layouts/app'
import { createRouting } from '@raula/router'

export const appRouting = createRouting()
  .setLayout(({ page }) => <Layout page={page} />)
  .add('/', () => <TaskList />)
  .add('/new', () => <NewTaskPage />)

type AppRouting = typeof appRouting

declare module '@raula/router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Routing extends AppRouting {}
}
