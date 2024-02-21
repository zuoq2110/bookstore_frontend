import { Link } from "react-bootstrap-icons";
import GioHangModel from "../../../models/GioHangModel";
import { useGioHangItem } from "../../utils/GioHangContext";

interface SachGioHangProps {
    gioHang: GioHangModel
}

const GioHangProps: React.FC<SachGioHangProps> = (props)=>{
    const { setGioHangList} = useGioHangItem()

    return(
<p>{props.gioHang.sach.tenSach}</p>
    )
}

export default GioHangProps