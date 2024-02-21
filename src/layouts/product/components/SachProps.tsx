
import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinHAnhModel from "../../../models/HinhAnhModel";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI";
import { Link } from "react-router-dom";
import renderRating from "../../utils/renderRating";
import dinhDangSo from "../../utils/DinhDangSo";
import { useGioHangItem } from "../../utils/GioHangContext";
import { getIdUserByToken, isToken } from "../../utils/JwtService";
import { toast } from "react-toastify";

interface SachPropsInterface {
    sach: SachModel;
}

const SachProps: React.FC<SachPropsInterface> = ({sach}) => {
    const {setTongGioHang, gioHangList} = useGioHangItem()
    
    const [danhSachAnh, setDanhSachAnh] = useState<HinHAnhModel[]>([])
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true)
    const [baoLoi, setBaoLoi] = useState(null)

    const handleThemSach = async(newSach: SachModel) =>{
        let sachTonTai =gioHangList.find((gioHang)=>gioHang.sach.maSach===newSach.maSach)
    if(sachTonTai){
        sachTonTai.soLuong++;
        if(isToken()){
            const request = {
                maGioHang: sachTonTai.maGioHang,
                soLuong: sachTonTai.soLuong
            }
            const token = localStorage.getItem('token')
            console.log(token)
            fetch("http://localhost:8080/gio-hang/cap-nhat",{
                method: "PUT",
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
                
            })
            .then((response)=>{console.log(response)})
            .catch((err) => console.log(err));
        }
    } else {
        if(isToken()){
            try{
                const request = [{
                    soLuong: 1,
                    sach: newSach,
                    maNguoiDung: getIdUserByToken(),
                }]
                const token = localStorage.getItem('token')
                console.log(token)
                const response = await fetch("http://localhost:8080/gio-hang/them",{
                    method: "POST",
                    headers:{
                        Authorization: `Bearer ${token}`,
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(request),
                })
                if(response.ok){
                    const maGioHang = await response.json()
                    gioHangList.push({
                        maGioHang: maGioHang,
                        soLuong:1,
                        sach: newSach,
                    })
                    console.log(response.json)
                }
            }catch(error){
                console.log(error)
            }
        } else{
            gioHangList.push({
                soLuong:1,
                sach: newSach
            })
            console.log(gioHangList)
        }
    }
    localStorage.setItem('cart', JSON.stringify(gioHangList))
    toast.success('Thêm vào giỏ hàng thành công')
    setTongGioHang(gioHangList.length);

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
            <div className="card" style={{ height: '400px' }}>
                <Link to={`sach/${sach.maSach}`}>
                    <img
                        src={duLieuAnh}
                        className="card-img-top"
                        alt={sach.tenSach}
                        style={{ height: '200px' }}
                    />
                </Link>
                <div className="card-body">
                    <Link to={`sach/${sach.maSach}`} style={{ textDecoration: 'none' }}>
                        <h5 className="card-title" style={{ color: '#000' }}>{sach.tenSach}</h5>
                    </Link>
                    <p>{renderRating(sach.trungBinhXepHang ? sach.trungBinhXepHang : 0)}</p>

                    <div className="price">
                        <span className="original-price">
                            <del>{dinhDangSo(sach.giaNiemYet)}đ</del>
                        </span>
                        <span className="mx-2 discounted-price">
                            <strong>{dinhDangSo(sach.giaBan)}đ</strong>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <a href="#" className="btn btn-secondary btn-block">
                                <i className="fas fa-heart"></i>
                            </a>
                        </div>
                        <div className="col-6">
                            <button onClick={()=>handleThemSach(sach)} className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SachProps;