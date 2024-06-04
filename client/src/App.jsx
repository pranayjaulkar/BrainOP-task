import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./routes/Posts";
import Login from "./routes/Login";
import { Toaster } from "react-hot-toast";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Posts />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/sign-up",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <div className="bg-secondary-300 min-h-screen w-full">
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
