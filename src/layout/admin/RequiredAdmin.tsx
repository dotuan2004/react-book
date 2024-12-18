import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface JwtPayload {
    isAdmin: boolean;
    isStaff: boolean;
    isUser: boolean;
}

const RequireAdmin = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const WithAdminCheck: React.FC<P> = (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const token = localStorage.getItem('token');
            console.log("Token:", token);  // Fixed the console log here
            
            // In case the user is not logged in
            if (!token) {
                navigate("/dangnhap");
                return;
            } else {
                // Decode the token
                const decodedToken = jwtDecode(token) as JwtPayload;  // Fixed the variable name here
                console.log(decodedToken);
                
                // Extract admin status
                const isAdmin = decodedToken.isAdmin;

                // If the user is not an admin
                if (!isAdmin) {
                    navigate("/bao-loi-403");
                    return;
                }
            }
        }, [navigate]);

        return <WrappedComponent {...props} />;
    }

    return WithAdminCheck;
}

export default RequireAdmin;
