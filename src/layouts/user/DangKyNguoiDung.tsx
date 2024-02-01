import { ChangeEvent, useState } from "react";

const DangKyNguoiDung = () => {
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [email, setEmail] = useState("");
    const [hoDem, setHoDen] = useState("");
    const [ten, setTen] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [matKhauLapLai, setMatKhauLapLai] = useState("");
    const [gioiTinh, setGioiTinh] = useState('M');

    const [errorTenDangNhap, setErrorTenDangNhap] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorMatKhau, setErrorMatKhau] = useState('');
    const [errorMatKhauLapLai, setErrorMatKhauLapLai] = useState('');

    const handleSubmit = () => {

    }
    const kiemTraTenDangNhapDaTonTai = async (tenDangNhap: string) => {
        const duongdan = `http://localhost:8080/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${tenDangNhap}`
        try {
            const response = await fetch(duongdan)
            const data = await response.text();
            if (data === "true") {
                setErrorTenDangNhap("Tên đăng nhập đã tồn tại");
                return true
            }
            return false
        } catch (error) {
            console.error("Lỗi khi kiểm tra đăng nhập", error)
            return false
        }


    }
    const kiemTraEmailDaTonTai = async (email: string) => {
        const duongdan = `http://localhost:8080/nguoi-dung/search/existsByEmail?email=${email}`
        try {
            const response = await fetch(duongdan)
            const data = await response.text();
            if (data === "true") {
                setErrorEmail("Email đã tồn tại");
                return true
            }
            return false
        } catch (error) {
            console.error("Lỗi khi kiểm tra đăng nhập", error)
            return false
        }


    }
    const handleTenDangNhapChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTenDangNhap(event.target.value)
        setErrorTenDangNhap("")
        return kiemTraTenDangNhapDaTonTai(event.target.value);
    }
    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
        setErrorEmail("")
        return kiemTraEmailDaTonTai(event.target.value);
    }

    const kiemTraMatKhau= (matKhau: string)=>{
        const reEx = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
        if(!reEx.test(matKhau)){
            setErrorMatKhau("Mật khẩu phải có ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*)");
            
        }else{
            setErrorMatKhau("")
         
        }
    }
    const handleMatKhauChange = (event: ChangeEvent<HTMLInputElement>) => {
       
        setMatKhau(event.target.value)
        setErrorMatKhau("")
        kiemTraMatKhau(event.target.value)
    }
    const kiemTraMatKhauLapLai=(matKhauLapLai: string)=>{
        if(matKhauLapLai!==matKhau){
            setErrorMatKhauLapLai("Mật khẩu không khớp")
          
        }else{
            setErrorMatKhauLapLai("")
           
        }
    }
    const handleMatKhauLapLaiChange = (event: ChangeEvent<HTMLInputElement>) => {
       
        setMatKhauLapLai(event.target.value)
        setErrorMatKhauLapLai("")
       return kiemTraMatKhauLapLai(event.target.value)
    }
    return (
        <div className="container">
            <h2 className="mt-5 text-center">Đăng ký</h2>
            <div className="col-md-6 col-12 mb-3 mx-auto">
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="tenDangNhap" className="form-label">Tên đăng nhập</label>
                    <input className="form-control" type="text" value={tenDangNhap}
                        id="tenDangNhap" onChange={handleTenDangNhapChange}></input>
                    <div style={{ color: "red" }}>{errorTenDangNhap}</div>

                    <label htmlFor="email" className="form-label">Email</label>
                    <input className="form-control" type="email" value={email}
                        id="email" onChange={handleEmailChange}></input>
                    <div style={{ color: "red" }}>{errorEmail}</div>

                    <label htmlFor="matKhau" className="form-label">Mật khẩu</label>
                    <input className="form-control" type="password" value={matKhau}
                        id="matKhau" onChange={handleMatKhauChange}></input>
                    <div style={{ color: "red" }}>{errorMatKhau}</div>

                    <label htmlFor="matKhauLapLai" className="form-label">Nhập lại mật khẩu</label>
                    <input className="form-control" type="password" value={matKhauLapLai}
                        id="matKhauLapLai" onChange={handleMatKhauLapLaiChange}></input>
                    <div style={{ color: "red" }}>{errorMatKhauLapLai}</div>
                </form>
            </div>
        </div>
    )
}
export default DangKyNguoiDung