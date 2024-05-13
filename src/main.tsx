import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Changed import to use BrowserRouter directly
import Contact from "./pages/contact-page/Contact.tsx";
import Error from "./pages/error-page/Error.tsx";
import Homepage from "./pages/home-page/Homepage.tsx";
import BlogPost from "./pages/blog-post-page/BlogPost.tsx";
import Root from "./root.tsx";
import About from "./pages/about-page/About.tsx";
import Login from "./pages/login-page/Login.tsx";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import Category from "./pages/category-page/Category.tsx";
import Writepage from "./pages/write-page/Writepage.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { useCounterStore } from "./store.ts";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = useCounterStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    console.log(isAuthenticated);
    return <Navigate to="/login" replace />;
  }

  return element;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Root />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/:postId" element={<BlogPost />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route
          path="/write"
          element={<PrivateRoute element={<Writepage />} />}
        />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
);

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
