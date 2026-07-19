import { useMemo, useState } from "react";
import type {
  CardDefinition,
  CardEngine,
} from "@utopia/card-engine";
import AppHeader from "../components/AppHeader";

type CardLibraryPageProps = {
  cardEngine: CardEngine;
  onHome: () => void;
};

function formatCardType(card: CardDefinition): string {
  if (card.cardType === "upgrade" && "upgradeType" in card) {
    return `${card.cardType} · ${card.upgradeType}`;
  }

  return card.cardType;
}

function formatCost(card: CardDefinition): string {
  if (typeof card.cost === "number") {
    return `${card.cost} SP`;
  }

  return String(card.cost);
}

function CardLibraryPage({
  cardEngine,
  onHome,
}: CardLibraryPageProps) {
  const [searchText, setSearchText] = useState("");
  const [cardType, setCardType] = useState("all");

  const allCards = cardEngine.getAllCards();

  const cardTypes = useMemo(
    () =>
      Array.from(
        new Set(allCards.map((card) => card.cardType))
      ).sort(),
    [allCards]
  );

  const visibleCards = useMemo(() => {
    return cardEngine.search({
      text: searchText,
      cardTypes:
        cardType === "all"
          ? undefined
          : [
              cardType as CardDefinition["cardType"],
            ],
    });
  }, [cardEngine, cardType, searchText]);

  return (
    <>
      <AppHeader compact onHome={onHome} />

      <main className="page-content">
        <div className="page-heading">
          <div>
            <p className="section-eyebrow">
              Utopia Database
            </p>

            <h2>Card Library</h2>

            <p>
              Search the cards currently loaded into the
              Utopia Card Engine.
            </p>
          </div>

          <button
            className="secondary-button"
            type="button"
            onClick={onHome}
          >
            Return Home
          </button>
        </div>

        <section
          className="library-toolbar"
          aria-label="Card library filters"
        >
          <label>
            <span>Search Cards</span>

            <input
              type="search"
              placeholder="Name, faction, set, or card text..."
              value={searchText}
              onChange={(event) =>
                setSearchText(event.target.value)
              }
            />
          </label>

          <label>
            <span>Card Type</span>

            <select
              value={cardType}
              onChange={(event) =>
                setCardType(event.target.value)
              }
            >
              <option value="all">All card types</option>

              {cardTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </section>

        <div className="library-summary">
          <strong>{visibleCards.length}</strong>
          <span>
            {visibleCards.length === 1
              ? " card displayed"
              : " cards displayed"}
          </span>
        </div>

        {visibleCards.length > 0 ? (
          <section
            className="card-grid"
            aria-label="Card search results"
          >
            {visibleCards.map((card) => (
              <article className="utopia-card" key={card.id}>
                <div className="utopia-card-header">
                  <div>
                    <span className="card-type">
                      {formatCardType(card)}
                    </span>

                    <h3>{card.name}</h3>
                  </div>

                  <span className="card-cost">
                    {formatCost(card)}
                  </span>
                </div>

                <div className="card-factions">
                  {card.factions.map((faction) => (
                    <span key={faction}>{faction}</span>
                  ))}
                </div>

                <p className="card-text">{card.text}</p>

                <footer className="card-metadata">
                  <span>
                    Set: {card.setIds.join(", ")}
                  </span>

                  {card.unique && (
                    <span className="unique-label">
                      Unique
                    </span>
                  )}
                </footer>
              </article>
            ))}
          </section>
        ) : (
          <section className="empty-state">
            <h3>No cards found</h3>

            <p>
              Try a different search term or card type.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export default CardLibraryPage;
