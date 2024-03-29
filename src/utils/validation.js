export const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

export const validateUsername = (username) => {
  return username.trim() !== "";
};

export const validatePassword = (password) => {
  return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/.test(
    password
  );
};
