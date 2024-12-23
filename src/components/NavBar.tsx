import { Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const NavBar = () => {
  const pages = ["Angebote", "Veranstaltungen", "Profil", "Kontakt"];

  return (
    <AppBar color="info" sx={{ padding: 3 }}>
      <Toolbar>
        <AccountBoxIcon sx={{ display: { md: "flex" }, mr: 10 }} />
        <Stack>
          <Typography variant="h4">Ursula Trahasch</Typography>
          <Typography variant="subtitle1">
            Beratung | Coaching | Supervision | Weiterbildung
          </Typography>
        </Stack>
        <Stack direction="row" spacing={5} sx={{ m: "auto" }}>
          {pages.map((page) => (
            <Box
              key={page}
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              <Button
                variant="text"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            </Box>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
