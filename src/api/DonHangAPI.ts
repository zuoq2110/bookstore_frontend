import DonHangModel from "../models/DonHangModel";
import GioHangModel from "../models/GioHangModel";
import { my_request } from "./Request";

export async function layToanBoDonHang(duongDan: string): Promise<DonHangModel[]> {

    const response = await my_request(duongDan)
    const responseData = await response._embedded.donHangs;

    const danhSachDonHang: DonHangModel[] = await Promise.all(responseData.map(async (item: any) => {
        const nguoiDungResponse = await my_request(`http://localhost:8080/don-hang/${item.maDonHang}/nguoiDung`)
        const hinhThucThanhToanResponse = await my_request(`http://localhost:8080/don-hang/${item.maDonHang}/hinhThucThanhToan`)
        const donHang: DonHangModel = {
            maDonHang: item.maDonHang,
            diaChiGiaoHang: item.diaChiGiaoHang,
            tongTien: item.tongTien,
            tongTienSanPham: item.tongTienSanPham,
            chiPhiGiaoHang: item.chiPhiGiaoHang,
            chiPhiThanhToan: item.chiPhiThanhToan,
            ngayTao: item.ngayTao,
            tinhTrangDonHang: item.tinhTrangDonHang,
            nguoiDung: nguoiDungResponse,
            hoVaTen: item.hoVaTen,
            ghiChu: item.ghiChu,
            hinhThucThanhToan: hinhThucThanhToanResponse.tenHinhThucThanhToan,

        }
        return donHang
    }))


    return danhSachDonHang

}

export async function layToanBoDonHangById(id: number): Promise<DonHangModel[]> {
    const duongDan = `http://localhost:8080/nguoi-dung/${id}/danhSachDonHang`
    return layToanBoDonHang(duongDan)
}

export async function lay1DonHangByMaDonHang(id: number): Promise<DonHangModel> {
    const duongDan = `http://localhost:8080/don-hang/${id}`
    const responseData = await my_request(duongDan)
    const nguoiDungResponse = await my_request(`http://localhost:8080/don-hang/${responseData.maDonHang}/nguoiDung`)
    const hinhThucThanhToanResponse = await my_request(`http://localhost:8080/don-hang/${responseData.maDonHang}/hinhThucThanhToan`)
    const chiTietDonHangResponse = await my_request(`http://localhost:8080/don-hang/${responseData.maDonHang}/danhSachChiTietDonHang`)
    const gioHangList: GioHangModel[] =[]
     await Promise.all(chiTietDonHangResponse._embedded.chiTietDonHangs.map(async (item: any) => {
        const sachResponse = await my_request(`http://localhost:8080/chi-tiet-don-hang/${item.chiTietDonHang}/sach`)
        gioHangList.push({ sach: sachResponse, soLuong: item.soLuong, review: item.review });
    }))
    const donHang: DonHangModel = {
        maDonHang: responseData.maDonHang,
        diaChiGiaoHang: responseData.diaChiGiaoHang,
        tongTien: responseData.tongTien,
        tongTienSanPham: responseData.tongTienSanPham,
        chiPhiGiaoHang: responseData.chiPhiGiaoHang,
        chiPhiThanhToan: responseData.chiPhiThanhToan,
        ngayTao: responseData.ngayTao,
        tinhTrangDonHang: responseData.tinhTrangDonHang,
        nguoiDung: nguoiDungResponse,
        hoVaTen: responseData.hoVaTen,
        ghiChu: responseData.ghiChu,
        hinhThucThanhToan: hinhThucThanhToanResponse.tenHinhThucThanhToan,
        gioHangList: gioHangList
    }
    return donHang
}