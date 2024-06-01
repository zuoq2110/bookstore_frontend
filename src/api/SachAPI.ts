import React from "react";
import SachModel from "../models/SachModel";
import { my_request } from "./Request";
import GioHangModel from "../models/GioHangModel";
import { layToanBoAnhCuaMotSach } from "./HinhAnhAPI";
import { getTheLoaiByMaSach } from "./TheLoaiAPI";
import TheLoaiModel from "../models/TheLoaiModel";

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
            tenTacGia: responseData[key].tenTacGia,
            trungBinhXepHang: responseData[key].trungBinhXepHang,
            giamGia: responseData[key].giamGia,
            soLuongDaBan: responseData[key].soLuongDaBan
        })

    }
    const bookList = await Promise.all(
        ketQua.map(async (book: SachModel) => {
            const imgList = await layToanBoAnhCuaMotSach(book.maSach)
            const thumbnail = imgList.filter(image => image.laIcon)
            return {
                ...book,
                thumbnail: thumbnail[0].duongDan
            }
        })
    )

    return { ketQua: bookList, tongSoTrang: tongSoTrang, tongSoSach: tongSoSach };
}

export async function layToanBoSach(size?: number, trang?: number): Promise<KetQuaInterface> {
    if (!size) {
        size = 8
    }
    const duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=${size}&page=${trang}`;
    return laySach(duongDan);
}

export async function lay3SachBanChayNhat(): Promise<SachModel[]> {
    const duongDan: string = `http://localhost:8080/sach?sort=soLuongDaBan,desc&size=3`;
    let bookList = await laySach(duongDan);

    let newBookList = await Promise.all(bookList.ketQua.map(async (book: any) => {
        const responseImg = await layToanBoAnhCuaMotSach(book.maSach)
        const thumbnail = responseImg.find(img => img.laIcon)

        return {
            ...book,
            thumbnail: thumbnail ? thumbnail.duongDan : null
        }
    }))
    return newBookList

}

export async function layToanBoSoLuongSach(): Promise<number> {
    const duongDan: string = `http://localhost:8080/sach/search/countBy`;
    return my_request(duongDan);
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
    } if ((tuKhoa === '' || tuKhoa !== '') && maTheLoai > 0) {
        duongDan = `http://localhost:8080/sach/search/findByDanhSachTheLoai_MaTheLoai?maTheLoai=${maTheLoai}&sort=maSach,desc&page=${trang}&size=8`;
    } if ((tuKhoa === '' || tuKhoa !== '') && maTheLoai > 0) {
        duongDan = `http://localhost:8080/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?maTheLoai=${maTheLoai}&tenSach=${tuKhoa}&sort=maSach,desc&page=${trang}&size=8`
    } if ((tuKhoa === '' || tuKhoa !== '') && (maTheLoai === 0 || maTheLoai > 0)) {
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
    } if (tuKhoa === '' && maTheLoai === 0) {
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

export async function layThongTin1SachTheoMaSach(maSach: number): Promise<SachModel> {
    const duongDan = `http://localhost:8080/sach/${maSach}`
   
    const response = await fetch(duongDan)
    const responseData = await response.json()
    const imgList = await layToanBoAnhCuaMotSach(maSach)
    const thumbnail = imgList.find((img)=>img.laIcon)
    const relatedImg = imgList.map((img)=>{
        return !img.laIcon?img.duongDan:null
    }).filter(Boolean)
    const danhSachTheLoaiName: TheLoaiModel[] = []
    const danhSachTheLoai = await getTheLoaiByMaSach(maSach)
    
    danhSachTheLoai.danhSachTheLoai.forEach((theLoai)=>{
       
        danhSachTheLoaiName.push(theLoai)
    })
    console.log(danhSachTheLoaiName)
    if (responseData) {
         return {
            maSach: responseData.maSach,
            tenSach: responseData.tenSach,
            giaBan: responseData.giaBan,
            giamGia: responseData.giamGia,
            giaNiemYet: responseData.giaNiemYet,
            tenTacGia: responseData.tenTacGia,
            moTa: responseData.moTa,
            soLuong: responseData.soLuong,
            soLuongDaBan: responseData.soLuongDaBan,
            trungBinhXepHang: responseData.trungBinhXepHang,
            danhSachTheLoai: danhSachTheLoaiName,
            anhLienQuan: relatedImg as string[],
            thumbnail: thumbnail?.duongDan 
        }
    }else{
        throw new Error(`error`)
    }
   
}