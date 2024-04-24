import TheLoaiModel from "../models/TheLoaiModel";
import { my_request } from "./Request";

interface ketQuaInterface{
    danhSachTheLoai: TheLoaiModel[]
}
export async function layTheLoai(duongDan: string): Promise<TheLoaiModel[]>{
    const response = await my_request(duongDan)
    const DanhSachTheLoai = response._embedded.theLoais.map((theLoaiData: any)=>({
        ...theLoaiData
    }))
    return DanhSachTheLoai
}

export async function getTheLoaiByMaSach(maSach: number): Promise<TheLoaiModel[]>{
    const duongDan = `http://localhost:8080/sach/${maSach}/danhSachTheLoai`
    return layTheLoai(duongDan)
}
export async function layToanBoTheLoai(): Promise<TheLoaiModel[]>{
    const duongDan = `http://localhost:8080/the-loai`
    return layTheLoai(duongDan)
}
