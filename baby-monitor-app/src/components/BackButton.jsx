import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        background: "#f0f0f0",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        cursor: "pointer",
        marginBottom: "1rem",
        fontSize: "1rem"
      }}
    >
      <FaArrowLeft /> Back
    </button>
  );
}

export default BackButton;
