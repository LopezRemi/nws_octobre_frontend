import axios from "axios";

const url = "http://localhost:3001";

export const fetchAllMaterials = async () => {
try {
    const { data } = await axios.get(url + "/materials");
    return data;
} catch (error) {
    throw error;
}
};