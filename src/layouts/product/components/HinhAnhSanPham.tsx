
import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinHAnhModel from "../../../models/HinhAnhModel";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from "react-responsive-carousel";

interface HinhAnhSanPhamInterface {
    maSach: number;
}

const HinhAnhSanPham: React.FC<HinhAnhSanPhamInterface> = (props) => {
    const [danhSachAnh, setDanhSachAnh] = useState<HinHAnhModel[]>([])
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true)
    const [baoLoi, setBaoLoi] = useState(null)

  
    useEffect(() => {
        layToanBoAnhCuaMotSach(props.maSach).then(HinhAnhdata => {
            setDanhSachAnh(HinhAnhdata);
           
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
   
    return (
        <div className="container">
        <div className="row">
            <Carousel showArrows={true} showIndicators={true} animationHandler={"slide"} infiniteLoop >
            {
                danhSachAnh.map((hinhAnh, index)=>(
                    <div key={index}>
                        <img src={hinhAnh.duLieuAnh} alt={hinhAnh.tenHinhAnh} style={{maxWidth:'250px'}}></img>
                    </div>
                ))
            }
            </Carousel>
        </div>
        
     </div>
    );
}
export default HinhAnhSanPham;