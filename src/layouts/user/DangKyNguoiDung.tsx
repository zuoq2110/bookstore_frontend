import { ChangeEvent, FormEvent, useState } from "react";

const DangKyNguoiDung =  () => {
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [email, setEmail] = useState("");
    const [hoDem, setHoDen] = useState("");
    const [ten, setTen] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [matKhauLapLai, setMatKhauLapLai] = useState("");
    const [gioiTinh, setGioiTinh] = useState('M');
    const [avatar, setAvatar] = useState<File|null>(null)

    const [errorTenDangNhap, setErrorTenDangNhap] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorMatKhau, setErrorMatKhau] = useState('');
    const [errorMatKhauLapLai, setErrorMatKhauLapLai] = useState('');
    const [thongBao, setThongBao] = useState("");

    const getBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result ? (reader.result as string) : null);
            reader.onerror = (error) => reject(error);
        });
    };
    const handleSubmit = async (e: FormEvent) => {
        setErrorTenDangNhap('');
        setErrorEmail('');
        setErrorMatKhau('')
        setErrorMatKhauLapLai('')
        e.preventDefault();

        const isTenDangNhapValid =  !await kiemTraTenDangNhapDaTonTai(tenDangNhap)
        const  isEmailValid = !await kiemTraEmailDaTonTai(email)
        const isMatKhauValid = !await kiemTraMatKhau(matKhau)
        const isMatKhauLapLaiValid = !await kiemTraMatKhauLapLai(matKhauLapLai)
        
        if(isTenDangNhapValid&& isEmailValid&& isMatKhauValid && isMatKhauLapLaiValid){
            const base64Avatar = avatar ? await getBase64(avatar) : null;
            console.log("avatar: " + base64Avatar);
            try {
                const duongDan =`http://localhost:8080/tai-khoan/dang-ky`
                const response = await fetch(duongDan, {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({
                        tenDangNhap: tenDangNhap,
                        email: email,
                        matKhau: matKhau,
                        hoDem: hoDem,
                        ten: ten,
                        gioiTinh: gioiTinh,
                        soDienThoai: soDienThoai,
                        avatar: base64Avatar
                    })
                })
                if(response.ok){
                    setThongBao("Đăng ký thành công, vui lòng kiểm tra email để kích hoạt!")
                }else{
                   
                    setThongBao("Đã xảy ra lỗi trong quá trình đăng ký")
                }
            } catch (error) {
                setThongBao("Đã xảy ra lỗi trong quá trình đăng ký")
            }
        }

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
            return true;
        }else{
            setErrorMatKhau("")
         return false
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
          return true;
        }else{
            setErrorMatKhauLapLai("")
           return false
        }
    }
    const handleMatKhauLapLaiChange = (event: ChangeEvent<HTMLInputElement>) => {
       
        setMatKhauLapLai(event.target.value)
        setErrorMatKhauLapLai("")
       return kiemTraMatKhauLapLai(event.target.value)
    }
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setAvatar(file);
        }
    };
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
                    <div className="mb-3">
                        <label htmlFor="hoDem" className="form-label">Họ đệm</label>
                        <input
                            type="text"
                            id="hoDem"
                            className="form-control"
                            value={hoDem}
                            onChange={(e) => setHoDen(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ten" className="form-label">Tên</label>
                        <input
                            type="text"
                            id="ten"
                            className="form-control"
                            value={ten}
                            onChange={(e) => setTen(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="soDienThoai" className="form-label">Số điện thoại</label>
                        <input
                            type="text"
                            id="soDienThoai"
                            className="form-control"
                            value={soDienThoai}
                            onChange={(e) => setSoDienThoai(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gioiTinh" className="form-label">Giới tính</label>
                        <input
                            type="text"
                            id="gioiTinh"
                            className="form-control"
                            value={gioiTinh}
                            onChange={(e) => setGioiTinh(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="avatar" className="form-label">Avatar</label>
                        <input
                            type="file"
                            id="avatar"
                            className="form-control"
                            accept="images/*"
                            onChange={handleAvatarChange}
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Đăng Ký</button>
                        <div style={{ color: "green" }}>{thongBao}</div>

                    </div>
                </form>
            </div>
        </div>
    )
}
export default DangKyNguoiDung