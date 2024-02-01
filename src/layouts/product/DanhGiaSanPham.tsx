import { useEffect, useState } from "react"
import DanhGiaModel from "../../models/DanhGiaModel"
import { layToanBoDanhGiaCuaMotSach } from "../../api/DanhGiaAPI"
import renderRating from "../utils/renderRating"


interface DanhGiaSanPhamInterface{
maSach: number
}

const DanhGiaSanPham: React.FC<DanhGiaSanPhamInterface> = (props) => {
   
    const [danhSachDanhGia, setDanhSachDanhGia] = useState<DanhGiaModel[]>([])
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true)
    const [baoLoi, setBaoLoi] = useState(null)
 
    useEffect(()=>{
     layToanBoDanhGiaCuaMotSach(props.maSach).then(danhSachDanhGia=>{
         setDanhSachDanhGia(danhSachDanhGia);
         setDangTaiDuLieu(false);
     }).catch(
         error => {
             setDangTaiDuLieu(false);
             setBaoLoi(error.message);
         }
     );
    },[])
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
        <div className="container mt-2 mb-2 text-center">
        <h4>Đánh giá sản phẩm: </h4>
        {
          danhSachDanhGia.map((danhGia, index)=>(
            <div className="row">
                <div className="col-4 text-end">
                    <p>{renderRating(danhGia.diemXepHang)}</p>
                </div>
                <div className="col-8 text-start">
                    <p>{danhGia.nhanXet}</p>
                </div>
            </div>
          ))
            
        }

    </div>
    );
}
export default DanhGiaSanPham;