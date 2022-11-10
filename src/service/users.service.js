import axios from "axios";

const url = "http://localhost:3000";

export const fetchAllUsers = async () => {
  try {
    const { data } = await axios.get(url + "/users");
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserById = async (id) => {
  try {
    const { data } = await axios.get(url + `/users/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const { data } = await axios.post(url + "/users/", user);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (toSend) => {
  try {
    const { data } = await axios.put(url + `/users/${toSend.id}`, toSend.user);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await axios.delete(url + `/users/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
