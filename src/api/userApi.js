export const signup = async (formData) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/api/user/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  return response;
};
