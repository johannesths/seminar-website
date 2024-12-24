import { Box, CssBaseline, Toolbar } from "@mui/material";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ImageBox from "./components/ImageBox";

function App() {
  return (
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
        <ImageBox />
      </Box>

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
    </Box>
  );
}

export default App;
