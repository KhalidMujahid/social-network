import axios from "axios";

const apiCall = axios.create({
  baseURL: "http://localhost:3001",
});

export default apiCall;
