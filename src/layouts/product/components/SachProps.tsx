
import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinHAnhModel from "../../../models/HinhAnhModel";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI";
import { Link, useNavigate } from "react-router-dom";
import renderRating from "../../utils/renderRating";
import dinhDangSo from "../../utils/DinhDangSo";
import { useGioHangItem } from "../../utils/GioHangContext";
import { getIdUserByToken, isToken } from "../../utils/JwtService";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface SachPropsInterface {
    sach: SachModel;
}

const SachProps: React.FC<SachPropsInterface> = ({ sach }) => {
    const { setTongGioHang, gioHangList } = useGioHangItem()
    const navigate = useNavigate()
    const [danhSachAnh, setDanhSachAnh] = useState<HinHAnhModel[]>([])
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true)
    const [baoLoi, setBaoLoi] = useState(null)
    const [isSachYeuThich, setIsSachYeuThich] = useState(false)

    const handleSachYeuThich = (sach: SachModel) => {
        const token = localStorage.getItem('token')
        if (!isToken()) {
            toast.info("Bạn cần đăng nhập để thực hiện chức năng này!")
            navigate("/dang-nhap")
            return
        } else {
            if (!isSachYeuThich) {
                 fetch(`http://localhost:8080/sach-yeu-thich/them`,{
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        maSach: sach.maSach,
                        maNguoiDung: getIdUserByToken()
                    })
                    
                })
                .then(()=>toast.success("Đã thêm vào yêu thích"))
                .catch(err=> console.log(err))
                
            }else{
                fetch(`http://localhost:8080/sach-yeu-thich/xoa`,{
                    method: 'DELETE',
                    headers: {
                        'Content-type' : 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        maSach: sach.maSach,
                        maNguoiDung: getIdUserByToken()
                    })
                }).then(()=>toast.success("Đã xóa khỏi sách yêu thích"))
                .catch(err=> console.log(err))
            }
            setIsSachYeuThich(!isSachYeuThich)
            console.log(isSachYeuThich)
        }
    }

    const handleThemSach = async (newSach: SachModel) => {
        let sachTonTai = gioHangList.find((gioHang) => gioHang.sach.maSach === newSach.maSach)
        if (sachTonTai) {
            sachTonTai.soLuong++;
            if (isToken()) {
                const request = {
                    maGioHang: sachTonTai.maGioHang,
                    soLuong: sachTonTai.soLuong
                }
                const token = localStorage.getItem('token')
                console.log(token)
                fetch("http://localhost:8080/gio-hang/cap-nhat", {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(request)

                })
                    .then((response) => { console.log(response) })
                    .catch((err) => console.log(err));
            }
        } else {
            if (isToken()) {
                try {
                    const request = [{
                        soLuong: 1,
                        sach: newSach,
                        maNguoiDung: getIdUserByToken(),
                    }]
                    const token = localStorage.getItem('token')
                    console.log(token)
                    const response = await fetch("http://localhost:8080/gio-hang/them", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(request),
                    })
                    if (response.ok) {
                        const maGioHang = await response.json()
                        gioHangList.push({
                            maGioHang: maGioHang,
                            soLuong: 1,
                            sach: newSach,
                        })
                        console.log(gioHangList)
                        console.log(maGioHang)
                    }
                } catch (error) {
                    console.log(error)
                }
            } else {
                gioHangList.push({
                    soLuong: 1,
                    sach: newSach
                })
                console.log(gioHangList)
            }
        }
        localStorage.setItem('cart', JSON.stringify(gioHangList))
        toast.success('Thêm vào giỏ hàng thành công')
        setTongGioHang(gioHangList.length);

    }
    const handleOutOfStock = () => {
        toast.warn("Sách đã hết hàng")
    }
    useEffect(() => {
        layToanBoAnhCuaMotSach(sach.maSach).then(HinhAnhdata => {
            setDanhSachAnh(HinhAnhdata);
            setDangTaiDuLieu(false);
        }).catch(
            error => {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }
        );
        if(isToken()){
            const maNguoiDung = getIdUserByToken()
            fetch(`http://localhost:8080/sach-yeu-thich/lay-sach/${maNguoiDung}`)
            .then(res => res.json())
            .then((data)=>{
                if(data.includes(sach.maSach)){
                    setIsSachYeuThich(true)
                }
                console.log("abc")
            }).catch(error=>{
                console.log(error)
            })
            }
    }, [])
   
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
    let duLieuAnh: string = "";
    if (danhSachAnh[0] && danhSachAnh[0].duLieuAnh) {
        duLieuAnh = danhSachAnh[0].duLieuAnh;
    }

    return (
        <div className="col-md-3 mt-2">
            <div className="card position-relative" style={{ height: '440px' }}>
                {sach.giamGia !== 0 &&
                    <h4 className="my-0 end-0 position-absolute d-inline-block"
                        style={{ top: "10px" }}>
                        {sach.soLuong === 0 ?
                            (<span className="badge bg-danger">Hết hàng</span>) :
                            (<span className="badge bg-primary">{sach.giamGia}%</span>)}
                    </h4>}
                <Link to={`/sach/${sach.maSach}`}>
                    <img
                        src={duLieuAnh}
                        className="card-img-top"
                        alt={sach.tenSach}
                        style={{ height: '200px' }}
                    />
                </Link>
                <div className="card-body">
                    <Link to={`/sach/${sach.maSach}`} style={{ textDecoration: 'none' }}>
                        <h5 className="card-title text-center" style={{
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            lineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            color: '#000'
                        }}>
                            {sach.tenSach}</h5>
                    </Link>
                    <p className="text-center">{renderRating(sach.trungBinhXepHang ? sach.trungBinhXepHang : 0)}</p>

                    <div className="price text-center">
                        <span className="original-price">
                            <del>{dinhDangSo(sach.giaNiemYet)}đ</del>
                        </span>
                        <span className="mx-2 discounted-price text-danger">
                            <strong>{dinhDangSo(sach.giaBan)}đ</strong>
                        </span>
                    </div>
                    <div className="d-flex justify-content-between mt-2" role="group">
                        <div className=" text-start ms-5 ">
                            <IconButton onClick={()=>handleSachYeuThich(sach)} color={isSachYeuThich?"error":"default"} className="btn btn-secondary btn-block">
                                <FavoriteIcon />
                            </IconButton>
                        </div>
                        <div className=" text-end me-5 ">
                            {sach.soLuong !== 0 ? <button onClick={() => handleThemSach(sach)} className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart"></i>
                            </button> :
                                <button style={{ display: "" }} onClick={handleOutOfStock} className="disabled btn btn-danger btn-block ">
                                    <i className="fas fa-shopping-cart "></i>
                                </button>}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SachProps;