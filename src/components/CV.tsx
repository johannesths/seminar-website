import { Box, Stack, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import SeperatingLine from "./SeperatingLine";

const CV = () => {
  const events = [
    { date: "1985", description: "Allgemeine Hochschulreife" },
    {
      date: "1988",
      description: "Ausbildung zur Sozialversicherungsfachangestellten",
    },
    {
      date: "1993",
      description:
        "Studium der Sozialpädagogik, Abschluss als Diplom Sozialpädagogin",
    },
    {
      date: "2018",
      description:
        "Rechtliche Betreuerin, Beraterin beim Sozialdienst kath. Frauen e.V.",
    },
    {
      date: "2024",
      description:
        "Selbstständig in den Bereichen Coaching, Supervision und Weiterbildung. Lehrende Transaktionsanalytikerin.",
    },
  ];

  return (
    <Box sx={{ margin: "6vh 15vh", paddingX: 10 }}>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Mein Werdegang
      </Typography>
      <SeperatingLine />
      <Stack
        direction="row"
        sx={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Typography sx={{ textAlign: "center" }}></Typography>
        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
            },
          }}
        >
          {events.map((event) => {
            return (
              <TimelineItem>
                <TimelineOppositeContent color="textSecondary">
                  {event.date}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  {events.indexOf(event) === events.length - 1 ? (
                    " "
                  ) : (
                    <TimelineConnector color="primary" />
                  )}
                </TimelineSeparator>
                <TimelineContent>{event.description}</TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Stack>
    </Box>
  );
};

export default CV;
