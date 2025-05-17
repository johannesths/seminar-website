/**
 * Probleme.ts
 *
 * Dictionary of problems with a title, description and icon,
 * that are used on the frontend.
 */

import GroupsIcon from "@mui/icons-material/Groups";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import FlagIcon from "@mui/icons-material/Flag";
import BorderStyleIcon from "@mui/icons-material/BorderStyle";
import ForumIcon from "@mui/icons-material/Forum";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export const problems = [
  {
    title: "Führungsrolle",
    description: "Unsicherheit in der Übernahme einer neuen Führungsrolle.",
    icon: LeaderboardIcon,
  },
  {
    title: "Veränderungsprozesse",
    description:
      "Schwierigkeiten bei der Bewältigung eines beruflichen Veränderungsprozesses.",
    icon: TrendingUpIcon,
  },
  {
    title: "Konflikte",
    description: "Konflikte mit Kollegen, Vorgesetzten oder Kunden.",
    icon: ReportProblemIcon,
  },
  {
    title: "Persönlichkeit",
    description:
      "Schwierigkeit, die eigene Persönlichkeit weiterzuentwickeln und zu entfalten.",
    icon: SettingsAccessibilityIcon,
  },
  {
    title: "Kommunikation",
    description:
      "Kommunikationsprobleme im Team oder mangelnde Klarheit über eigene Kommunikationsmuster",
    icon: ForumIcon,
  },
  {
    title: "Abgrenzung",
    description:
      "Schwierigkeiten bei der Abgrenzung von beruflichen und persönlichen Themen",
    icon: BorderStyleIcon,
  },
  {
    title: "Ziele",
    description:
      "Gefühl von Stagnation in der eigenen beruflichen Entwicklung.",
    icon: FlagIcon,
  },
  {
    title: "Unsicherheiten",
    description:
      "Unsicherheiten in der Rollen- und Aufgabenverteilung im Team.",
    icon: GroupsIcon,
  },
];
