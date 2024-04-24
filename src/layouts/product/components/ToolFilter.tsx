import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import TheLoaiModel from "../../../models/TheLoaiModel"
import { layTheLoai, layToanBoTheLoai } from "../../../api/TheLoaiAPI"

interface ToolFilterProps {
    maTheLoai: number,
    setMaTheLoai: any
    setFilter: any
    filter: number
tuKhoaTimKiem: string
setTuKhoaTimKiem: any
}

const ToolFilter: React.FC<ToolFilterProps> = (props) => {
    const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState('')
    
    const [theLoai, setTheLoai] = useState<TheLoaiModel[]>([])

    const handleTimKiem = () => {
        if (tuKhoaTamThoi !== null) {
            props.setTuKhoaTimKiem(tuKhoaTamThoi)
        }
    }
    console.log(props.tuKhoaTimKiem)
    useEffect(() => {
        layToanBoTheLoai()
            .then((response) => {
                setTheLoai(response)
            })
    }, [])
    const handleTheLoaiChange = (event: SelectChangeEvent) => {
        props.setMaTheLoai(event.target.value);
    }

    const handleFilter = (event: SelectChangeEvent) => {
        props.setFilter(event.target.value)

    }
    console.log("mã thể loại " + props.maTheLoai)
    return (
        <div className="d-flex justify-content-between ">
            <div className="row" style={{ flex: 1 }}>
                <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="d-flex justify-content-lg-start justify-content-md-center justify-content-sm-center">
                        <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-helper-label">Thể loại</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Thể loại sách"
                                autoWidth
                                value={props.maTheLoai ? props.maTheLoai + "" : ""}
                                onChange={handleTheLoaiChange}
                            >
                                {
                                    theLoai.map((theLoaiItem, index) => (
                                        <MenuItem key={index} value={theLoaiItem.maTheLoai}>
                                            {theLoaiItem.tenTheLoai}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>

                        <FormControl size="small" sx={{ m: 1, minWidth: 140 }}>
                            <InputLabel id="demo-simple-select-label">Sắp xếp theo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                                value={props.filter ? props.filter + "" : ""}
                                onChange={handleFilter}
                            >
                                <MenuItem value={1}>Giá giảm dần</MenuItem>
                                <MenuItem value={2}>Giá tăng dần</MenuItem>
                                <MenuItem value={3}>Tên sách A-Z</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="d-flex align-items-center justify-content-lg-end justify-content-md-center justify-content-sm-center">
                        <TextField sx={{ m: 1, minWidth: 120 }}
                            size='small'
                            id='outlined-search'
                            label='Tìm kiếm theo tên sách'
                            type='search'
                            value={tuKhoaTamThoi}
                            onChange={e => setTuKhoaTamThoi(e.target.value)}
                        />
                        <Button onClick={handleTimKiem}
                            variant="contained" style={{ height: "40px" }} className="ms-2">
                            <i className='fas fa-search'></i>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ToolFilter