/**
 * Angebote.ts
 *
 * Dictionary of offers concerning seminars that are used on the frontend.
 * Every offer has a title, description, example topics, target groups and an icon.
 */

import VisibilityIcon from "@mui/icons-material/Visibility";
import ForumIcon from "@mui/icons-material/Forum";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PeopleIcon from "@mui/icons-material/People";

export const angebote = [
  {
    title: "Transaktionsanalyse",
    description:
      "Die Transaktionsanalyse ist ein wirkungsvolles Modell zur Analyse und Gestaltung von zwischenmenschlicher Kommunikation und Beziehungen. Sie hilft, Verhaltensmuster zu erkennen, innere Prozesse zu verstehen und bewusste Veränderungen hin zu mehr Autonomie und Klarheit einzuleiten.",
    exampleTopics: [
      "Konfliktlösung",
      "Kommunikation in Teams",
      "Selbstreflexion",
    ],
    targetGroups: [
      "Führungskräfte",
      "Teams",
      "Personen, die an Kommunikation und Beziehungsgestaltung arbeiten wollen",
    ],
    icon: PeopleIcon,
  },
  {
    title: "Beratung",
    description:
      "In der Beratung werden Veränderungsprozesse aktiv begleitet und gestaltet. Das Ziel ist, die eigene Fähigkeit zur Problemlösung zu stärken und die Entscheidungs- sowie Handlungsfähigkeit weiterzuentwickeln.",
    exampleTopics: [
      "Unterstützung bei beruflichen und privaten Veränderungsprozessen",
      "Konfliktklärung in Arbeitskontexten",
      "Entwicklung von Entscheidungsstrategien",
    ],
    targetGroups: [
      "Teams, die vor besonderen Herausforderungen stehen",
      "Personen, die sich beruflich oder privat in Veränderungsprozessen befinden",
    ],
    icon: ForumIcon,
  },
  {
    title: "Coaching",
    description:
      "Coaching ist eine beratende Begleitung im beruflichen Kontext. Dabei wird das eigene berufliche Handeln reflektiert, um es gezielt und ressourcenorientiert weiterzuentwickeln. Der Coachingprozess unterstützt dabei, die eigene Rolle bewusst zu gestalten, Handlungsoptionen in herausfordernden Situationen zu erkennen und aktiv umzusetzen.",
    exampleTopics: [
      "Umgang mit beruflichen Herausforderungen und Stress",
      "Kommunikation und Konfliktlösung am Arbeitsplatz",
      "Vorbereitung auf neue Aufgaben und Rollen",
    ],
    targetGroups: [
      "Personen in neuen Rollen",
      "Menschen in belastenden beruflichen Situationen",
    ],
    icon: HandshakeIcon,
  },
  {
    title: "Supervision",
    description:
      "Supervision ist ein etabliertes Beratungsformat im beruflichen Kontext, das der Reflexion von Arbeitsbedingungen, spezifischen Herausforderungen sowie Kommunikations- und Verhaltensmustern von Fach- und Führungskräften dient.",
    exampleTopics: [
      "Reflexion von herausfordernden beruflichen Situationen",
      "Team- und Konfliktmoderation",
      "Rollenklärung und Zusammenarbeit im Team",
    ],
    targetGroups: [
      "Teams und Gruppen",
      "Organisationen, die Teamprozesse und Zusammenarbeit verbessern wollen",
    ],
    icon: VisibilityIcon,
  },
];
