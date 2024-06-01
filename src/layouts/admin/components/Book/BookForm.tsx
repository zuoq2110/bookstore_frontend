import React, { FormEvent, useEffect, useState } from "react"
import SachModel from "../../../../models/SachModel"
import { Box, Button, TextField, Typography } from "@mui/material"
import TheLoaiModel from "../../../../models/TheLoaiModel";
import { layToanBoTheLoai } from "../../../../api/TheLoaiAPI";
import SelectMultiple from "../../../utils/SelectMutiple";
import { CloudUpload } from "@mui/icons-material";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { layThongTin1SachTheoMaSach, layToanBoSach } from "../../../../api/SachAPI";

interface BookFormProps {
    option: string;
    maSach: number;
    handleClose: any
    keyCountReload: any
    setKeyCountReload: any
}

const BookForm: React.FC<BookFormProps> = (props) => {
    const [sach, setSach] = useState<SachModel>({
        maSach: 0,
        tenSach: "",
        giaBan: 0,
        soLuong: 0,
        giaNiemYet: 0,
        moTa: "",
        tenTacGia: "",
        giamGia: 0,
        soLuongDaBan: 0,
        thumbnail: "",
        trungBinhXepHang: 0,
        maTheLoai: [],
        anhLienQuan: []
    })

    const [genresList, setGenresList] = useState<TheLoaiModel[]>([])
    const [selectedListName, setSelectedListName] = useState<any[]>([])
    const [genresListSelected, setGenresListSelected] = useState<number[]>([])
    const [previewThumbnail, setPreviewThumbnail] = useState<string>("");
    const [previewRelatedImages, setPreviewRelatedImages] = useState<string[]>(
        []
    );
    useEffect(()=>{
        if(props.option === 'update'){
            layThongTin1SachTheoMaSach(props.maSach)
            .then(response=>{
                setSach(response as SachModel)
                setPreviewThumbnail(response.thumbnail as string)
                setPreviewRelatedImages(response.anhLienQuan as string[])
                response.danhSachTheLoai?.forEach((item)=>{
                    setSelectedListName((prev)=> [...prev, item.tenTheLoai])
                    setSach((sach)=>{
                        return {
                            ...sach,
                            maTheLoai: [...(sach.maTheLoai || []), item.maTheLoai]
                            
                        }
                    })
                })
            })
        }
    }, [props.option, props.maSach])
    useEffect(() => {
        layToanBoTheLoai()
            .then((response) => {
                setGenresList(response.danhSachTheLoai)
            })
    }, [])

    useEffect(() => {
        setSach({ ...sach, maTheLoai: genresListSelected })
    },[])

    const handleThumnailImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement = event.target as HTMLInputElement

        if (inputElement.files && inputElement.files.length > 0) {
			const selectedFile = inputElement.files[0];

			const reader = new FileReader();

			// Xử lý sự kiện khi tệp đã được đọc thành công
			reader.onload = (e: any) => {
				// e.target.result chính là chuỗi base64
				const thumnailBase64 = e.target?.result as string;

				setSach({ ...sach, thumbnail: thumnailBase64 });

				setPreviewThumbnail(URL.createObjectURL(selectedFile));
			};

			// Đọc tệp dưới dạng chuỗi base64
			reader.readAsDataURL(selectedFile);
		}
    }
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement = event.target as HTMLInputElement;

		if (inputElement.files && inputElement.files.length > 0) {
			const newPreviewImages = [...previewRelatedImages];

			if (newPreviewImages.length + inputElement.files.length > 5) {
				toast.warning("Chỉ được tải lên tối đa 5 ảnh");
				return;
			}

			// Duyệt qua từng file đã chọn
			for (let i = 0; i < inputElement.files.length; i++) {
				const selectedFile = inputElement.files[i];

				const reader = new FileReader();

				// Xử lý sự kiện khi tệp đã được đọc thành công
				reader.onload = (e: any) => {
					// e.target.result chính là chuỗi base64
					const thumbnailBase64 = e.target?.result as string;

					setSach((prevBook) => ({
						...prevBook,
						anhLienQuan: [...(prevBook.anhLienQuan || []), thumbnailBase64],
					}));

					newPreviewImages.push(URL.createObjectURL(selectedFile));

					// Cập nhật trạng thái với mảng mới
					setPreviewRelatedImages(newPreviewImages);
				};

				// Đọc tệp dưới dạng chuỗi base64
				reader.readAsDataURL(selectedFile);
			}
		}
    }
