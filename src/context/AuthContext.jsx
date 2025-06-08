import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingUser, setLoadingUser] = useState(true); // NUEVO
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = JSON.parse(localStorage.getItem("user")); // importante

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
    setLoadingUser(false); // NUEVO
  }, []);

  useEffect(() => {
    console.log("Usuario cargado:", user);
  }, [user]);

  const login = (username, password) => {
    if (username === "admin@1" && password === "1234") {
      const tokenFalso = "dG9rZW5GYWxzbzEyMzQ=";
      const userObj = { email: username };

      setToken(tokenFalso);
      setUser(userObj);
      localStorage.setItem("token", tokenFalso);
      localStorage.setItem("user", JSON.stringify(userObj));
      return true;
    }
    return false;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sucess = login(email, password);
    console.log("Login success:", sucess);
    if (sucess) {
      navigate("/");
    } else {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, handleSubmit, error, setEmail, setPassword, loadingUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);