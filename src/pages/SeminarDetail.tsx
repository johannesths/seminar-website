/**
 * SeminarDetail.tsx
 *
 * Displays the detail view for a single seminar in the admin dashboard.
 * Allows editing seminar information and managing (unregistering) registered participants.
 */

import { Box } from "@mui/material";
import EditSeminarForm from "../components/EditSeminarForm";
import ParticipantsTable from "../components/ParticipantsTable";

const SeminarDetail = () => {
  return (
    <Box>
      {/* Form to edit seminar information */}
      <EditSeminarForm />

      {/* Participant table */}
      <ParticipantsTable />
    </Box>
  );
};

export default SeminarDetail;
