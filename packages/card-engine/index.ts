import type {
  AdmiralDefinition,
  AmbassadorDefinition,
  CaptainDefinition,
  CardBase,
  CardType,
  ShipDefinition,
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
  private readonly cards: readonly CardDefinition[];

  private readonly cardsById = new Map<string, CardDefinition>();
  private readonly cardsByType = new Map<CardType, CardDefinition[]>();
  private readonly cardsByFaction = new Map<string, CardDefinition[]>();
  private readonly cardsBySet = new Map<string, CardDefinition[]>();
  private readonly cardsByName = new Map<string, CardDefinition[]>();

  constructor(cards: CardDefinition[]) {
    this.cards = cards.map((card): CardDefinition => ({
      ...card,
      factions: [...card.factions],
      setIds: [...card.setIds],
      keywords: card.keywords ? [...card.keywords] : undefined,
      ruleIds: card.ruleIds ? [...card.ruleIds] : undefined,
    }));

    for (const card of this.cards) {
      this.addCardToIndexes(card);
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

  getCardsByType(cardType: CardType): readonly CardDefinition[] {
    return this.cardsByType.get(cardType) ?? [];
  }

  getCardsByFaction(faction: string): readonly CardDefinition[] {
    return this.cardsByFaction.get(normalizeKey(faction)) ?? [];
  }

  getCardsBySet(setId: string): readonly CardDefinition[] {
    return this.cardsBySet.get(normalizeKey(setId)) ?? [];
  }

  getCardsByName(name: string): readonly CardDefinition[] {
    return this.cardsByName.get(normalizeKey(name)) ?? [];
  }

  getShips(): readonly ShipDefinition[] {
    return this.getCardsByType("ship") as readonly ShipDefinition[];
  }

  getCaptains(): readonly CaptainDefinition[] {
    return this.getCardsByType(
      "captain"
    ) as readonly CaptainDefinition[];
  }

  getAdmirals(): readonly AdmiralDefinition[] {
    return this.getCardsByType(
      "admiral"
    ) as readonly AdmiralDefinition[];
  }

  getAmbassadors(): readonly AmbassadorDefinition[] {
    return this.getCardsByType(
      "ambassador"
    ) as readonly AmbassadorDefinition[];
  }

  getUpgrades(): readonly UpgradeDefinition[] {
    return this.getCardsByType(
      "upgrade"
    ) as readonly UpgradeDefinition[];
  }

  search(query: CardQuery = {}): CardDefinition[] {
    const searchText = normalizeKey(query.text ?? "");

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
          card.factions
            .map(normalizeKey)
            .includes(normalizeKey(faction))
        )
      ) {
        return false;
      }

      if (
        query.setIds?.length &&
        !query.setIds.some((setId) =>
          card.setIds
            .map(normalizeKey)
            .includes(normalizeKey(setId))
        )
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

  private addCardToIndexes(card: CardDefinition): void {
    if (this.cardsById.has(card.id)) {
      throw new Error(`Duplicate card ID: ${card.id}`);
    }

    this.cardsById.set(card.id, card);

    addToIndex(this.cardsByType, card.cardType, card);
    addToIndex(this.cardsByName, normalizeKey(card.name), card);

    for (const faction of card.factions) {
      addToIndex(
        this.cardsByFaction,
        normalizeKey(faction),
        card
      );
    }

    for (const setId of card.setIds) {
      addToIndex(
        this.cardsBySet,
        normalizeKey(setId),
        card
      );
    }
  }
}

function normalizeKey(value: string): string {
  return value.trim().toLowerCase();
}

function addToIndex<TKey>(
  index: Map<TKey, CardDefinition[]>,
  key: TKey,
  card: CardDefinition
): void {
  const existingCards = index.get(key);

  if (existingCards) {
    existingCards.push(card);
    return;
  }

  index.set(key, [card]);
}
