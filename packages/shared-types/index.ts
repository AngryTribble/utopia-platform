export type CardType =
  | "ship"
  | "captain"
  | "admiral"
  | "ambassador"
  | "upgrade"
  | "resource"
  | "starship_construction"
  | "fleet_captain"
  | "officer"
  | "token"
  | "mission";

export type UpgradeType =
  | "crew"
  | "weapon"
  | "tech"
  | "talent"
  | "borg"
  | "question";

export type Cost = number | "variable";

export type CardBase = {
  id: string;
  name: string;
  cardType: CardType;
  factions: string[];
  setIds: string[];
  cost: Cost;
  text: string;
  imageUrl?: string;
  unique?: boolean;
  mirror?: boolean;
  keywords?: string[];
  ruleIds?: string[];
};

export type UpgradeSlot = {
  accepts: UpgradeType[];
  source: string;
};

export type ShipDefinition = CardBase & {
  cardType: "ship";
  shipClassId?: string;
  shipClassName?: string;
  attack: number;
  agility: number;
  hull: number;
  shields: number;
  actions: string[];
  upgradeSlots: UpgradeSlot[];
};

export type CaptainDefinition = CardBase & {
  cardType: "captain";
  skill: number | "*";
  talentSlots: number;
};

export type AdmiralDefinition = CardBase & {
  cardType: "admiral";
  skillModifier: number;
  talentSlots: number;
};

export type AmbassadorDefinition = CardBase & {
  cardType: "ambassador";
  acceptedText?: string;
  deniedText?: string;
};

export type UpgradeDefinition = CardBase & {
  cardType: "upgrade";
  upgradeType: UpgradeType;
  attack?: number;
  range?: string;
};

export type Fleet = {
  id: string;
  name: string;
  pointLimit: number;
  ships: FleetShip[];
  resource?: FleetCardInstance;
};

export type FleetShip = {
  id: string;
  shipCardId: string;
  captain?: FleetCardInstance;
  admiral?: FleetCardInstance;
  ambassador?: FleetCardInstance;
  construction?: FleetCardInstance;
  upgrades: FleetUpgradeInstance[];
};

export type FleetCardInstance = {
  id: string;
  cardId: string;
};

export type FleetUpgradeInstance = FleetCardInstance & {
  slotSource: string;
  slotIndex: number;
};
