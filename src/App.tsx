import { RouterProvider, createBrowserRouter } from "react-router-dom"
import LoginPage from "./pages/login/Login";
import HomePage from "./pages/home/Home";

const routers =createBrowserRouter([
  {path: "",element:<LoginPage/>},
  {path: "/home",element:<HomePage/>}
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App
