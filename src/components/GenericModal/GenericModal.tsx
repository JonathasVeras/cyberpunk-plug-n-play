import React, { useEffect } from "react";
import Modal from "react-modal";

interface GenericModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const GenericModal: React.FC<GenericModalProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "black",
      borderRadius: "30px",
    },
  };

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const isDarkModeActive = document.documentElement.classList.contains("dark");

  if (isDarkModeActive) {
    customStyles.content.backgroundColor = "#2d3748";
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Modal"
    >
      {children}
    </Modal>
  );
};

export default GenericModal;
