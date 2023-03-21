import { appRouting } from './routes'
import { trpc } from './utils/trpc'
import { Router } from '@raula/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'

export const App = (): JSX.Element => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${window.location.protocol}//${window.location.host}/api/trpc`,
        }),
      ],
    })
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Router routes={appRouting} />
      </QueryClientProvider>
    </trpc.Provider>
  )
}
