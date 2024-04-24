import { styled } from "@mui/material";
import React from "react";

interface HiddenInputUploadProps{
    handleAvtUpload : any
    required?: boolean;
}

const HiddenInputUpload : React.FC<HiddenInputUploadProps>= (props)=>{
    // const VisuallyHiddenInput = styled("input")({
    //     clip: "rect(0 0 0 0)",
    //     clipPath: "inset(50%)",
    //     height: 1,
    //     overflow: "hidden",
    //     position: "absolute",
    //     bottom: 0,
    //     left: 0,
    //     whiteSpace: "nowrap",
    //     width: 1,
    // });
    return(
        <input
        hidden={true}
        required={props.required}
        type='file'
        accept='image/*'
        onChange={props.handleAvtUpload}
    />
    )
}
export default HiddenInputUpload