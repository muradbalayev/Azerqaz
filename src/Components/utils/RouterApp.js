import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Success from "../Pages/Success";
import Dashboard from "../Pages/Dashboard";
import DashboardProjects from "../Dashboard/DashboardProjects";
import DashboardMain from "../Dashboard/DashboardMain";
import DashboardCreate from "../Dashboard/CRUD/Create";
import DashboardUpdate from "../Dashboard/CRUD/Update";
import Table from "../Dashboard/Table/Table";
import TableUpdate from "../Dashboard/Table/TableCRUD/Update";
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
        path: 'projects/create',
        element: <DashboardCreate />
      },
      {
        path: 'projects/update/:id',
        element: <DashboardUpdate/>
      },
      {
        path: 'table',
        element: <Table/>
      },
      {
        path: 'table/update/:userid',
        element: <TableUpdate/>
      }

    ],
  }

]);