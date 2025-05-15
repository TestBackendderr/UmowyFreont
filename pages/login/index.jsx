import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoginForm from "@/components/forms/LoginForm";
import { login } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { user, loading, setAccessToken } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleLogin = async (email, password) => {
    try {
      const { accessToken } = await login(email, password);
      setAccessToken(accessToken);
      router.push("/dashboard");
    } catch (err) {
      setError("Nieprawidłowy email lub hasło.");
    }
  };

  if (loading) {
    return <div className="login-page">Ładowanie...</div>;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Logowanie do CRM</h2>
        <LoginForm onSubmit={handleLogin} error={error} />
      </div>
    </div>
  );
};

export default LoginPage;
