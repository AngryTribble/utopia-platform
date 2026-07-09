import type {
  CaptainDefinition,
  ShipDefinition,
  UpgradeDefinition,
} from "../packages/shared-types";

const ships: ShipDefinition[] = [
  {
    id: "ship:S001",
    name: "U.S.S. Enterprise",
    cardType: "ship",
    factions: ["federation"],
    setIds: ["starter"],
    cost: 28,
    text: "Sample ship ability.",
    imageUrl: "",
    unique: true,
    shipClassId: "constitution-class",
    shipClassName: "Constitution Class",
    attack: 3,
    agility: 1,
    hull: 4,
    shields: 4,
    actions: ["evade", "target-lock", "scan", "battlestations"],
    upgradeSlots: [
      { accepts: ["tech"], source: "ship" },
      { accepts: ["weapon"], source: "ship" },
      { accepts: ["crew"], source: "ship" },
      { accepts: ["crew"], source: "ship" },
    ],
  },
];

const captains: CaptainDefinition[] = [
  {
    id: "captain:C001",
    name: "Jean-Luc Picard",
    cardType: "captain",
    factions: ["federation"],
    setIds: ["starter"],
    cost: 6,
    text: "Sample captain ability.",
    imageUrl: "",
    unique: true,
    skill: 8,
    talentSlots: 1,
  },
];

const upgrades: UpgradeDefinition[] = [
  {
    id: "upgrade:U001",
    name: "Photon Torpedoes",
    cardType: "upgrade",
    upgradeType: "weapon",
    factions: ["federation"],
    setIds: ["starter"],
    cost: 5,
    text: "Sample weapon ability.",
    imageUrl: "",
    unique: false,
    attack: 5,
    range: "2-3",
  },
  {
    id: "upgrade:U002",
    name: "Spock",
    cardType: "upgrade",
    upgradeType: "crew",
    factions: ["federation"],
    setIds: ["starter"],
    cost: 5,
    text: "Sample crew ability.",
    imageUrl: "",
    unique: true,
  },
];

export const sampleCards = [
  ...ships,
  ...captains,
  ...upgrades,
];
