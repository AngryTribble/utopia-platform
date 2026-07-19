import { useState } from "react";
import { CardEngine } from "@utopia/card-engine";
import { sampleCards } from "@utopia/sample-cards";
import CardLibraryPage from "./pages/CardLibraryPage";
import HomePage, {
  type UtopiaPage,
} from "./pages/HomePage";
import AppHeader from "./components/AppHeader";
import "./App.css";

const cardEngine = new CardEngine(sampleCards);

function PlaceholderPage({
  title,
  description,
  onHome,
}: {
  title: string;
  description: string;
  onHome: () => void;
}) {
  return (
    <>
      <AppHeader compact onHome={onHome} />

      <main className="page-content">
        <div className="page-heading">
          <div>
            <p className="section-eyebrow">
              Project Genesis
            </p>

            <h2>{title}</h2>

            <p>{description}</p>
          </div>

          <button
            className="secondary-button"
            type="button"
            onClick={onHome}
          >
            Return Home
          </button>
        </div>

        <section className="empty-state">
          <h3>Module framework established</h3>

          <p>
            This page is ready for its feature
            implementation.
          </p>
        </section>
      </main>
    </>
  );
}

function App() {
  const [currentPage, setCurrentPage] =
    useState<UtopiaPage>("home");

  const returnHome = () => setCurrentPage("home");

  const renderPage = () => {
    switch (currentPage) {
      case "card-library":
        return (
          <CardLibraryPage
            cardEngine={cardEngine}
            onHome={returnHome}
          />
        );

      case "fleet-builder":
        return (
          <PlaceholderPage
            title="Fleet Builder"
            description="Build and validate fleets using the Utopia Fleet Engine."
            onHome={returnHome}
          />
        );

      case "missions":
        return (
          <PlaceholderPage
            title="Missions"
            description="Explore scenarios, objectives, and mission requirements."
            onHome={returnHome}
          />
        );

      case "settings":
        return (
          <PlaceholderPage
            title="Settings"
            description="Manage Utopia Platform preferences."
            onHome={returnHome}
          />
        );

      case "home":
      default:
        return (
          <HomePage
            cardCount={cardEngine.getAllCards().length}
            onNavigate={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className="app-shell">
      {renderPage()}

      <footer className="platform-footer">
        Fan-made Star Trek: Attack Wing companion platform.
      </footer>
    </div>
  );
}

export default App;
