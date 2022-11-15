import axios from "axios";

const url = "https://remi.iamroot.fr:8000";

export const createLoaners = async (loaners) => {
    try {
      const { data } = await axios.post(url + "/loaner", loaners);
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const getLoanerByMaterial = async (loanData) => {
    try {
      const { data } = await axios.post(url + "/loaner/getLoanerByMaterial", loanData);
      return data;
    } catch (error) {
      throw error;
    }
  };  

  export const deleteLoans = async (id) => {
    try {
      const { data } = await axios.delete(url + `/loaner/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  };  