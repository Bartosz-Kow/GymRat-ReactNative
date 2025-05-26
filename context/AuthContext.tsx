import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  userId: null,
  setUserId: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserIdState] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("userId").then((id) => {
      if (id) setUserIdState(id);
    });
  }, []);

  const setUserId = (id: string | null) => {
    if (id) {
      AsyncStorage.setItem("userId", id);
    } else {
      AsyncStorage.removeItem("userId");
    }
    setUserIdState(id);
  };

  const logout = () => setUserId(null);

  return (
    <AuthContext.Provider value={{ userId, setUserId, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
