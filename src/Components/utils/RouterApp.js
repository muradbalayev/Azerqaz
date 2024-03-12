import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Success from "../Pages/Success";
import Dashboard from "../Pages/Dashboard";
import DashboardProjects from "../Dashboard/DashboardProjects";
import DashboardMain from "../Dashboard/DashboardMain";
import DashboardCreate from "../Dashboard/CRUD/Create";
import DashboardUpdate from "../Dashboard/CRUD/Update";
import UserCreate from "../Dashboard/Table/TableCRUD/Create";
import UsersTable from "../Dashboard/Table/Table";
import UserUpdate from "../Dashboard/Table/TableCRUD/Update";
import PostCreate from "../Dashboard/Cards/Create";
import PostsTable from "../Dashboard/Cards/PostTable";
import PostUpdate from "../Dashboard/Cards/Update";
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
        path: 'home',
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
        element: <DashboardUpdate />
      },
      {
        path: 'users',
        element: <UsersTable />
      },
      {
        path: 'users/create',
        element: <UserCreate />
      },
      {
        path: 'users/update/:userid',
        element: <UserUpdate />
      },
      {
        path: 'posts',
        element: <PostsTable />
      },
      {
        path: 'posts/create',
        element: <PostCreate />
      },
      {
        path: 'posts/update/:postId',
        element: <PostUpdate />
      }

    ],
  }

]);