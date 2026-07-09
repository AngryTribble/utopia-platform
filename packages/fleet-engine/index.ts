import type {
  Fleet,
  FleetCardInstance,
  FleetShip,
  FleetUpgradeInstance,
} from "../shared-types";

function createId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}

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
