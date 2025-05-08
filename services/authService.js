import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email, password) => {
  const response = await axios.post(
    `${apiUrl}/auth/login`,
    { email, password },
    { withCredentials: true }
  );

  return response.data;
};
