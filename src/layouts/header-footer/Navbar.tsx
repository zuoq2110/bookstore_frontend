import React, { ChangeEvent, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useGioHangItem } from "../utils/GioHangContext";
import { logout } from "../utils/JwtService";

interface NavbarProps {
    tuKhoaTimKiem: string;
    setTuKhoaTimKiem: (tuKhoa: string) => void
}
function Navbar({ tuKhoaTimKiem, setTuKhoaTimKiem }: NavbarProps) {
    const { tongGioHang, setTongGioHang, setGioHangList} = useGioHangItem()
    
    const navigate = useNavigate()
    const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState('');
    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTuKhoaTamThoi(e.target.value);

    }
    const handleSearch = () => {
        if (tuKhoaTamThoi !== null) {
            setTuKhoaTimKiem(tuKhoaTamThoi);
        }
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Bookstore</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Trang chủ</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Thể loại sách
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                                <li><Link className="dropdown-item" to="/2">Thể loại 2</Link></li>
                                <li><Link className="dropdown-item" to="/1">Thể loại 1</Link></li>
                                <li><Link className="dropdown-item" to="/3">Thể loại 3</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Quy định bán hàng
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                                <li><a className="dropdown-item" href="#">Quy định 1</a></li>
                                <li><a className="dropdown-item" href="#">Quy định 2</a></li>
                                <li><a className="dropdown-item" href="#">Quy định 3</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Liên hệ</a>
                        </li>
                    </ul>
                </div>
                <div className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search" onChange={onSearchInputChange} value={tuKhoaTamThoi} onKeyDown={e => {
                        if (e.key === "Enter") {
                            setTuKhoaTimKiem(tuKhoaTamThoi);
                        }
                    }}></input>
                    <button className="btn btn-outline-success" type="submit" onClick={handleSearch}><Search></Search></button>

                </div>
                <ul className="navbar-nav me-1">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="fas fa-shopping-cart"></i>
                        </a>
                    </li>
                    <li className="nav-item btn-group dropdown ">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button"  aria-haspopup="true" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-user"></i>
                        </a>
                        <ul className="dropdown-menu " style={{left:"-110px"}} aria-labelledby="navbarDropdown2">
                            <li><a className="dropdown-item" href="/nguoi-dung">Tài khoản</a></li>
                            <li><a className="dropdown-item" href="#">Sách yêu thích</a></li>
                            <li><a className="dropdown-item" href="dang-nhap" onClick={()=>{
                                setTongGioHang(0)
                                logout(navigate)
                                setGioHangList([])
                            }}>Đăng xuất</a></li>
                        </ul>
                    </li>
                </ul>



            </div>
        </nav>
    )
}
export default Navbar;