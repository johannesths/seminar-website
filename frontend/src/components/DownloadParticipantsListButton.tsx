/**
 * DownloadParticipantsListButton.tsx
 *
 * A button to download a pdf with information about the seminar and
 * the participants.
 */

import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import api from "../api/axios";

const DownloadParticipantsListButton = ({
  seminarId,
}: {
  seminarId: number;
}) => {
  const handleDownload = async () => {
    try {
      const response = await api.get(
        `/admin/seminars/${seminarId}/participants/pdf`,
        {
          responseType: "blob",
        }
      );

      // Create a blob object
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Creates a hidden <a> element and points it to the Blob URl,
      // sets the name of the file and clicks the element. Removes the
      // URL after the download started.
      const link = document.createElement("a");
      link.href = url;
      link.download = `Teilnehmerliste_${seminarId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Fehler beim Herunterladen der Teilnehmerliste:", error);
    }
  };

  return (
    <Button
      variant="outlined"
      startIcon={<DownloadIcon />}
      onClick={handleDownload}
      size="large"
    >
      Teilnehmerliste herunterladen
    </Button>
  );
};

export default DownloadParticipantsListButton;
