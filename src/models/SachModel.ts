class SachModel {
    maSach: number;
    tenSach?: string; // có thể bị NULL
    giaBan: number;
    giaNiemYet?: number;
    moTa: string;
    soLuong: number;
    tenTacGia?: string;
    trungBinhXepHang?: number;
    giamGia: number

    constructor(maSach: number,
        tenSach: string, // có thể bị NULL
        giaBan: number,
        giaNiemYet: number,
        moTa: string,
        soLuong: number,
        tenTacGia: string,
        trungBinhXepHang: number,
        giamGia: number) {
        this.maSach = maSach;
        this.tenSach = tenSach;
        this.giaBan = giaBan;
        this.giaNiemYet = giaNiemYet;
        this.moTa = moTa;
        this.soLuong = soLuong;
        this.tenTacGia = tenTacGia;
        this.trungBinhXepHang = trungBinhXepHang;
        this.giamGia = giamGia;

    }

}
export default SachModel;