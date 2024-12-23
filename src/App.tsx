import { Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

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
      <Box component="main" sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4">Main Content</Typography>
        <Typography>
          This is the main content area. Add your components or pages here.
        </Typography>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: "center",
          backgroundColor: (theme) => theme.palette.grey[200],
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
