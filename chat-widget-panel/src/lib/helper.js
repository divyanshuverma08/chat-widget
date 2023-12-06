import axios from "axios";
import { environment } from "./environment";

let headers = {
  "Content-Type": "application/json",
  "api-key": `${environment.API_KEY}`,
};

export const Api = {
  post: async function ({ url, data, auth }) {
    if (auth) {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      headers = { ...headers, authorization: `Bearer ${token}` };
    }

    try {
      const response = await axios.post(environment.SERVER_URL + url, data, {
        headers: headers,
      });
      return response;
    } catch (error) {
      if (auth) {
        if (error.response.data.status === 401) {
          if (typeof window !== "undefined") {
            localStorage.setItem("user", null);
            window.location.href = "/login";
          }
        }
      }
      throw error;
    }
  },
  get: async function ({ url, auth }) {
    if (auth) {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      headers = { ...headers, authorization: `Bearer ${token}` };
    }
    
    try {
      const response = await axios.get(environment.SERVER_URL + url, {
        headers: headers,
      });
      return response;
    } catch (error) {
      if (auth) {
        if (error.response.data.status === 401) {
          if (typeof window !== "undefined") {
            localStorage.setItem("user", null);
            window.location.href = "/login";
          }
        }
      }
      throw error;
    }
  },
  put: async function ({ url, data, auth }) {
    if (auth) {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      headers = { ...headers, authorization: `Bearer ${token}` };
    }
    
    try {
      const response = await axios.put(environment.SERVER_URL + url, data, {
        headers: headers,
      });
      return response;
    } catch (error) {
      if (auth) {
        if (error.response.data.status === 401) {
          if (typeof window !== "undefined") {
            localStorage.setItem("user", null);
            window.location.href = "/login";
          }
        }
      }
      throw error;
    }
  },
  delete: async function ({ url, auth }) {
    if (auth) {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      headers = { ...headers, authorization: `Bearer ${token}` };
    }
    
    try {
      const response = await axios.delete(environment.SERVER_URL + url, {
        headers: headers,
      });
      return response;
    } catch (error) {
      if (auth) {
        if (error.response.data.status === 401) {
          if (typeof window !== "undefined") {
            localStorage.setItem("user", null);
            window.location.href = "/login";
          }
        }
      }
      throw error;
    }
  },
};
