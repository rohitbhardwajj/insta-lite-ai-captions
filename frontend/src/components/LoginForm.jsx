import { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = () => {
   const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
const handleLogin = async () => {
  try {
    const response = await axios.post("http://localhost:3000/api/auth/signup", {
      username: username,
      password: password
    });


    alert(response.data.message)
    console.log("Response from backend:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
};

  return (
    <div className='login'>
       <div className="lft">
      <img src="https://www.strongdm.com/hubfs/authentication-methods.jpg" alt="" />
    </div>
    <form onSubmit={(e) => {
  e.preventDefault();
  handleLogin();
}}>

    <div className="login-container">
      <h1>Sign-up</h1>
      <div className="mid-login-page">
      <input value={username} onChange={(e)=>{setUsername(e.target.value)}} type="text" id="username" placeholder="Enter Username" />
     <input value={password} onChange={(e)=>{setPassword(e.target.value)}}  type="password" id="password" placeholder="Enter Password" />

       <div className="forget">
        <div className="remember">
          <p>Remember</p>
          <input  type="checkbox" />
        </div>
        <div className="for">
         <a href="#">Forget</a>
        </div>
        
       </div>
       <button>Complete</button>
       </div>
    </div>
</form>
   
    </div>
  );
};

export default LoginForm;
