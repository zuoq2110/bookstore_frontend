import { useEffect, useState } from "react"
import SachModel from "../../../models/SachModel"
import { layToanBoSach } from "../../../api/SachAPI"
import SachProps from "./SachProps"
import { PhanTrang } from "../../utils/PhanTrang"
import ToolFilter from "./ToolFilter"
import { useParams } from "react-router-dom"
import DanhSachSanPham from "../DanhSachSanPham"

const ToanBoSach = () => {
    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([])
    const [trangHienTai, setTrangHienTai] = useState(1)
    const [tongSoTrang, setTongSoTrang] = useState(0)
    const [maTheLoai, setMaTheLoai] = useState(0)
    const [filter, setFilter] = useState(0)
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState("")

    const {maTheLoaiParam} = useParams()
    var maTheLoaiNumber: number = 0;
	try {
		maTheLoaiNumber = parseInt(maTheLoaiParam + ""); // Có thể nó làm object nên phải + thêm chuỗi rỗng vào
		// Nếu mà id genre mà có thay đổi thì id genre trên param sẽ không có tác dụng
		// Đang bị bug khúc này chưa có idea để xử lý
		if (maTheLoai !== 0) {
			maTheLoaiNumber = 0;
		}

		if (Number.isNaN(maTheLoaiNumber)) {
			maTheLoaiNumber = 0;
		}
	} catch (error) {
		console.error("Error: ", error);
	}

   
    return (
        <>
            <div className="container bg-light px-5 mt-4">
                <ToolFilter tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} filter={filter} setFilter={setFilter} maTheLoai={maTheLoaiNumber?maTheLoaiNumber:maTheLoai} setMaTheLoai={setMaTheLoai}/>

            </div>
            <div className="container bg-light px-5">
                <div className="row mt-4">
                   <DanhSachSanPham filter={filter} tuKhoaTimKiem={tuKhoaTimKiem} maTheLoai={maTheLoaiNumber?maTheLoaiNumber:maTheLoai} isPhanTrang={true}/>
                </div>
                
            </div>
        </>
    )
}
export default ToanBoSach