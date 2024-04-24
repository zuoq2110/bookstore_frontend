import { useEffect, useState } from "react"
import SachModel from "../../../models/SachModel"
import { getIdUserByToken } from "../../utils/JwtService"
import { laySachTheoMaSach } from "../../../api/SachAPI"
import SachProps from "./SachProps"
import { Button } from "@mui/material"
import { Link } from "react-router-dom"

const SachYeuThich = () => {
    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([])

    useEffect(() => {
        const maNguoiDung = getIdUserByToken()
        fetch(`http://localhost:8080/sach-yeu-thich/lay-sach/${maNguoiDung}`)
            .then((response) =>
                response.json()
            )
            .then((maSachList) => {
                const danhSachSach = maSachList.map((maSach: any) => {
                    return laySachTheoMaSach(maSach)

                }
                )
                return Promise.all(danhSachSach)
            })
            .then((sach) => {
                setDanhSachQuyenSach(sach)
                console.log(danhSachQuyenSach)
            }).catch(error => {
                console.log(error)
            })

    })
    return (
        <div className="container my-5 bg-light p-5">

            <h2 className="mt-4 px-3 ">SÁCH YÊU THÍCH</h2>
            <hr></hr>
            <div className="row">
                {danhSachQuyenSach.length > 0 ? (
                    danhSachQuyenSach.map(sach => (
                        <SachProps key={sach.maSach} sach={sach} />
                    ))
                ) : (
                    <div>
                        <div className="text-center my-5">
                            <h4>Bạn chưa yêu thích quyển sách nào</h4>
                            <Link to={`/kho-sach`}>
                                <Button variant="contained" className="mt-5">Kho sách</Button>
                            </Link>

                        </div>
                    </div>
                )
                }
            </div>

        </div>
    )
}
export default SachYeuThich