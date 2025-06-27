import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Home from "./Components/Home.jsx";
import ErrorPage from "./Components/ErrorPage.jsx";
import CountryDetail from "./Components/CountryDetail.jsx";
import Contact from "./Components/Contact.jsx";



const root = createRoot(document.querySelector("#root"));

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/contact",
        element: <Contact/>,
      },
      {
        path: "/:country",
        element: <CountryDetail/>,
      },
    ],
  },
]);

root.render(<RouterProvider router={router} />);
