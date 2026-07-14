import type { CardEngine } from "../card-engine";
import type { CardBase } from "../shared-types";
import type {
  Fleet,
  FleetCardInstance,
  FleetShip,
  FleetUpgradeInstance,
} from "../shared-types";

function createId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}

export function calculateFleetCost(
  fleet: Fleet,
  cardEngine: CardEngine
  ): FleetCostBreakdown {

export function createFleet(
  name = "New Fleet",
  pointLimit = 100
): Fleet {
  return {
    id: createId("fleet"),
    name,
    pointLimit,
    ships: [],
  };
}

export function addShip(
  fleet: Fleet,
  shipCardId: string
): Fleet {
  const newShip: FleetShip = {
    id: createId("ship"),
    shipCardId,
    upgrades: [],
  };

  return {
    ...fleet,
    ships: [...fleet.ships, newShip],
  };
}

export function removeShip(
  fleet: Fleet,
  fleetShipId: string
): Fleet {
  return {
    ...fleet,
    ships: fleet.ships.filter((ship) => ship.id !== fleetShipId),
  };
}

export function assignCaptain(
  fleet: Fleet,
  fleetShipId: string,
  captainCardId: string
): Fleet {
  const captain: FleetCardInstance = {
    id: createId("captain"),
    cardId: captainCardId,
  };

  return updateFleetShip(fleet, fleetShipId, (ship) => ({
    ...ship,
    captain,
  }));
}

export function removeCaptain(
  fleet: Fleet,
  fleetShipId: string
): Fleet {
  return updateFleetShip(fleet, fleetShipId, (ship) => {
    const { captain, ...remainingShip } = ship;
    return remainingShip;
  });
}

export function addUpgrade(
  fleet: Fleet,
  fleetShipId: string,
  upgradeCardId: string,
  slotSource: string,
  slotIndex: number
): Fleet {
  const upgrade: FleetUpgradeInstance = {
    id: createId("upgrade"),
    cardId: upgradeCardId,
    slotSource,
    slotIndex,
  };

  return updateFleetShip(fleet, fleetShipId, (ship) => ({
    ...ship,
    upgrades: [...ship.upgrades, upgrade],
  }));
}

export function removeUpgrade(
  fleet: Fleet,
  fleetShipId: string,
  fleetUpgradeId: string
): Fleet {
  return updateFleetShip(fleet, fleetShipId, (ship) => ({
    ...ship,
    upgrades: ship.upgrades.filter(
      (upgrade) => upgrade.id !== fleetUpgradeId
    ),
  }));
}

export function setFleetResource(
  fleet: Fleet,
  resourceCardId: string
): Fleet {
  return {
    ...fleet,
    resource: {
      id: createId("resource"),
      cardId: resourceCardId,
    },
  };
}

export function removeFleetResource(
  fleet: Fleet
): Fleet {
  const { resource, ...remainingFleet } = fleet;
  return remainingFleet;
}

function updateFleetShip(
  fleet: Fleet,
  fleetShipId: string,
  updater: (ship: FleetShip) => FleetShip
): Fleet {
  let shipFound = false;

  const ships = fleet.ships.map((ship) => {
    if (ship.id !== fleetShipId) {
      return ship;
    }

    shipFound = true;
    return updater(ship);
  });

  if (!shipFound) {
    throw new Error(`Fleet ship not found: ${fleetShipId}`);
  }

  return {
    ...fleet,
    ships,
  };
}

export type FleetCostBreakdown = {
  ships: Array<{
    fleetShipId: string;
    shipCardId: string;
    shipCost: number;
    captainCost: number;
    admiralCost: number;
    ambassadorCost: number;
    constructionCost: number;
    upgradeCost: number;
    totalCost: number;
  }>;
  resourceCost: number;
  totalCost: number;
};

export function calculateFleetCost(
  fleet: Fleet,
  cardEngine: CardEngine
): FleetCostBreakdown {
  let fleetTotal = 0;

  const ships = fleet.ships.map((fleetShip) => {
    const shipDefinition = cardEngine.requireCard(
      fleetShip.shipCardId
    );

    if (shipDefinition.cardType !== "ship") {
      throw new Error(
        `Fleet ship references a non-ship card: ${fleetShip.shipCardId}`
      );
    }

    const shipCost = getNumericCardCost(shipDefinition);
    const captainCost = fleetShip.captain
      ? getReferencedCardCost(
          fleetShip.captain.cardId,
          cardEngine,
          "captain"
        )
      : 0;

    const admiralCost = fleetShip.admiral
      ? getReferencedCardCost(
          fleetShip.admiral.cardId,
          cardEngine,
          "admiral"
        )
      : 0;

    const ambassadorCost = fleetShip.ambassador
      ? getReferencedCardCost(
          fleetShip.ambassador.cardId,
          cardEngine,
          "ambassador"
        )
      : 0;

    const constructionCost = fleetShip.construction
      ? getReferencedCardCost(
          fleetShip.construction.cardId,
          cardEngine,
          "starship_construction"
        )
      : 0;

    const upgradeCost = fleetShip.upgrades.reduce(
      (total, upgrade) =>
        total +
        getReferencedCardCost(
          upgrade.cardId,
          cardEngine,
          "upgrade"
        ),
      0
    );

    const totalCost =
      shipCost +
      captainCost +
      admiralCost +
      ambassadorCost +
      constructionCost +
      upgradeCost;

    fleetTotal += totalCost;

    return {
      fleetShipId: fleetShip.id,
      shipCardId: fleetShip.shipCardId,
      shipCost,
      captainCost,
      admiralCost,
      ambassadorCost,
      constructionCost,
      upgradeCost,
      totalCost,
    };
  });

  const resourceCost = fleet.resource
    ? getReferencedCardCost(
        fleet.resource.cardId,
        cardEngine,
        "resource"
      )
    : 0;

  fleetTotal += resourceCost;

  return {
    ships,
    resourceCost,
    totalCost: fleetTotal,
  };
}

function getReferencedCardCost(
  cardId: string,
  cardEngine: CardEngine,
  expectedCardType: CardBase["cardType"]
): number {
  const card = cardEngine.requireCard(cardId);

  if (card.cardType !== expectedCardType) {
    throw new Error(
      `Expected ${expectedCardType} card but received ${card.cardType}: ${cardId}`
    );
  }

  return getNumericCardCost(card);
}

function getNumericCardCost(card: CardBase): number {
  if (card.cost === "variable") {
    throw new Error(
      `Variable card cost is not yet supported: ${card.id}`
    );
  }

  return card.cost;
}
