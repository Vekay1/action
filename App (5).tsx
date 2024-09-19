import React, { useState } from "react";
import ReactDOM from "react-dom";

// Компонент ConfirmDialog
type ConfirmDialogProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={backdropStyle}>
      <div style={dialogStyle}>
        <p>{message}</p>
        <div style={buttonContainerStyle}>
          <button onClick={onConfirm} style={confirmButtonStyle}>
            Підтвердити
          </button>
          <button onClick={onCancel} style={cancelButtonStyle}>
            Скасувати
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const App: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isActionConfirmed, setIsActionConfirmed] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = () => {
    setIsActionConfirmed(true);
    closeDialog();
  };

  const handleCancel = () => {
    setIsActionConfirmed(false);
    closeDialog();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Діалогове вікно з підтвердженням дії</h1>
      <p>{isActionConfirmed ? "Дію підтверджено!" : "Дію не підтверджено."}</p>
      <button onClick={openDialog} style={openDialogButtonStyle}>
        Виконати дію
      </button>

      <ConfirmDialog
        isOpen={isDialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message="Ви впевнені, що хочете виконати цю дію?"
      />
    </div>
  );
};

// Стилі
const backdropStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const dialogStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  width: "300px",
  textAlign: "center",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
};

const buttonContainerStyle: React.CSSProperties = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "space-around",
};

const confirmButtonStyle: React.CSSProperties = {
  backgroundColor: "#28a745",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: "#dc3545",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const openDialogButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default App;
