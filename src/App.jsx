import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DSAPage from "./pages/DSAPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import MentorPage from "./pages/MentorPage";
import BadgesPage from "./pages/BadgesPage";
import AlumniPage from "./pages/AlumniPage";
import PYQPage from "./pages/PYQPage";
import ResumePage from "./pages/ResumePage";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right"
          toastOptions={{
            style: {
              background: "#1a1a24",
              color: "#f0eeff",
              border: "1px solid rgba(124,92,252,0.3)",
            },
          }}
        />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/dsa" element={<ProtectedRoute><DSAPage /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
          <Route path="/mentors" element={<ProtectedRoute><MentorPage /></ProtectedRoute>} />
          <Route path="/badges" element={<ProtectedRoute><BadgesPage /></ProtectedRoute>} />
          <Route path="/alumni" element={<ProtectedRoute><AlumniPage /></ProtectedRoute>} />
          <Route path="/pyq" element={<ProtectedRoute><PYQPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/resume" element={<ProtectedRoute><ResumePage /></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;