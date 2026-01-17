import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/public/Home";
import Projects from "../pages/public/Projects";
import ProjectDetails from "../pages/public/ProjectDetails";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import ProjectsAdmin from "../pages/admin/ProjectsAdmin";
import SkillsAdmin from "../pages/admin/SkillsAdmin";
import ProfileAdmin from "../pages/admin/ProfileAdmin";
import MessagesAdmin from "../pages/admin/MessagesAdmin";
import Blogs from "../pages/public/Blogs";
import BlogDetails from "../pages/public/BlogDetails";
import BlogsAdmin from "../pages/admin/BlogsAdmin";
import NotFound from "../pages/public/NotFound";
import ResumeAdmin from "../pages/admin/ResumeAdmin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <Projects /> },
      { path: "projects/:id", element: <ProjectDetails /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "blog", element: <Blogs /> },
      { path: "blog/:slug", element: <BlogDetails /> },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "projects", element: <ProjectsAdmin /> },
      { path: "skills", element: <SkillsAdmin /> },
      { path: "profile", element: <ProfileAdmin /> },
      { path: "messages", element: <MessagesAdmin /> },
      { path: "blogs", element: <BlogsAdmin /> },
      { path: "resume", element: <ResumeAdmin /> },
    ],
  },
]);
