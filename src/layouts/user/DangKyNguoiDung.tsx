import { Button, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { checkExistEmail, checkExistUsername, checkPassword, checkPhoneNumber, checkRepeatPassword } from "../utils/Validation";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../utils/AuthContext";

const DangKyNguoiDung = () => {
    const { isLoggedIn } = useAuth();
    const navigation = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigation("/");
        }
    });
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [email, setEmail] = useState("");
    const [hoDem, setHoDen] = useState("");
    const [ten, setTen] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [matKhauLapLai, setMatKhauLapLai] = useState("");
    const [gioiTinh, setGioiTinh] = useState('M');
    const [avatar, setAvatar] = useState<File | null>(null)

    const [errorTenDangNhap, setErrorTenDangNhap] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorMatKhau, setErrorMatKhau] = useState('');
    const [errorMatKhauLapLai, setErrorMatKhauLapLai] = useState('');
    const [thongBao, setThongBao] = useState("");
    const [errorSoDienThoai, setErrorSoDienThoai] = useState("")

    const getBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result ? (reader.result as string) : null);
            reader.onerror = (error) => reject(error);
        });
    };
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorTenDangNhap('');
        setErrorEmail('');
        setErrorMatKhau('')
        setErrorMatKhauLapLai('')


        const isTenDangNhapValid = !await checkExistUsername(setErrorTenDangNhap, tenDangNhap)
        const isEmailValid = !await checkExistEmail(setErrorEmail, email)
        const isMatKhauValid = !await checkPassword(setErrorMatKhau, matKhau)
        const isMatKhauLapLaiValid = !await checkRepeatPassword(setErrorMatKhauLapLai, matKhauLapLai, matKhau)

        if (isTenDangNhapValid && isEmailValid && isMatKhauValid && isMatKhauLapLaiValid) {


            try {
                const duongDan = `http://localhost:8080/tai-khoan/dang-ky`
                const response = await toast.promise(fetch(duongDan, {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({
                        tenDangNhap: tenDangNhap,
                        email: email,
                        matKhau: matKhau,
                        hoDem: hoDem,
                        ten: ten,
                        gioiTinh: gioiTinh,
                        soDienThoai: soDienThoai,
                    })

                }),
            { pending: "Đang trong quá trình xử lý..." }
                )
                if (response.ok) {
                    toast.success("Đăng ký thành công, vui lòng kiểm tra email để kích hoạt! ")
                    
                    navigation("/dang-nhap")
                    return true
                } else {
                    toast.error("Đã xảy ra lỗi trong quá trình đăng ký")
                    
                    return false
                }
            } catch (error) {
                toast.error("Đã xảy ra lỗi trong quá trình đăng ký")

                setThongBao("Đã xảy ra lỗi trong quá trình đăng ký")
            }
        }

    }

    const handleTenDangNhapChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTenDangNhap(event.target.value)
        setErrorTenDangNhap("")

    }
    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
        setErrorEmail("")

    }
    const handleSoDienThoaiChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSoDienThoai(event.target.value)
        setErrorSoDienThoai("")

    }


    const handleMatKhauChange = (event: ChangeEvent<HTMLInputElement>) => {

        setMatKhau(event.target.value)
        setErrorMatKhau("")
    }

    const handleMatKhauLapLaiChange = (event: ChangeEvent<HTMLInputElement>) => {

        setMatKhauLapLai(event.target.value)
        setErrorMatKhauLapLai("")
    }
    return (
        <div className="container my-5 py-4 rounded-5 shadow-5 bg-light w-50">
            <h1 className=" text-center">Đăng ký</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="row px-2">
                    <div className="col-lg-6 col-md-12 col-12">
                        <TextField
                            style={{ margin: "12px 0" }}
                            fullWidth
                            error={errorTenDangNhap.length > 0 ? true : false}
                            helperText={errorTenDangNhap}
                            required={true}
                            label='Tên đăng nhập'
                            placeholder='Nhập tên đăng nhập'
                            value={tenDangNhap}
                            onChange={handleTenDangNhapChange}
                            onBlur={(e: any) => {
                                checkExistUsername(setErrorTenDangNhap, e.target.value);
                            }}
                            className='input-field'
                        />

                        <TextField
                            style={{ margin: "12px 0" }}
                            error={errorMatKhau.length > 0 ? true : false}
                            helperText={errorMatKhau}
                            required={true}
                            fullWidth
                            type='password'
                            label='Mật khẩu'
                            placeholder='Nhập mật khẩu'
                            value={matKhau}
                            onChange={handleMatKhauChange}
                            onBlur={(e: any) => {
                                checkPassword(setErrorMatKhau, e.target.value);
                            }}
                            className='input-field'
                        />

                        <TextField
                            style={{ margin: "12px 0" }}
                            error={errorMatKhauLapLai.length > 0 ? true : false}
                            helperText={errorMatKhauLapLai}
                            required={true}
                            fullWidth
                            type='password'
                            label='Xác nhận mật khẩu'
                            placeholder='Nhập lại mật khẩu'
                            value={matKhauLapLai}
                            onChange={handleMatKhauLapLaiChange}
                            onBlur={(e: any) => {
                                checkRepeatPassword(
                                    setErrorMatKhauLapLai,
                                    e.target.value,
                                    matKhau
                                );
                            }}
                            className='input-field'
                        />
                    </div>
                    <div className='col-lg-6 col-md-12 col-12'>
                        <TextField
                            style={{ margin: "12px 0" }}
                            fullWidth
                            helperText={""}
                            required={true}
                            label='Họ đệm'
                            placeholder='Nhập họ đệm'
                            value={hoDem}
                            onChange={(e: any) => {
                                setHoDen(e.target.value);
                            }}
                            className='input-field'
                        />
                        <TextField
                            style={{ margin: "12px 0" }}
                            fullWidth
                            helperText={""}
                            required={true}
                            label='Tên'
                            placeholder='Nhập tên'
                            value={ten}
                            onChange={(e: any) => {
                                setTen(e.target.value);
                            }}
                            className='input-field'
                        />
                        <TextField
                            style={{ margin: "12px 0" }}
                            fullWidth
                            error={errorSoDienThoai.length > 0 ? true : false}
                            helperText={errorSoDienThoai}
                            required={true}
                            label='Số điện thoại'
                            placeholder='Nhập số điện thoại'
                            value={soDienThoai}
                            onChange={handleSoDienThoaiChange}
                            onBlur={(e: any) => {
                                checkPhoneNumber(setErrorSoDienThoai, e.target.value);
                            }}
                            className='input-field'
                        />
                    </div>
                </div>
                <div>
                    <TextField
                        style={{ margin: "12px 0" }}
                        fullWidth
                        error={errorEmail.length > 0 ? true : false}
                        helperText={errorEmail}
                        required={true}
                        label='Email'
                        placeholder='Nhập email'
                        type='email'
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={(e: any) => {
                            checkExistEmail(setErrorEmail, e.target.value);
                        }}
                        className='input-field'
                    />
                </div>
                <div className='d-flex justify-content-end mt-2 px-3'>
                    <span>
                        Bạn có tài khoản rồi? <Link to={"/dang-nhap"}>Đăng nhập</Link>
                    </span>
                </div>
                <div className='text-center my-3'>
                    <Button
                        type='submit'
                        variant='outlined'
                        sx={{ width: "25%", padding: "10px" }}
                    >
                        ĐĂNG KÝ
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default DangKyNguoiDung