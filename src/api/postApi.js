const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchPosts = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("게시글 목록을 불러오는 데 실패했습니다.");
  }
  return response.json();
};

export const fetchPostById = async (postId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("게시글 정보를 불러오는 데 실패했습니다.");
  }
  return response.json();
};

export const createPost = async (formData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/posts`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("게시글 작성에 실패했습니다.");
  }
  return response.json();
};

export const updatePost = async (postId, formData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/posts/${postId}`, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("게시글 수정에 실패했습니다.");
  }
  return response.json();
};

export const deletePost = async (postId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/posts/${postId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("게시글 삭제에 실패했습니다.");
  }
  return response.json();
};
