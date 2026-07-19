type NavigationCardProps = {
  title: string;
  description: string;
  available?: boolean;
  onClick?: () => void;
};

function NavigationCard({
  title,
  description,
  available = true,
  onClick,
}: NavigationCardProps) {
  return (
    <button
      className="navigation-card"
      disabled={!available}
      type="button"
      onClick={onClick}
    >
      <span className="navigation-card-title">
        {title}
      </span>

      <span className="navigation-card-description">
        {description}
      </span>

      {!available && (
        <span className="coming-soon">Coming Soon</span>
      )}
    </button>
  );
}

export default NavigationCard;
