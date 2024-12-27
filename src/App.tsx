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
        {/* Fixierte Navbar */}
        <NavBar />

        {/* Platzhalter für die Navbar-Höhe */}
        <Toolbar />
        {/* Main Content */}
        <Box
          component="main"
          sx={{ flex: 1, margin: 0, padding: 0, position: "relative" }}
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/angebote" element={<Angebote />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/agb" element={<AGB />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
          </Routes>
        </Box>
      </Box>
      <NavBar />

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: "center",
          backgroundColor: (theme) => theme.palette.grey[100],
        }}
      >
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
