import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginFormPage from "./features/session/LoginFormPage";
import { useRestoreUserQuery } from "./features/session/sessionAPI";

function Layout() {
  const { data, isLoading, isSuccess, isError, error } = useRestoreUserQuery()
  console.log('data on Layout', data)

  if(isLoading) return (
    <h1>Loading...</h1>
  )
  if(isSuccess) return <Outlet />

  if(isError) return <h1>Sorry, there&apos been an error, {error}</h1>
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
      }
    ]
  }
])


function App() {
  return <RouterProvider router={router} />;
}

export default App;
