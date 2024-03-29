import React from "react";
import { TextField } from "@mui/material";

const FormInput = ({ label, type, value, onChange, ...props }) => {
  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default FormInput;
