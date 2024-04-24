import GioHangModel from "./GioHangModel";
import NguoiDungModel from "./NguoiDungModel";

class DonHangModel{
    maDonHang: number;
    diaChiGiaoHang: string;
    tongTien: number;
    tongTienSanPham: number;
    chiPhiGiaoHang: number;
    chiPhiThanhToan: number;
    ngayTao: Date;
    tinhTrangDonHang: string;
    nguoiDung?: NguoiDungModel;
    hoVaTen?: string;
    soDienThoai?: string;
    ghiChu?: string;
    hinhThucThanhToan?: number;
gioHangList?: GioHangModel[] 
    constructor(maDonHang: number,
        diaChiGiaoHang: string,
        tongTien: number,
        tongTienSanPham: number,
        chiPhiGiaoHang: number,
        chiPhiThanhToan: number,
        ngayTao: Date,
        tinhTrangDonHang: string,
        nguoiDung: NguoiDungModel,
        hoVaTen: string,
        soDienThoai: string,
        ghiChu: string,
        hinhThucThanhToan: number,){
            this.maDonHang = maDonHang;
            this.diaChiGiaoHang = diaChiGiaoHang;
            this.tongTien = tongTien;
            this.ngayTao = ngayTao;
            this.tinhTrangDonHang = tinhTrangDonHang;
            this.chiPhiGiaoHang = chiPhiGiaoHang;
            this.chiPhiThanhToan = chiPhiThanhToan;
            this.tongTienSanPham = tongTienSanPham;
            this.nguoiDung = nguoiDung
        }

}

export default DonHangModel