import React from "react";
import SachModel from "../models/SachModel";
import { my_request } from "./Request";
import GioHangModel from "../models/GioHangModel";

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
            giamGia: responseData[key].giamGia
        })

    }

    return { ketQua: ketQua, tongSoTrang: tongSoTrang, tongSoSach: tongSoSach };
}

export async function layToanBoSach(trang: number): Promise<KetQuaInterface> {
    const duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=${trang}`;
    return laySach(duongDan);
}
export async function laySachMoiNhat(): Promise<KetQuaInterface> {
    const duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=4`;
    return laySach(duongDan);
}

export async function lay3SachMoiNhat(): Promise<KetQuaInterface> {
    const duongDan: string = "http://localhost:8080/sach?sort=maSach,desc&page=0&size=3";
    return laySach(duongDan);
}

export async function laySachBanChay(): Promise<KetQuaInterface> {
    const duongDan = `http://localhost:8080/sach?size=4&sort=soLuongDaBan,desc`
    return laySach(duongDan)
}

export async function timKiemSach(filter: number | undefined, tuKhoa: string, maTheLoai: number, trang: number): Promise<KetQuaInterface> {
    let duongDan: string = "http://localhost:8080/sach?sort=maSach,desc&page=0&size=8";
    
    if (tuKhoa !== '' && maTheLoai == 0) {
        duongDan = `http://localhost:8080/sach/search/findByTenSachContaining?sort=maSach,desc&page=${trang}&size=8&tenSach=${tuKhoa}`;
    }  if ((tuKhoa === ''||tuKhoa!=='') && maTheLoai > 0) {
        duongDan = `http://localhost:8080/sach/search/findByDanhSachTheLoai_MaTheLoai?maTheLoai=${maTheLoai}&sort=maSach,desc&page=${trang}&size=8`;
    }  if ((tuKhoa === ''||tuKhoa!=='') && maTheLoai > 0) {
        duongDan = `http://localhost:8080/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?maTheLoai=${maTheLoai}&tenSach=${tuKhoa}&sort=maSach,desc&page=${trang}&size=8`
    }  if ((tuKhoa === ''||tuKhoa!=='') && (maTheLoai === 0||maTheLoai>0) ) {
        console.log("vcl")
        if (filter === 1) {
            duongDan = `http://localhost:8080/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?maTheLoai=${maTheLoai}&tenSach=${tuKhoa}&sort=giaBan,desc&page=${trang}&size=8`
        }
        else if (filter === 2) {
            duongDan = `http://localhost:8080/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?maTheLoai=${maTheLoai}&tenSach=${tuKhoa}&sort=giaBan,asc&page=${trang}&size=8`
        }
        else if (filter === 3) {
            duongDan = `http://localhost:8080/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?maTheLoai=${maTheLoai}&tenSach=${tuKhoa}&sort=tenSach,asc&page=${trang}&size=8`
        }
    }if (tuKhoa === '' && maTheLoai === 0){
        if (filter === 1) {
            duongDan = `http://localhost:8080/sach?sort=giaBan,desc&page=${trang}&size=8`
        }
        else if (filter === 2) {
            duongDan = `http://localhost:8080/sach?sort=giaBan,asc&page=${trang}&size=8`
        }
        else if (filter === 3) {
            duongDan = `http://localhost:8080/sach?sort=tenSach,asc&page=${trang}&size=8`
        }
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
                trungBinhXepHang: responseData.trungBinhXepHang,
                giamGia: responseData.giamGia
            }
        } else
            throw new Error('Sách không tồn tài!');
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}

export async function laySachByMaGioHang(maGioHang: number): Promise<SachModel | null> {
    const duongDan = `http://localhost:8080/gio-hang/${maGioHang}/sach`
    try {
        const response = await my_request(duongDan)
        if (response) {
            return response
        } else {
            throw new Error("sách không tồn tại")
        }
    }
    catch (err) {
        console.log(err)
        return null
    }

}