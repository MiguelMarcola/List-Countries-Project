import axios from "axios";

export const api = axios.create({
  baseURL: 'https://project-arb-backend-production.up.railway.app/api/v1'
})