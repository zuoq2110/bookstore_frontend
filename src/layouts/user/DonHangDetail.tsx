import React from "react"
import DonHangModel from "../../models/DonHangModel"
import { Chip, Stepper } from "@mui/material"
import { format } from "date-fns"
import { StepperComponent } from "../utils/StepperComponent"
import SachCheckout from "../product/Checkout/SachCheckout"


interface DonHangDetailProps {
    donHang: DonHangModel
    activeStep: number
    steps: String[]
    type?: string
    handleCloseModal?: any
}
const DonHangDetail: React.FC<DonHangDetailProps> = (props) => {
    return (
        <>
            <Chip
                label={props.donHang.tinhTrangDonHang}
                sx={{ width: "auto-fit" }}
                color={
                    props.donHang.tinhTrangDonHang === "Thành công"
                        ? "success"
                        : props.donHang.tinhTrangDonHang === "Đang xử lý"
                            ? "info"
                            : props.donHang.tinhTrangDonHang === "Đang giao hàng"
                                ? "warning"
                                : "error"
                }
                variant='outlined' />
            <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <p className="mt-2">
                        Mã đơn hàng:{" "}
                        <strong >{props.donHang.maDonHang}</strong>
                    </p>
                    <p className="mt-2">
                        Ngày mua:{" "}
                        <strong >{format(new Date(props.donHang.ngayTao), "dd/MM/yyyy")}</strong>
                    </p>
                    <p>
                        Tổng tiền:
                        <strong className='ms-2'>
                            {props.donHang.tongTien.toLocaleString("vi-vn")} đ
                        </strong>
                    </p>
                    <p>
                        Phương thức thanh toán:
                        <strong className='ms-2'>{props.donHang.hinhThucThanhToan}</strong>
                    </p>
                </div>
                <div className='col-lg-4 col-md-6 col-sm-12'>
                    <p>
                        Họ và tên:
                        <strong className='ms-2'>{props.donHang.hoVaTen}</strong>
                    </p>
                    <p>
                        Địa chỉ giao hàng:
                        <strong className='ms-2'>
                            {props.donHang.diaChiGiaoHang}
                        </strong>
                    </p>
                    <p>
                        Số điện thoại:
                        <strong className='ms-2'>{props.donHang.soDienThoai}</strong>
                    </p>
                </div>
                <div className='col'>
					<StepperComponent
						steps={props.steps}
						activeStep={props.activeStep}
					/>
				</div>
            </div>
            <strong className="text-warning">Ghi chú</strong>
            <span className="ms-2">{props.donHang.ghiChu}</span>
            <hr className="mt-2"></hr>
            <div className="row">
                {props.donHang.gioHangList?.map((item,index)=>(
                    <SachCheckout tinhTrangDonHang={props.donHang.tinhTrangDonHang}
                    handleCloseModalChiTietDonHang={props.handleCloseModal}
                    type={props.type} gioHang={item} key={index} maDonHang={props.donHang.maDonHang}/>
                ))}
            </div>
            
        </>
    )
}

export default DonHangDetail