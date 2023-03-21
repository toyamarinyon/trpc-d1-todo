import type { AppRouter } from '../../functions/api/[[trpc]]'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouter>()
