type AppHeaderProps = {
  compact?: boolean;
  onHome?: () => void;
};

function AppHeader({
  compact = false,
  onHome,
}: AppHeaderProps) {
  if (compact) {
    return (
      <header className="app-header app-header-compact">
        <button
          className="brand-button"
          type="button"
          onClick={onHome}
        >
          <span className="brand-eyebrow">
            Star Trek: Attack Wing
          </span>

          <span className="brand-title">
            Utopia Platform
          </span>
        </button>
      </header>
    );
  }

  return (
    <header className="hero">
      <p className="eyebrow">Star Trek: Attack Wing</p>

      <h1>Utopia Platform</h1>

      <p className="tagline">
        Build fleets. Explore cards. Command the final frontier.
      </p>
    </header>
  );
}

export default AppHeader;
