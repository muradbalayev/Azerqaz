import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Success from "../Pages/Success";
import Dashboard from "../Pages/Dashboard";
import DashboardProjects from "../Dashboard/Products/Products";
import DashboardHome from "../Dashboard/DashboardHome";
import DashboardCreate from "../Dashboard/Products/Create";
import DashboardUpdate from "../Dashboard/Products/Update";
import UserCreate from "../Dashboard/Users/Create";
import UsersTable from "../Dashboard/Users/UsersTable";
import UserUpdate from "../Dashboard/Users/Update";
import PostCreate from "../Dashboard/Posts/Create";
import PostsTable from "../Dashboard/Posts/PostTable";
import PostUpdate from "../Dashboard/Posts/Update";
import CommentTable from "../Dashboard/Comments/CommentTable";
import CommentCreate from "../Dashboard/Comments/Create";
import CommentUpdate from "../Dashboard/Comments/Update";
import ToDoList from "../Dashboard/ToDo/ToDoList";



const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? element : <Navigate to="/" replace />;
};


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
    element: <PrivateRoute element={<Dashboard />} />,
    children: [
      {
        path: 'home',
        element: <DashboardHome />,
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
      },
      {
        path: 'comments',
        element: <CommentTable/>
      },
      {
        path: 'comments/create',
        element: <CommentCreate/>
      },
      {
        path: 'comments/update/:commentId',
        element: <CommentUpdate />
      },
      {
        path: 'todo',
        element: <ToDoList/>
      }


    ],
  }

]);