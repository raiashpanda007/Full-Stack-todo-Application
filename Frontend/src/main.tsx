import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter,Route,RouterProvider,createRoutesFromElements } from 'react-router-dom'


const route = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
    
  </Route>
))
createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={route}/>
  </StrictMode>,
)
