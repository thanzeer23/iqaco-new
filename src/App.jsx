import { Routes, Route } from "react-router-dom";
import HomeLayout from "./HomeLayout";
import "./index.css";
import Login from "./admin/login/Login";
import DashboardLayout from "./admin/dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { LoggedInProtector } from "./middleware/LoggedInProtector";
import { auth } from "./firebase/config";
import { PrivateRoute } from "./middleware/PrivateRoute";
import AdminHome from "./admin/AdminHome";
import CreateSection from "./admin/pages/section/CreateSection";
import EditSections from "./admin/pages/section/EditSections";
import BlogPage from "./admin/pages/blog/BlogPage";
import EditBlogPages from "./admin/pages/blog/EditBlogPages";
import EditSectionWithId from "./admin/pages/section/EditSectionWithId";
import EditPageId from "./admin/pages/blog/EditPageId";
import Content from "./content/Content";
import { LoadingProvider } from "./context/context";
import HomePageLayout from "./HomePage";

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);

        setIsFetching(false);
        return;
      }
      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <LoadingProvider>
      <Routes>
        {/* frontend routes  */}

        <Route element={<HomeLayout user={user} />}>
          <Route path="/" element={<HomePageLayout user={user} />} />
          <Route path="/page/:id" element={<Content user={user} />} />
        </Route>

        {/* login page route */}
        <Route
          path="/admin/login"
          element={
            !isFetching && (
              <LoggedInProtector user={user}>
                <Login />
              </LoggedInProtector>
            )
          }
        />
        <Route
          element={
            !isFetching && (
              <PrivateRoute user={user}>
                <DashboardLayout />
              </PrivateRoute>
            )
          }
        >
          <Route path="/admin/dashboard" element={<AdminHome />} />
          <Route path="/admin/create-section" element={<CreateSection />} />
          <Route path="/admin/edit-sections" element={<EditSections />} />
          <Route
            path="/admin/edit-section/:id"
            element={<EditSectionWithId />}
          />
          <Route path="/admin/create-page" element={<BlogPage />} />
          <Route path="/admin/edit-page/:id" element={<EditPageId />} />
          <Route path="/admin/edit-pages" element={<EditBlogPages />} />
        </Route>
      </Routes>
    </LoadingProvider>
  );
}

export default App;
