import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./pages/contact-page/Contact.tsx";
import Error from "./pages/error-page/Error.tsx";
import Homepage from "./pages/home-page/Homepage.tsx";
import BlogPost from "./pages/blog-post-page/BlogPost.tsx";
import Root from "./root.tsx";
import About from "./pages/about-page/About.tsx";
import Login from "./pages/login-page/Login.tsx";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import Category from "./pages/category-page/Category.tsx";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/posts/:postId",
        element: <BlogPost />,
      },
      {
        path: "/category/:categoryId",
        element: <Category />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
