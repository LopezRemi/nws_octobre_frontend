import axios from "axios";

const url = "http://localhost:8000";

export const createLoaners = async (Loaners) => {
    try {
      const { data } = await axios.post(url + "/loaner", Loaners);
      return data;
    } catch (error) {
      throw error;
    }
  };