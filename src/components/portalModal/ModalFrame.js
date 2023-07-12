// ModalFrame.tsx

import React from "react";
import PortalModal from "./PortalModal";
import classnames from "classnames";
import { IoCloseOutline } from "react-icons/io5";
import "./portalmodal.scss";

const ModalFrame = ({
  children,
  setOnModal,
  onClose,
  classname,
  isDim,
  zindex,
  dimClick,
}) => {
  return (
    <PortalModal>
      <div className={classnames("modal")} style={{ zindex: zindex }}>
        <div className={classnames("", classname)}>
          <div className="">
            {children}
            {onClose && (
              <div className="close" onClick={() => setOnModal(false)}>
                <IoCloseOutline size={30} />
              </div>
            )}
          </div>
        </div>
        {isDim && <div className="dim" onClick={() => (!dimClick ? setOnModal(false) : dimClick())}></div>}
      </div>
    </PortalModal>
  );
};

export default ModalFrame;
