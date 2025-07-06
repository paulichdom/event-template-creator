import { Template } from "../types/template";

export const mockTemplates: Template[] = [
  {
    id: "1",
    templateName: "Weekly Team Sync",
    eventTitle: "Weekly Team Sync",
    duration: 60,
    attendees: ["team@example.com"],
    location: "Google Meet",
    description: "Weekly team synchronization meeting.",
  },
  {
    id: "2",
    templateName: "Client Kick-off Call",
    eventTitle: "Client Kick-off",
    duration: 90,
    attendees: ["client@example.com"],
    location: "Zoom",
    description: "Initial call with new client.",
  },
  {
    id: "3",
    templateName: "1:1 with Manager",
    eventTitle: "1:1 Meeting",
    duration: 30,
    attendees: ["manager@example.com"],
    location: "Google Meet",
    description: "One-on-one discussion with manager.",
  },
  {
    id: "4",
    templateName: "Design Review",
    eventTitle: "Design Review Session",
    duration: 120,
    attendees: ["designers@example.com", "engineers@example.com"],
    location: "Figma",
    description: "Review of current design iterations.",
  },
]; 