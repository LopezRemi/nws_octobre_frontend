import axios from "axios";

const url = "http://localhost:8000";

export const createLoans = async (Loans) => {
    try {
      const { data } = await axios.post(url + "/Loans", Loans);
      return data;
    } catch (error) {
      throw error;
    }
  };

