import { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Icon } from "@/components";

import css from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.stopPropagation();
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleModalClose = (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('js-close-btn')) {
      onClose();
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={clsx(css["modal-overlay"], "js-close-btn", "prevent-select")}
      onClick={handleModalClose}
    >
      <div
        className={clsx(css["modal-content"])}
      >
        <Icon
          className={clsx(css["modal-close-btn"], "js-close-btn")}
          iconName="icon-cross"
        />
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
