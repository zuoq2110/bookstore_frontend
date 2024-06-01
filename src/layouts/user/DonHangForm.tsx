import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import React, { FormEvent, useEffect, useState } from "react"
import DonHangModel from "../../models/DonHangModel"
import { lay1DonHangByMaDonHang, layToanBoDonHang, layToanBoDonHangById } from "../../api/DonHangAPI"
import DonHangDetail from "./DonHangDetail"
import { toast } from "react-toastify"

interface DonHangFormProps {
    handleClose: any
    option?: any
    maDonHang: any
    setCountReload: any
}
const DonHangForm: React.FC<DonHangFormProps> = (props) => {
    const [donHang, setDonHang] = useState<DonHangModel>({
        maDonHang: 0,
        diaChiGiaoHang: "",
        tongTien: 0,
        tongTienSanPham: 0,
        chiPhiGiaoHang: 0,
        chiPhiThanhToan: 0,
        ngayTao: new Date(),
        tinhTrangDonHang: "",
        ghiChu: "",
        hinhThucThanhToan: 0

    })
    const [steps, setSteps] = useState<String[]>([]);
    const [activeStep, setActiveStep] = useState(0);
    useEffect(() => {
        lay1DonHangByMaDonHang(props.maDonHang)
            .then(response => {
                setDonHang(response)
                if (response.tinhTrangDonHang === "Bị hủy") {
                    setSteps(["Đang xử lý", "Bị hủy"]);
                    setActiveStep(["Đang xử lý", "Bị hủy"].indexOf(response.tinhTrangDonHang));
                 
                } else {
                    setSteps(["Đang xử lý", "Đang giao hàng", "Thành công"]);
                    setActiveStep(
                        ["Đang xử lý", "Đang giao hàng", "Thành công"].indexOf(
                            response.tinhTrangDonHang
                        )
                    );
                }
            }).catch(err => console.log(err))
    }, [props.maDonHang, props.option])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const token = localStorage.getItem("token");
        fetch(`http://localhost:8080/don-hang/cap-nhat`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...donHang, tinhTrangDonHang: donHang.tinhTrangDonHang})
        }).then(response => {
            if (response.ok) {
                toast.success("Cập nhật đơn hàng thành công")
                
                props.setCountReload(Math.random)
                props.handleClose()
            } else {
                toast.error("Gặp lỗi trong quá trình cập nhật")
            }
        }).catch((error) => {
            console.log(error);
            toast.error("Gặp lỗi trong quá trình cập nhật đơn hàng");
        });
    }
    const handleCancleOrder = () => {
        const token = localStorage.getItem("token");
        fetch(`http://localhost:8080/don-hang/cap-nhat`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...donHang, tinhTrangDonHang: "Bị hủy" })
        }).then(response => {
            if (response.ok) {
                toast.success("Hủy đơn hàng thành công")
                
                props.setCountReload(Math.random)
                props.handleClose()
            } else {
                toast.error("Gặp lỗi trong quá trình hủy")
            }
        }).catch((error) => {
            console.log(error);
            toast.error("Gặp lỗi trong quá trình huỷ đơn hàng");
        });
    }
    return (
        <div>
            <Typography className='text-center' variant='h4' component='h2'>
                {props.option === "update"
                    ? "CẬP NHẬT ĐƠN HÀNG"
                    : "CHI TIẾT ĐƠN HÀNG"}
            </Typography>
            <div className="container px-5">
                <form className="form" onSubmit={handleSubmit}>
                    {props.option === 'update' ? (
                        <FormControl sx={{ m: 1 }} size='small' fullWidth>
                            <InputLabel id='demo-simple-select-helper-label'>
                                Trạng thái đơn hàng
                            </InputLabel>
                            <Select
                                labelId='demo-simple-select-helper-label'
                                id='demo-simple-select-helper'
                                value={donHang?.tinhTrangDonHang}
                                label='Trạng thái đơn hàng'
                                autoWidth
                                onChange={(e) =>
                                    setDonHang({ ...donHang, tinhTrangDonHang: e.target.value })
                                }
                            >
                                <MenuItem value='Đang xử lý'>Đang xử lý</MenuItem>
                                <MenuItem value='Đang giao hàng'>
                                    Đang giao hàng
                                </MenuItem>
                                <MenuItem value='Thành công'>Thành công</MenuItem>
                                <MenuItem value='Bị huỷ'>Huỷ</MenuItem>
                            </Select>
                        </FormControl>
                    ) : (<>
                        {props.option === "view-customer" &&
                            donHang.tinhTrangDonHang === "Đang xử lý" && (
                                <>
                                    <Button
                                        className='me-3'
                                        variant='contained'
                                        color='error'
                                        onClick={() => handleCancleOrder()}
                                    >
                                        huỷ đơn hàng
                                    </Button>
                                </>
                            )}
                        <DonHangDetail
                            donHang={donHang}
                            steps={steps}
                            activeStep={activeStep}
                            type={props.option}
                            handleCloseModal={props.handleClose}
                        />
                    </>
                    )}
                    {props.option !== "view-customer" && props.option !== "view" && (
                        <button className='btn btn-primary w-100 my-3' type='submit'>
                            Cập nhật đơn hàng
                        </button>)}
                </form>
            </div>
        </div>
    )
}
export default DonHangForm