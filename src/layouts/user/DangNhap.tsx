import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GioHangModel from "../../models/GioHangModel";
import { jwtDecode } from "jwt-decode";
import { JwtPayLoad } from "./UserAccount";
import { layTatCaGioHangByMaNguoiDung } from "../../api/GioHangAPI";
import { useGioHangItem } from "../utils/GioHangContext";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";
import { useAuth } from "../utils/AuthContext";

const DangNhap = () => {
    const { isLoggedIn, setLoggedIn } = useAuth();
    const { setTongGioHang, setGioHangList } = useGioHangItem()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [thongBao, setThongBao] = useState("")
    const navigate = useNavigate()
    if (isLoggedIn) {
        navigate("/")
    }
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const loginRequest = {
            username: username,
            password: password
        };
        toast.promise(fetch('http://localhost:8080/tai-khoan/dang-nhap', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginRequest)
        }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json()

                } else {
                    setThongBao("Sai tên đăng nhập hoặc mật khẩu")
                }
            }).then(
                async (data) => {
                    const { jwt } = data;
                    const decodedToken = jwtDecode(jwt) as JwtPayLoad;
                    if (decodedToken.enabled === false) {
                        toast.warning("Tài khoản của bạn chưa kích hoạt. Vui lòng kiểm tra email để kích hoạt!");
                        return;
                    }
                    toast.success("Đăng nhập thành công")
                    localStorage.setItem('token', jwt)
                    setLoggedIn(true)

                    const gioHangData = localStorage.getItem("cart")
                    let gioHang: GioHangModel[] = gioHangData ? JSON.parse(gioHangData) : []
                    if (gioHang.length !== 0) {
                        gioHang = gioHang.map(c => ({ ...c, maNguoiDung: decodedToken.id }))
                        const duongDan = "http://localhost:8080/gio-hang/them"
                        fetch(duongDan, {
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${jwt}`,
                                "content-type": "application/json",
                            },
                            body: JSON.stringify(gioHang),
                        })
                            .then(() => {
                                async function layGioHang() {
                                    const response = await layTatCaGioHangByMaNguoiDung(decodedToken.id);
                                    localStorage.removeItem("cart")
                                    gioHang = response
                                    localStorage.setItem("cart", JSON.stringify(gioHang));
                                    setTongGioHang(gioHang.length)
                                    setGioHangList(gioHang)
                                    console.log(response)
                                }
                                layGioHang();
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    } else {
                        const response = await layTatCaGioHangByMaNguoiDung(decodedToken.id);
                        localStorage.removeItem("cart")
                        gioHang = response
                        localStorage.setItem("cart", JSON.stringify(gioHang));
                        setTongGioHang(gioHang.length)
                        setGioHangList(gioHang)
                    }
                    if (decodedToken.isAdmin) {
                        navigate("/admin/dashboard")
                    } else
                        navigate("/")

                }

            ).catch((error) => {
                console.log(error);
                toast.error("Tên đăng nhập hoặc mật khẩu không chính xác")

            }),
            { pending: "Đang trong quá trình xử lý" }
        )
    }



    return (
        <div className="container my-5 py-4 rounded-5 shadow-5 bg-light" 
        style={{ width: "450px" }}>
            <h1 className=" text-center">Đăng Nhập</h1>
            <form onSubmit={handleSubmit} className="form mt-3" style={{ padding: "0 20px" }}>

                <TextField
                    fullWidth
                    required={true}
                    id='outlined-required'
                    label='Tên đăng nhập'
                    placeholder='Nhập tên đăng nhập'
                    value={username}
                    onChange={(e: any) => setUsername(e.target.value)}
                    className='mb-3'
                />
                <TextField
                    fullWidth
                    required={true}
                    type='password'
                    id='outlined-required'
                    label='Mật khẩu'
                    placeholder='Nhập mật khẩu'
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    className='mb-3'
                />
                {thongBao && <div style={{ color: 'red' }}>{thongBao}</div>}
                <div className='d-flex justify-content-end mt-2 px-3'>
                    <span>
                        Bạn chưa có tài khoản? <Link to={"/dang-ky"}>Đăng ký</Link>
                    </span>
                </div>
                <div className="text-center my-3">
                    <Button fullWidth
                        variant="contained"
                        type="submit"
                        sx={{
                            padding: "10px",
                        }}>Đăng nhập</Button>
                </div>


            </form>
        </div>

    )
}

export default DangNhap;