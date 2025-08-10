// ✅ Final Clean Code
import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
     const [username, setUsername] = useState("");

  return (
    <UserContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn, username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
