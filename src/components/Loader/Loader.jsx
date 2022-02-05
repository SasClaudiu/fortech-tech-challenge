import './Loader.scss';

export const Loader = ({ size = 30, visible = true }) => {
  return <div className="loader" style={{ width: size, height: size, opacity: visible ? 1 : 0 }} />;
};
