import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SeminarTable from "../components/SeminarTable";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleCreateSeminar = () => {
    navigate("/admin/createseminar");
  };

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          m: 5,
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          color="success"
          onClick={handleCreateSeminar}
        >
          neues Seminar erstellen
        </Button>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
