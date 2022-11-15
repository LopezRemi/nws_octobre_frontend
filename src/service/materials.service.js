import axios from "axios";

const url = "https://remi.iamroot.fr/api";

export const fetchAllMaterials = async () => {
  try {
    const { data } = await axios.get(url + "/materials");
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteMaterial = async (id) => {
  try {
    const { data } = await axios.delete(url + `/materials/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};


export const createMaterial = async (materials) => {
    try {
      const { data } = await axios.post(url + "/materials", materials);
      return data;
    } catch (error) {
      throw error;
    }
  };


  export const updateMaterial = async (toSend) => {
    try {
      const { data } = await axios.patch(url + `/materials/${toSend.id}`, toSend);
      return data;
    } catch (error) {
      throw error;
    }
  };