import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./routes/Posts";
import Login from "./routes/Login";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Posts />,
  },
  {
    path: "/user/login",
    element: <Login />,
  },
  {
    path: "/user/sign-up",
    element: <Login />,
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
