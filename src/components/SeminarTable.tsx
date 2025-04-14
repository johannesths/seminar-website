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
import { useSeminars } from "../hooks/useSeminars";
import dayjs from "dayjs";
import "dayjs/locale/de";
import api from "../api/axios";

const SeminarTable = () => {
  const [page, setPage] = useState(0);
  const limit = 5; // Equals rows per page
  const navigate = useNavigate();

  const [offset, setOffset] = useState(0);

  const { seminars } = useSeminars(limit, offset);

  // Handle pagination changes
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
    setOffset(newPage * limit);
  };

  const handleDelete = async (seminar_id: number) => {
    const confirm = window.confirm(
      "Möchten Sie dieses Seminar wirklich löschen?"
    );
    if (!confirm) return;

    try {
      await api.delete(`/seminars/delete/${seminar_id}`);
      window.location.reload(); // Or use your hook to re-fetch seminars
    } catch (err) {
      alert("Fehler beim Löschen des Seminars.");
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
              <TableCell>Titel</TableCell>
              <TableCell>Datum</TableCell>
              <TableCell>Ort</TableCell>
              <TableCell>Teilnehmer</TableCell>
              <TableCell>Preis (EUR)</TableCell>
              <TableCell>Bearbeiten</TableCell>
              <TableCell>Löschen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seminars.map((seminar) => {
              const formattedDateTime = dayjs(`${seminar.date}T${seminar.time}`)
                .locale("de")
                .format("DD.MM.YYYY, HH:mm");

              return (
                <TableRow key={seminar.seminar_id}>
                  <TableCell>{seminar.seminar_id}</TableCell>
                  <TableCell>{seminar.title}</TableCell>
                  <TableCell>{formattedDateTime} Uhr</TableCell>
                  <TableCell>{seminar.location.name}</TableCell>
                  <TableCell>
                    {seminar.participants_count} / {seminar.max_participants}
                  </TableCell>
                  <TableCell>{seminar.price}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        navigate(`/admin/seminar/${seminar.seminar_id}`)
                      }
                    >
                      Bearbeiten
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleDelete(seminar.seminar_id)}
                    >
                      Löschen
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* Pagination controls */}
        <TablePagination
          component="div"
          count={-1}
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
