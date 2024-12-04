import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import reportWebVitals from "./reportWebVitals";
import ViewNotes from "./pages/ViewNotes";
import Note from "./pages/Note";
import { Toaster } from "react-hot-toast";
import AddNote from "./pages/AddNote";
import Todo from "./pages/Todo";

const client = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/signin",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <LandingPage />,
  },
  {
    path: "/notes",
    element: <ViewNotes />,
  },
  {
    path: "/note",
    element: <Note />,
  },
  {
    path: "/addNote",
    element: <AddNote />,
  },
  {
    path : "/todos",
    element : <Todo />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RecoilRoot>
        <Toaster />
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
