import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import DanhSachSanPham from "../product/DanhSachSanPham";
import { useNavigate, useParams } from "react-router-dom";
import SachBanChay from "../product/components/SachBanChay";
import SachMoi from "../product/components/SachMoi";
import { isTokenExpired } from "../utils/JwtService";
import { toast } from "react-toastify";

interface HomePageProps {
    tuKhoaTimKiem: string;
}
function HomePage({ tuKhoaTimKiem }: HomePageProps) {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
    const { maTheLoai } = useParams();
    let maTheLoaiNumber = 0;
    try {
        maTheLoaiNumber = parseInt(maTheLoai + '');

    } catch (error) {
        maTheLoaiNumber = 0;

    }
    if (Number.isNaN(maTheLoaiNumber)) {
        maTheLoaiNumber = 0;
    }
    return (
        <div>
            {tuKhoaTimKiem ? <DanhSachSanPham tuKhoaTimKiem={tuKhoaTimKiem} maTheLoai={maTheLoaiNumber} /> :
                <><Banner />
                    <Carousel />
                    <SachBanChay />
                    <SachMoi />
                    <DanhSachSanPham tuKhoaTimKiem={tuKhoaTimKiem} maTheLoai={maTheLoaiNumber} />
                </>}

        </div>
    );
}
export default HomePage;