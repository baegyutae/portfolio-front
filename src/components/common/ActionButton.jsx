import React from "react";
import { Button } from "@mui/material";

const ActionButton = ({ color, variant, label, onClick, ...props }) => {
  return (
    <Button color={color} variant={variant} onClick={onClick} {...props}>
      {label}
    </Button>
  );
};

export default ActionButton;
