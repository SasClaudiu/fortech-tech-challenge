import './DetailsSection.scss';

export const DetailsSection = ({ label, value, tooltipValue }) => {
  return (
    <div className="details-section">
      <p className="details-section__label">{label}</p>
      <p className="details-section__value">
        <span>{value}</span>
        {tooltipValue && <span className="details-section__tooltip">{tooltipValue}</span>}
      </p>
    </div>
  );
};
