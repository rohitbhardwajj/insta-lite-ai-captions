import Profile from './components/Profile';
import LoginForm from './components/LoginForm';
import { useContext, useEffect } from "react";         
import { UserContext } from "../src/Context/UserContext";
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext);

  useEffect(() => {
    axios.get("https://insta-lite-ai-captions.onrender.com/verify-token", {
      withCredentials: true
    })
    .then(() => setIsUserLoggedIn(true))
    .catch(() => setIsUserLoggedIn(false));
  }, []);

  return (
    <div>
      {isUserLoggedIn ? <Profile /> : <LoginForm />}
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        pauseOnHover 
        draggable 
        theme="colored" 
      />
    </div>
  );
};

export default App;
