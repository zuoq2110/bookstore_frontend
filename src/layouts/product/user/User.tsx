import React, { useEffect, useState } from "react";
import DanhGiaModel from "../../../models/DanhGiaModel";
import NguoiDungModel from "../../../models/NguoiDungModel";
import { layNguoiDungTheoMaDanhGia } from "../../../api/NguoiDungAPI";
import { Avatar } from "@mui/material";


interface DanhGiaProps {
    danhGia: DanhGiaModel
    children: React.ReactNode;
}

const User: React.FC<DanhGiaProps> = (props) => {
    const [user, setUser] = useState<NguoiDungModel | null>(null);
    useEffect(() => {
        layNguoiDungTheoMaDanhGia(props.danhGia.maDanhGia)
            .then(response => {
                setUser(response);
            })
    }, [])

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp)

        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()

        return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
    }

    return (
        <>
            <div className="me-4 mt-1">
                <Avatar>{user?.ten[0]}</Avatar>
            </div>
            <div>
                <strong>{user?.tenDangNhap}</strong>
                <span className="ms-2" style={{ fontSize: "12px", color: "#aaa" }}>
                    {formatDate(props.danhGia.timestamp+"")}
                </span>
                {props.children}
            </div>
        </>
    )
}

export default User