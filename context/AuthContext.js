import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const AuthContext = createContext({
  user: null,
  loading: true,
  accessToken: null,
  setAccessToken: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const router = useRouter();

  const updateAccessToken = (token) => {
    if (token) {
      localStorage.setItem("accessToken", token);
      setAccessToken(token);
    } else {
      localStorage.removeItem("accessToken");
      setAccessToken(null);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
    } finally {
      updateAccessToken(null);
      router.push("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      updateAccessToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken) return;

      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/auth/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data.user);
      } catch (err) {
        if (err.response?.status === 401) {
          updateAccessToken(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        accessToken,
        setAccessToken: updateAccessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
