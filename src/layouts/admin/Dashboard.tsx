import { Card, CardContent, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import { layToanBoDonHang } from "../../api/DonHangAPI";
import DonHangModel from "../../models/DonHangModel";
import RequireAdmin from "./RequireAmdin";
import { layToanBoNguoiDungTheoRole } from "../../api/NguoiDungAPI";
import { layToanBoSach, layToanBoSoLuongSach } from "../../api/SachAPI";
import SachModel from "../../models/SachModel";
import { layTongSoDanhGia } from "../../api/DanhGiaAPI";
import Chart from "./components/chart/Chart";


const Dashboard = () => {
    const [tongTien, setTongTien] = React.useState(0);
    const [soDonHang, setSoDonHang] = useState(0)
    const [soLuongTaiKhoan, setSoluongTaiKhoan] = useState(0)
    const [tongSoSach, setTongSoSach] = useState(0)
    const [tongSoDanhGia, setTongSoDanhGia] = useState(0)
    const [donHang, setDonHang] = useState<DonHangModel[]>([])
    useEffect(() => {
        layToanBoDonHang()
            .then((response) => {
                setDonHang(response)
                const soDonHang = donHang.length;
                setSoDonHang(soDonHang)
                const tongTienResponse = response.reduce((tienTichLuy, donHang) => {
                    if (donHang.tinhTrangDonHang === 'Thành công') {
                        return tienTichLuy + donHang.tongTien
                    }
                    return tienTichLuy
                }, 0)
                setTongTien(tongTienResponse)
            })
    }, [])

    useEffect(() => {
        layToanBoNguoiDungTheoRole()
            .then(response => {
                setSoluongTaiKhoan(response.flat().length)
            })
            .catch(err => console.log(err))
    })
    useEffect(() => {
        layToanBoSoLuongSach()
            .then(response => {
                setTongSoSach(response)
            })
            .catch(err => console.log(err))
    })
    useEffect(() => {
        layTongSoDanhGia()
            .then(response => {
                setTongSoDanhGia(response)
            })
            .catch(err => console.log(err))
    })
    return (
        <>
            <div className="container">
                <div className="shadow-4 p-5 bg-light rounded">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                            <Card
                                sx={{
                                    minWidth: 275,
                                    borderRadius: 1,
                                    backgroundColor: "#4db44da3",
                                }}>
                                <CardContent>
                                    <Typography>
                                        TỔNG TIỀN KIẾM ĐƯỢC
                                    </Typography>
                                    <div className="d-flex align-item-center justify-content-between">
                                        <Typography>
                                            {tongTien.toLocaleString("vi")} đ
                                        </Typography>
                                        <div className='d-flex align-item-center justify-content-center flex-column '>
                                            <span
                                                className='rounded-circle p-3'
                                                style={{
                                                    color: "black",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                <PaidOutlinedIcon
                                                    fontSize='large'
                                                    color='success'
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>

                            </Card>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                            <Card
                                sx={{
                                    minWidth: 275,
                                    borderRadius: 1,
                                    backgroundColor: "#1976d2a3"
                                }}>
                                <CardContent>
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color='text.secondary'
                                        gutterBottom>
                                        TỔNG SỐ TÀI KHOẢN
                                    </Typography>
                                    <div className="d-flex align-item-center justify-content-between">
                                        <Typography
                                            sx={{
                                                fontSize: 32,
                                                fontWeight: "bolder",
                                                marginTop: "10px",
                                            }}
                                            gutterBottom>
                                            {soLuongTaiKhoan.toLocaleString("vi")}
                                        </Typography>
                                        <div className='d-flex align-item-center justify-content-center flex-column '>
                                            <span
                                                className='rounded-circle p-3'
                                                style={{
                                                    color: "black",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                <PeopleAltOutlinedIcon
                                                    fontSize='large'
                                                    color='primary'
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>

                            </Card>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                            <Card
                                sx={{
                                    minWidth: 275,
                                    borderRadius: 1,
                                    backgroundColor: "#757575a3"
                                }}>
                                <CardContent>
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color='text.secondary'
                                        gutterBottom>
                                        TỔNG HÓA ĐƠN
                                    </Typography>
                                    <div className="d-flex align-item-center justify-content-between">
                                        <Typography
                                            sx={{
                                                fontSize: 32,
                                                fontWeight: "bolder",
                                                marginTop: "10px",
                                            }}
                                            gutterBottom>
                                            {soDonHang.toLocaleString("vi")}
                                        </Typography>
                                        <div className='d-flex align-item-center justify-content-center flex-column '>
                                            <span
                                                className='rounded-circle p-3'
                                                style={{
                                                    color: "black",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                <LocalMallOutlinedIcon
                                                    fontSize='large'
                                                    color='action'
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>

                            </Card>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                            <Card
                                sx={{
                                    minWidth: 275,
                                    borderRadius: 1,
                                    backgroundColor: "#9c27b0a3"
                                }}>
                                <CardContent>
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color='text.secondary'
                                        gutterBottom>
                                        TỔNG SỐ SÁCH
                                    </Typography>
                                    <div className="d-flex align-item-center justify-content-between">
                                        <Typography
                                            sx={{
                                                fontSize: 32,
                                                fontWeight: "bolder",
                                                marginTop: "10px",
                                            }}
                                            gutterBottom>
                                            {tongSoSach}
                                        </Typography>
                                        <div className='d-flex align-item-center justify-content-center flex-column '>
                                            <span
                                                className='rounded-circle p-3'
                                                style={{
                                                    color: "black",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                <MenuBookOutlinedIcon
                                                    fontSize='large'
                                                    color='action'
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>

                            </Card>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                            <Card
                                sx={{
                                    minWidth: 275,
                                    borderRadius: 1,
                                    backgroundColor: "#d32f2fa1"
                                }}>
                                <CardContent>
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color='text.secondary'
                                        gutterBottom>
                                        TỔNG ĐÁNH GIÁ TẤT CẢ QUYỂN SÁCH
                                    </Typography>
                                    <div className="d-flex align-item-center justify-content-between">
                                        <Typography
                                            sx={{
                                                fontSize: 32,
                                                fontWeight: "bolder",
                                                marginTop: "10px",
                                            }}
                                            gutterBottom>
                                            {tongSoDanhGia}
                                        </Typography>
                                        <div className='d-flex align-item-center justify-content-center flex-column '>
                                            <span
                                                className='rounded-circle p-3'
                                                style={{
                                                    color: "black",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                <RateReviewOutlinedIcon
                                                    fontSize='large'
                                                    color='action'
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>

                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Chart orders={donHang} />
        </>
    )
}

const DashboardPage = RequireAdmin(Dashboard)

export default DashboardPage