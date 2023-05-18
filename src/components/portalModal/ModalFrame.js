// ModalFrame.tsx

import React from "react";
import PortalModal from "./PortalModal";
import classnames from "classnames";
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
      <div className={classnames("modal")} style={{ zIndex: zindex }}>
        <div className={classnames("", classname)}>
          <div className="">
            {children}
            {onClose && (
              <button className="close" onClick={() => setOnModal(false)}>
                X
              </button>
            )}
          </div>
        </div>
        {isDim && (
          <div
            className="dim"
            onClick={() => (!dimClick ? setOnModal(false) : dimClick())}
          ></div>
        )}
      </div>
    </PortalModal>
  );
};

export default ModalFrame;
