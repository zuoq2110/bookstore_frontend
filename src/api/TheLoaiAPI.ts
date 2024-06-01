import TheLoaiModel from "../models/TheLoaiModel";
import { my_request } from "./Request";

interface ketQuaInterface{
    danhSachTheLoai: TheLoaiModel[]
    theLoai: TheLoaiModel
}
export async function layTheLoai(duongDan: string): Promise<ketQuaInterface>{
    const response = await my_request(duongDan)
    const DanhSachTheLoai = response._embedded.theLoais.map((theLoaiData: any)=>({
        ...theLoaiData
    }))
    return {danhSachTheLoai: DanhSachTheLoai, theLoai: response.theLoai}
}

export async function getTheLoaiByMaSach(maSach: number): Promise<ketQuaInterface>{
    const duongDan = `http://localhost:8080/sach/${maSach}/danhSachTheLoai`
    return layTheLoai(duongDan)
}
export async function layToanBoTheLoai(): Promise<ketQuaInterface>{
    const duongDan = `http://localhost:8080/the-loai`
    return layTheLoai(duongDan)
}

export async function lay1TheLoaiTheoMaTheLoai(maTheLoai: number): Promise<ketQuaInterface>{
    const duongDan = `http://localhost:8080/the-loai/${maTheLoai}`
    const response = await my_request(duongDan)
    return {theLoai: response, danhSachTheLoai: response}
}

