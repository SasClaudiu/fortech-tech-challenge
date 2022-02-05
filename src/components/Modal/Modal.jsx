import './Modal.scss';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="modal" style={{ opacity: isOpen ? 1 : 0 }}>
        <div className="modal__close" onClick={onClose}>
          <CloseIcon />
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
};
