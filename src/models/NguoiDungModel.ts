class NguoiDungModel {
    maNguoiDung: number;
    diaChiGiaoHang: string;
    diaChiMuaHang?: string;
    email: string;
    hoDem?: string;
    tenDangNhap?: string;
    ten: string;
    soDienThoai: string;
    gioiTinh: string;
    matKhau?: string;
    avatar: string;
    ngaySinh: Date


    constructor(
        maNguoiDung: number,
        diaChiGiaoHang: string,
        diaChiMuaHang: string,
        email: string,
        hoDem: string,
        tenDangNhap: string,
        ten: string,
        soDienThoai: string,
        gioiTinh: string,
        matKhau: string,
        ngaySinh: Date,
        avatar: string) {
        this.maNguoiDung = maNguoiDung;
        this.diaChiGiaoHang = diaChiGiaoHang;
        this.diaChiMuaHang = diaChiMuaHang;
        this.email = email;
        this.hoDem = hoDem;
        this.tenDangNhap = tenDangNhap;
        this.ten = ten;
        this.soDienThoai = soDienThoai;
        this.gioiTinh = gioiTinh;
        this.matKhau = matKhau;
        this.ngaySinh=ngaySinh
        this.avatar = avatar;
    }

}
export default NguoiDungModel