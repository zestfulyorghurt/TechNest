import { Provider } from "urql"
import { client } from "./apis/graphql/client"
import MainLayout from "@/view/layouts/mainLayout"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TestPage from "./view/pages/test/TestPage"
import TechCommunityPage from "./view/pages/TechCommunityPage"
import BlogDetailPage from "./view/pages/BlogDetailPage"
import BlogEditPage from "./view/pages/BlogEditPage"
import AuthPage from "./view/pages/AuthPage"
import VipPage from "./view/pages/VipPage"
import ProfilePage from "./view/pages/ProfilePage"
import ProfileEditPage from "./view/pages/ProfileEditPage"
import FootprintPage from "./view/pages/FootprintPage"
import BlogManagePage from "./view/pages/BlogManagePage"
import MyBlogsPage from "./view/pages/MyBlogsPage"
import UserManagePage from "./view/pages/UserManagePage"
function App() {
  return <Provider value={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
        </Route>
        <Route path="/test" element={<TestPage />}>
        </Route>
        <Route path="/TechCommunityPage" element={<TechCommunityPage />}>
        </Route>
        <Route path="/BlogDetailPage" element={<BlogDetailPage />}>
        </Route>
        <Route path="/BlogEditPage" element={<BlogEditPage />}>
        </Route>
        <Route path="/AuthPage" element={<AuthPage />}>
        </Route>
        <Route path="/VipPage" element={<VipPage />}>
        </Route>
        <Route path="/ProfilePage" element={<ProfilePage />}>
        </Route>
        <Route path="/ProfileEditPage" element={<ProfileEditPage />}>
        </Route>
        <Route path="/FootprintPage" element={<FootprintPage />}>
        </Route>
        <Route path="/BlogManagePage" element={<BlogManagePage />}>
        </Route>
        <Route path="/MyBlogsPage" element={<MyBlogsPage />}>
        </Route>
        <Route path="/UserManagePage" element={<UserManagePage />}>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
}

export default App