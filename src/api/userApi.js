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
  const jsonResponse = await response.json();
  if (!response.ok) {
    throw new Error(jsonResponse.error?.message || "회원가입 실패");
  }
  return jsonResponse.data;
};
