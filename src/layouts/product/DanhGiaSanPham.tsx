import { useEffect, useState } from "react"
import DanhGiaModel from "../../models/DanhGiaModel"
import { layToanBoDanhGiaCuaMotSach } from "../../api/DanhGiaAPI"
import renderRating from "../utils/renderRating"
import User from "./user/User"


interface DanhGiaSanPhamInterface {
    maSach: number
}

const DanhGiaSanPham: React.FC<DanhGiaSanPhamInterface> = (props) => {

    const [danhSachDanhGia, setDanhSachDanhGia] = useState<DanhGiaModel[]>([])
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true)
    const [baoLoi, setBaoLoi] = useState(null)

    useEffect(() => {
        layToanBoDanhGiaCuaMotSach(props.maSach).then(danhSachDanhGia => {
            setDanhSachDanhGia(danhSachDanhGia);
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

    return (
        <div className="container mt-2 text-start">
            <h4 className="mb-3">Đánh giá sản phẩm </h4>
            {
                danhSachDanhGia.map((danhGia, index) => (
                    <div className="mb-3"  key={index}>
                        <div className="d-flex">
                            <User danhGia={danhGia} >
                                <div className="text-start">
                                    <div>
                                        {renderRating(danhGia.diemXepHang)}
                                    </div>
                                    <p>{danhGia.nhanXet}</p>
                                </div>
                            </User>
                        </div>
                    </div>
                ))

            }

        </div >
    );
}
export default DanhGiaSanPham;