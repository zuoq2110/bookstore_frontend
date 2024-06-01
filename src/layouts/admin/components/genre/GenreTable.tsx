import React, { useEffect, useState } from "react";
import TheLoaiModel from "../../../../models/TheLoaiModel";
import { layToanBoTheLoai } from "../../../../api/TheLoaiAPI";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";

interface GenreTableProps {
    setOption: any;
    handleOpen: any;
    setId: any
    setKeyCountReload?: any;
	keyCountReload?: any;
}
const GenreTable: React.FC<GenreTableProps> = (props) => {
    const [data, setData] = useState<TheLoaiModel[]>([])
    const confirm = useConfirm()
    useEffect(() => {
        layToanBoTheLoai().then((response) => {
            const genres = response.danhSachTheLoai.map((item) => ({
                ...item,
                id: item.maTheLoai
            }))
            setData(genres)
        })
    }, [props.keyCountReload])

    const handleDeleteGenre = (id: any) => {
        const token = localStorage.getItem("token")
        confirm({
            title: "Xóa thể loại",
            description: "Bạn có chắc muốn xóa thể loại này ?",
            confirmationText: "Xóa",
            cancellationText: "Hủy"
        })
            .then(() => {
                fetch(`http://localhost:8080/theLoai/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            toast.success("Xoá thể loại thành công");
                            props.setKeyCountReload(Math.random())
                        }else {
							toast.error("Lỗi khi xoá thể loại");
						}
                    })
                    .catch((error) => {
						toast.error("Lỗi khi xoá thể loại");
						console.log(error);
					});
            })
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 150 },
        { field: "tenTheLoai", headerName: "TÊN THỂ LOẠI", width: 200 },
        {
            field: "action", headerName: "HÀNH ĐỘNG", width: 300, type: "actions",
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
                                onClick={() => handleDeleteGenre(item.id)}
                            >
                                <DeleteOutlineOutlined />
                            </IconButton>
                        </Tooltip>
                    </div>
                )
            }
        }
    ]
    return (
        <DataGrid
            rows={data}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                },
            }}
            pageSizeOptions={[10, 15, 20, 30]}
        />
    )
}

export default GenreTable;