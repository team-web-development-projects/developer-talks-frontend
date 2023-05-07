import { Children } from 'react';
import './AlertModal.scss';
const AlertModal = ({ setModalOpen, Children }) => {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="alertMo">
      <button onClick={closeModal}>X</button>
      <p>{Children}</p>
    </div>
  );
};
export default AlertModal;
