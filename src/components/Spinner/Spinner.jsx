import './Spinner.scss';

export const Spinner = ({ size = 30, visible = true }) => {
  return (
    <div className="spinner" style={{ width: size, height: size, opacity: visible ? 1 : 0 }}>
      <div className="spinner-dot" />
      <div className="spinner-dot" />
      <div className="spinner-dot" />
      <div className="spinner-dot" />
      <div className="spinner-dot" />
      <div className="spinner-dot" />
    </div>
  );
};
