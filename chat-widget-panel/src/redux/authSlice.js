import { createSlice } from "@reduxjs/toolkit";

const getFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const value = JSON.parse(localStorage.getItem("user"));
      return value || null;
    }
    return null
  };

const authSlice = createSlice({
    name: "auth",
    initialState:{
        currentUser: getFromLocalStorage()
    },
    reducers: {
        login: (state,action) => {
            state.currentUser = action.payload;
        },
        logout: (state,action) => {
            state.currentUser = null;
        },
        updateUser: (state,action) => {
            if(state.currentUser){
                state.currentUser.email = action.payload.email;
                state.currentUser.name = action.payload.name;

                localStorage.setItem("user",JSON.stringify(state.currentUser))
            }
        }
    }
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;