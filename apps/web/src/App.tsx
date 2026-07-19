import { CardEngine } from "@utopia/card-engine";
import { sampleCards } from "@utopia/sample-cards";
import "./App.css";

const cardEngine = new CardEngine(sampleCards);

const navigationItems = [
  {
    title: "Fleet Builder",
    description: "Build and manage Star Trek: Attack Wing fleets.",
    available: true,
  },
  {
    title: "Card Library",
    description: "Browse ships, captains, upgrades, and resources.",
    available: true,
  },
  {
    title: "Missions",
    description: "Explore scenarios and mission requirements.",
    available: true,
  },
  {
    title: "Settings",
    description: "Manage display and application preferences.",
    available: false,
  },
];

function App() {
  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">Star Trek: Attack Wing</p>
        <h1>Utopia Platform</h1>
        <p className="tagline">
          Build fleets. Explore cards. Command the final frontier.
        </p>
      </header>

      <main>
        <section className="navigation-grid" aria-label="Utopia modules">
          {navigationItems.map((item) => (
            <button
              className="navigation-card"
              disabled={!item.available}
              key={item.title}
              type="button"
            >
              <span className="navigation-card-title">{item.title}</span>

              <span className="navigation-card-description">
                {item.description}
              </span>

              {!item.available && (
                <span className="coming-soon">Coming Soon</span>
              )}
            </button>
          ))}
        </section>

        <section className="status-panel">
          <div>
            <span className="status-label">Platform Status</span>
            <strong>Operational</strong>
          </div>

          <div>
            <span className="status-label">Cards Loaded</span>
            <strong>{cardEngine.getAllCards().length}</strong>
          </div>

          <div>
            <span className="status-label">Version</span>
            <strong>v0.1.0-alpha</strong>
          </div>
        </section>
      </main>

      <footer>
        Fan-made Star Trek: Attack Wing companion platform.
      </footer>
    </div>
  );
}

export default App;
