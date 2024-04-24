import React, { useEffect, useState } from "react"
import SachModel from "../../../models/SachModel"
import { laySachBanChay } from "../../../api/SachAPI"
import SachProps from "./SachProps"
interface SachBanChayProps {

}
const SachBanChay: React.FC<SachBanChayProps> = (props) => {
    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([])
    useEffect(() => {
        laySachBanChay().then(
            (response) => {
                setDanhSachQuyenSach(response.ketQua)
            }
        ).catch((error) => {
            console.log(error.message);
        })
    }, [])
    return (
        <div className="container mt-4 pb-5 pt-2 mb-4 px-5 bg-light">
            <h2 className="mt-4">SÁCH BÁN CHẠY</h2>
            <hr></hr>
            <div className="row">

                {danhSachQuyenSach.map((sach) => (
                    <SachProps key={sach.maSach} sach={sach} />
                ))
                }

            </div>
        </div>
    )
}
export default SachBanChay