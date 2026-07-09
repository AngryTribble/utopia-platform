import type {
  CardBase,
  CardType,
  ShipDefinition,
  CaptainDefinition,
  AdmiralDefinition,
  AmbassadorDefinition,
  UpgradeDefinition,
} from "../shared-types";

export type CardDefinition =
  | ShipDefinition
  | CaptainDefinition
  | AdmiralDefinition
  | AmbassadorDefinition
  | UpgradeDefinition
  | CardBase;

export type CardQuery = {
  text?: string;
  cardTypes?: CardType[];
  factions?: string[];
  setIds?: string[];
  unique?: boolean;
};

export class CardEngine {
  private readonly cards: CardDefinition[];
  private readonly cardsById: Map<string, CardDefinition>;

  constructor(cards: CardDefinition[]) {
    this.cards = cards.map((card) => Object.freeze({ ...card }));
    this.cardsById = new Map();

    for (const card of this.cards) {
      if (this.cardsById.has(card.id)) {
        throw new Error(`Duplicate card ID: ${card.id}`);
      }

      this.cardsById.set(card.id, card);
    }
  }

  getAllCards(): readonly CardDefinition[] {
    return this.cards;
  }

  getCard(cardId: string): CardDefinition | undefined {
    return this.cardsById.get(cardId);
  }

  requireCard(cardId: string): CardDefinition {
    const card = this.getCard(cardId);

    if (!card) {
      throw new Error(`Card not found: ${cardId}`);
    }

    return card;
  }

  getCardsByType(cardType: CardType): CardDefinition[] {
    return this.cards.filter((card) => card.cardType === cardType);
  }

  getShips(): ShipDefinition[] {
    return this.cards.filter(
      (card): card is ShipDefinition => card.cardType === "ship"
    );
  }

  getCaptains(): CaptainDefinition[] {
    return this.cards.filter(
      (card): card is CaptainDefinition => card.cardType === "captain"
    );
  }

  search(query: CardQuery = {}): CardDefinition[] {
    const searchText = query.text?.trim().toLowerCase();

    return this.cards.filter((card) => {
      if (
        query.cardTypes?.length &&
        !query.cardTypes.includes(card.cardType)
      ) {
        return false;
      }

      if (
        query.factions?.length &&
        !query.factions.some((faction) =>
          card.factions.includes(faction)
        )
      ) {
        return false;
      }

      if (
        query.setIds?.length &&
        !query.setIds.some((setId) => card.setIds.includes(setId))
      ) {
        return false;
      }

      if (
        query.unique !== undefined &&
        Boolean(card.unique) !== query.unique
      ) {
        return false;
      }

      if (searchText) {
        const searchableText = [
          card.name,
          card.text,
          card.cardType,
          ...card.factions,
          ...card.setIds,
          ...(card.keywords ?? []),
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(searchText)) {
          return false;
        }
      }

      return true;
    });
  }
}
