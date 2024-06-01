import { useState } from "react"
import DonHangForm from "../../../user/DonHangForm"
import DonHangTable from "../../../user/DonHangTable"
import { ModalUtil } from "../../../user/ModalUtil"
import RequireAdmin from "../../RequireAmdin"
import OrderTable from "./OrderTable"

const OrderManagement = () =>{
    const [option, setOption] = useState('')
    const [id, setId] = useState<number>(0);
    const [open, setOpen] = useState(false)
    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);
    const [keyCountReload, setKeyCountReload] = useState();
    return(
        <div className="container p-5">
        <div className="shadow-4-strong rounded p-5">
           
            <div>
                <OrderTable
                handleOpenModal={handleOpenModal}
                setId={setId}
                setOption={setOption}
                keyCountReload={keyCountReload}
                setKeyCountReload={setKeyCountReload}
                />
            </div>
            <ModalUtil
                open={open}
                handleClose={handleCloseModal}
                handleOpen={handleOpenModal}
            >
                <DonHangForm
                    handleClose={handleCloseModal}
                    maDonHang={id}
                    option={option}
                    setCountReload={setKeyCountReload}
                />
            </ModalUtil>
        </div>
    </div>
    )
}

const OrderManagementPage = RequireAdmin(OrderManagement)
export default OrderManagementPage