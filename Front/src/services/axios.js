import axios from "axios";

const instance = axios.create({
  baseURL: "https://animo-protect.herokuapp.com/api/",
  withCredentials: true
});

export default instance;
