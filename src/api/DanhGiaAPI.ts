import React from "react";
import DanhGiaModel from "../models/DanhGiaModel";
import { my_request } from "./Request";


export async function layDanhGia(duongDan: string): Promise<DanhGiaModel[]>{
    const ketQua: DanhGiaModel[] = [];

    const response = await my_request(duongDan);
    const responseData = response._embedded.suDanhGias;
    for(const key in responseData){
        ketQua.push({
            maDanhGia: responseData[key].maDanhGia,
            diemXepHang: responseData[key].diemXepHang,
            nhanXet: responseData[key].nhanXet,
            timestamp: responseData[key].timestamp
        })
       
    }

    return ketQua;
}

export async function layToanBoDanhGiaCuaMotSach(maSach: number): Promise<DanhGiaModel[]>{
    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachSuDanhGia`;
    return layDanhGia(duongDan);
}
export async function lay1DanhGiaCuaMotSach(maSach: number): Promise<DanhGiaModel[]>{
    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachSuDanhGia?sort=maDanhGia,asc&page=0&size=1`;
    return layDanhGia(duongDan);
}
