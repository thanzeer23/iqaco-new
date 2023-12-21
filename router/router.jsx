import { createBrowserRouter } from "react-router-dom";
import App from "../src/App";
import Body from "../src/Body";

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
]);
