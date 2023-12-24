import { createBrowserRouter } from "react-router-dom";
import App from "../src/App";
import Body from "../src/Body";
import Login from "../src/admin/login/Login";
import DashboardLayout from "../src/admin/dashboard/DashboardLayout";
import AdminHome from "../src/admin/AdminHome";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/firebase/Config";

const checkUser = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        return userData;
      } else {
        return false;
      }
    });
  }, []);
};

const LoggedInProtector = ({ element: Component, ...rest }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      const currentUser = checkUser();
      console.log(currentUser);
    };
    fetchUser();
  }, []);
};

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/details/:id",
        element: <Body />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminHome />,
      },
    ],
  },
]);
