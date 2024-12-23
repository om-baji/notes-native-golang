import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Signup from './pages/Signup.tsx'
import SignIn from './pages/Signin.tsx'
import Dashboard from './pages/Dashboard.tsx'

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
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
