import React, { FormEvent, useEffect, useState } from "react"
import GioHangModel from "../../../../models/GioHangModel"
import { Button, TextField, Typography } from "@mui/material"
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import { getIdUserByToken } from "../../../utils/JwtService";

interface ReviewFormProps {
    maDonHang?: number
    maSach?: number
    handleCloseModal?: any
    handleCloseModalChiTietDonHang?: any
    gioHangItem?: GioHangModel
    setGioHangItem?: any
}

const ReviewForm: React.FC<ReviewFormProps> = (props) => {
    const [maDanhGia, setMaDanhGia] = useState(0);
    const [ratingValue, setRatingValue] = useState(0);
    const [content, setContent] = useState("");

    const handleRating = (rate: number) => {
        setRatingValue(rate)
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const duongDan = props.gioHangItem?.review ?
            `http://localhost:8080/su-danh-gia/cap-nhat` :
            `http://localhost:8080/su-danh-gia/them`
        const method = props.gioHangItem?.review ? 'put' : 'post'
        fetch(duongDan, {
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                maDanhGia,
                maNguoiDung: getIdUserByToken(),
                maDonHang: props.maDonHang,
                maSach: props.maSach,
                diemXepHang: ratingValue,
                nhanXet: content
            })
        }).then((response) => {
            console.log(response)
            props.gioHangItem?.review
                ? toast.success("Chỉnh sửa đánh giá thành công")
                : toast.success("Đánh giá sản phẩm thành công")
            props.handleCloseModal(true)
            props.handleCloseModalChiTietDonHang(true)
            props.setGioHangItem({ ...props.gioHangItem, review: true })
        })
            .catch((error) => console.log(error));
    }
    useEffect(() => {
        if (props.gioHangItem?.review) {
            const token = localStorage.getItem('token')
            fetch(`http://localhost:8080/su-danh-gia/xem-danh-gia`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    maDonHang: props.maDonHang,
                    maSach: props.maSach
                })

            })
                .then(response =>
                    response.json()
                ).then(data => {
                    setRatingValue(data.diemXepHang)
                    setContent(data.nhanXet)
                    setMaDanhGia(data.maDanhGia)
                }).catch((error) => console.log(error));
        }
    }, [])
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <Typography className="text-center" variant='h4' component='h2'>
                    ĐÁNH GIÁ SẢN PHẨM
                </Typography>
                <div className="d-flex ">
                    <strong className="me-3">VOTE:</strong>
                    <Rating size={25}
                        transition={true}
                        allowFraction={true}
                        initialValue={ratingValue}
                        onClick={(e) => handleRating(e)}></Rating>
                </div>
                <TextField
                    className='w-100 my-3'
                    id='standard-basic'
                    label='Đánh giá sản phẩm'
                    variant='outlined'
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className='d-flex flex-row-reverse'>
                    <Button type='submit' variant='contained'>
                        {props.gioHangItem?.review ? "sửa đánh giá" : "Gửi đánh giá"}
                    </Button>
                </div>
            </form>
        </div>
    )

}
export default ReviewForm