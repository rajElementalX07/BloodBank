import axios from "axios";


//const BASE_URL = "https://calculator.adaptable.app";
const BASE_URL = "https://bloodbank-7iax.onrender.com"
const api = axios.create({
  baseURL: BASE_URL,
});

export default api;