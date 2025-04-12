import { Box, Typography } from "@mui/material";
import SeminarTable from "../components/SeminarTable";

const AdminDashboard = () => {
  return (
    <Box sx={{ mt: 10 }}>
      <Typography
        sx={{
          marginTop: 2,
          textAlign: "center",
          fontSize: 30,
          fontWeight: 400,
        }}
      >
        Seminare Übersicht
      </Typography>
      <SeminarTable />
    </Box>
  );
};

export default AdminDashboard;
