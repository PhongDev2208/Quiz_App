import { getCookie } from "../helper/cookie";

export const authenReducer = (state = getCookie("token"), action) => {
  switch (action.type) {
    case "AUTHEN":
      return action.isLogin;
      break;

    default:
      return state;
      break;
  }
};
