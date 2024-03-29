export const submitPost = async (formData, token) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/api/posts`,
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("게시글 작성 실패");
  }

  return response.json();
};
