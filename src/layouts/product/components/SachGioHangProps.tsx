
import GioHangModel from "../../../models/GioHangModel";
import { useGioHangItem } from "../../utils/GioHangContext";
import React, { useEffect, useState } from "react";
import HinHAnhModel from "../../../models/HinhAnhModel";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI";
import { Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import ChonSoLuong from "./ChonSoLuong";
import { isToken } from "../../utils/JwtService";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useConfirm } from "material-ui-confirm";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import { Toast } from "react-toastify/dist/components";
import { toast } from "react-toastify";

interface SachGioHangProps {
    gioHang: GioHangModel
    xoaSach: any
}

const GioHangProps: React.FC<SachGioHangProps> = (props) => {
    const { setGioHangList } = useGioHangItem()
    const confirm = useConfirm()

    const [soLuong, setSoLuong] = useState(props.gioHang.sach.soLuong !== undefined && props.gioHang.soLuong > props.gioHang.sach.soLuong ? props.gioHang.sach.soLuong : props.gioHang.soLuong)
    const [danhSachAnh, setDanhSachAnh] = useState<HinHAnhModel[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [erroring, setErroring] = useState(null);
    const them = () => {
        const soLuongTonKho = props.gioHang.sach.soLuong ? props.gioHang.sach.soLuong : 0
        if (soLuong < soLuongTonKho) {
            setSoLuong(soLuong + 1)
            handleSoLuong(props.gioHang.sach.maSach, 1)
            
        }else{
            toast.warning("Số lượng tồn kho không đủ")
        }
    }

    const giam = () => {
        if (soLuong > 1) {
            setSoLuong(soLuong - 1)
            handleSoLuong(props.gioHang.sach.maSach, -1)
        }
    }
    function xoaGioHang() {

        props.xoaSach(props.gioHang.sach.maSach)
        if (isToken()) {
            const token = localStorage.getItem("token")
            fetch(`http://localhost:8080/gio-hang/${props.gioHang.maGioHang}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "application/json"
                },

            }).catch(e => console.log(e))
        }

    }
    const handleSoLuong = (maSach: number, soLuong: number) => {
        const gioHangData: string | null = localStorage.getItem("cart")
        const gioHang: GioHangModel[] = gioHangData ? JSON.parse(gioHangData) : []
        let sachDaTonTai = gioHang.find((gioHang) => gioHang.sach.maSach === maSach)

        if (sachDaTonTai) {
            sachDaTonTai.soLuong += soLuong

            if (isToken()) {
                const token = localStorage.getItem('token')
                fetch("http://localhost:8080/gio-hang/cap-nhat", {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        maGioHang: props.gioHang.maGioHang,
                        soLuong: sachDaTonTai.soLuong
                    })
                }).catch((e) => console.log(e))
            }
            localStorage.setItem("cart", JSON.stringify(gioHang))
            setGioHangList(gioHang)
        }
    }
    useEffect(() => {
        layToanBoAnhCuaMotSach(props.gioHang.sach.maSach)
            .then((response) => {
                setDanhSachAnh(response)
            })
            .catch((error) => {
                setLoading(false)
                setErroring(error)
            })
    }, [])
    let duongDan: string = ""
    if (danhSachAnh[0] && danhSachAnh[0].duongDan) {
        duongDan = danhSachAnh[0].duongDan
    }

    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>

            <div className='col'>
                <div className='d-flex'>
                    <Link to={`/sach/${props.gioHang.sach.maSach}`}>
                        <img
                            src={duongDan}
                            className='card-img-top'
                            alt={props.gioHang.sach.tenSach}
                            style={{ width: "100px" }}
                        />
                    </Link>
                    <div className='d-flex flex-column pb-2'>
                        <Link to={`/sach/${props.gioHang.sach.maSach}`} style={{ textDecoration: "none", color: "#000" }} >
                            <span className='d-inline' >
                                {props.gioHang.sach.tenSach}
                            </span>
                        </Link>
                        <div className='mt-auto'>
                            <span className=' text-danger'>
                                <strong style={{ fontSize: "22px" }}>
                                    {props.gioHang.sach.giaBan?.toLocaleString()}đ
                                </strong>
                            </span>
                            <span
                                className='original-price ms-3 small'
                                style={{ color: "#000" }}
                            >
                                <del>
                                    {props.gioHang.sach.giaNiemYet?.toLocaleString()}đ
                                </del>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-3 text-center my-auto d-flex align-items-center justify-content-center'>
                <ChonSoLuong
                    max={props.gioHang.sach.soLuong}
                    setSoLuong={setSoLuong}
                    them={them}
                    giam={giam}
                    soLuong={soLuong}
                    sach={props.gioHang.sach}
                />
            </div>
            <div className='col-2 text-center my-auto'>
                <span className='text-danger'>
                    <strong>
                        {(soLuong * props.gioHang.sach.giaBan).toLocaleString()}đ
                    </strong>
                </span>
            </div>
            <div className="col-2 my-auto d-flex justify-content-center">
                <React.Fragment>
                    <button
                        style={{
                            outline: 0,
                            backgroundColor: "transparent",
                            border: 0,
                        }}
                        onClick={() => handleClickOpen()}
                    >
                        <DeleteOutlineOutlinedIcon sx={{ cursor: "pointer" }} />
                    </button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Xóa sản phẩm"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Bạn muốn bỏ sản phẩm này khỏi giỏ hàng?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Hủy</Button>
                            <Button onClick={() => xoaGioHang()} autoFocus>
                                Xóa
                            </Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            </div >

            <hr className='my-3' />
        </>
    )
}

export default GioHangProps