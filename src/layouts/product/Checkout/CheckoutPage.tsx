import { Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { FormEvent, useEffect, useState } from "react"
import { Lay1NguoiDungTheoID } from "../../../api/NguoiDungAPI"
import { getIdUserByToken } from "../../utils/JwtService"
import NguoiDungModel from "../../../models/NguoiDungModel"
import { useGioHangItem } from "../../utils/GioHangContext"
import SachCheckout from "./SachCheckout"
import GioHangModel from "../../../models/GioHangModel"
import dinhDangSo from "../../utils/DinhDangSo"
import { ArrowBack } from "@mui/icons-material"
import SuccessCheckoutPage from "./SuccessCheckoutPage"
import { toast } from "react-toastify"

interface CheckoutPageProps {
    gioHangList: GioHangModel[]
    tongTien: number
    setIsCheckout: any
    muaNgay?: boolean
}

const CheckOutPage: React.FC<CheckoutPageProps> = (props) => {
    const [fullName, setFullName] = useState('')
    const [soDienThoai, setSoDienThoai] = useState('')
    const [diaChiGiaoHang, setDiaChiGiaoHang] = useState('')
    const [email, setEmail] = useState('')
    const [ghiChu, setGhiChu] = useState('')
    const [payment, setPayment] = useState(1)
const {setGioHangList, setTongGioHang} = useGioHangItem()
    const handleChangePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPayment(parseInt(event.target.value))
    }
    const [user, setUser] = useState<NguoiDungModel>()
    useEffect(() => {
        const token = localStorage.getItem('token')
        const id = getIdUserByToken()
        Lay1NguoiDungTheoID(id)
            .then((response) => {
                setUser(response)
                setFullName(response.hoDem + " " + response.ten)
                setSoDienThoai(response.soDienThoai)
                setDiaChiGiaoHang(response.diaChiGiaoHang)
                setEmail(response.email)
            })
    })

    const [isSuccess, setIsSuccess] = useState(false)
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const sachResponse: any = []
        props.gioHangList.forEach(item => {
            sachResponse.push({
                sach: item.sach,
                soLuong: item.soLuong
            })
        })

        if (payment === 1) {
            fetch(`http://localhost:8080/don-hang/them`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }, body: JSON.stringify({
                    sach: sachResponse,
                    maNguoiDung: getIdUserByToken(),
                    tongTien: props.tongTien,
                    hoVaTen: fullName,
                    soDienThoai: soDienThoai,
                    email: email,
                    diaChiGiaoHang: diaChiGiaoHang,
                    maHinhThucThanhToan: payment,
                    ghiChu: ghiChu
                })
            })
                .then(response => {
                    console.log(response.text())
                    
                    if(!props.muaNgay){
                        setGioHangList([])
                        setTongGioHang(0)
                        localStorage.removeItem("cart")
                    }
                    console.log(!props.muaNgay)
                    setIsSuccess(true)
                    toast.success("Thanh toán thành công")
                }).catch((error) => {
                    console.log(error);
                    toast.error("Thanh toán thất bại");
                });
        }

    }
    return (
        <>
            {!isSuccess ?
                <form onSubmit={handleSubmit}>
                    <div className="container bg-light rounded p-3 my-3">
                        <strong>THÔNG TIN NGƯỜI NHẬN</strong>
                        <hr></hr>
                        <div className="row ">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <TextField
                                    required={true}
                                    fullWidth
                                    type="text"
                                    label='Họ và tên'
                                    value={fullName}
                                    className="input-field"
                                    style={{ margin: "12px 0" }}
                                    onChange={e => setFullName(e.target.value)}
                                ></TextField>
                                <TextField
                                    required={true}
                                    fullWidth
                                    type="text"
                                    label='Số điện thoại'
                                    value={soDienThoai}
                                    style={{ margin: "12px 0" }}
                                    className="input-field"
                                    onChange={e => setSoDienThoai(e.target.value)}
                                ></TextField>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <TextField
                                    required={true}
                                    fullWidth
                                    type="text"
                                    label='Email'
                                    value={email}
                                    style={{ margin: "12px 0" }}
                                    disabled
                                ></TextField>
                                <TextField
                                    required={true}
                                    fullWidth
                                    type="text"
                                    label='Địa chỉ giao hàng'
                                    value={diaChiGiaoHang}
                                    style={{ margin: "12px 0" }}
                                    className="input-field"
                                    onChange={e => setDiaChiGiaoHang(e.target.value)}
                                ></TextField>

                            </div>
                        </div>
                    </div>
                    <div className="container my-3 bg-light rounded p-3">
                        <strong className='fs-6'>PHƯƠNG THỨC THANH TOÁN</strong>
                        <hr />
                        <FormControl>
                            <RadioGroup
                                aria-labelledby='demo-controlled-radio-buttons-group'
                                name='controlled-radio-buttons-group'
                                value={payment}
                                onChange={handleChangePayment}
                            >
                                <FormControlLabel
                                    value={1}
                                    control={<Radio />}
                                    label={
                                        <div>
                                            <img
                                                src='https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_cashondelivery.svg?q=10311'
                                                alt='Cash on Delivery'
                                                style={{
                                                    width: "40px",
                                                    marginRight: "10px",
                                                }}
                                            />
                                            Thanh toán bằng tiền mặt khi nhận hàng</div>
                                    }
                                />
                                <FormControlLabel
                                    value={2}
                                    control={<Radio />}
                                    label={
                                        <div>
                                            <img
                                                src='https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_vnpay.svg?q=10311'
                                                alt='Cash on Delivery'
                                                style={{
                                                    width: "40px",
                                                    marginRight: "10px",
                                                }}
                                            />
                                            Thanh toán bằng VNPAY</div>
                                    }
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='container bg-light my-3 rounded-3 p-3'>
                        <strong className='fs-6'>GHI CHÚ</strong>
                        <hr />
                        <TextField
                            className='w-100'
                            id='standard-basic'
                            label='Ghi chú'
                            variant='outlined'
                            multiline
                            minRows={3}
                            maxRows={4}
                            value={ghiChu}
                            onChange={(e) => setGhiChu(e.target.value)}
                        />
                    </div>
                    <div className='container bg-light my-3 rounded-3 p-3'>
                        <strong className='fs-6'>KIỂM TRA LẠI ĐƠN HÀNG</strong>
                        <hr />
                        <div className="row my-3">
                            <div className="col text-start">Sản phẩm</div>
                            <div className="col-2 text-center">Số lượng</div>
                            <div className="col-2 text-center">Tổng tiền</div>
                        </div>
                        {
                            props.gioHangList.map((gioHang) => (
                                <SachCheckout gioHang={gioHang} />
                            ))
                        }
                    </div>
                    <footer className="fixed-bottom bg-light shadow-lg rounded bottom-0" style={{ height: "175px" }}>
                        <div className="container my-3">
                            <div className="row">
                                <div className="col text-end me-3">Thành tiền</div>
                                <div className="col-2 text-end ms-3">{dinhDangSo(props.tongTien)} đ</div>
                            </div>
                            <div className='row'>
                                <div className='me-3 col text-end'>Phí vận chuyển</div>
                                <div className='ms-3 col-2 text-end'>0 đ</div>
                            </div>
                            <div className='row'>
                                <div className='me-3 col text-end'>
                                    <strong>Tổng số tiền (gồm VAT)</strong>
                                </div>
                                <div className='ms-3 col-2 text-end text-danger fs-5'>
                                    <strong>
                                        {props.tongTien.toLocaleString("vi-vn")}{" "}
                                        đ
                                    </strong>
                                </div>
                            </div>
                            <hr className="mt-3"></hr>
                            <div className="row">
                                <div className="col">
                                    <div style={{ cursor: "pointer" }}
                                        onClick={() => props.setIsCheckout(false)}>
                                        <ArrowBack></ArrowBack>
                                        <strong>Quay về giỏ hàng</strong>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="">
                                        <Button
                                            variant="contained"
                                            sx={{ width: "100%" }}
                                            type="submit">Xác nhận thanh toán</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </form>
                : <SuccessCheckoutPage />}
        </>
    )
}
export default CheckOutPage