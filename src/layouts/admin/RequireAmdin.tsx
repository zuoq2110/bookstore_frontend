
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface JwtPayload {
    isAdmin: boolean;
    isStaff: boolean;
    isUser: boolean;
}

const RequireAdmin = (WrappedComponent: React.ComponentType) => {
     const WithAdminCheck: React.FC = (props) => {
        const navigate = useNavigate();
        useEffect(() => {
            const token = localStorage.getItem('token')
            if (!token) {
                navigate('/dang-nhap')
                return
            } else {
                const decodedToken = jwtDecode(token) as JwtPayload
                console.log(decodedToken)
                if (!decodedToken.isAdmin) {
                    navigate("/bao-loi-403")
                    return
                }
            }
        }, [navigate])
        return <WrappedComponent {...props} />
    }
    return WithAdminCheck
}

export default RequireAdmin;