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
   navigate("/dang-nhap")
   localStorage.removeItem('token')
   localStorage.removeItem('cart')
 }

 export function getUsernameByToken() {
   const token = localStorage.getItem('token');
   if (token) {
      return jwtDecode(token).sub;
   }
}
export function isTokenExpired(token: string) {
   const decodedToken = jwtDecode(token);

   if (!decodedToken.exp) {
      // Token không có thời gian hết hạn (exp)
      return false;
   }

   const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây

   return currentTime < decodedToken.exp;
}