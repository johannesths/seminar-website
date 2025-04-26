/**
 * SeminarCard.tsx
 *
 * Renders a single seminar as a stylized card using MUI components.
 *
 * - Shows title, description, date, time, location and price.
 * - Supports expandable description text.
 * - Displays images based on the seminar's 'image_name' on the top of the card.
 * - Allows users to register via an in-page dialog or external link.
 */

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// Images
import branchImage from "../assets/seminar-symbolic-imgs/branches.jpg";
import teamImage from "../assets/seminar-symbolic-imgs/team.jpg";
import whiteboardImage from "../assets/seminar-symbolic-imgs/whiteboard.jpg";
import kidsImage from "../assets/seminar-symbolic-imgs/kids.jpg";
import handshakeImage from "../assets/seminar-symbolic-imgs/handshake.jpg";
import climberImage from "../assets/seminar-symbolic-imgs/climber.png";
import knotImage from "../assets/seminar-symbolic-imgs/knot.jpg";
import reflectionImage from "../assets/seminar-symbolic-imgs/reflexion.jpg";
import stonesImage from "../assets/seminar-symbolic-imgs/steine.jpg";
import teamworkImage from "../assets/seminar-symbolic-imgs/teamwork.jpg";

import { Seminar } from "../hooks/useSeminars";
import { useState } from "react";
import dayjs from "dayjs";
import PlaceIcon from "@mui/icons-material/Place";
import EuroIcon from "@mui/icons-material/Euro";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
  Stack,
} from "@mui/material";
import SeminarRegistrationForm from "./SeminarRegistrationForm";

// Maximum characters before "read more"
const MAX_LENGTH = 200;

// Format datetime into German Format dd.mm.yyyy, um 12:12 Uhr
const formatDateTime = (date: string, time: string): string => {
  const [year, month, day] = date.split("-");
  const formattedTime = time.slice(0, 5);
  return `${day}.${month}.${year}, um ${formattedTime} Uhr`;
};

// Image map: key = image_name from DB, value = imported image
export const imageMap: Record<string, string> = {
  branches: branchImage,
  team: teamImage,
  whiteboard: whiteboardImage,
  kids: kidsImage,
  handshake: handshakeImage,
  climber: climberImage,
  knot: knotImage,
  reflection: reflectionImage,
  stones: stonesImage,
  teamwork: teamworkImage,
};

// Helper function to get image or branchImage as a fallback
const getImage = (imageName: string | undefined) => {
  return imageName && imageMap[imageName] ? imageMap[imageName] : branchImage;
};

const SeminarCard = ({
  seminar_id,
  title,
  description,
  date,
  time,
  url,
  image_name,
  max_participants,
  participants_count,
  price,
  location,
}: Seminar) => {
  const [expanded, setExpanded] = useState(false);

  // Logic for diabling the registration button in case the seminar is less than 2h away or the maximum amount of participants is reached
  const maxParticipantsReached = participants_count >= max_participants;

  const seminarDateTime = dayjs(`${date} ${time}`);
  const isLate = seminarDateTime.diff(dayjs(), "hour", true) < 2;
  const registrationDisabled = maxParticipantsReached || isLate;

  // Logic for shortening the discription and possibility to extend the text with a button
  const shortened_description =
    description.length > MAX_LENGTH && !expanded
      ? description.substring(0, MAX_LENGTH) + "..."
      : description;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [forwardDialogOpen, setForwardDialogOpen] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<
    "success" | "error" | null
  >(null);

  // Open dialogs for registration
  const handleOpen = () => {
    if (url != null && url != "") {
      setForwardDialogOpen(true);
    } else {
      setDialogOpen(true);
    }
  };

  // Close dialogs
  const handleClose = () => {
    setDialogOpen(false);
    setForwardDialogOpen(false);
  };

  // Status is displayed in the dialog after the form was submitted
  const handleFormSubmission = (status: "success" | "error" | null) => {
    setDialogOpen(false);
    setRegistrationStatus(status);

    // Reset status after 10s
    setTimeout(() => setRegistrationStatus(null), 10000);
  };

  return (
    <>
      <Card
        key={seminar_id}
        sx={{ maxWidth: 650, minWidth: 400, width: "100%" }}
      >
        <CardMedia sx={{ height: 200 }} image={getImage(image_name)} />
        <CardContent>
          {/* Title */}
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ marginBottom: 0 }}
          >
            {title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", fontSize: 17 }}
          >
            {shortened_description}
          </Typography>
          {description.length > MAX_LENGTH && (
            <Button
              sx={{ marginTop: 1, padding: 0, fontSize: 15 }}
              onClick={() => setExpanded(!expanded)}
              size="small"
            >
              {expanded ? "Weniger anzeigen" : "Mehr anzeigen"}
            </Button>
          )}
          <br />

          {/* Date and time */}
          <Typography
            variant="overline"
            sx={{ fontSize: "17px", display: "flex", alignItems: "center" }}
          >
            <AccessTimeIcon sx={{ marginX: 1 }} />
            {formatDateTime(date, time)}
          </Typography>
          <Stack direction="column">
            <Typography
              variant="overline"
              sx={{
                color: "text.primary",
                fontSize: "inherit",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Location */}
              <PlaceIcon sx={{ marginX: 1 }} />
              <Typography>
                {location.name} <br />
                {location.street} {location.house_number}, {location.zip_code}{" "}
                {location.city}
              </Typography>
            </Typography>

            {/* Open location in Google Maps */}
            <Link
              href={location.maps_url}
              underline="hover"
              color="primary"
              variant="overline"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "flex",
                ml: 5,
                alignItems: "center",
                fontSize: "inherit",
              }}
            >
              In Google Maps öffnen
            </Link>
            {price != null && price != -1 && (
              <Typography
                variant="overline"
                sx={{
                  fontSize: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <EuroIcon sx={{ marginX: 1 }} />
                {price} Euro
              </Typography>
            )}
          </Stack>
        </CardContent>

        {/* Register for seminar */}
        <CardActions sx={{ ml: 4, mb: 1 }}>
          <Button
            variant="contained"
            onClick={handleOpen}
            disabled={registrationDisabled}
          >
            Anmeldung
          </Button>
        </CardActions>
      </Card>

      {/* Registration Form Dialog */}
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Jetzt anmelden: {title}</DialogTitle>
        <DialogContent>
          <SeminarRegistrationForm
            seminarId={seminar_id}
            setStatus={handleFormSubmission}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>

      {/* In case registration is handled on another website */}
      <Dialog
        open={forwardDialogOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Die Anmeldung für das Seminar "{title}" findet über folgende Seite
          statt:
        </DialogTitle>
        <DialogContent>
          <Link
            href={url}
            underline="hover"
            color="primary"
            variant="overline"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              fontSize: "inherit",
              margin: "0 auto",
            }}
          >
            {url}
          </Link>
        </DialogContent>

        {/* Cancel registration */}
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>

      {/* Registration status */}
      <Dialog
        open={!!registrationStatus}
        onClose={() => setRegistrationStatus(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {registrationStatus === "success"
            ? "Anmeldung erfolgreich"
            : "Es ist ein Fehler aufgetreten"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {registrationStatus === "success"
              ? "Sie haben sich erfolgreich für das Seminar angemeldet. Sie erhalten eine Bestätigung per Email."
              : "Leider ist ein Fehler bei der Verarbeitung der Anmeldung aufgetreten. Bitte versuchen Sie es später erneut oder nutzen Sie das Kontaktformular."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRegistrationStatus(null)} color="secondary">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SeminarCard;
