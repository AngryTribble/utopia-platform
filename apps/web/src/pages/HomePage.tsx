import AppHeader from "../components/AppHeader";
import NavigationCard from "../components/NavigationCard";
import StatusPanel from "../components/StatusPanel";

export type UtopiaPage =
  | "home"
  | "fleet-builder"
  | "card-library"
  | "missions"
  | "settings";

type HomePageProps = {
  cardCount: number;
  onNavigate: (page: UtopiaPage) => void;
};

function HomePage({
  cardCount,
  onNavigate,
}: HomePageProps) {
  return (
    <>
      <AppHeader />

      <main>
        <section
          className="navigation-grid"
          aria-label="Utopia modules"
        >
          <NavigationCard
            title="Fleet Builder"
            description="Build and manage Star Trek: Attack Wing fleets."
            onClick={() => onNavigate("fleet-builder")}
          />

          <NavigationCard
            title="Card Library"
            description="Browse ships, captains, upgrades, and resources."
            onClick={() => onNavigate("card-library")}
          />

          <NavigationCard
            title="Missions"
            description="Explore scenarios and mission requirements."
            onClick={() => onNavigate("missions")}
          />

          <NavigationCard
            title="Settings"
            description="Manage display and application preferences."
            available={false}
          />
        </section>

        <StatusPanel cardCount={cardCount} />
      </main>
    </>
  );
}

export default HomePage;
