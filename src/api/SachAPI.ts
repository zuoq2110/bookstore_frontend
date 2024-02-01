import React from "react";
import SachModel from "../models/SachModel";
import { my_request } from "./Request";

interface KetQuaInterface {
    ketQua: SachModel[];
    tongSoTrang: number;
    tongSoSach: number;
}
async function laySach(duongDan: string): Promise<KetQuaInterface> {
    const ketQua: SachModel[] = [];

    const response = await my_request(duongDan);
    const responseData = response._embedded.saches;
    const tongSoTrang: number = response.page.totalPages;
    const tongSoSach: number = response.page.totalElements;

    for (const key in responseData) {
        ketQua.push({
            maSach: responseData[key].maSach,
            tenSach: responseData[key].tenSach,
            giaBan: responseData[key].giaBan,
            giaNiemYet: responseData[key].giaNiemYet,
            moTa: responseData[key].moTa,
            soLuong: responseData[key].soLuong,
            tenTacGia: responseData[key].tenSach,
            trungBinhXepHang: responseData[key].trungBinhXepHang,
        })

    }

    return { ketQua: ketQua, tongSoTrang: tongSoTrang, tongSoSach: tongSoSach };
}

export async function layToanBoSach(trang: number): Promise<KetQuaInterface> {
    const duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=${trang}`;
    return laySach(duongDan);
}

export async function lay3SachMoiNhat(): Promise<KetQuaInterface> {
    const duongDan: string = "http://localhost:8080/sach?sort=maSach,desc&page=0&size=3";
    return laySach(duongDan);
}

export async function timKiemSach(tuKhoa: string, maTheLoai: number, trang: number): Promise<KetQuaInterface> {
    let duongDan: string = "http://localhost:8080/sach?sort=maSach,desc&page=0&size=3";

    if (tuKhoa !== '' && maTheLoai == 0) {
        duongDan = `http://localhost:8080/sach/search/findByTenSachContaining?sort=maSach,desc&page=${trang}&size=8&tenSach=${tuKhoa}`;
    } else if (tuKhoa === '' && maTheLoai > 0) {
        duongDan = `http://localhost:8080/sach/search/findByDanhSachTheLoai_MaTheLoai?maTheLoai=${maTheLoai}&sort=maSach,desc&page=${trang}&size=8`;
    } else if (tuKhoa !== '' && maTheLoai > 0) {
        duongDan = `http://localhost:8080/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?maTheLoai=${maTheLoai}&tenSach=${tuKhoa}&sort=maSach,desc&page=${trang}&size=8`
    }
    return laySach(duongDan);
}

export async function laySachTheoMaSach(maSach: number): Promise<SachModel | null> {

    const duongDan = `http://localhost:8080/sach/${maSach}`
    let ketQua = SachModel
    try {
        
    const response = await fetch(duongDan)
    if (!response.ok) throw new Error('Gặp lỗi trong quá trình gọi API lấy sách!');
    const responseData = await response.json()
    if (responseData) {
        return {
            maSach: responseData.maSach,
            tenSach: responseData.tenSach,
            giaBan: responseData.giaBan,
            giaNiemYet: responseData.giaNiemYet,
            moTa: responseData.moTa,
            soLuong: responseData.soLuong,
            tenTacGia: responseData.tenTacGia,
            trungBinhXepHang: responseData.trungBinhXepHang
        }
    }else
    throw new Error('Sách không tồn tài!');
} catch (error) {
    console.error("Error", error);
    return null;
}
}