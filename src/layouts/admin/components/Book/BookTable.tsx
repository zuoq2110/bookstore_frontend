import React, { useEffect, useState } from "react"
import { layToanBoSach } from "../../../../api/SachAPI"
import { layToanBoAnhCuaMotSach } from "../../../../api/HinhAnhAPI"
import SachModel from "../../../../models/SachModel"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { IconButton, Tooltip } from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { useConfirm } from "material-ui-confirm"
import { toast } from "react-toastify"
interface BookTableProps {
    setOption: any
    handleOpen: any
    setId: any
    setKeyCountReload: any
    keyCountReload?: any
}
const BookTable: React.FC<BookTableProps> = (props) => {
    const [books, setBooks] = useState<any[]>([])
    const confirm = useConfirm();
    useEffect(() => {
        layToanBoSach(1000)
            .then((response) => {
                const bookList = response.ketQua.map((sach) => (
                    {
                        ...sach,
                        id: sach.maSach,
                    }
                ))
                setBooks(bookList)
            }

            )
            .catch(err => console.log(err))
    }, [props.keyCountReload])

    const handleDeleteBook = (id: any) => {
        const token = localStorage.getItem('token')
        confirm({
            title: "Xóa sách",
            description: "Bạn chắc chắn xóa sách này chứ?",
            confirmationText: ["Xóa"],
            cancellationText: ["Huỷ"],
        })
        .then(()=>{
            fetch(`http://localhost:8080/sach/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((response)=>{
                if(response.ok){
                    toast.success("Xóa sách thành công")
                    props.setKeyCountReload(Math.random())
                }else{
                    toast.error("Lỗi khi xóa sách");
                }
            }).catch((error) => {
                toast.error("Lỗi khi xoá sách");
                console.log(error);
            });
        })
    }

    const columns: GridColDef[] = [
        { field: "maSach", headerName: "ID", width: 80 },
        {
            field: "thumbnail",
            headerName: "ẢNH",
            width: 100,
            renderCell: (params) => (
                <img src={params.value} width={70} />
            )
        },
        { field: "tenSach", headerName: "TÊN SÁCH", width: 200 },
        { field: "soLuong", headerName: "SỐ LƯỢNG", width: 90 },
        {
            field: "giaBan",
            headerName: "GIÁ BÁN",
            width: 120,
            renderCell: (params) => (
                <span>{Number(params.value).toLocaleString("vi-vn")}đ</span>
            )
        },
        { field: "tenTacGia", headerName: "TÁC GIẢ", width: 130 },
        {
            field: "action",
            headerName: "HÀNH ĐỘNG",
            width: 200,
            type: "actions",
            renderCell: (item) => {
                return (
                    <div>
                        <Tooltip title={"Chỉnh sửa"}>
                            <IconButton
                                color='primary'
                                onClick={() => {
                                    props.setOption("update");
                                    props.setId(item.id);
                                    props.handleOpen();
                                }}
                            >
                                <EditOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Xoá"}>
                            <IconButton
                                color='error'
                                onClick={() => handleDeleteBook(item.id)}
                            >
                                <DeleteOutlineOutlined />
                            </IconButton>
                        </Tooltip>
                    </div>
                );
            },
        },
    ]
    return (
        <DataGrid rows={books} columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                },
            }}
            pageSizeOptions={[10, 15, 20, 30]}></DataGrid>
    )
}

export default BookTable