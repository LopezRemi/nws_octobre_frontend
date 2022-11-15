import axios from "axios";

const url = "https://remi.iamroot.fr/api";

export const createLoans = async (Loans) => {
    try {
      const { data } = await axios.post(url + "/Loans", Loans);
      return data;
    } catch (error) {
      throw error;
    }
  };

