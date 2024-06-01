import { useParams } from "react-router-dom";
import { laySachTheoMaSach } from "../../api/SachAPI";
import { useEffect, useState } from "react";
import SachModel from "../../models/SachModel";
import HinhAnhSanPham from "./components/HinhAnhSanPham";
import DanhGiaSanPham from "./DanhGiaSanPham";
import renderRating from "../utils/renderRating";
import dinhDangSo from "../utils/DinhDangSo";
import TheLoaiModel from "../../models/TheLoaiModel";
import { getTheLoaiByMaSach } from "../../api/TheLoaiAPI";
import ChonSoLuong from "./components/ChonSoLuong";
import { useGioHangItem } from "../utils/GioHangContext";
import { getIdUserByToken, isToken } from "../utils/JwtService";
import TextEllipsis from "./components/textEllipsis/TextEllipsis";
import { toast } from "react-toastify";
import CheckOutPage from "./Checkout/CheckoutPage";
import GioHangModel from "../../models/GioHangModel";
import { layToanBoDanhGiaCuaMotSach } from "../../api/DanhGiaAPI";
import DanhGiaModel from "../../models/DanhGiaModel";


const ChiTietSanPham: React.FC = () => {
    const { maSach } = useParams();
    const { gioHangList, setTongGioHang } = useGioHangItem()
    const [theLoai, setTheLoai] = useState<TheLoaiModel[]>()
    const [isCheckout, setIsCheckout] = useState(false);
    const [tongTien, setTongTien] = useState(0)
    const [muaNgay, setMuaNgay] = useState(true);
    useEffect(() => {
        getTheLoaiByMaSach(maSachNumber).then(response => {
            setTheLoai(response.danhSachTheLoai)
        })
    })
    let maSachNumber = 0
    try {
        maSachNumber = parseInt(maSach + '')
    } catch (error) {
        maSachNumber = 0
    }
    if (Number.isNaN(maSachNumber)) {
        maSachNumber = 0
    }

    const [sach, setSach] = useState<SachModel | null>(null)
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [soLuong, setSoLuong] = useState(1);
   
    const giamSoLuong = () => {
        if (soLuong > 1) {
            setSoLuong(soLuong - 1)
        }
    }
    const tangSoLuong = () => {
        const soLuongTonKho = sach && sach.soLuong ? sach.soLuong : 0;
        if (soLuong < soLuongTonKho) {
            setSoLuong(soLuong + 1)
        }
    }

    const [gioHang, setGioHang] = useState<GioHangModel[]>([])
    const handleMuaNgay = (sach: SachModel) => {
        setGioHang([{ sach, soLuong }])
        setIsCheckout(true)
        setTongTien(sach.giaBan * soLuong)
    }
    const handleThemVaoGioHang = async (sachMoi: SachModel) => {
        const sachDaTonTai = gioHangList.find((item) =>
            item.sach.maSach === sachMoi.maSach
        )
        if (sachDaTonTai) {
            sachDaTonTai.soLuong += soLuong;
            if (isToken()) {
                const request = {
                    maGioHang: sachDaTonTai.maGioHang,
                    soLuong: sachDaTonTai.soLuong
                }
                const token = localStorage.getItem('token')
                fetch(`http://localhost:8080/gio-hang/cap-nhat`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(request)
                }).catch(err => console.log(err));
            }
        } else {
            if (isToken()) {
                try {
                    const request = [{
                        soLuong: soLuong,
                        sach: sachMoi,
                        maNguoiDung: getIdUserByToken()
                    }]
                    const token = localStorage.getItem("token")
                    const response = await fetch(`http://localhost:8080/gio-hang/them`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(request)
                    })

                    if (response.ok) {
                        const maGioHang = await response.json()
                        gioHangList.push({
                            maGioHang: maGioHang,
                            soLuong: soLuong,
                            sach: sachMoi
                        })
                        console.log(response)
                        toast.success("Thêm vào giỏ hàng thành công")
                    }
                } catch (error) {
                    console.log(error)
                }
            } else {
                gioHangList.push({
                    soLuong: soLuong,
                    sach: sachMoi
                })
            }
        }
        localStorage.setItem("cart", JSON.stringify(gioHangList))

        setTongGioHang(gioHangList.length)
    }

   
    useEffect(() => {
        laySachTheoMaSach(maSachNumber).then(data => {
            setSach(data);
            setDangTaiDuLieu(false);
        }).catch(
            error => {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }
        );
    }, [])
    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }
    if (!sach) {
        return (
            <div>
                <h1>Sách không tồn tại!</h1>
            </div>
        );
    }

    return (
        <>
            {!isCheckout ?
                <div className="">
                    <div className="container bg-light rounded">
                        <div className="row mt-4 mb-4 mx-2 ">
                            <div className="col-lg-4 col-md-4 col-sm-12 mt-4 ">
                                <HinhAnhSanPham maSach={maSachNumber} />
                            </div>
                            <div className="col-8 mt-4">
                                <div className="row">

                                    <div className="col-lg-8 col-md-8 col-sm-12">
                                        <h2>
                                            {sach.tenSach}
                                        </h2>
                                        <div className="d-flex">
                                            <p className="me-5">Thể loại:{" "}
                                                <strong>
                                                    {theLoai?.map(theLoai => theLoai.tenTheLoai)}
                                                </strong></p>
                                            <p className="ms-5">Tác giả:{" "}
                                                <strong>
                                                    {sach.tenTacGia}
                                                </strong></p>
                                        </div>
                                        <div className="d-flex">
                                            <div>
                                                {renderRating(sach.trungBinhXepHang ? sach.trungBinhXepHang : 0)}
                                            </div>
                                            <p className="text-danger ms-2">
                                                ({sach.trungBinhXepHang})
                                            </p>
                                            <span className='mx-3 mb-1 text-secondary'>
                                                |
                                            </span>
                                            <span style={{
                                                color: "rgb(135,135,135)",
                                                fontSize: "16px",
                                            }}>Đã bán</span>
                                            <span className="fw-bold ms-2">{sach.soLuong}</span>
                                        </div>
                                        <div className="text-start">
                                            <span className=" text-danger me-3">
                                                <strong style={{ fontSize: "32px" }}>
                                                    {sach.giaBan.toLocaleString()}đ
                                                </strong>

                                            </span>
                                            <span className=" small me-3">
                                                <strong>
                                                    <del>{sach.giaNiemYet?.toLocaleString()}</del>
                                                </strong>
                                            </span>
                                            <h4 className="my-0 d-inline-block">
                                                <span className="badge bg-danger">
                                                    {sach.giamGia}%
                                                </span>
                                            </h4>
                                        </div>
                                        <div className="mt-3">
                                            <p className="text-start">
                                                Vận chuyển tới:{" "}
                                                <strong>Tổ 1 Thị trấn Đông Anh, Hà Nội{" "}</strong>
                                                <span className="ms-3 text-primary" style={{ cursor: "pointer" }}>
                                                    Thay đổi
                                                </span>
                                            </p>
                                            <div className="d-flex align-items-center mt-3">
                                                <img src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/d9e992985b18d96aab90969636ebfd0e.png'
                                                    height='20'
                                                    alt='free ship'>
                                                </img>
                                                <span className="ms-3">Miễn phí vận chuyển</span>
                                            </div>
                                        </div>
                                        <hr />
                                        <TextEllipsis
                                            text={sach.moTa}
                                            isShow={true}
                                        />
                                    </div>
                                    <div className="col-4 ">

                                        <div className="mb-2 text-start">Số lượng</div>
                                        <div className="d-flex align-items-center">
                                            <ChonSoLuong
                                                max={sach.soLuong}
                                                soLuong={soLuong}
                                                setSoLuong={setSoLuong}
                                                them={tangSoLuong}
                                                giam={giamSoLuong}
                                            />
                                            <span className="ms-3">{sach.soLuong} sản phẩm có sẵn</span>
                                        </div>
                                        {sach.giaBan && <div className="mt-2 text-start">
                                            Số tiền tạm tính <br />
                                            <h4>{dinhDangSo(soLuong * sach.giaBan)} đ</h4>
                                        </div>}
                                        <div className="d-grid gap-2">
                                            <button type="button" className="btn btn-danger mt-3" onClick={() => handleMuaNgay(sach)}>Mua ngay</button>
                                            <button type="button" className="btn btn-outline-secondary mt-2" onClick={() => handleThemVaoGioHang(sach)}>Thêm vào giỏ hàng</button>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="container bg-light rounded">
                        
                        <div className="row mt-4 mb-4">
                            <DanhGiaSanPham maSach={maSachNumber} />
                        </div>
                    </div>
                </div>
                : <CheckOutPage muaNgay={muaNgay} gioHangList={gioHang} setIsCheckout={setIsCheckout} tongTien={tongTien} />}
        </>
    );
}
export default ChiTietSanPham;