import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { useCounterStore } from "./store.ts";
import Root from "./routes/root.tsx";
import ProfileRoutes from "./routes/ProfileRoutes.tsx";
import { ToastProvider } from "@radix-ui/react-toast";

const Contact = lazy(() => import("./pages/contact-page/Contact.tsx"));
const Error = lazy(() => import("./pages/error-page/Error.tsx"));
const Homepage = lazy(() => import("./pages/home-page/Homepage.tsx"));
const BlogPost = lazy(() => import("./pages/blog-post-page/BlogPost.tsx"));
const About = lazy(() => import("./pages/about-page/About.tsx"));
const Login = lazy(() => import("./pages/login-page/Login.tsx"));
const Category = lazy(() => import("./pages/category-page/Category.tsx"));
const Writepage = lazy(() => import("./pages/write-page/Writepage.tsx"));
const Profile = lazy(() => import("./pages/profile-page/Profile.tsx"));
const PostHistory = lazy(
  () => import("./pages/post-history-page/PostHistory.tsx")
);
const Admin = lazy(() => import("./pages/admin-page/Admin.tsx"));
const BookMark = lazy(() => import("./pages/bookmark-page/BookMark.tsx"));

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = useCounterStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

const App = () => (
  <BrowserRouter>
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin opacity-75"></div>
        </div>
      }
    >
      <Routes>
        <Route element={<Root />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/:post_id" element={<BlogPost />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route
            path="/write"
            element={<PrivateRoute element={<Writepage />} />}
          />
        </Route>

        <Route element={<PrivateRoute element={<ProfileRoutes />} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/post-history" element={<PostHistory />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/bookmark" element={<BookMark />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);
