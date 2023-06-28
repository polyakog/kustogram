import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const instanceKusto = axios.create({
  baseURL: process.env.NEXT_PUBLIC_KUSTO_API_URL,
});