import { Api } from "../helper";

export const chat = {
  getAllChats: async function ({auth}) {
    try {
      const response = await Api.get({url:`/api/v1/chat`,auth});
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
  getChat: async function ({id,auth}) {
    try {
      const response = await Api.get({url:`/api/v1/chat/${id}`,auth});
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
};
