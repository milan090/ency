import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { X } from "react-feather";
import OutsideClickHandler from "react-outside-click-handler";

type Props = {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
  title: string;
};

export const ModalContainer: React.FC<Props> = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    onClose();
  };

  if (isBrowser) {
    return ReactDOM.createPortal(
      show ? (
        <div className="top-0 left-0 absolute flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          {/* Modal Body */}
          <div className="bg-white flex flex-col w-7/12 rounded-lg">
            <OutsideClickHandler onOutsideClick={onClose}>
              <div className="px-14 pt-8  pb-8">
                {/* Modal Header */}
                <div className="flex justify-center relative mb-6">
                  <h2 className="font-bold text-lg text-center">{title}</h2>
                  <button onClick={handleCloseClick} className="absolute right-0">
                    <X />
                  </button>
                </div>
                {/* Modal Content */}
                <div>{children}</div>
              </div>
            </OutsideClickHandler>
          </div>
        </div>
      ) : (
        <span />
      ),
      document.getElementById("modal-root") as Element
    );
  } else {
    return null;
  }
};
