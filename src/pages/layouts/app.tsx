import { ToastProvider } from '../../components/Toast'
import { LayoutComponent } from '@raula/router'

export const Layout: LayoutComponent = ({ page }) => {
  return (
    <>
      <ToastProvider>
        <section className="mx-auto max-w-xl py-4 mt-14">{page}</section>
      </ToastProvider>
    </>
  )
}
