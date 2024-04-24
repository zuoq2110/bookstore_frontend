import React from "react";
import { Link } from "react-router-dom";
function Banner(){
    return (
<div className=" mb-2">
    <div className="container-fluid text-dark py-5 d-flex
      justify-content-center ">
        <div>
            <h3 className="display-5 fw-bold"> Đọc sách chính là hộ chiếu <br/> cho vô số cuộc phiêu lưu</h3>
            <p className="float-start">Mary Pope Osborne</p>
            <Link to={"/kho-sach"}>
            <button className="btn btn-primary float-end btn-lg m-5">Xem thêm tại Bookstore.vn</button>
            </Link>
        </div>
    </div>
  
</div>
    );
}
export default Banner;