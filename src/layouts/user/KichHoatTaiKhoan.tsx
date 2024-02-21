import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const KichHoatTaiKhoan = () =>{
    const { email } = useParams();
    const { maKichHoat } = useParams();
    const[daKichHoat, setDaKichHoat] = useState(false)
    const [thongBao,  setThongBao]=useState("");
    useEffect(()=>{
        if(email&&maKichHoat){
        thucHienKichHoat();
        }
    }, [])
    const thucHienKichHoat = async() => {
        const duongDan = `http://localhost:8080/tai-khoan/kich-hoat?email=${email}&maKichHoat=${maKichHoat}`
        try {
            const response = await fetch(duongDan);
            if(response.ok){
                setDaKichHoat(true)
            }else{
                setThongBao("Đã xảy ra lỗi trong quá trình kích hoạt")
            }
        } catch (error) {
            console.log("Lỗi khi kích hoạt: " , error);
        }
    }
    return(
        <div>
        <h1>Kích hoạt tài khoản</h1>
        {
        daKichHoat 
        ? (<p> Tài khoản đã kích hoạt thành công, bạn hãy đăng nhập để tiếp tục sử dụng dịch vụ!</p>) 
        : (
            <p>{thongBao}</p>
        )
        }
    </div>
    )
}
export default KichHoatTaiKhoan;