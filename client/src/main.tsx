import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Signup from './pages/Signup.tsx'
import SignIn from './pages/Signin.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Temp from './pages/Temp.tsx'
import { Toaster } from "@/components/ui/sonner"

const router = createBrowserRouter([
  {
    path : "/",
    element : <App />
  },
  {
    path : "/signup",
    element : <Signup />
  },
  {
    path : "/signin",
    element : <SignIn />
  },
  {
    path : "/dashboard",
    element : <Dashboard />
  },
  {
    path : "/temp",
    element : <Temp />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>,
)
