import QuyenModel from "../models/QuyenModel";
import { my_request } from "./Request";

export async function layTatCaQuyen(): Promise<QuyenModel[]> {
    const duongDan = `http://localhost:8080/quyen`

    const response =  await my_request(duongDan)
    const danhSachQuyen = response._embedded.quyens.map((quyen: any) => ({
        ...quyen
    }))
    return danhSachQuyen
}

export async function layQuyenTheoMaNguoiDung(maNguoiDung: any): Promise<QuyenModel> {
    const duongDan = `http://localhost:8080/nguoi-dung/${maNguoiDung}/danhSachQuyen`

    const response =  await my_request(duongDan)
    const danhSachQuyen = response._embedded.quyens.map((quyen: any) => ({
        ...quyen
    }))
    return danhSachQuyen[0]
}