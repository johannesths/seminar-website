/**
 * SeminarTable.tsx
 *
 * Displays a paginated table of seminars for the admin dashboard.
 * Each row contains key seminar information and a button to navigate
 * to a more detailed editing view for the selected seminar (=> SeminarDetail.tsx).
 */

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useLocations } from "../hooks/useLocations";

const SeminarTable = () => {
  const [page, setPage] = useState(0);
  const limit = 20; // Equals rows per page
  const navigate = useNavigate();

  // fetch locations
  const { locations } = useLocations(limit);

  // Handle pagination changes
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle deletion, confirmation needed
  const handleDelete = async (location_id: number) => {
    const confirm = window.confirm(
      "Möchten Sie dieses Seminar wirklich löschen?"
    );
    if (!confirm) return;

    try {
      await api.delete(`/locations/delete/${location_id}`);
      window.location.reload();
    } catch (err) {
      alert("Fehler beim Löschen des Ortes.");
      console.error(err);
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>PLZ</TableCell>
              <TableCell>Stadt</TableCell>
              <TableCell>Strasse</TableCell>
              <TableCell>Hausnummer</TableCell>
              <TableCell>Anmerkungen</TableCell>
              <TableCell>Google Maps</TableCell>
              <TableCell>Bearbeiten</TableCell>
              <TableCell>Löschen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((location) => (
              <TableRow key={location.location_id}>
                <TableCell>{location.location_id}</TableCell>
                <TableCell>{location.name}</TableCell>
                <TableCell>{location.zip_code}</TableCell>
                <TableCell>{location.city}</TableCell>
                <TableCell>{location.street}</TableCell>
                <TableCell>{location.house_number}</TableCell>
                <TableCell>{location.remarks}</TableCell>
                <TableCell>{location.maps_url}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigate(`/admin/location/${location.location_id}`)
                    }
                  >
                    Bearbeiten
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleDelete(location.location_id)}
                  >
                    Löschen
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination controls */}
        <TablePagination
          component="div"
          count={1}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[]}
        />
      </TableContainer>
    </Paper>
  );
};

export default SeminarTable;
