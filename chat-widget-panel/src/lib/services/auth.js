import { Api } from "../helper";

export const auth = {
  register: async function ({data,auth}) {
    try {
      const response = await Api.post({url:`/api/v1/auth/register`,data,auth});
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
  login: async function ({data,auth}) {
    try {
      const response = await Api.post({url:`/api/v1/auth/login`,data,auth});
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
};
