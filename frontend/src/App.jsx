import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Navigation from '../src/components/Navigation'
import * as sessionActions from './store/session'
import LandingPage from "./components/LandingPage";
import SpotDetails from "./components/SpotDetails"
import CreateSpotPage from './components/CreateSpotPage'

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
      <Navigation isLoaded={isLoaded} />
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
        element: <LandingPage />,
      },
      {
        path: 'spots/:spotId',
        element: <SpotDetails />
      },
      {
        path: 'list',
        element: <CreateSpotPage />
      },
      {
        path: '*',
        element: <h1>Page Not Found</h1>
      },
    ]
  }
])


function App() {
  return <RouterProvider router={router} />;
}

export default App;
