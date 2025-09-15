import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/share/not.found";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import Layout from "./pages/layout/layout";
import HomePage from "./pages/home/homePage";
import { useAppDispatch } from "./redux/hooks";
import { useEffect, useState } from "react";
import { setUserLoginInfo } from "./redux/slice/accountSlice";
import { callFetchAccount } from "./config/api";
import { Toaster } from "react-hot-toast";


type TFilterType = "all" | "mine"

const App = () => {

  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<TFilterType>("all")

  useEffect(() => {
    if (
      window.location.pathname === '/login'
      || window.location.pathname === '/register'
    )
      return;
    getAccount()
  }, [])

  const getAccount = async () => {
    const res = await callFetchAccount();
    dispatch(setUserLoginInfo(res.data.data?.user))
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout setFilter={setFilter} />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <HomePage filterType={filter} />
        },
      ],
    },
    {
      path: "/login",
      errorElement: <NotFound />,
      element: <LoginPage />
    },
    {
      path: "/register",
      errorElement: <NotFound />,
      element: <RegisterPage />
    }

  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  )
}

export default App
