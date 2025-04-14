import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Index from "./pages/Index";
import Profil from "./pages/Profil";
import Footer from "./components/Footer";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Angebote from "./pages/Angebote";
import Kontakt from "./pages/Kontakt";
import Impressum from "./pages/Impressum";
import AGB from "./pages/AGB";
import Datenschutz from "./pages/Datenschutz";
import Veranstaltungen from "./pages/Veranstaltungen";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SeminarDetail from "./pages/SeminarDetail";
import CreateSeminarForm from "./components/CreateSeminarForm";

function App() {
  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        {/* Fixed Navbar */}
        <NavBar />

        {/* Placeholder for Navbar height */}
        <Toolbar sx={{ height: (theme) => theme.mixins.toolbar.minHeight }} />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            margin: 0,
            padding: 0,
          }}
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/angebote" element={<Angebote />} />
            <Route path="/veranstaltungen" element={<Veranstaltungen />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/agb" element={<AGB />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/seminar/:id"
              element={
                <ProtectedRoute>
                  <SeminarDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/createseminar"
              element={
                <ProtectedRoute>
                  <CreateSeminarForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
