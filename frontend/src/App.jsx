import Profile from './components/Profile';
import LoginForm from './components/LoginForm';
import { useContext, useEffect } from "react";         
import { UserContext } from "../src/Context/UserContext";
import axios from 'axios';

const App = () => {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext);

  useEffect(() => {
    axios.get("http://localhost:3000/api/verify-token", {
      withCredentials: true // cookie automatically send
    })
    .then(() => setIsUserLoggedIn(true))
    .catch(() => setIsUserLoggedIn(false));
  }, []);

  return (
    <div>
      {isUserLoggedIn ? <Profile /> : <LoginForm />}
    </div>
  );
};

export default App;
