import { jwtDecode } from "jwt-decode";
import { JwtPayLoad } from "../user/UserAccount";

export function isToken() {
    const token = localStorage.getItem('token');
    if (token) {
       return true;
    }
    return false;
 }

 export function getIdUserByToken(){
   const token = localStorage.getItem('token')
   if(token){
      const decodedToken = jwtDecode(token) as JwtPayLoad
      return decodedToken.id
   }
 }
 export function logout(navigate: any){
   navigate("/login")
   localStorage.removeItem('token')
   localStorage.removeItem('cart')
 }