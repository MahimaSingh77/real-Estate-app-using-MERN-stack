// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );

//   // state change hone ke bad page refresh krne pe update ho rha tha to iske liye hm 
//   const updateUser = (data)=>{
//     setCurrentUser(data);
//   };
//   useEffect(()=>{
//     localStorage.setItem("user", JSON.stringify(currentUser));
//   },[currentUser])


//   return (
//     <AuthContext.Provider value={{currentUser, updateUser}}>{children}</AuthContext.Provider>
// );


// };

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const getStoredUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        return null;
      }
    }
    return null;
  };

  const [currentUser, setCurrentUser] = useState(getStoredUser);

  const updateUser = (data) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
