import { useState, useContext } from "react";
import axios from "axios";
import "./LoginForm.css";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const { username, setUsername, setIsUserLoggedIn } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Local backend URLs
    const endpoint = showLogin
      ? "https://insta-lite-ai-captions.onrender.com/api/auth/login"
      : "https://insta-lite-ai-captions.onrender.com/api/auth/signup";

    try {
      const response = await axios.post(
        endpoint,
        { username, password },
        { withCredentials: true }
      );

      toast.success(response.data.message);
      setIsUserLoggedIn(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong or Username already exists"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="lft">
        <img
          src="https://www.strongdm.com/hubfs/authentication-methods.jpg"
          alt=""
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login-container">
          <h1>{showLogin ? "Login" : "Sign-up"}</h1>
          <div className="mid-login-page">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter Username"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Password"
              required
            />

            <div className="forget">
              <div className="remember">
                <p>Remember</p>
                <input type="checkbox" />
              </div>
              <div className="for">
                <a href="#">Forget</a>
              </div>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? <div className="loader"></div> : showLogin ? "Login" : "Sign up"}
            </button>

            <button
              type="button"
              style={{
                marginTop: "10px",
                backgroundColor: "#555",
                color: "white",
                padding: "8px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              onClick={() => setShowLogin(!showLogin)}
            >
              {showLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
