import{createBrowserRouter, redirect} from 'react-router-dom'
import MainLayouts from '../layouts/MainLayouts'
import Home from '../views/Home'
import Products from '../views/Products'
import DetailProduct from '../views/DetailProduct'
import Login from '../views/Login'
import Register from '../views/Register'
import OrderHistory from '../views/OrderHistory'
import Message from '../views/Message'
import Tema1 from '../views/theme/Tema1'
import Dashboard from '../views/Dashboard'
import InvitationTheme from '../views/InvitationTheme'
import TemaPrev from '../views/theme/TemaPrev'
import InvDashboard from '../views/InvDashboard'
import HomeChat from '../components/HomeChat'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../Context/AuthContext'

const Apps = (function () {
    const { currentUser } = useContext(AuthContext);
  
    const ProtectedRoute = ({ children }) => {
      if (!currentUser) {
        return <Navigate to="/login" />;
      }
      return children
    };
  
    return (
      <BrowserRouter>
        <Routes>
            <Route
              index
              element={
                <ProtectedRoute>
                  <HomeChat />
                </ProtectedRoute>
              }
            />
        </Routes>
      </BrowserRouter>
    );
  })

const router = createBrowserRouter([
    {
        element: <MainLayouts/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/products',
                element: <Products/>
            }, 
            {
                path:'/products/:id',
                element: <DetailProduct/>
            },
            {
                path:'/histories',
                element: <OrderHistory/>,
                loader: () => {
                    if (!localStorage.getItem('token')) {
                        return redirect('/login')
                    }
                    return null
                }
            },
            {
                path: '/message',
                element: <Message/>,
                loader: () => {
                    if (!localStorage.getItem('token')) {
                        return redirect('/login')
                    }
                    return null
                }
            },
            {
                path: '/theme',
                element: <InvitationTheme/>,
            }, 
        ]
    },
    {
        path: '/login',
        element: <Login/>,
        loader: () => {
            if (localStorage.getItem('token')) {
                return redirect('/')
            }
            return null
        }
    },
    {
        path: '/register',
        element: <Register/>,
        // loader: () => {
        //     if (!localStorage.getItem('token')) {
        //         return redirect('/login')
        //     }
        //     return null
        // }
    },        
    {
        path: '/inv/:id',
        element: <Dashboard/>
    },             
    {
        path: '/t1/:id',
        element: <Tema1/>
    },            
    {
        path: '/theme/:id',
        element: <TemaPrev/>
    },  
    {
        path: '/dash',
        element: <InvDashboard/>
    }, 
    {
        path: '/chat',
        element: <HomeChat/>
    }
])

export default router