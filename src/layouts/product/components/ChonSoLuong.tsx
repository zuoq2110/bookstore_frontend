import Icon from "@mui/material/Icon";
import React from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import SachModel from "../../../models/SachModel";

interface ChonSoLuongProps{
    max: number | undefined
    setSoLuong?: any;
    soLuong? : number;
    them? : any;
    giam?: any;
    sach?: SachModel
}
const ChonSoLuong: React.FC<ChonSoLuongProps> = (props)=>{
    return(
        <div
        className=' d-flex align-items-center rounded'
        style={{ width: "170px",border: "1px solid #ccc" }}
    >
        <button
            type='button'
            className='d-flex align-items-center justify-content-center'
            onClick={() => props.giam()}
            style={{
                backgroundColor: "transparent",
					borderColor: "transparent",
            }}
        >
           <RemoveIcon/>
        </button>
        <input
            type='number'
            className='inp-number p-0 m-0'
            value={props.soLuong}
            min={1}
            max={props.max}
           style={{width:"20%",
        outline:0, border:0, fontWeight:"bold"
    ,textAlign:"center", flex:1}}
        />
        <button
            type='button'
            className='d-flex align-items-center justify-content-center'
            onClick={() => props.them()}
            style={{
                backgroundColor: "transparent",
					borderColor: "transparent",
            }}
        >
           <AddIcon/>
        </button>
    </div>
    )
}

export default ChonSoLuong