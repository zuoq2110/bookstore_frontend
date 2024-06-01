import React, { useEffect, useState } from "react";
import SachModel from "../../models/SachModel";
import SachProps from "./components/SachProps";
import { layToanBoSach, timKiemSach } from "../../api/SachAPI";
import { PhanTrang } from "../utils/PhanTrang";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface DanhSachSanPhamProps {
    tuKhoaTimKiem: string;
    maTheLoai: number;
    isPhanTrang?: boolean
    filter?: number
}
function DanhSachSanPham({filter,tuKhoaTimKiem, maTheLoai, isPhanTrang }: DanhSachSanPhamProps) {
    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([])
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true)
    const [baoLoi, setBaoLoi] = useState(null)
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [tongSoTrangTemp, settongSoTrangTemp] = useState(tongSoTrang);
	if (tongSoTrangTemp !== tongSoTrang) {
		setTrangHienTai(1);
		settongSoTrangTemp(tongSoTrang);
		console.log(tongSoTrang)
		console.log(tongSoTrangTemp)
	}
    useEffect(() => {
        if (tuKhoaTimKiem === '' && maTheLoai === 0 &&filter===0 ) {
            layToanBoSach(8,trangHienTai - 1).then(data => {
                setDanhSachQuyenSach(data.ketQua);
                setTongSoTrang(data.tongSoTrang);
                setDangTaiDuLieu(false);
            }).catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );
        } else {
            timKiemSach(filter,tuKhoaTimKiem, maTheLoai, trangHienTai - 1).then(data => {
                setDanhSachQuyenSach(data.ketQua);
                setTongSoTrang(data.tongSoTrang);
                setDangTaiDuLieu(false);
            }).catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );
        }
    }, [trangHienTai, tuKhoaTimKiem, maTheLoai, filter]);
    const phanTrang = (trang: number) => {
        setTrangHienTai(trang);
        window.scrollTo(0, 0);
    }
    
    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }

    if (danhSachQuyenSach.length === 0) {
        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>Hiện không tìm thấy sách theo yêu cầu!</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="container pb-5 pt-2 mb-4 px-5 bg-light">
            <h2 className="mt-4">TOÀN BỘ</h2>
            <hr></hr>
            <div className="row mt-4 mb-4">
                {
                    danhSachQuyenSach.map((sach) => (
                        <SachProps key={sach.maSach} sach={sach} />
                    ))
                }
            </div>
            {isPhanTrang?<div className="d-flex justify-content-center mt-2" >
                <PhanTrang setTrangHienTai={setTrangHienTai} phanTrang={phanTrang} tongSoTrang={tongSoTrang} trangHienTai={trangHienTai}/></div>: 
            <Link to={"/kho-sach"}>
            <div className="text-center">
                <Button variant="contained" className="">Xem Thêm</Button>
            </div>
            </Link>}
           
        </div>
    );
}
export default DanhSachSanPham;