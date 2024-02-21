import NguoiDungModel from "../models/NguoiDungModel";

export async function Lay1NguoiDungTheoID(id: number): Promise<NguoiDungModel> {
    const duongDan = `http://localhost:8080/nguoi-dung/${id}`

    const response = await fetch(duongDan)
    const responseData = await response.json()

    const nguoiDung: NguoiDungModel = {
        maNguoiDung: responseData.maNguoiDung,
        diaChiGiaoHang: responseData.diaChiGiaoHang,
        diaChiMuaHang: responseData.diaChiMuaHang,
        email: responseData.email,
        hoDem: responseData.hoDem,
        tenDangNhap: responseData.tenDangNhap,
        ten: responseData.ten,
        soDienThoai: responseData.soDienThoai,
        gioiTinh: responseData.gioiTinh,
        avatar: responseData.avatar,

        
    }
    return nguoiDung
}