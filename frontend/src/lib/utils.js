import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetcher = async (url, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    credentials: 'include', // Important for sending cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.status = response.status;
    error.info = await response.json().catch(() => ({}));
    throw error;
  }

  return response.json();
};

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});