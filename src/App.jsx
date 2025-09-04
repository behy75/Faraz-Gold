import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './components/layouts/DashboardLayout'
import ProfilePage from "./pages/ProfilePage";

// می‌تونی صفحات دیگر را هم بعداً اضافه کنی
export default function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route
          path="/profile"
          element={
              <ProfilePage />
          }
        />
      </Routes>
    </DashboardLayout>
  )
}
