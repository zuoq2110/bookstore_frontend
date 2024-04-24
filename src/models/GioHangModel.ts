import SachModel from "./SachModel";

class GioHangModel{
    maGioHang?: number;
    soLuong: number;
    sach: SachModel;
    review?: boolean

    constructor(
        soLuong: number,
        sach: SachModel
    ){
        this.soLuong = soLuong;
        this.sach = sach;
    }
}

export default GioHangModel