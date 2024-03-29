export const fetchPosts = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/api/posts`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
