import { JwtPayload, jwtDecode } from "jwt-decode"
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import RequireUser from "./RequireUser"
import { Lay1NguoiDungTheoID } from "../../api/NguoiDungAPI"
import NguoiDungModel from "../../models/NguoiDungModel"
import { Avatar, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Tooltip } from "@mui/material"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { CloudUpload, Edit } from "@mui/icons-material"
import { Form } from "react-bootstrap"
import { toast } from "react-toastify"
import HiddenInputUpload from "../utils/HiddenInputUpload"
import DonHangTable from "./DonHangTable"
import { ModalUtil } from "./ModalUtil"
import DonHangForm from "./DonHangForm"
import { getIdUserByToken } from "../utils/JwtService"
export interface JwtPayLoad {
    id: any;

}


const UserAccount = () => {
    const [value, setValue] = React.useState('1')
    const [isUploadedAvt, setIsUploadedAvt] = useState(false)
    const [modifiedStatus, setModifiedStatus] = useState(false)
    const [avatar, setAvatar] = useState('')
    const [previewAvatar, setPreviewAvatar] = useState("");
const [maDonHang, setMaDonHang] = useState(0)
const [countReload, setCountReload] = useState(0)
const [errorNewPassword, setErrorNewPassword] = useState('')
const [errorRepeatPassword, setErrorRepeatPassword] = useState('')
const [newPassword, setNewPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
    const [open, setOpen] = useState(false)

  
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
        console.log(newValue);
    }
    const [user, setUser] = useState<NguoiDungModel>({
        maNguoiDung: 0,
        hoDem: "",
        soDienThoai: "",
        tenDangNhap: "",
        ten: "",
        avatar: "",
        email: "",
        gioiTinh: "",
        diaChiGiaoHang: "",
        diaChiMuaHang: "",
        ngaySinh: new Date()
    })
    const handleUploadAvt = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement = event.target as HTMLInputElement

        if (inputElement.files && inputElement.files.length > 0) {
            const selectedFile = inputElement.files[0]
            const reader = new FileReader()
            reader.onload = (e: any) => {
                const avatarBase64 = e.target?.result as string
                setAvatar(avatarBase64)
                setPreviewAvatar(URL.createObjectURL(selectedFile))
                setIsUploadedAvt(true)
            }
            reader.readAsDataURL(selectedFile);
            console.log(previewAvatar)
            console.log(avatar)
        }

    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log(token)
        if (token) {
            const userData = jwtDecode(token) as JwtPayLoad
            const idUser = userData.id
            Lay1NguoiDungTheoID(idUser)
                .then(response => {
                    setUser({
                        ...response,
                        ngaySinh: new Date(response.ngaySinh)
                    })
                    setPreviewAvatar(response.avatar)
                }

                )
                .catch(error => {
                    console.log(error)
                })

        }
    }, [])

    const handleSubmitAvt = () => {
        const token = localStorage.getItem('token')
        fetch(`http://localhost:8080/nguoi-dung/doi-avatar`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify(
                {
                    maNguoiDung: user.maNguoiDung,
                    avatar: avatar
                }
            )
        }).then(
            response => {
                toast.success("Cập nhật avt thành công")
                setPreviewAvatar(previewAvatar)
                setIsUploadedAvt(false)
            }
        ).catch(e => {
            toast.error("Cập nhật avt thất bại")
            setIsUploadedAvt(false)
        })

    }

    const handleSubmit = () => {
        const token = localStorage.getItem("token")
        toast.promise(fetch(`http://localhost:8080/nguoi-dung/update-profile`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Authorizaion: `Bearer ${token}`
            },
            body: JSON.stringify({
                maNguoiDung: user.maNguoiDung,
                hoDem: user.hoDem,
                soDienThoai: user.soDienThoai,
                ten: user.ten,
                ngaySinh: user.ngaySinh,
                diaChiGiaoHang: user.diaChiGiaoHang,
                gioiTinh: user.gioiTinh,
            })
        })
            .then(response => {
                setModifiedStatus(!modifiedStatus)
                toast.success("Cập nhật thông tin thành công")
            }).catch(e => {
                toast.error("Cập nhật thông tin thất bại")
                setModifiedStatus(!modifiedStatus)
            }),
            { pending: "Đang trong quá trình xử lý..." }
        )
    }
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateString = event.target.value;
        // Chuyển đổi chuỗi thành đối tượng Date
        const dateObject = new Date(dateString);
        if (!isNaN(dateObject.getTime())) {
            // Nếu là một ngày hợp lệ, cập nhật state
            setUser({
                ...user,
                ngaySinh: dateObject,
            });
        }
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setNewPassword(e.target.value)
        setErrorNewPassword("")
    }

    const handleRepeatPasswordChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setRepeatPassword(e.target.value)
    setErrorRepeatPassword("")
    }

    const checkPassword = (setErrorPassword: any, password: string)=>{
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        if(password ===""){
            return false
        }else if(!passwordRegex.test(password)){
            setErrorPassword("Mật khẩu phải có ít nhất 8 ký tự bao gồm chữ và số")
            return true
        } else{
            setErrorPassword("")
            return false
        }
    }
    const checkRepeatPassword = (setErrorRepeatPassword: any, password: string, passwordRepeat: string)=>{
        if(password!== passwordRepeat){
            setErrorRepeatPassword("Mật khẩu không khớp")
            return true
        }else{
            setErrorRepeatPassword("")
            return false
        }
    }
    const handleSubmitChangePassword = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
      if (errorNewPassword.length > 0 || errorRepeatPassword.length > 0) {
			toast.warning("Xem lại mật khẩu vừa nhập");
			return;
		}
        const token = localStorage.getItem("token");
		fetch(`http://localhost:8080/nguoi-dung/doi-mat-khau`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"content-type": "application/json",
			},
			body: JSON.stringify({
				maNguoiDung: getIdUserByToken(),
				matKhauMoi: newPassword,
			}),
		})
			.then((response) => {
                console.log(response)
				setNewPassword("");
				setRepeatPassword("");
				toast.success("Đổi mật khẩu thành công");
			})
			.catch((error) => {
				console.log(error);
				toast.error("Thay đổi mật khẩu không thành công");
			});
    }
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-12">
                    <div className='bg-light rounded py-3 me-lg-2 me-md-0 me-sm-0'>
                        <div className='d-flex align-items-center justify-content-center flex-column'>
                            <Avatar
                                style={{ fontSize: "50px" }}
                                alt={user.tenDangNhap?.toUpperCase()}
                                sx={{ width: 100, height: 100 }}
                                src={previewAvatar}
                            />

                            {!isUploadedAvt ? <>
                                {/* <input

                                type="file"

                                accept="image/*"

                                style={{ display: 'none' }}

                                id="contained-button-file"

                            /> */}
                                {/* <label htmlFor="contained-button-file"> */}
                                <Button startIcon={<CloudUpload />}
                                    component="label"

                                    className="mt-3" variant="outlined">
                                    Upload Avatar
                                    <HiddenInputUpload handleAvtUpload={handleUploadAvt} />
                                </Button>
                                {/* </label> */}
                            </> :
                                <div className="d-flex">
                                    <Button variant="outlined" className="mt-3" onClick={handleSubmitAvt}>Thay đổi</Button>
                                    <Button variant="outlined" className="mt-3" onClick={() => {
                                        setPreviewAvatar(user.avatar)
                                        setIsUploadedAvt(!isUploadedAvt)
                                    }}>Hủy</Button>
                                </div>
                            }

                        </div>

                    </div>

                </div>
                <div className="col-lg-9 col-md-9 col-sm-12">
                    <div
                        className='bg-light rounded px-2 ms-lg-2 ms-md-0 ms-sm-0 mt-lg-0 mt-md-3 mt-sm-3'
                        style={{ minHeight: "300px" }}
                    >
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Thông tin cá nhân" value="1" />
                                        <Tab label="Tình trạng đơn hàng" value="2" />
                                        <Tab label="Đổi mật khẩu" value="3" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <form className="position-relative form">
                                        {!modifiedStatus && (
                                            <div className=" my-3 position-absolute"
                                                style={{
                                                    bottom: "0",
                                                    right: "0",
                                                }}>
                                                <Tooltip title="Chỉnh sửa thông tin"
                                                    placement='bottom-end'>
                                                    <Button
                                                        variant="contained"
                                                        className='rounded-pill'
                                                        onClick={() => setModifiedStatus(!modifiedStatus)}>
                                                        <Edit></Edit>
                                                    </Button>
                                                </Tooltip>

                                            </div>
                                        )}
                                        <div className="row">
                                            <div className="col-lg-4 col-md-12 col-md-12">
                                                <TextField
                                                    required
                                                    className='input-field'
                                                    fullWidth style={{ margin: "12px 0" }}
                                                    label="ID"
                                                    value={user.maNguoiDung}
                                                    disabled={true}
                                                    aria-readonly={true}

                                                />
                                                <TextField
                                                    required
                                                    className='input-field'
                                                    fullWidth style={{ margin: "12px 0" }}
                                                    label="Họ đệm"
                                                    value={user.hoDem}
                                                    disabled={modifiedStatus ? false : true}
                                                    onChange={e => { setUser({ ...user, hoDem: e.target.value }) }}

                                                />
                                                <TextField
                                                    required
                                                    className='input-field'
                                                    fullWidth style={{ margin: "12px 0" }}
                                                    label="Số điện thoại"
                                                    value={user.soDienThoai}
                                                    disabled={modifiedStatus ? false : true}
                                                    onChange={e => setUser({ ...user, soDienThoai: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-lg-4 col-md-12 col-md-12">
                                                <TextField
                                                    required
                                                    className='input-field'
                                                    fullWidth style={{ margin: "12px 0" }}
                                                    label="Tên đăng nhập"
                                                    aria-readonly={true}
                                                    value={user.tenDangNhap}
                                                    disabled={true}
                                                />
                                                <TextField
                                                    required
                                                    className='input-field'
                                                    fullWidth style={{ margin: "12px 0" }}
                                                    label="Tên"
                                                    value={user.ten}
                                                    disabled={modifiedStatus ? false : true}
                                                    onChange={e => { setUser({ ...user, ten: e.target.value }) }}

                                                />
                                                <TextField
                                                    required
                                                    className='input-field'
                                                    fullWidth style={{ margin: "12px 0" }}
                                                    label="Địa chỉ giao hàng"
                                                    value={user.diaChiGiaoHang}
                                                    disabled={modifiedStatus ? false : true}
                                                    onChange={e => setUser({ ...user, diaChiGiaoHang: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-lg-4 col-md-12 col-md-12">
                                                <TextField
                                                    required
                                                    className='input-field'
                                                    fullWidth style={{ margin: "12px 0" }}
                                                    label="Email"
                                                    aria-readonly={true}
                                                    value={user.email}
                                                    disabled={true}
                                                />
                                                <TextField
                                                    required
                                                    className='input-field'
                                                    fullWidth style={{ margin: "12px 0" }}
                                                    label="Ngày sinh"
                                                    type="date"
                                                    value={user.ngaySinh.toISOString().split("T")[0]}
                                                    disabled={modifiedStatus ? false : true}
                                                    onChange={handleDateChange}

                                                />
                                                <FormControl>
                                                    <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                                        name="controlled-radio-buttons-group"
                                                        value={user.gioiTinh}
                                                        onChange={e => setUser({ ...user, gioiTinh: e.target.value })}
                                                    >
                                                        <FormControlLabel
                                                            disabled={
                                                                modifiedStatus ? false : true
                                                            }
                                                            value="F" control={<Radio />} label="Female" />
                                                        <FormControlLabel
                                                            disabled={
                                                                modifiedStatus ? false : true
                                                            }
                                                            value="M" control={<Radio />} label="Male" />
                                                    </RadioGroup>
                                                </FormControl>

                                            </div>
                                            {modifiedStatus && <div className="mt-3 text-center">
                                                <Button onClick={handleSubmit} variant="contained"
                                                    fullWidth
                                                    type="submit"
                                                    sx={{ width: "50%", padding: "10px" }}>
                                                    Lưu và thay đổi
                                                </Button>
                                            </div>}
                                        </div>
                                    </form>
                                </TabPanel>
                                <TabPanel value="2">
                                    <DonHangTable countReload={countReload} setCountReload={setCountReload} setMaDonHang={setMaDonHang} handleOpen={handleOpen} />
                                    <ModalUtil open={open} handleClose={handleClose} handleOpen={handleOpen}>
                                        <DonHangForm 
                                        setCountReload={setCountReload} handleClose={handleClose}
                                        maDonHang={maDonHang}
                                        option={"view-customer"}/>
                                    </ModalUtil>
                                </TabPanel>
                                <TabPanel value="3">
                                <form
										onSubmit={handleSubmitChangePassword}
										className='form position-relative'
										style={{ padding: "0 120px" }}
									>
                                       
										<TextField
											error={
												errorNewPassword.length > 0 ? true : false
											}
											helperText={errorNewPassword}
											required={true}
											fullWidth
											type='password'
											label='Mật khẩu mới'
											placeholder='Nhập mật khẩu mới'
											value={newPassword}
											onChange={handlePasswordChange}
											onBlur={(e) => {
												checkPassword(
													setErrorNewPassword,
													e.target.value
												);
											}}
                                            style={{margin: "5px"}}
										/>

										<TextField
											error={
												errorRepeatPassword.length > 0
													? true
													: false
											}
											helperText={errorRepeatPassword}
											required={true}
											fullWidth
											type='password'
											label='Xác nhận mật khẩu mới'
											placeholder='Nhập lại mật khẩu mới'
											value={repeatPassword}
											onChange={handleRepeatPasswordChange}
											onBlur={(e) => {
												checkRepeatPassword(
													setErrorRepeatPassword,
													e.target.value,
													newPassword
												);
											}}
											style={{margin: "5px"}}
										/>
										<div className='text-center my-3'>
											<Button
												fullWidth
												variant='outlined'
												type='submit'
												sx={{ width: "50%", padding: "10px" }}
											>
												Lưu và thay đổi
											</Button>
										</div>
									</form>
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </div>
                </div>
            </div>
        </div >
    )
}
const UserCheck = RequireUser(UserAccount)
export default UserCheck