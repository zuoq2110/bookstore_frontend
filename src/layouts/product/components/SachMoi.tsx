import { useEffect, useState } from "react"
import SachModel from "../../../models/SachModel"
import { laySachBanChay, laySachMoiNhat } from "../../../api/SachAPI"
import SachProps from "./SachProps"

const SachMoi = () =>{
    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([])
    useEffect(() => {
        laySachMoiNhat()
        .then(response=>{
            setDanhSachQuyenSach(response.ketQua)
        }).catch(err=>console.log(err))
    
    }, [])
    return(
<div className="container mt-4 pb-5 pt-2 mb-4 px-5 bg-light">
    <h2 className="mt-4">SÁCH MỚI</h2>
    <hr></hr>
    <div className="row">
    {danhSachQuyenSach.map(sach=>(
        <SachProps sach={sach} key={sach.maSach}/>
    ))}
    </div>
</div>
)
}
export default SachMoi