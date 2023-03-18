import { Router } from "@raula/router"
import { appRouting } from "./routes"

export const App = (): JSX.Element => {
  return (
    <Router routes={appRouting} />
  )
}
