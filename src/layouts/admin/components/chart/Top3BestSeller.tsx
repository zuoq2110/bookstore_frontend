import { useEffect, useState } from "react"
import SachModel from "../../../../models/SachModel"
import { lay3SachBanChayNhat } from "../../../../api/SachAPI"
import { Link } from "react-router-dom"
import { Tooltip } from "@mui/material"
import TextEllipsis from "../../../product/components/textEllipsis/TextEllipsis"

const Top3BestSeller = () => {
    const [top3BestSeller, setTop3BestSeller] = useState<SachModel[]>([])
    useEffect(() => {
        lay3SachBanChayNhat()
            .then(response => {
                setTop3BestSeller(response)
            }).catch((error) => {
                console.log(error);
            });
    })
    return (
        <table className="table table-striped ">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">ẢNH</th>
                    <th scope="col">TÊN SÁCH</th>
                    <th scope="col">ĐÃ BÁN</th>
                </tr>
            </thead>
            <tbody>
                {top3BestSeller.map((sach: any)=>{
                    return (
                     <tr key={sach.maSach}>
                        <th scope="row">{sach.maSach}</th>
                        <td>
                            <Link to={`/sach/${sach.maSach}`}>
                                <img src={sach.thumbnail} width={30}></img>
                            </Link>
                        </td>
                        <Tooltip title={sach.tenSach} arrow>
                            <td>
                                <Link to={`/sach/${sach.maSach}`} style={{textDecoration:"none"}}>
                                    <TextEllipsis 
                                    text={sach.tenSach}
                                    />
                                </Link>
                            </td>
                        </Tooltip>
                        <td>{sach.soLuongDaBan}</td>
                     </tr>   
                    )
                })}
            </tbody>
</table>
    )
}

export default Top3BestSeller