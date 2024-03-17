import "./App.css";
import { Suspense, lazy , useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import UserProfile from './components/UserProfile/UserProfile'
import EditProfile from "./components/EditProfile/EditProfile";
import ViewTemple from "./components/View_Temple/ViewTemple";
import TempleDetails from "./components/TempleDetails/TempleDetails"
import TempleProfile from './components/TempleProfile/TempleProfile'
import PrivateRoute from "./components/PrivateRoute";
import {userReloginPromise} from './slices/userSlice';
import {templeReloginPromise} from './slices/templeSlice'
import { useDispatch } from "react-redux";
import NotFoundPage from './components/NotFoundPage'
import { jwtDecode } from 'jwt-decode';
import { TempleContext } from "./components/contexts/TempleContext";


function App() {
  const dispatch = useDispatch();
  let {isTemple} = useContext(TempleContext)
  // to relogin upon refresh......
  useEffect(() => {
    const jwtToken = sessionStorage.getItem('jwtToken');
    if (jwtToken !== null) {
      let decodedToken = jwtDecode(jwtToken);
      let name = isTemple ? decodedToken.templename : decodedToken.username;
      isTemple ? dispatch(templeReloginPromise(name)) : dispatch(userReloginPromise(name));
    }
  }, [isTemple]);
  

  
  let Login = lazy(()=> import("./components/Login/Login"));
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
          element: <PrivateRoute><UserProfile /></PrivateRoute> ,
        },
        {
          path: "edit-profile",
          element:<PrivateRoute><EditProfile /></PrivateRoute>,
        },
        {
          path: "view-temples",
          element: <ViewTemple />,
        },
        {
          path: "temple-details/:id", 
          element: <TempleDetails />,
        },
        {
          path: "temple-profile",
          element:<PrivateRoute> <TempleProfile />  </PrivateRoute>  , 
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={browserRouter} />;
}
export default App;
