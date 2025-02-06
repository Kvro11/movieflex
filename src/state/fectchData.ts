import axios from "axios";

const API_KEY = "c123661e7cffc8d169fb2486c2601473";
const API_BASE_URL = "https://api.themoviedb.org/3";

export const fetchData = async (endPoint: string, extraParams: {}) => {
  const params: Record<string, any> = {
    api_key: API_KEY,
    language: "en",
    page: 1,
    ...extraParams,
  };
  try {
    const response = await axios.get(`${API_BASE_URL}${endPoint}`, { params });
    return response.data.results;
  } catch (error: any) {
    throw error.response?.data || "Something went wrong";
  }
};
