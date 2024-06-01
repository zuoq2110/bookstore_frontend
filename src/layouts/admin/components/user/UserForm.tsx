import React, { FormEvent, useEffect, useState } from "react"
import NguoiDungModel from "../../../../models/NguoiDungModel"
import QuyenModel from "../../../../models/QuyenModel"
import { layTatCaQuyen } from "../../../../api/QuyenAPI"
import { Lay1NguoiDungTheoID } from "../../../../api/NguoiDungAPI"
import { CloudUpload } from "@mui/icons-material";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { checkExistEmail, checkExistUsername, checkPassword, checkPhoneNumber } from "../../../utils/Validation"
import { LoadingButton } from "@mui/lab"
import { getUsernameByToken } from "../../../utils/JwtService"
import { toast } from "react-toastify"
interface UserFormProps {
    option: string;
    setKeyCountload?: any
    id: number;
    handleClose: any
}
const UserForm: React.FC<UserFormProps> = (props) => {
    const [user, setUser] = useState<NguoiDungModel>({
        maNguoiDung: 0,
        ngaySinh: new Date(),
        gioiTinh: '',
        diaChiGiaoHang: "",
        diaChiMuaHang: "",
        email: '',
        soDienThoai: '',
        matKhau: '',
        tenDangNhap: "",
        hoDem: "",
        ten: "",
        avatar: "",
        quyen: 3
    })

    const [avatar, setAvatar] = useState<File | null>(null)
    const [previewAvatar, setPreviewAvatar] = useState("")
    const [roles, setRoles] = useState<QuyenModel[]>([])

    const [statusBtn, setStatusBtn] = useState(false);

    const [errorUsername, setErrorUsername] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
    useEffect(() => {
        layTatCaQuyen()
            .then(response => {
                setRoles(response)
            })
    })

    useEffect(() => {
        if (props.option === "update") {
            Lay1NguoiDungTheoID(props.id)
                .then(response => {
                    setUser({
                        ...response,
                        ngaySinh: new Date(response.ngaySinh)
                    })
                    setPreviewAvatar(response.avatar)
                })
        }
    }, [props.id, props.option])

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateString = e.target.value;
        // Chuyển đổi chuỗi thành đối tượng Date
        const dateObject = new Date(dateString);
        if (!isNaN(dateObject.getTime())) {
            // Nếu là một ngày hợp lệ, cập nhật state
            setUser({
                ...user,
                ngaySinh: dateObject,
            });
        }
    };
    function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const inputElement = event.target as HTMLInputElement;

        if (inputElement.files && inputElement.files.length > 0) {
            const selectedFile = inputElement.files[0];

            const reader = new FileReader();

            reader.onload = (e: any) => {
                // e.target.result chính là chuỗi base64
                const thumnailBase64 = e.target?.result as string;
                // Tiếp tục xử lý tệp đã chọn
                setAvatar(selectedFile);
                setPreviewAvatar(URL.createObjectURL(selectedFile));
                setUser({ ...user, avatar: thumnailBase64 });
            };
            // Đọc tệp dưới dạng chuỗi base64
            reader.readAsDataURL(selectedFile);
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const token = localStorage.getItem('token')

        if (getUsernameByToken() === user.tenDangNhap) {
            toast.warning("Bạn không thể cập nhật tài khoản bạn đang sử dụng");
            return;
        }
        setStatusBtn(true);

        const endpoint = props.option === 'add'
            ? `http://localhost:8080/nguoi-dung/them`
            : `http://localhost:8080/nguoi-dung/cap-nhat`
        const method = props.option === 'add' ? 'POST' : 'PUT'
        toast.promise(
            fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(user),
            })
                .then(response => {
                    if (response.ok) {
                        setUser({
                            maNguoiDung: 0,
                            ngaySinh: new Date(),
                            gioiTinh: '',
                            diaChiGiaoHang: "",
                            diaChiMuaHang: "",
                            email: '',
                            soDienThoai: '',
                            matKhau: '',
                            tenDangNhap: "",
                            hoDem: "",
                            ten: "",
                            avatar: "",
                            quyen: 3
                        })
                        setAvatar(null)
                        setPreviewAvatar('')
                        setStatusBtn(false)
                        props.setKeyCountload(Math.random())
                        props.handleClose()
                        toast.success(
                            props.option === "add"
                                ? "Thêm người dùng thành công"
                                : "Cập nhật người dùng thành công"
                        );
                    } else {
                        setStatusBtn(false);
                        toast.error("Gặp lỗi trong quá trình xử lý người dùng");
                    }
                })
                .catch((error) => {
					console.log(error);
					setStatusBtn(false);
					toast.error("Gặp lỗi trong quá trình xử lý người dùng");
				}),
                { pending: "Đang trong quá trình xử lý ..." }
        )
    }
    return (
        <div>
            <Typography className='text-center' variant='h4' component='h2'>
                {props.option === "add"
                    ? "TẠO NGƯỜI DÙNG"
                    : props.option === "update"
                        ? "SỬA NGƯỜI DÙNG"
                        : "XEM CHI TIẾT"}
            </Typography>
            <hr></hr>
            <div className='container'>
                <form onSubmit={handleSubmit} className="form">
                    <input type="hidden" value={user.maNguoiDung} hidden></input>
                    <div className="row">
                        <div className="col-6">
                            <Box
                                sx={{
                                    "& .MuiTextField-root": { mb: 3 },
                                }}>
                                <TextField
                                    required
                                    id='filled-required'
                                    label='Tên tài khoản'
                                    style={{ width: "100%" }}
                                    error={errorUsername.length > 0 ? true : false}
                                    helperText={errorUsername}
                                    value={user.tenDangNhap}
                                    InputProps={{
                                        disabled: props.option === "update" ? true : false
                                    }}
                                    onChange={(e: any) => {
                                        setUser({ ...user, tenDangNhap: e.target.value })
                                        setErrorUsername('')
                                    }}
                                    onBlur={(e: any) => {
                                        checkExistUsername(
                                            setErrorUsername, e.target.value
                                        )
                                    }}
                                    size="small"
                                />
                                <TextField
                                    required={props.option === "update" ? false : true}
                                    id='filled-required'
                                    type='password'
                                    label='Mật khẩu'
                                    style={{ width: "100%" }}
                                    error={errorPassword.length > 0 ? true : false}
                                    helperText={errorPassword}
                                    value={user.matKhau}
                                    onChange={(e: any) => {
                                        setUser({ ...user, matKhau: e.target.value });
                                        setErrorPassword("");
                                    }}
                                    onBlur={(e: any) => {
                                        checkPassword(setErrorPassword, e.target.value);
                                    }}
                                    size='small'
                                />

                                <TextField
                                    required
                                    id='filled-required'
                                    label='Email'
                                    type='email'
                                    style={{ width: "100%" }}
                                    error={errorEmail.length > 0 ? true : false}
                                    helperText={errorEmail}
                                    value={user.email}
                                    InputProps={{
                                        disabled:
                                            props.option === "update" ? true : false,
                                    }}
                                    onChange={(e: any) => {
                                        setUser({ ...user, email: e.target.value });
                                        setErrorEmail("");
                                    }}
                                    onBlur={(e: any) => {
                                        checkExistEmail(setErrorEmail, e.target.value);
                                    }}
                                    size='small'
                                />

                                <TextField
                                    required
                                    id='filled-required'
                                    label='Số điện thoại'
                                    style={{ width: "100%" }}
                                    error={errorPhoneNumber.length > 0 ? true : false}
                                    helperText={errorPhoneNumber}
                                    value={user.soDienThoai}
                                    onChange={(e: any) => {
                                        setUser({
                                            ...user,
                                            soDienThoai: e.target.value,
                                        });
                                        setErrorPhoneNumber("");
                                    }}
                                    onBlur={(e: any) => {
                                        checkPhoneNumber(
                                            setErrorPhoneNumber,
                                            e.target.value
                                        );
                                    }}
                                    size='small'
                                />

                                <TextField
                                    required
                                    id='filled-required'
                                    label='Ngày sinh'
                                    style={{ width: "100%" }}
                                    type='date'
                                    value={user.ngaySinh.toISOString().split("T")[0]}
                                    onChange={handleDateChange}
                                    size='small'
                                />
                            </Box>
                        </div>

                        <div className='col-6'>
                            <Box
                                sx={{
                                    "& .MuiTextField-root": { mb: 3 },
                                }}
                            >
                                <TextField
                                    id='filled-required'
                                    label='Họ đệm'
                                    style={{ width: "100%" }}
                                    value={user.hoDem}
                                    onChange={(e: any) =>
                                        setUser({ ...user, hoDem: e.target.value })
                                    }
                                    size='small'
                                />

                                <TextField
                                    required
                                    id='filled-required'
                                    label='Tên'
                                    style={{ width: "100%" }}
                                    value={user.ten}
                                    onChange={(e: any) =>
                                        setUser({ ...user, ten: e.target.value })
                                    }
                                    size='small'
                                />

                                <TextField
                                    id='filled-required'
                                    label='Địa chỉ'
                                    style={{ width: "100%" }}
                                    value={user.diaChiGiaoHang}
                                    onChange={(e: any) =>
                                        setUser({
                                            ...user,
                                            diaChiGiaoHang: e.target.value,
                                        })
                                    }
                                    size='small'
                                />

                                <FormControl fullWidth size='small' sx={{ mb: 3 }}>
                                    <InputLabel id='demo-simple-select-label'>
                                        Giới tính
                                    </InputLabel>
                                    <Select
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={user.gioiTinh}
                                        label='Giới tính'
                                        onChange={(e: any) =>
                                            setUser({ ...user, gioiTinh: e.target.value })
                                        }
                                    >
                                        <MenuItem value={"M"}>Nam</MenuItem>
                                        <MenuItem value={"F"}>Nữ</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth size='small'>
                                    <InputLabel id='demo-simple-select-label'>
                                        Vai trò
                                    </InputLabel>
                                    <Select
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={user.quyen}
                                        label='Vai trò'
                                        onChange={(e: any) =>
                                            setUser({
                                                ...user,
                                                quyen: e.target.value as number,
                                            })
                                        }
                                    >
                                        {roles.map((role) => (
                                            <MenuItem
                                                value={role.maQuyen}
                                                key={role.maQuyen}
                                            >
                                                {role.tenQuyen}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className='d-flex align-items-center mt-3'>
                            <Button
                                size='small'
                                component='label'
                                variant='outlined'
                                startIcon={<CloudUpload />}
                            >
                                Tải ảnh avatar
                                <input
                                    style={{ opacity: "0", width: "10px" }}
                                    // required
                                    type='file'
                                    accept='image/*'
                                    onChange={handleImageUpload}
                                    alt=''
                                />
                            </Button>
                            <span className='ms-3'>{avatar?.name}</span>
                            <img src={previewAvatar} alt='' width={100} />
                        </div>
                    </div>
                    <LoadingButton
                        className='w-100 my-3'
                        type='submit'
                        loading={statusBtn}
                        variant='outlined'
                        sx={{ width: "25%", padding: "10px" }}
                    >
                        {props.option === "add" ? "Tạo người dùng" : "Lưu người dùng"}
                    </LoadingButton>
                </form>
            </div>
        </div>
    )
}
export default UserForm