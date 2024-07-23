import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoginFormPage from "./components/Login/LoginFormPage";
import SignupFormPage from "./components/SignUp/SignupFormPage";
import * as sessionActions from './store/session'

function Layout() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=> {
    dispatch(sessionActions.restoreUser()).then(()=> {
      setIsLoaded(true)
    });

  }, [dispatch])



  return (
    <>
      {isLoaded && <Outlet />}
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (<h1>Welcome!</h1>)
      },
      {
        path: '/login',
        element: <LoginFormPage />
      },
      {
        path: "/signup",
        element: <SignupFormPage />
      }
    ]
  }
])


function App() {
  return <RouterProvider router={router} />;
}

export default App;
