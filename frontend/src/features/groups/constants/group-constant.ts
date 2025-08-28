import { JoinMode, SportPracticed } from "../types/group-enum-type";

export const joinMode = [
  {
    name: "Privé",
    value: JoinMode.PRIVATE,
  },
  {
    name: "Sur invitation",
    value: JoinMode.INVITATION,
  },
  {
    name: "Ouvert",
    value: JoinMode.PUBLIC,
  },
];

export const sportPracticed = [
  {
    label: "Vélo de route",
    value: SportPracticed.ROAD_CYCLING,
  },
  {
    label: "VTT",
    value: SportPracticed.ROAD_MOUNTAIN,
  },
  {
    label: "Course à pied",
    value: SportPracticed.RUNNING,
  },
  {
    label: "Trail",
    value: SportPracticed.TRAIL,
  },
];
