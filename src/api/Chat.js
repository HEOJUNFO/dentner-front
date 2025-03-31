import axios from '@api/config/axios';

export const getChatRoom = async ({ targetSe, memberSe, params }) => {
  const response = await axios.get(`/api/v1/chat/room/${targetSe}/${memberSe}`, {
    params: {
      ...params,
    },
  });
  return response.data;
};

export const getChatRoomDetail = async ({ roomId, params }) => {
  const response = await axios.get(`/api/v1/chat/room/detail/${roomId}`, {
    params: {
      ...params,
    },
  });
  return response.data;
};

export const postChatRoom = async (body) => {
  try {
    const response = await axios.post(`/api/v1/chat/room`, body);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteChatRoom = async (roomNo) => {
  try {
    const response = await axios.delete(`/api/v1/chat/room/${roomNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
