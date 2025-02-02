import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const getFAQs = async (lang = "en") => {
  const response = await axios.get(`${API_URL}/faqs?lang=${lang}`);
  return response.data;
};

export const createFAQ = async (faq) => {
  return await axios.post(`${API_URL}/faqs`, faq);
};

export const updateFAQ = async (id, faq) => {
  return await axios.put(`${API_URL}/faqs/${id}`, faq);
};

export const deleteFAQ = async (id) => {
  return await axios.delete(`${API_URL}/faqs/${id}`);
};
