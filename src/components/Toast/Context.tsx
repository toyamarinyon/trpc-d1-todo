import * as Toast from '@radix-ui/react-toast'
import { createContext, ReactNode, useState } from 'react'

interface Toast {
  toasts: Map<string, { title: string }>
  setToasts: (toasts: Map<string, { title: string }>) => void
}
export const ToastContext = createContext<Toast>({} as Toast)

export const ToastProvider = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => {
  const [toasts, setToasts] = useState(new Map<string, { title: string }>())
  return (
    <ToastContext.Provider value={{ toasts, setToasts }}>
      <Toast.Provider>
        {children}
        {Array.from(toasts).map(([key, { title }]) => (
          <Toast.Root
            key={key}
            className="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] px-4 py-2 grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
          >
            <Toast.Title className="[grid-area:_title] font-medium text-slate12 text-[15px]">
              {title}
            </Toast.Title>
            <Toast.Close aria-label="Close">
              <span aria-hidden>×</span>
            </Toast.Close>
          </Toast.Root>
        ))}
        <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 left-1/2 -translate-x-1/2 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </Toast.Provider>
    </ToastContext.Provider>
  )
}
