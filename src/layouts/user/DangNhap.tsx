import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import GioHangModel from "../../models/GioHangModel";
import { jwtDecode } from "jwt-decode";
import { JwtPayLoad } from "./UserAccount";
import { layTatCaGioHangByMaNguoiDung } from "../../api/GioHangAPI";
import { useGioHangItem } from "../utils/GioHangContext";
import { toast } from "react-toastify";

const DangNhap = () => {
    const { setTongGioHang, setGioHangList } = useGioHangItem()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [thongBao, setThongBao] = useState("")
    const navigate = useNavigate()
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
                    setThongBao("Đăng nhập thành công")
                    return response.json()

                } else {
                    setThongBao("Sai tên đăng nhập hoặc mật khẩu")
                }
            }).then(
                async (data) => {
                    const { jwt } = data;
                    const decodedToken = jwtDecode(jwt) as JwtPayLoad;
                    toast.success("Đăng nhập thành công")
                    localStorage.setItem('token', jwt)

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
                    navigate("/");

                }
            ).catch((error) => {
                console.log(error);
                toast.error("Tên đăng nhập hoặc mật khẩu không chính xác")

            }),
            { pending: "Đang trong quá trình xử lý" }
        )
    }



    return (
        <div className="container ">
            <h3 className="mt-3 text-center">Đăng Nhập</h3>
            <form onSubmit={handleSubmit} className="form col-md-6 col-12 mt-4 mx-auto">

                <div className="form-outline">
                    <label className="form-label text-left">Username</label>
                    <input type="text" className="form-control"
                        value={username} onChange={(e) => setUsername(e.target.value)} />

                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" >Password</label>
                    <input type="password" id="form2Example2" className="form-control"
                        value={password} onChange={(e) => setPassword(e.target.value)} />

                </div>
                {thongBao && <div style={{ color: 'red' }}>{thongBao}</div>}
                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                            <label className="form-check-label" > Remember me </label>
                        </div>
                    </div>

                    <div className="col">
                        <a href="#!">Forgot password?</a>
                    </div>
                </div>
                <div className="text-center">
                <button type="submit" className=" btn btn-primary btn-block mb-4">Sign in</button>
                </div>
                <div className="text-center">
                    <p>Not a member? <a href="/dang-ky">Register</a></p>
                    <p>or sign up with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-google"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-twitter"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-github"></i>
                    </button>
                </div>

            </form>
        </div>

    )
}

export default DangNhap;