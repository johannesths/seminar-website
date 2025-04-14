/**
 * SeminarDetail.tsx
 *
 * Displays the detail view for a single seminar in the admin dashboard.
 * Allows editing seminar information and managing (unregistering) registered participants.
 */

import { Box, Typography } from "@mui/material";
import EditSeminarForm from "../components/EditSeminarForm";
import ParticipantsTable from "../components/ParticipantsTable";

const SeminarDetail = () => {
  return (
    <Box>
      {/* Form to edit seminar information */}
      <EditSeminarForm />
      <Typography
        sx={{
          marginTop: 8,
          textAlign: "center",
          fontSize: 25,
          fontWeight: 400,
        }}
      >
        Teilnehmer*innen
      </Typography>
      {/* Participant table */}
      <ParticipantsTable />
    </Box>
  );
};

export default SeminarDetail;
