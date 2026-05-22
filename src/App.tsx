import './App.css'
import { routeTree } from './routeTree.gen'
import { createRouter, RouterProvider} from "@tanstack/react-router"

const router = createRouter({ routeTree })

declare module "@tanstack/react-router"{
  interface Register{
    router: typeof router
  }
}

// function App() {
//   return  <RouterProvider router = {router}/>
    
// }

function App() {
  return (
    
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-5xl font-bold text-blue-500">
        Tailwind działa 🚀
      </h1>
    </div>
  );
}


export default App