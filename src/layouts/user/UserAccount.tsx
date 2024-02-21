import { JwtPayload, jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import RequireUser from "./RequireUser"
import Avatar from "react-avatar"
import { Button, Form } from "react-bootstrap"
import { Lay1NguoiDungTheoID } from "../../api/NguoiDungAPI"
import NguoiDungModel from "../../models/NguoiDungModel"

export interface JwtPayLoad {
    id: any;

}

const UserAccount = () => {
    const [user, setUser] = useState<NguoiDungModel>({
        maNguoiDung: 0,
        hoDem: "",
        soDienThoai: "",
        tenDangNhap: "",
        ten: "",
        email: "",
        gioiTinh: "",
        diaChiGiaoHang: "",
        diaChiMuaHang: ""
    })

    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log(token)
        if (token) {
            const userData = jwtDecode(token) as JwtPayLoad
            const idUser = userData.id
            Lay1NguoiDungTheoID(idUser)
                .then(response => {
                    setUser(response)

                })
                .catch(error => {
                    console.log(error)
                })

        }
    }, [])
    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <div className='bg-light rounded py-3 me-lg-2 me-md-0 me-sm-0'>
                        <div className='d-flex align-items-center justify-content-center flex-column'>
                            <Avatar
                                style={{ fontSize: "50px" }}

                            />

                            <Button variant="primary" className="mt-3">Upload Avatar</Button>


                        </div>

                    </div>

                </div>
                <div className="col-9">
                    <div
                        className='bg-light rounded px-2 ms-lg-2 ms-md-0 ms-sm-0 mt-lg-0 mt-md-3 mt-sm-3'
                        style={{ minHeight: "300px" }}
                    >
                        <h3 className="mt-3">Thông tin cá nhân</h3>
                        <hr />
                        <div className='row form'>
                            <div className='col-sm-12 col-md-6 col-lg-4'>
                               
                                <input className="form-control mt-3" type="number" aria-label="id" readOnly value={user.maNguoiDung} />
                                <input className="form-control mt-3" type="text" readOnly value={user.hoDem} />
                                <input className="form-control mt-3" type="text" readOnly value={user.soDienThoai} />

                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-4'>
                                <input className="form-control mt-3" type="text" readOnly value={user.tenDangNhap} />
                                <input className="form-control mt-3" type="text" readOnly value={user.ten} />
                                <input className="form-control mt-3" type="text" readOnly value={user.diaChiGiaoHang} />
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-4'>
                                <input className="form-control mt-3" type="email" readOnly value={user.email} />
                                <input className="form-control mt-3" type="text" readOnly value={user.diaChiMuaHang} />
                                <div className=" mt-4">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                                  checked={user.gioiTinh=="M"}/>
                                        <label className="form-check-label" >
                                           Nam
                                        </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                   checked={user.gioiTinh=="F"}/>
                                        <label className="form-check-label">
                                            Nữ
                                        </label>
                                </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const UserCheck = RequireUser(UserAccount)
export default UserCheck