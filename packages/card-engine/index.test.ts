import { sampleCards } from "../../data/sample-cards";
import { CardEngine } from "./index";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

const cardEngine = new CardEngine(sampleCards);

assert(
  cardEngine.getAllCards().length === 4,
  "Card engine did not load all sample cards."
);

const enterprise = cardEngine.requireCard("ship:S001");

assert(
  enterprise.name === "U.S.S. Enterprise",
  "Card lookup returned the wrong card."
);

assert(
  cardEngine.getShips().length === 1,
  "Ship filtering returned the wrong result."
);

assert(
  cardEngine.getCaptains().length === 1,
  "Captain filtering returned the wrong result."
);

const federationCards = cardEngine.search({
  factions: ["federation"],
});

assert(
  federationCards.length === 4,
  "Faction search returned the wrong number of cards."
);

const weaponCards = cardEngine.search({
  cardTypes: ["upgrade"],
  text: "torpedoes",
});

assert(
  weaponCards.length === 1 &&
    weaponCards[0].id === "upgrade:U001",
  "Text search did not find Photon Torpedoes."
);

const uniqueCards = cardEngine.search({
  unique: true,
});

assert(
  uniqueCards.length === 3,
  "Unique-card search returned the wrong number of cards."
);

const federationIndex = cardEngine.getCardsByFaction("Federation");

assert(
  federationIndex.length === 4,
  "Faction index returned the wrong number of cards."
);

const starterSet = cardEngine.getCardsBySet("STARTER");

assert(
  starterSet.length === 4,
  "Set index returned the wrong number of cards."
);

const enterpriseCards = cardEngine.getCardsByName(
  "U.S.S. Enterprise"
);

assert(
  enterpriseCards.length === 1 &&
    enterpriseCards[0].id === "ship:S001",
  "Name index did not find the Enterprise."
);

assert(
  cardEngine.getUpgrades().length === 2,
  "Upgrade index returned the wrong number of cards."
);

console.log("Card engine tests passed.");
