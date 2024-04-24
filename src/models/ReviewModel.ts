class ReviewModel {
    maDanhGia: number;
    nhanXet: string;
    diemXepHang: number;
    timestamp?: string;

    constructor(maDanhGia: number,
        nhanXet: string,
        diemXepHang: number,) {
        this.maDanhGia = maDanhGia;
        this.nhanXet = nhanXet;
        this.diemXepHang = diemXepHang
    }
}
export default ReviewModel