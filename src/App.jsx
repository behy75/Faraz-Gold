import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout";
import ProfilePage from "./pages/ProfilePage";
import UserProfilePage from "./pages/UserProfilePage";

export default function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </DashboardLayout>
  );
}
