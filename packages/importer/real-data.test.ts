import { legacyShips } from "../../data/legacy/ships.sample";
import { CardEngine } from "../card-engine";
import { importLegacyShip } from "./index";
import { createImportReport, formatImportReport } from "./report";
import { validateLegacyShip } from "./validation";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

const issues = legacyShips.flatMap(validateLegacyShip);

const shipsWithErrors = new Set(
  issues
    .filter((issue) => issue.severity === "error")
    .map((issue) => issue.cardId)
);

const validLegacyShips = legacyShips.filter(
  (ship) => !shipsWithErrors.has(ship.id)
);

const importedShips = validLegacyShips.map(importLegacyShip);
const cardEngine = new CardEngine(importedShips);

assert(importedShips.length > 0, "No legacy ships were imported.");

assert(
  cardEngine.getShips().length === importedShips.length,
  "Not all imported ships were loaded into the card engine."
);

for (const ship of importedShips) {
  assert(ship.id.startsWith("ship:"), `Invalid ship ID: ${ship.id}`);
  assert(ship.name.trim().length > 0, `Ship ${ship.id} has no name.`);
  assert(Number.isFinite(ship.attack), `Ship ${ship.id} has invalid attack.`);
  assert(Number.isFinite(ship.agility), `Ship ${ship.id} has invalid agility.`);
  assert(Number.isFinite(ship.hull), `Ship ${ship.id} has invalid hull.`);
  assert(Number.isFinite(ship.shields), `Ship ${ship.id} has invalid shields.`);
  assert(Number.isFinite(ship.cost), `Ship ${ship.id} has invalid cost.`);

  for (const slot of ship.upgradeSlots) {
    assert(
      slot.accepts.length > 0,
      `Ship ${ship.id} contains an empty upgrade slot.`
    );
  }
}

const ids = importedShips.map((ship) => ship.id);
const uniqueIds = new Set(ids);

assert(
  ids.length === uniqueIds.size,
  "Duplicate ship IDs were found after import."
);

const report = createImportReport(
  legacyShips.length,
  importedShips.length,
  issues
);

console.log(formatImportReport(report));
console.log(
  `Real legacy import passed for ${importedShips.length} ship(s).`
);
