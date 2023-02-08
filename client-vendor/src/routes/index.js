import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllProducts from '../pages/AllProducts'
import AllOrders from '../pages/AllOrders'
import AddProductForm from '../pages/AddProductForm'
import EditProductForm from '../pages/EditProductForm'
import MsgRoom from "../pages/Message"
// import EditProfile from '../pages/EditProfile'
// import Profile from '../pages/Profile'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
        {
          path: "/products",
          element: <AllProducts />,
        },
        {
          path: "/orders",
          element: <AllOrders />,
        },
        {
          path: "/addProduct",
          element: <AddProductForm />,
        },
        {
          path: "/editProducts/:productId",
          element: <EditProductForm />,
        },
        {
          path: "/messege",
          element: <MsgRoom />,
        },
        // {
        //   path: "/profile/:vendorId",
        //   element: <Profile />,
        // },
      //   {
      //     path: "/editprofile/:vendorId",
      //     element: <EditProfile />,
      //   },
    ],
  },
]);

export default router;
