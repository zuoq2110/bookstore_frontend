import DanhGiaModel from "../models/DanhGiaModel";
import NguoiDungModel from "../models/NguoiDungModel";
import { layQuyenTheoMaNguoiDung, layTatCaQuyen } from "./QuyenAPI";
import { my_request } from "./Request";

export async function Lay1NguoiDungTheoID(id: number): Promise<NguoiDungModel> {
    const duongDan = `http://localhost:8080/nguoi-dung/${id}`

    const response = await fetch(duongDan)
    const responseData = await response.json()
    const responseQuyen = await layQuyenTheoMaNguoiDung(id)
    const nguoiDung: NguoiDungModel = {
        maNguoiDung: responseData.maNguoiDung,
        diaChiGiaoHang: responseData.diaChiGiaoHang,
        diaChiMuaHang: responseData.diaChiMuaHang,
        email: responseData.email,
        hoDem: responseData.hoDem,
        matKhau: responseData.matKhau,
        quyen: responseQuyen.maQuyen,
        tenDangNhap: responseData.tenDangNhap,
        ten: responseData.ten,
        soDienThoai: responseData.soDienThoai,
        gioiTinh: responseData.gioiTinh,
        avatar: responseData.avatar,
        ngaySinh: responseData.ngaySinh

    }
    return nguoiDung
}

export async function layNguoiDungTheoMaDanhGia(maDanhGia: number): Promise<NguoiDungModel> {
    const duongDan = `http://localhost:8080/su-danh-gia/${maDanhGia}/nguoiDung`
    const response = await my_request(duongDan)
    return response;
}

export async function layToanBoNguoiDungTheoRole(): Promise<NguoiDungModel[]> {
    const duongDan = `http://localhost:8080/quyen`
    const response = await my_request(duongDan)

    const data = response._embedded.quyens.map((quyenData: any)=>{
        const danhSachNguoiDung = quyenData._embedded.danhSachNguoiDung.map((nguoiDung: any)=>{
            const nguoiDungData: NguoiDungModel = {
                maNguoiDung: nguoiDung.maNguoiDung,
                avatar: nguoiDung.avatar,
                ngaySinh: nguoiDung.ngaySinh,
                diaChiGiaoHang: nguoiDung.diaChiGiaoHang,
                email: nguoiDung.email,
                matKhau: nguoiDung.matKhau,
                ten: nguoiDung.ten,
                hoDem: nguoiDung.hoDem,
                gioiTinh: nguoiDung.gioiTinh,
                soDienThoai: nguoiDung.soDienThoai,
                tenDangNhap: nguoiDung.tenDangNhap,
                quyen: quyenData.tenQuyen
            }
            return nguoiDungData
        })
        return danhSachNguoiDung
    })
    return data;
}