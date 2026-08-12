import { Provider } from "urql"
import { client } from "./api/graphql/client"
import MainLayout from "@/view/layout/mainLayout/mainLayout"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TestPage from "./view/page/test/TestPage"
import TechCommunityPage from "./view/page/TechCommunityPage"
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
      </Routes>
    </BrowserRouter>
  </Provider>
}

export default App