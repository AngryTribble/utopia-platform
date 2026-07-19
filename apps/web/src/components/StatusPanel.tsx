type StatusPanelProps = {
  cardCount: number;
};

function StatusPanel({ cardCount }: StatusPanelProps) {
  return (
    <section
      className="status-panel"
      aria-label="Platform status"
    >
      <div>
        <span className="status-label">
          Platform Status
        </span>

        <strong>Operational</strong>
      </div>

      <div>
        <span className="status-label">
          Cards Loaded
        </span>

        <strong>{cardCount}</strong>
      </div>

      <div>
        <span className="status-label">
          Version
        </span>

        <strong>v0.2.0-alpha</strong>
      </div>
    </section>
  );
}

export default StatusPanel;
