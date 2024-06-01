import React, { useEffect, useState } from "react";
import NguoiDungModel from "../../../../models/NguoiDungModel";
import { useConfirm } from "material-ui-confirm";
import { layToanBoNguoiDungTheoRole } from "../../../../api/NguoiDungAPI";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Chip, IconButton, Tooltip } from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { toast } from "react-toastify";

interface UserTableProps {
	setOption: any;
	handleOpenModal: any;
	setKeyCountReload?: any;
	keyCountReload?: any;
	setId: any;
}

export const UserTable: React.FC<UserTableProps> = (props) =>{
    const [data, setData] = useState<NguoiDungModel[]>([])
    const confirm = useConfirm()

    const handleDeleteUser = (id: any) =>{
        const token = localStorage.getItem("token");
        confirm({
            title: "Xóa người dùng",
            description: "Bạn có chắc muốn xóa người dùng này?",
            confirmationText: "Xoá",
            cancellationText: "Huỷ"
        })
        .then(()=>{
            toast.promise(
                fetch( `http://localhost:8080/nguoi-dung/xoa/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                        if (response.ok) {
                            toast.success("Xoá người dùng thành công");
                            props.setKeyCountReload(Math.random());
                        } else {
                            toast.error("Lỗi khi xoá người dùng");
                        }
                    })
                    .catch((error) => {
                        toast.error("Lỗi khi xoá người dùng");
                        console.log(error);
                    }),
                { pending: "Đang trong quá trình xử lý ..." }
            )
        })
    }
    useEffect(()=>{
        layToanBoNguoiDungTheoRole()
        .then(response=>{
            const users = response.flat().map(user=>({
                ...user, 
                id: user.maNguoiDung
            }))
            setData(users)
        })
        .catch((error) => console.log(error));
    },[props.keyCountReload])

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "tenDangNhap", headerName: "TÊN TÀI KHOẢN", width: 120 },
		{
			field: "quyen",
			headerName: "VAI TRÒ",
			width: 150,
			renderCell: (params) => {
				return (
					<Chip
						label={params.value}
						color={params.value === "CUSTOMER" ? "success" : "error"}
						variant='outlined'
					/>
				);
			},
		},
        { field: "ten", headerName: "TÊN", width: 100 },
		{
			field: "ngaySinh",
			headerName: "NGÀY SINH",
			width: 100,
		},
		{ field: "email", headerName: "EMAIL", width: 200 },
		{ field: "soDienThoai", headerName: "SỐ ĐIỆN THOẠI", width: 120 },
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
									props.handleOpenModal();
								}}
							>
								<EditOutlinedIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title={"Xoá"}>
							<IconButton
								color='error'
								onClick={() => handleDeleteUser(item.id)}
							>
								<DeleteOutlineOutlined />
							</IconButton>
						</Tooltip>
					</div>
				);
			},
		},
    ]
    return(
<div
			style={{
				width: "100%",
				height: data.length > 0 ? "auto" : "200px",
			}}
		>
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
		</div>
    )
}