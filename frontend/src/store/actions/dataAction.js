import axios from "axios";


export const login = (payload) => async (dispatch) => {
  try {
   dispatch({
    type:"LOGIN_USER",
    payload,
   })
  } catch (err) {
    console.log("error " + err);
    return err;
  }
};

export const logout = (payload) => async (dispatch) => {
  try {
   dispatch({
    type:"LOGOUT_USER",
    payload,
   })
  } catch (err) {
    console.log("error " + err);
    return err;
  }
};


export const userok = (payload) => async (dispatch) => {
  try {
   dispatch({
    type:"is_user",
    payload,
   })
  } catch (err) {
    console.log("error " + err);
    return err;
  }
};

