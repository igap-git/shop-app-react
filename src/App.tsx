import './App.css'
import HomePage from './pages/HomePage'
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
  return null;
  // return (
    


  //     <HomePage></HomePage>

  // );
}


export default App