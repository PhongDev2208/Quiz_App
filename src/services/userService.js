import { get, post } from "../utils/request";

export const login = async (email,password) => {
  const response = await get(`users?email=${email}&password=${[password]}`);
  return response;
};

export const checkExistEmail = async (email) => {
  const response = await get(`users?email=${email}`);
  return response;
};

export const register = async (options) => {
  const response = await post(`users`,options);
  return response;
};
