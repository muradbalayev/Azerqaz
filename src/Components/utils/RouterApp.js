import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Success from "../Pages/Success";
import Dashboard from "../Pages/Dashboard";
import DashboardProjects from "../Dashboard/DashboardProjects";
import DashboardMain from "../Dashboard/DashboardMain";
import DashboardCrud from "../Dashboard/DashboardCrud";
export const RouterApp = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {

    path: '/success',
    element: <Success />
  },
  {
    path: '/dashboard/*',
    element: <Dashboard />,
    children: [
      {
        path: '',
        element: <DashboardMain />,
      },
      {
        path: 'projects',
        element: <DashboardProjects />
      },
      {
        path: 'projects/crud',
        element: <DashboardCrud />
      }

    ],
  }

]);