import { Home } from "./pages/Home"
import { ReactQueryDevtools } from "react-query/devtools"
import { queryClient } from "./service/queryClient"
import { QueryClientProvider } from "react-query"


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )
}

export default App
