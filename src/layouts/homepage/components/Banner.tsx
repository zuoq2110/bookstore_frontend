import React from "react";
import { Link } from "react-router-dom";
import "./Banner.css"
import { Button } from "@mui/material";
function Banner() {
    return (
        <div className=" mb-2">
            <div className="container-fluid text-dark py-5 d-flex
      justify-content-center">
                <div>
                    <h3
                        data-text='Đọc sách là hộ chiếu cho vô số cuộc phiêu lưu
            '
                        className="display-5 fw-bold banner-text">
                        <span>Đọc sách là hộ chiếu cho vô số cuộc phiêu lưu</span>
                    </h3>

                    <p className="mt-4 float-start">Mary Pope Osborne</p>
                    <Link to={"/kho-sach"}>
                        <Button variant="contained"
                         className="btn float-end btn-lg m-5">Xem thêm tại Bookstore.vn</Button>
                    </Link>
                </div>
            </div>

        </div>
    );
}
export default Banner;