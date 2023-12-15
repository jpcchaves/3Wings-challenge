import axios from "axios";
import { baseURL } from "../../constants/env";

export const axiosInstance = axios.create({
  baseURL,
});
