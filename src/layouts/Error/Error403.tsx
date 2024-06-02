import { Button } from "@mui/material"
import { Link } from "react-router-dom"

const Error403 = () => {
    return (
        <div
        className='container text-center text-black'
        style={{ height: "85vh" }}
    >
        <p className='fw-bolder ' style={{ fontSize: "200px" }}>
            403!
        </p>
        <p className='fs-2'>Bạn không có quyền vào trang này</p>
        <Link to={"/"}>
            <Button variant='contained'>Về trang chủ</Button>
        </Link>
    </div>
    )
}
export default Error403