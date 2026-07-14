import { sampleCards } from "../../data/sample-cards";
import { CardEngine } from "../card-engine";
import {
  addShip,
  addUpgrade,
  assignCaptain,
  createFleet,
  removeCaptain,
  removeFleetResource,
  removeShip,
  removeUpgrade,
  setFleetResource,
} from "./index";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

const emptyFleet = createFleet("Test Fleet", 100);

assert(emptyFleet.name === "Test Fleet", "Fleet name was not set.");
assert(emptyFleet.pointLimit === 100, "Point limit was not set.");
assert(emptyFleet.ships.length === 0, "New fleet should have no ships.");

const fleetWithShip = addShip(emptyFleet, "ship:S001");

assert(fleetWithShip.ships.length === 1, "Ship was not added.");
assert(
  fleetWithShip.ships[0].shipCardId === "ship:S001",
  "Incorrect ship card ID."
);

const fleetShipId = fleetWithShip.ships[0].id;

const fleetWithCaptain = assignCaptain(
  fleetWithShip,
  fleetShipId,
  "captain:C001"
);

assert(
  fleetWithCaptain.ships[0].captain?.cardId === "captain:C001",
  "Captain was not assigned."
);

const fleetWithUpgrade = addUpgrade(
  fleetWithCaptain,
  fleetShipId,
  "upgrade:U001",
  "ship",
  0
);

assert(
  fleetWithUpgrade.ships[0].upgrades.length === 1,
  "Upgrade was not added."
);

const fleetUpgradeId = fleetWithUpgrade.ships[0].upgrades[0].id;

const fleetWithoutUpgrade = removeUpgrade(
  fleetWithUpgrade,
  fleetShipId,
  fleetUpgradeId
);

assert(
  fleetWithoutUpgrade.ships[0].upgrades.length === 0,
  "Upgrade was not removed."
);

const fleetWithResource = setFleetResource(
  fleetWithoutUpgrade,
  "resource:R001"
);

assert(
  fleetWithResource.resource?.cardId === "resource:R001",
  "Resource was not assigned."
);

const fleetWithoutResource = removeFleetResource(fleetWithResource);

assert(
  fleetWithoutResource.resource === undefined,
  "Resource was not removed."
);

const fleetWithoutCaptain = removeCaptain(
  fleetWithoutResource,
  fleetShipId
);

assert(
  fleetWithoutCaptain.ships[0].captain === undefined,
  "Captain was not removed."
);

const finalFleet = removeShip(fleetWithoutCaptain, fleetShipId);

assert(finalFleet.ships.length === 0, "Ship was not removed.");

const cardEngine = new CardEngine(sampleCards);

let costTestFleet = createFleet("Cost Test", 100);
costTestFleet = addShip(costTestFleet, "ship:S001");

const costTestShipId = costTestFleet.ships[0].id;

costTestFleet = assignCaptain(
  costTestFleet,
  costTestShipId,
  "captain:C001"
);

costTestFleet = addUpgrade(
  costTestFleet,
  costTestShipId,
  "upgrade:U001",
  "ship",
  0
);

costTestFleet = addUpgrade(
  costTestFleet,
  costTestShipId,
  "upgrade:U002",
  "ship",
  1
);

const costBreakdown = calculateFleetCost(
  costTestFleet,
  cardEngine
);

assert(
  costBreakdown.ships[0].shipCost === 28,
  "Ship cost was calculated incorrectly."
);

assert(
  costBreakdown.ships[0].captainCost === 6,
  "Captain cost was calculated incorrectly."
);

assert(
  costBreakdown.ships[0].upgradeCost === 10,
  "Upgrade costs were calculated incorrectly."
);

assert(
  costBreakdown.totalCost === 44,
  "Fleet total cost was calculated incorrectly."
);

console.log("Fleet engine tests passed.");
