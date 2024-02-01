import React from "react";
import { my_request } from "./Request";
import HinHAnhModel from "../models/HinhAnhModel";

export async function layHinhAnh(duongDan: string): Promise<HinHAnhModel[]>{
    const ketQua: HinHAnhModel[] = [];

    const response = await my_request(duongDan);
    const responseData = response._embedded.hinhAnhs;
    for(const key in responseData){
        ketQua.push({
            maHinhAnh: responseData[key].maHinhAnh,
            tenHinhAnh: responseData[key].tenHinhAnh,
            laIcon: responseData[key].laIcon,
            duongDan: responseData[key].duongDan,
            duLieuAnh: responseData[key].duLieuAnh,
        })
       
    }

    return ketQua;
}

export async function layToanBoAnhCuaMotSach(maSach: number): Promise<HinHAnhModel[]>{
    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;
    return layHinhAnh(duongDan);
}

export async function lay1AnhCuaMotSach(maSach: number): Promise<HinHAnhModel[]>{
    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh?sort=maHinhAnh,asc&page=0&size=1`;
    return layHinhAnh(duongDan);
}
