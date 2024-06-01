import { useEffect, useState } from "react"
import { useGioHangItem } from "../../utils/GioHangContext"
import GioHangModel from "../../../models/GioHangModel"
import HinHAnhModel from "../../../models/HinhAnhModel"
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI"
import { Link } from "react-router-dom"
import TextEllipsis from "../components/textEllipsis/TextEllipsis"
import { Button, Chip } from "@mui/material"
import DoneIcon from "@mui/icons-material/Done";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import { ModalUtil } from "../../user/ModalUtil"
import ReviewForm from "../components/review/ReviewForm"
interface SachCheckoutProps {
    gioHang: GioHangModel
    type?: any
    maDonHang?: number
    tinhTrangDonHang?: string
    handleCloseModalChiTietDonHang?: any
}
const SachCheckout: React.FC<SachCheckoutProps> = (props) => {
    const [danhSachAnh, setDanhSachAnh] = useState<HinHAnhModel[]>([])
    const [gioHang, setGioHang] = useState<GioHangModel>(props.gioHang)
    const [openModal, setOpenModal]= useState(false)
    const handleOpenModal = ()=>{
        setOpenModal(true)
    }
    const handleCloseModal = ()=>{
        setOpenModal(false)
    }
    useEffect(() => {
        layToanBoAnhCuaMotSach(props.gioHang.sach.maSach)
            .then((response) => {
                setDanhSachAnh(response)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [props.gioHang.sach.maSach])
    let duongDan: string = "";
    if (danhSachAnh[0] && danhSachAnh[0].duongDan) {
        duongDan = danhSachAnh[0].duongDan;
    }
    return (
        <div className="row">
            <div className="col">
                <div className="d-flex p-2">
                    <img src={duongDan}
                        style={{ width: "100px" }}
                        alt={gioHang.sach.tenSach}></img>
                    <div className="d-flex flex-column">
                        <Link className="text-black " style={{ textDecoration: "none", fontWeight: 500 }}
                            to={`/sach/${gioHang.sach.maSach}`}>
                            {gioHang.sach.tenSach}
                        </Link>
                        <div className="mt-auto">
                            <span style={{ fontSize: "22px" }} className="text-danger">
                                <strong>
                                    {gioHang.sach.giaBan.toLocaleString()}đ
                                </strong>
                            </span>
                            <span className="ms-3 small">
                                <del>{gioHang.sach.giaNiemYet?.toLocaleString()}đ</del>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-2 text-center">
                <strong >
                    {gioHang.soLuong}
                </strong>
            </div>
            <div className="col-2 text-center">
                <strong>
                    {(gioHang.soLuong * gioHang.sach.giaBan).toLocaleString()}đ
                </strong>
            </div>
            {props.type === 'view-customer' &&
                props.tinhTrangDonHang === 'Thành công' && (
                    <div className="d-flex flex-row-reverse">
                        {props.gioHang.review === true ? (
                            <>
                                <Button
                                    className='mx-3'
                                    variant='outlined'
                                    size='small'
                                    startIcon={<RateReviewRoundedIcon />}
                                    style={{ width: "150px" }}
                                    onClick={handleOpenModal}
                                >
                                    Xem đánh giá
                                </Button>
                                <Chip
                                    color='primary'
                                    label='Bạn đã đánh giá sản phẩm này rồi'
                                    icon={<DoneIcon />}
                                />
                            </>
                        ): (
                            <Button
                                variant='outlined'
                                size='small'
                                startIcon={<RateReviewRoundedIcon />}
                                style={{ width: "150px" }}
                                onClick={handleOpenModal}
                            >
                                Viết đánh giá
                            </Button>
                        ) }
                        <ModalUtil  open={openModal} handleClose={handleCloseModal}
                        handleOpen={handleOpenModal}>
                            <ReviewForm gioHangItem={gioHang}
                            handleCloseModalChiTietDonHang={props.handleCloseModalChiTietDonHang}
                            maDonHang={props.maDonHang? props.maDonHang:0}
                            maSach={props.gioHang.sach.maSach}
                            setGioHangItem={setGioHang}
                            handleCloseModal={handleCloseModal}/>

                        </ModalUtil>
                    </div>
                )}
        </div>
    )
}
export default SachCheckout