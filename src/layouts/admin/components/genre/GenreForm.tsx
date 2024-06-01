import React, { FormEvent, useEffect, useState } from "react"
import TheLoaiModel from "../../../../models/TheLoaiModel"
import { lay1TheLoaiTheoMaTheLoai } from "../../../../api/TheLoaiAPI";
import { Box, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
interface GenreFormProps {
    option: string;
    id: number
    handleClose: any
setKeyCountReload?: any

}
const GenreForm: React.FC<GenreFormProps> = (props) => {
    const [genre, setGenre] = useState<TheLoaiModel>({
        maTheLoai: 0,
        tenTheLoai: ''
    });

    useEffect(() => {
        if (props.option === "update") {
            lay1TheLoaiTheoMaTheLoai(props.id)
                .then(response => {
                    setGenre(response.theLoai)
                })
        }
    }, [props.id])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) =>{
event.preventDefault()
const token = localStorage.getItem("token")
const method = props.option === "add" ? "POST": "PUT"
const endpoint = props.option === "add"? "http://localhost:8080/theLoai"
: `http://localhost:8080/theLoai/${props.id}`
fetch(endpoint, {
    method: method,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(genre)
})
.then(response =>{
    if(response.ok){
    setGenre({
        maTheLoai: 0,
        tenTheLoai: ''
    })
    props.option === 'add'
    ?toast.success("Thêm thể loại thành công")
    : toast.success("Cập nhật thể loại thành công")
    props.handleClose()
    props.setKeyCountReload(Math.random())

    }
})
.catch((e) => {
    toast.error("Lỗi khi thưc hiện hành động");
    props.handleClose();
    console.log(e);
});
    }
    return (
        <div>
            <Typography className='text-center' variant='h4' component='h2'>
                {props.option === "add"
                    ? "TẠO THỂ LOẠI"
                    : props.option === "update"
                        ? "SỬA THỂ LOẠI"
                        : "XEM CHI TIẾT"}
            </Typography>
            <hr />
            <div className='container px-5'>
                <form onSubmit={handleSubmit} className='form'>
                    <input type='hidden' id='idGenre' value={genre.maTheLoai} hidden />
                    <Box
                        sx={{
                            "& .MuiTextField-root": { mb: 3 },
                        }}
                    >
                        <TextField
                            required
                            id='filled-required'
                            label='Tên thể loại'
                            style={{ width: "100%" }}
                            value={genre.tenTheLoai}
                            onChange={(e) =>
                                setGenre({ ...genre, tenTheLoai: e.target.value })
                            }
                            size='small'
                        />
                    </Box>
                    {props.option !== "view" && (
                        <button className='btn btn-primary w-100 my-3' type='submit'>
                            {props.option === "add" ? "Tạo thể loại" : "Lưu thể loại"}
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default GenreForm