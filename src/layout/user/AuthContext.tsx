import React, { createContext, useState, useEffect, ReactNode } from "react";
// Thêm thư viện giải mã JWT
import { layAvatar } from "../../api/UserApi";
import { jwtDecode } from "jwt-decode";

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  userAvatar: string | null; // Thêm thuộc tính hình ảnh người dùng
  setUserAvatar: (value: string | null) => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);const [userAvatar, setUserAvatar] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
        setIsLoggedIn(true);

        // Giải mã token để lấy userId
        const decodedToken: any = jwtDecode(token);
        console.log(decodedToken);  // Kiểm tra xem token có đúng và chứa trường `userId`
        
        
        
    } else {
        setIsLoggedIn(false);
    }
}, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userAvatar, setUserAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};
