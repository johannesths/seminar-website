/**
 * ParticipantTable.tsx
 *
 * Displays the participants of a seminar in a table.
 * Allows to delete (unregister) participants, add a participant and contact them.
 */

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Link,
  Box,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useParams } from "react-router-dom";
import { useParticipants } from "../hooks/useParticipants";
import api from "../api/axios";

const ParticipantTable = () => {
  // Get seminar_id from URL
  const { id } = useParams();
  const seminarId = Number(id);

  if (!seminarId) {
    return <Typography color="error">Ungültige Seminar-ID</Typography>;
  }

  // Fetch participants
  const { participants, setParticipants, error } = useParticipants(seminarId);

  // Join emails of all participants to email them at once
  const allEmails = participants.map((p) => p.email).join(",");

  // Delete a participant with confirmation
  const handleDelete = async (token: string) => {
    const confirm = window.confirm(
      "Möchten Sie diesen Teilnehmer wirklich abmelden?"
    );
    if (!confirm) return;
    try {
      await api.delete(`/seminars/${seminarId}/unregister?token=${token}`);
      setParticipants((prev) => prev.filter((p) => p.token !== token));
    } catch (err) {
      alert("Fehler beim Abmelden des Teilnehmers. Error: " + err);
    }
  };

  return (
    <Box>
      {/* Possible error message */}
      {error && (
        <Typography variant="h4" color="error">
          Fehler beim Auslesen der Teilnehmer*innen: {error}
        </Typography>
      )}
      {participants.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{ mb: 8, paddingX: 5, boxShadow: "none", borderBottom: "none" }}
        >
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Vorname</TableCell>
                <TableCell>Nachname</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Anmerkungen</TableCell>
                <TableCell>Löschen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participants.map((participant) => (
                <TableRow
                  key={participant.token}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {participant.firstname}
                  </TableCell>
                  <TableCell>{participant.lastname}</TableCell>
                  <TableCell>
                    <Link
                      href={`mailto:${participant.email}`}
                      underline="hover"
                      color="secondary"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontSize: "inherit",
                      }}
                    >
                      {participant.email}
                    </Link>
                  </TableCell>
                  <TableCell>{participant.remarks}</TableCell>
                  <TableCell>
                    {/* Button to delete (unregister) a participant */}
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleDelete(participant.token)}
                    >
                      Abmelden
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Button to message all participants at once, hiding their email addresses from each other */}
      {participants.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
          <Button
            variant="contained"
            startIcon={<EmailIcon />}
            href={`mailto:?bcc=${allEmails}`}
            size="large"
          >
            Allen Teilnehmer*innen schreiben
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ParticipantTable;
