import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/Register";
import Dashboard from "./pages/Dashboard";


const router = createBrowserRouter([
 
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <Login /> },
  { path: "/", element: <Dashboard /> },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;