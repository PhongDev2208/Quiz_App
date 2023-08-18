import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import Topics from "../pages/Topics";
import Answers from "../pages/Answers";
import PrivateRoutes from "../components/PrivateRoutes"
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";

export const routes = [
    {
      path: "/",
      element: <LayoutDefault />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "logout",
          element: <Logout />
        },
        {
          path: "register",
          element: <Register />
        },
        {
          element: <PrivateRoutes />,
          children: [
            {
              path: "topics",
              element: <Topics />
            },
            {
              path: "answers",
              element: <Answers />
            },
            {
              path: "quiz/:id",
              element: <Quiz />
            },
            {
              path: "result/:id",
              element: <Result />
            }
          ]
        }
      ]
    }
  ];