import "./App.css";
import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider ,Navigate} from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import UserProfile from './components/UserProfile/UserProfile'
import EditProfile from "./components/EditProfile/EditProfile";
import ViewTemple from "./components/View_Temple/ViewTemple";
import TempleDetails from "./components/TempleDetails/TempleDetails"
import TempleProfile from './components/TempleProfile/TempleProfile'
let Login = lazy(()=> import("./components/Login/Login"));


function App() {
  //create BrowserRouter object
  let browserRouter = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "register",
          element: <Register/>,
        },
        {
          path: "login",
          element: <Suspense fallback = {<p className="display-4 mt-5 text-center text-danger">Loading Login component........</p>}>  <Login/> </Suspense>,
        },
        {
          path: "user-profile",
          element: <UserProfile />,
        },
        {
          path: "edit-profile",
          element: <EditProfile/>,
        },
        {
          path: "view-temples",
          element: <ViewTemple />,
        },
        {
          path: "temple-details/:id", // Adjust the path to include the temple's id
          element: <TempleDetails />,
        },
        {
          path: "temple-profile",
          element: <TempleProfile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={browserRouter} />;
}
export default App;
