import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const RequireUser= (WrappedComponent: React.ComponentType)=>{
    const WithUserCheck : React.FC =(props) =>{
        const navigate = useNavigate()
        useEffect(()=>{
            
            const token = localStorage.getItem('token')
            if(!token){
                navigate('/dang-nhap')
                return
            }
        },[navigate])
        return <WrappedComponent {...props}/>
    }
    return WithUserCheck
}
export default RequireUser