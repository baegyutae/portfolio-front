const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchCommentsByPostId = async (postId, page = 0) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/posts/${postId}/comments?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("댓글 목록을 불러오는 데 실패했습니다.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const createComment = async (postId, content) => {
  try {
    const response = await fetch(`${BASE_URL}/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) {
      throw new Error("댓글 생성에 실패했습니다.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const updateComment = async (postId, commentId, content) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/posts/${postId}/comments/${commentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      }
    );
    if (!response.ok) {
      throw new Error("댓글 수정에 실패했습니다.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

export const deleteComment = async (postId, commentId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/posts/${postId}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("댓글 삭제에 실패했습니다.");
    }
    return response.json();
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};