console.log(sach)
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const token = localStorage.getItem('token')

        let sachRequest = sach;
        if (sachRequest.giamGia === 0) {
            sachRequest = { ...sach, giaBan: sach.giaNiemYet }
        }

        const duongDan = props.option === "add"
            ? "http://localhost:8080/sach/them-sach"
            : "http://localhost:8080/sach/cap-nhat"
        const method = props.option === "add" ? "POST" : "PUT"
        toast.promise(
            fetch(duongDan, {
                method: method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sachRequest)
            })
                .then((response) => {
                    setSach(
                        {
                            maSach: 0,
                            tenSach: "",
                            tenTacGia: "",
                            moTa: "",
                            giaBan: 0,
                            giaNiemYet: 0,
                            soLuong: 0,
                            giamGia: 0,
                            thumbnail: "",
                            soLuongDaBan: 0,
                            maTheLoai: [],
                            anhLienQuan: []
                        }
                    )
                    setPreviewThumbnail("")
                    setPreviewRelatedImages([])
                    props.setKeyCountReload(Math.random())
                    props.handleClose()
                    console.log(sach)
                    props.option === "add"
                        ? toast.success("Thêm sách thành công")
                        : toast.success("Cập nhật sách thành công")
                })
                .catch(error => {
                    console.log(error)
                    toast.error("Gặp lỗi trong quá trình xử lý")
                }),
            {
                pending: "Đang trong quá trình xử lý..."
            }
        );

    }
    return (
        <div>
            <Typography className="text-center" variant="h4">
                {props.option === "add" ? "TẠO SÁCH" : "SỬA SÁCH"}
            </Typography>
            <hr></hr>
            <div className="container px-5">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" value={sach.maSach} />
                    <div className="row">
                        <div className={props.option==="update"?"col-4":"col-6"}>
                            <Box
                                sx={{
                                    "& .MuiTextField-root": { mb: 3 },
                                }}
                            >
                                <TextField
                                    required
                                    label="Tên sách"
                                    style={{ width: "100%" }}
                                    value={sach.tenSach}
                                    onChange={(e: any) => setSach({ ...sach, tenSach: e.target.value })}
                                    size='small'
                                />
                                <TextField
                                    required
                                    label="Tên tác giả"
                                    style={{ width: "100%" }}
                                    value={sach.tenTacGia}
                                    onChange={(e: any) => setSach({ ...sach, tenTacGia: e.target.value })}
                                    size='small'
                                />
                                <TextField
                                    required
                                    type="number"
                                    label="Giá niêm yết"
                                    style={{ width: "100%" }}
                                    value={sach.giaNiemYet}
                                    onChange={(e: any) => setSach({ ...sach, giaNiemYet: parseInt(e.target.value) })}
                                    size='small'
                                />

                            </Box>
                        </div>
                        <div className={props.option==="update"?"col-4":"col-6"}>
                            <Box
                                sx={{
                                    "& .MuiTextField-root": { mb: 3 },
                                }}
                            >
                                <TextField
                                    required
                                    label="Số lượng"
                                    style={{ width: "100%" }}
                                    type="number"
                                    size='small'
                                    value={Number.isNaN(sach.soLuong) ? "" : sach.soLuong}
                                    onChange={(e: any) => setSach({ ...sach, soLuong: parseInt(e.target.value) })}
                                />
                                <SelectMultiple
                                    genreList={genresList}
                                    selectedList={genresListSelected}
                                    setSelectedList={setGenresListSelected}
                                    selectedListName={selectedListName}
                                    setSelectedListName={setSelectedListName}
                                />
                                <TextField
                                    required
                                    type="number"
                                    style={{ width: "100%" }}
                                    label="Giảm giá (%)"
                                    size='small'
                                    value={sach.giamGia}
                                    onChange={(e: any) => setSach({ ...sach, giamGia: parseInt(e.target.value )})}
                                />

                            </Box>
                        </div>
                        {props.option === "update" && (
							<div className='col-4'>
								<Box
									sx={{
										"& .MuiTextField-root": { mb: 3 },
									}}
								>
									<TextField
										id='filled-required'
										label='Giá bán'
										style={{ width: "100%" }}
										value={sach.giaBan}
										type='number'
										InputProps={{
											disabled: true,
										}}
										size='small'
									/>

									<TextField
										id='filled-required'
										label='Đã bán'
										style={{ width: "100%" }}
										value={sach.soLuongDaBan}
										InputProps={{
											disabled: true,
										}}
										size='small'
									/>

									<TextField
										id='filled-required'
										label='Điểm đánh giá'
										style={{ width: "100%" }}
										value={sach.trungBinhXepHang}
										InputProps={{
											disabled: true,
										}}
										size='small'
									/>
								</Box>
							</div>
						)}
                        <div className='col-12'>
                            <Box>
                                <TextField
                                    id='outlined-multiline-flexible'
                                    label='Mô tả sách'
                                    style={{ width: "100%" }}
                                    multiline
                                    maxRows={5}
                                    value={sach.moTa}
                                    onChange={(e: any) =>
                                        setSach({ ...sach, moTa: e.target.value })
                                    }
                                    required
                                />
                            </Box>
                        </div>
                        <div className='d-flex align-items-center mt-3'>
                            <Button
                                size='small'
                                component='label'
                                variant='outlined'
                                startIcon={<CloudUpload />}
                            >
                                Tải ảnh thumbnail
                                <input
                                    style={{ opacity: "0", width: "10px" }}
                                    required={props.option === "update" ? false : true}
                                    type='file'
                                    accept='image/*'
                                    onChange={handleThumnailImageUpload}
                                    alt=''
                                />
                            </Button>
                            <img src={previewThumbnail} alt='' width={100} />
                        </div>
                        <div className='d-flex align-items-center mt-3'>
                            <Button
                                size='small'
                                component='label'
                                variant='outlined'
                                startIcon={<CloudUpload />}
                            >
                                Tải ảnh liên quan
                                <input
                                    style={{ opacity: "0", width: "10px" }}
                                    // required
                                    type='file'
                                    accept='image/*'
                                    onChange={handleImageUpload}
                                    multiple
                                    alt=''
                                />
                            </Button>
                            {previewRelatedImages?.map((imgURL) => (
                                <img src={imgURL} alt='' width={100} />
                            ))}
                            {previewRelatedImages.length > 0 && (
                                <Button
                                    onClick={() => {
                                        setPreviewRelatedImages([]);
                                        setSach({ ...sach, anhLienQuan: [] });
                                    }}
                                >
                                    Xoá tất cả
                                </Button>
                            )}
                        </div>
                    </div>
                    {props.option !== "view" && (
                        <LoadingButton
                            className='w-100 my-3'
                            type='submit'
                            variant='outlined'
                            sx={{ width: "25%", padding: "10px" }}
                        >
                            {props.option === "add" ? "Tạo sách" : "Lưu sách"}
                        </LoadingButton>
                    )}
                </form>
            </div>
        </div>
    )
}

export default BookForm